# VOID SURVIVOR — implementation prompt

You are building **VOID SURVIVOR**, a browser roguelite survival-action game, as a self-contained module of the NEON ARCADE repository. This document is the full specification. Do not invent a different game; every number below is normative unless you document a justified deviation in the final report.

---

## 1. Game identity and creative vision

- **Title:** VOID SURVIVOR. **Tagline:** "Feed the void. Break the swarm."
- **Pitch:** a pilot of a tiny salvage drone is dropped into a collapsing neon arena and must survive up to 20 minutes against escalating waves while assembling a build out of interacting upgrades. The headline idea is a three-part **Essence economy** (Siphon → Reserve → Bulwark Field → Detonation) that turns your kills into a shield and then into an explosion.
- **Feel:** chaotic but readable. Dozens of enemies, a screen full of colour, but the player is always the brightest white-cyan object, enemy projectiles are always hot magenta/amber with a bright core, and every dangerous thing telegraphs before it hurts.
- **Accent colour for the hub:** `pink`.
- Everything is original: code, art (procedural canvas vector shapes), audio (Web Audio synthesis), text. No external assets, no network.

## 2. Original gameplay concept

You move; your drone shoots automatically. Killing enemies drops **Essence motes** that fill an XP bar. Each level-up pauses the action and offers **3 upgrade cards** drawn from a weighted pool. Upgrades combine: owning certain pairs unlocks **synergies** with new behaviour. A run is a 20 minute arc with bosses at minutes 5, 10, 15 and a final boss at 19:00. Dying or winning awards **Shards**, a persistent currency spent in the **Vault** (meta unlocks) between runs.

## 3. Genre and target experience

Top-down arena survivor roguelite ("horde survivor"). Session length: a full run is ~20 minutes, a typical failed run 5-12 minutes. The target experience is the "one more run" loop: early minutes are gentle and teach controls; minutes 5-10 introduce build decisions; minutes 10-20 reward clever synergy use and movement. Skill expression is movement (kiting, flanking shields, avoiding telegraphed lanes) and build choices (when to hold Reserve, when to detonate).

## 4. Original story and worldbuilding (brief)

The **Hollow** is a drowned arcade-station where discarded game cabinets leak "Essence", a luminous residue of every player who ever lost. You pilot a *Mote Drone* ("Wick") sent by the last salvage guild to harvest Essence. The Core Warden, a cabinet AI that refuses to power down, guards the deeper rings. Flavour text appears only on the menu, the Vault item descriptions, boss warnings and the summary. Keep it to one-liners; the game must never stop for lore.

## 5. Player character and relevant entities

### 5.1 Player ("Wick")
- Radius 12, max HP 100, move speed 190 px/s (arena units), pickup radius 70, i-frames 0.7 s after any hit (blink render), HP regen 0 base.
- Drawn as a white-cyan chevron with a bright core and a small facing flare; always on top.

### 5.2 Weapons (all fire automatically; "aim" picks nearest target by default)
| Id | Name | Base behaviour | Max Lvl |
|---|---|---|---|
| pulse | Pulse Cannon (always owned) | cooldown 0.55 s, dmg 8 + 2.5·(L-1), speed 520, life 1.1 s, shots: 1 (L1-2), 2 (L3-4), 3 (L5), spread 0.14 rad | 5 |
| orbit | Orbit Blades | blades = L+1, radius 64, 3.2 rad/s, dmg 6 + 2.5·L per hit, per-enemy hit gap 0.35 s | 5 |
| homing | Seeker Swarm | cooldown 1.6 s, missiles = 1 + floor((L-1)/2), dmg 11 + 3·L, speed 300, turn 4 rad/s, life 2.5 s | 5 |
| pierce | Lance Beam | cooldown 2.0 s, hitscan beam length 520, half-width 9, dmg 16 + 6·L, hits every enemy on the line; twin beams (±0.12 rad) from L4 | 5 |
| chain | Chain Arc | cooldown 1.7 s, first target within 400, jumps = 2 + L, jump range 150, dmg 10 + 3.5·L, ×0.85 per jump, never re-hits a target | 5 |

A build holds at most **4 weapon types** (pulse counts). When full, un-owned weapons are not offered.

### 5.3 Passives (max level in parentheses)
- **Vitality** (5): +20 max HP and heal 20 per level.
- **Regeneration** (5): +0.7 HP/s per level.
- **Swift Thrusters** (5): +7 % move speed per level.
- **Magnet Core** (5): +30 % pickup radius per level.
- **Overclock** (5): cooldown multiplier ×0.93 per level on all weapons.
- **Fortune** (5): +0.1 luck per level (raises rare-card weight, chest and shard drop chance).
- **Plating** (4): damage taken ×0.94 per level.
- Fillers (always available so a choice never has fewer than 3 cards): **Overcharge** (+4 % all damage, unlimited stacks), **Repair** (heal 35 % max HP), **Shard Cache** (+8 Shards this run).

### 5.4 Signature upgrades (Section 7): **Siphon** (3), **Bulwark Field** (3), **Detonation** (3).

### 5.5 Enemies (every enemy has a distinct silhouette, a colour, and a telegraph if it can hurt at range)
Base values are at wave 1 multipliers (see 10). Contact damage is dealt once per i-frame window.

