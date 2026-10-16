// Procedural canvas textures: albedo, roughness and normal maps generated from height fields.
// Everything is drawn at runtime, so the game ships no image assets.
import * as THREE from 'three';
import type { World } from '../../sim/types.ts';
import { T_DOOR, T_LASER, T_LOCKER, T_SHADOW, T_TERMINAL, T_WALL } from '../../sim/types.ts';
import { kindAt } from '../../sim/grid.ts';

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

export function hash2(x: number, y: number, s = 0): number {
  let h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  if (!g) throw new Error('2D canvas unavailable');
  return [c, g];
}

/** Smooth value noise in 0..1, tiling over `period`. */
function valueNoise(x: number, y: number, period: number, seed: number): number {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const p = (a: number, b: number): number => hash2(((a % period) + period) % period, ((b % period) + period) % period, seed);
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = p(xi, yi), b = p(xi + 1, yi), c = p(xi, yi + 1), d = p(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function fbm(x: number, y: number, period: number, seed: number, oct = 4): number {
  let s = 0, amp = 0.5, f = 1, tot = 0;
  for (let i = 0; i < oct; i++) { s += amp * valueNoise(x * f, y * f, period * f, seed + i * 17); tot += amp; amp *= 0.5; f *= 2; }
  return s / tot;
}

/** Overlay grime: dark blotches with soft edges, alpha controlled. */
function grime(g: CanvasRenderingContext2D, w: number, h: number, scale: number, strength: number, seed: number): void {
  const res = 4;
  const iw = Math.ceil(w / res), ih = Math.ceil(h / res);
  const [c, gc] = canvas(iw, ih);
  const img = gc.createImageData(iw, ih);
  for (let y = 0; y < ih; y++) for (let x = 0; x < iw; x++) {
    const n = fbm((x * res) / scale, (y * res) / scale, 4096, seed, 5);
    const a = Math.max(0, (n - 0.45) * 2.2) * strength;
    const i = (y * iw + x) * 4;
    img.data[i] = 14; img.data[i + 1] = 12; img.data[i + 2] = 10; img.data[i + 3] = Math.min(255, a * 255);
  }
  gc.putImageData(img, 0, 0);
  g.imageSmoothingEnabled = true;
  g.drawImage(c, 0, 0, w, h);
}

/** Normal map from a greyscale height canvas (Sobel). */
export function normalFromHeight(src: HTMLCanvasElement, strength: number, outW = src.width, outH = src.height): HTMLCanvasElement {
  const [c, g] = canvas(outW, outH);
  g.drawImage(src, 0, 0, outW, outH);
  const data = g.getImageData(0, 0, outW, outH);
  const H = new Float32Array(outW * outH);
  for (let i = 0; i < H.length; i++) H[i] = data.data[i * 4] / 255;
  const at = (x: number, y: number): number => H[Math.min(outH - 1, Math.max(0, y)) * outW + Math.min(outW - 1, Math.max(0, x))];
  const out = g.createImageData(outW, outH);
  for (let y = 0; y < outH; y++) for (let x = 0; x < outW; x++) {
    const dx = (at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1) - at(x - 1, y - 1) - 2 * at(x - 1, y) - at(x - 1, y + 1)) * strength;
    const dy = (at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1) - at(x - 1, y - 1) - 2 * at(x, y - 1) - at(x + 1, y - 1)) * strength;
    const l = Math.hypot(dx, dy, 1);
    const i = (y * outW + x) * 4;
    out.data[i] = ((-dx / l) * 0.5 + 0.5) * 255;
    out.data[i + 1] = ((dy / l) * 0.5 + 0.5) * 255;
    out.data[i + 2] = (1 / l) * 255;
    out.data[i + 3] = 255;
  }
  g.putImageData(out, 0, 0);
  return c;
}

export function tex(c: HTMLCanvasElement, srgb: boolean, repeat = false): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = 4;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  t.needsUpdate = true;
  return t;
}

