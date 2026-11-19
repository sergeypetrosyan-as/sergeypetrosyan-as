// Renders public/frontier/covers/<id>.svg for every concept from src/meta/<id>.mjs (cover ops).
// A concept without meta gets a plain placeholder so the catalog never breaks; verify.mjs flags those.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CONCEPTS, CATEGORIES } from '../concepts.mjs';
import { renderCover, OP_NAMES } from '../src/core/cover.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/frontier/covers');
mkdirSync(outDir, { recursive: true });
let placeholders = 0;
const problems = [];
for (const c of CONCEPTS) {
  const cat = CATEGORIES.find((x) => x.id === c.category);
  const file = resolve(root, `src/meta/${c.id}.mjs`);
  let ops = [['stars', 40, 5], ['moon', 50, 48, 18, 0.3], ['mesa', 140, 'mesa']];
  if (existsSync(file)) {
    const meta = (await import(pathToFileURL(file).href)).default;
    if (!Array.isArray(meta.cover) || meta.cover.length < 3) problems.push(`${c.id}: cover needs at least 3 ops`);
    else {
      for (const o of meta.cover) if (!OP_NAMES.includes(o[0])) problems.push(`${c.id}: unknown cover op "${o[0]}"`);
      ops = meta.cover;
    }
  } else placeholders++;
  writeFileSync(resolve(outDir, `${c.id}.svg`), renderCover(c, cat, ops));
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`covers: ${CONCEPTS.length} written, ${placeholders} placeholders`);
