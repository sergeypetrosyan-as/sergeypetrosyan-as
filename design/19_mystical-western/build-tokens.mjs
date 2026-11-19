#!/usr/bin/env node
/**
 * Writes tokens.css from palette.mjs.  `--check` fails if tokens.css or any
 * consumer copy (site/src/styles/tokens.css) is out of date.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { BRAND, TINTS, TINT_RECIPES, ROLES } from './palette.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const kebab = (s) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());

const lines = [
  '/* 19_mystical-western — GENERATED from design/19_mystical-western/palette.mjs. Do not edit by hand. */',
  '/* Brand: Actual Solutions — logo #E30016 / #FFFFFF, site #72151D / #F1EDE7 / #030303. */',
  ':root {',
  '  /* Brand (verified) */',
  ...Object.entries(BRAND).map(([k, v]) => `  --mw-${kebab(k)}: ${v};`),
  '  /* Brand-derived tints */',
  ...Object.entries(TINTS).map(([k, v]) => `  --mw-${kebab(k)}: ${v}; /* ${TINT_RECIPES[k][0]} → ${TINT_RECIPES[k][1]} ${Math.round(TINT_RECIPES[k][2] * 100)}% */`),
  '  /* Roles */',
  ...Object.entries(ROLES).map(([k, v]) => `  --mw-role-${kebab(k)}: ${v};`),
  '  /* Type */',
  "  --mw-font-title: 'Rye', 'Zilla Slab', Georgia, serif; /* short illustrated titles only */",
  "  --mw-font-slab: 'Zilla Slab', Georgia, serif;",
  "  --mw-font-body: 'Public Sans', 'Segoe UI', system-ui, sans-serif;",
  '}',
  '',
];
const css = lines.join('\n');
const out = join(here, 'tokens.css');

if (process.argv.includes('--check')) {
  const have = readFileSync(out, 'utf8');
  if (have !== css) {
    console.error('tokens.css is stale: run node design/19_mystical-western/build-tokens.mjs');
    process.exit(1);
  }
  console.log('tokens.css matches palette.mjs');
} else {
  writeFileSync(out, css);
  console.log('wrote', out);
}
