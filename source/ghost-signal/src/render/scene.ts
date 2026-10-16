// Layered scene renderer. Static layers are baked once per location / size /
// quality into offscreen canvases; each animation frame only composites the
// baked image and adds the live layers (sign flicker, rain, splashes, drips,
// steam, sliding droplets, dust and grain). No allocations in the frame loop.
import { KIT, ctx2d, makeCanvas, rng } from './kit.ts';
import type { Ctx } from './kit.ts';
import { PAINTERS } from './painters.ts';
import type { Paint, SceneKey, SceneSpec, Zone } from './painters.ts';

export type Quality = 'low' | 'medium' | 'high';
export type { SceneKey };

interface QualityCfg { dpr: number; rain: number; lit: boolean; blur: number; ripple: boolean; drops: boolean; slide: boolean; grain: number; fringe: boolean; fps: number; dust: boolean; refl: number; splash: number }
export const QUALITY: Record<Quality, QualityCfg> = {
  low: { dpr: 1, rain: 0.35, lit: false, blur: 0.5, ripple: false, drops: false, slide: false, grain: 0, fringe: false, fps: 24, dust: false, refl: 0.85, splash: 0.4 },
  medium: { dpr: 1.5, rain: 0.7, lit: true, blur: 1, ripple: true, drops: true, slide: false, grain: 0.22, fringe: false, fps: 30, dust: false, refl: 1, splash: 0.8 },
  high: { dpr: 2, rain: 1, lit: true, blur: 1, ripple: true, drops: true, slide: true, grain: 0.26, fringe: true, fps: 30, dust: true, refl: 1.12, splash: 1 },
};

// ------------------------------------------------------------------ utilities
let filterOk: boolean | null = null;
function canFilter(): boolean {
  if (filterOk !== null) return filterOk;
  try { const c = ctx2d(makeCanvas(2, 2)); c.filter = 'blur(2px)'; filterOk = c.filter === 'blur(2px)'; } catch { filterOk = false; }
  return filterOk;
}

/** Blur a canvas by `px` device pixels (ctx.filter where available, downsampling otherwise). */
function blurred(src: HTMLCanvasElement, px: number): HTMLCanvasElement {
  const out = makeCanvas(src.width, src.height); const o = ctx2d(out);
  if (px <= 0.3) { o.drawImage(src, 0, 0); return out; }
  if (canFilter()) { o.filter = `blur(${px.toFixed(2)}px)`; o.drawImage(src, 0, 0); o.filter = 'none'; return out; }
  const f = Math.max(1.5, px * 0.9);
  const sm = makeCanvas(src.width / f, src.height / f); const s = ctx2d(sm);
  s.imageSmoothingQuality = 'high'; s.drawImage(src, 0, 0, sm.width, sm.height);
  o.imageSmoothingQuality = 'high'; o.drawImage(sm, 0, 0, out.width, out.height);
  return out;
}

