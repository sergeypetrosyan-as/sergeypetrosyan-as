// Headless checks for BLACKOUT PROTOCOL. Run: node --experimental-strip-types scripts/check-sim.ts
import type { Input, MissionDef, World } from '../src/sim/types.ts';
import { NO_INPUT } from '../src/sim/types.ts';
import { MISSIONS } from '../src/missions/missions.ts';
import { blockersBetween, findPath, kindAt, parseMap, solidAt } from '../src/sim/grid.ts';
import { canSee, K } from '../src/sim/vision.ts';
import { computeResult, createWorld, restoreSnapshot, step, takeSnapshot, hackables } from '../src/sim/world.ts';
import { SOLUTIONS, runBot } from './solutions.ts';
import { defaultSave, sanitize } from '../src/storage/store.ts';

let pass = 0, fail = 0;
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { pass++; console.log(`PASS  ${name}${detail ? '  ' + detail : ''}`); }
  else { fail++; console.log(`FAIL  ${name}${detail ? '  ' + detail : ''}`); }
}
const inp = (o: Partial<Input> = {}): Input => ({ ...NO_INPUT, ...o });
function run(w: World, secs: number, i: Partial<Input> = {}): void {
  const n = Math.round(secs * 60);
  for (let k = 0; k < n && w.status === 'playing'; k++) step(w, inp(i));
}

function tiny(rows: string[], extra: Partial<MissionDef> = {}): MissionDef {
  return {
    id: 'tiny', index: 9, name: 't', subtitle: '', briefing: [], hints: [], par: 60, map: rows,
    objectives: [{ id: 'extract', label: 'x' }], doors: [], terminals: [], lasers: [], items: [], guards: [], cameras: [], ...extra,
  };
}
const ROOM = [
  '##############',
  '#S...........#',
  '#............#',
  '#............#',
  '#............#',
  '#...........X#',
  '##############',
];
const WALLED = [
  '##############',
  '#S.....#.....#',
  '#......#.....#',
  '#......#.....#',
  '#......#.....#',
  '#...........X#',
  '##############',
];

// ---------------------------------------------------------------------------------------
console.log('== map validation');
for (const m of MISSIONS) {
  const pm = parseMap(m);
  ok(`${m.id}: parses with no errors`, pm.errors.length === 0, pm.errors.join('; '));
  const w = createWorld(m);
  const sx = Math.floor(w.player.x), sy = Math.floor(w.player.y);
  const strict = findPath(w, sx, sy, pm.exit.x, pm.exit.y);
  for (const d of w.doors) d.locked = false;
  const reach = findPath(w, sx, sy, pm.exit.x, pm.exit.y);
  ok(`${m.id}: exit reachable from start (with doors unlocked; locked-door route: ${strict ? 'open' : 'gated'})`, reach !== null);
  const badRoute = m.guards.flatMap((g, gi) => g.route.filter((r) => kindAt(pm, r.x, r.y) === 2 || solidAt(w, r.x, r.y)).map(() => gi));
  ok(`${m.id}: guard waypoints on walkable tiles`, badRoute.length === 0, badRoute.join(','));
  const badCam = m.cameras.filter((c) => kindAt(pm, c.x, c.y) === 2);
  ok(`${m.id}: cameras on floor tiles`, badCam.length === 0);
  const lasersOk = w.lasers.every((l) => l.cells.length > 0);
  ok(`${m.id}: every laser grid has beam tiles`, lasersOk);
  ok(`${m.id}: terminals and items resolved`, w.terminals.length === m.terminals.length && w.items.length === pm.items.length);
}
ok('four missions present', MISSIONS.length === 4);

