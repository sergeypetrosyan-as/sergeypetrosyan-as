import * as THREE from 'three';

/** Shared uniform so every animated material reads one clock. */
export const timeUniform = { value: 0 };

const HASH_GLSL = /* glsl */ `
float nvHash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float nvNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(nvHash(i), nvHash(i + vec2(1.0, 0.0)), u.x),
             mix(nvHash(i + vec2(0.0, 1.0)), nvHash(i + vec2(1.0, 1.0)), u.x), u.y);
}
`;

/**
 * Instanced facade material. Windows, storefront glow, neon roof trims and
 * art-deco corner strips are computed from world position, so a single unit
 * cube instanced hundreds of times reads as distinct buildings in one draw call.
 * Per-instance data: `instanceColor` (wall tint), `aSeed`, `aAccent` (neon colour).
 */
export function createBuildingMaterial(): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, metalness: 0.15, envMapIntensity: 0.35 });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = timeUniform;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
attribute float aSeed;
attribute vec3 aAccent;
varying vec3 vNvPos;
varying vec3 vNvNormal;
varying vec3 vNvLocal;
varying vec3 vNvAccent;
varying float vNvSeed;
varying float vNvHeight;
varying float vNvBase;`,
      )
      .replace(
        '#include <project_vertex>',
        `#include <project_vertex>
