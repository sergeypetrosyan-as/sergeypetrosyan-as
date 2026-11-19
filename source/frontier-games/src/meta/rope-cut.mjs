/** @type {import('../core/types').Meta} */
export default {
  how: 'Swipe across a rope, or press its number, to cut it. The lantern swings on what is left. Time your last cut so it falls into the lamp bowl. Three lanterns for three yards; stars are bonus points.',
  controls: [
    { keys: ['Swipe', 'Tap rope'], action: 'Cut a rope' },
    { keys: ['1', '2', '3'], action: 'Cut rope by its number' },
  ],
  motif: 'A dotted constellation line links the bonus stars along the swing arc and ends at the lamp, hinting at where to let go.',
  cover: [
    ['stars', 30, 91],
    ['con', [[34, 50], [28, 70], [34, 88], [50, 100]]],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['circ', 30, 22, 2.5, 'bone', 'ember', 1], ['circ', 70, 22, 2.5, 'bone', 'ember', 1],
    ['line', 30, 22, 52, 52, 'tan', 1.4], ['line', 70, 22, 52, 52, 'tan', 1.4, '3 2'],
    ['line', 62, 30, 78, 44, 'red', 1],
    ['circ', 52, 58, 7, 'bone', 'ember', 1.2], ['circ', 52, 58, 3.5, 'rose'],
    ['line', 52, 51, 52, 47, 'bone', 1.2],
    ['path', 'M34 104 L66 104 L60 120 L40 120 Z', 'saddle', 'bone', 1],
    ['path', 'M50 100 Q44 94 50 88 Q56 94 50 100', 'rose', 'bone', 0.6],
    ['star5', 28, 70, 5, 'rose'],
  ],
  smoke: { key: '1' },
};
