# PARADOX ROOM — implementation prompt

You are building **PARADOX ROOM**, a browser puzzle adventure about impossible rooms, for the NEON ARCADE repository. This document is a complete, standalone brief: follow it without needing any other context. Where it gives a number, use that number. Where it gives a rule, implement that rule exactly; the rules are deterministic and the whole game depends on them being exact.

---

## 1. Game identity and creative vision

- **Title:** PARADOX ROOM. **Tagline:** "The floor is a matter of opinion."
- **One sentence:** walk through a house of small rooms that can be folded a quarter-turn at a time, so that walls become floors, floors become walls, and a door you could not reach becomes the ground under your feet.
- **Tone:** quiet, geometric, uncanny, patient. No combat, no timers, no fail states. The only opponent is your own assumption about which way is down.
- **Look:** restrained neon on deep near-black. Voxel rooms drawn in an oblique projection on Canvas 2D. One accent colour per concept (cyan = you and walkable, amber = crystals and goals, violet = portals, pink = folds and levers). Almost no decoration; light does the work.
- **Feel:** the pleasure of a correct insight. When a fold turns a wall into the one floor you needed, the room should answer with a low tone and a soft pulse, not fireworks.
- **Hub identity:** accent `purple`; playUrl `./games/paradox-room/`.

## 2. Original gameplay concept

Each **room** is a small 3D grid of cells (at most 8 x 8 x 4). Each cell is either solid or empty. The player is a small figure standing in an empty cell whose "down" neighbour is solid. The player walks along surfaces in four directions. A **fold** turns the whole room a quarter-turn about the screen's horizontal or depth axis. After a fold the room is redrawn so that its new "down" points to the bottom of the screen: cells that were wall are now floor, and the player is re-resolved onto the new ground by a fixed rule (slide along the new down until something solid is met). Rooms are connected by **portals**; objects (crystals, switches, plates, doors, levers) add state. Solving a level means collecting every crystal and then stepping onto the exit.

This is original: no existing property is cloned. The rule set is small on purpose, so every puzzle can be proven solvable by search.

## 3. Genre and target experience

- Genre: spatial puzzle adventure with impossible geometry; turn-based, grid-based, no reflex component.
- Session: 1 to 4 minutes per level, 9 levels, about 25 to 40 minutes for a first full run; secrets add 10 minutes.
- Target feeling: "oh — the wall is the floor". Difficulty comes from spatial reasoning and ordering, never from execution.
- Platforms: desktop keyboard (primary), mouse for on-screen buttons and interaction, touch via the same on-screen buttons plus a four-way pad on narrow screens.

## 4. Original story and worldbuilding

You are the **Surveyor**, a small light that wakes in the Paradox House. The House was drawn by the cartographer Ilse Varga, who tried to map a room she could not finish: every time she measured it, it agreed with her measurement and then disagreed. She folded the plans until the plans became rooms.

- **Crystals** are *axioms*: facts about the House that are true in every orientation. Collecting them is how you earn the right to leave.
- **The exit** is a *corollary gate*: it opens only when all axioms in the house are held.
- **Shards** (secrets) are *margin notes* Ilse left in hidden rooms. Collecting all three is an optional epilogue line.
- **Chapters:** 1 THE FOLDED HALL (gravity turns in the plane), 2 THE STAIRWELL THAT ISN'T (depth turns too, levers take over), 3 THE MIRROR HOUSE (portals and rooms that remember their own orientation).
- **Ending:** after the final gate, the House folds flat into the plan it came from, and you read Ilse's last margin note: the room she could not finish was never a place; it was a question, "which way is down for you?". If all three shards were found, the note continues with one more line (see section 15). The credits card reads "Fold it again whenever you like."

Short story beats (one line shown at the start of each chapter and each level intro) are authored in the level data (`intro`).

## 5. Player character and relevant entities

**Player (the Surveyor).** A small glowing capsule, 0.45 cell wide, 0.7 cell tall, standing on the floor plane of its cell. It always occupies exactly one cell. It never changes size. It has a facing marker (a small notch) showing the last move direction.

**Room.** Name, size `w x h x d` (x right, y down, z deep), a solid-cell bitmap, a list of free fold kinds the player may use anywhere in that room, and a persisted orientation (one of 24 rotations). Each room remembers its orientation while the player is elsewhere.

**Objects** (all live on an empty cell of a room):
| Object | Glyph | Rule |
|---|---|---|
| Crystal | amber diamond | Collected on arrival at its cell. Needed for the exit. |
| Shard | small pale-white triangle | Optional secret, collected on arrival, saved. |
| Exit gate | amber double ring | Completes the level on arrival if every crystal is held; otherwise stays sealed (shows "N axioms remain"). |
| Portal | violet ellipse ring, paired by colour and letter | Walking onto it moves you to its partner in the other room. |
| Fold lever | pink bar on a base | Interact: folds that room by the lever's fixed fold kind. |
| Switch | blue-white toggle plate | Interact: toggles its linked doors. Reversible. |
| Pressure plate | square pad | Latches pressed when arrived on. Opens its linked doors permanently (until reset). |
| Door | solid block with a bright seam | Closed = solid cell. Open = empty cell. |

**Hazards.** There are none that hurt. "Hazard" in this game is **void**: a missing floor. Walking toward a missing floor is refused (blocked marker). A fold that would drop you out of the room is refused ("The fold finds no floor"). Nothing ever kills the player, so soft-locks are the only failure, and section 10 handles them.

## 6. Core gameplay loop

1. Read the objective (top-left): for example "Collect 2 axioms, then reach the gate" with live progress (0/2).
2. Look at the room; the walkable-next-step markers around the player show where you can and cannot step.
3. Move, interact, or fold. Every successful action is one **turn** and is pushed on the undo stack.
4. Collecting a crystal or toggling something shows a visible change (pulse, tint, door opens) plus a tone plus a progress line.
5. When the last crystal is held, the gate brightens and the objective changes to "Reach the gate".
6. Arriving on the open gate completes the level: a ring pulse, a chord, a summary (turns, folds, hint count), and the next level unlocks.
7. At any time: Undo (Z), Restart (Backspace / R), Hint (H), Menu (Esc / P).

