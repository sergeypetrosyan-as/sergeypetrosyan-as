import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Spark Chain: drop ONE spark on a drifting field of powder kegs. Every keg it touches bursts and passes the fire on. Light enough kegs to clear each level. */
const LEVELS = [{ n: 10, target: 3 }, { n: 16, target: 6 }, { n: 22, target: 10 }, { n: 28, target: 15 }];
const X0 = 24, X1 = 456, Y0 = 84, Y1 = 616, KEG = 10, R_KEG = 50, R_SPARK = 64, EXP = 0.3, HOLD = 0.9, DEC = 0.3, LIFE = EXP + HOLD + DEC;
interface Dot { x: number; y: number; vx: number; vy: number; s: 0 | 1 | 2; age: number; R: number; spark?: boolean }
const radius = (d: Dot): number => (d.age < EXP ? d.R * (d.age / EXP) : d.age < EXP + HOLD ? d.R : d.R * Math.max(0, (LIFE - d.age) / DEC));

/** One fixed step of the world; used by the live game and by the bot's look-ahead so both agree. */
function stepWorld(w: Dot[], dt: number): boolean {
  let active = false;
  for (const d of w) {
    if (d.s === 0) {
      d.x += d.vx * dt; d.y += d.vy * dt;
      if (d.x < X0 + KEG || d.x > X1 - KEG) { d.vx = -d.vx; d.x = Math.max(X0 + KEG, Math.min(X1 - KEG, d.x)); }
      if (d.y < Y0 + KEG || d.y > Y1 - KEG) { d.vy = -d.vy; d.y = Math.max(Y0 + KEG, Math.min(Y1 - KEG, d.y)); }
    } else if (d.s === 1) { d.age += dt; if (d.age >= LIFE) d.s = 2; }
  }
  for (const b of w) {
    if (b.s !== 1) continue;
    const r = radius(b) + KEG;
    for (const e of w) if (e.s === 0 && (e.x - b.x) ** 2 + (e.y - b.y) ** 2 < r * r) { e.s = 1; e.age = 0; }
  }
  for (const d of w) if (d.s === 1) active = true;
  return active;
}

