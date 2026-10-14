import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PALETTE } from '../game/GameConfig';
import { CollisionWorld } from './CollisionWorld';
import { additive, createBuildingMaterial, createGlowTexture, createGroundMaterial, createNeonSignTexture, createStreakTexture, type RoadLayout } from './Materials';
import { buildCarModel } from '../vehicles/CarModel';
import { staticBatch } from './batch';

export const ROADS = [-100, -50, 0, 50, 100];
const PARKED_HEAD = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.25, 0.25, 0.25), toneMapped: false });
const PARKED_TAIL = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.35, 0.02, 0.05), toneMapped: false });
export const ROAD_HALF = 7;
const SIDEWALK = 3;
const LOT_HALF = 15;

/** Deterministic RNG so the city is identical on every visit. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface NeonSign {
  material: THREE.MeshBasicMaterial;
  base: THREE.Color;
  mode: 'steady' | 'flicker' | 'pulse' | 'chase';
  seed: number;
}

export interface CarSpot {
  x: number;
  z: number;
  heading: number;
  color: number;
  accent: number;
}

export interface CityLayout {
  playerStart: THREE.Vector3;
  playerStartYaw: number;
  drivableCars: CarSpot[];
  lightSpots: Array<{ x: number; y: number; z: number; color: number; intensity: number; distance: number }>;
  signs: NeonSign[];
  blinkers: THREE.MeshBasicMaterial[];
  steamVents: THREE.Vector3[];
}

type BuildingKind = 'mid' | 'tower' | 'hotel' | 'alley' | 'backdrop';

interface BuildingSpec {
  x: number; z: number; w: number; d: number; h: number; y0: number;
  color: number; accent: number; seed: number;
}

const WALL_COLORS: Record<BuildingKind, number[]> = {
  mid: [0x2a2140, 0x1f2a44, 0x33213a, 0x252536, 0x2c1f30, 0x1c2638],
  tower: [0x1a2240, 0x221a3a, 0x162032, 0x2a2448, 0x1d1d33],
  hotel: [0x8c4c72, 0x3f7f78, 0x6c5ca8, 0x9a5a62, 0x4a6a9a, 0xa07a5a],
  alley: [0x2b2028, 0x262126, 0x2d2420, 0x1f2224],
  backdrop: [0x151226, 0x1a1530, 0x120f20, 0x1c1830],
};
const ACCENTS = [PALETTE.magenta, PALETTE.cyan, PALETTE.purple, PALETTE.pink, PALETTE.blue, PALETTE.orange];

/** Collects transforms per prop type, then emits one InstancedMesh each. */
class PropBatch {
  private readonly items = new Map<string, { geo: THREE.BufferGeometry; mat: THREE.Material; mats: THREE.Matrix4[]; shadow: boolean }>();
  private readonly m = new THREE.Matrix4();
  private readonly q = new THREE.Quaternion();
  private readonly e = new THREE.Euler();
  private readonly s = new THREE.Vector3();
  private readonly p = new THREE.Vector3();

  define(kind: string, geo: THREE.BufferGeometry, mat: THREE.Material, shadow = true): void {
    this.items.set(kind, { geo, mat, mats: [], shadow });
  }

  add(kind: string, x: number, y: number, z: number, rotY = 0, sx = 1, sy = 1, sz = 1): void {
    const item = this.items.get(kind)!;
    this.q.setFromEuler(this.e.set(0, rotY, 0));
    item.mats.push(this.m.compose(this.p.set(x, y, z), this.q, this.s.set(sx, sy, sz)).clone());
  }

  build(parent: THREE.Object3D): void {
    for (const { geo, mat, mats, shadow } of this.items.values()) {
      if (!mats.length) continue;
      const mesh = new THREE.InstancedMesh(geo, mat, mats.length);
      mats.forEach((mm, i) => mesh.setMatrixAt(i, mm));
      mesh.castShadow = shadow;
      mesh.receiveShadow = true;
      mesh.computeBoundingSphere();
      parent.add(mesh);
    }
  }
}

export class CityGenerator {
  readonly group = new THREE.Group();
  private readonly rng = mulberry32(1986);
  private readonly buildings: BuildingSpec[] = [];
  private readonly props = new PropBatch();
  private readonly glowTex = createGlowTexture();
  private readonly streakTex = createStreakTexture();
  private readonly pools: Array<{ x: number; z: number; color: number; size: number }> = [];
  readonly layout: CityLayout = {
    playerStart: new THREE.Vector3(25, 0, 21),
    playerStartYaw: 0,
    drivableCars: [],
    lightSpots: [],
    signs: [],
    blinkers: [],
    steamVents: [],
  };

  constructor(private readonly world: CollisionWorld) {}

  private r(min: number, max: number): number {
    return min + (max - min) * this.rng();
  }

  private pick<T>(arr: T[]): T {
    return arr[Math.floor(this.rng() * arr.length)];
  }

