import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Constellation Recall: a figure flashes among the stars; tap its stars again in the same order. Three lives. */
const ROUNDS = 5, LIVES = 3, COLS = 4, SP = 96, W = 400;

export default function constellationRecall(ctx: Ctx): Instance {
  type Phase = 'show' | 'recall' | 'ok';
  let rand = makeRng(1);
  let px: number[] = [], py: number[] = [], path: number[] = [], got = 0, round = 1, lives = LIVES, score = 0, phase: Phase = 'show', t = 0, showFor = 3, wrong = -1, wrongT = 0, taps = 0;

  const svg = h('svg', { class: 'cr-svg', viewBox: `0 0 ${W} ${W}`, role: 'group', 'aria-label': 'Star field' });
  const ready = h('button', { class: 'mw-btn', type: 'button', 'data-ready': '' }, 'I remember it');
  const meter = h('div', { class: 'mw-meter' }, h('i'));
  const note = h('p', { class: 'mw-note cr-note', role: 'status' });
  const style = h('style', null, `
    .cr-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;max-width:440px;margin:auto}
    .cr-svg{width:100%;height:auto;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised);touch-action:manipulation}
    .cr-hit{fill:transparent;cursor:pointer}
    .cr-hit:focus{outline:none;stroke:var(--mw-rose);stroke-width:3}
    .cr-note{text-align:center;min-height:2.4em}
  `);
  ctx.root.append(style, h('div', { class: 'cr-wrap' }, svg, meter, ready, note));

  function hud(): void { ctx.hud('Night', `${round}/${ROUNDS}`); ctx.hud('Lives', '★'.repeat(lives) + '☆'.repeat(LIVES - lives)); ctx.hud('Score', score); }
  function build(): void {
    px = []; py = [];
    for (let r = 0; r < COLS; r++) for (let c = 0; c < COLS; c++) { px.push(52 + c * SP + (rand() - 0.5) * 36); py.push(52 + r * SP + (rand() - 0.5) * 36); }
    const k = round + 3;
    for (let tries = 0; tries < 80; tries++) {
      const w = [Math.floor(rand() * 16)];
      while (w.length < k) {
        const near = px.map((_, i) => i).filter((i) => !w.includes(i) && Math.hypot(px[i] - px[w[w.length - 1]], py[i] - py[w[w.length - 1]]) < SP * 1.55);
        if (!near.length) break;
        w.push(near[Math.floor(rand() * near.length)]);
      }
      if (w.length === k) { path = w; break; }
      path = shuffle(rand, px.map((_, i) => i)).slice(0, k);
    }
    got = 0; phase = 'show'; t = 0; showFor = 1.4 + k * 0.45; wrong = -1;
    ready.hidden = false; meter.style.visibility = 'visible';
    note.textContent = 'Memorise the glowing figure and the order of its stars.';
    draw(); hud();
  }
  function draw(): void {
    svg.replaceChildren();
    const showing = phase === 'show';
    const pts = (n: number): string => path.slice(0, n).map((p) => `${px[p]},${py[p]}`).join(' ');
    if (showing || phase === 'ok') svg.append(h('polyline', { points: pts(path.length), fill: 'none', stroke: 'var(--mw-rose)', 'stroke-width': 3, 'stroke-dasharray': showing ? '2 7' : '', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    else if (got > 1) svg.append(h('polyline', { points: pts(got), fill: 'none', stroke: 'var(--mw-rose)', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    px.forEach((_, i) => {
      const idx = path.indexOf(i), inFig = idx >= 0 && (showing || phase === 'ok' || idx < got);
      if (showing && idx >= 0) svg.append(h('text', { x: px[i] + 13, y: py[i] - 11, fill: 'var(--mw-bone)', 'font-size': 15, 'font-weight': 700, 'font-family': 'var(--mw-font-slab)' }, String(idx + 1)));
      if (inFig) svg.append(h('polygon', { points: starPts(px[i], py[i], 13), fill: 'var(--mw-rose)', stroke: 'var(--mw-bone)', 'stroke-width': 1.5, 'stroke-linejoin': 'round' }));
      else svg.append(h('circle', { cx: px[i], cy: py[i], r: i === wrong ? 9 : 5, fill: i === wrong ? 'var(--mw-red)' : 'var(--mw-bone)', opacity: showing ? 0.45 : 0.9 }));
      if (i === wrong) svg.append(h('text', { x: px[i], y: py[i] + 5, 'text-anchor': 'middle', fill: 'var(--mw-white)', 'font-size': 13, 'font-weight': 700 }, '✕'));
      const hit = h('circle', { class: 'cr-hit', cx: px[i], cy: py[i], r: 24, tabindex: 0, role: 'button', 'aria-label': `Star ${i + 1}`, 'data-star': i });
      hit.addEventListener('pointerdown', (e) => { e.preventDefault(); tap(i); });
      hit.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(i); } });
      svg.append(hit);
    });
  }
  function starPts(x: number, y: number, R: number): string {
    return Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? R * 0.45 : R; return `${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  }
  function beginRecall(): void {
    phase = 'recall'; t = 0; ready.hidden = true; got = 0;
    meter.style.visibility = 'hidden';
    note.textContent = `Tap the ${path.length} stars in the same order.`; draw();
  }
  /** The one player action: tap a star. */
  function tap(i: number): void {
    taps++;
    if (ctx.finished || phase !== 'recall') return;
    if (i === path[got]) {
      got++; ctx.sfx('good'); wrong = -1;
      if (got === path.length) {
        score += path.length * 100; phase = 'ok'; t = 0; note.textContent = 'The figure is whole.'; hud();
      }
    } else {
      lives--; wrong = i; wrongT = 0; ctx.sfx('bad'); hud();
      note.textContent = `That is not star ${got + 1} of the figure.`;
      if (lives <= 0) { draw(); ctx.finish({ result: 'lose', score, title: 'The figure fades', detail: `You lost the shape on night ${round}.` }); return; }
    }
    draw();
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt;
    if (phase === 'show') { (meter.firstChild as HTMLElement).style.width = `${Math.max(0, 100 - (t / showFor) * 100)}%`; if (t >= showFor) beginRecall(); }
    else if (phase === 'recall' && wrong >= 0) { wrongT += dt; if (wrongT > 0.6) { wrong = -1; draw(); } }
    else if (phase === 'ok' && t > 1) {
      if (round >= ROUNDS) { ctx.sfx('win'); ctx.finish({ result: 'win', score: score + lives * 100, title: 'Every figure recalled', detail: `All ${ROUNDS} constellations redrawn with ${lives} lives left.` }); }
      else { round++; build(); }
    }
  }
  ready.addEventListener('click', () => { if (phase === 'show' && !ctx.finished) beginRecall(); });
  ctx.loop(update, () => {});

  return {
    destroy() { /* released by the shell */ },
    reset(seed) { rand = makeRng(seed); round = 1; lives = LIVES; score = 0; taps = 0; build(); },
    probe: () => ({ round, phase, got, lives, score, taps }),
    play(kind: Result) {
      for (let g = 0; g < 2000 && !ctx.finished; g++) {
        if (phase === 'show') { update(1 / 60); continue; }
        if (phase === 'ok') { update(1 / 60); continue; }
        if (kind === 'win') tap(path[got]);
        else tap(px.map((_, i) => i).find((i) => i !== path[got])!);
        for (let k = 0; k < 40; k++) update(1 / 60);
      }
    },
  };
}
