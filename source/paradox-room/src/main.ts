import '@fontsource/spectral/latin-400.css';
import '@fontsource/spectral/latin-500.css';
import '@fontsource/spectral/latin-400-italic.css';
import '@fontsource/barlow-condensed/latin-500.css';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/caveat/latin-500.css';
import './ui/styles.css';
import { Game } from './state/game.ts';

function boot(): void {
  const canvas = document.getElementById('view') as HTMLCanvasElement | null;
  const status = document.getElementById('hudMsg');
  window.addEventListener('error', () => {
    if (status) {
      status.textContent = 'Something went wrong. Reload the page to continue.';
      status.classList.add('show');
    }
  });
  if (!canvas) return;
  try {
    new Game(canvas);
  } catch (err) {
    const p = document.createElement('p');
    p.className = 'fatal';
    p.textContent = 'PARADOX ROOM could not start in this browser: it needs either WebGL 2 or a 2D canvas, and neither is available. Try another browser, or turn hardware acceleration back on.';
    document.body.appendChild(p);
    void err;
  }
}

boot();
