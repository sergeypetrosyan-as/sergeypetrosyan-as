/**
 * All art is original pixel art authored as text and baked to canvases once at start.
 * Each character maps to a palette colour; '.' is transparent.
 */
export type Sprite = HTMLCanvasElement;

export function bake(rows: string[], palette: Record<string, string>): Sprite {
  const w = rows.reduce((m, r) => Math.max(m, r.length), 0);
  const c = document.createElement('canvas');
  c.width = w;
  c.height = rows.length;
  const ctx = c.getContext('2d')!;
  rows.forEach((r, y) => {
    for (let x = 0; x < r.length; x++) {
      const col = palette[r[x]];
      if (!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect(x, y, 1, 1);
    }
  });
  return c;
}

// ------------------------------------------------------------------ Vee

const VEE_CLASSIC = { K: '#150607', H: '#F1EDE7', h: '#D3B9B7', V: '#A5A29E', v: '#FFFFFF', S: '#AB0B1A', s: '#72151D', B: '#AF7D7E', b: '#D3B9B7', L: '#F1EDE7', O: '#683E40' };
/** Unlocked with all six arcade tokens. */
const VEE_RETRO = { K: '#150607', H: '#EEB9B9', h: '#AF7D7E', V: '#72151D', v: '#EEB9B9', S: '#D3B9B7', s: '#AF7D7E', B: '#480E13', b: '#72151D', L: '#D3B9B7', O: '#A5A29E' };

const HEAD = [
  '................',
  '.....KKKKKK.....',
  '....KHHHHHHK....',
  '...KHHHHHHHHK...',
  '...KHHKKKKKKKK..',
  '...KHKVVVVVvVK..',
];
const SCARF_STILL = ['..sKHKVVVVVVVK..', '.ssKhHKKKKKKK...', 'SSSSKhhhhhhK....', '.SSSSKKKKKK.....'];
const SCARF_FLY_A = ['ssSKHKVVVVVVVK..', 'SSSKhHKKKKKKK...', 'SS.SKhhhhhhK....', '...SSKKKKKK.....'];
const SCARF_FLY_B = ['...KHKVVVVVVVK..', 'sssKhHKKKKKKK...', 'SSSSKhhhhhhK....', 'SS..SKKKKKK.....'];
const TORSO = ['...KBBLBBBBK....', '..KBBBLBBBbbK...', '..KbKBBLBBKbK...', '...KKBBBBBK.K...'];
const LEGS: Record<string, string[]> = {
  stand: ['....KBBKBBK.....', '....KOOKOOK.....', '....KOOKOOOK....', '....KKK.KKKK....'],
  stride: ['...KBBK.KBBK....', '..KOOK...KOOK...', '.KOOOK....KOOK..', '.KKKK.....KKKK..'],
  pass: ['....KBBBBK......', '.....KOOK.......', '.....KOOOK......', '.....KKKKK......'],
  tuck: ['....KBBBBK......', '...KOOKKOOK.....', '...KOOK.KOOK....', '...KKK..KKK.....'],
  dangle: ['...KBBK.KBBK....', '...KOOK.KOOK....', '...KOOK..KOOK...', '...KKK...KKK....'],
};

function vee(scarf: string[], legs: string[], bob = 0): string[] {
  const rows = [...HEAD, ...scarf, ...TORSO, ...legs];
  return bob ? ['................', ...rows.slice(0, -1)] : rows;
}

export interface VeeFrames {
  idle: Sprite[];
  run: Sprite[];
  rise: Sprite;
  fall: Sprite;
  hurt: Sprite;
}

function bakeVee(pal: Record<string, string>): VeeFrames {
  const hurtPal = { ...pal, H: '#E30016', h: '#72151D', V: '#FFFFFF' };
  return {
    idle: [bake(vee(SCARF_STILL, LEGS.stand), pal), bake(vee(SCARF_FLY_B, LEGS.stand), pal)],
    run: [
      bake(vee(SCARF_FLY_A, LEGS.stride), pal),
      bake(vee(SCARF_FLY_B, LEGS.pass, 1), pal),
      bake(vee(SCARF_FLY_A, LEGS.stride), pal),
      bake(vee(SCARF_FLY_B, LEGS.pass, 1), pal),
    ],
    rise: bake(vee(SCARF_FLY_B, LEGS.tuck), pal),
    fall: bake(vee(SCARF_FLY_A, LEGS.dangle), pal),
    hurt: bake(vee(SCARF_FLY_A, LEGS.dangle), hurtPal),
  };
}

// ------------------------------------------------------------------ enemies

const SLIME = [
  '................',
  '.....KKKKKK.....',
  '...KKGGGGGGKK...',
  '..KGGgGGGGGGGK..',
  '..KGWKGGGWKGGK..',
  '.KGGWKGGGWKGGGK.',
  '.KGGGGGGGGGGGGK.',
  '.KGgGGGGGGGgGGK.',
  'KGGGGGGGGGGGGGGK',
  'KgGgGgGgGgGgGgGK',
  '.KKKKKKKKKKKKKK.',
];
const DRONE = (blade: boolean) => [
  blade ? '.KKKKKK..KKKKKK.' : '....KKKKKKKK....',
  '.......KK.......',
  '.....KKKKKK.....',
  '...KKPPPPPPKK...',
  '..KPPPPPPPPPPK..',
  '..KPKKKKKKKKPK..',
  '..KPKEEEEeEKPK..',
  '..KPPKKKKKKPPK..',
  '...KPPPPPPPPK...',
  '....KKKKKKKK....',
  '.....K....K.....',
];
const HOPPER = (crouch: boolean) =>
  crouch
    ? ['................', '................', '................', '....KKKKKKKK....', '..KKYYYYYYYYKK..', '.KYYWKYYYYWKYYK.', '.KYYWKYYYYWKYYK.', '.KYYYYYYYYYYYYK.', '.KyYYYYYYYYYYyK.', '.KKKKKKKKKKKKKK.', '.KOOK......KOOK.', 'KOOOK......KOOOK', 'KKKK........KKKK']
    : ['................', '....KKKKKKKK....', '..KKYYYYYYYYKK..', '.KYYWKYYYYWKYYK.', '.KYYWKYYYYWKYYK.', '.KYYYYYYYYYYYYK.', '.KyYYYYYYYYYYyK.', '.KKKKKKKKKKKKKK.', '...KOK....KOK...', '...KOK....KOK...', '..KOOK....KOOK..', '..KOOK....KOOK..', '..KKK......KKK..'];
const TURRET = [
  '................',
  '....KKKKKKK.....',
  '...KTTTTTTTK....',
  '..KTtttttttTK...',
  'KKKTtKKKKKtTK...',
  'EEETtKEEEKtTK...',
  'KKKTtKKKKKtTK...',
  '..KTtttttttTK...',
  '..KTTTTTTTTTK...',
  '..KKKKKKKKKKK...',
  '.KTTTTTTTTTTTK..',
  '.KTtTtTtTtTtTK..',
  '.KTTTTTTTTTTTK..',
  '.KKKKKKKKKKKKK..',
];
const PHANTOM = [
  '................',
  '.....KKKKKK.....',
  '....KPPPPPPK....',
  '...KPPPPPPPPK...',
  '..KPPWWPPWWPPK..',
  '..KPPWKPPWKPPK..',
  '..KPPPPPPPPPPK..',
  '..KPPPKKKKPPPK..',
  '..KPPPPPPPPPPK..',
  '..KpPPPPPPPPpK..',
  '..KpPPPPPPPPpK..',
  '..KppPPPPPPppK..',
  '..KppPpPPpPppK..',
  '..KpKpKppKpKpK..',
  '..K.K.K..K.K.K..',
];
const SPIKER = [
  '..K...K...K...K.',
  '.KRK.KRK.KRK.KRK',
  'KRRRKRRRKRRRKRRK',
  'KRrRRRRRRRRRRrRK',
  'KRRRRRRRRRRRRRRK',
  'KRRWWKRRRRRWWKRK',
  'KRRWKKRRRRRWKKRK',
  'KRRRRRRRRRRRRRRK',
  '.KKKKKKKKKKKKKK.',
  '.KOK.KOK.KOK.KOK',
];

export interface EnemyFrames {
  slime: Sprite;
  drone: Sprite[];
  hopper: Sprite[];
  turret: Sprite;
  phantom: Sprite;
  spiker: Sprite;
}

// ------------------------------------------------------------------ pickups & props

const VOLT = ['..KKKK..', '.KOOOYK.', 'KOOKYYOK', 'KOKYKOOK', 'KOOYKOOK', 'KOYKKOOK', '.KOOOOK.', '..KKKK..'];
/** A stamped five-point star: rose face, bone edge (19_mystical-western collectible). */
const SHARD = ['.....WW.....', '.....WW.....', '....WPPW....', 'WWWWWPPWWWWW', 'WPPPPPPPPppW', '.WPPPPPPppW.', '..WPPPPppW..', '..WPPPPPpW..', '.WPPPWWPPpW.', '.WPPW..WPpW.', 'WWW......WWW', '............'];
const TOKEN = ['...KKKKKK...', '..KGGGGGGK..', '.KGGKKKKGGK.', 'KGGKWGGWKGGK', 'KGGKGGGGKGGK', 'KGGKGWWGKGGK', 'KGGKGGGGKGGK', 'KGGKWGGWKGGK', '.KGGKKKKGGK.', '..KGGGGGGK..', '...KKKKKK...', '............'];
const CELL = ['............', '....KKKK....', '...KGGGGK...', '..KKKKKKKK..', '..KGGWGGGK..', '..KGWWWGGK..', '..KGGWGGGK..', '..KGGGGGGK..', '..KggggggK..', '..KKKKKKKK..', '............', '............'];
const SHIELD = ['....KKKK....', '..KKCCCCKK..', '.KCCWWCCCCK.', '.KCWCCCCCCK.', 'KCCWCCCCCCCK', 'KCCCCCCCCCCK', 'KCCCCCCCCCCK', 'KCCCCCCCcCCK', '.KCCCCCCcCK.', '.KCCCCCccCK.', '..KKCCCCKK..', '....KKKK....'];
const CORE = ['....KKKK....', '..KKYYYYKK..', '.KYYYKKYYYK.', '.KYYKOOKYYK.', 'KYYKOWWOKYYK', 'KYYKOWWOKYYK', 'KYYKOOOOKYYK', 'KYYYKOOKYYYK', '.KYYYKKYYYK.', '.KYYYYYYYYK.', '..KKYYYYKK..', '....KKKK....'];
const TERMINAL = ['.KKKKKKKKKKKKK..', '.KMMMMMMMMMMMK..', '.KMKKKKKKKKKMK..', '.KMKGGGKGGKKMK..', '.KMKKKKKKKKKMK..', '.KMKGGKGGGGKMK..', '.KMKKKKKKKKKMK..', '.KMMMMMMMMMMMK..', '.KKKKKKKKKKKKK..', '.....KMMK.......', '.....KMMK.......', '....KMMMMK......', '...KMMMMMMK.....', '...KKKKKKKK.....'];
const SPRING = ['KKKKKKKKKKKKKK', 'KCCCCCCCCCCCCK', 'KKKKKKKKKKKKKK', '..K.K.K.K.K...', '...K.K.K.K.K..', '..K.K.K.K.K...', '.KKKKKKKKKKKK.', '.KMMMMMMMMMMK.'];

export interface PropSprites {
  volt: Sprite[];
  shard: Sprite;
  token: Sprite;
  repair: Sprite;
  shield: Sprite;
  overdrive: Sprite;
  terminal: Sprite;
  spring: Sprite;
}

export class SpriteBank {
  vee: VeeFrames;
  readonly veeClassic: VeeFrames;
  readonly veeRetro: VeeFrames;
  readonly enemy: EnemyFrames;
  readonly props: PropSprites;

  constructor() {
    this.veeClassic = bakeVee(VEE_CLASSIC);
    this.veeRetro = bakeVee(VEE_RETRO);
    this.vee = this.veeClassic;
    const K = '#030303';
    this.enemy = {
      slime: bake(SLIME, { K, G: '#E30016', g: '#72151D', W: '#F1EDE7' }),
      drone: [true, false].map((b) => bake(DRONE(b), { K, P: '#AB0B1A', E: '#EEB9B9', e: '#FFFFFF' })),
      hopper: [false, true].map((c) => bake(HOPPER(c), { K, Y: '#CD0418', y: '#72151D', W: '#F1EDE7', O: '#AF7D7E' })),
      turret: bake(TURRET, { K, T: '#6E6C6A', t: '#A5A29E', E: '#E30016' }),
      phantom: bake(PHANTOM, { K, P: '#EEB9B9', p: '#AB0B1A', W: '#150607' }),
      spiker: bake(SPIKER, { K, R: '#E30016', r: '#72151D', W: '#F1EDE7', O: '#D3B9B7' }),
    };
    const voltPal = { K, O: '#E96B74', Y: '#EEB9B9' };
    this.props = {
      volt: [bake(VOLT, voltPal), bake(VOLT.map((r) => r.slice(1, 7).padStart(7, '.').padEnd(8, '.')), voltPal), bake(['...KK...', '..KOYK..', '..KOYK..', '..KYOK..', '..KOYK..', '..KYOK..', '..KOOK..', '...KK...'], voltPal)],
      shard: bake(SHARD, { K, P: '#E96B74', p: '#AB0B1A', W: '#F1EDE7' }),
      token: bake(TOKEN, { K, G: '#D3B9B7', W: '#150607' }),
      repair: bake(CELL, { K, G: '#EEB9B9', g: '#E96B74', W: '#FFFFFF' }),
      shield: bake(SHIELD, { K, C: '#D3B9B7', c: '#AF7D7E', W: '#FFFFFF' }),
      overdrive: bake(CORE, { K, Y: '#EEB9B9', O: '#E96B74', W: '#FFFFFF' }),
      terminal: bake(TERMINAL, { K, M: '#683E40', G: '#D3B9B7' }),
      spring: bake(SPRING, { K, C: '#D3B9B7', M: '#6E6C6A' }),
    };
  }

  useSkin(retro: boolean): void {
    this.vee = retro ? this.veeRetro : this.veeClassic;
  }
}

// ------------------------------------------------------------------ 3×5 pixel font

/** 3×5 glyphs, rows separated by |. */
const GLYPHS: Record<string, string> = {
  0: '###|#.#|#.#|#.#|###', 1: '.#.|##.|.#.|.#.|###', 2: '##.|..#|.#.|#..|###', 3: '##.|..#|.#.|..#|##.',
  4: '#.#|#.#|###|..#|..#', 5: '###|#..|##.|..#|##.', 6: '.##|#..|###|#.#|###', 7: '###|..#|.#.|.#.|.#.',
  8: '###|#.#|###|#.#|###', 9: '###|#.#|###|..#|##.', A: '.#.|#.#|###|#.#|#.#', B: '##.|#.#|##.|#.#|##.',
  C: '.##|#..|#..|#..|.##', D: '##.|#.#|#.#|#.#|##.', E: '###|#..|##.|#..|###', F: '###|#..|##.|#..|#..',
  G: '.##|#..|#.#|#.#|.##', H: '#.#|#.#|###|#.#|#.#', I: '###|.#.|.#.|.#.|###', J: '..#|..#|..#|#.#|.#.',
  K: '#.#|#.#|##.|#.#|#.#', L: '#..|#..|#..|#..|###', M: '#.#|###|###|#.#|#.#', N: '##.|#.#|#.#|#.#|#.#',
  O: '.#.|#.#|#.#|#.#|.#.', P: '##.|#.#|##.|#..|#..', Q: '.#.|#.#|#.#|##.|.##', R: '##.|#.#|##.|#.#|#.#',
  S: '.##|#..|.#.|..#|##.', T: '###|.#.|.#.|.#.|.#.', U: '#.#|#.#|#.#|#.#|###', V: '#.#|#.#|#.#|#.#|.#.',
  W: '#.#|#.#|###|###|#.#', X: '#.#|#.#|.#.|#.#|#.#', Y: '#.#|#.#|.#.|.#.|.#.', Z: '###|..#|.#.|#..|###',
  '+': '...|.#.|###|.#.|...', '!': '.#.|.#.|.#.|...|.#.', '?': '##.|..#|.#.|...|.#.', '/': '..#|..#|.#.|#..|#..',
  '-': '...|...|###|...|...', '.': '...|...|...|...|.#.', ':': '...|.#.|...|.#.|...', '%': '#.#|..#|.#.|#..|#.#',
  ' ': '...|...|...|...|...',
};
const FONT: Record<string, boolean[]> = {};
for (const [ch, g] of Object.entries(GLYPHS)) FONT[ch] = g.replace(/\|/g, '').split('').map((c) => c === '#');

export function textWidth(text: string, scale = 1): number {
  return text.length ? (text.length * 4 - 1) * scale : 0;
}

/** Draws pixel text with its top-left at (x, y). */
export function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, scale = 1): void {
  ctx.fillStyle = color;
  const up = text.toUpperCase();
  for (let i = 0; i < up.length; i++) {
    const g = FONT[up[i]] ?? FONT['?'];
    for (let p = 0; p < 15; p++) if (g[p]) ctx.fillRect(Math.round(x + (i * 4 + (p % 3)) * scale), Math.round(y + Math.floor(p / 3) * scale), scale, scale);
  }
}
