import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Running Count: three decks of rising speed. Keep the +1 / 0 / -1 total in your head, then enter it. */
const ROUNDS = [{ n: 12, gap: 1.3 }, { n: 16, gap: 0.95 }, { n: 20, gap: 0.7 }];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'], SUITS = ['♠', '♥', '♦', '♣'];
const val = (r: number) => (r >= 1 && r <= 5 ? 1 : r >= 6 && r <= 8 ? 0 : -1); // index in RANKS: 2..6 => 1..5
const FAILS = 2;

export default function runningCount(ctx: Ctx): Instance {
  type Phase = 'ready' | 'deal' | 'ask';
  let rand = makeRng(1), phase: Phase = 'ready', round = 0, deck: { r: number; s: number }[] = [], idx = 0, t = 0, ans = 0, guess = 0, wrong = 0, right = 0, msg = '';

  const style = h('style', null, `
    .rc{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:12px}
    .rc-legend{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:100%}
    .rc-lg{border:2px solid var(--mw-mesa);border-radius:8px;background:var(--mw-night);padding:5px 2px;text-align:center;font:700 .82rem/1.25 var(--mw-font-slab);color:var(--mw-bone)}
    .rc-lg b{display:block;font-size:1.15rem}.rc-lg.p b{color:var(--mw-rose)}.rc-lg.m b{color:var(--mw-red)}
    .rc-table{width:100%;min-height:210px;display:grid;place-items:center;border:2px solid var(--mw-ember);border-radius:12px;background:var(--mw-wine);padding:10px}
    .rc-card{width:128px;height:178px;border-radius:10px;background:var(--mw-bone);border:3px solid var(--mw-ember);color:var(--mw-ink);display:flex;flex-direction:column;align-items:center;justify-content:center;font:700 3.2rem/1 var(--mw-font-slab)}
    .rc-card.red{color:var(--mw-red)}.rc-card span{font-size:2.4rem}
    .rc-card.gap{visibility:hidden}
    .rc-big{font:700 1.1rem var(--mw-font-slab);color:var(--mw-bone);text-align:center}
    .rc-step{display:flex;align-items:center;gap:14px}
    .rc-step button{min-width:64px;min-height:64px;font-size:1.8rem;padding:0}
    .rc-val{min-width:90px;text-align:center;font:700 2.6rem var(--mw-font-slab);color:var(--mw-bone);font-variant-numeric:tabular-nums}
  `);
  const legend = h('div', { class: 'rc-legend' },
    h('div', { class: 'rc-lg p' }, h('b', null, '★ +1'), '2 3 4 5 6'), h('div', { class: 'rc-lg' }, h('b', null, '○ 0'), '7 8 9'), h('div', { class: 'rc-lg m' }, h('b', null, '✖ −1'), '10 J Q K A'));
  const table = h('div', { class: 'rc-table' }), bar = h('i'), say = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'rc' }, legend, table, h('div', { class: 'mw-meter' }, bar), say));

  function render(): void {
    const g = ROUNDS[round];
    if (phase === 'ready') {
      table.replaceChildren(h('div', { class: 'mw-col' }, h('div', { class: 'rc-big' }, `Round ${round + 1} of ${ROUNDS.length}: ${g.n} cards, one every ${g.gap.toFixed(2)} s`), h('button', { class: 'mw-btn primary', type: 'button', 'data-deal': '', style: { minHeight: '56px', minWidth: '160px' }, onclick: () => deal() }, 'Deal')));
      say.textContent = msg || 'Start from 0. Add as the chart says. No notes, no fingers.';
    } else if (phase === 'ask') {
      table.replaceChildren(h('div', { class: 'mw-col' }, h('div', { class: 'rc-big' }, 'What is your total?'), h('div', { class: 'rc-step' },
        h('button', { class: 'mw-btn', type: 'button', 'data-dec': '', 'aria-label': 'Minus one', onclick: () => adj(-1) }, '−'), h('div', { class: 'rc-val', 'data-val': '' }, (guess > 0 ? '+' : '') + guess),
        h('button', { class: 'mw-btn', type: 'button', 'data-inc': '', 'aria-label': 'Plus one', onclick: () => adj(1) }, '+')),
        h('button', { class: 'mw-btn primary', type: 'button', 'data-lock': '', style: { minHeight: '52px', minWidth: '160px' }, onclick: () => lock() }, 'Lock in')));
      say.textContent = 'The deck is done. Enter the total you kept.';
    }
    ctx.hud('Round', `${round + 1}/${ROUNDS.length}`); ctx.hud('Misses', `${wrong}/${FAILS}`);
  }
  function card(): void {
    const c = deck[idx];
    table.replaceChildren(h('div', { class: 'rc-card' + (c.s === 1 || c.s === 2 ? ' red' : '') + (t < 0.12 ? ' gap' : '') }, RANKS[c.r], h('span', null, SUITS[c.s])));
    bar.style.width = `${((idx + 1) / deck.length) * 100}%`; say.textContent = `Card ${idx + 1} of ${deck.length}`;
  }
  /** Start the round's deck. */
  function deal(): void {
    if (ctx.finished || phase !== 'ready') return;
    const g = ROUNDS[round];
    do { deck = Array.from({ length: g.n }, () => ({ r: Math.floor(rand() * 13), s: Math.floor(rand() * 4) })); ans = deck.reduce((a, c) => a + val(c.r), 0); } while (Math.abs(ans) < 1 || Math.abs(ans) > 5);
    phase = 'deal'; idx = 0; t = 0; guess = 0; ctx.sfx('tap'); card(); ctx.hud('Round', `${round + 1}/${ROUNDS.length}`);
  }
  function adj(d: number): void { if (ctx.finished || phase !== 'ask') return; guess = Math.max(-20, Math.min(20, guess + d)); (table.querySelector('[data-val]') as HTMLElement).textContent = (guess > 0 ? '+' : '') + guess; }
  /** Submit the total. */
  function lock(): void {
    if (ctx.finished || phase !== 'ask') return;
    const ok = guess === ans; bar.style.width = '0%';
    if (ok) { right++; ctx.sfx('good'); msg = `Correct: the total was ${ans > 0 ? '+' : ''}${ans}.`; } else { wrong++; ctx.sfx('bad'); msg = `Not quite: the total was ${ans > 0 ? '+' : ''}${ans}, you said ${guess}.`; }
    if (wrong >= FAILS) { ctx.finish({ result: 'lose', score: right * 100, title: 'Count lost', detail: `${msg} Two wrong totals end the game.` }); return; }
    if (round + 1 >= ROUNDS.length) { ctx.sfx('win'); ctx.finish({ result: 'win', score: right * 100 + (FAILS - wrong) * 50, title: 'Steady head', detail: `All three decks counted, ${wrong} miss${wrong === 1 ? '' : 'es'}.` }); return; }
    round++; phase = 'ready'; render();
  }
  function update(dt: number): void {
    if (phase !== 'deal' || ctx.finished) return;
    const was = t < 0.12; t += dt;
    if (was && t >= 0.12) card();
    if (t >= ROUNDS[round].gap) { t = 0; idx++; if (idx >= deck.length) { phase = 'ask'; bar.style.width = '100%'; render(); } else card(); }
  }
  ctx.keys({ ' ': (d) => d && phase === 'ready' && deal(), Enter: (d) => { if (!d) return; if (phase === 'ready') deal(); else lock(); }, ArrowUp: (d) => d && adj(1), ArrowDown: (d) => d && adj(-1), '+': (d) => d && adj(1), '-': (d) => d && adj(-1) });
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); phase = 'ready'; round = 0; wrong = 0; right = 0; msg = ''; idx = 0; t = 0; guess = 0; bar.style.width = '0%'; render(); },
    probe: () => ({ phase, round, idx, guess, wrong }),
    play(kind) {
      for (let r = 0; r < 6 && !ctx.finished; r++) {
        deal(); for (let g = 0; g < 3000 && phase === 'deal'; g++) update(1 / 60);
        const target = kind === 'win' ? ans : ans + 1; while (guess < target) adj(1); while (guess > target) adj(-1);
        lock();
      }
    },
  };
}
