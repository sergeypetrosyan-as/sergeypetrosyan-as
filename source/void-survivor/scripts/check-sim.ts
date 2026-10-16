// Headless checks for the VOID SURVIVOR simulation. Run: node --experimental-strip-types scripts/check-sim.ts
import { makeRng, rand } from '../src/rng.ts';
import { UPGRADES, newLevels, type UpgradeId } from '../src/upgrades/data.ts';
import {
  MAX_WEAPON_TYPES, WEAPON_IDS, absorbCost, detonationDamage, detonationRadius, fieldDrain, fieldRadius, hasSynergy, isAvailable,
  reserveCap, rollChoices, siphonGain, type ChoiceContext,
} from '../src/upgrades/rules.ts';
import { DT, applyUpgrade, chooseCard, createWorld, damageEnemy, defaultMeta, emptyInput, step } from '../src/sim/world.ts';
import { spawnEnemy } from '../src/sim/enemies.ts';
import { ENEMY_CAP, BOSS_CAP, waveOf } from '../src/sim/entities.ts';
import { BOSS_TIMES, UNLOCK_WAVE, budgetRate, spawnWeights, updateSpawner, waveTable } from '../src/sim/waves.ts';
import { botInput } from '../src/sim/bot.ts';
import { parseSave, defaultSave } from '../src/storage/save.ts';
import { buildMeta, buy, VAULT } from '../src/meta/unlocks.ts';
import type { World } from '../src/sim/types.ts';

let passed = 0;
function check(name: string, ok: boolean, detail = ''): void {
  if (!ok) {
    console.error(`FAIL ${name} ${detail}`);
    process.exit(1);
  }
  passed++;
  console.log(`ok   ${name}${detail ? ' (' + detail + ')' : ''}`);
}

function worldWith(levels: Partial<Record<UpgradeId, number>>, seed = 1): World {
  const w = createWorld(seed, { ...defaultMeta(), unlocked: UPGRADES.map((u) => u.id) });
  for (const k of Object.keys(levels) as UpgradeId[]) w.levels[k] = levels[k] ?? 0;
  w.packWave = 99; // no pack
  w.budget = -1e9; // no spawns
  w.bossesSpawned = 99;
  return w;
}

