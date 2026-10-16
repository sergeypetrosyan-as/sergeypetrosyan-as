# NEON ARCADE — Game Prompts

Five standalone implementation prompts, one per game, plus the comparison below. Each prompt is self-contained: another Claude Code session can build its game from that file alone.

| # | Game | Prompt | Source | Built output | Primary mechanic | Rendering | Build / deploy |
|---|------|--------|--------|--------------|------------------|-----------|----------------|
| 01 | NEON OVERDRIVE | [01-neon-overdrive.md](01-neon-overdrive.md) | `source/neon-overdrive/` | `games/neon-overdrive/` | **Overdrive Spine** — a faster inner route whose gates open only while the boost reserve is above a threshold | Canvas 2D pseudo-3D road | Vite, committed to `games/`, linked from the hub |
| 02 | PARADOX ROOM | [02-paradox-room.md](02-paradox-room.md) | `source/paradox-room/` | `games/paradox-room/` | **Gravity Fold** — a quarter-turn of a voxel room turns walls into floors and re-resolves the player | Canvas 2D oblique projection | Vite, committed to `games/`, linked from the hub |
| 03 | GHOST SIGNAL | [03-ghost-signal.md](03-ghost-signal.md) | `source/ghost-signal/` | `games/ghost-signal/` | **Reconstruction** — build incident timelines from conflicting memory fragments; rule-based contradiction detection | DOM UI + Canvas 2D scene | Vite, committed to `games/`, linked from the hub |
| 04 | BLACKOUT PROTOCOL | [04-blackout-protocol.md](04-blackout-protocol.md) | `source/blackout-protocol/` | `games/blackout-protocol/` | **Hacking with an energy budget** — loop cameras, lock doors, drop decoys, cut laser grids | Canvas 2D top-down, fixed-step sim | Vite, committed to `games/`, linked from the hub |
| 05 | VOID SURVIVOR | [05-void-survivor.md](05-void-survivor.md) | `source/void-survivor/` | `games/void-survivor/` | **Siphon → Bulwark Field → Detonation** — linked upgrades with explicit combination rules | Canvas 2D top-down, fixed-step sim | Vite, committed to `games/`, linked from the hub |

## How the five differ

- **Core loop.** Racing lap against rivals (01); fold-and-walk puzzle rooms (02); investigate, collect, reconstruct and conclude (03); plan, sneak and hack through guarded facilities (04); survive timed waves and choose upgrades (05).
- **Time model.** 01 is real-time with a reserve economy. 02 is turn-based and deterministic. 03 is turn-based with no time pressure. 04 is real-time with a fixed-step sim. 05 is real-time with a fixed-step sim and a seeded RNG.
- **Visual signature.** Fast and luminous (01); minimal and geometric (02); cinematic and rain-soaked (03); dark and tactical (04); colourful and chaotic-but-readable (05).

## Shared conventions

- Each game is an independent Vite + TypeScript app with devDependencies `typescript 5.6.3` and `vite 5.4.11` only, matching `source/unfall`. There is no shared package and no shared build system.
- Each game builds into `games/<slug>/` with `base: './'`, so it works from GitHub Pages at a sub-path.
- Each game persists to localStorage under a versioned key, with reads and writes wrapped in try/catch.
- Audio is procedural Web Audio only. No audio files, no network, no CDN.
- Each game has a headless check script that runs with `node --experimental-strip-types` (see each prompt's Testing section).

## Hub integration

The five games are catalogued in `site/src/data/games.ts`. Their posters are copied to `arcade/media/<slug>-poster.png`. The hub build validates that each `playUrl` has an `index.html`.
