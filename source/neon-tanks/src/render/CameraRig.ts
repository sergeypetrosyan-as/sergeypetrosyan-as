import * as THREE from 'three';
import type { CollisionWorld, RayHit } from '../sim/collision.ts';
import { clamp, damp } from '../sim/math.ts';

export interface CameraSettings {
  sensitivity: number;
  invertY: boolean;
  smoothing: number;
  fov: number;
  shake: boolean;
}

const _hit: RayHit = { t: 0, x: 0, y: 0, z: 0, nx: 0, ny: 0, nz: 0 };

/**
 * Third-person orbit camera: mouse yaw/pitch around a pivot above the tank,
 * wheel zoom, smoothing, collision against arena geometry and trauma shake.
 */
export class CameraRig {
  readonly camera: THREE.PerspectiveCamera;
  yaw = 0;
  pitch = 0.2;
  distance = 12;
  targetDistance = 12;
  readonly minDistance = 5.5;
  readonly maxDistance = 22;
  private readonly pivot = new THREE.Vector3();
  private readonly smoothPivot = new THREE.Vector3();
  private trauma = 0;
  private shakeT = 0;
  private initialised = false;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  reset(yaw: number): void {
    this.yaw = yaw;
    this.pitch = 0.2;
    this.initialised = false;
  }

  look(dx: number, dy: number, s: CameraSettings): void {
    const k = 0.0022 * s.sensitivity;
    this.yaw -= dx * k;
    this.pitch = clamp(this.pitch + dy * k * (s.invertY ? -1 : 1), -0.32, 1.15);
  }

  zoom(steps: number): void {
    this.targetDistance = clamp(this.targetDistance + steps * 1.4, this.minDistance, this.maxDistance);
  }

  addTrauma(amount: number): void {
    this.trauma = Math.min(1, this.trauma + amount);
  }

  /** Forward look direction (unit). */
  dir(out: THREE.Vector3): THREE.Vector3 {
    const cp = Math.cos(this.pitch);
    return out.set(Math.sin(this.yaw) * cp, -Math.sin(this.pitch), Math.cos(this.yaw) * cp);
  }

  update(dt: number, tx: number, ty: number, tz: number, col: CollisionWorld | null, s: CameraSettings): void {
    this.pivot.set(tx, ty + 3.4, tz);
    if (!this.initialised) {
      this.smoothPivot.copy(this.pivot);
      this.distance = this.targetDistance;
      this.initialised = true;
    }
    const follow = s.smoothing <= 0 ? 1 : damp(26 / (0.4 + s.smoothing * 1.6), dt);
    this.smoothPivot.lerp(this.pivot, follow);
    this.distance += (this.targetDistance - this.distance) * damp(10, dt);

    this.dir(_d);
    let dist = this.distance;
    // Pull in when geometry is between the pivot and the camera.
    if (col && col.raycast(this.smoothPivot.x, this.smoothPivot.y, this.smoothPivot.z, -_d.x, -_d.y, -_d.z, dist + 0.6, _hit)) {
      dist = Math.max(1.8, _hit.t - 0.6);
    }
    const cam = this.camera;
    cam.position.set(this.smoothPivot.x - _d.x * dist, this.smoothPivot.y - _d.y * dist, this.smoothPivot.z - _d.z * dist);
    if (cam.position.y < ty + 0.6 && col) cam.position.y = Math.max(cam.position.y, col.surfaceHeight(cam.position.x, cam.position.z, cam.position.y + 1) + 0.5);
    _t.copy(cam.position).add(_d);
    cam.lookAt(_t);

    // Trauma shake (squared for a nicer falloff).
    this.trauma = Math.max(0, this.trauma - dt * 1.6);
    if (s.shake && this.trauma > 0) {
      this.shakeT += dt * 38;
      const a = this.trauma * this.trauma;
      cam.rotation.z += Math.sin(this.shakeT * 1.3) * 0.02 * a;
      cam.rotateX(Math.sin(this.shakeT * 0.9 + 1.7) * 0.015 * a);
      cam.rotateY(Math.sin(this.shakeT * 1.1 + 4.1) * 0.015 * a);
    }
    if (cam.fov !== s.fov) {
      cam.fov = s.fov;
      cam.updateProjectionMatrix();
    }
  }
}

const _d = new THREE.Vector3();
const _t = new THREE.Vector3();
