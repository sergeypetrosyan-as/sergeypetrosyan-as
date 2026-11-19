import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Iron Nonogram: three brands (4, 5, 6 squares). Row and column runs let you deduce every filled cell; 3 mistakes end the shift. */
const SIZES = [4, 5, 6], MAX_MISTAKES = 3, DONE_T = 1;

const runsOf = (line: number[]): number[] => { const r: number[] = []; let n = 0; for (const v of line) { if (v) n++; else if (n) { r.push(n); n = 0; } } if (n) r.push(n); return r.length ? r : [0]; };

/** Every filling of `len` cells that matches `clue` and the known cells (-1 unknown). */
function fits(clue: number[], known: number[]): number[][] {
  const len = known.length, out: number[][] = [];
  const rec = (i: number, ci: number, line: number[]): void => {
    if (ci === clue.length) { const rest = Array(len - i).fill(0); const full = line.concat(rest); if (full.every((v, k) => known[k] < 0 || known[k] === v)) out.push(full); return; }
    const need = clue[ci];
    if (need === 0) { rec(len, ci + 1, line.concat(Array(len - i).fill(0))); return; }
    for (let s = i; s + need <= len; s++) {
      const next = line.concat(Array(s - i).fill(0), Array(need).fill(1));
      if (s + need < len) rec(s + need + 1, ci + 1, next.concat([0])); else rec(len, ci + 1, next);
    }
  };
  rec(0, 0, []);
  return out.filter((l) => l.length === len);
}

/** True when plain line-by-line deduction solves the picture (so no guessing is needed). */
function solvable(sol: number[][]): boolean {
  const n = sol.length, rows = sol.map(runsOf), cols = sol[0].map((_, c) => runsOf(sol.map((r) => r[c])));
  const g = sol.map(() => Array(n).fill(-1));
  for (let pass = 0, ch = true; ch && pass < 40; pass++) {
    ch = false;
    const lines: [number[], number[], (i: number, v: number) => void][] = [];
    for (let r = 0; r < n; r++) lines.push([rows[r], g[r], (i, v) => { g[r][i] = v; }]);
    for (let c = 0; c < n; c++) lines.push([cols[c], g.map((row) => row[c]), (i, v) => { g[i][c] = v; }]);
    for (const [clue, known, set] of lines) {
      const opts = fits(clue, known); if (!opts.length) return false;
      for (let i = 0; i < n; i++) { const v = opts[0][i]; if (known[i] < 0 && opts.every((o) => o[i] === v)) { set(i, v); ch = true; } }
    }
  }
  return g.every((row) => row.every((v) => v >= 0));
}

