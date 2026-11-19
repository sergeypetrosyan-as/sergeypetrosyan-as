import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Weigh the Nuggets: one nugget is heavier. Plan limited weighings on a balance, then name the fake. */
const ROUNDS = [{ n: 9, w: 2, cols: 3 }, { n: 27, w: 3, cols: 6 }];
const MARK = ['·', 'L ◀', '▶ R'];

export default function weighNuggets(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let round = 0, fake = 0, used = 0, score = 0, accuse = false;
  let side: number[] = [], log: string[] = [], tilt = 0;

  const style = h('style', null, `
    .wn{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .wn svg{width:100%;max-width:300px;height:auto}
    .wn-beam{transition:transform .5s ease;transform-origin:150px 40px}
    .wn-grid{width:100%;display:grid;gap:6px}
    .wn-n{min-height:50px;border-radius:8px;border:2px solid var(--mw-mesa);background:var(--mw-night);color:var(--mw-bone);font:700 .95rem/1.1 var(--mw-font-slab);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2px}
    .wn-n small{font-size:.68rem;color:var(--mw-ash)}
    .wn-n.l{background:var(--mw-wine);border-color:var(--mw-rose)}
    .wn-n.r{background:var(--mw-tan);color:var(--mw-ink);border-color:var(--mw-bone);border-style:dashed}
    .wn-n.acc{outline:3px solid var(--mw-red)}
    .wn-log{width:100%;font:600 .85rem/1.35 var(--mw-font-slab);color:var(--mw-bone);margin:0;padding:0;list-style:none;min-height:2.7em}
  `);
  const beam = h('g', { class: 'wn-beam' });
  const svg = h('svg', { viewBox: '0 0 300 130', 'aria-hidden': 'true' },
    h('path', { d: 'M150 40 L134 120 L166 120 Z', fill: 'none', stroke: 'var(--mw-ember)', 'stroke-width': 3 }), beam);
  const lTxt = h('text', { x: 40, y: 124, 'text-anchor': 'middle', fill: 'var(--mw-bone)', 'font-size': 13 });
  const rTxt = h('text', { x: 260, y: 124, 'text-anchor': 'middle', fill: 'var(--mw-bone)', 'font-size': 13 });
  svg.append(lTxt, rTxt);
  const grid = h('div', { class: 'wn-grid' });
  const logEl = h('ul', { class: 'wn-log', 'aria-live': 'polite' });
  const weighBtn = h('button', { class: 'mw-btn primary', type: 'button', 'data-weigh': '' }, 'Weigh');
  const accBtn = h('button', { class: 'mw-btn', type: 'button', 'data-accuse': '' }, 'Name the fake');
  const note = h('p', { class: 'mw-note' });
  ctx.root.append(style, h('div', { class: 'wn' }, svg, h('div', { class: 'mw-row' }, weighBtn, accBtn), note, grid, logEl));
  weighBtn.addEventListener('click', () => weigh());
  accBtn.addEventListener('click', () => { if (!ctx.finished) { accuse = !accuse; render(); } });

  const cur = () => ROUNDS[round];
  function render(): void {
    const { n, w, cols } = cur();
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.replaceChildren(...Array.from({ length: n }, (_, i) => h('button', {
      class: 'wn-n' + (side[i] === 1 ? ' l' : side[i] === 2 ? ' r' : '') + (accuse ? ' acc' : ''), type: 'button', 'data-nug': i,
      'aria-label': `Nugget ${i + 1}, ${['off the scale', 'left pan', 'right pan'][side[i]]}`, onclick: () => (accuse ? name(i) : cycle(i)),
    }, h('span', null, i + 1), h('small', null, MARK[side[i]]))));
    const L = side.filter((s) => s === 1).length, R = side.filter((s) => s === 2).length;
    lTxt.textContent = `Left: ${L}`; rTxt.textContent = `Right: ${R}`;
    beam.setAttribute('style', `transform:rotate(${tilt}deg)`);
    beam.replaceChildren(
      h('line', { x1: 40, y1: 40, x2: 260, y2: 40, stroke: 'var(--mw-bone)', 'stroke-width': 5, 'stroke-linecap': 'round' }),
      h('path', { d: 'M20 78 L40 40 L60 78 Z M240 78 L260 40 L280 78 Z', fill: 'var(--mw-night)', stroke: 'var(--mw-rose)', 'stroke-width': 3 }),
      h('path', { d: 'M14 78 H66 M234 78 H286', stroke: 'var(--mw-bone)', 'stroke-width': 4 }));
    logEl.replaceChildren(...log.map((l) => h('li', null, l)));
    (weighBtn as HTMLButtonElement).disabled = used >= w || L === 0 || L !== R;
    accBtn.textContent = accuse ? 'Cancel accusation' : 'Name the fake';
    note.textContent = accuse ? 'Tap the nugget you think is heavier. A wrong guess ends the run.' : `The fake is heavier. Tap a nugget to send it left, right or back. Pans must hold the same count.`;
    ctx.hud('Round', `${round + 1}/${ROUNDS.length}`); ctx.hud('Weighings left', w - used); ctx.hud('Score', score);
  }
  function cycle(i: number): void { if (!ctx.finished) { setSide(i, (side[i] + 1) % 3); } }
  function setSide(i: number, s: number): void { side[i] = s; ctx.sfx('tap'); render(); }
  /** Weigh whatever is on the pans. */
  function weigh(): void {
    const { w } = cur();
    const Ls = side.flatMap((s, i) => (s === 1 ? [i] : [])), Rs = side.flatMap((s, i) => (s === 2 ? [i] : []));
    if (ctx.finished || used >= w || !Ls.length || Ls.length !== Rs.length) return;
    used++;
    const res = Ls.includes(fake) ? 1 : Rs.includes(fake) ? 2 : 0;
    tilt = res === 1 ? -14 : res === 2 ? 14 : 0;
    log.push(`${used}. ${Ls.map((i) => i + 1).join(' ')}  vs  ${Rs.map((i) => i + 1).join(' ')}: ${res === 0 ? 'level, the fake is off the scale' : res === 1 ? 'left sinks ◀' : 'right sinks ▶'}`);
    side = side.map(() => 0); ctx.sfx('tick'); render();
  }
  function name(i: number): void {
    if (ctx.finished) return;
    if (i !== fake) { ctx.sfx('lose'); ctx.finish({ result: 'lose', score, title: 'Fool\'s gold', detail: `Nugget ${i + 1} was genuine. The fake was number ${fake + 1}.` }); return; }
    score += 500 + (cur().w - used) * 100; ctx.sfx('good');
    if (round + 1 >= ROUNDS.length) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'Assayer of the year', detail: `Found the fake among ${ROUNDS[round].n} nuggets in ${used} weighings.` }); return; }
    round++; start(); render();
  }
  function start(): void { const { n } = cur(); fake = Math.floor(rand() * n); side = Array(n).fill(0); used = 0; log = []; tilt = 0; accuse = false; }

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; score = 0; start(); render(); },
    probe: () => ({ round, used, side: side.join(''), tilt, log: log.length, score }),
    play(kind: Result) {
      if (kind === 'lose') { name((fake + 1) % cur().n); return; }
      for (let guard = 0; guard < 10 && !ctx.finished; guard++) {
        let cand = Array.from({ length: cur().n }, (_, i) => i);
        const r0 = round;
        while (cand.length > 1 && used < cur().w) {
          const k = Math.ceil(cand.length / 3);
          const L = cand.slice(0, k), R = cand.slice(k, 2 * k), rest = cand.slice(2 * k);
          side = side.map(() => 0); L.forEach((i) => (side[i] = 1)); R.forEach((i) => (side[i] = 2));
          weigh();
          const heavy = tilt < 0 ? 1 : tilt > 0 ? 2 : 0;
          cand = heavy === 1 ? L : heavy === 2 ? R : rest;
        }
        name(cand[0]);
        if (round === r0 && !ctx.finished) break;
      }
    },
  };
}
