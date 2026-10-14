import * as THREE from 'three';
import type { Input } from '../game/Input';
import type { CollisionWorld, RayHit } from '../world/CollisionWorld';
import { WEAPONS, WeaponState, type WeaponId } from '../weapons/Weapon';
import type { PlayerController } from './PlayerController';

/** Anything the player's shots can strike besides the static world. */
export interface ShotTarget {
  /** Distance along the ray to the hit, or -1. `out.head` reports a headshot. */
  rayHit(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxDist: number, out: { head: boolean }): number;
  applyHit(damage: number, head: boolean, dirX: number, dirZ: number): void;
}

export interface ShotResult {
  weapon: WeaponId;
  from: THREE.Vector3;
  to: THREE.Vector3;
  target: ShotTarget | null;
  head: boolean;
  damage: number;
  normal: THREE.Vector3;
  hitWorld: boolean;
}

export interface CombatCallbacks {
  onShot(shot: ShotResult): void;
  onDryFire(): void;
  onReloadStart(weapon: WeaponId): void;
  onReloadDone(weapon: WeaponId): void;
  onSwitch(weapon: WeaponId): void;
}

const _hit: RayHit = { dist: 0, nx: 0, ny: 0, nz: 0 };
const _camDir = new THREE.Vector3();
const _origin = new THREE.Vector3();
const _aimPoint = new THREE.Vector3();
const _muzzle = new THREE.Vector3();
const _shotDir = new THREE.Vector3();
const _tmpA = new THREE.Vector3();
const _tmpB = new THREE.Vector3();
const _headOut = { head: false };

/**
 * Weapon handling for the player. Shots are resolved in two passes: a ray
 * through the crosshair finds what the player is pointing at, then a ray from
 * the actual muzzle (with spread) decides what is hit — so cover between the
 * gun and the target is respected even when the camera can see past it.
 */
export class PlayerCombat {
  readonly weapons: Record<WeaponId, WeaponState> = {
    pistol: new WeaponState(WEAPONS.pistol),
    rifle: new WeaponState(WEAPONS.rifle),
  };
  current: WeaponId = 'pistol';
  shotsFired = 0;
  shotsHit = 0;
  damageMultiplier = 1;
  private buffered = 0;
  private readonly result: ShotResult = {
    weapon: 'pistol', from: new THREE.Vector3(), to: new THREE.Vector3(), target: null, head: false, damage: 0, normal: new THREE.Vector3(), hitWorld: false,
  };

  get weapon(): WeaponState {
    return this.weapons[this.current];
  }

  reset(): void {
    this.weapons.pistol.reset();
    this.weapons.rifle.reset();
    this.current = 'pistol';
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.damageMultiplier = 1;
    this.buffered = 0;
  }

  switchTo(id: WeaponId, cb: CombatCallbacks): void {
    if (id === this.current) return;
    this.weapon.cancelReload();
    this.current = id;
    this.weapon.cooldown = Math.max(this.weapon.cooldown, 0.25);
    cb.onSwitch(id);
  }

  update(
    dt: number,
    input: Input,
    /** False on extra sub-steps of a frame, so key presses are handled once. */
    edges: boolean,
    camera: THREE.PerspectiveCamera,
    player: PlayerController,
    world: CollisionWorld,
    targets: readonly ShotTarget[],
    aiming: boolean,
    cb: CombatCallbacks,
  ): void {
    for (const id of ['pistol', 'rifle'] as const) {
      if (this.weapons[id].update(dt) && id === this.current) cb.onReloadDone(id);
    }
    if (!player.alive || player.inVehicle) return;

    if (edges) {
      if (input.wasPressed('Digit1')) this.switchTo('pistol', cb);
      if (input.wasPressed('Digit2')) this.switchTo('rifle', cb);
      if (input.wasPressed('KeyQ')) this.switchTo(this.current === 'pistol' ? 'rifle' : 'pistol', cb);
    }

    const w = this.weapon;
    if (edges && input.wasPressed('KeyR') && w.startReload()) cb.onReloadStart(this.current);

    // Semi-auto clicks are buffered briefly so a press during cooldown still fires.
    const pressed = edges && input.firePressed;
    if (pressed) this.buffered = 0.2;
    else this.buffered = Math.max(0, this.buffered - dt);
    const trigger = w.def.automatic ? input.fireHeld : this.buffered > 0;
    if (!trigger) return;
    if (w.reloading) return;
    if (w.mag === 0) {
      if (pressed) cb.onDryFire();
      if (w.startReload()) cb.onReloadStart(this.current);
      return;
    }
    if (!w.canFire()) return;

    w.fire();
    this.buffered = 0;
    this.shotsFired++;
    player.combatTimer = 0;
    player.kick = 1;
    this.fire(camera, player, world, targets, aiming);
    cb.onShot(this.result);
    if (w.mag === 0 && w.startReload()) cb.onReloadStart(this.current);
  }

