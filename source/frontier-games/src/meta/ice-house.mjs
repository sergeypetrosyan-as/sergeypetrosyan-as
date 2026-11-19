/** @type {import('../core/types').Meta} */
export default {
  how: 'Open the vent while the air outside is below the cold line to refill the walls, and keep it shut in the heat. Pull the shade over the sun hours to keep the ice through five days.',
  controls: [
    { keys: ['Vent'], action: 'Open or shut' },
    { keys: ['Shade'], action: 'Raise or lower' },
    { keys: ['V', 'S'], action: 'Same, from the keyboard' },
  ],
  motif: 'A day chart of outside temperature with a dashed cold line: the dot below the line means venting helps, above it means vent shut.',
  cover: [
    ['stars', 30, 31],
    ['sun', 78, 24, 8],
    ['mesa', 70, 'mesa'],
    ['rect', 16, 62, 68, 56, 'wine', 'ember', 1],
    ['poly', [[12, 62], [50, 38], [88, 62]], 'umber', 'ember', 1],
    ['rect', 40, 84, 20, 34, 'night', 'bone', 0.8],
    ['line', 50, 84, 50, 118, 'ember', 0.8],
    ['poly', [[26, 74], [34, 74], [34, 82], [26, 82]], 'bone'],
    ['poly', [[68, 74], [76, 74], [76, 82], [68, 82]], 'bone'],
    ['rect', 46, 48, 8, 6, 'bone', 'ember', 0.6],
    ['path', 'M 8 126 Q 30 108 50 126 T 92 126', 'none', 'rose', 1],
    ['line', 6, 132, 94, 132, 'ember', 0.8, '3 3'],
    ['star5', 20, 46, 4, 'rose'],
  ],
  smoke: { click: '[data-vent]' },
};
