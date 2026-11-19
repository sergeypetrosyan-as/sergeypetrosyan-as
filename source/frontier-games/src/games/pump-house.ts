import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Pump House: set the pump rate so the tank integrates demand into a safe band. Survive three days of rising swings. */
const DAY = 40, DAYS = 3, LO = 30, HI = 70, TANK = 100, STRAIN = 4, AHEAD = 12;

export default function pumpHouse(ctx: Ctx): Instance {
  const cv = ctx.canvas(480, 560);
  const g = cv.g, C = ctx.c;
  let rand = makeRng(1);
  let t = 0, level = 50, rate = 5, strain = 0, score = 0, dragging = false;
  let phase = 0, spikes: { at: number; h: number; w: number }[] = [];

  const day = () => Math.min(DAYS - 1, Math.floor(t / DAY));
  /** Town demand at time s (units/s of pump rate). Deterministic per seed. */
  function demand(s: number): number {
    const d = Math.min(DAYS - 1, Math.floor(s / DAY));
    let v = 5 + (1.2 + d * 0.7) * Math.sin(s * 0.33 + phase) + 0.4 * Math.sin(s * 0.9);
    for (const k of spikes) if (Math.abs(s - k.at) < k.w) v += k.h * Math.cos(((s - k.at) / k.w) * Math.PI * 0.5);
    return Math.max(1, Math.min(9.5, v));
  }
  const setRate = (v: number) => { rate = Math.max(0, Math.min(10, Math.round(v * 10) / 10)); };
  function hud(): void { ctx.hud('Day', `${day() + 1}/${DAYS}`); ctx.hud('Tank', Math.round(level)); ctx.hud('Score', Math.round(score)); }
  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt;
    level += (rate - demand(t)) * 2 * dt;
    if (level >= LO && level <= HI) { strain = Math.max(0, strain - dt); if (Math.abs(level - 50) <= 12) score += dt * 10; } else strain += dt;
    if (level <= 0 || level >= TANK || strain >= STRAIN) {
      const dry = level < 50; hud();
      ctx.finish({ result: 'lose', score: Math.round(score), title: level <= 0 ? 'Tank ran dry' : level >= TANK ? 'Tank overflowed' : 'Pressure burst a pipe', detail: `${dry ? 'The town went thirsty' : 'Water flooded the yard'} on day ${day() + 1} at ${Math.floor(t)} seconds.` });
      return;
    }
    if (t >= DAY * DAYS) { hud(); ctx.finish({ result: 'win', score: Math.round(score), title: 'Three days held', detail: `The tank stayed in the band through every swing.` }); return; }
    hud();
  }
  const yL = (v: number) => 440 - (v / TANK) * 360;
  function draw(): void {
    g.fillStyle = C.bg; g.fillRect(0, 0, 480, 560);
    // tank
    g.fillStyle = C.night; g.fillRect(30, 80, 120, 360);
    const bad = level < LO || level > HI;
    g.fillStyle = bad ? C.red : C.rose; g.fillRect(30, yL(level), 120, 440 - yL(level));
    g.fillStyle = C.bone; g.globalAlpha = 0.9; g.fillRect(30, yL(level) - 2, 120, 4); g.globalAlpha = 1;
    g.strokeStyle = C.bone; g.lineWidth = 3; g.strokeRect(30, 80, 120, 360);
    g.setLineDash([8, 6]); g.lineWidth = 2; g.strokeStyle = C.accent;
    for (const v of [LO, HI]) { g.beginPath(); g.moveTo(20, yL(v)); g.lineTo(160, yL(v)); g.stroke(); }
    g.setLineDash([]); g.fillStyle = C.bone; g.font = '700 14px "Zilla Slab", serif'; g.textAlign = 'left';
    g.fillText('FULL', 36, 74); g.fillText('SAFE', 160, yL(HI) + 5); g.fillText('SAFE', 160, yL(LO) + 5); g.fillText('EMPTY', 36, 458);
    g.fillStyle = C.rose; g.fillText(`${Math.round(level)}`, 160, yL(level) + 5);
    if (strain > 0) { g.fillStyle = C.red; g.fillRect(30, 466, 120 * (strain / STRAIN), 10); g.strokeStyle = C.bone; g.lineWidth = 1.5; g.strokeRect(30, 466, 120, 10); g.fillStyle = C.bone; g.fillText('PRESSURE', 30, 494); }
    // forecast
    const X0 = 220, W = 240, Y0 = 70, H = 180, now = 3;
    g.fillStyle = C.surface; g.fillRect(X0, Y0, W, H); g.strokeStyle = C.ember; g.lineWidth = 2; g.strokeRect(X0, Y0, W, H);
    g.fillStyle = C.bone; g.font = '700 14px "Zilla Slab", serif'; g.fillText('TOWN DEMAND (next 12 s)', X0, Y0 - 8);
    const px = (s: number) => X0 + ((s - (t - now)) / (AHEAD + now)) * W, py = (v: number) => Y0 + H - (v / 10) * H;
    g.strokeStyle = C.tan; g.lineWidth = 3; g.beginPath();
    for (let s = t - now; s <= t + AHEAD; s += 0.25) { const x = px(s), y = py(demand(Math.max(0, s))); s === t - now ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke();
    g.strokeStyle = C.accent; g.setLineDash([6, 5]); g.lineWidth = 2.5; g.beginPath(); g.moveTo(X0, py(rate)); g.lineTo(X0 + W, py(rate)); g.stroke(); g.setLineDash([]);
    g.strokeStyle = C.bone; g.lineWidth = 2; g.beginPath(); g.moveTo(px(t), Y0); g.lineTo(px(t), Y0 + H); g.stroke();
    g.fillStyle = C.bone; g.font = '600 12px "Public Sans", sans-serif'; g.fillText('now', px(t) + 4, Y0 + 14);
    g.fillStyle = C.tan; g.fillText('━ demand', X0, Y0 + H + 18); g.fillStyle = C.rose; g.fillText('┅ your pump', X0 + 90, Y0 + H + 18);
    // lever
    g.fillStyle = C.bone; g.font = '700 16px "Zilla Slab", serif'; g.fillText(`Pump rate ${rate.toFixed(1)}`, X0, 296);
    g.fillStyle = C.night; g.fillRect(X0, 312, W, 34); g.strokeStyle = C.ember; g.strokeRect(X0, 312, W, 34);
    g.fillStyle = C.rose; g.fillRect(X0, 312, (rate / 10) * W, 34);
    g.fillStyle = C.bone; g.fillRect(X0 + (rate / 10) * W - 6, 306, 12, 46); g.strokeStyle = C.ink; g.lineWidth = 2; g.strokeRect(X0 + (rate / 10) * W - 6, 306, 12, 46);
    g.fillStyle = C.ash; g.font = '600 13px "Public Sans", sans-serif'; g.fillText('Drag the lever, or press ↑ ↓', X0, 372);
    // motif: the sun crosses the mesa horizon as the day passes
    g.fillStyle = C.mesa; g.beginPath(); g.moveTo(200, 540); g.lineTo(200, 500); g.lineTo(240, 500); g.lineTo(252, 470); g.lineTo(310, 470); g.lineTo(322, 500); g.lineTo(380, 500); g.lineTo(392, 485); g.lineTo(480, 485); g.lineTo(480, 540); g.fill();
    const f = (t % DAY) / DAY, sx = 215 + f * 250, sy = 455 - Math.sin(f * Math.PI) * 60;
    g.fillStyle = C.bone; g.strokeStyle = C.red; g.lineWidth = 2; g.beginPath(); g.arc(sx, sy, 12, 0, 6.3); g.fill(); g.stroke();
    g.fillStyle = C.bone; g.font = '600 13px "Public Sans", sans-serif'; g.fillText(`Day ${day() + 1}`, 215, 556 - 8);
  }
  const lever = (e: PointerEvent) => { const p = cv.pt(e); setRate(((p.x - 220) / 240) * 10); };
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { const p = cv.pt(e); if (p.x > 190 && p.y > 270 && p.y < 400) { dragging = true; lever(e); } });
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { if (dragging) lever(e); });
  ctx.on(window, 'pointerup', () => { dragging = false; });
  ctx.keys({ ArrowUp: (d) => d && setRate(rate + 0.5), ArrowDown: (d) => d && setRate(rate - 0.5), ArrowRight: (d) => d && setRate(rate + 0.5), ArrowLeft: (d) => d && setRate(rate - 0.5) });
  ctx.pad([{ key: 'ArrowDown', label: 'Slower' }, { key: 'ArrowUp', label: 'Faster' }]);
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); t = 0; level = 50; rate = 5; strain = 0; score = 0; dragging = false; phase = rand() * 6;
      spikes = [];
      for (let d = 1; d < DAYS; d++) for (let k = 0; k < d + 1; k++) spikes.push({ at: d * DAY - 8 + 10 + rand() * (DAY - 22) - (k ? 0 : 0), h: (rand() < 0.5 ? -1 : 1) * (1.5 + d), w: 3 + rand() * 2 });
      hud();
    },
    probe: () => ({ rate, level: Math.round(level), t: Math.round(t * 10) / 10 }),
    play(kind: Result) {
      for (let i = 0; i < 60 * (DAY * DAYS + 20) && !ctx.finished; i++) {
        if (kind === 'lose') setRate(0); else setRate(demand(t + 0.4) + (50 - level) * 0.12);
        update(1 / 60);
      }
    },
  };
}
