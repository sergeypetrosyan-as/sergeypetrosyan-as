// Post-processing: HDR render, thresholded bloom, a shockwave ripple, then ACES tone mapping in the output pass.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import type { Preset } from '../quality.ts';

const ShockShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uCenter: { value: new THREE.Vector2(0.5, 0.5) },
    uRadius: { value: 0 },
    uWidth: { value: 0.05 },
    uStrength: { value: 0 },
    uAspect: { value: 1 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 uCenter;
    uniform float uRadius;
    uniform float uWidth;
    uniform float uStrength;
    uniform float uAspect;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - uCenter;
      d.x *= uAspect;
      float dist = length(d);
      float x = (dist - uRadius) / uWidth;
      float band = exp(-x * x * 2.5);
      vec2 dir = dist > 1e-4 ? d / dist : vec2(0.0);
      dir.x /= uAspect;
      // refract inward on the leading edge, outward behind it
      vec2 uv = vUv - dir * band * uStrength * sign(x + 0.3);
      vec4 c = texture2D(tDiffuse, uv);
      c.rgb += c.rgb * band * uStrength * 14.0 + vec3(1.0, 0.45, 0.75) * band * uStrength * 1.6;
      gl_FragColor = c;
    }`,
};

export class Post {
  composer: EffectComposer;
  bloom: UnrealBloomPass | null = null;
  shock: ShaderPass;
  private rt: THREE.WebGLRenderTarget;
  private half: boolean;

  constructor(gl: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, p: Preset, w: number, h: number) {
    this.half = p.bloom === 'half';
    const pr = gl.getPixelRatio();
    this.rt = new THREE.WebGLRenderTarget(Math.max(1, w * pr), Math.max(1, h * pr), {
      type: THREE.HalfFloatType,
      samples: p.level === 'high' ? 4 : p.level === 'medium' ? 2 : 0,
    });
    this.composer = new EffectComposer(gl, this.rt);
    this.composer.addPass(new RenderPass(scene, camera));
    if (p.bloom !== 'off') {
      this.bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.6, this.half ? 0.25 : 0.4, 1.0);
      this.composer.addPass(this.bloom);
    }
    this.shock = new ShaderPass(ShockShader);
    this.shock.enabled = false;
    this.composer.addPass(this.shock);
    this.composer.addPass(new OutputPass());
    this.setSize(w, h, pr);
  }

  setSize(w: number, h: number, pr: number): void {
    this.composer.setPixelRatio(pr);
    this.composer.setSize(w, h);
    this.shock.uniforms.uAspect.value = w / Math.max(1, h);
  }

  setBloomStrength(k: number): void {
    if (this.bloom) this.bloom.strength = k;
  }

  render(): void {
    this.composer.render();
  }

  dispose(): void {
    this.bloom?.dispose();
    this.shock.dispose();
    this.composer.dispose();
    this.rt.dispose();
  }
}
