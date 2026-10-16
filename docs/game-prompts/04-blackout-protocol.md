# BLACKOUT PROTOCOL — implementation prompt

You are building **BLACKOUT PROTOCOL**, a futuristic top-down stealth and hacking game, as a complete static browser game for the NEON ARCADE repository. This document is standalone: everything needed to build, test, ship and report is below. Follow it literally; where a number is given, use that number.

Repository facts: the repo root is served by GitHub Pages. Source lives in `source/blackout-protocol/`, the production build is written to `games/blackout-protocol/` (committed by the maintainer, not by you). Allowed dependencies: TypeScript 5.6.3, Vite 5.4.11 and `@types/three` 0.170.0 (devDependencies); `three` 0.170.0 (the 3D renderer, same version as `source/neon-vice`) and the open-licensed (OFL-1.1) `@fontsource` packages `ibm-plex-sans-condensed`, `ibm-plex-mono`, `ibm-plex-serif` and `big-shoulders-stencil-display` 5.3.0, which are bundled into the build so the game stays offline. No UI frameworks, no CDN, no backend, no network at runtime.

---

## 1. Game identity and creative vision

- Title: **BLACKOUT PROTOCOL**. Tagline: *"Cut the lights. Own the dark."*
- Pitch: you are a ghost operative walking into four corporate-military facilities. You cannot out-fight anyone. You win by reading vision cones, spending a small battery of hacking energy at exactly the right moment, and leaving no trace.
- Pillars: (1) **Readable stealth**: every threat tells you what it sees and how suspicious it is. (2) **Planned improvisation**: each objective has several approaches that trade energy, time and noise. (3) **Precise tension**: a mistake is recoverable (checkpoints) but visible in your rating.
- Mood: tactical, dark, precise, security-oriented. Near-black blue environments lit only by sharp cyan lasers, amber warnings and red alarms. No gore, no weapons for the player.

## 2. Original gameplay concept

Top-down tile-based infiltration. Each mission is a facility map. The player sneaks past patrolling guards, rotating cameras and laser grids, picks up keycards and data, hacks terminals through a short memory puzzle, and extracts at an exit zone once all required objectives are done. A pocket **Energy** reserve powers four field hacks (loop camera, lock/unlock door, drop decoy, cut laser grid). Energy regenerates slowly, so every hack is a decision: spend energy to save time and risk, or spend time and risk to save energy.

## 3. Genre and target experience

Top-down stealth puzzle-infiltration, 10 to 25 minutes per mission (about 60 minutes for the campaign). Target feel: a patient heist. The player should regularly stop, watch a patrol cycle, plan a route, then execute it in a flurry of precise key presses. Failing should teach, not punish: checkpoints are frequent, restarts are instant.

## 4. Original story and worldbuilding

Year 2091. The city-state of **Carrow Reach** is run by the **Halcyon Consortium**, whose AI-driven security grid, **WARDEN**, scores every citizen. You are **VEX** (callsign "Null"), a former WARDEN maintenance contractor whose identity was erased from the grid, which makes you the only person it cannot see until it looks directly at you. A resistance cell called **THE UNLIT** hands you contracts through an encrypted channel with a handler voice named **Marrow**.

Campaign arc (4 missions):
1. **COLD ENTRY** — Halcyon Freight Annex. Steal the shipping manifest proving WARDEN ships suppression hardware to the districts.
2. **LATTICE** — Vantage Tower server floor. Pull two memory shards guarded by laser lattices; they hold WARDEN's patrol schedules.
3. **GLASS ARCHIVE** — Meridian Records. Take two security keycards, open the archive spine, copy the audit log that links Halcyon to the blackouts.
4. **BLACKOUT** — the Prometheus Core. Recover the root key, activate three relay terminals, then purge the core. The whole district goes dark, lockdown starts, and you have 40 seconds to extract.

Writing style: short, clipped briefing lines (2 to 4 sentences per mission), terminal-log flavor text. Original names only.

## 5. Player character and relevant entities

All positions are in **tile units** (float); 1 tile = 1.0. Rendering scales tiles to pixels.

- **Operative (player)**: radius 0.28. Walk 3.2 tiles/s, sneak 1.5 tiles/s (Shift or C held toggles; Shift hold = sneak). Has `energy` (0..100), keycards, a facing angle, `hidden` flag, noise radius, visibility value. Cannot attack. One touch from a guard in Alert state (distance < 0.8 with line of sight) = caught.
- **Guard**: radius 0.3. Fields: position, facing, state (`patrol | suspicious | alert | search`), suspicion 0..100, route (waypoints with wait times and optional facing), field of view (default 70 degrees), range (default 7 tiles; 6 to 8 per guard), zone name. Speeds: patrol 1.7, investigate 2.5, chase 3.0 tiles/s, turn rate 4 rad/s.
- **Security camera**: fixed position, base direction, sweep amplitude (default 0.6 rad) and speed, FOV 56 degrees, range 9, zone name. Fills suspicion like a guard; when full it **spots** you.
- **Laser grid**: a group of laser tiles sharing an id letter. Optionally pulses (`on`/`off` seconds). Crossing an active beam trips an alarm. Can be cut by hack.
- **Door**: closed door tile blocks sight and movement. Unlocked doors open automatically when anyone is within 1.2 tiles. Locked doors need a matching keycard (walk up with the card) or a Lock/Unlock hack or a terminal effect. Guards cannot pass locked doors.
- **Terminal**: solid tile. Interact from an adjacent tile to start the **sequence puzzle**. Effects: complete an objective, unlock a door, or start the finale.
- **Decoy**: a noisemaker created by hack, one at a time, lasts 8 s, pings every 1 s with noise radius 9.
- **Locker**: solid tile that is a hiding spot. Interact adjacent to enter (you become hidden and invisible); interact again to leave.
- **Shadow tile**: floor that is dark; shrinks guard sight range to 40 percent.
- **Pickups**: keycards (red, blue, yellow), energy cell (+40), data items (objectives).
- **Checkpoint**: tile marker; stepping on it stores a world snapshot.
- **Exit**: extraction zone; works only when every required objective is complete.

