import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Pack the Wagon: three trails. Load goods under the axle limit, cover the trail's needs, carry at most 2 fragile crates, reach the value target. */
interface Good { name: string; kind: 'water' | 'food' | 'tool' | 'trade'; w: number; v: number; fragile?: boolean }
const POOL: Good[] = [
  { name: 'Water barrel', kind: 'water', w: 4, v: 3 }, { name: 'Canteens', kind: 'water', w: 2, v: 2 },
  { name: 'Flour sack', kind: 'food', w: 3, v: 4 }, { name: 'Salt pork', kind: 'food', w: 2, v: 3 }, { name: 'Jam jars', kind: 'food', w: 2, v: 5, fragile: true },
  { name: 'Plough', kind: 'tool', w: 5, v: 6 }, { name: 'Rope coil', kind: 'tool', w: 1, v: 2 }, { name: 'Lantern', kind: 'tool', w: 1, v: 3, fragile: true }, { name: 'Rifle', kind: 'tool', w: 3, v: 5 },
  { name: 'Mirror', kind: 'trade', w: 2, v: 6, fragile: true }, { name: 'Blankets', kind: 'trade', w: 2, v: 3 }, { name: 'Coffee', kind: 'trade', w: 1, v: 3 }, { name: 'Saddle', kind: 'trade', w: 3, v: 4 }, { name: 'Medicine', kind: 'trade', w: 1, v: 5, fragile: true },
];
const TRAILS = 3, STRIKES = 2, MAXFRAG = 2;
const KIND = { water: 'Water', food: 'Food', tool: 'Tool', trade: 'Trade' } as const;

