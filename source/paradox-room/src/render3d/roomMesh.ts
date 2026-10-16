// Voxel room -> one merged BufferGeometry with material groups and baked voxel ambient occlusion.
// Room-local space: x right, y UP, z TOWARD the viewer (room cell y and z are flipped), centred on the room.
import * as THREE from 'three';
import type { Level } from '../core/types.ts';

export const MAT_PLASTER = 0;
export const MAT_STONE = 1;
export const MAT_POCHE = 2;

const AO_CURVE = [0.42, 0.62, 0.82, 1];

/** Room cell (x, y, z) to room-local position of its centre. */
export function cellLocal(level: Level, room: number, x: number, y: number, z: number, out = new THREE.Vector3()): THREE.Vector3 {
  const r = level.rooms[room];
  return out.set(x - (r.w - 1) / 2, -(y - (r.h - 1) / 2), -(z - (r.d - 1) / 2));
}

/** Room-space direction to room-local direction. */
export function dirLocal(d: readonly number[], out = new THREE.Vector3()): THREE.Vector3 {
  return out.set(d[0], -d[1], -d[2]);
}

export function buildRoomGeometry(level: Level, room: number): THREE.BufferGeometry {
  const r = level.rooms[room];
  const solidAt = (x: number, y: number, z: number): boolean =>
    x >= 0 && y >= 0 && z >= 0 && x < r.w && y < r.h && z < r.d && r.solid[x + r.w * (y + r.h * z)] === 1;
  const inB = (x: number, y: number, z: number): boolean => x >= 0 && y >= 0 && z >= 0 && x < r.w && y < r.h && z < r.d;

  const buckets: { pos: number[]; nor: number[]; uv: number[]; col: number[]; idx: number[] }[] = [0, 1, 2].map(() => ({ pos: [], nor: [], uv: [], col: [], idx: [] }));
  const cx = (r.w - 1) / 2;
  const cy = (r.h - 1) / 2;
  const cz = (r.d - 1) / 2;

  const emit = (mat: number, cell: [number, number, number], axis: number, sign: number, ao: boolean): void => {
    const b = buckets[mat];
    const n = [0, 0, 0];
    n[axis] = sign;
    const ua = (axis + 1) % 3;
    const va = (axis + 2) % 3;
    const e = [cell[0] + n[0], cell[1] + n[1], cell[2] + n[2]];
    const corners: [number, number][] = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ];
    const base = b.pos.length / 3;
    const aoV: number[] = [];
    for (const [su, sv] of corners) {
      const p = [cell[0] + n[0] * 0.5, cell[1] + n[1] * 0.5, cell[2] + n[2] * 0.5];
      p[ua] += su * 0.5;
      p[va] += sv * 0.5;
      // to room-local (flip y and z), centred
      b.pos.push(p[0] - cx, -(p[1] - cy), -(p[2] - cz));
      b.nor.push(n[0], -n[1], -n[2]);
      // world-aligned UVs: the texture repeats every two cells
      const uu = (p[ua] + 0.5) * 0.5;
      const vv = (p[va] + 0.5) * 0.5;
      b.uv.push(uu, vv);
      let a = 3;
      if (ao) {
        const s1 = [...e];
        s1[ua] += su;
        const s2 = [...e];
        s2[va] += sv;
        const co = [...e];
        co[ua] += su;
        co[va] += sv;
        const A = solidAt(s1[0], s1[1], s1[2]) ? 1 : 0;
        const B = solidAt(s2[0], s2[1], s2[2]) ? 1 : 0;
        const C = solidAt(co[0], co[1], co[2]) ? 1 : 0;
        a = A && B ? 0 : 3 - (A + B + C);
      }
      aoV.push(a);
      const lum = AO_CURVE[a];
      b.col.push(lum, lum, lum);
    }
    // winding: make (v1 - v0) x (v2 - v0) point along the local normal
    const P = (i: number): THREE.Vector3 => new THREE.Vector3(b.pos[(base + i) * 3], b.pos[(base + i) * 3 + 1], b.pos[(base + i) * 3 + 2]);
    const nl = new THREE.Vector3(n[0], -n[1], -n[2]);
    const cr = new THREE.Vector3().subVectors(P(1), P(0)).cross(new THREE.Vector3().subVectors(P(2), P(0)));
    const flip = cr.dot(nl) < 0;
    // choose the diagonal that keeps AO gradients smooth
    const alt = aoV[0] + aoV[2] < aoV[1] + aoV[3];
    let tris = alt ? [1, 2, 3, 1, 3, 0] : [0, 1, 2, 0, 2, 3];
    if (flip) tris = [tris[0], tris[2], tris[1], tris[3], tris[5], tris[4]];
    for (const t of tris) b.idx.push(base + t);
  };

  for (let z = 0; z < r.d; z++)
    for (let y = 0; y < r.h; y++)
      for (let x = 0; x < r.w; x++) {
        if (!solidAt(x, y, z)) continue;
        for (let axis = 0; axis < 3; axis++)
          for (const sign of [1, -1]) {
            const nx = x + (axis === 0 ? sign : 0);
            const ny = y + (axis === 1 ? sign : 0);
            const nz = z + (axis === 2 ? sign : 0);
            if (inB(nx, ny, nz)) {
              if (solidAt(nx, ny, nz)) continue;
              emit(axis === 1 ? MAT_STONE : MAT_PLASTER, [x, y, z], axis, sign, true);
            } else if (r.d === 1 && axis === 2 && sign === -1) {
              // one-cell-deep rooms: the cut face toward the viewer is drawn as a section (poché)
              emit(MAT_POCHE, [x, y, z], axis, sign, false);
            }
          }
      }

  const g = new THREE.BufferGeometry();
  const pos: number[] = [];
  const nor: number[] = [];
  const uv: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  let start = 0;
  buckets.forEach((b, mat) => {
    const off = pos.length / 3;
    pos.push(...b.pos);
    nor.push(...b.nor);
    uv.push(...b.uv);
    col.push(...b.col);
    for (const i of b.idx) idx.push(i + off);
    g.addGroup(start, b.idx.length, mat);
    start += b.idx.length;
  });
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeBoundingSphere();
  return g;
}

/** Back wall for one-cell-deep rooms: a plaster plane with AO-free UVs, behind the slice. */
export function buildBackWall(level: Level, room: number): THREE.BufferGeometry | null {
  const r = level.rooms[room];
  if (r.d !== 1) return null;
  const g = new THREE.PlaneGeometry(r.w, r.h, 1, 1);
  const uv = g.getAttribute('uv') as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * r.w * 0.5, uv.getY(i) * r.h * 0.5);
  const col = new Float32Array(uv.count * 3).fill(0.85);
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.translate(0, 0, -0.5);
  return g;
}
