# UNFALL — design notes

## What already exists in the arcade

| Game | Verb | Space | Palette |
|---|---|---|---|
| Neon Space Invaders | Shoot | 2D, fixed screen | magenta / cyan on purple |
| NEON VICE | Shoot, drive | 3D, third person | magenta / cyan / sunset |

Both are about **you** acting directly through an avatar, and both are about destroying things. The third game should be about neither.

## Discovery: five concepts

Scored 1–5 against the brief's criteria: originality of the core verb, immediate appeal, depth, visual memorability, browser fit, feasibility, replayability, how well it reads in a 5-second GIF, and portfolio value.

| # | Concept | One-line rule | Orig. | Appeal | Depth | Visual | Browser | Feasible | Replay | GIF | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Lumen Grammar** | Pull glowing letters out of neon signs to respell what the city allows (`NO EXIT` → `EXIT`). | 3 | 4 | 4 | 4 | 5 | 3 | 2 | 3 | 28 |
| 2 | **Echo Choir** | The world is dark; you see only where your sung notes echo, and chords open doors. | 3 | 3 | 3 | 4 | 4 | 3 | 2 | 2 | 24 |
| 3 | **Unremember** | Delete memories (objects) to open paths; each deletion is gone from the story too. | 4 | 3 | 3 | 3 | 5 | 4 | 3 | 2 | 27 |
| 4 | **Phosphor** | You are a spark; your fading trail is the only solid ground there is. | 3 | 4 | 3 | 4 | 5 | 5 | 3 | 4 | 31 |
| 5 | **UNFALL** | You don't control the hero. You hold a circle where time runs backward, and use it to get a stubborn courier across a city that is collapsing. | 5 | 4 | 5 | 5 | 5 | 4 | 4 | 5 | **37** |

**Winner: UNFALL.** The player's action every few seconds is to decide *where* time should run backward, *for how long*, and *what must stay outside the circle*. Rejected alternatives: 2 leans on spectacle over decisions, 1 and 3 are closest to existing word/deletion puzzlers, and 4 is a good toy with a shallow decision space.

## Validation

1. **Every few seconds:** move the circle, hold to un-break the next obstacle, release at the right moment.
2. **What's different:** you never touch the courier; time is a *place*, not a global button. Things inside the lens run backward while everything outside keeps moving forward.
3. **Tension:** the lens rewinds the courier too, so if it catches her she walks backward. Every second costs the lantern she carries, and the Hush keeps advancing outside the circle.
4. **Mastery:** small lenses placed just ahead of her, rewinding a bridge only as far as needed, letting some things fall because the fallen sign *is* the bridge, catching her mid-fall.
5. **Replay:** each district records the seconds you borrowed. The ending depends on how much light is left in the lantern.
6. **Story through play:** the cost meter *is* the story. The reversal is that every second you take back comes out of the lantern, and the lantern is all that's left of the city.
7. **Visual signature:** a circle of photographic negative moving over a sodium-amber city, with white static eating everything behind.
8. **Browser fit:** 2D canvas, analytic time functions per object (perfectly reversible, no physics history needed), Web Audio.
9. **Teaching:** the first district has one broken bridge and one sentence of instruction, and the courier waits at the edge.
10. **Smallest fun version:** one bridge, one falling sign, one courier. That's district 1, and it proved the loop.

## Rules (the whole system)

- Every object has its **own clock** τ. Its position, rotation and solidity are a pure function of τ.
- Inside the lens, τ runs backward at 1.6×; outside, it runs forward (once triggered). Clocks clamp at 0.
- The lens reaches an object at its current position **or its home**. Added after the first playtest: slabs that had fallen off-screen could not be reached otherwise, and aiming at the gap is what players try first.
- Ilo walks right at a constant pace. She waits at a gap or a wall instead of walking into it.
- Inside the lens, Ilo replays her own recorded past (up to 15 s), including un-dying.
- Using the lens spends the district's spare time, scaled by lens size. Sparks (lost seconds) refund it.
- Every borrowed second dims the lantern by 0.6%. The lantern at the lighthouse decides the ending.