// ---------------------------------------------------------------------------------------
console.log('== detection');
{
  const def = tiny(ROOM, { guards: [{ zone: 'z', route: [{ x: 2, y: 2, wait: 99, face: 0 }] }] });
  const w = createWorld(def);
  const g = w.guards[0];
  w.player.x = 6.5; w.player.y = 2.5;
  const s = canSee(w, g.x, g.y, g.dir, g.fov, g.range);
  ok('guard sees player inside cone with clear line of sight', s.seen, `dist=${s.dist.toFixed(2)}`);
  w.player.x = 2.5; w.player.y = 4.9;
  ok('guard does not see player outside the cone', !canSee(w, g.x, g.y, g.dir, g.fov, g.range).seen);
  w.player.x = 11.5; w.player.y = 2.5;
  ok('guard does not see player beyond range', !canSee(w, g.x, g.y, g.dir, g.fov, g.range).seen);
  w.player.x = 6.5; w.player.y = 2.5; w.player.sneak = true;
  const sn = canSee(w, g.x, g.y, g.dir, g.fov, g.range);
  ok('sneaking still visible at 4 tiles in light (7 * 0.75 = 5.25)', sn.seen);
  w.player.x = 8.0; w.player.y = 2.5;
  ok('sneaking shrinks range (5.5 tiles not visible, would be at walking)', !canSee(w, g.x, g.y, g.dir, g.fov, g.range).seen);
  w.player.sneak = false;
  ok('walking at 5.5 tiles is visible', canSee(w, g.x, g.y, g.dir, g.fov, g.range).seen);
  w.player.hidden = true;
  ok('hidden operative is never seen, even point blank', !canSee(w, g.x, g.y, g.dir, g.fov, g.range).seen);
  w.player.hidden = false;
  w.player.x = 2.5 + 0.6; w.player.y = 2.5;
  ok('point-blank in front is seen', canSee(w, g.x, g.y, g.dir, g.fov, g.range).seen);
  w.player.x = 2.5 - 0.7; w.player.y = 2.5;
  ok('point-blank behind the guard is still sensed', canSee(w, g.x, g.y, g.dir, g.fov, g.range).seen);
}
{
  const def = tiny(WALLED, { guards: [{ zone: 'z', route: [{ x: 2, y: 2, wait: 99, face: 0 }] }] });
  const w = createWorld(def);
  const g = w.guards[0];
  w.player.x = 9.5; w.player.y = 2.5;
  ok('wall between guard and player blocks line of sight', blockersBetween(w, g.x, g.y, w.player.x, w.player.y, true) > 0);
  ok('guard does NOT detect player behind a wall (in range and inside the cone angle)', !canSee(w, g.x, g.y, g.dir, g.fov, g.range).seen);
  run(w, 5);
  ok('guard stays calm with a wall in between over 5 s', w.guards[0].state === 'patrol' && w.guards[0].sus === 0);
}
{
  const rows = ROOM.map((r, y) => (y === 2 ? '#..,,,,,,...#' : r));
  const def = tiny(rows, { guards: [{ zone: 'z', route: [{ x: 2, y: 2, wait: 99, face: 0 }] }] });
  const w = createWorld(def);
  const g = w.guards[0];
  w.player.x = 6.5; w.player.y = 2.5;
  ok('shadow tile shrinks range (4.5 tiles in shadow not visible; 7*0.4 = 2.8)', !canSee(w, g.x, g.y, g.dir, g.fov, g.range).seen);
  w.player.x = 4.5;
  ok('shadow tile still visible at 2 tiles', canSee(w, g.x, g.y, g.dir, g.fov, g.range).seen);
}

// ---------------------------------------------------------------------------------------
console.log('== alert state transitions');
{
  const def = tiny(WALLED, { guards: [{ zone: 'z', route: [{ x: 2, y: 2, wait: 999, face: 0 }] }] });
  const w = createWorld(def);
  w.player.x = 5.5; w.player.y = 2.5;
  const seen: string[] = [];
  let frames = 0;
  while (frames++ < 60 * 8 && w.guards[0].state !== 'alert' && w.status === 'playing') {
    step(w, inp());
    const st = w.guards[0].state;
    if (seen[seen.length - 1] !== st) seen.push(st);
  }
  ok('patrol -> suspicious -> alert while standing in the cone', seen.join('>') === 'patrol>suspicious>alert' || seen.join('>') === 'suspicious>alert', seen.join('>'));
  ok('global alert meter rose by 20 on the alert entry', w.alert >= 19.9, `alert=${w.alert.toFixed(1)}`);
  ok('spotted counter incremented', w.stats.spotted === 1);
  // break line of sight: teleport behind the wall (guard keeps chasing, then searches)
  w.player.x = 11.5; w.player.y = 4.5;
  w.guards[0].x = 2.5; w.guards[0].y = 2.5;
  w.guards[0].lastSeen = { x: 3.5, y: 2.5 };
  w.guards[0].path = null;
  let tSearch = -1, tPatrol = -1, t = 0;
  while (t < 60 && w.status === 'playing') {
    step(w, inp());
    t += 1 / 60;
    if (tSearch < 0 && w.guards[0].state === 'search') tSearch = t;
    if (tSearch >= 0 && w.guards[0].state === 'patrol') { tPatrol = t; break; }
  }
  ok('alert -> search after about 3 s without sight', tSearch > 2.5 && tSearch < 4.5, `t=${tSearch.toFixed(2)}`);
  ok('search -> patrol once 15 s without contact have elapsed', tPatrol > 14.5 && tPatrol < 17, `t=${tPatrol.toFixed(2)}`);
  ok('guard suspicion reset when returning to patrol', w.guards[0].sus === 0);
}
{
  const def = tiny(ROOM, { guards: [{ zone: 'z', route: [{ x: 2, y: 2, wait: 999, face: 0 }] }] });
  const w = createWorld(def);
  w.player.x = 3.0; w.player.y = 2.5;
  run(w, 3);
  ok('a guard in alert that touches the operative compromises the run', w.status === 'compromised' && w.reason === 'caught', `${w.status}/${w.reason}`);
}