## 6. Core gameplay loop

1. Read the briefing and objective list.
2. Observe: watch guard routes, camera sweeps, laser pulses, light/shadow layout.
3. Plan: choose an approach per objective (stealth walk, shadows, locker, decoy, camera loop, door manipulation, laser cut, alternate route).
4. Execute: move, sneak, hack, interact, solve terminal puzzles.
5. React: a guard becoming suspicious (amber `?`) gives a few seconds to retreat or hide; an alert (red `!`) means chase.
6. Checkpoint, recover or retry; extract; see the result screen; unlock the next mission.

## 7. Signature mechanic: the hacking system

**Energy**: max 100. Regeneration 4/s (easy 5, hard 3.2) but only after 1.0 s without a hack action ("not hacking"). Energy cells restore +40 (capped at 100).

Hack range: devices within **8 tiles** (Euclidean from operative to device; for lasers, to the nearest beam tile) are hackable, no line of sight required. `Tab` or `Q` cycles the focused device among those in range; if the focused device leaves range, focus snaps to the nearest. `Space`, `H` or `Enter` executes the focused device's hack. The HUD shows the focused device, its action name and its energy cost, with a highlight ring on the device.

| Device | Action | Cost | Effect | Trade-off |
| --- | --- | --- | --- | --- |
| Camera | **Loop Camera** | 35 | Camera is blind for 6 s. After 2 s, guards of that camera's zone currently on patrol become suspicious and investigate the camera. | Most expensive; safe window is short; the zone's guards leave their posts toward the camera, which can open or block routes. |
| Door | **Lock / Unlock** | 15 | Toggles the lock. A locked door blocks guards (they wait up to 2 s, then skip the waypoint). Cannot lock while someone stands within 0.8 tiles of the door. | Cheap; unlocking a door also unlocks it for guards. Locking can seal a pursuer or a patrol out. |
| Anywhere | **Drop Decoy** (key `F`) | 20 | Places a decoy 3 tiles ahead (stopping before walls). 8 s. Guards within noise reach (effective distance <= 9) that are not in Alert become suspicious and walk to it, then wait there until it expires. | Costs energy and noise; pulls guards away from a route but also toward whatever is near the decoy. |
| Laser grid | **Cut Grid** | 30 | The grid is off for 5 s. Triggers a short alarm echo at the grid's security-room point (radius 9, kind `alarm`): nearby guards become suspicious and investigate that point. | Most reliable passage, but noisy and costs the most after the camera loop; the echo pulls guards toward the lasers' control room. |

Energy vs time vs noise: loops cost the most energy and have no noise but a delayed side effect; cuts are noisy; doors are cheap but only matter where routes pass doors; decoys are flexible but limited to one active at a time. Pulsing laser grids can be crossed for free by timing, which costs time instead. Terminals cost no energy but cost time and can fail loudly.

Each hack produces a UI toast, a sound, and a ring animation on the device; `stats.hacks` counts them for scoring.

## 8. Controls and input behavior

Keyboard (fully playable):
- Move: `WASD` or arrow keys (8-way, diagonal speed normalized).
- Sneak: hold `Shift` or `C`.
- Interact (terminal, locker, door nudge, pickups are automatic within 0.6 tiles): `E`.
- Cycle hack target: `Tab` or `Q`. Execute hack: `Space`, `H` or `Enter`. Drop decoy: `F`.
- Pause: `Escape` or `P`. Mute: `M`.
- During a terminal puzzle: arrows/WASD enter symbols; `Escape` or `E` aborts without penalty.

Touch: on `(pointer: coarse)` devices, show an on-screen pad (4 direction buttons) and buttons: Interact, Hack, Cycle, Decoy, Sneak (toggle). Pointer events only; no gestures required.

Input is sampled per frame into a state object; edge-triggered actions (interact, hack, cycle, decoy, puzzle direction, cancel) are set for exactly one simulation step. Losing window focus pauses the game and clears held keys. Prevent default on game keys (arrows, Space, Tab) while playing.

## 9. Detection, vision, and stealth rules

All formulas are implemented in the pure simulation (`sim/vision.ts`, `sim/guard.ts`) with no DOM access.

**Line of sight**: grid DDA ray from observer to target. Blocking tiles: walls, lockers, closed doors (a door is open only while someone is within 1.2 tiles and it is unlocked). Terminals, lasers, shadows, items do not block.

**Effective range**: `Reff = range * (litTile ? 1.0 : 0.4) * (sneaking ? 0.75 : 1.0)`. During the finale blackout every tile counts as shadow. A hidden operative (in a locker) is invisible.

**In-view test** (guard or camera): visible iff `dist <= Reff` and the angular difference between facing and the bearing to the target is `<= fov / 2` and line of sight is clear; OR `dist <= 1.0` with clear line of sight (point-blank sense, any angle) unless hidden.

**Proximity factor**: `prox = clamp(1.7 - dist / Reff, 0.7, 1.7)`.

**Suspicion fill** (per second, while visible): `fill = 55 * prox * diffFill * (alert >= 60 ? 1.25 : 1) * (state == search ? 1.25 : 1)`. `diffFill`: easy 0.75, normal 1.0, hard 1.3. Cameras use base 70 instead of 55.

**Suspicion decay** (after 0.6 s of no contact): patrol 14/s, suspicious 8/s, search 6/s, alert 0 (see below).

**Hearing**: noise events have a position and radius. Effective distance `de = dist * (1 + 0.8 * wallsOnStraightLine)`; heard iff `de <= radius`. Footsteps: walking emits radius 4.5 every 0.34 s, sneaking radius 1.6 every 0.5 s, standing still emits nothing. Footstep effect on a guard in `patrol` or `search`: `sus = max(sus, 20 + 30 * (1 - de / radius))` and the investigation target becomes the noise position. Alarm-type noises (laser trip, failed puzzle, laser cut echo) set `sus = max(sus, 50)`. Decoy pings set `sus = max(sus, 40)` and mark the guard as decoy-driven.

