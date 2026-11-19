import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Program the Courier: queue Forward / Left / Right / Again cards, run them, and collect every parcel before the post office. */
const CFG = [
  { n: 5, walls: 4, parcels: 1, lo: 6, hi: 9 },
  { n: 6, walls: 7, parcels: 2, lo: 9, hi: 13 },
  { n: 7, walls: 10, parcels: 2, lo: 12, hi: 16 },
];
const RUNS = 4;
const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0];
const GLYPH: Record<string, string> = { F: '↑', L: '↶', R: '↷', A: '⟳' };
const WORD: Record<string, string> = { F: 'Forward', L: 'Left', R: 'Right', A: 'Again' };

interface Town { n: number; walls: Set<number>; start: number; face: number; goal: number; parcels: number[]; par: number; sol: string }
interface Pos { c: number; d: number; got: number }

function step(m: Town, p: Pos, a: string): Pos | null {
  if (a === 'L') return { ...p, d: (p.d + 3) % 4 };
  if (a === 'R') return { ...p, d: (p.d + 1) % 4 };
  const x = (p.c % m.n) + DX[p.d], y = Math.floor(p.c / m.n) + DY[p.d];
  if (x < 0 || y < 0 || x >= m.n || y >= m.n || m.walls.has(x + y * m.n)) return null;
  const c = x + y * m.n, k = m.parcels.indexOf(c);
  return { c, d: p.d, got: k >= 0 ? p.got | (1 << k) : p.got };
}
function solve(m: Town): string | null {
  const full = (1 << m.parcels.length) - 1, key = (p: Pos) => (p.c * 4 + p.d) * 8 + p.got;
  const from = new Map<number, [number, string]>();
  const s0: Pos = { c: m.start, d: m.face, got: 0 };
  from.set(key(s0), [-1, '']);
  let q = [s0];
  while (q.length) {
    const nq: Pos[] = [];
    for (const p of q) {
      if (p.c === m.goal && p.got === full) { let out = '', k = key(p); while (from.get(k)![0] >= 0) { out = from.get(k)![1] + out; k = from.get(k)![0]; } return out; }
      for (const a of ['F', 'L', 'R']) { const r = step(m, p, a); if (r && !from.has(key(r))) { from.set(key(r), [key(p), a]); nq.push(r); } }
    }
    q = nq;
  }
  return null;
}
function makeMap(rand: () => number, lv: number): Town {
  const cfg = CFG[lv], area = cfg.n * cfg.n;
  let best: Town | null = null;
  for (let t = 0; t < 4000; t++) {
    const cells = Array.from({ length: area }, (_, i) => i);
    const take = () => cells.splice(Math.floor(rand() * cells.length), 1)[0];
    const start = take(), goal = take(), parcels = Array.from({ length: cfg.parcels }, take);
    const walls = new Set(Array.from({ length: cfg.walls }, take));
    const m: Town = { n: cfg.n, walls, start, face: rint(rand, 0, 3), goal, parcels, par: 0, sol: '' };
    const s = solve(m);
    if (!s) continue;
    m.sol = s; m.par = s.length;
    best = m;
    if (s.length >= cfg.lo && s.length <= cfg.hi) return m;
  }
  return best!;
}

