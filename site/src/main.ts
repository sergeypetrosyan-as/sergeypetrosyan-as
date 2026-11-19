import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/animations.css';
import { initNav } from './lib/nav';
import { initPreviews } from './lib/previews';

initNav();
initPreviews(window.matchMedia('(prefers-reduced-motion: reduce)'));

document.querySelectorAll<HTMLElement>('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));

// Decorative animations stop while nobody is looking.
document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('is-paused', document.hidden));
