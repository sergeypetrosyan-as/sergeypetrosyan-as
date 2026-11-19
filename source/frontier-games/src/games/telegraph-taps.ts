import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Telegraph Taps: listen to a message of dots and dashes with short and long gaps, then key it back. */
const ROUNDS = 5;
const DOT = 0.12, DASH = 0.5, GAP_S = 0.2, GAP_L = 0.7;
const CUT_DUR = 0.3, CUT_GAP = 0.45;

export default function telegraphTaps(ctx: Ctx): Instance {
  type Phase = 'ready' | 'listen' | 'input' | 'ok';
  type El = { dash: boolean; gap: boolean }; // gap: long gap BEFORE this mark (ignored for the first)
  let phase: Phase = 'ready';
  let rand = makeRng(1);
  let t = 0, round = 1, score = 0, msg: El[] = [], sched: { s: number; e: number }[] = [];
  let downT = -1, lastUp = -1, lastAct = 0, presses = 0;
  let mine: El[] = [];

  const lamp = h('div', { class: 'tt-lamp', 'aria-hidden': 'true' }, h('span', null, 'SOUNDER'));
  const tape = h('div', { class: 'tt-tape', 'aria-label': 'Paper tape' });
  const say = h('p', { class: 'mw-big tt-say', role: 'status' });
  const sub = h('p', { class: 'mw-note' });
  const key = h('button', { class: 'mw-btn primary tt-key', type: 'button', 'data-key': '' }, 'KEY');
  const style = h('style', null, `
    .tt-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;width:100%;max-width:460px;margin:auto;text-align:center}
    .tt-wire{width:100%;height:36px}
    .tt-lamp{width:84px;height:84px;border-radius:50%;display:grid;place-items:center;border:3px solid var(--mw-ember);background:var(--mw-night);color:var(--mw-smoke);font:700 .62rem var(--mw-font-slab);letter-spacing:.06em}
    .tt-wrap[data-lit=on] .tt-lamp{background:var(--mw-rose);color:var(--mw-ink);border-color:var(--mw-bone);box-shadow:0 0 0 7px color-mix(in srgb,var(--mw-rose) 30%,transparent)}
    .tt-tape{display:flex;align-items:center;gap:5px;flex-wrap:wrap;justify-content:center;min-height:46px;width:100%;padding:8px;border:2px solid var(--mw-mesa);border-radius:8px;background:var(--mw-night)}
    .tt-m{height:14px;border-radius:7px;background:var(--mw-bone)}
    .tt-m.d{width:14px}.tt-m.l{width:44px}
    .tt-m.mine{background:var(--mw-rose)}
    .tt-m.slot{background:none;border:2px dashed var(--mw-mesa);height:14px;opacity:.8}
    .tt-sp{width:18px}
    .tt-key{min-width:70%;min-height:96px;font-size:1.6rem;touch-action:none;user-select:none;-webkit-user-select:none}
    .tt-wrap[data-phase=listen] .tt-key{opacity:.5}
  `);
  const wire = h('svg', { class: 'tt-wire', viewBox: '0 0 400 36', 'aria-hidden': 'true' },
    h('path', { d: 'M0 8 Q100 26 200 8 T400 8', fill: 'none', stroke: 'var(--mw-ember)', 'stroke-width': 2 }),
    h('path', { d: 'M60 0 V36 M340 0 V36', stroke: 'var(--mw-saddle)', 'stroke-width': 5 }));
  const wrap = h('div', { class: 'tt-wrap', 'data-phase': 'ready', 'data-lit': 'off' }, wire, lamp, say, tape, sub, key);
  ctx.root.append(style, wrap);

  const lit = (on: boolean): void => { wrap.dataset.lit = on ? 'on' : 'off'; };
  function hud(): void { ctx.hud('Message', `${round}/${ROUNDS}`); ctx.hud('Marks', msg.length); ctx.hud('Score', score); }
  function mark(e: El, cls: string): HTMLElement[] {
    const out: HTMLElement[] = [];
    if (e.gap) out.push(h('span', { class: 'tt-sp' }));
    out.push(h('span', { class: `tt-m ${e.dash ? 'l' : 'd'} ${cls}` }));
    return out;
  }
  function drawTape(): void {
    tape.replaceChildren();
    if (phase === 'listen') return;
    mine.forEach((e) => tape.append(...mark(e, 'mine')));
    for (let i = mine.length; i < msg.length && phase === 'input'; i++) tape.append(h('span', { class: 'tt-m d slot' }));
  }
  function fail(text: string): void {
    ctx.sfx('bad');
    ctx.finish({ result: 'lose', score, title: 'The line went dead', detail: text });
  }

  function begin(): void {
    const n = round + 2;
    msg = Array.from({ length: n }, () => ({ dash: rand() < 0.45, gap: rand() < 0.4 }));
    if (!msg.some((m) => m.dash)) msg[1].dash = true;
    sched = []; let c = 0.5;
    msg.forEach((m, i) => { if (i) c += m.gap ? GAP_L : GAP_S; const d = m.dash ? DASH : DOT; sched.push({ s: c, e: c + d }); c += d; });
    phase = 'ready'; t = 0; mine = []; downT = -1; lastUp = -1;
    say.textContent = 'Listen to the wire'; sub.textContent = 'Short flash = dot, long flash = dash. Long gaps count too.';
    wrap.dataset.phase = 'listen'; drawTape(); hud();
    phase = 'listen';
  }
  function startInput(): void {
    phase = 'input'; wrap.dataset.phase = 'input'; t = 0; lastAct = 0; lit(false);
    say.textContent = 'Your turn'; sub.textContent = 'Tap for a dot, hold for a dash. Pause longer where the gap was long.';
    drawTape();
  }

  /** The one player action: key down then key up. */
  function keyDown(): void {
    presses++;
    if (ctx.finished) return;
    if (phase !== 'input') { sub.textContent = phase === 'listen' ? 'Wait: the wire is still talking.' : sub.textContent; return; }
    if (downT >= 0) return;
    if (lastUp >= 0) {
      const long = t - lastUp >= CUT_GAP, want = msg[mine.length].gap;
      if (long !== want) { fail(want ? 'You keyed too soon: that gap was long.' : 'You waited too long: that gap was short.'); return; }
    }
    downT = t; lit(true); ctx.sfx('tap');
  }
  function keyUp(): void {
    if (phase !== 'input' || downT < 0 || ctx.finished) return;
    const dash = t - downT >= CUT_DUR, want = msg[mine.length];
    lit(false); downT = -1;
    if (dash !== want.dash) { fail(want.dash ? 'That mark was a dash: hold the key longer.' : 'That mark was a dot: tap it short.'); return; }
    mine.push({ dash, gap: want.gap && mine.length > 0 });
    lastUp = t; lastAct = t; ctx.sfx('good'); drawTape();
    if (mine.length === msg.length) {
      score += round * 100; phase = 'ok'; t = 0; say.textContent = 'Message received'; sub.textContent = 'Clean copy. A longer one follows.'; hud();
    }
  }

  function update(dt: number): void {
    t += dt;
    if (phase === 'listen') {
      lit(sched.some((s) => t >= s.s && t < s.e));
      tape.replaceChildren();
      sched.forEach((s, i) => { if (t >= s.e) tape.append(...mark(msg[i].gap && i ? msg[i] : { ...msg[i], gap: false }, '')); });
      if (t > sched[sched.length - 1].e + 0.4) startInput();
    } else if (phase === 'input') {
      if (downT < 0 && t - lastAct > (lastUp < 0 ? 10 : 2.5)) fail('You let the line go quiet.');
    } else if (phase === 'ok' && t > 1.1) {
      if (round >= ROUNDS) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'Message delivered', detail: `All ${ROUNDS} messages keyed back cleanly.` }); }
      else { round++; begin(); }
    }
  }

  key.addEventListener('pointerdown', (e) => { e.preventDefault(); key.setPointerCapture?.(e.pointerId); keyDown(); });
  key.addEventListener('pointerup', () => keyUp());
  key.addEventListener('pointercancel', () => keyUp());
  ctx.keys({ ' ': (d) => (d ? keyDown() : keyUp()), Enter: (d) => (d ? keyDown() : keyUp()) });
  ctx.loop(update, () => {});

  const step = (s: number): void => { for (let n = Math.round(s * 60); n > 0; n--) update(1 / 60); };
  return {
    destroy() { /* released by the shell */ },
    reset(seed) { rand = makeRng(seed); round = 1; score = 0; presses = 0; begin(); },
    probe: () => ({ round, phase, marks: mine.length, presses, score }),
    play(kind: Result) {
      for (let g = 0; g < 20000 && !ctx.finished; g++) {
        if (phase !== 'input') { update(1 / 60); continue; }
        const rounds = round;
        for (let i = 0; i < msg.length && !ctx.finished && phase === 'input'; i++) {
          if (i) step(msg[i].gap ? 0.8 : 0.25);
          else step(0.3);
          keyDown();
          const wrongNow = kind === 'lose' && round === 2 && i === 1;
          step((msg[i].dash !== wrongNow) ? 0.6 : 0.1);
          keyUp();
        }
        if (rounds === round && phase === 'input') break;
      }
    },
  };
}
