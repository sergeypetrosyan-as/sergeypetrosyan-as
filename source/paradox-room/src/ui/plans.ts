// Miniature floor plans for the chapter sheet, drawn from the real level data as inline SVG.
// Solid cells are poché (hatched graphite), the open plan is film, objects are small plan symbols.
import type { Level } from '../core/types.ts';

export const PLAN_DEFS = `<svg id="plan-defs" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<pattern id="poche-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
<rect width="3" height="3" fill="#23272c"/><line x1="0" y1="0" x2="0" y2="3" stroke="#5d646b" stroke-width="0.9"/></pattern>
</defs></svg>`;

const C = 6; // svg units per cell

/** Rooms shown on the sheet: the start room and rooms joined to it by visible (non-secret) portals. */
function visibleRooms(level: Level): number[] {
  const out = [level.start.room];
  for (const o of level.objs) {
    if (o.kind !== 'portal' || o.secret || o.pair === undefined) continue;
    const r = level.objs[o.pair].room;
    if (!out.includes(r)) out.push(r);
  }
  return out.slice(0, 2);
}

function sliceFor(level: Level, ri: number): number {
  const r = level.rooms[ri];
  if (ri === level.start.room) return level.start.z;
  let best = 0;
  let bestN = -1;
  for (let z = 0; z < r.d; z++) {
    let n = 0;
    for (let y = 0; y < r.h; y++) for (let x = 0; x < r.w; x++) if (!r.solid[x + r.w * (y + r.h * z)]) n++;
    if (n > bestN) {
      bestN = n;
      best = z;
    }
  }
  return best;
}

export function planSvg(level: Level, locked: boolean): string {
  const rooms = visibleRooms(level);
  let ox = 0;
  let body = '';
  let H = 0;
  for (const ri of rooms) {
    const r = level.rooms[ri];
    const z = sliceFor(level, ri);
    let solid = '';
    for (let y = 0; y < r.h; y++)
      for (let x = 0; x < r.w; x++) if (r.solid[x + r.w * (y + r.h * z)]) solid += `M${ox + x * C} ${y * C}h${C}v${C}h-${C}z`;
    body += `<path d="${solid}" fill="url(#poche-hatch)"/>`;
    body += `<rect x="${ox}" y="0" width="${r.w * C}" height="${r.h * C}" fill="none" stroke="#23272c" stroke-width="0.8" ${locked ? 'stroke-dasharray="2 2"' : ''}/>`;
    if (!locked) {
      for (const o of level.objs) {
        if (o.room !== ri || o.z !== z) continue;
        const cx = ox + o.x * C + C / 2;
        const cy = o.y * C + C / 2;
        switch (o.kind) {
          case 'crystal':
            body += `<path d="M${cx} ${cy - 2.4}l2 2.4l-2 2.4l-2-2.4z" fill="#c39645"/>`;
            break;
          case 'exit':
            body += `<circle cx="${cx}" cy="${cy}" r="2.4" fill="none" stroke="#8a6a2c" stroke-width="0.8"/><circle cx="${cx}" cy="${cy}" r="1.2" fill="none" stroke="#8a6a2c" stroke-width="0.6"/>`;
            break;
          case 'portal':
            if (!o.secret) body += `<circle cx="${cx}" cy="${cy}" r="2.2" fill="none" stroke="#6a5bd6" stroke-width="0.9"/>`;
            break;
          case 'door':
            body += `<rect x="${cx - 3}" y="${cy - 1}" width="6" height="2" fill="#23272c"/>`;
            break;
          case 'lever':
            body += `<path d="M${cx - 1.8} ${cy + 1.8}L${cx + 1.8} ${cy - 1.8}" stroke="#23272c" stroke-width="0.9"/>`;
            break;
          case 'switch':
          case 'plate':
            body += `<rect x="${cx - 1.6}" y="${cy - 1.6}" width="3.2" height="3.2" fill="none" stroke="#23272c" stroke-width="0.7"/>`;
            break;
          default:
            break;
        }
      }
      if (ri === level.start.room) body += `<circle cx="${ox + level.start.x * C + C / 2}" cy="${level.start.y * C + C / 2}" r="1.5" fill="#23272c"/>`;
    }
    ox += r.w * C + C;
    H = Math.max(H, r.h * C);
  }
  const W = ox - C;
  return `<svg viewBox="-1 -1 ${W + 2} ${H + 2}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" focusable="false"${locked ? ' opacity="0.45"' : ''}>${body}</svg>`;
}
