/**
 * The ten game cards. Each is a tarot card: numeral, an engraved night scene with
 * ONE main motion that loops seamlessly, and the game's real name.
 * Scenes draw in the art window's local coordinates (w × h) for t ∈ [0, 1).
 */
import {
  PALETTE as P, mix, rgba, TAU, ease, rng, sky, grain, disc, mesa, cactus, starfield, starGlyph,
  constellation, stampBorder, observatory, spacedText, fitFont, hatchClip, stampStar, roman,
} from '../../../design/19_mystical-western/primitives.mjs';
import { FONT, roundRectPath } from './lib.mjs';

export const CARD = { W: 360, H: 600, R: 16, art: [24, 62, 312, 400] };

/* ----------------------------------------------------------------- helpers */

function backdrop(g, w, h, { moon = [0.72, 0.24, 30], phase = 0.05, horizon = 0.72, seed = 1, stars = 50, mesaH = 50 } = {}) {
  sky(g, 0, 0, w, h);
  starfield(g, 0, 0, w, h * horizon, { seed: seed + 10, count: stars, alpha: 0.45, max: 1.3, color: P.ash });
  grain(g, 0, 0, w, h, { seed: seed + 3, density: 1.2, alpha: 0.07 });
  if (moon) disc(g, w * moon[0], h * moon[1], moon[2], { phase, glow: 0.14, shadow: P.night });
  mesa(g, -10, w + 10, h * horizon, { seed: seed + 5, height: mesaH, fill: mix(P.dusk, P.wine, 0.35), plateaus: 2, strataAlpha: 0.22, bottom: h });
}

function ground(g, w, h, y, { fill = P.umber, seed = 2 } = {}) {
  const gr = g.createLinearGradient(0, y, 0, h);
  gr.addColorStop(0, fill);
  gr.addColorStop(1, P.ink);
  g.fillStyle = gr;
  g.fillRect(0, y, w, h - y);
  hatchClip(g, (c) => c.rect(0, y, w, h - y), { angle: 0, gap: 5, color: P.wine, alpha: 0.4, bounds: [0, y, w, h - y] });
  grain(g, 0, y, w, h - y, { seed, density: 4, colors: [P.tan, P.saddle], alpha: 0.12 });
}

function figure(g, x, y, s, { fill = P.bone, hat = true, lantern = false, coat = false } = {}) {
  // a small engraved rider/wanderer: hat, coat, legs. (x, y) = feet.
  g.save();
  g.fillStyle = fill;
  g.beginPath();
  g.ellipse(x, y - s * 1.55, s * 0.22, s * 0.24, 0, 0, TAU); // head
  g.fill();
  if (hat) {
    g.fillRect(x - s * 0.42, y - s * 1.74, s * 0.84, s * 0.07);
    g.fillRect(x - s * 0.22, y - s * 1.95, s * 0.44, s * 0.23);
  }
  g.beginPath(); // torso / coat
  g.moveTo(x - s * 0.3, y - s * 1.3);
  g.lineTo(x + s * 0.3, y - s * 1.3);
  g.lineTo(x + (coat ? s * 0.42 : s * 0.24), y - (coat ? s * 0.35 : s * 0.62));
  g.lineTo(x - (coat ? s * 0.42 : s * 0.24), y - (coat ? s * 0.35 : s * 0.62));
  g.closePath();
  g.fill();
  g.fillRect(x - s * 0.22, y - s * 0.66, s * 0.15, s * 0.66);
  g.fillRect(x + s * 0.07, y - s * 0.66, s * 0.15, s * 0.66);
  if (lantern) {
    const lx = x + s * 0.55;
    const ly = y - s * 0.75;
    const halo = g.createRadialGradient(lx, ly, 0, lx, ly, s * 1.6);
    halo.addColorStop(0, rgba(P.rose, 0.55));
    halo.addColorStop(1, rgba(P.rose, 0));
    g.fillStyle = halo;
    g.beginPath();
    g.arc(lx, ly, s * 1.6, 0, TAU);
    g.fill();
    g.fillStyle = P.blush;
    g.fillRect(lx - s * 0.12, ly - s * 0.16, s * 0.24, s * 0.3);
  }
  g.restore();
}

/* ------------------------------------------------------------------ scenes */

