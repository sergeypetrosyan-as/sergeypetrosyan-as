# NEON ARCADE — gaming hub

The neon game launcher published by GitHub Pages for this repository:

**https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/**

The hub links to every playable game in the repo, with a featured spotlight, an about section and full SEO/social metadata. The profile `README.md` at the repo root is a separate thing: GitHub shows it on the profile page, while Pages serves the hub's `index.html`.

## How it works

- **Vanilla TypeScript and Vite.** No framework, because the page is static content plus a little behaviour.
- **One game registry.** `src/data/games.ts` drives the cards, the spotlight, JSON-LD structured data and `sitemap.xml`.
- **Pre-rendered at build time.** Components in `src/components/` are pure functions that return HTML strings. A Vite plugin renders them into `index.html`, so the whole page works without JavaScript. Client JS (`src/lib/`) only adds the mobile menu, active-section state, scroll reveals, pointer parallax, the particle field and hover GIF previews.
- **Validated links.** The build fails if a playable game's `playUrl` has no `index.html` in the repo, or if any artwork file is missing.
- **Design tokens.** Everything is defined in `src/styles/tokens.css`: colour, light, radii, spacing, type, motion and layers.
- **Motion budget.** Animations use transforms and opacity only. Pointer parallax writes CSS variables at most once per frame, and the particle canvas has 46 particles and stops when the hero leaves the viewport or the tab is hidden. `prefers-reduced-motion` turns all of it off.

```
site/
├── index.html            # head/SEO shell; <!--app--> is replaced at build time
├── vite.config.ts        # prerender, registry validation, dev server for the real games
├── scripts/clean.mjs     # clears only ../arcade/assets before a build
├── public/               # favicon, OG image, robots.txt, 404.html, posters (arcade/media)
└── src/
    ├── data/games.ts     # ← add new games here
    ├── data/site.ts
    ├── types/game.ts
    ├── components/       # Navbar, Hero, GameCard, Sections (grid, spotlight, about, footer), Logo
    ├── lib/              # nav, reveal, heroMotion, previews, html helpers
    ├── styles/           # tokens, global, components, animations
    ├── render.ts         # page, structured data and sitemap rendering
    └── main.ts
```

## Adding a game

1. Put the built game in its own folder at the repo root, e.g. `my-game/index.html`.
2. Add a poster (16:9 WebP, about 768×432) to `public/arcade/media/`.
3. Add an entry to `src/data/games.ts` with `status: 'playable'` and `playUrl: './my-game/'`. For a game that isn't ready, use `status: 'coming-soon'` and leave out `playUrl`; it renders as a disabled card.
4. Run `npm run build` and commit.

## Develop and build

```bash
cd site
npm install
npm run dev        # http://localhost:5210 — also serves /game/, /neon-vice/ and /assets/ from the repo
npm run build      # type-check + validate registry + write the hub into the repo root
```

The build writes `index.html`, `sitemap.xml`, `favicon.svg`, `og-image.jpg`, `apple-touch-icon.png`, `robots.txt`, `404.html` and `arcade/` into the repository root. Nothing else there is touched.

## Deployment

GitHub Pages already publishes this repository from **`main` / root**, so committing the build output is the deployment. No settings change is needed. `.github/workflows/arcade-hub-build.yml` type-checks and builds on every change and warns if the committed output is stale. It never deploys.

### Why `https://sergeypetrosyan-as.github.io/` (the bare domain) is a 404

GitHub serves the bare user domain **only** from a repository named exactly `sergeypetrosyan-as.github.io`, and this account doesn't have one. The profile repository `sergeypetrosyan-as` is a *project* site, so it lives under `/sergeypetrosyan-as/`. The hub is deployed there.

To make the bare domain work too, create the user-site repository and push the forwarding page kept in [`user-site/`](./user-site):

1. On GitHub, create a new **public** repository named exactly **`sergeypetrosyan-as.github.io`**. Leave it empty: no README, license or .gitignore.
2. Push the forwarding page:
   ```bash
   cd site/user-site
   git init -b main && git add . && git commit -m "Forward user site to NEON ARCADE"
   git remote add origin https://github.com/sergeypetrosyan-as/sergeypetrosyan-as.github.io.git
   git push -u origin main
   ```
3. In that repo, open *Settings → Pages* and check that *Source: Deploy from a branch → `main` / `(root)`* is selected. It's usually enabled automatically for `<user>.github.io` repositories.
4. After a minute or two, `https://sergeypetrosyan-as.github.io/` forwards to the hub.

Alternatively, you can move the hub itself into that repository. The forwarding page keeps one source of truth here instead.
