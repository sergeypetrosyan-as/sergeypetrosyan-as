import { ARENA_IDS, ARENA_INFO } from '../sim/arenas.ts';
import { ABILITIES, DIFFICULTIES, HULLS, MODES, PAINTS, UPGRADE_MAX, UPGRADES, WEAPONS, type Loadout } from '../sim/content.ts';
import type { DifficultyId, HullId, ModeId, WeaponId } from '../sim/types.ts';
import type { World } from '../sim/world.ts';
import { buy, buyUpgrade, canBuy, itemInfo, owns, upgradeCost, xpToNext, type MatchSummary, type Profile, type Rewards, type ShopItem } from '../game/progression.ts';
import type { Settings } from '../game/Storage.ts';
import { $, esc, fmtTime } from './dom.ts';
import { scoreboardHtml } from './Hud.ts';

export type ScreenId = 'menu' | 'modes' | 'garage' | 'settings' | 'controls' | 'pause' | 'end' | 'none';

export interface MenuCallbacks {
  deploy(): void;
  resume(): void;
  restart(): void;
  quit(): void;
  settingsChanged(s: Settings): void;
  /** Loadout the garage should display (may be an unowned preview). */
  preview(l: Loadout): void;
  profileChanged(): void;
  resetProgress(): void;
  sound(kind: 'hover' | 'click' | 'confirm' | 'back' | 'deny'): void;
  screenChanged(s: ScreenId): void;
}

type GarageTab = 'hulls' | 'weapons' | 'paint' | 'upgrades';

const SCREENS: ScreenId[] = ['menu', 'modes', 'garage', 'settings', 'controls', 'pause', 'end'];

/** All menu screens. Every button is wired to a real game state. */
export class Menus {
  current: ScreenId = 'none';
  private returnTo: ScreenId = 'menu';
  private tab: GarageTab = 'hulls';
  private selected: ShopItem | null = null;
  private profile: Profile;
  private settings: Settings;
  private readonly cb: MenuCallbacks;

  constructor(profile: Profile, settings: Settings, cb: MenuCallbacks) {
    this.profile = profile;
    this.settings = settings;
    this.cb = cb;
    this.wire();
    this.bindSettings();
  }

  setProfile(p: Profile): void {
    this.profile = p;
    this.refreshProfile();
  }

