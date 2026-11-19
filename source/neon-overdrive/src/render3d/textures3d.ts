import * as THREE from 'three';
import type { Palette } from '../state/types';
import { FONT_SLAB, FONT_TITLE, PALETTE, grain, mesa, observatory, stampBorder } from '../theme';

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
      const p = Math.min(1, puddle) * 0.3; // dry desert road: only faint oil sheen
      const lum = Math.round(v * 255 * (1 - p * 0.35));
      img.data[i * 4] = lum + 4;
      img.data[i * 4 + 1] = lum + 1;
      img.data[i * 4 + 2] = lum;
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
    g.strokeStyle = 'rgba(6, 3, 4,0.85)';
    rg.strokeStyle = 'rgba(20, 6, 7,1)';
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
    g.fillStyle = hc ? '#ffffff' : 'rgba(243, 240, 235,0.92)';
    g.fillRect(x0, y0, w, h);
    rg.fillStyle = '#dac5c2';
    rg.fillRect(x0, y0, w, h);
    // wear
    for (let k = 0; k < (w * h) / 30; k++) {
      g.fillStyle = 'rgba(16, 5, 6,0.5)';
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
    img.data[i * 4] = l + 4;
    img.data[i * 4 + 1] = l + 1;
    img.data[i * 4 + 2] = l;
    img.data[i * 4 + 3] = 255;
    const rv = Math.round((0.78 + (n1[i] - 0.5) * 0.2) * 255);
    rimg.data[i * 4] = rimg.data[i * 4 + 1] = rimg.data[i * 4 + 2] = rv;
    rimg.data[i * 4 + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  rg.putImageData(rimg, 0, 0);
  // expansion joints
  g.fillStyle = 'rgba(3, 3, 3,0.5)';
  g.fillRect(0, 0, 2, H);
  return { map: tex(c, true, true), rough: tex(rc, false, true) };
}

/**
 * Lit/unlit state and colour of every window, looked up by the building shader.
 * Alpha = lit amount. Nearest filtering keeps each window a single colour.
 * Lantern-lit adobe: blush and bone lamps, a rare rose sign glow, never a cold window.
 */
export function windowLookup(seed: number, pal: Palette): THREE.CanvasTexture {
  const S = 128;
  const r = rng(seed * 7 + 3);
  const [c, g] = canvas(S, S);
  const img = g.createImageData(S, S);
  const accents = pal.signs.map((h) => new THREE.Color(h));
  const lantern = [new THREE.Color(PALETTE.blush), new THREE.Color(PALETTE.bone), new THREE.Color(PALETTE.tan)];
  for (let y = 0; y < S; y++) {
    // whole floors go dark or lit together sometimes
    const floorBias = r() < 0.18 ? -0.3 : r() < 0.12 ? 0.3 : 0;
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4;
      const lit = r() < 0.22 + floorBias;
      const q = r();
      const col = q < 0.03 ? accents[Math.floor(r() * accents.length)] : lantern[q < 0.55 ? 0 : q < 0.8 ? 1 : 2];
      img.data[i] = Math.round(col.r * 255);
      img.data[i + 1] = Math.round(col.g * 255);
      img.data[i + 2] = Math.round(col.b * 255);
      img.data[i + 3] = lit ? Math.round((0.3 + r() * 0.5) * 255) : Math.round(r() * 10);
    }
  }
  g.putImageData(img, 0, 0);
  const t = tex(c, true, true);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  return t;
}

/**
 * The horizon band. Far: engraved mesas and buttes. Near: a low adobe town with lantern
 * windows, a water tower and one observatory dome. Transparent above the skyline.
 */
