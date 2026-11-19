import '@fontsource/rye/400.css';
import '@fontsource/zilla-slab/500.css';
import '@fontsource/zilla-slab/600.css';
import '@fontsource/zilla-slab/700.css';
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/600.css';
import './styles.css';
import { Game } from './game/Game.ts';

function webgl2(): boolean {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

function fail(message: string): void {
  document.getElementById('loading')?.classList.add('hidden');
  document.getElementById('fatalText')!.textContent = message;
  document.getElementById('fatal')!.classList.remove('hidden');
}

function boot(): void {
  if (!webgl2()) {
    fail('Your browser could not start WebGL 2, which MYSTICAL WESTERN TANKS needs to render the arena.');
    return;
  }
  const bar = document.getElementById('loadBar');
  if (bar) bar.style.width = '60%';
  let game: Game;
  try {
    game = new Game(document.getElementById('scene') as HTMLCanvasElement);
  } catch (err) {
    console.error(err);
    fail('The game failed to start on this device. Details are in the browser console.');
    return;
  }
  game.start();
  if (bar) bar.style.width = '100%';
  // Let the first frames compile shaders before revealing the menu.
  window.setTimeout(() => document.getElementById('loading')?.classList.add('hidden'), 150);
  window.addEventListener('pagehide', () => game.dispose(), { once: true });
  if (import.meta.env.DEV || new URLSearchParams(location.search).has('debug')) {
    (window as unknown as { __nt: Game }).__nt = game;
  }
  if (import.meta.env.DEV) void import('./dev/capture.ts').then((m) => m.install(game));
}

/// Yield so the loading screen paints first; give the slab face a moment so baked sign textures use it.
window.setTimeout(() => {
  const faces = Promise.all([document.fonts.load('700 50px "Zilla Slab"'), document.fonts.load('400 40px Rye')]).catch(() => undefined);
  void Promise.race([faces, new Promise((r) => setTimeout(r, 1500))]).then(boot);
}, 30);
