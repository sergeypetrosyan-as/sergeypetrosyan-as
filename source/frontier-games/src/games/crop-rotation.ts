import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Crop Rotation: plant each plot for four seasons. Wheat and corn drain soil, beans and rest restore it; meet each season's market order. */
const NAME = ['Rest', 'Wheat', 'Beans', 'Corn'], CSS = ['rest', 'wheat', 'beans', 'corn'];
const NEED = [0, 1, 0, 2];            // soil a crop needs to grow
const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
const ROUNDS = [3, 4, 5], TRIES = 4;

interface Sim { yields: number[][]; ok: boolean[][]; soil: number[][] }

export default function cropRotation(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let round = 0, plots = 3, tries = TRIES, score = 0, adv = -1;
  let soil0: number[] = [], plan: number[][] = [], hidden: number[][] = [], demand: number[][] = [];

  const board = h('div', { class: 'cr-board' });
  const note = h('p', { class: 'mw-note', role: 'status' });
  const go = h('button', { class: 'mw-btn primary', type: 'button', 'data-market': '', style: { width: '100%', minHeight: '48px' }, onclick: () => submit() }, 'Take the harvest to market');
  const style = h('style', null, `
    .cr{width:100%;max-width:420px;display:flex;flex-direction:column;align-items:center;gap:8px}
    .cr-board{width:100%;display:grid;grid-template-columns:62px repeat(4,minmax(0,1fr));gap:4px;align-items:stretch}
    .cr-h{font:700 .8rem/1.15 var(--mw-font-slab);color:var(--mw-bone);text-align:center;padding:4px 2px;border-bottom:2px solid var(--mw-ember)}
    .cr-h small{display:block;color:var(--mw-rose);font-weight:600}
    .cr-p{font:700 .85rem/1.2 var(--mw-font-slab);color:var(--mw-bone);display:flex;flex-direction:column;justify-content:center}
    .cr-pips,.cr-p i{display:inline-flex;gap:2px}.cr-pips span{width:8px;height:8px;border-radius:50%;border:1.5px solid var(--mw-saddle)}.cr-pips span.on{background:var(--mw-tan);border-color:var(--mw-bone)}
    .cr-c{min-height:60px;border-radius:8px;border:2px solid var(--mw-mesa);background:var(--mw-night);color:var(--mw-bone);font:700 .88rem/1.1 var(--mw-font-slab);cursor:pointer;padding:3px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px}
    .cr-c.wheat{background:var(--mw-tan);color:var(--mw-ink);border-color:var(--mw-bone)}
    .cr-c.beans{background:var(--mw-rose);color:var(--mw-ink);border-color:var(--mw-bone)}
    .cr-c.corn{background:var(--mw-ember);color:var(--mw-white);border-color:var(--mw-bone)}
    .cr-c.rest{border-style:dashed;color:var(--mw-ash)}
    .cr-c.bad{background:var(--mw-night);color:var(--mw-red);border:2px solid var(--mw-red);text-decoration:line-through}
    .cr-c.wheat .cr-pips span,.cr-c.beans .cr-pips span{border-color:var(--mw-ink)}.cr-c.wheat .cr-pips span.on,.cr-c.beans .cr-pips span.on{background:var(--mw-ink)}
    .cr-f{font:600 .75rem/1.2 var(--mw-font-slab);color:var(--mw-ash);text-align:center;padding-top:3px}
    .cr-f.ok{color:var(--mw-rose)}
  `);
  ctx.root.append(style, h('div', { class: 'cr' }, board, go, note));

  function simulate(p: number[][]): Sim {
    const yields = SEASONS.map(() => [0, 0, 0, 0]), ok = p.map(() => [] as boolean[]), soil = p.map(() => [] as number[]);
    p.forEach((row, i) => {
      let n = soil0[i];
      row.forEach((c, s) => {
        const grows = c !== 0 && n >= NEED[c];
        if (c === 0) n = Math.min(3, n + 2); else if (c === 2) n = Math.min(3, n + 1); else if (grows) n -= NEED[c];
        if (c === 2) { yields[s][2]++; } else if (grows) yields[s][c]++;
        ok[i][s] = c === 0 || c === 2 || grows; soil[i][s] = n;
      });
    });
    return { yields, ok, soil };
  }
  const met = (y: number[][]): boolean[] => demand.map((d, s) => d.every((v, c) => y[s][c] >= v));
  const pips = (n: number): HTMLElement => h('span', { class: 'cr-pips', 'aria-label': `soil ${n} of 3` }, ...[0, 1, 2].map((k) => h('span', { class: k < n ? 'on' : '' })));

  function render(): void {
    const sim = simulate(plan), m = met(sim.yields);
    const kids: HTMLElement[] = [h('div', { class: 'cr-h' }, 'Plot soil')];
    SEASONS.forEach((s, i) => kids.push(h('div', { class: 'cr-h' }, s, h('small', null, demand[i].map((v, c) => (v ? `${NAME[c]} ${v}` : '')).filter(Boolean).join(', ') || 'No order'))));
    plan.forEach((row, i) => {
      kids.push(h('div', { class: 'cr-p' }, `Plot ${i + 1}`, pips(soil0[i])));
      row.forEach((c, s) => kids.push(h('button', { class: `cr-c ${CSS[c]}${sim.ok[i][s] ? '' : ' bad'}`, type: 'button', 'data-plot': i, 'data-season': s, 'aria-label': `Plot ${i + 1}, ${SEASONS[s]}: ${NAME[c]}${sim.ok[i][s] ? '' : ', starved'}. Tap to change crop.`, onclick: () => cycle(i, s) }, h('span', null, NAME[c]), pips(sim.soil[i][s]))));
    });
    kids.push(h('div', { class: 'cr-f' }, 'Delivered'));
    SEASONS.forEach((_, s) => kids.push(h('div', { class: 'cr-f' + (m[s] ? ' ok' : '') }, (m[s] ? '✓ ' : '') + ([1, 2, 3].map((c) => (demand[s][c] || sim.yields[s][c] ? `${NAME[c][0]} ${sim.yields[s][c]}/${demand[s][c]}` : '')).filter(Boolean).join('  ') || '-'))));
    board.replaceChildren(...kids);
  }
  function hud(): void { ctx.hud('Year', `${round + 1}/${ROUNDS.length}`); ctx.hud('Markets left', tries); ctx.hud('Score', score); }
  function build(): void {
    plots = ROUNDS[round]; adv = -1;
    for (let attempt = 0; attempt < 300; attempt++) {
      soil0 = Array.from({ length: plots }, () => rint(rand, 0, 2));
      hidden = soil0.map((n0) => { let n = n0; return SEASONS.map(() => { const opts = [0, 1, 2, 3].filter((c) => n >= NEED[c]); const wgt = opts.flatMap((c) => (c === 0 ? [0] : [c, c])); const c = wgt[rint(rand, 0, wgt.length - 1)]; n = c === 0 ? Math.min(3, n + 2) : c === 2 ? Math.min(3, n + 1) : n - NEED[c]; return c; }); });
      const y = simulate(hidden).yields; demand = y.map((r) => r.slice());
      const total = y.flat().reduce((a, b) => a + b, 0);
      const uniform = [0, 1, 2, 3].every((c) => !met(simulate(hidden.map((r) => r.map(() => c))).yields).every(Boolean));
      if (total >= plots * 3 && y.every((r) => r.some(Boolean)) && uniform) break;
    }
    plan = soil0.map(() => SEASONS.map(() => 0));
    note.textContent = 'Tap a square to cycle Rest, Wheat, Beans, Corn. Wheat needs 1 soil, corn needs 2, beans add 1, rest adds 2. Starved crops are struck out.';
    render(); hud();
  }
  /** Player action: change the crop planted in a plot for a season. */
  function cycle(i: number, s: number): void {
    if (ctx.finished || adv >= 0) return;
    plan[i][s] = (plan[i][s] + 1) % 4; ctx.sfx('tap'); render();
  }
  /** Player action: send the harvest to market. */
  function submit(): void {
    if (ctx.finished || adv >= 0) return;
    const m = met(simulate(plan).yields);
    if (m.every(Boolean)) { score += 400 + tries * 100; ctx.sfx('good'); adv = 0; note.textContent = 'Every order filled!'; hud(); return; }
    tries--; ctx.sfx('bad'); hud();
    const s = m.findIndex((v) => !v);
    note.textContent = `The ${SEASONS[s]} order went unfilled. Markets left: ${tries}.`;
    if (tries <= 0) ctx.finish({ result: 'lose', score, title: 'The market turned you away', detail: `${SEASONS[s]} orders were never met in year ${round + 1}. Plan the soil before you plant.` });
  }
  function update(dt: number): void {
    if (adv < 0 || ctx.finished) return;
    adv += dt;
    if (adv > 0.9) { round++; if (round >= ROUNDS.length) { round = ROUNDS.length - 1; adv = -1; ctx.finish({ result: 'win', score, title: 'Fields and market fed', detail: 'Three years of orders filled.' }); } else build(); }
  }
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; tries = TRIES; score = 0; build(); },
    probe: () => ({ round, tries, plan: plan.map((r) => r.join('')).join('/') }),
    play(kind: Result) {
      for (let guard = 0; guard < 2000 && !ctx.finished; guard++) {
        if (adv >= 0) { update(1 / 60); continue; }
        if (kind === 'win') { for (let i = 0; i < plots; i++) for (let s = 0; s < 4; s++) while (plan[i][s] !== hidden[i][s]) cycle(i, s); }
        submit();
      }
    },
  };
}