// ---- Floor ---------------------------------------------------------------------------------
function rubberTile(res: number, seed: number): { albedo: HTMLCanvasElement; height: HTMLCanvasElement } {
  const [a, g] = canvas(res, res);
  const [h, gh] = canvas(res, res);
  const r = rng(seed);
  const base = 40 + Math.floor(r() * 6);
  g.fillStyle = `rgb(${base},${base + 3},${base + 6})`;
  g.fillRect(0, 0, res, res);
  gh.fillStyle = '#7a7a7a';
  gh.fillRect(0, 0, res, res);
  // 2 x 2 rubber tiles per world tile, with seams
  const half = res / 2;
  for (let q = 0; q < 4; q++) {
    const ox = (q % 2) * half, oy = Math.floor(q / 2) * half;
    const sh = (r() - 0.5) * 6;
    g.fillStyle = `rgba(${base + sh},${base + 3 + sh},${base + 7 + sh},1)`;
    g.fillRect(ox + 1, oy + 1, half - 2, half - 2);
    const n = 4;
    for (let iy = 0; iy < n; iy++) for (let ix = 0; ix < n; ix++) {
      const cx = ox + (ix + 0.5) * (half / n), cy = oy + (iy + 0.5) * (half / n);
      const rad = half / n * 0.27;
      gh.fillStyle = '#c8c8c8';
      gh.beginPath(); gh.arc(cx, cy, rad, 0, Math.PI * 2); gh.fill();
      g.fillStyle = `rgba(${base + 10},${base + 13},${base + 16},0.9)`;
      g.beginPath(); g.arc(cx - rad * 0.2, cy - rad * 0.2, rad * 0.8, 0, Math.PI * 2); g.fill();
    }
  }
  g.fillStyle = 'rgba(8,9,10,0.9)';
  g.fillRect(0, 0, res, 1); g.fillRect(0, 0, 1, res); g.fillRect(0, half - 0.5, res, 1); g.fillRect(half - 0.5, 0, 1, res);
  gh.fillStyle = '#303030';
  gh.fillRect(0, 0, res, 1); gh.fillRect(0, 0, 1, res); gh.fillRect(0, half - 0.5, res, 1); gh.fillRect(half - 0.5, 0, 1, res);
  return { albedo: a, height: h };
}

function treadPlate(res: number, seed: number): { albedo: HTMLCanvasElement; height: HTMLCanvasElement } {
  const [a, g] = canvas(res, res);
  const [h, gh] = canvas(res, res);
  const r = rng(seed);
  const base = 50 + Math.floor(r() * 8);
  g.fillStyle = `rgb(${base},${base + 2},${base + 4})`;
  g.fillRect(0, 0, res, res);
  gh.fillStyle = '#707070';
  gh.fillRect(0, 0, res, res);
  const n = 6, cell = res / n;
  for (let iy = 0; iy < n; iy++) for (let ix = 0; ix < n; ix++) {
    const cx = (ix + 0.5) * cell, cy = (iy + 0.5) * cell;
    const ang = (ix + iy) % 2 ? Math.PI / 4 : -Math.PI / 4;
    for (const [G, col] of [[g, `rgba(${base + 26},${base + 28},${base + 30},1)`], [gh, '#d8d8d8']] as const) {
      G.save(); G.translate(cx, cy); G.rotate(ang);
      G.fillStyle = col;
      G.fillRect(-cell * 0.34, -cell * 0.07, cell * 0.68, cell * 0.14);
      G.restore();
    }
  }
  // plate seam and bolts
  g.fillStyle = 'rgba(10,10,12,0.9)';
  g.fillRect(0, 0, res, 1); g.fillRect(0, 0, 1, res);
  for (const [bx, by] of [[3, 3], [res - 4, 3], [3, res - 4], [res - 4, res - 4]]) {
    g.fillStyle = 'rgba(120,124,128,0.9)'; g.beginPath(); g.arc(bx, by, 1.6, 0, Math.PI * 2); g.fill();
  }
  return { albedo: a, height: h };
}

export interface FloorMaps { map: THREE.CanvasTexture; rough: THREE.CanvasTexture; normal: THREE.CanvasTexture }

