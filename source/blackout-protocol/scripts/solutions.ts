// Scripted operative used by check-sim.ts to prove every mission is solvable.
// The bot is deliberately cautious: it stops when the next step would enter a guard or camera cone.
import type { Difficulty, Input, MissionDef, Vec, World } from '../src/sim/types.ts';
import { NO_INPUT, T_LASER } from '../src/sim/types.ts';
import { kindAt, solidAt } from '../src/sim/grid.ts';
import { DIFF, canSee } from '../src/sim/vision.ts';
import { createWorld, step } from '../src/sim/world.ts';

export type Step =
  | { go: [number, number]; walk?: boolean; lasers?: boolean; reckless?: boolean }
  | { wait: number }
  | { until: (w: World) => boolean; label?: string }
  | { hack: 'camera' | 'door' | 'laser'; i: number }
  | { decoy: true }
  | { interact: true }
  | { puzzle: true };

const COST = { camera: 35, door: 15, laser: 30 };

function botPath(w: World, sx: number, sy: number, tx: number, ty: number, lasers: boolean): Vec[] | null {
  const W = w.map.w, H = w.map.h;
  const ok = (x: number, y: number): boolean => !solidAt(w, x, y) && (lasers || kindAt(w.map, x, y) !== T_LASER);
  if (!ok(tx, ty)) return null;
  const prev = new Int32Array(W * H).fill(-2);
  const q = [sy * W + sx];
  prev[sy * W + sx] = -1;
  const goal = ty * W + tx;
  let head = 0;
  const nb = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  while (head < q.length) {
    const cur = q[head++];
    if (cur === goal) break;
    const cx = cur % W, cy = (cur / W) | 0;
    for (const [dx, dy] of nb) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H || prev[ny * W + nx] !== -2 || !ok(nx, ny)) continue;
      if (dx !== 0 && dy !== 0 && (!ok(cx + dx, cy) || !ok(cx, cy + dy))) continue;
      prev[ny * W + nx] = cur;
      q.push(ny * W + nx);
    }
  }
  if (prev[goal] === -2) return null;
  const rev: Vec[] = [];
  for (let c = goal; c !== sy * W + sx; c = prev[c]) rev.push({ x: (c % W) + 0.5, y: ((c / W) | 0) + 0.5 });
  return rev.reverse();
}

function exposedAt(w: World, x: number, y: number, sneak: boolean): boolean {
  const p = w.player;
  const ox = p.x, oy = p.y, os = p.sneak;
  p.x = x; p.y = y; p.sneak = sneak;
  const dm = DIFF[w.difficulty].range * 1.1;
  let e = false;
  for (const g of w.guards) if (canSee(w, g.x, g.y, g.dir, g.fov + 0.35, g.range * dm).seen) { e = true; break; }
  if (!e && !w.blackout) for (const c of w.cameras) if (c.loopT <= 0 && canSee(w, c.x, c.y, c.dir, c.fov + 0.35, c.range * 1.1).seen) { e = true; break; }
  p.x = ox; p.y = oy; p.sneak = os;
  return e;
}

