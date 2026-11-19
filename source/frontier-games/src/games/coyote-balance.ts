import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Coyote Balance: set a coyote bounty each season. Predator-prey populations cycle and drift; keep both herds alive for five years. */
const SEASONS = 20, SEASON_NAMES = ['Spring', 'Summer', 'Autumn', 'Winter'];
const HUNT = [-0.1, 0, 0.15, 0.35];
const BOUNTY = [{ n: 'Protect', d: 'Feed coyotes (+10%)' }, { n: 'None', d: 'Leave them be' }, { n: 'Low bounty', d: 'Hunt about 15%' }, { n: 'High bounty', d: 'Hunt about 35%' }];
const G = 0.5, K = 2800, B = 0.0015, E = 0.7, D = 0.2;
const EQR = D / (E * B), EQC = (G * (1 - EQR / K)) / B;
const LOW = 80, HIGH = 1200, YMAX = 1280;

type Pop = [number, number];
const grow = ([r, c]: Pop, b: number, g: number): Pop => [Math.round(Math.max(0, r + g * r * (1 - r / K) - B * r * c)), Math.round(Math.max(0, c + E * B * r * c - D * c - HUNT[b] * c))];
const dead = ([r, c]: Pop): boolean => r < LOW || c < LOW || r > HIGH || c > HIGH;
const dev = ([r, c]: Pop): number => Math.max(Math.abs(Math.log(Math.max(r, 1) / EQR)), Math.abs(Math.log(Math.max(c, 1) / EQC)));
/** Look three seasons ahead and keep the worst imbalance as small as possible (used by the test bot and to vet each start). */
function advise(p: Pop): number {
  const rec = (q: Pop, d: number, worst: number): number => { if (!d) return worst; let m = 1e9; for (let b = 0; b < 4; b++) { const n = grow(q, b, G); m = Math.min(m, rec(n, d - 1, Math.max(worst, dev(n)))); } return m; };
  let best = 1, bv = 1e9;
  for (let b = 0; b < 4; b++) { const n = grow(p, b, G); const v = rec(n, 2, dev(n)); if (v < bv - 1e-9) { bv = v; best = b; } }
  return best;
}

