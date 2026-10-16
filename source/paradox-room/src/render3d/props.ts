// Modelled props: the Surveyor with the lantern, axioms, margin notes, the gate, portals, levers,
// switches, pressure plates and doors. Each prop owns its per-instance materials and geometry.
import * as THREE from 'three';
import type { FoldKind, GObj } from '../core/types.ts';
import type { MaterialBank } from './materials.ts';
import { COLORS } from './materials.ts';
import type { TextureBank } from './textures.ts';

/** How a prop is attached: upright in world space, bolted to a surface of the room, or filling its cell. */
export type Mount = 'gravity' | 'fixed' | 'cell';

export interface PropCtx {
  time: number;
  dt: number;
  effects: boolean;
  /** collected (axiom / note), on (switch / plate / door open), open (gate). */
  active: boolean;
  highlighted: boolean;
}

export interface Prop {
  obj: GObj;
  mount: Mount;
  root: THREE.Group;
  /** Height above the root that pickers and the highlight aim at. */
  focusY: number;
  update(c: PropCtx): void;
  /** Trigger a one-shot animation (lever pull, switch flip). */
  trigger(): void;
  dispose(): void;
}

function disposer(list: (THREE.BufferGeometry | THREE.Material)[]): () => void {
  return () => {
    for (const d of list) d.dispose();
  };
}

const ease = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function shadowed(m: THREE.Mesh, cast = true): THREE.Mesh {
  m.castShadow = cast;
  m.receiveShadow = true;
  return m;
}

export function portalColor(ch: string): THREE.Color {
  const palette = [COLORS.pencil, 0x5aa7ff, 0xc77dff, 0x55e0c0];
  const i = ch.charCodeAt(0) - 97;
  return new THREE.Color(palette[((i % 4) + 4) % 4]);
}

function letterTexture(ch: string): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = '#2b2116';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#e9c77a';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 112, 112);
  ctx.fillStyle = '#f1d38d';
  ctx.font = '600 84px "Barlow Condensed", "Arial Narrow", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(ch, 64, 70);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// -------------------------------------------------------------------------------- the Surveyor
export interface Surveyor {
  root: THREE.Group;
  body: THREE.Group;
  lanternPivot: THREE.Group;
  lanternLightAnchor: THREE.Object3D;
  glass: THREE.MeshStandardMaterial;
  update(time: number, dt: number, speed: number, yaw: number, effects: boolean, squash: number): void;
  dispose(): void;
}

