import '@fontsource/chakra-petch/latin-600.css';
import '@fontsource/chakra-petch/latin-700.css';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './styles.css';
import { Sound } from './audio/sound.ts';
import { buildMeta, buy as buyVault } from './meta/unlocks.ts';
import { Fx } from './render/fx.ts';
import type { StickView } from './render/hud.ts';
import { LEVEL_NAME, PRESETS, detectLevel, resolve, stepDown, type Level } from './render/quality.ts';
import { Renderer } from './render/renderer.ts';
import { Renderer3D } from './render/three/renderer3d.ts';
import type { GameRenderer } from './render/types.ts';
import { botInput } from './sim/bot.ts';
import type { ArenaId, Input, World } from './sim/types.ts';
import { DT, chooseCard, createWorld, emptyInput, rerollChoice, step, summarize, type RunSummary } from './sim/world.ts';
import { loadSave, writeSave, type Save } from './storage/save.ts';
import { Ui, fmtTime } from './ui/ui.ts';

type App = 'menu' | 'playing' | 'paused' | 'levelup' | 'ending' | 'summary';

const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const save: Save = loadSave(reducedMotion);
const view = document.getElementById('view') as HTMLCanvasElement;
const canvas = document.getElementById('hud') as HTMLCanvasElement; // top-most canvas: HUD and input
const fatal = document.getElementById('fatal') as HTMLElement;
const notice = document.getElementById('notice') as HTMLElement;
const noticeText = document.getElementById('noticeText') as HTMLElement;
document.getElementById('noticeClose')?.addEventListener('click', () => notice.classList.add('hidden'));

function showNotice(text: string): void {
  noticeText.textContent = text;
  notice.classList.remove('hidden');
}

/** Probe WebGL2 once to pick an automatic quality level, then release the probe context. */
function probeLevel(): Level {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2');
    if (!gl) return 'low';
    const lvl = detectLevel(gl);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return lvl;
  } catch {
    return 'low';
  }
}

let detected: Level = probeLevel();
let autoStepped = false;
const preset = () => PRESETS[resolve(save.settings.quality, detected)];
const fx = new Fx();
fx.budget = preset().particles;

let renderer: GameRenderer;
try {
  const r3 = new Renderer3D(view, canvas, preset());
  r3.onContext = (lost) => {
    if (lost) {
      pause();
      showNotice('The graphics card reset and the 3D view was lost. The run is paused; it will come back on its own in a moment.');
    } else {
      notice.classList.add('hidden');
      ui.announce('3D view restored.');
    }
  };
  renderer = r3;
} catch (err3d) {
  console.warn('WebGL renderer unavailable, using Canvas 2D.', err3d);
  view.classList.add('hidden');
  try {
    renderer = new Renderer(canvas);
    showNotice('3D graphics could not start because WebGL is unavailable or blocked in this browser, so you are playing the flat 2D view. Turning on hardware acceleration usually fixes this.');
  } catch (err) {
    fatal.textContent = 'This browser cannot draw the game: neither WebGL nor Canvas 2D is available.';
    fatal.classList.remove('hidden');
    throw err;
  }
}
document.body.dataset.renderer = renderer.kind;
const sound = new Sound();
sound.volume = save.settings.volume;
sound.muted = save.settings.muted;

let app: App = 'menu';
let world: World | null = null;
let acc = 0;
let endTimer = 0;
let last = performance.now();
let runStart = 0;
let demo = false;
let crashed = false;
let lastSummary: RunSummary | null = null;
let fps = 0;
let fpsFrames = 0;
let fpsTime = 0;
let playClock = 0;
let slowFrames = 0;
let sampleFrames = 0;
const inp: Input = emptyInput();
const keys = new Set<string>();
let mouseX = -1;
let mouseY = -1;
let mouseSeen = false;
let lastMoveX = 1;
let lastMoveY = 0;
const stick: StickView & { id: number; x: number; y: number } = { active: false, bx: 0, by: 0, kx: 0, ky: 0, id: -1, x: 0, y: 0 };

const persist = () => writeSave(save);

function applySettings(): void {
  sound.setVolume(save.settings.volume);
  sound.setMuted(save.settings.muted);
}

let appliedLevel: Level | null = null;
function applyQuality(): void {
  const p = preset();
  fx.budget = p.particles;
  if (appliedLevel !== p.level) {
    appliedLevel = p.level;
    renderer.setQuality(p);
  }
  ui.setQualityNote(save.settings.quality === 'auto' ? `Auto is using ${LEVEL_NAME[p.level]} on this device.` : '');
}