const scenes = {
  // XVII The Star — a red stamped formation sways above a bone cannon.
  'mystical-western-space-invaders'(g, w, h, t) {
    backdrop(g, w, h, { moon: null, seed: 3, horizon: 0.84, mesaH: 34, stars: 70 });
    ground(g, w, h, h * 0.86);
    const sway = Math.sin(TAU * t) * 22;
    const bob = (1 - Math.cos(TAU * 2 * t)) * 2;
    const glyph = (x, y, s, row) => {
      // a stamped longhorn skull: mask, horns, eye slots
      g.fillStyle = row === 0 ? P.rose : P.red;
      g.beginPath();
      g.moveTo(x - s, y - s * 0.55);
      g.quadraticCurveTo(x - s * 1.5, y - s * 1.1, x - s * 1.7, y - s * 0.4);
      g.quadraticCurveTo(x - s * 1.2, y - s * 0.6, x - s * 0.7, y - s * 0.2);
      g.lineTo(x - s * 0.45, y + s * 0.75);
      g.lineTo(x + s * 0.45, y + s * 0.75);
      g.lineTo(x + s * 0.7, y - s * 0.2);
      g.quadraticCurveTo(x + s * 1.2, y - s * 0.6, x + s * 1.7, y - s * 0.4);
      g.quadraticCurveTo(x + s * 1.5, y - s * 1.1, x + s, y - s * 0.55);
      g.closePath();
      g.fill();
      g.fillStyle = P.night;
      g.fillRect(x - s * 0.42, y - s * 0.05, s * 0.26, s * 0.2);
      g.fillRect(x + s * 0.16, y - s * 0.05, s * 0.26, s * 0.2);
    };
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) glyph(w * 0.2 + c * w * 0.2 + sway, h * 0.17 + r * 44 + bob, 10, r);
    // adobe bunkers
    for (const bx of [0.22, 0.5, 0.78]) {
      g.fillStyle = P.saddle;
      g.beginPath();
      g.moveTo(w * bx - 22, h * 0.8);
      g.lineTo(w * bx - 22, h * 0.76);
      g.quadraticCurveTo(w * bx, h * 0.72, w * bx + 22, h * 0.76);
      g.lineTo(w * bx + 22, h * 0.8);
      g.fill();
      hatchClip(g, (c) => c.rect(w * bx - 22, h * 0.73, 44, 30), { angle: 0, gap: 3, color: P.wine, alpha: 0.4, bounds: [w * bx - 22, h * 0.73, 44, 30] });
    }
    // the cannon and its standing shot
    const cx = w * 0.5;
    g.fillStyle = P.bone;
    g.fillRect(cx - 18, h * 0.86 - 10, 36, 10);
    g.fillRect(cx - 4, h * 0.86 - 22, 8, 14);
    g.fillStyle = P.rose;
    g.fillRect(cx - 1.5, h * 0.55, 3, 16);
  },

  // XVI The Tower — a frontier town at night; one car drives through.
  'mystical-western-vice'(g, w, h, t) {
    backdrop(g, w, h, { moon: [0.24, 0.17, 26], seed: 7, horizon: 0.6, mesaH: 40 });
    // false-front buildings
    const r = rng(17);
    let x = -6;
    while (x < w) {
      const bw = 44 + r() * 30;
      const bh = 80 + r() * 90;
      const top = h * 0.74 - bh;
      g.fillStyle = r() < 0.5 ? P.mesa : P.umber;
      g.fillRect(x, top, bw - 3, bh);
      g.fillRect(x - 3, top - 6, bw + 3, 6);
      hatchClip(g, (c) => c.rect(x, top, bw - 3, bh), { angle: 0, gap: 4, color: P.wine, alpha: 0.35, bounds: [x, top, bw, bh] });
      for (let wy = top + 12; wy < h * 0.7 - 10; wy += 22)
        for (let wx = x + 8; wx < x + bw - 14; wx += 16) {
          g.fillStyle = r() < 0.45 ? P.rose : P.night;
          g.globalAlpha = 0.85;
          g.fillRect(wx, wy, 7, 10);
          g.globalAlpha = 1;
        }
      x += bw;
    }
    // water tower
    g.fillStyle = P.ink;
    g.fillRect(w * 0.78, h * 0.18, 34, 28);
    g.beginPath();
    g.moveTo(w * 0.78 - 4, h * 0.18);
    g.lineTo(w * 0.78 + 17, h * 0.13);
    g.lineTo(w * 0.78 + 38, h * 0.18);
    g.fill();
    g.fillRect(w * 0.78 + 4, h * 0.18 + 28, 3, 60);
    g.fillRect(w * 0.78 + 27, h * 0.18 + 28, 3, 60);
    // street
    ground(g, w, h, h * 0.74, { fill: P.mesa });
    g.fillStyle = P.tan;
    g.globalAlpha = 0.35;
    for (let dx = 0; dx < w; dx += 40) g.fillRect(dx, h * 0.86, 22, 2);
    g.globalAlpha = 1;
    // the car — enters right, passes centre at t = 0, wraps while off-screen
    const range = w + 220;
    const cxp = w * 0.5 - (((t + 0.5) % 1) - 0.5) * range;
    const cy = h * 0.83;
    const beam = g.createLinearGradient(cxp - 40, 0, cxp - 150, 0);
    beam.addColorStop(0, rgba(P.blush, 0.5));
    beam.addColorStop(1, rgba(P.blush, 0));
    g.fillStyle = beam;
    g.beginPath();
    g.moveTo(cxp - 40, cy - 12);
    g.lineTo(cxp - 160, cy - 26);
    g.lineTo(cxp - 160, cy + 10);
    g.closePath();
    g.fill();
    g.fillStyle = P.bone;
    g.beginPath();
    g.moveTo(cxp - 44, cy);
    g.lineTo(cxp - 40, cy - 12);
    g.lineTo(cxp - 16, cy - 14);
    g.lineTo(cxp - 4, cy - 26);
    g.lineTo(cxp + 24, cy - 26);
    g.lineTo(cxp + 36, cy - 14);
    g.lineTo(cxp + 46, cy - 12);
    g.lineTo(cxp + 46, cy);
    g.closePath();
    g.fill();
    g.fillStyle = P.night;
    g.fillRect(cxp - 1, cy - 23, 11, 8);
    g.fillRect(cxp + 13, cy - 23, 11, 8);
    g.fillStyle = P.ink;
    for (const wx of [cxp - 26, cxp + 30]) { g.beginPath(); g.arc(wx, cy, 7, 0, TAU); g.fill(); }
    g.fillStyle = P.red;
    g.fillRect(cxp + 44, cy - 10, 3, 4);
  },

  // XII The Hanged Man — inside the lens, a fallen slab rises back into the bridge.
  unfall(g, w, h, t) {
    backdrop(g, w, h, { moon: [0.18, 0.15, 18], seed: 12, horizon: 0.5, mesaH: 46, stars: 60 });
    // chasm walls
    g.fillStyle = P.umber;
    g.fillRect(0, h * 0.5, w * 0.24, h * 0.5);
    g.fillRect(w * 0.76, h * 0.5, w * 0.24, h * 0.5);
    hatchClip(g, (c) => { c.rect(0, h * 0.5, w * 0.24, h * 0.5); c.rect(w * 0.76, h * 0.5, w * 0.24, h * 0.5); }, { angle: 0.9, gap: 5, color: P.wine, alpha: 0.5, bounds: [0, h * 0.5, w, h * 0.5] });
    // bridge planks
    const by = h * 0.5;
    const plank = (x, y, rot = 0) => {
      g.save();
      g.translate(x, y);
      g.rotate(rot);
      g.fillStyle = P.saddle;
      g.fillRect(-15, -5, 30, 10);
      g.strokeStyle = P.wine;
      g.strokeRect(-15, -5, 30, 10);
      g.restore();
    };
    for (let i = 0; i < 9; i++) if (i !== 4) plank(w * 0.12 + i * 31, by);
    // the lens: a carved ring around the missing plank; inside, time runs back
    const lx = w * 0.12 + 4 * 31;
    const back = ease(Math.abs(Math.sin(Math.PI * t))); // 0 in place → 1 fallen → 0
    const fall = back * h * 0.32;
    g.save();
    g.beginPath();
    g.arc(lx, by + 30, 64, 0, TAU);
    g.fillStyle = rgba(P.rose, 0.08);
    g.fill();
    g.restore();
    plank(lx, by + fall, back * 0.9);
    g.strokeStyle = P.rose;
    g.lineWidth = 2;
    g.beginPath();
    g.arc(lx, by + 30, 64, 0, TAU);
    g.stroke();
    g.setLineDash([2, 4]);
    g.lineWidth = 1;
    g.beginPath();
    g.arc(lx, by + 30, 56, 0, TAU);
    g.stroke();
    g.setLineDash([]);
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * TAU;
      g.beginPath();
      g.moveTo(lx + Math.cos(a) * 64, by + 30 + Math.sin(a) * 64);
      g.lineTo(lx + Math.cos(a) * 70, by + 30 + Math.sin(a) * 70);
      g.stroke();
    }
    // Ilo with her lantern, walking toward the gap
    figure(g, w * 0.3, by - 5, 22, { fill: P.bone, hat: false, lantern: true, coat: true });
    // the lighthouse far right
    g.fillStyle = P.bone;
    g.beginPath();
    g.moveTo(w * 0.86, by - 5);
    g.lineTo(w * 0.875, by - 70);
    g.lineTo(w * 0.905, by - 70);
    g.lineTo(w * 0.92, by - 5);
    g.fill();
    stampStar(g, w * 0.89, by - 80, 7, { fill: P.rose, edge: P.bone });
  },

  // VII The Chariot — a tank on the ledge sweeps its turret across the depot.
  'mystical-western-tanks'(g, w, h, t) {
    backdrop(g, w, h, { moon: [0.78, 0.14, 22], seed: 21, horizon: 0.55, mesaH: 50 });
    ground(g, w, h, h * 0.62, { fill: P.mesa });
    // crates
    for (const [cx, cy, s] of [[0.12, 0.6, 26], [0.2, 0.6, 20], [0.86, 0.62, 30]]) {
      g.fillStyle = P.saddle;
      g.fillRect(w * cx - s / 2, h * cy - s, s, s);
      g.strokeStyle = P.wine;
      g.strokeRect(w * cx - s / 2, h * cy - s, s, s);
      g.beginPath();
      g.moveTo(w * cx - s / 2, h * cy - s);
      g.lineTo(w * cx + s / 2, h * cy);
      g.stroke();
    }
    // enemy tank, distant, red
    const ex = w * 0.72;
    const ey = h * 0.6;
    g.fillStyle = P.red;
    g.fillRect(ex - 18, ey - 8, 36, 8);
    g.fillRect(ex - 10, ey - 15, 18, 8);
    g.fillRect(ex - 24, ey - 13, 14, 3);
    // player tank
    const px = w * 0.38;
    const py = h * 0.84;
    g.fillStyle = P.ink;
    g.fillRect(px - 62, py - 10, 124, 18);
    for (let k = -54; k <= 54; k += 18) { g.fillStyle = P.smoke; g.beginPath(); g.arc(px + k, py, 7, 0, TAU); g.fill(); }
    g.fillStyle = P.bone;
    g.beginPath();
    g.moveTo(px - 66, py - 10);
    g.lineTo(px - 54, py - 34);
    g.lineTo(px + 56, py - 34);
    g.lineTo(px + 68, py - 10);
    g.closePath();
    g.fill();
    hatchClip(g, (c) => { c.moveTo(px - 66, py - 10); c.lineTo(px - 54, py - 34); c.lineTo(px + 56, py - 34); c.lineTo(px + 68, py - 10); c.closePath(); }, { angle: 0, gap: 3, color: P.saddle, alpha: 0.6, bounds: [px - 70, py - 36, 140, 28] });
    // turret sweeps — aimed at the enemy at t = 0
    const aim = Math.atan2(ey - 11 - (py - 44), ex - px);
    const ang = aim - (1 - Math.cos(TAU * t)) * 0.32;
    g.save();
    g.translate(px, py - 44);
    g.rotate(ang);
    g.fillStyle = P.bone;
    g.fillRect(0, -4, 84, 8);
    g.fillRect(80, -6, 10, 12);
    g.restore();
    g.fillStyle = P.bone;
    g.beginPath();
    g.ellipse(px, py - 40, 30, 14, 0, Math.PI, 0);
    g.fill();
    g.fillStyle = P.red;
    g.fillRect(px - 4, py - 50, 8, 4);
  },

  // 0 The Fool — Vee hops beneath a stamped star.
  'mystical-western-jump'(g, w, h, t) {
    backdrop(g, w, h, { moon: [0.2, 0.16, 22], seed: 30, horizon: 0.68, mesaH: 40 });
    cactus(g, w * 0.88, h * 0.7, 40, { fill: P.ink });
    // adobe platforms
    const plat = (x, y, pw) => {
      g.fillStyle = P.saddle;
      g.fillRect(x, y, pw, 18);
      g.fillStyle = P.wine;
      g.fillRect(x, y + 18, pw, 6);
      hatchClip(g, (c) => c.rect(x, y, pw, 18), { angle: 0, gap: 4, color: P.wine, alpha: 0.35, bounds: [x, y, pw, 18] });
    };
    plat(w * 0.08, h * 0.78, 110);
    plat(w * 0.56, h * 0.64, 100);
    ground(g, w, h, h * 0.9);
    // star at the apex
    const sx = w * 0.3;
    const sy = h * 0.34;
    const halo = g.createRadialGradient(sx, sy, 0, sx, sy, 36);
    halo.addColorStop(0, rgba(P.rose, 0.5));
    halo.addColorStop(1, rgba(P.rose, 0));
    g.fillStyle = halo;
    g.beginPath();
    g.arc(sx, sy, 36, 0, TAU);
    g.fill();
    stampStar(g, sx, sy, 15, { fill: P.rose, edge: P.bone });
    // Vee: apex at t = 0, lands at t = 0.5
    const u = (t + 0.5) % 1;
    const hop = Math.sin(Math.PI * u);
    const fy = h * 0.78 - hop * (h * 0.78 - sy - 46);
    const squash = 1 - (1 - hop) * 0.12;
    g.save();
    g.translate(sx, fy);
    g.scale(1 / squash, squash);
    figure(g, 0, 0, 22, { fill: P.bone, hat: true });
    g.restore();
  },

  // X Wheel of Fortune — the highway runs to the horizon; the Spine gate waits.
  'mystical-western-overdrive'(g, w, h, t) {
    const hz = h * 0.5;
    backdrop(g, w, h, { moon: [0.5, 0.3, 30], seed: 41, horizon: 0.5, mesaH: 38, stars: 60 });
    ground(g, w, h, hz, { fill: P.umber });
    const vx = w / 2;
    // road
    g.fillStyle = P.mesa;
    g.beginPath();
    g.moveTo(vx - 6, hz);
    g.lineTo(vx + 6, hz);
    g.lineTo(w + 40, h);
    g.lineTo(-40, h);
    g.closePath();
    g.fill();
    g.strokeStyle = P.tan;
    g.lineWidth = 2;
    for (const s of [-1, 1]) { g.beginPath(); g.moveTo(vx + s * 6, hz); g.lineTo(vx + s * (w / 2 + 40), h); g.stroke(); }
    // centre dashes: z-space scroll, seamless (one dash period per loop)
    g.fillStyle = P.bone;
    for (let k = 0; k < 10; k++) {
      const z0 = (k + t) / 10; // 0 near horizon → 1 near viewer
      const z1 = z0 + 0.035;
      const y0 = hz + (h - hz) * z0 * z0;
      const y1 = hz + (h - hz) * Math.min(1, z1 * z1);
      const w0 = 1 + z0 * 7;
      g.globalAlpha = 0.25 + 0.75 * z0;
      g.fillRect(vx - w0 / 2, y0, w0, Math.max(1, y1 - y0));
    }
    g.globalAlpha = 1;
    // Spine gate: stamped red arch on the horizon
    const gy = hz + 18;
    g.strokeStyle = P.red;
    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(vx - 34, gy);
    g.lineTo(vx - 34, gy - 26);
    g.arc(vx, gy - 26, 34, Math.PI, 0);
    g.lineTo(vx + 34, gy);
    g.stroke();
    stampStar(g, vx, gy - 66, 6, { fill: P.rose, edge: P.bone });
    // the player's car from behind
    const cy = h * 0.88;
    g.fillStyle = P.bone;
    g.beginPath();
    g.moveTo(vx - 46, cy);
    g.lineTo(vx - 40, cy - 22);
    g.lineTo(vx - 26, cy - 40);
    g.lineTo(vx + 26, cy - 40);
    g.lineTo(vx + 40, cy - 22);
    g.lineTo(vx + 46, cy);
    g.closePath();
    g.fill();
    g.fillStyle = P.night;
    g.fillRect(vx - 22, cy - 36, 44, 12);
    g.fillStyle = P.red;
    g.fillRect(vx - 40, cy - 18, 18, 5);
    g.fillRect(vx + 22, cy - 18, 18, 5);
    g.fillStyle = P.ink;
    g.fillRect(vx - 44, cy, 16, 8);
    g.fillRect(vx + 28, cy, 16, 8);
    // two rival tail lights far ahead
    g.fillStyle = P.red;
    g.fillRect(vx - 22, hz + 40, 4, 2);
    g.fillRect(vx - 14, hz + 40, 4, 2);
    g.fillRect(vx + 12, hz + 26, 3, 2);
    g.fillRect(vx + 18, hz + 26, 3, 2);
  },

  // XXI The World — the room turns a quarter; walls become floors.
  'paradox-room'(g, w, h, t) {
    sky(g, 0, 0, w, h);
    starfield(g, 0, 0, w, h, { seed: 55, count: 70, alpha: 0.4, max: 1.2, color: P.ash });
    grain(g, 0, 0, w, h, { seed: 56, density: 1.2, alpha: 0.07 });
    const cx = w / 2;
    const cy = h * 0.5;
    const S = 92;
    const a = ease(t) * (Math.PI / 2) + Math.PI / 4; // quarter turn per loop
    const tilt = 0.42;
    const P3 = (x, y, z) => {
      const rx = x * Math.cos(a) - z * Math.sin(a);
      const rz = x * Math.sin(a) + z * Math.cos(a);
      return [cx + rx, cy + y * Math.cos(tilt) - rz * Math.sin(tilt) * 0.9, rz];
    };
    const V = [];
    for (const x of [-S, S]) for (const y of [-S, S]) for (const z of [-S, S]) V.push(P3(x, y, z));
    const faces = [
      [0, 1, 3, 2], [4, 5, 7, 6], [0, 1, 5, 4], [2, 3, 7, 6], [0, 2, 6, 4], [1, 3, 7, 5],
    ];
    // Open room: the floor plus whichever walls face away from us. Shading follows
    // each wall's normal, so the quarter turn is continuous and seamless.
    const walls = [
      [[0, 1, 3, 2], [-1, 0]], [[4, 5, 7, 6], [1, 0]], [[0, 2, 6, 4], [0, -1]], [[1, 3, 7, 5], [0, 1]],
    ];
    const paint = (f, fill, angle) => {
      const path = (c2) => { c2.moveTo(V[f[0]][0], V[f[0]][1]); for (const i of f.slice(1)) c2.lineTo(V[i][0], V[i][1]); c2.closePath(); };
      g.fillStyle = fill;
      g.beginPath();
      path(g);
      g.fill();
      const xs = f.map((i) => V[i][0]);
      const ys = f.map((i) => V[i][1]);
      hatchClip(g, path, { angle, gap: 5, color: P.wine, alpha: 0.35, bounds: [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)] });
      const m = f.map((i) => V[i]);
      const mx = m.reduce((s2, p) => s2 + p[0], 0) / 4;
      const my = m.reduce((s2, p) => s2 + p[1], 0) / 4;
      g.fillStyle = P.night;
      g.beginPath();
      m.forEach((p, k) => (k ? g.lineTo : g.moveTo).call(g, mx + (p[0] - mx) * 0.28, my + (p[1] - my) * 0.28));
      g.closePath();
      g.fill();
    };
    paint([2, 3, 7, 6], P.saddle, Math.PI / 2);
    for (const [f, [nx, nz]] of walls) {
      const facing = nx * Math.sin(a) + nz * Math.cos(a);
      if (facing > 0.001) paint(f, mix(P.saddle, P.tan, Math.min(1, facing)), 0);
    }
    g.strokeStyle = P.bone;
    g.lineWidth = 1.5;
    for (const [i, j] of [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]]) {
      g.beginPath();
      g.moveTo(V[i][0], V[i][1]);
      g.lineTo(V[j][0], V[j][1]);
      g.stroke();
    }
    // the lantern-bearer, steady at the centre of the turn
    figure(g, cx, cy + 34, 20, { fill: P.bone, hat: false, lantern: true });
    stampStar(g, cx, h * 0.1, 8, { fill: P.rose, edge: P.bone });
    stampStar(g, w * 0.1, h * 0.88, 6, { fill: P.rose, edge: P.bone });
  },

  // XVIII The Moon — rain over Kestrel Bay; a lamp and a wanted notice.
  'ghost-signal'(g, w, h, t) {
    backdrop(g, w, h, { moon: [0.74, 0.14, 24], phase: 0.62, seed: 61, horizon: 0.58, mesaH: 30, stars: 30 });
    // the bay
    g.fillStyle = P.dusk;
    g.fillRect(0, h * 0.58, w, h * 0.08);
    g.strokeStyle = P.saddle;
    g.globalAlpha = 0.35;
    for (let y = h * 0.59; y < h * 0.66; y += 5) { g.beginPath(); g.moveTo(w * 0.62, y); g.lineTo(w * 0.86, y); g.stroke(); }
    g.globalAlpha = 1;
    // building wall with a notice
    g.fillStyle = P.mesa;
    g.fillRect(0, h * 0.3, w * 0.44, h * 0.6);
    hatchClip(g, (c) => c.rect(0, h * 0.3, w * 0.44, h * 0.6), { angle: 0, gap: 6, color: P.wine, alpha: 0.5, bounds: [0, h * 0.3, w * 0.44, h * 0.6] });
    g.fillStyle = P.tan;
    g.fillRect(w * 0.1, h * 0.4, 70, 92);
    g.fillStyle = P.wine;
    g.font = `13px ${FONT.title}`;
    g.textAlign = 'center';
    g.fillText('WANTED', w * 0.1 + 35, h * 0.4 + 18);
    g.fillStyle = P.saddle;
    g.beginPath();
    g.arc(w * 0.1 + 35, h * 0.4 + 46, 14, 0, TAU);
    g.fill();
    for (let k = 0; k < 3; k++) g.fillRect(w * 0.1 + 12, h * 0.4 + 68 + k * 7, 46, 2);
    g.textAlign = 'left';
    ground(g, w, h, h * 0.9, { fill: P.mesa });
    // lamp post
    const lx = w * 0.62;
    g.fillStyle = P.ink;
    g.fillRect(lx - 3, h * 0.36, 6, h * 0.54);
    g.fillRect(lx - 16, h * 0.36, 32, 4);
    const halo = g.createRadialGradient(lx, h * 0.39, 0, lx, h * 0.39, 90);
    halo.addColorStop(0, rgba(P.rose, 0.45));
    halo.addColorStop(1, rgba(P.rose, 0));
    g.fillStyle = halo;
    g.beginPath();
    g.arc(lx, h * 0.39, 90, 0, TAU);
    g.fill();
    g.fillStyle = P.blush;
    g.fillRect(lx - 7, h * 0.37, 14, 16);
    // the detective in a long coat
    figure(g, w * 0.76, h * 0.9, 34, { fill: P.bone, coat: true });
    // rain: each drop advances exactly one period per loop
    const r = rng(77);
    g.strokeStyle = P.ash;
    g.lineWidth = 1;
    for (let k = 0; k < 90; k++) {
      const x0 = r() * (w + 40) - 20;
      const y0 = r() * h;
      const y = (y0 + t * h) % h;
      g.globalAlpha = 0.25 + r() * 0.35;
      g.beginPath();
      g.moveTo(x0 + y * 0.12, y);
      g.lineTo(x0 + y * 0.12 + 2, y + 12);
      g.stroke();
    }
    g.globalAlpha = 1;
  },

  // IX The Hermit — a guard's lantern sweeps; the operative waits in shadow.
  'blackout-protocol'(g, w, h, t) {
    sky(g, 0, 0, w, h, { deep: P.ink, top: P.night, bottom: P.night });
    grain(g, 0, 0, w, h, { seed: 70, density: 1.4, alpha: 0.07 });
    // floor plan, engraved, top-down
    g.strokeStyle = P.wine;
    g.lineWidth = 1;
    g.globalAlpha = 0.6;
    for (let x = 0; x < w; x += 26) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
    for (let y = 0; y < h; y += 26) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    g.globalAlpha = 1;
    const wall = (x, y, ww, hh) => {
      g.fillStyle = P.mesa;
      g.fillRect(x, y, ww, hh);
      hatchClip(g, (c) => c.rect(x, y, ww, hh), { angle: 0.8, gap: 4, color: P.ember, alpha: 0.45, bounds: [x, y, ww, hh] });
    };
    wall(0, h * 0.1, w * 0.62, 14);
    wall(w * 0.62 - 14, h * 0.1, 14, h * 0.32);
    wall(w * 0.2, h * 0.62, w * 0.8, 14);
    wall(0, h * 0.84, w * 0.5, 14);
    // crates (cover)
    g.fillStyle = P.saddle;
    g.fillRect(w * 0.18, h * 0.42, 36, 36);
    g.strokeStyle = P.wine;
    g.strokeRect(w * 0.18, h * 0.42, 36, 36);
    // the lantern cone: points away from the crate at t = 0
    const gx = w * 0.72;
    const gy = h * 0.48;
    const dir = Math.PI * 0.15 + Math.sin(TAU * t) * 0.85;
    const cone = g.createRadialGradient(gx, gy, 6, gx, gy, 200);
    cone.addColorStop(0, rgba(P.red, 0.55));
    cone.addColorStop(1, rgba(P.red, 0));
    g.fillStyle = cone;
    g.beginPath();
    g.moveTo(gx, gy);
    g.arc(gx, gy, 200, dir - 0.38, dir + 0.38);
    g.closePath();
    g.fill();
    // guard (red) and operative (bone)
    g.fillStyle = P.red;
    g.beginPath(); g.arc(gx, gy, 11, 0, TAU); g.fill();
    g.fillStyle = P.blush;
    g.beginPath(); g.arc(gx + Math.cos(dir) * 12, gy + Math.sin(dir) * 12, 4, 0, TAU); g.fill();
    g.fillStyle = P.bone;
    g.beginPath(); g.arc(w * 0.12, h * 0.48, 9, 0, TAU); g.fill();
    g.strokeStyle = P.bone;
    g.globalAlpha = 0.5;
    g.setLineDash([2, 4]);
    g.beginPath(); g.arc(w * 0.12, h * 0.48, 16, 0, TAU); g.stroke();
    g.setLineDash([]);
    g.globalAlpha = 1;
    // hackable terminal and keycard: rose stamped markers
    stampStar(g, w * 0.44, h * 0.74, 9, { fill: P.rose, edge: P.bone, points: 4, inner: 0.4, rot: 0 });
    stampStar(g, w * 0.84, h * 0.24, 9, { fill: P.rose, edge: P.bone, points: 4, inner: 0.4, rot: 0 });
    // the hermit's moon, a quarter, in the corner
    disc(g, w * 0.88, h * 0.9, 16, { phase: 0.75, glow: 0.1, shadow: P.night });
  },

  // XIX The Sun — the swarm circles; the Bulwark Field holds.
  'void-survivor'(g, w, h, t) {
    sky(g, 0, 0, w, h, { deep: P.ink, top: P.night, bottom: P.night });
    starfield(g, 0, 0, w, h * 1.4, { seed: 81, count: 90, alpha: 0.35, max: 1.2, color: P.ash });
    const cx = w / 2;
    const cy = h * 0.52;
    // quiet chart rings
    g.strokeStyle = P.quiet;
    g.lineWidth = 1;
    for (const r of [60, 100, 140, 180]) { g.globalAlpha = 0.6; g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.stroke(); }
    g.globalAlpha = 1;
    constellation(g, [[w * 0.12, h * 0.12], [w * 0.22, h * 0.07], [w * 0.3, h * 0.15]], { color: P.quiet, node: P.ash, alpha: 0.7, nodeR: 1.6 });
    // swarm: each ring holds n evenly spaced marks and turns by 2π/n per loop
    const rings = [[150, 18, 1, 5], [118, 14, -1, 6], [196, 22, -1, 4]];
    for (const [r, n, d, s] of rings) {
      for (let k = 0; k < n; k++) {
        const a = (k / n) * TAU + d * t * (TAU / n);
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        g.fillStyle = k % 3 === 0 ? P.ember : P.red;
        g.beginPath();
        g.moveTo(x, y - s);
        g.lineTo(x + s, y);
        g.lineTo(x, y + s);
        g.lineTo(x - s, y);
        g.fill();
      }
    }
    // Bulwark Field: carved ring
    g.strokeStyle = P.rose;
    g.lineWidth = 3;
    g.beginPath(); g.arc(cx, cy, 70, 0, TAU); g.stroke();
    g.lineWidth = 1;
    g.setLineDash([3, 4]);
    g.beginPath(); g.arc(cx, cy, 62, 0, TAU); g.stroke();
    g.setLineDash([]);
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * TAU;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * 70, cy + Math.sin(a) * 70);
      g.lineTo(cx + Math.cos(a) * 78, cy + Math.sin(a) * 78);
      g.stroke();
    }
    // shards
    for (const [x, y] of [[0.2, 0.74], [0.82, 0.3], [0.74, 0.86], [0.16, 0.34]]) stampStar(g, w * x, h * y, 7, { fill: P.rose, edge: P.bone });
    // the survivor
    disc(g, cx, cy, 16, { face: P.bone, rim: P.ember, rings: 1, hatch: false, glow: 0.3 });
  },
};

