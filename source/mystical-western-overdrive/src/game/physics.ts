import { T, type Difficulty } from '../state/tuning';
import type { Car, InputState, RaceEvent, Track } from '../state/types';
import { segAt } from '../track/build';

export const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

export function newCar(s: number, x: number): Car {
  return {
    s, x, vx: 0, speed: 0, reserve: T.RESERVE_START, boosting: false, drifting: false,
    spineMode: false, wallCd: 0, gateCd: 0, cleanT: 0, slip: 0,
  };
}

/** Advance the player car. Pure: no DOM, no audio. Appends gameplay events to `ev`. */
export function stepPlayer(car: Car, inp: InputState, track: Track, diff: Difficulty, dt: number, ev: RaceEvent[]): void {
  const max = T.MAX_SPEED;
  const seg = segAt(track, car.s);
  const onRoad = Math.abs(car.x) <= T.OFFROAD_X;

  // boost
  const wantBoost = inp.boost && car.reserve > T.BOOST_MIN && car.speed > 1000;
  if (wantBoost && !car.boosting) ev.push({ type: 'boostStart', value: 1 });
  car.boosting = wantBoost;
  if (car.boosting) car.reserve -= T.BOOST_DRAIN * dt;

  // speed cap
  let cap = max * (car.boosting ? T.BOOST_MULT : 1) * (car.spineMode ? T.SPINE_SPEED_MULT : 1);
  if (!onRoad) cap = Math.min(cap, max * T.OFFROAD_CAP);

  // longitudinal
  if (inp.brake) {
    if (car.speed > 0) car.speed = Math.max(0, car.speed - T.BRAKE * dt);
    else car.speed = Math.max(-max * T.REV_MAX, car.speed - T.REV_ACCEL * dt);
  } else if (inp.throttle) {
    if (car.speed < 0) car.speed = Math.min(0, car.speed + T.BRAKE * dt);
    else if (car.speed < cap) {
      const a = T.ACCEL * (car.boosting ? T.BOOST_ACCEL : 1) * (1 - 0.55 * (car.speed / cap));
      car.speed = Math.min(cap, car.speed + a * dt);
    }
  } else if (car.speed > 0) car.speed = Math.max(0, car.speed - T.COAST * dt);
  else if (car.speed < 0) car.speed = Math.min(0, car.speed + T.COAST * dt);
  if (car.speed > cap) car.speed = Math.max(cap, car.speed - (onRoad ? T.OVER_DECEL : T.OFFROAD_DECEL) * dt);

  // drift state
  const steer = inp.steer;
  if (!car.drifting) {
    if (inp.drift && car.speed > T.DRIFT_MIN_SPEED * max && Math.abs(steer) > 0.2) car.drifting = true;
  } else if (!inp.drift || car.speed < T.DRIFT_HOLD_SPEED * max) car.drifting = false;

  // lateral
  const spAbs = clamp(Math.abs(car.speed) / max, 0, 1.6);
  const sf = clamp(Math.abs(car.speed) / 3600, 0, 1) * (car.speed < 0 ? -1 : 1);
  const grip = (car.drifting ? T.DRIFT_GRIP : T.GRIP) * diff.grip;
  const steerGain = T.STEER * (car.drifting ? T.DRIFT_STEER : 1);
  const cent = car.speed > 0 ? seg.curve * spAbs * spAbs * T.CENT * (car.drifting ? T.DRIFT_CENT : 1) : 0;
  const target = steer * steerGain * sf - cent;
  car.vx += (target - car.vx) * Math.min(1, grip * dt);
  car.x += car.vx * dt;
  car.slip = car.vx;

  // reserve
  car.cleanT += dt;
  if (car.drifting) {
    car.reserve += T.DRIFT_GAIN * clamp(Math.abs(car.vx) / 1.2, 0, 1) * diff.regen * dt;
    car.speed = Math.max(0, car.speed - T.DRIFT_SCRUB * dt);
  }
  if (car.cleanT > T.CLEAN_AFTER_HIT && spAbs > 0.5 && onRoad) car.reserve += T.CLEAN_GAIN * diff.regen * dt;
  if (car.spineMode) car.reserve -= T.SPINE_DRAIN * dt;

  // advance
  const prevS = car.s;
  car.s += car.speed * dt * (car.spineMode ? T.SPINE_ADVANCE : 1);
  if (car.s < 0) {
    car.s = 0;
    car.speed = 0;
  }

  // Spine gates crossed this step
  car.gateCd = Math.max(0, car.gateCd - dt);
  const n = track.segs.length;
  const k0 = Math.floor(prevS / T.SEG_LEN) + 1;
  const k1 = Math.floor(car.s / T.SEG_LEN);
  for (let k = k0; k <= k1; k++) {
    const g = track.segs[((k % n) + n) % n];
    if (g.gate === 1) {
      if (Math.abs(car.x) < T.SPINE_RAIL) {
        if (car.reserve >= diff.threshold) {
          car.spineMode = true;
          ev.push({ type: 'gateOpen', value: car.reserve });
        } else {
          const side = car.x >= 0 ? 1 : -1;
          car.speed *= T.SPINE_CRASH_KEEP;
          car.x = side * T.SPINE_CRASH_X;
          car.vx = side * 0.6;
          car.gateCd = T.SPINE_GATE_COOLDOWN;
          car.cleanT = 0;
          car.spineMode = false;
          car.boosting = false;
          ev.push({ type: 'gateSealed', value: 1 });
        }
      } else car.spineMode = false;
    } else if (g.gate === 2) car.spineMode = false;
  }

  // Spine rails
  const segNow = segAt(track, car.s);
  if (segNow.spine) {
    const sign = car.x >= 0 ? 1 : -1;
    const ax = Math.abs(car.x);
    if (car.spineMode) {
      if (ax > T.SPINE_INNER_CLAMP) {
        if (Math.abs(car.vx) > 0.3) {
          car.speed *= 0.985;
          ev.push({ type: 'rail', value: clamp(Math.abs(car.vx) / 2, 0.1, 1) });
        }
        car.x = sign * T.SPINE_INNER_CLAMP;
        car.vx = -sign * Math.abs(car.vx) * 0.3;
      }
    } else if (ax < T.SPINE_OUTER) {
      if (Math.abs(car.vx) > 0.3) {
        car.speed *= 0.99;
        ev.push({ type: 'rail', value: clamp(Math.abs(car.vx) / 2, 0.1, 1) });
      }
      car.x = sign * T.SPINE_OUTER;
      car.vx = sign * Math.abs(car.vx) * 0.3;
    }
  } else car.spineMode = false;

  // walls
  car.wallCd = Math.max(0, car.wallCd - dt);
  const ax = Math.abs(car.x);
  const sgn = car.x >= 0 ? 1 : -1;
  if (ax >= T.WALL_X) {
    if (car.wallCd <= 0) {
      const sev = clamp(0.3 + Math.abs(car.vx) * 0.25 + (car.speed / max) * 0.35, 0.2, 1);
      car.speed *= T.WALL_SPEED_KEEP;
      car.reserve -= T.WALL_PENALTY;
      car.cleanT = 0;
      car.wallCd = T.WALL_COOLDOWN;
      ev.push({ type: 'wall', value: sev });
    }
    car.x = sgn * (T.WALL_X - 0.03);
    car.vx = -sgn * Math.abs(car.vx) * 0.35;
  } else if (ax > T.WALL_SCRAPE_X && car.speed > 2000) {
    car.speed = Math.max(0, car.speed - T.SCRAPE_DECEL * dt);
    car.cleanT = 0;
    ev.push({ type: 'scrape', value: clamp((ax - T.WALL_SCRAPE_X) / 0.1, 0.2, 1) });
  }

  car.reserve = clamp(car.reserve, 0, 100);
  if (!Number.isFinite(car.speed) || !Number.isFinite(car.x)) {
    car.speed = 0;
    car.x = 0;
    car.vx = 0;
  }
}
