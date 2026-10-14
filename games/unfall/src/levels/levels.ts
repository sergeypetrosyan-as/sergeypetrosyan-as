import type { LevelDef, TileDef, TileTrigger } from '../sim/types';

const G = 400;

/** Unbreakable ground block from x0 to x1. */
const solid = (x0: number, x1: number, y = G): TileDef => ({ x: x0, y, w: x1 - x0, h: 600 - y, trigger: 'none' });

/** A run of 32-wide slabs sharing one trigger. `holes` are indices that start already fallen. */
function bridge(x0: number, n: number, trigger: TileTrigger, wait: number, y = G, holes: number[] = [], w = 32): TileDef[] {
  return Array.from({ length: n }, (_, i) => ({
    x: x0 + i * w,
    y,
    w,
    trigger: holes.includes(i) ? 'fallen' : trigger,
    wait,
  }));
}

/** Ground that the Hush swallows as it passes. */
const hushGround = (x0: number, x1: number, y = G): TileDef[] => bridge(x0, Math.round((x1 - x0) / 64), 'front', 0.15, y, [], 64).map((t) => ({ ...t, h: 40 }));

/** Slabs that give way on a schedule, as a wave. */
const timerRun = (x0: number, n: number, firstDelay: number, step: number, y = G): TileDef[] =>
  Array.from({ length: n }, (_, i) => ({ x: x0 + i * 32, y, w: 32, trigger: 'timer' as const, delay: firstDelay + i * step, wait: 1.5 }));

