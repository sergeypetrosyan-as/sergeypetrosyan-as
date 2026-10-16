// Upgrade definitions (pure data). All numbers here mirror docs/game-prompts/05-void-survivor.md.
export type UpgradeId =
  | 'pulse'
  | 'orbit'
  | 'homing'
  | 'pierce'
  | 'chain'
  | 'vitality'
  | 'regen'
  | 'swift'
  | 'magnet'
  | 'overclock'
  | 'fortune'
  | 'plating'
  | 'siphon'
  | 'bulwark'
  | 'detonation'
  | 'overcharge'
  | 'repair'
  | 'cache';

export type Levels = Record<UpgradeId, number>;

export interface UpgradeDef {
  id: UpgradeId;
  name: string;
  kind: 'weapon' | 'passive' | 'signature' | 'filler';
  maxLevel: number;
  weight: number;
  rare?: boolean;
  defensive?: boolean;
  requires?: Partial<Record<UpgradeId, number>>;
  tags: string[];
  icon: string;
  color: string;
  desc: (level: number) => string;
}

export const UPGRADES: UpgradeDef[] = [
  {
    id: 'pulse', name: 'Pulse Amp', kind: 'weapon', maxLevel: 5, weight: 7, tags: ['weapon', 'auto-aim'], icon: 'P', color: '#7af8ff',
    desc: (l) => `Pulse Cannon: ${8 + 2.5 * (l - 1)} dmg, ${l >= 5 ? 3 : l >= 3 ? 2 : 1} shot${l >= 3 ? 's' : ''} per volley.`,
  },
  {
    id: 'orbit', name: 'Orbit Blades', kind: 'weapon', maxLevel: 5, weight: 10, tags: ['weapon', 'melee'], icon: 'O', color: '#59ffb5',
    desc: (l) => `${l + 1} blades circle you for ${6 + 2.5 * l} dmg per hit.`,
  },
  {
    id: 'homing', name: 'Seeker Swarm', kind: 'weapon', maxLevel: 5, weight: 9, rare: true, tags: ['weapon', 'homing'], icon: 'H', color: '#ffa23a',
    desc: (l) => `Fires ${1 + Math.floor((l - 1) / 2)} homing missile${l >= 3 ? 's' : ''} for ${11 + 3 * l} dmg.`,
  },
  {
    id: 'pierce', name: 'Lance Beam', kind: 'weapon', maxLevel: 5, weight: 9, rare: true, tags: ['weapon', 'piercing'], icon: 'L', color: '#e9fbff',
    desc: (l) => `Beam through every enemy in a line: ${16 + 6 * l} dmg${l >= 4 ? ', twin beams' : ''}.`,
  },
  {
    id: 'chain', name: 'Chain Arc', kind: 'weapon', maxLevel: 5, weight: 9, rare: true, tags: ['weapon', 'lightning'], icon: 'C', color: '#b58cff',
    desc: (l) => `Lightning jumps ${2 + l} times for ${10 + 3.5 * l} dmg, ignores shields.`,
  },
  {
    id: 'vitality', name: 'Vitality', kind: 'passive', maxLevel: 5, weight: 8, defensive: true, tags: ['defense'], icon: '+', color: '#ff5d8f',
    desc: () => '+20 max HP and heal 20.',
  },
  {
    id: 'regen', name: 'Regeneration', kind: 'passive', maxLevel: 5, weight: 7, defensive: true, tags: ['defense'], icon: 'R', color: '#59ffb5',
    desc: (l) => `Regenerate ${(0.7 * l).toFixed(1)} HP per second.`,
  },
  {
    id: 'swift', name: 'Swift Thrusters', kind: 'passive', maxLevel: 5, weight: 7, tags: ['mobility'], icon: 'S', color: '#35f2ff',
    desc: (l) => `+${7 * l}% move speed.`,
  },
  {
    id: 'magnet', name: 'Magnet Core', kind: 'passive', maxLevel: 5, weight: 6, tags: ['economy'], icon: 'M', color: '#ffd24a',
    desc: (l) => `+${30 * l}% pickup radius.`,
  },
  {
    id: 'overclock', name: 'Overclock', kind: 'passive', maxLevel: 5, weight: 8, tags: ['cooldown'], icon: 'X', color: '#ff2e88',
    desc: (l) => `Weapons cool down ${Math.round((1 - Math.pow(0.93, l)) * 100)}% faster.`,
  },
  {
    id: 'fortune', name: 'Fortune', kind: 'passive', maxLevel: 5, weight: 5, tags: ['luck'], icon: '$', color: '#ffd24a',
    desc: (l) => `Luck ${(0.1 * l).toFixed(1)}: rarer cards, more chests and shards.`,
  },
  {
    id: 'plating', name: 'Plating', kind: 'passive', maxLevel: 4, weight: 6, defensive: true, tags: ['defense'], icon: 'A', color: '#9bb4ff',
    desc: (l) => `Take ${Math.round((1 - Math.pow(0.94, l)) * 100)}% less damage.`,
  },
  {
    id: 'siphon', name: 'Siphon', kind: 'signature', maxLevel: 3, weight: 9, rare: true, tags: ['essence', 'signature'], icon: 'V', color: '#59ffb5',
    desc: (l) => `Kills fill your Reserve x${[1, 1.5, 2][l - 1]} (cap ${[60, 100, 150][l - 1]}).`,
  },
  {
    id: 'bulwark', name: 'Bulwark Field', kind: 'signature', maxLevel: 3, weight: 9, rare: true, requires: { siphon: 1 }, tags: ['essence', 'shield', 'signature'], icon: 'B', color: '#35f2ff',
    desc: (l) => `Reserve becomes a shield ring that eats bullets and burns enemies (+${25 * (l - 1)}% burn).`,
  },
  {
    id: 'detonation', name: 'Detonation', kind: 'signature', maxLevel: 3, weight: 9, rare: true, requires: { bulwark: 1 }, tags: ['essence', 'burst', 'signature'], icon: 'D', color: '#ff2e88',
    desc: (l) => `Field break or release (E) bursts for Reserve spent (+${30 * (l - 1)}% power).`,
  },
  {
    id: 'overcharge', name: 'Overcharge', kind: 'filler', maxLevel: 999, weight: 1, tags: ['damage'], icon: '^', color: '#ffa23a',
    desc: () => '+4% damage to everything.',
  },
  {
    id: 'repair', name: 'Repair Kit', kind: 'filler', maxLevel: 999, weight: 1, defensive: true, tags: ['heal'], icon: 'K', color: '#ff5d8f',
    desc: () => 'Heal 35% of max HP now.',
  },
  {
    id: 'cache', name: 'Shard Cache', kind: 'filler', maxLevel: 999, weight: 1, tags: ['shards'], icon: '*', color: '#ffd24a',
    desc: () => 'Gain 8 Shards immediately.',
  },
];

