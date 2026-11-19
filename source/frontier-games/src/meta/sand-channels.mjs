/** @type {import('../core/types').Meta} */
export default {
  how: 'Drag across the map to draw a few ledges, then press Release sand. Sand slides down your slopes: steer enough grains into every cup to fill its meter. Three levels.',
  controls: [
    { keys: ['Drag'], action: 'Draw a ledge' },
    { keys: ['Space'], action: 'Release the sand' },
    { keys: ['Z'], action: 'Undo the last ledge' },
  ],
  motif: 'Each cup has a fill meter that turns rose when its quota is met, so progress is read on the cup itself.',
  cover: [
    ['stars', 24, 27],
    ['sun', 22, 20, 7],
    ['mesa', 80, 'mesa'],
    ['poly', [[38, 8], [62, 8], [54, 22], [46, 22]], 'saddle', 'tan', 1],
    ['line', 28, 44, 56, 56, 'bone', 3],
    ['line', 72, 66, 46, 78, 'bone', 3],
    ['line', 24, 92, 44, 100, 'bone', 3],
    ['circ', 50, 26, 1.2, 'tan'], ['circ', 48, 34, 1.2, 'tan'], ['circ', 55, 44, 1.2, 'tan'], ['circ', 40, 58, 1.2, 'tan'], ['circ', 30, 80, 1.2, 'tan'],
    ['path', 'M6 108 V132 H36 V108', 'none', 'bone', 2],
    ['path', 'M62 108 V132 H92 V108', 'none', 'rose', 2],
    ['rect', 8, 122, 26, 8, 'tan'],
    ['rect', 64, 114, 26, 16, 'rose'],
    ['star5', 78, 100, 4, 'rose'],
  ],
  smoke: { drag: [0.25, 0.4, 0.6, 0.55] },
};
