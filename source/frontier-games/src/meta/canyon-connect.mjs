/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap a column to drop your starred bone stone. Line up four in a row, across, down or diagonal, before the rival\'s red X stones do. Each replay brings a smarter rival.',
  controls: [
    { keys: ['Tap'], action: 'Drop a stone in that column' },
    { keys: ['←', '→', 'Space'], action: 'Aim and drop' },
  ],
  motif: 'A carved canyon slab: your stones carry a star, the rival\'s carry an X, and a four-line lights up in rose.',
  cover: [
    ['stars', 24, 12],
    ['moon', 80, 18, 8, 0.2],
    ['mesa', 48, 'mesa'],
    ['rect', 6, 50, 88, 84, 'umber', 'saddle', 1.8, 3],
    ['circ', 20, 64, 6, 'ink'], ['circ', 36, 64, 6, 'ink'], ['circ', 52, 64, 6, 'ink'], ['circ', 68, 64, 6, 'ink'], ['circ', 84, 64, 6, 'ink'],
    ['circ', 20, 80, 6, 'ink'], ['circ', 36, 80, 6, 'bone', 'tan', 1], ['circ', 52, 80, 6, 'red', 'wine', 1], ['circ', 68, 80, 6, 'ink'], ['circ', 84, 80, 6, 'ink'],
    ['circ', 20, 96, 6, 'bone', 'tan', 1], ['circ', 36, 96, 6, 'red', 'wine', 1], ['circ', 52, 96, 6, 'bone', 'tan', 1], ['circ', 68, 96, 6, 'ink'], ['circ', 84, 96, 6, 'ink'],
    ['circ', 20, 112, 6, 'bone', 'tan', 1], ['circ', 36, 112, 6, 'bone', 'tan', 1], ['circ', 52, 112, 6, 'red', 'wine', 1], ['circ', 68, 112, 6, 'bone', 'tan', 1], ['circ', 84, 112, 6, 'ink'],
    ['line', 20, 112, 52, 80, 'rose', 1.2, '2 2'],
  ],
  smoke: { tap: [0.5, 0.5] },
};
