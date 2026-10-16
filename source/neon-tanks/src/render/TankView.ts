import * as THREE from 'three';
import type { Tank } from '../sim/tank.ts';
import type { Effects } from './Effects.ts';
import { PALETTE } from './materials.ts';
import { TankModel } from './TankModel.ts';

/** Team / role colour for a tank's neon accents. */
export function accentFor(t: Tank, playerId: number): number {
  if (t.team === 'blue') return t.id === playerId ? t.paint.accent : PALETTE.blue;
  if (t.team === 'magenta') return PALETTE.magenta;
  // Free-for-all: the player keeps their paint, every bot reads as hostile.
  return t.id === playerId ? t.paint.accent : t.isBot ? [PALETTE.magenta, 0xff4f7a, 0xd04bff, 0xff6a3d][t.id % 4] : PALETTE.magenta;
}

/** Presentation of one sim tank: pose, tracks, recoil, damage smoke, wreck and turret pop. */
export class TankView {
  readonly model: TankModel;
  readonly tank: Tank;
  private visY = 0;
  private hitFlash = 0;
  private wasAlive = false;
  private wreckTime = 0;
  private popY = 0;
  private popVy = 0;
  private popSpin = 0;
  private popTilt = 0;
  private smokeTimer = 0;
  private readonly accent: number;

  constructor(tank: Tank, playerId: number, env: THREE.Texture | null, shadows: boolean) {
    this.tank = tank;
    this.accent = accentFor(tank, playerId);
    this.model = new TankModel(
      { hull: tank.hull.id, weapon: tank.weapon.id, body: tank.paint.body, metal: tank.paint.metal, accent: this.accent, light: tank.team === 'magenta' ? 0xff7ad9 : 0xd8f6ff },
      env,
      shadows,
    );
    this.visY = tank.y;
  }

  get accentColor(): number {
    return this.accent;
  }

  onHit(): void {
    this.hitFlash = Math.min(1, this.hitFlash + 0.6);
  }

  /** Called when the sim reports this tank's destruction. */
  onDestroyed(): void {
    this.wreckTime = 0;
    this.popY = 0;
    this.popVy = 9 + Math.random() * 4;
    this.popSpin = (Math.random() - 0.5) * 9;
    this.popTilt = (Math.random() - 0.5) * 1.5;
  }

  update(dt: number, time: number, fx: Effects): void {
    const t = this.tank;
    const m = this.model;
    if (t.alive && !this.wasAlive) {
      // Fresh spawn: reset wreck state.
      this.visY = t.y;
      m.setWreck(0);
      m.turret.position.set(0, t.hull.turretHeight, 0);
      m.turret.rotation.set(0, 0, 0);
      m.root.visible = true;
    }
    this.wasAlive = t.alive;

    // Smooth out the instant snaps when climbing onto a ledge.
    const dy = t.y - this.visY;
    this.visY += Math.abs(dy) > 3 ? dy : dy * Math.min(1, dt * 18);
    m.root.position.set(t.x, this.visY, t.z);
    m.hull.rotation.set(-t.tiltPitch, t.heading, t.tiltRoll, 'YXZ');

    if (t.alive) {
      // Turret sits on the tilted hull top but stays level (stabilised).
      _off.set(0, t.hull.turretHeight, 0).applyEuler(m.hull.rotation);
      m.turret.position.copy(_off);
      m.turret.rotation.set(0, t.turretYaw, 0);
      m.barrelPivot.rotation.x = -t.barrelPitch;
      m.recoil.position.z = -t.recoil * t.recoil * t.weapon.recoil * 1.2;
      m.setTracks(t.trackL, t.trackR);
      const shielded = t.shieldTimer > 0;
      m.setShield(shielded || t.spawnProtect > 0, time, shielded ? Math.min(1, t.shieldTimer * 2) : 0.18 + 0.08 * Math.sin(time * 14));
      this.hitFlash = Math.max(0, this.hitFlash - dt * 9);
      m.setHitFlash(this.hitFlash);

      // Exhaust / boost / dash particles and damage smoke.
      this.smokeTimer -= dt;
      if (this.smokeTimer <= 0) {
        this.smokeTimer = 0.05;
        const hp = t.health / t.maxHealth;
        const back = t.hull.length * 0.5;
        const ex = t.x - Math.sin(t.heading) * back;
        const ez = t.z - Math.cos(t.heading) * back;
        if (t.boosting || t.dashTimer > 0) {
          const c = t.dashTimer > 0 ? 0xffffff : t.nitro > 0 ? PALETTE.cyan : this.accent;
          fx.flash(ex, this.visY + 0.9, ez, c, t.dashTimer > 0 ? 3 : 1.6, 0.08, 1.6);
        }
        if (hp < 0.35) {
          fx.smokePuff(t.x, this.visY + t.hull.turretHeight, t.z, 1, 1.4, 0.06, 1.5);
          if (hp < 0.18 && Math.random() < 0.5) fx.fire(t.x, this.visY + t.hull.turretHeight * 0.8, t.z, 1, 0.8);
        }
      }
    } else {
      // Wreck: turret pops, hull blackens, burns, then sinks out before respawn.
      this.wreckTime += dt;
      m.setWreck(Math.min(1, this.wreckTime * 3));
      m.setShield(false, time, 0);
      this.popVy -= 24 * dt;
      this.popY += this.popVy * dt;
      if (this.popY < 0) { this.popY = 0; this.popVy *= -0.25; this.popSpin *= 0.4; }
      m.turret.position.y = t.hull.turretHeight + this.popY;
      m.turret.rotation.y += this.popSpin * dt;
      m.turret.rotation.z = Math.min(Math.abs(this.popTilt), this.wreckTime * 2) * Math.sign(this.popTilt);
      this.smokeTimer -= dt;
      if (this.smokeTimer <= 0) {
        this.smokeTimer = 0.09;
        fx.smokePuff(t.x, this.visY + 1, t.z, 1, 2.2, 0.05, 2.4);
        if (this.wreckTime < 2.2) fx.fire(t.x, this.visY + 0.8, t.z, 2, 1.4);
      }
      const sink = Math.max(0, this.wreckTime - 3) * 1.2;
      m.root.position.y = this.visY - sink;
      m.root.visible = sink < 2.5;
    }
  }

  dispose(): void {
    this.model.dispose();
  }
}

const _off = new THREE.Vector3();
