# NEON ARCADE — Implementation Report

Status legend: `COMPLETE` = implemented and verified against its required criteria · `PARTIAL` = implemented but missing required features or verification · `BLOCKED` = cannot proceed.

Nothing in this report is committed or pushed. The games are not live on GitHub Pages until the changes are committed to `main` and pushed.

## Summary

| # | Game | Status | Prompt | Source | Built output | Playable modes / levels |
|---|------|--------|--------|--------|--------------|-------------------------|
| 01 | NEON OVERDRIVE | COMPLETE* | [01-neon-overdrive.md](01-neon-overdrive.md) | `source/neon-overdrive/` | `games/neon-overdrive/` | 3 tracks × 3 difficulties; race vs 3 AI rivals |
| 02 | PARADOX ROOM | COMPLETE* | [02-paradox-room.md](02-paradox-room.md) | `source/paradox-room/` | `games/paradox-room/` | 3 chapters × 3 levels (9); 3 hidden shards |
| 03 | GHOST SIGNAL | COMPLETE* | [03-ghost-signal.md](03-ghost-signal.md) | `source/ghost-signal/` | `games/ghost-signal/` | 3 chapters; 5 endings |
| 04 | BLACKOUT PROTOCOL | COMPLETE* | [04-blackout-protocol.md](04-blackout-protocol.md) | `source/blackout-protocol/` | `games/blackout-protocol/` | 4 missions (incl. final) |
| 05 | VOID SURVIVOR | COMPLETE* | [05-void-survivor.md](05-void-survivor.md) | `source/void-survivor/` | `games/void-survivor/` | 20-minute runs; 4 Core Warden fights; meta unlocks |

\* `COMPLETE` is the implementing agent's self-report. The headless checks below were re-run by the lead. Browser verification was partial for every game (see per-game notes). Audio, real touch input and long-session performance were not verified for any game.

## Visual redesign pass (realism)

After the first build, a second pass redesigned every game toward realistic lighting and materials, believable in-world UI and detailed art. Four games moved to real 3D. Gameplay logic was left unchanged, and every headless check still passes after the pass.

| Game | Renderer now | In-world UI concept | Fallback | Quality setting | JS (gzip) |
|------|--------------|---------------------|----------|-----------------|-----------|
| NEON OVERDRIVE | Three.js 3D: wet PBR asphalt, instanced lit city, 4 modelled cars, bloom, tunnel and overpasses | Windscreen HUD, race-control menus, classification sheet | Canvas 2D | Auto/Low/Med/High | ~182 KB |
| PARADOX ROOM | Three.js 3D: merged voxel rooms with baked AO, 600 ms quaternion fold, lantern shadows | Drafting film, brass key rail, chapter plan sheets | Canvas 2D | Auto/Low/Med/High, auto-downshift | ~170 KB |
| GHOST SIGNAL | Layered Canvas 2D cinematic scenes: light falloff, lit rain, wet reflections, rim light | Graphite forensic workstation: photo evidence, degraded video fragments, typed testimony slips | n/a (2D) | Low/Med/High | ~63 KB |
| BLACKOUT PROTOCOL | Three.js 3D: tile maps as PBR architecture, guard/camera SpotLights matched to logical cones, alert beacons | Gunmetal wrist kit and paper mission dossier | Canvas 2D | Auto/Low/Med/High | ~184 KB |
| VOID SURVIVOR | Three.js 3D: ~45 InstancedMesh layers, obsidian floor, pooled lights, shader hazards | Cracked suit visor, salvage-rig upgrade cards, salvage report | Canvas 2D | Auto/Low/Med/High | ~184 KB |

- **New dependencies:** `three@0.170.0` and `@types/three@0.170.0` for four games, the same version NEON VICE uses. Each game also bundles open-licensed `@fontsource/*` fonts, so it stays offline with no CDN.
- **Specs:** sections 12, 13 and 15 of each prompt now hold the design plan and its review. Related sections were updated to match.
- **Lead re-verification after the pass:** all five `npm run build` (typecheck + Vite) succeeded. All five headless checks passed again: overdrive sim, 9/9 levels solvable, 428 case checks, 82/0 sim, 51 sim. All five new posters were viewed and are real captures, not placeholders.
- **Measured performance (agent-reported):** VOID SURVIVOR runs at 55–57 fps at Medium with about 400 entities on an Intel iGPU. BLACKOUT PROTOCOL takes about 8 ms per frame at Medium. NEON OVERDRIVE and PARADOX ROOM frame rates were not measured, because the shared browser pane was hidden.
- **Not verified in the pass:** touch on real devices, real context-loss events (simulated ones were tested), Safari/Firefox, High-quality performance, full browser play-throughs of later levels and missions, and the five-ending playthrough in the browser.
- **Debug hooks for capture and testing** (all are opt-in and do nothing without the flag):
  - NEON OVERDRIVE: `?demo=1&at=<seconds>`
  - PARADOX ROOM: `?level=2-1`, `?quality=medium`, `?debug`
  - GHOST SIGNAL: `?scene=<id>`
  - BLACKOUT PROTOCOL: `?debug=1` spawn flag
  - VOID SURVIVOR: `#demo`, `window.__vs`

