import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Map Fold: fold the map along a grid line (both sides mirror onto the line) until every mark sits on one square. Limited folds. */
type Grid = number[][]; // [row][col] = marks stacked on that square
type Fold = ['v' | 'h', number];
const LEVELS = [{ s: 5, m: 5, slack: 2 }, { s: 6, m: 6, slack: 1 }, { s: 7, m: 7, slack: 1 }];

const dims = (g: Grid) => ({ w: g[0].length, hh: g.length });
function fold(g: Grid, [ax, k]: Fold): Grid {
  const { w, hh } = dims(g);
  if (ax === 'v') {
    const nw = Math.max(k, w - k), out: Grid = g.map(() => Array(nw).fill(0));
    g.forEach((row, y) => row.forEach((n, c) => { out[y][c < k ? k - 1 - c : c - k] += n; }));
    return out;
  }
  const nh = Math.max(k, hh - k), out: Grid = Array.from({ length: nh }, () => Array(w).fill(0));
  g.forEach((row, y) => row.forEach((n, c) => { out[y < k ? k - 1 - y : y - k][c] += n; }));
  return out;
}
const options = (g: Grid): Fold[] => {
  const { w, hh } = dims(g), o: Fold[] = [];
  for (let k = 1; k < w; k++) o.push(['v', k]);
  for (let k = 1; k < hh; k++) o.push(['h', k]);
  return o;
};
const cells = (g: Grid) => g.flat().filter((n) => n > 0).length;
const key = (g: Grid) => `${g[0].length}x${g.length}:${g.flat().join('')}`;
/** Shortest fold sequence that stacks every mark on one square (BFS, capped). */
function solve(start: Grid, cap: number): Fold[] | null {
  if (cells(start) <= 1) return [];
  let layer: { g: Grid; path: Fold[] }[] = [{ g: start, path: [] }];
  const seen = new Set([key(start)]);
  for (let d = 1; d <= cap; d++) {
    const next: typeof layer = [];
    for (const n of layer) for (const f of options(n.g)) {
      const g = fold(n.g, f), kk = key(g);
      if (seen.has(kk)) continue;
      seen.add(kk);
      const path = [...n.path, f];
      if (cells(g) <= 1) return path;
      next.push({ g, path });
    }
    layer = next;
  }
  return null;
}

