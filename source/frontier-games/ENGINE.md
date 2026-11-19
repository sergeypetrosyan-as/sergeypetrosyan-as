# Frontier games: engine guide

Ninety small browser games share one shell. A game is **two small files** plus its row in `concepts.mjs`:

| File | Job |
|---|---|
| `concepts.mjs` (read only) | id, title, category, catalog line, and the three design answers: what the player DOES repeatedly, what DECIDES the outcome, why they RETRY. Do not edit; report deviations in your summary. |
| `src/meta/<id>.mjs` | `how` (1 to 2 sentences that teach the core action), `controls`, `motif` (the one visual motif and its gameplay purpose), `cover` (tarot-card art ops), `smoke` (one real input the verifier performs). |
| `src/games/<id>.ts` | `export default function (ctx: Ctx): Instance`. Loaded only when the game opens. |

The reference implementation is `src/games/noon-draw.ts` + `src/meta/noon-draw.mjs`. Read both first. Types: `src/core/types.ts`.

## Lifecycle (the shell owns it)

1. Visitor opens `games/<id>/`. Shell shows the first screen from your `meta` (cover, title, `how`, controls, Play).
2. Play: shell calls your factory `(ctx) => Instance`, then **`inst.reset(seed)` immediately**. The factory builds DOM/canvas and registers inputs but must not start a run by itself; `reset` starts every run (first and replays). `reset` must restore the exact starting state, re-set the HUD (`ctx.hud`), and be deterministic for a given seed (all randomness from `makeRng(seed)` created inside `reset`).
3. During play call `ctx.finish({ result: 'win' | 'lose', score, title?, detail? })` exactly when the rules end the run. `score`: higher is better (invert times/moves yourself, e.g. `Math.max(0, 1000 - ms)`). `detail` is one plain sentence about what happened. The shell shows the outcome screen, best score and Play again (which calls `reset(seed + 1)`). Every game needs both a reachable win and a reachable loss.
4. Real-time games: `ctx.loop(update, draw)`. `update(dt)` always gets `1/60`. Keep all logic in `update`/action functions and never read the wall clock (`Date.now`, `performance.now`) in rules, so the bot can step time synchronously.

## Ctx (everything auto-cleans on destroy)

- `ctx.root`: the stage element. Append your playfield. It is a flex column, centred, scrollable, with 10px padding. Make DOM playfields `width: 100%; max-width: ...` so they fit a 390px phone with no horizontal overflow.
- `ctx.canvas(w = 480, h = 640)`: DPR-scaled canvas with logical size `w x h`, letterboxed to fit. Draw in logical units. `cv.pt(event)` maps a pointer event to logical coordinates. Use pointer events only (`ctx.on(cv.el, 'pointerdown', ...)` or `ctx.drag`).
- `ctx.hud(label, value)`: the status row above the stage (score, moves, time left...). 
- `ctx.keys({ ArrowLeft: (down) => ..., ' ': ... })` keyboard; `ctx.held` set of held keys. **If a game is key-driven, also call `ctx.pad([{ key, label }...])`**: touch buttons that behave exactly like the keys. Pointer-driven games need no pad.
- `ctx.on(target, type, fn)`, `ctx.drag(el, { down, move, up })`, `ctx.after(ms, fn)` (cleared on reset; skipped once finished), `ctx.sfx('tap'|'good'|'bad'|'win'|'lose'|'tick')`.
- `ctx.c`: the palette (`ctx.c.bg, fg, accent, hostile, collectible, player, world, quiet, surface, surfaceRaised, line` and tints `bone, red, rose, ember, wine, tan, saddle, umber, mesa, night, dusk, ash, smoke, ink, blush, white`). In CSS use `var(--mw-bone)`, `var(--mw-red)`, `var(--mw-rose)`... (`--mw-role-*` for roles). **Never write a raw hex colour in a game.**
- `import { h } from '../core/dom'` (hyperscript), `import { makeRng, rint, shuffle, pick } from '../core/rng'`.
- Ready CSS classes (src/styles/shell.css): `mw-btn` (+`primary`), `mw-chip`, `mw-panel`, `mw-row`, `mw-col`, `mw-note`, `mw-big`, `mw-grid` + `mw-cell` (`on`, `hot`, `good`, `dim`), `mw-meter > i`, `mw-sr`. Put game-specific CSS in a `<style>` element you append to `ctx.root` (scope class names with your id prefix).

