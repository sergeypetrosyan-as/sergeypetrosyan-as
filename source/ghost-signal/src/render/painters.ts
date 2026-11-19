// One painter per location (plus the title street). Painters draw into the
// separate bake layers and return a SceneSpec that tells the renderer where
// rain, glass, steam, drips and reflections live. Hotspot centres come from
// story/data.ts; each painter puts the matching object at that spot.
import {
  acUnit, bokeh, box, building, cable, fireEscape, flatText, floorSeams, hazeBand, hgrad, lerp, light, line,
  neonText, person, personPath, pool, poly, rgba, shaft, speckle, stains, vgrad,
} from './kit.ts';
import type { Ctx, PersonOpts, Rng } from './kit.ts';
import { neonScript, paintScript } from './script.ts';

export type SceneKey = 'lobby' | 'office' | 'vault' | 'annex' | 'dock' | 'bar' | 'street';

export interface Zone { x: number; y: number; w: number; h: number }
export interface SceneSpec {
  floorY: number;           // mirror line for reflections (fraction of h)
  reflect: number;          // 0..1
  puddles: boolean;
  farBlur: number;          // css px
  signsBehind: boolean;     // signs sit behind the mid layer (seen through glass)
  signsMasked: boolean;     // live sign flicker is clipped to the glass mask
  flicker: number;          // 0..1 share of sign light that flickers
  rain: Zone[];             // where rain drops spawn (the mask decides visibility)
  wind: number;
  near: boolean;            // near, fast streaks (open air)
  rainA: number;
  glass: Zone[];            // droplets
  drops: number;            // droplet density
  splash: Zone[];
  drips: [number, number, number][]; // x, y, fall length (fractions)
  steam: [number, number, number][]; // x, y, size (fraction of h)
  dust: Zone[];
  grade: { mid: string; midA: number; shadow: string; lift: number; vignette: number; bloom: number };
}

export interface Paint {
  w: number; h: number; r: Rng;
  far: Ctx; mid: Ctx; light: Ctx; signs: Ctx; fg: Ctx; atmo: Ctx; mask: Ctx;
}

type Pt = [number, number];
const P = (a: Pt, b: Pt, t: number): Pt => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
/** Perspective-compressed depth: quick growth near the camera, flattening into the distance. */
const persp = (u: number, k = 5): number => (u * k) / (1 + u * (k - 1));
interface Quad { nt: Pt; nb: Pt; ft: Pt; fb: Pt }
const qp = (q: Quad, u: number, v: number): Pt => P(P(q.nt, q.ft, u), P(q.nb, q.fb, u), v);
function qfill(c: Ctx, q: Quad, u0: number, u1: number, v0: number, v1: number, fill: string | CanvasGradient): void {
  const a = qp(q, u0, v0); const b = qp(q, u1, v0); const d = qp(q, u1, v1); const e = qp(q, u0, v1);
  c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.lineTo(d[0], d[1]); c.lineTo(e[0], e[1]); c.closePath();
  c.fillStyle = fill; c.fill();
}


function zone(p: Paint, z: Zone): void { p.mask.fillStyle = '#ffffff'; p.mask.fillRect(z.x * p.w, z.y * p.h, z.w * p.w, z.h * p.h); }
function cut(p: Paint, fn: (c: Ctx) => void): void {
  const m = p.mask; m.save(); m.globalCompositeOperation = 'destination-out'; m.fillStyle = '#030303'; m.strokeStyle = '#030303'; fn(m); m.restore();
}
function figure(p: Paint, x: number, base: number, o: PersonOpts): void {
  person(p.fg, x, base, o);
  const path = personPath(x, base, o);
  cut(p, (m) => m.fill(path));
}

// ------------------------------------------------------------------ shared: the city seen through glass
interface CityOpts { horizon: number; x0?: number; x1?: number; top?: number; glow: string; glow2?: string; signs?: number; dense?: number; street?: boolean; tall?: number }
function city(p: Paint, c: Ctx, o: CityOpts): void {
  const { w, h, r } = p;
  const x0 = (o.x0 ?? 0) * w; const x1 = (o.x1 ?? 1) * w; const top = (o.top ?? 0) * h; const hz = o.horizon * h;
  vgrad(c, x0, top, x1 - x0, hz - top + h * 0.05, [[0, '#060304'], [0.55, '#0b0405'], [0.85, rgba(o.glow, 0.35)], [1, rgba(o.glow, 0.5)]]);
  // low cloud deck lit from below
  for (let i = 0; i < 7; i++) hazeBand(c, x0, top + (hz - top) * (0.05 + r() * 0.5), x1 - x0, h * (0.04 + r() * 0.06), o.glow, 0.05 + r() * 0.06);
  const tall = o.tall ?? 1;
  const rows: [string, number, number, number][] = [['#120606', 0.55, 0.22, 0.3], ['#0d0505', 0.85, 0.32, 0.45], ['#080404', 1.15, 0.38, 0.55]];
  for (const [col, hk, lit, dim] of rows) {
    let x = x0 - r() * 30;
    while (x < x1) {
      const bw = w * (0.04 + r() * 0.08) * (hk > 1 ? 1.3 : 1);
      const bh = (hz - top) * (0.25 + r() * 0.6) * hk * tall;
      building(c, x, hz, bw, bh, r, { col, lit: lit * (o.dense ?? 1), dim, escape: hk > 1 && r() < 0.5, ac: hk > 0.8, roof: r() < 0.5, edge: 'rgba(207, 178, 176,0.06)' });
      if (hk > 0.8 && r() < (o.signs ?? 0.35)) {
        const sx = x + bw * (0.2 + r() * 0.6); const sy = hz - bh * (0.3 + r() * 0.5);
        const rgb = [o.glow, o.glow2 ?? '242,238,233', '221,203,200', '125,19,28'][Math.floor(r() * 4)];
        const size = h * (0.016 + r() * 0.018);
        box(c, sx - size * 0.6, sy - size * 0.4, size * 1.6, size * 6, 'rgba(7, 4, 4,0.9)');
        neonScript(c, ['lumen', 'kestrel', 'noodle', 'feeds', 'sora', 'okan'][Math.floor(r() * 6)].slice(0, 3 + Math.floor(r() * 3)), sx + size * 0.2, sy + size * 2.4, size, rgb, { vertical: true });
        light(c, sx, sy + size * 2.5, size * 14, rgb, 0.18);
      }
      x += bw + r() * w * 0.01;
    }
  }
  if (o.street !== false) {
    // storefronts at street level and traffic bokeh
    for (let i = 0; i < 26; i++) {
      const bx = x0 + r() * (x1 - x0); const by = hz - h * (0.005 + r() * 0.03);
      const rgb = r() < 0.5 ? '233,224,219' : r() < 0.5 ? '211,3,23' : r() < 0.5 ? o.glow : '249,247,245';
      bokeh(c, bx, by, h * (0.006 + r() * 0.012), rgb, 0.35 + r() * 0.35);
    }
    hazeBand(c, x0, hz - h * 0.06, x1 - x0, h * 0.1, o.glow, 0.18);
  }
}

