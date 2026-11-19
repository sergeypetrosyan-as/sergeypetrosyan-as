import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Star Wander: hop along the star lanes. Trace the shape on a star chart exactly to reveal the constellation. */
const COLS = 5, ROWS = 5, SP = 80, W = 400, HOPS = 40;
const NAMES = ['the Lasso', 'the Rattler', 'the Spur', 'the Canteen', 'the Saddle'];
interface Fig { path: number[]; name: string; done: boolean }

export default function starWander(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let px: number[] = [], py: number[] = [], adj: number[][] = [], figs: Fig[] = [], pos = 0, trail: number[] = [], hops = 0, score = 0;

  const svg = h('svg', { class: 'sw-svg', viewBox: `0 0 ${W} ${W}`, role: 'group', 'aria-label': 'Night sky of stars' });
  const charts = h('div', { class: 'sw-charts' });
  const note = h('p', { class: 'mw-note sw-note', role: 'status' });
  const style = h('style', null, `
    .sw-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;max-width:440px;margin:auto}
    .sw-svg{width:100%;height:auto;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised);touch-action:manipulation}
    .sw-star{cursor:pointer;fill:transparent}
    .sw-star:focus{outline:none;stroke:var(--mw-rose);stroke-width:3}
    .sw-charts{display:flex;gap:8px;width:100%;justify-content:center}
    .sw-card{flex:1;max-width:136px;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 4px;border:2px dashed var(--mw-mesa);border-radius:8px;background:var(--mw-night);font:600 .8rem var(--mw-font-slab);color:var(--mw-smoke);text-align:center}
    .sw-card.done{border:2px solid var(--mw-rose);color:var(--mw-bone);background:var(--mw-wine)}
    .sw-card svg{width:100%;height:46px}
    .sw-note{text-align:center;min-height:2.4em}
    .sw-name{font:700 15px var(--mw-font-slab);fill:var(--mw-rose);paint-order:stroke;stroke:var(--mw-night);stroke-width:4px}
  `);
  ctx.root.append(style, h('div', { class: 'sw-wrap' }, svg, charts, note));

  function make(): void {
    for (;;) {
      px = []; py = []; adj = [];
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) { px.push(40 + c * SP + (rand() - 0.5) * 26); py.push(40 + r * SP + (rand() - 0.5) * 26); }
      adj = px.map(() => []);
      for (let i = 0; i < px.length; i++) for (let j = i + 1; j < px.length; j++) {
        const d = Math.hypot(px[i] - px[j], py[i] - py[j]);
        const diag = Math.abs((i % COLS) - (j % COLS)) === 1 && Math.abs(((i / COLS) | 0) - ((j / COLS) | 0)) === 1;
        if (d < SP * 1.22 || (diag && rand() < 0.28)) { adj[i].push(j); adj[j].push(i); }
      }
      const seen = new Set([0]), q = [0];
      while (q.length) for (const k of adj[q.pop()!]) if (!seen.has(k)) { seen.add(k); q.push(k); }
      if (seen.size < px.length) continue;
      const names = shuffle(rand, NAMES);
      figs = [];
      for (const len of [4, 5, 5]) {
        let path: number[] | null = null;
        for (let t = 0; t < 60 && !path; t++) {
          const w = [Math.floor(rand() * px.length)];
          while (w.length < len) { const nx = adj[w[w.length - 1]].filter((k) => !w.includes(k)); if (!nx.length) break; w.push(nx[Math.floor(rand() * nx.length)]); }
          const bend = w.length === len && w.some((_, i) => i > 1 && Math.abs((px[w[i]] - px[w[i - 1]]) * (py[w[i - 1]] - py[w[i - 2]]) - (py[w[i]] - py[w[i - 1]]) * (px[w[i - 1]] - px[w[i - 2]])) > 1500);
          const edges = (p: number[]): string[] => p.slice(1).map((v, i) => [p[i], v].sort().join('-'));
          const clash = figs.some((f) => edges(f.path).some((e) => edges(w).includes(e)));
          if (bend && !clash) path = w;
        }
        if (!path) break;
        figs.push({ path, name: names[figs.length], done: false });
      }
      if (figs.length === 3) return;
    }
  }
  const same = (a: number[], b: number[]): boolean => a.length === b.length && (a.every((v, i) => v === b[i]) || a.every((v, i) => v === b[b.length - 1 - i]));

  function draw(): void {
    svg.replaceChildren();
    const done = new Set<number>();
    figs.filter((f) => f.done).forEach((f) => f.path.forEach((p) => done.add(p)));
    for (let i = 0; i < px.length; i++) for (const j of adj[i]) if (j > i) svg.append(h('line', { x1: px[i], y1: py[i], x2: px[j], y2: py[j], stroke: 'var(--mw-ember)', 'stroke-width': 2, 'stroke-dasharray': '3 6', 'stroke-linecap': 'round' }));
    for (const f of figs) if (f.done) svg.append(h('polyline', { points: f.path.map((p) => `${px[p]},${py[p]}`).join(' '), fill: 'none', stroke: 'var(--mw-rose)', 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    const tr = trail.slice(-7);
    if (tr.length > 1) svg.append(h('polyline', { points: tr.map((p) => `${px[p]},${py[p]}`).join(' '), fill: 'none', stroke: 'var(--mw-bone)', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.85 }));
    for (const f of figs) if (f.done) { const p = f.path[0]; svg.append(h('text', { class: 'sw-name', x: Math.min(Math.max(px[p], 50), W - 50), y: py[p] - 16, 'text-anchor': 'middle' }, f.name[0].toUpperCase() + f.name.slice(1))); }
    for (let i = 0; i < px.length; i++) {
      const reach = adj[pos].includes(i), here = i === pos;
      svg.append(h('circle', { cx: px[i], cy: py[i], r: here ? 9 : done.has(i) ? 8 : 6, fill: done.has(i) ? 'var(--mw-rose)' : 'var(--mw-bone)', stroke: here ? 'var(--mw-rose)' : 'none', 'stroke-width': 3, opacity: here || reach || done.has(i) ? 1 : 0.8 }));
      if (reach) svg.append(h('circle', { cx: px[i], cy: py[i], r: 14, fill: 'none', stroke: 'var(--mw-bone)', 'stroke-width': 1.6, 'stroke-dasharray': '3 3' }));
      if (here) svg.append(h('circle', { cx: px[i], cy: py[i], r: 17, fill: 'none', stroke: 'var(--mw-bone)', 'stroke-width': 2 }));
      const hit = h('circle', { class: 'sw-star', cx: px[i], cy: py[i], r: 24, tabindex: reach ? 0 : -1, role: 'button', 'aria-label': `Star ${i + 1}${here ? ', you are here' : reach ? ', hop here' : ''}`, 'data-star': i, 'data-reach': reach ? '1' : '0' });
      hit.addEventListener('pointerdown', (e) => { e.preventDefault(); hop(i); });
      hit.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hop(i); } });
      svg.append(hit);
    }
    charts.replaceChildren(...figs.map((f) => {
      const xs = f.path.map((p) => px[p]), ys = f.path.map((p) => py[p]);
      const x0 = Math.min(...xs), y0 = Math.min(...ys), sc = Math.min(120 / Math.max(1, Math.max(...xs) - x0), 40 / Math.max(1, Math.max(...ys) - y0), 1.4);
      const pts = f.path.map((p) => `${(px[p] - x0) * sc + 8},${(py[p] - y0) * sc + 4}`).join(' ');
      return h('div', { class: 'sw-card' + (f.done ? ' done' : ''), 'aria-label': `Chart: ${f.done ? f.name + ', found' : 'unknown shape'}` },
        h('svg', { viewBox: '0 0 140 50', 'aria-hidden': 'true' }, h('polyline', { points: pts, fill: 'none', stroke: f.done ? 'var(--mw-rose)' : 'var(--mw-bone)', 'stroke-width': 2.4, 'stroke-dasharray': f.done ? '' : '4 3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })),
        f.done ? `★ ${f.name}` : 'Find this shape');
    }));
    ctx.hud('Hops left', HOPS - hops); ctx.hud('Charts', `${figs.filter((f) => f.done).length}/3`); ctx.hud('Score', score);
  }

  /** The one player action: hop to a neighbouring star. */
  function hop(i: number): void {
    if (ctx.finished || !adj[pos].includes(i) || hops >= HOPS) return;
    pos = i; trail.push(i); hops++; ctx.sfx('tap');
    for (const f of figs) {
      if (f.done) continue;
      if (trail.length >= f.path.length && same(trail.slice(-f.path.length), f.path)) {
        f.done = true; score += 300 + (HOPS - hops) * 5; ctx.sfx('good'); note.textContent = `You traced ${f.name}. Chart collected.`;
      }
    }
    draw();
    if (figs.every((f) => f.done)) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'The sky is charted', detail: `All three constellations traced with ${HOPS - hops} hops to spare.` }); }
    else if (hops >= HOPS) ctx.finish({ result: 'lose', score, title: 'Dawn breaks', detail: `Out of hops with ${figs.filter((f) => !f.done).length} constellation(s) still hidden.` });
  }
  const route = (from: number, to: number): number[] => {
    const prev = new Map<number, number>([[from, -1]]), q = [from];
    while (q.length) { const k = q.shift()!; for (const n of adj[k]) if (!prev.has(n)) { prev.set(n, k); q.push(n); } }
    const out: number[] = []; for (let k = to; k !== from; k = prev.get(k)!) out.unshift(k);
    return out;
  };

  return {
    destroy() { /* released by the shell */ },
    reset(seed) {
      rand = makeRng(seed); make(); score = 0; hops = 0; pos = Math.floor(rand() * px.length); trail = [pos];
      note.textContent = 'Hop along the dotted lanes. Trace one of the chart shapes exactly, start to end, to reveal it in the sky.'; draw();
    },
    probe: () => ({ pos, hops, found: figs.filter((f) => f.done).length, score }),
    play(kind: Result) {
      if (kind === 'lose') { const a = pos, b = adj[pos][0]; for (let g = 0; g < HOPS + 2 && !ctx.finished; g++) hop(g % 2 ? a : b); return; }
      for (const f of figs) {
        if (f.done) continue;
        for (const k of route(pos, f.path[0])) hop(k);
        f.path.slice(1).forEach((k) => hop(k));
      }
    },
  };
}
