import { mkdirSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

/**
 * Dev only: lets src/dev/capture.ts save rendered posters / preview GIFs into
 * ./capture (git-ignored) so they can be copied into the hub. Never part of a build.
 */
function captureSink(): Plugin {
  return {
    name: 'neon-tanks:capture-sink',
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
// bundle is written to `<repo>/games/neon-tanks/` and committed. A relative base
// keeps every asset URL valid under the `/sergeypetrosyan-as/` subpath.
export default defineConfig({
  base: './',
  plugins: [captureSink()],
  build: {
    outDir: '../../games/neon-tanks',
    emptyOutDir: true,
    target: 'es2020',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 900,
  },
  server: { port: 5230, strictPort: true },
});
