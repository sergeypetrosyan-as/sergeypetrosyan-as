import * as THREE from 'three';
import type { SurfaceMat } from '../sim/types.ts';
import { containerTexture, floorGlowTexture, floorTexture, hazardTexture, panelTexture } from './textures.ts';

/**
 * 19_mystical-western roles (Actual Solutions brand). Keys keep their legacy
 * names so arena data still resolves; the meaning is now:
 *   cyan    bone  — moonlight: the player's side, lanterns, see-through barriers
 *   blue    tan   — the allied team
 *   magenta ember — warm decor on the far side of the depot (not a team colour)
 *   amber   rose  — collectibles, control point, stamped highlights
 *   red     red   — hostile tanks and their fire
 *   green   blush — repair stations (rose family)
 */
export const PALETTE = {
  cyan: 0xf1ede7,
  blue: 0xd3b9b7,
  magenta: 0xab0b1a,
  amber: 0xe96b74,
  white: 0xf1ede7,
  red: 0xe30016,
  green: 0xeeb9b9,
};

/** Unlit strips used to be mystical western; they are now warm lantern halos at reduced intensity. */
const GLOW_SCALE = 0.62;

export type GlowColor = 'cyan' | 'magenta' | 'amber' | 'blue' | 'white';

/** Shared time uniform for animated shaders (barriers, holograms, control point). */
export const timeUniform = { value: 0 };

/** Arena material set; owns its materials so a match can dispose them cleanly. */
export class MaterialSet {
  private readonly surfaces = new Map<SurfaceMat, THREE.Material>();
  private readonly glows = new Map<string, THREE.MeshBasicMaterial>();
  private readonly extra: THREE.Material[] = [];

  constructor(private readonly env: THREE.Texture | null) {}

  surface(kind: SurfaceMat): THREE.Material {
    let m = this.surfaces.get(kind);
    if (!m) {
      m = this.create(kind);
      this.surfaces.set(kind, m);
    }
    return m;
  }

  /** Unlit HDR colour for mystical western strips (feeds bloom). */
  glow(color: GlowColor | number, intensity = 2.2): THREE.MeshBasicMaterial {
    const key = `${color}:${intensity}`;
    let m = this.glows.get(key);
    if (!m) {
      const c = new THREE.Color(typeof color === 'number' ? color : PALETTE[color]);
      c.multiplyScalar(intensity * GLOW_SCALE);
      m = new THREE.MeshBasicMaterial({ color: c, toneMapped: false, fog: true });
      this.glows.set(key, m);
    }
    return m;
  }

  track<T extends THREE.Material>(m: T): T {
    this.extra.push(m);
    return m;
  }

  private std(params: THREE.MeshStandardMaterialParameters): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({ envMap: this.env, envMapIntensity: 0.9, ...params });
  }

  private create(kind: SurfaceMat): THREE.Material {
    switch (kind) {
      case 'floor':
        return this.std({ map: floorTexture('#2a0b0d', '#d3b9b7'), emissiveMap: floorGlowTexture(), emissive: new THREE.Color(0xd3b9b7), emissiveIntensity: 0.1, roughness: 0.7, metalness: 0.35 });
      case 'deck':
        return this.std({ map: panelTexture('#3a1013', '#1a0608', 3), roughness: 0.6, metalness: 0.45 });
      case 'metal':
        return this.std({ map: panelTexture('#4a1a1d', '#1c0709', 7), roughness: 0.62, metalness: 0.4 });
      case 'darkMetal':
        return this.std({ map: panelTexture('#24090c', '#0e0405', 9), roughness: 0.55, metalness: 0.6 });
      case 'concrete':
        return this.std({ map: hazardTexture(), roughness: 0.85, metalness: 0.1, envMapIntensity: 0.3 });
      case 'containerCyan':
        return this.std({ map: containerTexture('#8f6e6f'), roughness: 0.6, metalness: 0.45 });
      case 'containerMagenta':
        return this.std({ map: containerTexture('#72151d'), roughness: 0.6, metalness: 0.45 });
      case 'containerSteel':
        return this.std({ map: containerTexture('#3a1215'), roughness: 0.55, metalness: 0.55 });
      case 'containerAmber':
        return this.std({ map: containerTexture('#a88886'), roughness: 0.6, metalness: 0.45 });
      case 'glass':
        return this.std({ color: 0xf6f3ef, transparent: true, opacity: 0.25, roughness: 0.05, metalness: 0.9 });
      case 'trim':
        return this.std({ color: 0x150607, roughness: 0.4, metalness: 0.85 });
      case 'boundary':
        return this.std({ map: panelTexture('#2d0a0d', '#120405', 13), roughness: 0.6, metalness: 0.5, emissive: new THREE.Color(0x480e13), emissiveIntensity: 0.5 });
      case 'lab':
        return this.std({ map: panelTexture('#8a6a6b', '#3a1013', 17), roughness: 0.38, metalness: 0.55 });
      case 'labDark':
        return this.std({ map: panelTexture('#2a0b0e', '#110405', 19), roughness: 0.42, metalness: 0.7 });
      case 'barrier':
        return barrierMaterial();
    }
  }

  dispose(): void {
    this.surfaces.forEach((m) => m.dispose());
    this.glows.forEach((m) => m.dispose());
    this.extra.forEach((m) => m.dispose());
    this.surfaces.clear();
    this.glows.clear();
  }
}

/** See-through field: engraved moonlit scanlines with bright edges (kept readable). */
function barrierMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    // Moonlit tan at reduced strength: bone at full strength saturates to an opaque white sheet.
    uniforms: { uTime: timeUniform, uColor: { value: new THREE.Color(PALETTE.blue).multiplyScalar(0.15) } },
    vertexShader: /* glsl */ `
      varying vec3 vPos;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec3 vPos;
      varying vec2 vUv;
      void main() {
        float lines = 0.5 + 0.5 * sin(vPos.y * 9.0 - uTime * 4.0);
        float hex = 0.5 + 0.5 * sin((vPos.x + vPos.z) * 3.0 + uTime * 1.5);
        float edge = smoothstep(0.85, 1.0, max(abs(vUv.y * 2.0 - 1.0), abs(vUv.x * 2.0 - 1.0)));
        float a = 0.03 + lines * 0.06 + hex * 0.03 + edge * 0.45;
        gl_FragColor = vec4(uColor * (0.55 + edge * 1.4), a);
      }`,
  });
}
