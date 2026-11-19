// Procedural canvas textures for the House: plaster, worn stone, lacquered wood, brass smudge,
// section poché, paper notes and small sprites. Generated once (seeded, deterministic) and shared.
import * as THREE from 'three';
import { PALETTE } from '../render/palette.ts';
import { disc, grain, mesa, cactus, observatory, starfield, constellation } from '../../../../design/19_mystical-western/primitives.mjs';

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

/** Tileable value noise on an n x n lattice, sampled at (x, y) in [0, 1). */
function makeNoise(seed: number, n: number): (x: number, y: number) => number {
  const r = rng(seed);
  const g = new Float32Array(n * n);
  for (let i = 0; i < g.length; i++) g[i] = r();
  const at = (i: number, j: number): number => g[((j % n) + n) % n * n + (((i % n) + n) % n)];
  return (x: number, y: number) => {
    const fx = x * n;
    const fy = y * n;
    const i = Math.floor(fx);
    const j = Math.floor(fy);
    const u = fx - i;
    const v = fy - j;
    const su = u * u * (3 - 2 * u);
    const sv = v * v * (3 - 2 * v);
    const a = at(i, j) + (at(i + 1, j) - at(i, j)) * su;
    const b = at(i, j + 1) + (at(i + 1, j + 1) - at(i, j + 1)) * su;
    return a + (b - a) * sv;
  };
}

function fbm(seed: number, octaves: number, base: number): (x: number, y: number) => number {
  const layers = Array.from({ length: octaves }, (_, k) => makeNoise(seed + k * 101, base << k));
  return (x, y) => {
    let s = 0;
    let amp = 0.5;
    let norm = 0;
    for (const l of layers) {
      s += l(x, y) * amp;
      norm += amp;
      amp *= 0.5;
    }
    return s / norm;
  };
}

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d') as CanvasRenderingContext2D];
}

