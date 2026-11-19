import { h } from '../core/dom';
import { makeRng, rint, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Wanted Posters: study the outlaw's face for a few seconds, the poster comes down, then pick him from a lineup of look-alikes. Two mistakes lose. */
const ROUNDS = [{ n: 4, look: 6, k: 3 }, { n: 5, look: 5, k: 2 }, { n: 5, look: 4, k: 2 }, { n: 6, look: 3, k: 1 }, { n: 6, look: 2.5, k: 1 }];
const OPTS = 4, FEATS = 5, MISTAKES = 2;
type Face = number[]; // hat, eyes, mouth, beard, mark
const st = (f: string, s = 'ink') => `fill:var(--mw-${f});stroke:var(--mw-${s});stroke-width:1.2;stroke-linejoin:round`;
const ln = (s: string, w = 1.8) => `fill:none;stroke:var(--mw-${s});stroke-width:${w};stroke-linecap:round`;

function face(f: Face, px: number): HTMLElement {
  const [hat, eyes, mouth, beard, mark] = f;
  const k: HTMLElement[] = [h('path', { d: 'M12 62 Q30 72 48 62 L46 72 L14 72 Z', style: st('wine') }), h('ellipse', { cx: 30, cy: 40, rx: 15, ry: 19, style: st('tan') })];
  k.push(...[
    [h('ellipse', { cx: 30, cy: 24, rx: 26, ry: 5, style: st('saddle') }), h('rect', { x: 18, y: 8, width: 24, height: 16, rx: 4, style: st('saddle') }), h('rect', { x: 18, y: 18, width: 24, height: 4, style: st('ink') })],
    [h('path', { d: 'M15 27 Q15 8 30 8 Q45 8 45 27 Z', style: st('ink') }), h('ellipse', { cx: 30, cy: 27, rx: 20, ry: 3, style: st('ink') })],
    [h('path', { d: 'M15 29 Q30 19 45 29 L45 34 Q30 24 15 34 Z', style: st('red') }), h('circle', { cx: 47, cy: 32, r: 3, style: st('red') })],
    [h('path', { d: 'M15 31 Q14 12 30 12 Q46 12 45 31 Q30 21 15 31 Z', style: st('mesa') })],
  ][hat]);
  if (beard === 1) k.push(h('path', { d: 'M20 47 Q25 42 30 47 Q35 42 40 47 Q35 51 30 48 Q25 51 20 47 Z', style: st('ink') }));
  if (beard === 2) k.push(h('path', { d: 'M26 57 L34 57 L30 67 Z', style: st('ink') }));
  if (beard === 3) k.push(h('path', { d: 'M15 46 Q16 69 30 69 Q44 69 45 46 Q38 58 30 58 Q22 58 15 46 Z', style: st('ink') }));
  const ec = ln('ink', 2);
  k.push(...[
    [h('circle', { cx: 23, cy: 37, r: 2, style: st('ink') }), h('circle', { cx: 37, cy: 37, r: 2, style: st('ink') })],
    [h('path', { d: 'M19 38 L27 38 M33 38 L41 38', style: ec })],
    [h('circle', { cx: 23, cy: 37, r: 3.6, style: st('bone') }), h('circle', { cx: 37, cy: 37, r: 3.6, style: st('bone') }), h('circle', { cx: 23, cy: 37, r: 1.3, style: st('ink') }), h('circle', { cx: 37, cy: 37, r: 1.3, style: st('ink') })],
    [h('ellipse', { cx: 23, cy: 37, rx: 5, ry: 4, style: st('ink') }), h('path', { d: 'M15 30 L30 33', style: ln('ink', 1.2) }), h('circle', { cx: 37, cy: 37, r: 2, style: st('ink') })],
  ][eyes]);
  const mc = beard === 3 ? 'bone' : 'ink';
  k.push(...[
    [h('path', { d: 'M23 51 Q30 57 37 51', style: ln(mc) })], [h('path', { d: 'M24 53 L36 53', style: ln(mc) })], [h('path', { d: 'M23 56 Q30 49 37 56', style: ln(mc) })], [h('ellipse', { cx: 30, cy: 53, rx: 4, ry: 3, style: st('wine', mc) })],
  ][mouth]);
  if (mark === 1) k.push(h('path', { d: 'M40 33 L44 46 M38 38 L43 37 M39 43 L44 42', style: ln('red', 1.5) }));
  if (mark === 2) k.push(h('polygon', { points: '21,41 22.4,44 25.5,44.2 23,46.2 24,49.2 21,47.4 18,49.2 19,46.2 16.5,44.2 19.6,44', style: st('red') }));
  if (mark === 3) k.push(h('circle', { cx: 38, cy: 45, r: 2.2, style: st('ink') }));
  return h('svg', { viewBox: '0 0 60 72', width: px, height: px * 1.2, 'aria-hidden': 'true' }, k);
}

export default function wantedPosters(ctx: Ctx): Instance {
  type Phase = 'study' | 'pick' | 'reveal';
  let rand = makeRng(1);
  let phase: Phase = 'study', round = 0, t = 0, mistakes = 0, right = 0, score = 0, target: Face = [], lineup: Face[] = [], answer = 0, chosen = -1, lastSec = 0;

  const poster = h('div', { class: 'wp-poster' });
  const lineEl = h('div', { class: 'wp-line' });
  const meter = h('i');
  const go = h('button', { class: 'mw-btn primary', type: 'button', 'data-ready': '', style: { width: '100%', minHeight: '48px' } }, 'I have it memorised') as HTMLButtonElement;
  const say = h('p', { class: 'mw-note', role: 'status' });
  const style = h('style', null, `
    .wp{width:100%;max-width:470px;display:flex;flex-direction:column;align-items:center;gap:10px}
    .wp-poster{width:78%;max-width:260px;background:var(--mw-bone);color:var(--mw-ink);border:3px solid var(--mw-saddle);border-radius:6px;padding:8px 10px;text-align:center;font:700 1.3rem var(--mw-font-slab);letter-spacing:.12em;box-shadow:0 0 0 2px var(--mw-ember)}
    .wp-poster small{display:block;font:600 .8rem var(--mw-font-slab);letter-spacing:.06em}
    .wp-poster svg{display:block;margin:4px auto;background:var(--mw-blush);border:2px solid var(--mw-ink)}
    .wp-line{width:100%;display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
    .wp-opt{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;min-height:44px;padding:6px;border-radius:8px;border:3px solid var(--mw-ember);background:var(--mw-night);color:var(--mw-bone);font:700 .95rem var(--mw-font-slab);cursor:pointer}
    .wp-opt svg{background:var(--mw-blush);border-radius:4px}
    .wp-opt.ok{border-color:var(--mw-rose);box-shadow:0 0 0 3px var(--mw-rose)}
    .wp-opt.bad{border-color:var(--mw-red);opacity:.6}
    .wp .mw-meter{max-width:260px}
  `);
  ctx.root.append(style, h('div', { class: 'wp' }, poster, h('div', { class: 'mw-meter', 'aria-hidden': 'true' }, meter), lineEl, go, say));
  go.addEventListener('click', () => ready());

  function hud(): void { ctx.hud('Poster', `${round + 1}/${ROUNDS.length}`); ctx.hud('Caught', right); ctx.hud('Mistakes left', MISTAKES - mistakes); }
  function show(): void {
    const study = phase === 'study', R = ROUNDS[round];
    poster.style.display = study ? '' : 'none'; meter.parentElement!.style.display = study ? '' : 'none'; go.style.display = study ? '' : 'none';
    poster.replaceChildren(h('div', null, 'WANTED'), face(target, 170), h('small', null, 'Reward: $' + (round + 1) * 500));
    lineEl.style.display = study ? 'none' : '';
    lineEl.style.gridTemplateColumns = `repeat(${lineup.length > 4 ? 3 : 2},1fr)`;
    lineEl.replaceChildren(...lineup.map((f, i) => h('button', { class: 'wp-opt' + (phase === 'reveal' ? (i === answer ? ' ok' : i === chosen ? ' bad' : '') : ''), type: 'button', 'data-opt': i, disabled: phase !== 'pick', 'aria-label': `Suspect ${i + 1}`, onclick: () => pick(i) }, face(f, lineup.length > 4 ? 76 : 104), h('span', null, `${i + 1}`, phase === 'reveal' && i === answer ? ' ★ Him' : phase === 'reveal' && i === chosen ? ' ✕' : ''))));
    say.textContent = study ? `Study the face. The poster comes down in ${Math.ceil(R.look - t)} s.` : phase === 'pick' ? 'Which one was on the poster?' : chosen === answer ? 'That is the outlaw.' : 'Wrong man. The outlaw is marked with a star.';
  }
  function startRound(): void {
    const R = ROUNDS[round], n = round < 2 ? 4 : round < 4 ? 5 : 6;
    target = Array.from({ length: FEATS }, () => rint(rand, 0, OPTS - 1));
    const seen = new Set([target.join()]), decoys: Face[] = [];
    while (decoys.length < n - 1) {
      const d = target.slice(); for (const fi of shuffle(rand, [0, 1, 2, 3, 4]).slice(0, R.k)) d[fi] = (d[fi] + rint(rand, 1, OPTS - 1)) % OPTS;
      if (!seen.has(d.join())) { seen.add(d.join()); decoys.push(d); }
    }
    lineup = shuffle(rand, [target, ...decoys]); answer = lineup.indexOf(target); chosen = -1; phase = 'study'; t = 0; meter.style.width = '100%';
    hud(); show();
  }
  function ready(): void { if (!ctx.finished && phase === 'study') { phase = 'pick'; t = 0; ctx.sfx('tap'); show(); } }
  /** The one scoring action: point at a suspect. */
  function pick(i: number): void {
    if (ctx.finished || phase !== 'pick') return;
    chosen = i; phase = 'reveal'; t = 0;
    if (i === answer) { right++; score += 200 + Math.round(ROUNDS[round].look * 10); ctx.sfx('good'); } else { mistakes++; ctx.sfx('bad'); }
    hud(); show();
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt;
    if (phase === 'study') {
      meter.style.width = `${Math.max(0, 100 * (1 - t / ROUNDS[round].look))}%`;
      if (t >= ROUNDS[round].look) ready(); else { const sec = Math.ceil(ROUNDS[round].look - t); if (sec !== lastSec) { lastSec = sec; say.textContent = `Study the face. The poster comes down in ${sec} s.`; } }
    } else if (phase === 'reveal' && t > 1.3) {
      if (mistakes >= MISTAKES) ctx.finish({ result: 'lose', score, title: 'The outlaw rides free', detail: `You named ${right} outlaws before the second wrong man.` });
      else if (round >= ROUNDS.length - 1) ctx.finish({ result: 'win', score, title: 'Sharp eyes, Marshal', detail: `You picked ${right} of ${ROUNDS.length} outlaws from the lineup.` });
      else { round++; startRound(); }
    }
  }
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; mistakes = 0; right = 0; score = 0; startRound(); },
    probe: () => ({ round, phase, chosen, right, mistakes }),
    play(kind) {
      for (let n = 0; n < 4000 && !ctx.finished; n++) {
        if (phase === 'pick') pick(kind === 'win' ? answer : (answer + 1) % lineup.length);
        else update(1 / 60);
      }
    },
  };
}
