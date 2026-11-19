import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Shift Roster: put hands on shifts so every post is covered and every rule holds, before the clock runs out. */
const SLOTS = ['Dawn', 'Noon', 'Dusk', 'Night'];
const NAMES = ['Abel', 'Birdie', 'Cole', 'Dottie', 'Eli', 'Fern'];
const LEVELS = [{ w: 4, s: 3, time: 60 }, { w: 5, s: 4, time: 80 }, { w: 6, s: 4, time: 100 }];

interface Pair { a: number; b: number; kind: 'apart' | 'with' }
interface Level { w: number; s: number; sol: boolean[][]; locked: boolean[][]; need: number[]; max: (number | null)[]; flat: boolean[]; pairs: Pair[] }

const GLYPH = [
  'M3 15 A9 9 0 0 1 21 15 Z',                          // dawn: half sun on horizon
  'M12 3 V6 M12 24 V21 M3 12 H6 M21 12 H18 M5.6 5.6 L7.7 7.7 M18.4 18.4 L16.3 16.3 M18.4 5.6 L16.3 7.7 M5.6 18.4 L7.7 16.3', // noon rays
  'M3 15 A9 9 0 0 0 21 15 Z',                          // dusk
  'M15 4 A8 8 0 1 0 15 20 A6 6 0 1 1 15 4 Z',          // night: crescent
];

