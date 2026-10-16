// BLACKOUT PROTOCOL 3D renderer: tilted tactical camera over a lit-by-rules facility.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { Guard, GuardState, MissionDef, World } from '../../sim/types.ts';
import { blocksSight, isLit } from '../../sim/grid.ts';
import { DIFF, K } from '../../sim/vision.ts';
import { hackables } from '../../sim/world.ts';
import type { GameRenderer, RenderOpts } from '../types.ts';
import type { Quality, QualityProfile } from './quality.ts';
import { PROFILES, detectQuality } from './quality.ts';
import type { BakeUniforms } from './bake.ts';
import { makeBakeUniforms } from './bake.ts';
import { Level, PAL_CB, PAL_NORMAL } from './level.ts';
import type { Palette } from './level.ts';
import type { Rig } from './actors.ts';
import { animateRig, buildGuard, buildOperative, disposeRig } from './actors.ts';
import { ConeDecal } from './cones.ts';
import type { ConeStyle } from './cones.ts';
import { flatPlane, ringMaterial, ringMesh } from './ring.ts';
import { canvas } from './textures.ts';

const BASE_GAIN = 12;
const PITCH = (60 * Math.PI) / 180;

interface GuardView { rig: Rig; spot: THREE.SpotLight | null; cone: ConeDecal; icon: THREE.Sprite; bar: SusBar; volume: THREE.Mesh | null }
interface CamView { spot: THREE.SpotLight | null; cone: ConeDecal; bar: SusBar; label: Label }

