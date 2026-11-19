import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Trail Events: nine forks, three roads each. Sure costs are shown; events are rolled per road when the world is made. */
type V = [number, number, number]; // food, water, morale
interface Ev { p: number; d: V; t: string }
interface Road { name: string; g: string; base: V; ev: Ev[] }
const ROADS: Road[] = [
  { name: 'Plains', g: '═', base: [-1, -1, -1], ev: [{ p: 0.3, d: [2, 0, 0], t: 'Your hunters bring back antelope.' }, { p: 0.25, d: [0, -1, -1], t: 'A dust storm scours the wagons.' }] },
  { name: 'River', g: '≈', base: [-1, 2, -1], ev: [{ p: 0.3, d: [2, 0, 0], t: 'The river runs thick with fish.' }, { p: 0.25, d: [-1, 0, -1], t: 'A flood soaks the flour.' }] },
  { name: 'Mountain', g: '▲', base: [-2, -1, 0], ev: [{ p: 0.3, d: [0, 3, 0], t: 'A cold spring fills every barrel.' }, { p: 0.25, d: [-2, 0, 0], t: 'A rockslide buries a supply wagon.' }, { p: 0.2, d: [0, 0, 2], t: 'The view from the pass lifts spirits.' }] },
  { name: 'Town', g: '⌂', base: [2, 0, 1], ev: [{ p: 0.3, d: [-1, 0, -2], t: 'Thieves work the crowded street.' }, { p: 0.3, d: [1, 0, 1], t: 'A feast and a fiddle at the saloon.' }] },
  { name: 'Camp', g: '★', base: [-1, -1, 3], ev: [{ p: 0.2, d: [-2, 0, 0], t: 'Bandits raid the camp at night.' }] },
];
const FORKS = 9, MAXV = 9, NAMES = ['Food', 'Water', 'Morale'];
const roll = (r: () => number, rd: Road): Ev | null => { let u = r(); for (const e of rd.ev) { if (u < e.p) return e; u -= e.p; } return null; };
const apply = (s: V, rd: Road, e: Ev | null): V => s.map((v, i) => Math.min(MAXV, v + rd.base[i] + (e ? e.d[i] : 0))) as V;

