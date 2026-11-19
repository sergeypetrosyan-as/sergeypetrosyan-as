import { STEP_HEIGHT, TANK_HEIGHT } from './content.ts';
import type { ArenaDef, Box, Ramp } from './types.ts';

export interface RayHit {
  t: number;
  x: number;
  y: number;
  z: number;
  nx: number;
  ny: number;
  nz: number;
}

/** Thickness of a bridge ramp's deck (non-solid ramps can be driven under). */
export const BRIDGE_THICKNESS = 0.6;

export function rampHeight(r: Ramp, x: number, z: number): number {
  let t: number;
  if (r.axis === 'x') t = (x - r.minX) / (r.maxX - r.minX);
  else t = (z - r.minZ) / (r.maxZ - r.minZ);
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  if (r.dir === -1) t = 1 - t;
  return r.h0 + (r.h1 - r.h0) * t;
}

/**
 * Static arena geometry queries: walkable surface height, tank-vs-world circle
 * resolution and ray casts. The arenas hold ~150 solids, so a flat loop with
 * early-outs is cheaper and simpler than a broadphase structure.
 */
export class CollisionWorld {
  readonly boxes: Box[];
  readonly ramps: Ramp[];
  readonly solidRamps: boolean[];
  readonly half: number;

  constructor(arena: ArenaDef) {
    this.boxes = arena.boxes;
    this.ramps = arena.ramps;
    this.half = arena.half;
    this.solidRamps = arena.ramps.map((r) => r.bridge !== true);
  }

  /** Highest walkable surface under (x, z) that a tank currently at height `y` can stand on. */
  surfaceHeight(x: number, z: number, y: number, step = STEP_HEIGHT): number {
    const limit = y + step;
    let best = 0;
    const boxes = this.boxes;
    for (let i = 0; i < boxes.length; i++) {
      const b = boxes[i];
      if (!b.walkable || b.maxY > limit || b.maxY <= best) continue;
      if (x < b.minX || x > b.maxX || z < b.minZ || z > b.maxZ) continue;
      best = b.maxY;
    }
    const ramps = this.ramps;
    for (let i = 0; i < ramps.length; i++) {
      const r = ramps[i];
      if (x < r.minX || x > r.maxX || z < r.minZ || z > r.maxZ) continue;
      const h = rampHeight(r, x, z);
      if (h <= limit && h > best) best = h;
    }
    return best;
  }

  /** True if a tank-sized circle at (x, y, z) would overlap blocking geometry. */
  circleBlocked(x: number, z: number, y: number, r: number): boolean {
    return this.resolveCircle(_probe.set(x, z), y, r, null);
  }

  /**
   * Pushes the circle at `p` out of every blocking solid. Returns true if any
   * contact occurred; accumulates the push direction into `normal` if given.
   */
  resolveCircle(p: { x: number; z: number }, y: number, r: number, normal: { x: number; z: number } | null): boolean {
    let hit = false;
    const top = y + TANK_HEIGHT;
    const climb = y + STEP_HEIGHT;
    const boxes = this.boxes;
    for (let i = 0; i < boxes.length; i++) {
      const b = boxes[i];
      if (!b.blocksTanks || b.maxY <= climb || b.minY >= top) continue;
      if (p.x < b.minX - r || p.x > b.maxX + r || p.z < b.minZ - r || p.z > b.maxZ + r) continue;
      if (pushOutRect(p, r, b.minX, b.minZ, b.maxX, b.maxZ, normal)) hit = true;
    }
    const ramps = this.ramps;
    for (let i = 0; i < ramps.length; i++) {
      const rp = ramps[i];
      if (p.x < rp.minX - r || p.x > rp.maxX + r || p.z < rp.minZ - r || p.z > rp.maxZ + r) continue;
      // Height of the ramp where the circle first touches it.
      const cx = p.x < rp.minX ? rp.minX : p.x > rp.maxX ? rp.maxX : p.x;
      const cz = p.z < rp.minZ ? rp.minZ : p.z > rp.maxZ ? rp.maxZ : p.z;
      const h = rampHeight(rp, cx, cz);
      if (h <= climb) continue;
      if (!this.solidRamps[i] && h - BRIDGE_THICKNESS >= top) continue;
      const inside = p.x >= rp.minX && p.x <= rp.maxX && p.z >= rp.minZ && p.z <= rp.maxZ;
      // A tank already on the ramp surface is fine; only block entries from below / the sides.
      if (inside && rampHeight(rp, p.x, p.z) <= climb) continue;
      if (pushOutRect(p, r, rp.minX, rp.minZ, rp.maxX, rp.maxZ, normal)) hit = true;
    }
    return hit;
  }

