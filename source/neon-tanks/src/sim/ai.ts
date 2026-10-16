import type { DifficultyDef } from './content.ts';
import { angleDiff, clamp, dist2D, Rng, wrapAngle, yawOf } from './math.ts';
import type { Tank } from './tank.ts';
import type { World } from './world.ts';

type BotState = 'roam' | 'engage' | 'retreat' | 'pursue';

const _fwd = { x: 0, z: 0 };

/**
 * Bot brain: perceives (line of sight, recent damage), picks a state
 * (roam / engage / retreat / pursue), plans with A* on the nav graph and then
 * writes TankControls every tick — steering, turret aim with difficulty-scaled
 * error and lead, fire discipline, boost and ability use.
 */
export class Brain {
  readonly tank: Tank;
  readonly diff: DifficultyDef;
  private readonly rng: Rng;
  state: BotState = 'roam';
  targetId = -1;
  private targetVisible = false;
  private lastSeenX = 0;
  private lastSeenY = 0;
  private lastSeenZ = 0;
  private lastSeenTime = -99;
  private firstSeenTime = -99;
  private readonly path: number[] = [];
  private pathIdx = 0;
  private goalX = 0;
  private goalY = 0;
  private goalZ = 0;
  private hasGoal = false;
  private repath = 0;
  private think = 0;
  private strafeDir = 1;
  private strafeTimer = 0;
  private progressTimer = 0;
  private snapX = 0;
  private snapZ = 0;
  private unstuck = 0;
  private unstuckSteer = 1;
  private noiseYaw = 0;
  private noisePitch = 0;
  private noiseTY = 0;
  private noiseTP = 0;
  private noiseTimer = 0;
  private losTimer = 0;
  private abilityRoll = 0;
  /** Exposed for the headless check: how many times the bot had to back out of a jam. */
  unstuckCount = 0;

  constructor(tank: Tank, diff: DifficultyDef, seed: number) {
    this.tank = tank;
    this.diff = diff;
    this.rng = new Rng(seed);
    this.think = this.rng.range(0, diff.think);
    tank.turretMult = diff.turretMult;
  }

  reset(): void {
    this.state = 'roam';
    this.targetId = -1;
    this.targetVisible = false;
    this.path.length = 0;
    this.hasGoal = false;
    this.repath = 0;
    this.unstuck = 0;
    this.progressTimer = 0;
    this.snapX = this.tank.x;
    this.snapZ = this.tank.z;
  }

  update(w: World, dt: number): void {
    const t = this.tank;
    const c = t.controls;
    if (!t.alive) {
      c.throttle = 0; c.steer = 0; c.fire = false; c.boost = false; c.ability = false; c.reload = false;
      return;
    }
    this.think -= dt;
    if (this.think <= 0) {
      this.think = this.diff.think * this.rng.range(0.8, 1.2);
      this.decide(w);
    }
    this.losTimer -= dt;
    if (this.losTimer <= 0 && this.targetId >= 0) {
      this.losTimer = 0.2;
      const tg = w.tanks[this.targetId];
      this.targetVisible = tg.alive && this.canSee(w, tg);
      if (this.targetVisible) this.markSeen(w, tg);
    }
    this.steer(w, dt);
    this.aim(w, dt);
  }

  private canSee(w: World, o: Tank): boolean {
    const t = this.tank;
    const d = dist2D(t.x, t.z, o.x, o.z);
    if (d > this.diff.viewRange) return false;
    return w.collision.segmentClear(t.x, t.y + t.pivotHeight, t.z, o.x, o.y + 1.1, o.z);
  }

  private markSeen(w: World, o: Tank): void {
    if (w.time - this.lastSeenTime > 2.5) this.firstSeenTime = w.time;
    this.lastSeenX = o.x;
    this.lastSeenY = o.y;
    this.lastSeenZ = o.z;
    this.lastSeenTime = w.time;
  }

