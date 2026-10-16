// WebGL renderer (Three.js): fixed angled top-down camera over a real 3D arena.
// Every entity class is drawn with InstancedMesh layers written from the sim each frame; the sim is never mutated.
import * as THREE from 'three';
import { ENEMY_DEFS } from '../../sim/enemies.ts';
import { speedMul } from '../../sim/entities.ts';
import type { ArenaId, Enemy, World } from '../../sim/types.ts';
import type { Settings } from '../../storage/save.ts';
import type { Fx } from '../fx.ts';
import { Visor, type Projector, type StickView } from '../hud.ts';
import type { Preset } from '../quality.ts';
import type { GameRenderer } from '../types.ts';
import { Layer } from './layer.ts';
import { additive, fieldMaterial, glowStandard, hot, laneMaterial, poolMaterial, shadowDecal } from './materials.ts';
import { buildModels, floorQuad, hemisphere, ribbon, type Models } from './models.ts';
import { Post } from './post.ts';
import { Stage, buildEnvironment } from './stage.ts';
import { chevronTexture, lineTexture, radialTexture, ringTexture } from './textures.ts';

const TAU = Math.PI * 2;
const FOV = 40;
const PITCH = (60 * Math.PI) / 180;
const MAX_LIGHTS = 8;

type Rgb = [number, number, number];

export class Renderer3D implements GameRenderer {
  readonly kind = '3d' as const;
  dpr = 1;
  camX = 0;
  camY = 0;
  /** true while the WebGL context is lost */
  lost = false;
  onContext: ((lost: boolean) => void) | null = null;

  private gl: THREE.WebGLRenderer;
  private view: HTMLCanvasElement;
  private hud: HTMLCanvasElement;
  private hctx: CanvasRenderingContext2D;
  private visor = new Visor();
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(FOV, 1, 10, 9000);
  private preset: Preset;
  private post: Post | null = null;
  private stage: Stage | null = null;
  private env: THREE.WebGLRenderTarget | null = null;
  private envArena: ArenaId = 'hollow';
  private M: Models;
  private tex: THREE.Texture[] = [];
  private layers: Layer[] = [];
  private lights: THREE.PointLight[] = [];
  private snap = true;
  private cssW = 1;
  private cssH = 1;
  private colors = new Map<string, THREE.Color>();
  private tmpV = new THREE.Vector3();
  private tmpP = { x: 0, y: 0 };
  private ray = new THREE.Raycaster();
  private plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private lastFacing = 0;
  private bank = 0;

  // player rig (a single object, built once)
  private wick = new THREE.Group();
  private wickGlowMat: THREE.MeshBasicMaterial;
  private field: THREE.Mesh;
  private fieldMat: THREE.ShaderMaterial;
  private poolMat: THREE.ShaderMaterial;
  private laneMat: THREE.ShaderMaterial;

  // layers
  private L!: Record<string, Layer>;

  constructor(view: HTMLCanvasElement, hud: HTMLCanvasElement, preset: Preset) {
    this.view = view;
    this.hud = hud;
    this.preset = preset;
    const hctx = hud.getContext('2d');
    if (!hctx) throw new Error('Canvas 2D is not available for the HUD.');
    this.hctx = hctx;
    // Throws when WebGL is unavailable; main.ts catches it and falls back to Canvas 2D.
    this.gl = new THREE.WebGLRenderer({ canvas: view, antialias: false, powerPreference: 'high-performance', alpha: false, stencil: false });
    if (!this.gl.capabilities.isWebGL2) throw new Error('WebGL2 is not available.');
    this.gl.toneMapping = THREE.ACESFilmicToneMapping;
    this.gl.toneMappingExposure = 1.05;
    this.gl.outputColorSpace = THREE.SRGBColorSpace;
    this.scene.background = new THREE.Color(0x040309);
    this.scene.fog = new THREE.FogExp2(0x0a0716, 0.00036);
    this.scene.add(new THREE.HemisphereLight(0x3a4478, 0x050308, 1.25));
    const key = new THREE.DirectionalLight(0xc8d8ff, 1.3);
    key.position.set(-0.45, 1, 0.35);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xff4fa0, 0.35);
    rim.position.set(0.6, 0.5, -0.8);
    this.scene.add(rim);
    for (let i = 0; i < MAX_LIGHTS; i++) {
      const l = new THREE.PointLight(0xffffff, 0, 400, 1.7);
      l.visible = i < preset.lights;
      this.lights.push(l);
      this.scene.add(l);
    }

    this.M = buildModels();
    const radial = radialTexture();
    const ring = ringTexture();
    const ringDash = ringTexture(true);
    const line = lineTexture();
    const chevron = chevronTexture();
    this.tex.push(radial, ring, ringDash, line, chevron);

