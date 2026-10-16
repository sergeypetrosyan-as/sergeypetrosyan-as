import type { Controls } from '../entities/Player';
import { STEP } from '../game/Config';
import { LEVELS } from '../world/levels';
import { World } from '../world/World';

/**
 * Dev-only helpers for scripted, deterministic play-testing from the console
 * (`__pt.sim(world, frames, f => ({ right: true }))`). Never part of a production build.
 */
const controls = (o: Partial<Controls> = {}): Controls => ({
  left: false, right: false, down: false, jump: false, jumpPressed: false, sprint: false, interactPressed: false, ...o,
});

export const playtest = {
  LEVELS,
  World,
  controls,
  world: (i: number) => new World(LEVELS[i]),
  /** Steps the simulation; returns the event types that fired. Respawns automatically. */
  sim(w: World, frames: number, fn?: (f: number, w: World) => Partial<Controls>): string[] {
    const ev: string[] = [];
    for (let f = 0; f < frames; f++) {
      w.update(STEP, controls(fn ? fn(f, w) : {}));
      for (const e of w.events) {
        ev.push(e.type);
        if (e.type === 'respawn-ready') w.respawn();
      }
      w.events.length = 0;
    }
    return ev;
  },
  /** Stands Vee on the top of tile row `ty`, column `tx`. */
  place(w: World, tx: number, ty: number): void {
    w.player.x = tx * 16 + 3;
    w.player.y = ty * 16 - w.player.h;
    w.player.vx = w.player.vy = 0;
    w.camera.snap(w);
  },
};