/** Mirror everything above the floor line onto the floor: blurred, streaked, rippled, Fresnel-faded. */
function reflection(src: HTMLCanvasElement, spec: SceneSpec, q: QualityCfg, puddles: HTMLCanvasElement | null, s: number): HTMLCanvasElement | null {
  const W = src.width; const H = src.height; const fy = Math.round(spec.floorY * H); const rh = H - fy;
  if (rh <= 2 || spec.reflect <= 0) return null;
  const R = makeCanvas(W, rh); const r = ctx2d(R);
  r.setTransform(1, 0, 0, -1, 0, fy); r.drawImage(src, 0, 0); r.setTransform(1, 0, 0, 1, 0, 0);
  // anisotropic blur: soft sideways, long vertical streaks
  const sm = makeCanvas(W / (2.2 * s), rh / (7 * s)); const smc = ctx2d(sm);
  smc.imageSmoothingQuality = 'high'; smc.drawImage(R, 0, 0, sm.width, sm.height);
  r.clearRect(0, 0, W, rh); r.imageSmoothingQuality = 'high'; r.drawImage(sm, 0, 0, W, rh);
  let out = R;
  if (q.ripple) {
    const R2 = makeCanvas(W, rh); const r2 = ctx2d(R2);
    const strip = Math.max(2, Math.round(2 * s)); const rr = rng(rh);
    for (let y = 0; y < rh; y += strip) {
      const k = y / rh; const off = Math.sin(y * 0.09 / s + rr() * 0.6) * (1 + k * 7) * s;
      r2.drawImage(R, 0, y, W, strip, off, y, W, strip);
    }
    out = R2;
  }
  const o = ctx2d(out);
  o.globalCompositeOperation = 'destination-in';
  const a = Math.min(1, spec.reflect * q.refl);
  const g = o.createLinearGradient(0, 0, 0, rh);
  g.addColorStop(0, `rgba(0,0,0,${(a * 0.95).toFixed(3)})`); g.addColorStop(0.35, `rgba(0,0,0,${(a * 0.6).toFixed(3)})`); g.addColorStop(1, `rgba(0,0,0,${(a * 0.32).toFixed(3)})`);
  o.fillStyle = g; o.fillRect(0, 0, W, rh);
  if (puddles) o.drawImage(puddles, 0, 0, W, rh);
  o.globalCompositeOperation = 'source-over';
  return out;
}

function puddleMask(W: number, rh: number, seed: number): HTMLCanvasElement {
  const cv = makeCanvas(W, rh); const c = ctx2d(cv); const r = rng(seed);
  c.fillStyle = 'rgba(0,0,0,0.42)'; c.fillRect(0, 0, W, rh);
  for (let i = 0; i < 26; i++) {
    const x = r() * W; const y = Math.pow(r(), 0.8) * rh; const rx = W * (0.04 + r() * 0.16) * (0.4 + y / rh); const ry = rx * (0.08 + (y / rh) * 0.2);
    const g = c.createRadialGradient(x, y, 0, x, y, rx);
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.7, 'rgba(0,0,0,0.9)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    c.save(); c.translate(x, y); c.scale(1, ry / rx); c.translate(-x, -y); c.fillStyle = g; c.fillRect(x - rx, y - rx, rx * 2, rx * 2); c.restore();
  }
  return cv;
}

/** Lateral chromatic aberration: red scaled up a touch, blue a little less, about the frame centre. */
function fringe(src: HTMLCanvasElement): HTMLCanvasElement {
  const W = src.width; const H = src.height;
  const chan = (rgb: string, sc: number): HTMLCanvasElement => {
    const cv = makeCanvas(W, H); const c = ctx2d(cv);
    c.translate(W / 2, H / 2); c.scale(sc, sc); c.drawImage(src, -W / 2, -H / 2); c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalCompositeOperation = 'multiply'; c.fillStyle = rgb; c.fillRect(0, 0, W, H);
    return cv;
  };
  const out = chan('#00ff00', 1); const o = ctx2d(out);
  o.globalCompositeOperation = 'lighter';
  o.drawImage(chan('#ff0000', 1.0032), 0, 0); o.drawImage(chan('#0000ff', 1.0012), 0, 0);
  return out;
}

function grade(c: Ctx, W: number, H: number, spec: SceneSpec, comp: HTMLCanvasElement): void {
  const g = spec.grade;
  // bloom: blurred copy, squared twice so only highlights survive
  const bl = makeCanvas(W / 8, H / 8); const b = ctx2d(bl);
  b.imageSmoothingQuality = 'high'; b.drawImage(comp, 0, 0, bl.width, bl.height);
  b.globalCompositeOperation = 'multiply'; b.drawImage(bl, 0, 0); b.drawImage(bl, 0, 0);
  c.save();
  c.globalCompositeOperation = 'screen'; c.globalAlpha = g.bloom; c.imageSmoothingQuality = 'high'; c.drawImage(bl, 0, 0, W, H);
  c.globalAlpha = g.bloom * 0.6; c.drawImage(blurred(bl, 3), 0, 0, W, H);
  c.globalCompositeOperation = 'soft-light'; c.globalAlpha = g.midA; c.fillStyle = `rgb(${g.mid})`; c.fillRect(0, 0, W, H);
  c.globalCompositeOperation = 'screen'; c.globalAlpha = g.lift; c.fillStyle = `rgb(${g.shadow})`; c.fillRect(0, 0, W, H);
  c.globalAlpha = 1; c.globalCompositeOperation = 'multiply';
  const v = c.createRadialGradient(W / 2, H * 0.48, Math.min(W, H) * 0.25, W / 2, H * 0.5, Math.hypot(W, H) * 0.56);
  const e = Math.round(255 * (1 - g.vignette));
  v.addColorStop(0, '#ffffff'); v.addColorStop(0.55, '#f2f2f2'); v.addColorStop(1, `rgb(${e},${e},${Math.min(255, e + 6)})`);
  c.fillStyle = v; c.fillRect(0, 0, W, H);
  c.restore();
}

