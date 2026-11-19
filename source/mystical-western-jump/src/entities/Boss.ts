import type { World } from '../world/World';

export type BossState =
  | 'wait' | 'intro' | 'hover' | 'volley' | 'aim' | 'shake' | 'fall' | 'dazed' | 'recover' | 'rain' | 'summon' | 'dying' | 'dead';

type Attack = 'volley' | 'slam' | 'rain' | 'summon';

const PATTERNS: Attack[][] = [
  ['volley', 'slam'],
  ['volley', 'summon', 'slam'],
  ['rain', 'slam', 'volley', 'slam'],
];

/**
 * The Static Sovereign: a crowned broadcast head. It hovers, sprays static, calls drones,
 * rains bolts, and slams. A slam leaves its core exposed on top — the only way to hurt it.
 */
export class Boss {
  x: number;
  y: number;
  readonly w = 44;
  readonly h = 36;
  readonly maxHp = 6;
  hp = 6;
  state: BossState = 'wait';
  t = 0;
  /** Hit flash, 1 → 0. */
  flash = 0;
  private step = 0;
  private hoverY: number;
  /** Rain columns, shown as warnings while charging. */
  readonly rainX: number[] = [];
  /** 0..1 attack wind-up, used by the renderer. */
  charge = 0;
  readonly spawnX: number;

  constructor(cx: number, cy: number, readonly left: number, readonly right: number, readonly floorY: number, readonly ceilY: number) {
    this.spawnX = cx - this.w / 2;
    this.x = this.spawnX;
    this.hoverY = cy - this.h / 2;
    this.y = this.ceilY - this.h - 30;
  }

  get phase(): 0 | 1 | 2 {
    return this.hp > 4 ? 0 : this.hp > 2 ? 1 : 2;
  }

  get cx(): number {
    return this.x + this.w / 2;
  }

  /** Touching the body hurts while it is active. */
  get dangerous(): boolean {
    return this.state !== 'wait' && this.state !== 'intro' && this.state !== 'dazed' && this.state !== 'dying' && this.state !== 'dead';
  }

  get vulnerable(): boolean {
    return this.state === 'dazed';
  }

  reset(): void {
    this.hp = this.maxHp;
    this.state = 'wait';
    this.x = this.spawnX;
    this.y = this.ceilY - this.h - 30;
    this.step = 0;
    this.flash = 0;
    this.charge = 0;
    this.rainX.length = 0;
  }

  start(): void {
    this.go('intro');
  }

  private go(s: BossState): void {
    this.state = s;
    this.t = 0;
    this.charge = 0;
  }

  update(dt: number, world: World): void {
    this.t += dt;
    this.flash = Math.max(0, this.flash - dt * 3);
    const p = world.player;
    const ph = this.phase;
    const clampX = () => (this.x = Math.max(this.left + 4, Math.min(this.right - this.w - 4, this.x)));
    switch (this.state) {
      case 'wait':
        break;
      case 'intro':
        this.y += (this.hoverY - this.y) * Math.min(1, dt * 2.2);
        if (this.t > 2.2) this.go('hover');
        break;
      case 'hover': {
        const speed = [55, 75, 95][ph];
        this.x += Math.sign(p.cx - this.cx) * Math.min(speed * dt, Math.abs(p.cx - this.cx));
        clampX();
        this.y = this.hoverY + Math.sin(world.time * 2.4) * 5;
        if (this.t > [1.7, 1.35, 1.05][ph]) {
          const attack = PATTERNS[ph][this.step++ % PATTERNS[ph].length];
          this.go(attack === 'slam' ? 'aim' : attack);
        }
        break;
      }
      case 'volley': {
        this.charge = Math.min(1, this.t / 0.85);
        if (this.t >= 0.85) {
          const n = ph === 0 ? 3 : 5;
          const base = Math.atan2(p.y + p.h / 2 - (this.y + this.h), p.cx - this.cx);
          for (let i = 0; i < n; i++) {
            const a = base + (i - (n - 1) / 2) * 0.32;
            world.fireBolt(this.cx - 3, this.y + this.h - 6, Math.cos(a) * 105, Math.sin(a) * 105, 'orb');
          }
          world.emit('boss-shot');
          this.go('hover');
        }
        break;
      }
      case 'aim': {
        const dx = p.cx - this.cx;
        this.x += Math.sign(dx) * Math.min(200 * dt, Math.abs(dx));
        clampX();
        this.y += (this.hoverY - 8 - this.y) * Math.min(1, dt * 4);
        if (Math.abs(dx) < 4 || this.t > 0.9) this.go('shake');
        break;
      }
      case 'shake':
        this.charge = Math.min(1, this.t / 0.55);
        if (this.t > 0.55) this.go('fall');
        break;
      case 'fall':
        this.y += Math.min(780, 120 + this.t * 2400) * dt;
        if (this.y + this.h >= this.floorY) {
          this.y = this.floorY - this.h;
          world.bossSlam(this);
          this.go('dazed');
        }
        break;
      case 'dazed':
        if (this.t > [2.3, 1.9, 1.6][ph]) this.go('recover');
        break;
      case 'recover':
        this.y += (this.hoverY - this.y) * Math.min(1, dt * 3);
        if (this.t > 0.9) this.go('hover');
        break;
      case 'rain':
        if (this.t < dt * 1.5) {
          this.rainX.length = 0;
          const span = this.right - this.left - 48;
          const offset = Math.random() * 40;
          for (let i = 0; i < 6; i++) this.rainX.push(this.left + 24 + ((offset + (i * span) / 6) % span));
          this.rainX[0] = Math.max(this.left + 12, Math.min(this.right - 12, p.cx));
        }
        this.charge = Math.min(1, this.t / 0.95);
        if (this.t >= 0.95) {
          for (const x of this.rainX) world.fireBolt(x - 3, this.ceilY + 2, 0, 250, 'rain');
          this.rainX.length = 0;
          world.emit('boss-shot');
          this.go('hover');
        }
        break;
      case 'summon':
        this.charge = Math.min(1, this.t / 0.8);
        if (this.t >= 0.8) {
          world.summonDrones();
          this.go('hover');
        }
        break;
      case 'dying':
        this.x += Math.sin(this.t * 60) * 0.6;
        if (this.t > 2.6) this.go('dead');
        break;
      case 'dead':
        break;
    }
  }

  /** A stomp on the exposed core. */
  hit(): void {
    const phase = this.phase;
    this.hp -= 1;
    // Each phase opens with its own signature attack.
    if (this.phase !== phase) this.step = 0;
    this.flash = 1;
    this.go(this.hp <= 0 ? 'dying' : 'recover');
  }
}
