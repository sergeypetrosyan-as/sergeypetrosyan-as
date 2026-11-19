/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap a stone to mark it and every stone to its right in that pile, then press Take. You and the rival alternate; whoever takes the very last stone loses. Win two of three games.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Mark stones in one pile' },
    { keys: ['Take stones'], action: 'Remove the marked stones' },
    { keys: ['Hint'], action: 'Show a safe move (two per run)' },
  ],
  motif: 'Each pile is a row of stones on its own rock ledge; the marked stones turn red with a cross so you can see exactly what leaves the ledge.',
  cover: [
    ['stars', 30, 77],
    ['moon', 80, 20, 9, 0.3],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['line', 0, 112, 100, 112, 'ember', 0.8],
    ['line', 12, 62, 88, 62, 'saddle', 2],
    ['line', 12, 82, 88, 82, 'saddle', 2],
    ['line', 12, 102, 88, 102, 'saddle', 2],
    ['circ', 22, 57, 4.6, 'tan', 'bone', 0.8], ['circ', 34, 57, 4.6, 'tan', 'bone', 0.8], ['circ', 46, 57, 4.6, 'tan', 'bone', 0.8],
    ['circ', 22, 77, 4.6, 'tan', 'bone', 0.8], ['circ', 34, 77, 4.6, 'red', 'bone', 0.8], ['circ', 46, 77, 4.6, 'red', 'bone', 0.8],
    ['circ', 22, 97, 4.6, 'tan', 'bone', 0.8],
    ['line', 31.5, 74.5, 36.5, 79.5, 'white', 1], ['line', 36.5, 74.5, 31.5, 79.5, 'white', 1],
    ['line', 43.5, 74.5, 48.5, 79.5, 'white', 1], ['line', 48.5, 74.5, 43.5, 79.5, 'white', 1],
  ],
  smoke: { click: '[data-stone]' },
};