  generate(): CityLayout {
    this.defineProps();
    this.buildGround();
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 4; iz++) {
        const cx = -75 + ix * 50, cz = -75 + iz * 50;
        const key = `${ix},${iz}`;
        if (key === '2,2') this.buildPlaza(cx, cz);
        else if (key === '0,3') this.buildGarage(cx, cz);
        else if (key === '1,3') this.buildBackstreet(cx, cz);
        else if (key === '3,3') this.buildParkingLot(cx, cz);
        else if (ix === 3) this.buildHotels(cx, cz, iz);
        else if ((ix === 1 || ix === 2) && (iz === 1 || iz === 2)) this.buildDowntown(cx, cz);
        else this.buildMidrise(cx, cz);
      }
    }
    this.buildStreetFurniture();
    this.buildPromenade();
    this.buildBoundary();
    this.buildBackdrop();
    this.buildBridge();
    this.buildParkedCars();
    // Merge every static one-off mesh (parked cars, garage, plaza pieces…) per material.
    staticBatch(this.group);
    this.emitBuildings();
    this.emitLightPools();
    this.props.build(this.group);
    this.world.buildNav();
    return this.layout;
  }

  // ---------------------------------------------------------------- ground
  private buildGround(): void {
    const layout: RoadLayout = { xs: ROADS, zs: ROADS, halfWidth: ROAD_HALF, sidewalk: SIDEWALK };
    const geo = new THREE.PlaneGeometry(420, 420, 1, 1);
    geo.rotateX(-Math.PI / 2);
    geo.translate(-90, 0, 0);
    const ground = new THREE.Mesh(geo, createGroundMaterial(layout));
    ground.receiveShadow = true;
    this.group.add(ground);

    // Kerbs: thin raised strips along every sidewalk edge that read in the headlights.
    const kerbMat = new THREE.MeshStandardMaterial({ color: 0x2a2236, roughness: 0.5 });
    const kerb = new THREE.BoxGeometry(1, 1, 1);
    this.props.define('kerb', kerb, kerbMat, false);
    for (const rx of ROADS) {
      for (let i = 0; i < 4; i++) {
        const z0 = -100 + i * 50 + ROAD_HALF, z1 = -100 + (i + 1) * 50 - ROAD_HALF;
        for (const side of [-1, 1]) {
          if (rx === 100 && side === 1) continue;
          this.props.add('kerb', rx + side * (ROAD_HALF + 0.1), 0.06, (z0 + z1) / 2, 0, 0.2, 0.12, z1 - z0);
        }
      }
    }
    for (const rz of ROADS) {
      for (let i = 0; i < 4; i++) {
        const x0 = -100 + i * 50 + ROAD_HALF, x1 = -100 + (i + 1) * 50 - ROAD_HALF;
        for (const side of [-1, 1]) {
          if (Math.abs(rz) === 100 && side === Math.sign(rz)) continue;
          this.props.add('kerb', (x0 + x1) / 2, 0.06, rz + side * (ROAD_HALF + 0.1), 0, x1 - x0, 0.12, 0.2);
        }
      }
    }
  }

  // ------------------------------------------------------------- buildings
  private addBuilding(kind: BuildingKind, x: number, z: number, w: number, d: number, h: number, y0 = 0, collide = true, accent?: number): BuildingSpec {
    const spec: BuildingSpec = {
      x, z, w, d, h, y0,
      color: this.pick(WALL_COLORS[kind]),
      accent: accent ?? this.pick(ACCENTS),
      seed: this.rng(),
    };
    this.buildings.push(spec);
    if (collide) this.world.addCentered(x, z, w, d, h, y0);
    return spec;
  }

  /** Stacked set-back tiers, Art Deco style, optionally crowned with a blinking spire. */
  private addTieredTower(kind: BuildingKind, x: number, z: number, w: number, d: number, h: number, tiers: number, spire: boolean): void {
    const base = this.addBuilding(kind, x, z, w, d, h * (tiers > 1 ? 0.62 : 1));
    let y = base.h, cw = w, cd = d;
    for (let t = 1; t < tiers; t++) {
      cw *= 0.74; cd *= 0.74;
      const th = (h * 0.38) / (tiers - 1);
      this.addBuilding(kind, x, z, cw, cd, th, y, true, base.accent);
      y += th;
    }
    if (spire) {
      this.props.add('spire', x, y, z, 0, 1, this.r(6, 12), 1);
      const blink = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff2040).multiplyScalar(3), toneMapped: false });
      const light = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 6), blink);
      light.position.set(x, y + 12.2, z);
      this.group.add(light);
      this.layout.blinkers.push(blink);
    }
  }

  private buildMidrise(cx: number, cz: number): void {
    const split = this.rng() < 0.5 ? 2 : 3;
    const span = (LOT_HALF * 2) / split;
    for (let i = 0; i < split; i++) {
      for (let j = 0; j < 2; j++) {
        const w = span - this.r(0.2, 2.5), d = LOT_HALF - this.r(0.2, 2.5);
        const x = cx - LOT_HALF + span * (i + 0.5);
        const z = cz - LOT_HALF / 2 + j * LOT_HALF;
        const h = this.r(9, 30);
        if (this.rng() < 0.3) this.addTieredTower('mid', x, z, w, d, h + 8, 2, false);
        else this.addBuilding('mid', x, z, w, d, h);
        if (this.rng() < 0.35) this.addRooftopBillboard(x, z, w, d, h);
      }
    }
  }

  private buildDowntown(cx: number, cz: number): void {
    const names = ['HELIX CORP', 'ORBITAL BANK', 'NOVA TOWER', 'PRISM MEDIA'];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const signTower = i === 0 && j === 1;
        if (!signTower && this.rng() < 0.18) continue; // occasional pocket plaza between towers
        const x = cx - 7.5 + i * 15, z = cz - 7.5 + j * 15;
        const w = this.r(11, 13.6), d = this.r(11, 13.6), h = this.r(42, 92);
        this.addTieredTower('tower', x, z, w, d, h, this.rng() < 0.7 ? 3 : 2, this.rng() < 0.6);
        if (signTower) {
          // Corporate name glowing high on the street-facing facade.
          this.addSign(this.pick(names), x, Math.min(22, h * 0.4), z + d / 2 + 0.08, 0, w * 0.85, 2.4, this.pick([PALETTE.cyan, PALETTE.magenta, PALETTE.purple]), 'pulse', false);
        }
      }
    }
  }

  private buildHotels(cx: number, cz: number, iz: number): void {
    const hotelNames = [
      ['HOTEL SOLANA', 'VACANCY'], ['CORAL PALMS', 'COCKTAILS'], ['FLAMINGO NOIR', 'HOTEL'],
      ['BLUE MARLIN', 'SUITES'], ['MOONGLOW', 'MOTOR INN'], ['STARLIGHT', 'CASINO'],
    ];
    const signColors = [PALETTE.pink, PALETTE.cyan, PALETTE.magenta, PALETTE.blue, PALETTE.purple, PALETTE.orange];
    for (let j = 0; j < 2; j++) {
      const z = cz - 7.4 + j * 14.8;
      const h = this.r(13, 24);
      const spec = this.addBuilding('hotel', cx + 1, z, 26, 12.4, h);
      // Stepped Art Deco crown.
      this.addBuilding('hotel', cx + 1, z, 16, 8.4, 3.2, h, true, spec.accent).color = spec.color;
      this.addBuilding('hotel', cx + 1, z, 6, 4, 2.4, h + 3.2, true, spec.accent).color = spec.color;
      const idx = (iz * 2 + j) % hotelNames.length;
      const [name, sub] = hotelNames[idx];
      this.addSign(name, cx + 14.15, h * 0.62, z, Math.PI / 2, 11, 3.6, signColors[idx], idx % 2 ? 'flicker' : 'steady', true, sub);
      // Entrance canopy (camera-only collision, walkable underneath).
      this.props.add('canopy', cx + 15.3, 3.4, z, 0, 2.6, 0.25, 6);
      this.world.addCentered(cx + 15.3, z, 2.6, 6, 0.25, 3.3, false);
    }
    this.layout.lightSpots.push({ x: cx + 18, y: 5, z: cz, color: PALETTE.cyan, intensity: 30, distance: 26 });
  }

  private buildPlaza(cx: number, cz: number): void {
    // Raised tiled deck with an animated neon grid.
    const deckTex = this.createPlazaTexture();
    const deck = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ map: deckTex, emissiveMap: deckTex, emissive: 0xffffff, emissiveIntensity: 0.55, roughness: 0.18, metalness: 0.3, envMapIntensity: 1.2 }),
    );
    deck.rotation.x = -Math.PI / 2;
    deck.position.set(cx, 0.02, cz);
    deck.receiveShadow = true;
    this.group.add(deck);

    // Fountain: rim, water disc and glowing core.
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.8, 0.7, 28, 1, true), new THREE.MeshStandardMaterial({ color: 0x3a2d55, roughness: 0.4, side: THREE.DoubleSide }));
    rim.position.set(cx, 0.35, cz);
    const water = new THREE.Mesh(new THREE.CircleGeometry(3.6, 28), new THREE.MeshStandardMaterial({ color: 0x0a1030, roughness: 0.02, metalness: 0.8, emissive: 0x2a3cff, emissiveIntensity: 0.35 }));
    water.rotation.x = -Math.PI / 2;
    water.position.set(cx, 0.55, cz);
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.5, 4.5, 10), new THREE.MeshBasicMaterial({ color: new THREE.Color(PALETTE.cyan).multiplyScalar(1.6), toneMapped: false }));
    core.position.set(cx, 2.25, cz);
    this.group.add(rim, water, core);
    this.world.addCentered(cx, cz, 6.6, 6.6, 0.7);
    this.world.addCentered(cx, cz, 1.2, 1.2, 4.5);
    this.layout.lightSpots.push({ x: cx, y: 3.5, z: cz, color: PALETTE.magenta, intensity: 45, distance: 30 });

    // Monument sign on the south edge.
    this.props.add('pylon', cx - 9, 0, cz + 13, 0, 1, 7, 1);
    this.props.add('pylon', cx + 9, 0, cz + 13, 0, 1, 7, 1);
    this.world.addCentered(cx - 9, cz + 13, 0.8, 0.8, 7);
    this.world.addCentered(cx + 9, cz + 13, 0.8, 0.8, 7);
    this.addSign('PALMWAVE PLAZA', cx, 6.6, cz + 13, 0, 17, 3.4, PALETTE.magenta, 'chase', true);
    this.addSign('PALMWAVE PLAZA', cx, 6.6, cz + 12.98, Math.PI, 17, 3.4, PALETTE.magenta, 'chase', false);

    // Neon arches over the plaza entrances.
    const archGeo = new THREE.TorusGeometry(5, 0.14, 8, 32, Math.PI);
    for (const [ax, az, ry, col] of [[cx, cz - 14.6, 0, PALETTE.cyan], [cx - 14.6, cz, Math.PI / 2, PALETTE.pink]] as const) {
      const arch = new THREE.Mesh(archGeo, new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(2.2), toneMapped: false }));
      arch.position.set(ax, 0, az);
      arch.rotation.y = ry;
      this.group.add(arch);
    }

    // Planters with palms (cover), benches and jersey barriers.
    for (const [px, pz] of [[-9, -9], [9, -9], [-9, 6], [9, 6]]) {
      this.props.add('planter', cx + px, 0, cz + pz, 0, 2.6, 1, 2.6);
      this.world.addCentered(cx + px, cz + pz, 2.6, 2.6, 1);
      this.addPalm(cx + px, cz + pz, 1);
    }
    for (const [bx, bz, ry] of [[-4.5, -12, 0], [4.5, -12, 0], [-12, -2, Math.PI / 2], [12, -2, Math.PI / 2]]) {
      this.addBench(cx + bx, cz + bz, ry);
    }
    for (const [bx, bz, ry] of [[-5, 8, 0], [5, 8, 0], [-6.5, 0, Math.PI / 2], [6.5, 0, Math.PI / 2]]) {
      this.addBarrier(cx + bx, cz + bz, ry);
    }
    this.layout.playerStart.set(cx, 0, cz - 9.5);
    this.layout.playerStartYaw = 0;
  }

  private buildGarage(cx: number, cz: number): void {
    const H = 5.2;
    const concrete = new THREE.MeshStandardMaterial({ color: 0x3a3646, roughness: 0.85 });
    const box = new THREE.BoxGeometry(1, 1, 1);
    const addSlab = (x: number, y: number, z: number, w: number, h: number, d: number, mat: THREE.Material = concrete, collide = true) => {
      const m = new THREE.Mesh(box, mat);
      m.position.set(x, y + h / 2, z);
      m.scale.set(w, h, d);
      m.castShadow = true;
      m.receiveShadow = true;
      this.group.add(m);
      if (collide) this.world.addCentered(x, z, w, d, h, y);
    };
    // Walls: north, south, west; east side open to the street with two entrances.
    addSlab(cx, 0, cz - 14.6, 30, H, 0.8);
    addSlab(cx, 0, cz + 14.6, 30, H, 0.8);
    addSlab(cx - 14.6, 0, cz, 0.8, H, 30);
    addSlab(cx + 14.6, 0, cz - 9.5, 0.8, H, 11);
    addSlab(cx + 14.6, 0, cz + 9.5, 0.8, H, 11);
    addSlab(cx + 14.6, 3.4, cz, 0.8, H - 3.4, 8);
    // Roof deck (upper storey) and pillars.
    addSlab(cx, H, cz, 30, 0.6, 30);
    this.addBuilding('mid', cx, cz, 30, 30, 9, H + 0.6);
    for (const px of [-7, 0, 7]) for (const pz of [-7, 7]) addSlab(cx + px, 0, cz + pz, 0.9, H, 0.9);
    // Fluorescent ceiling strips + painted bays.
    const strip = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xbff6ff).multiplyScalar(1.8), toneMapped: false });
    for (const lz of [-10, -3.5, 3.5, 10]) {
      const m = new THREE.Mesh(box, strip);
      m.position.set(cx, H - 0.08, cz + lz);
      m.scale.set(22, 0.08, 0.25);
      this.group.add(m);
    }
    const bayMat = new THREE.MeshBasicMaterial({ color: 0xffd84a, transparent: true, opacity: 0.6 });
    for (let i = -3; i <= 3; i++) {
      for (const side of [-1, 1]) {
        const m = new THREE.Mesh(box, bayMat);
        m.position.set(cx + i * 3.6, 0.03, cz + side * 11);
        m.scale.set(0.12, 0.02, 6);
        this.group.add(m);
      }
    }
    this.addSign('P  LEVEL 1', cx + 15.1, 4.1, cz, Math.PI / 2, 6, 1.3, PALETTE.cyan, 'flicker', false);
    this.addSign('MIDNIGHT PARKING', cx + 15.1, 8.2, cz, Math.PI / 2, 14, 2.4, PALETTE.yellow, 'steady', true);
    this.layout.lightSpots.push({ x: cx, y: 4.2, z: cz, color: 0x9fe8ff, intensity: 40, distance: 24 });
    this.layout.drivableCars.push({ x: cx + 4, z: cz - 3, heading: Math.PI / 2, color: 0x16161f, accent: PALETTE.cyan });
    for (const [px, pz] of [[-8, -11], [-4.4, 11], [8, 11]]) this.addParkedCar(cx + px, cz + pz, 0);
    for (const [px, pz] of [[-10, 2], [10, -1]]) this.addCrateStack(cx + px, cz + pz);
  }

  private buildBackstreet(cx: number, cz: number): void {
    const alley = 6;
    const bw = (LOT_HALF * 2 - alley) / 2;
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const x = cx + sx * (alley / 2 + bw / 2), z = cz + sz * (alley / 2 + bw / 2);
        this.addBuilding('alley', x, z, bw, bw, this.r(9, 16));
      }
    }
    // Cover clutter along the alleys.
    this.addDumpster(cx - 1.6, cz - 9, 0);
    this.addDumpster(cx + 1.8, cz + 8.5, 0);
    this.addDumpster(cx - 9, cz + 1.6, Math.PI / 2);
    this.addCrateStack(cx + 9.5, cz - 1.6);
    this.addCrateStack(cx - 1.5, cz + 13);
    this.addCrateStack(cx + 1.5, cz - 13.5);
    this.addBarrier(cx + 13, cz, Math.PI / 2);
    this.addBarrier(cx - 13, cz, Math.PI / 2);
    for (const [bx, bz] of [[1.8, -4], [-1.8, 5], [5, 1.8], [-5, -1.8]]) this.props.add('barrel', cx + bx, 0, cz + bz);
    for (const [bx, bz] of [[1.8, -4], [-1.8, 5], [5, 1.8], [-5, -1.8]]) this.world.addCentered(cx + bx, cz + bz, 0.8, 0.8, 1.1);
    this.addSign('BACK ALLEY', cx - 2.94, 4.5, cz - 7, Math.PI / 2, 5.5, 1.5, PALETTE.orange, 'flicker', false);
    this.addSign('NOODLE BAR', cx + 2.94, 4, cz + 8.5, -Math.PI / 2, 5.5, 1.5, PALETTE.green, 'steady', false);
    this.addSign('NO EXIT', cx + 8, 3.6, cz - 2.94, 0, 4.5, 1.2, PALETTE.red, 'flicker', false);
    this.layout.steamVents.push(new THREE.Vector3(cx - 0.5, 0, cz - 4), new THREE.Vector3(cx + 4, 0, cz + 0.5), new THREE.Vector3(cx - 6, 0, cz - 0.6));
    this.layout.lightSpots.push({ x: cx, y: 5, z: cz, color: PALETTE.orange, intensity: 32, distance: 20 });
  }

  private buildParkingLot(cx: number, cz: number): void {
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xe0e0f0, transparent: true, opacity: 0.45 });
    const box = new THREE.BoxGeometry(1, 1, 1);
    for (let i = -4; i <= 4; i++) {
      for (const sz of [-1, 1]) {
        const m = new THREE.Mesh(box, lineMat);
        m.position.set(cx + i * 3.2, 0.02, cz + sz * 9);
        m.scale.set(0.12, 0.02, 5.5);
        this.group.add(m);
      }
    }
    for (const [px, pz] of [[-6.4, -9], [3.2, -9], [-9.6, 9], [9.6, 9]]) this.addParkedCar(cx + px, cz + pz, 0);
    this.layout.drivableCars.push({ x: cx + 3.2, z: cz + 9, heading: Math.PI, color: 0x6a1bff, accent: PALETTE.pink });
    // Retro diner kiosk.
    this.addBuilding('hotel', cx - 8, cz + 1, 9, 5, 4.2, 0, true, PALETTE.pink);
    this.addSign('MIDNIGHT DINER', cx - 8, 5.6, cz + 3.7, 0, 9, 2, PALETTE.pink, 'chase', true, 'OPEN 24/7');
    for (const [px, pz] of [[13, -14], [13, 14], [-14, -14]]) this.addPalm(cx + px, cz + pz, 1);
    this.addBarrier(cx + 6, cz, 0);
    this.addBarrier(cx + 10, cz, 0);
  }

  // ------------------------------------------------------- street furniture
  private buildStreetFurniture(): void {
    // Streetlights on both sidewalks of each road, staggered.
    const spacing = 25;
    for (const rx of ROADS) {
      for (let z = -95; z <= 95; z += spacing) {
        if (ROADS.some((rz) => Math.abs(z - rz) < 10)) continue;
        for (const side of [-1, 1]) {
          if (rx === 100 && side === 1) continue;
          if (rx === -100 && side === -1) continue;
          this.addStreetLight(rx + side * (ROAD_HALF + 1.4), z + (side > 0 ? 6 : -6), side > 0 ? -Math.PI / 2 : Math.PI / 2);
        }
      }
    }
    for (const rz of ROADS) {
      for (let x = -95; x <= 95; x += spacing) {
        if (ROADS.some((rx) => Math.abs(x - rx) < 10)) continue;
        for (const side of [-1, 1]) {
          if (Math.abs(rz) === 100 && side === Math.sign(rz)) continue;
          this.addStreetLight(x + (side > 0 ? 6 : -6), rz + side * (ROAD_HALF + 1.4), side > 0 ? Math.PI : 0);
        }
      }
    }
    // Hydrants, bins and a few barriers at intersections for incidental cover.
    for (const rx of [-50, 0, 50]) {
      for (const rz of [-50, 0, 50]) {
        this.props.add('hydrant', rx + ROAD_HALF + 2.2, 0, rz + ROAD_HALF + 2.2);
        this.world.addCentered(rx + ROAD_HALF + 2.2, rz + ROAD_HALF + 2.2, 0.5, 0.5, 0.8);
        this.props.add('bin', rx - ROAD_HALF - 2.2, 0, rz - ROAD_HALF - 2.2);
        this.world.addCentered(rx - ROAD_HALF - 2.2, rz - ROAD_HALF - 2.2, 0.7, 0.7, 1.1);
      }
    }
    // Billboards on long walls facing the main avenue.
    const ads: Array<[string, string, number]> = [
      ['SOLAR COLA', 'TASTE THE SUNSET', PALETTE.orange],
      ['RETROWAVE FM', '88.6 ALL NIGHT', PALETTE.magenta],
      ['VISIT CORAL KEY', 'PARADISE AWAITS', PALETTE.cyan],
      ['TURBO ARCADE', 'INSERT COIN', PALETTE.purple],
    ];
    const spots: Array<[number, number, number]> = [[-25, -40.6, Math.PI], [25, -59.4, 0], [-59.4, 25, Math.PI / 2], [59.4, -25, -Math.PI / 2]];
    spots.forEach(([x, z, ry], i) => {
      const [t, s, c] = ads[i];
      this.addSign(t, x, 7.5, z, ry, 10, 4.2, c, i % 2 ? 'pulse' : 'steady', true, s, 0);
      this.world.addCentered(x - Math.sin(ry) * 0.12, z - Math.cos(ry) * 0.12, 0.4, 0.4, 5.4);
    });
  }

  private buildPromenade(): void {
    for (let z = -104; z <= 104; z += 9) {
      if (Math.abs(z) < 4) continue;
      this.addPalm(109.5, z + (Math.abs(z) % 2), 1.1);
    }
    for (let z = -95; z <= 95; z += 18) this.addBench(111, z, -Math.PI / 2);
    // Neon guard rail along the sea wall.
    const railMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(PALETTE.cyan).multiplyScalar(1.6), toneMapped: false });
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 224), railMat);
    rail.position.set(112.6, 1.05, 0);
    this.group.add(rail);
    for (let z = -110; z <= 110; z += 4) this.props.add('post', 112.6, 0, z, 0, 1, 1, 1);
    // Lifeguard tower on the beach.
    this.props.add('tower', 117, 0, -30, 0, 1, 1, 1);
    this.addSign('LIFEGUARD', 117, 4.4, -28.7, 0, 3.2, 0.8, PALETTE.pink, 'steady', false);
    this.layout.lightSpots.push({ x: 108, y: 5, z: 40, color: PALETTE.magenta, intensity: 28, distance: 26 });
  }

  private buildBoundary(): void {
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x241a34, roughness: 0.7 });
    const glow = new THREE.MeshBasicMaterial({ color: new THREE.Color(PALETTE.magenta).multiplyScalar(1.4), toneMapped: false });
    const box = new THREE.BoxGeometry(1, 1, 1);
    const segs: Array<[number, number, number, number]> = [
      [0, -110.5, 222, 1], [0, 110.5, 222, 1], [-110.5, 0, 1, 222],
    ];
    for (const [x, z, w, d] of segs) {
      const wall = new THREE.Mesh(box, wallMat);
      wall.position.set(x, 0.6, z);
      wall.scale.set(w, 1.2, d);
      const strip = new THREE.Mesh(box, glow);
      strip.position.set(x, 1.22, z);
      strip.scale.set(w + 0.02, 0.06, d + 0.02);
      this.group.add(wall, strip);
    }
  }

  private buildBackdrop(): void {
    // Surrounding districts: dense blocks just beyond the playable edge.
    for (let i = 0; i < 70; i++) {
      const side = Math.floor(this.rng() * 3);
      const along = this.r(-150, 150);
      const depth = this.r(122, 175);
      const x = side === 0 ? -depth : side === 1 ? Math.min(along, 105) : Math.min(along, 105);
      const z = side === 0 ? along : side === 1 ? -depth : depth;
      this.addBuilding('backdrop', x, z, this.r(10, 22), this.r(10, 22), this.r(15, 80), 0, false);
    }
    // Far skyline ring for silhouette depth.
    for (let i = 0; i < 90; i++) {
      const a = this.r(Math.PI * 0.55, Math.PI * 1.45);
      const dist = this.r(240, 380);
      this.addBuilding('backdrop', Math.cos(a) * dist, Math.sin(a) * dist, this.r(16, 36), this.r(16, 36), this.r(30, 140), 0, false);
    }
  }

  private buildBridge(): void {
    // A causeway out over the water; its cable lights draw a line across the horizon.
    const mat = new THREE.MeshStandardMaterial({ color: 0x1a1428, roughness: 0.8 });
    const deck = new THREE.Mesh(new THREE.BoxGeometry(520, 1.2, 10), mat);
    deck.position.set(380, 7, -175);
    this.group.add(deck);
    const lightMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(PALETTE.yellow).multiplyScalar(2), toneMapped: false });
    const geo = new THREE.SphereGeometry(0.6, 6, 4);
    const lights = new THREE.InstancedMesh(geo, lightMat, 52);
    const m = new THREE.Matrix4();
    for (let i = 0; i < 52; i++) lights.setMatrixAt(i, m.makeTranslation(125 + i * 10, 8.2, -170));
    this.group.add(lights);
    for (const px of [250, 450]) {
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(3, 46, 3), mat);
      pylon.position.set(px, 23, -175);
      this.group.add(pylon);
      const tip = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff2040).multiplyScalar(3), toneMapped: false }));
      tip.position.set(px, 46.5, -175);
      tip.scale.setScalar(1.4);
      this.group.add(tip);
      this.layout.blinkers.push(tip.material as THREE.MeshBasicMaterial);
      const cableMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(PALETTE.cyan).multiplyScalar(1.2), toneMapped: false });
      for (const dir of [-1, 1]) {
        const len = Math.hypot(95, 38);
        const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, len, 4), cableMat);
        cable.position.set(px + dir * 47.5, 27, -175);
        cable.rotation.z = dir * Math.atan2(95, 38);
        this.group.add(cable);
      }
    }
  }

  private buildParkedCars(): void {
    // Curbside parking on the avenues; the first spot holds the player's ride.
    this.layout.drivableCars.unshift({ x: 25, z: 5.3, heading: Math.PI / 2, color: 0xff2f7d, accent: PALETTE.cyan });
    const spots: Array<[number, number, number]> = [
      [-30, 5.3, Math.PI / 2], [-18, -5.3, -Math.PI / 2], [5.3, -30, Math.PI], [-5.3, 22, 0],
      [55.3, 70, 0], [44.7, -80, Math.PI], [-44.7, -30, Math.PI], [-55.3, 38, 0],
      [70, -44.7, -Math.PI / 2], [-80, 55.3, Math.PI / 2], [94.7, -60, Math.PI], [94.7, 30, Math.PI],
    ];
    for (const [x, z, h] of spots) this.addParkedCar(x, z, h);
  }

  // ---------------------------------------------------------------- props
  private defineProps(): void {
    const box = new THREE.BoxGeometry(1, 1, 1);
    box.translate(0, 0.5, 0);
    const std = (color: number, rough = 0.7, metal = 0.1) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });

    // Streetlight: pole + arm merged, glowing head separate.
    const pole = new THREE.CylinderGeometry(0.09, 0.13, 6.5, 6).translate(0, 3.25, 0);
    const arm = new THREE.BoxGeometry(0.1, 0.1, 1.8).translate(0, 6.4, 0.9);
    this.props.define('lightpole', mergeGeometries([pole, arm])!, std(0x2a2a3a, 0.4, 0.7));
    this.props.define('lighthead', new THREE.BoxGeometry(0.5, 0.12, 0.8).translate(0, 6.3, 1.7), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffc8f0).multiplyScalar(2.2), toneMapped: false }), false);

    this.props.define('spire', new THREE.CylinderGeometry(0.12, 0.45, 1, 6).translate(0, 0.5, 0), std(0x40405a, 0.4, 0.8));
    this.props.define('canopy', box, new THREE.MeshStandardMaterial({ color: 0x1a1a28, emissive: 0xff2fd2, emissiveIntensity: 0.25 }));
    this.props.define('pylon', box, std(0x2a2440, 0.4, 0.6));
    this.props.define('planter', box, std(0x3a2c4c, 0.8));
    this.props.define('post', new THREE.CylinderGeometry(0.05, 0.05, 1.05, 4).translate(0, 0.52, 0), std(0x6a6a80, 0.3, 0.9), false);
    this.props.define('hydrant', new THREE.CylinderGeometry(0.18, 0.22, 0.8, 8).translate(0, 0.4, 0), std(0xd23a5a, 0.5));
    this.props.define('bin', new THREE.CylinderGeometry(0.32, 0.28, 1.05, 8).translate(0, 0.52, 0), std(0x2e3a48, 0.6, 0.4));
    this.props.define('barrel', new THREE.CylinderGeometry(0.38, 0.38, 1.1, 10).translate(0, 0.55, 0), std(0x2a5a7a, 0.5, 0.5));
    this.props.define('crate', box, std(0x5a3f2c, 0.9));
    this.props.define('dumpster', box, std(0x1f4a3c, 0.6, 0.3));
    this.props.define('dumplid', box, std(0x16302a, 0.6, 0.3));

    // Jersey barrier: trapezoid profile with a reflective stripe.
    const shape = new THREE.Shape();
    shape.moveTo(-0.32, 0); shape.lineTo(0.32, 0); shape.lineTo(0.14, 0.3); shape.lineTo(0.1, 0.85); shape.lineTo(-0.1, 0.85); shape.lineTo(-0.14, 0.3); shape.closePath();
    const jersey = new THREE.ExtrudeGeometry(shape, { depth: 2.8, bevelEnabled: false }).translate(0, 0, -1.4);
    this.props.define('barrier', jersey, std(0x8a8494, 0.8));
    this.props.define('barrierStripe', new THREE.BoxGeometry(0.22, 0.06, 2.6).translate(0, 0.62, 0), new THREE.MeshBasicMaterial({ color: new THREE.Color(PALETTE.orange).multiplyScalar(1.4), toneMapped: false }), false);

    const bench = mergeGeometries([
      new THREE.BoxGeometry(2, 0.08, 0.6).translate(0, 0.48, 0),
      new THREE.BoxGeometry(2, 0.5, 0.08).translate(0, 0.8, -0.28),
      new THREE.BoxGeometry(0.1, 0.46, 0.5).translate(-0.9, 0.23, 0),
      new THREE.BoxGeometry(0.1, 0.46, 0.5).translate(0.9, 0.23, 0),
    ])!;
    this.props.define('bench', bench, std(0x6b4a7a, 0.6, 0.2));

    const tower = mergeGeometries([
      new THREE.BoxGeometry(2.4, 0.2, 2.4).translate(0, 2.6, 0),
      new THREE.BoxGeometry(2.2, 1.4, 2.2).translate(0, 3.4, 0),
      new THREE.ConeGeometry(1.8, 0.9, 4).rotateY(Math.PI / 4).translate(0, 4.55, 0),
      ...[-1, 1].flatMap((sx) => [-1, 1].map((sz) => new THREE.BoxGeometry(0.15, 2.6, 0.15).translate(sx, 1.3, sz))),
    ])!;
    this.props.define('tower', tower, std(0x4fb0c8, 0.6));

    // Palm: curved, segmented trunk + drooping fronds, merged with vertex colours.
    this.props.define('palm', this.createPalmGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, side: THREE.DoubleSide }));
  }

  private createPalmGeometry(): THREE.BufferGeometry {
    const parts: THREE.BufferGeometry[] = [];
    const color = (geo: THREE.BufferGeometry, c: THREE.Color) => {
      const n = geo.attributes.position.count;
      const arr = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) c.toArray(arr, i * 3);
      geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
      return geo;
    };
    const trunkCol = new THREE.Color(0x4a3428);
    const segs = 7;
    let x = 0, y = 0;
    for (let i = 0; i < segs; i++) {
      const h = 1.15;
      const r0 = 0.26 - i * 0.018, r1 = r0 - 0.018;
      const seg = new THREE.CylinderGeometry(r1, r0 + 0.04, h, 7).translate(0, h / 2, 0);
      const lean = 0.035 + i * 0.012;
      seg.rotateZ(-lean * (i + 1) * 0.6);
      seg.translate(x, y, 0);
      parts.push(color(seg, trunkCol.clone().multiplyScalar(i % 2 ? 1 : 0.8)));
      x += Math.sin(lean * (i + 1) * 0.6) * h;
      y += Math.cos(lean * (i + 1) * 0.6) * h;
    }
    const frondCol = new THREE.Color(0x1f5a3c);
    const fronds = 9;
    for (let i = 0; i < fronds; i++) {
      const frond = new THREE.PlaneGeometry(0.75, 3.4, 1, 4);
      const pos = frond.attributes.position;
      for (let v = 0; v < pos.count; v++) {
        const fy = pos.getY(v) + 1.7; // 0..3.4 along the frond
        const t = fy / 3.4;
        pos.setX(v, pos.getX(v) * Math.sin(Math.PI * Math.min(1, t * 1.15 + 0.1)));
        pos.setZ(v, -t * t * 1.8);
        pos.setY(v, fy);
      }
      frond.rotateX(-Math.PI / 2 + 0.55);
      frond.rotateY((i / fronds) * Math.PI * 2 + (i % 2) * 0.2);
      frond.translate(x, y, 0);
      parts.push(color(frond, frondCol.clone().multiplyScalar(0.8 + (i % 3) * 0.15)));
    }
    const geo = mergeGeometries(parts.map((p) => (p.index ? p.toNonIndexed() : p)))!;
    geo.computeVertexNormals();
    return geo;
  }

  private addStreetLight(x: number, z: number, rotY: number): void {
    this.props.add('lightpole', x, 0, z, rotY);
    this.props.add('lighthead', x, 0, z, rotY);
    this.world.addCentered(x, z, 0.35, 0.35, 6.5);
    const hx = x + Math.sin(rotY) * 1.7, hz = z + Math.cos(rotY) * 1.7;
    this.pools.push({ x: hx, z: hz, color: this.rng() < 0.6 ? 0xff7ac8 : 0x6ad8ff, size: 7.5 });
  }

  private addPalm(x: number, z: number, scale: number): void {
    const s = scale * this.r(0.85, 1.15);
    this.props.add('palm', x, 0, z, this.r(0, Math.PI * 2), s, s, s);
    this.world.addCentered(x, z, 0.55, 0.55, 8);
  }

  private addBench(x: number, z: number, rotY: number): void {
    this.props.add('bench', x, 0, z, rotY);
    const along = Math.abs(Math.sin(rotY)) > 0.5;
    this.world.addCentered(x, z, along ? 0.6 : 2, along ? 2 : 0.6, 0.55);
  }

  private addBarrier(x: number, z: number, rotY: number): void {
    this.props.add('barrier', x, 0, z, rotY);
    this.props.add('barrierStripe', x, 0, z, rotY);
    const along = Math.abs(Math.sin(rotY)) > 0.5;
    this.world.addCentered(x, z, along ? 2.8 : 0.64, along ? 0.64 : 2.8, 0.85);
  }

  private addDumpster(x: number, z: number, rotY: number): void {
    this.props.add('dumpster', x, 0, z, rotY, 2.2, 1.2, 1.2);
    this.props.add('dumplid', x, 1.2, z, rotY, 2.3, 0.1, 1.3);
    const along = Math.abs(Math.sin(rotY)) > 0.5;
    this.world.addCentered(x, z, along ? 1.3 : 2.3, along ? 2.3 : 1.3, 1.3);
  }

  private addCrateStack(x: number, z: number): void {
    this.props.add('crate', x, 0, z, 0.1, 1.2, 1.2, 1.2);
    this.props.add('crate', x + 1.25, 0, z + 0.1, -0.05, 1.2, 1.2, 1.2);
    this.props.add('crate', x + 0.6, 1.2, z, 0.3, 1.1, 1.1, 1.1);
    this.world.addBox(x - 0.65, 0, z - 0.65, x + 1.9, 1.2, z + 0.75);
    this.world.addBox(x + 0.05, 1.2, z - 0.55, x + 1.15, 2.3, z + 0.55);
  }

  private addParkedCar(x: number, z: number, heading: number): void {
    const colors = [0x2a6a9a, 0x8a2a4a, 0xd0d0d8, 0x3a3a48, 0x1a5a4a, 0x9a6a2a];
    const style = this.rng() < 0.25 ? 'taxi' : 'sedan';
    const car = buildCarModel(style, this.pick(colors), 0, false);
    car.group.position.set(x, 0, z);
    car.group.rotation.y = heading;
    // Parked cars share dimmed light materials so they batch into a single draw.
    car.group.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.material === car.headMat) mesh.material = PARKED_HEAD;
      else if (mesh.material === car.tailMat) mesh.material = PARKED_TAIL;
    });
    this.group.add(car.group);
    const along = Math.abs(Math.sin(heading)) > 0.5;
    this.world.addCentered(x, z, along ? 4.5 : 1.95, along ? 1.95 : 4.5, 1.5);
  }

  private addRooftopBillboard(x: number, z: number, w: number, d: number, h: number): void {
    const names: Array<[string, string]> = [['SYNTH RECORDS', 'NEW WAVE'], ['NEON NOODLES', 'OPEN LATE'], ['LUMEN LOUNGE', 'LIVE DJ'], ['CASINO ORBIT', 'WIN BIG']];
    const [t, s] = this.pick(names);
    const facing = this.rng() < 0.5;
    const sz = facing ? d / 2 : -d / 2;
    this.addSign(t, x, h + 2.4, z + sz * 0.6, facing ? 0 : Math.PI, Math.min(w * 0.9, 11), 3.4, this.pick(ACCENTS), this.pick(['steady', 'pulse', 'flicker'] as const), false, s, h);
  }

  /** Neon sign plane with an optional streak "reflection" on the wet ground below. */
  private addSign(text: string, x: number, y: number, z: number, rotY: number, w: number, h: number, color: number, mode: NeonSign['mode'], reflect: boolean, sub?: string, postBase?: number): void {
    const hex = '#' + new THREE.Color(color).getHexString();
    const aspect = w / h;
    const tex = createNeonSignTexture(text, hex, { width: 512, height: Math.max(64, Math.round(512 / aspect)), sub });
    const base = new THREE.Color(0xffffff).multiplyScalar(1.7);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, depthWrite: false, color: base.clone() });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    plane.position.set(x, y, z);
    plane.rotation.y = rotY;
    plane.renderOrder = 3;
    this.group.add(plane);
    if (postBase !== undefined) {
      // Billboard: dark double-sided backing board on a steel post.
      const back = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.04, h * 1.08), new THREE.MeshStandardMaterial({ color: 0x0b0814, roughness: 0.6, side: THREE.DoubleSide }));
      back.position.set(x - Math.sin(rotY) * 0.06, y, z - Math.cos(rotY) * 0.06);
      back.rotation.y = rotY;
      this.group.add(back);
      const postH = y - h / 2 - postBase;
      if (postH > 0.1) this.props.add('post', x - Math.sin(rotY) * 0.12, postBase, z - Math.cos(rotY) * 0.12, 0, 3, postH / 1.05, 3);
    }
    this.layout.signs.push({ material: mat, base, mode, seed: this.rng() * 100 });
    if (reflect) {
      const streak = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, Math.min(14, y * 1.6)), additive(color, this.streakTex, 0.42));
      streak.rotation.x = -Math.PI / 2;
      streak.rotation.z = rotY;
      const out = Math.min(14, y * 1.6) / 2 + 0.6;
      streak.position.set(x + Math.sin(rotY) * out, 0.03, z + Math.cos(rotY) * out);
      streak.renderOrder = 1;
      this.group.add(streak);
    }
  }

  private emitBuildings(): void {
    const n = this.buildings.length;
    const geo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
    const seeds = new Float32Array(n);
    const accents = new Float32Array(n * 3);
    const mesh = new THREE.InstancedMesh(geo, createBuildingMaterial(), n);
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    this.buildings.forEach((b, i) => {
      m.makeScale(b.w, b.h, b.d).setPosition(b.x, b.y0, b.z);
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, c.set(b.color));
      seeds[i] = b.seed;
      c.set(b.accent).toArray(accents, i * 3);
    });
    geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1));
    geo.setAttribute('aAccent', new THREE.InstancedBufferAttribute(accents, 3));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.computeBoundingSphere();
    this.group.add(mesh);
  }

  /** All streetlight pools in one additive instanced draw. */
  private emitLightPools(): void {
    const geo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ map: this.glowTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0.38 });
    const mesh = new THREE.InstancedMesh(geo, mat, this.pools.length);
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    this.pools.forEach((p, i) => {
      m.makeScale(p.size, 1, p.size).setPosition(p.x, 0.035, p.z);
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, c.set(p.color));
    });
    mesh.renderOrder = 1;
    this.group.add(mesh);
  }

  private createPlazaTexture(): THREE.Texture {
    const s = 512;
    const cnv = document.createElement('canvas');
    cnv.width = cnv.height = s;
    const g = cnv.getContext('2d')!;
    g.fillStyle = '#0b0716';
    g.fillRect(0, 0, s, s);
    const step = s / 12;
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        g.fillStyle = (i + j) % 2 ? '#120c22' : '#0e0a1c';
        g.fillRect(i * step + 1, j * step + 1, step - 2, step - 2);
      }
    }
    g.strokeStyle = '#ff2fd2';
    g.lineWidth = 2;
    g.shadowColor = '#ff2fd2';
    g.shadowBlur = 8;
    for (let i = 0; i <= 12; i += 3) {
      g.beginPath(); g.moveTo(i * step, 0); g.lineTo(i * step, s); g.stroke();
      g.beginPath(); g.moveTo(0, i * step); g.lineTo(s, i * step); g.stroke();
    }
    g.strokeStyle = '#2ef2ff';
    g.shadowColor = '#2ef2ff';
    g.lineWidth = 3;
    g.beginPath(); g.arc(s / 2, s / 2, s * 0.2, 0, Math.PI * 2); g.stroke();
    g.beginPath(); g.arc(s / 2, s / 2, s * 0.32, 0, Math.PI * 2); g.stroke();
    const tex = new THREE.CanvasTexture(cnv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }
}
