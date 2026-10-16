import * as THREE from 'three';

/** Pooled world-space particles drawn as one Points object (per-vertex RGBA). */
class Pool {
  readonly points: THREE.Points;
  private pos: Float32Array;
  private col: Float32Array;
  private vel: Float32Array;
  private life: Float32Array;
  private max: Float32Array;
  private base: Float32Array;
  private next = 0;
  private live = 0;

  constructor(readonly size: number, map: THREE.Texture, pointSize: number, additive: boolean, private gravity: number, private drag: number, private grow: number) {
    this.pos = new Float32Array(size * 3);
    this.col = new Float32Array(size * 4);
    this.vel = new Float32Array(size * 3);
    this.life = new Float32Array(size);
    this.max = new Float32Array(size);
    this.base = new Float32Array(size * 4);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    const m = new THREE.PointsMaterial({
      size: pointSize, map, vertexColors: true, transparent: true, depthWrite: false, sizeAttenuation: true,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.points = new THREE.Points(g, m);
    this.points.frustumCulled = false;
    this.points.renderOrder = 6;
  }

  spawn(x: number, y: number, z: number, vx: number, vy: number, vz: number, life: number, r: number, g: number, b: number, a: number): void {
    const i = this.next;
    this.next = (this.next + 1) % this.size;
    this.pos[i * 3] = x;
    this.pos[i * 3 + 1] = y;
    this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx;
    this.vel[i * 3 + 1] = vy;
    this.vel[i * 3 + 2] = vz;
    this.life[i] = life;
    this.max[i] = life;
    this.base[i * 4] = r;
    this.base[i * 4 + 1] = g;
    this.base[i * 4 + 2] = b;
    this.base[i * 4 + 3] = a;
    this.live = this.size;
  }

  update(dt: number): void {
    if (!this.live) return;
    let any = 0;
    const k = Math.exp(-this.drag * dt);
    for (let i = 0; i < this.size; i++) {
      if (this.life[i] <= 0) {
        this.col[i * 4 + 3] = 0;
        continue;
      }
      any++;
      this.life[i] -= dt;
      const t = Math.max(0, this.life[i] / this.max[i]);
      this.vel[i * 3] *= k;
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * k - this.gravity * dt;
      this.vel[i * 3 + 2] *= k;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      this.col[i * 4] = this.base[i * 4];
      this.col[i * 4 + 1] = this.base[i * 4 + 1];
      this.col[i * 4 + 2] = this.base[i * 4 + 2];
      this.col[i * 4 + 3] = this.base[i * 4 + 3] * (this.grow > 0 ? t * (1 - t) * 4 : t);
    }
    if (!any) this.live = 0;
    const g = this.points.geometry;
    g.attributes.position.needsUpdate = true;
    g.attributes.color.needsUpdate = true;
  }

  clear(): void {
    this.life.fill(0);
    this.col.fill(0);
    this.points.geometry.attributes.color.needsUpdate = true;
    this.live = 0;
  }

  dispose(): void {
    this.points.geometry.dispose();
    (this.points.material as THREE.Material).dispose();
    this.points.removeFromParent();
  }
}

export class Fx3D {
  readonly group = new THREE.Group();
  readonly sparks: Pool;
  readonly mist: Pool;
  readonly streaks: THREE.LineSegments;
  private sp: Float32Array;
  private streakState: { x: number; y: number; z: number; len: number }[] = [];
  private streakMat: THREE.LineBasicMaterial;

  constructor(glow: THREE.Texture, smoke: THREE.Texture) {
    this.sparks = new Pool(220, glow, 0.22, true, 9.8, 1.2, 0);
    this.mist = new Pool(260, smoke, 1.25, false, -0.4, 1.6, 1);
    this.group.add(this.sparks.points, this.mist.points);
    const N = 70;
    this.sp = new Float32Array(N * 6);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.sp, 3).setUsage(THREE.DynamicDrawUsage));
    this.streakMat = new THREE.LineBasicMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    this.streaks = new THREE.LineSegments(g, this.streakMat);
    this.streaks.frustumCulled = false;
    this.streaks.renderOrder = 8;
    for (let i = 0; i < N; i++) this.streakState.push(this.newStreak(true));
  }

  private newStreak(anywhere: boolean): { x: number; y: number; z: number; len: number } {
    // a ring around the view axis, never through the centre of the screen
    const side = Math.random() < 0.5 ? -1 : 1;
    return { x: side * (3.2 + Math.random() * 5), y: -1.6 + Math.random() * 3.6, z: anywhere ? -Math.random() * 60 : -60 - Math.random() * 10, len: 1.2 + Math.random() * 2.4 };
  }

  /** Camera-space streaks; `amt` 0..1 controls length and opacity. */
  updateStreaks(dt: number, speed: number, amt: number, boost: number): void {
    this.streakMat.opacity = Math.min(0.2, amt * 0.18);
    this.streakMat.color.setRGB(0.7 + boost * 0.2, 0.85 + boost * 0.1, 1);
    this.streaks.visible = amt > 0.02;
    if (!this.streaks.visible) return;
    const v = speed * (1.6 + boost);
    for (let i = 0; i < this.streakState.length; i++) {
      const s = this.streakState[i];
      s.z += v * dt;
      if (s.z > 2) this.streakState[i] = this.newStreak(false);
      const q = this.streakState[i];
      const len = q.len * (0.3 + amt * 0.9) * (1 + boost * 0.6);
      this.sp[i * 6] = q.x;
      this.sp[i * 6 + 1] = q.y;
      this.sp[i * 6 + 2] = q.z;
      this.sp[i * 6 + 3] = q.x;
      this.sp[i * 6 + 4] = q.y;
      this.sp[i * 6 + 5] = q.z - len;
    }
    this.streaks.geometry.attributes.position.needsUpdate = true;
  }

  update(dt: number): void {
    this.sparks.update(dt);
    this.mist.update(dt);
  }

  clear(): void {
    this.sparks.clear();
    this.mist.clear();
  }

  dispose(): void {
    this.sparks.dispose();
    this.mist.dispose();
    this.streaks.geometry.dispose();
    this.streakMat.dispose();
    this.streaks.removeFromParent();
    this.group.removeFromParent();
  }
}
