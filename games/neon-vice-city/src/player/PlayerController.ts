import * as THREE from 'three';
import { PLAYER } from '../game/GameConfig';
import type { Input } from '../game/Input';
import { Humanoid } from '../characters/Humanoid';
import type { CollisionWorld, PushResult } from '../world/CollisionWorld';

const _push: PushResult = { hit: false, nx: 0, nz: 0 };

export interface MoveEvents {
  footstep: boolean;
  jumped: boolean;
  landed: boolean;
}

/**
 * On-foot movement: camera-relative acceleration, sprint, jump with gravity,
 * stepping onto low props, and wall sliding via circle push-out. Facing blends
 * between travel direction and the camera when aiming or shooting.
 */
export class PlayerController {
  readonly character: Humanoid;
  readonly position = new THREE.Vector3();
  readonly velocity = new THREE.Vector3();
  facing = 0;
  grounded = true;
  health: number = PLAYER.maxHealth;
  armor = 0;
  alive = true;
  inVehicle = false;
  /** Seconds since the player last fired; drives the strafe/aim stance. */
  combatTimer = 10;
  aimBlend = 0;
  kick = 0;
  private stepTimer = 0;
  private readonly events: MoveEvents = { footstep: false, jumped: false, landed: false };

  constructor() {
    this.character = new Humanoid({
      skin: 0xc68e6a,
      jacket: 0x0f5c6e,
      shirt: 0xeeeef6,
      pants: 0x2a2a38,
      shoes: 0xf2f2f2,
      hair: 0x1a1210,
      neon: 0xff2fd2,
      bulk: 1,
      height: 1,
      visor: false,
      weapon: 'pistol',
    });
  }

  spawn(pos: THREE.Vector3, facing: number): void {
    this.position.copy(pos);
    this.velocity.set(0, 0, 0);
    this.facing = facing;
    this.grounded = true;
    this.health = PLAYER.maxHealth;
    this.armor = 0;
    this.alive = true;
    this.inVehicle = false;
    this.combatTimer = 10;
    this.aimBlend = 0;
    this.character.reset();
    this.character.root.visible = true;
    this.sync();
  }

  /** Applies damage after armour; returns the health actually lost. */
  damage(amount: number): number {
    if (!this.alive) return 0;
    const absorbed = Math.min(this.armor, amount * 0.6);
    this.armor -= absorbed;
    const lost = Math.min(this.health, amount - absorbed);
    this.health -= lost;
    this.character.hitFlash();
    if (this.health <= 0) {
      this.alive = false;
      this.character.startDeath();
    }
    return lost;
  }

  heal(amount: number): void {
    this.health = Math.min(PLAYER.maxHealth, this.health + amount);
  }

  addArmor(amount: number): void {
    this.armor = Math.min(PLAYER.maxArmor, this.armor + amount);
  }

  update(dt: number, input: Input, camYaw: number, camPitch: number, aiming: boolean, world: CollisionWorld): MoveEvents {
    const ev = this.events;
    ev.footstep = ev.jumped = ev.landed = false;
    this.combatTimer += dt;
    this.kick = Math.max(0, this.kick - dt * 8);

    if (!this.alive) {
      this.velocity.x *= 0.9;
      this.velocity.z *= 0.9;
      this.character.update(dt, { speed: 0, grounded: true, aim: 0, aimPitch: 0, kick: 0, swing: 0 });
      return ev;
    }

    // Camera-relative wish direction.
    const ix = input.axis('KeyA', 'KeyD', 'ArrowLeft', 'ArrowRight');
    const iz = input.axis('KeyS', 'KeyW', 'ArrowDown', 'ArrowUp');
    const fx = -Math.sin(camYaw), fz = -Math.cos(camYaw);
    const rx = Math.cos(camYaw), rz = -Math.sin(camYaw);
    let wx = fx * iz + rx * ix;
    let wz = fz * iz + rz * ix;
    const wl = Math.hypot(wx, wz);
    if (wl > 0) { wx /= wl; wz /= wl; }

    const sprint = input.isDown('ShiftLeft') || input.isDown('ShiftRight');
    const speed = aiming ? PLAYER.aimSpeed : sprint && iz > 0 ? PLAYER.runSpeed : PLAYER.walkSpeed;
    const control = this.grounded ? 1 : PLAYER.airControl;
    const tx = wx * speed, tz = wz * speed;
    const a = PLAYER.accel * control * dt;
    const dvx = tx - this.velocity.x, dvz = tz - this.velocity.z;
    const dl = Math.hypot(dvx, dvz);
    if (dl > 0) {
      const k = Math.min(1, a / dl);
      this.velocity.x += dvx * k;
      this.velocity.z += dvz * k;
    }

    if (this.grounded && input.wasPressed('Space')) {
      this.velocity.y = PLAYER.jumpVelocity;
      this.grounded = false;
      ev.jumped = true;
    }
    this.velocity.y -= PLAYER.gravity * dt;

    this.position.x += this.velocity.x * dt;
    this.position.z += this.velocity.z * dt;
    this.position.y += this.velocity.y * dt;

    // Walls: ignore anything we can step onto.
    world.resolveCircle(this.position, PLAYER.radius, this.position.y + PLAYER.stepHeight, this.position.y + PLAYER.height, _push);
    if (_push.hit) {
      const vn = this.velocity.x * _push.nx + this.velocity.z * _push.nz;
      if (vn < 0) { this.velocity.x -= vn * _push.nx; this.velocity.z -= vn * _push.nz; }
    }

    const ground = world.groundHeight(this.position.x, this.position.z, PLAYER.radius, this.position.y);
    if (this.position.y <= ground + 0.001 || (this.grounded && this.position.y - ground < 0.3 && this.velocity.y <= 0)) {
      if (!this.grounded && this.velocity.y < -4) ev.landed = true;
      this.position.y = ground;
      this.velocity.y = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }

    // Facing: toward camera while aiming/firing, else toward travel.
    const combat = aiming || this.combatTimer < 0.8;
    this.aimBlend += ((combat ? 1 : 0) - this.aimBlend) * Math.min(1, dt * 12);
    const hspeed = Math.hypot(this.velocity.x, this.velocity.z);
    let targetFacing = this.facing;
    if (combat) targetFacing = Math.atan2(fx, fz);
    else if (hspeed > 0.6) targetFacing = Math.atan2(this.velocity.x, this.velocity.z);
    let d = targetFacing - this.facing;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    this.facing += d * Math.min(1, dt * (combat ? 20 : 11));

    if (this.grounded && hspeed > 1) {
      this.stepTimer -= dt * hspeed;
      if (this.stepTimer <= 0) { this.stepTimer = 2.1; ev.footstep = true; }
    }

    this.character.update(dt, {
      speed: hspeed,
      grounded: this.grounded,
      aim: this.aimBlend,
      aimPitch: camPitch,
      kick: this.kick,
      swing: 0,
    });
    this.sync();
    return ev;
  }

  sync(): void {
    this.character.root.position.copy(this.position);
    if (this.alive) this.character.root.position.y = this.position.y;
    this.character.root.rotation.y = this.facing;
  }
}
