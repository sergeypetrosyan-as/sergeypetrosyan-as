import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Corral Fit: three corrals, each cut from a hidden tiling. Rotate the fence pieces and fill every cell before time runs out. */
type Cell = [number, number];
interface Piece { id: number; cells: Cell[]; sol: Cell[]; placed: boolean }
const SIZES: [number, number][] = [[4, 4], [5, 5], [6, 5]];
const BG = ['--mw-tan', '--mw-rose', '--mw-ember', '--mw-blush', '--mw-mesa', '--mw-red', '--mw-bone', '--mw-saddle'];
const FG = ['ink', 'ink', 'ink', 'ink', 'white', 'white', 'ink', 'white'];
const LETTERS = 'ABCDEFGH';
const TIME = 210;

const norm = (cs: Cell[]): Cell[] => { const mr = Math.min(...cs.map((c) => c[0])), mc = Math.min(...cs.map((c) => c[1])); return cs.map(([r, c]) => [r - mr, c - mc] as Cell).sort((a, b) => a[0] - b[0] || a[1] - b[1]); };
const rot = (cs: Cell[]): Cell[] => norm(cs.map(([r, c]) => [c, -r] as Cell));
const key = (cs: Cell[]) => norm(cs).map((c) => c.join(',')).join(';');
/** Grab point: the cell nearest the centroid, so the piece sits under your finger. */
function pivot(cs: Cell[]): Cell {
  const mr = cs.reduce((s, c) => s + c[0], 0) / cs.length, mc = cs.reduce((s, c) => s + c[1], 0) / cs.length;
  return cs.slice().sort((a, b) => Math.hypot(a[0] - mr, a[1] - mc) - Math.hypot(b[0] - mr, b[1] - mc))[0];
}

