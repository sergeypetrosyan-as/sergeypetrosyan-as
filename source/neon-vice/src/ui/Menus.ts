import type { QualityLevel } from '../game/GameConfig';
import type { Records, Settings } from '../game/Storage';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

export interface MenuCallbacks {
  onStart(): void;
  onResume(): void;
  onRestart(): void;
  onQuit(): void;
  onReplay(): void;
  onSettings(s: Settings): void;
  onResetRecords(): void;
  onLock(): void;
  onUiSound(kind: 'click' | 'hover'): void;
  /** Called on the first user gesture so audio can be unlocked. */
  onGesture(): void;
}

export type Screen = 'title' | 'pause' | 'end' | 'none' | 'lock';

export interface EndStats {
  won: boolean;
  score: number;
  kills: number;
  waves: number;
  accuracy: number;
  headshots: number;
  bestCombo: number;
  time: number;
  newBest: boolean;
}

/**
 * Title / pause / end screens and the shared settings + how-to-play dialogs.
 * Owns DOM wiring only; game state changes go out through callbacks.
 */
export class Menus {
  private settings: Settings;
  private modalReturn: Screen = 'title';
  private current: Screen = 'title';
  private readonly screens = {
    title: $('title'), pause: $('pause'), end: $('end'), how: $('how'), settings: $('settings'), lock: $('lockPrompt'),
  };

  constructor(initial: Settings, cb: MenuCallbacks) {
    this.settings = { ...initial };
    const click = (id: string, fn: () => void) => $(id).addEventListener('click', () => { cb.onUiSound('click'); fn(); });
    click('btnStart', () => cb.onStart());
    click('btnHow', () => this.openModal('how'));
    click('btnSettings', () => this.openModal('settings'));
    click('btnResume', () => cb.onResume());
    click('btnRestart', () => cb.onRestart());
    click('btnPauseSettings', () => this.openModal('settings'));
    click('btnPauseHow', () => this.openModal('how'));
    click('btnQuit', () => cb.onQuit());
    click('btnReplay', () => cb.onReplay());
    click('btnEndTitle', () => cb.onQuit());
    click('btnLock', () => cb.onLock());
    click('btnSound', () => {
      this.settings.muted = !this.settings.muted;
      this.syncSettingsUI();
      cb.onSettings({ ...this.settings });
    });
    click('btnResetRecords', () => {
      if (window.confirm('Reset your local best score and records? This cannot be undone.')) cb.onResetRecords();
    });
    document.querySelectorAll<HTMLElement>('[data-close]').forEach((el) => el.addEventListener('click', () => { cb.onUiSound('click'); this.closeModal(); }));
    document.querySelectorAll<HTMLElement>('.btn').forEach((el) => el.addEventListener('mouseenter', () => cb.onUiSound('hover')));

    const range = (id: string, out: string, key: 'sensitivity' | 'musicVolume' | 'sfxVolume', fmt: (v: number) => string) => {
      const input = $<HTMLInputElement>(id);
      input.addEventListener('input', () => {
        this.settings[key] = Number(input.value);
        $(out).textContent = fmt(this.settings[key]);
        cb.onSettings({ ...this.settings });
      });
    };
    range('setSens', 'outSens', 'sensitivity', (v) => v.toFixed(1));
    range('setMusic', 'outMusic', 'musicVolume', (v) => String(Math.round(v * 100)));
    range('setSfx', 'outSfx', 'sfxVolume', (v) => String(Math.round(v * 100)));
    const toggle = (id: string, key: 'muted' | 'invertY' | 'reducedShake' | 'highContrast') => {
      const input = $<HTMLInputElement>(id);
      input.addEventListener('change', () => {
        this.settings[key] = input.checked;
        this.syncSettingsUI();
        cb.onSettings({ ...this.settings });
      });
    };
    toggle('setMute', 'muted');
    toggle('setInvert', 'invertY');
    toggle('setShake', 'reducedShake');
    toggle('setContrast', 'highContrast');
    document.querySelectorAll<HTMLButtonElement>('[data-quality]').forEach((b) => {
      b.setAttribute('role', 'radio');
      b.addEventListener('click', () => {
        cb.onUiSound('click');
        this.settings.quality = b.dataset.quality as QualityLevel;
        this.syncSettingsUI();
        cb.onSettings({ ...this.settings });
      });
    });

    // Any first interaction unlocks audio (browsers block autoplay until then).
    const gesture = () => {
      cb.onGesture();
      window.removeEventListener('pointerdown', gesture);
      window.removeEventListener('keydown', gesture);
    };
    window.addEventListener('pointerdown', gesture);
    window.addEventListener('keydown', gesture);
    window.addEventListener('keydown', (e) => {
      if (e.code !== 'Escape') return;
      if (!this.screens.how.classList.contains('hidden') || !this.screens.settings.classList.contains('hidden')) this.closeModal();
    });

    if (matchMedia('(pointer: coarse)').matches && !matchMedia('(pointer: fine)').matches) {
      $('deviceNote').textContent = 'This is a desktop game — it needs a keyboard and mouse. Enjoy the view!';
    }
    this.syncSettingsUI();
  }

