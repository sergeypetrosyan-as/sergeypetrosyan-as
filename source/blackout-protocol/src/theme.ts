// 19_mystical-western palette, copied from design/19_mystical-western/palette.mjs (Actual Solutions brand).
// Values only: the game reads roles from here so the 3D scene, 2D fallback and HUD agree.
export const PALETTE = {
  red: '#E30016', wine: '#72151D', bone: '#F1EDE7', ink: '#030303', white: '#FFFFFF',
  night: '#150607', dusk: '#320B0E', mesa: '#480E13', ember: '#AB0B1A', rose: '#E96B74',
  blush: '#EEB9B9', tan: '#D3B9B7', saddle: '#AF7D7E', umber: '#2D0A0D', smoke: '#6E6C6A', ash: '#A5A29E',
} as const;

export const ROLES = {
  bg: PALETTE.night, surface: '#29090C', surfaceRaised: '#380C0F', fg: PALETTE.bone,
  accent: PALETTE.red, accentSoft: PALETTE.rose, line: PALETTE.ember,
  paper: PALETTE.bone, paperShade: PALETTE.tan, paperInk: '#24080B', paperLine: PALETTE.saddle,
  player: PALETTE.bone, hostile: PALETTE.red, collectible: PALETTE.rose, world: PALETTE.tan, quiet: '#4F3132',
} as const;

/** "rgba(r, g, b, a)" from a palette hex. */
export function rgba(hex: string, a: number): string {
  const n = parseInt(hex.slice(1, 7), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
