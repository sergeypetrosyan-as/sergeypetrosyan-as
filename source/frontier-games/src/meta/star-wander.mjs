/** @type {import('../core/types').Meta} */
export default {
  how: 'Tap a glowing neighbour star to hop there. Three chart cards show hidden shapes: hop along the dotted lanes to trace one exactly and it lights up in the sky.',
  controls: [
    { keys: ['Tap', 'Click', 'Enter'], action: 'Hop to a neighbouring star' },
  ],
  motif: 'The dotted lanes between stars show which hops are possible (adjacency), and your trail is drawn as a bone line so you can compare it with the chart shapes.',
  cover: [
    ['stars', 40, 41],
    ['moon', 82, 18, 8, 0.4],
    ['mesa', 112, 'mesa'],
    ['rect', 0, 112, 100, 28, 'umber'],
    ['line', 0, 112, 100, 112, 'ember', 0.8],
    ['con', [[16, 78], [28, 58], [46, 64], [58, 42], [74, 50]]],
    ['con', [[62, 88], [78, 76], [88, 90]]],
    ['circ', 46, 64, 4.6, 'none', 'bone', 0.9],
    ['star5', 58, 42, 4, 'rose'],
    ['star5', 74, 50, 4, 'rose'],
    ['circ', 28, 58, 1.6, 'rose'],
    ['line', 16, 78, 20, 98, 'ember', 0.5, '1 2'],
  ],
  smoke: { click: '[data-reach="1"]' },
};
