import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Marshal Chase: two marshals and one outlaw on a map of back alleys. Each turn every marshal steps or holds, then the outlaw runs. Corner him before turns run out. */
const MAPS = [{ w: 4, h: 4, extra: 4 }, { w: 5, h: 4, extra: 3 }, { w: 5, h: 5, extra: 2 }];
const V = 320;

export default function marshalChase(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let level = 1, score = 0, turn = 1, limit = 0, n = 0, sel = -1;
  let pos: { x: number; y: number }[] = [], adj: number[][] = [], dist: number[][] = [], val: Int8Array = new Int8Array(0);
  let cops = [0, 1], outlaw = 0, moved = [false, false], msg = '';

  const style = h('style', null, `
    .mc{width:100%;max-width:420px;display:flex;flex-direction:column;align-items:center;gap:10px}
    .mc-map{width:100%;aspect-ratio:1;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-night);touch-action:manipulation}
    .mc-map .alley{stroke:var(--mw-mesa);stroke-width:3;stroke-dasharray:2 7;stroke-linecap:round}
    .mc-map .node{fill:var(--mw-ink);stroke:var(--mw-ash);stroke-width:2}
    .mc-map .go{fill:none;stroke:var(--mw-rose);stroke-width:3;stroke-dasharray:5 4}
    .mc-map .cop{fill:var(--mw-bone);stroke:var(--mw-ink);stroke-width:3}
    .mc-map .cop.done{fill:var(--mw-tan)}
    .mc-map .ring{fill:none;stroke:var(--mw-rose);stroke-width:4}
    .mc-map .bad{fill:var(--mw-red);stroke:var(--mw-bone);stroke-width:3}
    .mc-map text{font:700 15px var(--mw-font-slab);text-anchor:middle;dominant-baseline:central;pointer-events:none}
    .mc-map g[data-node]{cursor:pointer}
    .mc-row{display:flex;gap:8px;width:100%}
    .mc-row .mw-btn{flex:1;min-height:48px}
  `);
  const svg = h('svg', { class: 'mc-map', viewBox: `0 0 ${V} ${V}`, role: 'group', 'aria-label': 'Alley map' });
  const note = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'mc' }, svg, note, h('div', { class: 'mc-row' }, h('button', { class: 'mw-btn', type: 'button', 'data-end': '', onclick: () => endTurn() }, 'Hold all and end turn'))));

  const closed = (a: number): number[] => [a, ...adj[a]];
  const idx = (a: number, b: number, r: number): number => (a * n + b) * n + r;
  /** Retrograde analysis: val = rounds the marshals need with best play against the cleverest outlaw (0 = no forced win). */
  function solve(): void {
    val = new Int8Array(n * n * n);
    for (let k = 1; k <= 14; k++) {
      const upd: number[] = [];
      for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) for (let r = 0; r < n; r++) {
        if (a === r || b === r || val[idx(a, b, r)]) continue;
        let win = false;
        for (const a2 of closed(a)) { for (const b2 of closed(b)) {
          if (a2 === r || b2 === r) { win = true; break; }
          if (closed(r).every((r2) => r2 === a2 || r2 === b2 || (val[idx(a2, b2, r2)] > 0 && val[idx(a2, b2, r2)] < k))) { win = true; break; }
        } if (win) break; }
        if (win) upd.push(idx(a, b, r));
      }
      upd.forEach((i) => { val[i] = k; });
      if (val[idx(cops[0], cops[1], outlaw)]) break; // everything the plan can reach is already solved
    }
  }
  function build(): void {
    const cfg = MAPS[level - 1]; n = cfg.w * cfg.h;
    for (let tries = 0; ; tries++) {
      adj = Array.from({ length: n }, () => []);
      for (let y = 0; y < cfg.h; y++) for (let x = 0; x < cfg.w; x++) {
        const i = y * cfg.w + x;
        if (x + 1 < cfg.w && (tries > 60 || rand() > 0.2)) { adj[i].push(i + 1); adj[i + 1].push(i); }
        if (y + 1 < cfg.h && (tries > 60 || rand() > 0.2)) { adj[i].push(i + cfg.w); adj[i + cfg.w].push(i); }
      }
      dist = adj.map((_, s) => { const d = Array(n).fill(99); d[s] = 0; const q = [s]; while (q.length) { const u = q.shift()!; adj[u].forEach((v) => { if (d[v] === 99) { d[v] = d[u] + 1; q.push(v); } }); } return d; });
      if (dist[0].some((d) => d === 99)) continue;
      cops = [0, adj[0][0]]; outlaw = dist[0].indexOf(Math.max(...dist[0]));
      solve();
      const v = val[idx(cops[0], cops[1], outlaw)];
      if ((v >= 3 && v <= 9) || tries > 80) { limit = (v || 8) + cfg.extra; break; }
    }
    const mx = 40, sx = (V - 2 * mx) / (cfg.w - 1), sy = (V - 2 * mx) / (cfg.h - 1);
    pos = Array.from({ length: n }, (_, i) => ({ x: mx + (i % cfg.w) * sx, y: mx + Math.floor(i / cfg.w) * sy }));
    turn = 1; sel = -1; moved = [false, false]; msg = 'Tap a marshal, then a highlighted junction. Tap the marshal again to hold.';
    render();
  }
  function render(): void {
    let s = '';
    adj.forEach((l, a) => l.forEach((b) => { if (a < b) s += `<line class="alley" x1="${pos[a].x}" y1="${pos[a].y}" x2="${pos[b].x}" y2="${pos[b].y}"/>`; }));
    pos.forEach((p, i) => {
      const copIdx = cops.indexOf(i), legal = sel >= 0 && adj[cops[sel]].includes(i) && !cops.includes(i);
      s += `<g data-node="${i}" role="button" aria-label="${copIdx >= 0 ? `Marshal ${copIdx + 1}` : i === outlaw ? 'Outlaw' : `Junction ${i + 1}`}"><circle cx="${p.x}" cy="${p.y}" r="26" fill="transparent"/><circle class="node" cx="${p.x}" cy="${p.y}" r="7"/>`;
      if (legal) s += `<circle class="go" cx="${p.x}" cy="${p.y}" r="17"/>`;
      if (i === outlaw) s += `<circle class="bad" cx="${p.x}" cy="${p.y}" r="17"/><text x="${p.x}" y="${p.y}" fill="var(--mw-white)">✖</text>`;
      if (copIdx >= 0) s += `<circle class="cop${moved[copIdx] ? ' done' : ''}" cx="${p.x}" cy="${p.y}" r="17"/>${sel === copIdx ? `<circle class="ring" cx="${p.x}" cy="${p.y}" r="22"/>` : ''}<text x="${p.x}" y="${p.y}" fill="var(--mw-ink)">★${copIdx + 1}</text>`;
      s += '</g>';
    });
    svg.innerHTML = s; note.textContent = msg;
    ctx.hud('Map', `${level}/${MAPS.length}`); ctx.hud('Turn', `${turn}/${limit}`); ctx.hud('Score', score);
  }
  function caught(): void {
    score += 200 + (limit - turn) * 40; ctx.sfx('good'); render();
    if (level >= MAPS.length) { ctx.finish({ result: 'win', score, title: 'Outlaw cornered', detail: `Caught on all ${MAPS.length} maps.` }); return; }
    level++; build();
  }
  /** Outlaw reply: stay out of marshals' reach, keep distance, keep room to run. */
  function runAway(): void {
    const opts = closed(outlaw).filter((x) => !cops.includes(x));
    if (!opts.length) { msg = 'The outlaw has nowhere left to run.'; caught(); return; }
    const score2 = (x: number): number => (Math.min(...cops.map((c) => dist[c][x])) > 1 ? 100 : 0) + Math.min(...cops.map((c) => dist[c][x])) * 10 + adj[x].filter((y) => !cops.includes(y)).length + rand() * 0.5;
    outlaw = opts.reduce((a, b) => (score2(b) > score2(a) ? b : a));
  }
  function endTurn(): void {
    if (ctx.finished) return;
    moved = [true, true]; resolve();
  }
  function resolve(): void {
    if (cops.includes(outlaw)) { msg = 'A marshal reached the outlaw!'; caught(); return; }
    runAway();
    if (cops.includes(outlaw)) { msg = 'The outlaw was cornered!'; caught(); return; }
    if (turn >= limit) { render(); ctx.finish({ result: 'lose', score, title: 'The outlaw got away', detail: `Map ${level}: out of turns after ${limit}.` }); return; }
    turn++; moved = [false, false]; sel = -1; msg = 'The outlaw ran. Your move.'; ctx.sfx('tap'); render();
  }
  /** The one player action: move marshal `i` to a neighbouring junction (or hold by naming its own). */
  function moveMarshal(i: number, to: number): void {
    if (ctx.finished || moved[i] || (to !== cops[i] && !adj[cops[i]].includes(to))) return;
    cops[i] = to; moved[i] = true; sel = -1; ctx.sfx('tick');
    if (moved[0] && moved[1]) resolve(); else { sel = moved[0] ? 1 : 0; render(); }
    if (!ctx.finished && sel >= 0 && moved[sel]) { sel = -1; render(); }
  }
  function tapNode(i: number): void {
    if (ctx.finished) return;
    const ci = cops.indexOf(i);
    if (sel >= 0 && ci === sel) { moveMarshal(sel, i); return; }
    if (sel >= 0 && ci < 0) { moveMarshal(sel, i); return; }
    if (ci >= 0 && !moved[ci]) { sel = ci; render(); }
  }
  ctx.on(svg, 'click', (e: Event) => { const g = (e.target as Element).closest('[data-node]'); if (g) tapNode(Number(g.getAttribute('data-node'))); });

  function best(): [number, number] {
    const k = val[idx(cops[0], cops[1], outlaw)];
    for (const a2 of closed(cops[0])) for (const b2 of closed(cops[1])) {
      if (a2 === outlaw || b2 === outlaw || closed(outlaw).every((r2) => r2 === a2 || r2 === b2 || (val[idx(a2, b2, r2)] > 0 && val[idx(a2, b2, r2)] < k))) return [a2, b2];
    }
    return [cops[0], cops[1]];
  }

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); level = 1; score = 0; build(); },
    probe: () => ({ level, turn, cops: cops.slice(), outlaw, sel, moved: moved.slice() }),
    play(kind) {
      for (let g = 0; g < 200 && !ctx.finished; g++) {
        if (kind === 'lose') { endTurn(); continue; }
        const [a, b] = best(); const t = turn, lv = level;
        moveMarshal(0, a); if (turn === t && level === lv && !ctx.finished) moveMarshal(1, b);
      }
    },
  };
}
