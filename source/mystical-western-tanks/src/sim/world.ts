import { Brain } from './ai.ts';
import { getArena } from './arenas.ts';
import { CollisionWorld, type RayHit } from './collision.ts';
import { ASSIST_XP, BOT_NAMES, DIFFICULTIES, KILL_XP, MODES, PAINTS, RESPAWN_DELAY, WEAPONS, type Loadout, type PaintDef, type WeaponDef } from './content.ts';
import { EventQueue } from './events.ts';
import { clamp, dist2D, Rng } from './math.ts';
import { NavGraph } from './nav.ts';
import { ProjectilePool, segmentTank, type Projectile } from './projectiles.ts';
import { Tank, type TankWorld } from './tank.ts';
import type { ArenaDef, ArenaId, DifficultyId, HullId, ModeId, PickupSpawn, SpawnPoint, Team, WeaponId } from './types.ts';

export interface MatchConfig {
  mode: ModeId;
  arena: ArenaId;
  difficulty: DifficultyId;
  scoreLimit: number;
  timeLimit: number;
  /** Player loadout; null runs a bots-only match (headless checks, attract mode). */
  player: { name: string; loadout: Loadout; paint: PaintDef } | null;
  seed: number;
}

export interface PickupState {
  def: PickupSpawn;
  active: boolean;
  timer: number;
}

export interface ControlPointState {
  owner: Team;
  /** -1 (magenta) … +1 (blue). */
  progress: number;
  contested: boolean;
  blueIn: number;
  magentaIn: number;
  tick: number;
}

export type MatchStatus = 'countdown' | 'playing' | 'ended';

const PICKUP_RESPAWN: Record<PickupSpawn['kind'], number> = { repair: 20, overdrive: 30, nitro: 22 };
const COUNTDOWN = 3;
const ASSIST_WINDOW = 8;

/** Navigation graphs are expensive to build and immutable: cache per arena. */
const navCache = new Map<ArenaId, { col: CollisionWorld; nav: NavGraph }>();

export function arenaRuntime(id: ArenaId): { arena: ArenaDef; col: CollisionWorld; nav: NavGraph } {
  const arena = getArena(id);
  let rt = navCache.get(id);
  if (!rt) {
    const col = new CollisionWorld(arena);
    rt = { col, nav: new NavGraph(arena, col) };
    navCache.set(id, rt);
  }
  return { arena, ...rt };
}

const _hit: RayHit = { t: 0, x: 0, y: 0, z: 0, nx: 0, ny: 0, nz: 0 };
const _dir = { x: 0, y: 0, z: 0 };
const _mz = { x: 0, y: 0, z: 0 };

/**
 * One match: tanks, bot brains, projectiles, pickups, control point and score.
 * `step(dt)` is deterministic for a given seed and control input, which keeps
 * the door open for an authoritative server running the same code.
 */
export class World implements TankWorld {
  readonly config: MatchConfig;
  readonly mode: ModeId;
  readonly arena: ArenaDef;
  readonly collision: CollisionWorld;
  readonly nav: NavGraph;
  readonly events = new EventQueue();
  readonly tanks: Tank[] = [];
  readonly brains: Brain[] = [];
  readonly projectiles: ProjectilePool;
  readonly pickups: PickupState[];
  readonly cp: ControlPointState = { owner: 'none', progress: 0, contested: false, blueIn: 0, magentaIn: 0, tick: 0 };
  readonly rng: Rng;
  readonly player: Tank | null;
  time = 0;
  status: MatchStatus = 'countdown';
  countdown = COUNTDOWN;
  timeLeft: number;
  score = { blue: 0, magenta: 0 };
  winner: Team | 'draw' | number = 'draw';

