import { MAX_HP } from '../game/Config';
import type { LevelRecord, Rank, SaveData, Settings } from '../game/Save';
import type { LevelDef } from '../world/Level';
import { WORLD_NAMES } from '../world/levels';
import type { World } from '../world/World';

export type ScreenId = 'title' | 'levels' | 'howto' | 'settings' | 'intro' | 'pause' | 'complete' | 'gameover' | 'ending';
const SCREENS: ScreenId[] = ['title', 'levels', 'howto', 'settings', 'intro', 'pause', 'complete', 'gameover', 'ending'];

const $ = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing #${id}`);
  return el as T;
};

export const fmtTime = (s: number): string => {
  const m = Math.floor(s / 60);
  const r = s - m * 60;
  return `${m}:${r < 10 ? '0' : ''}${r.toFixed(1)}`;
};

export interface CompleteInfo {
  def: LevelDef;
  volts: number;
  voltsTotal: number;
  shards: number;
  secrets: number;
  secretsTotal: number;
  time: number;
  score: number;
  rank: Rank;
  record: LevelRecord;
  newBest: boolean;
  last: boolean;
}

/** DOM screens, HUD and menus. No game rules live here. */
export class Ui {
  readonly hud = $('hud');
  readonly touch = $('touch');
  private readonly hp = Array.from($('hudHp').children) as HTMLElement[];
  private readonly shards = Array.from($('hudShards').querySelectorAll('i')) as HTMLElement[];
  private toastTimer = 0;
  private typeTimer: number | null = null;
  private readonly cache = new Map<string, string>();
  current: ScreenId | null = 'title';
  dialogOpen = false;

  on(id: string, fn: () => void): void {
    $(id).addEventListener('click', fn);
  }

  el<T extends HTMLElement = HTMLElement>(id: string): T {
    return $<T>(id);
  }

  show(screen: ScreenId | null): void {
    this.current = screen;
    for (const s of SCREENS) $(s).classList.toggle('hidden', s !== screen);
    if (screen) {
      const first = $(screen).querySelector<HTMLElement>('.btn.primary:not([disabled]), .btn:not([disabled]), .lvl:not([disabled])');
      // Focus the main action so keyboard players can press Enter straight away.
      requestAnimationFrame(() => first?.focus({ preventScroll: true }));
    }
  }

  fade(on: boolean): void {
    $('fade').classList.toggle('on', on);
  }

  // ------------------------------------------------------------------ title & menus

  titleProgress(save: SaveData, levels: LevelDef[]): void {
    const cleared = save.levels.filter((l) => l.done).length;
    const shards = save.levels.reduce((n, l) => n + ((l.shards & 1) + ((l.shards >> 1) & 1) + ((l.shards >> 2) & 1)), 0);
    const tokens = save.levels.filter((l) => l.token).length;
    $('btnContinue').classList.toggle('hidden', save.unlocked === 0 && cleared === 0);
    $('titleProgress').textContent = cleared
      ? `CLEARED ${cleared}/${levels.length} · SHARDS ${shards}/${levels.length * 3} · TOKENS ${tokens}/${levels.length}${save.beaten ? ' · CORE RESTORED' : ''}`
      : '';
  }

  levelGrid(save: SaveData, levels: LevelDef[], pick: (i: number) => void): void {
    const grid = $('levelGrid');
    grid.textContent = '';
    let world = -1;
    levels.forEach((def, i) => {
      if (def.world !== world) {
        world = def.world;
        const label = document.createElement('p');
        label.className = 'world-label';
        label.textContent = `WORLD ${world + 1} · ${WORLD_NAMES[world].toUpperCase()}`;
        grid.append(label);
      }
      const rec = save.levels[i];
      const locked = i > save.unlocked;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'lvl';
      b.disabled = locked;
      const gems = [0, 1, 2].map((k) => `<span class="${rec.shards & (1 << k) ? 'on' : ''}">◆</span>`).join('') + `<span class="tok ${rec.token ? 'on' : ''}">●</span>`;
      b.innerHTML = `<span class="id">${def.id}</span><span class="nm">${locked ? 'Locked' : def.name}</span>
        <span class="meta"><span class="gems" aria-label="Shards and token">${gems}</span><span>${rec.bestTime ? fmtTime(rec.bestTime) : locked ? '' : 'Not cleared'}</span><span class="rk">${rec.rank ?? ''}</span></span>`;
      b.addEventListener('click', () => pick(i));
      grid.append(b);
    });
  }

  fillSettings(s: Settings, tokens: number, storageOk: boolean): void {
    $<HTMLInputElement>('setMusic').value = String(s.music);
    $<HTMLInputElement>('setSfx').value = String(s.sfx);
    $<HTMLInputElement>('setMute').checked = s.muted;
    $<HTMLInputElement>('setReduced').checked = s.reducedMotion;
    $<HTMLInputElement>('setTimer').checked = s.showTimer;
    $<HTMLSelectElement>('setTouch').value = s.touch;
    const skin = $<HTMLSelectElement>('setSkin');
    skin.value = s.skin;
    const retro = skin.querySelector<HTMLOptionElement>('option[value="retro"]')!;
    retro.disabled = tokens < 6;
    retro.textContent = tokens < 6 ? `Retro (find all 6 tokens: ${tokens}/6)` : 'Retro';
    $('saveNote').textContent = storageOk ? 'Progress saves automatically in this browser.' : 'This browser is blocking storage, so progress lasts only until you close the tab.';
  }

