// A fixed-capacity InstancedMesh written from scratch every frame. No allocation in the hot path:
// matrices and colours go straight into the instance buffers.
import * as THREE from 'three';

const tmpM = new THREE.Matrix4();
const tmpQ = new THREE.Quaternion();
const tmpE = new THREE.Euler();
const tmpP = new THREE.Vector3();
const tmpS = new THREE.Vector3();

export interface LayerOpts {
  /** per-instance colour (instanceColor); defaults to true */
  color?: boolean;
  /** per-instance emissive add, read by glow materials as attribute `aGlow` */
  glow?: boolean;
  /** extra per-instance float attributes: name -> item size */
  extra?: Record<string, number>;
  renderOrder?: number;
  frustumCulled?: boolean;
}

export class Layer {
  readonly mesh: THREE.InstancedMesh;
  readonly cap: number;
  n = 0;
  private m: Float32Array;
  private c: Float32Array | null;
  private g: Float32Array | null;
  readonly extra: Record<string, Float32Array> = {};
  private extraAttr: THREE.InstancedBufferAttribute[] = [];
  private glowAttr: THREE.InstancedBufferAttribute | null = null;

  constructor(geo: THREE.BufferGeometry, mat: THREE.Material, cap: number, opts: LayerOpts = {}) {
    this.cap = cap;
    this.mesh = new THREE.InstancedMesh(geo, mat, cap);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.m = this.mesh.instanceMatrix.array as Float32Array;
    this.c = null;
    if (opts.color !== false) {
      const attr = new THREE.InstancedBufferAttribute(new Float32Array(cap * 3).fill(1), 3);
      attr.setUsage(THREE.DynamicDrawUsage);
      this.mesh.instanceColor = attr;
      this.c = attr.array as Float32Array;
    }
    this.g = null;
    if (opts.glow) {
      this.glowAttr = new THREE.InstancedBufferAttribute(new Float32Array(cap * 3), 3);
      this.glowAttr.setUsage(THREE.DynamicDrawUsage);
      geo.setAttribute('aGlow', this.glowAttr);
      this.g = this.glowAttr.array as Float32Array;
    }
    if (opts.extra) {
      for (const [name, size] of Object.entries(opts.extra)) {
        const a = new THREE.InstancedBufferAttribute(new Float32Array(cap * size), size);
        a.setUsage(THREE.DynamicDrawUsage);
        geo.setAttribute(name, a);
        this.extra[name] = a.array as Float32Array;
        this.extraAttr.push(a);
      }
    }
    this.mesh.count = 0;
    this.mesh.frustumCulled = opts.frustumCulled ?? false;
    if (opts.renderOrder !== undefined) this.mesh.renderOrder = opts.renderOrder;
  }

  begin(): void {
    this.n = 0;
  }

  get full(): boolean {
    return this.n >= this.cap;
  }

  /** Position + yaw (about +Y) + non-uniform scale. Returns the instance index or -1 when full. */
  put(x: number, y: number, z: number, yaw: number, sx: number, sy: number, sz: number): number {
    if (this.n >= this.cap) return -1;
    const i = this.n++;
    const o = i * 16;
    const m = this.m;
    const c = Math.cos(yaw);
    const s = Math.sin(yaw);
    m[o] = c * sx;
    m[o + 1] = 0;
    m[o + 2] = -s * sx;
    m[o + 3] = 0;
    m[o + 4] = 0;
    m[o + 5] = sy;
    m[o + 6] = 0;
    m[o + 7] = 0;
    m[o + 8] = s * sz;
    m[o + 9] = 0;
    m[o + 10] = c * sz;
    m[o + 11] = 0;
    m[o + 12] = x;
    m[o + 13] = y;
    m[o + 14] = z;
    m[o + 15] = 1;
    if (this.g) {
      this.g[i * 3] = this.g[i * 3 + 1] = this.g[i * 3 + 2] = 0;
    }
    return i;
  }

  /** Full Euler rotation (used for tumbling debris and crystals). */
  putEuler(x: number, y: number, z: number, rx: number, ry: number, rz: number, sx: number, sy: number, sz: number): number {
    if (this.n >= this.cap) return -1;
    const i = this.n++;
    tmpE.set(rx, ry, rz);
    tmpQ.setFromEuler(tmpE);
    tmpP.set(x, y, z);
    tmpS.set(sx, sy, sz);
    tmpM.compose(tmpP, tmpQ, tmpS);
    tmpM.toArray(this.m, i * 16);
    if (this.g) {
      this.g[i * 3] = this.g[i * 3 + 1] = this.g[i * 3 + 2] = 0;
    }
    return i;
  }

  /** Arbitrary matrix (used for tilted parts). */
  putMatrix(mat: THREE.Matrix4): number {
    if (this.n >= this.cap) return -1;
    const i = this.n++;
    mat.toArray(this.m, i * 16);
    if (this.g) {
      this.g[i * 3] = this.g[i * 3 + 1] = this.g[i * 3 + 2] = 0;
    }
    return i;
  }

  color(i: number, r: number, g: number, b: number): void {
    if (i < 0 || !this.c) return;
    const o = i * 3;
    this.c[o] = r;
    this.c[o + 1] = g;
    this.c[o + 2] = b;
  }

  colorC(i: number, col: THREE.Color, k = 1): void {
    this.color(i, col.r * k, col.g * k, col.b * k);
  }

  glow(i: number, r: number, g: number, b: number): void {
    if (i < 0 || !this.g) return;
    const o = i * 3;
    this.g[o] = r;
    this.g[o + 1] = g;
    this.g[o + 2] = b;
  }

  glowC(i: number, col: THREE.Color, k: number): void {
    this.glow(i, col.r * k, col.g * k, col.b * k);
  }

  end(): void {
    const n = this.n;
    this.mesh.count = n;
    if (n === 0) return;
    const im = this.mesh.instanceMatrix;
    im.clearUpdateRanges();
    im.addUpdateRange(0, n * 16);
    im.needsUpdate = true;
    if (this.mesh.instanceColor) {
      const ic = this.mesh.instanceColor;
      ic.clearUpdateRanges();
      ic.addUpdateRange(0, n * 3);
      ic.needsUpdate = true;
    }
    if (this.glowAttr) {
      this.glowAttr.clearUpdateRanges();
      this.glowAttr.addUpdateRange(0, n * 3);
      this.glowAttr.needsUpdate = true;
    }
    for (const a of this.extraAttr) {
      a.clearUpdateRanges();
      a.addUpdateRange(0, n * a.itemSize);
      a.needsUpdate = true;
    }
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    const m = this.mesh.material;
    if (Array.isArray(m)) m.forEach((x) => x.dispose());
    else m.dispose();
    this.mesh.dispose();
  }
}
