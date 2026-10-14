import type { Game } from '../types/game';
import { isPlayable } from '../types/game';
import { SITE } from '../data/site';
import { esc, extLinkAttrs, icon } from '../lib/html';
import { GameCard, NextSlotCard, controlsList, platformBadges } from './GameCard';
import { Logo } from './Logo';

export function GameGrid(games: Game[]): string {
  const playable = games.filter(isPlayable).length;
  return `
<section class="section games" id="games" aria-labelledby="games-title">
  <div class="container">
    <header class="section-head" data-reveal>
      <p class="kicker"><span class="kicker-line"></span>LIBRARY <span class="sep">//</span> ${String(playable).padStart(2, '0')} PLAYABLE</p>
      <h2 class="section-title" id="games-title">SELECT YOUR GAME</h2>
      <p class="section-lead">Choose your world. Start playing.</p>
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
    <article class="spotlight accent-${game.accent}" data-reveal>
      <div class="spotlight-media">
        <img src="${esc(game.thumbnail)}" alt="" class="spotlight-poster" width="1024" height="576" loading="lazy" decoding="async" aria-hidden="true" />
        <img src="${esc(media)}" alt="${esc(game.thumbnailAlt)} (animated gameplay preview)" class="spotlight-gif" width="1024" height="576" loading="lazy" decoding="async" />
        <span class="spotlight-tag">${icon('spark', 14)} FEATURED</span>
      </div>
      <div class="spotlight-body">
        <p class="kicker"><span class="kicker-line"></span>SPOTLIGHT</p>
        <h2 class="spotlight-title" id="featured-title">${esc(game.title)}<span>${esc(game.tagline)}</span></h2>
        <p class="spotlight-desc">${esc(game.description)}</p>
        <p class="card-genres">${game.genre.map((g) => `<span>${esc(g)}</span>`).join('')}</p>
        ${controlsList(game.controls, 'controls controls-lg')}
        <div class="spotlight-meta">${platformBadges(game)}<span class="tech">${game.tech.map(esc).join(' · ')}</span></div>
        <div class="spotlight-actions">
          <a class="btn btn-primary btn-lg" href="${esc(game.playUrl)}"${extLinkAttrs(game.playUrl)}>${icon('play', 16)} PLAY GAME</a>
          ${game.sourceUrl ? `<a class="btn btn-ghost" href="${esc(game.sourceUrl)}" target="_blank" rel="noopener noreferrer">${icon('code', 16)} SOURCE CODE</a>` : ''}
        </div>
      </div>
    </article>
  </div>
</section>`;
}

export function About(): string {
  return `
<section class="section about" id="about" aria-labelledby="about-title">
  <div class="container about-grid">
    <div class="about-copy" data-reveal>
      <p class="kicker"><span class="kicker-line"></span>THE DEVELOPER</p>
      <h2 class="section-title" id="about-title">BUILT IN CODE.<br/><span>POWERED BY CURIOSITY.</span></h2>
      <p class="about-lead">I build interactive web experiences, explore creative frontend engineering, and turn ideas into playable digital worlds.</p>
      <p>I’m ${esc(SITE.owner)}, a ${esc(SITE.role.toLowerCase())} working mostly in TypeScript and the React ecosystem. This arcade is where I experiment outside of product work — rendering, game feel, motion and audio, all running straight in the browser.</p>
      <div class="about-actions">
        <a class="btn btn-primary" href="${SITE.githubProfile}" target="_blank" rel="noopener noreferrer">${icon('github', 16)} GITHUB PROFILE</a>
        <a class="btn btn-ghost" href="${SITE.repository}" target="_blank" rel="noopener noreferrer">${icon('code', 16)} ARCADE SOURCE</a>
      </div>
    </div>
    <ul class="about-stack" data-reveal style="--i:1" aria-label="Tools behind the arcade">
      <li><span>01</span><strong>TypeScript</strong><em>Typed game logic &amp; UI</em></li>
      <li><span>02</span><strong>Three.js / WebGL</strong><em>Real-time 3D worlds</em></li>
      <li><span>03</span><strong>Canvas 2D</strong><em>Arcade-speed sprites</em></li>
      <li><span>04</span><strong>Web Audio</strong><em>Synthesized sound</em></li>
      <li><span>05</span><strong>Vite</strong><em>Fast static builds</em></li>
    </ul>
  </div>
</section>`;
}

export function Footer(buildYear: number): string {
  return `
<footer class="footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      ${Logo(30, 'footer')}
      <div><strong>NEON<span>ARCADE</span></strong><p>Game over is just another start screen.</p></div>
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
