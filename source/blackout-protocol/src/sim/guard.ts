import type { Guard, World } from './types.ts';
import { blockersBetween, findPath, solidAt } from './grid.ts';
import { DIFF, K, canSee, turnToward } from './vision.ts';

export function emit(w: World, k: string, x?: number, y?: number, msg?: string, v?: number): void {
  w.events.push({ k, x, y, msg, v });
  if (w.events.length > 120) w.events.splice(0, w.events.length - 120);
}

export function addAlert(w: World, amount: number): void {
  w.alert = Math.min(K.LOCKDOWN, w.alert + amount);
  if (w.alert > w.alertPeak) w.alertPeak = w.alert;
}

export function addRing(w: World, x: number, y: number, r: number, kind: string, ttl = 0.7): void {
  w.rings.push({ x, y, r, age: 0, ttl, kind });
  if (w.rings.length > 24) w.rings.shift();
}

export function enterSuspicious(w: World, g: Guard, tx: number, ty: number, sus: number, counts: boolean): void {
  const was = g.state;
  g.state = 'suspicious';
  g.phase = 'look';
  g.phaseT = 0.7;
  g.target = { x: tx, y: ty };
  g.path = null;
  g.decoy = false;
  g.sus = Math.max(g.sus, sus);
  if (counts && was === 'patrol') { w.stats.detections++; emit(w, 'suspicious', g.x, g.y); }
}

function enterAlert(w: World, g: Guard): void {
  g.state = 'alert';
  g.lostT = 0;
  g.path = null;
  g.repathT = 0;
  g.decoy = false;
  g.sus = 100;
  w.stats.spotted++;
  addAlert(w, 20);
  emit(w, 'alert', g.x, g.y);
  const px = w.player.x, py = w.player.y;
  for (const o of w.guards) {
    if (o === g || o.state === 'alert') continue;
    if (Math.hypot(o.x - g.x, o.y - g.y) <= 12) enterSuspicious(w, o, px, py, 60, true);
  }
}

function enterSearch(w: World, g: Guard): void {
  g.state = 'search';
  g.path = null;
  g.repathT = 0;
  g.target = g.lastSeen ? { ...g.lastSeen } : { x: g.x, y: g.y };
  g.sus = Math.min(g.sus, 60);
  emit(w, 'search', g.x, g.y);
}

function followPath(g: Guard, speed: number, dt: number): boolean {
  const path = g.path;
  if (!path) return true;
  while (path.length && Math.hypot(path[0].x - g.x, path[0].y - g.y) < 0.08) path.shift();
  if (!path.length) return true;
  const tx = path[0].x, ty = path[0].y;
  const d = Math.hypot(tx - g.x, ty - g.y);
  const step = Math.min(d, speed * dt);
  g.x += ((tx - g.x) / d) * step;
  g.y += ((ty - g.y) / d) * step;
  g.dir = turnToward(g.dir, Math.atan2(ty - g.y, tx - g.x), 4 * dt);
  return false;
}

function pathTo(w: World, g: Guard, x: number, y: number): boolean {
  const p = findPath(w, Math.floor(g.x), Math.floor(g.y), Math.floor(x), Math.floor(y));
  g.path = p;
  return p !== null;
}

function pathStale(w: World, g: Guard): boolean {
  if (!g.path || !g.path.length) return false;
  const n = g.path[0];
  return solidAt(w, Math.floor(n.x), Math.floor(n.y));
}

function sweep(w: World, g: Guard, base: number, dt: number): void {
  const t = base + 0.5 * Math.sin(w.time * 1.4 + g.id * 1.7);
  g.dir = turnToward(g.dir, t, 3 * dt);
}

/** Hearing: effective distance grows with the walls between source and listener. */
export function hearNoise(w: World, x: number, y: number, radius: number, kind: 'step' | 'alarm' | 'decoy'): void {
  for (const g of w.guards) {
    if (g.state === 'alert') continue;
    const d = Math.hypot(g.x - x, g.y - y);
    if (d > radius * 2) continue;
    const walls = blockersBetween(w, g.x, g.y, x, y, false);
    const de = d * (1 + 0.8 * walls);
    if (de > radius) continue;
    if (kind === 'step') {
      if (g.state === 'patrol' || g.state === 'search') {
        g.sus = Math.max(g.sus, 20 + 30 * (1 - de / radius));
        g.lastSeen = { x, y };
        if (g.state === 'patrol' && g.sus >= K.SUS_THRESHOLD) enterSuspicious(w, g, x, y, g.sus, true);
      }
    } else if (kind === 'alarm') {
      g.sus = Math.max(g.sus, 50);
      g.noContact = 0;
      if (g.state !== 'search') enterSuspicious(w, g, x, y, 50, true);
      else { g.target = { x, y }; g.path = null; }
    } else {
      if (g.state === 'patrol' || g.state === 'suspicious' || g.state === 'search') {
        const was = g.state;
        enterSuspicious(w, g, x, y, 40, false);
        g.decoy = true;
        if (was !== 'suspicious') w.stats.decoyPulls++;
        emit(w, 'lure', g.x, g.y);
      }
    }
  }
}

