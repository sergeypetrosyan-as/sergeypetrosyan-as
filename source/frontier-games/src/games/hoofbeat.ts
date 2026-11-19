import { h } from '../core/dom';
import type { Ctx, Instance, Result } from '../core/types';

/** Hoofbeat: four horses, each faster. A bar has 4 sounded beats then 4 silent ones; tap all eight and keep the silent taps on time. */
const HORSES = ['Dusty', 'Copper', 'Ember', 'Midnight'];
const IV = [0.62, 0.54, 0.47, 0.41]; // seconds per beat
const LIM = [110, 90, 75, 65]; // average error limit in ms
const BARS = 3, PER = 8, AUD = 4, LEAD = 2;

export default function hoofbeat(ctx: Ctx): Instance {
  type Phase = 'intro' | 'run' | 'result';
  let phase: Phase = 'intro';
  let horse = 0, t = 0, nb = -LEAD, ne = 0, score = 0, lastAvg = 0, passed = false;
  let taps: number[] = [];
  let errs: number[] = [];
  const slots: Record<number, string> = {};

  const iv = () => IV[horse];
  const shoes = Array.from({ length: PER }, (_, i) => h('div', { class: 'hb-shoe' + (i < AUD ? ' snd' : ' sil'), 'data-i': i }, h('span', { class: 'hb-arch' }), h('b', null, i < AUD ? 'beat' : 'silent'), h('i', null, '')));
  const say = h('p', { class: 'mw-big hb-say', role: 'status' });
  const sub = h('p', { class: 'mw-note hb-sub' });
  const tap = h('button', { class: 'mw-btn primary hb-tap', type: 'button', 'data-tap': '' }, 'Tap');
  const style = h('style', null, `
    .hb{width:100%;max-width:440px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}
    .hb-bar{width:100%;display:grid;grid-template-columns:repeat(8,1fr);gap:4px}
    .hb-shoe{display:flex;flex-direction:column;align-items:center;gap:2px;font:600 .62rem var(--mw-font-slab);color:var(--mw-ash)}
    .hb-arch{width:100%;height:42px;border:4px solid var(--mw-ember);border-bottom:0;border-radius:22px 22px 2px 2px;background:var(--mw-night)}
    .hb-shoe.snd .hb-arch{border-color:var(--mw-tan);background:var(--mw-saddle)}
    .hb-shoe.sil .hb-arch{border-style:dashed;border-color:var(--mw-mesa)}
    .hb-shoe.lit .hb-arch{background:var(--mw-rose);border-color:var(--mw-bone)}
    .hb-shoe.now b{color:var(--mw-bone)}
    .hb-shoe i{font-style:normal;font-size:.72rem;min-height:1em;color:var(--mw-bone)}
    .hb-shoe.ok .hb-arch{border-color:var(--mw-bone);border-style:solid}
    .hb-shoe.bad .hb-arch{border-color:var(--mw-red);border-style:solid}
    .hb-tap{width:100%;min-height:120px;font-size:1.8rem}
    .hb-say{margin:0}
  `);
  ctx.root.append(style, h('div', { class: 'hb' }, h('div', { class: 'hb-bar', 'aria-hidden': 'true' }, shoes), say, sub, tap));

  function hud(): void {
    ctx.hud('Horse', `${horse + 1}/${HORSES.length}`); ctx.hud('Limit', `${LIM[horse]} ms`);
    ctx.hud('Avg error', errs.length ? `${Math.round(errs.reduce((a, b) => a + b, 0) / errs.length)} ms` : '-'); ctx.hud('Score', score);
  }
  function say2(a: string, b: string): void { say.textContent = a; sub.textContent = b; }
  function paint(cur: number): void {
    shoes.forEach((s, i) => {
      const inBar = ((cur % PER) + PER) % PER;
      s.classList.toggle('now', phase === 'run' && i === inBar);
      s.classList.remove('lit');
      s.classList.toggle('ok', slots[i] === 'ok'); s.classList.toggle('bad', slots[i] === 'bad');
    });
  }
  function startHorse(): void {
    phase = 'intro'; t = 0; nb = -LEAD; ne = 0; taps = []; errs = []; passed = false;
    for (const k of Object.keys(slots)) delete slots[+k];
    shoes.forEach((s) => { (s.lastChild as HTMLElement).textContent = ''; s.classList.remove('ok', 'bad', 'lit', 'now'); });
    say2(`${HORSES[horse]} trots out`, `Tap to start. Tap every beat; when it goes silent keep the tempo. Stay within ${LIM[horse]} ms on average.`);
    hud();
  }
  function startRun(): void { phase = 'run'; t = -LEAD * iv() - 0.0001; say2('Listen, then tap along', 'Sounded beats first. Then it falls silent: keep going.'); }
  /** The one player action: a hoof tap. */
  function press(): void {
    if (ctx.finished) return;
    if (phase === 'intro') { startRun(); return; }
    if (phase !== 'run') return;
    taps.push(t); ctx.sfx('tap');
  }
  function judge(g: number): void {
    const bt = g * iv();
    let best = iv() / 2;
    for (const x of taps) { const d = Math.abs(x - bt); if (d < best) best = d; }
    const ms = Math.round(best * 1000);
    errs.push(ms);
    const slot = g % PER;
    const tp = taps.find((x) => Math.abs(Math.abs(x - bt) - best) < 1e-9 && Math.abs(x - bt) < iv() / 2);
    const lab = tp === undefined ? 'miss' : `${tp - bt >= 0 ? '+' : '-'}${ms}`;
    slots[slot] = ms <= LIM[horse] ? 'ok' : 'bad';
    (shoes[slot].lastChild as HTMLElement).textContent = lab;
    hud();
  }
  function endRound(): void {
    lastAvg = Math.round(errs.reduce((a, b) => a + b, 0) / errs.length);
    passed = lastAvg <= LIM[horse];
    phase = 'result'; t = 0;
    if (passed) { score += 100 + Math.max(0, LIM[horse] - lastAvg) * 3 + horse * 50; ctx.sfx('good'); } else ctx.sfx('bad');
    say2(passed ? 'Steady trot' : 'The trot wandered', `Average error ${lastAvg} ms (limit ${LIM[horse]} ms).`);
    hud();
  }
  function update(dt: number): void {
    t += dt;
    if (phase === 'intro') { if (t > 1.6) startRun(); return; }
    if (phase === 'run') {
      while (t >= nb * iv() && nb < BARS * PER) {
        const inBar = ((nb % PER) + PER) % PER;
        const audible = nb < 0 || inBar < AUD;
        paint(nb);
        if (audible) { ctx.sfx('tick'); shoes[inBar].classList.add('lit'); } else if (nb >= 0) say2('Silent: keep the beat', 'Your taps still count.');
        nb++;
      }
      while (ne < BARS * PER && t >= ne * iv() + iv() / 2) { if (ne % PER >= AUD) judge(ne); ne++; }
      if (ne >= BARS * PER) endRound();
      return;
    }
    if (phase === 'result' && t > 1.6) {
      if (!passed) ctx.finish({ result: 'lose', score, title: 'Lost the beat', detail: `${HORSES[horse]} outpaced your timing: ${lastAvg} ms average error on the silent beats.` });
      else if (horse >= HORSES.length - 1) ctx.finish({ result: 'win', score, title: 'Steady rider', detail: `You kept the tempo on all ${HORSES.length} horses.` });
      else { horse++; startHorse(); }
    }
  }

  tap.addEventListener('pointerdown', (e) => { e.preventDefault(); press(); });
  tap.addEventListener('click', (e) => { if (e.detail === 0) press(); });
  ctx.keys({ ' ': (d) => d && press(), Enter: (d) => d && press() });
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset() { horse = 0; score = 0; lastAvg = 0; startHorse(); },
    probe: () => ({ horse, phase, taps: taps.length, beat: nb, errs: errs.length, score }),
    play(kind: Result) {
      let next = -LEAD;
      for (let guard = 0; guard < 60000 && !ctx.finished; guard++) {
        update(1 / 60);
        if (kind === 'win' && phase === 'run' && next < BARS * PER && t >= next * iv()) { press(); next++; }
        if (phase === 'intro') next = -LEAD;
      }
    },
  };
}
