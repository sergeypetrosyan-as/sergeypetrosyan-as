import { h } from '../core/dom';
import type { Ctx, Instance } from '../core/types';

/** Count to Seven: stop a clock that hides after two seconds as close to 7.000 s as you can, ten times. */
const TRIES = 10, TARGET = 7, SHOW = 2, PASS = 0.4;

export default function countToSeven(ctx: Ctx): Instance {
  type Phase = 'idle' | 'run' | 'done';
  let phase: Phase = 'idle', t = 0, errs: number[] = [], last = '';

  const style = h('style', null, `
    .c7{width:100%;max-width:420px;display:flex;flex-direction:column;align-items:center;gap:14px}
    .c7-stars{display:flex;gap:4px;justify-content:center;flex-wrap:nowrap}
    .c7-st{width:27px;height:27px;flex:none;display:grid;place-items:center;font:700 .8rem var(--mw-font-slab);color:var(--mw-ash);border:2px solid var(--mw-mesa);border-radius:50%;background:var(--mw-night)}
    .c7-st.ok{background:var(--mw-rose);color:var(--mw-ink);border-color:var(--mw-bone)}
    .c7-st.bad{background:var(--mw-red);color:var(--mw-white);border-color:var(--mw-rose)}
    .c7-dial{width:min(78vw,250px);aspect-ratio:1;border-radius:50%;border:4px solid var(--mw-ember);background:var(--mw-night);display:grid;place-items:center;box-shadow:inset 0 0 0 6px var(--mw-dusk),inset 0 0 0 7px var(--mw-tan);text-align:center}
    .c7-dial[data-p=run]{border-color:var(--mw-rose)}
    .c7-num{font:700 2.6rem var(--mw-font-slab);color:var(--mw-bone);font-variant-numeric:tabular-nums}
    .c7-num.hid{color:var(--mw-ash);letter-spacing:.2em}
    .c7-sub{font:600 .85rem var(--mw-font-slab);color:var(--mw-ash)}
    .c7-go{min-width:70%;min-height:72px;font-size:1.4rem}
  `);
  const stars = h('div', { class: 'c7-stars', 'aria-hidden': 'true' });
  const num = h('div', { class: 'c7-num' });
  const sub = h('div', { class: 'c7-sub' });
  const dial = h('div', { class: 'c7-dial', 'data-p': 'idle' }, h('div', null, num, sub));
  const say = h('p', { class: 'mw-note', role: 'status' });
  const go = h('button', { class: 'mw-btn primary c7-go', type: 'button', 'data-go': '' });
  ctx.root.append(style, h('div', { class: 'c7' }, stars, dial, say, go));

  const sum = () => errs.reduce((a, b) => a + b, 0);
  function render(): void {
    stars.replaceChildren(...Array.from({ length: TRIES }, (_, i) => h('span', { class: 'c7-st' + (i < errs.length ? (errs[i] <= PASS ? ' ok' : ' bad') : '') }, i < errs.length ? '★' : i + 1)));
    dial.dataset.p = phase;
    if (phase === 'run') {
      const vis = t < SHOW;
      num.textContent = vis ? t.toFixed(2) : '. . .'; num.className = 'c7-num' + (vis ? '' : ' hid');
      sub.textContent = vis ? 'Watch it go...' : 'Hidden. Keep counting.';
      go.textContent = 'Stop'; say.textContent = `Try ${errs.length + 1} of ${TRIES}: stop at 7 seconds.`;
    } else {
      num.textContent = phase === 'idle' && errs.length === 0 ? '7.00' : last; num.className = 'c7-num';
      sub.textContent = phase === 'idle' && errs.length === 0 ? 'Target' : errs.length ? `Average miss ${(sum() / errs.length).toFixed(2)} s` : '';
      go.textContent = errs.length === 0 ? 'Start the clock' : `Start try ${errs.length + 1}`;
      say.textContent = errs.length === 0 ? 'The clock hides after 2 seconds. Count in your head.' : `Pass mark: average miss under ${PASS.toFixed(1)} s.`;
    }
    ctx.hud('Try', `${Math.min(errs.length + (phase === 'run' ? 1 : 0), TRIES)}/${TRIES}`);
    ctx.hud('Avg miss', errs.length ? `${(sum() / errs.length).toFixed(2)} s` : '-');
  }

  /** The one player action: start the clock, then stop it. */
  function press(): void {
    if (ctx.finished) return;
    if (phase === 'run') {
      const err = Math.abs(t - TARGET);
      errs.push(err); phase = 'idle';
      last = `${t.toFixed(2)} s`;
      ctx.sfx(err <= PASS ? 'good' : 'bad');
      say.textContent = `${t.toFixed(2)} s: ${err < 0.005 ? 'perfect!' : (t < TARGET ? 'early' : 'late') + ' by ' + err.toFixed(2) + ' s'}`;
      if (errs.length >= TRIES) {
        const avg = sum() / TRIES, win = avg <= PASS;
        const score = Math.round(errs.reduce((a, e) => a + Math.max(0, 100 - e * 150), 0));
        ctx.finish({ result: win ? 'win' : 'lose', score, title: win ? 'Born with a watch' : 'Time slipped by', detail: `Average miss ${avg.toFixed(2)} s over ${TRIES} tries; the pass mark is ${PASS.toFixed(1)} s.` });
      }
      const keep = say.textContent; render(); say.textContent = keep;
    } else { phase = 'run'; t = 0; ctx.sfx('tap'); render(); }
  }
  function update(dt: number): void {
    if (phase !== 'run') return;
    t += dt;
    const vis = t < SHOW;
    num.textContent = vis ? t.toFixed(2) : '. . .'; num.className = 'c7-num' + (vis ? '' : ' hid');
    if (!vis && sub.textContent !== 'Hidden. Keep counting.') render();
  }
  ctx.on(go, 'pointerdown', (e) => { e.preventDefault(); press(); });
  ctx.on(go, 'click', (e) => { if (e.detail === 0) press(); });
  ctx.keys({ ' ': (d) => d && press(), Enter: (d) => d && press() });
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset() { phase = 'idle'; t = 0; errs = []; last = ''; render(); },
    probe: () => ({ phase, tries: errs.length, t: Math.round(t * 100) / 100 }),
    play(kind) {
      for (let n = 0; n < TRIES && !ctx.finished; n++) {
        if (phase !== 'idle') break;
        press();
        const stopAt = kind === 'win' ? TARGET : 2.5;
        for (let g = 0; g < 2000 && t < stopAt - 1e-6; g++) update(1 / 60);
        press();
      }
    },
  };
}
