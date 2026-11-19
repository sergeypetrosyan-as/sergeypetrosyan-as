import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Cog Train: place gears on the pegboard between the motor and the goal so the goal turns the right way at the right speed. Three machines, three test runs each. */
const COLS = 5, ROWS = 3, M = 5, G = 9, MOTOR_T = 12, TEETH = [6, 8, 12, 16, 24], RUNS = 3;
const LEVELS = [{ k: 3, comp: 1, extra: 2 }, { k: 3, comp: 2, extra: 2 }, { k: 5, comp: 3, extra: 2 }];
interface Gear { id: number; a: number; b: number; at: number }
interface Rate { s: number; num: number; den: number }
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const fmt = (r: Rate): string => `${r.s > 0 ? '↻' : '↺'} ×${r.den === 1 ? r.num : `${r.num}/${r.den}`}`;
const same = (p: Rate, q: Rate): boolean => p.s === q.s && p.num === q.num && p.den === q.den;
const nbrs = (c: number): number[] => { const x = c % COLS, y = Math.floor(c / COLS), o: number[] = []; if (x > 0) o.push(c - 1); if (x < COLS - 1) o.push(c + 1); if (y > 0) o.push(c - COLS); if (y < ROWS - 1) o.push(c + COLS); return o; };

export default function cogTrain(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let level = 1, score = 0, runs = RUNS, goalT = 8, target: Rate = { s: 1, num: 1, den: 1 }, msg = '', sel = -1;
  let gears: Gear[] = [], solution: { cell: number; gear: Gear }[] = [], spin: Map<number, Rate> | null = null, jam = false;

  const style = h('style', null, `
    .cg{width:100%;max-width:440px;display:flex;flex-direction:column;align-items:center;gap:10px}
    .cg-goal{margin:0;text-align:center;font:700 1.05rem var(--mw-font-slab);color:var(--mw-bone);padding:6px 12px;border:2px solid var(--mw-rose);border-radius:999px;background:var(--mw-night)}
    .cg-board{width:100%;display:grid;grid-template-columns:repeat(${COLS},1fr);gap:4px;padding:6px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-umber)}
    .cg-peg{position:relative;aspect-ratio:1;min-width:0;padding:0;border:2px dashed var(--mw-mesa);border-radius:8px;background:var(--mw-night);display:grid;place-items:center;cursor:pointer;color:var(--mw-bone)}
    .cg-peg.fix{border-style:solid;border-color:var(--mw-bone)}
    .cg-peg.pick{border-color:var(--mw-rose);background:color-mix(in srgb,var(--mw-rose) 14%,var(--mw-night))}
    .cg-peg.jam{border-color:var(--mw-red)}
    .cg-svg{width:92%;height:92%;display:block}
    .cg-svg .t{fill:var(--mw-tan);stroke:var(--mw-ink);stroke-width:1.5;stroke-linejoin:round}
    .cg-svg .fixg{fill:var(--mw-bone)}
    .cg-svg .hub{fill:none;stroke:var(--mw-ink);stroke-width:2}
    .cg-svg text{font:700 14px var(--mw-font-slab);text-anchor:middle;dominant-baseline:central;fill:var(--mw-ink)}
    .cg-spin{animation:cg-spin linear infinite;transform-origin:center}
    @keyframes cg-spin{to{transform:rotate(360deg)}}
    .cg-tag{position:absolute;left:3px;top:1px;font:700 .7rem var(--mw-font-slab);color:var(--mw-rose)}
    .cg-tray{width:100%;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;min-height:64px;padding:6px;border:2px solid var(--mw-mesa);border-radius:10px;background:var(--mw-night)}
    .cg-g{width:64px;height:64px;padding:0;border:2px solid var(--mw-mesa);border-radius:8px;background:var(--mw-night);cursor:pointer}
    .cg-g.pick{border-color:var(--mw-rose);background:color-mix(in srgb,var(--mw-rose) 18%,var(--mw-night))}
    .cg-row{display:flex;gap:8px;width:100%}
    .cg-row .mw-btn{flex:1;min-height:48px}
  `);
  const goalEl = h('p', { class: 'cg-goal' }), board = h('div', { class: 'cg-board' }), tray = h('div', { class: 'cg-tray', 'aria-label': 'Gear tray' });
  const note = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'cg' }, goalEl, board, tray, note, h('div', { class: 'cg-row' }, h('button', { class: 'mw-btn primary', type: 'button', 'data-run': '', onclick: () => run() }, 'Run the train'))));

  function gearSvg(a: number, b: number, fixed: boolean, label: string, rate?: Rate): SVGElement {
    const R = 14 + 0.7 * a, bumps = Math.max(4, Math.round(a / 2)); let d = '';
    for (let i = 0; i < bumps * 4; i++) { const ang = (i * Math.PI * 2) / (bumps * 4), r = i % 4 === 1 || i % 4 === 2 ? R : R - 5; d += `${i ? 'L' : 'M'}${(32 + Math.cos(ang) * r).toFixed(1)} ${(32 + Math.sin(ang) * r).toFixed(1)}`; }
    const svg = h('svg', { class: 'cg-svg', viewBox: '0 0 64 64', 'aria-hidden': 'true' }) as unknown as SVGElement;
    const g = h('g', rate ? { class: 'cg-spin', style: { animationDuration: `${Math.max(0.8, Math.min(20, 5 / (rate.num / rate.den)))}s`, animationDirection: rate.s > 0 ? 'normal' : 'reverse' } } : null);
    g.append(h('path', { class: 't' + (fixed ? ' fixg' : ''), d: d + 'Z' }));
    if (b !== a) g.append(h('circle', { class: 'hub', cx: 32, cy: 32, r: R - 9, fill: 'none', 'stroke-dasharray': '3 3' }));
    svg.append(g, h('text', { x: 32, y: 32 }, label));
    return svg;
  }
  /** Spin the machine: propagate speed from the motor through meshed gears. */
  function simulate(): { rates: Map<number, Rate>; jam: boolean } {
    const at = new Map<number, Gear>(); gears.forEach((q) => q.at >= 0 && at.set(q.at, q));
    const rates = new Map<number, Rate>([[M, { s: 1, num: 1, den: 1 }]]), parent = new Map<number, number>([[M, -1]]), queue = [M]; let bad = false;
    while (queue.length) {
      const c = queue.shift()!, r = rates.get(c)!;
      if (c === G) continue; // the goal only receives
      const tout = c === M ? MOTOR_T : at.get(c)!.b;
      for (const nb of nbrs(c)) {
        if (nb === parent.get(c) || (!at.has(nb) && nb !== G)) continue;
        if (rates.has(nb)) { bad = true; continue; }
        const tin = nb === G ? goalT : at.get(nb)!.a, num = r.num * tout, den = r.den * tin, k = gcd(num, den);
        rates.set(nb, { s: -r.s, num: num / k, den: den / k }); parent.set(nb, c); queue.push(nb);
      }
    }
    return { rates, jam: bad };
  }
  function render(): void {
    const at = new Map<number, Gear>(); gears.forEach((q) => q.at >= 0 && at.set(q.at, q));
    goalEl.textContent = `Goal gear (${goalT} teeth) must turn ${fmt(target)} of the motor`;
    const cells: HTMLElement[] = [];
    for (let c = 0; c < COLS * ROWS; c++) {
      const q = at.get(c), fixedCell = c === M || c === G, rate = spin?.get(c);
      const peg = h('button', { class: 'cg-peg' + (fixedCell ? ' fix' : '') + (jam && q ? ' jam' : ''), type: 'button', 'data-peg': c, 'aria-label': c === M ? `Motor, ${MOTOR_T} teeth` : c === G ? `Goal gear, ${goalT} teeth` : q ? `Gear ${q.a === q.b ? q.a : `${q.a} in, ${q.b} out`}, tap to remove` : 'Empty peg', onclick: () => tapPeg(c) });
      if (c === M) peg.append(h('span', { class: 'cg-tag' }, 'MOTOR'), gearSvg(MOTOR_T, MOTOR_T, true, `${MOTOR_T}`, { s: 1, num: 1, den: 1 }));
      else if (c === G) peg.append(h('span', { class: 'cg-tag' }, 'GOAL'), gearSvg(goalT, goalT, true, `${goalT}`, rate));
      else if (q) peg.append(gearSvg(q.a, q.b, false, q.a === q.b ? `${q.a}` : `${q.a}/${q.b}`, rate));
      cells.push(peg);
    }
    board.replaceChildren(...cells);
    tray.replaceChildren(...gears.filter((q) => q.at < 0).map((q) => { const b = h('button', { class: 'cg-g' + (sel === q.id ? ' pick' : ''), type: 'button', 'data-gear': q.id, 'aria-label': q.a === q.b ? `Gear ${q.a} teeth` : `Compound gear, ${q.a} teeth in, ${q.b} teeth out`, onclick: () => pickGear(q.id) }); b.append(gearSvg(q.a, q.b, false, q.a === q.b ? `${q.a}` : `${q.a}/${q.b}`)); return b; }));
    note.textContent = msg;
    ctx.hud('Machine', `${level}/${LEVELS.length}`); ctx.hud('Runs left', runs); ctx.hud('Score', score);
  }
  function build(): void {
    const cfg = LEVELS[level - 1]; runs = RUNS; sel = -1; spin = null; jam = false; goalT = TEETH[Math.floor(rand() * TEETH.length)];
    for (;;) {
      const path: number[] = [];
      const dfs = (c: number): boolean => {
        if (path.length === cfg.k) return nbrs(c).includes(G);
        for (const nb of shuffle(rand, nbrs(c))) {
          if (nb === M || nb === G || path.includes(nb)) continue;
          const prev = path.length ? path[path.length - 1] : M;
          if (nbrs(nb).some((x) => x !== prev && (x === M || path.includes(x)))) continue;
          if (path.length + 1 < cfg.k && nbrs(nb).includes(G)) continue;
          path.push(nb); if (dfs(nb)) return true; path.pop();
        }
        return false;
      };
      if (!dfs(M)) continue;
      const comps = new Set(shuffle(rand, path.map((_, i) => i)).slice(0, cfg.comp));
      gears = path.map((_, i) => { const a = TEETH[Math.floor(rand() * 5)]; let b = a; if (comps.has(i)) while (b === a) b = TEETH[Math.floor(rand() * 5)]; return { id: i, a, b, at: -1 }; });
      solution = path.map((cell, i) => ({ cell, gear: gears[i] }));
      solution.forEach((s) => { s.gear.at = s.cell; });
      target = simulate().rates.get(G)!;
      solution.forEach((s) => { s.gear.at = -1; });
      for (let i = 0; i < cfg.extra; i++) { const a = TEETH[Math.floor(rand() * 5)], b = rand() < 0.5 ? a : TEETH[Math.floor(rand() * 5)]; gears.push({ id: 100 + i, a, b, at: -1 }); }
      gears = shuffle(rand, gears);
      break;
    }
    msg = 'Pick a gear from the tray, then a peg. Tap a placed gear to take it back.'; render();
  }
  function pickGear(id: number): void { if (ctx.finished) return; sel = sel === id ? -1 : id; spin = null; ctx.sfx('tick'); render(); }
  /** Place the selected gear on an empty peg, or lift a placed gear back to the tray. */
  function tapPeg(c: number): void {
    if (ctx.finished || c === M || c === G) return;
    const here = gears.find((q) => q.at === c);
    if (here) { here.at = -1; spin = null; jam = false; ctx.sfx('tick'); render(); return; }
    const g = gears.find((q) => q.id === sel); if (!g) return;
    g.at = c; sel = -1; spin = null; jam = false; ctx.sfx('tap'); render();
  }
  /** The scoring action: run the train and compare the goal gear with the target. */
  function run(): void {
    if (ctx.finished) return;
    const r = simulate(); spin = r.rates; jam = r.jam; const out = r.rates.get(G);
    if (!r.jam && out && same(out, target)) {
      score += 200 + runs * 50; ctx.sfx('good'); msg = `The goal turns ${fmt(out)}. Machine ${level} runs true.`; render();
      if (level >= LEVELS.length) { ctx.finish({ result: 'win', score, title: 'The train runs true', detail: `All ${LEVELS.length} machines delivered the right speed and direction.` }); return; }
      level++; build(); return;
    }
    runs--; ctx.sfx('bad');
    msg = r.jam ? 'The gears jam: a gear touches two drivers. Give each gear one way in.' : out ? `The goal turns ${fmt(out)} but needs ${fmt(target)}.` : 'The motor never reaches the goal gear.';
    if (r.jam) spin = null;
    render();
    if (runs <= 0) ctx.finish({ result: 'lose', score, title: 'The train seized', detail: `Machine ${level}: out of test runs before the goal turned ${fmt(target)}.` });
  }

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); level = 1; score = 0; build(); },
    probe: () => ({ level, runs, placed: gears.filter((q) => q.at >= 0).map((q) => [q.id, q.at]), sel, spin: spin ? spin.size : 0 }),
    play(kind) {
      for (let f = 0; f < 20 && !ctx.finished; f++) {
        if (kind === 'win') { const lv = level; for (const s of solution) { pickGear(s.gear.id); tapPeg(s.cell); } if (level === lv) run(); } else run();
      }
    },
  };
}
