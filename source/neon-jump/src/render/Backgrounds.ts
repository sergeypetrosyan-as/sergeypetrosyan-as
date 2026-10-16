import { THEMES, type Theme } from '../game/Config';

/** A repeating parallax strip, bottom-aligned to the level floor. */
export interface Layer {
  canvas: HTMLCanvasElement;
  /** Horizontal / vertical scroll factors relative to the camera. */
  fx: number;
  fy: number;
  /** Ambient drift in px/s (clouds, smoke). */
  drift: number;
}

export interface Backdrop {
  theme: Theme;
  stars: HTMLCanvasElement;
  layers: Layer[];
}

const W = 512;
const H = 280;

function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvas(w = W, h = H): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

function stars(theme: Theme, seed: number): HTMLCanvasElement {
  const [c, ctx] = canvas(W, 220);
  const r = rng(seed);
  for (let i = 0; i < 90; i++) {
    ctx.globalAlpha = 0.25 + r() * 0.6;
    ctx.fillStyle = r() < 0.15 ? theme.window[Math.floor(r() * theme.window.length)] : '#cfd6ff';
    ctx.fillRect(Math.floor(r() * W), Math.floor(r() * 220), 1, 1);
  }
  ctx.globalAlpha = 1;
  return c;
}

/** Simple windowed tower; `lit` is the chance each window glows. */
function tower(ctx: CanvasRenderingContext2D, r: () => number, theme: Theme, x: number, w: number, h: number, body: string, lit: number, win = 2): void {
  ctx.fillStyle = body;
  ctx.fillRect(x, H - h, w, h);
  for (let y = H - h + 4; y < H - 4; y += win + 3) {
    for (let wx = x + 2; wx < x + w - win - 1; wx += win + 2) {
      if (r() > lit) continue;
      ctx.globalAlpha = 0.35 + r() * 0.5;
      ctx.fillStyle = theme.window[Math.floor(r() * theme.window.length)];
      ctx.fillRect(wx, y, win, win === 1 ? 1 : 2);
    }
  }
  ctx.globalAlpha = 1;
}

function cityLayers(t: Theme): Layer[] {
  const r = rng(11);
  const [far, f] = canvas();
  for (let x = -10; x < W; ) {
    const w = 14 + Math.floor(r() * 26);
    tower(f, r, t, x, w, 70 + Math.floor(r() * 90), t.far, 0.12, 1);
    x += w + Math.floor(r() * 4);
  }
  const [mid, m] = canvas();
  for (let x = -10; x < W; ) {
    const w = 22 + Math.floor(r() * 30);
    const h = 40 + Math.floor(r() * 100);
    tower(m, r, t, x, w, h, t.mid, 0.28);
    // Rooftop neon bars.
    if (r() < 0.45) {
      m.fillStyle = r() < 0.5 ? t.accent : t.groundEdge;
      m.globalAlpha = 0.85;
      m.fillRect(x + 3, H - h - 6, w - 6, 3);
      m.globalAlpha = 1;
      m.fillStyle = t.mid;
      m.fillRect(x + 5, H - h - 3, 1, 3);
      m.fillRect(x + w - 6, H - h - 3, 1, 3);
    }
    x += w + 6 + Math.floor(r() * 14);
  }
  const [near, n] = canvas();
  for (let x = -6; x < W; ) {
    const w = 30 + Math.floor(r() * 40);
    const h = 18 + Math.floor(r() * 46);
    n.fillStyle = t.near;
    n.fillRect(x, H - h, w, h);
    if (r() < 0.6) n.fillRect(x + Math.floor(w * 0.6), H - h - 14, 1, 14);
    if (r() < 0.5) {
      n.fillRect(x + 4, H - h - 8, 10, 8);
      n.fillRect(x + 5, H - h - 10, 8, 2);
    }
    n.fillStyle = t.accent;
    n.globalAlpha = 0.5;
    if (r() < 0.5) n.fillRect(x + 2, H - h + 3, w - 4, 1);
    n.globalAlpha = 1;
    x += w + 10 + Math.floor(r() * 26);
  }
  return [
    { canvas: far, fx: 0.12, fy: 0.08, drift: 0 },
    { canvas: mid, fx: 0.28, fy: 0.18, drift: 0 },
    { canvas: near, fx: 0.5, fy: 0.35, drift: 0 },
  ];
}

