// Materials: physically based armour with a per-instance emissive channel, additive decals and a few small shaders.
import * as THREE from 'three';

/**
 * MeshStandardMaterial that adds a per-instance emissive colour from attribute `aGlow` (vec3, linear HDR).
 * Hit flashes, telegraph charge and elite trim all write into it.
 */
export function glowStandard(params: THREE.MeshStandardMaterialParameters): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial(params);
  m.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec3 aGlow;\nvarying vec3 vGlow;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvGlow = aGlow;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vGlow;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += vGlow;');
  };
  m.customProgramCacheKey = () => 'vs-glow-standard';
  return m;
}

/** Unlit HDR colour (instanceColor can exceed 1.0 to feed bloom). */
export function hot(color = 0xffffff, opts: THREE.MeshBasicMaterialParameters = {}): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ color, ...opts });
}

/** Additive textured decal (floor glows, rings, telegraph lines). */
export function additive(map: THREE.Texture, opacity = 1): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    map,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fog: false,
  });
}

/** Normal-blended dark decal (contact shadows). */
export function shadowDecal(map: THREE.Texture): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ map, color: 0x000000, transparent: true, opacity: 0.75, depthWrite: false, fog: false, alphaMap: map });
}

const NOISE = /* glsl */ `
float vsHash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vsNoise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(vsHash(i), vsHash(i + vec2(1.0, 0.0)), u.x), mix(vsHash(i + vec2(0.0, 1.0)), vsHash(i + vec2(1.0, 1.0)), u.x), u.y);
}`;

/** Void pool decal. aPool = (warnProgress, active, seed, fade). */
export function poolMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */ `
      attribute vec4 aPool;
      varying vec4 vP;
      varying vec2 vUv;
      void main() {
        vUv = uv * 2.0 - 1.0;
        vP = aPool;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec4 vP;
      varying vec2 vUv;
      ${NOISE}
      void main() {
        float r = length(vUv);
        if (r > 1.0) discard;
        float a = atan(vUv.y, vUv.x);
        if (vP.y < 0.5) {
          float ring = smoothstep(0.84, 0.92, r) * (1.0 - smoothstep(0.96, 1.0, r));
          float dash = step(0.45, fract(a * 3.8197 + uTime * 0.7));
          float pulse = 0.6 + 0.4 * sin(uTime * 18.0);
          float fill = vP.x * 0.35 * (1.0 - r * 0.6);
          vec3 col = vec3(0.75, 0.6, 1.0) * (ring * dash * pulse * 1.1) + vec3(0.3, 0.15, 0.8) * fill;
          float alpha = clamp(ring * dash * pulse + fill, 0.0, 1.0);
          gl_FragColor = vec4(col, alpha);
        } else {
          float sw = vsNoise(vec2(a * 2.5 + uTime * 0.9 + r * 5.0 + vP.z, r * 7.0 - uTime * 1.6));
          float sw2 = vsNoise(vec2(a * 5.0 - uTime * 0.6, r * 12.0 + uTime) + vP.z * 3.0);
          vec3 deep = vec3(0.015, 0.0, 0.05);
          vec3 mid = vec3(0.35, 0.12, 0.95);
          float rim = smoothstep(0.8, 0.95, r) * (1.0 - smoothstep(0.97, 1.0, r));
          vec3 col = mix(deep, mid, pow(sw * sw2, 1.2) * r * 1.3) + rim * vec3(0.55, 0.3, 1.1);
          float alpha = (0.82 + 0.18 * sw) * vP.w;
          gl_FragColor = vec4(col, alpha);
        }
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

/** Lightning lane decal. aLane = (active, warnProgress, length, width). Additive. */
export function laneMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute vec4 aLane;
      varying vec4 vL;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vL = aLane;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec4 vL;
      varying vec2 vUv;
      ${NOISE}
      void main() {
        float across = abs(vUv.y * 2.0 - 1.0);
        float edge = 1.0 - across;
        if (vL.x < 0.5) {
          float s = fract((vUv.x * vL.z + vUv.y * vL.w) / 46.0 - uTime * 1.4);
          float stripe = step(0.5, s);
          float pulse = 0.55 + 0.45 * sin(uTime * 20.0);
          float border = smoothstep(0.78, 0.9, across) * (1.0 - smoothstep(0.95, 1.0, across));
          vec3 col = mix(vec3(1.0, 0.18, 0.53), vec3(1.0, 0.82, 0.29), stripe) * (0.18 + 0.2 * pulse + 0.25 * vL.y) * smoothstep(0.0, 0.2, edge);
          col += vec3(1.0, 0.82, 0.29) * border * 1.2;
          gl_FragColor = vec4(col, 1.0);
        } else {
          float flick = 0.75 + 0.25 * vsNoise(vec2(vUv.x * vL.z * 0.05 - uTime * 40.0, uTime * 13.0));
          float core = pow(edge, 3.0);
          vec3 col = vec3(3.2, 2.9, 2.0) * core * flick + vec3(1.0, 0.7, 0.2) * pow(edge, 0.8) * 0.9;
          gl_FragColor = vec4(col, 1.0);
        }
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

/** Bulwark Field dome: fresnel rim and drifting hex cells, additive. */
export function fieldMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0x35f2ff) }, uPulse: { value: 0 }, uStrength: { value: 1 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    vertexShader: /* glsl */ `
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vW;
      varying float vH;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz;
        vH = position.y;
        vec4 mv = viewMatrix * wp;
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uPulse;
      uniform float uStrength;
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vW;
      varying float vH;
      void main() {
        float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.6);
        vec2 p = vW.xz / 16.0 + vec2(0.0, uTime * 0.25);
        vec2 r = vec2(1.0, 1.7320508);
        vec2 h = r * 0.5;
        vec2 a = mod(p, r) - h;
        vec2 b = mod(p - h, r) - h;
        vec2 gv = dot(a, a) < dot(b, b) ? a : b;
        float e = 0.5 - max(abs(gv.x), dot(abs(gv), vec2(0.5, 0.8660254)));
        float hexLine = 1.0 - smoothstep(0.0, 0.05, e);
        float shimmer = 0.5 + 0.5 * sin(uTime * 2.2 + vW.x * 0.05 + vW.z * 0.04);
        float base = smoothstep(0.0, 0.08, vH) ;
        float k = fres * 1.1 + hexLine * (0.10 + 0.12 * shimmer) + uPulse * (0.25 + fres);
        k *= mix(1.6, 1.0, base);
        vec3 col = uColor * k * uStrength;
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}
