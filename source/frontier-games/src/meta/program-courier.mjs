/** @type {import('../core/types').Meta} */
export default {
  how: 'Add instruction cards to the program: Forward, Turn left, Turn right or Again. Press Run and the courier follows your cards to collect every parcel and finish at the post office.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Add a card; tap a card to remove it' },
    { keys: ['↑', '←', '→', 'A', 'Enter'], action: 'Forward, left, right, again, run' },
  ],
  motif: 'The program strip is the courier’s trail: each card is a numbered stop, and the one being run lights up while the courier walks the same step on the map.',
  cover: [
    ['stars', 30, 33],
    ['sun', 78, 22, 9],
    ['mesa', 92, 'mesa'],
    ['rect', 0, 92, 100, 48, 'umber'],
    ['rect', 8, 96, 84, 40, 'night', 'ember', 0.8],
    ['line', 8, 109, 92, 109, 'ember', 0.5],
    ['line', 8, 122, 92, 122, 'ember', 0.5],
    ['line', 36, 96, 36, 136, 'ember', 0.5],
    ['line', 64, 96, 64, 136, 'ember', 0.5],
    ['poly', [[14, 128], [18, 118], [22, 128]], 'bone'],
    ['path', 'M18 118 L18 102 L50 102 L50 116 L78 116', 'none', 'rose', 1.2],
    ['star5', 50, 102, 4, 'rose'],
    ['rect', 70, 108, 16, 14, 'tan', 'bone', 0.8],
    ['poly', [[68, 108], [78, 100], [88, 108]], 'saddle', 'bone', 0.8],
    ['cactus', 28, 40, 18, 'ink'],
  ],
  smoke: { click: '[data-card="F"]' },
};
