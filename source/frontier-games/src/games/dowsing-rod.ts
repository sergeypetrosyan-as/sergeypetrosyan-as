import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Dowsing Rod: a spring is buried in an 8x8 field. Each probe draws a ring whose radius is the exact distance to the spring. Find it in 6 probes. */
const N = 8, PROBES = 6;
const warmth = (d: number) => (d <= 1.5 ? 'Scorching' : d <= 3 ? 'Warm' : d <= 5 ? 'Cool' : 'Cold');
const NS = 'http://www.w3.org/2000/svg';

export default function dowsingRod(ctx: Ctx): Instance {
  let spring = { x: 0, y: 0 };
  let probes: { x: number; y: number; d: number }[] = [];

  const style = h('style', null, `
    .dr{width:100%;max-width:380px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .dr-board{position:relative;width:100%;aspect-ratio:1;border:3px solid var(--mw-ember);border-radius:8px;background:var(--mw-umber);overflow:hidden}
    .dr-board svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
    .dr-cells{position:absolute;inset:0;display:grid;grid-template-columns:repeat(${N},1fr);grid-template-rows:repeat(${N},1fr)}
    .dr-c{border:0;background:transparent;padding:0;cursor:pointer;color:var(--mw-ink);font:700 1rem var(--mw-font-slab);display:grid;place-items:center}
    .dr-c:hover{background:color-mix(in srgb,var(--mw-bone) 14%,transparent)}
    .dr-c b{width:26px;height:26px;border-radius:50%;background:var(--mw-bone);display:grid;place-items:center;border:2px solid var(--mw-ink)}
    .dr-c.win b{background:var(--mw-rose);border-color:var(--mw-red)}
    .dr-log{width:100%;display:grid;grid-template-columns:repeat(2,1fr);gap:4px 10px;font:600 .88rem var(--mw-font-slab);color:var(--mw-bone)}
    .dr-log span{padding:4px 8px;border:1px solid var(--mw-mesa);border-radius:6px;background:var(--mw-night)}
    .dr-log em{font-style:normal;color:var(--mw-rose)}
  `);
  const svg = h('svg', { viewBox: `0 0 ${N} ${N}`, 'aria-hidden': 'true' });
  const cells = h('div', { class: 'dr-cells' });
  const log = h('div', { class: 'dr-log', 'aria-live': 'polite' });
  const note = h('p', { class: 'mw-note' });
  ctx.root.append(style, h('div', { class: 'dr' }, h('div', { class: 'dr-board' }, svg, cells), log, note));

  const btns: HTMLButtonElement[] = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const b = h('button', { class: 'dr-c', type: 'button', 'data-cell': `${x},${y}`, 'aria-label': `Probe column ${x + 1}, row ${y + 1}`, onclick: () => probe(x, y) }) as HTMLButtonElement;
    btns.push(b); cells.append(b);
  }
  const ring = (cx: number, cy: number, r: number, cls: string) => {
    const e = document.createElementNS(NS, 'circle');
    e.setAttribute('cx', String(cx + 0.5)); e.setAttribute('cy', String(cy + 0.5)); e.setAttribute('r', String(r));
    e.setAttribute('fill', 'none'); e.setAttribute('stroke', cls); e.setAttribute('stroke-width', '0.07'); e.setAttribute('stroke-dasharray', '0.25 0.15');
    return e;
  };
  function render(): void {
    svg.replaceChildren();
    for (let i = 1; i < N; i++) {
      for (const [a, b, c, d] of [[i, 0, i, N], [0, i, N, i]]) {
        const l = document.createElementNS(NS, 'line');
        l.setAttribute('x1', String(a)); l.setAttribute('y1', String(b)); l.setAttribute('x2', String(c)); l.setAttribute('y2', String(d));
        l.setAttribute('stroke', ctx.c.mesa); l.setAttribute('stroke-width', '0.03'); l.setAttribute('opacity', '0.6');
        svg.append(l);
      }
    }
    probes.forEach((p) => svg.append(ring(p.x, p.y, p.d, p.d <= 0 ? ctx.c.rose : ctx.c.tan)));
    btns.forEach((b, i) => {
      const x = i % N, y = Math.floor(i / N), k = probes.findIndex((p) => p.x === x && p.y === y);
      b.replaceChildren(...(k >= 0 ? [h('b', null, probes[k].d === 0 ? '★' : k + 1)] : []));
      b.classList.toggle('win', k >= 0 && probes[k].d === 0);
    });
    log.replaceChildren(...probes.map((p, i) => h('span', null, `${i + 1}. `, h('em', null, warmth(p.d)), ` ${p.d.toFixed(1)}`)));
    ctx.hud('Probes left', PROBES - probes.length);
    note.textContent = probes.length ? 'The spring lies on every ring. Where do the rings cross?' : 'Tap a square to probe it. A ring shows how far the spring is from that square.';
  }
  /** The one player action: probe a square. */
  function probe(x: number, y: number): void {
    if (ctx.finished || probes.some((p) => p.x === x && p.y === y)) return;
    const d = Math.hypot(x - spring.x, y - spring.y);
    probes.push({ x, y, d }); ctx.sfx(d === 0 ? 'win' : 'tap'); render();
    if (d === 0) ctx.finish({ result: 'win', score: (PROBES - probes.length + 1) * 150, title: 'Water struck', detail: `You found the spring with ${probes.length} ${probes.length === 1 ? 'probe' : 'probes'}.` });
    else if (probes.length >= PROBES) ctx.finish({ result: 'lose', score: 0, title: 'The well runs dry', detail: `The spring was in column ${spring.x + 1}, row ${spring.y + 1}.` });
  }

  return {
    destroy() {},
    reset(seed) { const r = makeRng(seed); spring = { x: rint(r, 0, N - 1), y: rint(r, 0, N - 1) }; probes = []; render(); },
    probe: () => ({ probes: probes.map((p) => [p.x, p.y, +p.d.toFixed(2)]) }),
    play(kind) {
      if (kind === 'win') {
        // Triangulate honestly: probe three corners, then the only cell that matches all three distances.
        for (const [x, y] of [[0, 0], [N - 1, 0], [0, N - 1]]) if (!ctx.finished && !(x === spring.x && y === spring.y)) probe(x, y);
        for (let y = 0; y < N && !ctx.finished; y++) for (let x = 0; x < N && !ctx.finished; x++)
          if (probes.every((p) => Math.abs(Math.hypot(x - p.x, y - p.y) - p.d) < 1e-9)) probe(x, y);
      } else {
        for (let y = 0; y < N && !ctx.finished; y++) for (let x = 0; x < N && !ctx.finished; x++) if (!(x === spring.x && y === spring.y)) probe(x, y);
      }
    },
  };
}
