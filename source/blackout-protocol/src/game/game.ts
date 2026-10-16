import type { Difficulty, World } from '../sim/types.ts';
import { MISSIONS } from '../missions/missions.ts';
import { computeResult, createWorld, hackables, restoreSnapshot, step, takeSnapshot } from '../sim/world.ts';
import type { MissionResult, Snapshot } from '../sim/world.ts';
import { isLit } from '../sim/grid.ts';
import { K, STEP } from '../sim/vision.ts';
import { DIR_NAMES } from '../hacking/puzzle.ts';
import { AudioEngine } from '../audio/audio.ts';
import { Renderer } from '../render/renderer.ts';
import type { GameRenderer } from '../render/types.ts';
import { Renderer3D } from '../render/three/renderer3d.ts';
import type { Quality } from '../render/three/quality.ts';
import { loadSave, writeSave } from '../storage/store.ts';
import type { QualityPref, SaveData } from '../storage/store.ts';
import { InputState } from './input.ts';

type Mode = 'menu' | 'playing' | 'paused' | 'compromised' | 'result';

const $ = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing element #${id}`);
  return el as T;
};

const GLYPH = ['▲', '▶', '▼', '◀'];
const SCREENS = ['title', 'missions', 'briefing', 'settings', 'help', 'pause', 'compromised', 'result', 'epilogue', 'error'];
const KEEP_UPPER = /^(ALPHA|BETA|WARDEN|R\d|[A-J]|HX-\d+|\d+S?)$/;

function fmtTime(t: number): string {
  const s = Math.floor(t);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
const pad2 = (n: number): string => String(n).padStart(2, '0');

/** Simulation messages are written in capitals; show them as plain sentence-case copy. */
export function sentence(msg: string): string {
  const words = msg.split(/(\s+)/).map((w, i) => {
    const core = w.replace(/[^A-Z0-9-]/g, '');
    if (core && KEEP_UPPER.test(core) && i > 0) return w;
    return w.toLowerCase();
  });
  const s = words.join('');
  const i = s.search(/[a-z]/);
  return i < 0 ? s : s.slice(0, i) + s.charAt(i).toUpperCase() + s.slice(i + 1);
}
const titleCase = (s: string): string => s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());

function urlParam(name: string): string | null {
  try { return new URLSearchParams(location.search).get(name); } catch { return null; }
}

export class Game {
  private save: SaveData = loadSave();
  private audio = new AudioEngine();
  private input = new InputState();
  private renderer!: GameRenderer;
  private r3d: Renderer3D | null = null;
  private world: World | null = null;
  private mission = 0;
  private startSnap: Snapshot | null = null;
  private cpSnap: Snapshot | null = null;
  private mode: Mode = 'menu';
  private acc = 0;
  private last = 0;
  private hudT = 0;
  private settingsReturn = 'title';
  private objSig = '';
  private pzSig = '';
  private compT = 0;
  private resultT = 0;
  private lastResult: MissionResult | null = null;
  private failed = false;
  private briefingIndex = 0;
  private noticeT = 0;
  private qualityOverride: Quality | null = null;

  constructor() {
    const q = urlParam('quality');
    if (q === 'low' || q === 'medium' || q === 'high') this.qualityOverride = q;
    this.renderer = this.createRenderer();
    this.input.attach();
    this.input.onGesture = () => this.audio.ensure();
    this.input.onPause = () => this.togglePause();
    this.input.onMute = () => this.toggleMute();
    this.input.onMenuNav = (d) => this.menuNav(d);
    window.addEventListener('resize', () => this.renderer.resize());
    window.addEventListener('orientationchange', () => setTimeout(() => this.renderer.resize(), 120));
    document.addEventListener('visibilitychange', () => { if (document.hidden && this.mode === 'playing') this.pause(); });
    window.addEventListener('blur', () => { if (this.mode === 'playing') this.pause(); });
    try { if (matchMedia('(pointer: coarse)').matches) document.body.classList.add('touch-on'); } catch { /* ignore */ }
    const cells = $('meterEnergy');
    for (let i = 0; i < 10; i++) cells.appendChild(document.createElement('i'));
    this.bindUi();
    this.applySettings();
    this.refreshTitle();
    this.show('title');
    if (urlParam('debug') === '1') (window as unknown as { __bp: Game }).__bp = this;
    const m = Number(urlParam('mission'));
    if (Number.isInteger(m) && m >= 1 && m <= MISSIONS.length) {
      this.beginMission(m - 1);
      const sp = urlParam('spawn')?.split(',').map(Number);
      if (urlParam('debug') === '1' && sp && sp.length === 2 && sp.every(Number.isFinite) && this.world) { this.world.player.x = sp[0]; this.world.player.y = sp[1]; }
    }
  }

