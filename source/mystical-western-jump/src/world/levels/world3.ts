import type { LevelDef } from '../Level';
import { floor, rows, run } from './kit';

/** World 3 — Glitch Dimension. Phantoms, forgetful glitch blocks, sweeping lasers, and the Static Sovereign. */
export const PHASE_SHIFT: LevelDef = {
  id: '3-1',
  world: 2,
  name: 'Phase Shift',
  intro: 'Past the factory, the city stops making sense. Trust the rhythm, not the floor.',
  par: 120,
  music: 'glitch',
  terminals: [
    'OHM // This is where the Storm began. Phantoms only hurt while they are solid, and you can only stomp them then. Glitch blocks forget you after a moment. Keep moving.',
  ],
  chunks: [
    ['.........?h?', '', '', '..S..i.............p', ...floor('24#')],
    // Glitch stepping stones.
    [
      '...............*',
      '',
      '.................f',
      '....oo...oo...oo...oo...oo',
      '',
      '..............gg........gg',
      '.........gg........gg',
      '....gg......................gg',
      ...floor('3# 28. 3#'),
    ],
    // Phantoms under sweeping lasers.
    [
      run('32#'),
      '..........Z...........Z',
      '',
      '',
      '',
      '',
      '....o.o.o.o.o.o.o.o.o.o.o.o',
      '',
      '...............p...........p',
      ...floor('32#'),
    ],
    ['....C......n', ...floor('14#')],
    // Lifts and a slider under a rotor. The tower to the right has a soft wall.
    [
      run('32. 6='),
      run('18. R 13. 6='),
      run('32. % 4. ='),
      run('15. o.o.o.o. 9. % .T.o ='),
      run('15. 3M 14. % 4. ='),
      run('32. 6='),
      '',
      '',
      '',
      '',
      run('10. 3V 12. 3V 5. k'),
      ...floor('8# 22. 8#'),
    ],
    // Timed and glitch blocks together.
    [
      '.............*',
      '',
      '............ooo',
      '............222',
      '........gg.......gg',
      '...111...............111',
      '',
      ...floor('2# 26. 2#'),
    ],
    // Last stretch: a phantom, a hopper, a sweeping laser and a spring to the third shard.
    [
      '..........................*',
      '..........Z..............---',
      '',
      '',
      '',
      '',
      '',
      '....ooo',
      '',
      '......p......j.......B.......n...G',
      ...floor('36#'),
    ],
  ],
};

export const STATIC_THRONE: LevelDef = {
  id: '3-2',
  world: 2,
  name: 'The Static Throne',
  intro: 'The Static Sovereign holds the last fragment. Survive its patterns and strike its core.',
  par: 150,
  music: 'glitch',
  terminals: [
    'OHM // The Static Sovereign is holding the last fragment. It slams, it sprays, it calls drones. After a slam its core is exposed: land on it. Three hits per phase. You can do this, Vee.',
  ],
  chunks: [
    ['........?!?h', '', '', '..S..i', ...floor('24#')],
    // Gauntlet: glitch stones under a double rotor.
    [
      '......*.......Q',
      '',
      '',
      '',
      '......gg...gg...gg...gg',
      '...........................p',
      ...floor('4# 22. 4#'),
    ],
    // A low bunker with a hollow wall, then the last checkpoint.
    [
      '............*',
      '.........o.o.o',
      run('8. 8='),
      run('8. % 6. ='),
      run('8. % .T..o. = 6. C'),
      ...floor('28#'),
    ],
    // The arena. The door closes behind you.
    [
      run('44#'),
      ...rows(2, '. X 40. 2#'),
      run('. X 19. K 20. 2#'),
      run('. X 40. 2#'),
      run('. X 17. 6- 17. 2#'),
      run('. X 40. 2#'),
      run('. X 8. * 31. 2#'),
      run('. X 6. 5- 18. 5- 6. 2#'),
      ...rows(3, '. X 40. 2#'),
      ...floor('44#'),
    ],
  ],
};