// ---- 1. Upgrade interaction chain -------------------------------------------------------------
{
  const lv = newLevels();
  check('siphon off => no gain', siphonGain(lv, 3, 0) === 0);
  lv.siphon = 1;
  check('siphon L1 gain x1', siphonGain(lv, 3, 0) === 3);
  lv.siphon = 2;
  check('siphon L2 gain x1.5', siphonGain(lv, 2, 0) === 3);
  lv.siphon = 3;
  check('siphon L3 gain x2 + chain bonus', Math.abs(siphonGain(lv, 2, 10) - 2 * 2 * 1.1) < 1e-9);
  check('reserve cap by level', reserveCap({ ...lv, siphon: 1 }) === 60 && reserveCap({ ...lv, siphon: 2 }) === 100 && reserveCap(lv) === 150);
  check('field radius grows with reserve and caps', fieldRadius(10, 1) < fieldRadius(80, 1) && fieldRadius(1e6, 3) === 150);
  check('field drain grows with radius', fieldDrain(150) > fieldDrain(50));
  check('absorb cost', absorbCost(10) === 6);
  let mono = true;
  for (let s = 8; s < 400; s += 7) if (!(detonationDamage(s + 7, 1, 1) > detonationDamage(s, 1, 1))) mono = false;
  check('detonation damage monotonic in spent', mono);
  check('detonation level scales damage', detonationDamage(50, 3, 1) > detonationDamage(50, 1, 1));
  check('detonation radius capped', detonationRadius(1e6) === 340);

  // Live world: kills fill the reserve (Siphon), Bulwark shield raises, Detonation damage scales with spent Reserve.
  const w = worldWith({ siphon: 1, bulwark: 1, detonation: 1 });
  const e = spawnEnemy(w, 'swarm', 300, 0);
  damageEnemy(w, e, 999);
  check('kill adds Essence to Reserve', w.player.reserve > 0.99 && w.player.reserve < 1.2, `reserve=${w.player.reserve.toFixed(2)}`);
  w.player.reserve = 60;
  step(w, emptyInput());
  check('Bulwark raises at >=15% reserve', w.player.fieldOn && w.player.fieldR > 44);

  const releaseDamage = (reserve: number): number => {
    const x = worldWith({ siphon: 3, bulwark: 1, detonation: 1 });
    const target = spawnEnemy(x, 'cleaver', 60, 0);
    target.hp = target.maxHp = 1e7;
    x.player.reserve = reserve;
    const before = x.damageDealt;
    const inp = emptyInput();
    inp.release = true;
    step(x, inp);
    return x.damageDealt - before;
  };
  const d40 = releaseDamage(40);
  const d90 = releaseDamage(90);
  check('manual release: more Reserve spent => more damage', d90 > d40 && d40 > 0, `40->${d40.toFixed(1)} 90->${d90.toFixed(1)}`);
  const expected = detonationDamage(90, 1, 1);
  check('release damage matches formula (within 1 field tick)', d90 >= expected && d90 < expected + 40, `${d90.toFixed(1)} vs ${expected.toFixed(1)}`);

  // Field break triggers exactly one detonation
  const b = worldWith({ siphon: 3, bulwark: 1, detonation: 1 });
  const t = spawnEnemy(b, 'cleaver', 80, 0);
  t.hp = t.maxHp = 1e7;
  b.player.fieldOn = true;
  b.player.reserve = 0.001;
  b.player.fieldSpent = 40;
  step(b, emptyInput());
  check('field break fires one detonation using spent Reserve', b.detonations === 1 && b.damageDealt >= detonationDamage(40, 1, 1) - 0.5, `dmg=${b.damageDealt.toFixed(1)}`);
  step(b, emptyInput());
  check('break does not detonate twice', b.detonations === 1);

  // Without Detonation the field breaks silently
  const c = worldWith({ siphon: 3, bulwark: 1 });
  c.player.fieldOn = true;
  c.player.reserve = 0.001;
  c.player.fieldSpent = 40;
  step(c, emptyInput());
  check('no Detonation => no burst', c.detonations === 0 && !c.player.fieldOn);

  // Void Reactor refund
  const r = worldWith({ siphon: 3, bulwark: 1, detonation: 1 });
  const rt = spawnEnemy(r, 'cleaver', 60, 0);
  rt.hp = rt.maxHp = 1e7;
  r.player.reserve = 80;
  const ri = emptyInput();
  ri.release = true;
  step(r, ri);
  check('Void Reactor refunds 25% of spent', Math.abs(r.player.reserve - 20) < 0.5, `reserve=${r.player.reserve.toFixed(2)}`);

  // Bulwark absorbs enemy bullets and charges Reserve cost
  const a = worldWith({ siphon: 3, bulwark: 1 });
  a.player.reserve = 60;
  step(a, emptyInput());
  const before = a.player.reserve;
  const sp = spawnEnemy(a, 'spitter', 900, 900);
  sp.hp = 1e6;
  const bl = a.bullets.acquire();
  Object.assign(bl, { alive: true, friendly: false, x: 40, y: 0, vx: -100, vy: 0, r: 5, dmg: 10, life: 3, kind: 0, pierce: 0, homing: false, turn: 0 });
  bl.hits.length = 0;
  step(a, emptyInput());
  check('Field absorbs a bullet (no HP loss, Reserve spent)', a.player.hp === a.player.maxHp && a.player.reserve < before - 5);

  // synergies
  const sl = newLevels();
  check('synergy detection', !hasSynergy(sl, 'leechArc') && hasSynergy({ ...sl, siphon: 1, chain: 1 }, 'leechArc') && hasSynergy({ ...sl, homing: 1, pierce: 1 }, 'seekerLance') && hasSynergy({ ...sl, bulwark: 1, orbit: 2 }, 'bladedField'));
}