export default function ironNonogram(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let round = 0, n = 4, mistakes = 0, time = 0, score = 0, doneT = -1, mode: 'fill' | 'mark' = 'fill';
  let sol: number[][] = [], st: number[][] = [];

  const grid = h('div', { class: 'in-grid' });
  const note = h('p', { class: 'mw-note', role: 'status' });
  const bFill = h('button', { class: 'mw-chip on', type: 'button', 'aria-pressed': 'true', 'data-mode': 'fill', onclick: () => setMode('fill') }, '■ Brand');
  const bMark = h('button', { class: 'mw-chip', type: 'button', 'aria-pressed': 'false', 'data-mode': 'mark', onclick: () => setMode('mark') }, '✕ Mark empty');
  const style = h('style', null, `
    .in{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:10px}
    .in-grid{width:100%;display:grid;gap:3px;padding:8px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised)}
    .in-clue{display:flex;align-items:center;justify-content:flex-end;gap:5px;font:700 .95rem/1 var(--mw-font-slab);color:var(--mw-bone);padding:0 4px}
    .in-clue.col{flex-direction:column;justify-content:flex-end;gap:2px;padding:0 0 4px}
    .in-clue.done{color:var(--mw-smoke);opacity:.5;text-decoration:line-through}
    .in-c{aspect-ratio:1;min-height:42px;border:2px solid var(--mw-mesa);border-radius:5px;background:var(--mw-night);color:var(--mw-smoke);font:700 1.1rem var(--mw-font-slab);padding:0;cursor:pointer}
    .in-c.f{background:var(--mw-tan);border-color:var(--mw-bone);color:var(--mw-ink)}
    .in-c.x{color:var(--mw-ash);border-style:dashed}
    .in-c.brand{background:var(--mw-rose);color:var(--mw-ink)}
    .in-modes{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
  `);
  ctx.root.append(style, h('div', { class: 'in' }, grid, h('div', { class: 'in-modes' }, bFill, bMark), note));

  function setMode(m: 'fill' | 'mark'): void {
    mode = m; bFill.classList.toggle('on', m === 'fill'); bMark.classList.toggle('on', m === 'mark');
    bFill.setAttribute('aria-pressed', String(m === 'fill')); bMark.setAttribute('aria-pressed', String(m === 'mark'));
  }
  function hud(): void { ctx.hud('Brand', `${round + 1}/${SIZES.length}`); ctx.hud('Mistakes', `${mistakes}/${MAX_MISTAKES}`); ctx.hud('Time', `${Math.floor(time)}s`); }
  function lineDone(cells: number[], truth: number[]): boolean { return truth.every((v, i) => !v || cells[i] === 1) && cells.every((v, i) => v !== 1 || truth[i] === 1); }
  function render(): void {
    const rows = sol.map(runsOf), cols = sol[0].map((_, c) => runsOf(sol.map((r) => r[c])));
    const kids: HTMLElement[] = [h('span', {})];
    cols.forEach((cl, c) => kids.push(h('span', { class: 'in-clue col' + (lineDone(st.map((r) => r[c]), sol.map((r) => r[c])) ? ' done' : '') }, ...cl.map((v) => h('span', null, v)))));
    for (let r = 0; r < n; r++) {
      kids.push(h('span', { class: 'in-clue' + (lineDone(st[r], sol[r]) ? ' done' : '') }, ...rows[r].map((v) => h('span', null, v))));
      for (let c = 0; c < n; c++) {
        const s = st[r][c], brand = doneT >= 0 && s === 1;
        kids.push(h('button', { class: 'in-c' + (s === 1 ? ' f' : s === 2 ? ' x' : '') + (brand ? ' brand' : ''), type: 'button', 'data-cell': `${r}-${c}`, 'aria-label': `Row ${r + 1} column ${c + 1}, ${s === 1 ? 'branded' : s === 2 ? 'marked empty' : 'open'}`, onclick: () => tap(r, c) }, s === 1 ? '■' : s === 2 ? '✕' : ''));
      }
    }
    grid.style.gridTemplateColumns = `minmax(46px,1.5fr) repeat(${n}, minmax(0,1fr))`;
    grid.replaceChildren(...kids);
  }
  function build(): void {
    n = SIZES[round];
    for (let tries = 0; tries < 400; tries++) {
      sol = Array.from({ length: n }, () => Array.from({ length: n }, () => (rand() < 0.58 ? 1 : 0)));
      const cnt = sol.flat().reduce((a, b) => a + b, 0);
      if (cnt < n * n * 0.4 || cnt > n * n * 0.72) continue;
      if (sol.some((r) => !r.some(Boolean)) || sol[0].some((_, c) => !sol.some((r) => r[c]))) continue;
      if (solvable(sol)) break;
    }
    st = sol.map((r) => r.map(() => 0)); doneT = -1;
    note.textContent = 'Numbers are the lengths of filled runs in each row and column. Struck-through numbers are finished.';
    render(); hud();
  }
  /** The one action: tap a cell in the current mode. A wrong guess costs a mistake and reveals the truth. */
  function tap(r: number, c: number): void {
    if (ctx.finished || doneT >= 0 || st[r][c] !== 0) return;
    const filled = sol[r][c] === 1;
    st[r][c] = filled ? 1 : 2;
    const right = (mode === 'fill') === filled;
    if (right) ctx.sfx('tap'); else { mistakes++; ctx.sfx('bad'); note.textContent = filled ? 'That cell was iron: revealed.' : 'That cell was empty: marked.'; }
    hud();
    if (mistakes >= MAX_MISTAKES) { render(); ctx.finish({ result: 'lose', score, title: 'The iron cooled', detail: `Three wrong cells on brand ${round + 1}. Deduce from the runs, do not guess.` }); return; }
    if (sol.every((row, i) => row.every((v, j) => !v || st[i][j] === 1))) { doneT = 0; ctx.sfx('good'); score += 300 + Math.max(0, 100 - Math.floor(time)); note.textContent = 'Branded!'; }
    render();
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    if (doneT >= 0) {
      doneT += dt;
      if (doneT >= DONE_T) {
        round++;
        if (round >= SIZES.length) { round = SIZES.length - 1; ctx.finish({ result: 'win', score: score + (MAX_MISTAKES - mistakes) * 100, title: 'All brands burned in', detail: `Three brands in ${Math.floor(time)} seconds with ${mistakes} mistakes.` }); }
        else build();
      }
    } else { const before = Math.floor(time); time += dt; if (Math.floor(time) !== before) hud(); }
  }
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; mistakes = 0; time = 0; score = 0; setMode('fill'); build(); },
    probe: () => ({ round, mistakes, filled: st.flat().filter((v) => v === 1).length, marked: st.flat().filter((v) => v === 2).length, mode }),
    play(kind: Result) {
      for (let guard = 0; guard < 4000 && !ctx.finished; guard++) {
        if (doneT >= 0) { update(1 / 60); continue; }
        setMode('fill');
        for (let r = 0; r < n && !ctx.finished; r++) for (let c = 0; c < n && !ctx.finished; c++) { if (st[r][c] === 0 && sol[r][c] === (kind === 'win' ? 1 : 0) && doneT < 0) tap(r, c); }
        update(1 / 60);
      }
    },
  };
}
