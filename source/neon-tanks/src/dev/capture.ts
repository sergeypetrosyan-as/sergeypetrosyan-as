import { GIFEncoder, applyPalette, quantize } from 'gifenc';
import type { Game } from '../game/Game.ts';
import { Brain } from '../sim/ai.ts';
import { DIFFICULTIES } from '../sim/content.ts';
import { angleDiff } from '../sim/math.ts';

/**
 * Dev-only marketing capture (never bundled in production): lets a bot drive
 * the player's tank, frames the camera on its turret and records a poster
 * (WebP) and preview (GIF) through the dev server's /__capture sink.
 */
async function save(name: string, data: Blob | Uint8Array): Promise<void> {
  await fetch(`/__capture/${name}`, { method: 'POST', body: data });
}

function autopilot(game: Game): void {
  const w = game.debug.world;
  if (!w || !w.player) return;
  if (!w.brains.some((b) => b.tank === w.player)) w.brains.push(new Brain(w.player, DIFFICULTIES.elite, 4242));
}

/** Advance `seconds` with the chase camera easing behind the turret. */
function run(game: Game, seconds: number): void {
  const w = game.debug.world!;
  const p = w.player!;
  const rig = game.debug.rig;
  for (let t = 0; t < seconds; t += 1 / 60) {
    rig.yaw += angleDiff(rig.yaw, p.alive ? p.turretYaw : rig.yaw) * 0.06;
    rig.pitch += (0.34 - rig.pitch) * 0.05;
    rig.targetDistance = 15;
    game.advance(1 / 60);
  }
}

function grab(src: HTMLCanvasElement, w: number, h: number): CanvasRenderingContext2D {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  // Cover-crop the game canvas to the target aspect.
  const sa = src.width / src.height, ta = w / h;
  let sw = src.width, sh = src.height, sx = 0, sy = 0;
  if (sa > ta) { sw = sh * ta; sx = (src.width - sw) / 2; } else { sh = sw / ta; sy = (src.height - sh) / 2; }
  g.drawImage(src, sx, sy, sw, sh, 0, 0, w, h);
  return g;
}

export function install(game: Game): void {
  const canvas = document.getElementById('scene') as HTMLCanvasElement;
  const api = {
    autopilot: () => autopilot(game),
    run: (s: number) => run(game, s),
    async poster(name = 'neon-tanks-poster.webp', w = 768, h = 432): Promise<void> {
      game.advance(1 / 60);
      const g = grab(canvas, w, h);
      const blob = await new Promise<Blob>((r) => g.canvas.toBlob((b) => r(b!), 'image/webp', 0.86));
      await save(name, blob);
    },
    async gif(seconds: number, name = 'neon-tanks-preview.gif', w = 480, h = 270, fps = 15): Promise<number> {
      const enc = GIFEncoder();
      const frames = Math.round(seconds * fps);
      for (let i = 0; i < frames; i++) {
        run(game, 1 / fps);
        const data = grab(canvas, w, h).getImageData(0, 0, w, h).data;
        const palette = quantize(data, 256);
        enc.writeFrame(applyPalette(data, palette), w, h, { palette, delay: Math.round(1000 / fps) });
      }
      enc.finish();
      const bytes = enc.bytes();
      await save(name, bytes);
      return bytes.length;
    },
  };
  (window as unknown as { __capture: typeof api }).__capture = api;
}