  private decide(w: World): void {
    const t = this.tank;
    // Perception: best visible enemy, with hysteresis and a bias toward whoever is shooting us.
    let best: Tank | null = null;
    let bestScore = Infinity;
    for (const o of w.tanks) {
      if (!o.alive || !t.isEnemyOf(o)) continue;
      const d = dist2D(t.x, t.z, o.x, o.z);
      if (d > this.diff.viewRange) continue;
      if (!this.canSee(w, o)) continue;
      let s = d + (o.health / o.maxHealth) * 18;
      if (o.id === this.targetId) s -= 12;
      if (t.lastAttacker === o.id && w.time - t.lastDamageTime < 3) s -= 20;
      if (o.spawnProtect > 0) s += 25;
      if (s < bestScore) { bestScore = s; best = o; }
    }
    if (best) {
      if (best.id !== this.targetId) this.firstSeenTime = w.time;
      this.targetId = best.id;
      this.targetVisible = true;
      this.markSeen(w, best);
    } else {
      this.targetVisible = false;
      // Being shot by someone we can't see: we know roughly where it came from.
      if (t.lastAttacker >= 0 && w.time - t.lastDamageTime < 1.2) {
        const a = w.tanks[t.lastAttacker];
        if (a.alive) {
          this.targetId = a.id;
          this.lastSeenX = a.x; this.lastSeenY = a.y; this.lastSeenZ = a.z;
          this.lastSeenTime = w.time - 1;
        }
      }
    }
    if (this.targetId >= 0 && !w.tanks[this.targetId].alive) {
      this.targetId = -1;
      this.targetVisible = false;
    }

    const hp = t.health / t.maxHealth;
    const threatened = this.targetVisible || w.time - t.lastDamageTime < 2;
    let next: BotState;
    if (this.state === 'retreat' && hp < this.diff.retreatHealth + 0.25 && w.time - t.lastDamageTime < 8) next = 'retreat';
    else if (hp < this.diff.retreatHealth && threatened) next = 'retreat';
    else if (this.targetVisible) next = 'engage';
    else if (this.targetId >= 0 && w.time - this.lastSeenTime < 6) next = 'pursue';
    else next = 'roam';
    const changed = next !== this.state;
    this.state = next;

    switch (next) {
      case 'retreat': if (changed || this.repath <= 0) this.pickRetreat(w); break;
      case 'engage': this.pickEngage(w); break;
      case 'pursue': this.setGoal(w, this.lastSeenX, this.lastSeenY, this.lastSeenZ, changed); break;
      case 'roam': if (changed || !this.hasGoal || this.repath <= 0 || this.pathDone()) this.pickRoam(w); break;
    }

    // Housekeeping reloads when nothing is in sight.
    const wpn = t.weapon;
    t.controls.reload = !this.targetVisible && wpn.magazine > 0 && t.ammo < wpn.magazine * 0.5;

    this.abilityRoll = this.rng.next();
  }

  private pathDone(): boolean {
    return this.pathIdx >= this.path.length;
  }

  private setGoal(w: World, x: number, y: number, z: number, force: boolean): void {
    const moved = Math.abs(x - this.goalX) + Math.abs(z - this.goalZ) > 6;
    this.goalX = x; this.goalY = y; this.goalZ = z;
    this.hasGoal = true;
    if (!force && !moved && this.repath > 0) return;
    const t = this.tank;
    const from = w.nav.nearest(t.x, t.y, t.z);
    const to = w.nav.nearest(x, y, z);
    this.pathIdx = 0;
    if (!w.nav.findPath(from, to, this.path)) this.path.length = 0;
    this.repath = 2.5;
  }

  private pickRoam(w: World): void {
    const t = this.tank;
    const r = this.rng;
    // Control point: go take it unless our team already holds it uncontested.
    if (w.mode === 'cp') {
      const cp = w.arena.controlPoint;
      const ours = w.cp.owner === t.team && !w.cp.contested;
      if (!ours || r.next() < 0.55) {
        const a = r.range(0, Math.PI * 2);
        const rr = r.range(0, cp.r * 0.6);
        this.setGoal(w, cp.x + Math.sin(a) * rr, cp.y, cp.z + Math.cos(a) * rr, true);
        return;
      }
    }
    // Useful pickups nearby.
    if (this.diff.tactics > 0.4) {
      for (let i = 0; i < w.pickups.length; i++) {
        const p = w.pickups[i];
        if (!p.active || p.def.kind === 'repair') continue;
        if (dist2D(t.x, t.z, p.def.x, p.def.z) < 35 && r.next() < 0.5) {
          this.setGoal(w, p.def.x, p.def.y, p.def.z, true);
          return;
        }
      }
    }
    // Hunt: head toward an enemy's rough position (bots share a radar picture).
    if (r.next() < 0.65) {
      let pick: Tank | null = null;
      let bd = Infinity;
      for (const o of w.tanks) {
        if (!o.alive || !t.isEnemyOf(o)) continue;
        const d = dist2D(t.x, t.z, o.x, o.z) * r.range(0.7, 1.3);
        if (d < bd) { bd = d; pick = o; }
      }
      if (pick) {
        this.setGoal(w, pick.x + r.range(-8, 8), pick.y, pick.z + r.range(-8, 8), true);
        return;
      }
    }
    const n = w.nav.nodes[r.int(0, w.nav.nodes.length)];
    this.setGoal(w, n.x, n.y, n.z, true);
  }

