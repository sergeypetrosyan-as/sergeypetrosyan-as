/** @type {import('../core/types').Meta} */
export default {
  how: 'Crates pile up in the yard. Pick which train the single loader fills, then send full trains away. If the yard overflows, the shift is lost. Survive three shifts.',
  controls: [
    { keys: ['Tap Load', '1 2 3'], action: 'Point the loader at a train' },
    { keys: ['Tap Send', 'Q W E'], action: 'Dispatch that train' },
  ],
  motif: 'A yard gauge shows how close the piles are to the depot limit: rose while safe, red with a warning label near overflow.',
  cover: [
    ['stars', 30, 41],
    ['moon', 20, 20, 8, 0.3],
    ['mesa', 100, 'mesa'],
    ['rect', 0, 100, 100, 40, 'umber'],
    ['line', 0, 112, 100, 112, 'ember', 1.4], ['line', 0, 120, 100, 120, 'ember', 1.4], ['line', 0, 128, 100, 128, 'ember', 1.4],
    ['rect', 10, 90, 20, 14, 'wine', 'bone', 0.8], ['circ', 18, 106, 3, 'ink', 'bone', 0.6], ['circ', 24, 106, 3, 'ink', 'bone', 0.6],
    ['rect', 32, 94, 22, 10, 'tan', 'ink', 0.8], ['rect', 56, 94, 22, 10, 'saddle', 'ink', 0.8],
    ['rect', 14, 70, 10, 10, 'saddle', 'bone', 0.8], ['rect', 26, 70, 10, 10, 'tan', 'bone', 0.8], ['rect', 20, 59, 10, 10, 'rose', 'bone', 0.8],
    ['rect', 74, 56, 4, 40, 'ink'], ['circ', 76, 54, 4, 'red', 'bone', 0.8],
    ['line', 84, 70, 98, 70, 'ember', 0.8, '2 2'],
  ],
  smoke: { click: '[data-load="0"]' },
};
