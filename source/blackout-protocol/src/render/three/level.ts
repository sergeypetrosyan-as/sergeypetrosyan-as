// Builds a mission's tile map into 3D architecture and keeps its dynamic devices in sync with the sim.
import * as THREE from 'three';
import type { Camera as SimCamera, World } from '../../sim/types.ts';
import { T_DOOR, T_FLOOR, T_LASER, T_SHADOW, T_WALL } from '../../sim/types.ts';
import { kindAt } from '../../sim/grid.ts';
import type { QualityProfile } from './quality.ts';
import type { BakeResult, BakeUniforms } from './bake.ts';
import { FIXTURE_H, WALL_H, bakeLightField, patchMaterial } from './bake.ts';
import * as TX from './textures.ts';
import { hash2 } from './textures.ts';

type Disposable = { dispose(): void };
type Skin = 'rack' | 'shelf' | 'crates' | 'cabinet';

const DOOR_H = 1.0;

export interface Palette { patrol: THREE.Color; suspicious: THREE.Color; alert: THREE.Color; search: THREE.Color; camera: THREE.Color; laser: THREE.Color; ok: THREE.Color; locked: THREE.Color; amber: THREE.Color }
const C = (h: string): THREE.Color => new THREE.Color(h);
export const PAL_NORMAL: Palette = { patrol: C('#dce4e6'), suspicious: C('#f0a541'), alert: C('#e2483d'), search: C('#b58cff'), camera: C('#9fd8ff'), laser: C('#5ef2ff'), ok: C('#6dffa6'), locked: C('#e2483d'), amber: C('#f0a541') };
export const PAL_CB: Palette = { patrol: C('#4aa3ff'), suspicious: C('#ffa000'), alert: C('#ff7bff'), search: C('#ffffff'), camera: C('#8ec5ff'), laser: C('#4aa3ff'), ok: C('#ffffff'), locked: C('#ff7bff'), amber: C('#ffa000') };

interface DoorView { i: number; horiz: boolean; left: THREE.Mesh; right: THREE.Mesh; lamp: THREE.MeshStandardMaterial; bar: THREE.Mesh; open: number; x: number; y: number }
interface LaserRun { x0: number; y0: number; x1: number; y1: number; horiz: boolean }
interface LaserView { i: number; beams: THREE.Group; haze: THREE.Mesh[]; ghost: THREE.Mesh[]; leds: THREE.MeshStandardMaterial }
interface TermView { i: number; ctx: CanvasRenderingContext2D; tex: THREE.CanvasTexture; sig: string; screen: THREE.MeshStandardMaterial }
interface LockerView { x: number; y: number; seam: THREE.MeshStandardMaterial; fx: number; fy: number }
interface ItemView { i: number; mesh: THREE.Object3D; base: number }
interface CamView { i: number; yaw: THREE.Group; led: THREE.MeshStandardMaterial; lensPos: THREE.Object3D }

export class Level {
  readonly group = new THREE.Group();
  readonly bake: BakeResult;
  readonly doors: DoorView[] = [];
  readonly lasers: LaserView[] = [];
  readonly terminals: TermView[] = [];
  readonly lockers: LockerView[] = [];
  readonly items: ItemView[] = [];
  readonly cams: CamView[] = [];
  readonly checkpoints: THREE.MeshBasicMaterial[] = [];
  exitMat!: THREE.MeshBasicMaterial;
  exitColumn!: THREE.Mesh;
  fixtureMat!: THREE.MeshStandardMaterial;
  beaconMat!: THREE.MeshStandardMaterial;
  beaconMesh: THREE.InstancedMesh | null = null;
  private fixHousing: THREE.InstancedMesh | null = null;
  private fixTube: THREE.InstancedMesh | null = null;
  private fixHidden = -2;
  private bag: Disposable[] = [];
  private skins = new Map<number, { skin: Skin; nx: number; ny: number }>();
  private steel: THREE.MeshStandardMaterial;
  private darkSteel: THREE.MeshStandardMaterial;
  private w: World;

  constructor(w: World, private q: QualityProfile, private u: BakeUniforms, private env: THREE.Texture | null, private pal: Palette) {
    this.w = w;
    this.bake = bakeLightField(w, q.bakeRes);
    this.bag.push(this.bake.light, this.bake.beaconIdx);
    u.uBake.value = this.bake.light;
    u.uBeaconIdx.value = this.bake.beaconIdx;
    u.uBakeSize.value.set(w.map.w, w.map.h);
    this.bake.beacons.forEach((b, i) => u.uBeacons.value[i].set(b.x, b.y, b.phase));
    for (let i = this.bake.beacons.length; i < u.uBeacons.value.length; i++) u.uBeacons.value[i].set(-999, -999, 0);
    const bs = TX.brushedSteel();
    this.bag.push(bs.map, bs.rough);
    this.steel = this.std({ map: bs.map, roughnessMap: bs.rough, metalness: 0.85, roughness: 0.42, envMap: env, envMapIntensity: 0.5 });
    this.darkSteel = this.std({ color: 0x24292d, metalness: 0.6, roughness: 0.5, envMap: env, envMapIntensity: 0.3 });
    this.planSkins();
    this.buildFloor();
    this.buildWalls();
    this.buildDoors();
    this.buildLockers();
    this.buildTerminals();
    this.buildLasers();
    this.buildFixtures();
    this.buildItems();
    this.buildMarkers();
    this.buildCameras();
  }

  // ---- helpers -------------------------------------------------------------------------------
  private std(p: THREE.MeshStandardMaterialParameters, cut = false): THREE.MeshStandardMaterial {
    const m = patchMaterial(new THREE.MeshStandardMaterial(p), this.u, { cut });
    this.bag.push(m);
    return m;
  }
  private keep<T extends Disposable>(x: T): T { this.bag.push(x); return x; }
  private mesh(g: THREE.BufferGeometry, m: THREE.Material | THREE.Material[], cast = true, recv = true): THREE.Mesh {
    this.keep(g);
    const me = new THREE.Mesh(g, m);
    me.castShadow = cast && this.q.shadows;
    me.receiveShadow = recv && this.q.shadows;
    this.group.add(me);
    return me;
  }
  private k(x: number, y: number): number { return kindAt(this.w.map, x, y); }
  private isWall(x: number, y: number): boolean { return this.k(x, y) === T_WALL; }
  private openFloor(x: number, y: number): boolean { const k = this.k(x, y); return k === T_FLOOR || k === T_SHADOW; }

