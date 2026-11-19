import { T, DIFFICULTIES } from '../state/tuning';
import { TRACKS } from '../track/tracks';
import { buildTrack, segAt } from '../track/build';
import { Race, NO_INPUT } from '../game/race';
import { newCar, stepPlayer } from '../game/physics';
import { parseSave } from '../storage/storage';
import type { InputState, RaceEvent } from '../state/types';

let failed = 0;
function check(name: string, ok: boolean, info = ''): void {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${info ? '  ' + info : ''}`);
  if (!ok) failed++;
}

function autopilot(r: Race, boostWhenAbove: number): InputState {
  const p = r.player;
  const seg = segAt(r.track, p.s);
  const ahead = segAt(r.track, p.s + 2400);
  const target = seg.spine || ahead.spine ? (p.reserve >= r.diff.threshold ? 0 : 0.6) : 0.2;
  const steer = Math.max(-1, Math.min(1, (target - p.x) * 2.2 + seg.curve * 0.32 * (p.speed / T.MAX_SPEED)));
  const sharp = Math.abs(ahead.curve) > 4 && p.speed > T.MAX_SPEED * 0.8;
  return { steer, throttle: !sharp, brake: false, drift: Math.abs(seg.curve) > 2.4 && Math.abs(steer) > 0.3, boost: p.reserve > boostWhenAbove && !seg.spine };
}

// 1. Tracks build correctly
for (const def of TRACKS) {
  const tr = buildTrack(def);
  const cps = tr.segs.filter((s) => s.cp > 0).length;
  check(`${def.id}: builds with 3 spine zones and 4 checkpoints`, tr.spineStarts.length === 3 && cps === 4, `${tr.segs.length} segs`);
  check(`${def.id}: lap loops to height 0`, Math.abs(tr.segs[tr.segs.length - 1].y2) < 1e-6 && tr.segs[0].y1 === 0);
}

// 2. Full races on every track and difficulty with the autopilot
for (let ti = 0; ti < TRACKS.length; ti++) {
  for (let di = 0; di < DIFFICULTIES.length; di++) {
    const race = new Race(buildTrack(TRACKS[ti]), di);
    const events: RaceEvent[] = [];
    let t = 0;
    let bad = false;
    while (race.phase !== 'finished' && t < 600) {
      race.update(1 / 60, autopilot(race, 60));
      events.push(...race.events.splice(0));
      const c = race.player;
      if (![c.s, c.x, c.vx, c.speed, c.reserve].every(Number.isFinite)) bad = true;
      t += 1 / 60;
    }
    race.settle();
    const laps = events.filter((e) => e.type === 'lap').length;
    const cp = events.filter((e) => e.type === 'checkpoint').length;
    check(`T${ti + 1}/${DIFFICULTIES[di].id}: autopilot finishes 3 laps`, race.phase === 'finished' && race.lapTimes.length === 3 && laps === 2 && cp === 9,
      `total ${race.finishTime?.toFixed(1)}s place ${race.rank} rivals ${race.results.map((x) => x.name[0] + x.time.toFixed(0)).join(",")} spine ok=${race.spinePasses} sealed=${race.wrongSpine} laps=${race.lapTimes.map((x) => x.toFixed(1)).join('/')}`);
    check(`T${ti + 1}/${DIFFICULTIES[di].id}: no NaN, results complete`, !bad && race.results.length === 4);
  }
}

// 3. Spine gate behaviour
function gateTest(reserve: number): { mode: boolean; speed: number; ev: RaceEvent[] } {
  const tr = buildTrack(TRACKS[0]);
  const car = newCar(tr.spineStarts[0] * T.SEG_LEN - 300, 0);
  car.speed = 9000;
  car.reserve = reserve;
  const ev: RaceEvent[] = [];
  const inp: InputState = { steer: 0, throttle: true, brake: false, drift: false, boost: false };
  for (let i = 0; i < 20; i++) stepPlayer(car, inp, tr, DIFFICULTIES[1], 1 / 60, ev);
  return { mode: car.spineMode, speed: car.speed, ev };
}
const lo = gateTest(10);
const hi = gateTest(80);
check('gate sealed with reserve 10', !lo.mode && lo.ev.some((e) => e.type === 'gateSealed') && lo.speed < 4500, `speed ${lo.speed.toFixed(0)}`);
check('gate opens with reserve 80', hi.mode && hi.ev.some((e) => e.type === 'gateOpen'));

// 4. Boost drains reserve and raises speed cap
{
  const tr = buildTrack(TRACKS[0]);
  const car = newCar(1000, 0);
  car.speed = 11000;
  car.reserve = 50;
  const ev: RaceEvent[] = [];
  for (let i = 0; i < 120; i++) stepPlayer(car, { steer: 0, throttle: true, brake: false, drift: false, boost: true }, tr, DIFFICULTIES[1], 1 / 60, ev);
  check('boost drains reserve and exceeds max speed', car.reserve < 50 - 30 && car.speed > T.MAX_SPEED, `reserve ${car.reserve.toFixed(1)} speed ${car.speed.toFixed(0)}`);
}

// 5. Wall impact slows the car
{
  const tr = buildTrack(TRACKS[0]);
  const car = newCar(1000, 1.335);
  car.speed = 10000;
  car.vx = 2;
  const ev: RaceEvent[] = [];
  stepPlayer(car, { steer: 1, throttle: true, brake: false, drift: false, boost: false }, tr, DIFFICULTIES[1], 1 / 60, ev);
  check('wall impact emits event and sheds speed', ev.some((e) => e.type === 'wall') && car.speed < 8000 && Math.abs(car.x) < T.WALL_X);
}

// 6. Drift charges reserve
{
  const tr = buildTrack(TRACKS[0]);
  const car = newCar(1000, 0);
  car.speed = 10000;
  car.reserve = 10;
  const ev: RaceEvent[] = [];
  for (let i = 0; i < 90; i++) stepPlayer(car, { steer: i % 40 < 20 ? 1 : -1, throttle: true, brake: false, drift: true, boost: false }, tr, DIFFICULTIES[1], 1 / 60, ev);
  check('drifting fills reserve', car.reserve > 25, `reserve ${car.reserve.toFixed(1)}`);
}

// 7. Idle race: player finishes last or near
{
  const race = new Race(buildTrack(TRACKS[0]), 2);
  for (let i = 0; i < 60 * 12; i++) race.update(1 / 60, NO_INPUT);
  check('idle player is behind rivals', race.rank === 4);
}

// 8. Save parsing falls back safely
check('corrupted JSON falls back', parseSave('{nope').settings.volume === 0.7);
check('wrong version falls back', parseSave('{"v":9}').settings.volume === 0.7);
check('bad fields are sanitised', parseSave('{"v":1,"settings":{"volume":"x","muted":5},"records":{"0:1":{"bestTotal":-3}}}').records['0:1'].bestTotal === null);

if (failed) {
  console.log(`\n${failed} check(s) failed`);
  throw new Error('sim tests failed');
}
console.log('\nall sim checks passed');