**Guard state machine**:
- `patrol`: follow route (path-find between waypoints with BFS over walkable tiles; unlocked doors passable). At waypoints wait `wait` seconds, face `face` if given, else sweep +/-0.5 rad. Transition to `suspicious` when `sus >= 35`.
- `suspicious`: sub-phases `look` (0.7 s, turn to target), `go` (walk to the last seen/heard point at 2.5), `inspect` (2.5 s, sweep). Decoy-driven guards stay in `inspect` until the decoy expires. Back to `patrol` when the phases end (and `sus < 35`). Transition to `alert` when `sus >= 100` with the operative visible. Hearing alarm noise restarts the phases at the new point.
- `alert`: on entry, once: global alert `+20`, `stats.spotted++`, and every non-alert guard within 12 tiles becomes `suspicious` toward the operative's position with `sus = 60` ("call backup"). Chases the operative at 3.0 along BFS paths (recomputed every 0.4 s), targeting the live position when visible else the last seen point. Catch when `dist < 0.8` with line of sight (or at a compromised locker). After 3 s without sight, goes to `search`.
- `search`: walk to the last seen point, sweep. After **15 s** without contact total (counted from last contact), return to `patrol` and `sus = 0`. If the operative is seen again, normal fill rules apply (x1.25).
- Hiding while watched: if the operative enters a locker while any `alert` or `suspicious` guard currently sees them within 7 tiles, that guard targets the locker and catches the operative at distance < 1.2.

**Global alert meter** (0..100): `+20` per guard alert entry, `+15` camera spot, `+20` laser trip (cooldown 3 s per grid), `+8` failed puzzle. Decays at 2/s only when no guard is in `alert` and no camera is tracking. Bands: `<30` calm, `30..59` caution, `60..99` danger, `100` lockdown = operative compromised. `alert >= 60` multiplies fill by 1.25 (see above).

**Camera**: facing `base + sweep * sin(phase)`, phase advances `speed * dt`. Suspicion fill as guards but base 70. At 100: spot event (cooldown 5 s): global `+15`, guards in the same zone become `suspicious` toward the operative with `sus = 60`, camera tracks the operative for 4 s (turns toward them at 3 rad/s). A looped camera (`loopT > 0`) never detects.

**Lasers**: operative center within a beam tile (active grid) trips: noise `alarm` radius 10 at the tile, global `+20`, `stats.alarms++`, per-grid cooldown 3 s.

**Lockers and shadows**: lockers hide fully; shadows cut guard range to 40 percent; sneaking multiplies range by 0.75 and noise radius becomes 1.6. Visibility meter on the HUD: lit walking 100, lit sneaking 75, shadow walking 40, shadow sneaking 30, hidden 0.

**Failure and recovery**: being caught or reaching alert 100 = `compromised`. After a 1.2 s overlay the world restores the last checkpoint snapshot (or mission start), sets `alert = 30`, `retries++`. The player may also press Restart from the pause menu (restart from checkpoint, or restart mission).

## 10. Progression and difficulty

- Missions unlock sequentially: finishing mission N unlocks N+1 (mission 1 unlocked at start).
- Difficulty (setting, applies at mission start and live): **Easy** (fill x0.75, guard range x0.9, energy regen 5), **Normal** (x1, x1, 4), **Hard** (x1.3, guard range x1.1, regen 3.2, puzzle +1 symbol).
- Missions increase in density: 2 guards and 1 camera (M1); lasers and 2 cameras (M2); 4 guards with chokepoints, keycards (M3); finale with three relay terminals, blackout and countdown (M4).
- Rating per mission: `S` >= 950, `A` >= 800, `B` >= 600, `C` otherwise; best result per mission (score, rating, time) is persisted.
- Score: `1000 - 2*max(0, time - par) - 4*peakAlert - 60*spotted - 15*alarms - 120*retries + (ghost ? 150 : 0)`, clamped to 0..1150. Ghost = no guard ever went `suspicious`, no alarms, no retries. The result also lists approach tags: Ghost, Hacker (>= 4 hacks), Decoy Artist, Lockpicker, Shadow Walker (time sneaking in shadow >= 30 percent), Loud (alarms > 0).

## 11. Mission design

Maps are ASCII tile maps (see 17). Every mission lists `par` seconds and required objectives. Every mission has at least two approaches to its critical obstacle. All four must be solvable by the headless test routes. Coordinates below are tile (column, row) from the top-left.

### M1 COLD ENTRY (30 x 16, par 150, difficulty: tutorial)
- Layout: top row = start room (1..7, 1..6), office (9..17, 1..6) holding the red keycard, vault (19..28, 1..6) holding terminal A; a 2-wide corridor (rows 8..9) under them; bottom row = exit dock (1..10, 11..14) and storage (12..28, 11..14).
- Actors: corridor guard G0 patrols (3,8) to (26,9) with 2 s waits; office guard G1 patrols three points; camera at (28,8) looks west along the corridor; lockers at (14,9), (10,6), (12,12), (7,6), (28,12); shadow stretches at corridor columns 10..15 and 21..27.
- Objectives: (1) download the manifest at terminal A (27,2), puzzle length 4; (2) extract at X (2,13).
- Approaches: red keycard from the office (stealth past G1, or lure G1 with a decoy); or Unlock hack on the vault door (24,7) for 15 energy from the corridor; camera: loop for 35 energy, or sneak through the shadow stretch (sneaking range 9 * 0.4 * 0.75 = 2.7 tiles); locker (14,9) lets you wait for the corridor guard to pass.
- Teaches: cones, shadows, lockers, decoys, terminals, camera loop, keycards, doors.

