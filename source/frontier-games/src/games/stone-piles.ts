import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Stone Piles: misère Nim against a rival. Take any number of stones from one pile; whoever takes the last stone loses. */
const GAMES = 3, SKILL = [0.6, 0.85, 1], HINTS = 2;

export default function stonePiles(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let piles: number[] = [], game = 0, wins = 0, losses = 0, score = 0, hints = HINTS;
  let phase: 'me' | 'rival' | 'result' = 'me', t = 0, sel: { p: number; n: number } | null = null, hint: { p: number; n: number } | null = null, moves = 0;

  const board = h('div', { class: 'sp-board' });
  const act = h('button', { class: 'mw-btn primary', type: 'button', 'data-take': '', disabled: true }, 'Take stones');
  const hintBtn = h('button', { class: 'mw-btn', type: 'button', 'data-hint': '' }, 'Hint');
  const say = h('p', { class: 'mw-note sp-say', role: 'status' });
  const style = h('style', null, `
    .sp-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:440px;margin:auto}
    .sp-board{display:flex;flex-direction:column;gap:10px;width:100%;padding:10px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-role-surface-raised)}
    .sp-row{display:flex;align-items:center;gap:6px;padding-bottom:6px;border-bottom:4px solid var(--mw-umber)}
    .sp-lab{width:26px;font:700 1rem var(--mw-font-slab);color:var(--mw-smoke)}
    .sp-stones{display:flex;gap:6px;flex-wrap:wrap}
    .sp-s{width:46px;height:46px;border-radius:50% 50% 44% 44%;border:2px solid var(--mw-saddle);background:var(--mw-tan);color:var(--mw-ink);font:700 1.1rem var(--mw-font-slab);padding:0;cursor:pointer;touch-action:manipulation}
    .sp-s.sel{background:var(--mw-red);color:var(--mw-white);border-color:var(--mw-bone)}
    .sp-s.hint{border:3px dashed var(--mw-rose);background:var(--mw-bone)}
    .sp-s:disabled{cursor:default;opacity:.8}
    .sp-say{text-align:center;min-height:2.6em}
  `);
  ctx.root.append(style, h('div', { class: 'sp-wrap' }, board, h('div', { class: 'mw-row' }, act, hintBtn), say));

  // Misère Nim: a position is lost for the player to move (P) when ...
  function isP(p: number[]): boolean {
    if (p.every((v) => v <= 1)) return p.filter((v) => v === 1).length % 2 === 1;
    return p.reduce((a, b) => a ^ b, 0) === 0;
  }
  function good(p: number[]): { p: number; n: number }[] {
    const out: { p: number; n: number }[] = [];
    p.forEach((v, i) => { for (let n = 1; n <= v; n++) { const q = p.slice(); q[i] -= n; if (isP(q)) out.push({ p: i, n }); } });
    return out;
  }
  function hud(): void { ctx.hud('Game', `${game + 1}/${GAMES}`); ctx.hud('You', `${wins} won`); ctx.hud('Rival', `${losses} won`); ctx.hud('Hints', hints); }

  function draw(): void {
    board.replaceChildren(...piles.map((n, p) => h('div', { class: 'sp-row' },
      h('span', { class: 'sp-lab', 'aria-hidden': 'true' }, 'ABC'[p]),
      h('div', { class: 'sp-stones', role: 'group', 'aria-label': `Pile ${'ABC'[p]}, ${n} stones` },
        ...Array.from({ length: n }, (_, j) => {
          const taken = n - j;
          const on = sel?.p === p && taken <= sel.n, hl = hint?.p === p && taken <= hint.n;
          const b = h('button', { class: 'sp-s' + (on ? ' sel' : '') + (hl && !on ? ' hint' : ''), type: 'button', 'data-stone': '', 'aria-label': `Pile ${'ABC'[p]}: take ${taken} stone${taken > 1 ? 's' : ''}`, disabled: phase !== 'me' ? true : null }, on ? '✕' : '');
          b.addEventListener('click', () => choose(p, taken));
          return b;
        })))));
    (act as HTMLButtonElement).disabled = !sel || phase !== 'me';
    act.textContent = sel ? `Take ${sel.n} from pile ${'ABC'[sel.p]}` : 'Take stones';
    (hintBtn as HTMLButtonElement).disabled = hints <= 0 || phase !== 'me';
    hud();
  }
  function startGame(): void {
    for (;;) {
      piles = [rint(rand, 2, 5), rint(rand, 2, 5), rint(rand, 1, 5)];
      if (!isP(piles) && good(piles).length) break;
    }
    phase = 'me'; sel = null; hint = null; t = 0;
    say.textContent = 'Tap a stone to mark it and every stone to its right, then press Take. Take the last stone and you lose.';
    draw();
  }
  function choose(p: number, n: number): void {
    if (ctx.finished || phase !== 'me') return;
    if (sel && sel.p === p && sel.n === n) { take(); return; }
    sel = { p, n }; hint = null; ctx.sfx('tap'); draw();
  }
  /** The one player action: remove the marked stones. */
  function take(): void {
    if (ctx.finished || phase !== 'me' || !sel) return;
    remove(sel.p, sel.n, 'You');
  }
  function remove(p: number, n: number, who: 'You' | 'Rival'): void {
    piles[p] -= n; sel = null; hint = null; moves++; ctx.sfx('tap');
    if (piles.every((v) => v === 0)) { endGame(who === 'Rival'); return; }
    if (who === 'You') { phase = 'rival'; t = 0; say.textContent = 'The rival ponders…'; } else { phase = 'me'; say.textContent = `Rival took ${n} from pile ${'ABC'[p]}. Your move.`; }
    draw();
  }
  function endGame(youWon: boolean): void {
    phase = 'result'; t = 0;
    if (youWon) { wins++; score += 400 + hints * 50; ctx.sfx('good'); } else { losses++; ctx.sfx('bad'); }
    say.textContent = youWon ? 'The rival took the last stone. Game to you.' : 'You took the last stone. Game to the rival.';
    draw();
  }
  function rivalMove(): void {
    const best = good(piles);
    let mv: { p: number; n: number };
    if (best.length && rand() < SKILL[game]) mv = best[Math.floor(rand() * best.length)];
    else { const all: { p: number; n: number }[] = []; piles.forEach((v, p) => { for (let n = 1; n <= v; n++) all.push({ p, n }); }); mv = all[Math.floor(rand() * all.length)]; }
    remove(mv.p, mv.n, 'Rival');
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt;
    if (phase === 'rival' && t > 0.9) rivalMove();
    else if (phase === 'result' && t > 1.5) {
      if (wins >= 2) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'The rival is beaten', detail: `You won ${wins} of ${game + 1} games without taking the last stone.` }); }
      else if (losses >= 2) ctx.finish({ result: 'lose', score, title: 'Outplayed', detail: 'Leave the rival an even count of single stones when only singles remain.' });
      else { game++; startGame(); }
    }
  }
  act.addEventListener('click', take);
  hintBtn.addEventListener('click', () => {
    if (phase !== 'me' || hints <= 0) return;
    const g = good(piles)[0]; if (!g) return;
    hints--; hint = g; sel = null; say.textContent = `Hint: take ${g.n} from pile ${'ABC'[g.p]}.`; draw();
  });
  ctx.loop(update, () => {});

  return {
    destroy() { /* released by the shell */ },
    reset(seed) { rand = makeRng(seed); game = 0; wins = 0; losses = 0; score = 0; hints = HINTS; moves = 0; startGame(); },
    probe: () => ({ game, piles: piles.join(','), phase, sel: sel ? `${sel.p}:${sel.n}` : '', wins, losses, moves }),
    play(kind: Result) {
      for (let g = 0; g < 3000 && !ctx.finished; g++) {
        if (phase === 'me') {
          const wins_ = good(piles);
          if (kind === 'win' && wins_.length) choose(wins_[0].p, wins_[0].n), take();
          else {
            const bad: { p: number; n: number }[] = [];
            piles.forEach((v, p) => { for (let n = 1; n <= v; n++) { const q = piles.slice(); q[p] -= n; if (!isP(q) || q.every((x) => x === 0)) bad.push({ p, n }); } });
            const m = (kind === 'lose' ? bad.find((b) => b.n === piles[b.p] && piles.reduce((a, c) => a + c, 0) === b.n) : null) ?? (kind === 'lose' ? bad[0] : { p: piles.findIndex((v) => v > 0), n: 1 });
            choose(m.p, m.n); take();
          }
        } else update(1 / 60);
      }
    },
  };
}
