import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Gavel Auction: eight sealed-bid lots against three rivals. Win a lot for less than it is worth; out-earn every rival. */
const LOTS = ['Silver spurs', 'Brass lantern', 'Fine saddle', 'Winchester rifle', 'Gold watch', 'Bolt of cloth', 'Prize mule', 'Parlor piano'];
const RIVALS = [{ n: 'Paddle 1', g: '▲' }, { n: 'Paddle 2', g: '■' }, { n: 'Paddle 3', g: '●' }];
const CASH = 100, NEED = 25, STEP = 5;

export default function gavelAuction(ctx: Ctx): Instance {
  let rand = makeRng(1), lot = 0, cash = CASH, profit = 0, bid = 0, worth: number[] = [], want: number[][] = [], rc: number[] = [], rp: number[] = [], rw: number[] = [], last = '', revealed: (number | null)[] = [null, null, null], won = 0;

  const style = h('style', null, `
    .ga{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px}
    .ga-lot{border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised);padding:10px;text-align:center}
    .ga-lot b{display:block;font:700 1.3rem var(--mw-font-slab);color:var(--mw-bone)}
    .ga-lot span{font:700 1.8rem var(--mw-font-slab);color:var(--mw-rose)}
    .ga-riv{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
    .ga-r{border:2px solid var(--mw-mesa);border-radius:8px;background:var(--mw-night);padding:5px 3px;text-align:center;font:600 .78rem/1.3 var(--mw-font-slab);color:var(--mw-bone)}
    .ga-r b{display:block;font-size:.95rem}.ga-r.top{border-color:var(--mw-rose)}
    .ga-bid{display:flex;align-items:center;justify-content:center;gap:6px}
    .ga-bid .mw-btn{min-width:52px;min-height:52px;padding:0 6px}
    .ga-val{min-width:84px;text-align:center;font:700 2.2rem var(--mw-font-slab);color:var(--mw-bone);font-variant-numeric:tabular-nums}
  `);
  const lotEl = h('div', { class: 'ga-lot', 'aria-live': 'polite' }), riv = h('div', { class: 'ga-riv' }), val = h('div', { class: 'ga-val', 'data-val': '' });
  const say = h('p', { class: 'mw-note', role: 'status' });
  const stepBtn = (d: number) => h('button', { class: 'mw-btn', type: 'button', 'data-step': d, 'aria-label': `Bid ${d > 0 ? 'up' : 'down'} ${Math.abs(d)}`, onclick: () => adj(d) }, (d > 0 ? '+' : '−') + Math.abs(d));
  const place = h('button', { class: 'mw-btn primary', type: 'button', 'data-place': '', style: { minHeight: '54px' }, onclick: () => submit() }, 'Place bid');
  ctx.root.append(style, h('div', { class: 'ga' }, lotEl, riv, say, h('div', { class: 'ga-bid' }, stepBtn(-10), stepBtn(-STEP), val, stepBtn(STEP), stepBtn(10)), place));

  function render(): void {
    lotEl.replaceChildren(h('small', { class: 'mw-note' }, `Lot ${Math.min(lot + 1, LOTS.length)} of ${LOTS.length}`), h('b', null, LOTS[Math.min(lot, LOTS.length - 1)]), h('span', null, `Worth $${worth[Math.min(lot, LOTS.length - 1)]} to you`));
    const hi = Math.max(...revealed.map((x) => x ?? -1));
    riv.replaceChildren(...RIVALS.map((r, i) => h('div', { class: 'ga-r' + (revealed[i] !== null && revealed[i] === hi && hi > 0 ? ' top' : '') }, h('b', null, `${r.g} ${r.n}`), `Lots won: ${rw[i]}`, h('br'), `Profit: $${rp[i]}`, h('br'), revealed[i] === null ? 'Last bid: -' : `Last bid: $${revealed[i]}`)));
    val.textContent = `$${bid}`;
    say.textContent = last || `You have $${cash}. Bid under the lot’s worth, but above what rivals will pay.`;
    ctx.hud('Lot', `${Math.min(lot + 1, LOTS.length)}/${LOTS.length}`); ctx.hud('Your profit', `$${profit}`); ctx.hud('Cash', `$${cash}`);
  }
  function adj(d: number): void { if (ctx.finished) return; bid = Math.max(0, Math.min(cash, bid + d)); val.textContent = `$${bid}`; ctx.sfx('tick'); }
  /** The one scoring action: place the sealed bid for this lot. */
  function submit(): void {
    if (ctx.finished || lot >= LOTS.length) return;
    const v = worth[lot], bids = RIVALS.map((_, i) => Math.min(want[i][lot], rc[i]));
    const top = Math.max(...bids);
    let winner = -1; // -1 = you, else rival index, -2 = no sale
    if (bid > top) winner = -1; else if (top > 0) winner = bids.indexOf(top); else winner = -2;
    revealed = bids.slice();
    if (winner === -1 && bid > 0) { cash += v - bid; profit += v - bid; won++; last = `You won ${LOTS[lot]} for $${bid}: +$${v - bid}. Rivals bid ${bids.map((b) => '$' + b).join(', ')}.`; ctx.sfx('good'); }
    else if (winner >= 0) { rc[winner] += v - bids[winner]; rp[winner] += v - bids[winner]; rw[winner]++; last = `${RIVALS[winner].n} took ${LOTS[lot]} for $${top} (you bid $${bid}).`; ctx.sfx('bad'); }
    else last = `No sale on ${LOTS[lot]}.`;
    lot++; bid = Math.min(bid, cash);
    if (lot >= LOTS.length) {
      const best = Math.max(...rp), win = profit > best && profit >= NEED;
      render(); ctx.finish({ result: win ? 'win' : 'lose', score: Math.max(0, profit * 10), title: win ? 'Top bidder' : 'Outbid', detail: win ? `You cleared $${profit}; the best rival made $${best}.` : profit < NEED ? `You made $${profit}; $${NEED} was the minimum.` : `You made $${profit}, but a rival made $${best}.` });
      return;
    }
    render();
  }
  ctx.keys({ ArrowUp: (d) => d && adj(STEP), ArrowDown: (d) => d && adj(-STEP), Enter: (d) => d && submit() });

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); lot = 0; cash = CASH; profit = 0; bid = 20; last = ''; won = 0; revealed = [null, null, null];
      worth = LOTS.map(() => 20 + 5 * Math.floor(rand() * 9));
      const f = RIVALS.map(() => 0.5 + rand() * 0.35);
      want = RIVALS.map((_, i) => worth.map((v) => Math.round((v * (f[i] + (rand() - 0.5) * 0.3)) / STEP) * STEP));
      rc = RIVALS.map(() => 50 + Math.floor(rand() * 5) * 10); rp = [0, 0, 0]; rw = [0, 0, 0];
      render();
    },
    probe: () => ({ lot, bid, cash, profit }),
    play(kind) {
      while (!ctx.finished && lot < LOTS.length) {
        const top = Math.max(...RIVALS.map((_, i) => Math.min(want[i][lot], rc[i])));
        const target = kind === 'win' && top + STEP < worth[lot] ? top + STEP : 0;
        while (bid < target) adj(STEP); while (bid > target) adj(-STEP);
        submit();
      }
    },
  };
}
