import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Balance Mobile: hang every weight on a slot so each bar's torque (weight x distance) cancels and the mobile hangs level. */
const LEVELS = [{ n: 3, sub: false, time: 45 }, { n: 5, sub: false, time: 60 }, { n: 6, sub: true, time: 90 }];
const TOP = [-3, -2, -1, 1, 2, 3], SUB = [-2, -1, 1, 2];
const SX = 52, SUBX = 40; // slot spacing
const key = (bar: number, d: number) => `${bar}:${d}`;

export default function balanceMobile(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let lv = 0, weights: number[] = [], solution: Record<string, number> = {}, placed: Record<string, number> = {};
  let sel = -1, timeLeft = 0, lock = 0, score = 0, angle = [0, 0], msg = '';
  let g0: SVGElement, g1: SVGElement | null = null, hang: SVGElement | null = null;
  let counters: [SVGElement, number][] = [];

  const slotsOf = (bar: number) => (bar === 0 ? (LEVELS[lv].sub ? TOP.filter((d) => d !== 1) : TOP) : SUB);
  function torque(bar: number, p = placed): number {
    let t = 0;
    for (const d of slotsOf(bar)) { const w = p[key(bar, d)]; if (w != null) t += d * weights[w]; }
    if (bar === 0 && LEVELS[lv].sub) t += subMass(p);
    return t;
  }
  const subMass = (p = placed) => SUB.reduce((s, d) => s + (p[key(1, d)] != null ? weights[p[key(1, d)]] : 0), 0);
  const allPlaced = () => Object.keys(placed).length === weights.length;
  const level = () => allPlaced() && torque(0) === 0 && (!LEVELS[lv].sub || torque(1) === 0);

  const style = h('style', null, `
    .bm{width:100%;max-width:420px;display:flex;flex-direction:column;gap:8px;align-items:center}
    .bm svg{width:100%;height:auto;max-height:46vh}
    .bm-tray{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;min-height:56px}
    .bm-w{min-width:56px;min-height:52px;border-radius:8px;border:3px solid var(--mw-bone);background:var(--mw-tan);color:var(--mw-ink);font:700 1.3rem var(--mw-font-slab);cursor:pointer}
    .bm-w.sel{border-color:var(--mw-red);box-shadow:0 0 0 3px var(--mw-rose)}
  `);
  const svg = h('svg', { viewBox: '0 0 360 300', role: 'img', 'aria-label': 'Mobile' });
  const tray = h('div', { class: 'bm-tray' });
  const bar = h('div', { class: 'mw-meter' }, h('i'));
  const note = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'bm' }, svg, tray, bar, note));

  function build(): void {
    const counter = (b: number, _a: number, ...kids: unknown[]) => { const e = h('g', null, ...(kids as never[])) as unknown as SVGElement; counters.push([e, b]); return e; };
    counters = [];
    const slotG = (b: number, sp: number) => slotsOf(b).map((d) => {
      const w = placed[key(b, d)], x = d * sp;
      const lvl = b === 0 ? angle[0] : angle[1];
      return h('g', { transform: `translate(${x} 0)` },
        h('line', { x1: 0, y1: -8, x2: 0, y2: 8, stroke: 'var(--mw-bone)', 'stroke-width': 2 }),
        h('text', { x: 0, y: -12, 'text-anchor': 'middle', fill: 'var(--mw-ash)', 'font-size': 12 }, Math.abs(d)),
        counter(b, lvl,
          w == null
            ? h('circle', { cx: 0, cy: 30, r: 20, fill: 'none', stroke: 'var(--mw-rose)', 'stroke-width': 2, 'stroke-dasharray': '4 4' })
            : [h('line', { x1: 0, y1: 0, x2: 0, y2: 18, stroke: 'var(--mw-bone)', 'stroke-width': 2 }), h('rect', { x: -17, y: 18, width: 34, height: 34, rx: 6, fill: 'var(--mw-tan)', stroke: 'var(--mw-bone)', 'stroke-width': 2 }), h('text', { x: 0, y: 42, 'text-anchor': 'middle', fill: 'var(--mw-ink)', 'font-size': 20, 'font-weight': 700 }, weights[w])]),
        h('circle', { cx: 0, cy: w == null ? 30 : 34, r: 22, fill: 'transparent', 'data-slot': key(b, d), role: 'button', 'aria-label': `Slot ${d < 0 ? 'left' : 'right'} ${Math.abs(d)}${w != null ? `, weight ${weights[w]}` : ''}`, style: 'cursor:pointer', onclick: () => put(b, d) }));
    });
    const barLine = (half: number) => h('line', { x1: -half, y1: 0, x2: half, y2: 0, stroke: 'var(--mw-bone)', 'stroke-width': 6, 'stroke-linecap': 'round' });
    g1 = null; hang = null;
    g0 = h('g', null, barLine(3 * SX + 10), h('circle', { cx: 0, cy: 0, r: 5, fill: 'var(--mw-red)' }), ...slotG(0, SX)) as unknown as SVGElement;
    const parts: SVGElement[] = [h('line', { x1: 180, y1: 0, x2: 180, y2: 60, stroke: 'var(--mw-ember)', 'stroke-width': 3 }) as unknown as SVGElement, h('g', { transform: 'translate(180 60)' }, g0) as unknown as SVGElement];
    if (LEVELS[lv].sub) {
      g1 = h('g', null, barLine(2 * SUBX + 12), h('circle', { cx: 0, cy: 0, r: 4, fill: 'var(--mw-red)' }), ...slotG(1, SUBX)) as unknown as SVGElement;
      hang = h('g', null, h('line', { x1: 0, y1: 0, x2: 0, y2: 100, stroke: 'var(--mw-bone)', 'stroke-width': 2 }), h('g', { transform: 'translate(0 100)' }, g1)) as unknown as SVGElement;
      g0.append(hang);
    }
    svg.replaceChildren(...parts);
    pose();
    tray.replaceChildren(...weights.flatMap((w, i) => (Object.values(placed).includes(i) ? [] : [h('button', { class: 'bm-w' + (sel === i ? ' sel' : ''), type: 'button', 'data-w': i, 'aria-label': `Weight ${w}`, onclick: () => choose(i) }, w)])));
    note.textContent = msg;
    ctx.hud('Mobile', `${lv + 1}/${LEVELS.length}`); ctx.hud('Time', Math.ceil(timeLeft)); ctx.hud('Score', score);
  }
  const target = (b: number) => Math.max(-22, Math.min(22, torque(b) * 4));
  function pose(): void {
    g0.setAttribute('transform', `rotate(${angle[0].toFixed(2)})`); g1?.setAttribute('transform', `rotate(${angle[1].toFixed(2)})`);
    hang?.setAttribute('transform', `translate(${SX} 0) rotate(${(-angle[0]).toFixed(2)})`);
    counters.forEach(([e, b]) => e.setAttribute('transform', `rotate(${(-angle[b]).toFixed(2)})`));
  }
  function start(): void {
    const { n, sub } = LEVELS[lv], slots = [...slotsOf(0).map((d) => key(0, d)), ...(sub ? SUB.map((d) => key(1, d)) : [])];
    for (let tries = 0; tries < 60000; tries++) {
      const ws = Array.from({ length: n }, () => 1 + Math.floor(rand() * 5));
      if (new Set(ws).size < 2) continue;
      const sl = shuffle(rand, slots).slice(0, n), p: Record<string, number> = {};
      sl.forEach((k, i) => (p[k] = i));
      weights = ws; placed = p;
      if (level() && (!sub || sl.some((k) => k.startsWith('1:'))) && (n > 3 || sl.some((k) => Math.abs(+k.split(':')[1]) > 1))) break;
    }
    solution = placed; placed = {}; sel = -1; lock = 0; angle = [0, 0]; timeLeft = LEVELS[lv].time; msg = 'Tap a weight, then tap a slot. Weight × distance on the left must equal the right.';
    build();
  }
  function choose(i: number): void { if (ctx.finished || lock) return; sel = sel === i ? -1 : i; ctx.sfx('tap'); build(); }
  /** The one player action: put the selected weight on a slot, or lift a hung weight back. */
  function put(b: number, d: number): void {
    if (ctx.finished || lock) return;
    const k = key(b, d);
    if (placed[k] != null) { delete placed[k]; ctx.sfx('tap'); }
    else if (sel >= 0) { placed[k] = sel; sel = -1; ctx.sfx('good'); }
    else { msg = 'Pick a weight from the tray first.'; build(); return; }
    msg = ''; build();
    if (level()) { lock = 1.1; msg = 'Level! The mobile hangs still.'; ctx.sfx('win'); build(); }
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    for (let b = 0; b < 2; b++) angle[b] += (target(b) - angle[b]) * Math.min(1, dt * 8);
    pose();
    if (lock > 0) {
      lock -= dt;
      if (lock <= 0) {
        score += 300 + Math.round(timeLeft) * 5;
        if (lv + 1 >= LEVELS.length) { ctx.finish({ result: 'win', score, title: 'Hangs level', detail: `All ${LEVELS.length} mobiles balanced.` }); return; }
        lv++; start();
      }
      return;
    }
    const before = Math.ceil(timeLeft); timeLeft -= dt;
    if (Math.ceil(timeLeft) !== before) ctx.hud('Time', Math.max(0, Math.ceil(timeLeft)));
    (bar.firstChild as HTMLElement).style.width = `${Math.max(0, (timeLeft / LEVELS[lv].time) * 100)}%`;
    if (timeLeft <= 0) ctx.finish({ result: 'lose', score, title: 'Crashed to the ground', detail: `Mobile ${lv + 1} was not balanced in time.` });
  }

  ctx.loop(update, () => {});
  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); lv = 0; score = 0; start(); },
    probe: () => ({ lv, sel, placed: Object.entries(placed).map(([k, v]) => `${k}=${v}`).join(','), t0: torque(0) }),
    play(kind: Result) {
      for (let guard = 0; guard < 20000 && !ctx.finished; guard++) {
        if (kind === 'win' && !lock && !allPlaced()) {
          for (const [k, w] of Object.entries(solution)) { choose(w); const [b, d] = k.split(':').map(Number); put(b, d); }
        }
        update(1 / 60);
      }
    },
  };
}