export function floorMaps(w: World, res: number): FloorMaps {
  const W = w.map.w, H = w.map.h;
  const [ac, g] = canvas(W * res, H * res);
  const [hc, gh] = canvas(W * res, H * res);
  const [rc, gr] = canvas(W * 16, H * 16);
  const variants = [0, 1, 2].map((i) => ({ rub: rubberTile(res, 11 + i * 7), tread: treadPlate(res, 31 + i * 5) }));
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const k = kindAt(w.map, x, y);
    const v = variants[Math.floor(hash2(x, y, 3) * 3)];
    const shadow = k === T_SHADOW;
    const t = shadow ? v.tread : v.rub;
    g.drawImage(t.albedo, x * res, y * res);
    gh.drawImage(t.height, x * res, y * res);
    gr.fillStyle = shadow ? 'rgb(115,115,115)' : 'rgb(225,225,225)';
    if (k === T_WALL) gr.fillStyle = 'rgb(240,240,240)';
    gr.fillRect(x * 16, y * 16, 16, 16);
    if (k === T_LASER) {
      // painted hazard border on laser tiles
      g.save();
      g.beginPath(); g.rect(x * res, y * res, res, res); g.clip();
      for (let i = -res; i < res * 2; i += res / 4) {
        g.fillStyle = 'rgba(176,138,40,0.55)';
        g.beginPath(); g.moveTo(x * res + i, y * res); g.lineTo(x * res + i + res / 8, y * res); g.lineTo(x * res + i + res / 8 - res, y * res + res); g.lineTo(x * res + i - res, y * res + res); g.fill();
      }
      g.restore();
      g.fillStyle = 'rgba(20,20,20,0.6)';
      g.fillRect(x * res + res * 0.12, y * res + res * 0.12, res * 0.76, res * 0.76);
    }
    if (k === T_DOOR) {
      g.fillStyle = 'rgb(70,74,78)';
      g.fillRect(x * res + res * 0.05, y * res + res * 0.05, res * 0.9, res * 0.9);
      g.fillStyle = 'rgba(20,22,24,0.9)';
      const horiz = kindAt(w.map, x - 1, y) === T_WALL;
      if (horiz) g.fillRect(x * res, y * res + res * 0.47, res, res * 0.06); else g.fillRect(x * res + res * 0.47, y * res, res * 0.06, res);
      gr.fillStyle = 'rgb(130,130,130)'; gr.fillRect(x * 16, y * 16, 16, 16);
    }
  }
  // contact darkening near walls and solid furniture (cheap ambient occlusion)
  const ao = (x: number, y: number): boolean => { const k = kindAt(w.map, x, y); return k === T_WALL || k === T_LOCKER || k === T_TERMINAL; };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (ao(x, y)) continue;
    const X = x * res, Y = y * res;
    const edge = (dx: number, dy: number, gx0: number, gy0: number, gx1: number, gy1: number, rx: number, ry: number, rw: number, rh: number): void => {
      if (!ao(x + dx, y + dy)) return;
      const grd = g.createLinearGradient(gx0, gy0, gx1, gy1);
      grd.addColorStop(0, 'rgba(0,0,0,0.55)'); grd.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grd; g.fillRect(rx, ry, rw, rh);
    };
    const d = res * 0.32;
    edge(0, -1, X, Y, X, Y + d, X, Y, res, d);
    edge(0, 1, X, Y + res, X, Y + res - d, X, Y + res - d, res, d);
    edge(-1, 0, X, Y, X + d, Y, X, Y, d, res);
    edge(1, 0, X + res, Y, X + res - d, Y, X + res - d, Y, d, res);
  }
  grime(g, W * res, H * res, res * 1.6, 0.75, 91);
  // scuffs: short pale strokes
  const r = rng(77);
  g.strokeStyle = 'rgba(150,150,140,0.06)';
  g.lineWidth = 1;
  for (let i = 0; i < W * H * 0.8; i++) {
    const x = r() * W * res, y = r() * H * res, a = r() * Math.PI, l = res * (0.1 + r() * 0.3);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  grime(gr, W * 16, H * 16, 24, 0.35, 92);
  const nc = normalFromHeight(hc, 2.2, Math.round(W * res * 0.5), Math.round(H * res * 0.5));
  return { map: tex(ac, true), rough: tex(rc, false), normal: tex(nc, false) };
}

