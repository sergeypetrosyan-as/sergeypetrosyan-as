import { defineConfig } from 'vite';

// The repository serves GitHub Pages straight from the `main` branch, so the
// production bundle is written to `<repo>/games/mystical-western-vice/` and committed. A relative
// base keeps every asset URL valid under the `/sergeypetrosyan-as/` subpath.
export default defineConfig({
  base: './',
  build: {
    outDir: '../../games/mystical-western-vice',
    emptyOutDir: true,
    target: 'es2020',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 900,
  },
  server: { port: 5199, strictPort: true },
});
