import { ABILITIES, BOOST_DRAIN, BOOST_MULT, BOOST_REGEN, GRAVITY, REGEN_DELAY, REGEN_RATE, SPAWN_PROTECT, STEP_HEIGHT, UPGRADE_MAX, WEAPONS, HULLS, type HullDef, type Loadout, type PaintDef, type WeaponDef } from './content.ts';
import type { CollisionWorld } from './collision.ts';
import type { EventQueue } from './events.ts';
import { angleDiff, approach, clamp, damp, turnToward } from './math.ts';
import { emptyControls, type TankControls, type Team } from './types.ts';

export interface TankStats {
  kills: number;
  deaths: number;
  assists: number;
  damage: number;
  shots: number;
  hits: number;
  score: number;
  captureTime: number;
  streak: number;
  bestStreak: number;
}

export interface TankMods {
  damage: number;
  armor: number;
  speed: number;
  reload: number;
}

export function modsFromUpgrades(up: Loadout['upgrades']): TankMods {
  const lv = (v: number) => clamp(Math.floor(v), 0, UPGRADE_MAX);
  return {
    damage: 1 + 0.06 * lv(up.damage),
    armor: 7 * lv(up.armor),
    speed: 1 + 0.04 * lv(up.speed),
    reload: 1 - 0.06 * lv(up.reload),
  };
}

/** Hooks the tank needs from the world without importing it (keeps the module graph acyclic). */
export interface TankWorld {
  readonly collision: CollisionWorld;
  readonly events: EventQueue;
  readonly time: number;
  fireWeapon(t: Tank): void;
  shockwave(t: Tank): void;
}

/** Full simulation state of one tank. Mutable and allocation-free per tick. */
export class Tank {
  readonly id: number;
  readonly name: string;
  readonly isBot: boolean;
  readonly team: Team;
  readonly hull: HullDef;
  readonly weapon: WeaponDef;
  readonly paint: PaintDef;
  readonly mods: TankMods;
  readonly maxHealth: number;
  readonly armor: number;
  /** Bot-only turret speed multiplier (difficulty). */
  turretMult = 1;

  x = 0;
  y = 0;
  z = 0;
  vy = 0;
  heading = 0;
  speed = 0;
  turnVel = 0;
  kx = 0;
  kz = 0;
  /** Measured planar velocity (for AI lead and audio). */
  vx = 0;
  vz = 0;
  grounded = true;
  turretYaw = 0;
  barrelPitch = 0;
  tiltPitch = 0;
  tiltRoll = 0;

  health = 0;
  alive = false;
  respawnTimer = 0;
  spawnProtect = 0;
  lastDamageTime = -99;
  lastAttacker = -1;
  /** Sim time each other tank last damaged this one (assist credit). */
  damagedBy: number[] = [];

  cooldown = 0;
  ammo = 0;
  reloadTimer = 0;
  heat = 0;
  overheated = 0;
  venting = false;
  charging = -1;

  boost = 1;
  boosting = false;
  abilityCharge = 0.35;
  abilityTimer = 0;
  dashTimer = 0;
  shieldTimer = 0;
  overdrive = 0;
  nitro = 0;
  jolt = 0;
  stun = 0;

  /** Visual helpers. */
  recoil = 0;
  trackL = 0;
  trackR = 0;
  wallScrape = 0;

  controls: TankControls = emptyControls();
  readonly stats: TankStats = { kills: 0, deaths: 0, assists: 0, damage: 0, shots: 0, hits: 0, score: 0, captureTime: 0, streak: 0, bestStreak: 0 };

  constructor(id: number, name: string, isBot: boolean, team: Team, loadout: Loadout, paint: PaintDef, tankCount: number) {
    this.id = id;
    this.name = name;
    this.isBot = isBot;
    this.team = team;
    this.hull = HULLS[loadout.hull];
    this.weapon = WEAPONS[loadout.weapon];
    this.paint = paint;
    this.mods = modsFromUpgrades(loadout.upgrades);
    this.maxHealth = this.hull.health;
    this.armor = this.hull.armor + this.mods.armor;
    this.damagedBy = new Array(tankCount).fill(-99);
  }

  get radius(): number {
    return this.hull.radius;
  }

  /** Height of the barrel pivot above the ground point. */
  get pivotHeight(): number {
    return this.hull.turretHeight + 0.42;
  }

  isEnemyOf(o: Tank): boolean {
    return o !== this && (this.team === 'none' || this.team !== o.team);
  }

