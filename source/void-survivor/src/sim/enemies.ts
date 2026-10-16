// Enemy definitions, spawning and per-enemy behaviour (pure; no DOM).
import { rand, randRange } from '../rng.ts';
import { ENEMY_CAP, BOSS_CAP, addHazard, addLane, clampArena, dmgScale, emit, fireEnemyBullet, hpMul, speedMul } from './entities.ts';
import type { Enemy, EnemyKind, World } from './types.ts';

export interface EnemyDef {
  kind: EnemyKind;
  name: string;
  hp: number;
  speed: number;
  r: number;
  dmg: number;
  xp: number;
  ess: number;
  shard: number;
  color: string;
}

export const ENEMY_DEFS: Record<EnemyKind, EnemyDef> = {
  swarm: { kind: 'swarm', name: 'Drifter', hp: 6, speed: 78, r: 9, dmg: 6, xp: 1, ess: 1, shard: 0.004, color: '#a6ff4d' },
  spitter: { kind: 'spitter', name: 'Spitter', hp: 14, speed: 60, r: 11, dmg: 6, xp: 3, ess: 2, shard: 0.02, color: '#ff4fa0' },
  rammer: { kind: 'rammer', name: 'Rammer', hp: 24, speed: 70, r: 13, dmg: 12, xp: 4, ess: 3, shard: 0.025, color: '#ffa23a' },
  cleaver: { kind: 'cleaver', name: 'Cleaver', hp: 36, speed: 52, r: 16, dmg: 9, xp: 4, ess: 3, shard: 0.025, color: '#b06cff' },
  splitlet: { kind: 'splitlet', name: 'Splitlet', hp: 5, speed: 120, r: 7, dmg: 4, xp: 1, ess: 0, shard: 0, color: '#d6a2ff' },
  aegis: { kind: 'aegis', name: 'Aegis', hp: 44, speed: 58, r: 14, dmg: 10, xp: 7, ess: 5, shard: 0.05, color: '#35f2ff' },
  caster: { kind: 'caster', name: 'Voidcaster', hp: 30, speed: 50, r: 12, dmg: 8, xp: 7, ess: 5, shard: 0.05, color: '#8a5cff' },
  warden: { kind: 'warden', name: 'Core Warden', hp: 700, speed: 45, r: 40, dmg: 14, xp: 60, ess: 40, shard: 1, color: '#ffffff' },
};

export const ENEMY_KINDS: EnemyKind[] = ['swarm', 'spitter', 'rammer', 'cleaver', 'splitlet', 'aegis', 'caster', 'warden'];

export function liveCap(w: World): number {
  return w.bossAlive ? BOSS_CAP : ENEMY_CAP;
}

export function newEnemy(): Enemy {
  return {
    id: 0, alive: false, kind: 'swarm', x: 0, y: 0, vx: 0, vy: 0, r: 9, hp: 1, maxHp: 1, speed: 1, dmg: 1, xp: 1, ess: 1,
    t: 0, state: 0, timer: 0, act: 0, ang: 0, shield: 0, shieldDir: 1, tx: 0, ty: 0, elite: false, tier: 0, phase: 0,
    flash: 0, bladeCd: 0, seed: 0, noEss: false, kx: 0, ky: 0,
  };
}

export function spawnEnemy(w: World, kind: EnemyKind, x: number, y: number, elite = false, tier = 0): Enemy {
  const d = ENEMY_DEFS[kind];
  const e = w.enemies.acquire();
  const hm = kind === 'warden' ? 1 : hpMul(w.wave);
  const em = elite ? 3.5 : 1;
  e.id = ++w.nextId;
  e.alive = true;
  e.kind = kind;
  e.x = x;
  e.y = y;
  e.vx = 0;
  e.vy = 0;
  e.kx = 0;
  e.ky = 0;
  e.r = d.r * (elite ? 1.35 : 1);
  e.hp = e.maxHp = kind === 'warden' ? 700 * (1 + 0.9 * (tier - 1)) * hpMul(w.wave) : d.hp * hm * em;
  e.speed = d.speed * speedMul(w.wave);
  e.dmg = d.dmg * dmgScale(w.wave) * (elite ? 1.3 : 1);
  e.xp = d.xp * (elite ? 3 : 1) * (kind === 'warden' ? tier : 1);
  e.ess = d.ess * (elite ? 3 : 1) * (kind === 'warden' ? tier : 1);
  e.t = 0;
  e.state = 0;
  e.timer = kind === 'warden' ? 2.2 : randRange(w.rng, 0.6, 2.2);
  e.act = 0;
  e.ang = 0;
  e.shield = rand(w.rng) * Math.PI * 2;
  e.shieldDir = rand(w.rng) < 0.5 ? 1 : -1;
  e.tx = 0;
  e.ty = 0;
  e.elite = elite;
  e.tier = tier;
  e.phase = 0;
  e.flash = 0;
  e.bladeCd = 0;
  e.seed = rand(w.rng) * 6.28;
  e.noEss = kind === 'splitlet';
  return e;
}