export function buildSurveyor(m: MaterialBank): Surveyor {
  const geos: THREE.BufferGeometry[] = [];
  const g = <T extends THREE.BufferGeometry>(x: T): T => {
    geos.push(x);
    return x;
  };
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  // cloak: a lathed bell, slightly flared at the hem
  const prof: THREE.Vector2[] = [
    [0.0, 0.0],
    [0.19, 0.0],
    [0.205, 0.03],
    [0.18, 0.14],
    [0.15, 0.27],
    [0.12, 0.38],
    [0.095, 0.46],
    [0.06, 0.5],
    [0.0, 0.51],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const cloak = shadowed(new THREE.Mesh(g(new THREE.LatheGeometry(prof, 28)), m.cloak));
  body.add(cloak);
  // head (porcelain) and hood
  const head = shadowed(new THREE.Mesh(g(new THREE.SphereGeometry(0.085, 20, 16)), m.porcelain));
  head.position.set(0, 0.575, 0.012);
  body.add(head);
  const hood = shadowed(new THREE.Mesh(g(new THREE.SphereGeometry(0.105, 20, 14, Math.PI * 0.18, Math.PI * 1.64, 0, Math.PI * 0.62)), m.cloak));
  hood.material = m.cloak;
  hood.position.set(0, 0.565, -0.008);
  hood.rotation.y = Math.PI;
  body.add(hood);
  const hoodTip = shadowed(new THREE.Mesh(g(new THREE.ConeGeometry(0.05, 0.12, 14)), m.cloak));
  hoodTip.position.set(0, 0.66, -0.05);
  hoodTip.rotation.x = -0.7;
  body.add(hoodTip);
  // eyes: two faint warm points so the figure reads as facing somewhere
  const eyeGeo = g(new THREE.SphereGeometry(0.011, 8, 6));
  for (const sx of [-0.03, 0.03]) {
    const e = new THREE.Mesh(eyeGeo, m.flame);
    e.position.set(sx, 0.585, 0.09);
    body.add(e);
  }
  // arm reaching to the lantern on the right side
  const arm = shadowed(new THREE.Mesh(g(new THREE.CylinderGeometry(0.03, 0.038, 0.24, 10)), m.cloak));
  arm.position.set(0.15, 0.38, 0.06);
  arm.rotation.set(0.55, 0, 0.55);
  body.add(arm);
  // lantern on a bail, hanging from the hand
  const lanternPivot = new THREE.Group();
  lanternPivot.position.set(0.22, 0.3, 0.13);
  body.add(lanternPivot);
  const lantern = new THREE.Group();
  lantern.position.y = -0.03;
  lanternPivot.add(lantern);
  const bail = new THREE.Mesh(g(new THREE.TorusGeometry(0.035, 0.005, 6, 16, Math.PI)), m.brass);
  bail.position.y = -0.005;
  lantern.add(bail);
  const cap = new THREE.Mesh(g(new THREE.ConeGeometry(0.05, 0.04, 8)), m.brass);
  cap.position.y = -0.03;
  lantern.add(cap);
  const glass = m.glassWarm.clone();
  const glassMesh = new THREE.Mesh(g(new THREE.CylinderGeometry(0.036, 0.036, 0.075, 12)), glass);
  glassMesh.position.y = -0.088;
  lantern.add(glassMesh);
  const postGeo = g(new THREE.CylinderGeometry(0.005, 0.005, 0.08, 5));
  for (let i = 0; i < 4; i++) {
    const p = new THREE.Mesh(postGeo, m.brass);
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    p.position.set(Math.cos(a) * 0.04, -0.088, Math.sin(a) * 0.04);
    lantern.add(p);
  }
  const base = new THREE.Mesh(g(new THREE.CylinderGeometry(0.045, 0.05, 0.016, 12)), m.brass);
  base.position.y = -0.132;
  lantern.add(base);
  const flame = new THREE.Mesh(g(new THREE.SphereGeometry(0.014, 8, 8)), m.flame);
  flame.position.y = -0.09;
  flame.scale.y = 1.6;
  lantern.add(flame);
  const lanternLightAnchor = new THREE.Object3D();
  lanternLightAnchor.position.set(0, -0.09, 0);
  lantern.add(lanternLightAnchor);

  let phase = 0;
  let curYaw = 0;
  let swing = 0;
  let swingV = 0;
  return {
    root,
    body,
    lanternPivot,
    lanternLightAnchor,
    glass,
    update(time, dt, speed, yaw, effects, squash) {
      // turn toward the move direction (shortest way round)
      let d = yaw - curYaw;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      curYaw += d * (1 - Math.exp(-dt * 18));
      body.rotation.y = curYaw;
      // walking bob: two footfalls per cell
      phase += speed * dt * Math.PI * 2;
      const amp = Math.min(1, speed * 0.6);
      const bob = effects ? Math.abs(Math.sin(phase)) * 0.028 * amp : 0;
      body.position.y = bob;
      body.rotation.z = effects ? Math.sin(phase) * 0.05 * amp : 0;
      body.scale.set(1 + squash * 0.06, 1 - squash * 0.06, 1 + squash * 0.06);
      // lantern swings like a damped pendulum, kicked by turning and walking
      const kick = -d * 2.2 + (effects ? Math.cos(phase) * amp * 0.6 : 0);
      swingV += (-swing * 40 - swingV * 4 + kick * 6) * dt;
      swing += swingV * dt;
      if (!effects) swing = 0;
      lanternPivot.rotation.x = swing * 0.5;
      lanternPivot.rotation.z = swing * 0.35;
      // the flame breathes
      const fl = effects ? 0.93 + 0.07 * Math.sin(time * 13.1) * Math.sin(time * 7.3 + 1.2) : 1;
      glass.emissiveIntensity = 2.6 * fl;
      flame.scale.set(1, 1.6 * (0.9 + 0.1 * fl), 1);
    },
    dispose: () => {
      for (const x of geos) x.dispose();
      glass.dispose();
    },
  };
}

// -------------------------------------------------------------------------------- objects
export function buildProp(o: GObj, m: MaterialBank, t: TextureBank, transmission: boolean): Prop {
  switch (o.kind) {
    case 'crystal':
      return crystal(o, t, transmission);
    case 'shard':
      return note(o, m, t);
    case 'exit':
      return gate(o, m, transmission);
    case 'portal':
      return portal(o, m);
    case 'lever':
      return lever(o, m, t);
    case 'switch':
      return toggle(o, m);
    case 'plate':
      return plate(o, m);
    default:
      return door(o, m);
  }
}

function glintSprite(t: TextureBank, color: number): [THREE.Sprite, THREE.SpriteMaterial] {
  const mat = new THREE.SpriteMaterial({ map: t.glint, color, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0 });
  const s = new THREE.Sprite(mat);
  s.scale.set(0.34, 0.34, 1);
  return [s, mat];
}

function crystal(o: GObj, t: TextureBank, transmission: boolean): Prop {
  const root = new THREE.Group();
  const spin = new THREE.Group();
  spin.position.y = 0.46;
  root.add(spin);
  const geo = new THREE.OctahedronGeometry(1, 0);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xf0b45a,
    emissive: new THREE.Color(0xd08a2a),
    emissiveIntensity: 0.55,
    roughness: 0.08,
    metalness: 0,
    clearcoat: 1,
    ior: 1.55,
    transmission: transmission ? 0.65 : 0,
    thickness: 0.25,
    flatShading: true,
  });
  const gem = shadowed(new THREE.Mesh(geo, mat));
  gem.scale.set(0.13, 0.24, 0.13);
  spin.add(gem);
  const coreMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.72, 0.32).multiplyScalar(2.2) });
  const core = new THREE.Mesh(geo, coreMat);
  core.scale.set(0.045, 0.085, 0.045);
  spin.add(core);
  const [gl, glMat] = glintSprite(t, 0xffe2a8);
  gl.position.set(0.05, 0.62, 0.06);
  root.add(gl);
  let gone = 0;
  return {
    obj: o,
    mount: 'gravity',
    root,
    focusY: 0.46,
    update(c) {
      const bob = c.effects ? Math.sin(c.time * 1.8 + o.id) * 0.035 : 0;
      spin.position.y = 0.46 + bob + gone * 0.3;
      spin.rotation.y += c.effects ? c.dt * 0.8 : 0;
      gone = c.active ? Math.min(1, gone + c.dt / 0.45) : 0;
      const s = 1 - ease(gone);
      spin.scale.setScalar(Math.max(0.0001, s));
      spin.visible = s > 0.001;
      mat.emissiveIntensity = (c.highlighted ? 0.9 : 0.55) + gone * 2;
      const ph = (c.time * 0.35 + o.id * 0.37) % 1;
      glMat.opacity = c.active ? 0 : ph < 0.08 ? Math.sin((ph / 0.08) * Math.PI) * 0.9 : 0;
      gl.material.rotation = c.time * 0.5;
    },
    trigger() {},
    dispose: disposer([geo, mat, coreMat, glMat]),
  };
}

