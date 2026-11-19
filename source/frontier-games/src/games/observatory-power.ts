import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Observatory Power: split a failing battery between lamp, motor and cooling for one night. Keep light, aim and heat inside their bands until dawn. */
const NIGHT = 60;
const NAMES = ['Lamp', 'Motor', 'Cooling'];
const GAUGES = ['Light', 'Aim', 'Heat'];
const GLYPH = ['☀', '⚙', '❄'];
type Ev = { at: number; kind: 'cloud' | 'wind' | 'heat' };
const KIND_TEXT = { cloud: 'Cloud bank: the lamp must burn brighter', wind: 'Gale: the dome needs a stronger motor', heat: 'Heat wave: the room runs hotter' };

export default function observatoryPower(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let t = 0, strain = 0, alloc = [2, 2, 2], g = [32, 32, 22], events: Ev[] = [], notice = '';

  const supplyAt = (x: number): number => (x < 20 ? 9 : x < 40 ? 8 : 7);
  const active = (x: number): Ev | undefined => events.find((e) => x >= e.at && x < e.at + 9);
  /** Safe bands [lo, hi] for light, aim, heat at time x. */
  function bands(x: number): number[][] {
    const k = active(x)?.kind;
    return [k === 'cloud' ? [55, 95] : [30, 90], k === 'wind' ? [50, 90] : [20, 85], [5, 60]];
  }
  const ambient = (x: number): number => (active(x)?.kind === 'heat' ? 38 : 20);
  const steady = (a: number[], x: number): number[] => [Math.min(100, a[0] * 16), Math.min(100, a[1] * 16), Math.max(0, Math.min(100, ambient(x) + 7 * a[1] + 3 * a[0] - 9 * a[2]))];

  const style = h('style', null, `
    .op{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px}
    .op-sky{position:relative;height:30px;border-radius:15px;border:2px solid var(--mw-ember);background:var(--mw-night);overflow:hidden}
    .op-moon{position:absolute;top:3px;width:20px;height:20px;border-radius:50%;background:var(--mw-bone);box-shadow:inset -6px 0 0 var(--mw-ash);margin-left:-10px}
    .op-dawn{position:absolute;right:0;top:0;bottom:0;width:26px;background:var(--mw-ember);opacity:.55}
    .op-banner{min-height:2.6em;margin:0;text-align:center;font:600 .95rem/1.3 var(--mw-font-slab);color:var(--mw-bone)}
    .op-banner b{color:var(--mw-rose)}
    .op-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .op-col{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px 4px;border:2px solid var(--mw-mesa);border-radius:10px;background:var(--mw-night)}
    .op-col.out{border-color:var(--mw-red)}
    .op-name{font:700 .9rem var(--mw-font-slab);color:var(--mw-bone)}
    .op-bar{position:relative;width:34px;height:130px;border-radius:6px;background:var(--mw-ink);border:2px solid var(--mw-ash)}
    .op-band{position:absolute;left:0;right:0;background:repeating-linear-gradient(135deg,var(--mw-rose) 0 4px,transparent 4px 8px);opacity:.55;border-top:2px solid var(--mw-rose);border-bottom:2px solid var(--mw-rose)}
    .op-need{position:absolute;left:-14px;width:0;height:0;margin-top:-7px;border:7px solid transparent;border-left:12px solid var(--mw-bone)}
    .op-col.out .op-need{border-left-color:var(--mw-red)}
    .op-state{font:700 .8rem var(--mw-font-slab);color:var(--mw-rose);min-height:1.1em}
    .op-col.out .op-state{color:var(--mw-red)}
    .op-lvl{display:flex;gap:3px}
    .op-lvl i{width:9px;height:14px;border-radius:2px;border:1px solid var(--mw-ember);background:var(--mw-ink)}
    .op-lvl i.on{background:var(--mw-tan)}
    .op-btns{display:flex;gap:6px}
    .op-btns .mw-btn{min-width:44px;min-height:44px;padding:0;font-size:1.3rem}
    .op-supply{text-align:center;font:600 .95rem var(--mw-font-slab);color:var(--mw-bone)}
  `);
  const moon = h('i', { class: 'op-moon' }), banner = h('p', { class: 'op-banner', role: 'status' });
  const supplyEl = h('div', { class: 'op-supply' });
  const cols = [0, 1, 2].map((i) => {
    const band = h('div', { class: 'op-band' }), needle = h('div', { class: 'op-need' }), state = h('div', { class: 'op-state' }), lvl = h('div', { class: 'op-lvl', 'aria-hidden': 'true' }, ...Array.from({ length: 6 }, () => h('i')));
    const col = h('div', { class: 'op-col' }, h('div', { class: 'op-name' }, `${GLYPH[i]} ${GAUGES[i]}`), h('div', { class: 'op-bar' }, band, needle), state, h('div', { class: 'op-name', style: { fontWeight: '600' } }, NAMES[i]), lvl,
      h('div', { class: 'op-btns' }, h('button', { class: 'mw-btn', type: 'button', 'data-load': i, 'data-dir': -1, 'aria-label': `Less power to ${NAMES[i]}`, onclick: () => adjust(i, -1) }, '−'), h('button', { class: 'mw-btn', type: 'button', 'data-load': i, 'data-dir': 1, 'aria-label': `More power to ${NAMES[i]}`, onclick: () => adjust(i, 1) }, '+')));
    return { col, band, needle, state, lvl };
  });
  ctx.root.append(style, h('div', { class: 'op' }, h('div', { class: 'op-sky', 'aria-hidden': 'true' }, moon, h('div', { class: 'op-dawn' })), banner, h('div', { class: 'op-cols' }, cols.map((c) => c.col)), supplyEl));

  /** The one player action: move one step of power onto or off a load. */
  function adjust(i: number, d: number): void {
    if (ctx.finished) return;
    const sum = alloc[0] + alloc[1] + alloc[2], v = alloc[i] + d;
    if (v < 0 || v > 6 || sum + d > supplyAt(t)) { ctx.sfx('bad'); return; }
    alloc[i] = v; ctx.sfx('tick'); draw();
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt;
    while (alloc[0] + alloc[1] + alloc[2] > supplyAt(t)) { const m = alloc.indexOf(Math.max(...alloc)); alloc[m]--; notice = 'Brownout: the battery weakens and a load was trimmed.'; ctx.sfx('bad'); }
    const ss = steady(alloc, t), rate = [0.9, 0.9, 0.4], b = bands(t);
    let out = 0;
    for (let i = 0; i < 3; i++) { g[i] += (ss[i] - g[i]) * Math.min(1, rate[i] * dt); if (g[i] < b[i][0] || g[i] > b[i][1]) out++; }
    strain = out ? Math.min(100, strain + 14 * dt) : Math.max(0, strain - 8 * dt);
    const nextEv = events.find((e) => e.at > t && e.at - t < 3), cur = active(t);
    banner.innerHTML = cur ? `<b>Now:</b> ${KIND_TEXT[cur.kind]}.` : nextEv ? `<b>Incoming:</b> ${KIND_TEXT[nextEv.kind]}.` : notice || 'Calm sky. Keep every gauge in its hatched band.';
    if (strain >= 100) { ctx.finish({ result: 'lose', score: Math.round(t * 10), title: 'The night won', detail: `A gauge stayed out of band too long at ${Math.round(t)} s of ${NIGHT}.` }); draw(); return; }
    if (t >= NIGHT) { ctx.finish({ result: 'win', score: 400 + Math.round((100 - strain) * 2), title: 'Dawn at the observatory', detail: 'The lamp, motor and cooling held all night.' }); }
    draw();
  }
  function draw(): void {
    const b = bands(t);
    cols.forEach((c, i) => {
      const out = g[i] < b[i][0] || g[i] > b[i][1];
      c.band.style.bottom = `${b[i][0]}%`; c.band.style.height = `${b[i][1] - b[i][0]}%`;
      c.needle.style.bottom = `${Math.max(0, Math.min(100, g[i]))}%`;
      c.col.classList.toggle('out', out);
      c.state.textContent = out ? (g[i] < b[i][0] ? '▼ TOO LOW' : '▲ TOO HIGH') : 'In band';
      c.lvl.childNodes.forEach((n, k) => (n as HTMLElement).classList.toggle('on', k < alloc[i]));
    });
    moon.style.left = `${Math.min(100, (t / NIGHT) * 100)}%`;
    supplyEl.textContent = `Battery output ${alloc[0] + alloc[1] + alloc[2]} / ${supplyAt(t)}`;
    ctx.hud('Until dawn', `${Math.max(0, Math.ceil(NIGHT - t))} s`); ctx.hud('Strain', `${Math.round(strain)}%`);
  }
  ctx.loop(update, draw);

  /** Bot helper: best split by worst-case margin against now and the next 3 seconds of events. */
  function best(): number[] {
    let top = alloc, score = -1e9;
    const sup = supplyAt(t + 3);
    for (let a = 0; a <= 6; a++) for (let m = 0; m <= 6; m++) for (let c = 0; c <= 6; c++) {
      if (a + m + c > sup) continue;
      let worst = 1e9;
      for (const x of [t, t + 3]) { const s = steady([a, m, c], x), bd = bands(x); for (let i = 0; i < 3; i++) worst = Math.min(worst, s[i] - bd[i][0], bd[i][1] - s[i]); }
      if (worst > score) { score = worst; top = [a, m, c]; }
    }
    return top;
  }
  function steer(goal: number[]): void {
    for (let n = 0; n < 12; n++) for (let i = 0; i < 3; i++) if (alloc[i] > goal[i]) adjust(i, -1);
    for (let n = 0; n < 12; n++) for (let i = 0; i < 3; i++) if (alloc[i] < goal[i]) adjust(i, 1);
  }

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); t = 0; strain = 0; alloc = [2, 2, 2]; g = steady(alloc, 0); notice = '';
      const kinds = shuffle(rand, ['cloud', 'wind', 'heat', 'cloud', 'wind', 'heat']) as Ev['kind'][];
      events = [9, 21, 33, 45].map((at, i) => ({ at, kind: kinds[i] }));
      update(0); draw();
    },
    probe: () => ({ t: Math.round(t * 10) / 10, alloc: alloc.slice(), g: g.map(Math.round), strain: Math.round(strain) }),
    play(kind) {
      for (let f = 0; f < 6000 && !ctx.finished; f++) {
        if (kind === 'win') { if (f % 15 === 0) steer(best()); } else if (f === 0) steer([0, 0, 0]);
        update(1 / 60);
      }
    },
  };
}
