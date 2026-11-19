/** Profile-level art: hero, footer, separators, skills map, arcade button, og image. */
import {
  PALETTE as P, ROLES, mix, rgba, TAU, ease, sky, grain, disc, mesa, cactus, starfield, starGlyph,
  constellation, stampBorder, observatory, spacedText, fitFont, moonRow, hatchClip, stampStar,
} from '../../../design/19_mystical-western/primitives.mjs';
import { FONT, roundRectPath } from './lib.mjs';

/** A flat-topped butte with engraved strata. Returns the top y. */
export function butte(g, x0, x1, topY, baseY, { fill = P.mesa, strata = P.ember } = {}) {
  const w = x1 - x0;
  const path = (c) => {
    c.moveTo(x0, baseY);
    c.lineTo(x0 + w * 0.12, topY + (baseY - topY) * 0.25);
    c.lineTo(x0 + w * 0.18, topY);
    c.lineTo(x1 - w * 0.2, topY);
    c.lineTo(x1 - w * 0.1, topY + (baseY - topY) * 0.3);
    c.lineTo(x1, baseY);
    c.closePath();
  };
  g.fillStyle = fill;
  g.beginPath();
  path(g);
  g.fill();
  hatchClip(g, path, { angle: 0, gap: 4, color: strata, width: 1, alpha: 0.32, bounds: [x0, topY, w, baseY - topY] });
  hatchClip(g, path, { angle: 1.1, gap: 5, color: P.ink, width: 1, alpha: 0.25, bounds: [x0 + w * 0.55, topY, w * 0.45, baseY - topY] });
  return topY;
}

/** The frontier skyline shared by hero and og image. */
function skyline(g, W, H, t, L) {
  sky(g, 0, 0, W, H);
  starfield(g, 0, 0, W, H * 0.85, { seed: 21, count: Math.round((W * H) / 2600), alpha: 0.5, max: 1.5, color: P.bone });
  grain(g, 0, 0, W, H, { seed: 4, density: 0.9, alpha: 0.07 });
  // carved moon rising behind the far mesa
  disc(g, L.moon[0], L.moon[1], L.moon[2], { phase: 0.06, glow: 0.16, shadow: P.night });
  // far mesa (lighter, atmospheric)
  mesa(g, -20, W + 20, L.farY, { seed: 8, height: L.farH, fill: mix(P.dusk, P.wine, 0.35), strata: P.ember, strataAlpha: 0.22, plateaus: L.plateaus, bottom: H });
  // the observatory's butte
  butte(g, L.butte[0], L.butte[1], L.butte[2], L.nearY + 6, { fill: mix(P.mesa, P.ink, 0.25) });
  // near mesa
  mesa(g, -20, W + 20, L.nearY, { seed: 5, height: L.nearH, fill: mix(P.mesa, P.ink, 0.45), strata: P.ember, strataAlpha: 0.3, plateaus: L.plateaus + 1, bottom: H });
  // ground
  const gr = g.createLinearGradient(0, L.nearY, 0, H);
  gr.addColorStop(0, P.umber);
  gr.addColorStop(1, P.ink);
  g.fillStyle = gr;
  g.fillRect(0, L.nearY, W, H - L.nearY);
  hatchClip(g, (c) => c.rect(0, L.nearY, W, H - L.nearY), { angle: 0, gap: 6, color: P.wine, width: 1, alpha: 0.35, bounds: [0, L.nearY, W, H - L.nearY] });
  grain(g, 0, L.nearY, W, H - L.nearY, { seed: 9, density: 3, colors: [P.tan, P.saddle], alpha: 0.12 });
  for (const [x, h, s] of L.cacti) cactus(g, x, L.nearY + 4 + (s ? 10 : 0), h, { fill: P.ink, seed: x | 0 });
  // observatory and the telescope's three stars
  const [ox, oy, os] = L.obs;
  observatory(g, ox, oy, os, { fill: P.ink, slit: P.red, telescopeAngle: L.angle });
  const dir = [Math.cos(L.angle), Math.sin(L.angle)];
  const tip = [ox + dir[0] * os * 0.8, oy - os * 0.8 - os * 0.67 + dir[1] * os * 0.8];
  const spread = 1 - Math.cos(TAU * t); // 0 at the loop ends, 2 at the middle
  const offs = [[-0.8, -0.5], [0.6, 0.9], [-0.4, 0.8]];
  const pts = [0, 1, 2].map((k) => {
    const d = L.starStart + k * L.starGap;
    return [tip[0] + dir[0] * d + offs[k][0] * L.drift * spread, tip[1] + dir[1] * d + offs[k][1] * L.drift * spread];
  });
  const aligned = Math.max(0, 1 - spread * 1.6);
  // faint sight line from the telescope through the stars
  g.save();
  g.globalAlpha = 0.15 + 0.55 * aligned;
  g.strokeStyle = P.rose;
  g.setLineDash([2, 6]);
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(tip[0], tip[1]);
  g.lineTo(tip[0] + dir[0] * (L.starStart + L.starGap * 2.6), tip[1] + dir[1] * (L.starStart + L.starGap * 2.6));
  g.stroke();
  g.restore();
  pts.forEach(([x, y], k) => {
    g.save();
    const halo = g.createRadialGradient(x, y, 0, x, y, L.starR * 3.2);
    halo.addColorStop(0, rgba(P.rose, 0.35 * (0.4 + 0.6 * aligned)));
    halo.addColorStop(1, rgba(P.rose, 0));
    g.fillStyle = halo;
    g.beginPath();
    g.arc(x, y, L.starR * 3.2, 0, TAU);
    g.fill();
    g.restore();
    stampStar(g, x, y, L.starR * (k === 1 ? 1.15 : 0.9), { fill: P.bone, edge: P.rose, points: 4, inner: 0.32, rot: 0 });
  });
}

