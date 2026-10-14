import * as THREE from 'three';

const CAPACITY = 640;

/**
 * Fixed-capacity additive particle pool rendered as a single `THREE.Points`.
 * Emission writes into a ring buffer, so bursts never allocate and old
 * particles are recycled first when the (quality-dependent) limit is reached.
 */
export class ParticleSystem {
  readonly points: THREE.Points;
  private readonly pos = new Float32Array(CAPACITY * 3);
  private readonly vel = new Float32Array(CAPACITY * 3);
  private readonly col = new Float32Array(CAPACITY * 3);
  private readonly alpha = new Float32Array(CAPACITY);
  private readonly size = new Float32Array(CAPACITY);
  private readonly baseSize = new Float32Array(CAPACITY);
  private readonly life = new Float32Array(CAPACITY);
  private readonly maxLife = new Float32Array(CAPACITY);
  private readonly gravity = new Float32Array(CAPACITY);
  private readonly drag = new Float32Array(CAPACITY);
  private readonly grow = new Float32Array(CAPACITY);
  private head = 0;
  private limit = CAPACITY;
  private active = 0;
  private readonly geo = new THREE.BufferGeometry();

  constructor() {
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: { uScale: { value: 400 } },
      vertexShader: /* glsl */ `
        uniform float uScale;
        attribute float aAlpha;
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * uScale / max(0.1, -mv.z);
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float core = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor * (1.0 + core * 1.5), core * vAlpha);
        }`,
    });
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
  }

  setLimit(n: number): void {
    this.limit = Math.max(32, Math.min(CAPACITY, n));
  }

  setViewportHeight(h: number): void {
    (this.points.material as THREE.ShaderMaterial).uniforms.uScale.value = h * 0.5;
  }

  emit(x: number, y: number, z: number, vx: number, vy: number, vz: number, color: THREE.Color, size: number, life: number, gravity = 0, drag = 0, grow = 0): void {
    const i = this.head;
    this.head = (this.head + 1) % this.limit;
    const i3 = i * 3;
    this.pos[i3] = x; this.pos[i3 + 1] = y; this.pos[i3 + 2] = z;
    this.vel[i3] = vx; this.vel[i3 + 1] = vy; this.vel[i3 + 2] = vz;
    this.col[i3] = color.r; this.col[i3 + 1] = color.g; this.col[i3 + 2] = color.b;
    this.baseSize[i] = size;
    this.size[i] = size;
    this.alpha[i] = 1;
    this.life[i] = life;
    this.maxLife[i] = life;
    this.gravity[i] = gravity;
    this.drag[i] = drag;
    this.grow[i] = grow;
  }

  /** Spherical burst with randomised speeds — sparks, debris, defeat shards. */
  burst(x: number, y: number, z: number, count: number, speed: number, color: THREE.Color, size: number, life: number, gravity = 9, upBias = 0.3): void {
    for (let n = 0; n < count; n++) {
      const u = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const s = speed * (0.35 + Math.random() * 0.65);
      this.emit(x, y, z, r * Math.cos(a) * s, (u + upBias) * s, r * Math.sin(a) * s, color, size * (0.6 + Math.random() * 0.6), life * (0.6 + Math.random() * 0.6), gravity, 1.5);
    }
  }

  /** Directional cone of sparks around a surface normal. */
  sparks(x: number, y: number, z: number, nx: number, ny: number, nz: number, count: number, color: THREE.Color): void {
    for (let n = 0; n < count; n++) {
      const s = 4 + Math.random() * 7;
      this.emit(
        x, y, z,
        (nx + (Math.random() - 0.5) * 1.4) * s,
        (ny + Math.random() * 0.8) * s,
        (nz + (Math.random() - 0.5) * 1.4) * s,
        color, 0.06 + Math.random() * 0.05, 0.25 + Math.random() * 0.25, 14, 2,
      );
    }
  }

  update(dt: number): void {
    let active = 0;
    for (let i = 0; i < this.limit; i++) {
      if (this.life[i] <= 0) {
        if (this.alpha[i] !== 0) { this.alpha[i] = 0; this.size[i] = 0; }
        continue;
      }
      active++;
      this.life[i] -= dt;
      const i3 = i * 3;
      const d = Math.max(0, 1 - this.drag[i] * dt);
      this.vel[i3] *= d;
      this.vel[i3 + 1] = this.vel[i3 + 1] * d - this.gravity[i] * dt;
      this.vel[i3 + 2] *= d;
      this.pos[i3] += this.vel[i3] * dt;
      this.pos[i3 + 1] += this.vel[i3 + 1] * dt;
      this.pos[i3 + 2] += this.vel[i3 + 2] * dt;
      if (this.pos[i3 + 1] < 0.02) {
        this.pos[i3 + 1] = 0.02;
        this.vel[i3 + 1] *= -0.35;
      }
      const t = Math.max(0, this.life[i] / this.maxLife[i]);
      this.alpha[i] = t * t;
      this.size[i] = this.baseSize[i] * (1 + this.grow[i] * (1 - t));
    }
    this.active = active;
    const g = this.geo.attributes;
    g.position.needsUpdate = true;
    g.aAlpha.needsUpdate = true;
    g.aSize.needsUpdate = true;
    g.color.needsUpdate = true;
  }

  get activeCount(): number {
    return this.active;
  }

  clear(): void {
    this.life.fill(0);
  }

  dispose(): void {
    this.geo.dispose();
    (this.points.material as THREE.Material).dispose();
  }
}
