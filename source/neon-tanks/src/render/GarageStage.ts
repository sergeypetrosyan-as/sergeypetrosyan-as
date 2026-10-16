import * as THREE from 'three';
import { HULLS } from '../sim/content.ts';
import { MaterialSet, PALETTE, timeUniform } from './materials.ts';
import { worldBox } from './geometry.ts';
import { glowTexture } from './textures.ts';
import { TankModel, type TankLook } from './TankModel.ts';

/**
 * The hangar behind the menus: a turntable with the player's current build,
 * neon rings and a slow orbiting camera. Rebuilds the tank when the loadout changes.
 */
export class GarageStage {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(38, 1, 0.1, 400);
  private readonly mats: MaterialSet;
  private readonly geos: THREE.BufferGeometry[] = [];
  private readonly turntable = new THREE.Group();
  private readonly rings: THREE.Mesh[] = [];
  private model: TankModel | null = null;
  private lookKey = '';
  private readonly env: THREE.Texture;
  private spinBoost = 0;
  /** Horizontal framing: 0 centres the tank, positive pushes it right of the menu column. */
  offset = 0.32;
  private vw = 1;
  private vh = 1;

  constructor(env: THREE.Texture) {
    this.env = env;
    this.mats = new MaterialSet(env);
    this.scene.background = new THREE.Color(0x05070d);
    this.scene.fog = new THREE.FogExp2(0x070a14, 0.035);
    this.scene.add(new THREE.HemisphereLight(0x8fa8ff, 0x140a20, 0.7));
    const key = new THREE.SpotLight(0xdff2ff, 70, 40, 0.5, 0.7, 1.4);
    key.position.set(4, 12, 6);
    key.target.position.set(0, 0, 0);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key, key.target);
    const cyan = new THREE.PointLight(PALETTE.cyan, 22, 18, 1.6);
    cyan.position.set(-6, 2.5, -2);
    const mag = new THREE.PointLight(PALETTE.magenta, 20, 18, 1.6);
    mag.position.set(6, 2.5, -3);
    this.scene.add(cyan, mag);

    // Floor, turntable and backdrop.
    const floor = new THREE.Mesh(this.geo(new THREE.CircleGeometry(40, 64).rotateX(-Math.PI / 2)), this.mats.surface('deck'));
    floor.receiveShadow = true;
    this.scene.add(floor);
    const plate = new THREE.Mesh(this.geo(new THREE.CylinderGeometry(4.2, 4.4, 0.3, 64)), this.mats.surface('deck'));
    plate.position.y = 0.15;
    plate.receiveShadow = true;
    this.turntable.add(plate);
    this.scene.add(this.turntable);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(this.geo(new THREE.TorusGeometry(4.6 + i * 1.1, 0.03 + i * 0.01, 6, 96).rotateX(Math.PI / 2)), this.mats.glow(i === 1 ? 'magenta' : 'cyan', 2));
      ring.position.y = 0.05 + i * 0.02;
      this.rings.push(ring);
      this.scene.add(ring);
    }
    // Back wall with vertical light bars.
    for (let i = -6; i <= 6; i++) {
      const x = i * 2.4;
      const z = -11 - Math.abs(i) * 0.4;
      const wall = new THREE.Mesh(this.geo(worldBox(x - 1.1, 0, z - 0.3, x + 1.1, 9, z + 0.3)), this.mats.surface('darkMetal'));
      this.scene.add(wall);
      if (i % 2 === 0) {
        const bar = new THREE.Mesh(this.geo(worldBox(x - 0.06, 0.5, z + 0.31, x + 0.06, 8, z + 0.36)), this.mats.glow(i % 4 === 0 ? 'cyan' : 'magenta', 2));
        this.scene.add(bar);
      }
    }
    const haloMat = this.mats.track(new THREE.SpriteMaterial({ map: glowTexture(), color: new THREE.Color(PALETTE.cyan).multiplyScalar(0.25), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    const halo = new THREE.Sprite(haloMat);
    halo.scale.set(16, 6, 1);
    halo.position.set(0, 0.3, 0);
    this.scene.add(halo);
  }

  private geo<T extends THREE.BufferGeometry>(g: T): T {
    this.geos.push(g);
    return g;
  }

  setLook(look: TankLook): void {
    const key = JSON.stringify(look);
    if (key === this.lookKey) return;
    this.lookKey = key;
    this.model?.dispose();
    this.model = new TankModel(look, this.env, true);
    this.model.root.position.y = 0.3;
    this.model.turret.position.y = HULLS[look.hull].turretHeight;
    this.turntable.add(this.model.root);
    this.spinBoost = 1.6;
  }

  resize(w: number, h: number): void {
    this.vw = Math.max(1, w);
    this.vh = Math.max(1, h);
    // Narrow screens: centre the tank under the menu instead of beside it.
    this.offset = w < 900 ? 0 : 0.3;
  }

  update(dt: number, time: number): void {
    timeUniform.value = time;
    this.spinBoost = Math.max(0, this.spinBoost - dt);
    this.turntable.rotation.y += dt * (0.25 + this.spinBoost * 1.5);
    if (this.model) {
      this.model.turret.rotation.y = Math.sin(time * 0.4) * 0.6;
      this.model.barrelPivot.rotation.x = -0.05 - Math.sin(time * 0.6) * 0.05;
      this.model.setTracks(time * 0.6, time * 0.6);
    }
    this.rings.forEach((r, i) => (r.rotation.y = time * (i % 2 ? -0.2 : 0.15)));
    const a = 0.6 + Math.sin(time * 0.08) * 0.25;
    const d = 15.5;
    this.camera.position.set(Math.sin(a) * d, 4.6, Math.cos(a) * d);
    this.camera.lookAt(0, 1.1, 0);
    // Shift the view so the tank sits to the right of the menu column.
    // (setViewOffset also sets the aspect from the full size.)
    this.camera.setViewOffset(this.vw, this.vh, -this.offset * this.vw * 0.5, 0, this.vw, this.vh);
  }

  dispose(): void {
    this.model?.dispose();
    this.geos.forEach((g) => g.dispose());
    this.mats.dispose();
  }
}