// ---- Walls ---------------------------------------------------------------------------------
/** Wall face texture covering 1 unit wide by `h` high (v 0..1 = floor..top). */
export function wallMaps(hUnits: number): { map: THREE.CanvasTexture; normal: THREE.CanvasTexture; rough: THREE.CanvasTexture } {
  const W = 256, H = Math.round(256 * hUnits);
  const [c, g] = canvas(W * 4, H);
  const [hc, gh] = canvas(W * 4, H);
  const band = H * (1 - 0.42 / hUnits);
  // upper painted concrete
  g.fillStyle = '#4e555a'; g.fillRect(0, 0, W * 4, band);
  // lower dado band, darker paint
  g.fillStyle = '#2e363c'; g.fillRect(0, band, W * 4, H - band);
  g.fillStyle = '#c99a3d'; g.fillRect(0, band - 5, W * 4, 4); // thin painted divider line
  g.fillStyle = '#23292e'; g.fillRect(0, H - 14, W * 4, 14); // skirting
  gh.fillStyle = '#808080'; gh.fillRect(0, 0, W * 4, H);
  gh.fillStyle = '#9a9a9a'; gh.fillRect(0, H - 14, W * 4, 14);
  // formwork seams every half unit and tie holes
  for (let x = 0; x < W * 4; x += W / 2) {
    g.fillStyle = 'rgba(20,22,24,0.35)'; g.fillRect(x, 0, 2, band - 6);
    gh.fillStyle = '#5a5a5a'; gh.fillRect(x, 0, 2, H - 14);
    for (const yy of [0.22, 0.5]) {
      g.fillStyle = 'rgba(30,32,34,0.6)'; g.beginPath(); g.arc(x + W / 4, H * yy, 3, 0, Math.PI * 2); g.fill();
      gh.fillStyle = '#404040'; gh.beginPath(); gh.arc(x + W / 4, H * yy, 3, 0, Math.PI * 2); gh.fill();
    }
  }
  // noise mottling
  const img = g.getImageData(0, 0, W * 4, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W * 4; x++) {
    const n = fbm(x / 40, y / 40, 4096, 5, 4) - 0.5;
    const i = (y * W * 4 + x) * 4;
    const k = 1 + n * 0.28 + (hash2(x, y, 9) - 0.5) * 0.06;
    img.data[i] *= k; img.data[i + 1] *= k; img.data[i + 2] *= k;
  }
  g.putImageData(img, 0, 0);
  // scuffs and dirt near the floor
  const grd = g.createLinearGradient(0, H, 0, H * 0.6);
  grd.addColorStop(0, 'rgba(10,8,6,0.55)'); grd.addColorStop(1, 'rgba(10,8,6,0)');
  g.fillStyle = grd; g.fillRect(0, H * 0.6, W * 4, H * 0.4);
  const r = rng(13);
  for (let i = 0; i < 90; i++) {
    g.fillStyle = `rgba(${r() < 0.5 ? '15,15,15' : '120,110,95'},${0.05 + r() * 0.12})`;
    g.fillRect(r() * W * 4, band + r() * (H - band), 6 + r() * 30, 1 + r() * 3);
  }
  // water stains from the top
  for (let i = 0; i < 6; i++) {
    const x = r() * W * 4, w2 = 10 + r() * 30, l = H * (0.15 + r() * 0.35);
    const s = g.createLinearGradient(0, 0, 0, l);
    s.addColorStop(0, 'rgba(25,22,18,0.35)'); s.addColorStop(1, 'rgba(25,22,18,0)');
    g.fillStyle = s; g.fillRect(x, 0, w2, l);
  }
  const [rc, gr] = canvas(64, 64);
  gr.fillStyle = 'rgb(220,220,220)'; gr.fillRect(0, 0, 64, 64);
  const t = tex(c, true, true);
  t.repeat.set(0.25, 1);
  const n = tex(normalFromHeight(hc, 1.5, W * 2, Math.round(H / 2)), false, true);
  n.repeat.set(0.25, 1);
  return { map: t, normal: n, rough: tex(rc, false, true) };
}