  start(): void {
    this.last = performance.now();
    requestAnimationFrame((t) => this.frame(t));
  }

  // ---- renderer selection -----------------------------------------------------------------
  private qualityPref(): QualityPref { return this.qualityOverride ?? this.save.settings.quality; }

  private createRenderer(): GameRenderer {
    try {
      const r = new Renderer3D(this.qualityPref(), {
        onStatus: (msg) => this.notice(msg, 0),
        onFatal: () => this.fallback2D('The 3D view could not be restored after the graphics driver reset, so the game switched to the 2D tactical view.'),
      });
      this.r3d = r;
      document.body.classList.add('r3d');
      return r;
    } catch (err) {
      console.warn('BLACKOUT PROTOCOL: WebGL unavailable, using the 2D view', err);
      setTimeout(() => this.notice('WebGL is not available in this browser, so the game is showing the 2D tactical view. The rules are the same.', 9), 0);
      document.body.classList.remove('r3d');
      return new Renderer($<HTMLCanvasElement>('view'));
    }
  }

  private fallback2D(msg: string): void {
    try { this.renderer.dispose(); } catch { /* context already gone */ }
    this.r3d = null;
    document.body.classList.remove('r3d');
    this.renderer = new Renderer($<HTMLCanvasElement>('view'));
    this.renderer.resize();
    this.notice(msg, 10);
    this.applySettings();
  }

  private notice(msg: string | null, secs: number): void {
    const el = $('gfxNotice');
    if (!msg) { el.classList.add('hidden'); this.noticeT = 0; return; }
    el.textContent = msg;
    el.classList.remove('hidden');
    this.noticeT = secs;
  }

  // ---- UI wiring ------------------------------------------------------------------------
  private bindUi(): void {
    const click = (id: string, fn: () => void): void => {
      $(id).addEventListener('click', () => { this.audio.ensure(); this.audio.uiClick(); fn(); });
    };
    click('btnContinue', () => this.continueMission());
    click('btnMissions', () => this.showMissions());
    click('btnSettings', () => this.openSettings('title'));
    click('btnHelp', () => this.show('help'));
    click('helpBack', () => this.show('title'));
    click('missionsBack', () => this.show('title'));
    click('brBack', () => this.showMissions());
    click('brStart', () => this.beginMission(this.briefingIndex));
    click('settingsBack', () => this.show(this.settingsReturn));
    click('pResume', () => this.resume());
    click('pCheckpoint', () => this.restartCheckpoint());
    click('pRestart', () => this.beginMission(this.mission));
    click('pSettings', () => this.openSettings('pause'));
    click('pQuit', () => this.quitToMissions());
    click('resRetry', () => this.beginMission(this.mission));
    click('resMenu', () => this.quitToMissions());
    click('epMenu', () => this.quitToMissions());
    click('errRestart', () => { this.failed = false; this.quitToMissions(); this.show('title'); });
    click('btnPause', () => this.pause());

    const s = (): SaveData['settings'] => this.save.settings;
    $<HTMLInputElement>('setVolume').addEventListener('input', (e) => { s().volume = Number((e.target as HTMLInputElement).value) / 100; this.applySettings(); this.persist(); });
    $<HTMLInputElement>('setMute').addEventListener('change', (e) => { s().mute = (e.target as HTMLInputElement).checked; this.applySettings(); this.persist(); });
    $<HTMLInputElement>('setCb').addEventListener('change', (e) => { s().colorblind = (e.target as HTMLInputElement).checked; this.applySettings(); this.persist(); });
    $<HTMLInputElement>('setCones').addEventListener('change', (e) => { s().cones = (e.target as HTMLInputElement).checked; this.persist(); });
    $<HTMLInputElement>('setReduce').addEventListener('change', (e) => { s().reduceMotion = (e.target as HTMLInputElement).checked; this.applySettings(); this.persist(); });
    $<HTMLSelectElement>('setDiff').addEventListener('change', (e) => {
      s().difficulty = (e.target as HTMLSelectElement).value as Difficulty;
      if (this.world) this.world.difficulty = s().difficulty;
      this.persist();
    });
    $<HTMLSelectElement>('setQuality').addEventListener('change', (e) => {
      const v = (e.target as HTMLSelectElement).value;
      s().quality = v === 'low' || v === 'medium' || v === 'high' ? v : 'auto';
      this.qualityOverride = null;
      this.persist();
      this.applySettings();
    });
  }