  readSettings(): Settings {
    const touch = $<HTMLSelectElement>('setTouch').value;
    return {
      music: Number($<HTMLInputElement>('setMusic').value),
      sfx: Number($<HTMLInputElement>('setSfx').value),
      muted: $<HTMLInputElement>('setMute').checked,
      reducedMotion: $<HTMLInputElement>('setReduced').checked,
      showTimer: $<HTMLInputElement>('setTimer').checked,
      touch: touch === 'on' || touch === 'off' ? touch : 'auto',
      skin: $<HTMLSelectElement>('setSkin').value === 'retro' ? 'retro' : 'classic',
    };
  }

  intro(def: LevelDef): void {
    $('introWorld').textContent = `WORLD ${def.id} · ${WORLD_NAMES[def.world].toUpperCase()}`;
    $('introName').textContent = def.name.toUpperCase();
    $('introLine').textContent = def.intro;
  }

  complete(c: CompleteInfo): void {
    $('compWorld').textContent = `${c.def.id} · ${c.def.name.toUpperCase()}`;
    $('compTitle').textContent = c.last ? 'CORE RESTORED' : 'LEVEL CLEAR';
    const rank = $('compRank');
    rank.textContent = c.rank;
    rank.className = `rank ${c.rank}`;
    $('compVolts').textContent = `${c.volts}/${c.voltsTotal}`;
    $('compShards').textContent = `${c.shards}/3`;
    $('compSecrets').textContent = `${c.secrets}/${c.secretsTotal}`;
    $('compTime').textContent = fmtTime(c.time);
    $('compScore').textContent = c.score.toLocaleString('en-US');
    $('compBest').textContent = c.record.bestTime ? fmtTime(c.record.bestTime) : '—';
    $('compNote').textContent = c.newBest ? 'New personal best, saved in this browser.' : `Par time ${fmtTime(c.def.par)}. Collect every shard and beat par for an S rank.`;
    $('btnNext').textContent = c.last ? 'THE END' : 'NEXT LEVEL';
  }

  ending(text: string, unlock: string): void {
    $('endStats').textContent = text;
    $('endUnlock').textContent = unlock;
  }

  // ------------------------------------------------------------------ HUD

  private set(id: string, value: string): void {
    if (this.cache.get(id) === value) return;
    this.cache.set(id, value);
    $(id).textContent = value;
  }

  hudLevel(def: LevelDef): void {
    this.set('hudLevel', def.id);
    this.set('hudName', def.name.toUpperCase());
    this.cache.clear();
  }

  updateHud(world: World, lives: number, bank: number, showTimer: boolean): void {
    const p = world.player;
    const hpKey = `${p.hp}`;
    if (this.cache.get('hp') !== hpKey) {
      this.cache.set('hp', hpKey);
      this.hp.forEach((el, i) => el.classList.toggle('on', i < p.hp));
      $('hudHp').classList.toggle('low', p.hp === 1 && MAX_HP > 1);
    }
    this.set('hudLives', String(lives));
    this.set('hudVolts', String(bank));
    const shardKey = world.shards.join() + world.token;
    if (this.cache.get('shards') !== shardKey) {
      this.cache.set('shards', shardKey);
      this.shards.forEach((el, i) => el.classList.toggle('on', world.shards[i]));
      $('hudToken').classList.toggle('on', world.token);
    }
    $('hudProgress').style.width = `${(world.progress * 100).toFixed(1)}%`;
    const timer = $('hudTimer');
    timer.classList.toggle('hidden', !showTimer);
    if (showTimer) this.set('hudTimer', fmtTime(world.time));

    const power = $('hudPower');
    const kind = p.shield > 0 ? 'shield' : p.overdrive > 0 ? 'over' : '';
    power.classList.toggle('hidden', !kind);
    if (kind) {
      power.className = `hud-power ${kind}`;
      this.set('hudPowerName', kind === 'shield' ? 'PULSE SHIELD' : 'OVERDRIVE');
      const frac = kind === 'shield' ? p.shield / 25 : p.overdrive / 12;
      $('hudPowerBar').style.transform = `scaleX(${Math.max(0, Math.min(1, frac)).toFixed(3)})`;
    }
    const b = world.boss;
    const bossOn = !!b && b.state !== 'wait' && b.state !== 'dead';
    $('hudBoss').classList.toggle('hidden', !bossOn);
    if (b && bossOn) $('hudBossBar').style.transform = `scaleX(${(b.hp / b.maxHp).toFixed(3)})`;
    this.touch.classList.toggle('near', world.nearTerminal >= 0);
  }

  toast(text: string): void {
    const t = $('hudToast');
    t.textContent = text;
    t.classList.add('on');
    clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => t.classList.remove('on'), 1600);
  }

  // ------------------------------------------------------------------ terminal dialog

  openDialog(text: string, reduced: boolean): void {
    this.dialogOpen = true;
    const box = $('dialogText');
    $('dialog').classList.remove('hidden');
    if (this.typeTimer !== null) clearInterval(this.typeTimer);
    if (reduced) {
      box.textContent = text;
      return;
    }
    let i = 0;
    box.textContent = '';
    this.typeTimer = window.setInterval(() => {
      i = Math.min(text.length, i + 2);
      box.textContent = text.slice(0, i);
      if (i >= text.length && this.typeTimer !== null) {
        clearInterval(this.typeTimer);
        this.typeTimer = null;
      }
    }, 16);
  }

  /** First press finishes the typing; the next closes. Returns true when closed. */
  advanceDialog(full: string): boolean {
    if (this.typeTimer !== null) {
      clearInterval(this.typeTimer);
      this.typeTimer = null;
      $('dialogText').textContent = full;
      return false;
    }
    this.closeDialog();
    return true;
  }

  closeDialog(): void {
    if (this.typeTimer !== null) clearInterval(this.typeTimer);
    this.typeTimer = null;
    this.dialogOpen = false;
    $('dialog').classList.add('hidden');
  }
}
