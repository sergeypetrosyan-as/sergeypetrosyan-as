import * as THREE from 'three';

type P = [number, number];

export interface CarSpec {
  name: string;
  paint: string;
  /** Light-bar and underglow colour. */
  accent: string;
  length: number;
  width: number;
  wheelbase: number;
  track: number;
  wheelR: number;
  /** Side silhouette of the lower body above the arches (u forward, v up), rear to front along the top. */
  top: P[];
  canopy: P[];
  canopyWidth: number;
  wing: 'none' | 'low' | 'tall';
  flare: number;
}

/** Kestrel Mk I, then Rook, Sable and Cinder. Proportions differ so rivals read at a glance. */
export const CAR_SPECS: CarSpec[] = [
  {
    name: 'Kestrel', paint: '#b9c0c9', accent: '#2cf6ff', length: 4.5, width: 1.96, wheelbase: 2.72, track: 1.68, wheelR: 0.35,
    top: [[-2.18, 0.4], [-2.3, 0.76], [-2.0, 0.88], [-1.0, 0.86], [0.7, 0.74], [1.9, 0.56], [2.22, 0.4]],
    canopy: [[-1.78, 0.86], [-1.0, 1.12], [-0.15, 1.15], [0.72, 0.76]], canopyWidth: 0.7, wing: 'low', flare: 0.02,
  },
  {
    name: 'Rook', paint: '#c2185b', accent: '#ff2ea6', length: 4.4, width: 1.94, wheelbase: 2.68, track: 1.66, wheelR: 0.34,
    top: [[-2.2, 0.46], [-2.22, 0.78], [-1.6, 0.84], [-0.4, 0.82], [0.6, 0.68], [2.0, 0.42], [2.2, 0.3]],
    canopy: [[-1.4, 0.82], [-0.7, 1.06], [0.0, 1.07], [0.6, 0.7]], canopyWidth: 0.6, wing: 'tall', flare: 0,
  },
  {
    name: 'Sable', paint: '#4b2a8a', accent: '#a07bff', length: 4.8, width: 1.98, wheelbase: 2.9, track: 1.7, wheelR: 0.36,
    top: [[-2.4, 0.5], [-2.38, 0.86], [-1.6, 0.95], [-0.4, 0.9], [0.9, 0.78], [2.2, 0.6], [2.42, 0.44]],
    canopy: [[-2.0, 0.94], [-1.05, 1.22], [0.05, 1.24], [0.95, 0.8]], canopyWidth: 0.78, wing: 'none', flare: 0,
  },
  {
    name: 'Cinder', paint: '#e07a12', accent: '#ffb347', length: 4.2, width: 2.04, wheelbase: 2.56, track: 1.76, wheelR: 0.37,
    top: [[-2.1, 0.48], [-2.12, 0.92], [-1.5, 0.98], [-0.7, 0.96], [0.5, 0.82], [1.8, 0.62], [2.1, 0.46]],
    canopy: [[-1.45, 0.96], [-0.8, 1.26], [0.05, 1.27], [0.5, 0.84]], canopyWidth: 0.74, wing: 'low', flare: 0.08,
  },
];

export interface CarShared {
  glass: THREE.MeshPhysicalMaterial;
  rubber: THREE.MeshStandardMaterial;
  rim: THREE.MeshStandardMaterial;
  disc: THREE.MeshStandardMaterial;
  trim: THREE.MeshStandardMaterial;
  seam: THREE.MeshBasicMaterial;
  headlight: THREE.MeshStandardMaterial;
  shadow: THREE.MeshBasicMaterial;
  glow: THREE.Texture;
}

export function makeCarShared(glow: THREE.Texture): CarShared {
  return {
    glass: new THREE.MeshPhysicalMaterial({ color: 0x0a0e14, metalness: 0.0, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.6, reflectivity: 0.9 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.88, metalness: 0 }),
    rim: new THREE.MeshStandardMaterial({ color: 0xb9bec6, roughness: 0.28, metalness: 1 }),
    disc: new THREE.MeshStandardMaterial({ color: 0x4a4c50, roughness: 0.45, metalness: 0.9 }),
    trim: new THREE.MeshStandardMaterial({ color: 0x0c0d10, roughness: 0.55, metalness: 0.2 }),
    seam: new THREE.MeshBasicMaterial({ color: 0x050506 }),
    headlight: new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0xe6f4ff, emissiveIntensity: 6, roughness: 0.2 }),
    shadow: new THREE.MeshBasicMaterial({ map: glow, color: 0x000000, transparent: true, opacity: 0.75, depthWrite: false }),
    glow,
  };
}

