import * as THREE from 'three';
import { BRIDGE_THICKNESS, rampHeight } from '../sim/collision.ts';
import type { ArenaDef, Box, Decor, SurfaceMat } from '../sim/types.ts';
import type { ControlPointState, PickupState } from '../sim/world.ts';
import { bar, merge, MeshBatcher, prism, worldBox } from './geometry.ts';
import { MaterialSet, PALETTE, timeUniform, type GlowColor } from './materials.ts';
import { glowTexture, signTexture } from './textures.ts';
import type { QualityPreset } from './quality.ts';

const CONTAINER_MATS = new Set<SurfaceMat>(['containerCyan', 'containerMagenta', 'containerSteel', 'containerAmber']);

interface PickupView {
  group: THREE.Group;
  icon: THREE.Object3D;
  ring: THREE.Mesh;
  ringMat: THREE.MeshBasicMaterial;
  baseY: number;
}

/**
 * Builds the Three.js scene for an arena from its sim definition: merged static
 * geometry per material, neon trims, ramps, decor (signs, cranes, holograms,
 * lights), the control point and pickup stations. Animated each frame.
 */
export class ArenaView {
  readonly group = new THREE.Group();
  private readonly mats: MaterialSet;
  private readonly geos: THREE.BufferGeometry[] = [];
  private readonly spin: Array<{ obj: THREE.Object3D; speed: number; axis: 'y' | 'z' }> = [];
  private readonly blinkers: THREE.Sprite[] = [];
  private readonly pickups: PickupView[] = [];
  private cpRingMat: THREE.ShaderMaterial | null = null;
  private cpBeamMat: THREE.ShaderMaterial | null = null;
  private readonly arena: ArenaDef;

  constructor(arena: ArenaDef, env: THREE.Texture | null, quality: QualityPreset, showControlPoint: boolean) {
    this.arena = arena;
    this.mats = new MaterialSet(env);
    this.group.name = `arena:${arena.id}`;
    this.buildStatic(quality);
    this.buildSky();
    for (const d of arena.decor) this.buildDecor(d, quality);
    this.buildSpawnPads();
    if (showControlPoint) this.buildControlPoint();
    this.buildPickups();
  }

  private track<T extends THREE.BufferGeometry>(g: T): T {
    this.geos.push(g);
    return g;
  }

