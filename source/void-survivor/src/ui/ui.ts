// DOM screens: launch console (menu), Vault, settings, how-to, pause, the salvage rig (upgrade choice) and the salvage report.
import { UPGRADE_BY_ID, type Levels, type UpgradeDef } from '../upgrades/data.ts';
import { describeSynergyHint } from '../upgrades/rules.ts';
import { ENEMY_DEFS } from '../sim/enemies.ts';
import type { RunSummary } from '../sim/world.ts';
import type { ArenaId, World } from '../sim/types.ts';
import type { Quality, Save } from '../storage/save.ts';
import { VAULT, arenaUnlocked, canBuy, nextCost, tierOf } from '../meta/unlocks.ts';

export type ScreenId = 'menu' | 'vault' | 'settings' | 'howto' | 'pause' | 'levelup' | 'summary';
const SCREENS: ScreenId[] = ['menu', 'vault', 'settings', 'howto', 'pause', 'levelup', 'summary'];

export interface UiHandlers {
  start(): void;
  resume(): void;
  restart(): void;
  quit(): void;
  pick(i: number): void;
  reroll(): void;
  buy(id: string): void;
  arena(id: ArenaId): void;
  settingsChanged(): void;
  click(): void;
}

function $(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

export function fmtTime(sec: number): string {
  const s = Math.floor(sec);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

const CASING: Record<UpgradeDef['kind'], string> = {
  signature: 'Signature core',
  weapon: 'Weapon',
  passive: 'Passive',
  filler: 'One-time fix',
};

export class Ui {
  current: ScreenId | null = null;
  private h: UiHandlers;
  private getSave: () => Save;
  private opener: HTMLElement | null = null;
  settingsReturn: ScreenId = 'menu';

  constructor(h: UiHandlers, getSave: () => Save) {
    this.h = h;
    this.getSave = getSave;
    const on = (id: string, fn: () => void) => {
      $(id).addEventListener('click', () => {
        this.h.click();
        fn();
      });
    };
    on('btnStart', () => h.start());
    on('btnVault', () => this.open('vault'));
    on('btnSettings', () => {
      this.settingsReturn = 'menu';
      this.open('settings');
    });
    on('btnHow', () => this.open('howto'));
    on('vaultBack', () => this.open('menu'));
    on('howBack', () => this.open('menu'));
    on('settingsBack', () => this.open(this.settingsReturn));
    on('pResume', () => h.resume());
    on('pRestart', () => h.restart());
    on('pSettings', () => {
      this.settingsReturn = 'pause';
      this.open('settings');
    });
    on('pQuit', () => h.quit());
    on('btnReroll', () => h.reroll());
    on('sumAgain', () => h.restart());
    on('sumVault', () => {
      this.settingsReturn = 'menu';
      this.open('vault');
    });
    on('sumMenu', () => h.quit());

    const s = () => this.getSave().settings;
    $('setVolume').addEventListener('input', (e) => {
      s().volume = Number((e.target as HTMLInputElement).value) / 100;
      h.settingsChanged();
    });
    const bind = (id: string, key: 'muted' | 'shake' | 'reducedFlash' | 'outline' | 'numbers') => {
      $(id).addEventListener('change', (e) => {
        s()[key] = (e.target as HTMLInputElement).checked;
        h.settingsChanged();
      });
    };
    bind('setMuted', 'muted');
    bind('setShake', 'shake');
    bind('setFlash', 'reducedFlash');
    bind('setOutline', 'outline');
    bind('setNumbers', 'numbers');
    $('setAim').addEventListener('change', (e) => {
      s().aim = (e.target as HTMLSelectElement).value as 'auto' | 'mouse' | 'move';
      h.settingsChanged();
    });
    $('setQuality').addEventListener('change', (e) => {
      s().quality = (e.target as HTMLSelectElement).value as Quality;
      h.settingsChanged();
    });

    // Focus trap inside dialogs
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !this.current || this.current === 'menu') return;
      const root = $(this.current);
      const f = Array.from(root.querySelectorAll<HTMLElement>('button, input, select, [tabindex]')).filter((n) => !n.hasAttribute('disabled') && n.offsetParent !== null);
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !root.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !root.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  open(id: ScreenId): void {
    if (this.current === null) this.opener = document.activeElement as HTMLElement | null;
    for (const s of SCREENS) $(s).classList.toggle('hidden', s !== id);
    this.current = id;
    if (id === 'menu') this.renderMenu();
    if (id === 'vault') this.renderVault();
    if (id === 'settings') this.syncSettings();
    const root = $(id);
    const target = root.querySelector<HTMLElement>('.btn-primary, .mod, .btn, input, select');
    // focus after paint so keyboard users land on the first control
    window.setTimeout(() => target?.focus(), 0);
  }

  close(): void {
    for (const s of SCREENS) $(s).classList.add('hidden');
    this.current = null;
    if (this.opener && document.contains(this.opener)) this.opener.blur();
    (document.activeElement as HTMLElement | null)?.blur?.();
  }

  announce(text: string): void {
    $('live').textContent = text;
  }

  setQualityNote(text: string): void {
    $('qualityNote').textContent = text;
  }

  renderMenu(): void {
    const save = this.getSave();
    $('menuShards').textContent = String(save.shards);
    const b = save.best;
    const runs = save.stats.runs;
    $('menuBest').textContent =
      b.time > 0
        ? `Longest run ${fmtTime(b.time)}, with ${b.kills} kills on wave ${b.wave}. ${runs} ${runs === 1 ? 'run' : 'runs'} logged.`
        : 'No runs logged yet. Your best run will show here.';
    const box = $('arenaPick');
    box.querySelectorAll('label').forEach((n) => n.remove());
    const arenas: { id: ArenaId; name: string }[] = [
      { id: 'hollow', name: 'The Hollow' },
      { id: 'foundry', name: 'Ring Foundry' },
    ];
    for (const a of arenas) {
      const ok = arenaUnlocked(save.owned, a.id);
      const label = el('label', 'chip');
      const input = el('input');
      input.type = 'radio';
      input.name = 'arena';
      input.value = a.id;
      input.checked = save.arena === a.id && ok;
      input.disabled = !ok;
      input.addEventListener('change', () => this.h.arena(a.id));
      const span = el('span', undefined, a.name);
      if (!ok) span.append(el('small', undefined, 'Unlock in the Vault'));
      label.append(input, span);
      box.append(label);
    }
  }

  renderVault(): void {
    const save = this.getSave();
    $('vaultShards').textContent = String(save.shards);
    const list = $('vaultList');
    list.textContent = '';
    for (const item of VAULT) {
      const t = tierOf(save.owned, item.id);
      const cost = nextCost(save.owned, item);
      const li = el('li', 'locker-row' + (t > 0 ? ' owned' : ''));
      const text = el('div', 'locker-text');
      text.append(el('h3', undefined, item.name), el('p', undefined, item.desc));
      const ticks = el('span', 'ticks');
      ticks.setAttribute('role', 'img');
      ticks.setAttribute('aria-label', `${t} of ${item.cost.length} owned`);
      for (let i = 0; i < item.cost.length; i++) ticks.append(el('i', i < t ? 'on' : undefined));
      const btn = el('button', 'btn btn-buy');
      btn.type = 'button';
      if (cost === null) {
        btn.textContent = item.cost.length > 1 ? 'Maxed' : 'Owned';
        btn.disabled = true;
      } else {
        btn.textContent = `Buy for ${cost} Shards`;
        btn.disabled = !canBuy(save.owned, save.shards, item);
        if (btn.disabled) btn.title = `You need ${cost - save.shards} more Shards`;
        btn.addEventListener('click', () => {
          this.h.click();
          this.h.buy(item.id);
        });
      }
      li.append(text, ticks, btn);
      list.append(li);
    }
  }

  syncSettings(): void {
    const s = this.getSave().settings;
    ($('setVolume') as HTMLInputElement).value = String(Math.round(s.volume * 100));
    ($('setMuted') as HTMLInputElement).checked = s.muted;
    ($('setShake') as HTMLInputElement).checked = s.shake;
    ($('setFlash') as HTMLInputElement).checked = s.reducedFlash;
    ($('setOutline') as HTMLInputElement).checked = s.outline;
    ($('setNumbers') as HTMLInputElement).checked = s.numbers;
    ($('setAim') as HTMLSelectElement).value = s.aim;
    ($('setQuality') as HTMLSelectElement).value = s.quality;
  }

  renderChoice(w: World): void {
    const ch = w.choice;
    if (!ch) return;
    $('luTitle').textContent = ch.chest ? 'Chest salvage' : `Level ${w.player.level}`;
    $('luSub').textContent = ch.chest ? 'A sealed cache, heavy with rare parts. Slot one module.' : 'Wick has Essence to spare. Slot one module.';
    const box = $('cards');
    box.textContent = '';
    ch.ids.forEach((id, i) => box.append(this.module(UPGRADE_BY_ID[id], w.levels, i)));
    const rr = $('btnReroll') as HTMLButtonElement;
    rr.textContent = w.rerolls > 0 ? `Reroll the rig (4), ${w.rerolls} left` : 'No rerolls left';
    rr.disabled = w.rerolls <= 0;
    this.announce(`${ch.chest ? 'Chest salvage' : 'Level up'}. Choose one of three modules.`);
  }

  /** One cartridge in the rig. */
  private module(d: UpgradeDef, levels: Levels, i: number): HTMLButtonElement {
    const lv = levels[d.id];
    const filler = d.kind === 'filler';
    const b = el('button', `mod mod-${d.kind}`);
    b.type = 'button';
    b.style.setProperty('--accent', d.color);
    const next = Math.min(d.maxLevel, lv + 1);
    const desc = d.desc(next);
    const state = filler ? 'single use' : lv === 0 ? `new, level 1 of ${d.maxLevel}` : `level ${next} of ${d.maxLevel}`;
    b.setAttribute('aria-label', `Install ${d.name}, ${state}. ${desc} Key ${i + 1}.`);

    const slot = el('span', 'mod-slot', String(i + 1));
    slot.setAttribute('aria-hidden', 'true');
    const led = el('span', 'mod-led');
    led.setAttribute('aria-hidden', 'true');
    b.append(slot, led, el('span', 'mod-kind', CASING[d.kind]), el('span', 'mod-name', d.name));
    if (!filler) {
      const ticks = el('span', 'ticks');
      for (let k = 0; k < d.maxLevel; k++) ticks.append(el('i', k < lv ? 'on' : k === lv ? 'new' : undefined));
      b.append(ticks, el('span', 'mod-level', lv === 0 ? 'New module' : `Upgrade to level ${next}`));
    }
    b.append(el('span', 'mod-desc', desc));
    const hint = describeSynergyHint(d.id, levels);
    if (hint) b.append(el('span', 'mod-tape', 'Completes ' + hint.replace(/^Synergy:\s*/, '')));
    b.addEventListener('click', () => {
      this.h.click();
      this.h.pick(i);
    });
    return b;
  }

  renderSummary(sum: RunSummary, bests: string[], arena: string): void {
    $('sumTitle').textContent = sum.won ? 'Wick recovered' : 'Signal lost';
    $('sumLine').textContent = sum.won
      ? `The salvage drone came home from ${arena} after ${fmtTime(sum.time)} with ${sum.kills} kills.`
      : `Wick went dark in ${arena} at ${fmtTime(sum.time)}, on wave ${sum.wave}.`;
    const rating = $('sumRating');
    rating.textContent = sum.rating;
    rating.setAttribute('aria-label', `Rating ${sum.rating}`);
    rating.dataset.rating = sum.rating;
    const grid = $('sumGrid');
    grid.textContent = '';
    const best = new Set(bests);
    const rows: [string, string, string?][] = [
      ['Time', fmtTime(sum.time), 'time'],
      ['Wave', String(sum.wave), 'wave'],
      ['Kills', String(sum.kills), 'kills'],
      ['Damage dealt', sum.damage.toLocaleString('en')],
      ['Level', String(sum.level)],
      ['Wardens down', String(sum.bosses)],
      ['Best chain', `×${sum.maxChain}`],
      ['Detonations', String(sum.detonations)],
      ['Score', sum.score.toLocaleString('en'), 'score'],
    ];
    for (const [k, v, key] of rows) {
      const div = el('div');
      const dd = el('dd', undefined, v);
      if (key && best.has(key)) dd.append(el('span', 'best-tag', 'New best'));
      div.append(el('dt', undefined, k), dd);
      grid.append(div);
    }

    const kills = $('sumKills');
    kills.textContent = '';
    const kinds = Object.keys(sum.killsBy).sort((a, b) => sum.killsBy[b] - sum.killsBy[a]);
    if (kinds.length === 0) kills.append(el('li', 'empty', 'Nothing this time.'));
    const top = kinds.length ? sum.killsBy[kinds[0]] : 1;
    for (const k of kinds) {
      const d = ENEMY_DEFS[k as keyof typeof ENEMY_DEFS];
      const li = el('li');
      const bar = el('i');
      bar.style.setProperty('--w', String(Math.max(0.04, sum.killsBy[k] / top)));
      bar.style.setProperty('--c', d?.color ?? '#cfe9ea');
      bar.setAttribute('aria-hidden', 'true');
      li.append(el('span', undefined, d?.name ?? k), bar, el('span', 'num', String(sum.killsBy[k])));
      kills.append(li);
    }

    const picks = $('sumPicks');
    picks.textContent = '';
    if (sum.picks.length === 0) picks.append(el('li', 'empty', 'No modules taken.'));
    // collapse consecutive repeats so the order still reads
    let i = 0;
    while (i < sum.picks.length) {
      const id = sum.picks[i];
      let n = 1;
      while (sum.picks[i + n] === id) n++;
      const li = el('li', undefined, UPGRADE_BY_ID[id].name + (n > 1 ? ` ×${n}` : ''));
      li.style.setProperty('--c', UPGRADE_BY_ID[id].color);
      picks.append(li);
      i += n;
    }

    const sh = $('sumShards');
    sh.textContent = '';
    const srows: [string, number][] = [
      ['Crystals collected', sum.shardsCollected],
      ['Time survived', sum.shardsTime],
      ['Kills', sum.shardsKills],
      ['Wardens', sum.shardsBosses],
      ['Victory bonus', sum.shardsWin],
    ];
    for (const [k, v] of srows) {
      const row = el('li');
      row.append(el('span', undefined, k), el('span', 'num', `+${v}`));
      sh.append(row);
    }
    const tot = el('li', 'total');
    tot.append(el('span', undefined, 'Total'), el('span', 'num', String(sum.shardsTotal)));
    sh.append(tot);
  }
}
