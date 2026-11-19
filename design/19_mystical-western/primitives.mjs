/**
 * 19_mystical-western — recurring drawing primitives for any CanvasRenderingContext2D
 * (browser canvas, OffscreenCanvas, or @napi-rs/canvas in Node).
 *
 * Every motif has one job:
 *   horizon / mesa   anchors a hero or title screen
 *   sun & moon disc  carved, engraved focal point; moon phases mark transitions
 *   constellation    connects related things (work, levels, menu items)
 *   stars            quiet background (small, low contrast) or a bright stamped
 *                    collectible (stampStar)
 *   cactus           sparse scale cue, never more than three in a frame
 *   stampBorder      restrained leather-stamp frame for cards and panels
 *   grain / hatch    dust and engraving: texture in brand colours only
 *
 * All randomness is seeded, so the same call draws the same picture.
 */
import { PALETTE, ROLES, mix, rgba } from './palette.mjs';

export { PALETTE, ROLES, mix, rgba };

/** mulberry32 — small, fast, deterministic. */
export function rng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const TAU = Math.PI * 2;
export const ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, t)));

/** Night sky: zenith → horizon gradient. */
export function sky(g, x, y, w, h, { top = PALETTE.night, bottom = PALETTE.dusk, deep = PALETTE.ink } = {}) {
  const grad = g.createLinearGradient(0, y, 0, y + h);
  grad.addColorStop(0, deep);
  grad.addColorStop(0.35, top);
  grad.addColorStop(1, bottom);
  g.fillStyle = grad;
  g.fillRect(x, y, w, h);
}

/** Dust grain: tiny specks in brand tints. density = specks per 1000 px². */
export function grain(g, x, y, w, h, { seed = 7, density = 0.6, colors = [PALETTE.tan, PALETTE.ember], alpha = 0.08 } = {}) {
  const r = rng(seed);
  const n = Math.round((w * h * density) / 1000);
  g.save();
  for (let i = 0; i < n; i++) {
    g.globalAlpha = alpha * (0.4 + r() * 0.6);
    g.fillStyle = colors[(r() * colors.length) | 0];
    const s = r() < 0.9 ? 1 : 2;
    g.fillRect(x + r() * w, y + r() * h, s, s);
  }
  g.restore();
}

/** Parallel engraving lines clipped to the current path (call after building a path). */
export function hatchClip(g, buildPath, { angle = 0, gap = 4, color = PALETTE.ink, width = 1, alpha = 1, bounds }) {
  const [bx, by, bw, bh] = bounds;
  g.save();
  g.beginPath();
  buildPath(g);
  g.clip();
  g.globalAlpha = alpha;
  g.strokeStyle = color;
  g.lineWidth = width;
  const cx = bx + bw / 2;
  const cy = by + bh / 2;
  const R = Math.hypot(bw, bh) / 2 + gap;
  g.translate(cx, cy);
  g.rotate(angle);
  g.beginPath();
  for (let d = -R; d <= R; d += gap) {
    g.moveTo(-R, d);
    g.lineTo(R, d);
  }
  g.stroke();
  g.restore();
}

