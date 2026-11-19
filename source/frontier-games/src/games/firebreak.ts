import { h } from '../core/dom';
import { makeRng, pick, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Firebreak: place a limited number of breaks in the brush, then watch a wildfire burn. Save every homestead in two of three seasons. */
const SEASONS = [{ n: 7, homes: 1 }, { n: 8, homes: 2 }, { n: 8, homes: 2 }];
const WINDS = [{ dx: 1, dy: 0, name: 'east', ar: '→' }, { dx: -1, dy: 0, name: 'west', ar: '←' }, { dx: 0, dy: 1, name: 'south', ar: '↓' }, { dx: 0, dy: -1, name: 'north', ar: '↑' }];
type Kind = 'g' | 's' | 'r' | 'h'; // grass, scrub, rock, homestead
const NEED: Record<Kind, number> = { g: 1, s: 2, r: 99, h: 1 };

interface Map { n: number; kind: Kind[]; wind: (typeof WINDS)[number]; budget: number; ring: number[]; homes: number[] }
/** Fire state per cell: -2 ash, -1 fuel, >=0 burning age. */
function stepFire(m: Map, brk: Set<number>, fire: number[], timer: number[]): boolean {
  const { n, kind, wind } = m, ign: number[] = [];
  let any = false;
  for (let i = 0; i < n * n; i++) {
    if (fire[i] !== -1 || brk.has(i) || kind[i] === 'r') continue;
    const x = i % n, y = (i / n) | 0;
    let need = 99;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const a = x + dx, b = y + dy;
      if (a < 0 || b < 0 || a >= n || b >= n || fire[b * n + a] < 0) continue;
      need = Math.min(need, NEED[kind[i]] + (dx === -wind.dx && dy === -wind.dy ? 0 : dx === wind.dx && dy === wind.dy ? 1 : 0));
    }
    const jx = x - 2 * wind.dx, jy = y - 2 * wind.dy, mx = x - wind.dx, my = y - wind.dy;
    if (jx >= 0 && jy >= 0 && jx < n && jy < n && fire[jy * n + jx] >= 0 && brk.has(my * n + mx)) need = Math.min(need, NEED[kind[i]] + 1);
    if (need < 99) { timer[i]++; if (timer[i] >= need) ign.push(i); }
  }
  for (let i = 0; i < n * n; i++) if (fire[i] >= 0) { fire[i]++; if (fire[i] >= 3) fire[i] = -2; else any = true; }
  for (const i of ign) { fire[i] = 0; any = true; }
  return any || ign.length > 0;
}
function runSim(m: Map, brk: Set<number>): { burned: number; homesLost: number; saved: number } {
  const fire = fireStart(m), timer = Array(m.n * m.n).fill(0);
  for (let g = 0; g < 80 && stepFire(m, brk, fire, timer); g++);
  return { burned: fire.filter((f) => f !== -1).length, homesLost: m.homes.filter((i) => fire[i] !== -1).length, saved: fire.filter((f, i) => f === -1 && m.kind[i] !== 'r').length };
}
function fireStart(m: Map): number[] {
  const { n, wind } = m;
  return Array.from({ length: n * n }, (_, i) => {
    const x = i % n, y = (i / n) | 0;
    const edge = wind.dx > 0 ? x === 0 : wind.dx < 0 ? x === n - 1 : wind.dy > 0 ? y === 0 : y === n - 1;
    return edge && m.kind[i] !== 'r' ? 0 : -1;
  });
}

