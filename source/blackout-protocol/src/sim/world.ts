import type {
  Camera, CardColor, Difficulty, Guard, HackTarget, Input, ItemState, Laser, MissionDef, Terminal, Vec, World,
} from './types.ts';
import { T_LASER } from './types.ts';
import { findPath, kindAt, nearestWalkable, parseMap, solidAt } from './grid.ts';
import { DIFF, K, STEP, canSee, turnToward } from './vision.ts';
import { addAlert, addRing, emit, enterSuspicious, hearNoise, updateGuards } from './guard.ts';
import { newPuzzle, puzzleInput, updatePuzzle } from '../hacking/puzzle.ts';

export { STEP };

const CARD_FOR: Record<string, CardColor> = { r: 'red', u: 'blue', y: 'yellow' };
const CARD_NAME: Record<CardColor, string> = { red: 'RED', blue: 'BLUE', yellow: 'YELLOW' };

export function createWorld(def: MissionDef, difficulty: Difficulty = 'normal', seed = 1337): World {
  const map = parseMap(def);
  const guards: Guard[] = def.guards.map((gd, id) => {
    const route = gd.route.map((r) => ({ x: r.x + 0.5, y: r.y + 0.5, wait: r.wait, face: r.face }));
    const first = route[0];
    const next = route[1 % route.length];
    const dir = first.face ?? Math.atan2(next.y - first.y, next.x - first.x);
    return {
      id, x: first.x, y: first.y, dir, baseFace: dir, state: 'patrol', sus: 0, route,
      ri: route.length > 1 ? 1 : 0, waitT: route.length > 1 ? 0 : first.wait,
      fov: gd.fov ?? K.GUARD_FOV, range: gd.range ?? K.GUARD_RANGE, zone: gd.zone,
      path: null, repathT: 0, target: null, lastSeen: null, noContact: 99, seeing: false,
      phase: 'look', phaseT: 0, decoy: false, lostT: 0, blockedT: 0, lockerTarget: null,
    } as Guard;
  });
  const cameras: Camera[] = def.cameras.map((c, id) => ({
    id, x: c.x + 0.5, y: c.y + 0.5, baseDir: c.dir, dir: c.dir, sweep: c.sweep, speed: c.speed, phase: id * 1.3,
    fov: c.fov ?? K.CAM_FOV, range: c.range ?? K.CAM_RANGE, zone: c.zone,
    sus: 0, loopT: 0, loopWatch: 0, trackT: 0, spotCd: 0, seeing: false,
  }));
  const doors = def.doors.map((d) => {
    let pos: Vec = { x: 0, y: 0 };
    for (let y = 0; y < map.h; y++) for (let x = 0; x < map.w; x++) if (map.kind[y * map.w + x] === 5 && def.doors[map.ref[y * map.w + x]] === d) pos = { x, y };
    return { id: d.id, x: pos.x, y: pos.y, locked: d.locked, card: d.card, open: false, msgCd: 0 };
  });
  const lasers: Laser[] = def.lasers.map((l, i) => {
    const cells: Vec[] = [];
    for (let y = 0; y < map.h; y++) for (let x = 0; x < map.w; x++) if (map.kind[y * map.w + x] === T_LASER && map.ref[y * map.w + x] === i) cells.push({ x, y });
    return {
      id: l.id, cells, cutT: 0, clock: 0, active: true, tripCd: 0, echo: { x: l.echo.x + 0.5, y: l.echo.y + 0.5 },
      period: l.period ? { on: l.period.on, off: l.period.off, phase: l.period.phase ?? 0 } : undefined,
    };
  });
  const terminals: Terminal[] = def.terminals.map((t, i) => {
    let pos: Vec = { x: 0, y: 0 };
    for (let y = 0; y < map.h; y++) for (let x = 0; x < map.w; x++) if (map.kind[y * map.w + x] === 4 && map.ref[y * map.w + x] === i) pos = { x, y };
    return { id: t.id, x: pos.x, y: pos.y, def: t, done: false, lockT: 0 };
  });
  const items: ItemState[] = map.items.map((m) => {
    if (m.ch === 'e') return { ch: m.ch, x: m.x, y: m.y, kind: 'energy', label: 'ENERGY CELL', taken: false };
    if (CARD_FOR[m.ch]) return { ch: m.ch, x: m.x, y: m.y, kind: 'card', card: CARD_FOR[m.ch], label: `${CARD_NAME[CARD_FOR[m.ch]]} KEYCARD`, taken: false };
    const idef = def.items.find((d) => d.id === m.ch);
    return { ch: m.ch, x: m.x, y: m.y, kind: 'data', objective: idef?.objective, label: idef?.label ?? 'DATA', taken: false };
  });
  const objectives: Record<string, boolean> = {};
  for (const o of def.objectives) objectives[o.id] = false;
  return {
    missionId: def.id, map, def, difficulty, time: 0, rng: seed,
    player: {
      x: map.start.x + 0.5, y: map.start.y + 0.5, dir: 0, sneak: false, hidden: false, locker: -1, moving: false,
      energy: K.ENERGY_MAX, hackIdle: 99, cards: [], stepT: 0, focus: null,
    },
    guards, cameras, doors, lasers, terminals, items,
    checkpoints: map.checkpoints.map((c) => ({ x: c.x + 0.5, y: c.y + 0.5, hit: false })),
    cpHit: 0, decoy: null, puzzle: null, objectives, alert: 0, alertPeak: 0,
    stats: {
      spotted: 0, alarms: 0, retries: 0, detections: 0, decoyPulls: 0,
      hacks: { camera: 0, door: 0, decoy: 0, laser: 0 }, shadowSneakT: 0, sneakT: 0, moveT: 0, terminals: 0,
    },
    status: 'playing', reason: '', finale: { active: false, t: 0, started: false }, blackout: false, rings: [], events: [],
  };
}

