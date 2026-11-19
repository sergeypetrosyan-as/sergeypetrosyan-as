/**
 * Shared simulation types. The sim layer is plain TypeScript with no Three.js
 * dependency so it can run headlessly (scripts/check-arenas.ts) and could later
 * be driven by an authoritative server feeding `TankControls` per tick.
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export type Team = 'blue' | 'magenta' | 'none';
export type ModeId = 'ffa' | 'tdm' | 'cp';
export type ArenaId = 'docks' | 'void';
export type DifficultyId = 'rookie' | 'veteran' | 'elite';
export type HullId = 'hornet' | 'vanguard' | 'bastion';
export type WeaponId = 'plasma' | 'rail' | 'volt' | 'nova';
export type PickupKind = 'repair' | 'overdrive' | 'nitro';
export type AbilityId = 'dash' | 'aegis' | 'shockwave';

/** Render material keys; the arena view maps these to Three.js materials. */
export type SurfaceMat =
  | 'floor'
  | 'deck'
  | 'metal'
  | 'darkMetal'
  | 'concrete'
  | 'containerCyan'
  | 'containerMagenta'
  | 'containerSteel'
  | 'containerAmber'
  | 'glass'
  | 'barrier'
  | 'trim'
  | 'boundary'
  | 'lab'
  | 'labDark';

/** Axis-aligned solid. `walkable` tops can be driven on; `blocksTanks` sides push tanks out. */
export interface Box {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  mat: SurfaceMat;
  blocksTanks: boolean;
  blocksShots: boolean;
  walkable: boolean;
  /** Emissive edge strip colour (render only). */
  trim?: 'cyan' | 'magenta' | 'amber' | 'none';
  /** Not rendered (invisible collision helpers). */
  hidden?: boolean;
}

/** A sloped walkable surface rising from h0 to h1 along `axis` in direction `dir`. */
export interface Ramp {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  axis: 'x' | 'z';
  /** +1: height rises toward max of the axis; -1: rises toward min. */
  dir: 1 | -1;
  h0: number;
  h1: number;
  mat: SurfaceMat;
  /** A thin deck tanks can drive underneath (otherwise a solid wedge down to the ground). */
  bridge?: boolean;
}

export interface SpawnPoint {
  x: number;
  y: number;
  z: number;
  yaw: number;
}

export interface PickupSpawn {
  kind: PickupKind;
  x: number;
  y: number;
  z: number;
}

/** Render-only dressing. */
export type Decor =
  | { kind: 'sign'; x: number; y: number; z: number; yaw: number; w: number; h: number; text: string; color: 'cyan' | 'magenta' | 'amber' }
  | { kind: 'light'; x: number; y: number; z: number; color: 'cyan' | 'magenta' | 'amber'; intensity: number; range: number }
  | { kind: 'holo'; x: number; y: number; z: number; r: number; color: 'cyan' | 'magenta' }
  | { kind: 'strip'; x0: number; z0: number; x1: number; z1: number; y: number; color: 'cyan' | 'magenta' | 'amber'; w?: number }
  | { kind: 'crane'; x: number; z: number; yaw: number; h: number }
  | { kind: 'pylon'; x: number; z: number; h: number; color: 'cyan' | 'magenta' }
  | { kind: 'water'; y: number };

export interface ArenaDef {
  id: ArenaId;
  name: string;
  subtitle: string;
  /** Half extent of the playable square, in metres. */
  half: number;
  boxes: Box[];
  ramps: Ramp[];
  spawns: { blue: SpawnPoint[]; magenta: SpawnPoint[]; ffa: SpawnPoint[] };
  controlPoint: { x: number; y: number; z: number; r: number };
  pickups: PickupSpawn[];
  decor: Decor[];
  fog: { color: number; density: number };
  sky: { top: number; bottom: number };
}

/** Per-tick command for one tank: produced by player input or a bot brain (or, later, the network). */
export interface TankControls {
  throttle: number;
  steer: number;
  /** World-space aim yaw and pitch the turret should rotate toward. */
  aimYaw: number;
  aimPitch: number;
  fire: boolean;
  boost: boolean;
  ability: boolean;
  reload: boolean;
}

export function emptyControls(): TankControls {
  return { throttle: 0, steer: 0, aimYaw: 0, aimPitch: 0, fire: false, boost: false, ability: false, reload: false };
}
