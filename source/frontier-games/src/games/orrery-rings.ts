import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Orrery Rings: turn nested brass rings so every gap lines up at the top. Each ring also drags one neighbour along. */
const P = 8;                              // positions per ring (45 degrees each)
const ROUNDS = [{ rings: 3, k: 4, slack: 6 }, { rings: 4, k: 6, slack: 5 }, { rings: 4, k: 8, slack: 3 }];
const mod = (a: number): number => ((a % P) + P) % P;

export default function orreryRings(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let round = 0, R = 3, turns = 0, budget = 0, score = 0, adv = -1;
  let raw: number[] = [], link: number[] = [], sign: number[] = [], opt = 0;
  let groups: HTMLElement[] = [];

  const svg = h('svg', { viewBox: '0 0 300 300', class: 'or-svg', role: 'img', 'aria-label': 'Nested rings with gaps' });
  const cards = h('div', { class: 'or-cards' });
  const note = h('p', { class: 'mw-note', role: 'status' });
  const style = h('style', null, `
    .or{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:8px}
    .or-svg{width:100%;max-width:290px}
    .or-ring{transition:transform .25s ease-out;transform-origin:150px 150px}
    .or-cards{width:100%;display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .or-card{border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised);padding:6px 8px;display:flex;flex-direction:column;gap:4px}
    .or-card b{font:700 .95rem var(--mw-font-slab);color:var(--mw-bone)}.or-card small{color:var(--mw-ash);font-size:.78rem;line-height:1.2}
    .or-card .r{display:grid;grid-template-columns:1fr 1fr;gap:6px}.or-card .mw-btn{min-height:44px;padding:0;font-size:1.2rem}
    .or-card.al b::after{content:' - aligned';color:var(--mw-rose);font-size:.8rem}
  `);
  ctx.root.append(style, h('div', { class: 'or' }, svg, cards, note));

  const aligned = (s: number[]): boolean => s.every((v) => mod(v) === 0);
  const apply = (s: number[], i: number, d: number): number[] => { const o = s.slice(); o[i] += d; o[link[i]] += sign[i] * d; return o; };
  function arc(r: number): string {
    const pt = (deg: number): string => `${(150 + r * Math.sin((deg * Math.PI) / 180)).toFixed(1)} ${(150 - r * Math.cos((deg * Math.PI) / 180)).toFixed(1)}`;
    return `M ${pt(24)} A ${r} ${r} 0 1 1 ${pt(336)}`;
  }
  function bfs(start: number[]): number {
    const key = (s: number[]): string => s.map(mod).join(','), seen = new Map<string, number>([[key(start), 0]]);
    let q = [start];
    for (let d = 0; q.length; d++) {
      const nq: number[][] = [];
      for (const s of q) { if (aligned(s)) return d; for (let i = 0; i < R; i++) for (const dir of [-1, 1]) { const n = apply(s, i, dir), k = key(n); if (!seen.has(k)) { seen.set(k, d + 1); nq.push(n); } } }
      q = nq;
    }
    return 99;
  }
  function solve(start: number[]): [number, number][] {
    const key = (s: number[]): string => s.map(mod).join(','), prev = new Map<string, [string, number, number]>([[key(start), ['', 0, 0]]]), by = new Map<string, number[]>([[key(start), start]]);
    let q = [start];
    while (q.length) {
      const nq: number[][] = [];
      for (const s of q) {
        if (aligned(s)) { const out: [number, number][] = []; let k = key(s); while (prev.get(k)![0]) { const [pk, i, d] = prev.get(k)!; out.unshift([i, d]); k = pk; } return out; }
        for (let i = 0; i < R; i++) for (const dir of [-1, 1]) { const n = apply(s, i, dir), k = key(n); if (!prev.has(k)) { prev.set(k, [key(s), i, dir]); by.set(k, n); nq.push(n); } }
      }
      q = nq;
    }
    return [];
  }
  function build(): void {
    const cfg = ROUNDS[round]; R = cfg.rings;
    for (let tries = 0; tries < 200; tries++) {
      link = Array.from({ length: R }, (_, i) => { const opts = [(i + 1) % R, (i + R - 1) % R]; return opts[rint(rand, 0, 1)]; });
      sign = Array.from({ length: R }, () => (rand() < 0.5 ? 1 : -1));
      raw = Array(R).fill(0);
      for (let m = 0; m < cfg.k; m++) raw = apply(raw, rint(rand, 0, R - 1), rand() < 0.5 ? 1 : -1);
      opt = bfs(raw);
      if (opt >= cfg.k - 1 && opt >= 3 && !aligned(raw)) break;
    }
    turns = 0; budget = opt + cfg.slack; adv = -1;
    svg.replaceChildren(
      h('circle', { cx: 150, cy: 150, r: 142, fill: 'none', stroke: 'var(--mw-umber)', 'stroke-width': 1.5, 'stroke-dasharray': '2 5' }),
      h('line', { x1: 150, y1: 150, x2: 150, y2: 4, stroke: 'var(--mw-rose)', 'stroke-width': 2, 'stroke-dasharray': '3 5' }),
      h('polygon', { points: '150,2 156,13 144,13', fill: 'var(--mw-rose)' }),
    );
    groups = [];
    for (let i = 0; i < R; i++) {
      const r = 124 - i * (R === 3 ? 34 : 28), w = R === 3 ? 22 : 19;
      const g = h('g', { class: 'or-ring' });
      g.append(h('path', { d: arc(r), fill: 'none', stroke: 'var(--mw-tan)', 'stroke-width': w, 'stroke-linecap': 'round' }),
        h('path', { d: arc(r), fill: 'none', stroke: 'var(--mw-saddle)', 'stroke-width': 2, 'stroke-dasharray': '1 7' }),
        h('circle', { cx: 150 + r * Math.sin((24 * Math.PI) / 180), cy: 150 - r * Math.cos((24 * Math.PI) / 180), r: 9.5, fill: 'var(--mw-ink)', stroke: 'var(--mw-bone)', 'stroke-width': 1.5 }),
        h('text', { x: 150 + r * Math.sin((24 * Math.PI) / 180), y: 150 - r * Math.cos((24 * Math.PI) / 180) + 4.2, 'text-anchor': 'middle', class: 'or-lbl', fill: 'var(--mw-bone)', style: { font: '700 12px var(--mw-font-slab)' } }, i + 1));
      svg.append(g); groups.push(g);
    }
    svg.append(h('circle', { cx: 150, cy: 150, r: 14, fill: 'var(--mw-night)', stroke: 'var(--mw-ember)', 'stroke-width': 3 }), h('polygon', { points: '150,141 153,148 160,148 154,153 156,160 150,156 144,160 146,153 140,148 147,148', fill: 'var(--mw-rose)' }));
    cards.replaceChildren(...Array.from({ length: R }, (_, i) => h('div', { class: 'or-card', 'data-card': i },
      h('b', null, `Ring ${i + 1}`),
      h('div', { class: 'r' },
        h('button', { class: 'mw-btn', type: 'button', 'data-ring': i, 'data-dir': -1, 'aria-label': `Turn ring ${i + 1} left`, onclick: () => turn(i, -1) }, '↺'),
        h('button', { class: 'mw-btn', type: 'button', 'data-ring': i, 'data-dir': 1, 'aria-label': `Turn ring ${i + 1} right`, onclick: () => turn(i, 1) }, '↻')),
      h('small', null, `Also turns ring ${link[i] + 1} ${sign[i] > 0 ? 'the same way' : 'the other way'}.`))));
    note.textContent = 'Line every gap up under the rose marker at the top. Each turn costs one.';
    paint(); hud();
  }
  function paint(): void {
    groups.forEach((g, i) => { g.style.transform = `rotate(${raw[i] * (360 / P)}deg)`; const l = g.querySelector('.or-lbl') as unknown as HTMLElement; l.style.transformBox = 'fill-box'; l.style.transformOrigin = 'center'; l.style.transition = 'transform .25s ease-out'; l.style.transform = `rotate(${-raw[i] * (360 / P)}deg)`; });
    cards.childNodes.forEach((c, i) => (c as HTMLElement).classList.toggle('al', mod(raw[i]) === 0));
  }
  function hud(): void { ctx.hud('Orrery', `${round + 1}/${ROUNDS.length}`); ctx.hud('Turns left', budget - turns); ctx.hud('Score', score); }
  /** The one action: turn ring i one notch (d = -1 left, +1 right); it drags its linked ring along. */
  function turn(i: number, d: number): void {
    if (ctx.finished || adv >= 0) return;
    raw = apply(raw, i, d); turns++; ctx.sfx('tap'); paint(); hud();
    if (aligned(raw)) { score += 300 + (budget - turns) * 40; ctx.sfx('good'); note.textContent = 'Aligned! The star shines through.'; adv = 0; }
    else if (turns >= budget) ctx.finish({ result: 'lose', score, title: 'Out of turns', detail: `The gaps stayed crooked on orrery ${round + 1}. Check which ring each one drags.` });
  }
  function update(dt: number): void {
    if (adv < 0 || ctx.finished) return;
    adv += dt;
    if (adv > 0.9) {
      round++;
      if (round >= ROUNDS.length) { round = ROUNDS.length - 1; adv = -1; ctx.finish({ result: 'win', score, title: 'The orrery turns true', detail: 'All three orreries aligned.' }); } else build();
    }
  }
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; score = 0; build(); },
    probe: () => ({ round, raw: raw.map(mod), turns }),
    play(kind: Result) {
      for (let guard = 0; guard < 400 && !ctx.finished; guard++) {
        if (adv >= 0) { update(1 / 60); continue; }
        if (kind === 'win') { const path = solve(raw); path.forEach(([i, d]) => turn(i, d)); }
        else { let done = false; for (let i = 0; i < R && !done; i++) for (const d of [1, -1]) { if (!done && !aligned(apply(raw, i, d))) { turn(i, d); done = true; } } }
      }
    },
  };
}
