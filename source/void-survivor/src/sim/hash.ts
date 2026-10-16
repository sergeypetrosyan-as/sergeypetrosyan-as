import type { Enemy } from './types.ts';

// Uniform spatial hash for enemies. Cell size 96, covers a 3264 unit square centred on the origin.
const CELL = 96;
const OFF = 1632;
const N = 34;

export class Grid {
  cells: Enemy[][] = [];
  private used: number[] = [];
  constructor() {
    for (let i = 0; i < N * N; i++) this.cells.push([]);
  }

  private idx(v: number): number {
    const c = Math.floor((v + OFF) / CELL);
    return c < 0 ? 0 : c >= N ? N - 1 : c;
  }

  rebuild(enemies: Enemy[]): void {
    for (const u of this.used) this.cells[u].length = 0;
    this.used.length = 0;
    for (const e of enemies) {
      if (!e.alive) continue;
      const i = this.idx(e.y) * N + this.idx(e.x);
      const c = this.cells[i];
      if (c.length === 0) this.used.push(i);
      c.push(e);
    }
  }

  /** Fills `out` with enemies whose cell lies within r + pad of (x, y). Callers do the exact test. */
  query(x: number, y: number, r: number, out: Enemy[]): Enemy[] {
    out.length = 0;
    const pad = r + 52;
    const x0 = this.idx(x - pad);
    const x1 = this.idx(x + pad);
    const y0 = this.idx(y - pad);
    const y1 = this.idx(y + pad);
    for (let cy = y0; cy <= y1; cy++) {
      for (let cx = x0; cx <= x1; cx++) {
        const c = this.cells[cy * N + cx];
        for (let k = 0; k < c.length; k++) out.push(c[k]);
      }
    }
    return out;
  }
}
