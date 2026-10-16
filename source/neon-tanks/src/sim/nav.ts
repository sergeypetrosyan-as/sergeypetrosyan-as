import { STEP_HEIGHT } from './content.ts';
import type { CollisionWorld } from './collision.ts';
import type { ArenaDef } from './types.ts';

export interface NavNode {
  id: number;
  x: number;
  y: number;
  z: number;
  /** Directed edges (drops off ledges are one-way). */
  edges: number[];
  costs: number[];
}

/** Clearance used when testing whether an edge is drivable. */
const CLEARANCE = 2.0;
const GRID = 5;
const LINK = 7.6;

/**
 * Waypoint graph generated from the arena geometry: a ground grid, grids on
 * every walkable top, and nodes along each ramp. Two nodes link when a tank can
 * actually drive between them (sampled height continuity + clearance), so the
 * graph follows the real collision model on every level.
 */
export class NavGraph {
  readonly nodes: NavNode[] = [];
  private readonly world: CollisionWorld;
  // A* scratch buffers, reused between searches.
  private g = new Float64Array(0);
  private f = new Float64Array(0);
  private came = new Int32Array(0);
  private stamp = new Int32Array(0);
  private closed = new Int32Array(0);
  private search = 0;
  private heapN: number[] = [];
  private heapK: number[] = [];

