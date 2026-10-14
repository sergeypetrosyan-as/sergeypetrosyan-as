import * as THREE from 'three';
import { PALETTE } from './GameConfig';
import { additive, createGlowTexture } from '../world/Materials';

export type PickupKind = 'health' | 'ammo' | 'armor' | 'boost' | 'cash';

interface Pickup {
  kind: PickupKind;
  group: THREE.Group;
  icon: THREE.Mesh;
  ring: THREE.Mesh;
  life: number;
  active: boolean;
  phase: number;
}

const COLORS: Record<PickupKind, number> = {
  health: PALETTE.green,
  ammo: PALETTE.cyan,
  armor: PALETTE.blue,
  boost: PALETTE.orange,
  cash: PALETTE.pink,
};

export const PICKUP_LABEL: Record<PickupKind, string> = {
  health: '+40 HEALTH',
  ammo: '+RIFLE AMMO',
  armor: '+25 ARMOR',
  boost: 'DAMAGE BOOST',
  cash: '+CASH',
};

/** Floating, spinning drops with a ground glow. Pooled; despawn after 20 s. */
export class Pickups {
  readonly group = new THREE.Group();
  private readonly items: Pickup[] = [];

  constructor() {
    const glow = createGlowTexture(64);
    const geos: Record<PickupKind, THREE.BufferGeometry> = {
      health: mergeCross(),
      ammo: new THREE.BoxGeometry(0.3, 0.42, 0.18),
      armor: new THREE.OctahedronGeometry(0.28, 0),
      boost: new THREE.TetrahedronGeometry(0.32, 0),
      cash: new THREE.CylinderGeometry(0.22, 0.22, 0.06, 12).rotateX(Math.PI / 2),
    };
    const ringGeo = new THREE.PlaneGeometry(1.6, 1.6).rotateX(-Math.PI / 2);
    for (let i = 0; i < 16; i++) {
      const kind: PickupKind = 'cash';
      const group = new THREE.Group();
      const icon = new THREE.Mesh(geos[kind], new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }));
      const ring = new THREE.Mesh(ringGeo, additive(0xffffff, glow, 0.8));
      ring.position.y = 0.04;
      group.add(icon, ring);
      group.visible = false;
      this.group.add(group);
      this.items.push({ kind, group, icon, ring, life: 0, active: false, phase: Math.random() * 6 });
    }
    this.geos = geos;
  }

  private readonly geos: Record<PickupKind, THREE.BufferGeometry>;

  spawn(kind: PickupKind, x: number, z: number): void {
    const p = this.items.find((it) => !it.active) ?? this.items.reduce((a, b) => (a.life < b.life ? a : b));
    p.kind = kind;
    p.icon.geometry = this.geos[kind];
    const c = new THREE.Color(COLORS[kind]);
    (p.icon.material as THREE.MeshBasicMaterial).color.copy(c).multiplyScalar(2);
    (p.ring.material as THREE.MeshBasicMaterial).color.copy(c);
    p.group.position.set(x, 0, z);
    p.life = 20;
    p.active = true;
    p.group.visible = true;
  }

  /** Animates and returns the kind collected this frame (one per frame at most). */
  update(dt: number, time: number, px: number, pz: number, canCollect: boolean, collectRadius: number): PickupKind | null {
    let collected: PickupKind | null = null;
    for (const p of this.items) {
      if (!p.active) continue;
      p.life -= dt;
      p.icon.position.y = 0.85 + Math.sin(time * 2.4 + p.phase) * 0.12;
      p.icon.rotation.y += dt * 2.2;
      const blink = p.life < 4 ? (Math.sin(time * 14) > 0 ? 1 : 0.2) : 1;
      (p.ring.material as THREE.MeshBasicMaterial).opacity = 0.75 * blink;
      p.icon.visible = blink > 0.5 || p.life >= 4;
      if (p.life <= 0) {
        p.active = false;
        p.group.visible = false;
        continue;
      }
      if (canCollect && !collected) {
        const dx = p.group.position.x - px, dz = p.group.position.z - pz;
        if (dx * dx + dz * dz < collectRadius * collectRadius) {
          collected = p.kind;
          p.active = false;
          p.group.visible = false;
        }
      }
    }
    return collected;
  }

  forEachActive(fn: (x: number, z: number, kind: PickupKind) => void): void {
    for (const p of this.items) if (p.active) fn(p.group.position.x, p.group.position.z, p.kind);
  }

  clear(): void {
    for (const p of this.items) { p.active = false; p.group.visible = false; }
  }
}

function mergeCross(): THREE.BufferGeometry {
  const a = new THREE.BoxGeometry(0.42, 0.13, 0.13);
  const b = new THREE.BoxGeometry(0.13, 0.42, 0.13);
  const pos = [...(a.toNonIndexed().attributes.position.array as Float32Array), ...(b.toNonIndexed().attributes.position.array as Float32Array)];
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  return geo;
}
