// Every gameplay number lives here so the game can be retuned without touching logic.
export const T = {
  SEG_LEN: 200,
  ROAD_W: 2000,
  CAM_H: 1000,
  FOV: 100,
  FOV_BOOST: 16,
  DRAW: 240,
  PLAYER_Z: 840,

  MAX_SPEED: 12000,
  KMH: 0.02667,
  ACCEL: 2180,
  COAST: 1330,
  BRAKE: 7500,
  REV_ACCEL: 1500,
  REV_MAX: 0.25,
  OVER_DECEL: 3000,
  OFFROAD_CAP: 0.3,
  OFFROAD_DECEL: 5500,

  BOOST_MULT: 1.3,
  BOOST_ACCEL: 2.0,
  BOOST_DRAIN: 24,
  BOOST_MIN: 2,

  STEER: 2.1,
  CENT: 0.5,
  GRIP: 7.0,
  DRIFT_GRIP: 2.2,
  DRIFT_STEER: 1.3,
  DRIFT_CENT: 0.6,
  DRIFT_SCRUB: 480,
  DRIFT_MIN_SPEED: 0.35,
  DRIFT_HOLD_SPEED: 0.3,
  DRIFT_GAIN: 22,
  CLEAN_GAIN: 2.4,
  CLEAN_AFTER_HIT: 2,
  WALL_PENALTY: 6,
  BUMP_PENALTY: 3,
  RESERVE_START: 30,

  OFFROAD_X: 1.0,
  WALL_X: 1.34,
  WALL_SCRAPE_X: 1.24,
  WALL_SPEED_KEEP: 0.62,
  WALL_COOLDOWN: 0.35,
  SCRAPE_DECEL: 2400,

  SPINE_HALF: 0.22,
  SPINE_RAIL: 0.26,
  SPINE_OUTER: 0.3,
  SPINE_INNER_CLAMP: 0.2,
  SPINE_SPEED_MULT: 1.14,
  SPINE_ADVANCE: 1.35,
  SPINE_DRAIN: 5,
  SPINE_CRASH_KEEP: 0.3,
  SPINE_CRASH_X: 0.42,
  SPINE_GATE_COOLDOWN: 0.5,

  LAPS: 3,
  CHECKPOINTS: 4,
  COUNTDOWN: 3.2,
  MAX_DT: 0.05,

  CAR_DS: 260,
  CAR_DX: 0.3,
  CAR_WORLD_W: 420,
} as const;

export interface Difficulty {
  id: string;
  name: string;
  blurb: string;
  ai: number;
  grip: number;
  regen: number;
  threshold: number;
}

export const DIFFICULTIES: Difficulty[] = [
  { id: 'cruise', name: 'CRUISE', blurb: 'Forgiving grip, fast reserve, gentle rivals.', ai: 0.84, grip: 1.15, regen: 1.25, threshold: 35 },
  { id: 'velocity', name: 'VELOCITY', blurb: 'The intended race. Rivals push hard.', ai: 0.93, grip: 1.0, regen: 1.0, threshold: 40 },
  { id: 'redline', name: 'REDLINE', blurb: 'Slippery grip, slow reserve, rivals at full speed.', ai: 1.0, grip: 0.88, regen: 0.8, threshold: 45 },
];

export const RIVALS = [
  { name: 'ROOK', color: 0, skill: 1.0, lane: -0.5, weaveAmp: 0.14, weaveHz: 0.31, start: { s: 400, x: -0.5 }, early: 1.03, late: 0.98 },
  { name: 'SABLE', color: 1, skill: 0.985, lane: 0.55, weaveAmp: 0.07, weaveHz: 0.23, start: { s: 400, x: 0.5 }, early: 1.0, late: 1.0 },
  { name: 'CINDER', color: 2, skill: 0.97, lane: -0.15, weaveAmp: 0.1, weaveHz: 0.27, start: { s: 0, x: -0.5 }, early: 0.97, late: 1.04 },
] as const;