export default function mapFold(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let lvl = 0, grid: Grid = [], left = 0, sel: Fold | null = null, history: { g: Grid; left: number }[] = [], score = 0, solution: Fold[] = [];

  const style = h('style', null, `
    .mf{width:100%;max-width:350px;display:flex;flex-direction:column;align-items:center;gap:8px}
    .mf-frame{width:100%;display:grid;grid-template-columns:40px 1fr;grid-template-rows:44px auto}
    .mf-top,.mf-side{position:relative}
    .mf-fb{position:absolute;width:44px;height:40px;min-width:0;padding:0;border-radius:8px;border:2px solid var(--mw-ember);background:var(--mw-night);color:var(--mw-bone);font:700 1rem var(--mw-font-slab);cursor:pointer;transform:translate(-50%,0)}
    .mf-side .mf-fb{width:40px;height:44px;transform:translate(0,-50%);left:0}
    .mf-fb.on{background:var(--mw-rose);color:var(--mw-ink);border-color:var(--mw-bone)}
    .mf-board{position:relative}
    .mf-cell{aspect-ratio:1;border:2px solid var(--mw-mesa);border-radius:4px;background:var(--mw-tan);color:var(--mw-red);display:grid;place-items:center;font:700 clamp(.9rem,5vw,1.5rem) var(--mw-font-slab);position:relative}
    .mf-cell i{font-style:normal;position:absolute;right:3px;bottom:1px;font-size:.7rem;color:var(--mw-ink)}
    .mf-cell.stack{background:var(--mw-bone);border-color:var(--mw-red)}
    .mf-line{position:absolute;border:0 dashed var(--mw-red);pointer-events:none}
    .mf-ghost{display:flex;gap:10px;align-items:center;width:100%;justify-content:center}
    .mf-ghost .mw-grid{width:92px;flex:none}
    .mf-ghost .mf-cell{border-width:1px;font-size:.7rem}
    .mf-acts{display:flex;gap:8px;width:100%}
    .mf-acts .mw-btn{flex:1}
  `);
  const top = h('div', { class: 'mf-top' }), side = h('div', { class: 'mf-side' });
  const board = h('div', { class: 'mf-board' });
  const line = h('div', { class: 'mf-line' });
  const ghost = h('div', { class: 'mf-ghost' });
  const foldBtn = h('button', { class: 'mw-btn primary', type: 'button', 'data-fold': '' }, 'Fold along line') as HTMLButtonElement;
  const undoBtn = h('button', { class: 'mw-btn', type: 'button', 'data-undo': '' }, 'Undo') as HTMLButtonElement;
  const note = h('p', { class: 'mw-note' });
  ctx.root.append(style, h('div', { class: 'mf' }, h('div', { class: 'mf-frame' }, h('div'), top, side, board), ghost, h('div', { class: 'mf-acts' }, undoBtn, foldBtn), note));

  const gridEl = (g: Grid): HTMLElement => {
    const { w } = dims(g);
    return h('div', { class: 'mw-grid', style: { gridTemplateColumns: `repeat(${w},1fr)` } }, g.flat().map((n) => h('div', { class: 'mf-cell' + (n > 1 ? ' stack' : '') }, n > 0 ? '★' : '', n > 1 ? h('i', null, n) : null)));
  };
  function render(): void {
    const { w, hh } = dims(grid);
    top.replaceChildren(...Array.from({ length: w - 1 }, (_, i) => foldButton(['v', i + 1], `${(100 * (i + 1)) / w}%`)));
    side.replaceChildren(...Array.from({ length: hh - 1 }, (_, i) => foldButton(['h', i + 1], `${(100 * (i + 1)) / hh}%`)));
    board.replaceChildren(gridEl(grid), line);
    line.style.display = sel ? 'block' : 'none';
    if (sel) {
      const v = sel[0] === 'v', p = `${(100 * sel[1]) / (v ? w : hh)}%`;
      Object.assign(line.style, v ? { left: p, top: '0', bottom: '0', width: '0', height: '', borderLeftWidth: '3px', borderTopWidth: '0' } : { top: p, left: '0', right: '0', height: '0', width: '', borderTopWidth: '3px', borderLeftWidth: '0' });
      ghost.replaceChildren(h('span', { class: 'mw-note' }, 'After this fold:'), gridEl(fold(grid, sel)));
    } else ghost.replaceChildren(h('span', { class: 'mw-note' }, 'Pick an arrow to preview a fold.'));
    foldBtn.disabled = !sel || ctx.finished; undoBtn.disabled = history.length === 0 || ctx.finished;
    ctx.hud('Map', `${lvl + 1}/${LEVELS.length}`); ctx.hud('Folds left', left); ctx.hud('Marks apart', cells(grid));
    note.textContent = 'Both sides mirror onto the dashed line. Stack every star.';
  }
  function foldButton(f: Fold, pos: string): HTMLElement {
    const on = !!sel && sel[0] === f[0] && sel[1] === f[1];
    const b = h('button', { class: 'mf-fb' + (on ? ' on' : ''), type: 'button', 'data-line': `${f[0]}${f[1]}`, 'aria-label': `Choose fold line ${f[0] === 'v' ? 'between columns' : 'between rows'} ${f[1]} and ${f[1] + 1}`, 'aria-pressed': on, onclick: () => select(f) }, f[0] === 'v' ? '▼' : '▶');
    b.style[f[0] === 'v' ? 'left' : 'top'] = pos;
    return b;
  }
  function select(f: Fold): void { if (ctx.finished) return; sel = sel && sel[0] === f[0] && sel[1] === f[1] ? null : f; ctx.sfx('tap'); render(); }
  function newLevel(): void {
    const L = LEVELS[lvl];
    let best: Grid | null = null, bestPath: Fold[] = [];
    for (let tries = 0; tries < 60; tries++) {
      const g: Grid = Array.from({ length: L.s }, () => Array(L.s).fill(0));
      for (let n = 0; n < L.m; n++) { let x, y; do { x = rint(rand, 0, L.s - 1); y = rint(rand, 0, L.s - 1); } while (g[y][x]); g[y][x] = 1; }
      const p = solve(g, 6);
      if (p && p.length >= 3 && p.length <= 5) { best = g; bestPath = p; break; }
      if (p && (!best || p.length > bestPath.length)) { best = g; bestPath = p; }
    }
    grid = best!; solution = bestPath; left = solution.length + L.slack; sel = null; history = [];
    render();
  }
  /** The one scoring action: commit the previewed fold. */
  function commit(): void {
    if (ctx.finished || !sel) return;
    history.push({ g: grid, left }); grid = fold(grid, sel); left--; sel = null; ctx.sfx('good');
    if (cells(grid) <= 1) {
      score += 200 + left * 50; ctx.sfx('win');
      if (lvl >= LEVELS.length - 1) { render(); ctx.finish({ result: 'win', score, title: 'Every mark aligned', detail: `All ${LEVELS.length} maps folded with the stars stacked.` }); return; }
      lvl++; newLevel(); return;
    }
    solution = solve(grid, 7) ?? [];
    render();
    if (left <= 0) ctx.finish({ result: 'lose', score, title: 'Out of folds', detail: `Map ${lvl + 1}: ${cells(grid)} marks were still apart.` });
  }
  function undo(): void { const p = history.pop(); if (!p || ctx.finished) return; grid = p.g; left = p.left; sel = null; render(); }
  foldBtn.addEventListener('click', commit); undoBtn.addEventListener('click', undo);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); lvl = 0; score = 0; newLevel(); },
    probe: () => ({ lvl, left, sel, grid: key(grid) }),
    play(kind) {
      for (let n = 0; n < 60 && !ctx.finished; n++) {
        let f: Fold;
        if (kind === 'win') f = solution[0] ?? options(grid)[0];
        else {
          let worst = -1; f = options(grid)[0];
          for (const o of options(grid)) { const p = solve(fold(grid, o), 8); const d = p ? p.length : 9; if (d > worst) { worst = d; f = o; } }
        }
        select(f); commit();
      }
    },
  };
}
