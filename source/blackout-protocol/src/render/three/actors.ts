// Operative and guard figures built from primitives, with a procedural walk / sneak / alert rig.
// Local space faces +X; root.rotation.y = -angle maps the sim's (cos a, sin a) heading onto XZ.
import * as THREE from 'three';
import type { BakeUniforms } from './bake.ts';
import { patchMaterial } from './bake.ts';
import { fabric } from './textures.ts';

export interface Rig {
  root: THREE.Group;
  body: THREE.Group;
  hips: THREE.Group;
  torso: THREE.Group;
  head: THREE.Group;
  aim: THREE.Group;
  legL: THREE.Group; legR: THREE.Group;
  armL: THREE.Group; armR: THREE.Group;
  lens: THREE.Mesh | null;
  torch: THREE.Group | null;
  phase: number;
  px: number; py: number;
  yaw: number;
  sneak: number;
  alert: number;
  init: boolean;
  disposables: { dispose(): void }[];
}

export type RimUniform = { value: THREE.Color };

function rimPatch(m: THREE.MeshStandardMaterial, rim: RimUniform): void {
  const prev = m.onBeforeCompile;
  m.onBeforeCompile = (s, r) => {
    prev.call(m, s, r);
    s.uniforms.uRimCol = rim;
    s.fragmentShader = s.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uRimCol;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{ float fr = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.2); totalEmissiveRadiance += uRimCol * fr; }`);
  };
  m.customProgramCacheKey = () => 'bake-0-rim';
}

function capsule(r: number, len: number, mat: THREE.Material, list: { dispose(): void }[]): THREE.Mesh {
  const g = new THREE.CapsuleGeometry(r, len, 4, 10);
  list.push(g);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true;
  return m;
}

function box(w: number, h: number, d: number, mat: THREE.Material, list: { dispose(): void }[]): THREE.Mesh {
  const g = new THREE.BoxGeometry(w, h, d);
  list.push(g);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true;
  return m;
}

interface Look { suit: string; accent: string; skin: string; headgear: 'hood' | 'cap' | 'helmet'; band: boolean; pack: boolean; flashlight: boolean }

function build(look: Look, u: BakeUniforms, rim: RimUniform | null): Rig {
  const list: { dispose(): void }[] = [];
  const mk = (hex: string, rough: number, seed: number, metal = 0): THREE.MeshStandardMaterial => {
    const t = fabric(hex, seed);
    list.push(t);
    const m = patchMaterial(new THREE.MeshStandardMaterial({ map: t, roughness: rough, metalness: metal }), u);
    if (rim) rimPatch(m, rim);
    list.push(m);
    return m;
  };
  const suit = mk(look.suit, 0.85, 1);
  const dark = mk(look.accent, 0.7, 2);
  const skin = mk(look.skin, 0.6, 3);
  const root = new THREE.Group();
  const body = new THREE.Group();
  body.scale.setScalar(1.2);
  root.add(body);
  const hips = new THREE.Group();
  hips.position.y = 0.42;
  body.add(hips);
  // legs
  const leg = (side: number): THREE.Group => {
    const gp = new THREE.Group();
    gp.position.set(0, 0, side * 0.075);
    const m = capsule(0.055, 0.3, dark, list);
    m.position.y = -0.2;
    gp.add(m);
    const boot = box(0.13, 0.05, 0.08, dark, list);
    boot.position.set(0.03, -0.39, 0);
    gp.add(boot);
    hips.add(gp);
    return gp;
  };
  const legL = leg(-1), legR = leg(1);
  // torso
  const torso = new THREE.Group();
  hips.add(torso);
  const chest = capsule(0.12, 0.2, suit, list);
  chest.position.y = 0.22;
  chest.scale.set(0.85, 1, 1.3);
  torso.add(chest);
  if (look.band) {
    const bandMat = patchMaterial(new THREE.MeshStandardMaterial({ color: 0xd4dadc, roughness: 0.35, metalness: 0.1 }), u);
    list.push(bandMat);
    const band = box(0.215, 0.035, 0.32, bandMat, list);
    band.position.y = 0.27;
    torso.add(band);
    const band2 = box(0.215, 0.025, 0.3, bandMat, list);
    band2.position.y = 0.12;
    torso.add(band2);
  }
  if (look.pack) {
    const pack = box(0.13, 0.27, 0.24, dark, list);
    pack.position.set(-0.15, 0.24, 0);
    torso.add(pack);
    const roll = capsule(0.04, 0.16, suit, list);
    roll.rotation.x = Math.PI / 2;
    roll.position.set(-0.15, 0.4, 0);
    torso.add(roll);
  }
  // head
  const head = new THREE.Group();
  head.position.y = 0.49;
  torso.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 10), skin);
  list.push(skull.geometry);
  skull.castShadow = true;
  head.add(skull);
  let lens: THREE.Mesh | null = null;
  let torchG: THREE.Group | null = null;
  if (look.headgear === 'hood') {
    const hood = new THREE.Mesh(new THREE.SphereGeometry(0.098, 14, 10, Math.PI * 0.15, Math.PI * 1.7), suit);
    list.push(hood.geometry);
    hood.rotation.y = Math.PI;
    hood.castShadow = true;
    head.add(hood);
    const gm = new THREE.MeshStandardMaterial({ color: 0x0a0d0f, emissive: 0x3fd8e8, emissiveIntensity: 1.6, roughness: 0.2 });
    list.push(gm);
    const gog = box(0.03, 0.028, 0.12, gm, list);
    gog.position.set(0.075, 0.012, 0);
    head.add(gog);
  } else if (look.headgear === 'cap') {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.09, 0.05, 14), dark);
    list.push(cap.geometry);
    cap.position.y = 0.055;
    head.add(cap);
    const brim = box(0.07, 0.012, 0.12, dark, list);
    brim.position.set(0.08, 0.035, 0);
    head.add(brim);
  } else {
    const helm = new THREE.Mesh(new THREE.SphereGeometry(0.102, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), dark);
    list.push(helm.geometry);
    helm.position.y = 0.012;
    helm.castShadow = true;
    head.add(helm);
    const vm = new THREE.MeshStandardMaterial({ color: 0x111417, roughness: 0.15, metalness: 0.6 });
    list.push(vm);
    const visor = box(0.02, 0.03, 0.13, vm, list);
    visor.position.set(0.085, 0.0, 0);
    head.add(visor);
  }
  // aim group: right arm + flashlight turn with the head
  const aim = new THREE.Group();
  aim.position.y = 0.0;
  torso.add(aim);
  const arm = (side: number, parent: THREE.Group): THREE.Group => {
    const gp = new THREE.Group();
    gp.position.set(0, 0.34, side * 0.165);
    const m = capsule(0.04, 0.24, suit, list);
    m.position.y = -0.16;
    gp.add(m);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), skin);
    list.push(hand.geometry);
    hand.position.y = -0.31;
    gp.add(hand);
    parent.add(gp);
    return gp;
  };
  const armL = arm(-1, torso);
  const armR = arm(1, aim);
  if (look.flashlight) {
    const fm = new THREE.MeshStandardMaterial({ color: 0x1b1e21, roughness: 0.4, metalness: 0.7 });
    list.push(fm);
    const torch = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.03, 0.15, 10), fm);
    list.push(torch.geometry);
    torch.rotation.z = -Math.PI / 2;
    torch.position.set(0.06, 0, 0);
    torchG = new THREE.Group();
    torchG.position.set(0, -0.31, 0);
    torchG.add(torch);
    armR.add(torchG);
    const lm = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff2d8, emissiveIntensity: 4, roughness: 0.1 });
    list.push(lm);
    lens = new THREE.Mesh(new THREE.CircleGeometry(0.028, 12), lm);
    list.push(lens.geometry);
    lens.rotation.y = Math.PI / 2;
    lens.position.set(0.136, 0, 0);
    torchG.add(lens);
  }
  return { root, body, hips, torso, head, aim, legL, legR, armL, armR, lens, torch: torchG, phase: 0, px: 0, py: 0, yaw: 0, sneak: 0, alert: 0, init: false, disposables: list };
}

export function buildOperative(u: BakeUniforms, rim: RimUniform): Rig {
  return build({ suit: '#2b3034', accent: '#1a1d20', skin: '#6b5446', headgear: 'hood', band: false, pack: true, flashlight: false }, u, rim);
}

export function buildGuard(u: BakeUniforms, variant: number): Rig {
  const looks: Look[] = [
    { suit: '#2d3a4f', accent: '#171c24', skin: '#8a6a55', headgear: 'cap', band: true, pack: false, flashlight: true },
    { suit: '#4a4d3e', accent: '#25271f', skin: '#5f4636', headgear: 'helmet', band: true, pack: false, flashlight: true },
  ];
  return build(looks[variant % looks.length], u, null);
}

function wrapAngle(a: number): number {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

export interface Pose { face: number; sneak: boolean; alert: boolean; suspicious: boolean; headLead: boolean }

/** Advance the rig from the simulated position. Stride is driven by distance moved. */
export function animateRig(r: Rig, x: number, y: number, pose: Pose, dt: number, reduce: boolean): void {
  if (!r.init) { r.px = x; r.py = y; r.yaw = pose.face; r.init = true; }
  const dx = x - r.px, dy = y - r.py;
  const dist = Math.hypot(dx, dy);
  r.px = x; r.py = y;
  const speed = dt > 0 ? dist / dt : 0;
  const moving = speed > 0.2 && dist < 1;
  // body yaw follows movement; the head (and the aim group) follows the facing direction
  const target = moving && pose.headLead ? Math.atan2(dy, dx) : pose.face;
  const k = 1 - Math.exp(-dt * (moving ? 10 : 6));
  r.yaw = wrapAngle(r.yaw + wrapAngle(target - r.yaw) * k);
  if (dist > 1) r.yaw = pose.face;
  const headYaw = Math.max(-1.3, Math.min(1.3, wrapAngle(pose.face - r.yaw)));
  r.root.position.set(x, 0, y);
  r.root.rotation.y = -r.yaw;
  r.head.rotation.y = -headYaw;
  r.aim.rotation.y = -headYaw * 0.9;
  const ks = 1 - Math.exp(-dt * 8);
  r.sneak += ((pose.sneak ? 1 : 0) - r.sneak) * ks;
  r.alert += ((pose.alert ? 1 : 0) - r.alert) * (1 - Math.exp(-dt * 6));
  const amp = Math.min(1, speed / 2.6) * (moving ? 1 : 0);
  if (dist < 1) r.phase += (dist / (0.62 - r.sneak * 0.18)) * Math.PI;
  const s = reduce ? 0 : Math.sin(r.phase);
  const swing = 0.62 * amp * (1 - r.sneak * 0.4);
  r.legL.rotation.z = s * swing + r.sneak * 0.35;
  r.legR.rotation.z = -s * swing + r.sneak * 0.35;
  r.legL.scale.y = r.legR.scale.y = 1 - r.sneak * 0.18;
  r.hips.position.y = 0.42 - r.sneak * 0.1 + (reduce ? 0 : Math.abs(Math.cos(r.phase)) * 0.02 * amp);
  r.torso.rotation.z = -(0.06 * amp + r.sneak * 0.42 + r.alert * 0.16);
  r.head.rotation.z = r.sneak * 0.3 + (pose.suspicious ? 0.12 : 0);
  const armSwing = s * 0.5 * amp;
  r.armL.rotation.z = -armSwing * (1 - r.alert) + r.alert * 1.25 + r.sneak * 0.5;
  // right arm: holds the flashlight forward when a light is fitted
  const hold = r.lens ? 0.95 : 0;
  r.armR.rotation.z = (armSwing * (1 - hold)) + hold * (0.95 + r.alert * 0.45) + r.sneak * 0.4;
  r.armL.rotation.x = -0.08; r.armR.rotation.x = 0.08;
  if (r.torch) r.torch.rotation.z = -r.armR.rotation.z - r.torso.rotation.z - 0.12;
}

export function disposeRig(r: Rig): void {
  for (const d of r.disposables) d.dispose();
  r.root.removeFromParent();
}
