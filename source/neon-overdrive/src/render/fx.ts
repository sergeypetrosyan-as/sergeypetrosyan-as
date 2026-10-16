interface P {
  on: boolean;
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; color: string; kind: 0 | 1 | 2; // 0 spark, 1 smoke, 2 streak
}

const CAP = 160;

/** Pooled screen-space particles. */
export class Fx {
  private pool: P[] = Array.from({ length: CAP }, () => ({ on: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 2, color: '#fff', kind: 0 as const }));
  private cursor = 0;

  private take(): P {
    for (let i = 0; i < CAP; i++) {
      const p = this.pool[(this.cursor + i) % CAP];
      if (!p.on) {
        this.cursor = (this.cursor + i + 1) % CAP;
        return p;
      }
    }
    const p = this.pool[this.cursor];
    this.cursor = (this.cursor + 1) % CAP;
    return p;
  }

  sparks(x: number, y: number, dir: number, count: number, unit: number): void {
    for (let i = 0; i < count; i++) {
      const p = this.take();
      p.on = true;
      p.x = x;
      p.y = y;
      p.vx = (dir * (0.4 + Math.random() * 1.2) + (Math.random() - 0.5) * 0.9) * unit * 0.9;
      p.vy = (-0.3 - Math.random() * 1.0) * unit * 0.8;
      p.max = p.life = 0.25 + Math.random() * 0.4;
      p.size = 1.5 + Math.random() * 2.2;
      p.color = Math.random() < 0.5 ? '#ffd36b' : '#fff4c8';
      p.kind = 0;
    }
  }

  smoke(x: number, y: number, unit: number, color: string): void {
    const p = this.take();
    p.on = true;
    p.x = x + (Math.random() - 0.5) * unit * 0.1;
    p.y = y;
    p.vx = (Math.random() - 0.5) * unit * 0.25;
    p.vy = -unit * (0.1 + Math.random() * 0.15);
    p.max = p.life = 0.5 + Math.random() * 0.4;
    p.size = unit * (0.03 + Math.random() * 0.03);
    p.color = color;
    p.kind = 1;
  }

  streak(x: number, y: number, unit: number, color: string): void {
    const p = this.take();
    p.on = true;
    p.x = x;
    p.y = y;
    p.vx = (Math.random() - 0.5) * unit * 0.3;
    p.vy = unit * (0.9 + Math.random() * 0.8);
    p.max = p.life = 0.22 + Math.random() * 0.15;
    p.size = unit * 0.012;
    p.color = color;
    p.kind = 2;
  }

  update(dt: number): void {
    for (const p of this.pool) {
      if (!p.on) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.on = false;
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.kind === 0) p.vy += 900 * dt;
    }
  }

  clear(): void {
    for (const p of this.pool) p.on = false;
  }

  draw(g: CanvasRenderingContext2D): void {
    for (const p of this.pool) {
      if (!p.on) continue;
      const a = p.life / p.max;
      g.globalAlpha = a;
      g.fillStyle = p.color;
      if (p.kind === 0) g.fillRect(p.x, p.y, p.size, p.size);
      else if (p.kind === 1) {
        g.beginPath();
        g.arc(p.x, p.y, p.size * (2 - a), 0, 6.283);
        g.fill();
      } else g.fillRect(p.x, p.y, p.size, p.size * 14 * a);
    }
    g.globalAlpha = 1;
  }
}