## 7. Signature mechanic: Gravity Fold (exact rules)

**Coordinates.** Room cell `(x, y, z)`; `x` grows right, `y` grows down, `z` grows away from the viewer. Bounds are `0..w-1`, `0..h-1`, `0..d-1`. Any coordinate outside bounds is void: not solid, not standable.

**Orientation.** Each room has an orientation `R`, one of the 24 axis-aligned rotation matrices (integer entries). `R` maps room space to view space: `v = R * c`. View space has `+x` right, `+y` down (screen), `+z` away. Identity is orientation 0. Define these room-space direction vectors from `R` (use `R^T`, the transpose, which is the inverse):
- `down  = R^T * (0, 1, 0)` — the room's current gravity direction.
- `right = R^T * (1, 0, 0)`, `left = -right`.
- `away  = R^T * (0, 0, 1)`, `toward = -away`.

**Standing.** A cell `p` is **standable** when it is in bounds, not solid, and `p + down` is solid. (A closed door is solid; an open door is empty.)

**Move.** The four moves are `right`, `left`, `away`, `toward` (arrows/WASD; Up = away, Down = toward). For move direction `d`, let `n = p + d`:
1. If `n` is out of bounds: blocked ("edge").
2. If `n` is solid: blocked ("wall").
3. If `n + down` is not solid: blocked ("void").
4. Otherwise the player moves to `n` (a turn is consumed) and the arrival rules run.
There is no climbing, jumping, or edge-wrapping. Corners are crossed only by folding.

**Fold.** There are four fold kinds, each a 90-degree rotation applied in view space: `R' = M * R`:
- `rollR`: `M(x,y,z) = (-y, x, z)` — the wall on the view-right becomes the floor.
- `rollL`: inverse of `rollR` — the view-left wall becomes the floor.
- `pitchB`: `M(x,y,z) = (x, z, -y)` — the far wall becomes the floor.
- `pitchA`: inverse of `pitchB` — the near wall becomes the floor.
Folding keeps the player's room-cell. Then **settle** with the new `down`: if `p + down` is solid, stay. Otherwise slide: while `p + down` is in bounds and not solid, set `p = p + down`; if the next cell is out of bounds, the **fold is refused** with no change; when `p + down` is solid, stop. A fold that changes nothing is still a legal turn if it changes orientation.
Free folds are available only if the room's `free` list contains that kind (keys Q / F / X / V). **Fold levers** perform their own fixed kind regardless of the free list.

**Arrival rules** (run after every move, fold or interaction, repeated until nothing changes, maximum 8 passes):
1. Settle (see above) because an opened door may have removed the floor; a refusal here cancels the whole action.
2. Crystal / shard at `p`: collect.
3. Plate at `p`: latch pressed.
4. Portal at `p`, only if the arrival was caused by a **walk**: teleport (below).
5. Exit at `p` with all crystals held: complete the level.

**Portal teleport.** The partner portal is in the other room. The player takes its cell in that room; that room's own stored orientation applies. The arrival cell is settled with that room's `down`; if settling fails (falls out of bounds), the move is refused with the message "The far side has no floor. Fold that room first." Teleporting never re-triggers the destination portal; you must step off and back on to return.

**Doors.** Each door is linked to one controller (switch or plate). Door open = controller active. A switch toggle that would close a door on the player's own cell is refused ("Something is standing in the doorway"). Toggling or latching that removes the floor under the player settles them downward, or is refused if they would leave the room.

**Interaction.** An object is in reach when its cell equals the player's cell or is face-adjacent to it. The prompt always shows the single nearest reachable interactable (same cell first, then lowest object index). Mouse hover can choose another reachable interactable. Space or E performs it.

**Why this is fair.** The state of the world is `(room, cell, orientation per room, collected set, controller states)`. No hidden state, no randomness, no time. A breadth-first search over that state space decides solvability exactly (section 22).

## 8. Controls and input behavior

| Input | Action |
|---|---|
| Arrow keys / WASD | Move (Up/W = away, Down/S = toward) |
| Space / E | Interact with the highlighted object |
| Q / F | Free fold: roll left / roll right |
| X / V | Free fold: pitch near / pitch far (only where allowed) |
| Z | Undo last turn |
| Backspace / R | Restart level (always works) |
| H | Hint |
| Esc / P | Pause menu |
| M | Mute toggle |
| Mouse / touch | On-screen buttons for every action; four-way pad on narrow screens; click a hovered interactable to use it |

Rules: keys are ignored while typing in no field (there are none) and while a modal is open except Esc; key repeat is allowed but a turn is gated to at most one per 110 ms; movement input uses `event.code`, never `event.key`; `preventDefault` on game keys so the page never scrolls; focus rings are always visible (`:focus-visible`).

## 9. Spatial / interaction systems

- **Geometry.** Rooms are voxel grids, `Uint8Array` of size `w*h*d`, index `x + w*(y + h*z)`.
- **Projection.** For view vector `v`, screen position = `( (vx + 0.45*vz) * S, (vy - 0.40*vz) * S )`, with `S` the cell size in pixels, derived from the canvas so the room fits (clamped 26..84). Depth therefore goes up and to the right.
- **Paint order.** Painter's algorithm: sort by `vz` descending, then `vy` descending, then `vx` ascending; the player and objects sort with the cell they stand in (the player gets a +0.05 tie-break). Each solid cell paints only the faces that border an empty, in-bounds cell (faces on the outside of the room are never drawn, which cuts the room away like a dolls house). A face whose rotated normal points toward the viewer (test: `n . (-0.45, 0.4, 1) < 0`) is filled with a lit shade and a thin edge stroke; a face pointing away is drawn as a faint ghost (fill alpha 0.1, edge alpha 0.17) so the hidden walls are still visible. The face a player could stand on (normal opposite the room's down) gets a cyan tint.
- **Walkability feedback.** For each of the four move directions the renderer draws a marker on the target floor: a pulsing cyan diamond if the move would succeed, a short amber cross if refused (wall, void or edge). Markers use the exact same function as the movement rule (`probeMove`), so they cannot disagree with the game.
- **Collision.** Only the rules in section 7 exist; there is no physics.
- **Camera.** Follows the player: the focus point is `0.6 * playerScreenPos + 0.4 * roomCenterScreenPos`, smoothed with `1 - exp(-dt * 9)`. Folds animate over 0.38 s (ease in-out) unless camera effects are off, in which case they are instant.
- **Navigation.** The reachable-state graph is the navigation graph; the hint system uses it directly.