  constructor(arena: ArenaDef, world: CollisionWorld) {
    this.world = world;
    const half = arena.half - 3;
    const add = (x: number, z: number, yRef: number): void => {
      const y = world.surfaceHeight(x, z, yRef);
      if (Math.abs(y - yRef) > 0.6) return;
      if (world.circleBlocked(x, z, y, CLEARANCE)) return;
      for (const n of this.nodes) if (Math.abs(n.x - x) < 1.5 && Math.abs(n.z - z) < 1.5 && Math.abs(n.y - y) < 1) return;
      this.nodes.push({ id: this.nodes.length, x, y, z, edges: [], costs: [] });
    };
    for (let x = -half; x <= half + 0.01; x += GRID) for (let z = -half; z <= half + 0.01; z += GRID) add(x, z, 0);
    for (const b of arena.boxes) {
      if (!b.walkable || !b.blocksTanks || b.maxY < 1.5) continue;
      const w = b.maxX - b.minX;
      const d = b.maxZ - b.minZ;
      if (w < 5 || d < 5) continue;
      const nx = Math.max(1, Math.round((w - 3) / GRID));
      const nz = Math.max(1, Math.round((d - 3) / GRID));
      for (let i = 0; i <= nx; i++) {
        for (let j = 0; j <= nz; j++) {
          const x = nx === 0 ? (b.minX + b.maxX) / 2 : b.minX + 2.2 + ((w - 4.4) * i) / nx;
          const z = nz === 0 ? (b.minZ + b.maxZ) / 2 : b.minZ + 2.2 + ((d - 4.4) * j) / nz;
          add(x, z, b.maxY);
        }
      }
    }
    for (const r of arena.ramps) {
      const cx = (r.minX + r.maxX) / 2;
      const cz = (r.minZ + r.maxZ) / 2;
      const len = r.axis === 'x' ? r.maxX - r.minX : r.maxZ - r.minZ;
      const steps = Math.max(2, Math.ceil(len / 5));
      for (let i = -1; i <= steps + 1; i++) {
        // i = -1 and steps+1 are just beyond each end (ground / platform).
        const t = i / steps;
        let x = cx, z = cz;
        if (r.axis === 'x') x = r.minX + (r.maxX - r.minX) * t;
        else z = r.minZ + (r.maxZ - r.minZ) * t;
        let tt = Math.min(1, Math.max(0, t));
        if (r.dir === -1) tt = 1 - tt;
        const yRef = r.h0 + (r.h1 - r.h0) * tt;
        add(x, z, yRef);
      }
    }
    // Link.
    const nodes = this.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const b = nodes[j];
        const dx = b.x - a.x, dz = b.z - a.z;
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d > LINK || d < 0.5) continue;
        if (this.drivable(a.x, a.y, a.z, b.x, b.y, b.z)) {
          a.edges.push(j);
          a.costs.push(d + Math.max(0, b.y - a.y) * 0.5);
        }
      }
    }
    const n = nodes.length;
    this.g = new Float64Array(n);
    this.f = new Float64Array(n);
    this.came = new Int32Array(n);
    this.stamp = new Int32Array(n);
    this.closed = new Int32Array(n);
  }

  /** Samples a straight drive from A to B with the tank height model. */
  drivable(ax: number, ay: number, az: number, bx: number, by: number, bz: number, clearance = CLEARANCE): boolean {
    const dx = bx - ax, dz = bz - az;
    const d = Math.sqrt(dx * dx + dz * dz);
    const steps = Math.max(2, Math.ceil(d / 0.7));
    let y = ay;
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const x = ax + dx * t;
      const z = az + dz * t;
      y = this.world.surfaceHeight(x, z, y, STEP_HEIGHT);
      if (this.world.circleBlocked(x, z, y, clearance)) return false;
    }
    return Math.abs(y - by) < 0.6;
  }

  /** Nearest node on roughly the same level, preferring ones reachable in a straight line. */
  nearest(x: number, y: number, z: number): number {
    let best = -1;
    let bestD = Infinity;
    let fallback = -1;
    let fallbackD = Infinity;
    for (const n of this.nodes) {
      const dx = n.x - x, dz = n.z - z;
      const d = dx * dx + dz * dz + (n.y - y) * (n.y - y) * 9;
      if (d < fallbackD) { fallbackD = d; fallback = n.id; }
      if (d < bestD && Math.abs(n.y - y) < 1.4 && d < 400) {
        if (this.world.segmentClear(x, y + 1, z, n.x, n.y + 1, n.z)) { bestD = d; best = n.id; }
      }
    }
    return best >= 0 ? best : fallback;
  }

  /** A* path as node ids (start excluded); empty if unreachable. */
  findPath(from: number, to: number, out: number[]): boolean {
    out.length = 0;
    if (from < 0 || to < 0) return false;
    if (from === to) { out.push(to); return true; }
    const nodes = this.nodes;
    const s = ++this.search;
    const { g, f, came, stamp, closed } = this;
    const hn = this.heapN, hk = this.heapK;
    hn.length = 0;
    hk.length = 0;
    const goal = nodes[to];
    const h = (i: number) => {
      const n = nodes[i];
      const dx = n.x - goal.x, dz = n.z - goal.z;
      return Math.sqrt(dx * dx + dz * dz);
    };
    stamp[from] = s;
    g[from] = 0;
    f[from] = h(from);
    came[from] = -1;
    heapPush(hn, hk, from, f[from]);
    while (hn.length) {
      const cur = heapPop(hn, hk);
      if (closed[cur] === s) continue;
      closed[cur] = s;
      if (cur === to) {
        let c = to;
        while (c !== from && c >= 0) { out.push(c); c = came[c]; }
        out.reverse();
        return true;
      }
      const node = nodes[cur];
      for (let k = 0; k < node.edges.length; k++) {
        const nb = node.edges[k];
        if (closed[nb] === s) continue;
        const ng = g[cur] + node.costs[k];
        if (stamp[nb] !== s || ng < g[nb]) {
          stamp[nb] = s;
          g[nb] = ng;
          f[nb] = ng + h(nb);
          came[nb] = cur;
          heapPush(hn, hk, nb, f[nb]);
        }
      }
    }
    return false;
  }

  /** Node ids reachable from `from` (for validation). */
  reachable(from: number): Set<number> {
    const seen = new Set<number>([from]);
    const stack = [from];
    while (stack.length) {
      const c = stack.pop()!;
      for (const e of this.nodes[c].edges) if (!seen.has(e)) { seen.add(e); stack.push(e); }
    }
    return seen;
  }
}

/** Binary min-heap over parallel (node, key) arrays; stale entries are skipped by the closed set. */
function heapPush(hn: number[], hk: number[], v: number, key: number): void {
  hn.push(v);
  hk.push(key);
  let i = hn.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (hk[p] <= hk[i]) break;
    swap(hn, hk, p, i);
    i = p;
  }
}

function heapPop(hn: number[], hk: number[]): number {
  const top = hn[0];
  const lastN = hn.pop()!;
  const lastK = hk.pop()!;
  if (hn.length) {
    hn[0] = lastN;
    hk[0] = lastK;
    let i = 0;
    for (;;) {
      const l = i * 2 + 1, r = l + 1;
      let m = i;
      if (l < hn.length && hk[l] < hk[m]) m = l;
      if (r < hn.length && hk[r] < hk[m]) m = r;
      if (m === i) break;
      swap(hn, hk, m, i);
      i = m;
    }
  }
  return top;
}

function swap(hn: number[], hk: number[], a: number, b: number): void {
  const tn = hn[a]; hn[a] = hn[b]; hn[b] = tn;
  const tk = hk[a]; hk[a] = hk[b]; hk[b] = tk;
}