// ---- snapshots ---------------------------------------------------------------
export type Snapshot = Omit<World, 'map' | 'def' | 'events'>;

export function takeSnapshot(w: World): Snapshot {
  const { map: _m, def: _d, events: _e, ...rest } = w;
  void _m; void _d; void _e;
  return structuredClone(rest);
}

/** Restore a checkpoint snapshot, keeping elapsed time, stats and peak alert (they are the penalty). */
export function restoreSnapshot(w: World, snap: Snapshot, penalty = true): void {
  const keep = { time: w.time, stats: structuredClone(w.stats), peak: w.alertPeak, cpHit: w.cpHit };
  const c = structuredClone(snap);
  Object.assign(w, c);
  w.time = keep.time;
  w.stats = keep.stats;
  w.alertPeak = keep.peak;
  w.status = 'playing';
  w.reason = '';
  w.events = [];
  w.puzzle = null;
  w.player.hidden = false;
  w.player.locker = -1;
  if (penalty) { w.stats.retries++; w.alert = 30; if (w.alert > w.alertPeak) w.alertPeak = w.alert; }
  for (const g of w.guards) { g.lockerTarget = null; g.seeing = false; }
}

// ---- helpers -------------------------------------------------------------------
function toast(w: World, msg: string): void { emit(w, 'toast', undefined, undefined, msg); }

function collides(w: World, x: number, y: number): boolean {
  const r = K.PLAYER_R;
  const x0 = Math.floor(x - r), x1 = Math.floor(x + r), y0 = Math.floor(y - r), y1 = Math.floor(y + r);
  for (let ty = y0; ty <= y1; ty++) for (let tx = x0; tx <= x1; tx++) if (solidAt(w, tx, ty)) return true;
  return false;
}

export interface Hackable { kind: HackTarget['kind']; i: number; x: number; y: number; dist: number; label: string; action: string; cost: number }