  private persist(): void { writeSave(this.save); }

  private applySettings(): void {
    const s = this.save.settings;
    this.audio.setVolume(s.volume, s.mute);
    document.documentElement.dataset.cb = s.colorblind ? '1' : '0';
    document.body.classList.toggle('reduce', s.reduceMotion);
    $<HTMLInputElement>('setVolume').value = String(Math.round(s.volume * 100));
    $('outVolume').textContent = String(Math.round(s.volume * 100));
    $<HTMLInputElement>('setMute').checked = s.mute;
    $<HTMLInputElement>('setCb').checked = s.colorblind;
    $<HTMLInputElement>('setCones').checked = s.cones;
    $<HTMLInputElement>('setReduce').checked = s.reduceMotion;
    $<HTMLSelectElement>('setDiff').value = s.difficulty;
    $<HTMLSelectElement>('setQuality').value = s.quality;
    const note = $('qualityNote');
    if (this.r3d) {
      const pref = this.qualityPref();
      this.r3d.setQuality(pref === 'auto' ? this.r3d.detected : pref);
      const tier = this.r3d.detected.charAt(0).toUpperCase() + this.r3d.detected.slice(1);
      $<HTMLSelectElement>('setQuality').options[0].textContent = `Auto (${tier} detected)`;
      note.textContent = 'Resolution, shadows, bloom and haze';
    } else {
      note.textContent = 'The 2D tactical view is in use, so this has no effect';
    }
  }

  private toggleMute(): void {
    this.save.settings.mute = !this.save.settings.mute;
    this.applySettings();
    this.persist();
    if (this.mode === 'playing' || this.mode === 'paused') this.toast(this.save.settings.mute ? 'Sound muted' : 'Sound on', '');
  }

  private show(name: string): void {
    for (const n of SCREENS) $(`screen-${n}`).classList.toggle('hidden', n !== name);
    this.input.enabled = false;
    $('hud').classList.toggle('hidden', !(name === 'pause' || name === 'compromised'));
    $('puzzle').classList.add('hidden');
    const scr = $(`screen-${name}`);
    const first = scr.querySelector<HTMLElement>('button:not(.hidden):not(:disabled), input, select');
    if (first && name !== 'compromised') setTimeout(() => first.focus({ preventScroll: true }), 0);
  }

  private hideScreens(): void {
    for (const n of SCREENS) $(`screen-${n}`).classList.add('hidden');
    $('hud').classList.remove('hidden');
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }

  private menuNav(delta: number): void {
    const vis = SCREENS.map((n) => $(`screen-${n}`)).find((el) => !el.classList.contains('hidden'));
    if (!vis) return;
    const items = Array.from(vis.querySelectorAll<HTMLElement>('button:not(.hidden):not(:disabled), input, select'));
    if (!items.length) return;
    const i = items.indexOf(document.activeElement as HTMLElement);
    items[(i + delta + items.length) % items.length].focus();
  }

  private openSettings(from: string): void {
    this.settingsReturn = from;
    this.show('settings');
  }