## Per-game detail (first build)

### 01 NEON OVERDRIVE
- **Mechanic:** Overdrive Spine. The inner route is shorter and faster, and its gates are solid unless the boost reserve is above threshold.
- **Implemented:** vehicle control with drift, boost, wall collisions, checkpoints and laps, 3 AI rivals, difficulty levels, results and personal bests, restart, tutorial, race HUD, procedural audio.
- **Verification:** `npm run typecheck` passes (re-run by lead). Agent's `npm test` headless sim passes, including a scripted driver finishing 3 laps on all 9 track/difficulty combinations. Browser pass covered tutorial, menu and records screens, countdown, driving, wall hits, checkpoints, a 3-lap finish, Spine gate states, restart, pause, and a 375 px width with no horizontal scroll. Console clean on the built bundle.
- **Not verified:** audio output, real touch input, long-session performance. The AI is not tuned for a human player; the scripted driver won every race.
- **Limitation:** the spec is 259 lines, at the low end of the target range.

### 02 PARADOX ROOM
- **Mechanic:** Gravity Fold. Rolling or pitching a room turns walls into floors and re-resolves the player's position.
- **Implemented:** 9 levels in 3 chapters, hints with cooldown, undo, restart, a reset-level action, hidden shards, an ending, save progression.
- **Verification:** `check-levels.ts` re-run by lead: all 9 levels solvable, shortest solutions 4 to 24 turns, rule checks pass. `npm run typecheck` and `npm run build` reported clean by the agent. Browser pass solved all 9 levels with real key events and reached the ending. Console clean.
- **Not verified:** audio output.
- **Deviations:** fold keys are Q/F (roll) and X/V (pitch) rather than Q/R, because R is restart. Levels 1-3 to 3-3 are irregular caverns found by solver-verified random search; 1-1 and 1-2 are hand-authored.

### 03 GHOST SIGNAL
- **Mechanic:** Reconstruction. Fragments carry claims; the game checks contradictions against explicit rules.
- **Implemented:** original case with 5 endings, dialogue with tracked choices, evidence log, case board, reconstruction and conclusion, Magistrate check.
- **Verification:** `check-case.ts` re-run by lead: 428 checks pass. All 5 endings reached. The canonical truth set has zero contradictions; the forged fragment is refuted; the wrong suspects are rejected. `npm run typecheck` and `npm run build` reported clean by the agent. Browser pass covered title, new case, evidence, the scene canvas, a contradiction surfacing, and the tabs. No horizontal scroll at 800 px. Console clean.
- **Not verified in browser:** the revelation, the endings, Settings and Help overlays, keyboard-only navigation, phone-width layout. The full playthrough is covered only by the check script.
- **Deviation:** `allowImportingTsExtensions` added to tsconfig so the check script can import the story modules.

### 04 BLACKOUT PROTOCOL
- **Mechanic:** hacking with a limited energy reserve: loop camera, lock door, drop decoy, cut laser grid.
- **Implemented:** 4 missions including a final one, guard state machine (patrol → suspicious → alert → search), vision cones with walls and shadows, cameras, lasers, doors, keycards, lockers, decoys, failable terminal puzzles, checkpoints, result screen, persisted bests and unlocks.
- **Verification:** `check-sim.ts` re-run by lead: 82 passed, 0 failed. Covers detection, state transitions, decoy pull, hack costs and timing, puzzle, snapshot restore, corrupted-save fallback, and scripted routes that finish all 4 missions. `npm run typecheck` and `npm run build` reported clean. Browser pass covered menu, mission select, briefing, mission 1 start, movement and sneak, a guard's vision cone, a door hack (energy 100 → 85), pause, phone-width HUD and touch buttons. Console clean.
- **Not verified in browser:** the terminal puzzle UI, camera loop, laser cut, decoy, audio.
- **Deviation:** `allowImportingTsExtensions` added to tsconfig.

### 05 VOID SURVIVOR
- **Mechanic:** Siphon → Bulwark Field → Detonation, with other upgrades and combinations.
- **Implemented:** the three linked upgrades, 10+ other upgrades, 3-card choice screen with reroll, 5+ enemy types, bosses, meta unlocks, end-of-run summary, pause, restart.
- **Verification:** `check-sim.ts` re-run by lead: 51 checks pass. Covers the upgrade chain and damage scaling, 3 valid cards from 2000 random states, same-seed determinism over 3600 ticks, spawn budget under the entity cap, a 1200 s god-mode run without NaN, corrupted-save fallback. `npm run typecheck` and `npm run build` reported clean. Browser pass covered menu, start run, movement, spawns, a forced level-up with 3 cards, picking with the "1" key, pause. Console clean.
- **Not verified in browser:** Vault purchases, end-of-run summary, bosses, audio, touch controls. The level-up was forced through a debug hook (`window.__vs`).
- **Deviation:** spawn budget formula changed to `2.4 + 0.8·(wave-1)` so growth per wave is at most 35%; the spec was updated to match.

