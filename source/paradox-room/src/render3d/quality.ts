// Graphics quality presets and a conservative auto-detect.
import type { Quality } from '../render/types.ts';

export interface QualityPreset {
  pixelRatio: number; // cap on devicePixelRatio
  shadows: boolean;
  shadowSize: number;
  bloom: boolean;
  dust: number;
  transmission: boolean;
}

export const PRESETS: Record<Quality, QualityPreset> = {
  low: { pixelRatio: 1, shadows: false, shadowSize: 0, bloom: false, dust: 0, transmission: false },
  medium: { pixelRatio: 1.5, shadows: true, shadowSize: 512, bloom: true, dust: 140, transmission: false },
  high: { pixelRatio: 2, shadows: true, shadowSize: 1024, bloom: true, dust: 320, transmission: true },
};

/** Pick a level from what the GPU and device report. Software rasterisers and small devices get Low. */
export function detectQuality(gl: WebGLRenderingContext | WebGL2RenderingContext): Quality {
  let rendererName = '';
  try {
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) rendererName = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? '');
  } catch {
    /* privacy-restricted browsers */
  }
  const r = rendererName.toLowerCase();
  if (/swiftshader|llvmpipe|software|basic render/.test(r)) return 'low';
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const mem = nav.deviceMemory ?? 8;
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  if (coarse || cores <= 4 || mem <= 4) return /apple gpu|adreno \(tm\) 7|mali-g7/.test(r) ? 'medium' : 'low';
  if (/rtx|radeon rx|geforce gtx 1[06-9]|apple m[1-9]/.test(r) && cores >= 8) return 'high';
  return 'medium';
}