/** Position on a ring around the player outside the visible area, clamped into the arena. */
export function spawnPoint(w: World, minD = 560, maxD = 640, angle?: number): { x: number; y: number } {
  const a = angle ?? rand(w.rng) * Math.PI * 2;
  const d = randRange(w.rng, minD, maxD);
  const pt = { x: w.player.x + Math.cos(a) * d, y: w.player.y + Math.sin(a) * d };
  clampArena(w.arena, pt, 20);
  return pt;
}

function moveToward(e: Enemy, nx: number, ny: number, speed: number): void {
  e.vx = nx * speed;
  e.vy = ny * speed;
}

export function updateEnemy(w: World, e: Enemy, dt: number): void {
  const p = w.player;
  e.t += dt;
  if (e.flash > 0) e.flash -= dt;
  if (e.bladeCd > 0) e.bladeCd -= dt;
  const dx = p.x - e.x;
  const dy = p.y - e.y;
  const d = Math.hypot(dx, dy) || 1;
  const nx = dx / d;
  const ny = dy / d;

  switch (e.kind) {
    case 'swarm':
    case 'splitlet': {
      const wob = Math.sin(e.t * 3 + e.seed) * 0.35;
      moveToward(e, nx - ny * wob, ny + nx * wob, e.speed);
      break;
    }
    case 'cleaver':
      moveToward(e, nx, ny, e.speed);
      break;
    case 'aegis':
      e.shield += e.shieldDir * 1.4 * dt;
      moveToward(e, nx, ny, e.speed);
      break;
    case 'spitter': {
      if (e.state === 0) {
        const side = e.seed > 3.14 ? 1 : -1;
        if (d > 300) moveToward(e, nx, ny, e.speed);
        else if (d < 240) moveToward(e, -nx, -ny, e.speed);
        else moveToward(e, -ny * side, nx * side, e.speed * 0.6);
        e.timer -= dt;
        if (e.timer <= 0 && d < 520) {
          e.state = 1;
          e.timer = 0.7;
          e.ang = Math.atan2(dy, dx);
          emit(w, { t: 'telegraph', x: e.x, y: e.y });
        }
      } else {
        e.vx = e.vy = 0;
        if (e.timer > 0.25) e.ang = Math.atan2(dy, dx);
        e.timer -= dt;
        if (e.timer <= 0) {
          fireEnemyBullet(w, e.x, e.y, e.ang, 230, 8 * dmgScale(w.wave), false);
          e.state = 0;
          e.timer = 2.8 + rand(w.rng) * 0.6;
        }
      }
      break;
    }
    case 'rammer': {
      if (e.state === 0) {
        moveToward(e, nx, ny, e.speed);
        e.timer -= dt;
        if (e.timer <= 0 && d < 340) {
          e.state = 1;
          e.timer = 0.8;
          e.ang = Math.atan2(dy, dx);
          emit(w, { t: 'telegraph', x: e.x, y: e.y });
        }
      } else if (e.state === 1) {
        e.vx = e.vy = 0;
        if (e.timer > 0.3) e.ang = Math.atan2(dy, dx);
        e.timer -= dt;
        if (e.timer <= 0) {
          e.state = 2;
          e.timer = 0.55;
        }
      } else if (e.state === 2) {
        const sp = 480 * speedMul(w.wave);
        e.vx = Math.cos(e.ang) * sp;
        e.vy = Math.sin(e.ang) * sp;
        e.timer -= dt;
        if (e.timer <= 0) {
          e.state = 3;
          e.timer = 0.9;
        }
      } else {
        e.vx = e.vy = 0;
        e.timer -= dt;
        if (e.timer <= 0) {
          e.state = 0;
          e.timer = 1.5;
        }
      }
      break;
    }
    case 'caster': {
      if (e.state === 0) {
        if (d > 340) moveToward(e, nx, ny, e.speed);
        else if (d < 290) moveToward(e, -nx, -ny, e.speed);
        else moveToward(e, -ny, nx, e.speed * 0.5);
        e.timer -= dt;
        if (e.timer <= 0 && d < 600) {
          e.state = 1;
          e.timer = 0.5;
          e.tx = p.x;
          e.ty = p.y;
          emit(w, { t: 'telegraph', x: e.x, y: e.y });
        }
      } else {
        e.vx = e.vy = 0;
        e.timer -= dt;
        if (e.timer <= 0) {
          addHazard(w, { kind: 'pool', x: e.tx, y: e.ty, r: 44, tele: 1, life: 6, dps: 14 * dmgScale(w.wave) });
          emit(w, { t: 'pool', x: e.tx, y: e.ty });
          e.state = 0;
          e.timer = 5.5;
        }
      }
      break;
    }
    case 'warden':
      updateWarden(w, e, dt, nx, ny, d);
      break;
  }

  // knockback decays quickly
  e.x += (e.vx + e.kx) * dt;
  e.y += (e.vy + e.ky) * dt;
  const kd = Math.max(0, 1 - 6 * dt);
  e.kx *= kd;
  e.ky *= kd;
  clampArena(w.arena, e, e.r);
}