  constructor(config: MatchConfig) {
    this.config = config;
    this.mode = config.mode;
    const rt = arenaRuntime(config.arena);
    this.arena = rt.arena;
    this.collision = rt.col;
    this.nav = rt.nav;
    this.rng = new Rng(config.seed);
    this.timeLeft = config.timeLimit;
    this.projectiles = new ProjectilePool(320, WEAPONS.plasma);
    this.pickups = this.arena.pickups.map((def) => ({ def, active: true, timer: 0 }));

    const teams = MODES[config.mode].teams;
    const total = 8;
    const names = [...BOT_NAMES];
    for (let i = names.length - 1; i > 0; i--) {
      const j = this.rng.int(0, i + 1);
      [names[i], names[j]] = [names[j], names[i]];
    }
    const diff = DIFFICULTIES[config.difficulty];
    const botUp = config.difficulty === 'rookie' ? 0 : config.difficulty === 'veteran' ? 1 : 2;
    const hulls: HullId[] = ['hornet', 'vanguard', 'bastion'];
    const weapons: WeaponId[] = ['plasma', 'rail', 'volt', 'nova'];
    let botIdx = 0;
    for (let i = 0; i < total; i++) {
      const team: Team = teams ? (i % 2 === 0 ? 'blue' : 'magenta') : 'none';
      if (i === 0 && config.player) {
        const p = config.player;
        this.tanks.push(new Tank(0, p.name, false, team, p.loadout, p.paint, total));
        continue;
      }
      const loadout: Loadout = {
        hull: this.rng.pick(hulls),
        weapon: this.rng.pick(weapons),
        paint: 'graphite',
        upgrades: { damage: botUp, armor: botUp, speed: botUp, reload: botUp },
      };
      const paint = PAINTS[this.rng.int(0, PAINTS.length)];
      const t = new Tank(i, names[botIdx++ % names.length], true, team, loadout, paint, total);
      this.tanks.push(t);
      this.brains.push(new Brain(t, diff, config.seed * 31 + i * 977));
    }
    this.player = config.player ? this.tanks[0] : null;
    for (const t of this.tanks) this.respawn(t);
  }

  // ---------------------------------------------------------------- stepping

  step(dt: number): void {
    this.time += dt;
    if (this.status === 'countdown') {
      const before = Math.ceil(this.countdown);
      this.countdown -= dt;
      if (Math.ceil(this.countdown) !== before && this.countdown > 0) this.events.push('countdown', -1, -1).value = Math.ceil(this.countdown);
      if (this.countdown <= 0) {
        this.status = 'playing';
        this.events.push('countdown', -1, -1).value = 0;
      }
      // Turrets may move during the countdown; hulls stay put.
      for (const b of this.brains) b.update(this, dt);
      for (const t of this.tanks) {
        t.controls.throttle = 0; t.controls.steer = 0; t.controls.fire = false; t.controls.ability = false; t.controls.boost = false;
        t.step(dt, this);
      }
      return;
    }
    if (this.status === 'ended') {
      for (const t of this.tanks) {
        t.controls.throttle = 0; t.controls.steer = 0; t.controls.fire = false; t.controls.ability = false; t.controls.boost = false;
        if (t.alive) t.step(dt, this);
      }
      this.stepProjectiles(dt);
      return;
    }

    this.timeLeft = Math.max(0, this.timeLeft - dt);
    for (const b of this.brains) b.update(this, dt);
    for (const t of this.tanks) {
      if (t.alive) t.step(dt, this);
      else {
        t.respawnTimer -= dt;
        if (t.respawnTimer <= 0) this.respawn(t);
      }
    }
    this.separateTanks();
    this.stepProjectiles(dt);
    this.stepPickups(dt);
    if (this.mode === 'cp') this.stepControlPoint(dt);
    this.checkEnd();
  }

