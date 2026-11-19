/** @type {import('../core/types').Meta} */
export default {
  how: 'Offer a card from your hand and the dealer says Accepted or Rejected by a secret rule. Pick your tests carefully (8 in all), then name the rule from the list. Two wrong guesses are forgiven; the third loses.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Offer a card, then name the rule' },
    { keys: ['1', '6'], action: 'Offer card 1 to 6' },
  ],
  motif: 'Two columns on the dealer’s table, Accepted (rose, check mark) and Rejected (red, cross), hold every card you tested so a pattern shows at a glance.',
  cover: [
    ['stars', 40, 13],
    ['moon', 20, 22, 9, 0.4],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['rect', 8, 80, 84, 24, 'wine', 'ember', 1],
    ['line', 50, 82, 50, 102, 'ember', 0.8, '2 2'],
    ['rect', 14, 40, 22, 32, 'bone', 'ember', 1, 2],
    ['star5', 25, 56, 6, 'rose'],
    ['rect', 39, 34, 22, 32, 'bone', 'ember', 1, 2],
    ['text', '?', 50, 58, 20, 'red'],
    ['rect', 64, 40, 22, 32, 'bone', 'ember', 1, 2],
    ['star5', 75, 56, 6, 'red'],
    ['text', '✓', 25, 98, 10, 'rose'],
    ['text', '✗', 75, 98, 10, 'red'],
  ],
  smoke: { click: '[data-card="0"]' },
};