  private pickRetreat(w: World): void {
    const t = this.tank;
    // A repair station beats hiding.
    let bestP = -1;
    let bd = 70;
    for (let i = 0; i < w.pickups.length; i++) {
      const p = w.pickups[i];
      if (!p.active || p.def.kind !== 'repair') continue;
      const d = dist2D(t.x, t.z, p.def.x, p.def.z);
      if (d < bd) { bd = d; bestP = i; }
    }
    if (bestP >= 0) {
      const p = w.pickups[bestP].def;
      this.setGoal(w, p.x, p.y, p.z, true);
      return;
    }
    // Otherwise a nearby node the threat cannot see.
    const tx = this.lastSeenX, ty = this.lastSeenY + 1.2, tz = this.lastSeenZ;
    let best = -1;
    let bestScore = -Infinity;
    const nodes = w.nav.nodes;
    for (let k = 0; k < 36; k++) {
      const n = nodes[this.rng.int(0, nodes.length)];
      const dMe = dist2D(t.x, t.z, n.x, n.z);
      if (dMe < 8 || dMe > 40) continue;
      if (w.collision.segmentClear(tx, ty, tz, n.x, n.y + 1.2, n.z)) continue;
      const score = dist2D(tx, tz, n.x, n.z) - dMe * 0.6;
      if (score > bestScore) { bestScore = score; best = n.id; }
    }
    if (best >= 0) {
      const n = nodes[best];
      this.setGoal(w, n.x, n.y, n.z, true);
    } else {
      // Nowhere hidden: back away from the threat.
      const a = yawOf(t.x - tx, t.z - tz);
      this.setGoal(w, t.x + Math.sin(a) * 20, t.y, t.z + Math.cos(a) * 20, true);
    }
  }

  private pickEngage(w: World): void {
    const t = this.tank;
    const tg = w.tanks[this.targetId];
    const d = dist2D(t.x, t.z, tg.x, tg.z);
    const pref = t.weapon.preferredRange;
    this.strafeTimer -= this.diff.think;
    if (this.strafeTimer <= 0) {
      this.strafeTimer = this.rng.range(1.8, 4);
      if (this.rng.next() < 0.5) this.strafeDir = -this.strafeDir;
    }
    if (d > pref + 10 || Math.abs(tg.y - t.y) > 2.5) {
      this.setGoal(w, tg.x, tg.y, tg.z, false);
      return;
    }
    // Inside the band: strafe around the target, or open distance if too close.
    const away = yawOf(t.x - tg.x, t.z - tg.z);
    let a = away + (Math.PI / 2) * this.strafeDir * this.diff.strafe;
    if (d < pref - 8) a = away + 0.5 * this.strafeDir;
    const len = 9;
    let gx = t.x + Math.sin(a) * len;
    let gz = t.z + Math.cos(a) * len;
    const clear = (x: number, z: number) => w.nav.drivable(t.x, t.y, t.z, x, t.y, z, t.radius + 0.3);
    if (!clear(gx, gz)) {
      this.strafeDir = -this.strafeDir;
      a = away + (Math.PI / 2) * this.strafeDir;
      gx = t.x + Math.sin(a) * len;
      gz = t.z + Math.cos(a) * len;
      if (!clear(gx, gz)) {
        // Boxed in (ramp, corridor): hold position and let the turret work.
        this.hasGoal = false;
        this.path.length = 0;
        return;
      }
    }
    this.goalX = gx; this.goalY = t.y; this.goalZ = gz;
    this.hasGoal = true;
    this.path.length = 0;
    this.pathIdx = 0;
  }