  private separateTanks(): void {
    const ts = this.tanks;
    for (let i = 0; i < ts.length; i++) {
      const a = ts[i];
      if (!a.alive) continue;
      for (let j = i + 1; j < ts.length; j++) {
        const b = ts[j];
        if (!b.alive || Math.abs(a.y - b.y) > 2) continue;
        const dx = b.x - a.x, dz = b.z - a.z;
        const min = a.radius + b.radius;
        const d2 = dx * dx + dz * dz;
        if (d2 >= min * min) continue;
        const d = Math.sqrt(d2) || 0.001;
        const nx = dx / d, nz = dz / d;
        const push = min - d;
        const wa = b.hull.mass / (a.hull.mass + b.hull.mass);
        a.x -= nx * push * wa; a.z -= nz * push * wa;
        b.x += nx * push * (1 - wa); b.z += nz * push * (1 - wa);
        a.speed *= 0.96;
        b.speed *= 0.96;
      }
    }
    // Pushes may have shoved someone into a wall; resolve once more.
    for (const t of ts) {
      if (!t.alive) continue;
      _mz.x = t.x; _mz.z = t.z;
      if (this.collision.resolveCircle(_mz, t.y, t.radius, null)) { t.x = _mz.x; t.z = _mz.z; }
    }
  }

  // ---------------------------------------------------------------- weapons

  fireWeapon(t: Tank): void {
    const w = t.weapon;
    t.barrelDir(_dir);
    // Spread.
    if (w.spread > 0) {
      const a = this.rng.range(0, Math.PI * 2);
      const r = this.rng.next() * w.spread;
      const ux = Math.cos(t.turretYaw), uz = -Math.sin(t.turretYaw);
      _dir.x += ux * Math.cos(a) * r;
      _dir.z += uz * Math.cos(a) * r;
      _dir.y += Math.sin(a) * r;
      const l = Math.hypot(_dir.x, _dir.y, _dir.z);
      _dir.x /= l; _dir.y /= l; _dir.z /= l;
    }
    t.muzzle(_mz);
    // Barrel poking into a wall: the shot detonates at the obstruction.
    const px = t.x, py = t.y + t.pivotHeight, pz = t.z;
    let ox = _mz.x, oy = _mz.y, oz = _mz.z;
    if (this.collision.raycast(px, py, pz, ox - px, oy - py, oz - pz, 1, _hit)) {
      ox = px + (ox - px) * Math.max(0, _hit.t - 0.05);
      oy = py + (oy - py) * Math.max(0, _hit.t - 0.05);
      oz = pz + (oz - pz) * Math.max(0, _hit.t - 0.05);
    }
    const p = this.projectiles.spawn(t, ox, oy, oz, _dir.x, _dir.y, _dir.z, w, t.outgoingMult);
    const e = this.events.push('fire', t.id, p.slot, w.id);
    e.x = _mz.x; e.y = _mz.y; e.z = _mz.z;
    e.x2 = _dir.x; e.y2 = _dir.y; e.z2 = _dir.z;
  }

  private stepProjectiles(dt: number): void {
    for (const p of this.projectiles.items) {
      if (!p.active) continue;
      const w = p.weapon;
      p.life -= dt;
      p.vy -= w.gravity * dt;
      const dx = p.vx * dt, dy = p.vy * dt, dz = p.vz * dt;
      let bestT = 2;
      let target: Tank | null = null;
      const owner = this.tanks[p.owner];
      for (const t of this.tanks) {
        if (!t.alive || t.id === p.owner || !owner.isEnemyOf(t)) continue;
        // Cheap reject before the sphere tests.
        const mx = t.x - p.x, mz = t.z - p.z;
        const reach = Math.abs(dx) + Math.abs(dz) + t.hull.length;
        if (Math.abs(mx) > reach || Math.abs(mz) > reach) continue;
        const s = segmentTank(t, p.x, p.y, p.z, dx, dy, dz);
        if (s >= 0 && s < bestT) { bestT = s; target = t; }
      }
      const worldHit = this.collision.raycast(p.x, p.y, p.z, dx, dy, dz, 1, _hit) && _hit.t < bestT;
      if (worldHit) {
        this.impact(p, _hit.x, _hit.y, _hit.z, _hit.nx, _hit.ny, _hit.nz, null);
      } else if (target) {
        const hx = p.x + dx * bestT, hy = p.y + dy * bestT, hz = p.z + dz * bestT;
        const l = Math.hypot(dx, dy, dz) || 1;
        this.impact(p, hx, hy, hz, -dx / l, -dy / l, -dz / l, target);
      } else if (p.life <= 0) {
        p.x += dx; p.y += dy; p.z += dz;
        // Rockets airburst at the end of their flight; other shots fizzle.
        if (w.splashRadius > 3) this.impact(p, p.x, p.y, p.z, 0, 1, 0, null);
        else this.endShot(p, p.x, p.y, p.z);
      } else {
        p.x += dx; p.y += dy; p.z += dz;
      }
    }
  }

