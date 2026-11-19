import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Wagon Jam: slide wagons along their lanes in a 6x6 yard until the mail wagon rolls out of the gate on row 3. */
const N = 6, GATE_ROW = 2;
interface Car { id: number; x: number; y: number; len: number; v: boolean; mail: boolean }

export default function wagonJam(ctx: Ctx): Instance {
  let cars: Car[] = [], sol: [number, number][] = [], par = 0, limit = 0, moves = 0, sel = -1, lastId = -1, solved = false;
  const els: HTMLElement[] = [];
  const board = h('div', { class: 'wj-board', 'aria-label': 'Wagon yard' });
  const gate = h('div', { class: 'wj-gate' }, h('span', null, 'GATE'));
  const note = h('p', { class: 'mw-note', role: 'status' });
  const style = h('style', null, `
    .wj{width:100%;max-width:min(420px,62vh);display:flex;flex-direction:column;gap:10px;align-items:center}
    .wj-board{position:relative;width:100%;aspect-ratio:1;border:4px solid var(--mw-saddle);border-radius:8px;background:
      repeating-linear-gradient(0deg,transparent 0 calc(100%/6 - 1px),color-mix(in srgb,var(--mw-tan) 22%,transparent) calc(100%/6 - 1px) calc(100%/6)),
      repeating-linear-gradient(90deg,transparent 0 calc(100%/6 - 1px),color-mix(in srgb,var(--mw-tan) 22%,transparent) calc(100%/6 - 1px) calc(100%/6)),var(--mw-night);touch-action:none;user-select:none;-webkit-user-select:none}
    .wj-gate{position:absolute;right:-22px;top:calc(100%/6*2 - 2px);width:22px;height:calc(100%/6 + 4px);background:var(--mw-role-surface);border-left:0;display:grid;place-items:center;color:var(--mw-rose)}
    .wj-gate span{writing-mode:vertical-rl;font:700 .7rem var(--mw-font-slab);letter-spacing:.12em}
    .wj-car{position:absolute;display:flex;align-items:center;justify-content:center;gap:4px;margin:3px;border:2px solid var(--mw-bone);border-radius:8px;background:var(--mw-tan);color:var(--mw-ink);font:700 .8rem var(--mw-font-slab);cursor:grab;transition:left .12s,top .12s;outline-offset:2px}
    .wj-car svg{width:18px;height:18px;flex:none}
    .wj-car.mail{background:var(--mw-rose);border-color:var(--mw-bone)}
    .wj-car.sel{outline:3px solid var(--mw-bone)}
    .wj-car.drag{transition:none;z-index:2}
  `);
  ctx.root.append(style, h('div', { class: 'wj' }, h('div', { style: { paddingRight: '22px', width: '100%' } }, h('div', { style: { position: 'relative' } }, board, gate)), note));

  const occ = (skip: number): boolean[][] => { const g = Array.from({ length: N }, () => Array(N).fill(false)); for (const c of cars) if (c.id !== skip) for (let k = 0; k < c.len; k++) g[c.v ? c.y + k : c.y][c.v ? c.x : c.x + k] = true; return g; };
  const range = (c: Car): [number, number] => {
    const g = occ(c.id); let lo = 0, hi = 0;
    const at = (p: number): boolean => (c.v ? g[p][c.x] : g[c.y][p]);
    const p0 = c.v ? c.y : c.x;
    while (p0 + lo - 1 >= 0 && !at(p0 + lo - 1)) lo--;
    while (p0 + c.len + hi < N && !at(p0 + c.len + hi)) hi++;
    return [lo, hi];
  };
  const pos = (c: Car): number => (c.v ? c.y : c.x);
  function place(i: number, p = pos(cars[i])): void {
    const c = cars[i], e = els[i], u = 100 / N;
    e.style.left = `${(c.v ? c.x : p) * u}%`; e.style.top = `${(c.v ? p : c.y) * u}%`;
    e.style.width = `calc(${(c.v ? 1 : c.len) * u}% - 6px)`; e.style.height = `calc(${(c.v ? c.len : 1) * u}% - 6px)`;
  }
  function arrows(v: boolean): SVGElement {
    const t = v ? 'M12 3 L19 11 H5 Z M12 21 L19 13 H5 Z' : 'M3 12 L11 5 V19 Z M21 12 L13 5 V19 Z';
    return h('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }, h('path', { d: t, fill: 'currentColor' })) as unknown as SVGElement;
  }
  function hud(): void { ctx.hud('Moves', `${moves}/${limit}`); ctx.hud('Par', par); }
  function select(i: number): void { sel = i; els.forEach((e, k) => e.classList.toggle('sel', k === i)); }
  /** The one action: slide wagon `i` so its lead edge sits at lane position `p`. Consecutive slides of one wagon count once. */
  function slide(i: number, p: number): void {
    if (ctx.finished || solved) return;
    const c = cars[i], [lo, hi] = range(c), from = pos(c);
    const to = Math.max(from + lo, Math.min(from + hi, p));
    place(i);
    if (to === from) return;
    if (c.v) c.y = to; else c.x = to;
    if (lastId !== i) moves++;
    lastId = i; place(i); ctx.sfx('tap'); hud();
    if (c.mail && c.x + c.len === N) {
      solved = true; ctx.sfx('win');
      ctx.finish({ result: 'win', score: Math.max(100, 1000 - 60 * Math.max(0, moves - par)), title: 'Mail gets through', detail: `The gate is clear in ${moves} moves. Par was ${par}.` });
    } else if (moves >= limit) ctx.finish({ result: 'lose', score: 0, title: 'Jammed up', detail: `You ran out of the ${limit} moves allowed before the mail reached the gate.` });
  }

  function solve(cs: Car[]): [number, number][] | null {
    const key = (p: number[]): string => p.join();
    const start = cs.map(pos), seen = new Map<string, { from: string | null; mv: [number, number] | null }>([[key(start), { from: null, mv: null }]]);
    let frontier = [start];
    const mail = cs.findIndex((c) => c.mail);
    while (frontier.length && seen.size < 60000) {
      const nf: number[][] = [];
      for (const p of frontier) {
        const g = Array.from({ length: N }, () => Array(N).fill(-1));
        cs.forEach((c, i) => { for (let k = 0; k < c.len; k++) g[c.v ? p[i] + k : c.y][c.v ? c.x : p[i] + k] = i; });
        for (let i = 0; i < cs.length; i++) {
          const c = cs[i], at = (q: number): number => (c.v ? g[q][c.x] : g[c.y][q]);
          for (const dir of [-1, 1]) for (let d = 1; ; d++) {
            const q = dir < 0 ? p[i] - d : p[i] + c.len - 1 + d;
            if (q < 0 || q >= N || at(q) !== -1) break;
            const np = p.slice(); np[i] = p[i] + dir * d;
            const k = key(np);
            if (seen.has(k)) continue;
            seen.set(k, { from: key(p), mv: [i, np[i]] }); nf.push(np);
            if (i === mail && np[i] + c.len === N) {
              const out: [number, number][] = []; let cur: string | null = k;
              while (cur && seen.get(cur)!.mv) { const e: { from: string | null; mv: [number, number] | null } = seen.get(cur)!; out.push(e.mv!); cur = e.from; }
              return out.reverse();
            }
          }
        }
      }
      frontier = nf;
    }
    return null;
  }
  function build(seed: number): void {
    const rand = makeRng(seed);
    for (let t = 0; t < 120; t++) {
      cars = [{ id: 0, x: rint(rand, 0, 1), y: GATE_ROW, len: 2, v: false, mail: true }];
      const g = occ(-1); const mark = (c: Car, f: boolean): void => { for (let k = 0; k < c.len; k++) g[c.v ? c.y + k : c.y][c.v ? c.x : c.x + k] = f; };
      mark(cars[0], true);
      for (let n = 0, guard = 0; n < 9 && guard < 80; guard++) {
        const v = rand() < 0.55, len = rand() < 0.3 ? 3 : 2;
        const c: Car = { id: cars.length, v, len, x: rint(rand, 0, v ? N - 1 : N - len), y: rint(rand, 0, v ? N - len : N - 1), mail: false };
        if (!c.v && c.y === GATE_ROW) continue;
        let ok = true; for (let k = 0; k < len; k++) if (g[c.v ? c.y + k : c.y][c.v ? c.x : c.x + k]) ok = false;
        if (ok) { cars.push(c); mark(c, true); n++; }
      }
      const s: [number, number][] | null = solve(cars);
      if (s && s.length >= 6 && s.length <= 14) { sol = s; par = mergedMoves(s); if (par >= 6) return; }
    }
    // fallback: a hand-built yard
    cars = [{ id: 0, x: 0, y: 2, len: 2, v: false, mail: true }, { id: 1, x: 2, y: 1, len: 3, v: true, mail: false }, { id: 2, x: 3, y: 2, len: 2, v: true, mail: false }, { id: 3, x: 4, y: 0, len: 3, v: true, mail: false }];
    sol = solve(cars) ?? []; par = mergedMoves(sol);
  }
  const mergedMoves = (s: [number, number][]): number => s.filter((m, i) => i === 0 || s[i - 1][0] !== m[0]).length;

  function mount(): void {
    board.replaceChildren(); els.length = 0;
    cars.forEach((c, i) => {
      const e = h('div', { class: `wj-car${c.mail ? ' mail' : ''}`, tabindex: 0, role: 'button', 'data-car': i, 'aria-label': c.mail ? 'Mail wagon' : `Wagon ${i}, slides ${c.v ? 'up and down' : 'left and right'}`, onclick: () => select(i), onfocus: () => select(i) },
        c.mail ? 'MAIL' : null, arrows(c.v));
      els.push(e); board.append(e); place(i);
    });
  }
  let drag: { i: number; start: number; px: number; lo: number; hi: number } | null = null;
  ctx.drag(board, {
    down(x, y) {
      const u = board.clientWidth / N, cx = Math.floor(x / u), cy = Math.floor(y / u);
      const i = cars.findIndex((c) => cx >= c.x && cx < c.x + (c.v ? 1 : c.len) && cy >= c.y && cy < c.y + (c.v ? c.len : 1));
      if (i < 0 || ctx.finished) return;
      const [lo, hi] = range(cars[i]); select(i); els[i].classList.add('drag');
      drag = { i, start: pos(cars[i]), px: cars[i].v ? y : x, lo, hi };
    },
    move(x, y) {
      if (!drag) return;
      const u = board.clientWidth / N, d = ((cars[drag.i].v ? y : x) - drag.px) / u;
      place(drag.i, drag.start + Math.max(drag.lo, Math.min(drag.hi, d)));
    },
    up(x, y) {
      if (!drag) return;
      const { i } = drag, u = board.clientWidth / N, d = Math.round(((cars[i].v ? y : x) - drag.px) / u);
      els[i].classList.remove('drag'); const s = drag.start; drag = null; slide(i, s + d);
    },
  });
  const dirKey = (dx: number, dy: number) => (down: boolean): void => {
    if (!down || sel < 0) return; const c = cars[sel];
    if ((dx !== 0) === !c.v) slide(sel, pos(c) + dx + dy);
  };
  ctx.keys({ ArrowLeft: dirKey(-1, 0), ArrowRight: dirKey(1, 0), ArrowUp: dirKey(0, -1), ArrowDown: dirKey(0, 1) });

  return {
    destroy() { /* released by the shell */ },
    reset(seed) {
      build(seed); moves = 0; sel = -1; lastId = -1; solved = false; drag = null; limit = par + 10;
      mount(); hud();
      note.textContent = 'Drag a wagon along its lane (or select it and use the arrow keys). Roll the MAIL wagon out of the gate.';
    },
    probe: () => ({ sel, moves, cars: cars.map((c) => pos(c)).join('') }),
    play(kind) {
      if (kind === 'win') { for (const [i, p] of sol) slide(i, p); return; }
      for (let g = 0; g < 400 && !ctx.finished; g++) {
        const i = cars.findIndex((c, k) => !c.mail && k !== lastId && (range(c)[0] < 0 || range(c)[1] > 0));
        if (i < 0) { lastId = -1; continue; }
        const [lo, hi] = range(cars[i]); slide(i, pos(cars[i]) + (hi > 0 ? 1 : lo));
      }
    },
  };
}
