import type { LevelDef } from '../Level';
import { floor, rows, run } from './kit';

/** World 2 — Cyber Factory. Conveyors, crumbling plates, turrets, lasers, crushers and live floors. */
export const ASSEMBLY_LINE: LevelDef = {
  id: '2-1',
  world: 1,
  name: 'Assembly Line',
  intro: 'The Static took over the factory floor. Keep moving and follow the belts.',
  par: 110,
  music: 'factory',
  terminals: [
    'OHM // The factory runs on Static now. Lasers flicker before they fire. Crumbling plates drop if you stand on them, so keep running. Spikers are all edges: jump over, never on.',
  ],
  chunks: [
    ['.........?.?!?', '', '', '..S..i.................s', run('12# 8> 6#'), ...rows(2, '26#')],
    // A crumbling bridge, then a spiker.
    ['........oooo', '', '.........................k', run('6# 12c 12#'), ...rows(2, '6# 12. 12#')],
    // Laser gate and a turret lane with crates for cover.
    [
      run('10. 5#'),
      '............L',
      '',
      '',
      '.................o.o.o',
      '....................=',
      '.......=............=........t',
      ...floor('32#'),
    ],
    ['....C.......', ...floor('14#')],
    // Crusher corridor ending in a live floor.
    [
      run('36#'),
      '........PP......PP......PP',
      '',
      '',
      '.............*',
      '',
      '.....o.o.o.o.o.o.o.o.o.o.o.o',
      '',
      '',
      run('29# 5E 2#'),
      ...rows(2, '36#'),
    ],
    // Timed blocks over the drop.
    [
      '..............d.*',
      '.........ooo.......ooo',
      '....ooo.................ooo',
      '..............111',
      '.........222.......222',
      '....111.................111',
      ...floor('2# 28. 4#'),
    ],
    // A rotor, and a hollow ceiling above a spring.
    [
      run('26. 8='),
      run('26. = 6. ='),
      run('26. = o.o.o. ='),
      run('26. = ...T.. ='),
      run('18. 11= 2% 3='),
      run('18. 11= 2% 3='),
      '..........R',
      '.............................o',
      '.............................o',
      '.............................o',
      '....................s........B',
      ...floor('34#'),
    ],
    // Crate stack with the last shard, then the exit.
    [
      '..................*',
      ...rows(3, '17. 3='),
      run('14. 2= . 3='),
      run('14. 2= . 3= 4. k 3. G'),
      run('6> 24#'),
      ...rows(2, '30#'),
    ],
  ],
};

export const REACTOR_CORE: LevelDef = {
  id: '2-2',
  world: 1,
  name: 'Reactor Core',
  intro: 'The reactor pulses in waves. Read the rhythm, cross between the pulses.',
  par: 120,
  music: 'factory',
  terminals: [
    'OHM // Reactor floors arc in waves. Watch for the warning crackle and cross between pulses. Hold Shift to sprint if you need the speed.',
  ],
  chunks: [
    ['........?&?', '', '', '..S..i...........j', ...floor('24#')],
    // Live floor in waves, with safe rails above.
    [
      '.............d',
      '..........................*',
      '.......ooo......ooo......ooo',
      '......-----....-----....-----',
      '',
      '',
      '',
      run('4# 5E 2# 5E 2# 5E 2# 5E 6#'),
      ...rows(2, '36#'),
    ],
    // A double rotor over a block bridge, then a sweeping laser.
    [
      run('15. 13#'),
      '..................Z',
      '........*',
      '',
      '',
      '........Q',
      '',
      run('6. 5='),
      '',
      '.......................j',
      ...floor('4# 9. 17#'),
    ],
    ['.....C', ...floor('14#')],
    // Crushers over a crumbling bridge. The ceiling has a soft spot above the rails.
    [
      run('18. 11='),
      run('18. = 9. ='),
      run('18. = .o.o.T.o. ='),
      run('18. = 9. ='),
      run('22# 3% 13#'),
      '......PP......PP',
      run('22. 3-'),
      '',
      run('22. 3-'),
      '.........oo.oo.oo',
      '',
      run('26. = 4. = 4. t'),
      run('10# 11c 17#'),
      ...rows(2, '10# 11. 17#'),
    ],
    ['......ooo.....ooo', '', '....j.....k......j', ...floor('20#')],
    // Timed stairs across the reactor pit, a laser gate at the end.
    [
      run('24. 5#'),
      '..........................L',
      '',
      '..............*',
      '',
      '.............ooo',
      '.............111',
      '........ooo.......ooo',
      '........222.......222',
      '...ooo.................ooo',
      '...111.................111.......G',
      ...floor('2# 26. 8#'),
    ],
  ],
};