/** Same order as the hub catalogue (site/src/data/games.ts). */
export const CARDS = [
  { id: 'unfall', title: 'UNFALL', n: 12, arcana: 'The Hanged Man' },
  { id: 'mystical-western-tanks', title: 'MYSTICAL WESTERN TANKS: OVERDRIVE', n: 7, arcana: 'The Chariot' },
  { id: 'mystical-western-vice', title: 'MYSTICAL WESTERN VICE', n: 16, arcana: 'The Tower' },
  { id: 'mystical-western-space-invaders', title: 'MYSTICAL WESTERN SPACE INVADERS', n: 17, arcana: 'The Star' },
  { id: 'mystical-western-overdrive', title: 'MYSTICAL WESTERN OVERDRIVE', n: 10, arcana: 'Wheel of Fortune' },
  { id: 'paradox-room', title: 'PARADOX ROOM', n: 21, arcana: 'The World' },
  { id: 'ghost-signal', title: 'GHOST SIGNAL', n: 18, arcana: 'The Moon' },
  { id: 'blackout-protocol', title: 'BLACKOUT PROTOCOL', n: 9, arcana: 'The Hermit' },
  { id: 'void-survivor', title: 'VOID SURVIVOR', n: 19, arcana: 'The Sun' },
  { id: 'mystical-western-jump', title: 'MYSTICAL WESTERN JUMP: CYBERWORLD', n: 0, arcana: 'The Fool' },
];

