import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Fog Mesa: cross a hidden mesa to the flag at the top. The lantern shows two squares around you; every step spends water. */
const W = 9, H = 11, SZ = 48, VIS = 2;
const SAND = 0, ROCK = 1, SCRUB = 2, SPRING = 3;
const COST = [1, 99, 2, 1];

export default function fogMesa(ctx: Ctx): Instance {
  const cv = ctx.canvas(W * SZ, H * SZ + 30), g = cv.g, c = ctx.c;
  let map: number[][] = [], seen: boolean[][] = [], px = 4, py = H - 1, ex = 4, water = 0, steps = 0, drunk: Set<string> = new Set(), path: [number, number][] = [], flash = 0;

  const vis = (x: number, y: number): boolean => Math.abs(x - px) + Math.abs(y - py) <= VIS;
  function reveal(): void { for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (vis(x, y)) seen[y][x] = true; }
  function hud(): void { ctx.hud('Water', water); ctx.hud('Steps', steps); }

  /** The one action: step one square. Rock blocks; scrub costs 2 water; a spring refills once. */
  function step(dx: number, dy: number): void {
    if (ctx.finished) return;
    const nx = px + dx, ny = py + dy;
    if (nx < 0 || ny < 0 || nx >= W || ny >= H) return;
    const t = map[ny][nx];
    if (t === ROCK) { ctx.sfx('bad'); flash = 12; return; }
    px = nx; py = ny; steps++; water -= COST[t]; ctx.sfx('tap');
    if (t === SPRING && !drunk.has(`${nx},${ny}`)) { drunk.add(`${nx},${ny}`); water += 5; ctx.sfx('good'); }
    reveal(); hud();
    if (py === 0 && px === ex) { ctx.sfx('win'); ctx.finish({ result: 'win', score: 300 + Math.max(0, water) * 25, title: 'You reached the flag', detail: `Across the mesa in ${steps} steps with ${Math.max(0, water)} water left.` }); }
    else if (water <= 0) ctx.finish({ result: 'lose', score: py === 0 ? 0 : (H - 1 - py) * 20, title: 'The canteen runs dry', detail: `You got ${H - 1 - py} rows across before the water ended.` });
  }
  const bfs = (): [number, number][] => {
    const D = Array.from({ length: H }, () => Array(W).fill(Infinity)), P: ([number, number] | null)[][] = Array.from({ length: H }, () => Array(W).fill(null));
    D[H - 1][4] = 0; const q: [number, number][] = [[4, H - 1]];
    while (q.length) {
      q.sort((a, b) => D[a[1]][a[0]] - D[b[1]][b[0]]); const [x, y] = q.shift()!;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H || map[ny][nx] === ROCK) continue;
        const d = D[y][x] + COST[map[ny][nx]]; if (d < D[ny][nx]) { D[ny][nx] = d; P[ny][nx] = [x, y]; q.push([nx, ny]); }
      }
    }
    const out: [number, number][] = []; let cur: [number, number] | null = [ex, 0];
    if (D[0][ex] === Infinity) return out;
    while (cur && !(cur[0] === 4 && cur[1] === H - 1)) { out.push(cur); cur = P[cur[1]][cur[0]]; }
    return out.reverse();
  };
  function build(seed: number): void {
    const rand = makeRng(seed);
    for (;;) {
      map = Array.from({ length: H }, () => Array.from({ length: W }, () => { const r = rand(); return r < 0.24 ? ROCK : r < 0.4 ? SCRUB : SAND; }));
      ex = rint(rand, 1, W - 2); map[0][ex] = SAND; map[H - 1][4] = SAND; map[H - 2][4] = SAND; map[1][ex] = SAND;
      for (let k = 0; k < 3; k++) { const x = rint(rand, 0, W - 1), y = rint(rand, 2, H - 3); if (map[y][x] === SAND) map[y][x] = SPRING; }
      path = bfs(); if (path.length) break;
    }
    const opt = path.reduce((s, [x, y]) => s + COST[map[y][x]], 0);
    water = Math.ceil(opt * 1.6) + 3;
  }

  function draw(): void {
    g.fillStyle = c.ink; g.fillRect(0, 0, cv.w, cv.h);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const X = x * SZ, Y = y * SZ + 30, t = map[y][x], live = vis(x, y);
      if (!seen[y][x]) { g.fillStyle = c.night; g.fillRect(X + 1, Y + 1, SZ - 2, SZ - 2); g.fillStyle = c.smoke; g.globalAlpha = 0.5; g.fillRect(X + SZ / 2 - 1, Y + SZ / 2 - 1, 2, 2); g.globalAlpha = 1; continue; }
      g.globalAlpha = live ? 1 : 0.5;
      g.fillStyle = t === ROCK ? c.ink : t === SCRUB ? c.dusk : t === SPRING ? c.mesa : c.wine; g.fillRect(X + 1, Y + 1, SZ - 2, SZ - 2);
      g.strokeStyle = c.bone; g.fillStyle = c.bone; g.lineWidth = 2;
      if (t === ROCK) { g.fillStyle = c.mesa; g.beginPath(); g.moveTo(X + 8, Y + 40); g.lineTo(X + 24, Y + 8); g.lineTo(X + 40, Y + 40); g.closePath(); g.fill(); g.stroke(); }
      if (t === SCRUB) { g.strokeStyle = c.tan; for (const d of [-10, 0, 10]) { g.beginPath(); g.moveTo(X + 24, Y + 38); g.lineTo(X + 24 + d, Y + 14); g.stroke(); } }
      if (t === SPRING) { const dry = drunk.has(`${x},${y}`); g.beginPath(); g.moveTo(X + 24, Y + 9); g.quadraticCurveTo(X + 38, Y + 28, X + 24, Y + 38); g.quadraticCurveTo(X + 10, Y + 28, X + 24, Y + 9); dry ? g.stroke() : g.fill(); }
      g.globalAlpha = 1;
    }
    // flag on the mesa top
    const FX = ex * SZ, FY = 30;
    g.strokeStyle = c.rose; g.lineWidth = 3; g.strokeRect(FX + 3, FY + 3, SZ - 6, SZ - 6);
    g.fillStyle = c.rose; g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 6 : 13; g.lineTo(FX + 24 + Math.cos(a) * r, FY + 24 + Math.sin(a) * r); } g.closePath(); g.fill();
    // lantern ring and rider
    g.strokeStyle = c.bone; g.globalAlpha = 0.35; g.setLineDash([4, 5]); g.lineWidth = 2;
    g.beginPath(); g.moveTo(px * SZ + SZ / 2, py * SZ + 30 + SZ / 2 - (VIS + 0.5) * SZ); g.lineTo(px * SZ + SZ / 2 + (VIS + 0.5) * SZ, py * SZ + 30 + SZ / 2); g.lineTo(px * SZ + SZ / 2, py * SZ + 30 + SZ / 2 + (VIS + 0.5) * SZ); g.lineTo(px * SZ + SZ / 2 - (VIS + 0.5) * SZ, py * SZ + 30 + SZ / 2); g.closePath(); g.stroke(); g.setLineDash([]); g.globalAlpha = 1;
    g.fillStyle = c.bone; g.strokeStyle = c.ink; g.lineWidth = 3; g.beginPath(); g.arc(px * SZ + SZ / 2, py * SZ + 30 + SZ / 2, 12, 0, 7); g.fill(); g.stroke();
    g.fillStyle = c.red; g.beginPath(); g.arc(px * SZ + SZ / 2, py * SZ + 30 + SZ / 2, 5, 0, 7); g.fill();
    // water gauge across the top
    g.fillStyle = c.night; g.fillRect(0, 0, cv.w, 24); g.fillStyle = water <= 5 ? c.red : c.rose; g.fillRect(4, 6, Math.max(0, Math.min(1, water / 40)) * (cv.w - 8), 12);
    g.strokeStyle = c.tan; g.lineWidth = 1.5; g.strokeRect(4, 6, cv.w - 8, 12);
    if (flash > 0) { flash--; g.fillStyle = c.red; g.globalAlpha = 0.25; g.fillRect(0, 30, cv.w, cv.h); g.globalAlpha = 1; }
  }
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => {
    const p = cv.pt(e), tx = Math.floor(p.x / SZ), ty = Math.floor((p.y - 30) / SZ), dx = tx - px, dy = ty - py;
    if (Math.abs(dx) + Math.abs(dy) === 1) step(dx, dy);
    else if (dx || dy) { if (Math.abs(dx) >= Math.abs(dy)) step(Math.sign(dx), 0); else step(0, Math.sign(dy)); }
  });
  ctx.keys({ ArrowUp: (d) => d && step(0, -1), ArrowDown: (d) => d && step(0, 1), ArrowLeft: (d) => d && step(-1, 0), ArrowRight: (d) => d && step(1, 0) });
  ctx.pad([{ key: 'ArrowLeft', label: '←' }, { key: 'ArrowUp', label: '↑' }, { key: 'ArrowDown', label: '↓' }, { key: 'ArrowRight', label: '→' }]);
  ctx.loop(() => {}, draw);

  return {
    destroy() { /* released by the shell */ },
    reset(seed) {
      build(seed); px = 4; py = H - 1; steps = 0; flash = 0; drunk = new Set();
      seen = Array.from({ length: H }, () => Array(W).fill(false)); reveal(); hud();
    },
    probe: () => ({ px, py, water, steps }),
    play(kind) {
      if (kind === 'win') { let x = px, y = py; for (const [nx, ny] of path) { step(nx - x, ny - y); x = nx; y = ny; } return; }
      for (let i = 0; i < 400 && !ctx.finished; i++) step(0, i % 2 ? 1 : -1);
    },
  };
}
