// Procedural canvas textures for the House: plaster, worn stone, lacquered wood, brass smudge,
// section poché, paper notes and small sprites. Generated once (seeded, deterministic) and shared.
import * as THREE from 'three';

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
      img.data[i] = 205 * tone;
      img.data[i + 1] = 203 * tone;
      img.data[i + 2] = 194 * tone;
      img.data[i + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  // hairline cracks
  const r = rng(5);
  ctx.strokeStyle = 'rgba(60,58,52,0.35)';
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
      img.data[i] = 138 * tone * (1 + hue);
      img.data[i + 1] = 134 * tone;
      img.data[i + 2] = 126 * tone * (1 - hue);
      img.data[i + 3] = 255;
      hf[y * size + x] = isGrout ? 0 : 0.55 * bevel + (m - 0.5) * 0.25 + (f - 0.5) * 0.1;
      rough[y * size + x] = isGrout ? 1 : 0.86 - wear * 0.3 + (f - 0.5) * 0.1;
    }
  ctx.putImageData(img, 0, 0);
  // chips and scuffs
  for (let k = 0; k < 40; k++) {
    ctx.fillStyle = `rgba(${r() < 0.5 ? '40,38,34' : '190,186,176'},${0.08 + r() * 0.12})`;
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
      img.data[i] = 62 * t;
      img.data[i + 1] = 36 * t;
      img.data[i + 2] = 24 * t;
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
      img.data[i] = 58 * t;
      img.data[i + 1] = 68 * t;
      img.data[i + 2] = 82 * t;
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
  ctx.fillStyle = '#3d4247';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(190,196,200,0.38)';
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
  ctx.fillStyle = '#e4e8e1';
  ctx.fillRect(0, 0, 256, 256);
  const r = rng(201);
  for (let k = 0; k < 900; k++) {
    ctx.fillStyle = `rgba(80,90,90,${r() * 0.05})`;
    ctx.fillRect(r() * 256, r() * 256, 2, 2);
  }
  ctx.strokeStyle = 'rgba(106,91,214,0.75)';
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
  ctx.strokeStyle = 'rgba(35,39,44,0.35)';
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
  g.addColorStop(0.15, 'rgba(255,240,210,0.6)');
  g.addColorStop(1, 'rgba(255,240,210,0)');
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
  ctx.fillStyle = '#0d1013';
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = 'rgba(127,216,255,0.10)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 512; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i + 0.5, 0);
    ctx.lineTo(i + 0.5, 512);
    ctx.moveTo(0, i + 0.5);
    ctx.lineTo(512, i + 0.5);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(127,216,255,0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 510, 510);
  return tex(c, true, aniso);
}

/** Engraved fold glyph for lever plates. */
function glyphTex(kind: string): THREE.CanvasTexture {
  const [c, ctx] = canvas(128, 128);
  ctx.fillStyle = '#2b2116';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#e9c77a';
  ctx.fillStyle = '#e9c77a';
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
      [0, 'rgba(0,0,0,0.75)'],
      [0.55, 'rgba(0,0,0,0.35)'],
      [1, 'rgba(0,0,0,0)'],
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