// ---------------------------------------------------------------------------------------
console.log('== decoy');
{
  const rows = [
    '##############',
    '#S...........#',
    '#............#',
    '#............#',
    '#............#',
    '#...........X#',
    '##############',
  ];
  const def = tiny(rows, { guards: [{ zone: 'z', route: [{ x: 11, y: 4, wait: 99, face: Math.PI }] }] });
  const w = createWorld(def);
  w.player.x = 1.5; w.player.y = 1.5; w.player.dir = 0;
  w.player.sneak = true;
  const gx0 = w.guards[0].x, gy0 = w.guards[0].y;
  step(w, inp({ decoy: true, sneak: true }));
  ok('decoy costs 20 energy', Math.abs(w.player.energy - 80) < 0.5, `energy=${w.player.energy.toFixed(1)}`);
  ok('decoy placed ahead of the operative', !!w.decoy && w.decoy.x > 2.5, w.decoy ? `x=${w.decoy.x}` : 'none');
  w.player.x = 1.5; w.player.y = 5.0;
  w.decoy!.x = 9.5; w.decoy!.y = 4.5; w.decoy!.t = 8;
  run(w, 2.5, { sneak: true });
  const g = w.guards[0];
  const d0 = Math.hypot(gx0 - w.decoy!.x, gy0 - w.decoy!.y);
  const d1 = Math.hypot(g.x - w.decoy!.x, g.y - w.decoy!.y);
  ok('decoy pings pull a patrol guard to investigate', g.state === 'suspicious' && g.decoy, `state=${g.state}`);
  ok('guard moves toward the decoy', d1 < d0, `${d0.toFixed(1)} -> ${d1.toFixed(1)}`);
  ok('decoy-pulled guard does not count as a detection (ghost-safe)', w.stats.detections === 0 && w.stats.decoyPulls === 1);
  run(w, 14, { sneak: true });
  ok('decoy expires after 8 s and the guard returns to patrol', w.decoy === null && w.guards[0].state === 'patrol', `state=${w.guards[0].state}`);
}

