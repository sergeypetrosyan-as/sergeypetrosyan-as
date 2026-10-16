import { TILE } from '../game/Config';

/**
 * Levels are authored as ASCII chunks (see levels/*.ts). Chunks are joined left to
 * right and bottom-aligned, so a chunk only lists the rows it uses.
 *
 * Terrain      #  ground      =  block       -  one-way      ^  spikes
 *              <  >  conveyor E  live floor  %  secret wall  |  switch gate
 *              ?  ! & h  prize block (volt / shield / overdrive / repair)
 *              X  boss-arena door (opens until the fight starts)
 * Platforms    M  sliding     V  lift        c  crumble      g  glitch block
 *              1  2  timed blocks (alternate)                P  crusher
 * Enemies      s  slime       d  drone →     f  drone ↕      j  hopper
 *              t  y  turret ← →              p  phantom      k  spiker
 * Hazards      L  laser gate  Z  sweeping laser              R  Q  rotor (1 / 2 arms)
 * Pickups      o  volt        *  neon shard  T  arcade token +  repair cell
 * Markers      S  start       C  checkpoint  G  exit gate    i  terminal
 *              B  spring      K  boss
 *              l  lamp        n  holo sign
 */
export const T = {
  Empty: 0, Ground: 1, Block: 2, OneWay: 3, Spike: 4, ConvL: 5, ConvR: 6,
  Electric: 7, Fake: 8, Prize: 9, Used: 10, Door: 11,
} as const;
export type T = (typeof T)[keyof typeof T];

export type Prize = 'volt' | 'shield' | 'overdrive' | 'repair';
export type Music = 'city' | 'factory' | 'glitch' | 'boss';

export interface LevelDef {
  id: string;
  world: number;
  name: string;
  /** One-line objective / story beat shown on the level card. */
  intro: string;
  /** Target time in seconds for the time portion of the rank. */
  par: number;
  /** Level height in tiles (chunks are bottom-aligned). */
  rows?: number;
  music: Music;
  /** Text for each `i` terminal, in left-to-right order. */
  terminals: string[];
  chunks: string[][];
}

export interface Spawn {
  ch: string;
  tx: number;
  ty: number;
  /** Width in tiles for run-length objects (moving platforms, crushers). */
  w: number;
  /** Order among spawns of the same character, left to right. */
  n: number;
}

const TERRAIN: Record<string, T> = {
  '#': T.Ground, '=': T.Block, '-': T.OneWay, '^': T.Spike, '<': T.ConvL, '>': T.ConvR,
  E: T.Electric, '%': T.Fake, X: T.Door,
};
const PRIZES: Record<string, Prize> = { '?': 'volt', '!': 'shield', '&': 'overdrive', h: 'repair' };
/** Objects whose horizontal runs merge into one wider object. */
const RUNS = new Set(['M', 'V', 'P']);

export const isSolidTile = (t: T): boolean =>
  t === T.Ground || t === T.Block || t === T.ConvL || t === T.ConvR || t === T.Electric || t === T.Prize || t === T.Used || t === T.Spike;

export class Level {
  readonly w: number;
  readonly h: number;
  readonly tiles: Uint8Array;
  readonly prizes = new Map<number, Prize>();
  readonly spawns: Spawn[] = [];
  /** Tiles drawn every frame (animated or state-dependent), as indices. */
  readonly dynamicTiles: number[] = [];
  /** Connected secret-wall groups: tile index → group id. */
  readonly fakeGroup = new Map<number, number>();
  readonly fakeGroups: number[][] = [];

  readonly def: LevelDef;

  constructor(def: LevelDef) {
    this.def = def;
    const rows = def.chunks.reduce((m, c) => Math.max(m, c.length), def.rows ?? 18);
    const widths = def.chunks.map((c) => c.reduce((m, r) => Math.max(m, r.length), 0));
    this.w = widths.reduce((a, b) => a + b, 0);
    this.h = rows;
    this.tiles = new Uint8Array(this.w * this.h);
    const grid: string[] = Array.from({ length: rows }, () => '');
    def.chunks.forEach((chunk, ci) => {
      const pad = rows - chunk.length;
      for (let y = 0; y < rows; y++) grid[y] += (y < pad ? '' : chunk[y - pad]).padEnd(widths[ci], '.');
    });

    const counts: Record<string, number> = {};
    for (let x = 0; x < this.w; x++) {
      for (let y = 0; y < rows; y++) {
        const ch = grid[y][x];
        if (ch === '.' || ch === ' ') continue;
        const i = y * this.w + x;
        const terrain = TERRAIN[ch];
        if (terrain !== undefined) {
          this.tiles[i] = terrain;
          if (terrain !== T.Ground && terrain !== T.Block && terrain !== T.OneWay && terrain !== T.Spike) this.dynamicTiles.push(i);
          continue;
        }
        const prize = PRIZES[ch];
        if (prize) {
          this.tiles[i] = T.Prize;
          this.prizes.set(i, prize);
          this.dynamicTiles.push(i);
          continue;
        }
        if (RUNS.has(ch) && x > 0 && grid[y][x - 1] === ch) continue;
        let w = 1;
        if (RUNS.has(ch)) while (grid[y][x + w] === ch) w++;
        counts[ch] = (counts[ch] ?? 0) + 1;
        this.spawns.push({ ch, tx: x, ty: y, w, n: counts[ch] - 1 });
      }
    }
    this.groupFakeWalls();
  }

  private groupFakeWalls(): void {
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i] !== T.Fake || this.fakeGroup.has(i)) continue;
      const id = this.fakeGroups.length;
      const group: number[] = [];
      const stack = [i];
      while (stack.length) {
        const j = stack.pop()!;
        if (this.fakeGroup.has(j) || this.tiles[j] !== T.Fake) continue;
        this.fakeGroup.set(j, id);
        group.push(j);
        const x = j % this.w;
        if (x > 0) stack.push(j - 1);
        if (x < this.w - 1) stack.push(j + 1);
        if (j >= this.w) stack.push(j - this.w);
        if (j + this.w < this.tiles.length) stack.push(j + this.w);
      }
      this.fakeGroups.push(group);
    }
  }

  get pxW(): number {
    return this.w * TILE;
  }

  get pxH(): number {
    return this.h * TILE;
  }

  at(tx: number, ty: number): T {
    if (tx < 0 || tx >= this.w) return T.Ground;
    if (ty < 0 || ty >= this.h) return T.Empty;
    return this.tiles[ty * this.w + tx] as T;
  }

  set(tx: number, ty: number, t: T): void {
    if (tx >= 0 && tx < this.w && ty >= 0 && ty < this.h) this.tiles[ty * this.w + tx] = t;
  }

  spawnsOf(ch: string): Spawn[] {
    return this.spawns.filter((s) => s.ch === ch);
  }
}