// ---------------------------------------------------------------- run lifecycle

function newSeed(): number {
  const m = /seed=(\d+)/.exec(location.hash);
  if (m) return Number(m[1]) >>> 0;
  return ((Date.now() ^ Math.floor(performance.now() * 1000)) >>> 0) || 1;
}

function startRun(): void {
  sound.init();
  sound.startMusic();
  sound.setDuck(false);
  world = createWorld(newSeed(), buildMeta(save.owned, save.arena));
  fx.reset();
  renderer.resetRun(world);
  acc = 0;
  endTimer = 0;
  playClock = 0;
  runStart = performance.now();
  inp.release = false;
  inp.toggleHold = false;
  app = 'playing';
  ui.close();
  ui.announce('Run started. Survive.');
  setTouchVisible(true);
}

function toMenu(): void {
  world = null;
  demo = false;
  app = 'menu';
  sound.stopMusic();
  setTouchVisible(false);
  ui.open('menu');
}

function pause(): void {
  if (app !== 'playing') return;
  app = 'paused';
  sound.setDuck(true);
  ui.open('pause');
}

function resume(): void {
  if (app !== 'paused') return;
  app = 'playing';
  sound.setDuck(false);
  ui.close();
  last = performance.now();
}

function finishRun(): void {
  if (!world) return;
  const sum = summarize(world);
  lastSummary = sum;
  const bests: string[] = [];
  const b = save.best;
  if (sum.time > b.time) {
    b.time = sum.time;
    bests.push('time');
  }
  if (sum.kills > b.kills) {
    b.kills = sum.kills;
    bests.push('kills');
  }
  if (sum.wave > b.wave) {
    b.wave = sum.wave;
    bests.push('wave');
  }
  if (sum.score > b.score) {
    b.score = sum.score;
    bests.push('score');
  }
  b.level = Math.max(b.level, sum.level);
  save.shards += sum.shardsTotal;
  save.stats.runs++;
  save.stats.kills += sum.kills;
  save.stats.bosses += sum.bosses;
  save.stats.playtime += Math.round((performance.now() - runStart) / 1000);
  if (sum.won) save.stats.wins++;
  else save.stats.deaths++;
  persist();
  app = 'summary';
  sound.setDuck(true);
  setTouchVisible(false);
  ui.renderSummary(sum, bests, world.arena === 'foundry' ? 'Ring Foundry' : 'The Hollow');
  ui.open('summary');
  ui.announce(`${sum.won ? 'Victory' : 'Run over'}. Rating ${sum.rating}. ${sum.kills} kills in ${fmtTime(sum.time)}.`);
}

function setTouchVisible(v: boolean): void {
  const t = document.getElementById('touch');
  if (!t) return;
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  t.classList.toggle('hidden', !(v && coarse));
}

// ---------------------------------------------------------------- UI wiring

const ui = new Ui(
  {
    start: startRun,
    resume,
    restart: () => {
      startRun();
    },
    quit: toMenu,
    pick: (i) => pickCard(i),
    reroll: () => {
      if (world && rerollChoice(world)) ui.renderChoice(world);
    },
    buy: (id) => {
      const r = buyVault(save.owned, save.shards, id);
      if (r) {
        save.owned = r.owned;
        save.shards = r.shards;
        persist();
        ui.renderVault();
        ui.announce('Purchased.');
      }
    },
    arena: (id: ArenaId) => {
      save.arena = id;
      persist();
    },
    settingsChanged: () => {
      applySettings();
      applyQuality();
      persist();
    },
    click: () => sound.click(),
  },
  () => save,
);

function pickCard(i: number): void {
  if (!world || app !== 'levelup') return;
  if (!chooseCard(world, i)) return;
  if (world.state === 'levelup') {
    ui.renderChoice(world); // chained level-ups
    return;
  }
  app = 'playing';
  sound.setDuck(false);
  ui.close();
  last = performance.now();
}

// ---------------------------------------------------------------- input

function typingTarget(t: EventTarget | null): boolean {
  return t instanceof HTMLInputElement && t.type === 'text';
}

