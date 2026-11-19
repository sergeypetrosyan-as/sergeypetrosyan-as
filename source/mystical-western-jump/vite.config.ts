import { defineConfig } from 'vite';

// GitHub Pages serves this repository from `main` / root, so the production
// bundle is written to `<repo>/games/mystical-western-jump/` and committed (same model as every game).
// The 19_mystical-western palette and canvas primitives are imported from
// `<repo>/design/19_mystical-western/`, so the dev server may read that folder too.
export default defineConfig({
  base: './',
  build: { outDir: '../../games/mystical-western-jump', emptyOutDir: true, target: 'es2020', assetsInlineLimit: 0 },
  server: { port: 5230, strictPort: true, fs: { allow: ['.', '../../design/19_mystical-western'] } },
});
