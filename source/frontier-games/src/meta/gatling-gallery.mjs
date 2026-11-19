/** @type {import('../core/types').Meta} */
export default {
  how: 'Aim and tap to fire: bullets take time to arrive, so lead the moving red outlaws. Spare the pale townsfolk, count your bullets and reload before the chamber runs dry.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Fire at that spot' },
    { keys: ['←', '→', 'Space', 'R'], action: 'Aim, fire, reload' },
  ],
  motif: 'The shooting lanes: outlaws wear red masks with a cross mark, townsfolk are pale with a ring, and the bullet trail shows the lead you need.',
  cover: [
    ['stars', 30, 62],
    ['sun', 80, 22, 9],
    ['mesa', 70, 'mesa'],
    ['rect', 0, 70, 100, 70, 'umber'],
    ['line', 0, 84, 100, 84, 'ember', 0.6, '3 3'],
    ['line', 0, 100, 100, 100, 'ember', 0.6, '3 3'],
    ['circ', 22, 78, 4, 'red', 'bone', 0.8],
    ['rect', 17, 82, 10, 12, 'red'],
    ['line', 19, 76, 25, 80, 'bone', 0.9],
    ['line', 25, 76, 19, 80, 'bone', 0.9],
    ['circ', 68, 94, 4, 'bone', 'rose', 0.8],
    ['rect', 63, 98, 10, 12, 'bone'],
    ['circ', 68, 94, 6.5, 'none', 'rose', 0.8],
    ['circ', 50, 122, 8, 'night', 'bone', 1],
    ['poly', [[48, 114], [50, 104], [52, 114]], 'tan', 'bone', 0.8],
    ['line', 50, 104, 22, 80, 'rose', 0.8, '1.5 2'],
  ],
  smoke: { tap: [0.5, 0.4] },
};
