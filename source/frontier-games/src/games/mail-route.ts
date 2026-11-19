import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Mail Route: visit every post office and ride home to the depot before dusk. The sun arc shows the distance left. */
const W = 360, H = 300, COUNT = 8;
interface Pt { x: number; y: number }

export default function mailRoute(ctx: Ctx): Instance {
  let pts: Pt[] = [], route: number[] = [], used = 0, budget = 0, best = 0, bestOrder: number[] = [];
  const dist = (a: number, b: number): number => Math.round(Math.hypot(pts[a].x - pts[b].x, pts[a].y - pts[b].y) / 4);
  const svg = h('svg', { viewBox: `0 0 ${W} ${H}`, class: 'mr-map', role: 'group', 'aria-label': 'Map of post offices' }) as unknown as SVGSVGElement;
  const note = h('p', { class: 'mw-note', role: 'status' });
  const undo = h('button', { class: 'mw-btn', type: 'button', 'data-undo': '', onclick: () => back() }, 'Undo last leg');
  const style = h('style', null, `
    .mr{width:100%;max-width:min(560px,70vh);display:flex;flex-direction:column;gap:8px;align-items:center}
    .mr-map{width:100%;height:auto;border:2px solid var(--mw-saddle);border-radius:10px;background:var(--mw-night);touch-action:manipulation}
    .mr-stop{cursor:pointer}
    .mr-stop:focus-visible circle.ring{stroke:var(--mw-bone);stroke-width:3}
    .mr-d{font:600 11px var(--mw-font-slab);fill:var(--mw-bone);paint-order:stroke;stroke:var(--mw-night);stroke-width:3px}
    .mr-n{font:700 13px var(--mw-font-slab);fill:var(--mw-ink);text-anchor:middle}
  `);
  ctx.root.append(style, h('div', { class: 'mr' }, svg, h('div', { class: 'mw-row' }, undo), note));

  const cur = (): number => route[route.length - 1];
  const visited = (i: number): boolean => route.includes(i);
  const allDone = (): boolean => pts.every((_, i) => visited(i));

  function draw(): void {
    svg.replaceChildren();
    // dusk arc: the sun sinks along it as the distance budget is spent
    const f = Math.min(1, used / budget), a = Math.PI * (1 - f);
    svg.append(h('path', { d: 'M20 96 A160 64 0 0 1 340 96', fill: 'none', stroke: 'var(--mw-ember)', 'stroke-width': 1.4, 'stroke-dasharray': '3 5' }));
    const sx = 180 + Math.cos(a) * 160, sy = 96 - Math.sin(a) * 64;
    svg.append(h('circle', { cx: sx, cy: sy, r: 9, fill: f > 0.85 ? 'var(--mw-red)' : 'var(--mw-bone)', stroke: 'var(--mw-ember)', 'stroke-width': 2 }),
      h('path', { d: 'M0 296 L0 282 L40 282 L50 270 L90 270 L100 282 L140 282 L150 276 L210 276 L220 284 L360 284 L360 296 Z', fill: 'var(--mw-umber)', opacity: 0.8 }));
    route.slice(1).forEach((r, i) => svg.append(h('line', { x1: pts[route[i]].x, y1: pts[route[i]].y, x2: pts[r].x, y2: pts[r].y, stroke: 'var(--mw-bone)', 'stroke-width': 3, 'stroke-linecap': 'round' })));
    const here = cur();
    pts.forEach((p, i) => {
      const depot = i === 0, done = visited(i), go = !done || (depot && allDone() && here !== 0);
      const g = h('g', { class: go ? 'mr-stop' : '', transform: `translate(${p.x} ${p.y})`, ...(go ? { role: 'button', tabindex: 0, 'data-stop': i, 'aria-label': depot ? 'Ride home to the depot' : `Post office ${i}, ${dist(here, i)} miles` } : {}) });
      if (go) { g.addEventListener('click', () => go_(i)); g.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go_(i); } }); }
      g.append(h('circle', { r: 22, fill: 'transparent' }));
      if (depot) g.append(h('rect', { x: -13, y: -13, width: 26, height: 26, rx: 4, fill: here === 0 ? 'var(--mw-bone)' : 'var(--mw-tan)', stroke: 'var(--mw-bone)', 'stroke-width': 2, class: 'ring' }), h('text', { class: 'mr-n', y: 5 }, 'D'));
      else g.append(h('circle', { r: 13, class: 'ring', fill: done ? 'var(--mw-saddle)' : 'var(--mw-rose)', stroke: 'var(--mw-bone)', 'stroke-width': here === i ? 4 : 2 }), done ? h('path', { d: 'M-6 0 L-2 5 L6 -5', fill: 'none', stroke: 'var(--mw-bone)', 'stroke-width': 3 }) : h('text', { class: 'mr-n', y: 5 }, String(i)));
      svg.append(g);
      if (go && i !== here) svg.append(h('line', { x1: p.x, y1: p.y, x2: pts[here].x, y2: pts[here].y, stroke: 'var(--mw-tan)', 'stroke-width': 1, 'stroke-dasharray': '3 5', opacity: 0.45, 'pointer-events': 'none' }), h('text', { class: 'mr-d', 'pointer-events': 'none', x: (p.x + pts[here].x) / 2, y: (p.y + pts[here].y) / 2, 'text-anchor': 'middle' }, String(dist(here, i))));
    });
    ctx.hud('Miles', `${used}/${budget}`); ctx.hud('Stops', `${route.filter((r) => r !== 0).length}/${COUNT - 1}`);
    (undo as HTMLButtonElement).disabled = route.length < 2 || ctx.finished;
  }
  /** The one action: ride to post office (or home) `i`. */
  function go_(i: number): void {
    if (ctx.finished || i === cur()) return;
    if (visited(i) && !(i === 0 && allDone())) return;
    used += dist(cur(), i); route.push(i); ctx.sfx('tap'); draw();
    if (used > budget) { ctx.finish({ result: 'lose', score: 0, title: 'Dusk catches the rider', detail: `You ran ${used - budget} miles past the day's ${budget}.` }); return; }
    if (i === 0 && allDone()) {
      const stars = used <= best * 1.08 ? 3 : used <= best * 1.25 ? 2 : 1;
      ctx.sfx('win');
      ctx.finish({ result: 'win', score: Math.round((1000 * best) / used) + stars * 50, title: `Route ridden: ${stars} of 3 stars`, detail: `${used} miles. The shortest loop is ${best}. ${stars} of 3 stars.` });
    }
  }
  function back(): void { if (ctx.finished || route.length < 2) return; used -= dist(route[route.length - 2], cur()); route.pop(); ctx.sfx('tick'); draw(); }

  function bestTour(): void {
    const rest = pts.map((_, i) => i).slice(1); best = Infinity;
    const walk = (order: number[], left: number[], d: number): void => {
      if (d >= best) return;
      if (!left.length) { const t = d + dist(order[order.length - 1], 0); if (t < best) { best = t; bestOrder = order.slice(1); } return; }
      left.forEach((n, k) => walk([...order, n], left.filter((_, j) => j !== k), d + dist(order[order.length - 1], n)));
    };
    walk([0], rest, 0);
  }

  return {
    destroy() { /* released by the shell */ },
    reset(seed) {
      const rand = makeRng(seed);
      for (let t = 0; t < 200; t++) {
        pts = [];
        for (let k = 0; k < 600 && pts.length < COUNT; k++) {
          const p = { x: 30 + rand() * (W - 60), y: 112 + rand() * (H - 170) };
          if (pts.every((q) => Math.hypot(p.x - q.x, p.y - q.y) > 54)) pts.push(p);
        }
        if (pts.length === COUNT) break;
      }
      pts = shuffle(rand, pts); bestTour();
      budget = Math.round(best * 1.28); route = [0]; used = 0;
      note.textContent = 'Tap the next post office to ride there. Visit all seven, then ride home to the depot D. The sun sinks as you spend miles.';
      draw();
    },
    probe: () => ({ route: route.join(''), used }),
    play(kind) {
      if (kind === 'win') { for (const n of [...bestOrder, 0]) go_(n); return; }
      let guard = 0;
      while (!ctx.finished && guard++ < 40) {
        const far = pts.map((_, i) => i).filter((i) => !visited(i)).sort((a, b) => dist(cur(), b) - dist(cur(), a))[0];
        go_(far ?? 0);
        if (far === undefined) break;
      }
    },
  };
}
