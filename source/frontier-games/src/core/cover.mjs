/**
 * Tarot-card cover renderer. Pure function: (concept, ops) -> SVG string. Runs in node (scripts/gen-covers.mjs).
 * The card is 300x500; the art window is a 100 x 140 coordinate space (origin top-left, y down).
 * Fonts are not available inside <img> SVGs, so the title is NOT drawn here: the catalog overlays it as HTML.
 *
 * Ops (colour = a palette name: bone red rose ember wine tan saddle umber night dusk mesa ash smoke ink blush white, or 'none'):
 *   ['rect', x, y, w, h, fill, stroke?, strokeWidth?, radius?]
 *   ['circ', x, y, r, fill, stroke?, strokeWidth?]
 *   ['line', x1, y1, x2, y2, stroke, strokeWidth?, dash?]       dash like '2 3'
 *   ['poly', [[x,y],...], fill, stroke?, strokeWidth?, closed=true]
 *   ['path', d, fill, stroke?, strokeWidth?]
 *   ['stars', count, seed]          quiet background stars
 *   ['mesa', baseY, color]          layered mesa horizon whose lowest edge is baseY
 *   ['moon', x, y, r, phase]        carved disc; phase 0 full .. 1 new
 *   ['sun', x, y, r]                carved disc with rays
 *   ['cactus', x, baseY, height, color?]
 *   ['con', [[x,y],...]]            constellation: dotted lines + nodes
 *   ['star5', x, y, r, fill]        stamped five-point star
 *   ['text', 'str', x, y, size, fill, anchor?]   Georgia bold; for numerals and glyphs only
 */
import { PALETTE } from '../../../../design/19_mystical-western/palette.mjs';

const col = (n) => (n === 'none' || n == null ? 'none' : PALETTE[n] ?? (/^#/.test(n) ? n : 'none'));
const r1 = (v) => Math.round(v * 100) / 100;
function lcg(seed) { let s = (seed >>> 0) || 1; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); }
const attrs = (fill, stroke, sw, extra = '') => `fill="${col(fill)}"${stroke ? ` stroke="${col(stroke)}" stroke-width="${sw ?? 0.8}"` : ''}${extra}`;
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

function star(x, y, r, inner = 0.45) {
  const pts = [];
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5; const rr = i % 2 ? r * inner : r; pts.push(`${r1(x + Math.cos(a) * rr)},${r1(y + Math.sin(a) * rr)}`); }
  return pts.join(' ');
}

export const OP_NAMES = ['rect', 'circ', 'line', 'poly', 'path', 'stars', 'mesa', 'moon', 'sun', 'cactus', 'con', 'star5', 'text'];

