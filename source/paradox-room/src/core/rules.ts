// The complete rule set of PARADOX ROOM. Pure: no DOM, no time, no randomness.
import type { Action, ActionResult, Dir, FoldKind, GEvent, GState, Level, Vec } from './types.ts';
import { AWAY, DOWN, FOLD_TABLE, RIGHT } from './rotations.ts';

export const MAX_PASSES = 8;

export function initialState(level: Level): GState {
  return {
    room: level.start.room,
    x: level.start.x,
    y: level.start.y,
    z: level.start.z,
    ori: level.rooms.map(() => 0),
    got: 0,
    ctl: 0,
  };
}

export function cloneState(s: GState): GState {
  return { room: s.room, x: s.x, y: s.y, z: s.z, ori: s.ori.slice(), got: s.got, ctl: s.ctl };
}

export function cellIndex(level: Level, room: number, x: number, y: number, z: number): number {
  const r = level.rooms[room];
  return x + r.w * (y + r.h * z);
}

export function inBounds(level: Level, room: number, x: number, y: number, z: number): boolean {
  const r = level.rooms[room];
  return x >= 0 && y >= 0 && z >= 0 && x < r.w && y < r.h && z < r.d;
}

/** Solid = grid solid, or a closed door. Out of bounds is never solid. */
export function isSolid(level: Level, ctl: number, room: number, x: number, y: number, z: number): boolean {
  if (!inBounds(level, room, x, y, z)) return false;
  const idx = cellIndex(level, room, x, y, z);
  if (level.rooms[room].solid[idx]) return true;
  const here = level.cellObjs[room].get(idx);
  if (here) {
    for (const id of here) {
      const o = level.objs[id];
      if (o.kind === 'door' && !((ctl >> (o.bit as number)) & 1)) return true;
    }
  }
  return false;
}

export function downOf(s: GState): Vec {
  return DOWN[s.ori[s.room]];
}

export function dirVec(s: GState, dir: Dir): Vec {
  const o = s.ori[s.room];
  const r = RIGHT[o];
  const a = AWAY[o];
  switch (dir) {
    case 'right':
      return r;
    case 'left':
      return [-r[0], -r[1], -r[2]];
    case 'away':
      return a;
    default:
      return [-a[0], -a[1], -a[2]];
  }
}

/** Slide the player along the room's current down until supported. False if the fold has no floor. */
function settle(level: Level, s: GState): boolean {
  if (isSolid(level, s.ctl, s.room, s.x, s.y, s.z)) return false;
  const dn = downOf(s);
  for (let guard = 0; guard < 64; guard++) {
    const nx = s.x + dn[0];
    const ny = s.y + dn[1];
    const nz = s.z + dn[2];
    if (!inBounds(level, s.room, nx, ny, nz)) return false;
    if (isSolid(level, s.ctl, s.room, nx, ny, nz)) return true;
    s.x = nx;
    s.y = ny;
    s.z = nz;
  }
  return false;
}

export function isStandable(level: Level, s: GState): boolean {
  if (!inBounds(level, s.room, s.x, s.y, s.z)) return false;
  if (isSolid(level, s.ctl, s.room, s.x, s.y, s.z)) return false;
  const dn = downOf(s);
  return isSolid(level, s.ctl, s.room, s.x + dn[0], s.y + dn[1], s.z + dn[2]);
}

export interface Probe {
  ok: boolean;
  reason?: 'edge' | 'wall' | 'void';
  to: Vec;
}

/** The single source of truth for "can I step there?" (movement and the renderer's markers share it). */
export function probeMove(level: Level, s: GState, dir: Dir): Probe {
  const d = dirVec(s, dir);
  const to: Vec = [s.x + d[0], s.y + d[1], s.z + d[2]];
  if (!inBounds(level, s.room, to[0], to[1], to[2])) return { ok: false, reason: 'edge', to };
  if (isSolid(level, s.ctl, s.room, to[0], to[1], to[2])) return { ok: false, reason: 'wall', to };
  const dn = downOf(s);
  if (!isSolid(level, s.ctl, s.room, to[0] + dn[0], to[1] + dn[1], to[2] + dn[2])) return { ok: false, reason: 'void', to };
  return { ok: true, to };
}

function objsHere(level: Level, s: GState): number[] {
  return level.cellObjs[s.room].get(cellIndex(level, s.room, s.x, s.y, s.z)) ?? [];
}

/** Interactables (levers, switches) in reach: same cell first, then face-adjacent, by object id. */
export function interactables(level: Level, s: GState): number[] {
  const out: { id: number; d: number }[] = [];
  for (const o of level.objs) {
    if (o.room !== s.room || (o.kind !== 'lever' && o.kind !== 'switch')) continue;
    const d = Math.abs(o.x - s.x) + Math.abs(o.y - s.y) + Math.abs(o.z - s.z);
    if (d <= 1) out.push({ id: o.id, d });
  }
  out.sort((a, b) => a.d - b.d || a.id - b.id);
  return out.map((e) => e.id);
}

