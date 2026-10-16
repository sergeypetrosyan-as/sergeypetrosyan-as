# NEON TANKS: OVERDRIVE

A true-3D arena tank shooter for the NEON ARCADE hub. Drive a tank through two multi-level arenas, aim an independent turret with the mouse, and fight bot tanks in Team Deathmatch, Free-for-All or Control Point. Credits and XP from each match unlock hulls, turrets, paints and upgrades in the garage.

**Play:** `games/neon-tanks/` on the hub · **Source:** this folder.

## Engine choice

Three.js 0.170 + TypeScript + Vite, matching NEON VICE and the other 3D games in this repository. Plain Three.js (no React Three Fiber) because the hub and every other game are framework-free DOM + canvas apps; the menus and HUD are plain DOM over the WebGL canvas.

## Run, check, build

```bash
npm install
npm run dev          # http://localhost:5230
npm run check        # headless arena + bot-match checks (Node 22, --experimental-strip-types)
npm run typecheck
npm run build        # writes ../../games/neon-tanks/ (committed; Pages serves main)
```

`scripts/balance.ts` (kills/damage per weapon and hull over long bot matches) and `scripts/jams.ts` (where bots get stuck) are diagnostics, run the same way as `check`.

## Architecture

```
src/sim/      Pure TypeScript simulation, no Three.js — runs headlessly
  content.ts    hulls, weapons, abilities, paints, upgrades, difficulties, modes
  arenaKit.ts   authoring helpers (blocks, containers, ramps with rails, mirroring)
  arenas.ts     NEON DOCKS and VOID COMPLEX
  collision.ts  surface height, tank-vs-world circle resolution, ray casts (boxes, ramps, ground)
  nav.ts        waypoint graph generated from the geometry + A*
  tank.ts       drive physics, turret, weapons (magazine / heat / charge), abilities
  projectiles.ts pooled projectiles and tank hit volumes
  ai.ts         bot brain: perception, roam/engage/retreat/pursue, steering, aim
  world.ts      a match: damage, kills/assists, respawn, pickups, control point, scoring
  events.ts     pooled sim → presentation event queue
src/render/   Three.js: arena builder, procedural tank models, effects, camera rig, garage stage
src/audio/    procedural Web Audio (spatial one-shots, engine voice, music loop)
src/ui/       DOM HUD, menus, garage, tutorial
src/game/     orchestrator, input/pointer lock, progression, validated localStorage
src/dev/      dev-only capture tool for the hub poster/GIF (never in production builds)
```

- **Timestep:** each rendered frame advances the sim in equal sub-steps of at most 1/60 s; frame time is clamped to 0.1 s.
- **Pooling:** projectiles (320), particles, flashes, rings, beams, scorch decals, debris and events are preallocated. Projectiles render as one `InstancedMesh` per weapon.
- **Draw calls:** static arena geometry is merged per material.
- **Quality:** Low (no shadows, bloom or dynamic lights), Medium, High. Dynamic resolution steps down automatically when frames run long.
- **Lifecycle:** one `requestAnimationFrame` loop; the match auto-pauses on tab hide or pointer-lock loss; WebGL context loss pauses and shows a notice; GPU resources are disposed when a match or the page ends.

## Multiplayer

Offline only. Bots are always labelled **BOT**. The simulation is driven purely by per-tick `TankControls`, so a future authoritative server could run `World.step()` and feed player commands over the network — but no networking exists today.

## Known limitations

- Desktop only: needs a keyboard, a mouse and pointer lock.
- Collision geometry is axis-aligned boxes and ramps; tanks are circles and spheres, not exact meshes.
- Bots use a shared radar picture to find fights, so they are not perfectly fair hunters.
- Graphics quality changes apply from the next match.
