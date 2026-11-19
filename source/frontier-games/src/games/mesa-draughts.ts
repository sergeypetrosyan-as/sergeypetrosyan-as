import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Mesa Draughts: 6x6 checkers with forced captures against three rivals of rising skill. Beat all three. */
const N = 6, FOES = [{ name: 'Tin Sheriff', depth: 0 }, { name: 'Dusty Gambler', depth: 2 }, { name: 'Black Hat', depth: 4 }];
interface Mv { fr: number; fc: number; tr: number; tc: number; cap: [number, number] | null }
interface St { b: number[][]; turn: 1 | -1; chain: [number, number] | null }
const DR = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const dark = (r: number, c: number) => (r + c) % 2 === 1;

function jumpsOf(s: St, r: number, c: number): Mv[] {
  const v = s.b[r][c], out: Mv[] = [];
  for (const [dr, dc] of DR) {
    if (Math.abs(v) === 1 && dr !== -v) continue; // men go one way: player up (-1), rival down (+1)
    const mr = r + dr, mc = c + dc, tr = r + 2 * dr, tc = c + 2 * dc;
    if (tr < 0 || tc < 0 || tr >= N || tc >= N) continue;
    if (s.b[mr][mc] * v < 0 && s.b[tr][tc] === 0) out.push({ fr: r, fc: c, tr, tc, cap: [mr, mc] });
  }
  return out;
}
function genMoves(s: St): Mv[] {
  const jumps: Mv[] = [], steps: Mv[] = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const v = s.b[r][c];
    if (v * s.turn <= 0) continue;
    if (s.chain && (s.chain[0] !== r || s.chain[1] !== c)) continue;
    jumps.push(...jumpsOf(s, r, c));
    if (s.chain) continue;
    for (const [dr, dc] of DR) {
      if (Math.abs(v) === 1 && dr !== -v) continue;
      const tr = r + dr, tc = c + dc;
      if (tr >= 0 && tc >= 0 && tr < N && tc < N && s.b[tr][tc] === 0) steps.push({ fr: r, fc: c, tr, tc, cap: null });
    }
  }
  return jumps.length ? jumps : steps;
}
function apply(s: St, m: Mv): St {
  const b = s.b.map((r) => r.slice()); let v = b[m.fr][m.fc]; b[m.fr][m.fc] = 0;
  if (m.cap) b[m.cap[0]][m.cap[1]] = 0;
  let crowned = false;
  if (Math.abs(v) === 1 && (m.tr === 0 || m.tr === N - 1)) { v *= 2; crowned = true; }
  b[m.tr][m.tc] = v;
  const n: St = { b, turn: s.turn, chain: null };
  if (m.cap && !crowned && jumpsOf(n, m.tr, m.tc).length) n.chain = [m.tr, m.tc]; else n.turn = (-s.turn) as 1 | -1;
  return n;
}
const evalFor = (s: St, me: number) => s.b.reduce((a, row, r) => a + row.reduce((x, v) => x + (v ? Math.sign(v) * me * ((Math.abs(v) === 2 ? 1.7 : 1) + (Math.abs(v) === 1 ? (v > 0 ? N - 1 - r : r) * 0.04 : 0)) : 0), 0), 0);
function search(s: St, d: number, a: number, b: number, me: number): number {
  const mv = genMoves(s);
  if (!mv.length) return s.turn === me ? -99 - d : 99 + d;
  if (d <= 0) return evalFor(s, me);
  if (s.turn === me) { let best = -1e9; for (const m of mv) { best = Math.max(best, search(apply(s, m), d - 1, a, b, me)); a = Math.max(a, best); if (a >= b) break; } return best; }
  let best = 1e9; for (const m of mv) { best = Math.min(best, search(apply(s, m), d - 1, a, b, me)); b = Math.min(b, best); if (a >= b) break; } return best;
}

