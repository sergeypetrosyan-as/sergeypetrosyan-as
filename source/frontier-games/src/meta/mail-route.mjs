/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap the next post office to ride there; the number shows the miles. Reach all seven, then ride home to the depot before the sun sets.',
  controls: [
    { keys: ['Tap'], action: 'Ride to a post office' },
    { keys: ['Tab', 'Enter'], action: 'Pick a stop with the keyboard' },
  ],
  motif: 'A sun arc across the sky: it sinks as miles are spent, so the day budget is always visible.',
  cover: [
    ['stars', 26, 4],
    ['path', 'M8 40 Q50 -6 92 40', 'none', 'ember', 0.8],
    ['sun', 66, 17, 6],
    ['mesa', 118, 'mesa'],
    ['rect', 0, 118, 100, 22, 'umber'],
    ['poly', [[20, 100], [34, 78], [60, 90], [78, 66], [70, 104], [20, 100]], 'none', 'bone', 1.6, false],
    ['circ', 34, 78, 5, 'rose', 'bone', 1],
    ['circ', 60, 90, 5, 'rose', 'bone', 1],
    ['circ', 78, 66, 5, 'rose', 'bone', 1],
    ['circ', 70, 104, 5, 'rose', 'bone', 1],
    ['rect', 14, 95, 12, 11, 'tan', 'bone', 1, 2],
    ['text', 'D', 20, 104, 8, 'ink', 'middle'],
  ],
  smoke: { click: '[data-stop]' },
};
