import * as THREE from 'three';
import { additive, createGlowTexture } from '../world/Materials';

interface Tracer {
  mesh: THREE.Mesh;
  ax: number; ay: number; az: number;
  bx: number; by: number; bz: number;
  len: number;
  travelled: number;
  speed: number;
  life: number;
  maxLife: number;
  width: number;
  boltLength: number;
}

interface Flash {
  sprite: THREE.Sprite;
  life: number;
}

interface Beam {
  mesh: THREE.Mesh;
  life: number;
  maxLife: number;
}

interface Ring {
  mesh: THREE.Mesh;
  life: number;
  maxLife: number;
  size: number;
}

const _dir = new THREE.Vector3();
const _mid = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _z = new THREE.Vector3(0, 0, 1);

/**
 * Pooled one-shot visuals: bullet tracers / energy bolts, muzzle flashes,
 * spawn beams and shockwave rings. A single muzzle PointLight exists from the
 * start so the scene's light count never changes (no shader recompiles).
 */
export class VisualEffects {
  readonly group = new THREE.Group();
  private readonly tracers: Tracer[] = [];
  private readonly flashes: Flash[] = [];
  private readonly beams: Beam[] = [];
  private readonly rings: Ring[] = [];
  readonly muzzleLight = new THREE.PointLight(0xff4fd8, 0, 7, 2);
  private muzzleLife = 0;
  private readonly glow = createGlowTexture();
  private readonly box = new THREE.BoxGeometry(1, 1, 1);

