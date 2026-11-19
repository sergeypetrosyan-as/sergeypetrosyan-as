/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap a square to choose what each plot grows in each season. Wheat and corn drain the soil, beans and rest restore it, and every season has a market order to fill.',
  controls: [
    { keys: ['Tap'], action: 'Change a crop' },
    { keys: ['Market'], action: 'Send the harvest' },
  ],
  motif: 'Soil pips under every square show what the earth has left after each season; a struck-out crop starved.',
  cover: [
    ['stars', 30, 14],
    ['sun', 74, 24, 9],
    ['mesa', 66, 'mesa'],
    ['rect', 14, 74, 72, 14, 'wine', 'ember', 0.8],
    ['rect', 14, 90, 72, 14, 'wine', 'ember', 0.8],
    ['rect', 14, 106, 72, 14, 'wine', 'ember', 0.8],
    ['circ', 26, 81, 4, 'tan', 'bone', 0.6],
    ['circ', 50, 81, 4, 'rose', 'bone', 0.6],
    ['circ', 74, 81, 4, 'ember', 'bone', 0.6],
    ['circ', 38, 97, 4, 'rose', 'bone', 0.6],
    ['circ', 62, 97, 4, 'tan', 'bone', 0.6],
    ['circ', 26, 113, 4, 'ember', 'bone', 0.6],
    ['circ', 62, 113, 4, 'rose', 'bone', 0.6],
    ['line', 38, 73, 38, 121, 'mesa', 0.5, '1 2'],
    ['line', 62, 73, 62, 121, 'mesa', 0.5, '1 2'],
    ['star5', 86, 54, 4, 'rose'],
  ],
  smoke: { click: '[data-plot="0"][data-season="0"]' },
};
