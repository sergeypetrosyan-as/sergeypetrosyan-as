import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Cattle Drive Pace: ten days, three paces. Reach the market mile mark with at least 70 head. */
type Ground = 'river' | 'dry' | 'pass';
type Wx = 'fair' | 'heat' | 'storm';
interface Leg { g: Ground; w: Wx }
interface S { miles: number; head: number; str: number; water: number }
const DAYS = 10, KEEP = 70, SEE = 3;
const PACE = ['Walk', 'Trot', 'Push'];
const MI = [8, 12, 16], STR = [10, -6, -18], WAT = [6, 10, 15];
const GL: Record<Ground, string> = { river: '≈ River', dry: '▒ Dry', pass: '▲ Pass' };
const WL: Record<Wx, string> = { fair: '☼ Fair', heat: '☀ Heat', storm: 'ϟ Storm' };

/** One day's rules. Pure, so the preview, the bot and the generator agree. */
function step(s: S, l: Leg, p: number): S & { note: string } {
  let mi = MI[p], st = STR[p], wu = WAT[p], head = s.head, note = '';
  if (l.g === 'pass') mi *= 0.6;
  if (l.g === 'dry') wu *= 1.4;
  if (l.w === 'storm') mi *= 0.75;
  if (l.w === 'heat') { wu *= 1.5; st -= 4; }
  if (l.w === 'storm' && p === 2) { head -= 8; note += 'Stampede -8. '; }
  let str = Math.max(0, Math.min(100, s.str + st + (l.g === 'river' ? 5 : 0)));
  if (str < 25) { mi *= 0.7; head -= 3; note += 'Tired herd -3. '; }
  if (str === 0) { head -= 6; note += 'Collapse -6. '; }
  let water = s.water - Math.round(wu);
  if (l.g === 'river') water = Math.min(100, water + 40);
  if (water < 0) { water = 0; head -= 10; note += 'Thirst -10. '; }
  return { miles: s.miles + Math.round(mi), head: Math.max(0, head), str, water, note };
}
const START: S = { miles: 0, head: 100, str: 80, water: 70 };
function sim(legs: Leg[], seq: number[]): S { let s = START; seq.forEach((p, i) => { s = step(s, legs[i], p); }); return s; }
function best(legs: Leg[]): { miles: number; seq: number[] } {
  let b = { miles: -1, seq: [] as number[] };
  const rec = (i: number, s: S, seq: number[]): void => {
    if (s.head < KEEP) return;
    if (i === DAYS) { if (s.miles > b.miles) b = { miles: s.miles, seq: seq.slice() }; return; }
    for (let p = 0; p < 3; p++) { seq.push(p); rec(i + 1, step(s, legs[i], p), seq); seq.pop(); }
  };
  rec(0, START, []); return b;
}