  private endShot(p: Projectile, x: number, y: number, z: number): void {
    if (p.weapon.projectile === 'rail') {
      const e = this.events.push('beam', p.owner, -1, 'rail');
      e.x = p.ox; e.y = p.oy; e.z = p.oz; e.x2 = x; e.y2 = y; e.z2 = z;
    }
    p.active = false;
  }

  private impact(p: Projectile, x: number, y: number, z: number, nx: number, ny: number, nz: number, target: Tank | null): void {
    const w = p.weapon;
    const owner = this.tanks[p.owner];
    this.endShot(p, x, y, z);
    const e = this.events.push('impact', target ? target.id : -1, p.owner, w.id);
    e.x = x; e.y = y; e.z = z; e.x2 = nx; e.y2 = ny; e.z2 = nz;
    if (target) {
      const dmg = w.damage * p.dmgMult;
      owner.stats.hits++;
      this.applyDamage(target, owner, dmg, w, x, y, z, w.pierce);
      if (w.jolt > 0) target.jolt = Math.max(target.jolt, w.jolt);
      if (w.knockback > 0 && w.splashRadius < 3) {
        const l = Math.hypot(p.vx, p.vz) || 1;
        target.kx += (p.vx / l) * w.knockback / target.hull.mass;
        target.kz += (p.vz / l) * w.knockback / target.hull.mass;
      }
    }
    if (w.splashRadius > 0) this.explode(x + nx * 0.3, y + ny * 0.3, z + nz * 0.3, w.splashRadius, w.splashDamage * p.dmgMult, owner, w.splashRadius > 3 ? w.knockback : 0, w, null);
  }

  /** Radial damage with linear falloff and line-of-sight occlusion. */
  explode(x: number, y: number, z: number, radius: number, damage: number, owner: Tank, knockback: number, w: WeaponDef | null, exclude: Tank | null): void {
    const e = this.events.push('explode', owner.id, -1, w ? w.id : 'shockwave');
    e.x = x; e.y = y; e.z = z; e.value = radius;
    for (const t of this.tanks) {
      if (!t.alive || t === exclude || !owner.isEnemyOf(t)) continue;
      const cx = t.x, cy = t.y + 1, cz = t.z;
      const d = Math.hypot(cx - x, cy - y, cz - z) - t.radius * 0.6;
      if (d > radius) continue;
      if (!this.collision.segmentClear(x, y, z, cx, cy, cz)) continue;
      const f = clamp(1 - Math.max(0, d) / radius, 0.3, 1);
      this.applyDamage(t, owner, damage * f, w, cx, cy, cz, 0);
      if (knockback > 0 && t.alive) {
        const dx = cx - x, dz = cz - z;
        const l = Math.hypot(dx, dz) || 1;
        const k = (knockback * f) / t.hull.mass;
        t.kx += (dx / l) * k;
        t.kz += (dz / l) * k;
        if (t.grounded) { t.vy = Math.min(4, 2.2 * f / t.hull.mass * 2); t.grounded = false; t.y += 0.02; }
      }
    }
  }

  shockwave(t: Tank): void {
    this.explode(t.x, t.y + 0.8, t.z, 12, 46 * t.outgoingMult, t, 10, null, null);
    for (const o of this.tanks) {
      if (o.alive && t.isEnemyOf(o) && dist2D(t.x, t.z, o.x, o.z) < 12 && Math.abs(o.y - t.y) < 3) o.stun = Math.max(o.stun, 1.6);
    }
  }