function note(o: GObj, m: MaterialBank, t: TextureBank): Prop {
  const root = new THREE.Group();
  const holder = new THREE.Group();
  holder.position.y = 0.42;
  root.add(holder);
  const geo = new THREE.PlaneGeometry(0.2, 0.26);
  const left = shadowed(new THREE.Mesh(geo, m.paper));
  left.position.x = -0.045;
  left.rotation.y = 0.5;
  const right = shadowed(new THREE.Mesh(geo, m.paper));
  right.position.x = 0.045;
  right.rotation.y = -0.5;
  holder.add(left, right);
  const [gl, glMat] = glintSprite(t, 0xe8f0ff);
  gl.position.set(0.04, 0.6, 0.05);
  root.add(gl);
  let gone = 0;
  return {
    obj: o,
    mount: 'gravity',
    root,
    focusY: 0.42,
    update(c) {
      gone = c.active ? Math.min(1, gone + c.dt / 0.5) : 0;
      holder.position.y = 0.42 + (c.effects ? Math.sin(c.time * 1.3 + 2) * 0.03 : 0) + ease(gone) * 0.5;
      holder.rotation.y = c.effects ? Math.sin(c.time * 0.6) * 0.5 : 0.3;
      const fold = 0.5 + ease(gone) * 1.0;
      left.rotation.y = fold;
      right.rotation.y = -fold;
      holder.visible = gone < 1;
      const ph = (c.time * 0.3 + 0.5) % 1;
      glMat.opacity = c.active ? 0 : ph < 0.1 ? Math.sin((ph / 0.1) * Math.PI) * 0.8 : 0;
    },
    trigger() {},
    dispose: disposer([geo, glMat]),
  };
}

