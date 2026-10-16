// WebGL renderer for PARADOX ROOM (Three.js). The fold is a real rotation of the room group.
// World space: x right, y up, z toward the camera. View space of the rules: x right, y down, z away.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { Dir, GEvent, GState, Level } from '../core/types.ts';
import { MATS } from '../core/rotations.ts';
import { applyAction, crystalsLeft, dirVec, probeMove } from '../core/rules.ts';
import type { Flags, Quality, QualitySetting, ViewRenderer } from '../render/types.ts';
import { buildTextures, type TextureBank } from './textures.ts';
import { buildMaterials, COLORS, type MaterialBank } from './materials.ts';
import { buildBackWall, buildRoomGeometry, cellLocal, dirLocal } from './roomMesh.ts';
import { buildProp, buildSurveyor, doorSlab, type Prop, type Surveyor } from './props.ts';
import { detectQuality, PRESETS } from './quality.ts';

const BASE_YAW = THREE.MathUtils.degToRad(-18);
const BASE_PITCH = THREE.MathUtils.degToRad(28);
const MAX_YAW = THREE.MathUtils.degToRad(24);
const MAX_PITCH = THREE.MathUtils.degToRad(10);
const GRAVITY = 34; // cells / s^2 for the post-fold fall
const DIRS: Dir[] = ['right', 'left', 'away', 'toward'];
const UP = new THREE.Vector3(0, 1, 0);

const easeInOut = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Rotation for orientation index `o`: world = F R F local, with F = diag(1, -1, -1). */
function quatFor(o: number, out = new THREE.Quaternion()): THREE.Quaternion {
  const R = MATS[o];
  const f = [1, -1, -1];
  const m = new THREE.Matrix4();
  const e: number[] = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) e[i * 3 + j] = f[i] * R[i * 3 + j] * f[j];
  m.set(e[0], e[1], e[2], 0, e[3], e[4], e[5], 0, e[6], e[7], e[8], 0, 0, 0, 0, 1);
  return out.setFromRotationMatrix(m);
}

interface RoomView {
  group: THREE.Group;
  props: Prop[];
  seamMat: THREE.MeshBasicMaterial;
  radius: number;
  doorDir: Map<number, THREE.Vector3>;
  disposables: { dispose(): void }[];
}

interface Fold {
  room: number;
  from: THREE.Quaternion;
  to: THREE.Quaternion;
  t: number;
  delay: number;
}

interface Pulse {
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  t: number;
  life: number;
  size: number;
}

export interface Renderer3DHooks {
  onContextLost(): void;
  onContextRestored(): void;
  onContextGone(): void;
}

export class Renderer3D implements ViewRenderer {
  readonly kind = '3d' as const;
  facing: Dir = 'right';
  activeQuality: Quality = 'medium';
  private setting: QualitySetting = 'auto';
  private gl: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(30, 1, 0.1, 160);
  private composer: EffectComposer | null = null;
  private bloom: UnrealBloomPass | null = null;
  private tex: TextureBank;
  private mats: MaterialBank;
  private env: THREE.WebGLRenderTarget | null = null;
  private lantern: THREE.PointLight;
  private surveyor: Surveyor;
  private dust: THREE.Points | null = null;
  private dustVel: Float32Array | null = null;
  private grid: THREE.Mesh;
  private walk: THREE.Mesh[] = [];
  private cross: THREE.Mesh[] = [];
  private crossFlash = [0, 0, 0, 0];
  private targetRing: THREE.Mesh;
  private blob: THREE.Mesh;
  private pulses: Pulse[] = [];
  private pulseGeo = new THREE.PlaneGeometry(1, 1);
  private decalGeo = new THREE.PlaneGeometry(0.86, 0.86);
  private crossGeo = new THREE.PlaneGeometry(0.26, 0.26);
  private caption: HTMLDivElement;
  private captionTimer = 0;

  level: Level | null = null;
  state: GState | null = null;
  private rooms: RoomView[] = [];
  private shown = -1;
  private fold: Fold | null = null;
  private pendingDelay = 0;
  private pv = new THREE.Vector3(); // player position in room cell coordinates (continuous)
  private pvTarget = new THREE.Vector3();
  private fall: { from: THREE.Vector3; to: THREE.Vector3; t: number; dur: number } | null = null;
  private doorOpen = new Map<number, number>();
  private time = 0;
  private squash = 0;
  private dip = 0;
  private shake = { t: 0, dir: new THREE.Vector3() };
  private W = 1;
  private H = 1;
  private insets = { top: 0, bottom: 0, left: 0 };
  private camTarget = new THREE.Vector3();
  private camSnap = true;
  private userYaw = 0;
  private userPitch = 0;
  private screen = new Map<number, [number, number, number]>();
  private attractState: GState | null = null;
  private attractT = 0;
  private lost = false;
  private goneTimer = 0;
  private perf = { acc: 0, n: 0, t: 0 };
  private lastNow = performance.now();
  private foldTime = 0.6;
  private v1 = new THREE.Vector3();
  private v2 = new THREE.Vector3();
  private q1 = new THREE.Quaternion();

