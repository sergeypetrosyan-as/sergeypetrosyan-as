import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Dice Drift: tip a die one square at a time. Visit the numbered marks in order, with the top face showing the pips each mark asks for, inside a roll budget. */
const LEVELS = [{ n: 4, len: 6, marks: 2, slack: 3 }, { n: 5, len: 9, marks: 3, slack: 2 }, { n: 5, len: 12, marks: 3, slack: 1 }];
const DIRS: Record<string, [number, number]> = { N: [-1, 0], S: [1, 0], E: [0, 1], W: [0, -1] };
const ARROW: Record<string, string> = { N: '▲', S: '▼', E: '▶', W: '◀' };
const KEY: Record<string, string> = { ArrowUp: 'N', ArrowDown: 'S', ArrowRight: 'E', ArrowLeft: 'W' };
const PIPS: number[][] = [[], [4], [0, 8], [0, 4, 8], [0, 2, 6, 8], [0, 2, 4, 6, 8], [0, 2, 3, 5, 6, 8]];

interface Die { r: number; c: number; t: number; n: number; e: number }
interface Mark { r: number; c: number; face: number }
/** Tip the die one square. North/east are the faces looking that way; opposite faces add to 7. */
function tip(d: Die, dir: string): Die {
  const [dr, dc] = DIRS[dir];
  if (dir === 'N') return { r: d.r + dr, c: d.c + dc, t: 7 - d.n, n: d.t, e: d.e };
  if (dir === 'S') return { r: d.r + dr, c: d.c + dc, t: d.n, n: 7 - d.t, e: d.e };
  if (dir === 'E') return { r: d.r + dr, c: d.c + dc, t: 7 - d.e, n: d.n, e: d.t };
  return { r: d.r + dr, c: d.c + dc, t: d.e, n: d.n, e: 7 - d.t };
}

