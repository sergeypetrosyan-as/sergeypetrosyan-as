/** @type {import('../core/types').Meta} */
export default {
  how: 'Pick a gear from the tray, then tap a peg to place it between the motor and the goal gear. Meshing gears reverse direction and change speed by their tooth counts; run the train to test it.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Pick a gear, then a peg to place it' },
    { keys: ['Run'], action: 'Test the train (three runs per machine)' },
  ],
  motif: 'A pegboard of brass gears: tooth numbers show the ratios, and after a run each meshed gear spins at its real speed and direction.',
  cover: [
    ['stars', 30, 19],
    ['sun', 80, 20, 8],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['circ', 28, 76, 18, 'saddle', 'ember', 1.4],
    ['circ', 28, 76, 12, 'tan', 'ink', 1],
    ['circ', 28, 76, 4, 'night', 'bone', 1],
    ['circ', 62, 62, 14, 'wine', 'rose', 1.4],
    ['circ', 62, 62, 8, 'tan', 'ink', 1],
    ['circ', 62, 62, 3, 'night', 'bone', 1],
    ['circ', 74, 92, 10, 'saddle', 'ember', 1.4],
    ['circ', 74, 92, 4, 'night', 'bone', 1],
    ['path', 'M44 66 L48 62', 'none', 'bone', 1.4],
    ['con', [[28, 76], [62, 62], [74, 92]]],
    ['star5', 28, 40, 5, 'rose'],
  ],
  smoke: { click: '[data-gear]' },
};
