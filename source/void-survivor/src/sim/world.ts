// The pure simulation: createWorld() + step(). No DOM, no Math.random, fixed 60 Hz.
import { chance, makeRng, rand, randRange } from '../rng.ts';
import { UPGRADE_BY_ID, newLevels, type UpgradeId } from '../upgrades/data.ts';
import {
  DETONATION_MIN_SPENT, absorbCost, deriveStats, detonationDamage, detonationRadius, fieldDrain, fieldRadius, fieldTickDamage,
  hasSynergy, reserveCap, rollChoices, siphonGain,
} from '../upgrades/rules.ts';
import { Pool } from './pool.ts';
import { Grid } from './hash.ts';
import { ENEMY_DEFS, newEnemy, spawnEnemy, updateEnemy } from './enemies.ts';
import {
  RUN_LENGTH, addLane, clampArena, dropPickup, emit, firePlayerBullet, outsideArena, xpNeed,
} from './entities.ts';
import { updateSpawner } from './waves.ts';
import type { ArenaId, Bullet, Enemy, Hazard, Input, MetaBonus, Pickup, World } from './types.ts';

export const DT = 1 / 60;
export const PLAYER_R = 12;

export function defaultMeta(): MetaBonus {
  return {
    unlocked: ['pulse', 'orbit', 'vitality', 'regen', 'swift', 'magnet', 'overclock', 'fortune', 'plating', 'siphon', 'bulwark', 'detonation'],
    hp: 0, speed: 0, luck: 0, rerolls: 1, startSiphon: false, arena: 'hollow',
  };
}

export function emptyInput(): Input {
  return { mx: 0, my: 0, aimX: 0, aimY: 0, hasAim: false, release: false, toggleHold: false };
}

export function createWorld(seed: number, meta: MetaBonus = defaultMeta()): World {
  const levels = newLevels();
  if (meta.startSiphon) levels.siphon = 1;
  const stats = deriveStats(levels, meta, 0);
  const arena: ArenaId = meta.arena;
  return {
    seed, rng: makeRng(seed), arena, tick: 0, time: 0, state: 'playing',
    player: {
      x: 0, y: 0, vx: 0, vy: 0, r: PLAYER_R, hp: stats.maxHp, maxHp: stats.maxHp, iframes: 0, flash: 0, facing: 0,
      level: 1, xp: 0, xpNext: xpNeed(1), reserve: 0, fieldOn: false, fieldR: 0, fieldSpent: 0, fieldTick: 0, hold: false,
      detCd: 0, pulseCd: 0.3, homingCd: 1, lanceCd: 1, chainCd: 1, orbitAngle: 0, regenAcc: 0, kvx: 0, kvy: 0,
    },
    stats, levels, meta,
    enemies: new Pool<Enemy>(newEnemy),
    bullets: new Pool<Bullet>(() => ({
      alive: false, friendly: false, x: 0, y: 0, vx: 0, vy: 0, r: 5, dmg: 1, life: 1, kind: 0, pierce: 0, homing: false, turn: 0, hits: [],
    })),
    hazards: new Pool<Hazard>(() => ({
      alive: false, kind: 'pool', x: 0, y: 0, x2: 0, y2: 0, r: 40, width: 40, t: 0, tele: 1, life: 1, dps: 1, tick: 0, hit: false,
    })),
    pickups: new Pool<Pickup>(() => ({ alive: false, kind: 'mote', x: 0, y: 0, vx: 0, vy: 0, v: 1, t: 0, pulled: false })),
    grid: new Grid(), events: [], nextId: 0,
    budget: 0, wave: 1, packWave: 0, bossesSpawned: 0, bossAlive: false, laneTimer: 10,
    pendingLevels: 0, pendingChests: 0, choice: null, rerolls: meta.rerolls, picks: [], sinceDefensive: 0, levelUps: 0,
    kills: 0, killsBy: {}, damageDealt: 0, shardsCollected: 0, bossesKilled: 0, chain: 0, chainTimer: 0, maxChain: 0,
    detonations: 0, deathTimer: 0, winReason: '', scratch: [], eBullets: 0, pBullets: 0, pendingXp: 0,
  };
}

// --- helpers -----------------------------------------------------------------------------------

