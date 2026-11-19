/** @type {import('../core/types').Meta} */
export default {
  how: 'Gophers and sheriff’s hats pop out of nine holes. Tap every gopher before it dives (+10), but leave the hat alone: three hat taps end the day. Score 180 before sundown.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Whack a gopher' },
    { keys: ['1', '9'], action: 'Holes, laid out like a number pad' },
  ],
  motif: 'A sun slides along a track above the holes toward the horizon as the day runs out, so remaining time is always visible.',
  cover: [
    ['stars', 24, 61],
    ['sun', 74, 22, 8],
    ['mesa', 80, 'mesa'],
    ['rect', 0, 80, 100, 60, 'umber'],
    ['circ', 24, 92, 9, 'night', 'ember', 1], ['circ', 50, 92, 9, 'night', 'ember', 1], ['circ', 76, 92, 9, 'night', 'ember', 1],
    ['circ', 24, 112, 9, 'night', 'ember', 1], ['circ', 50, 112, 9, 'night', 'ember', 1], ['circ', 76, 112, 9, 'night', 'ember', 1],
    ['circ', 50, 86, 6, 'tan', 'ink', 1], ['circ', 47, 80, 2, 'tan', 'ink', 0.8], ['circ', 53, 80, 2, 'tan', 'ink', 0.8],
    ['circ', 48, 85, 0.9, 'ink'], ['circ', 52, 85, 0.9, 'ink'],
    ['star5', 76, 104, 7, 'red'],
    ['circ', 24, 106, 5, 'tan', 'ink', 1],
    ['line', 6, 92, 14, 84, 'bone', 1.4],
  ],
  smoke: { click: '[data-hole="4"]' },
};
