import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Fair Calendar: tap fair events onto your schedule. Events that overlap cannot both be kept. Lock in a schedule worth the quota. Three bad locks end the run. */
const DAYS = 12, STRIKES = 3;
const ROUNDS = [{ n: 7, q: 0.85 }, { n: 9, q: 0.92 }, { n: 11, q: 0.97 }];
type Ev = { id: number; s: number; e: number; v: number; lane: number };
const clash = (a: Ev, b: Ev) => a.s < b.e && b.s < a.e;
const letter = (i: number) => String.fromCharCode(65 + i);

/** Best-value non-overlapping subset (bitmask), brute force over <= 11 events. */
function best(evs: Ev[]): { mask: number; val: number } {
  let bm = 0, bv = 0;
  for (let m = 0; m < 1 << evs.length; m++) {
    let v = 0, ok = true;
    for (let i = 0; i < evs.length && ok; i++) if (m >> i & 1) { v += evs[i].v; for (let j = 0; j < i; j++) if (m >> j & 1 && clash(evs[i], evs[j])) { ok = false; break; } }
    if (ok && v > bv) { bv = v; bm = m; }
  }
  return { mask: bm, val: bv };
}
function greedy(evs: Ev[]): number {
  const kept: Ev[] = [];
  for (const e of [...evs].sort((a, b) => b.v - a.v)) if (!kept.some((k) => clash(k, e))) kept.push(e);
  return kept.reduce((a, e) => a + e.v, 0);
}

