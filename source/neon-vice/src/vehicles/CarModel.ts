import * as THREE from 'three';
import { additive, createGlowTexture } from '../world/Materials';
import { mergeChildrenByMaterial } from '../world/batch';

export type CarStyle = 'sports' | 'sedan' | 'taxi';

export interface CarModel {
  group: THREE.Group;
  body: THREE.Group;
  wheels: THREE.Object3D[];
  frontPivots: THREE.Object3D[];
  tailMat: THREE.MeshBasicMaterial;
  headMat: THREE.MeshBasicMaterial;
  underglow: THREE.Mesh | null;
  length: number;
  width: number;
}

let shared: {
  wheel: THREE.CylinderGeometry;
  rim: THREE.CylinderGeometry;
  box: THREE.BoxGeometry;
  sportsBody: THREE.ExtrudeGeometry;
  sportsCabin: THREE.ExtrudeGeometry;
  tire: THREE.MeshStandardMaterial;
  rimMat: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  dark: THREE.MeshStandardMaterial;
  glow: THREE.Texture;
} | null = null;

const paintCache = new Map<number, THREE.MeshStandardMaterial>();

function extrudeProfile(points: Array<[number, number]>, width: number): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) shape.lineTo(points[i][0], points[i][1]);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    bevelEnabled: true,
    bevelSize: 0.05,
    bevelThickness: 0.05,
    bevelSegments: 1,
    curveSegments: 1,
  });
  geo.rotateY(-Math.PI / 2);
  geo.translate(width / 2, 0, 0);
  geo.computeVertexNormals();
  return geo;
}

function getShared() {
  if (shared) return shared;
  const wheel = new THREE.CylinderGeometry(0.37, 0.37, 0.3, 16);
  wheel.rotateZ(Math.PI / 2);
  const rim = new THREE.CylinderGeometry(0.22, 0.22, 0.32, 8);
  rim.rotateZ(Math.PI / 2);
  shared = {
    wheel,
    rim,
    box: new THREE.BoxGeometry(1, 1, 1),
    // Low wedge profile: long nose, short deck — a classic 80s supercar silhouette.
    sportsBody: extrudeProfile([
      [-2.25, 0.28], [2.3, 0.28], [2.38, 0.48], [2.2, 0.66], [0.9, 0.86], [-1.5, 0.96], [-2.2, 0.98], [-2.32, 0.7],
    ], 1.86),
    sportsCabin: extrudeProfile([
      [-1.45, 0.92], [0.85, 0.86], [0.05, 1.3], [-0.95, 1.32],
    ], 1.5),
    tire: new THREE.MeshStandardMaterial({ color: 0x0b0b10, roughness: 0.9 }),
    rimMat: new THREE.MeshStandardMaterial({ color: 0xc8c8d8, roughness: 0.25, metalness: 0.9 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x0a0c1c, roughness: 0.05, metalness: 0.6, envMapIntensity: 1.6 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x08080e, roughness: 0.6 }),
    glow: createGlowTexture(),
  };
  return shared;
}

function paint(color: number): THREE.MeshStandardMaterial {
  let m = paintCache.get(color);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness: 0.22, metalness: 0.55, envMapIntensity: 1.5 });
    paintCache.set(color, m);
  }
  return m;
}

function part(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, sx = 1, sy = 1, sz = 1): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  return m;
}

