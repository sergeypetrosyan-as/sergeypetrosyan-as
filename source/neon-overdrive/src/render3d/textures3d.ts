import * as THREE from 'three';
import type { Palette } from '../state/types';

export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  if (!g) throw new Error('2D canvas unavailable for texture generation');
  return [c, g];
}

function tex(c: HTMLCanvasElement, srgb: boolean, repeat = false): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.needsUpdate = true;
  return t;
}

/** Value noise on a tiling grid, used for asphalt height, puddles and grime. */
function tileNoise(w: number, h: number, cell: number, r: () => number): Float32Array {
  const gw = Math.ceil(w / cell);
  const gh = Math.ceil(h / cell);
  const grid = new Float32Array(gw * gh).map(() => r());
  const out = new Float32Array(w * h);
  const sm = (t: number) => t * t * (3 - 2 * t);
  for (let y = 0; y < h; y++) {
    const gy = y / cell;
    const y0 = Math.floor(gy);
    const ty = sm(gy - y0);
    for (let x = 0; x < w; x++) {
      const gx = x / cell;
      const x0 = Math.floor(gx);
      const tx = sm(gx - x0);
      const a = grid[(y0 % gh) * gw + (x0 % gw)];
      const b = grid[(y0 % gh) * gw + ((x0 + 1) % gw)];
      const c = grid[((y0 + 1) % gh) * gw + (x0 % gw)];
      const d = grid[((y0 + 1) % gh) * gw + ((x0 + 1) % gw)];
      out[y * w + x] = (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
    }
  }
  return out;
}

export interface RoadMaps {
  map: THREE.CanvasTexture;
  rough: THREE.CanvasTexture;
  normal: THREE.CanvasTexture;
}

/**
 * Asphalt for the full road width (u: x = -1..1) and 16 m of length (v).
 * `spine` leaves out the centre dash, which the Spine channel replaces.
 */
export function roadMaps(seed: number, spine: boolean, hc: boolean): RoadMaps {
  const W = 512;
  const H = 1024;
  const r = rng(seed);
  const fine = tileNoise(W, H, 4, r);
  const mid = tileNoise(W, H, 32, r);
  const big = tileNoise(W, H, 128, r);
  const [c, g] = canvas(W, H);
  const [rc, rg] = canvas(W, H);
  const img = g.createImageData(W, H);
  const rimg = rg.createImageData(W, H);
  const heightF = new Float32Array(W * H);
  const laneC = [-0.75, -0.25, 0.25, 0.75];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const u = (x / W) * 2 - 1;
      // polished tyre lanes are slightly darker and smoother
      let worn = 0;
      for (const lc of laneC) {
        const d = Math.abs(u - lc);
        worn = Math.max(worn, Math.max(0, 1 - Math.abs(d - 0.07) / 0.05));
      }
      const speck = fine[i] > 0.82 ? 0.1 : fine[i] < 0.12 ? -0.06 : 0;
      let v = 0.105 + (mid[i] - 0.5) * 0.04 + speck - worn * 0.02 + (big[i] - 0.5) * 0.03;
      v = Math.max(0.02, v);
      const puddle = Math.max(0, (big[i] * 0.7 + mid[i] * 0.3 - 0.56) * 6);
      const p = Math.min(1, puddle);
      const lum = Math.round(v * 255 * (1 - p * 0.35));
      img.data[i * 4] = lum;
      img.data[i * 4 + 1] = lum + 1;
      img.data[i * 4 + 2] = lum + 4;
      img.data[i * 4 + 3] = 255;
      // roughness: dry asphalt 0.62, worn lanes 0.45, puddles 0.1
      const rough = 0.62 - worn * 0.17 - p * 0.42 + (fine[i] - 0.5) * 0.12;
      const rv = Math.round(Math.max(0.06, Math.min(1, rough)) * 255);
      rimg.data[i * 4] = rv;
      rimg.data[i * 4 + 1] = rv;
      rimg.data[i * 4 + 2] = rv;
      rimg.data[i * 4 + 3] = 255;
      heightF[i] = fine[i] * 0.6 + mid[i] * 0.4 - p * 0.5;
    }
  }
  g.putImageData(img, 0, 0);
  rg.putImageData(rimg, 0, 0);
  // tar seams (dark, glossy cracks)
  for (let k = 0; k < 7; k++) {
    let x = r() * W;
    let y = r() * H;
    g.strokeStyle = 'rgba(6,7,9,0.85)';
    rg.strokeStyle = 'rgba(40,40,40,1)';
    g.lineWidth = rg.lineWidth = 1.5 + r() * 2;
    g.beginPath();
    rg.beginPath();
    g.moveTo(x, y);
    rg.moveTo(x, y);
    for (let s = 0; s < 14; s++) {
      x += (r() - 0.5) * 40;
      y += 10 + r() * 30;
      g.lineTo(x, y);
      rg.lineTo(x, y);
    }
    g.stroke();
    rg.stroke();
  }
  // markings: worn white paint, rougher than asphalt
  const paint = (x0: number, y0: number, w: number, h: number): void => {
    g.fillStyle = hc ? '#ffffff' : 'rgba(214,220,222,0.92)';
    g.fillRect(x0, y0, w, h);
    rg.fillStyle = '#b4b4b4';
    rg.fillRect(x0, y0, w, h);
    // wear
    for (let k = 0; k < (w * h) / 30; k++) {
      g.fillStyle = 'rgba(30,32,36,0.5)';
      g.fillRect(x0 + r() * w, y0 + r() * h, 1 + r() * 2, 1 + r() * 2);
    }
  };
  const ux = (u: number) => ((u + 1) / 2) * W;
  const lw = hc ? 9 : 6;
  for (const u of [-0.5, 0, 0.5]) {
    if (spine && u === 0) continue;
    // 4 m dash, 4 m gap over a 16 m tile
    for (const y0 of [0, H / 2]) paint(ux(u) - lw / 2, y0 + 20, lw, H / 4);
  }
  for (const u of [-0.955, 0.955]) paint(ux(u) - lw / 2 - 1, 0, lw + 2, H);
  // normal map from height
  const [nc, ng] = canvas(W, H);
  const nimg = ng.createImageData(W, H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const hx = heightF[y * W + ((x + 1) % W)] - heightF[y * W + ((x - 1 + W) % W)];
      const hy = heightF[((y + 1) % H) * W + x] - heightF[((y - 1 + H) % H) * W + x];
      const s = 2.2;
      let nx = -hx * s;
      let ny = -hy * s;
      const nz = 1;
      const l = Math.hypot(nx, ny, nz);
      nx /= l;
      ny /= l;
      nimg.data[i * 4] = Math.round((nx * 0.5 + 0.5) * 255);
      nimg.data[i * 4 + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      nimg.data[i * 4 + 2] = Math.round((nz / l) * 0.5 * 255 + 127);
      nimg.data[i * 4 + 3] = 255;
    }
  }
  ng.putImageData(nimg, 0, 0);
  return { map: tex(c, true, true), rough: tex(rc, false, true), normal: tex(nc, false, true) };
}

