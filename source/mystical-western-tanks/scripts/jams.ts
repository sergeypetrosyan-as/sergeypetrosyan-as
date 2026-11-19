// Diagnostic: where do bots get jammed? node --experimental-strip-types scripts/jams.ts docks cp
import { World } from '../src/sim/world.ts';
import type { ArenaId, ModeId } from '../src/sim/types.ts';
const arena = (process.argv[2] ?? 'docks') as ArenaId;
const mode = (process.argv[3] ?? 'cp') as ModeId;
const w = new World({ mode, arena, difficulty: 'veteran', scoreLimit: 999, timeLimit: 240, player: null, seed: 7 });
const last = w.brains.map((b) => b.unstuckCount);
const spots: string[] = [];
for (let i = 0; i < 240 * 60; i++) {
  w.step(1 / 60);
  w.events.clear();
  w.brains.forEach((b, k) => {
    if (b.unstuckCount !== last[k]) {
      last[k] = b.unstuckCount;
      const t = b.tank;
      let near = 0;
      for (const o of w.tanks) if (o !== t && o.alive && Math.hypot(o.x - t.x, o.z - t.z) < 6) near++;
      spots.push(`${t.name.padEnd(9)} (${t.x.toFixed(0)},${t.y.toFixed(1)},${t.z.toFixed(0)}) state=${b.state} nearTanks=${near}`);
    }
  });
}
console.log(spots.join('\n'));