/** Builds a car facing +Z with its origin on the ground at the centre of the wheelbase. */
export function buildCarModel(style: CarStyle, color: number, accent: number, withUnderglow: boolean): CarModel {
  const s = getShared();
  const group = new THREE.Group();
  const body = new THREE.Group();
  group.add(body);
  const bodyMat = paint(color);
  const headMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff2d0).multiplyScalar(2.2), toneMapped: false });
  const tailMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff1030).multiplyScalar(1.4), toneMapped: false });

  let length: number, width: number, wheelZ: number, wheelX: number;
  if (style === 'sports') {
    length = 4.7; width = 1.96; wheelZ = 1.45; wheelX = 0.88;
    const shell = new THREE.Mesh(s.sportsBody, bodyMat);
    const cabin = new THREE.Mesh(s.sportsCabin, s.glass);
    body.add(shell, cabin);
    // Side intake stripe and rear spoiler.
    const stripeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accent).multiplyScalar(1.6), toneMapped: false });
    body.add(part(s.box, stripeMat, 0.99, 0.6, 0.2, 0.02, 0.05, 2.6));
    body.add(part(s.box, stripeMat, -0.99, 0.6, 0.2, 0.02, 0.05, 2.6));
    body.add(part(s.box, s.dark, 0, 1.12, -2.05, 1.8, 0.06, 0.38));
    body.add(part(s.box, s.dark, 0.7, 1.02, -2.05, 0.06, 0.16, 0.2));
    body.add(part(s.box, s.dark, -0.7, 1.02, -2.05, 0.06, 0.16, 0.2));
    // Pop-up style headlights and a full-width tail bar.
    body.add(part(s.box, headMat, 0.62, 0.6, 2.33, 0.42, 0.08, 0.06));
    body.add(part(s.box, headMat, -0.62, 0.6, 2.33, 0.42, 0.08, 0.06));
    body.add(part(s.box, tailMat, 0, 0.78, -2.33, 1.7, 0.09, 0.06));
  } else {
    length = 4.5; width = 1.9; wheelZ = 1.4; wheelX = 0.86;
    const isTaxi = style === 'taxi';
    const mat = paint(isTaxi ? 0xd9a21a : color);
    body.add(part(s.box, mat, 0, 0.66, 0, 1.86, 0.62, 4.4));
    body.add(part(s.box, s.glass, 0, 1.2, -0.25, 1.64, 0.5, 2.2));
    body.add(part(s.box, mat, 0, 1.47, -0.25, 1.66, 0.06, 2.0));
    body.add(part(s.box, headMat, 0.62, 0.72, 2.21, 0.38, 0.14, 0.04));
    body.add(part(s.box, headMat, -0.62, 0.72, 2.21, 0.38, 0.14, 0.04));
    body.add(part(s.box, tailMat, 0.68, 0.76, -2.21, 0.36, 0.12, 0.04));
    body.add(part(s.box, tailMat, -0.68, 0.76, -2.21, 0.36, 0.12, 0.04));
    if (isTaxi) {
      const signMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffe27a).multiplyScalar(1.5), toneMapped: false });
      body.add(part(s.box, signMat, 0, 1.62, -0.25, 0.7, 0.22, 0.3));
    }
  }

  mergeChildrenByMaterial(body);
  const wheels: THREE.Object3D[] = [];
  const frontPivots: THREE.Object3D[] = [];
  for (const [x, z] of [[wheelX, wheelZ], [-wheelX, wheelZ], [wheelX, -wheelZ], [-wheelX, -wheelZ]] as const) {
    const pivot = new THREE.Object3D();
    pivot.position.set(x, 0.37, z);
    const spin = new THREE.Object3D();
    spin.add(new THREE.Mesh(s.wheel, s.tire));
    spin.add(new THREE.Mesh(s.rim, s.rimMat));
    pivot.add(spin);
    group.add(pivot);
    wheels.push(spin);
    if (z > 0) frontPivots.push(pivot);
  }

  let underglow: THREE.Mesh | null = null;
  if (withUnderglow) {
    underglow = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 6.2), additive(accent, s.glow, 0.9));
    underglow.rotation.x = -Math.PI / 2;
    underglow.position.y = 0.04;
    underglow.renderOrder = 2;
    group.add(underglow);
  }

  group.traverse((o) => {
    if (o instanceof THREE.Mesh && o !== underglow) {
      o.castShadow = true;
    }
  });
  return { group, body, wheels, frontPivots, tailMat, headMat, underglow, length, width };
}
