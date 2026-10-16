import { defineConfig } from 'vite';

// GitHub Pages serves this repository from `main` / root, so the production
// bundle is written to `<repo>/games/neon-overdrive/` and committed (same model as every game).
export default defineConfig({
  base: './',
  build: { outDir: '../../games/neon-overdrive', emptyOutDir: true, target: 'es2020', assetsInlineLimit: 0, chunkSizeWarningLimit: 800 },
  server: { port: 5231, strictPort: true },
});
