import * as THREE from 'three';
import { ABILITIES, MODES, WEAPONS } from '../sim/content.ts';
import type { SimEvent } from '../sim/events.ts';
import type { Tank } from '../sim/tank.ts';
import type { WeaponId } from '../sim/types.ts';
import type { World } from '../sim/world.ts';
import { $, esc, fmtTime } from './dom.ts';

const _v = new THREE.Vector3();

interface Plate {
  el: HTMLDivElement;
  name: HTMLDivElement;
  hp: HTMLElement;
  visible: boolean;
}

interface DmgNum {
  el: HTMLDivElement;
  x: number;
  y: number;
  z: number;
  t: number;
  drift: number;
}

interface Arc {
  el: HTMLDivElement;
  t: number;
  fromX: number;
  fromZ: number;
}

/** DOM heads-up display. Everything is pooled; per-frame work only writes styles that changed. */
export class Hud {
  private readonly root = $('hud');
  private world: World | null = null;
  private player: Tank | null = null;
  private plates: Plate[] = [];
  private readonly dnums: DmgNum[] = [];
  private dnIdx = 0;
  private readonly arcs: Arc[] = [];
  private arcIdx = 0;
  private spotted: boolean[] = [];
  private spottedTimer = 0;
  private lastFired: number[] = [];
  private hitT = 0;
  private bannerT = 0;
  private hpGhost = 1;
  private lastAmmoKey = '';
  private lastChips = '';
  private mapBase: HTMLCanvasElement | null = null;
  private readonly mapCtx = ($('minimap') as HTMLCanvasElement).getContext('2d')!;
  private damageFlash = 0;
  private readonly el = {
    hpFill: $('hpFill'), hpGhost: $('hpGhost'), hpNum: $('hpNum'), boostFill: $('boostFill'), armorNum: $('armorNum'), chips: $('chips'),
    wName: $('wName'), ammo: $('ammo'), wBar: $('wBar'), wState: $('wState'),
    abPanel: $('abilityPanel'), abFill: $('abFill'), abName: $('abName'), abState: $('abState'),
    timer: $('hudTimer'), mode: $('hudMode'), cpMeter: $('cpMeter'), cpFill: $('cpFill'), cpLabel: $('cpLabel'),
    sBlue: $('scoreBlue'), sBlueVal: $('scoreBlueVal'), sBlueBar: $('scoreBlueBar'), sBlueLbl: $('scoreBlueLbl'),
    sMag: $('scoreMag'), sMagVal: $('scoreMagVal'), sMagBar: $('scoreMagBar'), sMagLbl: $('scoreMagLbl'),
    killfeed: $('killfeed'), reticle: $('reticle'), hitmarker: $('hitmarker'), dmgDir: $('dmgDir'),
    banner: $('banner'), bannerKicker: $('bannerKicker'), bannerTitle: $('bannerTitle'), countdown: $('countdown'),
    respawn: $('respawn'), respawnBy: $('respawnBy'), respawnTime: $('respawnTime'),
    scoreboard: $('scoreboard'), fps: $('fps'), fxDamage: $('fxDamage'), plates: $('plates'), dmgNumbers: $('dmgNumbers'),
  };

  constructor() {
    for (let i = 0; i < 24; i++) {
      const el = document.createElement('div');
      el.className = 'dnum';
      el.style.opacity = '0';
      this.el.dmgNumbers.appendChild(el);
      this.dnums.push({ el, x: 0, y: 0, z: 0, t: 0, drift: 0 });
    }
    for (let i = 0; i < 4; i++) {
      const el = document.createElement('div');
      el.className = 'dmg-arc';
      el.style.opacity = '0';
      this.el.dmgDir.appendChild(el);
      this.arcs.push({ el, t: 0, fromX: 0, fromZ: 0 });
    }
  }

  show(on: boolean): void {
    this.root.classList.toggle('hidden', !on);
  }

  setFps(visible: boolean, fps: number): void {
    this.el.fps.classList.toggle('hidden', !visible);
    if (visible) this.el.fps.textContent = `${fps.toFixed(0)} FPS`;
  }