function gate(o: GObj, m: MaterialBank, transmission: boolean): Prop {
  const root = new THREE.Group();
  const ringGeo = new THREE.TorusGeometry(0.36, 0.032, 12, 48);
  const innerGeo = new THREE.TorusGeometry(0.27, 0.014, 8, 40);
  const discGeo = new THREE.CircleGeometry(0.34, 40);
  const plinthGeo = new THREE.CylinderGeometry(0.26, 0.3, 0.05, 28);
  const barGeo = new THREE.BoxGeometry(0.62, 0.04, 0.04);
  const ring = shadowed(new THREE.Mesh(ringGeo, m.brass));
  ring.position.y = 0.46;
  const inner = shadowed(new THREE.Mesh(innerGeo, m.brass));
  inner.position.y = 0.46;
  const panel = m.frosted.clone();
  panel.transmission = transmission ? 0.85 : 0;
  const disc = new THREE.Mesh(discGeo, panel);
  disc.position.y = 0.46;
  const plinth = shadowed(new THREE.Mesh(plinthGeo, m.darkBrass));
  plinth.position.y = 0.025;
  const bar = shadowed(new THREE.Mesh(barGeo, m.brass));
  bar.position.set(0, 0.46, 0.04);
  root.add(ring, inner, disc, plinth, bar);
  let open = 0;
  return {
    obj: o,
    mount: 'gravity',
    root,
    focusY: 0.46,
    update(c) {
      open += ((c.active ? 1 : 0) - open) * (1 - Math.exp(-c.dt * 6));
      bar.visible = open < 0.5;
      bar.scale.x = 1 - open;
      const pulse = c.effects ? 0.15 * Math.sin(c.time * 2.4) : 0;
      panel.emissiveIntensity = 0.05 + open * (1.25 + pulse);
      inner.rotation.z = c.effects ? c.time * 0.4 * open : 0;
    },
    trigger() {},
    dispose: disposer([ringGeo, innerGeo, discGeo, plinthGeo, barGeo, panel]),
  };
}