  private buildStatic(q: QualityPreset): void {
    const a = this.arena;
    const batch = new MeshBatcher();
    const glow = new MeshBatcher();

    // Ground slab (extends under the boundary walls).
    const gsize = a.half + 2;
    batch.add(this.mats.surface('floor'), worldBox(-gsize, -0.5, -gsize, gsize, 0, gsize, 12));

    for (const b of a.boxes) {
      if (b.hidden) continue;
      const isContainer = CONTAINER_MATS.has(b.mat);
      const tile = isContainer ? 3 : b.mat === 'concrete' ? 2 : 4;
      const tileV = isContainer ? 2.6 : b.mat === 'concrete' ? 1.3 : tile;
      if (b.mat === 'barrier') {
        const m = new THREE.Mesh(this.track(worldBox(b.minX, b.minY, b.minZ, b.maxX, b.maxY, b.maxZ, 1)), this.mats.surface('barrier'));
        m.renderOrder = 2;
        this.group.add(m);
        // Emitter posts at each end.
        const long = b.maxX - b.minX > b.maxZ - b.minZ;
        const ends: Array<[number, number]> = long ? [[b.minX, (b.minZ + b.maxZ) / 2], [b.maxX, (b.minZ + b.maxZ) / 2]] : [[(b.minX + b.maxX) / 2, b.minZ], [(b.minX + b.maxX) / 2, b.maxZ]];
        for (const [x, z] of ends) {
          batch.add(this.mats.surface('darkMetal'), worldBox(x - 0.35, 0, z - 0.35, x + 0.35, b.maxY + 0.3, z + 0.35));
          glow.add(this.mats.glow('cyan', 2.6), worldBox(x - 0.4, b.maxY + 0.1, z - 0.4, x + 0.4, b.maxY + 0.25, z + 0.4));
        }
        continue;
      }
      batch.add(this.mats.surface(b.mat), worldBox(b.minX, b.minY, b.minZ, b.maxX, b.maxY, b.maxZ, tile, tileV));
      if (b.trim && b.trim !== 'none') this.addTrim(glow, b, b.trim);
      if ((b.mat === 'labDark' || b.mat === 'lab') && b.maxY - b.minY >= 6) this.addWindows(glow, b);
      if (isContainer) this.addContainerFrame(batch, b);
    }

    for (const r of a.ramps) {
      const cx = [r.minX, r.minX, r.maxX, r.maxX];
      const cz = [r.minZ, r.maxZ, r.maxZ, r.minZ];
      const top = cx.map((x, i) => rampHeight(r, x, cz[i]));
      const bottom = r.bridge ? top.map((h) => h - BRIDGE_THICKNESS) : [0, 0, 0, 0];
      batch.add(this.mats.surface(r.mat), prism(cx, cz, top, bottom, 4));
      // Glowing chevron strips along the ramp edges.
      const color: GlowColor = r.bridge ? 'cyan' : 'amber';
      const yOff = 0.06;
      if (r.axis === 'x') {
        for (const z of [r.minZ + 0.25, r.maxZ - 0.25]) {
          const g = bar(r.minX, z, r.maxX, z, 0, 0.18, 0.08);
          tiltBar(g, r.minX, r.maxX, rampHeight(r, r.minX, z) + yOff, rampHeight(r, r.maxX, z) + yOff, 'x');
          glow.add(this.mats.glow(color, 2), g);
        }
      } else {
        for (const x of [r.minX + 0.25, r.maxX - 0.25]) {
          const g = bar(x, r.minZ, x, r.maxZ, 0, 0.18, 0.08);
          tiltBar(g, r.minZ, r.maxZ, rampHeight(r, x, r.minZ) + yOff, rampHeight(r, x, r.maxZ) + yOff, 'z');
          glow.add(this.mats.glow(color, 2), g);
        }
      }
    }

    // Boundary energy fence above the walls.
    const fenceH = 4;
    const wallTop = a.boxes.find((b) => b.mat === 'boundary')?.maxY ?? 6;
    const fence = new THREE.Group();
    const fm = this.mats.surface('barrier');
    for (const [x0, z0, x1, z1] of [[-a.half, -a.half, a.half, -a.half], [-a.half, a.half, a.half, a.half], [-a.half, -a.half, -a.half, a.half], [a.half, -a.half, a.half, a.half]]) {
      const len = Math.hypot(x1 - x0, z1 - z0);
      const plane = new THREE.Mesh(this.track(new THREE.PlaneGeometry(len, fenceH)), fm);
      plane.position.set((x0 + x1) / 2, wallTop + fenceH / 2, (z0 + z1) / 2);
      plane.rotation.y = Math.atan2(x1 - x0, z1 - z0) + Math.PI / 2;
      plane.renderOrder = 2;
      fence.add(plane);
    }
    this.group.add(fence);

    batch.build(this.group, { cast: q.shadows, receive: q.shadows });
    glow.build(this.group, { cast: false, receive: false });
  }

  /** Neon edge strips around the top of a box. */
  private addTrim(glow: MeshBatcher, b: Box, color: 'cyan' | 'magenta' | 'amber'): void {
    const m = this.mats.glow(color, 2.4);
    const y = b.maxY - 0.08;
    const t = 0.14, o = 0.03;
    glow.add(m, worldBox(b.minX - o, y - t, b.minZ - o, b.maxX + o, y, b.minZ - o + t));
    glow.add(m, worldBox(b.minX - o, y - t, b.maxZ + o - t, b.maxX + o, y, b.maxZ + o));
    glow.add(m, worldBox(b.minX - o, y - t, b.minZ - o, b.minX - o + t, y, b.maxZ + o));
    glow.add(m, worldBox(b.maxX + o - t, y - t, b.minZ - o, b.maxX + o, y, b.maxZ + o));
  }

  /** Rows of lit windows on tall facility blocks. */
  private addWindows(glow: MeshBatcher, b: Box): void {
    const m = this.mats.glow(0x9fe8ff, 1.3);
    const o = 0.04;
    for (const frac of [0.38, 0.7]) {
      const y0 = b.minY + (b.maxY - b.minY) * frac;
      const y1 = y0 + 0.7;
      for (let x = b.minX + 1; x < b.maxX - 1.5; x += 2.4) {
        glow.add(m, worldBox(x, y0, b.minZ - o, x + 1.4, y1, b.minZ));
        glow.add(m, worldBox(x, y0, b.maxZ, x + 1.4, y1, b.maxZ + o));
      }
      for (let z = b.minZ + 1; z < b.maxZ - 1.5; z += 2.4) {
        glow.add(m, worldBox(b.minX - o, y0, z, b.minX, y1, z + 1.4));
        glow.add(m, worldBox(b.maxX, y0, z, b.maxX + o, y1, z + 1.4));
      }
    }
  }

