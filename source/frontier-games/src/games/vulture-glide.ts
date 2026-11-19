import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Vulture Glide: tap to flap against gravity and thread twelve pairs of canyon needles. */
const GOAL = 12, W = 480, H = 640, BX = 130, R = 13;
const GAP = 178, PW = 46, SPACING = 235, GRAV = 1450, FLAP = -410, GROUND = 590;

export default function vultureGlide(ctx: Ctx): Instance {
  const cv = ctx.canvas(W, H);
  const g = cv.g, c = ctx.c;
  let rand = makeRng(1);
  let y = 300, vy = 0, started = false, score = 0, t = 0, speed = 165, flapT = 0;
  let pipes: { x: number; gy: number; done: boolean }[] = [];
  let lastGy = 300;

  function addPipe(x: number): void {
    lastGy = Math.max(180, Math.min(430, lastGy + (rand() - 0.5) * 230));
    pipes.push({ x, gy: lastGy, done: false });
  }
  function hud(): void { ctx.hud('Gaps passed', `${score}/${GOAL}`); }
  /** The one player action: a flap. */
  function flap(): void {
    if (ctx.finished) return;
    started = true; vy = FLAP; flapT = 0.18; ctx.sfx('tap');
  }
  function crash(why: string): void { ctx.sfx('lose'); ctx.finish({ result: 'lose', score: score * 100, title: 'Grounded', detail: `${why} after ${score} ${score === 1 ? 'gap' : 'gaps'}.` }); }
  function update(dt: number): void {
    t += dt; flapT = Math.max(0, flapT - dt);
    if (!started) { y = 300 + Math.sin(t * 4) * 8; return; }
    vy += GRAV * dt; y += vy * dt;
    speed = 165 + score * 4;
    pipes.forEach((p) => (p.x -= speed * dt));
    if (pipes.length && pipes[0].x < -PW) pipes.shift();
    if (pipes[pipes.length - 1].x < W - SPACING + 20) addPipe(pipes[pipes.length - 1].x + SPACING);
    if (y > GROUND - R) return crash('The vulture hit the canyon floor');
    if (y < R) return crash('The vulture hit the sky ledge');
    for (const p of pipes) {
      if (!p.done && p.x + PW / 2 < BX - R) { p.done = true; score++; hud(); ctx.sfx('good'); if (score >= GOAL) { ctx.finish({ result: 'win', score: score * 100 + 200, title: 'Through the canyon', detail: `Cleared ${GOAL} needle gaps.` }); return; } }
      if (Math.abs(p.x - BX) < PW / 2 + R - 3 && (y < p.gy - GAP / 2 + R - 2 || y > p.gy + GAP / 2 - R + 2)) return crash('The vulture struck a needle');
    }
  }
  function draw(): void {
    g.fillStyle = c.night; g.fillRect(0, 0, W, H);
    g.fillStyle = c.bone; g.globalAlpha = 0.35;
    for (let i = 0; i < 26; i++) g.fillRect((i * 97 + 13) % W, (i * 53) % 400, 2, 2);
    g.globalAlpha = 1;
    // progress: a moon travels along a dotted arc as gaps are cleared
    g.strokeStyle = c.mesa; g.lineWidth = 2; g.setLineDash([3, 6]); g.beginPath(); g.moveTo(40, 36); g.lineTo(W - 40, 36); g.stroke(); g.setLineDash([]);
    g.fillStyle = c.bone; g.beginPath(); g.arc(40 + (score / GOAL) * (W - 80), 36, 11, 0, 7); g.fill();
    g.fillStyle = c.rose; g.beginPath(); g.arc(W - 40, 36, 7, 0, 7); g.fill();
    g.fillStyle = c.mesa; g.fillRect(0, GROUND - 20, W, 20);
    g.fillStyle = c.umber; g.fillRect(0, GROUND, W, H - GROUND);
    g.strokeStyle = c.ember; g.lineWidth = 3; g.beginPath(); g.moveTo(0, GROUND); g.lineTo(W, GROUND); g.stroke();
    for (const p of pipes) {
      const top = p.gy - GAP / 2, bot = p.gy + GAP / 2;
      g.fillStyle = c.saddle; g.strokeStyle = c.red; g.lineWidth = 3;
      g.beginPath(); g.moveTo(p.x - PW / 2 - 8, 0); g.lineTo(p.x + PW / 2 + 8, 0); g.lineTo(p.x + 7, top); g.lineTo(p.x - 7, top); g.closePath(); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(p.x - PW / 2 - 8, GROUND); g.lineTo(p.x + PW / 2 + 8, GROUND); g.lineTo(p.x + 7, bot); g.lineTo(p.x - 7, bot); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = c.rose; g.lineWidth = 2; g.beginPath(); g.moveTo(p.x - 9, top - 7); g.lineTo(p.x + 9, top - 7); g.moveTo(p.x - 9, bot + 7); g.lineTo(p.x + 9, bot + 7); g.stroke();
    }
    // vulture: bone body, wing angle follows the flap
    g.save(); g.translate(BX, y); g.scale(1.3, 1.3); g.rotate(Math.max(-0.5, Math.min(0.7, vy / 700)));
    g.fillStyle = c.bone; g.strokeStyle = c.ink; g.lineWidth = 2;
    g.beginPath(); g.ellipse(0, 0, R + 4, R - 2, 0, 0, 7); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(-4, 0); g.lineTo(-22, flapT > 0 ? -26 : 14); g.lineTo(6, flapT > 0 ? -4 : 4); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = c.red; g.beginPath(); g.moveTo(15, -3); g.lineTo(26, 3); g.lineTo(15, 6); g.fill();
    g.restore();
    if (!started) { g.fillStyle = c.bone; g.font = '700 24px "Zilla Slab", serif'; g.textAlign = 'center'; g.fillText('Tap to flap', W / 2, 230); }
  }

  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { e.preventDefault(); flap(); });
  ctx.keys({ ' ': (d) => d && flap(), ArrowUp: (d) => d && flap() });
  ctx.pad([{ key: ' ', label: 'Flap', wide: true }]);
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); y = 300; vy = 0; started = false; score = 0; t = 0; speed = 165; flapT = 0; lastGy = 300; pipes = [];
      addPipe(W + 120); for (let i = 1; i < 3; i++) addPipe(W + 120 + i * SPACING);
      hud();
    },
    probe: () => ({ started, y: Math.round(y), vy: Math.round(vy), score }),
    play(kind: Result) {
      for (let guard = 0; guard < 30000 && !ctx.finished; guard++) {
        if (kind === 'win') {
          const p = pipes.find((q) => q.x + PW / 2 + 10 > BX - R) ?? pipes[0];
          if (!started || y + vy * 0.05 > p.gy + 18) flap();
        } else if (!started && guard === 0) flap();
        update(1 / 60);
      }
    },
  };
}
