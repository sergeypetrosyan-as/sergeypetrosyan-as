export type GameStatus = 'playable' | 'coming-soon';

export interface GameControl {
  keys: string[];
  action: string;
}

interface GameBase {
  id: string;
  title: string;
  /** Short line for cards. */
  tagline: string;
  description: string;
  genre: string[];
  /** Static poster image (repo-root relative, e.g. `./arcade/media/x.webp`). */
  thumbnail: string;
  thumbnailAlt: string;
  /** Animated preview revealed on hover / in the spotlight. */
  previewGif?: string;
  sourceUrl?: string;
  controls?: GameControl[];
  platforms: Array<'desktop' | 'mobile'>;
  tech: string[];
  /** Accent used for the card's neon edge. */
  accent: 'cyan' | 'pink' | 'purple' | 'amber';
  featured?: boolean;
}

export interface PlayableGame extends GameBase {
  status: 'playable';
  /**
   * Where the game launches. Internal games use a repo-root relative path
   * (validated at build time to contain an index.html); external ones an https URL.
   */
  playUrl: string;
}

export interface ComingSoonGame extends GameBase {
  status: 'coming-soon';
  playUrl?: never;
}

export type Game = PlayableGame | ComingSoonGame;

export const isPlayable = (g: Game): g is PlayableGame => g.status === 'playable';
export const isInternalUrl = (url: string): boolean => url.startsWith('./');
