import * as THREE from 'three';
import { timeUniform } from './Materials';

// Colours are linear-light versions of the 19_mystical-western brand tints
// (night #150607, dusk #320B0E, wine #72151D, saddle #AF7D7E, bone #F1EDE7).
const SKY_GLSL = /* glsl */ `
uniform vec3 uSunDir;
vec3 skyColor(vec3 d) {
  float h = d.y;
  vec3 top = vec3(0.010, 0.0025, 0.003);
  vec3 mid = vec3(0.045, 0.008, 0.010);
  vec3 low = vec3(0.1, 0.014, 0.016);
  vec3 hor = vec3(0.36, 0.15, 0.13);
  float moonFacing = max(dot(normalize(vec3(d.x, 0.0, d.z)), normalize(vec3(uSunDir.x, 0.0, uSunDir.z))), 0.0);
  vec3 c = mix(mid, top, smoothstep(0.08, 0.6, h));
  c = mix(low, c, smoothstep(-0.02, 0.18 + moonFacing * 0.1, h));
  c = mix(c, hor, (1.0 - smoothstep(-0.02, 0.07, h)) * (0.25 + 0.75 * pow(moonFacing, 3.0)));
  c = mix(c, vec3(0.012, 0.002, 0.003), smoothstep(0.0, -0.08, h));
  return c;
}
`;

export class Environment {
  // The carved moon hangs high enough over the sea to clear the hotel roofs.
  readonly sunDir = new THREE.Vector3(1, 0.6, 0.2).normalize();
  readonly hemi: THREE.HemisphereLight;
  readonly moon: THREE.DirectionalLight;
  readonly rim: THREE.DirectionalLight;
  private readonly ocean: THREE.Mesh;
  private readonly sky: THREE.Mesh;
  private envTarget: THREE.WebGLRenderTarget | null = null;

  constructor(private readonly scene: THREE.Scene) {
    scene.fog = new THREE.FogExp2(0x1f0709, 0.0085); // dusk haze
    scene.background = new THREE.Color(0x150607);

    this.sky = this.createSky();
    scene.add(this.sky);
    this.ocean = this.createOcean();
    scene.add(this.ocean);

    this.hemi = new THREE.HemisphereLight(0x8f6263, 0x150607, 0.85);
    scene.add(this.hemi);
    scene.add(new THREE.AmbientLight(0x120506, 0.6));

    this.moon = new THREE.DirectionalLight(0xf1ede7, 0.8);
    this.moon.position.set(-40, 80, -30);
    this.moon.shadow.mapSize.set(2048, 2048);
    const sc = this.moon.shadow.camera;
    sc.left = -40; sc.right = 40; sc.top = 40; sc.bottom = -40; sc.near = 1; sc.far = 220;
    this.moon.shadow.bias = -0.0006;
    this.moon.shadow.normalBias = 0.04;
    scene.add(this.moon, this.moon.target);

    // Warm ember rim from the moonrise over the ocean.
    this.rim = new THREE.DirectionalLight(0xaf7d7e, 0.6);
    this.rim.position.copy(this.sunDir).multiplyScalar(100);
    scene.add(this.rim);
  }

