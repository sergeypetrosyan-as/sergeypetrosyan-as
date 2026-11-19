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

/**
 * A game as a tarot card: the illustrated card (still; its animated loop plays
 * on hover or focus) beside the title, description, controls and actions.
 */
export function GameCard(game: Game, index: number): string {
  const playable = isPlayable(game);
  const titleId = `game-${game.id}-title`;
  const art = `<img class="card-art" src="${esc(game.thumbnail)}" alt="${esc(game.thumbnailAlt)}" width="360" height="600" loading="lazy" decoding="async"${
    game.previewGif ? ` data-preview="${esc(game.previewGif)}"` : ''
  } />`;

  return `
<article class="game-card${playable ? '' : ' is-soon'}" aria-labelledby="${titleId}" style="--i:${index}">
  ${
    playable
      ? `<a class="card-media" href="${esc(game.playUrl)}"${extLinkAttrs(game.playUrl)} tabindex="-1" aria-hidden="true">${art}</a>`
      : `<div class="card-media">${art}</div>`
  }
  <div class="card-body">
    <p class="card-genres">${game.genre.map((g) => `<span>${esc(g)}</span>`).join('')}</p>
    <h3 class="card-title" id="${titleId}">${esc(game.title)}</h3>
    <p class="card-tagline">${esc(game.tagline)}</p>
    <p class="card-desc">${esc(game.description)}</p>
    ${controlsList(game.controls)}
    <div class="card-footer">
      ${platformBadges(game)}
      <div class="card-actions">
        ${join(
          game.sourceUrl &&
            `<a class="btn btn-icon" href="${esc(game.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(game.title)} source code on GitHub">${icon('code', 18)}</a>`,
          playable
            ? `<a class="btn btn-primary btn-play" href="${esc(game.playUrl)}"${extLinkAttrs(game.playUrl)} aria-label="Play ${esc(game.title)}">${icon('play', 14)} Play</a>`
            : `<span class="btn btn-disabled" aria-disabled="true">Coming soon</span>`,
        )}
      </div>
    </div>
  </div>
</article>`;
}

/** The back of an undrawn card: where the next game will go — not a game. */
export function NextSlotCard(index: number): string {
  return `
<article class="game-card next-slot" aria-labelledby="next-slot-title" style="--i:${index}">
  <div class="card-back" aria-hidden="true"><span></span></div>
  <div class="card-body">
    <h3 class="card-title" id="next-slot-title">The next card</h3>
    <p class="card-desc">This place is kept for the next game. New games join the arcade as soon as they are playable.</p>
  </div>
</article>`;
}
