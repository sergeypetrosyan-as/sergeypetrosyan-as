/** @type {import('../core/types').Meta} */
export default {
  how: 'Drag the lever (or press Up and Down) to set the pump rate so the tank stays inside the safe band while the town\'s demand rises and falls. Watch the forecast and survive three days.',
  controls: [
    { keys: ['Drag lever', '↑ ↓'], action: 'Faster or slower pump' },
  ],
  motif: 'The sun crosses the mesa horizon once per day, and the demand forecast ahead of "now" shows swings before they hit the tank.',
  cover: [
    ['stars', 28, 17],
    ['sun', 74, 28, 9],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['rect', 16, 40, 28, 70, 'night', 'bone', 1.4],
    ['rect', 17, 70, 26, 39, 'rose'],
    ['line', 12, 56, 48, 56, 'rose', 0.8, '2 2'],
    ['line', 12, 90, 48, 90, 'rose', 0.8, '2 2'],
    ['path', 'M58 94 Q66 62 74 80 T92 66', 'none', 'tan', 1.6],
    ['line', 56, 74, 96, 74, 'rose', 0.8, '2 2'],
    ['rect', 44, 100, 18, 4, 'saddle'],
  ],
  smoke: { key: 'ArrowUp' },
};
