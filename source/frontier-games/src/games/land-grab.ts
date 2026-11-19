import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Land Grab: take turns planting stakes. Open land touching only your fence is yours; land touching both fences is nobody's. */
const LV = [{ n: 5, stakes: 6, rs: 5, ai: 0 }, { n: 6, stakes: 8, rs: 7, ai: 1 }, { n: 7, stakes: 10, rs: 9, ai: 2 }];

/** Count each side's total: stakes plus open regions bordered by that side only. */
function tally(n: number, b: number[]): { p: number; r: number; land: number[] } {
  const land = Array(n * n).fill(0);
  let p = 0, r = 0;
  b.forEach((o) => { if (o === 1) p++; else if (o === 2) r++; });
  const seen = Array(n * n).fill(false);
  for (let s = 0; s < n * n; s++) {
    if (b[s] || seen[s]) continue;
    const cells = [s], edge = new Set<number>();
    seen[s] = true;
    for (let k = 0; k < cells.length; k++) {
      const c = cells[k], x = c % n, y = (c / n) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const X = x + dx, Y = y + dy;
        if (X < 0 || Y < 0 || X >= n || Y >= n) continue;
        const q = X + Y * n;
        if (b[q]) edge.add(b[q]); else if (!seen[q]) { seen[q] = true; cells.push(q); }
      }
    }
    if (edge.size === 1) { const o = [...edge][0]; if (o === 1) p += cells.length; else r += cells.length; cells.forEach((c) => (land[c] = o)); }
  }
  return { p, r, land };
}

/** Fast (your total - rival total) for the search, with no per-call allocation. */
const SEEN = new Int32Array(64), QUE = new Int32Array(64);
let STAMP = 0;
function diff(n: number, b: number[]): number {
  let d = 0; STAMP++;
  for (let s = 0; s < n * n; s++) {
    if (b[s]) { d += b[s] === 1 ? 1 : -1; continue; }
    if (SEEN[s] === STAMP) continue;
    let qh = 0, qt = 0, edge = 0; QUE[qt++] = s; SEEN[s] = STAMP;
    while (qh < qt) {
      const c = QUE[qh++], x = c % n, y = (c / n) | 0;
      for (let k = 0; k < 4; k++) {
        const X = x + (k === 0 ? 1 : k === 1 ? -1 : 0), Y = y + (k === 2 ? 1 : k === 3 ? -1 : 0);
        if (X < 0 || Y < 0 || X >= n || Y >= n) continue;
        const q = X + Y * n;
        if (b[q]) edge |= b[q]; else if (SEEN[q] !== STAMP) { SEEN[q] = STAMP; QUE[qt++] = q; }
      }
    }
    if (edge === 1) d += qt; else if (edge === 2) d -= qt;
  }
  return d;
}

