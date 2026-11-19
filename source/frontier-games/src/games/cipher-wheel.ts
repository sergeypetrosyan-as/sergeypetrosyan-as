import { h } from '../core/dom';
import { makeRng, pick, rint } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Cipher Wheel: turn the inner alphabet wheel until the telegram reads true, then lock it in. Three telegrams, three wrong locks allowed. */
const TELEGRAMS: string[][] = [
  ['SEND HELP TO THE FORT', 'BRING WATER TO THE CAMP'],
  ['GOLD LEAVES THE ASSAY OFFICE AT DAWN', 'THE TRAIN CARRIES SILVER FROM THE NORTH MINE'],
  ['THE SHERIFF RIDES TONIGHT SO MOVE THE CATTLE BEFORE THE MOON RISES', 'MEET ME BY THE DRY WELL WHEN THE LAST LAMP GOES OUT AND BRING NO ONE'],
];
const STRIKES = 3;
const A = 65;
const rot = (s: string, k: number): string => s.replace(/[A-Z]/g, (ch) => String.fromCharCode(((ch.charCodeAt(0) - A + k + 26) % 26) + A));

export default function cipherWheel(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let level = 1, wheel = 0, wrong = 0, score = 0, secret = 5, plain = '', cipher = '';

  const style = h('style', null, `
    .cw{width:100%;max-width:420px;display:flex;flex-direction:column;align-items:center;gap:10px}
    .cw-wheel{width:min(100%,250px);aspect-ratio:1;display:block}
    .cw-wheel .ring{fill:var(--mw-umber);stroke:var(--mw-ember);stroke-width:3}
    .cw-wheel .disc{fill:var(--mw-night);stroke:var(--mw-tan);stroke-width:3}
    .cw-wheel .hub{fill:var(--mw-saddle);stroke:var(--mw-bone);stroke-width:2}
    .cw-wheel text{font:700 13px var(--mw-font-slab);text-anchor:middle;dominant-baseline:central}
    .cw-wheel .o{fill:var(--mw-tan)}
    .cw-wheel .i{fill:var(--mw-bone)}
    .cw-wheel .mark{stroke:var(--mw-rose);stroke-width:3;stroke-linecap:round}
    .cw-line{width:100%;display:flex;flex-direction:column;gap:2px;padding:8px 10px;border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-night)}
    .cw-line small{color:var(--mw-ash);font:600 .75rem var(--mw-font-slab);letter-spacing:.08em;text-transform:uppercase}
    .cw-line p{margin:0;font:700 1.05rem/1.35 var(--mw-font-slab);word-break:break-word;letter-spacing:.04em}
    .cw-cipher{color:var(--mw-tan)}
    .cw-plain{color:var(--mw-bone)}
    .cw-tally{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;font:600 .85rem var(--mw-font-slab);color:var(--mw-bone)}
    .cw-tally span{border:2px solid var(--mw-mesa);border-radius:999px;padding:2px 10px}
    .cw-row{display:flex;gap:8px;width:100%}
    .cw-row .mw-btn{flex:1;min-height:48px}
    .cw-strikes{font:700 1.1rem var(--mw-font-slab);letter-spacing:.2em;color:var(--mw-rose)}
  `);
  const wheelEl = h('svg', { class: 'cw-wheel', viewBox: '0 0 260 260', role: 'img', 'aria-label': 'Brass cipher wheel' });
  const cEl = h('p', { class: 'cw-cipher' }), pEl = h('p', { class: 'cw-plain', 'aria-live': 'polite' });
  const tally = h('div', { class: 'cw-tally' }), hint = h('p', { class: 'mw-note' }), strikes = h('div', { class: 'cw-strikes', 'aria-hidden': 'true' });
  const left = h('button', { class: 'mw-btn', type: 'button', 'data-turn': '-1', 'aria-label': 'Turn wheel back one letter', onclick: () => turn(-1) }, '◀ Turn');
  const right = h('button', { class: 'mw-btn', type: 'button', 'data-turn': '1', 'aria-label': 'Turn wheel forward one letter', onclick: () => turn(1) }, 'Turn ▶');
  const lock = h('button', { class: 'mw-btn primary', type: 'button', 'data-lock': '', onclick: () => submit() }, 'Lock it in');
  ctx.root.append(style, h('div', { class: 'cw' }, wheelEl, h('div', { class: 'cw-row' }, left, right),
    h('div', { class: 'cw-line' }, h('small', null, 'Telegram'), cEl, h('small', null, 'Reads'), pEl), tally, hint, lock, strikes));

  function ringSvg(): string {
    const pos = (i: number, r: number): [number, number] => { const a = (i * 2 * Math.PI) / 26 - Math.PI / 2; return [130 + Math.cos(a) * r, 130 + Math.sin(a) * r]; };
    let s = '<circle class="ring" cx="130" cy="130" r="124"/><circle class="disc" cx="130" cy="130" r="90"/><circle class="hub" cx="130" cy="130" r="30"/>';
    for (let i = 0; i < 26; i++) {
      const [ox, oy] = pos(i, 107), [ix, iy] = pos(i + wheel, 72);
      s += `<text class="o" x="${ox.toFixed(1)}" y="${oy.toFixed(1)}">${String.fromCharCode(A + i)}</text><text class="i" x="${ix.toFixed(1)}" y="${iy.toFixed(1)}">${String.fromCharCode(A + i)}</text>`;
    }
    return s + '<line class="mark" x1="130" y1="2" x2="130" y2="22"/><text x="130" y="130" class="i" style="font-size:11px">OUT/IN</text>';
  }
  function render(): void {
    wheelEl.innerHTML = ringSvg();
    cEl.textContent = cipher; pEl.textContent = rot(cipher, -wheel);
    const freq = new Map<string, number>();
    for (const ch of cipher) if (ch !== ' ') freq.set(ch, (freq.get(ch) ?? 0) + 1);
    tally.replaceChildren('Most common: ', ...[...freq].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3).map(([k, n]) => h('span', null, `${k} ×${n}`)));
    hint.textContent = level === 1 ? `Hint: the first word is ${plain.split(' ')[0]}.` : level === 2 ? `Hint: the word lengths are ${plain.split(' ').map((w) => w.length).join(', ')}.` : 'No hints. E and T are the most common letters in English.';
    strikes.textContent = '✖'.repeat(wrong) + '◇'.repeat(STRIKES - wrong);
    ctx.hud('Telegram', `${level}/3`); ctx.hud('Wrong locks', `${wrong}/${STRIKES}`); ctx.hud('Score', score);
  }
  function newTelegram(): void {
    plain = pick(rand, TELEGRAMS[level - 1]); secret = rint(rand, 1, 25); wheel = 0; cipher = rot(plain, secret); render();
  }
  function turn(d: number): void { if (ctx.finished) return; wheel = (wheel + d + 26) % 26; ctx.sfx('tick'); render(); }
  /** The scoring action: lock in the wheel setting. */
  function submit(): void {
    if (ctx.finished) return;
    if (wheel === secret) {
      score += 300; ctx.sfx('good');
      if (level >= 3) { score += (STRIKES - wrong) * 100; ctx.finish({ result: 'win', score, title: 'Message decoded', detail: `All three telegrams read true with ${wrong} wrong ${wrong === 1 ? 'lock' : 'locks'}.` }); return; }
      level++; newTelegram();
    } else {
      wrong++; ctx.sfx('bad'); render();
      if (wrong >= STRIKES) ctx.finish({ result: 'lose', score, title: 'Wire went cold', detail: `Three wrong locks. The wheel setting was ${secret}.` });
    }
  }
  ctx.keys({ ArrowLeft: (d) => d && turn(-1), ArrowRight: (d) => d && turn(1), Enter: (d) => d && submit() });
  ctx.pad([{ key: 'ArrowLeft', label: '◀' }, { key: 'ArrowRight', label: '▶' }]);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); level = 1; wrong = 0; score = 0; newTelegram(); },
    probe: () => ({ level, wheel, wrong, score }),
    play(kind) {
      for (let g = 0; g < 200 && !ctx.finished; g++) {
        const goal = kind === 'win' ? secret : (secret + 7) % 26;
        for (let n = 0; n < 26 && wheel !== goal; n++) turn(1);
        submit();
      }
    },
  };
}
