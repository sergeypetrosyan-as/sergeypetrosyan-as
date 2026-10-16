import * as THREE from 'three';
import { HULLS, WEAPONS } from '../sim/content.ts';
import type { HullId, WeaponId } from '../sim/types.ts';
import { merge, worldBox } from './geometry.ts';
import { trackTexture } from './textures.ts';

/** Geometry for one material slot of a part (shared between all tanks of that type). */
interface PartGeo {
  body: THREE.BufferGeometry | null;
  dark: THREE.BufferGeometry | null;
  accent: THREE.BufferGeometry | null;
  light: THREE.BufferGeometry | null;
}

const geoCache = new Map<string, PartGeo>();

function part(key: string, build: (p: { body: THREE.BufferGeometry[]; dark: THREE.BufferGeometry[]; accent: THREE.BufferGeometry[]; light: THREE.BufferGeometry[] }) => void): PartGeo {
  const hit = geoCache.get(key);
  if (hit) return hit;
  const lists = { body: [] as THREE.BufferGeometry[], dark: [] as THREE.BufferGeometry[], accent: [] as THREE.BufferGeometry[], light: [] as THREE.BufferGeometry[] };
  build(lists);
  const g: PartGeo = { body: merge(lists.body), dark: merge(lists.dark), accent: merge(lists.accent), light: merge(lists.light) };
  geoCache.set(key, g);
  return g;
}

/** Side profile (z, y pairs) extruded across X from `x` to `x + width`. */
function profile(points: Array<[number, number]>, width: number, x = 0): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) shape.lineTo(points[i][0], points[i][1]);
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 1 });
  // Shape is in (x=z, y); extrude along +z → rotate so extrusion runs along X.
  g.rotateY(-Math.PI / 2);
  g.translate(x + width, 0, 0);
  return g;
}

function cyl(r0: number, r1: number, h: number, seg: number, rx: number, x: number, y: number, z: number, ry = 0): THREE.BufferGeometry {
  const g = new THREE.CylinderGeometry(r0, r1, h, seg);
  if (rx) g.rotateX(rx);
  if (ry) g.rotateY(ry);
  g.translate(x, y, z);
  return g;
}

function box(cx: number, cy: number, cz: number, w: number, h: number, d: number): THREE.BufferGeometry {
  return worldBox(cx - w / 2, cy - h / 2, cz - d / 2, cx + w / 2, cy + h / 2, cz + d / 2, 1);
}