function nearestEnemy(w: World, x: number, y: number, maxD: number, skip?: number[]): Enemy | null {
  let best: Enemy | null = null;
  let bd = maxD * maxD;
  for (const e of w.enemies.list) {
    if (!e.alive) continue;
    if (skip && skip.includes(e.id)) continue;
    const d = (e.x - x) * (e.x - x) + (e.y - y) * (e.y - y);
    if (d < bd) {
      bd = d;
      best = e;
    }
  }
  return best;
}

function angDiff(a: number, b: number): number {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return Math.abs(d);
}

/** True if a player projectile/blade at (px, py) is stopped by an Aegis shield. */
function shieldBlocks(e: Enemy, px: number, py: number): boolean {
  if (e.kind !== 'aegis') return false;
  return angDiff(e.shield, Math.atan2(py - e.y, px - e.x)) < (50 * Math.PI) / 180;
}

function addReserve(w: World, amount: number): void {
  const cap = reserveCap(w.levels);
  w.player.reserve = Math.min(cap, w.player.reserve + amount);
}

export function hurtPlayer(w: World, amount: number, sx: number, sy: number): boolean {
  const p = w.player;
  if (p.iframes > 0 || w.state !== 'playing') return false;
  const amt = amount * w.stats.taken;
  p.hp -= amt;
  p.iframes = 0.7;
  p.flash = 0.25;
  const d = Math.hypot(p.x - sx, p.y - sy) || 1;
  p.kvx += ((p.x - sx) / d) * 160;
  p.kvy += ((p.y - sy) / d) * 160;
  emit(w, { t: 'hurt', x: p.x, y: p.y, a: amt });
  if (p.hp <= 0) {
    p.hp = 0;
    w.state = 'dead';
    w.deathTimer = 0;
    emit(w, { t: 'dead', x: p.x, y: p.y });
  }
  return true;
}

function chipPlayer(w: World, amount: number): void {
  const p = w.player;
  if (w.state !== 'playing') return;
  p.hp -= amount * w.stats.taken;
  p.flash = Math.max(p.flash, 0.1);
  emit(w, { t: 'hurt', x: p.x, y: p.y, a: amount * w.stats.taken, b: 1 });
  if (p.hp <= 0) {
    p.hp = 0;
    w.state = 'dead';
    emit(w, { t: 'dead', x: p.x, y: p.y });
  }
}

export function damageEnemy(w: World, e: Enemy, dmg: number, x = e.x, y = e.y): boolean {
  if (!e.alive || dmg <= 0) return false;
  const d = Math.min(dmg, e.hp);
  w.damageDealt += d;
  e.hp -= dmg;
  e.flash = 0.09;
  emit(w, { t: 'hit', x, y, a: dmg, s: e.kind });
  if (e.hp <= 0) {
    killEnemy(w, e);
    return true;
  }
  return false;
}

function gainXp(w: World, v: number): void {
  const p = w.player;
  p.xp += v;
  while (p.xp >= p.xpNext && p.level < 40) {
    p.xp -= p.xpNext;
    p.level++;
    p.xpNext = xpNeed(p.level);
    w.pendingLevels++;
    emit(w, { t: 'levelup', x: p.x, y: p.y, a: p.level });
  }
  if (p.level >= 40) p.xp = Math.min(p.xp, p.xpNext - 1);
}