### M2 LATTICE (36 x 20, par 240)
- Layout: bands of rooms above (rows 1..6) and below (rows 11..18) a corridor (rows 8..9); columns: west (1..10), central (12..23), east (25..34). Start in the south-east room, exit lift at the far south-west.
- Actors: corridor guard G0 (2,8) to (33,9); south guard G1 patrols the south-central room; east guard G2 patrols the west edge of the east server room (column 26) in shadow; camera C1 (34,8) looks west along the corridor; camera C2 (23,1) covers the central server room.
- Lasers: grid `a` at the east room entrance (29..31,7), pulsing 2.5 s on and 1.5 s off; grid `b` at the central room entrance (17..18,7), continuous.
- Objectives: shard ALPHA at (33,2) in the east server room; shard BETA at (21,2) in the central server room; extract at X (2,17).
- Approaches: ALPHA by timing the pulse (free) or cutting grid a (30); the corridor camera loop (35) hides the dash; locker (34,6) lets you wait inside the room. BETA by cutting grid b (30) and looping C2 (35) from (20,8), or via the locked west door `4` at (11,3): terminal B (2,2, puzzle length 5) or a Unlock hack (15) from inside the central room gives a silent exit through the west room and its door `5`.
- Energy lesson: a full set of hacks cannot be afforded back to back; regeneration time is part of the plan.

### M3 GLASS ARCHIVE (40 x 22, par 330)
- Layout: north row = admin office W (1..11, 1..9), security hub M (13..25, 1..9), archive E (27..38, 1..9); a 2-wide maintenance corridor (rows 11..12); south row = lobby (1..11, 14..20), atrium (13..25, 14..20), dock (27..38, 14..20) with exit X at (37,19).
- Actors: corridor guard G0 (2,11) to (37,12); atrium patrol G1, atrium chokepoint guard G2 stationed at the lobby door (14,17) facing west with range 8; hub guard G3 patrols the shadowed south half of the hub; admin guard G4 patrols column 8; cameras: atrium (25,14), corridor east end (38,11), archive (28,9) facing east.
- Lasers: grid `a` spans the full hub width at row 5 (13..25), pulsing 3 s on and 2 s off, with the blue keycard beyond it.
- Objectives: take the red keycard at (3,2); take the blue keycard at (22,2); copy the audit log at terminal E (37,8) with a tight 13 s limit and length 6; extract at X.
- Approaches: red door `1` (19,10) opens with the red card; blue door `2` (32,10) opens with the blue card; the atrium route (decoy the chokepoint guard, loop the atrium camera) reaches the dock directly; shadows in the archive let you sneak past the archive camera; lockers at the corridor and in the hub; locking door `4` seals the dock from the corridor patrol.

### M4 BLACKOUT (44 x 24, par 480, final mission)
- Layout: a long hall (rows 8..9) with a north row of rooms (north-west wing, north vault, north-east wing, rows 1..6), a south row (south-west wing, central core room (17..26, 11..15), south-east wing), and the exit room below the core reached only through door `9` at (21,16).
- Actors: hall guard G0 (2,8) to (41,9); one guard in each of the NW, NE, SW and SE wings along the room edges; camera at the hall east end (42,9) and a vault camera (28,1); laser grid `a` (20..22,7) at the vault entrance.
- Objectives: root key at (21,2) in the north vault; relays R1 (B at (2,2), length 5, also unlocks vault side door `7`), R2 (C at (41,2), length 5), R3 (E at (2,19), length 6); core purge at terminal D (24,11), length 7, limit 16 s, requires the key and all relays; extract at the roof lift X (21,21) before the 40 s countdown ends.
- Approaches: vault by the laser entrance (cut for 30) or by the side door after relay R1; hall by lockers at (14,9) and (28,9), shadow stretches at columns 9..16 and 25..32, or camera loops; finale by locking door `9` behind you (15 energy) so converging guards cannot follow.
- Finale: when the purge succeeds the world becomes blackout (all tiles shadow, vision range x0.4), cameras die, global alert is set to at least 50, every guard turns suspicious toward the core and converges, a 40 second countdown starts, and a checkpoint is stored. If the countdown reaches zero the mission is compromised. Completing the mission shows the campaign epilogue ("The grid is blind. For one night, Carrow Reach is unlit.").

## 12. Art direction and visual identity

**Direction: "night shift in a real building".** The facility is a physical place seen through a tilted tactical camera, not a neon diagram. The interface is two pieces of operator equipment: a **wrist-mounted intrusion kit** (HUD, terminal puzzle, pause) and an **encrypted mission dossier** (briefing, after-action report). Everything else is quiet.

**Renderer.** Real 3D with Three.js 0.170.0 (WebGL 2). Canvas 2D (the original renderer) remains as the fallback when WebGL is unavailable or the context cannot be restored, with a plain message saying so.
- Camera: perspective, 38 degree vertical FOV, pitched about 60 degrees down, smooth exponential follow, leading 1.4 tiles toward the operative's heading with a slight extra tilt. Hold `Z` for a tactical zoom-out to plan routes. Walls between camera and operative are cut down to a 0.35-tile stub inside a small window so the operative is never hidden.
- Architecture from the ASCII map, 1 tile = 1 world unit: walls 1.25 high with painted two-tone concrete faces and dark cut caps, merged into a few draw calls; door tiles get steel jambs, a header and two brushed-steel sliding panels that retract into the walls; lockers are tall steel cabinets facing the open floor; terminals are desks with a monitor whose screen is a live canvas; laser tiles are emitter posts with three beams. Furniture skins (server racks with status LEDs, steel shelving with archive boxes, crate stacks, filing cabinets) replace the room-facing half of thick wall tiles only, so nothing drawn on walkable floor ever blocks you and nothing that blocks you is drawn low. Upper bands of interior partitions are frosted glass with steel mullions (opaque, so it never suggests sight). Cable trays and vents run along wall faces; floor vents sit on shadow tiles.
- Materials: physically based (`MeshStandardMaterial`): rubber studded floor tiles on lit floor, diamond tread plate on shadow floor, painted concrete, brushed steel (doors, emitters, mounts) with a dim private environment map, matte uniforms. All textures are procedural canvases (albedo, roughness and normal derived from a height field) with grime, scuffs and wear generated from a seeded noise.
- Light carries the rules: the world is genuinely dark. Fluorescent fixtures hang only over lit tiles; their light is baked once per mission into a light field (per-texel falloff with wall occlusion, shadow tiles masked to 6 percent) that every static material samples by world position, so shadow tiles look and are dark. Guard flashlights are real `SpotLight`s whose angle equals the logical FOV and whose distance equals the logical range; cameras carry their own spots. Alert is shown by rotating amber (caution) and red (danger and lockdown) beacon sweeps evaluated in the same shader, each texel listening only to a beacon it can see. In the finale blackout the fixtures die and only emergency light, flashlights and screens remain.
- Post: ACES filmic tone mapping, exponential fog for haze, `UnrealBloomPass` on emissives (laser cores, screens, fixtures, LEDs), additive haze sheets around laser beams, light volumes for flashlights on High.

