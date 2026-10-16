# GHOST SIGNAL — Implementation Prompt

You are building **GHOST SIGNAL**, a cyberpunk detective thriller, as a static browser game for the NEON ARCADE gaming hub. This document is a standalone implementation prompt. Follow it literally. All story data, rules and state live in pure TypeScript modules that run without a DOM, so the deduction logic can be verified by a script.

---

## 1. Game identity and creative vision

- **Title:** GHOST SIGNAL. **Tagline:** "Memories can lie. Timestamps can't. Rebuild the night."
- **Pitch:** in the rain-soaked city of Kestrel Bay, people sell their recorded "memory feeds". You are a city investigator who reconstructs a contested death from conflicting memory fragments, witness testimony and physical evidence, then places the fragments on a reconstruction timeline. The game detects contradictions with explicit rules. A forged memory — a **ghost signal** — is hiding in the pile.
- **Mood:** wet, hushed, tired, precise. Cinematic and information-rich: a case file you can almost smell.
- **Palette:** abyss `#050b14`, deep teal `#0b1f2a`, rain blue `#12394a`, ink `#0a1822`, cyan `#5ff3ff` (information), magenta `#ff3fa4` (contradiction / danger), amber `#ffb347` (the single warm contrast, used for verdicts). Hub accent: **purple** is NOT used; the hub accent for this game is **cyan**.
- **Originality rule:** no names, characters, layouts or art from existing detective, cyberpunk or noir games and films. All art is procedural Canvas 2D; all text is original.

## 2. Original gameplay concept

The player investigates one case over three chapters ("nights") by visiting locations, examining and collecting evidence, interviewing people with branching dialogue, and building a **Reconstruction**: a six-slot timeline of the incident night where each slot is filled with exactly one memory fragment. The engine continuously detects contradictions among every collected source using seven deterministic rules. A forged fragment is exposed by contradictions with hard evidence, never by luck. At the end the player files a **Conclusion** (culprit, mechanism, motive, and the supporting sources) which is checked against the story state. Five endings exist; one is canonical.

## 3. Genre and target experience

- Genre: investigative deduction / narrative detective. Single player, 60–90 minutes for a first full solve, 15–25 minutes per replay.
- Desktop first, keyboard-complete; phone width works (case board stacks vertically).
- The player should feel clever when a contradiction snaps into place, and uneasy about the decisions they made along the way.

## 4. Original story and worldbuilding

**Kestrel Bay**, 2091. A tidal city of stacked districts under constant rain. Everyone with a neural **lace** records a continuous **memory feed**. Feeds are stored, traded and insured at **memory exchanges**. Cut fragments carry a timestamp, a location tag and **sensory tags** (light, sound, smell). Corrupted or edited fragments are called **ghost signals**: a forgery usually gets the senses right and the physics wrong.

**The incident.** On the night of 3 November, **Dr. Anselm Roque**, 61, co-founder of the **Halcyon Memory Exchange** in the Undertow district, is found dead in the Cold Vault (basement level B2) beside a burned feed rig. The scene reads as self-inflicted: a cascade overload during the district blackout. The exchange's quiet fixers push for a fast ruling because the **Corvane Biotech** acquisition of Halcyon's archive closes at the end of the week.

**What really happened (the full solution is in section 11).** Roque had secretly sold the last recorded memory of apprentice archivist **Linnea Voss's** mother to Corvane's "Echo Ward" companion program. Voss found out, pulled the vault's surge-protector fuse, and waited. The district substation cut power at 23:40. When power returned at 23:46 the restore spike hit the unprotected rig while Roque was jacked in. He died at 23:46, not when the lights went out. Voss exited through the loading dock with a key Brisk left in the dock console, and supplied herself an alibi with a forged feed that "remembers" the neon light of a street sign that was dead at the time and even mentions the spike before it happened.

**Tone of the city.** Rain on every window. Static on every sign. People speak in clipped sentences.

## 5. Player character and relevant entities

**Inspector Noor Halvard, 43.** Bureau of Recorded Events (BRE). Former memory auditor who lost three weeks of her own memory in the Dredge Riots and keeps a paper note in her coat that reads GAP. Voice: dry, terse, notes the time like other people notice weather. Example: "Timestamp first. Feelings are cheaper." She narrates short observations in the examine texts. She is the only player-controlled entity; she has no stats.

**Suspects and witnesses (ids):**
- `quill` **Mara Quill**, 52, Roque's business partner. Lies about going home. Secretly met a Corvane broker at the Sump Lantern bar. Strong financial motive. **Red herring.**
- `brisk` **Teodor Brisk**, 47, night security chief. Disabled the B2 camera for 15 minutes to wave a smuggler's runner through the dock and lies about being in the booth. Left the dock-key in the dock console. **Red herring** (guilty of something else).
- `voss` **Linnea Voss**, 29, Roque's apprentice archivist. **The culprit.**
- `pell` **Ottoline Pell**, 61, night cleaner. Honest witness; heard the argument in the B2 corridor. Accessible and sometimes a suspect on paper.
- `roque` **Dr. Anselm Roque**: the victim. Not interviewable. His last feed is evidence.

**Evidence types:** `log` (machine records, hard), `physical` (objects, hard), `forensic` (lab, hard), `document` (hard), `fragment` (memory feed, soft: may be authentic or forged), `testimony` (spoken statement, soft).

**Hard** sources are authoritative. **Soft** sources can be wrong or lying.

