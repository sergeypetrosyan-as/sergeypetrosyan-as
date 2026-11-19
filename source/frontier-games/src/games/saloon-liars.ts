import { h } from '../core/dom';
import { makeRng, pick, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Saloon Liars: each patron makes one statement; honest patrons speak truly, liars falsely. Find the single consistent labelling. */
const NAMES = ['Abe', 'Belle', 'Cass', 'Dutch', 'Edna', 'Flint'];
const SIZES = [4, 5, 6];
const STRIKES = 3;

type St = { k: 'is' | 'both' | 'one' | 'same' | 'cnt'; a: number; b: number; v: boolean; n: number };
const holds = (s: St, x: boolean[]): boolean =>
  s.k === 'is' ? x[s.a] === s.v : s.k === 'both' ? x[s.a] === s.v && x[s.b] === s.v : s.k === 'one' ? x[s.a] !== x[s.b] : s.k === 'same' ? x[s.a] === x[s.b] : x.filter((q) => !q).length >= s.n;
const sat = (sts: St[], x: boolean[]): boolean => sts.every((s, i) => holds(s, x) === x[i]);

/** Build statements with exactly one consistent labelling that mixes honest and lying patrons. */
function make(rand: () => number, n: number, level: number): { sts: St[]; sol: boolean[] } {
  const kinds: St['k'][] = level === 0 ? ['is', 'is', 'same'] : level === 1 ? ['is', 'both', 'one', 'same'] : ['is', 'both', 'one', 'same', 'cnt'];
  for (let tries = 0; ; tries++) {
    const sts: St[] = [];
    for (let i = 0; i < n; i++) {
      const k = pick(rand, kinds);
      let a = rint(rand, 0, n - 1); while (a === i) a = rint(rand, 0, n - 1);
      let b = rint(rand, 0, n - 1); while (b === i || b === a) b = rint(rand, 0, n - 1);
      sts.push({ k, a, b, v: rand() < 0.5, n: rint(rand, 2, Math.max(2, n - 2)) });
    }
    const found: boolean[][] = [];
    for (let m = 0; m < 1 << n && found.length < 2; m++) { const x = Array.from({ length: n }, (_, i) => !!(m >> i & 1)); if (sat(sts, x)) found.push(x); }
    if (found.length === 1 && found[0].some((q) => q) && found[0].some((q) => !q)) return { sts, sol: found[0] };
    if (tries > 200000) throw new Error('no puzzle');
  }
}

export default function saloonLiars(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let round = 0, strikes = 0, score = 0, n = 4;
  let sts: St[] = [], sol: boolean[] = [];
  let lab: (boolean | null)[] = [];
  let msg = '';

  const style = h('style', null, `
    .sl{width:100%;max-width:460px;display:flex;flex-direction:column;gap:8px}
    .sl-card{display:grid;grid-template-columns:36px 1fr;gap:4px 10px;align-items:center;padding:8px 10px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-night)}
    .sl-stool{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:var(--mw-saddle);border:2px solid var(--mw-tan);color:var(--mw-bone);font:700 .95rem var(--mw-font-slab)}
    .sl-say{font:500 .98rem/1.3 var(--mw-font-body);color:var(--mw-bone)}
    .sl-say b{display:inline-block;padding:0 6px;border-radius:999px;background:var(--mw-wine);border:1px solid var(--mw-rose);font:700 .88rem var(--mw-font-slab);white-space:nowrap}
    .sl-btns{grid-column:1/3;display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .sl-b{min-height:44px;border-radius:8px;border:2px solid var(--mw-ember);background:var(--mw-dusk);color:var(--mw-bone);font:700 .95rem var(--mw-font-slab);cursor:pointer}
    .sl-b.on.h{background:var(--mw-tan);color:var(--mw-ink);border-color:var(--mw-bone)}
    .sl-b.on.l{background:var(--mw-red);color:var(--mw-white);border-color:var(--mw-bone)}
    .sl-msg{margin:0;min-height:2.6em}
  `);
  const list = h('div', { class: 'sl' });
  const note = h('p', { class: 'mw-note sl-msg', role: 'status' });
  const go = h('button', { class: 'mw-btn primary', type: 'button', 'data-check': '', style: { width: '100%', minHeight: '48px' } }, 'Check my labels');
  ctx.root.append(style, h('div', { class: 'sl' }, list, note, go));
  go.addEventListener('click', () => check());

  function nm(i: number) { return h('b', null, NAMES[i]); }
  function say(s: St): (Node | string)[] {
    const w = s.v ? 'honest' : 'lying';
    switch (s.k) {
      case 'is': return ['"', nm(s.a), ` is ${w}."`];
      case 'both': return ['"', nm(s.a), ' and ', nm(s.b), ` are both ${w}."`];
      case 'one': return ['"Exactly one of ', nm(s.a), ' and ', nm(s.b), ' is lying."'];
      case 'same': return ['"', nm(s.a), ' and ', nm(s.b), ' are the same kind."'];
      default: return [`"At least ${s.n} of us here are lying."`];
    }
  }
  function render(): void {
    list.replaceChildren(...sts.map((s, i) => h('div', { class: 'sl-card' },
      h('span', { class: 'sl-stool', 'aria-hidden': 'true' }, String.fromCharCode(65 + i)),
      h('div', { class: 'sl-say' }, h('strong', null, NAMES[i] + ': '), ...say(s)),
      h('div', { class: 'sl-btns' },
        h('button', { class: 'sl-b h' + (lab[i] === true ? ' on' : ''), type: 'button', 'data-p': i, 'data-v': 'h', 'aria-pressed': String(lab[i] === true), onclick: () => mark(i, true) }, '✓ Honest'),
        h('button', { class: 'sl-b l' + (lab[i] === false ? ' on' : ''), type: 'button', 'data-p': i, 'data-v': 'l', 'aria-pressed': String(lab[i] === false), onclick: () => mark(i, false) }, '✗ Liar')))));
    note.textContent = msg;
    (go as HTMLButtonElement).disabled = lab.some((q) => q === null);
    ctx.hud('Round', `${round + 1}/${SIZES.length}`); ctx.hud('Strikes', `${strikes}/${STRIKES}`); ctx.hud('Score', score);
  }
  function startRound(): void {
    n = SIZES[round];
    ({ sts, sol } = make(rand, n, round));
    lab = Array(n).fill(null);
    msg = `${n} patrons. Honest ones always tell the truth, liars always lie. Mark them all.`;
    render();
  }
  function mark(i: number, v: boolean): void {
    if (ctx.finished) return;
    lab[i] = lab[i] === v ? null : v; ctx.sfx('tap'); render();
  }
  /** The one scoring action: test the labels. */
  function check(): void {
    if (ctx.finished || lab.some((q) => q === null)) return;
    const right = lab.filter((q, i) => q === sol[i]).length;
    if (right === n) {
      score += 300; ctx.sfx('good');
      if (round >= SIZES.length - 1) { score += (STRIKES - strikes) * 100; render(); ctx.finish({ result: 'win', score, title: 'Every liar named', detail: `You sorted all ${SIZES.length} rounds with ${strikes} strike${strikes === 1 ? '' : 's'}.` }); return; }
      round++; startRound(); msg = 'Correct. More patrons, more tangles.'; render(); return;
    }
    strikes++; ctx.sfx('bad');
    msg = `${right} of ${n} labels are right. That statement set does not fit.`;
    render();
    if (strikes >= STRIKES) ctx.finish({ result: 'lose', score, title: 'The sheriff gives up', detail: `Three wrong accusations. You cleared ${round} of ${SIZES.length} rounds.` });
  }

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; strikes = 0; score = 0; startRound(); },
    probe: () => ({ round, strikes, lab: lab.map((q) => (q === null ? '-' : q ? 'H' : 'L')).join(''), score }),
    play(kind: Result) {
      for (let g = 0; g < 40 && !ctx.finished; g++) {
        sol.forEach((s, i) => { const want = kind === 'win' ? s : !s; if (lab[i] !== want) mark(i, want); });
        check();
      }
    },
  };
}
