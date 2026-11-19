/** @type {import('../core/types').Meta} */
export default {
  how: 'Slide cochineal, bone and soot to blend a colour that matches the sunset swatch. Only the ratio of the three counts, and you get three tries per swatch.',
  controls: [
    { keys: ['Drag', '←', '→'], action: 'Slide a pigment' },
    { keys: ['Match it'], action: 'Judge your mix' },
  ],
  motif: 'A pigment triangle: red at the top, bone and soot at the base. Your mix is a dot inside it, and each miss leaves a mark, so you can steer.',
  cover: [
    ['stars', 26, 3],
    ['sun', 50, 46, 14],
    ['mesa', 70, 'mesa'],
    ['poly', [[50, 78], [20, 124], [80, 124]], 'none', 'ember', 1],
    ['circ', 50, 78, 6, 'red', 'bone', 1],
    ['circ', 20, 124, 6, 'bone', 'ember', 1],
    ['circ', 80, 124, 6, 'ink', 'bone', 1],
    ['circ', 52, 108, 4, 'rose', 'white', 1],
    ['rect', 8, 80, 14, 14, 'rose', 'bone', 0.8],
    ['rect', 78, 80, 14, 14, 'wine', 'bone', 0.8],
    ['line', 50, 84, 52, 104, 'bone', 0.6, '1.5 2'],
  ],
  smoke: { click: '[data-submit]' },
};