export function capMap(): THREE.CanvasTexture {
  const [c, g] = canvas(128, 128);
  g.fillStyle = '#24282c'; g.fillRect(0, 0, 128, 128);
  const img = g.getImageData(0, 0, 128, 128);
  for (let i = 0; i < 128 * 128; i++) { const k = 0.85 + hash2(i % 128, (i / 128) | 0, 4) * 0.3; img.data[i * 4] *= k; img.data[i * 4 + 1] *= k; img.data[i * 4 + 2] *= k; }
  g.putImageData(img, 0, 0);
  g.strokeStyle = 'rgba(120,128,134,0.7)'; g.lineWidth = 4; g.strokeRect(2, 2, 124, 124);
  return tex(c, true, true);
}

// ---- Metals and props ----------------------------------------------------------------------------
export function brushedSteel(tint = '#8b9197'): { map: THREE.CanvasTexture; rough: THREE.CanvasTexture } {
  const [c, g] = canvas(256, 256);
  const [rc, gr] = canvas(256, 256);
  g.fillStyle = tint; g.fillRect(0, 0, 256, 256);
  gr.fillStyle = 'rgb(110,110,110)'; gr.fillRect(0, 0, 256, 256);
  const r = rng(3);
  for (let i = 0; i < 900; i++) {
    const y = r() * 256, l = 30 + r() * 140, x = r() * 256, a = r() * 0.12;
    g.fillStyle = r() < 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`;
    g.fillRect(x, y, l, 1);
    gr.fillStyle = `rgba(${r() < 0.5 ? '160,160,160' : '70,70,70'},${a * 2})`;
    gr.fillRect(x, y, l, 1);
  }
  grime(g, 256, 256, 60, 0.35, 21);
  return { map: tex(c, true, true), rough: tex(rc, false, true) };
}

export function lockerFront(): THREE.CanvasTexture {
  const [c, g] = canvas(256, 320);
  g.fillStyle = '#4b5853'; g.fillRect(0, 0, 256, 320);
  g.fillStyle = '#3d4844'; g.fillRect(8, 8, 240, 304);
  g.fillStyle = '#56645e'; g.fillRect(14, 14, 228, 292);
  // vent slits
  for (let i = 0; i < 6; i++) { g.fillStyle = '#151a18'; g.fillRect(70, 34 + i * 12, 116, 5); g.fillStyle = 'rgba(160,170,165,0.35)'; g.fillRect(70, 39 + i * 12, 116, 1); }
  for (let i = 0; i < 4; i++) { g.fillStyle = '#151a18'; g.fillRect(70, 252 + i * 12, 116, 5); }
  // handle and number plate
  g.fillStyle = '#20262a'; g.fillRect(196, 150, 16, 46);
  g.fillStyle = '#9aa2a6'; g.fillRect(199, 154, 10, 38);
  g.fillStyle = '#d8d2bf'; g.fillRect(96, 130, 64, 26);
  g.fillStyle = '#2a2a2a'; g.font = '600 18px "IBM Plex Mono", monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(String(10 + Math.floor(Math.random() * 80)), 128, 144);
  // dents and wear
  grime(g, 256, 320, 50, 0.5, 44);
  const r = rng(8);
  for (let i = 0; i < 40; i++) { g.fillStyle = `rgba(170,175,170,${r() * 0.15})`; g.fillRect(r() * 256, r() * 320, 1 + r() * 8, 1); }
  return tex(c, true);
}

export function rackFront(): { map: THREE.CanvasTexture; emissive: THREE.CanvasTexture } {
  const [c, g] = canvas(256, 288);
  const [e, ge] = canvas(256, 288);
  g.fillStyle = '#121518'; g.fillRect(0, 0, 256, 288);
  ge.fillStyle = '#000'; ge.fillRect(0, 0, 256, 288);
  g.fillStyle = '#2a2f34'; g.fillRect(0, 0, 10, 288); g.fillRect(246, 0, 10, 288);
  const r = rng(51);
  let y = 10;
  while (y < 270) {
    const u = r() < 0.7 ? 1 : 2;
    const hh = u * 18;
    g.fillStyle = r() < 0.5 ? '#1c2024' : '#24292e';
    g.fillRect(14, y, 228, hh - 2);
    for (let x = 30; x < 160; x += 6) { g.fillStyle = 'rgba(0,0,0,0.6)'; g.fillRect(x, y + 4, 3, hh - 10); }
    const leds = 2 + Math.floor(r() * 4);
    for (let i = 0; i < leds; i++) {
      const col = r() < 0.65 ? '#5dff9a' : r() < 0.6 ? '#ffb347' : '#6bb8ff';
      ge.fillStyle = col; ge.fillRect(190 + i * 10, y + 6, 4, 3);
      g.fillStyle = col; g.fillRect(190 + i * 10, y + 6, 4, 3);
    }
    y += hh;
  }
  return { map: tex(c, true), emissive: tex(e, true) };
}

export function shelfFront(): THREE.CanvasTexture {
  const [c, g] = canvas(256, 288);
  g.fillStyle = '#0d0f11'; g.fillRect(0, 0, 256, 288);
  const r = rng(61);
  for (let s = 0; s < 4; s++) {
    const y0 = 8 + s * 70;
    let x = 10;
    while (x < 240) {
      const bw = 26 + r() * 30;
      const bh = 40 + r() * 20;
      const tone = r();
      g.fillStyle = tone < 0.6 ? `rgb(${150 + r() * 30},${130 + r() * 20},${95 + r() * 15})` : `rgb(${90 + r() * 20},${95 + r() * 20},${100 + r() * 20})`;
      g.fillRect(x, y0 + 62 - bh, Math.min(bw, 246 - x), bh);
      g.fillStyle = '#efe9d8'; g.fillRect(x + bw * 0.25, y0 + 62 - bh + 10, bw * 0.5, 9);
      x += bw + 3;
    }
    g.fillStyle = '#7d858c'; g.fillRect(0, y0 + 62, 256, 6);
  }
  g.fillStyle = '#5f676e'; g.fillRect(0, 0, 8, 288); g.fillRect(248, 0, 8, 288);
  grime(g, 256, 288, 50, 0.4, 62);
  return tex(c, true);
}

export function crateFace(seed: number): THREE.CanvasTexture {
  const [c, g] = canvas(256, 256);
  const r = rng(seed);
  const plastic = r() < 0.5;
  if (plastic) {
    g.fillStyle = r() < 0.5 ? '#3d4f63' : '#5a5f3a'; g.fillRect(0, 0, 256, 256);
    g.fillStyle = 'rgba(0,0,0,0.25)';
    for (let i = 0; i < 5; i++) g.fillRect(20, 30 + i * 44, 216, 14);
    g.fillStyle = '#e6dcc3'; g.fillRect(150, 190, 80, 36);
    g.fillStyle = '#222'; g.font = '600 16px "IBM Plex Mono", monospace'; g.fillText(`HX-${Math.floor(r() * 900 + 100)}`, 156, 214);
  } else {
    for (let i = 0; i < 6; i++) {
      const t = 95 + r() * 25;
      g.fillStyle = `rgb(${t},${t * 0.76},${t * 0.5})`;
      g.fillRect(0, i * 43, 256, 42);
      g.fillStyle = 'rgba(30,20,10,0.6)'; g.fillRect(0, i * 43 + 41, 256, 2);
    }
    g.fillStyle = 'rgba(60,40,20,0.9)'; g.fillRect(0, 0, 256, 18); g.fillRect(0, 238, 256, 18); g.fillRect(0, 0, 18, 256); g.fillRect(238, 0, 18, 256);
    g.fillStyle = 'rgba(25,25,25,0.75)'; g.font = '800 34px "Big Shoulders Stencil Display", sans-serif'; g.fillText('HALCYON', 52, 140);
  }
  grime(g, 256, 256, 40, 0.5, seed + 1);
  return tex(c, true);
}

export function cabinetFront(): THREE.CanvasTexture {
  const [c, g] = canvas(256, 288);
  g.fillStyle = '#8c8a80'; g.fillRect(0, 0, 256, 288);
  for (let i = 0; i < 4; i++) {
    const y = 8 + i * 70;
    g.fillStyle = '#9a978c'; g.fillRect(8, y, 240, 64);
    g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(8, y + 63, 240, 3);
    g.fillStyle = '#4b4a45'; g.fillRect(100, y + 18, 56, 10);
    g.fillStyle = '#e8e2cf'; g.fillRect(108, y + 36, 40, 14);
  }
  grime(g, 256, 288, 40, 0.55, 71);
  return tex(c, true);
}

export function ventGrille(): THREE.CanvasTexture {
  const [c, g] = canvas(128, 64);
  g.fillStyle = '#2b3136'; g.fillRect(0, 0, 128, 64);
  for (let i = 0; i < 8; i++) { g.fillStyle = '#0a0c0d'; g.fillRect(8, 6 + i * 7, 112, 4); }
  g.strokeStyle = '#535b62'; g.lineWidth = 3; g.strokeRect(1.5, 1.5, 125, 61);
  return tex(c, true);
}

export function floorVent(): THREE.CanvasTexture {
  const [c, g] = canvas(128, 128);
  g.fillStyle = '#1d2124'; g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 14; i++) { g.fillStyle = '#050606'; g.fillRect(10, 10 + i * 8, 108, 4); }
  g.strokeStyle = '#4a5157'; g.lineWidth = 4; g.strokeRect(2, 2, 124, 124);
  return tex(c, true);
}

export function chevronPlate(): THREE.CanvasTexture {
  const [c, g] = canvas(256, 256);
  g.fillStyle = '#000'; g.fillRect(0, 0, 256, 256);
  g.strokeStyle = '#fff'; g.lineWidth = 10; g.strokeRect(14, 14, 228, 228);
  g.lineWidth = 16; g.lineJoin = 'miter';
  for (const y of [110, 170]) { g.beginPath(); g.moveTo(70, y); g.lineTo(128, y - 50); g.lineTo(186, y); g.stroke(); }
  return tex(c, true);
}

export function diamondDecal(): THREE.CanvasTexture {
  const [c, g] = canvas(128, 128);
  g.clearRect(0, 0, 128, 128);
  g.strokeStyle = '#fff'; g.lineWidth = 7;
  g.beginPath(); g.moveTo(64, 14); g.lineTo(114, 64); g.lineTo(64, 114); g.lineTo(14, 64); g.closePath(); g.stroke();
  g.fillStyle = 'rgba(255,255,255,0.25)'; g.fill();
  return tex(c, true);
}

/** Soft radial falloff for glows. */
export function radialGlow(): THREE.CanvasTexture {
  const [c, g] = canvas(128, 128);
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.35, 'rgba(255,255,255,0.35)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  return tex(c, true);
}

export function frostedGlass(): THREE.CanvasTexture {
  const [c, g] = canvas(128, 64);
  g.fillStyle = '#a9b8bf'; g.fillRect(0, 0, 128, 64);
  const img = g.getImageData(0, 0, 128, 64);
  for (let i = 0; i < 128 * 64; i++) { const k = 0.9 + hash2(i % 128, (i / 128) | 0, 12) * 0.2; img.data[i * 4] *= k; img.data[i * 4 + 1] *= k; img.data[i * 4 + 2] *= k; }
  g.putImageData(img, 0, 0);
  g.fillStyle = 'rgba(255,255,255,0.2)'; g.fillRect(0, 20, 128, 3);
  return tex(c, true, true);
}

/** Uniform fabric with subtle weave, used for clothing. */
export function fabric(hex: string, seed: number): THREE.CanvasTexture {
  const [c, g] = canvas(64, 64);
  g.fillStyle = hex; g.fillRect(0, 0, 64, 64);
  const img = g.getImageData(0, 0, 64, 64);
  for (let y = 0; y < 64; y++) for (let x = 0; x < 64; x++) {
    const k = 0.92 + ((x + y) % 2) * 0.05 + hash2(x, y, seed) * 0.08;
    const i = (y * 64 + x) * 4;
    img.data[i] *= k; img.data[i + 1] *= k; img.data[i + 2] *= k;
  }
  g.putImageData(img, 0, 0);
  return tex(c, true, true);
}
