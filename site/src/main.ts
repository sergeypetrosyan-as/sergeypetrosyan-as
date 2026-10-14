import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/animations.css';
import { initNav } from './lib/nav';
import { initReveal } from './lib/reveal';
import { initHeroMotion } from './lib/heroMotion';
import { initPreviews } from './lib/previews';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

initNav();
initReveal(reducedMotion.matches);
initPreviews();
initHeroMotion(reducedMotion);

document.querySelectorAll<HTMLElement>('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));

// Decorative animations stop while nobody is looking.
document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('is-paused', document.hidden));
