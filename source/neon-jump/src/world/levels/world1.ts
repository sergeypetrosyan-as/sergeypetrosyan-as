import type { LevelDef } from '../Level';
import { floor, rows, run } from './kit';

/** World 1 — Neon Downtown. Teaches running, jumping, stomping, prize blocks, lifts and secrets. */
export const ROOFTOP_RUN: LevelDef = {
  id: '1-1',
  world: 0,
  name: 'Rooftop Run',
  intro: 'The first Core Fragment fell somewhere past the rooftops. Go get it.',
  par: 95,
  music: 'city',
  terminals: [
    'OHM // Vee! The Static Storm cracked the Neon Core and scattered it across the city. Every district hides a fragment at its exit gate. Run right, jump on anything glitchy, and mind the drop.',
  ],
  chunks: [
    // Start: prize blocks and the first slime.
    [
      '.........?...?!?',
      '',
      '.....................o.o',
      '..S.i...ooo.........l....s',
      ...floor('28#'),
    ],
    // A staircase and the first gap.
    [
      '..........=..o',
      '.........==.o.o',
      '........===',
      '.......====......s',
      ...floor('11# 3. 10#'),
    ],
    // One-way rails: the high road has the first shard.
    [
      '..........*',
      '.........---',
      '',
      '...ooo..........ooo',
      '..-----........-----....&',
      '',
      '',
      '..........s...........s',
      ...floor('30#'),
    ],
    // Checkpoint.
    ['..o.o.o', '.....C....l', ...floor('14#')],
    // Floating blocks over a long drop, a drone, and a spring to the high rail.
    [
      '..............................ooo',
      '............................o.-----',
      '............................o',
      '................d...........o',
      '............ooo.............o',
      '............===...ooo',
      '......ooo.........===',
      '......===',
      '............................B',
      ...floor('4# 21. 11#'),
    ],
    // A building with a suspicious gap: the left wall is hollow.
    [
      '........o.o.o.o.o',
      '.....================.....*',
      '.....=..............=',
      '..==.=.o.o.o.o.o....=',
      '..==.%..............=',
      '..==o%.....T.....l..=..s',
      ...floor('24# 4. 6#'),
    ],
    // Wider gaps, slime pairs, a bobbing drone and a spring up to the third shard.
    [
      '...........................*',
      '.........................-----',
      '',
      '',
      '.....................f',
      '',
      '',
      '........oooo',
      '',
      '..............s..s........B',
      ...floor('8# 4. 8# 3. 17#'),
    ],
    // Final staircase and the exit gate.
    [
      '.........ooo',
      '.........===',
      '........====',
      '.......=====',
      '......======........l..G',
      ...floor('30#'),
    ],
  ],
};

export const BILLBOARD_HEIGHTS: LevelDef = {
  id: '1-2',
  world: 0,
  name: 'Billboard Heights',
  intro: 'Ride the lifts above the boulevard. The second fragment glows on the highest roof.',
  par: 120,
  rows: 24,
  music: 'city',
  terminals: [
    'OHM // Billboards hide more than adverts. Lifts run on a loop, so wait for them. Hoppers jump when you get close: land on them first.',
  ],
  chunks: [
    ['.........?.?&?', '', '', '..S..i.....n......s...l', ...floor('26#')],
    // A sliding platform over the gap.
    ['.......o.o.o.o.o', '....................d', '.....MMM', '..........................s', ...floor('4# 12. 14#')],
    // A lift up to the rooftops.
    [
      run('14. o.o.o'),
      ...rows(2, '12. 18#'),
      ...rows(4, '9. o 2. 18#'),
      run('12. 18#'),
      run('8. 3V . 18#'),
      ...floor('30#'),
    ],
    // Rooftop gaps; a shard on a ledge inside the second gap.
    [
      '........ooo..........oooo',
      '',
      '...............j',
      ...rows(2, '8# 3. 10# 4. 9#'),
      run('8# 3. 10# . * 2. 9#'),
      run('8# 3. 10# . 2- . 9#'),
      ...rows(4, '8# 3. 10# 4. 9#'),
      ...floor('8# 3. 10# 4. 9#'),
    ],
    ['...o.o.o', '....C.....n', ...rows(8, '16#'), ...floor('16#')],
    // Sliding platforms and islands across the long drop; a spring to the high shard.
    [
      '.........................*',
      '........................---',
      '',
      '..............................d',
      '...................f',
      '.....................o.o.o.o',
      '..................B..MMM',
      '......o.o.o....====............===',
      run('4# . 3M 30. 4#'),
      ...rows(7, '4# 34. 4#'),
      ...floor('4# 34. 4#'),
    ],
    // A billboard with a hollow floor; the spring under it is the way in.
    [
      run('14. 8='),
      run('14. = 6. ='),
      '..............=o..T.o=',
      run('14. = 6. ='),
      run('14. = 6. ='),
      run('14. 2= 2% 4='),
      '................o',
      '................o',
      '................o',
      '................B.......s.....l',
      ...floor('34#'),
    ],
    // Final climb to the exit roof.
    [
      '...........................*',
      '..........................---',
      '.................ooo',
      '...................j..........n...G',
      ...rows(4, '16. 8# 6. 8#'),
      ...rows(3, '6. 6# 4. 8# 6. 8#'),
      run('6. 6# 3V . 8# 6. 8#'),
      ...floor('38#'),
    ],
  ],
};