## Shared infrastructure

No shared package was created. The repo has no shared UI library, and each game keeps its own tokens and styles. Common conventions are documented in [README.md](README.md). Reuse was limited to the existing Vite + TypeScript pattern from `source/unfall`.

## Files added or modified

- **Added:** `docs/game-prompts/` (README, five prompts, this report); `source/{neon-overdrive,paradox-room,ghost-signal,blackout-protocol,void-survivor}/`; `games/{neon-overdrive,paradox-room,ghost-signal,blackout-protocol,void-survivor}/` (build output); `arcade/media/{slug}-poster.png` × 5.
- **Modified:** `site/src/data/games.ts` (5 new catalogue entries); hub build output regenerated by `npm run build` in `site/` (`index.html`, `arcade/assets/*`, `sitemap.xml`).
- **Untouched:** `source/neon-jump/` (untracked, user's own work), `source/unfall/`, `source/neon-vice/`, `games/unfall/`, `games/neon-vice/`, `games/neon-space-invaders/`, `.github/`, profile README.

## Verification results

| Check | Result |
|-------|--------|
| Hub `npm run build` (typecheck + registry validation + vite build) | Passed (lead) |
| NEON OVERDRIVE `npm run typecheck` | Passed (lead). `npm test` headless sim passed (agent). |
| PARADOX ROOM `check-levels.ts` | All 9 levels solvable (lead) |
| GHOST SIGNAL `check-case.ts` | 428 checks passed (lead) |
| BLACKOUT PROTOCOL `check-sim.ts` | 82 passed, 0 failed (lead) |
| VOID SURVIVOR `check-sim.ts` | 51 checks passed (lead) |
| Per-game `typecheck` / `build` for PARADOX ROOM, GHOST SIGNAL, BLACKOUT PROTOCOL, VOID SURVIVOR | Reported passed by each agent; not re-run by lead |
| Browser verification | Partial for each game, detailed above. No console errors reported. |

Known build-time warning, pre-existing and unchanged: Vite warns that `outDir` is the repo root because the hub builds there.

## Hub integration status

- All five games are in `site/src/data/games.ts` with `status: 'playable'`, `playUrl` pointing at `./games/<slug>/`, and thumbnails at `./arcade/media/<slug>-poster.png`.
- Posters were re-captured after the redesign as real headless-Chrome gameplay frames, and the alt texts were rewritten to match them. The `tech` arrays now list Three.js for the four 3D games.
- The NEON JUMP session captured preview GIFs into `assets/<slug>-preview.gif` at about 11:50, during the redesign.
  - **Wired into the hub:** NEON OVERDRIVE, PARADOX ROOM and VOID SURVIVOR. These show the new 3D renderers, but the OVERDRIVE and VOID clips predate the agents' bloom and exposure tuning, so they look brighter than the final builds.
  - **Not wired:** GHOST SIGNAL and BLACKOUT PROTOCOL. Their GIFs show the pre-redesign visuals.
  - Re-capturing all five on the final builds is still to do.
- The NEON JUMP session restored the catalogue after an accidental `git checkout` of `games.ts` and appended its own `neon-jump` entry.
- The hub's existing featured spotlight is still UNFALL.

## Deployment status

**Not deployed.** The hub and all games are built locally. GitHub Pages serves `main` / root, so nothing is live until the changes are committed and pushed. Nothing was committed by this work.

## Remaining limitations

- **Browser coverage gaps** above, and no audio output or touch input verified for any game.
- **Balance:** the NEON OVERDRIVE AI is not tuned for a human player; the scripted driver wins every race.
- **Spec length:** NEON OVERDRIVE's prompt is 259 lines, at the low end of the 250–500 target.
- **Background processes:** two GHOST SIGNAL `vite preview` servers from the first build are still listening on port 5243 (PIDs 5476 and 8496). Their command lines confirm they are GHOST SIGNAL previews, but stopping them was blocked by this session's permission rules. Close them yourself. Ports 5250 and 5251 belong to another session and were left alone.
- **Bundle growth:** the four 3D games are about 170–184 KB of gzipped JS each, plus bundled fonts, against roughly 22–35 KB before.
- **Remaining game-specific limitations** are listed in each game's section above.

## Manual steps for you

1. Review the changes: `git status` shows the new `source/*`, `games/*`, `docs/game-prompts/`, `arcade/media/*`, and the modified `site/src/data/games.ts`.
2. Decide whether to keep `source/neon-jump/` (untracked) in this commit. It was not touched.
3. Commit and push to `main` when ready. GitHub Pages then serves the new `games/*` folders and the regenerated hub.
4. Optionally, after pushing, confirm each game URL loads on `https://sergeypetrosyan-as.github.io/games/<slug>/`.