  /** Configure for a new match. */
  bind(world: World): void {
    this.world = world;
    this.player = world.player;
    this.el.plates.textContent = '';
    this.plates = world.tanks.map((t) => {
      const el = document.createElement('div');
      el.className = `plate ${t.team === 'none' ? 'ffa' : t.team}`;
      const name = document.createElement('div');
      name.className = 'name';
      name.innerHTML = `${esc(t.name)}${t.isBot ? '<small>BOT</small>' : ''}`;
      const hpw = document.createElement('div');
      hpw.className = 'hp';
      const hp = document.createElement('b');
      hpw.appendChild(hp);
      el.append(name, hpw);
      el.style.display = 'none';
      this.el.plates.appendChild(el);
      return { el, name, hp, visible: false };
    });
    this.spotted = world.tanks.map(() => false);
    this.lastFired = world.tanks.map(() => -99);
    this.el.killfeed.textContent = '';
    this.el.respawn.classList.add('hidden');
    this.el.scoreboard.classList.add('hidden');
    this.lastAmmoKey = '';
    this.lastChips = '';
    this.hpGhost = 1;
    const m = MODES[world.mode];
    this.el.mode.textContent = `${m.name} · ${world.config.scoreLimit}`;
    this.el.cpMeter.classList.toggle('hidden', world.mode !== 'cp');
    const teams = m.teams;
    this.el.sBlueLbl.textContent = teams ? 'BLUE' : 'YOU';
    this.el.sMagLbl.textContent = teams ? 'MAGENTA' : 'LEADER';
    if (this.player) {
      const w = this.player.weapon;
      this.el.wName.textContent = w.name;
      this.el.abName.textContent = ABILITIES[this.player.hull.ability].name;
    }
    this.buildMinimap();
  }

  // ------------------------------------------------------------ events

  onEvent(e: SimEvent): void {
    const w = this.world;
    const p = this.player;
    if (!w) return;
    switch (e.type) {
      case 'fire':
        this.lastFired[e.a] = w.time;
        break;
      case 'damage':
        if (p && e.b === p.id && e.a !== p.id) {
          this.hitT = 0.22;
          this.el.hitmarker.classList.remove('kill');
          this.number(e.x, e.y + 1.5, e.z, e.value, e.value >= 40 ? 'big' : '');
        }
        if (p && e.a === p.id) {
          this.damageFlash = Math.min(1, this.damageFlash + e.value / 60);
          const src = w.tanks[e.b];
          this.arc(src.x, src.z);
        }
        break;
      case 'kill': {
        const victim = w.tanks[e.a];
        const killer = w.tanks[e.b];
        this.feed(killer, victim, e.kind);
        if (p && killer === p && victim !== p) {
          this.hitT = 0.4;
          this.el.hitmarker.classList.add('kill');
          const streak = e.value;
          const title = streak >= 5 ? 'RAMPAGE' : streak === 4 ? 'QUAD KILL' : streak === 3 ? 'TRIPLE KILL' : streak === 2 ? 'DOUBLE KILL' : 'ENEMY DESTROYED';
          this.banner(victim.name, title, streak >= 2 ? 'amber' : '');
        }
        if (p && victim === p) this.el.respawnBy.textContent = killer === p ? 'SELF-DESTRUCTED' : `DESTROYED BY ${killer.name}`;
        break;
      }
      case 'capture':
        if (p) this.banner('CONTROL POINT', e.kind === p.team ? 'CAPTURED' : 'LOST', e.kind === p.team ? '' : 'red');
        break;
      case 'neutral':
        if (p) this.banner('CONTROL POINT', 'NEUTRALISED', 'amber');
        break;
      case 'pickup':
        if (p && e.a === p.id) this.banner('PICKUP', e.kind === 'repair' ? 'HULL REPAIRED' : e.kind === 'overdrive' ? 'OVERDRIVE ×1.5 DMG' : 'NITRO CHARGED', e.kind === 'overdrive' ? 'amber' : '');
        break;
      case 'overheat':
        if (p && e.a === p.id) this.banner('VOLT EMITTER', 'OVERHEATED', 'red');
        break;
      case 'countdown':
        this.countdown(e.value);
        break;
      default:
        break;
    }
  }

