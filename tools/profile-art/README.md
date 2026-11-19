# profile-art

Draws every piece of artwork on the profile README and the hub, in the
`19_mystical-western` design system (`design/19_mystical-western/`).

| Output | Source | Motion |
|---|---|---|
| `assets/hero.gif` (1280×400), `assets/hero-mobile.gif` (720×720) | `src/profile.mjs` → `drawHero` | three stars drift off the telescope's sight line and back into it |
| `assets/footer.gif` (1280×220) | `drawFooter` | one carved moon walks through its phases |
| `assets/rule-dark.png`, `assets/rule-light.png` | `drawSeparator` | static moon-phase rule, one per GitHub colour scheme |
| `assets/skills-map.png` | `drawMap` | static star chart of the four disciplines |
| `assets/arcade-button.png` | `drawButton` | static stamped button |
| `assets/cards/<game>.gif` (360×600) | `src/cards.mjs` | one seamless motion per game card |
| `arcade/media/<game>-card.webp`, `site/public/arcade/media/…` | first card frame at 2× | hub stills |
| `site/public/og-image.jpg`, `site/public/apple-touch-icon.png` | `drawOg`, `drawIcon` | — |

```bash
npm ci
npm run build              # everything; or: node src/build.mjs hero|footer|static|cards|posters [--frames]
npm run check              # decodes every GIF in Chrome: animated, loops, seamless; README image paths exist
```

`check` needs `tools/theme` installed (`npm ci --prefix ../theme`) and Chrome or Edge
(`CHROME=/path/to/chrome` to override). `--frames` dumps first/middle/last frames to
`.frames/` for review.

Rules every scene follows: the first frame is a complete composition, there is one
main motion, and frame *n−1* flows back into frame 0. GIFs use one global palette
(quantised from five frames) and store only the pixels that changed since the
previous frame, so a loop costs tens of kilobytes rather than megabytes.
