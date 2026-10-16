// Procedural evidence imagery: flash photographs of objects and printouts,
// degraded video frames for memory fragments, typed transcript slips, and
// Bureau ID photos for interviewees. Every image is drawn once and cached as
// a data URL, because the views rebuild their DOM on each state change.
import { ctx2d, makeCanvas, personPath, rng, rgba, vgrad } from './kit.ts';
import type { Ctx, PersonOpts, Rng } from './kit.ts';
import { sceneStill } from './scene.ts';
import type { SceneKey } from './scene.ts';
import { paintScript } from './script.ts';
import type { PersonId, Source } from '../story/types.ts';
import { fmt } from '../story/types.ts';

const CACHE = new Map<string, string>();
const MONO = '"IBM Plex Mono", ui-monospace, Consolas, monospace';
const SANS = '"Public Sans", "Segoe UI", system-ui, sans-serif';

/** Which scene each fragment (or camera archive) was recorded in, and how well exposed it is. */
const FRAME_OF: Record<string, { key: SceneKey; exposure: number; who: string; cam?: string }> = {
  'f-quill-office': { key: 'office', exposure: 1, who: 'MQ' },
  'f-quill-bar': { key: 'bar', exposure: 1, who: 'MQ' },
  'f-brisk-booth': { key: 'lobby', exposure: 0.95, who: 'TB' },
  'f-pell-corridor': { key: 'vault', exposure: 0.8, who: 'OP' },
  'f-voss-annex': { key: 'annex', exposure: 1.05, who: 'LV' },
  'f-roque-last': { key: 'vault', exposure: 0.22, who: 'AR' },
  'f-pell-lobby': { key: 'lobby', exposure: 0.9, who: 'OP' },
  'f-brisk-discovery': { key: 'vault', exposure: 1, who: 'TB' },
  'f-mother': { key: 'street', exposure: 1.2, who: 'IV' },
  'ev-dock-cam': { key: 'dock', exposure: 0.85, who: 'CAM', cam: 'Dock cam 2' },
};

type Kind = 'printout' | 'chart' | 'gap' | 'board' | 'fuse' | 'box' | 'doc' | 'ledger' | 'sign' | 'roll' | 'receipt' | 'screen';
const OBJECT_OF: Record<string, Kind> = {
  'ev-door-log': 'printout', 'ev-power-log': 'chart', 'ev-rig-burn': 'board', 'ev-fuse': 'fuse', 'ev-b2-gap': 'gap',
  'ev-rig-blackbox': 'box', 'ev-corvane-wire': 'doc', 'ev-ledger': 'ledger', 'ev-annex-sign': 'sign', 'ev-annex-locker': 'roll',
  'ev-loop-log': 'screen', 'ev-badge-log': 'printout', 'ev-quill-receipt': 'receipt',
};

export function isFrame(src: Source): boolean { return !!FRAME_OF[src.id] || src.kind === 'fragment'; }

/** Image for any source. `w`/`h` are the drawn pixel size. */
export function sourceImage(src: Source, w: number, h: number): string {
  const id = `${src.id}|${w}x${h}`;
  const hit = CACHE.get(id);
  if (hit) return hit;
  const cv = makeCanvas(w, h); const c = ctx2d(cv);
  const r = rng(hash(src.id));
  try {
    if (FRAME_OF[src.id] || src.kind === 'fragment') videoFrame(c, w, h, src, r);
    else if (src.kind === 'testimony') slip(c, w, h, src, r);
    else photo(c, w, h, OBJECT_OF[src.id] ?? 'doc', r);
  } catch { c.fillStyle = '#1d2327'; c.fillRect(0, 0, w, h); }
  const url = cv.toDataURL('image/jpeg', 0.86);
  CACHE.set(id, url);
  return url;
}

function hash(s: string): number { let x = 2166136261; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }

