// Vault: persistent meta unlocks bought with Shards. Pure data and helpers.
import { defaultMeta } from '../sim/world.ts';
import type { ArenaId, MetaBonus } from '../sim/types.ts';

export interface VaultItem {
  id: string;
  name: string;
  desc: string;
  /** cost per tier (length = number of tiers) */
  cost: number[];
  group: 'weapon' | 'bonus' | 'start' | 'arena';
}

export const VAULT: VaultItem[] = [
  { id: 'w_homing', name: 'Seeker Swarm', desc: 'Unlocks homing missiles in the upgrade pool. Pairs with Lance Beam and Detonation.', cost: [40], group: 'weapon' },
  { id: 'w_pierce', name: 'Lance Beam', desc: 'Unlocks the piercing beam. Pairs with Seeker Swarm.', cost: [60], group: 'weapon' },
  { id: 'w_chain', name: 'Chain Arc', desc: 'Unlocks lightning that jumps between enemies. Pairs with Siphon.', cost: [90], group: 'weapon' },
  { id: 'b_hp', name: 'Hull Plating', desc: 'Start every run with +10 max HP per tier.', cost: [50, 90, 140], group: 'bonus' },
  { id: 'b_speed', name: 'Thruster Tuning', desc: 'Start every run with +4% move speed per tier.', cost: [60, 110], group: 'bonus' },
  { id: 'b_luck', name: 'Lucky Charm', desc: 'Start every run with +0.1 luck per tier.', cost: [70, 120], group: 'bonus' },
  { id: 'b_reroll', name: 'Spare Circuit', desc: 'One extra reroll of upgrade cards each run.', cost: [80], group: 'bonus' },
  { id: 's_siphon', name: 'Primed Siphon', desc: 'Start every run with Siphon level 1 already installed.', cost: [120], group: 'start' },
  { id: 'a_foundry', name: 'Arena: Ring Foundry', desc: 'A circular arena with periodic lightning lanes.', cost: [150], group: 'arena' },
];

export type Owned = Record<string, number>;

export function tierOf(owned: Owned, id: string): number {
  return owned[id] ?? 0;
}

export function nextCost(owned: Owned, item: VaultItem): number | null {
  const t = tierOf(owned, item.id);
  return t >= item.cost.length ? null : item.cost[t];
}

export function canBuy(owned: Owned, shards: number, item: VaultItem): boolean {
  const c = nextCost(owned, item);
  return c !== null && shards >= c;
}

/** Returns the new shard balance and ownership, or null if not purchasable. */
export function buy(owned: Owned, shards: number, id: string): { owned: Owned; shards: number } | null {
  const item = VAULT.find((v) => v.id === id);
  if (!item || !canBuy(owned, shards, item)) return null;
  const c = nextCost(owned, item) ?? 0;
  return { owned: { ...owned, [id]: tierOf(owned, id) + 1 }, shards: shards - c };
}

export function arenaUnlocked(owned: Owned, arena: ArenaId): boolean {
  return arena === 'hollow' || tierOf(owned, 'a_foundry') > 0;
}

export function buildMeta(owned: Owned, arena: ArenaId): MetaBonus {
  const m = defaultMeta();
  const unlocked = new Set(m.unlocked);
  if (tierOf(owned, 'w_homing')) unlocked.add('homing');
  if (tierOf(owned, 'w_pierce')) unlocked.add('pierce');
  if (tierOf(owned, 'w_chain')) unlocked.add('chain');
  return {
    unlocked: [...unlocked],
    hp: 10 * tierOf(owned, 'b_hp'),
    speed: 0.04 * tierOf(owned, 'b_speed'),
    luck: 0.1 * tierOf(owned, 'b_luck'),
    rerolls: 1 + tierOf(owned, 'b_reroll'),
    startSiphon: tierOf(owned, 's_siphon') > 0,
    arena: arenaUnlocked(owned, arena) ? arena : 'hollow',
  };
}
