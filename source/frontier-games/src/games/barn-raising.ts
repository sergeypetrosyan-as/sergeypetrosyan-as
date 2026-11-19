import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Barn Raising: queue jobs on the day ruler. Each needs its prerequisites built first and must finish by its due day. */
const NAMES = ['Footing', 'Posts', 'Frame', 'Floor', 'Walls', 'Rafters', 'Roof', 'Doors', 'Loft', 'Paint'];
const LEVELS = [{ n: 5, slack: 2 }, { n: 7, slack: 1 }, { n: 9, slack: 1 }];
const STRIKES = 4;
interface Task { name: string; dur: number; pre: number[]; due: number }

export default function barnRaising(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let lv = 0, strikes = 0, score = 0, msg = '';
  let tasks: Task[] = [], seq: number[] = [], order: number[] = [];

  const style = h('style', null, `
    .br{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px}
    .br-ruler{display:flex;height:34px;border:2px solid var(--mw-ember);border-radius:6px;overflow:hidden;background:var(--mw-night)}
    .br-seg{display:grid;place-items:center;background:var(--mw-tan);color:var(--mw-ink);font:700 .75rem var(--mw-font-slab);border-right:2px solid var(--mw-night);min-width:0;overflow:hidden;cursor:pointer;padding:0;border-top:0;border-bottom:0;border-left:0}
    .br-days{display:flex;justify-content:space-between;color:var(--mw-ash);font:600 .7rem var(--mw-font-slab);padding:0 2px}
    .br-pool{display:grid;grid-template-columns:1fr 1fr;gap:6px}
    .br-t{min-height:56px;text-align:left;border-radius:8px;border:2px solid var(--mw-ember);background:var(--mw-surface-raised,var(--mw-dusk));color:var(--mw-bone);cursor:pointer;padding:6px 8px;font:600 .8rem/1.25 var(--mw-font-slab)}
    .br-t b{font-size:.95rem;display:block}
    .br-t .due{color:var(--mw-rose)}
    .br-t:disabled{opacity:.35}
    .br-msg{min-height:2.4em}
  `);
  const ruler = h('div', { class: 'br-ruler' });
  const days = h('div', { class: 'br-days', 'aria-hidden': 'true' });
  const pool = h('div', { class: 'br-pool' });
  const note = h('p', { class: 'mw-note br-msg', role: 'status' });
  ctx.root.append(style, h('div', { class: 'br' }, h('p', { class: 'mw-note' }, 'Day ruler: tap a job below to build it next. Tap a built job to take it and later jobs back.'), ruler, days, pool, note));

  const time = (k: number) => seq.slice(0, k).reduce((s, i) => s + tasks[i].dur, 0);
  const total = () => tasks.reduce((s, t) => s + t.dur, 0);
  function render(): void {
    const tot = total();
    ruler.replaceChildren(...seq.map((i, k) => h('button', { class: 'br-seg', type: 'button', style: { width: `${(tasks[i].dur / tot) * 100}%` }, 'aria-label': `${tasks[i].name}, day ${time(k) + 1} to ${time(k + 1)}. Remove`, onclick: () => unbuild(k) }, tasks[i].name.slice(0, 4))));
    days.replaceChildren(h('span', null, 'Day 0'), h('span', null, `Day ${time(seq.length)} of ${tot}`));
    pool.replaceChildren(...tasks.map((t, i) => h('button', { class: 'br-t', type: 'button', 'data-job': i, disabled: seq.includes(i) },
      h('b', null, t.name), `${t.dur} day${t.dur > 1 ? 's' : ''} · `, h('span', { class: 'due' }, `due day ${t.due}`), h('br'), t.pre.length ? `after ${t.pre.map((p) => tasks[p].name).join(' + ')}` : 'no prerequisite')
      ).map((b, i) => { b.addEventListener('click', () => build(i)); return b; }));
    note.textContent = msg;
    ctx.hud('Barn', `${lv + 1}/${LEVELS.length}`); ctx.hud('Built', `${seq.length}/${tasks.length}`); ctx.hud('Mistakes', `${strikes}/${STRIKES}`);
  }
  function start(): void {
    const { n, slack } = LEVELS[lv];
    order = shuffle(rand, NAMES.map((_, i) => i)).slice(0, n); // hidden valid build order (name indices)
    const ts: Task[] = order.map((nm) => ({ name: NAMES[nm], dur: 1 + Math.floor(rand() * 3), pre: [], due: 0 }));
    let clock = 0;
    ts.forEach((t, p) => {
      if (p > 0) { t.pre.push(p === 1 ? 0 : Math.floor(rand() * p)); if (p > 2 && rand() < 0.35) { const q = Math.floor(rand() * p); if (!t.pre.includes(q)) t.pre.push(q); } }
      clock += t.dur; t.due = clock + Math.floor(rand() * (slack + 1));
    });
    // shuffle the display order, remapping prerequisites
    const perm = shuffle(rand, ts.map((_, i) => i));
    const inv = perm.map((p, i) => [p, i]).reduce((m, [p, i]) => { m[p] = i; return m; }, [] as number[]);
    tasks = perm.map((p) => ({ ...ts[p], pre: ts[p].pre.map((q) => inv[q]) }));
    order = ts.map((_, p) => inv[p]); // valid order expressed in display indices
    seq = []; msg = 'Start with a job that needs nothing before it.';
  }
  /** The one player action: add a job to the end of the schedule. */
  function build(i: number): void {
    if (ctx.finished || seq.includes(i)) return;
    const t = tasks[i], miss = t.pre.filter((p) => !seq.includes(p));
    let bad = '';
    if (miss.length) bad = `${t.name} needs ${tasks[miss[0]].name} first.`;
    else if (time(seq.length) + t.dur > t.due) bad = `${t.name} would finish on day ${time(seq.length) + t.dur}, after its due day ${t.due}.`;
    if (bad) {
      strikes++; msg = `Rejected: ${bad}`; ctx.sfx('bad'); render();
      if (strikes >= STRIKES) ctx.finish({ result: 'lose', score, title: 'The barn collapsed', detail: 'Too many jobs built out of order or past their due day.' });
      return;
    }
    seq.push(i); msg = `${t.name} built, day ${time(seq.length)}.`; ctx.sfx('good'); render();
    if (seq.length === tasks.length) {
      score += 300 * (lv + 1) + Math.max(0, 3 - strikes) * 100;
      if (lv + 1 >= LEVELS.length) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'Barn standing', detail: `All ${LEVELS.length} barns raised with ${strikes} mistakes.` }); return; }
      lv++; start(); msg = `Barn ${lv} raised. A bigger one is next.`; render();
    }
  }
  function unbuild(k: number): void { if (ctx.finished) return; seq.length = k; msg = ''; render(); }

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); lv = 0; strikes = 0; score = 0; start(); render(); },
    probe: () => ({ lv, seq: seq.join(','), strikes, score }),
    play(kind: Result) {
      if (kind === 'lose') { const bad = tasks.findIndex((t) => t.pre.length > 0); for (let g = 0; g < 10 && !ctx.finished; g++) build(bad); return; }
      for (let g = 0; g < 40 && !ctx.finished; g++) { const l0 = lv; order.forEach((i) => { if (lv === l0) build(i); }); }
    },
  };
}
