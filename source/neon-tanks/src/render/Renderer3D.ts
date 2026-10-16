import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { disposeTankGeometry } from './TankModel.ts';
import { disposeTextures } from './textures.ts';
import { QUALITY, type QualityLevel, type QualityPreset } from './quality.ts';

/**
 * Owns the WebGL renderer, the procedural environment map used for metal
 * reflections, and an optional half-resolution bloom chain.
 */
export class Renderer3D {
  readonly renderer: THREE.WebGLRenderer;
  readonly env: THREE.Texture;
  private composer: EffectComposer | null = null;
  private renderPass: RenderPass | null = null;
  private bloom: UnrealBloomPass | null = null;
  private envTarget: THREE.WebGLRenderTarget;
  preset: QualityPreset;
  level: QualityLevel;
  private width = 1;
  private height = 1;
  /** Dynamic resolution factor (lowered automatically when frames are slow). */
  scale = 1;

  constructor(canvas: HTMLCanvasElement, level: QualityLevel) {
    this.level = level;
    this.preset = QUALITY[level];
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: this.preset.antialias, powerPreference: 'high-performance', stencil: false });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.envTarget = this.buildEnvironment();
    this.env = this.envTarget.texture;
    this.applyQuality();
  }

  /** A small neon "room" baked through PMREM: cheap, convincing reflections on metal. */
  private buildEnvironment(): THREE.WebGLRenderTarget {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070d);
    const room = new THREE.Mesh(new THREE.BoxGeometry(30, 14, 30), new THREE.MeshBasicMaterial({ color: 0x0b0f18, side: THREE.BackSide }));
    scene.add(room);
    const panel = (color: number, x: number, y: number, z: number, w: number, h: number, ry: number, k = 3) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: THREE.DoubleSide }));
      m.position.set(x, y, z);
      m.rotation.y = ry;
      scene.add(m);
    };
    panel(0x2ef2ff, -14.5, 4, 0, 18, 1.2, Math.PI / 2);
    panel(0xff2fc8, 14.5, 4, 0, 18, 1.2, -Math.PI / 2);
    panel(0x6b7cff, 0, 3, -14.5, 12, 0.8, 0);
    panel(0xffb02e, 0, 2, 14.5, 8, 0.6, Math.PI, 2);
    const top = new THREE.Mesh(new THREE.PlaneGeometry(20, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(0x8fb4ff).multiplyScalar(0.45) }));
    top.position.y = 6.9;
    top.rotation.x = Math.PI / 2;
    scene.add(top);
    const pm = new THREE.PMREMGenerator(this.renderer);
    const rt = pm.fromScene(scene, 0.04);
    pm.dispose();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      if (m.material) (m.material as THREE.Material).dispose();
    });
    return rt;
  }

  setQuality(level: QualityLevel): void {
    this.level = level;
    this.preset = QUALITY[level];
    this.scale = 1;
    this.applyQuality();
  }

  private applyQuality(): void {
    const p = this.preset;
    this.renderer.shadowMap.enabled = p.shadows;
    this.renderer.shadowMap.needsUpdate = true;
    if (p.bloom && !this.composer) {
      this.composer = new EffectComposer(this.renderer);
      this.renderPass = new RenderPass(new THREE.Scene(), new THREE.PerspectiveCamera());
      this.composer.addPass(this.renderPass);
      this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.42, 0.35, 0.9);
      this.composer.addPass(this.bloom);
      this.composer.addPass(new OutputPass());
    }
    if (this.bloom) this.bloom.enabled = p.bloom;
    this.resize(this.width, this.height);
  }

  get pixelRatio(): number {
    return Math.min(window.devicePixelRatio || 1, this.preset.maxPixelRatio) * this.scale;
  }

  resize(w: number, h: number): void {
    this.width = Math.max(1, w);
    this.height = Math.max(1, h);
    const pr = this.pixelRatio;
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(this.width, this.height, false);
    if (this.composer && this.bloom) {
      this.composer.setPixelRatio(pr);
      this.composer.setSize(this.width, this.height);
      this.bloom.resolution.set((this.width * pr) / 2, (this.height * pr) / 2);
    }
  }

  get size(): { w: number; h: number } {
    return { w: this.width, h: this.height };
  }

  render(scene: THREE.Scene, camera: THREE.Camera): void {
    if (this.preset.bloom && this.composer && this.renderPass) {
      this.renderPass.scene = scene;
      this.renderPass.camera = camera;
      this.composer.render();
    } else {
      this.renderer.render(scene, camera);
    }
  }

  dispose(): void {
    this.composer?.dispose();
    this.bloom?.dispose();
    this.envTarget.dispose();
    disposeTankGeometry();
    disposeTextures();
    this.renderer.dispose();
  }
}