  private refreshTitle(): void {
    const cp = this.save.checkpoint;
    const ok = !!cp && MISSIONS.some((m) => m.id === cp.mission);
    $('btnContinue').classList.toggle('hidden', !ok);
    if (ok) {
      const m = MISSIONS.find((q) => q.id === cp!.mission)!;
      $('btnContinue').textContent = `Continue ${titleCase(m.name)} from the checkpoint`;
    }
  }

  private showMissions(): void {
    const list = $('missionList');
    list.textContent = '';
    MISSIONS.forEach((m, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mission';
      const locked = i > this.save.unlocked;
      b.disabled = locked;
      const best = this.save.best[m.id];
      const file = document.createElement('span'); file.className = 'file'; file.textContent = `File ${pad2(i + 1)}`;
      const mid = document.createElement('span');
      const nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = titleCase(m.name);
      const sub = document.createElement('span'); sub.className = 'sub'; sub.textContent = locked ? `Locked. Finish file ${pad2(i)} first.` : m.subtitle;
      mid.append(nm, sub);
      const bst = document.createElement('span'); bst.className = 'bst';
      if (best) {
        const r = document.createElement('span'); r.className = 'r'; r.textContent = best.rating; r.setAttribute('aria-label', `rating ${best.rating}`);
        const sc = document.createElement('span'); sc.className = 'num'; sc.textContent = `${best.score} pts, ${fmtTime(best.time)}`;
        bst.append(r, sc);
      } else bst.textContent = locked ? '' : 'Not cleared yet';
      b.append(file, mid, bst);
      b.setAttribute('aria-label', `${titleCase(m.name)}, ${locked ? 'locked' : m.subtitle}${best ? `, best rating ${best.rating}` : ''}. Open the briefing.`);
      b.addEventListener('click', () => { this.audio.ensure(); this.audio.uiClick(); this.showBriefing(i); });
      list.appendChild(b);
    });
    this.show('missions');
  }

  private showBriefing(i: number): void {
    const m = MISSIONS[i];
    this.briefingIndex = i;
    $('brIndex').textContent = `File ${pad2(i + 1)} of ${pad2(MISSIONS.length)}, ${m.subtitle}`;
    $('brName').textContent = m.name;
    $('brSub').textContent = `Par time ${fmtTime(m.par)}`;
    const bt = $('brText'); bt.textContent = '';
    for (const p of m.briefing) { const el = document.createElement('p'); el.textContent = p; bt.appendChild(el); }
    const ol = $('brObj'); ol.textContent = '';
    for (const o of m.objectives) { const li = document.createElement('li'); li.textContent = o.label; ol.appendChild(li); }
    const hl = $('brHints'); hl.textContent = '';
    for (const h of m.hints) { const li = document.createElement('li'); li.textContent = h; hl.appendChild(li); }
    this.show('briefing');
  }

  // ---- mission flow ------------------------------------------------------------------------
  private beginMission(index: number): void {
    this.mission = index;
    const def = MISSIONS[index];
    const w = createWorld(def, this.save.settings.difficulty, Math.floor(Math.random() * 2147483647));
    this.world = w;
    this.startSnap = takeSnapshot(w);
    this.cpSnap = null;
    this.enterPlay();
  }

  private continueMission(): void {
    const cp = this.save.checkpoint;
    if (!cp) return;
    const index = MISSIONS.findIndex((m) => m.id === cp.mission);
    if (index < 0 || index > this.save.unlocked) { this.save.checkpoint = null; this.persist(); this.refreshTitle(); return; }
    try {
      const w = createWorld(MISSIONS[index], this.save.settings.difficulty, 1);
      this.startSnap = takeSnapshot(w);
      restoreSnapshot(w, cp.snapshot as Snapshot, false);
      if (!w.guards.length && MISSIONS[index].guards.length) throw new Error('bad snapshot');
      this.mission = index;
      this.world = w;
      this.cpSnap = takeSnapshot(w);
      this.enterPlay();
    } catch {
      this.save.checkpoint = null;
      this.persist();
      this.refreshTitle();
    }
  }

