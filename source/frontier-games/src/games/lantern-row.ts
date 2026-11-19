import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Lantern Row: a click flips a lantern and its four neighbours. Light every lantern within the click budget. */
const LEVELS = [{ n: 3, k: 3, spare: 3 }, { n: 4, k: 4, spare: 3 }, { n: 5, k: 5, spare: 3 }];

export default function lanternRow(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let lv = 0, score = 0, budget = 0;
  let board: boolean[] = [], stack: number[] = [], sol: number[] = [], last: number[] = [];

  const style = h('style', null, `
    .lr{width:100%;max-width:400px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .lr-field{position:relative;width:100%}
    .lr-field svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
    .lr-grid{position:relative;width:100%;display:grid;gap:10px;padding:8px}
    .lr-c{aspect-ratio:1;min-height:44px;border-radius:50% 50% 14px 14px;border:3px solid var(--mw-mesa);background:var(--mw-night);color:var(--mw-ash);font:700 1.3rem var(--mw-font-slab);cursor:pointer;padding:0;display:grid;place-items:center}
    .lr-c.on{background:var(--mw-tan);border-color:var(--mw-bone);color:var(--mw-ink);box-shadow:0 0 14px color-mix(in srgb,var(--mw-bone) 55%,transparent)}
    .lr-c.pop{outline:3px solid var(--mw-rose);outline-offset:2px}
  `);
  const grid = h('div', { class: 'lr-grid' });
  const lines = h('svg', { viewBox: '0 0 100 100', preserveAspectRatio: 'none', 'aria-hidden': 'true' });
  const undo = h('button', { class: 'mw-btn', type: 'button', 'data-undo': '' }, 'Undo last click');
  const bar = h('div', { class: 'mw-meter' }, h('i'));
  ctx.root.append(style, h('div', { class: 'lr' }, h('div', { class: 'lr-field' }, lines, grid), bar, undo,
    h('p', { class: 'mw-note' }, 'A click flips that lantern and the ones above, below and beside it. Lit ✦ is the goal.')));
  undo.addEventListener('click', () => undoLast());

  const N = () => LEVELS[lv].n;
  function neigh(i: number): number[] {
    const n = N(), x = i % n, y = Math.floor(i / n), r = [i];
    if (x > 0) r.push(i - 1); if (x < n - 1) r.push(i + 1); if (y > 0) r.push(i - n); if (y < n - 1) r.push(i + n);
    return r;
  }
  const flipped = (b: boolean[], i: number) => { const c = b.slice(); neigh(i).forEach((j) => (c[j] = !c[j])); return c; };
  const solved = (b: boolean[]) => b.every(Boolean);
  function render(): void {
    const n = N();
    grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    grid.replaceChildren(...board.map((on, i) => h('button', { class: 'lr-c' + (on ? ' on' : '') + (last.includes(i) ? ' pop' : ''), type: 'button', 'data-c': i, 'aria-label': `Lantern ${i % n + 1},${Math.floor(i / n) + 1}, ${on ? 'lit' : 'dark'}`, onclick: () => press(i) }, on ? '✦' : '')));
    // constellation: faint lines show which lanterns are neighbours
    const p = (k: number) => 4 + ((k + 0.5) * 92) / n;
    lines.replaceChildren(...Array.from({ length: n }, (_, k) => [
      h('line', { x1: p(0), y1: p(k), x2: p(n - 1), y2: p(k), stroke: 'var(--mw-rose)', 'stroke-width': 0.8, 'stroke-dasharray': '1.5 2.5', opacity: 0.55 }),
      h('line', { x1: p(k), y1: p(0), x2: p(k), y2: p(n - 1), stroke: 'var(--mw-rose)', 'stroke-width': 0.8, 'stroke-dasharray': '1.5 2.5', opacity: 0.55 })]).flat());
    (undo as HTMLButtonElement).disabled = !stack.length;
    (bar.firstChild as HTMLElement).style.width = `${((budget - stack.length) / budget) * 100}%`;
    ctx.hud('Level', `${lv + 1}/${LEVELS.length}`); ctx.hud('Clicks left', budget - stack.length); ctx.hud('Lit', `${board.filter(Boolean).length}/${board.length}`);
  }
  function start(): void {
    const { n, k, spare } = LEVELS[lv];
    do {
      board = Array(n * n).fill(true);
      sol = shuffle(rand, Array.from({ length: n * n }, (_, i) => i)).slice(0, k);
      sol.forEach((i) => (board = flipped(board, i)));
    } while (solved(board) || board.filter((x) => !x).length < 3);
    stack = []; last = []; budget = k + spare;
  }
  /** The one player action: click a lantern. */
  function press(i: number): void {
    if (ctx.finished || stack.length >= budget) return;
    board = flipped(board, i); stack.push(i); last = neigh(i); ctx.sfx('tap'); render();
    if (solved(board)) {
      score += 300 + (budget - stack.length) * 50; ctx.sfx('good');
      if (lv + 1 >= LEVELS.length) { ctx.finish({ result: 'win', score, title: 'Every lantern lit', detail: `Row cleared with ${budget - stack.length} clicks to spare on the last board.` }); return; }
      lv++; start(); render();
    } else if (stack.length >= budget) ctx.finish({ result: 'lose', score, title: 'Out of clicks', detail: 'The lanterns stayed dark. Undo and try a different set of clicks.' });
  }
  function undoLast(): void { if (ctx.finished || !stack.length) return; board = flipped(board, stack.pop()!); last = []; render(); }

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); lv = 0; score = 0; budget = 0; start(); render(); },
    probe: () => ({ lv, lit: board.map((b) => +b).join(''), used: stack.length, score }),
    play(kind: Result) {
      if (kind === 'win') { for (let g = 0; g < 4 && !ctx.finished; g++) { const l0 = lv; sol.slice().forEach((i) => { if (lv === l0) press(i); }); } return; }
      while (!ctx.finished) {
        let pick = 0;
        for (let i = 0; i < board.length; i++) if (!solved(flipped(board, i))) { pick = i; break; }
        press(pick);
      }
    },
  };
}