export function skylineStrip(seed: number, pal: Palette, far: boolean): THREE.CanvasTexture {
  const W = 2048;
  const H = 256;
  const r = rng(seed + (far ? 91 : 17));
  const [c, g] = canvas(W, H);
  const base = new THREE.Color(pal.skyline);
  const bodyCol = far ? base.clone().lerp(new THREE.Color(pal.fog), 0.5) : base.clone().multiplyScalar(0.7);
  const body = `#${bodyCol.getHexString()}`;
  if (far) {
    // a low mesa horizon: plateaus with horizontal strata, joined into one tiling band
    mesa(g, 0, W, H, { seed: seed * 3 + 1, height: H * 0.62, fill: body, strata: PALETTE.ember, plateaus: 5, strataAlpha: 0.22 });
    g.fillStyle = body;
    g.fillRect(0, H * 0.78, W, H * 0.22);
  } else {
    let x = 0;
    let dome = Math.floor(W * (0.3 + r() * 0.4));
    while (x < W) {
      const w = 26 + r() * 60;
      const h = H * (0.12 + r() * 0.22);
      g.fillStyle = body;
      g.fillRect(x, H - h, w, h);
      // stepped parapet and a few vigas
      if (r() < 0.5) g.fillRect(x + w * 0.2, H - h - 6, w * 0.6, 6);
      for (let k = 0; k < 3; k++) if (r() < 0.4) g.fillRect(x + 4 + r() * (w - 8), H - h + 4, 3, 2);
      const cols = Math.floor(w / 9);
      for (let xx = 0; xx < cols; xx++) {
        if (r() > 0.28) continue;
        g.fillStyle = r() < 0.75 ? 'rgba(238, 185, 185, 0.62)' : 'rgba(241, 237, 231, 0.55)';
        g.fillRect(x + 4 + xx * 9, H - h * (0.4 + r() * 0.3), 3, 4);
      }
      if (x <= dome && dome < x + w + 6) {
        observatory(g, x + w / 2, H - h, 34, { fill: body, slit: PALETTE.rose, telescopeAngle: -0.8 });
        dome = -1;
      } else if (r() < 0.06) {
        // water tower on stilts
        g.fillStyle = body;
        g.fillRect(x + w / 2 - 12, H - h - 40, 24, 16);
        g.fillRect(x + w / 2 - 10, H - h - 24, 2, 24);
        g.fillRect(x + w / 2 + 8, H - h - 24, 2, 24);
      }
      x += w + (r() < 0.25 ? r() * 30 : 0);
    }
  }
  const t = tex(c, true);
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

const WORDS = ['MOTEL', 'DINER', 'DEPOT', 'OASIS', 'ASSAY', 'LIVERY', 'SALOON', 'STAR', 'COMET', 'ORBIT', 'MESA', 'FUEL'];

/** Stamped leather signboards along the road. Used as an unlit colour map. */
export function signTexture(seed: number, color: string): THREE.CanvasTexture {
  const W = 512;
  const H = 256;
  const r = rng(seed);
  const [c, g] = canvas(W, H);
  g.fillStyle = PALETTE.umber;
  g.fillRect(0, 0, W, H);
  grain(g, 0, 0, W, H, { seed, density: 2.2, colors: [PALETTE.tan, PALETTE.ember], alpha: 0.12 });
  stampBorder(g, 8, 8, W - 16, H - 16, { color, stitch: PALETTE.tan, radius: 14, inset: 10, corner: 8, stitchAlpha: 0.55 });
  const word = WORDS[Math.floor(r() * WORDS.length)];
  g.fillStyle = color;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = `${H * 0.36}px ${FONT_TITLE}`;
  g.fillText(word, W / 2, H * 0.45);
  g.fillStyle = PALETTE.tan;
  g.font = `600 ${H * 0.1}px ${FONT_SLAB}`;
  g.fillText(['Open all night', 'Rooms by the moon', 'Water and fuel', 'Last stop west', 'Mesa line'][Math.floor(r() * 5)], W / 2, H * 0.76);
  return tex(c, true);
}

/** Red/black hatch for the sealed Spine field and the HUD sealed state. */
export function hazardTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(128, 128);
  g.fillStyle = '#060304';
  g.fillRect(0, 0, 128, 128);
  g.fillStyle = '#c40618';
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
      g.fillStyle = (i + j) % 2 ? '#080404' : '#fbfaf9';
      g.fillRect(i * 16, j * 16, 16, 16);
    }
  }
  return tex(c, true);
}

export function bannerTexture(text: string, color: string): THREE.CanvasTexture {
  const [c, g] = canvas(1024, 96);
  g.fillStyle = PALETTE.umber;
  g.fillRect(0, 0, 1024, 96);
  g.fillStyle = color;
  g.fillRect(0, 0, 1024, 6);
  g.fillRect(0, 90, 1024, 6);
  g.strokeStyle = PALETTE.tan;
  g.globalAlpha = 0.5;
  g.setLineDash([6, 7]);
  g.lineWidth = 2;
  g.strokeRect(10, 12, 1004, 72);
  g.setLineDash([]);
  g.globalAlpha = 1;
  g.fillStyle = PALETTE.bone;
  g.font = `600 58px ${FONT_SLAB}`;
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
