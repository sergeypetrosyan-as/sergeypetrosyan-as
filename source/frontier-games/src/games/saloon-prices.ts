import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Saloon Prices: thirty nights. Read tonight's crowd forecast, set one price, and learn the demand curve from your ledger. */
const NIGHTS = 30, COST = 20, RENT = 100, STOCK = 40, BASE = 64, PMIN = 20, PMAX = 140;
// n: crowd multiplier, m: the price at which nobody buys
const EVENTS = [
  { name: 'Quiet night', note: 'An ordinary crowd.', n: 1, m: 120 },
  { name: 'Payday', note: 'Pockets are full: people will pay more.', n: 1.1, m: 150 },
  { name: 'Rain', note: 'Few riders in town. Fewer thirsty people.', n: 0.6, m: 120 },
  { name: 'Cattle drive', note: 'A huge crowd, but you only stock 40 drinks.', n: 1.5, m: 120 },
  { name: 'Rival half-price', note: 'The saloon next door undercuts you.', n: 1, m: 90 },
];
const money = (c: number): string => `${c < 0 ? '-' : ''}$${(Math.abs(c) / 100).toFixed(2)}`;
type Ev = (typeof EVENTS)[number];
const demand = (e: Ev, p: number): number => Math.max(0, Math.min(STOCK, BASE * e.n * (1 - p / e.m)));
const bestPrice = (e: Ev): number => { let b = PMIN; for (let p = PMIN; p <= PMAX; p += 5) if ((p - COST) * Math.round(demand(e, p)) > (b - COST) * Math.round(demand(e, b))) b = p; return b; };

