/** @type {import('../core/types').Meta} */
export default {
  how: 'The maze is dark. Walk with the arrow keys or by tapping beside your marker; walls appear once you have stood in a cell. The compass needle points at the exit. Escape three mazes before your steps run out.',
  controls: [
    { keys: ['←', '↑', '↓', '→'], action: 'Step' },
    { keys: ['Tap beside you'], action: 'Step that way' },
  ],
  motif: 'A compass needle and a bearing label point at the exit while the fog lifts only on the cells you have walked.',
  cover: [
    ['stars', 34, 51],
    ['mesa', 110, 'mesa'],
    ['rect', 0, 108, 100, 32, 'umber'],
    ['circ', 50, 40, 22, 'night', 'bone', 1.6],
    ['circ', 50, 40, 17, 'none', 'ember', 0.6],
    ['poly', [[50, 22], [45, 40], [55, 40]], 'red', 'rose', 0.8],
    ['poly', [[50, 58], [45, 40], [55, 40]], 'bone', 'bone', 0.5],
    ['circ', 50, 40, 2, 'ink', 'bone', 0.6],
    ['rect', 14, 74, 72, 30, 'dusk', 'ember', 1],
    ['path', 'M14 82 H40 V94 H28 M40 82 V74 M54 74 V90 H70 V80 H86 M62 104 V96', 'none', 'bone', 1.4],
    ['circ', 20, 98, 3, 'bone', 'ink', 0.6],
    ['star5', 80, 98, 4.5, 'rose'],
  ],
  smoke: { key: 'ArrowRight' },
};
