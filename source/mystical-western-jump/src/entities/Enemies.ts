import { TILE } from '../game/Config';
import { moveX, moveY, type Body } from '../world/Physics';
import type { World } from '../world/World';

export type EnemyKind = 'slime' | 'drone' | 'droneV' | 'hopper' | 'turret' | 'phantom' | 'spiker';

const SIZE: Record<EnemyKind, [number, number]> = {
  slime: [12, 10],
  drone: [14, 10],
  droneV: [14, 10],
  hopper: [12, 12],
  turret: [14, 14],
  phantom: [12, 14],
  spiker: [14, 10],
};

export const PHANTOM_CYCLE = 3.6;

export class Enemy implements Body {
  x: number;
  y: number;
  readonly w: number;
  readonly h: number;
  vx = 0;
  vy = 0;
  face: 1 | -1;
  alive = true;
  /** Seconds since defeat, for the squash animation; removed after it ends. */
  deadTime = 0;
  t = 0;
  /** Turret charge / hopper crouch progress, 0..1, for telegraphing. */
  charge = 0;
  onGround = false;
  readonly x0: number;
  readonly y0: number;

  constructor(readonly kind: EnemyKind, tx: number, ty: number, readonly phase: number) {
    [this.w, this.h] = SIZE[kind];
    this.x = this.x0 = tx * TILE + (TILE - this.w) / 2;
    this.y = this.y0 = kind === 'drone' || kind === 'droneV' ? ty * TILE + 3 : (ty + 1) * TILE - this.h;
    this.face = -1;
    if (kind === 'slime' || kind === 'spiker' || kind === 'phantom') this.vx = -(kind === 'phantom' ? 22 : kind === 'spiker' ? 32 : 28);
    this.t = phase;
  }

  /** Stomping defeats it. Spikers are all edges. */
  get stompable(): boolean {
    return this.kind !== 'spiker' && this.solidNow;
  }

  /** Phantoms are only real for part of their cycle. */
  get solidNow(): boolean {
    if (this.kind !== 'phantom') return true;
    return this.phantomAlpha > 0.65;
  }

  get phantomAlpha(): number {
    const p = ((this.t % PHANTOM_CYCLE) + PHANTOM_CYCLE) % PHANTOM_CYCLE;
    if (p < 2.2) return 1;
    if (p < 2.5) return 1 - (p - 2.2) / 0.3;
    if (p < 3.3) return 0.12;
    return 0.12 + ((p - 3.3) / 0.3) * 0.88;
  }

  update(dt: number, world: World): void {
    this.t += dt;
    if (!this.alive) {
      this.deadTime += dt;
      return;
    }
    switch (this.kind) {
      case 'slime':
      case 'spiker':
      case 'phantom':
        this.walk(dt, world);
        break;
      case 'drone':
        this.x = this.x0 + 32 - 32 * Math.cos(this.t * 0.9);
        this.y = this.y0 + Math.sin(this.t * 3.1) * 3;
        this.face = Math.sin(this.t * 0.9) >= 0 ? 1 : -1;
        break;
      case 'droneV':
        this.y = this.y0 + Math.sin(this.t * 1.5) * 26;
        this.face = world.player.cx < this.x ? -1 : 1;
        break;
      case 'hopper':
        this.hop(dt, world);
        break;
      case 'turret':
        this.shoot(dt, world);
        break;
    }
  }

  private gravity(dt: number, world: World): void {
    this.vy = Math.min(this.vy + 1800 * dt, 480);
    const r = moveY(world, this, this.vy * dt);
    this.onGround = r.floor;
    if (r.floor || r.ceiling) this.vy = 0;
  }

  private walk(dt: number, world: World): void {
    const speed = Math.abs(this.vx) || 28;
    this.face = this.vx < 0 ? -1 : 1;
    if (moveX(world, this, this.vx * dt)) this.vx = -this.vx;
    this.gravity(dt, world);
    // Turn at ledges instead of walking off.
    if (this.onGround) {
      const aheadX = this.vx > 0 ? this.x + this.w + 1 : this.x - 1;
      if (!world.supportAt(aheadX, this.y + this.h + 2)) this.vx = -Math.sign(this.vx) * speed;
    }
  }

  private hop(dt: number, world: World): void {
    const p = world.player;
    const dx = p.cx - (this.x + this.w / 2);
    if (this.onGround) {
      this.vx = 0;
      this.face = dx < 0 ? -1 : 1;
      if (this.charge > 0 || (Math.abs(dx) < 96 && Math.abs(p.y - this.y) < 80 && this.t > 1.1)) {
        this.charge += dt / 0.4;
        if (this.charge >= 1) {
          this.charge = 0;
          this.t = 0;
          this.vy = -340;
          this.vx = this.face * 75;
          this.onGround = false;
          world.emit('hop', this.x);
        }
      }
    }
    moveX(world, this, this.vx * dt);
    this.gravity(dt, world);
  }

  private shoot(dt: number, world: World): void {
    const cycle = 2.4;
    const p = ((this.t % cycle) + cycle) % cycle;
    // Only bother when the player is roughly in range.
    const near = Math.abs(world.player.cx - this.x) < 300;
    this.charge = near && p > cycle - 0.7 ? (p - (cycle - 0.7)) / 0.7 : 0;
    if (near && p < dt) {
      world.fireBolt(this.face > 0 ? this.x + this.w : this.x - 6, this.y + 4, this.face * 115, 0, 'bolt');
    }
  }

  defeat(): void {
    this.alive = false;
    this.deadTime = 0;
  }
}

export type ProjectileKind = 'bolt' | 'orb' | 'rain' | 'wave';

/** Pooled enemy fire. */
export class Projectile {
  x = 0;
  y = 0;
  w = 6;
  h = 6;
  vx = 0;
  vy = 0;
  active = false;
  kind: ProjectileKind = 'bolt';
  t = 0;
  /** Boss shots pass through one-way rails and blocks. */
  ghost = false;
}
