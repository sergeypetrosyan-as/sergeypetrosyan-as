// Wave schedule and spawn budget. Pure data + a spawner that obeys the live-entity cap.
import { chance, pickWeighted, rand } from '../rng.ts';
import { emit, waveOf } from './entities.ts';
import { liveCap, spawnEnemy, spawnPoint } from './enemies.ts';
import type { EnemyKind, World } from './types.ts';

export const SPAWN_KINDS: EnemyKind[] = ['swarm', 'spitter', 'rammer', 'cleaver', 'aegis', 'caster'];
export const ENEMY_COST: Record<string, number> = { swarm: 1, spitter: 3, rammer: 4, cleaver: 4, aegis: 6, caster: 6 };
/** First wave in which each kind may spawn. */
export const UNLOCK_WAVE: Record<string, number> = { swarm: 1, spitter: 2, rammer: 3, cleaver: 4, aegis: 6, caster: 8 };
export const BOSS_TIMES = [300, 600, 900, 1140];

/** Spawn points per second at a given wave. */
export function budgetRate(wave: number): number {
  return 2.4 + 0.8 * (wave - 1);
}

// swarm / spitter / rammer / cleaver / aegis / caster
const W8 = [7, 3, 3, 3, 3, 2];
const W14 = [5, 4, 4, 4, 4, 3];
const TABLE: number[][] = [
  [10, 0, 0, 0, 0, 0],
  [10, 2, 0, 0, 0, 0],
  [10, 3, 2, 0, 0, 0],
  [9, 3, 3, 2, 0, 0],
  [9, 3, 3, 3, 0, 0],
  [8, 3, 3, 3, 2, 0],
  [8, 3, 3, 3, 3, 0],
  W8,
];

export function spawnWeights(wave: number): number[] {
  if (wave <= 8) return TABLE[wave - 1];
  if (wave >= 14) return W14;
  const f = (wave - 8) / 6;
  return W8.map((v, i) => v + (W14[i] - v) * f);
}

export interface WaveRow {
  wave: number;
  time: number;
  budget: number;
  weights: number[];
}

export function waveTable(): WaveRow[] {
  const rows: WaveRow[] = [];
  for (let wv = 1; wv <= 20; wv++) rows.push({ wave: wv, time: (wv - 1) * 60, budget: budgetRate(wv), weights: spawnWeights(wv) });
  return rows;
}

function bossHpBarKind(): EnemyKind {
  return 'warden';
}

export function spawnBoss(w: World): void {
  const idx = w.bossesSpawned;
  const tier = idx + 1;
  const pt = spawnPoint(w, 380, 440);
  const b = spawnEnemy(w, bossHpBarKind(), pt.x, pt.y, false, tier);
  b.timer = 2.4;
  w.bossesSpawned++;
  w.bossAlive = true;
  emit(w, { t: 'bossWarn', x: b.x, y: b.y, a: tier, s: tier === 4 ? 'FINAL WARDEN' : 'CORE WARDEN' });
}

function spawnPack(w: World, wave: number): void {
  const base = rand(w.rng) * Math.PI * 2;
  const n = 5 + wave;
  for (let i = 0; i < n; i++) {
    if (w.enemies.count >= liveCap(w)) break;
    const a = base + ((i / n) - 0.5) * (Math.PI / 2);
    const pt = spawnPoint(w, 580, 640, a);
    spawnEnemy(w, 'swarm', pt.x, pt.y);
  }
}

export function updateSpawner(w: World, dt: number): void {
  const wave = waveOf(w.time);
  w.wave = wave;
  if (wave > w.packWave) {
    w.packWave = wave;
    emit(w, { t: 'wave', x: 0, y: 0, a: wave });
    spawnPack(w, wave);
  }
  if (w.bossesSpawned < BOSS_TIMES.length && w.time >= BOSS_TIMES[w.bossesSpawned]) spawnBoss(w);

  w.budget = Math.min(30, w.budget + budgetRate(wave) * dt * (w.bossAlive ? 0.5 : 1));
  const weights = spawnWeights(wave);
  const cap = liveCap(w);
  for (let n = 0; n < 6; n++) {
    if (w.enemies.count >= cap) {
      w.budget = Math.min(w.budget, 12);
      break;
    }
    const kind = pickWeighted(w.rng, SPAWN_KINDS, (k) => {
      const i = SPAWN_KINDS.indexOf(k);
      return ENEMY_COST[k] <= w.budget && wave >= UNLOCK_WAVE[k] ? weights[i] : 0;
    });
    if (!kind) break;
    const pt = spawnPoint(w);
    const elite = wave >= 5 && chance(w.rng, 0.03 + 0.005 * (wave - 5));
    spawnEnemy(w, kind, pt.x, pt.y, elite);
    w.budget -= ENEMY_COST[kind] * (elite ? 2 : 1);
  }
}