export default function sparkChain(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let level = 1, score = 0, target = 3, phase: 'aim' | 'burn' | 'result' = 'aim', pause = 0, won = false;
  let dots: Dot[] = [], hover: { x: number; y: number } | null = null, cands: { x: number; y: number; lit: number }[] = [];
  const cv = ctx.canvas(480, 640), g = cv.g, c = ctx.c;
  const lit = (w: Dot[]): number => w.filter((d) => !d.spark && d.s > 0).length;

  function trySpark(x: number, y: number): number {
    const w: Dot[] = dots.map((d) => ({ ...d })); w.push({ x, y, vx: 0, vy: 0, s: 1, age: 0, R: R_SPARK, spark: true });
    for (let i = 0; i < 200 && stepWorld(w, 1 / 60); i++);
    return lit(w);
  }
  function startLevel(): void {
    const cfg = LEVELS[level - 1];
    dots = Array.from({ length: cfg.n }, () => {
      const a = rand() * Math.PI * 2, sp = 10 + rand() * 14;
      return { x: X0 + 20 + rand() * (X1 - X0 - 40), y: Y0 + 20 + rand() * (Y1 - Y0 - 40), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, s: 0 as const, age: 0, R: R_KEG };
    });
    cands = [];
    for (let x = X0 + 6; x < X1; x += 30) for (let y = Y0 + 6; y < Y1; y += 30) cands.push({ x, y, lit: trySpark(x, y) });
    const best = Math.max(...cands.map((q) => q.lit));
    target = Math.max(2, Math.min(cfg.target, best)); phase = 'aim'; pause = 0; won = false; hud();
  }
  function hud(): void { ctx.hud('Level', `${level}/${LEVELS.length}`); ctx.hud('Lit', `${lit(dots)}/${target}`); ctx.hud('Score', score); }
  /** The one player action: drop the spark. */
  function tap(x: number, y: number): void {
    if (ctx.finished || phase !== 'aim') return;
    x = Math.max(X0, Math.min(X1, x)); y = Math.max(Y0, Math.min(Y1, y));
    dots.push({ x, y, vx: 0, vy: 0, s: 1, age: 0, R: R_SPARK, spark: true }); phase = 'burn'; ctx.sfx('tap');
  }
  function update(dt: number): void {
    if (ctx.finished || !dots.length) return;
    if (phase === 'result') {
      pause -= dt;
      if (pause <= 0) {
        if (!won) { ctx.finish({ result: 'lose', score, title: 'The chain fizzled', detail: `Level ${level}: ${lit(dots)} kegs lit, ${target} needed.` }); return; }
        if (level >= LEVELS.length) { ctx.finish({ result: 'win', score, title: 'The whole field went up', detail: `All ${LEVELS.length} fields lit.` }); return; }
        level++; startLevel();
      }
      return;
    }
    if (phase === 'aim') return; // the field holds still while you aim, so the best spot does not go stale
    const active = stepWorld(dots, dt);
    if (phase === 'burn') {
      hud();
      if (!active) { won = lit(dots) >= target; if (won) { score += lit(dots) * 10 + 100; ctx.sfx('good'); } else ctx.sfx('bad'); phase = 'result'; pause = 1.1; hud(); }
    }
  }
  function draw(): void {
    g.fillStyle = c.night; g.fillRect(0, 0, 480, 640);
    g.strokeStyle = c.ember; g.lineWidth = 3; g.strokeRect(X0, Y0, X1 - X0, Y1 - Y0);
    g.fillStyle = c.bone; g.font = '700 20px "Zilla Slab", serif'; g.textAlign = 'center';
    g.fillText(phase === 'aim' ? 'Tap once to drop the spark' : phase === 'burn' ? 'Watch the chain' : won ? 'Field lit' : 'Not enough lit', 240, 36);
    g.fillStyle = c.ash; g.font = '600 15px "Zilla Slab", serif';
    g.fillText(`Light ${target} of ${LEVELS[level - 1].n} kegs`, 240, 62);
    for (const d of dots) {
      if (d.s === 1) {
        const r = radius(d);
        g.fillStyle = d.spark ? 'rgba(255,255,255,0.12)' : 'rgba(220,90,90,0.22)'; g.beginPath(); g.arc(d.x, d.y, r, 0, 7); g.fill();
        g.strokeStyle = c.rose; g.lineWidth = 2.5; g.stroke();
      }
      if (d.spark) continue;
      g.beginPath(); g.arc(d.x, d.y, KEG, 0, 7);
      g.fillStyle = d.s === 0 ? c.saddle : d.s === 1 ? c.red : c.smoke; g.fill();
      g.strokeStyle = d.s === 0 ? c.bone : c.rose; g.lineWidth = 2.5; g.stroke();
      if (d.s === 0) { g.strokeStyle = c.tan; g.lineWidth = 2; g.beginPath(); g.moveTo(d.x, d.y - KEG); g.lineTo(d.x + 5, d.y - KEG - 8); g.stroke(); g.fillStyle = c.rose; g.fillRect(d.x + 3, d.y - KEG - 11, 5, 5); }
      else { g.fillStyle = c.white; g.font = '700 14px sans-serif'; g.textAlign = 'center'; g.fillText('✦', d.x, d.y + 5); }
    }
    if (phase === 'aim' && hover) { g.setLineDash([6, 6]); g.strokeStyle = c.rose; g.lineWidth = 2; g.beginPath(); g.arc(hover.x, hover.y, R_SPARK, 0, 7); g.stroke(); g.setLineDash([]); }
  }
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { hover = cv.pt(e); });
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { const p = cv.pt(e); hover = p; if (p.y > Y0 - 20) tap(p.x, p.y); });
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); level = 1; score = 0; hover = null; startLevel(); },
    probe: () => ({ level, phase, lit: lit(dots), target, n: dots.length }),
    play(kind) {
      for (let f = 0; f < 30000 && !ctx.finished; f++) {
        if (phase === 'aim') {
          const pickC = kind === 'win' ? cands.reduce((a, b) => (b.lit > a.lit ? b : a)) : cands.reduce((a, b) => (b.lit < a.lit ? b : a));
          tap(pickC.x, pickC.y);
        }
        update(1 / 60);
      }
    },
  };
}
