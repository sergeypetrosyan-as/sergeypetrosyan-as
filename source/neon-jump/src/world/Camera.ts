import type { World } from './World';

/** Side-scrolling camera: leads in the facing direction, eases vertically, never shows past the level. */
export class Camera {
  x = 0;
  y = 0;
  w = 480;
  h = 270;
  private lead = 0;

  private target(world: World): [number, number] {
    const p = world.player;
    return [p.cx + this.lead - this.w / 2, p.y - this.h * 0.56];
  }

  private clamp(world: World): void {
    const lv = world.level;
    const left = world.cameraLock ? world.cameraLock.left : 0;
    const right = world.cameraLock ? world.cameraLock.right : lv.pxW;
    this.x = Math.max(left, Math.min(right - this.w, this.x));
    if (right - left < this.w) this.x = (left + right - this.w) / 2;
    const maxY = lv.pxH - this.h;
    this.y = maxY < 0 ? maxY : Math.max(0, Math.min(maxY, this.y));
  }

  snap(world: World): void {
    this.lead = world.player.face * 30;
    [this.x, this.y] = this.target(world);
    this.clamp(world);
  }

  update(dt: number, world: World): void {
    const p = world.player;
    const want = p.face * 30 + p.vx * 0.12;
    this.lead += (want - this.lead) * (1 - Math.exp(-dt * 2.5));
    const [tx, ty] = this.target(world);
    this.x += (tx - this.x) * (1 - Math.exp(-dt * 7));
    // Vertical: gentle when rising (keeps precision jumps calm), quicker when falling.
    const rate = ty > this.y ? (p.vy > 300 ? 9 : 5) : 3.2;
    this.y += (ty - this.y) * (1 - Math.exp(-dt * rate));
    this.clamp(world);
  }
}
