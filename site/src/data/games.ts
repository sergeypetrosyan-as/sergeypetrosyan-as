import type { Game } from '../types/game';

const REPO = 'https://github.com/sergeypetrosyan-as/sergeypetrosyan-as';

/**
 * The game catalog — the only place game metadata lives. Cards, the featured
 * spotlight, structured data and the sitemap are all generated from it, and the
 * build fails if a playable entry points at a path without an index.html.
 */
export const GAMES: Game[] = [
  {
    id: 'unfall',
    title: 'UNFALL',
    tagline: 'A time-lens game',
    description:
      'The city of Vesper ends tonight. You can’t steer Ilo, the small courier carrying its last light — you can only hold a circle where time runs backward. Rebuild bridges, lift falling signs, hold back the Hush, catch her mid-fall. Every second you take back dims her lantern.',
    genre: ['Time manipulation', 'Puzzle', 'Escort'],
    thumbnail: './arcade/media/unfall-poster.webp',
    thumbnailAlt: 'UNFALL: a circle of reversed time over a broken bridge, where Ilo the courier is walking back through her own steps',
    previewGif: './assets/unfall-preview.gif',
    status: 'playable',
    playUrl: './games/unfall/',
    sourceUrl: `${REPO}/tree/main/source/unfall`,
    controls: [
      { keys: ['Mouse'], action: 'Aim the circle' },
      { keys: ['Hold'], action: 'Turn time back' },
      { keys: ['Wheel'], action: 'Resize' },
      { keys: ['Space'], action: 'Hold (keyboard)' },
    ],
    platforms: ['desktop', 'mobile'],
    tech: ['Canvas 2D', 'TypeScript', 'Web Audio'],
    accent: 'amber',
    featured: true,
  },
  {
    id: 'neon-vice',
    title: 'NEON VICE',
    tagline: '3D Nightfall',
    description:
      'A neon-soaked third-person 3D shooter. Explore a coastal city at night, survive six escalating waves, steal a sports car and drift down the oceanfront boulevard.',
    genre: ['3D Action', 'Third-person shooter', 'Driving'],
    thumbnail: './arcade/media/neon-vice-poster.webp',
    thumbnailAlt: 'NEON VICE: a neon sports car drifting toward a striped synthwave sun over the ocean',
    previewGif: './assets/neon-vice-preview.gif',
    status: 'playable',
    playUrl: './games/neon-vice/',
    sourceUrl: `${REPO}/tree/main/source/neon-vice`,
    controls: [
      { keys: ['W', 'A', 'S', 'D'], action: 'Move / drive' },
      { keys: ['Mouse'], action: 'Aim' },
      { keys: ['Click'], action: 'Fire' },
      { keys: ['E'], action: 'Enter car' },
      { keys: ['Space'], action: 'Jump / drift' },
    ],
    platforms: ['desktop'],
    tech: ['Three.js', 'TypeScript', 'Web Audio'],
    accent: 'pink',
  },
  {
    id: 'neon-space-invaders',
    title: 'NEON SPACE INVADERS',
    tagline: 'Defend the grid',
    description:
      'A neon take on the arcade classic. Pilot the interceptor, dodge incoming fire and clear wave after wave before the invaders reach the grid.',
    genre: ['Arcade', 'Shoot ’em up', '2D'],
    thumbnail: './arcade/media/space-invaders-poster.webp',
    thumbnailAlt: 'Neon Space Invaders: rows of glowing invaders above the player ship on a neon grid',
    previewGif: './assets/game-preview.gif',
    status: 'playable',
    playUrl: './games/neon-space-invaders/',
    sourceUrl: `${REPO}/tree/main/games/neon-space-invaders`,
    controls: [
      { keys: ['←', '→'], action: 'Move' },
      { keys: ['A', 'D'], action: 'Move' },
      { keys: ['Space'], action: 'Fire' },
    ],
    platforms: ['desktop', 'mobile'],
    tech: ['Canvas 2D', 'JavaScript'],
    accent: 'cyan',
  },
];

export const featuredGame = GAMES.find((g) => g.featured && g.status === 'playable') ?? GAMES.find((g) => g.status === 'playable');