  // ---- furniture skins on thick wall tiles -----------------------------------------------------------
  private planSkins(): void {
    const w = this.w, W = w.map.w, H = w.map.h;
    const mix: Record<number, [Skin, number][]> = {
      0: [['crates', 0.5], ['shelf', 0.8], ['cabinet', 1]],
      1: [['rack', 0.75], ['cabinet', 1]],
      2: [['shelf', 0.5], ['cabinet', 0.9], ['rack', 1]],
      3: [['rack', 0.5], ['crates', 0.8], ['shelf', 1]],
    };
    const table = mix[w.def.index] ?? mix[0];
    const camNear = (x: number, y: number): boolean => w.cameras.some((c) => Math.hypot(c.x - x - 0.5, c.y - y - 0.5) < 2);
    const doorNear = (x: number, y: number): boolean => {
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (this.k(x + dx, y + dy) === T_DOOR || this.k(x + dx, y + dy) === T_LASER) return true;
      return false;
    };
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (!this.isWall(x, y)) continue;
      for (const [nx, ny] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        if (!this.openFloor(x + nx, y + ny)) continue;
        const backWall = this.isWall(x - nx, y - ny);
        const latA = this.isWall(x + ny, y + nx), latB = this.isWall(x - ny, y - nx);
        if (!backWall || !latA || !latB || camNear(x, y) || doorNear(x, y)) continue;
        // clustered runs: furnish whole 3-tile regions
        const reg = hash2(Math.floor(x / 3), Math.floor(y / 3), 17 + w.def.index);
        if (reg > 0.46 || hash2(x, y, 23) > 0.82) continue;
        const pick = hash2(Math.floor(x / 3), Math.floor(y / 3), 29);
        const skin = table.find((t) => pick <= t[1])?.[0] ?? 'cabinet';
        this.skins.set(y * W + x, { skin, nx, ny });
        break;
      }
    }
  }

  // ---- floor ---------------------------------------------------------------------------------
  private buildFloor(): void {
    const w = this.w;
    const maps = TX.floorMaps(w, this.q.floorRes);
    this.bag.push(maps.map, maps.rough, maps.normal);
    const g = new THREE.PlaneGeometry(w.map.w, w.map.h);
    g.rotateX(-Math.PI / 2);
    g.translate(w.map.w / 2, 0, w.map.h / 2);
    const m = this.std({ map: maps.map, roughnessMap: maps.rough, normalMap: maps.normal, normalScale: new THREE.Vector2(0.8, 0.8), roughness: 1, metalness: 0.05, envMap: this.env, envMapIntensity: 0.12 });
    const fl = this.mesh(g, m, false, true);
    fl.renderOrder = 0;
    // floor vents on some shadow tiles
    const vt = this.keep(TX.floorVent());
    const vm = this.std({ map: vt, roughness: 0.6, metalness: 0.6, envMap: this.env, envMapIntensity: 0.3, polygonOffset: true, polygonOffsetFactor: -1 });
    const spots: THREE.Vector2[] = [];
    for (let y = 0; y < w.map.h; y++) for (let x = 0; x < w.map.w; x++) if (this.k(x, y) === T_SHADOW && hash2(x, y, 61) < 0.12) spots.push(new THREE.Vector2(x, y));
    if (spots.length) {
      const pg = this.keep(new THREE.PlaneGeometry(0.62, 0.62).rotateX(-Math.PI / 2));
      const im = this.keep(new THREE.InstancedMesh(pg, vm, spots.length));
      const mt = new THREE.Matrix4();
      spots.forEach((s, i) => { mt.makeTranslation(s.x + 0.5, 0.004, s.y + 0.5); im.setMatrixAt(i, mt); });
      im.receiveShadow = this.q.shadows;
      this.group.add(im);
    }
  }

  // ---- walls ---------------------------------------------------------------------------------
  private buildWalls(): void {
    const w = this.w, W = w.map.w, H = w.map.h;
    const pos: number[] = [], nor: number[] = [], uv: number[] = [];
    const idx: [number[], number[], number[]] = [[], [], []]; // sides, caps, glass
    const quad = (grp: number, p: number[][], n: number[], uvs: number[][]): void => {
      const base = pos.length / 3;
      for (let i = 0; i < 4; i++) { pos.push(...p[i]); nor.push(...n); uv.push(...uvs[i]); }
      // winding: make the face point along n
      const a = p[0], b = p[1], c = p[2];
      const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
      if (cx * n[0] + cy * n[1] + cz * n[2] >= 0) idx[grp].push(base, base + 1, base + 2, base, base + 2, base + 3);
      else idx[grp].push(base, base + 2, base + 1, base, base + 3, base + 2);
    };
    const glassy = w.def.index === 1 || w.def.index === 2;
    const GLASS_Y = 0.62;
    // emit a vertical face on edge between tile (x,y) and its neighbour in dir (dx,dy), limited to [s0,s1] along the edge
    const side = (x: number, y: number, dx: number, dy: number, s0: number, s1: number, z0: number, z1: number, glass: boolean): void => {
      const n = [dx, 0, dy];
      let p0: number[], p1: number[];
      if (dx !== 0) { const fx = dx > 0 ? x + z1 : x + z0; p0 = [fx, 0, y + s0]; p1 = [fx, 0, y + s1]; }
      else { const fy = dy > 0 ? y + z1 : y + z0; p0 = [x + s0, 0, fy]; p1 = [x + s1, 0, fy]; }
      const u0 = dx !== 0 ? p0[2] : p0[0], u1 = dx !== 0 ? p1[2] : p1[0];
      const v = (yy: number): number => yy / WALL_H;
      const hSplit = glass ? GLASS_Y * WALL_H : WALL_H;
      quad(0, [[p0[0], 0, p0[2]], [p1[0], 0, p1[2]], [p1[0], hSplit, p1[2]], [p0[0], hSplit, p0[2]]], n, [[u0, 0], [u1, 0], [u1, v(hSplit)], [u0, v(hSplit)]]);
      if (glass) quad(2, [[p0[0], hSplit, p0[2]], [p1[0], hSplit, p1[2]], [p1[0], WALL_H, p1[2]], [p0[0], WALL_H, p0[2]]], n, [[u0, 0], [u1, 0], [u1, 1], [u0, 1]]);
    };
    const top = (x0: number, y0: number, x1: number, y1: number): void => {
      quad(1, [[x0, WALL_H, y0], [x1, WALL_H, y0], [x1, WALL_H, y1], [x0, WALL_H, y1]], [0, 1, 0], [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]);
    };
    const trays: THREE.Matrix4[] = [], vents: THREE.Matrix4[] = [];
    const mullions: THREE.Matrix4[] = [];
    const rot = (dx: number, dy: number): number => (dx === 1 ? Math.PI / 2 : dx === -1 ? -Math.PI / 2 : dy === -1 ? Math.PI : 0);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (!this.isWall(x, y)) continue;
      const sk = this.skins.get(y * W + x);
      const partition = (!this.isWall(x, y - 1) && !this.isWall(x, y + 1) && this.k(x, y - 1) !== T_DOOR && this.k(x, y + 1) !== T_DOOR) || (!this.isWall(x - 1, y) && !this.isWall(x + 1, y) && this.k(x - 1, y) !== T_DOOR && this.k(x + 1, y) !== T_DOOR);
      const isPartitionRun = glassy && this.isPartition(x, y);
      if (sk) {
        // rear half box + a face toward the room above the furniture
        const { nx, ny } = sk;
        let x0 = x, x1 = x + 1, y0 = y, y1 = y + 1;
        if (nx === 1) x1 = x + 0.5; if (nx === -1) x0 = x + 0.5; if (ny === 1) y1 = y + 0.5; if (ny === -1) y0 = y + 0.5;
        top(x0, y0, x1, y1);
        if (nx !== 0) side(x, y, nx, 0, 0, 1, nx > 0 ? 0 : 0.5, nx > 0 ? 0.5 : 1, false);
        else side(x, y, 0, ny, 0, 1, ny > 0 ? 0 : 0.5, ny > 0 ? 0.5 : 1, false);
        continue;
      }
      top(x, y, x + 1, y + 1);
      for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const nsk = this.isWall(nx, ny) ? this.skins.get(ny * W + nx) : undefined;
        if (this.isWall(nx, ny) && !nsk) continue;
        if (nsk) {
          // close the gap beside a furnished neighbour: only the half toward its room
          const along = dx !== 0 ? nsk.ny : nsk.nx;
          if (along === 0) continue;
          const s0 = along > 0 ? 0.5 : 0, s1 = along > 0 ? 1 : 0.5;
          side(x, y, dx, dy, s0, s1, 0, 1, false);
          continue;
        }
        const glass = isPartitionRun && partition && this.openFloor(nx, ny);
        side(x, y, dx, dy, 0, 1, 0, 1, glass);
        if (glass) {
          const m = new THREE.Matrix4().compose(new THREE.Vector3(x + 0.5 + dx * 0.5, GLASS_Y * WALL_H, y + 0.5 + dy * 0.5), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rot(dx, dy)), new THREE.Vector3(1, 1, 1));
          mullions.push(m);
        }
        if (this.openFloor(nx, ny)) {
          const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rot(dx, dy));
          if (!glass && hash2(x, y, 31 + dx * 3 + dy) < 0.32) trays.push(new THREE.Matrix4().compose(new THREE.Vector3(x + 0.5 + dx * 0.57, WALL_H - 0.14, y + 0.5 + dy * 0.57), q, new THREE.Vector3(1, 1, 1)));
          else if (!glass && hash2(x, y, 37 + dx * 5 + dy) < 0.08) vents.push(new THREE.Matrix4().compose(new THREE.Vector3(x + 0.5 + dx * 0.505, 0.9, y + 0.5 + dy * 0.505), q, new THREE.Vector3(1, 1, 1)));
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    const all = [...idx[0], ...idx[1], ...idx[2]];
    g.setIndex(all);
    g.addGroup(0, idx[0].length, 0);
    g.addGroup(idx[0].length, idx[1].length, 1);
    g.addGroup(idx[0].length + idx[1].length, idx[2].length, 2);
    const wm = TX.wallMaps(WALL_H);
    const cap = TX.capMap();
    const fg = TX.frostedGlass();
    this.bag.push(wm.map, wm.normal, wm.rough, cap, fg);
    const wallMat = this.std({ map: wm.map, normalMap: wm.normal, roughness: 0.92, metalness: 0 }, true);
    const capMat = this.std({ map: cap, roughness: 0.95, metalness: 0, emissive: 0x15191c, emissiveIntensity: 1 }, true);
    const glassMat = this.std({ map: fg, color: 0x6d777c, roughness: 0.22, metalness: 0, envMap: this.env, envMapIntensity: 0.35, emissive: 0x0a1013, emissiveIntensity: 1 }, true);
    this.mesh(g, [wallMat, capMat, glassMat], true, true);

    // cable trays
    if (trays.length) {
      const tg = new THREE.BoxGeometry(1, 0.05, 0.13);
      const cg = new THREE.BoxGeometry(1, 0.045, 0.1);
      cg.translate(0, 0.04, 0);
      this.keep(tg); this.keep(cg);
      const cableMat = this.std({ color: 0x15171a, roughness: 0.7 });
      const ti = this.keep(new THREE.InstancedMesh(tg, this.steel, trays.length));
      const ci = this.keep(new THREE.InstancedMesh(cg, cableMat, trays.length));
      trays.forEach((m, i) => { ti.setMatrixAt(i, m); ci.setMatrixAt(i, m); });
      ti.castShadow = ci.castShadow = this.q.shadows;
      this.group.add(ti, ci);
    }
    if (vents.length) {
      const vt = this.keep(TX.ventGrille());
      const vg = this.keep(new THREE.PlaneGeometry(0.5, 0.25));
      vg.rotateY(0); // plane faces +Z which maps onto the wall normal through the instance rotation
      const vm = this.std({ map: vt, roughness: 0.6, metalness: 0.5, envMap: this.env, envMapIntensity: 0.3 });
      const vi = this.keep(new THREE.InstancedMesh(vg, vm, vents.length));
      vents.forEach((m, i) => vi.setMatrixAt(i, m));
      this.group.add(vi);
    }
    if (mullions.length) {
      // a rail at the bottom of the glass band and posts at both ends of each pane
      const rail = new THREE.BoxGeometry(1, 0.05, 0.05);
      const post = new THREE.BoxGeometry(0.04, (1 - GLASS_Y) * WALL_H, 0.05);
      post.translate(-0.5, ((1 - GLASS_Y) * WALL_H) / 2, 0);
      this.keep(rail); this.keep(post);
      const ri = this.keep(new THREE.InstancedMesh(rail, this.darkSteel, mullions.length));
      const pi = this.keep(new THREE.InstancedMesh(post, this.darkSteel, mullions.length));
      mullions.forEach((m, i) => { ri.setMatrixAt(i, m); pi.setMatrixAt(i, m); });
      this.group.add(ri, pi);
    }
    this.buildSkins();
  }

  /** A 1-thick interior partition with floor on both sides (gets the frosted band). */
  private isPartition(x: number, y: number): boolean {
    const W = this.w.map.w, H = this.w.map.h;
    if (x <= 0 || y <= 0 || x >= W - 1 || y >= H - 1) return false;
    const ns = this.openFloor(x, y - 1) && this.openFloor(x, y + 1);
    const ew = this.openFloor(x - 1, y) && this.openFloor(x + 1, y);
    return ns || ew;
  }

  private buildSkins(): void {
    const W = this.w.map.w;
    const groups = new Map<Skin, THREE.Matrix4[]>();
    for (const [key, s] of this.skins) {
      const x = key % W, y = Math.floor(key / W);
      const ang = s.nx === 1 ? Math.PI / 2 : s.nx === -1 ? -Math.PI / 2 : s.ny === -1 ? Math.PI : 0;
      const m = new THREE.Matrix4().compose(new THREE.Vector3(x + 0.5 + s.nx * 0.25, 0, y + 0.5 + s.ny * 0.25), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ang), new THREE.Vector3(1, 1, 1));
      if (!groups.has(s.skin)) groups.set(s.skin, []);
      groups.get(s.skin)!.push(m);
    }
    const side = this.std({ color: 0x2a2f33, roughness: 0.6, metalness: 0.5, envMap: this.env, envMapIntensity: 0.25 });
    for (const [skin, mats] of groups) {
      let geo: THREE.BufferGeometry;
      let materials: THREE.Material[];
      if (skin === 'rack') {
        const t = TX.rackFront();
        this.bag.push(t.map, t.emissive);
        const front = this.std({ map: t.map, emissiveMap: t.emissive, emissive: 0xffffff, emissiveIntensity: 2.2, roughness: 0.5, metalness: 0.4 });
        geo = new THREE.BoxGeometry(0.92, 1.14, 0.46).translate(0, 0.57, 0);
        materials = [side, side, side, side, front, side];
      } else if (skin === 'shelf') {
        const t = this.keep(TX.shelfFront());
        const front = this.std({ map: t, roughness: 0.85 });
        geo = new THREE.BoxGeometry(0.94, 1.08, 0.44).translate(0, 0.54, 0);
        materials = [side, side, side, side, front, side];
      } else if (skin === 'cabinet') {
        const t = this.keep(TX.cabinetFront());
        const front = this.std({ map: t, roughness: 0.55, metalness: 0.35, envMap: this.env, envMapIntensity: 0.3 });
        const paint = this.std({ color: 0x8a887e, roughness: 0.55, metalness: 0.35 });
        geo = new THREE.BoxGeometry(0.9, 0.9, 0.46).translate(0, 0.45, 0);
        materials = [paint, paint, paint, paint, front, paint];
      } else {
        const t = this.keep(TX.crateFace(5));
        const t2 = this.keep(TX.crateFace(9));
        const a = this.std({ map: t, roughness: 0.8 });
        const b = this.std({ map: t2, roughness: 0.8 });
        const g1 = new THREE.BoxGeometry(0.46, 0.46, 0.44).translate(-0.24, 0.23, 0);
        const g2 = new THREE.BoxGeometry(0.46, 0.46, 0.44).translate(0.24, 0.23, 0);
        const g3 = new THREE.BoxGeometry(0.5, 0.42, 0.42).translate(-0.05, 0.67, 0).rotateY(0.08);
        this.keep(g1); this.keep(g2); this.keep(g3);
        for (const [gg, mt] of [[g1, a], [g2, b], [g3, a]] as const) {
          const im = this.keep(new THREE.InstancedMesh(gg, mt, mats.length));
          mats.forEach((m, i) => im.setMatrixAt(i, m));
          im.castShadow = im.receiveShadow = this.q.shadows;
          this.group.add(im);
        }
        continue;
      }
      this.keep(geo);
      const im = this.keep(new THREE.InstancedMesh(geo, materials, mats.length));
      mats.forEach((m, i) => im.setMatrixAt(i, m));
      im.castShadow = im.receiveShadow = this.q.shadows;
      this.group.add(im);
    }
  }

  // ---- doors ---------------------------------------------------------------------------------
  private buildDoors(): void {
    const panelMat = this.std({ map: (this.steel.map as THREE.Texture), color: 0x9aa1a7, roughness: 0.38, metalness: 0.8, envMap: this.env, envMapIntensity: 0.55 });
    this.w.doors.forEach((d, i) => {
      const horiz = this.isWall(d.x - 1, d.y) || this.isWall(d.x + 1, d.y);
      const g = new THREE.Group();
      g.position.set(d.x + 0.5, 0, d.y + 0.5);
      if (!horiz) g.rotation.y = Math.PI / 2;
      this.group.add(g);
      const add = (geo: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number): THREE.Mesh => {
        this.keep(geo);
        const me = new THREE.Mesh(geo, m);
        me.position.set(x, y, z);
        me.castShadow = me.receiveShadow = this.q.shadows;
        g.add(me);
        return me;
      };
      add(new THREE.BoxGeometry(0.07, DOOR_H, 0.34), this.steel, -0.465, DOOR_H / 2, 0);
      add(new THREE.BoxGeometry(0.07, DOOR_H, 0.34), this.steel, 0.465, DOOR_H / 2, 0);
      add(new THREE.BoxGeometry(1, WALL_H - DOOR_H, 0.34), this.darkSteel, 0, DOOR_H + (WALL_H - DOOR_H) / 2, 0);
      const left = add(new THREE.BoxGeometry(0.5, DOOR_H - 0.02, 0.07), panelMat, -0.25, DOOR_H / 2, 0);
      const right = add(new THREE.BoxGeometry(0.5, DOOR_H - 0.02, 0.07), panelMat, 0.25, DOOR_H / 2, 0);
      if (d.card) {
        const cc = d.card === 'red' ? 0xd2434f : d.card === 'blue' ? 0x3d86e0 : 0xe8c33a;
        const sm = this.std({ color: cc, emissive: cc, emissiveIntensity: 0.6, roughness: 0.5 });
        for (const p of [left, right]) {
          const s = new THREE.Mesh(this.keep(new THREE.BoxGeometry(0.5, 0.06, 0.075)), sm);
          s.position.set(0, 0.18, 0);
          p.add(s);
        }
      }
      const lamp = this.std({ color: 0x111111, emissive: 0xffffff, emissiveIntensity: 2.5 });
      add(new THREE.BoxGeometry(0.16, 0.05, 0.36), lamp, 0, DOOR_H + 0.06, 0);
      const barMat = this.std({ color: 0x220707, emissive: this.pal.locked, emissiveIntensity: 1.8 });
      const bar = add(new THREE.BoxGeometry(0.9, 0.05, 0.09), barMat, 0, 0.55, 0);
      this.doors.push({ i, horiz, left, right, lamp, bar, open: d.open ? 1 : 0, x: d.x, y: d.y });
    });
  }

  // ---- lockers ---------------------------------------------------------------------------------
  private faceOf(x: number, y: number): [number, number] {
    for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) if (this.openFloor(x + dx, y + dy)) return [dx, dy];
    for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) if (!this.isWall(x + dx, y + dy)) return [dx, dy];
    return [0, 1];
  }
  private yawFor(dx: number, dy: number): number { return dx === 1 ? Math.PI / 2 : dx === -1 ? -Math.PI / 2 : dy === -1 ? Math.PI : 0; }

  private buildLockers(): void {
    const front = this.keep(TX.lockerFront());
    const fm = this.std({ map: front, roughness: 0.55, metalness: 0.45, envMap: this.env, envMapIntensity: 0.3 });
    const sm = this.std({ color: 0x46524d, roughness: 0.55, metalness: 0.45, envMap: this.env, envMapIntensity: 0.3 });
    const geo = this.keep(new THREE.BoxGeometry(0.84, 1.18, 0.64).translate(0, 0.59, 0));
    for (const l of this.w.map.lockers) {
      const [dx, dy] = this.faceOf(l.x, l.y);
      const g = new THREE.Group();
      g.position.set(l.x + 0.5, 0, l.y + 0.5);
      g.rotation.y = this.yawFor(dx, dy);
      const body = new THREE.Mesh(geo, [sm, sm, sm, sm, fm, sm]);
      body.castShadow = body.receiveShadow = this.q.shadows;
      g.add(body);
      const seam = this.std({ color: 0x050607, emissive: 0x9ff6ff, emissiveIntensity: 0 });
      const s1 = new THREE.Mesh(this.keep(new THREE.BoxGeometry(0.012, 1.08, 0.01)), seam);
      s1.position.set(0.0, 0.6, 0.325);
      const s2 = new THREE.Mesh(this.keep(new THREE.BoxGeometry(0.8, 0.012, 0.01)), seam);
      s2.position.set(0, 1.15, 0.325);
      const s3 = s2.clone(); s3.position.y = 0.05;
      g.add(s1, s2, s3);
      // lit frame on the top face: the side the tactical camera actually sees
      const tf = this.keep(new THREE.BoxGeometry(0.84, 0.02, 0.03));
      const ts = this.keep(new THREE.BoxGeometry(0.03, 0.02, 0.64));
      for (const [geo, x, z] of [[tf, 0, 0.305], [tf, 0, -0.305], [ts, 0.405, 0], [ts, -0.405, 0]] as const) {
        const m = new THREE.Mesh(geo, seam);
        m.position.set(x, 1.19, z);
        g.add(m);
      }
      this.group.add(g);
      this.lockers.push({ x: l.x, y: l.y, seam, fx: dx, fy: dy });
    }
  }

  // ---- terminals ---------------------------------------------------------------------------------
  private buildTerminals(): void {
    const desk = this.std({ color: 0x3a3631, roughness: 0.7, metalness: 0.1 });
    const top = this.std({ color: 0x55504a, roughness: 0.5, metalness: 0.1 });
    const bezel = this.std({ color: 0x15181b, roughness: 0.4, metalness: 0.3 });
    this.w.terminals.forEach((t, i) => {
      const [dx, dy] = this.faceOf(t.x, t.y);
      const g = new THREE.Group();
      g.position.set(t.x + 0.5, 0, t.y + 0.5);
      g.rotation.y = this.yawFor(dx, dy);
      this.group.add(g);
      const add = (geo: THREE.BufferGeometry, m: THREE.Material | THREE.Material[], x: number, y: number, z: number, rx = 0): THREE.Mesh => {
        this.keep(geo);
        const me = new THREE.Mesh(geo, m);
        me.position.set(x, y, z);
        me.rotation.x = rx;
        me.castShadow = me.receiveShadow = this.q.shadows;
        g.add(me);
        return me;
      };
      add(new THREE.BoxGeometry(0.94, 0.7, 0.6), desk, 0, 0.35, -0.05);
      add(new THREE.BoxGeometry(0.98, 0.04, 0.66), top, 0, 0.72, -0.04);
      add(new THREE.BoxGeometry(0.42, 0.015, 0.14), bezel, 0, 0.75, 0.14);
      add(new THREE.BoxGeometry(0.06, 0.16, 0.06), bezel, 0, 0.82, -0.14);
      add(new THREE.BoxGeometry(0.56, 0.36, 0.04), bezel, 0, 1.06, -0.12, -0.18);
      const [c, ctx] = TX.canvas(256, 160);
      const tx = this.keep(new THREE.CanvasTexture(c));
      tx.colorSpace = THREE.SRGBColorSpace;
      const screen = this.std({ color: 0x000000, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 1.7, roughness: 0.2 });
      add(new THREE.PlaneGeometry(0.5, 0.31), screen, 0, 1.06, -0.098, -0.18);
      // a second, smaller panel on the desk: the access reader
      const rd = this.std({ color: 0x0b0d0f, emissive: 0x5ef2ff, emissiveIntensity: 0.7 });
      add(new THREE.BoxGeometry(0.1, 0.02, 0.07), rd, 0.36, 0.75, 0.12);
      this.terminals.push({ i, ctx, tex: tx, sig: '', screen });
    });
  }

  private drawScreen(tv: TermView, w: World, time: number): void {
    const t = w.terminals[tv.i];
    const active = w.puzzle?.terminal === tv.i;
    const st = t.done ? 'done' : t.lockT > 0 ? `lock${Math.ceil(t.lockT)}` : active ? `run${Math.floor(time * 4)}` : 'idle';
    if (st === tv.sig) return;
    tv.sig = st;
    const g = tv.ctx;
    const col = t.done ? '#7dffb0' : t.lockT > 0 ? '#ff6a5e' : active ? '#f0a541' : '#7fe6f2';
    g.fillStyle = '#05080a'; g.fillRect(0, 0, 256, 160);
    g.fillStyle = col;
    g.globalAlpha = 0.08; g.fillRect(0, 0, 256, 160); g.globalAlpha = 1;
    g.font = '600 15px "IBM Plex Mono", monospace';
    g.fillText(`Terminal ${t.id}`, 14, 26);
    g.font = '500 13px "IBM Plex Mono", monospace';
    g.globalAlpha = 0.75;
    const label = t.def.label.charAt(0) + t.def.label.slice(1).toLowerCase();
    g.fillText(label, 14, 48);
    g.globalAlpha = 1;
    g.font = '600 24px "IBM Plex Mono", monospace';
    const big = t.done ? 'Complete' : t.lockT > 0 ? `Locked ${Math.ceil(t.lockT)} s` : active ? 'Session open' : 'Standby';
    g.fillText(big, 14, 92);
    g.globalAlpha = 0.5;
    for (let i = 0; i < 4; i++) g.fillRect(14, 112 + i * 9, 40 + ((i * 53 + (active ? Math.floor(time * 6) * 17 : 0)) % 170), 3);
    g.globalAlpha = 1;
    tv.tex.needsUpdate = true;
  }

  // ---- lasers ---------------------------------------------------------------------------------
  private buildLasers(): void {
    const hazeGeo = this.keep(new THREE.PlaneGeometry(1, 1));
    const hazeMat = this.keep(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      uniforms: { uColor: { value: this.pal.laser.clone() }, uFlick: { value: 1 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `uniform vec3 uColor; uniform float uFlick; varying vec2 vUv;
        void main(){ float y = vUv.y; float a = 0.0;
          a += exp(-pow((y - 0.22) * 22.0, 2.0)); a += exp(-pow((y - 0.5) * 22.0, 2.0)); a += exp(-pow((y - 0.78) * 22.0, 2.0));
          a = a * 0.5 + exp(-pow((y - 0.5) * 2.6, 2.0)) * 0.12;
          float ends = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);
          gl_FragColor = vec4(uColor * a * ends * uFlick * 0.55, 1.0); }`,
    }));
    const ghostMat = this.keep(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uColor: { value: this.pal.laser.clone() } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 uColor; varying vec2 vUv; void main(){ float d = step(0.5, fract(vUv.x * 8.0)); gl_FragColor = vec4(uColor, 0.35 * d); }',
    }));
    const beamMat = this.keep(new THREE.MeshBasicMaterial({ color: this.pal.laser.clone().multiplyScalar(6) }));
    const beamGeo = this.keep(new THREE.BoxGeometry(1, 0.014, 0.014));
    const postGeo = this.keep(new THREE.BoxGeometry(0.1, 0.96, 0.16).translate(0, 0.48, 0));
    const ledGeo = this.keep(new THREE.BoxGeometry(0.11, 0.03, 0.06));
    this.w.lasers.forEach((l, i) => {
      const runs = this.laserRuns(l.cells);
      const beams = new THREE.Group();
      this.group.add(beams);
      const haze: THREE.Mesh[] = [], ghost: THREE.Mesh[] = [];
      const leds = this.std({ color: 0x050505, emissive: this.pal.laser, emissiveIntensity: 2 });
      for (const r of runs) {
        const len = r.horiz ? r.x1 - r.x0 + 1 : r.y1 - r.y0 + 1;
        const cx = r.horiz ? (r.x0 + r.x1 + 1) / 2 : r.x0 + 0.5;
        const cz = r.horiz ? r.y0 + 0.5 : (r.y0 + r.y1 + 1) / 2;
        const yaw = r.horiz ? 0 : Math.PI / 2;
        for (const hgt of [0.22, 0.5, 0.78]) {
          const b = new THREE.Mesh(beamGeo, beamMat);
          b.scale.x = len;
          b.position.set(cx, hgt, cz);
          b.rotation.y = yaw;
          beams.add(b);
        }
        if (this.q.haze) {
          const hz = new THREE.Mesh(hazeGeo, hazeMat);
          hz.scale.set(len, 1.0, 1);
          hz.position.set(cx, 0.5, cz);
          hz.rotation.y = yaw;
          hz.renderOrder = 6;
          this.group.add(hz);
          haze.push(hz);
          const hz2 = hz.clone();
          hz2.rotation.y = yaw;
          hz2.rotateX(Math.PI / 2);
          hz2.scale.set(len, 0.5, 1);
          hz2.position.y = 0.012;
          this.group.add(hz2);
          haze.push(hz2);
        }
        const gh = new THREE.Mesh(this.keep(new THREE.PlaneGeometry(1, 0.05)), ghostMat);
        gh.scale.x = len;
        gh.rotation.set(-Math.PI / 2, 0, -yaw);
        gh.position.set(cx, 0.01, cz);
        this.group.add(gh);
        ghost.push(gh);
        // emitter posts at both ends
        for (const s of [-1, 1]) {
          const px = r.horiz ? cx + s * (len / 2 - 0.05) : cx;
          const pz = r.horiz ? cz : cz + s * (len / 2 - 0.05);
          const post = new THREE.Mesh(postGeo, this.darkSteel);
          post.position.set(px, 0, pz);
          post.rotation.y = yaw;
          post.castShadow = this.q.shadows;
          this.group.add(post);
          const led = new THREE.Mesh(ledGeo, leds);
          led.position.set(px, 0.93, pz);
          led.rotation.y = yaw;
          this.group.add(led);
        }
      }
      this.lasers.push({ i, beams, haze, ghost, leds });
    });
  }

  private laserRuns(cells: { x: number; y: number }[]): LaserRun[] {
    const set = new Set(cells.map((c) => `${c.x},${c.y}`));
    const used = new Set<string>();
    const runs: LaserRun[] = [];
    for (const c of cells) {
      const key = `${c.x},${c.y}`;
      if (used.has(key)) continue;
      const horizN = set.has(`${c.x + 1},${c.y}`) || set.has(`${c.x - 1},${c.y}`);
      const vertN = set.has(`${c.x},${c.y + 1}`) || set.has(`${c.x},${c.y - 1}`);
      const horiz = horizN || (!vertN && (this.isWall(c.x - 1, c.y) || this.isWall(c.x + 1, c.y)));
      let x0 = c.x, x1 = c.x, y0 = c.y, y1 = c.y;
      if (horiz) { while (set.has(`${x0 - 1},${c.y}`)) x0--; while (set.has(`${x1 + 1},${c.y}`)) x1++; for (let x = x0; x <= x1; x++) used.add(`${x},${c.y}`); }
      else { while (set.has(`${c.x},${y0 - 1}`)) y0--; while (set.has(`${c.x},${y1 + 1}`)) y1++; for (let y = y0; y <= y1; y++) used.add(`${c.x},${y}`); }
      runs.push({ x0, y0, x1, y1, horiz });
    }
    return runs;
  }

  // ---- fixtures and beacons ---------------------------------------------------------------------------
  private buildFixtures(): void {
    const fx = this.bake.fixtures;
    const housing = this.keep(new THREE.BoxGeometry(0.98, 0.045, 0.16));
    const tube = this.keep(new THREE.BoxGeometry(0.9, 0.025, 0.08).translate(0, 0.03, 0));
    const hm = this.std({ color: 0x2b2f33, roughness: 0.5, metalness: 0.6 });
    this.fixtureMat = this.keep(new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xeaf4ff, emissiveIntensity: 2.6 }));
    const hi = this.keep(new THREE.InstancedMesh(housing, hm, fx.length));
    const ti = this.keep(new THREE.InstancedMesh(tube, this.fixtureMat, fx.length));
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    fx.forEach((f, i) => {
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), f.horiz ? 0 : Math.PI / 2);
      m.compose(new THREE.Vector3(f.x, FIXTURE_H, f.y), q, new THREE.Vector3(1, 1, 1));
      hi.setMatrixAt(i, m); ti.setMatrixAt(i, m);
      ti.setColorAt(i, f.warm ? new THREE.Color(1, 0.8, 0.55) : new THREE.Color(1, 1, 1));
    });
    this.group.add(hi, ti);
    this.fixHousing = hi; this.fixTube = ti;
    const bc = this.bake.beacons;
    this.beaconMat = this.keep(new THREE.MeshStandardMaterial({ color: 0x1a0c06, emissive: 0xff6a2a, emissiveIntensity: 0, roughness: 0.3 }));
    if (bc.length) {
      const bg = this.keep(new THREE.CylinderGeometry(0.07, 0.09, 0.11, 12));
      const bi = this.keep(new THREE.InstancedMesh(bg, this.beaconMat, bc.length));
      bc.forEach((b, i) => { m.makeTranslation(b.x + 0.35, FIXTURE_H + 0.02, b.y); bi.setMatrixAt(i, m); });
      this.group.add(bi);
      this.beaconMesh = bi;
    }
  }

  // ---- items, exit, checkpoints ---------------------------------------------------------------------------
  private buildItems(): void {
    this.w.items.forEach((it, i) => {
      let obj: THREE.Object3D;
      if (it.kind === 'card') {
        const cc = it.card === 'red' ? 0xd2434f : it.card === 'blue' ? 0x3d86e0 : 0xe8c33a;
        const g = new THREE.Group();
        const body = new THREE.Mesh(this.keep(new THREE.BoxGeometry(0.3, 0.012, 0.19)), this.std({ color: cc, emissive: cc, emissiveIntensity: 0.9, roughness: 0.35 }));
        const chip = new THREE.Mesh(this.keep(new THREE.BoxGeometry(0.06, 0.014, 0.05)), this.std({ color: 0xc9a85a, metalness: 0.9, roughness: 0.3, envMap: this.env, envMapIntensity: 0.6 }));
        chip.position.set(-0.07, 0.002, 0.02);
        g.add(body, chip);
        g.rotation.z = 0.5;
        obj = g;
      } else if (it.kind === 'energy') {
        const g = new THREE.Group();
        const cell = new THREE.Mesh(this.keep(new THREE.CylinderGeometry(0.075, 0.075, 0.22, 14)), this.std({ color: 0x2a2f33, metalness: 0.7, roughness: 0.4, envMap: this.env, envMapIntensity: 0.5 }));
        const band = new THREE.Mesh(this.keep(new THREE.CylinderGeometry(0.078, 0.078, 0.06, 14)), this.std({ color: 0x0a1a10, emissive: 0x6dffa6, emissiveIntensity: 2.2 }));
        g.add(cell, band);
        obj = g;
      } else {
        const m = new THREE.Mesh(this.keep(new THREE.CylinderGeometry(0.15, 0.15, 0.07, 6)), this.std({ color: 0x1b0f1a, emissive: 0xff8fe6, emissiveIntensity: 1.6, roughness: 0.3 }));
        m.rotation.x = Math.PI / 2;
        obj = m;
      }
      obj.position.set(it.x + 0.5, 0.42, it.y + 0.5);
      this.group.add(obj);
      this.items.push({ i, mesh: obj, base: 0.42 });
    });
  }

  private buildMarkers(): void {
    const w = this.w;
    const chev = this.keep(TX.chevronPlate());
    this.exitMat = this.keep(new THREE.MeshBasicMaterial({ map: chev, color: 0x3a4650, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    const plate = new THREE.Mesh(this.keep(new THREE.PlaneGeometry(0.92, 0.92).rotateX(-Math.PI / 2)), this.exitMat);
    plate.position.set(w.map.exit.x + 0.5, 0.012, w.map.exit.y + 0.5);
    this.group.add(plate);
    const colMat = this.keep(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      uniforms: { uColor: { value: this.pal.ok.clone() } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 uColor; varying vec2 vUv; void main(){ float a = pow(1.0 - vUv.y, 2.0) * 0.45; gl_FragColor = vec4(uColor * a, 1.0); }',
    }));
    this.exitColumn = new THREE.Mesh(this.keep(new THREE.CylinderGeometry(0.42, 0.42, 1.6, 20, 1, true).translate(0, 0.8, 0)), colMat);
    this.exitColumn.position.set(w.map.exit.x + 0.5, 0, w.map.exit.y + 0.5);
    this.exitColumn.visible = false;
    this.group.add(this.exitColumn);
    const dt = this.keep(TX.diamondDecal());
    for (const c of w.checkpoints) {
      const m = this.keep(new THREE.MeshBasicMaterial({ map: dt, color: 0x56646e, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      const p = new THREE.Mesh(this.keep(new THREE.PlaneGeometry(0.6, 0.6).rotateX(-Math.PI / 2)), m);
      p.position.set(c.x + 0.5, 0.011, c.y + 0.5);
      this.group.add(p);
      this.checkpoints.push(m);
    }
  }

  // ---- cameras ---------------------------------------------------------------------------------
  private buildCameras(): void {
    const w = this.w;
    const housingMat = this.std({ color: 0xc9cdd0, roughness: 0.45, metalness: 0.2 });
    w.cameras.forEach((c, i) => {
      // bracket back toward the nearest wall opposite the base direction
      const bx = -Math.cos(c.baseDir), by = -Math.sin(c.baseDir);
      let arm = 0.3;
      for (let d = 0.05; d < 1.6; d += 0.05) if (this.isWall(Math.floor(c.x + bx * d), Math.floor(c.y + by * d))) { arm = d; break; }
      const H = 1.08;
      const base = new THREE.Group();
      base.position.set(c.x, H, c.y);
      this.group.add(base);
      const bracket = new THREE.Mesh(this.keep(new THREE.BoxGeometry(arm, 0.04, 0.04).translate(arm / 2, 0, 0)), this.darkSteel);
      bracket.rotation.y = -Math.atan2(by, bx);
      bracket.castShadow = this.q.shadows;
      base.add(bracket);
      const plateM = new THREE.Mesh(this.keep(new THREE.BoxGeometry(0.03, 0.16, 0.12)), this.darkSteel);
      plateM.position.set(bx * arm, 0, by * arm);
      plateM.rotation.y = -Math.atan2(by, bx);
      base.add(plateM);
      const yaw = new THREE.Group();
      base.add(yaw);
      const body = new THREE.Mesh(this.keep(new THREE.BoxGeometry(0.28, 0.11, 0.12)), housingMat);
      body.position.x = 0.06;
      body.rotation.z = -0.25;
      body.castShadow = this.q.shadows;
      yaw.add(body);
      const hood = new THREE.Mesh(this.keep(new THREE.BoxGeometry(0.3, 0.015, 0.15)), this.darkSteel);
      hood.position.set(0.07, 0.065, 0);
      hood.rotation.z = -0.25;
      yaw.add(hood);
      const lens = new THREE.Mesh(this.keep(new THREE.CylinderGeometry(0.035, 0.04, 0.03, 14)), this.std({ color: 0x050607, roughness: 0.05, metalness: 0.4, envMap: this.env, envMapIntensity: 1 }));
      lens.rotation.z = Math.PI / 2 - 0.25;
      lens.position.set(0.2, -0.035, 0);
      yaw.add(lens);
      const led = this.std({ color: 0x110505, emissive: this.pal.alert, emissiveIntensity: 2 });
      const ledM = new THREE.Mesh(this.keep(new THREE.SphereGeometry(0.014, 8, 6)), led);
      ledM.position.set(0.17, 0.03, 0.05);
      yaw.add(ledM);
      const lensPos = new THREE.Object3D();
      lensPos.position.set(0.22, -0.045, 0);
      yaw.add(lensPos);
      this.cams.push({ i, yaw, led, lensPos });
    });
  }

  // ---- per-frame ---------------------------------------------------------------------------------
  /** Hide the ceiling fixture hanging over the operative so it never covers them. */
  private updateFixtures(px: number, py: number, menu: boolean): void {
    let near = -1;
    if (!menu) this.bake.fixtures.forEach((f, i) => { if (Math.abs(f.x - px) < 1.1 && py - f.y < 1.3 && py - f.y > -0.9) near = i; });
    if (near === this.fixHidden || !this.fixHousing || !this.fixTube) return;
    const m = new THREE.Matrix4(), q = new THREE.Quaternion();
    const set = (i: number, s: number): void => {
      const f = this.bake.fixtures[i];
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), f.horiz ? 0 : Math.PI / 2);
      m.compose(new THREE.Vector3(f.x, FIXTURE_H, f.y), q, new THREE.Vector3(s, s, s));
      this.fixHousing!.setMatrixAt(i, m); this.fixTube!.setMatrixAt(i, m);
    };
    if (this.fixHidden >= 0) set(this.fixHidden, 1);
    if (near >= 0) set(near, 0.0001);
    this.fixHousing.instanceMatrix.needsUpdate = true; this.fixTube.instanceMatrix.needsUpdate = true;
    this.fixHidden = near;
  }

  update(w: World, dt: number, time: number, reduce: boolean, pal: Palette, menu = false): void {
    this.updateFixtures(w.player.x, w.player.y, menu || w.player.hidden);
    for (const d of this.doors) {
      const s = w.doors[d.i];
      const tgt = s.open ? 1 : 0;
      d.open += (tgt - d.open) * (1 - Math.exp(-dt * 9));
      if (dt === 0) d.open = tgt;
      const off = d.open * 0.47;
      d.left.position.x = -0.25 - off;
      d.right.position.x = 0.25 + off;
      d.lamp.emissive.copy(s.locked ? pal.locked : pal.amber);
      d.lamp.emissiveIntensity = s.locked ? 2.4 : 1.2;
      d.bar.visible = s.locked && d.open < 0.1;
    }
    const flick = reduce ? 1 : 0.88 + 0.12 * Math.sin(time * 41) * Math.sin(time * 13);
    for (const lv of this.lasers) {
      const l = w.lasers[lv.i];
      lv.beams.visible = l.active;
      for (const h of lv.haze) { h.visible = l.active; ((h.material as THREE.ShaderMaterial).uniforms.uFlick.value = flick); }
      for (const g of lv.ghost) g.visible = !l.active;
      lv.leds.emissiveIntensity = l.active ? 2.4 : (reduce || Math.floor(time * 2) % 2 === 0 ? 0.6 : 0.15);
      lv.leds.emissive.copy(l.active ? pal.laser : pal.amber);
    }
    for (const tv of this.terminals) this.drawScreen(tv, w, time);
    for (const lk of this.lockers) {
      const inside = w.player.hidden && Math.floor(w.player.x) === lk.x && Math.floor(w.player.y) === lk.y;
      lk.seam.emissiveIntensity = inside ? (reduce ? 2.2 : 1.8 + 0.5 * Math.sin(time * 3)) : 0;
    }
    for (const iv of this.items) {
      const it = w.items[iv.i];
      iv.mesh.visible = !it.taken;
      if (!reduce) { iv.mesh.rotation.y = time * 1.4; iv.mesh.position.y = iv.base + Math.sin(time * 2.4 + it.x) * 0.04; }
    }
    const ready = w.def.objectives.filter((o) => o.id !== 'extract' && !o.optional).every((o) => w.objectives[o.id]);
    this.exitMat.color.copy(ready ? pal.ok : new THREE.Color(0x3a4650));
    this.exitColumn.visible = ready;
    w.checkpoints.forEach((c, i) => { if (this.checkpoints[i]) this.checkpoints[i].color.copy(c.hit ? pal.ok : new THREE.Color(0x56646e)); });
    this.cams.forEach((cv) => {
      const c: SimCamera = w.cameras[cv.i];
      cv.yaw.rotation.y = -c.dir;
      const looped = c.loopT > 0;
      const blink = reduce || Math.floor(time * 2.5) % 2 === 0;
      cv.led.emissive.copy(looped ? new THREE.Color(0x777777) : c.trackT > 0 ? pal.alert : pal.alert);
      cv.led.emissiveIntensity = looped ? 0.5 : blink ? 2.6 : 0.2;
    });
  }

  dispose(): void {
    this.group.removeFromParent();
    for (const d of this.bag) d.dispose();
    this.bag.length = 0;
  }
}
