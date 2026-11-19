import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * A box spanning [min, max] whose UVs are in world units / `tile`, so textures
 * keep a constant scale however big the box is.
 */
export function worldBox(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, tile = 4, tileV = tile): THREE.BufferGeometry {
  const w = maxX - minX, h = maxY - minY, d = maxZ - minZ;
  const g = new THREE.BoxGeometry(w, h, d);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  // Face order: +x, -x, +y, -y, +z, -z (4 verts each).
  const dims: Array<[number, number]> = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) {
    const [su, sv] = dims[f];
    const vScale = f === 2 || f === 3 ? tile : tileV;
    for (let k = 0; k < 4; k++) {
      const i = f * 4 + k;
      uv.setXY(i, (uv.getX(i) * su) / tile, (uv.getY(i) * sv) / vScale);
    }
  }
  g.translate(minX + w / 2, minY + h / 2, minZ + d / 2);
  return g;
}

/**
 * A six-sided prism from four ground corners ordered (minX,minZ) → (minX,maxZ)
 * → (maxX,maxZ) → (maxX,minZ), with independent top and bottom heights per
 * corner — used for ramps.
 */
export function prism(cx: number[], cz: number[], top: number[], bottom: number[], tile = 4): THREE.BufferGeometry {
  const pos: number[] = [];
  const uvs: number[] = [];
  const idx: number[] = [];
  const quad = (a: number[], b: number[], c: number[], d: number[], uvA: number[], uvB: number[], uvC: number[], uvD: number[]) => {
    const base = pos.length / 3;
    pos.push(...a, ...b, ...c, ...d);
    uvs.push(...uvA, ...uvB, ...uvC, ...uvD);
    idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };
  const T = (i: number) => [cx[i], top[i], cz[i]];
  const B = (i: number) => [cx[i], bottom[i], cz[i]];
  const uvTop = (i: number) => [cx[i] / tile, cz[i] / tile];
  // Top (normal up) and bottom (normal down).
  quad(T(0), T(1), T(2), T(3), uvTop(0), uvTop(1), uvTop(2), uvTop(3));
  quad(B(0), B(3), B(2), B(1), uvTop(0), uvTop(3), uvTop(2), uvTop(1));
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    const len = Math.hypot(cx[j] - cx[i], cz[j] - cz[i]) / tile;
    quad(B(i), B(j), T(j), T(i), [0, bottom[i] / tile], [len, bottom[j] / tile], [len, top[j] / tile], [0, top[i] / tile]);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Thin bar between two points on the XZ plane at height y. */
export function bar(x0: number, z0: number, x1: number, z1: number, y: number, w: number, h: number): THREE.BufferGeometry {
  const len = Math.hypot(x1 - x0, z1 - z0);
  const g = new THREE.BoxGeometry(w, h, len);
  g.rotateY(Math.atan2(x1 - x0, z1 - z0));
  g.translate((x0 + x1) / 2, y, (z0 + z1) / 2);
  return g;
}

/** Merges geometries (all must be indexed) and disposes the inputs. */
export function merge(list: THREE.BufferGeometry[]): THREE.BufferGeometry | null {
  if (list.length === 0) return null;
  for (const g of list) {
    if (!g.index) {
      const n = g.attributes.position.count;
      const ix: number[] = [];
      for (let i = 0; i < n; i++) ix.push(i);
      g.setIndex(ix);
    }
    if (g.attributes.normal === undefined) g.computeVertexNormals();
    for (const name of Object.keys(g.attributes)) if (name !== 'position' && name !== 'normal' && name !== 'uv') g.deleteAttribute(name);
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
  }
  const m = mergeGeometries(list, false);
  list.forEach((g) => g.dispose());
  return m;
}

/** Collects geometries per material key and builds one mesh per key. */
export class MeshBatcher {
  private readonly groups = new Map<THREE.Material, THREE.BufferGeometry[]>();

  add(mat: THREE.Material, g: THREE.BufferGeometry): void {
    let list = this.groups.get(mat);
    if (!list) {
      list = [];
      this.groups.set(mat, list);
    }
    list.push(g);
  }

  build(parent: THREE.Object3D, shadows: { cast: boolean; receive: boolean }): THREE.Mesh[] {
    const out: THREE.Mesh[] = [];
    this.groups.forEach((list, mat) => {
      const g = merge(list);
      if (!g) return;
      const mesh = new THREE.Mesh(g, mat);
      mesh.castShadow = shadows.cast;
      mesh.receiveShadow = shadows.receive;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      parent.add(mesh);
      out.push(mesh);
    });
    this.groups.clear();
    return out;
  }
}
