/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap a valve to send one unit of water toward the emptier chamber. The barge can sail only to a neighbouring chamber at the same water level. Get it to the last chamber.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Open a valve, or sail the barge' },
  ],
  motif: 'The water level lines in each chamber show whether the barge can cross: sail only when the surfaces match.',
  cover: [
    ['stars', 26, 33],
    ['moon', 20, 20, 8, 0.3],
    ['mesa', 66, 'mesa'],
    ['rect', 0, 66, 100, 74, 'umber'],
    ['rect', 8, 84, 24, 40, 'night', 'ember', 1.2],
    ['rect', 38, 84, 24, 40, 'night', 'ember', 1.2],
    ['rect', 68, 84, 24, 40, 'night', 'ember', 1.2],
    ['rect', 9, 108, 22, 15, 'ash', 'bone', 0.8],
    ['rect', 39, 98, 22, 25, 'ash', 'bone', 0.8],
    ['rect', 69, 92, 22, 31, 'ash', 'bone', 0.8],
    ['rect', 42, 91, 16, 8, 'bone', 'red', 1, 2],
    ['circ', 35, 100, 4, 'night', 'rose', 1],
    ['circ', 65, 100, 4, 'night', 'rose', 1],
    ['path', 'M33 100 L37 100 M63 100 L67 100', 'none', 'bone', 0.9],
    ['star5', 80, 78, 5, 'rose'],
  ],
  smoke: { click: '[data-valve]' },
};