function killEnemy(w: World, e: Enemy): void {
  e.alive = false;
  w.kills++;
  w.killsBy[e.kind] = (w.killsBy[e.kind] ?? 0) + 1;
  w.chain++;
  w.chainTimer = 1.5;
  if (w.chain > w.maxChain) w.maxChain = w.chain;
  if (w.chain % 10 === 0) emit(w, { t: 'chain', x: w.player.x, y: w.player.y, a: w.chain });
  const luck = w.stats.luck;
  const def = ENEMY_DEFS[e.kind];
  emit(w, { t: 'kill', x: e.x, y: e.y, a: e.r, b: e.elite ? 1 : 0, s: e.kind });

  if (!e.noEss) addReserve(w, siphonGain(w.levels, e.ess, w.chain));
  dropPickup(w, 'mote', e.x, e.y, e.xp);
  if (e.kind === 'warden') {
    w.bossesKilled++;
    w.bossAlive = false;
    emit(w, { t: 'bossDown', x: e.x, y: e.y, a: e.tier });
    for (let i = 0; i < 6; i++) dropPickup(w, 'mote', e.x, e.y, e.xp / 6, 60);
    for (let i = 0; i < 15 * e.tier; i++) dropPickup(w, 'shard', e.x, e.y, 1, 70);
    dropPickup(w, 'chest', e.x, e.y, 1, 20);
    for (const o of w.enemies.list) {
      if (o.alive && o.kind !== 'warden') {
        // boss death shatters its summons
        if (o.t < 8 && o.kind === 'swarm') {
          o.alive = false;
          w.kills++;
          w.killsBy.swarm = (w.killsBy.swarm ?? 0) + 1;
          dropPickup(w, 'mote', o.x, o.y, o.xp);
          emit(w, { t: 'kill', x: o.x, y: o.y, a: o.r, b: 0, s: 'swarm' });
        }
      }
    }
    if (e.tier >= 4) {
      w.state = 'won';
      w.winReason = 'Final Warden destroyed';
      emit(w, { t: 'win', x: e.x, y: e.y });
    }
    return;
  }
  if (e.kind === 'cleaver') {
    for (let i = 0; i < 2; i++) {
      if (w.enemies.count >= 160) break;
      const a = rand(w.rng) * Math.PI * 2;
      const s = spawnEnemy(w, 'splitlet', e.x + Math.cos(a) * 10, e.y + Math.sin(a) * 10);
      s.kx = Math.cos(a) * 160;
      s.ky = Math.sin(a) * 160;
    }
  }
  const shardP = e.elite ? 1 : def.shard * (1 + luck);
  if (chance(w.rng, shardP)) dropPickup(w, 'shard', e.x, e.y, 1);
  if (e.elite && chance(w.rng, 0.5)) dropPickup(w, 'shard', e.x, e.y, 1);
  const chestP = e.elite ? 0.08 : 0.0035 * (1 + luck);
  if (chance(w.rng, chestP)) dropPickup(w, 'chest', e.x, e.y, 1);
}

// --- weapons -----------------------------------------------------------------------------------

function aimTarget(w: World, inp: Input, range: number): { x: number; y: number; e: Enemy | null } | null {
  const p = w.player;
  if (inp.hasAim) return { x: inp.aimX, y: inp.aimY, e: nearestEnemy(w, inp.aimX, inp.aimY, 120) };
  const e = nearestEnemy(w, p.x, p.y, range);
  return e ? { x: e.x, y: e.y, e } : null;
}

function fireWeapons(w: World, inp: Input, dt: number): void {
  const p = w.player;
  const lv = w.levels;
  const cd = w.stats.cdMul;
  const dm = w.stats.dmgMul;
  p.pulseCd -= dt;
  p.homingCd -= dt;
  p.lanceCd -= dt;
  p.chainCd -= dt;

  if (p.pulseCd <= 0) {
    const t = aimTarget(w, inp, 560);
    if (t) {
      const a = Math.atan2(t.y - p.y, t.x - p.x);
      const n = lv.pulse >= 5 ? 3 : lv.pulse >= 3 ? 2 : 1;
      const dmg = (8 + 2.5 * (lv.pulse - 1)) * dm;
      for (let i = 0; i < n; i++) {
        firePlayerBullet(w, p.x + Math.cos(a) * 14, p.y + Math.sin(a) * 14, a + (i - (n - 1) / 2) * 0.14, 520, dmg, 1.1, 0, 0, false);
      }
      p.facing = a;
      emit(w, { t: 'shot', x: p.x, y: p.y, a: 0 });
      p.pulseCd = 0.55 * cd;
    } else p.pulseCd = 0.1;
  }

  if (lv.homing > 0 && p.homingCd <= 0) {
    const t = aimTarget(w, inp, 560);
    if (t) {
      const n = 1 + Math.floor((lv.homing - 1) / 2);
      const dmg = (11 + 3 * lv.homing) * dm;
      const pierce = hasSynergy(lv, 'seekerLance') ? 2 : 0;
      const base = Math.atan2(t.y - p.y, t.x - p.x);
      for (let i = 0; i < n; i++) {
        firePlayerBullet(w, p.x, p.y, base + (i - (n - 1) / 2) * 0.7 + (n === 1 ? 0.5 : 0), 300, dmg, 2.5, 1, pierce, true);
      }
      emit(w, { t: 'shot', x: p.x, y: p.y, a: 1 });
      p.homingCd = 1.6 * cd;
    } else p.homingCd = 0.2;
  }

  if (lv.pierce > 0 && p.lanceCd <= 0) {
    const t = aimTarget(w, inp, 520);
    if (t) {
      const base = Math.atan2(t.y - p.y, t.x - p.x);
      const beams = lv.pierce >= 4 ? 2 : 1;
      const dmg = (16 + 6 * lv.pierce) * dm * (hasSynergy(lv, 'seekerLance') ? 1.25 : 1);
      for (let b = 0; b < beams; b++) castBeam(w, base + (beams === 2 ? (b === 0 ? -0.12 : 0.12) : 0), dmg);
      p.lanceCd = 2 * cd;
    } else p.lanceCd = 0.2;
  }

  if (lv.chain > 0 && p.chainCd <= 0) {
    const t = inp.hasAim ? nearestEnemy(w, inp.aimX, inp.aimY, 160) : nearestEnemy(w, p.x, p.y, 400);
    if (t) {
      castChain(w, t);
      p.chainCd = 1.7 * cd;
    } else p.chainCd = 0.2;
  }
}

