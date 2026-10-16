import type { Rng } from '../rng.ts';
import type { Levels, UpgradeId } from '../upgrades/data.ts';
import type { Pool } from './pool.ts';
import type { Grid } from './hash.ts';

export type EnemyKind = 'swarm' | 'spitter' | 'rammer' | 'cleaver' | 'splitlet' | 'aegis' | 'caster' | 'warden';
export type ArenaId = 'hollow' | 'foundry';

export interface Enemy {
  id: number;
  alive: boolean;
  kind: EnemyKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hp: number;
  maxHp: number;
  speed: number;
  dmg: number;
  xp: number;
  ess: number;
  t: number;
  /** behaviour state: 0 move, 1 telegraph, 2 dash/recover */
  state: number;
  timer: number;
  act: number;
  ang: number; // aim angle / dash direction
  shield: number; // aegis shield angle
  shieldDir: number;
  tx: number;
  ty: number;
  elite: boolean;
  tier: number;
  phase: number;
  flash: number;
  bladeCd: number;
  seed: number; // per-enemy wobble phase
  noEss: boolean;
  kx: number;
  ky: number;
}

export interface Bullet {
  alive: boolean;
  friendly: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  dmg: number;
  life: number;
  /** player: 0 pulse, 1 missile, 2 shard. enemy: 0 small, 1 big */
  kind: number;
  pierce: number;
  homing: boolean;
  turn: number;
  hits: number[];
}

export interface Hazard {
  alive: boolean;
  kind: 'pool' | 'lane';
  x: number;
  y: number;
  x2: number;
  y2: number;
  r: number;
  width: number;
  t: number;
  tele: number;
  life: number;
  dps: number;
  tick: number;
  hit: boolean;
}

export interface Pickup {
  alive: boolean;
  kind: 'mote' | 'shard' | 'chest';
  x: number;
  y: number;
  vx: number;
  vy: number;
  v: number;
  t: number;
  pulled: boolean;
}

export interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hp: number;
  maxHp: number;
  iframes: number;
  flash: number;
  facing: number;
  level: number;
  xp: number;
  xpNext: number;
  reserve: number;
  fieldOn: boolean;
  fieldR: number;
  fieldSpent: number;
  fieldTick: number;
  hold: boolean;
  detCd: number;
  pulseCd: number;
  homingCd: number;
  lanceCd: number;
  chainCd: number;
  orbitAngle: number;
  regenAcc: number;
  kvx: number;
  kvy: number;
}

export interface Stats {
  maxHp: number;
  speed: number;
  pickup: number;
  cdMul: number;
  dmgMul: number;
  luck: number;
  taken: number;
  regen: number;
}

export interface GameEvent {
  t:
    | 'shot'
    | 'hit'
    | 'kill'
    | 'mote'
    | 'shard'
    | 'chest'
    | 'hurt'
    | 'levelup'
    | 'fieldUp'
    | 'fieldBreak'
    | 'detonate'
    | 'absorb'
    | 'beam'
    | 'arc'
    | 'bossWarn'
    | 'bossPhase'
    | 'bossDown'
    | 'wave'
    | 'telegraph'
    | 'chain'
    | 'win'
    | 'dead'
    | 'shieldBlock'
    | 'pool'
    | 'lane';
  x: number;
  y: number;
  a?: number;
  b?: number;
  s?: string;
  pts?: number[];
}

export interface ChoiceSet {
  ids: UpgradeId[];
  chest: boolean;
}

export interface Input {
  mx: number;
  my: number;
  aimX: number;
  aimY: number;
  hasAim: boolean;
  release: boolean;
  toggleHold: boolean;
}

export interface MetaBonus {
  unlocked: string[]; // upgrade ids allowed in the pool
  hp: number;
  speed: number;
  luck: number;
  rerolls: number;
  startSiphon: boolean;
  arena: ArenaId;
}

export type RunState = 'playing' | 'levelup' | 'won' | 'dead';

export interface World {
  seed: number;
  rng: Rng;
  arena: ArenaId;
  tick: number;
  time: number;
  state: RunState;
  player: Player;
  stats: Stats;
  levels: Levels;
  meta: MetaBonus;
  enemies: Pool<Enemy>;
  bullets: Pool<Bullet>;
  hazards: Pool<Hazard>;
  pickups: Pool<Pickup>;
  grid: Grid;
  events: GameEvent[];
  nextId: number;
  // spawner
  budget: number;
  wave: number;
  packWave: number;
  bossesSpawned: number;
  bossAlive: boolean;
  laneTimer: number;
  // progression
  pendingLevels: number;
  pendingChests: number;
  choice: ChoiceSet | null;
  rerolls: number;
  picks: UpgradeId[];
  sinceDefensive: number;
  levelUps: number;
  // stats for the summary
  kills: number;
  killsBy: Record<string, number>;
  damageDealt: number;
  shardsCollected: number;
  bossesKilled: number;
  chain: number;
  chainTimer: number;
  maxChain: number;
  detonations: number;
  deathTimer: number;
  winReason: string;
  scratch: Enemy[];
  eBullets: number;
  pBullets: number;
  pendingXp: number;
}
