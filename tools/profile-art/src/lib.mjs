import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import gifenc from 'gifenc';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const { GIFEncoder, quantize, applyPalette } = gifenc;

export const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO = resolve(HERE, '../../..');
const FONTS = join(HERE, '../node_modules/@fontsource');

GlobalFonts.registerFromPath(join(FONTS, 'rye/files/rye-latin-400-normal.woff2'), 'Rye');
for (const wt of [500, 600, 700]) GlobalFonts.registerFromPath(join(FONTS, `zilla-slab/files/zilla-slab-latin-${wt}-normal.woff2`), 'Zilla Slab');
GlobalFonts.registerFromPath(join(FONTS, 'zilla-slab/files/zilla-slab-latin-500-italic.woff2'), 'Zilla Slab Italic');

export const FONT = { title: 'Rye', slab: '"Zilla Slab"', italic: '"Zilla Slab Italic"' };

export function canvas(w, h) {
  const c = createCanvas(w, h);
  return { c, g: c.getContext('2d') };
}

function ensure(p) {
  mkdirSync(dirname(p), { recursive: true });
  return p;
}

export function writePng(c, rel) {
  const p = ensure(join(REPO, rel));
  writeFileSync(p, c.toBuffer('image/png'));
  return p;
}

export function writeWebp(c, rel, quality = 86) {
  const p = ensure(join(REPO, rel));
  writeFileSync(p, c.encodeSync('webp', quality));
  return p;
}

export function writeJpeg(c, rel, quality = 88) {
  const p = ensure(join(REPO, rel));
  writeFileSync(p, c.encodeSync('jpeg', quality));
  return p;
}

/**
 * Render an animated GIF. draw(g, t) is called with t in [0, 1) for each frame;
 * t = 0 is the first (complete) frame and frame n−1 flows back into it.
 * One global palette (quantised from first, middle and last frames) keeps colour
 * stable across the loop. Pixels with alpha < 128 become transparent.
 */
export function renderGif(rel, w, h, frames, delayMs, draw, { colors = 64, transparent = false } = {}) {
  const { c, g } = canvas(w, h);
  const data = [];
  for (let i = 0; i < frames; i++) {
    g.save();
    g.clearRect(0, 0, w, h);
    draw(g, i / frames, i);
    g.restore();
    data.push(new Uint8ClampedArray(g.getImageData(0, 0, w, h).data));
  }
  const pick = [0, frames >> 2, frames >> 1, (3 * frames) >> 2, frames - 1];
  const sample = new Uint8ClampedArray(pick.length * w * h * 4);
  pick.forEach((k, i) => sample.set(data[k], i * w * h * 4));
  // Index 0 is reserved as transparent: used for see-through corners on frame 0
  // and, on later frames, for every pixel unchanged since the previous frame.
  const pal = quantize(sample, colors - 1, { format: 'rgb565' });
  const palette = [[0, 0, 0], ...pal];
  const enc = GIFEncoder();
  let prev = null;
  for (let i = 0; i < frames; i++) {
    const rgba = data[i];
    const raw = applyPalette(rgba, pal, 'rgb565');
    const full = new Uint8Array(raw.length);
    for (let p = 0; p < raw.length; p++) full[p] = transparent && rgba[p * 4 + 3] < 128 ? 0 : raw[p] + 1;
    let index = full;
    if (prev) {
      index = new Uint8Array(full.length);
      for (let p = 0; p < full.length; p++) index[p] = full[p] === prev[p] ? 0 : full[p];
    }
    prev = full;
    enc.writeFrame(index, w, h, {
      palette: i === 0 ? palette : undefined,
      delay: delayMs,
      repeat: 0,
      transparent: true,
      transparentIndex: 0,
      dispose: 1,
    });
  }
  enc.finish();
  const p = ensure(join(REPO, rel));
  const bytes = enc.bytes();
  writeFileSync(p, bytes);
  return { path: p, bytes: bytes.length, frames, firstFrame: data[0], midFrame: data[frames >> 1], lastFrame: data[frames - 1] };
}

/** Save selected RGBA frames as PNGs for inspection. */
export function dumpFrames(out, w, h, frames) {
  const { c, g } = canvas(w, h);
  frames.forEach(([name, rgba]) => {
    const img = g.createImageData(w, h);
    img.data.set(rgba);
    g.clearRect(0, 0, w, h);
    g.putImageData(img, 0, 0);
    mkdirSync(out, { recursive: true });
    writeFileSync(join(out, name + '.png'), c.toBuffer('image/png'));
  });
}

export function roundRectPath(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
