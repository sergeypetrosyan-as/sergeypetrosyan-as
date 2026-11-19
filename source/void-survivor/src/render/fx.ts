// Visual effects state: debris particles, damage numbers, rings, beams, shockwaves, light flares, shake and banners.
// Purely cosmetic and driven by sim events; it uses Math.random so it never touches the deterministic sim.
import { ENEMY_DEFS } from '../sim/enemies.ts';
import type { EnemyKind, World } from '../sim/types.ts';
import type { Settings } from '../storage/save.ts';
import { C } from './theme.ts';

export interface Particle {
  alive: boolean;
  x: number;
  y: number;
  /** height above the floor (3D only) */
  z: number;
  vx: number;
  vy: number;
  vz: number;
  /** tumble angles (3D only) */
  rx: number;
  ry: number;
  spin: number;
  life: number;
  max: number;
  size: number;
  color: string;
  /** 0 spark (hot, emissive), 1 debris (armour/crystal chunk) */
  kind: number;
}
export interface Pop {
  x: number;
  y: number;
  text: string;
  life: number;
  color: string;
  big: boolean;
}
export interface Ring {
  x: number;
  y: number;
  r: number;
  grow: number;
  life: number;
  max: number;
  color: string;
  w: number;
}
export interface Beam {
  pts: number[];
  life: number;
  max: number;
  color: string;
  w: number;
  jagged: boolean;
}
export interface Shock {
  x: number;
  y: number;
  r: number;
  maxR: number;
  life: number;
  max: number;
}
/** A short-lived light source for the 3D renderer's point-light pool. */
export interface Flare {
  x: number;
  y: number;
  h: number;
  color: string;
  power: number;
  life: number;
  max: number;
  range: number;
}

export const MAX_PARTICLES = 700;
const MAX_POPS = 40;
const MAX_RINGS = 40;
const MAX_BEAMS = 24;
const MAX_FLARES = 12;

export class Fx {
  particles: Particle[] = [];
  private pi = 0;
  pops: Pop[] = [];
  rings: Ring[] = [];
  beams: Beam[] = [];
  shocks: Shock[] = [];
  flares: Flare[] = [];
  trauma = 0;
  flash = 0;
  flashColor = '#ffffff';
  banner = '';
  bannerLife = 0;
  bannerColor = '#ffffff';
  slow = 0;
  kills = 0;
  /** field pulse after absorbing a bolt (0..1) */
  fieldPulse = 0;
  /** particle budget multiplier set from the quality preset */
  budget = 1;

  constructor() {
    for (let i = 0; i < MAX_PARTICLES; i++)
      this.particles.push({ alive: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, rx: 0, ry: 0, spin: 0, life: 0, max: 1, size: 2, color: '#ffffff', kind: 0 });
  }

  reset(): void {
    for (const p of this.particles) p.alive = false;
    this.pops.length = 0;
    this.rings.length = 0;
    this.beams.length = 0;
    this.shocks.length = 0;
    this.flares.length = 0;
    this.trauma = 0;
    this.flash = 0;
    this.bannerLife = 0;
    this.slow = 0;
    this.fieldPulse = 0;
  }

  burst(x: number, y: number, n: number, color: string, speed: number, life = 0.5, size = 2.5, kind = 0, z = 8): void {
    const count = Math.max(n > 0 ? 1 : 0, Math.round(n * this.budget));
    for (let i = 0; i < count; i++) {
      const p = this.particles[this.pi];
      this.pi = (this.pi + 1) % MAX_PARTICLES;
      const a = Math.random() * Math.PI * 2;
      const s = speed * (0.3 + Math.random() * 0.7);
      p.alive = true;
      p.x = x;
      p.y = y;
      p.z = z;
      p.vx = Math.cos(a) * s;
      p.vy = Math.sin(a) * s;
      p.vz = (kind === 1 ? 140 : 60) + Math.random() * speed * 0.7;
      p.rx = Math.random() * 6.28;
      p.ry = Math.random() * 6.28;
      p.spin = (Math.random() - 0.5) * 18;
      p.life = p.max = life * (0.6 + Math.random() * 0.6);
      p.size = size * (0.6 + Math.random() * 0.8);
      p.color = color;
      p.kind = kind;
    }
  }

  /** A single slow ember, used for dash trails. */
  ember(x: number, y: number, color: string): void {
    const p = this.particles[this.pi];
    this.pi = (this.pi + 1) % MAX_PARTICLES;
    p.alive = true;
    p.x = x + (Math.random() - 0.5) * 8;
    p.y = y + (Math.random() - 0.5) * 8;
    p.z = 6 + Math.random() * 8;
    p.vx = (Math.random() - 0.5) * 30;
    p.vy = (Math.random() - 0.5) * 30;
    p.vz = 20 + Math.random() * 40;
    p.rx = p.ry = 0;
    p.spin = 0;
    p.life = p.max = 0.35 + Math.random() * 0.2;
    p.size = 2.2;
    p.color = color;
    p.kind = 0;
  }