## 10. Progression and difficulty

- 3 chapters, 3 levels each (9 levels), unlocking linearly. Completing a level unlocks the next level; completing a chapter's third level unlocks the next chapter's first level.
- Complexity ramp: Chapter 1 teaches rolling in a flat room (depth 1) with one crystal at most and no doors. Chapter 2 adds depth, pitching, levers and switches/doors. Chapter 3 adds portals and per-room orientation memory, combined with everything else.
- Par: each level stores a `par` turn count equal to the length of the shortest solution found by the solver. The summary shows turns versus par; nothing is gated on it.
- **Hints.** Up to 3 per level, 6 second cooldown between hints. Hint 1: the authored conceptual hint (what to look at). A level's hint allowance is kept in memory per level and is refreshed when the level is started again from the chapter list or the complete dialog (Restart does not refresh it). Hint 2: the solver's next step described by kind ("Fold the room clockwise next"). Hint 3: the exact next key, drawn as an arrow beside the player and named in the text. If the current state cannot reach the exit, every hint says "This arrangement can no longer be solved. Undo or restart." and does not spend a charge.
- **Soft-lock recovery.** Restart is always available and free; undo has unlimited depth (stack of snapshots). The game also detects an unsolvable state after each turn (solver with a 150 000-state cap) and, if unsolvable, shows a calm banner "No way forward from here. Undo (Z) or restart (R)." Because doors only close via reversible switches and plates only open, truly unsolvable states are rare, and the banner makes them explicit.
- **Secrets.** One hidden room per chapter, containing a shard, reachable through a faint "secret portal" pair authored in level 2 of each chapter (levels 1-2, 2-2, 3-2). They are optional and never required.

## 11. Level / chapter design

Legend for level ASCII (one slice per z, rows are y from top, columns are x): `#` solid, `.` empty, `@` start, `E` exit gate, `*` crystal, `$` shard, `a`..`h` portal letters (each letter appears exactly twice), `1` rollL lever, `2` rollR lever, `3` pitchA lever, `4` pitchB lever, `S` `T` switches, `P` `Q` `R` plates, `D` `F` `G` doors. A level's `links` map says which controller opens which door. The **authoritative** level data and the solver output live in `src/levels/levels.ts` and `scripts/check-levels.ts`; the sketches below describe intent and the shortest solution found by the solver (the solver length is the par).

### How the levels were made and verified
Levels 1-1 and 1-2 are hand-authored. The other seven were found by a random search (rooms with a solid shell, random inner blocks, random start, crystal, exit, portal, switch, door and lever placement) that kept only candidates which the breadth-first solver proves solvable, which cannot be solved without a fold, and whose shortest solution has at least 3 folds. Their layouts are irregular caverns; this is intended and reads as the House refusing to be tidy. Every level below is the shipped data. Replacing a level requires re-running `npm run check:levels`.

Intent per chapter: chapter 1 teaches rolling and falling to the new floor, using a pillar, a plate-opened door and a pocket reached by falling. Chapter 2 adds the near and far walls (pitch), a lever-only room (free folds locked) and a switch that opens a door which must be folded around. Chapter 3 adds portals: a ring has no floor until its room is folded, rooms remember their orientation, a hidden margin room hangs off a faint ring, and the last level combines a plate, a door, two rooms, depth folds and two axioms.

### Level data and solver output

#### 1-1 First Fold
- Objective: Reach the gate. A pillar stands in the way.
- Rooms: The Hall (8x6x1, free folds: rollL/rollR)
- Axioms: 0; hidden shard: no; shortest solution: 4 turns
- Solution keys (R/L = right/left, A/T = away/toward, Q/F/X/V = folds, E = interact): `Q Q Q Q`
- Layers of "The Hall" (z = 0 is nearest the viewer; one row per y):
  - z0: `######## / #......# / #.##...# / #.#....# / #@#...E# / ########`

#### 1-2 Two Axioms
- Objective: Collect both axioms, then reach the gate.
- Rooms: The Divided Hall (9x6x1, free folds: rollL/rollR); A Margin (4x3x1, free folds: none, levers only)
- Axioms: 2; hidden shard: yes; shortest solution: 9 turns
- Solution keys (R/L = right/left, A/T = away/toward, Q/F/X/V = folds, E = interact): `R Q Q Q Q R R R R`
- With the shard: 14 turns: `R Q Q Q Q F R R R R L Q L R`
- Layers of "The Divided Hall" (z = 0 is nearest the viewer; one row per y):
  - z0: `######### / #*..#..h# / #...#...# / #...#...# / #@P.D.*E# / #########`
- Layers of "A Margin" (z = 0 is nearest the viewer; one row per y):
  - z0: `#### / #h$# / ####`

#### 1-3 Quiet Corners
- Objective: Collect the axiom, then reach the gate.
- Rooms: The Quiet Hall (8x6x3, free folds: rollL/rollR)
- Axioms: 1; hidden shard: no; shortest solution: 15 turns
- Solution keys (R/L = right/left, A/T = away/toward, Q/F/X/V = folds, E = interact): `Q Q Q Q F F R R Q Q Q Q F Q L`
- Layers of "The Quiet Hall" (z = 0 is nearest the viewer; one row per y):
  - z1: `######## / #.E#*..# / #......# / #@#....# / ##.#..## / ########`

#### 2-1 The Box
- Objective: Collect the axiom, then reach the gate.
- Rooms: The Box (5x5x4, free folds: rollL/rollR/pitchA/pitchB)
- Axioms: 1; hidden shard: no; shortest solution: 11 turns
- Solution keys (R/L = right/left, A/T = away/toward, Q/F/X/V = folds, E = interact): `L V V L V A T F R V L`
- Layers of "The Box" (z = 0 is nearest the viewer; one row per y):
  - z1: `##### / #..## / #*### / ##E@# / #####`
  - z2: `##### / #..## / ##..# / #...# / #####`

