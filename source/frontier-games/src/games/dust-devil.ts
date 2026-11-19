import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Dust Devil: steer a whirlwind through the desert, swallowing what is smaller than you and dodging what is bigger. */
const W = 480, H = 640, GOAL = 62, START = 18, LIMIT = 100;
interface Obj { x: number; y: number; vx: number; vy: number; r: number; kind: number; spin: number }

export default function dustDevil(ctx: Ctx): Instance {
  const cv = ctx.canvas(W, H);
  const g = cv.g, C = ctx.c;
  let rand = makeRng(1);
  let x = W / 2, y = H * 0.7, r = START, time = LIMIT, hurt = 0, ang = 0, eaten = 0, score = 0;
  let objs: Obj[] = [], target: { x: number; y: number } | null = null, flash = 0, hits = 0;
  const dir = { l: false, r: false, u: false, d: false };

  const state = (o: Obj): 'eat' | 'hurt' | 'near' => (o.r < r * 0.88 ? 'eat' : o.r > r * 1.05 ? 'hurt' : 'near');
  function hud(): void { ctx.hud('Size', `${Math.round(r)}/${GOAL}`); ctx.hud('Wind left', Math.ceil(time) + 's'); ctx.hud('Eaten', eaten); }

  function spawn(): void {
    const big = rand() < 0.3;
    const f = big ? 1.15 + rand() * 0.7 : 0.3 + rand() * 0.5;
    const rad = Math.min(big ? 66 : 40, Math.max(5, r * f));
    const side = rand();
    const o: Obj = side < 0.7 ? { x: rad + rand() * (W - 2 * rad), y: -rad, vx: (rand() - 0.5) * 30, vy: 24 + rand() * 30, r: rad, kind: 0, spin: 0 }
      : side < 0.85 ? { x: -rad, y: rand() * H * 0.7, vx: 24 + rand() * 25, vy: 10 + rand() * 20, r: rad, kind: 0, spin: 0 }
        : { x: W + rad, y: rand() * H * 0.7, vx: -(24 + rand() * 25), vy: 10 + rand() * 20, r: rad, kind: 0, spin: 0 };
    o.kind = Math.floor(rand() * 3); o.spin = rand() * 6;
    objs.push(o);
  }
  /** Player action: steer toward a point (pointer) or along held directions (keys). */
  function steer(tx: number | null, ty = 0): void { target = tx == null ? null : { x: tx, y: ty }; }

  function update(dt: number): void {
    if (ctx.finished) return;
    ang += dt * 7; time -= dt; if (hurt > 0) hurt -= dt; if (flash > 0) flash -= dt;
    const sp = 175 - r * 0.9;
    let vx = (dir.r ? 1 : 0) - (dir.l ? 1 : 0), vy = (dir.d ? 1 : 0) - (dir.u ? 1 : 0);
    if (vx || vy) { const n = Math.hypot(vx, vy); vx = (vx / n) * sp; vy = (vy / n) * sp; target = null; }
    else if (target) { const dx = target.x - x, dy = target.y - y, d = Math.hypot(dx, dy); if (d > 3) { const s = Math.min(sp, d * 6); vx = (dx / d) * s; vy = (dy / d) * s; } }
    x = Math.min(W - r * 0.6, Math.max(r * 0.6, x + vx * dt)); y = Math.min(H - r * 0.6, Math.max(r * 0.6, y + vy * dt));
    if (objs.length < 15 && rand() < 0.1) spawn();
    for (const o of objs) { o.x += o.vx * dt; o.y += o.vy * dt; o.spin += dt * 3; }
    for (const o of objs) {
      const d = Math.hypot(o.x - x, o.y - y), st = state(o);
      if (st === 'eat' && d < r * 0.85) {
        r = Math.sqrt(r * r + o.r * o.r * 0.55); eaten++; o.r = -1; ctx.sfx('tap'); score += Math.round(o.r + 5); hud();
      } else if (st === 'hurt' && hurt <= 0 && d < r * 0.6 + o.r * 0.7) {
        r = Math.max(5, r * 0.84); hurt = 1.3; flash = 0.3; hits++; ctx.sfx('bad');
        const dx = x - o.x, dy = y - o.y, n = Math.hypot(dx, dy) || 1; x += (dx / n) * 40; y += (dy / n) * 40; hud();
      }
    }
    objs = objs.filter((o) => o.r > 0 && o.x > -90 && o.x < W + 90 && o.y < H + 90);
    if (Math.floor(time * 2) !== Math.floor((time + dt) * 2)) hud();
    if (r >= GOAL) { ctx.sfx('win'); ctx.finish({ result: 'win', score: 500 + Math.round(time * 8) + eaten * 5, title: 'A storm is born', detail: `You swallowed ${eaten} objects and grew into a storm.` }); }
    else if (r < 9) ctx.finish({ result: 'lose', score: eaten * 5, title: 'The wind dies', detail: 'Bigger rocks and wagons tore the whirlwind apart.' });
    else if (time <= 0) ctx.finish({ result: 'lose', score: eaten * 5, title: 'The wind drops', detail: `Calm came before you reached storm size (${Math.round(r)} of ${GOAL}).` });
  }

  function glyph(o: Obj, st: string): void {
    g.save(); g.translate(o.x, o.y); g.rotate(o.spin * (o.kind ? 0.3 : 1));
    if (st === 'eat') {
      g.fillStyle = C.tan; g.strokeStyle = C.rose; g.lineWidth = 3;
      g.beginPath(); g.arc(0, 0, o.r, 0, 7); g.fill(); g.stroke();
      g.strokeStyle = C.saddle; g.lineWidth = 1.5;
      for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(0, 0, o.r * (0.3 + i * 0.14), i, i + 2.6); g.stroke(); }
      g.rotate(-o.spin * (o.kind ? 0.3 : 1)); g.fillStyle = C.rose; star(Math.max(4, o.r * 0.35));
    } else if (st === 'hurt') {
      g.fillStyle = C.ink; g.strokeStyle = C.red; g.lineWidth = 4;
      g.beginPath();
      for (let i = 0; i < 9; i++) { const a = (i / 9) * 6.283, rr = o.r * (i % 2 ? 0.82 : 1.05); g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
      g.closePath(); g.fill(); g.stroke();
      g.rotate(-o.spin * (o.kind ? 0.3 : 1)); g.fillStyle = C.red; g.font = `700 ${Math.max(14, o.r * 0.8)}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('!', 0, 2);
    } else {
      g.strokeStyle = C.smoke; g.fillStyle = C.dusk; g.lineWidth = 2.5; g.setLineDash([5, 4]);
      g.beginPath(); g.arc(0, 0, o.r, 0, 7); g.fill(); g.stroke(); g.setLineDash([]);
    }
    g.restore();
  }
  function star(R: number): void {
    g.beginPath();
    for (let i = 0; i < 10; i++) { const a = -1.5708 + (i * Math.PI) / 5, rr = i % 2 ? R * 0.45 : R; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    g.closePath(); g.fill();
  }
  function draw(): void {
    g.fillStyle = C.night; g.fillRect(0, 0, W, H);
    g.strokeStyle = C.mesa; g.globalAlpha = 0.35; g.lineWidth = 2;
    for (let i = 0; i < 7; i++) { const yy = (i * 97 + ang * 18) % H; g.beginPath(); g.moveTo(30 + i * 60, yy); g.lineTo(80 + i * 60, yy + 16); g.stroke(); }
    g.globalAlpha = 1;
    for (const o of objs) glyph(o, state(o));
    // goal ring: quiet, shows the storm size to reach
    g.strokeStyle = C.mesa; g.lineWidth = 2; g.setLineDash([3, 8]); g.beginPath(); g.arc(x, y, GOAL, 0, 7); g.stroke(); g.setLineDash([]);
    g.save(); g.translate(x, y);
    g.globalAlpha = hurt > 0 && Math.floor(hurt * 12) % 2 ? 0.4 : 1;
    g.fillStyle = C.bone; g.globalAlpha *= 0.22; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.globalAlpha = hurt > 0 && Math.floor(hurt * 12) % 2 ? 0.4 : 1;
    g.strokeStyle = flash > 0 ? C.red : C.bone; g.lineWidth = 3;
    for (let k = 0; k < 3; k++) { g.beginPath(); g.arc(0, 0, r * (0.35 + k * 0.3), ang + k * 2.1, ang + k * 2.1 + 3.6); g.stroke(); }
    g.fillStyle = C.bone; g.beginPath(); g.arc(0, 0, 4, 0, 7); g.fill();
    g.restore(); g.globalAlpha = 1;
    g.fillStyle = C.bone; g.fillRect(14, H - 22, (W - 28) * Math.min(1, (r - START) / (GOAL - START)), 8);
    g.strokeStyle = C.ember; g.lineWidth = 2; g.strokeRect(14, H - 22, W - 28, 8);
  }

  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { e.preventDefault(); const p = cv.pt(e); steer(p.x, p.y); });
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { if (e.buttons || e.pointerType === 'mouse') { const p = cv.pt(e); if (e.buttons || target) steer(p.x, p.y); } });
  ctx.on(cv.el, 'pointerup', (e: PointerEvent) => { if (e.pointerType !== 'mouse') steer(null); });
  ctx.keys({
    ArrowLeft: (d) => { dir.l = d; }, ArrowRight: (d) => { dir.r = d; }, ArrowUp: (d) => { dir.u = d; }, ArrowDown: (d) => { dir.d = d; },
    a: (d) => { dir.l = d; }, d: (d) => { dir.r = d; }, w: (d) => { dir.u = d; }, s: (d) => { dir.d = d; },
  });
  ctx.pad([{ key: 'ArrowLeft', label: '◀' }, { key: 'ArrowUp', label: '▲' }, { key: 'ArrowDown', label: '▼' }, { key: 'ArrowRight', label: '▶' }]);
  ctx.loop(update, draw);

  return {
    destroy() { /* released by the shell */ },
    reset(seed) {
      rand = makeRng(seed); x = W / 2; y = H * 0.7; r = START; time = LIMIT; hurt = 0; flash = 0; ang = 0; eaten = 0; score = 0; hits = 0; objs = []; target = null;
      dir.l = dir.r = dir.u = dir.d = false;
      for (let i = 0; i < 8; i++) { spawn(); const o = objs[objs.length - 1]; o.y = 40 + rand() * (H * 0.55); }
      hud();
    },
    probe: () => ({ x: Math.round(x), y: Math.round(y), r: Math.round(r * 10) / 10, eaten, time: Math.round(time), hits }),
    play(kind: Result) {
      for (let n = 0; n < 9000 && !ctx.finished; n++) {
        let best: Obj | null = null, bd = 1e9;
        for (const o of objs) {
          const st = state(o); if (o.y < 0 || o.y > H) continue;
          if ((kind === 'win' ? st === 'eat' : st === 'hurt')) { const d = Math.hypot(o.x - x, o.y - y); if (d < bd) { bd = d; best = o; } }
        }
        let tx = best ? best.x : x, ty = best ? best.y : y;
        if (kind === 'win') {
          let ax = 0, ay = 0;
          for (const o of objs) if (state(o) !== 'eat') { const dx = x - o.x, dy = y - o.y, d = Math.hypot(dx, dy) || 1, safe = r + o.r + 55; if (d < safe) { ax += (dx / d) * (safe - d) * 3; ay += (dy / d) * (safe - d) * 3; } }
          tx += ax; ty += ay;
        }
        steer(tx, ty); update(1 / 60);
      }
    },
  };
}
