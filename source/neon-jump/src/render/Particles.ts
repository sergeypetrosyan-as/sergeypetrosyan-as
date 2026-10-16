/** Fixed-size particle pool: no allocation after construction, oldest particles are reused. */
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
  gravity: number;
  /** Additive glow sprite instead of a square pixel. */
  glow: boolean;
}

export interface FloatText {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

export class Particles {
  readonly list: Particle[];
  private next = 0;
  readonly texts: FloatText[] = [];
  /** 0..1 — reduced motion lowers counts. */
  density = 1;

  constructor(size = 700) {
    this.list = Array.from({ length: size }, () => ({ x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 1, color: '#fff', gravity: 0, glow: false }));
  }

  emit(x: number, y: number, vx: number, vy: number, life: number, color: string, size = 1, gravity = 0, glow = false): void {
    const p = this.list[this.next];
    this.next = (this.next + 1) % this.list.length;
    p.x = x;
    p.y = y;
    p.vx = vx;
    p.vy = vy;
    p.life = p.max = life;
    p.color = color;
    p.size = size;
    p.gravity = gravity;
    p.glow = glow;
  }

  burst(x: number, y: number, n: number, color: string, speed = 90, life = 0.6, gravity = 300, glow = false): void {
    const count = Math.max(1, Math.round(n * this.density));
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = speed * (0.35 + Math.random() * 0.65);
      this.emit(x, y, Math.cos(a) * s, Math.sin(a) * s - speed * 0.3, life * (0.6 + Math.random() * 0.5), color, Math.random() < 0.3 ? 2 : 1, gravity, glow);
    }
  }

  text(x: number, y: number, text: string, color: string): void {
    if (this.texts.length > 12) this.texts.shift();
    this.texts.push({ x, y, text, color, life: 1 });
  }

  update(dt: number): void {
    for (const p of this.list) {
      if (p.life <= 0) continue;
      p.life -= dt;
      p.vy += p.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
    for (let i = this.texts.length - 1; i >= 0; i--) {
      const t = this.texts[i];
      t.life -= dt;
      t.y -= 22 * dt;
      if (t.life <= 0) this.texts.splice(i, 1);
    }
  }

  clear(): void {
    for (const p of this.list) p.life = 0;
    this.texts.length = 0;
  }
}