    // shared materials
    const armour = glowStandard({ color: 0xffffff, metalness: 0.6, roughness: 0.4, flatShading: true });
    const paint = glowStandard({ color: 0xffffff, metalness: 0.35, roughness: 0.5 });
    const crystal = glowStandard({ color: 0xffffff, metalness: 0.15, roughness: 0.1, flatShading: true });
    const brass = glowStandard({ color: 0xffffff, metalness: 0.95, roughness: 0.28, flatShading: true });
    const hotM = hot(0xffffff);
    const addRadial = additive(radial);
    const addRing = additive(ring);
    const addRingDash = additive(ringDash);
    const addLine = additive(line);
    const addChevron = additive(chevron);
    const shellM = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const outlineM = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
    const plateM = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    this.poolMat = poolMaterial();
    this.laneMat = laneMaterial();
    const M = this.M;
    const mk = (_name: string, geo: THREE.BufferGeometry, mat: THREE.Material, cap: number, glow = false, extra?: Record<string, number>, order?: number): Layer => {
      const l = new Layer(geo.clone(), mat, cap, { glow, extra, renderOrder: order });
      this.layers.push(l);
      this.scene.add(l.mesh);
      return l;
    };
    const q = floorQuad();
    const rb = ribbon();
    this.L = {
      // floor decals (drawn after the floor)
      shadow: mk('shadow', q, shadowDecal(radial), 420, false, undefined, 1),
      pools: mk('pools', q, this.poolMat, 40, false, { aPool: 4 }, 2),
      lanes: mk('lanes', rb, this.laneMat, 12, false, { aLane: 4 }, 3),
      splat: mk('splat', q, addRadial, 900, false, undefined, 4),
      rings: mk('rings', q, addRing, 260, false, undefined, 5),
      ringsDash: mk('ringsDash', q, addRingDash, 8, false, undefined, 5),
      lines: mk('lines', rb, addLine, 160, false, undefined, 6),
      chevrons: mk('chevrons', rb, addChevron, 60, false, undefined, 6),
      // enemies
      drifter: mk('drifter', M.drifter, armour, 200, true),
      drifterEye: mk('drifterEye', M.drifterEye, hotM, 200),
      spitterBody: mk('spitterBody', M.spitterBody, armour, 100, true),
      spitterHead: mk('spitterHead', M.spitterHead, armour, 100, true),
      spitterMuzzle: mk('spitterMuzzle', M.spitterMuzzle, hotM, 100),
      rammer: mk('rammer', M.rammer, armour, 100, true),
      rammerEye: mk('rammerEye', M.rammerEye, hotM, 100),
      cleaver: mk('cleaver', M.cleaver, crystal, 100, true),
      cleaverCore: mk('cleaverCore', M.cleaverCore, hotM, 100),
      splitlet: mk('splitlet', M.splitlet, crystal, 200, true),
      aegis: mk('aegis', M.aegis, paint, 100, true),
      aegisRim: mk('aegisRim', M.aegisRim, hotM, 100),
      shieldFrame: mk('shieldFrame', M.shieldFrame, brass, 100, true),
      shieldPlate: mk('shieldPlate', M.shieldPlate, plateM, 100, false, undefined, 8),
      caster: mk('caster', M.caster, armour, 100, true),
      casterCore: mk('casterCore', M.casterCore, hotM, 100),
      wardenHull: mk('wardenHull', M.wardenHull, paint, 3, true),
      wardenPetal: mk('wardenPetal', M.wardenPetal, armour, 24, true),
      wardenCrown: mk('wardenCrown', M.wardenCrown, hotM, 3),
      wardenNode: mk('wardenNode', M.wardenNode, hotM, 24),
      wardenCore: mk('wardenCore', M.wardenCore, hotM, 3),
      // pickups
      mote: mk('mote', M.mote, hotM, 320),
      shard: mk('shard', M.shard, brass, 70, true),
      chest: mk('chest', M.chest, brass, 12, true),
      chestSeam: mk('chestSeam', M.chestSeam, hotM, 12),
      // combat
      blade: mk('blade', M.blade, hotM, 8),
      pbolt: mk('pbolt', M.ballLow, hotM, 160),
      eOutline: mk('eOutline', M.ballLow, outlineM, 180),
      eCore: mk('eCore', M.ballLow, hotM, 180),
      eShell: mk('eShell', M.ball, shellM, 180, false, undefined, 9),
      sparks: mk('sparks', M.ballLow, hotM, 700),
      debris: mk('debris', M.debris, armour, 700, true),
      beams: mk('beams', rb, addLine, 240, false, undefined, 12),
    };
    // beams float above everything on the floor and should not be hidden by bodies
    const beamMat = additive(line);
    beamMat.depthTest = false;
    this.L.beams.mesh.material = beamMat;
    q.dispose();
    rb.dispose();

    // Wick
    const wickPaint = new THREE.MeshStandardMaterial({ color: 0xe4f6ff, metalness: 0.55, roughness: 0.3, emissive: 0x0c3a44, emissiveIntensity: 0.35 });
    const canopy = new THREE.MeshPhysicalMaterial({ color: 0x0a1418, metalness: 0.2, roughness: 0.05, clearcoat: 1, emissive: 0x35f2ff, emissiveIntensity: 0.45 });
    this.wickGlowMat = hot(0xffffff);
    this.wickGlowMat.color.setRGB(1.2, 3.2, 3.6);
    this.wick.add(new THREE.Mesh(M.wick, wickPaint), new THREE.Mesh(M.wickCanopy, canopy), new THREE.Mesh(M.wickGlow, this.wickGlowMat));
    this.scene.add(this.wick);
    // Bulwark Field dome
    this.fieldMat = fieldMaterial();
    this.field = new THREE.Mesh(hemisphere(), this.fieldMat);
    this.field.renderOrder = 10;
    this.field.visible = false;
    this.scene.add(this.field);

