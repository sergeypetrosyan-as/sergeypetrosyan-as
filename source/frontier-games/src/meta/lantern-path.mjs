/** @type {import('../core/types').Meta} */
export default {
  how: 'Watch the lanterns light a route one tile at a time. When they go dark, tap the same tiles in the same order, starting from the star.',
  controls: [
    { keys: ['Tap'], action: 'Walk to the next tile' },
    { keys: ['Show again'], action: 'Replay the route (costs a lantern)' },
  ],
  motif: 'A dotted constellation line joins each lit tile to the next, so you can see the route as a shape while it is shown.',
  cover: [
    ['stars', 36, 8],
    ['moon', 78, 22, 10, 0.4],
    ['mesa', 56, 'mesa'],
    ['rect', 14, 62, 72, 60, 'night', 'ember', 1],
    ['line', 38, 62, 38, 122, 'mesa', 0.5],
    ['line', 62, 62, 62, 122, 'mesa', 0.5],
    ['line', 14, 82, 86, 82, 'mesa', 0.5],
    ['line', 14, 102, 86, 102, 'mesa', 0.5],
    ['con', [[26, 72], [26, 92], [50, 92], [50, 112], [74, 112], [74, 92]]],
    ['rect', 20, 66, 12, 12, 'tan', 'bone', 0.7],
    ['rect', 44, 86, 12, 12, 'tan', 'bone', 0.7],
    ['star5', 26, 72, 4, 'rose'],
    ['circ', 74, 92, 4, 'rose', 'bone', 0.7],
  ],
  smoke: { click: '[data-replay]' },
};