function zoneArea(z: Zone[]): number { return z.reduce((a, b) => a + b.w * b.h, 0); }

/** Refracting droplets on glass: each drop shows a flipped, minified, blurred view of what is behind it. */
function droplets(still: HTMLCanvasElement, spec: SceneSpec, mask: HTMLCanvasElement, s: number, w: number, h: number): HTMLCanvasElement {
  const W = still.width; const H = still.height;
  const cv = makeCanvas(W, H); const d = ctx2d(cv);
  const src = blurred(still, 2.5 * s);
  const r = rng(91);
  for (const z of spec.glass) {
    const n = Math.floor(((z.w * w) * (z.h * h)) / 700 * spec.drops);
    for (let i = 0; i < n; i++) {
      const x = (z.x + r() * z.w) * W; const y = (z.y + r() * z.h) * H;
      const big = r() < 0.12;
      const rad = (big ? 2.2 + r() * 3.2 : 0.5 + r() * 1.4) * s;
      if (rad < 1.2 * s) { d.fillStyle = `rgba(220,235,245,${(0.05 + r() * 0.08).toFixed(3)})`; d.beginPath(); d.arc(x, y, rad, 0, Math.PI * 2); d.fill(); continue; }
      d.save();
      d.beginPath(); d.ellipse(x, y, rad, rad * 1.08, 0, 0, Math.PI * 2); d.clip();
      d.translate(x, y); d.scale(1, -1);
      const sr = rad * 6;
      d.drawImage(src, Math.max(0, x - sr), Math.max(0, y - sr), sr * 2, sr * 2, -rad * 1.1, -rad * 1.1, rad * 2.2, rad * 2.2);
      d.setTransform(1, 0, 0, 1, 0, 0);
      const g = d.createRadialGradient(x, y, rad * 0.4, x, y, rad * 1.1);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.5)');
      d.fillStyle = g; d.fillRect(x - rad * 1.2, y - rad * 1.2, rad * 2.4, rad * 2.4);
      d.restore();
      d.fillStyle = 'rgba(255,255,255,0.55)'; d.beginPath(); d.ellipse(x - rad * 0.35, y - rad * 0.42, rad * 0.22, rad * 0.16, -0.6, 0, Math.PI * 2); d.fill();
      d.strokeStyle = 'rgba(255,255,255,0.12)'; d.lineWidth = Math.max(0.6, rad * 0.12); d.beginPath(); d.arc(x, y + rad * 0.1, rad * 0.8, 0.3, Math.PI - 0.3); d.stroke();
    }
    // a few rivulets
    for (let k = 0; k < Math.max(1, Math.floor(z.w * 10 * spec.drops)); k++) {
      let x = (z.x + r() * z.w) * W; let y = (z.y + r() * z.h * 0.5) * H; const end = y + r() * z.h * H * 0.6;
      d.beginPath(); d.moveTo(x, y);
      while (y < end) { y += (4 + r() * 6) * s; x += (r() - 0.5) * 2 * s; d.lineTo(x, y); }
      d.strokeStyle = 'rgba(210,230,240,0.12)'; d.lineWidth = 1.4 * s; d.stroke();
      d.strokeStyle = 'rgba(0,0,0,0.18)'; d.lineWidth = 0.6 * s; d.stroke();
    }
  }
  d.globalCompositeOperation = 'destination-in'; d.drawImage(mask, 0, 0, W, H);
  return cv;
}