  spawn(x: number, y: number, z: number, yaw: number): void {
    this.x = x; this.y = y; this.z = z;
    this.vy = 0; this.speed = 0; this.turnVel = 0; this.kx = 0; this.kz = 0; this.vx = 0; this.vz = 0;
    this.heading = yaw;
    this.turretYaw = yaw;
    this.barrelPitch = 0;
    this.tiltPitch = 0; this.tiltRoll = 0;
    this.health = this.maxHealth;
    this.alive = true;
    this.spawnProtect = SPAWN_PROTECT;
    this.lastAttacker = -1;
    this.damagedBy.fill(-99);
    this.cooldown = 0.4;
    this.ammo = this.weapon.magazine;
    this.reloadTimer = 0;
    this.heat = 0; this.overheated = 0; this.venting = false; this.charging = -1;
    this.boost = 1;
    this.abilityTimer = 0; this.dashTimer = 0; this.shieldTimer = 0;
    this.overdrive = 0; this.nitro = 0; this.jolt = 0; this.stun = 0;
    this.controls.aimYaw = yaw;
    this.controls.aimPitch = 0;
  }

  /** Damage multiplier applied to incoming hits (abilities, spawn protection). */
  get incomingMult(): number {
    if (this.spawnProtect > 0) return 0;
    let m = 1;
    if (this.shieldTimer > 0) m *= 0.4;
    if (this.dashTimer > 0) m *= 0.5;
    return m;
  }

  get outgoingMult(): number {
    return this.mods.damage * (this.overdrive > 0 ? 1.5 : 1);
  }

  get topSpeed(): number {
    let s = this.hull.maxSpeed * this.mods.speed;
    if (this.boosting) s *= BOOST_MULT;
    if (this.nitro > 0) s *= 1.18;
    if (this.jolt > 0) s *= 0.7;
    return s;
  }

  /** Reload progress 0..1 or -1 when not reloading (HUD). */
  get reloadProgress(): number {
    if (this.reloadTimer <= 0) return -1;
    return 1 - this.reloadTimer / (this.weapon.reloadTime * this.mods.reload);
  }

  startReload(): void {
    const w = this.weapon;
    if (w.magazine > 0 && this.ammo < w.magazine && this.reloadTimer <= 0) {
      this.reloadTimer = w.reloadTime * this.mods.reload;
      this.charging = -1;
    }
  }

  step(dt: number, w: TankWorld): void {
    const c = this.controls;
    // Timers.
    this.spawnProtect = Math.max(0, this.spawnProtect - dt);
    this.overdrive = Math.max(0, this.overdrive - dt);
    this.nitro = Math.max(0, this.nitro - dt);
    this.jolt = Math.max(0, this.jolt - dt);
    this.stun = Math.max(0, this.stun - dt);
    this.dashTimer = Math.max(0, this.dashTimer - dt);
    this.shieldTimer = Math.max(0, this.shieldTimer - dt);
    this.abilityTimer = Math.max(0, this.abilityTimer - dt);
    this.recoil = Math.max(0, this.recoil - dt * 3.2);
    if (this.spawnProtect > 0 && (c.fire || Math.abs(c.throttle) > 0.1) && this.spawnProtect < SPAWN_PROTECT - 0.6) this.spawnProtect = Math.min(this.spawnProtect, 0.25);

    this.stepDrive(dt, w.collision);
    this.stepTurret(dt);
    this.stepWeapon(dt, w);
    this.stepAbility(dt, w);

    if (this.health < this.maxHealth && w.time - this.lastDamageTime > REGEN_DELAY) {
      this.health = Math.min(this.maxHealth, this.health + this.maxHealth * REGEN_RATE * dt);
    }
  }