export default function trailEvents(ctx: Ctx): Instance {
  let rand = makeRng(1), forks: { road: number; ev: Ev | null }[][] = [], stop = 0, s: V = [6, 6, 6], log = '';

  const style = h('style', null, `
    .te{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px}
    .te-map{display:flex;align-items:center;justify-content:space-between;padding:0 4px;position:relative}
    .te-map:before{content:"";position:absolute;left:10px;right:10px;top:50%;border-top:2px dotted var(--mw-ash)}
    .te-s{position:relative;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:var(--mw-night);border:2px solid var(--mw-mesa);color:var(--mw-ash);font:700 .7rem var(--mw-font-slab)}
    .te-s.past{background:var(--mw-rose);color:var(--mw-ink);border-color:var(--mw-bone)}
    .te-s.now{border-color:var(--mw-bone);color:var(--mw-bone);box-shadow:0 0 0 3px var(--mw-wine)}
    .te-m{display:grid;grid-template-columns:70px 1fr 18px;gap:6px;align-items:center;font:600 .85rem var(--mw-font-slab);color:var(--mw-bone)}
    .te-m .mw-meter{max-width:none}.te-m.low .mw-meter>i{background:var(--mw-red)}.te-m.low{color:var(--mw-rose)}
    .te-forks{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
    .te-road{min-height:170px;justify-content:flex-start;flex-direction:column;gap:5px;padding:8px 4px;text-align:center;font-size:.95rem;line-height:1.15}
    .te-road small{font:600 .72rem/1.3 var(--mw-font-slab);color:var(--mw-bone)}
    .te-road small em{color:var(--mw-rose);font-style:normal}
    .te-road b{font-size:1.5rem;color:var(--mw-tan)}
  `);
  const map = h('div', { class: 'te-map', 'aria-hidden': 'true' }), meters = h('div', { class: 'mw-col', style: { width: '100%', alignItems: 'stretch', gap: '5px' } }), fk = h('div', { class: 'te-forks' }), say = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'te' }, map, meters, say, fk));

  const sg = (n: number) => (n > 0 ? `+${n}` : `${n}`);
  function render(): void {
    map.replaceChildren(...Array.from({ length: FORKS + 1 }, (_, i) => h('span', { class: 'te-s' + (i < stop ? ' past' : i === stop ? ' now' : '') }, i < stop ? '★' : i === FORKS ? '⚑' : i + 1)));
    meters.replaceChildren(...NAMES.map((n, i) => h('div', { class: 'te-m' + (s[i] <= 2 ? ' low' : '') }, n, h('div', { class: 'mw-meter' }, h('i', { style: { width: `${(s[i] / MAXV) * 100}%` } })), s[i] <= 2 ? '!' : String(s[i]))));
    fk.replaceChildren(...(stop < FORKS ? forks[stop] : []).map((f, i) => {
      const rd = ROADS[f.road];
      return h('button', { class: 'mw-btn te-road', type: 'button', 'data-road': i, onclick: () => go(i) }, h('b', null, rd.g), rd.name,
        h('small', null, `Food ${sg(rd.base[0])}`, h('br'), `Water ${sg(rd.base[1])}`, h('br'), `Morale ${sg(rd.base[2])}`, h('br'), h('em', null, 'Chance of:'), ...rd.ev.flatMap((e) => [h('br'), `${Math.round(e.p * 100)}% ${e.d.map((x, k) => (x ? `${['Food', 'Water', 'Mood'][k]} ${sg(x)}` : '')).filter(Boolean).join(' ')}`])));
    }));
    say.textContent = log || 'Pick a road. The sure costs are shown; the trail may add a surprise.';
    ctx.hud('Stop', `${Math.min(stop + 1, FORKS)}/${FORKS}`); ctx.hud('Supplies', s.reduce((a, b) => a + b, 0));
  }
  /** The one player action: take one of the three roads. */
  function go(i: number): void {
    if (ctx.finished || stop >= FORKS) return;
    const f = forks[stop][i], rd = ROADS[f.road];
    s = apply(s, rd, f.ev); stop++;
    log = `${rd.name}: ${f.ev ? f.ev.t : 'An uneventful stretch.'}`; ctx.sfx(f.ev && f.ev.d.some((x) => x < 0) ? 'bad' : 'tap');
    render();
    const dead = s.findIndex((v) => v <= 0);
    if (dead >= 0) ctx.finish({ result: 'lose', score: stop * 40, title: 'The wagons stall', detail: `${NAMES[dead]} ran out at stop ${stop}. ${log}` });
    else if (stop >= FORKS) ctx.finish({ result: 'win', score: 200 + s.reduce((a, b) => a + b, 0) * 20, title: 'Journey’s end', detail: `You reached the last stop with ${s.join(', ')} in food, water and morale.` });
  }
  ctx.keys({ '1': (d) => d && go(0), '2': (d) => d && go(1), '3': (d) => d && go(2) });

  /** Search every road sequence for one that survives (or dies); returns the sequence and the share of surviving sequences. */
  function search(): { win: number[] | null; die: number[] | null; frac: number } {
    let win: number[] | null = null, die: number[] | null = null, wins = 0; const seq: number[] = [];
    const rec = (k: number, v: V): void => {
      if (k === FORKS) { wins++; if (!win) win = seq.slice(); return; }
      for (let i = 0; i < 3; i++) { const f = forks[k][i]; const n = apply(v, ROADS[f.road], f.ev); seq.push(i); if (n.some((x) => x <= 0)) { if (!die) die = seq.slice(); } else rec(k + 1, n); seq.pop(); }
    };
    rec(0, [6, 6, 6]); return { win, die, frac: wins / 3 ** FORKS };
  }
  let sol: ReturnType<typeof search> = { win: null, die: null, frac: 0 };
  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); stop = 0; s = [6, 6, 6]; log = '';
      for (let t = 0; t < 200; t++) {
        forks = Array.from({ length: FORKS }, () => { const ids = [0, 1, 2, 3, 4].sort(() => rand() - 0.5).slice(0, 3); return ids.map((road) => ({ road, ev: roll(rand, ROADS[road]) })); });
        sol = search(); if (sol.win && sol.die && sol.frac > 0.02 && sol.frac < 0.5) break;
      }
      render();
    },
    probe: () => ({ stop, s }),
    play(kind) {
      const seq = (kind === 'win' ? sol.win : sol.die) ?? [0];
      for (const i of seq) { if (ctx.finished) break; go(i); }
      for (let g = 0; g < 20 && !ctx.finished; g++) go(0);
    },
  };
}
