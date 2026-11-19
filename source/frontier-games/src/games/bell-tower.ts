import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Bell Tower: the town bells ring a growing order. Echo it back; ring a peal of eight to win, with two cracks to spare. */
const BELLS = 5, GOAL = 8, START = 2, CRACKS = 2;

export default function bellTower(ctx: Ctx): Instance {
  type Phase = 'show' | 'input' | 'ok' | 'bad';
  let phase: Phase = 'show';
  let rand = makeRng(1);
  let rings = 0;
  let seq: number[] = [], len = START, step = 0, t = 0, cracks = CRACKS, score = 0, lit = -1, litT = 0, lastShown = -1;

  const bells = Array.from({ length: BELLS }, (_, i) => h('button', { class: 'bt-bell', type: 'button', 'data-bell': i, 'aria-label': `Bell ${i + 1}`, style: `--s:${(0.72 + i * 0.07).toFixed(2)}`, onclick: () => ring(i) }, h('span', { class: 'bt-n' }, i + 1)));
  const pips = h('div', { class: 'bt-pips', 'aria-hidden': 'true' });
  const say = h('p', { class: 'mw-big', role: 'status', style: { margin: 0 } });
  const sub = h('p', { class: 'mw-note', style: { margin: 0 } });
  const style = h('style', null, `
    .bt{width:100%;max-width:460px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}
    .bt-frame{width:100%;border-top:10px solid var(--mw-saddle);border-radius:50% 50% 0 0 / 14px 14px 0 0;padding:0 4px 10px;background:linear-gradient(var(--mw-ink),transparent)}
    .bt-row{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;align-items:start}
    .bt-bell{position:relative;width:100%;aspect-ratio:.82;transform-origin:50% -10px;transform:scale(var(--s,1));border:3px solid var(--mw-tan);border-radius:50% 50% 12% 12% / 78% 78% 12% 12%;background:var(--mw-wine);color:var(--mw-bone);cursor:pointer;padding:0;transition:background .1s}
    .bt-bell::after{content:'';position:absolute;left:50%;bottom:-9px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:var(--mw-tan)}
    .bt-n{font:700 1.25rem var(--mw-font-slab)}
    .bt-bell.lit{background:var(--mw-rose);border-color:var(--mw-bone);color:var(--mw-ink);animation:bt-sw .3s ease-in-out}
    .bt-bell.lock{cursor:default}
    @keyframes bt-sw{0%{transform:scale(var(--s,1)) rotate(0)}30%{transform:scale(var(--s,1)) rotate(9deg)}70%{transform:scale(var(--s,1)) rotate(-9deg)}100%{transform:scale(var(--s,1)) rotate(0)}}
    .bt-pips{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
    .bt-pip{width:18px;height:18px;border-radius:50%;border:2px solid var(--mw-ember)}
    .bt-pip.got{background:var(--mw-rose);border-color:var(--mw-bone)}.bt-pip.cur{border-color:var(--mw-bone);border-style:dashed}
    .bt-pip.sq{border-radius:4px}
  `);
  ctx.root.append(style, h('div', { class: 'bt' }, h('div', { class: 'bt-frame' }, h('div', { class: 'bt-row' }, bells)), pips, say, sub));

  function render(): void {
    bells.forEach((b, i) => { b.classList.toggle('lit', i === lit); b.classList.toggle('lock', phase !== 'input'); });
    pips.replaceChildren(...Array.from({ length: GOAL }, (_, i) => h('span', { class: 'bt-pip sq' + (i < len ? ' got' : '') })), h('span', { style: { width: '14px' } }), ...Array.from({ length: len }, (_, i) => h('span', { class: 'bt-pip' + (i < step ? ' got' : i === step && phase === 'input' ? ' cur' : '') })));
    ctx.hud('Peal', `${len}/${GOAL}`); ctx.hud('Cracks left', cracks); ctx.hud('Score', score);
  }
  function setMsg(a: string, b: string): void { say.textContent = a; sub.textContent = b; }
  function beginShow(): void { phase = 'show'; t = 0; step = 0; lit = -1; lastShown = -1; setMsg('Listen…', `Watch ${len} bells ring. Squares count the peal, circles your echo.`); render(); }
  /** The one player action: ring a bell. */
  function ring(i: number): void {
    if (ctx.finished) return;
    if (phase === 'show') { rings++; lit = i; litT = 0.28; ctx.sfx('tap'); render(); return; }
    if (phase !== 'input') return;
    lit = i; litT = 0.28; ctx.sfx('tap');
    if (seq[step] === i) {
      step++;
      if (step >= len) {
        score += len * 50; ctx.sfx('good');
        if (len >= GOAL) { render(); ctx.finish({ result: 'win', score, title: 'A full peal', detail: `You echoed all ${GOAL} bells with ${cracks} crack${cracks === 1 ? '' : 's'} left.` }); return; }
        phase = 'ok'; t = 0; setMsg('Well rung', 'One more bell joins the peal.');
      }
    } else {
      ctx.sfx('bad');
      if (cracks <= 0) { render(); ctx.finish({ result: 'lose', score, title: 'The bell cracks', detail: `You held a peal of ${len - (len > START ? 1 : 0)} bells before the mistake.` }); return; }
      cracks--; phase = 'bad'; t = 0; setMsg('Wrong bell', `A crack forms. ${cracks} left. Listen again.`);
    }
    render();
  }
  function update(dt: number): void {
    t += dt;
    if (litT > 0) { litT -= dt; if (litT <= 0 && phase !== 'show') { lit = -1; render(); } }
    if (phase === 'show') {
      const per = Math.max(0.5, 0.72 - len * 0.03), k = Math.floor((t - 0.8) / per);
      const on = t >= 0.8 && (t - 0.8) - k * per < per * 0.62 ? k : -1;
      if (k >= len) { phase = 'input'; t = 0; step = 0; lit = -1; setMsg('Your turn', `Ring the ${len} bells in the same order.`); render(); return; }
      const want = on >= 0 ? seq[on] : -1;
      if (litT > 0 && on < 0) return;
      if (want !== lit || (on >= 0 && on !== lastShown)) { lit = want; if (on >= 0 && on !== lastShown) ctx.sfx('tick'); lastShown = on >= 0 ? on : lastShown; render(); }
    } else if (phase === 'ok' && t > 0.9) { len++; beginShow(); }
    else if (phase === 'bad' && t > 1.1) beginShow();
  }
  ctx.keys(Object.fromEntries(Array.from({ length: BELLS }, (_, i) => [String(i + 1), (d: boolean) => d && ring(i)])));
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); seq = Array.from({ length: GOAL }, () => rint(rand, 0, BELLS - 1)); len = START; cracks = CRACKS; score = 0; litT = 0; rings = 0; beginShow(); },
    probe: () => ({ phase, len, step, cracks, lit, score, rings }),
    play(kind: Result) {
      for (let g = 0; g < 60000 && !ctx.finished; g++) {
        if (phase === 'input') ring(kind === 'win' ? seq[step] : (seq[step] + 1) % BELLS); else update(1 / 60);
      }
    },
  };
}
