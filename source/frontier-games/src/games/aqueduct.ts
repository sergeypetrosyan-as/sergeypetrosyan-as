import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Aqueduct: rotate stone channels a quarter turn so water from the spring reaches every trough within the turn budget. */
const SIZES = [4, 5, 6];
const N = 1, E = 2, S = 4, W = 8;
const DIRS = [{ b: N, dx: 0, dy: -1, o: S }, { b: E, dx: 1, dy: 0, o: W }, { b: S, dx: 0, dy: 1, o: N }, { b: W, dx: -1, dy: 0, o: E }];
const rot = (m: number): number => ((m << 1) | (m >> 3)) & 15;

/** Tiles joined by a random spanning tree plus a few loops. Returns target masks, root and trough cells. */
function build(rand: () => number, n: number) {
  for (;;) {
    const root = rint(rand, 0, n * n - 1);
    const mask = Array(n * n).fill(0);
    const seen = new Set([root]);
    const edge: [number, number, number][] = [];
    const push = (c: number) => DIRS.forEach((d, di) => { const x = (c % n) + d.dx, y = Math.floor(c / n) + d.dy; if (x >= 0 && y >= 0 && x < n && y < n) edge.push([c, x + y * n, di]); });
    push(root);
    while (edge.length) {
      const [a, b, di] = edge.splice(Math.floor(rand() * edge.length), 1)[0];
      if (seen.has(b)) continue;
      seen.add(b); mask[a] |= DIRS[di].b; mask[b] |= DIRS[di].o; push(b);
    }
    for (let k = Math.floor(n * n * 0.12), tries = 0; k > 0 && tries < 99; tries++) {
      const a = rint(rand, 0, n * n - 1), di = rint(rand, 0, 3), d = DIRS[di];
      const x = (a % n) + d.dx, y = Math.floor(a / n) + d.dy;
      if (x < 0 || y < 0 || x >= n || y >= n || mask[a] & d.b) continue;
      mask[a] |= d.b; mask[x + y * n] |= d.o; k--;
    }
    const troughs = mask.map((m, i) => (i !== root && [1, 2, 4, 8].includes(m) ? i : -1)).filter((i) => i >= 0);
    if (troughs.length >= 3) return { mask, root, troughs };
  }
}
function wet(n: number, cur: number[], root: number): Set<number> {
  const w = new Set([root]), q = [root];
  while (q.length) {
    const c = q.pop()!;
    for (const d of DIRS) {
      if (!(cur[c] & d.b)) continue;
      const x = (c % n) + d.dx, y = Math.floor(c / n) + d.dy;
      if (x < 0 || y < 0 || x >= n || y >= n) continue;
      const nb = x + y * n;
      if (cur[nb] & d.o && !w.has(nb)) { w.add(nb); q.push(nb); }
    }
  }
  return w;
}

