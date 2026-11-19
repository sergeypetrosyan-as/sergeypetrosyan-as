import { h } from '../core/dom';
import { makeRng, rint, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Moonbeam Mirrors: rotate the mirrors so the moonbeam reaches every lantern before your turns run out. */
const LEVELS = [
  { n: 5, mirrors: 3, lanterns: 2, prisms: 0 },
  { n: 6, mirrors: 5, lanterns: 3, prisms: 1 },
  { n: 6, mirrors: 6, lanterns: 4, prisms: 1 },
];
const S = 64; // cell size in svg units
type Kind = 'm' | 'p' | 'l'; // mirror, prism, lantern
interface Item { kind: Kind; x: number; y: number; flip: boolean }

export default function moonbeamMirrors(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let lvl = 0, score = 0, turns = 0, row = 0, items: Item[] = [], answer: boolean[] = [], lit = new Set<string>(), segs: number[][] = [];
  const N = (): number => LEVELS[lvl].n;

  const svg = h('svg', { class: 'mm-svg', role: 'group', 'aria-label': 'Mirror board' });
  const note = h('p', { class: 'mw-note mm-note', role: 'status' });
  const style = h('style', null, `
    .mm-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:440px;margin:auto}
    .mm-svg{width:100%;height:auto;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised);touch-action:manipulation}
    .mm-hit{fill:transparent;cursor:pointer}
    .mm-hit:focus{outline:none;stroke:var(--mw-rose);stroke-width:3}
    .mm-note{text-align:center;min-height:2.4em}
  `);
  ctx.root.append(style, h('div', { class: 'mm-wrap' }, svg, note));

  const key = (x: number, y: number): string => x + ',' + y;
  const at = (x: number, y: number): Item | undefined => items.find((it) => it.x === x && it.y === y);

  function trace(): void {
    const n = N(), seen = new Set<string>(); lit = new Set(); segs = [];
    const stack = [[0, row, 1, 0]];
    while (stack.length) {
      const [x, y, dx, dy] = stack.pop()!;
      if (x < 0 || y < 0 || x >= n || y >= n || seen.has(`${x},${y},${dx},${dy}`)) continue;
      seen.add(`${x},${y},${dx},${dy}`); lit.add(key(x, y));
      const it = at(x, y);
      let outs: number[][] = [[dx, dy]];
      if (it?.kind === 'm') outs = [it.flip ? [-dy, -dx] : [dy, dx]];
      else if (it?.kind === 'p') outs = [[dy, dx], [-dy, -dx]];
      segs.push([x + 0.5 - dx / 2, y + 0.5 - dy / 2, x + 0.5, y + 0.5]);
      for (const [ox, oy] of outs) { segs.push([x + 0.5, y + 0.5, x + 0.5 + ox / 2, y + 0.5 + oy / 2]); stack.push([x + ox, y + oy, ox, oy]); }
    }
  }
  const solved = (): boolean => items.filter((i) => i.kind === 'l').every((l) => lit.has(key(l.x, l.y)));

  function build(): void {
    const { n, mirrors, lanterns, prisms } = LEVELS[lvl];
    for (let tries = 0; tries < 200; tries++) {
      row = rint(rand, 1, n - 2);
      const free = shuffle(rand, Array.from({ length: n * n }, (_, i) => i)).filter((i) => !(i % n === 0 && (i / n | 0) === row));
      items = [];
      let k = 0;
      for (let i = 0; i < mirrors; i++) { const c = free[k++]; items.push({ kind: 'm', x: c % n, y: (c / n) | 0, flip: rand() < 0.5 }); }
      for (let i = 0; i < prisms; i++) { const c = free[k++]; items.push({ kind: 'p', x: c % n, y: (c / n) | 0, flip: false }); }
      trace();
      const cand = shuffle(rand, [...lit].map((s) => s.split(',').map(Number)).filter(([x, y]) => !at(x, y) && !(x === 0 && y === row)));
      if (cand.length < lanterns) continue;
      // Spread lanterns: prefer far from the source column.
      cand.sort((a, b) => b[0] - a[0] + (rand() - 0.5) * 2);
      cand.slice(0, lanterns).forEach(([x, y]) => items.push({ kind: 'l', x, y, flip: false }));
      answer = items.filter((i) => i.kind === 'm').map((m) => m.flip);
      let ok = false;
      for (let s = 0; s < 30 && !ok; s++) { items.filter((i) => i.kind === 'm').forEach((m) => { if (rand() < 0.6) m.flip = !m.flip; }); trace(); ok = !solved(); }
      if (ok) break;
    }
    turns = mirrors * 2 + 2;
    note.textContent = 'Tap a mirror to flip its slant. Light every lantern before the turns run out.';
    draw(); hud();
  }
  function hud(): void { ctx.hud('Night', `${lvl + 1}/${LEVELS.length}`); ctx.hud('Turns', turns); ctx.hud('Score', score); }

  function draw(): void {
    const n = N(), W = S * (n + 1);
    svg.setAttribute('viewBox', `0 0 ${W} ${S * n}`);
    svg.replaceChildren();
    const g = (x: number, y: number): [number, number] => [(x + 1.5) * S, (y + 0.5) * S];
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) svg.append(h('rect', { x: (x + 1) * S + 2, y: y * S + 2, width: S - 4, height: S - 4, rx: 6, fill: 'var(--mw-night)', stroke: 'var(--mw-mesa)', 'stroke-width': 1 }));
    // moon source
    const [mx, my] = g(-1, row);
    svg.append(h('circle', { cx: mx, cy: my, r: 20, fill: 'var(--mw-bone)', stroke: 'var(--mw-ember)', 'stroke-width': 2 }), h('circle', { cx: mx - 7, cy: my - 5, r: 4, fill: 'var(--mw-tan)', opacity: 0.6 }));
    svg.append(h('line', { x1: mx + 20, y1: my, x2: S, y2: my, stroke: 'var(--mw-bone)', 'stroke-width': 4, 'stroke-linecap': 'round' }));
    for (const [a, b, c, d] of segs) svg.append(h('line', { x1: (a + 1) * S, y1: b * S, x2: (c + 1) * S, y2: d * S, stroke: 'var(--mw-bone)', 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.95 }));
    for (const it of items) {
      const [cx, cy] = g(it.x, it.y);
      if (it.kind === 'l') {
        const on = lit.has(key(it.x, it.y));
        svg.append(h('polygon', { points: `${cx},${cy - 20} ${cx + 15},${cy} ${cx},${cy + 20} ${cx - 15},${cy}`, fill: on ? 'var(--mw-rose)' : 'var(--mw-night)', stroke: on ? 'var(--mw-bone)' : 'var(--mw-rose)', 'stroke-width': 3 }));
        svg.append(h('line', { x1: cx, y1: cy - 20, x2: cx, y2: cy - 27, stroke: 'var(--mw-rose)', 'stroke-width': 3, 'stroke-linecap': 'round' }));
        if (on) svg.append(h('circle', { cx, cy, r: 4, fill: 'var(--mw-bone)' }));
      } else if (it.kind === 'p') {
        svg.append(h('polygon', { points: `${cx},${cy - 20} ${cx + 19},${cy + 15} ${cx - 19},${cy + 15}`, fill: 'var(--mw-wine)', stroke: 'var(--mw-rose)', 'stroke-width': 3 }));
      } else {
        const a = it.flip ? 1 : -1;
        svg.append(h('line', { x1: cx - 21, y1: cy + 21 * a, x2: cx + 21, y2: cy - 21 * a, stroke: 'var(--mw-tan)', 'stroke-width': 8, 'stroke-linecap': 'round' }));
        svg.append(h('line', { x1: cx - 21, y1: cy + 21 * a, x2: cx + 21, y2: cy - 21 * a, stroke: 'var(--mw-bone)', 'stroke-width': 2.5, 'stroke-linecap': 'round' }));
        const hit = h('rect', { class: 'mm-hit', x: cx - S / 2, y: cy - S / 2, width: S, height: S, tabindex: 0, role: 'button', 'aria-label': `Mirror ${it.x + 1},${it.y + 1}, slant ${it.flip ? 'rising' : 'falling'}`, 'data-mirror': '' });
        hit.addEventListener('pointerdown', (e) => { e.preventDefault(); rotate(it); });
        hit.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rotate(it); } });
        svg.append(hit);
      }
    }
  }
  /** The one player action: flip a mirror. */
  function rotate(m: Item): void {
    if (ctx.finished || m.kind !== 'm' || turns <= 0) return;
    m.flip = !m.flip; turns--; trace(); ctx.sfx('tap');
    if (solved()) {
      score += 300 + turns * 20; ctx.sfx('good');
      if (lvl + 1 >= LEVELS.length) { draw(); hud(); ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'Every lantern burns', detail: 'The moonbeam reached all the lanterns on three nights.' }); return; }
      lvl++; build(); return;
    }
    draw(); hud();
    if (turns <= 0) ctx.finish({ result: 'lose', score, title: 'The moon sets', detail: `Out of turns on night ${lvl + 1} with ${items.filter((i) => i.kind === 'l' && !lit.has(key(i.x, i.y))).length} lantern(s) dark.` });
  }

  return {
    destroy() { /* released by the shell */ },
    reset(seed) { rand = makeRng(seed); lvl = 0; score = 0; build(); },
    probe: () => ({ lvl, turns, score, lit: lit.size, flips: items.filter((i) => i.kind === 'm').map((m) => +m.flip).join('') }),
    play(kind: Result) {
      for (let g = 0; g < 200 && !ctx.finished; g++) {
        const ms = items.filter((i) => i.kind === 'm');
        if (kind === 'win') { const i = ms.findIndex((m, k) => m.flip !== answer[k]); if (i >= 0) rotate(ms[i]); else break; continue; }
        const safe = ms.find((m) => { m.flip = !m.flip; trace(); const s = solved(); m.flip = !m.flip; trace(); return !s; });
        rotate(safe ?? ms[0]);
      }
    },
  };
}