export function runBot(def: MissionDef, steps: Step[], difficulty: Difficulty = 'normal', onTick?: (w: World, si: number) => void): { world: World; note: string } {
  const w = createWorld(def, difficulty);
  let note = 'ok';
  let curStep = 0;
  const tick = (i: Partial<Input> = {}): void => { step(w, { ...NO_INPUT, ...i }); onTick?.(w, curStep); };
  const alive = (): boolean => w.status === 'playing';

  stepLoop: for (let si = 0; si < steps.length && alive(); si++) {
    const s = steps[si];
    curStep = si;
    if ('wait' in s) { for (let f = 0; f < s.wait * 60 && alive(); f++) tick(); continue; }
    if ('until' in s) {
      let f = 0;
      while (alive() && !s.until(w)) { tick({ sneak: true }); if (++f > 60 * 240) { note = `step ${si} until timeout ${s.label ?? ''}`; break stepLoop; } }
      continue;
    }
    if ('interact' in s) { tick({ interact: true, sneak: true }); continue; }
    if ('decoy' in s) { tick({ decoy: true, sneak: true }); continue; }
    if ('hack' in s) {
      const cost = COST[s.hack];
      let f = 0;
      while (alive() && w.player.energy < cost) { tick({ sneak: true }); if (++f > 60 * 60) { note = `step ${si} no energy`; break stepLoop; } }
      w.player.focus = { kind: s.hack, i: s.i };
      const before = w.stats.hacks.camera + w.stats.hacks.door + w.stats.hacks.laser;
      tick({ hack: true, sneak: true });
      const after = w.stats.hacks.camera + w.stats.hacks.door + w.stats.hacks.laser;
      if (after === before) { note = `step ${si} hack ${s.hack}#${s.i} failed (range?)`; break stepLoop; }
      continue;
    }
    if ('puzzle' in s) {
      let f = 0;
      while (alive() && w.puzzle) {
        const pz = w.puzzle;
        if (pz.phase === 'input' && pz.input.length < pz.seq.length) tick({ dir: pz.seq[pz.input.length], sneak: true });
        else tick({ sneak: true });
        if (++f > 60 * 60) { note = `step ${si} puzzle timeout`; break stepLoop; }
      }
      if (alive() && !w.terminals.some((t) => t.done)) { note = `step ${si} no puzzle running`; break stepLoop; }
      continue;
    }
    // go
    const gx = Math.floor(s.go[0]), gy = Math.floor(s.go[1]);
    const goalC = { x: gx + 0.5, y: gy + 0.5 };
    const sneak = !s.walk;
    let f = 0, idle = 0;
    while (alive()) {
      const p = w.player;
      if (Math.hypot(goalC.x - p.x, goalC.y - p.y) < 0.18) break;
      if (++f > 60 * 400) { note = `step ${si} go ${gx},${gy} timeout (idle ${idle})`; break stepLoop; }
      const path = botPath(w, Math.floor(p.x), Math.floor(p.y), gx, gy, !!s.lasers);
      if (!path) { note = `step ${si} go ${gx},${gy} no path`; break stepLoop; }
      while (path.length > 1 && Math.hypot(path[0].x - p.x, path[0].y - p.y) < 0.14) path.shift();
      const n = path.length ? path[0] : goalC;
      const d = Math.hypot(n.x - p.x, n.y - p.y) || 1;
      const dx = (n.x - p.x) / d, dy = (n.y - p.y) / d;
      const sp = sneak ? 1.5 : 3.2;
      if (!s.reckless) {
        const nx = p.x + dx * sp * 0.3, ny = p.y + dy * sp * 0.3;
        if (exposedAt(w, nx, ny, sneak) && !exposedAt(w, p.x, p.y, sneak)) { idle++; tick({ sneak }); continue; }
      }
      tick({ mx: dx, my: dy, sneak });
    }
  }
  if (w.status !== 'complete' && note === 'ok') note = `ended ${w.status}${w.reason ? '/' + w.reason : ''}`;
  return { world: w, note };
}

// ---- helpers for predicates -----------------------------------------------------------
export const laserOffFor = (idx: number, secs: number) => (w: World): boolean => {
  const l = w.lasers[idx];
  if (l.cutT > 0) return true;
  if (!l.period) return false;
  const cyc = l.period.on + l.period.off;
  const t = (l.clock + l.period.phase) % cyc;
  return t >= l.period.on && cyc - t >= secs;
};

/** True during the 0.25 s window that ends `lead` seconds before the beam switches off (so a dash arrives mid off-window). */
export const laserDepart = (idx: number, lead: number) => (w: World): boolean => {
  const l = w.lasers[idx];
  if (!l.period) return true;
  const cyc = l.period.on + l.period.off;
  const t = (l.clock + l.period.phase) % cyc;
  return t >= l.period.on - lead - 0.25 && t < l.period.on - lead;
};