// ------------------------------------------------------------------ LOBBY
function lobby(p: Paint): SceneSpec {
  const { w, h, r, far, mid, fg } = p; const L = p.light; const S = p.signs;
  const X = (f: number): number => f * w; const Y = (f: number): number => f * h;
  const FLOOR = 0.62;
  city(p, far, { horizon: 0.585, glow: '125,19,28', glow2: '242,238,233', signs: 0.6, tall: 1.6 });
  // street outside: wet road reflection band and passers-by under umbrellas
  vgrad(far, 0, Y(0.565), w, Y(0.06), [[0, '#0c0505'], [1, '#080404']]);
  for (let i = 0; i < 5; i++) person(far, X(0.08 + r() * 0.84), Y(0.6), { h: Y(0.12 + r() * 0.03), umbrella: r() < 0.7, coat: 0.8, fill: '#070404', rims: [{ rgb: '125,19,28', dx: 0, dy: -1, a: 0.4 }] });

  // ceiling soffit
  vgrad(mid, 0, 0, w, Y(0.07), [[0, '#080404'], [1, '#0e0505']]);
  for (const fx of [0.28, 0.52, 0.66, 0.94]) { box(mid, X(fx) - X(0.012), Y(0.058), X(0.024), Y(0.008), '#faf8f6'); }
  // glass tint and sheen
  mid.fillStyle = 'rgba(14, 5, 5,0.3)'; mid.fillRect(0, Y(0.07), w, Y(FLOOR - 0.07));
  mid.save(); mid.globalAlpha = 0.05; mid.fillStyle = '#f6f3ef';
  for (let i = 0; i < 4; i++) { const sx = X(0.1 + i * 0.27); poly(mid, [sx, Y(0.07), sx + X(0.05), Y(0.07), sx - X(0.08), Y(FLOOR), sx - X(0.13), Y(FLOOR)], 'rgba(246, 243, 239,1)'); }
  mid.restore();
  // mullions and transom
  for (let i = 0; i <= 7; i++) {
    const mx = X(i / 7);
    box(mid, mx - X(0.005), Y(0.07), X(0.01), Y(FLOOR - 0.07), '#090404');
    box(mid, mx - X(0.005), Y(0.07), X(0.0016), Y(FLOOR - 0.07), 'rgba(221, 202, 198,0.18)');
  }
  box(mid, 0, Y(0.2), w, Y(0.008), '#090404');
  box(mid, 0, Y(FLOOR - 0.025), w, Y(0.025), '#0a0404');

  // revolving door drum
  mid.fillStyle = '#090404'; mid.fillRect(X(0.035), Y(0.11), X(0.17), Y(0.04));
  for (const a of [0.12, 0.45, 0.8]) {
    const dx = X(0.12) + Math.cos(a * Math.PI) * X(0.08);
    box(mid, dx - 1, Y(0.15), 2, Y(0.44), 'rgba(227, 212, 208,0.35)');
    mid.fillStyle = 'rgba(18, 6, 6,0.25)'; mid.fillRect(Math.min(dx, X(0.12)), Y(0.15), Math.abs(dx - X(0.12)), Y(0.44));
  }
  box(mid, X(0.118), Y(0.15), X(0.006), Y(0.44), '#090404');

  // HALCYON halo-lit letters on the booth fascia
  box(mid, X(0.44), Y(0.30), X(0.32), Y(0.065), '#0c0405');
  box(mid, X(0.44), Y(0.362), X(0.32), Y(0.004), 'rgba(242, 239, 233,0.25)');
  L.save(); L.filter = 'blur(6px)'; flatText(L, 'HALCYON', X(0.6), Y(0.326), Y(0.05), 'rgba(247, 245, 242,0.55)', 'center', 800, 'Zilla Slab', Y(0.012)); L.restore();
  flatText(fg, 'HALCYON', X(0.6), Y(0.326), Y(0.05), '#0a0405', 'center', 800, 'Zilla Slab', Y(0.012));
  paintScript(mid, 'memory exchange', X(0.6), Y(0.352), Y(0.008), 'rgba(237, 230, 224,0.5)');

  // booth: back wall, monitors, glass, counter
  box(mid, X(0.45), Y(0.366), X(0.3), Y(0.22), '#0a0404');
  for (const [cx, kind] of [[0.52, 0], [0.68, 1]] as const) {
    const sx = X(cx) - X(0.04); const sy = Y(0.41); const sw = X(0.08); const sh = Y(0.07);
    box(mid, sx - 2, sy - 2, sw + 4, sh + 4, '#060404');
    vgrad(mid, sx, sy, sw, sh, [[0, '#5f3436'], [1, '#120506']]);
    if (kind === 0) for (let k = 0; k < 6; k++) box(mid, sx + sw * 0.08, sy + sh * (0.14 + k * 0.13), sw * (0.3 + r() * 0.55), Math.max(1, sh * 0.05), 'rgba(248, 246, 243,0.55)');
    else for (let k = 0; k < 4; k++) { const gx = sx + (k % 2) * sw / 2; const gy = sy + Math.floor(k / 2) * sh / 2; vgrad(mid, gx + 1, gy + 1, sw / 2 - 2, sh / 2 - 2, [[0, 'rgba(168, 118, 119,0.8)'], [1, 'rgba(18, 6, 6,0.9)']]); }
    box(mid, X(cx) - 1.5, sy + sh + 2, 3, Y(0.03), '#060404');
    light(L, X(cx), Y(0.445), X(0.12), '242,238,233', 0.28);
  }
  person(mid, X(0.61), Y(0.6), { h: Y(0.16), fill: '#070404' }); // empty chair shape reads as a seat back
  // booth glass with reflections
  mid.fillStyle = 'rgba(190, 150, 150,0.10)'; mid.fillRect(X(0.45), Y(0.366), X(0.3), Y(0.22));
  for (let i = 0; i < 3; i++) poly(mid, [X(0.47 + i * 0.1), Y(0.366), X(0.5 + i * 0.1), Y(0.366), X(0.46 + i * 0.1), Y(0.585), X(0.43 + i * 0.1), Y(0.585)], 'rgba(252, 251, 250,0.035)');
  for (const fx of [0.45, 0.6, 0.75]) box(mid, X(fx) - 1.5, Y(0.366), 3, Y(0.22), '#090404');
  neonScript(S, 'post', X(0.71), Y(0.39), Y(0.014), '242,238,233');
  // counter
  box(mid, X(0.44), Y(0.585), X(0.32), Y(0.016), '#20080a');
  box(mid, X(0.44), Y(0.585), X(0.32), Y(0.003), 'rgba(251, 249, 248,0.35)');
  vgrad(mid, X(0.445), Y(0.601), X(0.31), Y(0.11), [[0, '#110506'], [1, '#0a0404']]);
  for (let i = 1; i < 4; i++) box(mid, X(0.445 + i * 0.0775), Y(0.601), 1, Y(0.11), 'rgba(3, 3, 3,0.5)');
  // booth recorder on the counter
  box(mid, X(0.575), Y(0.556), X(0.05), Y(0.03), '#130606');
  box(mid, X(0.58), Y(0.562), X(0.022), Y(0.016), '#090404');
  for (const k of [0, 1]) { mid.beginPath(); mid.arc(X(0.585 + k * 0.012), Y(0.57), Y(0.005), 0, Math.PI * 2); mid.fillStyle = '#190708'; mid.fill(); }
  box(S, X(0.61), Y(0.565), Y(0.005), Y(0.005), '#d30317'); box(S, X(0.617), Y(0.565), Y(0.005), Y(0.005), '#e0d0cc');
  light(L, X(0.613), Y(0.567), X(0.02), '225,0,22', 0.4);
  cut(p, (m) => { m.fillRect(X(0.44), Y(0.3), X(0.32), Y(0.42)); });

  // concrete column with the grid relay cabinet
  vgrad(mid, X(0.8), Y(0.07), X(0.09), Y(FLOOR - 0.07 + 0.2), [[0, '#130607'], [1, '#0d0505']]);
  hgrad(mid, X(0.8), Y(0.07), X(0.09), Y(0.75), [[0, 'rgba(3, 3, 3,0.35)'], [0.3, 'rgba(3, 3, 3,0)'], [1, 'rgba(3, 3, 3,0.4)']]);
  for (const px of [0.82, 0.835]) { box(mid, X(px), Y(0.07), X(0.007), Y(0.29), '#1a0708'); box(mid, X(px), Y(0.07), 1, Y(0.29), 'rgba(255,255,255,0.12)'); }
  box(mid, X(0.806), Y(0.36), X(0.068), Y(0.24), '#180708');
  box(mid, X(0.806), Y(0.36), X(0.068), 1.5, 'rgba(255,255,255,0.2)');
  for (let i = 0; i < 6; i++) box(mid, X(0.814), Y(0.372 + i * 0.008), X(0.052), 1.2, 'rgba(3, 3, 3,0.6)');
  for (let row = 0; row < 5; row++) {
    const ry = Y(0.43 + row * 0.03);
    box(mid, X(0.814), ry, X(0.052), Y(0.02), '#110506');
    for (let k = 0; k < 6; k++) box(mid, X(0.817 + k * 0.008), ry + Y(0.004), X(0.004), Y(0.012), '#3f2526');
    const col = row === 2 ? '217,196,193' : row === 4 ? '211,3,23' : '224,208,204';
    box(S, X(0.866), ry + Y(0.007), Y(0.006), Y(0.006), rgba(col, 1));
    light(L, X(0.866) + Y(0.003), ry + Y(0.01), X(0.018), col, 0.5);
  }
  paintScript(mid, 'relay', X(0.84), Y(0.418), Y(0.008), 'rgba(247, 244, 240,0.6)');
  cut(p, (m) => m.fillRect(X(0.8), Y(0.07), X(0.09), Y(0.6)));

  // marble floor
  vgrad(mid, 0, Y(FLOOR), w, Y(1 - FLOOR), [[0, '#0d0505'], [0.4, '#0a0404'], [1, '#060404']]);
  mid.save(); mid.globalAlpha = 0.18; mid.strokeStyle = '#bda8a6'; mid.lineWidth = 0.7;
  for (let i = 0; i < 14; i++) { mid.beginPath(); const sx = r() * w; const sy = Y(FLOOR + r() * 0.35); mid.moveTo(sx, sy); mid.bezierCurveTo(sx + X(0.05), sy + Y(0.02), sx + X(0.08), sy - Y(0.01), sx + X(0.15), sy + Y(0.04)); mid.stroke(); }
  mid.restore();
  floorSeams(mid, w, Y(FLOOR), h, X(0.5), Y(0.4), 6, 'rgba(3, 3, 3,0.5)', 7);

  // the front-door ledger podium
  box(mid, X(0.097), Y(0.585), X(0.046), Y(0.12), '#100506');
  hgrad(mid, X(0.097), Y(0.585), X(0.046), Y(0.12), [[0, 'rgba(255,255,255,0.06)'], [1, 'rgba(3, 3, 3,0.4)']]);
  poly(mid, [X(0.093), Y(0.585), X(0.147), Y(0.585), X(0.141), Y(0.562), X(0.099), Y(0.562)], '#190708');
  poly(mid, [X(0.1), Y(0.582), X(0.14), Y(0.582), X(0.136), Y(0.566), X(0.104), Y(0.566)], '#caaaa9');
  for (let k = 0; k < 3; k++) box(mid, X(0.106), Y(0.569 + k * 0.004), X(0.022 - k * 0.004), 0.8, 'rgba(14, 5, 5,0.8)');
  light(L, X(0.12), Y(0.57), X(0.05), '228,214,210', 0.45);
  cut(p, (m) => m.fillRect(X(0.093), Y(0.56), X(0.055), Y(0.15)));

  // wet-floor sign and mop bucket by Pell
  poly(fg, [X(0.205), Y(0.80), X(0.225), Y(0.72), X(0.245), Y(0.80)], '#c6a3a2');
  poly(fg, [X(0.21), Y(0.79), X(0.225), Y(0.735), X(0.24), Y(0.79)], '#d8c1bf');
  paintScript(fg, 'wet', X(0.225), Y(0.765), Y(0.012), '#0c0405');
  fg.beginPath(); fg.ellipse(X(0.335), Y(0.81), X(0.022), Y(0.008), 0, 0, Math.PI * 2); fg.fillStyle = '#5e262a'; fg.fill();
  vgrad(fg, X(0.313), Y(0.775), X(0.044), Y(0.035), [[0, '#c29c9c'], [1, '#470e13']]);
  cut(p, (m) => { m.fillRect(X(0.2), Y(0.72), X(0.05), Y(0.09)); });

  // people
  figure(p, X(0.40), Y(0.755), { h: Y(0.37), hat: 'cap', broad: 1.2, coat: 0.35, arms: 'side', reflect: 0.7, rims: [{ rgb: '242,238,233', dx: 1, dy: -0.2, a: 0.75 }, { rgb: '125,19,28', dx: -0.4, dy: -1, a: 0.35 }] });
  figure(p, X(0.28), Y(0.82), { h: Y(0.345), bun: true, stoop: 0.8, coat: 0.85, prop: 'mop', reflect: 0.7, rims: [{ rgb: '125,19,28', dx: -0.6, dy: -1, a: 0.55 }, { rgb: '249,248,245', dx: 0.5, dy: -1, a: 0.25 }] });

  // practical light
  for (const fx of [0.28, 0.66, 0.94]) { shaft(p.atmo, X(fx), Y(0.062), X(0.03), X(fx), Y(0.85), X(0.2), '249,248,245', 0.06); pool(L, X(fx), Y(0.83), X(0.12), Y(0.03), '249,248,245', 0.16); light(L, X(fx), Y(0.062), X(0.05), '251,249,248', 0.7); }
  pool(L, X(0.3), Y(0.665), X(0.3), Y(0.04), '125,19,28', 0.13);
  pool(L, X(0.72), Y(0.67), X(0.25), Y(0.04), '242,238,233', 0.07);
  light(L, X(0.6), Y(0.48), X(0.25), '242,238,233', 0.1, 0.6);
  hazeBand(p.atmo, 0, Y(0.45), w, Y(0.2), '107,20,27', 0.05);
  // a failing tube in the soffit
  box(S, X(0.505), Y(0.058), X(0.03), Y(0.008), '#fdfdfc');
  light(S, X(0.52), Y(0.062), X(0.08), '251,250,248', 0.45);
  zone(p, { x: 0, y: 0.07, w: 1, h: FLOOR - 0.095 });
  cut(p, (m) => m.fillRect(X(0.035), Y(0.11), X(0.17), Y(0.04)));
  return {
    floorY: FLOOR, reflect: 0.55, puddles: false, farBlur: 5, signsBehind: false, signsMasked: false, flicker: 0.75,
    rain: [{ x: 0, y: 0.07, w: 1, h: FLOOR - 0.095 }], wind: 0.08, near: false, rainA: 0.5,
    glass: [{ x: 0, y: 0.07, w: 1, h: FLOOR - 0.095 }], drops: 0.6, splash: [], drips: [], steam: [], dust: [{ x: 0.2, y: 0.1, w: 0.2, h: 0.6 }],
    grade: { mid: '210,183,181', midA: 0.14, shadow: '12,5,5', lift: 0.05, vignette: 0.6, bloom: 0.4 },
  };
}

