import '@fontsource/barlow-condensed/latin-600-italic.css';
import '@fontsource/barlow-condensed/latin-700-italic.css';
import '@fontsource/barlow/latin-400.css';
import '@fontsource/barlow/latin-500.css';
import '@fontsource/barlow/latin-600.css';
import './styles.css';
import { Game } from './game/Game';

function fail(text: string): void {
  document.querySelectorAll<HTMLElement>('.screen').forEach((s) => (s.hidden = true));
  const t = document.getElementById('fatalText');
  if (t) t.textContent = text;
  const f = document.getElementById('s-fatal');
  if (f) f.hidden = false;
}

function hasWebGL2(): boolean {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function boot(): void {
  const canvas = document.getElementById('view') as HTMLCanvasElement | null;
  if (!canvas) {
    fail('The game view is missing from the page. Reload to try again.');
    return;
  }
  const q = new URLSearchParams(location.search);
  const want3d = q.get('renderer') !== '2d' && hasWebGL2();
  if (!want3d && !document.createElement('canvas').getContext('2d')) {
    fail('This browser cannot draw the game: neither WebGL nor Canvas 2D is available. Try a recent Chrome, Edge, Firefox or Safari.');
    return;
  }
  let game: Game;
  try {
    game = new Game(canvas, {
      want3d,
      demo: q.get('demo') === '1',
      demoTrack: Number(q.get('track') ?? 0) || 0,
      quality: (['low', 'medium', 'high'] as const).find((x) => x === q.get('quality')) ?? null,
      demoAt: Math.max(0, Math.min(600, Number(q.get('at') ?? 9) || 0)),
    });
  } catch (err) {
    console.error(err);
    fail('Neon Overdrive failed to start. Reload the page; if it keeps happening, the details are in the browser console.');
    return;
  }
  game.start();
  window.addEventListener('pagehide', () => game.dispose(), { once: true });
  if (import.meta.env.DEV) (window as unknown as { __overdrive: unknown }).__overdrive = game;
}

boot();
