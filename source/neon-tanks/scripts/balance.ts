// Balance probe: kills and damage per weapon/hull over long bot matches.
// Run: node --experimental-strip-types scripts/balance.ts
import { World } from '../src/sim/world.ts';
import type { ArenaId, DifficultyId, ModeId } from '../src/sim/types.ts';

const byWeapon: Record<string, { kills: number; dmg: number; shots: number; hits: number; n: number }> = {};
const byHull: Record<string, { deaths: number; kills: number; n: number }> = {};
let totalKills = 0, totalTime = 0;
const cases: Array<[ArenaId, ModeId, DifficultyId]> = [['docks', 'tdm', 'veteran'], ['void', 'tdm', 'veteran'], ['docks', 'ffa', 'elite'], ['void', 'cp', 'rookie']];
for (const [arena, mode, difficulty] of cases) {
  for (let seed = 1; seed <= 3; seed++) {
    const w = new World({ mode, arena, difficulty, scoreLimit: 9999, timeLimit: 300, player: null, seed });
    for (let i = 0; i < 300 * 60; i++) { w.step(1 / 60); w.events.clear(); }
    totalTime += 300;
    for (const t of w.tanks) {
      const k = t.weapon.id;
      byWeapon[k] ??= { kills: 0, dmg: 0, shots: 0, hits: 0, n: 0 };
      byWeapon[k].kills += t.stats.kills; byWeapon[k].dmg += t.stats.damage; byWeapon[k].shots += t.stats.shots; byWeapon[k].hits += t.stats.hits; byWeapon[k].n++;
      const h = t.hull.id;
      byHull[h] ??= { deaths: 0, kills: 0, n: 0 };
      byHull[h].deaths += t.stats.deaths; byHull[h].kills += t.stats.kills; byHull[h].n++;
      totalKills += t.stats.kills;
    }
  }
}
const tankSeconds = totalTime * 8;
console.log(`avg life ${(tankSeconds / totalKills).toFixed(1)} s, kills/min/tank ${(totalKills / tankSeconds * 60).toFixed(2)}`);
for (const [k, v] of Object.entries(byWeapon)) console.log(k.padEnd(8), `kills/tank ${(v.kills / v.n).toFixed(1)}  dmg/tank ${(v.dmg / v.n).toFixed(0)}  acc ${(v.hits / Math.max(1, v.shots) * 100).toFixed(0)}%  n=${v.n}`);
for (const [k, v] of Object.entries(byHull)) console.log(k.padEnd(8), `kills/tank ${(v.kills / v.n).toFixed(1)}  deaths/tank ${(v.deaths / v.n).toFixed(1)}  n=${v.n}`);
