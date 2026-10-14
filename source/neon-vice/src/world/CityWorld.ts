import * as THREE from 'three';
import { CityGenerator, type CityLayout } from './CityGenerator';
import { CollisionWorld } from './CollisionWorld';
import { Environment } from './Environment';

/**
 * Owns the static city: geometry, collision, lights and ambient animation
 * (sign flicker, beacon blinks, floating motes). Built once; never rebuilt.
 */
export class CityWorld {
  readonly collision = new CollisionWorld();
  readonly environment: Environment;
  readonly layout: CityLayout;
  readonly root = new THREE.Group();
  private readonly motes: THREE.Points;
  private readonly lights: THREE.PointLight[] = [];

  constructor(scene: THREE.Scene) {
    this.environment = new Environment(scene);
    const gen = new CityGenerator(this.collision);
    this.layout = gen.generate();
    this.root.add(gen.group);
    for (const spot of this.layout.lightSpots) {
      const light = new THREE.PointLight(spot.color, spot.intensity, spot.distance, 1.6);
      light.position.set(spot.x, spot.y, spot.z);
      this.lights.push(light);
      this.root.add(light);
    }
    this.motes = this.createMotes();
    this.root.add(this.motes);
    scene.add(this.root);
  }

  /** Drifting neon dust — animated entirely on the GPU. */
  private createMotes(): THREE.Points {
    const count = 900;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 220;
      pos[i * 3 + 1] = Math.random() * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 220;
      seed[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */ `
        uniform float uTime;
        attribute float aSeed;
        varying float vA;
        varying vec3 vC;
        void main() {
          vec3 p = position;
          p.x += sin(uTime * 0.2 + aSeed * 30.0) * 2.0;
          p.y = mod(p.y + uTime * (0.2 + aSeed * 0.3), 18.0);
          p.z += cos(uTime * 0.17 + aSeed * 20.0) * 2.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (2.0 + aSeed * 3.0) * (60.0 / -mv.z);
          vA = (0.35 + 0.65 * sin(uTime * 2.0 + aSeed * 50.0) * 0.5 + 0.5) * smoothstep(90.0, 10.0, -mv.z);
          vC = aSeed < 0.5 ? vec3(1.0, 0.3, 0.85) : vec3(0.3, 0.9, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        varying vec3 vC;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          gl_FragColor = vec4(vC * 1.6, smoothstep(0.5, 0.0, d) * vA * 0.7);
        }`,
    });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    return pts;
  }

  /** Toggling light visibility changes the light state, so three recompiles affected materials. */
  setPointLights(on: boolean): void {
    for (const l of this.lights) l.visible = on;
  }

  update(time: number): void {
    (this.motes.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
    for (const sign of this.layout.signs) {
      let k = 1;
      switch (sign.mode) {
        case 'flicker': {
          // Mostly on, with occasional stutter bursts.
          const burst = Math.sin(time * 0.7 + sign.seed) > 0.93;
          k = burst ? (Math.sin(time * 47 + sign.seed * 13) > 0 ? 1 : 0.15) : 0.95 + 0.05 * Math.sin(time * 9 + sign.seed);
          break;
        }
        case 'pulse':
          k = 0.7 + 0.3 * Math.sin(time * 2.2 + sign.seed);
          break;
        case 'chase':
          k = 0.75 + 0.25 * Math.sin(time * 5 + sign.seed) * Math.sin(time * 0.8);
          break;
        default:
          k = 1;
      }
      sign.material.color.copy(sign.base).multiplyScalar(k);
    }
    const blink = Math.sin(time * 3) > 0.6 ? 3 : 0.3;
    for (const b of this.layout.blinkers) b.color.setRGB(blink, blink * 0.06, blink * 0.12);
    for (let i = 0; i < this.lights.length; i++) {
      this.lights[i].intensity = this.layout.lightSpots[i].intensity * (0.9 + 0.1 * Math.sin(time * 1.7 + i * 2.1));
    }
  }
}
