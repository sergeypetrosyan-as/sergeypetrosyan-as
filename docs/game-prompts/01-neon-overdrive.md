# NEON OVERDRIVE — Implementation Prompt

You are building **NEON OVERDRIVE**, a futuristic arcade racing game, as a static browser game for the NEON ARCADE gaming hub. This document is a standalone implementation prompt. Follow it literally; every number below is a starting tuning value and must live in a single tuning module so it can be changed without touching logic.

---

## 1. Game identity and creative vision

- **Title:** NEON OVERDRIVE. **Tagline:** "Burn the reserve. Cut the Spine."
- **Pitch:** a fast, luminous, three-lap arcade race through a midnight-blue megacity. The road is a real 3D ribbon with hills, banked curves, wet asphalt and glowing signage. Every track hides a narrow, faster inner route, the **Spine**, whose gates only open for drivers who carry enough **Overdrive reserve**.
- **Mood:** kinetic, electric, slightly lonely. A city that never sleeps and a race nobody is watching.
- **Palette (global):** midnight blue `#050816` / `#0a1030`, electric cyan `#2cf6ff`, magenta `#ff2ea6`, violet `#8a4dff`, one warm contrast accent amber `#ffb347`. Hub accent: **cyan**.
- **Originality rule:** no names, logos, car shapes, tracks or sounds from commercial racing games. All art and audio is procedural.

## 2. Original gameplay concept

You race three AI rivals for three laps. Handling is arcade: easy to steer, rewarding to drift. Drifting and clean driving fill the **Overdrive reserve** (0–100). Boost spends it. The Spine is the strategic layer: a protected centre channel through certain stretches of each track that is about 35% shorter and 14% faster, but its entrance gate is solid unless the reserve is at or above the **Spine threshold (40%)** at the instant you cross it. Wasting boost before a gate can cost you the shortcut; hoarding reserve costs you straight-line speed.

## 3. Genre and target experience

- Genre: arcade racer, pseudo-3D, single player vs AI. Session: one race is 1.5–3.5 minutes.
- Feel: within 10 seconds a new player understands steer, drift, boost. Within two races they plan reserve around Spine gates.
- Platform: desktop browsers, keyboard first; phone width must lay out correctly and offers optional touch buttons.

## 4. Original story and worldbuilding

The city of **Auralis** floats its power through the **Spine**, a superconducting artery buried under the avenues. Every night, licensed couriers of the **Overdrive League** race the surface loops while the Spine gates monitor each car's reserve cell: only a charged cell is allowed to ride the artery. You are **Juno Vael**, a rookie in the league's worst car, the *Kestrel Mk I*. Three rivals: **Rook** (magenta, aggressive early), **Sable** (violet, steady), **Cinder** (amber, fast late). Tracks are districts: **Halogen Run** (waterfront), **Violet Descent** (hill district), **Redline Meridian** (the old financial canyon). Story is delivered only through track blurbs, rival names and the tutorial text; there are no cutscenes.

## 5. Player character and relevant entities

**Player car (Kestrel Mk I):** wedge body, glass canopy, tail-light bar, underglow. Modelled in 3D from extruded profiles (see section 12); the 2D fallback draws it from the rear onto an offscreen canvas.
- Max speed `MAX_SPEED = 12000` world units/s (displayed as 320 km/h via factor 0.02667). Boost cap 1.30x. Spine cap 1.14x. Reverse cap 0.25x.
- Reserve 0–100, starts at 30.

**Rivals (3):** `{name, color, skill 0.97–1.0, lane, weavePhase, weaveAmp 0.06–0.14, s, x, speed, finishTime}`. They path-follow a lane target with sinusoidal weave, slow in corners proportionally to curvature, avoid the player's car if within 700 units ahead and 0.35 lateral, rubber-band lightly (x0.93 when 6000+ units ahead of the player, x1.04 when 5000+ behind), and never enter the Spine.

**Track objects:** road segments (200 units), rumble strips, lane markers, walls at lateral +/-1.34, off-road shoulder 1.0–1.34, checkpoint arches (4 per lap, one is the start/finish line), Spine entrance gate, Spine exit gate, Spine rails, billboard signs, towers, pylons.

## 6. Core gameplay loop

Menu → Race setup (track + difficulty) → 3-2-1 countdown → 3 laps (steer, drift to charge, boost to pass, decide Spine or outer lanes at each gate) → finish → results (position, laps, total, personal bests) → Race again / Next track / Menu.

