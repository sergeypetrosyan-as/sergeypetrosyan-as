import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Pour the Shot: five glasses. The fill line fades as you pour; release where you remember it. Total spill must stay low. */
const GLASSES = 5;
const LIMIT = 42;

export default function pourTheShot(ctx: Ctx): Instance {
  type Phase = 'ready' | 'pour' | 'result';
  const cv = ctx.canvas(480, 640);
  const g = cv.g, c = ctx.c;
  let phase: Phase = 'ready';
  let rand = makeRng(1);
  let n = 1, fill = 0, target = 60, rate = 40, spill = 0, t = 0, err = 0, over = false;
  const GX = 150, GW = 180, GT = 250, GB = 560; // glass box: x, width, top, bottom

  function hud(): void { ctx.hud('Glass', `${n}/${GLASSES}`); ctx.hud('Spill', `${Math.round(spill)} / ${LIMIT}`); }
  function setup(): void {
    phase = 'ready'; fill = 0; t = 0; err = 0; over = false;
    target = Math.round(30 + rand() * 50);
    rate = Math.round(30 + rand() * 25 + n * 3);
  }
  /** The one player action: start (down) or stop (up) the pour. */
  function pour(down: boolean): void {
    if (ctx.finished) return;
    if (down && phase === 'ready') { phase = 'pour'; ctx.sfx('tap'); }
    else if (!down && phase === 'pour') stop();
  }
  function stop(): void {
    err = fill - target; spill += Math.abs(err); phase = 'result'; t = 0;
    over = fill >= 100;
    ctx.sfx(Math.abs(err) <= 6 ? 'good' : 'bad');
    hud();
  }
  function update(dt: number): void {
    t += dt;
    if (phase === 'pour') { fill += rate * dt; if (fill >= 100) { fill = 100; err = 100 - target; stop(); } }
    else if (phase === 'result' && t > 1.4) {
      if (spill > LIMIT || n >= GLASSES) {
        const result: Result = spill <= LIMIT ? 'win' : 'lose';
        const score = Math.max(0, Math.round(1000 - spill * 12));
        ctx.finish({ result, score, title: result === 'win' ? 'Steady hand' : 'Too much on the bar', detail: `Total spill ${Math.round(spill)} against a limit of ${LIMIT}.` });
      } else { n++; hud(); setup(); }
    }
  }
  function draw(): void {
    g.clearRect(0, 0, 480, 640);
    g.fillStyle = c.night; g.fillRect(0, 0, 480, 640);
    g.fillStyle = c.umber; g.fillRect(0, 560, 480, 80);
    g.strokeStyle = c.ember; g.lineWidth = 3; g.beginPath(); g.moveTo(0, 560); g.lineTo(480, 560); g.stroke();
    // bottle spout
    g.fillStyle = c.saddle; g.fillRect(GX + GW / 2 - 30, 80, 60, 70);
    g.fillRect(GX + GW / 2 - 14, 60, 28, 30);
    // stream, thicker means faster
    if (phase === 'pour') {
      g.fillStyle = c.rose; g.fillRect(GX + GW / 2 - rate / 18, 150, rate / 9, GB - 150 - (fill / 100) * (GB - GT) * 0.95);
    }
    // glass body and liquid
    const top = GT, bot = GB - 6, h = bot - top;
    g.fillStyle = c.rose; g.globalAlpha = 0.9;
    g.fillRect(GX + 8, bot - (fill / 100) * (h - 10), GW - 16, (fill / 100) * (h - 10));
    g.globalAlpha = 1;
    g.strokeStyle = c.bone; g.lineWidth = 5; g.beginPath(); g.moveTo(GX, top); g.lineTo(GX + 14, bot); g.lineTo(GX + GW - 14, bot); g.lineTo(GX + GW, top); g.stroke();
    // fading target line: visible at the start, gone as the glass fills
    const ty = bot - (target / 100) * (h - 10);
    const a = phase === 'result' ? 1 : Math.max(0, 1 - fill / (target * 0.4));
    if (a > 0.02) {
      g.globalAlpha = a; g.strokeStyle = c.bone; g.lineWidth = 3; g.setLineDash([10, 7]);
      g.beginPath(); g.moveTo(GX - 24, ty); g.lineTo(GX + GW + 24, ty); g.stroke(); g.setLineDash([]);
      g.fillStyle = c.bone; g.beginPath(); g.moveTo(GX - 24, ty); g.lineTo(GX - 44, ty - 10); g.lineTo(GX - 44, ty + 10); g.fill();
      g.globalAlpha = 1;
    }
    g.fillStyle = c.bone; g.font = '700 22px "Zilla Slab", serif'; g.textAlign = 'center';
    if (phase === 'ready') g.fillText('Memorise the line, then hold to pour', 240, 30);
    else if (phase === 'pour') g.fillText('Let go when you reach the line', 240, 30);
    else g.fillText(over ? `Overflow: ${Math.round(err)} too much` : err >= 0 ? `${Math.round(err)} over the line` : `${Math.round(-err)} short of the line`, 240, 30);
    // spill puddle on the bar
    g.fillStyle = c.red; g.fillRect(40, 600, Math.min(400, (spill / LIMIT) * 400), 14);
    g.strokeStyle = c.bone; g.lineWidth = 2; g.strokeRect(40, 600, 400, 14);
  }

  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { e.preventDefault(); pour(true); });
  ctx.on(window, 'pointerup', () => pour(false));
  ctx.on(cv.el, 'pointercancel', () => pour(false));
  ctx.keys({ ' ': (d) => pour(d) });
  ctx.pad([{ key: ' ', label: 'Hold to pour', wide: true }]);
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); n = 1; spill = 0; setup(); hud(); },
    probe: () => ({ n, phase, fill: Math.round(fill * 10) / 10, spill: Math.round(spill * 10) / 10 }),
    play(kind: Result) {
      for (let guard = 0; guard < 40000 && !ctx.finished; guard++) {
        if (phase === 'ready') pour(true);
        else if (phase === 'pour') { if (kind === 'win' && fill >= target) pour(false); else update(1 / 60); }
        else update(1 / 60);
      }
    },
  };
}