// ------------------------------------------------------------------ bake
export interface Baked {
  key: SceneKey; W: number; H: number; w: number; h: number; s: number; q: Quality; spec: SceneSpec;
  still: HTMLCanvasElement; flick: HTMLCanvasElement | null; lightmap: HTMLCanvasElement; mask: HTMLCanvasElement; drops: HTMLCanvasElement | null;
}

export function bake(key: SceneKey, w: number, h: number, quality: Quality, devicePR: number): Baked {
  const q = QUALITY[quality];
  const s = Math.max(0.5, Math.min(devicePR, q.dpr));
  const W = Math.max(1, Math.round(w * s)); const H = Math.max(1, Math.round(h * s));
  KIT.dpr = s;
  const layer = (): [HTMLCanvasElement, Ctx] => { const cv = makeCanvas(W, H); const c = ctx2d(cv); c.setTransform(s, 0, 0, s, 0, 0); return [cv, c]; };
  const [farC, far] = layer(); const [midC, mid] = layer(); const [lightC, lightX] = layer(); const [signC, signs] = layer();
  const [fgC, fg] = layer(); const [atmoC, atmo] = layer(); const [maskC, mask] = layer();
  for (const c of [lightX, signs, atmo]) c.globalCompositeOperation = 'lighter';
  const paint: Paint = { w, h, r: rng(key.length * 1013 + key.charCodeAt(0) * 7), far, mid, light: lightX, signs, fg, atmo, mask };
  const spec = PAINTERS[key](paint);
  for (const c of [lightX, signs, atmo]) c.globalCompositeOperation = 'source-over';

  const comp = makeCanvas(W, H); const c = ctx2d(comp);
  c.fillStyle = '#05080b'; c.fillRect(0, 0, W, H);
  c.drawImage(blurred(farC, spec.farBlur * s * q.blur), 0, 0);
  const base = 1 - spec.flicker;
  const drawSigns = (): void => { c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = base; c.drawImage(signC, 0, 0); c.restore(); };
  if (spec.signsBehind) drawSigns();
  c.drawImage(midC, 0, 0);
  if (!spec.signsBehind) drawSigns();
  c.save(); c.globalCompositeOperation = 'lighter'; c.drawImage(lightC, 0, 0); c.restore();
  // wet-floor reflections of the lit scene
  const fy = Math.round(spec.floorY * H);
  const pm = spec.puddles ? puddleMask(W, H - fy, key.length) : null;
  const refl = reflection(comp, spec, q, pm, s);
  if (refl) { c.save(); c.globalCompositeOperation = 'lighter'; c.drawImage(refl, 0, fy); c.restore(); }
  c.drawImage(fgC, 0, 0);
  c.save(); c.globalCompositeOperation = 'lighter'; c.drawImage(atmoC, 0, 0); c.restore();
  grade(c, W, H, spec, comp);
  const still = q.fringe ? fringe(comp) : comp;

  // live sign layer: the signs plus their own floor reflection, so both flicker together
  let flick: HTMLCanvasElement | null = null;
  if (spec.flicker > 0) {
    flick = makeCanvas(W, H); const f = ctx2d(flick);
    f.drawImage(signC, 0, 0);
    if (spec.signsMasked) { f.globalCompositeOperation = 'destination-in'; f.drawImage(maskC, 0, 0); f.globalCompositeOperation = 'source-over'; }
    const fr = reflection(flick, spec, q, pm, s);
    if (fr) { f.globalCompositeOperation = 'lighter'; f.drawImage(fr, 0, fy); f.globalCompositeOperation = 'source-over'; }
  }
  // light map for rain: a small, brightened copy of the scene
  const lightmap = makeCanvas(Math.max(8, W / 10), Math.max(8, H / 10)); const lm = ctx2d(lightmap);
  lm.imageSmoothingQuality = 'high'; lm.drawImage(still, 0, 0, lightmap.width, lightmap.height);
  lm.globalCompositeOperation = 'lighter'; lm.drawImage(lightmap, 0, 0); lm.drawImage(lightmap, 0, 0);
  lm.fillStyle = 'rgba(34,40,46,1)'; lm.fillRect(0, 0, lightmap.width, lightmap.height);
  const drops = q.drops && spec.glass.length && spec.drops > 0 ? droplets(still, spec, maskC, s, w, h) : null;
  return { key, W, H, w, h, s, q: quality, spec, still, flick, lightmap, mask: maskC, drops };
}

