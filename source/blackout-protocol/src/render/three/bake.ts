// Baked fixture light field + shader patch shared by every static material.
// Fluorescent fixtures hang only over lit tiles. Their light is integrated once per mission into a
// texture covering the map (per-texel falloff with wall occlusion), and shadow tiles are masked so
// they really are dark. Materials sample the field by world position, so walls, props and floor agree.
import * as THREE from 'three';
import type { World } from '../../sim/types.ts';
import { T_LOCKER, T_SHADOW, T_WALL } from '../../sim/types.ts';
import { kindAt } from '../../sim/grid.ts';
import { hash2 } from './textures.ts';

export const WALL_H = 1.25;
export const FIXTURE_H = 1.42;
export const MAX_BEACONS = 8;
const FIX_R = 4.6;
const SHADOW_MASK = 0.06;

export interface Fixture { x: number; y: number; horiz: boolean; warm: boolean }

export interface BakeUniforms {
  uBake: { value: THREE.Texture | null };
  uBeaconIdx: { value: THREE.Texture | null };
  uBakeSize: { value: THREE.Vector2 };
  uBakeGain: { value: number };
  uAlert: { value: number };
  uAlertCol: { value: THREE.Color };
  uBeacons: { value: THREE.Vector3[] };
  uSweep: { value: number };
  uTime: { value: number };
  uCut: { value: THREE.Vector3 };
  uCutOn: { value: number };
  uEmerg: { value: number };
}

export function makeBakeUniforms(): BakeUniforms {
  return {
    uBake: { value: null },
    uBeaconIdx: { value: null },
    uBakeSize: { value: new THREE.Vector2(1, 1) },
    uBakeGain: { value: 2.2 },
    uAlert: { value: 0 },
    uAlertCol: { value: new THREE.Color(1, 0.55, 0.15) },
    uBeacons: { value: Array.from({ length: MAX_BEACONS }, () => new THREE.Vector3(-999, -999, 0)) },
    uSweep: { value: 1 },
    uTime: { value: 0 },
    uCut: { value: new THREE.Vector3() },
    uCutOn: { value: 0 },
    uEmerg: { value: 0 },
  };
}

const isLitTile = (k: number): boolean => k !== T_WALL && k !== T_SHADOW && k !== T_LOCKER;
const blocksLight = (w: World, tx: number, ty: number): boolean => { const k = kindAt(w.map, tx, ty); return k === T_WALL || k === T_LOCKER; };

/** Tile DDA: true if no light-blocking tile strictly between the two points (end tile allowed). */
function clear(w: World, x0: number, y0: number, x1: number, y1: number): boolean {
  let tx = Math.floor(x0), ty = Math.floor(y0);
  const ex = Math.floor(x1), ey = Math.floor(y1);
  const dx = x1 - x0, dy = y1 - y0;
  const sx = dx > 0 ? 1 : -1, sy = dy > 0 ? 1 : -1;
  const tdx = dx === 0 ? Infinity : Math.abs(1 / dx);
  const tdy = dy === 0 ? Infinity : Math.abs(1 / dy);
  let tmx = dx === 0 ? Infinity : (sx > 0 ? tx + 1 - x0 : x0 - tx) * tdx;
  let tmy = dy === 0 ? Infinity : (sy > 0 ? ty + 1 - y0 : y0 - ty) * tdy;
  for (let n = 0; n < 64 && (tx !== ex || ty !== ey); n++) {
    if (tmx < tmy) { tmx += tdx; tx += sx; } else { tmy += tdy; ty += sy; }
    if (tx === ex && ty === ey) return true;
    if (blocksLight(w, tx, ty)) return false;
  }
  return true;
}

export function placeFixtures(w: World): Fixture[] {
  const out: Fixture[] = [];
  const W = w.map.w, H = w.map.h;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!isLitTile(kindAt(w.map, x, y))) continue;
    const cx = x + 0.5, cy = y + 0.5;
    if (out.some((f) => Math.hypot(f.x - cx, f.y - cy) < 3.4 && clear(w, f.x, f.y, cx, cy))) continue;
    // prefer to centre in a corridor: shift by half a tile when the neighbour below is lit and the one above is not
    let fx = cx, fy = cy;
    const lit = (dx: number, dy: number): boolean => isLitTile(kindAt(w.map, x + dx, y + dy));
    if (lit(0, 1) && !lit(0, -1)) fy += 0.5;
    if (lit(1, 0) && !lit(-1, 0)) fx += 0.5;
    const runH = (lit(-1, 0) ? 1 : 0) + (lit(1, 0) ? 1 : 0) + (lit(2, 0) ? 1 : 0);
    const runV = (lit(0, -1) ? 1 : 0) + (lit(0, 1) ? 1 : 0) + (lit(0, 2) ? 1 : 0);
    out.push({ x: fx, y: fy, horiz: runH >= runV, warm: hash2(x, y, 41) < 0.12 });
  }
  return out;
}

