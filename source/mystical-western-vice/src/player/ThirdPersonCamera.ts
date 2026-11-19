import * as THREE from 'three';
import type { CollisionWorld, RayHit } from '../world/CollisionWorld';

const _hit: RayHit = { dist: 0, nx: 0, ny: 0, nz: 0 };
const _desired = new THREE.Vector3();
const _look = new THREE.Vector3();

export type CameraMode = 'foot' | 'vehicle' | 'orbit';

/**
 * Third-person camera: mouse-driven yaw/pitch orbit around a smoothed pivot,
 * over-the-shoulder aim mode, collision pull-in against buildings, trauma-based
 * shake, and a chase mode that trails a vehicle's heading.
 */
export class ThirdPersonCamera {
  yaw = 0;
  pitch = 0.12;
  distance = 4.4;
  sensitivity = 1;
  invertY = false;
  reducedShake = false;
  mode: CameraMode = 'foot';
  private readonly pivot = new THREE.Vector3();
  private currentDist = 4.4;
  private aimBlend = 0;
  private trauma = 0;
  private shakeTime = 0;
  private vehicleIdle = 0;
  private bob = 0;
  private orbitAngle = 0;

  constructor(readonly camera: THREE.PerspectiveCamera, private readonly world: CollisionWorld) {}

  addTrauma(amount: number): void {
    this.trauma = Math.min(1, this.trauma + amount);
  }

  snapTo(target: THREE.Vector3, yaw: number): void {
    this.pivot.copy(target).y += 1.55;
    this.yaw = yaw;
    this.pitch = 0.12;
    this.currentDist = this.distance;
  }

  /** Mouse input in pixels; wheel in notches. */
  rotate(dx: number, dy: number, wheel: number): void {
    const s = 0.0022 * this.sensitivity * (this.aimBlend > 0.5 ? 0.65 : 1);
    this.yaw -= dx * s;
    this.pitch += dy * s * (this.invertY ? -1 : 1);
    this.pitch = THREE.MathUtils.clamp(this.pitch, -0.75, 1.1);
    if (wheel) this.distance = THREE.MathUtils.clamp(this.distance + wheel * 0.5, 2.6, 7.5);
    if (dx || dy) this.vehicleIdle = 0;
  }

  /**
   * @param target   character feet or car origin
   * @param aiming   tighter shoulder view
   * @param speed    for run bob / vehicle FOV
   * @param heading  vehicle heading (vehicle mode)
   */
  update(dt: number, target: THREE.Vector3, aiming: boolean, speed: number, heading: number): void {
    this.shakeTime += dt;
    this.trauma = Math.max(0, this.trauma - dt * 1.6);
    this.aimBlend += ((aiming ? 1 : 0) - this.aimBlend) * Math.min(1, dt * 12);
    const cam = this.camera;

    if (this.mode === 'orbit') {
      // Title-screen fly-around.
      this.orbitAngle += dt * 0.05;
      const r = 62;
      cam.position.set(25 + Math.cos(this.orbitAngle) * r, 16 + Math.sin(this.orbitAngle * 0.7) * 4, 10 + Math.sin(this.orbitAngle) * r);
      cam.lookAt(10, 14, -10);
      cam.fov = 60;
      cam.updateProjectionMatrix();
      return;
    }

    let pivotHeight = 1.55, dist = this.distance, shoulder = 0.55, fov = 68;
    if (this.mode === 'vehicle') {
      pivotHeight = 1.7;
      dist = 7.6 + Math.min(1, speed / 38) * 1.6;
      shoulder = 0;
      fov = 68 + Math.min(1, speed / 38) * 14;
      // Auto-recentre behind the car once the mouse goes idle.
      this.vehicleIdle += dt;
      if (this.vehicleIdle > 1.2) {
        const behind = heading + Math.PI;
        let d = behind - this.yaw;
        d = Math.atan2(Math.sin(d), Math.cos(d));
        this.yaw += d * Math.min(1, dt * 3.2);
        this.pitch += (0.22 - this.pitch) * Math.min(1, dt * 2);
      }
    } else {
      dist = THREE.MathUtils.lerp(this.distance, 2.1, this.aimBlend);
      shoulder = THREE.MathUtils.lerp(0.5, 0.72, this.aimBlend);
      pivotHeight = THREE.MathUtils.lerp(1.55, 1.62, this.aimBlend);
      fov = THREE.MathUtils.lerp(70, 54, this.aimBlend);
      this.bob += dt * speed * 1.6;
    }

    // Smooth pivot follow (vertical a bit softer to absorb jumps/steps).
    const k = 1 - Math.exp(-dt * 16);
    const ky = 1 - Math.exp(-dt * 9);
    this.pivot.x += (target.x - this.pivot.x) * k;
    this.pivot.z += (target.z - this.pivot.z) * k;
    this.pivot.y += (target.y + pivotHeight - this.pivot.y) * ky;
    if (this.mode === 'foot' && speed > 5) this.pivot.y += Math.sin(this.bob) * 0.012;

    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const fx = -Math.sin(this.yaw) * cp, fy = -sp, fz = -Math.cos(this.yaw) * cp;
    const rx = Math.cos(this.yaw), rz = -Math.sin(this.yaw);

    // Shoulder offset is collision-checked too, so the camera never pokes into walls.
    const origin = _look.copy(this.pivot);
    let shoulderLen = shoulder;
    if (shoulder > 0 && this.world.raycast(origin.x, origin.y, origin.z, rx, 0, rz, shoulder + 0.3, _hit)) {
      shoulderLen = Math.max(0, _hit.dist - 0.3);
    }
    origin.x += rx * shoulderLen;
    origin.z += rz * shoulderLen;

    let want = dist;
    if (this.world.raycast(origin.x, origin.y, origin.z, -fx, -fy, -fz, dist + 0.3, _hit)) {
      want = Math.max(0.6, _hit.dist - 0.3);
    }
    // Pull in instantly, ease back out.
    this.currentDist = want < this.currentDist ? want : this.currentDist + (want - this.currentDist) * Math.min(1, dt * 4);

    _desired.set(origin.x - fx * this.currentDist, origin.y - fy * this.currentDist, origin.z - fz * this.currentDist);
    if (_desired.y < 0.25) _desired.y = 0.25;
    cam.position.copy(_desired);

    const shake = this.trauma * this.trauma * (this.reducedShake ? 0.2 : 1);
    if (shake > 0.001) {
      const t = this.shakeTime * 30;
      cam.position.x += (Math.sin(t * 1.3) + Math.sin(t * 2.9)) * 0.06 * shake;
      cam.position.y += (Math.sin(t * 1.7 + 1) + Math.sin(t * 3.1)) * 0.06 * shake;
    }
    cam.lookAt(cam.position.x + fx, cam.position.y + fy, cam.position.z + fz);
    if (shake > 0.001) cam.rotateZ(Math.sin(this.shakeTime * 40) * 0.012 * shake);

    if (Math.abs(cam.fov - fov) > 0.05) {
      cam.fov += (fov - cam.fov) * Math.min(1, dt * 8);
      cam.updateProjectionMatrix();
    }
  }

  get aimAmount(): number {
    return this.aimBlend;
  }
}
