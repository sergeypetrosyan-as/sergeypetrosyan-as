import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Pigment Mix: slide cochineal, bone and soot to match the sunset swatch. Mixes blend by share, so only the ratio matters. Each round is tighter. */
const ROUNDS = [34, 26, 18, 12], TRIES = 3;
const NAMES = ['Cochineal', 'Bone', 'Soot'], ROLE = ['red', 'bone', 'ink'];
type RGB = [number, number, number];
const toRgb = (hex: string): RGB => { const n = parseInt(hex.replace('#', '').slice(0, 6), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const dist = (a: RGB, b: RGB): number => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const css = (c: RGB): string => `rgb(${c.map(Math.round).join(',')})`;
const lum = (c: RGB): number => 0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2];
const TRI: [number, number][] = [[60, 10], [12, 94], [108, 94]];

export default function pigmentMix(ctx: Ctx): Instance {
  const base: RGB[] = ROLE.map((r) => toRgb(ctx.c[r]));
  const blend = (w: number[]): RGB | null => { const s = w[0] + w[1] + w[2]; return s <= 0 ? null : [0, 1, 2].map((k) => (base[0][k] * w[0] + base[1][k] * w[1] + base[2][k] * w[2]) / s) as RGB; };
  let rand = makeRng(1);
  let round = 0, tries = TRIES, score = 0, adv = -1;
  let w = [34, 33, 33], tw = [50, 30, 20], misses: number[][] = [];

  const swTarget = h('div', { class: 'pm-sw', 'aria-label': 'Sunset swatch to match' }, h('span', null, 'Sunset swatch'));
  const swMix = h('div', { class: 'pm-sw', 'aria-label': 'Your mix' }, h('span', null, 'Your mix'));
  const tri = h('svg', { viewBox: '0 0 120 104', class: 'pm-tri', role: 'img', 'aria-label': 'Triangle chart: where your mix sits between the three pigments' });
  const sliders = NAMES.map((n, i) => {
    const out = h('output', null, '0');
    const inp = h('input', { type: 'range', min: 0, max: 100, step: 1, value: w[i], 'aria-label': `${n} amount`, 'data-slider': i }) as HTMLInputElement;
    ctx.on(inp, 'input', () => setAmount(i, Number(inp.value)));
    return { inp, out, row: h('label', { class: 'pm-row' }, h('span', { class: 'pm-dot', style: { background: `var(--mw-${ROLE[i]})` } }), h('b', null, n), inp, out) };
  });
  const go = h('button', { class: 'mw-btn primary', type: 'button', 'data-submit': '', style: { width: '100%', minHeight: '48px' }, onclick: () => submit() }, 'Match it');
  const note = h('p', { class: 'mw-note', role: 'status' });
  const style = h('style', null, `
    .pm{width:100%;max-width:420px;display:flex;flex-direction:column;gap:10px}
    .pm-top{display:grid;grid-template-columns:1fr 1fr 118px;gap:8px;align-items:stretch}
    .pm-sw{min-height:112px;border:2px solid var(--mw-bone);border-radius:10px;display:flex;align-items:flex-end;padding:6px}
    .pm-sw span{font:700 .75rem var(--mw-font-slab);background:var(--mw-night);color:var(--mw-bone);padding:2px 6px;border-radius:6px}
    .pm-tri{width:100%;height:112px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-night)}
    .pm-row{display:grid;grid-template-columns:18px 76px 1fr 38px;gap:8px;align-items:center;min-height:44px;font:600 .88rem var(--mw-font-slab);color:var(--mw-bone)}
    .pm-dot{width:16px;height:16px;border-radius:50%;border:2px solid var(--mw-bone)}.pm-row output{text-align:right;color:var(--mw-ash)}
    .pm-row input{width:100%;height:44px;accent-color:var(--mw-rose);margin:0}
  `);
  ctx.root.append(style, h('div', { class: 'pm' }, h('div', { class: 'pm-top' }, swTarget, swMix, tri), ...sliders.map((s) => s.row), go, note));

  const bary = (a: number[]): [number, number] => { const s = a[0] + a[1] + a[2] || 1; return [0, 1].map((k) => (TRI[0][k] * a[0] + TRI[1][k] * a[1] + TRI[2][k] * a[2]) / s) as [number, number]; };
  function render(): void {
    const m = blend(w), t = blend(tw)!;
    swTarget.style.background = css(t); swMix.style.background = m ? css(m) : 'var(--mw-night)';
    sliders.forEach((s, i) => { s.inp.value = String(w[i]); s.out.textContent = `${w[i]}`; });
    (go as HTMLButtonElement).disabled = !m;
    const pts = TRI.map((p) => p.join(',')).join(' ');
    const [mx, my] = bary(w);
    tri.replaceChildren(
      h('polygon', { points: pts, fill: 'none', stroke: 'var(--mw-umber)', 'stroke-width': 2 }),
      h('line', { x1: 60, y1: 10, x2: 60, y2: 94, stroke: 'var(--mw-umber)', 'stroke-width': 1, 'stroke-dasharray': '2 4' }),
      ...TRI.map((p, i) => h('circle', { cx: p[0], cy: p[1], r: 8, fill: `var(--mw-${ROLE[i]})`, stroke: 'var(--mw-bone)', 'stroke-width': 2 })),
      ...misses.map((a) => { const [x, y] = bary(a); return h('path', { d: `M${x - 3},${y - 3}L${x + 3},${y + 3}M${x + 3},${y - 3}L${x - 3},${y + 3}`, stroke: 'var(--mw-red)', 'stroke-width': 2, 'stroke-linecap': 'round' }); }),
      h('circle', { cx: mx, cy: my, r: 6, fill: m ? css(m) : 'none', stroke: 'var(--mw-white)', 'stroke-width': 2.5 }),
      h('text', { x: 60, y: 28, 'text-anchor': 'middle', fill: 'var(--mw-bone)', style: { font: '700 8px var(--mw-font-slab)' } }, 'red'),
      h('text', { x: 24, y: 78, fill: 'var(--mw-bone)', style: { font: '700 8px var(--mw-font-slab)' } }, 'light'),
      h('text', { x: 96, y: 78, 'text-anchor': 'end', fill: 'var(--mw-bone)', style: { font: '700 8px var(--mw-font-slab)' } }, 'dark'),
    );
  }
  function hud(): void { ctx.hud('Swatch', `${round + 1}/${ROUNDS.length}`); ctx.hud('Tries', tries); ctx.hud('Score', score); }
  function build(): void {
    adv = -1; tries = TRIES; misses = [];
    for (let k = 0; k < 50; k++) {
      tw = [rint(rand, 0, 100), rint(rand, 0, 100), rint(rand, 0, 100)];
      const nz = tw.filter((v) => v > 15).length, m = blend(tw);
      if (nz >= 2 && m && dist(m, blend([34, 33, 33])!) > 40) break;
    }
    w = [34, 33, 33];
    note.textContent = 'Slide the pigments until your mix matches the swatch. Only the ratio counts, and the triangle shows where your mix sits.';
    render(); hud();
  }
  /** The slider action: set one pigment amount (0 to 100). */
  function setAmount(i: number, v: number): void { if (ctx.finished || adv >= 0) return; w[i] = Math.max(0, Math.min(100, Math.round(v))); render(); }
  /** Submit the mix for judging. */
  function submit(): void {
    if (ctx.finished || adv >= 0) return;
    const m = blend(w); if (!m) return;
    const t = blend(tw)!, d = dist(m, t), tol = ROUNDS[round];
    if (d <= tol) { score += 200 + tries * 100 + Math.round((tol - d) * 5); ctx.sfx('good'); adv = 0; note.textContent = `Matched! ${Math.round(100 - d / 3)}% close.`; render(); hud(); return; }
    tries--; misses.push(w.slice()); ctx.sfx('bad');
    const dl = lum(m) - lum(t), redder = (m[0] - (m[1] + m[2]) / 2) - (t[0] - (t[1] + t[2]) / 2);
    const hint = Math.abs(dl) > Math.abs(redder) * 0.6 && Math.abs(dl) > 10 ? (dl > 0 ? 'Too light: add soot or cochineal.' : 'Too dark: add bone.') : redder > 0 ? 'Too red: add bone or soot.' : 'Not red enough: add cochineal.';
    note.textContent = `${Math.round(100 - d / 3)}% close, need within ${Math.round(100 - tol / 3)}%. ${hint}`;
    render(); hud();
    if (tries <= 0) ctx.finish({ result: 'lose', score, title: 'The sunset got away', detail: `Three misses on swatch ${round + 1}. Compare the swatches, then adjust one pigment at a time.` });
  }
  function update(dt: number): void {
    if (adv < 0 || ctx.finished) return;
    adv += dt;
    if (adv > 1) { round++; if (round >= ROUNDS.length) { round = ROUNDS.length - 1; adv = -1; ctx.finish({ result: 'win', score, title: 'Every sunset matched', detail: 'Four swatches matched, each tighter than the last.' }); } else build(); }
  }
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; score = 0; build(); },
    probe: () => ({ round, tries, w: w.join(','), score }),
    play(kind: Result) {
      for (let guard = 0; guard < 400 && !ctx.finished; guard++) {
        if (adv >= 0) { update(1 / 60); continue; }
        if (kind === 'win') tw.forEach((v, i) => setAmount(i, v));
        else { const t = blend(tw)!; let far = [100, 0, 0], fd = -1; for (const c of [[100, 0, 0], [0, 100, 0], [0, 0, 100]]) { const d = dist(blend(c)!, t); if (d > fd) { fd = d; far = c; } } far.forEach((v, i) => setAmount(i, v)); }
        submit();
      }
    },
  };
}