export default function shiftRoster(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let lvl = 0, score = 0, left = 0, lv: Level, a: boolean[][] = [];

  const board = h('div', { class: 'sr-board' });
  const rules = h('ul', { class: 'sr-rules' });
  const style = h('style', null, `
    .sr-wrap{display:flex;flex-direction:column;gap:10px;width:100%;max-width:520px;margin:auto}
    .sr-board{display:grid;gap:5px;align-items:stretch}
    .sr-head{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font:600 .85rem var(--mw-font-slab);color:var(--mw-bone);text-align:center}
    .sr-head svg{width:24px;height:24px;fill:var(--mw-tan);stroke:var(--mw-tan);stroke-width:1.6}
    .sr-head.bad{color:var(--mw-rose)}
    .sr-name{display:flex;flex-direction:column;justify-content:center;padding:2px 4px;font:700 1rem var(--mw-font-slab);color:var(--mw-bone)}
    .sr-name small{font:500 .78rem/1.25 var(--mw-font-body);color:var(--mw-smoke)}
    .sr-name small.bad{color:var(--mw-rose)}
    .sr-c{min-height:46px;border-radius:7px;border:2px solid var(--mw-mesa);background:var(--mw-night);color:var(--mw-bone);font:700 1.2rem var(--mw-font-slab);padding:0;cursor:pointer;touch-action:manipulation}
    .sr-c.on{background:var(--mw-tan);color:var(--mw-ink);border-color:var(--mw-bone)}
    .sr-c.lock{background:repeating-linear-gradient(45deg,var(--mw-night),var(--mw-night) 5px,var(--mw-dusk) 5px,var(--mw-dusk) 9px);color:var(--mw-smoke);cursor:not-allowed;border-style:dashed}
    .sr-rules{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:4px;font:500 .95rem var(--mw-font-body)}
    .sr-rules li{padding:4px 8px;border-left:3px solid var(--mw-mesa);color:var(--mw-bone)}
    .sr-rules li.bad{border-color:var(--mw-red);color:var(--mw-blush)}
  `);
  ctx.root.append(style, h('div', { class: 'sr-wrap' }, board, rules));

  const si = (i: number): number => (lv.s === 3 && i === 2 ? 3 : i);
  const cnt = (s: number): number => a.filter((r) => r[s]).length;
  const rowN = (w: number): number => a[w].filter(Boolean).length;
  const flatOk = (w: number): boolean => !a[w].some((v, s) => v && a[w][s + 1]);
  const pairOk = (p: Pair): boolean => (p.kind === 'apart' ? !a[p.a].some((v, s) => v && a[p.b][s]) : a[p.a].every((v, s) => !v || a[p.b][s]));

  function gen(): void {
    const { w, s } = LEVELS[lvl];
    for (;;) {
      const sol = Array.from({ length: w }, () => Array(s).fill(false));
      sol.forEach((r) => { const k = 1 + (rand() < 0.5 ? 1 : 0); shuffle(rand, [...Array(s).keys()]).slice(0, k).forEach((i) => { r[i] = true; }); });
      for (let i = 0; i < s; i++) if (!sol.some((r) => r[i])) sol[Math.floor(rand() * w)][i] = true;
      const need = Array.from({ length: s }, (_, i) => sol.filter((r) => r[i]).length);
      const locked = sol.map((r) => r.map((v) => !v && rand() < 0.45));
      const max = sol.map((r) => { const n = r.filter(Boolean).length; return n < s && rand() < 0.75 ? n : null; });
      const flat = sol.map((r) => s >= 3 && !r.some((v, i) => v && r[i + 1]) && rand() < 0.5);
      const pairs: Pair[] = [];
      for (const [x, y] of shuffle(rand, Array.from({ length: w * w }, (_, i) => [(i / w) | 0, i % w]).filter(([x, y]) => x < y))) {
        if (pairs.length >= 1 + lvl) break;
        if (!sol[x].some((v, i) => v && sol[y][i])) pairs.push({ a: x, b: y, kind: 'apart' });
        else if (sol[x].every((v, i) => !v || sol[y][i]) && sol[x].filter(Boolean).length === 1 && w > 4) pairs.push({ a: x, b: y, kind: 'with' });
      }
      if (pairs.length < 1) continue;
      lv = { w, s, sol, locked, need, max, flat, pairs };
      return;
    }
  }
  const violations = (): number => {
    let n = 0;
    for (let i = 0; i < lv.s; i++) if (cnt(i) !== lv.need[i]) n++;
    for (let i = 0; i < lv.w; i++) { if (lv.max[i] != null && rowN(i) > lv.max[i]!) n++; if (lv.flat[i] && !flatOk(i)) n++; }
    return n + lv.pairs.filter((p) => !pairOk(p)).length;
  };

  function render(): void {
    const { w, s } = lv;
    board.style.gridTemplateColumns = `minmax(92px,1.5fr) repeat(${s}, minmax(44px,1fr))`;
    board.replaceChildren(h('div'));
    for (let i = 0; i < s; i++) {
      const ok = cnt(i) === lv.need[i];
      board.append(h('div', { class: 'sr-head' + (ok ? '' : ' bad') },
        h('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }, h('path', { d: GLYPH[si(i)], fill: i === 1 ? 'none' : undefined })),
        SLOTS[si(i)], h('span', null, `${ok ? '✓' : '✕'} ${cnt(i)}/${lv.need[i]}`)));
    }
    for (let r = 0; r < w; r++) {
      const tags: HTMLElement[] = [];
      if (lv.max[r] != null) tags.push(h('small', { class: rowN(r) > lv.max[r]! ? 'bad' : '' }, `${rowN(r) > lv.max[r]! ? '✕' : '✓'} max ${lv.max[r]} shift${lv.max[r] === 1 ? '' : 's'}`));
      if (lv.flat[r]) tags.push(h('small', { class: flatOk(r) ? '' : 'bad' }, `${flatOk(r) ? '✓' : '✕'} no back-to-back`));
      board.append(h('div', { class: 'sr-name' }, NAMES[r], ...tags));
      for (let i = 0; i < s; i++) {
        const lock = lv.locked[r][i];
        const b = h('button', { class: 'sr-c' + (a[r][i] ? ' on' : '') + (lock ? ' lock' : ''), type: 'button', 'data-cell': '', 'aria-label': `${NAMES[r]}, ${SLOTS[si(i)]}:${lock ? 'unavailable' : a[r][i] ? 'on shift' : 'off'}`, 'aria-pressed': String(a[r][i]), 'aria-disabled': lock ? 'true' : null }, lock ? '✕' : a[r][i] ? '●' : '');
        b.addEventListener('click', () => toggle(r, i));
        board.append(b);
      }
    }
    rules.replaceChildren(...lv.pairs.map((p) => {
      const ok = pairOk(p);
      return h('li', { class: ok ? '' : 'bad' }, `${ok ? '✓' : '✕'} ${p.kind === 'apart' ? `${NAMES[p.a]} and ${NAMES[p.b]} never share a shift.` : `${NAMES[p.a]} only works shifts that ${NAMES[p.b]} also works.`}`);
    }));
    hud();
  }
  function hud(): void { ctx.hud('Roster', `${lvl + 1}/${LEVELS.length}`); ctx.hud('Rules broken', violations()); ctx.hud('Time', Math.ceil(left) + 's'); }
  function start(): void { gen(); a = lv.sol.map((r) => r.map(() => false)); left = LEVELS[lvl].time; render(); }

  /** The one player action: put a hand on, or take them off, a shift. */
  function toggle(r: number, s: number): void {
    if (ctx.finished || lv.locked[r][s]) return;
    a[r][s] = !a[r][s]; ctx.sfx('tap'); render();
    if (violations() === 0) {
      score += 300 + Math.ceil(left) * 4; ctx.sfx('good');
      if (lvl + 1 >= LEVELS.length) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'Every post staffed', detail: 'All three rosters met every rule.' }); return; }
      lvl++; start();
    }
  }
  function tick(dt: number): void {
    if (ctx.finished) return;
    const before = Math.ceil(left); left -= dt;
    if (Math.ceil(left) !== before) hud();
    if (left <= 0) ctx.finish({ result: 'lose', score, title: 'The shift bell rings', detail: `Roster ${lvl + 1} was still broken with ${violations()} rule(s) unmet.` });
  }
  ctx.loop(tick, () => {});

  return {
    destroy() { /* released by the shell */ },
    reset(seed) { rand = makeRng(seed); lvl = 0; score = 0; start(); },
    probe: () => ({ lvl, score, broken: violations(), on: a.map((r) => r.map((v) => +v).join('')).join('|') }),
    play(kind: Result) {
      if (kind === 'lose') { for (let g = 0; g < 8000 && !ctx.finished; g++) tick(1 / 60); return; }
      for (let g = 0; g < 100 && !ctx.finished; g++) {
        const cur = lvl;
        lv.sol.forEach((r, i) => r.forEach((v, j) => { if (!ctx.finished && lvl === cur && a[i][j] !== v) toggle(i, j); }));
      }
    },
  };
}