  ring(x: number, y: number, r: number, grow: number, life: number, color: string, w = 3): void {
    if (this.rings.length >= MAX_RINGS) this.rings.shift();
    this.rings.push({ x, y, r, grow, life, max: life, color, w });
  }

  beam(pts: number[], life: number, color: string, w: number, jagged = false): void {
    if (this.beams.length >= MAX_BEAMS) this.beams.shift();
    this.beams.push({ pts, life, max: life, color, w, jagged });
  }

  flare(x: number, y: number, color: string, power: number, life: number, range = 600, h = 90): void {
    if (this.flares.length >= MAX_FLARES) this.flares.shift();
    this.flares.push({ x, y, h, color, power, life, max: life, range });
  }

  shock(x: number, y: number, maxR: number, life = 0.55): void {
    if (this.shocks.length >= 4) this.shocks.shift();
    this.shocks.push({ x, y, r: 0, maxR, life, max: life });
  }

  pop(x: number, y: number, text: string, color: string, big = false): void {
    if (this.pops.length >= MAX_POPS) this.pops.shift();
    this.pops.push({ x: x + (Math.random() - 0.5) * 14, y: y - 8, text, life: 0.7, color, big });
  }

  announce(text: string, color = '#ffffff', life = 2.2): void {
    this.banner = text;
    this.bannerLife = life;
    this.bannerColor = color;
  }

  handle(w: World, s: Settings): void {
    const calm = s.reducedFlash;
    const k = calm ? 0.5 : 1;
    const shake = (v: number) => {
      if (s.shake) this.trauma = Math.min(1, this.trauma + v);
    };
    for (const ev of w.events) {
      switch (ev.t) {
        case 'hit': {
          this.burst(ev.x, ev.y, 3, C.bone, 120, 0.25, 2, 0, 12);
          if (s.numbers && (ev.a ?? 0) >= 1 && (this.pops.length < 24 || Math.random() < 0.4)) this.pop(ev.x, ev.y, String(Math.round(ev.a ?? 0)), C.bone);
          break;
        }
        case 'kill': {
          const kind = (ev.s as EnemyKind) ?? 'swarm';
          const col = ENEMY_DEFS[kind]?.color ?? C.red;
          const n = (ev.b ? 20 : 8) * k;
          this.burst(ev.x, ev.y, Math.round(n * 0.6), col, 200, 0.9, kind === 'cleaver' ? 5 : 3.5, 1, 12);
          this.burst(ev.x, ev.y, Math.round(n * 0.5), col, 240, 0.4, 2.2, 0, 12);
          if ((ev.a ?? 0) > 30) this.ring(ev.x, ev.y, 10, 260, 0.5, col, 4);
          break;
        }
        case 'hurt':
          shake(0.45);
          if (!calm && !ev.b) this.flash = Math.max(this.flash, 0.25);
          this.flashColor = C.red;
          this.burst(w.player.x, w.player.y, 14, C.red, 200, 0.5, 3, 0, 14);
          this.flare(w.player.x, w.player.y, C.red, 0.8, 0.25, 400, 60);
          break;
        case 'mote':
          this.burst(ev.x, ev.y, 2, C.rose, 60, 0.25, 2);
          break;
        case 'shard':
          this.burst(ev.x, ev.y, 6, C.rose, 120, 0.4, 2.5);
          this.pop(ev.x, ev.y, '+1 shard', C.rose, true);
          break;
        case 'chest':
          this.burst(ev.x, ev.y, 24, C.rose, 220, 0.7, 3);
          this.ring(ev.x, ev.y, 10, 220, 0.6, C.rose);
          this.flare(ev.x, ev.y, C.rose, 1.2, 0.6, 500);
          this.announce('Chest opened', C.rose, 1.6);
          break;
        case 'levelup':
          this.burst(w.player.x, w.player.y, Math.round(40 * k), C.tan, 260, 0.8, 3, 0, 16);
          this.ring(w.player.x, w.player.y, 10, 380, 0.7, C.bone, 5);
          this.flare(w.player.x, w.player.y, C.bone, 1, 0.6, 500);
          break;
        case 'fieldUp':
          this.ring(ev.x, ev.y, 20, 240, 0.4, C.bone);
          this.flare(ev.x, ev.y, C.bone, 0.8, 0.4, 500);
          break;
        case 'fieldBreak':
          this.burst(ev.x, ev.y, Math.round(24 * k), C.tan, 280, 0.6, 3, 0, 20);
          shake(0.2);
          break;
        case 'absorb':
          this.burst(ev.x, ev.y, 4, C.bone, 120, 0.3, 2, 0, 12);
          this.fieldPulse = Math.min(1, this.fieldPulse + 0.35);
          break;
        case 'detonate': {
          const r = ev.a ?? 100;
          this.ring(ev.x, ev.y, 10, r * 3.2, 0.45, C.blush, 8);
          this.ring(ev.x, ev.y, 10, r * 2.2, 0.35, C.bone, 4);
          this.burst(ev.x, ev.y, Math.round(60 * k), C.tan, 420, 0.8, 3.5, 0, 16);
          this.flare(ev.x, ev.y, C.blush, calm ? 2 : 4, 0.5, r * 2.4, 120);
          if (!calm) this.shock(ev.x, ev.y, r * 1.4);
          shake(Math.min(0.9, 0.3 + r / 500));
          if (!calm) {
            this.flash = Math.max(this.flash, 0.3);
            this.flashColor = C.blush;
          }
          break;
        }
        case 'beam':
          this.beam([ev.x, ev.y, ev.a ?? ev.x, ev.b ?? ev.y], 0.16, C.bone, 6);
          break;
        case 'arc':
          if (ev.pts) this.beam(ev.pts, 0.22, C.blush, 3, true);
          break;
        case 'shieldBlock':
          this.burst(ev.x, ev.y, 4, C.tan, 140, 0.2, 2, 0, 12);
          break;
        case 'telegraph':
          break;
        case 'pool':
          this.ring(ev.x, ev.y, 10, 120, 0.5, C.ember);
          break;
        case 'lane':
          shake(0.05);
          break;
        case 'bossWarn':
          this.announce(ev.s === 'FINAL WARDEN' ? 'Warning: the Final Warden' : 'Warning: Core Warden inbound', C.red, 3);
          shake(0.4);
          break;
        case 'bossPhase':
          this.announce('The Warden opens up', C.red, 2);
          this.ring(ev.x, ev.y, 20, 500, 0.6, C.red, 6);
          this.flare(ev.x, ev.y, C.red, 2.5, 0.7, 900, 140);
          shake(0.5);
          break;
        case 'bossDown':
          this.announce('Warden down', C.bone, 3);
          this.burst(ev.x, ev.y, Math.round(150 * k), C.bone, 520, 1.1, 4, 1, 30);
          this.ring(ev.x, ev.y, 10, 700, 0.8, C.blush, 8);
          this.flare(ev.x, ev.y, C.blush, calm ? 2.5 : 5, 1.1, 1200, 160);
          if (!calm) this.shock(ev.x, ev.y, 520, 0.8);
          shake(0.9);
          this.slow = 0.5;
          break;
        case 'wave':
          if ((ev.a ?? 1) > 1) this.announce(`Wave ${ev.a}`, C.bone, 2);
          break;
        case 'chain':
          this.burst(w.player.x, w.player.y, 12, C.tan, 200, 0.5, 2.5, 0, 16);
          this.pop(w.player.x, w.player.y - 30, `Chain ×${ev.a}`, C.blush, true);
          break;
        case 'dead':
          this.burst(ev.x, ev.y, Math.round(80 * k), C.bone, 360, 1, 3.5, 1, 14);
          this.flare(ev.x, ev.y, C.bone, 2, 0.8, 700);
          shake(0.8);
          this.slow = 0.8;
          break;
        case 'win':
          this.announce('Victory', C.bone, 3);
          break;
        default:
          break;
      }
    }
  }