| Kind | Shape / colour | HP | Speed | Radius | Contact | XP | Reserve ess. | Behaviour |
|---|---|---|---|---|---|---|---|---|
| swarm "Drifter" | small triangle, lime | 6 | 78 | 9 | 6 | 1 | 1 | Beelines to the player, slight sinusoidal wobble. |
| spitter "Spitter" | diamond, pink | 14 | 60 | 11 | 6 | 3 | 2 | Keeps 240-300 px away. Every 2.8 s: 0.7 s telegraph (aim line grows, core flashes), then one bolt (dmg 8, speed 230, r 5). |
| rammer "Rammer" | square with horn, amber | 24 | 70 | 13 | 12 | 4 | 3 | Within 340 px: 0.8 s wind-up (long dash line drawn, body shakes), then dash at 480 px/s for 0.55 s in a straight line, then 0.9 s recovery. |
| cleaver "Cleaver" | big ring with crack, purple | 36 | 52 | 16 | 9 | 4 | 3 | Slow chaser; on death splits into 2 "splitlets" (HP 5, speed 120, r 7, contact 4, 0 ess.). |
| aegis "Aegis" | disc with arc shield, cyan | 44 | 58 | 14 | 10 | 7 | 5 | Slow chaser with a rotating shield arc (±50°, rotation 1.4 rad/s, radius r+9). Player projectiles and blades striking inside the arc are blocked (spark, 0 dmg). Chain Arc, Lance Beam, Field and Detonation ignore the shield. Flank it. |
| caster "Voidcaster" | spiky star, violet | 30 | 50 | 12 | 8 | 7 | 5 | Hovers at 320 px. Every 5.5 s: 0.5 s charge, then a **void pool** at the player's position (own 1.0 s warning ring, then 6 s lifetime, radius growing 44→78, 14 dmg/s). |
| warden "Core Warden" (boss) | huge octagon with orbiting nodes, white/magenta | see 5.7 | 45 | 40 | 14 | 60·tier | 40·tier | See 5.7. |

**Elites:** from wave 5, each spawn has chance 3 % + 0.5 %·(wave-5) to be elite: HP ×3.5, contact ×1.3, radius ×1.35, XP ×3, ess. ×3, always drops a Shard, 8 % chest chance, drawn with a thick gold outline.

### 5.6 Projectiles
- Player bullets: cyan/white, with life, pierce count, optional homing. Hard cap 140 live.
- Enemy bullets: **magenta/amber with white core**, optional black outline (setting "projectile outline", default on), radius 5-6, hard cap 160 live. Enemy bullets never home.

### 5.7 Boss: Core Warden (tier 1-4)
- HP = 700 · (1 + 0.9·(tier-1)) · hpMul(wave). Spawns at 300 s (tier 1), 600 s (2), 900 s (3), and the **Final Warden** at 1140 s (tier 4). During a boss, regular spawn budget runs at 50 %.
- **Phase 1** (HP > 50 %): action every 3.2 s cycling: *Ring Burst* (0.8 s telegraph glow, then 10 + 2·tier bullets radiating at 170 px/s), *Lightning Lanes* (2 lanes through points near the player, vertical/horizontal, 1.2 s warning, then 0.35 s live, 18 + 2·tier damage), *Summon* (4 + tier swarm drifters around the boss).
- **Phase 2** (HP ≤ 50 %, flash and announcement): action every 2.3 s cycling Ring Burst (two counter-rotated rings), Lanes (3 lanes), Summon (6 + tier), and *Charge* (0.8 s telegraph line then dash at 520 px/s for 0.6 s).
- Death: drops a chest, `15·tier` Shards (physical crystals), a big Essence shower, screen flash, announcement. Killing tier 4 wins the run immediately.

### 5.8 Pickups
- **Essence mote** (XP, small green-cyan diamond): pulled toward the player inside pickup radius at 320 px/s. Cap 300 live; overflow is auto-collected instantly.
- **Shard crystal** (hex, gold/white): same magnet; cap 60.
- **Chest** (rare, framed box with pulse): drop chance 0.35 % per normal kill × (1 + luck), elites 8 %, bosses guaranteed. Opening it triggers a free upgrade choice with rare-biased weights and grants +10 Shards.

## 6. Core gameplay loop

1. **Menu** → choose arena (if unlocked) → *Start Run*.
2. **Run:** move, auto-fire, collect motes, level up, pick upgrades, survive waves, defeat bosses.
3. **End:** death (HP 0) or victory (final boss dies or 20:00 reached). Summary screen shows stats, rating, Shards earned, new personal bests.
4. **Meta:** spend Shards in the **Vault** on new weapons, starting bonuses and arenas; persist; start a new run (R from summary) or return to menu.

## 7. Signature mechanic — the Essence upgrade system (exact rules)

State: `reserve` (float ≥ 0), `reserveCap`, `fieldOn`, `fieldSpent`, `hold`.