function op(o) {
  const [k, ...a] = o;
  switch (k) {
    case 'rect': return `<rect x="${a[0]}" y="${a[1]}" width="${a[2]}" height="${a[3]}" ${a[7] ? `rx="${a[7]}" ` : ''}${attrs(a[4], a[5], a[6])}/>`;
    case 'circ': return `<circle cx="${a[0]}" cy="${a[1]}" r="${a[2]}" ${attrs(a[3], a[4], a[5])}/>`;
    case 'line': return `<line x1="${a[0]}" y1="${a[1]}" x2="${a[2]}" y2="${a[3]}" stroke="${col(a[4])}" stroke-width="${a[5] ?? 0.8}" stroke-linecap="round"${a[6] ? ` stroke-dasharray="${a[6]}"` : ''}/>`;
    case 'poly': { const tag = a[4] === false ? 'polyline' : 'polygon'; return `<${tag} points="${a[0].map((p) => p.join(',')).join(' ')}" ${attrs(a[4] === false ? 'none' : a[1], a[2], a[3])} stroke-linejoin="round"/>`; }
    case 'path': return `<path d="${a[0]}" ${attrs(a[1], a[2], a[3])} stroke-linejoin="round" stroke-linecap="round"/>`;
    case 'stars': { const r = lcg(a[1] ?? 3); let s = ''; for (let i = 0; i < a[0]; i++) s += `<circle cx="${r1(r() * 100)}" cy="${r1(r() * 96)}" r="${r1(0.25 + r() * 0.55)}" fill="${col('bone')}" opacity="${r1(0.25 + r() * 0.4)}"/>`; return s; }
    case 'mesa': {
      const y = a[0], c = a[1] ?? 'mesa';
      return `<path d="M0 ${y} L0 ${y - 9} L9 ${y - 9} L12 ${y - 20} L30 ${y - 20} L33 ${y - 9} L46 ${y - 9} L49 ${y - 14} L56 ${y - 14} L59 ${y - 6} L72 ${y - 6} L76 ${y - 24} L94 ${y - 24} L97 ${y - 8} L100 ${y - 8} L100 ${y} Z" fill="${col(c)}"/>` +
        `<path d="M0 ${y} L0 ${y - 3} L22 ${y - 3} L28 ${y - 9} L60 ${y - 4} L100 ${y - 4} L100 ${y} Z" fill="${col('night')}" opacity="0.7"/>`;
    }
    case 'moon': {
      const [x, y, r, p = 0] = a;
      const dx = r * 2 * p;
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${col('bone')}" stroke="${col('ember')}" stroke-width="0.8"/>` +
        (p > 0 ? `<clipPath id="m${x}_${y}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath><circle cx="${r1(x + dx)}" cy="${y}" r="${r}" fill="${col('dusk')}" clip-path="url(#m${x}_${y})"/>` : '') +
        `<circle cx="${r1(x - r * 0.3)}" cy="${r1(y - r * 0.25)}" r="${r1(r * 0.14)}" fill="${col('tan')}" opacity="0.6"/>`;
    }
    case 'sun': {
      const [x, y, r] = a; let rays = '';
      for (let i = 0; i < 12; i++) { const t = (i * Math.PI) / 6; rays += `<line x1="${r1(x + Math.cos(t) * r * 1.2)}" y1="${r1(y + Math.sin(t) * r * 1.2)}" x2="${r1(x + Math.cos(t) * r * 1.65)}" y2="${r1(y + Math.sin(t) * r * 1.65)}" stroke="${col('rose')}" stroke-width="0.9" stroke-linecap="round"/>`; }
      return rays + `<circle cx="${x}" cy="${y}" r="${r}" fill="${col('bone')}" stroke="${col('red')}" stroke-width="1"/><circle cx="${x}" cy="${y}" r="${r1(r * 0.55)}" fill="none" stroke="${col('saddle')}" stroke-width="0.6"/>`;
    }
    case 'cactus': {
      const [x, b, hh, c = 'ink'] = a; const w = hh * 0.16;
      return `<g fill="${col(c)}"><rect x="${r1(x - w / 2)}" y="${r1(b - hh)}" width="${r1(w)}" height="${hh}" rx="${r1(w / 2)}"/><rect x="${r1(x - w * 2.1)}" y="${r1(b - hh * 0.62)}" width="${r1(w * 1.1)}" height="${r1(hh * 0.3)}" rx="${r1(w / 2)}"/><rect x="${r1(x - w * 2.1)}" y="${r1(b - hh * 0.4)}" width="${r1(w * 2.1)}" height="${r1(w * 0.9)}" rx="${r1(w / 2)}"/><rect x="${r1(x + w * 1)}" y="${r1(b - hh * 0.78)}" width="${r1(w * 1.1)}" height="${r1(hh * 0.34)}" rx="${r1(w / 2)}"/><rect x="${r1(x)}" y="${r1(b - hh * 0.5)}" width="${r1(w * 2.1)}" height="${r1(w * 0.9)}" rx="${r1(w / 2)}"/></g>`;
    }
    case 'con': {
      const pts = a[0];
      return `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${col('rose')}" stroke-width="0.6" stroke-dasharray="1.2 2.2" opacity="0.85"/>` + pts.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="1.5" fill="${col('bone')}"/>`).join('');
    }
    case 'star5': return `<polygon points="${star(a[0], a[1], a[2])}" fill="${col(a[3] ?? 'rose')}" stroke="${col('bone')}" stroke-width="0.6" stroke-linejoin="round"/>`;
    case 'text': return `<text x="${a[1]}" y="${a[2]}" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${a[3]}" fill="${col(a[4])}" text-anchor="${a[5] ?? 'middle'}">${String(a[0]).replace(/[<&]/g, '')}</text>`;
    default: throw new Error(`unknown cover op "${k}"`);
  }
}

/** @param {{id:string,title:string,card:number}} concept @param {{suit:string}} category */
export function renderCover(concept, category, ops) {
  const body = ops.map(op).join('');
  const roman = ROMAN[concept.card] ?? String(concept.card);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 500" width="300" height="500" role="img" aria-label="${concept.title} card, ${roman} of ${category.suit}">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${PALETTE.ink}"/><stop offset="0.45" stop-color="${PALETTE.night}"/><stop offset="1" stop-color="${PALETTE.dusk}"/></linearGradient><clipPath id="win"><rect x="18" y="52" width="264" height="370" rx="6"/></clipPath></defs>
<rect width="300" height="500" rx="14" fill="${PALETTE.umber}"/>
<rect x="5" y="5" width="290" height="490" rx="11" fill="none" stroke="${PALETTE.ember}" stroke-width="2.5"/>
<rect x="11" y="11" width="278" height="478" rx="8" fill="none" stroke="${PALETTE.tan}" stroke-width="1" stroke-dasharray="5 5" opacity="0.55"/>
<text x="150" y="40" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="22" fill="${PALETTE.bone}" text-anchor="middle">${roman}</text>
<g clip-path="url(#win)"><rect x="18" y="52" width="264" height="370" fill="url(#sky)"/>
<g transform="translate(18 52) scale(2.64 2.642857)">${body}</g></g>
<rect x="18" y="52" width="264" height="370" rx="6" fill="none" stroke="${PALETTE.ember}" stroke-width="1.5"/>
<rect x="30" y="436" width="240" height="44" rx="6" fill="${PALETTE.wine}" stroke="${PALETTE.ember}" stroke-width="1.5"/>
<text x="150" y="465" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-weight="700" font-size="19" fill="${PALETTE.bone}" text-anchor="middle">Suit of ${category.suit}</text>
</svg>
`;
}