export function hackables(w: World): Hackable[] {
  const p = w.player;
  const out: Hackable[] = [];
  w.cameras.forEach((c, i) => {
    const dist = Math.hypot(c.x - p.x, c.y - p.y);
    if (dist <= K.HACK_RANGE) out.push({ kind: 'camera', i, x: c.x, y: c.y, dist, label: 'CAMERA', action: 'LOOP CAMERA', cost: K.COST_LOOP });
  });
  w.doors.forEach((d, i) => {
    const dist = Math.hypot(d.x + 0.5 - p.x, d.y + 0.5 - p.y);
    if (dist <= K.HACK_RANGE) out.push({ kind: 'door', i, x: d.x + 0.5, y: d.y + 0.5, dist, label: 'DOOR', action: d.locked ? 'UNLOCK DOOR' : 'LOCK DOOR', cost: K.COST_DOOR });
  });
  w.lasers.forEach((l, i) => {
    let best = 1e9, bx = 0, by = 0;
    for (const c of l.cells) {
      const d = Math.hypot(c.x + 0.5 - p.x, c.y + 0.5 - p.y);
      if (d < best) { best = d; bx = c.x + 0.5; by = c.y + 0.5; }
    }
    if (best <= K.HACK_RANGE) out.push({ kind: 'laser', i, x: bx, y: by, dist: best, label: 'LASER GRID', action: 'CUT GRID', cost: K.COST_CUT });
  });
  out.sort((a, b) => a.dist - b.dist);
  return out;
}

function updateFocus(w: World): void {
  const list = hackables(w);
  const f = w.player.focus;
  if (f && list.some((h) => h.kind === f.kind && h.i === f.i)) return;
  w.player.focus = list.length ? { kind: list[0].kind, i: list[0].i } : null;
}

function cycleFocus(w: World): void {
  const list = hackables(w);
  if (!list.length) { w.player.focus = null; return; }
  const f = w.player.focus;
  const idx = f ? list.findIndex((h) => h.kind === f.kind && h.i === f.i) : -1;
  const n = list[(idx + 1) % list.length];
  w.player.focus = { kind: n.kind, i: n.i };
  emit(w, 'cycle', n.x, n.y);
}

function spend(w: World, cost: number): boolean {
  const p = w.player;
  if (p.energy + 1e-6 < cost) { toast(w, `NOT ENOUGH ENERGY (NEED ${cost})`); emit(w, 'deny'); return false; }
  p.energy -= cost;
  p.hackIdle = 0;
  return true;
}

export function tryHack(w: World): boolean {
  const f = w.player.focus;
  if (!f) { toast(w, 'NO DEVICE IN RANGE'); return false; }
  const list = hackables(w);
  const h = list.find((x) => x.kind === f.kind && x.i === f.i);
  if (!h) { toast(w, 'TARGET OUT OF RANGE'); return false; }
  if (f.kind === 'camera') {
    const c = w.cameras[f.i];
    if (c.loopT > 0) { toast(w, 'FEED ALREADY LOOPED'); return false; }
    if (!spend(w, K.COST_LOOP)) return false;
    c.loopT = K.LOOP_T; c.loopWatch = K.LOOP_WATCH; c.sus = 0; c.trackT = 0;
    w.stats.hacks.camera++;
    emit(w, 'hack', c.x, c.y, 'FEED LOOPED — 6s');
    toast(w, 'CAMERA LOOPED — 6 SECONDS BLIND');
    addRing(w, c.x, c.y, 1.5, 'hack', 0.8);
  } else if (f.kind === 'door') {
    const d = w.doors[f.i];
    if (!d.locked) {
      const dx = d.x + 0.5, dy = d.y + 0.5;
      if (Math.hypot(w.player.x - dx, w.player.y - dy) < 0.8 || w.guards.some((g) => Math.hypot(g.x - dx, g.y - dy) < 0.8)) { toast(w, 'DOOR OBSTRUCTED'); return false; }
    }
    if (!spend(w, K.COST_DOOR)) return false;
    d.locked = !d.locked;
    if (d.locked) d.open = false;
    w.stats.hacks.door++;
    emit(w, 'hack', d.x + 0.5, d.y + 0.5);
    toast(w, d.locked ? 'DOOR LOCKED' : 'DOOR UNLOCKED');
    addRing(w, d.x + 0.5, d.y + 0.5, 1.2, 'hack', 0.8);
  } else {
    const l = w.lasers[f.i];
    if (l.cutT > 0) { toast(w, 'GRID ALREADY DOWN'); return false; }
    if (!spend(w, K.COST_CUT)) return false;
    l.cutT = K.CUT_T;
    w.stats.hacks.laser++;
    emit(w, 'hack', h.x, h.y);
    toast(w, 'GRID CUT — 5 SECONDS. ALARM ECHO SENT');
    addRing(w, l.echo.x, l.echo.y, K.ECHO_RADIUS, 'alarm', 0.9);
    hearNoise(w, l.echo.x, l.echo.y, K.ECHO_RADIUS, 'alarm');
  }
  return true;
}

