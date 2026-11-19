import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Compass Maze: the maze is dark. You feel the walls of cells you stand in, and a compass points at the exit. */
const SIZES = [7, 9, 11];
const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0]; // N E S W, bit = 1 << dir
const NAMES = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export default function compassMaze(ctx: Ctx): Instance {
  const cv = ctx.canvas(480, 560);
  const g = cv.g, c = ctx.c;
  let rand = makeRng(1);
  let lv = 0, n = 7, px = 0, py = 0, steps = 0, budget = 0, score = 0, shortest = 0, bump = 0;
  let open: number[] = [], seen: boolean[] = [], path: number[] = [];

  const bits = (x: number, y: number) => open[y * n + x];
  function carve(): void {
    open = Array(n * n).fill(0);
    const vis = Array(n * n).fill(false); const st = [0]; vis[0] = true;
    while (st.length) {
      const i = st[st.length - 1], x = i % n, y = Math.floor(i / n);
      const opts = shuffle(rand, [0, 1, 2, 3]).filter((d) => { const a = x + DX[d], b = y + DY[d]; return a >= 0 && b >= 0 && a < n && b < n && !vis[b * n + a]; });
      if (!opts.length) { st.pop(); continue; }
      const d = opts[0], j = (y + DY[d]) * n + x + DX[d];
      open[i] |= 1 << d; open[j] |= 1 << ((d + 2) % 4); vis[j] = true; st.push(j);
    }
    open[0] |= 2 | 4; open[1] |= 8; open[n] |= 1; // the start always has two ways out
  }
  function solve(): number[] {
    const prev = Array(n * n).fill(-2); prev[0] = -1; const q = [0];
    for (let k = 0; k < q.length; k++) { const i = q[k]; for (let d = 0; d < 4; d++) { if (!(open[i] & (1 << d))) continue; const j = (Math.floor(i / n) + DY[d]) * n + (i % n) + DX[d]; if (prev[j] === -2) { prev[j] = i; q.push(j); } } }
    const p: number[] = []; for (let i = n * n - 1; i >= 0; i = prev[i]) p.unshift(i);
    return p;
  }
  function build(): void {
    n = SIZES[lv]; carve(); px = 0; py = 0; steps = 0; seen = Array(n * n).fill(false); seen[0] = true;
    path = solve(); shortest = path.length - 1; budget = Math.ceil(shortest * 2.4) + 6; bump = 0;
    hud();
  }
  function hud(): void { ctx.hud('Maze', `${lv + 1}/${SIZES.length}`); ctx.hud('Steps left', budget - steps); ctx.hud('Score', score); }
  /** The one player action: step in direction d (0 N, 1 E, 2 S, 3 W). */
  function move(d: number): void {
    if (ctx.finished) return;
    if (!(bits(px, py) & (1 << d))) { bump = 12; ctx.sfx('bad'); return; }
    px += DX[d]; py += DY[d]; steps++; seen[py * n + px] = true; ctx.sfx('tap');
    if (px === n - 1 && py === n - 1) {
      score += 300 + (budget - steps) * 10; hud(); ctx.sfx('good');
      if (lv + 1 >= SIZES.length) { ctx.finish({ result: 'win', score, title: 'Out of the dark', detail: `All ${SIZES.length} mazes escaped. The last one took ${steps} steps.` }); return; }
      lv++; build(); return;
    }
    hud();
    if (steps >= budget) ctx.finish({ result: 'lose', score, title: 'Lost in the dark', detail: `You ran out of steps in maze ${lv + 1}.` });
  }
  function draw(): void {
    if (bump > 0) bump--;
    g.fillStyle = c.night; g.fillRect(0, 0, 480, 560);
    const cs = 440 / n, ox = 20, oy = 100;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, X = ox + x * cs, Y = oy + y * cs;
      g.fillStyle = seen[i] ? c.umber : c.dusk; g.globalAlpha = seen[i] ? 1 : 0.35; g.fillRect(X, Y, cs, cs); g.globalAlpha = 1;
      if (!seen[i]) { g.strokeStyle = c.mesa; g.globalAlpha = 0.5; g.lineWidth = 1; g.setLineDash([2, 5]); g.strokeRect(X + 1, Y + 1, cs - 2, cs - 2); g.setLineDash([]); g.globalAlpha = 1; continue; }
      g.strokeStyle = c.bone; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath();
      if (!(open[i] & 1)) { g.moveTo(X, Y); g.lineTo(X + cs, Y); }
      if (!(open[i] & 2)) { g.moveTo(X + cs, Y); g.lineTo(X + cs, Y + cs); }
      if (!(open[i] & 4)) { g.moveTo(X, Y + cs); g.lineTo(X + cs, Y + cs); }
      if (!(open[i] & 8)) { g.moveTo(X, Y); g.lineTo(X, Y + cs); }
      g.stroke();
    }
    g.strokeStyle = c.ember; g.lineWidth = 2; g.strokeRect(ox, oy, 440, 440);
    // exit door marker at the bottom-right edge
    g.fillStyle = c.rose; g.font = '700 16px "Zilla Slab", serif'; g.textAlign = 'right'; g.fillText('EXIT ▶', ox + 440, oy + 440 + 20);
    // player
    const pcx = ox + (px + 0.5) * cs, pcy = oy + (py + 0.5) * cs;
    g.fillStyle = c.bone; g.strokeStyle = c.ink; g.lineWidth = 2; g.beginPath(); g.arc(pcx + (bump % 4 < 2 && bump ? 3 : 0), pcy, cs * 0.28, 0, 7); g.fill(); g.stroke();
    // compass dial: needle points at the exit
    const ang = Math.atan2(n - 1 - py, n - 1 - px), cx = 60, cy = 50;
    g.strokeStyle = c.bone; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, 34, 0, 7); g.stroke();
    g.fillStyle = c.red; g.beginPath(); g.moveTo(cx + Math.cos(ang) * 30, cy + Math.sin(ang) * 30); g.lineTo(cx + Math.cos(ang + 2.5) * 12, cy + Math.sin(ang + 2.5) * 12); g.lineTo(cx + Math.cos(ang - 2.5) * 12, cy + Math.sin(ang - 2.5) * 12); g.fill();
    const deg = (Math.atan2(n - 1 - px, -(n - 1 - py)) * 180) / Math.PI; // 0 = north
    const dir = NAMES[Math.round(((deg + 360) % 360) / 45) % 8];
    g.fillStyle = c.bone; g.textAlign = 'left'; g.font = '700 22px "Zilla Slab", serif'; g.fillText(`Exit lies ${dir}`, 112, 44);
    g.fillStyle = c.ash; g.font = '600 15px "Public Sans", sans-serif'; g.fillText(`Steps ${steps} / ${budget}. Walls show once you have stood there.`, 112, 70);
  }
  ctx.keys({
    ArrowUp: (d) => d && move(0), ArrowRight: (d) => d && move(1), ArrowDown: (d) => d && move(2), ArrowLeft: (d) => d && move(3),
    w: (d) => d && move(0), d: (d) => d && move(1), s: (d) => d && move(2), a: (d) => d && move(3),
  });
  ctx.pad([{ key: 'ArrowLeft', label: '◀' }, { key: 'ArrowUp', label: '▲' }, { key: 'ArrowDown', label: '▼' }, { key: 'ArrowRight', label: '▶' }]);
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => {
    const p = cv.pt(e), cs = 440 / n, dx = p.x - (20 + (px + 0.5) * cs), dy = p.y - (100 + (py + 0.5) * cs);
    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : 3); else move(dy > 0 ? 2 : 0);
  });
  ctx.loop(() => {}, draw);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); lv = 0; score = 0; build(); },
    probe: () => ({ lv, px, py, steps, score }),
    play(kind: Result) {
      for (let guard = 0; guard < 3000 && !ctx.finished; guard++) {
        if (kind === 'lose') { move(1); move(3); continue; }
        const i = py * n + px, nx = path[path.indexOf(i) + 1];
        const dx = (nx % n) - px, dy = Math.floor(nx / n) - py;
        move(dx === 1 ? 1 : dx === -1 ? 3 : dy === 1 ? 2 : 0);
      }
    },
  };
}
