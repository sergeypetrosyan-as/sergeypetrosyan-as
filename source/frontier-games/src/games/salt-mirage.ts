import { h } from '../core/dom';
import { makeRng, rint, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Salt Mirage: several pools shimmer on the flat, only one is water. Step on sign posts to read where they point; the true signs all agree, the lies do not. */
const FLATS = [{ s: 6, pools: 3, truth: 3, lies: 1 }, { s: 7, pools: 4, truth: 3, lies: 2 }, { s: 8, pools: 5, truth: 4, lies: 3 }];
const MIRAGE_COST = 4;
const ARROW: Record<string, string> = { '0,-1': '↑', '1,-1': '↗', '1,0': '→', '1,1': '↘', '0,1': '↓', '-1,1': '↙', '-1,0': '←', '-1,-1': '↖' };
const DIRS = Object.keys(ARROW).map((k) => k.split(',').map(Number) as [number, number]);

interface Pool { x: number; y: number; real: boolean; gone: boolean }
interface Sign { x: number; y: number; d: [number, number]; pool: number; truth: boolean; read: boolean }

export default function saltMirage(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let flat = 0, S = 6, steps = 0, score = 0, adv = -1, px = 0, py = 0;
  let pools: Pool[] = [], signs: Sign[] = [], trail = new Set<string>();

  const grid = h('div', { class: 'sm-grid' });
  const rays = h('svg', { class: 'sm-rays', 'aria-hidden': 'true' });
  const board = h('div', { class: 'sm-board' }, grid, rays);
  const note = h('p', { class: 'mw-note', role: 'status' });
  const style = h('style', null, `
    .sm{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:8px}
    .sm-board{position:relative;width:100%;aspect-ratio:1;border:2px solid var(--mw-ember);border-radius:10px;background:linear-gradient(var(--mw-night),var(--mw-dusk));padding:4px;box-sizing:border-box}
    .sm-grid{position:absolute;inset:4px;display:grid;gap:2px}.sm-rays{position:absolute;inset:4px;width:calc(100% - 8px);height:calc(100% - 8px);pointer-events:none}
    .sm-c{position:relative;border:1px solid var(--mw-umber);border-radius:5px;background:color-mix(in srgb,var(--mw-tan) 14%,var(--mw-night));color:var(--mw-smoke);font:700 clamp(.9rem,4.4vw,1.4rem)/1 var(--mw-font-slab);padding:0;cursor:pointer;display:grid;place-items:center;min-width:0;min-height:0}
    .sm-c.trail{background:color-mix(in srgb,var(--mw-tan) 26%,var(--mw-night))}
    .sm-c.sign{color:var(--mw-bone);border-color:var(--mw-saddle)}.sm-c.sign:not(.read)::after{content:'';position:absolute;inset:3px;border:1px dashed var(--mw-ash);border-radius:4px;animation:smsh 1.6s ease-in-out infinite}
    .sm-c.sign.read{background:var(--mw-wine);border-color:var(--mw-rose);color:var(--mw-bone)}
    .sm-c.pool{color:var(--mw-rose);border:2px solid var(--mw-rose);background:var(--mw-night);animation:smsh 1.8s ease-in-out infinite}
    .sm-c.gone{color:var(--mw-red);border:2px dashed var(--mw-red);animation:none}
    .sm-c.me{outline:3px solid var(--mw-bone);outline-offset:-3px;z-index:2;color:var(--mw-white);font-size:1.7rem}
    @keyframes smsh{0%,100%{opacity:1}50%{opacity:.55}}
    @media (prefers-reduced-motion:reduce){.sm-c,.sm-c::after{animation:none!important}}
    .sm-key{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;font:600 .82rem var(--mw-font-slab);color:var(--mw-ash)}
  `);
  ctx.root.append(style, h('div', { class: 'sm' }, board, h('div', { class: 'sm-key' }, h('span', null, '✦ sign post'), h('span', null, '◎ shimmering pool'), h('span', null, '● you')), note));

  const free = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < S && y < S && !pools.some((p) => p.x === x && p.y === y) && !signs.some((s) => s.x === x && s.y === y) && !(x === Math.floor(S / 2) && y === S - 1);
  const poolAt = (x: number, y: number): Pool | undefined => pools.find((p) => p.x === x && p.y === y);
  function pathTo(x0: number, y0: number, x1: number, y1: number): [number, number][] | null {
    const prev = new Map<string, string>([[`${x0},${y0}`, '']]); let q: [number, number][] = [[x0, y0]];
    while (q.length) {
      const nq: [number, number][] = [];
      for (const [x, y] of q) {
        if (x === x1 && y === y1) { const out: [number, number][] = []; let k = `${x},${y}`; while (prev.get(k)) { const [a, b] = k.split(',').map(Number); out.unshift([a, b]); k = prev.get(k)!; } return out; }
        for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
          const nx = x + dx, ny = y + dy, k = `${nx},${ny}`;
          if (nx < 0 || ny < 0 || nx >= S || ny >= S || prev.has(k)) continue;
          const p = poolAt(nx, ny); if (p && !(nx === x1 && ny === y1)) continue;
          prev.set(k, `${x},${y}`); nq.push([nx, ny]);
        }
      }
      q = nq;
    }
    return null;
  }
  const dist = (a: { x: number; y: number }, b: { x: number; y: number }): number => pathTo(a.x, a.y, b.x, b.y)?.length ?? 99;

  function hud(): void { ctx.hud('Flat', `${flat + 1}/${FLATS.length}`); ctx.hud('Canteen', steps); ctx.hud('Score', score); }
  function render(): void {
    const cells: HTMLElement[] = [];
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const p = poolAt(x, y), sg = signs.find((s) => s.x === x && s.y === y), me = x === px && y === py;
      const cls = ['sm-c', trail.has(`${x},${y}`) ? 'trail' : '', sg ? `sign${sg.read ? ' read' : ''}` : '', p ? `pool${p.gone ? ' gone' : ''}` : '', me ? 'me' : ''].filter(Boolean).join(' ');
      const label = me ? 'You' : p ? (p.gone ? 'Dissolved mirage' : 'Shimmering pool') : sg ? (sg.read ? `Sign pointing ${ARROW[sg.d.join(',')]}` : 'Unread sign') : 'Salt';
      cells.push(h('button', { class: cls, type: 'button', 'data-x': x, 'data-y': y, 'aria-label': `${label}, column ${x + 1} row ${y + 1}`, onclick: () => goTo(x, y) }, me ? '●' : p ? (p.gone ? '✕' : '◎') : sg ? (sg.read ? ARROW[sg.d.join(',')] : '✦') : ''));
    }
    grid.style.gridTemplateColumns = `repeat(${S},1fr)`; grid.style.gridTemplateRows = `repeat(${S},1fr)`;
    grid.replaceChildren(...cells);
    rays.setAttribute('viewBox', `0 0 ${S} ${S}`); rays.setAttribute('preserveAspectRatio', 'none');
    rays.replaceChildren(...signs.filter((s) => s.read).map((s) => { const p = pools[s.pool]; return h('line', { x1: s.x + 0.5, y1: s.y + 0.5, x2: p.x + 0.5, y2: p.y + 0.5, stroke: 'var(--mw-rose)', 'stroke-width': 0.07, 'stroke-dasharray': '0.15 0.2', 'stroke-linecap': 'round' }); }));
  }
  function build(): void {
    const cfg = FLATS[flat]; S = cfg.s; adv = -1; trail = new Set();
    for (let attempt = 0; attempt < 400; attempt++) {
      pools = []; signs = []; px = Math.floor(S / 2); py = S - 1;
      for (let guard = 0; pools.length < cfg.pools && guard < 200; guard++) {
        const x = rint(rand, 0, S - 1), y = rint(rand, 0, S - 2);
        if (pools.every((p) => Math.max(Math.abs(p.x - x), Math.abs(p.y - y)) >= 2)) pools.push({ x, y, real: false, gone: false });
      }
      if (pools.length < cfg.pools) continue;
      pools[rint(rand, 0, pools.length - 1)].real = true;
      const real = pools.findIndex((p) => p.real), decoys = pools.map((_, i) => i).filter((i) => i !== real);
      const targets = [...Array(cfg.truth).fill(real), ...Array.from({ length: cfg.lies }, (_, i) => decoys[i % decoys.length])];
      let ok = true;
      for (const t of targets) {
        const options: Sign[] = [], P = pools[t];
        for (const d of shuffle(rand, DIRS)) for (let k = 2; k <= S; k++) {
          const x = P.x - d[0] * k, y = P.y - d[1] * k;
          if (!free(x, y)) continue;
          let clear = true; for (let j = 1; j < k; j++) if (poolAt(P.x - d[0] * j, P.y - d[1] * j)) clear = false;
          if (clear) options.push({ x, y, d, pool: t, truth: t === real, read: false });
        }
        if (!options.length) { ok = false; break; }
        signs.push(options[rint(rand, 0, options.length - 1)]);
      }
      if (!ok) continue;
      const me = { x: px, y: py }, tr = signs.filter((s) => s.truth);
      let best = 99;
      for (const a of tr) for (const b of tr) if (a !== b) best = Math.min(best, dist(me, a) + dist(a, b) + dist(b, pools[real]));
      if (best >= 99) continue;
      steps = Math.ceil(best * 1.45) + 5 + flat * 2;
      break;
    }
    note.textContent = 'Tap a tile (or use arrows) to walk. Step on a ✦ sign to read where it points. Signs that lead to the same pool can be trusted.';
    render(); hud();
  }
  /** One step onto a neighbouring tile; reads signs and tests pools. */
  function step(dx: number, dy: number): boolean {
    if (ctx.finished || adv >= 0) return false;
    const x = px + dx, y = py + dy;
    if (x < 0 || y < 0 || x >= S || y >= S) return false;
    px = x; py = y; steps--; trail.add(`${x},${y}`); ctx.sfx('tick');
    const p = poolAt(x, y), sg = signs.find((s) => s.x === x && s.y === y);
    if (sg && !sg.read) { sg.read = true; note.textContent = `The sign points ${ARROW[sg.d.join(',')]}. A dotted line follows it.`; }
    if (p && !p.gone) {
      if (p.real) { score += 300 + steps * 10; ctx.sfx('good'); note.textContent = 'Real water!'; adv = 0; hud(); render(); return true; }
      p.gone = true; steps -= MIRAGE_COST; ctx.sfx('bad'); note.textContent = `A mirage! It dissolves and costs ${MIRAGE_COST} steps of water.`;
    }
    hud(); render();
    if (steps <= 0) ctx.finish({ result: 'lose', score, title: 'The canteen ran dry', detail: `You ran out of water on flat ${flat + 1}. Trust the signs that agree.` });
    return true;
  }
  /** Tap action: walk the shortest path (around pools) to a tile, stopping if the run ends. */
  function goTo(x: number, y: number): void {
    const path = pathTo(px, py, x, y);
    if (!path) return;
    for (const [nx, ny] of path) { if (!step(nx - px, ny - py) || ctx.finished || adv >= 0) break; if (poolAt(nx, ny)?.gone && !(nx === x && ny === y)) break; }
  }
  function update(dt: number): void {
    if (adv < 0 || ctx.finished) return;
    adv += dt;
    if (adv > 1) { flat++; if (flat >= FLATS.length) { flat = FLATS.length - 1; adv = -1; ctx.finish({ result: 'win', score, title: 'Water at last', detail: 'You found the real water on all three flats.' }); } else build(); }
  }
  ctx.keys({ ArrowUp: (d) => d && step(0, -1), ArrowDown: (d) => d && step(0, 1), ArrowLeft: (d) => d && step(-1, 0), ArrowRight: (d) => d && step(1, 0) });
  ctx.pad([{ key: 'ArrowLeft', label: '←' }, { key: 'ArrowUp', label: '↑' }, { key: 'ArrowDown', label: '↓' }, { key: 'ArrowRight', label: '→' }]);
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); flat = 0; score = 0; build(); },
    probe: () => ({ flat, x: px, y: py, steps, read: signs.filter((s) => s.read).length, gone: pools.filter((p) => p.gone).length }),
    play(kind: Result) {
      for (let guard = 0; guard < 600 && !ctx.finished; guard++) {
        if (adv >= 0) { update(1 / 60); continue; }
        if (kind === 'win') {
          const real = pools.find((p) => p.real)!, me = { x: px, y: py }, tr = signs.filter((s) => s.truth);
          let bestPair: Sign[] = [], best = 99;
          for (const a of tr) for (const b of tr) if (a !== b && dist(me, a) + dist(a, b) < best) { best = dist(me, a) + dist(a, b); bestPair = [a, b]; }
          bestPair.forEach((s) => goTo(s.x, s.y)); goTo(real.x, real.y);
        } else {
          const decoy = pools.find((p) => !p.real && !p.gone);
          if (decoy) goTo(decoy.x, decoy.y);
          else { const dx = px + 1 < S && !poolAt(px + 1, py)?.real ? 1 : -1; step(dx, 0); step(-dx, 0); }
        }
      }
    },
  };
}
