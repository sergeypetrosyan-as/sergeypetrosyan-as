import type { Settings } from '../game/Save';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

export type Screen = 'title' | 'districts' | 'settings' | 'intro' | 'play' | 'paused' | 'failed' | 'complete' | 'ending' | 'none';

export interface UiActions {
  begin(): void;
  continueRun(): void;
  openDistricts(): void;
  pickDistrict(i: number): void;
  resume(): void;
  restart(): void;
  next(): void;
  quit(): void;
  settings(s: Settings): void;
  skipIntro(): void;
  click(): void;
}

/** DOM overlays. Holds no game state; everything flows through `UiActions`. */
export class Ui {
  private screen: Screen = 'title';
  private settingsReturn: Screen = 'title';
  private s: Settings;
  private cache = new Map<string, string>();

  constructor(settings: Settings, private readonly act: UiActions) {
    this.s = { ...settings };
    const bind = (id: string, fn: () => void) => $(id).addEventListener('click', () => { act.click(); fn(); });
    bind('btnBegin', () => act.begin());
    bind('btnContinue', () => act.continueRun());
    bind('btnDistricts', () => act.openDistricts());
    bind('btnSettings', () => this.openSettings());
    bind('btnResume', () => act.resume());
    bind('btnRestart', () => act.restart());
    bind('btnPauseSettings', () => this.openSettings());
    bind('btnQuit', () => act.quit());
    bind('btnRetry', () => act.restart());
    bind('btnFailQuit', () => act.quit());
    bind('btnNext', () => act.next());
    bind('btnReplayDistrict', () => act.restart());
    bind('btnEndAgain', () => act.begin());
    bind('btnEndDistricts', () => act.openDistricts());
    bind('btnDistrictsBack', () => act.quit());
    bind('btnSettingsDone', () => this.show(this.settingsReturn));
    $('intro').addEventListener('click', () => act.skipIntro());

    const range = (id: string, key: 'music' | 'sfx') => {
      const el = $<HTMLInputElement>(id);
      el.addEventListener('input', () => { this.s[key] = Number(el.value); act.settings({ ...this.s }); });
    };
    range('setMusic', 'music');
    range('setSfx', 'sfx');
    const toggle = (id: string, key: 'muted' | 'reducedMotion') => {
      const el = $<HTMLInputElement>(id);
      el.addEventListener('change', () => { this.s[key] = el.checked; act.settings({ ...this.s }); this.syncSettings(); });
    };
    toggle('setMute', 'muted');
    toggle('setReduced', 'reducedMotion');
    this.syncSettings();
  }

  get current(): Screen {
    return this.screen;
  }

  show(screen: Screen): void {
    this.screen = screen;
    const ids: Record<string, Screen[]> = {
      title: ['title'], districts: ['districts'], settings: ['settings'], intro: ['intro'],
      pause: ['paused'], failed: ['failed'], complete: ['complete'], ending: ['ending'],
    };
    for (const [id, on] of Object.entries(ids)) $(id).classList.toggle('hidden', !on.includes(screen));
    $('hud').classList.toggle('hidden', !['play', 'paused', 'failed', 'complete', 'intro'].includes(screen));
    const focus: Partial<Record<Screen, string>> = { title: 'btnBegin', paused: 'btnResume', failed: 'btnRetry', complete: 'btnNext', ending: 'btnEndAgain', districts: 'btnDistrictsBack', settings: 'btnSettingsDone' };
    const f = focus[screen];
    if (f) setTimeout(() => $(f).focus({ preventScroll: true }), 40);
  }

  private openSettings(): void {
    this.settingsReturn = this.screen === 'paused' ? 'paused' : 'title';
    this.syncSettings();
    this.show('settings');
  }

  private syncSettings(): void {
    $<HTMLInputElement>('setMusic').value = String(this.s.music);
    $<HTMLInputElement>('setSfx').value = String(this.s.sfx);
    $<HTMLInputElement>('setMute').checked = this.s.muted;
    $<HTMLInputElement>('setReduced').checked = this.s.reducedMotion;
    document.body.classList.toggle('reduced', this.s.reducedMotion);
  }

  setTitle(continueLabel: string | null, bestLight: number | null): void {
    const c = $('btnContinue');
    c.classList.toggle('hidden', !continueLabel);
    if (continueLabel) c.textContent = continueLabel;
    $('titleBest').textContent = bestLight === null ? '' : `Best ending so far: ${Math.round(bestLight)}% of the light kept.`;
  }

