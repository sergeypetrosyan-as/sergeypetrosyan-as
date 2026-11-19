import { HULLS, PAINTS, UPGRADE_COSTS, UPGRADE_MAX, WEAPONS, type Loadout, type UpgradeStat } from '../sim/content.ts';
import type { ArenaId, DifficultyId, HullId, ModeId, WeaponId } from '../sim/types.ts';

export interface CareerStats {
  matches: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
  damage: number;
  bestStreak: number;
  playTime: number;
}

export interface MatchPrefs {
  mode: ModeId;
  arena: ArenaId;
  difficulty: DifficultyId;
  scoreLimit: number;
  timeLimit: number;
}

export interface Profile {
  version: 1;
  callsign: string;
  level: number;
  xp: number;
  credits: number;
  owned: { hulls: HullId[]; weapons: WeaponId[]; paints: string[] };
  loadout: Loadout;
  stats: CareerStats;
  tutorialDone: boolean;
  match: MatchPrefs;
}

export const MAX_LEVEL = 30;

export function defaultProfile(): Profile {
  return {
    version: 1,
    callsign: 'PILOT',
    level: 1,
    xp: 0,
    credits: 300,
    owned: { hulls: ['hornet', 'vanguard'], weapons: ['plasma'], paints: ['graphite'] },
    loadout: { hull: 'vanguard', weapon: 'plasma', paint: 'graphite', upgrades: { damage: 0, armor: 0, speed: 0, reload: 0 } },
    stats: { matches: 0, wins: 0, kills: 0, deaths: 0, assists: 0, damage: 0, bestStreak: 0, playTime: 0 },
    tutorialDone: false,
    match: { mode: 'tdm', arena: 'docks', difficulty: 'veteran', scoreLimit: 25, timeLimit: 480 },
  };
}

/** XP needed to advance from `level` to `level + 1`. */
export function xpToNext(level: number): number {
  return 400 + level * 200;
}

export interface MatchSummary {
  result: 'win' | 'loss' | 'draw';
  kills: number;
  deaths: number;
  assists: number;
  damage: number;
  score: number;
  bestStreak: number;
  duration: number;
}

export interface Rewards {
  xp: number;
  credits: number;
  levelsGained: number;
  newLevel: number;
  /** Items whose level requirement was just met. */
  unlocked: string[];
}

export function computeRewards(s: MatchSummary): { xp: number; credits: number } {
  const bonus = s.result === 'win' ? 300 : s.result === 'draw' ? 150 : 90;
  const xp = Math.round(s.score + s.damage / 10 + bonus);
  const credits = Math.round(s.kills * 20 + s.assists * 8 + s.damage / 25 + (s.result === 'win' ? 150 : 60));
  return { xp, credits };
}

/** Folds a finished match into the profile (mutates and returns the rewards). */
export function applyMatch(p: Profile, s: MatchSummary): Rewards {
  const { xp, credits } = computeRewards(s);
  const before = p.level;
  p.credits += credits;
  p.xp += xp;
  while (p.level < MAX_LEVEL && p.xp >= xpToNext(p.level)) {
    p.xp -= xpToNext(p.level);
    p.level++;
  }
  if (p.level >= MAX_LEVEL) p.xp = Math.min(p.xp, xpToNext(p.level));
  const st = p.stats;
  st.matches++;
  if (s.result === 'win') st.wins++;
  st.kills += s.kills;
  st.deaths += s.deaths;
  st.assists += s.assists;
  st.damage += Math.round(s.damage);
  st.bestStreak = Math.max(st.bestStreak, s.bestStreak);
  st.playTime += s.duration;
  const unlocked: string[] = [];
  for (const h of Object.values(HULLS)) if (h.unlockLevel > before && h.unlockLevel <= p.level) unlocked.push(h.name);
  for (const w of Object.values(WEAPONS)) if (w.unlockLevel > before && w.unlockLevel <= p.level) unlocked.push(w.name);
  for (const pt of PAINTS) if (pt.unlockLevel > before && pt.unlockLevel <= p.level) unlocked.push(pt.name);
  return { xp, credits, levelsGained: p.level - before, newLevel: p.level, unlocked };
}

export type ShopItem = { kind: 'hull'; id: HullId } | { kind: 'weapon'; id: WeaponId } | { kind: 'paint'; id: string };

export function itemInfo(item: ShopItem): { name: string; level: number; cost: number } {
  if (item.kind === 'hull') return { name: HULLS[item.id].name, level: HULLS[item.id].unlockLevel, cost: HULLS[item.id].cost };
  if (item.kind === 'weapon') return { name: WEAPONS[item.id].name, level: WEAPONS[item.id].unlockLevel, cost: WEAPONS[item.id].cost };
  const pt = PAINTS.find((x) => x.id === item.id)!;
  return { name: pt.name, level: pt.unlockLevel, cost: pt.cost };
}

export function owns(p: Profile, item: ShopItem): boolean {
  if (item.kind === 'hull') return p.owned.hulls.includes(item.id);
  if (item.kind === 'weapon') return p.owned.weapons.includes(item.id);
  return p.owned.paints.includes(item.id);
}

export type BuyCheck = 'ok' | 'owned' | 'level' | 'credits';

export function canBuy(p: Profile, item: ShopItem): BuyCheck {
  if (owns(p, item)) return 'owned';
  const info = itemInfo(item);
  if (p.level < info.level) return 'level';
  if (p.credits < info.cost) return 'credits';
  return 'ok';
}

export function buy(p: Profile, item: ShopItem): BuyCheck {
  const c = canBuy(p, item);
  if (c !== 'ok') return c;
  p.credits -= itemInfo(item).cost;
  if (item.kind === 'hull') p.owned.hulls.push(item.id);
  else if (item.kind === 'weapon') p.owned.weapons.push(item.id);
  else p.owned.paints.push(item.id);
  return 'ok';
}

export function upgradeCost(level: number): number {
  return level >= UPGRADE_MAX ? Infinity : UPGRADE_COSTS[level];
}

export function buyUpgrade(p: Profile, stat: UpgradeStat): boolean {
  const lv = p.loadout.upgrades[stat];
  const cost = upgradeCost(lv);
  if (p.credits < cost) return false;
  p.credits -= cost;
  p.loadout.upgrades[stat] = lv + 1;
  return true;
}