  applyDamage(target: Tank, attacker: Tank, raw: number, w: WeaponDef | null, x: number, y: number, z: number, pierce: number): void {
    if (!target.alive) return;
    const mult = target.incomingMult;
    if (mult <= 0) return;
    const armor = target.armor * (1 - pierce);
    const dmg = (raw * 100) / (100 + armor) * mult;
    if (dmg <= 0) return;
    target.health -= dmg;
    target.lastDamageTime = this.time;
    target.lastAttacker = attacker.id;
    target.damagedBy[attacker.id] = this.time;
    attacker.stats.damage += dmg;
    attacker.addAbilityCharge(dmg / 260);
    const e = this.events.push('damage', target.id, attacker.id, w ? w.id : 'shockwave');
    e.x = x; e.y = y; e.z = z; e.value = dmg;
    if (target.health <= 0) this.kill(target, attacker, w);
  }

  private kill(victim: Tank, killer: Tank, w: WeaponDef | null): void {
    victim.health = 0;
    victim.alive = false;
    victim.respawnTimer = RESPAWN_DELAY;
    victim.stats.deaths++;
    victim.stats.streak = 0;
    victim.charging = -1;
    if (killer !== victim) {
      killer.stats.kills++;
      killer.stats.streak++;
      killer.stats.bestStreak = Math.max(killer.stats.bestStreak, killer.stats.streak);
      killer.stats.score += KILL_XP;
      if (this.mode === 'tdm' && killer.team !== 'none') this.score[killer.team as 'blue' | 'magenta']++;
    }
    for (const o of this.tanks) {
      if (o === killer || o === victim) continue;
      if (this.time - victim.damagedBy[o.id] < ASSIST_WINDOW) {
        o.stats.assists++;
        o.stats.score += ASSIST_XP;
      }
    }
    const e = this.events.push('kill', victim.id, killer.id, w ? w.id : 'shockwave');
    e.x = victim.x; e.y = victim.y; e.z = victim.z;
    e.value = killer.stats.streak;
  }

  respawn(t: Tank): void {
    const sp = this.pickSpawn(t);
    t.spawn(sp.x, this.collision.surfaceHeight(sp.x, sp.z, 0), sp.z, sp.yaw);
    const brain = this.brains.find((b) => b.tank === t);
    if (brain) brain.reset();
    this.events.push('spawn', t.id);
  }

  private pickSpawn(t: Tank): SpawnPoint {
    const s = this.arena.spawns;
    const list = t.team === 'blue' ? s.blue : t.team === 'magenta' ? s.magenta : s.ffa;
    let best = list[0];
    let bestScore = -Infinity;
    for (const p of list) {
      let nearestEnemy = 200;
      let crowded = false;
      for (const o of this.tanks) {
        if (!o.alive || o === t) continue;
        const d = dist2D(p.x, p.z, o.x, o.z);
        if (d < 6) crowded = true;
        if (t.isEnemyOf(o)) nearestEnemy = Math.min(nearestEnemy, d);
      }
      const score = nearestEnemy + this.rng.range(0, 12) - (crowded ? 100 : 0);
      if (score > bestScore) { bestScore = score; best = p; }
    }
    return best;
  }

  // ---------------------------------------------------------------- pickups & modes

  private stepPickups(dt: number): void {
    for (let i = 0; i < this.pickups.length; i++) {
      const p = this.pickups[i];
      if (!p.active) {
        p.timer -= dt;
        if (p.timer <= 0) {
          p.active = true;
          this.events.push('pickupReady', -1, i, p.def.kind);
        }
        continue;
      }
      for (const t of this.tanks) {
        if (!t.alive || Math.abs(t.y - p.def.y) > 2 || dist2D(t.x, t.z, p.def.x, p.def.z) > 2.8) continue;
        if (p.def.kind === 'repair') {
          if (t.health >= t.maxHealth - 1) continue;
          t.health = Math.min(t.maxHealth, t.health + t.maxHealth * 0.5);
        } else if (p.def.kind === 'overdrive') t.overdrive = 12;
        else { t.nitro = 10; t.boost = 1; }
        p.active = false;
        p.timer = PICKUP_RESPAWN[p.def.kind];
        const e = this.events.push('pickup', t.id, i, p.def.kind);
        e.x = p.def.x; e.y = p.def.y; e.z = p.def.z;
        break;
      }
    }
  }

