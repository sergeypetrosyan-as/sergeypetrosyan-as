/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap one town, then another, to string telegraph wire between them. Longer wire costs more, so link every town for as little as you can before the funds run out.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Pick a town, then pick a second to wire' },
    { keys: ['Undo'], action: 'Take back the last wire and its cost' },
  ],
  motif: 'The towns form a constellation: dashed rose lines with cost tags show every link you could add, solid tan lines are wire already strung.',
  cover: [
    ['stars', 36, 31],
    ['moon', 82, 18, 9, 0.6],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['line', 22, 78, 48, 52, 'tan', 1.6],
    ['line', 48, 52, 76, 70, 'tan', 1.6],
    ['line', 22, 78, 76, 70, 'rose', 0.8, '2 2'],
    ['line', 48, 52, 52, 92, 'tan', 1.6],
    ['rect', 15, 72, 14, 12, 'saddle', 'bone', 1],
    ['poly', [[14, 72], [22, 64], [30, 72]], 'wine', 'bone', 1],
    ['rect', 41, 46, 14, 12, 'saddle', 'bone', 1],
    ['poly', [[40, 46], [48, 38], [56, 46]], 'wine', 'bone', 1],
    ['rect', 69, 64, 14, 12, 'saddle', 'bone', 1],
    ['poly', [[68, 64], [76, 56], [84, 64]], 'wine', 'bone', 1],
    ['text', '7', 62, 66, 8, 'rose', 'middle'],
    ['line', 86, 112, 86, 88, 'ink', 1.4],
    ['line', 80, 92, 92, 92, 'ink', 1.4],
  ],
  smoke: { click: '[data-town="0"]' },
};
