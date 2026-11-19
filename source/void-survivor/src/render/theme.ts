// 19_mystical-western: the frontier observatory. Every colour in the renderers comes from here,
// and every value here comes from design/19_mystical-western/palette.mjs (Actual Solutions brand).
import { PALETTE, ROLES, mix, rgba, hexToRgb } from '../../../../design/19_mystical-western/palette.mjs';

export { PALETTE, ROLES, mix, rgba };

/** Short names used across the game. */
export const C = {
  ink: PALETTE.ink,
  night: PALETTE.night,
  dusk: PALETTE.dusk,
  mesa: PALETTE.mesa,
  umber: PALETTE.umber,
  wine: PALETTE.wine,
  ember: PALETTE.ember,
  red: PALETTE.red,
  rose: PALETTE.rose,
  blush: PALETTE.blush,
  tan: PALETTE.tan,
  saddle: PALETTE.saddle,
  bone: PALETTE.bone,
  white: PALETTE.white,
  ash: PALETTE.ash,
  smoke: PALETTE.smoke,
  quiet: ROLES.quiet,
  surface: ROLES.surface,
  surfaceRaised: ROLES.surfaceRaised,
  /** red softened toward ember: a second hostile value */
  scarlet: mix(PALETTE.red, PALETTE.ember, 0.45),
} as const;

/** Linear-ish 0..1 triple for three.js instance colours (sRGB values; three converts via Color.set). */
export function rgb01(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex);
  return [r / 255, g / 255, b / 255];
}

export const FONT = {
  title: '"Rye", "Zilla Slab", Georgia, serif',
  slab: '"Zilla Slab", Georgia, serif',
  sans: '"Public Sans", "Segoe UI", system-ui, sans-serif',
};