  private enterPlay(): void {
    const def = MISSIONS[this.mission];
    this.mode = 'playing';
    this.hideScreens();
    this.input.enabled = true;
    this.input.releaseAll();
    this.renderer.resize();
    this.renderer.resetCamera();
    this.acc = 0;
    $('hudIndex').textContent = `File ${pad2(this.mission + 1)}`;
    $('hudName').textContent = titleCase(def.name);
    $('hudPar').textContent = fmtTime(def.par);
    this.objSig = '';
    $('toasts').textContent = '';
    this.audio.ensure();
    this.audio.startMusic();
    $('countdown').classList.add('hidden');
    this.toast('Infiltrate. Stay in the dark.', '');
  }

  private pause(): void {
    if (this.mode !== 'playing') return;
    this.mode = 'paused';
    this.show('pause');
  }

  private resume(): void {
    if (this.mode !== 'paused') return;
    this.mode = 'playing';
    this.hideScreens();
    this.input.enabled = true;
    this.input.releaseAll();
    this.last = performance.now();
  }

  private togglePause(): void {
    if (this.mode === 'playing') this.pause();
    else if (this.mode === 'paused') this.resume();
  }

  private restartCheckpoint(): void {
    if (!this.world) return;
    restoreSnapshot(this.world, this.cpSnap ?? this.startSnap!);
    this.mode = 'playing';
    this.hideScreens();
    this.input.enabled = true;
    this.input.releaseAll();
    this.renderer.resetCamera();
    this.objSig = '';
    this.toast('Restarted from the checkpoint', '');
  }

  private quitToMissions(): void {
    this.mode = 'menu';
    this.audio.stopMusic();
    this.world = null;
    this.refreshTitle();
    this.showMissions();
  }

  private nextMission(): void {
    if (this.mission + 1 < MISSIONS.length) this.showBriefing(this.mission + 1);
    else this.showMissions();
  }

  private finishMission(w: World): void {
    const res = computeResult(w);
    this.lastResult = res;
    const def = MISSIONS[this.mission];
    const prev = this.save.best[def.id];
    if (!prev || res.score > prev.score) this.save.best[def.id] = { score: res.score, rating: res.rating, time: Math.round(res.time) };
    this.save.unlocked = Math.max(this.save.unlocked, Math.min(MISSIONS.length - 1, this.mission + 1));
    this.save.checkpoint = null;
    this.persist();
    this.mode = 'result';
    this.resultT = 1.1;
    this.audio.stopMusic();
  }

  private showResult(): void {
    const r = this.lastResult;
    if (!r) return;
    const def = MISSIONS[this.mission];
    $('resFile').textContent = `File ${pad2(this.mission + 1)}`;
    $('resName').textContent = def.name;
    $('resSub').textContent = def.subtitle;
    $('resRating').textContent = r.rating;
    $('resRating').setAttribute('aria-label', `Rating ${r.rating}`);
    $('resTime').textContent = `${fmtTime(r.time)}  (par ${fmtTime(r.par)})`;
    $('resAlert').textContent = `${r.peakAlert}`;
    $('resSpotted').textContent = String(r.spotted);
    $('resAlarms').textContent = String(r.alarms);
    $('resHacks').textContent = String(r.hacks);
    $('resRetries').textContent = String(r.retries);
    $('resScore').textContent = String(r.score);
    const b = this.save.best[def.id];
    $('resBest').textContent = b ? `${b.rating} ${b.score}` : '-';
    $('resTags').textContent = r.tags.map((t) => sentence(t)).join(', ');
    const last = this.mission + 1 >= MISSIONS.length;
    $('resNext').textContent = last ? 'Read the closing note' : 'Next mission';
    $('resNext').onclick = () => { this.audio.uiClick(); if (last) this.show('epilogue'); else this.nextMission(); };
    this.show('result');
  }

  // ---- toast / hud -------------------------------------------------------------------------
  private toast(msg: string, cls: string): void {
    const el = document.createElement('div');
    el.className = `toast ${cls}`;
    el.textContent = msg;
    const box = $('toasts');
    box.appendChild(el);
    while (box.children.length > 3) box.removeChild(box.firstChild!);
    setTimeout(() => el.remove(), 2800);
    $('liveRegion').textContent = msg;
  }

