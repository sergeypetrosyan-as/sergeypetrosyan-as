import '@fontsource/rye/400.css';
import '@fontsource/zilla-slab/500.css';
import '@fontsource/zilla-slab/600.css';
import '@fontsource/zilla-slab/700.css';
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/600.css';
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
  // Signs and billboards bake their painted lettering once, so wait briefly for the faces.
  try {
    await Promise.race([
      Promise.all([document.fonts.load('700 40px "Zilla Slab"'), document.fonts.load('400 40px Rye')]),
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
