/** @type {import('../core/types').Meta} */
export default {
  how: 'Take turns planting stakes; you have more stakes than the rival. When they run out, open land touching only your fence counts for you and land touching both counts for nobody. Finish with at least as much as the rival (ties go to you).',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Plant a stake' },
  ],
  motif: 'Fence lines join neighbouring stakes, and land you hold is stamped with a dot while rival land is stamped with a cross, so you can see the border fight live.',
  cover: [
    ['stars', 30, 83],
    ['moon', 22, 22, 9, 0.3],
    ['mesa', 66, 'mesa'],
    ['rect', 0, 66, 100, 74, 'umber'],
    ['rect', 12, 74, 76, 56, 'night', 'ember', 0.8],
    ['line', 12, 88, 88, 88, 'ember', 0.5],
    ['line', 12, 102, 88, 102, 'ember', 0.5],
    ['line', 12, 116, 88, 116, 'ember', 0.5],
    ['line', 31, 74, 31, 130, 'ember', 0.5],
    ['line', 50, 74, 50, 130, 'ember', 0.5],
    ['line', 69, 74, 69, 130, 'ember', 0.5],
    ['poly', [[31, 88], [50, 88], [50, 116], [31, 116]], 'none', 'bone', 1.6],
    ['circ', 31, 88, 3, 'bone'],
    ['circ', 50, 88, 3, 'bone'],
    ['circ', 50, 116, 3, 'bone'],
    ['circ', 31, 116, 3, 'bone'],
    ['poly', [[66, 99], [69, 102], [66, 105], [63, 102]], 'red', 'bone', 0.7],
    ['poly', [[66, 113], [69, 116], [66, 119], [63, 116]], 'red', 'bone', 0.7],
  ],
  smoke: { click: '.lg-c[data-i="12"]' },
};
