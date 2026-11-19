/** @type {import('../core/types').Meta} */
export default {
  how: 'Turn a ring left or right to line its gap up under the rose marker at the top. Every ring drags one neighbour along, so plan your turns.',
  controls: [
    { keys: ['Tap'], action: 'Turn a ring one notch' },
  ],
  motif: 'The gaps are the pieces: when every gap sits under the marker at the top, a clear channel opens to the star at the centre.',
  cover: [
    ['stars', 28, 21],
    ['mesa', 112, 'mesa'],
    ['circ', 50, 58, 40, 'none', 'umber', 0.6],
    ['path', 'M 50 22 A 36 36 0 1 1 49.9 22', 'none', 'tan', 5],
    ['path', 'M 50 34 A 24 24 0 1 1 49.9 34', 'none', 'saddle', 4],
    ['path', 'M 50 44 A 14 14 0 1 1 49.9 44', 'none', 'bone', 3],
    ['circ', 50, 58, 6, 'night', 'ember', 1],
    ['star5', 50, 58, 4, 'rose'],
    ['line', 50, 58, 50, 8, 'rose', 0.8, '1.5 2.5'],
    ['poly', [[50, 6], [53, 12], [47, 12]], 'rose'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['line', 0, 112, 100, 112, 'ember', 0.8],
  ],
  smoke: { click: '[data-ring="0"][data-dir="1"]' },
};