function castBeam(w: World, ang: number, dmg: number): void {
  const p = w.player;
  const L = 520;
  const cx = Math.cos(ang);
  const cy = Math.sin(ang);
  for (const e of w.enemies.list) {
    if (!e.alive) continue;
    const rx = e.x - p.x;
    const ry = e.y - p.y;
    const proj = rx * cx + ry * cy;
    if (proj < 0 || proj > L + e.r) continue;
    const perp = Math.abs(rx * -cy + ry * cx);
    if (perp <= 9 + e.r) damageEnemy(w, e, dmg);
  }
  emit(w, { t: 'beam', x: p.x, y: p.y, a: p.x + cx * L, b: p.y + cy * L });
}

function castChain(w: World, first: Enemy): void {
  const p = w.player;
  const lv = w.levels;
  const leech = hasSynergy(lv, 'leechArc');
  const jumps = 2 + lv.chain + (leech ? 2 : 0);
  const base = (10 + 3.5 * lv.chain) * w.stats.dmgMul;
  const hit: number[] = [];
  const pts: number[] = [p.x, p.y];
  let cur: Enemy | null = first;
  for (let j = 0; j <= jumps && cur; j++) {
    const target: Enemy = cur;
    pts.push(target.x, target.y);
    hit.push(target.id);
    const tx = target.x;
    const ty = target.y;
    damageEnemy(w, target, base * Math.pow(0.85, j));
    if (leech) addReserve(w, 1);
    cur = nearestEnemy(w, tx, ty, 150, hit);
  }
  emit(w, { t: 'arc', x: p.x, y: p.y, pts });
}

function updateBlades(w: World, dt: number): void {
  const p = w.player;
  const lv = w.levels;
  if (lv.orbit <= 0) return;
  p.orbitAngle += 3.2 * dt;
  const n = lv.orbit + 1;
  const bladed = hasSynergy(lv, 'bladedField') && p.fieldOn;
  const rad = bladed ? p.fieldR + 10 : 64;
  const dmg = (6 + 2.5 * lv.orbit) * w.stats.dmgMul * (bladed ? 1.6 : 1);
  const out = w.scratch;
  for (let i = 0; i < n; i++) {
    const a = p.orbitAngle + (i / n) * Math.PI * 2;
    const bx = p.x + Math.cos(a) * rad;
    const by = p.y + Math.sin(a) * rad;
    w.grid.query(bx, by, 14, out);
    for (const e of out) {
      if (!e.alive || e.bladeCd > 0) continue;
      if (Math.hypot(e.x - bx, e.y - by) > e.r + 10) continue;
      if (shieldBlocks(e, bx, by)) {
        emit(w, { t: 'shieldBlock', x: bx, y: by });
        e.bladeCd = 0.2;
        continue;
      }
      e.bladeCd = 0.35;
      damageEnemy(w, e, dmg, bx, by);
    }
  }
}

// --- bullets -----------------------------------------------------------------------------------

