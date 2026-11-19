import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Cave Echo: a dark cave you can only map by pinging. Air is the clock: steps cost 1, bumps cost 1, pings cost 2. Reach the star exit on three bigger caves. */
const SIZES = [6, 8, 10];
const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // N E S W
const NAME = ['up', 'right', 'down', 'left'];
const PING = 2;

export default function caveEcho(ctx: Ctx): Instance {
  const cv = ctx.canvas(480, 500);
  const g = cv.g, C = ctx.c;
  let rand = makeRng(1);
  let lvl = 0, n = 6, pr = 0, pc = 0, air = 0, score = 0, pulse = 0, shake = 0, msg = '';
  let wall: boolean[][][] = [], seen: boolean[][] = [], known: boolean[][][] = [], dist: number[][] = [], echo: { d: number; len: number }[] = [];

  const open = (r: number, c: number, d: number) => !wall[r][c][d];
  const inb = (r: number, c: number) => r >= 0 && c >= 0 && r < n && c < n;
  function carve(r: number, c: number, d: number, state: boolean): void {
    const [dr, dc] = DIRS[d], r2 = r + dr, c2 = c + dc;
    wall[r][c][d] = state; if (inb(r2, c2)) wall[r2][c2][(d + 2) % 4] = state;
  }
  function build(): void {
    n = SIZES[lvl];
    wall = Array.from({ length: n }, () => Array.from({ length: n }, () => [true, true, true, true]));
    const vis = Array.from({ length: n }, () => Array(n).fill(false)), st: [number, number][] = [[0, 0]]; vis[0][0] = true;
    while (st.length) {
      const [r, c] = st[st.length - 1];
      const opts = [0, 1, 2, 3].filter((d) => inb(r + DIRS[d][0], c + DIRS[d][1]) && !vis[r + DIRS[d][0]][c + DIRS[d][1]]);
      if (!opts.length) { st.pop(); continue; }
      const d = opts[rint(rand, 0, opts.length - 1)]; carve(r, c, d, false); vis[r + DIRS[d][0]][c + DIRS[d][1]] = true; st.push([r + DIRS[d][0], c + DIRS[d][1]]);
    }
    for (let k = 0; k < n; k++) { const r = rint(rand, 0, n - 1), c = rint(rand, 0, n - 1), d = rint(rand, 1, 2); if (inb(r + DIRS[d][0], c + DIRS[d][1])) carve(r, c, d, false); }
    dist = Array.from({ length: n }, () => Array(n).fill(-1)); dist[n - 1][n - 1] = 0;
    const q: [number, number][] = [[n - 1, n - 1]];
    for (let i = 0; i < q.length; i++) { const [r, c] = q[i]; for (let d = 0; d < 4; d++) if (open(r, c, d)) { const r2 = r + DIRS[d][0], c2 = c + DIRS[d][1]; if (inb(r2, c2) && dist[r2][c2] < 0) { dist[r2][c2] = dist[r][c] + 1; q.push([r2, c2]); } } }
    seen = Array.from({ length: n }, () => Array(n).fill(false));
    known = Array.from({ length: n }, () => Array.from({ length: n }, () => [false, false, false, false]));
    pr = 0; pc = 0; seen[0][0] = true; echo = []; pulse = 0; shake = 0;
    air = Math.round(dist[0][0] * 1.7) + 6 + (PING * 2);
    msg = `Cave ${lvl + 1}: find the star exit in the dark.`;
  }
  const mark = (r: number, c: number, d: number) => { known[r][c][d] = true; const r2 = r + DIRS[d][0], c2 = c + DIRS[d][1]; if (inb(r2, c2)) known[r2][c2][(d + 2) % 4] = true; };
  function hud(): void { ctx.hud('Cave', `${lvl + 1}/${SIZES.length}`); ctx.hud('Air', air); ctx.hud('Score', score); }
  function end(): void {
    if (pr === n - 1 && pc === n - 1) {
      score += 100 + air * 10; ctx.sfx('good');
      if (lvl + 1 >= SIZES.length) { hud(); ctx.finish({ result: 'win', score, title: 'Out into the starlight', detail: `All three caves crossed with ${air} air left.` }); return; }
      lvl++; build(); hud(); return;
    }
    if (air <= 0) { hud(); ctx.finish({ result: 'lose', score, title: 'The air ran out', detail: `You were ${dist[pr][pc]} steps from the exit in cave ${lvl + 1}.` }); return; }
    hud();
  }
  /** Ping: every direction rings back the distance to its wall. Costs air. */
  function ping(): void {
    if (ctx.finished || air < PING) { if (!ctx.finished && air < PING) msg = 'Not enough air to ping.'; return; }
    air -= PING; pulse = 1; ctx.sfx('tick');
    echo = DIRS.map((_, d) => {
      let r = pr, c = pc, len = 0;
      while (open(r, c, d)) { r += DIRS[d][0]; c += DIRS[d][1]; len++; seen[r][c] = true; mark(r - DIRS[d][0], c - DIRS[d][1], d); }
      mark(r, c, d); return { d, len };
    });
    msg = 'Echoes: ' + echo.map((e) => `${NAME[e.d]} ${e.len}`).join(', ');
    end();
  }
  function move(d: number): void {
    if (ctx.finished) return;
    air--;
    if (!open(pr, pc, d)) { mark(pr, pc, d); shake = 0.25; ctx.sfx('bad'); msg = `Thud. A wall to the ${NAME[d]}.`; end(); return; }
    pr += DIRS[d][0]; pc += DIRS[d][1]; seen[pr][pc] = true; ctx.sfx('tap'); msg = '';
    end();
  }
  function update(dt: number): void { if (pulse > 0) pulse = Math.max(0, pulse - dt * 1.5); if (shake > 0) shake -= dt; }
  function draw(): void {
    const S = 440 / n, X = 20, Y = 16;
    g.fillStyle = C.bg; g.fillRect(0, 0, 480, 500);
    g.fillStyle = C.night; g.fillRect(X, Y, S * n, S * n);
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (seen[r][c]) { g.fillStyle = C.umber; g.fillRect(X + c * S + 2, Y + r * S + 2, S - 4, S - 4); }
    // exit star
    const ex = X + (n - 0.5) * S, ey = Y + (n - 0.5) * S;
    g.fillStyle = C.collectible; g.strokeStyle = C.bone; g.lineWidth = 1.5; g.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? S * 0.17 : S * 0.38; g.lineTo(ex + Math.cos(a) * rr, ey + Math.sin(a) * rr); } g.closePath(); g.fill(); g.stroke();
    // known walls (outer cave rim always drawn faintly)
    g.strokeStyle = C.quiet; g.lineWidth = 2; g.globalAlpha = 0.5; g.strokeRect(X, Y, S * n, S * n); g.globalAlpha = 1;
    g.strokeStyle = C.bone; g.lineWidth = 4; g.lineCap = 'round';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) for (let d = 0; d < 4; d++) if (known[r][c][d] && wall[r][c][d]) {
      const x = X + c * S, y = Y + r * S; g.beginPath();
      if (d === 0) { g.moveTo(x, y); g.lineTo(x + S, y); } else if (d === 1) { g.moveTo(x + S, y); g.lineTo(x + S, y + S); } else if (d === 2) { g.moveTo(x, y + S); g.lineTo(x + S, y + S); } else { g.moveTo(x, y); g.lineTo(x, y + S); }
      g.stroke();
    }
    // echo ripple (motif) and player
    const px = X + (pc + 0.5) * S + (shake > 0 ? Math.sin(shake * 80) * 3 : 0), py = Y + (pr + 0.5) * S;
    if (pulse > 0) { g.strokeStyle = C.accent; g.lineWidth = 3; g.globalAlpha = pulse; g.beginPath(); g.arc(px, py, S * (1 - pulse) * n * 0.9 + 6, 0, 6.3); g.stroke(); g.globalAlpha = 1; }
    g.fillStyle = C.player; g.strokeStyle = C.ink; g.lineWidth = 2; g.beginPath(); g.arc(px, py, S * 0.26, 0, 6.3); g.fill(); g.stroke();
    g.fillStyle = C.ink; g.fillRect(px - 2, py - 2, 4, 4);
    g.fillStyle = C.bone; g.font = '700 16px "Zilla Slab", serif'; g.textAlign = 'center';
    g.fillText(msg || 'Arrows move. Space pings (2 air).', 240, 478);
    g.textAlign = 'left';
    for (const e of echo) if (pulse < 0.7) { const [dr, dc] = DIRS[e.d]; g.fillStyle = C.bone; g.font = '700 18px "Zilla Slab", serif'; g.fillText(String(e.len), px + dc * S * 0.55 - 4, py + dr * S * 0.55 + 5); }
  }
  const mv = (d: number) => (down: boolean) => down && move(d);
  ctx.keys({ ArrowUp: mv(0), ArrowRight: mv(1), ArrowDown: mv(2), ArrowLeft: mv(3), w: mv(0), d: mv(1), s: mv(2), a: mv(3), ' ': (d) => d && ping() });
  ctx.pad([{ key: 'ArrowLeft', label: '◀' }, { key: 'ArrowUp', label: '▲' }, { key: 'ArrowDown', label: '▼' }, { key: 'ArrowRight', label: '▶' }, { key: ' ', label: 'Ping', wide: true }]);
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); lvl = 0; score = 0; build(); hud(); },
    probe: () => ({ lvl, pr, pc, air, score, known: known.flat(2).filter(Boolean).length }),
    play(kind: Result) {
      for (let guard = 0; guard < 4000 && !ctx.finished; guard++) {
        if (kind === 'lose') { if (guard % 2) ping(); else move(0); continue; }
        let best = 0; for (let d = 0; d < 4; d++) if (open(pr, pc, d) && dist[pr + DIRS[d][0]][pc + DIRS[d][1]] < dist[pr][pc]) best = d;
        move(best);
      }
    },
  };
}
