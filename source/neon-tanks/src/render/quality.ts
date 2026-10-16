export type QualityLevel = 'low' | 'medium' | 'high';

export interface QualityPreset {
  maxPixelRatio: number;
  shadows: boolean;
  shadowMap: number;
  bloom: boolean;
  maxLights: number;
  particles: number;
  antialias: boolean;
}

/** Low drops shadows, bloom and point lights; medium keeps bloom and a few lights. */
export const QUALITY: Record<QualityLevel, QualityPreset> = {
  low: { maxPixelRatio: 0.85, shadows: false, shadowMap: 0, bloom: false, maxLights: 0, particles: 260, antialias: false },
  medium: { maxPixelRatio: 1, shadows: true, shadowMap: 1024, bloom: true, maxLights: 4, particles: 520, antialias: false },
  high: { maxPixelRatio: 1.5, shadows: true, shadowMap: 2048, bloom: true, maxLights: 10, particles: 900, antialias: true },
};