function title(g, W, L) {
  g.textBaseline = 'alphabetic';
  g.fillStyle = P.bone;
  for (const [text, x, y, size] of L.name) {
    g.font = `${size}px ${FONT.title}`;
    g.save();
    g.shadowColor = rgba(P.red, 0.35);
    g.shadowBlur = 18;
    spacedText(g, text, x, y, size * 0.02, L.align);
    g.restore();
  }
  const [rx, ry, rs] = L.role;
  g.font = `600 ${rs}px ${FONT.slab}`;
  g.fillStyle = P.rose;
  const tw = spacedText(g, 'FRONTEND SOFTWARE ENGINEER', rx, ry, rs * 0.28, L.align);
  // engraved rule with diamond ends under the role
  const y = ry + rs * 0.9;
  const x0 = L.align === 'center' ? rx - tw / 2 : rx;
  g.strokeStyle = P.ember;
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(x0, y);
  g.lineTo(x0 + tw, y);
  g.stroke();
  g.fillStyle = P.red;
  for (const ex of [x0, x0 + tw]) {
    g.beginPath();
    g.moveTo(ex, y - 4);
    g.lineTo(ex + 4, y);
    g.lineTo(ex, y + 4);
    g.lineTo(ex - 4, y);
    g.fill();
  }
}

export const HERO_DESKTOP = {
  W: 1280, H: 400,
  layout(W, H) {
    return {
      moon: [W * 0.15, H * 0.7, 64], farY: H * 0.8, farH: 64, nearY: H * 0.9, nearH: 34, plateaus: 3,
      butte: [W * 0.66, W * 0.86, H * 0.7], obs: [W * 0.755, H * 0.7, 36],
      cacti: [[W * 0.06, 44, 1], [W * 0.31, 26, 1], [W * 0.95, 36, 1]],
      angle: -0.72, starStart: 70, starGap: 58, starR: 9, drift: 34,
      name: [['Sergey Petrosyan', W * 0.43, H * 0.36, 66]], role: [W * 0.43, H * 0.36 + 44, 17], align: 'center',
    };
  },
};

export const HERO_MOBILE = {
  W: 720, H: 720,
  layout(W, H) {
    return {
      moon: [W * 0.2, H * 0.74, 60], farY: H * 0.82, farH: 70, nearY: H * 0.9, nearH: 30, plateaus: 2,
      butte: [W * 0.5, W * 0.9, H * 0.74], obs: [W * 0.69, H * 0.74, 40],
      cacti: [[W * 0.07, 46, 1], [W * 0.95, 34, 1]],
      angle: -1.3, starStart: 56, starGap: 46, starR: 10, drift: 28,
      name: [['Sergey', W * 0.5, H * 0.17, 88], ['Petrosyan', W * 0.5, H * 0.3, 88]], role: [W * 0.5, H * 0.3 + 48, 20], align: 'center',
    };
  },
};

export function drawHero(spec) {
  return (g, t) => {
    const L = spec.layout(spec.W, spec.H);
    skyline(g, spec.W, spec.H, t, L);
    title(g, spec.W, L);
  };
}

