import * as THREE from 'three';
import { buildCarModel, type CarModel } from './CarModel';

interface TrafficCar {
  model: CarModel;
  /** Distance along the loop. */
  s: number;
  speed: number;
  cruise: number;
  loop: Loop;
  stunned: number;
  x: number;
  z: number;
  heading: number;
  honk: number;
}

/** Rounded-rectangle lane around the ring road. */
class Loop {
  readonly perimeter: number;
  private readonly straight: number;
  private readonly arc: number;

  constructor(private readonly half: number, private readonly radius: number, readonly dir: 1 | -1) {
    this.straight = (half - radius) * 2;
    this.arc = (Math.PI / 2) * radius;
    this.perimeter = 4 * (this.straight + this.arc);
  }

  /** Writes position + heading at distance s (counter-clockwise when dir = 1 seen from above with +z down). */
  sample(s: number, out: { x: number; z: number; heading: number }): void {
    const h = this.half, r = this.radius, L = this.straight, A = this.arc;
    let d = ((s % this.perimeter) + this.perimeter) % this.perimeter;
    if (this.dir < 0) d = this.perimeter - d;
    const seg = L + A;
    const side = Math.floor(d / seg);
    const t = d - side * seg;
    // Each side: straight run, then a quarter turn. Base frame for side 0 runs +z along x = +h.
    let x: number, z: number, ang: number;
    if (t < L) {
      x = h;
      z = -(h - r) + t;
      ang = 0; // heading +z
    } else {
      const a = (t - L) / r; // 0..π/2
      x = h - r + Math.cos(a) * r;
      z = h - r + Math.sin(a) * r;
      ang = -a; // turning toward -x
    }
    // Rotate the frame by side * 90° (clockwise around +y viewed from above).
    const rot = -side * (Math.PI / 2);
    const c = Math.cos(rot), sn = Math.sin(rot);
    out.x = x * c + z * sn;
    out.z = -x * sn + z * c;
    out.heading = ang + rot + (this.dir < 0 ? Math.PI : 0);
  }
}

const _p = { x: 0, z: 0, heading: 0 };

/**
 * Background traffic cruising the ring road in both directions. Cars brake for
 * anything ahead (player, enemies, the player's car) and get knocked out of the
 * way briefly when rammed. Their hulls are exposed as circles for collision.
 */
export class TrafficSystem {
  readonly group = new THREE.Group();
  private readonly cars: TrafficCar[] = [];
  private readonly loops = [new Loop(101.75, 9, 1), new Loop(98.25, 6, -1)];

  constructor(count: number) {
    const colors = [0x2a6a9a, 0x8a2a4a, 0xd0d0d8, 0x3a3a48, 0x1a5a4a, 0x9a6a2a, 0x5a2a8a];
    for (let i = 0; i < count; i++) {
      const loop = this.loops[i % 2];
      const model = buildCarModel(i % 3 === 0 ? 'taxi' : 'sedan', colors[i % colors.length], 0, false);
      this.group.add(model.group);
      const cruise = 9 + Math.random() * 4;
      this.cars.push({ model, s: (i / count) * loop.perimeter + Math.random() * 20, speed: cruise, cruise, loop, stunned: 0, x: 0, z: 0, heading: 0, honk: 0 });
    }
    this.update(0, []);
  }

  get count(): number {
    return this.cars.length;
  }

  /** Obstacles: anything the cars should stop for. */
  update(dt: number, obstacles: Array<{ x: number; z: number }>): void {
    for (const car of this.cars) {
      car.honk = Math.max(0, car.honk - dt);
      if (car.stunned > 0) {
        car.stunned -= dt;
        car.speed = 0;
      } else {
        const fx = Math.sin(car.heading), fz = Math.cos(car.heading);
        let blocked = false;
        for (const o of obstacles) {
          const dx = o.x - car.x, dz = o.z - car.z;
          const ahead = dx * fx + dz * fz;
          const side = Math.abs(dx * fz - dz * fx);
          if (ahead > 0 && ahead < 9 && side < 2.2) { blocked = true; break; }
        }
        for (const other of this.cars) {
          if (other === car) continue;
          const dx = other.x - car.x, dz = other.z - car.z;
          const ahead = dx * fx + dz * fz;
          const side = Math.abs(dx * fz - dz * fx);
          if (ahead > 0 && ahead < 8 && side < 1.6) { blocked = true; break; }
        }
        const target = blocked ? 0 : car.cruise;
        car.speed += (target - car.speed) * Math.min(1, dt * (blocked ? 5 : 1.2));
        if (blocked && car.honk <= 0) car.honk = -1; // signal: wants to honk
      }
      car.s += car.speed * dt;
      car.loop.sample(car.s, _p);
      car.x = _p.x;
      car.z = _p.z;
      car.heading = _p.heading;
      car.model.group.position.set(car.x, 0, car.z);
      car.model.group.rotation.y = car.heading;
      const spin = (car.speed / 0.37) * dt;
      for (const w of car.model.wheels) w.rotation.x += spin;
      const b = car.speed < 1 ? 2.6 : 1;
      car.model.tailMat.color.setRGB(b, b * 0.04, b * 0.1);
    }
  }

  /** Returns true (once per cooldown) when a blocked car wants to honk, with its position. */
  takeHonk(out: { x: number; z: number }): boolean {
    for (const car of this.cars) {
      if (car.honk < 0) {
        car.honk = 4;
        out.x = car.x;
        out.z = car.z;
        return true;
      }
    }
    return false;
  }

  /** Visits each car's hull circles (front/centre/back). */
  forEachHull(fn: (x: number, z: number, r: number, index: number) => void): void {
    this.cars.forEach((car, i) => {
      const fx = Math.sin(car.heading), fz = Math.cos(car.heading);
      for (const o of [-1.4, 0, 1.4]) fn(car.x + fx * o, car.z + fz * o, 1.0, i);
    });
  }

  knock(index: number): void {
    this.cars[index].stunned = 3;
  }

  setVisibleCount(n: number): void {
    this.cars.forEach((c, i) => (c.model.group.visible = i < n));
  }
}
