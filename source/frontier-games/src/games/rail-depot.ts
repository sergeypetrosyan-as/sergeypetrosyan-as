import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Rail Depot: one loader, three platforms, four cargoes. Never let the yard pass its limit across three shifts. */
const TYPES = [{ n: 'Silver', g: '◆' }, { n: 'Cattle', g: '▲' }, { n: 'Grain', g: '●' }, { n: 'Timber', g: '■' }];
const CAP = 14, TRAIN = 4, SHIFT = 40, RATE = [0.8, 1.05, 1.3], LOAD_S = 0.4, WAIT = 1.5;
interface Tr { type: number; load: number; wait: number }

export default function railDepot(ctx: Ctx): Instance {
  let rand = makeRng(1), piles = [0, 0, 0, 0], trains: Tr[] = [], target = -1, shift = 0, st = 0, acc = 0, lacc = 0, sent = 0, score = 0;

  const style = h('style', null, `
    .rd{width:100%;max-width:440px;display:flex;flex-direction:column;gap:8px}
    .rd-yard{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
    .rd-pile{border:2px solid var(--mw-mesa);border-radius:6px;background:var(--mw-night);padding:4px;text-align:center;font:700 .8rem var(--mw-font-slab);color:var(--mw-bone)}
    .rd-stack{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:3px;min-height:34px;align-content:end}
    .rd-stack i{display:block;height:7px;border-radius:2px;background:var(--mw-dusk)}
    .rd-stack i.on{background:var(--mw-tan)}
    .rd-gauge{display:flex;align-items:center;gap:8px;font:700 .85rem var(--mw-font-slab);color:var(--mw-bone)}
    .rd-gauge .mw-meter{max-width:none;flex:1;height:16px}
    .rd-gauge.warn .mw-meter>i{background:var(--mw-red)}
    .rd-gauge.warn{color:var(--mw-rose)}
    .rd-plat{display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center;border:2px solid var(--mw-ember);border-radius:8px;background:var(--mw-role-surface-raised);padding:6px}
    .rd-plat.sel{border-color:var(--mw-rose);box-shadow:0 0 0 2px var(--mw-wine)}
    .rd-t{font:700 .95rem var(--mw-font-slab);color:var(--mw-bone)}
    .rd-pips{display:flex;gap:3px;margin-top:4px}
    .rd-pips i{width:22px;height:12px;border-radius:2px;border:1px solid var(--mw-ember);background:var(--mw-night)}
    .rd-pips i.on{background:var(--mw-rose)}
    .rd-plat .mw-btn{min-width:64px;padding:0 10px}
    .rd-plat .mw-btn[aria-pressed=true]{background:var(--mw-wine);border-color:var(--mw-rose)}
  `);
  const pileEls = TYPES.map((t) => { const s = h('div', { class: 'rd-stack' }, ...Array.from({ length: 16 }, () => h('i'))); const c = h('span'); return { el: h('div', { class: 'rd-pile' }, `${t.g} ${t.n}`, h('br'), c, s), c, s }; });
  const bar = h('i'), gtxt = h('span'), gauge = h('div', { class: 'rd-gauge' }, 'Yard', h('div', { class: 'mw-meter' }, bar), gtxt);
  const shiftBar = h('i'), say = h('p', { class: 'mw-note', role: 'status' });
  const plats = [0, 1, 2].map((i) => {
    const t = h('div', { class: 'rd-t' }), pips = h('div', { class: 'rd-pips' }, ...Array.from({ length: TRAIN }, () => h('i')));
    const ld = h('button', { class: 'mw-btn', type: 'button', 'data-load': i, 'aria-label': `Load platform ${i + 1}`, onclick: () => pick(i) }, 'Load');
    const sd = h('button', { class: 'mw-btn', type: 'button', 'data-send': i, 'aria-label': `Send platform ${i + 1}`, onclick: () => send(i) }, 'Send');
    return { el: h('div', { class: 'rd-plat' }, h('div', null, t, pips), ld, sd), t, pips, ld, sd };
  });
  ctx.root.append(style, h('div', { class: 'rd' }, gauge, h('div', { class: 'rd-yard' }, ...pileEls.map((p) => p.el)), ...plats.map((p) => p.el), h('div', { class: 'mw-meter' }, shiftBar), say));

  const total = () => piles.reduce((a, b) => a + b, 0);
  function newTrain(): Tr {
    const here = trains.filter((t) => t.wait <= 0).map((t) => t.type), free = [0, 1, 2, 3].filter((x) => !here.includes(x));
    const need = free.reduce((a, b) => (piles[b] > piles[a] ? b : a), free[0]);
    return { type: rand() < 0.6 ? need : free[Math.floor(rand() * free.length)], load: 0, wait: 0 };
  }
  function render(): void {
    const n = total(), warn = n >= CAP - 4;
    bar.style.width = `${(n / CAP) * 100}%`; gtxt.textContent = `${n}/${CAP}${warn ? ' FULL SOON' : ''}`; gauge.classList.toggle('warn', warn);
    pileEls.forEach((p, i) => { p.c.textContent = String(piles[i]); [...p.s.children].forEach((b, k) => b.classList.toggle('on', k < piles[i])); });
    plats.forEach((p, i) => {
      const tr = trains[i], here = tr.wait <= 0;
      p.el.classList.toggle('sel', target === i);
      p.t.textContent = here ? `${TYPES[tr.type].g} ${TYPES[tr.type].n} train` : `Next train in ${tr.wait.toFixed(1)}s`;
      [...p.pips.children].forEach((b, k) => b.classList.toggle('on', here && k < tr.load));
      p.ld.setAttribute('aria-pressed', String(target === i)); (p.ld as HTMLButtonElement).disabled = !here || tr.load >= TRAIN;
      (p.sd as HTMLButtonElement).disabled = !here;
    });
    shiftBar.style.width = `${(st / SHIFT) * 100}%`;
    ctx.hud('Shift', `${Math.min(shift + 1, 3)}/3`); ctx.hud('Sent', sent);
  }
  /** Point the single loader at a platform. */
  function pick(i: number): void { if (ctx.finished || trains[i].wait > 0) return; target = target === i ? -1 : i; lacc = 0; ctx.sfx('tap'); render(); }
  /** Dispatch a train (an empty one just swaps for a different cargo). */
  function send(i: number): void {
    const tr = trains[i]; if (ctx.finished || tr.wait > 0) return;
    sent += tr.load; score += tr.load * 10 + (tr.load >= TRAIN ? 20 : 0); ctx.sfx(tr.load ? 'good' : 'tick');
    if (target === i) target = -1;
    trains[i] = { type: tr.type, load: 0, wait: WAIT }; render();
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    acc += RATE[shift] * dt;
    while (acc >= 1) { acc--; piles[Math.floor(rand() * 4)]++; }
    if (total() > CAP) { render(); ctx.sfx('lose'); ctx.finish({ result: 'lose', score, title: 'Yard overflowing', detail: `Cargo spilled onto the main line in shift ${shift + 1}. ${sent} crates were sent.` }); return; }
    trains.forEach((tr, i) => { if (tr.wait > 0) { tr.wait -= dt; if (tr.wait <= 0) { tr.wait = 1; trains[i] = newTrain(); } } });
    const tr = target >= 0 ? trains[target] : null;
    if (tr && tr.wait <= 0 && tr.load < TRAIN && piles[tr.type] > 0) { lacc += dt; if (lacc >= LOAD_S) { lacc = 0; piles[tr.type]--; tr.load++; } } else lacc = 0;
    st += dt;
    if (st >= SHIFT) { st = 0; shift++; ctx.sfx('good'); if (shift >= 3) { ctx.sfx('win'); render(); ctx.finish({ result: 'win', score: score + 200, title: 'Depot kept moving', detail: `Three shifts without an overflow; ${sent} crates sent.` }); return; } }
    render();
  }
  ctx.keys({ '1': (d) => d && pick(0), '2': (d) => d && pick(1), '3': (d) => d && pick(2), q: (d) => d && send(0), w: (d) => d && send(1), e: (d) => d && send(2) });
  ctx.pad([{ key: '1', label: 'Load 1' }, { key: '2', label: 'Load 2' }, { key: '3', label: 'Load 3' }, { key: 'q', label: 'Send 1' }, { key: 'w', label: 'Send 2' }, { key: 'e', label: 'Send 3' }]);
  ctx.loop(update, () => {});

  /** Bot policy: send full trains, aim the loader at the biggest matching pile, swap a useless train. */
  function policy(): void {
    trains.forEach((t, i) => { if (t.wait <= 0 && (t.load >= TRAIN || (t.load > 0 && piles[t.type] === 0))) send(i); });
    const cand = trains.map((t, i) => ({ t, i })).filter((x) => x.t.wait <= 0 && x.t.load < TRAIN && piles[x.t.type] > 0).sort((a, b) => piles[b.t.type] - piles[a.t.type]);
    if (cand.length && target !== cand[0].i) pick(cand[0].i);
    const worst = piles.indexOf(Math.max(...piles));
    if (piles[worst] >= 4 && !trains.some((t) => t.wait <= 0 && t.type === worst)) { const e = trains.findIndex((t) => t.wait <= 0 && t.load === 0 && piles[t.type] === 0); if (e >= 0) send(e); }
  }
  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); piles = [2, 1, 1, 0]; shift = 0; st = 0; acc = 0; lacc = 0; sent = 0; score = 0; target = -1; trains = [];
      for (let i = 0; i < 3; i++) trains.push(newTrain());
      render(); say.textContent = 'Load a train whose cargo is piling up, then Send it. Empty platforms get a new train soon.';
    },
    probe: () => ({ shift, piles, target, loads: trains.map((t) => t.load), sent }),
    play(kind) { for (let g = 0; g < 9000 && !ctx.finished; g++) { if (kind === 'win') policy(); update(1 / 60); } },
  };
}
