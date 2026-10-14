# NEON VICE — 3D NIGHTFALL

A neon-soaked, third-person 3D arcade shooter that runs in the browser. Explore a compact retro-futuristic coastal city at night, fight through six waves of hostiles, steal a sports car and drift down the oceanfront boulevard.

**Play:** https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-vice/

![Gameplay preview](../../assets/neon-vice-preview.gif)

> Inspired by the *atmosphere* of 1980s Miami, synthwave and classic open-city action games. Every character, location, vehicle, sign, sound and line of music here is original and generated procedurally. No third-party game assets are used.

## Mission 01 — Nightfall

Survive six escalating waves. Kills chain into combo multipliers (up to ×6), headshots pay a bonus, and clearing a wave awards bonus points and patches you up. Enemies drop health, armour, rifle ammo, cash and a temporary damage boost. Your best score, highest wave and recent runs are saved in this browser.

| Hostile | Behaviour |
|---|---|
| **Street Enforcer** (orange visor) | Rushes in along the streets, swings a telegraphed haymaker at close range. |
| **Neon Gunner** (cyan visor) | Holds a 11–22 m band, strafes, and fires energy bolts. Its visor flares white just before it shoots. |

| Weapon | Behaviour |
|---|---|
| **Neon Pistol** | Semi-auto, precise, infinite reserve, 12-round magazine. Big headshot multiplier. |
| **Pulse Rifle** | Fully automatic energy bolts, spread bloom under sustained fire, limited ammo (refill from drops). |

## Controls (desktop, keyboard + mouse)

| On foot | | Driving | |
|---|---|---|---|
| `W A S D` | Move | `W` / `S` | Throttle / brake & reverse |
| `Shift` | Sprint | `A` / `D` | Steer |
| `Space` | Jump | `Space` | Handbrake (drift) |
| Mouse | Look / aim | `E` | Exit the car (below ~30 km/h) |
| Left click | Fire | Mouse | Look around (auto-recentres) |
| Right click | Over-the-shoulder aim | | |
| `R` | Reload | | |
| `1` `2` / `Q` | Switch weapon | | |
| Mouse wheel | Camera distance | | |
| `E` | Enter a nearby car | | |
| `Esc` / `P` | Pause (also releases the mouse) | | |

The game captures the mouse (Pointer Lock) while you play. If the browser refuses or you alt-tab, it pauses and shows a **Click to engage** prompt.

## Features

- **Third-person controller.** Camera-relative movement, sprint, jumping, stepping onto low props, wall sliding, and a procedurally animated articulated character (walk/run cycle, aim pose, recoil, landing, death fall).
- **Camera.** Smoothed orbit with an over-the-shoulder aim mode, collision pull-in against buildings, mouse-wheel distance, speed-sensitive FOV while driving, and trauma-based shake (a *reduced shake* option is available).
- **Combat.** Hitscan resolved in two passes: the crosshair ray picks the aim point, then a ray from the actual muzzle decides the hit, so cover is respected. Head and body hitboxes, spread and bloom, ammo and reloads, tracers, energy bolts, muzzle flashes, impact sparks, damage numbers and hit markers.
- **AI.** Line-of-sight checks plus a shared BFS flow field over a navigation grid, recomputed a few times per second, so enemies route around buildings without per-agent path searches. Separation steering keeps groups from stacking. Spawns are telegraphed with light beams and prefer cells out of the player's sight.
- **Driving.** Arcade model: world-space velocity split into forward and lateral components, tyre grip bleeds off slip (much less under handbrake, which gives drifts), and a speed-dependent steering and yaw cap. The hull is three collision circles with impact bounce and sparks. Cars have headlights, brake lights, neon underglow, wheel spin and steering, body pitch and roll, a procedural engine note and tyre screech. Enemies hit at speed are taken out.
- **World.** About 200 × 220 m of city: neon downtown towers, oceanfront Art Deco hotels, an enclosed parking garage, backstreet alleys with steam vents, a neon plaza, a beach promenade with palms, ring-road traffic, a distant skyline and a cable bridge. Facades, roads, markings, crosswalks and wet puddles are computed in shaders, and buildings are a single instanced draw.
- **Atmosphere.** Synthwave sunset sky with a striped sun, an animated ocean, fog, bloom, chromatic fringe, vignette, film grain, a neon-tinted environment map for wet reflections, flickering signs and drifting motes.
- **Audio.** An original synthwave loop (drums, bass, arpeggio with delay, pads, lead hook) sequenced with Web Audio, plus synthesized weapons, reloads, hits, footsteps, engine, tyres, pickups and UI sounds. Nothing plays before the first user gesture. There's a master mute and separate music and SFX volume.
- **UI.** Title screen over the live city, how-to-play, settings (sensitivity, invert Y, volumes, quality, reduced shake, high-contrast HUD, reset records), pause menu, end screen with stats. The HUD has health and armour, weapon and ammo, score and combo, wave progress, a radar, a speedometer, interaction prompts, a kill feed and a damage-direction indicator.

