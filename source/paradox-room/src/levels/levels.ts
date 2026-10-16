// Authoritative level data. Legend: # solid, . empty, @ start, E exit, * crystal, $ shard,
// a-h portal letters (paired), 1 rollL lever, 2 rollR lever, 3 pitchA lever, 4 pitchB lever,
// S/T switches, P/Q/R plates, D/F/G doors (linked via `links`).
// Layers are indexed [z][y]; z grows away from the viewer. Every level here is proven
// solvable by `npm run check:levels` (breadth-first search over the whole game state).
import type { FoldKind, LevelDef } from '../core/types.ts';
import { compileLevel } from './compile.ts';

const ALL: FoldKind[] = ['rollL', 'rollR', 'pitchA', 'pitchB'];
const ROLL: FoldKind[] = ['rollL', 'rollR'];

const MARGIN = { name: 'A Margin', free: [] as FoldKind[], layers: [['####', '#h$#', '####']] };

export const LEVEL_DEFS: LevelDef[] = [
  // ------------------------------------------------------------------ Chapter 1
  {
    id: '1-1',
    chapter: 0,
    name: 'First Fold',
    objective: 'Reach the gate. A pillar stands in the way.',
    intro: 'The House begins as a plain hall. Press Q or F to turn the room a quarter turn.',
    hints: [
      'The pillar blocks the floor, but every wall can become the floor.',
      'Keep turning the same way. Each fold drops you onto the new floor.',
    ],
    rooms: [
      {
        name: 'The Hall',
        free: ROLL,
        layers: [['########', '#......#', '#.##...#', '#.#....#', '#@#...E#', '########']],
      },
    ],
  },
  {
    id: '1-2',
    chapter: 0,
    name: 'Two Axioms',
    objective: 'Collect both axioms, then reach the gate.',
    intro: 'Axioms are the facts the House is built on. The gate stays sealed until you hold every one.',
    hints: [
      'One axiom sits in a corner of the ceiling; a wall can carry you to it.',
      'The pressure plate opens the door in the divider. Stepping on it is enough.',
    ],
    secret: ['h'],
    rooms: [
      {
        name: 'The Divided Hall',
        free: ROLL,
        layers: [['#########', '#*..#..h#', '#...#...#', '#...#...#', '#@P.D.*E#', '#########']],
      },
      MARGIN,
    ],
    links: { D: 'P' },
  },
  {
    id: '1-3',
    chapter: 0,
    name: 'Quiet Corners',
    objective: 'Collect the axiom, then reach the gate.',
    intro: 'When a fold leaves you with no floor beneath you, you fall to the new one. Use that.',
    hints: [
      'Some corners can only be reached by falling around the room.',
      'Fold so the wall beside the axiom becomes the floor, then walk to it.',
    ],
    rooms: [
      {
        name: 'The Quiet Hall',
        free: ROLL,
        layers: [
          ['########', '########', '########', '########', '########', '########'],
          ['########', '#.E#*..#', '#......#', '#@#....#', '##.#..##', '########'],
          ['########', '########', '########', '########', '########', '########'],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Chapter 2
  {
    id: '2-1',
    chapter: 1,
    name: 'The Box',
    objective: 'Collect the axiom, then reach the gate.',
    intro: 'Rooms have a near wall and a far wall too. X and V pitch the room toward you or away.',
    hints: [
      'The far wall and the near wall can be floors now.',
      'Pitch the room, then look for what the new floor lets you reach.',
    ],
    rooms: [
      {
        name: 'The Box',
        free: ALL,
        layers: [
          ['#####', '#####', '#####', '#####', '#####'],
          ['#####', '#..##', '#*###', '##E@#', '#####'],
          ['#####', '#..##', '##..#', '#...#', '#####'],
          ['#####', '#####', '#####', '#####', '#####'],
        ],
      },
    ],
  },
  {
    id: '2-2',
    chapter: 1,
    name: 'The Lever Room',
    objective: 'Collect both axioms, then reach the gate. Free folds are locked; use the brass levers.',
    intro: 'Some rooms refuse your hand. Brass levers fold them for you: stand at one and press E or Space.',
    hints: [
      'Each lever always performs the same fold. Read the bar on its base before you pull.',
      'Pulling a lever may drop you onto another wall. Look for the next lever from there.',
    ],
    secret: ['h'],
    rooms: [
      {
        name: 'The Lever Room',
        free: [],
        layers: [
          ['######', '######', '######', '######', '######'],
          ['######', '##23.#', '#*##.#', '#4#*E#', '######'],
          ['######', '#h#1.#', '#.##.#', '#..@.#', '######'],
          ['######', '######', '######', '######', '######'],
        ],
      },
      MARGIN,
    ],
  },
  {
    id: '2-3',
    chapter: 1,
    name: 'Seam',
    objective: 'Collect the axiom, then reach the gate. A door blocks the way.',
    intro: 'Switches are reversible. Flip one and the door it controls opens or closes.',
    hints: [
      'The switch is a pale square. Stand on it or beside it and press E.',
      'An open door is empty space; a closed door is solid wall. Fold accordingly.',
    ],
    links: { D: 'S' },
    rooms: [
      {
        name: 'The Seam',
        free: ALL,
        layers: [
          ['######', '######', '######', '######', '######'],
          ['######', '#...##', '#..#.#', '#.#D.#', '######'],
          ['######', '#.#..#', '#.S#.#', '#E@#*#', '######'],
          ['######', '######', '######', '######', '######'],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Chapter 3
  {
    id: '3-1',
    chapter: 2,
    name: 'Two Rooms',
    objective: 'Collect the axiom, then reach the gate.',
    intro: 'Violet rings are portals. Each room remembers its own orientation while you are away.',
    hints: [
      'A ring may have no floor under it until its room is folded.',
      'Fold the far room while you are in it, then walk back through the ring.',
    ],
    rooms: [
      {
        name: 'Near Room',
        free: ROLL,
        layers: [
          ['#######', '#######', '#######', '#######', '#######', '#######'],
          ['#######', '#...a.#', '#.#...#', '#.....#', '#@#..##', '#######'],
          ['#######', '#######', '#######', '#######', '#######', '#######'],
        ],
      },
      {
        name: 'Far Room',
        free: ROLL,
        layers: [
          ['#######', '#######', '#######', '#######', '#######', '#######'],
          ['#######', '#*.#.a#', '##....#', '#...#.#', '#.#.E##', '#######'],
          ['#######', '#######', '#######', '#######', '#######', '#######'],
        ],
      },
    ],
  },
  {
    id: '3-2',
    chapter: 2,
    name: 'Through the Margin',
    objective: 'Collect both axioms, then reach the gate.',
    intro: 'Rooms can be folded in any direction here, and a ring still leads where it led.',
    hints: [
      'Fold each room while you stand in it; the other room keeps its own turn.',
      'The axiom in the first room is reached by falling, not walking.',
    ],
    secret: ['h'],
    rooms: [
      {
        name: 'First Room',
        free: ALL,
        layers: [
          ['######', '######', '######', '######', '######'],
          ['######', '##..##', '#@#.##', '##.#.#', '######'],
          ['######', '##*#h#', '#.#..#', '#a...#', '######'],
          ['######', '######', '######', '######', '######'],
        ],
      },
      {
        name: 'Second Room',
        free: ALL,
        layers: [
          ['######', '######', '######', '######', '######'],
          ['######', '#....#', '##..##', '#.#..#', '######'],
          ['######', '#a*###', '##..##', '#E.#.#', '######'],
          ['######', '######', '######', '######', '######'],
        ],
      },
      MARGIN,
    ],
  },
  {
    id: '3-3',
    chapter: 2,
    name: 'The Last Question',
    objective: 'Collect every axiom, then reach the gate. Which way is down?',
    intro: 'Everything you have learned, in two rooms.',
    hints: [
      'A plate stays pressed once stepped on. Find what it opens.',
      'You will cross the ring twice. Each room keeps the orientation you leave it in.',
    ],
    links: { D: 'P' },
    rooms: [
      {
        name: 'The Study',
        free: ALL,
        layers: [
          ['######', '######', '######', '######', '######'],
          ['######', '##...#', '######', '#....#', '######'],
          ['######', '#*.#D#', '###P.#', '#a..@#', '######'],
          ['######', '######', '######', '######', '######'],
        ],
      },
      {
        name: 'The Question',
        free: ALL,
        layers: [
          ['#####', '#####', '#####', '#####', '#####'],
          ['#####', '#..E#', '#..*#', '##.a#', '#####'],
          ['#####', '#####', '#####', '#####', '#####'],
        ],
      },
    ],
  },
];

export const LEVELS = LEVEL_DEFS.map((d, i) => compileLevel(d, i));
export const CHAPTERS = [
  { name: 'THE FOLDED HALL', blurb: 'Gravity turns in the plane.' },
  { name: "THE STAIRWELL THAT ISN'T", blurb: 'Depth turns too. Levers take over.' },
  { name: 'THE MIRROR HOUSE', blurb: 'Rooms remember their own orientation.' },
];
