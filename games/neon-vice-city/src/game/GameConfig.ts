export type QualityLevel = 'low' | 'medium' | 'high';

export interface QualityPreset {
  /** Upper bound for renderer pixel ratio (also capped by devicePixelRatio). */
  maxPixelRatio: number;
  bloom: boolean;
  shadows: boolean;
  grain: boolean;
  maxParticles: number;
  trafficCars: number;
  antialias: boolean;
}

export const QUALITY_PRESETS: Record<QualityLevel, QualityPreset> = {
  low: { maxPixelRatio: 0.75, bloom: false, shadows: false, grain: false, maxParticles: 160, trafficCars: 3, antialias: false },
  medium: { maxPixelRatio: 1, bloom: true, shadows: false, grain: true, maxParticles: 320, trafficCars: 5, antialias: false },
  high: { maxPixelRatio: 1.5, bloom: true, shadows: true, grain: true, maxParticles: 520, trafficCars: 7, antialias: false },
};

/** Fixed simulation rate; frames are split into equal sub-steps no longer than this. */
export const SIM_STEP = 1 / 60;
export const MAX_FRAME_DT = 0.1;

export const PLAYER = {
  radius: 0.42,
  height: 1.8,
  walkSpeed: 4.6,
  runSpeed: 7.8,
  aimSpeed: 3.2,
  accel: 38,
  airControl: 0.35,
  jumpVelocity: 7.2,
  gravity: 22,
  maxHealth: 100,
  maxArmor: 50,
  stepHeight: 0.45,
};

export const VEHICLE = {
  maxSpeed: 38,
  reverseSpeed: 11,
  accel: 17,
  brake: 32,
  drag: 0.32,
  rolling: 2.2,
  maxSteer: 0.56,
  wheelBase: 2.6,
  grip: 9,
  handbrakeGrip: 1.6,
  enterDistance: 3.2,
};

export const MISSION = {
  name: 'MISSION 01 — NIGHTFALL',
  totalWaves: 6,
  comboWindow: 3.2,
  maxCombo: 6,
};

export const WORLD = {
  half: 110,
  oceanX: 116,
  roadWidth: 14,
  sidewalk: 3,
};

export const PALETTE = {
  magenta: 0xff2fd2,
  pink: 0xff4f9a,
  cyan: 0x2ef2ff,
  blue: 0x3d6bff,
  purple: 0x8a3dff,
  orange: 0xff8a3d,
  yellow: 0xffd84a,
  red: 0xff3355,
  green: 0x4dff9a,
};