  private stepDrive(dt: number, col: CollisionWorld): void {
    const c = this.controls;
    const h = this.hull;
    // Boost.
    const wantBoost = c.boost && c.throttle > 0.1;
    if (this.nitro > 0) {
      this.boost = 1;
      this.boosting = wantBoost;
    } else if (wantBoost && this.boost > 0.02) {
      this.boosting = true;
      this.boost = Math.max(0, this.boost - BOOST_DRAIN * dt);
    } else {
      this.boosting = false;
      this.boost = Math.min(1, this.boost + BOOST_REGEN * dt);
    }

    const top = this.topSpeed;
    let target = c.throttle >= 0 ? c.throttle * top : c.throttle * top * h.reverseFactor;
    if (this.dashTimer > 0) target = h.maxSpeed * 2.3;
    let rate: number;
    if (Math.abs(c.throttle) < 0.05 && this.dashTimer <= 0) rate = h.brake * 0.45;
    else if (Math.sign(target) === Math.sign(this.speed) || this.speed === 0) rate = Math.abs(target) > Math.abs(this.speed) ? h.accel * (this.boosting ? 1.35 : 1) : h.brake * 0.6;
    else rate = h.brake;
    if (this.dashTimer > 0) rate = 90;
    this.speed = approach(this.speed, target, rate * dt);

    const speedFrac = Math.min(1, Math.abs(this.speed) / h.maxSpeed);
    const wantTurn = c.steer * h.turnRate * (1 - 0.28 * speedFrac) * (this.jolt > 0 ? 0.8 : 1);
    this.turnVel = approach(this.turnVel, wantTurn, 9 * dt);
    this.heading += this.turnVel * dt;

    const fx = Math.sin(this.heading);
    const fz = Math.cos(this.heading);
    const ox = this.x, oz = this.z;
    this.x += (fx * this.speed + this.kx) * dt;
    this.z += (fz * this.speed + this.kz) * dt;
    const kd = Math.exp(-3.5 * dt);
    this.kx *= kd;
    this.kz *= kd;

    _n.x = 0; _n.z = 0;
    _p.x = this.x; _p.z = this.z;
    let hit = col.resolveCircle(_p, this.y, h.radius, _n);
    if (hit) hit = col.resolveCircle(_p, this.y, h.radius, _n) || hit;
    this.x = _p.x;
    this.z = _p.z;
    this.wallScrape = Math.max(0, this.wallScrape - dt * 4);
    if (hit) {
      const nl = Math.hypot(_n.x, _n.z);
      if (nl > 1e-6) {
        const nx = _n.x / nl, nz = _n.z / nl;
        const into = (fx * nx + fz * nz) * Math.sign(this.speed);
        if (into < -0.2) {
          this.speed *= 1 - Math.min(1, dt * 7 * -into);
          this.wallScrape = Math.min(1, this.wallScrape + Math.abs(this.speed) * 0.05);
        }
        const kn = this.kx * nx + this.kz * nz;
        if (kn < 0) { this.kx -= kn * nx; this.kz -= kn * nz; }
      }
    }

    // Vertical: stick to slopes, fall off ledges.
    const ground = col.surfaceHeight(this.x, this.z, this.y, STEP_HEIGHT);
    if (ground >= this.y - 0.02) {
      this.y = ground;
      this.vy = 0;
      this.grounded = true;
    } else if (this.grounded && this.y - ground < 0.4 && this.vy <= 0) {
      this.y = ground;
      this.vy = 0;
    } else {
      this.grounded = false;
      this.vy -= GRAVITY * dt;
      this.y += this.vy * dt;
      if (this.y <= ground) {
        this.y = ground;
        this.vy = 0;
        this.grounded = true;
      }
    }

    // Measured velocity and track travel (differential for turning).
    if (dt > 0) {
      this.vx = (this.x - ox) / dt;
      this.vz = (this.z - oz) / dt;
    }
    const lin = this.vx * fx + this.vz * fz;
    const spin = this.turnVel * h.width * 0.5;
    this.trackL += (lin + spin) * dt;
    this.trackR += (lin - spin) * dt;

    // Hull tilt from the surface under the tank's footprint.
    const hl = h.length * 0.42, hw = h.width * 0.42;
    const yRef = this.y + 0.3;
    const hf = col.surfaceHeight(this.x + fx * hl, this.z + fz * hl, yRef, 0.6);
    const hb = col.surfaceHeight(this.x - fx * hl, this.z - fz * hl, yRef, 0.6);
    const hL = col.surfaceHeight(this.x + fz * hw, this.z - fx * hw, yRef, 0.6);
    const hR = col.surfaceHeight(this.x - fz * hw, this.z + fx * hw, yRef, 0.6);
    const tp = this.grounded ? clamp(Math.atan2(hf - hb, hl * 2), -0.5, 0.5) : this.tiltPitch * 0.98;
    const tr = this.grounded ? clamp(Math.atan2(hL - hR, hw * 2), -0.4, 0.4) : this.tiltRoll * 0.98;
    const k = damp(9, dt);
    this.tiltPitch += (tp - this.tiltPitch) * k;
    this.tiltRoll += (tr - this.tiltRoll) * k;
  }

  private stepTurret(dt: number): void {
    const c = this.controls;
    const w = this.weapon;
    const sp = this.stun > 0 ? 0.15 : 1;
    this.turretYaw = turnToward(this.turretYaw, c.aimYaw, w.turretSpeed * this.turretMult * sp * dt);
    this.barrelPitch = approach(this.barrelPitch, clamp(c.aimPitch, w.pitchMin, w.pitchMax), 1.1 * sp * dt);
  }