  private feed(killer: Tank, victim: Tank, weapon: string): void {
    const p = this.player;
    const cls = (t: Tank) => (p && t === p ? 'self' : t.team === 'none' ? 'ffa' : t.team);
    const wname = weapon === 'shockwave' ? 'SHOCKWAVE' : WEAPONS[weapon as WeaponId]?.name ?? '';
    const div = document.createElement('div');
    div.className = `kf${p && (killer === p || victim === p) ? ' me' : ''}`;
    div.innerHTML = `<span class="${cls(killer)}">${esc(killer.name)}</span><span class="w">${esc(wname)}</span><span class="${cls(victim)}">${esc(victim.name)}</span>`;
    this.el.killfeed.prepend(div);
    while (this.el.killfeed.children.length > 5) this.el.killfeed.lastElementChild?.remove();
    window.setTimeout(() => div.remove(), 6000);
  }

  banner(kicker: string, title: string, tone: '' | 'amber' | 'red' = ''): void {
    this.el.bannerKicker.textContent = kicker;
    this.el.bannerTitle.textContent = title;
    this.el.banner.className = `banner show ${tone}`;
    this.bannerT = 2.2;
  }

  private countdown(n: number): void {
    const c = this.el.countdown;
    c.textContent = n > 0 ? String(n) : 'FIGHT';
    c.classList.remove('pop');
    void c.offsetWidth;
    c.classList.add('pop');
  }

  private number(x: number, y: number, z: number, value: number, cls: string): void {
    const d = this.dnums[this.dnIdx];
    this.dnIdx = (this.dnIdx + 1) % this.dnums.length;
    d.x = x; d.y = y; d.z = z; d.t = 0.9; d.drift = (Math.random() - 0.5) * 30;
    d.el.textContent = String(Math.round(value));
    d.el.className = `dnum ${cls}`;
  }

  private arc(fromX: number, fromZ: number): void {
    const a = this.arcs[this.arcIdx];
    this.arcIdx = (this.arcIdx + 1) % this.arcs.length;
    a.t = 1.2;
    a.fromX = fromX;
    a.fromZ = fromZ;
  }

  // ------------------------------------------------------------ per frame

