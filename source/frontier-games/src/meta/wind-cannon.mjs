/** @type {import('../core/types').Meta} */
export default {
  how: 'Set the angle and the powder charge, check which way the windsock points, then fire. A miss shows where the ball landed, so correct and try again. Hit every target within three shots each.',
  controls: [
    { keys: ['Sliders'], action: 'Angle and charge' },
    { keys: ['←', '→', '↑', '↓', 'Space'], action: 'Angle, charge, fire' },
  ],
  motif: 'The windsock: its direction arrow and length tell you which way and how hard the wind pushes the ball, and a cross marks where your last shot landed.',
  cover: [
    ['stars', 34, 91],
    ['sun', 78, 24, 8],
    ['mesa', 96, 'mesa'],
    ['rect', 0, 96, 100, 44, 'umber'],
    ['circ', 20, 94, 7, 'ink'],
    ['poly', [[16, 90], [34, 78], [38, 84], [24, 96]], 'saddle', 'tan', 0.8],
    ['path', 'M30 80 Q54 40 84 90', 'none', 'bone', 0.9, '2 2.5'],
    ['rect', 80, 90, 10, 14, 'red', 'bone', 0.8],
    ['circ', 85, 90, 5, 'rose', 'bone', 0.8],
    ['line', 62, 120, 62, 100, 'tan', 1.2],
    ['poly', [[62, 100], [86, 104], [62, 108]], 'rose', 'bone', 0.7],
    ['line', 12, 118, 26, 124, 'rose', 1.4],
    ['line', 26, 118, 12, 124, 'rose', 1.4],
  ],
  smoke: { click: '[data-fire]' },
};
