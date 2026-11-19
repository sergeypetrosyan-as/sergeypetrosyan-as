import { TILE } from '../game/Config';
import type { Box } from '../world/Physics';
import type { World } from '../world/World';

export type PlatformKind = 'slide' | 'lift' | 'crumble' | 'glitch' | 'timedA' | 'timedB' | 'crusher';

/** Timed blocks swap every this many seconds. */
export const TIMED_PERIOD = 2;
const SLIDE_RANGE = 5 * TILE;
const LIFT_RANGE = 6 * TILE;

/** Anything solid that moves or changes: the physics treats these like tiles. */
export class Platform implements Box {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Displacement during the last step, used to carry riders. */
  dx = 0;
  dy = 0;
  solid = true;
  /** One-way platforms only block from above. */
  oneWay: boolean;
  /** Seconds in the current state. */
  t = 0;
  state: 'idle' | 'shake' | 'fall' | 'gone' | 'slam' | 'rise' = 'idle';
  /** Set by the physics when the player stood on it this step. */
  stoodOn = false;
  vy = 0;
  readonly x0: number;
  readonly y0: number;

  constructor(readonly kind: PlatformKind, tx: number, ty: number, wTiles: number, readonly phase = 0) {
    this.x = this.x0 = tx * TILE;
    this.y = this.y0 = ty * TILE;
    this.w = wTiles * TILE;
    this.h = kind === 'slide' || kind === 'lift' ? 8 : kind === 'crusher' ? 26 : TILE;
    this.oneWay = kind === 'slide' || kind === 'lift';
  }

  /** 0..1 eased travel with a rest at each end. */
  private travel(period: number): number {
    const p = (((this.t + this.phase) % period) + period) % period / period;
    const rest = 0.14;
    if (p < rest) return 0;
    if (p < 0.5) return 0.5 - 0.5 * Math.cos(((p - rest) / (0.5 - rest)) * Math.PI);
    if (p < 0.5 + rest) return 1;
    return 0.5 + 0.5 * Math.cos(((p - 0.5 - rest) / (0.5 - rest)) * Math.PI);
  }

  update(dt: number, world: World): void {
    const px = this.x;
    const py = this.y;
    this.t += dt;
    switch (this.kind) {
      case 'slide':
        this.x = this.x0 + SLIDE_RANGE * this.travel(5.2);
        break;
      case 'lift':
        this.y = this.y0 - LIFT_RANGE * this.travel(6.4);
        break;
      case 'crumble':
        this.updateCrumble(dt);
        break;
      case 'glitch':
        this.updateGlitch(world);
        break;
      case 'timedA':
      case 'timedB': {
        const on = (Math.floor(world.time / TIMED_PERIOD) % 2 === 0) === (this.kind === 'timedA');
        // Never materialise inside the player.
        this.solid = on && (this.solid || !world.overlapsPlayer(this));
        break;
      }
      case 'crusher':
        this.updateCrusher(dt, world);
        break;
    }
    this.dx = this.x - px;
    this.dy = this.y - py;
    this.stoodOn = false;
  }

  private updateCrumble(dt: number): void {
    if (this.state === 'idle' && this.stoodOn) this.go('shake');
    else if (this.state === 'shake' && this.t > 0.38) {
      this.go('fall');
      this.solid = false;
      this.vy = 0;
    } else if (this.state === 'fall') {
      this.vy = Math.min(this.vy + 1600 * dt, 520);
      this.y += this.vy * dt;
      if (this.t > 1.2) this.go('gone');
    } else if (this.state === 'gone' && this.t > 2.6) {
      this.go('idle');
      this.y = this.y0;
      this.solid = true;
    }
  }

  private updateGlitch(world: World): void {
    if (this.state === 'idle' && this.stoodOn) this.go('shake');
    else if (this.state === 'shake' && this.t > 0.55) {
      this.go('gone');
      this.solid = false;
    } else if (this.state === 'gone' && this.t > 2.4 && !world.overlapsPlayer(this)) {
      this.go('idle');
      this.solid = true;
    }
  }

  private updateCrusher(dt: number, world: World): void {
    const p = world.player;
    const under = p.x + p.w > this.x - 6 && p.x < this.x + this.w + 6 && p.y > this.y;
    if (this.state === 'idle' && under && !p.dead) this.go('shake');
    else if (this.state === 'shake' && this.t > 0.42) {
      this.go('fall');
      this.vy = 0;
    } else if (this.state === 'fall') {
      this.vy = Math.min(this.vy + 2600 * dt, 760);
      const floorY = world.floorBelow(this.x + 2, this.x + this.w - 2, this.y + this.h);
      this.y += this.vy * dt;
      if (this.y + this.h >= floorY) {
        this.y = floorY - this.h;
        this.go('slam');
        world.crusherSlam(this);
      }
    } else if (this.state === 'slam' && this.t > 0.8) this.go('rise');
    else if (this.state === 'rise') {
      this.y = Math.max(this.y0, this.y - 70 * dt);
      if (this.y === this.y0) this.go('idle');
    }
  }

  /** True while the crusher is coming down fast enough to hurt. */
  get crushing(): boolean {
    return this.kind === 'crusher' && this.state === 'fall';
  }

  private go(s: Platform['state']): void {
    this.state = s;
    this.t = 0;
  }
}
