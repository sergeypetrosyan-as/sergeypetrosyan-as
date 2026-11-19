import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Plank Bridge: plant pillars under a span. A wagon of weight W snaps any plank gap longer than floor(20 / W). Fewer pillars than you would like; rock marks forbid some spots. */
const STR = 20, STRIKES = 3;
const LEVELS = [{ L: 12, W: 4, bad: 0, extra: 1 }, { L: 14, W: 5, bad: 2, extra: 1 }, { L: 16, W: 6, bad: 3, extra: 0 }, { L: 18, W: 5, bad: 4, extra: 0 }];
const X0 = 40, X1 = 440, BY = 190, GY = 330;

export default function plankBridge(ctx: Ctx): Instance {
  const cv = ctx.canvas(480, 420);
  const g = cv.g, C = ctx.c;
  let rand = makeRng(1);
  let lvl = 0, L = 12, W = 4, maxGap = 5, budget = 3, strikes = 0, score = 0, cursor = 1, pos = 0, fall = 0, msg = '';
  let pil = new Set<number>(), bad = new Set<number>(), phase: 'build' | 'cross' | 'fall' = 'build', best: number[] = [], brokeAt = -1;

  const ux = (u: number) => X0 + (u / L) * (X1 - X0);
  const supports = () => [0, ...[...pil].sort((a, b) => a - b), L];
  /** Solve the level: minimum pillars so every gap <= maxGap, avoiding rock marks. */
  function solve(): number[] | null {
    const dp = Array(L + 1).fill(1e9), from = Array(L + 1).fill(-1); dp[0] = 0;
    for (let i = 1; i <= L; i++) { if (i < L && bad.has(i)) continue; for (let j = Math.max(0, i - maxGap); j < i; j++) if (dp[j] + (i < L ? 1 : 0) < dp[i]) { dp[i] = dp[j] + (i < L ? 1 : 0); from[i] = j; } }
    if (dp[L] >= 1e9) return null;
    const out: number[] = []; for (let i = from[L]; i > 0; i = from[i]) out.push(i); return out;
  }
  function build(): void {
    ({ L, W } = LEVELS[lvl]); maxGap = Math.floor(STR / W);
    do { bad = new Set(); for (let k = 0; k < LEVELS[lvl].bad; k++) bad.add(rint(rand, 1, L - 1)); best = solve() as number[]; } while (!best);
    budget = best.length + LEVELS[lvl].extra; pil = new Set(); phase = 'build'; pos = 0; fall = 0; brokeAt = -1;
    cursor = [...Array(L - 1).keys()].map((i) => i + 1).find((i) => !bad.has(i)) ?? 1;
    msg = `Gap limit ${maxGap}: no plank run may be longer.`;
  }
  const gaps = () => { const s = supports(); return s.slice(1).map((v, i) => ({ a: s[i], b: v, ok: v - s[i] <= maxGap })); };
  function hud(): void { ctx.hud('Span', `${lvl + 1}/${LEVELS.length}`); ctx.hud('Pillars', `${pil.size}/${budget}`); ctx.hud('Collapses', `${strikes}/${STRIKES}`); ctx.hud('Score', score); }
  /** Place or lift a pillar at slot u. */
  function toggle(u: number): void {
    if (ctx.finished || phase !== 'build' || u < 1 || u >= L) return;
    cursor = u;
    if (pil.has(u)) { pil.delete(u); ctx.sfx('tap'); }
    else if (bad.has(u)) { msg = 'Solid rock marks that spot: no pillar fits.'; ctx.sfx('bad'); }
    else if (pil.size >= budget) { msg = `Only ${budget} pillars available. Lift one first.`; ctx.sfx('bad'); }
    else { pil.add(u); ctx.sfx('good'); msg = ''; }
    hud();
  }
  function send(): void { if (ctx.finished || phase !== 'build') return; phase = 'cross'; pos = 0; msg = 'The wagon rolls...'; ctx.sfx('tick'); }
  function update(dt: number): void {
    if (ctx.finished) return;
    if (phase === 'cross') {
      pos += dt * 3.2;
      const broke = gaps().find((s) => !s.ok && pos >= (s.a + s.b) / 2);
      if (broke) { phase = 'fall'; fall = 0; brokeAt = (broke.a + broke.b) / 2; strikes++; ctx.sfx('bad'); msg = `Snap! A run of ${broke.b - broke.a} exceeds the limit ${maxGap}.`; hud(); }
      else if (pos >= L) {
        score += (lvl + 1) * 100 + (budget - pil.size) * 20; ctx.sfx('good');
        if (lvl + 1 >= LEVELS.length) { hud(); ctx.finish({ result: 'win', score, title: 'Every span crossed', detail: `Four bridges held with ${strikes} collapse${strikes === 1 ? '' : 's'}.` }); return; }
        lvl++; build(); msg = 'Crossed! A wider span with a heavier load.'; hud();
      }
    } else if (phase === 'fall') {
      fall += dt;
      if (fall > 1.3) {
        if (strikes >= STRIKES) { ctx.finish({ result: 'lose', score, title: 'The gorge wins', detail: `Three collapses on span ${lvl + 1}.` }); return; }
        phase = 'build'; pos = 0; brokeAt = -1;
      }
    }
  }
  function draw(): void {
    g.fillStyle = C.bg; g.fillRect(0, 0, 480, 420);
    g.fillStyle = C.mesa; g.fillRect(0, BY, X0, 230); g.fillRect(X1, BY, 40, 230);
    g.fillStyle = C.umber; g.fillRect(X0, GY, X1 - X0, 90);
    g.strokeStyle = C.dusk; g.lineWidth = 2; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(X0, GY + 16 + i * 18); for (let x = X0; x <= X1; x += 16) g.lineTo(x + 8, GY + 16 + i * 18 + (x % 32 ? -3 : 3)); g.stroke(); }
    // slots
    for (let u = 1; u < L; u++) {
      const x = ux(u);
      if (bad.has(u)) { g.fillStyle = C.ash; g.beginPath(); g.moveTo(x - 9, GY); g.lineTo(x, GY - 14); g.lineTo(x + 9, GY); g.fill(); g.fillStyle = C.red; g.font = '700 14px "Zilla Slab", serif'; g.textAlign = 'center'; g.fillText('✕', x, GY + 16); }
      else if (!pil.has(u)) { g.strokeStyle = u === cursor && phase === 'build' ? C.bone : C.quiet; g.lineWidth = u === cursor ? 3 : 1.5; g.setLineDash([3, 4]); g.beginPath(); g.moveTo(x, BY + 8); g.lineTo(x, GY); g.stroke(); g.setLineDash([]); g.beginPath(); g.arc(x, GY - 4, 6, 0, 6.3); g.stroke(); }
    }
    for (const u of pil) { const x = ux(u); g.fillStyle = C.saddle; g.strokeStyle = C.ink; g.lineWidth = 2; g.fillRect(x - 6, BY + 6, 12, GY - BY - 6); g.strokeRect(x - 6, BY + 6, 12, GY - BY - 6); }
    // planks as stress segments (motif: gap length vs limit)
    g.font = '700 14px "Zilla Slab", serif'; g.textAlign = 'center';
    for (const s of gaps()) {
      const a = ux(s.a), b = ux(s.b), mid = (a + b) / 2, snapped = phase === 'fall' && brokeAt === (s.a + s.b) / 2;
      const drop = snapped ? Math.min(1, fall * 2) * 70 : 0;
      g.fillStyle = s.ok ? C.tan : C.red; g.strokeStyle = C.ink; g.lineWidth = 2;
      if (snapped) { g.fillRect(a, BY, (b - a) / 2 - 4, 12); g.save(); g.translate(mid, BY + drop); g.rotate(0.5); g.fillRect(0, 0, (b - a) / 2, 12); g.restore(); } else { g.fillRect(a, BY, b - a, 12); g.strokeRect(a, BY, b - a, 12); }
      g.fillStyle = s.ok ? C.bone : C.rose; g.fillText(`${s.ok ? '✓' : '✕'} ${s.b - s.a}/${maxGap}`, mid, BY - 36);
      g.strokeStyle = s.ok ? C.bone : C.red; g.lineWidth = 2; g.beginPath(); g.moveTo(a + 2, BY - 22); g.lineTo(b - 2, BY - 22); g.stroke();
    }
    // wagon
    if (phase !== 'build') {
      const x = ux(Math.min(pos, L)), over = phase === 'fall' ? Math.min(1, fall * 1.5) * 150 : 0;
      g.save(); g.translate(x, BY - 8 + over); if (over) g.rotate(over / 90);
      g.fillStyle = C.player; g.strokeStyle = C.ink; g.lineWidth = 2; g.fillRect(-20, -22, 40, 18); g.strokeRect(-20, -22, 40, 18);
      g.fillStyle = C.ink; g.font = '700 12px "Zilla Slab", serif'; g.fillText(`${W}t`, 0, -9);
      g.beginPath(); g.arc(-12, -2, 5, 0, 6.3); g.arc(12, -2, 5, 0, 6.3); g.fill(); g.restore();
    }
    g.fillStyle = C.bone; g.font = '700 16px "Zilla Slab", serif'; g.textAlign = 'left'; g.fillText(`Wagon load ${W} t`, 14, 28);
    g.textAlign = 'center'; g.fillStyle = C.ash; g.font = '600 15px "Public Sans", sans-serif'; g.fillText(msg, 240, 392); g.textAlign = 'left';
  }
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { const p = cv.pt(e); if (p.y < BY - 10) return; const u = Math.round(((p.x - X0) / (X1 - X0)) * L); toggle(u); });
  const move = (d: number) => (down: boolean) => { if (down && phase === 'build') cursor = Math.max(1, Math.min(L - 1, cursor + d)); };
  ctx.keys({ ArrowLeft: move(-1), ArrowRight: move(1), ' ': (d) => d && toggle(cursor), Enter: (d) => d && send() });
  ctx.pad([{ key: 'ArrowLeft', label: '◀' }, { key: ' ', label: 'Pillar' }, { key: 'ArrowRight', label: '▶' }, { key: 'Enter', label: 'Send the wagon', wide: true }]);
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); lvl = 0; strikes = 0; score = 0; build(); hud(); },
    probe: () => ({ lvl, pil: [...pil].sort((a, b) => a - b).join(','), phase, strikes, cursor }),
    play(kind: Result) {
      for (let guard = 0; guard < 3000 && !ctx.finished; guard++) {
        if (phase === 'build') {
          if (kind === 'win') { [...pil].forEach(toggle); best.forEach(toggle); }
          send();
        }
        update(1 / 60);
      }
    },
  };
}
