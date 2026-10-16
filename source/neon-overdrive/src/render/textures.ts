import type { Palette } from '../state/types';

function mk(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  if (!g) throw new Error('2d context unavailable');
  return [c, g];
}

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WORDS = ['VOLT', 'HALO', 'NOVA', 'KAI', 'SPINE', 'DRIVE', 'AXIS', 'ZEN', 'LUMA', 'PRISM', 'ARC', 'ION'];
const FONT = '"Arial Black", Impact, "Segoe UI", sans-serif';

export interface Art {
  towers: HTMLCanvasElement[];
  towerW: number[];
  signs: HTMLCanvasElement[];
  pylons: HTMLCanvasElement[];
  far: HTMLCanvasElement;
  near: HTMLCanvasElement;
  stars: { x: number; y: number; r: number; p: number }[];
}

function tower(pal: Palette, seed: number, w: number, h: number, hc: boolean): HTMLCanvasElement {
  const r = rng(seed);
  const [c, g] = mk(w, h);
  const tint = pal.tints[Math.floor(r() * pal.tints.length)];
  const grd = g.createLinearGradient(0, 0, w, 0);
  grd.addColorStop(0, tint);
  grd.addColorStop(0.5, '#05081c');
  grd.addColorStop(1, tint);
  g.fillStyle = grd;
  g.fillRect(0, 0, w, h);
  const cols = Math.floor(w / 14);
  const rows = Math.floor(h / 18);
  for (let y = 1; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (r() < 0.45) {
        const col = pal.signs[Math.floor(r() * pal.signs.length)];
        g.globalAlpha = 0.35 + r() * 0.6;
        g.fillStyle = r() < 0.7 ? '#ffe9a8' : col;
        g.fillRect(6 + x * 14, 6 + y * 18, 8, 9);
      }
    }
  }
  g.globalAlpha = 1;
  const rim = pal.signs[Math.floor(r() * 2)];
  g.fillStyle = rim;
  g.fillRect(0, 0, 3, h);
  g.fillRect(w - 3, 0, 3, h);
  g.fillRect(0, 0, w, hc ? 6 : 3);
  g.shadowColor = rim;
  g.shadowBlur = 12;
  g.fillRect(w / 2 - 2, 0, 4, 10);
  return c;
}