function updateWarden(w: World, e: Enemy, dt: number, nx: number, ny: number, d: number): void {
  const p = w.player;
  if (e.phase === 0 && e.hp <= e.maxHp * 0.5) {
    e.phase = 1;
    emit(w, { t: 'bossPhase', x: e.x, y: e.y });
  }
  const p2 = e.phase === 1;
  const dmg = (14 + 2 * e.tier) * dmgScale(w.wave);
  if (e.state === 0) {
    const sp = e.speed * (p2 ? 1.3 : 1);
    if (d > 230) moveToward(e, nx, ny, sp);
    else if (d < 150) moveToward(e, -nx, -ny, sp);
    else moveToward(e, -ny, nx, sp * 0.5);
    e.timer -= dt;
    if (e.timer <= 0) {
      const n = p2 ? 4 : 3;
      e.tx = e.act % n; // action being telegraphed
      e.act++;
      e.state = 1;
      e.timer = 0.8;
      e.ang = Math.atan2(p.y - e.y, p.x - e.x);
      emit(w, { t: 'telegraph', x: e.x, y: e.y });
    }
  } else if (e.state === 1) {
    e.vx = e.vy = 0;
    if (e.tx === 3 && e.timer > 0.3) e.ang = Math.atan2(p.y - e.y, p.x - e.x);
    e.timer -= dt;
    if (e.timer <= 0) {
      const a = e.tx;
      e.state = 0;
      e.timer = p2 ? 2.3 : 3.2;
      if (a === 0) {
        const n = 10 + 2 * e.tier;
        const off = e.t;
        for (let i = 0; i < n; i++) fireEnemyBullet(w, e.x, e.y, off + (i / n) * Math.PI * 2, 170, dmg * 0.6, true);
        if (p2) for (let i = 0; i < n; i++) fireEnemyBullet(w, e.x, e.y, -off + ((i + 0.5) / n) * Math.PI * 2, 130, dmg * 0.6, true);
      } else if (a === 1) {
        const n = p2 ? 3 : 2;
        for (let i = 0; i < n; i++) {
          const vertical = i % 2 === 0;
          const off = i === 0 ? 0 : randRange(w.rng, -160, 160);
          addLane(w, p.x + (vertical ? off : 0), p.y + (vertical ? 0 : off), vertical, (18 + 2 * e.tier) * dmgScale(w.wave));
        }
      } else if (a === 2) {
        const n = (p2 ? 6 : 4) + e.tier;
        for (let i = 0; i < n; i++) {
          if (w.enemies.count >= ENEMY_CAP) break;
          const ang = (i / n) * Math.PI * 2;
          const s = spawnEnemy(w, 'swarm', e.x + Math.cos(ang) * 60, e.y + Math.sin(ang) * 60);
          clampArena(w.arena, s, s.r);
        }
      } else {
        e.state = 2;
        e.timer = 0.6;
      }
    }
  } else {
    const sp = 520;
    e.vx = Math.cos(e.ang) * sp;
    e.vy = Math.sin(e.ang) * sp;
    e.timer -= dt;
    if (e.timer <= 0) {
      e.state = 0;
      e.timer = 1.5;
    }
  }
}