/** Open Graph / hub social image: the hero at 1200x630, stars aligned. */
export function drawOg(g, W, H) {
  const L = {
    moon: [W * 0.17, H * 0.72, 80], farY: H * 0.82, farH: 80, nearY: H * 0.9, nearH: 40, plateaus: 3,
    butte: [W * 0.62, W * 0.88, H * 0.72], obs: [W * 0.745, H * 0.72, 38],
    cacti: [[W * 0.07, 54, 1], [W * 0.95, 42, 1]],
    angle: -0.8, starStart: 80, starGap: 66, starR: 11, drift: 0,
    name: [['NEON ARCADE', W * 0.42, H * 0.3, 74]], role: [W * 0.42, H * 0.3 + 50, 22], align: 'center',
  };
  skyline(g, W, H, 0, L);
  g.fillStyle = P.bone;
  g.font = `74px ${FONT.title}`;
  spacedText(g, 'NEON ARCADE', L.name[0][1], L.name[0][2], 2, 'center');
  g.font = `600 22px ${FONT.slab}`;
  g.fillStyle = P.rose;
  spacedText(g, 'BROWSER GAMES BY SERGEY PETROSYAN', L.name[0][1], L.name[0][2] + 48, 5, 'center');
  stampBorder(g, 10, 10, W - 20, H - 20, { radius: 14, color: P.ember, stitch: P.tan, stitchAlpha: 0.4 });
}

/** Footer: one carved moon walks through its phases above the mesa. */
export const FOOTER = { W: 1280, H: 220 };
export function drawFooter(g, t) {
  const { W, H } = FOOTER;
  sky(g, 0, 0, W, H, { deep: P.night, top: P.night, bottom: P.dusk });
  starfield(g, 0, 0, W, H * 0.8, { seed: 33, count: 110, alpha: 0.45, max: 1.3 });
  grain(g, 0, 0, W, H, { seed: 12, density: 0.9, alpha: 0.07 });
  // quiet constellation drifting nowhere — static, it only frames the moon
  constellation(g, [[W * 0.33, 58], [W * 0.38, 40], [W * 0.43, 66], [W * 0.46, 50]], { color: P.quiet, node: P.ash, alpha: 0.6, nodeR: 1.6 });
  constellation(g, [[W * 0.56, 62], [W * 0.6, 38], [W * 0.66, 52]], { color: P.quiet, node: P.ash, alpha: 0.6, nodeR: 1.6 });
  disc(g, W * 0.5, 92, 40, { phase: t, glow: 0.14, shadow: mix(P.night, P.dusk, 0.5) });
  mesa(g, -20, W + 20, H * 0.82, { seed: 14, height: 46, fill: mix(P.dusk, P.wine, 0.3), plateaus: 4, strataAlpha: 0.2, bottom: H });
  mesa(g, -20, W + 20, H * 0.92, { seed: 15, height: 24, fill: P.mesa, plateaus: 5, strataAlpha: 0.3, bottom: H });
  g.fillStyle = P.ink;
  g.fillRect(0, H * 0.92, W, H);
  cactus(g, W * 0.12, H * 0.94, 34, { fill: P.ink, seed: 3 });
  cactus(g, W * 0.86, H * 0.94, 26, { fill: P.ink, seed: 4 });
  observatory(g, W * 0.72, H * 0.86, 18, { fill: P.ink, slit: P.red, telescopeAngle: -2.4 });
}

/** Moon-phase section rule. variant: 'dark' (for GitHub dark mode) or 'light'. */
export function drawSeparator(g, W, H, variant) {
  const dark = variant === 'dark';
  moonRow(g, W / 2, H / 2, W - 24, {
    n: 7,
    r: 9,
    face: dark ? P.bone : P.wine,
    shadow: dark ? mix(P.night, P.dusk, 0.6) : P.blush,
    rim: dark ? P.ember : P.wine,
    line: dark ? P.ember : mix(P.wine, P.bone, 0.35),
  });
}

