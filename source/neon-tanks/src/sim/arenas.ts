import { ArenaBuilder } from './arenaKit.ts';
import type { ArenaDef, ArenaId, PickupSpawn, SpawnPoint } from './types.ts';

const H = Math.PI / 2;

/**
 * NEON DOCKS — a container port at night. A raised central pier deck (the
 * control point) is reached by side ramps and two bridges that drop from long
 * elevated walkways; container yards fill the quadrants and alleys behind the
 * walkways give flank routes. Rotationally symmetric for fair team play.
 */
function buildDocks(): ArenaDef {
  const b = new ArenaBuilder();
  const half = 72;
  b.boundary(half, 6);

  // Central pier deck with pinwheel container cover.
  b.block(0, 0, 24, 24, 3, 'deck', { trim: 'cyan' });
  b.mirror((s) => {
    b.ramp(-26 * s, 0, 'x', s, 14, 10, 0, 3, 'deck');
    b.container(-7 * s, 8.5 * s, false, 1, 'containerCyan', 3);
    b.container(8.5 * s, 7 * s, true, 1, 'containerMagenta', 3);

    // Elevated walkway with ramps at both ends and a bridge down to the deck.
    b.block(0, 44 * s, 60, 8, 5.5, 'metal', { trim: s === 1 ? 'magenta' : 'cyan' });
    b.ramp(-46 * s, 44 * s, 'x', s, 16, 8, 0, 5.5, 'metal');
    b.ramp(46 * s, 44 * s, 'x', s === 1 ? -1 : 1, 16, 8, 0, 5.5, 'metal');
    b.rail(-30, 47.6 * s, 30, 48 * s, 5.5);
    b.rail(-30 * s, 40 * s, -12 * s, 40.4 * s, 5.5);
    b.rail(12 * s, 40 * s, 30 * s, 40.4 * s, 5.5);
    b.ramp(0, 12 * s, 'z', s, 28, 8, 3, 5.5, 'metal', { bridge: true });
    b.block(5.3, 26 * s, 0.9, 0.9, 4.3, 'darkMetal', { walkable: false });
    b.block(-5.3, 26 * s, 0.9, 0.9, 4.3, 'darkMetal', { walkable: false });

    // Container yard (NW → SE).
    b.container(-52 * s, 22 * s, true, 2, 'containerCyan');
    b.container(-40 * s, 31 * s, false, 1, 'containerMagenta');
    b.container(-34 * s, 18 * s, true, 1, 'containerSteel');
    b.container(-22 * s, 29 * s, false, 2, 'containerAmber');
    b.container(-20 * s, 18 * s, false, 1, 'containerCyan');
    // Container yard (NE → SW).
    b.container(24 * s, 20 * s, true, 1, 'containerMagenta');
    b.container(36 * s, 28 * s, false, 2, 'containerSteel');
    b.container(50 * s, 18 * s, false, 1, 'containerAmber');
    b.container(52 * s, 30 * s, true, 1, 'containerCyan');
    // Back alley behind the walkway.
    b.container(-15 * s, 60 * s, false, 1, 'containerSteel');
    b.container(14 * s, 62 * s, false, 2, 'containerMagenta');
    b.container(-40 * s, 63 * s, true, 1, 'containerAmber');

    // Crane legs (the gantry itself is decor overhead).
    b.block(-62 * s, 30 * s, 1.6, 1.6, 16, 'darkMetal', { walkable: false });
    b.block(-62 * s, -30 * s, 1.6, 1.6, 16, 'darkMetal', { walkable: false });

    // Jersey barriers for hull-down cover.
    b.block(-34 * s, 8 * s, 1, 4.5, 1.3, 'concrete', { trim: 'amber' });
    b.block(-34 * s, -8 * s, 1, 4.5, 1.3, 'concrete', { trim: 'amber' });
    b.block(-54 * s, 9 * s, 1, 4.5, 1.3, 'concrete', { trim: 'amber' });
    b.block(-54 * s, -9 * s, 1, 4.5, 1.3, 'concrete', { trim: 'amber' });
    b.block(11 * s, 33 * s, 4.5, 1, 1.3, 'concrete', { trim: 'amber' });
    b.block(-11 * s, 33 * s, 4.5, 1, 1.3, 'concrete', { trim: 'amber' });
  });

  // Dressing.
  b.decor.push({ kind: 'water', y: -1.4 });
  b.mirror((s) => {
    b.decor.push({ kind: 'crane', x: -62 * s, z: 0, yaw: 0, h: 16 });
    b.decor.push({ kind: 'sign', x: 0, y: 2.8, z: 39.9 * s, yaw: s === 1 ? Math.PI : 0, w: 12, h: 2.2, text: s === 1 ? 'DOCK 07' : 'DOCK 12', color: s === 1 ? 'magenta' : 'cyan' });
    b.decor.push({ kind: 'sign', x: -38 * s, y: 4.2, z: 31 * s - 1.3 * s, yaw: s === 1 ? Math.PI : 0, w: 5, h: 1.2, text: 'KAIRO FREIGHT', color: 'amber' });
    b.decor.push({ kind: 'strip', x0: -30, z0: 40.1 * s, x1: 30, z1: 40.1 * s, y: 5.45, color: s === 1 ? 'magenta' : 'cyan' });
    b.decor.push({ kind: 'strip', x0: -12, z0: 12.05 * s, x1: 12, z1: 12.05 * s, y: 2.95, color: 'cyan' });
    b.decor.push({ kind: 'light', x: 0, y: 9, z: 44 * s, color: s === 1 ? 'magenta' : 'cyan', intensity: 30, range: 34 });
    b.decor.push({ kind: 'light', x: -46 * s, y: 7, z: -2 * s, color: s === 1 ? 'cyan' : 'magenta', intensity: 24, range: 30 });
    b.decor.push({ kind: 'pylon', x: -66 * s, z: 66 * s, h: 12, color: 'cyan' });
    b.decor.push({ kind: 'pylon', x: 66 * s, z: 66 * s, h: 12, color: 'magenta' });
    b.decor.push({ kind: 'pylon', x: 0, z: 68 * s, h: 9, color: s === 1 ? 'magenta' : 'cyan' });
  });
  b.decor.push({ kind: 'holo', x: 0, y: 3, z: 0, r: 8, color: 'cyan' });
  b.decor.push({ kind: 'light', x: 0, y: 10, z: 0, color: 'cyan', intensity: 40, range: 30 });

  const blue: SpawnPoint[] = [-18, -6, 6, 18].map((z) => ({ x: -59, y: 0, z, yaw: H }));
  const magenta: SpawnPoint[] = blue.map((p) => ({ x: -p.x, y: 0, z: -p.z, yaw: -H }));
  const ffa: SpawnPoint[] = [
    { x: -59, y: 0, z: -15, yaw: H }, { x: -59, y: 0, z: 15, yaw: H },
    { x: 59, y: 0, z: 15, yaw: -H }, { x: 59, y: 0, z: -15, yaw: -H },
    { x: 0, y: 0, z: 56, yaw: Math.PI }, { x: 0, y: 0, z: -56, yaw: 0 },
    { x: -56, y: 0, z: 58, yaw: Math.PI * 0.75 }, { x: 56, y: 0, z: -58, yaw: -Math.PI * 0.25 },
    { x: 40, y: 0, z: 0, yaw: -H }, { x: -40, y: 0, z: 0, yaw: H },
  ];
  const pickups: PickupSpawn[] = [
    { kind: 'repair', x: 0, y: 0, z: 30 }, { kind: 'repair', x: 0, y: 0, z: -30 },
    { kind: 'overdrive', x: 0, y: 5.5, z: 44 }, { kind: 'overdrive', x: 0, y: 5.5, z: -44 },
    { kind: 'nitro', x: -44, y: 0, z: 0 }, { kind: 'nitro', x: 44, y: 0, z: 0 },
  ];

  return {
    id: 'docks',
    name: 'NEON DOCKS',
    subtitle: 'Container port · elevated walkways · central pier',
    half,
    boxes: b.boxes,
    ramps: b.ramps,
    spawns: { blue, magenta, ffa },
    controlPoint: { x: 0, y: 3, z: 0, r: 8 },
    pickups,
    decor: b.decor,
    fog: { color: 0x0a1424, density: 0.0115 },
    sky: { top: 0x02040c, bottom: 0x10203a },
  };
}

