import * as THREE from 'three';
import type { ProjectileKind } from '../sim/content.ts';
import type { Projectile } from '../sim/projectiles.ts';
import { PALETTE } from './materials.ts';
import { glowTexture, scorchTexture } from './textures.ts';

/**
 * A fixed-capacity particle pool drawn as one THREE.Points. Emission writes
 * into a ring buffer; nothing allocates after construction.
 */
class Particles {
  readonly points: THREE.Points;
  private readonly cap: number;
  private readonly pos: Float32Array;
  private readonly vel: Float32Array;
  private readonly col: Float32Array;
  private readonly base: Float32Array;
  private readonly alpha: Float32Array;
  private readonly size: Float32Array;
  private readonly size0: Float32Array;
  private readonly grow: Float32Array;
  private readonly life: Float32Array;
  private readonly maxLife: Float32Array;
  private readonly grav: Float32Array;
  private readonly drag: Float32Array;
  private head = 0;
  limit: number;
  private readonly geo = new THREE.BufferGeometry();
  private readonly mat: THREE.ShaderMaterial;

  constructor(cap: number, additive: boolean) {
    this.cap = cap;
    this.limit = cap;
    this.pos = new Float32Array(cap * 3);
    this.vel = new Float32Array(cap * 3);
    this.col = new Float32Array(cap * 3);
    this.base = new Float32Array(cap * 3);
    this.alpha = new Float32Array(cap);
    this.size = new Float32Array(cap);
    this.size0 = new Float32Array(cap);
    this.grow = new Float32Array(cap);
    this.life = new Float32Array(cap);
    this.maxLife = new Float32Array(cap);
    this.grav = new Float32Array(cap);
    this.drag = new Float32Array(cap);
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5);
    this.mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexColors: true,
      uniforms: { uScale: { value: 500 }, uMap: { value: glowTexture() } },
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
          gl_PointSize = aSize * uScale / max(0.5, -mv.z);
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float a = texture2D(uMap, gl_PointCoord).a * vAlpha;
          if (a < 0.01) discard;
          gl_FragColor = vec4(vColor, a);
        }`,
    });
    this.points = new THREE.Points(this.geo, this.mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = additive ? 5 : 4;
  }

  setScale(px: number): void {
    this.mat.uniforms.uScale.value = px;
  }

  emit(x: number, y: number, z: number, vx: number, vy: number, vz: number, color: number, intensity: number, size: number, grow: number, life: number, gravity: number, drag: number): void {
    const i = this.head;
    this.head = (this.head + 1) % this.limit;
    const i3 = i * 3;
    this.pos[i3] = x; this.pos[i3 + 1] = y; this.pos[i3 + 2] = z;
    this.vel[i3] = vx; this.vel[i3 + 1] = vy; this.vel[i3 + 2] = vz;
    _c.setHex(color);
    this.base[i3] = _c.r * intensity; this.base[i3 + 1] = _c.g * intensity; this.base[i3 + 2] = _c.b * intensity;
    this.size0[i] = size;
    this.grow[i] = grow;
    this.life[i] = life;
    this.maxLife[i] = life;
    this.grav[i] = gravity;
    this.drag[i] = drag;
  }

  update(dt: number): void {
    for (let i = 0; i < this.cap; i++) {
      if (this.life[i] <= 0) {
        if (this.alpha[i] !== 0) { this.alpha[i] = 0; this.size[i] = 0; }
        continue;
      }
      this.life[i] -= dt;
      const i3 = i * 3;
      const d = Math.exp(-this.drag[i] * dt);
      this.vel[i3] *= d; this.vel[i3 + 1] = this.vel[i3 + 1] * d - this.grav[i] * dt; this.vel[i3 + 2] *= d;
      this.pos[i3] += this.vel[i3] * dt;
      this.pos[i3 + 1] += this.vel[i3 + 1] * dt;
      this.pos[i3 + 2] += this.vel[i3 + 2] * dt;
      const t = Math.max(0, this.life[i] / this.maxLife[i]);
      this.alpha[i] = t < 0.7 ? t / 0.7 : 1;
      this.size[i] = this.size0[i] + this.grow[i] * (1 - t);
      this.col[i3] = this.base[i3]; this.col[i3 + 1] = this.base[i3 + 1]; this.col[i3 + 2] = this.base[i3 + 2];
    }
    const g = this.geo.attributes;
    (g.position as THREE.BufferAttribute).needsUpdate = true;
    (g.color as THREE.BufferAttribute).needsUpdate = true;
    (g.aAlpha as THREE.BufferAttribute).needsUpdate = true;
    (g.aSize as THREE.BufferAttribute).needsUpdate = true;
  }

  clear(): void {
    this.life.fill(0);
    this.alpha.fill(0);
    this.size.fill(0);
  }

  dispose(): void {
    this.geo.dispose();
    this.mat.dispose();
  }
}

function setCount(im: THREE.InstancedMesh, n: number): void {
  im.count = n;
  if (n) im.instanceMatrix.needsUpdate = true;
}

const _c = new THREE.Color();
const _v = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _m = new THREE.Matrix4();
const Z = new THREE.Vector3(0, 0, 1);
const UP = new THREE.Vector3(0, 1, 0);

interface Timed<T> {
  obj: T;
  t: number;
  dur: number;
  size: number;
}

export const WEAPON_COLOR: Record<ProjectileKind | 'shockwave' | 'tank', number> = {
  plasma: 0x38e8ff,
  rail: 0xc8f6ff,
  volt: 0x8fa6ff,
  nova: 0xff8a3d,
  shockwave: 0x9ff4ff,
  tank: 0xff9a40,
};

/** All transient combat visuals. */
export class Effects {
  readonly group = new THREE.Group();
  private readonly add: Particles;
  private readonly smoke: Particles;
  private readonly flashes: Array<Timed<THREE.Sprite>> = [];
  private readonly rings: Array<Timed<THREE.Mesh>> = [];
  private readonly beams: Array<Timed<THREE.Mesh>> = [];
  private readonly scorches: Array<Timed<THREE.Mesh>> = [];
  private readonly lights: Array<Timed<THREE.PointLight>> = [];
  private readonly columns: Array<Timed<THREE.Mesh>> = [];
  private readonly shots = new Map<ProjectileKind, THREE.InstancedMesh>();
  private readonly glows = new Map<ProjectileKind, THREE.InstancedMesh>();
  private readonly debris: THREE.InstancedMesh;
  private readonly debrisState: Array<{ x: number; y: number; z: number; vx: number; vy: number; vz: number; rx: number; ry: number; spin: number; t: number; s: number }> = [];
  private readonly geos: THREE.BufferGeometry[] = [];
  private readonly mats: THREE.Material[] = [];
  private flashIdx = 0;
  private ringIdx = 0;
  private beamIdx = 0;
  private scorchIdx = 0;
  private lightIdx = 0;
  private colIdx = 0;
  private debrisIdx = 0;
  private trailTimer = 0;

  constructor(maxParticles: number, maxLights: number) {
    this.add = new Particles(maxParticles, true);
    this.smoke = new Particles(Math.floor(maxParticles * 0.6), false);
    this.group.add(this.add.points, this.smoke.points);

    const glowMap = glowTexture();
    for (let i = 0; i < 24; i++) {
      const m = this.mat(new THREE.SpriteMaterial({ map: glowMap, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      const s = new THREE.Sprite(m);
      s.visible = false;
      s.renderOrder = 6;
      this.group.add(s);
      this.flashes.push({ obj: s, t: 0, dur: 0, size: 1 });
    }
    const ringGeo = this.geo(new THREE.RingGeometry(0.85, 1, 48));
    for (let i = 0; i < 10; i++) {
      const m = new THREE.Mesh(ringGeo, this.mat(new THREE.MeshBasicMaterial({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false })));
      m.visible = false;
      m.renderOrder = 6;
      this.group.add(m);
      this.rings.push({ obj: m, t: 0, dur: 0, size: 1 });
    }
    const beamGeo = this.geo(new THREE.CylinderGeometry(1, 1, 1, 8, 1, true).rotateX(Math.PI / 2).translate(0, 0, 0.5));
    for (let i = 0; i < 10; i++) {
      const m = new THREE.Mesh(beamGeo, this.mat(new THREE.MeshBasicMaterial({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })));
      m.visible = false;
      m.renderOrder = 6;
      this.group.add(m);
      this.beams.push({ obj: m, t: 0, dur: 0, size: 1 });
    }
    const scorchGeo = this.geo(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2));
    const scorchMat = this.mat(new THREE.MeshBasicMaterial({ map: scorchTexture(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
    for (let i = 0; i < 28; i++) {
      const m = new THREE.Mesh(scorchGeo, scorchMat.clone());
      this.mats.push(m.material as THREE.Material);
      m.visible = false;
      m.renderOrder = 1;
      this.group.add(m);
      this.scorches.push({ obj: m, t: 0, dur: 0, size: 1 });
    }
    const colGeo = this.geo(new THREE.CylinderGeometry(1.6, 2.2, 14, 24, 1, true).translate(0, 7, 0));
    for (let i = 0; i < 4; i++) {
      const m = new THREE.Mesh(colGeo, this.mat(new THREE.MeshBasicMaterial({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false })));
      m.visible = false;
      this.group.add(m);
      this.columns.push({ obj: m, t: 0, dur: 0, size: 1 });
    }
    for (let i = 0; i < maxLights; i++) {
      const l = new THREE.PointLight(0xffffff, 0, 18, 1.8);
      l.visible = false;
      this.group.add(l);
      this.lights.push({ obj: l, t: 0, dur: 0, size: 1 });
    }

    // Instanced projectile bodies and glows, one draw each per weapon.
    const mk = (geo: THREE.BufferGeometry, color: number, intensity: number, additive: boolean, cap: number) => {
      const mat = this.mat(new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), toneMapped: false, transparent: additive, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, depthWrite: !additive }));
      const im = new THREE.InstancedMesh(this.geo(geo), mat, cap);
      im.count = 0;
      im.frustumCulled = false;
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.group.add(im);
      return im;
    };
    this.shots.set('plasma', mk(new THREE.SphereGeometry(0.28, 10, 8), PALETTE.white, 2.5, false, 96));
    this.glows.set('plasma', mk(new THREE.CylinderGeometry(0.42, 0.05, 1, 10).rotateX(-Math.PI / 2).translate(0, 0, -0.5), WEAPON_COLOR.plasma, 2.2, true, 96));
    this.shots.set('volt', mk(new THREE.BoxGeometry(0.09, 0.09, 1), 0xe6ecff, 3, false, 160));
    this.glows.set('volt', mk(new THREE.BoxGeometry(0.3, 0.3, 1.4), WEAPON_COLOR.volt, 1.6, true, 160));
    this.shots.set('rail', mk(new THREE.BoxGeometry(0.14, 0.14, 1), PALETTE.white, 4, false, 16));
    this.glows.set('rail', mk(new THREE.BoxGeometry(0.5, 0.5, 1), WEAPON_COLOR.rail, 1.5, true, 16));
    const rocket = new THREE.CylinderGeometry(0.13, 0.13, 0.9, 8).rotateX(Math.PI / 2);
    this.shots.set('nova', mk(rocket, 0x2b2f38, 1, false, 64));
    this.glows.set('nova', mk(new THREE.SphereGeometry(0.32, 8, 6).translate(0, 0, -0.55), WEAPON_COLOR.nova, 2.6, true, 64));

    const debrisMat = this.mat(new THREE.MeshStandardMaterial({ color: 0x23272f, metalness: 0.7, roughness: 0.6, emissive: new THREE.Color(0x401000), emissiveIntensity: 0.6 }));
    this.debris = new THREE.InstancedMesh(this.geo(new THREE.BoxGeometry(1, 1, 1)), debrisMat, 48);
    this.debris.count = 48;
    this.debris.frustumCulled = false;
    this.debris.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    for (let i = 0; i < 48; i++) {
      this.debrisState.push({ x: 0, y: -100, z: 0, vx: 0, vy: 0, vz: 0, rx: 0, ry: 0, spin: 0, t: 0, s: 0 });
      _m.makeScale(0, 0, 0);
      this.debris.setMatrixAt(i, _m);
    }
    this.group.add(this.debris);
  }

  private geo<T extends THREE.BufferGeometry>(g: T): T {
    this.geos.push(g);
    return g;
  }

  private mat<T extends THREE.Material>(m: T): T {
    this.mats.push(m);
    return m;
  }

  setPixelScale(heightPx: number, fovDeg: number): void {
    const s = heightPx / (2 * Math.tan((fovDeg * Math.PI) / 360));
    this.add.setScale(s);
    this.smoke.setScale(s);
  }

  setParticleLimit(n: number): void {
    this.add.limit = Math.max(32, Math.min(n, 900));
    this.smoke.limit = Math.max(24, Math.floor(this.add.limit * 0.6));
  }

  // ------------------------------------------------------------ primitives

  flash(x: number, y: number, z: number, color: number, size: number, dur: number, intensity = 2): void {
    const f = this.flashes[this.flashIdx];
    this.flashIdx = (this.flashIdx + 1) % this.flashes.length;
    f.obj.position.set(x, y, z);
    (f.obj.material as THREE.SpriteMaterial).color.setHex(color).multiplyScalar(intensity);
    f.obj.visible = true;
    f.t = dur;
    f.dur = dur;
    f.size = size;
  }

  ring(x: number, y: number, z: number, color: number, radius: number, dur: number, flat = true): void {
    const r = this.rings[this.ringIdx];
    this.ringIdx = (this.ringIdx + 1) % this.rings.length;
    r.obj.position.set(x, y, z);
    r.obj.rotation.set(flat ? -Math.PI / 2 : 0, 0, 0);
    (r.obj.material as THREE.MeshBasicMaterial).color.setHex(color).multiplyScalar(2);
    r.obj.visible = true;
    r.t = dur;
    r.dur = dur;
    r.size = radius;
  }

  beam(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, color: number, width: number, dur: number): void {
    const b = this.beams[this.beamIdx];
    this.beamIdx = (this.beamIdx + 1) % this.beams.length;
    const len = Math.hypot(x1 - x0, y1 - y0, z1 - z0);
    if (len < 0.01) return;
    b.obj.position.set(x0, y0, z0);
    _v.set(x1 - x0, y1 - y0, z1 - z0).divideScalar(len);
    b.obj.quaternion.setFromUnitVectors(Z, _v);
    b.obj.scale.set(width, width, len);
    (b.obj.material as THREE.MeshBasicMaterial).color.setHex(color).multiplyScalar(3);
    b.obj.visible = true;
    b.t = dur;
    b.dur = dur;
    b.size = width;
  }

  light(x: number, y: number, z: number, color: number, intensity: number, dur: number): void {
    if (!this.lights.length) return;
    const l = this.lights[this.lightIdx];
    this.lightIdx = (this.lightIdx + 1) % this.lights.length;
    l.obj.position.set(x, y, z);
    l.obj.color.setHex(color);
    l.obj.visible = true;
    l.t = dur;
    l.dur = dur;
    l.size = intensity;
  }

  scorch(x: number, y: number, z: number, size: number): void {
    const s = this.scorches[this.scorchIdx];
    this.scorchIdx = (this.scorchIdx + 1) % this.scorches.length;
    s.obj.position.set(x, y + 0.03, z);
    s.obj.rotation.y = Math.random() * Math.PI * 2;
    s.obj.scale.set(size, 1, size);
    s.obj.visible = true;
    s.t = 24;
    s.dur = 24;
    s.size = size;
  }

  column(x: number, y: number, z: number, color: number): void {
    const c = this.columns[this.colIdx];
    this.colIdx = (this.colIdx + 1) % this.columns.length;
    c.obj.position.set(x, y, z);
    (c.obj.material as THREE.MeshBasicMaterial).color.setHex(color).multiplyScalar(1.4);
    c.obj.visible = true;
    c.t = 0.9;
    c.dur = 0.9;
  }

  sparks(x: number, y: number, z: number, nx: number, ny: number, nz: number, color: number, n: number, speed: number): void {
    for (let i = 0; i < n; i++) {
      const vx = nx * speed * 0.6 + (Math.random() - 0.5) * speed;
      const vy = ny * speed * 0.6 + Math.random() * speed * 0.7;
      const vz = nz * speed * 0.6 + (Math.random() - 0.5) * speed;
      this.add.emit(x, y, z, vx, vy, vz, color, 2.2, 0.12 + Math.random() * 0.12, -0.08, 0.25 + Math.random() * 0.35, 14, 2.5);
    }
  }

  smokePuff(x: number, y: number, z: number, n: number, size: number, dark = 0.12, life = 1.6): void {
    for (let i = 0; i < n; i++) {
      const v = 0.12 + Math.random() * dark;
      _c.setRGB(v, v * 1.02, v * 1.1);
      this.smoke.emit(x + (Math.random() - 0.5) * size * 0.5, y, z + (Math.random() - 0.5) * size * 0.5, (Math.random() - 0.5) * 1.6, 1 + Math.random() * 1.8, (Math.random() - 0.5) * 1.6, _c.getHex(), 1, size * 0.6, size * 1.4, life * (0.7 + Math.random() * 0.6), -0.4, 1.2);
    }
  }

  fire(x: number, y: number, z: number, n: number, size: number): void {
    for (let i = 0; i < n; i++) {
      const c = Math.random() < 0.5 ? 0xff7a2a : 0xffc65a;
      this.add.emit(x + (Math.random() - 0.5) * size, y + Math.random() * 0.4, z + (Math.random() - 0.5) * size, (Math.random() - 0.5) * 1.2, 1.5 + Math.random() * 2, (Math.random() - 0.5) * 1.2, c, 1.6, size * 0.5, size * 0.4, 0.35 + Math.random() * 0.35, -1, 1);
    }
  }

  // ------------------------------------------------------------ composites

  muzzle(x: number, y: number, z: number, dx: number, dy: number, dz: number, kind: ProjectileKind): void {
    const c = WEAPON_COLOR[kind];
    const size = kind === 'rail' ? 3.2 : kind === 'volt' ? 0.9 : kind === 'nova' ? 2.2 : 2.4;
    this.flash(x, y, z, c, size, kind === 'volt' ? 0.05 : 0.09, 2.4);
    if (kind !== 'volt') this.light(x, y, z, c, kind === 'rail' ? 40 : 18, 0.08);
    const n = kind === 'volt' ? 2 : kind === 'rail' ? 10 : 6;
    for (let i = 0; i < n; i++) {
      const s = 4 + Math.random() * 8;
      this.add.emit(x, y, z, dx * s + (Math.random() - 0.5) * 3, dy * s + Math.random() * 2, dz * s + (Math.random() - 0.5) * 3, c, 2, 0.16, -0.1, 0.18, 4, 4);
    }
    if (kind === 'nova' || kind === 'plasma') this.smokePuff(x, y, z, 2, 0.8, 0.1, 0.8);
  }

  impact(x: number, y: number, z: number, nx: number, ny: number, nz: number, kind: ProjectileKind, onTank: boolean): void {
    const c = WEAPON_COLOR[kind];
    if (kind === 'volt') {
      this.sparks(x, y, z, nx, ny, nz, c, onTank ? 6 : 3, 6);
      this.flash(x, y, z, c, 1.2, 0.06);
      return;
    }
    if (kind === 'nova') return; // the explode event covers it
    this.sparks(x, y, z, nx, ny, nz, onTank ? 0xffd28a : c, kind === 'rail' ? 22 : 12, kind === 'rail' ? 14 : 9);
    this.flash(x, y, z, c, kind === 'rail' ? 3.4 : 2.2, 0.12);
    this.light(x, y, z, c, 16, 0.12);
    if (!onTank) this.smokePuff(x, y, z, 2, 0.9, 0.12, 1);
    if (!onTank && ny > 0.7 && kind === 'rail') this.scorch(x, y, z, 1.6);
  }

  explosion(x: number, y: number, z: number, radius: number, color: number, groundY: number | null): void {
    const big = radius > 5;
    this.flash(x, y, z, 0xffffff, radius * 1.4, 0.12, 2.6);
    this.flash(x, y, z, color, radius * 2.2, 0.32, 2);
    this.light(x, y + 1, z, color, big ? 70 : 30, 0.35);
    this.sparks(x, y, z, 0, 1, 0, 0xffc070, big ? 26 : 12, big ? 16 : 10);
    this.fire(x, y, z, big ? 18 : 8, radius * 0.45);
    this.smokePuff(x, y + 0.5, z, big ? 10 : 4, radius * 0.7, 0.1, 2.2);
    if (groundY !== null) {
      this.ring(x, groundY + 0.1, z, color, radius, 0.45);
      this.scorch(x, groundY, z, radius * 1.1);
    }
  }

  tankDestroyed(x: number, y: number, z: number, color: number): void {
    this.explosion(x, y + 1.2, z, 7, 0xff8a3d, y);
    this.flash(x, y + 1.5, z, color, 10, 0.5, 1.6);
    this.ring(x, y + 0.15, z, color, 9, 0.7);
    for (let i = 0; i < 10; i++) {
      const d = this.debrisState[this.debrisIdx];
      this.debrisIdx = (this.debrisIdx + 1) % this.debrisState.length;
      d.x = x; d.y = y + 1.2; d.z = z;
      const a = Math.random() * Math.PI * 2;
      const sp = 4 + Math.random() * 8;
      d.vx = Math.cos(a) * sp; d.vz = Math.sin(a) * sp; d.vy = 5 + Math.random() * 9;
      d.rx = Math.random() * 6; d.ry = Math.random() * 6; d.spin = (Math.random() - 0.5) * 14;
      d.t = 3.5 + Math.random();
      d.s = 0.25 + Math.random() * 0.45;
    }
  }

  spawnBeam(x: number, y: number, z: number, color: number): void {
    this.column(x, y, z, color);
    this.ring(x, y + 0.1, z, color, 4, 0.6);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      this.add.emit(x + Math.cos(a) * 2, y + 0.2, z + Math.sin(a) * 2, 0, 4 + Math.random() * 4, 0, color, 2, 0.25, -0.15, 0.7, 0, 1);
    }
  }

  pickupBurst(x: number, y: number, z: number, color: number): void {
    this.ring(x, y + 0.2, z, color, 4, 0.5);
    this.flash(x, y + 1.5, z, color, 4, 0.3);
    for (let i = 0; i < 18; i++) {
      this.add.emit(x, y + 1.5, z, (Math.random() - 0.5) * 6, 2 + Math.random() * 5, (Math.random() - 0.5) * 6, color, 2, 0.22, -0.1, 0.6, 6, 2);
    }
  }

  shockwave(x: number, y: number, z: number): void {
    this.ring(x, y + 0.2, z, WEAPON_COLOR.shockwave, 12, 0.55);
    this.ring(x, y + 0.6, z, 0xffffff, 8, 0.35);
    this.flash(x, y + 1, z, WEAPON_COLOR.shockwave, 9, 0.25);
    this.light(x, y + 1, z, WEAPON_COLOR.shockwave, 60, 0.3);
    for (let i = 0; i < 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      this.add.emit(x, y + 0.4, z, Math.cos(a) * 18, 1 + Math.random() * 2, Math.sin(a) * 18, WEAPON_COLOR.shockwave, 2, 0.35, 0.2, 0.5, 2, 2.5);
    }
    this.smokePuff(x, y + 0.3, z, 8, 3, 0.08, 1.4);
  }

  // ------------------------------------------------------------ per frame

  updateProjectiles(items: Projectile[], dt: number): void {
    let np = 0, nv = 0, nr = 0, nn = 0;
    const plasma = this.shots.get('plasma')!, plasmaG = this.glows.get('plasma')!;
    const volt = this.shots.get('volt')!, voltG = this.glows.get('volt')!;
    const rail = this.shots.get('rail')!, railG = this.glows.get('rail')!;
    const nova = this.shots.get('nova')!, novaG = this.glows.get('nova')!;
    this.trailTimer -= dt;
    const emitTrail = this.trailTimer <= 0;
    if (emitTrail) this.trailTimer = 0.03;
    for (const p of items) {
      if (!p.active) continue;
      const sp = Math.hypot(p.vx, p.vy, p.vz) || 1;
      _v.set(p.vx / sp, p.vy / sp, p.vz / sp);
      _q.setFromUnitVectors(Z, _v);
      const kind = p.weapon.projectile;
      if (kind === 'plasma' && np < 96) {
        _m.compose(_s.set(p.x, p.y, p.z), _q, _v.set(1, 1, 1));
        plasma.setMatrixAt(np, _m);
        _m.compose(_s.set(p.x, p.y, p.z), _q, _v.set(1, 1, Math.min(4, sp * 0.045)));
        plasmaG.setMatrixAt(np, _m);
        np++;
      } else if (kind === 'volt' && nv < 160) {
        _m.compose(_s.set(p.x, p.y, p.z), _q, _v.set(1, 1, 1.6));
        volt.setMatrixAt(nv, _m);
        voltG.setMatrixAt(nv, _m);
        nv++;
      } else if (kind === 'rail' && nr < 16) {
        _m.compose(_s.set(p.x, p.y, p.z), _q, _v.set(1, 1, 7));
        rail.setMatrixAt(nr, _m);
        railG.setMatrixAt(nr, _m);
        nr++;
      } else if (kind === 'nova' && nn < 64) {
        _m.compose(_s.set(p.x, p.y, p.z), _q, _v.set(1, 1, 1));
        nova.setMatrixAt(nn, _m);
        novaG.setMatrixAt(nn, _m);
        nn++;
        if (emitTrail) {
          this.smoke.emit(p.x, p.y, p.z, (Math.random() - 0.5) * 0.6, 0.4, (Math.random() - 0.5) * 0.6, 0x3a3d44, 1, 0.35, 1.1, 0.9, -0.2, 1.5);
          this.add.emit(p.x, p.y, p.z, 0, 0, 0, WEAPON_COLOR.nova, 1.5, 0.3, -0.25, 0.12, 0, 0);
        }
      }
    }
    setCount(plasma, np); setCount(plasmaG, np);
    setCount(volt, nv); setCount(voltG, nv);
    setCount(rail, nr); setCount(railG, nr);
    setCount(nova, nn); setCount(novaG, nn);
  }

  update(dt: number): void {
    this.add.update(dt);
    this.smoke.update(dt);
    for (const f of this.flashes) {
      if (!f.obj.visible) continue;
      f.t -= dt;
      if (f.t <= 0) { f.obj.visible = false; continue; }
      const k = f.t / f.dur;
      const s = f.size * (1.2 - k * 0.4);
      f.obj.scale.set(s, s, 1);
      (f.obj.material as THREE.SpriteMaterial).opacity = k;
    }
    for (const r of this.rings) {
      if (!r.obj.visible) continue;
      r.t -= dt;
      if (r.t <= 0) { r.obj.visible = false; continue; }
      const k = 1 - r.t / r.dur;
      const s = r.size * (0.15 + 0.85 * Math.sqrt(k));
      r.obj.scale.set(s, s, s);
      (r.obj.material as THREE.MeshBasicMaterial).opacity = 1 - k;
    }
    for (const b of this.beams) {
      if (!b.obj.visible) continue;
      b.t -= dt;
      if (b.t <= 0) { b.obj.visible = false; continue; }
      const k = b.t / b.dur;
      const w = b.size * (0.4 + 0.6 * k);
      b.obj.scale.x = w;
      b.obj.scale.y = w;
      (b.obj.material as THREE.MeshBasicMaterial).opacity = k;
    }
    for (const s of this.scorches) {
      if (!s.obj.visible) continue;
      s.t -= dt;
      if (s.t <= 0) { s.obj.visible = false; continue; }
      (s.obj.material as THREE.MeshBasicMaterial).opacity = Math.min(1, s.t / 4) * 0.85;
    }
    for (const c of this.columns) {
      if (!c.obj.visible) continue;
      c.t -= dt;
      if (c.t <= 0) { c.obj.visible = false; continue; }
      const k = c.t / c.dur;
      (c.obj.material as THREE.MeshBasicMaterial).opacity = k * 0.6;
      c.obj.scale.set(0.6 + 0.6 * (1 - k), 1, 0.6 + 0.6 * (1 - k));
    }
    for (const l of this.lights) {
      if (!l.obj.visible) continue;
      l.t -= dt;
      if (l.t <= 0) { l.obj.visible = false; l.obj.intensity = 0; continue; }
      l.obj.intensity = l.size * (l.t / l.dur) * 12;
    }
    let anyDebris = false;
    for (let i = 0; i < this.debrisState.length; i++) {
      const d = this.debrisState[i];
      if (d.t <= 0) continue;
      anyDebris = true;
      d.t -= dt;
      d.vy -= 22 * dt;
      d.x += d.vx * dt; d.y += d.vy * dt; d.z += d.vz * dt;
      if (d.y < 0.15 && d.vy < 0) { d.y = 0.15; d.vy *= -0.3; d.vx *= 0.6; d.vz *= 0.6; d.spin *= 0.5; }
      d.rx += d.spin * dt; d.ry += d.spin * 0.7 * dt;
      const s = d.t > 0 ? d.s * Math.min(1, d.t) : 0;
      _q.setFromAxisAngle(UP, d.ry);
      _m.compose(_s.set(d.x, d.y, d.z), _q, _v.set(s, s * 0.6, s * 1.4));
      this.debris.setMatrixAt(i, _m);
      if (Math.random() < dt * 6 && d.t > 1) this.smoke.emit(d.x, d.y, d.z, 0, 0.6, 0, 0x26282e, 1, 0.3, 0.8, 0.8, -0.2, 1);
    }
    if (anyDebris) this.debris.instanceMatrix.needsUpdate = true;
  }

  clear(): void {
    this.add.clear();
    this.smoke.clear();
    for (const list of [this.flashes, this.rings, this.beams, this.scorches, this.columns] as Array<Array<Timed<THREE.Object3D>>>) for (const f of list) { f.obj.visible = false; f.t = 0; }
    for (const l of this.lights) { l.obj.visible = false; l.t = 0; }
    for (let i = 0; i < this.debrisState.length; i++) {
      this.debrisState[i].t = 0;
      _m.makeScale(0, 0, 0);
      this.debris.setMatrixAt(i, _m);
    }
    this.debris.instanceMatrix.needsUpdate = true;
  }

  dispose(): void {
    this.group.removeFromParent();
    this.add.dispose();
    this.smoke.dispose();
    this.geos.forEach((g) => g.dispose());
    this.mats.forEach((m) => m.dispose());
  }
}