## Performance

- Instanced buildings, props and light pools. Static one-off meshes are merged per material at load, and character rigs merge same-material parts per bone.
- Pooled particles, tracers, bolts, pickups and enemies, with no per-frame allocations in the hot paths.
- Uniform-grid spatial hashing for collision and a grid DDA for ray casts.
- Fixed sub-stepped simulation (≤ 1/60 s steps) for frame-rate-independent physics.
- Quality presets: **Low** turns off bloom, grain and point lights and drops resolution. **High** turns on shadows and more traffic and particles. Adaptive resolution steps the render scale down when frame time stays above 25 ms.
- Graceful messages if WebGL 2 is unavailable or the context is lost.

## Project structure

```
source/neon-vice/
├── index.html              # Shell: HUD + menus markup
├── vite.config.ts          # Relative base, builds into ../../neon-vice
└── src/
    ├── main.ts             # WebGL check, boot
    ├── game/               # Game orchestrator, config, state, input, storage, pickups
    ├── world/              # City generator, collision + nav grid, materials/shaders, environment
    ├── characters/         # Procedural articulated humanoid rig
    ├── player/             # Controller, combat, third-person camera
    ├── enemies/            # Enemy archetypes, steering AI, wave spawner
    ├── vehicles/           # Car models, driving physics, ambient traffic
    ├── weapons/            # Weapon definitions/state, enemy projectiles
    ├── effects/            # Particles, tracers/flashes, post-processing
    ├── audio/              # Procedural music + SFX
    ├── ui/                 # HUD and menus
    └── styles/main.css
```

## Local development

Requires Node.js 18+.

```bash
cd source/neon-vice
npm install
npm run dev          # http://localhost:5199
npm run typecheck    # strict TypeScript
npm run build        # type-checks, then writes the static site to ../../games/neon-vice/
npm run preview      # serves the production build
```

## Deployment (GitHub Pages)

This profile repository is published by GitHub Pages straight from the **`main` branch, `/` (root)**. That's how `/games/neon-space-invaders/` (Neon Space Invaders) is already served. NEON VICE follows the same model, so no Pages settings need to change:

1. `npm run build` writes the production bundle to `games/neon-vice/`. `base: './'` keeps every asset URL relative, so it works under the `/sergeypetrosyan-as/` project subpath.
2. Commit the updated `games/neon-vice/` folder together with the source.
3. Pages serves it at **https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-vice/**.

Required repository setting (already in place for the existing game): *Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`*.

The workflow `.github/workflows/neon-vice-build.yml` type-checks and builds the game on every change to it, and warns if the committed `games/neon-vice/` bundle is stale. It deliberately does **not** deploy, so it can't interfere with the existing Pages setup.

The source folder is also reachable on Pages. Its `index.html` redirects visitors at `/source/neon-vice/` to the built game.

## Known limitations

- **Desktop only.** It needs a keyboard, a mouse and Pointer Lock. On touch devices the title screen shows the live city and explains this.
- **Local leaderboard.** Best score and records live in your browser's `localStorage`; they aren't shared between visitors, and clearing site data resets them. A global leaderboard would need a backend, which this static site intentionally doesn't have.
- Integrated GPUs may run below 60 FPS at Medium. Adaptive resolution and the Low preset trade sharpness for frame rate.
- Enemies don't drive, and you can't shoot from cars.
- The README preview GIF shows the 3D render only. The HUD is HTML layered over the canvas, so it isn't in the captured frames.