    view.addEventListener('webglcontextlost', this.onLost, false);
    view.addEventListener('webglcontextrestored', this.onRestored, false);
    this.applyPreset(preset);
    this.resize();
    this.buildStage('hollow');
  }

  private onLost = (e: Event): void => {
    e.preventDefault();
    this.lost = true;
    this.onContext?.(true);
  };

  private onRestored = (): void => {
    this.lost = false;
    // the PMREM environment lives in a render target whose contents were lost: regenerate it
    this.rebuildEnv(this.envArena);
    this.onContext?.(false);
  };

  private rebuildEnv(arena: ArenaId): void {
    this.env?.dispose();
    this.env = buildEnvironment(this.gl, arena);
    this.envArena = arena;
    this.scene.environment = this.env.texture;
    this.scene.environmentIntensity = 0.85;
  }

  private buildStage(arena: ArenaId): void {
    this.stage?.dispose();
    this.stage = new Stage({
      arena,
      planar: this.preset.reflections === 'planar',
      anisotropy: Math.min(this.preset.anisotropy, this.gl.capabilities.getMaxAnisotropy()),
      width: this.cssW * this.gl.getPixelRatio(),
      height: this.cssH * this.gl.getPixelRatio(),
    });
    this.scene.add(this.stage.group);
    if (!this.env || this.envArena !== arena) this.rebuildEnv(arena);
  }

  private applyPreset(p: Preset): void {
    this.preset = p;
    for (let i = 0; i < MAX_LIGHTS; i++) this.lights[i].visible = i < p.lights;
    this.post?.dispose();
    this.post = null;
    this.resize();
    if (p.bloom !== 'off' || p.ripple) this.post = new Post(this.gl, this.scene, this.camera, p, this.cssW, this.cssH);
  }

  setQuality(p: Preset): void {
    const planarChanged = (p.reflections === 'planar') !== (this.preset.reflections === 'planar');
    this.applyPreset(p);
    if (planarChanged && this.stage) this.buildStage(this.stage.arena);
  }

  resize(): void {
    const w = Math.max(1, window.innerWidth);
    const h = Math.max(1, window.innerHeight);
    this.cssW = w;
    this.cssH = h;
    const pr = Math.min(this.preset.maxDpr, window.devicePixelRatio || 1) * this.preset.dprScale;
    this.gl.setPixelRatio(pr);
    this.gl.setSize(w, h, false);
    this.view.style.width = '100%';
    this.view.style.height = '100%';
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.post?.setSize(w, h, pr);
    this.stage?.resize(w * pr, h * pr);
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    const hw = Math.floor(w * this.dpr);
    const hh = Math.floor(h * this.dpr);
    if (this.hud.width !== hw || this.hud.height !== hh) {
      this.hud.width = hw;
      this.hud.height = hh;
    }
  }

  resetCamera(): void {
    this.snap = true;
  }

  resetRun(w: World): void {
    this.snap = true;
    // arena geometry and textures are per-arena: dispose and rebuild when it changes
    if (!this.stage || this.stage.arena !== w.arena) this.buildStage(w.arena);
    this.gl.renderLists.dispose();
  }

  screenToWorld(cx: number, cy: number): { x: number; y: number } | null {
    const ndc = new THREE.Vector2((cx / this.cssW) * 2 - 1, -(cy / this.cssH) * 2 + 1);
    this.ray.setFromCamera(ndc, this.camera);
    const hit = this.ray.ray.intersectPlane(this.plane, this.tmpV);
    return hit ? { x: hit.x, y: hit.z } : null;
  }

  private project: Projector = (x, y, h) => {
    const v = this.tmpV.set(x, h, y).project(this.camera);
    if (v.z > 1 || v.x < -1.2 || v.x > 1.2 || v.y < -1.2 || v.y > 1.2) return null;
    this.tmpP.x = (v.x * 0.5 + 0.5) * this.hud.width;
    this.tmpP.y = (-v.y * 0.5 + 0.5) * this.hud.height;
    return this.tmpP;
  };

  private col(hex: string): THREE.Color {
    let c = this.colors.get(hex);
    if (!c) {
      c = new THREE.Color(hex);
      this.colors.set(hex, c);
    }
    return c;
  }

  dispose(): void {
    this.view.removeEventListener('webglcontextlost', this.onLost);
    this.view.removeEventListener('webglcontextrestored', this.onRestored);
    for (const l of this.layers) l.dispose();
    this.layers.length = 0;
    for (const g of Object.values(this.M)) g.dispose();
    for (const t of this.tex) t.dispose();
    this.wick.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) (m.material as THREE.Material).dispose();
    });
    this.field.geometry.dispose();
    this.fieldMat.dispose();
    this.stage?.dispose();
    this.env?.dispose();
    this.post?.dispose();
    this.gl.dispose();
  }

  // ------------------------------------------------------------------ frame

  draw(w: World | null, fx: Fx, s: Settings, time: number, stick: StickView | null): void {
    for (const l of this.layers) l.begin();
    this.poolMat.uniforms.uTime.value = time;
    this.laneMat.uniforms.uTime.value = time;
    this.fieldMat.uniforms.uTime.value = time;
    this.stage?.update(time);

    // camera
    let sx = 0;
    let sy = 0;
    if (w) {
      if (this.snap) {
        this.camX = w.player.x;
        this.camY = w.player.y;
        this.snap = false;
      } else {
        this.camX += (w.player.x - this.camX) * 0.12;
        this.camY += (w.player.y - this.camY) * 0.12;
      }
      if (s.shake && fx.trauma > 0) {
        const a = fx.trauma * fx.trauma * 12;
        sx = (Math.random() * 2 - 1) * a;
        sy = (Math.random() * 2 - 1) * a;
      }
      const aspect = this.cssW / this.cssH;
      const dist = Math.max(857, 769 / aspect);
      this.camera.position.set(this.camX + sx, Math.sin(PITCH) * dist, this.camY + sy + Math.cos(PITCH) * dist);
      this.camera.lookAt(this.camX + sx, 0, this.camY + sy);
    } else {
      const a = time * 0.05;
      this.camera.position.set(Math.sin(a) * 760, 330, Math.cos(a) * 760);
      this.camera.lookAt(0, 60, 0);
    }

    let li = 0;
    if (w) li = this.drawWorld(w, fx, s, time);
    else li = this.drawAttract(time);
    this.drawFx(fx, s, time);
    li = this.drawLights(w, fx, time, li);
    for (let i = li; i < MAX_LIGHTS; i++) this.lights[i].intensity = 0;
    for (const l of this.layers) l.end();

    // shockwave ripple (newest)
    if (this.post) {
      const sh = fx.shocks.length && this.preset.ripple && !s.reducedFlash ? fx.shocks[fx.shocks.length - 1] : null;
      const pass = this.post.shock;
      if (sh) {
        const c = this.tmpV.set(sh.x, 0, sh.y).project(this.camera);
        const cx = c.x * 0.5 + 0.5;
        const cy = c.y * 0.5 + 0.5;
        const e = this.tmpV.set(sh.x + sh.r, 0, sh.y).project(this.camera);
        const aspect = this.cssW / this.cssH;
        const rad = Math.abs((e.x * 0.5 + 0.5 - cx) * aspect);
        pass.uniforms.uCenter.value.set(cx, cy);
        pass.uniforms.uRadius.value = rad;
        pass.uniforms.uWidth.value = 0.035 + rad * 0.12;
        pass.uniforms.uStrength.value = 0.022 * (sh.life / sh.max);
        pass.enabled = true;
      } else pass.enabled = false;
      this.post.setBloomStrength(s.reducedFlash ? 0.35 : 0.6);
    }

    if (!this.lost) {
      if (this.post) this.post.render();
      else this.gl.render(this.scene, this.camera);
    }

    // visor HUD on the overlay canvas
    const ctx = this.hctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.hud.width, this.hud.height);
    this.visor.draw(ctx, this.hud.width, this.hud.height, this.dpr, w, fx, s, time, stick, w ? this.project : null);
  }

  // ------------------------------------------------------------------ world

  private shadowAt(x: number, y: number, r: number, h: number): void {
    const k = Math.max(0.35, 1 - h / 80);
    this.L.shadow.put(x, 0.35, y, 0, r * 1.5 * k + 2, 1, r * 1.5 * k + 2);
  }

  private splat(x: number, y: number, r: number, c: THREE.Color, k: number): void {
    const i = this.L.splat.put(x, 0.6, y, 0, r, 1, r);
    this.L.splat.colorC(i, c, k);
  }

  private ringAt(x: number, y: number, r: number, c: THREE.Color | Rgb, k: number, dashed = false, h = 0.9): void {
    const layer = dashed ? this.L.ringsDash : this.L.rings;
    const i = layer.put(x, h, y, 0, r, 1, r);
    if (Array.isArray(c)) layer.color(i, c[0] * k, c[1] * k, c[2] * k);
    else layer.colorC(i, c, k);
  }

  private lineAt(layer: Layer, x1: number, y1: number, x2: number, y2: number, width: number, c: THREE.Color | Rgb, k: number, h = 0.8): void {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len < 0.5) return;
    const i = layer.put(x1, h, y1, -Math.atan2(dy, dx), len, 1, width);
    if (Array.isArray(c)) layer.color(i, c[0] * k, c[1] * k, c[2] * k);
    else layer.colorC(i, c, k);
  }

  private drawWorld(w: World, fx: Fx, s: Settings, time: number): number {
    const L = this.L;
    const p = w.player;
    const cx = this.camX;
    const cy = this.camY;
    // visible window in sim units (generous: the far edge of a tilted view is wider)
    const vx = 760 * Math.max(1, this.cssW / this.cssH);
    const vyTop = 640;
    const vyBot = 520;
    const vis = (x: number, y: number, m: number) => x > cx - vx - m && x < cx + vx + m && y > cy - vyTop - m && y < cy + vyBot + m;

    // hazards
    for (const h of w.hazards.list) {
      if (!h.alive) continue;
      if (h.kind === 'pool') {
        const warn = h.t < h.tele;
        const R = warn ? 44 : h.r;
        const i = L.pools.put(h.x, 0.5, h.y, 0, R, 1, R);
        if (i >= 0) {
          const e = L.pools.extra.aPool;
          const age = h.t - h.tele;
          e[i * 4] = warn ? h.t / h.tele : 1;
          e[i * 4 + 1] = warn ? 0 : 1;
          e[i * 4 + 2] = (h.x * 0.013 + h.y * 0.007) % 10;
          e[i * 4 + 3] = warn ? 1 : Math.min(1, age / 0.25, (h.life - age) / 0.6);
        }
        if (!warn) this.splat(h.x, h.y, R * 1.3, this.col('#8a5cff'), 0.25);
      } else {
        const len = Math.hypot(h.x2 - h.x, h.y2 - h.y);
        const i = L.lanes.put(h.x, 0.7, h.y, -Math.atan2(h.y2 - h.y, h.x2 - h.x), len, 1, h.width);
        if (i >= 0) {
          const e = L.lanes.extra.aLane;
          e[i * 4] = h.t >= h.tele ? 1 : 0;
          e[i * 4 + 1] = Math.min(1, h.t / h.tele);
          e[i * 4 + 2] = len;
          e[i * 4 + 3] = h.width;
        }
      }
    }

    // pickups
    const green = this.col('#59ffb5');
    const gold = this.col('#ffd24a');
    for (const o of w.pickups.list) {
      if (!o.alive || !vis(o.x, o.y, 40)) continue;
      const ph = o.x * 0.05 + o.y * 0.03;
      if (o.kind === 'mote') {
        const glint = Math.max(0, Math.sin(time * 2.6 + ph * 3)) ** 24 * 3;
        const i = L.mote.put(o.x, 8 + Math.sin(time * 4 + ph) * 2, o.y, time * 2 + ph, 4, 4, 4);
        L.mote.color(i, 0.35 * (1.6 + glint), 1.0 * (1.6 + glint), 0.71 * (1.6 + glint));
        this.splat(o.x, o.y, 14, green, 0.22);
      } else if (o.kind === 'shard') {
        const glint = Math.max(0, Math.sin(time * 2 + ph * 2)) ** 30 * 2.5;
        const i = L.shard.putEuler(o.x, 12 + Math.sin(time * 3 + ph) * 2, o.y, 0.3, time * 1.6 + ph, 0.2, 6.5, 6.5, 6.5);
        L.shard.color(i, 1, 0.72, 0.25);
        L.shard.glowC(i, gold, 0.5 + glint);
        this.splat(o.x, o.y, 22, gold, 0.3);
        this.shadowAt(o.x, o.y, 5, 12);
      } else {
        const i = L.chest.put(o.x, 0, o.y, 0.4, 12, 12, 12);
        L.chest.color(i, 0.85, 0.62, 0.3);
        L.chest.glowC(i, gold, 0.22);
        const k = 2 + Math.sin(time * 6) * 1.2;
        const j = L.chestSeam.put(o.x, 0, o.y, 0.4, 12, 12, 12);
        L.chestSeam.colorC(j, gold, k);
        this.splat(o.x, o.y, 46, gold, 0.4 + 0.15 * Math.sin(time * 6));
        this.shadowAt(o.x, o.y, 14, 0);
      }
    }

    // enemies
    for (const e of w.enemies.list) {
      if (!e.alive || !vis(e.x, e.y, 340)) continue;
      this.drawTelegraph(e, time);
      if (!vis(e.x, e.y, 60)) continue;
      this.drawEnemy(e, p.x, p.y, time, fx);
    }

    // bullets
    const pink = this.col('#ff2e88');
    const amber = this.col('#ffa23a');
    const cyan = this.col('#7af8ff');
    for (const b of w.bullets.list) {
      if (!b.alive || !vis(b.x, b.y, 30)) continue;
      if (b.friendly) {
        const yaw = -Math.atan2(b.vy, b.vx);
        const i = L.pbolt.put(b.x, 12, b.y, yaw, b.kind === 1 ? 7 : 9, b.kind === 1 ? 3.2 : 2.4, b.kind === 1 ? 3.2 : 2.4);
        if (b.kind === 1) {
          L.pbolt.color(i, 3.4, 1.5, 0.35);
          if (Math.random() < 0.35) fx.ember(b.x, b.y, '#ffa23a');
          this.splat(b.x, b.y, 18, amber, 0.3);
        } else if (b.kind === 2) {
          L.pbolt.color(i, 3.4, 0.9, 2.2);
        } else {
          L.pbolt.color(i, 1.2, 3.4, 3.8);
          this.splat(b.x, b.y, 16, cyan, 0.18);
        }
      } else {
        const c = b.kind === 1 ? amber : pink;
        const r = b.r;
        if (s.outline) L.eOutline.put(b.x, 10, b.y, 0, r + 3.2, r + 3.2, r + 3.2);
        const ci = L.eCore.put(b.x, 10, b.y, 0, r * 0.62, r * 0.62, r * 0.62);
        L.eCore.color(ci, 2.2, 2.2, 2.2);
        const si = L.eShell.put(b.x, 10, b.y, 0, r * 1.15, r * 1.15, r * 1.15);
        L.eShell.colorC(si, c, 1.5);
        this.splat(b.x, b.y, 24, c, 0.7);
      }
    }

    // player
    this.drawPlayer(w, fx, time);
    return 0;
  }

  private drawTelegraph(e: Enemy, time: number): void {
    const L = this.L;
    if (e.kind === 'spitter' && e.state === 1) {
      const k = 1 - e.timer / 0.7;
      this.lineAt(L.lines, e.x, e.y, e.x + Math.cos(e.ang) * 520, e.y + Math.sin(e.ang) * 520, 6 + 10 * k, this.col('#ff4fa0'), 0.6 + 2.4 * k);
    } else if (e.kind === 'rammer' && e.state === 1) {
      const blink = 0.5 + 0.5 * Math.sin(time * 40);
      const len = 480 * speedMul(1) * 0.55 + 40;
      this.lineAt(L.chevrons, e.x, e.y, e.x + Math.cos(e.ang) * len, e.y + Math.sin(e.ang) * len, e.r * 2.2, this.col('#ffa23a'), 0.55 + 0.7 * blink);
    } else if (e.kind === 'caster' && e.state === 1) {
      this.ringAt(e.tx, e.ty, 46, this.col('#c7a8ff'), 1.6, true);
    } else if (e.kind === 'warden' && e.state === 1) {
      const k = 1 - e.timer / 0.8;
      this.ringAt(e.x, e.y, e.r + 34 + k * 34, this.col('#ff2e88'), 1.4 + Math.sin(time * 28) * 0.5);
      if (e.tx === 3) this.lineAt(L.chevrons, e.x, e.y, e.x + Math.cos(e.ang) * 330, e.y + Math.sin(e.ang) * 330, 40, this.col('#ff2e88'), 1.0 + k);
    }
  }

  private drawEnemy(e: Enemy, px: number, py: number, time: number, fx: Fx): void {
    const L = this.L;
    const def = ENEMY_DEFS[e.kind];
    const kc = this.col(def.color);
    const face = Math.atan2(py - e.y, px - e.x);
    const r = e.r;
    const flash = e.flash > 0 ? 5 : 0;
    const seed = e.seed;
    // armour albedo: the identity colour mixed into dark painted metal
    const ar = 0.16 + kc.r * 0.22;
    const ag = 0.16 + kc.g * 0.22;
    const ab = 0.18 + kc.b * 0.22;
    const elite = e.elite;
    let hgt = 0;
    switch (e.kind) {
      case 'swarm': {
        hgt = 12 + Math.sin(time * 5 + seed) * 2.5;
        const i = L.drifter.put(e.x, hgt, e.y, time * 3 + seed, r, r, r);
        L.drifter.color(i, ar, ag, ab);
        L.drifter.glow(i, kc.r * 0.12 + flash, kc.g * 0.12 + flash, kc.b * 0.12 + flash);
        const j = L.drifterEye.put(e.x, hgt, e.y, 0, r, r, r);
        L.drifterEye.colorC(j, kc, 2.2);
        break;
      }
      case 'splitlet': {
        hgt = 9 + Math.sin(time * 7 + seed) * 2;
        const i = L.splitlet.putEuler(e.x, hgt, e.y, 0.5, time * 7 + seed, 0.3, r, r, r);
        L.splitlet.color(i, 0.55, 0.4, 0.75);
        L.splitlet.glow(i, kc.r * 0.9 + flash, kc.g * 0.9 + flash, kc.b * 0.9 + flash);
        break;
      }
      case 'spitter': {
        const bob = Math.abs(Math.sin(time * 7 + seed)) * 0.6;
        const i = L.spitterBody.put(e.x, bob, e.y, -face, r, r, r);
        L.spitterBody.color(i, ar, ag, ab);
        L.spitterBody.glow(i, flash, flash, flash);
        const hy = -e.ang;
        const j = L.spitterHead.put(e.x, bob, e.y, e.state === 1 ? hy : -face, r, r, r);
        L.spitterHead.color(j, ar * 1.1, ag * 1.1, ab * 1.1);
        const k = e.state === 1 ? 1 - e.timer / 0.7 : 0;
        L.spitterHead.glow(j, kc.r * (0.1 + k * 0.8) + flash, kc.g * (0.1 + k * 0.8) + flash, kc.b * (0.1 + k * 0.8) + flash);
        const ms = 0.17 * r * (1 + k * 1.6);
        const ang = e.state === 1 ? e.ang : face;
        const m = L.spitterMuzzle.put(e.x + Math.cos(ang) * 1.12 * r, bob + 1.36 * r, e.y + Math.sin(ang) * 1.12 * r, 0, ms, ms, ms);
        const hk = k > 0.85 && Math.floor(time * 30) % 2 === 0 ? 2.5 : 1;
        L.spitterMuzzle.color(m, (kc.r * 1.5 + k * 3) * hk, (kc.g * 1.5 + k * 3) * hk, (kc.b * 1.5 + k * 3) * hk);
        if (k > 0) this.splat(e.x, e.y, 30 + 40 * k, kc, 0.3 + k);
        break;
      }
      case 'rammer': {
        let x = e.x;
        let y = e.y;
        let sxz = 1;
        let syy = 1;
        const ang = e.state === 0 ? face : e.ang;
        if (e.state === 1) {
          x += Math.sin(time * 90) * 1.8;
          y += Math.cos(time * 80) * 1.8;
          const k = 1 - e.timer / 0.8;
          syy = 1 - 0.3 * k;
          sxz = 1 + 0.12 * k;
        } else if (e.state === 2) {
          syy = 0.88;
          sxz = 1.12;
          fx.ember(e.x - Math.cos(e.ang) * r, e.y - Math.sin(e.ang) * r, '#ffa23a');
          this.lineAt(this.L.lines, e.x - Math.cos(e.ang) * 70, e.y - Math.sin(e.ang) * 70, e.x, e.y, r * 1.6, this.col('#ffa23a'), 0.9);
        }
        const i = L.rammer.put(x, 0, y, -ang, r * sxz, r * syy, r * sxz);
        L.rammer.color(i, ar, ag, ab);
        L.rammer.glow(i, flash, flash, flash);
        const j = L.rammerEye.put(x, 0, y, -ang, r * sxz, r * syy, r * sxz);
        L.rammerEye.colorC(j, kc, e.state === 1 ? 4 : 2);
        break;
      }
      case 'cleaver': {
        hgt = r * 1.25 + Math.sin(time * 2 + seed) * 2;
        const rx = Math.sin(time * 0.9 + seed) * 0.35;
        const ry = time * 0.6 + seed;
        const rz = Math.cos(time * 0.7 + seed) * 0.3;
        const i = L.cleaver.putEuler(e.x, hgt, e.y, rx, ry, rz, r, r, r);
        L.cleaver.color(i, 0.32, 0.18, 0.5);
        L.cleaver.glow(i, kc.r * 0.18 + flash, kc.g * 0.18 + flash, kc.b * 0.18 + flash);
        const pulse = 1.6 + Math.sin(time * 4 + seed) * 0.5;
        const j = L.cleaverCore.putEuler(e.x, hgt, e.y, rx, ry, rz, r, r, r);
        L.cleaverCore.colorC(j, kc, pulse);
        this.splat(e.x, e.y, r * 2.2, kc, 0.18);
        break;
      }
      case 'aegis': {
        const i = L.aegis.put(e.x, 0, e.y, -face, r, r, r);
        L.aegis.color(i, 0.2, 0.32, 0.38);
        L.aegis.glow(i, flash, flash, flash);
        const j = L.aegisRim.put(e.x, 0, e.y, 0, r, r, r);
        L.aegisRim.colorC(j, kc, 1.8);
        const R = r + 9;
        const f = L.shieldFrame.put(e.x, 0, e.y, -e.shield, R, r * 1.1, R);
        L.shieldFrame.color(f, 0.75, 0.8, 0.85);
        L.shieldFrame.glowC(f, kc, 0.3 + flash * 0.2);
        const pl = L.shieldPlate.put(e.x, 0, e.y, -e.shield, R, r * 1.1, R);
        L.shieldPlate.colorC(pl, kc, e.flash > 0 ? 2.5 : 0.85);
        break;
      }
      case 'caster': {
        hgt = 30 + Math.sin(time * 2.2 + seed) * 4;
        const k = e.state === 1 ? 1 - e.timer / 0.5 : 0;
        const i = L.caster.putEuler(e.x, hgt, e.y, 0.25, time * 0.8 + seed, 0, r, r, r);
        L.caster.color(i, ar, ag, ab);
        L.caster.glow(i, kc.r * 0.1 + flash, kc.g * 0.1 + flash, kc.b * 0.1 + flash);
        const cs = r * (1 + 0.7 * k);
        const j = L.casterCore.put(e.x, hgt, e.y, 0, cs, cs, cs);
        L.casterCore.colorC(j, kc, 1.8 + 4 * k);
        this.splat(e.x, e.y, 30 + 30 * k, kc, 0.25 + 0.6 * k);
        break;
      }
      case 'warden':
        this.drawWarden(e, face, time, flash);
        break;
    }
    this.shadowAt(e.x, e.y, r, hgt);
    if (elite) {
      this.ringAt(e.x, e.y, r + 8, this.col('#ffd24a'), 1.5 + Math.sin(time * 5) * 0.3);
    }
  }

  private drawWarden(e: Enemy, face: number, time: number, flash: number): void {
    const L = this.L;
    const r = e.r;
    const p2 = e.phase === 1;
    const tele = e.state === 1 ? 0.5 + 0.5 * Math.sin(time * 28) : 0;
    const hi = L.wardenHull.put(e.x, 0, e.y, -face * 0.25 + time * 0.1, r, r, r);
    if (p2) L.wardenHull.color(hi, 0.32, 0.18, 0.26);
    else L.wardenHull.color(hi, 0.78, 0.8, 0.86);
    const mag = this.col('#ff2e88');
    L.wardenHull.glow(hi, (p2 ? mag.r * 0.3 : 0) + tele * mag.r * 0.6 + flash * 0.5, (p2 ? mag.g * 0.3 : 0) + tele * mag.g * 0.6 + flash * 0.5, (p2 ? mag.b * 0.3 : 0) + tele * mag.b * 0.6 + flash * 0.5);
    const open = p2 ? 0.32 + Math.sin(time * 3) * 0.04 : 0;
    const rot = time * 0.35;
    for (let i = 0; i < 8; i++) {
      const a = rot + (i / 8) * TAU;
      const rad = r * (0.98 + open);
      const j = L.wardenPetal.put(e.x + Math.cos(a) * rad, open * 8, e.y + Math.sin(a) * rad, -a, r, r * (1 - open * 0.3), r);
      L.wardenPetal.color(j, 0.26, 0.26, 0.3);
      L.wardenPetal.glow(j, flash * 0.5 + (p2 ? 0.2 : 0), flash * 0.5, flash * 0.5 + (p2 ? 0.1 : 0));
    }
    const crownC = p2 ? mag : this.col('#7af8ff');
    const c = L.wardenCrown.put(e.x, r * 0.92, e.y, -time * (p2 ? 1.6 : 0.8), r, r, r);
    L.wardenCrown.colorC(c, crownC, 2.2 + tele * 2);
    const ns = time * (p2 ? 1.8 : 1);
    for (let i = 0; i < 8; i++) {
      const a = ns + (i / 8) * TAU;
      const nr = r + 18;
      const j = L.wardenNode.put(e.x + Math.cos(a) * nr, r * 0.55 + Math.sin(time * 3 + i) * 3, e.y + Math.sin(a) * nr, a, 5.5, 5.5, 5.5);
      if (p2) L.wardenNode.color(j, 3.2, 0.4, 1.4);
      else L.wardenNode.color(j, 2.6, 3.0, 3.2);
    }
    const coreS = r * (p2 ? 0.34 : 0.24) * (1 + tele * 0.25);
    const k = L.wardenCore.put(e.x, r * 0.75, e.y, time, coreS, coreS, coreS);
    if (p2) L.wardenCore.color(k, 5, 1.2, 2.8);
    else L.wardenCore.color(k, 3.5, 3.8, 4);
    this.splat(e.x, e.y, r * 3, p2 ? mag : this.col('#9aa8ff'), 0.35 + tele * 0.5);
  }

  private drawPlayer(w: World, fx: Fx, time: number): void {
    const L = this.L;
    const p = w.player;
    const lv = w.levels;
    const dead = w.state === 'dead' && w.deathTimer > 0.05;
    const blink = p.iframes > 0 && Math.floor(time * 18) % 2 === 0;
    this.wick.visible = !dead && !blink;
    // bank into turns
    let df = p.facing - this.lastFacing;
    while (df > Math.PI) df -= TAU;
    while (df < -Math.PI) df += TAU;
    this.lastFacing = p.facing;
    this.bank += (Math.max(-0.6, Math.min(0.6, df * 8)) - this.bank) * 0.15;
    const hover = 9 + Math.sin(time * 3) * 1.5;
    this.wick.position.set(p.x, hover, p.y);
    this.wick.rotation.set(this.bank, -p.facing, 0, 'YXZ');
    this.wick.scale.setScalar(12);
    const sp = Math.hypot(p.vx, p.vy);
    const thrust = 0.7 + Math.min(1, sp / 190) * 1.2;
    if (p.flash > 0) this.wickGlowMat.color.setRGB(3.5, 0.8, 1.4);
    else this.wickGlowMat.color.setRGB(0.6 * thrust, 2.0 * thrust, 2.4 * thrust);
    if (dead) return;
    this.shadowAt(p.x, p.y, 14, hover);
    this.splat(p.x, p.y, 60, this.col('#35f2ff'), 0.14);
    if (sp > 40 && Math.random() < 0.5) fx.ember(p.x - Math.cos(p.facing) * 12, p.y - Math.sin(p.facing) * 12, '#7af8ff');

    // field
    const hasField = lv.siphon > 0 && lv.bulwark > 0;
    this.field.visible = hasField && p.fieldOn;
    if (this.field.visible) {
      const R = p.fieldR;
      this.field.position.set(p.x, 0, p.y);
      this.field.scale.set(R, R * 0.42, R);
      this.fieldMat.uniforms.uPulse.value = fx.fieldPulse;
      this.ringAt(p.x, p.y, R, this.col('#35f2ff'), 1.4 + fx.fieldPulse * 2);
    } else if (hasField && p.hold) {
      this.ringAt(p.x, p.y, 26 + p.reserve * 0.1, this.col('#d9a441'), 1.6, true);
    }
    // blades
    if (lv.orbit > 0) {
      const bladed = p.fieldOn && hasField;
      const rad = bladed ? p.fieldR + 10 : 64;
      const n = lv.orbit + 1;
      const green = this.col('#59ffb5');
      for (let i = 0; i < n; i++) {
        const a = p.orbitAngle + (i / n) * TAU;
        const bx = p.x + Math.cos(a) * rad;
        const by = p.y + Math.sin(a) * rad;
        const j = L.blade.put(bx, 14, by, -(a + Math.PI / 2), 11, 11, 11);
        L.blade.colorC(j, green, bladed ? 1.9 : 1.4);
        this.splat(bx, by, 22, green, 0.25);
      }
    }
  }

  private drawAttract(time: number): number {
    // menu: Wick idles at the centre, a ring of the Hollow's residents circles it
    this.wick.visible = true;
    this.field.visible = false;
    this.wick.position.set(0, 26 + Math.sin(time * 1.4) * 4, 0);
    this.wick.rotation.set(Math.sin(time * 0.7) * 0.15, time * 0.25, 0, 'YXZ');
    this.wick.scale.setScalar(26);
    this.wickGlowMat.color.setRGB(1.2, 3, 3.4);
    this.shadowAt(0, 0, 30, 26);
    this.splat(0, 0, 160, this.col('#35f2ff'), 0.35);
    const kinds: Enemy['kind'][] = ['swarm', 'spitter', 'rammer', 'cleaver', 'aegis', 'caster', 'swarm', 'rammer'];
    const fake = this.fakeEnemy;
    for (let i = 0; i < kinds.length; i++) {
      const a = time * 0.12 + (i / kinds.length) * TAU;
      const d = 260 + (i % 2) * 70;
      fake.kind = kinds[i];
      fake.x = Math.cos(a) * d;
      fake.y = Math.sin(a) * d;
      fake.r = ENEMY_DEFS[fake.kind].r * 1.6;
      fake.seed = i * 1.3;
      fake.shield = time * 1.4 + i;
      fake.ang = a + Math.PI;
      fake.elite = i === 3;
      this.drawEnemy(fake, 0, 0, time, this.dummyFx);
    }
    return 0;
  }

  private fakeEnemy: Enemy = {
    id: 0, alive: true, kind: 'swarm', x: 0, y: 0, vx: 0, vy: 0, r: 10, hp: 1, maxHp: 1, speed: 0, dmg: 0, xp: 0, ess: 0,
    t: 0, state: 0, timer: 0, act: 0, ang: 0, shield: 0, shieldDir: 1, tx: 0, ty: 0, elite: false, tier: 1, phase: 0,
    flash: 0, bladeCd: 0, seed: 0, noEss: false, kx: 0, ky: 0,
  };
  private dummyFx = { ember: () => undefined } as unknown as Fx;

  // ------------------------------------------------------------------ effects

  private drawFx(fx: Fx, s: Settings, time: number): void {
    const L = this.L;
    const calm = s.reducedFlash ? 0.55 : 1;
    for (const ring of fx.rings) {
      const a = Math.max(0, ring.life / ring.max);
      this.ringAt(ring.x, ring.y, ring.r, this.col(ring.color), a * 2.2 * calm, false, 1.2);
    }
    for (const sh of fx.shocks) {
      const a = Math.max(0, sh.life / sh.max);
      this.ringAt(sh.x, sh.y, sh.r, [1, 1, 1], a * 1.6 * calm, false, 1.4);
    }
    for (const bm of fx.beams) {
      const a = Math.max(0, bm.life / bm.max);
      const c = this.col(bm.color);
      const pts = bm.pts;
      for (let i = 0; i + 3 < pts.length; i += 2) {
        const x1 = pts[i];
        const y1 = pts[i + 1];
        const x2 = pts[i + 2];
        const y2 = pts[i + 3];
        if (!bm.jagged) {
          this.lineAt(L.beams, x1, y1, x2, y2, bm.w * 3.2, c, 3.2 * a, 16);
          this.lineAt(L.beams, x1, y1, x2, y2, bm.w * 1.1, [1, 1, 1], 4 * a, 16.5);
        } else {
          // re-jitter the arc every frame so it crackles
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.hypot(dx, dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          let lx = x1;
          let ly = y1;
          const n = 5;
          for (let k = 1; k <= n; k++) {
            const t = k / n;
            const off = k === n ? 0 : (Math.random() - 0.5) * Math.min(26, len * 0.25);
            const qx = x1 + dx * t + nx * off;
            const qy = y1 + dy * t + ny * off;
            this.lineAt(L.beams, lx, ly, qx, qy, bm.w * 3.4, c, 3 * a, 18);
            this.lineAt(L.beams, lx, ly, qx, qy, bm.w * 1.1, [1, 1, 1], 2.5 * a, 18.5);
            lx = qx;
            ly = qy;
          }
        }
      }
    }
    for (const p of fx.particles) {
      if (!p.alive) continue;
      const k = Math.max(0, p.life / p.max);
      const c = this.col(p.color);
      if (p.kind === 1) {
        const sz = p.size * 1.3;
        const i = L.debris.putEuler(p.x, p.z + sz * 0.5, p.y, p.rx, p.ry, 0, sz, sz, sz);
        L.debris.color(i, 0.18 + c.r * 0.3, 0.18 + c.g * 0.3, 0.2 + c.b * 0.3);
        L.debris.glowC(i, c, k * k * 2.2);
      } else {
        const sz = p.size * 0.55 * (0.4 + 0.6 * k);
        const i = L.sparks.put(p.x, p.z + 1, p.y, 0, sz, sz, sz);
        L.sparks.colorC(i, c, 1 + 3 * k);
      }
    }
    void time;
  }

  private drawLights(w: World | null, fx: Fx, time: number, start: number): number {
    const n = this.preset.lights;
    let li = start;
    const set = (x: number, h: number, y: number, c: THREE.Color, intensity: number, range: number) => {
      if (li >= n) return;
      const l = this.lights[li++];
      l.position.set(x, h, y);
      l.color.copy(c);
      l.intensity = intensity;
      l.distance = range;
    };
    if (w) {
      const p = w.player;
      if (!(w.state === 'dead' && w.deathTimer > 0.05)) set(p.x, 90, p.y, this.col('#9feaff'), 7000, 480);
    } else set(0, 140, 0, this.col('#9feaff'), 7000, 900);
    for (let i = fx.flares.length - 1; i >= 0 && li < n; i--) {
      const f = fx.flares[i];
      const k = Math.pow(Math.max(0, f.life / f.max), 1.5);
      set(f.x, f.h, f.y, this.col(f.color), f.power * 16000 * k, f.range);
    }
    if (w && li < n) {
      for (const e of w.enemies.list) {
        if (e.alive && e.kind === 'warden') {
          const tele = e.state === 1 ? 0.6 + 0.4 * Math.sin(time * 28) : 0.25;
          set(e.x, 90, e.y, this.col(e.phase ? '#ff2e88' : '#b9c4ff'), 20000 * tele, 700);
          if (li >= n) break;
        }
      }
    }
    return li;
  }
}
