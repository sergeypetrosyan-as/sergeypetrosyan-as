import { T } from '../state/tuning';
import type { Track } from '../state/types';

/** Metres per world unit along the road (a 200-unit segment is 1.33 m). */
export const LON = 1 / 150;
/** Road half width in metres (x = +/-1 in the simulation). */
export const HALF_W = 7.5;
/** Heading change in radians per segment per unit of curve. */
export const HEAD_K = 0.006;
/** Bank angle in radians per unit of curve (positive curve = right turn, banks right side down). */
export const BANK_K = 0.022;
/** Extra rows before segment 0 and after the last segment so the lap wraps seamlessly. */
export const PRE = 260;
export const POST = 520;

export interface Pose {
  x: number;
  y: number;
  z: number;
  head: number;
  bank: number;
  pitch: number;
}

export const newPose = (): Pose => ({ x: 0, y: 0, z: 0, head: 0, bank: 0, pitch: 0 });

/**
 * The simulation's segment list integrated into a real centreline. Row r is the start of
 * segment (r - PRE) in "extended" coordinates, which run from -PRE to n + POST segments.
 * Pure maths: no Three.js, no DOM.
 */
export class TrackPath {
  readonly n: number;
  readonly rows: number;
  readonly px: Float32Array;
  readonly py: Float32Array;
  readonly pz: Float32Array;
  readonly head: Float32Array;
  readonly bank: Float32Array;
  readonly curve: Float32Array;
  private grid = new Map<number, number[]>();
  private static CELL = 40;

  constructor(readonly track: Track) {
    const segs = track.segs;
    const n = segs.length;
    this.n = n;
    this.rows = PRE + n + POST + 1;
    const R = this.rows;
    this.px = new Float32Array(R);
    this.py = new Float32Array(R);
    this.pz = new Float32Array(R);
    this.head = new Float32Array(R);
    this.bank = new Float32Array(R);
    this.curve = new Float32Array(R);
    const seg = (i: number) => segs[((i % n) + n) % n];
    const step = T.SEG_LEN * LON;
    // forward from segment 0
    for (let r = PRE; r < R; r++) {
      const i = r - PRE;
      const s = seg(i);
      this.curve[r] = s.curve;
      this.py[r] = s.y1 * LON;
      if (r > PRE) {
        const h0 = this.head[r - 1];
        const h = h0 + seg(i - 1).curve * HEAD_K;
        const hm = (h0 + h) / 2;
        this.head[r] = h;
        this.px[r] = this.px[r - 1] + Math.sin(hm) * step;
        this.pz[r] = this.pz[r - 1] - Math.cos(hm) * step;
      }
    }
    // backwards for the lead-in rows
    for (let r = PRE - 1; r >= 0; r--) {
      const i = r - PRE;
      const s = seg(i);
      this.curve[r] = s.curve;
      this.py[r] = s.y1 * LON;
      const h1 = this.head[r + 1];
      const h = h1 - s.curve * HEAD_K;
      const hm = (h + h1) / 2;
      this.head[r] = h;
      this.px[r] = this.px[r + 1] - Math.sin(hm) * step;
      this.pz[r] = this.pz[r + 1] + Math.cos(hm) * step;
    }
    // smoothed bank (curve eases in already, a short box filter keeps it calm)
    for (let r = 0; r < R; r++) {
      let acc = 0;
      let cnt = 0;
      for (let k = -6; k <= 6; k++) {
        const q = r + k;
        if (q < 0 || q >= R) continue;
        acc += this.curve[q];
        cnt++;
      }
      this.bank[r] = (acc / cnt) * BANK_K;
    }
    for (let r = 0; r < R; r += 2) this.addGrid(r);
  }

  private key(cx: number, cz: number): number {
    return (cx + 4096) * 8192 + (cz + 4096);
  }