## 7. Signature mechanic: Overdrive Spine

1. Each track defines 3 Spine zones `{atFraction, lengthSegments}`. In a zone the road shows a glowing centre channel `|x| <= 0.22` bordered by rails at `|x| = 0.26`.
2. **Entrance gate** (first segment of the zone). When the car's progress crosses it:
   - if `|x| < 0.26` (aiming at the Spine) and `reserve >= SPINE_THRESHOLD (40)` → gate OPEN, `spineMode = true`, chime, reserve unaffected;
   - if `|x| < 0.26` and `reserve < 40` → gate SEALED: crash. Speed multiplied by 0.30, car thrown to `|x| = 0.42`, big shake, thud, message "SPINE SEALED". 0.5 s gate cooldown;
   - if `|x| >= 0.26` → outer lane route, `spineMode = false`.
3. In `spineMode`: speed cap x1.14, track progress advances x1.35 faster than speed (the shortcut), lateral clamp `|x| <= 0.20` (rail bump: speed x0.985, small sparks), passive drain 5 reserve/s, HUD shows "IN SPINE". Leaving the zone or crossing the exit gate ends it.
4. Outside `spineMode` rails keep outer cars at `|x| >= 0.30` while inside the zone.
5. **Visibility:** gate frame and field glow cyan when the reserve is at/above threshold, flicker magenta with hazard stripes when below; the HUD reserve meter shows a tick at 40%; the HUD badge reads `SPINE OPEN`, `SPINE SEALED` or `IN SPINE` plus metres to the next gate.
6. **Tunable:** `SPINE_THRESHOLD`, `SPINE_SPEED_MULT (1.14)`, `SPINE_ADVANCE (1.35)`, `SPINE_DRAIN (5)` are constants in `state/tuning.ts`; difficulty can adjust only the threshold offset (Cruise 35, Velocity 40, Redline 45).

## 8. Controls and input behavior

| Action | Keys |
| --- | --- |
| Accelerate | Up / W |
| Brake / reverse | Down / S |
| Steer | Left / Right or A / D |
| Drift | Shift or Space |
| Boost | B, Enter or Q |
| Restart race | R |
| Pause / resume | P or Escape |
| Mute | M |

- Input module tracks `KeyboardEvent.code` in a Set; blur or visibility change clears it. Steering is smoothed: ramps toward the target at 6 units/s, returns at 9 units/s.
- Menus: Tab and arrow keys move focus; Enter/Space activate; Escape goes back. Focus rings are 3 px cyan outlines.
- Optional touch buttons (shown when `(pointer: coarse)`): left, right, gas, brake, drift, boost, using pointer events, 56 px minimum.
- `preventDefault` for arrows, Space and Enter only while racing.

## 9. Physics and handling systems

All updates use `dt = min(realDt, 0.05)`.

- **Speed:** accelerate `ACCEL = 2180` u/s² x (1 - 0.55 * speed/cap); coast decel 1330; brake 7500; reverse accel 1500 to -3000. Over-cap decel 3000; off-road cap 0.30 x max with extra decel 5500.
- **Boost:** needs reserve > 2 and speed > 1000. Cap x1.30, acceleration x2.0, drain 24 reserve/s.
- **Lateral model (x in road half-widths):** `vxTarget = steer * STEER * sf * sign(speed) - curve * (speed/max)^2 * CENT * driftCentriMul`; `vx += (vxTarget - vx) * min(1, grip * dt)`; `x += vx * dt`. `STEER = 2.1`, `CENT = 0.5`, `sf = clamp(|speed| / 3600, 0, 1)`.
- **Grip:** normal 7.0; drift 2.2; difficulty grip multiplier (Cruise 1.15, Velocity 1.0, Redline 0.88).
- **Drift:** starts when drift key held, `speed > 0.35 * max` and `|steer| > 0.2`; holds while key held and speed > 0.3 * max. Steer gain x1.3, centrifugal x0.6, speed scrub 480 u/s². Visual slip angle = `vx * 0.12 rad`.
- **Reserve:** drift `+22/s * clamp(|vx|/1.2, 0, 1)`; clean driving (>0.5 max speed, no wall hit for 2 s) `+2.4/s`; both multiplied by difficulty regen (Cruise 1.25, Velocity 1.0, Redline 0.8); wall hit `-6`; car bump `-3`.
- **Boundaries:** `|x| > 1.0` off-road; `|x| >= 1.34` wall. Wall impact: speed x0.62, `vx = -vx * 0.35`, x set to 1.31, 0.35 s cooldown, events `wall` (intensity 0–1), sparks, thud, shake. Sliding along a wall (|x| > 1.24): speed -2400 u/s², scrape sound and sparks.
- **Car-car collision:** if `|ds| < 260` and `|dx| < 0.30` → bump: pushes apart by 0.12, faster car loses 8% speed, `bump` event.
- **Camera:** uses a segment-based projection (camera height 1000, FOV 100 degrees, boost adds up to +16 degrees smoothly at 5/s), draw distance 240 segments.

