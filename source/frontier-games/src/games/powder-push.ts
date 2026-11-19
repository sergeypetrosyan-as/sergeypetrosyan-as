import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Powder Push: Sokoban. Yards are built by pulling kegs backwards from the solved state, so each is solvable. */
const YARDS = [
  { w: 7, h: 7, kegs: 2, walls: 5, steps: 70 },
  { w: 8, h: 7, kegs: 3, walls: 8, steps: 95 },
  { w: 9, h: 8, kegs: 4, walls: 12, steps: 125 },
];
const D = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // up right down left
const KEY: Record<string, number> = { ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3, w: 0, d: 1, s: 2, a: 3 };
const CELL = 50;

export default function powderPush(ctx: Ctx): Instance {
  let rand = makeRng(1), yard = 0, W = 7, H = 7, wall: boolean[] = [], goals: number[] = [], kegs: number[] = [], pl = 0;
  let sol: number[] = [], moves = 0, budget = 0, score = 0, bumps = 0, hist: { pl: number; kegs: number[] }[] = [], start = { pl: 0, kegs: [] as number[] };
  const cv = ctx.canvas(CELL * 9, CELL * 8);
  const note = document.createElement('p'); note.className = 'mw-note'; note.setAttribute('role', 'status');
  ctx.root.append(note);
  const at = (x: number, y: number) => y * W + x;
  const nb = (i: number, d: number) => { const x = (i % W) + D[d][0], y = Math.floor(i / W) + D[d][1]; return x < 0 || y < 0 || x >= W || y >= H ? -1 : at(x, y); };
  const free = (i: number) => i >= 0 && !wall[i];

  function build(): void {
    const Y = YARDS[yard];
    for (let tries = 0; tries < 400; tries++) {
      W = Y.w; H = Y.h; wall = Array.from({ length: W * H }, (_, i) => i % W === 0 || i % W === W - 1 || i < W || i >= W * (H - 1));
      for (let k = 0; k < Y.walls; k++) { const i = at(1 + Math.floor(rand() * (W - 2)), 1 + Math.floor(rand() * (H - 2))); wall[i] = true; }
      const cells = wall.map((w, i) => (w ? -1 : i)).filter((i) => i >= 0);
      const seen = new Set([cells[0]]), q = [cells[0]];
      while (q.length) { const c = q.pop()!; for (let d = 0; d < 4; d++) { const n = nb(c, d); if (free(n) && !seen.has(n)) { seen.add(n); q.push(n); } } }
      if (seen.size !== cells.length) continue;
      const inner = cells.filter((i) => { const x = i % W, y = Math.floor(i / W); return x > 1 && y > 1 && x < W - 2 && y < H - 2; });
      const pool = inner.slice().sort(() => rand() - 0.5);
      goals = pool.slice(0, Y.kegs); kegs = goals.slice();
      pl = cells.filter((i) => !kegs.includes(i))[Math.floor(rand() * (cells.length - Y.kegs))];
      const back: number[] = []; let pulls = 0;
      for (let s = 0; s < Y.steps * 3 && (s < Y.steps || pulls < 5 + Y.kegs * 3); s++) {
        const valid = [0, 1, 2, 3].filter((e) => free(nb(pl, e)) && !kegs.includes(nb(pl, e)));
        if (!valid.length) break;
        const pullable = valid.filter((e) => kegs.includes(nb(pl, (e + 2) % 4)));
        const dist = (i: number) => Math.min(...kegs.map((k) => Math.abs((k % W) - (i % W)) + Math.abs(Math.floor(k / W) - Math.floor(i / W))));
        let e: number;
        if (pullable.length && rand() < 0.75) e = pullable[Math.floor(rand() * pullable.length)];
        else if (rand() < 0.6) { const m = Math.min(...valid.map((v) => dist(nb(pl, v)))); const c = valid.filter((v) => dist(nb(pl, v)) === m); e = c[Math.floor(rand() * c.length)]; }
        else e = valid[Math.floor(rand() * valid.length)];
        const n = nb(pl, e), bi = kegs.indexOf(nb(pl, (e + 2) % 4));
        if (bi >= 0 && pullable.includes(e) && rand() < 0.9) { kegs[bi] = pl; pulls++; }
        pl = n; back.push((e + 2) % 4);
      }
      if (pulls < 5 + Y.kegs * 3 || kegs.filter((k) => goals.includes(k)).length > (Y.kegs > 2 ? 1 : 0)) continue;
      sol = back.reverse(); return;
    }
    throw new Error('yard generation failed');
  }
  function load(): void {
    build(); start = { pl, kegs: kegs.slice() }; hist = [];
    budget += Math.ceil(sol.length * 0.9) + 25; // budget carries over, so spare moves are rewarded
    note.textContent = `Yard ${yard + 1} of ${YARDS.length}: push ${kegs.length} kegs onto the stars.`;
    hud(); draw();
  }
  function hud(): void { ctx.hud('Yard', `${yard + 1}/${YARDS.length}`); ctx.hud('Moves left', budget - moves); }
  const dead = () => kegs.some((k) => !goals.includes(k) && [0, 2].some((a) => [1, 3].some((b) => !free(nb(k, a)) && !free(nb(k, b)))));
  function after(): void {
    moves++; hud(); draw();
    if (goals.every((g) => kegs.includes(g))) {
      score += 100 + (budget - moves); ctx.sfx('good');
      if (yard + 1 >= YARDS.length) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'Yard cleared', detail: `All ${YARDS.length} yards cleared with ${budget - moves} moves to spare.` }); return; }
      yard++; load(); return;
    }
    if (moves >= budget) { ctx.sfx('lose'); ctx.finish({ result: 'lose', score, title: 'Fuse burned out', detail: `Out of moves in yard ${yard + 1} with ${goals.filter((g) => kegs.includes(g)).length} of ${goals.length} kegs placed.` }); return; }
    note.textContent = dead() ? 'A keg is wedged in a corner. Undo it (costs a move).' : `Yard ${yard + 1} of ${YARDS.length}: push ${kegs.length} kegs onto the stars.`;
  }
  /** The one player action: step, pushing a keg if one is in the way. */
  function move(d: number): boolean {
    if (ctx.finished) return false;
    bumps++;
    const n = nb(pl, d);
    if (!free(n)) { ctx.sfx('bad'); return false; }
    const ki = kegs.indexOf(n);
    if (ki >= 0) { const b = nb(n, d); if (!free(b) || kegs.includes(b)) { ctx.sfx('bad'); return false; } hist.push({ pl, kegs: kegs.slice() }); kegs[ki] = b; ctx.sfx('tap'); }
    else hist.push({ pl, kegs: kegs.slice() });
    pl = n; after(); return true;
  }
  function undo(): void {
    const s = hist.pop(); if (ctx.finished || !s) return;
    pl = s.pl; kegs = s.kegs; after();
  }
  function restart(): void { if (ctx.finished) return; pl = start.pl; kegs = start.kegs.slice(); hist = []; moves += 9; after(); }

  function draw(): void {
    const g = cv.g, c = ctx.c; g.clearRect(0, 0, cv.w, cv.h);
    const ox = (cv.w - W * CELL) / 2, oy = (cv.h - H * CELL) / 2;
    for (let i = 0; i < W * H; i++) {
      const x = ox + (i % W) * CELL, y = oy + Math.floor(i / W) * CELL;
      g.fillStyle = wall[i] ? c.mesa : c.night; g.fillRect(x, y, CELL, CELL);
      g.strokeStyle = wall[i] ? c.ink : c.dusk; g.lineWidth = 1; g.strokeRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1);
      if (wall[i]) { g.beginPath(); g.moveTo(x + 8, y + 40); g.lineTo(x + 40, y + 8); g.moveTo(x + 20, y + 44); g.lineTo(x + 44, y + 20); g.strokeStyle = c.saddle; g.stroke(); }
    }
    for (const gi of goals) star(g, ox + (gi % W) * CELL + 25, oy + Math.floor(gi / W) * CELL + 25, 15, kegs.includes(gi) ? c.bone : c.rose, kegs.includes(gi) ? 0 : 1);
    for (const k of kegs) {
      const x = ox + (k % W) * CELL + 25, y = oy + Math.floor(k / W) * CELL + 25, on = goals.includes(k);
      g.fillStyle = c.saddle; g.strokeStyle = on ? c.rose : c.bone; g.lineWidth = on ? 4 : 2.5; g.beginPath(); g.arc(x, y, 18, 0, 7); g.fill(); g.stroke();
      g.strokeStyle = c.tan; g.lineWidth = 2; g.beginPath(); g.moveTo(x - 17, y - 6); g.lineTo(x + 17, y - 6); g.moveTo(x - 17, y + 6); g.lineTo(x + 17, y + 6); g.stroke();
      g.strokeStyle = c.rose; g.beginPath(); g.moveTo(x, y - 18); g.lineTo(x + 5, y - 26); g.stroke();
      if (on) star(g, x, y, 7, c.rose, 0);
    }
    const px = ox + (pl % W) * CELL + 25, py = oy + Math.floor(pl / W) * CELL + 25;
    g.fillStyle = c.bone; g.beginPath(); g.ellipse(px, py + 2, 20, 7, 0, 0, 7); g.fill();
    g.beginPath(); g.arc(px, py - 2, 10, Math.PI, 0); g.fill();
    g.fillStyle = c.red; g.fillRect(px - 10, py - 4, 20, 4);
    g.fillStyle = c.ink; g.beginPath(); g.arc(px, py + 12, 5, 0, 7); g.fill();
  }
  function star(g: CanvasRenderingContext2D, x: number, y: number, r: number, col: string, stroke: number): void {
    g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath();
    if (stroke) { g.strokeStyle = col; g.lineWidth = 2.5; g.stroke(); } else { g.fillStyle = col; g.fill(); }
  }

  ctx.keys({
    ...Object.fromEntries(Object.entries(KEY).map(([k, d]) => [k, (down: boolean) => { if (down) move(d); }])),
    z: (down) => { if (down) undo(); }, r: (down) => { if (down) restart(); },
  });
  ctx.pad([{ key: 'ArrowLeft', label: '←' }, { key: 'ArrowUp', label: '↑' }, { key: 'ArrowDown', label: '↓' }, { key: 'ArrowRight', label: '→' }, { key: 'z', label: 'Undo', wide: true }, { key: 'r', label: 'Restart (+9)', wide: true }]);
  ctx.on(cv.el, 'pointerdown', (e) => {
    const p = cv.pt(e), ox = (cv.w - W * CELL) / 2, oy = (cv.h - H * CELL) / 2;
    const dx = p.x - ox - (pl % W) * CELL - 25, dy = p.y - oy - Math.floor(pl / W) * CELL - 25;
    move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
  });

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); yard = 0; moves = 0; budget = 0; score = 0; bumps = 0; load(); },
    probe: () => ({ yard, pl, kegs, moves, bumps }),
    play(kind) {
      if (kind === 'win') {
        for (let g = 0; g < 3000 && !ctx.finished; g++) { const y = yard; const plan = sol.slice(); for (const d of plan) { if (ctx.finished || y !== yard) break; if (!move(d)) break; } }
      } else {
        for (let g = 0; g < 3000 && !ctx.finished; g++) for (let d = 0; d < 4; d++) if (move(d)) { undo(); break; }
      }
    },
  };
}