// ---------------------------------------------------------------------------------------
console.log('== hacking');
{
  const def = tiny(ROOM, {
    cameras: [{ x: 11, y: 2, dir: Math.PI, sweep: 0, speed: 1, zone: 'z' }],
    doors: [{ id: '1', locked: true }],
    lasers: [{ id: 'a', echo: { x: 12, y: 4 } }],
    map: ROOM.map((r, y) => (y === 3 ? '#.....1aa...#' : r)),
  });
  const w = createWorld(def);
  w.player.x = 6.5; w.player.y = 2.5;
  ok('hackables lists camera, door and laser in range', hackables(w).length === 3, `${hackables(w).map((h) => h.kind).join(',')}`);
  w.player.focus = { kind: 'camera', i: 0 };
  step(w, inp({ hack: true }));
  ok('loop camera costs 35 energy', Math.abs(w.player.energy - 65) < 0.5, `${w.player.energy.toFixed(1)}`);
  const e0 = w.player.energy;
  run(w, 0.8);
  ok('no energy regen for 1.0 s after a hack', Math.abs(w.player.energy - e0) < 0.01, `${(w.player.energy - e0).toFixed(3)}`);
  run(w, 1.2);
  ok('energy regenerates at 4 per second afterwards', w.player.energy > e0 + 3.5 && w.player.energy < e0 + 4.5, `${(w.player.energy - e0).toFixed(2)}`);
  run(w, 2.5);
  ok('looped camera never detects during the 6 s window', w.cameras[0].sus === 0 && !w.cameras[0].seeing);
  run(w, 4);
  ok('camera resumes detecting after the loop ends', w.cameras[0].loopT <= 0 && w.cameras[0].sus > 0);
}
{
  const def = tiny(ROOM.map((r, y) => (y === 3 ? '#.....1aa...#' : r)), {
    doors: [{ id: '1', locked: true }],
    lasers: [{ id: 'a', echo: { x: 12, y: 4 } }],
  });
  const w = createWorld(def);
  w.player.x = 7.5; w.player.y = 3.5;
  w.player.focus = { kind: 'laser', i: 0 };
  step(w, inp({ hack: true }));
  ok('cut laser grid costs 30 energy', Math.abs(w.player.energy - 70) < 0.5);
  ok('grid is down for 5 s', !w.lasers[0].active && w.lasers[0].cutT > 4.9);
  w.player.x = 7.5; w.player.y = 3.5; w.player.focus = null;
  run(w, 1, {});
  w.player.x = 8.5; w.player.y = 3.5;
  step(w, inp());
  ok('standing in a cut beam does not trip the alarm', w.stats.alarms === 0);
  w.player.x = 3.5;
  run(w, 5.2);
  w.player.x = 8.5; w.player.y = 3.5;
  step(w, inp());
  ok('beam trips the alarm when active again (alert +20, alarm counted)', w.stats.alarms === 1 && w.alert >= 19);
}
{
  const def = tiny(['##############','#.....#......#','#.....#......#','#.....1......#','#.....#......#','#...........X#','##############'].map((r, y) => (y === 5 ? '#.....#.....X#' : r)), { doors: [{ id: '1', locked: false }], guards: [{ zone: 'z', route: [{ x: 2, y: 3, wait: 0 }, { x: 11, y: 3, wait: 0 }] }] });
  const w = createWorld(def);
  w.player.x = 1.5; w.player.y = 5.5;
  w.player.focus = { kind: 'door', i: 0 };
  step(w, inp({ hack: true }));
  ok('locking a door costs 15 energy and locks it', Math.abs(w.player.energy - 85) < 0.5 && w.doors[0].locked);
  run(w, 8);
  ok('a locked door blocks the guard route (guard stays on its side)', w.guards[0].x < 6.5, `x=${w.guards[0].x.toFixed(1)}`);
}
{
  const def = tiny(ROOM);
  const w = createWorld(def);
  w.player.energy = 10;
  w.player.focus = null;
  w.cameras.push({ id: 0, x: 3.5, y: 2.5, baseDir: 0, dir: 0, sweep: 0, speed: 1, phase: 0, fov: 1, range: 9, zone: 'z', sus: 0, loopT: 0, loopWatch: 0, trackT: 0, spotCd: 0, seeing: false });
  w.player.focus = { kind: 'camera', i: 0 };
  step(w, inp({ hack: true }));
  ok('hack refused without enough energy (no spend, no effect)', w.player.energy > 9.9 && w.cameras[0].loopT === 0);
}