  private steer(w: World, dt: number): void {
    const t = this.tank;
    const c = t.controls;
    this.repath -= dt;
    // Stuck detection: commanded motion but no progress.
    if (this.unstuck > 0) {
      this.unstuck -= dt;
      c.throttle = -0.9;
      c.steer = this.unstuckSteer;
      c.boost = false;
      if (this.unstuck <= 0) { this.repath = 0; this.snapX = t.x; this.snapZ = t.z; this.progressTimer = 0; this.forceRepath(w); }
      return;
    }
    if (Math.abs(c.throttle) > 0.35) {
      this.progressTimer += dt;
      if (this.progressTimer > 1.5) {
        const moved = dist2D(t.x, t.z, this.snapX, this.snapZ);
        this.progressTimer = 0;
        this.snapX = t.x; this.snapZ = t.z;
        if (moved < 1.3) {
          this.unstuck = 0.9;
          this.unstuckSteer = this.rng.next() < 0.5 ? -1 : 1;
          this.unstuckCount++;
          return;
        }
      }
    } else {
      this.progressTimer = 0;
      this.snapX = t.x; this.snapZ = t.z;
    }

    if (!this.hasGoal) { c.throttle = 0; c.steer = 0; return; }

    // Current waypoint (or the goal itself at the end of the path).
    let wx = this.goalX, wy = this.goalY, wz = this.goalZ;
    let final = true;
    while (this.pathIdx < this.path.length) {
      const n = w.nav.nodes[this.path[this.pathIdx]];
      if (dist2D(t.x, t.z, n.x, n.z) < 3.4 && Math.abs(n.y - t.y) < 2) { this.pathIdx++; continue; }
      wx = n.x; wy = n.y; wz = n.z;
      final = false;
      break;
    }
    void wy;
    const dist = dist2D(t.x, t.z, wx, wz);
    if (final && dist < 3.5) {
      c.throttle = 0;
      c.steer = 0;
      c.boost = false;
      if (this.state === 'roam') this.hasGoal = false;
      return;
    }
    const desired = yawOf(wx - t.x, wz - t.z);
    let diffA = angleDiff(t.heading, desired);
    let throttle: number;
    // Close targets behind us in a fight: reverse instead of a slow pivot.
    if (Math.abs(diffA) > 2.3 && dist < 12 && this.state !== 'roam') {
      diffA = angleDiff(t.heading, wrapAngle(desired + Math.PI));
      throttle = -1;
    } else {
      const ad = Math.abs(diffA);
      throttle = ad < 0.45 ? 1 : ad < 1.1 ? 0.55 : 0.12;
      if (final && dist < 8) throttle *= 0.5;
    }
    let steer = clamp(diffA * 2.4, -1, 1);

    // Feelers: geometry ahead and tanks in the way.
    const dir = throttle >= 0 ? 1 : -1;
    _fwd.x = Math.sin(t.heading) * dir;
    _fwd.z = Math.cos(t.heading) * dir;
    if (this.probeBlocked(w, _fwd.x, _fwd.z)) {
      const lx = Math.sin(t.heading + 0.7 * dir), lz = Math.cos(t.heading + 0.7 * dir);
      const rx = Math.sin(t.heading - 0.7 * dir), rz = Math.cos(t.heading - 0.7 * dir);
      const lBlocked = this.probeBlocked(w, lx, lz);
      const rBlocked = this.probeBlocked(w, rx, rz);
      if (!lBlocked && rBlocked) steer = 1;
      else if (lBlocked && !rBlocked) steer = -1;
      throttle *= 0.5;
    }
    for (const o of w.tanks) {
      if (o === t || !o.alive || Math.abs(o.y - t.y) > 2) continue;
      const dx = o.x - t.x, dz = o.z - t.z;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d > 7 || d < 0.01) continue;
      const ahead = (dx * _fwd.x + dz * _fwd.z) / d;
      if (ahead < 0.6) continue;
      const side = _fwd.x * dz - _fwd.z * dx; // >0: other tank on our left
      steer = clamp(steer + (side > 0 ? -0.8 : 0.8), -1, 1);
      throttle *= 0.7;
    }
    c.throttle = throttle;
    c.steer = steer;

