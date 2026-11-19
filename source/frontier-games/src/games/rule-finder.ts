import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Rule Finder: test cards against a secret rule (8 tests), then name the rule. Two wrong guesses are forgiven. */
interface Card { r: number; s: number }
const SUITS = ['♠', '♥', '♦', '♣'], SNAME = ['spades', 'hearts', 'diamonds', 'clubs'];
const RED = (s: number) => s === 1 || s === 2;
const PRIME = [2, 3, 5, 7];
const RULES: { name: string; ok: (c: Card) => boolean }[] = [
  { name: 'Red suits', ok: (c) => RED(c.s) },
  { name: 'Black suits', ok: (c) => !RED(c.s) },
  { name: 'Even ranks', ok: (c) => c.r % 2 === 0 },
  { name: 'Odd ranks', ok: (c) => c.r % 2 === 1 },
  { name: 'Rank 6 or higher', ok: (c) => c.r >= 6 },
  { name: 'Rank 5 or lower', ok: (c) => c.r <= 5 },
  { name: 'Hearts or spades', ok: (c) => c.s <= 1 },
  { name: 'Diamonds or clubs', ok: (c) => c.s >= 2 },
  { name: 'Prime ranks (2 3 5 7)', ok: (c) => PRIME.includes(c.r) },
  { name: 'Red and even', ok: (c) => RED(c.s) && c.r % 2 === 0 },
  { name: 'Black or rank 8+', ok: (c) => !RED(c.s) || c.r >= 8 },
  { name: 'Rank 3 to 8', ok: (c) => c.r >= 3 && c.r <= 8 },
];
const TESTS = 8, LIVES = 3;

export default function ruleFinder(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let secret = 0, opts: number[] = [], hand: Card[] = [], tested: { c: Card; ok: boolean }[] = [], misses = 0;

  const style = h('style', null, `
    .rf{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px}
    .rf h3{margin:0;font:700 .85rem var(--mw-font-slab);color:var(--mw-tan);letter-spacing:.05em;text-transform:uppercase}
    .rf-hand{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}
    .rf-card{min-height:76px;border-radius:7px;border:2px solid var(--mw-ember);background:var(--mw-bone);color:var(--mw-ink);font:700 1.15rem/1.1 var(--mw-font-slab);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;cursor:pointer}
    .rf-card.red{color:var(--mw-red)}
    .rf-card small{font-size:1.2rem}
    .rf-card:disabled{opacity:.4}
    .rf-tbl{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .rf-col{border:2px solid var(--mw-ember);border-radius:8px;background:var(--mw-night);padding:6px;min-height:84px}
    .rf-col.a{border-color:var(--mw-rose)}.rf-col.r{border-color:var(--mw-red)}
    .rf-col .rf-chips{display:flex;flex-wrap:wrap;gap:3px;margin-top:4px}
    .rf-mini{padding:1px 5px;border-radius:4px;background:var(--mw-bone);color:var(--mw-ink);font:700 .85rem var(--mw-font-slab)}
    .rf-mini.red{color:var(--mw-red)}
    .rf-opts{display:grid;grid-template-columns:1fr 1fr;gap:6px}
    .rf-opt{min-height:46px;font-size:.92rem;padding:0 8px;text-align:center;line-height:1.15}
  `);
  const handEl = h('div', { class: 'rf-hand' });
  const accEl = h('div', { class: 'rf-chips' }), rejEl = h('div', { class: 'rf-chips' });
  const optEl = h('div', { class: 'rf-opts' });
  const say = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'rf' },
    h('h3', null, 'Your hand: tap a card to offer it'), handEl,
    h('div', { class: 'rf-tbl' },
      h('div', { class: 'rf-col a' }, h('h3', null, '✓ Accepted'), accEl),
      h('div', { class: 'rf-col r' }, h('h3', null, '✗ Rejected'), rejEl)),
    say, h('h3', null, 'Name the rule'), optEl));

  const draw = (): Card => ({ r: 1 + Math.floor(rand() * 10), s: Math.floor(rand() * 4) });
  const mini = (c: Card) => h('span', { class: 'rf-mini' + (RED(c.s) ? ' red' : ''), 'aria-label': `${c.r} of ${SNAME[c.s]}` }, `${c.r}${SUITS[c.s]}`);

  function render(): void {
    handEl.replaceChildren(...hand.map((c, i) => h('button', { class: 'rf-card' + (RED(c.s) ? ' red' : ''), type: 'button', 'data-card': i, disabled: tested.length >= TESTS, 'aria-label': `Offer ${c.r} of ${SNAME[c.s]}`, onclick: () => test(i) }, String(c.r), h('small', null, SUITS[c.s]))));
    accEl.replaceChildren(...tested.filter((x) => x.ok).map((x) => mini(x.c)));
    rejEl.replaceChildren(...tested.filter((x) => !x.ok).map((x) => mini(x.c)));
    optEl.replaceChildren(...opts.map((o) => h('button', { class: 'mw-btn rf-opt', type: 'button', 'data-rule': o, onclick: () => guess(o) }, RULES[o].name)));
    ctx.hud('Tests left', TESTS - tested.length); ctx.hud('Guesses left', LIVES - misses);
  }
  /** Offer one card to the dealer. */
  function test(i: number): void {
    if (ctx.finished || tested.length >= TESTS || !hand[i]) return;
    const c = hand[i], ok = RULES[secret].ok(c);
    tested.push({ c, ok }); hand[i] = draw(); ctx.sfx(ok ? 'good' : 'bad');
    render(); say.textContent = `${c.r}${SUITS[c.s]} is ${ok ? 'Accepted' : 'Rejected'}.` + (tested.length >= TESTS ? ' No tests left: name the rule.' : '');
  }
  /** Name the rule. */
  function guess(o: number): void {
    if (ctx.finished) return;
    if (o === secret) {
      ctx.sfx('win'); ctx.finish({ result: 'win', score: (TESTS - tested.length) * 60 + (LIVES - misses) * 100, title: 'Rule found', detail: `The dealer’s rule was “${RULES[secret].name}”, found after ${tested.length} tests.` });
      return;
    }
    misses++; opts = opts.filter((x) => x !== o); ctx.sfx('bad'); render();
    if (misses >= LIVES) ctx.finish({ result: 'lose', score: tested.length * 10, title: 'The dealer smiles', detail: `The rule was “${RULES[secret].name}”.` });
    else say.textContent = `Not “${RULES[o].name}”. ${LIVES - misses} guesses left.`;
  }
  ctx.keys(Object.fromEntries([0, 1, 2, 3, 4, 5].map((i) => [String(i + 1), (d: boolean) => { if (d) test(i); }])));

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); secret = Math.floor(rand() * RULES.length);
      opts = shuffle(rand, [secret, ...shuffle(rand, RULES.map((_, i) => i).filter((i) => i !== secret)).slice(0, 7)]);
      hand = Array.from({ length: 6 }, draw); tested = []; misses = 0; render();
      say.textContent = 'Offer a card to learn what the dealer accepts.';
    },
    probe: () => ({ tested: tested.map((x) => `${x.c.r}${x.c.s}${x.ok ? 1 : 0}`), misses }),
    play(kind) {
      test(0); test(1);
      if (kind === 'win') guess(secret);
      else for (const o of opts.slice()) { if (o !== secret && !ctx.finished) guess(o); }
    },
  };
}
