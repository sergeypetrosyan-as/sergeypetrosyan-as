import type { CrusherDef, ElevatorDef, FrontDef, Rect, SignDef, TileDef } from './types';

/**
 * Every object owns a local clock τ. Position, rotation and solidity are pure
 * functions of τ, so running τ backward reproduces the past exactly — no
 * history buffers and no drift. The lens only changes the sign of dτ.
 */
export const REWIND_RATE = 1.6;
const G = 1500;
export const SHAKE = 0.7;

export abstract class Timed {
  tau = 0;
  /** Clocks only run forward once triggered; rewinding works regardless. */
  triggered = false;
  inLens = false;
  abstract readonly maxTau: number;
  abstract anchor(out: { x: number; y: number }): void;
  /** Where the object belongs. The lens reaches things at their current spot *or* their home. */
  home(out: { x: number; y: number }): void {
    this.anchor(out);
  }

  step(dt: number): void {
    if (this.inLens) this.tau = Math.max(0, this.tau - dt * REWIND_RATE);
    else if (this.triggered) this.tau = Math.min(this.maxTau, this.tau + dt);
  }
}

export class Tile extends Timed {
  readonly rect: Rect;
  readonly wait: number;
  /** A tile is long gone ~1.1 s into its fall; no point keeping more clock than that. */
  readonly maxTau: number;
  /** Seed for crack pattern and fall spin. */
  readonly spin: number;
  wasSolid = true;

  constructor(readonly def: TileDef) {
    super();
    this.rect = { x: def.x, y: def.y, w: def.w, h: def.h ?? 18 };
    this.wait = def.wait ?? 1.2;
    this.maxTau = this.wait + SHAKE + 1.1;
    this.spin = (Math.sin(def.x * 12.9898) * 43758.5453) % 1;
    if (def.trigger === 'fallen') {
      this.triggered = true;
      this.tau = this.wait + SHAKE + 0.85;
    }
  }

  get collapsible(): boolean {
    return this.def.trigger !== 'none';
  }

  /** Seconds since it started to fall (negative while still standing). */
  get fallT(): number {
    return this.tau - this.wait - SHAKE;
  }

  get dropY(): number {
    const t = this.fallT;
    return t > 0 ? 0.5 * G * t * t : 0;
  }

  get shaking(): number {
    const t = this.tau - this.wait;
    return t > 0 && t < SHAKE ? t / SHAKE : 0;
  }

  get rotation(): number {
    const t = this.fallT;
    return t > 0 ? (this.spin - 0.5) * t * 2.4 : 0;
  }

  get solid(): boolean {
    return this.fallT <= 0;
  }

  anchor(out: { x: number; y: number }): void {
    out.x = this.rect.x + this.rect.w / 2;
    out.y = this.rect.y + this.dropY + this.rect.h / 2;
  }

  home(out: { x: number; y: number }): void {
    out.x = this.rect.x + this.rect.w / 2;
    out.y = this.rect.y + this.rect.h / 2;
  }
}

/** Neon sign: swings for `hold` seconds, then falls into its resting pose. */
export class Sign extends Timed {
  readonly hold: number;
  readonly fallDur = 0.55;
  readonly maxTau: number;
  readonly rest: Rect;

  constructor(readonly def: SignDef) {
    super();
    this.hold = def.hold ?? 1.2;
    this.maxTau = this.hold + this.fallDur;
    const w = def.upright ? def.h : def.w;
    const h = def.upright ? def.w : def.h;
    this.rest = { x: def.rx - w / 2, y: def.ry - h / 2, w, h };
  }

  /** 0 hanging → 1 resting. Gravity-like ease. */
  get progress(): number {
    const t = Math.max(0, this.tau - this.hold) / this.fallDur;
    return Math.min(1, t * t);
  }

  get moving(): boolean {
    return this.progress > 0 && this.progress < 1;
  }

  get resting(): boolean {
    return this.progress >= 1;
  }