export function updateGuards(w: World, dt: number): void {
  const diff = DIFF[w.difficulty];
  const p = w.player;
  for (const g of w.guards) {
    const s = canSee(w, g.x, g.y, g.dir, g.fov, g.range * diff.range);
    g.seeing = s.seen;
    if (s.seen) {
      g.noContact = 0;
      g.lastSeen = { x: p.x, y: p.y };
      const rate = K.FILL_GUARD * s.prox * diff.fill * (w.alert >= 60 ? 1.25 : 1) * (g.state === 'search' ? 1.25 : 1);
      g.sus = Math.min(100, g.sus + rate * dt);
    } else {
      g.noContact += dt;
      if (g.noContact > 0.6) {
        const dec = g.state === 'patrol' ? 14 : g.state === 'suspicious' ? 8 : g.state === 'search' ? 6 : 0;
        g.sus = Math.max(0, g.sus - dec * dt);
      }
    }
    g.repathT -= dt;

    // transitions driven by sight
    if (g.state !== 'alert' && g.sus >= 100 && s.seen) enterAlert(w, g);
    else if (g.state === 'patrol' && g.sus >= K.SUS_THRESHOLD && g.lastSeen) enterSuspicious(w, g, g.lastSeen.x, g.lastSeen.y, g.sus, true);

    switch (g.state) {
      case 'patrol': patrol(w, g, dt); break;
      case 'suspicious': suspicious(w, g, dt); break;
      case 'alert': alertChase(w, g, dt); break;
      case 'search': search(w, g, dt); break;
    }
  }
}

function patrol(w: World, g: Guard, dt: number): void {
  const wp = g.route[g.ri];
  if (!wp) return;
  if (g.waitT > 0) {
    g.waitT -= dt;
    sweep(w, g, wp.face ?? g.baseFace, dt);
    if (g.waitT <= 0) { g.ri = (g.ri + 1) % g.route.length; g.path = null; }
    return;
  }
  if (!g.path || pathStale(w, g)) {
    if (!pathTo(w, g, wp.x, wp.y)) {
      g.blockedT += dt;
      sweep(w, g, g.baseFace, dt);
      if (g.blockedT > 2) { g.blockedT = 0; g.ri = (g.ri + 1) % g.route.length; }
      return;
    }
    g.blockedT = 0;
  }
  const arrived = followPath(g, K.GUARD_PATROL, dt);
  if (arrived) {
    g.waitT = wp.wait;
    g.baseFace = wp.face ?? g.dir;
    if (wp.wait <= 0) g.ri = (g.ri + 1) % g.route.length;
    g.path = null;
  }
}

function suspicious(w: World, g: Guard, dt: number): void {
  const t = g.target;
  if (!t) { g.state = 'patrol'; return; }
  if (g.phase === 'look') {
    g.dir = turnToward(g.dir, Math.atan2(t.y - g.y, t.x - g.x), 4 * dt);
    g.phaseT -= dt;
    if (g.phaseT <= 0) { g.phase = 'go'; g.path = null; }
  } else if (g.phase === 'go') {
    if (!g.path || pathStale(w, g)) {
      if (!pathTo(w, g, t.x, t.y)) { g.phase = 'inspect'; g.phaseT = 1.5; return; }
    }
    if (followPath(g, K.GUARD_INVESTIGATE, dt)) { g.phase = 'inspect'; g.phaseT = 2.5; g.baseFace = g.dir; }
  } else {
    sweep(w, g, g.baseFace, dt);
    g.phaseT -= dt;
    if (g.decoy && w.decoy) g.phaseT = Math.max(g.phaseT, 0.6);
    if (g.phaseT <= 0) {
      g.state = 'patrol';
      g.decoy = false;
      g.path = null;
      g.sus = Math.min(g.sus, 20);
    }
  }
}

function alertChase(w: World, g: Guard, dt: number): void {
  const p = w.player;
  // compromised locker: guard saw the operative hide
  if (p.hidden && g.lockerTarget) {
    if (g.repathT <= 0 || !g.path) { pathTo(w, g, g.lockerTarget.x, g.lockerTarget.y); g.repathT = 0.4; }
    followPath(g, K.GUARD_CHASE, dt);
    if (Math.hypot(g.x - g.lockerTarget.x, g.y - g.lockerTarget.y) < 1.2) { w.status = 'compromised'; w.reason = 'caught'; }
    return;
  }
  const tgt = g.seeing ? { x: p.x, y: p.y } : g.lastSeen ?? { x: g.x, y: g.y };
  if (g.repathT <= 0 || !g.path) {
    pathTo(w, g, tgt.x, tgt.y);
    g.repathT = 0.4;
  }
  followPath(g, K.GUARD_CHASE, dt);
  if (g.seeing) {
    g.dir = turnToward(g.dir, Math.atan2(p.y - g.y, p.x - g.x), 6 * dt);
    g.lostT = 0;
    addAlert(w, 6 * dt);
    if (Math.hypot(p.x - g.x, p.y - g.y) < K.CATCH_DIST) { w.status = 'compromised'; w.reason = 'caught'; }
  } else {
    g.lostT += dt;
    if (g.lostT > 3) enterSearch(w, g);
  }
}

function search(w: World, g: Guard, dt: number): void {
  const t = g.target;
  if (g.noContact >= K.SEARCH_TIME) {
    g.state = 'patrol';
    g.sus = 0;
    g.path = null;
    g.lockerTarget = null;
    return;
  }
  if (!t) return;
  if (!g.path && Math.hypot(t.x - g.x, t.y - g.y) > 0.6) pathTo(w, g, t.x, t.y);
  if (g.path && followPath(g, K.GUARD_INVESTIGATE, dt)) g.path = null;
  if (!g.path) g.dir += 1.2 * dt;
}