function extrudeProfile(points: P[], depth: number, bevel: number): THREE.ExtrudeGeometry {
  const sh = new THREE.Shape();
  sh.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) sh.lineTo(points[i][0], points[i][1]);
  sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 4, curveSegments: 6 });
  // shape x = forward, extrude z = lateral -> Three: forward -Z, lateral X
  g.rotateY(Math.PI / 2);
  g.translate(-depth / 2, 0, 0);
  g.computeVertexNormals();
  return g;
}

/** Lower body outline: flat floor with wheel arches cut in, then the spec's top line. */
function bodyOutline(sp: CarSpec): P[] {
  const pts: P[] = [];
  const half = sp.wheelbase / 2;
  const ar = sp.wheelR + 0.07;
  const cy = sp.wheelR + 0.02;
  const floor = 0.2;
  const rear = sp.top[0][0];
  const front = sp.top[sp.top.length - 1][0];
  pts.push([rear + 0.03, floor + 0.04]);
  for (const cx of [-half, half]) {
    pts.push([cx - ar - 0.02, floor]);
    for (let k = 0; k <= 10; k++) {
      const a = Math.PI - (k / 10) * Math.PI;
      pts.push([cx + Math.cos(a) * ar, cy + Math.sin(a) * ar]);
    }
    pts.push([cx + ar + 0.02, floor]);
  }
  pts.push([front - 0.08, floor + 0.02]);
  for (let i = sp.top.length - 1; i >= 0; i--) pts.push(sp.top[i]);
  return pts;
}

/** Pull the upper body in towards the centre line (tumblehome), so the car is not a slab. */
function taper(g: THREE.BufferGeometry, y0: number, y1: number, k: number): void {
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    const t = Math.min(1, Math.max(0, (y - y0) / (y1 - y0)));
    p.setX(i, p.getX(i) * (1 - (1 - k) * t * t));
  }
  p.needsUpdate = true;
  g.computeVertexNormals();
}

function tyreGeometry(r: number, w: number): THREE.LatheGeometry {
  const prof: THREE.Vector2[] = [];
  const rr = r * 0.72;
  prof.push(new THREE.Vector2(rr, -w / 2));
  for (let k = 0; k <= 8; k++) {
    const a = -Math.PI / 2 + (k / 8) * Math.PI;
    prof.push(new THREE.Vector2(r - 0.05 + Math.cos(a) * 0.05, Math.sin(a) * (w / 2)));
  }
  prof.push(new THREE.Vector2(rr, w / 2));
  const g = new THREE.LatheGeometry(prof, 28);
  g.rotateZ(Math.PI / 2);
  return g;
}

export class CarRig {
  readonly root = new THREE.Group();
  readonly body = new THREE.Group();
  readonly spec: CarSpec;
  private wheels: { pivot: THREE.Group; spin: THREE.Group; front: boolean }[] = [];
  readonly tail: THREE.MeshStandardMaterial;
  readonly paint: THREE.MeshPhysicalMaterial;
  readonly underMat: THREE.MeshStandardMaterial;
  private exhaust: THREE.Sprite[] = [];
  private exhaustMat: THREE.SpriteMaterial;
  private spinA = 0;
  private geoms: THREE.BufferGeometry[] = [];
  private mats: THREE.Material[] = [];
  readonly exhaustPos = new THREE.Vector3();
  readonly halfLength: number;