// ------------------------------------------------------------------ OFFICE
function office(p: Paint): SceneSpec {
  const { w, h, r, far, mid } = p; const L = p.light; const S = p.signs;
  const X = (f: number): number => f * w; const Y = (f: number): number => f * h;
  const WX0 = 0.38; const WX1 = 0.72; const WY0 = 0.07; const WY1 = 0.5;
  city(p, far, { horizon: 0.62, glow: '231,75,88', glow2: '242,238,233', signs: 0.7, tall: 1.6, dense: 2.2, street: false });
  light(far, X(0.6), Y(0.45), X(0.35), '232,90,101', 0.25);
  // the big blade sign across the street
  box(far, X(0.47) - Y(0.03), Y(0.12), Y(0.06), Y(0.36), '#080404');
  neonScript(far, 'okane', X(0.47), Y(0.3), Y(0.04), '125,19,28', { vertical: true });
  light(far, X(0.47), Y(0.3), X(0.25), '125,19,28', 0.35);

  // walls: wood panelling, side wall in perspective
  vgrad(mid, 0, 0, X(0.74), Y(0.7), [[0, '#0b0405'], [0.5, '#0d0505'], [1, '#090404']]);
  for (let i = 0; i < 12; i++) box(mid, X(i * 0.062), 0, 1, Y(0.7), 'rgba(3, 3, 3,0.35)');
  box(mid, 0, Y(0.48), X(0.74), Y(0.012), '#110506'); box(mid, 0, Y(0.48), X(0.74), 1, 'rgba(239, 233, 227,0.15)');
  vgrad(mid, 0, Y(0.492), X(0.74), Y(0.21), [[0, '#090404'], [1, '#070404']]);
  poly(mid, [X(0.74), Y(0.0), w, Y(-0.06), w, Y(0.84), X(0.74), Y(0.7)], '#0c0405');
  poly(mid, [X(0.74), Y(0.0), w, Y(-0.06), w, Y(0.84), X(0.74), Y(0.7)], 'rgba(3, 3, 3,0.25)');
  for (let i = 1; i < 5; i++) { const t = i / 5; line(mid, lerp(X(0.74), w, t), lerp(Y(0), Y(-0.06), t), lerp(X(0.74), w, t), lerp(Y(0.7), Y(0.84), t), 'rgba(3, 3, 3,0.4)', 1); }
  // window hole, frame, blinds
  mid.clearRect(X(WX0), Y(WY0), X(WX1 - WX0), Y(WY1 - WY0));
  mid.fillStyle = 'rgba(15, 5, 6,0.22)'; mid.fillRect(X(WX0), Y(WY0), X(WX1 - WX0), Y(WY1 - WY0));
  for (let s = 0; s < 16; s++) {
    const sy = Y(WY0 + 0.004 + s * 0.0095);
    box(mid, X(WX0), sy, X(WX1 - WX0), Y(0.0062), s % 5 === 3 ? '#28090c' : '#391d1f'); box(mid, X(WX0), sy, X(WX1 - WX0), 1, 'rgba(245, 242, 237,0.12)');
    box(mid, X(WX0), sy + Y(0.005), X(WX1 - WX0), 1, 'rgba(3, 3, 3,0.45)');
  }
  for (const fx of [WX0, 0.55, WX1]) box(mid, X(fx) - X(0.006), Y(WY0), X(0.012), Y(WY1 - WY0), '#090404');
  box(mid, X(WX0), Y(0.3), X(WX1 - WX0), Y(0.008), '#090404');
  box(mid, X(WX0) - X(0.01), Y(WY1), X(WX1 - WX0 + 0.02), Y(0.014), '#120506');
  zone(p, { x: WX0, y: WY0 + 0.155, w: WX1 - WX0, h: WY1 - WY0 - 0.155 });
  cut(p, (m) => { for (const fx of [WX0, 0.55, WX1]) m.fillRect(X(fx) - X(0.006), Y(WY0), X(0.012), Y(WY1 - WY0)); m.fillRect(X(WX0), Y(0.3), X(WX1 - WX0), Y(0.008)); });

  // bookshelf on the left
  box(mid, 0, Y(0.04), X(0.075), Y(0.68), '#080404');
  for (let s = 0; s < 6; s++) {
    const sy = Y(0.1 + s * 0.1);
    box(mid, 0, sy, X(0.075), Y(0.008), '#100506');
    let bx = X(0.004);
    while (bx < X(0.07)) {
      const bw = X(0.004 + r() * 0.006); const bh = Y(0.05 + r() * 0.035);
      const hue = ['#120606', '#140607', '#1a0708', '#100506', '#1f080a'][Math.floor(r() * 5)];
      box(mid, bx, sy - bh, bw, bh, hue); box(mid, bx, sy - bh, 1, bh, 'rgba(242, 239, 233,0.08)');
      bx += bw + 0.6;
    }
  }
  // framed photograph with a picture light
  box(mid, X(0.104), Y(0.268), X(0.072), Y(0.144), '#060404');
  box(mid, X(0.11), Y(0.278), X(0.06), Y(0.124), '#ede7e1');
  vgrad(mid, X(0.118), Y(0.29), X(0.044), Y(0.1), [[0, '#7c4649'], [1, '#22080a']]);
  box(mid, X(0.122), Y(0.33), X(0.036), Y(0.06), '#190708');
  for (const fx of [0.13, 0.148]) { mid.fillStyle = '#0d0505'; mid.beginPath(); mid.arc(X(fx), Y(0.338), Y(0.008), 0, Math.PI * 2); mid.fill(); mid.fillRect(X(fx) - Y(0.008), Y(0.346), Y(0.016), Y(0.04)); }
  poly(mid, [X(0.11), Y(0.278), X(0.135), Y(0.278), X(0.11), Y(0.33)], 'rgba(255,255,255,0.08)');
  box(mid, X(0.12), Y(0.25), X(0.04), Y(0.008), '#956163');
  shaft(L, X(0.14), Y(0.258), X(0.04), X(0.14), Y(0.44), X(0.1), '233,223,218', 0.18);
  light(L, X(0.14), Y(0.26), X(0.05), '238,232,226', 0.5);

  // the wall safe on the side wall
  poly(mid, [X(0.762), Y(0.326), X(0.838), Y(0.318), X(0.838), Y(0.478), X(0.762), Y(0.476)], '#080404');
  poly(mid, [X(0.768), Y(0.334), X(0.832), Y(0.327), X(0.832), Y(0.47), X(0.768), Y(0.469)], '#140607');
  hgrad(mid, X(0.768), Y(0.33), X(0.064), Y(0.14), [[0, 'rgba(255,255,255,0.12)'], [0.5, 'rgba(3, 3, 3,0)'], [1, 'rgba(3, 3, 3,0.35)']]);
  mid.beginPath(); mid.arc(X(0.8), Y(0.4), Y(0.03), 0, Math.PI * 2); mid.fillStyle = '#110506'; mid.fill();
  mid.beginPath(); mid.arc(X(0.8), Y(0.4), Y(0.022), 0, Math.PI * 2); mid.fillStyle = '#3f2527'; mid.fill();
  for (let k = 0; k < 24; k++) { const a = (k / 24) * Math.PI * 2; line(mid, X(0.8) + Math.cos(a) * Y(0.018), Y(0.4) + Math.sin(a) * Y(0.018), X(0.8) + Math.cos(a) * Y(0.022), Y(0.4) + Math.sin(a) * Y(0.022), '#110506', 0.6); }
  box(mid, X(0.818), Y(0.44), X(0.01), Y(0.02), '#0d0505');
  box(S, X(0.8215), Y(0.444), Y(0.005), Y(0.005), '#cb0518');
  light(L, X(0.823), Y(0.447), X(0.03), '204,4,24', 0.5);

  // floorboards and rug
  vgrad(mid, 0, Y(0.7), w, Y(0.3), [[0, '#0c0505'], [1, '#060404']]);
  floorSeams(mid, w, Y(0.7), h, X(0.42), Y(0.36), 14, 'rgba(3, 3, 3,0.4)', 0);
  poly(mid, [X(0.1), Y(0.78), X(0.7), Y(0.78), X(0.8), Y(0.98), X(0.0), Y(0.98)], '#0c0505');
  poly(mid, [X(0.1), Y(0.78), X(0.7), Y(0.78), X(0.8), Y(0.98), X(0.0), Y(0.98)], '#090404');
  mid.save(); mid.strokeStyle = 'rgba(153, 102, 104,0.28)'; mid.lineWidth = 1.5; mid.beginPath(); mid.moveTo(X(0.125), Y(0.79)); mid.lineTo(X(0.675), Y(0.79)); mid.lineTo(X(0.765), Y(0.968)); mid.lineTo(X(0.035), Y(0.968)); mid.closePath(); mid.stroke();
  mid.restore();
  speckle(mid, 0, Y(0.78), X(0.8), Y(0.2), 400, 'rgba(3, 3, 3,0.25)', r, 1.5);

  // desk chair, desk, lamp, cradle, terminal
  mid.fillStyle = '#060404';
  mid.beginPath(); mid.moveTo(X(0.33), Y(0.55)); mid.lineTo(X(0.335), Y(0.41)); mid.quadraticCurveTo(X(0.37), Y(0.39), X(0.405), Y(0.41)); mid.lineTo(X(0.41), Y(0.55)); mid.fill();
  cut(p, (m) => m.fillRect(X(0.33), Y(0.39), X(0.08), Y(0.16)));
  poly(mid, [X(0.15), Y(0.545), X(0.63), Y(0.545), X(0.65), Y(0.578), X(0.13), Y(0.578)], '#150607');
  poly(mid, [X(0.15), Y(0.545), X(0.63), Y(0.545), X(0.632), Y(0.549), X(0.148), Y(0.549)], 'rgba(242, 238, 233,0.25)');
  vgrad(mid, X(0.13), Y(0.578), X(0.52), Y(0.19), [[0, '#0e0505'], [1, '#080404']]);
  for (const [dx, dw] of [[0.14, 0.13], [0.51, 0.13]] as const) {
    for (let k = 0; k < 3; k++) { box(mid, X(dx), Y(0.59 + k * 0.055), X(dw), Y(0.048), '#0c0405'); box(mid, X(dx + dw / 2 - 0.012), Y(0.61 + k * 0.055), X(0.024), Y(0.005), '#753f42'); }
  }
  // papers and cup
  poly(mid, [X(0.2), Y(0.552), X(0.26), Y(0.55), X(0.262), Y(0.566), X(0.198), Y(0.568)], '#e5d9d4');
  poly(mid, [X(0.215), Y(0.556), X(0.27), Y(0.552), X(0.274), Y(0.568), X(0.22), Y(0.572)], '#f2eee8');
  box(mid, X(0.47), Y(0.528), X(0.014), Y(0.02), '#f5f2ee');
  // cradle: a neural headset on its stand
  box(mid, X(0.295), Y(0.538), X(0.012), Y(0.012), '#100506');
  mid.save(); mid.lineWidth = Y(0.008); mid.strokeStyle = '#190708'; mid.beginPath(); mid.ellipse(X(0.301), Y(0.535), X(0.028), Y(0.028), 0, Math.PI, 0); mid.stroke(); mid.restore();
  for (let k = 0; k < 5; k++) { const a = Math.PI + (k + 0.5) * (Math.PI / 5); box(S, X(0.301) + Math.cos(a) * X(0.028) - 1, Y(0.535) + Math.sin(a) * Y(0.028) - 1, 2.5, 2.5, '#f9f7f5'); }
  light(L, X(0.301), Y(0.52), X(0.06), '242,238,233', 0.35);
  cable(mid, X(0.307), Y(0.55), X(0.36), Y(0.556), Y(0.01), '#090404', 1.5);
  // terminal
  box(mid, X(0.512), Y(0.476), X(0.076), Y(0.06), '#070404');
  vgrad(mid, X(0.516), Y(0.48), X(0.068), Y(0.052), [[0, '#613639'], [1, '#110506']]);
  box(mid, X(0.522), Y(0.488), X(0.03), Y(0.006), 'rgba(250, 249, 247,0.7)');
  for (let k = 0; k < 4; k++) box(mid, X(0.522), Y(0.5 + k * 0.007), X(0.05 - k * 0.006), Y(0.003), 'rgba(250, 249, 247,0.4)');
  box(mid, X(0.566), Y(0.51), X(0.014), Y(0.014), 'rgba(221, 203, 200,0.6)');
  box(mid, X(0.547), Y(0.536), X(0.006), Y(0.012), '#070404');
  poly(mid, [X(0.522), Y(0.556), X(0.578), Y(0.556), X(0.582), Y(0.566), X(0.518), Y(0.566)], '#0d0505');
  light(L, X(0.55), Y(0.51), X(0.16), '242,238,233', 0.22, 0.8);
  cut(p, (m) => m.fillRect(X(0.51), Y(0.474), X(0.08), Y(0.07)));
  // banker's lamp
  box(mid, X(0.425), Y(0.538), X(0.03), Y(0.008), '#470e13');
  box(mid, X(0.438), Y(0.5), X(0.004), Y(0.04), '#470e13');
  mid.fillStyle = '#190708'; mid.beginPath(); mid.moveTo(X(0.415), Y(0.505)); mid.quadraticCurveTo(X(0.44), Y(0.48), X(0.465), Y(0.505)); mid.closePath(); mid.fill();
  box(mid, X(0.415), Y(0.503), X(0.05), Y(0.003), 'rgba(244, 241, 236,0.9)');
  pool(L, X(0.44), Y(0.552), X(0.16), Y(0.025), '228,214,210', 0.5);
  light(L, X(0.44), Y(0.51), X(0.22), '223,206,202', 0.35);
  shaft(p.atmo, X(0.44), Y(0.505), X(0.05), X(0.44), Y(0.56), X(0.2), '233,222,217', 0.12);
  cut(p, (m) => m.fillRect(X(0.41), Y(0.475), X(0.06), Y(0.07)));

  // window light: cool shaft with blind stripes on the floor, magenta spill from the sign
  shaft(p.atmo, X(0.55), Y(0.28), X(0.3), X(0.5), Y(1.0), X(0.6), '226,211,207', 0.07);
  for (let s = 0; s < 6; s++) poly(L, [X(0.2 + s * 0.02), Y(0.84 + s * 0.022), X(0.62 + s * 0.03), Y(0.84 + s * 0.022), X(0.63 + s * 0.03), Y(0.85 + s * 0.022), X(0.19 + s * 0.02), Y(0.85 + s * 0.022)], 'rgba(223, 205, 202,0.06)');
  light(L, X(0.5), Y(0.2), X(0.4), '125,19,28', 0.14, 0.8);
  light(L, X(0.86), Y(0.4), X(0.2), '125,19,28', 0.08);

  figure(p, X(0.66), Y(0.83), { h: Y(0.40), coat: 0.75, arms: 'crossed', broad: 0.95, reflect: 0.25, rims: [{ rgb: '244,240,236', dx: -0.6, dy: -1, a: 0.6 }, { rgb: '125,19,28', dx: 1, dy: -0.3, a: 0.4 }] });
  return {
    floorY: 0.7, reflect: 0.18, puddles: false, farBlur: 6, signsBehind: false, signsMasked: false, flicker: 0.3,
    rain: [{ x: WX0, y: WY0, w: WX1 - WX0, h: WY1 - WY0 }], wind: 0.05, near: false, rainA: 0.55,
    glass: [{ x: WX0, y: WY0 + 0.155, w: WX1 - WX0, h: WY1 - WY0 - 0.155 }], drops: 1, splash: [], drips: [], steam: [], dust: [{ x: 0.38, y: 0.3, w: 0.3, h: 0.5 }],
    grade: { mid: '219,199,195', midA: 0.12, shadow: '10,4,4', lift: 0.05, vignette: 0.65, bloom: 0.4 },
  };
}

