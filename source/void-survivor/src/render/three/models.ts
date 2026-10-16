// Geometry for every model, built from primitives. Unit scale (multiplied by the sim radius), forward = +X, up = +Y.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** Normalise a primitive so geometries can be merged: non-indexed, position + normal only. */
function prep(g: THREE.BufferGeometry): THREE.BufferGeometry {
  const n = g.index ? g.toNonIndexed() : g;
  if (n !== g) g.dispose();
  for (const name of Object.keys(n.attributes)) if (name !== 'position' && name !== 'normal') n.deleteAttribute(name);
  return n;
}

function merge(parts: THREE.BufferGeometry[], flat = false): THREE.BufferGeometry {
  const ready = parts.map(prep);
  const m = mergeGeometries(ready, false);
  ready.forEach((g) => g.dispose());
  if (!m) throw new Error('Could not merge model geometry.');
  if (flat) m.computeVertexNormals();
  m.computeBoundingSphere();
  return m;
}

function cone(r: number, h: number, seg: number): THREE.ConeGeometry {
  return new THREE.ConeGeometry(r, h, seg);
}

/** A spike pointing along +X whose base sits at distance `at` from the origin. */
function spike(r: number, len: number, at: number, yaw: number, pitch = 0): THREE.BufferGeometry {
  const c = cone(r, len, 5);
  c.rotateZ(-Math.PI / 2);
  c.translate(at + len / 2, 0, 0);
  if (pitch) c.rotateZ(pitch);
  c.rotateY(yaw);
  return c;
}

function extrude(points: [number, number][], depth: number, bevel = 0.08): THREE.BufferGeometry {
  const s = new THREE.Shape();
  points.forEach(([x, y], i) => (i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)));
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 1, curveSegments: 4 });
  g.rotateX(-Math.PI / 2);
  return g;
}

export interface Models {
  [k: string]: THREE.BufferGeometry;
}

