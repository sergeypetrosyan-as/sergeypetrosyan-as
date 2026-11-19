import type { Game } from '../types/game';
import { isPlayable } from '../types/game';
import { SITE } from '../data/site';
import { esc, extLinkAttrs, icon } from '../lib/html';
import { GameCard, NextSlotCard, controlsList, platformBadges } from './GameCard';
import { Logo } from './Logo';

/** Moon phases mark the passage from one section to the next. */
export function MoonRule(): string {
  const phases = [0.42, 0.28, 0.14, 0, 0.14, 0.28, 0.42];
  return `<div class="moon-rule" aria-hidden="true">${phases
    .map((p, i) => `<span class="moon" style="--p:${p};--s:${i < 3 ? -1 : 1}"></span>`)
    .join('')}</div>`;
}

export function GameGrid(games: Game[]): string {
  const playable = games.filter(isPlayable).length;
  return `
<section class="section games" id="games" aria-labelledby="games-title">
  <div class="container">
    <header class="section-head">
      <p class="kicker">The deck · ${playable} playable</p>
      <h2 class="section-title" id="games-title">Pick a card, play the game</h2>
      <p class="section-lead">Every card opens a full game in this tab. Hover a card to watch it move.</p>
    </header>
    <div class="game-grid">
      ${games.map((g, i) => GameCard(g, i)).join('')}
      ${NextSlotCard(games.length)}
    </div>
  </div>
</section>`;
}

export function FeaturedGame(game: Game | undefined): string {
  if (!game || !isPlayable(game)) return '';
  const media = game.previewGif ?? game.thumbnail;
  return `
<section class="section featured" id="featured" aria-labelledby="featured-title">
  <div class="container">
    ${MoonRule()}
    <article class="spotlight">
      <div class="spotlight-media">
        <img src="${esc(media)}" alt="${esc(game.thumbnailAlt)}" class="spotlight-card" width="360" height="600" loading="lazy" decoding="async" />
      </div>
      <div class="spotlight-body">
        <p class="kicker">Card of the night</p>
        <h2 class="spotlight-title" id="featured-title">${esc(game.title)}</h2>
        <p class="spotlight-tagline">${esc(game.tagline)}</p>
        <p class="spotlight-desc">${esc(game.description)}</p>
        <p class="card-genres">${game.genre.map((g) => `<span>${esc(g)}</span>`).join('')}</p>
        ${controlsList(game.controls, 'controls controls-lg')}
        <div class="spotlight-meta">${platformBadges(game)}<span class="tech">${game.tech.map(esc).join(' · ')}</span></div>
        <div class="spotlight-actions">
          <a class="btn btn-primary btn-lg" href="${esc(game.playUrl)}"${extLinkAttrs(game.playUrl)}>${icon('play', 16)} Play ${esc(game.title)}</a>
          ${game.sourceUrl ? `<a class="btn btn-ghost" href="${esc(game.sourceUrl)}" target="_blank" rel="noopener noreferrer">${icon('code', 16)} Source code</a>` : ''}
        </div>
      </div>
    </article>
  </div>
</section>`;
}

export function About(): string {
  return `
<section class="section about" id="about" aria-labelledby="about-title">
  <div class="container">
    ${MoonRule()}
    <div class="about-grid">
      <div class="about-copy">
        <p class="kicker">The developer</p>
        <h2 class="section-title" id="about-title">Built in code, powered by curiosity</h2>
        <p class="about-lead">I build interactive web experiences, explore creative frontend engineering, and turn ideas into playable digital worlds.</p>
        <p>I’m ${esc(SITE.owner)}, a ${esc(SITE.role.toLowerCase())} working mostly in TypeScript and the React ecosystem. This arcade is where I experiment outside of product work — rendering, game feel, motion and audio, all running straight in the browser.</p>
        <div class="about-actions">
          <a class="btn btn-primary" href="${SITE.githubProfile}" target="_blank" rel="noopener noreferrer">${icon('github', 16)} GitHub profile</a>
          <a class="btn btn-ghost" href="${SITE.repository}" target="_blank" rel="noopener noreferrer">${icon('code', 16)} Arcade source</a>
        </div>
      </div>
      <ol class="about-stack" aria-label="Tools behind the arcade">
        <li><strong>TypeScript</strong><em>Typed game logic and UI</em></li>
        <li><strong>Three.js / WebGL</strong><em>Real-time 3D worlds</em></li>
        <li><strong>Canvas 2D</strong><em>Arcade-speed sprites</em></li>
        <li><strong>Web Audio</strong><em>Synthesized sound</em></li>
        <li><strong>Vite</strong><em>Fast static builds</em></li>
      </ol>
    </div>
  </div>
</section>`;
}

export function Footer(buildYear: number): string {
  return `
<footer class="footer">
  <div class="footer-horizon" aria-hidden="true"></div>
  <div class="container footer-inner">
    <div class="footer-brand">
      ${Logo(36, 'footer')}
      <div><strong>MYSTICAL WESTERN ARCADE</strong><p>Game over is just another start screen.</p></div>
    </div>
    <ul class="footer-links">
      <li><a href="${SITE.githubProfile}"${extLinkAttrs(SITE.githubProfile)}>${icon('github', 15)} GitHub profile</a></li>
      <li><a href="${SITE.repository}"${extLinkAttrs(SITE.repository)}>${icon('code', 15)} Repository</a></li>
      <li><a href="#home" class="back-top">${icon('arrowUp', 15)} Back to top</a></li>
    </ul>
    <p class="footer-copy">© <span data-year>${buildYear}</span> ${esc(SITE.owner)}. Original games, made with code.</p>
  </div>
</footer>`;
}