/** A carved disc: the sun or the moon. phase 0 = full, 0.5 = new (dark), 1 = full. */
export function disc(g, x, y, r, {
  face = PALETTE.bone,
  ink = PALETTE.wine,
  rim = PALETTE.ember,
  phase = 0,
  shadow = PALETTE.night,
  rings = 3,
  hatch = true,
  glow = 0.18,
} = {}) {
  g.save();
  const lit = (1 + Math.cos((((phase % 1) + 1) % 1) * TAU)) / 2;
  glow *= 0.15 + 0.85 * lit;
  if (glow > 0) {
    const halo = g.createRadialGradient(x, y, r * 0.8, x, y, r * 2.4);
    halo.addColorStop(0, rgba(face, glow));
    halo.addColorStop(1, rgba(face, 0));
    g.fillStyle = halo;
    g.beginPath();
    g.arc(x, y, r * 2.4, 0, TAU);
    g.fill();
  }
  g.fillStyle = face;
  g.beginPath();
  g.arc(x, y, r, 0, TAU);
  g.fill();
  if (hatch) {
    // engraved lower-left shading: diagonal lines in a crescent
    hatchClip(g, (c) => {
      c.arc(x, y, r, 0, TAU);
    }, { angle: -0.5, gap: Math.max(2.2, r / 9), color: ink, width: Math.max(0.6, r / 60), alpha: 0.22, bounds: [x - r, y - r * 0.1, r * 2, r * 1.1] });
  }
  g.strokeStyle = rim;
  for (let i = 0; i < rings; i++) {
    g.globalAlpha = 0.55 - i * 0.12;
    g.lineWidth = Math.max(0.8, r / 40);
    g.beginPath();
    g.arc(x, y, r * (1 - 0.1 * (i + 1)), 0, TAU);
    g.stroke();
  }
  g.globalAlpha = 1;
  g.lineWidth = Math.max(1, r / 26);
  g.beginPath();
  g.arc(x, y, r, 0, TAU);
  g.stroke();
  // phase shadow (terminator as an ellipse)
  const p = ((phase % 1) + 1) % 1;
  if (p > 0.001 && p < 0.999) {
    g.save();
    g.beginPath();
    g.arc(x, y, r + 0.5, 0, TAU);
    g.clip();
    g.fillStyle = shadow;
    g.globalAlpha = 0.9;
    const k = Math.cos(p * TAU); // 1 full → -1 new
    const waning = p < 0.5;
    g.beginPath();
    // dark half
    g.arc(x, y, r + 1, waning ? -Math.PI / 2 : Math.PI / 2, waning ? Math.PI / 2 : (3 * Math.PI) / 2, false);
    g.ellipse(x, y, Math.abs(k) * (r + 1), r + 1, 0, waning ? Math.PI / 2 : (3 * Math.PI) / 2, waning ? -Math.PI / 2 : Math.PI / 2, k > 0);
    g.fill();
    g.restore();
  }
  g.restore();
}

/** Low mesa horizon. Returns the top-edge polyline for placing buildings / cacti. */
export function mesa(g, x0, x1, baseY, {
  seed = 3,
  height = 60,
  fill = PALETTE.mesa,
  strata = PALETTE.ember,
  bottom,
  plateaus = 3,
  strataAlpha = 0.35,
} = {}) {
  const r = rng(seed);
  const w = x1 - x0;
  const pts = [[x0, baseY - height * (0.15 + r() * 0.15)]];
  const step = w / plateaus;
  for (let i = 0; i < plateaus; i++) {
    const sx = x0 + i * step + step * (0.1 + r() * 0.15);
    const ex = x0 + (i + 1) * step - step * (0.1 + r() * 0.15);
    const top = baseY - height * (0.65 + r() * 0.35);
    const shoulder = step * (0.06 + r() * 0.06);
    pts.push([sx, baseY - height * (0.15 + r() * 0.2)]);
    pts.push([sx + shoulder, top]);
    pts.push([ex - shoulder, top + (r() - 0.5) * 3]);
    pts.push([ex, baseY - height * (0.15 + r() * 0.2)]);
  }
  pts.push([x1, baseY - height * (0.12 + r() * 0.15)]);
  const path = (c) => {
    c.moveTo(x0, bottom ?? baseY + 2);
    for (const [px, py] of pts) c.lineTo(px, py);
    c.lineTo(x1, bottom ?? baseY + 2);
    c.closePath();
  };
  g.fillStyle = fill;
  g.beginPath();
  path(g);
  g.fill();
  // horizontal strata — the engraved look
  hatchClip(g, path, { angle: 0, gap: Math.max(3, height / 9), color: strata, width: 1, alpha: strataAlpha, bounds: [x0, baseY - height, w, (bottom ?? baseY) - baseY + height + 2] });
  return pts;
}

/** Saguaro silhouette. h = trunk height. */
export function cactus(g, x, baseY, h, { fill = PALETTE.ink, arms = [0.55, 0.35], seed = 1 } = {}) {
  const w = Math.max(3, h * 0.16);
  const r = rng(seed);
  g.save();
  g.fillStyle = fill;
  const cap = (cx, cy, ww, hh) => {
    g.beginPath();
    g.moveTo(cx - ww / 2, cy + hh);
    g.lineTo(cx - ww / 2, cy + ww / 2);
    g.arc(cx, cy + ww / 2, ww / 2, Math.PI, 0);
    g.lineTo(cx + ww / 2, cy + hh);
    g.closePath();
    g.fill();
  };
  cap(x, baseY - h, w, h);
  arms.forEach((at, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const ay = baseY - h * at;
    const reach = w * (1.3 + r() * 0.4);
    const up = h * (0.22 + r() * 0.12);
    g.fillRect(x + (side < 0 ? -reach : 0), ay - w * 0.35, reach, w * 0.7);
    cap(x + side * reach, ay - up, w * 0.8, up + w * 0.35);
  });
  g.restore();
}

