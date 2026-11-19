import { h } from '../core/dom';
import { makeRng, rint, shuffle } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Who Shot the Sheriff: six suspects, up to five witness clues. Clear the suspects each clue rules out, then accuse the last one. */
const NAMES = ['Dusty Reyes', 'Mae Calloway', 'Silas Crane', 'Rosa Vance', 'Jed Holloway', 'Pearl Mercer', 'Cole Thatcher', 'Iris Boone'];
// attribute -> value -> [label on card, clue if true, clue if false]
const ATTR: [string, string, string][][] = [
  [['Tall hat', 'wore a tall hat', 'did not wear a tall hat'], ['Wide hat', 'wore a wide hat', 'did not wear a wide hat'], ['Bare head', 'wore no hat', 'wore a hat']],
  [['Duster', 'wore a duster coat', 'did not wear a duster'], ['Vest', 'wore a vest', 'did not wear a vest'], ['Poncho', 'wore a poncho', 'did not wear a poncho']],
  [['Rope', 'carried a rope', 'carried no rope'], ['Knife', 'carried a knife', 'carried no knife'], ['Pistol', 'carried a pistol', 'carried no pistol']],
];
const LIVES = 2;
type Clue = { a: number; v: number; neg: boolean };

export default function sheriffsGallows(ctx: Ctx): Instance {
  let sus: number[][] = [], names: string[] = [], clues: Clue[] = [], culprit = 0;
  let shown = 1, marks: boolean[] = [], lives = LIVES, wrong = 0;
  let accused = -1;
  const fits = (s: number[], c: Clue): boolean => (c.neg ? s[c.a] !== c.v : s[c.a] === c.v);
  const left = (n: number): number[] => sus.map((_, i) => i).filter((i) => clues.slice(0, n).every((c) => fits(sus[i], c)));

  const style = h('style', null, `
    .sg{width:100%;max-width:640px;display:flex;flex-direction:column;gap:10px}
    .sg-top{display:flex;align-items:center;gap:12px;justify-content:space-between}
    .sg-rope{display:flex;gap:8px;align-items:center;color:var(--mw-ash);font:600 .85rem var(--mw-font-slab)}
    .sg-rope svg{width:84px;height:46px}
    .sg-clues{margin:0;padding:8px 10px 8px 34px;display:flex;flex-direction:column;gap:4px;border:2px dashed var(--mw-saddle);border-radius:10px;color:var(--mw-bone)}
    .sg-clues li{line-height:1.35}
    .sg-clues li.new{color:var(--mw-rose);font-weight:700}
    .sg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .sg-card{display:flex;flex-direction:column;gap:2px;padding:8px;border:2px solid var(--mw-mesa);border-radius:10px;background:var(--mw-night);min-width:0}
    .sg-card b{font:700 .9rem/1.2 var(--mw-font-slab);color:var(--mw-bone);overflow-wrap:anywhere}
    .sg-card span{font-size:.82rem;color:var(--mw-ash)}
    .sg-card .mw-btn{min-height:44px;padding:0 6px;font-size:.85rem;margin-top:4px}
    .sg-card.out{opacity:.55;border-style:dashed}
    .sg-card.out b{text-decoration:line-through}
    .sg-tag{font:700 .72rem var(--mw-font-slab);color:var(--mw-rose);letter-spacing:.05em}
    .sg-card.hit{border-color:var(--mw-red);background:var(--mw-wine)}
    @media(max-width:520px){.sg-card span{font-size:.76rem}.sg-card b{font-size:.82rem}}
  `);
  const top = h('div', { class: 'sg-top' });
  const clueEl = h('ol', { class: 'sg-clues', 'aria-live': 'polite' });
  const grid = h('div', { class: 'sg-grid' });
  const next = h('button', { class: 'mw-btn', type: 'button', 'data-next': '', onclick: () => nextClue() });
  const note = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'sg' }, top, clueEl, h('div', { class: 'mw-row' }, next), grid, note));

  function gallows(): SVGElement {
    const svg = h('svg', { viewBox: '0 0 84 46', 'aria-hidden': 'true' }, h('path', { d: 'M4 44 H40 M12 44 V4 H70 M12 14 L22 4', fill: 'none', stroke: 'var(--mw-tan)', 'stroke-width': 3, 'stroke-linecap': 'round' }));
    for (let i = 0; i < LIVES; i++) {
      const x = 36 + i * 20, gone = i >= lives;
      svg.append(h('line', { x1: x, y1: 4, x2: x, y2: 16, stroke: gone ? 'var(--mw-smoke)' : 'var(--mw-bone)', 'stroke-width': 2 }),
        h('circle', { cx: x, cy: 22, r: 6, fill: 'none', stroke: gone ? 'var(--mw-smoke)' : 'var(--mw-rose)', 'stroke-width': 2.5, 'stroke-dasharray': gone ? '3 3' : '' }));
    }
    return svg as unknown as SVGElement;
  }
  function render(): void {
    top.replaceChildren(h('p', { class: 'mw-note', style: { textAlign: 'left' } }, `A shot at the saloon. ${left(shown).length} of 6 still fit the clues you hold.`),
      h('div', { class: 'sg-rope' }, 'Accusations', gallows()));
    clueEl.replaceChildren(...clues.slice(0, shown).map((c, i) => h('li', { class: i === shown - 1 ? 'new' : '' }, `The shooter ${ATTR[c.a][c.v][c.neg ? 2 : 1]}.`)));
    next.textContent = shown < clues.length ? `Next clue (${shown}/${clues.length})` : 'All clues in';
    (next as HTMLButtonElement).disabled = shown >= clues.length || ctx.finished;
    grid.replaceChildren(...sus.map((s, i) => h('div', { class: `sg-card${marks[i] ? ' out' : ''}${accused === i ? ' hit' : ''}`, 'data-sus': i },
      h('b', null, names[i]), ...s.map((v, a) => h('span', null, ATTR[a][v][0])),
      marks[i] ? h('span', { class: 'sg-tag' }, 'CLEARED') : null,
      h('button', { class: 'mw-btn', type: 'button', 'data-clear': i, 'aria-pressed': marks[i] ? 'true' : 'false', onclick: () => toggle(i) }, marks[i] ? 'Undo clear' : 'Clear'),
      h('button', { class: 'mw-btn primary', type: 'button', 'data-accuse': i, onclick: () => accuse(i) }, 'Accuse'))));
    ctx.hud('Clues', `${shown}/${clues.length}`); ctx.hud('Accusations', lives);
  }
  function toggle(i: number): void { if (ctx.finished) return; marks[i] = !marks[i]; ctx.sfx('tap'); render(); }
  function nextClue(): void { if (ctx.finished || shown >= clues.length) return; shown++; ctx.sfx('tick'); note.textContent = 'A new witness steps up. Who can you clear?'; render(); }
  function accuse(i: number): void {
    if (ctx.finished) return;
    accused = i;
    if (i === culprit) {
      render(); ctx.sfx('win');
      ctx.finish({ result: 'win', score: Math.max(100, 1000 - (shown - 1) * 120 - wrong * 250), title: 'Case closed', detail: `${names[i]} did it. You used ${shown} of ${clues.length} clues and ${wrong} wrong accusation${wrong === 1 ? '' : 's'}.` });
      return;
    }
    wrong++; lives--; ctx.sfx('bad'); marks[i] = true;
    note.textContent = `${names[i]} is innocent. ${lives} accusation${lives === 1 ? '' : 's'} left.`;
    render();
    if (lives <= 0) ctx.finish({ result: 'lose', score: 0, title: 'The real shooter rides free', detail: `You accused the wrong people. It was ${names[culprit]}.` });
  }

  function build(seed: number): void {
    const rand = makeRng(seed);
    for (let tries = 0; tries < 400; tries++) {
      const set = new Set<string>(); sus = [];
      while (sus.length < 6) { const s = [rint(rand, 0, 2), rint(rand, 0, 2), rint(rand, 0, 2)]; if (!set.has(s.join())) { set.add(s.join()); sus.push(s); } }
      culprit = rint(rand, 0, 5);
      const truths: Clue[] = [];
      for (let a = 0; a < 3; a++) for (let v = 0; v < 3; v++) truths.push({ a, v, neg: v !== sus[culprit][a] });
      const pool = shuffle(rand, truths);
      const picked: Clue[] = []; let alive = sus.map((_, i) => i);
      for (const c of pool) {
        const nxt = alive.filter((i) => fits(sus[i], c));
        if (nxt.length === alive.length) continue;
        picked.push(c); alive = nxt;
        if (alive.length === 1) break;
      }
      if (alive.length === 1 && picked.length >= 3 && picked.length <= 5) { clues = picked; break; }
    }
    names = shuffle(rand, NAMES).slice(0, 6);
  }

  return {
    destroy() { /* released by the shell */ },
    reset(seed) { build(seed); shown = 1; marks = sus.map(() => false); lives = LIVES; wrong = 0; accused = -1; note.textContent = 'Clear suspects the clues rule out, then accuse the one left. Wrong accusations cost a noose.'; render(); },
    probe: () => ({ shown, marks: marks.map(Number).join(''), lives, wrong }),
    play(kind) {
      if (kind === 'win') {
        while (shown < clues.length) nextClue();
        sus.forEach((_, i) => { if (i !== culprit && !marks[i]) toggle(i); });
        accuse(culprit);
      } else {
        for (let i = 0; i < 6 && !ctx.finished; i++) if (i !== culprit) accuse(i);
      }
    },
  };
}