#### 2-2 The Lever Room
- Objective: Collect both axioms, then reach the gate. Free folds are locked; use the pink levers.
- Rooms: The Lever Room (6x5x4, free folds: none, levers only); A Margin (4x3x1, free folds: none, levers only)
- Axioms: 2; hidden shard: yes; shortest solution: 24 turns
- Solution keys (R/L = right/left, A/T = away/toward, Q/F/X/V = folds, E = interact): `L L E R R R A A E E E E T L T T R E E E E L E R`
- With the shard: 29 turns: `L L E R R R A A E E L E R T R R E E E T R L A A E L L L A`
- Layers of "The Lever Room" (z = 0 is nearest the viewer; one row per y):
  - z1: `###### / ##23.# / #*##.# / #4#*E# / ######`
  - z2: `###### / #h#1.# / #.##.# / #..@.# / ######`
- Layers of "A Margin" (z = 0 is nearest the viewer; one row per y):
  - z0: `#### / #h$# / ####`

#### 2-3 Seam
- Objective: Collect the axiom, then reach the gate. A door blocks the way.
- Rooms: The Seam (6x5x4, free folds: rollL/rollR/pitchA/pitchB)
- Axioms: 1; hidden shard: no; shortest solution: 14 turns
- Solution keys (R/L = right/left, A/T = away/toward, Q/F/X/V = folds, E = interact): `L X X F X A R R Q T L X R X`
- Layers of "The Seam" (z = 0 is nearest the viewer; one row per y):
  - z1: `###### / #...## / #..#.# / #.#D.# / ######`
  - z2: `###### / #.#..# / #.S#.# / #E@#*# / ######`

#### 3-1 Two Rooms
- Objective: Collect the axiom, then reach the gate.
- Rooms: Near Room (7x6x3, free folds: rollL/rollR); Far Room (7x6x3, free folds: rollL/rollR)
- Axioms: 1; hidden shard: no; shortest solution: 17 turns
- Solution keys (R/L = right/left, A/T = away/toward, Q/F/X/V = folds, E = interact): `Q Q L L L Q Q F F Q Q R Q Q F Q R`
- Layers of "Near Room" (z = 0 is nearest the viewer; one row per y):
  - z1: `####### / #...a.# / #.#...# / #.....# / #@#..## / #######`
- Layers of "Far Room" (z = 0 is nearest the viewer; one row per y):
  - z1: `####### / #*.#.a# / ##....# / #...#.# / #.#.E## / #######`

#### 3-2 Through the Margin
- Objective: Collect both axioms, then reach the gate.
- Rooms: First Room (6x5x4, free folds: rollL/rollR/pitchA/pitchB); Second Room (6x5x4, free folds: rollL/rollR/pitchA/pitchB); A Margin (4x3x1, free folds: none, levers only)
- Axioms: 2; hidden shard: yes; shortest solution: 20 turns
- Solution keys (R/L = right/left, A/T = away/toward, Q/F/X/V = folds, E = interact): `V X R R X X V T Q L F R V V T L L F Q L`
- With the shard: 24 turns: `V X F R R R L L X X A F L T A F R X R T T F Q L`
- Layers of "First Room" (z = 0 is nearest the viewer; one row per y):
  - z1: `###### / ##..## / #@#.## / ##.#.# / ######`
  - z2: `###### / ##*#h# / #.#..# / #a...# / ######`
- Layers of "Second Room" (z = 0 is nearest the viewer; one row per y):
  - z1: `###### / #....# / ##..## / #.#..# / ######`
  - z2: `###### / #a*### / ##..## / #E.#.# / ######`
- Layers of "A Margin" (z = 0 is nearest the viewer; one row per y):
  - z0: `#### / #h$# / ####`

#### 3-3 The Last Question
- Objective: Collect every axiom, then reach the gate. Which way is down?
- Rooms: The Study (6x5x4, free folds: rollL/rollR/pitchA/pitchB); The Question (5x5x3, free folds: rollL/rollR/pitchA/pitchB)
- Axioms: 2; hidden shard: no; shortest solution: 20 turns
- Solution keys (R/L = right/left, A/T = away/toward, Q/F/X/V = folds, E = interact): `L V A R V A Q X A X X V A Q L L L F R R`
- Layers of "The Study" (z = 0 is nearest the viewer; one row per y):
  - z1: `###### / ##...# / ###### / #....# / ######`
  - z2: `###### / #*.#D# / ###P.# / #a..@# / ######`
- Layers of "The Question" (z = 0 is nearest the viewer; one row per y):
  - z1: `##### / #..E# / #..*# / ##.a# / #####`


Every level must be proven solvable by the solver. The check script also reports whether a level can be solved with no folds at all; for every shipped level the answer is no (a "solvable without any fold" note would be printed).

## 12. Art direction and visual identity

**Direction: "the survey office at night".** The House is a real, built place lit by the one lantern the Surveyor carries. Everything the player reads (menus, objective, hints, chapter list) is an artefact of Ilse Varga's office: sheets of drafting film, a ruled title block, a brass-and-lacquer instrument rail, and her copying-pencil handwriting in the margins. The 3D scene supplies warmth and depth; the UI supplies cool, precise paper. They never imitate each other.

**Renderer.** Genuine 3D with Three.js 0.170.0 (WebGL 2). Each room is built from its voxel grid as one merged mesh (faces only where a solid cell borders an empty in-bounds cell), so the near, left and top shells back-face-cull away and the room reads as a doll's-house section without any special casing. Rooms that are one cell deep get section caps (dark poché with a 45 degree hatch, as on an architect's section) on their cut face and a plaster back wall. The Canvas 2D oblique renderer from version 1 is kept as the fallback when WebGL is unavailable or the context is lost for good.

