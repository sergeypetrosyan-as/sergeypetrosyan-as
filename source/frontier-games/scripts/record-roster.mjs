// Records the arcade's starting roster (the games the hub listed before the ninety were added).
// Usage: node scripts/record-roster.mjs   -> docs/arcade-90/starting-roster.json
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const src = readFileSync(resolve(repo, 'site/src/data/games.ts'), 'utf8').replace(/\r\n/g, '\n');
const blocks = src.split(/\n {2}\{\n {4}id: /).slice(1);
const grab = (b, k) => {
  const i = b.indexOf(`\n    ${k}:`);
  if (i < 0) return null;
  const rest = b.slice(i + k.length + 6).trimStart();
  const q = rest[0];
  let out = '';
  for (let j = 1; j < rest.length && rest[j] !== q; j++) { if (rest[j] === '\\') j++; out += rest[j]; }
  return out;
};
const games = blocks.map((b) => ({ id: b.match(/^'([^']+)'/)[1], title: grab(b, 'title'), tagline: grab(b, 'tagline'), playUrl: grab(b, 'playUrl'), thumbnail: grab(b, 'thumbnail') }));
const head = execSync('git rev-parse --short HEAD', { cwd: repo }).toString().trim();
writeFileSync(resolve(repo, 'docs/arcade-90/starting-roster.json'), JSON.stringify({ recorded: '2026-11-19', source: `site/src/data/games.ts at commit ${head}`, games }, null, 2) + '\n');
console.log(games.map((g) => `${g.id} | ${g.title} | ${g.playUrl} | ${g.tagline}`).join('\n'));
