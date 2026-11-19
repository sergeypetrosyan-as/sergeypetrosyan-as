import { T, RIVALS, type Difficulty } from '../state/tuning';
import type { Rival, Track } from '../state/types';
import { segAt } from '../track/build';
import { clamp } from './physics';

export function makeRivals(): Rival[] {
  return RIVALS.map((d, i) => ({
    name: d.name,
    color: d.color,
    skill: d.skill,
    lane: d.lane,
    weaveAmp: d.weaveAmp,
    weaveHz: d.weaveHz,
    phase: i * 2.1,
    s: d.start.s,
    x: d.start.x,
    speed: 0,
    finish: null,
    early: d.early,
    late: d.late,
  }));
}

/** Simple path-following rival: lane target with weave, cornering slowdown, light rubber-banding. */
export function stepRival(
  r: Rival, track: Track, diff: Difficulty, trackBonus: number,
  playerS: number, playerX: number, time: number, dt: number,
): void {
  const seg = segAt(track, r.s);
  const raceLen = T.LAPS * track.length;
  const lapFrac = clamp(r.s / raceLen, 0, 1);
  const phaseMul = r.early + (r.late - r.early) * lapFrac;
  let target = T.MAX_SPEED * (diff.ai + trackBonus) * r.skill * phaseMul;
  target *= 1 - 0.052 * Math.abs(seg.curve) * (1.05 - r.skill * 0.5);
  const gap = r.s - playerS;
  if (gap > 6000) target *= 0.93;
  else if (gap < -5000) target *= 1.04;
  const a = 3000 * dt;
  r.speed += clamp(target - r.speed, -a * 1.5, a);

  r.s += r.speed * dt;

  let tx = r.lane + Math.sin(time * r.weaveHz * Math.PI * 2 + r.phase) * r.weaveAmp;
  // dodge the player when they are right behind us
  const ds = r.s - playerS;
  if (ds > 0 && ds < 700 && Math.abs(r.x - playerX) < 0.35) tx += (r.x >= playerX ? 1 : -1) * 0.4;
  // rivals never use the Spine: keep clear of the channel in and just before Spine zones
  const ahead = segAt(track, r.s + 3000);
  if ((seg.spine || ahead.spine) && Math.abs(tx) < 0.45) tx = (tx >= 0 ? 1 : -1) * 0.6;
  tx = clamp(tx, -0.9, 0.9);
  r.x += clamp(tx - r.x, -1.2 * dt, 1.2 * dt);

  if (r.finish === null && r.s >= raceLen) r.finish = time - (r.s - raceLen) / Math.max(1, r.speed);
}
