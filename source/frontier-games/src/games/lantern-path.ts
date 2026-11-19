import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Lantern Path: lanterns light a route once, tile by tile. Walk it from memory; each slip costs a lantern and replays the route. */
const N = 6, LENS = [4, 5, 7, 9, 11], LIVES = 3, LEAD = 0.7, BEAT = 0.5, TAIL = 0.4, FLASH = 0.9;

export default function lanternPath(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let round = 0, lives = LIVES, score = 0, pos = 0, t = 0, bad = -1, doneT = 0, doneKind = 'ok';
  let phase: 'show' | 'input' | 'done' = 'show';
  let path: number[] = [];

  const grid = h('div', { class: 'lp-grid' });
  const rays = h('svg', { class: 'lp-rays', viewBox: `0 0 ${N} ${N}`, preserveAspectRatio: 'none', 'aria-hidden': 'true' });
  const say = h('p', { class: 'mw-note', role: 'status' });
  const btn = h('button', { class: 'mw-btn', type: 'button', 'data-replay': '', onclick: () => replay() });
  const style = h('style', null, `
    .lp{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:10px}
    .lp-board{position:relative;width:100%;aspect-ratio:1;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised);padding:6px;box-sizing:border-box}
    .lp-grid{position:absolute;inset:6px;display:grid;grid-template-columns:repeat(${N},1fr);grid-template-rows:repeat(${N},1fr);gap:4px}
    .lp-rays{position:absolute;inset:6px;width:calc(100% - 12px);height:calc(100% - 12px);pointer-events:none}
    .lp-c{border:2px solid var(--mw-mesa);border-radius:7px;background:var(--mw-night);color:var(--mw-ash);font:700 clamp(1rem,5vw,1.6rem)/1 var(--mw-font-slab);padding:0;cursor:pointer;display:grid;place-items:center;min-width:0;min-height:0;transition:background .12s}
    .lp-c.lit{background:var(--mw-tan);color:var(--mw-ink);border-color:var(--mw-bone);box-shadow:0 0 0 3px color-mix(in srgb,var(--mw-rose) 55%,transparent)}
    .lp-c.walked{background:var(--mw-rose);color:var(--mw-ink);border-color:var(--mw-bone)}
    .lp-c.bad{background:var(--mw-red);color:var(--mw-white);border-color:var(--mw-bone)}
    .lp-c.start{border-color:var(--mw-rose);color:var(--mw-rose)}
    .lp-lives{display:flex;gap:6px;align-items:center;font:600 .9rem var(--mw-font-slab);color:var(--mw-ash)}
    .lp-lives b{font-size:1.1rem;color:var(--mw-rose)}.lp-lives b.off{color:var(--mw-umber)}
  `);
  const lives_ = h('div', { class: 'lp-lives', 'aria-label': 'Lanterns left' });
  ctx.root.append(style, h('div', { class: 'lp' }, h('div', { class: 'lp-board' }, grid, rays), lives_, btn, say));

  const xy = (i: number): [number, number] => [i % N, Math.floor(i / N)];
  function hud(): void { ctx.hud('Route', `${round + 1}/${LENS.length}`); ctx.hud('Lanterns', lives); ctx.hud('Score', score);
    lives_.replaceChildren('Lanterns:', ...Array.from({ length: LIVES }, (_, i) => h('b', { class: i < lives ? '' : 'off' }, i < lives ? '✦' : '✧'))); }
  function render(): void {
    const shown = phase === 'show' ? Math.floor((t - LEAD) / BEAT) : -1; // index of the tile lit right now
    const litNow = phase === 'show' && t >= LEAD && (t - LEAD) % BEAT < BEAT * 0.8 ? path[shown] : -1;
    grid.replaceChildren(...Array.from({ length: N * N }, (_, i) => {
      const walked = phase !== 'show' && path.indexOf(i) >= 0 && path.indexOf(i) < pos;
      const cls = ['lp-c', i === litNow ? 'lit' : '', walked ? 'walked' : '', i === bad ? 'bad' : '', phase === 'input' && i === path[0] && pos === 0 ? 'start' : ''].filter(Boolean).join(' ');
      return h('button', { class: cls, type: 'button', 'data-i': i, 'aria-label': `Tile ${(i % N) + 1}, ${Math.floor(i / N) + 1}`, onclick: () => step(i) }, i === litNow ? '✦' : walked ? '✦' : i === bad ? '✕' : cls.includes('start') ? '★' : '');
    }));
    const upto = phase === 'show' ? Math.min(path.length - 1, shown) : pos - 1;
    const pts = path.slice(0, Math.max(0, upto + 1)).map((i) => { const [x, y] = xy(i); return `${x + 0.5},${y + 0.5}`; }).join(' ');
    rays.replaceChildren(h('polyline', { points: pts, fill: 'none', stroke: 'var(--mw-rose)', 'stroke-width': 0.07, 'stroke-dasharray': '0.14 0.18', 'stroke-linecap': 'round' }));
    btn.textContent = phase === 'show' ? 'Skip preview' : 'Show the route again (-1 lantern)';
  }
  function begin(): void {
    phase = 'show'; t = 0; pos = 0; bad = -1;
    say.textContent = 'Watch the lanterns: they light the route one tile at a time.'; render();
  }
  function makePath(len: number): number[] {
    for (let tries = 0; tries < 500; tries++) {
      const p = [rint(rand, 0, N * N - 1)];
      while (p.length < len) {
        const [x, y] = xy(p[p.length - 1]);
        const nb = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < N && b < N).map(([a, b]) => b * N + a).filter((i) => !p.includes(i));
        if (!nb.length) break;
        p.push(nb[rint(rand, 0, nb.length - 1)]);
      }
      if (p.length === len) return p;
    }
    return Array.from({ length: len }, (_, i) => i);
  }
  /** Player action: tap the next tile of the route. */
  function step(i: number): void {
    if (ctx.finished || phase !== 'input') return;
    if (i === path[pos]) {
      pos++; ctx.sfx('tap');
      if (pos >= path.length) { score += path.length * 100 + lives * 50; phase = 'done'; doneKind = 'ok'; doneT = 0; ctx.sfx('good'); say.textContent = 'Route walked!'; hud(); }
    } else {
      lives--; bad = i; ctx.sfx('bad'); hud();
      if (lives <= 0) { render(); ctx.finish({ result: 'lose', score, title: 'The lanterns went out', detail: `You lost the route on path ${round + 1} of ${LENS.length}.` }); return; }
      say.textContent = 'Wrong tile. The route lights again.'; phase = 'done'; doneKind = 'bad'; doneT = 0;
    }
    render();
  }
  /** Skip the preview (show phase) or buy another look at the route (input phase, costs a lantern). */
  function replay(): void {
    if (ctx.finished) return;
    if (phase === 'show') { t = LEAD + BEAT * path.length + TAIL; return; }
    if (phase !== 'input') return;
    lives--; hud(); ctx.sfx('bad');
    if (lives <= 0) { ctx.finish({ result: 'lose', score, title: 'The lanterns went out', detail: 'You spent your last lantern on a second look.' }); return; }
    begin();
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    if (phase === 'show') {
      const before = Math.floor((t - LEAD) / BEAT), was = t >= LEAD && (t - LEAD) % BEAT < BEAT * 0.8;
      t += dt;
      const now = Math.floor((t - LEAD) / BEAT), is = t >= LEAD && (t - LEAD) % BEAT < BEAT * 0.8;
      if (t >= LEAD + BEAT * path.length + TAIL) { phase = 'input'; pos = 0; say.textContent = 'Now walk the route from the start tile (★).'; render(); return; }
      if (before !== now || was !== is) { if (is) ctx.sfx('tick'); render(); }
    } else if (phase === 'done') {
      doneT += dt;
      if (doneKind === 'bad' && doneT > 0.7) begin();
      else if (doneKind === 'ok' && doneT > FLASH) {
        round++;
        if (round >= LENS.length) { round = LENS.length - 1; ctx.finish({ result: 'win', score, title: 'Every route remembered', detail: `You walked all ${LENS.length} routes with ${lives} lanterns to spare.` }); return; }
        path = makePath(LENS[round]); hud(); begin();
      }
    }
  }
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; lives = LIVES; score = 0; path = makePath(LENS[0]); hud(); begin(); },
    probe: () => ({ round, lives, phase, pos, score }),
    play(kind: Result) {
      for (let guard = 0; guard < 60000 && !ctx.finished; guard++) {
        if (phase === 'input') {
          if (kind === 'win') step(path[pos]);
          else step([...Array(N * N).keys()].find((i) => i !== path[pos]) as number);
        } else update(1 / 60);
      }
    },
  };
}
