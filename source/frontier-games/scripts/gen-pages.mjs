// Generates the real HTML files Vite builds: games/<id>/index.html for each concept, and the catalog's noscript list.
// Run by `npm run prep`. Safe to re-run; it only writes files that differ.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONCEPTS } from '../concepts.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23150607'/%3E%3Cpath d='M16 4l3.5 8 8.5.8-6.4 5.7 2 8.5L16 22.600l-7.600 4.400 2-8.500L4 12.800l8.500-.8z' fill='%23E30016'/%3E%3C/svg%3E";

function write(file, text) {
  const p = resolve(root, file);
  mkdirSync(dirname(p), { recursive: true });
  if (existsSync(p) && readFileSync(p, 'utf8') === text) return;
  writeFileSync(p, text);
}

for (const c of CONCEPTS) {
  write(`games/${c.id}/index.html`, `<!doctype html>
<html lang="en" data-game="${c.id}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#150607" />
  <meta name="description" content="${esc(c.title)}: ${esc(c.line)} A small browser game in the Mystical Western Arcade." />
  <title>${esc(c.title)} | Mystical Western Arcade</title>
  <link rel="icon" href="${ICON}" />
  <script type="module" src="/src/boot.ts"></script>
</head>
<body>
  <div id="app"></div>
  <noscript><p style="padding:24px;font-family:system-ui;color:#F1EDE7;background:#150607">${esc(c.title)} needs JavaScript. <a href="../../frontier/" style="color:#E96B74">Back to the catalog</a></p></noscript>
</body>
</html>
`);
}

const list = CONCEPTS.map((c) => `<li><a href="../games/${c.id}/">${esc(c.title)}</a>: ${esc(c.line)}</li>`).join('\n      ');
write('frontier/index.html', `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#150607" />
  <meta name="description" content="Ninety small browser games in the Mystical Western Arcade: timing, deduction, spatial puzzles, planning, simulation, exploration, action, memory, duels and craft." />
  <title>Observatory Catalog | Mystical Western Arcade</title>
  <link rel="icon" href="${ICON}" />
  <script type="module" src="/src/catalog.ts"></script>
</head>
<body>
  <div id="catalog">
    <noscript>
      <h1>Observatory Catalog</h1>
      <ul>
      ${list}
      </ul>
    </noscript>
  </div>
</body>
</html>
`);
console.log(`pages: ${CONCEPTS.length} games + catalog`);
