import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import type { Frame, RenderBackend } from '../render/backend';
import type { Palette, Quality } from '../state/types';
import { CAR_SPECS, CarRig, makeCarShared, type CarShared } from './car3d';
import { Fx3D } from './fx3d';
import { HALF_W, LON, newPose, TrackPath } from './path';
import { glowTexture, smokeTexture, streakTexture } from './textures3d';
import { World } from './world';

export type Level = 'low' | 'medium' | 'high';

interface QualitySpec {
  pixelCap: number;
  maxPixels: number;
  bloom: boolean;
  shadow: number; // 0 = off
  softShadow: boolean;
  density: number;
  lamps: number;
  msaa: number;
}

export const QUALITY: Record<Level, QualitySpec> = {
  low: { pixelCap: 1, maxPixels: 1.0e6, bloom: false, shadow: 0, softShadow: false, density: 0.45, lamps: 4, msaa: 0 },
  medium: { pixelCap: 1.25, maxPixels: 2.1e6, bloom: true, shadow: 1024, softShadow: false, density: 0.75, lamps: 6, msaa: 4 },
  high: { pixelCap: 2, maxPixels: 3.8e6, bloom: true, shadow: 2048, softShadow: true, density: 1, lamps: 10, msaa: 4 },
};

const MAX_LAMPS = 10;

/** Pick a level from the GPU string. Software renderers and phones go low. */
export function detectLevel(gl: WebGLRenderingContext | WebGL2RenderingContext): Level {
  let name = '';
  try {
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    name = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
  } catch {
    name = '';
  }
  if (/swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic/i.test(name)) return 'low';
  let coarse = false;
  try {
    coarse = window.matchMedia('(pointer: coarse)').matches && Math.min(window.screen.width, window.screen.height) < 820;
  } catch {
    coarse = false;
  }
  if (coarse) return 'low';
  if (/nvidia|geforce|quadro|rtx|gtx|radeon rx|radeon pro|apple m\d|apple gpu/i.test(name)) return 'high';
  return 'medium';
}

const POST_SHADER = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uGrain: { value: 0.03 },
    uVig: { value: 0.55 },
    uFlash: { value: 0 },
    uBoost: { value: 0 },
  },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime, uGrain, uVig, uFlash, uBoost; varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = (vUv - 0.5) * vec2(1.0, 0.82);
      float v = smoothstep(0.78, 0.18, length(d));
      c.rgb *= mix(1.0, v, uVig);
      c.rgb += vec3(0.08, 0.32, 0.42) * uBoost * (1.0 - v);
      float n = fract(sin(dot(gl_FragCoord.xy + fract(uTime) * 917.0, vec2(12.9898, 78.233))) * 43758.5453);
      c.rgb += (n - 0.5) * uGrain;
      c.rgb = mix(c.rgb, vec3(1.0), uFlash);
      gl_FragColor = c;
    }`,
};

function skyMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTop: { value: new THREE.Color() },
      uMid: { value: new THREE.Color() },
      uHor: { value: new THREE.Color() },
      uMoon: { value: new THREE.Vector3(0.4, 0.32, -0.85).normalize() },
      uStars: { value: 1 },
    },
    vertexShader: `varying vec3 vDir;
      void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,
    fragmentShader: `uniform vec3 uTop, uMid, uHor, uMoon; uniform float uStars; varying vec3 vDir;
      float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
      void main(){
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 c = mix(uHor, uMid, smoothstep(-0.02, 0.16, h));
        c = mix(c, uTop, smoothstep(0.12, 0.65, h));
        vec3 q = floor(d * 380.0);
        float s = hash(q);
        c += vec3(0.9, 0.95, 1.0) * step(0.9972, s) * smoothstep(0.06, 0.4, h) * (0.35 + 0.65 * hash(q + 3.1)) * uStars;
        float m = dot(d, normalize(uMoon));
        c += vec3(0.95, 0.97, 1.0) * smoothstep(0.99945, 0.99965, m) * 2.2;
        c += vec3(0.25, 0.3, 0.42) * pow(max(m, 0.0), 220.0) * 0.5;
        gl_FragColor = vec4(c, 1.0);
      }`,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
}