  update(dt: number, camera: THREE.PerspectiveCamera, camYaw: number, screenW: number, screenH: number, barrelScreen: { x: number; y: number; blocked: boolean; ready: boolean } | null): void {
    const w = this.world;
    const p = this.player;
    if (!w || !p) return;

    // Vitals.
    const hp = Math.max(0, p.health / p.maxHealth);
    this.hpGhost = hp > this.hpGhost ? hp : this.hpGhost + (hp - this.hpGhost) * Math.min(1, dt * 2.5);
    this.el.hpFill.style.width = `${hp * 100}%`;
    this.el.hpFill.className = hp < 0.3 ? 'low' : hp < 0.6 ? 'mid' : '';
    this.el.hpGhost.style.width = `${this.hpGhost * 100}%`;
    this.el.hpNum.textContent = String(Math.ceil(p.health));
    this.el.boostFill.style.width = `${p.boost * 100}%`;
    this.el.armorNum.textContent = `ARM ${p.armor}`;
    const chips: string[] = [];
    if (p.overdrive > 0) chips.push(`<span class="chip amber">OVERDRIVE ${Math.ceil(p.overdrive)}s</span>`);
    if (p.nitro > 0) chips.push(`<span class="chip cyan">NITRO ${Math.ceil(p.nitro)}s</span>`);
    if (p.shieldTimer > 0) chips.push(`<span class="chip cyan">AEGIS ${Math.ceil(p.shieldTimer)}s</span>`);
    if (p.spawnProtect > 0) chips.push('<span class="chip green">SPAWN SHIELD</span>');
    if (p.jolt > 0) chips.push('<span class="chip red">JOLTED</span>');
    if (p.stun > 0) chips.push('<span class="chip red">TURRET JAMMED</span>');
    if (w.time - p.lastDamageTime > 6 && p.health < p.maxHealth && p.alive) chips.push('<span class="chip green">SELF-REPAIR</span>');
    const ck = chips.join('');
    if (ck !== this.lastChips) { this.el.chips.innerHTML = ck; this.lastChips = ck; }

    // Weapon.
    const wp = p.weapon;
    let ammoKey = '';
    if (wp.magazine > 0) ammoKey = `m${p.ammo}/${wp.magazine}`;
    if (ammoKey !== this.lastAmmoKey) {
      this.lastAmmoKey = ammoKey;
      let html = '';
      if (wp.magazine > 0) for (let i = 0; i < wp.magazine; i++) html += `<i class="${i < p.ammo ? '' : 'spent'}"></i>`;
      this.el.ammo.innerHTML = html;
    }
    let bar = 1, state = 'READY', hot = false;
    if (p.reloadTimer > 0) { bar = p.reloadProgress; state = 'RELOADING'; }
    else if (wp.heatPerShot > 0) {
      bar = p.heat; hot = true;
      state = p.overheated > 0 ? 'OVERHEATED' : p.venting ? 'VENTING' : p.heat > 0.75 ? 'HEAT CRITICAL' : 'HEAT';
    } else if (p.charging >= 0) { bar = 1 - p.charging / wp.charge; state = 'CHARGING'; }
    else if (p.cooldown > 0 && wp.cooldown > 0.4) { bar = 1 - p.cooldown / (wp.cooldown * p.mods.reload); state = 'CYCLING'; }
    this.el.wBar.style.width = `${Math.max(0, Math.min(1, bar)) * 100}%`;
    this.el.wBar.className = hot ? 'hot' : '';
    this.el.wState.textContent = state;

    // Ability.
    const charge = p.abilityCharge;
    (this.el.abFill as unknown as SVGCircleElement).style.strokeDashoffset = String(125.66 * (1 - charge));
    const ready = charge >= 1;
    this.el.abPanel.classList.toggle('ready', ready);
    this.el.abState.textContent = p.abilityTimer > 0 ? 'ACTIVE' : ready ? 'READY' : `${Math.floor(charge * 100)}%`;

    // Score and timer.
    this.el.timer.textContent = fmtTime(w.timeLeft);
    this.el.timer.classList.toggle('low', w.timeLeft < 30);
    const limit = w.config.scoreLimit;
    if (MODES[w.mode].teams) {
      this.el.sBlueVal.textContent = String(w.score.blue);
      this.el.sMagVal.textContent = String(w.score.magenta);
      this.el.sBlueBar.style.width = `${Math.min(1, w.score.blue / limit) * 100}%`;
      this.el.sMagBar.style.width = `${Math.min(1, w.score.magenta / limit) * 100}%`;
    } else {
      let leader = 0;
      for (const t of w.tanks) if (t !== p) leader = Math.max(leader, t.stats.kills);
      this.el.sBlueVal.textContent = String(p.stats.kills);
      this.el.sMagVal.textContent = String(leader);
      this.el.sBlueBar.style.width = `${Math.min(1, p.stats.kills / limit) * 100}%`;
      this.el.sMagBar.style.width = `${Math.min(1, leader / limit) * 100}%`;
    }
    if (w.mode === 'cp') {
      const cp = w.cp;
      const f = this.el.cpFill;
      const pct = Math.abs(cp.progress) * 50;
      f.style.width = `${pct}%`;
      f.style.left = cp.progress >= 0 ? '50%' : `${50 - pct}%`;
      f.style.background = cp.progress >= 0 ? 'var(--blue)' : 'var(--magenta)';
      this.el.cpLabel.textContent = cp.contested ? 'CONTESTED' : cp.owner === 'none' ? (cp.blueIn || cp.magentaIn ? 'CAPTURING' : 'NEUTRAL') : `${cp.owner.toUpperCase()} HOLDS`;
    }

    // Respawn overlay.
    this.el.respawn.classList.toggle('hidden', p.alive || w.status !== 'playing');
    if (!p.alive) this.el.respawnTime.textContent = String(Math.max(1, Math.ceil(p.respawnTimer)));

    // Hit marker, banner, damage vignette.
    this.hitT = Math.max(0, this.hitT - dt);
    this.el.hitmarker.style.opacity = String(Math.min(1, this.hitT * 6));
    if (this.bannerT > 0) {
      this.bannerT -= dt;
      if (this.bannerT <= 0) this.el.banner.classList.remove('show');
    }
    this.damageFlash = Math.max(0, this.damageFlash - dt * 1.4);
    const lowHp = p.alive && hp < 0.3 ? 0.25 + 0.15 * Math.sin(w.time * 6) : 0;
    this.el.fxDamage.style.opacity = String(Math.min(1, this.damageFlash + lowHp));

    // Barrel reticle.
    if (barrelScreen && p.alive) {
      this.el.reticle.style.display = '';
      this.el.reticle.style.transform = `translate(${barrelScreen.x}px, ${barrelScreen.y}px)`;
      this.el.reticle.classList.toggle('blocked', barrelScreen.blocked);
      this.el.reticle.classList.toggle('cooling', !barrelScreen.ready);
    } else this.el.reticle.style.display = 'none';

    // Damage direction arcs, relative to where the camera faces.
    for (const a of this.arcs) {
      if (a.t <= 0) { if (a.el.style.opacity !== '0') a.el.style.opacity = '0'; continue; }
      a.t -= dt;
      const ang = Math.atan2(a.fromX - p.x, a.fromZ - p.z) - camYaw;
      a.el.style.transform = `rotate(${-ang}rad)`;
      a.el.style.opacity = String(Math.min(1, a.t * 1.5));
    }

    this.updateSpotting(dt);
    this.updatePlates(camera, screenW, screenH);
    this.updateNumbers(dt, camera, screenW, screenH);
    this.drawMinimap(camYaw);
  }