export function crystalsLeft(level: Level, s: GState): number {
  let n = 0;
  for (const o of level.objs) if (o.kind === 'crystal' && !((s.got >> (o.bit as number)) & 1)) n++;
  return n;
}

/** Run arrival triggers until stable. Returns an error string, or null. */
function land(level: Level, s: GState, events: GEvent[], walked: boolean): string | null {
  for (let pass = 0; pass < MAX_PASSES; pass++) {
    if (!settle(level, s)) return 'nofloor';
    let changed = false;
    for (const id of objsHere(level, s)) {
      const o = level.objs[id];
      if ((o.kind === 'crystal' || o.kind === 'shard') && !((s.got >> (o.bit as number)) & 1)) {
        s.got |= 1 << (o.bit as number);
        events.push({ k: 'collect', obj: id });
      } else if (o.kind === 'plate' && !((s.ctl >> (o.bit as number)) & 1)) {
        s.ctl |= 1 << (o.bit as number);
        events.push({ k: 'latch', obj: id });
        events.push({ k: 'door', open: true });
        changed = true;
      }
    }
    if (!changed) break;
  }
  if (walked) {
    for (const id of objsHere(level, s)) {
      const o = level.objs[id];
      if (o.kind === 'portal' && o.pair !== undefined) {
        const to = level.objs[o.pair];
        s.room = to.room;
        s.x = to.x;
        s.y = to.y;
        s.z = to.z;
        events.push({ k: 'portal', from: id, to: o.pair });
        const err = land(level, s, events, false);
        return err === 'nofloor' ? 'farside' : err;
      }
    }
  }
  return null;
}

function finish(level: Level, s: GState, events: GEvent[], walked: boolean): ActionResult {
  const err = land(level, s, events, walked);
  if (err) return { ok: false, reason: err };
  for (const id of objsHere(level, s)) {
    const o = level.objs[id];
    if (o.kind === 'exit') {
      const left = crystalsLeft(level, s);
      if (left === 0) events.push({ k: 'complete' });
      else if (walked) events.push({ k: 'sealed', remaining: left });
    }
  }
  return { ok: true, state: s, events };
}

function doFold(level: Level, s: GState, kind: FoldKind, events: GEvent[]): ActionResult {
  const fx = s.x;
  const fy = s.y;
  const fz = s.z;
  s.ori[s.room] = FOLD_TABLE[kind][s.ori[s.room]];
  const r = finish(level, s, events, false);
  if (!r.ok) return r;
  const fell = s.x !== fx || s.y !== fy || s.z !== fz;
  r.events.unshift({ k: 'fold', kind, fell });
  return r;
}

export function applyAction(level: Level, from: GState, a: Action): ActionResult {
  const s = cloneState(from);
  const events: GEvent[] = [];
  if (a.t === 'move') {
    const p = probeMove(level, s, a.dir);
    if (!p.ok) return { ok: false, reason: p.reason as string };
    s.x = p.to[0];
    s.y = p.to[1];
    s.z = p.to[2];
    events.push({ k: 'step' });
    return finish(level, s, events, true);
  }
  if (a.t === 'fold') {
    if (!level.rooms[s.room].free.includes(a.kind)) return { ok: false, reason: 'locked' };
    return doFold(level, s, a.kind, events);
  }
  if (!interactables(level, s).includes(a.obj)) return { ok: false, reason: 'reach' };
  const o = level.objs[a.obj];
  if (o.kind === 'lever') return doFold(level, s, o.fold as FoldKind, events);
  const bit = 1 << (o.bit as number);
  s.ctl ^= bit;
  const on = (s.ctl & bit) !== 0;
  events.push({ k: 'toggle', obj: a.obj, on });
  events.push({ k: 'door', open: on });
  if (isSolid(level, s.ctl, s.room, s.x, s.y, s.z)) return { ok: false, reason: 'doorway' };
  return finish(level, s, events, false);
}

/** All action candidates from a state (callers filter by applyAction). */
export function candidateActions(level: Level, s: GState): Action[] {
  const out: Action[] = [
    { t: 'move', dir: 'right' },
    { t: 'move', dir: 'left' },
    { t: 'move', dir: 'away' },
    { t: 'move', dir: 'toward' },
  ];
  for (const k of level.rooms[s.room].free) out.push({ t: 'fold', kind: k });
  for (const id of interactables(level, s)) out.push({ t: 'use', obj: id });
  return out;
}

export function stateKey(s: GState): string {
  let o = '';
  for (const v of s.ori) o += String.fromCharCode(65 + v);
  return `${s.room}.${s.x}.${s.y}.${s.z}.${o}.${s.got}.${s.ctl}`;
}