export function buildModels(): Models {
  const M: Models = {};

  // --- Drifter: spiked octahedral drone
  {
    const parts: THREE.BufferGeometry[] = [new THREE.OctahedronGeometry(0.72, 0)];
    for (let i = 0; i < 5; i++) parts.push(spike(0.16, 0.7, 0.5, (i / 5) * Math.PI * 2 + 0.3));
    const top = cone(0.13, 0.5, 5);
    top.translate(0, 0.8, 0);
    parts.push(top);
    M.drifter = merge(parts, true);
    const eye = new THREE.TorusGeometry(0.52, 0.07, 6, 24);
    eye.rotateX(Math.PI / 2);
    M.drifterEye = merge([eye]);
  }

  // --- Spitter: three-legged walker; the head is a separate turret
  {
    const parts: THREE.BufferGeometry[] = [];
    const hip = new THREE.CylinderGeometry(0.5, 0.66, 0.42, 8);
    hip.translate(0, 0.95, 0);
    parts.push(hip);
    for (let i = 0; i < 3; i++) {
      const yaw = (i / 3) * Math.PI * 2 + Math.PI / 3;
      const thigh = new THREE.BoxGeometry(0.75, 0.14, 0.16);
      thigh.rotateZ(-0.55);
      thigh.translate(0.6, 0.78, 0);
      thigh.rotateY(yaw);
      const shin = new THREE.BoxGeometry(0.13, 0.78, 0.13);
      shin.translate(0.93, 0.36, 0);
      shin.rotateY(yaw);
      const foot = new THREE.BoxGeometry(0.3, 0.07, 0.24);
      foot.translate(1.0, 0.03, 0);
      foot.rotateY(yaw);
      parts.push(thigh, shin, foot);
    }
    M.spitterBody = merge(parts, true);
    const head = new THREE.BoxGeometry(0.78, 0.4, 0.66);
    head.translate(-0.05, 1.38, 0);
    const brow = new THREE.BoxGeometry(0.4, 0.12, 0.7);
    brow.translate(0.12, 1.62, 0);
    const barrel = new THREE.CylinderGeometry(0.09, 0.12, 0.8, 8);
    barrel.rotateZ(-Math.PI / 2);
    barrel.translate(0.66, 1.36, 0);
    M.spitterHead = merge([head, brow, barrel], true);
    M.spitterMuzzle = merge([new THREE.SphereGeometry(1, 10, 8)]);
  }

  // --- Rammer: armoured wedge with a horn
  {
    const body = extrude(
      [
        [1.35, 0],
        [0.15, 0.86],
        [-0.92, 0.76],
        [-1.05, 0],
        [-0.92, -0.76],
        [0.15, -0.86],
      ],
      0.62,
      0.12,
    );
    body.translate(0, 0.1, 0);
    const ridge = new THREE.BoxGeometry(1.3, 0.2, 0.42);
    ridge.translate(-0.15, 0.9, 0);
    const horn = cone(0.2, 0.8, 6);
    horn.rotateZ(-Math.PI / 2);
    horn.translate(1.62, 0.45, 0);
    const shoulderL = new THREE.BoxGeometry(0.6, 0.3, 0.25);
    shoulderL.translate(-0.4, 0.7, 0.62);
    const shoulderR = shoulderL.clone();
    shoulderR.translate(0, 0, -1.24);
    M.rammer = merge([body, ridge, horn, shoulderL, shoulderR], true);
    const eye = new THREE.BoxGeometry(0.1, 0.12, 0.95);
    eye.translate(0.86, 0.6, 0);
    M.rammerEye = merge([eye]);
  }

  // --- Cleaver: cracked crystal shell (four shards with gaps) around a glowing core
  {
    const ico = new THREE.IcosahedronGeometry(1, 0);
    const pos = ico.getAttribute('position') as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let t = 0; t < arr.length; t += 9) {
      const cx = (arr[t] + arr[t + 3] + arr[t + 6]) / 3;
      const cz = (arr[t + 2] + arr[t + 5] + arr[t + 8]) / 3;
      const cy = (arr[t + 1] + arr[t + 4] + arr[t + 7]) / 3;
      const gx = cx >= 0 ? 1 : -1;
      const gz = cz >= 0 ? 1 : -1;
      const ox = gx * 0.09;
      const oz = gz * 0.09;
      const oy = cy * 0.05;
      for (let v = 0; v < 3; v++) {
        arr[t + v * 3] += ox;
        arr[t + v * 3 + 1] += oy;
        arr[t + v * 3 + 2] += oz;
      }
    }
    ico.scale(1, 1.15, 1);
    M.cleaver = merge([ico], true);
    M.cleaverCore = merge([new THREE.IcosahedronGeometry(0.66, 0)], true);
  }

  // --- Splitlet: small elongated crystal
  {
    const g = new THREE.OctahedronGeometry(1, 0);
    g.scale(0.7, 1.35, 0.7);
    M.splitlet = merge([g], true);
  }

  // --- Aegis: domed disc; the shield plate is its own model
  {
    const disc = new THREE.CylinderGeometry(1, 1.08, 0.42, 20);
    disc.translate(0, 0.26, 0);
    const dome = new THREE.SphereGeometry(0.62, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    dome.translate(0, 0.46, 0);
    const fin = new THREE.BoxGeometry(0.5, 0.2, 0.1);
    fin.translate(0.6, 0.55, 0);
    M.aegis = merge([disc, dome, fin]);
    const rim = new THREE.TorusGeometry(1.03, 0.055, 6, 32);
    rim.rotateX(Math.PI / 2);
    rim.translate(0, 0.32, 0);
    M.aegisRim = merge([rim]);
    // shield plate: arc of +-50 deg centred on +X (cylinder theta=PI/2 is +X)
    const half = (50 * Math.PI) / 180;
    const plate = new THREE.CylinderGeometry(1, 1, 1, 16, 1, true, Math.PI / 2 - half, half * 2);
    plate.translate(0, 0.55, 0);
    M.shieldPlate = plate; // keeps uv/index; not merged
    const frame = new THREE.TorusGeometry(1, 0.035, 4, 16, half * 2);
    frame.rotateX(Math.PI / 2);
    frame.rotateY(half);
    const top = frame.clone();
    top.translate(0, 1.05, 0);
    frame.translate(0, 0.05, 0);
    M.shieldFrame = merge([frame, top]);
  }

  // --- Voidcaster: hovering spiked star
  {
    const parts: THREE.BufferGeometry[] = [new THREE.IcosahedronGeometry(0.55, 1)];
    for (let i = 0; i < 8; i++) parts.push(spike(0.12, 0.72, 0.42, (i / 8) * Math.PI * 2));
    for (let i = 0; i < 4; i++) {
      parts.push(spike(0.1, 0.5, 0.4, (i / 4) * Math.PI * 2 + Math.PI / 4, 0.75));
      parts.push(spike(0.1, 0.5, 0.4, (i / 4) * Math.PI * 2 + Math.PI / 4, -0.75));
    }
    M.caster = merge(parts, true);
    M.casterCore = merge([new THREE.IcosahedronGeometry(0.45, 1)]);
  }

  // --- Core Warden: hull, armour petals, crown ring, nodes, core
  {
    const hull = new THREE.CylinderGeometry(0.92, 1.05, 0.5, 8);
    hull.translate(0, 0.25, 0);
    const deck = new THREE.CylinderGeometry(0.58, 0.85, 0.32, 8);
    deck.translate(0, 0.66, 0);
    const mast = new THREE.CylinderGeometry(0.16, 0.24, 0.5, 8);
    mast.translate(0, 0.95, 0);
    M.wardenHull = merge([hull, deck, mast], true);
    const petal = new THREE.BoxGeometry(0.42, 0.36, 0.62);
    petal.translate(0, 0.3, 0);
    const lip = new THREE.BoxGeometry(0.1, 0.12, 0.66);
    lip.translate(0.2, 0.52, 0);
    M.wardenPetal = merge([petal, lip], true);
    const crown = new THREE.TorusGeometry(0.75, 0.06, 6, 8);
    crown.rotateX(Math.PI / 2);
    M.wardenCrown = merge([crown]);
    M.wardenNode = merge([new THREE.IcosahedronGeometry(1, 0)], true);
    M.wardenCore = merge([new THREE.IcosahedronGeometry(1, 1)]);
  }

  // --- Wick, the player's Mote Drone
  {
    const hull = extrude(
      [
        [1.3, 0],
        [-0.9, 0.95],
        [-0.5, 0],
        [-0.9, -0.95],
      ],
      0.26,
      0.08,
    );
    hull.translate(0, 0.1, 0);
    const spine = new THREE.BoxGeometry(1.2, 0.16, 0.22);
    spine.translate(0.05, 0.4, 0);
    const podL = new THREE.CylinderGeometry(0.16, 0.2, 0.6, 10);
    podL.rotateZ(Math.PI / 2);
    podL.translate(-0.55, 0.26, 0.48);
    const podR = podL.clone();
    podR.translate(0, 0, -0.96);
    M.wick = merge([hull, spine, podL, podR]);
    const canopy = new THREE.SphereGeometry(0.3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    canopy.scale(1.5, 0.9, 1);
    canopy.translate(0.2, 0.42, 0);
    M.wickCanopy = merge([canopy]);
    const exL = new THREE.SphereGeometry(0.15, 10, 8);
    exL.translate(-0.88, 0.26, 0.48);
    const exR = exL.clone();
    exR.translate(0, 0, -0.96);
    const nose = new THREE.SphereGeometry(0.09, 8, 6);
    nose.translate(1.2, 0.28, 0);
    M.wickGlow = merge([exL, exR, nose]);
  }

  // --- Pickups
  {
    const mote = new THREE.OctahedronGeometry(1, 0);
    mote.scale(0.7, 1.15, 0.7);
    M.mote = merge([mote], true);
    const body = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 6);
    const tip = cone(0.5, 0.55, 6);
    tip.translate(0, 0.675, 0);
    const base = cone(0.5, 0.4, 6);
    base.rotateX(Math.PI);
    base.translate(0, -0.6, 0);
    M.shard = merge([body, tip, base], true);
    const box = new THREE.BoxGeometry(1.6, 0.9, 1.1);
    box.translate(0, 0.45, 0);
    const lid = new THREE.BoxGeometry(1.7, 0.25, 1.2);
    lid.translate(0, 1.0, 0);
    const bandA = new THREE.BoxGeometry(0.14, 1.2, 1.18);
    bandA.translate(-0.55, 0.6, 0);
    const bandB = bandA.clone();
    bandB.translate(1.1, 0, 0);
    M.chest = merge([box, lid, bandA, bandB], true);
    const seam = new THREE.BoxGeometry(1.62, 0.06, 1.12);
    seam.translate(0, 0.88, 0);
    M.chestSeam = merge([seam]);
  }

  // --- Combat
  M.ball = merge([new THREE.SphereGeometry(1, 12, 8)]);
  M.ballLow = merge([new THREE.SphereGeometry(1, 8, 6)]);
  {
    const blade = new THREE.OctahedronGeometry(1, 0);
    blade.scale(1.25, 0.22, 0.42);
    M.blade = merge([blade], true);
  }
  M.debris = merge([new THREE.TetrahedronGeometry(1, 0)], true);
  M.box = merge([new THREE.BoxGeometry(1, 1, 1)]);

  return M;
}

/** Flat quad on the floor (XZ), centred, size 2x2 so scale = radius. UV kept for textures. */
export function floorQuad(): THREE.PlaneGeometry {
  const g = new THREE.PlaneGeometry(2, 2);
  g.rotateX(-Math.PI / 2);
  return g;
}

/** Flat ribbon on the floor running from x=0 to x=1, width 1 (z -0.5..0.5). */
export function ribbon(): THREE.PlaneGeometry {
  const g = new THREE.PlaneGeometry(1, 1);
  g.rotateX(-Math.PI / 2);
  g.translate(0.5, 0, 0);
  return g;
}

export function hemisphere(): THREE.SphereGeometry {
  return new THREE.SphereGeometry(1, 48, 14, 0, Math.PI * 2, 0, Math.PI / 2);
}
