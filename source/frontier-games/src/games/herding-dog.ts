import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Herding Dog: steer the dog; cattle flee from it. Stand behind the herd and push every steer through the gate into the pen before time runs out. */
const W = 480, H = 600, PEN = { x0: 170, x1: 310, y: 96 }, GATE = { x: 240, y: 90 };
const FLEE = 100, DOG_SPEED = 240, COW_R = 11, VMAX = 120;
const ROUNDS = [{ n: 5, t: 55 }, { n: 6, t: 52 }, { n: 7, t: 50 }];

export default function herdingDog(ctx: Ctx): Instance {
  type Cow = { x: number; y: number; vx: number; vy: number; in: boolean; sk: number };
  let rand = makeRng(1);
  let round = 0, left = 0, score = 0, t = 0;
  let dog = { x: W / 2, y: H - 70 }, target: { x: number; y: number } | null = null;
  let cows: Cow[] = [];

  const cv = ctx.canvas(W, H);
  const g = cv.g, c = ctx.c;
  const penned = () => cows.filter((k) => k.in).length;
  function hud(): void { ctx.hud('Herd', `${round + 1}/${ROUNDS.length}`); ctx.hud('Penned', `${penned()}/${cows.length}`); ctx.hud('Time', Math.ceil(left)); }
  function startRound(): void {
    const R = ROUNDS[round]; left = R.t; dog = { x: W / 2, y: H - 70 }; target = null; cows = [];
    while (cows.length < R.n) {
      const x = 50 + rand() * (W - 100), y = 250 + rand() * 260;
      if (cows.every((k) => Math.hypot(k.x - x, k.y - y) > 50)) cows.push({ x, y, vx: 0, vy: 0, in: false, sk: (rand() < 0.5 ? -1 : 1) * (0.25 + rand() * 0.35) });
    }
    hud();
  }
  /** The one player action: send the dog to a spot. */
  function send(x: number, y: number): void { if (!ctx.finished) { target = { x: Math.max(12, Math.min(W - 12, x)), y: Math.max(12, Math.min(H - 12, y)) }; } }

  function update(dt: number): void {
    if (ctx.finished) return;
    t += dt; left -= dt;
    if (target) {
      const dx = target.x - dog.x, dy = target.y - dog.y, d = Math.hypot(dx, dy), s = Math.min(d, DOG_SPEED * dt);
      if (d > 1) { dog.x += (dx / d) * s; dog.y += (dy / d) * s; }
    }
    for (const k of cows) {
      if (k.in) continue;
      const dx = k.x - dog.x, dy = k.y - dog.y, d = Math.hypot(dx, dy) || 1;
      if (d < FLEE) {
        // flee away from the dog, each steer veering a little to one side and drifting toward open ground so none pins itself on a fence
        const f = (1 - d / FLEE) * 620 + 60, ca = Math.cos(k.sk), sa = Math.sin(k.sk);
        let ux = (dx / d) * ca - (dy / d) * sa, uy = (dx / d) * sa + (dy / d) * ca;
        ux += (W / 2 - k.x) * 0.0016; uy += (H * 0.55 - k.y) * 0.0012;
        const ul = Math.hypot(ux, uy) || 1; k.vx += (ux / ul) * f * dt; k.vy += (uy / ul) * f * dt;
      }
      else { k.vx += (rand() - 0.5) * 90 * dt; k.vy += (rand() - 0.5) * 90 * dt; }
      for (const o of cows) { if (o === k) continue; const ox = k.x - o.x, oy = k.y - o.y, od = Math.hypot(ox, oy) || 1; if (od < 26) { k.vx += (ox / od) * 140 * dt; k.vy += (oy / od) * 140 * dt; } }
      // soft fences: steers drift back from the field edge so a push never pins one in a corner for good
      const ex = Math.min(k.x, W - k.x), ey = Math.min(k.y, H - k.y);
      if (ex < 50) k.vx += Math.sign(W / 2 - k.x) * (1 - ex / 50) * 300 * dt;
      if (ey < 50) k.vy += Math.sign(H / 2 - k.y) * (1 - ey / 50) * 300 * dt;
      const damp = Math.pow(0.18, dt); k.vx *= damp; k.vy *= damp;
      const sp = Math.hypot(k.vx, k.vy); if (sp > VMAX) { k.vx *= VMAX / sp; k.vy *= VMAX / sp; }
      const px = k.x;
      k.x += k.vx * dt; k.y += k.vy * dt;
      k.x = Math.max(COW_R, Math.min(W - COW_R, k.x)); k.y = Math.max(COW_R, Math.min(H - COW_R, k.y));
      // pen walls: vertical fences beside the pen, gate open at the bottom
      if (k.y < PEN.y + COW_R) for (const wx of [PEN.x0, PEN.x1]) if (Math.abs(k.x - wx) < COW_R) { k.x = wx + (px < wx ? -COW_R : COW_R); k.vx = 0; }
      if (k.x > PEN.x0 + COW_R && k.x < PEN.x1 - COW_R && k.y < PEN.y - COW_R) { k.in = true; k.vx = k.vy = 0; ctx.sfx('good'); hud(); }
    }
    hud();
    if (penned() === cows.length) {
      score += cows.length * 100 + Math.round(left) * 10; ctx.sfx('win');
      if (round >= ROUNDS.length - 1) ctx.finish({ result: 'win', score, title: 'Every steer penned', detail: `You penned all ${ROUNDS.length} herds.` });
      else { round++; startRound(); }
    } else if (left <= 0) ctx.finish({ result: 'lose', score, title: 'Time ran out', detail: `Herd ${round + 1}: ${penned()} of ${cows.length} steers made it into the pen.` });
  }

  function draw(): void {
    g.fillStyle = c.umber; g.fillRect(0, 0, W, H);
    g.strokeStyle = c.ember; g.lineWidth = 4; g.strokeRect(2, 2, W - 4, H - 4);
    g.fillStyle = c.saddle; for (let i = 0; i < 40; i++) g.fillRect((i * 97) % W, 130 + ((i * 53) % (H - 150)), 14, 2);
    g.fillStyle = c.night; g.fillRect(PEN.x0, 0, PEN.x1 - PEN.x0, PEN.y);
    g.strokeStyle = c.tan; g.lineWidth = 6; g.lineCap = 'round';
    g.beginPath(); g.moveTo(PEN.x0, PEN.y); g.lineTo(PEN.x0, 4); g.lineTo(PEN.x1, 4); g.lineTo(PEN.x1, PEN.y); g.stroke();
    g.fillStyle = c.bone; g.fillRect(PEN.x0 - 5, PEN.y - 4, 10, 14); g.fillRect(PEN.x1 - 5, PEN.y - 4, 10, 14);
    g.fillStyle = c.bone; g.font = '700 13px sans-serif'; g.textAlign = 'center'; g.fillText('PEN', W / 2, 24);
    g.strokeStyle = c.rose; g.lineWidth = 2; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(PEN.x0 + 8, PEN.y + 4); g.lineTo(PEN.x1 - 8, PEN.y + 4); g.stroke(); g.setLineDash([]);
    g.font = '700 22px serif'; g.fillStyle = c.rose; g.fillText('▲', W / 2, PEN.y + 34);
    // flee radius ring: the motif that shows where the herd reacts
    g.strokeStyle = c.rose; g.globalAlpha = 0.45; g.lineWidth = 2; g.setLineDash([4, 6]); g.beginPath(); g.arc(dog.x, dog.y, FLEE, 0, 7); g.stroke(); g.setLineDash([]); g.globalAlpha = 1;
    if (target && Math.hypot(target.x - dog.x, target.y - dog.y) > 6) { g.strokeStyle = c.bone; g.lineWidth = 2; g.beginPath(); g.arc(target.x, target.y, 8, 0, 7); g.stroke(); }
    for (const k of cows) {
      g.fillStyle = k.in ? c.rose : c.tan; g.strokeStyle = c.bone; g.lineWidth = 2;
      g.beginPath(); g.ellipse(k.x, k.y, COW_R + 3, COW_R, 0, 0, 7); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(k.x - 8, k.y - 9); g.lineTo(k.x - 12, k.y - 15); g.moveTo(k.x + 8, k.y - 9); g.lineTo(k.x + 12, k.y - 15); g.stroke();
      g.fillStyle = c.red; g.font = '700 12px serif'; g.fillText('★', k.x, k.y + 4);
    }
    g.fillStyle = c.bone; g.strokeStyle = c.ink; g.lineWidth = 2;
    g.beginPath(); g.arc(dog.x, dog.y, 12, 0, 7); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(dog.x - 11, dog.y - 6); g.lineTo(dog.x - 15, dog.y - 17); g.lineTo(dog.x - 4, dog.y - 10); g.moveTo(dog.x + 11, dog.y - 6); g.lineTo(dog.x + 15, dog.y - 17); g.lineTo(dog.x + 4, dog.y - 10); g.fill(); g.stroke();
    g.fillStyle = c.ink; g.beginPath(); g.arc(dog.x - 4, dog.y - 2, 2, 0, 7); g.arc(dog.x + 4, dog.y - 2, 2, 0, 7); g.fill();
    if (!target) { g.fillStyle = c.bone; g.font = '600 15px sans-serif'; g.fillText('Tap or drag: the dog runs there', W / 2, H - 20); }
  }

  const aim = (e: PointerEvent) => { const p = cv.pt(e); send(p.x, p.y); };
  let down = false;
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { e.preventDefault(); down = true; aim(e); });
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { if (down) aim(e); });
  ctx.on(window, 'pointerup', () => { down = false; });
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; score = 0; t = 0; down = false; startRound(); },
    probe: () => ({ cows: cows.map(k=>[Math.round(k.x),Math.round(k.y),k.in]), round, penned: penned(), dog: [Math.round(dog.x), Math.round(dog.y)], target, left: Math.round(left) }),
    play(kind) {
      for (let n = 0; n < 9000 && !ctx.finished; n++) {
        if (kind === 'win' && n % 6 === 0) {
          const open = cows.filter((k) => !k.in).sort((a, b) => Math.hypot(a.x - GATE.x, a.y - GATE.y) - Math.hypot(b.x - GATE.x, b.y - GATE.y))[0];
          if (open) {
            let aim = { x: GATE.x, y: GATE.y };
            const side = open.y < 130 && (open.x < PEN.x0 || open.x > PEN.x1);
            if (side) aim = { x: W / 2, y: 330 };
            let dx = open.x - aim.x, dy = open.y - aim.y, d = Math.hypot(dx, dy) || 1;
            if (!side && (open.x + (dx / d) * 48 < 24 || open.x + (dx / d) * 48 > W - 24 || open.y + (dy / d) * 48 > H - 24)) { const cx = W / 2 - open.x, cy = H / 2 - open.y, cl = Math.hypot(cx, cy) || 1; const px = -cy / cl, py = cx / cl, sg = (open.x + px * 48 > 24 && open.x + px * 48 < W - 24 && open.y + py * 48 < H - 24) ? 1 : -1; aim = { x: open.x - sg * px, y: open.y - sg * py }; dx = open.x - aim.x; dy = open.y - aim.y; d = Math.hypot(dx, dy) || 1; }
            send(open.x + (dx / d) * 48, open.y + (dy / d) * 48);
          }
        } else if (kind === 'lose' && n === 0) send(W - 20, H - 20);
        update(1 / 60);
      }
    },
  };
}