function sign(pal: Palette, seed: number, hc: boolean): HTMLCanvasElement {
  const r = rng(seed);
  const [c, g] = mk(220, 320);
  const col = pal.signs[Math.floor(r() * pal.signs.length)];
  g.fillStyle = '#1a2040';
  g.fillRect(104, 120, 12, 200);
  g.fillStyle = '#05081c';
  g.fillRect(6, 6, 208, 118);
  g.lineWidth = hc ? 8 : 5;
  g.strokeStyle = col;
  g.shadowColor = col;
  g.shadowBlur = hc ? 0 : 18;
  g.strokeRect(10, 10, 200, 110);
  g.fillStyle = col;
  g.font = `900 52px ${FONT}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(WORDS[Math.floor(r() * WORDS.length)], 110, 66);
  g.shadowBlur = 0;
  g.fillStyle = col;
  g.globalAlpha = 0.8;
  g.fillRect(70, 94, 80, 4);
  return c;
}

function pylon(pal: Palette, seed: number): HTMLCanvasElement {
  const r = rng(seed);
  const [c, g] = mk(48, 320);
  const col = pal.signs[Math.floor(r() * pal.signs.length)];
  g.fillStyle = '#10163a';
  g.fillRect(20, 20, 8, 300);
  g.shadowColor = col;
  g.shadowBlur = 16;
  g.fillStyle = col;
  g.fillRect(12, 4, 24, 26);
  g.fillRect(22, 40, 4, 260);
  return c;
}

function skyline(pal: Palette, seed: number, w: number, h: number, near: boolean): HTMLCanvasElement {
  const r = rng(seed);
  const [c, g] = mk(w, h);
  let x = 0;
  while (x < w) {
    const bw = 28 + Math.floor(r() * (near ? 70 : 50));
    const bh = (near ? 70 : 50) + Math.floor(r() * (near ? 170 : 130));
    g.fillStyle = pal.skyline;
    g.globalAlpha = near ? 1 : 0.7;
    g.fillRect(x, h - bh, bw, bh);
    g.globalAlpha = near ? 0.9 : 0.5;
    for (let wy = h - bh + 8; wy < h - 6; wy += 11) {
      for (let wx = x + 5; wx < x + bw - 6; wx += 9) {
        if (r() < (near ? 0.3 : 0.2)) {
          g.fillStyle = r() < 0.6 ? '#ffd98a' : pal.signs[Math.floor(r() * pal.signs.length)];
          g.fillRect(wx, wy, 3, 4);
        }
      }
    }
    g.globalAlpha = 1;
    if (near) {
      g.fillStyle = pal.signs[Math.floor(r() * pal.signs.length)];
      g.globalAlpha = 0.85;
      g.fillRect(x, h - bh, bw, 2);
    }
    if (r() < 0.25) {
      g.globalAlpha = 1;
      g.fillStyle = '#ff2e63';
      g.fillRect(x + bw / 2 - 1, h - bh - 14, 2, 14);
    }
    g.globalAlpha = 1;
    x += bw + Math.floor(r() * 6);
  }
  return c;
}

export function buildArt(pal: Palette, seed: number, hc: boolean): Art {
  const r = rng(seed * 7 + 1);
  const towerSizes: [number, number][] = [[128, 360], [160, 520], [110, 440], [180, 300]];
  const stars = Array.from({ length: 90 }, () => ({ x: r(), y: r() * 0.9, r: 0.5 + r() * 1.3, p: r() * 6.28 }));
  return {
    towers: towerSizes.map(([w, h], i) => tower(pal, seed * 31 + i, w, h, hc)),
    towerW: [1500, 1800, 1300, 2000],
    signs: [0, 1, 2, 3].map((i) => sign(pal, seed * 17 + i, hc)),
    pylons: [0, 1, 2, 3].map((i) => pylon(pal, seed * 13 + i)),
    far: skyline(pal, seed * 5 + 1, 2048, 260, false),
    near: skyline(pal, seed * 5 + 2, 2048, 300, true),
    stars,
  };
}

export type CarLook = { body: string; body2: string; accent: string; glow: string };
export const LOOKS: CarLook[] = [
  { body: '#2cf6ff', body2: '#0a5a7a', accent: '#ffffff', glow: '#2cf6ff' }, // player
  { body: '#ff2ea6', body2: '#6b0f55', accent: '#ffd0ee', glow: '#ff2ea6' }, // Rook
  { body: '#8a4dff', body2: '#2a1470', accent: '#e0d0ff', glow: '#8a4dff' }, // Sable
  { body: '#ffb347', body2: '#7a3d0a', accent: '#fff0d0', glow: '#ffb347' }, // Cinder
];

/** Rear view of a wedge racer. Drawn once, then scaled with drawImage. */
export function carSprite(look: CarLook): HTMLCanvasElement {
  const [c, g] = mk(256, 130);
  // underglow
  const ug = g.createRadialGradient(128, 112, 4, 128, 112, 120);
  ug.addColorStop(0, look.glow + 'aa');
  ug.addColorStop(1, look.glow + '00');
  g.fillStyle = ug;
  g.fillRect(0, 70, 256, 60);
  // wheels
  g.fillStyle = '#05060f';
  g.fillRect(24, 74, 40, 46);
  g.fillRect(192, 74, 40, 46);
  g.fillStyle = '#1b2250';
  g.fillRect(28, 78, 6, 38);
  g.fillRect(222, 78, 6, 38);
  // lower body
  const b = g.createLinearGradient(0, 56, 0, 108);
  b.addColorStop(0, look.body);
  b.addColorStop(1, look.body2);
  g.fillStyle = b;
  g.beginPath();
  g.moveTo(18, 104);
  g.lineTo(238, 104);
  g.lineTo(232, 72);
  g.lineTo(204, 56);
  g.lineTo(52, 56);
  g.lineTo(24, 72);
  g.closePath();
  g.fill();
  // cabin
  const cg = g.createLinearGradient(0, 22, 0, 58);
  cg.addColorStop(0, '#1b2a6a');
  cg.addColorStop(1, '#050816');
  g.fillStyle = cg;
  g.beginPath();
  g.moveTo(70, 58);
  g.lineTo(186, 58);
  g.lineTo(166, 24);
  g.lineTo(90, 24);
  g.closePath();
  g.fill();
  g.fillStyle = 'rgba(255,255,255,0.18)';
  g.beginPath();
  g.moveTo(96, 28);
  g.lineTo(130, 28);
  g.lineTo(112, 54);
  g.lineTo(84, 54);
  g.closePath();
  g.fill();
  // spoiler
  g.fillStyle = look.body2;
  g.fillRect(52, 36, 8, 24);
  g.fillRect(196, 36, 8, 24);
  g.fillStyle = look.body;
  g.fillRect(34, 28, 188, 10);
  g.fillStyle = look.accent;
  g.fillRect(34, 28, 188, 2);
  // tail bar
  g.shadowColor = '#ff2e63';
  g.shadowBlur = 16;
  g.fillStyle = '#ff5a7e';
  g.fillRect(40, 70, 176, 9);
  g.fillStyle = '#ffd0d8';
  g.fillRect(60, 72, 136, 3);
  g.shadowBlur = 0;
  // diffuser
  g.fillStyle = '#05060f';
  g.fillRect(62, 90, 132, 20);
  g.fillStyle = look.body2;
  for (let i = 0; i < 6; i++) g.fillRect(70 + i * 21, 92, 4, 16);
  // exhausts
  g.fillStyle = '#c8d0ff';
  g.beginPath();
  g.arc(96, 100, 6, 0, 7);
  g.arc(160, 100, 6, 0, 7);
  g.fill();
  g.fillStyle = '#05060f';
  g.beginPath();
  g.arc(96, 100, 3.5, 0, 7);
  g.arc(160, 100, 3.5, 0, 7);
  g.fill();
  return c;
}
