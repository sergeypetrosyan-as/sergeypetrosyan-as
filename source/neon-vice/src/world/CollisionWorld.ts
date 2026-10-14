import { PLAYER } from '../game/GameConfig';

export interface Box {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  /** Solid for movement. Camera-only boxes (e.g. thin canopies) set this false. */
  solid: boolean;
  stamp: number;
}

export interface RayHit {
  dist: number;
  nx: number;
  ny: number;
  nz: number;
}

const CELL = 8;
const EXTENT = 136; // grid covers [-EXTENT, EXTENT] on x and z
const DIM = Math.ceil((EXTENT * 2) / CELL);

/** Result object reused by `resolveCircle` to avoid per-frame allocation. */
export interface PushResult {
  hit: boolean;
  nx: number;
  nz: number;
}

/**
 * Static world collision: axis-aligned boxes bucketed in a uniform XZ grid.
 * Supports circle push-out (characters, car hulls), ground height queries for
 * standing on low props, and ray casts (bullets, line of sight, camera).
 */
export class CollisionWorld {
  readonly boxes: Box[] = [];
  private readonly cells: Box[][] = Array.from({ length: DIM * DIM }, () => []);
  private stamp = 1;
  private readonly scratch: Box[] = [];

  /** Navigation grid for enemy path finding (flow field toward the player). */
  readonly nav = new NavGrid();

  bounds = { minX: -110, maxX: 112, minZ: -110, maxZ: 110 };

