import { h } from '../core/dom';
import { makeRng, shuffle } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Vault Cipher: crack a four-symbol code (no repeats, six symbols) from exact / misplaced counts in 7 tries. */
const SYMS = ['★', '☾', '☀', '✚', '◆', '▲'];
const NAMES = ['star', 'moon', 'sun', 'cross', 'diamond', 'triangle'];
const SLOTS = 4, TRIES = 7;

export default function vaultCipher(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let secret: number[] = [], cur: number[] = [], rows: { g: number[]; ex: number; mis: number }[] = [];

  const style = h('style', null, `
    .vc{width:100%;max-width:420px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .vc-dial{display:flex;gap:6px;align-items:center;justify-content:center}
    .vc-tick{width:22px;height:10px;border-radius:5px;border:2px solid var(--mw-ember);background:var(--mw-rose)}
    .vc-tick.off{background:var(--mw-night);opacity:.5}
    .vc-hist{width:100%;display:flex;flex-direction:column;gap:5px;max-height:34vh;overflow:auto}
    .vc-row{display:grid;grid-template-columns:20px repeat(4,1fr) 96px;gap:5px;align-items:center}
    .vc-n{color:var(--mw-ash);font:600 .8rem var(--mw-font-slab);text-align:center}
    .vc-g{height:38px;display:grid;place-items:center;border-radius:6px;background:var(--mw-night);border:2px solid var(--mw-mesa);font-size:1.3rem;color:var(--mw-bone)}
    .vc-fb{font:700 .85rem/1.2 var(--mw-font-slab);color:var(--mw-bone);display:flex;flex-direction:column}
    .vc-fb b{color:var(--mw-rose)}
    .vc-cur{width:100%;display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
    .vc-slot{min-height:56px;font-size:1.7rem;border-radius:8px;border:2px dashed var(--mw-rose);background:var(--mw-night);color:var(--mw-bone);cursor:pointer}
    .vc-slot.f{border-style:solid;background:var(--mw-wine)}
    .vc-pal{width:100%;display:grid;grid-template-columns:repeat(6,1fr);gap:6px}
    .vc-sym{min-height:48px;font-size:1.4rem;border-radius:8px;border:2px solid var(--mw-ember);background:var(--mw-surface-raised,var(--mw-dusk));color:var(--mw-bone);cursor:pointer}
    .vc-sym:disabled{opacity:.35}
  `);
  const dial = h('div', { class: 'vc-dial', 'aria-hidden': 'true' });
  const hist = h('div', { class: 'vc-hist', 'aria-live': 'polite' });
  const curEl = h('div', { class: 'vc-cur' });
  const pal = h('div', { class: 'vc-pal' });
  const go = h('button', { class: 'mw-btn primary', type: 'button', 'data-try': '', style: { width: '100%', minHeight: '48px' } }, 'Try the lock');
  const note = h('p', { class: 'mw-note' }, 'Full ● = right symbol, right place. ○ = right symbol, wrong place. Symbols never repeat.');
  ctx.root.append(style, h('div', { class: 'vc' }, dial, hist, curEl, pal, go, note));

  SYMS.forEach((s, i) => pal.append(h('button', { class: 'vc-sym', type: 'button', 'aria-label': `Place ${NAMES[i]}`, 'data-sym': i, onclick: () => place(i) }, s)));
  go.addEventListener('click', () => submit());

  function render(): void {
    dial.replaceChildren(...Array.from({ length: TRIES }, (_, i) => h('span', { class: 'vc-tick' + (i < TRIES - rows.length ? '' : ' off') })));
    hist.replaceChildren(...rows.map((r, i) => h('div', { class: 'vc-row' }, h('span', { class: 'vc-n' }, i + 1), ...r.g.map((s) => h('span', { class: 'vc-g' }, SYMS[s])), h('span', { class: 'vc-fb' }, h('span', null, h('b', null, '● '), r.ex, ' exact'), h('span', null, '○ ', r.mis, ' misplaced')))));
    hist.scrollTop = hist.scrollHeight;
    curEl.replaceChildren(...Array.from({ length: SLOTS }, (_, i) => h('button', { class: 'vc-slot' + (cur[i] != null ? ' f' : ''), type: 'button', 'aria-label': cur[i] != null ? `Clear ${NAMES[cur[i]]}` : 'Empty slot', onclick: () => clear(i) }, cur[i] != null ? SYMS[cur[i]] : '?')));
    pal.querySelectorAll('button').forEach((b, i) => { (b as HTMLButtonElement).disabled = cur.includes(i) || cur.length >= SLOTS; });
    (go as HTMLButtonElement).disabled = cur.length < SLOTS;
    ctx.hud('Tries left', TRIES - rows.length);
  }
  function place(i: number): void { if (ctx.finished || cur.length >= SLOTS || cur.includes(i)) return; cur.push(i); ctx.sfx('tap'); render(); }
  function clear(i: number): void { if (ctx.finished || i >= cur.length) return; cur.splice(i, 1); render(); }
  /** The one scoring action: lock in the guess. */
  function submit(): void {
    if (ctx.finished || cur.length < SLOTS) return;
    const ex = cur.filter((s, i) => s === secret[i]).length;
    const mis = cur.filter((s) => secret.includes(s)).length - ex;
    rows.push({ g: cur.slice(), ex, mis }); cur = [];
    render();
    if (ex === SLOTS) { ctx.sfx('win'); ctx.finish({ result: 'win', score: (TRIES - rows.length + 1) * 100, title: 'Vault open', detail: `Cracked in ${rows.length} ${rows.length === 1 ? 'try' : 'tries'}.` }); }
    else if (rows.length >= TRIES) ctx.finish({ result: 'lose', score: 0, title: 'Vault stays shut', detail: `The code was ${secret.map((s) => SYMS[s]).join(' ')}.` });
    else ctx.sfx(ex ? 'good' : 'bad');
  }
  ctx.keys({
    '1': (d) => d && place(0), '2': (d) => d && place(1), '3': (d) => d && place(2), '4': (d) => d && place(3), '5': (d) => d && place(4), '6': (d) => d && place(5),
    Backspace: (d) => d && clear(cur.length - 1), Enter: (d) => d && submit(),
  });

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); secret = shuffle(rand, [0, 1, 2, 3, 4, 5]).slice(0, SLOTS); cur = []; rows = []; render(); },
    probe: () => ({ cur, tries: rows.length, last: rows[rows.length - 1] ?? null }),
    play(kind: Result) {
      for (let n = 0; n < TRIES + 2 && !ctx.finished; n++) {
        let g = kind === 'win' ? secret.slice() : [0, 1, 2, 3, 4, 5].map((_, i) => (i + n) % 6).slice(0, SLOTS);
        if (kind === 'lose' && g.every((s, i) => s === secret[i])) g = g.slice().reverse();
        g.forEach((s) => place(s)); submit();
      }
    },
  };
}