// ---- 2. Choice generation ---------------------------------------------------------------------
{
  const rng = makeRng(777);
  const all = UPGRADES.map((u) => u.id);
  let violations = '';
  let minCandidates = 99;
  for (let i = 0; i < 2000 && !violations; i++) {
    const lv = newLevels();
    for (const u of UPGRADES) {
      if (u.kind === 'filler') continue;
      if (rand(rng) < 0.5) lv[u.id] = Math.max(u.id === 'pulse' ? 1 : 0, Math.floor(rand(rng) * (u.maxLevel + 1)));
    }
    // respect dependency invariants of a real run most of the time
    if (rand(rng) < 0.8) {
      if (lv.bulwark > 0 && lv.siphon === 0) lv.siphon = 1;
      if (lv.detonation > 0 && lv.bulwark === 0) lv.bulwark = 1;
      if (lv.detonation > 0 && lv.siphon === 0) lv.siphon = 1;
    }
    const unlocked = new Set<string>(all.filter(() => rand(rng) < 0.85 || false));
    unlocked.add('pulse');
    const ctx: ChoiceContext = {
      levels: lv, hpFrac: rand(rng), luck: rand(rng) * 1.5, unlocked, levelUps: Math.floor(rand(rng) * 8), sinceDefensive: Math.floor(rand(rng) * 8),
      chest: rand(rng) < 0.3, exclude: rand(rng) < 0.5 ? all.filter(() => rand(rng) < 0.2) : [],
    };
    const ids = rollChoices(ctx, rng);
    if (ids.length !== 3) violations = `len ${ids.length}`;
    else if (new Set(ids).size !== 3) violations = `dupes ${ids.join()}`;
    else {
      for (const id of ids) {
        const def = UPGRADES.find((u) => u.id === id);
        if (!def || !isAvailable(def, ctx)) violations = `invalid ${id}`;
        if (id === 'bulwark' && lv.siphon === 0) violations = 'bulwark without siphon';
        if (id === 'detonation' && lv.bulwark === 0) violations = 'detonation without bulwark';
      }
      if (ctx.hpFrac < 0.5) {
        const hasDef = ids.some((id) => UPGRADES.find((u) => u.id === id)?.defensive);
        const defAvail = UPGRADES.some((u) => u.defensive && isAvailable(u, ctx) && !ctx.exclude.includes(u.id));
        if (defAvail && !hasDef) violations = 'no defensive option when hurt';
      }
      const owned = WEAPON_IDS.filter((x) => lv[x] > 0).length;
      if (owned >= MAX_WEAPON_TYPES) for (const id of ids) if (WEAPON_IDS.includes(id) && lv[id] === 0) violations = 'weapon slot overflow';
    }
    minCandidates = Math.min(minCandidates, ids.length);
  }
  check('rollChoices: 2000 random states always give 3 valid distinct cards', violations === '', violations);
  // everything maxed => fillers
  const maxed = newLevels();
  for (const u of UPGRADES) if (u.kind !== 'filler') maxed[u.id] = u.maxLevel;
  const ids = rollChoices({ levels: maxed, hpFrac: 1, luck: 0, unlocked: new Set(all), levelUps: 30, sinceDefensive: 0, chest: false, exclude: [] }, rng);
  check('fully maxed build still gets 3 filler cards', ids.length === 3 && new Set(ids).size === 3);
  // pity: first level-ups offer an extra weapon
  let missing = 0;
  for (let i = 0; i < 300; i++) {
    const got = rollChoices({ levels: newLevels(), hpFrac: 1, luck: 0, unlocked: new Set(all), levelUps: 0, sinceDefensive: 0, chest: false, exclude: [] }, rng);
    if (!got.some((id) => ['orbit', 'homing', 'pierce', 'chain'].includes(id))) missing++;
  }
  check('early pity: extra weapon always offered at first level-up', missing === 0, `missing=${missing}`);
  // chain completion: with siphon only, bulwark appears often
  let seen = 0;
  const lvS = newLevels();
  lvS.siphon = 1;
  for (let i = 0; i < 300; i++) {
    const got = rollChoices({ levels: lvS, hpFrac: 1, luck: 0, unlocked: new Set(all), levelUps: 5, sinceDefensive: 0, chest: false, exclude: [] }, rng);
    if (got.includes('bulwark')) seen++;
  }
  check('Bulwark is boosted once Siphon is owned', seen > 90, `seen ${seen}/300`);
}

