import type { Difficulty, World } from './types.ts';
import { isLit, los } from './grid.ts';

export const STEP = 1 / 60;

export const K = {
  PLAYER_R: 0.28,
  WALK: 3.2,
  SNEAK: 1.5,
  ENERGY_MAX: 100,
  HACK_RANGE: 8,
  COST_LOOP: 35,
  COST_DOOR: 15,
  COST_DECOY: 20,
  COST_CUT: 30,
  LOOP_T: 6,
  LOOP_WATCH: 2,
  CUT_T: 5,
  DECOY_T: 8,
  DECOY_RADIUS: 9,
  ECHO_RADIUS: 9,
  ENERGY_CELL: 40,
  WALK_NOISE: 4.5,
  WALK_NOISE_EVERY: 0.34,
  SNEAK_NOISE: 1.6,
  SNEAK_NOISE_EVERY: 0.5,
  GUARD_PATROL: 1.7,
  GUARD_INVESTIGATE: 2.5,
  GUARD_CHASE: 3.0,
  GUARD_FOV: (70 * Math.PI) / 180,
  GUARD_RANGE: 7,
  CAM_FOV: (56 * Math.PI) / 180,
  CAM_RANGE: 9,
  SUS_THRESHOLD: 35,
  FILL_GUARD: 55,
  FILL_CAMERA: 70,
  SEARCH_TIME: 15,
  CATCH_DIST: 0.8,
  LOCKDOWN: 100,
  SHADOW_RANGE: 0.4,
  SNEAK_RANGE: 0.75,
} as const;

export interface DiffTable { fill: number; range: number; regen: number; puzzleExtra: number }
export const DIFF: Record<Difficulty, DiffTable> = {
  easy: { fill: 0.75, range: 0.9, regen: 5, puzzleExtra: 0 },
  normal: { fill: 1, range: 1, regen: 4, puzzleExtra: 0 },
  hard: { fill: 1.3, range: 1.1, regen: 3.2, puzzleExtra: 1 },
};

export function angDiff(a: number, b: number): number {
  let d = (a - b) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

export function turnToward(cur: number, target: number, maxStep: number): number {
  const d = angDiff(target, cur);
  if (Math.abs(d) <= maxStep) return target;
  return cur + Math.sign(d) * maxStep;
}

export interface Sight { seen: boolean; dist: number; prox: number }

/** Effective sight range against the operative at their current exposure. */
export function effectiveRange(w: World, range: number): number {
  const p = w.player;
  const lit = isLit(w, p.x, p.y);
  return range * (lit ? 1 : K.SHADOW_RANGE) * (p.sneak ? K.SNEAK_RANGE : 1);
}

/**
 * Pure in-view test for any observer (guard or camera) against the operative.
 * Rules (spec section 9): hidden = never seen; point-blank (<= 1.0) with clear line of sight is always seen;
 * otherwise dist <= Reff, inside the FOV cone, and line of sight is clear.
 */
export function canSee(w: World, ox: number, oy: number, dir: number, fov: number, range: number): Sight {
  const p = w.player;
  const none: Sight = { seen: false, dist: 99, prox: 0 };
  if (p.hidden) return none;
  const dx = p.x - ox, dy = p.y - oy;
  const dist = Math.hypot(dx, dy);
  const reff = Math.max(1.0, effectiveRange(w, range));
  const point = dist <= 1.0;
  if (!point) {
    if (dist > reff) return none;
    if (Math.abs(angDiff(Math.atan2(dy, dx), dir)) > fov / 2) return none;
  }
  if (!los(w, ox, oy, p.x, p.y)) return none;
  const prox = Math.min(1.7, Math.max(0.7, 1.7 - dist / reff));
  return { seen: true, dist, prox };
}