export const LEVELS: LevelDef[] = [
  {
    id: 'tram',
    name: 'The Last Tram',
    line: 'The tram isn’t coming. I’ll walk.',
    seed: 11,
    length: 1500,
    start: 90,
    goal: 1440,
    budget: 10,
    tiles: [solid(-200, 620), ...bridge(620, 5, 'fallen', 3.2), solid(780, 1700)],
    sparks: [[330, 372], [1120, 372]],
    billboards: [
      { x: 300, y: 210, text: 'LAST TRAM 23:58', color: 'amber' },
      { x: 1180, y: 250, text: 'VESPER', size: 64, color: 'coral' },
    ],
    hints: [
      { atX: 0, text: 'This is Ilo. She walks on her own, and stops when the way ahead is broken.', untilX: 520 },
      { atX: 520, text: 'Hold the mouse button over the broken bridge. Inside the circle, time runs backward.', untilX: 790 },
      { atX: 790, text: 'Let go once she’s across. Whatever you rewound will fall again, in its own time.', untilX: 1150 },
    ],
  },
  {
    id: 'signs',
    name: 'Signs of Leaving',
    line: 'The signs keep falling. Some of them help.',
    seed: 23,
    length: 1900,
    start: 90,
    goal: 1840,
    budget: 12,
    tiles: [solid(-200, 1000), solid(1180, 2100)],
    signs: [
      { text: 'STAY', hx: 640, hy: 290, w: 110, h: 40, rx: 640, ry: 345, upright: true, nearX: 560, hold: 0.5 },
      { text: 'LEAVE', hx: 1090, hy: 230, w: 210, h: 34, rx: 1090, ry: 417, nearX: 860, hold: 0.8 },
    ],
    sparks: [[400, 372], [1400, 372]],
    billboards: [
      { x: 250, y: 200, text: 'SERVICE ENDS TONIGHT', color: 'amber' },
      { x: 1500, y: 180, text: 'THANK YOU FOR LIVING HERE', color: 'coral' },
    ],
    hints: [
      { atX: 600, text: 'Lift the sign back up, but keep the circle above Ilo’s head.', untilX: 700 },
      { atX: 880, text: 'Not everything needs saving. Watch this one land.', untilX: 1100 },
    ],
  },
  {
    id: 'glass',
    name: 'Glass Bridge',
    line: 'When you turn the clock near me, I forget my last steps. Keep your circle ahead of me.',
    seed: 37,
    length: 2000,
    start: 90,
    goal: 1940,
    budget: 12,
    tiles: [solid(-200, 500), ...bridge(500, 28, 'step', 0.55, G, [12, 22]), solid(1396, 2200)],
    sparks: [[700, 360], [1250, 360]],
    billboards: [
      { x: 900, y: 170, text: 'MIND THE GAP', color: 'ice' },
      { x: 1600, y: 210, text: 'HARBOR LINE CLOSED', color: 'amber' },
    ],
    hints: [
      { atX: 520, text: 'The glass gives way behind her. Rebuild the missing pane before she gets there.', untilX: 760 },
      { atX: 760, text: 'If the circle touches Ilo, she walks backward through her own steps.', untilX: 1000 },
    ],
  },
  {
    id: 'hush',
    name: 'The Hush',
    line: 'The Hush reached the harbor an hour ago. It doesn’t stop. You can only hold it back.',
    seed: 41,
    length: 2600,
    start: 140,
    goal: 2540,
    budget: 18,
    front: { x0: -80, speed: 34, delay: 2.5 },
    tiles: [...hushGround(-256, 896), ...bridge(896, 5, 'fallen', 2.6), ...hushGround(1056, 2080), ...hushGround(2080, 2848)],
    signs: [{ text: 'NO WAY BACK', hx: 1520, hy: 280, w: 150, h: 38, rx: 1520, ry: 325, upright: true, nearX: 1440, hold: 0.35 }],
    crushers: [{ x: 2000, w: 56, top: 220, bottom: G, period: 2.6, phase: 0.2 }],
    sparks: [[600, 372], [1250, 372], [1800, 372], [2300, 372]],
    billboards: [
      { x: 500, y: 200, text: 'EVACUATE BY SEA', color: 'coral' },
      { x: 1700, y: 170, text: 'IT IS ALREADY QUIET', color: 'ice' },
    ],
    hints: [
      { atX: 140, text: 'Behind you: the Hush. Put the circle on its edge to push it back.', untilX: 700 },
    ],
  },
  {
    id: 'market',
    name: 'Clockwork Market',
    line: 'The market clocks are running backward too. Someone is borrowing seconds.',
    seed: 53,
    length: 2600,
    start: 90,
    goal: 2540,
    budget: 16,
    tiles: [solid(-200, 1300), solid(1400, 2800, 300)],
    crushers: [
      { x: 560, w: 52, top: 210, bottom: G, period: 2.2, phase: 0 },
      { x: 740, w: 52, top: 210, bottom: G, period: 2.2, phase: 0.33 },
      { x: 920, w: 52, top: 210, bottom: G, period: 2.2, phase: 0.66 },
    ],
    elevators: [{ x: 1301, w: 98, yA: G, yB: 300, period: 6, phase: 0.5 }],
    sparks: [[660, 372], [1130, 372], [1900, 272]],
    billboards: [
      { x: 700, y: 150, text: 'OPEN UNTIL THE END', color: 'amber' },
      { x: 2000, y: 160, text: 'ALL CLOCKS HALF PRICE', color: 'coral' },
    ],
    hints: [
      { atX: 420, text: 'Hold a press up by rewinding it. Small circles cost less.', untilX: 640 },
      { atX: 1150, text: 'Rewinding the lift sends it the other way.', untilX: 1350 },
    ],
  },
  {
    id: 'freefall',
    name: 'Freefall',
    line: 'My lantern gets dimmer every time you help me. Did you notice?',
    seed: 67,
    length: 2400,
    start: 90,
    goal: 2340,
    budget: 16,
    tiles: [solid(-200, 700), ...bridge(700, 16, 'step', 0.1), solid(1212, 1500), ...timerRun(1500, 10, 20, 0.35), solid(1820, 2600)],
    signs: [{ text: 'FALL', hx: 960, hy: 290, w: 100, h: 40, rx: 960, ry: 350, upright: true, nearX: 830, hold: 0.25 }],
    sparks: [[600, 372], [1350, 372], [2050, 372]],
    billboards: [
      { x: 950, y: 140, text: 'DON’T LOOK DOWN', color: 'ice' },
      { x: 1700, y: 200, text: 'THE LIGHT YOU SAVE IS THE LIGHT YOU KEEP', color: 'amber', size: 22 },
    ],
    hints: [
      { atX: 640, text: 'This floor won’t hold if she stops. If she falls, catch her: rewind the fall.', untilX: 1000 },
    ],
  },
  {
    id: 'reveal',
    name: 'The Last Bridge',
    line: 'It’s the lantern. Every second you take back comes out of it, and that light is all of Vesper that’s left.',
    seed: 79,
    length: 3200,
    start: 150,
    goal: 3140,
    budget: 22,
    front: { x0: -60, speed: 40, delay: 1 },
    tiles: [
      ...hushGround(-256, 704),
      ...bridge(704, 6, 'fallen', 2.2),
      ...hushGround(896, 1536),
      ...bridge(1536, 14, 'step', 0.45, G, [7]),
      ...hushGround(1984, 2368),
      ...hushGround(2560, 3400),
    ],
    signs: [{ text: 'REMEMBER US', hx: 2464, hy: 220, w: 230, h: 36, rx: 2464, ry: 418, nearX: 2250, hold: 0.9 }],
    crushers: [{ x: 1200, w: 56, top: 220, bottom: G, period: 2.4 }],
    sparks: [[500, 372], [1100, 372], [1700, 360], [2200, 372], [2800, 372]],
    billboards: [
      { x: 600, y: 160, text: 'EVERY SECOND YOU TAKE BACK', color: 'ice', size: 24 },
      { x: 1300, y: 200, text: 'COMES FROM HER LANTERN', color: 'coral', size: 24 },
      { x: 2700, y: 170, text: 'SPEND IT WELL', color: 'amber' },
    ],
  },
  {
    id: 'lighthouse',
    name: 'The Lighthouse',
    line: 'The lighthouse keeps whatever light reaches it. Let’s go.',
    seed: 97,
    length: 2100,
    start: 160,
    goal: 1880,
    budget: 14,
    final: true,
    front: { x0: -40, speed: 44, delay: 0.5 },
    tiles: [...hushGround(-256, 704), solid(800, 1200, 320), ...bridge(1200, 5, 'fallen', 2.4, 320), solid(1360, 2300, 320)],
    elevators: [{ x: 705, w: 94, yA: G, yB: 320, period: 4.4, phase: 0.1 }],
    sparks: [[450, 372], [1000, 292], [1600, 292]],
    billboards: [{ x: 1500, y: 130, text: 'KEEP THE LIGHT', color: 'amber', size: 30 }],
  },
];
