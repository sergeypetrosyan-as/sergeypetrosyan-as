import { defineConfig } from 'vite';

// GitHub Pages serves this repository from `main` / root, so the production
// bundle is written to `<repo>/games/void-survivor/` and committed (same model as every game).
export default defineConfig({
  base: './',
  build: { outDir: '../../games/void-survivor', emptyOutDir: true, target: 'es2020', assetsInlineLimit: 0, chunkSizeWarningLimit: 900 },
  // the shared 19_mystical-western palette and primitives live in <repo>/design and are imported directly
  server: { port: 5235, strictPort: true, fs: { allow: ['.', '../../design/19_mystical-western'] } },
});
