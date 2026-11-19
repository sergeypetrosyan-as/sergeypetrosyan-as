// 19_mystical-western type: Rye for short titles, Zilla Slab for labels and numbers,
// Public Sans for instructions. Self-hosted through @fontsource (no CDN).
import '@fontsource/rye/400.css';
import '@fontsource/zilla-slab/500.css';
import '@fontsource/zilla-slab/600.css';
import '@fontsource/zilla-slab/700.css';
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/600.css';
import './styles/main.css';
import { Game } from './game/Game';

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!c.getContext('webgl2');
  } catch {
    return false;
  }
}

function fail(message: string): void {
  document.getElementById('loading')?.classList.add('hidden');
  document.getElementById('title')?.classList.add('hidden');
  const fatal = document.getElementById('fatal')!;
  document.getElementById('fatalText')!.textContent = message;
  fatal.classList.remove('hidden');
}

function boot(): void {
  if (!webglAvailable()) {
    fail('Your browser could not start WebGL 2, which NEON VICE needs to render the city.');
    return;
  }
  const canvas = document.getElementById('scene') as HTMLCanvasElement;
  let game: Game;
  try {
    game = new Game(canvas);
  } catch (err) {
    console.error(err);
    fail('The game failed to start on this device. Details are in the browser console.');
    return;
  }
  game.start();
  // Let the first frames render (shader compile) before revealing the title.
  setTimeout(() => document.getElementById('loading')?.classList.add('hidden'), 120);
  window.addEventListener('pagehide', () => game.dispose(), { once: true });
  if (import.meta.env.DEV) (window as unknown as { __nv: unknown }).__nv = game;
}

// Yield briefly so the loading screen paints before the city is generated. Street signs are
// painted into canvases at build time, so wait (briefly) for their slab face first.
const signFont = document.fonts?.load('700 32px "Zilla Slab"').catch(() => undefined) ?? Promise.resolve();
Promise.race([signFont, new Promise((r) => setTimeout(r, 1500))]).then(() => setTimeout(boot, 30));
