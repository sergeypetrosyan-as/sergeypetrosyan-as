/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap to flap and lift the vulture, then let it fall. Thread the gaps between the canyon needles. Clear twelve gaps to get through.',
  controls: [
    { keys: ['Tap', 'Space', '↑'], action: 'Flap' },
  ],
  motif: 'A moon rides a dotted track across the top of the screen and reaches the rose star at the far end when the canyon is cleared.',
  cover: [
    ['stars', 36, 61],
    ['moon', 22, 20, 9, 0.4],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 110, 100, 30, 'umber'],
    ['poly', [[56, 0], [80, 0], [71, 36], [65, 36]], 'saddle', 'red', 1],
    ['poly', [[56, 110], [80, 110], [71, 76], [65, 76]], 'saddle', 'red', 1],
    ['line', 62, 31, 74, 31, 'rose', 1],
    ['line', 62, 81, 74, 81, 'rose', 1],
    ['poly', [[14, 110], [30, 110], [24, 84], [20, 84]], 'saddle', 'red', 1],
    ['path', 'M22 54 Q34 40 48 56 Q36 54 22 54 Z', 'bone', 'ink', 0.8],
    ['path', 'M30 52 Q36 66 46 56 Z', 'bone', 'ink', 0.8],
    ['circ', 44, 56, 3.2, 'bone', 'ink', 0.8],
    ['poly', [[46, 55], [52, 58], [46, 59]], 'red'],
  ],
  smoke: { tap: [0.5, 0.5] },
};
