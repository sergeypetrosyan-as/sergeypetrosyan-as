/** @type {import('../core/types').Meta} */
export default {
  how: 'Flip two face-down arcana cards at a time. If they match they stay face up; if not, remember where they were. Find all eight pairs before your tenth miss.',
  controls: [
    { keys: ['Tap'], action: 'Flip a card' },
    { keys: ['Tab', 'Enter'], action: 'Flip with the keyboard' },
  ],
  motif: 'Every card face carries a drawn arcana symbol and its numeral, so a match is read by shape and name, never by colour.',
  cover: [
    ['stars', 22, 33],
    ['mesa', 52, 'mesa'],
    ['rect', 8, 62, 24, 34, 'dusk', 'ember', 1.2, 3],
    ['poly', [[20, 70], [26, 79], [20, 88], [14, 79]], 'none', 'tan', 0.8],
    ['rect', 38, 62, 24, 34, 'tan', 'bone', 1.2, 3],
    ['star5', 50, 78, 8, 'ink'],
    ['rect', 68, 62, 24, 34, 'rose', 'bone', 1.2, 3],
    ['moon', 80, 79, 7, 0.4],
    ['rect', 8, 102, 24, 34, 'tan', 'bone', 1.2, 3],
    ['sun', 20, 119, 5],
    ['rect', 38, 102, 24, 34, 'dusk', 'ember', 1.2, 3],
    ['poly', [[50, 110], [56, 119], [50, 128], [44, 119]], 'none', 'tan', 0.8],
    ['rect', 68, 102, 24, 34, 'rose', 'bone', 1.2, 3],
    ['star5', 80, 119, 8, 'ink'],
  ],
  smoke: { click: '[data-card]' },
};