**Locations (6):** `lobby` Halcyon Lobby (ground), `office` Roque's Office (L3), `vault` the Cold Vault (B2, crime scene), `annex` Archive Annex (L2), `dock` Loading Dock (rear, ground), `bar` The Sump Lantern (street, outside). The pseudo-location `home` exists only as a claim target. `building` is a scope that covers lobby, office, vault, annex, dock.

**Travel times (minutes, symmetric):** lobby-office 3, lobby-vault 4, lobby-annex 2, lobby-dock 3, office-vault 5, office-annex 3, office-dock 6, annex-vault 4, annex-dock 4, vault-dock 3; bar to any building location 12; home to any building location 25; home-bar 15. Same location: 0.

## 6. Core gameplay loop

1. Read the chapter briefing. 2. Travel between unlocked locations. 3. Examine hotspots; collect evidence and fragments; interview people. 4. Contradictions surface automatically in the Contradictions panel with a notification. 5. Link clues on the Case Board. 6. Place fragments into Reconstruction slots. 7. When the chapter goals are met, **Close the Day** to unlock the next chapter. 8. In chapter 3, file the Conclusion and receive an ending. 9. Replay with different decisions.

## 7. Signature mechanic: Reconstruction

The **Reconstruction board** has six ordered slots, each with a time window:

| Slot | Window | Name |
|---|---|---|
| s1 | 22:00–23:00 | The Quarrel |
| s2 | 23:00–23:20 | Quiet Hours |
| s3 | 23:20–23:38 | The Vault Argument |
| s4 | 23:38–23:46 | Blackout |
| s5 | 23:46–23:56 | The Restore |
| s6 | 23:56–00:15 | Discovery |

A fragment can be placed only in the slot whose window contains the fragment's timestamp (windows are half-open `[from,to)`). Each slot holds one fragment. Placing, replacing and clearing is free. After every change the engine evaluates the board: **the placed fragments plus every collected hard source** are tested with all contradiction rules, and each slot shows ok / conflict / empty. Slots s3–s6 are **key slots**. A reconstruction is **valid** when every key slot holds one of its accepted fragments and the board has zero active contradictions.

Accepted fragments: s3 `f-pell-corridor`; s4 `f-roque-last`; s5 `f-pell-lobby`; s6 `f-brisk-discovery`. Slots s1 and s2 are optional but anything placed there must not conflict.

## 8. Controls and input behavior

- Mouse: click hotspots, tabs, cards, buttons. Click-to-select then click-slot (no drag required; drag and drop of fragment cards onto slots is an optional extra).
- Keyboard: `Tab`/`Shift+Tab` through every interactive element in DOM order; `Enter`/`Space` activate; `Esc` closes the topmost panel/modal; `1`–`6` switch main tabs (Scene, Log, Board, Reconstruct, Contradictions, Conclude); `M` toggles mute; `?` opens help; arrow keys move between hotspots in the Scene (optional).
- Focus rings are always visible (2px cyan outline plus offset). Hotspots are real `<button>` elements positioned over the canvas.
- All state changes are announced through an `aria-live="polite"` region.

## 9. Investigation and deduction rules

### 9.1 Claim model
Every source has a list of **claims**. A claim is one of:
- `at` — person at a location during `[from,to]` minutes.
- `holds` — person holds an exclusive item during `[from,to]`.
- `light` — a place (location or `building`) is lit or dark during `[from,to]`.
- `heard` — a sound (`alarm`, `voices`) heard at a location at minute `at`.
- `mute` — a sound is known NOT to have been possible at a place during `[from,to]` (hard sources only).
- `event` — a named event (`blackout`, `restore`, `death`) occurred at minute `at`.
- `ref` — the source speaks about a named event as already having happened.
Times are minutes since midnight; after midnight add 1440 (00:05 = 1445).

### 9.2 Contradiction rules (all deterministic)
Two sources A and B are examined pairwise; at most one contradiction per (rule, A, B, claim indices). Applies only to collected sources.
- **R1 DOUBLE-BOOKED:** same person, `at` intervals overlap (closed intervals), different locations.
- **R2 IMPOSSIBLE TRAVEL:** same person, non-overlapping `at` claims; the gap between the earlier `to` and the later `from` is less than the travel time between the two locations.
- **R3 LIGHT CLASH:** `light` claims overlap in time, the scopes intersect (same location, or one is `building` and the other is a building location), and `lit` differs.
- **R4 CLOCK CLASH:** two `event` claims with the same event differ by more than 1 minute.
- **R5 SOUND IMPOSSIBLE:** a `heard` claim whose time lies inside a `mute` interval for the same sound at an intersecting scope.
- **R6 ANACHRONISM:** a source with a timestamp makes a `ref` claim to an event whose time (from any collected hard `event` claim) is later than the source timestamp. The fragment remembers something that had not happened yet. Only fragments (with timestamp) are tested.
- **R7 EXCLUSIVE ITEM:** two `holds` claims on the same item, different persons, overlapping intervals, OR the same person claims `holds` while a different person's claim overlaps (same rule).
**Severity / verdict:** if exactly one side is hard, the soft side is **refuted**. If both are soft, the pair is **disputed**. If both are hard the case data is invalid (the check script asserts this never happens). A contradiction is **resolved** when either side is a testimony that has been retracted (`retractedBy` statement heard); resolved contradictions are listed but dimmed and do not count against the board. Ids are deterministic: `rule|A|B|i|j`.