export interface BakeResult {
  light: THREE.DataTexture;
  beaconIdx: THREE.DataTexture;
  fixtures: Fixture[];
  beacons: { x: number; y: number; phase: number }[];
}

export function bakeLightField(w: World, res: number): BakeResult {
  const W = w.map.w, H = w.map.h;
  const fixtures = placeFixtures(w);
  const TW = W * res, TH = H * res;
  const acc = new Float32Array(TW * TH * 3);
  // bucket fixtures per tile for quick lookup
  const buckets: number[][] = Array.from({ length: W * H }, () => []);
  fixtures.forEach((f, i) => {
    const r = Math.ceil(FIX_R);
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const tx = Math.floor(f.x) + dx, ty = Math.floor(f.y) + dy;
      if (tx >= 0 && ty >= 0 && tx < W && ty < H) buckets[ty * W + tx].push(i);
    }
  });
  const h2 = FIXTURE_H * FIXTURE_H;
  for (let ty = 0; ty < H; ty++) for (let tx = 0; tx < W; tx++) {
    const k = kindAt(w.map, tx, ty);
    if (k === T_WALL) continue;
    const mask = isLitTile(k) ? 1 : SHADOW_MASK;
    const list = buckets[ty * W + tx];
    for (let sy = 0; sy < res; sy++) for (let sx = 0; sx < res; sx++) {
      const px = tx + (sx + 0.5) / res, py = ty + (sy + 0.5) / res;
      let r = 0, g = 0, b = 0;
      for (const fi of list) {
        const f = fixtures[fi];
        // tube: distance to a 0.9-long segment
        const ax = f.horiz ? Math.max(-0.45, Math.min(0.45, px - f.x)) : 0;
        const ay = f.horiz ? 0 : Math.max(-0.45, Math.min(0.45, py - f.y));
        const d = Math.hypot(px - f.x - ax, py - f.y - ay);
        if (d > FIX_R) continue;
        if (!clear(w, f.x, f.y, px, py)) continue;
        const fall = Math.pow(h2 / (h2 + d * d), 2.2) * (1 - (d / FIX_R) ** 4) + 0.035 * (1 - d / FIX_R);
        if (f.warm) { r += fall * 1.0; g += fall * 0.83; b += fall * 0.62; } else { r += fall * 0.86; g += fall * 0.94; b += fall * 1.0; }
      }
      const i = ((ty * res + sy) * TW + tx * res + sx) * 3;
      acc[i] = r * mask; acc[i + 1] = g * mask; acc[i + 2] = b * mask;
    }
  }
  // 3x3 blur to remove texel stepping, then pack (value / 2) into RGBA8
  const data = new Uint8Array(TW * TH * 4);
  for (let y = 0; y < TH; y++) for (let x = 0; x < TW; x++) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const xx = x + dx, yy = y + dy;
      if (xx < 0 || yy < 0 || xx >= TW || yy >= TH) continue;
      // don't blur light across a lit/shadow tile edge more than one texel
      const j = (yy * TW + xx) * 3;
      r += acc[j]; g += acc[j + 1]; b += acc[j + 2]; n++;
    }
    const o = (y * TW + x) * 4;
    data[o] = Math.min(255, (r / n / 2) * 255);
    data[o + 1] = Math.min(255, (g / n / 2) * 255);
    data[o + 2] = Math.min(255, (b / n / 2) * 255);
    data[o + 3] = 255;
  }
  const light = new THREE.DataTexture(data, TW, TH, THREE.RGBAFormat, THREE.UnsignedByteType);
  light.flipY = false;
  light.magFilter = THREE.LinearFilter;
  light.minFilter = THREE.LinearFilter;
  light.wrapS = light.wrapT = THREE.ClampToEdgeWrapping;
  light.needsUpdate = true;

  // beacons: spread over the lit areas, at least 8 tiles apart
  const beacons: { x: number; y: number; phase: number }[] = [];
  for (const f of fixtures) {
    if (beacons.length >= MAX_BEACONS) break;
    if (beacons.some((b) => Math.hypot(b.x - f.x, b.y - f.y) < 8)) continue;
    beacons.push({ x: f.x, y: f.y, phase: hash2(Math.floor(f.x), Math.floor(f.y), 5) * Math.PI * 2 });
  }
  const bi = new Uint8Array(W * H * 4);
  for (let ty = 0; ty < H; ty++) for (let tx = 0; tx < W; tx++) {
    if (kindAt(w.map, tx, ty) === T_WALL) continue;
    let best = -1, bd = 1e9;
    beacons.forEach((b, i) => {
      const d = Math.hypot(b.x - tx - 0.5, b.y - ty - 0.5);
      if (d < 11 && d < bd && clear(w, b.x, b.y, tx + 0.5, ty + 0.5)) { bd = d; best = i; }
    });
    bi[(ty * W + tx) * 4] = best + 1;
    bi[(ty * W + tx) * 4 + 3] = 255;
  }
  const beaconIdx = new THREE.DataTexture(bi, W, H, THREE.RGBAFormat, THREE.UnsignedByteType);
  beaconIdx.magFilter = THREE.NearestFilter;
  beaconIdx.minFilter = THREE.NearestFilter;
  beaconIdx.needsUpdate = true;
  return { light, beaconIdx, fixtures, beacons };
}

