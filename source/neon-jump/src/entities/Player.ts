import { MAX_HP, PHYS, PLAYER_H, PLAYER_W, TILE } from '../game/Config';
import type { Platform } from './Platforms';
import { T } from '../world/Level';
import { moveX, moveY, type Body } from '../world/Physics';
import type { World } from '../world/World';

/** One simulation step's worth of input. Edge flags are true on the first step of a frame only. */
export interface Controls {
  left: boolean;
  right: boolean;
  down: boolean;
  jump: boolean;
  jumpPressed: boolean;
  sprint: boolean;
  interactPressed: boolean;
}

export type Pose = 'idle' | 'run' | 'rise' | 'fall' | 'hurt' | 'win';

const CONVEYOR = 62;

/** Vee, the neon courier. Pure movement and state; the World decides what touching things means. */
export class Player implements Body {
  x = 0;
  y = 0;
  readonly w = PLAYER_W;
  readonly h = PLAYER_H;
  vx = 0;
  vy = 0;
  face: 1 | -1 = 1;
  onGround = false;
  ground: Platform | null = null;
  groundTile: T = T.Empty;
  hp = MAX_HP;
  invuln = 0;
  shield = 0;
  overdrive = 0;
  dead = false;
  won = false;
  /** Seconds since leaving the ground (for coyote time). */
  private airTime = 0;
  private buffer = 0;
  private jumping = false;
  /** Spring launches rise at full height without needing jump held. */
  private boosted = false;
  private doubleUsed = false;
  private dropThrough = 0;
  /** Squash and stretch, eased back to 1. */
  sx = 1;
  sy = 1;
  anim = 0;
  pose: Pose = 'idle';
  hurtTime = 0;

  spawn(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.vx = this.vy = 0;
    this.face = 1;
    this.hp = MAX_HP;
    this.invuln = 1;
    this.shield = this.overdrive = 0;
    this.dead = this.won = false;
    this.onGround = false;
    this.ground = null;
    this.airTime = 0;
    this.buffer = 0;
    this.jumping = false;
    this.boosted = false;
    this.sx = this.sy = 1;
    this.hurtTime = 0;
  }

  get cx(): number {
    return this.x + this.w / 2;
  }

  get bottom(): number {
    return this.y + this.h;
  }

  update(dt: number, c: Controls, world: World): void {
    if (this.dead) return;
    this.anim += dt;
    this.invuln = Math.max(0, this.invuln - dt);
    this.shield = Math.max(0, this.shield - dt);
    this.overdrive = Math.max(0, this.overdrive - dt);
    this.hurtTime = Math.max(0, this.hurtTime - dt);
    this.dropThrough = Math.max(0, this.dropThrough - dt);
    if (this.won) {
      this.vx *= 0.9;
      this.applyGravity(dt, false);
      this.collide(dt, world);
      this.pose = 'win';
      return;
    }

    // Ride whatever we're standing on.
    if (this.ground && this.ground.solid) {
      moveX(world, this, this.ground.dx);
      if (this.ground.dy !== 0) this.y = this.ground.y - this.h;
    }

    const stunned = this.hurtTime > 1.15;
    const dir = stunned ? 0 : (c.right ? 1 : 0) - (c.left ? 1 : 0);
    const od = this.overdrive > 0 ? PHYS.overdriveSpeed : 1;
    const max = (c.sprint ? PHYS.sprint : PHYS.run) * od;
    if (dir !== 0) {
      this.face = dir as 1 | -1;
      const turning = Math.sign(this.vx) === -dir && this.onGround;
      const accel = turning ? PHYS.turnGround : this.onGround ? PHYS.accelGround : PHYS.accelAir;
      this.vx += dir * accel * dt;
      if (Math.abs(this.vx) > max) this.vx = Math.sign(this.vx) * Math.max(max, Math.abs(this.vx) - PHYS.decelGround * dt);
    } else if (!stunned) {
      const decel = (this.onGround ? PHYS.decelGround : PHYS.decelAir) * dt;
      this.vx = Math.abs(this.vx) <= decel ? 0 : this.vx - Math.sign(this.vx) * decel;
    }

    // Jump: buffered presses, coyote time, a double jump while overdriven.
    if (c.jumpPressed) this.buffer = PHYS.buffer;
    else this.buffer = Math.max(0, this.buffer - dt);
    if (this.onGround) {
      this.airTime = 0;
      this.doubleUsed = false;
    } else this.airTime += dt;

    if (this.buffer > 0 && !stunned) {
      if (this.onGround && c.down && this.standingOnOneWay(world)) {
        this.dropThrough = 0.22;
        this.y += 2;
        this.onGround = false;
        this.ground = null;
        this.buffer = 0;
      } else if (this.onGround || this.airTime < PHYS.coyote) {
        this.launch(PHYS.jumpV);
        world.emit('jump');
      } else if (this.overdrive > 0 && !this.doubleUsed) {
        this.doubleUsed = true;
        this.launch(PHYS.jumpV * 0.92);
        world.emit('double-jump');
      }
    }
    // Variable height: letting go early cuts the rise.
    if (this.jumping && !c.jump && this.vy < 0) {
      this.vy *= PHYS.jumpCut;
      this.jumping = false;
    }
    if (this.vy >= 0) this.jumping = false;

    this.applyGravity(dt, c.jump);
    this.collide(dt, world);

    // Ease squash and stretch back.
    const k = Math.min(1, dt * 14);
    this.sx += (1 - this.sx) * k;
    this.sy += (1 - this.sy) * k;

    if (this.hurtTime > 1.0) this.pose = 'hurt';
    else if (!this.onGround) this.pose = this.vy < 0 ? 'rise' : 'fall';
    else this.pose = Math.abs(this.vx) > 12 ? 'run' : 'idle';
  }