/** Rough concrete for barriers, kerbs, pillars and the tunnel. */
export function concreteMaps(seed: number): { map: THREE.CanvasTexture; rough: THREE.CanvasTexture } {
  const W = 256;
  const H = 256;
  const r = rng(seed);
  const n1 = tileNoise(W, H, 8, r);
  const n2 = tileNoise(W, H, 64, r);
  const [c, g] = canvas(W, H);
  const [rc, rg] = canvas(W, H);
  const img = g.createImageData(W, H);
  const rimg = rg.createImageData(W, H);
  for (let i = 0; i < W * H; i++) {
    const y = Math.floor(i / W);
    const streak = Math.max(0, n2[i] - 0.5) * 0.25 * (y / H);
    const v = 0.3 + (n1[i] - 0.5) * 0.08 + (n2[i] - 0.5) * 0.1 - streak;
    const l = Math.round(Math.max(0, v) * 255);
    img.data[i * 4] = l;
    img.data[i * 4 + 1] = l;
    img.data[i * 4 + 2] = l + 3;
    img.data[i * 4 + 3] = 255;
    const rv = Math.round((0.78 + (n1[i] - 0.5) * 0.2) * 255);
    rimg.data[i * 4] = rimg.data[i * 4 + 1] = rimg.data[i * 4 + 2] = rv;
    rimg.data[i * 4 + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  rg.putImageData(rimg, 0, 0);
  // expansion joints
  g.fillStyle = 'rgba(0,0,0,0.5)';
  g.fillRect(0, 0, 2, H);
  return { map: tex(c, true, true), rough: tex(rc, false, true) };
}

/**
 * Lit/unlit state and colour of every window, looked up by the building shader.
 * Alpha = lit amount. Nearest filtering keeps each window a single colour.
 */
export function windowLookup(seed: number, pal: Palette): THREE.CanvasTexture {
  const S = 128;
  const r = rng(seed * 7 + 3);
  const [c, g] = canvas(S, S);
  const img = g.createImageData(S, S);
  const accents = pal.signs.map((h) => new THREE.Color(h));
  for (let y = 0; y < S; y++) {
    // whole floors go dark or lit together sometimes, like real offices
    const floorBias = r() < 0.18 ? -0.3 : r() < 0.12 ? 0.35 : 0;
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4;
      const lit = r() < 0.27 + floorBias;
      const q = r();
      let cr = 255;
      let cg = 190;
      let cb = 120; // 2700 K
      if (q < 0.3) {
        cr = 205;
        cg = 222;
        cb = 255; // 5000 K
      } else if (q < 0.32) {
        const a = accents[Math.floor(r() * accents.length)];
        cr = Math.round(a.r * 255);
        cg = Math.round(a.g * 255);
        cb = Math.round(a.b * 255);
      } else if (q < 0.5) {
        cr = 255;
        cg = 214;
        cb = 160;
      }
      img.data[i] = cr;
      img.data[i + 1] = cg;
      img.data[i + 2] = cb;
      img.data[i + 3] = lit ? Math.round((0.3 + r() * 0.55) * 255) : Math.round(r() * 10);
    }
  }
  g.putImageData(img, 0, 0);
  const t = tex(c, true, true);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  return t;
}

/** A band of distant towers with lit windows; transparent above the roofline. */
export function skylineStrip(seed: number, pal: Palette, far: boolean): THREE.CanvasTexture {
  const W = 2048;
  const H = 256;
  const r = rng(seed + (far ? 91 : 17));
  const [c, g] = canvas(W, H);
  const base = new THREE.Color(pal.skyline);
  const bodyCol = far ? base.clone().lerp(new THREE.Color(pal.fog), 0.45) : base.clone().multiplyScalar(0.6);
  let x = 0;
  while (x < W) {
    const w = 18 + r() * (far ? 50 : 70);
    const h = H * (far ? 0.25 + r() * 0.45 : 0.3 + r() * 0.65);
    g.fillStyle = `#${bodyCol.getHexString()}`;
    g.fillRect(x, H - h, w, h);
    if (r() < 0.3) g.fillRect(x + w * 0.45, H - h - 14 - r() * 30, 2, 40);
    const cols = Math.floor(w / 5);
    const rows = Math.floor(h / 6);
    for (let yy = 1; yy < rows; yy++) {
      for (let xx = 0; xx < cols; xx++) {
        if (r() > (far ? 0.18 : 0.26)) continue;
        g.fillStyle = r() < 0.75 ? `rgba(255,205,150,${far ? 0.45 : 0.7})` : `rgba(200,225,255,${far ? 0.4 : 0.6})`;
        g.fillRect(x + 1 + xx * 5, H - h + yy * 6, 2, 2);
      }
    }
    x += w + (r() < 0.2 ? r() * 20 : 0);
  }
  const t = tex(c, true);
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

const WORDS = ['VOLT', 'HALO', 'NOVA', 'KAI', 'SPINE', 'DRIVE', 'AXIS', 'ZEN', 'LUMA', 'PRISM', 'ARC', 'ION'];

/** Neon billboard faces. Each is used as both colour and emissive map. */
export function signTexture(seed: number, color: string): THREE.CanvasTexture {
  const W = 512;
  const H = 256;
  const r = rng(seed);
  const [c, g] = canvas(W, H);
  g.fillStyle = '#05060a';
  g.fillRect(0, 0, W, H);
  // backlit panel with fine louvres
  const grd = g.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, 'rgba(255,255,255,0.05)');
  grd.addColorStop(1, 'rgba(255,255,255,0.0)');
  g.fillStyle = grd;
  g.fillRect(8, 8, W - 16, H - 16);
  g.strokeStyle = color;
  g.lineWidth = 6;
  g.strokeRect(14, 14, W - 28, H - 28);
  const word = WORDS[Math.floor(r() * WORDS.length)];
  g.fillStyle = color;
  g.font = `italic 700 ${H * 0.52}px "Barlow Condensed", "Arial Narrow", sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(word, W / 2, H * 0.46);
  g.fillStyle = 'rgba(255,255,255,0.85)';
  g.font = `500 ${H * 0.1}px "Barlow", sans-serif`;
  g.fillText(['Open all night', 'Auralis grid', 'Charge here', 'Level 9', 'Harbour line'][Math.floor(r() * 5)], W / 2, H * 0.8);
  // a few dead tubes make it look used
  g.fillStyle = 'rgba(0,0,0,0.55)';
  for (let k = 0; k < 3; k++) g.fillRect(r() * W, r() * H, 6 + r() * 20, 3);
  return tex(c, true);
}

/** Red/black hatch for the sealed Spine field and the HUD sealed state. */
export function hazardTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(128, 128);
  g.fillStyle = '#12020a';
  g.fillRect(0, 0, 128, 128);
  g.fillStyle = '#ff2e4a';
  for (let k = -128; k < 256; k += 32) {
    g.beginPath();
    g.moveTo(k, 128);
    g.lineTo(k + 16, 128);
    g.lineTo(k + 16 + 128, 0);
    g.lineTo(k + 128, 0);
    g.closePath();
    g.fill();
  }
  return tex(c, true, true);
}

/** Chevrons in the open Spine field. */
export function chevronTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(256, 128);
  g.clearRect(0, 0, 256, 128);
  g.strokeStyle = '#ffffff';
  g.lineWidth = 12;
  g.lineJoin = 'miter';
  for (const x of [70, 128, 186]) {
    g.beginPath();
    g.moveTo(x - 30, 100);
    g.lineTo(x, 40);
    g.lineTo(x + 30, 100);
    g.stroke();
  }
  return tex(c, true);
}

export function checkerTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(256, 32);
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 2; j++) {
      g.fillStyle = (i + j) % 2 ? '#0b0c10' : '#f2f4f5';
      g.fillRect(i * 16, j * 16, 16, 16);
    }
  }
  return tex(c, true);
}

export function bannerTexture(text: string, color: string): THREE.CanvasTexture {
  const [c, g] = canvas(1024, 96);
  g.fillStyle = '#07090d';
  g.fillRect(0, 0, 1024, 96);
  g.fillStyle = color;
  g.fillRect(0, 0, 1024, 6);
  g.fillRect(0, 90, 1024, 6);
  g.fillStyle = '#e8f0f2';
  g.font = 'italic 700 60px "Barlow Condensed", "Arial Narrow", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, 512, 50);
  return tex(c, true);
}

/** Soft round glow used for lamp halos, exhaust and the wet-road reflection streaks. */
export function glowTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(128, 128);
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.2, 'rgba(255,255,255,0.55)');
  grd.addColorStop(0.5, 'rgba(255,255,255,0.12)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  return tex(c, true);
}

/** Long soft streak: bright near the light, fading towards the viewer. */
export function streakTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(64, 256);
  for (let y = 0; y < 256; y++) {
    const t = y / 255;
    const a = Math.pow(1 - t, 1.6) * Math.min(1, t * 12);
    const grd = g.createLinearGradient(0, 0, 64, 0);
    grd.addColorStop(0, 'rgba(255,255,255,0)');
    grd.addColorStop(0.5, `rgba(255,255,255,${a})`);
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, y, 64, 1);
  }
  return tex(c, true);
}

export function smokeTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(64, 64);
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,0.8)');
  grd.addColorStop(0.6, 'rgba(255,255,255,0.25)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return tex(c, true);
}
