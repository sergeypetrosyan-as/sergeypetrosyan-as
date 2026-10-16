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

const VEE_CLASSIC = { K: '#0a0b1e', H: '#eef1ff', h: '#9aa3d6', V: '#32f6ff', v: '#d8feff', S: '#ff3bd4', s: '#a3168a', B: '#2b3478', b: '#4251b8', L: '#32f6ff', O: '#ffb347' };
/** Unlocked with all six arcade tokens. */
const VEE_RETRO = { K: '#0a0b1e', H: '#ffe066', h: '#c99a2e', V: '#ff3355', v: '#ffd0d8', S: '#7dff5c', s: '#2f9e2a', B: '#5a1a6e', b: '#8a2fa6', L: '#7dff5c', O: '#32f6ff' };

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
  const hurtPal = { ...pal, H: '#ff3355', h: '#a3162e', V: '#ffffff' };
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
const SHARD = ['.....K......', '....KPK.....', '...KPpPK....', '..KPPWpPK...', '.KPPWWPpPK..', 'KPPPWPPpPPK.', '.KPPPPPpPK..', '..KPPPPPK...', '...KPPPK....', '....KPK.....', '.....K......', '............'];
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
    const K = '#0a0b1e';
    this.enemy = {
      slime: bake(SLIME, { K, G: '#3dffb0', g: '#16a57a', W: '#f3f6ff' }),
      drone: [true, false].map((b) => bake(DRONE(b), { K, P: '#ff3bd4', E: '#32f6ff', e: '#d8feff' })),
      hopper: [false, true].map((c) => bake(HOPPER(c), { K, Y: '#c8ff3d', y: '#7aa61e', W: '#f3f6ff', O: '#ffb347' })),
      turret: bake(TURRET, { K, T: '#6b5a7a', t: '#a08cb4', E: '#ffb347' }),
      phantom: bake(PHANTOM, { K, P: '#c85cff', p: '#7a2fb0', W: '#f3f6ff' }),
      spiker: bake(SPIKER, { K, R: '#ff3355', r: '#a3162e', W: '#ffe066', O: '#ffb347' }),
    };
    const voltPal = { K, O: '#ffb347', Y: '#fff3c4' };
    this.props = {
      volt: [bake(VOLT, voltPal), bake(VOLT.map((r) => r.slice(1, 7).padStart(7, '.').padEnd(8, '.')), voltPal), bake(['...KK...', '..KOYK..', '..KOYK..', '..KYOK..', '..KOYK..', '..KYOK..', '..KOOK..', '...KK...'], voltPal)],
      shard: bake(SHARD, { K, P: '#ff3bd4', p: '#a3168a', W: '#ffd6f6' }),
      token: bake(TOKEN, { K, G: '#7dff5c', W: '#0a0b1e' }),
      repair: bake(CELL, { K, G: '#7dff5c', g: '#2f9e2a', W: '#f3f6ff' }),
      shield: bake(SHIELD, { K, C: '#32f6ff', c: '#1a8a9e', W: '#f3f6ff' }),
      overdrive: bake(CORE, { K, Y: '#ffe066', O: '#ff6a2b', W: '#ffffff' }),
      terminal: bake(TERMINAL, { K, M: '#3a3f7a', G: '#7dff5c' }),
      spring: bake(SPRING, { K, C: '#32f6ff', M: '#3a3f7a' }),
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
