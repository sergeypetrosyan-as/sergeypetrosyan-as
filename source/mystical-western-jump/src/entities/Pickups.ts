import { TILE } from '../game/Config';
import type { Box } from '../world/Physics';

export type PickupKind = 'volt' | 'shard' | 'token' | 'repair' | 'shield' | 'overdrive';

export class Pickup implements Box {
  x: number;
  y: number;
  w: number;
  h: number;
  taken = false;
  /** Rising out of a prize block: 1 → 0. */
  emerge = 0;
  t = Math.random() * 6;

  constructor(readonly kind: PickupKind, x: number, y: number, readonly index = 0) {
    const size = kind === 'volt' ? 8 : 12;
    this.w = this.h = size;
    this.x = x + (TILE - size) / 2;
    this.y = y + (TILE - size) / 2;
  }

  get cx(): number {
    return this.x + this.w / 2;
  }

  get cy(): number {
    return this.y + this.h / 2;
  }
}
