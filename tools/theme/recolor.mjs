#!/usr/bin/env node
/**
 * Carry a game's legacy colour literals into the 19_mystical-western palette.
 *
 *   node tools/theme/recolor.mjs source/unfall/src            # rewrite in place
 *   node tools/theme/recolor.mjs source/unfall/src --dry      # report only
 *
 * Rewrites #rgb / #rrggbb / #rrggbbaa, 0xRRGGBB, rgb()/rgba() and hsl()/hsla()
 * literals through toBrand() from design/19_mystical-western/palette.mjs, which
 * keeps each colour's lightness and moves its hue family onto a brand ramp.
 * Values already in the palette are left alone, so a second run is a no-op.
 *
 * It never touches: colours built at runtime (template strings, hsl(${h}…)),
 * numbers used in bit maths (lines with >>>, ^, &, | next to 0x…, Math.imul),
 * or #abc tokens that are really element ids. Review those by hand.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { toBrand, hexToRgb, PALETTE } from '../../design/19_mystical-western/palette.mjs';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const roots = args.filter((a) => !a.startsWith('--'));
if (!roots.length) {
  console.error('usage: recolor.mjs <dir|file>... [--dry]');
  process.exit(2);
}

const EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.html']);
const SKIP_DIR = new Set(['node_modules', 'dist', '.git']);
const KEEP = new Set(Object.values(PALETTE).map((h) => h.toUpperCase()));

function walk(p, out) {
  const st = statSync(p);
  if (st.isFile()) return EXT.has(extname(p)) && out.push(p), out;
  for (const n of readdirSync(p)) if (!SKIP_DIR.has(n)) walk(join(p, n), out);
  return out;
}

const files = roots.flatMap((r) => walk(r, []));

// Element ids that look like hex colours (#add, #bed …) must survive.
const ids = new Set();
for (const f of files) {
  const s = readFileSync(f, 'utf8');
  for (const m of s.matchAll(/\bid=["'`]([a-z0-9_-]+)["'`]|getElementById\(\s*["'`]([a-z0-9_-]+)/gi)) ids.add((m[1] || m[2]).toLowerCase());
}

const toHex2 = (n) => n.toString(16).padStart(2, '0');
function mapHex(hex) {
  const up = ('#' + hex).toUpperCase();
  if (KEEP.has(up.length === 4 ? up : up.slice(0, 7))) return null;
  return toBrand('#' + hex.slice(0, hex.length === 4 || hex.length === 3 ? 3 : 6));
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360; s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0) * 255, f(8) * 255, f(4) * 255].map(Math.round);
}

const BITS = /Math\.imul|>>>|\^\s*0x|0x[0-9a-f]+\s*\^|&\s*0x|0x[0-9a-f]+\s*&|\|\s*0x|<<\s*\d/i;

let total = 0;
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const isCss = extname(file) === '.css';
  let count = 0;
  const lines = src.split('\n').map((line) => {
    let out = line;
    // #hex — 6/8 digits anywhere; 3/4 digits only when not an element id or selector.
    out = out.replace(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g, (m, hex, off, str) => {
      const before = str.slice(0, off);
      if (/[\w&]$/.test(before)) return m; // part of a URL, entity or identifier
      if (hex.length <= 4) {
        if (ids.has(hex.toLowerCase())) return m;
        if (isCss && !/:[^;{}]*$/.test(before)) return m; // selector, not a value
        if (!isCss && !/['"`(:,\s]$/.test(before)) return m;
      }
      const alpha = hex.length === 8 ? hex.slice(6) : hex.length === 4 ? hex[3] + hex[3] : '';
      const mapped = mapHex(hex.length === 8 ? hex.slice(0, 6) : hex.length === 4 ? hex.slice(0, 3) : hex);
      if (!mapped) return m;
      count++;
      const lower = hex === hex.toLowerCase();
      const v = (mapped + alpha);
      return lower ? v.toLowerCase() : v.toUpperCase();
    });
    // 0xRRGGBB numerals (three.js colours)
    if (!isCss && !BITS.test(out)) {
      out = out.replace(/\b0x([0-9a-fA-F]{6})\b/g, (m, hex) => {
        const mapped = mapHex(hex);
        if (!mapped) return m;
        count++;
        return '0x' + mapped.slice(1).toLowerCase();
      });
    }
    // rgb()/rgba() with literal numbers
    out = out.replace(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*[\d.]+\s*)?\)/g, (m, r, g, b, a) => {
      const hex = [r, g, b].map((v) => toHex2(Math.min(255, +v))).join('');
      const mapped = mapHex(hex);
      if (!mapped) return m;
      count++;
      const [R, G, B] = hexToRgb(mapped);
      return a ? `rgba(${R}, ${G}, ${B}${a.replace(/\s+/g, ' ')})` : `rgb(${R}, ${G}, ${B})`;
    });
    // hsl()/hsla() with literal numbers
    out = out.replace(/hsla?\(\s*(-?[\d.]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(,\s*[\d.]+\s*)?\)/g, (m, h, s, l, a) => {
      const hex = hslToRgb(+h, +s, +l).map(toHex2).join('');
      const mapped = mapHex(hex);
      if (!mapped) return m;
      count++;
      const [R, G, B] = hexToRgb(mapped);
      return a ? `rgba(${R}, ${G}, ${B}${a.replace(/\s+/g, ' ')})` : `rgb(${R}, ${G}, ${B})`;
    });
    return out;
  });
  if (count) {
    total += count;
    console.log(`${String(count).padStart(5)}  ${relative(process.cwd(), file)}`);
    if (!dry) writeFileSync(file, lines.join('\n'));
  }
}
console.log(`${dry ? 'would rewrite' : 'rewrote'} ${total} colour literal(s) in ${files.length} file(s)`);