export default function packTheWagon(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let goods: Good[] = [], load = new Set<number>(), limit = 10, target = 10, needs: Good['kind'][] = [], best: number[] = [];
  let trail = 0, strikes = 0, score = 0, msg = '';

  const style = h('style', null, `
    .pw{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .pw-axle{width:100%;height:64px}
    .pw-need{font:600 .92rem/1.3 var(--mw-font-slab);text-align:center;color:var(--mw-bone)}
    .pw-grid{width:100%;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .pw-g{min-height:78px;border-radius:8px;border:2px solid var(--mw-ember);background:var(--mw-night);color:var(--mw-bone);cursor:pointer;display:flex;flex-direction:column;gap:2px;align-items:center;justify-content:center;padding:4px;font:600 .88rem/1.15 var(--mw-font-slab)}
    .pw-g small{color:var(--mw-ash);font:600 .72rem var(--mw-font-body,sans-serif);text-transform:uppercase;letter-spacing:.04em}
    .pw-g[aria-pressed=true]{background:var(--mw-wine);border-color:var(--mw-bone)}
    .pw-g[aria-pressed=true]::before{content:'LOADED';font:700 .66rem var(--mw-font-slab);color:var(--mw-rose)}
    .pw-g .fr{color:var(--mw-red);background:var(--mw-bone);border-radius:4px;padding:0 4px;font:700 .7rem var(--mw-font-slab)}
  `);
  const axle = h('svg', { class: 'pw-axle', viewBox: '0 0 300 64', role: 'img', 'aria-label': 'Axle load' });
  const need = h('p', { class: 'pw-need', role: 'status' });
  const grid = h('div', { class: 'pw-grid' });
  const go = h('button', { class: 'mw-btn primary', type: 'button', 'data-go': '', style: { width: '100%', minHeight: '48px' } }, 'Set off');
  const note = h('p', { class: 'mw-note' });
  ctx.root.append(style, h('div', { class: 'pw' }, axle, need, grid, go, note));
  go.addEventListener('click', () => setOff());

  const wt = (s: Iterable<number>) => [...s].reduce((a, i) => a + goods[i].w, 0);
  const val = (s: Iterable<number>) => [...s].reduce((a, i) => a + goods[i].v, 0);
  const frag = (s: Iterable<number>) => [...s].filter((i) => goods[i].fragile).length;
  const okSet = (s: number[]) => wt(s) <= limit && frag(s) <= MAXFRAG && needs.every((k) => s.some((i) => goods[i].kind === k));

  function newTrail(): void {
    const pick = (k: Good['kind']) => shuffle(rand, POOL.filter((g) => g.kind === k))[0];
    const base = [pick('water'), pick('food'), pick('tool'), pick('trade')];
    const rest = shuffle(rand, POOL.filter((g) => !base.includes(g))).slice(0, 5);
    goods = shuffle(rand, [...base, ...rest]);
    needs = ['water', 'food', ...(trail > 0 ? ['tool' as const] : [])];
    limit = Math.round(goods.reduce((a, g) => a + g.w, 0) * 0.5);
    let top = 0; best = [];
    for (let m = 0; m < 1 << goods.length; m++) {
      const s = goods.map((_, i) => i).filter((i) => m & (1 << i));
      if (okSet(s) && val(s) > top) { top = val(s); best = s; }
    }
    target = Math.max(1, Math.floor(top * (0.8 + trail * 0.05)));
    load = new Set();
    msg = `Trail ${trail + 1}: carry at least ${target} value without snapping the axle.`;
  }
  function render(): void {
    const w = wt(load), f = w / limit, over = w > limit;
    const sag = Math.min(f, 1.3) * 18;
    axle.replaceChildren(
      h('path', { d: `M20 14 Q150 ${14 + sag * 2} 280 14`, stroke: over ? 'var(--mw-red)' : 'var(--mw-tan)', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }),
      h('circle', { cx: 20, cy: 30, r: 15, fill: 'none', stroke: 'var(--mw-ember)', 'stroke-width': 4 }), h('circle', { cx: 280, cy: 30, r: 15, fill: 'none', stroke: 'var(--mw-ember)', 'stroke-width': 4 }),
      h('rect', { x: 40, y: 50, width: 220, height: 8, rx: 4, fill: 'var(--mw-night)', stroke: 'var(--mw-ember)' }),
      h('rect', { x: 40, y: 50, width: Math.min(220, 220 * f * 0.9), height: 8, rx: 4, fill: over ? 'var(--mw-red)' : 'var(--mw-rose)' }),
      h('line', { x1: 40 + 198, y1: 46, x2: 40 + 198, y2: 62, stroke: 'var(--mw-bone)', 'stroke-width': 2 }),
      h('text', { x: 150, y: 38, 'text-anchor': 'middle', fill: 'var(--mw-bone)', 'font-size': 15, 'font-weight': 700 }, over ? `SNAP! ${w}/${limit} kg` : `${w}/${limit} kg`));
    need.textContent = `Need: ${needs.map((k) => KIND[k]).join(' + ')}. Fragile (!) max ${MAXFRAG}: you have ${frag(load)}. Value ${val(load)}/${target}.`;
    grid.replaceChildren(...goods.map((g, i) => {
      const b = h('button', { class: 'pw-g', type: 'button', 'aria-pressed': String(load.has(i)), 'data-good': i }, h('span', null, g.name), h('small', null, `${KIND[g.kind]} · ${g.w} kg · $${g.v}`), g.fragile ? h('span', { class: 'fr' }, '! Fragile') : null);
      b.addEventListener('click', () => toggle(i));
      return b;
    }));
    note.textContent = msg;
    ctx.hud('Trail', `${trail + 1}/${TRAILS}`); ctx.hud('Strikes', `${strikes}/${STRIKES}`); ctx.hud('Score', score);
  }
  function toggle(i: number): void { if (ctx.finished || !goods[i]) return; load.has(i) ? load.delete(i) : load.add(i); ctx.sfx('tap'); render(); }
  /** The one scoring action: roll the loaded wagon onto the trail. */
  function setOff(): void {
    if (ctx.finished) return;
    const s = [...load], miss = needs.find((k) => !s.some((i) => goods[i].kind === k));
    let why = '';
    if (wt(load) > limit) why = `The axle snapped at ${wt(load)} kg (limit ${limit}).`;
    else if (frag(load) > MAXFRAG) why = 'Too many fragile crates: they shattered.';
    else if (miss) why = `You left without ${KIND[miss].toLowerCase()} for the trail.`;
    else if (val(load) < target) why = `Only ${val(load)} value; the trail needed ${target}.`;
    if (why) {
      strikes++; ctx.sfx('bad'); msg = why + ' Strike.';
      if (strikes >= STRIKES) { render(); ctx.finish({ result: 'lose', score, title: 'Stranded on the trail', detail: why }); return; }
      newTrail(); render(); return;
    }
    score += val(load) * 10 + (limit - wt(load)); ctx.sfx('good'); trail++;
    if (trail >= TRAILS) { render(); ctx.finish({ result: 'win', score, title: 'Wagon home safe', detail: `Three trails crossed with ${strikes} strike${strikes === 1 ? '' : 's'}.` }); return; }
    newTrail(); msg = 'Trail crossed. ' + msg; render();
  }
  ctx.keys({ Enter: (d) => d && setOff(), ...Object.fromEntries('123456789'.split('').map((k, i) => [k, (d: boolean) => d && toggle(i)])) });

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); trail = 0; strikes = 0; score = 0; newTrail(); render(); },
    probe: () => ({ trail, strikes, score, load: [...load].sort().join(',') }),
    play(kind: Result) {
      for (let g = 0; g < 20 && !ctx.finished; g++) {
        [...load].forEach(toggle);
        (kind === 'win' ? best : goods.map((_, i) => i)).forEach(toggle);
        setOff();
      }
    },
  };
}
