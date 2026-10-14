import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { GAMES } from './src/data/games';
import { isInternalUrl, isPlayable } from './src/types/game';
import { renderBody, sitemap, structuredData } from './src/render';

/** The repository root is what GitHub Pages serves (`main` / root). */
const REPO_ROOT = resolve(__dirname, '..');
const PUBLIC_DIR = resolve(__dirname, 'public');

/** Resolves a repo-root relative URL (`./games/neon-vice/`) to a file on disk. */
function fileFor(url: string): string {
  const clean = url.replace(/^\.\//, '').split(/[?#]/)[0];
  const path = clean === '' || clean.endsWith('/') ? `${clean}index.html` : clean;
  const inRepo = join(REPO_ROOT, path);
  return existsSync(inRepo) ? inRepo : join(PUBLIC_DIR, path);
}

/** Fails the build if any playable game or artwork points at a missing file. */
function validateRegistry(): Plugin {
  return {
    name: 'neon-arcade:validate-registry',
    apply: 'build',
    buildStart() {
      const problems: string[] = [];
      const ids = new Set<string>();
      for (const g of GAMES) {
        if (ids.has(g.id)) problems.push(`duplicate game id "${g.id}"`);
        ids.add(g.id);
        for (const asset of [g.thumbnail, g.previewGif]) {
          if (asset && !existsSync(fileFor(asset))) problems.push(`${g.id}: missing artwork ${asset}`);
        }
        if (isPlayable(g)) {
          if (isInternalUrl(g.playUrl)) {
            if (!existsSync(fileFor(g.playUrl))) problems.push(`${g.id}: playUrl ${g.playUrl} has no index.html in the repository`);
          } else if (!/^https:\/\//.test(g.playUrl)) {
            problems.push(`${g.id}: playUrl must be "./path/" or an https URL`);
          }
        }
      }
      if (problems.length) this.error(`Game registry is invalid:\n  - ${problems.join('\n  - ')}`);
    },
  };
}

/** Injects the pre-rendered page and structured data; emits sitemap.xml. */
function prerender(): Plugin {
  return {
    name: 'neon-arcade:prerender',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('<!--app-->', renderBody()).replace('<!--structured-data-->', structuredData()),
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
    },
  };
}

const TYPES: Record<string, string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.gif': 'image/gif', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.json': 'application/json' };

/** Dev only: serve the real games and shared assets from the repo root so cards launch locally. */
function serveRepoGames(): Plugin {
  const prefixes = ['/games/', '/assets/'];
  return {
    name: 'neon-arcade:serve-repo-games',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0];
        if (!prefixes.some((p) => url.startsWith(p))) return next();
        let file = normalize(join(REPO_ROOT, decodeURIComponent(url)));
        if (!file.startsWith(REPO_ROOT)) return next();
        if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
        if (!existsSync(file)) return next();
        res.setHeader('Content-Type', TYPES[extname(file)] ?? 'application/octet-stream');
        createReadStream(file).pipe(res);
      });
    },
  };
}

// GitHub Pages serves this repository from `main` / root, so the hub builds
// straight into the repo root: index.html + favicon/robots/sitemap/OG image,
// with hashed bundles under arcade/assets. Nothing else in the root is touched
// (emptyOutDir is off; scripts/clean.mjs clears only arcade/assets).
export default defineConfig({
  base: './',
  plugins: [validateRegistry(), prerender(), serveRepoGames()],
  build: {
    outDir: REPO_ROOT,
    emptyOutDir: false,
    assetsDir: 'arcade/assets',
    target: 'es2020',
  },
  server: { port: 5210, strictPort: true },
});
