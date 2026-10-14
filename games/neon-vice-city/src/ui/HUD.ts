import * as THREE from 'three';
import type { WeaponState } from '../weapons/Weapon';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

interface DamageNumber {
  el: HTMLSpanElement;
  pos: THREE.Vector3;
  life: number;
  vy: number;
}

export interface RadarBlip {
  x: number;
  z: number;
  color: string;
  size: number;
}

const _proj = new THREE.Vector3();

/**
 * DOM HUD. Every setter caches the last value so unchanged state never touches
 * the DOM; per-frame work is limited to transforms on pooled elements.
 */
export class HUD {
  private readonly root = $('hud');
  private readonly els = {
    objective: $('hudObjective'), wave: $('hudWave'), pips: $('wavePips'), enemies: $('hudEnemies'),
    score: $('hudScore'), best: $('hudBest'), combo: $('hudCombo'), comboValue: $('hudComboValue'), comboBar: $('hudComboBar'),
    health: $('hudHealth'), healthGhost: $('hudHealthGhost'), healthNum: $('hudHealthNum'), armor: $('hudArmor'), armorNum: $('hudArmorNum'),
    boost: $('hudBoost'), boostTime: $('hudBoostTime'), boostVignette: $('boostVignette'),
    weaponPanel: $('hudWeaponPanel'), weaponName: $('hudWeaponName'), mag: $('hudMag'), reserve: $('hudReserve'),
    reloadWrap: $('hudReloadWrap'), reload: $('hudReload'), slotPistol: $('slotPistol'), slotRifle: $('slotRifle'),
    speedo: $('speedo'), speedArc: $('speedArc'), speedValue: $('speedValue'), speedCar: $('speedCar'),
    crosshair: $('crosshair'), hitmarker: $('hitmarker'), dmgDir: $('dmgDir'), damageVignette: $('damageVignette'),
    prompt: $('prompt'), banner: $('banner'), bannerKicker: $('bannerKicker'), bannerTitle: $('bannerTitle'), bannerSub: $('bannerSub'),
    killfeed: $('killfeed'), numbers: $('damageNumbers'), fps: $('fps'),
  };
  private readonly radarCtx: CanvasRenderingContext2D;
  private readonly cache = new Map<string, string | number | boolean>();
  private readonly numbers: DamageNumber[] = [];
  private damageTimer = 0;
  private dirTimer = 0;

