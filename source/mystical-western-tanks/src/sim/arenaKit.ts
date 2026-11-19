import type { Box, Decor, Ramp, SurfaceMat } from './types.ts';

type Trim = 'cyan' | 'magenta' | 'amber' | 'none';

export interface BoxOpts {
  blocksTanks?: boolean;
  blocksShots?: boolean;
  walkable?: boolean;
  trim?: Trim;
  hidden?: boolean;
}

/** Shipping container footprint (long side along X unless rotated). */
export const CONTAINER = { l: 6.1, w: 2.5, h: 2.6 };

/**
 * Helper for authoring arenas in code. Everything the arenas place goes
 * through here, which also makes rotational mirroring for fair layouts easy:
 * `mirror` repeats a builder call with (x, z) → (-x, -z).
 */
export class ArenaBuilder {
  readonly boxes: Box[] = [];
  readonly ramps: Ramp[] = [];
  readonly decor: Decor[] = [];

  solid(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, mat: SurfaceMat, o: BoxOpts = {}): Box {
    const b: Box = {
      minX: Math.min(minX, maxX), minY: Math.min(minY, maxY), minZ: Math.min(minZ, maxZ),
      maxX: Math.max(minX, maxX), maxY: Math.max(minY, maxY), maxZ: Math.max(minZ, maxZ),
      mat,
      blocksTanks: o.blocksTanks ?? true,
      blocksShots: o.blocksShots ?? true,
      // Low cover is never a driving surface; anything container-height or taller is.
      walkable: o.walkable ?? Math.abs(maxY - minY) >= 2.4,
      trim: o.trim ?? 'none',
      hidden: o.hidden,
    };
    this.boxes.push(b);
    return b;
  }

  /** Block standing on `base`, centred at (cx, cz). */
  block(cx: number, cz: number, w: number, d: number, h: number, mat: SurfaceMat, o: BoxOpts = {}, base = 0): Box {
    return this.solid(cx - w / 2, base, cz - d / 2, cx + w / 2, base + h, cz + d / 2, mat, o);
  }

  /** A stack of `n` containers. `alongZ` rotates the long side onto the Z axis. */
  container(cx: number, cz: number, alongZ: boolean, n: number, mat: SurfaceMat, base = 0): void {
    const w = alongZ ? CONTAINER.w : CONTAINER.l;
    const d = alongZ ? CONTAINER.l : CONTAINER.w;
    for (let i = 0; i < n; i++) {
      this.block(cx, cz, w, d, CONTAINER.h, i % 2 === 0 ? mat : altContainer(mat), { trim: i === n - 1 ? trimFor(mat) : 'none' }, base + i * CONTAINER.h);
    }
  }

  /**
   * A ramp whose low end is centred at (x, z) and climbs `length` metres along
   * `axis` in direction `dir` from h0 to h1. Solid ramps get side rails.
   */
  ramp(x: number, z: number, axis: 'x' | 'z', dir: 1 | -1, length: number, width: number, h0: number, h1: number, mat: SurfaceMat, opts: { bridge?: boolean; rails?: boolean } = {}): Ramp {
    let minX: number, maxX: number, minZ: number, maxZ: number;
    if (axis === 'x') {
      minZ = z - width / 2; maxZ = z + width / 2;
      if (dir === 1) { minX = x; maxX = x + length; } else { minX = x - length; maxX = x; }
    } else {
      minX = x - width / 2; maxX = x + width / 2;
      if (dir === 1) { minZ = z; maxZ = z + length; } else { minZ = z - length; maxZ = z; }
    }
    const r: Ramp = { minX, maxX, minZ, maxZ, axis, dir, h0, h1, mat, bridge: opts.bridge };
    this.ramps.push(r);
    if (opts.rails ?? true) this.rails(r);
    return r;
  }

  /** Stepped guard rails along both long sides of a ramp so tanks stay on it. */
  private rails(r: Ramp): void {
    const segs = 5;
    const t = 0.45;
    for (let s = 0; s < segs; s++) {
      const a0 = s / segs;
      const a1 = (s + 1) / segs;
      const top = r.h0 + (r.h1 - r.h0) * a1 + 1.15;
      const bottom = r.bridge ? Math.max(0, r.h0 + (r.h1 - r.h0) * a0 - 0.6) : 0;
      if (r.axis === 'x') {
        const span = r.maxX - r.minX;
        const x0 = r.dir === 1 ? r.minX + span * a0 : r.maxX - span * a1;
        const x1 = r.dir === 1 ? r.minX + span * a1 : r.maxX - span * a0;
        this.solid(x0, bottom, r.minZ - t, x1, top, r.minZ, 'trim', { walkable: false, trim: 'none' });
        this.solid(x0, bottom, r.maxZ, x1, top, r.maxZ + t, 'trim', { walkable: false, trim: 'none' });
      } else {
        const span = r.maxZ - r.minZ;
        const z0 = r.dir === 1 ? r.minZ + span * a0 : r.maxZ - span * a1;
        const z1 = r.dir === 1 ? r.minZ + span * a1 : r.maxZ - span * a0;
        this.solid(r.minX - t, bottom, z0, r.minX, top, z1, 'trim', { walkable: false, trim: 'none' });
        this.solid(r.maxX, bottom, z0, r.maxX + t, top, z1, 'trim', { walkable: false, trim: 'none' });
      }
    }
  }

  /** Low guard wall along a platform edge, leaving gaps where the caller wants openings. */
  rail(minX: number, minZ: number, maxX: number, maxZ: number, base: number, h = 1.2): void {
    this.solid(minX, base, minZ, maxX, base + h, maxZ, 'trim', { walkable: false });
  }

  /** Walls just outside the playable square. */
  boundary(half: number, h: number): void {
    const t = 2;
    this.solid(-half - t, 0, -half - t, half + t, h, -half, 'boundary', { walkable: false, trim: 'cyan' });
    this.solid(-half - t, 0, half, half + t, h, half + t, 'boundary', { walkable: false, trim: 'cyan' });
    this.solid(-half - t, 0, -half, -half, h, half, 'boundary', { walkable: false, trim: 'cyan' });
    this.solid(half, 0, -half, half + t, h, half, 'boundary', { walkable: false, trim: 'cyan' });
  }

  /** Runs `fn` twice: as authored and rotated 180° about the arena centre. */
  mirror(fn: (s: 1 | -1) => void): void {
    fn(1);
    fn(-1);
  }
}

function altContainer(mat: SurfaceMat): SurfaceMat {
  switch (mat) {
    case 'containerCyan': return 'containerSteel';
    case 'containerMagenta': return 'containerAmber';
    case 'containerSteel': return 'containerCyan';
    default: return 'containerMagenta';
  }
}

function trimFor(mat: SurfaceMat): Trim {
  if (mat === 'containerMagenta' || mat === 'containerAmber') return 'magenta';
  return 'cyan';
}