  get screen(): Screen {
    return this.current;
  }

  get modalOpen(): boolean {
    return !this.screens.how.classList.contains('hidden') || !this.screens.settings.classList.contains('hidden');
  }

  show(screen: Screen): void {
    this.current = screen;
    this.screens.title.classList.toggle('hidden', screen !== 'title');
    this.screens.pause.classList.toggle('hidden', screen !== 'pause');
    this.screens.end.classList.toggle('hidden', screen !== 'end');
    this.screens.lock.classList.toggle('hidden', screen !== 'lock');
    this.screens.how.classList.add('hidden');
    this.screens.settings.classList.add('hidden');
    const focus = screen === 'title' ? 'btnStart' : screen === 'pause' ? 'btnResume' : screen === 'end' ? 'btnReplay' : screen === 'lock' ? 'btnLock' : null;
    if (focus) window.setTimeout(() => $(focus).focus({ preventScroll: true }), 30);
  }

  private openModal(which: 'how' | 'settings'): void {
    this.modalReturn = this.current;
    this.screens.title.classList.add('hidden');
    this.screens.pause.classList.add('hidden');
    this.screens[which].classList.remove('hidden');
    this.syncSettingsUI();
    const first = this.screens[which].querySelector<HTMLElement>('input, button');
    first?.focus({ preventScroll: true });
  }

  private closeModal(): void {
    this.show(this.modalReturn);
  }

  setRecords(r: Records): void {
    $('titleBest').textContent = r.bestScore.toLocaleString('en-US');
    $('titleWave').textContent = r.highestWave ? `HIGHEST WAVE ${r.highestWave} · ${r.totalKills} TAKEDOWNS` : 'NO RUNS YET';
    const list = $('recordsList');
    if (!r.runs.length) {
      list.innerHTML = '<li class="empty">No runs yet — set the first record.</li>';
      return;
    }
    list.innerHTML = r.runs
      .map((run) => {
        const d = new Date(run.date);
        const date = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        return `<li><span>W${run.wave}${run.completed ? ' ✓' : ''}</span><b>${run.score.toLocaleString('en-US')}</b><em>${date}</em></li>`;
      })
      .join('');
  }

  showEnd(s: EndStats): void {
    $('endTitle').textContent = s.won ? 'CITY SECURED' : 'FLATLINED';
    $('end').querySelector('.end-card')!.classList.toggle('win', s.won);
    $('endKicker').textContent = s.won ? 'MISSION 01 — NIGHTFALL · COMPLETE' : 'MISSION 01 — NIGHTFALL · FAILED';
    $('endRecord').classList.toggle('hidden', !s.newBest);
    $('endScore').textContent = s.score.toLocaleString('en-US');
    $('endKills').textContent = String(s.kills);
    $('endWaves').textContent = String(s.waves);
    $('endAccuracy').textContent = `${Math.round(s.accuracy * 100)}%`;
    $('endHeads').textContent = String(s.headshots);
    $('endCombo').textContent = `x${s.bestCombo}`;
    const m = Math.floor(s.time / 60), sec = Math.floor(s.time % 60);
    $('endTime').textContent = `${m}:${String(sec).padStart(2, '0')}`;
    this.show('end');
  }

  private syncSettingsUI(): void {
    const s = this.settings;
    $<HTMLInputElement>('setSens').value = String(s.sensitivity);
    $('outSens').textContent = s.sensitivity.toFixed(1);
    $<HTMLInputElement>('setMusic').value = String(s.musicVolume);
    $('outMusic').textContent = String(Math.round(s.musicVolume * 100));
    $<HTMLInputElement>('setSfx').value = String(s.sfxVolume);
    $('outSfx').textContent = String(Math.round(s.sfxVolume * 100));
    $<HTMLInputElement>('setMute').checked = s.muted;
    $<HTMLInputElement>('setInvert').checked = s.invertY;
    $<HTMLInputElement>('setShake').checked = s.reducedShake;
    $<HTMLInputElement>('setContrast').checked = s.highContrast;
    document.querySelectorAll<HTMLButtonElement>('[data-quality]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.quality === s.quality)));
    const btn = $('btnSound');
    btn.setAttribute('aria-pressed', String(!s.muted));
    btn.querySelector('span')!.textContent = s.muted ? 'SOUND OFF' : 'SOUND ON';
    document.body.classList.toggle('high-contrast', s.highContrast);
  }
}
