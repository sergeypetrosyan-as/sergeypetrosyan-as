import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Canal Lock: a chain of chambers. A valve moves one unit of water from the fuller side to the emptier side. A barge may only sail to a neighbouring chamber at the SAME water level. Bring it to the last chamber in few moves. */
const LEVELS = [{ n: 3, cap: 4, lo: 4, hi: 6 }, { n: 4, cap: 5, lo: 6, hi: 9 }, { n: 5, cap: 5, lo: 8, hi: 11 }];
const CELL = 36;
type Act = { v: number } | { s: number };
interface S { lv: number[]; b: number }

const flow = (s: S, i: number): S | null => {
  const a = s.lv[i], c = s.lv[i + 1]; if (a === c) return null;
  const lv = s.lv.slice(); lv[a > c ? i : i + 1]--; lv[a > c ? i + 1 : i]++; return { lv, b: s.b };
};
const sail = (s: S, j: number): S | null => (Math.abs(j - s.b) === 1 && s.lv[j] === s.lv[s.b] ? { lv: s.lv, b: j } : null);
const moves = (s: S): [Act, S][] => {
  const out: [Act, S][] = [];
  for (let i = 0; i < s.lv.length - 1; i++) { const n = flow(s, i); if (n) out.push([{ v: i }, n]); }
  for (const j of [s.b - 1, s.b + 1]) { const n = j >= 0 && j < s.lv.length ? sail(s, j) : null; if (n) out.push([{ s: j }, n]); }
  return out;
};
const key = (s: S) => `${s.b}:${s.lv.join('')}`;
/** BFS from a state to "barge in the last chamber". Returns the action list, or null if unreachable. */
function solve(start: S): Act[] | null {
  const goal = start.lv.length - 1;
  const prev = new Map<string, { from: string; act: Act } | null>([[key(start), null]]);
  const q: S[] = [start];
  for (let k = 0; k < q.length; k++) {
    const s = q[k];
    if (s.b === goal) { const out: Act[] = []; let kk = key(s); for (let p = prev.get(kk); p; p = prev.get(kk)) { out.unshift(p.act); kk = p.from; } return out; }
    for (const [act, n] of moves(s)) { const nk = key(n); if (!prev.has(nk)) { prev.set(nk, { from: key(s), act }); q.push(n); } }
  }
  return null;
}

