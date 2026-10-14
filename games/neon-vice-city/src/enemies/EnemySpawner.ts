import * as THREE from 'three';
import { MISSION, PALETTE } from '../game/GameConfig';
import type { CollisionWorld, RayHit } from '../world/CollisionWorld';
import { Enemy, type EnemyKind } from './Enemy';

export interface WaveSpec {
  total: number;
  maxAlive: number;
  gunnerRatio: number;
  healthScale: number;
  dmgScale: number;
  speedScale: number;
  interval: number;
}

export function waveSpec(n: number): WaveSpec {
  return {
    total: 5 + n * 3,
    maxAlive: Math.min(10, 3 + n),
    gunnerRatio: Math.min(0.6, 0.2 + n * 0.07),
    healthScale: 1 + (n - 1) * 0.12,
    dmgScale: 1 + (n - 1) * 0.1,
    speedScale: 1 + (n - 1) * 0.035,
    interval: Math.max(0.6, 1.6 - n * 0.15),
  };
}

interface PendingSpawn {
  kind: EnemyKind;
  x: number;
  z: number;
  delay: number;
}

export interface SpawnerEvents {
  onTelegraph(x: number, z: number, kind: EnemyKind): void;
  onSpawn(enemy: Enemy): void;
}

const _hit: RayHit = { dist: 0, nx: 0, ny: 0, nz: 0 };
const _c = { x: 0, z: 0 };

/**
 * Wave director: pools enemies by archetype, picks spawn cells out of the
 * player's sight at a fair distance, telegraphs each drop-in with a light beam,
 * and keeps the shared navigation flow field fresh.
 */
export class EnemySpawner {
  readonly group = new THREE.Group();
  readonly pool: Enemy[] = [];
  wave = 0;
  spec: WaveSpec = waveSpec(1);
  spawned = 0;
  killed = 0;
  private pending: PendingSpawn[] = [];
  private spawnTimer = 0;
  private fieldTimer = 0;

  constructor(private readonly world: CollisionWorld) {
    for (let i = 0; i < 12; i++) this.add('enforcer');
    for (let i = 0; i < 10; i++) this.add('gunner');
  }

  private add(kind: EnemyKind): void {
    const e = new Enemy(kind);
    this.pool.push(e);
    this.group.add(e.character.root);
  }

  startWave(n: number): void {
    this.wave = n;
    this.spec = waveSpec(n);
    this.spawned = 0;
    this.killed = 0;
    this.pending = [];
    this.spawnTimer = 0.5;
  }

  get remaining(): number {
    return this.spec.total - this.killed;
  }

  get aliveCount(): number {
    let n = 0;
    for (const e of this.pool) if (e.alive) n++;
    return n;
  }

  get waveCleared(): boolean {
    return this.wave > 0 && this.killed >= this.spec.total;
  }

  get isFinalWave(): boolean {
    return this.wave >= MISSION.totalWaves;
  }

  /** Flow field refresh + spawn scheduling. Call once per sim step while a wave is active. */
  update(dt: number, player: THREE.Vector3, ev: SpawnerEvents): void {
    this.fieldTimer -= dt;
    if (this.fieldTimer <= 0) {
      this.fieldTimer = 0.35;
      this.world.nav.computeField(player.x, player.z);
    }
    if (this.wave === 0) return;

    for (let i = this.pending.length - 1; i >= 0; i--) {
      const p = this.pending[i];
      p.delay -= dt;
      if (p.delay > 0) continue;
      this.pending.splice(i, 1);
      const e = this.pool.find((x) => !x.active && x.def.kind === p.kind) ?? this.pool.find((x) => !x.active);
      if (!e) { this.spawned--; continue; }
      e.spawn(p.x, p.z, this.spec.healthScale, this.spec.dmgScale, this.spec.speedScale);
      ev.onSpawn(e);
    }

    const alive = this.aliveCount + this.pending.length;
    if (this.spawned >= this.spec.total || alive >= this.spec.maxAlive) return;
    this.spawnTimer -= dt;
    if (this.spawnTimer > 0) return;
    this.spawnTimer = this.spec.interval * (0.7 + Math.random() * 0.6);
    const kind: EnemyKind = Math.random() < this.spec.gunnerRatio ? 'gunner' : 'enforcer';
    if (!this.pickSpawn(player)) return;
    this.pending.push({ kind, x: _c.x, z: _c.z, delay: 0.85 });
    this.spawned++;
    ev.onTelegraph(_c.x, _c.z, kind);
  }

  private pickSpawn(player: THREE.Vector3): boolean {
    const cells = this.world.nav.openCells;
    let fallback = -1;
    for (let attempt = 0; attempt < 40; attempt++) {
      const cell = cells[Math.floor(Math.random() * cells.length)];
      this.world.nav.cellCenter(cell, _c);
      const d = Math.hypot(_c.x - player.x, _c.z - player.z);
      if (d < 22 || d > 58) continue;
      if (this.world.nav.dist[cell] === 0xffff) continue; // unreachable from the player
      fallback = cell;
      // Prefer drops the player can't currently see — flanking, not popping in.
      if (attempt < 25 && this.world.lineOfSight(_c.x, 1.5, _c.z, player.x, player.y + 1.5, player.z, _hit)) continue;
      return true;
    }
    if (fallback >= 0) {
      this.world.nav.cellCenter(fallback, _c);
      return true;
    }
    return false;
  }

  /** Counts a death toward the wave (called by the game when an enemy dies). */
  registerKill(): void {
    this.killed++;
  }

  reset(): void {
    this.wave = 0;
    this.spawned = 0;
    this.killed = 0;
    this.pending = [];
    for (const e of this.pool) {
      e.alive = false;
      e.active = false;
      e.character.root.visible = false;
    }
  }

  static telegraphColor(kind: EnemyKind): number {
    return kind === 'gunner' ? PALETTE.cyan : PALETTE.orange;
  }
}
