/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap a tile beside you to dig it and step in. Ore pays more the deeper it lies, but every dig and every step back costs air, so climb out before you run dry. Bank the quota in three trips.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Dig or step to a neighbouring tile' },
    { keys: ['←', '↑', '↓', '→'], action: 'Dig or step' },
  ],
  motif: 'The shaft is a cross-section: dug tunnels stay open, and a "climb back" count beside the air gauge shows what the road home costs.',
  cover: [
    ['stars', 24, 9],
    ['moon', 80, 18, 9, 0.2],
    ['mesa', 52, 'mesa'],
    ['rect', 0, 52, 100, 88, 'saddle'],
    ['rect', 0, 52, 100, 4, 'ember'],
    ['rect', 40, 52, 14, 40, 'night'],
    ['rect', 40, 80, 40, 12, 'night'],
    ['rect', 66, 80, 14, 40, 'night'],
    ['poly', [[20, 70], [26, 64], [32, 70], [26, 78]], 'rose', 'bone', 0.8],
    ['poly', [[78, 104], [84, 98], [90, 104], [84, 112]], 'rose', 'bone', 0.8],
    ['poly', [[16, 108], [21, 103], [26, 108], [21, 114]], 'rose', 'bone', 0.8],
    ['circ', 47, 86, 4, 'bone', 'ink', 1],
    ['line', 54, 40, 54, 52, 'ink', 1.6],
    ['poly', [[48, 52], [54, 38], [60, 52]], 'none', 'ink', 1.6, false],
  ],
  smoke: { click: '[data-dig]:not(.sf)' },
};
