<div align="center">

<picture>
  <source media="(max-width: 600px)" srcset="./assets/hero-mobile.gif" />
  <img src="./assets/hero.gif" alt="Sergey Petrosyan, Frontend Software Engineer: an engraved desert skyline at night where a carved moon rests behind the mesa and three stars line up above a small observatory" width="100%" />
</picture>

# Sergey Petrosyan

### Frontend Software Engineer

**Building web products that stay fast, readable, and easy to change.**

![TypeScript](https://img.shields.io/badge/TypeScript-72151D?style=flat-square&logo=typescript&logoColor=F1EDE7)
![React](https://img.shields.io/badge/React-72151D?style=flat-square&logo=react&logoColor=F1EDE7)
![Frontend Architecture](https://img.shields.io/badge/Frontend%20Architecture-150607?style=flat-square)
![UI/UX Engineering](https://img.shields.io/badge/UI%2FUX%20Engineering-150607?style=flat-square)
![Performance](https://img.shields.io/badge/Performance-150607?style=flat-square)

<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/"><img src="./assets/arcade-button.png" alt="Enter the NEON ARCADE: all ten browser games" width="380" /></a>

[About](#about) · [The Arcade](#the-arcade) · [What I Do](#what-i-do) · [Tech Stack](#tech-stack) · [Principles](#engineering-principles) · [Work](#work)

</div>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/rule-dark.png" />
  <img src="./assets/rule-light.png" alt="" width="100%" />
</picture>

## About

I build production web applications with TypeScript and the React ecosystem, and I care most about the part of engineering that shows up six months later: whether the codebase is still pleasant to work in, and whether the interface still feels fast under real data.

Most of my work sits at the intersection of **architecture and interface** — designing component systems and data flows that scale past the first few screens, then making sure the result is genuinely good to use. I like complex domains, dense UIs, and problems where the naive solution stops working once real users and real datasets arrive.

I treat clarity as a feature: code that reads plainly, boundaries that are obvious, state that lives where it belongs, and abstractions introduced only once the pattern has actually repeated.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/rule-dark.png" />
  <img src="./assets/rule-light.png" alt="" width="100%" />
</picture>

## The Arcade

Ten browser games, each built from scratch. Pick a card to play — every one runs in the browser, no install. The whole collection lives at **[NEON ARCADE](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/)**.

<p align="center">
<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/unfall/"><img src="./assets/cards/unfall.gif" alt="Play UNFALL — card XII, The Hanged Man: a carved lens over a broken bridge lifts the fallen plank back into place while Ilo walks with her lantern" width="168" /></a>
<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-tanks/"><img src="./assets/cards/neon-tanks.gif" alt="Play NEON TANKS: OVERDRIVE — card VII, The Chariot: a tank on a desert depot sweeps its turret toward a red enemy tank" width="168" /></a>
<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-vice/"><img src="./assets/cards/neon-vice.gif" alt="Play NEON VICE — card XVI, The Tower: a car with its headlights on drives through a frontier town at night" width="168" /></a>
<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-space-invaders/"><img src="./assets/cards/neon-space-invaders.gif" alt="Play NEON SPACE INVADERS — card XVII, The Star: a red stamped formation sways above three adobe bunkers and the player's cannon" width="168" /></a>
<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-overdrive/"><img src="./assets/cards/neon-overdrive.gif" alt="Play NEON OVERDRIVE — card X, Wheel of Fortune: the player's car races down a desert highway toward a red Spine gate under the moon" width="168" /></a>
<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/paradox-room/"><img src="./assets/cards/paradox-room.gif" alt="Play PARADOX ROOM — card XXI, The World: an open room turns a quarter around the lantern-bearer standing at its centre" width="168" /></a>
<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/ghost-signal/"><img src="./assets/cards/ghost-signal.gif" alt="Play GHOST SIGNAL — card XVIII, The Moon: rain falls on a detective under a street lamp beside a wanted notice in Kestrel Bay" width="168" /></a>
<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/blackout-protocol/"><img src="./assets/cards/blackout-protocol.gif" alt="Play BLACKOUT PROTOCOL — card IX, The Hermit: a guard's red lantern cone sweeps a floor plan while the operative waits behind a crate" width="168" /></a>
<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/void-survivor/"><img src="./assets/cards/void-survivor.gif" alt="Play VOID SURVIVOR — card XIX, The Sun: rings of red swarm marks circle the survivor inside a carved Bulwark Field" width="168" /></a>
<a href="https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-jump/"><img src="./assets/cards/neon-jump.gif" alt="Play NEON JUMP: CYBERWORLD — card 0, The Fool: Vee hops from an adobe ledge up to a stamped star" width="168" /></a>
</p>

### UNFALL — a time-lens game

*Vesper ends tonight. You can't steer Ilo, the courier carrying its last light — you can only hold a circle where time runs backward.*

**[Play UNFALL](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/unfall/)** · [Source code](./source/unfall) · TypeScript · Canvas 2D · Vite · Web Audio

<details>
<summary><b>How it plays · Controls</b></summary>
<br/>

- Inside the circle, time runs backward: slabs rise back into place, fallen signs return to their chains, presses lift, and the Hush recedes
- Outside it, time keeps going, so whatever you rebuild starts falling again on its own clock
- The circle rewinds Ilo too: catch her and she walks back through her own steps, or rescue her mid-fall
- Every second you borrow dims her lantern, and how much light reaches the lighthouse decides one of three endings
- Eight hand-built districts, a 6–10 minute night, and a soundtrack that plays backward while you hold time

| Input | Action |
|---|---|
| Mouse / finger | Aim the circle |
| Hold button / touch | Turn time back |
| Wheel · `Q` `E` | Resize the circle |
| Arrows · `Space` | Keyboard aim · hold |
| `R` · `Esc` | Restart · Pause |

</details>

### NEON TANKS: OVERDRIVE

*A true-3D arena tank shooter. Drive one way, aim the turret another, and fight bot tanks across a container port and a research facility.*

**[Play NEON TANKS](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-tanks/)** · [Source code](./source/neon-tanks) · TypeScript · Three.js · Vite · Web Audio

<details>
<summary><b>How it plays · Controls</b></summary>
<br/>

- Two multi-level arenas, NEON DOCKS and VOID COMPLEX, with ramps, bridges, walkways, cover and see-through energy barriers
- Independent hull and turret, third-person orbit camera, real collisions, slopes and ledges
- Four weapons that play differently: PLASMA CANNON, RAIL DRIVER, VOLT EMITTER and NOVA ROCKETS
- Three hulls with their own abilities: phase dash, aegis shield and shockwave
- Team Deathmatch, Free-for-All and Control Point against bots on three difficulties (bots are always tagged BOT)
- Garage with unlocks, paints and upgrades; level, credits and career stats saved locally

| Input | Action |
|---|---|
| `W` `S` · `A` `D` | Drive · turn hull |
| Mouse · Click | Aim turret · fire |
| Wheel | Camera zoom |
| `Shift` · `Space` | Boost · ability |
| `R` · `Tab` | Reload/vent · scores |
| `Esc` · `M` | Pause · mute |

</details>

### NEON VICE — 3D Nightfall

*A 3D arcade shooter. Explore the city, take control of the streets, and survive the night.*

**[Play NEON VICE](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-vice/)** · [Source code](./source/neon-vice) · TypeScript · Three.js · Vite · Web Audio

<details>
<summary><b>How it plays · Controls</b></summary>
<br/>

- Third-person shooting with two weapons — Neon Pistol and Pulse Rifle — headshots, reloads and combo multipliers
- Two enemy archetypes: Street Enforcers rush you, Neon Gunners keep their distance and fire telegraphed bolts
- Drivable sports cars with underglow, handbrake drifts and a speedometer
- A compact city: downtown towers, oceanfront hotels, a parking garage, backstreet alleys and a plaza
- Six escalating waves, pickups, and a local best-score board
- Original synthwave soundtrack and SFX, synthesized live with Web Audio

| Input | Action |
|---|---|
| `W` `A` `S` `D` | Move / drive |
| `Shift` · `Space` | Sprint · Jump / handbrake |
| Mouse · Left click | Aim · Fire |
| Right click | Over-the-shoulder aim |
| `R` · `1` `2` | Reload · Switch weapon |
| `E` | Enter / exit a car |
| `Esc` | Pause |

</details>

### NEON SPACE INVADERS

*A take on the arcade classic. Pilot the interceptor, dodge incoming fire and clear wave after wave before the invaders reach the grid.*

**[Play NEON SPACE INVADERS](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-space-invaders/)** · [Source code](./games/neon-space-invaders) · JavaScript · Canvas 2D

### NEON OVERDRIVE

*Burn the reserve. Cut the Spine. An arcade racer through a megacity at midnight.*

**[Play NEON OVERDRIVE](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-overdrive/)** · [Source code](./source/neon-overdrive) · TypeScript · Three.js · Vite · Web Audio

<details>
<summary><b>How it plays · Controls</b></summary>
<br/>

- Three laps against three AI rivals, on three tracks at three difficulties
- Drift to fill your Overdrive reserve, then spend it on boost
- The Spine is a faster inner route whose gates open only for a car with a charged reserve
- Checkpoints, lap splits and personal bests saved in your browser

| Input | Action |
|---|---|
| `W` · `S` | Accelerate · Brake |
| `A` `D` · `←` `→` | Steer |
| `Shift` · `Space` | Drift |
| `B` · `Enter` | Boost |
| `P` · `R` | Pause · Restart |

</details>

### PARADOX ROOM

*The floor is a matter of opinion. Fold small rooms a quarter-turn at a time so walls become floors.*

**[Play PARADOX ROOM](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/paradox-room/)** · [Source code](./source/paradox-room) · TypeScript · Three.js · Vite · Web Audio

<details>
<summary><b>How it plays · Controls</b></summary>
<br/>

- Roll or pitch a room and gravity follows: a wall becomes the floor, and you fall to it
- Nine rooms in three chapters, each one checked to be solvable, with a shortest-known solution to beat
- Hints, undo, hidden margin-note shards, and portals that remember how each room was turned

| Input | Action |
|---|---|
| `WASD` · Arrows | Move |
| `Q` · `F` | Roll the room |
| `X` · `V` | Pitch the room |
| `E` · `Space` | Interact |
| `Z` · `H` · `R` | Undo · Hint · Restart |

</details>

### GHOST SIGNAL

*Memories can lie. Timestamps can't. A detective thriller in rain-soaked Kestrel Bay.*

**[Play GHOST SIGNAL](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/ghost-signal/)** · [Source code](./source/ghost-signal) · TypeScript · Canvas 2D · Vite · Web Audio

<details>
<summary><b>How it plays · Controls</b></summary>
<br/>

- Rebuild a contested night from memory fragments, testimony and evidence
- Seven deduction rules check fragments against each other and expose a forged memory
- Dialogue choices are tracked, and five endings follow your conclusion

| Input | Action |
|---|---|
| Click · `Enter` | Examine / select |
| `1`–`6` | Switch tabs |
| `1`–`9` | Choose a reply |
| `Esc` · `?` | Close panel · Help |

</details>

### BLACKOUT PROTOCOL

*Cut the lights. Own the dark. Stealth and hacking across four Halcyon facilities.*

**[Play BLACKOUT PROTOCOL](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/blackout-protocol/)** · [Source code](./source/blackout-protocol) · TypeScript · Three.js · Vite · Web Audio

<details>
<summary><b>How it plays · Controls</b></summary>
<br/>

- Guards patrol, grow suspicious, raise the alert and search; vision cones respect walls and shadows
- A limited Energy reserve pays for every hack: loop a camera, lock a door, cut a laser grid
- Drop decoys, find keycards, crack terminal puzzles, then reach extraction unseen

| Input | Action |
|---|---|
| `WASD` · Arrows | Move |
| `Shift` | Sneak |
| `E` · `Tab` | Interact · Cycle target |
| `Space` · `F` | Hack · Drop decoy |
| `Esc` · `P` | Pause |

</details>

### VOID SURVIVOR

*Feed the void. Break the swarm. A roguelite survivor.*

**[Play VOID SURVIVOR](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/void-survivor/)** · [Source code](./source/void-survivor) · TypeScript · Three.js · Vite · Web Audio

<details>
<summary><b>How it plays · Controls</b></summary>
<br/>

- Kills fill your Reserve; hold it to raise a Bulwark Field, or release it as a Detonation
- Pick one of three upgrade cards on every level-up and build synergies across a 20-minute run
- Four Core Warden fights, and Shards to spend on permanent unlocks in the Vault

| Input | Action |
|---|---|
| `WASD` · Arrows | Move |
| `Q` | Hold Reserve |
| `E` · `Space` | Release (Detonation) |
| `1` `2` `3` · `4` | Pick a card · Reroll |
| `P` · `R` | Pause · Restart |

</details>

### NEON JUMP: CYBERWORLD

*A side-scrolling platformer. Run, jump and stomp across three glitching worlds to rebuild the Neon Core.*

**[Play NEON JUMP](https://sergeypetrosyan-as.github.io/sergeypetrosyan-as/games/neon-jump/)** · [Source code](./source/neon-jump) · TypeScript · Canvas 2D · Vite · Web Audio

<details>
<summary><b>How it plays · Controls</b></summary>
<br/>

- Six hand-built levels in three worlds: Neon Downtown, Cyber Factory and the Glitch Dimension
- Responsive jumps with variable height, coyote time and jump buffering
- Six original enemy types, plus lasers, crushers, rotors, live floors, timed and vanishing blocks
- Pulse Shield and Overdrive Core power-ups; neon shards, secret rooms and a hidden arcade token in every level
- A three-phase boss, the Static Sovereign, beaten by stomping its core after each slam
- Original pixel art and a synthesized soundtrack; best times, ranks and progress saved locally

| Input | Action |
|---|---|
| `A` `D` · `←` `→` | Run |
| `Space` · `W` | Jump (hold for higher) |
| `Shift` | Sprint |
| `E` | Read a terminal |
| `Esc` · `R` | Pause · Checkpoint |

</details>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/rule-dark.png" />
  <img src="./assets/rule-light.png" alt="" width="100%" />
</picture>

## What I Do

<img src="./assets/skills-map.png" alt="A star chart joining four disciplines — Frontend Engineering, UI/UX Engineering, Architecture and Performance — with AI-assisted workflow as a smaller star beside Architecture" width="100%" />

<table>
<tr>
<td width="50%" valign="top">

### Frontend Engineering

Modern React applications built in TypeScript, with a strong bias toward typed contracts at every boundary.

- Component architecture and reusable UI primitives
- Client and server state management
- Data fetching, caching, and synchronization
- Form systems with schema-driven validation
- Type-safe API integration layers

</td>
<td width="50%" valign="top">

### UI/UX Engineering

Turning product requirements and design intent into interfaces people can actually operate.

- Refining complex, information-dense screens
- Design-system thinking and visual consistency
- Responsive layouts across viewports
- Accessibility-aware markup and interaction
- Interaction and motion that serve the task

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Architecture

Structuring frontends so that adding the tenth feature costs about what the second one did.

- Feature-based project organization
- Clear module and layer boundaries
- Shared component and utility layers
- Consistent API integration patterns
- Continuous refactoring toward maintainability

</td>
<td width="50%" valign="top">

### Performance

Treating responsiveness as part of the product, not a cleanup task.

- Identifying rendering and bundle bottlenecks
- Reducing unnecessary re-renders
- Optimizing large lists and heavy views
- Smooth animations and transitions
- Faster perceived load and interaction

</td>
</tr>
</table>

### AI-Assisted Development

I use AI tooling as part of a normal engineering workflow — accelerating refactors, exploration, documentation, and review — while keeping design decisions, correctness, and architectural judgment firmly human-owned. Generated code gets reviewed like any other code.

## Tech Stack

| | |
|---|---|
| **Core** | ![TypeScript](https://img.shields.io/badge/TypeScript-72151D?style=flat-square&logo=typescript&logoColor=F1EDE7) ![JavaScript](https://img.shields.io/badge/JavaScript-72151D?style=flat-square&logo=javascript&logoColor=F1EDE7) ![HTML5](https://img.shields.io/badge/HTML5-72151D?style=flat-square&logo=html5&logoColor=F1EDE7) ![CSS3](https://img.shields.io/badge/CSS3-72151D?style=flat-square&logo=css3&logoColor=F1EDE7) |
| **Framework** | ![React](https://img.shields.io/badge/React-72151D?style=flat-square&logo=react&logoColor=F1EDE7) ![Vite](https://img.shields.io/badge/Vite-72151D?style=flat-square&logo=vite&logoColor=F1EDE7) |
| **State & Data** | ![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-72151D?style=flat-square&logo=redux&logoColor=F1EDE7) ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-72151D?style=flat-square&logo=reactquery&logoColor=F1EDE7) |
| **UI & Styling** | ![Ant Design](https://img.shields.io/badge/Ant%20Design-72151D?style=flat-square&logo=antdesign&logoColor=F1EDE7) ![SCSS](https://img.shields.io/badge/SCSS-72151D?style=flat-square&logo=sass&logoColor=F1EDE7) |
| **Forms & Validation** | ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-72151D?style=flat-square&logo=reacthookform&logoColor=F1EDE7) ![Zod](https://img.shields.io/badge/Zod-72151D?style=flat-square&logo=zod&logoColor=F1EDE7) |
| **Tooling** | ![Git](https://img.shields.io/badge/Git-72151D?style=flat-square&logo=git&logoColor=F1EDE7) ![ESLint](https://img.shields.io/badge/ESLint-72151D?style=flat-square&logo=eslint&logoColor=F1EDE7) ![Prettier](https://img.shields.io/badge/Prettier-72151D?style=flat-square&logo=prettier&logoColor=F1EDE7) |
| **Games** | ![Three.js](https://img.shields.io/badge/Three.js-72151D?style=flat-square&logo=threedotjs&logoColor=F1EDE7) ![Canvas 2D](https://img.shields.io/badge/Canvas%202D-150607?style=flat-square) ![Web Audio](https://img.shields.io/badge/Web%20Audio-150607?style=flat-square) |

## Engineering Principles

> **Optimize for the reader.** Code is written once and read constantly. Clarity beats cleverness every time.

> **Design systems, not screens.** A component that solves one screen is a feature; a component that solves a category is leverage.

> **Abstract on the third repetition.** Premature abstraction costs more than duplication, and it is much harder to undo.

> **Performance is user experience.** Latency and jank are product bugs, not engineering footnotes.

> **Make the right thing the easy thing.** Structure, types, and tooling should make correct code the path of least resistance.

> **Leave the codebase better than you found it.** Deliberate, incremental improvement beats the rewrite that never ships.

## Current Focus

```text
Frontend architecture      →  scalable structure for long-lived applications
Component systems          →  composable, typed, reusable UI foundations
Application performance    →  rendering, responsiveness, perceived speed
UI/UX engineering          →  making complex interfaces feel simple
AI-assisted workflows      →  faster iteration without losing rigor
Developer experience       →  tooling and conventions that reduce friction
```

## Work

Currently working as a **Software Engineer** in a professional product development environment, building and maintaining production web applications.

Day to day, that means developing features end to end, integrating frontend systems with backend APIs, refactoring and improving existing interfaces, maintaining frontend architecture as products grow, improving performance and usability, and collaborating closely with engineering, design, and product colleagues.

<div align="center">

<sub>Open to conversations about frontend architecture, UI engineering, and building better products.</sub>

<img src="./assets/footer.gif" alt="A carved moon passes through its phases above a low mesa and a small observatory" width="100%" />

</div>
