import './styles.css';
import { Game } from './game/Game';

function fail(text: string): void {
  document.getElementById('title')?.classList.add('hidden');
  document.getElementById('fatalText')!.textContent = text;
  document.getElementById('fatal')!.classList.remove('hidden');
}

async function boot(): Promise<void> {
  const canvas = document.getElementById('view') as HTMLCanvasElement;
  if (!canvas.getContext('2d')) {
    fail('Canvas 2D is unavailable. Try a recent Chrome, Edge, Firefox or Safari.');
    return;
  }
  // Signs and billboards bake their neon text once, so wait briefly for the faces.
  try {
    await Promise.race([
      Promise.all([document.fonts.load('900 40px "Big Shoulders Display"'), document.fonts.load('700 40px "Big Shoulders Display"')]),
      new Promise((r) => setTimeout(r, 2500)),
    ]);
  } catch {
    /* fall back to system faces */
  }
  let game: Game;
  try {
    game = new Game(canvas);
  } catch (err) {
    console.error(err);
    fail('UNFALL failed to start. Details are in the browser console.');
    return;
  }
  game.start();
  window.addEventListener('pagehide', () => game.dispose(), { once: true });
  if (import.meta.env.DEV) (window as unknown as { __unfall: unknown }).__unfall = game;
}

void boot();
