// Logical vision cones as floor decals: the exact polygon the simulation uses (rays clipped by sight
// blockers), with distance fade, state pattern and state-specific edges so they read without colour.
import * as THREE from 'three';
import type { World } from '../../sim/types.ts';
import { blocksSight } from '../../sim/grid.ts';

export const RAYS = 36;

const VERT = /* glsl */`
attribute float aR;
attribute float aT;
attribute float aRim;
varying float vR;
varying float vT;
varying float vRim;
varying vec2 vW;
void main() {
  vR = aR; vT = aT; vRim = aRim;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vW = wp.xz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

const FRAG = /* glsl */`
uniform vec3 uColor;
uniform float uFill;
uniform float uEdgeA;
uniform float uPattern;   // 0 none, 1 diagonal, 2 cross, 3 dots
uniform float uEdgeStyle; // 0 solid thin, 1 dashed, 2 solid thick, 3 dotted
uniform float uRange;
uniform float uFov;
uniform float uShadowR;
uniform float uLight;     // additive soft light mode (Low quality)
varying float vR;
varying float vT;
varying float vRim;
varying vec2 vW;
void main() {
  float dist = vR * uRange;
  if (uLight > 0.5) {
    float fall = pow(1.0 - clamp(vR, 0.0, 1.0), 1.3);
    float side = smoothstep(0.0, 0.12, min(vT, 1.0 - vT));
    gl_FragColor = vec4(uColor * fall * side * 0.55, 1.0);
    return;
  }
  float fade = mix(1.0, 0.25, vR);
  float a = uFill * fade;
  float pat = 0.0;
  vec2 p = vW * 3.2;
  if (uPattern > 0.5 && uPattern < 1.5) pat = step(0.72, fract(p.x + p.y));
  else if (uPattern > 1.5 && uPattern < 2.5) pat = max(step(0.78, fract(p.x + p.y)), step(0.78, fract(p.x - p.y)));
  else if (uPattern > 2.5) pat = step(length(fract(p) - 0.5), 0.13);
  a += pat * 0.1 * fade;
  // side edges (angular), measured in world units
  float sideW = min(vT, 1.0 - vT) * uFov * max(dist, 0.001);
  float thick = uEdgeStyle > 1.5 && uEdgeStyle < 2.5 ? 0.075 : 0.04;
  float edge = 1.0 - smoothstep(thick * 0.6, thick, sideW);
  float rimDist = (1.0 - vRim) * dist / max(vRim, 0.01);
  float rim = 1.0 - smoothstep(0.025, 0.05, rimDist);
  edge = max(edge, rim * 0.8);
  if (uEdgeStyle > 0.5 && uEdgeStyle < 1.5) edge *= step(0.45, fract(dist * 2.4 + vT * 6.0));
  if (uEdgeStyle > 2.5) edge *= step(0.6, fract(dist * 4.0 + vT * 12.0));
  // dotted arc at the shadow sight range
  float arc = (1.0 - smoothstep(0.015, 0.035, abs(dist - uShadowR))) * step(0.5, fract(vT * 18.0));
  a = max(a, edge * uEdgeA);
  a = max(a, arc * uEdgeA * 0.6);
  gl_FragColor = vec4(uColor, a);
}
`;

export interface ConeStyle { color: THREE.Color; fill: number; edge: number; pattern: number; edgeStyle: number }

export class ConeDecal {
  readonly mesh: THREE.Mesh;
  readonly light: THREE.Mesh;
  readonly mat: THREE.ShaderMaterial;
  readonly lightMat: THREE.ShaderMaterial;
  private pos: Float32Array;
  private r: Float32Array;
  private rim: Float32Array;
  private geo: THREE.BufferGeometry;

  constructor() {
    const n = RAYS + 2;
    this.pos = new Float32Array(n * 3);
    this.r = new Float32Array(n);
    this.rim = new Float32Array(n);
    const t = new Float32Array(n);
    t[0] = 0.5;
    for (let i = 0; i <= RAYS; i++) { t[i + 1] = i / RAYS; this.rim[i + 1] = 1; }
    const idx: number[] = [];
    for (let i = 1; i <= RAYS; i++) idx.push(0, i + 1, i);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aR', new THREE.BufferAttribute(this.r, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aT', new THREE.BufferAttribute(t, 1));
    g.setAttribute('aRim', new THREE.BufferAttribute(this.rim, 1));
    g.setIndex(idx);
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e4);
    this.geo = g;
    const uniforms = (): Record<string, THREE.IUniform> => ({
      uColor: { value: new THREE.Color(1, 1, 1) }, uFill: { value: 0.1 }, uEdgeA: { value: 0.5 }, uPattern: { value: 0 }, uEdgeStyle: { value: 0 },
      uRange: { value: 7 }, uFov: { value: 1.2 }, uShadowR: { value: 2.8 }, uLight: { value: 0 },
    });
    this.mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms(), transparent: true, depthWrite: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    this.lightMat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms(), transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
    this.lightMat.uniforms.uLight.value = 1;
    this.mesh = new THREE.Mesh(g, this.mat);
    this.mesh.renderOrder = 3;
    this.mesh.frustumCulled = false;
    this.light = new THREE.Mesh(g, this.lightMat);
    this.light.renderOrder = 2;
    this.light.frustumCulled = false;
  }

  /** Rebuild the polygon exactly like the simulation's sight test (step 0.12 along each ray). */
  update(w: World, x: number, y: number, dir: number, fov: number, range: number, shadowR: number, style: ConeStyle, lightCol: THREE.Color | null): void {
    const P = this.pos;
    P[0] = x; P[1] = 0.025; P[2] = y;
    this.r[0] = 0;
    for (let i = 0; i <= RAYS; i++) {
      const a = dir - fov / 2 + (fov * i) / RAYS;
      const cx = Math.cos(a), cy = Math.sin(a);
      let d = 0;
      for (; d < range; d += 0.12) if (blocksSight(w, Math.floor(x + cx * d), Math.floor(y + cy * d))) break;
      d = Math.min(d, range);
      const j = (i + 1) * 3;
      P[j] = x + cx * d; P[j + 1] = 0.025; P[j + 2] = y + cy * d;
      this.r[i + 1] = d / range;
    }
    (this.geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.attributes.aR as THREE.BufferAttribute).needsUpdate = true;
    const u = this.mat.uniforms;
    u.uColor.value.copy(style.color);
    u.uFill.value = style.fill; u.uEdgeA.value = style.edge; u.uPattern.value = style.pattern; u.uEdgeStyle.value = style.edgeStyle;
    u.uRange.value = range; u.uFov.value = fov; u.uShadowR.value = shadowR;
    if (lightCol) {
      const l = this.lightMat.uniforms;
      l.uColor.value.copy(lightCol); l.uRange.value = range; l.uFov.value = fov;
    }
  }

  dispose(): void { this.geo.dispose(); this.mat.dispose(); this.lightMat.dispose(); }
}
