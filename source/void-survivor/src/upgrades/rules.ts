// Pure upgrade rules: derived stats, the Essence formulas (Siphon / Bulwark / Detonation) and card rolling.
import { pickWeighted, type Rng } from '../rng.ts';
import { SYNERGIES, UPGRADES, UPGRADE_BY_ID, type Levels, type UpgradeDef, type UpgradeId } from './data.ts';

export const MAX_WEAPON_TYPES = 4;
export const WEAPON_IDS: UpgradeId[] = ['pulse', 'orbit', 'homing', 'pierce', 'chain'];

export interface DerivedStats {
  maxHp: number;
  speed: number;
  pickup: number;
  cdMul: number;
  dmgMul: number;
  luck: number;
  taken: number;
  regen: number;
}

export interface StatBonus {
  hp: number;
  speed: number;
  luck: number;
}

export function deriveStats(lv: Levels, bonus: StatBonus, overcharge: number): DerivedStats {
  return {
    maxHp: 100 + bonus.hp + 20 * lv.vitality,
    speed: 190 * (1 + bonus.speed + 0.07 * lv.swift),
    pickup: 70 * (1 + 0.3 * lv.magnet),
    cdMul: Math.pow(0.93, lv.overclock),
    dmgMul: 1 + 0.04 * overcharge,
    luck: bonus.luck + 0.1 * lv.fortune,
    taken: Math.pow(0.94, lv.plating),
    regen: 0.7 * lv.regen,
  };
}

export function hasSynergy(lv: Levels, id: string): boolean {
  const s = SYNERGIES.find((x) => x.id === id);
  return !!s && s.needs.every((n) => lv[n] > 0);
}

export function activeSynergies(lv: Levels): string[] {
  return SYNERGIES.filter((s) => s.needs.every((n) => lv[n] > 0)).map((s) => s.id);
}

// --- Essence economy -------------------------------------------------------------------------

export const SIPHON_CAP = [0, 60, 100, 150];
export const SIPHON_MUL = [0, 1, 1.5, 2];

export function reserveCap(lv: Levels): number {
  return SIPHON_CAP[Math.min(3, lv.siphon)] ?? 0;
}

/** Reserve gained for one kill. `chain` is the kill-chain counter (adds up to +30%). */
export function siphonGain(lv: Levels, ess: number, chain: number): number {
  if (lv.siphon <= 0) return 0;
  const bonus = 1 + Math.min(0.3, 0.01 * chain);
  return ess * SIPHON_MUL[Math.min(3, lv.siphon)] * bonus;
}

export function fieldRadius(reserve: number, bulwarkLvl: number): number {
  return Math.min(150, 44 + 0.5 * reserve * (1 + 0.2 * (bulwarkLvl - 1)));
}

export function fieldDrain(radius: number): number {
  return 1.2 + 0.012 * radius;
}

export function absorbCost(bulletDmg: number): number {
  return 3 + 0.3 * bulletDmg;
}

export function fieldTickDamage(reserve: number, bulwarkLvl: number, bladed: boolean): number {
  return (5 + 0.1 * reserve) * (1 + 0.25 * (bulwarkLvl - 1)) * (bladed ? 1.5 : 1);
}

export const DETONATION_MIN_SPENT = 8;

export function detonationDamage(spent: number, detLvl: number, dmgMul: number): number {
  return (10 + 1.5 * spent) * (1 + 0.3 * (detLvl - 1)) * dmgMul;
}

export function detonationRadius(spent: number): number {
  return Math.min(340, 80 + 2.4 * spent);
}

// --- Card rolling ------------------------------------------------------------------------------

export interface ChoiceContext {
  levels: Levels;
  hpFrac: number;
  luck: number;
  unlocked: ReadonlySet<string>;
  levelUps: number; // how many choices were already made this run
  sinceDefensive: number; // picks since the last defensive card
  chest: boolean;
  exclude: readonly UpgradeId[];
}

export function weaponTypesOwned(lv: Levels): number {
  let n = 0;
  for (const w of WEAPON_IDS) if (lv[w] > 0) n++;
  return n;
}

