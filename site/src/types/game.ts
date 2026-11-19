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
  /** Tarot card still (repo-root relative, 3:5, `./arcade/media/<id>-card.webp`), drawn by tools/profile-art. */
  thumbnail: string;
  thumbnailAlt: string;
  /** Animated preview revealed on hover / in the spotlight. */
  previewGif?: string;
  sourceUrl?: string;
  controls?: GameControl[];
  platforms: Array<'desktop' | 'mobile'>;
  tech: string[];
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