export default function corralFit(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let round = 0, time = TIME, sel = 0, H = 4, W = 4, pieces: Piece[] = [], board: number[][] = [], hint: Cell | null = null, shown = -1;

  const style = h('style', null, `
    .cf{width:100%;max-width:380px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .cf-con{width:100%;height:30px}
    .cf-board{width:100%;max-width:300px;padding:6px;border:3px solid var(--mw-saddle);border-radius:10px;background:var(--mw-umber)}
    .cf-board .mw-cell{cursor:pointer;font-size:1rem}
    .cf-board .mw-cell.pv{outline:3px dashed var(--mw-bone);outline-offset:-3px}
    .cf-board .mw-cell.bad{outline-color:var(--mw-red);background:var(--mw-night)}
    .cf-tray{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%}
    .cf-p{min-width:62px;min-height:62px;padding:6px;border-radius:8px;border:2px solid var(--mw-ember);background:var(--mw-night);color:var(--mw-bone);cursor:pointer;display:grid;gap:2px;place-content:center;position:relative}
    .cf-p[aria-pressed=true]{border-color:var(--mw-bone);background:var(--mw-wine)}
    .cf-p.done{opacity:.35}
    .cf-p i{width:13px;height:13px;border-radius:3px;display:block}
    .cf-p em{position:absolute;top:1px;left:4px;font:700 .72rem var(--mw-font-slab);font-style:normal;color:var(--mw-bone)}
  `);
  const con = h('svg', { class: 'cf-con', viewBox: '0 0 300 30', 'aria-hidden': 'true' });
  const grid = h('div', { class: 'mw-grid cf-board', role: 'grid', 'aria-label': 'Corral' });
  const tray = h('div', { class: 'cf-tray' });
  const rotBtn = h('button', { class: 'mw-btn', type: 'button', 'data-rot': '', style: { minHeight: '48px' } }, 'Rotate (R)');
  const note = h('p', { class: 'mw-note' }, 'Pick a piece, rotate it, then tap the corral. Tap a placed piece to lift it.');
  ctx.root.append(style, h('div', { class: 'cf' }, con, grid, tray, rotBtn, note));
  rotBtn.addEventListener('click', () => rotate());

  const pv = (r: number, c: number): { cells: Cell[]; ok: boolean } | null => {
    const p = pieces[sel]; if (!p || p.placed) return null;
    const [pr, pc] = pivot(p.cells);
    const cells = p.cells.map(([a, b]) => [a + r - pr, b + c - pc] as Cell);
    return { cells, ok: cells.every(([a, b]) => a >= 0 && b >= 0 && a < H && b < W && board[a][b] < 0) };
  };
  function render(): void {
    grid.style.gridTemplateColumns = `repeat(${W},1fr)`;
    grid.replaceChildren(...board.flatMap((row, r) => row.map((v, c) => {
      const prev = hint ? pv(hint[0], hint[1]) : null;
      const inPv = prev?.cells.some(([a, b]) => a === r && b === c);
      const cell = h('div', { class: 'mw-cell' + (inPv ? (prev!.ok ? ' pv' : ' pv bad') : ''), role: 'gridcell', 'data-r': r, 'data-c': c, 'aria-label': v >= 0 ? `Piece ${LETTERS[v]}` : 'Empty', style: v >= 0 ? { background: `var(${BG[v]})`, color: `var(--mw-${FG[v]})` } : {} }, v >= 0 ? LETTERS[v] : '');
      cell.addEventListener('click', () => tap(r, c));
      cell.addEventListener('pointerenter', () => { hint = [r, c]; if (shown !== r * 100 + c) { shown = r * 100 + c; render(); } });
      return cell;
    })));
    tray.replaceChildren(...pieces.map((p, i) => {
      const hh = Math.max(...p.cells.map((c) => c[0])) + 1, ww = Math.max(...p.cells.map((c) => c[1])) + 1;
      const b = h('button', { class: 'cf-p' + (p.placed ? ' done' : ''), type: 'button', 'aria-pressed': String(i === sel), 'aria-label': `Piece ${LETTERS[p.id]}`, 'data-piece': i, style: { gridTemplateColumns: `repeat(${ww},13px)` } },
        h('em', null, LETTERS[p.id]),
        ...Array.from({ length: hh * ww }, (_, k) => { const on = p.cells.some((c) => c[0] === Math.floor(k / ww) && c[1] === k % ww); return h('i', { style: { background: on ? `var(${BG[p.id]})` : 'transparent' } }); }));
      b.addEventListener('click', () => select(i));
      return b;
    }));
    const n = pieces.length, left = pieces.filter((p) => !p.placed).length;
    con.replaceChildren(...pieces.flatMap((p, i) => {
      const x = 20 + (260 * i) / Math.max(1, n - 1);
      return [(i < n - 1 ? h('line', { x1: x, y1: 15, x2: 20 + (260 * (i + 1)) / (n - 1), y2: 15, stroke: 'var(--mw-ash)', 'stroke-dasharray': '2 5', 'stroke-width': 1.5 }) : h('g')), h('circle', { cx: x, cy: 15, r: 7, fill: p.placed ? 'var(--mw-rose)' : 'var(--mw-night)', stroke: 'var(--mw-bone)', 'stroke-width': 1.5 })];
    }));
    ctx.hud('Corral', `${round + 1}/${SIZES.length}`); ctx.hud('Left', left); ctx.hud('Time', Math.ceil(time));
  }
  function build(): void {
    [H, W] = SIZES[round]; board = Array.from({ length: H }, () => Array(W).fill(-1)); pieces = []; sel = 0; hint = null; shown = -1;
    const own = Array.from({ length: H }, () => Array(W).fill(-1));
    for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
      if (own[r][c] >= 0) continue;
      const id = pieces.length, cs: Cell[] = [[r, c]]; own[r][c] = id;
      const want = [3, 4, 4, 5][rint(rand, 0, 3)];
      while (cs.length < want) {
        const opts: Cell[] = [];
        for (const [a, b] of cs) for (const [da, db] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) { const x = a + da, y = b + db; if (x >= 0 && y >= 0 && x < H && y < W && own[x][y] < 0) opts.push([x, y]); }
        if (!opts.length) break;
        const o = opts[rint(rand, 0, opts.length - 1)]; own[o[0]][o[1]] = id; cs.push(o);
      }
      pieces.push({ id, cells: cs, sol: cs, placed: false });
    }
    // fold pieces of one or two cells into a neighbour so every piece is a real fence section
    for (let i = pieces.length - 1; i >= 0; i--) if (pieces[i].sol.length > 0 && pieces[i].sol.length < 3) {
      const [a, b] = pieces[i].sol[0];
      const nb = [[a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]].map(([x, y]) => (x >= 0 && y >= 0 && x < H && y < W ? own[x][y] : -1)).find((v) => v >= 0 && v !== i && pieces[v].sol.length > 0);
      if (nb !== undefined) { pieces[nb].sol = pieces[nb].sol.concat(pieces[i].sol); pieces[i].sol.forEach(([x, y]) => (own[x][y] = nb)); pieces[i].sol = []; }
    }
    pieces = pieces.filter((p) => p.sol.length > 0);
    pieces.forEach((p, i) => { p.id = i; let cs = norm(p.sol); for (let k = rint(rand, 0, 3); k > 0; k--) cs = rot(cs); p.cells = cs; p.placed = false; });
  }
  function select(i: number): void { if (ctx.finished || !pieces[i] || pieces[i].placed) return; sel = i; ctx.sfx('tap'); render(); }
  function rotate(): void { const p = pieces[sel]; if (ctx.finished || !p || p.placed) return; p.cells = rot(p.cells); ctx.sfx('tap'); shown = -1; render(); }
  /** The one placing action: drop the selected piece with its grab cell on (r, c), or lift a placed piece. */
  function tap(r: number, c: number): void {
    if (ctx.finished) return;
    if (board[r][c] >= 0) { const p = pieces[board[r][c]]; board = board.map((row) => row.map((v) => (v === p.id ? -1 : v))); p.placed = false; sel = p.id; ctx.sfx('tap'); render(); return; }
    const t = pv(r, c);
    if (!t) return;
    if (!t.ok) { ctx.sfx('bad'); return; }
    t.cells.forEach(([a, b]) => (board[a][b] = sel)); pieces[sel].placed = true; ctx.sfx('good');
    const next = pieces.findIndex((p) => !p.placed);
    if (next < 0) {
      if (round + 1 >= SIZES.length) { render(); ctx.finish({ result: 'win', score: 300 + Math.round(time) * 5, title: 'Every corral sealed', detail: `All three corrals filled with ${Math.round(time)} seconds to spare.` }); return; }
      round++; build();
    } else sel = next;
    render();
  }
  ctx.keys({ r: (d) => d && rotate(), ' ': (d) => d && rotate() });
  ctx.loop((dt) => {
    if (ctx.finished) return; time -= dt;
    if (time <= 0) { time = 0; ctx.finish({ result: 'lose', score: round * 100, title: 'Time ran out', detail: `You sealed ${round} of ${SIZES.length} corrals.` }); return; }
    if (Math.ceil(time) !== Math.ceil(time + dt)) ctx.hud('Time', Math.ceil(time));
  }, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; time = TIME; build(); render(); },
    probe: () => ({ round, sel, board: board.map((r) => r.join('')).join('|'), rot: pieces.map((p) => key(p.cells)).join('/') }),
    play(kind: Result) {
      if (kind === 'lose') { for (let g = 0; g < 20000 && !ctx.finished; g++) { time -= 1 / 60; if (time <= 0) { time = 0; ctx.finish({ result: 'lose', score: round * 100, title: 'Time ran out', detail: `You sealed ${round} of ${SIZES.length} corrals.` }); } } return; }
      while (!ctx.finished) {
        const rnd = round, p = pieces.findIndex((x) => !x.placed);
        if (p < 0) break;
        select(p);
        const want = key(pieces[p].sol);
        for (let k = 0; k < 4 && key(pieces[p].cells) !== want; k++) rotate();
        const mr = Math.min(...pieces[p].sol.map((c) => c[0])), mc = Math.min(...pieces[p].sol.map((c) => c[1])), pv0 = pivot(pieces[p].cells);
        tap(pv0[0] + mr, pv0[1] + mc);
        if (round === rnd && !pieces[p]?.placed) break;
      }
    },
  };
}
