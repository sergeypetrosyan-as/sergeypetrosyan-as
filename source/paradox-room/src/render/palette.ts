// Colour constants for the canvas renderer. CSS custom properties in styles.css mirror these.
export const INK = '#05060b';
export const CYAN: [number, number, number] = [85, 240, 255];
export const AMBER: [number, number, number] = [255, 198, 92];
export const VIOLET: [number, number, number] = [169, 139, 255];
export const PINK: [number, number, number] = [255, 95, 168];
export const PAPER: [number, number, number] = [232, 236, 246];
export const FACE: [number, number, number] = [30, 44, 84];

export const rgba = (c: readonly number[], a: number): string => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

export function mix(a: readonly number[], b: readonly number[], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/** Each portal letter gets its own hue so a pair can be matched by eye. */
export function portalColor(ch: string): [number, number, number] {
  const i = ch.charCodeAt(0) - 97;
  const palette: [number, number, number][] = [VIOLET, [120, 190, 255], [255, 140, 220], [140, 255, 200]];
  return palette[((i % 4) + 4) % 4];
}