const STILL_CACHE = new Map<string, HTMLCanvasElement>();
/** A small, low-quality still of a scene (for video-frame thumbnails). Cached. */
export function sceneStill(key: SceneKey, w: number, h: number): HTMLCanvasElement {
  const id = `${key}|${w}x${h}`;
  const hit = STILL_CACHE.get(id);
  if (hit) return hit;
  const b = bake(key, w, h, 'low', 1);
  STILL_CACHE.set(id, b.still);
  return b.still;
}

// ------------------------------------------------------------------ grain tiles (shared)
let grainTiles: HTMLCanvasElement[] | null = null;
function grain(): HTMLCanvasElement[] {
  if (grainTiles) return grainTiles;
  grainTiles = [];
  const r = rng(4242);
  for (let t = 0; t < 3; t++) {
    const cv = makeCanvas(128, 128); const c = ctx2d(cv); const img = c.createImageData(128, 128);
    for (let i = 0; i < img.data.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 90; img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 255; }
    c.putImageData(img, 0, 0); grainTiles.push(cv);
  }
  return grainTiles;
}

let steamSprite: HTMLCanvasElement | null = null;
function steam(): HTMLCanvasElement {
  if (steamSprite) return steamSprite;
  steamSprite = makeCanvas(64, 64); const c = ctx2d(steamSprite);
  const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(220,225,230,0.5)'); g.addColorStop(0.5, 'rgba(220,225,230,0.18)'); g.addColorStop(1, 'rgba(220,225,230,0)');
  c.fillStyle = g; c.fillRect(0, 0, 64, 64);
  return steamSprite;
}

let fontsReady: Promise<unknown> | null = null;
function loadFonts(): Promise<unknown> {
  if (fontsReady) return fontsReady;
  try {
    const f = document.fonts;
    fontsReady = f ? Promise.all([f.load('800 40px "Big Shoulders Display"'), f.load('700 40px "Big Shoulders Display"'), f.load('600 20px "IBM Plex Mono"')]).catch(() => undefined) : Promise.resolve();
  } catch { fontsReady = Promise.resolve(); }
  return fontsReady;
}

// ------------------------------------------------------------------ renderer
const N_LAYERS = 3;