  private fire(camera: THREE.PerspectiveCamera, player: PlayerController, world: CollisionWorld, targets: readonly ShotTarget[], aiming: boolean): void {
    const w = this.weapon;
    const def = w.def;
    camera.getWorldDirection(_camDir);
    // Start the crosshair ray level with the player so nothing behind them is hit.
    _tmpA.set(player.position.x, player.position.y + 1.5, player.position.z).sub(camera.position);
    const ahead = Math.max(0, _tmpA.dot(_camDir));
    _origin.copy(camera.position).addScaledVector(_camDir, ahead);
    const aimDist = this.castAll(_origin, _camDir, def.range, world, targets);
    _aimPoint.copy(_origin).addScaledVector(_camDir, aimDist);

    player.character.muzzle.getWorldPosition(_muzzle);
    // Before the arm has swung up, fire from roughly where the raised gun will be
    // (right of the chest, forward along the camera's facing).
    const f = Math.atan2(_camDir.x, _camDir.z);
    _tmpB.set(
      player.position.x - Math.cos(f) * 0.25 + Math.sin(f) * 0.6,
      player.position.y + 1.42,
      player.position.z + Math.sin(f) * 0.25 + Math.cos(f) * 0.6,
    );
    _muzzle.lerp(_tmpB, 1 - player.aimBlend);

    _shotDir.subVectors(_aimPoint, _muzzle).normalize();
    const spread = (aiming ? def.aimSpread : def.spread) + w.bloom;
    if (spread > 0) {
      // Uniform sample inside a cone.
      _tmpA.set(1, 0, 0);
      if (Math.abs(_shotDir.x) > 0.9) _tmpA.set(0, 1, 0);
      const u = _tmpB.crossVectors(_shotDir, _tmpA).normalize();
      const v = _tmpA.crossVectors(_shotDir, u).normalize();
      const r = Math.sqrt(Math.random()) * Math.tan(spread);
      const a = Math.random() * Math.PI * 2;
      _shotDir.addScaledVector(u, Math.cos(a) * r).addScaledVector(v, Math.sin(a) * r).normalize();
    }

    const res = this.result;
    res.weapon = this.current;
    res.from.copy(_muzzle);
    res.target = null;
    res.head = false;
    res.hitWorld = false;
    res.damage = 0;
    let best = def.range;
    if (world.raycast(_muzzle.x, _muzzle.y, _muzzle.z, _shotDir.x, _shotDir.y, _shotDir.z, best, _hit)) {
      best = _hit.dist;
      res.hitWorld = true;
      res.normal.set(_hit.nx, _hit.ny, _hit.nz);
    }
    for (const t of targets) {
      const d = t.rayHit(_muzzle.x, _muzzle.y, _muzzle.z, _shotDir.x, _shotDir.y, _shotDir.z, best, _headOut);
      if (d >= 0 && d < best) {
        best = d;
        res.target = t;
        res.head = _headOut.head;
        res.hitWorld = false;
      }
    }
    res.to.copy(_muzzle).addScaledVector(_shotDir, best);
    if (res.target) {
      res.damage = Math.round(def.damage * (res.head ? def.headMultiplier : 1) * this.damageMultiplier);
      res.target.applyHit(res.damage, res.head, _shotDir.x, _shotDir.z);
      this.shotsHit++;
    }
  }

  private castAll(o: THREE.Vector3, d: THREE.Vector3, range: number, world: CollisionWorld, targets: readonly ShotTarget[]): number {
    let best = range;
    if (world.raycast(o.x, o.y, o.z, d.x, d.y, d.z, best, _hit)) best = _hit.dist;
    for (const t of targets) {
      const h = t.rayHit(o.x, o.y, o.z, d.x, d.y, d.z, best, _headOut);
      if (h >= 0 && h < best) best = h;
    }
    return best;
  }

  get accuracy(): number {
    return this.shotsFired ? this.shotsHit / this.shotsFired : 0;
  }
}