    const remaining = this.path.length - this.pathIdx;
    c.boost = this.diff.tactics > 0.5 && t.boost > 0.45 && throttle > 0.9 && Math.abs(diffA) < 0.3 && (this.state === 'retreat' || remaining > 5);
  }

  /** Is there a wall 3.6 m along (dx, dz)? Ramps ahead count as open ground. */
  private probeBlocked(w: World, dx: number, dz: number): boolean {
    const t = this.tank;
    const px = t.x + dx * 3.6, pz = t.z + dz * 3.6;
    const y = w.collision.surfaceHeight(px, pz, t.y + 1.6, 0);
    if (y < t.y - 0.5) return false; // a ledge to drop off, not a wall
    return w.collision.circleBlocked(px, pz, y, t.radius * 0.9);
  }

  private forceRepath(w: World): void {
    if (this.hasGoal) this.setGoal(w, this.goalX, this.goalY, this.goalZ, true);
  }

  private aim(w: World, dt: number): void {
    const t = this.tank;
    const c = t.controls;
    const wpn = t.weapon;
    this.noiseTimer -= dt;
    if (this.noiseTimer <= 0) {
      this.noiseTimer = this.rng.range(0.35, 0.8);
      this.noiseTY = (this.rng.next() * 2 - 1) * this.diff.aimError;
      this.noiseTP = (this.rng.next() * 2 - 1) * this.diff.aimError * 0.5;
    }
    const k = 1 - Math.exp(-4 * dt);
    this.noiseYaw += (this.noiseTY - this.noiseYaw) * k;
    this.noisePitch += (this.noiseTP - this.noisePitch) * k;

    c.fire = false;
    c.ability = false;
    const tg = this.targetId >= 0 ? w.tanks[this.targetId] : null;
    if (tg && tg.alive && this.targetVisible) {
      const px = t.x, py = t.y + t.pivotHeight, pz = t.z;
      let ax = tg.x, ay = tg.y + 1.0, az = tg.z;
      const d0 = dist2D(px, pz, ax, az);
      const flight = d0 / wpn.speed;
      ax += tg.vx * flight * this.diff.lead;
      az += tg.vz * flight * this.diff.lead;
      const d = dist2D(px, pz, ax, az);
      const moving = Math.min(1, Math.hypot(tg.vx, tg.vz) / 10);
      const errScale = 0.45 + 0.55 * moving;
      c.aimYaw = yawOf(ax - px, az - pz) + this.noiseYaw * errScale;
      let pitch = Math.atan2(ay - py, d);
      if (wpn.gravity > 0) {
        const v = wpn.speed, g = wpn.gravity, h = ay - py;
        const disc = v * v * v * v - g * (g * d * d + 2 * h * v * v);
        pitch = disc > 0 ? Math.atan((v * v - Math.sqrt(disc)) / (g * d)) : wpn.pitchMax;
      }
      c.aimPitch = pitch + this.noisePitch * errScale;

      const range = wpn.speed * wpn.lifetime * 0.92;
      const reacted = w.time - this.firstSeenTime >= this.diff.reaction;
      const aligned = t.aimError < this.diff.fireAlign + (wpn.gravity > 0 ? 0.03 : 0) + (d0 < 12 ? 0.05 : 0);
      let fire = reacted && aligned && d0 < range;
      if (fire && wpn.heatPerShot > 0 && this.diff.tactics > 0.5 && t.heat > 0.86) fire = false;
      if (fire && tg.spawnProtect > 0.5) fire = false;
      c.fire = fire;

      // Abilities.
      const ab = t.hull.ability;
      if (t.abilityCharge >= 1 && this.abilityRoll < this.diff.tactics) {
        if (ab === 'shockwave' && d0 < 10) c.ability = true;
        else if (ab === 'aegis' && w.time - t.lastDamageTime < 0.6 && t.health < t.maxHealth * 0.75) c.ability = true;
        else if (ab === 'dash' && (this.state === 'retreat' || d0 > wpn.preferredRange + 12)) c.ability = true;
      }
    } else {
      // Look where we're going, or where the enemy was last seen.
      if (this.state === 'pursue' || (this.targetId >= 0 && w.time - this.lastSeenTime < 6)) {
        c.aimYaw = yawOf(this.lastSeenX - t.x, this.lastSeenZ - t.z);
      } else {
        c.aimYaw = t.heading;
      }
      c.aimPitch = 0;
      if (this.state === 'retreat' && t.hull.ability === 'dash' && t.abilityCharge >= 1 && this.abilityRoll < this.diff.tactics) c.ability = true;
    }
  }
}
