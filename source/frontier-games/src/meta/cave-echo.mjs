/** @type {import('../core/types').Meta} */
export default {
  how: 'The cave is dark. Press Ping to hear how far each direction runs before a wall rings back, then walk to the star exit. Steps, bumps and pings all spend air.',
  controls: [
    { keys: ['← ↑ ↓ →', 'WASD'], action: 'Walk one cell' },
    { keys: ['Space', 'Ping button'], action: 'Ping all four directions (2 air)' },
  ],
  motif: 'An expanding ripple marks each ping, and the number beside each direction is how many cells open up before its wall.',
  cover: [
    ['stars', 22, 2],
    ['moon', 80, 20, 9, 0.5],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['rect', 10, 36, 80, 74, 'night', 'saddle', 1.6],
    ['line', 10, 60, 40, 60, 'bone', 1.8],
    ['line', 40, 60, 40, 84, 'bone', 1.8],
    ['line', 60, 36, 60, 70, 'bone', 1.8],
    ['line', 60, 90, 90, 90, 'bone', 1.8],
    ['circ', 28, 76, 4, 'bone', 'ink', 0.8],
    ['circ', 28, 76, 10, 'none', 'rose', 0.8, ],
    ['circ', 28, 76, 18, 'none', 'rose', 0.5],
    ['star5', 76, 100, 5, 'rose'],
  ],
  smoke: { key: ' ' },
};