const tmpV = new THREE.Vector3();
const tmpV2 = new THREE.Vector3();
const mod = (a: number, n: number): number => ((a % n) + n) % n;

/** Real 3D renderer (Three.js). Owns every GPU resource and disposes them on track change and teardown. */
export class Renderer3D implements RenderBackend {
  readonly kind = '3d' as const;
  readonly gl: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(64, 16 / 9, 0.1, 3400);
  private composer!: EffectComposer;
  private bloom!: UnrealBloomPass;
  private post!: ShaderPass;
  private level: Level = 'medium';
  private requested: Quality = 'auto';
  private q: QualitySpec = QUALITY.medium;
  private world: World | null = null;
  private worldKey = '';
  private path: TrackPath | null = null;
  private env: THREE.WebGLRenderTarget | null = null;
  private pmrem: THREE.PMREMGenerator;
  private sky: THREE.Mesh;
  private skyMat: THREE.ShaderMaterial;
  private shared: CarShared;
  private glow: THREE.Texture;
  private streak: THREE.Texture;
  private smoke: THREE.Texture;
  private cars: CarRig[] = [];
  private fx: Fx3D;
  private moon = new THREE.DirectionalLight(0x9fb2ff, 0.35);
  private hemi = new THREE.HemisphereLight(0x3a4a7a, 0x07080c, 0.35);
  private pool: THREE.PointLight[] = [];
  private heads: THREE.SpotLight[] = [];
  private under: THREE.PointLight;
  private tailLight: THREE.PointLight;
  private boostLight: THREE.PointLight;
  private pose = newPose();
  private pt = { x: 0, y: 0, z: 0 };
  // camera state in track space so the lap wrap is seamless
  private camOff = 6.4;
  private camOffV = 0;
  private camLat = 0;
  private camH = 2.1;
  private lookLat = 0;
  private prevLocal = 0;
  private prevSpeed = 0;
  private accel = 0;
  private fov = 64;
  private rivalPrev: { x: number; s: number; speed: number; brake: number }[] = [];
  private lost = false;
  private frameAcc = 0;
  private frameN = 0;
  private lastDown = 0;
  private now = 0;
  private bodyRoll = 0;
  private bodyPitch = 0;
  private orbit = Number(new URLSearchParams(location.search).get('orbit') ?? 0) || 0;
  onLevelChange: (l: Level) => void = () => {};
  onContext: (lost: boolean) => void = () => {};