export default function drivePace(ctx: Ctx): Instance {
  let rand = makeRng(1), legs: Leg[] = [], goal = 100, day = 0, s: S = START, plan: number[] = [], log = '';
  const style = h('style', null, `
    .dp{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px}
    .dp-trail{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}
    .dp-d{border:2px solid var(--mw-mesa);border-radius:6px;background:var(--mw-night);padding:3px 2px;text-align:center;font:600 .72rem/1.25 var(--mw-font-slab);color:var(--mw-bone);min-height:54px}
    .dp-d b{display:block;color:var(--mw-ash);font-size:.7rem}
    .dp-d.now{border-color:var(--mw-rose);background:var(--mw-wine)}
    .dp-d.past{opacity:.55}.dp-d.unk{color:var(--mw-ash)}
    .dp-m{display:grid;grid-template-columns:64px 1fr 40px;gap:6px;align-items:center;font:600 .85rem var(--mw-font-slab);color:var(--mw-bone)}
    .dp-m .mw-meter{max-width:none}
    .dp-goal{position:relative}
    .dp-goal i.flag{position:absolute;right:0;top:-3px;bottom:-3px;width:3px;background:var(--mw-red)}
    .dp-p{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
    .dp-btn{min-height:84px;flex-direction:column;gap:4px;padding:6px 4px;font-size:1rem;line-height:1.15;text-align:center}
    .dp-btn small{font:600 .72rem/1.25 var(--mw-font-slab);color:var(--mw-bone)}
    .dp-btn small em{color:var(--mw-rose);font-style:normal}
  `);
  const trail = h('div', { class: 'dp-trail' }), meters = h('div', { class: 'mw-col', style: { width: '100%', alignItems: 'stretch' } }), pace = h('div', { class: 'dp-p' }), say = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'dp' }, trail, meters, say, pace));

  const meter = (name: string, v: number, mx: number, flag = false) => h('div', { class: 'dp-m' }, name, h('div', { class: 'mw-meter' + (flag ? ' dp-goal' : '') }, h('i', { style: { width: `${Math.min(100, (v / mx) * 100)}%` } }), flag ? h('i', { class: 'flag' }) : null), h('span', null, Math.round(v)));
  function render(): void {
    trail.replaceChildren(...legs.map((l, i) => h('div', { class: 'dp-d' + (i === day ? ' now' : i < day ? ' past' : i > day + SEE ? ' unk' : '') }, h('b', null, `Day ${i + 1}`), i > day + SEE ? '?' : [GL[l.g], h('br'), WL[l.w]])));
    meters.replaceChildren(meter(`Miles /${goal}`, s.miles, goal, true), meter('Herd', s.head, 100), meter('Strength', s.str, 100), meter('Water', s.water, 100));
    pace.replaceChildren(...PACE.map((n, p) => {
      if (day >= DAYS) return h('span');
      const r = step(s, legs[day], p);
      return h('button', { class: 'mw-btn dp-btn', type: 'button', 'data-pace': p, onclick: () => go(p) }, n, h('small', null, `+${r.miles - s.miles} mi`, h('br'), `str ${r.str - s.str >= 0 ? '+' : ''}${r.str - s.str}, water ${r.water - s.water >= 0 ? '+' : ''}${r.water - s.water}`, r.note ? h('br') : null, r.note ? h('em', null, r.note) : null));
    }));
    ctx.hud('Day', `${Math.min(day + 1, DAYS)}/${DAYS}`); ctx.hud('Herd', s.head);
    say.textContent = log || `Reach mile ${goal} with ${KEEP}+ head. Numbers below show today’s result for each pace.`;
  }
  /** The one player action: set today's pace. */
  function go(p: number): void {
    if (ctx.finished || day >= DAYS) return;
    const r = step(s, legs[day], p); log = `Day ${day + 1}: ${PACE[p]}. ${r.miles - s.miles} miles. ${r.note}`;
    s = r; day++; ctx.sfx(r.note ? 'bad' : 'tap'); render();
    if (day >= DAYS) {
      const win = s.miles >= goal && s.head >= KEEP, score = s.miles * 5 + s.head;
      ctx.finish({ result: win ? 'win' : 'lose', score: win ? score : Math.round(score / 2), title: win ? 'Market by sundown' : 'The herd fell short', detail: s.head < KEEP ? `Only ${s.head} head survived; ${KEEP} were needed.` : win ? `${s.miles} miles with ${s.head} head.` : `${s.miles} of ${goal} miles; the buyers left.` });
    }
  }
  ctx.keys({ '1': (d) => d && go(0), '2': (d) => d && go(1), '3': (d) => d && go(2) });

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); day = 0; s = START; log = '';
      for (let t = 0; t < 400; t++) {
        legs = Array.from({ length: DAYS }, () => { const a = rand(), b = rand(); return { g: a < 0.25 ? 'river' : a < 0.65 ? 'dry' : 'pass', w: b < 0.5 ? 'fair' : b < 0.75 ? 'heat' : 'storm' } as Leg; });
        const b = best(legs); goal = Math.floor(b.miles * 0.95); plan = b.seq;
        const fails = [0, 1, 2].every((p) => { const e = sim(legs, Array(DAYS).fill(p)); return e.miles < goal || e.head < KEEP; });
        if (b.miles >= 100 && fails) break;
      }
      render();
    },
    probe: () => ({ day, s }),
    play(kind) { for (let i = 0; i < DAYS && !ctx.finished; i++) go(kind === 'win' ? plan[i] : 2); },
  };
}
