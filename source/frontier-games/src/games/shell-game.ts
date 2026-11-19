import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Shell Game: watch the nugget cup through a shuffle that speeds up, then pick it. Six rounds, two misses allowed. */
const ROUNDS = 6, MISSES = 2;
const CUPS = [3, 3, 3, 4, 4, 5], SWAPS = [4, 6, 8, 8, 10, 12], DUR = [0.5, 0.42, 0.36, 0.32, 0.27, 0.22];
type Phase = 'show' | 'shuffle' | 'pick' | 'reveal';

export default function shellGame(ctx: Ctx): Instance {
  const cv = ctx.canvas(480, 420);
  const g = cv.g, C = ctx.c;
  let rand = makeRng(1);
  let round = 0, misses = 0, score = 0, phase: Phase = 'show', t = 0, n = 3, nugget = 0, chosen = -1, won = false;
  let order: number[] = [];                                  // order[slot] = cup id
  let queue: [number, number][] = [], cur: [number, number] | null = null;
  let msg = '';

  const slotX = (s: number) => 240 + (s - (n - 1) / 2) * Math.min(130, 400 / n);
  const slotOf = (id: number) => order.indexOf(id);
  function hud(): void { ctx.hud('Round', `${Math.min(round + 1, ROUNDS)}/${ROUNDS}`); ctx.hud('Misses', `${misses}/${MISSES}`); ctx.hud('Score', score); }
  function begin(): void {
    n = CUPS[round]; order = Array.from({ length: n }, (_, i) => i); nugget = rint(rand, 0, n - 1); chosen = -1;
    queue = []; let last = -1;
    for (let k = 0; k < SWAPS[round]; k++) { let a = rint(rand, 0, n - 1), b = rint(rand, 0, n - 1); while (b === a || (a * 10 + b === last)) { a = rint(rand, 0, n - 1); b = rint(rand, 0, n - 1); } queue.push([a, b]); last = a * 10 + b; }
    phase = 'show'; t = 0; cur = null; msg = 'Memorise the nugget, then cover it.'; hud();
  }
  /** The one player action: choose the cup in slot s. */
  function pick(s: number): void {
    if (ctx.finished || phase !== 'pick' || s < 0 || s >= n) return;
    chosen = s; won = order[s] === nugget; phase = 'reveal'; t = 0;
    if (won) { score += 100 + round * 25; ctx.sfx('good'); msg = 'Found it!'; } else { misses++; ctx.sfx('bad'); msg = 'Empty. The nugget was under the other cup.'; }
    hud();
  }
  /** Cover the nugget and start the shuffle. */
  function start(): void { if (ctx.finished || phase !== 'show') return; phase = 'shuffle'; t = 0; cur = queue.shift() ?? null; msg = 'Follow it...'; ctx.sfx('tap'); }
  const prog = () => (cur ? Math.min(1, t / DUR[round]) : 0);
  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt;
    if (phase === 'shuffle') {
      if (cur && t >= DUR[round]) { const [a, b] = cur; [order[a], order[b]] = [order[b], order[a]]; cur = queue.shift() ?? null; t = 0; ctx.sfx('tick'); }
      if (!cur) { phase = 'pick'; t = 0; msg = 'Which cup hides the nugget?'; }
    } else if (phase === 'reveal' && t > 1.5) {
      if (misses >= MISSES) { ctx.finish({ result: 'lose', score, title: 'Out-hustled', detail: `Two wrong picks. You got through ${round + (won ? 1 : 0)} of ${ROUNDS} rounds.` }); return; }
      round++;
      if (round >= ROUNDS) { ctx.finish({ result: 'win', score, title: 'Eyes like a hawk', detail: `All six rounds with ${misses} miss${misses === 1 ? '' : 'es'}.` }); return; }
      begin();
    }
  }
  function cup(x: number, y: number, label: number, lift: number, hot: boolean): void {
    g.fillStyle = hot ? C.rose : C.tan; g.strokeStyle = C.ink; g.lineWidth = 3;
    g.beginPath(); g.moveTo(x - 30, y - 70 - lift); g.lineTo(x + 30, y - 70 - lift); g.lineTo(x + 46, y - lift); g.lineTo(x - 46, y - lift); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = C.saddle; g.fillRect(x - 44, y - 16 - lift, 88, 10);
    g.fillStyle = C.ink; g.font = '700 22px "Zilla Slab", serif'; g.textAlign = 'center'; g.fillText(String(label), x, y - 38 - lift);
  }
  function draw(): void {
    g.fillStyle = C.bg; g.fillRect(0, 0, 480, 420);
    // motif: round stars along the top, lit per round won
    g.strokeStyle = C.ash; g.setLineDash([2, 5]); g.lineWidth = 1.5; g.beginPath(); for (let i = 0; i < ROUNDS; i++) { const x = 60 + i * 72; i ? g.lineTo(x, 36) : g.moveTo(x, 36); } g.stroke(); g.setLineDash([]);
    for (let i = 0; i < ROUNDS; i++) { const x = 60 + i * 72; g.fillStyle = i < round || (i === round && phase === 'reveal' && won) ? C.collectible : C.night; g.strokeStyle = C.bone; g.lineWidth = 2; g.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + (k * Math.PI) / 5, r = k % 2 ? 6 : 13; g.lineTo(x + Math.cos(a) * r, 36 + Math.sin(a) * r); } g.closePath(); g.fill(); g.stroke(); }
    // table
    g.fillStyle = C.umber; g.fillRect(0, 262, 480, 158); g.fillStyle = C.saddle; g.fillRect(0, 262, 480, 8);
    const y = 250;
    // nugget on table while visible
    const showNug = phase === 'show' || phase === 'reveal';
    for (let id = 0; id < n; id++) {
      let s = slotOf(id), x = slotX(s), yy = y, hop = 0;
      if (cur && phase === 'shuffle') {
        const [a, b] = cur, p = prog(), e = p * p * (3 - 2 * p);
        if (s === a) { x = slotX(a) + (slotX(b) - slotX(a)) * e; hop = Math.sin(p * Math.PI) * 26; }
        else if (s === b) { x = slotX(b) + (slotX(a) - slotX(b)) * e; hop = -Math.sin(p * Math.PI) * 26; }
      }
      yy = y - hop;
      const isN = id === nugget;
      let lift = 0;
      if (showNug && ((phase === 'show' && isN) || (phase === 'reveal' && (isN || s === chosen)))) lift = phase === 'show' ? Math.min(1, t * 4) * 56 : 56;
      if (showNug && isN) { g.fillStyle = C.collectible; g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath(); g.arc(x, yy - 14, 17, 0, 6.3); g.fill(); g.stroke(); g.fillStyle = C.ink; g.font = '700 16px "Zilla Slab", serif'; g.textAlign = 'center'; g.fillText('★', x, yy - 8); }
      cup(x, yy, s + 1, lift, phase === 'reveal' && s === chosen);
      if (phase === 'reveal' && s === chosen) { g.fillStyle = won ? C.bone : C.red; g.font = '700 18px "Zilla Slab", serif'; g.textAlign = 'center'; g.fillText(won ? '✓ Found' : '✕ Empty', x, y + 40); }
    }
    g.fillStyle = C.bone; g.font = '700 20px "Zilla Slab", serif'; g.textAlign = 'center'; g.fillText(msg, 240, 336);
    g.fillStyle = C.ash; g.font = '600 14px "Public Sans", sans-serif'; g.fillText(phase === 'show' ? 'Tap anywhere or press Space to cover it' : phase === 'pick' ? 'Tap a cup, or press its number' : phase === 'shuffle' ? `Swaps left: ${queue.length + (cur ? 1 : 0)}` : '', 240, 366);
  }
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => {
    if (phase === 'show') { start(); return; }
    const p = cv.pt(e); if (p.y < 160 || p.y > 330) return;
    let best = -1, bd = 1e9; for (let s = 0; s < n; s++) { const d = Math.abs(p.x - slotX(s)); if (d < bd) { bd = d; best = s; } }
    if (bd < 60) pick(best);
  });
  ctx.pad([{ key: ' ', label: 'Cover the nugget', wide: true }]);
  ctx.keys({ ' ': (d) => d && start(), ...Object.fromEntries([1, 2, 3, 4, 5].map((k) => [String(k), (d: boolean) => d && pick(k - 1)])) });
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; misses = 0; score = 0; won = false; begin(); },
    probe: () => ({ round, phase, misses, score, chosen }),
    play(kind: Result) {
      for (let guard = 0; guard < 60 * 400 && !ctx.finished; guard++) {
        if (phase === 'show') start(); else if (phase === 'pick') pick(kind === 'win' ? slotOf(nugget) : (slotOf(nugget) + 1) % n);
        update(1 / 60);
      }
    },
  };
}
