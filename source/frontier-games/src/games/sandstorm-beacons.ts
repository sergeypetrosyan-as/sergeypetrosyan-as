import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Sandstorm Beacons: cross the dunes to the well. Your sight shrinks as the storm builds; a beacon permanently lights the ground around it. */
const N = 11, BEACON_R = 3;
const LEVELS = [{ fuel: 4, period: 9, rocks: 0.2 }, { fuel: 3, period: 7, rocks: 0.24 }, { fuel: 2, period: 5, rocks: 0.27 }];
const DIRS: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };

export default function sandstormBeacons(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let lvl = 0, rock: boolean[] = [], px = 1, py = N - 2, ex = N - 2, ey = 1, steps = 0, limit = 0, fuel = 0, beacons: [number, number][] = [], found = false, score = 0;
  let route: [number, number][] = [];

  const grid = h('div', { class: 'mw-grid sb-grid', style: { gridTemplateColumns: `repeat(${N},1fr)` }, role: 'grid', 'aria-label': 'Dune map' });
  const cells = Array.from({ length: N * N }, (_, i) => h('div', { class: 'mw-cell sb-c', 'data-i': i }));
  grid.append(...cells);
  const note = h('p', { class: 'mw-note', 'aria-live': 'polite' });
  const bBtn = h('button', { class: 'mw-btn', type: 'button', 'data-beacon': '', style: { minHeight: '48px', width: '100%', maxWidth: '380px' } }, 'Light a beacon') as HTMLButtonElement;
  const style = h('style', null, `
    .sb{width:100%;max-width:380px;display:flex;flex-direction:column;gap:8px;align-items:center}
    .sb-grid{width:100%;gap:2px}
    .sb-c{border-width:1px;border-radius:3px;cursor:pointer;font-size:clamp(.8rem,4vw,1.2rem);transition:none}
    .sb-c.fog{background:var(--mw-ink);border-color:var(--mw-night);color:transparent}
    .sb-c.sand{background:var(--mw-umber);border-color:var(--mw-saddle)}
    .sb-c.rock{background:var(--mw-mesa);color:var(--mw-tan)}
    .sb-c.lit{border-color:var(--mw-ember);box-shadow:inset 0 0 0 1px var(--mw-ember)}
    .sb-c.me{background:var(--mw-bone);color:var(--mw-ink);border-color:var(--mw-red)}
    .sb-c.well{background:var(--mw-rose);color:var(--mw-ink);border-color:var(--mw-bone)}
    .sb-c.bc{background:var(--mw-wine);color:var(--mw-bone)}
  `);
  ctx.root.append(style, h('div', { class: 'sb' }, grid, bBtn, note));

  const sight = () => Math.max(1, 4 - Math.floor(steps / LEVELS[lvl].period));
  const man = (ax: number, ay: number, bx: number, by: number) => Math.abs(ax - bx) + Math.abs(ay - by);
  const litAt = (x: number, y: number) => beacons.some(([bx, by]) => man(x, y, bx, by) <= BEACON_R);
  const bearing = () => {
    const dx = Math.sign(ex - px), dy = Math.sign(ey - py);
    return ({ '-1,-1': '↖', '0,-1': '↑', '1,-1': '↗', '-1,0': '←', '0,0': '◎', '1,0': '→', '-1,1': '↙', '0,1': '↓', '1,1': '↘' } as Record<string, string>)[`${dx},${dy}`];
  };
  function render(): void {
    const r = sight();
    cells.forEach((el, i) => {
      const x = i % N, y = Math.floor(i / N);
      const lit = litAt(x, y), vis = lit || man(x, y, px, py) <= r;
      const isMe = x === px && y === py, isWell = x === ex && y === ey, isBc = beacons.some(([bx, by]) => bx === x && by === y);
      el.className = 'mw-cell sb-c ' + (isMe ? 'me' : isBc ? 'bc' : isWell && (vis || found) ? 'well' : !vis ? 'fog' : rock[i] ? 'rock' : 'sand') + (lit ? ' lit' : '');
      el.textContent = isMe ? '◉' : isBc ? '✦' : isWell && (vis || found) ? '★' : vis && rock[i] ? '▲' : '';
    });
    bBtn.disabled = fuel <= 0 || ctx.finished;
    bBtn.textContent = `Light a beacon (${fuel} left)`;
    ctx.hud('Dune', `${lvl + 1}/${LEVELS.length}`); ctx.hud('Water', limit - steps); ctx.hud('Sight', r); ctx.hud('Well', bearing());
    note.textContent = 'Move with arrows or tap beside you. Dark ground is hidden by the storm; lit ground stays visible. The ★ is the well.';
  }
  function bfs(): [number, number][] | null {
    const prev = new Map<number, number>(); const q = [py * N + px]; prev.set(q[0], -1);
    for (let k = 0; k < q.length; k++) {
      const c = q[k], x = c % N, y = Math.floor(c / N);
      if (x === ex && y === ey) { const out: [number, number][] = []; for (let n = c; n !== -1; n = prev.get(n)!) out.unshift([n % N, Math.floor(n / N)]); return out; }
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy, ni = ny * N + nx;
        if (nx < 0 || ny < 0 || nx >= N || ny >= N || rock[ni] || prev.has(ni)) continue;
        prev.set(ni, c); q.push(ni);
      }
    }
    return null;
  }
  function newLevel(): void {
    const L = LEVELS[lvl];
    px = 1; py = N - 2; steps = 0; fuel = L.fuel; beacons = []; found = false;
    for (let tries = 0; ; tries++) {
      ex = N - 2 - Math.floor(rand() * 3); ey = 1 + Math.floor(rand() * 3);
      rock = Array.from({ length: N * N }, () => rand() < L.rocks);
      for (const [x, y] of [[px, py], [px, py - 1], [px + 1, py], [ex, ey]]) rock[y * N + x] = false;
      const p = bfs();
      if (p || tries > 80) { route = p ?? []; break; }
    }
    limit = Math.ceil((route.length - 1) * 1.8) + 6;
    render();
  }
  /** The one scoring action: step one square. */
  function move(dx: number, dy: number): void {
    if (ctx.finished) return;
    const nx = px + dx, ny = py + dy;
    if (nx < 0 || ny < 0 || nx >= N || ny >= N || rock[ny * N + nx]) { ctx.sfx('bad'); return; }
    px = nx; py = ny; steps++; ctx.sfx('tick');
    if (man(px, py, ex, ey) <= sight() || litAt(ex, ey)) found = true;
    if (px === ex && py === ey) {
      score += 300 + (limit - steps) * 5; ctx.sfx('win');
      if (lvl >= LEVELS.length - 1) { render(); ctx.finish({ result: 'win', score, title: 'Water at last', detail: `You crossed ${LEVELS.length} dunes and reached every well.` }); return; }
      lvl++; newLevel(); return;
    }
    render();
    if (steps >= limit) ctx.finish({ result: 'lose', score, title: 'The storm wins', detail: `Dune ${lvl + 1}: your water ran out ${Math.abs(man(px, py, ex, ey))} squares from the well.` });
  }
  function light(): void {
    if (ctx.finished || fuel <= 0 || beacons.some(([x, y]) => x === px && y === py)) return;
    fuel--; beacons.push([px, py]); ctx.sfx('good'); if (litAt(ex, ey)) found = true; render();
  }
  ctx.on(bBtn, 'click', () => light());
  ctx.on(grid, 'pointerdown', (e: PointerEvent) => {
    const t = (e.target as HTMLElement).closest('[data-i]') as HTMLElement | null; if (!t) return;
    const i = +t.dataset.i!, dx = (i % N) - px, dy = Math.floor(i / N) - py;
    if (dx === 0 && dy === 0) return light();
    Math.abs(dx) >= Math.abs(dy) ? move(Math.sign(dx), 0) : move(0, Math.sign(dy));
  });
  const km: Record<string, (d: boolean) => void> = { ' ': (d) => d && light(), b: (d) => d && light() };
  for (const [k, v] of Object.entries(DIRS)) km[k] = (d) => d && move(v[0], v[1]);
  ctx.keys(km);
  ctx.pad([{ key: 'ArrowUp', label: '↑' }, { key: 'ArrowLeft', label: '←' }, { key: 'ArrowDown', label: '↓' }, { key: 'ArrowRight', label: '→' }]);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); lvl = 0; score = 0; newLevel(); },
    probe: () => ({ lvl, px, py, steps, fuel, beacons: beacons.length }),
    play(kind) {
      for (let n = 0; n < 400 && !ctx.finished; n++) {
        if (kind === 'win') {
          const p = bfs(); if (!p || p.length < 2) return;
          move(p[1][0] - px, p[1][1] - py);
        } else move(n % 2 ? -1 : 1, 0);
      }
    },
  };
}
