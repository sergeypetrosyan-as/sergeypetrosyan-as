import * as THREE from 'three';
import { VEHICLE } from '../game/GameConfig';
import type { CollisionWorld, PushResult } from '../world/CollisionWorld';
import { buildCarModel, type CarModel } from './CarModel';

export interface DriveInput {
  throttle: number; // -1 (brake / reverse) .. 1
  steer: number; // -1 (right) .. 1 (left)
  handbrake: boolean;
}

export interface ImpactEvent {
  speed: number;
  x: number;
  z: number;
  nx: number;
  nz: number;
}

const HULL_OFFSETS = [-1.45, 0, 1.45];
const HULL_RADIUS = 1.02;
const _push: PushResult = { hit: false, nx: 0, nz: 0 };

/**
 * Arcade car: velocity split into forward/lateral components each step;
 * lateral velocity is bled off by tyre grip (much less under handbrake, which
 * produces drifts). The hull is three circles along the body for collision.
 */
export class Vehicle {
  readonly model: CarModel;
  readonly position = new THREE.Vector3();
  heading = 0;
  readonly velocity = new THREE.Vector2(); // world x/z
  steer = 0;
  occupied = false;
  /** Signed forward speed (m/s). */
  forwardSpeed = 0;
  lateralSpeed = 0;
  braking = false;
  private wheelSpin = 0;
  private pitch = 0;
  private roll = 0;
  private readonly spawn: { x: number; z: number; heading: number };
  readonly name: string;

  constructor(x: number, z: number, heading: number, color: number, accent: number, name: string) {
    this.model = buildCarModel('sports', color, accent, true);
    this.position.set(x, 0, z);
    this.heading = heading;
    this.spawn = { x, z, heading };
    this.name = name;
    this.sync();
  }

  get speedKmh(): number {
    return Math.abs(this.forwardSpeed) * 3.6;
  }

  forward(out: THREE.Vector3): THREE.Vector3 {
    return out.set(Math.sin(this.heading), 0, Math.cos(this.heading));
  }

  /** World-space centres of the hull collision circles. */
  hullPoint(i: number, out: { x: number; z: number }): void {
    const o = HULL_OFFSETS[i];
    out.x = this.position.x + Math.sin(this.heading) * o;
    out.z = this.position.z + Math.cos(this.heading) * o;
  }

  get hullCount(): number {
    return HULL_OFFSETS.length;
  }

  get hullRadius(): number {
    return HULL_RADIUS;
  }