1. **Siphon** (L1-3). Reserve cap = [60, 100, 150][L-1]. On every enemy kill (not splitlet) the Reserve gains `enemy.ess × [1, 1.5, 2][L-1]`, clamped to cap. Without Siphon the Reserve is always 0. Motes (XP) are independent and always dropped.
2. **Bulwark Field** (L1-3, requires Siphon ≥ 1). The field raises automatically when `reserve ≥ 0.15 × cap` and `hold` is off, and stays up while reserve > 0.
   - Radius `R = min(150, 44 + 0.5·reserve·(1 + 0.2·(L-1)))` recomputed each tick.
   - Drain `1.2 + 0.012·R` Reserve per second; each absorbed enemy bullet costs `3 + 0.3·bulletDmg` Reserve. Both add to `fieldSpent`.
   - Enemy bullets whose circle overlaps the field are destroyed (absorb spark).
   - Enemies overlapping (distance < R + radius) take a tick every 0.25 s of `(5 + 0.1·reserve) × (1 + 0.25·(L-1))` damage (×1.5 with Bladed Field) and are pushed outward at 90 px/s.
   - While the field is up, enemies cannot deal contact damage to the player unless they are inside the player's body circle (rare).
   - When reserve reaches 0 while the field is up, the field **breaks**.
   - **Hold** (key Q / button): toggles hold. While holding, the field stays down and the Reserve builds without draining, so you can charge up a large detonation.
3. **Detonation** (L1-3, requires Bulwark ≥ 1). Triggers on field break and on manual **release** (key E / Space / button, 1.0 s cooldown). Let `spent = fieldSpent` (break) or `fieldSpent + reserve` (manual; Reserve becomes 0, field drops). If `spent < 8` nothing happens. Otherwise:
   - damage `= (10 + 1.5·spent) × (1 + 0.3·(L-1)) × dmgMul` to all enemies within radius `min(340, 80 + 2.4·spent)`; bosses take it too; the shield of Aegis is ignored;
   - knockback 220 px/s away; enemy bullets inside the radius are erased; `fieldSpent` resets;
   - screen shake and a ring VFX scaled by radius.
4. **Synergies** (computed from owned levels, shown in the HUD "Synergies" strip and on cards that would complete one):
   - **Seeker Lance** (Homing + Pierce): missiles pierce 2 extra enemies; beam damage ×1.25.
   - **Leech Arc** (Siphon + Chain): Chain Arc gets +2 jumps and every arc hit adds 1 Reserve.
   - **Bladed Field** (Bulwark + Orbit): while the field is up, blades orbit at `R + 10` and deal ×1.6; field contact damage ×1.5.
   - **Cluster Burst** (Detonation + Homing): a detonation also spawns `4 + 2·L_det` homing shards (dmg 25 % of detonation damage, life 2 s).
   - **Void Reactor** (Siphon + Bulwark + Detonation all owned): detonations refund 25 % of `spent` into Reserve.
5. **Choice generation** (pure function `rollChoices(state, rng, opts)`), see 9 and 17: always returns exactly 3 distinct valid cards.

## 8. Controls and input behaviour

| Input | Action |
|---|---|
| WASD / arrow keys | Move (normalised diagonal) |
| Mouse (optional) | Aim cursor when Aim = Mouse |
| E or Space | Release Reserve (Detonation) |
| Q | Toggle Reserve hold |
| 1 / 2 / 3 or Enter on focus | Pick upgrade card; 4 = reroll |
| Esc or P | Pause / resume |
| M | Mute toggle |
| R | Restart run (from pause, summary) |
| Touch | Floating virtual stick anywhere on the left half; on-screen buttons Release, Hold, Pause |

- **Aim mode setting:** *Auto* (default; nearest enemy), *Mouse* (weapons that need direction use the cursor), *Move* (last movement direction). Auto-fire is always on.
- Input is sampled into a plain struct (`mx,my,aimX,aimY,hasAim,release,toggleHold`); the pulses (`release`, `toggleHold`) are cleared after each simulation step. Blur/visibility change releases all keys and auto-pauses.
- No default key triggers browser scrolling or zoom.

## 9. Combat, collision and survival systems (exact numbers)

- All collisions are circle-circle; the Lance Beam is a segment test with half-width 9 + enemy radius; lanes are segment tests.
- Contact: enemy touches player (distance < r_e + 12·0.8) → player takes `contact × dmgScale(wave) × plating`, i-frames 0.7 s, knockback 160 px/s away, screen shake 0.25, hit sound. Contact never kills a boss; the enemy is not destroyed.
- Enemy bullet hit: damage as listed ×plating; bullet destroyed.
- Void pool / lane: damage while overlapping (pool per second ×plating, applied in 0.25 s ticks, i-frames do not apply to pools but do to lanes).
- HP regen = Regeneration level × 0.7 /s applied every tick (accumulated).
- **Death:** HP ≤ 0 → state `dead`, bullet-time visual (0.5 s slow) then summary.
- **Player damage output** is multiplied by `dmgMul = 1 + 0.04·overcharge + meta bonuses`.
- **Kill chain:** kills within 1.5 s of each other increment a chain counter (display ×N at ≥ 5; every 10 chain adds a small spark burst and a chime). The chain gives +1 % Reserve gain per chain step up to +30 % (only if Siphon).
- Enemy contact with the field never hurts the player. Enemy bullets are removed after 4 s or leaving the arena.
- Damage numbers: shown for hits ≥ 1, aggregated per 0.1 s per target visually (cap 40 numbers).

## 10. Progression and difficulty

