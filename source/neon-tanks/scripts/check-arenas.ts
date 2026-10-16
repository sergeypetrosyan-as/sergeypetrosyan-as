// Headless checks for NEON TANKS: OVERDRIVE.
// Run: node --experimental-strip-types scripts/check-arenas.ts
import { ARENA_IDS } from '../src/sim/arenas.ts';
import type { RayHit } from '../src/sim/collision.ts';
import { arenaRuntime, World } from '../src/sim/world.ts';
import type { ModeId } from '../src/sim/types.ts';

let pass = 0, fail = 0;
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { pass++; console.log(`PASS  ${name}${detail ? '  ' + detail : ''}`); }
  else { fail++; console.log(`FAIL  ${name}${detail ? '  ' + detail : ''}`); }
}

// ---- Geometry and navigation
for (const id of ARENA_IDS) {
  const t0 = performance.now();
  const { arena, col, nav } = arenaRuntime(id);
  const ms = performance.now() - t0;
  const edges = nav.nodes.reduce((n, x) => n + x.edges.length, 0);
  ok(`${id}: nav graph built`, nav.nodes.length > 150 && edges > nav.nodes.length * 2, `${nav.nodes.length} nodes, ${edges} edges, ${ms.toFixed(0)} ms`);
  const all = [...arena.spawns.blue, ...arena.spawns.magenta, ...arena.spawns.ffa];
  for (const sp of all) {
    const y = col.surfaceHeight(sp.x, sp.z, 0);
    ok(`${id}: spawn (${sp.x},${sp.z}) clear`, !col.circleBlocked(sp.x, sp.z, y, 2.3));
  }
  const cp = arena.controlPoint;
  const cpNode = nav.nearest(cp.x, cp.y, cp.z);
  ok(`${id}: control point has a node on its level`, Math.abs(nav.nodes[cpNode].y - cp.y) < 0.6);
  for (const sp of all) {
    const from = nav.nearest(sp.x, 0, sp.z);
    const reach = nav.reachable(from);
    ok(`${id}: spawn (${sp.x},${sp.z}) reaches control point`, reach.has(cpNode));
  }
  // Every spawn can get to every other spawn (both teams can meet).
  const spawnNodes = all.map((s) => nav.nearest(s.x, 0, s.z));
  const r0 = nav.reachable(spawnNodes[0]);
  ok(`${id}: all spawns mutually reachable`, spawnNodes.every((n) => r0.has(n)));
  for (const p of arena.pickups) {
    const n = nav.nearest(p.x, p.y, p.z);
    ok(`${id}: pickup ${p.kind} at (${p.x},${p.y},${p.z}) reachable`, r0.has(n) && Math.abs(nav.nodes[n].y - p.y) < 0.8);
  }
  // Every platform level present in the graph must be reachable from spawn.
  const levels = new Set(nav.nodes.map((n) => Math.round(n.y * 2) / 2));
  const reachedLevels = new Set([...r0].map((i) => Math.round(nav.nodes[i].y * 2) / 2));
  ok(`${id}: elevated levels reachable`, [...levels].filter((l) => l >= 3).every((l) => reachedLevels.has(l)), `levels ${[...levels].filter((l) => l >= 3).join(', ')}`);
  const unreached = nav.nodes.length - r0.size;
  ok(`${id}: few orphan nodes`, unreached < nav.nodes.length * 0.08, `${unreached} unreachable`);

  // Ray casts.
  const hit: RayHit = { t: 0, x: 0, y: 0, z: 0, nx: 0, ny: 0, nz: 0 };
  ok(`${id}: downward ray hits ground`, col.raycast(30, 10, -60, 0, -1, 0, 100, hit) && Math.abs(hit.y) < 3.1);
  ok(`${id}: ray toward boundary is blocked`, col.raycast(0, 1.5, 0, 1, 0, 0, 200, hit) && hit.x < arena.half + 0.01);
}

// ---- Bot matches
const modes: ModeId[] = ['tdm', 'ffa', 'cp'];
for (const arenaId of ARENA_IDS) {
  for (const mode of modes) {
    const w = new World({ mode, arena: arenaId, difficulty: 'veteran', scoreLimit: 999, timeLimit: 240, player: null, seed: 7 });
    const travelled = new Array(w.tanks.length).fill(0);
    const lastPos = w.tanks.map((t) => ({ x: t.x, z: t.z }));
    let shots = 0, kills = 0, captures = 0, nan = false, outOfBounds = false;
    const weaponsFired = new Set<string>();
    const steps = 240 * 60;
    const t0 = performance.now();
    for (let i = 0; i < steps; i++) {
      w.step(1 / 60);
      for (let k = 0; k < w.events.count; k++) {
        const e = w.events.get(k);
        if (e.type === 'fire') { shots++; weaponsFired.add(e.kind); }
        if (e.type === 'kill') kills++;
        if (e.type === 'capture') captures++;
      }
      w.events.clear();
      w.tanks.forEach((t, j) => {
        if (!Number.isFinite(t.x + t.y + t.z + t.heading)) nan = true;
        if (Math.abs(t.x) > w.arena.half + 0.5 || Math.abs(t.z) > w.arena.half + 0.5) outOfBounds = true;
        if (t.alive) travelled[j] += Math.hypot(t.x - lastPos[j].x, t.z - lastPos[j].z);
        lastPos[j].x = t.x; lastPos[j].z = t.z;
      });
    }
    const ms = performance.now() - t0;
    const tag = `${arenaId}/${mode}`;
    ok(`${tag}: simulation stable`, !nan && !outOfBounds);
    ok(`${tag}: bots fight`, shots > 200 && kills >= 6, `${shots} shots, ${kills} kills in 4 min, ${weaponsFired.size} weapon types, ${(ms / steps * 1000).toFixed(0)} µs/step`);
    const minTravel = Math.min(...travelled);
    ok(`${tag}: every bot moves around`, minTravel > 150, `min ${minTravel.toFixed(0)} m, max ${Math.max(...travelled).toFixed(0)} m`);
    const jams = w.brains.reduce((n, b) => n + b.unstuckCount, 0);
    ok(`${tag}: bots rarely jam`, jams < 30, `${jams} unstuck manoeuvres across ${w.brains.length} bots`);
    if (mode === 'cp') ok(`${tag}: control point changes hands`, captures >= 1 && w.score.blue + w.score.magenta > 20, `${captures} captures, score ${w.score.blue}-${w.score.magenta}`);
    if (mode === 'tdm') ok(`${tag}: team score tracks kills`, w.score.blue + w.score.magenta === w.tanks.reduce((n, t) => n + t.stats.kills, 0));
  }
}

// ---- Match end
{
  const w = new World({ mode: 'tdm', arena: 'docks', difficulty: 'elite', scoreLimit: 5, timeLimit: 600, player: null, seed: 3 });
  let ended = false;
  for (let i = 0; i < 600 * 60 && !ended; i++) {
    w.step(1 / 60);
    for (let k = 0; k < w.events.count; k++) if (w.events.get(k).type === 'matchEnd') ended = true;
    w.events.clear();
  }
  ok('tdm: match ends at the score limit', ended && w.status === 'ended' && (w.score.blue >= 5 || w.score.magenta >= 5), `${w.score.blue}-${w.score.magenta} after ${w.time.toFixed(0)} s`);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