class SusBar {
  readonly mesh: THREE.Mesh;
  readonly mat: THREE.ShaderMaterial;
  constructor(geo: THREE.PlaneGeometry) {
    this.mat = new THREE.ShaderMaterial({
      transparent: true, depthTest: false, depthWrite: false,
      uniforms: { uFill: { value: 0 }, uColor: { value: new THREE.Color() }, uThresh: { value: K.SUS_THRESHOLD / 100 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `uniform float uFill; uniform vec3 uColor; uniform float uThresh; varying vec2 vUv;
        void main(){
          vec2 px = vUv * vec2(120.0, 14.0);
          bool border = px.x < 1.5 || px.x > 118.5 || px.y < 1.5 || px.y > 12.5;
          vec3 c = vec3(0.03, 0.035, 0.04); float a = 0.82;
          if (vUv.x < uFill && !border) c = uColor;
          if (abs(vUv.x - uThresh) < 0.012) { c = vec3(1.0); }
          if (border) c = vec3(0.6, 0.64, 0.66);
          gl_FragColor = vec4(c, a); }`,
    });
    this.mesh = new THREE.Mesh(geo, this.mat);
    this.mesh.renderOrder = 20;
    this.mesh.frustumCulled = false;
  }
  dispose(): void { this.mat.dispose(); }
}

class Label {
  readonly sprite: THREE.Sprite;
  private ctx: CanvasRenderingContext2D;
  private tex: THREE.CanvasTexture;
  private text = '\u0000';
  constructor() {
    const [c, g] = canvas(256, 64);
    this.ctx = g;
    this.tex = new THREE.CanvasTexture(c);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.SpriteMaterial({ map: this.tex, depthTest: false, transparent: true });
    this.sprite = new THREE.Sprite(m);
    this.sprite.scale.set(1.3, 0.325, 1);
    this.sprite.renderOrder = 21;
  }
  set(text: string): void {
    if (text === this.text) return;
    this.text = text;
    const g = this.ctx;
    g.clearRect(0, 0, 256, 64);
    if (!text) { this.tex.needsUpdate = true; this.sprite.visible = false; return; }
    this.sprite.visible = true;
    g.font = '600 30px "IBM Plex Sans Condensed", "Segoe UI", sans-serif';
    const tw = g.measureText(text).width;
    g.fillStyle = 'rgba(13,16,19,0.86)';
    g.fillRect(128 - tw / 2 - 12, 10, tw + 24, 44);
    g.fillStyle = '#dce4e6';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, 128, 33);
    this.tex.needsUpdate = true;
  }
  dispose(): void { this.tex.dispose(); (this.sprite.material as THREE.SpriteMaterial).dispose(); }
}

function iconTexture(state: GuardState, col: THREE.Color): THREE.CanvasTexture {
  const [c, g] = canvas(96, 96);
  const hex = `#${col.getHexString()}`;
  g.lineWidth = 7; g.strokeStyle = hex; g.fillStyle = hex;
  g.font = '700 46px "IBM Plex Sans Condensed", "Segoe UI", sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  // dark backing so the icon reads on any floor
  g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 8;
  if (state === 'suspicious') {
    g.beginPath(); g.moveTo(48, 10); g.lineTo(88, 82); g.lineTo(8, 82); g.closePath();
    g.fillStyle = 'rgba(13,16,19,0.85)'; g.fill(); g.stroke();
    g.fillStyle = hex; g.shadowBlur = 0; g.fillText('?', 48, 60);
  } else if (state === 'alert') {
    g.beginPath(); g.moveTo(48, 6); g.lineTo(90, 48); g.lineTo(48, 90); g.lineTo(6, 48); g.closePath(); g.fill();
    g.fillStyle = '#0d1013'; g.shadowBlur = 0; g.fillText('!', 48, 50);
  } else if (state === 'search') {
    g.beginPath(); g.arc(48, 48, 34, 0, Math.PI * 2);
    g.fillStyle = 'rgba(13,16,19,0.85)'; g.fill(); g.stroke();
    g.fillStyle = hex; g.shadowBlur = 0;
    for (const x of [30, 48, 66]) { g.beginPath(); g.arc(x, 48, 5.5, 0, Math.PI * 2); g.fill(); }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export interface Renderer3DHooks {
  /** Called with a short message when the GPU context is lost or restored (null clears it). */
  onStatus?: (msg: string | null) => void;
  /** The context could not be restored: the game should switch to the 2D fallback. */
  onFatal?: () => void;
}

export class Renderer3D implements GameRenderer {
  readonly kind = '3d' as const;
  readonly detected: Quality;
  readonly canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(38, 1, 0.1, 160);
  private composer: EffectComposer | null = null;
  private bloom: UnrealBloomPass | null = null;
  private q: QualityProfile;
  private u: BakeUniforms = makeBakeUniforms();
  private env: THREE.Texture | null = null;
  private pmrem: THREE.PMREMGenerator;
  private hemi: THREE.HemisphereLight;
  private level: Level | null = null;
  private def: MissionDef | null = null;
  private dyn = new THREE.Group();
  private player: Rig | null = null;
  private rim = { value: new THREE.Color(0.1, 0.16, 0.2) };
  private guards: GuardView[] = [];
  private camsV: CamView[] = [];
  private icons = new Map<string, THREE.CanvasTexture>();
  private barGeo = new THREE.PlaneGeometry(0.8, 0.095);
  private ringGeo = flatPlane();
  private visRing: THREE.Mesh;
  private visMat = ringMaterial(true);
  private focusRing: THREE.Mesh;
  private focusMat = ringMaterial(true);
  private focusLine: THREE.Line;
  private noise: { mesh: THREE.Mesh; mat: THREE.ShaderMaterial }[] = [];
  private decoy: THREE.Group;
  private decoyLed: THREE.MeshStandardMaterial;
  private decoyArc: THREE.ShaderMaterial;
  private camT = new THREE.Vector3();
  private lead = new THREE.Vector3();
  private camDist = 16;
  private camInit = false;
  private lastPX = 0;
  private lastPY = 0;
  private shake = 0;
  private time = 0;
  private lost = false;
  private lostTimer = 0;
  private fixtureLevel = 1;
  private hooks: Renderer3DHooks;
  private needsRebuild = false;
  private cbMode = false;

  constructor(quality: Quality | 'auto', hooks: Renderer3DHooks = {}) {
    this.hooks = hooks;
    const cv = document.createElement('canvas');
    cv.id = 'view3d';
    cv.setAttribute('aria-label', 'BLACKOUT PROTOCOL 3D game view');
    cv.setAttribute('role', 'img');
    this.canvas = cv;
    const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, powerPreference: 'high-performance', stencil: false });
    if (!r.getContext()) throw new Error('WebGL context unavailable');
    this.renderer = r;
    this.detected = detectQuality(r.getContext());
    this.q = PROFILES[quality === 'auto' ? this.detected : quality];
    document.body.prepend(cv);
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.15;
    this.pmrem = new THREE.PMREMGenerator(r);
    this.scene.background = new THREE.Color(0x07090c);
    this.scene.fog = new THREE.FogExp2(0x07090c, 0.02);
    this.hemi = new THREE.HemisphereLight(0x223042, 0x050607, 0.35);
    this.scene.add(this.hemi);
    this.scene.add(this.dyn);
    this.visRing = ringMesh(0.62, this.visMat, this.ringGeo);
    this.focusRing = ringMesh(0.6, this.focusMat, this.ringGeo);
    this.focusMat.uniforms.uDashN.value = 10;
    this.focusMat.uniforms.uR0.value = 0.78; this.focusMat.uniforms.uR1.value = 0.86;
    const lg = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 1], 3));
    this.focusLine = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0x5ef2ff, transparent: true, opacity: 0.45, depthWrite: false }));
    this.focusLine.frustumCulled = false;
    this.scene.add(this.visRing, this.focusRing, this.focusLine);
    for (let i = 0; i < 24; i++) {
      const mat = ringMaterial(true);
      mat.uniforms.uR0.value = 0.94; mat.uniforms.uR1.value = 1.0;
      const mesh = ringMesh(1, mat, this.ringGeo);
      mesh.visible = false;
      this.scene.add(mesh);
      this.noise.push({ mesh, mat });
    }
    this.decoy = new THREE.Group();
    const puck = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.06, 18), new THREE.MeshStandardMaterial({ color: 0x23272b, metalness: 0.6, roughness: 0.4 }));
    puck.position.y = 0.03;
    this.decoyLed = new THREE.MeshStandardMaterial({ color: 0x120a02, emissive: 0xf0a541, emissiveIntensity: 3 });
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), this.decoyLed);
    led.position.y = 0.075;
    this.decoyArc = ringMaterial(true);
    this.decoyArc.uniforms.uR0.value = 0.8; this.decoyArc.uniforms.uR1.value = 0.9;
    const arc = ringMesh(0.5, this.decoyArc, this.ringGeo);
    arc.position.y = 0.02;
    this.decoy.add(puck, led, arc);
    this.decoy.visible = false;
    this.scene.add(this.decoy);
    this.makeEnv();
    this.applyQualityToRenderer();
    cv.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.lost = true;
      this.hooks.onStatus?.('Graphics context lost. Trying to restore the 3D view.');
      this.lostTimer = window.setTimeout(() => this.hooks.onFatal?.(), 5000);
    });
    cv.addEventListener('webglcontextrestored', () => {
      window.clearTimeout(this.lostTimer);
      this.lost = false;
      this.makeEnv();
      this.applyQualityToRenderer();
      this.needsRebuild = true;
      this.hooks.onStatus?.(null);
    });
    this.resize();
  }

  get quality(): Quality { return this.q.name; }

  setQuality(q: Quality): void {
    if (q === this.q.name) return;
    this.q = PROFILES[q];
    this.applyQualityToRenderer();
    this.needsRebuild = true;
  }

  private makeEnv(): void {
    this.env?.dispose();
    const room = new RoomEnvironment();
    this.env = this.pmrem.fromScene(room, 0.04).texture;
    room.traverse((o) => { const m = o as THREE.Mesh; if (m.geometry) m.geometry.dispose(); if (m.material) (m.material as THREE.Material).dispose(); });
  }

  private applyQualityToRenderer(): void {
    const r = this.renderer;
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.q.pixelRatio));
    r.shadowMap.enabled = this.q.shadows;
    r.shadowMap.type = this.q.softShadows ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
    (this.scene.fog as THREE.FogExp2).density = this.q.haze ? 0.024 : 0.016;
    this.composer?.dispose();
    this.composer = null;
    this.bloom = null;
    if (this.q.bloom) {
      const size = r.getDrawingBufferSize(new THREE.Vector2());
      const rt = new THREE.WebGLRenderTarget(Math.max(1, size.x), Math.max(1, size.y), { type: THREE.HalfFloatType, samples: this.q.msaa });
      const comp = new EffectComposer(r, rt);
      comp.addPass(new RenderPass(this.scene, this.camera));
      this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.55, 0.45, 0.82);
      comp.addPass(this.bloom);
      comp.addPass(new OutputPass());
      this.composer = comp;
    }
    this.resize();
  }

  resize(): void {
    const w = Math.max(1, window.innerWidth), h = Math.max(1, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.q.pixelRatio));
    this.renderer.setSize(w, h, false);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.composer) {
      this.composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.q.pixelRatio));
      this.composer.setSize(w, h);
    }
    this.camDist = 17.5 * Math.max(1, 1.25 / (w / h));
  }

  resetCamera(): void { this.camInit = false; }
  kick(): void { this.shake = 0.25; }

  // ---- mission build / teardown ---------------------------------------------------------------------
  private teardown(): void {
    this.level?.dispose();
    this.level = null;
    if (this.player) disposeRig(this.player);
    this.player = null;
    for (const g of this.guards) {
      disposeRig(g.rig);
      if (g.spot) { g.spot.shadow.map?.dispose(); g.spot.dispose(); g.spot.target.removeFromParent(); g.spot.removeFromParent(); }
      g.cone.dispose(); g.cone.mesh.removeFromParent(); g.cone.light.removeFromParent();
      g.icon.removeFromParent(); (g.icon.material as THREE.SpriteMaterial).dispose();
      g.bar.mesh.removeFromParent(); g.bar.dispose();
      if (g.volume) { g.volume.removeFromParent(); g.volume.geometry.dispose(); (g.volume.material as THREE.Material).dispose(); }
    }
    for (const c of this.camsV) {
      if (c.spot) { c.spot.shadow.map?.dispose(); c.spot.dispose(); c.spot.target.removeFromParent(); c.spot.removeFromParent(); }
      c.cone.dispose(); c.cone.mesh.removeFromParent(); c.cone.light.removeFromParent();
      c.bar.mesh.removeFromParent(); c.bar.dispose();
      c.label.sprite.removeFromParent(); c.label.dispose();
    }
    this.guards = [];
    this.camsV = [];
    this.def = null;
    this.renderer.renderLists.dispose();
  }

  private build(w: World): void {
    this.teardown();
    const pal = this.cbMode ? PAL_CB : PAL_NORMAL;
    this.level = new Level(w, this.q, this.u, this.env, pal);
    this.scene.add(this.level.group);
    this.player = buildOperative(this.u, this.rim);
    this.dyn.add(this.player.root);
    w.guards.forEach((g, i) => {
      const rig = buildGuard(this.u, w.def.index >= 2 ? (i % 2) : i === 0 && w.def.index === 1 ? 1 : 0);
      this.dyn.add(rig.root);
      let spot: THREE.SpotLight | null = null;
      if (this.q.spots) {
        spot = new THREE.SpotLight(0xfff0d8, 0, g.range, g.fov / 2, 0.42, 1.35);
        this.setupShadow(spot, this.q.shadowSize, g.range + 1.5);
        this.scene.add(spot, spot.target);
      }
      const cone = new ConeDecal();
      this.scene.add(cone.light, cone.mesh);
      const icon = new THREE.Sprite(new THREE.SpriteMaterial({ depthTest: false, transparent: true }));
      icon.scale.set(0.42, 0.42, 1);
      icon.renderOrder = 21;
      this.scene.add(icon);
      const bar = new SusBar(this.barGeo);
      this.scene.add(bar.mesh);
      let volume: THREE.Mesh | null = null;
      if (this.q.volumes) {
        volume = this.makeVolume();
        this.scene.add(volume);
      }
      this.guards.push({ rig, spot, cone, icon, bar, volume });
    });
    w.cameras.forEach((c) => {
      let spot: THREE.SpotLight | null = null;
      if (this.q.spots) {
        spot = new THREE.SpotLight(0xcfe4ff, 0, c.range, c.fov / 2, 0.35, 1.3);
        this.setupShadow(spot, Math.max(256, this.q.shadowSize / 2), c.range + 2);
        this.scene.add(spot, spot.target);
      }
      const cone = new ConeDecal();
      this.scene.add(cone.light, cone.mesh);
      const bar = new SusBar(this.barGeo);
      this.scene.add(bar.mesh);
      const label = new Label();
      this.scene.add(label.sprite);
      this.camsV.push({ spot, cone, bar, label });
    });
    this.def = w.def;
    this.camInit = false;
    this.needsRebuild = false;
  }

  private setupShadow(s: THREE.SpotLight, size: number, far: number): void {
    s.castShadow = this.q.shadows;
    s.shadow.mapSize.set(size, size);
    s.shadow.camera.near = 0.1;
    s.shadow.camera.far = far;
    s.shadow.bias = -0.0006;
    s.shadow.normalBias = 0.025;
  }

  private makeVolume(): THREE.Mesh {
    const geo = new THREE.ConeGeometry(1, 1, 24, 1, true);
    geo.translate(0, -0.5, 0);
    geo.rotateZ(Math.PI / 2); // apex at origin, opening along +X
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      uniforms: { uColor: { value: new THREE.Color(1, 0.94, 0.85) }, uAlpha: { value: 0.05 } },
      vertexShader: 'varying float vX; varying vec3 vN; varying vec3 vV; void main(){ vX = position.x; vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'uniform vec3 uColor; uniform float uAlpha; varying float vX; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - clamp(vX,0.0,1.0), 1.6); float e = pow(abs(dot(vN, vV)), 1.5); gl_FragColor = vec4(uColor * f * e * uAlpha, 1.0); }',
    });
    const m = new THREE.Mesh(geo, mat);
    m.frustumCulled = false;
    m.renderOrder = 7;
    return m;
  }

  private icon(state: GuardState, pal: Palette): THREE.CanvasTexture | null {
    if (state === 'patrol') return null;
    const key = `${state}-${this.cbMode ? 1 : 0}`;
    let t = this.icons.get(key);
    if (!t) { t = iconTexture(state, state === 'suspicious' ? pal.suspicious : state === 'alert' ? pal.alert : pal.search); this.icons.set(key, t); }
    return t;
  }

  // ---- frame ---------------------------------------------------------------------------------
  draw(w: World, o: RenderOpts, dt: number): void {
    if (this.lost) return;
    if (o.cb !== this.cbMode) { this.cbMode = o.cb; this.needsRebuild = true; for (const t of this.icons.values()) t.dispose(); this.icons.clear(); }
    if (w.def !== this.def || this.needsRebuild || !this.level) this.build(w);
    const level = this.level!;
    const pal = this.cbMode ? PAL_CB : PAL_NORMAL;
    this.time += dt;
    const time = this.time;
    const reduce = o.reduce;
    const u = this.u;
    u.uTime.value = time;
    u.uSweep.value = reduce ? 0 : 1;

    // ---- facility lighting state
    const anyAlert = w.guards.some((g) => g.state === 'alert');
    const band = w.alert >= 60 || anyAlert ? 2 : w.alert >= 30 ? 1 : 0;
    const targetAlert = band === 2 ? 1 : band === 1 ? 0.55 : 0;
    u.uAlert.value += (targetAlert - u.uAlert.value) * (1 - Math.exp(-dt * 3));
    u.uAlertCol.value.copy(band === 2 || w.blackout ? pal.alert : pal.amber);
    const fxTarget = w.blackout ? 0 : 1;
    this.fixtureLevel += (fxTarget - this.fixtureLevel) * (dt > 0 ? 1 - Math.exp(-dt * 2.2) : 1);
    if (o.menu) this.fixtureLevel = 1;
    u.uBakeGain.value = BASE_GAIN * (0.03 + 0.97 * this.fixtureLevel);
    u.uEmerg.value = w.blackout ? 0.7 : 0;
    level.fixtureMat.emissiveIntensity = 2.6 * this.fixtureLevel;
    level.beaconMat.emissive.copy(u.uAlertCol.value);
    level.beaconMat.emissiveIntensity = (u.uAlert.value > 0.05 || w.blackout) ? (reduce ? 2.5 : 1.5 + 1.5 * Math.abs(Math.sin(time * 2.4))) : 0;
    level.update(w, dt, time, reduce, pal, !!o.menu);

    // ---- operative
    const p = w.player;
    const pr = this.player!;
    pr.root.visible = !p.hidden && !o.menu;
    animateRig(pr, p.x, p.y, { face: p.dir, sneak: p.sneak, alert: false, suspicious: false, headLead: true }, dt, reduce);
    const lit = isLit(w, p.x, p.y);
    this.rim.value.setRGB(0.08, 0.13, 0.17).multiplyScalar(lit ? 0.6 : 1.4);
    const vm = this.visMat.uniforms;
    this.visRing.visible = !p.hidden && !o.menu;
    this.visRing.position.set(p.x, 0.02, p.y);
    if (lit) {
      vm.uColor.value.copy(pal.suspicious); vm.uAlpha.value = 0.95; vm.uDashN.value = 0; vm.uRays.value = p.sneak ? 2 : 4;
      vm.uR0.value = 0.5; vm.uR1.value = 0.58; this.visRing.scale.setScalar(0.62);
    } else {
      vm.uColor.value.copy(pal.patrol); vm.uAlpha.value = 0.45; vm.uDashN.value = 12; vm.uRays.value = 0;
      vm.uR0.value = 0.54; vm.uR1.value = 0.58; this.visRing.scale.setScalar(0.62);
    }
    vm.uRot.value = 0;

    // ---- guards
    const coneOn = o.cones && !o.menu;
    w.guards.forEach((g, i) => this.updateGuard(w, g, this.guards[i], pal, coneOn, dt, reduce, o));

    // ---- cameras
    w.cameras.forEach((c, i) => {
      const v = this.camsV[i];
      const range = c.range * DIFF[w.difficulty].range;
      const dead = w.blackout;
      const looped = c.loopT > 0;
      const live = !looped && !dead;
      const hot = c.trackT > 0 || c.sus > 50;
      const camCol = hot ? pal.alert : pal.camera;
      if (v.spot) {
        const lp = level.cams[i].lensPos.getWorldPosition(new THREE.Vector3());
        v.spot.position.copy(lp);
        v.spot.target.position.set(c.x + Math.cos(c.dir) * range * 0.62, 0, c.y + Math.sin(c.dir) * range * 0.62);
        v.spot.distance = range * 1.1;
        v.spot.angle = c.fov / 2;
        v.spot.color.copy(hot ? new THREE.Color(1, 0.55, 0.5) : new THREE.Color(0.82, 0.9, 1));
        v.spot.intensity = live ? 26 : 0;
      }
      const style: ConeStyle = { color: camCol, fill: 0.07, edge: 0.45, pattern: 3, edgeStyle: 1 };
      v.cone.update(w, c.x, c.y, c.dir, c.fov, range, range * K.SHADOW_RANGE, style, new THREE.Color(0.55, 0.62, 0.7));
      v.cone.mesh.visible = coneOn && live;
      v.cone.light.visible = !this.q.spots && live && !o.menu;
      v.bar.mesh.visible = live && c.sus > 1 && !o.menu;
      if (v.bar.mesh.visible) {
        v.bar.mesh.position.set(c.x, 1.55, c.y);
        v.bar.mesh.quaternion.copy(this.camera.quaternion);
        v.bar.mat.uniforms.uFill.value = Math.min(1, c.sus / 100);
        v.bar.mat.uniforms.uColor.value.copy(c.sus >= 100 ? pal.alert : c.sus >= K.SUS_THRESHOLD ? pal.suspicious : pal.patrol);
      }
      v.label.sprite.position.set(c.x, 1.62, c.y);
      v.label.set(o.menu ? '' : dead ? 'Offline' : looped && c.loopT < 9000 ? `Looped ${c.loopT.toFixed(1)} s` : looped ? 'Offline' : '');
    });

    this.updateEffects(w, pal, time, reduce, o);
    this.updateCamera(w, o, dt);
    if (this.composer) this.composer.render(dt);
    else this.renderer.render(this.scene, this.camera);
  }

  private updateGuard(w: World, g: Guard, v: GuardView, pal: Palette, coneOn: boolean, dt: number, reduce: boolean, o: RenderOpts): void {
    const range = g.range * DIFF[w.difficulty].range;
    animateRig(v.rig, g.x, g.y, { face: g.dir, sneak: false, alert: g.state === 'alert', suspicious: g.state === 'suspicious' || g.state === 'search', headLead: true }, dt, reduce);
    const col = g.state === 'patrol' ? pal.patrol : g.state === 'suspicious' ? pal.suspicious : g.state === 'alert' ? pal.alert : pal.search;
    const cx = Math.cos(g.dir), cy = Math.sin(g.dir);
    if (v.spot) {
      v.spot.position.set(g.x + cx * 0.24, 0.64, g.y + cy * 0.24);
      v.spot.target.position.set(g.x + cx * range * 0.85, 0, g.y + cy * range * 0.85);
      v.spot.distance = range * 1.08;
      v.spot.angle = g.fov / 2;
      v.spot.intensity = g.state === 'alert' ? 40 : g.state === 'patrol' ? 28 : 34;
    }
    if (v.volume) {
      // light volume stops at the first wall on the centre ray
      let d = 0;
      for (; d < range; d += 0.15) if (blocksSight(w, Math.floor(g.x + cx * d), Math.floor(g.y + cy * d))) break;
      const len = Math.max(0.5, Math.min(d, range) * 0.9);
      v.volume.position.set(g.x + cx * 0.24, 0.64, g.y + cy * 0.24);
      v.volume.rotation.set(0, -g.dir, -0.09);
      v.volume.scale.set(len, Math.tan(g.fov / 2) * len * 0.8, Math.tan(g.fov / 2) * len * 0.8);
      v.volume.visible = !o.menu || true;
    }
    const style: ConeStyle = g.state === 'patrol'
      ? { color: col, fill: 0.06, edge: 0.4, pattern: this.cbMode ? 0 : 0, edgeStyle: 0 }
      : g.state === 'suspicious' ? { color: col, fill: 0.07, edge: 0.7, pattern: 1, edgeStyle: 1 }
        : g.state === 'alert' ? { color: col, fill: 0.09, edge: 0.9, pattern: 2, edgeStyle: 2 }
          : { color: col, fill: 0.06, edge: 0.65, pattern: 3, edgeStyle: 3 };
    v.cone.update(w, g.x, g.y, g.dir, g.fov, range, range * K.SHADOW_RANGE, style, new THREE.Color(0.95, 0.88, 0.72));
    v.cone.mesh.visible = coneOn;
    v.cone.light.visible = !this.q.spots;
    const tex = this.icon(g.state, pal);
    const im = v.icon.material as THREE.SpriteMaterial;
    v.icon.visible = !!tex && !o.menu;
    if (tex && im.map !== tex) { im.map = tex; im.needsUpdate = true; }
    const pulse = g.state === 'alert' && !reduce ? 1 + 0.1 * Math.sin(this.time * 9) : 1;
    v.icon.scale.set(0.42 * pulse, 0.42 * pulse, 1);
    v.icon.position.set(g.x, 1.62, g.y);
    v.bar.mesh.visible = g.sus > 1 && g.state !== 'alert' && !o.menu;
    if (v.bar.mesh.visible) {
      v.bar.mesh.position.set(g.x, 1.33, g.y);
      v.bar.mesh.quaternion.copy(this.camera.quaternion);
      v.bar.mat.uniforms.uFill.value = Math.min(1, g.sus / 100);
      v.bar.mat.uniforms.uColor.value.copy(g.sus >= 100 ? pal.alert : g.sus >= K.SUS_THRESHOLD ? pal.suspicious : pal.patrol);
    }
  }

  private updateEffects(w: World, pal: Palette, time: number, reduce: boolean, o: RenderOpts): void {
    // noise rings
    let n = 0;
    for (const r of w.rings) {
      if (n >= this.noise.length) break;
      const slot = this.noise[n++];
      const t = r.age / r.ttl;
      const steps = r.kind === 'step' || r.kind === 'sneak';
      const rad = r.r * (steps ? 0.4 + 0.6 * t : 0.3 + 0.7 * t);
      slot.mesh.visible = !o.menu;
      slot.mesh.position.set(r.x, 0.03, r.y);
      slot.mesh.scale.setScalar(Math.max(0.05, reduce && !steps ? r.r : rad));
      const col = r.kind === 'alarm' ? pal.alert : r.kind === 'hack' ? pal.laser : r.kind === 'decoy' ? pal.amber : pal.patrol;
      slot.mat.uniforms.uColor.value.copy(col);
      slot.mat.uniforms.uAlpha.value = (steps ? 0.22 : 0.7) * (1 - t);
      slot.mat.uniforms.uR0.value = steps ? 0.97 : 0.95;
      slot.mat.uniforms.uDashN.value = r.kind === 'alarm' ? 0 : r.kind === 'decoy' ? 16 : 0;
    }
    for (; n < this.noise.length; n++) this.noise[n].mesh.visible = false;
    // decoy
    const d = w.decoy;
    this.decoy.visible = !!d && !o.menu;
    if (d) {
      this.decoy.position.set(d.x, 0, d.y);
      const blink = reduce ? true : Math.floor(time * 4) % 2 === 0;
      this.decoyLed.emissiveIntensity = blink ? 4 : 0.3;
      this.decoyArc.uniforms.uColor.value.copy(pal.amber);
      this.decoyArc.uniforms.uProg.value = Math.max(0, Math.min(1, d.t / K.DECOY_T));
      this.decoyArc.uniforms.uAlpha.value = 0.85;
    }
    // hack focus
    const f = w.player.focus;
    const h = f && !o.menu ? hackables(w).find((q) => q.kind === f.kind && q.i === f.i) : undefined;
    this.focusRing.visible = !!h;
    this.focusLine.visible = !!h && !w.player.hidden;
    if (h) {
      this.focusRing.position.set(h.x, h.kind === 'camera' ? 0.04 : 0.05, h.y);
      this.focusRing.scale.setScalar(0.62);
      this.focusMat.uniforms.uColor.value.copy(pal.laser);
      this.focusMat.uniforms.uRot.value = reduce ? 0 : time * 0.6;
      this.focusMat.uniforms.uAlpha.value = 0.9;
      const pos = this.focusLine.geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, w.player.x, 0.05, w.player.y);
      pos.setXYZ(1, h.x, 0.05, h.y);
      pos.needsUpdate = true;
      (this.focusLine.material as THREE.LineBasicMaterial).color.copy(pal.laser);
    }
    // cutaway follows the operative
    this.u.uCut.value.set(w.player.x, 0, w.player.y);
    this.u.uCutOn.value = o.menu ? 0 : 1;
  }

  private updateCamera(w: World, o: RenderOpts, dt: number): void {
    const p = w.player;
    let tx: number, tz: number, dist: number;
    if (o.menu) {
      const t = this.time * (o.reduce ? 0 : 0.05);
      tx = w.map.w * (0.5 + Math.sin(t) * 0.22);
      tz = w.map.h * (0.52 + Math.cos(t * 0.7) * 0.12);
      dist = Math.max(18, w.map.w * 0.62);
    } else {
      const vx = dt > 0 ? (p.x - this.lastPX) / dt : 0, vy = dt > 0 ? (p.y - this.lastPY) / dt : 0;
      const sp = Math.hypot(vx, vy);
      const want = new THREE.Vector3(sp > 0.3 && sp < 8 && !o.reduce ? (vx / sp) * 1.4 : 0, 0, sp > 0.3 && sp < 8 && !o.reduce ? (vy / sp) * 1.4 : 0);
      this.lead.lerp(want, 1 - Math.exp(-dt * 2.2));
      dist = o.zoom ? 30 : this.camDist;
      // keep the view over the building: clamp the target so the map edge never leaves a void
      const halfW = Math.min(w.map.w / 2, dist * 0.42 * this.camera.aspect), halfH = Math.min(w.map.h / 2, dist * 0.3);
      tx = Math.max(halfW, Math.min(w.map.w - halfW, p.x + this.lead.x));
      tz = Math.max(halfH - 1, Math.min(w.map.h - halfH + 1.5, p.y + this.lead.z));
    }
    this.lastPX = p.x; this.lastPY = p.y;
    if (!this.camInit) { this.camT.set(tx, 0, tz); this.camInit = true; this.curDist = dist; }
    const k = 1 - Math.exp(-dt * (o.menu ? 1 : 4.5));
    this.camT.x += (tx - this.camT.x) * k;
    this.camT.z += (tz - this.camT.z) * k;
    this.curDist += (dist - this.curDist) * (1 - Math.exp(-dt * 3));
    let sx = 0, sz = 0;
    if (this.shake > 0) { this.shake -= dt; if (!o.reduce) { sx = (Math.random() - 0.5) * 0.16; sz = (Math.random() - 0.5) * 0.16; } }
    const pitch = PITCH - (o.menu ? 0.12 : 0) + this.lead.z * 0.02;
    const cx = this.camT.x - this.lead.x * 0.25 + sx;
    const cz = this.camT.z + Math.cos(pitch) * this.curDist + sz;
    this.camera.position.set(cx, Math.sin(pitch) * this.curDist, cz);
    this.camera.lookAt(this.camT.x + sx, 0, this.camT.z + sz);
  }
  private curDist = 16;

  dispose(): void {
    this.teardown();
    for (const t of this.icons.values()) t.dispose();
    this.composer?.dispose();
    this.env?.dispose();
    this.pmrem.dispose();
    this.renderer.dispose();
    this.canvas.remove();
  }
}
