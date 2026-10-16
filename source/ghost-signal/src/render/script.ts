// Kestrel script: an invented local writing system for in-world signage.
// Each letter maps to a stable glyph of 2-3 rounded strokes hung from a head bar,
// so the same word always reads the same way on every sign.
import { rng, neon } from './kit.ts';
import type { Ctx } from './kit.ts';

type Pt = [number, number];
type Stroke = Pt[];

const CACHE = new Map<string, Stroke[]>();

// Building blocks on a unit glyph box (x 0..1, y 0..1; the head bar sits at y 0).
const STEMS: Stroke[] = [[[0.15, 0], [0.15, 1]], [[0.5, 0], [0.5, 0.95]], [[0.85, 0], [0.85, 0.75]]];
const PARTS: Stroke[] = [
  [[0.15, 0.45], [0.55, 0.3], [0.85, 0.55], [0.55, 0.8]],            // bowl
  [[0.85, 0.2], [0.5, 0.55], [0.15, 0.9]],                              // diagonal
  [[0.2, 0.62], [0.5, 0.75], [0.85, 0.62]],                             // cup
  [[0.5, 0.35], [0.85, 0.35], [0.85, 0.9], [0.55, 1]],                  // hook
  [[0.15, 0.7], [0.45, 0.55], [0.75, 0.7], [0.95, 0.5]],                // wave
  [[0.3, 0.25], [0.7, 0.25], [0.7, 0.55], [0.3, 0.55]],                 // loop
  [[0.55, 1.12], [0.62, 1.18]],                                         // tail dot
  [[0.15, 0.5], [0.85, 0.5]],                                           // crossbar
];

function glyph(ch: string): Stroke[] {
  const hit = CACHE.get(ch);
  if (hit) return hit;
  const r = rng(ch.charCodeAt(0) * 7919 + 13);
  const out: Stroke[] = [STEMS[Math.floor(r() * STEMS.length)]];
  const n = 1 + (r() < 0.55 ? 1 : 0);
  for (let i = 0; i < n; i++) out.push(PARTS[Math.floor(r() * PARTS.length)]);
  CACHE.set(ch, out);
  return out;
}

function trace(c: Ctx, s: Stroke, ox: number, oy: number, gw: number, gh: number, vertical: boolean): void {
  const P = (p: Pt): Pt => (vertical ? [ox + p[1] * gh * 0.8, oy + p[0] * gw] : [ox + p[0] * gw, oy + p[1] * gh]);
  const pts = s.map(P);
  c.moveTo(pts[0][0], pts[0][1]);
  if (pts.length === 2) { c.lineTo(pts[1][0], pts[1][1]); return; }
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2; const my = (pts[i][1] + pts[i + 1][1]) / 2;
    c.quadraticCurveTo(pts[i][0], pts[i][1], i === pts.length - 2 ? pts[i + 1][0] : mx, i === pts.length - 2 ? pts[i + 1][1] : my);
  }
}

export interface ScriptOpts { vertical?: boolean; align?: 'left' | 'center' | 'right' }

/** Builds a path tracer for a word; returns the tracer and the drawn width/height. */
export function scriptTracer(text: string, x: number, y: number, size: number, o: ScriptOpts = {}): { trace: (c: Ctx) => void; w: number; h: number } {
  const chars = [...text.toLowerCase()];
  const gw = size * 0.62; const gh = size; const gap = size * 0.16;
  const n = chars.length;
  const along = n * gw + (n - 1) * gap;
  const vertical = !!o.vertical;
  let ox = x; let oy = y;
  if (!vertical) { if (o.align !== 'left') ox -= o.align === 'right' ? along : along / 2; }
  else if (o.align !== 'left') oy -= along / 2;
  const tr = (c: Ctx): void => {
    c.beginPath();
    let cursor = 0; let segStart = 0;
    const bar = (from: number, to: number): void => {
      if (to <= from) return;
      if (vertical) { c.moveTo(ox, oy + from); c.lineTo(ox, oy + to); } else { c.moveTo(ox + from, oy); c.lineTo(ox + to, oy); }
    };
    for (const ch of chars) {
      if (ch === ' ') { bar(segStart, cursor - gap); cursor += gw * 0.7; segStart = cursor; continue; }
      for (const s of glyph(ch)) {
        if (vertical) trace(c, s, ox, oy + cursor, gw, gh, true);
        else trace(c, s, ox + cursor, oy, gw, gh, false);
      }
      cursor += gw + gap;
    }
    bar(segStart - gw * 0.05, cursor - gap + gw * 0.05);
  };
  return { trace: tr, w: vertical ? gh * 0.8 : along, h: vertical ? along : gh };
}

export function neonScript(c: Ctx, text: string, x: number, y: number, size: number, rgb: string, o: ScriptOpts = {}, k = 1): { w: number; h: number } {
  const t = scriptTracer(text, x, y, size, o);
  neon(c, t.trace, rgb, Math.max(0.8, size * 0.075), k);
  return t;
}

export function paintScript(c: Ctx, text: string, x: number, y: number, size: number, col: string, o: ScriptOpts = {}, weight = 0.09): { w: number; h: number } {
  const t = scriptTracer(text, x, y, size, o);
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = col; c.lineWidth = Math.max(0.6, size * weight);
  t.trace(c); c.stroke(); c.restore();
  return t;
}
