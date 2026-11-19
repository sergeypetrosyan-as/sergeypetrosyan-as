/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap a stone channel to turn it a quarter. Water pours from the spring and runs only through channels that join, so link the spring to every trough before your turns run out.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Turn a channel' },
    { keys: ['Arrows', 'Enter'], action: 'Move cursor, turn' },
  ],
  motif: 'The water itself: channels it has reached light up with a bright inner stream, and every trough shows an empty bowl until it fills.',
  cover: [
    ['stars', 30, 21],
    ['moon', 78, 24, 10, 0.2],
    ['mesa', 96, 'mesa'],
    ['rect', 0, 96, 100, 44, 'umber'],
    ['rect', 10, 62, 80, 8, 'tan', 'bone', 0.8],
    ['rect', 10, 70, 10, 30, 'saddle'],
    ['rect', 45, 70, 10, 30, 'saddle'],
    ['rect', 80, 70, 10, 30, 'saddle'],
    ['path', 'M20 100 Q32 78 45 100', 'umber', 'saddle', 1],
    ['path', 'M55 100 Q68 78 80 100', 'umber', 'saddle', 1],
    ['line', 12, 66, 88, 66, 'rose', 1.4],
    ['poly', [[88, 56], [96, 56], [94, 64], [90, 64]], 'night', 'bone', 0.8],
    ['path', 'M12 40 L12 56 L24 56', 'none', 'bone', 1.6],
    ['star5', 12, 36, 4, 'rose'],
    ['path', 'M30 112 L50 112 L50 128 L70 128', 'none', 'tan', 3],
    ['path', 'M30 112 L50 112 L50 128 L70 128', 'none', 'rose', 1],
  ],
  smoke: { click: '.aq-t:not(.aq-lock)' },
};
