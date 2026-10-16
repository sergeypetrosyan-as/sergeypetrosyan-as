// A simple deterministic bot used by tests and the #demo poster mode: kites away from threats, drifts to motes.
import type { Input, World } from './types.ts';
import { emptyInput } from './world.ts';

export function botInput(w: World, inp: Input = emptyInput()): Input {
  const p = w.player;
  let fx = 0;
  let fy = 0;
  let near = 0;
  for (const e of w.enemies.list) {
    if (!e.alive) continue;
    const dx = p.x - e.x;
    const dy = p.y - e.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < 260 * 260) {
      const d = Math.sqrt(d2) || 1;
      const k = (e.kind === 'warden' ? 3 : 1) / (d + 20);
      fx += (dx / d) * k * 100;
      fy += (dy / d) * k * 100;
      if (d < 140) near++;
    }
  }
  for (const b of w.bullets.list) {
    if (!b.alive || b.friendly) continue;
    const dx = p.x - b.x;
    const dy = p.y - b.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < 120 * 120) {
      const d = Math.sqrt(d2) || 1;
      const sp = Math.hypot(b.vx, b.vy) || 1;
      const side = dx * -b.vy + dy * b.vx > 0 ? 1 : -1;
      fx += (-b.vy / sp) * side * (60 / d);
      fy += (b.vx / sp) * side * (60 / d);
    }
  }
  for (const h of w.hazards.list) {
    const d = Math.hypot(p.x - h.x, p.y - h.y);
    if (h.kind === 'pool' && d < h.r + 60) {
      fx += ((p.x - h.x) / (d || 1)) * 2;
      fy += ((p.y - h.y) / (d || 1)) * 2;
    }
  }
  if (near === 0) {
    let best = 1e9;
    for (const o of w.pickups.list) {
      const d = Math.hypot(o.x - p.x, o.y - p.y);
      if (d < best && d < 400) {
        best = d;
        fx += ((o.x - p.x) / d) * 0.6;
        fy += ((o.y - p.y) / d) * 0.6;
      }
    }
  }
  const edge = w.arena === 'foundry' ? 1300 : 1200;
  const pd = Math.hypot(p.x, p.y);
  if (pd > edge - 300) {
    fx -= (p.x / pd) * 1.5;
    fy -= (p.y / pd) * 1.5;
  }
  const m = Math.hypot(fx, fy);
  inp.mx = m > 0.02 ? fx / m : 0;
  inp.my = m > 0.02 ? fy / m : 0;
  inp.hasAim = false;
  inp.release = w.levels.detonation > 0 && p.reserve > 70 && near >= 4;
  inp.toggleHold = false;
  return inp;
}
