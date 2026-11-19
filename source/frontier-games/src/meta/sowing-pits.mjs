/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap one of your pits to pick up its seeds and drop one in each pit that follows, round the board. End in your store to go again; end in an empty pit of yours to capture the seeds opposite.',
  controls: [
    { keys: ['Tap'], action: 'Sow a pit' },
    { keys: ['1', '2', '3', '4', '5'], action: 'Sow pit by number' },
  ],
  motif: 'The sowing loop runs along your row to your store and back along the rival row; the glowing last pit shows where the final seed fell.',
  cover: [
    ['stars', 30, 27],
    ['sun', 50, 24, 9],
    ['mesa', 58, 'mesa'],
    ['rect', 8, 66, 84, 50, 'wine', 'ember', 1, 12],
    ['rect', 11, 78, 8, 26, 'night', 'ember', 0.8, 4],
    ['rect', 81, 78, 8, 26, 'night', 'ember', 0.8, 4],
    ['circ', 28, 80, 5, 'night', 'saddle', 0.8],
    ['circ', 42, 80, 5, 'night', 'saddle', 0.8],
    ['circ', 56, 80, 5, 'night', 'saddle', 0.8],
    ['circ', 70, 80, 5, 'night', 'saddle', 0.8],
    ['circ', 28, 102, 5, 'night', 'rose', 0.8],
    ['circ', 42, 102, 5, 'tan', 'bone', 0.8],
    ['circ', 56, 102, 5, 'night', 'rose', 0.8],
    ['circ', 70, 102, 5, 'night', 'rose', 0.8],
    ['path', 'M 28 110 Q 42 118 56 110', 'none', 'rose', 0.8],
    ['circ', 85, 91, 3, 'rose'],
  ],
  smoke: { click: '[data-pit="2"]' },
};
