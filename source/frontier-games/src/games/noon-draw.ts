import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Noon Draw: five duels. A bell rings at a random moment; draw before the gunslinger or lose the duel. */
const DUELS = 5;
const NEED = 3;

export default function noonDraw(ctx: Ctx): Instance {
  type Phase = 'wait' | 'bell' | 'result';
  let phase: Phase = 'wait';
  let rand = makeRng(1);
  let t = 0, delay = 2, duel = 1, wins = 0, score = 0, lastMs = 0;
  let rival = 330, msg = '';

  const bell = h('div', { class: 'nd-bell', 'aria-hidden': 'true' }, 'BELL');
  const say = h('p', { class: 'mw-big nd-say', role: 'status' });
  const sub = h('p', { class: 'mw-note' });
  const draw = h('button', { class: 'mw-btn primary nd-draw', type: 'button', 'data-draw': '' }, 'Draw');
  const style = h('style', null, `
    .nd-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;width:100%;height:100%;text-align:center}
    .nd-bell{width:96px;height:96px;display:grid;place-items:center;border-radius:50% 50% 12px 12px;border:3px solid var(--mw-ember);color:var(--mw-smoke);font:700 .9rem var(--mw-font-slab);background:var(--mw-night)}
    .nd-wrap[data-phase=bell] .nd-bell{background:var(--mw-red);color:var(--mw-white);border-color:var(--mw-bone);transform:rotate(-8deg) scale(1.12);box-shadow:0 0 0 6px color-mix(in srgb,var(--mw-red) 35%,transparent)}
    .nd-draw{min-width:60%;min-height:84px;font-size:1.6rem}
  `);
  const wrap = h('div', { class: 'nd-wrap', 'data-phase': 'wait' }, bell, say, sub, draw);
  ctx.root.append(style, wrap);

  function show(text: string, note: string): void { say.textContent = text; sub.textContent = note; wrap.dataset.phase = phase; }
  function hud(): void { ctx.hud('Duel', `${duel}/${DUELS}`); ctx.hud('Won', wins); ctx.hud('Score', score); }

  function beginDuel(): void {
    phase = 'wait'; t = 0; delay = 1.2 + rand() * 2.4; rival = Math.max(240, 360 - duel * 18 + rand() * 40);
    show('Wait for the bell…', 'Tap too soon and the duel is lost.');
  }
  function endDuel(won: boolean, text: string): void {
    phase = 'result'; t = 0; msg = text;
    if (won) { wins++; ctx.sfx('good'); } else ctx.sfx('bad');
    show(won ? 'You win the duel' : 'You lose the duel', msg);
    hud();
  }
  /** The one player action: tap, click or Space. */
  function press(): void {
    if (ctx.finished) return;
    if (phase === 'wait') { endDuel(false, 'You drew before the bell. A false start loses.'); return; }
    if (phase === 'bell') {
      lastMs = Math.round(t * 1000);
      const won = lastMs < rival;
      if (won) score += Math.max(50, Math.round(1000 - lastMs));
      endDuel(won, `You: ${lastMs} ms. Gunslinger: ${Math.round(rival)} ms.`);
    }
  }
  function update(dt: number): void {
    t += dt;
    if (phase === 'wait' && t >= delay) { phase = 'bell'; t = 0; ctx.sfx('tap'); show('NOW!', 'Draw!'); }
    else if (phase === 'bell' && t > 1.2) endDuel(false, 'Too slow. The gunslinger drew first.');
    else if (phase === 'result' && t > 1.4) {
      if (duel >= DUELS || wins >= NEED || duel - wins > DUELS - NEED) {
        const result: Result = wins >= NEED ? 'win' : 'lose';
        ctx.finish({ result, score, title: result === 'win' ? 'Fastest in town' : 'Quicker hands needed', detail: `You won ${wins} of ${duel} duels.` });
      } else { duel++; hud(); beginDuel(); }
    }
  }

  draw.addEventListener('pointerdown', (e) => { e.preventDefault(); press(); });
  draw.addEventListener('click', (e) => { if (e.detail === 0) press(); });
  ctx.keys({ ' ': (d) => d && press(), Enter: (d) => d && press() });
  ctx.loop(update, () => {});

  return {
    destroy() { /* listeners and loop are released by the shell */ },
    reset(seed) { rand = makeRng(seed); duel = 1; wins = 0; score = 0; lastMs = 0; hud(); beginDuel(); },
    probe: () => ({ duel, phase, wins, score, lastMs }),
    play(kind) {
      for (let guard = 0; guard < 4000 && !ctx.finished; guard++) {
        if (phase === 'wait') { if (kind === 'lose') press(); else update(1 / 60); }
        else if (phase === 'bell') { if (t > 0.18) press(); else update(1 / 60); }
        else update(1 / 60);
      }
    },
  };
}