  addBox(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, solid = true): Box {
    const box: Box = { minX, minY, minZ, maxX, maxY, maxZ, solid, stamp: 0 };
    this.boxes.push(box);
    const [c0, c1] = [this.cellIndex(minX), this.cellIndex(maxX)];
    const [r0, r1] = [this.cellIndex(minZ), this.cellIndex(maxZ)];
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) this.cells[r * DIM + c].push(box);
    return box;
  }

  /** Box centred on (x, z) with footprint w × d, rotated by 0 or 90° only. */
  addCentered(x: number, z: number, w: number, d: number, h: number, y0 = 0, solid = true): Box {
    return this.addBox(x - w / 2, y0, z - d / 2, x + w / 2, y0 + h, z + d / 2, solid);
  }

  private cellIndex(v: number): number {
    return Math.min(DIM - 1, Math.max(0, Math.floor((v + EXTENT) / CELL)));
  }

  /** Collects unique boxes overlapping an XZ rectangle into the shared scratch array. */
  query(minX: number, minZ: number, maxX: number, maxZ: number): Box[] {
    const out = this.scratch;
    out.length = 0;
    const s = ++this.stamp;
    const c0 = this.cellIndex(minX), c1 = this.cellIndex(maxX);
    const r0 = this.cellIndex(minZ), r1 = this.cellIndex(maxZ);
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const cell = this.cells[r * DIM + c];
        for (let i = 0; i < cell.length; i++) {
          const b = cell[i];
          if (b.stamp === s) continue;
          b.stamp = s;
          if (b.maxX < minX || b.minX > maxX || b.maxZ < minZ || b.minZ > maxZ) continue;
          out.push(b);
        }
      }
    }
    return out;
  }

  /**
   * Pushes a vertical cylinder (centre x/z, radius, vertical span) out of all
   * solid boxes it overlaps. Mutates `pos` and reports the dominant push normal.
   */
  resolveCircle(pos: { x: number; z: number }, radius: number, yBottom: number, yTop: number, out: PushResult): PushResult {
    out.hit = false;
    out.nx = 0;
    out.nz = 0;
    for (let iter = 0; iter < 3; iter++) {
      const boxes = this.query(pos.x - radius, pos.z - radius, pos.x + radius, pos.z + radius);
      let moved = false;
      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (!b.solid || b.maxY <= yBottom || b.minY >= yTop) continue;
        const cx = Math.max(b.minX, Math.min(pos.x, b.maxX));
        const cz = Math.max(b.minZ, Math.min(pos.z, b.maxZ));
        let dx = pos.x - cx;
        let dz = pos.z - cz;
        const d2 = dx * dx + dz * dz;
        if (d2 >= radius * radius) continue;
        let nx: number, nz: number, push: number;
        if (d2 > 1e-8) {
          const d = Math.sqrt(d2);
          nx = dx / d;
          nz = dz / d;
          push = radius - d;
        } else {
          // Centre is inside the box: push out along the axis of least penetration.
          const px1 = pos.x - b.minX, px2 = b.maxX - pos.x;
          const pz1 = pos.z - b.minZ, pz2 = b.maxZ - pos.z;
          const m = Math.min(px1, px2, pz1, pz2);
          dx = m === px1 ? -1 : m === px2 ? 1 : 0;
          dz = m === pz1 ? -1 : m === pz2 ? 1 : 0;
          nx = dx;
          nz = dz;
          push = m + radius;
        }
        pos.x += nx * push;
        pos.z += nz * push;
        out.hit = true;
        out.nx += nx;
        out.nz += nz;
        moved = true;
      }
      if (!moved) break;
    }
    const b = this.bounds;
    if (pos.x < b.minX + radius) { pos.x = b.minX + radius; out.hit = true; out.nx += 1; }
    if (pos.x > b.maxX - radius) { pos.x = b.maxX - radius; out.hit = true; out.nx -= 1; }
    if (pos.z < b.minZ + radius) { pos.z = b.minZ + radius; out.hit = true; out.nz += 1; }
    if (pos.z > b.maxZ - radius) { pos.z = b.maxZ - radius; out.hit = true; out.nz -= 1; }
    const len = Math.hypot(out.nx, out.nz);
    if (len > 0) { out.nx /= len; out.nz /= len; }
    return out;
  }

  /** Highest walkable surface under a circle that is at most `stepUp` above `fromY`. */
  groundHeight(x: number, z: number, radius: number, fromY: number, stepUp = PLAYER.stepHeight): number {
    let h = 0;
    const boxes = this.query(x - radius * 0.7, z - radius * 0.7, x + radius * 0.7, z + radius * 0.7);
    for (let i = 0; i < boxes.length; i++) {
      const b = boxes[i];
      if (!b.solid || b.maxY > fromY + stepUp || b.maxY <= h) continue;
      if (x + radius * 0.7 < b.minX || x - radius * 0.7 > b.maxX || z + radius * 0.7 < b.minZ || z - radius * 0.7 > b.maxZ) continue;
      h = b.maxY;
    }
    return h;
  }

  /**
   * Ray cast against boxes and the ground plane (y = 0). Walks the grid cells
   * the ray crosses (2D DDA) and stops once a hit is closer than the next cell.
   */
  raycast(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxDist: number, out: RayHit, includeNonSolid = true): boolean {
    let best = maxDist;
    let found = false;
    if (dy < -1e-6) {
      const t = -oy / dy;
      if (t >= 0 && t < best) {
        best = t;
        found = true;
        out.nx = 0; out.ny = 1; out.nz = 0;
      }
    }
    const s = ++this.stamp;
    let cx = this.cellIndex(ox), cz = this.cellIndex(oz);
    const stepX = dx > 0 ? 1 : -1, stepZ = dz > 0 ? 1 : -1;
    const invDx = Math.abs(dx) > 1e-9 ? 1 / dx : Infinity;
    const invDz = Math.abs(dz) > 1e-9 ? 1 / dz : Infinity;
    const nextBoundX = (cx + (stepX > 0 ? 1 : 0)) * CELL - EXTENT;
    const nextBoundZ = (cz + (stepZ > 0 ? 1 : 0)) * CELL - EXTENT;
    let tMaxX = invDx === Infinity ? Infinity : (nextBoundX - ox) * invDx;
    let tMaxZ = invDz === Infinity ? Infinity : (nextBoundZ - oz) * invDz;
    const tDeltaX = invDx === Infinity ? Infinity : CELL * Math.abs(invDx);
    const tDeltaZ = invDz === Infinity ? Infinity : CELL * Math.abs(invDz);
    let tCell = 0;
    for (let guard = 0; guard < 128; guard++) {
      const cell = this.cells[cz * DIM + cx];
      for (let i = 0; i < cell.length; i++) {
        const b = cell[i];
        if (b.stamp === s) continue;
        b.stamp = s;
        if (!includeNonSolid && !b.solid) continue;
        const t = rayBox(ox, oy, oz, invDx, dy, invDz, dx, dz, b, best, out);
        if (t >= 0) { best = t; found = true; }
      }
      if (best <= tCell) break;
      if (tMaxX < tMaxZ) { tCell = tMaxX; tMaxX += tDeltaX; cx += stepX; }
      else { tCell = tMaxZ; tMaxZ += tDeltaZ; cz += stepZ; }
      if (tCell > best || cx < 0 || cz < 0 || cx >= DIM || cz >= DIM) break;
    }
    if (found) out.dist = best;
    return found;
  }

  /** True when nothing solid blocks the segment between two points. */
  lineOfSight(ax: number, ay: number, az: number, bx: number, by: number, bz: number, hit: RayHit): boolean {
    const dx = bx - ax, dy = by - ay, dz = bz - az;
    const len = Math.hypot(dx, dy, dz);
    if (len < 1e-4) return true;
    return !this.raycast(ax, ay, az, dx / len, dy / len, dz / len, len, hit, false);
  }

  buildNav(): void {
    this.nav.build(this);
  }
}

