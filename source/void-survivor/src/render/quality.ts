// Graphics quality presets and device auto-detection. Cosmetic only; never touches the sim.
import type { Quality } from '../storage/save.ts';

export type Level = 'low' | 'medium' | 'high';

export interface Preset {
  level: Level;
  /** cap on devicePixelRatio, and a multiplier applied after the cap */
  maxDpr: number;
  dprScale: number;
  bloom: 'off' | 'half' | 'full';
  /** number of pooled dynamic point lights (constant per preset so shaders compile once) */
  lights: number;
  /** fraction of the particle budget (pool stays 700) */
  particles: number;
  reflections: 'env' | 'planar';
  /** screen-space shockwave ripple */
  ripple: boolean;
  anisotropy: number;
}

export const PRESETS: Record<Level, Preset> = {
  low: { level: 'low', maxDpr: 1, dprScale: 0.75, bloom: 'off', lights: 1, particles: 0.4, reflections: 'env', ripple: false, anisotropy: 1 },
  medium: { level: 'medium', maxDpr: 1.25, dprScale: 1, bloom: 'half', lights: 4, particles: 0.7, reflections: 'env', ripple: true, anisotropy: 4 },
  high: { level: 'high', maxDpr: 2, dprScale: 1, bloom: 'full', lights: 8, particles: 1, reflections: 'planar', ripple: true, anisotropy: 8 },
};

export const LEVEL_NAME: Record<Level, string> = { low: 'Low', medium: 'Medium', high: 'High' };

/** Guess a level from the GPU string and device class. */
export function detectLevel(gl: WebGLRenderingContext | WebGL2RenderingContext | null): Level {
  const coarse = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
  let gpu = '';
  try {
    if (gl) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      gpu = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    }
  } catch {
    gpu = '';
  }
  if (/swiftshader|llvmpipe|software|basic render/i.test(gpu)) return 'low';
  const cores = navigator.hardwareConcurrency || 4;
  if (coarse) return /apple/i.test(gpu) && cores >= 6 ? 'medium' : 'low';
  if (/mali|adreno|powervr|videocore/i.test(gpu)) return 'low';
  if (/intel|uhd|iris|radeon\(tm\) graphics|vega \d/i.test(gpu) || cores <= 4) return 'medium';
  return 'high';
}

export function resolve(q: Quality, detected: Level): Level {
  return q === 'auto' ? detected : q;
}

export function stepDown(l: Level): Level {
  return l === 'high' ? 'medium' : 'low';
}