  constructor() {
    this.radarCtx = ($('radar') as HTMLCanvasElement).getContext('2d')!;
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('span');
      el.style.opacity = '0';
      this.els.numbers.appendChild(el);
      this.numbers.push({ el, pos: new THREE.Vector3(), life: 0, vy: 0 });
    }
  }

  private changed(key: string, value: string | number | boolean): boolean {
    if (this.cache.get(key) === value) return false;
    this.cache.set(key, value);
    return true;
  }

  show(on: boolean): void {
    this.root.classList.toggle('hidden', !on);
  }

  setObjective(text: string): void {
    if (this.changed('obj', text)) this.els.objective.textContent = text;
  }

  setWave(n: number, total: number): void {
    if (!this.changed('wave', n)) return;
    this.els.wave.textContent = String(Math.max(1, n));
    this.els.pips.innerHTML = Array.from({ length: total }, (_, i) => `<i class="${i + 1 < n ? 'done' : i + 1 === n ? 'now' : ''}"></i>`).join('');
  }

  setEnemies(n: number): void {
    if (this.changed('enemies', n)) this.els.enemies.textContent = String(n);
  }

  setScore(score: number, best: number): void {
    if (this.changed('score', score)) {
      this.els.score.textContent = score.toLocaleString('en-US');
      this.els.score.classList.remove('bump');
      void this.els.score.offsetWidth;
      this.els.score.classList.add('bump');
    }
    if (this.changed('best', best)) this.els.best.textContent = best.toLocaleString('en-US');
  }

  setCombo(mult: number, t: number): void {
    const on = mult > 1;
    if (this.changed('comboOn', on)) this.els.combo.classList.toggle('on', on);
    if (this.changed('combo', mult)) this.els.comboValue.textContent = `x${mult}`;
    if (on) this.els.comboBar.style.transform = `scaleX(${t.toFixed(3)})`;
  }

  setHealth(h: number, max: number): void {
    const v = Math.ceil(h);
    if (!this.changed('hp', v)) return;
    const pct = Math.max(0, h / max);
    this.els.health.style.transform = `scaleX(${pct})`;
    this.els.healthGhost.style.transform = `scaleX(${pct})`;
    this.els.healthNum.textContent = String(v);
    this.els.health.parentElement!.classList.toggle('low', pct < 0.3);
  }

  setArmor(a: number, max: number): void {
    const v = Math.ceil(a);
    if (!this.changed('arm', v)) return;
    this.els.armor.style.transform = `scaleX(${Math.max(0, a / max)})`;
    this.els.armorNum.textContent = String(v);
  }

  setBoost(seconds: number): void {
    const on = seconds > 0;
    if (this.changed('boostOn', on)) {
      this.els.boost.classList.toggle('hidden', !on);
      this.els.boostVignette.classList.toggle('on', on);
    }
    const s = Math.ceil(seconds);
    if (on && this.changed('boostT', s)) this.els.boostTime.textContent = String(s);
  }

  setWeapon(w: WeaponState, driving: boolean): void {
    const id = w.def.id;
    if (this.changed('wid', id)) {
      this.els.weaponName.textContent = w.def.name;
      this.els.weaponPanel.classList.toggle('rifle', id === 'rifle');
      this.els.slotPistol.classList.toggle('active', id === 'pistol');
      this.els.slotRifle.classList.toggle('active', id === 'rifle');
    }
    if (this.changed('drv', driving)) this.els.weaponPanel.classList.toggle('faded', driving);
    if (this.changed('mag', w.mag)) {
      this.els.mag.textContent = String(w.mag);
      this.els.mag.classList.toggle('low', w.mag <= Math.ceil(w.def.magSize * 0.25));
    }
    const res = w.reserve === Infinity ? '∞' : String(w.reserve);
    if (this.changed('res', res)) this.els.reserve.textContent = res;
    const reloading = w.reloading;
    if (this.changed('rl', reloading)) this.els.reloadWrap.classList.toggle('on', reloading);
    if (reloading) this.els.reload.style.transform = `scaleX(${(1 - w.reloadLeft / w.def.reloadTime).toFixed(3)})`;
  }

  setSpeed(kmh: number | null, carName = ''): void {
    const on = kmh !== null;
    if (this.changed('spdOn', on)) this.els.speedo.classList.toggle('hidden', !on);
    if (!on) return;
    const v = Math.round(kmh);
    if (this.changed('spd', v)) {
      this.els.speedValue.textContent = String(v);
      const pct = Math.min(1, kmh / 140);
      this.els.speedArc.style.strokeDashoffset = String(252 * (1 - pct));
    }
    if (this.changed('car', carName)) this.els.speedCar.textContent = carName;
  }

  setCrosshair(visible: boolean, spreadPx: number): void {
    if (this.changed('xh', visible)) this.els.crosshair.classList.toggle('hidden-x', !visible);
    const g = Math.round(spreadPx);
    if (this.changed('xhs', g)) this.els.crosshair.style.setProperty('--gap', `${g}px`);
  }

  hitMarker(kind: 'hit' | 'head' | 'kill'): void {
    const el = this.els.hitmarker;
    el.className = 'hitmarker';
    void el.offsetWidth;
    el.classList.add('show');
    if (kind !== 'hit') el.classList.add(kind);
  }

  /** @param angle direction of the attacker relative to the camera (radians, 0 = ahead) */
  damage(intensity: number, angle: number | null): void {
    this.damageTimer = Math.min(1, 0.35 + intensity);
    this.els.damageVignette.style.transition = 'none';
    this.els.damageVignette.style.opacity = String(this.damageTimer);
    if (angle !== null) {
      this.els.dmgDir.style.transform = `rotate(${angle}rad)`;
      this.els.dmgDir.classList.add('on');
      this.dirTimer = 0.1;
    }
  }

  prompt(text: string | null): void {
    if (this.changed('prompt', text ?? '')) {
      this.els.prompt.classList.toggle('hidden', !text);
      if (text) this.els.prompt.innerHTML = text;
    }
  }

  banner(kicker: string, title: string, sub = ''): void {
    this.els.bannerKicker.textContent = kicker;
    this.els.bannerTitle.textContent = title;
    this.els.bannerSub.textContent = sub;
    const b = this.els.banner;
    b.classList.remove('show');
    void b.offsetWidth;
    b.classList.add('show');
  }

  feed(points: number, label: string, tag = ''): void {
    const row = document.createElement('div');
    row.innerHTML = `${points > 0 ? `<span class="pts">+${points}</span>` : ''}${label}${tag ? `<span class="tag">${tag}</span>` : ''}`;
    const feed = this.els.killfeed;
    feed.prepend(row);
    while (feed.children.length > 5) feed.lastElementChild!.remove();
    window.setTimeout(() => row.remove(), 3100);
  }

  damageNumber(pos: THREE.Vector3, value: number, head: boolean): void {
    const n = this.numbers.reduce((a, b) => (b.life < a.life ? b : a));
    n.pos.copy(pos);
    n.pos.x += (Math.random() - 0.5) * 0.4;
    n.life = 0.8;
    n.vy = 1.6;
    n.el.textContent = String(value);
    n.el.className = head ? 'head' : '';
  }

  update(dt: number, camera: THREE.Camera, width: number, height: number): void {
    if (this.damageTimer > 0) {
      this.damageTimer = Math.max(0, this.damageTimer - dt * 1.6);
      this.els.damageVignette.style.opacity = String(this.damageTimer);
    }
    if (this.dirTimer > 0) {
      this.dirTimer -= dt;
      if (this.dirTimer <= 0) this.els.dmgDir.classList.remove('on');
    }
    for (const n of this.numbers) {
      if (n.life <= 0) continue;
      n.life -= dt;
      n.pos.y += n.vy * dt;
      n.vy *= 0.94;
      _proj.copy(n.pos).project(camera);
      if (n.life <= 0 || _proj.z > 1) {
        n.el.style.opacity = '0';
        continue;
      }
      const x = (_proj.x * 0.5 + 0.5) * width;
      const y = (-_proj.y * 0.5 + 0.5) * height;
      n.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`;
      n.el.style.opacity = String(Math.min(1, n.life * 2.5));
    }
  }

  /** Top-down radar rotated so "up" is the camera's facing. */
  drawRadar(cx: number, cz: number, yaw: number, blips: readonly RadarBlip[]): void {
    const g = this.radarCtx;
    const S = 148, R = S / 2, range = 60;
    g.clearRect(0, 0, S, S);
    g.save();
    g.beginPath();
    g.arc(R, R, R - 1, 0, Math.PI * 2);
    g.clip();
    g.strokeStyle = 'rgba(46,242,255,0.14)';
    g.lineWidth = 1;
    for (const r of [0.33, 0.66]) { g.beginPath(); g.arc(R, R, R * r, 0, Math.PI * 2); g.stroke(); }
    g.translate(R, R);
    g.rotate(yaw);
    const k = R / range;
    // Roads (every 50 m) as faint lines.
    g.strokeStyle = 'rgba(255,79,210,0.18)';
    g.lineWidth = 14 * k;
    for (const v of [-100, -50, 0, 50, 100]) {
      g.beginPath(); g.moveTo((v - cx) * k, -R * 2); g.lineTo((v - cx) * k, R * 2); g.stroke();
      g.beginPath(); g.moveTo(-R * 2, (v - cz) * k); g.lineTo(R * 2, (v - cz) * k); g.stroke();
    }
    for (const b of blips) {
      const x = (b.x - cx) * k, y = (b.z - cz) * k;
      const d = Math.hypot(x, y);
      const px = d > R - 6 ? (x / d) * (R - 6) : x;
      const py = d > R - 6 ? (y / d) * (R - 6) : y;
      g.fillStyle = b.color;
      g.beginPath();
      g.arc(px, py, b.size, 0, Math.PI * 2);
      g.fill();
    }
    g.restore();
    // Player arrow (always pointing up).
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.moveTo(R, R - 7); g.lineTo(R + 5, R + 5); g.lineTo(R, R + 2); g.lineTo(R - 5, R + 5);
    g.closePath();
    g.fill();
  }

  setFps(text: string): void {
    if (this.changed('fps', text)) this.els.fps.textContent = text;
  }

  resetTransient(): void {
    this.els.killfeed.innerHTML = '';
    for (const n of this.numbers) { n.life = 0; n.el.style.opacity = '0'; }
    this.damageTimer = 0;
    this.els.damageVignette.style.opacity = '0';
    this.cache.clear();
  }
}
