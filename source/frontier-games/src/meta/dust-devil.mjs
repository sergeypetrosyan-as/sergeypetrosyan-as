/** @type {import('../core/types').Meta} */
export default {
  how: 'Steer the whirlwind and swallow every object smaller than you to grow. Dodge the red spiked rocks: they are bigger and tear you down. Grow to storm size before the wind drops.',
  controls: [
    { keys: ['Drag', 'Tap'], action: 'Steer the whirlwind' },
    { keys: ['Arrows', 'WASD'], action: 'Steer' },
  ],
  motif: 'A dotted ring around the whirlwind marks the storm size you are growing toward; rose-starred tumbleweeds are food, red spiked rocks marked ! are not.',
  cover: [
    ['stars', 30, 51],
    ['mesa', 100, 'mesa'],
    ['rect', 0, 100, 100, 40, 'umber'],
    ['line', 0, 100, 100, 100, 'ember', 0.8],
    ['circ', 50, 92, 24, 'none', 'mesa', 0.7],
    ['path', 'M30 40 Q50 32 70 40 Q54 44 66 52 Q50 52 62 62 Q48 62 58 72 Q46 70 52 84 L50 96 L48 84 Q40 70 46 60 Q34 56 46 48 Q30 48 30 40 Z', 'bone', 'ember', 0.8],
    ['path', 'M38 44 Q50 38 62 44', 'none', 'ember', 0.8],
    ['circ', 20, 104, 5, 'tan', 'rose', 1],
    ['star5', 20, 104, 2.4, 'rose'],
    ['circ', 80, 112, 4, 'tan', 'rose', 1],
    ['poly', [[78, 80], [86, 76], [92, 82], [90, 91], [82, 93], [76, 88]], 'ink', 'red', 1.4],
    ['text', '!', 84, 89, 9, 'red'],
  ],
  smoke: { hold: [0.5, 0.15], ms: 500 },
};
