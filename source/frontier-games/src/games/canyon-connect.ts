import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Canyon Connect: drop stones into seven columns, first to four in a line wins. The rival gets smarter with every replay. */
const C = 7, R = 6, S = 60, TOP = 66;
const NAMES = ['Greenhorn', 'Drifter', 'Gunslinger', 'Marshal'];
type Board = number[][]; // [row][col], row 0 at the top; 0 empty, 1 you, 2 rival

export default function canyonConnect(ctx: Ctx): Instance {
  const cv = ctx.canvas(C * S, TOP + R * S + 8), g = cv.g, c = ctx.c;
  let b: Board = [], turn: 'you' | 'rival' | 'over' = 'you', col = 3, last: [number, number] | null = null, line: [number, number][] = [], level = 1, rand = makeRng(1), token = 0, moves = 0;

  const fresh = (): Board => Array.from({ length: R }, () => Array(C).fill(0));
  const drops = (bd: Board, x: number): number => { for (let r = R - 1; r >= 0; r--) if (!bd[r][x]) return r; return -1; };
  const DIRS = [[0, 1], [1, 0], [1, 1], [1, -1]];
  function winLine(bd: Board, who: number): [number, number][] | null {
    for (let r = 0; r < R; r++) for (let x = 0; x < C; x++) for (const [dr, dx] of DIRS) {
      const cells: [number, number][] = [];
      for (let k = 0; k < 4; k++) { const rr = r + dr * k, xx = x + dx * k; if (rr < 0 || rr >= R || xx < 0 || xx >= C || bd[rr][xx] !== who) break; cells.push([rr, xx]); }
      if (cells.length === 4) return cells;
    }
    return null;
  }
  function evalBoard(bd: Board, who: number): number {
    let s = 0; const o = 3 - who;
    for (let r = 0; r < R; r++) s += (bd[r][3] === who ? 3 : bd[r][3] === o ? -3 : 0);
    for (let r = 0; r < R; r++) for (let x = 0; x < C; x++) for (const [dr, dx] of DIRS) {
      let a = 0, e = 0, p = 0;
      for (let k = 0; k < 4; k++) { const rr = r + dr * k, xx = x + dx * k; if (rr < 0 || rr >= R || xx < 0 || xx >= C) { a = -9; break; } const v = bd[rr][xx]; if (v === who) a++; else if (v === o) p++; else e++; }
      if (a < 0) continue;
      if (a && !p) s += a === 3 ? 6 : a === 2 ? 2 : 0; if (p && !a) s -= p === 3 ? 7 : p === 2 ? 2 : 0;
    }
    return s;
  }
  /** negamax with alpha-beta: value for `who` to move. */
  function nega(bd: Board, who: number, depth: number, al: number, be: number): number {
    if (winLine(bd, 3 - who)) return -100000 - depth;
    if (depth === 0 || bd[0].every((v) => v)) return evalBoard(bd, who);
    let best = -Infinity;
    for (const x of [3, 2, 4, 1, 5, 0, 6]) {
      const r = drops(bd, x); if (r < 0) continue;
      bd[r][x] = who; const v = -nega(bd, 3 - who, depth - 1, -be, -al); bd[r][x] = 0;
      if (v > best) best = v; if (best > al) al = best; if (al >= be) break;
    }
    return best;
  }
  function choose(who: number, depth: number, noise: number): number {
    const open = [0, 1, 2, 3, 4, 5, 6].filter((x) => drops(b, x) >= 0);
    if (rand() < noise) return open[Math.floor(rand() * open.length)];
    let best = -Infinity, pick = open[0];
    for (const x of [3, 2, 4, 1, 5, 0, 6]) {
      const r = drops(b, x); if (r < 0) continue;
      b[r][x] = who; const v = -nega(b, 3 - who, depth - 1, -Infinity, Infinity) + (rand() * 0.2); b[r][x] = 0;
      if (v > best) { best = v; pick = x; }
    }
    return pick;
  }

  function hud(): void { ctx.hud('Rival', NAMES[level - 1]); ctx.hud('Stones', moves); }
  function place(x: number, who: number): boolean {
    const r = drops(b, x); if (r < 0) return false;
    b[r][x] = who; last = [r, x]; moves++; ctx.sfx(who === 1 ? 'tap' : 'tick');
    const w = winLine(b, who);
    if (w) {
      line = w; turn = 'over'; hud();
      if (who === 1) { level = Math.min(NAMES.length, level + 1); ctx.sfx('win'); ctx.finish({ result: 'win', score: 400 + (level - 1) * 150 + b.flat().filter((v) => !v).length * 15, title: 'Four in a line', detail: `You beat the ${NAMES[level - 2]} in ${Math.ceil(moves / 2)} drops.` }); }
      else ctx.finish({ result: 'lose', score: Math.round(moves * 5), title: 'The rival lines up four', detail: `The ${NAMES[level - 1]} won. Watch for three in a row.` });
    } else if (b[0].every((v) => v)) { turn = 'over'; ctx.finish({ result: 'lose', score: 200, title: 'Canyon full: a draw', detail: 'Nobody lined up four, so the rival holds the pass.' }); }
    hud(); return true;
  }
  /** The one player action: drop a stone into column `x`. */
  function drop(x: number): void {
    if (turn !== 'you' || ctx.finished || drops(b, x) < 0) return;
    if (!place(x, 1)) return;
    if (turn === 'you') { turn = 'rival'; const t = ++token; ctx.after(420, () => { if (t === token) rivalTurn(); }); }
  }
  function rivalTurn(): void {
    if (turn !== 'rival' || ctx.finished) return;
    const depth = level === 1 ? 2 : level + 2;
    place(choose(2, depth, level === 1 ? 0.3 : 0), 2);
    if (turn === 'rival') turn = 'you';
  }

  function draw(): void {
    g.fillStyle = c.night; g.fillRect(0, 0, cv.w, cv.h);
    // canyon rim along the top
    g.fillStyle = c.mesa; g.beginPath(); g.moveTo(0, TOP - 8); for (const [x, y] of [[0, 34], [50, 34], [70, 18], [140, 18], [160, 40], [260, 40], [280, 24], [360, 24], [380, 38], [420, 38]]) g.lineTo(x, y); g.lineTo(420, TOP - 8); g.closePath(); g.fill();
    g.fillStyle = c.umber; g.fillRect(0, TOP - 8, cv.w, cv.h);
    g.fillStyle = c.saddle; g.fillRect(0, TOP - 8, cv.w, 8);
    // aim marker: a stone above the chosen column with an arrow
    if (turn === 'you') { const x = col * S + S / 2; g.fillStyle = c.bone; g.beginPath(); g.moveTo(x - 12, 6); g.lineTo(x + 12, 6); g.lineTo(x, 26); g.closePath(); g.fill(); }
    for (let r = 0; r < R; r++) for (let x = 0; x < C; x++) {
      const cx = x * S + S / 2, cy = TOP + r * S + S / 2, v = b[r][x], hot = line.some(([lr, lx]) => lr === r && lx === x);
      g.fillStyle = c.ink; g.beginPath(); g.arc(cx, cy, 24, 0, 7); g.fill();
      if (v === 1) { g.fillStyle = c.bone; g.strokeStyle = c.tan; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, 22, 0, 7); g.fill(); g.stroke(); g.fillStyle = c.red; g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? 5 : 12; g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } g.closePath(); g.fill(); }
      if (v === 2) { g.fillStyle = c.red; g.strokeStyle = c.wine; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, 22, 0, 7); g.fill(); g.stroke(); g.strokeStyle = c.bone; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx - 9, cy - 9); g.lineTo(cx + 9, cy + 9); g.moveTo(cx + 9, cy - 9); g.lineTo(cx - 9, cy + 9); g.stroke(); }
      if (last && last[0] === r && last[1] === x && !hot) { g.strokeStyle = c.rose; g.lineWidth = 3; g.setLineDash([4, 4]); g.beginPath(); g.arc(cx, cy, 27, 0, 7); g.stroke(); g.setLineDash([]); }
      if (hot) { g.strokeStyle = c.rose; g.lineWidth = 5; g.beginPath(); g.arc(cx, cy, 27, 0, 7); g.stroke(); }
    }
  }
  const colAt = (e: PointerEvent): number => Math.max(0, Math.min(C - 1, Math.floor(cv.pt(e).x / S)));
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { col = colAt(e); });
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { col = colAt(e); drop(col); });
  ctx.keys({ ArrowLeft: (d) => { if (d) col = Math.max(0, col - 1); }, ArrowRight: (d) => { if (d) col = Math.min(C - 1, col + 1); }, ArrowDown: (d) => d && drop(col), ' ': (d) => d && drop(col), Enter: (d) => d && drop(col) });
  ctx.pad([{ key: 'ArrowLeft', label: '←' }, { key: ' ', label: 'Drop', wide: true }, { key: 'ArrowRight', label: '→' }]);
  ctx.loop(() => {}, draw);

  return {
    destroy() { /* released by the shell */ },
    reset(seed) {
      rand = makeRng(seed); b = fresh(); turn = 'you'; col = 3; last = null; line = []; moves = 0; token++; hud();
    },
    probe: () => ({ board: b.map((r) => r.join('')).join('/'), turn, level }),
    play(kind) {
      for (let guard = 0; guard < 60 && !ctx.finished; guard++) {
        if (turn === 'rival') { rivalTurn(); continue; }
        if (kind === 'win') drop(choose(1, 6, 0)); else drop([0, 6, 1, 5].find((x) => drops(b, x) >= 0) ?? [0, 1, 2, 3, 4, 5, 6].find((x) => drops(b, x) >= 0)!);
      }
    },
  };
}
