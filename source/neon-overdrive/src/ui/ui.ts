import { fmtTime, type ResultRow } from '../game/race';
import { trackFacts } from '../render3d/path';
import { DIFFICULTIES, T } from '../state/tuning';
import type { Quality, Settings, Track } from '../state/types';
import type { Store } from '../storage/storage';
import { TRACKS } from '../track/tracks';

export type ScreenName = 'title' | 'setup' | 'guide' | 'settings' | 'records' | 'pause' | 'results' | 'tutorial' | 'fatal';

const $ = <E extends HTMLElement = HTMLElement>(id: string): E => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing #${id}`);
  return el as E;
};

const titleCase = (s: string): string => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
const ORD = ['', 'first', 'second', 'third', 'fourth'];

export interface TowerRow { code: string; gap: string; me: boolean }

export interface HudData {
  pos: number;
  lap: number;
  time: string;
  split: string;
  splitClass: '' | 'up' | 'down';
  speed: number;
  reserve: number;
  threshold: number;
  boosting: boolean;
  spine: 'open' | 'sealed' | 'in';
  spineDist: string;
  dots: { p: number; me: boolean }[];
  tower: TowerRow[];
}

export interface Callbacks {
  onStart(track: number, diff: number): void;
  onResume(): void;
  onRestart(): void;
  onQuit(): void;
  onNext(): void;
  onSettings(): void;
  onSound(kind: 'move' | 'ok' | 'back'): void;
  onTutorialDone(): void;
  track(i: number): Track;
}

const QUALITIES: { id: Quality; name: string }[] = [
  { id: 'auto', name: 'Auto' }, { id: 'low', name: 'Low' }, { id: 'medium', name: 'Medium' }, { id: 'high', name: 'High' },
];

