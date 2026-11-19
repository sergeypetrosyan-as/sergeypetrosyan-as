import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Deep Shaft: dig for ore, then climb back to the surface before the air runs out. Three trips to bank the quota. */
const W = 5, H = 9, QUOTA = 36, TRIPS = 3, AIR = 26;
type Kind = 'rock' | 'hard' | 'ore' | 'air';
interface Tile { kind: Kind; v: number; dug: boolean; seen: boolean }
const KEY: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };

export default function deepShaft(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let grid: Tile[][] = [], pr = 0, pc = 2, air = AIR, carry = 0, banked = 0, trip = 0, msg = '';

  const style = h('style', null, `
    .ds{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:8px}
    .ds-board{width:100%;max-width:254px;display:grid;grid-template-columns:repeat(${W},1fr);gap:3px;padding:6px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-umber)}
    .ds-t{position:relative;aspect-ratio:1;min-width:0;padding:0;border:2px solid var(--mw-ink);border-radius:6px;display:grid;place-items:center;font:700 .95rem/1.05 var(--mw-font-slab);color:var(--mw-bone);background:var(--mw-saddle);cursor:default}
    .ds-t.unk{background:var(--mw-ink);color:var(--mw-ash)}
    .ds-t.hard{background:var(--mw-smoke);color:var(--mw-ink)}
    .ds-t.ore{background:var(--mw-wine);color:var(--mw-bone);border-color:var(--mw-rose)}
    .ds-t.air{background:var(--mw-dusk);border-color:var(--mw-bone);border-style:dashed}
    .ds-t.dug{background:var(--mw-night);border-color:var(--mw-mesa);color:var(--mw-ash)}
    .ds-t.sf{background:var(--mw-dusk);border-color:var(--mw-dusk)}
    .ds-t.near{border-color:var(--mw-rose);cursor:pointer}
    .ds-t.near::after{content:attr(data-cost);position:absolute;right:3px;bottom:0;font-size:.7rem;color:var(--mw-rose)}
    .ds-me{position:absolute;inset:8px;border-radius:50%;background:var(--mw-bone);border:3px solid var(--mw-ink);display:grid;place-items:center;color:var(--mw-ink);font-size:.8rem;z-index:2}
    .ds-air{width:100%;display:flex;align-items:center;gap:8px;font:600 .95rem var(--mw-font-slab);color:var(--mw-bone)}
    .ds-air .mw-meter{flex:1;max-width:none}
    .ds-air .mw-meter.low > i{background:var(--mw-red)}
    .ds-info{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;font:600 .92rem var(--mw-font-slab);color:var(--mw-bone)}
    .ds-info span{border:2px solid var(--mw-mesa);border-radius:999px;padding:3px 12px;background:var(--mw-night)}
    .ds-info .warn{border-color:var(--mw-red)}
  `);
  const board = h('div', { class: 'ds-board' }), info = h('div', { class: 'ds-info', 'aria-live': 'polite' });
  const bar = h('i'), meter = h('div', { class: 'mw-meter', 'aria-hidden': 'true' }, bar), airTxt = h('span');
  const note = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'ds' }, h('div', { class: 'ds-air' }, h('span', null, 'Air'), meter, airTxt), board, info, note));

  const digCost = (t: Tile): number => (t.dug ? 1 : t.kind === 'hard' ? 2 : 1);
  /** Fewest steps back to the surface through already dug ground (plus `extra` tiles). */
  function climb(r: number, c: number, extra?: Set<number>): number {
    const q: [number, number, number][] = [[r, c, 0]], seen = new Set([r * W + c]);
    while (q.length) {
      const [y, x, d] = q.shift()!;
      if (y === 0) return d;
      for (const [dy, dx] of Object.values(KEY)) {
        const ny = y + dy, nx = x + dx, k = ny * W + nx;
        if (ny < 0 || nx < 0 || nx >= W || ny >= H || seen.has(k) || !(grid[ny][nx].dug || ny === 0 || extra?.has(k))) continue;
        seen.add(k); q.push([ny, nx, d + 1]);
      }
    }
    return 99;
  }
  function reveal(): void { for (let y = pr - 1; y <= pr + 1; y++) for (let x = pc - 1; x <= pc + 1; x++) if (grid[y]?.[x]) grid[y][x].seen = true; }
  function render(): void {
    const cells: HTMLElement[] = [];
    for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
      const t = grid[r][c], near = Math.abs(r - pr) + Math.abs(c - pc) === 1;
      const cls = r === 0 ? 'sf' : t.dug ? 'dug' : !t.seen ? 'unk' : t.kind;
      const label = r === 0 ? (c === 2 ? '⌂' : '') : t.dug ? '' : !t.seen ? '?' : t.kind === 'ore' ? `◆${t.v}` : t.kind === 'air' ? '○+4' : t.kind === 'hard' ? '▦' : '';
      const b = h('button', { class: `ds-t ${cls}${near ? ' near' : ''}`, type: 'button', 'aria-label': r === 0 ? 'Surface' : t.dug ? 'Dug tunnel' : !t.seen ? 'Unknown ground' : t.kind === 'ore' ? `Ore worth ${t.v}` : t.kind === 'air' ? 'Air pocket' : t.kind === 'hard' ? 'Hard rock' : 'Rock', onclick: () => act(r, c) }, label);
      if (near) { b.setAttribute('data-dig', ''); b.setAttribute('data-cost', r === 0 ? '' : String(digCost(t))); }
      if (r === pr && c === pc) b.append(h('span', { class: 'ds-me', 'aria-label': 'You' }, '☻'));
      cells.push(b);
    }
    board.replaceChildren(...cells);
    const back = climb(pr, pc);
    bar.style.width = `${Math.min(100, (air / AIR) * 100)}%`; meter.classList.toggle('low', pr > 0 && air <= back + 3); airTxt.textContent = `${air}`;
    info.replaceChildren(h('span', null, `Carrying ◆${carry}`), h('span', null, `Banked ◆${banked}/${QUOTA}`), h('span', { class: pr > 0 && air <= back + 3 ? 'warn' : '' }, pr > 0 ? `Climb back ${back}${air <= back + 3 ? ' ▲ turn back' : ''}` : 'At surface'));
    note.textContent = msg;
    ctx.hud('Trip', `${Math.min(trip, TRIPS)}/${TRIPS}`); ctx.hud('Banked', banked); ctx.hud('Air', air);
  }
  /** The one player action: step to a neighbouring tile, digging it first if it is solid. */
  function step(r: number, c: number): void {
    if (ctx.finished || Math.abs(r - pr) + Math.abs(c - pc) !== 1) return;
    const t = grid[r][c];
    if (r === 0) { pr = r; pc = c; reveal(); render(); return; }
    if (pr === 0) trip++;
    air -= digCost(t); msg = '';
    if (!t.dug) {
      t.dug = true; ctx.sfx('tap');
      if (t.kind === 'ore') { carry += t.v; msg = `Struck ore worth ${t.v}.`; ctx.sfx('good'); }
      if (t.kind === 'air') { air += 4; msg = 'Air pocket: +4 air.'; ctx.sfx('good'); }
    }
    pr = r; pc = c; reveal();
    if (air <= 0 && pr > 0) { render(); ctx.finish({ result: 'lose', score: banked * 10, title: 'Out of air', detail: `You ran out of air ${pr} levels down with ${carry} ore unbanked.` }); return; }
    render();
  }
  function surface(): void {
    banked += carry; msg = carry ? `Banked ${carry} ore.` : 'Back at the surface.'; carry = 0; air = AIR; render();
    if (banked >= QUOTA) { ctx.sfx('win'); ctx.finish({ result: 'win', score: banked * 10 + (TRIPS - trip) * 50, title: 'Quota hauled', detail: `${banked} ore banked in ${trip} ${trip === 1 ? 'trip' : 'trips'}.` }); }
    else if (trip >= TRIPS) ctx.finish({ result: 'lose', score: banked * 10, title: 'Quota missed', detail: `Only ${banked} of ${QUOTA} ore banked over ${TRIPS} trips.` });
  }
  const origStep = step;
  function act(r: number, c: number): void { const was = pr; origStep(r, c); if (!ctx.finished && was > 0 && pr === 0) surface(); }
  ctx.keys(Object.fromEntries(Object.entries(KEY).map(([k, [dy, dx]]) => [k, (d: boolean) => d && act(pr + dy, pc + dx)])));
  ctx.pad([{ key: 'ArrowLeft', label: '◀' }, { key: 'ArrowUp', label: '▲' }, { key: 'ArrowDown', label: '▼' }, { key: 'ArrowRight', label: '▶' }]);

  /** Bot: pick the best ore it can still afford to climb back from, else head home. Returns the next tile to step to. */
  function plan(): [number, number] | null {
    const dist = new Map<number, { d: number; from: number }>([[pr * W + pc, { d: 0, from: -1 }]]);
    const todo = [pr * W + pc];
    while (todo.length) {
      todo.sort((a, b) => dist.get(a)!.d - dist.get(b)!.d);
      const k = todo.shift()!, y = Math.floor(k / W), x = k % W;
      for (const [dy, dx] of Object.values(KEY)) {
        const ny = y + dy, nx = x + dx, nk = ny * W + nx;
        if (ny < 0 || nx < 0 || nx >= W || ny >= H) continue;
        const nd = dist.get(k)!.d + (ny === 0 ? 0 : digCost(grid[ny][nx]));
        if (!dist.has(nk) || nd < dist.get(nk)!.d) { dist.set(nk, { d: nd, from: k }); todo.push(nk); }
      }
    }
    let bestK = -1, bestS = 0;
    for (const [k, v] of dist) {
      const y = Math.floor(k / W), x = k % W, t = grid[y][x];
      if (y === 0 || t.dug || t.kind !== 'ore') continue;
      const path = new Set<number>(); for (let p = k; p >= 0; p = dist.get(p)!.from) path.add(p);
      const need = v.d + climb(y, x, path);
      if (need + 1 > air) continue;
      const s = t.v / v.d; if (s > bestS) { bestS = s; bestK = k; }
    }
    let target = bestK;
    if (target < 0) { if (pr === 0) return null; target = -2; }
    if (target === -2) { // walk home through dug tunnel
      const bq: [number, number, [number, number] | null][] = [[pr, pc, null]], seen = new Set([pr * W + pc]);
      while (bq.length) {
        const [y, x, first] = bq.shift()!;
        if (y === 0) return first;
        for (const [dy, dx] of Object.values(KEY)) { const ny = y + dy, nx = x + dx; if (ny < 0 || nx < 0 || nx >= W || ny >= H || seen.has(ny * W + nx) || !(grid[ny][nx].dug || ny === 0)) continue; seen.add(ny * W + nx); bq.push([ny, nx, first ?? [ny, nx]]); }
      }
      return null;
    }
    let p = target; while (dist.get(p)!.from !== pr * W + pc) p = dist.get(p)!.from;
    return [Math.floor(p / W), p % W];
  }

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); pr = 0; pc = 2; air = AIR; carry = 0; banked = 0; trip = 0; msg = 'Tap a tile beside you to dig. Deeper ore is worth more.';
      grid = Array.from({ length: H }, (_, r) => Array.from({ length: W }, () => {
        const x = rand();
        const kind: Kind = r === 0 ? 'rock' : x < 0.4 ? 'ore' : x < 0.44 ? 'air' : x < 0.6 + r * 0.01 ? 'hard' : 'rock';
        return { kind, v: r < 3 ? rint(rand, 2, 3) : r < 6 ? rint(rand, 4, 6) : rint(rand, 8, 12), dug: r === 0, seen: r <= 1 };
      }));
      reveal(); render();
    },
    probe: () => ({ r: pr, c: pc, air, carry, banked, trip }),
    play(kind) {
      for (let g = 0; g < 600 && !ctx.finished; g++) {
        if (kind === 'win') { const n = plan(); if (!n) break; act(n[0], n[1]); }
        else {
          const opts: [number, number][] = [[pr + 1, pc], [pr, pc + 1], [pr, pc - 1]];
          const n = opts.find(([y, x]) => y < H && x >= 0 && x < W && !grid[y][x].dug) ?? opts.find(([y, x]) => y < H && x >= 0 && x < W && y > 0 && (y !== pr || x !== pc))!;
          act(n[0], n[1]);
        }
      }
    },
  };
}