// ---- per-mission solutions --------------------------------------------------------------
export const SOLUTIONS: Record<string, Step[]> = {
  'cold-entry': [
    { go: [4, 6] },
    { until: (w) => w.guards[0].x > 10 && Math.cos(w.guards[0].dir) > 0.5, label: 'corridor guard passes east' },
    { go: [14, 8] }, { interact: true },
    { until: (w) => w.guards[0].x < 12 && Math.cos(w.guards[0].dir) < -0.5, label: 'guard passes locker westbound' },
    { interact: true },
    { go: [21, 9], walk: true },
    { hack: 'door', i: 0 }, { hack: 'camera', i: 0 },
    { go: [24, 8], walk: true, reckless: true }, { go: [24, 5], walk: true, reckless: true }, { go: [26, 2], walk: true, reckless: true },
    { interact: true }, { puzzle: true },
    { go: [24, 6] },
    { until: (w) => w.guards[0].x < 17 && Math.cos(w.guards[0].dir) < -0.5, label: 'guard heads west' },
    { go: [24, 8], walk: true, reckless: true }, { go: [20, 10], walk: true }, { go: [20, 13] }, { go: [2, 13], walk: true },
  ],
  'lattice': [
    { go: [29, 12] },
    { until: (w) => w.guards[0].x < 24 && Math.cos(w.guards[0].dir) < -0.5, label: 'corridor guard heads west' },
    { until: laserDepart(0, 2.2), label: 'grid a dash window' },
    { hack: 'camera', i: 0 },
    { go: [30, 5], lasers: true, reckless: true },
    { go: [33, 2] },
    { go: [34, 5] }, { interact: true },
    { until: (w) => laserDepart(0, 2.0)(w) && Math.hypot(w.guards[0].x - 30, w.guards[0].y - 8) > 9 && w.guards[0].state === 'patrol', label: 'grid a exit window, corridor clear' },
    { interact: true },
    { go: [30, 8], lasers: true, reckless: true },
    { go: [29, 12], walk: true, reckless: true },
    { go: [26, 8], walk: true, reckless: true }, { interact: true },
    { until: (w) => w.guards[0].x < 10 && Math.cos(w.guards[0].dir) < -0.5, label: 'corridor guard far west' },
    { interact: true },
    { go: [20, 8], walk: true, reckless: true },
    { hack: 'camera', i: 1 }, { hack: 'laser', i: 1 },
    { go: [18, 8], walk: true, reckless: true }, { go: [18, 5], walk: true, reckless: true, lasers: true }, { go: [21, 2], walk: true, reckless: true },
    { go: [13, 3], walk: true, reckless: true },
    { hack: 'door', i: 1 },
    { go: [10, 3], walk: true }, { go: [5, 6] },
    { until: (w) => w.guards[0].x > 20 && Math.cos(w.guards[0].dir) > 0.5, label: 'corridor guard east of the west door' },
    { go: [5, 8], walk: true }, { go: [5, 11], walk: true }, { go: [2, 17], walk: true },
  ],
  'glass-archive': [
    { go: [6, 14] },
    { until: (w) => w.guards[0].x > 12 && Math.cos(w.guards[0].dir) > 0.5, label: 'corridor guard passes east' },
    { go: [6, 9] },
    { go: [3, 2] },
    { go: [6, 9] },
    { until: (w) => w.guards[0].x > 12 && Math.cos(w.guards[0].dir) > 0.5, label: 'corridor guard passes east again' },
    { go: [19, 11] }, { wait: 0.2 }, { go: [19, 9] },
    { until: (w) => w.guards[3].x < 17, label: 'hub guard at west end' },
    { go: [25, 6] },
    { until: laserDepart(0, 0), label: 'hub laser dash window' },
    { go: [25, 4], lasers: true, reckless: true },
    { go: [22, 2] },
    { go: [25, 4] },
    { until: laserDepart(0, 0.05), label: 'hub laser dash window (exit)' },
    { go: [25, 6], lasers: true, reckless: true },
    { until: (w) => w.guards[3].x < 15.3 && w.guards[0].x < 12 && Math.cos(w.guards[0].dir) < -0.5, label: 'hub guard west end, corridor guard far west' },
    { go: [19, 11], walk: true, reckless: true },
    { go: [31, 12], walk: true, reckless: true }, { go: [32, 11], walk: true, reckless: true }, { wait: 0.2 }, { go: [32, 9], walk: true, reckless: true },
    { go: [34, 7] }, { go: [36, 8], reckless: true }, { interact: true }, { puzzle: true },
    { go: [34, 7], reckless: true }, { go: [32, 9] },
    { until: (w) => w.guards[0].x < 24 && Math.cos(w.guards[0].dir) < -0.5, label: 'corridor guard west of the dock door' },
    { go: [32, 12], walk: true, reckless: true }, { go: [32, 15], walk: true }, { go: [37, 19], walk: true },
  ],
  'blackout': [
    { go: [35, 12] },
    { until: (w) => w.guards[0].x < 27 && Math.cos(w.guards[0].dir) < -0.5, label: 'hall guard heads west' },
    { go: [36, 5], walk: true, reckless: true },
    { go: [40, 3] }, { interact: true }, { puzzle: true },
    { go: [36, 5] },
    { until: (w) => w.guards[0].x < 20 && Math.cos(w.guards[0].dir) < -0.5, label: 'hall guard far west' },
    { go: [28, 8], walk: true, reckless: true }, { interact: true },
    { until: (w) => w.guards[0].x > 31 && Math.cos(w.guards[0].dir) > 0.5, label: 'hall guard passes east of the locker' },
    { interact: true },
    { go: [7, 8], walk: true, reckless: true }, { go: [7, 5], walk: true, reckless: true },
    { go: [3, 3] }, { interact: true }, { puzzle: true },
    { go: [13, 4] }, { go: [15, 3], reckless: true }, { go: [21, 2], reckless: true },
    { go: [15, 3], reckless: true }, { go: [13, 4] }, { go: [7, 6] },
    { until: (w) => w.guards[0].x > 14 && Math.cos(w.guards[0].dir) > 0.5, label: 'hall guard east of the west gaps' },
    { go: [7, 12], walk: true, reckless: true },
    { go: [3, 15] }, { go: [3, 19] }, { interact: true }, { puzzle: true },
    { go: [7, 12] },
    { until: (w) => w.guards[0].x > 24 && Math.cos(w.guards[0].dir) > 0.5, label: 'hall guard east of the core door' },
    { go: [21, 11], walk: true, reckless: true }, { go: [23, 12], walk: true, reckless: true },
    { interact: true }, { puzzle: true },
    { go: [21, 15], walk: true, reckless: true }, { go: [21, 17], walk: true, reckless: true },
    { hack: 'door', i: 2 },
    { go: [21, 21], walk: true, reckless: true },
  ],
};
