import { defineConfig } from 'vite';

// GitHub Pages serves this repository from `main` / root, so the production
// bundle is written to `<repo>/unfall/` and committed (same model as /neon-vice/).
export default defineConfig({
  base: './',
  build: { outDir: '../../unfall', emptyOutDir: true, target: 'es2020', assetsInlineLimit: 0 },
  server: { port: 5220, strictPort: true },
});