**Materials (physically based, procedural canvas textures, generated once at start).**
- Plaster: every face whose room-local normal is along x or z. Off-white mineral grey with mottling, hairline cracks and a damp line low on the wall; roughness 0.92.
- Worn stone: every face whose room-local normal is along y (the original floors and ceilings). One flagstone per cell, grout grooves in the normal map, polished centres in the roughness map. Because the material is tied to the room, not to gravity, a fold visibly puts you on plaster with the flagstones standing up beside you. That is the whole game in one image.
- Brass: lever bases, plate rims, the gate ring, the lantern frame. Metalness 1, roughness 0.32 to 0.5 from a smudge map, lit by a dim PMREM studio environment (intensity 0.35) so metal never goes black.
- Dark lacquered wood: doors and lever handles, with grain texture and clearcoat.
- Frosted glass: door lights and the gate panel; rough transmission on High, translucent emissive on Low and Medium.
- Voxel ambient occlusion is baked into vertex colours at every quality level; it doubles as the contact shadow on Low.

**Light.** One warm lantern point light (2700 K, `#ffb070`) carried by the Surveyor, flickering by at most 7 percent; it casts the only real shadows (PCF soft, 512 px Medium, 1024 px High). A cool moonlight fill from above and a hemisphere term keep up-facing surfaces brighter than walls, so the floor always reads as floor. Restrained neon strips (`#7fd8ff`) run along the twelve edges of the room box: these are the fold seams, and they brighten during a fold. Portals throw additive cone shafts of their own colour. ACES Filmic tone mapping, exponential fog the colour of the void, gentle bloom with a threshold above 1.0 so only emissive parts glow, and slow dust motes in the lantern's light.

**Palette (six named colours; CSS custom properties and renderer constants).**
| Name | Hex | Role |
|---|---|---|
| Lamp-black | `#0b0d10` | The void around the House, fog colour, page background |
| Drafting film | `#dfe4de` | Every UI sheet (objective slip, title block, menus); cool grey-green, never cream |
| Graphite | `#23272c` | Text and rules on film, primary buttons on film |
| Brass | `#c39645` | Instrument rail fittings, the interactable highlight, the gate, axioms |
| Seam blue | `#7fd8ff` | Fold seams, fold keys, walkable floor highlight, focus rings |
| Copying pencil | `#6a5bd6` | Ilse's handwriting (hints, margin notes), portals, the hinted move |

Two support tones are derived, not new: lacquer `#2a1d16` (wood of the rail) and film-shadow `rgba(35,39,44,0.55)` (muted text on film). Red is not used anywhere, including refusals.

**Typefaces (bundled with `@fontsource`, SIL Open Font License, latin subset only; no network).**
| Face | Weights | Role |
|---|---|---|
| Spectral | 400, 500, 400 italic | Prose: wordmark, room names, objective, premise, rules, epilogue. A screen serif with the authority of a printed plan. |
| Barlow Condensed | 500, 600 | Title-block lettering: numbers (tabular), labels in ruled cells, engraved key labels on the brass rail. Narrow like stencil lettering on drawings. Sentence case, normal tracking. |
| Caveat | 500 | Ilse's hand only: hints, margin notes, the hint count on the chapter sheet. Never for controls or system messages. |

No monospace face is used. Key letters appear as small brass key caps, set in Barlow Condensed.

**Principles.**
1. One bold gesture: the chapter select is a single large sheet of drafting film folded into three panels, with a real miniature plan of every room drawn from its level data. Everything else is quiet.
2. Paper is cool and flat, light is warm and deep. The UI never glows; only the 3D scene does.
3. Sentence case everywhere, plain verbs on buttons ("Pull the lever", "Open the chapter plans", "Restart this room"). No arrows on buttons, no eyebrow labels, no "A · B · C" strings; structure comes from ruled cells and position.
4. Square-cornered sheets (2 px radius at most) with a hard 1 px offset shadow like paper on a desk, never soft grey blur shadows.
5. Every state is legible without colour: walkable = lit square with a diamond, blocked = cross, axiom = diamond, note = folded paper, portal = ring with a letter.
6. Focus is a seam-blue 2 px ring with a lamp-black 2 px halo so it shows on film, on wood and on the scene.

- Layout: objective slip top-left, title block top-right, instrument rail along the bottom; 16 px safe gutter everywhere; at 360 px the title block folds under the slip and the rail wraps into two rows above the movement pad.
- Poster: a real in-game screenshot saved as `poster.png` (1600 x 900).

### Level view HUD (wireframe)

```
+------------------------------------------------------------------------------+
| ##(brass clip)                                    +--------------+-------+   |
| | 1-2  Two axioms                    |            | Turns        |     4 |   |
| | Collect both axioms, then reach    |            | Shortest     |     9 |   |
| | the gate.                          |            | Margin note  | hidden|   |
| | <> <>  1 of 2 axioms held          |            +--------------+-------+   |
| | ~ Ilse: "One axiom sits in a corner ~           | The divided hall     |   |
| |   of the ceiling..." (pencil, hints only)       +----------------------+   |
|                                                                              |
|                 . . . . . .  3D room, lantern-lit  . . . . . .               |
|                       [lit square] [Surveyor] [cross]                        |
|                                                                              |
|                  ( pencil-free message band: "The room turns." )             |
|                     [brass tag:  [E]  Pull the lever ]                       |
| ============================================================================ |
| || [Q] Roll left | [F] Roll right ||  [E] Use  | [Z] Undo | [R] Restart |    |
| ||               |                ||  [H] Hint, 3 left    | [Esc] Menu  |    |
| ============================ lacquer rail, brass edge ====================== |
+------------------------------------------------------------------------------+
```

### Chapter select (wireframe; the bold sheet)

```
+------------------------------------------------------------------------------+
|  Paradox House, plans                                   [Settings] [Title]   |
| +------------------------+:+------------------------+:+--------------------+ |
| | The folded hall        |:| The stairwell that     |:| The mirror house   | |
| | Gravity turns in the   |:| isn't                  |:| Rooms remember...  | |
| | plane.                 |:|                        |:|                    | |
| | +------+ 1-1 First fold|:| +------+ 2-1 The box   |:| +------+ 3-1 ...   | |
| | |plan  | Solved, 4 turns|:| |plan  | Ready         |:| |dashed| Not yet   | |
| | +------+               |:| +------+               |:| +------+ surveyed  | |
| | +------+ 1-2 Two axioms|:| ...                    |:| ...                | |
| | |plan  | note found [] |:|                        |:|                    | |
| +------------------------+:+------------------------+:+--------------------+ |
|         (":" = fold crease with a soft crease shadow between panels)         |
| +----------------------+-------------------+-----------------------------+   |
| | Sheet  Paradox House | Rooms solved 3/9  | Margin notes 1 of 3 (pencil)|   |
| +----------------------+-------------------+-----------------------------+   |
+------------------------------------------------------------------------------+
```

