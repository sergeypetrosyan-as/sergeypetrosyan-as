/** @type {import('../core/types').Meta} */
export default {
  how: 'Steer the diamond lantern through the moon\'s shots (red discs marked with an X) and slip through the gaps in each ring. Survive forty-five seconds until dawn; three hits put the lantern out.',
  controls: [
    { keys: ['←', '↑', '↓', '→'], action: 'Steer (or WASD)' },
    { keys: ['Drag'], action: 'Slide the lantern with a finger or mouse' },
  ],
  motif: 'The moon wanes toward a new moon as the night passes, so how close dawn is stays in view.',
  cover: [
    ['stars', 34, 21],
    ['moon', 50, 30, 15, 0.35],
    ['circ', 50, 62, 3.2, 'red', 'bone', 0.8],
    ['circ', 30, 60, 3.2, 'red', 'bone', 0.8],
    ['circ', 70, 60, 3.2, 'red', 'bone', 0.8],
    ['circ', 22, 76, 3.2, 'red', 'bone', 0.8],
    ['circ', 78, 76, 3.2, 'red', 'bone', 0.8],
    ['circ', 38, 80, 3.2, 'red', 'bone', 0.8],
    ['circ', 62, 80, 3.2, 'red', 'bone', 0.8],
    ['mesa', 134, 'mesa'],
    ['rect', 0, 130, 100, 10, 'umber'],
    ['poly', [[50, 96], [56, 106], [50, 116], [44, 106]], 'bone', 'tan', 1],
    ['circ', 50, 106, 2, 'ink'],
  ],
  smoke: { key: 'ArrowLeft' },
};