### 9.3 Valid conclusion
A **Conclusion** has `culprit` (`quill|brisk|voss|pell|none`), `mechanism` (`self-overload|sabotage-restore|blackout-strike`), `motive` (`inheritance-money|cover-smuggling|stolen-grief|despair`), and `support`: up to 6 collected source ids. The Magistrate's Check evaluates, with no randomness:
1. **Answers:** culprit `voss`, mechanism `sabotage-restore`, motive `stolen-grief`.
2. **Proof:** for each of culprit / mechanism / motive there are alternative proof sets (section 11.6). A field is **proven** when at least one proof set is a subset of `support`.
3. **Board:** the Reconstruction is valid (section 7).
4. **Lawfulness:** the ledger was not obtained by the illegal bleed.
Ending mapping is in section 10.

## 10. Progression and case structure

Three chapters ("nights"):
1. **Dead Air** — lobby, office, vault. Scene of death, first statements.
2. **Ghost Signal** — annex and dock open. The black box is back from the lab. **Mid-case revelations.**
3. **The Reconstruction** — the bar opens; lab reads Roque's last feed; warrants arrive. File the Conclusion.

**Chapter goals** (Close the Day is enabled when all are done):
- Ch1: collect `ev-door-log`, `ev-power-log`, `ev-rig-burn`, `ev-fuse`, `ev-b2-gap`; hear `t-quill-1` and `t-brisk-1`; resolve decision D1 (Brisk).
- Ch2: collect `ev-rig-blackbox`, `ev-annex-sign`, `f-voss-annex`; hear `t-voss-1`; see the Ghost revelation.
- Ch3: no goals; the Conclude tab becomes submittable.

**Revelations (cinematic panels):** `rev-restore` fires when `ev-rig-blackbox` is collected: "He did not die when the lights went out. He died when they came back." `rev-ghost` fires the first time a contradiction involving `f-voss-annex` and a hard source exists: "Her memory is lit by a sign that was dead. Linnea Voss is carrying a ghost signal."

**Decisions with consequences:**
- **D1 Brisk** (`friendly` / `pressured`): After finding `ev-b2-gap`, ask Brisk about the camera. *Friendly* (offer to keep his side job off the record): he confesses, hands over the booth-terminal key; booth logs and dock camera are available in chapter 2. *Pressured*: he confesses at once but locks the terminal; the logs and dock camera only arrive with the warrant in chapter 3. The epilogue records whether you kept your promise.
- **D2 Ledger** (`subpoena` / `bleed`): At Roque's safe in chapter 2: bleed it with a black-market decrypt now (illegal, instant) or file a subpoena (lawful, arrives chapter 3). A bled ledger is **tainted**: a correct accusation then ends as `burned-evidence`.
- **D3 Echo** (`return` / `seal` / `release`): requires `ev-ledger`. At the Conclusion, decide what happens to the recovered memory `f-mother`. Flavors the epilogue.
- Minor tracked choices: how you treat Pell (`pellTrust`), Quill (`quillAdmitted`), whether Voss is confronted (`vossShaken`, `vossAdmitted`).

**Endings (5, all reachable, tracked in persistence):**
1. `clean-signal` **CANONICAL**: culprit/mechanism/motive correct, proven, board valid, ledger lawful.
2. `burned-evidence`: all of the above but the ledger was bled; Voss walks on a technicality.
3. `ghost-remains` (half-truth): Voss accused but wrong mechanism or motive, unproven fields, or an invalid board: the case collapses and the ghost signal stays loose.
4. `wrong-hand`: Quill, Brisk or Pell accused; the innocent person is charged; the epilogue names who and what it cost.
5. `quiet-closure`: culprit `none` (the self-inflicted ruling); Corvane closes the deal and the exchange's archive is sold.

Replayability: different decisions, three alternative proofs for the culprit, two for the mechanism, mistakes to explore, and an Endings gallery (x/5) that persists across new cases.

## 11. Scene and mystery design (complete)

### 11.1 Times (minutes) of the true night
21:58 Voss in via front door. 22:10 Quill in. 22:15–22:34 Quill and Roque argue in the office. 22:38 Quill leaves by the front door. 23:05 Quill pays at the Sump Lantern (stays until after midnight). 23:05–23:15 Brisk in the lobby booth. 23:12 Voss badges into the vault. ~23:15–23:30 Voss pulls the protector fuse. 23:20–23:35 Brisk patches the B2 camera loop from the dock console and leaves the dock-key there. 23:25–23:31 Pell mops the B2 corridor and hears Voss and Roque argue (23:28–23:31). 23:36 Pell goes to the lobby; 23:38 Brisk back in the lobby. 23:40 blackout. 23:40–23:46 Voss stands over Roque in the dark. 23:46 power restored; surge; Roque dies. 23:47 Voss leaves the vault. 23:49 Voss takes the dock-key. 23:50 Voss exits through the dock (badge/key log, dock camera). 23:56 Brisk finds Roque; 23:58 alarm raised.

### 11.2 Locations and hotspots
Each hotspot has a position on the scene canvas (percent), a kind, an examine text, and an availability rule.

