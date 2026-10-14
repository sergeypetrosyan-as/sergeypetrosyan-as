export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type TileTrigger = 'none' | 'step' | 'front' | 'timer' | 'fallen';

export interface TileDef {
  x: number;
  y: number;
  w: number;
  h?: number;
  trigger: TileTrigger;
  /** Seconds between trigger and the start of the shake. */
  wait?: number;
  /** For 'timer': level time at which the clock starts. */
  delay?: number;
}

export interface SignDef {
  text: string;
  /** Hanging centre and size. */
  hx: number;
  hy: number;
  w: number;
  h: number;
  /** Resting centre after the fall; `upright` signs land on their edge as a wall. */
  rx: number;
  ry: number;
  upright?: boolean;
  /** Starts its clock when Ilo passes `nearX`, or at level time `delay`. */
  nearX?: number;
  delay?: number;
  /** Seconds it swings before letting go. */
  hold?: number;
}

export interface CrusherDef {
  x: number;
  w: number;
  top: number;
  bottom: number;
  period: number;
  phase?: number;
}

export interface ElevatorDef {
  x: number;
  w: number;
  yA: number;
  yB: number;
  period: number;
  phase?: number;
}

export interface FrontDef {
  x0: number;
  speed: number;
  delay: number;
}

export interface Billboard {
  x: number;
  y: number;
  text: string;
  size?: number;
  color?: 'amber' | 'coral' | 'ice';
}

export interface Hint {
  /** Shown once Ilo passes this x (or immediately when 0). */
  atX: number;
  text: string;
  /** Hide once she passes this x. */
  untilX?: number;
}

export interface LevelDef {
  id: string;
  name: string;
  /** One line from Ilo, shown on the district card. */
  line: string;
  length: number;
  start: number;
  goal: number;
  /** Spare seconds of lens time for this district. */
  budget: number;
  tiles: TileDef[];
  signs?: SignDef[];
  crushers?: CrusherDef[];
  elevators?: ElevatorDef[];
  front?: FrontDef;
  sparks?: Array<[number, number]>;
  billboards?: Billboard[];
  hints?: Hint[];
  /** Seed for the procedural skyline. */
  seed: number;
  final?: boolean;
}

export interface Lens {
  x: number;
  y: number;
  r: number;
  active: boolean;
}