// ---- 3. Determinism ---------------------------------------------------------------------------
function runBot(seed: number, ticks: number, god = false): World {
  const w = createWorld(seed);
  const inp = emptyInput();
  for (let i = 0; i < ticks; i++) {
    if (w.state === 'levelup') chooseCard(w, 0);
    if (w.state !== 'playing') {
      if (w.state === 'levelup') continue;
      break;
    }
    botInput(w, inp);
    step(w, inp);
    if (god) w.player.hp = w.player.maxHp;
    w.events.length = 0;
  }
  return w;
}
function fingerprint(w: World): string {
  return JSON.stringify({
    t: w.tick, k: w.kills, d: Math.round(w.damageDealt * 1000), p: [w.player.x, w.player.y, w.player.hp, w.player.xp, w.player.level, w.player.reserve],
    rng: w.rng.s, picks: w.picks, e: w.enemies.list.map((e) => [e.id, e.kind, e.x, e.y, e.hp]), nb: w.bullets.count, st: w.state,
  });
}
{
  const a = fingerprint(runBot(424242, 3600));
  const b = fingerprint(runBot(424242, 3600));
  const c = fingerprint(runBot(424243, 3600));
  check('same seed => identical run after 3600 ticks', a === b, `len ${a.length}`);
  check('different seed => different run', a !== c);
}

// ---- 4. Wave schedule fairness ----------------------------------------------------------------
{
  const rows = waveTable();
  let ok = true;
  let msg = '';
  for (let i = 1; i < rows.length; i++) {
    const g = rows[i].budget / rows[i - 1].budget;
    if (rows[i].budget < rows[i - 1].budget) ok = false;
    if (g > 1.35) {
      ok = false;
      msg = `growth ${g.toFixed(2)} at wave ${rows[i].wave}`;
    }
  }
  check('budget monotonic with <=35% growth per wave', ok, msg);
  check('wave 1 budget <= 3/s', rows[0].budget <= 3, String(rows[0].budget));
  check('wave function', waveOf(0) === 1 && waveOf(59.9) === 1 && waveOf(60) === 2 && waveOf(1199) === 20 && waveOf(5000) === 20);
  const kinds = ['swarm', 'spitter', 'rammer', 'cleaver', 'aegis', 'caster'];
  let weightsOk = true;
  for (const r of rows) {
    kinds.forEach((k, i) => {
      if (r.wave < UNLOCK_WAVE[k] && r.weights[i] !== 0) weightsOk = false;
      if (r.wave === UNLOCK_WAVE[k] && r.weights[i] <= 0) weightsOk = false;
    });
  }
  check('enemy types appear exactly at their unlock wave', weightsOk);
  check('weights drift smoothly (wave 9-13)', spawnWeights(11).every((v, i) => v >= Math.min(spawnWeights(8)[i], spawnWeights(14)[i]) - 1e-9));
  check('boss schedule 5/10/15 min + final', BOSS_TIMES.join() === '300,600,900,1140');
  check('budget formula endpoints', Math.abs(budgetRate(1) - 2.4) < 1e-9 && Math.abs(budgetRate(20) - 17.6) < 1e-9);

  // Worst case: nothing ever dies for 1200 s. Spawner must respect the cap.
  const w = createWorld(99);
  let peak = 0;
  let violation = '';
  for (let i = 0; i < 1200 * 60; i++) {
    w.time += DT;
    const before = w.enemies.list.filter((e) => e.kind !== 'warden').length;
    updateSpawner(w, DT);
    const regular = w.enemies.list.filter((e) => e.kind !== 'warden').length;
    const cap = w.bossAlive ? BOSS_CAP : ENEMY_CAP;
    if (regular > Math.max(before, cap)) violation = `tick ${i}: regular=${regular} cap=${cap}`;
    if (regular > ENEMY_CAP) violation = `regular ${regular} > ${ENEMY_CAP}`;
    peak = Math.max(peak, regular);
    if (violation) break;
  }
  check('spawn budget never exceeds the live cap (worst case, nothing dies)', violation === '', `${violation} peak=${peak}`);
  check('cap actually reached late (budget is meaningful)', peak === ENEMY_CAP, `peak=${peak}`);
}