export function isAvailable(def: UpgradeDef, ctx: ChoiceContext): boolean {
  const lv = ctx.levels;
  if (lv[def.id] >= def.maxLevel) return false;
  if (def.kind === 'filler') return true;
  if (!ctx.unlocked.has(def.id)) return false;
  if (def.requires) {
    for (const k of Object.keys(def.requires) as UpgradeId[]) {
      if (lv[k] < (def.requires[k] ?? 0)) return false;
    }
  }
  if (def.kind === 'weapon' && lv[def.id] === 0 && weaponTypesOwned(lv) >= MAX_WEAPON_TYPES) return false;
  return true;
}

function completesSynergy(def: UpgradeDef, lv: Levels): boolean {
  if (lv[def.id] > 0) return false;
  return SYNERGIES.some((s) => s.needs.includes(def.id) && s.needs.every((n) => n === def.id || lv[n] > 0));
}

export function cardWeight(def: UpgradeDef, ctx: ChoiceContext): number {
  const lv = ctx.levels;
  let w = def.weight;
  if (lv[def.id] > 0 && def.kind !== 'filler') w *= 1.5;
  if (def.rare) w *= 1 + ctx.luck * (ctx.chest ? 3 : 1);
  if (def.id === 'bulwark' && lv.siphon > 0 && lv.bulwark === 0) w *= 2.5;
  if (def.id === 'detonation' && lv.bulwark > 0 && lv.detonation === 0) w *= 2.5;
  if (completesSynergy(def, lv)) w *= 2;
  if (def.id === 'repair') w = ctx.hpFrac < 0.6 ? 6 * (1 - ctx.hpFrac) : 0.4;
  if (def.kind === 'filler' && def.id !== 'repair') w = 0.4;
  if (ctx.chest && def.kind !== 'filler') w *= def.rare ? 2 : 1;
  return w;
}

/** Always returns exactly three distinct, valid cards. */
export function rollChoices(ctx: ChoiceContext, rng: Rng): UpgradeId[] {
  const all = UPGRADES.filter((u) => isAvailable(u, ctx));
  const fresh = all.filter((u) => !ctx.exclude.includes(u.id));
  // Prefer cards that were not in the previous set; fall back to the full list if too few remain.
  const pool = fresh.filter((u) => u.kind !== 'filler').length >= 3 ? fresh : all;
  const picked: UpgradeDef[] = [];
  const take = (def: UpgradeDef | null) => {
    if (def && !picked.includes(def)) picked.push(def);
  };

  // Pity 1: early game must offer an extra weapon.
  const extraWeapon = WEAPON_IDS.some((w) => w !== 'pulse' && ctx.levels[w] > 0);
  if (!extraWeapon && ctx.levelUps < 3) {
    const opts = pool.filter((u) => u.kind === 'weapon' && u.id !== 'pulse' && ctx.levels[u.id] === 0);
    take(pickWeighted(rng, opts, (u) => cardWeight(u, ctx)));
  }
  // Pity 2: defensive option when hurt or none seen for a while.
  if (ctx.hpFrac < 0.5 || ctx.sinceDefensive >= 4) {
    const opts = pool.filter((u) => u.defensive && !picked.includes(u));
    take(pickWeighted(rng, opts, (u) => (u.id === 'repair' ? 0.5 : cardWeight(u, ctx))));
  }
  let guard = 0;
  while (picked.length < 3 && guard++ < 40) {
    const opts = pool.filter((u) => !picked.includes(u));
    take(pickWeighted(rng, opts, (u) => cardWeight(u, ctx)));
    if (opts.length === 0) break;
  }
  // Dead-end protection: pad with fillers (always available, never exhausted).
  for (const id of ['overcharge', 'repair', 'cache'] as UpgradeId[]) {
    if (picked.length >= 3) break;
    take(UPGRADE_BY_ID[id]);
  }
  return picked.slice(0, 3).map((u) => u.id);
}

export function describeSynergyHint(id: UpgradeId, lv: Levels): string | null {
  const def = UPGRADE_BY_ID[id];
  if (!def || lv[id] > 0) return null;
  const s = SYNERGIES.find((x) => x.needs.includes(id) && x.needs.every((n) => n === id || lv[n] > 0));
  return s ? `Synergy: ${s.name}` : null;
}