/** A tiny four-point engraved star (background). */
export function starGlyph(g, x, y, r, color = PALETTE.bone, alpha = 1) {
  g.save();
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.beginPath();
  g.moveTo(x, y - r);
  g.quadraticCurveTo(x, y, x + r, y);
  g.quadraticCurveTo(x, y, x, y + r);
  g.quadraticCurveTo(x, y, x - r, y);
  g.quadraticCurveTo(x, y, x, y - r);
  g.fill();
  g.restore();
}

/** Bright stamped five-point star (collectibles, highlights). */
export function stampStar(g, x, y, r, { fill = PALETTE.rose, edge = PALETTE.bone, rot = -Math.PI / 2, points = 5, inner = 0.45 } = {}) {
  g.save();
  g.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const rr = i % 2 === 0 ? r : r * inner;
    const a = rot + (i * Math.PI) / points;
    const px = x + Math.cos(a) * rr;
    const py = y + Math.sin(a) * rr;
    i === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
  }
  g.closePath();
  g.fillStyle = fill;
  g.fill();
  g.lineWidth = Math.max(1, r / 7);
  g.strokeStyle = edge;
  g.lineJoin = 'round';
  g.stroke();
  g.restore();
}

/** Scatter quiet background stars. */
export function starfield(g, x, y, w, h, { seed = 11, count = 80, color = PALETTE.bone, max = 1.6, alpha = 0.55, twinkle = 0 } = {}) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const sx = x + r() * w;
    const sy = y + r() * h * r(); // denser towards the zenith
    const s = 0.4 + r() * max;
    const ph = r() * TAU;
    const a = alpha * (0.35 + r() * 0.65) * (twinkle ? 0.75 + 0.25 * Math.sin(twinkle * TAU + ph) : 1);
    if (s > max * 0.85) starGlyph(g, sx, sy, s * 2.2, color, a);
    else {
      g.globalAlpha = a;
      g.fillStyle = color;
      g.fillRect(sx, sy, s, s);
      g.globalAlpha = 1;
    }
  }
}

/** Constellation: dotted engraved line joining points, with ringed nodes. */
export function constellation(g, pts, { color = PALETTE.rose, node = PALETTE.bone, alpha = 0.8, dash = [2, 5], width = 1, nodeR = 2.6, progress = 1 } = {}) {
  g.save();
  g.globalAlpha = alpha;
  g.strokeStyle = color;
  g.lineWidth = width;
  g.setLineDash(dash);
  g.beginPath();
  // partial draw by progress along the polyline
  let total = 0;
  const segs = [];
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    segs.push(d);
    total += d;
  }
  let left = total * progress;
  g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && left > 0; i++) {
    const d = segs[i - 1];
    const k = Math.min(1, left / d);
    g.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k);
    left -= d;
  }
  g.stroke();
  g.setLineDash([]);
  for (const [px, py] of pts) {
    g.globalAlpha = alpha;
    g.strokeStyle = color;
    g.beginPath();
    g.arc(px, py, nodeR * 1.9, 0, TAU);
    g.stroke();
    starGlyph(g, px, py, nodeR * 1.6, node, 1);
  }
  g.restore();
}

/** Restrained leather-stamp border: double rule, stitch line, corner diamonds. */
export function stampBorder(g, x, y, w, h, {
  color = PALETTE.ember,
  stitch = PALETTE.tan,
  radius = 10,
  inset = 6,
  corner = 6,
  stitchAlpha = 0.6,
} = {}) {
  const rr = (c, X, Y, W, H, R) => {
    c.beginPath();
    c.moveTo(X + R, Y);
    c.arcTo(X + W, Y, X + W, Y + H, R);
    c.arcTo(X + W, Y + H, X, Y + H, R);
    c.arcTo(X, Y + H, X, Y, R);
    c.arcTo(X, Y, X + W, Y, R);
    c.closePath();
  };
  g.save();
  g.strokeStyle = color;
  g.lineWidth = 2;
  rr(g, x + 1, y + 1, w - 2, h - 2, radius);
  g.stroke();
  g.lineWidth = 1;
  rr(g, x + inset, y + inset, w - inset * 2, h - inset * 2, Math.max(2, radius - inset / 2));
  g.stroke();
  g.globalAlpha = stitchAlpha;
  g.strokeStyle = stitch;
  g.setLineDash([3, 4]);
  const s = inset / 2 + 1;
  rr(g, x + s, y + s, w - s * 2, h - s * 2, Math.max(2, radius - s / 2));
  g.stroke();
  g.setLineDash([]);
  g.globalAlpha = 1;
  g.fillStyle = color;
  const d = corner;
  for (const [cx, cy] of [[x + inset * 2.2, y + inset * 2.2], [x + w - inset * 2.2, y + inset * 2.2], [x + inset * 2.2, y + h - inset * 2.2], [x + w - inset * 2.2, y + h - inset * 2.2]]) {
    g.beginPath();
    g.moveTo(cx, cy - d);
    g.lineTo(cx + d, cy);
    g.lineTo(cx, cy + d);
    g.lineTo(cx - d, cy);
    g.closePath();
    g.fill();
  }
  g.restore();
}