export function dropDecoy(w: World): boolean {
  const p = w.player;
  if (w.decoy) { toast(w, 'DECOY ALREADY ACTIVE'); return false; }
  if (p.hidden) return false;
  if (!spend(w, K.COST_DECOY)) return false;
  let x = p.x, y = p.y;
  const dx = Math.cos(p.dir), dy = Math.sin(p.dir);
  for (let s = 0.25; s <= 3; s += 0.25) {
    const nx = p.x + dx * s, ny = p.y + dy * s;
    if (solidAt(w, Math.floor(nx), Math.floor(ny))) break;
    x = nx; y = ny;
  }
  w.decoy = { x, y, t: K.DECOY_T, pingT: 0 };
  w.stats.hacks.decoy++;
  emit(w, 'decoy', x, y);
  toast(w, 'DECOY DEPLOYED — 8 SECONDS');
  return true;
}

function playerNear(w: World, x: number, y: number, r: number): boolean {
  return Math.hypot(w.player.x - x, w.player.y - y) <= r;
}

function enterLocker(w: World, idx: number): void {
  const p = w.player;
  const l = w.map.lockers[idx];
  const lx = l.x + 0.5, ly = l.y + 0.5;
  for (const g of w.guards) {
    if ((g.state === 'alert' || g.state === 'suspicious') && Math.hypot(g.x - p.x, g.y - p.y) < 7) {
      const s = canSee(w, g.x, g.y, g.dir, Math.PI * 2, g.range);
      if (s.seen) {
        g.lockerTarget = { x: lx, y: ly };
        g.state = 'alert'; g.lostT = 0; g.path = null; g.repathT = 0; g.decoy = false;
      }
    }
  }
  p.hidden = true; p.locker = idx; p.x = lx; p.y = ly; p.moving = false;
  emit(w, 'locker', lx, ly);
  toast(w, 'HIDDEN IN LOCKER');
}

function leaveLocker(w: World): void {
  const p = w.player;
  const l = w.map.lockers[p.locker];
  const opts: [number, number][] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  p.hidden = false;
  for (const g of w.guards) g.lockerTarget = null;
  for (const [dx, dy] of opts) {
    if (!solidAt(w, l.x + dx, l.y + dy)) { p.x = l.x + dx + 0.5; p.y = l.y + dy + 0.5; break; }
  }
  p.locker = -1;
  emit(w, 'locker', p.x, p.y);
}

