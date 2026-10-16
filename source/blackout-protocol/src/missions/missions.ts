import type { MissionDef } from '../sim/types.ts';
import { M1_MAP, M2_MAP, M3_MAP, M4_MAP } from './maps.ts';

const E = 0;
const W = Math.PI;
const S = Math.PI / 2;

export const MISSIONS: MissionDef[] = [
  {
    id: 'cold-entry',
    index: 0,
    name: 'COLD ENTRY',
    subtitle: 'Halcyon Freight Annex',
    briefing: [
      'Marrow: "Welcome to the dark, Null. The Annex ships suppression hardware to the districts and logs every crate in one manifest."',
      'The manifest sits on a vault terminal. The vault door is sealed behind a red keycard. Two guards, one camera. Nobody here has seen you before. Keep it that way.',
    ],
    hints: [
      'Shadow tiles shrink a guard\'s sight to 40 percent. Sneaking shrinks it again.',
      'The vault door can be unlocked with the red keycard in the office, or hacked open for 15 energy.',
      'The corridor camera can be looped (35 energy) or avoided by sneaking through the shadow stretch.',
    ],
    par: 150,
    map: M1_MAP,
    objectives: [
      { id: 'manifest', label: 'Download the shipping manifest (vault terminal)' },
      { id: 'extract', label: 'Reach the extraction dock' },
    ],
    doors: [{ id: '1', locked: true, card: 'red' }, { id: '2', locked: false }],
    terminals: [{ id: 'A', len: 4, label: 'MANIFEST DOWNLOAD', effect: { objective: 'manifest' } }],
    lasers: [],
    items: [],
    guards: [
      { zone: 'corridor', route: [{ x: 3, y: 8, wait: 2, face: E }, { x: 26, y: 9, wait: 2, face: W }] },
      { zone: 'office', route: [{ x: 11, y: 3, wait: 2.5 }, { x: 16, y: 5, wait: 2.5 }, { x: 11, y: 5, wait: 1.5 }] },
    ],
    cameras: [{ x: 28, y: 8, dir: W, sweep: 0.5, speed: 0.8, zone: 'corridor' }],
  },
  {
    id: 'lattice',
    index: 1,
    name: 'LATTICE',
    subtitle: 'Vantage Tower, server floor',
    briefing: [
      'Marrow: "WARDEN keeps its patrol schedules on two memory shards. Alpha is east, Beta is in the central server room. Both rooms sit behind laser lattices."',
      'The east lattice pulses. The central one does not. Cut a grid and the alarm echo pulls guards toward the control corridor. Plan your energy.',
    ],
    hints: [
      'A pulsing grid can be crossed for free in the off window. The beam only trips when you stand inside a beam tile.',
      'The west server room terminal opens the locked door into the central room: an alternate route in or out.',
      'Cutting a grid lasts 5 seconds and pings the corridor. Loop the camera in the central room before you step in.',
    ],
    par: 240,
    map: M2_MAP,
    objectives: [
      { id: 'shardA', label: 'Retrieve shard ALPHA (east server room)' },
      { id: 'shardB', label: 'Retrieve shard BETA (central server room)' },
      { id: 'extract', label: 'Reach the west extraction lift' },
    ],
    doors: [{ id: '3', locked: false }, { id: '4', locked: true }, { id: '5', locked: false }],
    terminals: [{ id: 'B', len: 5, label: 'WEST DOOR OVERRIDE', effect: { unlock: '4' } }],
    lasers: [
      { id: 'a', period: { on: 2.5, off: 1.5, phase: 0 }, echo: { x: 27, y: 8 } },
      { id: 'b', echo: { x: 13, y: 8 } },
    ],
    items: [
      { id: 'i', objective: 'shardA', label: 'SHARD ALPHA' },
      { id: 'j', objective: 'shardB', label: 'SHARD BETA' },
    ],
    guards: [
      { zone: 'corridor', route: [{ x: 2, y: 8, wait: 2.5, face: E }, { x: 33, y: 9, wait: 2.5, face: W }] },
      { zone: 'south', route: [{ x: 13, y: 13, wait: 2 }, { x: 22, y: 13, wait: 2 }, { x: 22, y: 17, wait: 2 }, { x: 13, y: 17, wait: 2 }] },
      { zone: 'east', route: [{ x: 26, y: 2, wait: 3, face: S }, { x: 26, y: 5, wait: 3, face: -S }] },
    ],
    cameras: [
      { x: 34, y: 8, dir: W, sweep: 0.5, speed: 0.8, zone: 'corridor' },
      { x: 23, y: 1, dir: 2.36, sweep: 0.6, speed: 0.9, zone: 'central' },
    ],
  },
  {
    id: 'glass-archive',
    index: 2,
    name: 'GLASS ARCHIVE',
    subtitle: 'Meridian Records',
    briefing: [
      'Marrow: "The audit log that ties Halcyon to the blackouts lives in the archive wing. You need two keycards: red from the admin office, blue from the security hub."',
      'The hub is split by a pulsing laser band. The atrium is guarded by a man who never leaves his post. Use the maintenance corridor, or give him something to look at.',
    ],
    hints: [
      'The red card opens the hub door. The blue card is behind the pulsing laser band, north of the hub guard.',
      'Locking a door behind you seals a patrol out. Lockers hide you completely, but not if a guard watches you climb in.',
      'The audit terminal has a tighter timer. Watch the pattern, then repeat it without hesitation.',
    ],
    par: 330,
    map: M3_MAP,
    objectives: [
      { id: 'card_red', label: 'Take the RED keycard (admin office)' },
      { id: 'card_blue', label: 'Take the BLUE keycard (security hub)' },
      { id: 'audit', label: 'Copy the audit log (archive terminal)' },
      { id: 'extract', label: 'Reach the dock lift' },
    ],
    doors: [
      { id: '1', locked: true, card: 'red' }, { id: '2', locked: true, card: 'blue' },
      { id: '3', locked: false }, { id: '4', locked: false },
    ],
    terminals: [{ id: 'E', len: 6, time: 13, label: 'AUDIT LOG COPY', effect: { objective: 'audit' } }],
    lasers: [{ id: 'a', period: { on: 3, off: 2, phase: 0 }, echo: { x: 19, y: 11 } }],
    items: [],
    guards: [
      { zone: 'corridor', route: [{ x: 2, y: 11, wait: 3, face: E }, { x: 37, y: 12, wait: 3, face: W }] },
      { zone: 'atrium', route: [{ x: 15, y: 15, wait: 2 }, { x: 24, y: 15, wait: 2 }, { x: 24, y: 19, wait: 2 }, { x: 15, y: 19, wait: 2 }] },
      { zone: 'atrium', route: [{ x: 14, y: 17, wait: 99, face: W }], range: 8 },
      { zone: 'hub', route: [{ x: 14, y: 8, wait: 2.5 }, { x: 21, y: 8, wait: 2.5 }] },
      { zone: 'admin', route: [{ x: 8, y: 3, wait: 2.5 }, { x: 8, y: 8, wait: 2.5 }] },
    ],
    cameras: [
      { x: 25, y: 14, dir: 2.36, sweep: 0.6, speed: 0.8, zone: 'atrium' },
      { x: 38, y: 11, dir: W, sweep: 0.5, speed: 0.8, zone: 'corridor' },
      { x: 28, y: 9, dir: E, sweep: 0.4, speed: 0.9, zone: 'archive' },
    ],
  },
  {
    id: 'blackout',
    index: 3,
    name: 'BLACKOUT',
    subtitle: 'The Prometheus Core',
    briefing: [
      'Marrow: "This is it. WARDEN\'s mind lives in the Prometheus Core. Take the root key from the north vault, wake three relay terminals, then purge the core."',
      'The purge kills every light in the district and starts a 40 second lockdown. Every guard will run for the core. There is one door between the core and the lift. Lock it behind you.',
    ],
    hints: [
      'Relay R1 in the north-west wing opens a side door into the vault, so you can skip the laser entrance.',
      'The core terminal refuses you until the key and all three relays are done.',
      'After the purge, walk, do not sneak: every tile is shadow and cameras are dead. Lock the lift door behind you (15 energy).',
    ],
    par: 480,
    map: M4_MAP,
    objectives: [
      { id: 'key', label: 'Take the ROOT KEY (north vault)' },
      { id: 'r1', label: 'Activate relay R1 (north-west wing)' },
      { id: 'r2', label: 'Activate relay R2 (north-east wing)' },
      { id: 'r3', label: 'Activate relay R3 (south-west wing)' },
      { id: 'purge', label: 'Purge the core (central terminal)' },
      { id: 'extract', label: 'Reach the roof lift before lockdown ends' },
    ],
    doors: [{ id: '5', locked: false }, { id: '7', locked: true }, { id: '9', locked: false }],
    terminals: [
      { id: 'B', len: 5, label: 'RELAY R1', effect: { objective: 'r1', unlock: '7' } },
      { id: 'C', len: 5, label: 'RELAY R2', effect: { objective: 'r2' } },
      { id: 'E', len: 6, label: 'RELAY R3', effect: { objective: 'r3' } },
      { id: 'D', len: 7, time: 16, label: 'CORE PURGE', effect: { objective: 'purge', finale: true, needs: ['key', 'r1', 'r2', 'r3'] } },
    ],
    lasers: [{ id: 'a', echo: { x: 12, y: 8 } }],
    items: [{ id: 'i', objective: 'key', label: 'ROOT KEY' }],
    guards: [
      { zone: 'hall', route: [{ x: 2, y: 8, wait: 2.5, face: E }, { x: 41, y: 9, wait: 2.5, face: W }] },
      { zone: 'nw', route: [{ x: 9, y: 2, wait: 3, face: W }, { x: 12, y: 2, wait: 3, face: E }] },
      { zone: 'ne', route: [{ x: 31, y: 2, wait: 3, face: S }, { x: 31, y: 5, wait: 3, face: -S }] },
      { zone: 'sw', route: [{ x: 12, y: 12, wait: 3, face: S }, { x: 12, y: 16, wait: 3, face: -S }] },
      { zone: 'se', route: [{ x: 30, y: 18, wait: 3, face: -S }, { x: 30, y: 13, wait: 3, face: S }] },
    ],
    cameras: [
      { x: 42, y: 9, dir: W, sweep: 0.4, speed: 0.8, zone: 'hall' },
      { x: 28, y: 1, dir: 2.36, sweep: 0.5, speed: 0.9, zone: 'vault' },
    ],
    finale: { countdown: 40, alert: 50 },
  },
];

export function missionById(id: string): MissionDef | undefined {
  return MISSIONS.find((m) => m.id === id);
}
