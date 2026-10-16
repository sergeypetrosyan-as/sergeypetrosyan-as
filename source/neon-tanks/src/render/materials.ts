import * as THREE from 'three';
import type { SurfaceMat } from '../sim/types.ts';
import { containerTexture, floorGlowTexture, floorTexture, hazardTexture, panelTexture } from './textures.ts';

export const PALETTE = {
  cyan: 0x2ef2ff,
  blue: 0x2a9dff,
  magenta: 0xff2fc8,
  amber: 0xffb02e,
  white: 0xeaf6ff,
  red: 0xff3b4e,
  green: 0x4dff9a,
};

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

  /** Unlit HDR colour for neon strips (feeds bloom). */
  glow(color: GlowColor | number, intensity = 2.2): THREE.MeshBasicMaterial {
    const key = `${color}:${intensity}`;
    let m = this.glows.get(key);
    if (!m) {
      const c = new THREE.Color(typeof color === 'number' ? color : PALETTE[color]);
      c.multiplyScalar(intensity);
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
        return this.std({ map: floorTexture('#141a25', '#2ef2ff'), emissiveMap: floorGlowTexture(), emissive: new THREE.Color(0x1aa7c4), emissiveIntensity: 0.22, roughness: 0.48, metalness: 0.6 });
      case 'deck':
        return this.std({ map: panelTexture('#2b323e', '#12161d', 3), roughness: 0.42, metalness: 0.75 });
      case 'metal':
        return this.std({ map: panelTexture('#39414f', '#171b22', 7), roughness: 0.45, metalness: 0.7 });
      case 'darkMetal':
        return this.std({ map: panelTexture('#1b1f28', '#0b0d11', 9), roughness: 0.5, metalness: 0.8 });
      case 'concrete':
        return this.std({ map: hazardTexture(), roughness: 0.85, metalness: 0.1, envMapIntensity: 0.3 });
      case 'containerCyan':
        return this.std({ map: containerTexture('#1d6a80'), roughness: 0.6, metalness: 0.45 });
      case 'containerMagenta':
        return this.std({ map: containerTexture('#7a2160'), roughness: 0.6, metalness: 0.45 });
      case 'containerSteel':
        return this.std({ map: containerTexture('#4a5361'), roughness: 0.55, metalness: 0.55 });
      case 'containerAmber':
        return this.std({ map: containerTexture('#86561b'), roughness: 0.6, metalness: 0.45 });
      case 'glass':
        return this.std({ color: 0x9fd8ff, transparent: true, opacity: 0.25, roughness: 0.05, metalness: 0.9 });
      case 'trim':
        return this.std({ color: 0x262b35, roughness: 0.4, metalness: 0.85 });
      case 'boundary':
        return this.std({ map: panelTexture('#161a22', '#0a0c10', 13), roughness: 0.5, metalness: 0.8, emissive: new THREE.Color(0x0a2a38), emissiveIntensity: 0.6 });
      case 'lab':
        return this.std({ map: panelTexture('#7f8898', '#4b525e', 17), roughness: 0.38, metalness: 0.55 });
      case 'labDark':
        return this.std({ map: panelTexture('#1d212b', '#0b0d12', 19), roughness: 0.42, metalness: 0.7 });
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

/** See-through energy field: scrolling scanlines with bright edges. */
function barrierMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: timeUniform, uColor: { value: new THREE.Color(PALETTE.cyan) } },
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
