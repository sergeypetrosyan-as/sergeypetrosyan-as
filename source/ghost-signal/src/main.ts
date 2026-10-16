import '@fontsource/public-sans/latin-400';
import '@fontsource/public-sans/latin-600';
import '@fontsource/ibm-plex-mono/latin-400';
import '@fontsource/ibm-plex-mono/latin-500';
import '@fontsource/big-shoulders-display/latin-700';
import '@fontsource/big-shoulders-display/latin-800';
import './styles.css';
import { start } from './ui/app.ts';
import { posterKey, startPoster } from './ui/poster.ts';

try {
  const key = posterKey();
  if (key) startPoster(key); else start();
} catch (err) {
  // Last-resort error boundary: readable panel with a reset.
  const el = document.getElementById('app');
  if (el) {
    el.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'fatal';
    const t = document.createElement('h1'); t.textContent = 'Signal lost';
    const p = document.createElement('p'); p.textContent = 'The case file could not be opened. Resetting the saved data usually clears it.';
    const b = document.createElement('button'); b.className = 'btn primary'; b.textContent = 'Reset saved data';
    b.onclick = () => { try { localStorage.removeItem('ghost-signal:v1'); } catch { /* ignore */ } location.reload(); };
    box.append(t, p, b); el.append(box);
  }
  console.error(err);
}
