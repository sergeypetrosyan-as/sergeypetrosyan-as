import { SITE } from '../data/site';
import { icon } from '../lib/html';
import { Logo } from './Logo';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#games', label: 'Games' },
  { href: '#about', label: 'About' },
];

export function Navbar(playHref: string): string {
  return `
<header class="nav" data-nav>
  <a class="skip-link" href="#games">Skip to games</a>
  <nav class="nav-inner container" aria-label="Primary">
    <a class="brand" href="#home" aria-label="${SITE.name} — home">
      ${Logo()}
      <span class="brand-word">NEON<span>ARCADE</span></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" data-nav-toggle>
      <span class="nav-toggle-open">${icon('menu', 22)}</span>
      <span class="nav-toggle-close">${icon('close', 22)}</span>
      <span class="sr-only">Menu</span>
    </button>
    <div class="nav-menu" id="nav-menu" data-nav-menu>
      <ul class="nav-links">
        ${LINKS.map((l) => `<li><a class="nav-link" href="${l.href}" data-nav-link>${l.label}</a></li>`).join('')}
        <li><a class="nav-link" href="${SITE.githubProfile}" target="_blank" rel="noopener noreferrer">GitHub ${icon('external', 13)}</a></li>
      </ul>
      <a class="btn btn-primary btn-sm nav-cta" href="${playHref}">${icon('play', 14)} PLAY NOW</a>
    </div>
  </nav>
</header>`;
}