- **Wave** `w = min(20, floor(t / 60) + 1)`. Wave banner on entry.
- **Budget** per second `b(w) = 2.4 + 0.8·(w - 1)`; a spawn accumulator gains `b(w)·dt` (×0.5 during a boss), capped at 30, and spends point costs: swarm 1, spitter 3, rammer 4, cleaver 4, aegis 6, caster 6. An enemy spawns only if `live < cap` where the **live cap is 160 (120 during a boss)**.
- **Scaling:** `hpMul(w) = 1 + 0.16·(w-1) + 0.004·(w-1)²`, `dmgScale(w) = 1 + 0.03·(w-1)`, `speedMul(w) = 1 + 0.012·(w-1)`.
- **Unlock waves & weights** (weight for picking a type; 0 before unlock wave):

| Wave | Time | New enemy | Weights (swarm/spitter/rammer/cleaver/aegis/caster) | Budget/s |
|---|---|---|---|---|
| 1 | 0:00 | swarm | 10/0/0/0/0/0 | 2.40 |
| 2 | 1:00 | spitter | 10/2/0/0/0/0 | 3.20 |
| 3 | 2:00 | rammer | 10/3/2/0/0/0 | 4.00 |
| 4 | 3:00 | cleaver | 9/3/3/2/0/0 | 4.80 |
| 5 | 4:00 | elites | 9/3/3/3/0/0 | 5.60 |
| 6 | 5:00 | aegis (boss at 5:00) | 8/3/3/3/2/0 | 6.40 |
| 7-7 | 6:00 | - | 8/3/3/3/3/0 | 7.20 |
| 8 | 7:00 | caster | 7/3/3/3/3/2 | 8.00 |
| 9-20 | 8:00-19:00 | - | mix drifts to 5/4/4/4/4/3 by wave 14, constant after | +0.8 per wave to 17.60 at wave 20 |

- Each wave start also spawns a **pack**: `5 + w` swarm drifters in a 90° arc outside the view (announced by the banner).
- **XP:** to next level `need(L) = 5 + 4·L + floor(0.45·L²)`; cap level 40. Level-up queue: if several levels are earned at once, the choice screen is shown repeatedly.
- **Shard rewards at run end:** collected crystals + `floor(time/20)` + `floor(kills/40)` + `10·bosses` + 100 for victory.
- **Rating:** `score = kills + 2·floor(time) + 250·bosses + level·20 + (win ? 1500 : 0)`; S ≥ 4500, A ≥ 3000, B ≥ 1800, C ≥ 900, else D.
- **Difficulty fairness rules:** budget never jumps by more than 35 % between waves; wave 1 budget ≤ 3 per second; no enemy type appears more than one wave before its documented unlock; the live cap is never exceeded; spawn positions are outside the visible area at 560-640 px from the player and clamped inside the arena.

## 11. Arena and encounter design

- **The Hollow** (default): square, half-extent 1200, a dim grid floor that scrolls with the camera, soft wall glow. No hazards other than enemy-made ones.
- **Ring Foundry** (Vault unlock): circular arena radius 1300, rust/amber palette, and an environmental **lightning lane** every 14 s from wave 3 (1.2 s warning, 0.35 s live, 16 damage). Lanes cross the arena through a random point near the player.
- Camera follows the player with slight easing; the visible logical height is 720 units, scaled to the canvas; arena walls clamp player and enemies.
- Encounters: wave start packs, boss rooms (arena stays the same; the boss rotates its node ring), lanes and pools force repositioning.

## 12. Art direction and visual identity (v2: real 3D)

**Concept: the Hollow seen through Wick's pilot visor.** The world is a drowned arcade-station floor of wet black obsidian floating over a void; the light comes from the things that matter (Wick, Essence, enemy fire). The interface is the pilot's equipment, not a game overlay: a cracked visor readout during play and a field-salvaged upgrade rig when levelling up.

**Renderer.** Three.js `0.170.0`, WebGL2, one fixed angled top-down perspective camera (fov 40°, pitch 60° down, ~860 units from the player, eased follow; widened on portrait screens so at least 560 sim units stay visible). Sim `x,y` maps to world `x,z`; the sim is untouched. Every entity class is an `InstancedMesh` (one per model part) whose matrices and colours are written from the sim each frame; nothing is allocated per entity per frame. Canvas 2D (the v1 renderer) remains as the fallback when WebGL cannot start.

**Materials and light.**
- Floor: dark glassy obsidian (`MeshStandardMaterial`, metalness 0.55, roughness 0.28 with a procedural roughness map), a faint 80-unit grid etched into it (etched lines are rougher and slightly lighter), lit by a procedurally generated PMREM environment (a dark room with cyan, magenta and brass light strips). On High a half-resolution planar reflection sits under a translucent obsidian layer so bright things mirror softly.
- Light pooling: every emissive thing (player, bolts, enemy fire, motes) drops an additive light splat on the floor, so the floor reads as lit without hundreds of real lights. Real `PointLight`s are a small fixed pool (Low 1, Medium 4, High 8): the player's lamp, Detonation flash, field raise, boss telegraphs, boss death.
- Armour: enemies are dark painted metal (roughness 0.35-0.5) with emissive accents in their identity colour; emissive values above 1.0 feed a thresholded `UnrealBloomPass`, then `ACESFilmic` tone mapping in the output pass. Only bolts, cores, the Field rim and telegraphs bloom; armour and floor never do.
- Atmosphere: exponential fog in void violet; beyond the arena wall the floor drops away into fog where tall dead arcade cabinets and pylons (instanced boxes with dim marquee strips) stand at several depths for scale.