  constructor() {
    for (let i = 0; i < 48; i++) {
      const mesh = new THREE.Mesh(this.box, additive(0xffffff, null, 1));
      mesh.visible = false;
      mesh.renderOrder = 6;
      this.group.add(mesh);
      this.tracers.push({ mesh, ax: 0, ay: 0, az: 0, bx: 0, by: 0, bz: 0, len: 0, travelled: 0, speed: 0, life: 0, maxLife: 0, width: 0, boltLength: 0 });
    }
    for (let i = 0; i < 8; i++) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.glow, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, transparent: true }));
      sprite.visible = false;
      sprite.renderOrder = 7;
      this.group.add(sprite);
      this.flashes.push({ sprite, life: 0 });
    }
    const beamGeo = new THREE.CylinderGeometry(0.6, 1.2, 60, 16, 1, true).translate(0, 30, 0);
    for (let i = 0; i < 8; i++) {
      const mesh = new THREE.Mesh(beamGeo, additive(0xffffff, null, 0.5));
      (mesh.material as THREE.MeshBasicMaterial).side = THREE.DoubleSide;
      mesh.visible = false;
      this.group.add(mesh);
      this.beams.push({ mesh, life: 0, maxLife: 1 });
    }
    const ringGeo = new THREE.RingGeometry(0.8, 1, 40).rotateX(-Math.PI / 2);
    for (let i = 0; i < 8; i++) {
      const mesh = new THREE.Mesh(ringGeo, additive(0xffffff, null, 1));
      (mesh.material as THREE.MeshBasicMaterial).side = THREE.DoubleSide;
      mesh.visible = false;
      this.group.add(mesh);
      this.rings.push({ mesh, life: 0, maxLife: 1, size: 1 });
    }
    this.group.add(this.muzzleLight);
  }

  /**
   * Tracer from a to b. With `speed` set, a bright bolt of `boltLength`
   * travels the path (energy rounds); otherwise the full beam fades out.
   */
  tracer(a: THREE.Vector3, b: THREE.Vector3, color: THREE.Color, width: number, speed = 0, boltLength = 2.5): void {
    const t = this.tracers.find((x) => x.life <= 0) ?? this.tracers[0];
    t.ax = a.x; t.ay = a.y; t.az = a.z;
    t.bx = b.x; t.by = b.y; t.bz = b.z;
    t.len = a.distanceTo(b);
    t.travelled = 0;
    t.speed = speed;
    t.width = width;
    t.boltLength = boltLength;
    t.maxLife = speed > 0 ? t.len / speed + 0.05 : 0.09;
    t.life = t.maxLife;
    (t.mesh.material as THREE.MeshBasicMaterial).color.copy(color).multiplyScalar(2.2);
    t.mesh.visible = true;
  }

  /** @param dir firing direction; the light sits just ahead of the barrel so it doesn't blow out the shooter. */
  muzzleFlash(pos: THREE.Vector3, dir: THREE.Vector3, color: THREE.Color, size: number): void {
    const f = this.flashes.find((x) => x.life <= 0) ?? this.flashes[0];
    f.sprite.position.copy(pos);
    f.sprite.scale.setScalar(size * (0.8 + Math.random() * 0.4));
    f.sprite.material.color.copy(color).multiplyScalar(1.5);
    f.sprite.material.rotation = Math.random() * Math.PI;
    f.sprite.visible = true;
    f.life = 0.05;
    this.muzzleLight.position.copy(pos).addScaledVector(dir, 0.6);
    this.muzzleLight.color.copy(color);
    this.muzzleLight.intensity = 3.5;
    this.muzzleLife = 0.06;
  }

  spawnBeam(x: number, z: number, color: THREE.Color): void {
    const b = this.beams.find((x) => x.life <= 0) ?? this.beams[0];
    b.mesh.position.set(x, 0, z);
    (b.mesh.material as THREE.MeshBasicMaterial).color.copy(color).multiplyScalar(1.5);
    b.mesh.visible = true;
    b.maxLife = b.life = 0.9;
  }

  ring(x: number, y: number, z: number, color: THREE.Color, size: number, life = 0.45): void {
    const r = this.rings.find((x) => x.life <= 0) ?? this.rings[0];
    r.mesh.position.set(x, y, z);
    (r.mesh.material as THREE.MeshBasicMaterial).color.copy(color).multiplyScalar(2);
    r.mesh.visible = true;
    r.size = size;
    r.maxLife = r.life = life;
  }

  update(dt: number): void {
    for (const t of this.tracers) {
      if (t.life <= 0) continue;
      t.life -= dt;
      if (t.life <= 0) { t.mesh.visible = false; continue; }
      let s0: number, s1: number, alpha: number;
      if (t.speed > 0) {
        t.travelled += t.speed * dt;
        s1 = Math.min(t.len, t.travelled);
        s0 = Math.max(0, s1 - t.boltLength);
        alpha = 1;
      } else {
        s0 = 0; s1 = t.len;
        alpha = t.life / t.maxLife;
      }
      const segLen = s1 - s0;
      if (segLen < 0.01 || t.len < 0.01) { t.mesh.visible = false; continue; }
      _dir.set(t.bx - t.ax, t.by - t.ay, t.bz - t.az).divideScalar(t.len);
      _mid.set(t.ax, t.ay, t.az).addScaledVector(_dir, (s0 + s1) / 2);
      t.mesh.position.copy(_mid);
      t.mesh.quaternion.copy(_q.setFromUnitVectors(_z, _dir));
      t.mesh.scale.set(t.width, t.width, segLen);
      (t.mesh.material as THREE.MeshBasicMaterial).opacity = alpha;
    }
    for (const f of this.flashes) {
      if (f.life <= 0) continue;
      f.life -= dt;
      if (f.life <= 0) f.sprite.visible = false;
    }
    if (this.muzzleLife > 0) {
      this.muzzleLife -= dt;
      if (this.muzzleLife <= 0) this.muzzleLight.intensity = 0;
    }
    for (const b of this.beams) {
      if (b.life <= 0) continue;
      b.life -= dt;
      const t = b.life / b.maxLife;
      (b.mesh.material as THREE.MeshBasicMaterial).opacity = Math.sin(t * Math.PI) * 0.55;
      b.mesh.scale.set(0.4 + t, 1, 0.4 + t);
      if (b.life <= 0) b.mesh.visible = false;
    }
    for (const r of this.rings) {
      if (r.life <= 0) continue;
      r.life -= dt;
      const t = 1 - r.life / r.maxLife;
      r.mesh.scale.setScalar(0.3 + t * r.size);
      (r.mesh.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.9;
      if (r.life <= 0) r.mesh.visible = false;
    }
  }

  clear(): void {
    for (const t of this.tracers) { t.life = 0; t.mesh.visible = false; }
    for (const f of this.flashes) { f.life = 0; f.sprite.visible = false; }
    for (const b of this.beams) { b.life = 0; b.mesh.visible = false; }
    for (const r of this.rings) { r.life = 0; r.mesh.visible = false; }
    this.muzzleLight.intensity = 0;
  }
}