/** SVG path of a track's elevation over one lap, in a w x h box. */
function profilePath(track: Track, w: number, h: number, pad = 6): { line: string; area: string; zones: [number, number][] } {
  const segs = track.segs;
  const N = segs.length;
  let lo = Infinity;
  let hi = -Infinity;
  for (const s of segs) {
    lo = Math.min(lo, s.y1);
    hi = Math.max(hi, s.y1);
  }
  const span = Math.max(1, hi - lo);
  const pts: string[] = [];
  const step = Math.max(1, Math.floor(N / 160));
  for (let i = 0; i <= N; i += step) {
    const s = segs[Math.min(N - 1, i)];
    const x = (i / N) * w;
    const y = h - pad - ((s.y1 - lo) / span) * (h - pad * 2);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const line = `M${pts.join(' L')}`;
  return { line, area: `${line} L${w},${h} L0,${h} Z`, zones: track.spineStarts.map((s, i) => [(s / N) * w, ((track.spineEnds[i] - s) / N) * w]) };
}

export class Ui {
  current: ScreenName | null = null;
  returnTo: ScreenName = 'title';
  selTrack = 0;
  selDiff = 1;
  private msgTimer = 0;
  private noticeTimer = 0;
  private last: Partial<Record<string, string>> = {};
  private dotEls: HTMLElement[] = [];
  private towerEls: { li: HTMLElement; n: HTMLElement; code: HTMLElement; gap: HTMLElement }[] = [];
  private builtTrack = '';
  private gfx: { kind: '3d' | '2d'; level: string | null } = { kind: '3d', level: null };

  constructor(private store: Store, private cb: Callbacks) {
    this.buildSetup();
    this.buildQuality();
    this.buildTower();
    this.bind();
    this.syncSettings();
  }

  private set(id: string, text: string): void {
    if (this.last[id] === text) return;
    this.last[id] = text;
    $(id).textContent = text;
  }

  // ---------- screens ----------
  show(name: ScreenName | null): void {
    for (const el of document.querySelectorAll<HTMLElement>('.screen')) el.hidden = true;
    this.current = name;
    if (!name) return;
    const el = $('s-' + name);
    el.hidden = false;
    if (name === 'setup') this.refreshSetup();
    if (name === 'records') this.buildRecords();
    if (name === 'settings') this.syncSettings();
    const target = name === 'setup' ? $('startBtn') : el.querySelector<HTMLElement>('.primary, .btn, input, button');
    window.setTimeout(() => target?.focus({ preventScroll: true }), 0);
  }

  private buildSetup(): void {
    const list = $('trackList');
    list.innerHTML = '';
    TRACKS.forEach((t, i) => {
      const track = this.cb.track(i);
      const f = trackFacts(track);
      const pr = profilePath(track, 200, 26, 3);
      const b = document.createElement('button');
      b.className = 'track-row';
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.innerHTML = `<span class="num">${i + 1}</span><span class="name">${titleCase(t.name)}</span><span class="meta">${f.lengthKm.toFixed(1)} km, ${t.tagline.toLowerCase()}</span><svg viewBox="0 0 200 26" preserveAspectRatio="none" aria-hidden="true"><path d="${pr.line}"/></svg>`;
      b.addEventListener('click', () => {
        this.selTrack = i;
        this.cb.onSound('move');
        this.refreshSetup();
      });
      list.appendChild(b);
    });
    const row = $('diffRow');
    row.innerHTML = '';
    DIFFICULTIES.forEach((d, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.textContent = titleCase(d.name);
      b.addEventListener('click', () => {
        this.selDiff = i;
        this.cb.onSound('move');
        this.refreshSetup();
      });
      row.appendChild(b);
    });
  }

  refreshSetup(): void {
    $('trackList').querySelectorAll<HTMLElement>('.track-row').forEach((c, i) => c.setAttribute('aria-checked', String(i === this.selTrack)));
    $('diffRow').querySelectorAll<HTMLElement>('button').forEach((c, i) => c.setAttribute('aria-checked', String(i === this.selDiff)));
    const def = TRACKS[this.selTrack];
    const track = this.cb.track(this.selTrack);
    const f = trackFacts(track);
    $('tdName').textContent = titleCase(def.name);
    $('tdBlurb').textContent = def.blurb;
    const pr = profilePath(track, 600, 120);
    $('tdProfile').innerHTML = `<defs><linearGradient id="profFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f0f2" stop-opacity="0.22"/><stop offset="1" stop-color="#e8f0f2" stop-opacity="0"/></linearGradient></defs>${pr.zones
      .map(([x, w]) => `<rect class="zone" x="${x.toFixed(1)}" y="0" width="${w.toFixed(1)}" height="120"/><line class="zone-edge" x1="${x.toFixed(1)}" y1="0" x2="${x.toFixed(1)}" y2="120"/>`)
      .join('')}<path class="area" d="${pr.area}"/><path class="line" d="${pr.line}"/>`;
    const bend = f.sharpest >= 5 ? 'Hairpin' : f.sharpest >= 4 ? 'Tight' : f.sharpest >= 3 ? 'Medium' : 'Open';
    $('tdFacts').innerHTML = [
      ['Lap length', `${f.lengthKm.toFixed(2)}<small>km</small>`],
      ['Climb per lap', `${Math.round(f.climbM)}<small>m</small>`],
      ['Spine gates', `${track.spineStarts.length}`],
      ['Sharpest bend', bend],
    ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    const d = DIFFICULTIES[this.selDiff];
    $('diffBlurb').textContent = `${d.blurb} Spine gates open at ${d.threshold} % reserve.`;
    const r = this.store.record(this.selTrack, this.selDiff);
    $('bestLine').textContent = r.bestTotal === null
      ? 'No personal best on this track and difficulty yet.'
      : `Your best: ${fmtTime(r.bestTotal)} race, ${fmtTime(r.bestLap)} lap, best finish ${ORD[r.bestPos ?? 0] ?? '-'}.`;
    $('startBtn').textContent = `Start race on ${titleCase(def.name)}`;
  }

  private buildRecords(): void {
    const rows = TRACKS.flatMap((t, ti) =>
      DIFFICULTIES.map((d, di) => {
        const r = this.store.record(ti, di);
        return `<tr><td>${titleCase(t.name)}</td><td>${titleCase(d.name)}</td><td class="num">${fmtTime(r.bestTotal)}</td><td class="num">${fmtTime(r.bestLap)}</td><td class="num">${r.bestPos ?? '-'}</td><td class="num">${r.races}</td></tr>`;
      }),
    ).join('');
    $('recTable').innerHTML = `<thead><tr><th scope="col">Track</th><th scope="col">Difficulty</th><th scope="col" class="num">Best race</th><th scope="col" class="num">Best lap</th><th scope="col" class="num">Best place</th><th scope="col" class="num">Races</th></tr></thead><tbody>${rows}</tbody>`;
    $('recConfirm').hidden = true;
  }

  private buildQuality(): void {
    const row = $('qRow');
    row.innerHTML = '';
    QUALITIES.forEach((q) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.textContent = q.name;
      b.dataset.q = q.id;
      b.addEventListener('click', () => {
        this.store.settings.quality = q.id;
        this.store.save();
        this.cb.onSound('move');
        this.cb.onSettings();
        this.syncSettings();
      });
      row.appendChild(b);
    });
  }

  setGraphics(kind: '3d' | '2d', level: string | null): void {
    this.gfx = { kind, level };
    this.syncSettings();
  }

  // ---------- binding ----------
  private bind(): void {
    document.querySelectorAll<HTMLElement>('[data-go]').forEach((b) => {
      b.addEventListener('click', () => {
        this.cb.onSound(b.dataset.go === 'title' ? 'back' : 'ok');
        this.returnTo = 'title';
        this.show(b.dataset.go as ScreenName);
      });
    });
    $('startBtn').addEventListener('click', () => {
      this.cb.onSound('ok');
      this.cb.onStart(this.selTrack, this.selDiff);
    });
    $('guideBack').addEventListener('click', () => {
      this.cb.onSound('back');
      this.show(this.returnTo);
    });
    $('setBack').addEventListener('click', () => {
      this.cb.onSound('back');
      this.show(this.returnTo);
    });
    $('pResume').addEventListener('click', () => this.cb.onResume());
    $('pRestart').addEventListener('click', () => this.cb.onRestart());
    $('pQuit').addEventListener('click', () => this.cb.onQuit());
    $('pGuide').addEventListener('click', () => {
      this.returnTo = 'pause';
      this.show('guide');
    });
    $('pSettings').addEventListener('click', () => {
      this.returnTo = 'pause';
      this.show('settings');
    });
    $('rAgain').addEventListener('click', () => this.cb.onRestart());
    $('rNext').addEventListener('click', () => this.cb.onNext());
    $('rMenu').addEventListener('click', () => this.cb.onQuit());
    $('tutOk').addEventListener('click', () => this.cb.onTutorialDone());
    $('noticeClose').addEventListener('click', () => {
      $('notice').hidden = true;
    });
    $('recReset').addEventListener('click', () => {
      $('recConfirm').hidden = false;
      $('recNo').focus();
    });
    $('recNo').addEventListener('click', () => {
      $('recConfirm').hidden = true;
      $('recReset').focus();
    });
    $('recYes').addEventListener('click', () => {
      this.store.resetRecords();
      this.buildRecords();
      $('recReset').focus();
    });
    const s = this.store.settings;
    const bindCheck = (id: string, key: keyof Settings): void => {
      $<HTMLInputElement>(id).addEventListener('change', (e) => {
        (s[key] as boolean) = (e.target as HTMLInputElement).checked;
        this.store.save();
        this.cb.onSettings();
      });
    };
    bindCheck('optMute', 'muted');
    bindCheck('optMusic', 'music');
    bindCheck('optShake', 'shake');
    bindCheck('optLines', 'speedLines');
    bindCheck('optFlash', 'reducedFlash');
    bindCheck('optHc', 'highContrast');
    $<HTMLInputElement>('optVol').addEventListener('input', (e) => {
      s.volume = Number((e.target as HTMLInputElement).value) / 100;
      $('volOut').textContent = `${Math.round(s.volume * 100)} %`;
      this.store.save();
      this.cb.onSettings();
    });
    // arrow-key menu navigation
    window.addEventListener('keydown', (e) => {
      if (!this.current || this.current === 'fatal') return;
      const t = e.target as HTMLElement;
      if (t instanceof HTMLInputElement && (t.type === 'range' || t.type === 'checkbox') && (e.code === 'ArrowLeft' || e.code === 'ArrowRight')) return;
      const dir = e.code === 'ArrowDown' || e.code === 'ArrowRight' ? 1 : e.code === 'ArrowUp' || e.code === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      const list = Array.from($('s-' + this.current).querySelectorAll<HTMLElement>('button, input')).filter((el) => el.offsetParent !== null);
      if (!list.length) return;
      e.preventDefault();
      const i = list.indexOf(document.activeElement as HTMLElement);
      const next = list[(i + dir + list.length) % list.length];
      next.focus();
      this.cb.onSound('move');
    });
  }

  syncSettings(): void {
    const s = this.store.settings;
    $<HTMLInputElement>('optVol').value = String(Math.round(s.volume * 100));
    $('volOut').textContent = `${Math.round(s.volume * 100)} %`;
    $<HTMLInputElement>('optMute').checked = s.muted;
    $<HTMLInputElement>('optMusic').checked = s.music;
    $<HTMLInputElement>('optShake').checked = s.shake;
    $<HTMLInputElement>('optLines').checked = s.speedLines;
    $<HTMLInputElement>('optFlash').checked = s.reducedFlash;
    $<HTMLInputElement>('optHc').checked = s.highContrast;
    document.body.classList.toggle('hc', s.highContrast);
    document.body.classList.toggle('rf', s.reducedFlash);
    $('qRow').querySelectorAll<HTMLButtonElement>('button').forEach((b) => {
      b.setAttribute('aria-checked', String(b.dataset.q === s.quality));
      b.disabled = this.gfx.kind === '2d';
    });
    const lvl = this.gfx.level ? titleCase(this.gfx.level) : '';
    $('gfxStatus').textContent = this.gfx.kind === '2d'
      ? 'Running the simplified 2D view because WebGL is not available. Quality options need the 3D view.'
      : s.quality === 'auto'
        ? `Auto chose ${lvl} for this device. It steps down if frames run slow.`
        : ({
          Low: 'Low: no bloom or shadows and a thinner city. For older or battery-saving laptops.',
          Medium: 'Medium: bloom, car shadows and most of the city. The target for most laptops.',
          High: 'High: sharper image, soft shadows, the full city and more street lights.',
        } as Record<string, string>)[lvl] ?? '';
  }

  // ---------- notices ----------
  notice(text: string, ok: boolean): void {
    const el = $('notice');
    $('noticeText').textContent = text;
    el.classList.toggle('ok', ok);
    el.hidden = false;
    window.clearTimeout(this.noticeTimer);
    if (ok) this.noticeTimer = window.setTimeout(() => (el.hidden = true), 3000);
  }

  // ---------- HUD ----------
  showHud(on: boolean): void {
    $('hud').classList.toggle('hidden', !on);
    document.body.classList.toggle('racing', on);
  }

  private buildTower(): void {
    const ol = $('hTower');
    ol.innerHTML = '';
    this.towerEls = [];
    for (let i = 0; i < 4; i++) {
      const li = document.createElement('li');
      const n = document.createElement('span');
      n.className = 'n';
      n.textContent = String(i + 1);
      const code = document.createElement('span');
      code.className = 'code';
      const gap = document.createElement('span');
      gap.className = 'gap';
      li.append(n, code, gap);
      ol.appendChild(li);
      this.towerEls.push({ li, n, code, gap });
    }
  }

  buildProgress(track: Track): void {
    if (this.builtTrack === track.def.id) return;
    this.builtTrack = track.def.id;
    const prog = $('hProg');
    prog.querySelectorAll('.zone, .dot, .cp').forEach((n) => n.remove());
    const N = track.segs.length;
    track.spineStarts.forEach((s, i) => {
      const z = document.createElement('i');
      z.className = 'zone';
      z.style.left = `${(s / N) * 100}%`;
      z.style.width = `${((track.spineEnds[i] - s) / N) * 100}%`;
      prog.appendChild(z);
    });
    for (let k = 1; k < T.CHECKPOINTS; k++) {
      const c = document.createElement('i');
      c.className = 'cp';
      c.style.left = `${(k / T.CHECKPOINTS) * 100}%`;
      prog.appendChild(c);
    }
    this.dotEls = [];
    for (let i = 0; i < 4; i++) {
      const d = document.createElement('i');
      d.className = 'dot';
      prog.appendChild(d);
      this.dotEls.push(d);
    }
  }

  hud(h: HudData): void {
    this.set('hPos', String(h.pos));
    this.set('hLap', String(h.lap));
    this.set('hTime', h.time);
    this.set('hSplit', h.split);
    if (this.last.splitClass !== h.splitClass) {
      this.last.splitClass = h.splitClass;
      $('hSplit').className = `split ${h.splitClass}`;
    }
    this.set('hSpeed', String(h.speed));
    this.set('hRes', String(Math.round(h.reserve)));
    const bar = $('hResBar');
    const w = `${h.reserve.toFixed(1)}%`;
    if (this.last.resW !== w) {
      this.last.resW = w;
      bar.style.width = w;
    }
    const ready = h.reserve >= h.threshold ? '1' : '0';
    if (this.last.ready !== ready) {
      this.last.ready = ready;
      bar.classList.toggle('ready', ready === '1');
    }
    const thr = `${h.threshold}%`;
    if (this.last.thr !== thr) {
      this.last.thr = thr;
      $('hThr').style.left = thr;
    }
    const bt = h.boosting ? '1' : '0';
    if (this.last.bt !== bt) {
      this.last.bt = bt;
      $('hBoost').classList.toggle('on', h.boosting);
    }
    const label = h.spine === 'in' ? 'In the Spine' : h.spine === 'open' ? 'Spine open' : `Spine sealed below ${h.threshold} %`;
    this.set('hSpineText', label);
    this.set('hSpineDist', h.spineDist ? `next gate ${h.spineDist}` : '');
    if (this.last.spine !== h.spine) {
      this.last.spine = h.spine;
      $('hSpine').className = `spine ${h.spine}`;
    }
    h.dots.forEach((d, i) => {
      const el = this.dotEls[i];
      if (!el) return;
      el.style.left = `${(d.p * 100).toFixed(1)}%`;
      if (this.last['dot' + i] !== String(d.me)) {
        this.last['dot' + i] = String(d.me);
        el.classList.toggle('me', d.me);
      }
    });
    h.tower.forEach((r, i) => {
      const el = this.towerEls[i];
      if (!el) return;
      const key = `${r.code}|${r.gap}|${r.me}`;
      if (this.last['tw' + i] === key) return;
      this.last['tw' + i] = key;
      el.code.textContent = r.code;
      el.gap.textContent = r.gap;
      el.li.classList.toggle('me', r.me);
    });
  }

  message(text: string, bad = false, ms = 1400, hint = false): void {
    const el = $('hMsg');
    el.textContent = text;
    el.classList.toggle('bad', bad);
    el.classList.toggle('hint', hint);
    el.classList.add('show');
    window.clearTimeout(this.msgTimer);
    this.msgTimer = window.setTimeout(() => el.classList.remove('show'), ms);
  }

  clearMessage(): void {
    $('hMsg').classList.remove('show');
  }

  countdown(text: string): void {
    const el = $('cd');
    el.textContent = text;
    el.classList.remove('pop');
    if (text) {
      void el.offsetWidth;
      el.classList.add('pop');
    }
  }

  announce(text: string): void {
    $('live').textContent = text;
  }

  // ---------- classification ----------
  showResults(info: {
    trackIdx: number; rows: ResultRow[]; place: number; laps: number[]; total: number;
    newBest: { total: boolean; lap: boolean; pos: boolean }; hasNext: boolean;
  }): void {
    const def = TRACKS[info.trackIdx];
    $('resTrack').textContent = `${titleCase(def.name)} on ${titleCase(DIFFICULTIES[this.selDiff].name)}, total ${fmtTime(info.total)}`;
    $('resPlace').textContent = `P${info.place}`;
    $('resH').textContent = `You finished ${ORD[info.place] ?? info.place}`;
    const win = info.rows[0]?.time ?? 0;
    $('resTable').innerHTML = `<thead><tr><th scope="col">Pos</th><th scope="col">Driver</th><th scope="col" class="num">Time</th><th scope="col" class="num">Gap</th></tr></thead><tbody>${info.rows
      .map((r) => `<tr class="${r.player ? 'me' : ''}"><td>${r.place}</td><td>${r.player ? 'Juno Vael (you)' : titleCase(r.name)}</td><td class="num">${fmtTime(r.time)}</td><td class="num">${r.place === 1 ? 'Winner' : Number.isFinite(r.time) ? `+${(r.time - win).toFixed(2)}` : '-'}</td></tr>`)
      .join('')}</tbody>`;
    const best = Math.min(...info.laps);
    const worst = Math.max(...info.laps);
    const lo = best * 0.92;
    $('resLaps').innerHTML = info.laps
      .map((l, i) => `<li class="${l === best ? 'fastest' : ''}"><span>Lap ${i + 1}</span><span class="bar"><i style="width:${(((l - lo) / Math.max(0.001, worst - lo)) * 100).toFixed(1)}%"></i></span><span class="t">${fmtTime(l)}</span></li>`)
      .join('');
    const tags = [info.newBest.total ? 'race time' : '', info.newBest.lap ? 'lap time' : '', info.newBest.pos ? 'finishing place' : ''].filter(Boolean);
    $('resBest').textContent = tags.length ? `New personal best ${tags.join(', ')}. Your fastest lap is highlighted.` : 'No new personal best this time. Your fastest lap is highlighted.';
    $('rNext').hidden = !info.hasNext;
    if (info.hasNext) $('rNext').textContent = `Next track: ${titleCase(TRACKS[info.trackIdx + 1].name)}`;
    $('rAgain').textContent = `Race ${titleCase(def.name)} again`;
    this.show('results');
  }

  setTouch(on: boolean): void {
    $('touch').classList.toggle('hidden', !on);
  }
}