## 10. Progression and difficulty

- **Difficulties:** Cruise (AI speed 0.84 x max, grip 1.15, regen 1.25, threshold 35), Velocity (0.93, 1.0, 1.0, 40), Redline (1.00, 0.88, 0.80, 45).
- **Track escalation:** track AI factor +0.00 / +0.03 / +0.05; curvature, hill height and length rise per track.
- **Progression:** all tracks are selectable from the start (ranked 1–3 by difficulty); the guide recommends order. Records are kept per `trackId:difficulty`.
- **Records:** best total time, best lap, best position, best-lap split times (4) for delta display, number of races.

## 11. Track and encounter design

Segment length 200, road half width 2000, 4 lanes (markers at `x = -0.5, 0, 0.5`). Tracks are built from sections `[enter, hold, leave, curve, hill]` with ease-in/ease-in-out interpolation, ending with a closing section that returns height to 0. A lap ends at `trackLength = segments * 200`.

| Track | Palette | Length | Curves | Hills | AI + |
| --- | --- | --- | --- | --- | --- |
| 1 Halogen Run | cyan / midnight, magenta sun | ~1700 seg | up to 3 | up to 14 | 0 |
| 2 Violet Descent | violet / magenta | ~2000 seg | up to 4.5 | up to 28 | 0.03 |
| 3 Redline Meridian | amber sunset / midnight | ~2300 seg | up to 5.5 | up to 22 | 0.05 |

- 3 Spine zones per track (150–230 segments), placed at fractions 0.17, 0.50, 0.80 (varying per track). Spine zones are on mild geometry so the decision is about reserve, not luck.
- 4 checkpoints per lap at fractions 0.25, 0.5, 0.75 and the finish line. Each shows a split.
- Scenery: deterministic seeded generator places towers, billboards, pylons every 4–9 segments on both sides at `|x| 1.7–6.5`.
- Grid: 2x2 staggered. Rivals Rook and Sable at `s=400`, Cinder at `s=0` left lane, the player at `s=0` right lane. Race ends for the player after crossing `3 * trackLength`.

## 12. Art direction and visual identity

**Renderer.** Real 3D with Three.js 0.170.0 (WebGL 2). The pseudo-3D Canvas 2D renderer stays as the fallback when WebGL cannot start; a notice explains why and what to do (turn on hardware acceleration, update the browser, reload).

**World mapping.** The segment model is unchanged and still drives the simulation. The 3D renderer integrates it into a real centreline: each segment turns the heading by `curve * 0.006 rad`, climbs by its `y1 -> y2`, and banks by `-curve * 0.022 rad`. Longitudinal scale 1 unit = 1/150 m (a segment is 1.33 m, top speed reads as a believable 288 km/h of motion), lateral scale: road half width = 7.5 m. The ribbon is built from segment `-260` to `N + 520` so the wrap from the end of a lap to the start is seamless (the road ahead is the same shape, so the jump is a rigid transform the player never sees).

