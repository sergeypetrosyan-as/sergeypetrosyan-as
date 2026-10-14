import * as THREE from 'three';
import { timeUniform } from './Materials';

const SKY_GLSL = /* glsl */ `
uniform vec3 uSunDir;
vec3 skyColor(vec3 d) {
  float h = d.y;
  vec3 top = vec3(0.025, 0.012, 0.075);
  vec3 mid = vec3(0.16, 0.04, 0.26);
  vec3 low = vec3(0.75, 0.16, 0.42);
  vec3 hor = vec3(1.0, 0.42, 0.36);
  float sunFacing = max(dot(normalize(vec3(d.x, 0.0, d.z)), normalize(vec3(uSunDir.x, 0.0, uSunDir.z))), 0.0);
  vec3 c = mix(mid, top, smoothstep(0.08, 0.6, h));
  c = mix(low, c, smoothstep(-0.02, 0.18 + sunFacing * 0.12, h));
  c = mix(c, hor, (1.0 - smoothstep(-0.02, 0.07, h)) * (0.35 + 0.65 * pow(sunFacing, 3.0)));
  c = mix(c, vec3(0.06, 0.02, 0.1), smoothstep(0.0, -0.08, h));
  return c;
}
`;

export class Environment {
  readonly sunDir = new THREE.Vector3(1, 0.115, 0.18).normalize();
  readonly hemi: THREE.HemisphereLight;
  readonly moon: THREE.DirectionalLight;
  readonly rim: THREE.DirectionalLight;
  private readonly ocean: THREE.Mesh;
  private readonly sky: THREE.Mesh;
  private envTarget: THREE.WebGLRenderTarget | null = null;

  constructor(private readonly scene: THREE.Scene) {
    scene.fog = new THREE.FogExp2(0x1a0830, 0.0085);
    scene.background = new THREE.Color(0x0a0418);

    this.sky = this.createSky();
    scene.add(this.sky);
    this.ocean = this.createOcean();
    scene.add(this.ocean);

    this.hemi = new THREE.HemisphereLight(0x7a5cff, 0x1a0628, 0.9);
    scene.add(this.hemi);
    scene.add(new THREE.AmbientLight(0x2a1450, 0.6));

    this.moon = new THREE.DirectionalLight(0x9aa8ff, 0.75);
    this.moon.position.set(-40, 80, -30);
    this.moon.shadow.mapSize.set(2048, 2048);
    const sc = this.moon.shadow.camera;
    sc.left = -40; sc.right = 40; sc.top = 40; sc.bottom = -40; sc.near = 1; sc.far = 220;
    this.moon.shadow.bias = -0.0006;
    this.moon.shadow.normalBias = 0.04;
    scene.add(this.moon, this.moon.target);

    // Warm sunset rim from over the ocean.
    this.rim = new THREE.DirectionalLight(0xff5c8a, 0.85);
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
        void main() {
          vec3 d = normalize(vDir);
          vec3 c = skyColor(d);
          // Stars
          vec3 sp = floor(d * 320.0);
          float s = hash3(sp);
          float tw = 0.6 + 0.4 * sin(uTime * (1.0 + s * 3.0) + s * 50.0);
          c += vec3(0.85, 0.8, 1.0) * step(0.9975, s) * smoothstep(0.12, 0.45, d.y) * tw * 1.3;
          // Synthwave sun with horizontal slits
          float sd = acos(clamp(dot(d, uSunDir), -1.0, 1.0));
          float r = 0.13;
          float disc = 1.0 - smoothstep(r - 0.004, r, sd);
          float yRel = (d.y - uSunDir.y) / r;
          float slit = yRel > 0.0 ? 1.0 : step(-yRel * 0.55, fract(yRel * 6.0 + uTime * 0.12));
          vec3 sunCol = mix(vec3(1.0, 0.18, 0.55), vec3(1.0, 0.86, 0.3), smoothstep(-0.9, 0.9, yRel));
          c = mix(c, sunCol * 0.95, disc * slit * step(-0.005, d.y));
          c += vec3(1.0, 0.3, 0.5) * exp(-sd * 9.0) * 0.22;
          // Thin cloud streaks
          float band = smoothstep(0.02, 0.06, d.y) * (1.0 - smoothstep(0.1, 0.22, d.y));
          float cl = sin(d.x * 18.0 + d.z * 9.0 + uTime * 0.02) * 0.5 + 0.5;
          c = mix(c, vec3(0.35, 0.08, 0.3), band * cl * 0.45);
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
          vec3 deep = vec3(0.02, 0.01, 0.06);
          vec3 c = mix(deep, refl, 0.25 + 0.65 * fres) + vec3(1.0, 0.45, 0.55) * (sunSpec + glitter);
          float dist = length(vWorld.xz - cameraPosition.xz);
          c = mix(c, skyColor(normalize(vec3(v.x, 0.01, v.z))), smoothstep(250.0, 900.0, dist));
          // Shore foam line
          c += vec3(0.6, 0.5, 0.9) * (1.0 - smoothstep(0.0, 2.5, vWorld.x - 120.0)) * (0.45 + 0.35 * sin(p.y * 0.5 + t * 2.0));
          gl_FragColor = vec4(c, 1.0);
          #include <colorspace_fragment>
        }`,
    });
    return new THREE.Mesh(geo, mat);
  }

  /** Bakes a neon-tinted environment so glossy surfaces (wet asphalt, car paint) pick up colour. */
  bakeEnvironment(renderer: THREE.WebGLRenderer): void {
    const envScene = new THREE.Scene();
    const sky = this.sky.clone();
    sky.scale.setScalar(0.05);
    envScene.add(sky);
    const panel = new THREE.PlaneGeometry(1, 1);
    const neon: Array<[number, number, number, number, number, number]> = [
      // color, x, y, z, w, h
      [0xff2fd2, 30, 6, -12, 16, 4],
      [0x2ef2ff, -26, 8, 18, 14, 3],
      [0x8a3dff, 10, 14, 32, 22, 6],
      [0xff8a3d, -14, 5, -30, 10, 3],
      [0xff4f9a, -34, 10, -6, 8, 8],
      [0x3d6bff, 22, 18, 24, 12, 5],
    ];
    for (const [color, x, y, z, w, h] of neon) {
      const m = new THREE.Mesh(panel, new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(2.5), side: THREE.DoubleSide }));
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
