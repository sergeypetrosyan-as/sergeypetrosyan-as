import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Roundhouse: a turntable with 12 stalls. Each engine names its stall; swing the bridge there before it rolls in. */
const N = 12, SHIFTS = [3, 4, 5, 6], LIMIT = [4.4, 3.8, 3.3, 2.9], MAX_MISS = 3, STEP = 0.17, GAP = 0.9;
const mod = (a: number): number => ((a % N) + N) % N;
const shortest = (d: number): number => { const m = mod(d); return m > N / 2 ? m - N : m; };

export default function roundhouse(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let targets: number[][] = [];
  let shift = 0, idx = 0, hits = 0, miss = 0, score = 0;
  let raw = 0, cur = 0, stepT = 0, queue: number[] = [];
  let phase: 'run' | 'gap' = 'gap', t = 0, limit = 4, target = 0, msg = '', ang = 0;

  const SVG = (tag: string, a: Record<string, any>, ...k: any[]) => h(tag, a, ...k);
  const stalls = Array.from({ length: N }, (_, k) => {
    const a = (k * 360) / N, x = 150 + 118 * Math.sin((a * Math.PI) / 180), y = 150 - 118 * Math.cos((a * Math.PI) / 180);
    const c = SVG('circle', { cx: x, cy: y, r: 19, class: 'rh-stall' });
    const tx = SVG('text', { x, y: y + 5, class: 'rh-num', 'text-anchor': 'middle' }, k + 1);
    const g = SVG('g', { 'data-stall': k, style: { cursor: 'pointer' } }, c, tx);
    ctx.on(g, 'pointerdown', (e: Event) => { e.preventDefault(); aimAt(k); });
    return { g, c, tx };
  });
  const bridge = SVG('g', {}, SVG('rect', { x: 140, y: 56, width: 20, height: 94, rx: 4, class: 'rh-bridge' }), SVG('polygon', { points: '150,40 164,62 136,62', class: 'rh-tip' }), SVG('line', { x1: 150, y1: 62, x2: 150, y2: 150, class: 'rh-rail' }));
  const svg = SVG('svg', { viewBox: '0 0 300 300', class: 'rh-svg', role: 'img', 'aria-label': 'Turntable with twelve stalls' },
    SVG('circle', { cx: 150, cy: 150, r: 92, class: 'rh-pit' }), SVG('circle', { cx: 150, cy: 150, r: 104, class: 'rh-pit2' }),
    ...stalls.map((s) => s.g), bridge, SVG('circle', { cx: 150, cy: 150, r: 10, class: 'rh-hub' }));
  const say = h('p', { class: 'mw-big rh-say', role: 'status' });
  const sub = h('p', { class: 'mw-note' });
  const bar = h('i', {});
  const queueEl = h('div', { class: 'rh-queue', 'aria-label': 'Upcoming engines' });
  const style = h('style', null, `
    .rh{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:8px}
    .rh-svg{width:100%;max-width:340px;touch-action:manipulation;user-select:none}
    .rh-pit{fill:var(--mw-night);stroke:var(--mw-mesa);stroke-width:3}.rh-pit2{fill:none;stroke:var(--mw-umber);stroke-width:1.5;stroke-dasharray:3 5}
    .rh-stall{fill:var(--mw-night);stroke:var(--mw-mesa);stroke-width:3}.rh-num{fill:var(--mw-smoke);font:700 15px var(--mw-font-slab);pointer-events:none}
    .rh-stall.tgt{fill:var(--mw-red);stroke:var(--mw-bone)}.rh-stall.ok{fill:var(--mw-rose);stroke:var(--mw-bone)}
    .rh-bridge{fill:var(--mw-tan);stroke:var(--mw-bone);stroke-width:2}.rh-tip{fill:var(--mw-bone)}.rh-rail{stroke:var(--mw-saddle);stroke-width:2;stroke-dasharray:4 4}.rh-hub{fill:var(--mw-ember);stroke:var(--mw-bone);stroke-width:2}
    .rh-say{font-size:clamp(1.2rem,5vw,1.7rem);text-align:center;min-height:1.2em}
    .rh-queue{display:flex;gap:6px;align-items:center;font:600 .9rem var(--mw-font-slab);color:var(--mw-ash)}
    .rh-queue b{min-width:34px;text-align:center;padding:4px 6px;border:2px solid var(--mw-ember);border-radius:8px;color:var(--mw-bone);background:var(--mw-night)}
  `);
  ctx.root.append(style, h('div', { class: 'rh' }, say, h('div', { class: 'mw-meter' }, bar), svg, queueEl, sub));

  const pos = (): number => mod(raw);
  function hud(): void { ctx.hud('Shift', `${shift + 1}/${SHIFTS.length}`); ctx.hud('Engines in', hits); ctx.hud('Wrecks', `${miss}/${MAX_MISS}`); ctx.hud('Score', score); }
  function paint(): void {
    stalls.forEach((s, k) => { s.c.setAttribute('class', 'rh-stall' + (phase === 'run' && k === target ? (pos() === target ? ' ok' : ' tgt') : '')); });
    const ahead = (targets[shift] ?? []).slice(idx + 1, idx + 4);
    queueEl.replaceChildren('Then:', ...ahead.map((k) => h('b', null, k + 1)));
    say.textContent = phase === 'run' ? `Engine for stall ${target + 1}${pos() === target ? ' - ready' : ''}` : msg;
  }
  function spawn(): void {
    target = targets[shift][idx]; limit = LIMIT[shift]; t = limit; phase = 'run';
    sub.textContent = 'Swing the bridge so its arrow points at the stall before the timer ends.';
    paint();
  }
  /** Player action: queue one quarter-step turn (one stall) left (-1) or right (+1). */
  function turn(d: number): void {
    if (ctx.finished || queue.length >= 6) return;
    queue.push(d); ctx.sfx('tick');
  }
  /** Player action: tap a stall to take the shortest route to it. */
  function aimAt(k: number): void {
    if (ctx.finished) return;
    const d = shortest(k - mod(raw + cur + queue.reduce((a, b) => a + b, 0)));
    queue = Array(Math.abs(d)).fill(Math.sign(d));
    if (d) ctx.sfx('tick');
  }
  function resolve(): void {
    const ok = pos() === target && !cur;
    if (ok) { hits++; score += 100 + Math.round(t * 20); ctx.sfx('good'); msg = `Engine ${hits} stabled.`; } else { miss++; ctx.sfx('bad'); msg = `Wreck! It needed stall ${target + 1}.`; }
    phase = 'gap'; t = GAP; sub.textContent = ''; hud(); paint();
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    if (!cur && queue.length) { cur = queue.shift() as number; stepT = STEP; }
    if (cur) { stepT -= dt; if (stepT <= 0) { raw += cur; cur = 0; paint(); } }
    if (phase === 'run') { t -= dt; if (t <= 0) resolve(); }
    else {
      t -= dt;
      if (t <= 0) {
        if (miss >= MAX_MISS) { ctx.finish({ result: 'lose', score, title: 'Roundhouse wrecked', detail: `${hits} engines stabled before the third wreck.` }); return; }
        idx++;
        if (idx >= targets[shift].length) {
          shift++; idx = 0;
          if (shift >= SHIFTS.length) { shift = SHIFTS.length - 1; ctx.finish({ result: 'win', score: score + (MAX_MISS - miss) * 150, title: 'Every engine stabled', detail: `${hits} engines in, ${miss} wrecked.` }); return; }
          msg = `Shift ${shift + 1}: faster engines.`; phase = 'gap'; t = 1.2; hud(); paint(); idx = -1; return;
        }
        hud(); spawn();
      }
    }
  }
  function draw(): void {
    const want = (raw + (cur ? cur * (1 - Math.max(0, stepT) / STEP) : 0)) * (360 / N);
    ang += (want - ang) * 0.5;
    bridge.setAttribute('transform', `rotate(${ang.toFixed(1)} 150 150)`);
    (bar as HTMLElement).style.width = phase === 'run' ? `${Math.max(0, (t / limit) * 100)}%` : '0%';
  }
  ctx.keys({ ArrowLeft: (d) => d && turn(-1), ArrowRight: (d) => d && turn(1), a: (d) => d && turn(-1), d: (d) => d && turn(1) });
  ctx.pad([{ key: 'ArrowLeft', label: '↺ Left' }, { key: 'ArrowRight', label: 'Right ↻' }]);
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed);
      targets = []; let prev = 0;
      for (const n of SHIFTS) { const row: number[] = []; for (let i = 0; i < n; i++) { const d = rint(rand, 2, 6) * (rand() < 0.5 ? 1 : -1); prev = mod(prev + d); row.push(prev); } targets.push(row); }
      shift = 0; idx = -1; hits = 0; miss = 0; score = 0; raw = 0; cur = 0; stepT = 0; queue = []; ang = 0;
      msg = 'Shift 1: the first engines.'; phase = 'gap'; t = 0.9; hud(); paint(); (bar as HTMLElement).style.width = '0%';
      sub.textContent = 'Tap a stall or use Left / Right to turn the bridge.';
    },
    probe: () => ({ shift, idx, pos: pos(), target: phase === 'run' ? target : null, queue: queue.length, turning: cur, hits, miss, score }),
    play(kind: Result) {
      for (let guard = 0; guard < 20000 && !ctx.finished; guard++) {
        if (kind === 'win' && phase === 'run' && !cur && !queue.length && pos() !== target) aimAt(target);
        update(1 / 60);
      }
    },
  };
}
