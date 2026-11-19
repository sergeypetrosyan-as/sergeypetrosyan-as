/** @type {import('../core/types').Meta} */
export default {
  how: 'Every patron says one thing, and honest patrons always tell the truth while liars always lie. Mark each patron Honest or Liar so every statement fits, then check your labels.',
  controls: [
    { keys: ['Tap'], action: 'Mark Honest or Liar' },
    { keys: ['Check'], action: 'Test your labels' },
  ],
  motif: 'A bar counter with lettered stools: each statement lights the stools of the patrons it talks about, so you can follow who points at whom.',
  cover: [
    ['stars', 28, 9],
    ['sun', 76, 24, 9],
    ['mesa', 100, 'mesa'],
    ['rect', 0, 100, 100, 40, 'umber'],
    ['rect', 6, 92, 88, 10, 'saddle', 'tan', 0.8],
    ['circ', 20, 62, 7, 'tan', 'bone', 0.8],
    ['poly', [[12, 90], [14, 74], [26, 74], [28, 90]], 'ink'],
    ['circ', 50, 58, 7, 'tan', 'bone', 0.8],
    ['poly', [[42, 90], [44, 70], [56, 70], [58, 90]], 'wine'],
    ['circ', 80, 62, 7, 'tan', 'bone', 0.8],
    ['poly', [[72, 90], [74, 74], [86, 74], [88, 90]], 'ink'],
    ['text', 'T', 20, 126, 14, 'rose'],
    ['text', 'L', 50, 126, 14, 'red'],
    ['text', 'T', 80, 126, 14, 'rose'],
    ['con', [[20, 40], [50, 36], [80, 42]]],
  ],
  smoke: { click: '[data-p="0"][data-v="h"]' },
};
