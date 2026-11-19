import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Lasso Loop: a loop swings and pulses above the lane. Throw it when it is over a steer AND the right size. Three misses end the run. */
const W = 480, H = 400, LANE = 318, MISSES = 3;
const ROUNDS = [
  { n: 3, gap: 3.0, spd: 58, wx: 0.95, wr: 3.0 },
  { n: 4, gap: 2.5, spd: 78, wx: 1.2, wr: 3.7 },
  { n: 5, gap: 2.1, spd: 98, wx: 1.45, wr: 4.4 },
];

export default function lassoLoop(ctx: Ctx): Instance {
  type Steer = { x: number; dir: number; hw: number; state: 'run' | 'caught' | 'gone'; k: number };
  let rand = makeRng(1);
  let t = 0, round = 0, spawned = 0, spawnT = 1, brk = 0, cool = 0, caught = 0, miss = 0, score = 0, flash = 0, flashX = 0, flashOk = false;
  let steers: Steer[] = [];

  const cv = ctx.canvas(W, H);
  const g = cv.g, c = ctx.c;

  const loopAt = () => {
    const R = ROUNDS[round];
    return { x: W / 2 + 160 * Math.sin(t * R.wx), r: 22 + 26 * (0.5 + 0.5 * Math.sin(t * R.wr)) };
  };
  /** Loop encloses the steer (not too tight) and is not wildly loose. */
  const fits = (s: Steer, lp: { x: number; r: number }) => {
    const dx = Math.abs(lp.x - s.x);
    return s.state === 'run' && lp.r >= dx + 0.75 * s.hw && lp.r <= dx + 1.6 * s.hw;
  };
  function hud(): void { ctx.hud('Herd', `${Math.min(round + 1, 3)}/3`); ctx.hud('Roped', caught); ctx.hud('Misses left', MISSES - miss); }
  function startRound(): void { spawned = 0; spawnT = 0.8; steers = []; hud(); }
  function addMiss(): void {
    miss++; ctx.sfx('bad'); hud();
    if (miss >= MISSES) ctx.finish({ result: 'lose', score, title: 'The herd got away', detail: `You roped ${caught} steers before the third miss.` });
  }
  /** The one player action: throw. */
  function throwLoop(): void {
    if (ctx.finished || cool > 0 || brk > 0) return;
    cool = 0.55;
    const lp = loopAt();
    const hit = steers.find((s) => fits(s, lp));
    flash = 0.4; flashX = lp.x; flashOk = !!hit;
    if (hit) { hit.state = 'caught'; caught++; score += 100; ctx.sfx('good'); hud(); }
    else addMiss();
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt; cool = Math.max(0, cool - dt); flash = Math.max(0, flash - dt);
    const R = ROUNDS[round];
    if (brk > 0) { brk -= dt; if (brk <= 0) { round++; startRound(); } return; }
    spawnT -= dt;
    if (spawned < R.n && spawnT <= 0) {
      const dir = rand() < 0.5 ? 1 : -1;
      steers.push({ x: dir > 0 ? -30 : W + 30, dir, hw: 17 + Math.floor(rand() * 4) * 3.5, state: 'run', k: 0.85 + rand() * 0.3 });
      spawned++; spawnT = R.gap;
    }
    for (const s of steers) {
      if (s.state !== 'run') continue;
      s.x += s.dir * R.spd * s.k * dt;
      if (s.x < -40 || s.x > W + 40) { s.state = 'gone'; addMiss(); if (ctx.finished) return; }
    }
    if (spawned >= R.n && steers.every((s) => s.state !== 'run')) {
      if (round >= ROUNDS.length - 1) ctx.finish({ result: 'win', score: score + (MISSES - miss) * 100, title: 'Whole herd roped', detail: `You roped ${caught} steers with ${MISSES - miss} misses to spare.` });
      else { brk = 1.2; ctx.sfx('win'); }
    }
  }

  function draw(): void {
    g.fillStyle = c.night; g.fillRect(0, 0, W, H);
    g.fillStyle = c.dusk; g.fillRect(0, 150, W, 120);
    g.fillStyle = c.mesa;
    for (const [x, w, y] of [[20, 90, 110], [150, 60, 128], [300, 120, 100], [430, 60, 122]]) { g.beginPath(); g.moveTo(x, 190); g.lineTo(x + 6, y); g.lineTo(x + w - 6, y); g.lineTo(x + w, 190); g.fill(); }
    g.fillStyle = c.umber; g.fillRect(0, 190, W, H - 190);
    g.fillStyle = c.wine; g.fillRect(0, LANE + 22, W, H - LANE - 22);
    g.strokeStyle = c.ember; g.lineWidth = 2; g.beginPath(); g.moveTo(0, LANE + 22); g.lineTo(W, LANE + 22); g.stroke();
    const lp = loopAt();
    for (const s of steers) {
      if (s.state === 'gone') continue;
      const y = LANE - (s.state === 'caught' ? 6 : 0), a = s.hw;
      g.fillStyle = s.state === 'caught' ? c.rose : c.tan; g.strokeStyle = c.bone; g.lineWidth = 2;
      g.beginPath(); g.ellipse(s.x, y, a, a * 0.62, 0, 0, 7); g.fill(); g.stroke();
      const hx = s.x + s.dir * a * 0.95;
      g.beginPath(); g.arc(hx, y - a * 0.3, a * 0.34, 0, 7); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(hx, y - a * 0.55); g.lineTo(hx + s.dir * a * 0.5, y - a * 0.9); g.moveTo(hx, y - a * 0.55); g.lineTo(hx - s.dir * a * 0.2, y - a * 0.95); g.stroke();
      g.fillStyle = c.saddle;
      for (const lx of [-0.55, -0.2, 0.25, 0.6]) g.fillRect(s.x + lx * a - 2, y + a * 0.5, 4, a * 0.55);
      g.fillStyle = c.red; g.font = `700 ${Math.round(a * 0.7)}px serif`; g.textAlign = 'center'; g.fillText('★', s.x - s.dir * a * 0.1, y + a * 0.16);
    }
    {
      const ly = flash > 0 ? 226 + (0.4 - flash) * 240 : 226;
      const lx = flash > 0 ? flashX : lp.x, lr = lp.r;
      g.setLineDash([]); g.strokeStyle = c.ember; g.globalAlpha = 0.6; g.lineWidth = 1.5; g.setLineDash([3, 5]);
      g.beginPath(); g.moveTo(lx, ly); g.lineTo(lx, LANE + 22); g.stroke(); g.globalAlpha = 1; g.setLineDash([]);
      g.strokeStyle = flash > 0 ? (flashOk ? c.rose : c.red) : c.bone; g.lineWidth = 5;
      g.beginPath(); g.ellipse(lx, ly, lr, lr * 0.5, 0, 0, 7); g.stroke();
      g.strokeStyle = c.tan; g.lineWidth = 2; g.setLineDash([6, 7]); g.lineDashOffset = -t * 40;
      g.beginPath(); g.ellipse(lx, ly, lr, lr * 0.5, 0, 0, 7); g.stroke(); g.setLineDash([]);
    }
    g.fillStyle = c.bone; g.font = '600 15px sans-serif'; g.textAlign = 'center';
    g.fillText(cool > 0 ? 'Coiling the rope...' : brk > 0 ? 'Next herd' : 'Tap to throw when the loop circles a steer', W / 2, 30);
  }

  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { e.preventDefault(); throwLoop(); });
  ctx.keys({ ' ': (d) => d && throwLoop(), Enter: (d) => d && throwLoop() });
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); t = 0; round = 0; caught = 0; miss = 0; score = 0; cool = 0; flash = 0; brk = 0; startRound(); },
    probe: () => ({ round, caught, miss, spawned, cool: Math.round(cool * 100), t: Math.round(t * 10) }),
    play(kind) {
      for (let n = 0; n < 12000 && !ctx.finished; n++) {
        if (cool <= 0 && brk <= 0) {
          const lp = loopAt();
          const can = steers.some((s) => fits(s, lp));
          if (kind === 'win' ? can : !can && steers.length > 0) { throwLoop(); continue; }
        }
        update(1 / 60);
      }
    },
  };
}