**Models (primitives only, each with idle motion).**
| Sim kind | Model | Idle / telegraph |
|---|---|---|
| Wick (player) | swept chevron hull, cockpit canopy, twin thruster pods with exhaust glow, nose lamp | banks into turns, nose always points at facing, blinks during i-frames |
| swarm "Drifter" | small octahedral drone with six spikes and a lime eye ring | spins and bobs |
| spitter "Spitter" | three-legged walker with a turret head and barrel | head tracks aim; muzzle charges from dim to white-hot during the 0.7 s telegraph |
| rammer "Rammer" | armoured wedge with a horn | crouches (squash) and shakes in wind-up; leaves an amber dash trail |
| cleaver "Cleaver" | cracked crystal: four shell shards with a glowing core visible through the cracks | slow tumble; on death bursts into crystal debris and two splitlets |
| splitlet | small glowing crystal shard | fast spin |
| aegis "Aegis" | squat domed disc | a visible curved shield plate orbits at r+9 covering ±50° |
| caster "Voidcaster" | hovering spiked star with a violet core | rotates; core swells during the charge |
| Core Warden | octagonal hull, armour petals, rotating crown ring, 8 orbiting nodes, exposed core | phase 2: petals open, colour shifts white to magenta, nodes spin faster; ring-burst glow and charge lane telegraphs |
| Essence mote | small green octahedron | bobs and glints; streaks toward Wick when pulled |
| Shard crystal | brass-gold hexagonal crystal | slow turn with a periodic specular glint |
| Chest | brass-framed case | pulsing lid seam light |

Elites wear a gold emissive halo ring. Enemy bolts are spheres with a white-hot core in magenta `#ff2e88` / amber `#ffa23a`; with "Projectile outline" on they also get a black back-face shell so they read on any background.

**Palette (named).**
| Name | Hex | Role |
|---|---|---|
| Obsidian | `#07080c` | floor, panel glass, page background |
| Visor phosphor | `#cfe9ea` | all HUD text and hairlines, hull bar |
| Wick cyan | `#35f2ff` | player, Reserve and Bulwark Field |
| Essence green | `#59ffb5` | XP, motes, Siphon |
| Signal magenta | `#ff2e88` | enemy fire, damage, low hull, boss |
| Salvage brass | `#d9a441` | upgrade rig hardware, Shards, primary buttons |

Enemy identity colours stay as in 5.5. Gold `#ffd24a` is used only for Shard crystals in the world.

**Typefaces** (bundled with `@fontsource`, SIL OFL, latin subset, no CDN).
- *Chakra Petch* 600/700: display. Title, screen headings, card names, the run timer, stencilled rig slot numbers. Its cut corners match machined salvage.
- *IBM Plex Sans* 400/600: everything people read. Descriptions, buttons, HUD labels, settings.
- *IBM Plex Mono* 500: numerals only. HUD values, costs, summary figures. Never for words.

**Principles.**
1. Readability beats realism. Telegraphs and enemy fire are the brightest non-player things on screen; armour stays dark; the floor never outshines a bolt.
2. One bold place: the upgrade rig. Everything else is quiet glass and hairlines.
3. The equipment is worn: one crack in a visor corner, scuffed brass, tape labels. Wear never crosses the play area.
4. Plain sentence-case copy. Buttons say what they do. No decorative arrows or eyebrow labels.

## 13. Animation and VFX (particle budgets)

- Particle pool 700 max (hard), scaled by quality (Low 40 %, Medium 70 %, High 100 %). Base budgets: enemy hit 3, kill 8 (elite 20), pickup 2, detonation 60 (reduced flash 30), field absorb 4, level-up 40, death 80, boss death 150. In 3D particles are pooled instanced debris: flat-shaded shards with height, gravity, a bounce on the floor and spin, tinted with the victim's colour and glowing as they cool.
- Number pops pooled (40), 0.7 s rise and fade, projected from world to screen and drawn on the visor layer in Plex Mono with a dark edge.
- Hit flash: the enemy's armour pulses white-hot emissive for 0.08 s. Screen shake: trauma decaying 3/s, camera offset `trauma²·12` units; disabled by setting and off by default under `prefers-reduced-motion`.
- Detonation: an expanding floor shockwave ring (HDR magenta, then white), a point-light flash, and a screen-space ripple pass that refracts the image in a band at the wavefront (skipped with reduced flash or on Low).
- Field: a translucent dome with a fresnel rim, scrolling hex cells and a floor ring; it brightens for each absorbed bolt. Hold shows a brass dashed ring on the floor.
- Beams and arcs: Lance Beam is a white-hot ribbon; Chain Arc is a jagged violet ribbon re-jittered every frame.
- Telegraphs on the floor as emissive decals: spitter aim line (grows and brightens), rammer dash lane (amber chevrons), caster target ring, void pool warning ring, lane hazard stripes, boss ring-burst glow and charge lane.
- Void pools: animated shader decal (swirling violet noise, bright rim, grows 44 to 78). Lanes: animated hazard-stripe shader, dim while warning and white-hot while live.
- Reduced flash option: no full-screen flashes, bloom strength halved, no ripple pass, damped bursts, no strobing vignette.

## 14. Sound design and music

