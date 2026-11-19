import '@fontsource/spectral/latin-400.css';
import '@fontsource/spectral/latin-400-italic.css';
// 19_mystical-western type: Rye for short titles, Zilla Slab for labels and numbers, Public Sans for reading.
// Spectral (italic margin prose) and Caveat (Ilse's hand) stay for the notes.
import '@fontsource/rye/latin-400.css';
import '@fontsource/zilla-slab/latin-500.css';
import '@fontsource/zilla-slab/latin-600.css';
import '@fontsource/zilla-slab/latin-700.css';
import '@fontsource/public-sans/latin-400.css';
import '@fontsource/public-sans/latin-600.css';
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

/** The lever letters are painted into canvases once, so wait (briefly) for the slab face. */
function whenFonts(): Promise<unknown> {
  const f = document.fonts;
  if (!f?.load) return Promise.resolve();
  const want = Promise.all(['700 40px "Zilla Slab"', '400 40px "Rye"'].map((d) => f.load(d).catch(() => [])));
  return Promise.race([want, new Promise((r) => setTimeout(r, 1500))]);
}

whenFonts().then(boot, boot);