export default function coyoteBalance(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let s = 0, pick = 1, score = 0, msg = '';
  let hist: Pop[] = [], noise: number[] = [];

  const chart = h('div', { class: 'cb-chart', role: 'img', 'aria-label': 'Population chart over five years' });
  const btns = BOUNTY.map((b, i) => h('button', { class: 'cb-b', type: 'button', 'data-b': i, onclick: () => choose(i) }, h('b', null, b.n), h('span', null, b.d)));
  const go = h('button', { class: 'mw-btn primary', type: 'button', 'data-next': '', style: { width: '100%', minHeight: '48px' }, onclick: () => advance() }, 'Next season');
  const note = h('p', { class: 'mw-note', role: 'status', style: { minHeight: '2.8em', margin: 0 } });
  const style = h('style', null, `
    .cb{width:100%;max-width:460px;display:flex;flex-direction:column;gap:8px}
    .cb-chart{border:2px solid var(--mw-ember);border-radius:10px;background:var(--mw-ink);padding:4px}
    .cb-chart svg{display:block;width:100%;height:auto}
    .cb-lg{display:flex;gap:16px;justify-content:center;font:600 .85rem var(--mw-font-slab);color:var(--mw-bone)}
    .cb-bs{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
    .cb-b{min-height:62px;padding:4px;border-radius:8px;border:2px solid var(--mw-ember);background:var(--mw-dusk);color:var(--mw-bone);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
    .cb-b b{font:700 .82rem var(--mw-font-slab)}.cb-b span{font:500 .66rem/1.1 var(--mw-font-body);color:var(--mw-ash);text-align:center}
    .cb-b.on{background:var(--mw-tan);border-color:var(--mw-bone);color:var(--mw-ink)}.cb-b.on span{color:var(--mw-ink)}
  `);
  ctx.root.append(style, h('div', { class: 'cb' }, chart, h('div', { class: 'cb-lg', 'aria-hidden': 'true' }, h('span', null, '● Rabbits'), h('span', null, '▲ Coyotes')), h('div', { class: 'cb-bs', role: 'radiogroup', 'aria-label': 'Bounty' }, btns), go, note));

  const cur = (): Pop => hist[hist.length - 1];
  function draw(): void {
    const W = 300, H = 150, L = 6, R = 294, T = 6, Bt = 132;
    const x = (i: number) => L + ((R - L) * i) / SEASONS, y = (v: number) => Bt - ((Bt - T) * Math.min(v, YMAX)) / YMAX;
    const line = (k: 0 | 1) => hist.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p[k]).toFixed(1)}`).join('');
    let sv = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true"><rect x="${L}" y="${y(LOW)}" width="${R - L}" height="${Bt - y(LOW)}" fill="var(--mw-wine)" opacity=".7"/><text x="${R - 4}" y="${y(LOW) + 10}" text-anchor="end" font-size="8" fill="var(--mw-bone)" font-family="var(--mw-font-slab)">dies out</text>`;
    sv += `<line x1="${L}" x2="${R}" y1="${y(HIGH)}" y2="${y(HIGH)}" stroke="var(--mw-red)" stroke-dasharray="3 3"/><text x="${R - 4}" y="${y(HIGH) + 10}" text-anchor="end" font-size="8" fill="var(--mw-bone)" font-family="var(--mw-font-slab)">overrun</text>`;
    for (let yr = 0; yr <= 5; yr++) sv += `<line x1="${x(yr * 4)}" x2="${x(yr * 4)}" y1="${T}" y2="${Bt}" stroke="var(--mw-umber)"/><text x="${x(yr * 4)}" y="${H - 6}" text-anchor="middle" font-size="8" fill="var(--mw-ash)" font-family="var(--mw-font-slab)">${yr ? 'Y' + yr : ''}</text>`;
    sv += `<path d="${line(0)}" fill="none" stroke="var(--mw-rose)" stroke-width="2.4"/><path d="${line(1)}" fill="none" stroke="var(--mw-bone)" stroke-width="2.2" stroke-dasharray="5 3"/>`;
    hist.forEach((p, i) => { sv += `<circle cx="${x(i)}" cy="${y(p[0])}" r="3" fill="var(--mw-rose)" stroke="var(--mw-ink)"/><polygon points="${x(i)},${y(p[1]) - 4} ${x(i) + 3.8},${y(p[1]) + 3} ${x(i) - 3.8},${y(p[1]) + 3}" fill="var(--mw-bone)" stroke="var(--mw-ink)"/>`; });
    chart.innerHTML = sv + '</svg>';
  }
  function render(): void {
    draw();
    btns.forEach((b, i) => { b.classList.toggle('on', i === pick); b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', String(i === pick)); });
    const [r, c] = cur();
    const warn = r < 180 ? ' Rabbits are getting scarce!' : c < 180 ? ' Coyotes are getting scarce!' : r > 960 ? ' Rabbits are swarming!' : c > 960 ? ' Coyotes are swarming!' : '';
    note.textContent = msg + warn;
    ctx.hud('Year', `${Math.min(5, Math.floor(s / 4) + 1)}/5 ${SEASON_NAMES[s % 4]}`); ctx.hud('Rabbits', r); ctx.hud('Coyotes', c); ctx.hud('Score', score);
  }
  function choose(i: number): void { if (ctx.finished) return; pick = i; ctx.sfx('tap'); render(); }
  /** The one scoring action: let the season pass with the chosen bounty. */
  function advance(): void {
    if (ctx.finished) return;
    const next = grow(cur(), pick, G * (1 + noise[s]));
    hist.push(next); s++; score += 30;
    const [r, c] = next;
    if (dead(next)) {
      draw(); render(); ctx.sfx('lose');
      const why = r < LOW ? 'The rabbits died out and the coyotes starved.' : c < LOW ? 'The coyotes were wiped out and the rabbits ate the range bare.' : r > HIGH ? 'Rabbits overran the range.' : 'Coyotes overran the range.';
      ctx.finish({ result: 'lose', score, title: 'The balance broke', detail: `${why} You held out ${s} seasons.` }); return;
    }
    if (s >= SEASONS) { score += 200; render(); ctx.finish({ result: 'win', score, title: 'Five balanced years', detail: `Both herds are alive: ${r} rabbits and ${c} coyotes.` }); return; }
    ctx.sfx('good'); msg = `${SEASON_NAMES[(s + 3) % 4]} passed.`; render();
  }
  ctx.keys({ ArrowLeft: (d) => d && choose(Math.max(0, pick - 1)), ArrowRight: (d) => d && choose(Math.min(3, pick + 1)), Enter: (d) => d && advance() });

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); s = 0; pick = 1; score = 0;
      for (let t = 0; t < 60; t++) {
        noise = Array.from({ length: SEASONS }, () => (rand() - 0.5) * 0.3);
        let p: Pop = [Math.round(EQR * (0.55 + rand() * 0.25)), Math.round(EQC * (1.3 + rand() * 0.4))];
        hist = [p];
        let ok = true;
        for (let i = 0; i < SEASONS && ok; i++) { p = grow(p, advise(p), G * (1 + noise[i])); ok = !dead(p); }
        if (ok) break;
      }
      msg = 'Coyotes eat rabbits; rabbits feed coyotes. Pick a bounty, then pass the season.';
      render();
    },
    probe: () => ({ s, pick, pop: cur(), score }),
    play(kind: Result) {
      for (let g = 0; g < 40 && !ctx.finished; g++) { choose(kind === 'win' ? advise(cur()) : 3); advance(); }
    },
  };
}