  constructor(canvas: HTMLCanvasElement, setting: QualitySetting, private hooks: Renderer3DHooks) {
    this.canvas = canvas;
    const gl = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', stencil: false });
    if (!gl.capabilities.isWebGL2) {
      gl.dispose();
      throw new Error('WebGL 2 is unavailable');
    }
    this.gl = gl;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.setClearColor(COLORS.lampBlack, 1);
    const slow = Number(new URLSearchParams(location.search).get('foldms'));
    if (slow > 0 && slow <= 20000) this.foldTime = slow / 1000;

    this.setting = setting;
    this.activeQuality = setting === 'auto' ? detectQuality(gl.getContext()) : setting;
    this.tex = buildTextures(this.activeQuality, gl.capabilities.getMaxAnisotropy());
    this.mats = buildMaterials(this.tex, PRESETS[this.activeQuality].transmission);

    const sc = this.scene;
    sc.background = new THREE.Color(COLORS.lampBlack);
    sc.fog = new THREE.FogExp2(COLORS.lampBlack, 0.03);
    this.buildEnvironment();

    const hemi = new THREE.HemisphereLight(0x8f9cb4, 0x2a2018, 1.1);
    sc.add(hemi);
    const moon = new THREE.DirectionalLight(0xa9bddc, 1.1);
    moon.position.set(-3, 10, 5);
    sc.add(moon);

    this.surveyor = buildSurveyor(this.mats);
    sc.add(this.surveyor.root);
    this.lantern = new THREE.PointLight(COLORS.lantern, 9, 0, 2);
    this.lantern.shadow.bias = -0.002;
    this.lantern.shadow.normalBias = 0.03;
    this.lantern.shadow.camera.near = 0.05;
    this.lantern.shadow.camera.far = 30;
    this.surveyor.lanternLightAnchor.add(this.lantern);

    // the House floats over its own plan
    this.tex.grid.repeat.set(60, 60);
    this.grid = new THREE.Mesh(new THREE.PlaneGeometry(240, 240), this.mats.grid);
    this.grid.rotation.x = -Math.PI / 2;
    this.grid.position.y = -9;
    sc.add(this.grid);

    // floor decals
    for (let i = 0; i < 4; i++) {
      const wm = new THREE.MeshBasicMaterial({ map: this.tex.walk, color: COLORS.seam, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -2, fog: false });
      const w = new THREE.Mesh(this.decalGeo, wm);
      w.rotation.x = -Math.PI / 2;
      w.renderOrder = 2;
      sc.add(w);
      this.walk.push(w);
      const cm = new THREE.MeshBasicMaterial({ map: this.tex.cross, color: 0xdfe4de, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, fog: false });
      const c = new THREE.Mesh(this.crossGeo, cm);
      c.rotation.x = -Math.PI / 2;
      c.renderOrder = 2;
      sc.add(c);
      this.cross.push(c);
    }
    this.targetRing = new THREE.Mesh(
      this.decalGeo,
      new THREE.MeshBasicMaterial({ map: this.tex.ring, color: new THREE.Color(COLORS.brass).multiplyScalar(1.4), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -3, fog: false }),
    );
    this.targetRing.rotation.x = -Math.PI / 2;
    this.targetRing.renderOrder = 3;
    sc.add(this.targetRing);
    this.blob = new THREE.Mesh(this.decalGeo, new THREE.MeshBasicMaterial({ map: this.tex.blob, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, fog: false }));
    this.blob.rotation.x = -Math.PI / 2;
    this.blob.scale.setScalar(0.62);
    this.blob.renderOrder = 1;
    sc.add(this.blob);

    this.caption = document.createElement('div');
    this.caption.className = 'room-caption';
    this.caption.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.caption);

    canvas.addEventListener('webglcontextlost', this.onLost, false);
    canvas.addEventListener('webglcontextrestored', this.onRestored, false);