// ------------------------------------------------------------------ video frames
function videoFrame(c: Ctx, w: number, h: number, src: Source, r: Rng): void {
  const f = FRAME_OF[src.id] ?? { key: 'street' as SceneKey, exposure: 1, who: '' };
  const sw = Math.round(w * 1.25); const sh = Math.round(sw * 9 / 16);
  const still = sceneStill(f.key, sw, sh);
  // crop as if from the wearer's eyes: slightly off-centre, slightly tilted
  c.fillStyle = '#000'; c.fillRect(0, 0, w, h);
  c.save(); c.translate(w / 2, h / 2); c.rotate((r() - 0.5) * 0.04);
  const scale = Math.max(w / sw, h / sh) * 1.12;
  c.drawImage(still, -sw * scale / 2 + (r() - 0.5) * w * 0.1, -sh * scale / 2 + (r() - 0.5) * h * 0.08, sw * scale, sh * scale);
  c.restore();
  // exposure
  if (f.exposure < 1) { c.fillStyle = `rgba(0,0,0,${(1 - f.exposure).toFixed(3)})`; c.fillRect(0, 0, w, h); }
  else if (f.exposure > 1) { c.globalCompositeOperation = 'screen'; c.fillStyle = `rgba(255,200,160,${((f.exposure - 1) * 1.5).toFixed(3)})`; c.fillRect(0, 0, w, h); c.globalCompositeOperation = 'source-over'; }
  // chroma bleed: a horizontally shifted copy in red
  const copy = makeCanvas(w, h); const cc = ctx2d(copy); cc.drawImage(c.canvas, 0, 0);
  cc.globalCompositeOperation = 'multiply'; cc.fillStyle = '#ff2020'; cc.fillRect(0, 0, w, h);
  c.globalCompositeOperation = 'screen'; c.globalAlpha = 0.35; c.drawImage(copy, Math.max(1, w * 0.008), 0);
  c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
  // tracking tears
  for (let i = 0; i < 2 + Math.floor(r() * 3); i++) {
    const y = r() * h; const th = 1 + r() * h * 0.03; const off = (r() - 0.5) * w * 0.05;
    c.drawImage(c.canvas, 0, y, w, th, off, y, w, th);
    c.fillStyle = `rgba(255,255,255,${(0.04 + r() * 0.08).toFixed(3)})`; c.fillRect(0, y, w, Math.max(1, th * 0.3));
  }
  // scanlines and noise
  c.fillStyle = 'rgba(0,0,0,0.22)';
  for (let y = 0; y < h; y += 2) c.fillRect(0, y, w, 1);
  for (let i = 0; i < w * h * 0.02; i++) { c.fillStyle = `rgba(255,255,255,${(r() * 0.12).toFixed(3)})`; c.fillRect(r() * w, r() * h, 1, 1); }
  // burn-in: timecode, owner, a script tag
  const fs = Math.max(8, Math.round(h * 0.085));
  c.font = `500 ${fs}px ${MONO}`; c.textBaseline = 'alphabetic';
  const tc = src.ts !== undefined ? `${fmt(src.ts)}:${String(Math.floor(r() * 60)).padStart(2, '0')}` : '--:--:--';
  const shadowText = (t: string, x: number, y: number, align: CanvasTextAlign): void => { c.textAlign = align; c.fillStyle = 'rgba(0,0,0,0.7)'; c.fillText(t, x + 1, y + 1); c.fillStyle = 'rgba(235,245,240,0.9)'; c.fillText(t, x, y); };
  shadowText(tc, w - fs * 0.6, h - fs * 0.6, 'right');
  shadowText(f.cam ?? `${f.who} feed`, fs * 0.6, fs * 1.3, 'left');
  c.fillStyle = 'rgba(255,70,70,0.9)'; c.beginPath(); c.arc(w - fs * 0.9, fs * 0.95, fs * 0.28, 0, Math.PI * 2); c.fill();
  paintScript(c, 'feed', fs * 0.6, h - fs * 1.1, fs * 0.55, 'rgba(235,245,240,0.6)', { align: 'left' }, 0.12);
}