  /** Turret misalignment from the commanded aim (AI fire discipline, HUD). */
  get aimError(): number {
    return Math.abs(angleDiff(this.turretYaw, this.controls.aimYaw)) + Math.abs(this.barrelPitch - clamp(this.controls.aimPitch, this.weapon.pitchMin, this.weapon.pitchMax));
  }

  private stepWeapon(dt: number, wd: TankWorld): void {
    const w = this.weapon;
    const c = this.controls;
    this.cooldown = Math.max(0, this.cooldown - dt);
    if (this.reloadTimer > 0) {
      this.reloadTimer -= dt;
      if (this.reloadTimer <= 0) {
        this.reloadTimer = 0;
        this.ammo = w.magazine;
        wd.events.push('reload', this.id);
      }
    }
    if (w.heatPerShot > 0) {
      if (this.overheated > 0) {
        this.overheated = Math.max(0, this.overheated - dt);
        this.heat = Math.max(0, this.heat - w.coolRate * 1.6 * dt);
        if (this.overheated === 0) this.heat = Math.min(this.heat, 0.25);
      } else if (this.venting) {
        this.heat = Math.max(0, this.heat - (1 / (w.reloadTime * this.mods.reload)) * dt);
        if (this.heat === 0) this.venting = false;
      } else {
        this.heat = Math.max(0, this.heat - w.coolRate * dt * (c.fire ? 0.15 : 1));
      }
    }
    if (c.reload) {
      if (w.magazine > 0) this.startReload();
      else if (w.heatPerShot > 0 && this.heat > 0.08 && this.overheated === 0) this.venting = true;
    }

    if (this.charging >= 0) {
      this.charging -= dt;
      if (this.charging <= 0) {
        this.charging = -1;
        this.shoot(wd);
      }
      return;
    }
    if (!c.fire || !this.alive || this.cooldown > 0 || this.reloadTimer > 0 || this.overheated > 0 || this.venting) return;
    if (w.magazine > 0 && this.ammo <= 0) {
      this.startReload();
      return;
    }
    if (w.charge > 0) {
      this.charging = w.charge;
      wd.events.push('charge', this.id);
      return;
    }
    this.shoot(wd);
  }

  private shoot(wd: TankWorld): void {
    const w = this.weapon;
    this.cooldown = w.cooldown * this.mods.reload;
    if (w.magazine > 0) {
      this.ammo--;
      if (this.ammo <= 0) this.startReload();
    }
    if (w.heatPerShot > 0) {
      this.heat += w.heatPerShot;
      if (this.heat >= 1) {
        this.heat = 1;
        this.overheated = w.overheatLock;
        wd.events.push('overheat', this.id);
      }
    }
    this.recoil = 1;
    this.stats.shots++;
    this.spawnProtect = 0;
    // Recoil nudges light tanks backwards a touch.
    const k = (w.recoil * 1.2) / this.hull.mass;
    this.kx -= Math.sin(this.turretYaw) * k;
    this.kz -= Math.cos(this.turretYaw) * k;
    wd.fireWeapon(this);
  }

  private stepAbility(dt: number, wd: TankWorld): void {
    const ab = ABILITIES[this.hull.ability];
    if (this.abilityTimer <= 0) this.abilityCharge = Math.min(1, this.abilityCharge + dt / ab.chargeTime);
    if (!this.controls.ability || this.abilityCharge < 1 || !this.alive) return;
    this.abilityCharge = 0;
    this.abilityTimer = ab.duration;
    if (ab.id === 'dash') this.dashTimer = ab.duration;
    else if (ab.id === 'aegis') this.shieldTimer = ab.duration;
    else wd.shockwave(this);
    wd.events.push('ability', this.id, -1, ab.id);
  }

  /** Damage-dealt bonus to ability charge. */
  addAbilityCharge(amount: number): void {
    this.abilityCharge = Math.min(1, this.abilityCharge + amount);
  }

  /** World-space barrel direction into `out`. */
  barrelDir(out: { x: number; y: number; z: number }): void {
    const cp = Math.cos(this.barrelPitch);
    out.x = Math.sin(this.turretYaw) * cp;
    out.y = Math.sin(this.barrelPitch);
    out.z = Math.cos(this.turretYaw) * cp;
  }

  /** World-space muzzle position into `out`. */
  muzzle(out: { x: number; y: number; z: number }): void {
    this.barrelDir(out);
    const L = this.weapon.barrelLength;
    out.x = this.x + out.x * L;
    out.y = this.y + this.pivotHeight + out.y * L;
    out.z = this.z + out.z * L;
  }
}

const _n = { x: 0, z: 0 };
const _p = { x: 0, z: 0 };
