/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap an arrow to pick a fold line and preview the result, then press Fold. Both sides mirror onto the dashed line. Stack every star on one square before the folds run out.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Pick a fold line' },
    { keys: ['Fold', 'Undo'], action: 'Commit or take back' },
  ],
  motif: 'The dashed fold line plus a small preview grid show what each fold overlaps before you commit.',
  cover: [
    ['stars', 26, 21],
    ['moon', 80, 20, 9, 0.5],
    ['mesa', 66, 'mesa'],
    ['rect', 14, 70, 72, 60, 'tan', 'ember', 1.2],
    ['line', 38, 70, 38, 130, 'saddle', 0.5],
    ['line', 62, 70, 62, 130, 'saddle', 0.5],
    ['line', 14, 90, 86, 90, 'saddle', 0.5],
    ['line', 14, 110, 86, 110, 'saddle', 0.5],
    ['line', 50, 66, 50, 134, 'red', 1.4, '3 2'],
    ['path', 'M20 66 Q50 50 80 66', 'none', 'bone', 1.2],
    ['poly', [[76, 62], [82, 67], [74, 69]], 'bone'],
    ['star5', 26, 80, 5, 'red'],
    ['star5', 74, 80, 5, 'red'],
    ['star5', 26, 120, 5, 'rose'],
    ['star5', 74, 100, 5, 'rose'],
  ],
  smoke: { click: '[data-line="v2"]' },
};
