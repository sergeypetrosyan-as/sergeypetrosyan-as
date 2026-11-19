// Validates every level: required markers, terminal text, and a rough reachability
// pass (jumps of up to 4 tiles up / a 4-tile gap, falls anywhere, springs ~10 up).
// Usage: npm run check:levels
import { build } from 'esbuild';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = mkdtempSync(join(tmpdir(), 'nj-levels-'));
const out = join(dir, 'levels.mjs');
await build({
  stdin: {
    contents: "export { LEVELS } from './src/world/levels/index.ts'; export { Level } from './src/world/Level.ts';",
    resolveDir: process.cwd(),
    loader: 'ts',
  },
  bundle: true, format: 'esm', platform: 'node', outfile: out, logLevel: 'error',
});
const { LEVELS, Level } = await import(pathToFileURL(out).href);
rmSync(dir, { recursive: true, force: true });

const SOLID = new Set([1, 2, 4, 5, 6, 7, 9, 10]);
let failed = false;
for (const def of LEVELS) {
  const problems = [];
  const lv = new Level(def);
  // Chunk lines must not be wider than the chunk's floor.
  def.chunks.forEach((c, i) => {
    const w = c[c.length - 1].length;
    c.forEach((r, j) => { if (r.length > w) problems.push(`chunk ${i} row ${j} is ${r.length} wide (floor is ${w})`); });
  });
  const count = (ch) => lv.spawnsOf(ch).length;
  if (count('S') !== 1) problems.push(`needs exactly one start, has ${count('S')}`);
  if (count('G') + count('K') !== 1) problems.push('needs exactly one exit gate or boss');
  if (count('*') !== 3) problems.push(`needs 3 shards, has ${count('*')}`);
  if (count('T') !== 1) problems.push(`needs 1 token, has ${count('T')}`);
  if (count('i') !== def.terminals.length) problems.push(`${count('i')} terminals but ${def.terminals.length} texts`);

  // Standing surfaces: solid tiles, one-ways, and the travel range of moving/timed platforms.
  const support = new Uint8Array(lv.w * lv.h);
  const mark = (x, y) => { if (x >= 0 && x < lv.w && y >= 0 && y < lv.h) support[y * lv.w + x] = 1; };
  for (let i = 0; i < lv.tiles.length; i++) if (SOLID.has(lv.tiles[i]) || lv.tiles[i] === 3) support[i] = 1;
  for (const s of lv.spawns) {
    if ('cg12'.includes(s.ch)) mark(s.tx, s.ty);
    if (s.ch === 'M') for (let d = 0; d <= 5; d++) for (let k = 0; k < s.w; k++) mark(s.tx + d + k, s.ty);
    if (s.ch === 'V') for (let d = 0; d <= 6; d++) for (let k = 0; k < s.w; k++) mark(s.tx + k, s.ty - d);
    if (s.ch === 'B') mark(s.tx, s.ty + 1);
  }
  const open = (x, y) => y < 0 || (x >= 0 && x < lv.w && y < lv.h && !SOLID.has(lv.at(x, y)));
  const stand = (x, y) => x >= 0 && x < lv.w && y >= 0 && y + 1 < lv.h && open(x, y) && support[(y + 1) * lv.w + x] === 1;
  const springs = new Set(lv.spawnsOf('B').map((s) => s.ty * lv.w + s.tx));
  const start = lv.spawnsOf('S')[0];
  const seen = new Uint8Array(lv.w * lv.h);
  const queue = [];
  const push = (x, y) => { if (stand(x, y) && !seen[y * lv.w + x]) { seen[y * lv.w + x] = 1; queue.push([x, y]); } };
  // Drop the start marker onto the ground below it.
  let sy = start.ty;
  while (!stand(start.tx, sy) && sy < lv.h - 1) sy++;
  push(start.tx, sy);
  while (queue.length) {
    const [x, y] = queue.shift();
    const rise = springs.has(y * lv.w + x) ? 10 : 4;
    for (let dx = -6; dx <= 6; dx++) {
      for (let ty = Math.max(0, y - rise); ty < lv.h; ty++) {
        const drop = ty - y;
        const reach = drop <= 0 ? 5 : 5 + Math.ceil(drop / 2);
        if (Math.abs(dx) <= Math.min(6, reach)) push(x + dx, ty);
      }
    }
  }
  const near = (tx, ty, up = 4) => {
    for (let x = tx - 3; x <= tx + 3; x++) for (let y = ty; y <= ty + up + 1 && y < lv.h; y++) {
      if (seen[y * lv.w + x]) return true;
    }
    for (const sp of lv.spawnsOf('B')) if (seen[sp.ty * lv.w + sp.tx] && Math.abs(sp.tx - tx) <= 8 && sp.ty - ty <= 11) return true;
    return false;
  };
  for (const s of lv.spawns) {
    if (!'*TGCo'.includes(s.ch)) continue;
    if (!near(s.tx, s.ty)) problems.push(`'${s.ch}' at column ${s.tx}, row ${s.ty} looks unreachable`);
  }
  const shown = problems.filter((p) => !p.startsWith("'o'"));
  const coins = problems.length - shown.length;
  console.log(`${def.id} ${def.name.padEnd(18)} ${lv.w}x${lv.h}  volts ${count('o')}  enemies ${[...'sdfjtypk'].reduce((n, c) => n + count(c), 0)}${coins ? `  (${coins} volts flagged)` : ''}`);
  for (const p of shown) { console.log('   ✗ ' + p); failed = true; }
}
if (failed) process.exit(1);
console.log('All levels pass.');
