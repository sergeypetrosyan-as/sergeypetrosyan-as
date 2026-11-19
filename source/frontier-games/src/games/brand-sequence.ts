import { h } from '../core/dom';
import { makeRng, pick, rint, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Brand Sequence: a row of cattle brands follows a hidden rule. Pick the brand that comes next. Eight rows, three misses allowed. */
const SHAPES = ['★', '◆', '▲', '●', '✚'];
const NAMES = ['star', 'diamond', 'triangle', 'circle', 'cross'];
const ROUNDS = 8, LIVES = 3;
interface Item { s: number; n: number }
interface Puzzle { seq: Item[]; shown: number; rule: string }
type Rng = () => number;
const it = (s: number, n = 1): Item => ({ s, n });

const RULES: ((r: Rng) => Puzzle)[] = [
  (r) => { const sh = shuffle(r, [0, 1, 2, 3, 4]).slice(0, 2); return { seq: Array.from({ length: 7 }, (_, i) => it(sh[i % 2])), shown: 6, rule: 'The two brands take turns.' }; },
  (r) => { const sh = shuffle(r, [0, 1, 2, 3, 4]).slice(0, 3); return { seq: Array.from({ length: 7 }, (_, i) => it(sh[i % 3])), shown: 6, rule: 'The same three brands repeat in order.' }; },
  (r) => { const s = rint(r, 0, 4), up = r() < 0.5; return { seq: Array.from({ length: 6 }, (_, i) => it(s, up ? i + 1 : 6 - i)), shown: 5, rule: up ? 'Each brand has one more dot.' : 'Each brand has one dot fewer.' }; },
  (r) => { const st = rint(r, 0, 4); return { seq: Array.from({ length: 7 }, (_, i) => it((st + i) % 5, 1 + (i % 2))), shown: 6, rule: 'The shape steps through the list while the dots alternate one, two.' }; },
  (r) => { const sh = shuffle(r, [0, 1, 2, 3, 4]).slice(0, 2); return { seq: Array.from({ length: 7 }, (_, i) => it(sh[i % 2], 1 + Math.floor(i / 2))), shown: 6, rule: 'Two shapes take turns and the dots grow every pair.' }; },
  (r) => { const sh = shuffle(r, [0, 1, 2, 3, 4]).slice(0, 4); const m = [0, 1, 2, 3, 2, 1, 0]; return { seq: m.map((k) => it(sh[k])), shown: 6, rule: 'The row mirrors itself on the way back.' }; },
  (r) => { const sh = shuffle(r, [0, 1, 2, 3, 4]).slice(0, 3), st = rint(r, 0, 4); return { seq: Array.from({ length: 8 }, (_, i) => (i % 2 ? it(st, 1 + (i - 1) / 2) : it(sh[(i / 2) % 3]))), shown: 7, rule: 'Two rows are woven together: a repeating shape and a growing dot count.' }; },
  (r) => { const st = rint(r, 0, 4); return { seq: Array.from({ length: 7 }, (_, i) => it((st + 2 * i) % 5, 1 + (i % 3))), shown: 6, rule: 'The shape skips one each time while the dots count one, two, three.' }; },
];

export default function brandSequence(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let round = 1, lives = LIVES, score = 0, correct = 0, opts: Item[] = [], ans = 0, puzzle: Puzzle, last = '';

  const style = h('style', null, `
    .bs{width:100%;max-width:440px;display:flex;flex-direction:column;align-items:center;gap:14px}
    .bs-seq{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:10px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-umber);width:100%}
    .bs-m{width:46px;height:62px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:2px solid var(--mw-tan);border-radius:8px;background:var(--mw-night);color:var(--mw-bone);font:700 1.5rem/1 var(--mw-font-slab)}
    .bs-m small{font-size:1rem;line-height:.6;letter-spacing:.05em;color:var(--mw-rose);min-height:.6rem}
    .bs-q{border:3px dashed var(--mw-rose);color:var(--mw-rose)}
    .bs-opts{width:100%;display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
    .bs-opt{min-height:78px}
    .bs-opt .bs-m{width:100%;height:100%;min-height:70px;border-color:var(--mw-mesa);cursor:pointer}
    .bs-opt:hover .bs-m{border-color:var(--mw-rose)}
    .bs-opt{padding:0;background:none;border:0;cursor:pointer}
    .bs-lives{font:700 1.1rem var(--mw-font-slab);letter-spacing:.2em;color:var(--mw-rose)}
    .bs-last{min-height:3em}
  `);
  const seqEl = h('div', { class: 'bs-seq', role: 'img' }), optsEl = h('div', { class: 'bs-opts' });
  const lifeEl = h('div', { class: 'bs-lives', 'aria-hidden': 'true' }), lastEl = h('p', { class: 'mw-note bs-last', role: 'status' });
  ctx.root.append(style, h('div', { class: 'bs' }, h('p', { class: 'mw-note' }, 'Which brand comes next?'), seqEl, optsEl, lifeEl, lastEl));

  const mark = (m: Item | null, cls = '') => h('span', { class: `bs-m ${cls}` }, m ? SHAPES[m.s] : '?', h('small', null, m ? '•'.repeat(m.n) : ''));
  const label = (m: Item): string => `${NAMES[m.s]} with ${m.n} ${m.n === 1 ? 'dot' : 'dots'}`;
  const same = (a: Item, b: Item): boolean => a.s === b.s && a.n === b.n;

  function render(): void {
    const shown = puzzle.seq.slice(0, puzzle.shown);
    seqEl.setAttribute('aria-label', `Sequence: ${shown.map(label).join(', ')}, then a question mark`);
    seqEl.replaceChildren(...shown.map((m) => mark(m)), mark(null, 'bs-q'));
    optsEl.replaceChildren(...opts.map((m, i) => h('button', { class: 'bs-opt', type: 'button', 'data-opt': i, 'aria-label': `Choose ${label(m)}`, onclick: () => choose(i) }, mark(m))));
    lifeEl.textContent = '★'.repeat(lives) + '☆'.repeat(LIVES - lives);
    lastEl.textContent = last;
    ctx.hud('Row', `${round}/${ROUNDS}`); ctx.hud('Misses left', lives); ctx.hud('Score', score);
  }
  function build(): void {
    puzzle = RULES[round - 1](rand);
    const a = puzzle.seq[puzzle.shown], prev = puzzle.seq[puzzle.shown - 1], first = puzzle.seq[0];
    const pool: Item[] = [prev, first, { s: (a.s + 1) % 5, n: a.n }, { s: a.s, n: Math.min(6, a.n + 1) }, { s: a.s, n: Math.max(1, a.n - 1) }, { s: (a.s + 2) % 5, n: a.n }, { s: (a.s + 3) % 5, n: 1 + (a.n % 3) }];
    const wrong: Item[] = [];
    for (const m of shuffle(rand, pool)) if (!same(m, a) && !wrong.some((w) => same(w, m)) && wrong.length < 3) wrong.push(m);
    for (let s = 0; wrong.length < 3; s++) { const m = { s, n: pick(rand, [1, 2, 3]) }; if (!same(m, a) && !wrong.some((w) => same(w, m))) wrong.push(m); }
    opts = shuffle(rand, [a, ...wrong]); ans = opts.findIndex((m) => same(m, a));
    render();
  }
  /** The one player action: choose the next brand. */
  function choose(i: number): void {
    if (ctx.finished || !opts[i]) return;
    if (i === ans) { score += 100; correct++; last = `Right. ${puzzle.rule}`; ctx.sfx('good'); }
    else { lives--; last = `Not that one. ${puzzle.rule}`; ctx.sfx('bad'); }
    if (lives <= 0) { render(); ctx.finish({ result: 'lose', score, title: 'Brands blurred', detail: `Three misses by row ${round}. You read ${correct} rows right.` }); return; }
    if (round >= ROUNDS) { render(); ctx.finish({ result: 'win', score, title: 'Every brand read', detail: `${correct} of ${ROUNDS} rows right with ${lives} ${lives === 1 ? 'miss' : 'misses'} to spare.` }); return; }
    round++; build();
  }
  ctx.keys({ '1': (d) => d && choose(0), '2': (d) => d && choose(1), '3': (d) => d && choose(2), '4': (d) => d && choose(3) });
  ctx.pad([{ key: '1', label: '1' }, { key: '2', label: '2' }, { key: '3', label: '3' }, { key: '4', label: '4' }]);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 1; lives = LIVES; score = 0; correct = 0; last = ''; build(); },
    probe: () => ({ round, lives, score, correct }),
    play(kind) {
      for (let g = 0; g < 40 && !ctx.finished; g++) choose(kind === 'win' ? ans : (ans + 1) % 4);
    },
  };
}
