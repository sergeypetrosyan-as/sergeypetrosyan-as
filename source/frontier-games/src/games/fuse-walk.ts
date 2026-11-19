import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Fuse Walk: several fuses burn toward one powder keg. Snuff each one; later cuts pay more, a burnt-out fuse blows the keg. */
const ROUNDS = 5;
const COUNTS = [2, 3, 3, 4, 4];
const GOAL = 850;
const LABELS = ['A', 'B', 'C', 'D'];
const MARKS = ['✦', '◆', '▲', '●'];

interface Fuse { dur: number; t: number; cut: boolean; pts: number }

export default function fuseWalk(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let round = 1, score = 0, fuses: Fuse[] = [], pause = 0, cutCount = 0;

  const style = h('style', null, `
    .fw{width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px}
    .fw-head{display:flex;justify-content:space-between;align-items:center;gap:8px}
    .fw-keg{display:grid;place-items:center;width:64px;height:48px;border:3px solid var(--mw-ember);border-radius:8px;background:var(--mw-umber);color:var(--mw-bone);font:700 .8rem var(--mw-font-slab);letter-spacing:.06em}
    .fw-goal{font:600 .95rem var(--mw-font-slab);color:var(--mw-bone)}
    .fw-list{display:flex;flex-direction:column;gap:8px}
    .fw-fuse{display:grid;grid-template-columns:44px 1fr 64px;gap:8px;align-items:center;min-height:60px;padding:6px 8px;border:2px solid var(--mw-mesa);border-radius:10px;background:var(--mw-night);color:var(--mw-bone);cursor:pointer;font:600 1rem var(--mw-font-slab);text-align:left}
    .fw-fuse:hover{border-color:var(--mw-rose)}
    .fw-id{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;border:2px solid var(--mw-bone);font-size:1rem}
    .fw-track{position:relative;height:16px;border-radius:8px;background:var(--mw-ink);border:2px solid var(--mw-ash);overflow:visible}
    .fw-burnt{position:absolute;left:0;top:0;bottom:0;border-radius:6px;background:var(--mw-ash);opacity:.6}
    .fw-spark{position:absolute;top:50%;width:22px;height:22px;margin:-11px 0 0 -11px;display:grid;place-items:center;color:var(--mw-ink);background:var(--mw-rose);border-radius:50%;font-size:.8rem}
    .fw-pts{text-align:right;font-variant-numeric:tabular-nums;font-size:1.15rem}
    .fw-fuse.hot{border-color:var(--mw-red)}
    .fw-fuse.hot .fw-pts::before{content:'! ';color:var(--mw-red)}
    .fw-fuse.cut{opacity:.55;border-style:dashed;cursor:default}
    .fw-fuse.cut .fw-spark{display:none}
  `);
  const list = h('div', { class: 'fw-list' });
  const msg = h('p', { class: 'mw-note', role: 'status' }, 'Tap a fuse to snuff it. Later is worth more.');
  ctx.root.append(style, h('div', { class: 'fw' },
    h('div', { class: 'fw-head' }, h('span', { class: 'fw-goal' }, `Goal ${GOAL} points`), h('span', { class: 'fw-keg', 'aria-label': 'Powder keg' }, 'KEG')),
    list, msg));

  function hud(): void { ctx.hud('Round', `${round}/${ROUNDS}`); ctx.hud('Score', score); }
  function pct(f: Fuse): number { return Math.min(1, f.t / f.dur); }

  function startRound(): void {
    const n = COUNTS[round - 1], k = 1 - 0.05 * (round - 1);
    const durs = shuffle(rand, Array.from({ length: n }, (_, i) => (3.0 + i * 0.95 + rand() * 0.45) * k));
    fuses = durs.map((dur) => ({ dur, t: 0, cut: false, pts: 0 }));
    cutCount = 0; pause = 0;
    list.replaceChildren(...fuses.map((_, i) => h('button', { class: 'fw-fuse', type: 'button', 'data-fuse': i, 'aria-label': `Snuff fuse ${LABELS[i]}`, onclick: () => cut(i) },
      h('span', { class: 'fw-id' }, MARKS[i] + LABELS[i]),
      h('span', { class: 'fw-track' }, h('span', { class: 'fw-burnt' }), h('span', { class: 'fw-spark' }, '✦')),
      h('span', { class: 'fw-pts' }, '+0'))));
    draw(); hud();
  }
  /** The one player action: snuff a burning fuse. */
  function cut(i: number): void {
    const f = fuses[i];
    if (ctx.finished || !f || f.cut || pause > 0) return;
    f.cut = true; f.pts = Math.floor(pct(f) * 100); score += f.pts; cutCount++;
    ctx.sfx(f.pts > 70 ? 'good' : 'tap');
    msg.textContent = `Fuse ${LABELS[i]} snuffed for ${f.pts} points.`;
    hud(); draw();
    if (cutCount === fuses.length) pause = 0.9;
  }
  function update(dt: number): void {
    if (ctx.finished || !fuses.length) return;
    if (pause > 0) {
      pause -= dt;
      if (pause <= 0) {
        if (round >= ROUNDS) {
          const win = score >= GOAL;
          ctx.finish({ result: win ? 'win' : 'lose', score, title: win ? 'Keg saved' : 'Too timid', detail: win ? `You snuffed every fuse for ${score} points.` : `Only ${score} points, short of ${GOAL}. Cut later next time.` });
        } else { round++; startRound(); }
      }
      return;
    }
    for (const f of fuses) {
      if (f.cut) continue;
      f.t += dt;
      if (f.t >= f.dur) {
        f.t = f.dur; draw(); ctx.sfx('lose');
        ctx.finish({ result: 'lose', score, title: 'The keg blew', detail: `A fuse burnt out in round ${round}. You banked ${score} points first.` });
        return;
      }
    }
  }
  function draw(): void {
    list.childNodes.forEach((node, i) => {
      const el = node as HTMLElement, f = fuses[i], p = pct(f);
      const burnt = el.querySelector('.fw-burnt') as HTMLElement, spark = el.querySelector('.fw-spark') as HTMLElement;
      burnt.style.width = `${p * 100}%`; spark.style.left = `${p * 100}%`;
      (el.querySelector('.fw-pts') as HTMLElement).textContent = f.cut ? `+${f.pts}` : `+${Math.floor(p * 100)}`;
      el.classList.toggle('hot', !f.cut && p > 0.8); el.classList.toggle('cut', f.cut);
    });
  }
  ctx.keys({ '1': (d) => d && cut(0), '2': (d) => d && cut(1), '3': (d) => d && cut(2), '4': (d) => d && cut(3) });
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 1; score = 0; msg.textContent = 'Tap a fuse to snuff it. Later is worth more.'; startRound(); },
    probe: () => ({ round, score, cut: cutCount, t: fuses.map((f) => Math.round(f.t * 10)) }),
    play(kind) {
      for (let g = 0; g < 40000 && !ctx.finished; g++) {
        if (kind === 'win') fuses.forEach((f, i) => { if (!f.cut && pct(f) >= 0.8) cut(i); });
        update(1 / 60);
      }
    },
  };
}