/** "What I do" as a star chart. */
export const MAP = { W: 1280, H: 400 };
export function drawMap(g) {
  const { W, H } = MAP;
  roundRectPath(g, 0, 0, W, H, 18);
  g.save();
  g.clip();
  sky(g, 0, 0, W, H, { deep: P.night, top: P.night, bottom: mix(P.night, P.dusk, 0.6) });
  starfield(g, 0, 0, W, H * 1.4, { seed: 41, count: 170, alpha: 0.35, max: 1.2, color: P.ash });
  grain(g, 0, 0, W, H, { seed: 5, density: 1, alpha: 0.06 });
  // engraved celestial grid: concentric arcs and meridians around the chart centre
  const cx = W / 2;
  const cy = H * 1.55;
  g.strokeStyle = P.quiet;
  g.lineWidth = 1;
  for (let r = 380; r < 1300; r += 130) {
    g.globalAlpha = 0.5;
    g.beginPath();
    g.arc(cx, cy, r, Math.PI * 1.05, Math.PI * 1.95);
    g.stroke();
  }
  for (let a = -0.5; a <= 0.5; a += 0.125) {
    g.beginPath();
    g.moveTo(cx + Math.sin(a) * 380, cy - Math.cos(a) * 380);
    g.lineTo(cx + Math.sin(a) * 1400, cy - Math.cos(a) * 1400);
    g.stroke();
  }
  g.globalAlpha = 1;
  const nodes = [
    ['FRONTEND', 'ENGINEERING', W * 0.14, H * 0.6],
    ['UI / UX', 'ENGINEERING', W * 0.38, H * 0.3],
    ['ARCHITECTURE', '', W * 0.62, H * 0.56],
    ['PERFORMANCE', '', W * 0.86, H * 0.32],
  ];
  constellation(g, nodes.map((n) => [n[2], n[3]]), { color: P.rose, node: P.bone, alpha: 0.85, nodeR: 4, dash: [3, 6], width: 1.2 });
  // the fifth, smaller star: AI-assisted development, tied to architecture
  const ai = [W * 0.6, H * 0.84];
  constellation(g, [[nodes[2][2], nodes[2][3]], ai], { color: P.quiet, node: P.ash, alpha: 0.9, nodeR: 2.4, dash: [2, 5] });
  for (const [a, b, x, y] of nodes) {
    stampStar(g, x, y, 13, { fill: P.bone, edge: P.red, points: 4, inner: 0.34, rot: 0 });
    g.fillStyle = P.bone;
    g.font = `700 22px ${FONT.slab}`;
    spacedText(g, a, x, y + 46, 3, 'center');
    if (b) {
      g.fillStyle = P.ash;
      g.font = `600 15px ${FONT.slab}`;
      spacedText(g, b, x, y + 68, 4, 'center');
    }
  }
  g.fillStyle = P.ash;
  g.font = `600 14px ${FONT.slab}`;
  spacedText(g, 'AI-ASSISTED WORKFLOW', ai[0] + 22, ai[1] + 5, 3, 'left');
  // compass rose, lower left
  g.save();
  g.translate(W * 0.06, H * 0.16);
  g.strokeStyle = P.ember;
  g.beginPath();
  g.arc(0, 0, 24, 0, TAU);
  g.stroke();
  stampStar(g, 0, 0, 22, { fill: P.wine, edge: P.ember, points: 4, inner: 0.25, rot: 0 });
  g.fillStyle = P.ash;
  g.font = `700 11px ${FONT.slab}`;
  g.textAlign = 'center';
  g.fillText('N', 0, -30);
  g.restore();
  g.restore();
  stampBorder(g, 0, 0, W, H, { radius: 18, color: P.ember, stitch: P.tan, stitchAlpha: 0.35, corner: 5 });
}

/** The stamped "Enter the arcade" button (2x for retina). */
export const BUTTON = { W: 760, H: 128 };
export function drawButton(g) {
  const { W, H } = BUTTON;
  roundRectPath(g, 0, 0, W, H, 22);
  g.save();
  g.clip();
  const gr = g.createLinearGradient(0, 0, 0, H);
  gr.addColorStop(0, P.wine);
  gr.addColorStop(1, P.umber);
  g.fillStyle = gr;
  g.fillRect(0, 0, W, H);
  grain(g, 0, 0, W, H, { seed: 2, density: 6, colors: [P.tan, P.ink], alpha: 0.12 });
  g.restore();
  stampBorder(g, 0, 0, W, H, { radius: 22, color: P.red, stitch: P.tan, inset: 9, corner: 6, stitchAlpha: 0.55 });
  stampStar(g, 70, H / 2, 24, { fill: P.rose, edge: P.bone });
  g.fillStyle = P.bone;
  g.font = `44px ${FONT.title}`;
  g.textBaseline = 'middle';
  spacedText(g, 'Enter the Arcade', 124, H / 2 - 12, 1, 'left');
  g.fillStyle = P.tan;
  g.font = `600 20px ${FONT.slab}`;
  const tw = spacedText(g, 'ALL TEN BROWSER GAMES', 126, H / 2 + 26, 3.5, 'left');
  g.beginPath();
  g.moveTo(126 + tw + 14, H / 2 + 19);
  g.lineTo(126 + tw + 24, H / 2 + 26);
  g.lineTo(126 + tw + 14, H / 2 + 33);
  g.fill();
}