export default function aqueduct(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let level = 0, score = 0, turns = 0, n = 4, root = 0, cursor = 0;
  let tgt: number[] = [], cur: number[] = [], troughs: number[] = [];
  let tiles: HTMLButtonElement[] = [];

  const style = h('style', null, `
    .aq{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .aq-grid{width:100%;display:grid;gap:3px;padding:6px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-ink)}
    .aq-t{aspect-ratio:1;min-width:44px;padding:0;border:1px solid var(--mw-umber);border-radius:6px;background:var(--mw-night);cursor:pointer}
    .aq-t svg{display:block;width:100%;height:100%}
    .aq-t.cur{outline:2px dashed var(--mw-bone);outline-offset:-3px}
    .aq-lock{cursor:default;border-color:var(--mw-rose)}
  `);
  const grid = h('div', { class: 'aq-grid' });
  const note = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'aq' }, grid, note));

  const solved = (m: number[]) => { const w = wet(n, m, root); return troughs.every((t) => w.has(t)); };
  function pipes(m: number, wetNow: boolean): string {
    let s = '';
    const line = (c: string, wd: number, o = '') => [[N, 50, 0], [E, 100, 50], [S, 50, 100], [W, 0, 50]].filter((p) => m & p[0]).map((p) => `<line x1="50" y1="50" x2="${p[1]}" y2="${p[2]}" stroke="${c}" stroke-width="${wd}" stroke-linecap="butt" ${o}/>`).join('') + `<circle cx="50" cy="50" r="${wd / 2}" fill="${c}"/>`;
    s += line('var(--mw-tan)', 34) + line(wetNow ? 'var(--mw-rose)' : 'var(--mw-umber)', 22);
    if (wetNow) s += line('var(--mw-bone)', 5, 'stroke-dasharray="6 8"');
    return s;
  }
  function paint(): void {
    const w = wet(n, cur, root);
    tiles.forEach((b, i) => {
      const isT = troughs.includes(i), on = w.has(i);
      let art = pipes(cur[i], on);
      if (i === root) art += `<circle cx="50" cy="50" r="19" fill="var(--mw-bone)" stroke="var(--mw-red)" stroke-width="4"/><path d="M50 38 Q58 50 50 60 Q42 50 50 38Z" fill="var(--mw-red)"/>`;
      if (isT) art += on ? `<path d="M30 40 Q50 80 70 40 Z" fill="var(--mw-rose)" stroke="var(--mw-bone)" stroke-width="4"/><polygon points="50,44 53,52 61,52 55,57 57,65 50,60 43,65 45,57 39,52 47,52" fill="var(--mw-bone)"/>` : `<path d="M30 40 Q50 80 70 40 Z" fill="var(--mw-ink)" stroke="var(--mw-ember)" stroke-width="5"/>`;
      b.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true">${art}</svg>`;
      b.setAttribute('aria-label', `${i === root ? 'Spring' : isT ? (on ? 'Full trough' : 'Empty trough') : 'Channel'} row ${Math.floor(i / n) + 1} column ${(i % n) + 1}`);
      b.classList.toggle('cur', i === cursor);
    });
    const full = troughs.filter((t) => w.has(t)).length;
    ctx.hud('Level', `${level + 1}/${SIZES.length}`); ctx.hud('Turns left', turns); ctx.hud('Troughs', `${full}/${troughs.length}`); ctx.hud('Score', score);
  }
  function startLevel(): void {
    n = SIZES[level];
    for (;;) {
      const b = build(rand, n);
      tgt = b.mask; root = b.root; troughs = b.troughs;
      cur = tgt.map((m, i) => { if (i === root) return m; let r = rint(rand, 0, 3); while (r--) m = rot(m); return m; });
      let need = 0, off = 0;
      tgt.forEach((m, i) => { if (i === root) return; let r = 0, c = cur[i]; while (c !== m) { c = rot(c); r++; } need += r; if (r) off++; });
      if (!solved(cur) && off >= Math.ceil(n * n * 0.5)) { turns = need + Math.ceil(need * 0.5) + 3; break; }
    }
    tiles = Array.from({ length: n * n }, (_, i) => h('button', { class: 'aq-t' + (i === root ? ' aq-lock' : ''), type: 'button', 'data-i': i, onclick: () => turn(i) }));
    grid.style.gridTemplateColumns = `repeat(${n},1fr)`;
    grid.replaceChildren(...tiles);
    cursor = (root + 1) % (n * n);
    note.textContent = 'Tap a channel to turn it. The glowing stream shows where the water already runs.';
    paint();
  }
  /** The one player action: turn a channel a quarter clockwise. */
  function turn(i: number): void {
    if (ctx.finished || i === root || turns <= 0) return;
    cursor = i; cur[i] = rot(cur[i]); turns--; ctx.sfx('tap');
    if (solved(cur)) {
      score += 200 + turns * 10; paint(); ctx.sfx('good');
      if (level >= SIZES.length - 1) { ctx.finish({ result: 'win', score, title: 'Water everywhere', detail: `Every trough is full with ${turns} turns to spare.` }); return; }
      level++; startLevel(); note.textContent = 'Troughs filled. A bigger town next.'; return;
    }
    paint();
    if (turns <= 0) ctx.finish({ result: 'lose', score, title: 'The spring runs dry', detail: `Out of turns on level ${level + 1} with ${troughs.filter((t) => wet(n, cur, root).has(t)).length} of ${troughs.length} troughs full.` });
  }
  const move = (dx: number, dy: number) => () => { const x = Math.min(n - 1, Math.max(0, (cursor % n) + dx)), y = Math.min(n - 1, Math.max(0, Math.floor(cursor / n) + dy)); cursor = x + y * n; paint(); };
  ctx.keys({ ArrowLeft: (d) => d && move(-1, 0)(), ArrowRight: (d) => d && move(1, 0)(), ArrowUp: (d) => d && move(0, -1)(), ArrowDown: (d) => d && move(0, 1)(), Enter: (d) => d && turn(cursor), ' ': (d) => d && turn(cursor) });

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); level = 0; score = 0; startLevel(); },
    probe: () => ({ level, turns, cur: cur.join(','), score }),
    play(kind: Result) {
      const order = () => tgt.map((_, i) => i).filter((i) => i !== root);
      for (let g = 0; g < 3000 && !ctx.finished; g++) {
        if (kind === 'win') {
          const lv = level;
          for (const i of order()) while (level === lv && !ctx.finished && cur[i] !== tgt[i]) turn(i);
        } else {
          const would = (i: number) => { const c = cur.slice(); c[i] = rot(c[i]); return solved(c); };
          const i = order().find((k) => !would(k)) ?? order()[0];
          turn(i);
        }
      }
    },
  };
}