export default function firebreak(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let season = 0, score = 0, passed = 0, failed = 0, phase: 'plan' | 'burn' | 'report' = 'plan', t = 0, tick = 0;
  let m: Map, brk = new Set<number>(), fire: number[] = [], timer: number[] = [], cells: HTMLButtonElement[] = [];

  const grid = h('div', { class: 'fb-grid' });
  const windTag = h('span', { class: 'mw-chip fb-wind', 'aria-live': 'polite' });
  const light = h('button', { class: 'mw-btn primary', type: 'button', 'data-light': '' }, 'Light the fire');
  const note = h('p', { class: 'mw-note fb-note', role: 'status' });
  const style = h('style', null, `
    .fb-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:440px;margin:auto}
    .fb-grid{display:grid;gap:3px;width:100%;padding:6px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised)}
    .fb-c{aspect-ratio:1;min-width:0;padding:0;border-radius:5px;border:2px solid var(--mw-saddle);background:var(--mw-tan);color:var(--mw-ink);font:700 1.05rem/1 var(--mw-font-slab);cursor:pointer;touch-action:manipulation}
    .fb-c[data-k=s]{background:var(--mw-saddle);color:var(--mw-bone);border-color:var(--mw-umber)}
    .fb-c[data-k=r]{background:var(--mw-ash);color:var(--mw-night);border-color:var(--mw-smoke);cursor:default}
    .fb-c[data-k=h]{background:var(--mw-bone);color:var(--mw-ink);border-color:var(--mw-rose);cursor:default}
    .fb-c.brk{background:var(--mw-night);border:2px dashed var(--mw-bone);color:var(--mw-bone)}
    .fb-c.fire{background:var(--mw-red);color:var(--mw-white);border-color:var(--mw-rose)}
    .fb-c.ash{background:var(--mw-ink);color:var(--mw-smoke);border-color:var(--mw-night)}
    .fb-c.lost{background:var(--mw-ink);color:var(--mw-rose);border-color:var(--mw-red)}
    .fb-note{text-align:center;min-height:2.6em}
  `);
  ctx.root.append(style, h('div', { class: 'fb-wrap' }, h('div', { class: 'mw-row' }, windTag, light), grid, note));

  function gen(): void {
    const { n, homes } = SEASONS[season];
    for (;;) {
      const wind = pick(rand, WINDS);
      const kind: Kind[] = Array.from({ length: n * n }, () => { const r = rand(); return r < 0.1 ? 'r' : r < 0.45 ? 's' : 'g'; });
      const hs: number[] = [];
      while (hs.length < homes) {
        const x = rint(rand, 0, n - 1), y = rint(rand, 0, n - 1);
        const d = wind.dx > 0 ? x : wind.dx < 0 ? n - 1 - x : wind.dy > 0 ? y : n - 1 - y;
        const i = y * n + x;
        if (d < 3 || d > n - 2 || hs.includes(i) || hs.some((o) => Math.abs((o % n) - x) + Math.abs(((o / n) | 0) - y) < 4)) continue;
        hs.push(i); kind[i] = 'h';
      }
      const ring = new Set<number>();
      for (const i of hs) {
        const x = i % n, y = (i / n) | 0;
        for (const [a, b] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1], [x - 2 * wind.dx, y - 2 * wind.dy]]) if (a >= 0 && b >= 0 && a < n && b < n && kind[b * n + a] !== 'r' && kind[b * n + a] !== 'h') ring.add(b * n + a);
      }
      m = { n, kind, wind, budget: ring.size + 3, ring: [...ring], homes: hs };
      if (runSim(m, new Set(ring)).homesLost === 0 && runSim(m, new Set()).homesLost > 0) return;
    }
  }
  const cellAt = (i: number): string => {
    if (fire[i] === -2) return m.kind[i] === 'h' ? '✕' : '·';
    if (fire[i] >= 0) return '▲';
    if (brk.has(i)) return '═';
    return m.kind[i] === 'h' ? '⌂' : m.kind[i] === 'r' ? '▪' : m.kind[i] === 's' ? '♣' : '"';
  };
  function paint(): void {
    cells.forEach((b, i) => {
      const burnt = fire[i] === -2, burning = fire[i] >= 0;
      b.className = 'fb-c' + (brk.has(i) ? ' brk' : '') + (burning ? ' fire' : '') + (burnt ? (m.kind[i] === 'h' ? ' lost' : ' ash') : '');
      b.dataset.k = m.kind[i];
      b.textContent = cellAt(i);
      b.setAttribute('aria-label', `Cell ${(i % m.n) + 1},${((i / m.n) | 0) + 1}: ${burning ? 'burning' : burnt ? 'burned' : brk.has(i) ? 'firebreak' : ({ g: 'grass', s: 'scrub', r: 'rock', h: 'homestead' })[m.kind[i]]}`);
    });
    hud();
  }
  function hud(): void { ctx.hud('Season', `${season + 1}/${SEASONS.length}`); ctx.hud('Breaks left', m.budget - brk.size); ctx.hud('Saved', `${passed} won`); }
  function start(): void {
    gen(); brk = new Set(); fire = fireStart(m); timer = Array(m.n * m.n).fill(0); phase = 'plan'; t = 0; tick = 0;
    grid.style.gridTemplateColumns = `repeat(${m.n}, 1fr)`; grid.replaceChildren();
    cells = Array.from({ length: m.n * m.n }, (_, i) => { const b = h('button', { class: 'fb-c', type: 'button', 'data-cell': '' }) as HTMLButtonElement; b.addEventListener('click', () => place(i)); grid.append(b); return b; });
    windTag.textContent = `Wind ${m.wind.ar} blows ${m.wind.name}`;
    light.disabled = false; light.focus?.();
    note.textContent = `The fire starts on the ${m.wind.dx > 0 ? 'west' : m.wind.dx < 0 ? 'east' : m.wind.dy > 0 ? 'north' : 'south'} edge. Tap brush to cut a break (tap again to undo), then light it. Embers leap a one-cell break along the wind, so make it two thick on the windward side.`;
    paint();
  }
  /** Player action 1: place or remove a firebreak. */
  function place(i: number): void {
    if (ctx.finished || phase !== 'plan' || m.kind[i] === 'r' || m.kind[i] === 'h') return;
    if (fire[i] >= 0) return;
    if (brk.has(i)) brk.delete(i); else if (brk.size < m.budget) brk.add(i); else { note.textContent = 'No breaks left. Tap a break to take it back.'; return; }
    ctx.sfx('tap'); paint();
  }
  /** Player action 2: light the fire and watch it run. */
  function ignite(): void {
    if (ctx.finished || phase !== 'plan') return;
    fire = fireStart(m); phase = 'burn'; t = 0; tick = 0; light.disabled = true; ctx.sfx('tick'); note.textContent = 'The fire runs…'; paint();
  }
  function conclude(): void {
    const lost = m.homes.filter((i) => fire[i] !== -1).length;
    const saved = fire.filter((f, i) => f === -1 && m.kind[i] !== 'r').length;
    const ok = lost === 0;
    score += (m.homes.length - lost) * 150 + saved * 10; if (ok) passed++; else failed++;
    phase = 'report'; t = 0; ctx.sfx(ok ? 'good' : 'bad');
    note.textContent = ok ? `Homesteads safe. ${saved} acres of brush saved.` : `${lost} homestead${lost > 1 ? 's' : ''} burned. ${saved} acres saved.`;
    hud();
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt;
    if (phase === 'burn' && t >= 0.22) {
      t = 0; tick++;
      if (!stepFire(m, brk, fire, timer)) conclude(); else paint();
    } else if (phase === 'report' && t > 1.8) {
      if (passed >= 2) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'The homesteads stand', detail: `You saved the homesteads in ${passed} of ${season + 1} seasons.` }); }
      else if (failed >= 2 || season + 1 >= SEASONS.length) ctx.finish({ result: 'lose', score, title: 'The range burned', detail: `Homesteads were lost in ${failed} seasons. Cut windward breaks two thick.` });
      else { season++; start(); }
    }
  }
  light.addEventListener('click', ignite);
  ctx.loop(update, () => {});

  return {
    destroy() { /* released by the shell */ },
    reset(seed) { rand = makeRng(seed); season = 0; score = 0; passed = 0; failed = 0; start(); },
    probe: () => ({ season, phase, breaks: [...brk].sort((a, b) => a - b), tick, score, passed }),
    play(kind: Result) {
      for (let g = 0; g < 4000 && !ctx.finished; g++) {
        if (phase === 'plan') { if (kind === 'win') m.ring.forEach(place); ignite(); } else update(1 / 60);
      }
    },
  };
}
