import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const KEEP = ['position', 'normal', 'uv'];

function normalise(geo: THREE.BufferGeometry, matrix: THREE.Matrix4): THREE.BufferGeometry {
  const g = (geo.index ? geo.toNonIndexed() : geo.clone()) as THREE.BufferGeometry;
  for (const name of Object.keys(g.attributes)) if (!KEEP.includes(name)) g.deleteAttribute(name);
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
  if (!g.attributes.normal) g.computeVertexNormals();
  g.applyMatrix4(matrix);
  return g;
}

function isPlainMesh(o: THREE.Object3D): o is THREE.Mesh {
  return (o as THREE.Mesh).isMesh === true && !(o as THREE.InstancedMesh).isInstancedMesh && !(o as THREE.SkinnedMesh).isSkinnedMesh;
}

/**
 * Merges the direct mesh children of `parent` that share a material into a
 * single mesh (transforms baked). Cuts draw calls for rigid multi-part models.
 */
export function mergeChildrenByMaterial(parent: THREE.Object3D): void {
  const buckets = new Map<THREE.Material, THREE.Mesh[]>();
  for (const child of parent.children) {
    if (!isPlainMesh(child) || Array.isArray(child.material) || child.children.length) continue;
    const list = buckets.get(child.material) ?? [];
    list.push(child);
    buckets.set(child.material, list);
  }
  for (const [material, meshes] of buckets) {
    if (meshes.length < 2) continue;
    const geos = meshes.map((m) => {
      m.updateMatrix();
      return normalise(m.geometry, m.matrix);
    });
    const merged = mergeGeometries(geos);
    geos.forEach((g) => g.dispose());
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, material);
    mesh.castShadow = meshes.some((m) => m.castShadow);
    mesh.receiveShadow = meshes.some((m) => m.receiveShadow);
    mesh.renderOrder = meshes[0].renderOrder;
    for (const m of meshes) parent.remove(m);
    parent.add(mesh);
  }
}

/**
 * Static batching for a whole subtree: every plain mesh below `root` is baked
 * into root space and merged per material. Only for geometry that never moves.
 */
export function staticBatch(root: THREE.Object3D): void {
  root.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const buckets = new Map<THREE.Material, THREE.Mesh[]>();
  root.traverse((o) => {
    if (o === root || !isPlainMesh(o) || Array.isArray(o.material)) return;
    const list = buckets.get(o.material) ?? [];
    list.push(o);
    buckets.set(o.material, list);
  });
  const m = new THREE.Matrix4();
  for (const [material, meshes] of buckets) {
    if (meshes.length < 2) continue;
    const geos = meshes.map((mesh) => normalise(mesh.geometry, m.multiplyMatrices(inv, mesh.matrixWorld)));
    const merged = mergeGeometries(geos);
    geos.forEach((g) => g.dispose());
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, material);
    mesh.castShadow = meshes.some((x) => x.castShadow);
    mesh.receiveShadow = meshes.some((x) => x.receiveShadow);
    mesh.renderOrder = meshes[0].renderOrder;
    for (const x of meshes) x.parent?.remove(x);
    root.add(mesh);
  }
  // Drop now-empty helper groups.
  const empty: THREE.Object3D[] = [];
  root.traverse((o) => { if (o !== root && o.type === 'Group' && o.children.length === 0) empty.push(o); });
  for (const o of empty) o.parent?.remove(o);
}