// ------------------------------------------------------------------ VAULT
function vault(p: Paint): SceneSpec {
  const { w, h, r, mid, fg } = p; const L = p.light; const S = p.signs;
  const X = (f: number): number => f * w; const Y = (f: number): number => f * h;
  const ft: Pt = [X(0.44), Y(0.3)]; const fb: Pt = [X(0.44), Y(0.5)]; const ft2: Pt = [X(0.6), Y(0.3)]; const fb2: Pt = [X(0.6), Y(0.5)];
  const left: Quad = { nt: [X(-0.1), Y(-0.1)], nb: [X(-0.1), Y(1.05)], ft, fb };
  const right: Quad = { nt: [X(1.1), Y(-0.1)], nb: [X(1.1), Y(1.05)], ft: ft2, fb: fb2 };
  // ceiling, floor, walls
  poly(mid, [X(-0.1), Y(-0.1), X(1.1), Y(-0.1), ft2[0], ft2[1], ft[0], ft[1]], '#090404');
  const fl = mid.createLinearGradient(0, Y(0.5), 0, h); fl.addColorStop(0, '#100506'); fl.addColorStop(1, '#090404');
  poly(mid, [X(-0.1), Y(1.05), X(1.1), Y(1.05), fb2[0], fb2[1], fb[0], fb[1]], '#030303'); mid.fillStyle = fl;
  mid.beginPath(); mid.moveTo(X(-0.1), Y(1.05)); mid.lineTo(X(1.1), Y(1.05)); mid.lineTo(fb2[0], fb2[1]); mid.lineTo(fb[0], fb[1]); mid.closePath(); mid.fill();
  qfill(mid, left, 0, 1, 0, 1, '#0c0505'); qfill(mid, right, 0, 1, 0, 1, '#0c0405');
  // back wall with the vault door
  box(mid, ft[0], ft[1], ft2[0] - ft[0], fb[1] - ft[1], '#0e0506');
  mid.beginPath(); mid.arc(X(0.52), Y(0.405), Y(0.075), 0, Math.PI * 2); mid.fillStyle = '#140607'; mid.fill();
  mid.beginPath(); mid.arc(X(0.52), Y(0.405), Y(0.062), 0, Math.PI * 2); mid.fillStyle = '#1a0708'; mid.fill();
  for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; line(mid, X(0.52), Y(0.405), X(0.52) + Math.cos(a) * Y(0.045), Y(0.405) + Math.sin(a) * Y(0.045), '#0e0505', Y(0.006)); }
  // racks along both walls
  const bounds: number[] = []; for (let k = 0; k <= 12; k++) bounds.push(persp(k / 12, 6));
  for (const [q, side] of [[left, -1], [right, 1]] as const) {
    for (let k = 0; k < 12; k++) {
      const u0 = bounds[k] + 0.004; const u1 = bounds[k + 1] - 0.004;
      if (side < 0 && k === 3) continue; // bare section for the protector panel
      const g = mid.createLinearGradient(...qp(q, u0, 0), ...qp(q, u1, 0));
      g.addColorStop(0, '#110506'); g.addColorStop(1, '#0d0505');
      qfill(mid, q, u0, u1, 0.14, 0.93, g);
      for (let row = 0; row < 14; row++) {
        const v = 0.18 + row * 0.052;
        qfill(mid, q, u0, u1, v, v + 0.004, 'rgba(3, 3, 3,0.5)');
        if (r() < 0.75) {
          const n = 3 + Math.floor(r() * 4);
          for (let i = 0; i < n; i++) {
            const uu = lerp(u0, u1, 0.1 + r() * 0.8); const pt = qp(q, uu, v + 0.02);
            const col = r() < 0.08 ? '225,0,22' : r() < 0.3 ? '228,215,210' : '242,238,233';
            const sz = Math.max(0.8, (1 - uu) * Y(0.006));
            box(S, pt[0], pt[1], sz, sz, rgba(col, 0.95));
            if (r() < 0.25) light(L, pt[0], pt[1], sz * 8, col, 0.25);
          }
        }
      }
      // frost along the top edge
      const a = qp(q, u0, 0.14); const b = qp(q, u1, 0.14);
      speckle(mid, Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]) + Y(0.01), 30, 'rgba(250, 249, 247,0.35)', r, 1.2);
    }
  }
  // ceiling tubes (flicker layer) with shafts and floor pools
  for (let k = 0; k < 8; k++) {
    const u = persp(k / 8 + 0.03, 6);
    const y = lerp(Y(-0.05), Y(0.3), u); const hw = lerp(X(0.09), X(0.012), u);
    const tw = Math.max(1.2, lerp(Y(0.012), Y(0.002), u));
    box(S, X(0.52) - hw, y, hw * 2, tw, k === 2 ? '#faf8f6' : '#fdfcfb');
    light(L, X(0.52), y, hw * 3, '252,251,250', 0.35);
    const fy = lerp(Y(1.05), Y(0.5), u);
    shaft(p.atmo, X(0.52), y, hw * 1.6, X(0.52), lerp(y, fy, 0.55), hw * 3.5, '251,249,247', 0.025);
    pool(L, X(0.52), fy, hw * 2.8, hw * 0.5, '251,249,247', 0.12);
  }
  // cable trays on the ceiling
  for (const off of [-0.18, 0.18]) line(mid, X(0.52 + off * 3.5), Y(-0.05), X(0.52 + off * 0.35), Y(0.3), '#070404', Y(0.012));
  for (let k = 0; k < 5; k++) { const u = persp(k / 5 + 0.1, 6); cable(mid, lerp(X(-0.1), ft[0], u), lerp(Y(-0.05), Y(0.3), u), lerp(X(1.1), ft2[0], u), lerp(Y(-0.05), Y(0.3), u), lerp(Y(0.05), Y(0.01), u), 'rgba(3, 3, 3,0.7)', Math.max(1, lerp(3, 0.6, u))); }

  // protector panel on the left wall (bare section)
  const pq = (u: number, v: number): Pt => qp(left, u, v);
  const u0 = bounds[3] + 0.06; const u1 = bounds[4] - 0.06;
  const pa = pq(u0, 0.38); const pb = pq(u1, 0.4); const pc = pq(u1, 0.6); const pd = pq(u0, 0.62);
  poly(mid, [pa[0], pa[1], pb[0], pb[1], pc[0], pc[1], pd[0], pd[1]], '#1c0709');
  poly(mid, [pa[0] + 3, pa[1] + 3, pb[0] - 3, pb[1] + 3, pc[0] - 3, pc[1] - 3, pd[0] + 3, pd[1] - 3], '#0d0505');
  for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
    const pt = pq(lerp(u0, u1, 0.2 + col * 0.28), 0.43 + row * 0.055);
    box(mid, pt[0], pt[1], Y(0.012), Y(0.03), row === 1 && col === 1 ? '#4d3a3b' : '#22080a');
    if (row === 1 && col === 1) box(mid, pt[0] + 1, pt[1] + Y(0.012), Y(0.01), 1, 'rgba(255,255,255,0.6)');
  }
  poly(mid, [pa[0], pa[1], pd[0], pd[1], pd[0] - X(0.05), pd[1] + Y(0.03), pa[0] - X(0.05), pa[1] - Y(0.02)], '#160607'); // open door
  for (let s = 0; s < 6; s++) { const t = s / 6; poly(mid, [lerp(pa[0], pb[0], t), pa[1] - Y(0.012), lerp(pa[0], pb[0], t + 0.08), pa[1] - Y(0.012), lerp(pa[0], pb[0], t + 0.08), pa[1] - Y(0.004), lerp(pa[0], pb[0], t), pa[1] - Y(0.004)], s % 2 ? '#0a0405' : '#e85965'); }
  // corridor camera
  const cam = qp(right, bounds[2], 0.25);
  box(mid, cam[0] - X(0.01), cam[1] - Y(0.03), X(0.004), Y(0.03), '#120606');
  poly(mid, [cam[0] - X(0.035), cam[1] - Y(0.012), cam[0] + X(0.01), cam[1] - Y(0.02), cam[0] + X(0.012), cam[1] + Y(0.016), cam[0] - X(0.033), cam[1] + Y(0.02)], '#190708');
  mid.beginPath(); mid.arc(cam[0] - X(0.036), cam[1] + Y(0.004), Y(0.012), 0, Math.PI * 2); mid.fillStyle = '#080404'; mid.fill();
  box(S, cam[0] + X(0.002), cam[1] - Y(0.01), Y(0.006), Y(0.006), '#c30618');
  light(L, cam[0] + X(0.004), cam[1] - Y(0.008), X(0.03), '197,6,24', 0.6);

  // feed rig: reclining chair, console tower, scorch
  const rg = mid.createRadialGradient(X(0.52), Y(0.56), 0, X(0.52), Y(0.56), X(0.12));
  rg.addColorStop(0, 'rgba(3, 3, 3,0.85)'); rg.addColorStop(0.5, 'rgba(10, 4, 5,0.5)'); rg.addColorStop(1, 'rgba(3, 3, 3,0)');
  mid.fillStyle = rg; mid.fillRect(X(0.38), Y(0.4), X(0.28), Y(0.34));
  vgrad(mid, X(0.565), Y(0.44), X(0.045), Y(0.27), [[0, '#23080a'], [1, '#120506']]);
  box(mid, X(0.565), Y(0.44), X(0.045), 1.5, 'rgba(255,255,255,0.15)');
  for (let k = 0; k < 7; k++) box(mid, X(0.572), Y(0.46 + k * 0.032), X(0.03), Y(0.012), '#090404');
  vgrad(mid, X(0.565), Y(0.44), X(0.045), Y(0.14), [[0, 'rgba(6, 3, 4,0.8)'], [1, 'rgba(6, 3, 4,0)']]);
  box(S, X(0.6), Y(0.475), Y(0.006), Y(0.006), '#7d131c');
  mid.save(); mid.lineWidth = Y(0.01); mid.strokeStyle = '#150607'; mid.beginPath(); mid.moveTo(X(0.575), Y(0.45)); mid.quadraticCurveTo(X(0.52), Y(0.4), X(0.47), Y(0.47)); mid.stroke(); mid.restore();
  mid.beginPath(); mid.ellipse(X(0.468), Y(0.49), X(0.022), Y(0.018), 0.2, 0, Math.PI * 2); mid.strokeStyle = '#22080a'; mid.lineWidth = Y(0.006); mid.stroke();
  mid.fillStyle = '#180608';
  mid.beginPath(); mid.moveTo(X(0.44), Y(0.52)); mid.quadraticCurveTo(X(0.44), Y(0.5), X(0.465), Y(0.505)); mid.lineTo(X(0.58), Y(0.6)); mid.lineTo(X(0.6), Y(0.64)); mid.lineTo(X(0.47), Y(0.6)); mid.closePath(); mid.fill();
  hgrad(mid, X(0.44), Y(0.5), X(0.16), Y(0.14), [[0, 'rgba(255,255,255,0.04)'], [1, 'rgba(3, 3, 3,0.3)']]);
  box(mid, X(0.515), Y(0.6), X(0.014), Y(0.1), '#190708'); poly(mid, [X(0.455), Y(0.5), X(0.47), Y(0.495), X(0.475), Y(0.52), X(0.452), Y(0.53)], '#2c0a0d');
  poly(mid, [X(0.48), Y(0.71), X(0.56), Y(0.71), X(0.55), Y(0.695), X(0.49), Y(0.695)], '#0c0405');
  speckle(mid, X(0.46), Y(0.5), X(0.12), Y(0.1), 70, 'rgba(3, 3, 3,0.6)', r, 2);
  // the work light catches the rig's edges
  mid.save(); mid.strokeStyle = 'rgba(241, 237, 231,0.75)'; mid.lineWidth = Math.max(1, Y(0.003)); mid.lineCap = 'round';
  mid.beginPath(); mid.moveTo(X(0.465), Y(0.506)); mid.lineTo(X(0.58), Y(0.6)); mid.lineTo(X(0.6), Y(0.64)); mid.stroke();
  mid.beginPath(); mid.moveTo(X(0.565), Y(0.442)); mid.lineTo(X(0.565), Y(0.71)); mid.stroke();
  mid.strokeStyle = 'rgba(241, 237, 231,0.4)'; mid.beginPath(); mid.moveTo(X(0.575), Y(0.452)); mid.quadraticCurveTo(X(0.52), Y(0.403), X(0.472), Y(0.471)); mid.stroke();
  mid.restore();
  // a curl of soot-stained cable from the burned console
  cable(mid, X(0.565), Y(0.6), X(0.62), Y(0.7), Y(0.03), '#050303', 2);

  // forensic work light on a tripod, aimed at the rig
  for (const [fx, fy] of [[0.72, 0.76], [0.79, 0.76], [0.755, 0.79]] as const) line(mid, X(0.755), Y(0.6), X(fx), Y(fy), '#0f0506', 2);
  line(mid, X(0.755), Y(0.6), X(0.755), Y(0.45), '#0f0506', 2.5);
  poly(mid, [X(0.73), Y(0.43), X(0.77), Y(0.425), X(0.775), Y(0.46), X(0.735), Y(0.465)], '#160607');
  poly(mid, [X(0.73), Y(0.433), X(0.734), Y(0.462), X(0.728), Y(0.46), X(0.725), Y(0.436)], '#fbfaf9');
  light(L, X(0.728), Y(0.447), X(0.06), '250,249,247', 0.9);
  shaft(L, X(0.727), Y(0.447), Y(0.03), X(0.53), Y(0.58), X(0.12), '243,240,235', 0.035);
  pool(L, X(0.52), Y(0.62), X(0.15), Y(0.06), '241,237,231', 0.22);
  light(L, X(0.52), Y(0.56), X(0.14), '241,237,231', 0.15);

  // floor: evidence tape outline, tents, the reader cart, the black box
  floorSeams(mid, w, Y(0.5), h, X(0.52), Y(0.4), 4, 'rgba(3, 3, 3,0.25)', 6);
  speckle(mid, 0, Y(0.55), w, Y(0.45), 500, 'rgba(248, 246, 244,0.06)', r, 1.5);
  fg.save(); fg.strokeStyle = 'rgba(234, 224, 219,0.85)'; fg.lineWidth = Math.max(1.5, Y(0.006)); fg.lineJoin = 'round';
  const outline: Pt[] = [[0.38, 0.84], [0.385, 0.815], [0.405, 0.81], [0.42, 0.79], [0.45, 0.785], [0.47, 0.79], [0.5, 0.775], [0.52, 0.78], [0.5, 0.8], [0.515, 0.82], [0.49, 0.83], [0.47, 0.845], [0.48, 0.87], [0.46, 0.88], [0.43, 0.865], [0.4, 0.875], [0.39, 0.86]];
  fg.beginPath(); outline.forEach(([a, b], i) => (i ? fg.lineTo(X(a), Y(b)) : fg.moveTo(X(a), Y(b)))); fg.closePath(); fg.stroke(); fg.restore();
  const tent = (x: number, y: number, n: string): void => {
    poly(fg, [X(x) - Y(0.014), Y(y), X(x) + Y(0.014), Y(y), X(x) + Y(0.009), Y(y) - Y(0.026), X(x) - Y(0.009), Y(y) - Y(0.026)], '#d5bcba');
    flatText(fg, n, X(x), Y(y) - Y(0.012), Y(0.018), '#0a0405', 'center', 600, 'IBM Plex Mono');
  };
  tent(0.36, 0.86, '1'); tent(0.55, 0.83, '2'); tent(0.62, 0.77, '3'); tent(0.7, 0.79, '4');
  // reader cart
  box(fg, X(0.31), Y(0.7), X(0.1), Y(0.012), '#463031');
  for (const fx of [0.315, 0.4]) box(fg, X(fx), Y(0.712), X(0.004), Y(0.1), '#21080a');
  box(fg, X(0.31), Y(0.78), X(0.1), Y(0.008), '#21080a');
  poly(fg, [X(0.325), Y(0.7), X(0.395), Y(0.7), X(0.39), Y(0.655), X(0.33), Y(0.655)], '#120606');
  box(fg, X(0.33), Y(0.68), X(0.06), Y(0.02), '#0a0405');
  vgrad(fg, X(0.34), Y(0.664), X(0.04), Y(0.026), [[0, '#9c6b6d'], [1, '#63383a']]);
  for (let k = 0; k < 3; k++) box(fg, X(0.345), Y(0.669 + k * 0.006), X(0.025 - k * 0.005), 1, 'rgba(252, 251, 249,0.8)');
  light(L, X(0.36), Y(0.675), X(0.07), '242,238,233', 0.35);
  cable(fg, X(0.39), Y(0.69), X(0.44), Y(0.8), Y(0.04), '#080404', 1.4);
  // black box with tag
  box(fg, X(0.64), Y(0.72), X(0.042), Y(0.034), '#a40c1a');
  box(fg, X(0.64), Y(0.72), X(0.042), Y(0.004), '#c50618');
  box(fg, X(0.65), Y(0.712), X(0.022), Y(0.008), '#0d0505');
  poly(fg, [X(0.682), Y(0.73), X(0.7), Y(0.735), X(0.698), Y(0.75), X(0.68), Y(0.745)], '#f6f3ef');

  hazeBand(p.atmo, 0, Y(0.62), w, Y(0.3), '242,238,233', 0.035);
  hazeBand(p.atmo, 0, Y(0.78), w, Y(0.2), '246,244,240', 0.03);
  return {
    floorY: 0.52, reflect: 0.4, puddles: true, farBlur: 0, signsBehind: false, signsMasked: false, flicker: 0.35,
    rain: [], wind: 0, near: false, rainA: 0,
    glass: [], drops: 0, splash: [], drips: [[0.3, 0.1, 0.65], [0.68, 0.14, 0.6], [0.47, 0.32, 0.25]], steam: [], dust: [{ x: 0.45, y: 0.3, w: 0.3, h: 0.35 }],
    grade: { mid: '236,228,223', midA: 0.2, shadow: '13,5,5', lift: 0.07, vignette: 0.7, bloom: 0.45 },
  };
}