  update(dt: number): void {
    const g = 620 * dt;
    for (const p of this.particles) {
      if (!p.alive) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.alive = false;
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      const drag = p.z > 0.5 ? 1 - 2 * dt : 1 - 7 * dt;
      p.vx *= drag;
      p.vy *= drag;
      p.vz -= p.kind === 1 ? g : g * 0.35;
      p.z += p.vz * dt;
      if (p.z < 0) {
        p.z = 0;
        p.vz = -p.vz * 0.32;
        p.spin *= 0.5;
      }
      p.rx += p.spin * dt;
      p.ry += p.spin * 0.7 * dt;
    }
    for (let i = this.pops.length - 1; i >= 0; i--) {
      const p = this.pops[i];
      p.life -= dt;
      p.y -= 40 * dt;
      if (p.life <= 0) this.pops.splice(i, 1);
    }
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.life -= dt;
      r.r += r.grow * dt;
      if (r.life <= 0) this.rings.splice(i, 1);
    }
    for (let i = this.beams.length - 1; i >= 0; i--) {
      this.beams[i].life -= dt;
      if (this.beams[i].life <= 0) this.beams.splice(i, 1);
    }
    for (let i = this.shocks.length - 1; i >= 0; i--) {
      const s = this.shocks[i];
      s.life -= dt;
      s.r = s.maxR * Math.sqrt(1 - Math.max(0, s.life) / s.max);
      if (s.life <= 0) this.shocks.splice(i, 1);
    }
    for (let i = this.flares.length - 1; i >= 0; i--) {
      this.flares[i].life -= dt;
      if (this.flares[i].life <= 0) this.flares.splice(i, 1);
    }
    this.trauma = Math.max(0, this.trauma - 3 * dt);
    this.flash = Math.max(0, this.flash - 2.5 * dt);
    this.fieldPulse = Math.max(0, this.fieldPulse - 3 * dt);
    if (this.bannerLife > 0) this.bannerLife -= dt;
    if (this.slow > 0) this.slow -= dt;
  }
}