### Review of this plan against the brief (pass b)

The first draft was checked line by line against the brief and the list of generated-UI tells. Changes made before any code was written:
- Draft used a cream "parchment" for sheets. That is the warm-cream look the brief rules out; replaced by cool drafting film `#dfe4de` with graphite.
- Draft gave every panel a small uppercase tracked label ("OBJECTIVE", "STATS"). Removed; the ruled title block and the slip's position carry that meaning.
- Draft set turn counts and key hints in a monospace face. Replaced by Barlow Condensed tabular figures and brass key caps.
- Draft rendered progress as "Axioms 1/2 · Note hidden · Turns 4". Split into the slip's diamond row and title-block cells; no dot-separated strings remain.
- Draft spent boldness twice (an oversized wordmark and the plan sheet). The wordmark is now modest Spectral 500; the plan sheet keeps the boldness.
- Draft had a red "blocked" flash. Replaced with a camera thud, a low tone and a pale cross; red is not used.
- Draft used handwriting for the HUD message line. Restricted Caveat to Ilse's hints and notes so system text stays crisp.

## 13. Animation and VFX

- Fold: a real 3D rotation of the room group about the room centre, around the view axis of the fold (z for rolls, x for pitches), 600 ms, cubic ease in-out (quaternion slerp between the exact start and end orientations). The player and objects stay upright in world space and ride with their cells. The fold seams brighten to 2.5x during the turn. At the end the group quaternion is set from the exact integer orientation matrix, so the scene matches the logical state; only then does the Surveyor drop along the new down (accelerating, about 0.2 s per cell). With camera effects off (or `prefers-reduced-motion`): instant snap, no fall tween.
- Step: the Surveyor's position eases to its cell (`1 - exp(-dt * 14)`), with a walking bob (two footfalls per step), a cloak sway and the lantern swinging on its bail; it turns to face the move direction over about 120 ms.
- Collect: the axiom spins up and shrinks into the lantern over 0.45 s while a brass ring expands on the floor; the margin note folds shut and rises.
- Lever: the wooden handle swings through 80 degrees over 0.3 s before the fold starts. Switch: the toggle flips and its pilot lamp lights seam blue. Plate: sinks 4 cm and its rim lights.
- Door: slides into the neighbouring solid cell over 0.35 s (and back when closing).
- Portal: a shimmering surface (animated swirl and fresnel rim shader) inside a brass ring, an additive light shaft above it; passing through dips exposure and fades back over 0.35 s, and the room name appears in a caption.
- Glints: axioms and margin notes catch a star glint every few seconds.
- Level complete: the gate's frosted panel flares and a brass ring pulses outward, then the summary sheet after 1.1 s (0.3 s with effects off).
- Blocked move: a low thud, a 0.18 s camera shake biased toward the attempted direction, and a pale cross that flashes on the refused cell. No red.
- Interactable target: a brass ring on the floor under it, slowly rotating, plus a lifted emissive level.
- Valid moves: a soft seam-blue lit square with a diamond on each floor the Surveyor can step to (computed by `probeMove`, so it cannot disagree with the rules). The hinted move is drawn in copying-pencil violet.
- Idle: axioms bob and turn, portals shimmer, dust drifts, the lantern flickers. Bobbing, shimmer phase and camera shake stop with effects off; the lantern flicker is reduced to a steady glow.
- Camera: fixed readable three-quarter angle (yaw -18 degrees, pitch 28 degrees down), orbit-follow toward 40 percent of the player offset, smoothed with `1 - exp(-dt * 5)`. The player can add up to plus or minus 24 degrees yaw and plus or minus 10 degrees pitch by dragging on the scene or with `[` and `]`; `C` recentres. The distance fits the room's bounding sphere to the space between the HUD bars.

## 14. Sound design and music

All audio is synthesised with the Web Audio API; there are no audio files. The `AudioContext` is created or resumed on the first user gesture. Master gain = volume squared (a perceptual curve; default volume 0.6) times mute. M toggles mute, and both are saved.