## Instance

```ts
{ destroy(), reset(seed), probe(), play(kind) }
```
- `probe()`: small JSON-able rules snapshot (score, position, turn, phase...). Must **change when the player acts** and be a pure function of state.
- `play('win' | 'lose')`: **test bot**. It must drive the game through the same action functions your inputs call (not by setting state or calling `ctx.finish` directly) until the rules themselves end the run with that result. For puzzles it may use a solver or the hidden answer held in the closure, but it must submit through the real action. For real-time games call `update(1/60)` in a bounded loop. It runs synchronously inside the page; bound every loop.

## Design rules (checked by review, not just by the bot)

- A distinctive playfield and **one** visual motif that does gameplay work (a constellation shows adjacency, a moon phase shows time left, a mesa horizon marks the goal line...). Decorative marks are quieter than interactive pieces. Display type (Rye) is only for the title the shell already renders; HUD, rules and buttons use the existing Zilla Slab / Public Sans styles.
- Every gameplay signal pairs colour with a shape, label, icon or position: hostile = red + a mark, collectible = rose + a star, player = bone. Never colour alone. Contrast must stay readable on `--mw-night`/`--mw-role-surface`.
- Touch targets at least 44px. No hover-only controls. Mouse, touch and (where it fits) keyboard all work. Buttons are real `<button>`s with text or `aria-label`.
- A complete run is 30 seconds to 4 minutes and has visible progression (levels, rounds, rising difficulty, or a score target). A win is not trivially available at the start and a loss is not arbitrary.
- Teach the core action on the first screen: `how` is 1 to 2 sentences in plain verbs, `controls` lists the real inputs.
- Game file under about 250 lines. Reuse; keep rules readable.

## `meta.cover` art (tarot card, 100 x 140 space)

See the op list at the top of `src/core/cover.mjs`. 8 to 20 ops that depict **this game's playfield** with its motif, in palette names only. Start with `['stars', n, seed]`, a `moon`/`sun` or `con` (constellation), a `mesa` horizon, then the game's own pieces. Keep text out (fonts do not load in `<img>` SVG) except a numeral/glyph via `['text', ...]`. `npm run covers` regenerates `public/frontier/covers/*.svg`; the verifier screenshots show the cover on the first screen.

## `meta.smoke`

One REAL input the verifier performs after pressing Play, which must change `probe()`: `{ click: '.selector' }` (a CSS selector inside the stage), `{ key: 'ArrowLeft' }`, `{ tap: [fx, fy] }`, `{ drag: [fx1, fy1, fx2, fy2] }`, `{ hold: [fx, fy], ms }` (fractions of the stage box). For a key smoke, `ctx.pad` must provide that key. The verifier repeats it on a 390px touch viewport.

## Verify (every game, before reporting it done)

```powershell
cd source/frontier-games
npm run covers
npx vite --port <YOUR PORT> --strictPort        # run in the background
node scripts/verify.mjs --ids id1,id2 --base http://localhost:<YOUR PORT> --shots <scratch dir>
```
It opens each game **from the catalog**, checks the first screen, runs the real input, determinism of `reset`, a bot win, Play again, a bot loss, a 390px touch layout, and console/network errors, then writes `docs/arcade-90/verification/<id>.json`. Open the screenshots (`<id>-1-intro.png`, `-2-playing.png`, `-3-outcome.png`, `-4-mobile.png`) and fix anything clipped, cramped, off-brand or hard to read. `npx tsc --noEmit` must be clean for your files. A game is done only when the harness prints PASS **and** you have looked at it.

Do not edit `src/core`, `concepts.mjs`, scripts, or other games' files. Do not run git.
