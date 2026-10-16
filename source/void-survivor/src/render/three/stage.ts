// The set: procedural PMREM environment, obsidian floor, arena wall, the drop into the void and the dead-cabinet skyline.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { ARENA_HALF, ARENA_RADIUS } from '../../sim/entities.ts';
import type { ArenaId } from '../../sim/types.ts';
import { floorMaps, marqueeTexture } from './textures.ts';

/** A dark room with a few light strips, prefiltered into a PMREM environment for reflections. */
export function buildEnvironment(gl: THREE.WebGLRenderer, arena: ArenaId): THREE.WebGLRenderTarget {
  const scene = new THREE.Scene();
  const disposables: { dispose(): void }[] = [];
  const add = (geo: THREE.BufferGeometry, color: THREE.ColorRepresentation, k: number, x: number, y: number, z: number, ry = 0, rx = 0) => {
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: THREE.DoubleSide });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, 0);
    scene.add(m);
    disposables.push(geo, mat);
  };
  const room = new THREE.BoxGeometry(100, 50, 100);
  add(room, arena === 'foundry' ? 0x0d0806 : 0x06070c, 1, 0, 10, 0);
  const warm = arena === 'foundry';
  // long ceiling strips
  add(new THREE.PlaneGeometry(80, 2.2), warm ? 0xff8a3a : 0x35f2ff, warm ? 2.2 : 2.6, 0, 34.5, -12, 0, Math.PI / 2);
  add(new THREE.PlaneGeometry(80, 1.4), 0xff2e88, 1.8, 0, 34.5, 14, 0, Math.PI / 2);
  // wall panels
  add(new THREE.PlaneGeometry(26, 9), warm ? 0xffb066 : 0xd9a441, warm ? 1.6 : 1.1, -49.5, 16, 0, Math.PI / 2);
  add(new THREE.PlaneGeometry(40, 3), 0x8a5cff, 1.4, 0, 18, -49.5);
  add(new THREE.PlaneGeometry(30, 4), warm ? 0xff6a2a : 0x35f2ff, 1.0, 49.5, 10, 10, -Math.PI / 2);
  add(new THREE.PlaneGeometry(60, 6), 0x1b2240, 1.0, 0, 6, 49.5, Math.PI);
  const pmrem = new THREE.PMREMGenerator(gl);
  const rt = pmrem.fromScene(scene, 0.035);
  pmrem.dispose();
  disposables.forEach((d) => d.dispose());
  return rt;
}

export interface StageOpts {
  arena: ArenaId;
  planar: boolean;
  anisotropy: number;
  width: number;
  height: number;
}

export class Stage {
  readonly group = new THREE.Group();
  readonly arena: ArenaId;
  reflector: Reflector | null = null;
  private disposables: { dispose(): void }[] = [];
  private beacon: THREE.MeshBasicMaterial;
  private stripMat: THREE.MeshBasicMaterial;