  private toastClass(msg: string): string {
    if (/NOT ENOUGH|DENIED|LOCKED —|LOCKED OUT|INTRUSION|TRIPPED|SPOTTED|OBSTRUCTED|OUT OF RANGE|NO DEVICE|ALREADY/.test(msg)) return 'bad';
    if (/COMPLETE|GRANTED|SAVED|ACQUIRED|SECURED|\+40|LOOPED|CUT|DEPLOYED|UNLOCKED/.test(msg)) return 'good';
    return '';
  }

  private updateHud(w: World): void {
    const p = w.player;
    $('hudTime').textContent = fmtTime(w.time);
    // energy cell: ten segments, the focused hack's cost is marked on the cells it would spend
    const e = Math.max(0, Math.min(100, p.energy));
    const list = hackables(w);
    const f = p.focus && list.find((h) => h.kind === p.focus!.kind && h.i === p.focus!.i);
    const cost = f ? f.cost : K.COST_DECOY;
    const short = e + 1e-6 < cost;
    const cells = $('meterEnergy').children;
    for (let i = 0; i < 10; i++) {
      const c = cells[i] as HTMLElement;
      const lo = i * 10, hi = lo + 10;
      const fill = Math.max(0, Math.min(1, (e - lo) / 10));
      c.className = fill >= 0.999 ? 'on' : fill > 0 ? 'part' : '';
      if (fill > 0 && fill < 0.999) c.style.setProperty('--p', `${Math.round(fill * 100)}%`);
      if (f && hi > e - cost && lo < e) c.classList.add('cost');
    }
    $('kit').classList.toggle('short', !!f && short);
    $('valEnergy').textContent = String(Math.round(e));
    $('meterEnergy').setAttribute('aria-valuenow', String(Math.round(e)));
    // facility status
    const a = Math.round(w.alert);
    const band = w.alert >= 100 ? 3 : w.alert >= 60 ? 2 : w.alert >= 30 ? 1 : 0;
    $('barAlert').style.width = `${Math.min(100, w.alert)}%`;
    $('valAlert').textContent = ['Calm', 'Caution', 'Danger', 'Lockdown'][band];
    $('numAlert').textContent = String(a);
    $('meterAlert').dataset.band = String(band);
    $('meterAlert').setAttribute('aria-valuenow', String(a));
    $('meterAlert').setAttribute('aria-valuetext', `${['Calm', 'Caution', 'Danger', 'Lockdown'][band]}, ${a}`);
    // light meter
    const lit = isLit(w, p.x, p.y);
    const vis = p.hidden ? 0 : lit ? (p.sneak ? 75 : 100) : p.sneak ? 30 : 40;
    const mode = p.hidden ? 'hidden' : lit ? 'lit' : 'shadow';
    for (const s of Array.from($('meterVis').children) as HTMLElement[]) s.classList.toggle('on', s.dataset.l === mode);
    const txt = p.hidden ? 'In a locker' : `${lit ? 'Lit' : 'Shadow'}, ${p.sneak ? 'sneaking' : 'walking'}`;
    $('valVis').textContent = txt;
    $('meterVis').setAttribute('aria-valuenow', String(vis));
    $('meterVis').setAttribute('aria-valuetext', txt);

    const sig = w.def.objectives.map((o) => (w.objectives[o.id] ? '1' : '0')).join('');
    if (sig !== this.objSig) {
      const prevSig = this.objSig;
      this.objSig = sig;
      const ul = $('objList'); ul.textContent = '';
      for (const o of w.def.objectives) {
        const li = document.createElement('li');
        li.textContent = o.label;
        if (w.objectives[o.id]) { li.className = 'done'; li.setAttribute('aria-label', `${o.label}, done`); }
        ul.appendChild(li);
      }
      if (prevSig) $('liveRegion').textContent = 'Objective updated';
    }

    const tgt = $('hackTarget'), act = $('hackAction');
    tgt.textContent = '';
    if (f) {
      tgt.append(sentence(f.label));
      const d = document.createElement('span'); d.className = 'num'; d.textContent = `${f.dist.toFixed(1)} tiles${list.length > 1 ? `, ${list.length - 1} more` : ''}`;
      tgt.append(d);
      act.textContent = short ? `Need ${f.cost}` : `${sentence(f.action)} ${f.cost}`;
      act.className = `kit-action${short ? ' short' : ''}`;
    } else {
      tgt.textContent = 'No device in range';
      act.textContent = `Decoy ${K.COST_DECOY}`;
      act.className = 'kit-action dim';
    }

    const cd = $('countdown');
    if (w.finale.active) {
      cd.classList.remove('hidden');
      cd.textContent = '';
      const sm = document.createElement('small'); sm.textContent = 'Lift closes in';
      const n = document.createElement('span'); n.className = 'num'; n.textContent = Math.max(0, w.finale.t).toFixed(1);
      cd.append(sm, n);
    } else cd.classList.add('hidden');
  }

