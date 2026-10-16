import { TILE } from '../game/Config';
import type { Box } from '../world/Physics';

/** Ceiling laser gate: off, flickers a warning, then fires to the floor. */
export class Laser {
  readonly x: number;
  readonly y: number;
  /** Beam end, found once the level is built. */
  y2 = 0;
  t: number;
  static readonly PERIOD = 3.0;

  constructor(tx: number, ty: number, phase: number) {
    this.x = tx * TILE + TILE / 2;
    this.y = ty * TILE + 10;
    this.t = phase;
  }

  get stage(): 'off' | 'warn' | 'on' {
    const p = ((this.t % Laser.PERIOD) + Laser.PERIOD) % Laser.PERIOD;
    return p < 1.4 ? 'off' : p < 1.9 ? 'warn' : 'on';
  }

  hits(b: Box): boolean {
    return this.stage === 'on' && b.x < this.x + 3 && b.x + b.w > this.x - 3 && b.y < this.y2 && b.y + b.h > this.y;
  }
}

/** An emitter gliding back and forth, always on, with a beam that stops short of the floor. */
export class SweepLaser {
  x: number;
  readonly x0: number;
  readonly y: number;
  readonly len = 88;
  t: number;

  constructor(tx: number, ty: number, phase: number) {
    this.x = this.x0 = tx * TILE + TILE / 2;
    this.y = ty * TILE + 10;
    this.t = phase;
  }

  update(dt: number): void {
    this.t += dt;
    this.x = this.x0 + 40 - 40 * Math.cos(this.t * 1.2);
  }

  hits(b: Box): boolean {
    return b.x < this.x + 2.5 && b.x + b.w > this.x - 2.5 && b.y < this.y + this.len && b.y + b.h > this.y;
  }
}

/** Orbs on rotating arms around a pivot. */
export class Rotor {
  readonly cx: number;
  readonly cy: number;
  angle: number;
  readonly arms: number;
  readonly radii: number[];
  readonly speed: number;
  readonly orbR = 5;

  constructor(tx: number, ty: number, double: boolean) {
    this.cx = tx * TILE + TILE / 2;
    this.cy = ty * TILE + TILE / 2;
    this.arms = double ? 2 : 1;
    this.radii = double ? [14, 28, 42] : [14, 28, 42, 56];
    this.speed = double ? -1.25 : 1.45;
    this.angle = double ? 0 : Math.PI / 2;
  }

  update(dt: number): void {
    this.angle += this.speed * dt;
  }

  /** Calls fn for each orb position. */
  orbs(fn: (x: number, y: number) => void): void {
    for (let a = 0; a < this.arms; a++) {
      const ang = this.angle + a * Math.PI;
      const c = Math.cos(ang);
      const s = Math.sin(ang);
      for (const r of this.radii) fn(this.cx + c * r, this.cy + s * r);
    }
  }

  hits(b: Box): boolean {
    let hit = false;
    this.orbs((x, y) => {
      const nx = Math.max(b.x, Math.min(x, b.x + b.w));
      const ny = Math.max(b.y, Math.min(y, b.y + b.h));
      if ((nx - x) ** 2 + (ny - y) ** 2 < (this.orbR - 1) ** 2) hit = true;
    });
    return hit;
  }
}

export class Spring implements Box {
  readonly x: number;
  readonly y: number;
  readonly w = 14;
  readonly h = 8;
  /** Compression animation, 1 → 0. */
  squash = 0;

  constructor(tx: number, ty: number) {
    this.x = tx * TILE + 1;
    this.y = (ty + 1) * TILE - this.h;
  }
}
