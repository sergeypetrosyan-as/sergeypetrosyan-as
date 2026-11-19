import type { WeaponDef } from './content.ts';
import type { Tank } from './tank.ts';

export interface Projectile {
  active: boolean;
  /** Stable slot index (render pools key off it). */
  slot: number;
  /** Bumped on every reuse so views can detect a new shot in the same slot. */
  serial: number;
  owner: number;
  weapon: WeaponDef;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  /** Where the shot left the muzzle (rail beams). */
  ox: number;
  oy: number;
  oz: number;
  life: number;
  dmgMult: number;
}

/** Fixed-size projectile pool; the oldest shot is recycled if it ever fills. */
export class ProjectilePool {
  readonly items: Projectile[] = [];
  private cursor = 0;
  private serials = 0;

  constructor(size: number, placeholder: WeaponDef) {
    for (let i = 0; i < size; i++) {
      this.items.push({ active: false, slot: i, serial: 0, owner: -1, weapon: placeholder, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, ox: 0, oy: 0, oz: 0, life: 0, dmgMult: 1 });
    }
  }

  spawn(owner: Tank, x: number, y: number, z: number, dx: number, dy: number, dz: number, w: WeaponDef, dmgMult: number): Projectile {
    const n = this.items.length;
    let p: Projectile | null = null;
    for (let i = 0; i < n; i++) {
      const c = this.items[(this.cursor + i) % n];
      if (!c.active) { p = c; this.cursor = (c.slot + 1) % n; break; }
    }
    if (!p) { p = this.items[this.cursor]; this.cursor = (this.cursor + 1) % n; }
    p.active = true;
    p.serial = ++this.serials;
    p.owner = owner.id;
    p.weapon = w;
    p.x = p.ox = x;
    p.y = p.oy = y;
    p.z = p.oz = z;
    p.vx = dx * w.speed;
    p.vy = dy * w.speed;
    p.vz = dz * w.speed;
    p.life = w.lifetime;
    p.dmgMult = dmgMult;
    return p;
  }

  clear(): void {
    for (const p of this.items) p.active = false;
  }
}

/**
 * Segment (p0 → p0 + d·t, t∈[0,1]) against a sphere; returns t of first contact or -1.
 */
export function segmentSphere(px: number, py: number, pz: number, dx: number, dy: number, dz: number, cx: number, cy: number, cz: number, r: number): number {
  const mx = px - cx, my = py - cy, mz = pz - cz;
  const a = dx * dx + dy * dy + dz * dz;
  const b = mx * dx + my * dy + mz * dz;
  const c = mx * mx + my * my + mz * mz - r * r;
  if (c <= 0) return 0;
  if (b > 0 || a < 1e-12) return -1;
  const disc = b * b - a * c;
  if (disc < 0) return -1;
  const t = (-b - Math.sqrt(disc)) / a;
  return t >= 0 && t <= 1 ? t : -1;
}

/**
 * First contact of a segment with a tank's hit volume (two hull spheres plus
 * the turret). Returns t in [0,1] or -1.
 */
export function segmentTank(t: Tank, px: number, py: number, pz: number, dx: number, dy: number, dz: number): number {
  const h = t.hull;
  const fx = Math.sin(t.heading), fz = Math.cos(t.heading);
  const off = h.length * 0.24;
  const r = h.width * 0.5;
  const cy = t.y + 0.95;
  let best = -1;
  let s = segmentSphere(px, py, pz, dx, dy, dz, t.x + fx * off, cy, t.z + fz * off, r);
  if (s >= 0) best = s;
  s = segmentSphere(px, py, pz, dx, dy, dz, t.x - fx * off, cy, t.z - fz * off, r);
  if (s >= 0 && (best < 0 || s < best)) best = s;
  s = segmentSphere(px, py, pz, dx, dy, dz, t.x, t.y + h.turretHeight + 0.35, t.z, 1.15);
  if (s >= 0 && (best < 0 || s < best)) best = s;
  return best;
}
