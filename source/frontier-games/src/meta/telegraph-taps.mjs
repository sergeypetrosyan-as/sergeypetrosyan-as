/** @type {import('../core/types').Meta} */
export default {
  how: 'Watch the sounder lamp flash a message of short dots and long dashes. Then key it back: tap for a dot, hold for a dash, and pause as long as it did.',
  controls: [
    { keys: ['Tap', 'Space'], action: 'Dot' },
    { keys: ['Hold', 'Space'], action: 'Dash' },
  ],
  motif: 'A paper tape of dots and dashes records the message as it plays and then your own keying, so the rhythm becomes something you can see.',
  cover: [
    ['stars', 34, 5],
    ['moon', 78, 22, 11, 0.3],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['line', 0, 112, 100, 112, 'ember', 0.8],
    ['line', 18, 112, 18, 40, 'ink', 2.4],
    ['line', 12, 46, 24, 46, 'ink', 1.6],
    ['line', 82, 112, 82, 50, 'ink', 2.4],
    ['line', 76, 56, 88, 56, 'ink', 1.6],
    ['path', 'M18 46 Q50 66 82 56', 'none', 'ember', 0.7],
    ['circ', 50, 80, 11, 'rose', 'bone', 1],
    ['circ', 50, 80, 5, 'bone'],
    ['rect', 24, 122, 7, 3.4, 'bone', 'none', 0, 1.7],
    ['rect', 36, 122, 20, 3.4, 'bone', 'none', 0, 1.7],
    ['rect', 61, 122, 7, 3.4, 'bone', 'none', 0, 1.7],
    ['rect', 73, 122, 7, 3.4, 'rose', 'none', 0, 1.7],
  ],
  smoke: { click: '[data-key]' },
};