**Palette (named, used across UI and world accents):**

| Name | Hex | Role |
| --- | --- | --- |
| Carbon | `#0D1013` | deepest surface: screen glass, page background, fog |
| Gunmetal | `#272D32` | equipment housing, key caps, panels |
| Fluorescent | `#DCE4E6` | primary text on dark, fixture light colour, patrol cones |
| Sodium | `#F0A541` | energy, focused device, suspicion, the one primary action |
| Alarm | `#E2483D` | alert state, locked doors, failure |
| Manila | `#E7DDC4` | dossier paper (ink on it is Carbon) |

Detection colours in the world keep their meaning: patrol Fluorescent, suspicious Sodium, alert Alarm, search violet `#B58CFF`; lasers stay cyan `#5EF2FF` (a device colour, never a state). The colorblind palette (setting) uses blue `#4AA3FF`, orange `#FFA000`, white-magenta `#FF7BFF` and white; state is always also carried by pattern (patrol none, suspicious diagonal hatch with dashed edge, alert cross hatch with solid thick edge, search dots with dotted edge) and by the icon over the head (none, triangle with `?`, diamond with `!`, ring with three dots).

**Typefaces (bundled with `@fontsource`, OFL-1.1, Latin subset only):**
- IBM Plex Sans Condensed 500/600: all interface text on equipment, buttons, HUD labels, menus. Sentence case.
- IBM Plex Mono 500: numerals only (timer, energy value, costs, distances, scores, puzzle counters). Never for words.
- IBM Plex Serif 400 and italic: dossier prose (briefing, Marrow's quotes, field notes, the epilogue).
- Big Shoulders Stencil Display 800: only for things stamped on paper: the mission name on the dossier and the rating stamp. This is where the boldness is spent.

**Entities.** Operative: a hooded figure in charcoal with a sling pack and dim goggle lenses, a cool rim light so it reads in the dark; walking swings arms and legs, sneaking lowers the hips and leans forward, hiding removes the figure and lights the locker seam. A ground ring states visibility by shape: solid ring with four rays (lit and walking), solid ring with two rays (lit, sneaking), dashed thin ring (shadow), no ring and a glowing locker seam (hidden). Guards: two uniform families (Halcyon security in navy with reflective bands and a cap; Warden tactical in olive grey with a helmet), a head that turns ahead of the body, a flashlight in the right hand that sweeps with the vision direction, raised arms and a forward lean in alert. Cameras: wall bracket, housing that physically yaws, a lens LED that blinks (grey when looped). Doors: sliding panels, a status lamp on the header and a red lock bar across the panels when locked (keycard doors carry a coloured stripe). Terminals: glowing monitor with the terminal letter and state text. Decoy: a puck with a blinking amber LED and a countdown arc. Exit: a chevron floor plate that turns green and throws a light column once the objectives are done.

**Design principles.** (1) The world tells the rules: light means seen, dark means safe, and the HUD only confirms. (2) Equipment, not overlays: every panel looks like a thing an operator carries, with hard chamfered corners, engraved labels and real key caps; no floating glass cards. (3) One bold gesture: paper in a dark world. Everything else is disciplined. (4) Never colour alone: every state also has a shape, a pattern or a word. (5) Plain words: sentence case, buttons say what they do.

**Review notes (second pass, applied before coding).** The first draft was checked against the brief and against generic generated-UI tells, and changed as follows. Three stacked caps-labelled bars (ENERGY / ALERT / VISIBILITY) became a ten-segment energy cell, a facility status strip with named bands, and a three-position light meter with shape glyphs. Sodium on every button read as the near-black-plus-one-accent cliché, so Sodium now marks only energy, the focused device and the single primary action, and the paper surface gives the palette a second major tone. All-caps section labels in the dossier became sentence-case headings. Stencil on every heading was cut back to the paper stamps. The mission list of identical rounded cards became a ruled ledger. Soft radii and grey drop shadows were replaced by chamfered corners and one physical paper shadow. Mono for small labels was restricted to numerals. Arrow glyphs on buttons and dot-separated meta strings were removed.

## 13. Animation and VFX

- Characters: procedural walk cycle driven by distance moved (so speed and stride always agree), sneak posture blend, guard head turn and flashlight sweep, alert pose blend over 0.25 s.
- Vision: each guard and camera draws its logical cone (36 rays clipped by sight blockers, recomputed every frame) as a floor decal with distance fade, patterned fill and state-specific edges, plus a dotted arc at the shadow sight range. The `Show vision cones` setting hides the decals only; flashlights, camera spots, icons and suspicion bars remain. On Low quality, where spotlights are off, the decal is also drawn as soft additive light so the lit area still matches.
- Suspicion: a billboard bar over each guard and camera with a fixed tick at the suspicious threshold (35), plus the state icon.
- Noise rings expand and fade on the floor (0.6 s); hack rings and a device flash on every hack; camera lens blink; laser cores flicker slightly and bloom, with additive haze sheets; the decoy LED blinks at 2 Hz; terminal screens scroll while a puzzle runs.
- Alert: rotating beacon sweeps (amber at caution, red from danger), a single decaying red edge fade when a guard goes alert, a 4 px camera shake for 0.2 s on being caught.
- Finale: fixtures fade out over 1.5 s, emergency red takes over, countdown on the HUD.
- Reduced motion disables flicker, shake, blinking, beacon rotation (beacons become a steady tint), pulses beyond a single frame and camera lead; it keeps every state visible.

## 14. Sound design and music

Web Audio synthesis only; the `AudioContext` is created on the first user gesture. Master gain from the volume setting; mute `M` persisted. Sounds: footsteps (filtered noise ticks, quieter when sneaking), terminal beeps per symbol, success arpeggio, failure buzz, suspicious blip (rising sine), alert alarm (alternating sawtooth 440/660 Hz), laser hum (continuous 110 Hz oscillator whose gain follows proximity to an active beam), laser trip (sharp saw), door whoosh (noise sweep), locker thunk, hack sweep, decoy ping, pickup chime, checkpoint tone, extraction chord, countdown beep. Music: a sparse ambient drone plus a soft pulse whose tempo and brightness scale with the alert meter. Never exceed -6 dB peak; no sound before the first gesture.

## 15. Menus and in-game UI

DOM overlays above the 3D canvas. Content is unchanged from the original design (title, mission select, briefing, HUD with timer, objectives, energy, alert, visibility, focused device, toasts and finale countdown, pause, puzzle, compromised overlay, result, epilogue, settings, help); the presentation is operator equipment.

- **Title**: the live 3D facility drifts behind a left-aligned block: the game name set large in Plex Sans Condensed 600, the tagline in serif italic, and a plain vertical list of actions (Continue, Mission select, Settings, How to play). Focus shows as a 3 px Fluorescent outline plus a left rule. No card.
- **Mission select**: a ruled ledger on Carbon, one row per file: file number, name, location, best rating and score in Mono. Locked rows say why.
- **Briefing (dossier, the bold piece)**: a Manila sheet with a slight paper grain and one physical shadow, tilted -0.6 degrees. Header line with the file number and location; the mission name stamped in stencil; Marrow's lines in serif; objectives as a numbered list; field notes in serif italic with a hand-ruled left margin; the operative name redacted in the header. Actions below the sheet on the dark ground: `Start mission` (primary) and `Back to missions`.
- **HUD (wrist kit)**: a single Gunmetal housing anchored bottom-left with chamfered corners and engraved labels; a slim mission strip top-left; a facility status strip top-right; objectives as a short checklist under the mission strip; toasts as one-line printouts above the kit.
- **Terminal puzzle**: the kit's screen extends upward into a handheld intrusion display: Carbon glass with a faint scan, the sequence as rubber key caps, a depleting time rail, status in plain words, and four physical arrow keys for touch.
- **Pause**: the kit in standby: a Gunmetal panel with a plain action list. **Settings** uses the same panel with clear rows (volume, mute, colorblind palette, vision cones, reduce motion, difficulty, graphics quality with the detected tier shown).
- **Result (after-action report)**: the dossier again: a Manila sheet with the figures in a typed table and the rating stamped in stencil at an angle; actions below: `Next mission`, `Replay mission`, `Mission select`.

In-mission HUD wireframe:

```
+-----------------------------------------------------------------------------------+
| Cold Entry   04:12  par 02:30   [Pause]                Facility  calm  |##-------| |
| [ ] Download the shipping manifest                                                 |
| [x] Reach the extraction dock                                                      |
|                                                                                    |
|                              3D facility, tilted camera                            |
|                                                                                    |
|                       > Camera looped, 6 seconds blind                             |
| /--------------------------------------------------\                               |
| | Cell  [#][#][#][#][#][#][ ][ ][ ][ ]   62        |                               |
| | Light  ( )dark  (o)shadow  (*)lit      Shadow, sneaking                          |
| | Link   Camera  3.2 tiles     Loop feed     35    |                               |
| |        [Tab] next device  [Space] run  [F] decoy 20                              |
| \--------------------------------------------------/                               |
+-----------------------------------------------------------------------------------+
```

Result screen wireframe:

```
          +---------------------------------------------------------+
          | File 01   Halcyon Freight Annex        After-action report|
          |                                                         |
          |  COLD ENTRY   (stencil)                    +---------+  |
          |                                            |    A    |  | <- stamp, -6 deg
          |                                            +---------+  |
          |  Time ...................... 02:41   par 02:30          |
          |  Peak alert ................ 20                         |
          |  Times spotted ............. 0                          |
          |  Alarms .................... 0                          |
          |  Hacks used ................ 3                          |
          |  Retries ................... 0                          |
          |  Score ..................... 912   best on file A 912   |
          |  Approach noted: Ghost, Hacker                          |
          +---------------------------------------------------------+
             [ Next mission ]   [ Replay mission ]   [ Mission select ]
```

Visible focus rings (`:focus-visible` 3 px Fluorescent outline with 2 px offset; on paper the ring is Carbon) on every button; menus are keyboard navigable (arrow keys move focus, Enter activates).

## 16. Accessibility and settings

Settings (persisted): graphics quality (Auto, Low, Medium, High; Auto picks a tier from the GPU string, core count and pointer type, Medium is the 60 fps target; Low = pixel ratio 1, no spotlights or shadows, no bloom or haze, cone decals drawn as soft light; Medium = pixel ratio 1.5, 512 px spot shadows, bloom, laser haze; High = pixel ratio 2, 1024 px soft shadows, bloom, haze and flashlight volumes; a `?quality=` URL flag overrides it without saving), volume (0..100), mute, colorblind-safe detection palette, show vision cones (toggle; when off, guards still show suspicion bars and shapes), difficulty, reduce motion (default from `prefers-reduced-motion`). Guard state is always encoded by shape, text-free icon, and pattern as well as color. Text contrast at least 4.5:1. HUD font sizes at least 14 px on phone width. `aria-live="polite"` region mirrors toasts and objective changes. All controls reachable by keyboard. No flashing faster than 3 Hz; alert flash is a single decaying fade.

## 17. Technical architecture

- Stack: TypeScript strict, Vite, plain DOM, a Three.js WebGL canvas (`render/three/`: `renderer3d.ts`, `level.ts`, `bake.ts`, `actors.ts`, `cones.ts`, `ring.ts`, `textures.ts`, `quality.ts`) and the Canvas 2D fallback (`render/renderer.ts`), both behind `render/types.ts` `GameRenderer`. The 3D renderer disposes every GPU resource on mission change, handles resize, and on WebGL context loss shows a message, rebuilds on restore, or switches to the 2D view after 5 s. URL flags: `?mission=N` opens mission N directly; `?debug=1` exposes the game as `window.__bp` and enables `&spawn=x,y`. Entry `index.html` (title `BLACKOUT PROTOCOL`).
- Modules: `sim/` (pure): `types.ts`, `rng.ts`, `grid.ts` (tiles, DDA line of sight, BFS), `vision.ts`, `guard.ts`, `world.ts` (create, step, snapshot/restore, hack API, scoring). `missions/` (`maps.ts` ASCII, `missions.ts` metadata and parsing). `hacking/puzzle.ts`. `audio/audio.ts`. `render/renderer.ts`. `ui/` (screens, hud). `state/` (settings, progress). `storage/store.ts` (safe localStorage). `game/game.ts` (loop and input). `main.ts`.
- **Fixed-step simulation**: `STEP = 1/60`. The loop accumulates `min(frameDelta, 0.05)` and calls `step(world, input, STEP)` zero or more times per frame (cap 5 steps). Rendering interpolates nothing but reads the latest state. The simulation uses only its own seeded PRNG (mulberry32) so identical inputs give identical results.
- **Tile map legend**: `#` wall, `.` lit floor, `,` shadow floor, `L` locker, `S` start, `X` exit, `K` checkpoint, `1`..`9` doors (metadata by id), `A`..`J` (except `K`, `L`, `S`, `X`) terminals, `a`..`d` laser tiles (grid id), `e` energy cell, `r` `u` `y` red/blue/yellow keycards, `i` `j` `m` objective items.
- **World state is plain data** (no classes, no functions, no typed arrays inside the mutable state) so `structuredClone` and `JSON.stringify` work for checkpoints; the immutable map is held separately.
- **AI**: finite state machine described in 9; BFS pathfinding on a <= 44 x 24 grid is recomputed at most every 0.4 s per guard.
- **Data schema** (`MissionDef`): `{ id, index, name, subtitle, briefing[], par, map: string[], objectives: [{id,label,optional?}], doors: {id,locked,card?}[], terminals: {id,len,time?,label,effect}[], lasers: {id,period?,echo}[], items: {id,kind,card?,objective?}[], guards: {route:[{x,y,wait,face?}],fov?,range?,zone}[], cameras: {x,y,dir,sweep,speed,zone}[], finale?: {...} }`.
- Save schema: see 20.
- Headless entry points exported from `sim/world.ts` so `scripts/check-sim.ts` runs with `node --experimental-strip-types` (so use `import type`, explicit `.ts` import extensions inside `sim/`, `missions/`, `hacking/`, no enums, no parameter properties).

- **Constants reference** (keep them in one `K` object in `sim/vision.ts`):
  - Movement: `PLAYER_R 0.28`, `WALK 3.2`, `SNEAK 1.5` tiles/s.
  - Hacking: `ENERGY_MAX 100`, `HACK_RANGE 8`, costs `LOOP 35`, `DOOR 15`, `DECOY 20`, `CUT 30`, durations `LOOP 6`, `LOOP_WATCH 2`, `CUT 5`, `DECOY 8`, `DECOY_RADIUS 9`, `ECHO_RADIUS 9`, `ENERGY_CELL 40`.
  - Noise: walk radius 4.5 every 0.34 s, sneak radius 1.6 every 0.5 s.
  - Guards: patrol 1.7, investigate 2.5, chase 3.0; FOV 70 degrees; range 7; suspicious threshold 35; alert 100; search 15 s; catch distance 0.8.
  - Cameras: FOV 56 degrees, range 9, fill 70 per second; guards fill 55 per second.
  - Range multipliers: shadow 0.4, sneaking 0.75.
- **Simulation events** (`world.events`, consumed once per step by the game layer for audio, toasts, flashes and checkpoint saves): `step`, `suspicious`, `alert`, `search`, `spot`, `laser`, `hack`, `cycle`, `deny`, `pickup`, `door`, `locker`, `decoy`, `ping`, `puzzleStart`, `puzzleKey`, `puzzleBad`, `puzzleOk`, `puzzleFail`, `checkpoint`, `objective`, `finale`, `countdown`, `complete`, `compromised`, `toast`.
- **Snapshots**: `takeSnapshot(world)` returns `structuredClone` of the world minus `map`, `def`, `events`; `restoreSnapshot(world, snap)` reassigns it, keeps `time`, `stats` and `alertPeak`, increments `stats.retries`, and sets `alert = 30` (the checkpoint penalty). The same object is stored in `localStorage` as the saved checkpoint.
- **Rendering (2D fallback)**: tile size `clamp(min(w,h)/12.5, 22, 54)` pixels; the camera follows the operative; layers in order: tiles, items, vision cones (36 rays clipped by sight blockers), noise rings, decoy, cameras, guards with state icons and suspicion bars, hack focus ring, operative, light/vignette (blackout limits light to a 5.5 tile radius).

## 18. Performance requirements

60 fps on a mid-range laptop at Medium quality (3D); simulation step under 1 ms; the light field is baked once per mission; simulation step under 1 ms; per-frame allocation minimal (reuse arrays for cone polygons where practical); cone polygons use at most 48 rays; canvas redraw only the visible tile window; `devicePixelRatio` capped at 2; build output (JS+CSS, including Three.js) under 250 KB gzip; fonts are separate woff2 files.

## 19. Asset creation and licensing

Everything is procedural or original: architecture, characters, textures (canvas-generated albedo, roughness and normal maps), icons and HUD built with Three.js, Canvas 2D and CSS; the only third-party assets are the OFL-1.1 fonts listed at the top; sounds synthesized with Web Audio; maps authored here. No other third-party art, audio or code beyond the declared dependencies. `poster.png` (optional) is a screenshot of the running game.

## 20. Save and persistence behavior

Key `blackout-protocol:v1` in `localStorage`, JSON: `{ v:1, unlocked:number, best:{[missionId]:{score,rating,time}}, settings:{volume,mute,colorblind,cones,difficulty,reduceMotion}, checkpoint:{mission,snapshot,time}|null }`. Every read and write is inside `try/catch`; invalid JSON or wrong shape falls back to defaults; a corrupted checkpoint is discarded. The checkpoint is saved whenever a checkpoint tile is reached and cleared on mission completion. Private mode or blocked storage must not break the game (in-memory fallback).

## 21. Error handling and browser compatibility

Target evergreen Chrome, Edge, Firefox, Safari (ES2020 output). No `alert`. `AudioContext` creation is wrapped in try/catch; if unavailable the game runs silently. Canvas resize on `resize` and `orientationchange`. Unhandled input cases never throw; the game loop catches exceptions per frame, shows a recoverable error panel with a Restart button, and logs once to the console.

## 22. Testing strategy

Headless tests in `scripts/check-sim.ts`, run with `node --experimental-strip-types scripts/check-sim.ts` (exit code non-zero on failure). Required cases:
1. Map validation: all missions parse; rows equal width; one start, one exit; entities on legal tiles; every route waypoint reachable; ids resolve.
2. Detection: a guard detects the operative inside its cone with clear line of sight; does **not** detect when a wall is between; does not detect outside the cone; shadow reduces range; sneaking reduces range; hidden operative is never seen.
3. State transitions: patrol to suspicious to alert to search to patrol with the 15 s timer; global alert changes.
4. Decoy pulls a patrolling guard toward its position.
5. Hacks: costs, energy regen delay, camera loop blindness, laser cut window, door lock blocks guards.
6. Puzzle: correct input succeeds, wrong input fails and locks the terminal.
7. Checkpoint snapshot restore.
8. **Solvability**: each of the four missions is completed by a scripted bot route (sequence of goto/interact/hack/puzzle steps with cautious waiting) with `status === 'complete'` and no catches; report time and peak alert.
Then `npm run typecheck` and `npm run build`. Manual browser check: menu, start mission 1, move, see a vision cone, use a hack, no console errors.

Checklist the test script must print as PASS (one line each):
- All four maps parse with zero errors; rows have equal width; start and exit exist; doors, terminals and lasers resolve; the exit is reachable with doors unlocked.
- Guard waypoints sit on walkable tiles; cameras sit on floor tiles; every laser grid has beam tiles.
- Cone detection: inside the cone, outside the cone, beyond range, behind a wall, in shadow, sneaking, hidden, point-blank in front and behind.
- A wall between guard and operative keeps the guard calm over 5 s.
- Transition sequence patrol, suspicious, alert while standing in view; alert meter +20; spotted counter +1; alert to search after about 3 s; search to patrol after 15 s without contact; an alert guard that reaches the operative compromises the run.
- Decoy: cost 20; placed ahead; guard turns suspicious and moves closer; not counted as a detection; guard returns to patrol after the decoy expires.
- Hacks: camera loop cost 35 and blindness for 6 s; no regeneration for 1.0 s after a hack, then 4/s; camera detects again after the loop; laser cut cost 30 and a 5 s window with no trip, trips afterwards; a locked door blocks a guard route; a hack without enough energy is refused.
- Puzzle: starts on interact, hides the pattern after the show phase, correct input completes the objective, wrong input locks the terminal and raises the alarm, timeout fails.
- Checkpoint snapshot round-trips through JSON and restores position, retry count and alert.
- Persistence sanitising: corrupt input falls back to defaults, wrong types are clamped.
- Each mission solved by its scripted route with status `complete` and zero retries.

## 23. Gaming hub integration

Hub entry data for the maintainer: `playUrl: './games/blackout-protocol/'`, title `BLACKOUT PROTOCOL`, tagline "Cut the lights. Own the dark.", genres Stealth / Hacking / Tactical, accent `cyan`, controls (WASD move, Shift sneak, E interact, Tab cycle target, Space hack, F decoy, Esc pause, M mute), tech: TypeScript, Vite, Canvas 2D, Web Audio. Do not edit hub files yourself; report these facts.

## 24. GitHub Pages deployment requirements

Vite config: `base: './'`, `build: { outDir: '../../games/blackout-protocol', emptyOutDir: true, target: 'es2020', assetsInlineLimit: 0 }`, `server: { port: 5234, strictPort: true }`. Pages serves from the repository root, so the built `games/blackout-protocol/index.html` must work from a sub-path with relative asset URLs. `index.html` includes the small redirect script that sends visitors from `/source/blackout-protocol` on `github.io` to `games/blackout-protocol/`. No server routing required.

## 25. Definition of done

- [ ] This spec file exists and the implementation follows it
- [ ] `package.json`, `tsconfig.json`, `vite.config.ts` match the sibling conventions; only `typescript` and `vite` as devDependencies
- [ ] Four missions with distinct layouts, objectives and finale
- [ ] Guards with the full state machine; cameras; lasers; doors; keycards; lockers; shadows; decoys; terminals with failable puzzles
- [ ] Hacking system with energy economy exactly as in 7
- [ ] Readable cones, suspicion bars, alert meter, visibility meter
- [ ] Checkpoints, restart, compromised flow, result screen with rating, persisted best results and unlocks
- [ ] Audio synthesis, mute, volume; settings persisted; reduced motion honored; colorblind palette
- [ ] Keyboard fully playable; touch buttons present
- [ ] `scripts/check-sim.ts` passes (all listed cases)
- [ ] `npm run typecheck` and `npm run build` pass; `games/blackout-protocol/index.html` exists
- [ ] Browser check done with zero console errors; poster captured or reported as not captured
- [ ] No `alert`, no placeholder or TODO text in shipped UI

## 26. Final reporting requirements

Report under 250 words: status (COMPLETE / PARTIAL / BLOCKED and any missing mandatory features), exact commands run with results (sim tests, typecheck, build, preview), browser verification and console errors, poster status, files created or modified (paths only), and the hub entry facts (playUrl, title, tagline, two-sentence description, genre tags, controls, tech list, accent). Never claim a verification that was not run.