/**
 * VOID COMPLEX — a research facility. A two-level central core (the control
 * point ring around a reactor) is reached by four offset ramps and two long
 * bridges from elevated galleries; lab blocks create narrow passages and
 * see-through energy barriers stop tanks but not shots.
 */
function buildVoid(): ArenaDef {
  const b = new ArenaBuilder();
  const half = 66;
  b.boundary(half, 7);

  // Core: deck at 4 m with a reactor column in the middle.
  b.block(0, 0, 30, 30, 4, 'lab', { trim: 'magenta' });
  b.block(0, 0, 6, 6, 5.5, 'labDark', { walkable: false, trim: 'cyan' }, 4);
  b.mirror((s) => {
    // Offset core ramps (west/east along X, south/north along Z).
    b.ramp(-27 * s, 6 * s, 'x', s, 12, 9, 0, 4, 'lab');
    b.ramp(-6 * s, -27 * s, 'z', s, 12, 9, 0, 4, 'lab');
    // Corner cover rails on the north/south deck edges.
    b.rail(-15 * s, 14.6 * s, -10 * s, 15 * s, 4, 1.3);
    b.rail(10 * s, 14.6 * s, 15 * s, 15 * s, 4, 1.3);
    // Deck cover blocks.
    b.block(-9 * s, 11 * s, 3, 2, 1.7, 'labDark', { trim: 'cyan' }, 4);
    b.block(11 * s, 9 * s, 2, 3, 1.7, 'labDark', { trim: 'magenta' }, 4);

    // Side galleries against the boundary, 6 m up, ramps at both ends.
    b.block(-58 * s, 0, 16, 44, 6, 'lab', { trim: 'cyan' });
    b.ramp(-60 * s, -36 * s, 'z', s, 14, 12, 0, 6, 'lab');
    b.ramp(-60 * s, 36 * s, 'z', s === 1 ? -1 : 1, 14, 12, 0, 6, 'lab');
    b.rail(-50 * s, -22 * s, -49.6 * s, -14 * s, 6);
    b.rail(-50 * s, 14 * s, -49.6 * s, 22 * s, 6);
    // Bridge from the gallery to the core's west edge.
    b.ramp(-15 * s, -9.5 * s, 'x', s === 1 ? -1 : 1, 35, 6.5, 4, 6, 'metal', { bridge: true });
    b.block(-32 * s, -13.6 * s, 1, 1, 4.6, 'darkMetal', { walkable: false });
    b.block(-32 * s, -5.4 * s, 1, 1, 4.6, 'darkMetal', { walkable: false });

    // Lab blocks (not drivable) forming the spawn approaches.
    b.block(-30 * s, -44 * s, 18, 14, 8, 'labDark', { walkable: false, trim: 'magenta' });
    b.block(30 * s, -44 * s, 18, 14, 8, 'labDark', { walkable: false, trim: 'cyan' });

    // Energy barriers: stop tanks, let shots through.
    b.block(-42.5 * s, -44 * s, 7, 0.4, 3.2, 'barrier', { walkable: false, blocksShots: false });
    b.block(0, -34 * s, 12, 0.4, 3.2, 'barrier', { walkable: false, blocksShots: false });

    // Ground cover.
    b.block(-22 * s, 22 * s, 2.5, 2.5, 7, 'labDark', { walkable: false, trim: 'cyan' });
    b.block(22 * s, 22 * s, 2.5, 2.5, 7, 'labDark', { walkable: false, trim: 'magenta' });
    b.block(-38 * s, 0, 1.2, 6, 1.4, 'concrete', { trim: 'amber' });
    b.block(0, -49 * s, 8, 1, 1.4, 'concrete', { trim: 'amber' });
    b.block(-14 * s, -30 * s, 1, 4, 1.4, 'concrete', { trim: 'amber' });
  });

  b.mirror((s) => {
    b.decor.push({ kind: 'sign', x: -30 * s, y: 5.6, z: -37 * s + 0.05 * s, yaw: s === 1 ? 0 : Math.PI, w: 9, h: 1.8, text: s === 1 ? 'LAB 03 · VOID' : 'LAB 09 · VOID', color: s === 1 ? 'magenta' : 'cyan' });
    b.decor.push({ kind: 'sign', x: 30 * s, y: 5.6, z: -37 * s + 0.05 * s, yaw: s === 1 ? 0 : Math.PI, w: 9, h: 1.8, text: 'CONTAINMENT', color: s === 1 ? 'cyan' : 'magenta' });
    b.decor.push({ kind: 'strip', x0: -15, z0: -15.05 * s, x1: 15, z1: -15.05 * s, y: 3.95, color: 'magenta' });
    b.decor.push({ kind: 'strip', x0: -50 * s, z0: -22, x1: -50 * s, z1: 22, y: 5.95, color: 'cyan' });
    b.decor.push({ kind: 'strip', x0: -21, z0: -30 * s, x1: 21, z1: -30 * s, y: 0.03, color: s === 1 ? 'cyan' : 'magenta', w: 0.5 });
    b.decor.push({ kind: 'strip', x0: -44 * s, z0: -26, x1: -44 * s, z1: 26, y: 0.03, color: 'cyan', w: 0.5 });
    b.decor.push({ kind: 'light', x: -58 * s, y: 11, z: 0, color: s === 1 ? 'cyan' : 'magenta', intensity: 28, range: 34 });
    b.decor.push({ kind: 'light', x: 0, y: 8, z: -42 * s, color: s === 1 ? 'cyan' : 'magenta', intensity: 22, range: 26 });
    b.decor.push({ kind: 'pylon', x: -62 * s, z: -62 * s, h: 11, color: 'magenta' });
    b.decor.push({ kind: 'pylon', x: 62 * s, z: -62 * s, h: 11, color: 'cyan' });
  });
  b.decor.push({ kind: 'holo', x: 0, y: 9.6, z: 0, r: 4, color: 'magenta' });
  b.decor.push({ kind: 'light', x: 0, y: 13, z: 0, color: 'magenta', intensity: 46, range: 36 });

  const blue: SpawnPoint[] = [-12, -4, 4, 12].map((x) => ({ x, y: 0, z: -55, yaw: 0 }));
  const magenta: SpawnPoint[] = blue.map((p) => ({ x: -p.x, y: 0, z: 58, yaw: Math.PI }));
  const ffa: SpawnPoint[] = [
    { x: -10, y: 0, z: -55, yaw: 0 }, { x: 10, y: 0, z: 55, yaw: Math.PI },
    { x: 10, y: 0, z: -55, yaw: 0 }, { x: -10, y: 0, z: 55, yaw: Math.PI },
    { x: -42, y: 0, z: -56, yaw: H }, { x: 42, y: 0, z: 56, yaw: -H },
    { x: -40, y: 0, z: 24, yaw: H }, { x: 40, y: 0, z: -24, yaw: -H },
    { x: -30, y: 0, z: -20, yaw: H }, { x: 30, y: 0, z: 20, yaw: -H },
  ];
  const pickups: PickupSpawn[] = [
    { kind: 'repair', x: -36, y: 0, z: 14 }, { kind: 'repair', x: 36, y: 0, z: -14 },
    { kind: 'overdrive', x: -58, y: 6, z: 0 }, { kind: 'overdrive', x: 58, y: 6, z: 0 },
    { kind: 'nitro', x: 0, y: 0, z: -30 }, { kind: 'nitro', x: 0, y: 0, z: 30 },
  ];

  return {
    id: 'void',
    name: 'VOID COMPLEX',
    subtitle: 'Research facility · reactor core · energy barriers',
    half,
    boxes: b.boxes,
    ramps: b.ramps,
    spawns: { blue, magenta, ffa },
    controlPoint: { x: 0, y: 4, z: 0, r: 11 },
    pickups,
    decor: b.decor,
    fog: { color: 0x120a22, density: 0.012 },
    sky: { top: 0x05020c, bottom: 0x24103a },
  };
}

const cache = new Map<ArenaId, ArenaDef>();

export function getArena(id: ArenaId): ArenaDef {
  let a = cache.get(id);
  if (!a) {
    a = id === 'docks' ? buildDocks() : buildVoid();
    cache.set(id, a);
  }
  return a;
}

export const ARENA_IDS: ArenaId[] = ['docks', 'void'];
export const ARENA_INFO: Record<ArenaId, { name: string; subtitle: string }> = {
  docks: { name: 'NEON DOCKS', subtitle: 'Container port · elevated walkways · central pier' },
  void: { name: 'VOID COMPLEX', subtitle: 'Research facility · reactor core · energy barriers' },
};
