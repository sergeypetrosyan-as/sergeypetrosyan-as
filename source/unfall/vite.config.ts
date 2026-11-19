import { defineConfig } from 'vite';

// GitHub Pages serves this repository from `main` / root, so the production
// bundle is written to `<repo>/games/unfall/` and committed (same model as every game).
// The renderer imports the shared 19_mystical-western palette/primitives from
// `<repo>/design/`, so the dev server may read that folder too (paths resolve from this root).
export default defineConfig({
  base: './',
  build: { outDir: '../../games/unfall', emptyOutDir: true, target: 'es2020', assetsInlineLimit: 0 },
  server: { port: 5220, strictPort: true, fs: { allow: ['.', '../../design/19_mystical-western'] } },
});
