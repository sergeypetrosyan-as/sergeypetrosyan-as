// Contradiction engine. Pure, deterministic, DOM-free.
import { fmt } from './types.ts';
import type { Claim, Source, SourceId } from './types.ts';
import { LOCATIONS, PEOPLE, scopeHas, scopesIntersect, travel } from './data.ts';

export type RuleId = 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6' | 'R7';

export const RULES: Record<RuleId, { name: string; explain: string }> = {
  R1: { name: 'Double-booked', explain: 'One person cannot be in two places during the same minutes.' },
  R2: { name: 'Impossible travel', explain: 'Two places are further apart than the time between the two sightings.' },
  R3: { name: 'Light clash', explain: 'One source says a place was lit while another says it was dark.' },
  R4: { name: 'Clock clash', explain: 'Two sources put the same event at different times.' },
  R5: { name: 'Sound impossible', explain: 'A sound was heard while the system that makes it was offline.' },
  R6: { name: 'Anachronism', explain: 'A recording mentions an event that had not happened yet when it was made.' },
  R7: { name: 'Exclusive item', explain: 'Two people cannot hold the same single key at once.' },
};

export interface Contradiction {
  id: string;
  rule: RuleId;
  a: SourceId;
  b: SourceId;
  verdict: 'refuted' | 'disputed' | 'invalid';
  /** the soft source that a hard source refutes (verdict refuted) */
  refuted?: SourceId;
  resolved: boolean;
  text: string;
  detail: string;
}

const placeName = (p: string): string => (p === 'home' ? 'home' : p === 'building' ? 'the building' : LOCATIONS[p]?.name ?? p);
const span = (a: number, b: number): string => (a === b ? fmt(a) : `${fmt(a)}–${fmt(b)}`);

export function describeClaim(c: Claim): string {
  switch (c.k) {
    case 'at': return `${PEOPLE[c.who].name} at ${placeName(c.loc)}, ${span(c.from, c.to)}`;
    case 'holds': return `${PEOPLE[c.who].name} holds the ${c.item}, ${span(c.from, c.to)}`;
    case 'light': return `${placeName(c.loc)} ${c.lit ? 'lit' : 'dark'}, ${span(c.from, c.to)}`;
    case 'heard': return `${c.sound === 'alarm' ? 'the vault alarm' : 'raised voices'} heard at ${placeName(c.loc)}, ${fmt(c.at)}`;
    case 'mute': return `${c.sound === 'alarm' ? 'the vault alarm' : 'sound'} offline in ${placeName(c.loc)}, ${span(c.from, c.to)}`;
    case 'event': return `${c.ev} at ${fmt(c.at)}`;
    case 'ref': return `speaks of the ${c.ev} as already happened`;
  }
}

const overlap = (a0: number, a1: number, b0: number, b1: number): boolean => a0 <= b1 && b0 <= a1;

function verdictOf(a: Source, b: Source): Pick<Contradiction, 'verdict' | 'refuted'> {
  if (a.hard && b.hard) return { verdict: 'invalid' };
  if (a.hard) return { verdict: 'refuted', refuted: b.id };
  if (b.hard) return { verdict: 'refuted', refuted: a.id };
  return { verdict: 'disputed' };
}

/**
 * Detect contradictions among `sources`. `have` is the set of everything the player holds
 * (used to decide whether a statement was retracted, which resolves the contradiction).
 */
export function detect(sources: Source[], have: Set<SourceId>): Contradiction[] {
  const out = new Map<string, Contradiction>();
  const push = (rule: RuleId, a: Source, b: Source, ia: number, ib: number, detail: string): void => {
    const [x, y, ix, iy] = a.id <= b.id ? [a, b, ia, ib] : [b, a, ib, ia];
    const id = `${rule}|${x.id}|${y.id}|${ix}|${iy}`;
    if (out.has(id)) return;
    const resolved = (!!x.retractedBy && have.has(x.retractedBy)) || (!!y.retractedBy && have.has(y.retractedBy));
    const ca = x.claims[ix];
    const cb = y.claims[iy];
    const aText = ca ? describeClaim(ca) : '';
    const bText = cb ? describeClaim(cb) : '';
    out.set(id, {
      id, rule, a: x.id, b: y.id, ...verdictOf(x, y), resolved,
      text: `${RULES[rule].name}: ${x.title} vs ${y.title}`,
      detail: detail || `${aText}  /  ${bText}`,
    });
  };

  // hard event times for the anachronism rule
  const hardEvents: { ev: string; at: number }[] = [];
  for (const s of sources) if (s.hard) for (const c of s.claims) if (c.k === 'event') hardEvents.push({ ev: c.ev, at: c.at });

  for (let i = 0; i < sources.length; i++) {
    const A = sources[i];
    // R6 anachronism (single source)
    if (A.ts !== undefined) {
      A.claims.forEach((c, ic) => {
        if (c.k !== 'ref') return;
        const late = hardEvents.find((h) => h.ev === c.ev && h.at > (A.ts as number));
        if (late) {
          // Anachronism is between the fragment and the hard source that fixes the event time.
          const src = sources.find((s) => s.hard && s.claims.some((x) => x.k === 'event' && x.ev === c.ev && x.at === late.at));
          if (src) push('R6', A, src, ic, src.claims.findIndex((x) => x.k === 'event' && x.ev === c.ev),
            `${A.title} was recorded at ${fmt(A.ts as number)} but speaks of the ${c.ev} (${fmt(late.at)}) as already happened.`);
        }
      });
    }
    for (let j = i + 1; j < sources.length; j++) {
      const B = sources[j];
      A.claims.forEach((ca, ia) => {
        B.claims.forEach((cb, ib) => {
          if (ca.k === 'at' && cb.k === 'at' && ca.who === cb.who && ca.loc !== cb.loc) {
            if (overlap(ca.from, ca.to, cb.from, cb.to)) {
              push('R1', A, B, ia, ib, '');
            } else {
              const [e, l] = ca.to < cb.from ? [ca, cb] : [cb, ca];
              const gap = l.from - e.to;
              const need = travel(e.loc, l.loc);
              if (gap < need) push('R2', A, B, ia, ib, `${describeClaim(ca)}  /  ${describeClaim(cb)}  (${gap} min apart, ${need} min needed)`);
            }
          } else if (ca.k === 'light' && cb.k === 'light' && ca.lit !== cb.lit && scopesIntersect(ca.loc, cb.loc) && overlap(ca.from, ca.to, cb.from, cb.to)) {
            push('R3', A, B, ia, ib, '');
          } else if (ca.k === 'event' && cb.k === 'event' && ca.ev === cb.ev && Math.abs(ca.at - cb.at) > 1) {
            push('R4', A, B, ia, ib, '');
          } else if (ca.k === 'heard' && cb.k === 'mute' && ca.sound === cb.sound && ca.at >= cb.from && ca.at <= cb.to && scopeHas(cb.loc, ca.loc)) {
            push('R5', A, B, ia, ib, '');
          } else if (ca.k === 'mute' && cb.k === 'heard' && ca.sound === cb.sound && cb.at >= ca.from && cb.at <= ca.to && scopeHas(ca.loc, cb.loc)) {
            push('R5', A, B, ia, ib, '');
          } else if (ca.k === 'holds' && cb.k === 'holds' && ca.item === cb.item && ca.who !== cb.who && overlap(ca.from, ca.to, cb.from, cb.to)) {
            push('R7', A, B, ia, ib, '');
          }
        });
      });
    }
  }
  return [...out.values()].sort((p, q) => (p.id < q.id ? -1 : 1));
}