export const UPGRADE_BY_ID: Record<string, UpgradeDef> = Object.fromEntries(UPGRADES.map((u) => [u.id, u]));

export function newLevels(): Levels {
  const l = {} as Levels;
  for (const u of UPGRADES) l[u.id] = 0;
  l.pulse = 1;
  return l;
}

export interface SynergyDef {
  id: string;
  name: string;
  needs: UpgradeId[];
  desc: string;
}

export const SYNERGIES: SynergyDef[] = [
  { id: 'seekerLance', name: 'Seeker Lance', needs: ['homing', 'pierce'], desc: 'Missiles pierce 2 extra enemies; beam damage x1.25.' },
  { id: 'leechArc', name: 'Leech Arc', needs: ['siphon', 'chain'], desc: 'Arc +2 jumps; every arc hit adds 1 Reserve.' },
  { id: 'bladedField', name: 'Bladed Field', needs: ['bulwark', 'orbit'], desc: 'Blades ride the field edge for x1.6 damage; field burns x1.5.' },
  { id: 'clusterBurst', name: 'Cluster Burst', needs: ['detonation', 'homing'], desc: 'Detonations also launch homing shards.' },
  { id: 'voidReactor', name: 'Void Reactor', needs: ['siphon', 'bulwark', 'detonation'], desc: 'Detonations refund 25% of the Reserve spent.' },
];