window.addEventListener('keydown', (e) => {
  if (typingTarget(e.target)) return;
  const k = e.key.toLowerCase();
  sound.init();
  if (k === 'm') {
    save.settings.muted = !save.settings.muted;
    applySettings();
    persist();
    if (ui.current === 'settings') ui.syncSettings();
    return;
  }
  if (app === 'levelup') {
    if (k === '1' || k === '2' || k === '3') pickCard(Number(k) - 1);
    else if (k === '4' && world && rerollChoice(world)) ui.renderChoice(world);
    return;
  }
  if (k === 'escape' || k === 'p') {
    if (app === 'playing') pause();
    else if (app === 'paused') resume();
    else if (ui.current === 'settings') ui.open(ui.settingsReturn);
    else if (ui.current === 'vault' || ui.current === 'howto') ui.open('menu');
    e.preventDefault();
    return;
  }
  if (k === 'r' && (app === 'paused' || app === 'summary')) {
    startRun();
    return;
  }
  if (app === 'menu' && (k === 'enter') && ui.current === 'menu' && document.activeElement === document.body) {
    startRun();
    return;
  }
  if (app === 'playing') {
    if (k === 'e' || k === ' ') {
      inp.release = true;
      e.preventDefault();
    } else if (k === 'q') inp.toggleHold = true;
  }
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k) && app === 'playing') e.preventDefault();
  keys.add(k);
});
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
window.addEventListener('blur', () => {
  keys.clear();
  pause();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pause();
});
window.addEventListener('resize', () => renderer.resize());
window.addEventListener('orientationchange', () => renderer.resize());

canvas.addEventListener('pointermove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (e.pointerType === 'mouse') mouseSeen = true;
  if (stick.active && e.pointerId === stick.id) {
    const d = renderer.dpr;
    const dx = e.clientX * d - stick.bx;
    const dy = e.clientY * d - stick.by;
    const m = Math.hypot(dx, dy);
    const max = 56 * d;
    const k = m > max ? max / m : 1;
    stick.kx = stick.bx + dx * k;
    stick.ky = stick.by + dy * k;
    stick.x = (dx * k) / max;
    stick.y = (dy * k) / max;
  }
});
canvas.addEventListener('pointerdown', (e) => {
  sound.init();
  if (e.pointerType === 'touch' && app === 'playing' && !stick.active && e.clientX < window.innerWidth * 0.62) {
    stick.active = true;
    stick.id = e.pointerId;
    stick.bx = stick.kx = e.clientX * renderer.dpr;
    stick.by = stick.ky = e.clientY * renderer.dpr;
    stick.x = stick.y = 0;
    canvas.setPointerCapture(e.pointerId);
    setTouchVisible(true);
    const t = document.getElementById('touch');
    if (t) t.classList.remove('hidden');
  }
});
const endStick = (e: PointerEvent) => {
  if (stick.active && e.pointerId === stick.id) {
    stick.active = false;
    stick.x = stick.y = 0;
  }
};
canvas.addEventListener('pointerup', endStick);
canvas.addEventListener('pointercancel', endStick);

const press = (id: string, fn: () => void) =>
  document.getElementById(id)?.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    sound.init();
    fn();
  });
press('tRelease', () => {
  inp.release = true;
});
press('tHold', () => {
  inp.toggleHold = true;
});
press('tPause', pause);

function sampleInput(w: World): void {
  const k = keys;
  let mx = (k.has('d') || k.has('arrowright') ? 1 : 0) - (k.has('a') || k.has('arrowleft') ? 1 : 0);
  let my = (k.has('s') || k.has('arrowdown') ? 1 : 0) - (k.has('w') || k.has('arrowup') ? 1 : 0);
  if (stick.active) {
    mx += stick.x;
    my += stick.y;
  }
  inp.mx = mx;
  inp.my = my;
  const m = Math.hypot(mx, my);
  if (m > 0.2) {
    lastMoveX = mx / m;
    lastMoveY = my / m;
  }
  inp.hasAim = false;
  if (save.settings.aim === 'mouse' && mouseSeen && mouseX >= 0) {
    const hit = renderer.screenToWorld(mouseX, mouseY);
    if (hit) {
      inp.aimX = hit.x;
      inp.aimY = hit.y;
      inp.hasAim = true;
    }
  } else if (save.settings.aim === 'move') {
    inp.aimX = w.player.x + lastMoveX * 240;
    inp.aimY = w.player.y + lastMoveY * 240;
    inp.hasAim = true;
  }
}

// ---------------------------------------------------------------- main loop