  setDistricts(rows: Array<{ name: string; locked: boolean; best: number | null }>): void {
    const list = $('districtList');
    list.innerHTML = '';
    rows.forEach((r, i) => {
      const b = document.createElement('button');
      b.className = 'district';
      b.disabled = r.locked;
      b.innerHTML = `<span class="d-num">${i + 1}</span><span class="d-name">${r.locked ? 'Not reached yet' : r.name}</span><span class="d-best">${r.best === null ? '' : `${r.best.toFixed(1)} s borrowed`}</span>`;
      b.addEventListener('click', () => { this.act.click(); this.act.pickDistrict(i); });
      list.appendChild(b);
    });
  }

  intro(index: number, total: number, name: string, line: string): void {
    $('introCount').textContent = `District ${index + 1} of ${total}`;
    $('introName').textContent = name;
    $('introLine').textContent = line;
    this.show('intro');
  }

  /** Per-frame HUD values; DOM is only touched when something changed. */
  hud(v: { name: string; index: number; total: number; light: number; budget: number; maxBudget: number; hint: string | null; message: string | null; lensSize: number }): void {
    this.set('hudName', v.name);
    this.set('hudCount', `District ${v.index + 1} of ${v.total}`);
    this.set('hudLight', `${Math.max(0, Math.round(v.light))}%`);
    const lb = $('hudLightBar');
    const lw = `${Math.max(0, Math.min(100, v.light))}%`;
    if (lb.style.width !== lw) lb.style.width = lw;
    this.set('hudBudget', v.budget > 0 ? `${v.budget.toFixed(1)} s to spare` : 'No time to spare');
    const bb = $('hudBudgetBar');
    const bw = `${Math.min(100, (v.budget / v.maxBudget) * 100).toFixed(1)}%`;
    if (bb.style.width !== bw) bb.style.width = bw;
    $('hudBudgetWrap').classList.toggle('empty', v.budget <= 0);
    this.set('hudHint', v.hint ?? '');
    $('hudHint').classList.toggle('hidden', !v.hint);
    this.set('hudMessage', v.message ?? '');
    $('hudMessage').classList.toggle('hidden', !v.message);
    this.set('hudLens', ['Small circle', 'Medium circle', 'Large circle'][v.lensSize]);
  }

  private set(id: string, text: string): void {
    if (this.cache.get(id) === text) return;
    this.cache.set(id, text);
    $(id).textContent = text;
  }

  failed(cause: string): void {
    const why: Record<string, string> = {
      fell: 'She fell, and you let go of her past too soon.',
      crushed: 'A press came down on her.',
      struck: 'A falling sign caught her.',
      erased: 'The Hush reached her.',
    };
    $('failWhy').textContent = why[cause] ?? 'She came apart.';
    this.show('failed');
  }

  complete(v: { name: string; borrowed: number; best: number | null; sparks: number; totalSparks: number; time: number; light: number; last: boolean }): void {
    $('compName').textContent = `${v.name}, crossed`;
    $('compBorrowed').textContent = `${v.borrowed.toFixed(1)} s`;
    $('compBest').textContent = v.best === null || v.borrowed <= v.best ? 'Your best' : `Best ${v.best.toFixed(1)} s`;
    $('compSparks').textContent = `${v.sparks} of ${v.totalSparks}`;
    $('compTime').textContent = `${Math.floor(v.time / 60)}:${String(Math.floor(v.time % 60)).padStart(2, '0')}`;
    $('compLight').textContent = `${Math.round(v.light)}%`;
    $('btnNext').textContent = v.last ? 'Climb the lighthouse' : 'Next district';
    this.show('complete');
  }

  ending(tier: 'dawn' | 'lantern' | 'ember', light: number, borrowed: number): void {
    const text = {
      dawn: ['Dawn', 'The lantern was nearly full. When the lighthouse took it, the light went out across the bay and found every street, every window, every name. Vesper ended, but nothing of it was forgotten.'],
      lantern: ['Lantern', 'The lighthouse kept what she carried: the streets, the signs, the shape of the harbor. The faces are gone. Someone will still know there was a city here.'],
      ember: ['Ember', 'There was almost nothing left in the lantern. The lighthouse kept one street and one word on one sign. It is enough to start a story, if anyone comes looking.'],
    }[tier];
    $('endTier').textContent = text[0];
    $('endText').textContent = text[1];
    $('endStats').textContent = `You borrowed ${borrowed.toFixed(1)} seconds tonight. ${Math.round(light)}% of the light reached the lighthouse.`;
    this.show('ending');
  }
}