  private launch(v: number): void {
    this.vy = -v;
    this.onGround = false;
    this.ground = null;
    this.jumping = true;
    this.buffer = 0;
    this.airTime = PHYS.coyote;
    this.sx = 0.72;
    this.sy = 1.3;
  }

  /** Bounce off an enemy or spring. Holding jump bounces higher. */
  bounce(v: number, held: boolean, hold: number = PHYS.stompHoldV, boost = false): void {
    this.vy = -(held ? Math.max(v, hold) : v);
    this.boosted = boost;
    this.onGround = false;
    this.ground = null;
    this.jumping = held;
    this.airTime = PHYS.coyote;
    this.doubleUsed = false;
    this.sx = 0.75;
    this.sy = 1.28;
  }

  private applyGravity(dt: number, held: boolean): void {
    if (this.vy >= 0) this.boosted = false;
    const g = this.vy < 0 && ((held && this.jumping) || this.boosted) ? PHYS.gravUp : this.vy < 0 ? PHYS.gravUp * 1.25 : PHYS.gravDown;
    this.vy = Math.min(this.vy + g * dt, PHYS.maxFall);
  }

  private collide(dt: number, world: World): void {
    let extra = 0;
    if (this.onGround && (this.groundTile === T.ConvL || this.groundTile === T.ConvR)) extra = this.groundTile === T.ConvR ? CONVEYOR : -CONVEYOR;
    moveX(world, this, (this.vx + extra) * dt);
    if ((this.x <= 0 && this.vx < 0) || (this.x + this.w >= world.level.pxW && this.vx > 0)) this.vx = 0;
    const wasGround = this.onGround;
    const fallSpeed = this.vy;
    const r = moveY(world, this, this.vy * dt, this.dropThrough <= 0);
    if (r.floor) {
      if (!wasGround && fallSpeed > 120) {
        const s = Math.min(1, fallSpeed / PHYS.maxFall);
        this.sx = 1 + 0.35 * s;
        this.sy = 1 - 0.3 * s;
        world.emit('land', fallSpeed);
      }
      this.vy = 0;
      this.onGround = true;
      this.ground = r.platform;
      this.groundTile = r.floorTile;
      if (r.platform) r.platform.stoodOn = true;
    } else {
      this.onGround = false;
      this.ground = null;
      this.groundTile = T.Empty;
    }
    if (r.ceiling) {
      this.vy = Math.max(this.vy, 30);
      this.jumping = false;
      if (r.bumped >= 0) world.bumpTile(r.bumped);
    }
  }

  private standingOnOneWay(world: World): boolean {
    if (this.ground) return this.ground.oneWay;
    const ty = Math.floor((this.y + this.h + 1) / TILE);
    const a = world.level.at(Math.floor(this.x / TILE), ty);
    const b = world.level.at(Math.floor((this.x + this.w - 0.01) / TILE), ty);
    return (a === T.OneWay || a === T.Empty) && (b === T.OneWay || b === T.Empty);
  }

  /** Takes a hit. Returns 'shield' if absorbed, 'hurt' or 'dead'. */
  hurt(fromX: number): 'none' | 'shield' | 'hurt' | 'dead' {
    if (this.invuln > 0 || this.dead || this.won) return 'none';
    const away = this.cx < fromX ? -1 : 1;
    if (this.shield > 0) {
      this.shield = 0;
      this.invuln = 1.0;
      this.vx = away * 160;
      this.vy = -220;
      return 'shield';
    }
    this.hp -= 1;
    if (this.hp <= 0) return 'dead';
    this.invuln = PHYS.hurtInvuln;
    this.hurtTime = 1.4;
    this.vx = away * 150;
    this.vy = -250;
    this.onGround = false;
    this.ground = null;
    return 'hurt';
  }
}