/** Hull body (between and above the tracks), per hull type. Local +Z is forward. */
function hullGeo(id: HullId): PartGeo {
  return part(`hull:${id}`, (p) => {
    const h = HULLS[id];
    const L = h.length, W = h.width;
    const tw = id === 'bastion' ? 0.85 : id === 'hornet' ? 0.62 : 0.72;
    const inner = W - tw * 2 - 0.08;
    const top = h.turretHeight;
    if (id === 'hornet') {
      p.body.push(profile([[-L / 2, 0.45], [L / 2 - 0.2, 0.45], [L / 2 + 0.15, 0.62], [L * 0.2, top - 0.02], [-L / 2 + 0.3, top], [-L / 2, top - 0.25]], inner, -inner / 2));
      // Fenders over the tracks, sloping at the nose.
      for (const s of [-1, 1]) {
        p.body.push(profile([[-L / 2 - 0.05, 0.92], [L / 2 - 0.4, 0.92], [L / 2 + 0.1, 0.7], [L / 2 + 0.1, 0.62], [L / 2 - 0.5, 1.08], [-L / 2 + 0.1, 1.08]], tw + 0.1, s * (W / 2 - tw / 2) - (tw + 0.1) / 2));
        p.accent.push(box(s * (W / 2 + 0.03), 0.98, 0, 0.06, 0.07, L * 0.8));
        // Rear fins.
        p.dark.push(box(s * (inner / 2 - 0.15), top + 0.2, -L / 2 + 0.35, 0.08, 0.5, 0.6));
      }
      p.light.push(box(0, 0.75, L / 2 + 0.12, inner * 0.7, 0.06, 0.06));
    } else if (id === 'vanguard') {
      p.body.push(profile([[-L / 2, 0.42], [L / 2 - 0.3, 0.42], [L / 2 + 0.1, 0.72], [L / 2 - 0.55, top - 0.05], [-L / 2 + 0.2, top], [-L / 2, top - 0.35]], inner, -inner / 2));
      for (const s of [-1, 1]) {
        p.body.push(profile([[-L / 2 - 0.1, 0.98], [L / 2 - 0.3, 0.98], [L / 2 + 0.12, 0.74], [L / 2 + 0.12, 0.66], [L / 2 - 0.45, 1.16], [-L / 2 + 0.05, 1.16]], tw + 0.12, s * (W / 2 - tw / 2) - (tw + 0.12) / 2));
        p.accent.push(box(s * (W / 2 + 0.05), 1.06, -0.2, 0.06, 0.08, L * 0.62));
        p.dark.push(box(s * (inner / 2 - 0.35), top + 0.06, -L / 2 + 0.55, 0.35, 0.22, 0.7)); // engine vents
        p.light.push(box(s * (inner / 2 - 0.25), 0.95, L / 2 - 0.05, 0.35, 0.1, 0.06));
      }
      p.dark.push(box(0, top + 0.02, -L / 2 + 0.25, inner * 0.8, 0.1, 0.3));
    } else {
      p.body.push(profile([[-L / 2, 0.4], [L / 2 - 0.15, 0.4], [L / 2 + 0.15, 0.95], [L / 2 - 0.35, top - 0.02], [-L / 2 + 0.15, top], [-L / 2, top - 0.2]], inner, -inner / 2));
      for (const s of [-1, 1]) {
        // Armoured side skirts over the tracks.
        p.body.push(profile([[-L / 2 - 0.1, 0.55], [L / 2 - 0.1, 0.55], [L / 2 + 0.2, 0.85], [L / 2 + 0.2, 1.25], [L / 2 - 0.3, 1.38], [-L / 2 + 0.1, 1.38]], tw + 0.16, s * (W / 2 - tw / 2) - (tw + 0.16) / 2));
        p.accent.push(box(s * (W / 2 + 0.09), 1.0, 0, 0.06, 0.09, L * 0.75));
        p.accent.push(box(s * (W / 2 + 0.09), 0.78, 0, 0.06, 0.05, L * 0.75));
        // Exhaust stacks.
        p.dark.push(cyl(0.12, 0.14, 0.6, 8, 0, s * (inner / 2 - 0.25), top + 0.25, -L / 2 + 0.3));
        p.light.push(box(s * (inner / 2 - 0.3), 1.0, L / 2 + 0.16, 0.4, 0.12, 0.05));
      }
      // Front appliqué plates.
      p.dark.push(box(0, 1.15, L / 2 - 0.02, inner * 0.92, 0.35, 0.18));
    }
    // Rear light bar.
    p.accent.push(box(0, top - 0.25, -L / 2 - 0.04, inner * 0.7, 0.07, 0.04));
  });
}

/** Road wheels and sprockets for one side. */
function wheelsGeo(id: HullId): PartGeo {
  return part(`wheels:${id}`, (p) => {
    const h = HULLS[id];
    const L = h.length, W = h.width;
    const n = id === 'bastion' ? 6 : 5;
    const r = id === 'hornet' ? 0.3 : 0.34;
    for (const s of [-1, 1]) {
      const x = s * (W / 2 + 0.01);
      for (let i = 0; i < n; i++) {
        const z = -L / 2 + 0.55 + (i * (L - 1.1)) / (n - 1);
        p.dark.push(rotZ(cyl(r, r, 0.12, 12, 0, 0, 0, 0), x, 0.42, z));
        p.accent.push(rotZ(cyl(0.07, 0.07, 0.14, 6, 0, 0, 0, 0), x + s * 0.01, 0.42, z));
      }
    }
  });
}

function rotZ(g: THREE.BufferGeometry, x: number, y: number, z: number): THREE.BufferGeometry {
  g.rotateZ(Math.PI / 2);
  g.translate(x, y, z);
  return g;
}