mat4 nvM = modelMatrix * instanceMatrix;
vNvPos = (nvM * vec4(transformed, 1.0)).xyz;
vNvNormal = normalize(mat3(nvM) * objectNormal);
vNvLocal = position;
vNvAccent = aAccent;
vNvSeed = aSeed;
vNvBase = (nvM * vec4(0.0, 0.0, 0.0, 1.0)).y;
vNvHeight = vNvBase + length(nvM[1].xyz);`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
uniform float uTime;
varying vec3 vNvPos;
varying vec3 vNvNormal;
varying vec3 vNvLocal;
varying vec3 vNvAccent;
varying float vNvSeed;
varying float vNvHeight;
varying float vNvBase;
${HASH_GLSL}`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
{
  float side = 1.0 - step(0.55, abs(vNvNormal.y));
  bool xFace = abs(vNvNormal.x) > 0.5;
  vec2 wuv = vec2(xFace ? vNvPos.z : vNvPos.x, vNvPos.y);
  float face = xFace ? sign(vNvNormal.x) : 2.0 + sign(vNvNormal.z);
  vec2 g = wuv / vec2(2.1, 3.3);
  vec2 cell = floor(g);
  vec2 f = fract(g);
  vec2 fw = fwidth(g);
  float aaFade = clamp(1.0 - max(fw.x, fw.y) * 1.6, 0.0, 1.0);
  float wx = smoothstep(0.16, 0.16 + fw.x + 0.01, f.x) * (1.0 - smoothstep(0.84 - fw.x - 0.01, 0.84, f.x));
  float wy = smoothstep(0.22, 0.22 + fw.y + 0.01, f.y) * (1.0 - smoothstep(0.78 - fw.y - 0.01, 0.78, f.y));
  float win = wx * wy;
  float zone = side * step(vNvBase + 4.2, vNvPos.y) * step(vNvPos.y, vNvHeight - 1.3);
  float h = nvHash(cell + vec2(vNvSeed * 31.7, face * 7.3));
  float density = 0.22 + 0.4 * fract(vNvSeed * 13.1);
  float lit = step(1.0 - density, h);
  float h2 = nvHash(cell.yx + vNvSeed * 3.1);
  vec3 wcol = h2 < 0.55 ? vec3(1.0, 0.68, 0.38) : (h2 < 0.82 ? vec3(0.4, 0.82, 1.0) : vec3(1.0, 0.4, 0.85));
  float flick = 0.82 + 0.18 * sin(uTime * (1.5 + h * 5.0) + h * 40.0);
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.015, 0.02, 0.045), zone * win * 0.9 * aaFade);
  totalEmissiveRadiance += zone * mix(wcol * density * 0.28, wcol * lit * win * flick * 1.5, aaFade);
  float shopY = vNvPos.y - vNvBase;
  float shop = side * step(vNvBase, 0.5) * smoothstep(0.5, 0.8, shopY) * (1.0 - smoothstep(2.9, 3.2, shopY));
  float shopPattern = step(0.35, fract(wuv.x * 0.18 + vNvSeed * 5.0));
  totalEmissiveRadiance += vNvAccent * shop * shopPattern * 0.45;
  float topBand = side * smoothstep(vNvHeight - 0.95, vNvHeight - 0.8, vNvPos.y) * (1.0 - smoothstep(vNvHeight - 0.5, vNvHeight - 0.35, vNvPos.y));
  float midBand = side * step(vNvBase, 0.5) * smoothstep(3.55, 3.65, shopY) * (1.0 - smoothstep(3.8, 3.9, shopY));
  float edge = xFace ? abs(vNvLocal.z) : abs(vNvLocal.x);
  float cornerOn = step(0.45, fract(vNvSeed * 7.77));
  float corner = side * cornerOn * smoothstep(0.475, 0.488, edge) * step(vNvBase + 4.0, vNvPos.y);
  float pulse = 0.82 + 0.18 * sin(uTime * 1.3 + vNvSeed * 20.0);
  totalEmissiveRadiance += vNvAccent * (topBand * 2.4 + midBand * 1.5 + corner * 1.5) * pulse;
}`,
      );
  };
  mat.customProgramCacheKey = () => 'nv-building';
  return mat;
}

export interface RoadLayout {
  xs: number[];
  zs: number[];
  halfWidth: number;
  sidewalk: number;
}

/**
 * Ground plane: asphalt, lane markings, crosswalks, sidewalks, promenade and
 * beach are derived procedurally from the road layout. Puddle noise lowers the
 * roughness so the environment map paints wet neon reflections onto the street.
 */
export function createGroundMaterial(layout: RoadLayout): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, metalness: 0.2, envMapIntensity: 1.25 });
  const xs = new Float32Array(5).fill(9999);
  const zs = new Float32Array(5).fill(9999);
  layout.xs.forEach((v, i) => (xs[i] = v));
  layout.zs.forEach((v, i) => (zs[i] = v));
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uRoadX = { value: xs };
    shader.uniforms.uRoadZ = { value: zs };
    shader.uniforms.uHalf = { value: layout.halfWidth };
    shader.uniforms.uWalk = { value: layout.sidewalk };
    shader.uniforms.uTime = timeUniform;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vGPos;`)
      .replace('#include <project_vertex>', `#include <project_vertex>\nvGPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`);
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
uniform float uRoadX[5];
uniform float uRoadZ[5];
uniform float uHalf;
uniform float uWalk;
uniform float uTime;
varying vec3 vGPos;
${HASH_GLSL}
float gRoad; float gWalk; float gMark; float gWet; float gBeach; float gPromenade;
void nvGround(vec2 p) {
  float dx = 1e4; float cx = 0.0;
  float dz = 1e4; float cz = 0.0;
  for (int i = 0; i < 5; i++) {
    float a = abs(p.x - uRoadX[i]); if (a < dx) { dx = a; cx = p.x - uRoadX[i]; }
    float b = abs(p.y - uRoadZ[i]); if (b < dz) { dz = b; cz = p.y - uRoadZ[i]; }
  }
  bool inside = abs(p.y) < 107.0 && p.x > -107.0 && p.x < 107.0;
  float vr = (dx < uHalf && inside) ? 1.0 : 0.0;
  float hr = (dz < uHalf && inside) ? 1.0 : 0.0;
  gRoad = max(vr, hr);
  float walkBand = (dx < uHalf + uWalk || dz < uHalf + uWalk) ? 1.0 : 0.0;
  gWalk = (1.0 - gRoad) * walkBand * (inside ? 1.0 : 0.0);
  gPromenade = (p.x >= 107.0 && p.x < 113.0 && abs(p.y) < 112.0) ? 1.0 : 0.0;
  gBeach = p.x >= 113.0 ? 1.0 : 0.0;
  // lane markings
  float m = 0.0;
  float inter = vr * hr;
  if (vr > 0.5 && inter < 0.5) {
    float o = abs(cx);
    m += step(o, 0.32) * step(0.12, o) * 1.0;                                  // double yellow
    m += step(abs(o - 3.5), 0.1) * step(fract(p.y / 6.0), 0.5) * 2.0;          // dashed lanes
    m += step(abs(o - 6.6), 0.1) * 2.0;                                        // edge line
    float cw = step(uHalf + 0.2, dz) * step(dz, uHalf + 3.2);
    m = mix(m, 2.0 * step(fract(p.x / 1.3), 0.55) * step(o, uHalf - 0.6), cw); // crosswalk
  }
  if (hr > 0.5 && inter < 0.5) {
    float o = abs(cz);
    m += step(o, 0.32) * step(0.12, o) * 1.0;
    m += step(abs(o - 3.5), 0.1) * step(fract(p.x / 6.0), 0.5) * 2.0;
    m += step(abs(o - 6.6), 0.1) * 2.0;
    float cw = step(uHalf + 0.2, dx) * step(dx, uHalf + 3.2);
    m = mix(m, 2.0 * step(fract(p.y / 1.3), 0.55) * step(o, uHalf - 0.6), cw);
  }
  gMark = m;
  float n = nvNoise(p * 0.11) * 0.65 + nvNoise(p * 0.37) * 0.35;
  gWet = smoothstep(0.48, 0.62, n);
}`,
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
nvGround(vGPos.xz);
{
  vec2 p = vGPos.xz;
  vec3 asphalt = vec3(0.028, 0.026, 0.04) * (0.85 + 0.3 * nvNoise(p * 2.7));
  vec2 tile = fract(p / 1.5);
  float grout = step(0.94, max(tile.x, tile.y));
  vec3 walk = vec3(0.1, 0.085, 0.12) * (1.0 - grout * 0.45);
  vec3 lot = vec3(0.05, 0.045, 0.065) * (0.9 + 0.2 * nvNoise(p * 1.3));
  vec2 pt = fract(p / 2.4);
  vec3 prom = mix(vec3(0.2, 0.09, 0.15), vec3(0.12, 0.06, 0.12), step(0.5, fract((floor(p.x/2.4) + floor(p.y/2.4)) * 0.5)));
  prom *= 1.0 - step(0.95, max(pt.x, pt.y)) * 0.4;
  vec3 sand = vec3(0.32, 0.2, 0.2) * (0.85 + 0.3 * nvNoise(p * 3.0));
  vec3 c = lot;
  c = mix(c, walk, gWalk);
  c = mix(c, asphalt, gRoad);
  c = mix(c, prom, gPromenade);
  c = mix(c, sand, gBeach);
  vec3 markCol = gMark > 1.5 ? vec3(0.75, 0.75, 0.8) : vec3(0.9, 0.62, 0.08);
  c = mix(c, markCol, step(0.5, gMark) * gRoad);
  diffuseColor.rgb = c * (1.0 - gWet * 0.35 * gRoad);
}`,
      )
      .replace(
        '#include <roughnessmap_fragment>',
        `#include <roughnessmap_fragment>
roughnessFactor = mix(0.82, 0.5, gRoad);
roughnessFactor = mix(roughnessFactor, 0.07, gWet * (gRoad + gWalk * 0.6 + gPromenade * 0.5));
roughnessFactor = mix(roughnessFactor, 0.95, gBeach);`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
totalEmissiveRadiance += step(0.5, gMark) * gRoad * (gMark > 1.5 ? vec3(0.05, 0.05, 0.07) : vec3(0.09, 0.05, 0.0));`,
      );
  };
  mat.customProgramCacheKey = () => 'nv-ground';
  return mat;
}

/** Radial gradient used for fake light pools, underglow and neon reflections. */
export function createGlowTexture(size = 128): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  grad.addColorStop(0.6, 'rgba(255,255,255,0.12)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Vertically stretched streak — a cheap stand-in for a neon sign's reflection in wet asphalt. */
export function createStreakTexture(): THREE.Texture {
  const w = 64, h = 256;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  const img = g.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = (x / (w - 1)) * 2 - 1;
      const ny = y / (h - 1);
      const across = Math.exp(-nx * nx * 6);
      const along = Math.pow(1 - ny, 1.6) * (0.75 + 0.25 * Math.sin(ny * 60 + x * 0.3));
      const a = Math.max(0, across * along);
      const i = (y * w + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
      img.data[i + 3] = Math.round(a * 255);
    }
  }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function additive(color: THREE.ColorRepresentation, map: THREE.Texture | null, opacity = 1): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color,
    map,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
    fog: true,
  });
}

/** Canvas text texture for neon signs: tube glow + bright core. */
export function createNeonSignTexture(text: string, color: string, opts: { font?: string; width?: number; height?: number; sub?: string } = {}): THREE.Texture {
  const w = opts.width ?? 512, h = opts.height ?? 128;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  g.clearRect(0, 0, w, h);
  const size = Math.floor(h * (opts.sub ? 0.5 : 0.62));
  g.font = opts.font ?? `700 ${size}px "Trebuchet MS", "Segoe UI", sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  const y = opts.sub ? h * 0.4 : h / 2;
  g.shadowColor = color;
  g.lineJoin = 'round';
  for (const blur of [h * 0.28, h * 0.14]) {
    g.shadowBlur = blur;
    g.strokeStyle = color;
    g.lineWidth = h * 0.05;
    g.strokeText(text, w / 2, y);
  }
  g.shadowBlur = h * 0.06;
  g.fillStyle = '#ffffff';
  g.fillText(text, w / 2, y);
  if (opts.sub) {
    g.font = `600 ${Math.floor(h * 0.2)}px "Trebuchet MS", "Segoe UI", sans-serif`;
    g.shadowBlur = h * 0.1;
    g.fillStyle = color;
    g.fillText(opts.sub, w / 2, h * 0.8);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}
