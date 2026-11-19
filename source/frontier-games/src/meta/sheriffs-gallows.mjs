/** @type {import('../core/types').Meta} */
export default {
  how: 'Read each witness clue, then Clear every suspect it rules out. When only one suspect fits, Accuse them. Two wrong accusations and the shooter walks.',
  controls: [
    { keys: ['Tap'], action: 'Clear a suspect or Accuse' },
    { keys: ['Tab', 'Enter'], action: 'Move between buttons and press' },
  ],
  motif: 'A gallows with two nooses: each wrong accusation cuts one down, so the cost of guessing is always in sight.',
  cover: [
    ['stars', 30, 5],
    ['moon', 20, 22, 9, 0.3],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['path', 'M52 112 V34 H84 M52 46 L62 34', 'none', 'tan', 2.4],
    ['line', 76, 34, 76, 48, 'bone', 1.2],
    ['circ', 76, 54, 6, 'none', 'rose', 1.6],
    ['rect', 46, 108, 46, 4, 'saddle'],
    ['poly', [[16, 112], [16, 94], [22, 88], [28, 94], [28, 112]], 'ink'],
    ['circ', 22, 83, 4, 'ink'],
    ['rect', 12, 78, 20, 3, 'ink'],
    ['con', [[12, 52], [26, 60], [36, 46]]],
    ['star5', 84, 90, 5, 'rose'],
  ],
  smoke: { click: '[data-clear="0"]' },
};
