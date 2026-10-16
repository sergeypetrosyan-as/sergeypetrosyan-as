import { defineConfig } from 'vite';

// GitHub Pages serves this repository from `main` / root, so the production
// bundle is written to `<repo>/games/paradox-room/` and committed (same model as every game).
export default defineConfig({
  base: './',
  // Three.js puts the single bundle at ~630 kB (~170 kB gzip); that is expected for the 3D view.
  build: { outDir: '../../games/paradox-room', emptyOutDir: true, target: 'es2020', assetsInlineLimit: 0, chunkSizeWarningLimit: 800 },
  server: { port: 5232, strictPort: true },
});
