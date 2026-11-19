import * as THREE from 'three';
import { HULLS } from '../sim/content.ts';
import { MaterialSet, PALETTE, timeUniform } from './materials.ts';
import { worldBox } from './geometry.ts';
import { glowTexture } from './textures.ts';
import { mesaTexture, moonTexture, starsTexture } from './frontier.ts';
import { TankModel, type TankLook } from './TankModel.ts';

/**
 * The stable behind the menus: a turntable with the player's current build in an
 * open frontier yard at night (carved moon, mesa horizon, plank fence, lantern
 * rings) and a slow orbiting camera. Rebuilds the tank when the loadout changes.
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
    this.scene.background = new THREE.Color(0x1a0608);
    this.scene.fog = new THREE.FogExp2(0x1d0709, 0.028);
    this.scene.add(new THREE.HemisphereLight(0xe2d6d2, 0x1a0608, 0.75));
    const key = new THREE.SpotLight(0xf1ede7, 70, 40, 0.5, 0.7, 1.4);
    key.position.set(4, 12, 6);
    key.target.position.set(0, 0, 0);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key, key.target);
    // Lantern light from either side: moonlit bone and a warm ember.
    const cyan = new THREE.PointLight(PALETTE.cyan, 18, 18, 1.6);
    cyan.position.set(-6, 2.5, -2);
    const mag = new THREE.PointLight(PALETTE.amber, 16, 18, 1.6);
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
      const ring = new THREE.Mesh(this.geo(new THREE.TorusGeometry(4.6 + i * 1.1, 0.03 + i * 0.01, 6, 96).rotateX(Math.PI / 2)), this.mats.glow(i === 1 ? 'amber' : 'cyan', 1.6));
      ring.position.y = 0.05 + i * 0.02;
      this.rings.push(ring);
      this.scene.add(ring);
    }
    // A low plank fence with lantern posts, so the horizon shows above it.
    for (let i = -6; i <= 6; i++) {
      const x = i * 2.4;
      const z = -11 - Math.abs(i) * 0.4;
      const plank = new THREE.Mesh(this.geo(worldBox(x - 1.15, 0, z - 0.2, x + 1.15, 2.2 + (i % 2 ? 0.25 : 0), z + 0.2)), this.mats.surface('darkMetal'));
      this.scene.add(plank);
      if (i % 3 === 0) {
        const post = new THREE.Mesh(this.geo(worldBox(x - 0.18, 0, z - 0.25, x + 0.18, 3.6, z + 0.25)), this.mats.surface('metal'));
        const lamp = new THREE.Mesh(this.geo(worldBox(x - 0.22, 3.6, z - 0.22, x + 0.22, 4.1, z + 0.22)), this.mats.glow(i === 0 ? 'amber' : 'blue', 1.1));
        this.scene.add(post, lamp);
      }
    }
    // Night sky: quiet stars, the carved moon and a ring of mesas on the horizon.
    const sky = new THREE.Mesh(this.geo(new THREE.CylinderGeometry(90, 90, 70, 64, 1, true)), this.mats.track(new THREE.MeshBasicMaterial({ map: starsTexture(), side: THREE.BackSide, transparent: true, depthWrite: false, fog: false })));
    sky.position.y = 40;
    sky.renderOrder = -10;
    this.scene.add(sky);
    const moon = new THREE.Sprite(this.mats.track(new THREE.SpriteMaterial({ map: moonTexture(), transparent: true, depthWrite: false, fog: false, toneMapped: false, color: new THREE.Color(0.92, 0.9, 0.88) })));
    moon.position.set(-36, 10, -62);
    moon.scale.set(14, 14, 1);
    moon.renderOrder = -9;
    this.scene.add(moon);
    const ridge = new THREE.Mesh(this.geo(new THREE.CylinderGeometry(80, 80, 15, 64, 1, true)), this.mats.track(new THREE.MeshBasicMaterial({ map: mesaTexture(5), side: THREE.BackSide, transparent: true, alphaTest: 0.5, depthWrite: false, fog: false, color: new THREE.Color(0.55, 0.5, 0.5) })));
    ridge.position.y = 4.5;
    ridge.renderOrder = -8;
    this.scene.add(ridge);
    const haloMat = this.mats.track(new THREE.SpriteMaterial({ map: glowTexture(), color: new THREE.Color(PALETTE.amber).multiplyScalar(0.18), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
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