// ------------------------------------------------------------------ transcript slip
function slip(c: Ctx, w: number, h: number, src: Source, r: Rng): void {
  c.fillStyle = '#2a3034'; c.fillRect(0, 0, w, h);
  c.save(); c.translate(w / 2, h / 2); c.rotate((r() - 0.5) * 0.05); c.translate(-w / 2, -h / 2);
  const px = w * 0.08; const py = h * 0.1; const pw = w * 0.84; const ph = h * 0.86;
  c.fillStyle = 'rgba(0,0,0,0.4)'; c.fillRect(px + 3, py + 4, pw, ph);
  vgrad(c, px, py, pw, ph, [[0, '#ece5d3'], [1, '#ddd5c1']]);
  c.fillStyle = 'rgba(120,90,60,0.08)'; for (let i = 0; i < 40; i++) c.fillRect(px + r() * pw, py + r() * ph, 2, 2);
  const fs = Math.max(7, Math.round(h * 0.075));
  c.font = `600 ${fs}px ${SANS}`; c.fillStyle = '#3b3328'; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
  c.fillText('Interview record', px + pw * 0.07, py + fs * 1.5);
  c.font = `400 ${fs}px ${MONO}`; c.fillStyle = '#5a5044'; c.textAlign = 'right';
  c.fillText(src.subject === 'scene' ? '' : initials(src.subject), px + pw * 0.93, py + fs * 1.5);
  c.fillStyle = '#b44a3a'; c.fillRect(px + pw * 0.07, py + fs * 1.9, pw * 0.86, 1);
  for (let i = 0; i < 6; i++) {
    const ly = py + fs * (2.9 + i * 1.25);
    if (ly > py + ph - fs) break;
    c.fillStyle = 'rgba(40,34,26,0.55)';
    c.fillRect(px + pw * 0.07, ly, pw * (0.5 + r() * 0.36), Math.max(1, fs * 0.3));
  }
  if (src.retractedBy) { c.strokeStyle = 'rgba(180,40,40,0.5)'; c.lineWidth = 2; c.strokeRect(px + pw * 0.55, py + ph * 0.6, pw * 0.36, fs * 1.5); }
  c.restore();
}
function initials(p: string): string { return ({ quill: 'MQ', brisk: 'TB', voss: 'LV', pell: 'OP', roque: 'AR' } as Record<string, string>)[p] ?? ''; }

