import * as THREE from 'three';
import { WEAPONS } from '../sim/content.ts';
import type { SimEvent } from '../sim/events.ts';
import type { WeaponId } from '../sim/types.ts';
import type { World } from '../sim/world.ts';
import { ArenaView } from './ArenaView.ts';
import { Effects, WEAPON_COLOR } from './Effects.ts';
import { PALETTE, timeUniform } from './materials.ts';
import type { Renderer3D } from './Renderer3D.ts';
import { TankView } from './TankView.ts';

/** Everything visible during a match: arena, tanks, effects and lighting. */
export class MatchScene {
  readonly scene = new THREE.Scene();
  readonly arena: ArenaView;
  readonly views: TankView[];
  readonly fx: Effects;
  private readonly sun: THREE.DirectionalLight;
  private readonly world: World;

  constructor(world: World, r: Renderer3D) {
    this.world = world;
    const q = r.preset;
    const a = world.arena;
    this.scene.fog = new THREE.FogExp2(a.fog.color, a.fog.density);
    this.scene.background = new THREE.Color(a.sky.bottom);

    const hemi = new THREE.HemisphereLight(0x8fa8ff, 0x1a1030, 1.15);
    this.scene.add(hemi);
    this.sun = new THREE.DirectionalLight(a.id === 'docks' ? 0x9fc4ff : 0xc8a8ff, 1.5);
    this.sun.position.set(-50, 90, -35);
    this.sun.castShadow = q.shadows;
    if (q.shadows) {
      this.sun.shadow.mapSize.set(q.shadowMap, q.shadowMap);
      const sc = this.sun.shadow.camera;
      const ext = a.half + 6;
      sc.left = -ext; sc.right = ext; sc.top = ext; sc.bottom = -ext; sc.near = 10; sc.far = 260;
      this.sun.shadow.bias = -0.0005;
      this.sun.shadow.normalBias = 0.05;
    }
    this.scene.add(this.sun, this.sun.target);
    const rim = new THREE.DirectionalLight(a.id === 'docks' ? 0xff4fc8 : 0x4fd8ff, 0.55);
    rim.position.set(60, 30, 50);
    this.scene.add(rim);

    this.arena = new ArenaView(a, r.env, q, world.mode === 'cp');
    this.scene.add(this.arena.group);

    const pid = world.player ? world.player.id : -1;
    this.views = world.tanks.map((t) => new TankView(t, pid, r.env, q.shadows));
    for (const v of this.views) this.scene.add(v.model.root);

    this.fx = new Effects(900, q.maxLights > 0 ? 3 : 0);
    this.fx.setParticleLimit(q.particles);
    this.scene.add(this.fx.group);
  }

  /** Visual reaction to one sim event. */
  handle(e: SimEvent): void {
    const w = this.world;
    switch (e.type) {
      case 'fire': {
        const kind = WEAPONS[e.kind as WeaponId].projectile;
        this.fx.muzzle(e.x, e.y, e.z, e.x2, e.y2, e.z2, kind);
        break;
      }
      case 'charge': {
        const t = w.tanks[e.a];
        t.muzzle(_m);
        this.fx.flash(_m.x, _m.y, _m.z, WEAPON_COLOR.rail, 1.6, WEAPONS.rail.charge, 1.4);
        break;
      }
      case 'beam':
        this.fx.beam(e.x, e.y, e.z, e.x2, e.y2, e.z2, WEAPON_COLOR.rail, 0.09, 0.45);
        this.fx.beam(e.x, e.y, e.z, e.x2, e.y2, e.z2, 0x6fdcff, 0.35, 0.3);
        break;
      case 'impact': {
        const kind = WEAPONS[e.kind as WeaponId].projectile;
        this.fx.impact(e.x, e.y, e.z, e.x2, e.y2, e.z2, kind, e.a >= 0);
        if (e.a >= 0) this.views[e.a].onHit();
        break;
      }
      case 'explode': {
        if (e.kind === 'shockwave') {
          const t = w.tanks[e.a];
          this.fx.shockwave(t.x, t.y, t.z);
        } else {
          const ground = w.collision.surfaceHeight(e.x, e.z, e.y + 0.5);
          this.fx.explosion(e.x, e.y, e.z, e.value, WEAPON_COLOR.nova, e.y - ground < 1.2 ? ground : null);
        }
        break;
      }
      case 'kill': {
        const v = this.views[e.a];
        v.onDestroyed();
        this.fx.tankDestroyed(e.x, e.y, e.z, v.accentColor);
        break;
      }
      case 'spawn': {
        const t = w.tanks[e.a];
        this.fx.spawnBeam(t.x, t.y, t.z, this.views[e.a].accentColor);
        break;
      }
      case 'pickup': {
        const color = e.kind === 'repair' ? PALETTE.green : e.kind === 'overdrive' ? PALETTE.amber : PALETTE.cyan;
        this.fx.pickupBurst(e.x, e.y, e.z, color);
        break;
      }
      case 'capture': {
        const cp = w.arena.controlPoint;
        this.fx.ring(cp.x, cp.y + 0.2, cp.z, e.kind === 'blue' ? PALETTE.blue : PALETTE.magenta, cp.r * 1.4, 0.9);
        this.fx.flash(cp.x, cp.y + 4, cp.z, e.kind === 'blue' ? PALETTE.blue : PALETTE.magenta, 12, 0.6);
        break;
      }
      case 'ability': {
        const t = w.tanks[e.a];
        if (e.kind === 'dash') this.fx.ring(t.x, t.y + 0.8, t.z, 0xffffff, 4, 0.3, false);
        if (e.kind === 'aegis') this.fx.flash(t.x, t.y + 1.5, t.z, 0x7fe9ff, 8, 0.3);
        break;
      }
      default:
        break;
    }
  }

  update(dt: number, time: number): void {
    timeUniform.value = time;
    for (const v of this.views) v.update(dt, time, this.fx);
    this.fx.updateProjectiles(this.world.projectiles.items, dt);
    this.fx.update(dt);
    this.arena.update(time, this.world.mode === 'cp' ? this.world.cp : null, this.world.pickups);
  }

  dispose(): void {
    this.views.forEach((v) => v.dispose());
    this.arena.dispose();
    this.fx.dispose();
    this.sun.shadow.map?.dispose();
    this.scene.clear();
  }
}

const _m = { x: 0, y: 0, z: 0 };