export default function saloonPrices(ctx: Ctx): Instance {
  let rand = makeRng(1), night = 1, savings = 0, goal = 0, price = 60, plan: Ev[] = [];
  let hist: { p: number; q: number }[] = [], last = '';
  const out = h('p', { class: 'mw-note', role: 'status' });
  const chart = h('svg', { viewBox: '0 0 300 130', class: 'sp-chart', role: 'img', 'aria-label': 'Drinks sold at each price you tried' }) as unknown as SVGSVGElement;
  const ev = h('div', { class: 'sp-ev' }), big = h('div', { class: 'mw-big' });
  const slider = h('input', { type: 'range', min: PMIN, max: PMAX, step: 5, value: price, 'aria-label': 'Drink price in cents', oninput: (e: Event) => setPrice(+(e.target as HTMLInputElement).value) }) as HTMLInputElement;
  const step = (d: number, t: string): HTMLElement => h('button', { class: 'mw-btn', type: 'button', 'aria-label': `${d < 0 ? 'Lower' : 'Raise'} price`, onclick: () => setPrice(price + d) }, t);
  const open = h('button', { class: 'mw-btn primary', type: 'button', 'data-open': '', onclick: () => openNight() }, 'Open the saloon');
  const style = h('style', null, `
    .sp{width:100%;max-width:520px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .sp-ev{width:100%;padding:8px 12px;border:2px dashed var(--mw-saddle);border-radius:10px;text-align:center;color:var(--mw-bone)}
    .sp-ev b{display:block;font:700 1.1rem var(--mw-font-slab);color:var(--mw-rose)}
    .sp-chart{width:100%;max-width:420px;border:2px solid var(--mw-saddle);border-radius:10px;background:var(--mw-night)}
    .sp-ax{font:600 9px var(--mw-font-slab);fill:var(--mw-ash)}
    .sp .mw-row .mw-btn{min-width:56px}
    .sp-goal{width:100%;max-width:420px;display:flex;flex-direction:column;gap:4px;align-items:center;font:600 .85rem var(--mw-font-slab);color:var(--mw-ash)}
  `);
  const goalBar = h('i'), goalEl = h('div', { class: 'mw-meter' }, goalBar);
  ctx.root.append(style, h('div', { class: 'sp' }, ev, h('div', { class: 'mw-row' }, step(-5, '-5'), big, step(5, '+5')), slider, open, out, chart, h('div', { class: 'sp-goal' }, h('span', null, 'Savings toward the goal'), goalEl)));

  function drawChart(): void {
    chart.replaceChildren();
    const X = (p: number): number => 28 + ((p - PMIN) / (PMAX - PMIN)) * 264, Y = (q: number): number => 112 - (q / STOCK) * 96;
    chart.append(h('line', { x1: 28, y1: 112, x2: 292, y2: 112, stroke: 'var(--mw-smoke)' }), h('line', { x1: 28, y1: 12, x2: 28, y2: 112, stroke: 'var(--mw-smoke)' }),
      h('text', { class: 'sp-ax', x: 160, y: 126, 'text-anchor': 'middle' }, 'Price (cents) →'), h('text', { class: 'sp-ax', x: 26, y: 18, 'text-anchor': 'end' }, '40'), h('text', { class: 'sp-ax', x: 26, y: 112, 'text-anchor': 'end' }, '0'),
      h('text', { class: 'sp-ax', x: 160, y: 10, 'text-anchor': 'middle' }, 'Drinks sold per night'));
    hist.forEach((d, i) => chart.append(h('path', { d: `M${X(d.p)} ${Y(d.q) - 5} l5 5 l-5 5 l-5 -5 Z`, fill: i === hist.length - 1 ? 'var(--mw-rose)' : 'var(--mw-tan)', stroke: 'var(--mw-bone)', 'stroke-width': 1 })));
    chart.append(h('line', { x1: X(price), y1: 112, x2: X(price), y2: 104, stroke: 'var(--mw-bone)', 'stroke-width': 3 }));
  }
  function render(): void {
    const e = plan[Math.min(night, NIGHTS) - 1];
    ev.replaceChildren(h('b', null, `Tonight: ${e.name}`), e.note);
    big.textContent = `${money(price)} a drink`; slider.value = String(price);
    out.textContent = last || 'Higher prices earn more per drink but sell fewer. Each night shows one point on your ledger chart.';
    (goalBar as HTMLElement).style.width = `${Math.max(0, Math.min(100, (savings / goal) * 100))}%`;
    drawChart();
    ctx.hud('Night', `${Math.min(night, NIGHTS)}/${NIGHTS}`); ctx.hud('Savings', money(savings)); ctx.hud('Goal', money(goal));
  }
  function setPrice(p: number): void { if (ctx.finished) return; price = Math.max(PMIN, Math.min(PMAX, Math.round(p / 5) * 5)); render(); }
  /** The one action: open the saloon tonight at the current price. */
  function openNight(): void {
    if (ctx.finished) return;
    const e = plan[night - 1];
    const q = Math.max(0, Math.min(STOCK, Math.round(demand(e, price)) + rint(rand, -3, 3)));
    const profit = q * (price - COST) - RENT;
    savings += profit; hist.push({ p: price, q });
    last = `Night ${night}: sold ${q} drinks at ${money(price)}. Takings ${money(q * price)}, drinks cost ${money(q * COST)}, rent ${money(RENT)}. Profit ${profit >= 0 ? '+' : ''}${money(profit)}.`;
    ctx.sfx(profit > 0 ? 'good' : 'bad');
    if (savings >= goal) { night++; render(); ctx.finish({ result: 'win', score: Math.round(savings / 10) + (NIGHTS - night + 1) * 20, title: 'Savings goal reached', detail: `You saved ${money(savings)} in ${night - 1} nights.` }); return; }
    night++;
    if (night > NIGHTS) { render(); ctx.finish({ result: 'lose', score: Math.max(0, Math.round(savings / 20)), title: 'Thirty nights, short of the goal', detail: `You saved ${money(savings)} of ${money(goal)}.` }); return; }
    render();
  }

  return {
    destroy() { /* released by the shell */ },
    reset(seed) {
      rand = makeRng(seed); night = 1; savings = 0; price = 60; hist = []; last = '';
      plan = Array.from({ length: NIGHTS }, () => EVENTS[rint(rand, 0, EVENTS.length - 1)]);
      goal = Math.round((plan.reduce((s, e) => { const p = bestPrice(e); return s + (p - COST) * Math.round(demand(e, p)) - RENT; }, 0) * 0.86) / 500) * 500;
      render();
    },
    probe: () => ({ night, savings, price, sold: hist.length }),
    play(kind) {
      while (!ctx.finished) { setPrice(kind === 'win' ? bestPrice(plan[night - 1]) : PMAX); openNight(); }
    },
  };
}