// ---- 5. Run smoke -----------------------------------------------------------------------------
{
  const t0 = Date.now();
  const w = runBot(2024, 1200 * 60, true);
  let bad = '';
  for (const e of w.enemies.list) if (!Number.isFinite(e.x) || !Number.isFinite(e.y) || !Number.isFinite(e.hp)) bad = 'NaN enemy';
  if (!Number.isFinite(w.player.x) || !Number.isFinite(w.player.hp)) bad = 'NaN player';
  check('god-mode bot run reaches the end without NaN', bad === '' && (w.state === 'won' || w.state === 'playing' || w.state === 'levelup'), `state=${w.state} time=${w.time.toFixed(0)}s kills=${w.kills} lvl=${w.player.level} bosses=${w.bossesKilled} in ${Date.now() - t0}ms`);
  check('pools stay within caps', w.enemies.count <= ENEMY_CAP + 6 && w.bullets.count <= 320 && w.pickups.count <= 400, `e=${w.enemies.count} b=${w.bullets.count} p=${w.pickups.count}`);
  check('boss fights happened (>=1 boss spawned)', w.bossesSpawned >= 1);
  const w2 = runBot(7, 60 * 400);
  check('normal bot run ends sanely', ['dead', 'playing', 'levelup', 'won'].includes(w2.state), `state=${w2.state} t=${w2.time.toFixed(0)} kills=${w2.kills}`);
  // chest / levelup flow
  const lw = createWorld(5);
  lw.pendingLevels = 1;
  step(lw, emptyInput());
  check('level-up opens a 3-card choice', lw.state === 'levelup' && lw.choice?.ids.length === 3);
  const first = lw.choice?.ids[0] as UpgradeId;
  chooseCard(lw, 0);
  check('choosing a card applies it and resumes', lw.state === 'playing' && lw.levels[first] >= 1 && lw.picks[0] === first);
  const ww = createWorld(6);
  applyUpgrade(ww, 'vitality');
  check('vitality raises max HP and heals', ww.player.maxHp === 120 && ww.player.hp === 120);
}

// ---- 6. Save fallback and meta ----------------------------------------------------------------
{
  const d = defaultSave();
  check('parseSave(null) => defaults', JSON.stringify(parseSave(null)) === JSON.stringify(d));
  check('parseSave(garbage) => defaults', JSON.stringify(parseSave('{{{ not json')) === JSON.stringify(d));
  check('parseSave(wrong version) => defaults', JSON.stringify(parseSave('{"v":9,"shards":5}')) === JSON.stringify(d));
  const partial = parseSave('{"v":1,"shards":"x","owned":{"w_homing":1,"bad":-3},"settings":{"volume":7,"aim":"zzz"},"best":{"time":99}}');
  check('parseSave repairs field by field', partial.shards === 0 && partial.owned.w_homing === 1 && partial.owned.bad === undefined && partial.settings.volume === 1 && partial.settings.aim === 'auto' && partial.best.time === 99);
  const bought = buy({}, 100, 'w_homing');
  check('vault purchase deducts shards and unlocks weapon', !!bought && bought.shards === 60 && buildMeta(bought.owned, 'hollow').unlocked.includes('homing'));
  check('vault refuses unaffordable purchase', buy({}, 10, 'w_chain') === null);
  check('locked weapons are not in the default pool', !buildMeta({}, 'hollow').unlocked.includes('chain') && VAULT.length >= 8);
  check('foundry arena gated', buildMeta({}, 'foundry').arena === 'hollow' && buildMeta({ a_foundry: 1 }, 'foundry').arena === 'foundry');
}

console.log(`\nAll ${passed} checks passed.`);
