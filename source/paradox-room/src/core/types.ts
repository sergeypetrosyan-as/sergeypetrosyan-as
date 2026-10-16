// Pure data types shared by the rules, the solver, the renderer and the UI. No DOM here.

export type FoldKind = 'rollL' | 'rollR' | 'pitchA' | 'pitchB';
export type Dir = 'right' | 'left' | 'away' | 'toward';
export type Vec = readonly [number, number, number];
export type ObjKind = 'crystal' | 'shard' | 'exit' | 'portal' | 'lever' | 'switch' | 'plate' | 'door';

export interface GObj {
  id: number;
  kind: ObjKind;
  room: number;
  x: number;
  y: number;
  z: number;
  ch: string;
  fold?: FoldKind; // lever
  bit?: number; // collectible bit (crystal/shard) or controller bit (switch/plate); doors: controller bit that opens them
  pair?: number; // portal partner object id
  secret?: boolean; // faint portal to a hidden room
}

export interface Room {
  name: string;
  w: number;
  h: number;
  d: number;
  solid: Uint8Array;
  free: FoldKind[];
}

export interface Level {
  id: string;
  chapter: number;
  index: number; // 0-based global index
  name: string;
  objective: string;
  intro: string;
  hints: string[];
  rooms: Room[];
  objs: GObj[];
  cellObjs: Map<number, number[]>[]; // per room: cell index -> object ids
  start: { room: number; x: number; y: number; z: number };
  crystalMask: number;
  shardMask: number;
  nCrystals: number;
  nShards: number;
}

export interface GState {
  room: number;
  x: number;
  y: number;
  z: number;
  ori: number[]; // orientation index per room (0..23)
  got: number; // collected bitmask
  ctl: number; // controller (switch/plate) bitmask
}

export type Action = { t: 'move'; dir: Dir } | { t: 'fold'; kind: FoldKind } | { t: 'use'; obj: number };

export type GEvent =
  | { k: 'step' }
  | { k: 'fold'; kind: FoldKind; fell: boolean }
  | { k: 'collect'; obj: number }
  | { k: 'toggle'; obj: number; on: boolean }
  | { k: 'latch'; obj: number }
  | { k: 'door'; open: boolean }
  | { k: 'portal'; from: number; to: number }
  | { k: 'sealed'; remaining: number }
  | { k: 'complete' };

export type ActionResult = { ok: true; state: GState; events: GEvent[] } | { ok: false; reason: string };

export interface LevelDef {
  id: string;
  chapter: number;
  name: string;
  objective: string;
  intro: string;
  hints: string[];
  links?: Record<string, string>;
  secret?: string[]; // portal letters that are secret portals
  rooms: { name: string; free: FoldKind[]; layers: string[][] }[];
}