  constructor(spec: CarSpec, sh: CarShared) {
    this.spec = spec;
    this.halfLength = spec.length / 2;
    this.root.add(this.body);
    this.root.rotation.order = 'YXZ';
    const W = spec.width;
    const keep = <G extends THREE.BufferGeometry>(g: G): G => {
      this.geoms.push(g);
      return g;
    };
    const mat = <M extends THREE.Material>(m: M): M => {
      this.mats.push(m);
      return m;
    };
    this.paint = mat(new THREE.MeshPhysicalMaterial({ color: spec.paint, metalness: 0.55, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 1.2 }));
    this.tail = mat(new THREE.MeshStandardMaterial({ color: 0x220000, emissive: 0xff1a2a, emissiveIntensity: 2.2, roughness: 0.3 }));
    const accentMat = mat(new THREE.MeshStandardMaterial({ color: 0x050505, emissive: new THREE.Color(spec.accent), emissiveIntensity: 3.5, roughness: 0.3 }));
    this.underMat = mat(new THREE.MeshStandardMaterial({ color: 0x000000, emissive: new THREE.Color(spec.accent), emissiveIntensity: 0.9 }));

    const add = (g: THREE.BufferGeometry, m: THREE.Material, parent: THREE.Object3D = this.body, shadow = true): THREE.Mesh => {
      const mesh = new THREE.Mesh(g, m);
      mesh.castShadow = shadow;
      parent.add(mesh);
      return mesh;
    };
    const box = (w: number, h: number, d: number) => keep(new THREE.BoxGeometry(w, h, d));

    // body shell, inset so the bevel lands on the outer width
    const bevel = 0.07;
    const shell = keep(extrudeProfile(bodyOutline(spec), W - bevel * 2 - 0.04, bevel));
    taper(shell, 0.45, 0.95, 0.8);
    add(shell, this.paint);
    // flared arches (Cinder)
    if (spec.flare > 0) {
      for (const sx of [-1, 1]) {
        for (const cz of [-spec.wheelbase / 2, spec.wheelbase / 2]) {
          const f = add(box(spec.flare + 0.06, 0.12, spec.wheelR * 2.5), this.paint);
          f.position.set(sx * (W / 2 + spec.flare / 2 - 0.02), spec.wheelR * 2 + 0.06, -cz);
        }
      }
    }
    // canopy glass
    const canW = W * spec.canopyWidth;
    const glass = keep(extrudeProfile(spec.canopy.concat([[spec.canopy[spec.canopy.length - 1][0] - 0.1, spec.canopy[0][1] - 0.04]]), canW - 0.24, 0.12));
    taper(glass, 0.8, 1.28, 0.72);
    add(glass, sh.glass);
    // panel seams on both flanks: door shut lines, sill line, bonnet shut line
    const side = W / 2 - 0.005;
    const seamZ = [-spec.canopy[spec.canopy.length - 1][0] + 0.05, -spec.canopy[0][0] - 0.25];
    for (const sx of [-1, 1]) {
      for (const z of seamZ) {
        const s = add(box(0.006, 0.36, 0.012), sh.seam, this.body, false);
        s.position.set(sx * side, 0.56, z);
      }
      const sill = add(box(0.008, 0.012, spec.wheelbase - spec.wheelR * 2.4), sh.seam, this.body, false);
      sill.position.set(sx * side, 0.36, 0);
      // carbon side skirt
      const skirt = add(box(0.05, 0.07, spec.wheelbase - spec.wheelR * 2.3), sh.trim);
      skirt.position.set(sx * (W / 2 - 0.02), 0.22, 0);
    }
    const bonnet = add(box(W * 0.7, 0.008, 0.01), sh.seam, this.body, false);
    const noseTop = spec.top[spec.top.length - 2];
    bonnet.position.set(0, noseTop[1] + 0.035, -noseTop[0] + 0.15);
    bonnet.rotation.x = -0.15;
    // splitter and diffuser
    const front = spec.top[spec.top.length - 1][0];
    const rear = spec.top[0][0];
    const split = add(box(W * 0.94, 0.04, 0.3), sh.trim);
    split.position.set(0, 0.17, -front - 0.02);
    const diff = add(box(W * 0.8, 0.16, 0.3), sh.trim);
    diff.position.set(0, 0.26, -rear + 0.12);
    for (let k = -2; k <= 2; k++) {
      const fin = add(box(0.02, 0.14, 0.32), sh.trim);
      fin.position.set(k * 0.22, 0.24, -rear + 0.14);
    }
    // light bars
    const fl = add(box(W * 0.78, 0.035, 0.04), accentMat, this.body, false);
    fl.position.set(0, spec.top[spec.top.length - 1][1] + 0.03, -front - 0.05);
    for (const sx of [-1, 1]) {
      const lens = add(box(0.34, 0.06, 0.06), sh.headlight, this.body, false);
      lens.position.set(sx * (W / 2 - 0.3), spec.top[spec.top.length - 1][1] - 0.04, -front - 0.04);
    }
    // dark rear fascia so the tail reads as a light bar over a diffuser, not a painted slab
    const fascia = add(box(W * 0.86, 0.3, 0.03), sh.trim, this.body, false);
    fascia.position.set(0, spec.top[0][1] + 0.2, -rear + 0.16);
    const tl = add(box(W * 0.84, 0.05, 0.04), this.tail, this.body, false);
    tl.position.set(0, spec.top[0][1] + 0.3, -rear + 0.19);
    // underglow strip
    const ug = add(box(W * 0.75, 0.02, spec.wheelbase * 0.9), this.underMat, this.body, false);
    ug.position.set(0, 0.17, 0);
    // rear wing
    if (spec.wing !== 'none') {
      const h = spec.wing === 'tall' ? 0.42 : 0.14;
      const wing = add(box(W * 0.92, 0.04, 0.34), this.paint);
      wing.position.set(0, spec.top[1][1] + h + 0.04, -rear - 0.22);
      wing.rotation.x = 0.12;
      for (const sx of [-1, 1]) {
        const st = add(box(0.03, h + 0.04, 0.12), sh.trim);
        st.position.set(sx * W * 0.32, spec.top[1][1] + h / 2, -rear - 0.2);
      }
    }
    // exhausts with glow
    this.exhaustMat = mat(new THREE.SpriteMaterial({ map: sh.glow, color: new THREE.Color('#9ef8ff'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 }));
    const nozzle = keep(new THREE.CylinderGeometry(0.07, 0.08, 0.16, 14, 1, true));
    nozzle.rotateX(Math.PI / 2);
    for (const sx of [-0.38, 0.38]) {
      const n = add(nozzle, sh.disc, this.body, false);
      n.position.set(sx, 0.32, -rear + 0.2);
      const gl = new THREE.Sprite(this.exhaustMat);
      gl.position.set(sx, 0.32, -rear + 0.36);
      gl.renderOrder = 5;
      this.body.add(gl);
      this.exhaust.push(gl);
    }
    this.exhaustPos.set(0, 0.32, -rear + 0.4);
    // wheels
    const tyre = keep(tyreGeometry(spec.wheelR, 0.3));
    const rimFace = keep(new THREE.CylinderGeometry(spec.wheelR * 0.68, spec.wheelR * 0.68, 0.02, 24));
    rimFace.rotateZ(Math.PI / 2);
    const spoke = box(0.02, spec.wheelR * 1.25, 0.06);
    const discG = keep(new THREE.CylinderGeometry(spec.wheelR * 0.58, spec.wheelR * 0.58, 0.03, 24));
    discG.rotateZ(Math.PI / 2);
    const caliperMat = mat(new THREE.MeshStandardMaterial({ color: new THREE.Color(spec.accent).multiplyScalar(0.5), roughness: 0.4, metalness: 0.3 }));
    const caliper = box(0.07, 0.16, 0.12);
    for (const fz of [1, -1]) {
      for (const sx of [-1, 1]) {
        const pivot = new THREE.Group();
        pivot.position.set(sx * spec.track / 2, spec.wheelR, -fz * spec.wheelbase / 2);
        this.root.add(pivot);
        const spin = new THREE.Group();
        pivot.add(spin);
        const t = new THREE.Mesh(tyre, sh.rubber);
        t.castShadow = true;
        spin.add(t);
        const face = new THREE.Mesh(rimFace, sh.rim);
        face.position.x = sx * 0.1;
        spin.add(face);
        for (let k = 0; k < 5; k++) {
          const s = new THREE.Mesh(spoke, sh.rim);
          s.position.x = sx * 0.125;
          s.rotation.x = (k / 5) * Math.PI;
          spin.add(s);
        }
        const d = new THREE.Mesh(discG, sh.disc);
        d.position.x = -sx * 0.02;
        spin.add(d);
        const c = new THREE.Mesh(caliper, caliperMat);
        c.position.set(sx * 0.04, spec.wheelR * 0.4, fz * 0.08);
        pivot.add(c);
        this.wheels.push({ pivot, spin, front: fz === 1 });
      }
    }
    // contact shadow
    const cs = new THREE.Mesh(keep(new THREE.PlaneGeometry(W * 1.5, spec.length * 1.25)), sh.shadow);
    cs.rotation.x = -Math.PI / 2;
    cs.position.y = 0.02;
    cs.renderOrder = 1;
    this.root.add(cs);
  }

  /** Per-frame animation. `dist` is metres travelled this frame. */
  animate(dist: number, steer: number, braking: boolean, boost: number, time: number): void {
    this.spinA -= dist / this.spec.wheelR;
    for (const w of this.wheels) {
      w.spin.rotation.x = this.spinA;
      w.pivot.rotation.y = w.front ? -steer * 0.38 : 0;
    }
    this.tail.emissiveIntensity = braking ? 9 : 2.2;
    const flick = 0.85 + 0.15 * Math.sin(time * 70);
    this.exhaustMat.opacity = Math.min(1, boost * 1.2) * flick;
    for (const e of this.exhaust) {
      const s = 0.25 + boost * 0.6 * flick;
      e.scale.set(s, s, s);
    }
  }

  dispose(): void {
    for (const g of this.geoms) g.dispose();
    for (const m of this.mats) m.dispose();
    this.root.removeFromParent();
  }
}
