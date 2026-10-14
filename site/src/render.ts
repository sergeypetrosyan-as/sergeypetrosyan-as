import { GAMES, featuredGame } from './data/games';
import { SITE } from './data/site';
import { isPlayable } from './types/game';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { About, FeaturedGame, Footer, GameGrid } from './components/Sections';

/** Absolute URL for a repo-root relative path on the deployed site. */
export const absolute = (path: string): string => new URL(path, SITE.url).href;

/** Pre-renders the whole page body at build time from the game registry. */
export function renderBody(): string {
  const playHref = featuredGame && isPlayable(featuredGame) ? featuredGame.playUrl : '#games';
  return [
    Navbar(playHref),
    '<main id="main">',
    Hero(GAMES.filter(isPlayable).length),
    GameGrid(GAMES),
    FeaturedGame(featuredGame),
    About(),
    '</main>',
    Footer(new Date().getFullYear()),
  ].join('\n');
}

/** schema.org data describing exactly what the page lists. */
export function structuredData(): string {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        author: { '@type': 'Person', name: SITE.owner, url: SITE.githubProfile },
      },
      {
        '@type': 'ItemList',
        name: 'Games',
        itemListElement: GAMES.filter(isPlayable).map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'VideoGame',
            name: g.title,
            description: g.description,
            url: absolute(g.playUrl),
            image: absolute(g.thumbnail),
            genre: g.genre,
            gamePlatform: 'Web browser',
            applicationCategory: 'Game',
            operatingSystem: 'Any (modern web browser)',
            author: { '@type': 'Person', name: SITE.owner },
          },
        })),
      },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

export function sitemap(): string {
  const urls = [SITE.url, ...GAMES.filter(isPlayable).map((g) => absolute(g.playUrl))];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
}
