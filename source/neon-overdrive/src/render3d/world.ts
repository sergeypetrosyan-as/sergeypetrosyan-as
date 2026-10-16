import * as THREE from 'three';
import { T } from '../state/tuning';
import type { Segment, TrackDef } from '../state/types';
import { HALF_W, LON, newPose, POST, PRE, TrackPath } from './path';
import {
  bannerTexture, checkerTexture, chevronTexture, concreteMaps, hazardTexture, rng, roadMaps, signTexture, skylineStrip, windowLookup,
} from './textures3d';

type Prof = [number, number][];

/** Lateral positions (road half widths). The car is a point in the simulation, so solid
 * structures sit one car half-width beyond the simulation limits. */
export const L = {
  KERB_IN: 1.0,
  KERB_OUT: 1.07,
  BARRIER: 1.47,
  BARRIER_BACK: 1.52,
  POLE: 1.6,
  TUNNEL: 1.62,
};

export interface Lamp {
  s: number; // extended progress, world units
  x: number;
  y: number;
  z: number;
  color: THREE.Color;
  power: number;
}

export interface WorldOptions {
  density: number;
  highContrast: boolean;
  threshold: number;
}

class Geo {
  pos: number[] = [];
  uv: number[] = [];
  idx: number[] = [];
  get empty(): boolean {
    return this.idx.length === 0;
  }
  build(): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    g.setIndex(this.idx);
    g.computeVertexNormals();
    g.computeBoundingSphere();
    return g;
  }
}

const mirror = (p: Prof): Prof => p.map(([l, u]) => [-l, u] as [number, number]).reverse();

const LAMP_COLORS: Record<string, string[]> = {
  halogen: ['#dbe7ff', '#dbe7ff', '#cfe0ff', '#9ff6ff'],
  violet: ['#ffb35c', '#ffb35c', '#c49bff', '#ffb35c'],
  meridian: ['#ffac4f', '#ffac4f', '#ffc77a', '#ffac4f'],
};

const HEIGHTS: Record<string, [number, number]> = {
  halogen: [14, 85],
  violet: [10, 60],
  meridian: [36, 190],
};

export class World {
  readonly group = new THREE.Group();
  readonly lamps: Lamp[] = [];
  private disposables: { dispose(): void }[] = [];
  private pose = newPose();
  private pt = { x: 0, y: 0, z: 0 };
  private segs: Segment[];
  private n: number;
  private tunnelRow: Uint8Array;
  // shared state materials
  readonly spineField: THREE.MeshBasicMaterial;
  readonly spineLine: THREE.MeshBasicMaterial;
  readonly gateFrame: THREE.MeshBasicMaterial;
  readonly curtainOpen: THREE.MeshBasicMaterial;
  readonly curtainSealed: THREE.MeshBasicMaterial;
  private bannerOpen: THREE.MeshBasicMaterial;
  private bannerSealed: THREE.MeshBasicMaterial;
  private beacon: THREE.MeshBasicMaterial;
  private threshold = -1;
  private open = true;