export default function programCourier(ctx: Ctx): Instance {
  let rand = makeRng(1);
  type Phase = 'edit' | 'run' | 'fail' | 'ok';
  let phase: Phase = 'edit';
  let level = 0, score = 0, runs = RUNS, t = 0, si = 0, badges = 0;
  let map: Town = makeMap(makeRng(1), 0);
  let prog: string[] = [], pos: Pos = { c: 0, d: 0, got: 0 };
  let steps: { a: string; card: number }[] = [];
  let msg = '';

  const board = h('div', { class: 'pc-board', 'aria-label': 'Map' });
  const strip = h('div', { class: 'pc-strip' });
  const note = h('p', { class: 'mw-note', role: 'status', style: { minHeight: '2.6em', margin: 0 } });
  const palette = h('div', { class: 'pc-pal' }, ...['F', 'L', 'R', 'A'].map((a) => h('button', { class: 'pc-card', type: 'button', 'data-card': a, onclick: () => addCard(a) }, h('b', null, GLYPH[a]), h('span', null, WORD[a]))));
  const run = h('button', { class: 'mw-btn primary', type: 'button', 'data-run': '', onclick: () => runProg() }, 'Run');
  const clear = h('button', { class: 'mw-btn', type: 'button', onclick: () => clearProg() }, 'Clear');
  const style = h('style', null, `
    .pc{width:100%;max-width:440px;display:flex;flex-direction:column;gap:8px;align-items:center}
    .pc-board{width:100%;display:grid;gap:2px;padding:5px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-ink)}
    .pc-c{aspect-ratio:1;border-radius:4px;background:var(--mw-night);border:1px solid var(--mw-umber);display:grid;place-items:center;position:relative}
    .pc-c svg{width:100%;height:100%}
    .pc-strip{width:100%;display:grid;grid-template-columns:repeat(auto-fill,minmax(44px,1fr));gap:4px}
    .pc-s{min-height:44px;border-radius:8px;border:2px dashed var(--mw-mesa);background:var(--mw-night);color:var(--mw-bone);font:700 1.1rem var(--mw-font-slab);display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;cursor:pointer;padding:0}
    .pc-s small{font:600 .6rem var(--mw-font-slab);color:var(--mw-ash)}
    .pc-s.f{border-style:solid;border-color:var(--mw-tan);background:var(--mw-saddle)}
    .pc-s.now{border-color:var(--mw-bone);background:var(--mw-rose);color:var(--mw-ink)}
    .pc-s.now small{color:var(--mw-ink)}
    .pc-pal{width:100%;display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
    .pc-card{min-height:52px;border-radius:8px;border:2px solid var(--mw-ember);background:var(--mw-dusk);color:var(--mw-bone);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
    .pc-card b{font-size:1.3rem;line-height:1}.pc-card span{font:600 .72rem var(--mw-font-slab)}
    .pc-ctl{width:100%;display:grid;grid-template-columns:2fr 1fr;gap:8px}
  `);
  ctx.root.append(style, h('div', { class: 'pc' }, board, strip, palette, h('div', { class: 'pc-ctl' }, run, clear), note));

  const limit = () => map.par + 2;
  function cellArt(i: number): string {
    if (map.walls.has(i)) return `<polygon points="12,82 30,36 46,58 62,26 88,82" fill="var(--mw-ink)" stroke="var(--mw-tan)" stroke-width="5" stroke-linejoin="round"/><path d="M40 70 L60 54" stroke="var(--mw-tan)" stroke-width="4"/>`;
    let s = '';
    if (i === map.start) s += `<circle cx="50" cy="50" r="38" fill="none" stroke="var(--mw-ash)" stroke-width="4" stroke-dasharray="8 7"/>`;
    if (i === map.goal) s += `<rect x="20" y="46" width="60" height="38" fill="var(--mw-saddle)" stroke="var(--mw-tan)" stroke-width="5"/><polygon points="12,48 50,18 88,48" fill="var(--mw-wine)" stroke="var(--mw-bone)" stroke-width="5" stroke-linejoin="round"/><rect x="42" y="60" width="16" height="24" fill="var(--mw-night)"/>`;
    const k = map.parcels.indexOf(i);
    if (k >= 0 && !(pos.got & (1 << k))) s += `<polygon points="50,14 60,38 86,38 65,54 73,80 50,64 27,80 35,54 14,38 40,38" fill="var(--mw-rose)" stroke="var(--mw-bone)" stroke-width="4" stroke-linejoin="round"/>`;
    if (i === pos.c) s += `<g transform="rotate(${pos.d * 90} 50 50)"><circle cx="50" cy="50" r="34" fill="var(--mw-night)" stroke="var(--mw-bone)" stroke-width="5"/><polygon points="50,20 70,64 50,54 30,64" fill="var(--mw-bone)" stroke="var(--mw-ink)" stroke-width="3" stroke-linejoin="round"/></g>`;
    return s;
  }
  function render(): void {
    board.style.gridTemplateColumns = `repeat(${map.n},1fr)`;
    board.replaceChildren(...Array.from({ length: map.n * map.n }, (_, i) => h('div', { class: 'pc-c', 'data-i': i }, (() => { const e = h('span', { style: { display: 'contents' } }); e.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true">${cellArt(i)}</svg>`; return e; })())));
    const cur = phase === 'run' ? steps[si]?.card ?? -1 : -1;
    strip.replaceChildren(...Array.from({ length: limit() }, (_, i) => prog[i] ? h('button', { class: 'pc-s f' + (i === cur ? ' now' : ''), type: 'button', 'aria-label': `Remove card ${i + 1}: ${WORD[prog[i]]}`, onclick: () => removeCard(i) }, GLYPH[prog[i]], h("small", null, String(i + 1))) : h('div', { class: 'pc-s', 'aria-hidden': 'true' }, h('small', null, String(i + 1)))));
    note.textContent = msg;
    (run as HTMLButtonElement).disabled = phase !== 'edit' || !prog.length;
    ctx.hud('Map', `${level + 1}/${CFG.length}`); ctx.hud('Cards', `${prog.length}/${limit()}`); ctx.hud('Runs left', runs); ctx.hud('Score', score);
  }
  function resetCourier(): void { pos = { c: map.start, d: map.face, got: 0 }; }
  function startLevel(): void {
    map = makeMap(rand, level); prog = []; runs = RUNS; phase = 'edit'; resetCourier();
    msg = `Collect ${map.parcels.length === 1 ? 'the parcel ★' : 'both parcels ★'}, then end the program on the post office. Dashed ring: start.`;
    render();
  }
  function addCard(a: string): void { if (ctx.finished || phase !== 'edit' || prog.length >= limit()) return; prog.push(a); ctx.sfx('tap'); render(); }
  function removeCard(i: number): void { if (ctx.finished || phase !== 'edit') return; prog.splice(i, 1); render(); }
  function clearProg(): void { if (ctx.finished || phase !== 'edit') return; prog = []; render(); }
  /** The one scoring action: run the whole program. */
  function runProg(): void {
    if (ctx.finished || phase !== 'edit' || !prog.length) return;
    steps = []; let last = '';
    prog.forEach((c, card) => { if (c === 'A') { if (last) steps.push({ a: last, card }); } else { steps.push({ a: c, card }); last = c; } });
    resetCourier(); phase = 'run'; si = 0; t = 0; msg = 'Running…'; render();
  }
  function fail(why: string): void {
    runs--; phase = 'fail'; t = 0; ctx.sfx('bad'); msg = why; render();
  }
  function update(dt: number): void {
    t += dt;
    if (phase === 'run' && t >= 0.3) {
      t = 0;
      if (si >= steps.length) {
        if (pos.c === map.goal && pos.got === (1 << map.parcels.length) - 1) {
          const used = prog.length, gold = used <= map.par; if (gold) badges++;
          score += 300 + (limit() - used) * 20 + (gold ? 150 : 0);
          phase = 'ok'; ctx.sfx('good'); msg = `Delivered with ${used} cards${gold ? ': gold badge' : ''}.`; render();
        } else fail(pos.got === (1 << map.parcels.length) - 1 ? 'The program ended away from the post office.' : 'The program ended with parcels still out on the map.');
        return;
      }
      const r = step(map, pos, steps[si].a);
      if (!r) { fail('The courier bumped into a rock or the edge of the map.'); return; }
      pos = r; si++; ctx.sfx('tick'); render();
    } else if (phase === 'fail' && t > 1.0) {
      if (runs <= 0) { ctx.finish({ result: 'lose', score, title: 'The mail is late', detail: `Out of runs on map ${level + 1}.` }); return; }
      phase = 'edit'; resetCourier(); msg = `${runs} run${runs === 1 ? '' : 's'} left. Edit the cards and try again.`; render();
    } else if (phase === 'ok' && t > 1.1) {
      if (level >= CFG.length - 1) ctx.finish({ result: 'win', score, title: 'Mail delivered', detail: `All ${CFG.length} maps cleared with ${badges} gold badge${badges === 1 ? '' : 's'}.` });
      else { level++; startLevel(); }
    }
  }
  ctx.keys({ ArrowUp: (d) => d && addCard('F'), ArrowLeft: (d) => d && addCard('L'), ArrowRight: (d) => d && addCard('R'), a: (d) => d && addCard('A'), Enter: (d) => d && runProg(), Backspace: (d) => d && removeCard(prog.length - 1) });
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); level = 0; score = 0; badges = 0; startLevel(); },
    probe: () => ({ level, prog: prog.join(''), runs, phase, pos: pos.c, step: si, score }),
    play(kind: Result) {
      for (let g = 0; g < 200 && !ctx.finished; g++) {
        const lv = level;
        if (phase !== 'edit') { update(1 / 60); continue; }
        if (kind === 'win') map.sol.split('').forEach((a) => addCard(a)); else { clearProg(); addCard('L'); }
        runProg();
        for (let k = 0; k < 4000 && !ctx.finished && phase !== 'edit' && level === lv; k++) update(1 / 60);
      }
    },
  };
}
