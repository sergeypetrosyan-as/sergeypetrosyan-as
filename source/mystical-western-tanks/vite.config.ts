import { mkdirSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

/**
 * Dev only: lets src/dev/capture.ts save rendered posters / preview GIFs into
 * ./capture (git-ignored) so they can be copied into the hub. Never part of a build.
 */
function captureSink(): Plugin {
  return {
    name: 'mystical-western-tanks:capture-sink',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__capture/', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        const name = basename(decodeURIComponent((req.url ?? '').replace(/^\//, '').split('?')[0])).replace(/[^\w.-]/g, '');
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => {
          const dir = resolve(__dirname, 'capture');
          mkdirSync(dir, { recursive: true });
          writeFileSync(resolve(dir, name || 'capture.bin'), Buffer.concat(chunks));
          res.end('ok');
        });
      });
    },
  };
}

// GitHub Pages serves this repository straight from `main`, so the production
// bundle is written to `<repo>/games/mystical-western-tanks/` and committed. A relative base
// keeps every asset URL valid under the `/sergeypetrosyan-as/` subpath.
export default defineConfig({
  base: './',
  plugins: [captureSink()],
  build: {
    outDir: '../../games/mystical-western-tanks',
    emptyOutDir: true,
    target: 'es2020',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 900,
  },
  // The renderer imports the shared 19_mystical-western palette/primitives from
  // <repo>/design/, so the dev server may read that folder too (paths resolve from this root).
  server: { port: 5230, strictPort: true, fs: { allow: ['.', '../../design/19_mystical-western'] } },
});
