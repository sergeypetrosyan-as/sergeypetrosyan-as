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
  // The HUD and menus use the pixel face; wait briefly so the title doesn't reflow.
  try {
    await Promise.race([document.fonts.load('16px "Press Start 2P"'), new Promise((r) => setTimeout(r, 1500))]);
  } catch {
    /* fall back to system faces */
  }
  let game: Game;
  try {
    game = new Game(pix, glow);
  } catch (err) {
    console.error(err);
    fail('NEON JUMP failed to start. Details are in the browser console.');
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