function rayBox(ox: number, oy: number, oz: number, invDx: number, dy: number, invDz: number, dx: number, dz: number, b: Box, maxT: number, out: RayHit): number {
  let tmin = 0, tmax = maxT;
  let nx = 0, ny = 0, nz = 0;
  // X slab
  if (invDx === Infinity) {
    if (ox < b.minX || ox > b.maxX) return -1;
  } else {
    let t1 = (b.minX - ox) * invDx, t2 = (b.maxX - ox) * invDx;
    if (t1 > t2) { const tt = t1; t1 = t2; t2 = tt; }
    if (t1 > tmin) { tmin = t1; nx = -Math.sign(dx); ny = 0; nz = 0; }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return -1;
  }
  // Y slab
  if (Math.abs(dy) < 1e-9) {
    if (oy < b.minY || oy > b.maxY) return -1;
  } else {
    const inv = 1 / dy;
    let t1 = (b.minY - oy) * inv, t2 = (b.maxY - oy) * inv;
    if (t1 > t2) { const tt = t1; t1 = t2; t2 = tt; }
    if (t1 > tmin) { tmin = t1; nx = 0; ny = -Math.sign(dy); nz = 0; }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return -1;
  }
  // Z slab
  if (invDz === Infinity) {
    if (oz < b.minZ || oz > b.maxZ) return -1;
  } else {
    let t1 = (b.minZ - oz) * invDz, t2 = (b.maxZ - oz) * invDz;
    if (t1 > t2) { const tt = t1; t1 = t2; t2 = tt; }
    if (t1 > tmin) { tmin = t1; nx = 0; ny = 0; nz = -Math.sign(dz); }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return -1;
  }
  if (tmin <= 0 || tmin >= maxT) return -1;
  out.nx = nx; out.ny = ny; out.nz = nz;
  return tmin;
}

const NAV_CELL = 2;
const NAV_MIN = -112;
const NAV_DIM = 114;

/**
 * Coarse occupancy grid + BFS distance field from the player's cell. Enemies
 * read the field to route around buildings without per-enemy path searches.
 */
export class NavGrid {
  readonly blocked = new Uint8Array(NAV_DIM * NAV_DIM);
  readonly dist = new Uint16Array(NAV_DIM * NAV_DIM);
  private readonly queue = new Int32Array(NAV_DIM * NAV_DIM);
  readonly openCells: number[] = [];

  build(world: CollisionWorld): void {
    const r = 0.45;
    for (let gz = 0; gz < NAV_DIM; gz++) {
      for (let gx = 0; gx < NAV_DIM; gx++) {
        const x0 = NAV_MIN + gx * NAV_CELL, z0 = NAV_MIN + gz * NAV_CELL;
        const x1 = x0 + NAV_CELL, z1 = z0 + NAV_CELL;
        const b = world.bounds;
        let blocked = x0 < b.minX || x1 > b.maxX || z0 < b.minZ || z1 > b.maxZ;
        if (!blocked) {
          const boxes = world.query(x0 - r, z0 - r, x1 + r, z1 + r);
          for (const box of boxes) {
            if (box.solid && box.minY < 1.4 && box.maxY > PLAYER.stepHeight) { blocked = true; break; }
          }
        }
        const i = gz * NAV_DIM + gx;
        this.blocked[i] = blocked ? 1 : 0;
        if (!blocked) this.openCells.push(i);
      }
    }
  }