**Lobby** (ch1+): `hs-door-ledger` → `ev-door-log`; `hs-relay` → `ev-power-log`; `hs-booth-recorder` → `f-brisk-booth`; `hs-booth-loop` → `ev-loop-log` (terminal; gate G-BOOTH); `hs-booth-badge` → `ev-badge-log` (gate G-BOOTH); `npc-brisk` (talk); `npc-pell` (talk).
**Office** (ch1+): `hs-cradle` → `f-quill-office`; `hs-wire` → `ev-corvane-wire`; `hs-safe` → `ev-ledger` / decision D2; `hs-photo` lore; `npc-quill` (talk, ch1–2).
**Vault** (ch1+): `hs-rig` → `ev-rig-burn`; `hs-fuse` → `ev-fuse`; `hs-b2-cam` → `ev-b2-gap`; `hs-blackbox` → `ev-rig-blackbox` (ch2+); `hs-roque-reader` → `f-roque-last` (ch3); `hs-chalk` lore.
**Annex** (ch2+): `npc-voss` (talk); `hs-annex-sign` → `ev-annex-sign`; `hs-locker` → `ev-annex-locker`.
**Dock** (ch2+): `hs-dock-cam` → `ev-dock-cam` (gate G-BOOTH); `hs-dock-console` lore.
**Bar** (ch3): `npc-quill-bar` (talk, same tree as Quill); `hs-receipt` → `ev-quill-receipt`.

**Gate G-BOOTH:** open when `decisions.brisk == friendly` and chapter ≥ 2 (the audit window opens on night two), or chapter ≥ 3 (warrant). Otherwise the hotspot is locked and says why.

