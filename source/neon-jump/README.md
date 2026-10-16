# NEON JUMP: CYBERWORLD

**A neon side-scrolling platformer.** A digital storm cracked the Neon Core and scattered it across the city. You play Vee, a courier with a glowing visor and fast boots. Old Ohm, a retired repair bot, leaves notes in terminals along the way. Recover all six fragments and bring the city's light back.

**Play:** https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-jump/

![NEON JUMP gameplay](../../assets/neon-jump-preview.gif)

*Real gameplay, captured from the game's own renderer: Rooftop Run (prize blocks, the high rails and the first shard), then the Static Sovereign slamming, getting dazed and taking a stomp on its core.*

## How it plays

- Run, jump and stomp. The jump has variable height (hold for higher), plus coyote time and jump buffering so it forgives slightly late presses. Air control is full.
- **Volts** are coins: 100 of them give an extra life. **Neon Shards** (three per level, usually off the main path) count toward your rank. **Arcade Tokens** (one per level) sit in secret rooms behind hollow walls. Find all six to unlock Retro Vee.
- **Pulse Shield** absorbs the next hit. **Overdrive Core** gives faster running and a double jump for 12 seconds. A repair cell restores one charge. They all come out of `?` blocks.
- Vee has three charges per life, and falling into the energy pit costs a life. Checkpoints keep your progress within a level. When you run out of lives you can retry the level, keeping everything already saved.

### Worlds and levels

| | Level | Introduces |
|---|---|---|
| 1-1 | **Rooftop Run** | running, prize blocks, slimes, rails, springs, a hollow wall |
| 1-2 | **Billboard Heights** | sliding platforms, lifts, hoppers, a tall vertical level |
| 2-1 | **Assembly Line** | conveyors, crumbling bridges, laser gates, turrets, crushers, live floors, timed blocks |
| 2-2 | **Reactor Core** | live floors that pulse in waves, rotors, sweeping lasers, crushers over a crumbling bridge |
| 3-1 | **Phase Shift** | phantoms that are only solid part of the time, glitch blocks that vanish, lifts under a rotor |
| 3-2 | **The Static Throne** | a gauntlet, then the boss |

**Enemies:** Glitch Slime (patrols, stompable), Neon Drone (patrols the air in both orientations), Hopper (crouches, then leaps at you), Pulse Turret (charges a visible glow, then fires along a lane), Phase Phantom (stompable only while solid), and Spiker (red and spiky, so never land on it).

**Boss: the Static Sovereign.** A crowned broadcast head with three phases and six hits. It fires static volleys, calls drones, rains bolts on telegraphed columns and slams down. Shockwaves roll along the floor after each slam, and you jump them. After a slam it is dazed with its core exposed, and landing on the core is the only way to hurt it.

### Controls

| | |
|---|---|
| `A` `D` / `←` `→` | Run |
| `Space` / `W` / `↑` | Jump (hold for higher) |
| `Shift` | Sprint |
| `↓` + `Space` | Drop through a rail |
| `E` | Read a terminal |
| `Esc` / `P` | Pause |
| `R` | Back to the last checkpoint |

Gamepads use the standard mapping (A jumps, X sprints, B/Y interact, Start pauses). On touch devices, on-screen buttons appear in landscape. Game keys don't scroll the page while you're playing.

## How it's built

- **Vanilla TypeScript and Canvas 2D. No dependencies besides Vite and TypeScript.**
- **Fixed 120 Hz simulation** (`src/world/World.ts`) with tile-based AABB collision (`src/world/Physics.ts`). Moving platforms carry their riders, and one-way rails only catch you from above. Everything that resets on respawn is rebuilt from the level's spawn list.
- **Levels are ASCII chunks** (`src/world/levels/*.ts`), joined left to right and bottom-aligned. `Level.ts` has the legend. `npm run check:levels` validates every level: the required start, exit, shards and token, terminal texts, and a rough reachability pass over the jump envelope (4 tiles up, a 4-tile gap).
- **Rendering** (`src/render/`) uses two low-resolution canvases scaled by a whole number. `pix` holds crisp pixel art. `glow` holds light only and is blurred and screen-blended by CSS, so the neon bleeds smoothly over the pixels. Static terrain is baked once per level, and each frame is a single blit plus the dynamic tiles. Sprites are original pixel art authored as text in `Sprites.ts`. Parallax backdrops are generated from a seed, three layers per world.
- **Audio** (`src/audio/Audio.ts`) is all Web Audio. Five original step-sequenced tracks (title, three worlds, boss), jingles and about 30 synthesized effects, with separate music and effects volume plus mute. Nothing plays before your first click or key.
- **Saving** (`src/game/Save.ts`) uses `localStorage`: unlocked levels, best times and scores, shards, tokens, ranks and settings. Every value is validated on load. A corrupt or blocked store falls back to defaults, and the settings screen tells you if progress can't be saved.
- The game pauses itself when the tab is hidden. Reduced motion turns off shake, flicker, fades and drifting effects, and it follows the OS setting by default.

```
src/
├── main.ts               # boot, font wait, fallback message
├── game/                 # Game (loop + flow), Config (tuning + palette), Input, Save
├── world/                # World (simulation), Level (parser), Physics, Camera, levels/
├── entities/             # Player, Enemies, Platforms, Hazards, Pickups, Boss
├── render/               # Renderer, Sprites (pixel art + 3×5 font), Backgrounds, Particles
├── audio/Audio.ts
├── ui/Ui.ts              # DOM screens and HUD
├── dev/playtest.ts       # dev-only scripted play-testing helpers (not in production builds)
└── styles.css
```

## Develop and deploy

```bash
cd source/neon-jump
npm install
npm run dev            # http://localhost:5230
npm run check:levels   # validate level data
npm run build          # type-check, then write the static game to ../../games/neon-jump/
```

In dev builds, `window.__pt` drives the simulation deterministically from the console. For example, `__pt.sim(__pt.world(0), 600, () => ({ right: true }))` steps level 1-1 for five seconds of holding right.

GitHub Pages serves this repository from `main` / root, so the committed `games/neon-jump/` folder is the deployment, like every game here. `.github/workflows/neon-jump-build.yml` validates the levels and builds on every change, and warns if the committed bundle is stale. The game is registered in the NEON ARCADE hub at `site/src/data/games.ts`. Rebuild the hub (`cd site && npm run build`) after changing its card.

## Known limitations

- Scores and times are personal bests stored in this browser. There is no global leaderboard.
- Keys can't be remapped. The bindings above, plus a gamepad, are all that's supported.
- Touch controls work, but this is a precision platformer and a keyboard or gamepad is more comfortable. In portrait orientation the game asks you to rotate.
- The README GIF shows the canvas only. The HUD is HTML layered on top.