  update(dt: number, input: DriveInput | null, world: CollisionWorld): ImpactEvent | null {
    const throttle = input?.throttle ?? 0;
    const handbrake = input?.handbrake ?? !this.occupied;
    const drifting = handbrake && this.occupied;

    // 1) Steering rotates the body. Yaw rate follows the bicycle model at low
    //    speed but is capped by a lateral-grip budget at high speed.
    const speedNow = this.velocity.x * Math.sin(this.heading) + this.velocity.y * Math.cos(this.heading);
    const speedRatio = Math.min(1, Math.abs(speedNow) / VEHICLE.maxSpeed);
    const maxSteer = VEHICLE.maxSteer * (1 - 0.45 * speedRatio);
    const target = (input?.steer ?? 0) * maxSteer;
    this.steer += (target - this.steer) * Math.min(1, dt * 7);
    let yawRate = (speedNow / VEHICLE.wheelBase) * Math.tan(this.steer);
    const yawCap = (drifting ? 46 : 26) / Math.max(4, Math.abs(speedNow));
    yawRate = THREE.MathUtils.clamp(yawRate, -yawCap, yawCap);
    this.heading += yawRate * dt;

    // 2) Velocity stays in world space; decompose it against the *new* heading
    //    so turning produces lateral slip that tyre grip then bleeds away.
    const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
    const rx = Math.cos(this.heading), rz = -Math.sin(this.heading);
    let vF = this.velocity.x * fx + this.velocity.y * fz;
    let vR = this.velocity.x * rx + this.velocity.y * rz;
    const prevF = vF;

    this.braking = false;
    if (throttle > 0) {
      if (vF < -0.5) { vF = Math.min(0, vF + VEHICLE.brake * dt); this.braking = true; }
      else vF += VEHICLE.accel * throttle * Math.max(0.15, 1 - vF / VEHICLE.maxSpeed) * dt;
    } else if (throttle < 0) {
      if (vF > 0.5) { vF = Math.max(0, vF - VEHICLE.brake * dt); this.braking = true; }
      else vF = Math.max(-VEHICLE.reverseSpeed, vF - VEHICLE.accel * 0.6 * dt);
    } else {
      // Rolling resistance brings an idle car to rest.
      const r = VEHICLE.rolling * dt;
      vF = Math.abs(vF) <= r ? 0 : vF - Math.sign(vF) * r;
    }
    vF -= vF * Math.abs(vF) * VEHICLE.drag * 0.02 * dt;
    if (handbrake) {
      vF -= Math.sign(vF) * Math.min(Math.abs(vF), (this.occupied ? 7 : 30) * dt);
      this.braking = this.braking || Math.abs(vF) > 0.5;
    }

    const grip = drifting ? VEHICLE.handbrakeGrip : VEHICLE.grip;
    vR *= Math.exp(-grip * dt);
    this.velocity.set(fx * vF + rx * vR, fz * vF + rz * vR);
    this.forwardSpeed = vF;
    this.lateralSpeed = vR;

    this.position.x += this.velocity.x * dt;
    this.position.z += this.velocity.y * dt;

    const impact = this.collide(world);

    // Visual: wheel spin, steering, body pitch/roll from accelerations.
    this.wheelSpin += (vF / 0.37) * dt;
    const accel = (vF - prevF) / Math.max(dt, 1e-4);
    this.pitch += (THREE.MathUtils.clamp(-accel * 0.004, -0.05, 0.05) - this.pitch) * Math.min(1, dt * 6);
    this.roll += (THREE.MathUtils.clamp(yawRate * vF * 0.004, -0.07, 0.07) - this.roll) * Math.min(1, dt * 6);
    this.sync();
    return impact;
  }

  private collide(world: CollisionWorld): ImpactEvent | null {
    let impact: ImpactEvent | null = null;
    const p = { x: 0, z: 0 };
    for (let i = 0; i < HULL_OFFSETS.length; i++) {
      this.hullPoint(i, p);
      const ox = p.x, oz = p.z;
      world.resolveCircle(p, HULL_RADIUS, 0.25, 1.3, _push);
      if (!_push.hit) continue;
      this.position.x += p.x - ox;
      this.position.z += p.z - oz;
      impact = this.bounce(_push.nx, _push.nz, ox, oz) ?? impact;
    }
    return impact;
  }

  /** Removes velocity into a contact normal with a little restitution. */
  bounce(nx: number, nz: number, x: number, z: number): ImpactEvent | null {
    const vn = this.velocity.x * nx + this.velocity.y * nz;
    if (vn >= 0) return null;
    const restitution = 0.25;
    this.velocity.x -= (1 + restitution) * vn * nx;
    this.velocity.y -= (1 + restitution) * vn * nz;
    // Scrub some speed on impact so wall-riding isn't free.
    this.velocity.multiplyScalar(0.88);
    const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
    this.forwardSpeed = this.velocity.x * fx + this.velocity.y * fz;
    return -vn > 3 ? { speed: -vn, x, z, nx, nz } : null;
  }

  private sync(): void {
    const g = this.model.group;
    g.position.copy(this.position);
    g.rotation.y = this.heading;
    this.model.body.rotation.x = this.pitch;
    this.model.body.rotation.z = this.roll;
    for (const w of this.model.wheels) w.rotation.x = this.wheelSpin;
    for (const p of this.model.frontPivots) p.rotation.y = this.steer;
    const brake = this.braking ? 3.2 : 1.2;
    this.model.tailMat.color.setRGB(brake, 0.04 * brake, 0.12 * brake);
    if (this.model.underglow) {
      (this.model.underglow.material as THREE.MeshBasicMaterial).opacity = this.occupied ? 1 : 0.65;
    }
  }

  reset(): void {
    this.position.set(this.spawn.x, 0, this.spawn.z);
    this.heading = this.spawn.heading;
    this.velocity.set(0, 0);
    this.steer = 0;
    this.forwardSpeed = 0;
    this.lateralSpeed = 0;
    this.occupied = false;
    this.sync();
  }
}