const PORTAL_VS = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const PORTAL_FS = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uStrength;
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  if (r > 1.0) discard;
  float a = atan(p.y, p.x + 1e-4);
  float swirl = noise(vec2(a * 2.0 + uTime * 0.6 + r * 4.0, r * 5.0 - uTime * 0.9));
  float bands = 0.5 + 0.5 * sin(r * 18.0 - uTime * 2.2 + swirl * 4.0);
  float rim = smoothstep(0.7, 1.0, r);
  float core = 1.0 - smoothstep(0.0, 0.9, r);
  float lum = (0.25 + 0.55 * swirl * bands) * (0.4 + 0.6 * core) + rim * 0.9;
  gl_FragColor = vec4(uColor * lum * uStrength, clamp((0.35 + 0.5 * lum) * (1.0 - smoothstep(0.92, 1.0, r)), 0.0, 1.0));
}`;
const SHAFT_FS = /* glsl */ `
uniform vec3 uColor;
uniform float uStrength;
uniform float uTime;
varying vec2 vUv;
void main() {
  float fade = pow(clamp(1.0 - vUv.y, 0.0, 1.0), 1.6);
  float flick = 0.85 + 0.15 * sin(uTime * 1.3 + vUv.x * 40.0);
  float edge = sin(vUv.x * 3.14159 * 2.0) * 0.5 + 0.5;
  gl_FragColor = vec4(uColor * uStrength * fade * flick * (0.55 + 0.45 * edge), 1.0);
}`;

function portal(o: GObj, m: MaterialBank): Prop {
  const root = new THREE.Group();
  const col = portalColor(o.ch);
  const ringGeo = new THREE.TorusGeometry(0.33, 0.03, 12, 48);
  const discGeo = new THREE.CircleGeometry(0.31, 48);
  const plinthGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.05, 24);
  const badgeGeo = new THREE.PlaneGeometry(0.12, 0.12);
  const shaftGeo = new THREE.CylinderGeometry(0.62, 0.3, 2.4, 32, 1, true);
  shaftGeo.translate(0, 1.2, 0);
  const strength = o.secret ? 0.35 : 1;
  const surf = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: col.clone().multiplyScalar(1.8) }, uStrength: { value: strength } },
    vertexShader: PORTAL_VS,
    fragmentShader: PORTAL_FS,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const shaft = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: col.clone().multiplyScalar(0.22) }, uStrength: { value: strength } },
    vertexShader: PORTAL_VS,
    fragmentShader: SHAFT_FS,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const ring = shadowed(new THREE.Mesh(ringGeo, o.secret ? m.darkBrass : m.brass));
  ring.position.y = 0.44;
  const disc = new THREE.Mesh(discGeo, surf);
  disc.position.y = 0.44;
  const plinth = shadowed(new THREE.Mesh(plinthGeo, m.darkBrass));
  plinth.position.y = 0.025;
  root.add(ring, disc, plinth);
  const shaftMesh = new THREE.Mesh(shaftGeo, shaft);
  shaftMesh.position.y = 0.05;
  root.add(shaftMesh);
  let badgeTex: THREE.CanvasTexture | null = null;
  let badgeMat: THREE.MeshStandardMaterial | null = null;
  if (!o.secret) {
    badgeTex = letterTexture(o.ch.toUpperCase());
    badgeMat = new THREE.MeshStandardMaterial({ map: badgeTex, metalness: 0.6, roughness: 0.45 });
    const badge = new THREE.Mesh(badgeGeo, badgeMat);
    badge.position.set(0, 0.055, 0.205);
    badge.rotation.x = -0.6;
    root.add(badge);
  }
  return {
    obj: o,
    mount: 'gravity',
    root,
    focusY: 0.44,
    update(c) {
      surf.uniforms.uTime.value = c.effects ? c.time : 0;
      shaft.uniforms.uTime.value = c.effects ? c.time : 0;
      disc.rotation.z = 0;
    },
    trigger() {},
    dispose: () => {
      disposer([ringGeo, discGeo, plinthGeo, badgeGeo, shaftGeo, surf, shaft, ...(badgeMat ? [badgeMat] : [])])();
      badgeTex?.dispose();
    },
  };
}

function lever(o: GObj, m: MaterialBank, t: TextureBank): Prop {
  const root = new THREE.Group();
  const baseGeo = new THREE.BoxGeometry(0.4, 0.05, 0.28);
  const plateGeo = new THREE.PlaneGeometry(0.13, 0.13);
  const hubGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.16, 16);
  const handleGeo = new THREE.CylinderGeometry(0.018, 0.022, 0.36, 10);
  handleGeo.translate(0, 0.18, 0);
  const knobGeo = new THREE.SphereGeometry(0.04, 14, 10);
  const base = shadowed(new THREE.Mesh(baseGeo, m.darkBrass));
  base.position.y = 0.025;
  const glyphMat = new THREE.MeshStandardMaterial({ map: t.glyphs[o.fold as FoldKind], metalness: 0.5, roughness: 0.5, emissive: new THREE.Color(0xc39645), emissiveMap: t.glyphs[o.fold as FoldKind], emissiveIntensity: 0.15 });
  const glyph = new THREE.Mesh(plateGeo, glyphMat);
  glyph.rotation.x = -Math.PI / 2;
  glyph.position.set(0.11, 0.052, 0.03);
  const hub = shadowed(new THREE.Mesh(hubGeo, m.brass));
  hub.rotation.z = Math.PI / 2;
  hub.position.set(-0.06, 0.08, 0);
  const arm = new THREE.Group();
  arm.position.set(-0.06, 0.08, 0);
  const handle = shadowed(new THREE.Mesh(handleGeo, m.wood));
  const knob = shadowed(new THREE.Mesh(knobGeo, m.brass));
  knob.position.y = 0.37;
  arm.add(handle, knob);
  root.add(base, glyph, hub, arm);
  let side = -1;
  let ang = -0.65;
  return {
    obj: o,
    mount: 'fixed',
    root,
    focusY: 0.2,
    update(c) {
      const target = side * 0.65;
      ang = c.effects ? ang + (target - ang) * (1 - Math.exp(-c.dt * 16)) : target;
      arm.rotation.x = ang;
      glyphMat.emissiveIntensity = c.highlighted ? 0.6 : 0.15;
    },
    trigger() {
      side = -side;
    },
    dispose: disposer([baseGeo, plateGeo, hubGeo, handleGeo, knobGeo, glyphMat]),
  };
}

function toggle(o: GObj, m: MaterialBank): Prop {
  const root = new THREE.Group();
  const postGeo = new THREE.BoxGeometry(0.2, 0.26, 0.14);
  const stickGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.16, 8);
  stickGeo.translate(0, 0.08, 0);
  const lampGeo = new THREE.SphereGeometry(0.03, 12, 10);
  const post = shadowed(new THREE.Mesh(postGeo, m.wood));
  post.position.y = 0.13;
  const face = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.02, 0.1), m.brass));
  face.position.y = 0.27;
  const stickPivot = new THREE.Group();
  stickPivot.position.set(0, 0.28, 0);
  const stick = shadowed(new THREE.Mesh(stickGeo, m.brass));
  stickPivot.add(stick);
  const lampMat = new THREE.MeshStandardMaterial({ color: 0x334048, emissive: new THREE.Color(COLORS.seam), emissiveIntensity: 0, roughness: 0.2 });
  const lamp = new THREE.Mesh(lampGeo, lampMat);
  lamp.position.set(0, 0.19, 0.075);
  root.add(post, face, stickPivot, lamp);
  let ang = -0.5;
  return {
    obj: o,
    mount: 'fixed',
    root,
    focusY: 0.25,
    update(c) {
      const target = c.active ? 0.5 : -0.5;
      ang = c.effects ? ang + (target - ang) * (1 - Math.exp(-c.dt * 20)) : target;
      stickPivot.rotation.x = ang;
      lampMat.emissiveIntensity = c.active ? 2.2 : c.highlighted ? 0.3 : 0.05;
    },
    trigger() {},
    dispose: disposer([postGeo, stickGeo, lampGeo, lampMat, face.geometry]),
  };
}

function plate(o: GObj, m: MaterialBank): Prop {
  const root = new THREE.Group();
  const discGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.045, 32);
  const rimGeo = new THREE.TorusGeometry(0.31, 0.018, 8, 40);
  const top = shadowed(new THREE.Mesh(discGeo, m.plateStone));
  const rimMat = new THREE.MeshStandardMaterial({ color: COLORS.brass, metalness: 1, roughness: 0.35, emissive: new THREE.Color(COLORS.seam), emissiveIntensity: 0 });
  const rim = shadowed(new THREE.Mesh(rimGeo, rimMat));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.02;
  root.add(top, rim);
  let sink = 0;
  return {
    obj: o,
    mount: 'fixed',
    root,
    focusY: 0.05,
    update(c) {
      const target = c.active ? 1 : 0;
      sink = c.effects ? sink + (target - sink) * (1 - Math.exp(-c.dt * 14)) : target;
      top.position.y = 0.03 - sink * 0.035;
      rimMat.emissiveIntensity = sink * 1.6;
    },
    trigger() {},
    dispose: disposer([discGeo, rimGeo, rimMat]),
  };
}

function door(o: GObj, m: MaterialBank): Prop {
  const root = new THREE.Group();
  const slab = new THREE.Group();
  root.add(slab);
  const boxGeo = new THREE.BoxGeometry(0.98, 0.98, 0.98);
  const body = shadowed(new THREE.Mesh(boxGeo, m.wood));
  slab.add(body);
  const seamMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(COLORS.seam).multiplyScalar(1.6) });
  const seamGeo = new THREE.BoxGeometry(0.03, 0.9, 0.03);
  const panelGeo = new THREE.PlaneGeometry(0.5, 0.5);
  const frost = m.frosted.clone();
  frost.emissiveIntensity = 0.25;
  for (const z of [0.5, -0.5]) {
    const s = new THREE.Mesh(seamGeo, seamMat);
    s.position.set(0, 0, z * 0.99);
    slab.add(s);
    const p = new THREE.Mesh(panelGeo, frost);
    p.position.set(0, 0, z * 1.002);
    if (z < 0) p.rotation.y = Math.PI;
    slab.add(p);
  }
  for (const x of [0.5, -0.5]) {
    const p = new THREE.Mesh(panelGeo, frost);
    p.position.set(x * 1.002, 0, 0);
    p.rotation.y = x > 0 ? Math.PI / 2 : -Math.PI / 2;
    slab.add(p);
  }
  return {
    obj: o,
    mount: 'cell',
    root,
    focusY: 0,
    update() {},
    trigger() {},
    dispose: disposer([boxGeo, seamMat, seamGeo, panelGeo, frost]),
  };
}

/** Doors slide into a neighbouring solid cell: returns the slab group to move. */
export function doorSlab(p: Prop): THREE.Object3D {
  return p.root.children[0];
}
