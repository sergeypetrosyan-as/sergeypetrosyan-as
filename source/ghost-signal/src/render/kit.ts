// Painting toolkit for the procedural scenes. Everything here runs at bake
// time only (never inside the animation loop), so clarity beats micro-speed.

export type Ctx = CanvasRenderingContext2D;
export type Rng = () => number;

export function rng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Device pixel ratio used for temporary canvases created by kit helpers. */
export const KIT = { dpr: 1 };

export function makeCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h));
  return c;
}
export function ctx2d(cv: HTMLCanvasElement): Ctx {
  const c = cv.getContext('2d');
  if (!c) throw new Error('Canvas 2D unavailable');
  return c;
}

export const rgba = (rgb: string, a: number): string => `rgba(${rgb},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const clamp = (v: number, a = 0, b = 1): number => Math.max(a, Math.min(b, v));

// ------------------------------------------------------------------ fills
export function vgrad(c: Ctx, x: number, y: number, w: number, h: number, stops: [number, string][]): void {
  const g = c.createLinearGradient(0, y, 0, y + h);
  for (const [o, col] of stops) g.addColorStop(o, col);
  c.fillStyle = g; c.fillRect(x, y, w, h);
}
export function hgrad(c: Ctx, x: number, y: number, w: number, h: number, stops: [number, string][]): void {
  const g = c.createLinearGradient(x, 0, x + w, 0);
  for (const [o, col] of stops) g.addColorStop(o, col);
  c.fillStyle = g; c.fillRect(x, y, w, h);
}
export function box(c: Ctx, x: number, y: number, w: number, h: number, fill: string): void { c.fillStyle = fill; c.fillRect(x, y, w, h); }
export function poly(c: Ctx, pts: number[], fill: string): void {
  c.beginPath(); c.moveTo(pts[0], pts[1]);
  for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]);
  c.closePath(); c.fillStyle = fill; c.fill();
}
export function line(c: Ctx, x0: number, y0: number, x1: number, y1: number, stroke: string, lw = 1): void {
  c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.strokeStyle = stroke; c.lineWidth = lw; c.stroke();
}

// ------------------------------------------------------------------ light
/** Additive point light with an inverse-square-like falloff. Draw on an additive layer. */
export function light(c: Ctx, x: number, y: number, r: number, rgb: string, a: number, sy = 1): void {
  if (r <= 0) return;
  c.save();
  c.translate(x, y); c.scale(1, sy);
  const g = c.createRadialGradient(0, 0, 0, 0, 0, r);
  g.addColorStop(0, rgba(rgb, a));
  g.addColorStop(0.06, rgba(rgb, a * 0.62));
  g.addColorStop(0.18, rgba(rgb, a * 0.28));
  g.addColorStop(0.4, rgba(rgb, a * 0.09));
  g.addColorStop(0.7, rgba(rgb, a * 0.025));
  g.addColorStop(1, rgba(rgb, 0));
  c.fillStyle = g; c.fillRect(-r, -r, r * 2, r * 2);
  c.restore();
}
/** A soft pool of light on a floor (flattened ellipse). */
export function pool(c: Ctx, x: number, y: number, rx: number, ry: number, rgb: string, a: number): void {
  c.save(); c.translate(x, y); c.scale(1, ry / rx);
  const g = c.createRadialGradient(0, 0, 0, 0, 0, rx);
  g.addColorStop(0, rgba(rgb, a)); g.addColorStop(0.35, rgba(rgb, a * 0.45)); g.addColorStop(1, rgba(rgb, 0));
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, rx, 0, Math.PI * 2); c.fill();
  c.restore();
}
/** Volumetric light shaft: a quad from a narrow source to a wide end, fading along its length and at its edges. */
export function shaft(c: Ctx, x0: number, y0: number, w0: number, x1: number, y1: number, w1: number, rgb: string, a: number): void {
  const dx = x1 - x0; const dy = y1 - y0; const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len; const ny = dx / len;
  c.save();
  // body
  const g = c.createLinearGradient(x0, y0, x1, y1);
  g.addColorStop(0, rgba(rgb, a)); g.addColorStop(0.25, rgba(rgb, a * 0.55)); g.addColorStop(1, rgba(rgb, 0));
  for (let k = 0; k < 3; k++) {
    const f = 1 - k * 0.3;
    c.beginPath();
    c.moveTo(x0 + nx * w0 * f / 2, y0 + ny * w0 * f / 2);
    c.lineTo(x1 + nx * w1 * f / 2, y1 + ny * w1 * f / 2);
    c.lineTo(x1 - nx * w1 * f / 2, y1 - ny * w1 * f / 2);
    c.lineTo(x0 - nx * w0 * f / 2, y0 - ny * w0 * f / 2);
    c.closePath();
    c.globalAlpha = 0.45;
    c.fillStyle = g; c.fill();
  }
  c.restore();
}
export function hazeBand(c: Ctx, x: number, y: number, w: number, h: number, rgb: string, a: number): void {
  vgrad(c, x, y, w, h, [[0, rgba(rgb, 0)], [0.5, rgba(rgb, a)], [1, rgba(rgb, 0)]]);
}
/** Out-of-focus point light: a disc with a soft edge and a faint brighter rim. */
export function bokeh(c: Ctx, x: number, y: number, r: number, rgb: string, a: number): void {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(rgb, a * 0.7)); g.addColorStop(0.78, rgba(rgb, a * 0.8)); g.addColorStop(0.9, rgba(rgb, a)); g.addColorStop(1, rgba(rgb, 0));
  c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
}

// ------------------------------------------------------------------ architecture
export interface WinOpts { cols: number; rows: number; lit: number; r: Rng; warm?: number; dim?: number; frame?: string; tint?: string[] }
/** Window grid with blinds, curtains, people and dark panes. */
export function windows(c: Ctx, x: number, y: number, w: number, h: number, o: WinOpts): void {
  const cw = w / o.cols; const rh = h / o.rows;
  const pw = cw * 0.62; const ph = rh * 0.58;
  const tints = o.tint ?? ['255,196,120', '255,214,160', '160,220,255', '255,150,190', '200,255,240'];
  for (let j = 0; j < o.rows; j++) {
    for (let i = 0; i < o.cols; i++) {
      const wx = x + i * cw + (cw - pw) / 2; const wy = y + j * rh + (rh - ph) * 0.4;
      const lit = o.r() < o.lit;
      if (!lit) { c.fillStyle = o.frame ?? 'rgba(4,8,12,0.9)'; c.fillRect(wx, wy, pw, ph); continue; }
      const t = o.r() < (o.warm ?? 0.6) ? tints[o.r() < 0.6 ? 0 : 1] : tints[2 + Math.floor(o.r() * (tints.length - 2))];
      const k = (o.dim ?? 0.55) * (0.45 + o.r() * 0.55);
      const g = c.createLinearGradient(0, wy, 0, wy + ph);
      g.addColorStop(0, rgba(t, k * 0.75)); g.addColorStop(1, rgba(t, k));
      c.fillStyle = g; c.fillRect(wx, wy, pw, ph);
      const kind = o.r();
      if (kind < 0.3) { // blinds
        c.fillStyle = 'rgba(0,0,0,0.35)';
        for (let s = wy + 1; s < wy + ph; s += Math.max(1.5, ph / 7)) c.fillRect(wx, s, pw, Math.max(0.6, ph / 18));
      } else if (kind < 0.5) { // curtain half-drawn
        c.fillStyle = 'rgba(10,6,8,0.7)'; c.fillRect(wx, wy, pw * (0.3 + o.r() * 0.4), ph);
      } else if (kind < 0.58 && ph > 6) { // someone at the window
        c.fillStyle = 'rgba(6,6,8,0.85)';
        const px = wx + pw * (0.25 + o.r() * 0.5);
        c.beginPath(); c.arc(px, wy + ph * 0.45, ph * 0.14, 0, Math.PI * 2); c.fill();
        c.fillRect(px - ph * 0.22, wy + ph * 0.58, ph * 0.44, ph * 0.42);
      }
      // sill
      c.fillStyle = 'rgba(0,0,0,0.5)'; c.fillRect(wx - 0.5, wy + ph, pw + 1, Math.max(0.6, ph * 0.06));
    }
  }
}

/** Zig-zag fire escape bolted to a facade. */
export function fireEscape(c: Ctx, x: number, y: number, w: number, floors: number, fh: number, col: string, lw = 1): void {
  c.save(); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = lw;
  for (let f = 0; f < floors; f++) {
    const py = y + f * fh;
    c.fillRect(x, py, w, lw * 1.6); // landing
    // railing
    c.beginPath(); c.moveTo(x, py - fh * 0.32); c.lineTo(x + w, py - fh * 0.32); c.stroke();
    for (let k = 0; k <= 8; k++) { const rx = x + (w * k) / 8; c.beginPath(); c.moveTo(rx, py); c.lineTo(rx, py - fh * 0.32); c.stroke(); }
    // stair to the next landing
    if (f < floors - 1) {
      const a = f % 2 === 0;
      const sx0 = a ? x + w * 0.1 : x + w * 0.9; const sx1 = a ? x + w * 0.9 : x + w * 0.1;
      c.beginPath(); c.moveTo(sx0, py); c.lineTo(sx1, py + fh); c.lineWidth = lw * 1.3; c.stroke(); c.lineWidth = lw;
      const steps = 7;
      for (let s = 1; s < steps; s++) {
        const t = s / steps; const sx = lerp(sx0, sx1, t); const sy = py + fh * t;
        c.beginPath(); c.moveTo(sx - 2 * lw, sy); c.lineTo(sx + 2 * lw, sy); c.stroke();
      }
    }
  }
  c.restore();
}

/** Sagging cable between two points. */
export function cable(c: Ctx, x0: number, y0: number, x1: number, y1: number, sag: number, col: string, lw = 1): void {
  c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2, Math.max(y0, y1) + sag, x1, y1);
  c.strokeStyle = col; c.lineWidth = lw; c.stroke();
}

/** Wall-mounted air conditioner / vent box. */
export function acUnit(c: Ctx, x: number, y: number, s: number, col: string): void {
  c.fillStyle = col; c.fillRect(x, y, s * 1.4, s);
  c.fillStyle = 'rgba(0,0,0,0.45)';
  for (let i = 1; i < 6; i++) c.fillRect(x + s * 0.1, y + (s * i) / 6, s * 0.75, Math.max(0.5, s * 0.05));
  c.beginPath(); c.arc(x + s * 1.08, y + s * 0.5, s * 0.26, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(255,255,255,0.05)'; c.fillRect(x, y, s * 1.4, Math.max(0.6, s * 0.06));
}

/** A whole facade: block, cornice, windows, optional fire escape, AC units and roof clutter. */
export function building(c: Ctx, x: number, base: number, bw: number, bh: number, r: Rng, o: { col: string; lit: number; dim?: number; escape?: boolean; ac?: boolean; roof?: boolean; rows?: number; edge?: string }): void {
  const top = base - bh;
  c.fillStyle = o.col; c.fillRect(x, top, bw, bh);
  if (o.edge) { c.fillStyle = o.edge; c.fillRect(x, top, Math.max(1, bw * 0.02), bh); }
  c.fillStyle = 'rgba(0,0,0,0.3)'; c.fillRect(x - 1, top, bw + 2, Math.max(1, bh * 0.012));
  const rows = o.rows ?? Math.max(2, Math.floor(bh / Math.max(9, bw * 0.16)));
  const cols = Math.max(2, Math.floor(bw / Math.max(8, bh / rows * 0.9)));
  windows(c, x + bw * 0.04, top + bh * 0.04, bw * 0.92, bh * 0.9, { cols, rows, lit: o.lit, r, dim: o.dim });
  if (o.roof) {
    const tw = bw * 0.18;
    const tx = x + bw * (0.15 + r() * 0.5);
    c.fillStyle = o.col;
    c.fillRect(tx, top - tw * 0.9, tw, tw * 0.9); // water tank
    c.fillRect(tx + tw * 0.1, top - tw * 0.2, tw * 0.08, tw * 0.2);
    c.fillRect(tx + tw * 0.82, top - tw * 0.2, tw * 0.08, tw * 0.2);
    c.beginPath(); c.moveTo(tx - tw * 0.05, top - tw * 0.9); c.lineTo(tx + tw / 2, top - tw * 1.25); c.lineTo(tx + tw * 1.05, top - tw * 0.9); c.fill();
    const ax = x + bw * (0.6 + r() * 0.3);
    line(c, ax, top, ax, top - bh * 0.12, o.col, Math.max(1, bw * 0.01));
  }
  if (o.ac) for (let i = 0; i < 3; i++) if (r() < 0.7) acUnit(c, x + bw * (0.1 + r() * 0.7), top + bh * (0.2 + r() * 0.6), Math.max(3, bw * 0.06), 'rgba(40,46,50,0.95)');
  if (o.escape) fireEscape(c, x + bw * 0.25, top + bh * 0.16, bw * 0.5, Math.max(2, rows - 1), (bh * 0.8) / Math.max(2, rows - 1), 'rgba(8,10,12,0.95)', Math.max(0.7, bw * 0.006));
}

/** Perspective floor seams converging to a vanishing point. */
export function floorSeams(c: Ctx, w: number, y0: number, h: number, vx: number, vy: number, n: number, col: string, rows = 9): void {
  c.save(); c.strokeStyle = col; c.lineWidth = 1;
  c.beginPath(); c.rect(0, y0, w, h - y0); c.clip();
  for (let i = -n; i <= n * 2; i++) {
    const bx = (i / n) * w;
    c.beginPath(); c.moveTo(vx, vy); c.lineTo(bx + (bx - vx) * 2, h + (h - vy) * 2); c.stroke();
  }
  for (let k = 1; k <= rows; k++) {
    const t = Math.pow(k / rows, 2.1);
    const yy = y0 + (h - y0) * t;
    c.beginPath(); c.moveTo(0, yy); c.lineTo(w, yy); c.stroke();
  }
  c.restore();
}

// ------------------------------------------------------------------ people
export interface PersonOpts {
  h: number;
  coat?: number;        // 0..1 how far the coat reaches toward the knee
  hat?: 'brim' | 'cap' | null;
  hood?: boolean;
  bun?: boolean;
  umbrella?: boolean;
  lean?: number;        // -1..1
  broad?: number;       // shoulder width factor
  stoop?: number;       // 0..1
  arms?: 'side' | 'crossed' | 'pockets';
  prop?: 'mop' | 'glass' | 'bag' | null;
  fill?: string;
  rims?: { rgb: string; dx: number; dy: number; a: number }[];
  reflect?: number;     // strength of the floor reflection drawn below the feet (0 = none)
}

export function personPath(x: number, base: number, o: PersonOpts): Path2D {
  const H = o.h; const b = o.broad ?? 1; const lean = (o.lean ?? 0) * H * 0.03; const st = (o.stoop ?? 0) * H * 0.04;
  const p = new Path2D();
  const headR = H * 0.064;
  const hx = x + lean + st; const hy = base - H + headR + st * 0.6;
  p.ellipse(hx, hy, headR * 0.86, headR, 0, 0, Math.PI * 2);
  if (o.bun) p.ellipse(hx - headR * 0.55, hy - headR * 0.45, headR * 0.42, headR * 0.38, 0, 0, Math.PI * 2);
  if (o.hat === 'brim') { p.ellipse(hx, hy - headR * 0.55, headR * 1.7, headR * 0.28, 0, 0, Math.PI * 2); p.rect(hx - headR * 0.85, hy - headR * 1.3, headR * 1.7, headR * 0.8); }
  if (o.hat === 'cap') { p.ellipse(hx, hy - headR * 0.5, headR * 1.05, headR * 0.6, 0, 0, Math.PI * 2); p.ellipse(hx + headR * 0.7, hy - headR * 0.3, headR * 0.7, headR * 0.18, 0, 0, Math.PI * 2); }
  if (o.hood) p.ellipse(hx, hy - headR * 0.05, headR * 1.2, headR * 1.25, 0, 0, Math.PI * 2);
  const sh = H * 0.13 * b; // half shoulder width
  const ny = hy + headR * 0.95; const sy = ny + H * 0.045;
  const coat = o.coat ?? 0.6;
  const hemY = base - H * (0.42 - coat * 0.22);
  const hemW = sh * (0.95 + coat * 0.35);
  // neck and torso / coat
  p.moveTo(hx - headR * 0.35, ny - headR * 0.2);
  p.lineTo(hx + headR * 0.35, ny - headR * 0.2);
  p.quadraticCurveTo(hx + sh * 0.5, sy - H * 0.01, hx + sh, sy + H * 0.02);
  p.quadraticCurveTo(hx + sh * 1.08, sy + H * 0.1, x + sh * 0.92, base - H * 0.5);
  p.lineTo(x + hemW, hemY);
  p.lineTo(x - hemW, hemY);
  p.lineTo(x - sh * 0.92, base - H * 0.5);
  p.quadraticCurveTo(hx - sh * 1.08, sy + H * 0.1, hx - sh, sy + H * 0.02);
  p.quadraticCurveTo(hx - sh * 0.5, sy - H * 0.01, hx - headR * 0.35, ny - headR * 0.2);
  p.closePath();
  // arms
  const arms = o.arms ?? 'side';
  if (arms === 'side') {
    p.moveTo(hx + sh * 0.92, sy + H * 0.03); p.quadraticCurveTo(x + sh * 1.22, base - H * 0.55, x + sh * 1.08, base - H * 0.4);
    p.lineTo(x + sh * 0.86, base - H * 0.41); p.lineTo(x + sh * 0.8, base - H * 0.6); p.closePath();
    p.moveTo(hx - sh * 0.92, sy + H * 0.03); p.quadraticCurveTo(x - sh * 1.22, base - H * 0.55, x - sh * 1.08, base - H * 0.4);
    p.lineTo(x - sh * 0.86, base - H * 0.41); p.lineTo(x - sh * 0.8, base - H * 0.6); p.closePath();
  } else if (arms === 'crossed') {
    p.ellipse(x + lean * 0.5, sy + H * 0.13, sh * 1.02, H * 0.05, 0, 0, Math.PI * 2);
  }
  // legs
  const legTop = hemY - H * 0.02; const lw = sh * 0.36;
  p.moveTo(x - lw * 1.7, legTop); p.lineTo(x - lw * 0.2, legTop); p.lineTo(x - lw * 0.35, base); p.lineTo(x - lw * 1.75, base); p.closePath();
  p.moveTo(x + lw * 0.2, legTop); p.lineTo(x + lw * 1.7, legTop); p.lineTo(x + lw * 1.75, base); p.lineTo(x + lw * 0.35, base); p.closePath();
  // shoes
  p.ellipse(x - lw, base - H * 0.008, lw * 1.0, H * 0.014, 0, 0, Math.PI * 2);
  p.ellipse(x + lw, base - H * 0.008, lw * 1.0, H * 0.014, 0, 0, Math.PI * 2);
  if (o.umbrella) {
    const ux = hx; const uy = hy - H * 0.16;
    p.moveTo(ux - H * 0.3, uy + H * 0.05);
    p.quadraticCurveTo(ux, uy - H * 0.16, ux + H * 0.3, uy + H * 0.05);
    for (let k = 3; k >= -3; k--) p.lineTo(ux + (k / 3) * H * 0.3, uy + H * 0.05 - (k % 2 === 0 ? 0 : H * 0.02));
    p.closePath();
    p.rect(ux - H * 0.004, uy, H * 0.008, H * 0.3);
  }
  if (o.prop === 'mop') { p.rect(x + sh * 1.15, base - H * 0.78, H * 0.012, H * 0.76); p.ellipse(x + sh * 1.2, base - H * 0.02, H * 0.07, H * 0.025, 0, 0, Math.PI * 2); }
  if (o.prop === 'bag') p.rect(x - sh * 1.35, base - H * 0.42, sh * 0.6, H * 0.12);
  return p;
}

/** Silhouette with rim light on the lit sides and an optional wet-floor reflection. */
export function person(c: Ctx, x: number, base: number, o: PersonOpts): void {
  const path = personPath(x, base, o);
  const H = o.h;
  if (o.reflect) {
    c.save();
    c.translate(0, base * 2); c.scale(1, -1);
    c.globalAlpha = o.reflect * 0.55;
    c.fillStyle = '#020406'; c.fill(path);
    c.restore();
  }
  c.fillStyle = o.fill ?? '#05080b'; c.fill(path);
  // body shading: a faint gradient so the silhouette has volume
  c.save(); c.clip(path);
  vgrad(c, x - H, base - H, H * 2, H, [[0, 'rgba(255,255,255,0.03)'], [0.6, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.25)']]);
  c.restore();
  if (!o.rims?.length) return;
  // rim: path minus the path shifted toward the light, rendered on a temp canvas
  const pad = H * 0.6; const bx = x - pad; const by = base - H - pad * 0.4;
  const tw = pad * 2; const th = H + pad * 0.6;
  const s = KIT.dpr;
  const cv = makeCanvas(tw * s, th * s); const t = ctx2d(cv);
  o.rims.forEach((rim, k) => {
    t.setTransform(s, 0, 0, s, -bx * s, -by * s);
    t.globalCompositeOperation = 'source-over';
    t.clearRect(bx, by, tw, th);
    t.fillStyle = rgba(rim.rgb, rim.a * (k === 0 ? 0.85 : 0.45)); t.fill(path);
    t.globalCompositeOperation = 'destination-out';
    const sh = Math.max(1, H * (k === 0 ? 0.0075 : 0.005));
    const len = Math.hypot(rim.dx, rim.dy) || 1;
    t.save(); t.translate(-rim.dx / len * sh, -rim.dy / len * sh); t.filter = 'blur(0.8px)'; t.fillStyle = '#000'; t.fill(path); t.restore();
    t.filter = 'none';
    // light falls off toward the feet
    t.globalCompositeOperation = 'destination-in';
    const g = t.createLinearGradient(0, base - H, 0, base);
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.45, 'rgba(0,0,0,0.75)'); g.addColorStop(1, 'rgba(0,0,0,0.15)');
    t.fillStyle = g; t.fillRect(bx, by, tw, th);
    c.save(); c.globalCompositeOperation = 'lighter'; c.drawImage(cv, bx, by, tw, th); c.restore();
  });
}

// ------------------------------------------------------------------ neon
/** Neon tube look for an arbitrary path: wide halo, coloured tube, white-hot core. */
export function neon(c: Ctx, trace: (c: Ctx) => void, rgb: string, width: number, k = 1): void {
  c.save();
  c.lineCap = 'round'; c.lineJoin = 'round';
  c.shadowColor = rgba(rgb, 0.9 * k); c.shadowBlur = width * 9;
  c.strokeStyle = rgba(rgb, 0.35 * k); c.lineWidth = width * 3.2; trace(c); c.stroke();
  c.shadowBlur = width * 3;
  c.strokeStyle = rgba(rgb, 0.95 * k); c.lineWidth = width; trace(c); c.stroke();
  c.shadowBlur = 0;
  c.strokeStyle = rgba('255,255,255', 0.75 * k); c.lineWidth = Math.max(0.5, width * 0.35); trace(c); c.stroke();
  c.restore();
}
export function neonText(c: Ctx, text: string, x: number, y: number, size: number, rgb: string, align: CanvasTextAlign = 'center', k = 1, font = 'Big Shoulders Display'): void {
  c.save();
  c.font = `700 ${size}px "${font}", Bahnschrift, 'Arial Narrow', sans-serif`;
  c.textAlign = align; c.textBaseline = 'middle';
  c.lineJoin = 'round';
  c.shadowColor = rgba(rgb, 0.9 * k); c.shadowBlur = size * 0.5;
  c.strokeStyle = rgba(rgb, 0.5 * k); c.lineWidth = size * 0.09; c.strokeText(text, x, y);
  c.shadowBlur = size * 0.15;
  c.strokeStyle = rgba(rgb, k); c.lineWidth = size * 0.05; c.strokeText(text, x, y);
  c.shadowBlur = 0;
  c.strokeStyle = rgba('255,255,255', 0.7 * k); c.lineWidth = Math.max(0.5, size * 0.016); c.strokeText(text, x, y);
  c.restore();
}
/** Painted or unlit lettering (no glow). */
export function flatText(c: Ctx, text: string, x: number, y: number, size: number, fill: string, align: CanvasTextAlign = 'center', weight = 700, font = 'Big Shoulders Display', spacing = 0): void {
  c.save();
  c.font = `${weight} ${size}px "${font}", Bahnschrift, 'Arial Narrow', sans-serif`;
  c.textAlign = align; c.textBaseline = 'middle'; c.fillStyle = fill;
  if (spacing && 'letterSpacing' in c) (c as unknown as { letterSpacing: string }).letterSpacing = `${spacing}px`;
  c.fillText(text, x, y);
  c.restore();
}

// ------------------------------------------------------------------ texture
/** Scatter of tiny marks: stains, frost, dirt. */
export function speckle(c: Ctx, x: number, y: number, w: number, h: number, n: number, col: string, r: Rng, size = 1.2): void {
  c.fillStyle = col;
  for (let i = 0; i < n; i++) c.fillRect(x + r() * w, y + r() * h, size * (0.4 + r()), size * (0.4 + r()));
}
/** Vertical water stains running down a wall. */
export function stains(c: Ctx, x: number, y: number, w: number, h: number, n: number, r: Rng, col = 'rgba(0,0,0,0.18)'): void {
  for (let i = 0; i < n; i++) {
    const sx = x + r() * w; const len = h * (0.2 + r() * 0.8); const sw = 1 + r() * 6;
    const g = c.createLinearGradient(0, y, 0, y + len);
    g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.fillRect(sx, y, sw, len);
  }
}
