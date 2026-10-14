import * as THREE from 'three';
import { mergeChildrenByMaterial } from '../world/batch';

export interface HumanoidLook {
  skin: number;
  jacket: number;
  shirt: number;
  pants: number;
  shoes: number;
  hair: number;
  /** Emissive trim colour (visor, jacket piping, weapon glow). */
  neon: number;
  /** Horizontal bulk multiplier — enforcers are broader than gunners. */
  bulk: number;
  height: number;
  visor: boolean;
  weapon: 'pistol' | 'rifle' | 'knuckles';
}

export interface PoseState {
  /** Horizontal speed in m/s. */
  speed: number;
  grounded: boolean;
  /** 0..1: how much the weapon is raised toward the aim direction. */
  aim: number;
  /** Camera pitch, used to point the arms up/down while aiming. */
  aimPitch: number;
  /** 0..1 recoil impulse that decays each frame. */
  kick: number;
  /** 0..1 melee swing progress (enforcers). */
  swing: number;
}

let geoCache: Record<string, THREE.BufferGeometry> | null = null;
function geos(): Record<string, THREE.BufferGeometry> {
  if (geoCache) return geoCache;
  const cap = (r: number, l: number) => new THREE.CapsuleGeometry(r, l, 3, 8);
  geoCache = {
    torso: new THREE.BoxGeometry(0.5, 0.62, 0.28),
    pelvis: new THREE.BoxGeometry(0.44, 0.2, 0.26),
    head: new THREE.SphereGeometry(0.15, 12, 10),
    hair: new THREE.SphereGeometry(0.158, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
    visor: new THREE.BoxGeometry(0.26, 0.05, 0.06),
    neck: new THREE.CylinderGeometry(0.06, 0.07, 0.1, 8),
    upperArm: cap(0.072, 0.24).translate(0, -0.17, 0),
    foreArm: cap(0.062, 0.22).translate(0, -0.15, 0),
    hand: new THREE.BoxGeometry(0.08, 0.1, 0.08).translate(0, -0.05, 0),
    thigh: cap(0.095, 0.32).translate(0, -0.22, 0),
    shin: cap(0.08, 0.32).translate(0, -0.21, 0),
    foot: new THREE.BoxGeometry(0.12, 0.08, 0.26).translate(0, -0.04, 0.05),
    pistol: new THREE.BoxGeometry(0.06, 0.1, 0.28).translate(0, 0, 0.1),
    pistolGrip: new THREE.BoxGeometry(0.05, 0.12, 0.06).translate(0, -0.08, 0),
    rifle: new THREE.BoxGeometry(0.07, 0.12, 0.72).translate(0, 0, 0.26),
    rifleMag: new THREE.BoxGeometry(0.05, 0.16, 0.08).translate(0, -0.12, 0.16),
    glowStrip: new THREE.BoxGeometry(0.015, 0.02, 0.5).translate(0, 0.045, 0.24),
    knuckle: new THREE.BoxGeometry(0.1, 0.05, 0.1),
    stripe: new THREE.BoxGeometry(0.02, 0.6, 0.02),
  };
  return geoCache;
}

/**
 * Procedurally articulated character: hips → torso → head/arms, hips → legs.
 * Animation (walk/run cycle, aim pose, recoil, jumps, death fall) is computed
 * every frame from a few gameplay parameters — no skeletal assets required.
 */
export class Humanoid {
  readonly root = new THREE.Group();
  readonly hips = new THREE.Group();
  readonly torso = new THREE.Group();
  readonly head = new THREE.Group();
  readonly armL = new THREE.Group();
  readonly armR = new THREE.Group();
  readonly elbowL = new THREE.Group();
  readonly elbowR = new THREE.Group();
  readonly legL = new THREE.Group();
  readonly legR = new THREE.Group();
  readonly kneeL = new THREE.Group();
  readonly kneeR = new THREE.Group();
  readonly weapon = new THREE.Group();
  readonly muzzle = new THREE.Object3D();
  private readonly materials: THREE.MeshStandardMaterial[] = [];
  private readonly neonMat: THREE.MeshBasicMaterial;
  private readonly neonBase: THREE.Color;
  private phase = 0;
  private flash = 0;
  private deathT = -1;
  private readonly hipHeight: number;
  private landing = 0;
  private wasGrounded = true;
  private weaponMeshes: Record<string, THREE.Object3D> = {};

  constructor(readonly look: HumanoidLook) {
    const g = geos();
    const std = (color: number, rough = 0.65, metal = 0.05) => {
      const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, envMapIntensity: 0.6 });
      this.materials.push(m);
      return m;
    };
    this.neonBase = new THREE.Color(look.neon).multiplyScalar(2.2);
    this.neonMat = new THREE.MeshBasicMaterial({ color: this.neonBase.clone(), toneMapped: false });
    const skin = std(look.skin, 0.55);
    const jacket = std(look.jacket, 0.5, 0.15);
    const shirt = std(look.shirt, 0.7);
    const pants = std(look.pants, 0.75);
    const shoes = std(look.shoes, 0.4, 0.2);
    const hair = std(look.hair, 0.8);
    const metal = std(0x22222c, 0.3, 0.8);
    const b = look.bulk;
    const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.scale.set(sx, sy, sz);
      m.castShadow = true;
      parent.add(m);
      return m;
    };

    // Rig is modelled ~2.05 m tall; scale it to the requested height (1.0 ≈ 1.8 m).
    this.hipHeight = 0.98;
    this.root.scale.setScalar(0.88 * look.height);
    this.root.add(this.hips);
    this.hips.position.y = this.hipHeight;
    mesh(g.pelvis, pants, this.hips, 0, 0, 0, b, 1, 1);

    // Torso: shirt core, open jacket panels, neon piping.
    this.hips.add(this.torso);
    this.torso.position.y = 0.08;
    mesh(g.torso, shirt, this.torso, 0, 0.32, 0, b * 0.92, 1, 0.95);
    mesh(g.torso, jacket, this.torso, -0.15 * b, 0.32, 0, 0.42 * b, 1.02, 1.05);
    mesh(g.torso, jacket, this.torso, 0.15 * b, 0.32, 0, 0.42 * b, 1.02, 1.05);
    mesh(g.torso, jacket, this.torso, 0, 0.32, -0.03, b, 1.02, 0.85);
    mesh(g.stripe, this.neonMat, this.torso, -0.06 * b, 0.32, 0.15);
    mesh(g.stripe, this.neonMat, this.torso, 0.06 * b, 0.32, 0.15);
    mesh(g.neck, skin, this.torso, 0, 0.68, 0);

    this.torso.add(this.head);
    this.head.position.y = 0.86;
    mesh(g.head, skin, this.head, 0, 0, 0, 1, 1.08, 1);
    mesh(g.hair, hair, this.head, 0, 0.02, -0.01, 1, 1, 1);
    if (look.visor) mesh(g.visor, this.neonMat, this.head, 0, 0.02, 0.135);
    else {
      // Aviator shades.
      mesh(g.visor, metal, this.head, 0, 0.025, 0.14, 1.05, 1.1, 1);
      mesh(g.visor, this.neonMat, this.head, 0, 0.055, 0.148, 1.0, 0.18, 0.5);
    }

    // Arms
    for (const [arm, elbow, side] of [[this.armL, this.elbowL, 1], [this.armR, this.elbowR, -1]] as const) {
      this.torso.add(arm);
      arm.position.set(side * 0.31 * b, 0.6, 0);
      mesh(g.upperArm, jacket, arm, 0, 0, 0, b, 1, b);
      arm.add(elbow);
      elbow.position.y = -0.34;
      mesh(g.foreArm, jacket, elbow, 0, 0, 0, b, 1, b);
      const hand = mesh(g.hand, skin, elbow, 0, -0.3, 0);
      if (look.weapon === 'knuckles') mesh(g.knuckle, this.neonMat, hand, 0, -0.08, 0.02);
    }

    // Legs
    for (const [leg, knee, side] of [[this.legL, this.kneeL, -1], [this.legR, this.kneeR, 1]] as const) {
      this.hips.add(leg);
      leg.position.set(side * 0.12 * b, -0.05, 0);
      mesh(g.thigh, pants, leg, 0, 0, 0, b, 1, b);
      leg.add(knee);
      knee.position.y = -0.45;
      mesh(g.shin, pants, knee, 0, 0, 0, b, 1, b);
      mesh(g.foot, shoes, knee, 0, -0.44, 0);
    }

    // Weapons hang off the right hand; the player swaps between them.
    this.elbowR.add(this.weapon);
    this.weapon.position.set(0, -0.36, 0.04);
    const pistol = new THREE.Group();
    mesh(g.pistol, metal, pistol);
    mesh(g.pistolGrip, metal, pistol);
    mesh(g.glowStrip, this.neonMat, pistol, 0, -0.005, -0.1, 1, 1, 0.5);
    const rifle = new THREE.Group();
    mesh(g.rifle, metal, rifle);
    mesh(g.rifleMag, metal, rifle);
    mesh(g.glowStrip, this.neonMat, rifle, 0, 0.02, 0.02, 1.2, 1, 1.3);
    this.weaponMeshes = { pistol, rifle };
    this.weapon.add(pistol, rifle);
    this.weapon.add(this.muzzle);
    this.setWeapon(look.weapon === 'knuckles' ? null : look.weapon);
    // Collapse same-material parts on each bone into one mesh (≈ halves draw calls).
    for (const g of [this.hips, this.torso, this.head, this.armL, this.armR, this.elbowL, this.elbowR, this.legL, this.legR, this.kneeL, this.kneeR, pistol, rifle]) {
      mergeChildrenByMaterial(g);
    }
  }

  setWeapon(kind: 'pistol' | 'rifle' | null): void {
    for (const [k, obj] of Object.entries(this.weaponMeshes)) obj.visible = k === kind;
    this.muzzle.position.set(0, 0.02, kind === 'rifle' ? 0.64 : 0.26);
  }

  setNeon(color: number): void {
    this.neonBase.set(color).multiplyScalar(2.2);
    this.neonMat.color.copy(this.neonBase);
  }

  hitFlash(): void {
    this.flash = 1;
  }

  startDeath(): void {
    this.deathT = 0;
  }

  get dead(): boolean {
    return this.deathT >= 0;
  }

  reset(): void {
    this.deathT = -1;
    this.flash = 0;
    this.root.rotation.set(0, this.root.rotation.y, 0);
    this.root.position.y = 0;
    this.hips.position.set(0, this.hipHeight, 0);
    this.hips.rotation.set(0, 0, 0);
  }

  update(dt: number, pose: PoseState): void {
    // Hit flash: brief emissive white pulse on all cloth/skin materials.
    if (this.flash > 0) {
      this.flash = Math.max(0, this.flash - dt * 6);
      for (const m of this.materials) m.emissive.setRGB(this.flash * 0.55, this.flash * 0.12, this.flash * 0.3);
      this.neonMat.color.copy(this.neonBase).multiplyScalar(1 + this.flash);
    }
    if (this.deathT >= 0) {
      this.animateDeath(dt);
      return;
    }

    const speed = pose.speed;
    const moving = Math.min(1, speed / 2.5);
    const running = THREE.MathUtils.clamp((speed - 4.5) / 3, 0, 1);
    const stride = 0.55 + running * 0.35;
    this.phase += dt * (speed * 1.65 + (moving > 0 ? 1.5 : 0));
    const s = Math.sin(this.phase);
    const c = Math.cos(this.phase);

    if (pose.grounded && !this.wasGrounded) this.landing = 1;
    this.wasGrounded = pose.grounded;
    this.landing = Math.max(0, this.landing - dt * 5);

    if (pose.grounded) {
      this.legL.rotation.x = s * stride * moving;
      this.legR.rotation.x = -s * stride * moving;
      this.kneeL.rotation.x = Math.max(0, -c) * (0.9 + running * 0.5) * moving + 0.05;
      this.kneeR.rotation.x = Math.max(0, c) * (0.9 + running * 0.5) * moving + 0.05;
      this.hips.position.y = this.hipHeight - Math.abs(c) * 0.05 * moving - this.landing * 0.12 + (1 - moving) * Math.sin(this.phase * 0.6) * 0.008;
    } else {
      // Tucked jump pose.
      this.legL.rotation.x = THREE.MathUtils.lerp(this.legL.rotation.x, -0.5, dt * 10);
      this.legR.rotation.x = THREE.MathUtils.lerp(this.legR.rotation.x, 0.25, dt * 10);
      this.kneeL.rotation.x = THREE.MathUtils.lerp(this.kneeL.rotation.x, 1.1, dt * 10);
      this.kneeR.rotation.x = THREE.MathUtils.lerp(this.kneeR.rotation.x, 0.6, dt * 10);
    }
    this.torso.rotation.x = 0.06 + running * 0.18 - pose.kick * 0.05;
    this.torso.rotation.y = s * 0.08 * moving * (1 - pose.aim);
    this.hips.rotation.y = -s * 0.06 * moving;

    // Arms: swing while moving, blend into a two-handed aim pose.
    const swingL = -s * 0.6 * moving * (0.6 + running);
    const swingR = s * 0.6 * moving * (0.6 + running);
    const aimX = -Math.PI / 2 - pose.aimPitch * 0.9 + pose.kick * 0.25;
    this.armR.rotation.x = THREE.MathUtils.lerp(swingR, aimX, pose.aim);
    this.armR.rotation.z = THREE.MathUtils.lerp(-0.08, 0.06, pose.aim);
    this.armR.rotation.y = 0;
    this.elbowR.rotation.x = THREE.MathUtils.lerp(-0.25 - running * 0.6, -0.05, pose.aim);
    this.armL.rotation.x = THREE.MathUtils.lerp(swingL, aimX + 0.15, pose.aim * 0.9);
    this.armL.rotation.z = THREE.MathUtils.lerp(0.08, -0.5, pose.aim);
    this.armL.rotation.y = 0;
    this.elbowL.rotation.x = THREE.MathUtils.lerp(-0.25 - running * 0.6, -0.45, pose.aim);
    this.weapon.rotation.x = THREE.MathUtils.lerp(Math.PI / 2 - 0.3, Math.PI / 2, pose.aim);

    if (pose.swing > 0) {
      // Melee haymaker for enforcers.
      const t = pose.swing;
      const wind = t < 0.5 ? t / 0.5 : 1 - (t - 0.5) / 0.5;
      this.armR.rotation.x = -0.4 - wind * 1.6;
      this.armR.rotation.z = -0.7 + t * 1.5;
      this.elbowR.rotation.x = -1.2 + wind * 0.9;
      this.torso.rotation.y = 0.4 - t * 0.9;
    }
    this.head.rotation.x = pose.aimPitch * 0.4 * pose.aim;
  }

  private animateDeath(dt: number): void {
    this.deathT += dt;
    const t = Math.min(1, this.deathT / 0.65);
    const e = 1 - Math.pow(1 - t, 3);
    this.hips.rotation.x = -e * 1.45;
    this.hips.position.y = THREE.MathUtils.lerp(this.hipHeight, 0.22, e);
    this.hips.position.z = -e * 0.5;
    this.armL.rotation.x = -e * 2.4;
    this.armR.rotation.x = -e * 2.2;
    this.armL.rotation.z = e * 0.5;
    this.armR.rotation.z = -e * 0.5;
    this.legL.rotation.x = e * 0.3;
    this.kneeL.rotation.x = e * 0.4;
    this.legR.rotation.x = -e * 0.1;
    if (this.deathT > 1.6) this.root.position.y -= dt * 0.6;
  }

  get deathTime(): number {
    return this.deathT;
  }

  dispose(): void {
    for (const m of this.materials) m.dispose();
    this.neonMat.dispose();
  }
}
