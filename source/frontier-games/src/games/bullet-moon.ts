import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Bullet Moon: steer a lantern through the moon's rings, spirals and aimed fans until dawn. The moon wanes as the night passes. */
const W = 480, H = 640, MX = 240, MY = 92, NIGHT = 45, SPEED = 210, LIVES = 3;
interface B { x: number; y: number; vx: number; vy: number }

export default function bulletMoon(ctx: Ctx): Instance {
  const cv = ctx.canvas(W, H), g = cv.g, c = ctx.c;
  let rand = makeRng(1), bs: B[] = [], t = 0, x = MX, y = 560, hp = LIVES, inv = 0, ring = 0, spi = 0, fan = 0, ang = 0, near = 0;
  let dx = 0, dy = 0, target: { x: number; y: number } | null = null, grab = { x: 0, y: 0 };
  const key = { l: false, r: false, u: false, d: false };
  const stars = Array.from({ length: 40 }, (_, i) => ({ x: (i * 97) % W, y: (i * 53) % 560 + 20 }));

  /** The one control: steer(dx, dy) in -1..1. Keys, pad and the test bot all use it. */
  function steer(ax: number, ay: number): void { dx = ax; dy = ay; target = null; }
  const sync = (): void => steer((key.r ? 1 : 0) - (key.l ? 1 : 0), (key.d ? 1 : 0) - (key.u ? 1 : 0));
  const shoot = (a: number, sp: number): void => { bs.push({ x: MX, y: MY + 30, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp }); };
  function volley(): void {
    const aim = Math.atan2(y - MY, x - MX);
    if (t < 8) { if (ring <= 0) { ring = 1.7; const gap = rand() * 6.28; for (let i = 0; i < 20; i++) { const a = (i / 20) * 6.28; if (Math.abs(Math.atan2(Math.sin(a - gap), Math.cos(a - gap))) > 0.5) shoot(a, 80); } } }
    else if (t < 18) { if (spi <= 0) { spi = 0.14; ang += 0.55; shoot(ang, 100); shoot(ang + 3.14, 100); } }
    else if (t < 30) {
      if (fan <= 0) { fan = 1.4; for (let i = -2; i <= 2; i++) shoot(aim + i * 0.3, 125); }
      if (ring <= 0) { ring = 2.6; const gap = rand() * 6.28; for (let i = 0; i < 22; i++) { const a = (i / 22) * 6.28; if (Math.abs(Math.atan2(Math.sin(a - gap), Math.cos(a - gap))) > 0.45) shoot(a, 85); } }
    } else {
      if (spi <= 0) { spi = 0.2; ang -= 0.7; shoot(ang, 100); shoot(ang + 2.1, 100); shoot(ang + 4.2, 100); }
      if (fan <= 0) { fan = 1.9; for (let i = -1; i <= 1; i++) shoot(aim + i * 0.4, 130); }
      if (ring <= 0) { ring = 2.4; const gap = rand() * 6.28; for (let i = 0; i < 22; i++) { const a = (i / 22) * 6.28; if (Math.abs(Math.atan2(Math.sin(a - gap), Math.cos(a - gap))) > 0.45) shoot(a, 90); } }
    }
  }
  function update(step: number): void {
    if (ctx.finished) return;
    t += step; ring -= step; spi -= step; fan -= step; inv = Math.max(0, inv - step);
    volley();
    let mx = dx, my = dy;
    if (target) { const ddx = target.x - x, ddy = target.y - y, d = Math.hypot(ddx, ddy); if (d > 2) { mx = ddx / Math.max(d, 8); my = ddy / Math.max(d, 8); } else { mx = my = 0; } }
    const m = Math.hypot(mx, my) || 1, k = Math.min(1, m) / m;
    x = Math.max(12, Math.min(W - 12, x + mx * k * SPEED * step)); y = Math.max(170, Math.min(H - 14, y + my * k * SPEED * step));
    near = 0;
    for (let i = bs.length - 1; i >= 0; i--) {
      const b = bs[i]; b.x += b.vx * step; b.y += b.vy * step;
      if (b.x < -10 || b.x > W + 10 || b.y < -10 || b.y > H + 10) { bs.splice(i, 1); continue; }
      const d = Math.hypot(b.x - x, b.y - y);
      if (d < 22) near++;
      if (d < 8 && inv <= 0) { hp--; inv = 1.4; bs.splice(i, 1); ctx.sfx('bad'); hud(); if (hp <= 0) { ctx.finish({ result: 'lose', score: Math.round(t * 10), title: 'The moon wins this night', detail: `The lantern went out after ${t.toFixed(0)} of ${NIGHT} seconds.` }); return; } }
    }
    if (Math.floor(t * 4) % 4 === 0) hud();
    if (t >= NIGHT) { bs = []; ctx.sfx('win'); ctx.finish({ result: 'win', score: NIGHT * 10 + hp * 200, title: 'Dawn breaks', detail: `The lantern lasted the whole night with ${hp} of ${LIVES} lives left.` }); }
  }
  function hud(): void { ctx.hud('Lantern', '●'.repeat(hp) + '○'.repeat(LIVES - hp)); ctx.hud('Dawn in', `${Math.max(0, Math.ceil(NIGHT - t))}s`); }

  function draw(): void {
    g.fillStyle = c.ink; g.fillRect(0, 0, W, H);
    g.fillStyle = c.bone; for (const s of stars) { g.globalAlpha = 0.3; g.fillRect(s.x, s.y, 2, 2); } g.globalAlpha = 1;
    // moon, waning toward new moon as dawn nears
    const p = Math.min(1, t / NIGHT);
    g.save(); g.beginPath(); g.arc(MX, MY, 40, 0, 7); g.clip();
    g.fillStyle = c.bone; g.fillRect(MX - 40, MY - 40, 80, 80);
    g.fillStyle = c.night; g.beginPath(); g.arc(MX + 80 * (1 - p), MY, 40, 0, 7); g.fill(); g.restore();
    g.strokeStyle = c.ember; g.lineWidth = 3; g.beginPath(); g.arc(MX, MY, 40, 0, 7); g.stroke();
    // horizon
    g.fillStyle = c.umber; g.fillRect(0, H - 8, W, 8);
    // bullets: hostile = red disc with a bone ring and a dark X so shape reads without colour
    for (const b of bs) { g.fillStyle = c.red; g.strokeStyle = c.bone; g.lineWidth = 1.6; g.beginPath(); g.arc(b.x, b.y, 6, 0, 7); g.fill(); g.stroke(); g.strokeStyle = c.ink; g.beginPath(); g.moveTo(b.x - 2.5, b.y - 2.5); g.lineTo(b.x + 2.5, b.y + 2.5); g.moveTo(b.x + 2.5, b.y - 2.5); g.lineTo(b.x - 2.5, b.y + 2.5); g.stroke(); }
    // lantern: bone glow + core; blinks while invulnerable
    if (!(inv > 0 && Math.floor(t * 12) % 2)) {
      g.globalAlpha = 0.22; g.fillStyle = c.bone; g.beginPath(); g.arc(x, y, 18, 0, 7); g.fill(); g.globalAlpha = 1;
      g.fillStyle = c.bone; g.strokeStyle = c.tan; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y - 12); g.lineTo(x + 9, y); g.lineTo(x, y + 12); g.lineTo(x - 9, y); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = c.ink; g.beginPath(); g.arc(x, y, 3, 0, 7); g.fill();
    }
  }
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { const p = cv.pt(e); grab = { x: x - p.x, y: y - p.y }; target = { x, y }; cv.el.setPointerCapture?.(e.pointerId); });
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { if (target) { const p = cv.pt(e); target = { x: p.x + grab.x, y: p.y + grab.y }; } });
  const release = (): void => { target = null; dx = dy = 0; sync(); };
  ctx.on(cv.el, 'pointerup', release); ctx.on(cv.el, 'pointercancel', release);
  ctx.keys({
    ArrowLeft: (d) => { key.l = d; sync(); }, ArrowRight: (d) => { key.r = d; sync(); }, ArrowUp: (d) => { key.u = d; sync(); }, ArrowDown: (d) => { key.d = d; sync(); },
    a: (d) => { key.l = d; sync(); }, d: (d) => { key.r = d; sync(); }, w: (d) => { key.u = d; sync(); }, s: (d) => { key.d = d; sync(); },
  });
  ctx.pad([{ key: 'ArrowLeft', label: '←' }, { key: 'ArrowUp', label: '↑' }, { key: 'ArrowDown', label: '↓' }, { key: 'ArrowRight', label: '→' }]);
  ctx.loop(update, draw);

  /** Test bot: pick the direction whose short-term projection keeps the most distance from every shot. */
  function botSteer(): void {
    let best = -1e9, bd: [number, number] = [0, 0];
    for (const [ax, ay] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      const n = Math.hypot(ax, ay) || 1; let worst = 1e9;
      for (let f = 3; f <= 30; f += 3) {
        const s = f / 60, qx = Math.max(12, Math.min(W - 12, x + (ax / n) * SPEED * s)), qy = Math.max(170, Math.min(H - 14, y + (ay / n) * SPEED * s));
        for (const b of bs) { const d = Math.hypot(b.x + b.vx * s - qx, b.y + b.vy * s - qy); if (d < worst) worst = d; }
      }
      const score = Math.min(worst, 60) * 3 - Math.abs(x + ax * 8 - MX) * 0.02 - Math.abs(y + ay * 8 - 540) * 0.02 - (ax || ay ? 0 : -0.5);
      if (score > best) { best = score; bd = [ax, ay]; }
    }
    steer(bd[0], bd[1]);
  }
  return {
    destroy() { /* released by the shell */ },
    reset(seed) { rand = makeRng(seed); bs = []; t = 0; x = MX; y = 560; hp = LIVES; inv = 0; ring = 1; spi = 0; fan = 2; ang = 0; dx = dy = 0; target = null; key.l = key.r = key.u = key.d = false; hud(); },
    probe: () => ({ x: Math.round(x), y: Math.round(y), hp, t: Math.round(t * 10) / 10, shots: bs.length }),
    play(kind) {
      for (let i = 0; i < 3200 && !ctx.finished; i++) { if (kind === 'win') botSteer(); else steer(0, 0); update(1 / 60); }
    },
  };
}