  constructor(readonly canvas: HTMLCanvasElement, quality: Quality) {
    this.gl = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false });
    const ctx = this.gl.getContext();
    this.gl.toneMapping = THREE.ACESFilmicToneMapping;
    this.gl.toneMappingExposure = 1.05;
    this.gl.outputColorSpace = THREE.SRGBColorSpace;
    this.gl.shadowMap.enabled = true;
    this.pmrem = new THREE.PMREMGenerator(this.gl);
    this.glow = glowTexture();
    this.streak = streakTexture();
    this.smoke = smokeTexture();
    this.shared = makeCarShared(this.glow);
    this.skyMat = skyMaterial();
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(3000, 32, 16), this.skyMat);
    this.sky.renderOrder = -10;
    this.sky.frustumCulled = false;
    this.scene.add(this.sky);
    this.scene.add(this.camera);
    this.scene.add(this.hemi);
    this.moon.castShadow = true;
    const sc = this.moon.shadow.camera;
    sc.left = -14;
    sc.right = 14;
    sc.top = 14;
    sc.bottom = -14;
    sc.near = 1;
    sc.far = 140;
    this.moon.shadow.bias = -0.0004;
    this.moon.shadow.normalBias = 0.03;
    this.scene.add(this.moon, this.moon.target);
    for (let i = 0; i < MAX_LAMPS; i++) {
      const l = new THREE.PointLight(0xffffff, 0, 48, 2);
      this.pool.push(l);
    }
    CAR_SPECS.forEach((sp) => {
      const c = new CarRig(sp, this.shared);
      this.cars.push(c);
      this.scene.add(c.root);
    });
    this.rivalPrev = [0, 1, 2].map(() => ({ x: 0, s: 0, speed: 0, brake: 0 }));
    const player = this.cars[0];
    for (const sx of [-0.62, 0.62]) {
      const s = new THREE.SpotLight(0xe8f1ff, 0, 95, 0.46, 0.55, 2);
      s.position.set(sx, 0.62, -player.halfLength + 0.1);
      s.target.position.set(sx * 1.6, 0, -player.halfLength - 26);
      player.root.add(s, s.target);
      this.heads.push(s);
    }
    this.under = new THREE.PointLight(new THREE.Color(CAR_SPECS[0].accent), 5, 5.5, 2);
    this.under.position.set(0, 0.25, 0);
    this.tailLight = new THREE.PointLight(0xff2030, 2, 7, 2);
    this.tailLight.position.set(0, 0.25, player.halfLength + 2.4);
    this.boostLight = new THREE.PointLight(0x7ff6ff, 0, 9, 2);
    this.boostLight.position.copy(player.exhaustPos).add(new THREE.Vector3(0, 0.1, 0.6));
    player.root.add(this.under, this.tailLight, this.boostLight);
    this.fx = new Fx3D(this.glow, this.smoke);
    this.scene.add(this.fx.group);
    this.camera.add(this.fx.streaks);
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0024);
    this.requested = quality;
    this.level = quality === 'auto' ? detectLevel(ctx) : quality;
    this.applyLevel(this.level, true);
    canvas.addEventListener('webglcontextlost', this.onLost, false);
    canvas.addEventListener('webglcontextrestored', this.onRestored, false);
    this.resize();
  }

  get activeLevel(): Level {
    return this.level;
  }

  private onLost = (e: Event): void => {
    e.preventDefault();
    this.lost = true;
    this.onContext(true);
  };

  private onRestored = (): void => {
    this.lost = false;
    // drop the track scene and env map so they are rebuilt with fresh GPU resources
    this.disposeWorld();
    this.buildComposer();
    this.onContext(false);
  };

  setQuality(q: Quality): void {
    this.requested = q;
    const lvl = q === 'auto' ? detectLevel(this.gl.getContext()) : q;
    if (lvl !== this.level) this.applyLevel(lvl, false);
  }

  private applyLevel(l: Level, first: boolean): void {
    this.level = l;
    this.q = QUALITY[l];
    const q = this.q;
    this.gl.shadowMap.enabled = q.shadow > 0;
    this.gl.shadowMap.type = q.softShadow ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
    this.moon.castShadow = q.shadow > 0;
    if (q.shadow > 0) {
      this.moon.shadow.mapSize.set(q.shadow, q.shadow);
      this.moon.shadow.map?.dispose();
      this.moon.shadow.map = null;
    }
    // keep a constant light count per level so shaders compile once per level
    for (let i = 0; i < MAX_LAMPS; i++) {
      const l = this.pool[i];
      if (i < q.lamps && !l.parent) this.scene.add(l);
      else if (i >= q.lamps && l.parent) l.removeFromParent();
    }
    if (!first) {
      this.disposeWorld();
      this.scene.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(m)) m.forEach((x) => (x.needsUpdate = true));
        else if (m) m.needsUpdate = true;
      });
    }
    this.buildComposer();
    this.resize();
    this.onLevelChange(l);
  }

  private buildComposer(): void {
    this.composer?.dispose();
    this.bloom?.dispose();
    const size = this.gl.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(Math.max(1, size.x), Math.max(1, size.y), { type: THREE.HalfFloatType, samples: this.q.msaa });
    this.composer = new EffectComposer(this.gl, rt);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.55, 0.5, 0.95);
    this.bloom.enabled = this.q.bloom;
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.post = new ShaderPass(POST_SHADER);
    this.composer.addPass(this.post);
  }

  resize(): void {
    const w = Math.max(1, window.innerWidth);
    const h = Math.max(1, window.innerHeight);
    const dpr = window.devicePixelRatio || 1;
    const pr = Math.max(0.5, Math.min(dpr, this.q.pixelCap, Math.sqrt(this.q.maxPixels / (w * h))));
    this.gl.setPixelRatio(pr);
    this.gl.setSize(w, h, false);
    this.composer.setPixelRatio(pr);
    this.composer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  // ---------- track scene ----------
  private disposeWorld(): void {
    this.world?.dispose();
    this.world = null;
    this.worldKey = '';
    this.env?.dispose();
    this.env = null;
    this.scene.environment = null;
  }

  private ensureWorld(f: Frame): World {
    const key = `${f.track.def.id}:${this.level}:${f.highContrast ? 1 : 0}`;
    if (this.world && this.worldKey === key && this.path) {
      this.world.setThreshold(f.threshold);
      return this.world;
    }
    this.disposeWorld();
    if (!this.path || this.path.track !== f.track) this.path = new TrackPath(f.track);
    const maxAniso = Math.min(8, this.gl.capabilities.getMaxAnisotropy());
    this.world = new World(this.path, f.track.def, { density: this.q.density, highContrast: f.highContrast, threshold: f.threshold }, { glow: this.glow, streak: this.streak, anisotropy: maxAniso });
    this.scene.add(this.world.group, this.world.skyline);
    this.worldKey = key;
    this.applyPalette(f.track.def.palette);
    this.fx.clear();
    return this.world;
  }

  private applyPalette(p: Palette): void {
    const fog = new THREE.Color(p.fog).lerp(new THREE.Color(p.skyBottom), 0.25).multiplyScalar(0.5);
    (this.scene.fog as THREE.FogExp2).color.copy(fog);
    this.skyMat.uniforms.uTop.value.set(p.skyTop).multiplyScalar(0.6);
    this.skyMat.uniforms.uMid.value.set(p.skyMid).multiplyScalar(0.55);
    this.skyMat.uniforms.uHor.value.copy(fog).lerp(new THREE.Color(p.skyBottom), 0.35).multiplyScalar(1.3);
    this.hemi.color.set(p.skyMid);
    this.env = this.buildEnv(p);
    this.scene.environment = this.env.texture;
    this.scene.environmentIntensity = 0.55;
  }

  /** Procedural night-city environment for reflections: sky gradient, lit windows, neon. */
  private buildEnv(p: Palette): THREE.WebGLRenderTarget {
    const s = new THREE.Scene();
    const disp: { dispose(): void }[] = [];
    const sm = skyMaterial();
    sm.uniforms.uTop.value.set(p.skyTop).multiplyScalar(0.5);
    sm.uniforms.uMid.value.set(p.skyMid).multiplyScalar(0.5);
    sm.uniforms.uHor.value.set(p.skyBottom).multiplyScalar(0.7);
    sm.uniforms.uStars.value = 0;
    const sg = new THREE.SphereGeometry(80, 32, 16);
    s.add(new THREE.Mesh(sg, sm));
    disp.push(sm, sg);
    const box = new THREE.BoxGeometry(1, 1, 1);
    disp.push(box);
    const warm = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffc58a').multiplyScalar(1.6) });
    const cool = new THREE.MeshBasicMaterial({ color: new THREE.Color('#c6dcff').multiplyScalar(1.4) });
    const dark = new THREE.MeshBasicMaterial({ color: new THREE.Color('#06080c') });
    const neon = p.signs.map((c) => new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(3) }));
    disp.push(warm, cool, dark, ...neon);
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      const r = 40 + rnd() * 25;
      const h = 6 + rnd() * 30;
      const b = new THREE.Mesh(box, dark);
      b.position.set(Math.cos(a) * r, h / 2 - 4, Math.sin(a) * r);
      b.scale.set(6 + rnd() * 8, h, 6 + rnd() * 8);
      b.lookAt(0, b.position.y, 0);
      s.add(b);
      for (let k = 0; k < 4; k++) {
        const w = new THREE.Mesh(box, rnd() < 0.7 ? warm : cool);
        w.position.copy(b.position).multiplyScalar(0.96);
        w.position.y = rnd() * h - 3;
        w.scale.set(1 + rnd() * 3, 0.4, 0.2);
        w.lookAt(0, w.position.y, 0);
        s.add(w);
      }
      if (rnd() < 0.25) {
        const n = new THREE.Mesh(box, neon[Math.floor(rnd() * neon.length)]);
        n.position.copy(b.position).multiplyScalar(0.94);
        n.position.y = 4 + rnd() * 10;
        n.scale.set(5, 2, 0.2);
        n.lookAt(0, n.position.y, 0);
        s.add(n);
      }
    }
    // overhead streetlights reflected in paint and glass
    const lamp = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffd9a8').multiplyScalar(6) });
    disp.push(lamp);
    for (let i = 0; i < 6; i++) {
      const l = new THREE.Mesh(box, lamp);
      l.position.set(i % 2 ? 7 : -7, 9, -30 + i * 12);
      l.scale.set(1.2, 0.2, 0.5);
      s.add(l);
    }
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshBasicMaterial({ color: 0x050608 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -4;
    s.add(ground);
    disp.push(ground.geometry, ground.material as THREE.Material);
    const rt = this.pmrem.fromScene(s, 0.02, 0.1, 400);
    for (const d of disp) d.dispose();
    return rt;
  }

  // ---------- frame ----------
  render(f: Frame): void {
    if (this.lost) return;
    const t0 = performance.now();
    this.now = f.time;
    const world = this.ensureWorld(f);
    const path = this.path as TrackPath;
    const L = path.length;
    const dt = f.dt;

    // player in extended coordinates
    const local = mod(f.s, L);
    if (this.prevLocal - local > L / 2) {
      this.fx.clear();
    } else if (local - this.prevLocal > L / 2) {
      this.fx.clear();
    }
    const ds = local - this.prevLocal;
    const dsFix = Math.abs(ds) > L / 2 ? ds - Math.sign(ds) * L : ds;
    this.prevLocal = local;

    const speedMs = f.speedPct * 12000 * LON;
    if (dt > 0) {
      const a = (speedMs - this.prevSpeed) / dt;
      this.accel += (a - this.accel) * Math.min(1, dt * 4);
    }
    this.prevSpeed = speedMs;

    // ---- player car ----
    const pc = this.cars[0];
    path.point(local, f.x, 0, this.pose, this.pt);
    pc.root.position.set(this.pt.x, this.pt.y, this.pt.z);
    const head = this.pose.head;
    const slip = f.vx * 0.12 + (f.drifting ? f.vx * 0.1 : 0);
    pc.root.rotation.set(this.pose.pitch, -(head + slip), -this.pose.bank);
    const rollT = Math.max(-0.07, Math.min(0.07, -f.vx * 0.025 - f.steer * f.speedPct * 0.025));
    const pitchT = Math.max(-0.04, Math.min(0.04, this.accel * 0.0022));
    const k = Math.min(1, dt * 8);
    this.bodyRoll += (rollT - this.bodyRoll) * k;
    this.bodyPitch += (pitchT - this.bodyPitch) * k;
    pc.body.rotation.set(this.bodyPitch, 0, this.bodyRoll);
    pc.body.position.y = Math.sin(f.time * 31) * 0.004 * f.speedPct;
    pc.animate(Math.max(-2, dsFix * LON), f.steer, f.braking, f.boostAmt, f.time);
    for (const s of this.heads) s.intensity = 1100;
    this.tailLight.intensity = f.braking ? 2.2 : 0.5;
    this.boostLight.intensity = f.boostAmt * 40;
    this.under.intensity = 4;

    // ---- rivals ----
    for (let i = 0; i < 3; i++) {
      const car = this.cars[i + 1];
      const r = f.rivals[i];
      if (!r) {
        car.root.visible = false;
        continue;
      }
      const rl = local + (r.s - f.s);
      if (rl < path.minS + 2000 || rl > path.maxS - 2000 || Math.abs(r.s - f.s) > 90000) {
        car.root.visible = false;
        continue;
      }
      car.root.visible = true;
      const prev = this.rivalPrev[i];
      const dS = r.s - prev.s;
      const dX = r.x - prev.x;
      const yaw = dS > 1 ? Math.atan2(dX * HALF_W, dS * LON) : 0;
      const brake = r.speed < prev.speed - 30 * Math.max(dt, 0.001) * 60 ? 1 : 0;
      prev.brake += (brake - prev.brake) * Math.min(1, dt * 10);
      prev.s = r.s;
      prev.x = r.x;
      prev.speed = r.speed;
      path.point(rl, r.x, 0, this.pose, this.pt);
      car.root.position.set(this.pt.x, this.pt.y, this.pt.z);
      car.root.rotation.set(this.pose.pitch, -(this.pose.head + Math.max(-0.3, Math.min(0.3, yaw))), -this.pose.bank);
      car.body.rotation.z = Math.max(-0.05, Math.min(0.05, -yaw * 0.3));
      car.animate(Math.max(0, Math.min(5, dS * LON)), Math.max(-1, Math.min(1, yaw * 4)), prev.brake > 0.5, 0, f.time);
      // wet spray off rivals that are close ahead
      const gap = (r.s - f.s) * LON;
      if (gap > 2 && gap < 70 && r.speed > 3000 && Math.random() < dt * 40) this.spray(car, r.speed * LON, 0.5);
    }

    // ---- gates ----
    world.setGate(f.gateOpen, f.time, f.reducedFlash);

    // ---- camera ----
    const cam = this.camera;
    if (f.cinematic) {
      const a = f.time * 0.11 + this.orbit;
      const rad = 8.4;
      pc.root.updateMatrixWorld();
      tmpV.set(Math.sin(a) * rad, 1.25 + Math.sin(f.time * 0.23) * 0.3, Math.cos(a) * rad);
      tmpV.applyMatrix4(pc.root.matrixWorld);
      cam.position.copy(tmpV);
      tmpV2.set(-0.6, 0.6, 0).applyMatrix4(pc.root.matrixWorld);
      cam.up.set(0, 1, 0);
      cam.lookAt(tmpV2);
      this.fov += (36 - this.fov) * Math.min(1, dt * 3);
      // frame the car right of centre, clear of the menu column
      const w = this.canvas.width;
      const h = this.canvas.height;
      const off = w > h * 1.2 ? -w * 0.17 : 0;
      if (!cam.view?.enabled || cam.view.offsetX !== off) cam.setViewOffset(w, h, off, 0, w, h);
    } else {
      if (cam.view?.enabled) cam.clearViewOffset();
      const target = 6.4 + f.speedPct * 0.9 + f.boostAmt * 1.3 + Math.max(0, this.accel) * 0.02;
      // critically damped spring on the follow distance
      const w = 9;
      const acc = w * w * (target - this.camOff) - 2 * w * this.camOffV;
      this.camOffV += acc * dt;
      this.camOff += this.camOffV * dt;
      const latT = f.x * HALF_W * 0.85;
      this.camLat += (latT - this.camLat) * Math.min(1, dt * 5);
      this.lookLat += (f.x * HALF_W - this.lookLat) * Math.min(1, dt * 7);
      this.camH += (2.05 + f.speedPct * 0.1 - this.camH) * Math.min(1, dt * 3);
      const camS = local - this.camOff / LON;
      path.point(camS, this.camLat / HALF_W, 0, this.pose, this.pt);
      cam.position.set(this.pt.x, this.pt.y + this.camH, this.pt.z);
      path.point(local + 9 / LON, this.lookLat / HALF_W, 0, this.pose, this.pt);
      tmpV2.set(this.pt.x, this.pt.y + 0.85, this.pt.z);
      // camera shake (pixels from the game, normalised to 720p)
      const sk = 720 / Math.max(1, this.canvas.height);
      cam.position.x += f.shakeX * sk * 0.016;
      cam.position.y += f.shakeY * sk * 0.012;
      cam.up.set(0, 1, 0);
      cam.lookAt(tmpV2);
      path.sample(local, this.pose);
      cam.rotateZ(-this.pose.bank * 0.45 - f.vx * 0.006 + f.shakeX * sk * 0.0012);
      const fovT = 64 + f.speedPct * 5 + f.boostAmt * 12;
      this.fov += (fovT - this.fov) * Math.min(1, dt * 5);
    }
    if (Math.abs(cam.fov - this.fov) > 0.01) {
      cam.fov = this.fov;
      cam.updateProjectionMatrix();
    }
    this.sky.position.copy(cam.position);
    world.skyline.position.set(cam.position.x, cam.position.y - 30, cam.position.z);

    // ---- light pool: nearest lamps ahead of the camera ----
    const lamps = world.lamps;
    const from = local - this.camOff / LON - 15 / LON;
    let lo = 0;
    let hi = lamps.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (lamps[mid].s < from) lo = mid + 1;
      else hi = mid;
    }
    const n = this.q.lamps;
    const span = Math.max(1, (lamps[Math.min(lamps.length - 1, lo + n - 1)]?.s ?? from) - from);
    for (let i = 0; i < n; i++) {
      const l = this.pool[i];
      const lm = lamps[lo + i];
      if (!lm) {
        l.intensity = 0;
        continue;
      }
      l.position.set(lm.x, lm.y, lm.z);
      l.color.copy(lm.color);
      const fr = (lm.s - from) / span;
      const fade = fr > 0.7 ? Math.max(0, 1 - (fr - 0.7) / 0.3) : 1;
      l.intensity = 380 * lm.power * fade;
    }

    // ---- shadow light follows the player ----
    this.moon.position.set(pc.root.position.x + 18, pc.root.position.y + 60, pc.root.position.z + 24);
    this.moon.target.position.copy(pc.root.position);

    // ---- particles ----
    if (!f.cinematic && f.dt > 0) {
      if (speedMs > 14 && Math.random() < dt * 60 * Math.min(1, f.speedPct * 1.3)) this.spray(pc, speedMs, 1);
      if (f.drifting && f.speedPct > 0.3) for (let j = 0; j < 2; j++) this.smokeAt(pc, j ? 1 : -1, speedMs);
    }
    this.fx.update(dt);
    const lineAmt = f.speedLines && !f.cinematic ? Math.max(0, f.speedPct - 0.45) * 1.8 + f.boostAmt * 0.6 : 0;
    this.fx.updateStreaks(dt, speedMs, Math.min(1, lineAmt) * (f.reducedMotion ? 0.4 : 1), f.boostAmt);

    // ---- post ----
    const u = this.post.uniforms;
    u.uTime.value = f.time;
    u.uGrain.value = f.reducedFlash || f.highContrast ? 0 : 0.028;
    u.uVig.value = f.highContrast ? 0.2 : 0.5;
    u.uFlash.value = f.reducedFlash ? 0 : Math.min(1, f.flash) * 0.18;
    u.uBoost.value = f.highContrast ? 0 : f.boostAmt * (f.reducedFlash ? 0.25 : 0.5);
    this.bloom.enabled = this.q.bloom;
    this.composer.render(dt);
    this.autoLevel(performance.now() - t0, dt);
  }

  /** Auto quality steps down one level when frames stay slow. */
  private autoLevel(_cpuMs: number, dt: number): void {
    if (this.requested !== 'auto' || dt <= 0) return;
    this.frameAcc += dt;
    this.frameN++;
    if (this.frameN < 120) return;
    const avg = (this.frameAcc / this.frameN) * 1000;
    this.frameAcc = 0;
    this.frameN = 0;
    if (avg > 24 && this.level !== 'low' && this.now - this.lastDown > 6) {
      this.lastDown = this.now;
      this.applyLevel(this.level === 'high' ? 'medium' : 'low', false);
    }
  }

  private spray(car: CarRig, speedMs: number, amount: number): void {
    car.root.updateMatrixWorld();
    const sp = car.spec;
    for (const sx of [-1, 1]) {
      if (Math.random() > amount) continue;
      tmpV.set(sx * sp.track / 2 + (Math.random() - 0.5) * 0.3, 0.15, sp.wheelbase / 2 + sp.wheelR);
      tmpV.applyMatrix4(car.root.matrixWorld);
      // drift backwards relative to the car: the car's own forward velocity, minus most of it
      tmpV2.set((Math.random() - 0.5) * 1.6 + sx * 0.6, 0.6 + Math.random() * 1.4, 0).applyQuaternion(car.root.quaternion);
      const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(car.root.quaternion).multiplyScalar(speedMs * 0.55);
      this.fx.mist.spawn(tmpV.x, tmpV.y, tmpV.z, fwd.x + tmpV2.x, tmpV2.y, fwd.z + tmpV2.z, 0.5 + Math.random() * 0.4, 0.62, 0.68, 0.78, 0.16 + Math.min(0.14, speedMs / 600));
    }
  }

  private smokeAt(car: CarRig, sx: number, speedMs: number): void {
    car.root.updateMatrixWorld();
    const sp = car.spec;
    tmpV.set(sx * sp.track / 2, 0.2, sp.wheelbase / 2);
    tmpV.applyMatrix4(car.root.matrixWorld);
    const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(car.root.quaternion).multiplyScalar(speedMs * 0.7);
    this.fx.mist.spawn(tmpV.x, tmpV.y, tmpV.z, fwd.x + (Math.random() - 0.5) * 2, 0.8 + Math.random(), fwd.z + (Math.random() - 0.5) * 2, 0.9 + Math.random() * 0.5, 0.82, 0.84, 0.9, 0.3);
  }

  sparks(dir: number, count: number): void {
    const car = this.cars[0];
    car.root.updateMatrixWorld();
    const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(car.root.quaternion);
    const side = new THREE.Vector3(1, 0, 0).applyQuaternion(car.root.quaternion);
    const speed = this.prevSpeed;
    for (let i = 0; i < count; i++) {
      tmpV.set(dir * car.spec.width / 2, 0.3 + Math.random() * 0.3, (Math.random() - 0.3) * car.spec.length * 0.6).applyMatrix4(car.root.matrixWorld);
      const v = fwd.clone().multiplyScalar(speed * (0.5 + Math.random() * 0.4));
      v.addScaledVector(side, dir * (1 + Math.random() * 4));
      v.y += 1 + Math.random() * 4;
      const hot = Math.random();
      this.fx.sparks.spawn(tmpV.x, tmpV.y, tmpV.z, v.x, v.y, v.z, 0.25 + Math.random() * 0.45, 1.6, 0.9 + hot * 0.5, 0.45 + hot * 0.4, 1);
    }
  }

  clearFx(): void {
    this.fx.clear();
  }

  /** The car a track is drawn around in screenshots and menus. */
  get trackPath(): TrackPath | null {
    return this.path;
  }

  dispose(): void {
    this.canvas.removeEventListener('webglcontextlost', this.onLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onRestored);
    this.disposeWorld();
    for (const c of this.cars) c.dispose();
    const sh = this.shared;
    for (const m of [sh.glass, sh.rubber, sh.rim, sh.disc, sh.trim, sh.seam, sh.headlight, sh.shadow]) m.dispose();
    this.fx.dispose();
    this.glow.dispose();
    this.streak.dispose();
    this.smoke.dispose();
    this.sky.geometry.dispose();
    this.skyMat.dispose();
    this.moon.shadow.map?.dispose();
    for (const l of this.pool) l.dispose();
    this.bloom.dispose();
    this.composer.dispose();
    this.pmrem.dispose();
    this.gl.dispose();
  }
}

