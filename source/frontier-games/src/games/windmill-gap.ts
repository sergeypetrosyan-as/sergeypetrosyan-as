import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Windmill Gap: the pebble needs 0.9 s to arrive at the aimed point on the turning sails. Aim where a gap WILL be. Two clean passes per sail speed. */
const HX = 240, HY = 250, R0 = 24, R1 = 176, LY = 610, FLIGHT = 0.9, NEED = 2;
const LEVELS = [{ n: 4, w: 0.8 }, { n: 4, w: 1.15 }, { n: 5, w: 1.3 }, { n: 5, w: 1.6 }, { n: 6, w: 1.6 }];
const TAU = Math.PI * 2;

export default function windmillGap(ctx: Ctx): Instance {
  const cv = ctx.canvas(480, 640);
  const g = cv.g, C = ctx.c;
  let rand = makeRng(1);
  let level = 0, pebbles = 12, passes = 0, score = 0, ang = 0, ax = HX + 90, ay = HY - 60, aiming = false, hold = 0;
  let fly: { x: number; y: number; t: number } | null = null, flash = 0, flashMsg = '', flashGood = false, stars: number[][] = [];

  const L = () => LEVELS[level];
  const sector = () => TAU / L().n;
  /** Is the point (x, y) covered by a sail when the sails sit at angle a? Blades are wedges covering 55% of each sector. */
  function covered(x: number, y: number, a: number): boolean {
    const r = Math.hypot(x - HX, y - HY);
    if (r < R0 || r > R1 + 4) return r < R0;
    const s = sector(), half = s * 0.275 + 6 / r; // 6px pebble allowance
    let d = (Math.atan2(y - HY, x - HX) - a) % s; if (d < 0) d += s;
    return Math.min(d, s - d) < half;
  }
  function hud(): void { ctx.hud('Sail speed', `${level + 1}/${LEVELS.length}`); ctx.hud('Passes', `${passes}/${NEED}`); ctx.hud('Pebbles', pebbles); ctx.hud('Score', score); }
  function aim(x: number, y: number): void {
    const r = Math.hypot(x - HX, y - HY), k = r > R1 - 8 ? (R1 - 8) / r : 1;
    ax = HX + (x - HX) * k; ay = HY + (y - HY) * k;
  }
  /** The one player action: throw at the aimed point. */
  function fire(): void {
    if (ctx.finished || fly || hold > 0 || pebbles <= 0) return;
    pebbles--; fly = { x: ax, y: ay, t: 0 }; ctx.sfx('tap'); hud();
  }
  function update(dt: number): void {
    ang += L().w * dt;
    if (flash > 0) flash -= dt;
    if (hold > 0) hold -= dt;
    if (fly) {
      fly.t += dt;
      if (fly.t >= FLIGHT) {
        const hit = covered(fly.x, fly.y, ang); fly = null;
        if (hit) { flash = 0.8; flashGood = false; flashMsg = 'Struck a sail'; ctx.sfx('bad'); }
        else {
          passes++; score += 50 + level * 25; flash = 0.8; flashGood = true; flashMsg = 'Through the gap'; ctx.sfx('good');
          if (passes >= NEED) {
            score += 100 + pebbles * 10; passes = 0;
            if (level + 1 >= LEVELS.length) { hud(); ctx.finish({ result: 'win', score, title: 'The mill is yours', detail: `Every sail speed cleared with ${pebbles} pebbles to spare.` }); return; }
            level++; pebbles++; hold = 0.7; flashMsg = 'Sails speed up';
          }
        }
        hud();
      }
    }
    if (!fly && pebbles <= 0 && hold <= 0) { hud(); ctx.finish({ result: 'lose', score, title: 'Out of pebbles', detail: `You reached sail speed ${level + 1} of ${LEVELS.length}.` }); }
  }
  function draw(): void {
    g.fillStyle = C.bg; g.fillRect(0, 0, 480, 640);
    for (const s of stars) { g.globalAlpha = s[2]; g.fillStyle = C.quiet; g.fillRect(s[0], s[1], 2, 2); } g.globalAlpha = 1;
    // barn behind the sails: what the pebble flies into
    g.fillStyle = C.wine; g.fillRect(0, 440, 480, 170); g.fillStyle = C.umber; g.fillRect(0, 580, 480, 60);
    // tower
    g.fillStyle = C.saddle; g.beginPath(); g.moveTo(HX - 40, 590); g.lineTo(HX - 12, HY); g.lineTo(HX + 12, HY); g.lineTo(HX + 40, 590); g.fill();
    // motif: dotted ring marks the sail reach, arrow shows spin direction
    g.strokeStyle = C.mesa; g.setLineDash([4, 8]); g.lineWidth = 2; g.beginPath(); g.arc(HX, HY, R1 + 10, 0, TAU); g.stroke(); g.setLineDash([]);
    const sa = ang + 0.2; g.fillStyle = C.ash; g.save(); g.translate(HX + Math.cos(-0.6) * (R1 + 10), HY + Math.sin(-0.6) * (R1 + 10)); g.rotate(-0.6 + Math.PI / 2); g.beginPath(); g.moveTo(0, -9); g.lineTo(-7, 6); g.lineTo(7, 6); g.fill(); g.restore(); void sa;
    const s = sector();
    for (let i = 0; i < L().n; i++) {
      const c = ang + i * s, hw = s * 0.275;
      g.fillStyle = C.tan; g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath(); g.moveTo(HX + Math.cos(c) * R0, HY + Math.sin(c) * R0);
      g.arc(HX, HY, R1, c - hw, c + hw); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = C.saddle; g.lineWidth = 2; g.beginPath(); for (let k = 60; k < R1; k += 38) g.arc(HX, HY, k, c - hw * (k / R1) * 0.9 - 0.02, c + hw * (k / R1) * 0.9 + 0.02); g.stroke();
    }
    g.fillStyle = C.red; g.beginPath(); g.arc(HX, HY, R0, 0, TAU); g.fill(); g.strokeStyle = C.bone; g.lineWidth = 3; g.stroke();
    // reticle and flight
    g.strokeStyle = C.bone; g.lineWidth = 3; g.beginPath(); g.arc(ax, ay, 13, 0, TAU); g.moveTo(ax - 20, ay); g.lineTo(ax - 7, ay); g.moveTo(ax + 7, ay); g.lineTo(ax + 20, ay); g.moveTo(ax, ay - 20); g.lineTo(ax, ay - 7); g.moveTo(ax, ay + 7); g.lineTo(ax, ay + 20); g.stroke();
    g.fillStyle = C.surfaceRaised; g.strokeStyle = C.ember; g.lineWidth = 2; g.fillRect(190, LY - 6, 100, 24); g.strokeRect(190, LY - 6, 100, 24);
    if (fly) { const p = fly.t / FLIGHT, x = 240 + (fly.x - 240) * p, y = LY + (fly.y - LY) * p, r = 13 - 7 * p; g.fillStyle = C.collectible; g.strokeStyle = C.ink; g.lineWidth = 2; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.stroke(); }
    else { g.fillStyle = C.collectible; g.strokeStyle = C.ink; g.lineWidth = 2; g.beginPath(); g.arc(240, LY + 2, 13, 0, TAU); g.fill(); g.stroke(); }
    g.textAlign = 'center';
    if (flash > 0) { g.fillStyle = flashGood ? C.bone : C.rose; g.font = '700 24px "Zilla Slab", serif'; g.fillText((flashGood ? '✓ ' : '✕ ') + flashMsg, 240, 36); }
    else { g.fillStyle = C.ash; g.font = '600 15px "Public Sans", sans-serif'; g.fillText('Drag to aim, let go to throw. It lands in 0.9 s.', 240, 36); }
  }
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { aiming = true; const p = cv.pt(e); aim(p.x, p.y); });
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { if (aiming) { const p = cv.pt(e); aim(p.x, p.y); } });
  ctx.on(cv.el, 'pointerup', (e: PointerEvent) => { if (!aiming) return; aiming = false; const p = cv.pt(e); aim(p.x, p.y); fire(); });
  ctx.on(cv.el, 'pointercancel', () => { aiming = false; });
  ctx.keys({ ArrowLeft: (d) => d && aim(ax - 14, ay), ArrowRight: (d) => d && aim(ax + 14, ay), ArrowUp: (d) => d && aim(ax, ay - 14), ArrowDown: (d) => d && aim(ax, ay + 14), ' ': (d) => d && fire() });
  ctx.pad([{ key: 'ArrowLeft', label: '◀' }, { key: 'ArrowUp', label: '▲' }, { key: 'ArrowDown', label: '▼' }, { key: 'ArrowRight', label: '▶' }, { key: ' ', label: 'Throw', wide: true }]);
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); level = 0; pebbles = 12; passes = 0; score = 0; ang = rand() * TAU; hold = 0; fly = null; flash = 0; aiming = false; aim(HX + 90, HY - 60);
      stars = Array.from({ length: 40 }, () => [rand() * 480, rand() * 440, 0.15 + rand() * 0.3]);
      hud();
    },
    probe: () => ({ level, pebbles, passes, score, flying: !!fly, ax: Math.round(ax), ay: Math.round(ay) }),
    play(kind: Result) {
      for (let guard = 0; guard < 40000 && !ctx.finished; guard++) {
        if (!fly && hold <= 0 && pebbles > 0) {
          const arrive = ang + L().w * FLIGHT;
          let found = false;
          for (let k = 0; k < 72 && !found; k++) {
            const a = (k / 72) * TAU, r = 120 + (k % 5) * 6, x = HX + Math.cos(a) * r, y = HY + Math.sin(a) * r;
            if (covered(x, y, arrive) === (kind === 'lose')) { aim(x, y); found = true; }
          }
          if (found) fire();
        }
        update(1 / 60);
      }
    },
  };
}