  private createSky(): THREE.Mesh {
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: { uSunDir: { value: this.sunDir }, uTime: timeUniform },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        varying vec3 vDir;
        ${SKY_GLSL}
        float hash3(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
        // Low mesa skyline: flat-topped plateaus around the horizon (height in d.y units).
        float mesaTop(float az) {
          float t = 0.006 + 0.003 * sin(az * 5.0) + 0.002 * sin(az * 13.0);
          for (int i = 0; i < 9; i++) {
            float fi = float(i);
            float cAz = fi * 0.698 + 0.25 * sin(fi * 3.1);
            float w = 0.07 + 0.09 * fract(sin(fi * 12.9898) * 43758.5453);
            float ht = 0.03 + 0.045 * fract(sin(fi * 78.233) * 12345.678);
            float da = abs(mod(az - cAz + 3.14159, 6.28318) - 3.14159);
            t = max(t, ht * (1.0 - smoothstep(w, w + 0.035, da)));
          }
          return t;
        }
        void main() {
          vec3 d = normalize(vDir);
          vec3 c = skyColor(d);
          // Quiet stars: sparse, low contrast, bone.
          vec3 sp = floor(d * 320.0);
          float s = hash3(sp);
          float tw = 0.75 + 0.25 * sin(uTime * (0.6 + s * 1.5) + s * 50.0);
          c += vec3(0.62, 0.58, 0.54) * step(0.9982, s) * smoothstep(0.1, 0.45, d.y) * tw * 0.7;
          // Carved moon: bone disc, engraved hatching on the lower-left, ember rings.
          float sd = acos(clamp(dot(d, uSunDir), -1.0, 1.0));
          float r = 0.11;
          vec3 right = normalize(cross(uSunDir, vec3(0.0, 1.0, 0.0)));
          vec3 up2 = cross(right, uSunDir);
          vec2 q = vec2(dot(d, right), dot(d, up2)) / r;
          float rho = length(q);
          float disc = (1.0 - smoothstep(0.985, 1.0, rho)) * step(0.0, dot(d, uSunDir));
          float shade = smoothstep(-0.1, 0.7, -(q.x * 0.55 + q.y * 0.85));
          float lines = step(0.5, fract((q.x - q.y) * 6.5));
          vec3 moon = vec3(0.72, 0.68, 0.62);
          moon = mix(moon, vec3(0.17, 0.008, 0.012), shade * lines * 0.8);
          // Waxing gibbous: the unlit limb is carved back into the night sky.
          float lit = 1.0 - smoothstep(0.97, 1.03, length(q - vec2(0.42, 0.06)));
          moon = mix(vec3(0.03, 0.006, 0.007), moon, lit);
          float rings = (1.0 - smoothstep(0.0, 0.014, abs(rho - 0.9))) * 0.55 + (1.0 - smoothstep(0.0, 0.012, abs(rho - 0.8))) * 0.35;
          moon = mix(moon, vec3(0.41, 0.004, 0.012), rings);
          moon = mix(moon, vec3(0.41, 0.004, 0.012), smoothstep(0.95, 0.985, rho));
          c = mix(c, moon, disc);
          c += vec3(0.8, 0.7, 0.64) * exp(-sd * 7.0) * 0.1 * (1.0 - disc);
          // Thin dust streaks low in the sky.
          float band = smoothstep(0.02, 0.06, d.y) * (1.0 - smoothstep(0.1, 0.22, d.y));
          float cl = sin(d.x * 18.0 + d.z * 9.0 + uTime * 0.02) * 0.5 + 0.5;
          c = mix(c, vec3(0.13, 0.035, 0.035), band * cl * 0.35);
          // Mesa silhouette in front of everything, with engraved strata and a moonlit rim.
          float az = atan(d.z, d.x);
          float mt = mesaTop(az);
          float inMesa = (1.0 - smoothstep(mt - 0.0012, mt, d.y)) * step(-0.06, d.y);
          float strata = step(0.72, fract(d.y * 340.0)) * 0.5;
          vec3 mesaCol = mix(vec3(0.03, 0.0035, 0.005), vec3(0.075, 0.003, 0.009), strata);
          float rim = (1.0 - smoothstep(0.0, 0.0025, mt - d.y)) * pow(max(dot(normalize(vec3(d.x, 0.0, d.z)), normalize(vec3(uSunDir.x, 0.0, uSunDir.z))), 0.0), 2.0);
          mesaCol += vec3(0.32, 0.17, 0.16) * rim * 0.6;
          c = mix(c, mesaCol, inMesa);
          gl_FragColor = vec4(c, 1.0);
          #include <colorspace_fragment>
        }`,
    });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(900, 48, 24), mat);
    mesh.frustumCulled = false;
    mesh.renderOrder = -10;
    return mesh;
  }

  private createOcean(): THREE.Mesh {
    const geo = new THREE.PlaneGeometry(1400, 2400, 1, 1);
    geo.rotateX(-Math.PI / 2);
    geo.translate(120 + 700, -0.35, 0);
    const mat = new THREE.ShaderMaterial({
      fog: false,
      uniforms: { uSunDir: { value: this.sunDir }, uTime: timeUniform },
      vertexShader: /* glsl */ `
        varying vec3 vWorld;
        void main() {
          vec4 w = modelMatrix * vec4(position, 1.0);
          vWorld = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        varying vec3 vWorld;
        ${SKY_GLSL}
        void main() {
          vec2 p = vWorld.xz;
          float t = uTime;
          vec3 n = vec3(0.0, 1.0, 0.0);
          n.x += sin(p.x * 0.35 + t * 1.3) * 0.05 + sin(p.x * 1.7 - p.y * 0.6 + t * 2.1) * 0.025;
          n.z += cos(p.y * 0.42 - t * 1.1) * 0.05 + sin(p.y * 2.3 + p.x * 0.4 + t * 2.7) * 0.02;
          n = normalize(n);
          vec3 v = normalize(vWorld - cameraPosition);
          vec3 r = reflect(v, n);
          r.y = abs(r.y);
          float fres = pow(1.0 - max(dot(-v, n), 0.0), 3.0);
          vec3 refl = skyColor(r);
          float sunSpec = pow(max(dot(r, uSunDir), 0.0), 90.0) * 1.1;
          float glitter = pow(max(dot(r, uSunDir), 0.0), 18.0) * step(0.55, fract(sin(dot(floor(p * 2.0), vec2(12.9, 78.2))) * 43758.5 + t)) * 0.5;
          vec3 deep = vec3(0.006, 0.0015, 0.002);
          vec3 c = mix(deep, refl, 0.25 + 0.65 * fres) + vec3(0.85, 0.76, 0.68) * (sunSpec + glitter);
          float dist = length(vWorld.xz - cameraPosition.xz);
          c = mix(c, skyColor(normalize(vec3(v.x, 0.01, v.z))), smoothstep(250.0, 900.0, dist));
          // Shore foam line
          c += vec3(0.42, 0.29, 0.27) * (1.0 - smoothstep(0.0, 2.5, vWorld.x - 120.0)) * (0.45 + 0.35 * sin(p.y * 0.5 + t * 2.0));
          gl_FragColor = vec4(c, 1.0);
          #include <colorspace_fragment>
        }`,
    });
    return new THREE.Mesh(geo, mat);
  }

  /** Bakes a warm, brand-tinted environment so glossy surfaces (wet asphalt, car paint) pick up colour. */
  bakeEnvironment(renderer: THREE.WebGLRenderer): void {
    const envScene = new THREE.Scene();
    const sky = this.sky.clone();
    sky.scale.setScalar(0.05);
    envScene.add(sky);
    const panel = new THREE.PlaneGeometry(1, 1);
    const mysticalWestern: Array<[number, number, number, number, number, number]> = [
      // color, x, y, z, w, h
      [0xab0b1a, 30, 6, -12, 16, 4],
      [0xf1ede7, -26, 8, 18, 14, 3],
      [0x72151d, 10, 14, 32, 22, 6],
      [0xaf7d7e, -14, 5, -30, 10, 3],
      [0xd3b9b7, -34, 10, -6, 8, 8],
      [0xd3b9b7, 22, 18, 24, 12, 5],
    ];
    for (const [color, x, y, z, w, h] of mysticalWestern) {
      const m = new THREE.Mesh(panel, new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(1.7), side: THREE.DoubleSide }));
      m.position.set(x, y, z);
      m.scale.set(w, h, 1);
      m.lookAt(0, y, 0);
      envScene.add(m);
    }
    const pmrem = new THREE.PMREMGenerator(renderer);
    this.envTarget = pmrem.fromScene(envScene, 0.035);
    this.scene.environment = this.envTarget.texture;
    pmrem.dispose();
    panel.dispose();
    envScene.traverse((o) => {
      if (o instanceof THREE.Mesh && o !== sky) (o.material as THREE.Material).dispose();
    });
  }

  setShadows(enabled: boolean): void {
    this.moon.castShadow = enabled;
  }

  /** Keeps the sky dome on the camera and the shadow frustum centred on the action. */
  follow(camera: THREE.Camera, x: number, z: number): void {
    this.sky.position.copy(camera.position);
    this.moon.position.set(x - 40, 80, z - 30);
    this.moon.target.position.set(x, 0, z);
  }

  dispose(): void {
    this.envTarget?.dispose();
  }
}