### 11.3 Sources (hard evidence)
| id | where | claims |
|---|---|---|
| `ev-door-log` | lobby | at quill lobby 22:10–22:12; at quill lobby 22:38–22:40; at voss lobby 21:58–22:00 |
| `ev-power-log` | lobby | event blackout 23:40; event restore 23:46; light building dark 23:40–23:46; mute alarm building 23:40–23:46 |
| `ev-rig-burn` | vault | none (surge-type burn, not a self-induced load) |
| `ev-fuse` | vault | none (protector fuse replaced by a dummy slug within the hour; fuse-puller scratch) |
| `ev-b2-gap` | vault | none (B2 camera hole 23:20–23:35) |
| `ev-rig-blackbox` | vault ch2 | event death 23:46 |
| `ev-corvane-wire` | office | none (conditional 2.4M wire to Quill) |
| `ev-ledger` | office safe | none (item 2207: Voss M-9114, sold to Corvane Echo Ward) |
| `ev-annex-sign` | annex ch2 | light annex dark 23:40–23:46 |
| `ev-annex-locker` | annex ch2 | none (fuse puller missing from Voss's tool roll) |
| `ev-loop-log` | booth | at brisk dock 23:20–23:35; holds brisk dock-key 23:20–23:35 |
| `ev-badge-log` | booth | at voss vault 23:12–23:14; at voss dock 23:50–23:51; holds voss dock-key 23:49–23:51 |
| `ev-dock-cam` | dock | at voss dock 23:50–23:53 |
| `ev-quill-receipt` | bar ch3 | at quill bar 23:05–23:06; at quill bar 00:01–00:02 |

### 11.4 Fragments (soft)
| id | owner | ts | loc | claims | authentic |
|---|---|---|---|---|---|
| `f-quill-office` | quill | 22:30 | office | at quill office 22:15–22:34; light office lit 22:30–22:31 | yes |
| `f-quill-bar` | quill | 23:05 | bar | at quill bar 22:58–23:20 | yes |
| `f-brisk-booth` | brisk | 23:10 | lobby | at brisk lobby 23:05–23:15; light lobby lit 23:10–23:11 | yes |
| `f-pell-corridor` | pell | 23:30 | vault | at pell vault 23:25–23:31; at voss vault 23:28–23:31; heard voices vault 23:29 | yes |
| `f-voss-annex` | voss | 23:41 | annex | at voss annex 23:30–23:55; light annex lit 23:41–23:42; ref restore | **FORGED** |
| `f-roque-last` | roque | 23:44 | vault | at voss vault 23:40–23:46; light vault dark 23:44–23:45; ref blackout | yes |
| `f-pell-lobby` | pell | 23:49 | lobby | at pell lobby 23:36–23:50; at brisk lobby 23:38–23:50; light lobby lit 23:49–23:50; ref blackout; ref restore | yes |
| `f-brisk-discovery` | brisk | 23:58 | vault | at brisk vault 23:56–00:05; light vault lit 23:58–23:59; ref restore; ref death | yes |
| `f-mother` | voss | none | — | none (sealed keepsake; cannot be placed) | yes |

### 11.5 Testimonies (soft, recorded when heard)
| id | who | claims | note |
|---|---|---|---|
| `t-quill-1` | quill | at quill home 22:45–24:00 | lie (R2 vs door ledger); retracted by `t-quill-2` |
| `t-quill-2` | quill | at quill bar 23:00–24:00 | the truth |
| `t-quill-3` | quill | none | "He stopped letting Linnea into the ledger room." |
| `t-brisk-1` | brisk | at brisk lobby 22:00–23:38; holds brisk dock-key 22:00–23:59 | lie; retracted by `t-brisk-3` |
| `t-brisk-2` | brisk | heard alarm lobby 23:42; event death 23:42 | mistaken/lie; not retractable (the board does not use it) |
| `t-brisk-3` | brisk | at brisk dock 23:20–23:35 | the truth |
| `t-pell-1` | pell | at pell vault 23:25–23:31; at voss vault 23:28–23:31 | true |
| `t-pell-2` | pell | at pell lobby 23:36–23:50; at brisk lobby 23:38–23:50 | true |
| `t-voss-1` | voss | at voss annex 22:40–23:55 | lie |
| `t-voss-3` | voss | at voss vault 23:12–23:47; at voss dock 23:50–23:52 | admission |

### 11.6 Proof sets (any one subset of `support`)
- Culprit `voss`: {`f-voss-annex`,`ev-power-log`,`ev-badge-log`}, {`f-voss-annex`,`ev-power-log`,`f-roque-last`}, {`f-voss-annex`,`ev-annex-sign`,`ev-dock-cam`}, {`f-voss-annex`,`ev-annex-sign`,`ev-badge-log`}.
- Mechanism `sabotage-restore`: {`ev-fuse`,`ev-rig-blackbox`}, {`ev-rig-burn`,`ev-rig-blackbox`}.
- Motive `stolen-grief`: {`ev-ledger`}.

### 11.7 Red herrings and why they fail
- **Quill:** motive (`ev-corvane-wire`), lied about home (R1 with `ev-door-log`). Her true location (bar, 23:05) is established by `ev-quill-receipt`/`f-quill-bar`; she could not travel bar→vault in time (R2: bar to vault 12 minutes). Accusing her ends `wrong-hand`.
- **Brisk:** lied about the booth (R1 with `ev-loop-log`), mistaken death time (R4) and alarm (R5), dock-key (R7). But `f-pell-lobby`, `t-pell-2` put him in the lobby at 23:46. Accusing him ends `wrong-hand`.
- **Pell:** was in the corridor 23:25–23:31 and could not have caused the 23:46 death; she is in the lobby (`f-pell-lobby`). Ends `wrong-hand`.
- **Suicide / blackout strike:** `ev-fuse` and `ev-rig-blackbox` rule out self-overload and a 23:42 strike.

### 11.8 Key contradictions the player will meet
- `t-quill-1` vs `ev-door-log` (R2). `t-brisk-1` vs `ev-loop-log` (R1) and vs `ev-badge-log` (R7). `t-brisk-2` vs `ev-rig-blackbox` (R4) and vs `ev-power-log` (R5). `f-voss-annex` vs `ev-power-log` and `ev-annex-sign` (R3), vs `ev-power-log` (R6), vs `ev-badge-log`/`ev-dock-cam` (R1), vs `f-roque-last` and `f-pell-corridor` (R1, disputed). `t-voss-1` vs `ev-badge-log` (R1, R2), `ev-dock-cam` (R1).

### 11.9 Dialogue trees
Tracked per talk: visited node ids and chosen choice ids. Each node has a line of speech, optional granted sources (recorded the first time the node is shown), and choices with optional requirements (`has` sources, `flags`, chapter, decision) and effects (set decision/flag). Presenting evidence is a choice that requires the item in the log. Full trees are in `story/data.ts` and must match section 11.5.

## 12. Art direction and visual identity

**Concept: the scene is a photograph, the interface is an instrument.** The location scenes are the one loud thing in the game: cinematic, wet, lit by real practical sources. Everything around them is a Bureau-issue forensic workstation (the BRE "Ledger" field kit): graphite casing, square edges, small precise type, paper evidence tags. It has been used for years. It is not a hologram and it does not glow.

### 12.1 Colour

| Name | Hex | Role |
|---|---|---|
| Casing | `#111518` | Page and panel background. A warm-neutral black, not teal. |
| Graphite | `#1d2327` | Raised surfaces: rows, inputs, the scene bezel. Hairlines are `#2c353a`. |
| Tag paper | `#e9e2d0` | Evidence tags, transcript slips, receipts. The only "physical" material in the UI; text on it is `#1b1a17`. |
| Signal cyan | `#5fe3ef` | Information and focus: focus rings, the primary button, hard-source marks, selected items. Hub accent. |
| Flag magenta | `#ff3fa4` | Contradictions only: margin flag bars, conflict counts, refuted stamps. Never decorative. |
| Sodium amber | `#ffb347` | Verdicts and key timeline slots. The single warm contrast. |

Body text `#d5dcdf` (14.5:1 on Casing), secondary text `#94a1a7` (6.9:1). Colour never carries meaning alone: every flag has words.

### 12.2 Typefaces (bundled with `@fontsource`, OFL, no CDN)

- **Big Shoulders Display** (700, 800): the logotype, location names on the scene plate, night and revelation titles, Latin lettering on in-world signs. A condensed civic face designed for city signage. It is used in those places only.
- **Public Sans** (400, 600): every piece of UI copy: headings, buttons, labels, body, dialogue. Plain and institutional, as a city bureau would issue. Sentence case everywhere.
- **IBM Plex Mono** (400, 500): only machine output: timestamps, timecodes, evidence item numbers on tags, rule codes, claim readouts. Labels, badges and buttons are never mono.

### 12.3 Scene art (Canvas 2D, procedural, layered)

Every location is a layered illustration baked into offscreen canvases: a far layer (sky, skyline, the street seen through glass) blurred for depth of field, with bokeh discs for distant lights; a mid layer of architecture and interiors (windows, fire escapes, cables, vents, conduits, furniture, props); an additive light layer with practical sources that fall off with distance (street lamps, signs, monitors, desk lamps, work lights) plus volumetric haze and light shafts; a foreground layer of people as silhouettes with rim light on the lit side and their own floor reflections; and a mirrored, blurred and rippled reflection of the light on wet floors. Signs carry Latin brand names and **Kestrel script**, an invented local script (stroke glyphs hung from a head bar) for anything a local would read. Each location has its own colour grade: lobby cold teal against a magenta street, office tungsten amber against blue window light, vault frozen cyan with a warm forensic work light, annex magenta window spill, dock sodium amber in sideways rain, bar lantern amber under a concrete culvert. A title-only exterior shows the Halcyon building on Undertow Street.

Evidence is photographed: physical items and printouts are drawn as flash-lit photos on a grey evidence surface with a scale ruler. Memory fragments are drawn as degraded video frames made from the location scene they were recorded in, with timecode burn-in, scan noise and colour bleed; a frame recorded in the blackout is underexposed.

### 12.4 Wireframe: investigation screen (desktop; at 375px the side column drops below)

```
+--------------------------------------------------------------------------------+
| [mark] Ghost Signal  The Halcyon Burn   Night 1  Dead Air   Sources 3 of 40    |
|                                          Open conflicts 1   [Sound on][Help][Settings][Menu]
| 1 Scene  2 Evidence log  3 Case board  4 Reconstruction  5 Contradictions  6 Conclusion |
+-----------------------------------------------------------+--------------------+
| +-------------------------------------------------------+ | Night 1: Dead Air  |
| | Halcyon Lobby                          (scene camera) | | brief paragraph    |
| | Ground floor                                          | |                    |
| |        [ ]  hotspot = corner brackets + scan line     | | Tonight            |
| |                 only on hover / list focus            | | [x] Door ledger    |
| |                                                       | | [ ] Grid relay log |
| | Cam 1                                  23:58:14       | | [Close the day]    |
| +-------------------------------------------------------+ +--------------------+
| Go to  [Lobby] [Office] [Vault] [Annex, night 2] ...      | In this room       |
| Wet marble, a security booth behind glass ...             | Examine  Relay  ok |
|                                                           | Talk to  Brisk     |
+-----------------------------------------------------------+--------------------+
```

### 12.5 Wireframe: case board

```
Case board                                   [Link the selected pair] [Clear selection]
Pick two items, then link them. A link the rules back up is marked confirmed.
1 open conflict, 2 links
+--------------+--------------+--------------+--------------+--------------+
| The scene    | Mara Quill   | Teodor Brisk | Linnea Voss  | Ottoline Pell|
| +--+ E-01    | +--+ S-01    | +--+ F-03    |              |              |
| |ph| Front-  | |sl| "I went | |vf| Booth,  |              |              |
| +--+ door    | +--+ home"  ▌| +--+ 23:10   |              |              |
|      ledger  |   in conflict|              |              |              |
+--------------+--------------+--------------+--------------+--------------+
ph = evidence photo thumb, sl = transcript slip, vf = video frame, ▌ = magenta flag bar
+---------------------------------+---------------------------------+
| Selected 1: photo, tag, excerpt | Selected 2: photo, tag, excerpt |
+---------------------------------+---------------------------------+
Links
  Front-door ledger  with  Quill: "I went home"    Confirmed: impossible travel (R2)   [Remove]
```

### 12.6 Design principles

1. **Spend the boldness on the scene.** The viewport is full-bleed and cinematic; the UI around it is quiet graphite with hairlines.
2. **Objects, not cards.** Evidence is a photo with a paper tag, a fragment is a video frame with a timecode, a statement is a typed slip. No grid of identical rounded cards.
3. **Flag like an analysis tool.** A contradiction is a magenta bar in the margin, a rule code and the two clashing claims side by side. No glow and no shake.
4. **Rows scale; tiles do not.** The evidence log is a dense list with thumbnails, so forty items stay scannable.
5. **Plain words.** Sentence case, no eyebrow labels, buttons say what they do ("Collect to log", "Link the selected pair").
6. **Wear is texture, not noise.** Scuffs and grain live in the scene and the photos, never under text.

### 12.7 Review against the brief (pass two)

The first draft of this plan was revised before coding:
- "Translucent glass panels with a cyan border and inner glow" was dropped. It is the generic sci-fi overlay the brief warns about. Panels are now opaque graphite with a hairline.
- Uppercase tracked headings, tabs and buttons were dropped in favour of sentence case.
- The draft used monospace for all badges and kind labels. Mono is now limited to machine output (timestamps, item numbers, rule codes).
- The "Revelation" and "Night 2" eyebrow labels above overlay titles were folded into the title itself ("Night two: Ghost Signal").
- Meta strings such as "Lobby · Scene · 23:10" were replaced with labelled provenance rows on the tag ("Found", "Recorded").
- Hotspot dots with a pulsing ping were replaced with in-scene corner brackets and a scan line that appear on hover or focus.
- The evidence-log tile grid was replaced with rows, for readability as the log grows.
- The draft carried glow on every accent. Glow now exists only inside the scene, where light is physical.

## 13. Animation and visual effects (restrained)

Static layers are baked to offscreen canvases when the location, size or quality changes (resize is debounced). Each frame composites the baked image and then adds the live layers: sign flicker (signs and their floor reflections share one layer, so the reflection flickers with the sign), rain in three depth bands (far, mid, near) lit by a blurred light map of the scene so streaks show only where they are backlit, splashes, ceiling drips in the vault and bar, drifting steam, droplets on glass that refract a flipped, blurred copy of the scene behind them (a few slide down on High), dust in light shafts (High), and film grain (Medium and High). Lateral chromatic fringing (red and blue channels scaled about the centre) is baked on High. Scene canvas capped at 30 fps (24 on Low), paused when hidden or covered.

**Visual quality setting** (persisted; default Low on small touch devices, Medium elsewhere):

| | Low | Medium | High |
|---|---|---|---|
| Pixel ratio cap | 1 | 1.5 | 2 |
| Rain density | 35% | 70% | 100% |
| Rain lit by scene | no | yes | yes |
| Far-layer blur | light | full | full |
| Reflections | static, no ripple | rippled | rippled, stronger |
| Glass droplets | none | static, refracting | refracting, some sliding |
| Grain / fringing | off / off | on / off | on / on |

UI motion: panel fade-in (140 ms), the scan line on a focused hotspot, a short flag-bar sweep when a contradiction is first shown. With `prefers-reduced-motion` or the in-game setting: the scene renders one still frame (rain frozen, no flicker, no steam drift), no scan line animation, instant transitions.

## 14. Sound design and music

Web Audio synthesis only, created after the first user gesture. Ambient drone: two detuned sines + filtered noise with a slow LFO. UI blip (short triangle), collect chime (two-note), notification, contradiction sting (filtered noise burst + descending tone), revelation sting, ending motifs (distinct chord per ending). Mute (`M`) and a volume slider; both persisted. No audio autoplay before a gesture; every call guarded.

## 15. Menus and in-game UI

The interface is the BRE "Ledger" workstation described in section 12. Layout rules: square corners (2px radius at most), 1px hairlines in `#2c353a`, no drop shadows except under modal sheets, an 8px spacing grid, and one accent per element.

- **Title screen:** the rainy Undertow Street exterior fills the screen. A left-aligned block holds the logotype (Big Shoulders), the tagline in sentence case, the intro, and a plain vertical menu: Continue the case (if saved), New case, Endings found (x of 5), How to play, Settings.
- **Header (instrument bar):** wordmark and case name, then labelled readouts (Night, Sources, Open conflicts) with values in Plex Mono, then Sound, Help, Settings and Menu buttons.
- **Tabs:** sentence case with the shortcut digit: Scene, Evidence log, Case board, Reconstruction, Contradictions, Conclusion. The active tab has a cyan underline; the contradictions tab shows a magenta count.
- **Scene:** the viewport sits in a graphite bezel with a location plate (name, floor), a camera number and a timecode. Hotspots are invisible until hover or focus, then show corner brackets sized to the object and a scan line. Beside it: the night brief, tonight's objectives as a checklist, and an "In this room" list (verb, name, status) that highlights the object in the scene when focused.
- **Evidence log:** filter (All, Physical and logs, Memory fragments, Statements) and search; a list of rows: thumbnail (photo, video frame or slip), item number tag (E-, F-, S-), title, where found, recorded time, and status flags (Refuted, In conflict, Retracted).
- **Case board:** subject columns of compact items; pick two to compare side by side and link; a links ledger with confirmed rule names.
- **Reconstruction:** a time ruler from 22:00 to 00:15 over six slot bays. Each bay shows its window, "Key slot" in amber where it applies, the placed fragment as a video frame, and a status line in words. The fragment tray below is a film strip of frames.
- **Contradictions:** an analysis list. Each entry has a magenta (refuted) or amber (disputed) margin bar, the rule code and name, both sources with the two clashing claims side by side, and the verdict in one sentence.
- **Conclusion:** a filing form with three questions, a support checklist (up to 6), a "Run the Magistrate's check" report, and "File the conclusion".
- **Evidence view (modal):** the photo or frame with its paper tag on the left; title, provenance rows (Found, Recorded, Type, Reliability), text, claims as a readout, and contradictions on the right. **Interview (modal):** a procedural ID photo, the transcript as an interview record, numbered replies (1 to 9).
- **Night, revelation and ending** overlays are full sheets over the darkened scene with the title in Big Shoulders and one primary button.
- **Toasts:** small instrument notices with a coloured left bar and plain words; also read by the live region.
- **Settings:** volume, mute, text size, visual quality (Low, Medium, High), reduce motion, high contrast. All persisted.

## 16. Accessibility and settings

Settings: volume (0–100), mute, text size (small / medium / large), visual quality (low / medium / high, see section 13), reduced motion, high contrast. Defaults: reduced motion initial value from `prefers-reduced-motion`. High contrast raises text contrast, thickens borders, removes translucency. All interactive controls are native buttons/inputs with labels; modals trap focus and restore it on close; `Esc` closes; contrast of text on panels at least 4.5:1; information never conveyed by color alone (badges have text); minimum target size 40px.

## 17. Technical architecture

Vanilla TypeScript + DOM + Canvas 2D, Vite 5, TypeScript 5.6. The only runtime dependencies are three `@fontsource` font packages (Big Shoulders Display, Public Sans, IBM Plex Mono; latin subset), bundled into the build.

```
source/ghost-signal/
  index.html
  package.json  tsconfig.json  vite.config.ts
  scripts/check-case.ts
  src/main.ts
  src/styles.css
  src/story/types.ts      claim/source/state types, time helpers
  src/story/data.ts       people, locations, slots, sources, hotspots, talks, chapters, endings, proofs
  src/story/rules.ts      contradiction engine (pure)
  src/story/engine.ts     state model + actions + deduction + endings (pure)
  src/storage/storage.ts  versioned localStorage
  src/audio/audio.ts      Web Audio synth
  src/render/scene.ts     layered scene renderer (bake, live layers, quality)
  src/render/kit.ts       painting toolkit (light falloff, people, signs, buildings)
  src/render/script.ts    Kestrel script glyphs
  src/render/painters.ts  one painter per location plus the title street
  src/render/photos.ts    evidence photos, video frames, slips, ID photos
  src/ui/*.ts             dom helpers, panels, modals, app shell
```

**Narrative state model (single object, JSON-serializable):** `{v, chapter, loc, log: string[] (collected sources, ordered), flags: Record<string, boolean>, decisions: {brisk, bleed, mother}, talks: Record<talkId, {nodes: string[], choices: string[]}>, board: Record<slotId, sourceId|null>, links: [id,id][], conclusion: {culprit, mechanism, motive, support: string[]}, revelations: string[], seenContradictions: string[], ending: id|null, turn: number}`.

**Engine API (pure):** `newState()`, `hotspotsAt(state, loc)`, `hotspotStatus(state, hs)`, `collect(state, sourceId)`, `talkNode(state, talkId)`, `choose(state, talkId, choiceId)`, `decideBleed(state, value)`, `closeDay(state)`, `chapterGoals(state)`, `place(state, slot, frag|null)`, `evaluateBoard(state)`, `link(state, a, b)`, `setConclusion(state, patch)`, `check(state)`, `submit(state, motherDecision)`. Every mutating call returns an array of events (`collected`, `contradiction`, `revelation`, `chapter`, `ending`, `locked`).

## 18. Performance requirements

60 fps UI, scene canvas capped at 30 fps with `requestAnimationFrame`, paused when the tab is hidden and when a modal covers the scene. No allocations in the rain loop. Contradiction detection runs only on state change (at most O(n²) over ~40 sources). Bundle under 250 KB gzipped.

## 19. Asset creation and licensing

No external images or sounds. All art is procedural; all text, names, and sounds are original. Fonts are bundled from `@fontsource` (SIL Open Font License); nothing is fetched at runtime.

## 20. Save and persistence behavior

localStorage key `ghost-signal:v1`: `{settings, progress, endings}`. Every read/write is wrapped in try/catch; invalid JSON, wrong version or missing fields fall back to defaults and a new case. Autosave after every action. "New Case" confirms in-UI (not `confirm()`), resets progress but keeps `endings` and `settings`.

## 21. Error handling and browser compatibility

Target: current Chrome, Edge, Firefox, Safari. No `alert`. If Web Audio or localStorage are unavailable the game remains playable. A top-level error boundary shows a readable "signal lost" panel with a reset button. No console errors in normal play. Offline-capable (no network at runtime).

## 22. Testing strategy

`npm run typecheck`, `npm run build`, and a pure-logic script `scripts/check-case.ts` (run with `node --experimental-strip-types scripts/check-case.ts`) that verifies: data integrity (all ids exist, every source is obtainable from some hotspot or dialogue, no contradiction between two hard sources, slot windows contain fragment timestamps); the canonical truth set (hard evidence + authentic fragments + truthful statements) produces zero contradictions; every expected contradiction in 11.8 is detected; the forged fragment is exposed; each red-herring conclusion is rejected; every one of the five endings is reached by a valid sequence of player actions through the real engine; a state invariant check (no source collected before its gate; flags consistent with decisions); save/load roundtrip. Manual browser check: title, start, visit a location, collect, board, a surfaced contradiction, reconstruction, conclusion, zero console errors.

## 23. Gaming hub integration

Hub card: `playUrl: './games/ghost-signal/'`, title GHOST SIGNAL, tagline "Memories can lie. Timestamps can't.", genres `Detective`, `Narrative`, `Deduction`, accent `cyan`, controls: `Click / Enter` examine and select, `Tab` move focus, `1–6` switch tabs, `Esc` close panel, `M` mute. Tech: TypeScript, Canvas 2D, Web Audio, Vite.

## 24. GitHub Pages deployment requirements

Vite `base: './'`; `build.outDir: '../../games/ghost-signal'`, `emptyOutDir: true`, `assetsInlineLimit: 0`; the built output is committed under `games/ghost-signal/` and Pages serves from the repository root. `index.html` redirects visitors of `/source/ghost-signal/` on github.io to `games/ghost-signal/`. All asset URLs relative.

## 25. Definition of done

- [ ] Spec followed; story data, rules and state are pure modules.
- [ ] Original protagonist, central mystery, 6 locations with interactive hotspots.
- [ ] Evidence examine text, evidence log, clue board with linking.
- [ ] Branching testimony tracked; three tracked decisions with consequences.
- [ ] Seven contradiction rules working and readable in the UI.
- [ ] Reconstruction board with six slots and live validation.
- [ ] Conclusion with proof-set checking; Magistrate's Check preview.
- [ ] 3 chapters, mid-case revelations, 5 reachable endings, canonical ending identified.
- [ ] Persistence with fallback; endings gallery persists.
- [ ] Audio synthesis with mute and volume; settings; reduced motion; high contrast; keyboard complete.
- [ ] `check-case.ts` passes; `npm run typecheck` and `npm run build` pass; `games/ghost-signal/index.html` exists.
- [ ] Browser check performed; no console errors; works at phone width.

## 26. Final reporting requirements

Report: status (COMPLETE/PARTIAL/BLOCKED) and missing features; exact commands run and results (check script, typecheck, build, preview); browser verification and console errors; poster status; files created; hub entry facts (playUrl, title, tagline, description, genres, controls, tech, accent). Separate what was verified from what was not. Never claim a check passed that was not run.