**Material and light (the realism brief).**
- Night is the light source. Exposure is set by artificial light only: sodium and LED streetlights, neon signage, headlights and window light. A weak cool moon key light casts the car shadows.
- Wet asphalt: `MeshStandardMaterial`, procedural canvas albedo (aggregate noise, tar seams, worn tyre lanes), a roughness map with puddle patches (0.12) against dry asphalt (0.62), a normal map from the same noise, and a PMREM environment map generated from a procedural night-city scene. Emissive sources get a stretched additive reflection streak on the road under them, the way wet roads smear light towards the viewer.
- Car paint: `MeshPhysicalMaterial` with clearcoat 1.0, clearcoat roughness 0.06, metallic flake (metalness 0.55). Glass: dark, roughness 0.04, strong env reflection. Rubber: roughness 0.9. Brushed alloy rims: metalness 1, roughness 0.3.
- Buildings: instanced boxes; facades get floor and window-bay pattern in the shader from local metric coordinates, lit state and colour temperature looked up from a procedural canvas texture (warm 2700 K, cool 5000 K, a few coloured screens). Rooftop plant, water tanks and masts with aircraft-warning lights. Two skyline layers (canvas textures) ride with the camera at 1.6 km and 2.6 km.
- Fog: exponential, per-track colour; sky is a gradient dome with light pollution at the horizon, stars and a moon.
- ACES Filmic tone mapping, sRGB output, UnrealBloom on emissive only (threshold above the lit asphalt), subtle vignette and film grain at 3 % (off with reduced flash).

**Per-track identity** stays in the palette: Halogen Run is cool LED white and cyan harbour light; Violet Descent is mixed sodium and violet neon on the hills; Redline Meridian is amber sodium in a glass canyon with a 260 m tunnel and two overpasses. Every track has at least one overpass.

**Cars.** Built from extruded side profiles, not sprites. Kestrel Mk I (player): low wedge, glass canopy, LED light bars front and rear, cyan underglow. Rook: knife-edge wedge with a tall rear wing (magenta). Sable: long GT with a rounded canopy (violet). Cinder: short and wide with flared arches (amber). Every car: panel seams, four wheels with alloy spokes, brake discs and calipers that spin and (front) steer, emissive headlights, a tail-light bar that brightens on braking. The player car's headlights are real spot lights that light the road.

### Design plan: race-control UI (two passes)

**Concept.** Two real interfaces, not a game overlay. In the race the HUD is a windscreen head-up display: thin line symbology, numerals carry the weight, nothing sits in a box. Out of the race the menus are the league's race-control console: a timing sheet, a track briefing with real elevation data, a classification sheet at the end.

**Colours** (CSS custom properties):

| Name | Hex | Role |
| --- | --- | --- |
| Night ink | `#07090D` | Console background, scrims (at 72–88 %) |
| Graphite | `#1B212B` | Rules, inactive tracks, input wells |
| Glass white | `#E8F0F2` | Primary text and HUD numerals |
| Steel | `#8A94A3` | Secondary text and labels |
| Spine cyan | `#2CF6FF` | The one accent: reserve, Spine, focus, selected state |
| Signal red | `#FF4354` | Sealed gate, loss of time, destructive actions |

Amber `#FFB547` is not a UI colour. It appears only in the world (sodium light) and as the threshold tick on the reserve gauge, where it must read against cyan.

**Type.** Bundled with `@fontsource` (SIL OFL 1.1), latin subset only, no CDN.
- *Barlow Condensed* 600/700 italic: the speed readout, the position number, the title wordmark and screen headings. Motorsport timing graphics use condensed grotesques; italic carries motion.
- *Barlow* 400/500/600: all body copy, labels, buttons and tables. Tabular figures (`font-variant-numeric: tabular-nums`) for every time.
- No monospace anywhere. Labels are sentence case at 13 px in Steel; only the HUD's four-letter driver codes are capitals, as they are on real timing towers.

**Principles.**
1. Boldness is spent in one place per screen: the speed figure in the race, the title wordmark on the main menu, the track name in the briefing, the finishing position on the classification. Everything else is quiet.
2. Information, not decoration. The track briefing shows the real elevation profile and length computed from the track; the timing tower shows real gaps in seconds.
3. Hairline rules and alignment instead of cards. No drop-shadowed rounded boxes, no clipped corners, no glow on text.
4. State is never colour alone: Spine sealed shows hatching and the word "Sealed", Spine open shows a chevron and "Open".
5. Buttons say what they do ("Start race", "Race Halogen Run again"), sentence case, no arrows. Focus is a 3 px Spine-cyan outline, offset 3 px, on every control.
6. Copy is plain and short. No slogans except the tagline on the title.

**HUD wireframe** (1280x720, safe margins 24 px):

```
+--------------------------------------------------------------------------+
| P2 /4                     lap 2 of 3                          1:12.408   |
| --------------                                       Split 2  0:24.110   |
|  1 ROK  leader            [=====o====|==o===]                  -0.31     |
|  2 JUN  +0.42                (lap strip, dots)                           |
|  3 SAB  +1.20                                                            |
|  4 CIN  +3.02                                                            |
|                                                                          |
|                         Spine open  >  240 m                             |
|                                                                          |
|                                                                          |
|                               287                                       |
|                              km/h                                       |
|                   0 ======================|---- 100   Reserve 62 %      |
|                         threshold tick ^     Boost                       |
+--------------------------------------------------------------------------+
```

