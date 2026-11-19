import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Tarot Trick: best of three hands. Each hand has five tricks with known prizes; the rival leads a face-up card, you answer with one of yours. Higher wins (the 1 slays the 15). Take 5 of the 9 prize stars to win a hand. */
const TRICKS = 5, NEED = 5, HANDS = 3;
const SUIT = ['★', '☾', '☀', '✚'];
const beats = (a: number, b: number) => (a === 1 && b === 15 ? true : b === 1 && a === 15 ? false : a > b);
const perms = (n: number): number[][] => (n <= 1 ? [[0]] : perms(n - 1).flatMap((p) => Array.from({ length: n }, (_, i) => [...p.slice(0, i), n - 1, ...p.slice(i)])));
const PERMS = perms(TRICKS);

export default function tarotTrick(ctx: Ctx): Instance {
  type Phase = 'play' | 'show' | 'done';
  let rand = makeRng(1);
  let hand = 0, trick = 0, phase: Phase = 'play', t = 0, mine: number[] = [], used: boolean[] = [], rival: number[] = [], prizes: number[] = [];
  let me = 0, foe = 0, wins = 0, losses = 0, score = 0, log: { a: number; b: number; w: boolean }[] = [], msg = '', plan: number[] = [];

  const prizeRow = h('div', { class: 'tt-prizes', 'aria-label': 'Trick prizes' });
  const table = h('div', { class: 'tt-table', 'aria-live': 'polite' });
  const handEl = h('div', { class: 'tt-hand' });
  const say = h('p', { class: 'mw-note' });
  const style = h('style', null, `
    .tt{width:100%;max-width:470px;display:flex;flex-direction:column;align-items:center;gap:10px}
    .tt-prizes{display:grid;grid-template-columns:repeat(${TRICKS},1fr);gap:5px;width:100%}
    .tt-p{border:2px solid var(--mw-mesa);border-radius:8px;padding:4px 0;text-align:center;font:700 .85rem var(--mw-font-slab);color:var(--mw-ash);background:var(--mw-night)}
    .tt-p.now{border-color:var(--mw-rose);color:var(--mw-bone)}
    .tt-p.w{background:var(--mw-rose);color:var(--mw-ink);border-color:var(--mw-bone)}
    .tt-p.l{background:var(--mw-wine);color:var(--mw-bone);border-color:var(--mw-red)}
    .tt-table{width:100%;min-height:146px;display:flex;gap:18px;justify-content:center;align-items:center;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised,var(--mw-dusk))}
    .tt-slot{display:flex;flex-direction:column;align-items:center;gap:3px;font:600 .75rem var(--mw-font-slab);color:var(--mw-ash)}
    .tt-card{width:58px;height:88px;border-radius:7px;border:3px double var(--mw-ember);background:var(--mw-bone);color:var(--mw-ink);display:flex;flex-direction:column;align-items:center;justify-content:center;font:700 1.55rem var(--mw-font-slab);padding:0;position:relative}
    .tt-card small{font-size:.8rem;line-height:1}
    .tt-card em{font-style:normal;font-size:.62rem;position:absolute;bottom:3px;color:var(--mw-red);font-weight:700}
    .tt-table .tt-card{width:74px;height:112px;font-size:2rem}
    .tt-card.back{background:var(--mw-wine);color:var(--mw-rose);border-color:var(--mw-rose)}
    .tt-card.win{border-color:var(--mw-rose);box-shadow:0 0 0 3px var(--mw-rose)}
    .tt-card.lose{opacity:.55}
    .tt-hand{display:grid;grid-template-columns:repeat(${TRICKS},1fr);gap:6px;width:100%;justify-items:center}
    button.tt-card{cursor:pointer}
    button.tt-card:disabled{opacity:.3;cursor:default}
    button.tt-card:not(:disabled):hover{transform:translateY(-4px)}
  `);
  ctx.root.append(style, h('div', { class: 'tt' }, prizeRow, table, handEl, say));

  const cardEl = (v: number, cls = '', tag: 'div' | 'button' = 'div', extra: Record<string, unknown> = {}) =>
    h(tag, { class: 'tt-card ' + cls, ...extra }, h('small', null, SUIT[v % 4]), v, v === 1 ? h('em', null, 'beats 15') : v === 15 ? h('em', null, 'World') : null);
  function hud(): void { ctx.hud('Hand', `${hand + 1}/${HANDS}`); ctx.hud('Stars', `${me} - ${foe}`); ctx.hud('Hands won', `${wins} - ${losses}`); }
  function render(): void {
    prizeRow.replaceChildren(...prizes.map((p, i) => h('div', { class: 'tt-p' + (i === trick && phase !== 'done' ? ' now' : '') + (log[i] ? (log[i].w ? ' w' : ' l') : '') }, '★'.repeat(p), log[i] ? (log[i].w ? ' ✓' : ' ✕') : '')));
    const cur = phase === 'show' ? log[trick] : null;
    table.replaceChildren(
      h('div', { class: 'tt-slot' }, 'Rival leads', cardEl(rival[Math.min(trick, TRICKS - 1)], cur ? (cur.w ? 'lose' : 'win') : '')),
      h('div', { class: 'tt-slot' }, 'You answer', cur ? cardEl(cur.a, cur.w ? 'win' : 'lose') : h('div', { class: 'tt-card back', 'aria-hidden': 'true' }, '?')));
    handEl.replaceChildren(...mine.map((v, i) => cardEl(v, '', 'button', { type: 'button', 'data-card': i, disabled: used[i] || phase !== 'play', 'aria-label': `Play card ${v}`, onclick: () => play(i) })).map((b, i) => { if (used[i]) b.style.visibility = 'hidden'; return b; }));
    say.textContent = msg || `Trick ${trick + 1}: the prize is ${prizes[trick]} ${prizes[trick] === 1 ? 'star' : 'stars'}. Beat the rival card, or spend a low one and save your high cards.`;
    hud();
  }
  function setPlan(): void {
    // for the test bot only: best (or worst) answer order for this hand
    const score2 = (p: number[]) => p.reduce((a, ci, k) => a + (beats(mine[ci], rival[k]) ? prizes[k] : 0), 0);
    plan = PERMS.reduce((b, p) => (score2(p) > score2(b) ? p : b));
    worst = PERMS.reduce((b, p) => (score2(p) < score2(b) ? p : b));
  }
  let worst: number[] = [];
  function deal(): void {
    const sc = (order: number[], m: number[], r: number[], pz: number[]) => order.reduce((a, ci, k) => a + (beats(m[ci], r[k]) ? pz[k] : 0), 0);
    for (let tries = 0; tries < 300; tries++) {
      const deck = shuffle(rand, Array.from({ length: 15 }, (_, i) => i + 1));
      const m = deck.slice(0, TRICKS), rc = deck.slice(TRICKS, TRICKS * 2).sort((a, b) => b - a), pz = shuffle(rand, [1, 1, 2, 2, 3]);
      // rival spends big cards on big prizes, with some noise
      const order = pz.map((p, i) => [p + rand() * 1.4, i]).sort((a, b) => b[0] - a[0]).map((x) => x[1]);
      const rv: number[] = Array(TRICKS); order.forEach((ti, k) => { rv[ti] = rc[k]; });
      const best = Math.max(...PERMS.map((p) => sc(p, m, rv, pz)));
      const hi = m.map((_, i) => i).sort((a, b) => m[b] - m[a]), lo = hi.slice().reverse();
      if (tries < 299 && (best < NEED || sc(hi, m, rv, pz) >= NEED || sc(lo, m, rv, pz) >= NEED)) continue;
      mine = m; rival = rv; prizes = pz; break;
    }
    used = mine.map(() => false); trick = 0; me = 0; foe = 0; log = []; phase = 'play'; msg = ''; setPlan();
    render();
  }
  /** The one scoring action: answer the rival's card with one of yours. */
  function play(i: number): void {
    if (ctx.finished || phase !== 'play' || used[i]) return;
    used[i] = true;
    const w = beats(mine[i], rival[trick]);
    log[trick] = { a: mine[i], b: rival[trick], w };
    if (w) me += prizes[trick]; else foe += prizes[trick];
    msg = w ? `${mine[i]} beats ${rival[trick]}: you take ${prizes[trick]} ${prizes[trick] === 1 ? 'star' : 'stars'}.` : `${rival[trick]} beats ${mine[i]}: the rival takes ${prizes[trick]}.`;
    ctx.sfx(w ? 'good' : 'bad'); phase = 'show'; t = 0; render();
  }
  function update(dt: number): void {
    if (ctx.finished || phase !== 'show') return;
    t += dt; if (t < 1) return;
    msg = '';
    if (trick < TRICKS - 1) { trick++; phase = 'play'; render(); return; }
    const won = me >= NEED; score += me * 100; if (won) wins++; else losses++;
    ctx.sfx(won ? 'win' : 'lose');
    if (wins >= 2 || losses >= 2 || hand >= HANDS - 1) {
      hud();
      ctx.finish({ result: wins > losses ? 'win' : 'lose', score, title: wins > losses ? 'Fortune favours you' : 'The rival reads the cards', detail: `You took ${wins} of ${hand + 1} hands (last hand ${me} to ${foe} stars).` });
    } else { hand++; deal(); }
  }
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); hand = 0; wins = 0; losses = 0; score = 0; deal(); },
    probe: () => ({ hand, trick, me, foe, wins, losses, used: used.join('') }),
    play(kind) {
      for (let n = 0; n < 2000 && !ctx.finished; n++) {
        if (phase === 'play') play((kind === 'win' ? plan : worst)[trick]); else update(1 / 60);
      }
    },
  };
}