function frame(now: number): void {
  if (crashed) return;
  requestAnimationFrame(frame);
  try {
    const rawDt = Math.min(0.25, Math.max(0, (now - last) / 1000));
    let dt = Math.min(0.05, rawDt);
    last = now;
    if (fx.slow > 0) dt *= 0.4;
    const w = world;
    if (w && (app === 'playing' || app === 'ending')) {
      acc += dt;
      let n = 0;
      while (acc >= DT && n < 5) {
        acc -= DT;
        n++;
        if (demo) {
          botInput(w, inp);
          w.player.hp = w.player.maxHp;
          if (w.state === 'levelup') chooseCard(w, 0);
        } else if (app === 'playing') sampleInput(w);
        else {
          inp.mx = inp.my = 0;
        }
        step(w, inp);
        inp.release = false;
        inp.toggleHold = false;
        if (w.events.length) {
          fx.handle(w, save.settings);
          sound.handle(w);
          for (const ev of w.events) {
            if (ev.t === 'bossWarn') ui.announce('Warning: the Core Warden approaches.');
            else if (ev.t === 'wave' && (ev.a ?? 1) > 1) ui.announce(`Wave ${ev.a}`);
          }
          w.events.length = 0;
        }
        if (w.state !== 'playing') break;
      }
      if (w.state === 'levelup' && app === 'playing') {
        app = 'levelup';
        sound.setDuck(true);
        ui.renderChoice(w);
        ui.open('levelup');
      } else if ((w.state === 'dead' || w.state === 'won') && app === 'playing') {
        app = 'ending';
        endTimer = w.state === 'dead' ? 1.1 : 1.8;
      }
      if (app === 'ending') {
        if (w.state === 'dead') step(w, inp); // advances deathTimer
        endTimer -= dt;
        if (endTimer <= 0) finishRun();
      }
    }
    fx.update(dt);
    renderer.draw(world, fx, save.settings, now / 1000, stick.active ? stick : null);
    trackFrameRate(rawDt);
  } catch (err) {
    crashed = true;
    fatal.textContent = 'Something went wrong and the game stopped. Reload the page to continue.';
    fatal.classList.remove('hidden');
    console.error(err);
  }
}

function trackFrameRate(frameDelta: number): void {
  fpsFrames++;
  fpsTime += frameDelta;
  if (fpsTime >= 1) {
    fps = Math.round(fpsFrames / fpsTime);
    fpsFrames = 0;
    fpsTime = 0;
  }
  // Auto quality: after a short warm-up, step down once if the run is clearly under 45 fps.
  if (app === 'playing' && !demo && save.settings.quality === 'auto' && !autoStepped && renderer.kind === '3d') {
    playClock += frameDelta;
    if (playClock > 3 && playClock < 9) {
      sampleFrames++;
      if (frameDelta > 1 / 45) slowFrames++;
    } else if (playClock >= 9 && sampleFrames > 30) {
      autoStepped = true;
      if (slowFrames / sampleFrames > 0.5 && detected !== 'low') {
        detected = stepDown(detected);
        applyQuality();
        ui.announce(`Graphics lowered to ${LEVEL_NAME[detected]} to keep the game smooth.`);
      }
    }
  }
}

// ---------------------------------------------------------------- boot

function boot(): void {
  applySettings();
  applyQuality();
  renderer.resize();
  if (location.hash === '#demo' || location.hash === '#demo-late') {
    // Poster / smoke mode: fast-forward a bot-driven run so the first frame shows a busy arena.
    demo = true;
    world = createWorld(20260, buildMeta({ w_homing: 1, w_chain: 1 }, 'hollow'));
    const w = world;
    const until = location.hash === '#demo-late' ? 960 : 330;
    for (let i = 0; i < 60 * until; i++) {
      botInput(w, inp);
      w.player.hp = w.player.maxHp;
      if (w.state === 'levelup') chooseCard(w, i % 3);
      step(w, inp);
      w.events.length = 0;
      if (w.state === 'dead' || w.state === 'won') break;
    }
    renderer.resetRun(w);
    app = 'playing';
    ui.close();
  } else {
    ui.open('menu');
  }
  (window as unknown as { __vs: unknown }).__vs = { get world() { return world; }, get app() { return app; }, get summary() { return lastSummary; }, get fps() { return fps; }, get renderer() { return renderer.kind; }, get quality() { return preset().level; }, get gfx() { return renderer; } };
  requestAnimationFrame((t) => {
    last = t;
    frame(t);
  });
}

boot();
