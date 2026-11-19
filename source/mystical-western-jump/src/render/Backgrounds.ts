import { THEMES, type Theme } from '../game/Config';
import { PALETTE, ROLES, cactus, constellation, disc, mesa, mix, rng, starGlyph, starfield } from '../../../../design/19_mystical-western/primitives.mjs';

/**
 * 19_mystical-western night-desert parallax: quiet star chart, a carved moon, low mesas
 * and a sparse foreground (adobe town / timber mine works / star-chart canyon).
 * Every strip is baked once per world, so a frame is a handful of blits.
 */

/** A repeating parallax strip, bottom-aligned to the level floor. */
export interface Layer {
  canvas: HTMLCanvasElement;
  /** Horizontal / vertical scroll factors relative to the camera. */
  fx: number;
  fy: number;
  /** Ambient drift in px/s (dust). */
  drift: number;
}

export interface Backdrop {
  theme: Theme;
  stars: HTMLCanvasElement;
  /** The carved moon disc, centred in its canvas. */
  moon: HTMLCanvasElement;
  layers: Layer[];
}

const W = 512;
const H = 280;
const MOON_R = 22;

function canvas(w = W, h = H): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

/** Quiet sky: small low-contrast stars and one engraved constellation. */
function stars(world: number): HTMLCanvasElement {
  const [c, ctx] = canvas(W, 220);
  starfield(ctx, 0, 0, W, 220, { seed: 5 + world * 13, count: 90, color: PALETTE.ash, max: 1, alpha: 0.4 });
  const r = rng(91 + world);
  const pts: Array<[number, number]> = [];
  let x = 40 + r() * 60;
  for (let i = 0; i < 5; i++) {
    pts.push([Math.round(x), Math.round(24 + r() * 90)]);
    x += 34 + r() * 40;
  }
  constellation(ctx, pts, { color: ROLES.quiet, node: PALETTE.ash, alpha: 0.32, nodeR: 0.9, dash: [1, 3] });
  if (world === 2) {
    // The star-chart world: a second figure and a faint chart ring.
    constellation(ctx, [[330, 40], [372, 70], [410, 52], [452, 96]], { color: ROLES.quiet, node: PALETTE.ash, alpha: 0.3, nodeR: 0.9, dash: [1, 3] });
    ctx.strokeStyle = ROLES.quiet;
    ctx.globalAlpha = 0.3;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.arc(256, 260, 210, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }
  return c;
}

/** Carved moon: full over the town, waning over the mine, a crescent over the canyon. */
function moon(world: number): HTMLCanvasElement {
  const s = MOON_R * 5;
  const [c, ctx] = canvas(s, s);
  disc(ctx, s / 2, s / 2, MOON_R, {
    face: PALETTE.bone,
    ink: PALETTE.wine,
    rim: PALETTE.saddle,
    shadow: PALETTE.night,
    phase: [0, 0.18, 0.36][world],
    rings: 2,
    glow: 0.07,
  });
  return c;
}

/** Flat-roofed adobe block with vigas and, sometimes, a lantern-lit window. */
function adobe(ctx: CanvasRenderingContext2D, r: () => number, t: Theme, x: number, w: number, h: number): void {
  ctx.fillStyle = t.near;
  ctx.fillRect(x, H - h, w, h);
  ctx.fillRect(x - 1, H - h - 2, w + 2, 2);
  // Vigas (roof beams) poking out under the parapet.
  for (let vx = x + 3; vx < x + w - 2; vx += 6) ctx.fillRect(vx, H - h + 3, 2, 2);
  if (r() < 0.7) {
    ctx.fillStyle = t.window[Math.floor(r() * t.window.length)];
    ctx.globalAlpha = 0.55;
    const wx = x + 4 + Math.floor(r() * Math.max(1, w - 12));
    ctx.fillRect(wx, H - h + 9, 4, 5);
    ctx.globalAlpha = 1;
  }
  // Door.
  ctx.fillStyle = mix(t.near, PALETTE.ink, 0.5);
  ctx.fillRect(x + Math.floor(w * 0.6), H - 12, 5, 12);
}

function townLayers(t: Theme): Layer[] {
  const r = rng(11);
  const [far, f] = canvas();
  mesa(f, -4, W + 4, H - 40, { seed: 4, height: 70, fill: t.far, strata: PALETTE.ember, strataAlpha: 0.12, plateaus: 3, bottom: H });
  const [mid, m] = canvas();
  mesa(m, -4, W + 4, H - 20, { seed: 9, height: 56, fill: t.mid, strata: PALETTE.ember, strataAlpha: 0.2, plateaus: 2, bottom: H });
  const [near, n] = canvas();
  for (let x = 6; x < W - 40; ) {
    const w = 26 + Math.floor(r() * 30);
    const h = 34 + Math.floor(r() * 26);
    adobe(n, r, t, x, w, h);
    // A stepped second storey now and then.
    if (r() < 0.4) adobe(n, r, t, x + 4, Math.floor(w * 0.5), h + 12);
    x += w + 22 + Math.floor(r() * 40);
  }
  cactus(n, 150, H, 58, { fill: t.near, seed: 2 });
  cactus(n, 420, H, 46, { fill: t.near, seed: 5, arms: [0.5] });
  return [
    { canvas: far, fx: 0.12, fy: 0.08, drift: 0 },
    { canvas: mid, fx: 0.28, fy: 0.18, drift: 0 },
    { canvas: near, fx: 0.5, fy: 0.35, drift: 0 },
  ];
}

/** Timber headframe over a shaft: legs, cross-bracing and a sheave wheel. */
function headframe(ctx: CanvasRenderingContext2D, x: number, w: number, h: number, col: string): void {
  ctx.strokeStyle = col;
  ctx.fillStyle = col;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, H);
  ctx.lineTo(x + w * 0.35, H - h);
  ctx.moveTo(x + w, H);
  ctx.lineTo(x + w * 0.65, H - h);
  ctx.stroke();
  ctx.lineWidth = 1;
  for (let k = 1; k < 5; k++) {
    const y = H - (h * k) / 5;
    const inset = (w * 0.35 * k) / 5;
    ctx.beginPath();
    ctx.moveTo(x + inset, y);
    ctx.lineTo(x + w - inset, y);
    ctx.lineTo(x + inset + (w * 0.35) / 5, y + h / 5);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(x + w / 2, H - h, 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillRect(x + w / 2 - 1, H - h - 1, 2, 2);
}

function mineLayers(t: Theme): Layer[] {
  const r = rng(23);
  const [far, f] = canvas();
  mesa(f, -4, W + 4, H - 50, { seed: 14, height: 84, fill: t.far, strata: PALETTE.ember, strataAlpha: 0.12, plateaus: 2, bottom: H });
  const [mid, m] = canvas();
  mesa(m, -4, W + 4, H - 24, { seed: 21, height: 46, fill: t.mid, strata: PALETTE.ember, strataAlpha: 0.18, plateaus: 3, bottom: H });
  headframe(m, 70, 50, 120, t.mid);
  headframe(m, 330, 40, 96, t.mid);
  // Lanterns on the frames.
  for (const [lx, ly] of [[95, H - 70], [350, H - 58]]) {
    m.fillStyle = t.window[0];
    m.globalAlpha = 0.6;
    m.fillRect(lx - 1, ly, 3, 4);
    m.globalAlpha = 1;
  }
  const [near, n] = canvas();
  n.fillStyle = t.near;
  // Spoil heaps, a water tower and timber posts.
  for (let x = 0; x < W; ) {
    const w = 40 + Math.floor(r() * 60);
    const h = 26 + Math.floor(r() * 24);
    n.beginPath();
    n.moveTo(x, H);
    n.lineTo(x + w * 0.4, H - h);
    n.lineTo(x + w * 0.6, H - h);
    n.lineTo(x + w, H);
    n.fill();
    x += w + 30 + Math.floor(r() * 60);
  }
  n.fillRect(240, H - 94, 30, 22);
  n.beginPath();
  n.moveTo(236, H - 94);
  n.lineTo(255, H - 106);
  n.lineTo(274, H - 94);
  n.fill();
  for (const lx of [242, 266]) n.fillRect(lx, H - 72, 2, 72);
  n.fillRect(242, H - 50, 26, 2);
  for (let x = 20; x < W; x += 90 + Math.floor(r() * 40)) n.fillRect(x, H - 40, 3, 40);
  cactus(n, 460, H, 50, { fill: t.near, seed: 8 });
  return [
    { canvas: far, fx: 0.1, fy: 0.06, drift: 0 },
    { canvas: mid, fx: 0.26, fy: 0.16, drift: 0 },
    { canvas: near, fx: 0.48, fy: 0.3, drift: 0 },
  ];
}

function canyonLayers(t: Theme): Layer[] {
  const r = rng(37);
  const [far, f] = canvas();
  mesa(f, -4, W + 4, H - 60, { seed: 33, height: 60, fill: t.far, strata: PALETTE.wine, strataAlpha: 0.2, plateaus: 4, bottom: H });
  // Faint chart ticks along the horizon.
  f.fillStyle = ROLES.quiet;
  for (let x = 0; x < W; x += 16) f.fillRect(x, H - 58, 1, x % 64 === 0 ? 4 : 2);
  const [mid, m] = canvas();
  // Hoodoo spires.
  for (let x = 0; x < W; ) {
    const w = 12 + Math.floor(r() * 16);
    const h = 60 + Math.floor(r() * 110);
    m.fillStyle = t.mid;
    m.beginPath();
    m.moveTo(x, H);
    m.lineTo(x + 2, H - h + 8);
    m.lineTo(x - 2, H - h);
    m.lineTo(x + w + 2, H - h);
    m.lineTo(x + w - 2, H - h + 8);
    m.lineTo(x + w, H);
    m.fill();
    m.fillStyle = PALETTE.wine;
    m.globalAlpha = 0.16;
    for (let y = H - h + 14; y < H; y += 9) m.fillRect(x + 1, y, w - 2, 1);
    m.globalAlpha = 1;
    x += w + 26 + Math.floor(r() * 50);
  }
  const [near, n] = canvas();
  // Floating rock shards, each pinned by a tiny engraved star.
  for (let i = 0; i < 7; i++) {
    const x = r() * W;
    const y = H - 40 - r() * 160;
    const s = 6 + r() * 10;
    n.fillStyle = t.near;
    n.beginPath();
    n.moveTo(x - s, y);
    n.lineTo(x - s * 0.4, y - s * 0.6);
    n.lineTo(x + s * 0.7, y - s * 0.5);
    n.lineTo(x + s, y);
    n.lineTo(x, y + s * 1.3);
    n.fill();
    starGlyph(n, x, y - s * 0.9, 2, PALETTE.ash, 0.5);
  }
  cactus(n, 300, H, 52, { fill: t.near, seed: 3 });
  return [
    { canvas: far, fx: 0.08, fy: 0.05, drift: 0 },
    { canvas: mid, fx: 0.25, fy: 0.15, drift: 0 },
    { canvas: near, fx: 0.55, fy: 0.4, drift: 6 },
  ];
}

const cache = new Map<number, Backdrop>();

export function backdrop(world: number): Backdrop {
  let b = cache.get(world);
  if (!b) {
    const theme = THEMES[world];
    const layers = world === 0 ? townLayers(theme) : world === 1 ? mineLayers(theme) : canyonLayers(theme);
    b = { theme, stars: stars(world), moon: moon(world), layers };
    cache.set(world, b);
  }
  return b;
}

export const LAYER_H = H;
export const LAYER_W = W;
