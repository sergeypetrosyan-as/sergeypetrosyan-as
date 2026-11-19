import { PALETTE, ROLES, mix } from '../../../../design/19_mystical-western/palette.mjs';

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

/*
 * 19_mystical-western: a frontier observatory at night. Every value comes from the
 * shared brand palette (design/19_mystical-western/palette.mjs) — world = tan / wine /
 * umber / mesa, hostile = red, collectible = rose, player = bone.
 */
const earth = (t: number) => mix(PALETTE.umber, PALETTE.saddle, t);

export const THEMES: Theme[] = [
  {
    // World 1: an adobe town under a full moon.
    name: 'Mystical Western Downtown',
    skyTop: PALETTE.night,
    skyBottom: PALETTE.dusk,
    far: mix(PALETTE.mesa, PALETTE.dusk, 0.45),
    mid: mix(PALETTE.umber, PALETTE.mesa, 0.25),
    near: mix(PALETTE.umber, PALETTE.ink, 0.5),
    window: [PALETTE.tan, PALETTE.blush, PALETTE.saddle, PALETTE.rose],
    ground: earth(0.42),
    groundDark: earth(0.18),
    groundEdge: PALETTE.tan,
    block: mix(PALETTE.wine, PALETTE.umber, 0.25),
    blockEdge: PALETTE.saddle,
    rail: PALETTE.tan,
    accent: PALETTE.blush,
    fog: PALETTE.wine,
    pit: PALETTE.red,
  },
  {
    // World 2: timber mine works under a waning moon.
    name: 'Cyber Factory',
    skyTop: PALETTE.ink,
    skyBottom: mix(PALETTE.dusk, PALETTE.wine, 0.25),
    far: mix(PALETTE.mesa, PALETTE.dusk, 0.4),
    mid: mix(PALETTE.umber, PALETTE.ink, 0.15),
    near: mix(PALETTE.umber, PALETTE.ink, 0.55),
    window: [PALETTE.saddle, PALETTE.blush, PALETTE.tan, PALETTE.rose],
    ground: earth(0.3),
    groundDark: earth(0.08),
    groundEdge: PALETTE.saddle,
    block: mix(PALETTE.wine, PALETTE.saddle, 0.22),
    blockEdge: PALETTE.tan,
    rail: PALETTE.saddle,
    accent: PALETTE.tan,
    fog: PALETTE.wine,
    pit: PALETTE.red,
  },
  {
    // World 3: a star-chart canyon under a crescent moon.
    name: 'Glitch Dimension',
    skyTop: PALETTE.ink,
    skyBottom: PALETTE.night,
    far: mix(PALETTE.night, PALETTE.dusk, 0.75),
    mid: mix(PALETTE.umber, PALETTE.night, 0.3),
    near: mix(PALETTE.ink, PALETTE.umber, 0.45),
    window: [PALETTE.ash, PALETTE.tan, PALETTE.blush, PALETTE.saddle],
    ground: mix(PALETTE.umber, PALETTE.smoke, 0.35),
    groundDark: mix(PALETTE.umber, PALETTE.ink, 0.3),
    groundEdge: PALETTE.ash,
    block: mix(PALETTE.wine, PALETTE.night, 0.35),
    blockEdge: PALETTE.tan,
    rail: PALETTE.ash,
    accent: PALETTE.ash,
    fog: PALETTE.wine,
    pit: PALETTE.red,
  },
];

export const COLORS = {
  volt: PALETTE.rose,
  voltCore: PALETTE.blush,
  shard: ROLES.collectible,
  token: PALETTE.tan,
  hero: ROLES.player,
  heroScarf: PALETTE.ember,
  danger: ROLES.hostile,
  shield: PALETTE.tan,
  overdrive: PALETTE.blush,
  white: PALETTE.bone,
} as const;
