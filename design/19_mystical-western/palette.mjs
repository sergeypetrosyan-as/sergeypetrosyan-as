/**
 * 19_mystical-western — the single source of truth for colour.
 *
 * BRAND values are the official Actual Solutions colours, read on 2026-11-18 from
 *   - the logo   https://www.actualsolutions.am/_next/static/media/Logo.e6ae71d8.svg
 *                (fill="#e30016" ×3, fill="#fff" ×8 — the only two fills)
 *   - the site   https://www.actualsolutions.am/_next/static/css/aec346e2cdd93b10.css
 *                (bg-[#F1EDE7], to-[#72151D] / via-[#72151D], from-[#030303])
 *
 * Everything else is DERIVED from those five values by mixing in sRGB, so a brand
 * change here re-tints the README art, the hub and every game on the next build.
 * Nothing in this file is a free-hand colour.
 */

export const BRAND = Object.freeze({
  red: '#E30016', // logo arc + wordmark accent
  wine: '#72151D', // site gradient stop
  bone: '#F1EDE7', // site page ground
  ink: '#030303', // site gradient start
  white: '#FFFFFF', // logo wordmark
});

export function hexToRgb(hex) {
  let h = String(hex).replace('#', '').trim();
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex([r, g, b]) {
  const c = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`.toUpperCase();
}

/** Linear sRGB mix: t = 0 gives a, t = 1 gives b. */
export function mix(a, b, t) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgbToHex(A.map((v, i) => v + (B[i] - v) * t));
}

export function rgba(hex, alpha) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const { red, wine, bone, ink, white } = BRAND;

/** Brand-derived tints. Each entry records its recipe so the README can list it. */
export const TINT_RECIPES = Object.freeze({
  night: ['ink', 'wine', 0.16], // the sky at the zenith
  dusk: ['ink', 'wine', 0.42], // the sky at the horizon
  mesa: ['wine', 'ink', 0.38], // the mesa silhouette in front of the dusk
  ember: ['wine', 'red', 0.5], // between wine and red: borders, stamps on dark
  rose: ['red', 'bone', 0.45], // stamped highlight, collectibles, focus rings
  blush: ['red', 'bone', 0.78], // faint red wash on paper
  tan: ['bone', 'wine', 0.24], // weathered paper, dust
  saddle: ['bone', 'wine', 0.52], // leather, hatching on paper
  umber: ['wine', 'ink', 0.62], // deep leather, card backs
  smoke: ['bone', 'ink', 0.55], // muted text on dark
  ash: ['bone', 'ink', 0.32], // secondary text on dark
});

const SOURCES = { red, wine, bone, ink, white };
export const TINTS = Object.freeze(
  Object.fromEntries(Object.entries(TINT_RECIPES).map(([k, [a, b, t]]) => [k, mix(SOURCES[a], SOURCES[b], t)])),
);

/** The full palette, brand first. */
export const PALETTE = Object.freeze({ ...BRAND, ...TINTS });

/** Semantic roles. Components and games read roles, never raw values. */
export const ROLES = Object.freeze({
  // dark surfaces (README art, hub, games)
  bg: PALETTE.night,
  bgDeep: PALETTE.ink,
  bgHorizon: PALETTE.dusk,
  surface: mix(PALETTE.night, PALETTE.wine, 0.22),
  surfaceRaised: mix(PALETTE.night, PALETTE.wine, 0.38),
  fg: PALETTE.bone,
  fgStrong: PALETTE.white,
  fgSecondary: PALETTE.ash,
  fgMuted: PALETTE.smoke,
  accent: PALETTE.red,
  accentDeep: PALETTE.wine,
  accentSoft: PALETTE.rose,
  line: PALETTE.ember,
  // paper surfaces (tarot faces, light mode)
  paper: PALETTE.bone,
  paperShade: PALETTE.tan,
  paperInk: mix(PALETTE.ink, PALETTE.wine, 0.3),
  paperLine: PALETTE.saddle,
  // gameplay
  player: PALETTE.bone, // the hero is moonlight
  hostile: PALETTE.red, // danger is the brand red
  collectible: PALETTE.rose, // a bright stamped star
  world: PALETTE.tan,
  quiet: mix(PALETTE.dusk, PALETTE.ash, 0.25), // background constellations
});

/* ------------------------------------------------------------------------- */
/* Remapping legacy colours into the brand. Used by tools/theme/recolor.mjs   */
/* to carry each game's existing contrast structure into the new palette.     */
/* ------------------------------------------------------------------------- */

function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

/** Perceived lightness 0..1 (Rec. 709 luma on gamma values — enough for ranking). */
export function luma(hex) {
  const [r, g, b] = hexToRgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function ramp(stops, t) {
  t = Math.max(0, Math.min(1, t));
  const n = stops.length - 1;
  const i = Math.min(n - 1, Math.floor(t * n));
  return mix(stops[i], stops[i + 1], t * n - i);
}

/**
 * Brand ramps, each ordered dark → light. A legacy colour keeps its lightness
 * and picks a ramp by hue family, so "the bright thing" stays the bright thing.
 */
export const RAMPS = Object.freeze({
  neutral: [PALETTE.ink, PALETTE.night, PALETTE.umber, PALETTE.smoke, PALETTE.tan, PALETTE.bone, PALETTE.white],
  red: [PALETTE.ink, PALETTE.wine, PALETTE.ember, PALETTE.red, PALETTE.rose, PALETTE.blush],
  moon: [PALETTE.ink, PALETTE.dusk, PALETTE.saddle, PALETTE.tan, PALETTE.bone, PALETTE.white],
  star: [PALETTE.ink, PALETTE.wine, PALETTE.red, PALETTE.rose, PALETTE.blush],
  earth: [PALETTE.ink, PALETTE.umber, PALETTE.mesa, PALETTE.saddle, PALETTE.tan, PALETTE.bone],
  wine: [PALETTE.ink, PALETTE.night, PALETTE.wine, PALETTE.ember, PALETTE.rose],
});

/** Which ramp a hue family lands on. */
export function familyOf(hex) {
  const rgb = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(rgb);
  const chroma = (Math.max(...rgb) - Math.min(...rgb)) / 255;
  if (chroma < 0.18 || s < 0.18 || l < 0.04 || l > 0.97) return 'neutral';
  if (h >= 285 || h < 22) return 'red'; // reds, pinks, magentas → brand red
  if (h < 70) return 'star'; // oranges, yellows → stamped rose / white (pickups)
  if (h < 160) return 'earth'; // greens → desert earth
  if (h < 250) return 'moon'; // cyans, blues → moonlight bone
  return 'wine'; // violets, purples → wine
}

/** Map any legacy colour to its brand counterpart. Lightness is preserved. */
export function toBrand(hex) {
  const fam = familyOf(hex);
  const L = luma(hex);
  // Small lift so saturated mid-lightness mystical western reads as the ramp's signature tone.
  const [, s] = rgbToHsl(hexToRgb(hex));
  const t = fam === 'neutral' ? L : Math.min(1, L * 0.85 + s * 0.18);
  return ramp(RAMPS[fam], t);
}

export default { BRAND, TINTS, PALETTE, ROLES, RAMPS, mix, rgba, toBrand, familyOf, luma };