  constructor(o: StageOpts) {
    this.arena = o.arena;
    const foundry = o.arena === 'foundry';
    const accent = new THREE.Color(foundry ? 0xff8a3a : 0x35f2ff);
    const keep = <T extends { dispose(): void }>(x: T): T => {
      this.disposables.push(x);
      return x;
    };

    // ---- floor
    const maps = floorMaps(foundry ? '#160d0a' : '#0c0e15', foundry ? 'rgba(255,150,80,0.20)' : 'rgba(130,160,255,0.17)');
    keep(maps.map);
    keep(maps.rough);
    maps.map.anisotropy = maps.rough.anisotropy = o.anisotropy;
    const size = foundry ? ARENA_RADIUS * 2 : ARENA_HALF * 2;
    maps.map.repeat.set(size / maps.tile, size / maps.tile);
    maps.rough.repeat.copy(maps.map.repeat);
    const floorMat = keep(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: maps.map,
        roughnessMap: maps.rough,
        roughness: 1,
        metalness: 0.55,
        envMapIntensity: 1.1,
        transparent: o.planar,
        opacity: o.planar ? 0.84 : 1,
      }),
    );
    const floorGeo = keep(foundry ? new THREE.CircleGeometry(ARENA_RADIUS, 128) : new THREE.PlaneGeometry(size, size));
    floorGeo.rotateX(-Math.PI / 2);
    if (foundry) {
      // CircleGeometry uv spans 0..1 over the diameter, same as the plane
    }
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.renderOrder = -10;
    this.group.add(floor);

    if (o.planar) {
      const rgeo = keep(foundry ? new THREE.CircleGeometry(ARENA_RADIUS, 96) : new THREE.PlaneGeometry(size, size));
      const ref = new Reflector(rgeo, {
        textureWidth: Math.max(256, Math.floor(o.width * 0.5)),
        textureHeight: Math.max(256, Math.floor(o.height * 0.5)),
        color: foundry ? 0x6a5a50 : 0x5a6070,
        clipBias: 0.003,
      });
      ref.rotateX(-Math.PI / 2);
      ref.position.y = -1.2;
      ref.renderOrder = -20;
      this.reflector = ref;
      this.group.add(ref);
    }

    // ---- wall with an emissive top strip, and the drop into the void below the platform edge
    const wallMat = keep(new THREE.MeshStandardMaterial({ color: 0x14161f, metalness: 0.8, roughness: 0.38 }));
    const cliffMat = keep(new THREE.MeshStandardMaterial({ color: 0x07080c, metalness: 0.4, roughness: 0.7 }));
    this.stripMat = keep(new THREE.MeshBasicMaterial({ color: accent.clone().multiplyScalar(2.2) }));
    const H = 34;
    if (foundry) {
      const R = ARENA_RADIUS + 14;
      const wall = keep(new THREE.CylinderGeometry(R, R, H, 128, 1, true));
      wall.translate(0, H / 2, 0);
      this.group.add(new THREE.Mesh(wall, keep(new THREE.MeshStandardMaterial({ color: 0x1a120e, metalness: 0.8, roughness: 0.4, side: THREE.DoubleSide }))));
      const strip = keep(new THREE.TorusGeometry(R - 4, 2.4, 4, 160));
      strip.rotateX(Math.PI / 2);
      strip.translate(0, H + 1, 0);
      this.group.add(new THREE.Mesh(strip, this.stripMat));
      const low = keep(new THREE.TorusGeometry(R - 6, 1.2, 4, 160));
      low.rotateX(Math.PI / 2);
      low.translate(0, 6, 0);
      this.group.add(new THREE.Mesh(low, this.stripMat));
      const cliff = keep(new THREE.CylinderGeometry(R + 20, R - 60, 700, 96, 1, true));
      cliff.translate(0, -350, 0);
      this.group.add(new THREE.Mesh(cliff, cliffMat));
    } else {
      const L = ARENA_HALF * 2 + 56;
      const T = 26;
      const seg = keep(new THREE.BoxGeometry(L, H, T));
      seg.translate(0, H / 2, 0);
      const strip = keep(new THREE.BoxGeometry(L - 40, 3, 4));
      const lowStrip = keep(new THREE.BoxGeometry(L - 40, 1.6, 2));
      const cliff = keep(new THREE.BoxGeometry(L + 40, 700, 40));
      cliff.translate(0, -350, 0);
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        const g = new THREE.Group();
        g.rotation.y = a;
        const off = ARENA_HALF + T / 2;
        const m = new THREE.Mesh(seg, wallMat);
        m.position.set(0, 0, off);
        const s = new THREE.Mesh(strip, this.stripMat);
        s.position.set(0, H + 1.5, off - T / 2 + 2);
        const s2 = new THREE.Mesh(lowStrip, this.stripMat);
        s2.position.set(0, 7, off - T / 2 - 0.5);
        const c = new THREE.Mesh(cliff, cliffMat);
        c.position.set(0, 0, off + 6);
        g.add(m, s, s2, c);
        this.group.add(g);
      }
      // corner pylons
      const pylon = keep(new THREE.BoxGeometry(60, 90, 60));
      pylon.translate(0, 45, 0);
      for (const [x, z] of [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ]) {
        const p = new THREE.Mesh(pylon, wallMat);
        p.position.set(x * (ARENA_HALF + 30), 0, z * (ARENA_HALF + 30));
        this.group.add(p);
      }
    }

    // ---- void skyline: dead arcade cabinets and pylons rising out of the fog at several depths
    let seed = foundry ? 91 : 17;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const towerGeo = keep(new THREE.BoxGeometry(1, 1, 1));
    towerGeo.translate(0, 0.5, 0);
    const towerMat = keep(new THREE.MeshStandardMaterial({ color: foundry ? 0x120c0a : 0x0b0c13, metalness: 0.7, roughness: 0.55 }));
    const screenGeo = keep(new THREE.PlaneGeometry(1, 1));
    const mq = keep(marqueeTexture());
    const screenMat = keep(new THREE.MeshBasicMaterial({ map: mq, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    const N = 84;
    const towers = new THREE.InstancedMesh(towerGeo, towerMat, N);
    const screens = new THREE.InstancedMesh(screenGeo, screenMat, N);
    this.disposables.push(towers, screens);
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const palette = foundry ? [0xff8a3a, 0xffb066, 0xff2e88, 0xd9a441] : [0x35f2ff, 0xff2e88, 0x8a5cff, 0xd9a441, 0x59ffb5];
    const col = new THREE.Color();
    const base = foundry ? ARENA_RADIUS : ARENA_HALF * 1.2;
    for (let i = 0; i < N; i++) {
      const a = rnd() * Math.PI * 2;
      const d = base + 380 + Math.pow(rnd(), 0.8) * 2600;
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      const w = 70 + rnd() * 200;
      const h = 500 + rnd() * 1300;
      const y0 = -900 - rnd() * 300;
      q.setFromAxisAngle(up, -a + Math.PI / 2 + (rnd() - 0.5) * 0.4);
      towers.setMatrixAt(i, m4.compose(pos.set(x, y0, z), q, scl.set(w, h, w * (0.6 + rnd() * 0.6))));
      // a marquee/screen on the face that looks toward the arena
      const sh = 120 + rnd() * 260;
      const sy = y0 + h - sh * 0.6 - rnd() * 200;
      const inward = new THREE.Vector3(-Math.cos(a), 0, -Math.sin(a));
      const face = new THREE.Vector3(x, sy, z).addScaledVector(inward, w * 0.52);
      const look = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), inward);
      screens.setMatrixAt(i, m4.compose(face, look, scl.set(w * 0.7, sh, 1)));
      col.set(palette[Math.floor(rnd() * palette.length)]).multiplyScalar(rnd() < 0.2 ? 1.6 : 0.35 + rnd() * 0.5);
      screens.setColorAt(i, col);
    }
    towers.instanceMatrix.needsUpdate = true;
    screens.instanceMatrix.needsUpdate = true;
    if (screens.instanceColor) screens.instanceColor.needsUpdate = true;
    this.group.add(towers, screens);

    // warning beacons on a few tall towers
    this.beacon = keep(new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff2e5a).multiplyScalar(3) }));
    const bgeo = keep(new THREE.SphereGeometry(10, 8, 6));
    for (let i = 0; i < 10; i++) {
      const a = rnd() * Math.PI * 2;
      const d = base + 600 + rnd() * 1600;
      const b = new THREE.Mesh(bgeo, this.beacon);
      b.position.set(Math.cos(a) * d, 200 + rnd() * 500, Math.sin(a) * d);
      this.group.add(b);
    }
  }

  update(time: number): void {
    const on = Math.sin(time * 2.4) > 0.6;
    this.beacon.color.setRGB(on ? 3 : 0.25, on ? 0.35 : 0.03, on ? 0.6 : 0.06);
    const k = 2.0 + Math.sin(time * 2) * 0.25;
    if (this.arena === 'foundry') this.stripMat.color.setRGB(1 * k, 0.32 * k, 0.07 * k);
    else this.stripMat.color.setRGB(0.04 * k, 0.88 * k, 1 * k);
  }

  resize(w: number, h: number): void {
    this.reflector?.getRenderTarget().setSize(Math.max(256, Math.floor(w * 0.5)), Math.max(256, Math.floor(h * 0.5)));
  }

  dispose(): void {
    this.group.removeFromParent();
    if (this.reflector) {
      this.reflector.dispose();
      this.reflector = null;
    }
    for (const d of this.disposables) d.dispose();
    this.disposables.length = 0;
  }
}