  /**
   * Casts a ray (dir need not be normalised; t is in units of dir) against
   * shot-blocking solids, ramps and the ground plane.
   */
  raycast(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxT: number, out: RayHit | null, shotsOnly = true): boolean {
    let best = maxT;
    let nx = 0, ny = 0, nz = 0;
    let found = false;
    if (dy < -1e-9) {
      const t = -oy / dy;
      if (t >= 0 && t < best) {
        best = t; nx = 0; ny = 1; nz = 0; found = true;
      }
    }
    const ix = 1 / (dx || 1e-12);
    const iy = 1 / (dy || 1e-12);
    const iz = 1 / (dz || 1e-12);
    const boxes = this.boxes;
    for (let i = 0; i < boxes.length; i++) {
      const b = boxes[i];
      if (shotsOnly ? !b.blocksShots : !b.blocksTanks) continue;
      let t1 = (b.minX - ox) * ix;
      let t2 = (b.maxX - ox) * ix;
      let tmin = Math.min(t1, t2);
      let tmax = Math.max(t1, t2);
      let axis = 0;
      t1 = (b.minY - oy) * iy;
      t2 = (b.maxY - oy) * iy;
      let lo = Math.min(t1, t2);
      if (lo > tmin) { tmin = lo; axis = 1; }
      tmax = Math.min(tmax, Math.max(t1, t2));
      t1 = (b.minZ - oz) * iz;
      t2 = (b.maxZ - oz) * iz;
      lo = Math.min(t1, t2);
      if (lo > tmin) { tmin = lo; axis = 2; }
      tmax = Math.min(tmax, Math.max(t1, t2));
      if (tmax < 0 || tmin > tmax || tmin >= best) continue;
      if (tmin < 0) {
        // Origin inside the box: report an immediate hit.
        best = 0; nx = -dx; ny = -dy; nz = -dz; found = true;
        continue;
      }
      best = tmin;
      found = true;
      nx = axis === 0 ? -Math.sign(dx) : 0;
      ny = axis === 1 ? -Math.sign(dy) : 0;
      nz = axis === 2 ? -Math.sign(dz) : 0;
    }
    const ramps = this.ramps;
    for (let i = 0; i < ramps.length; i++) {
      const r = ramps[i];
      // Ramp top as a plane y = a*x + b*z + c.
      let a = 0, bz = 0, c: number;
      const span = r.axis === 'x' ? r.maxX - r.minX : r.maxZ - r.minZ;
      const slope = ((r.h1 - r.h0) / span) * r.dir;
      if (r.axis === 'x') { a = slope; c = r.dir === 1 ? r.h0 - slope * r.minX : r.h0 - slope * r.maxX; }
      else { bz = slope; c = r.dir === 1 ? r.h0 - slope * r.minZ : r.h0 - slope * r.maxZ; }
      const denom = dy - a * dx - bz * dz;
      if (Math.abs(denom) < 1e-9) continue;
      const t = (a * ox + bz * oz + c - oy) / denom;
      if (t < 0 || t >= best) continue;
      const hx = ox + dx * t;
      const hz = oz + dz * t;
      if (hx < r.minX || hx > r.maxX || hz < r.minZ || hz > r.maxZ) continue;
      best = t;
      found = true;
      const len = Math.sqrt(a * a + 1 + bz * bz);
      nx = -a / len; ny = 1 / len; nz = -bz / len;
      if (denom > 0) { nx = -nx; ny = -ny; nz = -nz; }
    }
    if (found && out) {
      out.t = best;
      out.x = ox + dx * best;
      out.y = oy + dy * best;
      out.z = oz + dz * best;
      const nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      out.nx = nx / nl; out.ny = ny / nl; out.nz = nz / nl;
    }
    return found;
  }

  /** Line of sight between two points (shot-blocking geometry only). */
  segmentClear(ax: number, ay: number, az: number, bx: number, by: number, bz: number): boolean {
    return !this.raycast(ax, ay, az, bx - ax, by - ay, bz - az, 0.999, null, true);
  }
}

const _probe = {
  x: 0,
  z: 0,
  set(x: number, z: number) {
    this.x = x;
    this.z = z;
    return this;
  },
};

function pushOutRect(p: { x: number; z: number }, r: number, minX: number, minZ: number, maxX: number, maxZ: number, normal: { x: number; z: number } | null): boolean {
  const cx = p.x < minX ? minX : p.x > maxX ? maxX : p.x;
  const cz = p.z < minZ ? minZ : p.z > maxZ ? maxZ : p.z;
  let dx = p.x - cx;
  let dz = p.z - cz;
  const d2 = dx * dx + dz * dz;
  if (d2 >= r * r) return false;
  if (d2 > 1e-10) {
    const d = Math.sqrt(d2);
    dx /= d;
    dz /= d;
    const push = r - d;
    p.x += dx * push;
    p.z += dz * push;
    if (normal) { normal.x += dx; normal.z += dz; }
    return true;
  }
  // Centre inside the rectangle: leave by the shallowest side.
  const l = p.x - minX, rt = maxX - p.x, b = p.z - minZ, t = maxZ - p.z;
  const m = Math.min(l, rt, b, t);
  if (m === l) { p.x = minX - r; if (normal) normal.x -= 1; }
  else if (m === rt) { p.x = maxX + r; if (normal) normal.x += 1; }
  else if (m === b) { p.z = minZ - r; if (normal) normal.z -= 1; }
  else { p.z = maxZ + r; if (normal) normal.z += 1; }
  return true;
}