export default function canalLock(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let lvl = 0, st: S = { lv: [], b: 0 }, left = 0, score = 0, msg = '';

  const tanks = h('div', { class: 'cl-tanks' });
  const valves = h('div', { class: 'cl-valves' });
  const note = h('p', { class: 'mw-note', 'aria-live': 'polite' });
  const style = h('style', null, `
    .cl{width:100%;max-width:520px;display:flex;flex-direction:column;gap:6px;align-items:center}
    .cl-tanks{width:100%;display:grid;gap:6px;align-items:end}
    .cl-t{position:relative;display:flex;flex-direction:column;align-items:stretch;border:0;background:transparent;padding:0;color:var(--mw-bone);font:700 .8rem var(--mw-font-slab);cursor:pointer;gap:3px}
    .cl-box{position:relative;border:3px solid var(--mw-ember);border-top:0;border-radius:0 0 8px 8px;background:var(--mw-night);overflow:hidden}
    .cl-w{position:absolute;left:0;right:0;bottom:0;background:var(--mw-ash);opacity:.8;border-top:3px solid var(--mw-bone);transition:height .25s}
    .cl-g{position:absolute;left:0;right:0;border-top:1px dashed color-mix(in srgb,var(--mw-bone) 28%,transparent)}
    .cl-barge{position:absolute;left:8%;right:8%;height:24px;border-radius:3px 3px 12px 12px;background:var(--mw-bone);color:var(--mw-ink);border:2px solid var(--mw-red);display:grid;place-items:center;font:700 .62rem var(--mw-font-slab);transition:bottom .25s;z-index:1}
    .cl-t.can .cl-lab{color:var(--mw-ink);background:var(--mw-rose);border-radius:10px}
    .cl-t.goal .cl-box{border-color:var(--mw-rose)}
    .cl-lab{text-align:center;padding:2px 0;min-height:22px}
    .cl-valves{position:relative;width:100%;height:48px}
    .cl-v{position:absolute;top:0;transform:translateX(-50%);width:48px;height:44px;border-radius:50%;border:2px solid var(--mw-rose);background:var(--mw-dusk);color:var(--mw-bone);font:700 1.1rem var(--mw-font-slab);cursor:pointer;padding:0}
    .cl-v:disabled{opacity:.4;border-style:dashed;border-color:var(--mw-mesa);cursor:default}
  `);
  ctx.root.append(style, h('div', { class: 'cl' }, tanks, valves, note));

  function render(): void {
    const L = LEVELS[lvl], n = L.n;
    tanks.style.gridTemplateColumns = `repeat(${n},1fr)`;
    tanks.replaceChildren(...st.lv.map((w, i) => {
      const can = !!sail(st, i);
      return h('button', { class: 'cl-t' + (can ? ' can' : '') + (i === n - 1 ? ' goal' : ''), type: 'button', 'data-tank': i, 'aria-label': `Chamber ${i + 1}, water ${w} of ${L.cap}${i === st.b ? ', barge here' : ''}${can ? ', tap to sail here' : ''}`, onclick: () => sailTo(i) },
        h('span', { class: 'cl-lab' }, i === n - 1 ? '★ goal' : `${i + 1}`),
        h('span', { class: 'cl-box', style: { height: `${L.cap * CELL}px` } },
          Array.from({ length: L.cap - 1 }, (_, k) => h('i', { class: 'cl-g', style: { bottom: `${(k + 1) * CELL}px` } })),
          h('i', { class: 'cl-w', style: { height: `${w * CELL}px` } }),
          i === st.b ? h('i', { class: 'cl-barge', style: { bottom: `${w * CELL - 2}px` } }, 'BARGE') : null),
        h('span', { class: 'cl-lab' }, can ? 'Sail →' : `${w}/${L.cap}`));
    }));
    valves.replaceChildren(...Array.from({ length: n - 1 }, (_, i) => {
      const a = st.lv[i], c = st.lv[i + 1];
      return h('button', { class: 'cl-v', type: 'button', 'data-valve': i, disabled: a === c || ctx.finished, 'aria-label': a === c ? `Valve ${i + 1}: levels equal` : `Valve ${i + 1}: let water flow ${a > c ? 'right' : 'left'}`, style: { left: `${((i + 1) / n) * 100}%` }, onclick: () => open(i) }, a === c ? '=' : a > c ? '▶' : '◀');
    }));
    ctx.hud('Canal', `${lvl + 1}/${LEVELS.length}`); ctx.hud('Moves left', left);
    note.textContent = msg || 'Valves send one unit of water toward the emptier chamber. The barge sails only between chambers at equal level.';
  }
  function newLevel(): void {
    const L = LEVELS[lvl];
    let best: S | null = null, bestLen = -1;
    for (let tries = 0; tries < 400; tries++) {
      const lv = Array(L.n).fill(0), total = rint(rand, Math.floor(L.n * L.cap * 0.35), Math.floor(L.n * L.cap * 0.65));
      for (let u = 0; u < total; u++) { let c; do { c = rint(rand, 0, L.n - 1); } while (lv[c] >= L.cap); lv[c]++; }
      if (lv[0] === lv[1]) continue;
      const s: S = { lv, b: 0 }, p = solve(s);
      if (!p) continue;
      if (p.length >= L.lo && p.length <= L.hi) { best = s; bestLen = p.length; break; }
      if (p.length <= L.hi && p.length > bestLen) { best = s; bestLen = p.length; }
    }
    st = best ?? { lv: [1, 0, 0].slice(0, L.n), b: 0 };
    left = (solve(st)?.length ?? 6) + 3; msg = '';
    render();
  }
  function apply(next: S | null): void {
    if (ctx.finished || !next) { if (!ctx.finished) ctx.sfx('bad'); return; }
    st = next; left--; msg = ''; ctx.sfx('tap');
    if (st.b === LEVELS[lvl].n - 1) {
      score += 300 + left * 40; ctx.sfx('win');
      if (lvl >= LEVELS.length - 1) { render(); ctx.finish({ result: 'win', score, title: 'The barge is through', detail: `All ${LEVELS.length} canals cleared.` }); return; }
      lvl++; newLevel(); return;
    }
    render();
    if (left <= 0) ctx.finish({ result: 'lose', score, title: 'The barge is stuck', detail: `Canal ${lvl + 1}: you ran out of moves.` });
  }
  /** The one scoring action: open a valve. */
  function open(i: number): void { apply(flow(st, i)); }
  function sailTo(j: number): void { if (j !== st.b) apply(sail(st, j)); }
  const run = (a: Act) => ('v' in a ? open(a.v) : sailTo(a.s));

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); lvl = 0; score = 0; newLevel(); },
    probe: () => ({ lvl, lv: st.lv.join(','), b: st.b, left }),
    play(kind) {
      for (let n = 0; n < 80 && !ctx.finished; n++) {
        if (kind === 'win') { const p = solve(st); if (!p || !p.length) return; run(p[0]); }
        else {
          let worst = -1, pick: Act | null = null;
          for (const [a, s2] of moves(st)) { const d = solve(s2)?.length ?? 99; if (d > worst) { worst = d; pick = a; } }
          if (!pick) return; run(pick);
        }
      }
    },
  };
}
