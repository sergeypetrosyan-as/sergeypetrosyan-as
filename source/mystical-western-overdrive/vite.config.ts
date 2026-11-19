import { defineConfig } from 'vite';

// GitHub Pages serves this repository from `main` / root, so the production
// bundle is written to `<repo>/games/mystical-western-overdrive/` and committed (same model as every game).
// The theme module lives in `<repo>/design/19_mystical-western/`, so the dev server may read the repo root.
export default defineConfig({
  base: './',
  build: { outDir: '../../games/mystical-western-overdrive', emptyOutDir: true, target: 'es2020', assetsInlineLimit: 0, chunkSizeWarningLimit: 800 },
  server: { port: 5231, strictPort: true, fs: { allow: ['../..'] } },
});