  private stepControlPoint(dt: number): void {
    const cp = this.cp;
    const def = this.arena.controlPoint;
    let blue = 0, mag = 0;
    for (const t of this.tanks) {
      if (!t.alive || Math.abs(t.y - def.y) > 2.2 || dist2D(t.x, t.z, def.x, def.z) > def.r) continue;
      if (t.team === 'blue') blue++;
      else if (t.team === 'magenta') mag++;
      t.stats.captureTime += dt;
    }
    cp.blueIn = blue;
    cp.magentaIn = mag;
    cp.contested = blue > 0 && mag > 0;
    const before = cp.progress;
    if (!cp.contested && (blue > 0 || mag > 0)) {
      const n = Math.max(blue, mag);
      const rate = 0.2 * (1 + 0.35 * (Math.min(n, 3) - 1));
      cp.progress = clamp(cp.progress + (blue > 0 ? rate : -rate) * dt, -1, 1);
    } else if (blue === 0 && mag === 0) {
      const rest = cp.owner === 'blue' ? 1 : cp.owner === 'magenta' ? -1 : 0;
      cp.progress += clamp(rest - cp.progress, -0.06 * dt, 0.06 * dt);
    }
    if (cp.owner !== 'blue' && cp.progress >= 1) this.captured('blue');
    else if (cp.owner !== 'magenta' && cp.progress <= -1) this.captured('magenta');
    else if (cp.owner === 'blue' && before > 0 && cp.progress <= 0) { cp.owner = 'none'; this.events.push('neutral'); }
    else if (cp.owner === 'magenta' && before < 0 && cp.progress >= 0) { cp.owner = 'none'; this.events.push('neutral'); }

    if (cp.owner === 'blue' || cp.owner === 'magenta') {
      cp.tick += dt;
      while (cp.tick >= 1) {
        cp.tick -= 1;
        this.score[cp.owner]++;
      }
    } else cp.tick = 0;
  }

  private captured(team: 'blue' | 'magenta'): void {
    this.cp.owner = team;
    this.events.push('capture', -1, -1, team);
    const def = this.arena.controlPoint;
    for (const t of this.tanks) {
      if (t.alive && t.team === team && dist2D(t.x, t.z, def.x, def.z) <= def.r) t.stats.score += 60;
    }
  }

  private checkEnd(): void {
    const limit = this.config.scoreLimit;
    let ended = this.timeLeft <= 0;
    if (MODES[this.mode].teams) {
      if (this.score.blue >= limit || this.score.magenta >= limit) ended = true;
    } else if (this.tanks.some((t) => t.stats.kills >= limit)) ended = true;
    if (!ended) return;
    this.status = 'ended';
    if (MODES[this.mode].teams) {
      this.winner = this.score.blue > this.score.magenta ? 'blue' : this.score.magenta > this.score.blue ? 'magenta' : 'draw';
    } else {
      const ranked = this.ranking();
      const a = ranked[0], b = ranked[1];
      this.winner = b && a.stats.kills === b.stats.kills && a.stats.deaths === b.stats.deaths ? 'draw' : a.id;
    }
    this.events.push('matchEnd');
  }

  /** Scoreboard order: kills, then score, then fewer deaths. */
  ranking(): Tank[] {
    return [...this.tanks].sort((a, b) => b.stats.kills - a.stats.kills || b.stats.score - a.stats.score || a.stats.deaths - b.stats.deaths);
  }

  /** Did the player's side win? (team modes: team; FFA: placed first) */
  playerResult(): 'win' | 'loss' | 'draw' {
    const p = this.player;
    if (!p) return 'draw';
    if (this.winner === 'draw') return 'draw';
    if (typeof this.winner === 'number') return this.winner === p.id ? 'win' : 'loss';
    return this.winner === p.team ? 'win' : 'loss';
  }
}