  cellOf(x: number, z: number): number {
    const gx = Math.min(NAV_DIM - 1, Math.max(0, Math.floor((x - NAV_MIN) / NAV_CELL)));
    const gz = Math.min(NAV_DIM - 1, Math.max(0, Math.floor((z - NAV_MIN) / NAV_CELL)));
    return gz * NAV_DIM + gx;
  }

  cellCenter(i: number, out: { x: number; z: number }): void {
    out.x = NAV_MIN + ((i % NAV_DIM) + 0.5) * NAV_CELL;
    out.z = NAV_MIN + (Math.floor(i / NAV_DIM) + 0.5) * NAV_CELL;
  }

  /** Breadth-first distance field from the target position (8-connected, no corner cutting). */
  computeField(x: number, z: number): void {
    const dist = this.dist;
    dist.fill(0xffff);
    let start = this.cellOf(x, z);
    if (this.blocked[start]) start = this.nearestOpen(start);
    if (start < 0) return;
    let head = 0, tail = 0;
    dist[start] = 0;
    this.queue[tail++] = start;
    while (head < tail) {
      const i = this.queue[head++];
      const gx = i % NAV_DIM, gz = (i - gx) / NAV_DIM;
      const d = dist[i];
      if (d > 140) continue; // far cells keep the sentinel; enemies there walk straight
      for (let oz = -1; oz <= 1; oz++) {
        for (let ox = -1; ox <= 1; ox++) {
          if (!ox && !oz) continue;
          const nx = gx + ox, nz = gz + oz;
          if (nx < 0 || nz < 0 || nx >= NAV_DIM || nz >= NAV_DIM) continue;
          const j = nz * NAV_DIM + nx;
          if (this.blocked[j] || dist[j] !== 0xffff) continue;
          if (ox && oz && (this.blocked[gz * NAV_DIM + nx] || this.blocked[nz * NAV_DIM + gx])) continue;
          dist[j] = d + 1;
          this.queue[tail++] = j;
        }
      }
    }
  }

  private nearestOpen(i: number): number {
    const gx = i % NAV_DIM, gz = Math.floor(i / NAV_DIM);
    for (let r = 1; r < 6; r++) {
      for (let oz = -r; oz <= r; oz++) for (let ox = -r; ox <= r; ox++) {
        const nx = gx + ox, nz = gz + oz;
        if (nx < 0 || nz < 0 || nx >= NAV_DIM || nz >= NAV_DIM) continue;
        const j = nz * NAV_DIM + nx;
        if (!this.blocked[j]) return j;
      }
    }
    return -1;
  }

  /**
   * Writes the direction toward the lowest-distance neighbour into `out`.
   * Returns false when the position is outside the computed field.
   */
  steer(x: number, z: number, out: { x: number; z: number }): boolean {
    const i = this.cellOf(x, z);
    const d0 = this.dist[i];
    const gx = i % NAV_DIM, gz = (i - gx) / NAV_DIM;
    let best = d0, bx = 0, bz = 0;
    for (let oz = -1; oz <= 1; oz++) {
      for (let ox = -1; ox <= 1; ox++) {
        if (!ox && !oz) continue;
        const nx = gx + ox, nz = gz + oz;
        if (nx < 0 || nz < 0 || nx >= NAV_DIM || nz >= NAV_DIM) continue;
        const j = nz * NAV_DIM + nx;
        if (this.blocked[j]) continue;
        if (ox && oz && (this.blocked[gz * NAV_DIM + nx] || this.blocked[nz * NAV_DIM + gx])) continue;
        if (this.dist[j] < best) { best = this.dist[j]; bx = ox; bz = oz; }
      }
    }
    if (best === 0xffff || (bx === 0 && bz === 0)) return false;
    const tx = NAV_MIN + (gx + bx + 0.5) * NAV_CELL - x;
    const tz = NAV_MIN + (gz + bz + 0.5) * NAV_CELL - z;
    const len = Math.hypot(tx, tz) || 1;
    out.x = tx / len;
    out.z = tz / len;
    return true;
  }

  distanceAt(x: number, z: number): number {
    return this.dist[this.cellOf(x, z)];
  }
}