// ------------------------------------------------------------------ ANNEX
function annex(p: Paint): SceneSpec {
  const { w, h, r, far, mid } = p; const L = p.light; const S = p.signs;
  const X = (f: number): number => f * w; const Y = (f: number): number => f * h;
  const WX0 = 0.6; const WX1 = 0.86; const WY0 = 0.06; const WY1 = 0.68;
  // across the street: a close facade with a fire escape
  vgrad(far, 0, 0, w, h, [[0, '#060404'], [1, '#080404']]);
  building(far, X(0.52), Y(0.9), X(0.42), Y(0.95), r, { col: '#0a0405', lit: 0.3, dim: 0.4, escape: true, ac: true, rows: 7 });
  city(p, far, { horizon: 0.7, x0: 0.52, x1: 0.95, glow: '125,19,28', signs: 0.2, tall: 0.6, street: false });
  building(far, X(0.6), Y(1.0), X(0.3), Y(0.9), r, { col: '#080404', lit: 0.25, dim: 0.35, escape: true, ac: true, rows: 6 });
  fireEscape(far, X(0.62), Y(0.2), X(0.12), 4, Y(0.13), '#050303', 1.5);
  // the Undertow sign (live, behind the window frame)
  box(S, X(0.725) - Y(0.035), Y(0.1), Y(0.07), Y(0.46), 'rgba(8, 4, 4,0.95)');
  neonScript(S, 'undertow', X(0.725), Y(0.33), Y(0.042), '125,19,28', { vertical: true });
  neonText(S, 'UNDERTOW', X(0.73), Y(0.6), Y(0.045), '242,238,233');
  light(S, X(0.725), Y(0.33), X(0.3), '125,19,28', 0.32);
  light(S, X(0.73), Y(0.6), X(0.18), '242,238,233', 0.22);

  // room: back wall, window hole, side wall
  vgrad(mid, 0, 0, w, Y(0.74), [[0, '#0c0505'], [1, '#0f0506']]);
  stains(mid, 0, Y(0.0), w, Y(0.5), 30, r, 'rgba(3, 3, 3,0.12)');
  mid.clearRect(X(WX0), Y(WY0), X(WX1 - WX0), Y(WY1 - WY0));
  mid.fillStyle = 'rgba(13, 5, 5,0.22)'; mid.fillRect(X(WX0), Y(WY0), X(WX1 - WX0), Y(WY1 - WY0));
  const mull = [WX0, 0.687, 0.773, WX1]; const trans = [WY0, 0.215, 0.37, 0.525, WY1];
  for (const fx of mull) box(mid, X(fx) - X(0.005), Y(WY0), X(0.01), Y(WY1 - WY0), '#080404');
  for (const fy of trans) box(mid, X(WX0), Y(fy) - Y(0.005), X(WX1 - WX0), Y(0.01), '#080404');
  box(mid, X(WX0) - X(0.012), Y(WY1), X(WX1 - WX0 + 0.024), Y(0.02), '#140607');
  poly(mid, [X(0.9), 0, w, 0, w, Y(0.82), X(0.9), Y(0.74)], '#0d0505');
  zone(p, { x: WX0, y: WY0, w: WX1 - WX0, h: WY1 - WY0 });
  cut(p, (m) => { for (const fx of mull) m.fillRect(X(fx) - X(0.005), Y(WY0), X(0.01), Y(WY1 - WY0)); for (const fy of trans) m.fillRect(X(WX0), Y(fy) - Y(0.005), X(WX1 - WX0), Y(0.01)); });

  // floor and the projected window light
  vgrad(mid, 0, Y(0.74), w, Y(0.26), [[0, '#130606'], [1, '#090404']]);
  floorSeams(mid, w, Y(0.74), h, X(0.45), Y(0.4), 10, 'rgba(3, 3, 3,0.25)', 5);
  { const pg = L.createLinearGradient(0, Y(0.76), 0, Y(1.0)); pg.addColorStop(0, 'rgba(125, 19, 28,0.13)'); pg.addColorStop(1, 'rgba(125, 19, 28,0.03)'); L.save(); L.filter = 'blur(3px)'; L.fillStyle = pg; L.beginPath(); L.moveTo(X(0.56), Y(0.76)); L.lineTo(X(0.86), Y(0.76)); L.lineTo(X(0.72), Y(1.0)); L.lineTo(X(0.18), Y(1.0)); L.closePath(); L.fill(); L.restore(); }
  for (let k = 1; k < 3; k++) { const t = k / 3; poly(L, [lerp(X(0.56), X(0.86), t) - 2, Y(0.76), lerp(X(0.56), X(0.86), t) + 2, Y(0.76), lerp(X(0.18), X(0.72), t) + 6, Y(1.0), lerp(X(0.18), X(0.72), t) - 6, Y(1.0)], 'rgba(3, 3, 3,0.4)'); }
  shaft(p.atmo, X(0.73), Y(0.37), X(0.26), X(0.45), Y(0.95), X(0.55), '135,17,28', 0.08);
  light(L, X(0.73), Y(0.4), X(0.45), '125,19,28', 0.18);
  light(L, X(0.95), Y(0.4), X(0.15), '125,19,28', 0.15);

  // shelving units with archive boxes
  for (const [sx, sw] of [[0.0, 0.25], [0.27, 0.29]] as const) {
    box(mid, X(sx), Y(0.1), X(sw), Y(0.64), '#0a0404');
    for (let s = 0; s < 6; s++) {
      const sy = Y(0.2 + s * 0.1);
      box(mid, X(sx), sy, X(sw), Y(0.01), '#21080a'); box(mid, X(sx), sy, X(sw), 1, 'rgba(255,255,255,0.15)');
      let bx = X(sx + 0.005);
      while (bx < X(sx + sw - 0.02)) {
        const kind = r(); const bw = X(kind < 0.7 ? 0.03 + r() * 0.015 : 0.008 + r() * 0.006); const bh = Y(kind < 0.7 ? 0.055 + r() * 0.02 : 0.07);
        const col = kind < 0.7 ? ['#26090b', '#1f0809', '#1a0708', '#460e12'][Math.floor(r() * 4)] : ['#140607', '#120606', '#170607'][Math.floor(r() * 3)];
        box(mid, bx, sy - bh, bw, bh, col);
        hgrad(mid, bx, sy - bh, bw, bh, [[0, 'rgba(255,255,255,0.06)'], [1, 'rgba(3, 3, 3,0.3)']]);
        if (kind < 0.7) { box(mid, bx + bw * 0.25, sy - bh * 0.7, bw * 0.5, bh * 0.25, '#efe9e3'); box(mid, bx + bw * 0.3, sy - bh * 0.6, bw * 0.3, 1, 'rgba(3, 3, 3,0.5)'); }
        bx += bw + 1;
      }
    }
    box(mid, X(sx), Y(0.1), X(0.006), Y(0.64), '#180608'); box(mid, X(sx + sw) - X(0.006), Y(0.1), X(0.006), Y(0.64), '#180608');
  }
  // rim light from the window on the shelf edges
  box(L, X(0.554), Y(0.1), X(0.004), Y(0.64), 'rgba(125, 19, 28,0.35)');
  // rolling ladder
  line(mid, X(0.5), Y(0.08), X(0.53), Y(0.74), '#180708', 3); line(mid, X(0.535), Y(0.08), X(0.565), Y(0.74), '#180708', 3);
  for (let k = 0; k < 10; k++) { const t = 0.05 + k * 0.1; line(mid, lerp(X(0.5), X(0.53), t), lerp(Y(0.08), Y(0.74), t), lerp(X(0.535), X(0.565), t), lerp(Y(0.08), Y(0.74), t), '#21080a', 2); }
  // tool locker with its door open
  vgrad(mid, X(0.085), Y(0.38), X(0.11), Y(0.36), [[0, '#25090b'], [1, '#180708']]);
  box(mid, X(0.092), Y(0.39), X(0.096), Y(0.34), '#0b0405');
  for (let k = 0; k < 4; k++) box(mid, X(0.095), Y(0.43 + k * 0.07), X(0.09), Y(0.004), '#150607');
  box(mid, X(0.1), Y(0.45), X(0.06), Y(0.18), '#652e31');
  for (let k = 0; k < 6; k++) { const tx = X(0.105 + k * 0.009); if (k === 3) { box(mid, tx, Y(0.47), X(0.004), Y(0.12), 'rgba(3, 3, 3,0.35)'); continue; } box(mid, tx, Y(0.47), X(0.004), Y(0.1 + (k % 2) * 0.02), '#baa6a4'); }
  poly(mid, [X(0.085), Y(0.38), X(0.085), Y(0.74), X(0.04), Y(0.77), X(0.04), Y(0.36)], '#20080a');
  for (let k = 0; k < 5; k++) line(mid, X(0.05), Y(0.4 + k * 0.012), X(0.078), Y(0.395 + k * 0.012), 'rgba(3, 3, 3,0.6)', 1.4);
  light(L, X(0.14), Y(0.46), X(0.08), '238,232,226', 0.18);

  // a cart with a small lamp
  box(mid, X(0.44), Y(0.66), X(0.1), Y(0.01), '#2b0a0d');
  box(mid, X(0.45), Y(0.6), X(0.04), Y(0.06), '#26090b'); box(mid, X(0.495), Y(0.62), X(0.035), Y(0.04), '#1f0809');
  for (const fx of [0.445, 0.535]) box(mid, X(fx), Y(0.67), X(0.003), Y(0.07), '#180608');
  line(mid, X(0.52), Y(0.62), X(0.515), Y(0.575), '#470e13', 1.5);
  poly(mid, [X(0.505), Y(0.58), X(0.53), Y(0.58), X(0.525), Y(0.565), X(0.51), Y(0.565)], '#110506');
  light(L, X(0.517), Y(0.585), X(0.12), '228,214,210', 0.4);
  pool(L, X(0.5), Y(0.66), X(0.07), Y(0.01), '228,214,210', 0.35);
  // an exit sign over the far door
  box(S, X(0.32), Y(0.04), X(0.05), Y(0.03), 'rgba(13, 5, 5,0.9)');
  neonScript(S, 'ute', X(0.345), Y(0.048), Y(0.012), '224,207,203');

  figure(p, X(0.36), Y(0.83), { h: Y(0.42), coat: 0.55, broad: 0.85, arms: 'side', reflect: 0.25, rims: [{ rgb: '125,19,28', dx: 1, dy: -0.25, a: 0.85 }, { rgb: '242,238,233', dx: 0.3, dy: -1, a: 0.3 }] });
  return {
    floorY: 0.74, reflect: 0.22, puddles: false, farBlur: 4, signsBehind: true, signsMasked: true, flicker: 0.6,
    rain: [{ x: WX0, y: WY0, w: WX1 - WX0, h: WY1 - WY0 }], wind: 0.06, near: false, rainA: 0.6,
    glass: [{ x: WX0, y: WY0, w: WX1 - WX0, h: WY1 - WY0 }], drops: 1.2, splash: [], drips: [], steam: [], dust: [{ x: 0.4, y: 0.35, w: 0.35, h: 0.5 }],
    grade: { mid: '141,16,28', midA: 0.12, shadow: '9,4,4', lift: 0.06, vignette: 0.65, bloom: 0.45 },
  };
}

