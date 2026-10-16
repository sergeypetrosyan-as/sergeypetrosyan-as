import { defineConfig } from 'vite';

// GitHub Pages serves this repository from `main` / root, so the production
// bundle is written to `<repo>/games/blackout-protocol/` and committed (same model as every game).
export default defineConfig({
  base: './',
  build: { outDir: '../../games/blackout-protocol', emptyOutDir: true, target: 'es2020', assetsInlineLimit: 0 },
  server: { port: 5234, strictPort: true },
});
