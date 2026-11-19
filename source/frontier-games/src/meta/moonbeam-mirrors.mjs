/** @type {import('../core/types').Meta} */
export default {
  how: 'The moon fires a beam in from the left. Tap a mirror to flip its slant and watch the beam re-route; light every lantern before your turns run out.',
  controls: [
    { keys: ['Tap', 'Click', 'Enter'], action: 'Flip a mirror' },
  ],
  motif: 'The beam itself is the motif: a bone-white line drawn through every cell it reaches, so the effect of each flip is visible at once. A lantern turns rose and fills when lit.',
  cover: [
    ['stars', 28, 9],
    ['moon', 16, 62, 9, 0],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['line', 0, 112, 100, 112, 'ember', 0.8],
    ['line', 25, 62, 50, 62, 'bone', 1.4],
    ['line', 50, 62, 50, 36, 'bone', 1.4],
    ['line', 50, 36, 78, 36, 'bone', 1.4],
    ['line', 50, 62, 78, 62, 'bone', 1.4, '2 2'],
    ['line', 43, 69, 57, 55, 'tan', 3.2],
    ['line', 43, 69, 57, 55, 'bone', 1],
    ['line', 43, 43, 57, 29, 'tan', 3.2],
    ['line', 43, 43, 57, 29, 'bone', 1],
    ['poly', [[84, 26], [90, 36], [84, 46], [78, 36]], 'rose', 'bone', 1],
    ['poly', [[84, 52], [90, 62], [84, 72], [78, 62]], 'night', 'rose', 1],
    ['poly', [[38, 92], [46, 104], [30, 104]], 'wine', 'rose', 0.8],
  ],
  smoke: { click: '[data-mirror]' },
};
