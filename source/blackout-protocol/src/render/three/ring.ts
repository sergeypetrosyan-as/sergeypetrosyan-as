// One flexible floor-ring shader: visibility ring (solid / dashed / rays), hack focus (dashed, rotating),
// decoy countdown (progress arc) and noise rings.
import * as THREE from 'three';

const VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }';
const FRAG = /* glsl */`
uniform vec3 uColor;
uniform float uAlpha;
uniform float uR0;
uniform float uR1;
uniform float uDashN;
uniform float uRot;
uniform float uProg;
uniform float uRays;
varying vec2 vUv;
const float TAU = 6.2831853;
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  float a = atan(p.y, p.x) / TAU + 0.5;
  float aa = fwidth(r) * 1.2;
  float ring = smoothstep(uR0 - aa, uR0 + aa, r) * (1.0 - smoothstep(uR1 - aa, uR1 + aa, r));
  if (uDashN > 0.5) ring *= step(0.45, fract(a * uDashN + uRot));
  if (uProg < 0.999) ring *= step(a, uProg);
  float rays = 0.0;
  if (uRays > 0.5) {
    float t = fract(a * uRays + 0.125 * step(1.5, uRays) * step(uRays, 2.5));
    float d0 = min(t, 1.0 - t) * TAU / uRays * r;
    rays = (1.0 - smoothstep(0.018, 0.03, d0)) * step(uR1 + 0.1, r) * (1.0 - step(0.97, r));
  }
  float v = max(ring, rays);
  if (v < 0.01) discard;
  gl_FragColor = vec4(uColor, v * uAlpha);
}
`;

export function ringMaterial(additive = false): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    uniforms: {
      uColor: { value: new THREE.Color(1, 1, 1) }, uAlpha: { value: 1 }, uR0: { value: 0.55 }, uR1: { value: 0.62 },
      uDashN: { value: 0 }, uRot: { value: 0 }, uProg: { value: 1 }, uRays: { value: 0 },
    },
  });
}

export function ringMesh(size: number, mat: THREE.ShaderMaterial, geo: THREE.PlaneGeometry): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.scale.setScalar(size);
  m.renderOrder = 4;
  m.frustumCulled = false;
  return m;
}

export function flatPlane(): THREE.PlaneGeometry {
  return new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2) as THREE.PlaneGeometry;
}
