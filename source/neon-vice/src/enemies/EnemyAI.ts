import * as THREE from 'three';
import type { CollisionWorld, PushResult, RayHit } from '../world/CollisionWorld';
import type { ProjectileSystem } from '../weapons/ProjectileSystem';
import type { Enemy } from './Enemy';

export interface AIContext {
  world: CollisionWorld;
  target: THREE.Vector3;
  targetAlive: boolean;
  targetInVehicle: boolean;
  /** Target velocity, used to lead shots slightly. */
  targetVel: THREE.Vector3;
  projectiles: ProjectileSystem;
  enemies: readonly Enemy[];
  onMelee(enemy: Enemy, damage: number): void;
  onShoot(enemy: Enemy): void;
}

const _push: PushResult = { hit: false, nx: 0, nz: 0 };
const _hit: RayHit = { dist: 0, nx: 0, ny: 0, nz: 0 };
const _flow = { x: 0, z: 0 };
const _from = new THREE.Vector3();
const _to = new THREE.Vector3();

/**
 * Lightweight steering AI. Each enemy periodically checks line of sight; when
 * the player is hidden it follows the shared BFS flow field, otherwise:
 *  - Enforcers rush in and swing (telegraphed wind-up → hit check on impact).
 *  - Gunners hold a distance band, strafe, and fire telegraphed energy bolts.
 */
