/** @type {import('../core/types').Meta} */
export default {
  how: 'Walk into a powder keg to push it one square. You can only push, never pull. Cover every star mark with a keg inside the move limit; undo costs a move.',
  controls: [
    { keys: ['Arrows', 'WASD'], action: 'Step / push' },
    { keys: ['Z'], action: 'Undo (costs a move)' },
    { keys: ['Tap yard'], action: 'Step toward the tap' },
  ],
  motif: 'A star mark on the floor is a goal; a keg lands on it and takes a rose ring. The move counter beside it works like a fuse burning down.',
  cover: [
    ['stars', 30, 21],
    ['moon', 82, 18, 9, 0.2],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['rect', 10, 54, 80, 70, 'night', 'ember', 1.2],
    ['rect', 10, 54, 20, 14, 'mesa'], ['rect', 70, 54, 20, 14, 'mesa'], ['rect', 10, 110, 20, 14, 'mesa'],
    ['star5', 70, 84, 7, 'rose'],
    ['star5', 36, 108, 5, 'rose'],
    ['circ', 50, 84, 9, 'saddle', 'bone', 1.2],
    ['line', 41.5, 84, 58.5, 84, 'tan', 1],
    ['circ', 30, 100, 3.5, 'bone', 'red', 1],
    ['rect', 24, 96, 12, 2.5, 'bone'],
    ['line', 38, 84, 44, 84, 'rose', 0.8, '1 1.5'],
  ],
  smoke: { key: 'ArrowRight' },
};