- Step: 90 Hz sine tick 40 ms, with 0.05 gain.
- Blocked: 70 Hz triangle 90 ms with a small downward glide.
- Fold: two detuned saw tones sweeping 180 to 60 Hz (down) or 60 to 180 Hz over 0.38 s, low-passed at 900 Hz.
- Crystal: arpeggio of three sine tones at 660, 880, 1320 Hz, 70 ms apart.
- Switch / lever: short filtered noise click plus a 220 Hz blip.
- Portal: bandpass-swept noise rising 0.3 s plus a 330 Hz sine.
- Door: low 110 Hz thud, longer decay.
- Complete: major-seventh chord (A3, C#4, E4, G#4) with slow attack 0.04 s, 1.6 s decay.
- Hint: soft bell 1040 Hz.
- Ambient bed: two sine drones a fifth apart (root changes per chapter: A1, D2, F1) with slow tremolo (0.07 Hz), gain 0.035, and a very sparse random pentatonic pluck every 6 to 12 s (random is audio-only, never gameplay).
- No sound plays while muted; sounds never throw if audio is unavailable.

## 15. Menus and in-game UI

All screens are artefacts of the survey office (see section 12 for palette, type and principles).

- **Title:** the live 3D hall folds slowly behind a single sheet of drafting film pinned at the left: the wordmark "Paradox Room" in Spectral 500, the tagline in italic, the premise, then plain text buttons on the film: "Start the first room" or "Continue: 1-3 Quiet corners", "Open the chapter plans", "How folds work", "Settings", and "Read the ending again" once earned. A ruled controls key at the foot of the sheet lists keys as brass caps in a two-column table.
- **Chapter / level select (the bold sheet):** one large film sheet folded into three panels with visible crease shading, one panel per chapter, stacked on phones. Each level is a button showing a miniature plan drawn from its level data (poché for solid cells, small glyphs for start, axioms, gate, portals), the sheet number and name, and a status line in plain words: "Solved in 9 turns", "Ready to survey", or "Not yet surveyed" (locked; plan drawn dashed and the button disabled with an accessible label). A found margin note shows as a small folded-paper mark with "Note found"; an unfound one in a level that has one shows a pencil "?" in Ilse's hand. A title block across the foot shows rooms solved and notes found in ruled cells.
- **HUD:** objective slip top-left (sheet number and room-set name, objective, a diamond row with "1 of 2 axioms held", and Ilse's pencil hint text when a hint is shown); title block top-right (turns, shortest known or best, margin-note status, current room name). The instrument rail along the bottom: fold keys (only the folds the current room allows) in a seam-blue group, then Use, Undo, Restart, Hint (with the remaining count), Menu; each key shows its keyboard cap. A single brass tag above the rail names the reachable action in plain words ("Pull the lever: rolls the room left"). A transient message band reports events ("Axiom 1 of 2 held.", "The fold finds no floor.").
- **Pause menu:** a film sheet titled "Paused": "Resume", "Restart this room", "How folds work", "Settings", "Open the chapter plans", "Leave to the title".
- **Level complete:** a film sheet with a ruled title block (turns, shortest known, folds, hints) and plain buttons "Go to the next room" (or "Finish the House"), "Replay this room", "Open the chapter plans".
- **Settings:** volume, mute, camera effects, text size, high contrast, graphics quality (Auto, Low, Medium, High; Auto shows what it chose), reset progress.
- **Ending sequence:** a full-screen epilogue of 5 text cards over a near-black backdrop (each fades in over 1.2 s unless reduced motion; Continue advances, Skip leaves). Card 4 shows the margin-note count, and the extra epilogue line appears only with 3 of 3. It is replayable from the title after all 9 rooms are solved.
- **How folds work:** a modal with the rules in seven bullets.
- Every modal traps focus, restores focus on close and closes with Esc.

## 16. Accessibility and settings

- Fully keyboard playable; every button reachable by Tab with visible focus rings.
- Settings (all persisted): master volume slider 0..100, mute toggle, camera effects toggle (rotation tween, shake, bobbing; default off when `prefers-reduced-motion: reduce`), text size (Small / Medium / Large = 14 / 16 / 19 px base), high-contrast outlines toggle (stronger edges and markers), graphics quality (Auto / Low / Medium / High). Low: pixel ratio 1, no shadow maps (baked voxel AO and a blob contact shadow), no bloom, no dust. Medium: pixel ratio up to 1.5, 512 px soft lantern shadows, bloom, 140 dust motes; target 60 fps on a mid-range laptop. High: pixel ratio up to 2, 1024 px shadows, 320 motes, glass transmission. Auto picks from the GPU name, cores, memory and pointer type (software rasterisers get Low) and steps down one level if the frame rate stays under 40 fps for three seconds. `?quality=` forces a level for one visit.
- `prefers-reduced-motion` is read at start and again on change.
- Colour is never the only signal: walkable = diamond, blocked = cross, crystals = diamond shape, shards = triangle, portals = ring with a letter badge.
- Live region (`role="status"`, `aria-live="polite"`) mirrors objective, progress and messages.
- Canvas has `aria-label` and a text alternative in the live region; all interactive controls are real `<button>` elements with labels.
- Minimum touch target 44 px.

## 17. Technical architecture

Vite + TypeScript (strict). Dev dependencies `typescript 5.6.3`, `vite 5.4.11`, `@types/three 0.170.0`. Runtime dependencies `three 0.170.0` and the bundled fonts `@fontsource/spectral`, `@fontsource/barlow-condensed`, `@fontsource/caveat` (latin subsets only). The 3D view lives in `src/render3d/` (`scene3d.ts` renderer, `roomMesh.ts` voxel mesher with baked AO, `props.ts` modelled props and the Surveyor, `materials.ts`, `textures.ts` procedural canvas textures, `quality.ts`); `src/render/renderer.ts` is the Canvas 2D fallback and both implement `src/render/types.ts`. `src/ui/plans.ts` draws the chapter-sheet miniature plans.

```
source/paradox-room/
  index.html            title PARADOX ROOM; canvas + UI containers; no external requests
  package.json tsconfig.json vite.config.ts
  scripts/check-levels.ts       node --experimental-strip-types
  src/
    main.ts                     bootstrap
    core/    types.ts rotations.ts rules.ts solver.ts describe.ts   (pure, no DOM; relative imports end in .ts so Node can run them)
    levels/  levels.ts compile.ts                      (pure level data + compiler)
    render/  renderer.ts palette.ts                      (canvas drawing)
    audio/   audio.ts
    state/   game.ts input.ts
    storage/ save.ts
    ui/      ui.ts styles.css
```

- **State machine:** `title`, `select`, `play`, `paused`, `settings`, `howto`, `complete`, `ending`. `game.ts` owns transitions; `ui.ts` renders DOM for each state.
- **Pure core.** `rules.ts` exposes `initialState(level)`, `applyAction(level, state, action)` returning `{state, events}` or `{error}`, `probeMove(level, state, dir)`, `reachableInteractables`, `describeObjective`. `solver.ts` exposes `solve(level, from?, cap?)` returning the action list or `null`, with a state key function. These modules import nothing from the DOM, so Node can run them.
- **Level data schema** (`LevelDef`): `id`, `chapter`, `name`, `objective`, `intro`, `hints: [string, string?]`, `links: Record<string,string>`, `rooms: [{ name, free: FoldKind[], layers: string[][] }]` (layers indexed `[z][y]`, a string per row), optional `secretRooms` are just extra entries in `rooms`; the compiler finds `@`, objects and portal pairs by their characters and throws on a malformed level (missing start, odd portal count, undefined link).
- **State:** `{ room, x, y, z, ori: number[] (per room), got: number (bitmask of collectibles), ctl: number (bitmask of controllers) }`.
- **Loop:** `requestAnimationFrame`, `dt = min(0.05, (now - last)/1000)`; only visuals (tweens, particles, camera, audio ambience) use `dt`.

## 18. Performance requirements

- 60 fps on a mid laptop and a recent phone; each frame draws at most about 600 polygons.
- Cache the canvas size and device pixel ratio (cap DPR at 2). The loop stops while the tab is hidden.
- Hint / soft-lock solver capped at 150 000 states and run on demand, not per frame (the soft-lock check runs after each turn using the cap and is skipped if it takes the cap).
- No per-frame allocation in hot loops except small arrays; no memory growth during long play.
- Built size: one script of about 630 KB (about 170 KB gzip, almost all Three.js), 16 KB CSS and about 330 KB of WOFF/WOFF2 fonts. GPU resources of a level (room meshes, props, per-instance materials) are disposed on level change; shared textures and materials live for the session. Resize is handled every frame; WebGL context loss pauses drawing, restores resources on `webglcontextrestored`, and falls back to the 2D view if the context has not returned after five seconds.

## 19. Asset creation and licensing

Everything is procedural and original: geometry is drawn with canvas paths, the favicon is an inline SVG data URI, audio is synthesised, and the three typefaces (Spectral, Barlow Condensed, Caveat) are bundled from `@fontsource` under the SIL Open Font License 1.1. All textures are generated procedurally at start; no third-party art or audio is used. The code is the repository's licence.

## 20. Save and persistence behavior

- One localStorage key: `paradox-room:v1`, value `{ v:1, completed: string[], best: Record<id,{turns:number}>, shards: string[], settings: {...}, last: string, endingSeen: boolean }`.
- Every read and write is wrapped in `try/catch`. Corrupted JSON, wrong types, a different version or a quota error all fall back to defaults, never throw and never break the game (a note appears in the settings menu if saving fails).
- Saved: completed levels (this is what unlocks), best turns, secrets found (saved at the moment of pickup), settings, last level, ending seen.
- A "Reset progress" button in settings asks for a second click to confirm (no `alert`/`confirm`).

## 21. Error handling and browser compatibility

- Targets: current Chrome, Edge, Firefox, Safari (ES2020). No unhandled errors in the console during normal play.
- If Web Audio is unavailable, play silently. If localStorage is unavailable, play without persistence. If WebGL 2 is unavailable the Canvas 2D view is used and the title sheet says so; if neither context is available a plain message explains what is missing.
- Resize and orientation changes recompute layout without losing state. `visibilitychange` suspends the loop and the audio context.
- `window.addEventListener('error')` shows a calm message in the status line rather than a blank page.

## 22. Testing strategy

1. **Solver check** (`npm run check:levels`): compiles every level, then BFS from the start state over all legal actions (4 moves, interact with every reachable interactable, free folds the room allows). Fails if any level is unsolvable, if a portal letter is unpaired, if a link is undefined, or if a secret shard cannot be collected on some solution that still finishes the level. Prints per level: states explored, shortest solution length, folds used, and the action string.
2. **Rule checks** (in the same script): exactly 24 orientations are generated and four equal folds return to identity; `applyAction` never mutates its input; walls refuse movement; a fold that is not allowed in the room is refused (`locked`); a fold with no floor to fall to is refused (`nofloor`); closing a door onto the player is refused (`doorway`); a portal into a room that has no floor under its ring is refused (`farside`) while a portal into a supported room carries the player to the matching cell.
3. **Typecheck and build** must pass with zero errors.
4. **Browser check:** load the built page, confirm no console errors, open a level, move, fold and replay the solver's solution for level 1-1, verify completion and unlock persisted after reload.

## 23. Gaming hub integration

The NEON ARCADE hub lists the game with: `playUrl: './games/paradox-room/'`, title "PARADOX ROOM", tagline "The floor is a matter of opinion.", genre tags "Puzzle", "Spatial", "Adventure", accent `purple`, tech "Three.js (WebGL 2), TypeScript, Web Audio, Vite", and the controls listed in section 8. The built game must work when opened directly from `games/paradox-room/index.html` and when embedded as a link.

## 24. GitHub Pages deployment requirements

Pages serves the repository root. The Vite config uses `base: './'` and writes to `../../games/paradox-room` (`emptyOutDir: true`, `target: 'es2020'`, `assetsInlineLimit: 0`); the built folder is committed. The dev server uses port 5232 with `strictPort`. The source `index.html` redirects visitors on `github.io` that land on `/source/paradox-room` to `/games/paradox-room/`. No absolute URLs, no CDN, no runtime network requests.

## 25. Definition of done

- [ ] Spec followed; rules in section 7 implemented exactly
- [ ] 9 levels, 3 chapters, linear unlocks persisted
- [ ] Gravity Fold, portals, levers, switches, plates, doors, crystals, exit all work
- [ ] Walkable/blocked markers use the same function as movement
- [ ] Objective, progress and one interaction prompt at a time are always visible
- [ ] Undo, restart, 3-step hint, soft-lock banner
- [ ] 3 secret shards, tracked in the save
- [ ] Ending sequence after 3-3
- [ ] Audio synthesis, mute and volume persisted
- [ ] Settings: volume, mute, camera effects, text size, high contrast
- [ ] Keyboard-only play, visible focus rings, reduced-motion respected
- [ ] Layout works at 360 px width with no horizontal scroll
- [ ] `npm run check:levels` passes (all levels solvable)
- [ ] `npm run typecheck` and `npm run build` pass; `games/paradox-room/index.html` exists
- [ ] No console errors, no `alert`, no placeholder text
- [ ] Poster captured from real gameplay (if possible)

## 26. Final reporting requirements

End with a report under 250 words: status (COMPLETE / PARTIAL / BLOCKED and any missing mandatory features); the exact commands run with their real results (level solver, typecheck, build, preview check); browser verification done and console errors seen; poster status; files created or modified; and the hub entry facts (playUrl, title, tagline, description, genre tags, controls, tech, accent). Do not claim anything you did not run.