export default function diceDrift(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let level = 1, score = 0, size = 4, limit = 0, rolls = 0, next = 0;
  let die: Die = { r: 0, c: 0, t: 1, n: 2, e: 3 }, marks: Mark[] = [], hist: { die: Die; next: number }[] = [];

  const style = h('style', null, `
    .dd{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:10px}
    .dd-board{width:100%;display:grid;gap:4px;padding:6px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-umber)}
    .dd-cell{position:relative;aspect-ratio:1;min-width:0;padding:0;border:2px solid var(--mw-mesa);border-radius:8px;background:var(--mw-night);display:grid;place-items:center;color:var(--mw-bone);font:700 1rem var(--mw-font-slab);cursor:default}
    .dd-cell.near{border-color:var(--mw-rose);cursor:pointer}
    .dd-cell.near::after{content:attr(data-arrow);position:absolute;right:4px;bottom:1px;font-size:.8rem;color:var(--mw-rose)}
    .dd-mark{position:absolute;inset:6px;border:3px dashed var(--mw-rose);border-radius:6px;display:grid;place-items:center}
    .dd-mark b{position:absolute;left:-2px;top:-2px;min-width:20px;padding:0 4px;border-radius:0 0 6px 0;background:var(--mw-rose);color:var(--mw-ink);font-size:.85rem}
    .dd-mark.done{border-style:solid;border-color:var(--mw-ash);opacity:.5}
    .dd-mark.next{border-style:solid;background:color-mix(in srgb,var(--mw-rose) 18%,transparent)}
    .dd-die{position:absolute;inset:4px;border-radius:8px;background:var(--mw-bone);border:3px solid var(--mw-ink);display:grid;place-items:center;z-index:2}
    .dd-p{width:76%;aspect-ratio:1;display:grid;grid-template:repeat(3,1fr)/repeat(3,1fr);place-items:center}
    .dd-p i{width:62%;aspect-ratio:1;border-radius:50%;background:var(--mw-ink)}
    .dd-mark .dd-p i{background:var(--mw-rose)}
    .dd-mark .dd-p{width:60%}
    .dd-info{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;font:600 .95rem var(--mw-font-slab);color:var(--mw-bone)}
    .dd-info span{border:2px solid var(--mw-mesa);border-radius:999px;padding:3px 12px;background:var(--mw-night)}
    .dd-row{display:flex;gap:8px;width:100%}
    .dd-row .mw-btn{flex:1;min-height:48px}
  `);
  const board = h('div', { class: 'dd-board' });
  const info = h('div', { class: 'dd-info', 'aria-live': 'polite' });
  const note = h('p', { class: 'mw-note' });
  const undoBtn = h('button', { class: 'mw-btn', type: 'button', 'data-undo': '', onclick: () => undo() }, 'Undo roll');
  ctx.root.append(style, h('div', { class: 'dd' }, board, info, note, h('div', { class: 'dd-row' }, undoBtn)));

  const pips = (n: number) => h('span', { class: 'dd-p', 'aria-hidden': 'true' }, ...Array.from({ length: 9 }, (_, i) => PIPS[n].includes(i) ? h('i') : h('span')));

  function render(): void {
    board.style.gridTemplateColumns = `repeat(${size},1fr)`;
    const cells: HTMLElement[] = [];
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
      const dir = Object.keys(DIRS).find((k) => die.r + DIRS[k][0] === r && die.c + DIRS[k][1] === c);
      const mi = marks.findIndex((m) => m.r === r && m.c === c);
      const cell = h('button', { class: 'dd-cell' + (dir ? ' near' : ''), type: 'button', 'aria-label': dir ? `Roll ${dir === 'N' ? 'up' : dir === 'S' ? 'down' : dir === 'E' ? 'right' : 'left'}` : `Row ${r + 1} column ${c + 1}`, onclick: () => dir && roll(dir) });
      if (dir) { cell.setAttribute('data-roll', dir); cell.setAttribute('data-arrow', ARROW[dir]); }
      if (mi >= 0) cell.append(h('span', { class: 'dd-mark' + (mi < next ? ' done' : mi === next ? ' next' : ''), title: `Mark ${mi + 1}: top face ${marks[mi].face}` }, h('b', null, mi < next ? '✓' : mi + 1), pips(marks[mi].face)));
      if (die.r === r && die.c === c) cell.append(h('span', { class: 'dd-die', 'aria-label': `Die, top face ${die.t}` }, pips(die.t)));
      cells.push(cell);
    }
    board.replaceChildren(...cells);
    info.replaceChildren(h('span', null, `Top ${die.t}`), h('span', null, `North ${die.n}`), h('span', null, `East ${die.e}`));
    note.textContent = next < marks.length ? `Next: mark ${next + 1} needs ${marks[next].face} on top. Opposite faces add to 7.` : 'All marks reached.';
    (undoBtn as HTMLButtonElement).disabled = !hist.length;
    ctx.hud('Map', `${level}/${LEVELS.length}`); ctx.hud('Rolls left', limit - rolls); ctx.hud('Marks', `${next}/${marks.length}`); ctx.hud('Score', score);
  }
  function build(): void {
    const cfg = LEVELS[level - 1]; size = cfg.n; limit = cfg.len + cfg.slack; rolls = 0; next = 0; hist = [];
    for (let tries = 0; ; tries++) {
      let d: Die = { r: rint(rand, 0, size - 1), c: rint(rand, 0, size - 1), t: 1, n: 2, e: 3 };
      const start = d, path = [d], seen = new Set([d.r * 9 + d.c]);
      while (path.length <= cfg.len) {
        const opts = Object.keys(DIRS).filter((k) => { const q = tip(d, k); return q.r >= 0 && q.c >= 0 && q.r < size && q.c < size && !seen.has(q.r * 9 + q.c); });
        if (!opts.length) break;
        d = tip(d, opts[Math.floor(rand() * opts.length)]); path.push(d); seen.add(d.r * 9 + d.c);
      }
      if (path.length <= cfg.len && tries < 200) continue;
      die = start;
      marks = Array.from({ length: cfg.marks }, (_, j) => { const q = path[Math.ceil(((path.length - 1) * (j + 1)) / cfg.marks)]; return { r: q.r, c: q.c, face: q.t }; });
      return;
    }
  }
  /** The one player action: tip the die one square in a direction. */
  function roll(dir: string): void {
    if (ctx.finished) return;
    const q = tip(die, dir);
    if (q.r < 0 || q.c < 0 || q.r >= size || q.c >= size) return;
    hist.push({ die, next }); die = q; rolls++; ctx.sfx('tap');
    if (next < marks.length && marks[next].r === q.r && marks[next].c === q.c && marks[next].face === q.t) { next++; ctx.sfx('good'); }
    render();
    if (next >= marks.length) {
      score += 200 + (limit - rolls) * 50;
      if (level >= LEVELS.length) { ctx.finish({ result: 'win', score, title: 'Dice on the marks', detail: `All ${LEVELS.length} maps cleared.` }); return; }
      level++; build(); render();
    } else if (rolls >= limit) ctx.finish({ result: 'lose', score, title: 'Out of rolls', detail: `Map ${level}: ${next} of ${marks.length} marks reached.` });
  }
  function undo(): void {
    const s = hist.pop(); if (!s || ctx.finished) return;
    die = s.die; next = s.next; rolls--; render();
  }
  ctx.keys(Object.fromEntries(Object.entries(KEY).map(([k, d]) => [k, (down: boolean) => down && roll(d)])));
  ctx.pad([{ key: 'ArrowLeft', label: '◀' }, { key: 'ArrowUp', label: '▲' }, { key: 'ArrowDown', label: '▼' }, { key: 'ArrowRight', label: '▶' }]);

  /** Breadth-first plan from the current state to all remaining marks within the roll budget. */
  function solve(): string[] {
    const k = (d: Die, nx: number) => `${d.r},${d.c},${d.t},${d.n},${d.e},${nx}`;
    let frontier: { d: Die; nx: number; path: string[] }[] = [{ d: die, nx: next, path: [] }];
    const seen = new Set([k(die, next)]);
    for (let depth = 0; depth < limit - rolls && frontier.length; depth++) {
      const nf: typeof frontier = [];
      for (const s of frontier) for (const dir of Object.keys(DIRS)) {
        const q = tip(s.d, dir);
        if (q.r < 0 || q.c < 0 || q.r >= size || q.c >= size) continue;
        let nx = s.nx; const m = marks[nx];
        if (m && m.r === q.r && m.c === q.c && m.face === q.t) nx++;
        if (nx >= marks.length) return [...s.path, dir];
        const key = k(q, nx); if (seen.has(key)) continue;
        seen.add(key); nf.push({ d: q, nx, path: [...s.path, dir] });
      }
      frontier = nf;
    }
    return [];
  }

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); level = 1; score = 0; build(); render(); },
    probe: () => ({ level, r: die.r, c: die.c, top: die.t, rolls, next }),
    play(kind) {
      for (let g = 0; g < 60 && !ctx.finished; g++) {
        if (kind === 'win') { const plan = solve(); const lv = level; for (const dir of plan) { if (ctx.finished || level !== lv) break; roll(dir); } }
        else { const b = Object.keys(DIRS).find((x) => { const q = tip(die, x); return q.r >= 0 && q.c >= 0 && q.r < size && q.c < size; })!; roll(b); const back = ({ N: 'S', S: 'N', E: 'W', W: 'E' } as Record<string, string>)[b]; roll(back); }
      }
    },
  };
}