function interact(w: World): void {
  const p = w.player;
  if (p.hidden) { leaveLocker(w); return; }
  let bestD = 1.65, bestKind = '', bestI = -1;
  w.map.lockers.forEach((l, i) => {
    const d = Math.hypot(l.x + 0.5 - p.x, l.y + 0.5 - p.y);
    if (d < bestD) { bestD = d; bestKind = 'locker'; bestI = i; }
  });
  w.terminals.forEach((t, i) => {
    const d = Math.hypot(t.x + 0.5 - p.x, t.y + 0.5 - p.y);
    if (d < bestD) { bestD = d; bestKind = 'terminal'; bestI = i; }
  });
  if (bestKind === 'locker') { enterLocker(w, bestI); return; }
  if (bestKind === 'terminal') {
    const t = w.terminals[bestI];
    if (t.done) { toast(w, 'TERMINAL ALREADY COMPLETE'); return; }
    if (t.lockT > 0) { toast(w, `TERMINAL LOCKED OUT (${Math.ceil(t.lockT)}s)`); return; }
    const need = (t.def.effect.needs ?? []).filter((o) => !w.objectives[o]);
    if (need.length) {
      const names = need.map((o) => w.def.objectives.find((d) => d.id === o)?.label ?? o);
      toast(w, `ACCESS DENIED — ${names.join(', ')}`);
      emit(w, 'deny');
      return;
    }
    const len = t.def.len + DIFF[w.difficulty].puzzleExtra;
    w.puzzle = newPuzzle(w, bestI, len, t.def.time);
    emit(w, 'puzzleStart', t.x + 0.5, t.y + 0.5);
    return;
  }
  toast(w, 'NOTHING TO INTERACT WITH');
}

function startFinale(w: World): void {
  const f = w.def.finale;
  if (!f) return;
  w.finale = { active: true, t: f.countdown, started: true };
  w.blackout = true;
  w.alert = Math.max(w.alert, f.alert);
  w.alertPeak = Math.max(w.alertPeak, w.alert);
  for (const c of w.cameras) { c.loopT = 9999; c.sus = 0; }
  const term = w.terminals.find((t) => t.def.effect.finale);
  const tgt = term ? nearestWalkable(w, term.x + 0.5, term.y + 1.5) : { x: w.player.x, y: w.player.y };
  for (const g of w.guards) if (g.state !== 'alert') enterSuspicious(w, g, tgt.x, tgt.y, 60, true);
  emit(w, 'finale');
  emit(w, 'checkpoint', w.player.x, w.player.y, 'purge');
  toast(w, 'PURGE RUNNING — LIGHTS OUT. REACH THE LIFT');
}

function puzzleSucceeded(w: World, pz: NonNullable<World['puzzle']>): void {
  const t = w.terminals[pz.terminal];
  t.done = true;
  w.stats.terminals++;
  const e = t.def.effect;
  if (e.objective) { w.objectives[e.objective] = true; emit(w, 'objective', undefined, undefined, e.objective); }
  if (e.unlock) {
    const d = w.doors.find((x) => x.id === e.unlock);
    if (d) { d.locked = false; toast(w, 'DOOR UNLOCKED BY TERMINAL'); }
  }
  emit(w, 'puzzleOk', t.x + 0.5, t.y + 0.5);
  toast(w, `${t.def.label} — COMPLETE`);
  if (e.finale) startFinale(w);
}

function puzzleFailed(w: World, pz: NonNullable<World['puzzle']>): void {
  const t = w.terminals[pz.terminal];
  t.lockT = 8;
  const cx = t.x + 0.5, cy = t.y + 0.5;
  emit(w, 'puzzleFail', cx, cy);
  toast(w, 'INTRUSION DETECTED — TERMINAL LOCKED OUT');
  addAlert(w, 8);
  addRing(w, cx, cy, 7, 'alarm', 0.9);
  hearNoise(w, cx, cy, 7, 'alarm');
  w.stats.alarms++;
}