**Main menu wireframe** (live 3D attract scene behind, car framed right of centre):

```
+--------------------------------------------------------------------------+
|                                                                          |
|  Neon                                                                    |
|  Overdrive                                    (car under streetlights)   |
|  Burn the reserve. Cut the Spine.                                        |
|                                                                          |
|  | Start a race                                                          |
|    How to drive                                                          |
|    Personal bests                                                        |
|    Settings                                                              |
|                                                                          |
|  W A S D or arrows to drive, Shift to drift, B to boost.                 |
+--------------------------------------------------------------------------+
```

**Track briefing (race setup):** left, the three tracks as rows of a list (number, name, length, a 120 px elevation sparkline); right, the selected track: name in Barlow Condensed, one-sentence blurb, a large elevation profile with the three Spine zones shaded, facts as a definition list (length, climb, Spine gates, sharpest bend), difficulty as a three-way segmented control with one explanatory sentence, the personal best line, and "Start race".

### Review of the plan (pass b) and what changed

Checked against the brief and the list of generated-UI tells:
- Draft 1 used translucent blurred panels with clipped corners for every HUD element. That is the generic "sci-fi overlay" look. Revised: no HUD panels at all; a light gradient scrim at the top and bottom edges carries legibility.
- Draft 1 put an uppercase tracked label above every heading ("OVERDRIVE LEAGUE", "SELECT TRACK"). Removed; headings stand alone.
- Draft 1 used three identical track cards with a coloured top bar. Replaced by a list plus a detail pane with real elevation data, which is what a briefing screen would show.
- Draft 1 used a monospace font for times. Replaced by Barlow with tabular figures.
- Draft 1 used cyan, magenta and violet as UI accents. Cut to one accent (Spine cyan) plus red for loss; the other neon colours stay in the world where they are light sources.
- Draft 1's results screen was a centred card with a gradient "1ST PLACE". Replaced by a classification sheet: the position is the one bold element, then a table with gap and best lap, then lap bars.

## 13. Animation and VFX

- Chase camera: critically damped spring (position stiffness 9, look-ahead 9 m), FOV 64 degrees rising to 76 with boost (eased at 5/s), small speed-based FOV gain. Camera shake on impacts is a decaying noise offset (0.25 m and 1.4 degrees at full intensity), scaled to 40 % with reduced motion and removed with screen shake off.
- Speed streaks: 70 world-space light streaks around the camera, length and opacity rise above 45 % speed and double on boost; 40 % with reduced motion; off with the speed lines setting.
- Wheel spray: mist particles behind the rear wheels on wet asphalt, density by speed; tyre smoke when drifting.
- Sparks: additive particles with gravity on wall hits, scrapes, rail touches and bumps; 30 on a sealed gate.
- Boost: exhaust glow cones with a point light, cyan heat at the nozzles, FOV kick.
- Spine gates: open gate frame glows cyan with chevrons in the field; sealed gate frame is red with hatched field, flickering at 8 Hz (steady with reduced flash).
- Car: wheels spin from distance travelled, fronts steer up to 22 degrees, body rolls with lateral load and the road's bank, pitches on braking and boost, slip angle when drifting.
- Collision flash: 18 % white for 90 ms, disabled with reduced flash.
- Countdown numerals scale in; messages fade in and out on the HUD centre line.
- Particle pools: sparks 220, spray and smoke 260; all preallocated.

## 14. Sound design and music

