/** @type {import('../core/types').Meta} */
export default {
  how: 'Drag the reticle over the sails and let go to throw a pebble. It lands 0.9 s later, so aim where a gap will be, not where it is now. Two clean passes clear a sail speed; clear all five.',
  controls: [
    { keys: ['Drag', '← ↑ ↓ →'], action: 'Aim the reticle' },
    { keys: ['Let go', 'Space'], action: 'Throw the pebble' },
  ],
  motif: 'A dotted ring with an arrow marks the sails\' reach and spin direction, so you can read how far they sweep while the pebble flies.',
  cover: [
    ['stars', 36, 5],
    ['moon', 20, 22, 10, 0.3],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['circ', 50, 52, 36, 'none', 'mesa', 0.6],
    ['poly', [[44, 120], [47, 52], [53, 52], [56, 120]], 'saddle'],
    ['poly', [[50, 52], [78, 40], [80, 46], [53, 56]], 'tan', 'ink', 0.8],
    ['poly', [[50, 52], [60, 80], [55, 82], [47, 56]], 'tan', 'ink', 0.8],
    ['poly', [[50, 52], [22, 64], [20, 58], [47, 48]], 'tan', 'ink', 0.8],
    ['poly', [[50, 52], [40, 24], [45, 22], [53, 48]], 'tan', 'ink', 0.8],
    ['circ', 50, 52, 4, 'red', 'bone', 0.8],
    ['circ', 50, 52, 9, 'none', 'rose', 0.8],
    ['circ', 50, 52, 3, 'none', 'rose', 0.8],
    ['circ', 50, 128, 3, 'rose', 'bone', 0.6],
    ['line', 50, 128, 50, 60, 'rose', 0.6, '1.5 3'],
  ],
  smoke: { tap: [0.5, 0.4] },
};
