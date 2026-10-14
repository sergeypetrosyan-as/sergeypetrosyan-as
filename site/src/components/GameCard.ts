import type { Game, GameControl } from '../types/game';
import { isPlayable } from '../types/game';
import { esc, extLinkAttrs, icon, join } from '../lib/html';

export function controlsList(controls: GameControl[] | undefined, cls = 'controls'): string {
  if (!controls?.length) return '';
  return `<ul class="${cls}" aria-label="Controls">${controls
    .map((c) => `<li>${c.keys.map((k) => `<kbd>${esc(k)}</kbd>`).join('')}<span>${esc(c.action)}</span></li>`)
    .join('')}</ul>`;
}

export function platformBadges(game: Game): string {
  return `<span class="platforms">${game.platforms
    .map((p) => `<span class="platform" title="${p === 'desktop' ? 'Desktop' : 'Mobile'}">${icon(p === 'desktop' ? 'monitor' : 'phone', 14)}<span>${p === 'desktop' ? 'Desktop' : 'Mobile'}</span></span>`)
    .join('')}</span>`;
}

/** Launcher tile. The whole artwork is a play target; actions stay keyboard reachable. */
export function GameCard(game: Game, index: number): string {
  const playable = isPlayable(game);
  const titleId = `game-${game.id}-title`;
  const art = `
    <img class="card-poster" src="${esc(game.thumbnail)}" alt="${esc(game.thumbnailAlt)}" width="640" height="360" loading="lazy" decoding="async"${
      game.previewGif ? ` data-preview="${esc(game.previewGif)}"` : ''
    } />
    <span class="card-scan" aria-hidden="true"></span>
    <span class="card-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
    ${playable ? `<span class="card-play-badge" aria-hidden="true">${icon('play', 22)}</span>` : `<span class="card-soon" aria-hidden="true">IN DEVELOPMENT</span>`}`;

  return `
<article class="game-card accent-${game.accent}${playable ? '' : ' is-soon'}" aria-labelledby="${titleId}" data-reveal style="--i:${index}">
  ${
    playable
      ? `<a class="card-media" href="${esc(game.playUrl)}"${extLinkAttrs(game.playUrl)} tabindex="-1" aria-hidden="true">${art}</a>`
      : `<div class="card-media">${art}</div>`
  }
  <div class="card-body">
    <p class="card-genres">${game.genre.map((g) => `<span>${esc(g)}</span>`).join('')}</p>
    <h3 class="card-title" id="${titleId}">${esc(game.title)} <span class="card-tagline">${esc(game.tagline)}</span></h3>
    <p class="card-desc">${esc(game.description)}</p>
    ${controlsList(game.controls)}
    <div class="card-footer">
      ${platformBadges(game)}
      <div class="card-actions">
        ${join(
          game.sourceUrl &&
            `<a class="btn btn-icon" href="${esc(game.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(game.title)} source code on GitHub">${icon('code', 18)}</a>`,
          playable
            ? `<a class="btn btn-primary btn-play" href="${esc(game.playUrl)}"${extLinkAttrs(game.playUrl)} aria-label="Play ${esc(game.title)}">${icon('play', 14)} PLAY</a>`
            : `<span class="btn btn-disabled" aria-disabled="true">COMING SOON</span>`,
        )}
      </div>
    </div>
  </div>
</article>`;
}

/** Decorative slot that shows where the next game will go — not a game. */
export function NextSlotCard(index: number): string {
  return `
<article class="game-card next-slot" aria-labelledby="next-slot-title" data-reveal style="--i:${index}">
  <div class="next-slot-inner">
    <span class="next-slot-coin" aria-hidden="true">${icon('gamepad', 34)}</span>
    <h3 class="card-title" id="next-slot-title">INSERT COIN</h3>
    <p class="card-desc">This slot is reserved for the next cartridge. New games join the arcade as soon as they’re playable.</p>
  </div>
</article>`;
}