export function updateEnemy(e: Enemy, dt: number, ctx: AIContext): void {
  e.age += dt;
  if (!e.alive) {
    e.velocity.multiplyScalar(Math.max(0, 1 - dt * 6));
    e.position.addScaledVector(e.velocity, dt);
    return;
  }
  const t = ctx.target;
  const dx = t.x - e.position.x, dz = t.z - e.position.z;
  const dist = Math.hypot(dx, dz);
  const ux = dx / (dist || 1), uz = dz / (dist || 1);

  // Line of sight is relatively expensive: sample a few times a second.
  e.losTimer -= dt;
  if (e.losTimer <= 0) {
    e.losTimer = 0.25 + Math.random() * 0.1;
    const visible = ctx.targetAlive && dist < 65 &&
      ctx.world.lineOfSight(e.position.x, e.position.y + 1.5, e.position.z, t.x, t.y + 1.2, t.z, _hit);
    e.seesPlayer = visible;
  }

  let wantX = 0, wantZ = 0;
  const speed = e.def.speed * e.speedScale;
  const engaged = e.seesPlayer && ctx.targetAlive;

  if (!ctx.targetAlive) {
    // Player down: idle patrol drift.
    wantX = Math.sin(e.age * 0.4 + e.strafeDir) * 0.3;
    wantZ = Math.cos(e.age * 0.3) * 0.3;
  } else if (e.def.kind === 'enforcer') {
    const reach = e.def.attackRange + (ctx.targetInVehicle ? 1.2 : 0);
    if (dist > reach * 0.8) {
      if (engaged && dist < 24) { wantX = ux; wantZ = uz; }
      else if (ctx.world.nav.steer(e.position.x, e.position.z, _flow)) { wantX = _flow.x; wantZ = _flow.z; }
      else { wantX = ux; wantZ = uz; }
    }
    e.attackTimer -= dt;
    if (dist < reach && e.attackTimer <= 0 && e.swing === 0 && e.age > 0.6) {
      e.swing = 0.001;
      e.attackTimer = e.def.cooldown;
      e.aimTimer = 0.32; // impact lands mid-swing
    }
    if (e.aimTimer > 0) {
      e.aimTimer -= dt;
      if (e.aimTimer <= 0 && dist < reach + 0.5) ctx.onMelee(e, e.def.damage * e.dmgScale);
    }
  } else {
    // Gunner
    e.strafeTimer -= dt;
    if (e.strafeTimer <= 0) { e.strafeDir *= -1; e.strafeTimer = 1.4 + Math.random() * 2; }
    if (!engaged || dist > e.def.maxRange) {
      if (ctx.world.nav.steer(e.position.x, e.position.z, _flow)) { wantX = _flow.x; wantZ = _flow.z; }
      else { wantX = ux; wantZ = uz; }
    } else if (dist < e.def.minRange) {
      wantX = -ux * 0.9 + -uz * e.strafeDir * 0.4;
      wantZ = -uz * 0.9 + ux * e.strafeDir * 0.4;
    } else {
      wantX = -uz * e.strafeDir * 0.6;
      wantZ = ux * e.strafeDir * 0.6;
    }
    e.attackTimer -= dt;
    if (engaged && dist < e.def.attackRange && e.age > 1) {
      if (e.attackTimer <= 0 && e.aimTimer <= 0) {
        e.aimTimer = 0.45; // telegraph: visor flares, then fire
        e.character.setNeon(0xffffff);
      }
    }
    if (e.aimTimer > 0) {
      e.aimTimer -= dt;
      wantX *= 0.2; wantZ *= 0.2;
      if (e.aimTimer <= 0) {
        e.character.setNeon(e.def.look.neon);
        e.attackTimer = e.def.cooldown * (0.8 + Math.random() * 0.5);
        if (e.seesPlayer) fireBolt(e, ctx, dist);
      }
    }
  }

  // Separation from other enemies.
  for (const o of ctx.enemies) {
    if (o === e || !o.alive) continue;
    const sx = e.position.x - o.position.x, sz = e.position.z - o.position.z;
    const d2 = sx * sx + sz * sz;
    if (d2 < 1.6 && d2 > 1e-6) {
      const d = Math.sqrt(d2);
      wantX += (sx / d) * (1.3 - d);
      wantZ += (sz / d) * (1.3 - d);
    }
  }

  const wl = Math.hypot(wantX, wantZ);
  if (wl > 1) { wantX /= wl; wantZ /= wl; }
  if (e.stagger > 0) { e.stagger -= dt; wantX *= 0.15; wantZ *= 0.15; }
  if (e.swing > 0) { wantX *= 0.3; wantZ *= 0.3; }

  const accel = 18 * dt;
  const tvx = wantX * speed - e.velocity.x, tvz = wantZ * speed - e.velocity.z;
  const tl = Math.hypot(tvx, tvz);
  if (tl > 0) {
    const k = Math.min(1, accel / tl);
    e.velocity.x += tvx * k;
    e.velocity.z += tvz * k;
  }
  e.position.x += e.velocity.x * dt;
  e.position.z += e.velocity.z * dt;
  ctx.world.resolveCircle(e.position, e.def.radius, 0.45, 1.8, _push);
  if (_push.hit) {
    const vn = e.velocity.x * _push.nx + e.velocity.z * _push.nz;
    if (vn < 0) { e.velocity.x -= vn * _push.nx; e.velocity.z -= vn * _push.nz; }
  }

  // Face the player when engaging, otherwise the direction of travel.
  let face = e.facing;
  if (engaged || (e.def.kind === 'enforcer' && dist < 4)) face = Math.atan2(ux, uz);
  else if (Math.hypot(e.velocity.x, e.velocity.z) > 0.5) face = Math.atan2(e.velocity.x, e.velocity.z);
  let d = face - e.facing;
  d = Math.atan2(Math.sin(d), Math.cos(d));
  e.facing += d * Math.min(1, dt * 10);
}

function fireBolt(e: Enemy, ctx: AIContext, dist: number): void {
  e.character.muzzle.getWorldPosition(_from);
  // Fall back to chest height if the arm is mid-animation and the muzzle is low.
  if (_from.y < 0.9) _from.set(e.position.x + Math.sin(e.facing) * 0.6, 1.4, e.position.z + Math.cos(e.facing) * 0.6);
  const lead = Math.min(0.5, dist / 30);
  const spread = 0.35 + dist * 0.035;
  _to.set(
    ctx.target.x + ctx.targetVel.x * lead + (Math.random() - 0.5) * spread,
    ctx.target.y + (ctx.targetInVehicle ? 0.8 : 1.15) + (Math.random() - 0.5) * spread * 0.5,
    ctx.target.z + ctx.targetVel.z * lead + (Math.random() - 0.5) * spread,
  );
  ctx.projectiles.fire(_from, _to, 30, e.def.damage * e.dmgScale);
  e.kick = 1;
  ctx.onShoot(e);
}