  pose(out: { x: number; y: number; rot: number; swing: number }): void {
    const p = this.progress;
    const d = this.def;
    out.x = d.hx + (d.rx - d.hx) * p;
    out.y = d.hy + (d.ry - d.hy) * p;
    out.rot = (d.upright ? Math.PI / 2 : 0) * p;
    // Swing grows while it hangs on to its last chain.
    out.swing = p === 0 ? Math.sin(this.tau * 7) * Math.min(1, this.tau / Math.max(0.01, this.hold)) * 0.12 : 0;
  }

  /** Approximate hit box while it falls. */
  bodyRect(out: Rect): Rect {
    const q = { x: 0, y: 0, rot: 0, swing: 0 };
    this.pose(q);
    const across = Math.abs(Math.sin(q.rot));
    const w = this.def.w * (1 - across) + this.def.h * across;
    const h = this.def.h * (1 - across) + this.def.w * across;
    out.x = q.x - w / 2;
    out.y = q.y - h / 2;
    out.w = w;
    out.h = h;
    return out;
  }

  anchor(out: { x: number; y: number }): void {
    const q = { x: 0, y: 0, rot: 0, swing: 0 };
    this.pose(q);
    out.x = q.x;
    out.y = q.y;
  }

  home(out: { x: number; y: number }): void {
    out.x = this.def.hx;
    out.y = this.def.hy;
  }
}

/** Piston with a fixed cycle; rewinding its clock reverses the cycle. */
export class Crusher extends Timed {
  readonly maxTau = 1e6;

  constructor(readonly def: CrusherDef) {
    super();
    this.triggered = true;
    this.tau = 1000 + (def.phase ?? 0) * def.period;
  }

  /** 0 = fully up, 1 = fully down. */
  get extension(): number {
    const u = (this.tau % this.def.period) / this.def.period;
    if (u < 0.45) return 0;
    if (u < 0.52) { const k = (u - 0.45) / 0.07; return k * k; }
    if (u < 0.78) return 1;
    return 1 - (u - 0.78) / 0.22;
  }

  get dangerous(): boolean {
    return this.extension > 0.55;
  }

  rect(out: Rect): Rect {
    const travel = this.def.bottom - this.def.top - 40;
    out.x = this.def.x;
    out.w = this.def.w;
    out.h = 40 + travel * this.extension;
    out.y = this.def.top;
    return out;
  }

  anchor(out: { x: number; y: number }): void {
    const r = this.rect({ x: 0, y: 0, w: 0, h: 0 });
    out.x = r.x + r.w / 2;
    out.y = r.y + r.h - 20;
  }
}

export class Elevator extends Timed {
  readonly maxTau = 1e6;

  constructor(readonly def: ElevatorDef) {
    super();
    this.triggered = true;
    this.tau = 1000 + (def.phase ?? 0) * def.period;
  }

  get y(): number {
    const u = (this.tau % this.def.period) / this.def.period;
    const k = u < 0.5 ? u * 2 : 2 - u * 2;
    const e = k * k * (3 - 2 * k);
    return this.def.yA + (this.def.yB - this.def.yA) * e;
  }

  rect(out: Rect): Rect {
    out.x = this.def.x;
    out.y = this.y;
    out.w = this.def.w;
    out.h = 14;
    return out;
  }

  anchor(out: { x: number; y: number }): void {
    out.x = this.def.x + this.def.w / 2;
    out.y = this.y;
  }
}

/** The Hush: a wall of erasure advancing from the left. */
export class Front extends Timed {
  readonly maxTau = 1e6;

  constructor(readonly def: FrontDef) {
    super();
    this.triggered = true;
  }

  get x(): number {
    return this.def.x0 + this.def.speed * Math.max(0, this.tau - this.def.delay);
  }

  anchor(out: { x: number; y: number }): void {
    out.x = this.x;
    out.y = NaN; // vertical wall: lens tests use x only
  }
}
