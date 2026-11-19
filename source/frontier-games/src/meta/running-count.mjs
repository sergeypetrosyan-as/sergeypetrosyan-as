/** @type {import('../core/types').Meta} */
export default {
  how: 'Cards flash by one at a time. Keep a running total in your head: 2 to 6 add one, 7 to 9 add nothing, 10 to Ace subtract one. When the deck ends, enter your total. Three rounds, each faster; two wrong totals lose.',
  controls: [
    { keys: ['Tap Deal', 'Space'], action: 'Start the deck' },
    { keys: ['+', '−', '↑ ↓'], action: 'Set your total' },
    { keys: ['Enter'], action: 'Lock in' },
  ],
  motif: 'The rule chart stays on the table: a rose plus star, a bone zero and a red minus mark, so every card has a sign you can read by shape as well as colour.',
  cover: [
    ['stars', 36, 71],
    ['moon', 82, 20, 8, 0.5],
    ['mesa', 100, 'mesa'],
    ['rect', 0, 100, 100, 40, 'umber'],
    ['rect', 12, 40, 30, 42, 'bone', 'ember', 1.2, 3],
    ['text', '5', 20, 56, 12, 'ink'], ['star5', 27, 68, 7, 'rose'],
    ['rect', 52, 46, 30, 42, 'bone', 'ember', 1.2, 3],
    ['text', 'K', 60, 62, 12, 'red'], ['text', '−', 67, 80, 14, 'red'],
    ['rect', 8, 104, 84, 22, 'wine', 'ember', 1, 3],
    ['text', '+1', 26, 120, 10, 'rose'], ['text', '0', 50, 120, 10, 'bone'], ['text', '−1', 74, 120, 10, 'red'],
  ],
  smoke: { click: '[data-deal]' },
};