// ------------------------------------------------------------------ DOCK
function dock(p: Paint): SceneSpec {
  const { w, h, r, far, mid, fg } = p; const L = p.light; const S = p.signs;
  const X = (f: number): number => f * w; const Y = (f: number): number => f * h;
  const DX0 = 0.44; const DX1 = 0.92; const DT = 0.22; const DB = 0.72;
  // the alley outside
  vgrad(far, 0, 0, w, h, [[0, '#070404'], [0.6, '#0c0405'], [1, '#080404']]);
  building(far, X(0.3), Y(0.6), X(0.7), Y(0.65), r, { col: '#0b0405', lit: 0.25, dim: 0.5, escape: true, ac: true, rows: 6 });
  for (let k = 0; k < 9; k++) box(far, X(0.4 + k * 0.07), Y(0.0), 1, Y(0.6), 'rgba(3, 3, 3,0.25)');
  box(far, X(0.6), Y(0.0), X(0.008), Y(0.6), '#070404'); // downspout
  acUnit(far, X(0.48), Y(0.42), Y(0.03), '#130607'); acUnit(far, X(0.86), Y(0.38), Y(0.028), '#130607');
  cable(far, X(0.38), Y(0.3), X(1.0), Y(0.27), Y(0.05), '#050303', 1.4);
  cable(far, X(0.38), Y(0.34), X(1.0), Y(0.36), Y(0.03), '#050303', 1);
  vgrad(far, 0, Y(0.58), w, Y(0.14), [[0, '#0a0405'], [1, '#0e0506']]);
  box(far, X(0.555), Y(0.52), X(0.11), Y(0.08), '#130607'); box(far, X(0.555), Y(0.52), X(0.11), Y(0.006), '#1f0809');
  box(far, X(0.68), Y(0.596), X(0.05), Y(0.006), '#050303');
  // sodium lamp on its pole
  box(far, X(0.805), Y(0.24), X(0.006), Y(0.36), '#080404');
  line(far, X(0.808), Y(0.25), X(0.77), Y(0.255), '#080404', 3);
  poly(far, [X(0.755), Y(0.25), X(0.785), Y(0.25), X(0.78), Y(0.262), X(0.76), Y(0.262)], '#f1ede7');
  light(far, X(0.77), Y(0.262), X(0.5), '213,189,187', 0.55);
  pool(far, X(0.75), Y(0.62), X(0.25), Y(0.05), '218,197,194', 0.35);
  person(far, X(0.73), Y(0.61), { h: Y(0.15), umbrella: true, coat: 0.9, fill: '#060304', rims: [{ rgb: '218,197,194', dx: 0, dy: -1, a: 0.6 }] });
  shaft(p.atmo, X(0.77), Y(0.262), X(0.03), X(0.76), Y(0.66), X(0.32), '218,197,194', 0.12);

  // interior: corrugated wall with the opening, beams, roll door
  vgrad(mid, 0, 0, w, Y(DB), [[0, '#0b0405'], [1, '#0f0506']]);
  for (let k = 0; k < 90; k++) box(mid, X(k / 90), Y(0.08), 1, Y(DB - 0.08), k % 2 ? 'rgba(3, 3, 3,0.25)' : 'rgba(255,255,255,0.025)');
  stains(mid, 0, Y(0.1), w, Y(0.6), 24, r, 'rgba(13, 5, 5,0.15)');
  mid.clearRect(X(DX0), Y(DT), X(DX1 - DX0), Y(DB - DT));
  vgrad(mid, X(DX0) - X(0.012), Y(0.08), X(0.012), Y(DB - 0.08), [[0, '#160607'], [1, '#100506']]);
  vgrad(mid, X(DX1), Y(0.08), X(0.012), Y(DB - 0.08), [[0, '#160607'], [1, '#100506']]);
  box(mid, X(DX0) - X(0.02), Y(0.075), X(DX1 - DX0 + 0.04), Y(0.04), '#170607');
  for (let s = 0; s < 8; s++) { box(mid, X(DX0), Y(0.115 + s * 0.013), X(DX1 - DX0), Y(0.012), '#1f080a'); box(mid, X(DX0), Y(0.115 + s * 0.013), X(DX1 - DX0), 1, 'rgba(255,255,255,0.1)'); }
  box(mid, X(DX0), Y(DT) - Y(0.006), X(DX1 - DX0), Y(0.008), '#0c0505');
  for (let k = 0; k < 4; k++) { box(mid, 0, Y(0.01 + k * 0.018), w, Y(0.012), '#090404'); box(mid, 0, Y(0.022 + k * 0.018), w, 1, 'rgba(233, 224, 219,0.08)'); }
  zone(p, { x: DX0, y: DT, w: DX1 - DX0, h: DB - DT });
  // blown-in rain fades into the bay
  const g = p.mask.createLinearGradient(0, Y(DB), 0, Y(0.95));
  g.addColorStop(0, 'rgba(255,255,255,0.8)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  p.mask.fillStyle = g; p.mask.fillRect(X(DX0 - 0.03), Y(DB), X(DX1 - DX0 + 0.06), Y(0.25));
  // dock edge, hazard stripes, bumpers
  for (let k = 0; k < 24; k++) poly(mid, [X(DX0 + k * 0.02), Y(DB), X(DX0 + k * 0.02 + 0.01), Y(DB), X(DX0 + k * 0.02 + 0.014), Y(DB + 0.014), X(DX0 + k * 0.02 + 0.004), Y(DB + 0.014)], k % 2 ? '#0b0405' : '#c29d9c');
  for (const fx of [0.47, 0.885]) { box(fg, X(fx) - X(0.012), Y(0.695), X(0.024), Y(0.06), '#080404'); box(fg, X(fx) - X(0.012), Y(0.695), X(0.024), 1.2, 'rgba(255,255,255,0.12)'); }
  cut(p, (m) => { for (const fx of [0.47, 0.885]) m.fillRect(X(fx) - X(0.012), Y(0.695), X(0.024), Y(0.06)); });
  // camera box hanging just inside the header
  box(mid, X(0.698), Y(DT), X(0.004), Y(0.05), '#080404');
  poly(mid, [X(0.672), Y(0.27), X(0.728), Y(0.268), X(0.73), Y(0.325), X(0.674), Y(0.33)], '#180608');
  box(mid, X(0.678), Y(0.315), X(0.05), Y(0.006), 'rgba(3, 3, 3,0.6)');
  mid.beginPath(); mid.arc(X(0.684), Y(0.3), Y(0.012), 0, Math.PI * 2); mid.fillStyle = '#060304'; mid.fill();
  box(S, X(0.72), Y(0.277), Y(0.006), Y(0.006), '#ddcbc8');
  cut(p, (m) => { m.fillRect(X(0.672), Y(DT), X(0.06), Y(0.11)); });
  // key console on the wall
  box(mid, X(0.222), Y(0.412), X(0.116), Y(0.216), '#090404');
  vgrad(mid, X(0.226), Y(0.418), X(0.108), Y(0.204), [[0, '#21080a'], [1, '#170607']]);
  box(mid, X(0.232), Y(0.426), X(0.07), Y(0.188), '#0d0505');
  for (let row = 0; row < 4; row++) for (let k = 0; k < 4; k++) {
    const kx = X(0.24 + k * 0.016); const ky = Y(0.44 + row * 0.045);
    box(mid, kx, ky, 1.5, Y(0.008), '#978b89');
    if (!(row === 2 && k === 1)) { box(mid, kx - 1, ky + Y(0.008), 3.5, Y(0.012), '#b28282'); box(mid, kx - 2, ky + Y(0.02), 6, Y(0.012), ['#b80819', '#f6f3ef', '#b88c8c'][(row + k) % 3]); }
  }
  box(mid, X(0.31), Y(0.44), X(0.02), Y(0.014), '#0f0506');
  box(S, X(0.312), Y(0.443), X(0.016), Y(0.008), '#ddcbc8');
  for (let row = 0; row < 3; row++) for (let k = 0; k < 3; k++) box(mid, X(0.311 + k * 0.006), Y(0.47 + row * 0.014), X(0.004), Y(0.008), '#3c2022');
  light(L, X(0.32), Y(0.447), X(0.05), '221,203,200', 0.45);
  // pallets and crates on the left
  for (const [cx, cy, cw, ch] of [[0.0, 0.52, 0.12, 0.26], [0.1, 0.6, 0.1, 0.18], [0.02, 0.36, 0.09, 0.16]] as const) {
    vgrad(fg, X(cx), Y(cy), X(cw), Y(ch), [[0, '#180608'], [1, '#0f0506']]);
    for (let k = 1; k < 4; k++) box(fg, X(cx), Y(cy + (ch * k) / 4), X(cw), 1.5, 'rgba(3, 3, 3,0.45)');
    box(fg, X(cx), Y(cy), X(cw), 1.5, 'rgba(233, 224, 219,0.18)');
    paintScript(fg, 'corvane', X(cx + cw / 2), Y(cy + ch * 0.35), Y(0.014), 'rgba(6, 4, 4,0.7)');
  }
  box(fg, 0, Y(0.78), X(0.21), Y(0.02), '#110506');
  // chain hoist
  line(mid, X(0.38), Y(0.03), X(0.38), Y(0.4), '#0c0405', 2);
  for (let k = 0; k < 24; k++) box(mid, X(0.378), Y(0.04 + k * 0.015), 4, Y(0.008), k % 2 ? '#150607' : '#0f0506');
  mid.beginPath(); mid.arc(X(0.38), Y(0.41), Y(0.012), 0.2, Math.PI * 1.6); mid.strokeStyle = '#150607'; mid.lineWidth = 2.5; mid.stroke();
  // caged lamps inside
  for (const fx of [0.16, 0.32]) {
    line(mid, X(fx), Y(0.0), X(fx), Y(0.1), '#070404', 1.5);
    poly(mid, [X(fx) - X(0.018), Y(0.1), X(fx) + X(0.018), Y(0.1), X(fx) + X(0.012), Y(0.125), X(fx) - X(0.012), Y(0.125)], '#100506');
    box(S, X(fx) - X(0.006), Y(0.123), X(0.012), Y(0.008), '#f3f0eb');
    light(S, X(fx), Y(0.13), X(0.07), '233,223,218', 0.55);
    shaft(p.atmo, X(fx), Y(0.13), X(0.03), X(fx), Y(0.9), X(0.22), '228,215,211', 0.07);
    pool(L, X(fx), Y(0.86), X(0.12), Y(0.03), '228,215,211', 0.15);
  }
  // concrete floor
  vgrad(mid, 0, Y(DB), w, Y(1 - DB), [[0, '#120606'], [1, '#090404']]);
  for (let k = 0; k < 6; k++) { mid.beginPath(); mid.ellipse(X(0.2 + r() * 0.6), Y(0.8 + r() * 0.15), X(0.03 + r() * 0.06), Y(0.008 + r() * 0.01), 0, 0, Math.PI * 2); mid.fillStyle = 'rgba(3, 3, 3,0.35)'; mid.fill(); }
  floorSeams(mid, w, Y(DB), h, X(0.6), Y(0.42), 5, 'rgba(3, 3, 3,0.3)', 4);
  pool(L, X(0.68), Y(0.8), X(0.3), Y(0.06), '213,189,187', 0.18);
  light(L, X(0.68), Y(0.46), X(0.5), '213,189,187', 0.1, 0.6);
  return {
    floorY: DB, reflect: 0.55, puddles: true, farBlur: 2.2, signsBehind: false, signsMasked: false, flicker: 0.4,
    rain: [{ x: DX0, y: DT, w: DX1 - DX0, h: DB - DT }, { x: DX0 - 0.03, y: DB, w: DX1 - DX0 + 0.06, h: 0.25 }], wind: 0.35, near: true, rainA: 0.8,
    glass: [], drops: 0, splash: [{ x: DX0, y: 0.6, w: DX1 - DX0, h: 0.1 }, { x: DX0, y: DB + 0.02, w: DX1 - DX0, h: 0.15 }], drips: [[0.43, 0.115, 0.6]], steam: [[0.705, 0.6, 0.12]], dust: [],
    grade: { mid: '214,190,187', midA: 0.14, shadow: '11,4,5', lift: 0.06, vignette: 0.6, bloom: 0.45 },
  };
}

// ------------------------------------------------------------------ BAR
function bar(p: Paint): SceneSpec {
  const { w, h, r, far, mid, fg } = p; const L = p.light; const S = p.signs;
  const X = (f: number): number => f * w; const Y = (f: number): number => f * h;
  // the street beyond the culvert mouth
  city(p, far, { horizon: 0.56, x0: 0.36, x1: 0.64, glow: '242,238,233', glow2: '125,19,28', signs: 0.8, tall: 1.2 });
  vgrad(far, X(0.36), Y(0.54), X(0.28), Y(0.04), [[0, '#100506'], [1, '#090404']]);
  light(far, X(0.5), Y(0.5), X(0.16), '242,238,232', 0.45); light(far, X(0.46), Y(0.4), X(0.1), '125,19,28', 0.4);
  for (let i = 0; i < 3; i++) person(far, X(0.42 + r() * 0.16), Y(0.565), { h: Y(0.08), umbrella: true, fill: '#060304' });
  // concrete vault: draw the whole frame as concrete, then cut the mouth
  vgrad(mid, 0, 0, w, h, [[0, '#0b0405'], [0.5, '#0e0506'], [1, '#080404']]);
  const arch = (cx: number, cy: number, rx: number, ry: number): void => { mid.beginPath(); mid.ellipse(cx, cy, rx, ry, 0, Math.PI, 0); mid.lineTo(cx + rx, cy); mid.lineTo(cx - rx, cy); mid.closePath(); };
  const N = 9;
  for (let k = 0; k <= N; k++) {
    const u = persp(k / N, 4);
    const cx = X(0.5); const cy = lerp(Y(1.05), Y(0.56), u); const rx = lerp(X(0.8), X(0.1), u); const ry = lerp(Y(1.2), Y(0.27), u);
    arch(cx, cy, rx, ry); mid.fillStyle = k % 2 ? '#130607' : '#100506'; mid.fill();
    mid.save(); arch(cx, cy, rx, ry); mid.strokeStyle = 'rgba(228, 215, 211,0.16)'; mid.lineWidth = Math.max(1, lerp(10, 1, u)); mid.stroke(); mid.restore();
    mid.save(); arch(cx, cy, rx * 0.985, ry * 0.985); mid.strokeStyle = 'rgba(3, 3, 3,0.45)'; mid.lineWidth = Math.max(1, lerp(14, 1.5, u)); mid.stroke(); mid.restore();
  }
  stains(mid, 0, 0, w, Y(0.5), 40, r, 'rgba(3, 3, 3,0.12)');
  // the mouth opening
  mid.save(); mid.globalCompositeOperation = 'destination-out'; arch(X(0.5), Y(0.56), X(0.1), Y(0.27)); mid.fill(); mid.restore();
  zone(p, { x: 0.4, y: 0.29, w: 0.2, h: 0.27 });
  // pipes running along the vault
  for (const a of [0.78, 0.86]) {
    const near: Pt = [X(0.5) + Math.cos(Math.PI * (1 + a)) * X(0.8), Y(1.05) + Math.sin(Math.PI * (1 + a)) * Y(1.2)];
    const farp: Pt = [X(0.5) + Math.cos(Math.PI * (1 + a)) * X(0.1), Y(0.56) + Math.sin(Math.PI * (1 + a)) * Y(0.27)];
    line(mid, near[0], near[1], farp[0], farp[1], '#130607', Y(0.02)); line(mid, near[0], near[1] + Y(0.008), farp[0], farp[1] + 1, 'rgba(233, 223, 218,0.12)', 1.5);
  }
  // floor with the drain channel
  vgrad(mid, 0, Y(0.56), w, Y(0.44), [[0, '#0f0506'], [1, '#070404']]);
  poly(mid, [X(0.47), Y(1.0), X(0.53), Y(1.0), X(0.503), Y(0.56), X(0.497), Y(0.56)], '#060304');
  for (let k = 0; k < 14; k++) { const u = persp(k / 14, 4); const y = lerp(Y(1.0), Y(0.56), u); const hw = lerp(X(0.03), X(0.003), u); line(mid, X(0.5) - hw, y, X(0.5) + hw, y, '#130607', Math.max(0.8, lerp(3, 0.5, u))); }

  // back bar: shelves of backlit bottles on the right
  box(mid, X(0.62), Y(0.24), X(0.38), Y(0.3), '#080404');
  hgrad(L, X(0.62), Y(0.24), X(0.38), Y(0.3), [[0, 'rgba(218, 197, 194,0.05)'], [0.5, 'rgba(218, 197, 194,0.2)'], [1, 'rgba(218, 197, 194,0.08)']]);
  for (let s = 0; s < 3; s++) {
    const sy = Y(0.33 + s * 0.09);
    box(mid, X(0.62), sy, X(0.38), Y(0.008), '#180608'); box(L, X(0.62), sy - Y(0.004), X(0.38), Y(0.004), 'rgba(228, 214, 210,0.35)');
    let bx = X(0.63);
    while (bx < X(0.99)) {
      const bw = X(0.008 + r() * 0.006); const bh = Y(0.045 + r() * 0.025);
      const glass = ['67,13,18', '36,8,11', '135,82,85', '123,19,29', '205,175,174'][Math.floor(r() * 5)];
      mid.fillStyle = rgba(glass, 0.85);
      mid.beginPath(); mid.moveTo(bx, sy); mid.lineTo(bx, sy - bh * 0.62); mid.quadraticCurveTo(bx, sy - bh * 0.75, bx + bw * 0.35, sy - bh * 0.8); mid.lineTo(bx + bw * 0.35, sy - bh); mid.lineTo(bx + bw * 0.65, sy - bh); mid.lineTo(bx + bw * 0.65, sy - bh * 0.8); mid.quadraticCurveTo(bx + bw, sy - bh * 0.75, bx + bw, sy - bh * 0.62); mid.lineTo(bx + bw, sy); mid.fill();
      box(L, bx + bw * 0.2, sy - bh * 0.55, Math.max(1, bw * 0.15), bh * 0.45, rgba(glass === '205,175,174' ? '247,244,241' : '233,223,218', 0.35));
      bx += bw + X(0.003);
    }
  }
  // the sign over the bar
  box(mid, X(0.67), Y(0.14), X(0.3), Y(0.09), '#070404');
  neonText(S, 'SUMP LANTERN', X(0.82), Y(0.17), Y(0.045), '242,238,233');
  neonScript(S, 'sump lantern', X(0.82), Y(0.205), Y(0.014), '125,19,28');
  light(S, X(0.82), Y(0.18), X(0.3), '242,238,233', 0.2);
  // bartender behind the counter, then the counter
  person(fg, X(0.86), Y(0.78), { h: Y(0.4), broad: 1.1, coat: 0.2, rims: [{ rgb: '223,206,202', dx: -1, dy: -0.4, a: 0.6 }, { rgb: '242,238,233', dx: 0, dy: -1, a: 0.3 }] });
  box(fg, X(0.92), Y(0.5), X(0.03), Y(0.045), '#150607'); // kettle
  poly(fg, [X(0.47), Y(0.545), X(1.02), Y(0.545), X(1.02), Y(0.565), X(0.46), Y(0.565)], '#160607');
  box(fg, X(0.46), Y(0.545), X(0.56), Y(0.003), 'rgba(233, 223, 218,0.5)');
  vgrad(fg, X(0.46), Y(0.565), X(0.56), Y(0.2), [[0, '#0d0505'], [1, '#070404']]);
  for (let k = 0; k < 7; k++) box(fg, X(0.47 + k * 0.08), Y(0.565), 1.5, Y(0.2), 'rgba(3, 3, 3,0.5)');
  box(fg, X(0.46), Y(0.745), X(0.56), Y(0.008), '#470e13');
  // the paper till
  poly(fg, [X(0.657), Y(0.545), X(0.743), Y(0.545), X(0.736), Y(0.488), X(0.664), Y(0.488)], '#150607');
  for (let row = 0; row < 3; row++) for (let k = 0; k < 6; k++) { fg.beginPath(); fg.arc(X(0.672 + k * 0.011), Y(0.5 + row * 0.014), Y(0.004), 0, Math.PI * 2); fg.fillStyle = '#efe9e3'; fg.fill(); }
  box(fg, X(0.67), Y(0.462), X(0.06), Y(0.026), '#0e0505');
  box(S, X(0.676), Y(0.468), X(0.034), Y(0.012), '#ddcbc8');
  fg.beginPath(); fg.ellipse(X(0.72), Y(0.462), X(0.012), Y(0.008), 0, 0, Math.PI * 2); fg.fillStyle = '#f6f3ef'; fg.fill();
  poly(fg, [X(0.713), Y(0.462), X(0.727), Y(0.462), X(0.732), Y(0.44), X(0.718), Y(0.44)], '#f6f3ef');
  light(L, X(0.7), Y(0.47), X(0.05), '221,203,200', 0.5);
  // lanterns strung down the vault
  for (let k = 0; k < 9; k++) {
    const u = persp(k / 9 + 0.04, 4);
    const lx = X(0.5) + Math.sin(k * 1.3) * lerp(X(0.04), X(0.004), u); const ly = lerp(Y(0.08), Y(0.31), u); const s = lerp(Y(0.05), Y(0.008), u);
    line(mid, lx, ly - s * 2, lx, ly - s * 0.6, '#070404', Math.max(0.6, s * 0.06));
    box(mid, lx - s * 0.5, ly - s * 0.6, s, s * 1.2, '#100506');
    box(S, lx - s * 0.32, ly - s * 0.42, s * 0.64, s * 0.84, '#ede6e0');
    for (let b = 0; b < 3; b++) box(mid, lx - s * 0.32 + b * s * 0.27, ly - s * 0.42, Math.max(0.5, s * 0.06), s * 0.84, '#100506');
    light(S, lx, ly, s * 10, '218,197,194', 0.45);
  }
  cable(mid, X(0.42), Y(-0.02), X(0.5), Y(0.31), Y(0.02), '#070404', 1);
  // high table and patron
  fg.beginPath(); fg.ellipse(X(0.255), Y(0.6), X(0.05), Y(0.012), 0, 0, Math.PI * 2); fg.fillStyle = '#110506'; fg.fill();
  box(fg, X(0.252), Y(0.6), X(0.006), Y(0.2), '#0a0405');
  fg.beginPath(); fg.ellipse(X(0.255), Y(0.805), X(0.03), Y(0.008), 0, 0, Math.PI * 2); fg.fill();
  box(fg, X(0.268), Y(0.574), X(0.012), Y(0.024), 'rgba(217, 196, 193,0.7)');
  light(L, X(0.274), Y(0.585), X(0.03), '217,196,193', 0.5);
  person(fg, X(0.08), Y(0.86), { h: Y(0.36), coat: 0.6, hat: 'brim', fill: '#050303', rims: [{ rgb: '218,197,194', dx: 0.8, dy: -1, a: 0.4 }] });
  figure(p, X(0.34), Y(0.81), { h: Y(0.4), coat: 0.8, broad: 0.95, arms: 'side', reflect: 0.45, rims: [{ rgb: '223,206,202', dx: -0.5, dy: -1, a: 0.6 }, { rgb: '242,238,233', dx: 1, dy: -0.3, a: 0.5 }] });
  light(L, X(0.5), Y(0.42), X(0.22), '247,244,241', 0.18);
  hazeBand(p.atmo, 0, Y(0.3), w, Y(0.3), '218,198,195', 0.03);
  return {
    floorY: 0.565, reflect: 0.45, puddles: true, farBlur: 5, signsBehind: false, signsMasked: false, flicker: 0.45,
    rain: [{ x: 0.4, y: 0.29, w: 0.2, h: 0.27 }], wind: 0.05, near: false, rainA: 0.7,
    glass: [], drops: 0, splash: [{ x: 0.41, y: 0.54, w: 0.18, h: 0.03 }], drips: [[0.3, 0.12, 0.66], [0.6, 0.08, 0.45], [0.42, 0.26, 0.5]], steam: [[0.935, 0.49, 0.09]], dust: [],
    grade: { mid: '218,198,195', midA: 0.15, shadow: '9,4,4', lift: 0.05, vignette: 0.65, bloom: 0.5 },
  };
}

// ------------------------------------------------------------------ STREET (title)
function street(p: Paint): SceneSpec {
  const { w, h, r, far, mid, fg } = p; const L = p.light; const S = p.signs;
  const X = (f: number): number => f * w; const Y = (f: number): number => f * h;
  const V: Pt = [X(0.58), Y(0.47)];
  // far end of the street: towers, an elevated rail, haze
  city(p, far, { horizon: 0.48, x0: 0.3, x1: 0.85, glow: '125,19,28', glow2: '242,238,233', signs: 0.6, tall: 1.5 });
  box(far, X(0.3), Y(0.36), X(0.55), Y(0.025), '#060404');
  for (let k = 0; k < 14; k++) box(far, X(0.42 + k * 0.012), Y(0.366), X(0.008), Y(0.01), 'rgba(244, 241, 237,0.75)');
  for (let k = 0; k < 6; k++) box(far, X(0.33 + k * 0.1), Y(0.385), X(0.008), Y(0.1), '#060404');
  for (let k = 0; k < 8; k++) { bokeh(far, V[0] + (r() - 0.5) * X(0.08), Y(0.47 + r() * 0.01), Y(0.006 + r() * 0.006), r() < 0.5 ? '251,249,248' : '203,5,24', 0.8); }
  hazeBand(far, X(0.3), Y(0.38), X(0.55), Y(0.14), '125,19,28', 0.2);

  // the two street walls in perspective
  const leftQ: Quad = { nt: [X(-0.05), Y(-0.3)], nb: [X(-0.05), Y(0.86)], ft: [X(0.44), Y(0.25)], fb: [X(0.44), Y(0.49)] };
  const rightQ: Quad = { nt: [X(1.1), Y(-0.35)], nb: [X(1.1), Y(0.92)], ft: [X(0.7), Y(0.22)], fb: [X(0.7), Y(0.49)] };
  qfill(mid, leftQ, 0, 1, 0, 1, '#090404');
  qfill(mid, rightQ, 0, 1, 0, 1, '#0c0405');
  const segs = [0, 0.2, 0.42, 0.6, 0.75, 0.87, 1];
  const cols = ['#090404', '#0b0405', '#080404', '#0b0405', '#090404', '#0b0405'];
  for (const [q, side] of [[leftQ, -1], [rightQ, 1]] as const) {
    for (let s = 0; s < segs.length - 1; s++) {
      const u0 = persp(segs[s], 3); const u1 = persp(segs[s + 1], 3) - 0.004;
      qfill(mid, q, u0, u1, 0, 1, side > 0 && s === 0 ? '#0e0505' : cols[(s + (side > 0 ? 2 : 0)) % cols.length]);
      // windows on the wall plane
      const nc = 3 + s; const nr = 12;
      for (let i = 0; i < nc; i++) for (let j = 1; j < nr - 2; j++) {
        if (side > 0 && s === 0 && j > nr - 5) continue;
        const ua = lerp(u0, u1, (i + 0.25) / nc); const ub = lerp(u0, u1, (i + 0.7) / nc);
        const va = j / nr; const vb = va + 0.045;
        const lit = r() < 0.32;
        const col = lit ? rgba(r() < 0.6 ? '228,215,211' : '245,242,238', 0.35 + r() * 0.4) : 'rgba(3, 3, 3,0.55)';
        qfill(mid, q, ua, ub, va, vb, col);
      }
      // fire escapes on the left wall
      if (side < 0 && s % 2 === 0) for (let j = 2; j < 9; j += 2) qfill(mid, q, lerp(u0, u1, 0.2), lerp(u0, u1, 0.75), j / 12 + 0.05, j / 12 + 0.056, '#050303');
      // AC units
      if (r() < 0.8) { const ua = lerp(u0, u1, 0.6); const pt = qp(q, ua, 0.3 + r() * 0.3); acUnit(mid, pt[0], pt[1], Math.max(3, (1 - ua) * Y(0.05)), 'rgba(19, 6, 7,0.95)'); }
    }
  }
  // Halcyon facade (right, nearest): stone pilasters, entrance and canopy
  for (let k = 0; k < 4; k++) qfill(mid, rightQ, persp(0.04 + k * 0.05, 3), persp(0.055 + k * 0.05, 3), 0, 0.92, 'rgba(255,255,255,0.03)');
  const c0 = qp(rightQ, persp(0.06, 3), 0.8); const c1 = qp(rightQ, persp(0.16, 3), 0.8);
  poly(mid, [c0[0], c0[1], c1[0], c1[1], c1[0] - X(0.06), c1[1] + Y(0.01), c0[0] - X(0.12), c0[1] + Y(0.02)], '#070404');
  const d0 = qp(rightQ, persp(0.075, 3), 0.82); const d1 = qp(rightQ, persp(0.15, 3), 0.98);
  poly(mid, [d0[0], d0[1], d1[0], d0[1] + Y(0.004), d1[0], d1[1], d0[0], d1[1] + Y(0.02)], '#170607');
  light(L, (d0[0] + d1[0]) / 2, (d0[1] + d1[1]) / 2, X(0.15), '228,215,211', 0.35);
  // projecting blade signs, facing the camera
  const blade = (q: Quad, u: number, v: number, word: string, rgb: string, latin?: string): void => {
    const pt = qp(q, persp(u, 3), v); const sc = 1 - persp(u, 3);
    const sz = Math.max(4, Y(0.035) * sc + Y(0.006));
    const bx = pt[0] + (q === leftQ ? sz * 0.6 : -sz * 1.8);
    box(mid, bx, pt[1], sz * 1.2, sz * (word.length * 0.8 + 1.2), '#070404');
    line(mid, q === leftQ ? pt[0] : bx + sz * 1.2, pt[1] + sz * 0.5, q === leftQ ? bx : pt[0], pt[1] + sz * 0.5, '#050303', Math.max(1, sz * 0.08));
    neonScript(S, word, bx + sz * 0.22, pt[1] + sz * 0.5, sz * 0.9, rgb, { vertical: true, align: 'left' });
    if (latin) neonText(S, latin, bx + sz * 0.6, pt[1] + sz * (word.length * 0.8 + 2), sz * 0.7, rgb);
    light(S, bx + sz * 0.6, pt[1] + sz * word.length * 0.4, sz * 9, rgb, 0.28);
  };
  blade(rightQ, 0.11, 0.25, 'halcyon', '249,247,245', 'HALCYON');
  blade(leftQ, 0.12, 0.3, 'noodle', '125,19,28');
  blade(leftQ, 0.38, 0.28, 'feeds', '242,238,233');
  blade(rightQ, 0.45, 0.3, 'okan', '221,203,200');
  blade(leftQ, 0.62, 0.35, 'sora', '125,19,28');
  blade(rightQ, 0.7, 0.35, 'lumen', '242,238,233');
  // cables across the street
  for (const u of [0.15, 0.3, 0.48, 0.66]) {
    const a = qp(leftQ, persp(u, 3), 0.12 + r() * 0.1); const b = qp(rightQ, persp(u, 3), 0.1 + r() * 0.1);
    cable(mid, a[0], a[1], b[0], b[1], (b[0] - a[0]) * 0.08, '#050303', Math.max(0.8, (1 - persp(u, 3)) * 3));
  }
  // road, sidewalks, markings
  const road = mid.createLinearGradient(0, Y(0.49), 0, h); road.addColorStop(0, '#0c0505'); road.addColorStop(1, '#060404');
  mid.fillStyle = road; mid.beginPath(); mid.moveTo(X(-0.05), Y(0.86)); mid.lineTo(X(0.44), Y(0.49)); mid.lineTo(X(0.7), Y(0.49)); mid.lineTo(X(1.1), Y(0.92)); mid.lineTo(X(1.1), h); mid.lineTo(X(-0.05), h); mid.closePath(); mid.fill();
  poly(mid, [X(-0.05), Y(0.86), X(0.44), Y(0.49), X(0.47), Y(0.49), X(0.12), Y(1.0), X(-0.05), Y(1.0)], '#0a0405');
  poly(mid, [X(1.1), Y(0.92), X(0.7), Y(0.49), X(0.67), Y(0.49), X(0.92), Y(1.0), X(1.1), Y(1.0)], '#0b0405');
  line(mid, X(0.12), Y(1.0), X(0.47), Y(0.49), 'rgba(189, 168, 166,0.25)', 1.5);
  line(mid, X(0.92), Y(1.0), X(0.67), Y(0.49), 'rgba(189, 168, 166,0.25)', 1.5);
  for (let k = 0; k < 10; k++) { const u0 = persp(k / 10, 3); const u1 = persp(k / 10 + 0.04, 3); const a = P([X(0.52), Y(1.0)], V, u0); const b = P([X(0.52), Y(1.0)], V, u1); line(mid, a[0], a[1], b[0], b[1], 'rgba(221, 202, 198,0.35)', Math.max(0.6, (1 - u0) * 5)); }
  // manhole with steam
  mid.beginPath(); mid.ellipse(X(0.5), Y(0.82), X(0.06), Y(0.015), 0, 0, Math.PI * 2); mid.fillStyle = '#070404'; mid.fill();
  mid.strokeStyle = 'rgba(233, 223, 218,0.15)'; mid.lineWidth = 1; mid.stroke();
  // street lamps on the left pavement
  for (const u of [0.1, 0.32, 0.55]) {
    const b = P([X(0.06), Y(0.9)], [X(0.455), Y(0.49)], persp(u, 3)); const sc = 1 - persp(u, 3);
    const top = b[1] - Y(0.42) * sc - Y(0.04);
    line(mid, b[0], b[1], b[0], top, '#050304', Math.max(1, sc * 5));
    line(mid, b[0], top, b[0] + X(0.05) * sc + 3, top + 2, '#050304', Math.max(1, sc * 4));
    const lx = b[0] + X(0.05) * sc + 3;
    box(mid, lx - Y(0.012) * sc - 1, top, Y(0.024) * sc + 2, Y(0.006) * sc + 1, '#fbfaf8');
    light(L, lx, top + 2, X(0.18) * sc + X(0.03), '240,236,230', 0.5);
    shaft(p.atmo, lx, top + 2, Y(0.02) * sc + 2, lx + X(0.02) * sc, b[1] + Y(0.02) * sc, X(0.2) * sc + X(0.02), '240,236,230', 0.09);
    pool(L, lx, b[1] + Y(0.02) * sc, X(0.15) * sc + X(0.02), Y(0.03) * sc + 2, '240,236,230', 0.2);
  }
  // people
  for (const [u, side] of [[0.25, -1], [0.45, 1], [0.6, -1], [0.72, 1]] as const) {
    const b = side < 0 ? P([X(0.1), Y(0.9)], [X(0.46), Y(0.49)], persp(u, 3)) : P([X(0.88), Y(0.94)], [X(0.69), Y(0.49)], persp(u, 3));
    const sc = 1 - persp(u, 3);
    person(fg, b[0], b[1], { h: Y(0.4) * sc + Y(0.02), umbrella: r() < 0.7, coat: 0.8, reflect: 0.5, rims: [{ rgb: side < 0 ? '125,19,28' : '242,238,233', dx: -side, dy: -0.5, a: 0.6 }] });
  }
  person(fg, X(0.66), Y(0.93), { h: Y(0.46), coat: 0.85, umbrella: true, reflect: 0.6, rims: [{ rgb: '125,19,28', dx: -1, dy: -0.4, a: 0.75 }, { rgb: '249,247,245', dx: 0.7, dy: -1, a: 0.4 }] });
  hazeBand(p.atmo, 0, Y(0.3), w, Y(0.3), '125,19,28', 0.08);
  light(L, V[0], Y(0.45), X(0.35), '158,13,27', 0.16);
  zone(p, { x: 0, y: 0, w: 1, h: 1 });
  return {
    floorY: 0.5, reflect: 0.7, puddles: true, farBlur: 4, signsBehind: false, signsMasked: false, flicker: 0.5,
    rain: [{ x: 0, y: 0, w: 1, h: 1 }], wind: 0.12, near: true, rainA: 0.9,
    glass: [{ x: 0, y: 0, w: 1, h: 1 }], drops: 0.25, splash: [{ x: 0, y: 0.6, w: 1, h: 0.4 }], drips: [], steam: [[0.5, 0.82, 0.22]], dust: [],
    grade: { mid: '120,20,29', midA: 0.12, shadow: '9,4,4', lift: 0.06, vignette: 0.7, bloom: 0.55 },
  };
}

export const PAINTERS: Record<SceneKey, (p: Paint) => SceneSpec> = { lobby, office, vault, annex, dock, bar, street };