  /** Corner posts on containers so stacks read as separate units. */
  private addContainerFrame(batch: MeshBatcher, b: Box): void {
    const m = this.mats.surface('trim');
    const t = 0.16;
    for (const [x, z] of [[b.minX, b.minZ], [b.maxX - t, b.minZ], [b.minX, b.maxZ - t], [b.maxX - t, b.maxZ - t]]) {
      batch.add(m, worldBox(x - 0.02, b.minY, z - 0.02, x + t + 0.02, b.maxY, z + t + 0.02));
    }
  }

  private buildSky(): void {
    const a = this.arena;
    const mat = this.mats.track(new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: { uTop: { value: new THREE.Color(a.sky.top) }, uBottom: { value: new THREE.Color(a.sky.bottom) }, uTime: timeUniform },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uTop;
        uniform vec3 uBottom;
        uniform float uTime;
        varying vec3 vDir;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        void main() {
          float h = vDir.y;
          vec3 c = mix(uBottom, uTop, smoothstep(-0.05, 0.55, h));
          // Horizon haze band.
          c += vec3(0.05, 0.09, 0.16) * exp(-abs(h) * 14.0);
          // Stars.
          vec2 g = floor(vDir.xz / max(0.15, h + 0.2) * 220.0);
          float s = step(0.996, hash(g)) * smoothstep(0.1, 0.5, h);
          c += vec3(0.7, 0.8, 1.0) * s * (0.6 + 0.4 * sin(uTime * 2.0 + hash(g) * 30.0));
          gl_FragColor = vec4(c, 1.0);
        }`,
    }));
    const sky = new THREE.Mesh(this.track(new THREE.SphereGeometry(900, 32, 16)), mat);
    sky.renderOrder = -10;
    sky.frustumCulled = false;
    this.group.add(sky);

    // Distant skyline: one instanced draw for the whole ring of towers.
    const count = 110;
    const geo = this.track(new THREE.BoxGeometry(1, 1, 1));
    geo.translate(0, 0.5, 0);
    const towerMat = this.mats.track(new THREE.MeshBasicMaterial({ color: 0x0b1020, fog: true }));
    const towers = new THREE.InstancedMesh(geo, towerMat, count);
    const lights = new THREE.InstancedMesh(geo, this.mats.glow(0x58c8ff, 1.2), count);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();
    let seed = a.id === 'docks' ? 3 : 9;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < count; i++) {
      const ang = (i / count) * Math.PI * 2 + rnd() * 0.05;
      const dist = 190 + rnd() * 160;
      const w = 10 + rnd() * 22;
      const h = 25 + rnd() * rnd() * 140;
      p.set(Math.sin(ang) * dist, -2, Math.cos(ang) * dist);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), ang);
      s.set(w, h, w * (0.6 + rnd() * 0.8));
      m.compose(p, q, s);
      towers.setMatrixAt(i, m);
      // A lit crown band near the top.
      p.y = -2 + h * (0.82 + rnd() * 0.12);
      s.set(w * 1.02, 0.8 + rnd() * 1.5, s.z * 1.02);
      m.compose(p, q, s);
      lights.setMatrixAt(i, m);
      lights.setColorAt(i, new THREE.Color(rnd() < 0.5 ? PALETTE.cyan : rnd() < 0.5 ? PALETTE.magenta : 0x8f7dff).multiplyScalar(1.4));
    }
    this.group.add(towers, lights);
  }

  private buildDecor(d: Decor, q: QualityPreset): void {
    switch (d.kind) {
      case 'sign': {
        const color = '#' + PALETTE[d.color].toString(16).padStart(6, '0');
        const mat = this.mats.track(new THREE.MeshBasicMaterial({ map: signTexture(d.text, color), toneMapped: false, color: new THREE.Color(1.5, 1.5, 1.5) }));
        const plane = new THREE.Mesh(this.track(new THREE.PlaneGeometry(d.w, d.h)), mat);
        plane.position.set(d.x, d.y, d.z);
        plane.rotation.y = d.yaw;
        this.group.add(plane);
        break;
      }
      case 'light': {
        const lamp = this.sprite(PALETTE[d.color], 2.2, 0.9);
        lamp.position.set(d.x, d.y, d.z);
        this.group.add(lamp);
        if (q.maxLights > 0 && this.group.children.filter((c) => (c as THREE.PointLight).isPointLight).length < q.maxLights) {
          const l = new THREE.PointLight(PALETTE[d.color], d.intensity * 14, d.range * 1.6, 1.6);
          l.position.set(d.x, d.y, d.z);
          this.group.add(l);
        }
        break;
      }
      case 'holo': {
        const g = new THREE.Group();
        g.position.set(d.x, d.y, d.z);
        const m = this.mats.glow(d.color, 1.8);
        for (let i = 0; i < 3; i++) {
          const ring = new THREE.Mesh(this.track(new THREE.TorusGeometry(d.r * (0.35 + i * 0.12), 0.05, 6, 64)), m);
          ring.position.y = 4 + i * 0.9;
          ring.rotation.x = Math.PI / 2;
          g.add(ring);
          this.spin.push({ obj: ring, speed: (i % 2 ? -1 : 1) * (0.4 + i * 0.25), axis: 'z' });
        }
        const core = new THREE.Mesh(this.track(new THREE.OctahedronGeometry(0.8, 0)), this.mats.glow(d.color, 2.6));
        core.position.y = 5;
        g.add(core);
        this.spin.push({ obj: core, speed: 1.2, axis: 'y' });
        this.group.add(g);
        break;
      }
      case 'strip': {
        const g = bar(d.x0, d.z0, d.x1, d.z1, d.y, d.w ?? 0.16, 0.08);
        this.group.add(this.staticMesh(g, this.mats.glow(d.color, 2.2)));
        break;
      }
      case 'crane': {
        const steel = this.mats.surface('darkMetal');
        const span = 62;
        const parts = [
          worldBox(d.x - 0.9, d.h, d.z - span / 2 - 1, d.x + 0.9, d.h + 1.8, d.z + span / 2 + 1),
          worldBox(d.x - 0.5, d.h + 1.8, d.z - 6, d.x + 0.5, d.h + 9, d.z - 4.5),
          worldBox(d.x - 1.6, d.h - 3, d.z - 2, d.x + 1.6, d.h, d.z + 2),
          // Boom reaching over the arena.
          worldBox(Math.min(d.x, d.x - 34 * Math.sign(d.x || 1)), d.h + 1.8, d.z - 0.7, Math.max(d.x, d.x - 34 * Math.sign(d.x || 1)), d.h + 3, d.z + 0.7),
          // Hanging container well above the playfield.
          worldBox(d.x - 20 * Math.sign(d.x || 1) - 3, 12.5, d.z - 1.25, d.x - 20 * Math.sign(d.x || 1) + 3, 15.1, d.z + 1.25),
        ];
        const g = merge(parts)!;
        const mesh = this.staticMesh(g, steel);
        mesh.castShadow = q.shadows;
        this.group.add(mesh);
        const cable = merge([
          worldBox(d.x - 20 * Math.sign(d.x || 1) - 2, 15.1, d.z - 0.05, d.x - 20 * Math.sign(d.x || 1) - 1.9, d.h + 1.8, d.z + 0.05),
          worldBox(d.x - 20 * Math.sign(d.x || 1) + 1.9, 15.1, d.z - 0.05, d.x - 20 * Math.sign(d.x || 1) + 2, d.h + 1.8, d.z + 0.05),
        ])!;
        this.group.add(this.staticMesh(cable, this.mats.surface('trim')));
        this.group.add(this.staticMesh(bar(d.x, d.z - span / 2, d.x, d.z + span / 2, d.h - 0.05, 0.25, 0.1), this.mats.glow('amber', 2)));
        for (const z of [d.z - span / 2, d.z + span / 2, d.z]) {
          const s = this.sprite(PALETTE.red, 1.6, 1);
          s.position.set(d.x, d.h + 2.4, z);
          this.blinkers.push(s);
          this.group.add(s);
        }
        break;
      }
      case 'pylon': {
        const g = merge([worldBox(d.x - 0.3, 0, d.z - 0.3, d.x + 0.3, d.h, d.z + 0.3)])!;
        this.group.add(this.staticMesh(g, this.mats.surface('darkMetal')));
        this.group.add(this.staticMesh(worldBox(d.x - 0.36, d.h - 3, d.z - 0.36, d.x + 0.36, d.h - 2.7, d.z + 0.36), this.mats.glow(d.color, 2.4)));
        const s = this.sprite(PALETTE[d.color], 3.5, 0.9);
        s.position.set(d.x, d.h + 0.4, d.z);
        this.group.add(s);
        break;
      }
      case 'water': {
        const mat = this.mats.track(new THREE.MeshStandardMaterial({ color: 0x03101c, roughness: 0.12, metalness: 0.9, envMapIntensity: 1.4 }));
        const water = new THREE.Mesh(this.track(new THREE.PlaneGeometry(1400, 1400)), mat);
        water.rotation.x = -Math.PI / 2;
        water.position.y = d.y;
        this.group.add(water);
        break;
      }
    }
  }

  private buildSpawnPads(): void {
    const s = this.arena.spawns;
    const add = (list: typeof s.blue, color: GlowColor) => {
      for (const p of list) {
        const ring = new THREE.Mesh(this.track(new THREE.RingGeometry(2.4, 2.65, 40)), this.mats.glow(color, 1.6));
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(p.x, 0.04, p.z);
        this.group.add(ring);
      }
    };
    add(s.blue, 'blue');
    add(s.magenta, 'magenta');
  }

  private buildControlPoint(): void {
    const cp = this.arena.controlPoint;
    this.cpRingMat = this.mats.track(new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: timeUniform, uProgress: { value: 0 }, uColor: { value: new THREE.Color(PALETTE.white) }, uFill: { value: new THREE.Color(PALETTE.blue) }, uContested: { value: 0 } },
      vertexShader: /* glsl */ `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform float uTime; uniform float uProgress; uniform vec3 uColor; uniform vec3 uFill; uniform float uContested;
        varying vec2 vUv;
        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float r = length(p);
          if (r > 1.0) discard;
          float ang = atan(p.x, p.y) / 6.28318 + 0.5;
          float rim = smoothstep(0.9, 0.96, r) * (1.0 - smoothstep(0.985, 1.0, r));
          float fill = step(ang, abs(uProgress)) * smoothstep(0.8, 0.86, r) * (1.0 - smoothstep(0.88, 0.9, r));
          float grid = (step(0.96, fract(r * 8.0 - uTime * 0.4)) * 0.25 + 0.04) * (1.0 - r * 0.6);
          float pulse = 0.75 + 0.25 * sin(uTime * (3.0 + uContested * 9.0));
          vec3 c = uColor * (rim * 1.6 + grid) * pulse + uFill * fill * 2.0;
          gl_FragColor = vec4(c, max(rim, max(fill, grid)) * 0.9);
        }`,
    }));
    const disc = new THREE.Mesh(this.track(new THREE.PlaneGeometry(cp.r * 2, cp.r * 2)), this.cpRingMat);
    disc.rotation.x = -Math.PI / 2;
    disc.position.set(cp.x, cp.y + 0.05, cp.z);
    disc.renderOrder = 3;
    this.group.add(disc);

    this.cpBeamMat = this.mats.track(new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: timeUniform, uColor: { value: new THREE.Color(PALETTE.white) } },
      vertexShader: /* glsl */ `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
        void main() {
          float a = (1.0 - vUv.y) * 0.22 * (0.7 + 0.3 * sin(vUv.y * 30.0 - uTime * 3.0));
          gl_FragColor = vec4(uColor * 1.4, a);
        }`,
    }));
    const beam = new THREE.Mesh(this.track(new THREE.CylinderGeometry(cp.r * 0.96, cp.r, 7, 48, 1, true)), this.cpBeamMat);
    beam.position.set(cp.x, cp.y + 3.5, cp.z);
    beam.renderOrder = 3;
    this.group.add(beam);
  }

  private buildPickups(): void {
    for (const p of this.arena.pickups) {
      const g = new THREE.Group();
      g.position.set(p.x, p.y, p.z);
      const color = p.kind === 'repair' ? PALETTE.green : p.kind === 'overdrive' ? PALETTE.amber : PALETTE.cyan;
      const pad = this.staticMesh(new THREE.CylinderGeometry(2, 2.2, 0.18, 24), this.mats.surface('darkMetal'));
      pad.position.y = 0.09;
      pad.updateMatrix();
      g.add(pad);
      const ringMat = this.mats.track(new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(2), toneMapped: false, transparent: true }));
      const ring = new THREE.Mesh(this.track(new THREE.RingGeometry(1.6, 1.9, 32)), ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.2;
      g.add(ring);
      const icon = new THREE.Group();
      const im = this.mats.glow(color, 2.2);
      if (p.kind === 'repair') {
        icon.add(new THREE.Mesh(this.track(new THREE.BoxGeometry(1.1, 0.35, 0.35)), im));
        icon.add(new THREE.Mesh(this.track(new THREE.BoxGeometry(0.35, 1.1, 0.35)), im));
      } else if (p.kind === 'overdrive') {
        icon.add(new THREE.Mesh(this.track(new THREE.OctahedronGeometry(0.6, 0)), im));
        const sp = new THREE.Mesh(this.track(new THREE.TorusGeometry(0.85, 0.05, 6, 24)), im);
        icon.add(sp);
      } else {
        for (let i = 0; i < 2; i++) {
          const c = new THREE.Mesh(this.track(new THREE.ConeGeometry(0.45, 0.6, 4)), im);
          c.position.y = i * 0.5 - 0.25;
          icon.add(c);
        }
      }
      const halo = this.sprite(color, 3, 0.5);
      icon.add(halo);
      icon.position.y = 1.6;
      g.add(icon);
      this.group.add(g);
      this.pickups.push({ group: g, icon, ring, ringMat, baseY: 1.6 });
    }
  }

  private sprite(color: number, size: number, opacity: number): THREE.Sprite {
    const mat = this.mats.track(new THREE.SpriteMaterial({ map: glowTexture(), color: new THREE.Color(color).multiplyScalar(1.6), transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    const s = new THREE.Sprite(mat);
    s.scale.set(size, size, 1);
    return s;
  }

  private staticMesh(g: THREE.BufferGeometry, m: THREE.Material): THREE.Mesh {
    this.track(g);
    const mesh = new THREE.Mesh(g, m);
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    return mesh;
  }

  update(time: number, cp: ControlPointState | null, pickups: PickupState[] | null): void {
    for (const s of this.spin) {
      if (s.axis === 'y') s.obj.rotation.y = time * s.speed;
      else s.obj.rotation.z = time * s.speed;
    }
    const blink = Math.sin(time * 3) > 0.2 ? 1 : 0.15;
    for (const b of this.blinkers) (b.material as THREE.SpriteMaterial).opacity = blink;
    if (cp && this.cpRingMat && this.cpBeamMat) {
      const u = this.cpRingMat.uniforms;
      u.uProgress.value = Math.abs(cp.progress);
      (u.uFill.value as THREE.Color).setHex(cp.progress >= 0 ? PALETTE.blue : PALETTE.magenta);
      const ownerColor = cp.owner === 'blue' ? PALETTE.blue : cp.owner === 'magenta' ? PALETTE.magenta : PALETTE.white;
      (u.uColor.value as THREE.Color).setHex(ownerColor);
      u.uContested.value = cp.contested ? 1 : 0;
      (this.cpBeamMat.uniforms.uColor.value as THREE.Color).setHex(ownerColor);
    }
    if (pickups) {
      for (let i = 0; i < this.pickups.length; i++) {
        const v = this.pickups[i];
        const st = pickups[i];
        v.icon.visible = st.active;
        v.icon.position.y = v.baseY + Math.sin(time * 2 + i) * 0.25;
        v.icon.rotation.y = time * 1.4 + i;
        v.ringMat.opacity = st.active ? 0.9 : 0.25;
      }
    }
  }

  dispose(): void {
    this.group.removeFromParent();
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry && !this.geos.includes(m.geometry)) this.geos.push(m.geometry);
    });
    this.geos.forEach((g) => g.dispose());
    this.mats.dispose();
  }
}

/** Shears a flat bar so it follows a ramp's slope between two heights. */
function tiltBar(g: THREE.BufferGeometry, a0: number, a1: number, h0: number, h1: number, axis: 'x' | 'z'): void {
  const pos = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const a = axis === 'x' ? pos.getX(i) : pos.getZ(i);
    const t = (a - a0) / (a1 - a0);
    pos.setY(i, pos.getY(i) + h0 + (h1 - h0) * t);
  }
  pos.needsUpdate = true;
  g.computeVertexNormals();
}