  private updatePuzzle(w: World): void {
    const box = $('puzzle');
    const pz = w.puzzle;
    this.input.puzzleActive = !!pz;
    if (!pz) { box.classList.add('hidden'); this.pzSig = ''; return; }
    box.classList.remove('hidden');
    const t = w.terminals[pz.terminal];
    $('pzTitle').textContent = `Terminal ${t.id}, ${sentence(t.def.label).toLowerCase()}`;
    const bar = $('pzBar');
    if (pz.phase === 'show') bar.style.width = `${Math.max(0, (pz.showT / pz.showTotal) * 100)}%`;
    else bar.style.width = `${Math.max(0, (pz.timeLeft / pz.limit) * 100)}%`;
    const sig = `${pz.phase}|${pz.input.length}|${pz.seq.length}|${pz.terminal}`;
    if (sig === this.pzSig) return;
    this.pzSig = sig;
    const status = pz.phase === 'show' ? 'Memorise the sequence' : pz.phase === 'input' ? `Repeat it: ${pz.input.length} of ${pz.seq.length}` : pz.phase === 'ok' ? 'Access granted' : 'Intrusion detected';
    const st = $('pzStatus');
    st.textContent = status;
    st.className = `pz-status${pz.phase === 'ok' ? ' ok' : pz.phase === 'fail' ? ' bad' : ''}`;
    const seq = $('pzSeq'); seq.textContent = '';
    pz.seq.forEach((d, i) => {
      const c = document.createElement('div');
      c.className = 'cell';
      c.setAttribute('aria-label', pz.phase === 'show' ? DIR_NAMES[d] : 'hidden');
      if (pz.phase === 'show') { c.classList.add('shown'); c.textContent = GLYPH[d]; }
      else if (pz.phase === 'ok') { c.classList.add('ok'); c.textContent = GLYPH[d]; }
      else if (pz.phase === 'fail') { c.classList.add('bad'); c.textContent = i < pz.input.length ? GLYPH[d] : '×'; }
      else if (i < pz.input.length) { c.classList.add('ok'); c.textContent = GLYPH[d]; }
      else { if (i === pz.input.length) c.classList.add('next'); c.textContent = '·'; }
      seq.appendChild(c);
    });
  }

  // ---- main loop ------------------------------------------------------------------------------
  private frame(ts: number): void {
    requestAnimationFrame((t) => this.frame(t));
    if (this.failed) return;
    try {
      const dt = Math.min(0.05, Math.max(0, (ts - this.last) / 1000));
      this.last = ts;
      this.tick(dt);
    } catch (err) {
      this.failed = true;
      console.error('BLACKOUT PROTOCOL: simulation error', err);
      this.mode = 'menu';
      this.audio.stopMusic();
      this.show('error');
    }
  }

