/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap fair events to keep them on your timeline. Events that overlap in time cannot both stay. Reach the value quota, then lock in your schedule.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Keep or drop an event' },
    { keys: ['Lock in'], action: 'Submit the schedule' },
  ],
  motif: 'The day axis lines events up in time, so overlaps show as bars stacked in the same columns.',
  cover: [
    ['stars', 30, 3],
    ['sun', 22, 24, 8],
    ['mesa', 70, 'mesa'],
    ['rect', 0, 70, 100, 70, 'umber'],
    ['line', 10, 76, 90, 76, 'ember', 1],
    ['line', 10, 74, 10, 78, 'ember', 1], ['line', 30, 74, 30, 78, 'ember', 1], ['line', 50, 74, 50, 78, 'ember', 1], ['line', 70, 74, 70, 78, 'ember', 1], ['line', 90, 74, 90, 78, 'ember', 1],
    ['rect', 10, 82, 38, 11, 'rose', 'bone', 1, 3],
    ['rect', 30, 96, 34, 11, 'saddle', 'tan', 1, 3],
    ['rect', 52, 82, 38, 11, 'rose', 'bone', 1, 3],
    ['rect', 14, 110, 30, 11, 'saddle', 'red', 1, 3],
    ['rect', 56, 110, 34, 11, 'saddle', 'tan', 1, 3],
    ['line', 18, 126, 24, 126, 'bone', 1],
    ['star5', 86, 24, 5, 'rose'],
  ],
  smoke: { click: '[data-ev="0"]' },
};