/* ------------------------------------------------------------- card frame */

export function drawCard(card) {
  const { W, H, R, art } = CARD;
  const scene = scenes[card.id];
  return (g, t) => {
    // paper body, rounded; outside stays transparent
    roundRectPath(g, 0, 0, W, H, R);
    g.save();
    g.clip();
    g.fillStyle = P.bone;
    g.fillRect(0, 0, W, H);
    const vig = g.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.7);
    vig.addColorStop(0, rgba(P.tan, 0));
    vig.addColorStop(1, rgba(P.tan, 0.75));
    g.fillStyle = vig;
    g.fillRect(0, 0, W, H);
    grain(g, 0, 0, W, H, { seed: card.n + 100, density: 5, colors: [P.saddle, P.wine], alpha: 0.12 });
    g.restore();
    stampBorder(g, 0, 0, W, H, { radius: R, color: P.wine, stitch: P.saddle, inset: 8, corner: 5, stitchAlpha: 0.7 });
    // numeral
    g.fillStyle = P.wine;
    g.font = `700 22px ${FONT.slab}`;
    g.textBaseline = 'alphabetic';
    spacedText(g, roman(card.n), W / 2, 46, 3, 'center');
    starGlyph(g, W / 2 - 46, 39, 5, P.red);
    starGlyph(g, W / 2 + 46, 39, 5, P.red);
    // art window
    const [ax, ay, aw, ah] = art;
    g.save();
    g.beginPath();
    g.rect(ax, ay, aw, ah);
    g.clip();
    g.translate(ax, ay);
    scene(g, aw, ah, t);
    g.restore();
    g.strokeStyle = P.wine;
    g.lineWidth = 3;
    g.strokeRect(ax, ay, aw, ah);
    g.lineWidth = 1;
    g.strokeRect(ax - 5, ay - 5, aw + 10, ah + 10);
    // title
    g.fillStyle = P.paperInk ?? P.ink;
    g.fillStyle = mix(P.ink, P.wine, 0.3);
    const size = fitFont(g, card.title, FONT.title, 34, W - 64, 1);
    g.font = `${size}px ${FONT.title}`;
    spacedText(g, card.title, W / 2, ay + ah + 50, 1, 'center');
    g.fillStyle = P.red;
    g.font = `500 18px ${FONT.italic}`;
    spacedText(g, card.arcana, W / 2, ay + ah + 78, 0.5, 'center');
    // engraved rule with diamonds
    const y = ay + ah + 96;
    g.strokeStyle = P.saddle;
    g.beginPath();
    g.moveTo(W / 2 - 70, y);
    g.lineTo(W / 2 + 70, y);
    g.stroke();
    g.fillStyle = P.wine;
    for (const ex of [W / 2 - 70, W / 2, W / 2 + 70]) {
      g.beginPath();
      g.moveTo(ex, y - 4);
      g.lineTo(ex + 4, y);
      g.lineTo(ex, y + 4);
      g.lineTo(ex - 4, y);
      g.fill();
    }
  };
}

/** App icon: a carved crescent moon and a stamped star on night. */
export function drawIcon(g, s) {
  disc(g, s * 0.46, s * 0.54, s * 0.3, { phase: 0.78, glow: 0, shadow: P.night, rings: 1, hatch: true });
  stampStar(g, s * 0.74, s * 0.28, s * 0.11, { fill: P.red, edge: P.bone });
}