  private tick(dt: number): void {
    const w = this.world;
    const s = this.save.settings;
    if (this.noticeT > 0) { this.noticeT -= dt; if (this.noticeT <= 0) this.notice(null, 0); }
    if (w && (this.mode === 'playing' || this.mode === 'compromised' || this.mode === 'paused' || this.mode === 'result')) {
      if (this.mode === 'playing') {
        this.acc += dt;
        let steps = 0;
        let inp = this.input.poll();
        while (this.acc >= STEP && steps < 5 && w.status === 'playing') {
          step(w, inp, STEP);
          this.consume(w);
          inp = { ...inp, interact: false, hack: false, cycle: false, decoy: false, dir: -1, cancel: false };
          this.acc -= STEP;
          steps++;
        }
        if (steps >= 5) this.acc = 0;
        if (w.status === 'compromised') this.onCompromised(w);
        else if (w.status === 'complete') this.finishMission(w);
        this.hudT -= dt;
        if (this.hudT <= 0) { this.hudT = 0.08; this.updateHud(w); }
        this.updatePuzzle(w);
        let near = 0;
        for (const l of w.lasers) {
          if (!l.active) continue;
          for (const c of l.cells) near = Math.max(near, 1 - Math.hypot(c.x + 0.5 - w.player.x, c.y + 0.5 - w.player.y) / 7);
        }
        this.audio.ambience(w.alert, Math.max(0, near), w.time, s.reduceMotion);
      } else if (this.mode === 'compromised') {
        this.compT -= dt;
        if (this.compT <= 0) this.recover(w);
      } else if (this.mode === 'result') {
        this.resultT -= dt;
        if (this.resultT <= 0) { this.mode = 'menu'; this.showResult(); }
      }
      const live = this.mode === 'playing' || this.mode === 'compromised' || this.mode === 'result';
      this.renderer.draw(w, { cb: s.colorblind, cones: s.cones, reduce: s.reduceMotion, zoom: this.input.zoomHeld() }, live ? dt : 0);
    } else {
      // menu backdrop: the live facility drifting behind the screens
      this.renderer.draw(this.menuWorld(), { cb: s.colorblind, cones: true, reduce: s.reduceMotion, menu: true }, this.renderer.kind === '3d' ? dt : 0);
    }
  }

  private bgWorld: World | null = null;
  private menuWorld(): World {
    if (this.world) return this.world;
    if (!this.bgWorld) this.bgWorld = createWorld(MISSIONS[0], 'normal', 7);
    return this.bgWorld;
  }

  private consume(w: World): void {
    for (const e of w.events) {
      this.audio.play(e);
      if (e.k === 'toast' && e.msg) this.toast(sentence(e.msg), this.toastClass(e.msg));
      else if (e.k === 'alert' || e.k === 'spot' || e.k === 'laser') {
        const f = $('flash');
        f.classList.add('on');
        requestAnimationFrame(() => requestAnimationFrame(() => f.classList.remove('on')));
      } else if (e.k === 'checkpoint') {
        this.cpSnap = takeSnapshot(w);
        this.save.checkpoint = { mission: MISSIONS[this.mission].id, difficulty: this.save.settings.difficulty, snapshot: this.cpSnap };
        this.persist();
      } else if (e.k === 'objective') {
        const o = w.def.objectives.find((q) => q.id === e.msg);
        if (o) this.toast(`Objective done: ${o.label}`, 'good');
      }
    }
    w.events.length = 0;
  }

  private onCompromised(w: World): void {
    this.mode = 'compromised';
    this.compT = 1.6;
    this.input.enabled = false;
    $('puzzle').classList.add('hidden');
    this.input.puzzleActive = false;
    this.renderer.kick();
    this.audio.play({ k: 'compromised' });
    $('cmpTitle').textContent = 'Compromised';
    $('cmpText').textContent = w.reason === 'caught' ? 'A guard caught you. Rebooting from the last checkpoint.' : w.reason === 'lockdown' ? 'Facility alert reached 100 and the building locked down. Rebooting from the last checkpoint.' : 'The lockdown completed before you reached the lift. Rebooting from the last checkpoint.';
    this.show('compromised');
  }

  private recover(w: World): void {
    restoreSnapshot(w, this.cpSnap ?? this.startSnap!);
    this.mode = 'playing';
    this.hideScreens();
    this.input.enabled = true;
    this.input.releaseAll();
    this.renderer.resetCamera();
    this.objSig = '';
    this.toast('Retry: penalty applied', 'bad');
  }
}
