import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Bluff Dice: you and a rival each hold hidden dice. Bid how many of a face are on the whole table, or call the last bid a bluff. */
const START = 3;
type Bid = { n: number; f: number } | null;

export default function bluffDice(ctx: Ctx): Instance {
  type Phase = 'mine' | 'rival' | 'reveal';
  let rand = makeRng(1);
  let mine: number[] = [], riv: number[] = [], bid: Bid = null, bidder: 'me' | 'rival' = 'me', phase: Phase = 'mine';
  let sel = { n: 1, f: 2 }, msg = '', starter: 'me' | 'rival' = 'me', rounds = 0, wonCalls = 0, loser: 'me' | 'rival' | '' = '';

  const style = h('style', null, `
    .bd{width:100%;max-width:420px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .bd-dice{display:flex;gap:8px;justify-content:center;min-height:54px}
    .bd-d{width:48px;height:48px;border-radius:10px;border:3px solid var(--mw-bone);background:var(--mw-tan);color:var(--mw-ink);display:grid;place-items:center;font:700 1.5rem var(--mw-font-slab)}
    .bd-d.hid{background:var(--mw-night);border-color:var(--mw-mesa);color:var(--mw-ash)}
    .bd-d.hit{border-color:var(--mw-rose);box-shadow:0 0 0 3px var(--mw-red)}
    .bd-bid{font:700 1.2rem var(--mw-font-slab);text-align:center;min-height:2.4em}
    .bd-faces{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;width:100%}
    .bd-f{min-height:48px;border-radius:8px;border:2px solid var(--mw-ember);background:var(--mw-surface-raised,var(--mw-dusk));color:var(--mw-bone);font:700 1.2rem var(--mw-font-slab);cursor:pointer}
    .bd-f.sel{background:var(--mw-red);border-color:var(--mw-bone);color:var(--mw-white)}
    .bd-step{display:flex;align-items:center;gap:12px;font:700 1.3rem var(--mw-font-slab)}
    .bd-step button{width:48px;height:48px;border-radius:8px;border:2px solid var(--mw-ember);background:transparent;color:var(--mw-bone);font-size:1.4rem;cursor:pointer}
    .bd-lbl{font:600 .8rem var(--mw-font-slab);color:var(--mw-ash);margin:0}
  `);
  const rivEl = h('div', { class: 'bd-dice', 'aria-label': 'Rival dice' });
  const myEl = h('div', { class: 'bd-dice', 'aria-label': 'Your dice' });
  const bidEl = h('div', { class: 'bd-bid', role: 'status' });
  const faces = h('div', { class: 'bd-faces' });
  const cnt = h('span', { 'data-count': '' });
  const hint = h('p', { class: 'mw-note' });
  const minus = h('button', { type: 'button', 'aria-label': 'Fewer', onclick: () => stepN(-1) }, '−');
  const plus = h('button', { type: 'button', 'aria-label': 'More', onclick: () => stepN(1) }, '+');
  const bidBtn = h('button', { class: 'mw-btn primary', type: 'button', 'data-bid': '' });
  const callBtn = h('button', { class: 'mw-btn', type: 'button', 'data-call': '' }, 'Call bluff');
  const nextBtn = h('button', { class: 'mw-btn primary', type: 'button', 'data-next': '' }, 'Next round');
  const ctl = h('div', { class: 'bd-ctl mw-col', style: { width: '100%' } }, h('div', { class: 'bd-step' }, minus, cnt, plus), faces, h('div', { class: 'mw-row' }, bidBtn, callBtn));
  ctx.root.append(style, h('div', { class: 'bd' }, h('p', { class: 'bd-lbl' }, 'Rival'), rivEl, bidEl, hint, ctl, nextBtn, h('p', { class: 'bd-lbl' }, 'Your dice (only you can see these)'), myEl));
  bidBtn.addEventListener('click', () => makeBid(sel.n, sel.f));
  callBtn.addEventListener('click', () => call('me'));
  nextBtn.addEventListener('click', () => next());

  const total = () => mine.length + riv.length;
  const beats = (n: number, f: number) => !bid || n > bid.n || (n === bid.n && f > bid.f);
  const countF = (f: number) => mine.filter((d) => d === f).length + riv.filter((d) => d === f).length;
  function minRaise(): { n: number; f: number } { return !bid ? { n: 1, f: 2 } : bid.f < 6 ? { n: bid.n, f: bid.f + 1 } : { n: bid.n + 1, f: 1 }; }
  function stepN(d: number): void { sel.n = Math.max(1, Math.min(total(), sel.n + d)); render(); }
  function render(): void {
    const reveal = phase === 'reveal', f = bid?.f;
    const die = (v: number, hide: boolean) => h('span', { class: 'bd-d' + (hide ? ' hid' : '') + (!hide && reveal && v === f ? ' hit' : ''), 'aria-label': hide ? 'Hidden die' : `Die showing ${v}` }, hide ? '?' : v);
    rivEl.replaceChildren(...riv.map((v) => die(v, !reveal)));
    myEl.replaceChildren(...mine.map((v) => die(v, false)));
    bidEl.textContent = msg || (bid ? `${bidder === 'me' ? 'You bid' : 'Rival bids'}: ${bid.n} × ${bid.f}${bidder === 'me' ? '' : '. Raise or call.'}` : phase === 'mine' ? 'You open the bidding.' : '');
    cnt.textContent = `${sel.n} ×`;
    faces.replaceChildren(...[1, 2, 3, 4, 5, 6].map((v) => h('button', { class: 'bd-f' + (sel.f === v ? ' sel' : ''), type: 'button', 'aria-label': `Face ${v}`, onclick: () => { sel.f = v; render(); } }, v)));
    const ok = phase === 'mine' && beats(sel.n, sel.f) && sel.n <= total();
    (bidBtn as HTMLButtonElement).disabled = !ok; bidBtn.textContent = `Bid ${sel.n} × ${sel.f}`;
    (callBtn as HTMLButtonElement).disabled = phase !== 'mine' || !bid || bidder !== 'rival';
    ctl.style.display = phase === 'reveal' ? 'none' : ''; nextBtn.style.display = phase === 'reveal' ? '' : 'none';
    const mineF = mine.filter((d) => d === sel.f).length;
    hint.textContent = phase === 'mine' ? `Table holds ${total()} dice. You have ${mineF} of face ${sel.f}; expect about ${(mineF + riv.length / 6).toFixed(1)} on the table.` : '';
    ctx.hud('Your dice', mine.length); ctx.hud('Rival dice', riv.length); ctx.hud('Rounds', rounds);
  }
  function roll(): void {
    mine = Array.from({ length: mine.length }, () => 1 + Math.floor(rand() * 6)); riv = Array.from({ length: riv.length }, () => 1 + Math.floor(rand() * 6));
    bid = null; msg = ''; rounds++;
    if (starter === 'me') { phase = 'mine'; sel = { n: 1, f: 2 }; } else { phase = 'rival'; ctx.after(800, rivalTurn); }
    render();
  }
  /** Player/rival action: place a bid. */
  function makeBid(n: number, f: number, who: 'me' | 'rival' = 'me'): void {
    if (ctx.finished || phase !== (who === 'me' ? 'mine' : 'rival') || n > total() || !beats(n, f)) return;
    bid = { n, f }; bidder = who; ctx.sfx('tap');
    if (who === 'me') { phase = 'rival'; msg = `You bid ${n} × ${f}. Rival thinks…`; ctx.after(800, rivalTurn); }
    else { phase = 'mine'; msg = ''; const m = minRaise(); sel = { n: Math.min(total(), m.n), f: m.f }; }
    render();
  }
  function call(who: 'me' | 'rival'): void {
    if (ctx.finished || !bid || phase !== (who === 'me' ? 'mine' : 'rival')) return;
    const real = countF(bid.f), good = real >= bid.n, caller = who;
    const lose: 'me' | 'rival' = good ? caller : bidder; loser = lose;
    if (lose === 'me') mine.pop(); else riv.pop();
    if (lose === 'rival' && who === 'me') wonCalls++;
    starter = lose; phase = 'reveal';
    msg = `${caller === 'me' ? 'You call' : 'Rival calls'}. Table holds ${real} × ${bid.f}, bid was ${bid.n}: ${good ? 'the bid stands' : 'a bluff'}. ${lose === 'me' ? 'You lose a die.' : 'Rival loses a die.'}`;
    ctx.sfx(lose === 'me' ? 'bad' : 'good'); render();
  }
  function next(): void {
    if (ctx.finished || phase !== 'reveal') return;
    if (!mine.length || !riv.length) {
      const win = mine.length > 0;
      ctx.finish({ result: win ? 'win' : 'lose', score: win ? 400 + mine.length * 200 + wonCalls * 50 : wonCalls * 50, title: win ? 'Nerve of steel' : 'Called out', detail: win ? `Rival is out of dice. You kept ${mine.length}.` : `You lost all your dice after ${rounds} rounds.` });
      return;
    }
    roll();
  }
  const tail = (k: number, m: number) => { if (k <= 0) return 1; if (k > m) return 0; let p = 0; for (let i = k; i <= m; i++) { let c = 1; for (let j = 0; j < i; j++) c = (c * (m - j)) / (j + 1); p += c * (1 / 6) ** i * (5 / 6) ** (m - i); } return p; };
  function rivalTurn(): void {
    if (ctx.finished || phase !== 'rival') return;
    const own = (f: number) => riv.filter((d) => d === f).length, m = mine.length, T = total();
    if (!bid) {
      let f = 1 + Math.floor(rand() * 6); for (let v = 1; v <= 6; v++) if (own(v) > own(f)) f = v;
      makeBid(Math.max(1, own(f) + (rand() < 0.3 ? 1 : 0)), f, 'rival'); return;
    }
    const p = tail(bid.n - own(bid.f), m);
    if (p < 0.28 + rand() * 0.1) { call('rival'); return; }
    let best: { n: number; f: number } | null = null, bp = -1;
    for (let n = bid.n; n <= Math.min(T, bid.n + 1); n++) for (let f = 1; f <= 6; f++) {
      if (!beats(n, f)) continue;
      const q = tail(n - own(f), m) + rand() * 0.08 - (n - bid.n) * 0.02;
      if (q > bp) { bp = q; best = { n, f }; }
    }
    if (!best || bp < 0.14) { call('rival'); return; }
    makeBid(best.n, best.f, 'rival');
  }

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); mine = Array(START).fill(0); riv = Array(START).fill(0); starter = 'me'; rounds = 0; wonCalls = 0; loser = ''; roll(); },
    probe: () => ({ mine: mine.join(''), riv: riv.length, bid, phase, rounds, loser }),
    play(kind: Result) {
      for (let guard = 0; guard < 600 && !ctx.finished; guard++) {
        if (phase === 'reveal') next();
        else if (phase === 'rival') rivalTurn();
        else if (kind === 'lose') { if (!bid || bid.n < total()) makeBid(total(), 6); else call('me'); }
        else {
          const real = bid ? countF(bid.f) : 0;
          if (bid && real < bid.n) call('me');
          else {
            let done = false;
            for (let n = bid ? bid.n : 1; n <= total() && !done; n++) for (let f = 1; f <= 6 && !done; f++) if (beats(n, f) && countF(f) >= n) { makeBid(n, f); done = true; }
            if (!done) call('me');
          }
        }
      }
    },
  };
}