    this.applyQuality();
    this.resize();
  }

  // ------------------------------------------------------------------ setup helpers
  private buildEnvironment(): void {
    this.env?.dispose();
    const pm = new THREE.PMREMGenerator(this.gl);
    const room = new RoomEnvironment();
    this.env = pm.fromScene(room, 0.04);
    room.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      }
    });
    pm.dispose();
    this.scene.environment = this.env.texture;
    this.scene.environmentIntensity = 0.5;
  }

  private onLost = (e: Event): void => {
    e.preventDefault();
    this.lost = true;
    this.hooks.onContextLost();
    window.clearTimeout(this.goneTimer);
    this.goneTimer = window.setTimeout(() => {
      if (this.lost) this.hooks.onContextGone();
    }, 5000);
  };

  private onRestored = (): void => {
    this.lost = false;
    window.clearTimeout(this.goneTimer);
    this.buildEnvironment();
    for (const t of this.tex.all) t.needsUpdate = true;
    this.applyQuality();
    if (this.level && this.state) {
      const lvl = this.level;
      this.level = null;
      this.setState(lvl, this.state);
    }
    this.hooks.onContextRestored();
  };

  setQuality(q: QualitySetting): void {
    this.setting = q;
    const next = q === 'auto' ? detectQuality(this.gl.getContext()) : q;
    const transChanged = PRESETS[next].transmission !== PRESETS[this.activeQuality].transmission;
    this.activeQuality = next;
    if (transChanged) {
      this.mats.frosted.transmission = PRESETS[next].transmission ? 0.9 : 0;
      this.mats.frosted.transparent = !PRESETS[next].transmission;
      this.mats.frosted.opacity = PRESETS[next].transmission ? 1 : 0.55;
      this.mats.frosted.needsUpdate = true;
    }
    this.applyQuality();
    if (transChanged && this.level && this.state) {
      const lvl = this.level;
      this.level = null;
      this.setState(lvl, this.state);
    }
  }

  private applyQuality(): void {
    const p = PRESETS[this.activeQuality];
    this.gl.setPixelRatio(Math.min(p.pixelRatio, window.devicePixelRatio || 1));
    const shadowChanged = this.gl.shadowMap.enabled !== p.shadows || this.lantern.shadow.mapSize.x !== (p.shadowSize || 512);
    this.gl.shadowMap.enabled = p.shadows;
    this.lantern.castShadow = p.shadows;
    if (p.shadows) {
      this.lantern.shadow.mapSize.set(p.shadowSize, p.shadowSize);
      this.lantern.shadow.map?.dispose();
      this.lantern.shadow.map = null;
    }
    if (shadowChanged) this.scene.traverse((o) => {
      const m = (o as THREE.Mesh).material;
      if (Array.isArray(m)) m.forEach((x) => (x.needsUpdate = true));
      else if (m) m.needsUpdate = true;
    });
    (this.blob.material as THREE.MeshBasicMaterial).opacity = p.shadows ? 0.45 : 0.8;
    // bloom
    if (p.bloom && !this.composer) {
      const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
      this.composer = new EffectComposer(this.gl, rt);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.3, 0.5, 1.5);
      this.composer.addPass(this.bloom);
      this.composer.addPass(new OutputPass());
    } else if (!p.bloom && this.composer) {
      this.composer.dispose();
      this.bloom?.dispose();
      this.composer = null;
      this.bloom = null;
    }
    // dust
    if (this.dust) {
      this.scene.remove(this.dust);
      this.dust.geometry.dispose();
      (this.dust.material as THREE.Material).dispose();
      this.dust = null;
    }
    if (p.dust > 0) {
      const pos = new Float32Array(p.dust * 3);
      this.dustVel = new Float32Array(p.dust * 3);
      for (let i = 0; i < p.dust; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 9;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
        this.dustVel[i * 3] = (Math.random() - 0.5) * 0.06;
        this.dustVel[i * 3 + 1] = (Math.random() - 0.3) * 0.05;
        this.dustVel[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ map: this.tex.dot, color: 0xffd8a8, size: 0.05, sizeAttenuation: true, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending });
      this.dust = new THREE.Points(g, mat);
      this.dust.frustumCulled = false;
      this.scene.add(this.dust);
    }
    this.resize();
  }

  resize(): void {
    const W = Math.max(1, Math.floor(window.innerWidth));
    const H = Math.max(1, Math.floor(window.innerHeight));
    this.W = W;
    this.H = H;
    this.gl.setSize(W, H, true);
    this.camera.aspect = W / H;
    this.camera.updateProjectionMatrix();
    if (this.composer) {
      this.composer.setPixelRatio(this.gl.getPixelRatio());
      this.composer.setSize(W, H);
      this.bloom?.setSize(Math.ceil((W * this.gl.getPixelRatio()) / 2), Math.ceil((H * this.gl.getPixelRatio()) / 2));
    }
  }

  setInsets(top: number, bottom: number, left = 0): void {
    this.insets = { top, bottom, left };
  }

  // ------------------------------------------------------------------ level building
  private disposeRooms(): void {
    for (const r of this.rooms) {
      this.scene.remove(r.group);
      for (const p of r.props) p.dispose();
      for (const d of r.disposables) d.dispose();
    }
    this.rooms = [];
    this.shown = -1;
  }

  private buildRoom(level: Level, ri: number): RoomView {
    const r = level.rooms[ri];
    const group = new THREE.Group();
    const disposables: { dispose(): void }[] = [];
    const geo = buildRoomGeometry(level, ri);
    disposables.push(geo);
    const mesh = new THREE.Mesh(geo, [this.mats.plaster, this.mats.stone, this.mats.poche]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    const back = buildBackWall(level, ri);
    if (back) {
      disposables.push(back);
      const bm = new THREE.Mesh(back, this.mats.backWall);
      bm.receiveShadow = true;
      group.add(bm);
    }
    // fold seams: the twelve edges of the room box
    const t = 0.016;
    const edges: THREE.BufferGeometry[] = [];
    const hw = r.w / 2;
    const hh = r.h / 2;
    const hd = r.d / 2;
    for (const sy of [-1, 1])
      for (const sz of [-1, 1]) edges.push(new THREE.BoxGeometry(r.w + t, t, t).translate(0, sy * hh, sz * hd));
    for (const sx of [-1, 1])
      for (const sz of [-1, 1]) edges.push(new THREE.BoxGeometry(t, r.h + t, t).translate(sx * hw, 0, sz * hd));
    for (const sx of [-1, 1])
      for (const sy of [-1, 1]) edges.push(new THREE.BoxGeometry(t, t, r.d + t).translate(sx * hw, sy * hh, 0));
    const seamGeo = mergeGeometries(edges);
    for (const e of edges) e.dispose();
    const seamMat = this.mats.seam.clone();
    disposables.push(seamGeo, seamMat);
    group.add(new THREE.Mesh(seamGeo, seamMat));

    const solidAt = (x: number, y: number, z: number): boolean => x >= 0 && y >= 0 && z >= 0 && x < r.w && y < r.h && z < r.d && r.solid[x + r.w * (y + r.h * z)] === 1;
    const props: Prop[] = [];
    const doorDir = new Map<number, THREE.Vector3>();
    const order: [number, number, number][] = [
      [0, 1, 0],
      [1, 0, 0],
      [-1, 0, 0],
      [0, 0, 1],
      [0, 0, -1],
      [0, -1, 0],
    ];
    for (const o of level.objs) {
      if (o.room !== ri) continue;
      const p = buildProp(o, this.mats, this.tex, PRESETS[this.activeQuality].transmission);
      const c = cellLocal(level, ri, o.x, o.y, o.z);
      if (p.mount === 'fixed') {
        const sup = order.find(([dx, dy, dz]) => solidAt(o.x + dx, o.y + dy, o.z + dz)) ?? [0, 1, 0];
        const dl = dirLocal(sup);
        p.root.position.copy(c).addScaledVector(dl, 0.5);
        p.root.quaternion.setFromUnitVectors(UP, dl.clone().negate());
      } else if (p.mount === 'cell') {
        p.root.position.copy(c);
        const hor: [number, number, number][] = [
          [1, 0, 0],
          [-1, 0, 0],
          [0, 0, 1],
          [0, 0, -1],
          [0, -1, 0],
          [0, 1, 0],
        ];
        const sd = hor.find(([dx, dy, dz]) => solidAt(o.x + dx, o.y + dy, o.z + dz)) ?? [1, 0, 0];
        doorDir.set(o.id, dirLocal(sd));
      }
      group.add(p.root);
      props.push(p);
    }
    const radius = r.free.some((k) => k === 'pitchA' || k === 'pitchB') || level.objs.some((o) => o.room === ri && o.kind === 'lever' && (o.fold === 'pitchA' || o.fold === 'pitchB'))
      ? 0.5 * Math.hypot(r.w, r.h, r.d)
      : 0.5 * Math.hypot(r.w, r.h) + 0.3;
    return { group, props, seamMat, radius, doorDir, disposables };
  }

  private showRoom(ri: number): void {
    if (this.shown === ri) return;
    if (this.shown >= 0) this.scene.remove(this.rooms[this.shown].group);
    this.shown = ri;
    this.scene.add(this.rooms[ri].group);
  }

  private cellOf(s: GState, out = new THREE.Vector3()): THREE.Vector3 {
    return out.set(s.x, s.y, s.z);
  }

  setState(level: Level, state: GState): void {
    if (this.level !== level) {
      this.disposeRooms();
      this.level = level;
      this.rooms = level.rooms.map((_, i) => this.buildRoom(level, i));
      this.attractState = null;
    }
    this.state = state;
    this.fold = null;
    this.fall = null;
    this.pendingDelay = 0;
    this.rooms.forEach((rv, i) => quatFor(state.ori[i], rv.group.quaternion));
    this.showRoom(state.room);
    this.cellOf(state, this.pv);
    this.pvTarget.copy(this.pv);
    this.doorOpen.clear();
    for (const o of level.objs) if (o.kind === 'door') this.doorOpen.set(o.id, (state.ctl >> (o.bit as number)) & 1);
    for (const p of this.pulses) this.removePulse(p);
    this.pulses = [];
    this.camSnap = true;
  }

  setCaption(text: string): void {
    this.caption.textContent = text;
    this.caption.classList.add('show');
    window.clearTimeout(this.captionTimer);
    this.captionTimer = window.setTimeout(() => this.caption.classList.remove('show'), 2200);
  }

  used(obj: number): void {
    if (!this.level) return;
    const o = this.level.objs[obj];
    const rv = this.rooms[o.room];
    rv?.props.find((p) => p.obj.id === obj)?.trigger();
    if (o.kind === 'lever') this.pendingDelay = 0.22;
  }

  apply(before: GState, after: GState, events: GEvent[], effects: boolean): void {
    if (!this.level) return;
    const roomChanged = before.room !== after.room;
    this.state = after;
    if (roomChanged) {
      this.fold = null;
      this.fall = null;
      quatFor(after.ori[after.room], this.rooms[after.room].group.quaternion);
      this.showRoom(after.room);
      this.cellOf(after, this.pv);
      this.pvTarget.copy(this.pv);
      this.camSnap = true;
      if (effects) this.dip = 1;
      this.setCaption(this.level.rooms[after.room].name);
    }
    for (const e of events) {
      if (e.k === 'fold' && !roomChanged) {
        const ri = before.room;
        const rv = this.rooms[ri];
        if (effects) {
          this.fold = { room: ri, from: quatFor(before.ori[ri]), to: quatFor(after.ori[ri]), t: 0, delay: this.pendingDelay };
          this.cellOf(before, this.pvTarget);
        } else {
          this.fold = null;
          quatFor(after.ori[ri], rv.group.quaternion);
        }
      } else if (e.k === 'step') {
        this.squash = effects ? 1 : 0;
      } else if (e.k === 'collect') {
        const o = this.level.objs[e.obj];
        this.addPulse(o.x, o.y, o.z, COLORS.brass, 1.6, 0.6);
      } else if (e.k === 'latch' || e.k === 'toggle') {
        const o = this.level.objs[e.obj];
        this.addPulse(o.x, o.y, o.z, COLORS.seam, 1.2, 0.5);
      } else if (e.k === 'complete') {
        const ex = this.level.objs.find((o) => o.kind === 'exit');
        if (ex) this.addPulse(ex.x, ex.y, ex.z, COLORS.brass, 5, 1.4);
      }
    }
    this.pendingDelay = 0;
    if (!this.fold) {
      this.cellOf(after, this.pvTarget);
      if (!effects) this.pv.copy(this.pvTarget);
    }
  }

  blockedNudge(dir: Dir): void {
    if (!this.state) return;
    this.shake.t = 0.18;
    const i = DIRS.indexOf(dir);
    const d = dir === 'right' ? [1, 0, 0] : dir === 'left' ? [-1, 0, 0] : dir === 'away' ? [0, 0, -1] : [0, 0, 1];
    this.shake.dir.set(d[0], d[1], d[2]);
    if (i >= 0) this.crossFlash[i] = 1;
  }

  attractTick(dt: number, enabled: boolean): void {
    if (!this.level || !this.state) return;
    this.attractT += dt;
    if (!enabled || this.fold || this.fall || this.attractT < 3.6) return;
    this.attractT = 0;
    const s = this.attractState ?? this.state;
    const r = applyAction(this.level, s, { t: 'fold', kind: 'rollL' });
    if (!r.ok) {
      this.attractState = null;
      return;
    }
    this.attractState = r.state;
    this.apply(s, r.state, r.events, true);
  }

  orbit(dyaw: number, dpitch: number): void {
    this.userYaw = THREE.MathUtils.clamp(this.userYaw + dyaw, -MAX_YAW, MAX_YAW);
    this.userPitch = THREE.MathUtils.clamp(this.userPitch + dpitch, -MAX_PITCH, MAX_PITCH);
  }

  recenter(): void {
    this.userYaw = 0;
    this.userPitch = 0;
  }

  pick(mx: number, my: number, ids: number[]): number | null {
    let best: number | null = null;
    let bd = Infinity;
    for (const id of ids) {
      const p = this.screen.get(id);
      if (!p) continue;
      const d = Math.hypot(p[0] - mx, p[1] - my);
      if (d < p[2] * 0.75 && d < bd) {
        bd = d;
        best = id;
      }
    }
    return best;
  }

  // ------------------------------------------------------------------ pulses
  private addPulse(x: number, y: number, z: number, color: number, size: number, life: number): void {
    if (!this.level || !this.state) return;
    const rv = this.rooms[this.state.room];
    const mat = new THREE.MeshBasicMaterial({ map: this.tex.ring, color: new THREE.Color(color).multiplyScalar(1.6), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    const mesh = new THREE.Mesh(this.pulseGeo, mat);
    mesh.rotation.x = -Math.PI / 2;
    const c = cellLocal(this.level, this.state.room, x, y, z);
    rv.group.updateMatrixWorld();
    rv.group.localToWorld(c);
    mesh.position.set(c.x, c.y - 0.48, c.z);
    this.scene.add(mesh);
    this.pulses.push({ mesh, mat, t: 0, life, size });
  }

  private removePulse(p: Pulse): void {
    this.scene.remove(p.mesh);
    p.mat.dispose();
  }

  // ------------------------------------------------------------------ frame
  frame(dt: number, f: Flags): void {
    if (this.lost || !this.level || !this.state) return;
    const now = performance.now();
    this.trackPerf((now - this.lastNow) / 1000);
    this.lastNow = now;
    const lvl = this.level;
    const st = this.state;
    this.time += dt;
    const rv = this.rooms[st.room];

    // fold rotation
    let foldK = 0;
    if (this.fold) {
      const fd = this.fold;
      if (fd.delay > 0) fd.delay -= dt;
      else fd.t += dt / this.foldTime;
      const k = easeInOut(Math.min(1, Math.max(0, fd.t)));
      foldK = Math.sin(Math.min(1, fd.t) * Math.PI);
      this.rooms[fd.room].group.quaternion.slerpQuaternions(fd.from, fd.to, k);
      if (fd.t >= 1) {
        this.rooms[fd.room].group.quaternion.copy(fd.to); // exact: the scene matches the logical state
        this.fold = null;
        const to = this.cellOf(st, new THREE.Vector3());
        const dist = to.distanceTo(this.pv);
        if (dist > 0.01) this.fall = { from: this.pv.clone(), to, t: 0, dur: Math.sqrt((2 * dist) / GRAVITY) };
        this.pvTarget.copy(to);
      }
    }
    rv.seamMat.color.setHex(COLORS.seam).multiplyScalar((f.contrast ? 1.2 : 0.28) * (1 + 5 * foldK));

    // player motion in room cell space
    const prev = this.v1.copy(this.pv);
    if (this.fall) {
      this.fall.t += dt;
      const u = Math.min(1, this.fall.t / this.fall.dur);
      this.pv.lerpVectors(this.fall.from, this.fall.to, u * u);
      if (u >= 1) {
        this.fall = null;
        this.squash = f.effects ? 1 : 0;
      }
    } else {
      this.pv.lerp(this.pvTarget, 1 - Math.exp(-dt * 14));
      if (this.pv.distanceToSquared(this.pvTarget) < 1e-6) this.pv.copy(this.pvTarget);
    }
    const speed = dt > 0 && !this.fold && !this.fall ? prev.distanceTo(this.pv) / dt : 0;
    this.squash = Math.max(0, this.squash - dt / 0.12);

    // doors slide
    for (const p of rv.props) {
      if (p.obj.kind !== 'door') continue;
      const want = (st.ctl >> (p.obj.bit as number)) & 1;
      const cur = this.doorOpen.get(p.obj.id) ?? want;
      const nv = f.effects ? cur + (want - cur) * (1 - Math.exp(-dt * 9)) : want;
      this.doorOpen.set(p.obj.id, nv);
      const dd = rv.doorDir.get(p.obj.id) as THREE.Vector3;
      const slab = doorSlab(p);
      slab.position.copy(dd).multiplyScalar(nv * 0.94);
      slab.visible = nv < 0.995;
    }

    // world transforms of the shown room
    rv.group.updateMatrixWorld(true);
    const q = rv.group.quaternion;
    const qInv = this.q1.copy(q).invert();
    const downLocal = this.v2.set(0, -0.5, 0).applyQuaternion(qInv);
    const pvWorld = cellLocal(lvl, st.room, this.pv.x, this.pv.y, this.pv.z, new THREE.Vector3());
    rv.group.localToWorld(pvWorld);
    pvWorld.y -= 0.5;

    // props (gravity mounts stay upright in world space)
    const left = crystalsLeft(lvl, st);
    this.screen.clear();
    const tmp = new THREE.Vector3();
    for (const p of rv.props) {
      const o = p.obj;
      if (p.mount === 'gravity') {
        cellLocal(lvl, st.room, o.x, o.y, o.z, p.root.position).add(downLocal);
        p.root.quaternion.copy(qInv);
      }
      const active =
        o.kind === 'crystal' || o.kind === 'shard'
          ? ((st.got >> (o.bit as number)) & 1) === 1
          : o.kind === 'exit'
            ? left === 0
            : o.kind === 'switch' || o.kind === 'plate'
              ? ((st.ctl >> (o.bit as number)) & 1) === 1
              : false;
      p.update({ time: this.time, dt, effects: f.effects, active, highlighted: f.target === o.id || f.hover === o.id });
      if (o.kind === 'lever' || o.kind === 'switch') {
        cellLocal(lvl, st.room, o.x, o.y, o.z, tmp);
        rv.group.localToWorld(tmp);
        this.project(o.id, tmp);
      }
    }

    // the Surveyor
    const sv = this.surveyor;
    sv.root.position.copy(pvWorld);
    sv.root.visible = true;
    const yaw = this.facing === 'right' ? Math.PI / 2 : this.facing === 'left' ? -Math.PI / 2 : this.facing === 'away' ? Math.PI : 0;
    sv.update(this.time, dt, speed, yaw, f.effects, this.squash);
    const fl = f.effects ? 0.94 + 0.04 * Math.sin(this.time * 11.7) + 0.03 * Math.sin(this.time * 23.1 + 0.7) : 1;
    this.lantern.intensity = 9 * fl;
    this.blob.position.set(pvWorld.x, pvWorld.y + 0.012, pvWorld.z);
    this.blob.visible = !this.fold && !this.fall;

    // markers
    const showMarks = f.showPlayer && !this.fold && !this.fall && this.pv.distanceToSquared(this.pvTarget) < 0.01;
    for (let i = 0; i < 4; i++) {
      const pr = probeMove(lvl, st, DIRS[i]);
      const w = this.walk[i];
      const c = this.cross[i];
      const wm = w.material as THREE.MeshBasicMaterial;
      const cm = c.material as THREE.MeshBasicMaterial;
      this.crossFlash[i] = Math.max(0, this.crossFlash[i] - dt / 0.5);
      const hint = f.hintDir === DIRS[i];
      w.visible = showMarks && pr.ok;
      c.visible = showMarks && !pr.ok;
      const dv = dirVec(st, DIRS[i]);
      if (pr.ok) {
        cellLocal(lvl, st.room, pr.to[0], pr.to[1], pr.to[2], tmp);
        rv.group.localToWorld(tmp);
        w.position.set(tmp.x, tmp.y - 0.5 + 0.01, tmp.z);
        const pulse = f.effects ? 0.5 + 0.5 * Math.sin(this.time * 3.2) : 0.5;
        wm.color.setHex(hint ? COLORS.pencil : COLORS.seam).multiplyScalar(hint ? 2.2 : 1);
        wm.opacity = hint ? 0.75 + 0.25 * pulse : (f.contrast ? 0.55 : 0.28) + 0.1 * pulse;
      } else {
        cellLocal(lvl, st.room, st.x + dv[0] * 0.43, st.y + dv[1] * 0.43, st.z + dv[2] * 0.43, tmp);
        rv.group.localToWorld(tmp);
        c.position.set(tmp.x, tmp.y - 0.5 + 0.012, tmp.z);
        cm.opacity = (f.contrast ? 0.7 : 0.32) + 0.65 * this.crossFlash[i];
        c.scale.setScalar(1 + 0.5 * this.crossFlash[i]);
      }
    }
    const tid = f.hover ?? f.target;
    this.targetRing.visible = showMarks && tid !== null;
    if (tid !== null) {
      const o = lvl.objs[tid];
      cellLocal(lvl, st.room, o.x, o.y, o.z, tmp);
      rv.group.localToWorld(tmp);
      this.targetRing.position.set(tmp.x, tmp.y - 0.5 + 0.014, tmp.z);
      this.targetRing.rotation.z = f.effects ? this.time * 0.6 : 0;
      this.targetRing.scale.setScalar(1.05 + (f.effects ? 0.05 * Math.sin(this.time * 3) : 0));
    }

    // pulses
    for (const p of this.pulses) {
      p.t += dt;
      const u = p.t / p.life;
      p.mesh.scale.setScalar(0.4 + u * p.size);
      p.mat.opacity = Math.max(0, 1 - u);
    }
    const alive = this.pulses.filter((p) => p.t < p.life);
    for (const p of this.pulses) if (p.t >= p.life) this.removePulse(p);
    this.pulses = alive;

    // dust drifts through the lantern light
    if (this.dust && this.dustVel) {
      const a = this.dust.geometry.getAttribute('position') as THREE.BufferAttribute;
      const arr = a.array as Float32Array;
      const R = rv.radius;
      for (let i = 0; i < a.count; i++) {
        for (let k = 0; k < 3; k++) {
          arr[i * 3 + k] += this.dustVel[i * 3 + k] * dt * (f.effects ? 1 : 0) + (f.effects ? Math.sin(this.time * 0.3 + i * 1.7 + k) * 0.0008 : 0);
          const lim = k === 1 ? R * 0.8 : R;
          if (arr[i * 3 + k] > lim) arr[i * 3 + k] = -lim;
          else if (arr[i * 3 + k] < -lim) arr[i * 3 + k] = lim;
        }
      }
      a.needsUpdate = true;
    }

    // camera: fixed readable angle, orbit-follow, user offset, blocked shake
    const desired = this.v1.set(0, 0, 0).lerp(pvWorld, 0.35);
    desired.y += 0.15;
    if (this.camSnap) {
      this.camTarget.copy(desired);
      this.camSnap = false;
    } else this.camTarget.lerp(desired, 1 - Math.exp(-dt * 5));
    const { top, bottom, left: li } = this.insets;
    const fov = THREE.MathUtils.degToRad(this.camera.fov);
    const availH = Math.max(120, this.H - top - bottom);
    const availW = Math.max(160, this.W - li - 32);
    const tanV = Math.tan(fov / 2) * (availH / this.H);
    const tanH = Math.tan(fov / 2) * this.camera.aspect * (availW / this.W);
    const dist = (rv.radius * (li > 0 ? 0.9 : 0.72)) / Math.min(tanV, tanH);
    const yawA = BASE_YAW + this.userYaw;
    const pitchA = BASE_PITCH + this.userPitch;
    this.camera.position.set(Math.sin(yawA) * Math.cos(pitchA), Math.sin(pitchA), Math.cos(yawA) * Math.cos(pitchA)).multiplyScalar(dist).add(this.camTarget);
    this.shake.t = Math.max(0, this.shake.t - dt);
    if (this.shake.t > 0 && f.effects) {
      const k = this.shake.t / 0.18;
      const wob = Math.sin(this.shake.t * 90) * 0.035 * k;
      this.camera.position.addScaledVector(this.shake.dir, 0.06 * k * k).add(new THREE.Vector3(wob, -Math.abs(wob) * 0.6, 0));
    }
    this.camera.lookAt(this.camTarget);
    this.camera.setViewOffset(this.W, this.H, -li / 2, (bottom - top) / 2, this.W, this.H);
    this.camera.updateMatrixWorld();

    // screen positions for picking (after the camera moved)
    for (const [id] of this.screen) {
      const o = lvl.objs[id];
      cellLocal(lvl, st.room, o.x, o.y, o.z, tmp);
      rv.group.localToWorld(tmp);
      this.project(id, tmp);
    }

    // portal pass: exposure dips and recovers
    this.dip = Math.max(0, this.dip - dt / 0.35);
    this.gl.toneMappingExposure = 1.0 - 0.75 * this.dip;

    if (this.composer) this.composer.render(dt);
    else this.gl.render(this.scene, this.camera);
  }

  private project(id: number, world: THREE.Vector3): void {
    const a = world.clone().project(this.camera);
    const b = world.clone().add(new THREE.Vector3(1, 0, 0)).project(this.camera);
    const sx = (a.x * 0.5 + 0.5) * this.W;
    const sy = (-a.y * 0.5 + 0.5) * this.H;
    const size = Math.abs((b.x - a.x) * 0.5 * this.W);
    this.screen.set(id, [sx, sy, Math.max(24, size)]);
  }

  /** Auto quality steps down if the frame rate stays below ~40 fps for three seconds. */
  private trackPerf(frameS: number): void {
    if (this.setting !== 'auto' || frameS <= 0 || frameS > 0.5) return;
    this.perf.acc += frameS;
    this.perf.n++;
    this.perf.t += frameS;
    if (this.perf.t < 3) return;
    const avg = this.perf.acc / this.perf.n;
    this.perf = { acc: 0, n: 0, t: 0 };
    if (avg > 1 / 40 && this.activeQuality !== 'low') {
      this.activeQuality = this.activeQuality === 'high' ? 'medium' : 'low';
      this.applyQuality();
    }
  }

  dispose(): void {
    this.canvas.removeEventListener('webglcontextlost', this.onLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onRestored);
    window.clearTimeout(this.goneTimer);
    this.disposeRooms();
    for (const p of this.pulses) this.removePulse(p);
    this.surveyor.dispose();
    for (const m of this.mats.all) m.dispose();
    for (const t of this.tex.all) t.dispose();
    for (const m of [...this.walk, ...this.cross, this.targetRing, this.blob]) (m.material as THREE.Material).dispose();
    this.pulseGeo.dispose();
    this.decalGeo.dispose();
    this.crossGeo.dispose();
    this.grid.geometry.dispose();
    if (this.dust) {
      this.dust.geometry.dispose();
      (this.dust.material as THREE.Material).dispose();
    }
    this.composer?.dispose();
    this.env?.dispose();
    this.caption.remove();
    this.gl.dispose();
  }
}