// ------------------------------------------------------------------ flash photographs
function photo(c: Ctx, w: number, h: number, kind: Kind, r: Rng): void {
  // evidence surface: grey-blue card with a faint grid
  vgrad(c, 0, 0, w, h, [[0, '#7d868a'], [1, '#5d6569']]);
  c.strokeStyle = 'rgba(0,0,0,0.07)'; c.lineWidth = 1;
  for (let x = 0; x < w; x += w / 16) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); }
  for (let y = 0; y < h; y += w / 16) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
  c.save();
  const cx = w * 0.5; const cy = h * 0.46;
  c.translate(cx, cy); c.rotate((r() - 0.5) * 0.12); c.translate(-cx, -cy);
  OBJECTS[kind](c, w, h, r);
  c.restore();
  // scale ruler
  const ry = h * 0.86; const rw = w * 0.5; const rx = w * 0.06;
  c.fillStyle = '#efeadc'; c.fillRect(rx, ry, rw, h * 0.07);
  for (let i = 0; i < 10; i++) { if (i % 2 === 0) { c.fillStyle = '#1b1a17'; c.fillRect(rx + (rw / 10) * i, ry, rw / 10, h * 0.025); } }
  c.fillStyle = '#1b1a17';
  for (let i = 0; i <= 20; i++) c.fillRect(rx + (rw / 20) * i, ry + h * 0.025, 1, i % 2 ? h * 0.012 : h * 0.022);
  // flash falloff, warm cast, grain
  const g = c.createRadialGradient(w * 0.45, h * 0.4, 0, w * 0.5, h * 0.5, Math.hypot(w, h) * 0.6);
  g.addColorStop(0, 'rgba(255,255,255,0.18)'); g.addColorStop(0.5, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.55)');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  c.globalCompositeOperation = 'soft-light'; c.fillStyle = 'rgba(255,200,140,0.35)'; c.fillRect(0, 0, w, h); c.globalCompositeOperation = 'source-over';
  for (let i = 0; i < w * h * 0.03; i++) { c.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},${(r() * 0.08).toFixed(3)})`; c.fillRect(r() * w, r() * h, 1, 1); }
}

function paper(c: Ctx, x: number, y: number, w: number, h: number, col = '#ece6d6'): void {
  c.fillStyle = 'rgba(0,0,0,0.35)'; c.fillRect(x + 3, y + 4, w, h);
  vgrad(c, x, y, w, h, [[0, col], [1, '#d8d0bc']]);
}
function textLines(c: Ctx, x: number, y: number, w: number, n: number, gap: number, r: Rng, col = 'rgba(30,28,24,0.6)'): void {
  for (let i = 0; i < n; i++) { c.fillStyle = col; c.fillRect(x, y + i * gap, w * (0.45 + r() * 0.5), Math.max(1, gap * 0.32)); }
}

const OBJECTS: Record<Kind, (c: Ctx, w: number, h: number, r: Rng) => void> = {
  printout(c, w, h, r) {
    const x = w * 0.3; const pw = w * 0.4;
    paper(c, x, h * 0.04, pw, h * 0.76, '#f1ede2');
    for (let i = 0; i < 12; i++) {
      const y = h * (0.1 + i * 0.055);
      c.fillStyle = 'rgba(30,28,24,0.65)'; c.fillRect(x + pw * 0.08, y, pw * 0.2, Math.max(1, h * 0.018));
      c.fillRect(x + pw * 0.34, y, pw * (0.25 + r() * 0.35), Math.max(1, h * 0.018));
    }
    c.fillStyle = 'rgba(190,40,40,0.6)'; c.fillRect(x + pw * 0.05, h * 0.37, pw * 0.9, h * 0.005);
  },
  chart(c, w, h, r) {
    paper(c, w * 0.16, h * 0.08, w * 0.68, h * 0.7);
    textLines(c, w * 0.21, h * 0.14, w * 0.3, 2, h * 0.05, r);
    c.strokeStyle = 'rgba(30,28,24,0.3)'; c.lineWidth = 1;
    for (let i = 0; i < 5; i++) { const y = h * (0.3 + i * 0.09); c.beginPath(); c.moveTo(w * 0.21, y); c.lineTo(w * 0.79, y); c.stroke(); }
    c.strokeStyle = '#1d3c8a'; c.lineWidth = Math.max(1.5, h * 0.012); c.beginPath();
    const pts: [number, number][] = [[0.21, 0.34], [0.46, 0.35], [0.47, 0.64], [0.6, 0.64], [0.605, 0.27], [0.62, 0.34], [0.79, 0.34]];
    pts.forEach(([a, b], i) => (i ? c.lineTo(w * a, h * b) : c.moveTo(w * a, h * b))); c.stroke();
  },
  gap(c, w, h, r) {
    paper(c, w * 0.12, h * 0.16, w * 0.76, h * 0.56);
    textLines(c, w * 0.17, h * 0.22, w * 0.4, 2, h * 0.05, r);
    for (let i = 0; i < 24; i++) { if (i >= 11 && i <= 14) continue; c.fillStyle = 'rgba(40,90,60,0.75)'; c.fillRect(w * (0.17 + i * 0.027), h * 0.42, w * 0.022, h * 0.1); }
    c.strokeStyle = 'rgba(190,40,40,0.8)'; c.lineWidth = 2; c.strokeRect(w * 0.46, h * 0.39, w * 0.11, h * 0.16);
    textLines(c, w * 0.17, h * 0.6, w * 0.5, 2, h * 0.04, r);
  },
  board(c, w, h, r) {
    c.fillStyle = 'rgba(0,0,0,0.4)'; c.fillRect(w * 0.2 + 4, h * 0.14 + 5, w * 0.6, h * 0.58);
    c.fillStyle = '#1f4a32'; c.fillRect(w * 0.2, h * 0.14, w * 0.6, h * 0.58);
    c.strokeStyle = 'rgba(200,170,90,0.6)'; c.lineWidth = 1;
    for (let i = 0; i < 18; i++) { c.beginPath(); const y = h * (0.18 + r() * 0.5); c.moveTo(w * 0.22, y); c.lineTo(w * (0.3 + r() * 0.3), y); c.lineTo(w * (0.4 + r() * 0.38), y + h * (r() - 0.5) * 0.1); c.stroke(); }
    for (let i = 0; i < 6; i++) { c.fillStyle = '#111'; c.fillRect(w * (0.26 + (i % 3) * 0.16), h * (0.24 + Math.floor(i / 3) * 0.24), w * 0.1, h * 0.12); }
    const g = c.createRadialGradient(w * 0.55, h * 0.42, 0, w * 0.55, h * 0.42, w * 0.22);
    g.addColorStop(0, 'rgba(10,5,2,0.95)'); g.addColorStop(0.6, 'rgba(50,25,10,0.7)'); g.addColorStop(1, 'rgba(50,25,10,0)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
  },
  fuse(c, w, h) {
    // evidence bag
    c.fillStyle = 'rgba(255,255,255,0.12)'; c.fillRect(w * 0.18, h * 0.08, w * 0.64, h * 0.68);
    c.strokeStyle = 'rgba(255,255,255,0.35)'; c.strokeRect(w * 0.18, h * 0.08, w * 0.64, h * 0.68);
    c.fillStyle = '#b8322a'; c.fillRect(w * 0.18, h * 0.08, w * 0.64, h * 0.06);
    // slug
    const g = c.createLinearGradient(0, h * 0.36, 0, h * 0.5);
    g.addColorStop(0, '#d9d4c4'); g.addColorStop(0.5, '#8d887a'); g.addColorStop(1, '#4e4a42');
    c.fillStyle = g; c.fillRect(w * 0.34, h * 0.36, w * 0.32, h * 0.14);
    c.fillStyle = '#9a8b5a'; c.fillRect(w * 0.31, h * 0.355, w * 0.04, h * 0.15); c.fillRect(w * 0.65, h * 0.355, w * 0.04, h * 0.15);
    c.strokeStyle = 'rgba(255,255,255,0.8)'; c.lineWidth = 1; c.beginPath(); c.moveTo(w * 0.44, h * 0.39); c.lineTo(w * 0.53, h * 0.43); c.stroke();
  },
  box(c, w, h, r) {
    c.fillStyle = 'rgba(0,0,0,0.4)'; c.fillRect(w * 0.28 + 4, h * 0.18 + 5, w * 0.44, h * 0.4);
    vgrad(c, w * 0.28, h * 0.18, w * 0.44, h * 0.4, [[0, '#d0662a'], [1, '#8a3a14']]);
    c.fillStyle = '#2a1408'; c.fillRect(w * 0.4, h * 0.13, w * 0.2, h * 0.06);
    c.fillStyle = '#efeadc'; c.fillRect(w * 0.33, h * 0.28, w * 0.2, h * 0.12);
    textLines(c, w * 0.35, h * 0.3, w * 0.15, 3, h * 0.03, r);
    paper(c, w * 0.6, h * 0.5, w * 0.3, h * 0.26, '#f1ede2');
    c.strokeStyle = '#1d3c8a'; c.lineWidth = 1.2; c.beginPath();
    for (let i = 0; i <= 30; i++) { const x = w * (0.62 + i * 0.0087); const y = h * 0.63 + Math.sin(i * 1.3) * h * 0.03 * (i === 24 ? 3 : 1); i ? c.lineTo(x, y) : c.moveTo(x, y); }
    c.stroke();
  },
  doc(c, w, h, r) {
    paper(c, w * 0.22, h * 0.04, w * 0.56, h * 0.76);
    c.fillStyle = '#26324a'; c.fillRect(w * 0.27, h * 0.09, w * 0.16, h * 0.04);
    textLines(c, w * 0.27, h * 0.2, w * 0.44, 7, h * 0.055, r);
    c.strokeStyle = 'rgba(180,40,40,0.75)'; c.lineWidth = 2; c.beginPath(); c.ellipse(w * 0.62, h * 0.66, w * 0.07, h * 0.06, -0.3, 0, Math.PI * 2); c.stroke();
  },
  ledger(c, w, h, r) {
    paper(c, w * 0.12, h * 0.06, w * 0.38, h * 0.72, '#e6dcc2'); paper(c, w * 0.5, h * 0.06, w * 0.38, h * 0.72, '#e9e0c8');
    c.fillStyle = 'rgba(0,0,0,0.15)'; c.fillRect(w * 0.495, h * 0.06, w * 0.01, h * 0.72);
    for (let i = 0; i < 11; i++) {
      const y = h * (0.13 + i * 0.058);
      c.fillStyle = 'rgba(120,40,40,0.25)'; c.fillRect(w * 0.14, y + h * 0.03, w * 0.72, 1);
      textLines(c, w * 0.15, y, w * 0.12, 1, h * 0.05, r); textLines(c, w * 0.53, y, w * 0.2, 1, h * 0.05, r);
    }
    c.fillStyle = 'rgba(255,220,60,0.45)'; c.fillRect(w * 0.52, h * (0.13 + 6 * 0.058) - h * 0.012, w * 0.34, h * 0.04);
  },
  sign(c, w, h, r) {
    c.fillStyle = 'rgba(0,0,0,0.4)'; c.fillRect(w * 0.18 + 4, h * 0.14 + 5, w * 0.36, h * 0.5);
    vgrad(c, w * 0.18, h * 0.14, w * 0.36, h * 0.5, [[0, '#4a5256'], [1, '#2a3033']]);
    for (let i = 0; i < 4; i++) { c.fillStyle = '#16191b'; c.fillRect(w * 0.22, h * (0.2 + i * 0.1), w * 0.28, h * 0.06); c.fillStyle = i === 2 ? '#ff5050' : '#5aff9a'; c.fillRect(w * 0.46, h * (0.215 + i * 0.1), w * 0.025, h * 0.025); }
    paper(c, w * 0.56, h * 0.24, w * 0.3, h * 0.48, '#f1ede2');
    textLines(c, w * 0.59, h * 0.3, w * 0.22, 7, h * 0.055, r);
  },
  roll(c, w, h) {
    c.fillStyle = 'rgba(0,0,0,0.4)'; c.fillRect(w * 0.12 + 4, h * 0.2 + 5, w * 0.76, h * 0.42);
    vgrad(c, w * 0.12, h * 0.2, w * 0.76, h * 0.42, [[0, '#8a7754'], [1, '#6b5b3e']]);
    for (let i = 0; i < 8; i++) {
      const x = w * (0.17 + i * 0.085);
      c.fillStyle = 'rgba(0,0,0,0.25)'; c.fillRect(x - w * 0.012, h * 0.24, w * 0.05, h * 0.34);
      if (i === 4) { c.strokeStyle = 'rgba(190,40,40,0.8)'; c.lineWidth = 2; c.strokeRect(x - w * 0.016, h * 0.22, w * 0.058, h * 0.38); continue; }
      c.fillStyle = '#a7adb0'; c.fillRect(x, h * 0.26, w * 0.016, h * 0.3);
      c.fillStyle = i % 2 ? '#b13b2a' : '#2b2f31'; c.fillRect(x - w * 0.006, h * 0.42, w * 0.028, h * 0.14);
    }
  },
  receipt(c, w, h, r) {
    c.save(); c.translate(w * 0.5, h * 0.42); c.rotate(-0.08);
    c.fillStyle = 'rgba(0,0,0,0.35)'; c.fillRect(-w * 0.12 + 3, -h * 0.38 + 4, w * 0.24, h * 0.76);
    vgrad(c, -w * 0.12, -h * 0.38, w * 0.24, h * 0.76, [[0, '#f3efe4'], [1, '#e2dccb']]);
    textLines(c, -w * 0.09, -h * 0.3, w * 0.18, 10, h * 0.055, r, 'rgba(60,40,90,0.55)');
    c.restore();
  },
  screen(c, w, h, r) {
    c.fillStyle = 'rgba(0,0,0,0.5)'; c.fillRect(w * 0.12 + 4, h * 0.08 + 5, w * 0.76, h * 0.66);
    c.fillStyle = '#121619'; c.fillRect(w * 0.12, h * 0.08, w * 0.76, h * 0.66);
    vgrad(c, w * 0.15, h * 0.12, w * 0.7, h * 0.56, [[0, '#0f3a40'], [1, '#08262b']]);
    for (let i = 0; i < 9; i++) { c.fillStyle = i === 4 ? 'rgba(255,179,71,0.85)' : 'rgba(150,245,255,0.6)'; c.fillRect(w * 0.18, h * (0.16 + i * 0.055), w * (0.2 + r() * 0.4), Math.max(1, h * 0.018)); }
    c.fillStyle = 'rgba(255,255,255,0.05)';
    for (let y = h * 0.12; y < h * 0.68; y += 3) c.fillRect(w * 0.15, y, w * 0.7, 1);
  },
};

// ------------------------------------------------------------------ ID photos
const LOOK: Record<PersonId, Partial<PersonOpts>> = {
  quill: { broad: 0.95 }, brisk: { broad: 1.25, hat: 'cap' }, voss: { broad: 0.85 }, pell: { bun: true, broad: 0.9 }, roque: { broad: 1.05 },
};
export function personPhoto(id: PersonId, size: number): string {
  const key = `id|${id}|${size}`;
  const hit = CACHE.get(key);
  if (hit) return hit;
  const w = size; const h = Math.round(size * 1.2);
  const cv = makeCanvas(w, h); const c = ctx2d(cv);
  vgrad(c, 0, 0, w, h, [[0, '#58636a'], [1, '#2f373c']]);
  c.strokeStyle = 'rgba(255,255,255,0.12)'; c.lineWidth = 1; c.font = `400 ${Math.round(h * 0.05)}px ${MONO}`; c.fillStyle = 'rgba(255,255,255,0.3)';
  for (let i = 1; i < 6; i++) { const y = (h * i) / 6; c.beginPath(); c.moveTo(0, y); c.lineTo(w * 0.12, y); c.stroke(); c.fillText(String(200 - i * 10), w * 0.02, y - 2); }
  const o: PersonOpts = { h: h * 2.1, ...LOOK[id] };
  const path = personPath(w * 0.52, h * 2.15, o);
  c.fillStyle = '#121619'; c.fill(path);
  c.save(); c.clip(path);
  const g = c.createLinearGradient(w * 0.2, 0, w * 0.9, 0);
  g.addColorStop(0, 'rgba(255,255,255,0.0)'); g.addColorStop(0.8, 'rgba(255,255,255,0.05)'); g.addColorStop(1, 'rgba(230,240,245,0.22)');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  c.restore();
  c.fillStyle = 'rgba(255,255,255,0.04)'; c.fillRect(0, 0, w, h * 0.5);
  const r = rng(hash(id));
  for (let i = 0; i < w * h * 0.03; i++) { c.fillStyle = `rgba(255,255,255,${(r() * 0.06).toFixed(3)})`; c.fillRect(r() * w, r() * h, 1, 1); }
  c.fillStyle = rgba('233,226,208', 1); c.fillRect(w * 0.18, h * 0.84, w * 0.64, h * 0.1);
  c.font = `500 ${Math.round(h * 0.055)}px ${MONO}`; c.fillStyle = '#1b1a17'; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(`BRE ${String(hash(id) % 9000 + 1000)}`, w * 0.5, h * 0.89);
  const url = cv.toDataURL('image/jpeg', 0.88);
  CACHE.set(key, url);
  return url;
}