/** Turret body (rotates in yaw) and barrel (pitches), per weapon. Barrel pivot is at the turret centre. */
function turretGeo(w: WeaponId, hull: HullId): { turret: PartGeo; barrel: PartGeo } {
  const scale = hull === 'bastion' ? 1.12 : hull === 'hornet' ? 0.88 : 1;
  const L = WEAPONS[w].barrelLength;
  const turret = part(`turret:${w}:${hull}`, (p) => {
    const s = scale;
    if (w === 'plasma') {
      p.body.push(cyl(0.95 * s, 1.1 * s, 0.55, 6, 0, 0, 0.28, -0.05, Math.PI / 6));
      p.dark.push(cyl(1.12 * s, 1.15 * s, 0.1, 6, 0, 0, 0.02, -0.05, Math.PI / 6));
      p.accent.push(box(0, 0.4, -1.0 * s, 0.9 * s, 0.06, 0.06));
      p.dark.push(box(0.55 * s, 0.62, -0.5, 0.25, 0.18, 0.5)); // sensor
      p.light.push(box(0.55 * s, 0.62, -0.24, 0.12, 0.08, 0.04));
    } else if (w === 'rail') {
      p.body.push(profile([[-1.0 * s, 0], [0.7 * s, 0], [1.0 * s, 0.25], [0.6 * s, 0.5], [-0.9 * s, 0.5]], 1.6 * s, -0.8 * s));
      p.dark.push(box(0, 0.6, -0.6, 1.1 * s, 0.22, 0.6)); // capacitor bank
      p.accent.push(box(0, 0.72, -0.6, 0.9 * s, 0.04, 0.5));
      for (const k of [-1, 1]) p.accent.push(box(k * 0.82 * s, 0.25, 0, 0.04, 0.06, 1.4 * s));
    } else if (w === 'volt') {
      const dome = new THREE.SphereGeometry(0.95 * s, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
      dome.scale(1, 0.7, 1.1);
      p.body.push(dome);
      p.dark.push(cyl(1.0 * s, 1.05 * s, 0.12, 16, 0, 0, 0.02, 0));
      p.accent.push(cyl(0.98 * s, 0.98 * s, 0.05, 16, 0, 0, 0.12, 0));
      p.light.push(box(0, 0.62 * s, -0.4, 0.3, 0.06, 0.3));
    } else {
      p.body.push(box(0, 0.3, -0.1, 1.5 * s, 0.6, 1.5 * s));
      p.dark.push(cyl(0.6 * s, 0.65 * s, 0.25, 12, 0, 0, 0.6, -0.1));
      p.accent.push(box(0, 0.45, 0.66 * s, 1.2 * s, 0.05, 0.04));
    }
  });
  const barrel = part(`barrel:${w}:${hull}`, (p) => {
    const s = scale;
    if (w === 'plasma') {
      p.body.push(box(0, 0, 0.55, 0.55 * s, 0.45 * s, 0.6)); // mantlet
      p.dark.push(cyl(0.17 * s, 0.2 * s, L - 0.4, 12, Math.PI / 2, 0, 0, 0.4 + (L - 0.4) / 2));
      for (let i = 0; i < 3; i++) p.accent.push(cyl(0.23 * s, 0.23 * s, 0.07, 12, Math.PI / 2, 0, 0, 1.0 + i * 0.35));
      p.dark.push(cyl(0.27 * s, 0.25 * s, 0.35, 8, Math.PI / 2, 0, 0, L - 0.15)); // muzzle brake
      p.light.push(cyl(0.12 * s, 0.12 * s, 0.02, 10, Math.PI / 2, 0, 0, L + 0.03));
    } else if (w === 'rail') {
      p.body.push(box(0, 0, 0.7, 0.6 * s, 0.4 * s, 0.6));
      for (const k of [-1, 1]) p.dark.push(box(k * 0.17 * s, 0, 0.4 + (L - 0.4) / 2, 0.12 * s, 0.3 * s, L - 0.4));
      p.accent.push(box(0, 0, 0.5 + (L - 0.5) / 2, 0.06, 0.08 * s, L - 0.6));
      for (let i = 0; i < 4; i++) p.dark.push(box(0, 0.19 * s, 1.0 + i * 0.6, 0.48 * s, 0.06, 0.12));
      p.light.push(box(0, 0, L, 0.2 * s, 0.1, 0.03));
    } else if (w === 'volt') {
      p.body.push(box(0, 0, 0.6, 0.45 * s, 0.4 * s, 0.5));
      p.dark.push(cyl(0.13 * s, 0.17 * s, L - 0.6, 10, Math.PI / 2, 0, 0, 0.6 + (L - 0.6) / 2));
      for (let i = 0; i < 3; i++) {
        const t = new THREE.TorusGeometry(0.24 * s, 0.05, 6, 16);
        t.translate(0, 0, 1.0 + i * 0.32);
        p.accent.push(t);
      }
      for (let k = 0; k < 3; k++) {
        const a = (k / 3) * Math.PI * 2;
        const g = box(0, 0, 0, 0.06, 0.06, 0.5);
        g.rotateX(0.35);
        g.translate(0, 0.16 * s, 0);
        g.rotateZ(a);
        g.translate(0, 0, L - 0.2);
        p.dark.push(g);
      }
      p.light.push(new THREE.SphereGeometry(0.11 * s, 8, 6).translate(0, 0, L));
    } else {
      // Rocket pod: 2×2 tubes.
      p.body.push(box(0, 0.05, 0.75, 1.15 * s, 0.85 * s, 1.5));
      for (const kx of [-1, 1]) {
        for (const ky of [-1, 1]) {
          p.dark.push(cyl(0.19 * s, 0.19 * s, 0.3, 10, Math.PI / 2, kx * 0.27 * s, 0.05 + ky * 0.21 * s, L - 0.05));
          p.light.push(cyl(0.12 * s, 0.12 * s, 0.02, 8, Math.PI / 2, kx * 0.27 * s, 0.05 + ky * 0.21 * s, L + 0.11));
        }
      }
      p.accent.push(box(0, 0.5 * s, 0.75, 1.17 * s, 0.05, 1.3));
    }
  });
  return { turret, barrel };
}

export interface TankLook {
  hull: HullId;
  weapon: WeaponId;
  body: number;
  metal: number;
  accent: number;
  light: number;
}

/**
 * A procedurally built tank. Hierarchy:
 *   root (position) ── hull (yaw + tilt) ── tracks/wheels
 *                   └─ turret (world yaw, level) ── barrelPivot (pitch) ── recoil ── barrel
 */
export class TankModel {
  readonly root = new THREE.Group();
  readonly hull = new THREE.Group();
  readonly turret = new THREE.Group();
  readonly barrelPivot = new THREE.Group();
  readonly recoil = new THREE.Group();
  readonly shield: THREE.Mesh;
  readonly trackTex: [THREE.Texture, THREE.Texture];
  readonly bodyMat: THREE.MeshStandardMaterial;
  readonly darkMat: THREE.MeshStandardMaterial;
  readonly accentMat: THREE.MeshBasicMaterial;
  readonly lightMat: THREE.MeshBasicMaterial;
  private readonly trackMats: THREE.MeshStandardMaterial[] = [];
  private readonly ownGeos: THREE.BufferGeometry[] = [];
  private readonly shieldMat: THREE.ShaderMaterial;
  readonly look: TankLook;
  private readonly accentColor = new THREE.Color();
  private readonly baseBody = new THREE.Color();

  constructor(look: TankLook, env: THREE.Texture | null, shadows: boolean) {
    this.look = look;
    const h = HULLS[look.hull];
    this.bodyMat = new THREE.MeshStandardMaterial({ color: look.body, metalness: look.metal, roughness: 0.45, envMap: env, envMapIntensity: 0.5 });
    this.darkMat = new THREE.MeshStandardMaterial({ color: 0x14171d, metalness: 0.8, roughness: 0.45, envMap: env, envMapIntensity: 0.8 });
    this.accentColor.setHex(look.accent).multiplyScalar(2.2);
    this.baseBody.setHex(look.body);
    this.accentMat = new THREE.MeshBasicMaterial({ color: this.accentColor.clone(), toneMapped: false });
    this.lightMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(look.light).multiplyScalar(1.6), toneMapped: false });

    const add = (parent: THREE.Object3D, g: PartGeo) => {
      const slots: Array<[THREE.BufferGeometry | null, THREE.Material]> = [[g.body, this.bodyMat], [g.dark, this.darkMat], [g.accent, this.accentMat], [g.light, this.lightMat]];
      for (const [geo, mat] of slots) {
        if (!geo) continue;
        const m = new THREE.Mesh(geo, mat);
        m.castShadow = shadows && mat !== this.accentMat && mat !== this.lightMat;
        parent.add(m);
      }
    };

    // Tracks: one box per side with a scrolling tread texture.
    const tw = look.hull === 'bastion' ? 0.85 : look.hull === 'hornet' ? 0.62 : 0.72;
    const base = trackTexture();
    const texL = base.clone();
    const texR = base.clone();
    for (const t of [texL, texR]) {
      t.needsUpdate = true;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(1, h.length / 1.2);
    }
    this.trackTex = [texL, texR];
    for (const [s, tex] of [[1, texL], [-1, texR]] as Array<[number, THREE.Texture]>) {
      const mat = new THREE.MeshStandardMaterial({ map: tex, color: 0x8a909c, metalness: 0.6, roughness: 0.7 });
      this.trackMats.push(mat);
      const g = new THREE.BoxGeometry(tw, 0.86, h.length + 0.1);
      // Planar UVs along Z on every face so the tread scrolls lengthwise.
      const pos = g.attributes.position as THREE.BufferAttribute;
      const uv = g.attributes.uv as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + pos.getY(i)) / tw, pos.getZ(i) / h.length + 0.5);
      g.translate(s * (h.width / 2 - tw / 2), 0.43, 0);
      this.ownGeos.push(g);
      const m = new THREE.Mesh(g, mat);
      m.castShadow = shadows;
      this.hull.add(m);
    }
    add(this.hull, hullGeo(look.hull));
    add(this.hull, wheelsGeo(look.hull));

    const { turret, barrel } = turretGeo(look.weapon, look.hull);
    this.turret.position.y = h.turretHeight;
    add(this.turret, turret);
    this.barrelPivot.position.y = 0.42;
    this.turret.add(this.barrelPivot);
    this.barrelPivot.add(this.recoil);
    add(this.recoil, barrel);

    // Shield dome (AEGIS).
    this.shieldMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color(0x7fe9ff) }, uTime: { value: 0 }, uAlpha: { value: 1 } },
      vertexShader: /* glsl */ `
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vP = position;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor; uniform float uTime; uniform float uAlpha;
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main() {
          float f = pow(1.0 - abs(dot(vN, vV)), 2.5);
          float hex = step(0.92, fract(vP.y * 3.0 + uTime * 0.6)) * 0.35;
          gl_FragColor = vec4(uColor * 1.8, (f * 0.85 + hex * 0.4 + 0.04) * uAlpha);
        }`,
    });
    const sg = new THREE.SphereGeometry(1, 24, 14);
    this.ownGeos.push(sg);
    this.shield = new THREE.Mesh(sg, this.shieldMat);
    this.shield.scale.set(h.width * 0.85, h.turretHeight * 1.5, h.length * 0.7);
    this.shield.position.y = h.turretHeight * 0.5;
    this.shield.visible = false;

    this.root.add(this.hull, this.turret, this.shield);
  }

  /** Track scroll in metres for each side. */
  setTracks(left: number, right: number): void {
    this.trackTex[0].offset.y = -left / 1.2;
    this.trackTex[1].offset.y = -right / 1.2;
  }

  setShield(visible: boolean, time: number, alpha: number): void {
    this.shield.visible = visible;
    if (visible) {
      this.shieldMat.uniforms.uTime.value = time;
      this.shieldMat.uniforms.uAlpha.value = alpha;
    }
  }

  /** 0 = intact, 1 = burnt-out wreck. */
  setWreck(amount: number): void {
    this.bodyMat.color.copy(this.baseBody).multiplyScalar(1 - amount * 0.85);
    this.accentMat.color.copy(this.accentColor).multiplyScalar(1 - amount);
    this.lightMat.visible = amount < 0.5;
  }

  /** Brief white flash on hit. */
  setHitFlash(k: number): void {
    this.bodyMat.emissive.setRGB(k * 0.32, k * 0.22, k * 0.14);
  }

  dispose(): void {
    this.root.removeFromParent();
    this.bodyMat.dispose();
    this.darkMat.dispose();
    this.accentMat.dispose();
    this.lightMat.dispose();
    this.shieldMat.dispose();
    this.trackMats.forEach((m) => m.dispose());
    this.trackTex.forEach((t) => t.dispose());
    this.ownGeos.forEach((g) => g.dispose());
  }
}

export function disposeTankGeometry(): void {
  geoCache.forEach((g) => {
    g.body?.dispose(); g.dark?.dispose(); g.accent?.dispose(); g.light?.dispose();
  });
  geoCache.clear();
}
