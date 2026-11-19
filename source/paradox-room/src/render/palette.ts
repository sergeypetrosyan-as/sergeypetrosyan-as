// PARADOX ROOM colour: the game's local source of truth, read from the 19_mystical-western design
// system (design/19_mystical-western/palette.mjs). The canvas renderer, the 3D materials and the
// CSS custom properties in ui/styles.css all mirror these roles.
//
//   engraved paper / adobe rooms   bone, tan, saddle, umber
//   the lantern-bearer (player)    bone moonlight
//   the gate, axioms, highlights   rose (a bright stamped star)
//   doors, danger, hints           brand red
//   portals                        saddle / tan / ember / blush liveries
import { PALETTE as MW, ROLES as MW_ROLES, hexToRgb } from '../../../../design/19_mystical-western/palette.mjs';

export type RGB = [number, number, number];

export const PALETTE = MW;
export const ROLES = MW_ROLES;

const rgb = (hex: string): RGB => hexToRgb(hex) as RGB;
const num = (hex: string): number => parseInt(hex.slice(1, 7), 16);

/** Canvas colours (2D view). Names are the legacy roles; values are brand. */
export const INK = MW.night;
/** Walkable floor, switches that are on: moonlight bone. */
export const CYAN: RGB = rgb(MW.bone);
/** Axioms, the open gate, pulses: rose. */
export const AMBER: RGB = rgb(MW.rose);
/** Fold wipe: wine. */
export const VIOLET: RGB = rgb(MW.ember);
/** Doors and the hinted move: brand red. */
export const PINK: RGB = rgb(MW.red);
/** Notes and paper: bone. */
export const PAPER: RGB = rgb(MW.bone);
/** Room faces in the 2D view: mesa. */
export const FACE: RGB = rgb(MW.mesa);
/** Room edges in the 2D view: tan. */
export const EDGE: RGB = rgb(MW.tan);

export const rgba = (c: readonly number[], a: number): string => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

export function mix(a: readonly number[], b: readonly number[], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/** Each portal letter gets its own livery so a pair can be matched by eye. */
const PORTALS = [MW.saddle, MW.tan, MW.ember, MW.blush];
export function portalColor(ch: string): [number, number, number] {
  const i = ch.charCodeAt(0) - 97;
  return rgb(PORTALS[((i % 4) + 4) % 4]);
}
export function portalHex(ch: string): number {
  const i = ch.charCodeAt(0) - 97;
  return num(PORTALS[((i % 4) + 4) % 4]);
}

/** Numeric colours for the Three.js materials. */
export const COLORS = {
  lampBlack: num(MW.night),
  film: num(MW.bone),
  graphite: num(MW_ROLES.paperInk),
  brass: num(MW.rose),
  darkBrass: num(MW.ember),
  seam: num(MW.bone),
  pencil: num(MW.saddle),
  lantern: num(MW.blush),
  red: num(MW.red),
  tan: num(MW.tan),
  umber: num(MW.umber),
  wine: num(MW.wine),
};