Web Audio synthesis only, created after the first user gesture (resume on pointer/key). Voices capped at 14 simultaneous (oldest dropped). Sounds: pulse shot (short saw blip with pitch drop), hit tick, kill blip (pitch rises with kill chain), mote pickup (tiny sine), shard pickup (two-note), level-up chime (arpeggio), player hurt (noise + low square), field absorb, field break, detonation (low sweep + noise), boss warning (siren sweep), boss kill fanfare, menu click. Music: a looping generative bass + arpeggio + hat pattern (sequenced with a lookahead scheduler), tempo 118 + 2·wave BPM, quiet by default, ducked on the level-up screen. Settings: master volume slider, mute (M), both persisted.

## 15. Menus and in-game UI

Functional content is unchanged from v1; the presentation is redesigned as Wick's equipment.

- **Menu (launch console):** the live 3D arena idles behind it (slow orbit). A left-anchored console panel with the title in Chakra Petch, the tagline, a best-run line written as a sentence ("Longest run 07:12, 318 kills, wave 8."), Shards with a brass crystal glyph, arena radio buttons, and buttons *Start run*, *Open the Vault*, *Settings*, *How to play*. Visible focus rings (`:focus-visible` 3 px brass outline, offset 3 px).
- **HUD (visor, 2D overlay canvas above the 3D view):** corner-anchored and thin so the centre stays clear. Hull bar (phosphor, magenta under 30 %) with value, Essence bar with level, Reserve bar (only with Siphon) whose label states the field ("Field up", "Holding", "Charging"), timer and wave top-centre, kills and kill chain top-right, boss bar with a 50 % phase notch, module rack bottom-left (glyph slots with level ticks), synergy labels bottom-centre, keycap hints for E and Q once Detonation is owned. The visor rim darkens the extreme corners and one hairline crack sits in the top-right corner, outside the play focus.
- **Upgrade choice screen (the salvage rig, modal):** the one bold screen. Three cartridges slot into a brass-and-gunmetal rig. Each cartridge: a big stencilled slot number (the key to press), name in Chakra Petch, a casing label for its kind, level ticks (owned filled, the new one lit), the one-line effect in Plex Sans, and, if it completes a synergy, a strip of tape reading "Completes Bladed Field". Signature modules (Siphon, Bulwark Field, Detonation) get a taller brass casing; weapons gunmetal; passives plain steel; fillers a taped scrap casing. Reroll button "Reroll the rig (4), 2 left". Pauses the sim.
- **Pause:** Resume, Restart run, Settings, Quit to menu.
- **Run summary (salvage report):** a debrief sheet. Title "Wick recovered" (win) or "Signal lost" (defeat) plus one plain sentence; the rating letter as an ink stamp; a figures table (time, wave, kills, damage, level, wardens, best chain, detonations, score); kills by enemy type as a tally list; modules taken in pick order; Shards as an itemised receipt with a total line; new bests marked inline beside the figure. Buttons *Play again (R)*, *Open the Vault*, *Back to menu*.
- **Vault (guild locker):** a list of locker rows, not a card grid: name, description, tier ticks, and a button that says the price ("Buy for 40 Shards", "Owned", "Maxed"), disabled when unaffordable. Shard balance in the header.
- **How to play:** 6 short bullet points.

**Wireframes.**

HUD (16:9, sizes scale with the viewport):
```
+------------------------------------------------------------------+
| Hull    [||||||||||||||||    ] 84        12:41           412 kills|
| Essence [||||||       ] Lv 7            Wave 13       Chain x18   |
| Charging[|||||||||||:::::] 96 / 150                           /\  |
|                                                         crack / \ |
|                 Core Warden, tier 2                               |
|            [=========================|============]               |
|                                                                   |
|                            (play area)                            |
|                                                                   |
|                                                                   |
| [P] [O] [V] [B] [D]           Bladed Field   Leech Arc            |
|  ''   '   ''  '   '                                               |
| (E) Release   (Q) Hold                                            |
+------------------------------------------------------------------+
```

Upgrade rig (desktop; stacks to one column under 720 px):
```
+--------------------------- salvage rig ---------------------------+
|  Level 7                                                          |
|  Wick has Essence to spare. Slot one module.                      |
|                                                                   |
|  +==================+  +-----------------+  +-----------------+   |
|  | 1                |  | 2               |  | 3               |   |
|  |   Bulwark Field  |  |   Orbit Blades  |  |   Vitality      |   |
|  |   Signature core |  |   Weapon        |  |   Passive       |   |
|  |   [#][ ][ ]      |  |   [#][#][*][ ][ ]  |   [*][ ][ ][ ][ ]   |
|  |   Raises a shield|  |   4 blades,     |  |   +20 max hull  |   |
|  |   ring that eats |  |   radius 64...  |  |   and heal 20.  |   |
|  |   enemy bolts... |  |                 |  |                 |   |
|  |  [tape: Completes|  |                 |  |                 |   |
|  |   Bladed Field]  |  |                 |  |                 |   |
|  +==================+  +-----------------+  +-----------------+   |
|                                                                   |
|                 [ Reroll the rig (4), 2 left ]                    |
+-------------------------------------------------------------------+
```

