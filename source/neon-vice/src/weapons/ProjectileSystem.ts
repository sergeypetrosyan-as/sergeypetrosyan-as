import * as THREE from 'three';
import type { CollisionWorld, RayHit } from '../world/CollisionWorld';
import { additive, createGlowTexture } from '../world/Materials';

interface Bolt {
  core: THREE.Mesh;
  halo: THREE.Sprite;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  damage: number;
  active: boolean;
}

/** A target the bolts can strike: a vertical capsule (player on foot) or car hull circle. */
export interface BoltTarget {
  x: number;
  y0: number;
  y1: number;
  z: number;
  radius: number;
}

export interface BoltCallbacks {
  onHitTarget(damage: number, fromX: number, fromZ: number): void;
  onHitWorld(x: number, y: number, z: number, nx: number, ny: number, nz: number): void;
}

const _hit: RayHit = { dist: 0, nx: 0, ny: 0, nz: 0 };
const _dir = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _z = new THREE.Vector3(0, 0, 1);

/** Pooled enemy energy bolts with swept collision against world and the player. */
export class ProjectileSystem {
  readonly group = new THREE.Group();
  private readonly bolts: Bolt[] = [];

  constructor(private readonly world: CollisionWorld, color: number) {
    const geo = new THREE.CapsuleGeometry(0.07, 0.9, 2, 6).rotateX(Math.PI / 2);
    const coreMat = additive(new THREE.Color(color).multiplyScalar(2.4), null, 1);
    const glow = createGlowTexture(64);
    for (let i = 0; i < 40; i++) {
      const core = new THREE.Mesh(geo, coreMat);
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: new THREE.Color(color).multiplyScalar(1.6), blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, transparent: true }));
      halo.scale.setScalar(0.9);
      core.visible = halo.visible = false;
      this.group.add(core, halo);
      this.bolts.push({ core, halo, pos: new THREE.Vector3(), vel: new THREE.Vector3(), life: 0, damage: 0, active: false });
    }
  }

  fire(from: THREE.Vector3, to: THREE.Vector3, speed: number, damage: number): void {
    const b = this.bolts.find((x) => !x.active);
    if (!b) return;
    b.pos.copy(from);
    b.vel.subVectors(to, from).normalize().multiplyScalar(speed);
    b.life = 3;
    b.damage = damage;
    b.active = true;
    b.core.visible = b.halo.visible = true;
    b.core.quaternion.copy(_q.setFromUnitVectors(_z, _dir.copy(b.vel).normalize()));
  }

  update(dt: number, target: BoltTarget | null, cb: BoltCallbacks): void {
    for (const b of this.bolts) {
      if (!b.active) continue;
      b.life -= dt;
      const step = b.vel.length() * dt;
      _dir.copy(b.vel).normalize();
      // Target first: closest approach of the swept segment to the target's axis.
      if (target && this.sweepTarget(b, step, target)) {
        cb.onHitTarget(b.damage, b.pos.x - _dir.x * 10, b.pos.z - _dir.z * 10);
        this.kill(b);
        continue;
      }
      if (this.world.raycast(b.pos.x, b.pos.y, b.pos.z, _dir.x, _dir.y, _dir.z, step, _hit, false)) {
        const hx = b.pos.x + _dir.x * _hit.dist, hy = b.pos.y + _dir.y * _hit.dist, hz = b.pos.z + _dir.z * _hit.dist;
        cb.onHitWorld(hx, hy, hz, _hit.nx, _hit.ny, _hit.nz);
        this.kill(b);
        continue;
      }
      b.pos.addScaledVector(b.vel, dt);
      if (b.life <= 0) { this.kill(b); continue; }
      b.core.position.copy(b.pos);
      b.halo.position.copy(b.pos);
    }
  }

  private sweepTarget(b: Bolt, step: number, t: BoltTarget): boolean {
    // Sample along the segment; bolts are fast but steps are short at 60 Hz.
    const samples = Math.max(1, Math.ceil(step / 0.25));
    for (let i = 1; i <= samples; i++) {
      const s = (step * i) / samples;
      const x = b.pos.x + _dir.x * s, y = b.pos.y + _dir.y * s, z = b.pos.z + _dir.z * s;
      if (y < t.y0 || y > t.y1) continue;
      const dx = x - t.x, dz = z - t.z;
      if (dx * dx + dz * dz < t.radius * t.radius) return true;
    }
    return false;
  }

  private kill(b: Bolt): void {
    b.active = false;
    b.core.visible = b.halo.visible = false;
  }

  clear(): void {
    for (const b of this.bolts) this.kill(b);
  }
}