export default function fairCalendar(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let round = 0, strikes = 0, score = 0, quota = 0, evs: Ev[] = [], picked = new Set<number>(), msg = '', optMask = 0;

  const axis = h('div', { class: 'fc-axis', 'aria-hidden': 'true' }, Array.from({ length: DAYS }, (_, i) => h('span', null, i + 1)));
  const lanes = h('div', { class: 'fc-lanes' });
  const total = h('p', { class: 'mw-big fc-total', role: 'status' });
  const note = h('p', { class: 'mw-note', 'aria-live': 'polite' });
  const lock = h('button', { class: 'mw-btn primary', type: 'button', 'data-lock': '', style: { width: '100%', minHeight: '52px' } }, 'Lock in schedule');
  const style = h('style', null, `
    .fc{width:100%;max-width:520px;display:flex;flex-direction:column;gap:8px;align-items:center}
    .fc-axis{width:100%;display:grid;grid-template-columns:repeat(${DAYS},1fr);color:var(--mw-ash);font:600 .68rem var(--mw-font-slab);text-align:center}
    .fc-lanes{width:100%;position:relative;border:2px solid var(--mw-mesa);border-radius:8px;padding:6px 0;background:repeating-linear-gradient(90deg,transparent 0,transparent calc(100%/${DAYS} - 1px),color-mix(in srgb,var(--mw-mesa) 55%,transparent) calc(100%/${DAYS} - 1px),color-mix(in srgb,var(--mw-mesa) 55%,transparent) calc(100%/${DAYS}))}
    .fc-lane{position:relative;height:50px}
    .fc-ev{position:absolute;top:3px;height:44px;min-width:0;padding:0 2px;border-radius:8px;border:2px solid var(--mw-tan);background:var(--mw-saddle);color:var(--mw-bone);font:700 .9rem var(--mw-font-slab);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;overflow:hidden;white-space:nowrap}
    .fc-ev small{font-size:.7rem;opacity:.85}
    .fc-ev.on{background:var(--mw-rose);color:var(--mw-ink);border-color:var(--mw-bone)}
    .fc-ev.no{border-style:dashed;border-color:var(--mw-red);opacity:.55}
    .fc-total{margin:0}
  `);
  ctx.root.append(style, h('div', { class: 'fc' }, axis, lanes, total, lock, note));

  const sum = () => evs.filter((e) => picked.has(e.id)).reduce((a, e) => a + e.v, 0);
  const blocker = (e: Ev) => evs.find((o) => picked.has(o.id) && o.id !== e.id && clash(o, e));
  function render(): void {
    const nl = Math.max(...evs.map((e) => e.lane)) + 1;
    lanes.replaceChildren(...Array.from({ length: nl }, (_, l) => h('div', { class: 'fc-lane' }, evs.filter((e) => e.lane === l).map((e) => {
      const on = picked.has(e.id), no = !on && !!blocker(e);
      return h('button', { class: 'fc-ev' + (on ? ' on' : '') + (no ? ' no' : ''), type: 'button', 'data-ev': e.id, 'aria-pressed': on,
        'aria-label': `Event ${letter(e.id)}, days ${e.s + 1} to ${e.e}, worth ${e.v}${on ? ', kept' : no ? ', collides' : ''}`,
        style: { left: `${(e.s / DAYS) * 100}%`, width: `calc(${((e.e - e.s) / DAYS) * 100}% - 4px)`, marginLeft: '2px' }, onclick: () => toggle(e.id) },
      on ? '✓' : no ? '✕' : '', letter(e.id), h('small', null, e.v));
    }))));
    total.textContent = `Value ${sum()} / quota ${quota}`;
    note.textContent = msg || 'Tap an event to keep it. Overlapping events cannot both stay.';
    ctx.hud('Fair', `${round + 1}/${ROUNDS.length}`); ctx.hud('Value', sum()); ctx.hud('Quota', quota); ctx.hud('Bad locks left', STRIKES - strikes);
  }
  function newRound(): void {
    const R = ROUNDS[round];
    for (let tries = 0; tries < 300; tries++) {
      const list: Ev[] = [];
      for (let i = 0; i < R.n; i++) { const len = rint(rand, 2, 5), s = rint(rand, 0, DAYS - len); list.push({ id: i, s, e: s + len, v: rint(rand, 8, 22) + len * rint(rand, 4, 9), lane: 0 }); }
      const b = best(list), q = Math.ceil(b.val * R.q);
      if (tries < 299 && (greedy(list) >= q || b.mask.toString(2).replace(/0/g, '').length < 3)) continue;
      const ends: number[] = [];
      [...list].sort((a, c) => a.s - c.s).forEach((e) => { let l = ends.findIndex((x) => x <= e.s); if (l < 0) { l = ends.length; ends.push(0); } ends[l] = e.e; e.lane = l; });
      evs = list; quota = q; optMask = b.mask; break;
    }
    picked = new Set(); msg = ''; render();
  }
  function toggle(id: number): void {
    if (ctx.finished) return;
    const e = evs[id];
    if (picked.has(id)) picked.delete(id);
    else { const b = blocker(e); if (b) { msg = `${letter(id)} collides with ${letter(b.id)}. Drop ${letter(b.id)} first.`; ctx.sfx('bad'); render(); return; } picked.add(id); }
    msg = ''; ctx.sfx('tap'); render();
  }
  /** The one scoring action: lock the schedule in. */
  function lockIn(): void {
    if (ctx.finished) return;
    const v = sum();
    if (v >= quota) {
      score += v; ctx.sfx('good');
      if (round >= ROUNDS.length - 1) { render(); ctx.finish({ result: 'win', score: score - strikes * 50, title: 'The fair runs smoothly', detail: `You met every quota with ${STRIKES - strikes} bad locks to spare.` }); return; }
      round++; newRound(); return;
    }
    strikes++; ctx.sfx('bad'); msg = `Only ${v} of ${quota}. Swap events for more value without overlap.`;
    render();
    if (strikes >= STRIKES) ctx.finish({ result: 'lose', score, title: 'The fair falls flat', detail: `Fair ${round + 1}: the best schedule was worth ${best(evs).val}; you reached ${v}.` });
  }
  ctx.on(lock, 'click', () => lockIn());

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; strikes = 0; score = 0; newRound(); },
    probe: () => ({ round, strikes, picked: [...picked].sort(), v: sum() }),
    play(kind) {
      for (let n = 0; n < 20 && !ctx.finished; n++) {
        if (kind === 'win') { for (const e of evs) if (picked.has(e.id) && !(optMask >> e.id & 1)) toggle(e.id); for (const e of evs) if (optMask >> e.id & 1 && !picked.has(e.id)) toggle(e.id); }
        lockIn();
      }
    },
  };
}
