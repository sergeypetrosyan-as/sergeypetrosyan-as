import type { QualityPref } from '../../storage/store.ts';

export type Quality = 'low' | 'medium' | 'high';

export interface QualityProfile {
  name: Quality;
  /** Cap for devicePixelRatio. */
  pixelRatio: number;
  /** Real SpotLights for flashlights and cameras (Low draws the cone decal as soft light instead). */
  spots: boolean;
  shadows: boolean;
  shadowSize: number;
  softShadows: boolean;
  bloom: boolean;
  /** Laser haze sheets, flashlight light volumes, denser fog. */
  haze: boolean;
  volumes: boolean;
  /** Texels per tile in the baked fixture light field. */
  bakeRes: number;
  /** Pixels per tile in the floor albedo canvas. */
  floorRes: number;
  msaa: number;
}

export const PROFILES: Record<Quality, QualityProfile> = {
  low: { name: 'low', pixelRatio: 1, spots: false, shadows: false, shadowSize: 256, softShadows: false, bloom: false, haze: false, volumes: false, bakeRes: 8, floorRes: 32, msaa: 0 },
  medium: { name: 'medium', pixelRatio: 1.5, spots: true, shadows: true, shadowSize: 512, softShadows: false, bloom: true, haze: true, volumes: false, bakeRes: 12, floorRes: 48, msaa: 2 },
  high: { name: 'high', pixelRatio: 2, spots: true, shadows: true, shadowSize: 1024, softShadows: true, bloom: true, haze: true, volumes: true, bakeRes: 16, floorRes: 64, msaa: 4 },
};

/** Pick a tier from what the browser tells us. Medium is the default target (60 fps). */
export function detectQuality(gl: WebGLRenderingContext | WebGL2RenderingContext | null): Quality {
  let gpu = '';
  try {
    if (gl) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      gpu = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)).toLowerCase();
    }
  } catch { /* ignore */ }
  let coarse = false;
  try { coarse = matchMedia('(pointer: coarse)').matches; } catch { /* ignore */ }
  const cores = navigator.hardwareConcurrency || 4;
  if (/swiftshader|llvmpipe|software|basic render/.test(gpu)) return 'low';
  if (coarse || cores <= 2) return 'low';
  if (/nvidia|geforce|rtx|radeon rx|apple m\d|apple gpu/.test(gpu) && cores >= 8) return 'high';
  return 'medium';
}

export function resolveQuality(pref: QualityPref, detected: Quality): Quality {
  return pref === 'auto' ? detected : pref;
}
