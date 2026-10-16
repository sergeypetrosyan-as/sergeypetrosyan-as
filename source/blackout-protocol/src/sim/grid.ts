import type { MissionDef, ParsedMap, Vec, World } from './types.ts';
import { T_DOOR, T_FLOOR, T_LASER, T_LOCKER, T_SHADOW, T_TERMINAL, T_WALL } from './types.ts';

const cache = new WeakMap<MissionDef, ParsedMap>();
const TERMINAL_CHARS = 'ABCDEFGHIJ'; // K, L, S, X are reserved
const LASER_CHARS = 'abcd';
const ITEM_CHARS = 'eruyijm';

export function parseMap(def: MissionDef): ParsedMap {
  const hit = cache.get(def);
  if (hit) return hit;
  const rows = def.map;
  const h = rows.length;
  const w = rows[0]?.length ?? 0;
  const kind = new Uint8Array(w * h);
  const ref = new Int16Array(w * h).fill(-1);
  const errors: string[] = [];
  const out: ParsedMap = { w, h, kind, ref, start: { x: -1, y: -1 }, exit: { x: -1, y: -1 }, checkpoints: [], items: [], lockers: [], errors };
  const seenDoor = new Set<string>();
  for (let y = 0; y < h; y++) {
    if (rows[y].length !== w) errors.push(`row ${y} width ${rows[y].length} != ${w}`);
    for (let x = 0; x < w; x++) {
      const ch = rows[y][x] ?? '#';
      const i = y * w + x;
      kind[i] = T_FLOOR;
      if (ch === '#') kind[i] = T_WALL;
      else if (ch === ',') kind[i] = T_SHADOW;
      else if (ch === 'L') { kind[i] = T_LOCKER; out.lockers.push({ x, y }); }
      else if (ch === 'S') out.start = { x, y };
      else if (ch === 'X') out.exit = { x, y };
      else if (ch === 'K') out.checkpoints.push({ x, y });
      else if (ch >= '1' && ch <= '9') {
        kind[i] = T_DOOR;
        const di = def.doors.findIndex((d) => d.id === ch);
        if (di < 0) errors.push(`door ${ch} has no def`);
        ref[i] = di;
        seenDoor.add(ch);
      } else if (TERMINAL_CHARS.includes(ch)) {
        kind[i] = T_TERMINAL;
        const ti = def.terminals.findIndex((t) => t.id === ch);
        if (ti < 0) errors.push(`terminal ${ch} has no def`);
        ref[i] = ti;
      } else if (LASER_CHARS.includes(ch)) {
        kind[i] = T_LASER;
        const li = def.lasers.findIndex((l) => l.id === ch);
        if (li < 0) errors.push(`laser ${ch} has no def`);
        ref[i] = li;
      } else if (ITEM_CHARS.includes(ch)) out.items.push({ ch, x, y });
      else if (ch !== '.') errors.push(`unknown char '${ch}' at ${x},${y}`);
    }
  }
  if (out.start.x < 0) errors.push('no start');
  if (out.exit.x < 0) errors.push('no exit');
  for (const d of def.doors) if (!seenDoor.has(d.id)) errors.push(`door ${d.id} missing from map`);
  cache.set(def, out);
  return out;
}

export function kindAt(m: ParsedMap, tx: number, ty: number): number {
  if (tx < 0 || ty < 0 || tx >= m.w || ty >= m.h) return T_WALL;
  return m.kind[ty * m.w + tx];
}

/** Tile that stops movement (doors only while locked). */
export function solidAt(w: World, tx: number, ty: number): boolean {
  const k = kindAt(w.map, tx, ty);
  if (k === T_WALL || k === T_LOCKER || k === T_TERMINAL) return true;
  if (k === T_DOOR) return w.doors[w.map.ref[ty * w.map.w + tx]]?.locked ?? true;
  return false;
}

