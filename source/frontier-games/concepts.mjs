/**
 * The 90 new games, as concepts. Single source for ids, titles, categories and the
 * three design questions (what the player DOES repeatedly, what DECIDES the outcome,
 * why they RETRY). Batch b (1..9) = the b-th game of each category, so every batch of
 * ten covers ten different kinds of play. Nothing here is generated: add a game by
 * adding a row, a src/meta/<id>.mjs and a src/games/<id>.ts.
 */
export const CATEGORIES = [
  { id: 'timing', name: 'Timing', suit: 'Bells', blurb: 'One well-judged moment decides it.' },
  { id: 'deduction', name: 'Deduction', suit: 'Lanterns', blurb: 'Clues in, a single answer out.' },
  { id: 'spatial', name: 'Spatial', suit: 'Mesas', blurb: 'Shapes, paths and fit.' },
  { id: 'planning', name: 'Planning', suit: 'Wagons', blurb: 'Decide first, watch it run.' },
  { id: 'simulation', name: 'Simulation', suit: 'Wells', blurb: 'Nudge a living system.' },
  { id: 'exploration', name: 'Exploration', suit: 'Compasses', blurb: 'Unknown ground, limited sight.' },
  { id: 'action', name: 'Action', suit: 'Spurs', blurb: 'Hands first, thinking second.' },
  { id: 'memory', name: 'Memory', suit: 'Stars', blurb: 'Hold it in your head.' },
  { id: 'duel', name: 'Duel', suit: 'Swords', blurb: 'A rival who answers back.' },
  { id: 'craft', name: 'Craft', suit: 'Cogs', blurb: 'Build it, then let physics judge.' },
];

