import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Boomtown Market: thirty days, five camps on a star map. Buy goods where they are cheap, ride to a camp one day away where they are dear. */
const DAYS = 30, CAP = 10, START = 150;
const CAMPS = [
  { n: 'Dry Gulch', x: 0.14, y: 0.3 }, { n: 'Silver Fork', x: 0.5, y: 0.1 }, { n: 'Red Bluff', x: 0.87, y: 0.3 },
  { n: 'Mule Creek', x: 0.72, y: 0.78 }, { n: 'Last Chance', x: 0.24, y: 0.8 },
];
const EDGES: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3]];
const NEIGH = CAMPS.map((_, i) => EDGES.filter((e) => e.includes(i)).map((e) => (e[0] === i ? e[1] : e[0])));
const GOODS = [{ n: 'Flour', b: 12, s: '●' }, { n: 'Hides', b: 28, s: '▲' }, { n: 'Whiskey', b: 46, s: '◆' }, { n: 'Silver', b: 80, s: '★' }];
const ARROW = ['▼', '▬', '▲'];

export default function boomtownMarket(ctx: Ctx): Instance {
  let P: number[][][] = [];
  let day = 1, camp = 0, cash = START, inv = [0, 0, 0, 0], target = 0;

  const style = h('style', null, `
    .bm{width:100%;max-width:440px;display:flex;flex-direction:column;gap:8px;align-items:center}
    .bm-map{position:relative;width:100%;height:170px;border:2px solid var(--mw-mesa);border-radius:8px;background:var(--mw-night)}
    .bm-map svg{position:absolute;inset:0;width:100%;height:100%}
    .bm-n{position:absolute;width:46px;height:46px;border-radius:50%;transform:translate(-50%,-50%);border:2px solid var(--mw-rose);background:var(--mw-dusk);color:var(--mw-bone);font:700 1rem var(--mw-font-slab);cursor:pointer;padding:0}
    .bm-n.here{background:var(--mw-bone);color:var(--mw-ink);border-color:var(--mw-red);cursor:default}
    .bm-n.far{border-color:var(--mw-mesa);opacity:.55;border-style:dashed;cursor:not-allowed}
    .bm-l{position:absolute;transform:translate(-50%,0);font:600 .68rem var(--mw-font-slab);color:var(--mw-ash);pointer-events:none;white-space:nowrap;margin-top:25px}
    .bm-t{width:100%;border-collapse:collapse;font:600 .82rem var(--mw-font-slab);color:var(--mw-bone)}
    .bm-t th{color:var(--mw-ash);font-weight:600;padding:2px 3px;text-align:center}
    .bm-t td{padding:3px;text-align:center;border-top:1px solid color-mix(in srgb,var(--mw-mesa) 60%,transparent)}
    .bm-t td:first-child{text-align:left}
    .bm-t tr.here td{background:color-mix(in srgb,var(--mw-wine) 70%,transparent)}
    .bm-t .up{color:var(--mw-rose)} .bm-t .dn{color:var(--mw-tan)}
    .bm-row{width:100%;display:grid;grid-template-columns:1fr auto auto auto auto;gap:4px;align-items:center;font:600 .86rem var(--mw-font-slab);color:var(--mw-bone)}
    .bm-row .mw-btn{min-width:44px;padding:0 8px;font-size:.85rem}
  `);
  const map = h('div', { class: 'bm-map' });
  const board = h('table', { class: 'bm-t', 'aria-label': 'Prices in every camp today' });
  const trade = h('div', { style: { width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' } });
  const wait = h('button', { class: 'mw-btn', type: 'button', 'data-wait': '', style: { width: '100%' } }, 'Wait a day here');
  const note = h('p', { class: 'mw-note', 'aria-live': 'polite' });
  ctx.root.append(style, h('div', { class: 'bm' }, map, trade, board, wait, note));

  const price = (g: number, c = camp, d = day) => P[Math.min(d, DAYS + 1)][c][g];
  const trend = (g: number, c: number) => Math.sign(price(g, c, day + 1) - price(g, c)) + 1;
  const worth = () => cash + inv.reduce((a, n, g) => a + n * price(g), 0);
  const used = () => inv.reduce((a, b) => a + b, 0);

  function render(): void {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('preserveAspectRatio', 'none');
    for (const [a, b] of EDGES) {
      const l = document.createElementNS(NS, 'line');
      const near = a === camp || b === camp;
      l.setAttribute('x1', String(CAMPS[a].x * 100)); l.setAttribute('y1', String(CAMPS[a].y * 100)); l.setAttribute('x2', String(CAMPS[b].x * 100)); l.setAttribute('y2', String(CAMPS[b].y * 100));
      l.setAttribute('stroke', near ? ctx.c.rose : ctx.c.mesa); l.setAttribute('stroke-width', near ? '1.4' : '0.8'); l.setAttribute('stroke-dasharray', near ? '' : '1.5 2'); l.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.append(l);
    }
    map.replaceChildren(svg, ...CAMPS.flatMap((c, i) => {
      const nb = NEIGH[camp].includes(i), here = i === camp;
      const b = h('button', { class: 'bm-n' + (here ? ' here' : nb ? '' : ' far'), type: 'button', 'data-camp': i, disabled: !nb, 'aria-label': `${here ? 'You are at' : nb ? 'Ride to' : 'Too far:'} ${c.n}`, style: { left: `${c.x * 100}%`, top: `${c.y * 100}%` }, onclick: () => travel(i) }, here ? '★' : String.fromCharCode(65 + i));
      return [b, h('span', { class: 'bm-l', style: { left: `${c.x * 100}%`, top: `${c.y * 100}%` } }, c.n)];
    }));
    trade.replaceChildren(...GOODS.map((g, i) => h('div', { class: 'bm-row' },
      h('span', null, `${g.s} ${g.n} `, h('b', null, `$${price(i)}`), ` ${ARROW[trend(i, camp)]}`, ` ×${inv[i]}`),
      h('button', { class: 'mw-btn', type: 'button', 'aria-label': `Sell all ${g.n}`, 'data-sellall': i, onclick: () => sell(i, inv[i]) }, 'All'),
      h('button', { class: 'mw-btn', type: 'button', 'aria-label': `Sell one ${g.n}`, 'data-sell': i, onclick: () => sell(i, 1) }, '−'),
      h('button', { class: 'mw-btn', type: 'button', 'aria-label': `Buy one ${g.n}`, 'data-buy': i, onclick: () => buy(i, 1) }, '+'),
      h('button', { class: 'mw-btn', type: 'button', 'aria-label': `Buy as many ${g.n} as possible`, 'data-max': i, onclick: () => buy(i, CAP) }, 'Max'))));
    board.replaceChildren(
      h('tr', null, h('th', null, 'Today'), ...GOODS.map((g) => h('th', { title: g.n, 'aria-label': g.n }, g.s))),
      ...CAMPS.map((c, ci) => h('tr', { class: ci === camp ? 'here' : '' }, h('td', null, String.fromCharCode(65 + ci), ' ', c.n),
        ...GOODS.map((_, gi) => { const t = trend(gi, ci); return h('td', { class: t === 2 ? 'up' : t === 0 ? 'dn' : '' }, `${price(gi, ci)}${ARROW[t]}`); }))));
    ctx.hud('Day', `${day}/${DAYS}`); ctx.hud('Cash', `$${cash}`); ctx.hud('Cargo', `${used()}/${CAP}`); ctx.hud('Goal', `$${target}`);
    note.textContent = day >= DAYS ? 'Last day: any move ends the season and sells your cargo here.' : 'Arrows show tomorrow’s price move. Buy low where it falls, ride to a camp where it climbs.';
  }
  function buy(g: number, n: number): void {
    if (ctx.finished) return;
    n = Math.min(n, CAP - used(), Math.floor(cash / price(g)));
    if (n <= 0) { ctx.sfx('bad'); return; }
    cash -= n * price(g); inv[g] += n; ctx.sfx('tap'); render();
  }
  function sell(g: number, n: number): void {
    if (ctx.finished) return;
    n = Math.min(n, inv[g]); if (n <= 0) { ctx.sfx('bad'); return; }
    cash += n * price(g); inv[g] -= n; ctx.sfx('good'); render();
  }
  function endDay(): boolean {
    if (day >= DAYS) {
      const final = Math.round(worth()); render();
      ctx.finish({ result: final >= target ? 'win' : 'lose', score: final, title: final >= target ? 'Boomtown fortune' : 'Short of the goal', detail: `You closed the season with $${final}; the goal was $${target}.` });
      return false;
    }
    day++; return true;
  }
  /** The one scoring action: ride to a neighbouring camp (one day passes). */
  function travel(to: number): void {
    if (ctx.finished || !NEIGH[camp].includes(to)) return;
    if (!endDay()) return;
    camp = to; ctx.sfx('tap'); render();
  }
  function stay(): void { if (!ctx.finished && endDay()) { ctx.sfx('tick'); render(); } }
  wait.addEventListener('click', stay);

  /** Greedy planner: sell all, then buy the good with the best one-hop profit. Used for calibrating the goal and by the test bot. */
  function plan(d: number, c: number, money: number): { g: number; n: number; to: number } {
    let best = { g: -1, n: 0, to: NEIGH[c][0] }, bp = 0;
    for (const to of NEIGH[c]) for (let g = 0; g < GOODS.length; g++) {
      const p = P[d][c][g], n = Math.min(CAP, Math.floor(money / p)), pr = n * (P[d + 1][to][g] - p);
      if (pr > bp) { bp = pr; best = { g, n, to }; }
    }
    return best;
  }
  function calibrate(): void {
    let m = START, c = 0;
    for (let d = 1; d < DAYS; d++) { const p = plan(d, c, m); if (p.g >= 0) m += p.n * (P[d + 1][p.to][p.g] - P[d][c][p.g]); c = p.to; }
    target = Math.max(300, Math.round((m * 0.45) / 50) * 50);
  }

  return {
    destroy() {},
    reset(seed) {
      const r = makeRng(seed);
      const mult = CAMPS.map(() => GOODS.map(() => 0.72 + r() * 0.56));
      const per = CAMPS.map(() => GOODS.map(() => 6 + r() * 5)), ph = CAMPS.map(() => GOODS.map(() => r() * 6.28));
      P = Array.from({ length: DAYS + 2 }, (_, d) => CAMPS.map((_c, ci) => GOODS.map((g, gi) => Math.max(2, Math.round(g.b * mult[ci][gi] * (1 + 0.3 * Math.sin((d * 6.283) / per[ci][gi] + ph[ci][gi]) + (r() - 0.5) * 0.08))))));
      day = 1; camp = 0; cash = START; inv = [0, 0, 0, 0]; calibrate(); render();
    },
    probe: () => ({ day, camp, cash, inv: inv.join(',') }),
    play(kind) {
      for (let n = 0; n < 80 && !ctx.finished; n++) {
        if (kind === 'lose') { stay(); continue; }
        for (let g = 0; g < GOODS.length; g++) if (inv[g] > 0) sell(g, inv[g]);
        if (day >= DAYS) { stay(); continue; }
        const p = plan(day, camp, cash);
        if (p.g >= 0) buy(p.g, p.n);
        travel(p.to);
      }
    },
  };
}