  private wire(): void {
    const click = (id: string, fn: () => void, sound: 'click' | 'confirm' | 'back' = 'click') => {
      $(id).addEventListener('click', () => { this.cb.sound(sound); fn(); });
    };
    click('btnPlay', () => this.cb.deploy(), 'confirm');
    click('btnModes', () => this.show('modes'));
    click('btnGarage', () => this.show('garage'));
    click('btnSettings', () => this.show('settings', 'menu'));
    click('btnControls', () => this.show('controls', 'menu'));
    click('btnDeploy', () => this.cb.deploy(), 'confirm');
    click('btnGarageDeploy', () => this.cb.deploy(), 'confirm');
    click('btnResume', () => this.cb.resume(), 'confirm');
    click('btnRestart', () => this.cb.restart());
    click('btnPauseSettings', () => this.show('settings', 'pause'));
    click('btnPauseControls', () => this.show('controls', 'pause'));
    click('btnQuit', () => this.cb.quit(), 'back');
    click('btnEndAgain', () => this.cb.deploy(), 'confirm');
    click('btnEndGarage', () => this.show('garage'));
    click('btnEndMenu', () => this.show('menu'), 'back');
    click('btnReset', () => {
      if (window.confirm('Reset level, credits, unlocks and upgrades? This cannot be undone.')) this.cb.resetProgress();
    });
    document.querySelectorAll<HTMLElement>('[data-back]').forEach((b) => b.addEventListener('click', () => { this.cb.sound('back'); this.back(); }));
    document.querySelectorAll<HTMLButtonElement>('.btn, .card, .tabs button').forEach((b) => b.addEventListener('mouseenter', () => this.cb.sound('hover')));
    $('garageTabs').addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-tab]');
      if (!b) return;
      this.cb.sound('click');
      this.tab = b.dataset.tab as GarageTab;
      this.selected = null;
      this.renderGarage();
    });
  }

  /** Esc / Back behaviour. */
  back(): void {
    switch (this.current) {
      case 'settings':
      case 'controls':
        this.show(this.returnTo);
        break;
      case 'modes':
      case 'garage':
        this.cb.preview(this.profile.loadout);
        this.show('menu');
        break;
      case 'pause':
        this.cb.resume();
        break;
      default:
        break;
    }
  }

  show(s: ScreenId, returnTo?: ScreenId): void {
    if (returnTo) this.returnTo = returnTo;
    this.current = s;
    for (const id of SCREENS) $(id).classList.toggle('hidden', id !== s);
    if (s === 'menu') this.renderMenu();
    if (s === 'modes') this.renderModes();
    if (s === 'garage') { this.selected = null; this.renderGarage(); }
    if (s === 'settings') this.syncSettings();
    this.cb.screenChanged(s);
    // Focus the first control for keyboard users.
    const first = s !== 'none' ? $(s).querySelector<HTMLElement>('button, a, input') : null;
    first?.focus({ preventScroll: true });
  }

  // ------------------------------------------------------------ main menu

  refreshProfile(): void {
    const p = this.profile;
    $('pfCall').textContent = p.callsign;
    $('pfLevel').textContent = String(p.level);
    const need = xpToNext(p.level);
    $('pfXp').style.width = `${Math.min(1, p.xp / need) * 100}%`;
    $('pfXpText').textContent = `${p.xp} / ${need} XP`;
    $('pfCredits').textContent = p.credits.toLocaleString('en-US');
    $('gCredits').textContent = p.credits.toLocaleString('en-US');
    const m = p.match;
    $('playSub').textContent = `${MODES[m.mode].name} · ${ARENA_INFO[m.arena].name} · ${DIFFICULTIES[m.difficulty].name}`;
  }

  private renderMenu(): void {
    this.refreshProfile();
    const p = this.profile;
    const s = p.stats;
    const kd = s.deaths ? (s.kills / s.deaths).toFixed(2) : s.kills.toFixed(0);
    const l = p.loadout;
    $('careerPanel').innerHTML = `
      <h4>CAREER</h4>
      <dl>
        <dt>Matches</dt><dd>${s.matches}</dd>
        <dt>Wins</dt><dd>${s.wins}</dd>
        <dt>Kills / deaths</dt><dd>${s.kills} / ${s.deaths} (${kd})</dd>
        <dt>Best streak</dt><dd>${s.bestStreak}</dd>
        <dt>Damage dealt</dt><dd>${s.damage.toLocaleString('en-US')}</dd>
        <dt>Time in combat</dt><dd>${fmtTime(s.playTime)}</dd>
      </dl>
      <div class="build"><b>CURRENT BUILD</b><br>${HULLS[l.hull].name} · ${WEAPONS[l.weapon].name}<br><span class="muted">${esc(PAINTS.find((x) => x.id === l.paint)?.name ?? '')} · upgrades ${l.upgrades.damage}/${l.upgrades.armor}/${l.upgrades.speed}/${l.upgrades.reload}</span></div>`;
  }

  // ------------------------------------------------------------ modes

  private renderModes(): void {
    const m = this.profile.match;
    const modeCards = (Object.keys(MODES) as ModeId[]).map((id) => {
      const d = MODES[id];
      return `<button type="button" class="card${m.mode === id ? ' active' : ''}" data-mode="${id}"><h5>${d.name}</h5><p>${d.blurb}</p><span class="tag">${d.teams ? '4 V 4 · BOTS' : '8 TANKS · BOTS'}</span></button>`;
    }).join('');
    $('modeCards').innerHTML = modeCards;
    $('arenaCards').innerHTML = ARENA_IDS.map((id) => `<button type="button" class="card${m.arena === id ? ' active' : ''}" data-arena="${id}"><h5>${ARENA_INFO[id].name}</h5><p>${ARENA_INFO[id].subtitle}</p></button>`).join('');
    const seg = (el: string, items: Array<[string, string]>, value: string, key: string) => {
      $(el).innerHTML = items.map(([v, label]) => `<button type="button" data-${key}="${v}" class="${v === value ? 'active' : ''}">${label}</button>`).join('');
    };
    seg('segDifficulty', (Object.keys(DIFFICULTIES) as DifficultyId[]).map((d) => [d, DIFFICULTIES[d].name]), m.difficulty, 'diff');
    const md = MODES[m.mode];
    seg('segScore', md.scoreLimits.map((n) => [String(n), String(n)]), String(m.scoreLimit), 'score');
    seg('segTime', md.timeLimits.map((n) => [String(n), `${n / 60} MIN`]), String(m.timeLimit), 'time');
    const onPick = (container: string, attr: string, fn: (v: string) => void) => {
      $(container).onclick = (e) => {
        const b = (e.target as HTMLElement).closest<HTMLElement>(`[data-${attr}]`);
        if (!b) return;
        this.cb.sound('click');
        fn(b.dataset[attr]!);
        this.cb.profileChanged();
        this.renderModes();
        this.refreshProfile();
      };
    };
    onPick('modeCards', 'mode', (v) => {
      m.mode = v as ModeId;
      if (!MODES[m.mode].scoreLimits.includes(m.scoreLimit)) m.scoreLimit = MODES[m.mode].defaultScore;
    });
    onPick('arenaCards', 'arena', (v) => { m.arena = v as typeof m.arena; });
    onPick('segDifficulty', 'diff', (v) => { m.difficulty = v as DifficultyId; });
    onPick('segScore', 'score', (v) => { m.scoreLimit = Number(v); });
    onPick('segTime', 'time', (v) => { m.timeLimit = Number(v); });
  }

  // ------------------------------------------------------------ garage

  private previewLoadout(): Loadout {
    const l = { ...this.profile.loadout, upgrades: { ...this.profile.loadout.upgrades } };
    const s = this.selected;
    if (s?.kind === 'hull') l.hull = s.id;
    if (s?.kind === 'weapon') l.weapon = s.id;
    if (s?.kind === 'paint') l.paint = s.id;
    return l;
  }

  private renderGarage(): void {
    const p = this.profile;
    this.refreshProfile();
    document.querySelectorAll<HTMLButtonElement>('#garageTabs [data-tab]').forEach((b) => b.classList.toggle('active', b.dataset.tab === this.tab));
    const list = $('garageList');
    const items: ShopItem[] =
      this.tab === 'hulls' ? (Object.keys(HULLS) as HullId[]).map((id) => ({ kind: 'hull', id }))
        : this.tab === 'weapons' ? (Object.keys(WEAPONS) as WeaponId[]).map((id) => ({ kind: 'weapon', id }))
          : this.tab === 'paint' ? PAINTS.map((pt) => ({ kind: 'paint', id: pt.id })) : [];
    if (this.tab === 'upgrades') {
      list.innerHTML = UPGRADES.map((u) => {
        const lv = p.loadout.upgrades[u.id];
        const cost = upgradeCost(lv);
        const maxed = lv >= UPGRADE_MAX;
        const pips = Array.from({ length: UPGRADE_MAX }, (_, i) => `<i class="${i < lv ? 'on' : ''}"></i>`).join('');
        return `<div class="item"><h5>${u.name}</h5><span class="state">LV ${lv}/${UPGRADE_MAX}</span><p>${u.perLevel} per level. Applies to every hull and turret.</p><div class="upg-pips">${pips}</div><div class="act">${maxed ? '<span class="state">MAXED</span>' : `<button type="button" class="btn${p.credits >= cost ? ' primary' : ''}" data-upgrade="${u.id}" ${p.credits >= cost ? '' : 'disabled'}>UPGRADE · ◆ ${cost}</button>`}</div></div>`;
      }).join('');
      list.onclick = (e) => {
        const b = (e.target as HTMLElement).closest<HTMLElement>('[data-upgrade]');
        if (!b) return;
        if (buyUpgrade(p, b.dataset.upgrade as keyof Loadout['upgrades'])) {
          this.cb.sound('confirm');
          this.cb.profileChanged();
        } else this.cb.sound('deny');
        this.renderGarage();
      };
      this.renderStats(this.previewLoadout());
      this.cb.preview(this.previewLoadout());
      return;
    }
    const equipped = (it: ShopItem) => (it.kind === 'hull' ? p.loadout.hull === it.id : it.kind === 'weapon' ? p.loadout.weapon === it.id : p.loadout.paint === it.id);
    list.innerHTML = items.map((it, i) => {
      const info = itemInfo(it);
      const own = owns(p, it);
      const check = canBuy(p, it);
      const sel = this.selected ? this.selected.kind === it.kind && this.selected.id === it.id : equipped(it);
      let state = '';
      if (equipped(it)) state = '<span class="state">EQUIPPED</span>';
      else if (own) state = '<span class="state">OWNED</span>';
      else if (check === 'level') state = `<span class="state lock">LOCKED · LV ${info.level}</span>`;
      else state = `<span class="state">◆ ${info.cost}</span>`;
      let desc = '', role = '', title = esc(info.name);
      if (it.kind === 'hull') { const h = HULLS[it.id]; desc = `${h.blurb} Ability: ${ABILITIES[h.ability].name}.`; role = h.role; }
      if (it.kind === 'weapon') { const w = WEAPONS[it.id]; desc = w.blurb; role = w.role; }
      if (it.kind === 'paint') {
        const pt = PAINTS.find((x) => x.id === it.id)!;
        title = `<span class="swatch" style="background:linear-gradient(135deg,#${pt.body.toString(16).padStart(6, '0')} 55%,#${pt.accent.toString(16).padStart(6, '0')} 55%)"></span>${esc(pt.name)}`;
        desc = `Body finish with a matching emissive trim (team colours still apply in team modes).`;
      }
      let act = '';
      if (sel && !equipped(it)) {
        if (own) act = `<div class="act"><button type="button" class="btn primary" data-equip="${i}">EQUIP</button></div>`;
        else if (check === 'ok') act = `<div class="act"><button type="button" class="btn primary" data-buy="${i}">BUY · ◆ ${info.cost}</button></div>`;
        else if (check === 'credits') act = `<div class="act"><button type="button" class="btn" disabled>NEED ◆ ${info.cost - p.credits} MORE</button></div>`;
        else act = `<div class="act"><button type="button" class="btn" disabled>REACH LEVEL ${info.level}</button></div>`;
      }
      return `<div class="item${sel ? ' selected' : ''}${!own && check === 'level' ? ' locked' : ''}" data-idx="${i}"><div><h5>${title}</h5>${role ? `<span class="role">${role}</span>` : ''}</div>${state}<p>${desc}</p>${act}</div>`;
    }).join('');
    list.onclick = (e) => {
      const t = e.target as HTMLElement;
      const eq = t.closest<HTMLElement>('[data-equip]');
      const by = t.closest<HTMLElement>('[data-buy]');
      if (eq || by) {
        const it = items[Number((eq ?? by)!.dataset.equip ?? (eq ?? by)!.dataset.buy)];
        if (by) {
          if (buy(p, it) !== 'ok') { this.cb.sound('deny'); return; }
        }
        if (it.kind === 'hull') p.loadout.hull = it.id;
        if (it.kind === 'weapon') p.loadout.weapon = it.id;
        if (it.kind === 'paint') p.loadout.paint = it.id;
        this.cb.sound('confirm');
        this.selected = null;
        this.cb.profileChanged();
        this.renderGarage();
        return;
      }
      const row = t.closest<HTMLElement>('[data-idx]');
      if (!row) return;
      this.cb.sound('click');
      this.selected = items[Number(row.dataset.idx)];
      this.renderGarage();
    };
    const pl = this.previewLoadout();
    this.renderStats(pl);
    this.cb.preview(pl);
  }

  private renderStats(l: Loadout): void {
    const h = HULLS[l.hull], w = WEAPONS[l.weapon];
    const up = l.upgrades;
    const dmgMult = 1 + 0.06 * up.damage;
    const rl = 1 - 0.06 * up.reload;
    const hp = h.health, armor = h.armor + 7 * up.armor, speed = h.maxSpeed * (1 + 0.04 * up.speed);
    const perShot = (w.damage + w.splashDamage) * dmgMult;
    const rate = 1 / (w.cooldown * rl + w.charge);
    const sustained = w.magazine > 0 ? (w.magazine * perShot) / (w.magazine * w.cooldown * rl + w.reloadTime * rl) : w.heatPerShot > 0 ? perShot * Math.min(rate, w.coolRate / w.heatPerShot + 2) : perShot * rate;
    const range = w.speed * w.lifetime;
    const row = (label: string, v: number, max: number, text: string) => `<div class="stat"><span>${label}</span><i><b style="width:${Math.min(1, v / max) * 100}%"></b></i><em>${text}</em></div>`;
    const ab = ABILITIES[h.ability];
    $('garageStats').innerHTML = `
      <h4>${h.name} · ${w.name}</h4>
      ${row('HULL', hp, 370, String(hp))}
      ${row('ARMOR', armor, 80, String(armor))}
      ${row('TOP SPEED', speed, 20, `${(speed * 3.6).toFixed(0)} km/h`)}
      ${row('TURNING', h.turnRate, 2.4, `${((h.turnRate * 180) / Math.PI).toFixed(0)}°/s`)}
      ${row('DMG / SHOT', perShot, 90, perShot.toFixed(0))}
      ${row('FIRE RATE', rate, 12, `${rate.toFixed(1)}/s`)}
      ${row('SUSTAINED', sustained, 80, `${sustained.toFixed(0)} dps`)}
      ${row('RANGE', range, 280, `${range.toFixed(0)} m`)}
      ${row('TURRET', w.turretSpeed, 3, `${((w.turretSpeed * 180) / Math.PI).toFixed(0)}°/s`)}
      <div class="ability"><b>${ab.name}</b> — ${ab.blurb} Recharges in ${ab.chargeTime}s (faster when dealing damage).</div>`;
  }

  // ------------------------------------------------------------ settings

  private bindSettings(): void {
    const s = this.settings;
    const range = (id: string, out: string, key: keyof Settings, fmt: (v: number) => string) => {
      const el = $(id) as HTMLInputElement;
      el.addEventListener('input', () => {
        (s[key] as number) = Number(el.value);
        $(out).textContent = fmt(Number(el.value));
        this.cb.settingsChanged(s);
      });
    };
    const pct = (v: number) => `${Math.round(v * 100)}%`;
    range('sMaster', 'oMaster', 'masterVolume', pct);
    range('sSfx', 'oSfx', 'sfxVolume', pct);
    range('sMusic', 'oMusic', 'musicVolume', pct);
    range('sSens', 'oSens', 'sensitivity', (v) => v.toFixed(2));
    range('sFov', 'oFov', 'fov', (v) => `${v}°`);
    range('sSmooth', 'oSmooth', 'smoothing', pct);
    range('sDist', 'oDist', 'cameraDistance', (v) => `${v} m`);
    const toggle = (id: string, key: keyof Settings) => {
      const el = $(id) as HTMLInputElement;
      el.addEventListener('change', () => {
        (s[key] as boolean) = el.checked;
        this.cb.settingsChanged(s);
      });
    };
    toggle('sMute', 'muted');
    toggle('sInvert', 'invertY');
    toggle('sShake', 'shake');
    toggle('sFps', 'showFps');
    $('segQuality').addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>('[data-quality]');
      if (!b) return;
      this.cb.sound('click');
      s.quality = b.dataset.quality as Settings['quality'];
      this.syncSettings();
      this.cb.settingsChanged(s);
    });
  }

  syncSettings(): void {
    const s = this.settings;
    const set = (id: string, v: number | boolean) => {
      const el = $(id) as HTMLInputElement;
      if (typeof v === 'boolean') el.checked = v;
      else el.value = String(v);
      el.dispatchEvent(new Event(typeof v === 'boolean' ? 'sync' : 'input'));
    };
    set('sMaster', s.masterVolume);
    set('sSfx', s.sfxVolume);
    set('sMusic', s.musicVolume);
    set('sSens', s.sensitivity);
    set('sFov', s.fov);
    set('sSmooth', s.smoothing);
    set('sDist', s.cameraDistance);
    set('sMute', s.muted);
    set('sInvert', s.invertY);
    set('sShake', s.shake);
    set('sFps', s.showFps);
    document.querySelectorAll<HTMLElement>('#segQuality [data-quality]').forEach((b) => b.classList.toggle('active', b.dataset.quality === s.quality));
    $('qualityNote').textContent = s.quality === 'low' ? 'Low: no shadows, bloom or dynamic lights. Applies from the next match.' : s.quality === 'medium' ? 'Medium: soft shadows, bloom, a few dynamic lights. Applies from the next match.' : 'High: sharper shadows, all arena lights, higher resolution. Applies from the next match.';
  }

  // ------------------------------------------------------------ pause / end

  setPauseInfo(text: string): void {
    $('pauseInfo').textContent = text;
  }

  showEnd(w: World, summary: MatchSummary, rewards: Rewards): void {
    const title = $('endTitle');
    title.textContent = summary.result === 'win' ? 'VICTORY' : summary.result === 'loss' ? 'DEFEAT' : 'DRAW';
    title.className = `result ${summary.result}`;
    $('endKicker').textContent = `${MODES[w.mode].name} · ${w.arena.name} · ${DIFFICULTIES[w.config.difficulty].name}`;
    const teams = MODES[w.mode].teams;
    if (teams) $('endScore').innerHTML = `<span class="blue">BLUE ${w.score.blue}</span> — <span class="magenta">${w.score.magenta} MAGENTA</span>`;
    else {
      const rank = w.ranking().findIndex((t) => t === w.player) + 1;
      $('endScore').textContent = `PLACED #${rank} OF ${w.tanks.length}`;
    }
    $('endBoard').innerHTML = scoreboardHtml(w);
    const lv = rewards.levelsGained > 0 ? `<div class="lvup">LEVEL UP · LV ${rewards.newLevel}</div>` : '';
    const un = rewards.unlocked.length ? `<h4 style="margin-top:12px">NOW AVAILABLE</h4><ul>${rewards.unlocked.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>` : '';
    $('endRewards').innerHTML = `
      <h4>REWARDS</h4>
      <div class="rw"><span>Kills / deaths / assists</span><span>${summary.kills} / ${summary.deaths} / ${summary.assists}</span></div>
      <div class="rw"><span>Damage dealt</span><span>${Math.round(summary.damage)}</span></div>
      <div class="rw"><span>Best streak</span><span>${summary.bestStreak}</span></div>
      <div class="rw"><span>Experience</span><strong>+${rewards.xp} XP</strong></div>
      <div class="rw"><span>Credits</span><strong>+◆ ${rewards.credits}</strong></div>
      ${lv}${un}`;
    this.refreshProfile();
    this.show('end');
  }
}
