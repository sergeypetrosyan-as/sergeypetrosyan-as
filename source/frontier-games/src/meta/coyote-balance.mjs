/** @type {import('../core/types').Meta} */
export default {
  how: 'Each season choose the coyote bounty, then press Next season. Coyotes eat rabbits and rabbits feed coyotes, so too much hunting or too little both end in collapse. Keep both herds alive for five years.',
  controls: [
    { keys: ['Tap', 'Click'], action: 'Pick a bounty level' },
    { keys: ['←', '→', 'Enter'], action: 'Bounty, next season' },
  ],
  motif: 'A population chart: rabbits are a solid line with round marks, coyotes a dashed line with triangles, and the safe band shows where neither herd is in danger.',
  cover: [
    ['stars', 34, 41],
    ['moon', 22, 22, 10, 0],
    ['mesa', 80, 'mesa'],
    ['rect', 0, 80, 100, 60, 'umber'],
    ['rect', 8, 88, 84, 44, 'night', 'ember', 0.8],
    ['path', 'M10 112 Q24 90 38 112 Q52 130 66 106 Q78 94 90 108', 'none', 'rose', 1.6],
    ['path', 'M10 108 Q24 124 38 104 Q52 92 66 114 Q78 126 90 112', 'none', 'bone', 1.2],
    ['circ', 38, 112, 2, 'rose'],
    ['circ', 66, 106, 2, 'rose'],
    ['poly', [[24, 118], [27, 123], [21, 123]], 'bone'],
    ['poly', [[52, 94], [55, 99], [49, 99]], 'bone'],
    ['poly', [[68, 56], [74, 46], [80, 56], [78, 56], [80, 62], [68, 62]], 'ink'],
    ['poly', [[68, 46], [70, 40], [72, 46]], 'ink'],
    ['poly', [[78, 46], [80, 40], [82, 46]], 'ink'],
  ],
  smoke: { click: '[data-b="2"]' },
};
