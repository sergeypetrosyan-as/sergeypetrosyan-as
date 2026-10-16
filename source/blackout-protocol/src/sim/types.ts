// Shared data types for the pure simulation. No DOM access anywhere in sim/.

export interface Vec { x: number; y: number }
export type Difficulty = 'easy' | 'normal' | 'hard';
export type GuardState = 'patrol' | 'suspicious' | 'alert' | 'search';
export type CardColor = 'red' | 'blue' | 'yellow';

export interface Waypoint { x: number; y: number; wait: number; face?: number }
export interface GuardDef { route: Waypoint[]; fov?: number; range?: number; zone: string }
export interface CameraDef { x: number; y: number; dir: number; sweep: number; speed: number; zone: string; range?: number; fov?: number }
export interface DoorDef { id: string; locked: boolean; card?: CardColor }
export interface TerminalEffect { objective?: string; unlock?: string; finale?: boolean; needs?: string[] }
export interface TerminalDef { id: string; len: number; time?: number; label: string; effect: TerminalEffect }
export interface LaserDef { id: string; period?: { on: number; off: number; phase?: number }; echo: Vec }
export interface ItemDef { id: string; objective: string; label: string }
export interface ObjectiveDef { id: string; label: string; optional?: boolean }
export interface FinaleDef { countdown: number; alert: number }

export interface MissionDef {
  id: string;
  index: number;
  name: string;
  subtitle: string;
  briefing: string[];
  hints: string[];
  par: number;
  map: string[];
  objectives: ObjectiveDef[];
  doors: DoorDef[];
  terminals: TerminalDef[];
  lasers: LaserDef[];
  items: ItemDef[];
  guards: GuardDef[];
  cameras: CameraDef[];
  finale?: FinaleDef;
}

// ---- Tiles ---------------------------------------------------------------
export const T_FLOOR = 0;
export const T_SHADOW = 1;
export const T_WALL = 2;
export const T_LOCKER = 3;
export const T_TERMINAL = 4;
export const T_DOOR = 5;
export const T_LASER = 6;

export interface MapItem { ch: string; x: number; y: number }
export interface ParsedMap {
  w: number;
  h: number;
  kind: Uint8Array;
  ref: Int16Array; // door / terminal / laser index per tile, -1 otherwise
  start: Vec;
  exit: Vec;
  checkpoints: Vec[];
  items: MapItem[];
  lockers: Vec[];
  errors: string[];
}

// ---- Runtime state (plain data; safe for structuredClone / JSON) ------------
export interface Guard {
  id: number;
  x: number; y: number; dir: number; baseFace: number;
  state: GuardState;
  sus: number;
  route: Waypoint[]; ri: number; waitT: number;
  fov: number; range: number; zone: string;
  path: Vec[] | null; repathT: number;
  target: Vec | null;
  lastSeen: Vec | null;
  noContact: number;
  seeing: boolean;
  phase: 'look' | 'go' | 'inspect';
  phaseT: number;
  decoy: boolean;
  lostT: number;
  blockedT: number;
  lockerTarget: Vec | null;
}

export interface Camera {
  id: number;
  x: number; y: number; baseDir: number; dir: number; sweep: number; speed: number; phase: number;
  fov: number; range: number; zone: string;
  sus: number; loopT: number; loopWatch: number; trackT: number; spotCd: number; seeing: boolean;
}

export interface Door { id: string; x: number; y: number; locked: boolean; card?: CardColor; open: boolean; msgCd: number }
export interface Laser {
  id: string; cells: Vec[]; cutT: number; clock: number; active: boolean; tripCd: number;
  period?: { on: number; off: number; phase: number }; echo: Vec;
}
export interface Terminal { id: string; x: number; y: number; def: TerminalDef; done: boolean; lockT: number }
export interface ItemState { ch: string; x: number; y: number; kind: 'card' | 'energy' | 'data'; card?: CardColor; objective?: string; label: string; taken: boolean }
export interface Decoy { x: number; y: number; t: number; pingT: number }

export type PuzzlePhase = 'show' | 'input' | 'ok' | 'fail';
export interface Puzzle {
  terminal: number;
  seq: number[]; input: number[];
  phase: PuzzlePhase;
  showT: number; showTotal: number;
  timeLeft: number; limit: number;
  endT: number;
}

export interface Ring { x: number; y: number; r: number; age: number; ttl: number; kind: string }
export interface WorldEvent { k: string; x?: number; y?: number; msg?: string; v?: number }
export interface HackTarget { kind: 'camera' | 'door' | 'laser'; i: number }

export interface Player {
  x: number; y: number; dir: number;
  sneak: boolean; hidden: boolean; locker: number;
  moving: boolean;
  energy: number; hackIdle: number;
  cards: CardColor[];
  stepT: number;
  focus: HackTarget | null;
}

export interface Stats {
  spotted: number; alarms: number; retries: number; detections: number; decoyPulls: number;
  hacks: { camera: number; door: number; decoy: number; laser: number };
  shadowSneakT: number; sneakT: number; moveT: number;
  terminals: number;
}

export interface Finale { active: boolean; t: number; started: boolean }

export interface World {
  missionId: string;
  map: ParsedMap;
  def: MissionDef;
  difficulty: Difficulty;
  time: number;
  rng: number;
  player: Player;
  guards: Guard[];
  cameras: Camera[];
  doors: Door[];
  lasers: Laser[];
  terminals: Terminal[];
  items: ItemState[];
  checkpoints: { x: number; y: number; hit: boolean }[];
  cpHit: number;
  decoy: Decoy | null;
  puzzle: Puzzle | null;
  objectives: Record<string, boolean>;
  alert: number;
  alertPeak: number;
  stats: Stats;
  status: 'playing' | 'complete' | 'compromised';
  reason: string;
  finale: Finale;
  blackout: boolean;
  rings: Ring[];
  events: WorldEvent[];
}

export interface Input {
  mx: number; my: number;
  sneak: boolean;
  interact: boolean;
  hack: boolean;
  cycle: boolean;
  decoy: boolean;
  dir: number; // puzzle direction 0..3, or -1
  cancel: boolean;
}

export const NO_INPUT: Input = { mx: 0, my: 0, sneak: false, interact: false, hack: false, cycle: false, decoy: false, dir: -1, cancel: false };