// ---- main step --------------------------------------------------------------------
export function step(w: World, inp: Input, dt: number = STEP): void {
  if (w.status !== 'playing') return;
  const p = w.player;
  w.time += dt;
  const diff = DIFF[w.difficulty];

  // puzzle
  if (w.puzzle) {
    const pz = w.puzzle;
    const prev = pz.phase;
    if (pz.phase === 'show' || pz.phase === 'input') {
      if (inp.cancel || inp.interact) { w.puzzle = null; }
      else {
        if (inp.dir >= 0) {
          const r = puzzleInput(pz, inp.dir);
          if (r === 'progress') emit(w, 'puzzleKey', undefined, undefined, undefined, pz.input.length);
          else if (r === 'fail') emit(w, 'puzzleBad');
        }
        updatePuzzle(pz, dt);
        const after = pz.phase as string;
        if (prev === 'input' && after === 'ok') puzzleSucceeded(w, pz);
        else if (prev === 'input' && after === 'fail') puzzleFailed(w, pz);
      }
    } else {
      updatePuzzle(pz, dt);
      if (pz.endT <= 0) w.puzzle = null;
    }
  } else {
    // interaction and hacks
    if (inp.interact) interact(w);
    if (!p.hidden) {
      if (inp.cycle) cycleFocus(w);
      if (inp.hack) tryHack(w);
      if (inp.decoy) dropDecoy(w);
    }
  }

  // movement
  p.sneak = inp.sneak;
  const mag = Math.hypot(inp.mx, inp.my);
  p.moving = false;
  if (!p.hidden && !w.puzzle && w.status === 'playing' && mag > 0.01) {
    const nx = inp.mx / Math.max(1, mag), ny = inp.my / Math.max(1, mag);
    const sp = (p.sneak ? K.SNEAK : K.WALK) * Math.min(1, mag);
    const mx = nx * sp * dt, my = ny * sp * dt;
    const ox = p.x, oy = p.y;
    if (!collides(w, p.x + mx, p.y)) p.x += mx;
    if (!collides(w, p.x, p.y + my)) p.y += my;
    p.moving = Math.hypot(p.x - ox, p.y - oy) > 1e-5;
    p.dir = turnToward(p.dir, Math.atan2(ny, nx), 14 * dt);
  }
  if (p.moving) {
    w.stats.moveT += dt;
    if (p.sneak) { w.stats.sneakT += dt; if (kindAt(w.map, Math.floor(p.x), Math.floor(p.y)) === 1 || w.blackout) w.stats.shadowSneakT += dt; }
    p.stepT -= dt;
    if (p.stepT <= 0) {
      p.stepT = p.sneak ? K.SNEAK_NOISE_EVERY : K.WALK_NOISE_EVERY;
      const r = p.sneak ? K.SNEAK_NOISE : K.WALK_NOISE;
      hearNoise(w, p.x, p.y, r, 'step');
      addRing(w, p.x, p.y, r, p.sneak ? 'sneak' : 'step', 0.5);
      emit(w, 'step', p.x, p.y, undefined, p.sneak ? 1 : 0);
    }
  } else p.stepT = 0;

  // energy
  p.hackIdle += dt;
  if (p.hackIdle >= 1) p.energy = Math.min(K.ENERGY_MAX, p.energy + diff.regen * dt);

  // devices
  updateDevices(w, dt);
  pickups(w);
  updateFocus(w);
  updateCameras(w, dt);
  updateGuards(w, dt);

  // alert decay and failure conditions
  if (!w.guards.some((g) => g.state === 'alert') && !w.cameras.some((c) => c.trackT > 0)) w.alert = Math.max(0, w.alert - 2 * dt);
  if (w.alert >= K.LOCKDOWN && w.status === 'playing') { w.status = 'compromised'; w.reason = 'lockdown'; }
  for (const r of w.rings) r.age += dt;
  w.rings = w.rings.filter((r) => r.age < r.ttl);

  if (w.finale.active) {
    const before = Math.ceil(w.finale.t);
    w.finale.t -= dt;
    if (Math.ceil(w.finale.t) !== before && w.finale.t > 0) emit(w, 'countdown', undefined, undefined, undefined, Math.ceil(w.finale.t));
    if (w.finale.t <= 0 && w.status === 'playing') { w.status = 'compromised'; w.reason = 'countdown'; }
  }

  // extraction
  const required = w.def.objectives.filter((o) => o.id !== 'extract' && !o.optional);
  const ready = required.every((o) => w.objectives[o.id]);
  if (ready && w.status === 'playing' && playerNear(w, w.map.exit.x + 0.5, w.map.exit.y + 0.5, 0.75)) {
    w.objectives.extract = true;
    w.status = 'complete';
    emit(w, 'complete');
  }
  if (w.status === 'compromised') emit(w, 'compromised', p.x, p.y, w.reason);
}