  private updateSpotting(dt: number): void {
    const w = this.world!, p = this.player!;
    this.spottedTimer -= dt;
    if (this.spottedTimer > 0) return;
    this.spottedTimer = 0.2;
    for (const t of w.tanks) {
      if (t === p || !t.alive) { this.spotted[t.id] = false; continue; }
      if (!p.isEnemyOf(t)) { this.spotted[t.id] = true; continue; }
      const d = Math.hypot(t.x - p.x, t.z - p.z);
      const los = d < 110 && w.collision.segmentClear(p.x, p.y + p.pivotHeight, p.z, t.x, t.y + 1.2, t.z);
      // Close tanks are heard; tanks that just fired give themselves away.
      this.spotted[t.id] = los || d < 18 || (w.time - this.lastFired[t.id] < 1.5 && d < 70);
    }
  }

  private updatePlates(camera: THREE.PerspectiveCamera, sw: number, sh: number): void {
    const w = this.world!, p = this.player!;
    for (const t of w.tanks) {
      const pl = this.plates[t.id];
      let show = t !== p && t.alive && this.spotted[t.id];
      const enemy = p.isEnemyOf(t);
      let x = 0, y = 0, off = false;
      if (show) {
        _v.set(t.x, t.y + t.hull.turretHeight + 2.1, t.z).project(camera);
        const behind = _v.z > 1;
        x = (_v.x * 0.5 + 0.5) * sw;
        y = (-_v.y * 0.5 + 0.5) * sh;
        const dist = Math.hypot(t.x - camera.position.x, t.z - camera.position.z);
        if (behind || x < 0 || x > sw || y < 0 || y > sh) {
          // Enemy indicators clamp to the screen edge; allies just hide.
          if (!enemy) show = false;
          else {
            off = true;
            if (behind) { x = sw - x; y = sh - y; }
            const cx = sw / 2, cy = sh / 2;
            const dx = x - cx, dy = y - cy;
            const k = Math.min((cx - 40) / Math.max(1, Math.abs(dx)), (cy - 50) / Math.max(1, Math.abs(dy)));
            x = cx + dx * k;
            y = cy + dy * k;
          }
        } else if (dist > 140) show = false;
      }
      if (show !== pl.visible) {
        pl.el.style.display = show ? '' : 'none';
        pl.visible = show;
      }
      if (!show) continue;
      pl.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%)`;
      pl.el.classList.toggle('offscreen', off);
      pl.hp.style.width = `${(t.health / t.maxHealth) * 100}%`;
    }
  }

  private updateNumbers(dt: number, camera: THREE.PerspectiveCamera, sw: number, sh: number): void {
    for (const d of this.dnums) {
      if (d.t <= 0) continue;
      d.t -= dt;
      _v.set(d.x, d.y + (0.9 - d.t) * 1.6, d.z).project(camera);
      if (d.t <= 0 || _v.z > 1) { d.el.style.opacity = '0'; continue; }
      const x = (_v.x * 0.5 + 0.5) * sw + d.drift * (0.9 - d.t);
      const y = (-_v.y * 0.5 + 0.5) * sh;
      d.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`;
      d.el.style.opacity = String(Math.min(1, d.t * 3));
    }
  }

  // ------------------------------------------------------------ minimap

  private buildMinimap(): void {
    const w = this.world!;
    const a = w.arena;
    const size = 200;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const g = c.getContext('2d')!;
    const s = size / (a.half * 2 + 8);
    const X = (x: number) => (x + a.half + 4) * s;
    const Z = (z: number) => (z + a.half + 4) * s;
    g.fillStyle = 'rgba(8,14,26,0.9)';
    g.fillRect(0, 0, size, size);
    g.strokeStyle = 'rgba(46,242,255,0.08)';
    for (let i = -a.half; i <= a.half; i += 10) {
      g.beginPath(); g.moveTo(X(i), Z(-a.half)); g.lineTo(X(i), Z(a.half)); g.stroke();
      g.beginPath(); g.moveTo(X(-a.half), Z(i)); g.lineTo(X(a.half), Z(i)); g.stroke();
    }
    const sorted = [...a.boxes].sort((p, q) => p.maxY - q.maxY);
    for (const b of sorted) {
      if (b.hidden) continue;
      if (b.mat === 'barrier') g.fillStyle = 'rgba(46,242,255,0.55)';
      else if (b.mat === 'boundary') g.fillStyle = 'rgba(46,242,255,0.35)';
      else {
        const l = Math.min(1, b.maxY / 8);
        g.fillStyle = `rgba(${90 + l * 60},${110 + l * 70},${140 + l * 70},${0.35 + l * 0.4})`;
      }
      g.fillRect(X(b.minX), Z(b.minZ), Math.max(1, (b.maxX - b.minX) * s), Math.max(1, (b.maxZ - b.minZ) * s));
    }
    for (const r of a.ramps) {
      g.fillStyle = r.bridge ? 'rgba(46,242,255,0.3)' : 'rgba(255,176,46,0.35)';
      g.fillRect(X(r.minX), Z(r.minZ), (r.maxX - r.minX) * s, (r.maxZ - r.minZ) * s);
    }
    this.mapBase = c;
    this.mapScale = s;
    this.mapHalf = a.half + 4;
  }

  private mapScale = 1;
  private mapHalf = 70;

  private drawMinimap(camYaw: number): void {
    const w = this.world!, p = this.player!;
    const g = this.mapCtx;
    const size = 200;
    g.clearRect(0, 0, size, size);
    if (this.mapBase) g.drawImage(this.mapBase, 0, 0);
    const s = this.mapScale;
    // Minimap is drawn with +X to the left so it matches the default camera (facing +Z, up the screen).
    const X = (x: number) => size - (x + this.mapHalf) * s;
    const Z = (z: number) => size - (z + this.mapHalf) * s;
    if (w.mode === 'cp') {
      const cp = w.arena.controlPoint;
      g.beginPath();
      g.arc(X(cp.x), Z(cp.z), cp.r * s, 0, Math.PI * 2);
      g.fillStyle = w.cp.owner === 'blue' ? 'rgba(42,157,255,0.35)' : w.cp.owner === 'magenta' ? 'rgba(255,47,200,0.35)' : 'rgba(255,255,255,0.15)';
      g.fill();
      g.strokeStyle = w.cp.contested ? '#ffb02e' : 'rgba(255,255,255,0.6)';
      g.stroke();
    }
    for (let i = 0; i < w.pickups.length; i++) {
      const pk = w.pickups[i];
      if (!pk.active) continue;
      g.fillStyle = pk.def.kind === 'repair' ? '#4dff9a' : pk.def.kind === 'overdrive' ? '#ffb02e' : '#2ef2ff';
      g.fillRect(X(pk.def.x) - 2.5, Z(pk.def.z) - 2.5, 5, 5);
    }
    for (const t of w.tanks) {
      if (!t.alive || t === p) continue;
      const enemy = p.isEnemyOf(t);
      if (enemy && !this.spotted[t.id]) continue;
      g.fillStyle = enemy ? '#ff2fc8' : '#2a9dff';
      g.beginPath();
      g.arc(X(t.x), Z(t.z), 3.2, 0, Math.PI * 2);
      g.fill();
    }
    if (p.alive) {
      const px = X(p.x), pz = Z(p.z);
      // View cone.
      g.fillStyle = 'rgba(46,242,255,0.12)';
      g.beginPath();
      g.moveTo(px, pz);
      const phi = Math.atan2(-Math.cos(camYaw), -Math.sin(camYaw));
      g.arc(px, pz, 34, phi - 0.55, phi + 0.55);
      g.closePath();
      g.fill();
      g.save();
      g.translate(px, pz);
      g.rotate(-p.heading);
      g.fillStyle = '#2ef2ff';
      g.beginPath();
      g.moveTo(0, -6); g.lineTo(4.5, 5); g.lineTo(-4.5, 5);
      g.closePath();
      g.fill();
      g.restore();
    }
  }

  // ------------------------------------------------------------ scoreboard

  showScoreboard(on: boolean): void {
    const w = this.world;
    this.el.scoreboard.classList.toggle('hidden', !on);
    if (on && w) this.el.scoreboard.innerHTML = scoreboardHtml(w);
  }
}