function updateBullets(w: World, dt: number): void {
  const p = w.player;
  const out = w.scratch;
  const list = w.bullets.list;
  w.eBullets = 0;
  w.pBullets = 0;
  for (let i = list.length - 1; i >= 0; i--) {
    const b = list[i];
    if (!b.alive) {
      w.bullets.removeAt(i);
      continue;
    }
    b.life -= dt;
    if (b.life <= 0 || outsideArena(w.arena, b.x, b.y)) {
      b.alive = false;
      w.bullets.removeAt(i);
      continue;
    }
    if (b.friendly) {
      if (b.homing) {
        const t = nearestEnemy(w, b.x, b.y, 420, b.hits);
        if (t) {
          const cur = Math.atan2(b.vy, b.vx);
          const want = Math.atan2(t.y - b.y, t.x - b.x);
          let diff = want - cur;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          const turn = Math.max(-b.turn * dt, Math.min(b.turn * dt, diff));
          const sp = Math.hypot(b.vx, b.vy);
          b.vx = Math.cos(cur + turn) * sp;
          b.vy = Math.sin(cur + turn) * sp;
        }
      }
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      w.grid.query(b.x, b.y, b.r, out);
      let dead = false;
      for (const e of out) {
        if (!e.alive || b.hits.includes(e.id)) continue;
        if (Math.hypot(e.x - b.x, e.y - b.y) > e.r + b.r) continue;
        if (shieldBlocks(e, b.x, b.y)) {
          emit(w, { t: 'shieldBlock', x: b.x, y: b.y });
          dead = true;
          break;
        }
        damageEnemy(w, e, b.dmg, b.x, b.y);
        if (b.pierce > 0) {
          b.pierce--;
          b.hits.push(e.id);
          if (b.hits.length > 8) b.hits.shift();
        } else {
          dead = true;
          break;
        }
      }
      if (dead) {
        b.alive = false;
        w.bullets.removeAt(i);
        continue;
      }
      w.pBullets++;
    } else {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      let gone = false;
      if (p.fieldOn) {
        const d = Math.hypot(b.x - p.x, b.y - p.y);
        if (d < p.fieldR + b.r) {
          const cost = absorbCost(b.dmg);
          p.reserve -= cost;
          p.fieldSpent += cost;
          emit(w, { t: 'absorb', x: b.x, y: b.y });
          gone = true;
        }
      }
      if (!gone) {
        const d = Math.hypot(b.x - p.x, b.y - p.y);
        if (d < b.r + p.r * 0.8 && p.iframes <= 0) {
          hurtPlayer(w, b.dmg, b.x - b.vx, b.y - b.vy);
          gone = true;
        }
      }
      if (gone) {
        b.alive = false;
        w.bullets.removeAt(i);
        continue;
      }
      w.eBullets++;
    }
  }
}

// --- field and detonation ----------------------------------------------------------------------

function detonate(w: World, spent: number): void {
  const lv = w.levels;
  const p = w.player;
  if (spent < DETONATION_MIN_SPENT || lv.detonation <= 0) return;
  const dmg = detonationDamage(spent, lv.detonation, w.stats.dmgMul);
  const R = detonationRadius(spent);
  for (const e of w.enemies.list) {
    if (!e.alive) continue;
    const d = Math.hypot(e.x - p.x, e.y - p.y);
    if (d <= R + e.r) {
      const k = d || 1;
      e.kx += ((e.x - p.x) / k) * 220;
      e.ky += ((e.y - p.y) / k) * 220;
      damageEnemy(w, e, dmg);
    }
  }
  for (const b of w.bullets.list) {
    if (b.alive && !b.friendly && Math.hypot(b.x - p.x, b.y - p.y) <= R) b.alive = false;
  }
  if (hasSynergy(lv, 'clusterBurst')) {
    const n = 4 + 2 * lv.detonation;
    for (let i = 0; i < n; i++) {
      firePlayerBullet(w, p.x, p.y, (i / n) * Math.PI * 2, 260, dmg * 0.25, 2, 2, 0, true);
    }
  }
  if (hasSynergy(lv, 'voidReactor')) addReserve(w, spent * 0.25);
  w.detonations++;
  emit(w, { t: 'detonate', x: p.x, y: p.y, a: R, b: dmg });
}

