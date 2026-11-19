import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Sowing Pits: Kalah on five pits a side. Sow a pit's seeds round the board; end in your store to go again, or in an empty pit of yours to capture. Beat two rivals. */
const PITS = 5, SEEDS = 3, SIZE = 12, MINE = 5, THEIRS = 11;       // indexes 0-4 you, 5 your store, 6-10 rival, 11 rival store
const RIVALS = [{ name: 'Apprentice', depth: 0 }, { name: 'Sharp rival', depth: 4 }];
type Side = 0 | 1;
const store = (side: Side): number => (side === 0 ? MINE : THEIRS);
const sideOf = (i: number): Side => (i < MINE ? 0 : 1);
const range = (side: Side): number[] => Array.from({ length: PITS }, (_, k) => (side === 0 ? 0 : 6) + k);

/** Pure rules: sow from pit i for `side`. Returns the new board and whether the move earns another turn. */
function sow(s: number[], side: Side, i: number): { s: number[]; extra: boolean; capture: number } {
  const b = s.slice(); let n = b[i]; b[i] = 0; let j = i;
  while (n > 0) { j = (j + 1) % SIZE; if (j === store((1 - side) as Side)) continue; b[j]++; n--; }
  let capture = 0;
  if (j !== store(side) && sideOf(j) === side && j !== MINE && j !== THEIRS && b[j] === 1 && b[10 - j] > 0) { capture = b[10 - j] + 1; b[store(side)] += capture; b[j] = 0; b[10 - j] = 0; }
  return { s: b, extra: j === store(side), capture };
}
const over = (s: number[]): boolean => range(0).every((i) => !s[i]) || range(1).every((i) => !s[i]);
function finalize(s: number[]): number[] { const b = s.slice(); for (const side of [0, 1] as Side[]) for (const i of range(side)) { b[store(side)] += b[i]; b[i] = 0; } return b; }
function negamax(s: number[], side: Side, depth: number, alpha: number, beta: number): number {
  if (over(s)) { const f = finalize(s); return f[store(side)] - f[store((1 - side) as Side)]; }
  if (depth === 0) return s[store(side)] - s[store((1 - side) as Side)];
  let best = -99;
  for (const i of range(side)) {
    if (!s[i]) continue;
    const r = sow(s, side, i);
    const v = r.extra ? negamax(r.s, side, depth - 1, alpha, beta) : -negamax(r.s, (1 - side) as Side, depth - 1, -beta, -alpha);
    if (v > best) best = v; if (best > alpha) alpha = best; if (alpha >= beta) break;
  }
  return best;
}
function bestMove(s: number[], side: Side, depth: number, worst = false): number {
  let pick = -1, score = -999;
  for (const i of range(side)) {
    if (!s[i]) continue;
    const r = sow(s, side, i);
    let v = r.extra ? negamax(r.s, side, depth - 1, -99, 99) : -negamax(r.s, (1 - side) as Side, depth - 1, -99, 99);
    if (worst) v = -v;
    if (v > score) { score = v; pick = i; }
  }
  return pick;
}