const VERT_DECL = /* glsl */`
varying vec3 vBW;
varying vec3 vBN;
`;
const VERT_BODY = /* glsl */`
{
  vec4 bw4 = vec4(transformed, 1.0);
  vec3 bn = objectNormal;
  #ifdef USE_INSTANCING
    bw4 = instanceMatrix * bw4;
    bn = mat3(instanceMatrix) * bn;
  #endif
  vBW = (modelMatrix * bw4).xyz;
  vBN = normalize(mat3(modelMatrix) * bn);
}
`;
const FRAG_DECL = /* glsl */`
varying vec3 vBW;
varying vec3 vBN;
uniform sampler2D uBake;
uniform sampler2D uBeaconIdx;
uniform vec2 uBakeSize;
uniform float uBakeGain;
uniform float uAlert;
uniform vec3 uAlertCol;
uniform vec3 uBeacons[${MAX_BEACONS}];
uniform float uSweep;
uniform float uTime;
uniform vec3 uCut;
uniform float uCutOn;
uniform float uEmerg;
`;
const FRAG_CUT = /* glsl */`
if (uCutOn > 0.5) {
  vec2 cd = vBW.xz - uCut.xz;
  float lim = 1.55 - max(cd.y, 0.0) * 0.18;
  if (cd.y > -0.35 && cd.y < 2.6 && abs(cd.x) < lim && vBW.y > 0.36) discard;
}
`;
const FRAG_LIGHT = /* glsl */`
{
  vec2 side = vBN.xz * step(0.5, length(vBN.xz)) * 0.3;
  vec2 bUv = (vBW.xz + side) / uBakeSize;
  vec3 baked = texture2D(uBake, bUv).rgb * uBakeGain;
  float wallish = step(0.5, length(vBN.xz));
  float hf = mix(1.0, 0.62 + 0.45 * clamp(vBW.y / ${WALL_H.toFixed(2)}, 0.0, 1.0), wallish);
  irradiance += baked * hf;
  if (uAlert > 0.001 || uEmerg > 0.001) {
    float bi = floor(texture2D(uBeaconIdx, bUv).r * 255.0 + 0.5) - 1.0;
    float sweep = 0.0;
    for (int i = 0; i < ${MAX_BEACONS}; i++) {
      if (abs(float(i) - bi) < 0.5) {
        vec3 b = uBeacons[i];
        vec2 d = vBW.xz - b.xy;
        float r = length(d);
        float ang = atan(d.y, d.x);
        float lobe = pow(abs(cos(ang - uTime * 2.4 - b.z)), 10.0);
        lobe = mix(0.3, lobe, uSweep);
        sweep = lobe * (1.0 / (1.0 + r * r * 0.22)) * smoothstep(11.0, 5.0, r);
      }
    }
    irradiance += uAlertCol * ((sweep * 2.6 + 0.04) * max(uAlert, uEmerg) + uEmerg * 0.1);
  }
}
`;

export interface PatchOpts { cut?: boolean }

/** Inject the baked light field (and optionally the camera cutaway) into a standard material. */
export function patchMaterial<M extends THREE.MeshStandardMaterial>(m: M, u: BakeUniforms, opts: PatchOpts = {}): M {
  m.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${VERT_DECL}`)
      .replace('#include <project_vertex>', `#include <project_vertex>\n${VERT_BODY}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${FRAG_DECL}`)
      .replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>\n${opts.cut ? FRAG_CUT : ''}`)
      .replace('#include <lights_fragment_maps>', `#include <lights_fragment_maps>\n${FRAG_LIGHT}`);
  };
  m.customProgramCacheKey = () => `bake-${opts.cut ? 1 : 0}`;
  return m;
}