/** Small observatory: a domed hut with an open slit and a telescope. Base centred at x. */
export function observatory(g, x, baseY, s, { fill = PALETTE.ink, slit = PALETTE.red, telescopeAngle = -0.9 } = {}) {
  g.save();
  g.fillStyle = fill;
  const bw = s * 1.6;
  const bh = s * 0.8;
  g.fillRect(x - bw / 2, baseY - bh, bw, bh);
  // dome
  g.beginPath();
  g.arc(x, baseY - bh, bw * 0.42, Math.PI, 0);
  g.closePath();
  g.fill();
  // telescope
  g.save();
  g.translate(x, baseY - bh - bw * 0.18);
  g.rotate(telescopeAngle);
  g.fillRect(0, -s * 0.07, s * 0.75, s * 0.14);
  g.restore();
  // slit
  g.strokeStyle = slit;
  g.lineWidth = Math.max(1, s * 0.06);
  g.beginPath();
  g.moveTo(x, baseY - bh - bw * 0.4);
  g.lineTo(x, baseY - bh - 1);
  g.stroke();
  // door
  g.fillStyle = slit;
  g.globalAlpha = 0.85;
  g.fillRect(x - s * 0.1, baseY - s * 0.36, s * 0.2, s * 0.36);
  g.restore();
}

/** Letter-spaced text (canvas letterSpacing is not universal). */
export function spacedText(g, text, x, y, spacing = 0, align = 'center') {
  const chars = [...text];
  const widths = chars.map((c) => g.measureText(c).width);
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
  let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
  const prev = g.textAlign;
  g.textAlign = 'left';
  chars.forEach((c, i) => {
    g.fillText(c, cx, y);
    cx += widths[i] + spacing;
  });
  g.textAlign = prev;
  return total;
}

/** Fit a font size so text fits maxWidth. Returns the size. */
export function fitFont(g, text, family, maxSize, maxWidth, spacing = 0) {
  let s = maxSize;
  for (; s > 6; s -= 1) {
    g.font = `${s}px ${family}`;
    const w = g.measureText(text).width + spacing * (text.length - 1) * (s / maxSize);
    if (w <= maxWidth) break;
  }
  return s;
}

/** Row of moon phases (a section transition). n discs across width, phase offset t. */
export function moonRow(g, cx, cy, width, { n = 7, r = 7, face = PALETTE.bone, shadow = PALETTE.night, rim = PALETTE.ember, line = PALETTE.ember, t = 0, rule = true } = {}) {
  g.save();
  if (rule) {
    g.strokeStyle = line;
    g.globalAlpha = 0.7;
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(cx - width / 2, cy);
    g.lineTo(cx - (n * r * 3.4) / 2 - r, cy);
    g.moveTo(cx + (n * r * 3.4) / 2 + r, cy);
    g.lineTo(cx + width / 2, cy);
    g.stroke();
    g.globalAlpha = 1;
    for (const ex of [cx - width / 2, cx + width / 2]) {
      g.fillStyle = line;
      g.beginPath();
      g.moveTo(ex, cy - 3);
      g.lineTo(ex + 3, cy);
      g.lineTo(ex, cy + 3);
      g.lineTo(ex - 3, cy);
      g.fill();
    }
  }
  for (let i = 0; i < n; i++) {
    const x = cx + (i - (n - 1) / 2) * r * 3.4;
    const phase = 0.5 + (i - (n - 1) / 2) / (n - 1) + t; // new in the middle? no: full in the middle
    disc(g, x, cy, r, { face, shadow, rim, phase: (phase + 0.5) % 1, rings: 0, hatch: false, glow: 0 });
  }
  g.restore();
}

/** Roman numerals for tarot cards. */
export function roman(n) {
  if (n === 0) return '0';
  const map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let s = '';
  for (const [v, k] of [[50, 'L'], [40, 'XL'], ...map]) while (n >= v) { s += k; n -= v; }
  return s;
}