// ---------------------------------------------------------------------------------------
console.log('== terminal puzzle');
{
  const def = tiny(ROOM.map((r, y) => (y === 2 ? '#..A.........#' : r)), {
    terminals: [{ id: 'A', len: 4, label: 'T', effect: { objective: 'x' } }],
    objectives: [{ id: 'x', label: 'x' }, { id: 'extract', label: 'e' }],
  });
  const w = createWorld(def);
  w.player.x = 3.5; w.player.y = 3.5;
  step(w, inp({ interact: true }));
  ok('interact next to a terminal starts the puzzle', !!w.puzzle && w.puzzle.phase === 'show');
  run(w, 4.5);
  ok('pattern is hidden after the show phase', w.puzzle!.phase === 'input');
  for (const d of w.puzzle!.seq) step(w, inp({ dir: d }));
  run(w, 0.1);
  ok('correct sequence completes the objective', w.objectives.x === true && w.terminals[0].done);
}
{
  const def = tiny(ROOM.map((r, y) => (y === 2 ? '#..A.........#' : r)), {
    terminals: [{ id: 'A', len: 4, label: 'T', effect: { objective: 'x' } }],
    objectives: [{ id: 'x', label: 'x' }, { id: 'extract', label: 'e' }],
  });
  const w = createWorld(def);
  w.player.x = 3.5; w.player.y = 3.5;
  step(w, inp({ interact: true }));
  run(w, 4.5);
  const wrong = (w.puzzle!.seq[0] + 1) % 4;
  step(w, inp({ dir: wrong }));
  ok('wrong input fails the puzzle, locks the terminal and raises the alarm', w.terminals[0].lockT > 7 && w.alert > 7.5 && !w.objectives.x && w.stats.alarms === 1);
  run(w, 1.2);
  step(w, inp({ interact: true }));
  ok('locked-out terminal cannot be reused immediately', w.puzzle === null);
}
{
  const def = tiny(ROOM.map((r, y) => (y === 2 ? '#..A.........#' : r)), {
    terminals: [{ id: 'A', len: 3, time: 3, label: 'T', effect: { objective: 'x' } }],
    objectives: [{ id: 'x', label: 'x' }, { id: 'extract', label: 'e' }],
  });
  const w = createWorld(def);
  w.player.x = 3.5; w.player.y = 3.5;
  step(w, inp({ interact: true }));
  run(w, 3 + 3.0 + 0.2);
  ok('running out of time fails the puzzle', w.terminals[0].lockT > 0 && !w.objectives.x);
}

// ---------------------------------------------------------------------------------------
console.log('== checkpoint snapshot');
{
  const def = tiny(ROOM, { guards: [{ zone: 'z', route: [{ x: 11, y: 4, wait: 1 }, { x: 11, y: 1, wait: 1 }] }] });
  const w = createWorld(def);
  run(w, 2, { mx: 1 });
  const snap = takeSnapshot(w);
  const json = JSON.stringify(snap);
  ok('snapshot is JSON-serialisable', json.length > 100);
  const px = w.player.x;
  run(w, 2, { mx: -1 });
  restoreSnapshot(w, JSON.parse(json));
  ok('restore returns the operative to the checkpoint position', Math.abs(w.player.x - px) < 1e-9);
  ok('restore counts a retry and sets a heightened alert of 30', w.stats.retries === 1 && w.alert === 30);
  ok('elapsed time is kept across a restore (penalty)', w.time > 3.9);
}

// ---------------------------------------------------------------------------------------
console.log('== persistence sanitising');
{
  const d = defaultSave();
  ok('garbage input falls back to defaults', JSON.stringify(sanitize('garbage')) === JSON.stringify(d) && JSON.stringify(sanitize(null)) === JSON.stringify(d) && JSON.stringify(sanitize({ v: 2 })) === JSON.stringify(d));
  const s = sanitize({ v: 1, unlocked: 99, best: { a: { score: 'x', rating: 'Z' }, b: { score: 500, rating: 'A', time: 60 } }, settings: { volume: 5, mute: 'yes', difficulty: 'nightmare' }, checkpoint: { mission: 'm', snapshot: 3 } });
  ok('out-of-range and wrong-typed fields are clamped or defaulted', s.unlocked === 3 && s.settings.volume === 1 && s.settings.mute === false && s.settings.difficulty === 'normal' && s.checkpoint === null);
  ok('invalid best entries are dropped, valid ones kept', !('a' in s.best) && s.best.b.rating === 'A');
}

console.log('== mission solvability (scripted bot routes)');
for (const m of MISSIONS) {
  const sol = SOLUTIONS[m.id];
  const r = runBot(m, sol);
  const res = r.world.status === 'complete' ? computeResult(r.world) : null;
  ok(`${m.id}: solved by scripted route`, r.world.status === 'complete' && r.world.stats.retries === 0, `${r.note}; t=${r.world.time.toFixed(1)}s status=${r.world.status}${r.world.reason ? '/' + r.world.reason : ''} peakAlert=${Math.round(r.world.alertPeak)} spotted=${r.world.stats.spotted} alarms=${r.world.stats.alarms} hacks=${JSON.stringify(r.world.stats.hacks)}${res ? ` score=${res.score} rating=${res.rating}` : ''}`);
}

console.log(`\n${pass} passed, ${fail} failed`);
void K;
(globalThis as unknown as { process: { exitCode: number } }).process.exitCode = fail ? 1 : 0;
