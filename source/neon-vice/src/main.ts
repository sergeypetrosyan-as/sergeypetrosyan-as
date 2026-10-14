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

// Yield briefly so the loading screen paints before the city is generated.
setTimeout(boot, 30);
