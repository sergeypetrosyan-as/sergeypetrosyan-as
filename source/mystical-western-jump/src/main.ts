import '@fontsource/rye/latin-400.css';
import '@fontsource/zilla-slab/latin-700.css';
import '@fontsource/public-sans/latin-400.css';
import '@fontsource/public-sans/latin-600.css';
import './styles.css';
import { Game } from './game/Game';

function fail(text: string): void {
  document.getElementById('title')?.classList.add('hidden');
  document.getElementById('fatalText')!.textContent = text;
  document.getElementById('fatal')!.classList.remove('hidden');
}

async function boot(): Promise<void> {
  const pix = document.getElementById('pix') as HTMLCanvasElement;
  const glow = document.getElementById('glow') as HTMLCanvasElement;
  if (!pix.getContext('2d')) {
    fail('Canvas 2D is unavailable. Try a recent Chrome, Edge, Firefox or Safari.');
    return;
  }
  // The title uses Rye and the HUD Zilla Slab; wait briefly so the title doesn't reflow.
  try {
    await Promise.race([Promise.all([document.fonts.load('16px Rye'), document.fonts.load('700 16px "Zilla Slab"')]), new Promise((r) => setTimeout(r, 1500))]);
  } catch {
    /* fall back to system faces */
  }
  let game: Game;
  try {
    game = new Game(pix, glow);
  } catch (err) {
    console.error(err);
    fail('MYSTICAL WESTERN JUMP failed to start. Details are in the browser console.');
    return;
  }
  game.start();
  window.addEventListener('pagehide', () => game.dispose(), { once: true });
  // Dev builds expose the game for scripted play-testing.
  if (import.meta.env.DEV) {
    const { playtest } = await import('./dev/playtest');
    Object.assign(window, { __nj: game, __pt: playtest });
  }
}

void boot();