function factoryLayers(t: Theme): Layer[] {
  const r = rng(23);
  const [far, f] = canvas();
  for (let i = 0; i < 4; i++) {
    // Gears.
    const cx = 40 + i * 130 + r() * 40;
    const cy = H - 70 - r() * 60;
    const rad = 26 + r() * 22;
    f.fillStyle = t.far;
    f.beginPath();
    for (let k = 0; k < 24; k++) {
      const a = (k / 24) * Math.PI * 2;
      const rr = k % 2 ? rad : rad + 6;
      f.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
    }
    f.fill();
    f.fillStyle = t.skyBottom;
    f.beginPath();
    f.arc(cx, cy, rad * 0.35, 0, Math.PI * 2);
    f.fill();
  }
  for (let x = 0; x < W; x += 60 + Math.floor(r() * 50)) {
    const h = 120 + r() * 100;
    f.fillStyle = t.far;
    f.fillRect(x, H - h, 10, h);
    f.fillStyle = t.accent;
    f.globalAlpha = 0.7;
    f.fillRect(x, H - h, 10, 2);
    f.globalAlpha = 1;
  }
  const [mid, m] = canvas();
  m.strokeStyle = t.mid;
  m.lineWidth = 2;
  for (let x = 0; x < W; x += 32) {
    // Girder lattice.
    m.strokeRect(x + 0.5, H - 150.5, 32, 30);
    m.beginPath();
    m.moveTo(x, H - 150);
    m.lineTo(x + 32, H - 120);
    m.moveTo(x + 32, H - 150);
    m.lineTo(x, H - 120);
    m.stroke();
  }
  for (let x = 0; x < W; ) {
    const w = 30 + Math.floor(r() * 50);
    const h = 40 + Math.floor(r() * 70);
    tower(m, r, t, x, w, h, t.mid, 0.18);
    x += w + 8 + Math.floor(r() * 20);
  }
  m.fillStyle = t.mid;
  m.fillRect(0, H - 96, W, 5);
  for (let x = 12; x < W; x += 48) {
    m.fillStyle = t.accent;
    m.globalAlpha = 0.6;
    m.fillRect(x, H - 97, 4, 7);
    m.globalAlpha = 1;
  }
  const [near, n] = canvas();
  n.fillStyle = t.near;
  for (let x = 0; x < W; ) {
    const w = 20 + Math.floor(r() * 40);
    const h = 24 + Math.floor(r() * 40);
    n.fillRect(x, H - h, w, h);
    // Tanks.
    if (r() < 0.5) {
      n.beginPath();
      n.arc(x + w / 2, H - h, w / 2.5, Math.PI, 0);
      n.fill();
    }
    x += w + 16 + Math.floor(r() * 30);
  }
  // Hanging chains from the top.
  for (let x = 20; x < W; x += 70 + Math.floor(r() * 40)) {
    const len = 40 + r() * 70;
    for (let y = 0; y < len; y += 4) n.fillRect(x, y, 2, 3);
    n.fillRect(x - 3, len, 8, 4);
  }
  return [
    { canvas: far, fx: 0.1, fy: 0.06, drift: 0 },
    { canvas: mid, fx: 0.26, fy: 0.16, drift: 0 },
    { canvas: near, fx: 0.48, fy: 0.3, drift: 0 },
  ];
}

function glitchLayers(t: Theme): Layer[] {
  const r = rng(37);
  const [far, f] = canvas();
  // Perspective grid floor.
  f.strokeStyle = t.accent;
  f.globalAlpha = 0.22;
  f.lineWidth = 1;
  for (let y = 0; y < 60; y += 0) {
    f.beginPath();
    f.moveTo(0, H - 60 + y + 0.5);
    f.lineTo(W, H - 60 + y + 0.5);
    f.stroke();
    y += 3 + y * 0.35;
  }
  for (let x = -W; x < W * 2; x += 32) {
    f.beginPath();
    f.moveTo(W / 2 + (x - W / 2) * 0.2, H - 60);
    f.lineTo(x, H);
    f.stroke();
  }
  f.globalAlpha = 1;
  // Floating wireframe cubes.
  for (let i = 0; i < 7; i++) {
    const x = r() * W;
    const y = 20 + r() * 120;
    const s = 8 + r() * 18;
    f.strokeStyle = r() < 0.5 ? t.blockEdge : t.accent;
    f.globalAlpha = 0.45;
    f.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, s, s);
    f.strokeRect(Math.round(x + s * 0.4) + 0.5, Math.round(y - s * 0.4) + 0.5, s, s);
    f.beginPath();
    f.moveTo(x, y);
    f.lineTo(x + s * 0.4, y - s * 0.4);
    f.moveTo(x + s, y);
    f.lineTo(x + s * 1.4, y - s * 0.4);
    f.moveTo(x + s, y + s);
    f.lineTo(x + s * 1.4, y + s * 0.6);
    f.stroke();
  }
  f.globalAlpha = 1;
  const [mid, m] = canvas();
  for (let x = 0; x < W; ) {
    const w = 18 + Math.floor(r() * 30);
    const h = 50 + Math.floor(r() * 110);
    tower(m, r, t, x, w, h, t.mid, 0.2);
    x += w + 10 + Math.floor(r() * 16);
  }
  // Slice the strip and offset rows: the city is glitching.
  for (let i = 0; i < 9; i++) {
    const y = Math.floor(r() * H);
    const h = 2 + Math.floor(r() * 5);
    const dx = Math.floor((r() - 0.5) * 18);
    const strip = m.getImageData(0, y, W, h);
    m.clearRect(0, y, W, h);
    m.putImageData(strip, dx, y);
  }
  const [near, n] = canvas();
  for (let i = 0; i < 9; i++) {
    const x = r() * W;
    const y = H - 30 - r() * 170;
    const s = 6 + r() * 12;
    n.fillStyle = t.near;
    n.beginPath();
    n.moveTo(x, y - s);
    n.lineTo(x + s * 0.5, y);
    n.lineTo(x, y + s * 1.4);
    n.lineTo(x - s * 0.5, y);
    n.fill();
    n.fillStyle = t.blockEdge;
    n.globalAlpha = 0.6;
    n.fillRect(Math.round(x), Math.round(y - s), 1, Math.round(s * 2.4));
    n.globalAlpha = 1;
  }
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
    const layers = world === 0 ? cityLayers(theme) : world === 1 ? factoryLayers(theme) : glitchLayers(theme);
    b = { theme, stars: stars(theme, 5 + world), layers };
    cache.set(world, b);
  }
  return b;
}

export const LAYER_H = H;
export const LAYER_W = W;
