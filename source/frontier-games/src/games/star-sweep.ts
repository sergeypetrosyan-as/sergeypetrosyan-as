import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Star Sweep: minesweeper in the night sky. Numbers count neighbouring hidden stars. Clear three skies. */
const SKIES = [{ n: 5, stars: 4 }, { n: 6, stars: 7 }, { n: 7, stars: 10 }];

interface Cell { mine: boolean; adj: number; open: boolean; mark: boolean }

export default function starSweep(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let sky = 0, score = 0, time = 0, started = false, marking = false, cells: Cell[] = [], btns: HTMLButtonElement[] = [];
  let longFired = false, pressTok = 0;
  const N = (): number => SKIES[sky].n;

  const grid = h('div', { class: 'ss-grid', role: 'grid', 'aria-label': 'Night sky' });
  const modeBtn = h('button', { class: 'mw-chip', type: 'button', 'aria-pressed': 'false', 'data-mode': '' }, 'Mode: Reveal');
  const note = h('p', { class: 'mw-note ss-note', role: 'status' });
  const style = h('style', null, `
    .ss-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:420px;margin:auto}
    .ss-grid{display:grid;gap:4px;width:100%;padding:8px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised)}
    .ss-cell{aspect-ratio:1;min-width:44px;min-height:0;padding:0;border-radius:6px;border:2px solid var(--mw-mesa);background:var(--mw-dusk);color:var(--mw-bone);font:700 1.15rem/1 var(--mw-font-slab);cursor:pointer;touch-action:manipulation}
    .ss-cell.open{background:var(--mw-night);border-color:var(--mw-night);cursor:default}
    .ss-cell.open[data-n="0"]{color:transparent}
    .ss-cell.mark{background:var(--mw-wine);border-color:var(--mw-rose);color:var(--mw-rose)}
    .ss-cell.boom{background:var(--mw-red);color:var(--mw-white);border-color:var(--mw-bone)}
    .ss-cell.shown{border-color:var(--mw-rose);color:var(--mw-rose)}
    .ss-note{min-height:2.4em;text-align:center}
  `);
  ctx.root.append(style, h('div', { class: 'ss-wrap' }, grid, h('div', { class: 'mw-row' }, modeBtn), note));

  const nb = (i: number): number[] => {
    const n = N(), x = i % n, y = (i / n) | 0, out: number[] = [];
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const a = x + dx, b = y + dy;
      if ((dx || dy) && a >= 0 && b >= 0 && a < n && b < n) out.push(b * n + a);
    }
    return out;
  };
  function hud(): void {
    ctx.hud('Sky', `${sky + 1}/${SKIES.length}`);
    ctx.hud('Stars left', SKIES[sky].stars - cells.filter((c) => c.mark).length);
    ctx.hud('Time', Math.floor(time) + 's');
  }
  function paint(i: number, reveal = false): void {
    const c = cells[i], b = btns[i];
    b.className = 'ss-cell' + (c.open ? ' open' : c.mark ? ' mark' : '') + (reveal && c.mine && !c.open ? ' shown' : '');
    b.dataset.n = String(c.adj);
    b.textContent = c.open ? (c.mine ? '✹' : String(c.adj)) : c.mark ? '★' : reveal && c.mine ? '★' : '';
    b.setAttribute('aria-label', `Cell ${(i % N()) + 1},${((i / N()) | 0) + 1}: ${c.open ? (c.mine ? 'star' : c.adj + ' neighbouring stars') : c.mark ? 'marked' : 'hidden'}`);
  }
  function build(): void {
    const n = N();
    started = false; time = 0;
    cells = Array.from({ length: n * n }, () => ({ mine: false, adj: 0, open: false, mark: false }));
    grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    grid.replaceChildren();
    btns = cells.map((_, i) => {
      const b = h('button', { class: 'ss-cell', type: 'button' }) as HTMLButtonElement;
      b.addEventListener('pointerdown', () => { longFired = false; const tok = ++pressTok; ctx.after(420, () => { if (tok === pressTok) { longFired = true; toggleMark(i); } }); });
      for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) b.addEventListener(ev, () => { pressTok++; });
      b.addEventListener('click', () => { if (longFired) { longFired = false; return; } press(i); });
      b.addEventListener('contextmenu', (e) => { e.preventDefault(); longFired = false; toggleMark(i); });
      grid.append(b);
      return b;
    });
    cells.forEach((_, i) => paint(i));
    note.textContent = 'Tap a cell to uncover it. A number counts the stars touching it. Hold, or use Mode, to mark a star.';
    hud();
  }
  function place(safe: number): void {
    const ban = new Set([safe, ...nb(safe)]);
    const pool = shuffle(rand, cells.map((_, i) => i).filter((i) => !ban.has(i)));
    pool.slice(0, SKIES[sky].stars).forEach((i) => { cells[i].mine = true; });
    cells.forEach((c, i) => { c.adj = nb(i).filter((j) => cells[j].mine).length; });
    started = true;
  }
  function flood(i: number): void {
    const stack = [i];
    while (stack.length) {
      const k = stack.pop()!, c = cells[k];
      if (c.open || c.mark) continue;
      c.open = true; paint(k);
      if (c.adj === 0 && !c.mine) stack.push(...nb(k));
    }
  }
  function lose(i: number): void {
    cells.forEach((_, k) => paint(k, true));
    btns[i].className = 'ss-cell open boom'; btns[i].textContent = '✹';
    ctx.sfx('bad');
    ctx.finish({ result: 'lose', score, title: 'A star burned you', detail: `You touched a hidden star on sky ${sky + 1}. Clue numbers tell where they are not.` });
  }
  function checkClear(): void {
    if (cells.some((c) => !c.mine && !c.open)) return;
    score += 300 + Math.max(0, 200 - Math.floor(time)) + sky * 100;
    ctx.sfx('good');
    if (sky + 1 >= SKIES.length) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'The sky is clear', detail: `All ${SKIES.length} skies swept without a burn.` }); return; }
    sky++; build();
  }
  /** Main action: uncover a cell (or chord a satisfied number). */
  function reveal(i: number): void {
    if (ctx.finished) return;
    const c = cells[i];
    if (marking && !c.open) { toggleMark(i); return; }
    if (c.mark) return;
    if (c.open) {
      const around = nb(i);
      if (c.adj > 0 && around.filter((j) => cells[j].mark).length === c.adj) {
        for (const j of around) { if (!cells[j].open && !cells[j].mark) { if (cells[j].mine) { lose(j); return; } flood(j); } }
        hud(); checkClear();
      }
      return;
    }
    if (!started) place(i);
    if (c.mine) { lose(i); return; }
    ctx.sfx('tap'); flood(i); hud(); checkClear();
  }
  function press(i: number): void { reveal(i); }
  function toggleMark(i: number): void {
    if (ctx.finished || cells[i].open) return;
    cells[i].mark = !cells[i].mark; paint(i); ctx.sfx('tap'); hud();
  }
  modeBtn.addEventListener('click', () => {
    marking = !marking; modeBtn.setAttribute('aria-pressed', String(marking));
    modeBtn.textContent = marking ? 'Mode: Mark stars' : 'Mode: Reveal';
  });
  ctx.loop((dt) => { if (started && !ctx.finished) { time += dt; if (Math.floor(time) !== Math.floor(time - dt)) hud(); } }, () => {});

  return {
    destroy() { /* released by the shell */ },
    reset(seed) { rand = makeRng(seed); sky = 0; score = 0; marking = false; modeBtn.setAttribute('aria-pressed', 'false'); modeBtn.textContent = 'Mode: Reveal'; build(); },
    probe: () => ({ sky, score, open: cells.filter((c) => c.open).length, marks: cells.filter((c) => c.mark).length }),
    play(kind: Result) {
      for (let g = 0; g < 10 && !ctx.finished; g++) {
        const mid = Math.floor(cells.length / 2);
        reveal(mid);
        if (ctx.finished) break;
        if (kind === 'lose') { const m = cells.findIndex((c) => c.mine); reveal(m); break; }
        for (let i = 0; i < cells.length && !ctx.finished; i++) if (!cells[i].mine && !cells[i].open) reveal(i);
      }
    },
  };
}
