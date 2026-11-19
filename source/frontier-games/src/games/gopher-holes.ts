import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Gopher Holes: whack gophers, spare the sheriff's hat. 45 seconds, speed rises. Score 180 with a life left. */
const LEN = 45, GOAL = 180, LIVES = 3, PAD_KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
interface Hole { kind: 0 | 1 | 2; left: number; flash: '' | 'hit' | 'bad' }

export default function gopherHoles(ctx: Ctx): Instance {
  let rand = makeRng(1), t = 0, next = 0.6, score = 0, lives = LIVES, got = 0, holes: Hole[] = [];

  const style = h('style', null, `
    .gh{width:100%;max-width:400px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .gh-track{position:relative;width:100%;height:22px;border-bottom:2px solid var(--mw-tan)}
    .gh-sun{position:absolute;top:0;width:20px;height:20px;border-radius:50%;background:var(--mw-bone);border:2px solid var(--mw-red);transform:translateX(-50%)}
    .gh-grid{width:100%;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .gh-h{position:relative;aspect-ratio:1;max-height:118px;width:100%;border:0;padding:0;background:none;cursor:pointer;overflow:hidden;border-radius:10px;touch-action:manipulation}
    .gh-mound{position:absolute;left:4%;right:4%;bottom:0;height:46%;border-radius:50% 50% 8px 8px/70% 70% 8px 8px;background:var(--mw-umber);border:2px solid var(--mw-tan);z-index:2}
    .gh-mound:before{content:"";position:absolute;left:18%;right:18%;top:20%;height:34%;border-radius:50%;background:var(--mw-ink)}
    .gh-pop{position:absolute;left:50%;bottom:30%;width:66%;height:62%;transform:translate(-50%,70%);transition:transform .08s;z-index:1;display:grid;place-items:center;font:700 .62rem var(--mw-font-slab);border-radius:50% 50% 14px 14px;visibility:hidden}
    .gh-h[data-k="1"] .gh-pop{visibility:visible;transform:translate(-50%,0);background:var(--mw-tan);border:3px solid var(--mw-ink);color:var(--mw-ink)}
    .gh-h[data-k="2"] .gh-pop{visibility:visible;transform:translate(-50%,0);background:var(--mw-red);border:3px solid var(--mw-bone);color:var(--mw-white);border-radius:6px 6px 14px 14px}
    .gh-pop b{display:block;font-size:1.1rem;line-height:1}
    .gh-h[data-f="hit"] .gh-mound{background:var(--mw-rose)}.gh-h[data-f="bad"] .gh-mound{background:var(--mw-red)}
    .gh-lives{font:700 .95rem var(--mw-font-slab);color:var(--mw-bone)}
  `);
  const sun = h('span', { class: 'gh-sun' }), lifeEl = h('div', { class: 'gh-lives', 'aria-live': 'polite' });
  const btns = Array.from({ length: 9 }, (_, i) => h('button', { class: 'gh-h', type: 'button', 'data-hole': i, 'data-k': '0', 'aria-label': `Hole ${i + 1}`, onpointerdown: (e: Event) => { e.preventDefault(); whack(i); }, onclick: (e: MouseEvent) => { if (e.detail === 0) whack(i); } },
    h('span', { class: 'gh-pop' }, h('span', null, h('b', null, '· ·'), 'GOPHER')), h('span', { class: 'gh-mound' })));
  ctx.root.append(style, h('div', { class: 'gh' }, h('div', { class: 'gh-track', 'aria-hidden': 'true' }, sun), lifeEl, h('div', { class: 'gh-grid' }, ...btns), h('p', { class: 'mw-note' }, 'Tan GOPHER: tap it. Red ★ HAT: leave it.')));

  function paint(i: number): void {
    const b = btns[i], k = holes[i].kind; b.dataset.k = String(k); b.dataset.f = holes[i].flash;
    const pop = b.firstElementChild as HTMLElement; pop.innerHTML = k === 2 ? '<span><b>★</b>HAT</span>' : '<span><b>· ·</b>GOPHER</span>';
    b.setAttribute('aria-label', `Hole ${i + 1}${k === 1 ? ': gopher' : k === 2 ? ': sheriff hat, do not tap' : ''}`);
  }
  function hud(): void { ctx.hud('Score', `${score}/${GOAL}`); ctx.hud('Lives', lives); lifeEl.textContent = `Hat taps allowed: ${lives}`; }
  /** The one player action: tap a hole. */
  function whack(i: number): void {
    const hl = holes[i]; if (ctx.finished || !hl) return;
    if (hl.kind === 1) { score += 10; got++; hl.kind = 0; hl.flash = 'hit'; ctx.sfx('good'); }
    else if (hl.kind === 2) {
      lives--; score = Math.max(0, score - 15); hl.kind = 0; hl.flash = 'bad'; ctx.sfx('bad');
      if (lives <= 0) { hud(); paint(i); ctx.finish({ result: 'lose', score, title: 'Sheriff’s hat hit', detail: `You tapped three sheriff’s hats after ${got} gophers.` }); return; }
    } else return;
    hud(); paint(i);
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt; sun.style.left = `${Math.min(100, (t / LEN) * 100)}%`;
    holes.forEach((hl, i) => { if (hl.flash && hl.kind === 0 && hl.left <= 0) { hl.flash = ''; paint(i); } hl.left -= dt; if (hl.kind && hl.left <= 0) { hl.kind = 0; hl.flash = ''; paint(i); } });
    next -= dt;
    if (next <= 0) {
      const p = t / LEN; next = 0.85 - 0.4 * p + rand() * 0.2;
      const free = holes.map((hl, i) => (hl.kind ? -1 : i)).filter((i) => i >= 0);
      if (free.length) { const i = free[Math.floor(rand() * free.length)]; holes[i] = { kind: rand() < 0.25 ? 2 : 1, left: 1.15 - 0.5 * p, flash: '' }; paint(i); }
    }
    if (t >= LEN) {
      const win = score >= GOAL; ctx.finish({ result: win ? 'win' : 'lose', score, title: win ? 'Sundown, field cleared' : 'Gophers got the day', detail: win ? `${score} points with ${lives} hat spares left.` : `${score} of ${GOAL} points before sundown.` });
    }
  }
  ctx.keys(Object.fromEntries(PAD_KEYS.map((k, i) => [k, (d: boolean) => { if (d) whack(i); }])));
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); t = 0; next = 0.6; score = 0; lives = LIVES; got = 0; sun.style.left = '0%';
      holes = Array.from({ length: 9 }, () => ({ kind: 0, left: 0, flash: '' })); holes.forEach((_, i) => paint(i)); hud();
    },
    probe: () => ({ t: Math.round(t * 10), score, lives, up: holes.map((x) => x.kind).join('') }),
    play(kind) {
      for (let g = 0; g < 3000 && !ctx.finished; g++) {
        holes.forEach((hl, i) => { if (kind === 'win' ? hl.kind === 1 : hl.kind === 2) whack(i); });
        update(1 / 60);
      }
    },
  };
}