export default function sowingPits(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let b: number[] = [], turn: Side = 0, match = 0, score = 0, t = 0, last = -1, msg = '', phase: 'play' | 'between' = 'play';
  const wins: number[] = [];

  const rivalRow = h('div', { class: 'sp-row' }), mineRow = h('div', { class: 'sp-row' });
  const stR = h('div', { class: 'sp-store r', 'aria-label': 'Rival store' }), stM = h('div', { class: 'sp-store m', 'aria-label': 'Your store' });
  const say = h('p', { class: 'mw-big sp-say', role: 'status' });
  const sub = h('p', { class: 'mw-note' });
  const style = h('style', null, `
    .sp{width:100%;max-width:420px;display:flex;flex-direction:column;align-items:center;gap:8px}
    .sp-board{width:100%;display:grid;grid-template-columns:54px 1fr 54px;gap:6px;padding:8px;border:2px solid var(--mw-ember);border-radius:14px;background:var(--mw-role-surface-raised);align-items:stretch}
    .sp-mid{display:flex;flex-direction:column;gap:6px}
    .sp-row{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
    .sp-lbl{font:600 .75rem var(--mw-font-slab);color:var(--mw-ash);text-align:center}
    .sp-pit{min-height:62px;border-radius:50% 50% 12px 12px/ 40% 40% 12px 12px;border:2px solid var(--mw-mesa);background:var(--mw-night);color:var(--mw-bone);font:700 1.3rem var(--mw-font-slab);padding:2px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer}
    .sp-pit.mine{border-color:var(--mw-saddle)}.sp-pit:disabled{cursor:default;opacity:.7}.sp-pit.mine:not(:disabled){border-color:var(--mw-rose)}
    .sp-pit.last{background:var(--mw-wine);border-color:var(--mw-bone)}
    .sp-dots{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;max-width:46px}.sp-dots i{width:6px;height:6px;border-radius:50%;background:var(--mw-tan)}
    .sp-store{border:2px solid var(--mw-ember);border-radius:27px;background:var(--mw-night);color:var(--mw-bone);display:flex;flex-direction:column;align-items:center;justify-content:center;font:700 1.5rem var(--mw-font-slab);gap:2px;min-height:130px}
    .sp-store small{font:600 .65rem var(--mw-font-slab);color:var(--mw-ash)}.sp-store.m{border-color:var(--mw-rose)}.sp-store.last{background:var(--mw-wine)}
    .sp-say{font-size:clamp(1.1rem,4.6vw,1.5rem);text-align:center;min-height:1.2em}
  `);
  ctx.root.append(style, h('div', { class: 'sp' }, say, h('div', { class: 'sp-board' }, stR, h('div', { class: 'sp-mid' }, h('div', { class: 'sp-lbl' }, '← rival sows this way'), rivalRow, mineRow, h('div', { class: 'sp-lbl' }, 'you sow this way →')), stM), sub));

  const pit = (i: number): HTMLElement => h('button', { class: 'sp-pit' + (i < 5 ? ' mine' : '') + (i === last ? ' last' : ''), type: 'button', 'data-pit': i, disabled: !(i < 5 && turn === 0 && phase === 'play' && b[i] > 0), 'aria-label': `${i < 5 ? 'Your' : 'Rival'} pit ${i < 5 ? i + 1 : 11 - i}, ${b[i]} seeds`, onclick: () => choose(i) },
    h('span', null, b[i]), h('span', { class: 'sp-dots' }, ...Array.from({ length: Math.min(b[i], 9) }, () => h('i'))));
  function render(): void {
    mineRow.replaceChildren(...[0, 1, 2, 3, 4].map(pit));
    rivalRow.replaceChildren(...[10, 9, 8, 7, 6].map(pit));
    stM.className = 'sp-store m' + (last === MINE ? ' last' : ''); stR.className = 'sp-store r' + (last === THEIRS ? ' last' : '');
    stM.replaceChildren(h('small', null, 'You'), String(b[MINE])); stR.replaceChildren(h('small', null, 'Rival'), String(b[THEIRS]));
    say.textContent = msg || (turn === 0 ? 'Your move' : `${RIVALS[match].name} is thinking...`);
  }
  function hud(): void { ctx.hud('Match', `${match + 1}/${RIVALS.length}`); ctx.hud('You', b[MINE]); ctx.hud('Rival', b[THEIRS]); }
  function newMatch(): void {
    b = Array(SIZE).fill(SEEDS); b[MINE] = 0; b[THEIRS] = 0; turn = 0; last = -1; t = 0; phase = 'play'; msg = '';
    sub.textContent = `Versus the ${RIVALS[match].name}. Pick one of your pits (bottom row) to sow it.`; render(); hud();
  }
  function play(i: number, side: Side): void {
    const r = sow(b, side, i); b = r.s; last = r.extra ? store(side) : i;
    msg = r.capture ? `${side === 0 ? 'You capture' : 'Rival captures'} ${r.capture}!` : r.extra ? `${side === 0 ? 'You go' : 'Rival goes'} again.` : '';
    ctx.sfx(r.capture ? 'good' : 'tap');
    if (over(b)) { b = finalize(b); render(); hud(); endMatch(); return; }
    if (!r.extra) turn = (1 - side) as Side;
    t = 0; render(); hud();
  }
  function endMatch(): void {
    const diff = b[MINE] - b[THEIRS];
    if (diff > 0) {
      score += 200 + diff * 40; ctx.sfx('good');
      if (match >= RIVALS.length - 1) { ctx.finish({ result: 'win', score, title: 'Both rivals beaten', detail: `You won ${b[MINE]} to ${b[THEIRS]} against the ${RIVALS[match].name}.` }); return; }
      msg = `Match won ${b[MINE]} to ${b[THEIRS]}. A sharper rival sits down.`; phase = 'between'; t = 0; render();
    } else ctx.finish({ result: 'lose', score, title: diff === 0 ? 'A draw is not enough' : 'The rival took the pits', detail: `${b[MINE]} to ${b[THEIRS]} against the ${RIVALS[match].name}.` });
  }
  /** The one player action: sow one of your pits. */
  function choose(i: number): void {
    if (ctx.finished || phase !== 'play' || turn !== 0 || i < 0 || i >= PITS || !b[i]) return;
    play(i, 0);
  }
  function rivalMove(): void {
    const opts = range(1).filter((i) => b[i] > 0);
    const rv = RIVALS[match];
    if (rv.depth === 0) {
      if (rand() < 0.3) { play(opts[Math.floor(rand() * opts.length)], 1); return; }
      let pick = opts[0], bestV = -99;
      for (const i of opts) { const r = sow(b, 1, i), v = r.s[THEIRS] - b[THEIRS] + (r.extra ? 4 : 0) + rand() * 0.5; if (v > bestV) { bestV = v; pick = i; } }
      play(pick, 1);
    } else play(bestMove(b, 1, rv.depth), 1);
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt;
    if (phase === 'between' && t > 1.6) { match++; newMatch(); }
    else if (phase === 'play' && turn === 1 && t > 0.8) rivalMove();
  }
  ctx.keys({ '1': (d) => d && choose(0), '2': (d) => d && choose(1), '3': (d) => d && choose(2), '4': (d) => d && choose(3), '5': (d) => d && choose(4) });
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); match = 0; score = 0; wins.length = 0; newMatch(); },
    probe: () => ({ match, turn, b: b.join(','), phase }),
    play(kind: Result) {
      for (let guard = 0; guard < 6000 && !ctx.finished; guard++) {
        if (phase === 'play' && turn === 0) choose(bestMove(b, 0, kind === 'win' ? 9 : 5, kind === 'lose'));
        else update(1 / 60);
      }
    },
  };
}