function updateField(w: World, inp: Input, dt: number): void {
  const p = w.player;
  const lv = w.levels;
  p.detCd = Math.max(0, p.detCd - dt);
  const cap = reserveCap(w.levels);
  if (lv.siphon <= 0) {
    p.reserve = 0;
    p.fieldOn = false;
    return;
  }
  if (p.reserve > cap) p.reserve = cap;
  if (inp.toggleHold && lv.bulwark > 0) p.hold = !p.hold;

  if (inp.release && p.detCd <= 0 && lv.detonation > 0) {
    const spent = p.fieldSpent + p.reserve;
    if (spent >= DETONATION_MIN_SPENT) {
      p.reserve = 0;
      p.fieldOn = false;
      p.fieldSpent = 0;
      p.detCd = 1;
      detonate(w, spent);
    }
  }
  if (lv.bulwark <= 0) return;

  if (!p.fieldOn) {
    if (!p.hold && p.reserve >= 0.15 * cap) {
      p.fieldOn = true;
      p.fieldR = fieldRadius(p.reserve, lv.bulwark);
      emit(w, { t: 'fieldUp', x: p.x, y: p.y });
    }
    return;
  }
  if (p.hold) {
    p.fieldOn = false;
    return;
  }
  const R = fieldRadius(p.reserve, lv.bulwark);
  p.fieldR = R;
  const drain = fieldDrain(R) * dt;
  p.reserve -= drain;
  p.fieldSpent = Math.min(400, p.fieldSpent + drain);
  p.fieldTick -= dt;
  if (p.fieldTick <= 0) {
    p.fieldTick = 0.25;
    const bladed = hasSynergy(lv, 'bladedField');
    const dmg = fieldTickDamage(p.reserve, lv.bulwark, bladed) * w.stats.dmgMul;
    const out = w.scratch;
    w.grid.query(p.x, p.y, R, out);
    for (const e of out) {
      if (!e.alive) continue;
      const d = Math.hypot(e.x - p.x, e.y - p.y);
      if (d < R + e.r) {
        const k = d || 1;
        e.kx += ((e.x - p.x) / k) * 140;
        e.ky += ((e.y - p.y) / k) * 140;
        damageEnemy(w, e, dmg);
      }
    }
  }
  if (p.reserve <= 0) {
    p.reserve = 0;
    p.fieldOn = false;
    emit(w, { t: 'fieldBreak', x: p.x, y: p.y, a: R });
    const spent = p.fieldSpent;
    p.fieldSpent = 0;
    detonate(w, spent);
  }
}

// --- hazards, pickups --------------------------------------------------------------------------

function distToSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l2 = dx * dx + dy * dy || 1;
  let t = ((px - x1) * dx + (py - y1) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function updateHazards(w: World, dt: number): void {
  const p = w.player;
  const list = w.hazards.list;
  for (let i = list.length - 1; i >= 0; i--) {
    const h = list[i];
    h.t += dt;
    if (h.kind === 'pool') {
      const age = h.t - h.tele;
      if (age >= h.life) {
        w.hazards.removeAt(i);
        continue;
      }
      if (age >= 0) {
        h.r = 44 + 34 * Math.min(1, age / h.life);
        h.tick -= dt;
        if (h.tick <= 0) {
          h.tick = 0.25;
          if (Math.hypot(p.x - h.x, p.y - h.y) < h.r + p.r * 0.5) chipPlayer(w, h.dps * 0.25);
        }
      }
    } else {
      if (h.t > h.tele + 0.35) {
        w.hazards.removeAt(i);
        continue;
      }
      if (h.t >= h.tele && !h.hit && distToSegment(p.x, p.y, h.x, h.y, h.x2, h.y2) < h.width / 2 + p.r * 0.8) {
        if (hurtPlayer(w, h.dps, p.x - 1, p.y)) h.hit = true;
      }
    }
  }
}

function updatePickups(w: World, dt: number): void {
  const p = w.player;
  const list = w.pickups.list;
  const R = w.stats.pickup;
  for (let i = list.length - 1; i >= 0; i--) {
    const o = list[i];
    o.t += dt;
    const dx = p.x - o.x;
    const dy = p.y - o.y;
    const d = Math.hypot(dx, dy) || 1;
    if (!o.pulled && d < R) o.pulled = true;
    if (o.pulled) {
      const sp = 320 + (o.t > 2 ? 100 : 0);
      o.x += (dx / d) * sp * dt;
      o.y += (dy / d) * sp * dt;
    } else {
      o.x += o.vx * dt;
      o.y += o.vy * dt;
      o.vx *= 0.9;
      o.vy *= 0.9;
    }
    if (d < p.r + 8) {
      if (o.kind === 'mote') {
        gainXp(w, o.v);
        emit(w, { t: 'mote', x: o.x, y: o.y });
      } else if (o.kind === 'shard') {
        w.shardsCollected += o.v;
        emit(w, { t: 'shard', x: o.x, y: o.y });
      } else {
        w.pendingChests++;
        w.shardsCollected += 10;
        emit(w, { t: 'chest', x: o.x, y: o.y });
      }
      w.pickups.removeAt(i);
    }
  }
}

// --- progression -------------------------------------------------------------------------------

export function openChoice(w: World, exclude: UpgradeId[] = []): void {
  const chest = w.pendingLevels <= 0 && w.pendingChests > 0;
  const ids = rollChoices(
    {
      levels: w.levels, hpFrac: w.player.hp / w.player.maxHp, luck: w.stats.luck, unlocked: new Set(w.meta.unlocked),
      levelUps: w.levelUps, sinceDefensive: w.sinceDefensive, chest, exclude,
    },
    w.rng,
  );
  w.choice = { ids, chest };
  w.state = 'levelup';
}

export function applyUpgrade(w: World, id: UpgradeId): void {
  const def = UPGRADE_BY_ID[id];
  const p = w.player;
  w.levels[id]++;
  w.picks.push(id);
  w.sinceDefensive = def.defensive ? 0 : w.sinceDefensive + 1;
  const oldMax = p.maxHp;
  w.stats = deriveStats(w.levels, w.meta, w.levels.overcharge);
  p.maxHp = w.stats.maxHp;
  p.hp = Math.min(p.maxHp, p.hp + Math.max(0, p.maxHp - oldMax));
  if (id === 'repair') p.hp = Math.min(p.maxHp, p.hp + p.maxHp * 0.35);
  if (id === 'cache') w.shardsCollected += 8;
  if (id === 'siphon' && w.levels.siphon === 1) p.reserve = Math.min(reserveCap(w.levels), p.reserve + 10);
}

export function chooseCard(w: World, index: number): boolean {
  if (w.state !== 'levelup' || !w.choice) return false;
  const id = w.choice.ids[index];
  if (!id) return false;
  const chest = w.choice.chest;
  applyUpgrade(w, id);
  w.levelUps++;
  if (chest) w.pendingChests = Math.max(0, w.pendingChests - 1);
  else w.pendingLevels = Math.max(0, w.pendingLevels - 1);
  w.choice = null;
  w.state = 'playing';
  if (w.pendingLevels > 0 || w.pendingChests > 0) openChoice(w);
  return true;
}

export function rerollChoice(w: World): boolean {
  if (w.state !== 'levelup' || !w.choice || w.rerolls <= 0) return false;
  w.rerolls--;
  const prev = w.choice.ids.slice();
  openChoice(w, prev);
  return true;
}

// --- main step ---------------------------------------------------------------------------------

function updatePlayer(w: World, inp: Input, dt: number): void {
  const p = w.player;
  let mx = inp.mx;
  let my = inp.my;
  const m = Math.hypot(mx, my);
  if (m > 1) {
    mx /= m;
    my /= m;
  }
  p.vx = mx * w.stats.speed + p.kvx;
  p.vy = my * w.stats.speed + p.kvy;
  const kd = Math.max(0, 1 - 8 * dt);
  p.kvx *= kd;
  p.kvy *= kd;
  p.x += p.vx * dt;
  p.y += p.vy * dt;
  clampArena(w.arena, p, p.r);
  if (m > 0.1) p.facing = Math.atan2(my, mx);
  if (p.iframes > 0) p.iframes -= dt;
  if (p.flash > 0) p.flash -= dt;
  if (w.stats.regen > 0 && p.hp < p.maxHp) {
    p.hp = Math.min(p.maxHp, p.hp + w.stats.regen * dt);
  }
}

function separate(w: World): void {
  const out = w.scratch;
  for (const e of w.enemies.list) {
    if (!e.alive || e.kind === 'warden') continue;
    w.grid.query(e.x, e.y, e.r * 2, out);
    for (const o of out) {
      if (o === e || !o.alive || o.id < e.id || o.kind === 'warden') continue;
      const dx = o.x - e.x;
      const dy = o.y - e.y;
      const min = (e.r + o.r) * 0.9;
      const d2 = dx * dx + dy * dy;
      if (d2 < min * min && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const push = (min - d) * 0.25;
        const nx = dx / d;
        const ny = dy / d;
        e.x -= nx * push;
        e.y -= ny * push;
        o.x += nx * push;
        o.y += ny * push;
      }
    }
  }
}

function contacts(w: World): void {
  const p = w.player;
  const out = w.scratch;
  w.grid.query(p.x, p.y, 24, out);
  for (const e of out) {
    if (!e.alive) continue;
    if (Math.hypot(e.x - p.x, e.y - p.y) < e.r + p.r * 0.8) {
      if (hurtPlayer(w, e.dmg, e.x, e.y)) {
        e.kx -= ((p.x - e.x) / (e.r + 1)) * 40;
      }
    }
  }
}

export function step(w: World, inp: Input): void {
  if (w.state !== 'playing') {
    if (w.state === 'dead') w.deathTimer += DT;
    return;
  }
  const dt = DT;
  w.tick++;
  w.time += dt;

  updatePlayer(w, inp, dt);
  updateSpawner(w, dt);

  if (w.chainTimer > 0) {
    w.chainTimer -= dt;
    if (w.chainTimer <= 0) w.chain = 0;
  }
  // Foundry arena: periodic environmental lightning lane.
  if (w.arena === 'foundry' && w.wave >= 3) {
    w.laneTimer -= dt;
    if (w.laneTimer <= 0) {
      w.laneTimer = 14;
      const vertical = rand(w.rng) < 0.5;
      addLane(w, w.player.x + randRange(w.rng, -200, 200), w.player.y + randRange(w.rng, -200, 200), vertical, 16);
    }
  }

  for (const e of w.enemies.list) if (e.alive) updateEnemy(w, e, dt);
  w.grid.rebuild(w.enemies.list);
  separate(w);

  fireWeapons(w, inp, dt);
  updateBlades(w, dt);
  updateField(w, inp, dt);
  updateBullets(w, dt);
  updateHazards(w, dt);
  contacts(w);
  updatePickups(w, dt);

  if (w.pendingXp > 0) {
    gainXp(w, w.pendingXp);
    w.pendingXp = 0;
  }
  const el = w.enemies.list;
  for (let i = el.length - 1; i >= 0; i--) if (!el[i].alive) w.enemies.removeAt(i);
  const pk = w.pickups.list;
  for (let i = pk.length - 1; i >= 0; i--) if (!pk[i].alive) w.pickups.removeAt(i);
  const hz = w.hazards.list;
  for (let i = hz.length - 1; i >= 0; i--) if (!hz[i].alive) w.hazards.removeAt(i);

  if (w.state === 'playing') {
    if (w.time >= RUN_LENGTH) {
      w.state = 'won';
      w.winReason = 'Survived the full run';
      emit(w, { t: 'win', x: w.player.x, y: w.player.y });
    } else if (w.pendingLevels > 0 || w.pendingChests > 0) {
      openChoice(w);
    }
  }
}

// --- summary -----------------------------------------------------------------------------------

export interface RunSummary {
  won: boolean;
  time: number;
  wave: number;
  kills: number;
  killsBy: Record<string, number>;
  damage: number;
  level: number;
  picks: UpgradeId[];
  bosses: number;
  shardsCollected: number;
  shardsTime: number;
  shardsKills: number;
  shardsBosses: number;
  shardsWin: number;
  shardsTotal: number;
  score: number;
  rating: 'S' | 'A' | 'B' | 'C' | 'D';
  maxChain: number;
  detonations: number;
}

export function rateScore(score: number): RunSummary['rating'] {
  return score >= 4500 ? 'S' : score >= 3000 ? 'A' : score >= 1800 ? 'B' : score >= 900 ? 'C' : 'D';
}

export function summarize(w: World): RunSummary {
  const won = w.state === 'won';
  const time = Math.floor(w.time);
  const shardsTime = Math.floor(w.time / 20);
  const shardsKills = Math.floor(w.kills / 40);
  const shardsBosses = 10 * w.bossesKilled;
  const shardsWin = won ? 100 : 0;
  const collected = Math.floor(w.shardsCollected);
  const score = w.kills + 2 * time + 250 * w.bossesKilled + w.player.level * 20 + (won ? 1500 : 0);
  return {
    won, time, wave: w.wave, kills: w.kills, killsBy: { ...w.killsBy }, damage: Math.round(w.damageDealt), level: w.player.level,
    picks: w.picks.slice(), bosses: w.bossesKilled, shardsCollected: collected, shardsTime, shardsKills, shardsBosses, shardsWin,
    shardsTotal: collected + shardsTime + shardsKills + shardsBosses + shardsWin, score, rating: rateScore(score),
    maxChain: w.maxChain, detonations: w.detonations,
  };
}