/** Scoreboard markup shared by the Tab overlay and the end screen. */
export function scoreboardHtml(w: World): string {
  const p = w.player;
  const row = (t: Tank) => `<tr class="${t === p ? 'me' : ''}${t.alive ? '' : ' dead'}"><td>${esc(t.name)}${t.isBot ? '<span class="bot">BOT</span>' : ''}</td><td>${t.stats.kills}</td><td>${t.stats.deaths}</td><td>${t.stats.assists}</td><td>${Math.round(t.stats.damage)}</td><td>${t.stats.score}</td></tr>`;
  const head = '<tr><th>TANK</th><th>K</th><th>D</th><th>A</th><th>DMG</th><th>SCORE</th></tr>';
  const ranked = w.ranking();
  if (MODES[w.mode].teams) {
    const blue = ranked.filter((t) => t.team === 'blue');
    const mag = ranked.filter((t) => t.team === 'magenta');
    return `<div class="sb-cols"><div><div class="sb-title blue">BLUE · ${w.score.blue}</div><table class="sb">${head}${blue.map(row).join('')}</table></div><div><div class="sb-title magenta">MAGENTA · ${w.score.magenta}</div><table class="sb">${head}${mag.map(row).join('')}</table></div></div>`;
  }
  return `<div class="sb-cols one"><div><div class="sb-title">FREE-FOR-ALL · FIRST TO ${w.config.scoreLimit}</div><table class="sb">${head}${ranked.map(row).join('')}</table></div></div>`;
}