export default function mesaDraughts(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let st: St = { b: [], turn: 1, chain: null }, bout = 0, sel: [number, number] | null = null, last: Mv | null = null, quiet = 0, score = 0, msg = '';

  const style = h('style', null, `
    .md{width:100%;max-width:400px;display:flex;flex-direction:column;gap:8px;align-items:center}
    .md-foes{display:flex;gap:6px;justify-content:center;font:600 .85rem var(--mw-font-slab);color:var(--mw-ash)}
    .md-foes span{padding:3px 8px;border-radius:999px;border:2px solid var(--mw-mesa)}
    .md-foes .on{color:var(--mw-bone);border-color:var(--mw-rose);background:var(--mw-wine)}
    .md-foes .won{color:var(--mw-ink);background:var(--mw-rose);border-color:var(--mw-bone)}
    .md-b{width:100%;padding:6px;border:3px solid var(--mw-saddle);border-radius:10px;background:var(--mw-umber);gap:3px}
    .md-b .mw-cell{border-radius:4px;cursor:default;font-size:1.5rem}
    .md-b .lt{background:var(--mw-tan);border-color:var(--mw-tan);opacity:.55}
    .md-b .dk{background:var(--mw-night);cursor:pointer}
    .md-b .sel{outline:3px solid var(--mw-bone);outline-offset:-3px}
    .md-b .dest{outline:3px dashed var(--mw-rose);outline-offset:-4px;background:var(--mw-wine)}
    .md-b .last{box-shadow:inset 0 0 0 3px var(--mw-ember)}
    .md-p{width:78%;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;font:700 1.1rem var(--mw-font-slab);border:3px solid var(--mw-ink)}
    .md-p.me{background:var(--mw-bone);color:var(--mw-ink)}
    .md-p.foe{background:var(--mw-red);color:var(--mw-white);border-color:var(--mw-rose)}
  `);
  const foes = h('div', { class: 'md-foes' });
  const grid = h('div', { class: 'mw-grid md-b', role: 'grid', 'aria-label': 'Draughts board' });
  const note = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(style, h('div', { class: 'md' }, foes, grid, note));
  grid.style.gridTemplateColumns = `repeat(${N},1fr)`;

  const setup = (): St => ({ b: Array.from({ length: N }, (_, r) => Array.from({ length: N }, (_, c) => (dark(r, c) ? (r < 2 ? -1 : r > 3 ? 1 : 0) : 0))), turn: 1, chain: null });
  const count = (sign: number) => st.b.flat().filter((v) => v * sign > 0).length;
  const legal = () => (st.turn === 1 ? genMoves(st) : []);
  function render(): void {
    const mv = legal(), dests = sel ? mv.filter((m) => m.fr === sel![0] && m.fc === sel![1]) : [];
    grid.replaceChildren(...st.b.flatMap((row, r) => row.map((v, c) => {
      const isD = dests.some((m) => m.tr === r && m.tc === c), can = mv.some((m) => m.fr === r && m.fc === c);
      const cell = h('div', { class: 'mw-cell ' + (dark(r, c) ? 'dk' : 'lt') + (sel && sel[0] === r && sel[1] === c ? ' sel' : '') + (isD ? ' dest' : '') + (last && ((last.fr === r && last.fc === c) || (last.tr === r && last.tc === c)) ? ' last' : ''), 'data-r': r, 'data-c': c, role: 'gridcell', 'aria-label': `${v > 0 ? 'Your' : v < 0 ? 'Rival' : 'Empty'} ${Math.abs(v) === 2 ? 'king' : v ? 'man' : 'square'} row ${r + 1} column ${c + 1}${can ? ', can move' : ''}${isD ? ', move here' : ''}` },
        v ? h('span', { class: 'md-p ' + (v > 0 ? 'me' : 'foe') }, (v > 0 ? '▲' : '✕') + (Math.abs(v) === 2 ? 'K' : '')) : null);
      if (dark(r, c)) cell.addEventListener('click', () => tap(r, c));
      return cell;
    })));
    foes.replaceChildren(...FOES.map((f, i) => h('span', { class: i < bout ? 'won' : i === bout ? 'on' : '' }, (i < bout ? '★ ' : '') + f.name)));
    note.textContent = msg || (st.turn === 1 ? (st.chain ? 'Keep jumping with the same piece.' : mv[0]?.cap ? 'You must capture.' : 'Your move: tap a ▲ piece, then a highlighted square.') : 'Rival is thinking...');
    ctx.hud('Rival', `${bout + 1}/${FOES.length}`); ctx.hud('You', count(1)); ctx.hud('Rival pieces', count(-1)); ctx.hud('Score', score);
  }
  function over(win: boolean, why: string): void {
    if (win) {
      score += 200 + count(1) * 25; ctx.sfx('good');
      if (bout + 1 >= FOES.length) { render(); ctx.finish({ result: 'win', score, title: 'Mesa champion', detail: `All three rivals beaten. ${why}` }); return; }
      bout++; msg = `${FOES[bout - 1].name} falls. Next: ${FOES[bout].name}.`; newBout();
    } else ctx.finish({ result: 'lose', score, title: 'Rival holds the mesa', detail: `${FOES[bout].name} won. ${why}` });
  }
  function newBout(): void { st = setup(); sel = null; last = null; quiet = 0; render(); }
  /** After every step: end the bout if a side is out of pieces or moves, or hand over to the rival. */
  function after(): void {
    if (!genMoves(st).length) { render(); over(st.turn === -1, st.turn === -1 ? 'The rival has no moves left.' : 'You have no moves left.'); return; }
    if (quiet >= 36) { const a = count(1), b = count(-1); render(); over(a > b, a > b ? 'Ahead on pieces when play stalled.' : 'Play stalled with no lead.'); return; }
    render();
    if (st.turn === -1) ctx.after(550, aiStep);
  }
  function step(m: Mv): void {
    const was = st.turn; st = apply(st, m); last = m; sel = st.chain; quiet = m.cap ? 0 : quiet + (was === st.turn ? 0 : 1); msg = '';
    after();
  }
  /** The one player action: tap a piece to select, then a highlighted square to move. */
  function tap(r: number, c: number): void {
    if (ctx.finished || st.turn !== 1) return;
    const mv = legal(), pick = sel && mv.find((m) => m.fr === sel![0] && m.fc === sel![1] && m.tr === r && m.tc === c);
    if (pick) { ctx.sfx(pick.cap ? 'good' : 'tap'); step(pick); return; }
    if (st.chain) return;
    if (mv.some((m) => m.fr === r && m.fc === c)) { sel = [r, c]; ctx.sfx('tap'); } else { sel = null; if (st.b[r][c] > 0) { msg = mv[0]?.cap ? 'A capture is available, you must take it.' : 'That piece cannot move.'; ctx.sfx('bad'); } }
    render(); msg = '';
  }
  function aiStep(): void {
    if (ctx.finished || st.turn !== -1) return;
    const mv = genMoves(st), d = FOES[bout].depth;
    let best = mv[0], bs = -1e9;
    if (d === 0) best = mv[Math.floor(rand() * mv.length)];
    else for (const m of mv) { const sc = search(apply(st, m), d - 1, -1e9, 1e9, -1) + rand() * 0.05; if (sc > bs) { bs = sc; best = m; } }
    ctx.sfx(best.cap ? 'bad' : 'tick'); step(best);
  }
  ctx.loop(() => {}, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); bout = 0; score = 0; msg = ''; newBout(); },
    probe: () => ({ b: st.b.map((r) => r.join('')).join('/'), turn: st.turn, sel, bout }),
    play(kind: Result) {
      for (let guard = 0; guard < 4000 && !ctx.finished; guard++) {
        if (st.turn === -1) { aiStep(); continue; }
        const mv = genMoves(st);
        let best = mv[0], bs = -1e9;
        for (const m of mv) { const sc = kind === 'win' ? search(apply(st, m), 5, -1e9, 1e9, 1) + rand() * 0.02 : -search(apply(st, m), 3, -1e9, 1e9, 1) + rand() * 0.02; if (sc > bs) { bs = sc; best = m; } }
        tap(best.fr, best.fc); tap(best.tr, best.tc);
      }
    },
  };
}
