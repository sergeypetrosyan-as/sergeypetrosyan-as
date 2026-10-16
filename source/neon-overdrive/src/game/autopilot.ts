import { T } from '../state/tuning';
import type { InputState } from '../state/types';
import { segAt } from '../track/build';
import type { Race } from './race';

/** Simple driver used by the attract/demo mode (`?demo=1`). Pure, no DOM. */
export function autopilot(r: Race, boostWhenAbove: number, lane = 0.2): InputState {
  const p = r.player;
  const seg = segAt(r.track, p.s);
  const ahead = segAt(r.track, p.s + 2400);
  const target = seg.spine || ahead.spine ? (p.reserve >= r.diff.threshold ? 0 : 0.6) : lane;
  const steer = Math.max(-1, Math.min(1, (target - p.x) * 2.2 + seg.curve * 0.32 * (p.speed / T.MAX_SPEED)));
  const sharp = Math.abs(ahead.curve) > 4 && p.speed > T.MAX_SPEED * 0.8;
  return {
    steer,
    throttle: !sharp,
    brake: false,
    drift: Math.abs(seg.curve) > 2.4 && Math.abs(steer) > 0.3,
    boost: p.reserve > boostWhenAbove && !seg.spine,
  };
}