// [id, title, category, catalog line, does (repeatedly), decides (skill), retry (why again)]
const ROWS = [
  // ---- timing
  ['noon-draw', 'Noon Draw', 'timing', 'Wait for the bell, then draw before the gunslinger does.', 'Tap the instant a bell rings at a random moment.', 'Patience against speed: tapping early forfeits the round.', 'Beat the rival’s time over five duels, then beat your own best.'],
  ['windmill-gap', 'Windmill Gap', 'timing', 'Flick a pebble through the gaps of a turning windmill.', 'Release a pebble that needs a moment to cross the field.', 'Predict where a gap will be when the pebble arrives, not where it is now.', 'Reach the next, faster sail before the pebbles run out.'],
  ['telegraph-taps', 'Telegraph Taps', 'timing', 'Listen to the rhythm on the wire and tap it back.', 'Watch and hear a short rhythm, then reproduce it.', 'Judge short and long taps and the gaps between them.', 'Longer messages each round; one stray tap ends the line.'],
  ['hoofbeat', 'Hoofbeat', 'timing', 'Keep the trot after the beat goes silent.', 'Tap on a beat that fades out halfway through each bar.', 'Hold a tempo in your head without any cue.', 'Each tighter average unlocks a faster horse.'],
  ['pour-the-shot', 'Pour the Shot', 'timing', 'Hold to pour, let go on the line you can no longer see.', 'Hold to fill glasses whose fill line disappears as you pour.', 'Estimate fill rate and release without feedback.', 'Total spillage is a score you can lower.'],
  ['lasso-loop', 'Lasso Loop', 'timing', 'Time a swinging loop to drop over the passing steer.', 'Release a spinning loop whose size pulses.', 'Match the loop’s size and the steer’s position in one instant.', 'Bigger herds, faster steers, three misses allowed.'],
  ['fuse-walk', 'Fuse Walk', 'timing', 'Snuff each burning fuse as late as you dare.', 'Cut one of several burning fuses of different speeds.', 'Push your luck: later cuts score more, too late blows the crate.', 'Chase a bigger total without a single blast.'],
  ['count-to-seven', 'Count to Seven', 'timing', 'Stop a hidden clock at exactly seven seconds.', 'Start a clock that hides itself, then stop it.', 'Your own sense of elapsed time, with no help.', 'Get closer to 7.000 with each of ten tries.'],
  ['roundhouse', 'Roundhouse', 'timing', 'Spin the turntable onto the right track before the engine rolls in.', 'Rotate a turntable to match an approaching engine’s track.', 'Choose the shortest turn and stop it in time.', 'Longer trains of engines arrive each shift.'],

  // ---- deduction
  ['sheriffs-gallows', 'Who Shot the Sheriff', 'deduction', 'Fit five statements on a grid until one suspect is left.', 'Mark who is cleared or implicated using each new clue.', 'Combine clues so only one suspect stays consistent.', 'A new case with new suspects each time, fewer accusations allowed.'],
  ['vault-cipher', 'Vault Cipher', 'deduction', 'Crack the four-symbol vault code from tumbler feedback.', 'Guess a code and read the exact and misplaced counts.', 'Pick guesses that cut the possibilities most.', 'Fewer guesses than last time.'],
  ['star-sweep', 'Star Sweep', 'deduction', 'Clear the sky without touching a hidden star.', 'Uncover cells whose numbers count neighbouring stars.', 'Reason which cells are certain and which are guesses.', 'Bigger skies and a faster clear time.'],
  ['saloon-liars', 'Saloon Liars', 'deduction', 'Five patrons, each lies or tells the truth. Who is who?', 'Read patron statements and label each honest or lying.', 'Find the one labeling that makes every statement consistent.', 'Statements get tangled across rounds.'],
  ['weigh-nuggets', 'Weigh the Nuggets', 'deduction', 'One of nine nuggets is fake. You have two weighings.', 'Place nuggets on a balance and read the tilt.', 'Plan weighings that split the possibilities.', 'Nine becomes twenty-seven with three weighings.'],
  ['dowsing-rod', 'Dowsing Rod', 'deduction', 'Find the buried spring from how warm each probe feels.', 'Probe a spot and get a distance ring back.', 'Triangulate the spring from overlapping rings.', 'Fewer probes for a higher rank.'],
  ['cipher-wheel', 'Cipher Wheel', 'deduction', 'Turn a brass wheel until the telegram reads true.', 'Shift the alphabet wheel and read the decoded line.', 'Use common letters and word shapes to find the shift.', 'Harder telegrams with fewer hints.'],
  ['rule-finder', 'Rule Finder', 'deduction', 'Test cards against a secret rule, then name the rule.', 'Offer a card and be told whether the dealer accepts it.', 'Choose tests that confirm or break your guess about the rule.', 'A fresh secret rule every deal.'],
  ['iron-nonogram', 'Iron Nonogram', 'deduction', 'Brand the picture from the numbers on its edges.', 'Fill or mark cells using the row and column runs.', 'Deduce which cells must be filled, no guessing needed.', 'Larger brands, a faster time.'],

  // ---- spatial
  ['wagon-jam', 'Wagon Jam', 'spatial', 'Slide the wagons aside to free the one carrying the mail.', 'Slide blocks along their lanes inside a yard.', 'Order the slides so the mail wagon reaches the gate.', 'Fewer moves than the posted par.'],
  ['corral-fit', 'Corral Fit', 'spatial', 'Pack every fence piece into the corral without a gap.', 'Rotate and place shaped pieces on a grid.', 'Which piece goes where so the last one still fits.', 'New corrals, new piece sets.'],
  ['moonbeam-mirrors', 'Moonbeam Mirrors', 'spatial', 'Turn the mirrors to carry moonlight to every lantern.', 'Rotate mirrors and watch the beam re-route.', 'Trace reflections ahead to light all targets.', 'More lanterns and prisms per level.'],
  ['aqueduct', 'Aqueduct', 'spatial', 'Rotate the stone channels until water reaches every trough.', 'Turn pipe tiles a quarter at a time.', 'Connect the whole network from the spring to the troughs.', 'Larger grids with dead ends and loops.'],
  ['lantern-row', 'Lantern Row', 'spatial', 'Every click flips a lantern and its neighbours. Light them all.', 'Toggle a cell that also toggles its neighbours.', 'Find the set of clicks that solves the board.', 'Larger rows with fewer spare moves.'],
  ['map-fold', 'Map Fold', 'spatial', 'Fold the paper map until every mark lands on another.', 'Choose a fold line and fold a grid onto itself.', 'See what each fold overlaps before you commit.', 'Bigger maps with fewer permitted folds.'],
  ['dice-drift', 'Dice Drift', 'spatial', 'Roll a die across the grid so its faces meet the marks.', 'Tip the die one square and read its new top face.', 'Plan a rolling path where the top face matches each mark.', 'Longer routes with fewer rolls.'],
  ['powder-push', 'Powder Push', 'spatial', 'Push the powder kegs onto the marked spots.', 'Step and push boxes, never pull.', 'Avoid pushing a keg into a corner it cannot leave.', 'Tighter yards, undo counts as a move.'],
  ['orrery-rings', 'Orrery Rings', 'spatial', 'Turn nested brass rings until the gaps line up.', 'Rotate concentric rings, each moving its neighbour a little.', 'Work out how turns couple the rings.', 'More rings, fewer turns.'],

  // ---- planning
  ['mail-route', 'Mail Route', 'planning', 'Draw one trail that reaches every post office before dusk.', 'Pick the next stop on a map with distances and a limited day.', 'Route order under a distance budget.', 'Shorter loops earn more stars.'],
  ['pack-the-wagon', 'Pack the Wagon', 'planning', 'Load the wagon for the trail without breaking its axle.', 'Choose goods with weight and value.', 'Maximise value under a weight limit, with one fragile rule.', 'A different trail and different needs each time.'],
  ['shift-roster', 'Shift Roster', 'planning', 'Put every hand on a shift so no post stands empty.', 'Assign workers to time slots with their own limits.', 'Satisfy all constraints at once.', 'More hands and stranger constraints.'],
  ['program-courier', 'Program the Courier', 'planning', 'Queue the courier’s moves, press go, and watch it run.', 'Lay out instruction cards, then run the whole program.', 'A short sequence that handles the whole map.', 'Fewer cards for a gold badge.'],
  ['barn-raising', 'Barn Raising', 'planning', 'Order the jobs so nothing is built before its footing.', 'Sequence build tasks with prerequisites and a deadline.', 'Find an order that obeys every prerequisite and the clock.', 'Larger barns and tighter deadlines.'],
  ['fair-calendar', 'Fair Calendar', 'planning', 'Pick the fair events that do not collide and pay best.', 'Accept or reject events on a timeline.', 'Best total value among non-overlapping events.', 'A tougher timetable and a higher quota.'],
  ['telegraph-lines', 'Telegraph Lines', 'planning', 'Wire every town together on a budget.', 'Connect pairs of towns with costed wire.', 'Choose cheap links that still connect everyone.', 'A tighter budget each map.'],
  ['drive-pace', 'Cattle Drive Pace', 'planning', 'Set each day’s pace so the herd reaches market alive.', 'Choose a pace for each of ten days of the drive.', 'Trade speed against water, strength and weather.', 'Different routes and weather forecasts.'],
  ['crop-rotation', 'Crop Rotation', 'planning', 'Plant four seasons so no field starves.', 'Assign a crop to each plot for each season.', 'Rotate so soil recovers and demand is met.', 'More plots and a harder market.'],

  // ---- simulation
  ['saloon-prices', 'Saloon Prices', 'simulation', 'Set the price of a drink and watch the night’s crowd answer.', 'Set prices each night and read the takings.', 'Find the price where demand and profit balance.', 'Reach the savings goal in thirty nights.'],
  ['pump-house', 'Pump House', 'simulation', 'Keep the tank level while the town’s thirst rises and falls.', 'Adjust the pump rate in real time.', 'Anticipate demand swings and stay inside the band.', 'Survive longer days with stranger demand.'],
  ['firebreak', 'Firebreak', 'simulation', 'Cut breaks in the dry brush before the wildfire turns.', 'Place a limited number of firebreaks, then watch the fire spread.', 'Where fire will run given wind and fuel.', 'Save more acres and homesteads.'],
  ['coyote-balance', 'Coyote Balance', 'simulation', 'Set the bounty so coyotes and rabbits both survive the year.', 'Adjust a bounty each season and watch two populations.', 'Keep a predator and prey cycle from collapsing.', 'Hold the balance for more years.'],
  ['fever-town', 'Fever Town', 'simulation', 'Close doors and send doctors before the fever empties the town.', 'Choose who is quarantined and where the doctor goes each day.', 'Slow the spread with limited actions.', 'Fewer cases than the last outbreak.'],
  ['boomtown-market', 'Boomtown Market', 'simulation', 'Buy low in one camp and sell high in the next.', 'Move between camps, buy and sell goods with shifting prices.', 'Read price trends and plan your trips.', 'Higher fortune target in thirty days.'],
  ['observatory-power', 'Observatory Power', 'simulation', 'Balance lamp, motor and cooling on one failing battery.', 'Slide power between loads every few seconds.', 'Keep temperature, light and charge all in range.', 'Hold the night for longer.'],
  ['rail-depot', 'Rail Depot', 'simulation', 'Load cars and release trains so cargo never piles up.', 'Choose which train to load and when to dispatch.', 'Throughput against the depot’s capacity.', 'More cargo flows each shift.'],
  ['ice-house', 'Ice House', 'simulation', 'Open and close vents to keep the ice through the summer.', 'Toggle vents and shades as the heat shifts hour by hour.', 'Use cold nights and shade to slow the melt.', 'More ice left on the last day.'],

  // ---- exploration
  ['fog-mesa', 'Fog Mesa', 'exploration', 'Cross the mesa as fog lifts only around your lantern.', 'Step through unseen terrain with limited water.', 'Which route to risk when you can only see two squares.', 'A new mesa every ride.'],
  ['cave-echo', 'Cave Echo', 'exploration', 'Ping the dark and navigate by the echoes.', 'Send a ping and read where walls ring back.', 'Build a map from sparse echoes.', 'Bigger caves, quieter pings.'],
  ['star-wander', 'Star Wander', 'exploration', 'Wander the sky and complete the hidden constellations.', 'Hop between stars to reveal shapes.', 'Spot which neighbours form a figure.', 'Collect all the constellation cards.'],
  ['ghost-town-rooms', 'Ghost Town Rooms', 'exploration', 'Open the doors of a dead town and find the one safe key.', 'Choose a door, read the room, take or leave things.', 'Which items unlock which doors.', 'Different towns and different keys.'],
  ['compass-maze', 'Compass Maze', 'exploration', 'Find the way out with a compass and a step counter.', 'Walk a maze you can only sense by feel.', 'Remember what you have walked and not walked.', 'Get out in fewer steps.'],
  ['sandstorm-beacons', 'Sandstorm Beacons', 'exploration', 'Light beacons to widen what you can see before the storm.', 'Walk and light beacons while sight shrinks.', 'Spend beacon fuel where it opens the best path.', 'More storms, less fuel.'],
  ['deep-shaft', 'Deep Shaft', 'exploration', 'Dig down for ore and still climb out with air left.', 'Dig a tile and decide whether to go on.', 'Ore against breathing time on the way back.', 'Deeper veins pay more.'],
  ['trail-events', 'Trail Events', 'exploration', 'Pick forks on the trail and meet what the road brings.', 'Choose a path at each fork and face the event.', 'Manage food, water and morale along the way.', 'Different roads, different luck.'],
  ['salt-mirage', 'Salt Mirage', 'exploration', 'Find the real water among the mirages of a salt flat.', 'Step and read shimmering signs, some of them lies.', 'Which signs repeat so can be trusted.', 'Wider flats, more mirages.'],

  // ---- action
  ['bullet-moon', 'Bullet Moon', 'action', 'Thread your lantern through the moon’s slow storm of shots.', 'Move to avoid patterned shot rings.', 'Reading patterns and slipping through gaps.', 'Survive the whole night.'],
  ['tumble-run', 'Tumble Run', 'action', 'Swipe between three lanes ahead of the tumbleweeds.', 'Change lanes and jump hazards.', 'Early lane choice as hazards approach.', 'Further distance each run.'],
  ['dust-devil', 'Dust Devil', 'action', 'Grow a whirlwind by swallowing whatever is smaller than you.', 'Steer a vortex through objects.', 'Which objects are safe to eat now.', 'Reach the size of a storm.'],
  ['gatling-gallery', 'Gatling Gallery', 'action', 'Hit the targets, spare the townsfolk, watch the ammo.', 'Shoot moving targets with limited bullets and reloads.', 'Aim lead and ammo budget.', 'A better score than your last round.'],
  ['vulture-glide', 'Vulture Glide', 'action', 'One button lifts a vulture through the canyon’s needles.', 'Tap to flap against gravity.', 'Rhythm of taps through the gaps.', 'A higher run than last time.'],
  ['herding-dog', 'Herding Dog', 'action', 'Run the dog around the herd and push it into the pen.', 'Move a dog that the cattle flee from.', 'Where to stand to push the herd.', 'Bigger herds, shorter time.'],
  ['spark-chain', 'Spark Chain', 'action', 'One spark, one chance to set off the whole field.', 'Drop one spark and watch the chain.', 'Where one spark reaches most of the field.', 'More fuses to ignite each level.'],
  ['gopher-holes', 'Gopher Holes', 'action', 'Whack the gophers; leave the sheriff’s hat alone.', 'Tap pop-ups before they dive.', 'Go or no-go on each pop-up.', 'Faster pop-ups, bigger scores.'],
  ['comet-sling', 'Comet Sling', 'action', 'Fling a comet around planets to strike the target.', 'Drag back and release a comet under gravity.', 'Aim and power to bend the path.', 'Fewer launches than par.'],

  // ---- memory
  ['tarot-pairs', 'Tarot Pairs', 'memory', 'Flip the cards and match every arcana pair.', 'Flip two cards and remember where they were.', 'Which face-down card to trust.', 'Fewer flips for a higher rank.'],
  ['shell-game', 'Shell Game', 'memory', 'Keep your eyes on the nugget as the cups slide.', 'Watch the cups swap, then pick.', 'Follow one object through shuffles.', 'Faster shuffles each round.'],
  ['constellation-recall', 'Constellation Recall', 'memory', 'A shape flashes in the stars; draw it back.', 'See a constellation, then click its stars.', 'Hold a pattern in memory.', 'Bigger constellations each night.'],
  ['bell-tower', 'Bell Tower', 'memory', 'Repeat the ringing order of the town bells.', 'Watch a sequence and echo it.', 'Hold a growing sequence.', 'Longest peal wins.'],
  ['spot-the-change', 'Spot the Change', 'memory', 'The town changes between blinks. What moved?', 'Compare the same scene before and after a flash.', 'Notice small differences.', 'Subtler changes each round.'],
  ['wanted-posters', 'Wanted Posters', 'memory', 'Study the poster, then identify the outlaw in the lineup.', 'Study a face, then pick from a lineup.', 'Remember details.', 'More outlaws, shorter looks.'],
  ['brand-sequence', 'Brand Sequence', 'memory', 'Work out which mark comes next in each row.', 'See a pattern of marks and pick the next one.', 'Spot the underlying rule.', 'Harder rules each round.'],
  ['running-count', 'Running Count', 'memory', 'Keep a running tally as cards fly past.', 'Update a count with each card.', 'Keep a number in memory under pressure.', 'Faster decks.'],
  ['lantern-path', 'Lantern Path', 'memory', 'Lanterns light a path once. Walk it from memory.', 'Watch lit tiles, then repeat the path.', 'Spatial memory of a route.', 'Longer paths.'],

  // ---- duel
  ['canyon-connect', 'Canyon Connect', 'duel', 'Drop stones to line up four before the rival does.', 'Drop a stone into a column.', 'Threats and blocks several turns ahead.', 'A smarter rival each time.'],
  ['mesa-draughts', 'Mesa Draughts', 'duel', 'Jump the rival’s pieces across a small checkerboard.', 'Move and jump pieces on a small board.', 'Trade pieces without leaving yourself exposed.', 'Beat harder opponents.'],
  ['stone-piles', 'Stone Piles', 'duel', 'Take stones from the piles; whoever takes the last loses.', 'Remove stones from one pile each turn.', 'Leave the rival in a lost position.', 'Beat the rival’s strategy.'],
  ['land-grab', 'Land Grab', 'duel', 'Stake claims on a grid and fence in more land than the rival.', 'Place a stake each turn.', 'Enclose territory and cut off the rival.', 'Bigger boards and smarter opponents.'],
  ['bluff-dice', 'Bluff Dice', 'duel', 'Bid on hidden dice, call the bluff, keep your nerve.', 'Bid or challenge each turn.', 'Probability and reading the rival.', 'Survive more rounds.'],
  ['tarot-trick', 'Tarot Trick', 'duel', 'Win tricks with a hand of tarot cards.', 'Play one card to a trick each turn.', 'When to spend a high card.', 'Beat the rival over five tricks.'],
  ['marshal-chase', 'Marshal Chase', 'duel', 'Corner the outlaw on a map of back alleys.', 'Move your marshals each turn.', 'Cut off every escape.', 'Fewer turns to catch.'],
  ['gavel-auction', 'Gavel Auction', 'duel', 'Bid for lots against rivals with hidden budgets.', 'Place a bid per lot.', 'Bid enough to win, not more.', 'Beat rival bidders by value.'],
  ['sowing-pits', 'Sowing Pits', 'duel', 'Sow seeds around the pits and capture the rival’s store.', 'Pick a pit and sow its seeds.', 'Plan captures and extra turns.', 'Beat a stronger rival.'],

  // ---- craft
  ['sand-channels', 'Sand Channels', 'craft', 'Draw ramps so falling sand fills every cup.', 'Draw ledges, release the sand.', 'Slope and placement of ledges.', 'Fewer ledges, more cups.'],
  ['plank-bridge', 'Plank Bridge', 'craft', 'Plant pillars so the wagon crosses the span.', 'Place support pillars under a span.', 'Where each load will stress the planks.', 'Heavier wagons, wider gaps.'],
  ['domino-fall', 'Domino Fall', 'craft', 'Stand the dominoes so one push topples the lot.', 'Place dominoes and tip the first.', 'Spacing and angles of the chain.', 'Longer chains.'],
  ['wind-cannon', 'Wind Cannon', 'craft', 'Set angle and charge, read the wind, hit the target.', 'Adjust angle, power, then fire.', 'Account for wind and distance.', 'Fewer shots per target.'],
  ['balance-mobile', 'Balance Mobile', 'craft', 'Hang the weights so the mobile hangs level.', 'Place weights on arms of different length.', 'Torque: weight times distance.', 'Bigger mobiles.'],
  ['canal-lock', 'Canal Lock', 'craft', 'Open the sluices in the right order to lift the barge.', 'Open and close valves between chambers.', 'Water levels and order of valves.', 'Longer canals.'],
  ['cog-train', 'Cog Train', 'craft', 'Mesh the cogs so the last one turns the right way.', 'Place gears between a motor and a goal.', 'Gear ratios and directions.', 'Harder machines.'],
  ['rope-cut', 'Rope Cut', 'craft', 'Cut the ropes in order to drop the lantern in the lamp.', 'Slice ropes as the lantern swings.', 'Cut order and timing.', 'More ropes, more stars.'],
  ['pigment-mix', 'Pigment Mix', 'craft', 'Blend the three pigments to match the sunset swatch.', 'Slide pigment amounts to mix colors.', 'How the primaries blend.', 'Closer match each round.'],
];

export const CONCEPTS = ROWS.map(([id, title, category, line, does, decides, retry], i) => {
  const ci = CATEGORIES.findIndex((c) => c.id === category);
  const index = ROWS.slice(0, i).filter((r) => r[2] === category).length; // 0..8 within its category
  return { id, title, category, line, does, decides, retry, batch: index + 1, card: index + 1, route: `./games/${id}/` };
});