  constructor(readonly path: TrackPath, readonly def: TrackDef, private opts: WorldOptions, private shared: { glow: THREE.Texture; streak: THREE.Texture; anisotropy: number }) {
    this.segs = path.track.segs;
    this.n = this.segs.length;
    this.tunnelRow = new Uint8Array(path.rows);
    for (const t of def.tunnels ?? []) {
      const i0 = Math.floor(t.at * this.n);
      for (const r0 of this.rowsFor(i0)) for (let r = r0; r <= r0 + t.len && r < path.rows; r++) this.tunnelRow[r] = 1;
    }
    const D = <X extends { dispose(): void }>(x: X): X => {
      this.disposables.push(x);
      return x;
    };
    const pal = def.palette;
    const accent = new THREE.Color(pal.accentA);
    this.spineField = D(new THREE.MeshBasicMaterial({ color: accent.clone().multiplyScalar(0.5), transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.spineLine = D(new THREE.MeshBasicMaterial({ color: accent.clone().multiplyScalar(3) }));
    this.gateFrame = D(new THREE.MeshBasicMaterial({ color: accent.clone().multiplyScalar(4) }));
    const chev = D(chevronTexture());
    chev.wrapT = THREE.RepeatWrapping;
    chev.repeat.set(1, 2);
    this.curtainOpen = D(new THREE.MeshBasicMaterial({ map: chev, color: new THREE.Color('#2cf6ff').multiplyScalar(1.2), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    const haz = D(hazardTexture());
    haz.repeat.set(2, 2);
    this.curtainSealed = D(new THREE.MeshBasicMaterial({ map: haz, color: new THREE.Color(1.6, 1.6, 1.6), transparent: true, opacity: 0.82, depthWrite: false, side: THREE.DoubleSide }));
    this.bannerOpen = D(new THREE.MeshBasicMaterial({ map: D(bannerTexture('Spine open', '#2cf6ff')), color: new THREE.Color(1.4, 1.4, 1.4) }));
    this.bannerSealed = D(new THREE.MeshBasicMaterial({ color: new THREE.Color(1.4, 1.4, 1.4) }));
    this.beacon = D(new THREE.MeshBasicMaterial({ color: new THREE.Color(5, 0.2, 0.2) }));
    this.setThreshold(opts.threshold);
    this.buildRibbons(D);
    this.buildGates(D);
    this.buildStreetLights(D);
    this.buildOverpasses(D);
    this.buildCity(D);
    this.buildSkyline(D);
    this.lamps.sort((a, b) => a.s - b.s);
  }

  // ---------- helpers ----------
  private seg(r: number): Segment {
    const i = r - PRE;
    return this.segs[((i % this.n) + this.n) % this.n];
  }

  private rowS(r: number): number {
    return (r - PRE) * T.SEG_LEN;
  }

  /** Every extended row that shows lap segment i. */
  private rowsFor(i: number): number[] {
    const out: number[] = [];
    for (let r = PRE + i - this.n * 2; r < this.path.rows; r += this.n) if (r >= 0) out.push(r);
    return out;
  }

  private at(r: number, lat: number, up: number): THREE.Vector3 {
    this.path.point(this.rowS(r), lat, up, this.pose, this.pt);
    return new THREE.Vector3(this.pt.x, this.pt.y, this.pt.z);
  }

  /** Orientation of the road at row r (yaw, pitch, bank), as used by the cars. */
  private orient(obj: THREE.Object3D, r: number, flat = false): void {
    this.path.sample(this.rowS(r), this.pose);
    obj.rotation.order = 'YXZ';
    obj.rotation.set(flat ? 0 : this.pose.pitch, -this.pose.head, flat ? 0 : -this.pose.bank);
  }

  private ribbon(geo: Geo, r0: number, r1: number, step: number, prof: Prof, uMode: 'lat' | number, vScale: number): void {
    const base = geo.pos.length / 3;
    const P = prof.length;
    const cum: number[] = [0];
    for (let j = 1; j < P; j++) {
      const dl = (prof[j][0] - prof[j - 1][0]) * HALF_W;
      const du = prof[j][1] - prof[j - 1][1];
      cum.push(cum[j - 1] + Math.hypot(dl, du));
    }
    let rows = 0;
    for (let r = r0; ; r += step) {
      const rr = Math.min(r, r1);
      for (let j = 0; j < P; j++) {
        this.path.point(this.rowS(rr), prof[j][0], prof[j][1], this.pose, this.pt);
        geo.pos.push(this.pt.x, this.pt.y, this.pt.z);
        const u = uMode === 'lat' ? (prof[j][0] + 1) / 2 : cum[j] / uMode;
        geo.uv.push(u, ((rr - PRE) * T.SEG_LEN * LON) / vScale);
      }
      rows++;
      if (rr >= r1) break;
    }
    for (let k = 0; k < rows - 1; k++) {
      for (let j = 0; j < P - 1; j++) {
        const a = base + k * P + j;
        const b = a + 1;
        const c = a + P;
        const d = c + 1;
        geo.idx.push(a, b, c, b, d, c);
      }
    }
  }

  // ---------- road, kerbs, barriers, tunnel ----------
  private buildRibbons(D: <X extends { dispose(): void }>(x: X) => X): void {
    const hc = this.opts.highContrast;
    const an = this.shared.anisotropy;
    const rm = roadMaps(this.def.seed, false, hc);
    const rs = roadMaps(this.def.seed, true, hc);
    for (const m of [rm, rs]) {
      for (const t of [m.map, m.rough, m.normal]) {
        t.anisotropy = an;
        D(t);
      }
    }
    const roadMat = D(new THREE.MeshStandardMaterial({ map: rm.map, roughnessMap: rm.rough, normalMap: rm.normal, normalScale: new THREE.Vector2(0.28, 0.28), roughness: 1, metalness: 0.0, envMapIntensity: 0.7 }));
    const roadSpine = D(new THREE.MeshStandardMaterial({ map: rs.map, roughnessMap: rs.rough, normalMap: rs.normal, normalScale: new THREE.Vector2(0.28, 0.28), roughness: 1, metalness: 0.0, envMapIntensity: 0.7 }));
    const cm = concreteMaps(this.def.seed + 5);
    cm.map.anisotropy = an;
    D(cm.map);
    D(cm.rough);
    const concrete = D(new THREE.MeshStandardMaterial({ map: cm.map, roughnessMap: cm.rough, color: 0xb8bcc4, roughness: 1, envMapIntensity: 0.5 }));
    const tunnelMat = D(new THREE.MeshStandardMaterial({ map: cm.map, roughnessMap: cm.rough, color: 0x9a9ea6, roughness: 0.9, side: THREE.DoubleSide, envMapIntensity: 0.3 }));
    const ground = D(new THREE.MeshStandardMaterial({ map: cm.map, color: 0x3a3f48, roughness: 0.42, envMapIntensity: 0.8 }));
    const kerbMat = D(new THREE.MeshStandardMaterial({ color: 0x8c9098, roughness: 0.7, metalness: 0 }));
    const steel = D(new THREE.MeshStandardMaterial({ color: 0xa3a9b1, roughness: 0.32, metalness: 0.95, envMapIntensity: 1.2 }));
    const edge = new THREE.Color(hc ? '#ffffff' : this.def.palette.edge);
    const ledMat = D(new THREE.MeshBasicMaterial({ color: edge.clone().multiplyScalar(hc ? 1.5 : 2.6) }));
    const tunnelLed = D(new THREE.MeshBasicMaterial({ color: new THREE.Color(this.def.palette.accentB).multiplyScalar(2.4) }));

    const kerbR: Prof = [[L.KERB_IN, 0], [L.KERB_IN, 0.1], [L.KERB_OUT, 0.12]];
    const shoulderR: Prof = [[L.KERB_OUT, 0.12], [L.BARRIER, 0.06]];
    const barrierR: Prof = [[L.BARRIER, 0], [L.BARRIER, 0.2], [L.BARRIER + 0.02, 0.5], [L.BARRIER + 0.026, 0.92], [L.BARRIER_BACK, 0.92], [L.BARRIER_BACK, 0]];
    const ledR: Prof = [[L.BARRIER - 0.001, 0.12], [L.BARRIER - 0.001, 0.17]];
    const railR: Prof = [[L.BARRIER + 0.03, 1.0], [L.BARRIER + 0.03, 1.3], [L.BARRIER + 0.045, 1.3], [L.BARRIER + 0.045, 1.0]];
    const walkR: Prof = [[L.BARRIER_BACK, 0.18], [3.2, 0.2], [6, -0.2], [16, -1.2]];
    const wallR: Prof = [[L.TUNNEL, 0], [L.TUNNEL, 7.2]];
    const roofP: Prof = [[L.TUNNEL, 7.2], [-L.TUNNEL, 7.2]];
    const wallLedR: Prof = [[L.TUNNEL - 0.002, 1.0], [L.TUNNEL - 0.002, 1.12]];
    const spineEdgeR: Prof = [[0.245, 0.035], [0.275, 0.035]];
    const spineRailR: Prof = [[0.24, 0], [0.24, 0.03], [0.28, 0.03], [0.28, 0]];

    const rows = this.path.rows;
    const CH = 120;
    const STEP = 2;
    const runs = (a: number, b: number, test: (r: number) => boolean): [number, number][] => {
      const out: [number, number][] = [];
      let s = -1;
      for (let r = a; r <= b; r++) {
        const on = test(r);
        if (on && s < 0) s = r;
        if ((!on || r === b) && s >= 0) {
          const e = on ? r : r;
          if (e > s) out.push([s, e]);
          s = -1;
        }
      }
      return out;
    };
    for (let c0 = 0; c0 < rows - 1; c0 += CH) {
      const c1 = Math.min(rows - 1, c0 + CH);
      const road = new Geo();
      const roadS = new Geo();
      const conc = new Geo();
      const tun = new Geo();
      const gnd = new Geo();
      const kerb = new Geo();
      const st = new Geo();
      const led = new Geo();
      const tled = new Geo();
      const spineF = new Geo();
      const spineL = new Geo();
      const spineR = new Geo();
      const spineTest = (r: number) => this.seg(r).spine;
      for (const [a, b] of runs(c0, c1, (r) => !spineTest(r))) this.ribbon(road, a, b, STEP, [[-1, 0], [1, 0]], 'lat', 16);
      for (const [a, b] of runs(c0, c1, spineTest)) {
        this.ribbon(roadS, a, b, STEP, [[-1, 0], [1, 0]], 'lat', 16);
        this.ribbon(spineF, a, b, STEP, [[-0.24, 0.015], [0.24, 0.015]], 'lat', 4);
        for (const p of [spineEdgeR, mirror(spineEdgeR)]) this.ribbon(spineL, a, b, STEP, p, 1, 4);
        for (const p of [spineRailR, mirror(spineRailR)]) this.ribbon(spineR, a, b, STEP, p, 1, 4);
      }
      for (const side of [1, -1]) {
        const f = (p: Prof): Prof => (side > 0 ? p : mirror(p));
        this.ribbon(kerb, c0, c1, STEP, f(kerbR), 1, 4);
        this.ribbon(gnd, c0, c1, STEP, f(shoulderR), 4, 8);
        this.ribbon(conc, c0, c1, STEP, f(barrierR), 1.5, 3);
        this.ribbon(led, c0, c1, STEP, f(ledR), 1, 4);
        this.ribbon(gnd, c0, c1, STEP, f(walkR), 12, 12);
        for (const [a, b] of runs(c0, c1, (r) => !this.tunnelRow[r])) this.ribbon(st, a, b, STEP, f(railR), 1, 4);
        for (const [a, b] of runs(c0, c1, (r) => !!this.tunnelRow[r])) {
          this.ribbon(tun, a, b, STEP, f(wallR), 4, 4);
          this.ribbon(tled, a, b, STEP, f(wallLedR), 1, 4);
        }
      }
      for (const [a, b] of runs(c0, c1, (r) => !!this.tunnelRow[r])) this.ribbon(tun, a, b, STEP, roofP, 4, 4);
      const emit = (g: Geo, m: THREE.Material, receive = true, order = 0): void => {
        if (g.empty) return;
        const mesh = new THREE.Mesh(D(g.build()), m);
        mesh.receiveShadow = receive;
        mesh.renderOrder = order;
        this.group.add(mesh);
      };
      emit(road, roadMat);
      emit(roadS, roadSpine);
      emit(conc, concrete);
      emit(tun, tunnelMat);
      emit(gnd, ground);
      emit(kerb, kerbMat);
      emit(st, steel, false);
      emit(led, ledMat, false);
      emit(tled, tunnelLed, false);
      emit(spineF, this.spineField, false, 2);
      emit(spineL, this.spineLine, false);
      emit(spineR, this.spineLine, false);
    }
    // guard-rail posts every 3 m outside tunnels, plus tunnel ceiling lights
    const postG = D(new THREE.BoxGeometry(0.12, 1.3, 0.12));
    const posts: THREE.Matrix4[] = [];
    const tl: THREE.Matrix4[] = [];
    const dummy = new THREE.Object3D();
    const tunnelLamp = new THREE.Color('#f4f1e6');
    for (let r = 0; r < rows; r += 2) {
      if (this.tunnelRow[r]) {
        if (r % 6 === 0) {
          for (const lat of [-0.55, 0.55]) {
            dummy.position.copy(this.at(r, lat, 7.1));
            this.orient(dummy, r, true);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            tl.push(dummy.matrix.clone());
          }
          if (r % 18 === 0) {
            const p = this.at(r, 0, 6.6);
            this.lamps.push({ s: this.rowS(r), x: p.x, y: p.y, z: p.z, color: tunnelLamp, power: 0.6 });
          }
        }
        continue;
      }
      if (r % 2 !== 0) continue;
      for (const side of [-1, 1]) {
        dummy.position.copy(this.at(r, side * (L.BARRIER + 0.06), 0.65));
        this.orient(dummy, r, true);
        dummy.updateMatrix();
        posts.push(dummy.matrix.clone());
      }
    }
    const postMesh = new THREE.InstancedMesh(postG, steel, posts.length);
    posts.forEach((m, i) => postMesh.setMatrixAt(i, m));
    postMesh.frustumCulled = false;
    this.group.add(postMesh);
    if (tl.length) {
      const g = D(new THREE.BoxGeometry(0.5, 0.08, 2.6));
      const m = D(new THREE.MeshBasicMaterial({ color: tunnelLamp.clone().multiplyScalar(5) }));
      const im = new THREE.InstancedMesh(g, m, tl.length);
      tl.forEach((mm, i) => im.setMatrixAt(i, mm));
      im.frustumCulled = false;
      this.group.add(im);
      // portal facades at tunnel entrances
      for (const t of this.def.tunnels ?? []) {
        for (const r of this.rowsFor(Math.floor(t.at * this.n))) {
          const sh = new THREE.Shape();
          sh.moveTo(-22, -2);
          sh.lineTo(22, -2);
          sh.lineTo(22, 16);
          sh.lineTo(-22, 16);
          sh.closePath();
          const hole = new THREE.Path();
          const hw = L.TUNNEL * HALF_W;
          hole.moveTo(-hw, 0);
          hole.lineTo(-hw, 7.2);
          hole.lineTo(hw, 7.2);
          hole.lineTo(hw, 0);
          hole.closePath();
          sh.holes.push(hole);
          const pg = D(new THREE.ExtrudeGeometry(sh, { depth: 1.2, bevelEnabled: false }));
          const portal = new THREE.Mesh(pg, concrete);
          portal.position.copy(this.at(r, 0, 0));
          this.orient(portal, r, true);
          this.group.add(portal);
          const band = new THREE.Mesh(D(new THREE.BoxGeometry(hw * 2 + 1, 0.25, 0.1)), tunnelLed);
          band.position.copy(this.at(r, 0, 7.6));
          this.orient(band, r, true);
          band.translateZ(0.7);
          this.group.add(band);
        }
      }
    }
  }

  // ---------- Spine gates and checkpoint gantries ----------
  private gantry(D: <X extends { dispose(): void }>(x: X) => X, r: number, height: number, lightMat: THREE.Material, beamMat: THREE.Material): THREE.Group {
    const g = new THREE.Group();
    g.position.copy(this.at(r, 0, 0));
    this.orient(g, r, true);
    const span = L.POLE * HALF_W * 2;
    const post = D(new THREE.BoxGeometry(0.5, height, 0.5));
    for (const sx of [-1, 1]) {
      const p = new THREE.Mesh(post, beamMat);
      p.position.set(sx * span / 2, height / 2, 0);
      p.castShadow = false;
      g.add(p);
    }
    const beam = new THREE.Mesh(D(new THREE.BoxGeometry(span + 0.5, 0.9, 0.7)), beamMat);
    beam.position.set(0, height, 0);
    g.add(beam);
    const strip = new THREE.Mesh(D(new THREE.BoxGeometry(span, 0.06, 0.08)), lightMat);
    strip.position.set(0, height - 0.47, 0.3);
    g.add(strip);
    this.group.add(g);
    return g;
  }

  private buildGates(D: <X extends { dispose(): void }>(x: X) => X): void {
    const metal = D(new THREE.MeshStandardMaterial({ color: 0x2a2f38, roughness: 0.45, metalness: 0.8 }));
    const amber = D(new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffb347').multiplyScalar(3) }));
    const white = D(new THREE.MeshBasicMaterial({ color: new THREE.Color(1.8, 1.8, 1.8) }));
    const exitBanner = D(new THREE.MeshBasicMaterial({ map: D(bannerTexture('Spine exit', '#ffb347')), color: new THREE.Color(1.3, 1.3, 1.3) }));
    const checker = D(checkerTexture());
    checker.wrapS = THREE.RepeatWrapping;
    const checkerMat = D(new THREE.MeshBasicMaterial({ map: checker, color: new THREE.Color(1.6, 1.6, 1.6) }));
    const finishRoad = D(new THREE.MeshStandardMaterial({ map: checker, roughness: 0.5, transparent: true, opacity: 0.85, polygonOffset: true, polygonOffsetFactor: -2 }));
    const cpMats = [1, 2, 3].map((k) => D(new THREE.MeshBasicMaterial({ map: D(bannerTexture(`Checkpoint ${k}`, this.def.palette.accentA)), color: new THREE.Color(1.3, 1.3, 1.3) })));
    const bannerG = D(new THREE.PlaneGeometry(8, 0.75));
    const curtainG = D(new THREE.PlaneGeometry(0.5 * HALF_W, 4.2));
    const barG = D(new THREE.BoxGeometry(0.1, 4.4, 0.1));
    const span = L.POLE * HALF_W * 2;
    for (let i = 0; i < this.n; i++) {
      const sg = this.segs[i];
      if (!sg.gate && !sg.cp) continue;
      for (const r of this.rowsFor(i)) {
        if (sg.gate === 1) {
          const g = this.gantry(D, r, 6.6, this.gateFrame, metal);
          const b1 = new THREE.Mesh(bannerG, this.bannerOpen);
          const b2 = new THREE.Mesh(bannerG, this.bannerSealed);
          for (const b of [b1, b2]) {
            b.position.set(0, 6.6, 0.37);
            g.add(b);
          }
          // the Spine field: a light curtain across the centre channel only
          const c1 = new THREE.Mesh(curtainG, this.curtainOpen);
          const c2 = new THREE.Mesh(curtainG, this.curtainSealed);
          for (const c of [c1, c2]) {
            c.position.set(0, 2.1, 0);
            c.renderOrder = 3;
            g.add(c);
          }
          for (const sx of [-1, 1]) {
            const bar = new THREE.Mesh(barG, this.gateFrame);
            bar.position.set(sx * 0.26 * HALF_W, 4.4, 0);
            g.add(bar);
          }
          const top = new THREE.Mesh(D(new THREE.BoxGeometry(0.52 * HALF_W, 0.1, 0.1)), this.gateFrame);
          top.position.set(0, 4.25, 0);
          g.add(top);
        } else if (sg.gate === 2) {
          const g = this.gantry(D, r, 6.0, amber, metal);
          const b = new THREE.Mesh(bannerG, exitBanner);
          b.position.set(0, 6.0, 0.37);
          g.add(b);
        }
        if (sg.cp) {
          const fin = sg.cp === 4;
          const g = this.gantry(D, r, 7.2, fin ? white : amber, metal);
          const b = new THREE.Mesh(D(new THREE.PlaneGeometry(span * 0.7, 0.85)), fin ? checkerMat : cpMats[sg.cp - 1]);
          if (fin) checker.repeat.set(6, 1);
          b.position.set(0, 7.2, 0.37);
          g.add(b);
          if (fin) {
            const line = new THREE.Mesh(D(new THREE.PlaneGeometry(2 * HALF_W, 1.4)), finishRoad);
            line.rotation.x = -Math.PI / 2;
            line.position.y = 0.02;
            line.receiveShadow = true;
            g.add(line);
          }
        }
      }
    }
  }

  setThreshold(t: number): void {
    if (t === this.threshold) return;
    this.threshold = t;
    this.bannerSealed.map?.dispose();
    this.bannerSealed.map = bannerTexture(`Spine sealed below ${t} %`, '#ff4354');
    this.bannerSealed.needsUpdate = true;
  }

  /** Gate state for every Spine element on the track. */
  setGate(open: boolean, time: number, reducedFlash: boolean): void {
    this.open = open;
    const flick = open || reducedFlash ? 1 : 0.55 + 0.45 * (Math.sin(time * 50) > 0 ? 1 : 0);
    const c = open ? new THREE.Color('#2cf6ff') : new THREE.Color('#ff3348');
    this.gateFrame.color.copy(c).multiplyScalar(4 * flick);
    this.spineLine.color.copy(c).multiplyScalar(open ? 2.6 : 2.2 * flick);
    const pulse = 0.4 + 0.12 * Math.sin(time * 5);
    this.spineField.color.copy(c).multiplyScalar(open ? pulse : 0.3);
    this.curtainOpen.visible = open;
    this.curtainSealed.visible = !open;
    this.curtainSealed.opacity = 0.82 * flick;
    this.bannerOpen.visible = open;
    this.bannerSealed.visible = !open;
    this.curtainOpen.map!.offset.y = -time * 1.2;
    this.beacon.color.setRGB(Math.sin(time * 3) > 0.6 ? 6 : 0.3, 0.1, 0.1);
    void this.open;
  }

  // ---------- streetlights, signs, bollards ----------
  private buildStreetLights(D: <X extends { dispose(): void }>(x: X) => X): void {
    const cols = (LAMP_COLORS[this.def.id] ?? LAMP_COLORS.halogen).map((c) => new THREE.Color(c));
    const dummy = new THREE.Object3D();
    const poleM: THREE.Matrix4[] = [];
    const armM: THREE.Matrix4[] = [];
    const headM: THREE.Matrix4[] = [];
    const headC: THREE.Color[] = [];
    const streakM: THREE.Matrix4[] = [];
    const halo: number[] = [];
    const haloC: number[] = [];
    const H = 9.5;
    const SP = 24; // rows between lamps on one side (32 m)
    const r = rng(this.def.seed * 3 + 1);
    let k = 0;
    for (let row = 0; row < this.path.rows; row += SP / 2) {
      const side = k++ % 2 === 0 ? 1 : -1;
      if (this.tunnelRow[row] || this.tunnelRow[Math.min(this.path.rows - 1, row + 4)]) continue;
      const segI = (((row - PRE) % this.n) + this.n) % this.n;
      const col = cols[(segI * 7 + (side > 0 ? 1 : 0)) % cols.length];
      void r;
      // pole
      dummy.position.copy(this.at(row, side * L.POLE, 0));
      this.orient(dummy, row, true);
      dummy.scale.set(1, H, 1);
      dummy.updateMatrix();
      poleM.push(dummy.matrix.clone());
      // arm reaching over the road edge
      const armLen = (L.POLE - 0.95) * HALF_W;
      dummy.position.copy(this.at(row, side * (L.POLE - (armLen / 2) / HALF_W), H - 0.1));
      dummy.scale.set(armLen, 1, 1);
      dummy.updateMatrix();
      armM.push(dummy.matrix.clone());
      const head = this.at(row, side * 0.97, H - 0.3);
      dummy.position.copy(head);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      headM.push(dummy.matrix.clone());
      headC.push(col.clone().multiplyScalar(this.def.id === 'halogen' ? 6 : 7));
      halo.push(head.x, head.y - 0.2, head.z);
      haloC.push(col.r, col.g, col.b);
      // wet-road reflection streak from the lamp foot towards the viewer
      const len = 15;
      dummy.position.copy(this.at(row - Math.round((len / 2) / (T.SEG_LEN * LON)), side * 0.97, 0.03));
      this.orient(dummy, row);
      dummy.rotateX(-Math.PI / 2);
      dummy.scale.set(1.5, len, 1);
      dummy.updateMatrix();
      streakM.push(dummy.matrix.clone());
      this.lamps.push({ s: this.rowS(row), x: head.x, y: head.y - 0.4, z: head.z, color: col, power: 1 });
    }
    const metal = D(new THREE.MeshStandardMaterial({ color: 0x3a3f47, roughness: 0.5, metalness: 0.8 }));
    const poleG = D(new THREE.CylinderGeometry(0.09, 0.14, 1, 10));
    poleG.translate(0, 0.5, 0);
    const pole = new THREE.InstancedMesh(poleG, metal, poleM.length);
    poleM.forEach((m, i) => pole.setMatrixAt(i, m));
    const arm = new THREE.InstancedMesh(D(new THREE.BoxGeometry(1, 0.14, 0.18)), metal, armM.length);
    armM.forEach((m, i) => arm.setMatrixAt(i, m));
    const headMat = D(new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const heads = new THREE.InstancedMesh(D(new THREE.BoxGeometry(1.1, 0.12, 0.42)), headMat, headM.length);
    headM.forEach((m, i) => {
      heads.setMatrixAt(i, m);
      heads.setColorAt(i, headC[i]);
    });
    const streakMat = D(new THREE.MeshBasicMaterial({ map: this.shared.streak, transparent: true, opacity: 0.42, blending: THREE.AdditiveBlending, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 }));
    const streaks = new THREE.InstancedMesh(D(new THREE.PlaneGeometry(1, 1)), streakMat, streakM.length);
    streakM.forEach((m, i) => {
      streaks.setMatrixAt(i, m);
      streaks.setColorAt(i, cols[i % cols.length]);
    });
    streaks.renderOrder = 2;
    const hg = D(new THREE.BufferGeometry());
    hg.setAttribute('position', new THREE.Float32BufferAttribute(halo, 3));
    hg.setAttribute('color', new THREE.Float32BufferAttribute(haloC, 3));
    const haloMat = D(new THREE.PointsMaterial({ size: 5.5, map: this.shared.glow, vertexColors: true, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
    const halos = new THREE.Points(hg, haloMat);
    for (const m of [pole, arm, heads, streaks]) {
      m.frustumCulled = false;
      this.group.add(m);
    }
    halos.frustumCulled = false;
    halos.renderOrder = 4;
    this.group.add(halos);

    // billboards and bollards from the track's scenery list
    const signTex = this.def.palette.signs.map((c, i) => D(signTexture(this.def.seed * 13 + i, c)));
    const signM: THREE.Matrix4[][] = signTex.map(() => []);
    const frameM: THREE.Matrix4[] = [];
    const legM: THREE.Matrix4[] = [];
    const bollM: THREE.Matrix4[] = [];
    const bollC: THREE.Color[] = [];
    for (let row = 0; row < this.path.rows; row++) {
      if (this.tunnelRow[row]) continue;
      for (const sp of this.seg(row).sprites) {
        const side = Math.sign(sp.x);
        if (sp.kind === 'sign') {
          const lat = side * Math.max(2.15, Math.abs(sp.x) + 0.4);
          const hgt = 6 + (sp.tex % 3) * 1.5;
          dummy.position.copy(this.at(row, lat, hgt));
          this.orient(dummy, row, true);
          dummy.rotateY(-side * 0.32);
          dummy.scale.set(9, 4.5, 1);
          dummy.updateMatrix();
          signM[sp.tex % signM.length].push(dummy.matrix.clone());
          dummy.translateZ(-0.2);
          dummy.scale.set(9.4, 4.9, 0.35);
          dummy.updateMatrix();
          frameM.push(dummy.matrix.clone());
          for (const lx of [-2.6, 2.6]) {
            const base = this.at(row, lat, 0);
            dummy.position.copy(base);
            this.orient(dummy, row, true);
            dummy.rotateY(-side * 0.32);
            dummy.translateX(lx);
            dummy.translateZ(-0.25);
            dummy.scale.set(0.3, hgt - 2.2, 0.3);
            dummy.updateMatrix();
            legM.push(dummy.matrix.clone());
          }
        } else if (sp.kind === 'pylon') {
          dummy.position.copy(this.at(row, side * 1.58, 0.15));
          this.orient(dummy, row, true);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          bollM.push(dummy.matrix.clone());
          bollC.push(new THREE.Color(this.def.palette.signs[sp.tex % this.def.palette.signs.length]).multiplyScalar(4));
        }
      }
    }
    signTex.forEach((t, i) => {
      if (!signM[i].length) return;
      const m = D(new THREE.MeshBasicMaterial({ map: t, color: new THREE.Color(2.2, 2.2, 2.2) }));
      const im = new THREE.InstancedMesh(D(new THREE.PlaneGeometry(1, 1)), m, signM[i].length);
      signM[i].forEach((mm, j) => im.setMatrixAt(j, mm));
      im.frustumCulled = false;
      this.group.add(im);
    });
    const frameG = D(new THREE.BoxGeometry(1, 1, 1));
    const frame = new THREE.InstancedMesh(frameG, metal, frameM.length);
    frameM.forEach((m, i) => frame.setMatrixAt(i, m));
    const legG = D(new THREE.BoxGeometry(1, 1, 1));
    legG.translate(0, 0.5, 0);
    const legs = new THREE.InstancedMesh(legG, metal, legM.length);
    legM.forEach((m, i) => legs.setMatrixAt(i, m));
    const bollG = D(new THREE.CylinderGeometry(0.12, 0.12, 1.0, 10));
    bollG.translate(0, 0.5, 0);
    const boll = new THREE.InstancedMesh(bollG, metal, Math.max(1, bollM.length));
    const ringG = D(new THREE.CylinderGeometry(0.125, 0.125, 0.12, 10));
    ringG.translate(0, 0.92, 0);
    const ringMat = D(new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const ring = new THREE.InstancedMesh(ringG, ringMat, Math.max(1, bollM.length));
    bollM.forEach((m, i) => {
      boll.setMatrixAt(i, m);
      ring.setMatrixAt(i, m);
      ring.setColorAt(i, bollC[i]);
    });
    boll.count = ring.count = bollM.length;
    for (const m of [frame, legs, boll, ring]) {
      m.frustumCulled = false;
      this.group.add(m);
    }
  }

  // ---------- overpasses ----------
  private buildOverpasses(D: <X extends { dispose(): void }>(x: X) => X): void {
    const list = this.def.overpasses ?? [];
    if (!list.length) return;
    const cm = concreteMaps(this.def.seed + 9);
    D(cm.map);
    D(cm.rough);
    cm.map.repeat.set(6, 1);
    const conc = D(new THREE.MeshStandardMaterial({ map: cm.map, roughnessMap: cm.rough, color: 0x9ca1aa, roughness: 1, envMapIntensity: 0.5 }));
    const led = D(new THREE.MeshBasicMaterial({ color: new THREE.Color(this.def.palette.accentB).multiplyScalar(3) }));
    const under = D(new THREE.MeshBasicMaterial({ color: new THREE.Color('#f2efe4').multiplyScalar(4) }));
    const banner = D(new THREE.MeshBasicMaterial({ map: D(bannerTexture('Auralis transit line', this.def.palette.accentB)), color: new THREE.Color(1.3, 1.3, 1.3) }));
    const deckG = D(new THREE.BoxGeometry(70, 1.8, 13));
    const parapetG = D(new THREE.BoxGeometry(70, 1.1, 0.3));
    const pierG = D(new THREE.BoxGeometry(1.6, 1, 2.4));
    pierG.translate(0, 0.5, 0);
    const stripG = D(new THREE.BoxGeometry(70, 0.12, 0.12));
    const lightG = D(new THREE.BoxGeometry(0.4, 0.06, 6));
    const bannerG = D(new THREE.PlaneGeometry(14, 1.3));
    for (const f of list) {
      for (const r of this.rowsFor(Math.floor(f * this.n))) {
        const g = new THREE.Group();
        g.position.copy(this.at(r, 0, 0));
        this.orient(g, r, true);
        const clear = 7.6;
        const deck = new THREE.Mesh(deckG, conc);
        deck.position.y = clear + 0.9;
        deck.receiveShadow = true;
        g.add(deck);
        for (const z of [-6.35, 6.35]) {
          const p = new THREE.Mesh(parapetG, conc);
          p.position.set(0, clear + 2.35, z);
          g.add(p);
          const s = new THREE.Mesh(stripG, led);
          s.position.set(0, clear + 1.2, z + Math.sign(z) * 0.06);
          g.add(s);
        }
        for (const sx of [-1, 1]) {
          for (const z of [-4, 4]) {
            const pier = new THREE.Mesh(pierG, conc);
            pier.position.set(sx * (L.BARRIER_BACK * HALF_W + 1.4), -2, z);
            pier.scale.y = clear + 2;
            g.add(pier);
          }
        }
        for (const lx of [-0.6, 0, 0.6]) {
          const l = new THREE.Mesh(lightG, under);
          l.position.set(lx * HALF_W, clear - 0.03, 0);
          g.add(l);
        }
        const b = new THREE.Mesh(bannerG, banner);
        b.position.set(0, clear + 1.0, 6.62);
        g.add(b);
        this.group.add(g);
        const p = this.at(r, 0, clear - 0.5);
        this.lamps.push({ s: this.rowS(r), x: p.x, y: p.y, z: p.z, color: new THREE.Color('#f2efe4'), power: 0.7 });
      }
    }
  }

  // ---------- buildings ----------
  private buildCity(D: <X extends { dispose(): void }>(x: X) => X): void {
    const pal = this.def.palette;
    const dens = this.opts.density;
    const [hMin, hMax] = HEIGHTS[this.def.id] ?? HEIGHTS.halogen;
    const bm: THREE.Matrix4[] = [];
    const bc: THREE.Color[] = [];
    const roofM: THREE.Matrix4[] = [];
    const mastM: THREE.Matrix4[] = [];
    const tipM: THREE.Matrix4[] = [];
    const crownM: THREE.Matrix4[] = [];
    const crownC: THREE.Color[] = [];
    const dummy = new THREE.Object3D();
    const tints = pal.tints.map((t) => new THREE.Color(t));
    const facade = [new THREE.Color('#2a2f38'), new THREE.Color('#1d222b'), new THREE.Color('#353a42'), new THREE.Color('#252b36')];
    const place = (row: number, side: number, latM: number, w: number, d: number, h: number, rr: () => number): void => {
      const halfDiag = Math.hypot(w, d) / 2;
      const lat = side * (latM + halfDiag) / HALF_W;
      const c = this.at(row, lat, 0);
      if (this.path.nearRoad(c.x, c.z, L.BARRIER_BACK * HALF_W + halfDiag + 1.5)) return;
      this.path.sample(this.rowS(row), this.pose);
      const base = this.pose.y - 2;
      const yaw = -this.pose.head + (rr() - 0.5) * 0.12;
      dummy.position.set(c.x, base, c.z);
      dummy.rotation.set(0, yaw, 0);
      dummy.scale.set(w, h + 2, d);
      dummy.updateMatrix();
      bm.push(dummy.matrix.clone());
      const col = facade[Math.floor(rr() * facade.length)].clone().lerp(tints[Math.floor(rr() * tints.length)], 0.35);
      bc.push(col);
      // roof plant
      const units = 1 + Math.floor(rr() * 3);
      for (let u = 0; u < units; u++) {
        const uw = 2 + rr() * 3;
        dummy.position.set(0, 0, 0);
        dummy.rotation.set(0, yaw, 0);
        dummy.scale.set(uw, 1.4 + rr() * 1.8, 2 + rr() * 3);
        const ox = (rr() - 0.5) * (w - uw) * 0.8;
        const oz = (rr() - 0.5) * (d - 3) * 0.8;
        dummy.position.set(c.x + Math.cos(-yaw) * ox - Math.sin(-yaw) * oz, base + h + 2, c.z + Math.sin(-yaw) * ox + Math.cos(-yaw) * oz);
        dummy.updateMatrix();
        roofM.push(dummy.matrix.clone());
      }
      if (h > 40 && rr() < 0.4) {
        const mh = 8 + rr() * 18;
        dummy.position.set(c.x, base + h + 2, c.z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, mh, 1);
        dummy.updateMatrix();
        mastM.push(dummy.matrix.clone());
        dummy.position.set(c.x, base + h + 2 + mh, c.z);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        tipM.push(dummy.matrix.clone());
      }
      if (h > 30 && rr() < 0.28) {
        dummy.position.set(c.x, base + h - 1.2, c.z);
        dummy.rotation.set(0, yaw, 0);
        dummy.scale.set(w + 0.2, 0.5, d + 0.2);
        dummy.updateMatrix();
        crownM.push(dummy.matrix.clone());
        crownC.push(new THREE.Color(pal.signs[Math.floor(rr() * pal.signs.length)]).multiplyScalar(2.5));
      }
    };
    for (let row = 0; row < this.path.rows; row += 2) {
      const segI = (((row - PRE) % this.n) + this.n) % this.n;
      const seg = this.segs[segI];
      for (const sp of seg.sprites) {
        if (sp.kind !== 'tower') continue;
        const rr = rng(segI * 977 + (sp.x > 0 ? 1 : 2));
        const w = 12 + rr() * 16;
        const d = 12 + rr() * 16;
        const h = hMin + Math.pow(rr(), 1.6) * (hMax - hMin);
        place(row, Math.sign(sp.x), 14 + (Math.abs(sp.x) - 2.2) * 3, w, d, h, rr);
      }
      if (segI % 10 !== 0) continue;
      for (const side of [-1, 1]) {
        for (let band = 0; band < 3; band++) {
          const rr = rng(segI * 131 + band * 17 + (side > 0 ? 5 : 9));
          if (rr() > dens * (band === 0 ? 0.55 : 0.8)) continue;
          const w = 14 + rr() * 22;
          const d = 14 + rr() * 22;
          const h = (hMin + Math.pow(rr(), 1.4) * (hMax - hMin)) * (band === 2 ? 1.3 : 1);
          place(row, side, 18 + band * 34 + rr() * 14, w, d, h, rr);
        }
      }
    }
    // facade shader: floor and bay pattern from local metres, lit state from a canvas lookup
    const win = D(windowLookup(this.def.seed, pal));
    const mat = D(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.35, envMapIntensity: 0.6 }));
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uWin = { value: win };
      sh.uniforms.uWinGain = { value: this.opts.highContrast ? 1.0 : 1.15 };
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vBLocal;\nvarying vec3 vBNormal;\nvarying vec3 vBScale;\nvarying float vBSeed;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
#ifdef USE_INSTANCING
  vBScale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
  vBSeed = float(gl_InstanceID);
#else
  vBScale = vec3(1.0);
  vBSeed = 0.0;
#endif
  vBLocal = position * vBScale;
  vBNormal = normal;`);
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', '#include <common>\nuniform sampler2D uWin;\nuniform float uWinGain;\nvarying vec3 vBLocal;\nvarying vec3 vBNormal;\nvarying vec3 vBScale;\nvarying float vBSeed;')
        .replace('#include <color_fragment>', `#include <color_fragment>
  bool bSideX = abs(vBNormal.x) > 0.5;
  bool bRoof = abs(vBNormal.y) > 0.5;
  float bH = (bSideX ? vBLocal.z + vBScale.z * 0.5 : vBLocal.x + vBScale.x * 0.5);
  float bShop = step(vBLocal.y, 4.6);
  vec2 bCell = vec2(bH / mix(1.9, 6.0, bShop), (vBLocal.y - 0.6) / 3.4);
  vec2 bId = floor(bCell);
  vec2 bF = fract(bCell);
  float bWin = bRoof ? 0.0 : step(0.16, bF.x) * step(bF.x, 0.84) * step(mix(0.3, 0.05, bShop), bF.y) * step(bF.y, 0.86);
  float bFace = bSideX ? (vBNormal.x > 0.0 ? 1.0 : 2.0) : (vBNormal.z > 0.0 ? 3.0 : 4.0);
  vec4 bLook = texture2D(uWin, (bId + vec2(vBSeed * 13.0 + bFace * 29.0, vBSeed * 5.0 + bFace * 3.0) + 0.5) / 128.0);
  float bLit = bWin * mix(bLook.a, 0.85, bShop * 0.7) * (0.55 + 0.45 * smoothstep(0.3, 0.8, bF.y));
  bLit *= 0.75 + 0.25 * sin(bF.x * 3.14159);
  diffuseColor.rgb *= mix(1.0, 0.12, bWin);
  // spandrel bands between floors
  diffuseColor.rgb *= bRoof ? 0.6 : (1.0 - 0.18 * step(0.9, bF.y));`)
        .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n  roughnessFactor = mix(roughnessFactor, 0.22, bWin);')
        .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n  totalEmissiveRadiance += bLook.rgb * bLit * uWinGain;');
    };
    const boxG = D(new THREE.BoxGeometry(1, 1, 1));
    boxG.translate(0, 0.5, 0);
    const bld = new THREE.InstancedMesh(boxG, mat, Math.max(1, bm.length));
    bm.forEach((m, i) => {
      bld.setMatrixAt(i, m);
      bld.setColorAt(i, bc[i]);
    });
    bld.count = bm.length;
    bld.receiveShadow = false;
    const roofMat = D(new THREE.MeshStandardMaterial({ color: 0x2b2f36, roughness: 0.7, metalness: 0.4 }));
    const roof = new THREE.InstancedMesh(boxG, roofMat, Math.max(1, roofM.length));
    roofM.forEach((m, i) => roof.setMatrixAt(i, m));
    roof.count = roofM.length;
    const mastG = D(new THREE.CylinderGeometry(0.12, 0.25, 1, 6));
    mastG.translate(0, 0.5, 0);
    const mast = new THREE.InstancedMesh(mastG, roofMat, Math.max(1, mastM.length));
    mastM.forEach((m, i) => mast.setMatrixAt(i, m));
    mast.count = mastM.length;
    const tip = new THREE.InstancedMesh(D(new THREE.SphereGeometry(0.45, 8, 6)), this.beacon, Math.max(1, tipM.length));
    tipM.forEach((m, i) => tip.setMatrixAt(i, m));
    tip.count = tipM.length;
    const crownMat = D(new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const crown = new THREE.InstancedMesh(boxG, crownMat, Math.max(1, crownM.length));
    crownM.forEach((m, i) => {
      crown.setMatrixAt(i, m);
      crown.setColorAt(i, crownC[i]);
    });
    crown.count = crownM.length;
    for (const m of [bld, roof, mast, tip, crown]) {
      m.frustumCulled = false;
      this.group.add(m);
    }
  }

  // ---------- distant skyline (follows the camera) ----------
  readonly skyline = new THREE.Group();
  private buildSkyline(D: <X extends { dispose(): void }>(x: X) => X): void {
    for (const [far, radius, height] of [[true, 2600, 520], [false, 1700, 330]] as const) {
      const t = D(skylineStrip(this.def.seed, this.def.palette, far));
      t.repeat.set(far ? 5 : 4, 1);
      const m = D(new THREE.MeshBasicMaterial({ map: t, transparent: true, alphaTest: 0.02, side: THREE.BackSide, fog: false, depthWrite: false, color: new THREE.Color(far ? 0.8 : 1, far ? 0.8 : 1, far ? 0.85 : 1) }));
      const g = D(new THREE.CylinderGeometry(radius, radius, height, 64, 1, true));
      g.translate(0, height / 2 - 40, 0);
      const mesh = new THREE.Mesh(g, m);
      mesh.renderOrder = -5;
      mesh.frustumCulled = false;
      this.skyline.add(mesh);
    }
  }

  /** Extended progress range covered by the world, in world units. */
  get extent(): [number, number] {
    return [-PRE * T.SEG_LEN, (this.n + POST) * T.SEG_LEN];
  }

  dispose(): void {
    this.group.removeFromParent();
    this.skyline.removeFromParent();
    this.group.traverse((o) => {
      if (o instanceof THREE.InstancedMesh) o.dispose();
    });
    for (const d of this.disposables) d.dispose();
    this.bannerSealed.map?.dispose();
    this.disposables = [];
  }
}