**Design review (pass b) and revisions made before coding.**
1. *First draft:* neon glow borders on every panel. *Generic*; neon belongs to the world. *Revised:* panels are dark glass with a 1 px phosphor hairline and machined 2 px corners; glow appears only in 3D.
2. *First draft:* a cracked-glass texture over the whole HUD. *Hurts readability in heavy combat. Revised:* one crack confined to the top-right corner at low opacity plus a soft rim vignette.
3. *First draft:* all labels in stencil capitals with letter-spacing. *An eyebrow-label tell. Revised:* sentence case everywhere; stencil style is kept only for the rig slot numerals, where it means "press this key".
4. *First draft:* three identical rounded cards with soft shadows and a tag line "weapon · homing". *Revised:* casings differ by kind (brass core, gunmetal, steel, taped scrap), level ticks replace "Lv 2 → 3", and the tag line becomes one casing label.
5. *First draft:* Plex Mono for every small label. *Revised:* mono only for numbers.
6. *First draft:* menu best line "Best 07:12 · 318 kills · wave 8". *Revised:* a plain sentence.
7. *First draft:* summary title "RUN OVER" with the word "OVER" in magenta. *Accent-one-word tell. Revised:* "Signal lost" in one colour; the stamp carries the emphasis.

## 16. Accessibility and settings

Settings (persisted): master volume, mute, screen shake on/off, reduced flash on/off, enemy projectile outline on/off, aim mode (auto/mouse/move), damage numbers on/off, **graphics quality** (Auto/Low/Medium/High). Quality sets pixel ratio (Low 0.75, Medium up to 1.25, High up to 2), bloom (off / tight / wide), dynamic lights (1/4/8), particle budget (40/70/100 %) and reflections (env only / env / planar). Auto picks a level from the GPU and device class at start and steps down once if the run averages under 45 fps. Defaults honour `prefers-reduced-motion` (shake off, reduced flash on). All controls are real `<button>`/`<input>` elements with labels, `aria-live` polite region announcing level-ups, waves and boss warnings, focus trapped in modals and restored after. Colour is never the only channel: enemy shape and telegraph shape carry meaning; enemy bullets have an outline option. Touch targets ≥ 44 px.

## 17. Technical architecture

TypeScript + Vite. Dependencies: `three 0.170.0` (+ `@types/three 0.170.0`), `@fontsource/chakra-petch`, `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono` (bundled locally), `typescript 5.6.3`, `vite 5.4.11`. Layout:

```
source/void-survivor/
  index.html  package.json  tsconfig.json  vite.config.ts
  scripts/check-sim.ts            # headless tests (node --experimental-strip-types)
  src/main.ts                     # bootstrap, loop, input, screen routing
  src/rng.ts                      # seeded mulberry32
  src/sim/{types,pool,hash,entities,enemies,waves,world,bot}.ts   # pure, no DOM
  src/upgrades/{data,rules}.ts    # pure
  src/meta/unlocks.ts             # pure
  src/storage/save.ts             # localStorage wrapper
  src/audio/sound.ts
  src/render/{renderer,fx}.ts     # renderer.ts = Canvas 2D fallback
  src/render/three/*.ts           # WebGL renderer: scene, models, materials, instancing, post
  src/render/hud.ts               # visor HUD, shared by both renderers
  src/render/quality.ts           # quality presets and auto-detect
  src/ui/ui.ts
  src/styles.css
```
- **Fixed step:** accumulator at 1/60 s, frame delta clamped to 50 ms, max 5 steps/frame; rendering interpolates nothing (positions are small steps) and just draws the latest state.
- **Pure sim:** `createWorld(seed, meta)`, `step(world, input)`, events are pushed to `world.events` (capped at 600) and drained by the host. `world.rng` drives gameplay; no `Math.random` in the sim or upgrade modules. Visual FX use a separate non-deterministic RNG.
- **Entity pools:** enemies, bullets (player and enemy share one pool with `friendly` flag), hazards, pickups, particles, number pops. Swap-removal with free lists; no per-frame allocation in hot loops except short arrays.
- **Spatial hash:** uniform grid, cell 96, rebuilt each tick from live enemies; used for bullets, blades, field, detonation, separation.
- **Upgrade data schema:**
```ts
interface UpgradeDef { id: UpgradeId; name: string; kind: 'weapon'|'passive'|'signature'|'filler';
  maxLevel: number; weight: number; rare?: boolean; requires?: Partial<Record<UpgradeId, number>>;
  unlock?: string; desc(level:number): string; tags: string[]; defensive?: boolean }
```
- **Choice rules** (`rollChoices`): candidates = not-maxed ∧ requirements met ∧ unlocked in Vault ∧ weapon-slot ok; weight × 1.5 if already owned (focus), × (1 + luck) if rare, × 2.5 if it is the missing link of an owned chain (Siphon owned → Bulwark; Bulwark owned → Detonation), × 2 if it completes a synergy; pity: ensure ≥ 1 weapon option in the first 3 level-ups if no extra weapon owned; ensure ≥ 1 defensive option when HP < 50 % or the last 4 picks had none; Repair gets weight when HP < 60 %. If fewer than 3 candidates, fillers (Overcharge, Repair, Shard Cache) pad the list. Chest choices triple the weight of rare cards. Reroll excludes the previous three when possible.

## 18. Performance requirements

