export interface Sprite {
  kind: 'tower' | 'sign' | 'pylon';
  x: number; // road half-widths from centre
  tex: number;
}

export interface Segment {
  i: number;
  curve: number;
  y1: number;
  y2: number;
  spine: boolean;
  gate: 0 | 1 | 2; // 1 = Spine entrance, 2 = Spine exit
  cp: number; // 0 = none, 1..4 = checkpoint index (4 = finish line)
  band: number;
  sprites: Sprite[];
}

export interface Palette {
  skyTop: string; skyMid: string; skyBottom: string;
  sun1: string; sun2: string;
  ground0: string; ground1: string;
  road0: string; road1: string;
  rumble0: string; rumble1: string;
  lane: string; edge: string;
  accentA: string; accentB: string;
  fog: string;
  tints: string[];
  signs: string[];
  skyline: string;
}

export interface SpineDef { at: number; len: number }

export interface TrackDef {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  rank: number;
  aiBonus: number;
  hz: number; // music root
  sections: number[][];
  spines: SpineDef[];
  palette: Palette;
  seed: number;
  /** 3D renderer only: covered stretches as lap fractions (placed on straight, flat road). */
  tunnels?: { at: number; len: number }[];
  /** 3D renderer only: bridges crossing over the road, as lap fractions. */
  overpasses?: number[];
}

export interface Track {
  def: TrackDef;
  segs: Segment[];
  length: number; // world units per lap
  spineStarts: number[]; // segment indexes of entrance gates
  spineEnds: number[];
}

export interface Car {
  s: number;
  x: number;
  vx: number;
  speed: number;
  reserve: number;
  boosting: boolean;
  drifting: boolean;
  spineMode: boolean;
  wallCd: number;
  gateCd: number;
  cleanT: number;
  slip: number;
}

export interface InputState {
  steer: number;
  throttle: boolean;
  brake: boolean;
  drift: boolean;
  boost: boolean;
}

export type RaceEventType =
  | 'checkpoint' | 'lap' | 'finish' | 'wall' | 'scrape' | 'rail' | 'bump'
  | 'gateOpen' | 'gateSealed' | 'boostStart' | 'countdown' | 'go' | 'position';

export interface RaceEvent { type: RaceEventType; value: number; text?: string }

export interface Rival {
  name: string;
  color: number;
  skill: number;
  lane: number;
  weaveAmp: number;
  weaveHz: number;
  phase: number;
  s: number;
  x: number;
  speed: number;
  finish: number | null;
  early: number;
  late: number;
}

export interface Settings {
  volume: number;
  muted: boolean;
  music: boolean;
  shake: boolean;
  reducedFlash: boolean;
  highContrast: boolean;
  speedLines: boolean;
  tutorialSeen: boolean;
  lastTrack: number;
  lastDiff: number;
  quality: Quality;
}

export type Quality = 'auto' | 'low' | 'medium' | 'high';

export interface RecordEntry {
  bestTotal: number | null;
  bestLap: number | null;
  bestPos: number | null;
  bestSplits: number[];
  races: number;
}

export interface SaveFile {
  v: 1;
  settings: Settings;
  records: Record<string, RecordEntry>;
}
