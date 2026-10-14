import type { Rect } from './types';

export const COURIER = { w: 14, h: 28, speed: 62, gravity: 1400, stepUp: 11, stepDown: 15 };
const HISTORY = 900; // 15 s at 60 Hz

export type DeathCause = 'fell' | 'crushed' | 'struck' | 'erased';

/** Read-only view of the world the courier walks through. */
export interface Ground {
  /** Highest solid top surface under x within [y - up, y + down], or null. */
  surface(x: number, y: number, up: number, down: number): number | null;
  /** True if any solid overlaps the rect. */
  blocked(r: Rect): boolean;
}

interface Snapshot {
  x: number;
  y: number;
  vy: number;
  grounded: boolean;
  walk: number;
}

/**
 * Ilo walks right at a fixed pace and waits at gaps and walls rather than
 * stepping into them. Every tick of her life is recorded; inside the lens she
 * plays it back in reverse, which is also how a death is undone.
 */
export class Courier {
  x = 0;
  y = 0;
  vy = 0;
  grounded = true;
  waiting = false;
  /** Walk-cycle phase. */
  walk = 0;
  dead: DeathCause | null = null;
  deadTime = 0;
  won = false;
  rewinding = false;
  private readonly hist: Snapshot[] = Array.from({ length: HISTORY }, () => ({ x: 0, y: 0, vy: 0, grounded: true, walk: 0 }));
  private head = 0;
  private count = 0;
  private readonly probe: Rect = { x: 0, y: 0, w: 0, h: 0 };

  spawn(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.grounded = true;
    this.waiting = false;
    this.walk = 0;
    this.dead = null;
    this.deadTime = 0;
    this.won = false;
    this.rewinding = false;
    this.count = 0;
  }

  get historySeconds(): number {
    return this.count / 60;
  }

  /** Recent positions, newest first — drawn as her scarf of light. */
  trail(n: number, out: Array<{ x: number; y: number }>): number {
    const k = Math.min(n, this.count);
    for (let i = 0; i < k; i++) {
      const s = this.hist[(this.head - 1 - i + HISTORY * 2) % HISTORY];
      out[i].x = s.x;
      out[i].y = s.y;
    }
    return k;
  }

  /** One fixed tick. Returns true if she was rewound this tick. */
  tick(dt: number, inLens: boolean, ground: Ground): boolean {
    this.rewinding = false;
    if (this.won) return false;
    if (inLens && this.count > 0) {
      this.head = (this.head - 1 + HISTORY) % HISTORY;
      this.count--;
      const s = this.hist[this.head];
      this.x = s.x; this.y = s.y; this.vy = s.vy; this.grounded = s.grounded; this.walk = s.walk;
      this.dead = null;
      this.deadTime = 0;
      this.waiting = false;
      this.rewinding = true;
      return true;
    }
    if (this.dead) {
      this.deadTime += dt;
      return false;
    }
    if (inLens) return false; // out of history: frozen in place

    // Record before moving so a rewind lands exactly on past frames.
    const s = this.hist[this.head];
    s.x = this.x; s.y = this.y; s.vy = this.vy; s.grounded = this.grounded; s.walk = this.walk;
    this.head = (this.head + 1) % HISTORY;
    this.count = Math.min(HISTORY, this.count + 1);

    // Support under the feet (also carries her on elevators).
    const under = ground.surface(this.x, this.y, COURIER.stepUp, this.grounded ? 4 : 0);
    if (under !== null && this.vy >= 0) {
      this.y = under;
      this.vy = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }

    if (this.grounded) {
      const aheadX = this.x + 9;
      const floorAhead = ground.surface(aheadX, this.y, COURIER.stepUp, COURIER.stepDown);
      const p = this.probe;
      p.x = this.x + 5; p.y = this.y - COURIER.h + 2; p.w = 6; p.h = COURIER.h - COURIER.stepUp - 3;
      const wall = ground.blocked(p);
      this.waiting = floorAhead === null || wall;
      if (!this.waiting) {
        this.x += COURIER.speed * dt;
        this.walk += dt * 9;
      }
    } else {
      this.waiting = false;
      const prevY = this.y;
      this.vy = Math.min(900, this.vy + COURIER.gravity * dt);
      const ny = this.y + this.vy * dt;
      const land = ground.surface(this.x, prevY, 0, ny - prevY + 1);
      if (land !== null) {
        this.y = land;
        this.vy = 0;
        this.grounded = true;
      } else {
        this.y = ny;
      }
    }
    return false;
  }

  body(out: Rect): Rect {
    out.x = this.x - COURIER.w / 2;
    out.y = this.y - COURIER.h;
    out.w = COURIER.w;
    out.h = COURIER.h;
    return out;
  }

  kill(cause: DeathCause): void {
    if (this.dead || this.won) return;
    this.dead = cause;
    this.deadTime = 0;
  }
}
