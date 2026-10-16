// Shared sim helpers: events, spawning of bullets/hazards/pickups, scaling curves.
import { rand } from '../rng.ts';
import type { ArenaId, Bullet, GameEvent, Hazard, Pickup, World } from './types.ts';

export const RUN_LENGTH = 1200;
export const ENEMY_CAP = 160;
export const BOSS_CAP = 120;
export const MAX_EBULLETS = 160;
export const MAX_PBULLETS = 140;
export const MAX_MOTES = 300;
export const MAX_SHARDS = 60;
export const ARENA_HALF = 1200;
export const ARENA_RADIUS = 1300;

export function emit(w: World, ev: GameEvent): void {
  if (w.events.length < 600) w.events.push(ev);
}

export function waveOf(t: number): number {
  return Math.min(20, Math.floor(t / 60) + 1);
}
export function hpMul(wave: number): number {
  const k = wave - 1;
  return 1 + 0.16 * k + 0.004 * k * k;
}
export function dmgScale(wave: number): number {
  return 1 + 0.03 * (wave - 1);
}
export function speedMul(wave: number): number {
  return 1 + 0.012 * (wave - 1);
}
export function xpNeed(level: number): number {
  return 5 + 4 * level + Math.floor(0.45 * level * level);
}

export function clampArena(arena: ArenaId, o: { x: number; y: number }, r: number): void {
  if (arena === 'foundry') {
    const lim = ARENA_RADIUS - r;
    const d = Math.hypot(o.x, o.y);
    if (d > lim) {
      o.x *= lim / d;
      o.y *= lim / d;
    }
  } else {
    const lim = ARENA_HALF - r;
    if (o.x > lim) o.x = lim;
    else if (o.x < -lim) o.x = -lim;
    if (o.y > lim) o.y = lim;
    else if (o.y < -lim) o.y = -lim;
  }
}

export function outsideArena(arena: ArenaId, x: number, y: number): boolean {
  if (arena === 'foundry') return Math.hypot(x, y) > ARENA_RADIUS + 40;
  return Math.abs(x) > ARENA_HALF + 40 || Math.abs(y) > ARENA_HALF + 40;
}

export function fireEnemyBullet(w: World, x: number, y: number, ang: number, speed: number, dmg: number, big: boolean): Bullet | null {
  if (w.eBullets >= MAX_EBULLETS) return null;
  const b = w.bullets.acquire();
  b.alive = true;
  b.friendly = false;
  b.x = x;
  b.y = y;
  b.vx = Math.cos(ang) * speed;
  b.vy = Math.sin(ang) * speed;
  b.r = big ? 7 : 5;
  b.dmg = dmg;
  b.life = 4;
  b.kind = big ? 1 : 0;
  b.pierce = 0;
  b.homing = false;
  b.turn = 0;
  b.hits.length = 0;
  w.eBullets++;
  return b;
}

export function firePlayerBullet(
  w: World, x: number, y: number, ang: number, speed: number, dmg: number, life: number, kind: number, pierce: number, homing: boolean,
): Bullet | null {
  if (w.pBullets >= MAX_PBULLETS) return null;
  const b = w.bullets.acquire();
  b.alive = true;
  b.friendly = true;
  b.x = x;
  b.y = y;
  b.vx = Math.cos(ang) * speed;
  b.vy = Math.sin(ang) * speed;
  b.r = kind === 1 ? 6 : kind === 2 ? 4 : 5;
  b.dmg = dmg;
  b.life = life;
  b.kind = kind;
  b.pierce = pierce;
  b.homing = homing;
  b.turn = 4;
  b.hits.length = 0;
  w.pBullets++;
  return b;
}

export function addHazard(w: World, h: Partial<Hazard> & { kind: 'pool' | 'lane'; x: number; y: number }): Hazard {
  const o = w.hazards.acquire();
  o.alive = true;
  o.kind = h.kind;
  o.x = h.x;
  o.y = h.y;
  o.x2 = h.x2 ?? h.x;
  o.y2 = h.y2 ?? h.y;
  o.r = h.r ?? 44;
  o.width = h.width ?? 40;
  o.t = 0;
  o.tele = h.tele ?? 1;
  o.life = h.life ?? 6;
  o.dps = h.dps ?? 14;
  o.tick = 0;
  o.hit = false;
  return o;
}

/** Lane through (cx, cy), vertical or horizontal, spanning the whole arena. */
export function addLane(w: World, cx: number, cy: number, vertical: boolean, dmg: number): void {
  const L = 1500;
  if (vertical) addHazard(w, { kind: 'lane', x: cx, y: cy - L, x2: cx, y2: cy + L, width: 44, tele: 1.2, dps: dmg });
  else addHazard(w, { kind: 'lane', x: cx - L, y: cy, x2: cx + L, y2: cy, width: 44, tele: 1.2, dps: dmg });
  emit(w, { t: 'lane', x: cx, y: cy });
}

export function dropPickup(w: World, kind: Pickup['kind'], x: number, y: number, v: number, scatter = 18): void {
  if (kind === 'mote' && w.pickups.list.length >= MAX_MOTES + MAX_SHARDS + 6) {
    w.pendingXp += v;
    return;
  }
  if (kind === 'shard' && w.pickups.list.length >= MAX_MOTES + MAX_SHARDS + 6) {
    w.shardsCollected += 1;
    return;
  }
  const p = w.pickups.acquire();
  p.alive = true;
  p.kind = kind;
  const a = rand(w.rng) * Math.PI * 2;
  const s = rand(w.rng) * scatter;
  p.x = x + Math.cos(a) * s;
  p.y = y + Math.sin(a) * s;
  p.vx = Math.cos(a) * s * 3;
  p.vy = Math.sin(a) * s * 3;
  p.v = v;
  p.t = 0;
  p.pulled = false;
}