export default function landGrab(ctx: Ctx): Instance {
  let rand = makeRng(1);
  type Phase = 'you' | 'rival' | 'done';
  let phase: Phase = 'you';
  let level = 0, score = 0, n = 5, left = [0, 0], t = 0, msg = '';
  let b: number[] = [];
  let cells: HTMLButtonElement[] = [];

  const grid = h('div', { class: 'lg-grid' });
  const note = h('p', { class: 'mw-note', role: 'status', style: { minHeight: '2.8em', margin: 0 } });
  const style = h('style', null, `
    .lg{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .lg-grid{width:100%;display:grid;gap:3px;padding:6px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-ink)}
    .lg-c{position:relative;aspect-ratio:1;min-width:44px;padding:0;border:1px solid var(--mw-umber);border-radius:6px;background:var(--mw-night);cursor:pointer;color:var(--mw-bone);font:700 1.1rem var(--mw-font-slab)}
    .lg-c.lp{background:var(--mw-wine)}.lg-c.lr{background:var(--mw-umber)}
    .lg-c:disabled{cursor:default}
    .lg-m{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none;z-index:2;font-size:1.5rem}
    .lg-p{width:56%;height:56%;border-radius:50%;background:var(--mw-bone);border:3px solid var(--mw-ink)}
    .lg-r{width:46%;height:46%;background:var(--mw-red);border:3px solid var(--mw-bone);transform:rotate(45deg)}
    .lg-f{position:absolute;z-index:1;pointer-events:none}
    .lg-f.h{left:50%;top:calc(50% - 2px);height:4px;width:calc(100% + 3px)}
    .lg-f.v{top:50%;left:calc(50% - 2px);width:4px;height:calc(100% + 3px)}
    .lg-f.p{background:var(--mw-bone)}.lg-f.r{background:var(--mw-red)}
  `);
  const pass = h('button', { class: 'mw-btn', type: 'button', 'data-pass': '', onclick: () => place(-1) }, 'Pass (wastes a stake)');
  ctx.root.append(style, h('div', { class: 'lg' }, grid, pass, note));

  function render(): void {
    const s = tally(n, b);
    cells.forEach((el, i) => {
      const o = b[i], land = s.land[i], x = i % n, y = (i / n) | 0;
      el.className = 'lg-c' + (!o && land === 1 ? ' lp' : !o && land === 2 ? ' lr' : '');
      el.disabled = phase !== 'you' || !!o;
      const fence = (j: number, cls: string) => (b[j] === o && o ? `<i class="lg-f ${cls} ${o === 1 ? 'p' : 'r'}"></i>` : '');
      el.innerHTML = fence(i + 1 < n * n && x < n - 1 ? i + 1 : -1, 'h') + fence(y < n - 1 ? i + n : -1, 'v') + (o === 1 ? '<span class="lg-m"><span class="lg-p"></span></span>' : o === 2 ? '<span class="lg-m"><span class="lg-r"></span></span>' : land ? `<span class="lg-m">${land === 1 ? '<b style="color:var(--mw-bone)">•</b>' : '<b style="color:var(--mw-red)">×</b>'}</span>` : '');
      el.setAttribute('aria-label', `Row ${y + 1} column ${x + 1}: ${o === 1 ? 'your stake' : o === 2 ? 'rival stake' : land === 1 ? 'your land' : land === 2 ? 'rival land' : 'open'}`);
    });
    note.textContent = msg;
    ctx.hud('Board', `${level + 1}/${LV.length}`); ctx.hud('Stakes left', left[0]); ctx.hud('Your land', s.p); ctx.hud('Rival land', s.r); ctx.hud('Score', score);
  }
  function startLevel(): void {
    n = LV[level].n; b = Array(n * n).fill(0); left = [LV[level].stakes, LV[level].rs]; phase = 'you'; t = 0;
    cells = Array.from({ length: n * n }, (_, i) => h('button', { class: 'lg-c', type: 'button', 'data-i': i, onclick: () => place(i) }));
    grid.style.gridTemplateColumns = `repeat(${n},1fr)`; grid.replaceChildren(...cells);
    msg = `Board ${level + 1}: You have ${left[0]} stakes, the rival ${left[1]}. Fence open land so it touches only your stakes. Ties go to you.`;
    render();
  }
  /** Search: score is (your total - rival total) after both sides spend their remaining stakes greedily to `depth` plies. */
  function search(bd: number[], who: 1 | 2, depth: number, alpha: number, beta: number): number {
    if (!depth) return diff(n, bd);
    let best = who === 1 ? -1e9 : 1e9;
    for (let i = 0; i < bd.length; i++) {
      if (bd[i]) continue;
      bd[i] = who;
      const v = search(bd, who === 1 ? 2 : 1, depth - 1, alpha, beta);
      bd[i] = 0;
      if (who === 1) { best = Math.max(best, v); alpha = Math.max(alpha, v); } else { best = Math.min(best, v); beta = Math.min(beta, v); }
      if (beta <= alpha) break;
    }
    return best;
  }
  function choose(who: 1 | 2, depth: number, worst = false): number {
    const free = b.map((o, i) => (o ? -1 : i)).filter((i) => i >= 0);
    let pick = free[0], bv = -1e9;
    for (const i of free) {
      b[i] = who;
      let v = depth > 1 ? search(b, who === 1 ? 2 : 1, depth - 1, -1e9, 1e9) : (() => { return diff(n, b); })();
      b[i] = 0;
      v = (who === 1 ? v : -v) * (worst ? -1 : 1) + rand() * 0.01;
      if (v > bv) { bv = v; pick = i; }
    }
    return pick;
  }
  function endIfDone(): void {
    if (left[0] || left[1]) return;
    const s = tally(n, b); phase = 'done'; render();
    if (s.p >= s.r) {
      score += 200 + (s.p - s.r) * 20; ctx.sfx('good');
      if (level >= LV.length - 1) { render(); ctx.finish({ result: 'win', score, title: 'Biggest spread in the county', detail: `You won the last board ${s.p} to ${s.r}.` }); return; }
      msg = `Board won ${s.p} to ${s.r}. A bigger range and a sharper rival next.`; level++; t = -1; phase = 'done';
    } else ctx.finish({ result: 'lose', score, title: 'The rival fenced you out', detail: `Board ${level + 1} ended ${s.p} to ${s.r}.` });
  }
  /** The one player action: plant a stake. */
  function place(i: number): void {
    if (ctx.finished || phase !== 'you' || (i >= 0 && b[i]) || !left[0]) return;
    if (i >= 0) b[i] = 1;
    left[0]--; ctx.sfx('tap'); t = 0;
    if (left[1] > 0) { msg = 'The rival is thinking…'; phase = 'rival'; render(); } else { msg = left[0] ? 'Your stake.' : ''; render(); endIfDone(); }
  }
  function rivalMove(): void {
    const ai = LV[level].ai;
    let i: number;
    const free = b.map((o, k) => (o ? -1 : k)).filter((k) => k >= 0);
    if (ai === 0 && rand() < 0.3) i = free[Math.floor(rand() * free.length)]; else i = choose(2, ai === 2 ? 2 : 1);
    b[i] = 2; left[1]--; ctx.sfx('bad');
    phase = 'you'; msg = left[0] ? 'Your stake.' : ''; render(); endIfDone();
  }
  function update(dt: number): void {
    t += dt;
    if (phase === 'rival' && t > 0.55) rivalMove();
    else if (phase === 'done' && t > 1.3 && !ctx.finished) startLevel();
  }
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); level = 0; score = 0; startLevel(); },
    probe: () => ({ level, phase, left: left.join(','), board: b.join(''), score }),
    play(kind: Result) {
      for (let g = 0; g < 4000 && !ctx.finished; g++) {
        if (phase === 'you') place(kind === 'win' ? choose(1, n < 7 ? 4 : 3) : -1); else update(1 / 60);
      }
    },
  };
}