  private addGrid(r: number): void {
    const C = TrackPath.CELL;
    const k = this.key(Math.floor(this.px[r] / C), Math.floor(this.pz[r] / C));
    let a = this.grid.get(k);
    if (!a) this.grid.set(k, (a = []));
    a.push(r);
  }

  /**
   * True when (x, z) is within `clear` metres of any part of the centreline outside rows
   * [ignoreFrom, ignoreTo]. Used to keep buildings off other parts of the road.
   */
  nearRoad(x: number, z: number, clear: number, ignoreFrom = -1, ignoreTo = -1): boolean {
    const C = TrackPath.CELL;
    const span = Math.ceil(clear / C);
    const cx = Math.floor(x / C);
    const cz = Math.floor(z / C);
    const c2 = clear * clear;
    for (let i = -span; i <= span; i++) {
      for (let j = -span; j <= span; j++) {
        const a = this.grid.get(this.key(cx + i, cz + j));
        if (!a) continue;
        for (const r of a) {
          if (r >= ignoreFrom && r <= ignoreTo) continue;
          const dx = this.px[r] - x;
          const dz = this.pz[r] - z;
          if (dx * dx + dz * dz < c2) return true;
        }
      }
    }
    return false;
  }

  /** Lap length in world units. */
  get length(): number {
    return this.n * T.SEG_LEN;
  }

  /** Smallest / largest valid extended progress in world units. */
  get minS(): number {
    return -PRE * T.SEG_LEN;
  }

  get maxS(): number {
    return (this.n + POST) * T.SEG_LEN;
  }

  /** Pose of the centreline at extended progress s (world units). */
  sample(s: number, out: Pose): Pose {
    const f = s / T.SEG_LEN + PRE;
    let r = Math.floor(f);
    if (r < 0) r = 0;
    if (r > this.rows - 2) r = this.rows - 2;
    const t = Math.min(1, Math.max(0, f - r));
    const a = r;
    const b = r + 1;
    out.x = this.px[a] + (this.px[b] - this.px[a]) * t;
    out.y = this.py[a] + (this.py[b] - this.py[a]) * t;
    out.z = this.pz[a] + (this.pz[b] - this.pz[a]) * t;
    out.head = this.head[a] + (this.head[b] - this.head[a]) * t;
    out.bank = this.bank[a] + (this.bank[b] - this.bank[a]) * t;
    out.pitch = Math.atan2(this.py[b] - this.py[a], T.SEG_LEN * LON);
    return out;
  }

  /**
   * World position of a point at lateral offset `lat` (road half widths) and height `up`
   * metres above the banked road surface.
   */
  point(s: number, lat: number, up: number, pose: Pose, out: { x: number; y: number; z: number }): void {
    this.sample(s, pose);
    const rx = Math.cos(pose.head);
    const rz = Math.sin(pose.head);
    const cb = Math.cos(pose.bank);
    const sb = Math.sin(pose.bank);
    const w = lat * HALF_W;
    // banking rotates the cross-section about the forward axis: right side dips for positive bank
    const lx = w * cb + up * sb;
    const ly = -w * sb + up * cb;
    out.x = pose.x + rx * lx;
    out.y = pose.y + ly;
    out.z = pose.z + rz * lx;
  }

  /** Map an absolute race progress to extended coordinates near a reference progress. */
  static local(sAbs: number, refAbs: number, refLocal: number): number {
    return refLocal + (sAbs - refAbs);
  }
}

/** Sizes in metres, exposed for the setup screen's track facts. */
export function trackFacts(track: Track): { lengthKm: number; climbM: number; sharpest: number } {
  let climb = 0;
  let sharp = 0;
  for (const s of track.segs) {
    if (s.y2 > s.y1) climb += (s.y2 - s.y1) * LON;
    sharp = Math.max(sharp, Math.abs(s.curve));
  }
  return { lengthKm: (track.length * LON) / 1000, climbM: climb, sharpest: sharp };
}