export class SceneRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: Ctx;
  private key: SceneKey = 'lobby';
  private quality: Quality = 'medium';
  private baked: Baked | null = null;
  private rainCv: HTMLCanvasElement = makeCanvas(1, 1);
  private rainCtx: Ctx;
  private grainPats: CanvasPattern[] = [];
  // rain pool: x, y, len, speed, zone index, layer
  private rx = new Float32Array(0); private ry = new Float32Array(0); private rl = new Float32Array(0); private rv = new Float32Array(0);
  private rz = new Uint8Array(0); private rlay = new Uint8Array(0);
  private sx = new Float32Array(48); private sy = new Float32Array(48); private st = new Float32Array(48).fill(1); private ssz = new Float32Array(48);
  private raf = 0; private last = 0; private t = 0;
  private reduced = false; private running = false;
  private w = 0; private h = 0; private dpr = 1;
  private bakeTimer = 0;
  private seed = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = ctx2d(canvas);
    this.rainCtx = ctx2d(this.rainCv);
    void loadFonts().then(() => { if (this.baked) this.rebake(); });
    SceneRenderer.live.add(this);
  }

  /** Every renderer that is alive, so settings can reach the title screen too. */
  static live = new Set<SceneRenderer>();
  dispose(): void { this.stop(); SceneRenderer.live.delete(this); }

  setReduced(r: boolean): void { this.reduced = r; if (this.baked) this.frame(0, true); }
  setQuality(q: Quality): void { if (q === this.quality) return; this.quality = q; if (this.w) this.rebake(); }
  setLocation(key: SceneKey): void { if (key === this.key && this.baked) return; this.key = key; if (this.w) this.rebake(); }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width)); const h = Math.max(1, Math.floor(rect.height));
    const dpr = window.devicePixelRatio || 1;
    if (w === this.w && h === this.h && dpr === this.dpr && this.baked) return;
    const first = !this.baked;
    this.w = w; this.h = h; this.dpr = dpr;
    if (first) { this.rebake(); return; }
    // keep showing the old bake (scaled) while the new one is debounced
    window.clearTimeout(this.bakeTimer);
    this.bakeTimer = window.setTimeout(() => this.rebake(), 140);
  }

  private rebake(): void {
    if (!this.w || this.h < 2) return;
    let b: Baked;
    try { b = bake(this.key, this.w, this.h, this.quality, this.dpr); } catch (e) { console.warn('Scene bake failed', e); return; }
    this.baked = b;
    this.canvas.width = b.W; this.canvas.height = b.H;
    this.rainCv.width = b.W; this.rainCv.height = b.H;
    this.grainPats = [];
    for (const t of grain()) { const p = this.ctx.createPattern(t, 'repeat'); if (p) this.grainPats.push(p); }
    this.spawnRain(b);
    this.frame(0, true);
  }

  private spawnRain(b: Baked): void {
    const spec = b.spec; const q = QUALITY[b.q];
    const area = zoneArea(spec.rain);
    const n = area > 0 ? Math.min(1800, Math.floor(((area * b.w * b.h) / 420) * q.rain * spec.rainA)) : 0;
    this.rx = new Float32Array(n); this.ry = new Float32Array(n); this.rl = new Float32Array(n); this.rv = new Float32Array(n);
    this.rz = new Uint8Array(n); this.rlay = new Uint8Array(n);
    const r = rng(this.seed++);
    const layers = spec.near ? 3 : 2;
    for (let i = 0; i < n; i++) {
      let pick = r() * area; let zi = 0;
      for (; zi < spec.rain.length - 1; zi++) { pick -= spec.rain[zi].w * spec.rain[zi].h; if (pick <= 0) break; }
      const z = spec.rain[zi];
      const lay = r() < 0.55 ? 0 : layers === 3 && r() < 0.3 ? 2 : 1;
      this.rz[i] = zi; this.rlay[i] = lay;
      this.rx[i] = (z.x + r() * z.w) * b.W; this.ry[i] = (z.y + r() * z.h) * b.H;
      const s = b.s * (b.h / 520);
      this.rl[i] = (lay === 0 ? 7 + r() * 6 : lay === 1 ? 14 + r() * 10 : 34 + r() * 26) * s;
      this.rv[i] = (lay === 0 ? 420 + r() * 120 : lay === 1 ? 700 + r() * 200 : 1300 + r() * 300) * s;
    }
  }

  start(): void {
    if (this.running) return;
    this.running = true; this.last = performance.now();
    const loop = (now: number): void => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(loop);
      const minDt = 1000 / QUALITY[this.quality].fps;
      if (now - this.last < minDt - 1) return;
      const dt = Math.min(0.1, (now - this.last) / 1000);
      this.last = now;
      if (!this.reduced) this.frame(dt, false);
    };
    this.raf = requestAnimationFrame(loop);
  }
  stop(): void { this.running = false; cancelAnimationFrame(this.raf); }

  private flickerAt(t: number): number {
    const k = Math.floor(t * 11);
    const hsh = Math.abs(Math.sin(k * 12.9898) * 43758.5453) % 1;
    if (hsh < 0.035) return 0.12;
    if (hsh < 0.06) return 0.55;
    return 0.86 + 0.14 * Math.sin(t * 2.3);
  }

  private frame(dt: number, still: boolean): void {
    const b = this.baked; if (!b) return;
    const c = this.ctx; const W = b.W; const H = b.H; const spec = b.spec; const q = QUALITY[b.q];
    const animate = !this.reduced && !still;
    if (animate) this.t += dt;
    const t = this.t;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
    if (this.canvas.width !== W || this.canvas.height !== H) { this.canvas.width = W; this.canvas.height = H; }
    c.drawImage(b.still, 0, 0);
    // sign flicker
    if (b.flick) {
      c.globalCompositeOperation = 'lighter';
      c.globalAlpha = spec.flicker * (this.reduced ? 1 : this.flickerAt(t));
      c.drawImage(b.flick, 0, 0);
      c.globalAlpha = 1;
    }
    // steam
    if (spec.steam.length) {
      const sp = steam();
      c.globalCompositeOperation = 'screen';
      for (const [sx, sy, size] of spec.steam) {
        const S = size * H;
        for (let i = 0; i < 8; i++) {
          const age = (t * 0.11 + i / 8) % 1;
          const x = sx * W + Math.sin(age * 3 + i * 1.7) * S * 0.25 + age * S * 0.15;
          const y = sy * H - age * S * 1.4;
          const rad = S * (0.18 + age * 0.75);
          c.globalAlpha = Math.sin(age * Math.PI) * 0.32;
          c.drawImage(sp, x - rad, y - rad, rad * 2, rad * 2);
        }
      }
      c.globalAlpha = 1;
    }
    // rain
    const n = this.rx.length;
    if (n) {
      const rc = this.rainCtx;
      rc.globalCompositeOperation = 'source-over'; rc.clearRect(0, 0, W, H);
      rc.lineCap = 'round';
      const wind = spec.wind;
      for (let lay = 0; lay < N_LAYERS; lay++) {
        rc.beginPath();
        for (let i = 0; i < n; i++) {
          if (this.rlay[i] !== lay) continue;
          if (animate) {
            this.ry[i] += this.rv[i] * dt; this.rx[i] += this.rv[i] * wind * dt;
            const z = spec.rain[this.rz[i]];
            if (this.ry[i] > (z.y + z.h) * H) { this.ry[i] = z.y * H - this.rl[i] * Math.random(); this.rx[i] = (z.x + Math.random() * z.w) * W - this.rv[i] * wind * 0.05; }
          }
          const x = this.rx[i]; const y = this.ry[i]; const l = this.rl[i];
          rc.moveTo(x, y); rc.lineTo(x - l * wind, y - l);
        }
        rc.lineWidth = (lay === 0 ? 0.7 : lay === 1 ? 1.1 : 1.8) * b.s;
        rc.strokeStyle = q.lit ? (lay === 0 ? 'rgba(255,255,255,0.3)' : lay === 1 ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.26)') : (lay === 0 ? 'rgba(170,200,215,0.16)' : 'rgba(180,210,225,0.24)');
        rc.stroke();
      }
      if (q.lit) { rc.globalCompositeOperation = 'source-in'; rc.drawImage(b.lightmap, 0, 0, W, H); }
      rc.globalCompositeOperation = 'destination-in'; rc.drawImage(b.mask, 0, 0, W, H);
      c.globalCompositeOperation = 'lighter'; c.drawImage(this.rainCv, 0, 0);
    }
    // splashes
    if (spec.splash.length && animate) {
      const rate = q.splash * 60 * dt;
      for (let k = 0; k < rate; k++) {
        if (Math.random() > rate - k) break;
        for (let i = 0; i < this.st.length; i++) if (this.st[i] >= 1) {
          const z = spec.splash[Math.floor(Math.random() * spec.splash.length)];
          this.sx[i] = (z.x + Math.random() * z.w) * W; this.sy[i] = (z.y + Math.random() * z.h) * H; this.st[i] = 0; this.ssz[i] = (0.6 + (this.sy[i] / H)) * b.s * 3;
          break;
        }
      }
    }
    if (spec.splash.length) {
      c.globalCompositeOperation = 'lighter'; c.lineWidth = 0.7 * b.s;
      for (let i = 0; i < this.st.length; i++) {
        if (this.st[i] >= 1) continue;
        if (animate) this.st[i] += dt * 4.5;
        const k = Math.min(1, this.st[i]); const rr = this.ssz[i] * (0.4 + k);
        c.strokeStyle = `rgba(200,215,225,${(0.35 * (1 - k)).toFixed(3)})`;
        c.beginPath(); c.ellipse(this.sx[i], this.sy[i], rr, rr * 0.3, 0, 0, Math.PI * 2); c.stroke();
      }
    }
    // drips
    if (spec.drips.length) {
      c.globalCompositeOperation = 'lighter';
      for (let i = 0; i < spec.drips.length; i++) {
        const [dx, dy, len] = spec.drips[i];
        const period = 1.8 + i * 0.7; const ph = ((t + i * 0.9) % period) / period;
        const fall = Math.min(1, ph / 0.32);
        const x = dx * W; const y0 = dy * H; const y = y0 + fall * fall * len * H;
        if (fall < 1) { c.fillStyle = 'rgba(200,230,240,0.55)'; c.fillRect(x - 0.6 * b.s, y - 4 * b.s, 1.2 * b.s, 4 * b.s); }
        else if (ph < 0.42) { const k = (ph - 0.32) / 0.1; c.strokeStyle = `rgba(200,230,240,${(0.4 * (1 - k)).toFixed(3)})`; c.lineWidth = 0.7 * b.s; c.beginPath(); c.ellipse(x, y0 + len * H, (2 + k * 8) * b.s, (0.6 + k * 2) * b.s, 0, 0, Math.PI * 2); c.stroke(); }
        c.fillStyle = 'rgba(200,230,240,0.35)'; c.fillRect(x - 1 * b.s, y0, 2 * b.s, 2 * b.s);
      }
    }
    c.globalCompositeOperation = 'source-over';
    // glass droplets (baked) and a few sliding ones
    if (b.drops) c.drawImage(b.drops, 0, 0);
    if (q.slide && spec.glass.length) {
      c.fillStyle = 'rgba(230,240,248,0.32)';
      for (let i = 0; i < 6; i++) {
        const z = spec.glass[i % spec.glass.length];
        const x = (z.x + ((i * 0.37 + 0.11) % 1) * z.w) * W;
        const ph = ((t * (0.05 + i * 0.012) + i * 0.31) % 1);
        const y = (z.y + ph * z.h) * H;
        c.beginPath(); c.ellipse(x, y, 1.6 * b.s, 2.2 * b.s, 0, 0, Math.PI * 2); c.fill();
        c.fillRect(x - 0.4 * b.s, y - 18 * b.s * ph, 0.8 * b.s, 18 * b.s * ph);
      }
    }
    // dust in light shafts
    if (q.dust && spec.dust.length) {
      c.globalCompositeOperation = 'lighter'; c.fillStyle = 'rgba(255,240,220,0.35)';
      for (let i = 0; i < 40; i++) {
        const z = spec.dust[i % spec.dust.length];
        const x = (z.x + (((i * 0.618) + Math.sin(t * 0.13 + i) * 0.04) % 1 + 1) % 1 * z.w) * W;
        const y = (z.y + (((i * 0.382) + t * 0.008 * (1 + (i % 3))) % 1) * z.h) * H;
        c.fillRect(x, y, 1.2 * b.s, 1.2 * b.s);
      }
    }
    // grain
    if (q.grain > 0 && this.grainPats.length) {
      const p = this.grainPats[animate ? Math.floor(t * 24) % this.grainPats.length : 0];
      const ox = animate ? Math.floor(Math.random() * 128) : 0; const oy = animate ? Math.floor(Math.random() * 128) : 0;
      c.globalCompositeOperation = 'overlay'; c.globalAlpha = q.grain;
      c.translate(ox, oy); c.fillStyle = p; c.fillRect(-ox, -oy, W, H); c.setTransform(1, 0, 0, 1, 0, 0);
      c.globalAlpha = 1;
    }
    c.globalCompositeOperation = 'source-over';
  }
}
