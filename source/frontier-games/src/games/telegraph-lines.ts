import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Telegraph Lines: wire every town together. Tap two towns to string wire between them; longer wire costs more. Run dry before everyone is linked and the line is dead. */
const MAPS = [{ n: 6, slack: 0.22 }, { n: 7, slack: 0.14 }, { n: 8, slack: 0.08 }];
const NAMES = 'ABCDEFGH';
const W = 320;
type Pt = { x: number; y: number };

export default function telegraphLines(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let level = 1, score = 0, funds = 0, budget = 0, sel = -1, towns: Pt[] = [], wires: [number, number][] = [];

  const style = h('style', null, `
    .tl{width:100%;max-width:420px;display:flex;flex-direction:column;align-items:center;gap:10px}
    .tl-map{width:100%;aspect-ratio:1;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-night);touch-action:manipulation}
    .tl-map .wire{stroke:var(--mw-tan);stroke-width:4;stroke-linecap:round}
    .tl-map .cand{stroke:var(--mw-rose);stroke-width:1.5;stroke-dasharray:4 4;opacity:.8}
    .tl-map .pill{fill:var(--mw-ink);stroke:var(--mw-ember);stroke-width:1.5}
    .tl-map text{font:700 12px var(--mw-font-slab);text-anchor:middle;dominant-baseline:central;fill:var(--mw-bone)}
    .tl-map .house{fill:var(--mw-saddle);stroke:var(--mw-bone);stroke-width:2.5}
    .tl-map .house.sel{fill:var(--mw-red);stroke:var(--mw-rose)}
    .tl-map .linked .house{fill:var(--mw-wine)}
    .tl-map g[data-town]{cursor:pointer}
    .tl-map .lab{font-size:13px}
    .tl-row{display:flex;gap:8px;width:100%}
    .tl-row .mw-btn{flex:1;min-height:48px}
  `);
  const svg = h('svg', { class: 'tl-map', viewBox: `0 0 ${W} ${W}`, role: 'group', 'aria-label': 'Map of towns' });
  const note = h('p', { class: 'mw-note', role: 'status' });
  const undoBtn = h('button', { class: 'mw-btn', type: 'button', 'data-undo': '', onclick: () => undo() }, 'Undo last wire');
  ctx.root.append(style, h('div', { class: 'tl' }, svg, note, h('div', { class: 'tl-row' }, undoBtn)));

  const cost = (a: number, b: number): number => Math.max(1, Math.round(Math.hypot(towns[a].x - towns[b].x, towns[a].y - towns[b].y) / 12));
  const has = (a: number, b: number): boolean => wires.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  const pairs = (): [number, number][] => { const o: [number, number][] = []; for (let i = 0; i < towns.length; i++) for (let j = i + 1; j < towns.length; j++) o.push([i, j]); return o; };
  /** Cheapest extra wire still needed to join every town, given what is already built. */
  function need(): { total: number; edges: [number, number][] } {
    const p = towns.map((_, i) => i); const f = (x: number): number => (p[x] === x ? x : (p[x] = f(p[x])));
    wires.forEach(([a, b]) => { p[f(a)] = f(b); });
    let total = 0; const edges: [number, number][] = [];
    for (const [a, b] of pairs().sort((u, v) => cost(u[0], u[1]) - cost(v[0], v[1]))) if (f(a) !== f(b)) { p[f(a)] = f(b); total += cost(a, b); edges.push([a, b]); }
    return { total, edges };
  }
  function render(): void {
    let s = '<path d="M0 300 L30 280 L60 292 L100 270 L140 290 L200 266 L260 288 L320 270 L320 320 L0 320 Z" fill="var(--mw-umber)" opacity=".45"/>';
    if (sel >= 0) towns.forEach((_, j) => { if (j !== sel && !has(sel, j)) s += `<line class="cand" x1="${towns[sel].x}" y1="${towns[sel].y}" x2="${towns[j].x}" y2="${towns[j].y}"/>`; });
    wires.forEach(([a, b]) => { s += `<line class="wire" x1="${towns[a].x}" y1="${towns[a].y}" x2="${towns[b].x}" y2="${towns[b].y}"/>`; });
    const lab = (a: number, b: number, dash: boolean): string => { const x = (towns[a].x + towns[b].x) / 2, y = (towns[a].y + towns[b].y) / 2; return `<rect class="pill" x="${x - 12}" y="${y - 10}" width="24" height="20" rx="10"${dash ? ' opacity=".9"' : ''}/><text x="${x}" y="${y}">${cost(a, b)}</text>`; };
    if (sel >= 0) towns.forEach((_, j) => { if (j !== sel && !has(sel, j)) s += lab(sel, j, true); });
    wires.forEach(([a, b]) => { s += lab(a, b, false); });
    const linked = (i: number): boolean => wires.some(([a, b]) => a === i || b === i);
    towns.forEach((t, i) => {
      s += `<g data-town="${i}" class="${linked(i) ? 'linked' : ''}" role="button" aria-label="Town ${NAMES[i]}"><circle cx="${t.x}" cy="${t.y}" r="24" fill="transparent"/><path class="house${sel === i ? ' sel' : ''}" d="M${t.x - 13} ${t.y + 11} V${t.y - 3} L${t.x} ${t.y - 14} L${t.x + 13} ${t.y - 3} V${t.y + 11} Z"/><text class="lab" x="${t.x}" y="${t.y + 3}">${NAMES[i]}</text></g>`;
    });
    svg.innerHTML = s;
    (undoBtn as HTMLButtonElement).disabled = !wires.length;
    ctx.hud('Map', `${level}/${MAPS.length}`); ctx.hud('Funds', `${funds}/${budget}`); ctx.hud('Score', score);
  }
  function build(): void {
    const cfg = MAPS[level - 1]; towns = []; wires = []; sel = -1;
    // jittered 3x3 grid: spreads the towns out so the map is never a straight line
    const slots = shuffle(rand, [0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, cfg.n);
    towns = slots.map((s) => ({ x: Math.round(56 + (s % 3) * 104 + (rand() - 0.5) * 50), y: Math.round(50 + Math.floor(s / 3) * 90 + (rand() - 0.5) * 44) }));
    const mst = need().total; budget = funds = mst + Math.max(2, Math.round(mst * cfg.slack));
    note.textContent = 'Tap a town, then another, to string wire. Dashed lines show what each link would cost.';
    render();
  }
  /** The one player action: tap a town; the second tap strings wire to the first. */
  function link(a: number, b: number): void {
    if (ctx.finished || a === b || has(a, b)) return;
    const c = cost(a, b);
    if (c > funds) { ctx.sfx('bad'); note.textContent = `Wire ${NAMES[a]} to ${NAMES[b]} costs ${c}, you have ${funds}.`; return; }
    wires.push([a, b]); funds -= c; sel = -1; ctx.sfx('tap');
    const n = need();
    if (!n.edges.length) {
      score += 200 + funds * 20; ctx.sfx('good');
      if (level >= MAPS.length) { render(); ctx.finish({ result: 'win', score, title: 'Every town on the wire', detail: `All ${MAPS.length} maps connected within budget.` }); return; }
      level++; build(); return;
    }
    note.textContent = `Wired ${NAMES[a]} to ${NAMES[b]} for ${c}.`;
    render();
    if (n.total > funds) ctx.finish({ result: 'lose', score, title: 'Out of wire', detail: `Map ${level}: ${funds} left but ${n.total} needed to link the rest.` });
  }
  function pick(i: number): void {
    if (ctx.finished) return;
    if (sel < 0) { sel = i; ctx.sfx('tick'); render(); } else if (sel === i) { sel = -1; render(); } else link(sel, i);
  }
  function undo(): void {
    const w = wires.pop(); if (!w || ctx.finished) return;
    funds += cost(w[0], w[1]); sel = -1; render();
  }
  ctx.on(svg, 'click', (e: Event) => { const g = (e.target as Element).closest('[data-town]'); if (g) pick(Number(g.getAttribute('data-town'))); });

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); level = 1; score = 0; build(); },
    probe: () => ({ level, funds, sel, wires: wires.length }),
    play(kind) {
      for (let g = 0; g < 60 && !ctx.finished; g++) {
        if (kind === 'win') { const lv = level; for (const [a, b] of need().edges) { if (ctx.finished || level !== lv) break; pick(a); pick(b); } }
        else {
          const cand = pairs().filter(([a, b]) => !has(a, b) && cost(a, b) <= funds).sort((u, v) => cost(v[0], v[1]) - cost(u[0], u[1]));
          if (!cand.length) break;
          pick(cand[0][0]); pick(cand[0][1]);
        }
      }
    },
  };
}