- 60 FPS on a mid laptop at 1080p with 160 enemies, 140 player bullets, 160 enemy bullets, 700 particles. Frame budget 16 ms: sim ≤ 4 ms, render ≤ 8 ms.
- Draw only entities within the viewport; no `shadowBlur`; pre-rendered glow sprites; canvas DPR capped at 2; HUD drawn once per frame without layout thrash; DOM touched only on screen changes.
- Headless sim test must run 1200 s of sim in a few seconds.

## 19. Asset creation and licensing

No external images or audio. Fonts are open-licensed (SIL OFL) files bundled from `@fontsource` into the build; nothing loads from a CDN. All 3D models are built from Three.js primitives and procedural canvas textures; UI is CSS; all sound is synthesised in-browser; the favicon is an inline SVG data URI. Everything is original and released with the repository. The optional `poster.png` is a real screenshot of the game.

## 20. Save and persistence behaviour

`localStorage` key `void-survivor:v1`, JSON: `{ v:1, shards, owned:{id:tier}, best:{time,kills,wave,score,level}, stats:{runs,wins,kills,deaths,bosses,playtime}, settings:{...}, arena }`. Every read and write is wrapped in try/catch; invalid or corrupted JSON, wrong version or wrong types fall back to defaults field by field. Writes happen at run end, on purchase and on settings change. Private-mode failures are silent and the game keeps working with in-memory state.

## 21. Error handling and browser compatibility

Targets: current Chrome, Edge, Firefox, Safari (ES2020 output). `AudioContext` is optional (`webkitAudioContext` fallback, silent if absent). If WebGL cannot start, the game falls back to the Canvas 2D renderer and says so in a dismissible notice; if Canvas 2D also fails it shows a plain message. WebGL context loss pauses the run, shows a notice, and resumes rendering on restore. Arena geometry is disposed and rebuilt on restart when the arena changes, and all GPU resources are disposed on teardown. Window resize/orientation changes recompute the canvas; `visibilitychange` pauses. Uncaught exceptions in the frame loop are caught, reported once in a banner, and the loop stops cleanly (no repeated console errors). No `alert`. No leftover placeholder or TODO text.

## 22. Testing strategy

`node --experimental-strip-types scripts/check-sim.ts` (no framework; assertions throw, exit code 1 on failure). Required headless checks:
1. **Upgrade interaction chain:** Siphon gain per level; Reserve cap; field radius/drain formulas; manual release damage scales monotonically with `spent`; break-triggered detonation fires once; Void Reactor refund.
2. **Choice generation:** across 2000 randomized states (owned sets, HP, luck, unlock sets, maxed upgrades) `rollChoices` returns exactly 3 distinct valid cards; never offers Bulwark without Siphon or Detonation without Bulwark; slot limit respected; pity rules satisfied.
3. **Determinism:** two worlds with the same seed and the same scripted bot input are byte-identical (JSON hash of key state) after N=3600 ticks; a different seed differs.
4. **Wave fairness:** budget monotonic, growth ≤ 35 %/wave, wave 1 ≤ 3/s, unlock waves exact, and a worst-case spawner simulation where nothing ever dies for 1200 s never exceeds the live cap.
5. **Run smoke:** a bot-driven run for 1200 s of sim finishes with a state in `won|dead|playing`, without exceptions or NaN positions, pools within caps.
6. **Save fallback:** `parseSave` of garbage returns defaults.
Also run `npm run typecheck`, `npm run build`, and a browser pass: menu, start, movement, enemies, level-up screen, no console errors.

## 23. Gaming hub integration

- `playUrl`: `./games/void-survivor/`; title VOID SURVIVOR; accent `pink`; genre tags: roguelite, survivor, action, arcade, upgrades; controls table from section 8; tech list: TypeScript, Vite, Three.js (WebGL2), Canvas 2D fallback, Web Audio, localStorage.
- Hub changes are made by the lead, not by this module.

## 24. GitHub Pages deployment requirements

Vite `base: './'`; `build.outDir: '../../games/void-survivor'`, `emptyOutDir: true`, `target: 'es2020'`, `assetsInlineLimit: 0`. Pages serves the repo root, so the built output (committed by the lead) must contain `games/void-survivor/index.html` and `assets/`. All asset URLs relative. `index.html` redirects visitors on `github.io` from `/source/void-survivor/` to `/games/void-survivor/`.

## 25. Definition of done

- [ ] Spec file written before code
- [ ] 6 enemy kinds + boss with telegraphs, behaviours as specified
- [ ] Siphon, Bulwark Field, Detonation implemented with exact rules, plus 5+ weapon/passive upgrades and 4+ synergies
- [ ] Choice screen always shows 3 valid cards; reroll works; chest choices work
- [ ] Waves, budget, cap, bosses at 5/10/15 min plus final boss; win and defeat states
- [ ] Shards, Vault unlocks, personal bests persisted with corrupted-save fallback
- [ ] Audio synth with mute/volume; settings incl. reduced flash, shake, outline
- [ ] Summary screen with all required stats and rating
- [ ] Touch controls, responsive canvas, focus rings, pause, restart
- [ ] Headless tests pass, typecheck and build pass, preview checked in a browser with no console errors
- [ ] Output in `games/void-survivor/`

## 26. Final reporting requirements

Report: status (COMPLETE/PARTIAL/BLOCKED), exact commands run with real results, browser checks performed and not performed, console errors observed, poster status, files created, hub entry facts (playUrl, title, tagline, 2-sentence description, genre tags, controls, tech, accent). Never claim a check that was not run.