function updateDevices(w: World, dt: number): void {
  const p = w.player;
  for (const d of w.doors) {
    d.msgCd -= dt;
    const dx = d.x + 0.5, dy = d.y + 0.5;
    const dist = Math.hypot(p.x - dx, p.y - dy);
    if (d.locked && d.card && p.cards.includes(d.card) && dist < 1.6) {
      d.locked = false;
      toast(w, `ACCESS GRANTED — ${CARD_NAME[d.card]} KEYCARD`);
      emit(w, 'door', dx, dy);
    } else if (d.locked && dist < 1.1 && d.msgCd <= 0) {
      d.msgCd = 2.5;
      toast(w, d.card ? `LOCKED — NEEDS ${CARD_NAME[d.card]} KEYCARD OR A HACK` : 'LOCKED — HACK IT OR FIND ANOTHER WAY');
      emit(w, 'deny');
    }
    const near = dist < 1.2 || w.guards.some((g) => Math.hypot(g.x - dx, g.y - dy) < 1.2);
    const open = !d.locked && near;
    if (open !== d.open) emit(w, 'door', dx, dy);
    d.open = open;
  }
  for (const l of w.lasers) {
    l.clock += dt;
    l.cutT = Math.max(0, l.cutT - dt);
    l.tripCd = Math.max(0, l.tripCd - dt);
    const per = l.period;
    const phaseOn = !per || ((l.clock + per.phase) % (per.on + per.off)) < per.on;
    l.active = l.cutT <= 0 && phaseOn;
    if (l.active && l.tripCd <= 0 && !p.hidden) {
      const tx = Math.floor(p.x), ty = Math.floor(p.y);
      if (kindAt(w.map, tx, ty) === T_LASER && w.def.lasers[w.map.ref[ty * w.map.w + tx]]?.id === l.id) {
        l.tripCd = 3;
        w.stats.alarms++;
        addAlert(w, 20);
        emit(w, 'laser', p.x, p.y);
        toast(w, 'LASER TRIPPED — ALARM');
        addRing(w, p.x, p.y, 10, 'alarm', 0.9);
        hearNoise(w, p.x, p.y, 10, 'alarm');
      }
    }
  }
  for (const t of w.terminals) t.lockT = Math.max(0, t.lockT - dt);
  if (w.decoy) {
    const dc = w.decoy;
    dc.t -= dt;
    dc.pingT -= dt;
    if (dc.pingT <= 0 && dc.t > 0) {
      dc.pingT = 1;
      addRing(w, dc.x, dc.y, K.DECOY_RADIUS, 'decoy', 0.9);
      emit(w, 'ping', dc.x, dc.y);
      hearNoise(w, dc.x, dc.y, K.DECOY_RADIUS, 'decoy');
    }
    if (dc.t <= 0) w.decoy = null;
  }
}

function pickups(w: World): void {
  const p = w.player;
  for (const it of w.items) {
    if (it.taken || !playerNear(w, it.x + 0.5, it.y + 0.5, 0.6) || p.hidden) continue;
    if (it.kind === 'energy') {
      if (p.energy >= K.ENERGY_MAX - 1) continue;
      p.energy = Math.min(K.ENERGY_MAX, p.energy + K.ENERGY_CELL);
      toast(w, 'ENERGY CELL +40');
    } else if (it.kind === 'card' && it.card) {
      p.cards.push(it.card);
      if (it.card) w.objectives['card_' + it.card] = true;
      toast(w, `${it.label} ACQUIRED`);
    } else {
      if (it.objective) w.objectives[it.objective] = true;
      toast(w, `${it.label} SECURED`);
      emit(w, 'objective', undefined, undefined, it.objective);
    }
    it.taken = true;
    emit(w, 'pickup', it.x + 0.5, it.y + 0.5, undefined, it.kind === 'energy' ? 0 : 1);
  }
  for (const c of w.checkpoints) {
    if (!c.hit && playerNear(w, c.x, c.y, 0.7)) {
      c.hit = true;
      w.cpHit++;
      emit(w, 'checkpoint', c.x, c.y, 'checkpoint');
      toast(w, 'CHECKPOINT SAVED');
    }
  }
}

