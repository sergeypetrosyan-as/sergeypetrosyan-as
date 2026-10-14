import { Courier, type Ground } from './Courier';
import { Crusher, Elevator, Front, Sign, Tile, type Timed } from './objects';
import type { LevelDef, Lens, Rect } from './types';

export const GROUND_Y = 400;
export const KILL_Y = 600;
export const LENS_SIZES = [70, 105, 150] as const;
/** Lantern light lost per borrowed second (percent). */
export const LIGHT_PER_SECOND = 0.6;

export interface WorldEvents {
  tileShake(x: number): void;
  tileFall(x: number): void;
  tileRestore(x: number): void;
  signFall(x: number): void;
  signLand(x: number): void;
  crusherSlam(x: number): void;
  spark(x: number, y: number): void;
  death(cause: string): void;
  revive(): void;
  win(): void;
  budgetEmpty(): void;
}

const _r: Rect = { x: 0, y: 0, w: 0, h: 0 };
const _b: Rect = { x: 0, y: 0, w: 0, h: 0 };
const _a = { x: 0, y: 0 };

function overlap(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

/** One district in play: all timed objects, the courier, the lens and its cost. */
export class World implements Ground {
  readonly tiles: Tile[];
  readonly signs: Sign[];
  readonly crushers: Crusher[];
  readonly elevators: Elevator[];
  readonly front: Front | null;
  readonly sparks: Array<{ x: number; y: number; taken: boolean }>;
  readonly courier = new Courier();
  readonly lens: Lens = { x: 0, y: 0, r: LENS_SIZES[1], active: false };
  readonly timed: Timed[];
  time = 0;
  budget: number;
  borrowed = 0;
  sparksTaken = 0;
  /** True while the player is holding the lens but the budget is spent. */
  fizzling = false;
  private crusherWasDown: boolean[] = [];
  private signWasResting: boolean[] = [];
  private signWasMoving: boolean[] = [];
  private tileWasShaking: boolean[] = [];

  constructor(readonly def: LevelDef, private readonly ev: WorldEvents) {
    this.tiles = def.tiles.map((t) => new Tile(t));
    this.signs = (def.signs ?? []).map((s) => new Sign(s));
    this.crushers = (def.crushers ?? []).map((c) => new Crusher(c));
    this.elevators = (def.elevators ?? []).map((e) => new Elevator(e));
    this.front = def.front ? new Front(def.front) : null;
    this.sparks = (def.sparks ?? []).map(([x, y]) => ({ x, y, taken: false }));
    this.timed = [...this.tiles, ...this.signs, ...this.crushers, ...this.elevators, ...(this.front ? [this.front] : [])];
    this.budget = def.budget;
    this.courier.spawn(def.start, this.surface(def.start, GROUND_Y, 200, 200) ?? GROUND_Y);
    this.crusherWasDown = this.crushers.map((c) => c.dangerous);
    this.signWasResting = this.signs.map((s) => s.resting);
    this.signWasMoving = this.signs.map((s) => s.moving);
    this.tileWasShaking = this.tiles.map(() => false);
    for (const t of this.tiles) t.wasSolid = t.solid;
  }

  get lightLost(): number {
    return this.borrowed * LIGHT_PER_SECOND;
  }

  // ------------------------------------------------------------- Ground
  surface(x: number, y: number, up: number, down: number): number | null {
    let best: number | null = null;
    const consider = (r: Rect) => {
      if (x < r.x - 3 || x > r.x + r.w + 3) return;
      if (r.y < y - up || r.y > y + down) return;
      if (best === null || r.y < best) best = r.y;
    };
    for (const t of this.tiles) if (t.solid) consider(t.rect);
    for (const s of this.signs) if (s.resting) consider(s.rest);
    for (const e of this.elevators) consider(e.rect(_r));
    return best;
  }

  blocked(r: Rect): boolean {
    for (const t of this.tiles) if (t.solid && overlap(r, t.rect)) return true;
    for (const s of this.signs) if (s.resting && overlap(r, s.rest)) return true;
    for (const c of this.crushers) if (c.extension > 0.05 && overlap(r, c.rect(_b))) return true;
    for (const e of this.elevators) if (overlap(r, e.rect(_b))) return true;
    return false;
  }

  // ------------------------------------------------------------- lens
  private inLens(x: number, y: number, pad = 0): boolean {
    const l = this.lens;
    const dx = x - l.x, dy = y - l.y;
    return dx * dx + dy * dy < (l.r + pad) * (l.r + pad);
  }

  // ------------------------------------------------------------- tick
  step(dt: number, lensHeld: boolean, lensScale: number): void {
    this.time += dt;
    const c = this.courier;

    // Spending: bigger circles cost more of the district's spare time.
    const wantLens = lensHeld && !c.won;
    let active = false;
    if (wantLens) {
      if (this.budget > 0) {
        const cost = dt * lensScale;
        this.budget = Math.max(0, this.budget - cost);
        this.borrowed += cost;
        active = true;
        if (this.budget === 0) this.ev.budgetEmpty();
      }
    }
    this.fizzling = wantLens && !active;
    this.lens.active = active;

    // Triggers
    for (const t of this.tiles) {
      if (t.triggered || !t.collapsible) continue;
      const d = t.def;
      if (d.trigger === 'timer' && this.time >= (d.delay ?? 0)) t.triggered = true;
      else if (d.trigger === 'front' && this.front && this.front.x >= t.rect.x) t.triggered = true;
      else if (d.trigger === 'step' && c.grounded && !c.dead && Math.abs(c.y - t.rect.y) < 1 && c.x >= t.rect.x - 4 && c.x <= t.rect.x + t.rect.w + 4) t.triggered = true;
    }
    for (const s of this.signs) {
      if (s.triggered) continue;
      if ((s.def.nearX !== undefined && c.x >= s.def.nearX) || (s.def.delay !== undefined && this.time >= s.def.delay)) s.triggered = true;
    }

    // Clocks
    for (const o of this.timed) {
      if (o === this.front) o.inLens = active && Math.abs(this.front.x - this.lens.x) < this.lens.r;
      else {
        o.anchor(_a);
        let inside = active && this.inLens(_a.x, _a.y, 6);
        if (active && !inside) {
          o.home(_a);
          inside = this.inLens(_a.x, _a.y, 6);
        }
        o.inLens = inside;
      }
      o.step(dt);
    }

    // Courier: she is "in" the lens if her chest is.
    const courierInLens = active && this.inLens(c.x, c.y - 14);
    const wasDead = c.dead;
    c.tick(dt, courierInLens, this);
    if (wasDead && !c.dead) this.ev.revive();

    this.hazards();
    this.emitTransitions();

    for (const s of this.sparks) {
      if (s.taken || c.dead) continue;
      const dx = s.x - c.x, dy = s.y - (c.y - 14);
      if (dx * dx + dy * dy < 22 * 22) {
        s.taken = true;
        this.sparksTaken++;
        this.budget += 2.5;
        this.ev.spark(s.x, s.y);
      }
    }

    if (!c.dead && !c.won && c.x >= this.def.goal) {
      c.won = true;
      this.ev.win();
    }
  }

  private hazards(): void {
    const c = this.courier;
    if (c.dead || c.won || c.rewinding) return;
    const body = c.body(_r);
    if (c.y > KILL_Y) return this.die('fell');
    if (this.front && c.x - 6 < this.front.x) return this.die('erased');
    for (const k of this.crushers) if (k.dangerous && overlap(body, k.rect(_b))) return this.die('crushed');
    for (const s of this.signs) if (s.moving && overlap(body, s.bodyRect(_b))) return this.die('struck');
  }

  private die(cause: string): void {
    this.courier.kill(cause as never);
    this.ev.death(cause);
  }

  private emitTransitions(): void {
    this.tiles.forEach((t, i) => {
      const solid = t.solid;
      if (t.wasSolid && !solid) this.ev.tileFall(t.rect.x);
      if (!t.wasSolid && solid) this.ev.tileRestore(t.rect.x);
      t.wasSolid = solid;
      const shaking = t.shaking > 0;
      if (shaking && !this.tileWasShaking[i] && !t.inLens) this.ev.tileShake(t.rect.x);
      this.tileWasShaking[i] = shaking;
    });
    this.signs.forEach((s, i) => {
      if (s.moving && !this.signWasMoving[i] && !s.inLens) this.ev.signFall(s.def.hx);
      if (s.resting && !this.signWasResting[i]) this.ev.signLand(s.def.rx);
      this.signWasMoving[i] = s.moving;
      this.signWasResting[i] = s.resting;
    });
    this.crushers.forEach((k, i) => {
      const down = k.dangerous;
      if (down && !this.crusherWasDown[i] && !k.inLens) this.ev.crusherSlam(k.def.x + k.def.w / 2);
      this.crusherWasDown[i] = down;
    });
  }
}
