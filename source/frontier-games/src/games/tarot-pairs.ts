import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Tarot Pairs: sixteen face-down arcana cards, eight pairs. Flip two; matches stay. Ten misses and the spread is lost. */
const MAX_MISS = 10;
const ARCANA: { name: string; num: string; svg: string }[] = [
  { name: 'Star', num: 'XVII', svg: '<polygon points="12,2 14.6,9 22,9.3 16.2,13.9 18.2,21 12,16.9 5.8,21 7.8,13.9 2,9.3 9.4,9"/>' },
  { name: 'Moon', num: 'XVIII', svg: '<path d="M15 3 A9 9 0 1 0 21 15 A7 7 0 1 1 15 3 Z"/>' },
  { name: 'Sun', num: 'XIX', svg: '<circle cx="12" cy="12" r="5"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M20 4l-2 2M6 18l-2 2" fill="none"/>' },
  { name: 'Tower', num: 'XVI', svg: '<path d="M8 22V9H6.5L12 2l5.5 7H16v13zM11 13h2v3h-2z"/>' },
  { name: 'Cup', num: 'XIV', svg: '<path d="M4 4h16c0 7-4 11-8 11S4 11 4 4zM12 15v5M7 21h10" />' },
  { name: 'Sword', num: 'VIII', svg: '<path d="M12 1l2.5 13h-5zM6 14h12M12 14v8"/>' },
  { name: 'Wheel', num: 'X', svg: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" fill="none"/>' },
  { name: 'Eye', num: 'XI', svg: '<path d="M1.5 12Q12 3 22.5 12Q12 21 1.5 12z"/><circle cx="12" cy="12" r="3" fill="currentColor"/>' },
];

export default function tarotPairs(ctx: Ctx): Instance {
  let faces: number[] = [], up: number[] = [], done: boolean[] = [], misses = 0, pairs = 0, flips = 0, token = 0;
  const els: HTMLElement[] = [];
  const grid = h('div', { class: 'tp-grid' });
  const note = h('p', { class: 'mw-note', role: 'status' });
  const style = h('style', null, `
    .tp{width:100%;max-width:min(440px,56vh);display:flex;flex-direction:column;gap:10px;align-items:center}
    .tp-grid{width:100%;display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
    .tp-card{aspect-ratio:3/4;min-width:0;min-height:56px;padding:0;border:2px solid var(--mw-ember);border-radius:8px;background:var(--mw-dusk);color:var(--mw-bone);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font:700 .68rem/1 var(--mw-font-slab);outline-offset:-6px}
    .tp-card svg{width:46%;height:auto;stroke:currentColor;stroke-width:1.6;fill:none;stroke-linejoin:round;stroke-linecap:round}
    .tp-card .back{display:block}
    .tp-card[data-s=down]{outline:1px dashed var(--mw-tan)}
    .tp-card[data-s=up]{background:var(--mw-tan);color:var(--mw-ink);border-color:var(--mw-bone)}
    .tp-card[data-s=done]{background:var(--mw-rose);color:var(--mw-ink);border-color:var(--mw-bone);cursor:default}
    .tp-card[data-s=done] svg,.tp-card[data-s=up] svg{fill:currentColor;fill-opacity:.18}
    .tp-card[data-s=down] .face,.tp-card:not([data-s=down]) .back{display:none}
    .tp-card .face{display:flex;flex-direction:column;align-items:center;gap:3px}
  `);
  ctx.root.append(style, h('div', { class: 'tp' }, grid, note));
  const backSvg = '<svg viewBox="0 0 24 24" aria-hidden="true" style="stroke:var(--mw-tan);fill:none"><path d="M12 2l8 10-8 10-8-10z"/><circle cx="12" cy="12" r="2.5"/></svg>';

  function paint(): void {
    els.forEach((e, i) => {
      const s = done[i] ? 'done' : up.includes(i) ? 'up' : 'down'; e.dataset.s = s;
      e.setAttribute('aria-label', s === 'down' ? `Face-down card ${i + 1}` : `${ARCANA[faces[i]].name}${s === 'done' ? ', matched' : ''}`);
    });
    ctx.hud('Pairs', `${pairs}/8`); ctx.hud('Misses', `${misses}/${MAX_MISS}`);
  }
  /** Mismatched pair stays visible a moment; this turns them back. */
  function settle(): void {
    if (up.length === 2 && faces[up[0]] !== faces[up[1]]) { up = []; paint(); }
  }
  /** The one action: flip card `i`. */
  function flip(i: number): void {
    if (ctx.finished || done[i] || up.includes(i)) return;
    settle();
    up.push(i); flips++; ctx.sfx('tap');
    if (up.length === 2) {
      const [a, b] = up;
      if (faces[a] === faces[b]) { done[a] = done[b] = true; up = []; pairs++; ctx.sfx('good'); note.textContent = `${ARCANA[faces[a]].name}: a pair.`; }
      else { misses++; ctx.sfx('bad'); const t = ++token; note.textContent = 'No match. Remember where they were.'; ctx.after(750, () => { if (t === token) settle(); }); }
    }
    paint();
    if (pairs === 8) { const rank = misses <= 4 ? 'Magician' : misses <= 7 ? 'Hermit' : 'Fool'; ctx.sfx('win'); ctx.finish({ result: 'win', score: Math.max(100, 1000 - misses * 70), title: `Rank: ${rank}`, detail: `All eight pairs found with ${misses} miss${misses === 1 ? '' : 'es'} in ${Math.round(flips / 2)} turns.` }); }
    else if (misses >= MAX_MISS && up.length === 2) ctx.finish({ result: 'lose', score: pairs * 50, title: 'The spread is lost', detail: `Ten misses. You matched ${pairs} of 8 pairs.` });
  }

  return {
    destroy() { /* released by the shell */ },
    reset(seed) {
      const rand = makeRng(seed);
      faces = shuffle(rand, ARCANA.flatMap((_, k) => [k, k])); up = []; done = faces.map(() => false); misses = 0; pairs = 0; flips = 0; token++;
      grid.replaceChildren(); els.length = 0;
      faces.forEach((f, i) => {
        const e = h('button', { class: 'tp-card', type: 'button', 'data-card': i, onclick: () => flip(i) });
        e.innerHTML = `${backSvg.replace('<svg', '<svg class="back"')}<span class="face"><svg viewBox="0 0 24 24" aria-hidden="true">${ARCANA[f].svg}</svg><span>${ARCANA[f].num}</span><span>${ARCANA[f].name}</span></span>`;
        els.push(e); grid.append(e);
      });
      note.textContent = 'Flip two cards. Matching arcana stay face up.'; paint();
    },
    probe: () => ({ up: up.join(), pairs, misses, flips }),
    play(kind) {
      for (let guard = 0; guard < 200 && !ctx.finished; guard++) {
        settle();
        const open = faces.map((_, i) => i).filter((i) => !done[i]);
        if (kind === 'win') { const a = open[0]; flip(a); flip(open.find((j) => j !== a && faces[j] === faces[a])!); }
        else { const a = open[0]; flip(a); flip(open.find((j) => faces[j] !== faces[a])!); }
      }
    },
  };
}