/** Build a tangent-space normal map from a height field (0..1), tileable. */
function normalFromHeight(hf: Float32Array, w: number, h: number, strength: number): HTMLCanvasElement {
  const [c, ctx] = canvas(w, h);
  const img = ctx.createImageData(w, h);
  const H = (x: number, y: number): number => hf[((y + h) % h) * w + ((x + w) % w)];
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const dx = (H(x + 1, y) - H(x - 1, y)) * strength;
      const dy = (H(x, y + 1) - H(x, y - 1)) * strength;
      const l = Math.hypot(dx, dy, 1);
      const i = (y * w + x) * 4;
      img.data[i] = ((-dx / l) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((dy / l) * 0.5 + 0.5) * 255;
      img.data[i + 2] = ((1 / l) * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  return c;
}

function greyCanvas(hf: Float32Array, w: number, h: number, map: (v: number) => number): HTMLCanvasElement {
  const [c, ctx] = canvas(w, h);
  const img = ctx.createImageData(w, h);
  for (let i = 0; i < w * h; i++) {
    const v = Math.max(0, Math.min(255, map(hf[i]) * 255));
    img.data[i * 4] = v;
    img.data[i * 4 + 1] = v;
    img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

function tex(c: HTMLCanvasElement, srgb: boolean, aniso: number): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = aniso;
  t.generateMipmaps = true;
  t.needsUpdate = true;
  return t;
}

export interface PBRSet {
  map: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
}

export interface TextureBank {
  plaster: PBRSet;
  stone: PBRSet;
  wood: PBRSet;
  brassRough: THREE.CanvasTexture;
  poche: THREE.CanvasTexture;
  paper: THREE.CanvasTexture;
  fabric: PBRSet;
  dot: THREE.CanvasTexture;
  glint: THREE.CanvasTexture;
  blob: THREE.CanvasTexture;
  ring: THREE.CanvasTexture;
  walk: THREE.CanvasTexture;
  cross: THREE.CanvasTexture;
  grid: THREE.CanvasTexture;
  glyphs: Record<string, THREE.CanvasTexture>;
  all: THREE.Texture[];
}

function plaster(size: number, aniso: number): PBRSet {
  const n = fbm(11, 5, 4);
  const fine = fbm(23, 3, 64);
  const stain = fbm(37, 3, 2);
  const hf = new Float32Array(size * size);
  const [c, ctx] = canvas(size, size);
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const m = n(u, v);
      const f = fine(u, v);
      const s = stain(u, v);
      const h = m * 0.6 + f * 0.4;
      hf[y * size + x] = h;
      const tone = 0.74 + (m - 0.5) * 0.16 + (f - 0.5) * 0.06 - Math.max(0, s - 0.62) * 0.5;
      const i = (y * size + x) * 4;
      // bone-to-tan adobe paper (19_mystical-western bone #F1EDE7 / tan #D3B9B7)
      const eng = (y % 9 === 0 ? 0.94 : 1);
      img.data[i] = 226 * tone * eng;
      img.data[i + 1] = 212 * tone * eng;
      img.data[i + 2] = 206 * tone * eng;
      img.data[i + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  // hairline cracks
  const r = rng(5);
  ctx.strokeStyle = 'rgba(114, 21, 29,0.3)';
  ctx.lineWidth = 0.8;
  for (let k = 0; k < 5; k++) {
    let x = r() * size;
    let y = r() * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    let a = r() * Math.PI * 2;
    for (let s = 0; s < 18; s++) {
      a += (r() - 0.5) * 1.1;
      x += Math.cos(a) * 6;
      y += Math.sin(a) * 6;
      ctx.lineTo(x, y);
      const ix = Math.floor(((x % size) + size) % size);
      const iy = Math.floor(((y % size) + size) % size);
      hf[iy * size + ix] -= 0.25;
    }
    ctx.stroke();
  }
  return {
    map: tex(c, true, aniso),
    normalMap: tex(normalFromHeight(hf, size, size, 2.2), false, aniso),
    roughnessMap: tex(greyCanvas(hf, size, size, (h) => 0.82 + (0.5 - h) * 0.2), false, aniso),
  };
}

/** Worn flagstones: the texture spans two cells, so it holds 2 x 2 stones. */
function stone(size: number, aniso: number): PBRSet {
  const n = fbm(41, 5, 4);
  const fine = fbm(53, 3, 48);
  const r = rng(77);
  const tones = [0, 1, 2, 3].map(() => 0.82 + r() * 0.22);
  const hues = [0, 1, 2, 3].map(() => r() * 0.06 - 0.03);
  const hf = new Float32Array(size * size);
  const rough = new Float32Array(size * size);
  const [c, ctx] = canvas(size, size);
  const img = ctx.createImageData(size, size);
  const half = size / 2;
  const grout = size * 0.018;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const tx = x < half ? 0 : 1;
      const ty = y < half ? 0 : 1;
      const lx = x - tx * half;
      const ly = y - ty * half;
      const edge = Math.min(lx, ly, half - lx, half - ly);
      const wob = (n(u * 2, v * 2) - 0.5) * size * 0.012;
      const e = edge + wob;
      const isGrout = e < grout;
      const bevel = Math.min(1, Math.max(0, (e - grout) / (size * 0.03)));
      const m = n(u, v);
      const f = fine(u, v);
      const wear = Math.max(0, 1 - Math.hypot(lx - half / 2, ly - half / 2) / (half * 0.55));
      const t = tones[ty * 2 + tx];
      let tone = isGrout ? 0.42 : t * (0.78 + (m - 0.5) * 0.35 + (f - 0.5) * 0.12) * (0.82 + 0.18 * bevel) + wear * 0.05;
      tone = Math.max(0, tone);
      const i = (y * size + x) * 4;
      const hue = hues[ty * 2 + tx];
      // saddle-and-tan flagstones
      img.data[i] = 176 * tone * (1 + hue);
      img.data[i + 1] = 140 * tone;
      img.data[i + 2] = 139 * tone * (1 - hue);
      img.data[i + 3] = 255;
      hf[y * size + x] = isGrout ? 0 : 0.55 * bevel + (m - 0.5) * 0.25 + (f - 0.5) * 0.1;
      rough[y * size + x] = isGrout ? 1 : 0.86 - wear * 0.3 + (f - 0.5) * 0.1;
    }
  ctx.putImageData(img, 0, 0);
  // chips and scuffs
  for (let k = 0; k < 40; k++) {
    ctx.fillStyle = `rgba(${r() < 0.5 ? '45,10,13' : '211,185,183'},${0.08 + r() * 0.12})`;
    ctx.beginPath();
    ctx.arc(r() * size, r() * size, 1 + r() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  return {
    map: tex(c, true, aniso),
    normalMap: tex(normalFromHeight(hf, size, size, 3.2), false, aniso),
    roughnessMap: tex(greyCanvas(rough, size, size, (v) => v), false, aniso),
  };
}

function wood(size: number, aniso: number): PBRSet {
  const n = fbm(91, 4, 3);
  const hf = new Float32Array(size * size);
  const [c, ctx] = canvas(size, size);
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const warp = n(u, v * 0.25) * 6;
      const ring = 0.5 + 0.5 * Math.sin((u * 26 + warp) * Math.PI);
      const fine = 0.5 + 0.5 * Math.sin((u * 140 + warp * 4) * Math.PI);
      const g = ring * 0.6 + fine * 0.4;
      hf[y * size + x] = g * 0.4;
      const i = (y * size + x) * 4;
      const t = 0.55 + g * 0.45;
      img.data[i] = 96 * t;
      img.data[i + 1] = 30 * t;
      img.data[i + 2] = 34 * t;
      img.data[i + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  return {
    map: tex(c, true, aniso),
    normalMap: tex(normalFromHeight(hf, size, size, 0.8), false, aniso),
    roughnessMap: tex(greyCanvas(hf, size, size, (h) => 0.38 + h * 0.3), false, aniso),
  };
}

function fabric(size: number, aniso: number): PBRSet {
  const n = fbm(131, 3, 8);
  const hf = new Float32Array(size * size);
  const [c, ctx] = canvas(size, size);
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const weave = (Math.sin(x * 1.6) * Math.sin(y * 1.6) + 1) * 0.5;
      const m = n(x / size, y / size);
      hf[y * size + x] = weave * 0.5 + m * 0.5;
      const t = 0.8 + weave * 0.12 + (m - 0.5) * 0.25;
      const i = (y * size + x) * 4;
      img.data[i] = 236 * t;
      img.data[i + 1] = 230 * t;
      img.data[i + 2] = 222 * t;
      img.data[i + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  return {
    map: tex(c, true, aniso),
    normalMap: tex(normalFromHeight(hf, size, size, 1.4), false, aniso),
    roughnessMap: tex(greyCanvas(hf, size, size, () => 0.95), false, aniso),
  };
}

function brassRough(size: number, aniso: number): THREE.CanvasTexture {
  const n = fbm(171, 4, 4);
  const hf = new Float32Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) hf[y * size + x] = n(x / size, y / size);
  return tex(greyCanvas(hf, size, size, (v) => 0.25 + Math.max(0, v - 0.45) * 0.9), false, aniso);
}

function poche(size: number, aniso: number): THREE.CanvasTexture {
  const [c, ctx] = canvas(size, size);
  ctx.fillStyle = PALETTE.umber;
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(171, 11, 26,0.55)';
  ctx.lineWidth = size / 128;
  const step = size / 8;
  for (let k = -8; k <= 16; k++) {
    ctx.beginPath();
    ctx.moveTo(k * step, 0);
    ctx.lineTo(k * step + size, size);
    ctx.stroke();
  }
  return tex(c, true, aniso);
}

function paper(): THREE.CanvasTexture {
  const [c, ctx] = canvas(256, 256);
  ctx.fillStyle = PALETTE.bone;
  ctx.fillRect(0, 0, 256, 256);
  const r = rng(201);
  for (let k = 0; k < 900; k++) {
    ctx.fillStyle = `rgba(175,125,126,${r() * 0.06})`;
    ctx.fillRect(r() * 256, r() * 256, 2, 2);
  }
  ctx.strokeStyle = 'rgba(175, 125, 126,0.75)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  for (let line = 0; line < 6; line++) {
    const y = 40 + line * 32;
    ctx.beginPath();
    let x = 28;
    ctx.moveTo(x, y);
    const end = 200 + r() * 30 - (line === 5 ? 90 : 0);
    while (x < end) {
      x += 6 + r() * 6;
      ctx.lineTo(x, y + (r() - 0.5) * 8);
    }
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(36, 8, 11,0.35)';
  ctx.lineWidth = 1;
  ctx.strokeRect(10, 10, 236, 236);
  return tex(c, true, 4);
}

function radial(stops: [number, string][], size = 128): THREE.CanvasTexture {
  const [c, ctx] = canvas(size, size);
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [o, col] of stops) g.addColorStop(o, col);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function glint(): THREE.CanvasTexture {
  const [c, ctx] = canvas(128, 128);
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.15, 'rgba(250, 249, 247,0.6)');
  g.addColorStop(1, 'rgba(250, 249, 247,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  ctx.globalCompositeOperation = 'lighter';
  for (const [w, h] of [
    [128, 3],
    [3, 128],
  ]) {
    const lg = ctx.createLinearGradient(64 - w / 2, 64 - h / 2, 64 + w / 2, 64 + h / 2);
    lg.addColorStop(0, 'rgba(255,255,255,0)');
    lg.addColorStop(0.5, 'rgba(255,255,255,0.9)');
    lg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = lg;
    ctx.fillRect(64 - w / 2, 64 - h / 2, w, h);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function ringTex(): THREE.CanvasTexture {
  const [c, ctx] = canvas(256, 256);
  ctx.strokeStyle = 'rgba(255,255,255,1)';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(128, 128, 104, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 12]);
  ctx.beginPath();
  ctx.arc(128, 128, 88, 0, Math.PI * 2);
  ctx.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Valid-move floor highlight: a soft lit square with a diamond. White; tinted by material colour. */
function walkTex(): THREE.CanvasTexture {
  const [c, ctx] = canvas(256, 256);
  const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 150);
  g.addColorStop(0, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(14, 14, 228, 228);
  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  ctx.lineWidth = 3;
  ctx.strokeRect(22, 22, 212, 212);
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(128, 70);
  ctx.lineTo(186, 128);
  ctx.lineTo(128, 186);
  ctx.lineTo(70, 128);
  ctx.closePath();
  ctx.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function crossTex(): THREE.CanvasTexture {
  const [c, ctx] = canvas(128, 128);
  ctx.strokeStyle = 'rgba(255,255,255,1)';
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(36, 36);
  ctx.lineTo(92, 92);
  ctx.moveTo(92, 36);
  ctx.lineTo(36, 92);
  ctx.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** The House floats over its own plan: a faint drafting grid far below. */
function gridTex(aniso: number): THREE.CanvasTexture {
  const [c, ctx] = canvas(512, 512);
  ctx.fillStyle = PALETTE.night;
  ctx.fillRect(0, 0, 512, 512);
  starfield(ctx, 0, 0, 512, 512, { seed: 5, count: 16, color: PALETTE.tan, max: 1.2, alpha: 0.25 });
  ctx.strokeStyle = 'rgba(211, 185, 183,0.09)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 512; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i + 0.5, 0);
    ctx.lineTo(i + 0.5, 512);
    ctx.moveTo(0, i + 0.5);
    ctx.lineTo(512, i + 0.5);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(171, 11, 26,0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 510, 510);
  return tex(c, true, aniso);
}

/** Engraved fold glyph for lever plates. */
function glyphTex(kind: string): THREE.CanvasTexture {
  const [c, ctx] = canvas(128, 128);
  ctx.fillStyle = PALETTE.umber;
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = PALETTE.rose;
  ctx.fillStyle = PALETTE.rose;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.beginPath();
  if (kind === 'rollL' || kind === 'rollR') {
    const cw = kind === 'rollR';
    ctx.arc(64, 64, 34, cw ? Math.PI * 0.85 : Math.PI * 0.15, cw ? Math.PI * 2.4 : -Math.PI * 1.4, !cw);
    ctx.stroke();
    const a = cw ? Math.PI * 2.4 : -Math.PI * 1.4;
    const hx = 64 + Math.cos(a) * 34;
    const hy = 64 + Math.sin(a) * 34;
    ctx.beginPath();
    ctx.arc(hx, hy, 12, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const up = kind === 'pitchB';
    ctx.moveTo(64, up ? 104 : 24);
    ctx.lineTo(64, up ? 30 : 98);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(40, up ? 50 : 78);
    ctx.lineTo(64, up ? 22 : 106);
    ctx.lineTo(88, up ? 50 : 78);
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * The night behind the House: a quiet starfield, a carved moon and a low mesa horizon with
 * one observatory and two saguaros. Drawn for the viewport's aspect so the moon stays round.
 */
export function backdropTexture(w: number, h: number): THREE.CanvasTexture {
  const H = 720;
  const W = Math.max(360, Math.min(2400, Math.round((H * w) / Math.max(1, h))));
  const [c, ctx] = canvas(W, H);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, PALETTE.ink);
  g.addColorStop(0.45, PALETTE.night);
  g.addColorStop(1, PALETTE.dusk);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  starfield(ctx, 0, 0, W, H * 0.8, { seed: 19, count: Math.round(W / 9), color: PALETTE.bone, max: 1.3, alpha: 0.32 });
  const mx = W * 0.6;
  const my = H * 0.11;
  constellation(ctx, [[W * 0.06, H * 0.14], [W * 0.13, H * 0.08], [W * 0.2, H * 0.17], [W * 0.27, H * 0.11]], { color: PALETTE.ember, node: PALETTE.tan, alpha: 0.45, nodeR: 1.8 });
  disc(ctx, mx, my, H * 0.06, { face: PALETTE.bone, ink: PALETTE.wine, rim: PALETTE.ember, phase: 0, shadow: PALETTE.night, glow: 0.12 });
  const base = H * 0.97;
  mesa(ctx, 0, W, base, { seed: 7, height: H * 0.16, fill: PALETTE.mesa, strata: PALETTE.ember, plateaus: Math.max(3, Math.round(W / 420)), strataAlpha: 0.3, bottom: H });
  mesa(ctx, -W * 0.05, W * 1.05, H, { seed: 12, height: H * 0.07, fill: PALETTE.umber, strata: PALETTE.wine, plateaus: Math.max(2, Math.round(W / 600)), strataAlpha: 0.35, bottom: H });
  observatory(ctx, W * 0.72, H - H * 0.055, 22, { fill: PALETTE.umber, slit: PALETTE.rose });
  cactus(ctx, W * 0.09, H - H * 0.03, 40, { fill: PALETTE.umber, seed: 3 });
  cactus(ctx, W * 0.93, H - H * 0.02, 30, { fill: PALETTE.umber, seed: 8, arms: [0.5] });
  grain(ctx, 0, 0, W, H, { seed: 4, density: 0.5, alpha: 0.05 });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** A stamped five-point star, for margin notes. */
export function starShape(r: number, inner = 0.45): THREE.Shape {
  const s = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? r : r * inner;
    const a = Math.PI / 2 + (i * Math.PI) / 5;
    if (i === 0) s.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
    else s.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  s.closePath();
  return s;
}

export function buildTextures(quality: 'low' | 'medium' | 'high', maxAniso: number): TextureBank {
  const size = quality === 'low' ? 256 : 512;
  const aniso = Math.min(maxAniso, quality === 'high' ? 8 : 4);
  const bank: TextureBank = {
    plaster: plaster(size, aniso),
    stone: stone(size, aniso),
    wood: wood(256, aniso),
    fabric: fabric(128, aniso),
    brassRough: brassRough(128, aniso),
    poche: poche(256, aniso),
    paper: paper(),
    dot: radial([
      [0, 'rgba(255,255,255,1)'],
      [0.4, 'rgba(255,255,255,0.35)'],
      [1, 'rgba(255,255,255,0)'],
    ], 64),
    glint: glint(),
    blob: radial([
      [0, 'rgba(3, 3, 3,0.75)'],
      [0.55, 'rgba(3, 3, 3,0.35)'],
      [1, 'rgba(3, 3, 3,0)'],
    ]),
    ring: ringTex(),
    walk: walkTex(),
    cross: crossTex(),
    grid: gridTex(aniso),
    glyphs: { rollL: glyphTex('rollL'), rollR: glyphTex('rollR'), pitchA: glyphTex('pitchA'), pitchB: glyphTex('pitchB') },
    all: [],
  };
  const all: THREE.Texture[] = [];
  for (const v of Object.values(bank)) {
    if (v instanceof THREE.Texture) all.push(v);
    else if (v && typeof v === 'object' && !Array.isArray(v)) for (const t of Object.values(v)) if (t instanceof THREE.Texture) all.push(t);
  }
  bank.all = all;
  return bank;
}
