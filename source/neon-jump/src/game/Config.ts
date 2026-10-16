/** World units are pixels at the game's native pixel-art resolution; one tile is 16 px. */
export const TILE = 16;
/** Fixed simulation step. 120 Hz keeps landings exact at every frame rate. */
export const STEP = 1 / 120;
/** Native view height. The canvas is scaled up by a whole number so pixels stay square. */
export const VIEW_H = 270;

export const PHYS = {
  run: 140,
  sprint: 200,
  accelGround: 1300,
  accelAir: 950,
  decelGround: 1700,
  decelAir: 420,
  /** Extra grip when reversing on the ground, so turns feel snappy. */
  turnGround: 2900,
  jumpV: 440,
  gravUp: 1350,
  gravDown: 2350,
  /** Fraction of upward speed kept when jump is released early (variable height). */
  jumpCut: 0.45,
  maxFall: 520,
  coyote: 0.1,
  buffer: 0.13,
  stompV: 300,
  stompHoldV: 440,
  springV: 680,
  hurtInvuln: 1.5,
  overdriveSpeed: 1.25,
  overdriveTime: 12,
  shieldTime: 25,
} as const;

export const PLAYER_W = 10;
export const PLAYER_H = 14;

export const START_LIVES = 3;
export const MAX_HP = 3;
export const VOLTS_PER_LIFE = 100;

export const SCORE = { volt: 10, enemy: 100, shard: 500, token: 1000, secret: 250 } as const;

/** Design tokens shared by the renderer. One palette per world; the UI mirrors these in CSS. */
export interface Theme {
  name: string;
  skyTop: string;
  skyBottom: string;
  far: string;
  mid: string;
  near: string;
  window: string[];
  ground: string;
  groundDark: string;
  groundEdge: string;
  block: string;
  blockEdge: string;
  rail: string;
  accent: string;
  fog: string;
  pit: string;
}

export const THEMES: Theme[] = [
  {
    name: 'Neon Downtown',
    skyTop: '#05061a',
    skyBottom: '#1d0b3a',
    far: '#120c33',
    mid: '#1a1145',
    near: '#0c0a24',
    window: ['#32f6ff', '#ff3bd4', '#ffb347', '#7c5cff'],
    ground: '#151a3d',
    groundDark: '#0b0d24',
    groundEdge: '#32f6ff',
    block: '#2a1650',
    blockEdge: '#ff3bd4',
    rail: '#32f6ff',
    accent: '#ff3bd4',
    fog: '#ff3bd4',
    pit: '#ff3bd4',
  },
  {
    name: 'Cyber Factory',
    skyTop: '#0b0710',
    skyBottom: '#2a1208',
    far: '#1b0f12',
    mid: '#24140f',
    near: '#120b0b',
    window: ['#ffb347', '#ff6a2b', '#ffe066', '#32f6ff'],
    ground: '#2a2230',
    groundDark: '#15111a',
    groundEdge: '#ffb347',
    block: '#3a2a2a',
    blockEdge: '#ff6a2b',
    rail: '#ffb347',
    accent: '#ff6a2b',
    fog: '#ff6a2b',
    pit: '#ff6a2b',
  },
  {
    name: 'Glitch Dimension',
    skyTop: '#020208',
    skyBottom: '#0c1a14',
    far: '#0b1420',
    mid: '#101a2a',
    near: '#05080f',
    window: ['#7dff5c', '#32f6ff', '#c85cff', '#ff3bd4'],
    ground: '#14102a',
    groundDark: '#08061a',
    groundEdge: '#7dff5c',
    block: '#1d1440',
    blockEdge: '#c85cff',
    rail: '#7dff5c',
    accent: '#7dff5c',
    fog: '#7dff5c',
    pit: '#7dff5c',
  },
];

export const COLORS = {
  volt: '#ffb347',
  voltCore: '#fff3c4',
  shard: '#ff3bd4',
  token: '#7dff5c',
  hero: '#32f6ff',
  heroScarf: '#ff3bd4',
  danger: '#ff3355',
  shield: '#32f6ff',
  overdrive: '#ffe066',
  white: '#f3f6ff',
} as const;