export function blocksSight(w: World, tx: number, ty: number): boolean {
  const k = kindAt(w.map, tx, ty);
  if (k === T_WALL || k === T_LOCKER) return true;
  if (k === T_DOOR) return !(w.doors[w.map.ref[ty * w.map.w + tx]]?.open ?? false);
  return false;
}

/** Number of sight-blocking tiles strictly between two points (start and end tiles excluded). */
export function blockersBetween(w: World, x0: number, y0: number, x1: number, y1: number, stopAtFirst: boolean): number {
  let tx = Math.floor(x0), ty = Math.floor(y0);
  const ex = Math.floor(x1), ey = Math.floor(y1);
  const dx = x1 - x0, dy = y1 - y0;
  const sx = dx > 0 ? 1 : -1, sy = dy > 0 ? 1 : -1;
  const tdx = dx === 0 ? Infinity : Math.abs(1 / dx);
  const tdy = dy === 0 ? Infinity : Math.abs(1 / dy);
  let tmx = dx === 0 ? Infinity : (sx > 0 ? tx + 1 - x0 : x0 - tx) * tdx;
  let tmy = dy === 0 ? Infinity : (sy > 0 ? ty + 1 - y0 : y0 - ty) * tdy;
  let n = 0;
  for (let guard = 0; guard < 256 && (tx !== ex || ty !== ey); guard++) {
    if (tmx < tmy) { tmx += tdx; tx += sx; } else { tmy += tdy; ty += sy; }
    if (tx === ex && ty === ey) break;
    if (blocksSight(w, tx, ty)) { n++; if (stopAtFirst) return n; }
  }
  return n;
}

export function los(w: World, x0: number, y0: number, x1: number, y1: number): boolean {
  return blockersBetween(w, x0, y0, x1, y1, true) === 0;
}

export function isLit(w: World, x: number, y: number): boolean {
  if (w.blackout) return false;
  return kindAt(w.map, Math.floor(x), Math.floor(y)) !== T_SHADOW;
}

function walkable(w: World, tx: number, ty: number): boolean {
  return !solidAt(w, tx, ty);
}

const NB: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

/** BFS over tiles (8-way, no corner cutting). Returns tile-centre waypoints, excluding the start tile. */
export function findPath(w: World, sx: number, sy: number, tx: number, ty: number): Vec[] | null {
  const W = w.map.w, H = w.map.h;
  if (sx === tx && sy === ty) return [];
  if (!walkable(w, tx, ty)) return null;
  const prev = new Int32Array(W * H).fill(-2);
  const q: number[] = [sy * W + sx];
  prev[sy * W + sx] = -1;
  const goal = ty * W + tx;
  let head = 0;
  while (head < q.length) {
    const cur = q[head++];
    if (cur === goal) break;
    const cx = cur % W, cy = (cur / W) | 0;
    for (const [dx, dy] of NB) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const ni = ny * W + nx;
      if (prev[ni] !== -2 || !walkable(w, nx, ny)) continue;
      if (dx !== 0 && dy !== 0 && (!walkable(w, cx + dx, cy) || !walkable(w, cx, cy + dy))) continue;
      prev[ni] = cur;
      q.push(ni);
    }
  }
  if (prev[goal] === -2) return null;
  const rev: Vec[] = [];
  for (let c = goal; c !== sy * W + sx; c = prev[c]) rev.push({ x: (c % W) + 0.5, y: ((c / W) | 0) + 0.5 });
  return rev.reverse();
}

export function nearestWalkable(w: World, x: number, y: number): Vec {
  const tx = Math.floor(x), ty = Math.floor(y);
  if (walkable(w, tx, ty)) return { x: tx + 0.5, y: ty + 0.5 };
  for (let r = 1; r < 5; r++) {
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      if (walkable(w, tx + dx, ty + dy)) return { x: tx + dx + 0.5, y: ty + dy + 0.5 };
    }
  }
  return { x: tx + 0.5, y: ty + 0.5 };
}