function updateCameras(w: World, dt: number): void {
  for (const c of w.cameras) {
    c.spotCd = Math.max(0, c.spotCd - dt);
    if (c.loopT > 0) {
      c.loopT -= dt;
      c.seeing = false;
      c.sus = Math.max(0, c.sus - 40 * dt);
      if (c.loopWatch > 0) {
        c.loopWatch -= dt;
        if (c.loopWatch <= 0) {
          const tgt = nearestWalkable(w, c.x, c.y);
          for (const g of w.guards) if (g.zone === c.zone && g.state === 'patrol') enterSuspicious(w, g, tgt.x, tgt.y, 40, true);
        }
      }
      continue;
    }
    c.phase += c.speed * dt;
    if (c.trackT > 0) {
      c.trackT -= dt;
      c.dir = turnToward(c.dir, Math.atan2(w.player.y - c.y, w.player.x - c.x), 3 * dt);
    } else {
      c.dir = c.baseDir + c.sweep * Math.sin(c.phase);
    }
    const diff = DIFF[w.difficulty];
    const s = canSee(w, c.x, c.y, c.dir, c.fov, c.range * (diff.range));
    c.seeing = s.seen;
    if (s.seen) {
      c.sus = Math.min(100, c.sus + K.FILL_CAMERA * s.prox * diff.fill * dt);
      if (c.sus >= 100 && c.spotCd <= 0) {
        c.spotCd = 5;
        c.trackT = 4;
        c.sus = 60;
        w.stats.spotted++;
        addAlert(w, 15);
        emit(w, 'spot', c.x, c.y);
        toast(w, 'CAMERA SPOTTED YOU');
        for (const g of w.guards) if (g.zone === c.zone && g.state !== 'alert') enterSuspicious(w, g, w.player.x, w.player.y, 60, true);
      }
    } else c.sus = Math.max(0, c.sus - 25 * dt);
  }
}

// ---- results --------------------------------------------------------------------------
export interface MissionResult {
  time: number; par: number; score: number; rating: 'S' | 'A' | 'B' | 'C';
  peakAlert: number; spotted: number; alarms: number; retries: number; hacks: number; tags: string[];
}

export function computeResult(w: World): MissionResult {
  const s = w.stats;
  const hacks = s.hacks.camera + s.hacks.door + s.hacks.decoy + s.hacks.laser;
  const ghost = s.detections === 0 && s.alarms === 0 && s.retries === 0 && s.spotted === 0;
  let score = 1000 - 2 * Math.max(0, w.time - w.def.par) - 4 * w.alertPeak - 60 * s.spotted - 15 * s.alarms - 120 * s.retries + (ghost ? 150 : 0);
  score = Math.max(0, Math.min(1150, Math.round(score)));
  const rating = score >= 950 ? 'S' : score >= 800 ? 'A' : score >= 600 ? 'B' : 'C';
  const tags: string[] = [];
  if (ghost) tags.push('GHOST');
  if (hacks >= 4) tags.push('HACKER');
  if (s.hacks.decoy >= 1 && s.decoyPulls >= 1) tags.push('DECOY ARTIST');
  if (s.hacks.door >= 1) tags.push('LOCKPICKER');
  if (s.moveT > 1 && s.shadowSneakT / s.moveT >= 0.3) tags.push('SHADOW WALKER');
  if (s.alarms > 0) tags.push('LOUD');
  if (!tags.length) tags.push('IMPROVISER');
  return { time: w.time, par: w.def.par, score, rating, peakAlert: Math.round(w.alertPeak), spotted: s.spotted, alarms: s.alarms, retries: s.retries, hacks, tags };
}

export { findPath };