Web Audio only, created on first user gesture, master gain, soft compressor.
- **Engine:** sawtooth at `55 + speedPct * 210` Hz + square at 1.5x, lowpass `500 + speedPct * 2200`, gain follows throttle (0.04–0.12). Pitch bends +20% on boost.
- **Boost whoosh:** filtered noise burst, bandpass sweep 400 to 3200 Hz over 0.6 s.
- **Collision thud:** sine 140 to 40 Hz over 0.25 s plus noise burst, intensity scaled. **Scrape:** short highpassed noise.
- **Checkpoint chime:** two sines (880, 1320 Hz), 0.25 s. **Gate open:** rising triad; **gate sealed:** dissonant low buzz.
- **UI blips:** 660 Hz square 60 ms (move), 990 Hz (confirm), 330 Hz (back).
- **Countdown beeps:** 3 x 440 Hz, GO at 880 Hz.
- **Music:** procedural synthwave loop, 118 BPM, sixteenth-note scheduler with 120 ms look-ahead, bass (saw, lowpass) + arpeggio (triangle) + soft kick; root note per track (A, D, F#). Music toggle in settings, ducked during pause.
- Master volume 0–1 (default 0.7), mute (M), both persisted. Context suspends when the tab is hidden.

## 15. Menus and in-game UI

Screens (see the design plan in section 12): **Title** (Start a race, How to drive, Personal bests, Settings), **Track briefing** (track list with elevation sparklines, detail pane with elevation profile and facts, difficulty, personal best, Start race), **How to drive** (also the first-launch overlay), **Settings** (sound, comfort, graphics), **Personal bests**, **Pause** (Resume, Restart race, How to drive, Settings, Quit to menu), **Classification** (finishing position, table with total, gap and best lap per driver, lap bars, new personal bests, Race again, Next track, Back to menu).

**HUD** (windscreen symbology, no panels): top-left position and a four-row timing tower with live gaps in seconds; top-centre lap counter and a hairline lap strip with car dots, Spine zones and checkpoints; top-right race time, last split and delta (red for slower, cyan for faster, with a sign); bottom-centre the speed figure in km/h over the reserve gauge with the threshold tick and a "Boost" marker; centre line messages (checkpoints, laps, Spine state) and the Spine state line with distance to the next gate. A one-line hint about the Spine appears after the start.

## 16. Accessibility and settings

- Settings: master volume slider, mute, music on/off, screen shake on/off, reduced flash, high contrast, speed lines on/off, show touch controls (auto), **graphics quality** Auto / Low / Medium / High.
- Graphics quality (persisted as `quality`): Low = pixel ratio cap 1, no bloom, no shadows, 45 % building density, 4 dynamic lights; Medium = cap 1.25, bloom, 1024 px shadows, 75 % density, 6 lights, MSAA 4x; High = cap 2, bloom, 2048 px soft shadows, full density, 10 lights, MSAA 4x. Auto picks from the GPU (software renderers -> Low, integrated -> Medium, discrete/Apple silicon -> High) and steps down one level if the frame time stays above 24 ms. Target: 60 fps at Medium on a mid-range laptop.
- `prefers-reduced-motion` sets default shake off, speed lines at 40% and no flicker. `prefers-contrast: more` defaults to high contrast.
- High contrast: solid lane/edge colours, no sun stripes glow, brighter HUD plates, thicker outlines.
- Reduced flash: no collision flash, no sealed-gate flicker, no lightning.
- All buttons keyboard operable with visible focus; HUD is `aria-hidden` except a polite live region announcing position changes, checkpoints, gates and finish; canvas has an `aria-label`.
- Never rely on colour alone: Spine state is also text and shape (hazard stripes).

## 17. Technical architecture

Vite 5.4.11 + TypeScript 5.6.3. Runtime dependencies: `three@0.170.0` (renderer, `three/examples/jsm` post-processing), `@fontsource/barlow` and `@fontsource/barlow-condensed` 5.1.0 (bundled fonts). Dev: `@types/three@0.170.0`.

```
source/neon-overdrive/
  index.html, package.json, tsconfig.json, vite.config.ts
  src/main.ts
  src/styles.css
  src/state/tuning.ts      constants, difficulties
  src/state/types.ts       shared types
  src/track/tracks.ts      3 track definitions + palettes
  src/track/build.ts       segment builder, scenery, lookups
  src/game/physics.ts      pure player stepping
  src/game/ai.ts           pure rival stepping
  src/game/race.ts         Race sim (events, positions, laps, results)
  src/game/input.ts        keyboard, touch
  src/game/Game.ts         loop, state machine, glue
  src/render/backend.ts    Frame + RenderBackend interface shared by both renderers
  src/render/renderer.ts   Canvas 2D pseudo-3D fallback renderer
  src/render3d/path.ts     segment list -> real 3D centreline (pure), track facts
  src/render3d/world.ts    road ribbon, kerbs, barriers, rails, gates, gantries, lights, signs, overpasses, tunnel, instanced city, skyline
  src/render3d/car3d.ts    extruded car models, wheels, lights
  src/render3d/fx3d.ts     pooled sparks, spray/smoke, speed streaks
  src/render3d/textures3d.ts procedural canvas textures (asphalt, concrete, windows, signs, skyline)
  src/render3d/Renderer3D.ts WebGL renderer, PMREM env, sky, lights pool, chase camera, bloom, quality, context loss
  src/game/autopilot.ts    demo-mode driver
  src/render/textures.ts   offscreen procedural art
  src/render/fx.ts         particles
  src/audio/audio.ts       synthesis
  src/storage/storage.ts   versioned persistence
  src/ui/ui.ts             DOM screens and HUD
  src/test/sim.test.ts     headless sim test
```

**State machine:** `boot -> menu -> setup -> countdown -> racing <-> paused -> finishing -> results -> (menu | setup | countdown)`. `Game` owns transitions; `Race` has phases `countdown`, `racing`, `finished`.

**Data schemas:**
```ts
Settings { volume:number; muted:boolean; music:boolean; shake:boolean; reducedFlash:boolean; highContrast:boolean; speedLines:boolean; tutorialSeen:boolean; lastTrack:number; lastDiff:number; quality:'auto'|'low'|'medium'|'high' }
Record   { bestTotal:number|null; bestLap:number|null; bestPos:number|null; bestSplits:number[]; races:number }
SaveFile { v:1; settings:Settings; records:Record<string, Record> }  // key "trackIdx:diffIdx"
Segment  { i:number; curve:number; y1:number; y2:number; spine:boolean; gate:0|1|2; cp:number; sprites:Sprite[]; band:number }
Car      { s:number; x:number; vx:number; speed:number; reserve:number; boosting:boolean; drifting:boolean; spineMode:boolean }
RaceEvent{ type:'checkpoint'|'lap'|'finish'|'wall'|'scrape'|'rail'|'bump'|'gateOpen'|'gateSealed'|'boostStart'|'countdown'|'go'|'position'; value?:number }
```

Race logic modules (`physics`, `ai`, `race`, `track/build`) must not touch DOM or Web Audio so `sim.test.ts` can run them in Node. The 3D move did not change any gameplay rule: solid scenery is placed one car half-width outside the simulation limits (barriers at x = 1.47, kerb at 1.0) and Spine rails are flush light strips with a light-curtain gate, because the simulation treats cars as points.

**Debug/screenshot URL flags:** `?demo=1&track=0..2&at=<seconds>` drops into a race driven by the autopilot after simulating `at` seconds (results are not saved); `?quality=low|medium|high` overrides quality for the session; `?screen=setup|settings|records|guide|title` opens a screen; `?orbit=<rad>` sets the menu camera angle; `?renderer=2d` forces the fallback.

## 18. Performance requirements

- 60 fps on mid-range laptops at Medium quality (see section 16 for the quality levels and auto step-down). Fixed light counts per level so shaders compile once; the city, posts, lamps and signs are instanced; road is chunked for frustum culling.
- 2D fallback keeps its adaptive resolution scale (1.0, 0.85, 0.7, 0.55).
- No per-frame allocation in hot loops where avoidable; pre-render sprites; no `shadowBlur` in per-frame drawing; particle pool; DOM HUD writes only on change.
- Pause rendering and audio when the tab is hidden.
- JavaScript under 250 KB gzipped (Three.js included). Fonts are the only static assets.

## 19. Asset creation and licensing

Everything visual is generated at runtime: car models, road and concrete textures, buildings and their windows, billboards, skyline, environment map, particles; audio is synthesised. Third-party code: Three.js (MIT). Fonts: Barlow and Barlow Condensed (SIL Open Font License 1.1) bundled via @fontsource. No image or audio files. Billboard words are invented (VOLT, HALO, NOVA, KAI, SPINE, DRIVE, AXIS, ZEN, LUMA, PRISM). A procedural `poster.png` may be captured from real gameplay and stored beside the source.

## 20. Save and persistence behavior

- Key `neon-overdrive:v1`. Read once at boot, parsed in try/catch, validated field by field with defaults; corrupted JSON or wrong version resets that portion only. Writes are debounced 150 ms and wrapped in try/catch; failure (private mode, quota) is silent and the game continues in memory.
- Personal bests updated on finish; `bestSplits` replaced when a new best lap is set. A "Reset records" button in Records asks for confirmation (in-page dialog, not `alert`).

## 21. Error handling and browser compatibility

- Feature checks for WebGL 2, canvas 2D, `AudioContext`/`webkitAudioContext`; missing audio disables sound silently.
- No WebGL 2, or the 3D renderer throws: the 2D renderer runs on a fresh canvas and a notice explains what happened and what to do (turn on hardware acceleration, update the browser, reload). WebGL context loss pauses the race with a notice; on restore the track scene and environment are rebuilt.
- A fatal panel with plain text replaces the game if neither renderer can start. No `alert`.
- Targets: current Chrome, Edge, Firefox, Safari. ES2020 output. No network calls at runtime; works from `file`-like static hosting under any subpath (relative base).
- Handle `visibilitychange`, `blur` (auto pause while racing), resize and DPR changes.

## 22. Testing strategy

- `npm run typecheck` and `npm run build` must pass with zero errors.
- `npm run test` bundles `src/test/sim.test.ts` with esbuild (shipped inside Vite) and runs it in Node. It asserts: all tracks build and have 3 Spine zones and 4 checkpoints per lap; a scripted autopilot completes 3 laps on every track; a car that crosses a Spine gate with reserve 10 is crashed and one with reserve 80 enters Spine mode; boost drains reserve; wall impacts reduce speed; no NaN in any car state; positions are consistent; personal best parsing falls back on corrupted JSON.
- Manual browser checklist: menu renders, start race, accelerate, steer, drift fills reserve, boost works, wall hit sparks, checkpoint and lap progress, pause/resume, restart with R, results screen, records persist after reload, mute persists, no console errors, keyboard-only navigation, 375 px width layout.

## 23. Gaming hub integration

- `playUrl`: `./games/neon-overdrive/` (relative, so it works from the Pages subpath).
- Hub card facts: title NEON OVERDRIVE; tagline "Burn the reserve. Cut the Spine."; accent cyan; genres racing, arcade, 3D; controls W/Up accelerate, S/Down brake, A/D steer, Shift drift, B boost, R restart, P pause, M mute; tech: Three.js (WebGL 2) with Canvas 2D fallback, TypeScript, Web Audio.
- Poster at `source/neon-overdrive/poster.png` if captured.
- All asset URLs inside the game are relative.

## 24. GitHub Pages deployment requirements

- Source in `source/neon-overdrive/`, build output committed to `games/neon-overdrive/` (done by the lead, not by this build task).
- Vite config: `base: './'`, `build.outDir: '../../games/neon-overdrive'`, `emptyOutDir: true`, `target: 'es2020'`, `assetsInlineLimit: 0`, dev port 5231 with `strictPort`.
- Pages serves from the repository root, so the game is at `/games/neon-overdrive/`. `index.html` includes a redirect script sending visitors from `/source/neon-overdrive/` on github.io to the built game.
- Install dependencies only inside `source/neon-overdrive/`; never at the repository root.

## 25. Definition of done

- [ ] Typecheck and build succeed; `games/neon-overdrive/index.html` exists
- [ ] Menu, setup, guide, settings, records, pause and results screens work with keyboard
- [ ] Car accelerates, brakes, reverses, steers, drifts with slide
- [ ] Reserve fills by drifting and clean driving, drains on boost; FOV and speed lines react
- [ ] Walls, off-road slowdown, sparks, thud, shake
- [ ] Spine gates open/seal by reserve threshold, visible in world and HUD, shortcut speed benefit works
- [ ] 3 laps, 4 checkpoints per lap, split and lap times, finish detection
- [ ] 3 AI rivals, real placement, three difficulties, three distinct tracks
- [ ] Results with per-track-per-difficulty personal bests persisted
- [ ] R restarts, Esc/P pauses, M mutes; settings persisted
- [ ] Procedural engine, boost, thud, chime, UI blips, music
- [ ] Tutorial on first launch and from menu
- [ ] Reduced-motion/flash and high contrast honoured; phone width has no horizontal scroll
- [ ] No console errors, no alert, no placeholder text, no network requests
- [ ] Headless sim test passes

## 26. Final reporting requirements

End with: status (COMPLETE/PARTIAL/BLOCKED) and missing features; exact commands run and results; browser verification actually performed and console errors; poster status; list of files created; hub entry facts (playUrl, title, tagline, 2-sentence description, genres, controls, tech, accent). State plainly what was verified versus not verified; never invent results.
