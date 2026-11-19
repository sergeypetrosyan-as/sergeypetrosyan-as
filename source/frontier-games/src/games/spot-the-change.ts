import { h } from '../core/dom';
import { makeRng, pick as choose, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Spot the Change: study a town, blink, then tap the spot where something moved, vanished, swapped or changed colour. */
const COLS = 4, ROWS = 3, ROUNDS = 8, STRIKES = 3;
const KINDS = ['house', 'cactus', 'barrel', 'well', 'mill'];
const TINTS = ['tan', 'rose', 'bone', 'ember', 'wine'];
type Obj = { kind: string; tint: string; dx: number; dy: number; sc: number } | null;
const KIND_OF = ['remove', 'add', 'swap', 'recolor', 'recolor', 'move', 'scale', 'move'];

export default function spotTheChange(ctx: Ctx): Instance {
  type Phase = 'study' | 'blink' | 'pick' | 'result';
  let rand = makeRng(1);
  let phase: Phase = 'study', t = 0, round = 1, strikes = 0, right = 0, score = 0, answer = 0, flashAt = -1, msg = '';
  let A: Obj[] = [], B: Obj[] = [];

  const svg = h('svg', { viewBox: '0 0 300 240', class: 'sc-svg', role: 'img', 'aria-label': 'Town scene' });
  const hit = h('div', { class: 'sc-hit' });
  const skip = h('button', { class: 'mw-btn primary', type: 'button', 'data-skip': '' }, 'Ready: flash');
  const say = h('p', { class: 'mw-note', role: 'status' });
  const style = h('style', null, `
    .sc{width:100%;max-width:420px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .sc-box{position:relative;width:100%;aspect-ratio:300/240;border:3px solid var(--mw-ember);border-radius:10px;overflow:hidden;background:var(--mw-night)}
    .sc-svg{position:absolute;inset:0;width:100%;height:100%}
    .sc-hit{position:absolute;inset:0;display:grid;grid-template-columns:repeat(${COLS},1fr);grid-template-rows:repeat(${ROWS},1fr)}
    .sc-hit button{background:transparent;border:2px solid transparent;border-radius:12px;cursor:pointer;min-height:44px;padding:0}
    .sc-hit.on button:active{border-color:var(--mw-rose)}
    .sc-hit button.ok{border-color:var(--mw-rose);background:color-mix(in srgb,var(--mw-rose) 25%,transparent)}
    .sc-hit button.no{border-color:var(--mw-red);background:color-mix(in srgb,var(--mw-red) 25%,transparent)}
    .sc-pips{display:flex;gap:8px;font:700 .9rem var(--mw-font-slab);color:var(--mw-bone)}
  `);
  ctx.root.append(style, h('div', { class: 'sc' }, h('div', { class: 'sc-box' }, svg, hit), skip, say));
  skip.addEventListener('click', () => ready());

  const cx = (s: number) => 37 + (s % COLS) * 75, cy = (s: number) => 55 + Math.floor(s / COLS) * 72;
  function shape(o: NonNullable<Obj>, s: number): SVGElement {
    const col = `var(--mw-${o.tint})`, k = o.kind, st = { fill: col, stroke: 'var(--mw-ink)', 'stroke-width': 1.5 };
    const g = h('g', { transform: `translate(${cx(s) + o.dx} ${cy(s) + o.dy}) scale(${o.sc * 1.3})` });
    if (k === 'house') g.append(h('rect', { x: -15, y: -6, width: 30, height: 22, ...st }), h('polygon', { points: '-19,-6 0,-22 19,-6', ...st, fill: 'var(--mw-wine)' }));
    else if (k === 'cactus') g.append(h('rect', { x: -5, y: -20, width: 10, height: 38, rx: 5, ...st }), h('rect', { x: -16, y: -6, width: 8, height: 14, rx: 4, ...st }), h('rect', { x: 8, y: -12, width: 8, height: 14, rx: 4, ...st }));
    else if (k === 'barrel') g.append(h('rect', { x: -12, y: -14, width: 24, height: 30, rx: 8, ...st }), h('line', { x1: -12, y1: -3, x2: 12, y2: -3, stroke: 'var(--mw-ink)', 'stroke-width': 2 }), h('line', { x1: -12, y1: 8, x2: 12, y2: 8, stroke: 'var(--mw-ink)', 'stroke-width': 2 }));
    else if (k === 'well') g.append(h('rect', { x: -14, y: 2, width: 28, height: 14, ...st }), h('line', { x1: -12, y1: 2, x2: -12, y2: -16, stroke: col, 'stroke-width': 3 }), h('line', { x1: 12, y1: 2, x2: 12, y2: -16, stroke: col, 'stroke-width': 3 }), h('polygon', { points: '-17,-16 0,-26 17,-16', ...st, fill: 'var(--mw-saddle)' }));
    else g.append(h('polygon', { points: '-10,16 10,16 5,-12 -5,-12', ...st }), h('line', { x1: 0, y1: -12, x2: 16, y2: -24, stroke: col, 'stroke-width': 4 }), h('line', { x1: 0, y1: -12, x2: -16, y2: 0, stroke: col, 'stroke-width': 4 }), h('circle', { cx: 0, cy: -12, r: 3, fill: 'var(--mw-ink)' }));
    return g as unknown as SVGElement;
  }
  function render(): void {
    const scene = phase === 'blink' ? null : phase === 'study' ? A : B;
    svg.replaceChildren(h('rect', { x: 0, y: 0, width: 300, height: 240, fill: 'var(--mw-night)' }),
      h('path', { d: 'M0 214 L0 204 L28 204 L34 190 L70 190 L76 204 L120 204 L126 198 L150 198 L156 208 L220 208 L228 186 L270 186 L276 204 L300 204 L300 240 L0 240 Z', fill: 'var(--mw-dusk)', opacity: 0.5 }),
      ...(scene ? scene.flatMap((o, s) => (o ? [shape(o, s)] : [])) : [h('text', { x: 150, y: 124, 'text-anchor': 'middle', fill: 'var(--mw-ash)', 'font-size': 18 }, 'blink')]));
    hit.className = 'sc-hit' + (phase === 'pick' ? ' on' : '');
    hit.replaceChildren(...Array.from({ length: COLS * ROWS }, (_, s) => h('button', { type: 'button', 'data-slot': s, 'aria-label': `Spot ${Math.floor(s / COLS) + 1}, ${(s % COLS) + 1}`, class: phase === 'result' ? (s === answer ? 'ok' : s === flashAt ? 'no' : '') : '', onclick: () => choosePick(s) })));
    (skip as HTMLButtonElement).style.visibility = phase === 'study' ? 'visible' : 'hidden';
    say.textContent = phase === 'study' ? 'Study the town. It will flash and change.' : phase === 'blink' ? '' : phase === 'pick' ? 'What changed? Tap that spot (an empty spot counts if something appeared).' : msg;
    ctx.hud('Round', `${round}/${ROUNDS}`); ctx.hud('Strikes', `${strikes}/${STRIKES}`); ctx.hud('Score', score);
  }
  function begin(): void {
    const slots = shuffle(rand, Array.from({ length: COLS * ROWS }, (_, i) => i));
    const used = slots.slice(0, 9), free = slots.slice(9);
    A = Array(COLS * ROWS).fill(null);
    used.forEach((s) => (A[s] = { kind: choose(rand, KINDS), tint: choose(rand, TINTS), dx: 0, dy: 0, sc: 1 }));
    B = A.map((o) => (o ? { ...o } : null));
    const type = KIND_OF[round - 1];
    answer = used[0];
    const o = B[answer]!;
    if (type === 'remove') B[answer] = null;
    else if (type === 'add') { answer = free[0]; B[answer] = { kind: choose(rand, KINDS), tint: choose(rand, TINTS), dx: 0, dy: 0, sc: 1 }; }
    else if (type === 'swap') o.kind = KINDS[(KINDS.indexOf(o.kind) + 1 + Math.floor(rand() * 4)) % 5];
    else if (type === 'recolor') o.tint = TINTS[(TINTS.indexOf(o.tint) + 2) % 5];
    else if (type === 'scale') o.sc = 1.3;
    else o.dx = round < 7 ? 14 : 7;
    t = 0; phase = 'study'; flashAt = -1; render();
  }
  function ready(): void { if (!ctx.finished && phase === 'study') { phase = 'blink'; t = 0; render(); } }
  /** The one scoring action: tap the spot you think changed. */
  function choosePick(s: number): void {
    if (ctx.finished || phase !== 'pick') return;
    t = 0; phase = 'result'; flashAt = s;
    if (s === answer) { right++; score += 100 + (STRIKES - strikes) * 20; msg = 'Yes, that is what changed.'; ctx.sfx('good'); }
    else { strikes++; msg = 'No: the highlighted spot is what changed.'; ctx.sfx('bad'); }
    render();
  }
  function update(dt: number): void {
    t += dt;
    const limit = Math.max(1.6, 3.4 - round * 0.2);
    if (phase === 'study' && t >= limit) ready();
    else if (phase === 'blink' && t >= 0.5) { phase = 'pick'; t = 0; render(); }
    else if (phase === 'result' && t >= 1.3) {
      if (strikes >= STRIKES) ctx.finish({ result: 'lose', score, title: 'Eyes too slow', detail: `You spotted ${right} of ${round} changes before the third miss.` });
      else if (round >= ROUNDS) ctx.finish({ result: 'win', score, title: 'Sharp eyes', detail: `${right} of ${ROUNDS} changes spotted.` });
      else { round++; begin(); }
    }
  }

  ctx.loop(update, () => {});
  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 1; strikes = 0; right = 0; score = 0; begin(); },
    probe: () => ({ round, phase, strikes, right, score }),
    play(kind: Result) {
      for (let guard = 0; guard < 6000 && !ctx.finished; guard++) {
        if (phase === 'pick') choosePick(kind === 'win' ? answer : (answer + 1) % (COLS * ROWS));
        else update(1 / 60);
      }
    },
  };
}
