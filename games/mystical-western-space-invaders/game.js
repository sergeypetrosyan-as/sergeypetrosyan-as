(() => {
  "use strict";

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const wrap = document.getElementById("canvasWrap");
  const overlay = document.getElementById("overlay");
  const startButton = document.getElementById("startButton");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayText = document.getElementById("overlayText");
  const overlayEyebrow = document.getElementById("overlayEyebrow");
  const scoreNode = document.getElementById("score");
  const waveNode = document.getElementById("wave");
  const livesNode = document.getElementById("lives");
  const bestNode = document.getElementById("best");
  const leaderboardNode = document.getElementById("leaderboard");
  const soundToggle = document.getElementById("soundToggle");
  const clearScoresButton = document.getElementById("clearScores");

  // 19_mystical-western roles: player = bone (moonlight), hostile = brand red, world = wine/umber/mesa.
  const COLORS = {
    player: "#F1EDE7", hostile: "#E30016", hostileDeep: "#AB0B1A", hostileLight: "#E96B74",
    wine: "#72151D", ink: "#030303", night: "#150607", dusk: "#320B0E", mesa: "#480E13",
    umber: "#2D0A0D", tan: "#D3B9B7", ash: "#A5A29E", blush: "#EEB9B9", quiet: "#4F3132"
  };
  const reducedMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  let skyLayer = null, groundLayer = null;
  const STORAGE_KEY = "mysticalWesternArcadeScoresV1";
  const BEST_KEY = "mysticalWesternArcadeBestV1";
  const keys = new Set();
  let width = 800, height = 500, dpr = 1;
  let running = false, gameOver = false, animationId = 0, lastTime = 0;
  let score = 0, wave = 1, lives = 3, best = readBest();
  let player, enemies = [], bullets = [], enemyBullets = [], particles = [], stars = [];
  let enemyDirection = 1, enemyStepTimer = 0, fireCooldown = 0, enemyFireTimer = 0;
  let leftTouch = false, rightTouch = false, fireTouch = false;
  let audioContext = null, soundOn = false, savedThisRun = false;

  function readBest() {
    try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; }
  }
  function readScores() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(data) ? data.filter(x => x && Number.isFinite(x.score)).slice(0, 5) : [];
    } catch { return []; }
  }
  function writeScores(scores) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(scores.slice(0, 5))); } catch { /* Storage may be unavailable in private browsing. */ }
  }
  function formatScore(value) { return String(Math.max(0, Math.floor(value))).padStart(6, "0"); }

  function renderLeaderboard() {
    const scores = readScores();
    leaderboardNode.replaceChildren();
    if (!scores.length) {
      const li = document.createElement("li");
      li.className = "empty-score";
      li.textContent = "No runs yet. Make history.";
      leaderboardNode.append(li);
      return;
    }
    scores.forEach((item, index) => {
      const li = document.createElement("li");
      const rank = document.createElement("span");
      rank.className = "rank";
      rank.textContent = `0${index + 1}`;
      const name = document.createElement("span");
      name.className = "player-name";
      name.textContent = item.name || "PILOT";
      const points = document.createElement("span");
      points.className = "player-score";
      points.textContent = formatScore(item.score);
      li.append(rank, name, points);
      leaderboardNode.append(li);
    });
  }

  function setOverlay(title, text, buttonLabel, eyebrow = "INCOMING TRANSMISSION") {
    overlayTitle.textContent = title;
    overlayText.textContent = text;
    startButton.innerHTML = `${buttonLabel} <span>↗</span>`;
    overlayEyebrow.textContent = eyebrow;
    overlay.classList.remove("hidden");
  }
  function updateHud() {
    scoreNode.textContent = formatScore(score);
    waveNode.textContent = String(wave).padStart(2, "0");
    livesNode.textContent = lives > 0 ? Array.from({ length: lives }, () => "♥").join(" ") : "—";
    bestNode.textContent = formatScore(best);
  }

  function resizeCanvas() {
    const rect = wrap.getBoundingClientRect();
    width = Math.max(280, rect.width);
    height = Math.max(340, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeStars();
    buildScenery();
    if (player) player.y = height - 50;
    draw();
  }
  function makeStars() {
    const count = Math.floor((width * height) / 5200);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      r: Math.random() * 1.3 + .25, a: Math.random() * .65 + .15,
      speed: Math.random() * 10 + 4, phase: Math.random() * Math.PI * 2
    }));
  }
  function resetGame() {
    score = 0; wave = 1; lives = 3; savedThisRun = false;
    player = { x: width / 2, y: height - 50, w: 28, h: 25, speed: 300, invulnerable: 0 };
    bullets = []; enemyBullets = []; particles = [];
    enemyDirection = 1; enemyStepTimer = 0; fireCooldown = 0; enemyFireTimer = .65;
    spawnWave(); updateHud();
  }
  function spawnWave() {
    enemies = [];
    const cols = Math.min(9, Math.max(5, Math.floor(width / 58)));
    const rows = Math.min(4, 2 + Math.floor(wave / 2));
    const cellW = Math.min(47, (width - 40) / cols);
    const startX = (width - cellW * cols) / 2 + cellW / 2;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        enemies.push({
          x: startX + col * cellW, y: 55 + row * 34, w: 23, h: 18,
          row, col, alive: true, phase: Math.random() * Math.PI * 2
        });
      }
    }
  }
  function startGame() {
    ensureAudio();
    resetGame();
    gameOver = false; running = true;
    overlay.classList.add("hidden");
    lastTime = performance.now();
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(loop);
  }
  function finishGame(won = false) {
    running = false; gameOver = true;
    if (!savedThisRun && score > 0) saveRun();
    setOverlay(won ? "WAVE CLEARED!" : "SIGNAL LOST", won ? `Wave ${wave} cleared. The fleet is retreating — ready for another run?` : `Final score: ${formatScore(score)}. The grid needs you, pilot.`, "PLAY AGAIN", won ? "MISSION COMPLETE" : "MISSION FAILED");
    sound(won ? 660 : 130, .16, "triangle", .035);
    updateHud();
  }
  function saveRun() {
    savedThisRun = true;
    const scores = readScores();
    scores.push({ name: "PILOT", score, date: new Date().toISOString() });
    scores.sort((a, b) => b.score - a.score);
    writeScores(scores.slice(0, 5));
    if (score > best) {
      best = score;
      try { localStorage.setItem(BEST_KEY, String(best)); } catch { /* Ignore unavailable storage. */ }
    }
    renderLeaderboard(); updateHud();
  }

  function ensureAudio() {
    if (!soundOn) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx && !audioContext) audioContext = new AudioCtx();
    if (audioContext?.state === "suspended") audioContext.resume().catch(() => {});
  }
  function sound(frequency = 440, duration = .07, type = "sine", volume = .025) {
    if (!soundOn) return;
    ensureAudio();
    if (!audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = type; osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gain.gain.setValueAtTime(volume, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
      osc.connect(gain); gain.connect(audioContext.destination);
      osc.start(); osc.stop(audioContext.currentTime + duration);
    } catch { /* Audio is optional. */ }
  }
  function toggleSound() {
    soundOn = !soundOn;
    soundToggle.setAttribute("aria-pressed", String(soundOn));
    soundToggle.innerHTML = soundOn ? "♫ <span>Sound on</span>" : "♫ <span>Sound off</span>";
    if (soundOn) { ensureAudio(); sound(520, .08, "sine", .03); }
  }

  function addBurst(x, y, color, amount = 14, force = 1) {
    for (let i = 0; i < amount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (35 + Math.random() * 150) * force;
      particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: .3 + Math.random() * .5, maxLife: .8, size: 1 + Math.random() * 2.6, color
      });
    }
  }
  function firePlayer() {
    if (fireCooldown > 0 || !player || !running) return;
    bullets.push({ x: player.x, y: player.y - 17, vy: -450, r: 2.5 });
    fireCooldown = .22;
    sound(560 + Math.random() * 110, .045, "square", .014);
    for (let i = 0; i < 3; i++) particles.push({ x: player.x + (Math.random() - .5) * 8, y: player.y - 14, vx: (Math.random() - .5) * 25, vy: -Math.random() * 50, life: .13, maxLife: .13, size: 1.5, color: COLORS.player });
  }
  function hitPlayer() {
    if (player.invulnerable > 0) return;
    lives--; player.invulnerable = 1.35;
    addBurst(player.x, player.y, COLORS.player, 24, 1.2);
    sound(110, .25, "sawtooth", .045);
    updateHud();
    if (lives <= 0) finishGame(false);
  }

  function update(dt) {
    for (const star of stars) {
      if (!reducedMotion.matches) { star.y += star.speed * dt; star.phase += dt * 2; }
      if (star.y > height) { star.y = 0; star.x = Math.random() * width; }
    }
    if (!running) {
      updateParticles(dt);
      return;
    }
    const moveLeft = keys.has("ArrowLeft") || keys.has("a") || keys.has("A") || leftTouch;
    const moveRight = keys.has("ArrowRight") || keys.has("d") || keys.has("D") || rightTouch;
    const firing = keys.has(" ") || fireTouch;
    if (moveLeft) player.x -= player.speed * dt;
    if (moveRight) player.x += player.speed * dt;
    player.x = Math.max(19, Math.min(width - 19, player.x));
    if (player.invulnerable > 0) player.invulnerable -= dt;
    fireCooldown -= dt; enemyFireTimer -= dt;
    if (firing) firePlayer();

    const alive = enemies.filter(e => e.alive);
    const difficulty = Math.min(1.8, .65 + wave * .08);
    enemyStepTimer += dt;
    const stepInterval = Math.max(.14, .48 - wave * .018) / difficulty;
    if (enemyStepTimer >= stepInterval) {
      enemyStepTimer = 0;
      let shouldDrop = false;
      for (const enemy of alive) {
        enemy.x += enemyDirection * (9 + wave * 1.15);
        if (enemy.x > width - 19 || enemy.x < 19) shouldDrop = true;
      }
      if (shouldDrop) {
        enemyDirection *= -1;
        for (const enemy of alive) enemy.y += 12;
      }
      for (const enemy of alive) {
        if (enemy.y + enemy.h / 2 >= player.y - 15) { finishGame(false); return; }
      }
    }
    if (enemyFireTimer <= 0 && alive.length) {
      const shooter = alive[Math.floor(Math.random() * alive.length)];
      enemyBullets.push({ x: shooter.x, y: shooter.y + 12, vy: 130 + wave * 13, r: 3 });
      enemyFireTimer = Math.max(.24, .95 - wave * .055) + Math.random() * .35;
    }

    for (const bullet of bullets) bullet.y += bullet.vy * dt;
    bullets = bullets.filter(b => b.y > -10);
    for (const bullet of enemyBullets) bullet.y += bullet.vy * dt;
    enemyBullets = enemyBullets.filter(b => b.y < height + 10);

    for (const bullet of bullets) {
      for (const enemy of enemies) {
        if (!enemy.alive) continue;
        if (Math.abs(bullet.x - enemy.x) < enemy.w * .56 && Math.abs(bullet.y - enemy.y) < enemy.h * .65) {
          enemy.alive = false; bullet.y = -100;
          const points = (4 - enemy.row) * 10 + wave * 2;
          score += Math.max(10, points);
          addBurst(enemy.x, enemy.y, enemy.row === 0 ? COLORS.hostile : COLORS.hostileDeep, 12, .8);
          sound(220 + enemy.row * 100, .08, "triangle", .02);
          updateHud(); break;
        }
      }
    }
    for (const bullet of enemyBullets) {
      if (Math.abs(bullet.x - player.x) < 17 && Math.abs(bullet.y - player.y) < 17) {
        bullet.y = height + 100; hitPlayer();
      }
    }
    enemyBullets = enemyBullets.filter(b => b.y < height + 20);
    if (enemies.every(e => !e.alive)) {
      wave++; score += 100 * wave;
      addBurst(width / 2, height / 2, COLORS.hostileLight, 36, 1.6);
      spawnWave(); updateHud(); sound(780, .2, "triangle", .035);
    }
    updateParticles(dt);
  }
  function updateParticles(dt) {
    for (const p of particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= .985; p.vy *= .985; p.life -= dt; }
    particles = particles.filter(p => p.life > 0);
  }

  /* ---- scenery: night sky, carved moon, quiet constellation, low mesa horizon ---- */
  function seeded(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeLayer() {
    const c = document.createElement("canvas");
    c.width = Math.round(width * dpr); c.height = Math.round(height * dpr);
    const g = c.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { c, g };
  }
  function starGlyph(g, x, y, r, color, alpha) {
    g.globalAlpha = alpha; g.fillStyle = color; g.beginPath();
    g.moveTo(x, y - r); g.quadraticCurveTo(x, y, x + r, y); g.quadraticCurveTo(x, y, x, y + r);
    g.quadraticCurveTo(x, y, x - r, y); g.quadraticCurveTo(x, y, x, y - r); g.fill(); g.globalAlpha = 1;
  }
  function buildScenery() {
    const r = seeded(19);
    // sky gradient + carved crescent moon
    const sky = makeLayer(), g = sky.g;
    const grad = g.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, COLORS.ink); grad.addColorStop(.4, COLORS.night); grad.addColorStop(1, COLORS.dusk);
    g.fillStyle = grad; g.fillRect(0, 0, width, height);
    // The moon sits in the top-right corner, above where the fleet forms on narrow screens.
    const narrow = width < 600;
    const mx = width * (narrow ? .88 : .86), my = narrow ? 26 : Math.min(70, height * .15), mr = narrow ? 14 : Math.max(16, Math.min(28, width * .032));
    const halo = g.createRadialGradient(mx, my, mr * .8, mx, my, mr * 2.6);
    halo.addColorStop(0, "rgba(241, 237, 231, .10)"); halo.addColorStop(1, "rgba(241, 237, 231, 0)");
    g.fillStyle = halo; g.beginPath(); g.arc(mx, my, mr * 2.6, 0, Math.PI * 2); g.fill();
    g.save(); g.globalAlpha = .5; // the moon stays behind the fleet
    g.fillStyle = COLORS.tan; g.beginPath(); g.arc(mx, my, mr, 0, Math.PI * 2); g.fill();
    g.save(); g.beginPath(); g.arc(mx, my, mr, 0, Math.PI * 2); g.clip();
    g.strokeStyle = COLORS.wine; g.lineWidth = 1; g.globalAlpha = .3;
    for (let d = -mr * 2; d < mr * 2.5; d += 3.2) { g.beginPath(); g.moveTo(mx - mr * 1.5, my + d); g.lineTo(mx + mr * 1.5, my + d - mr * .8); g.stroke(); }
    g.globalAlpha = .9; g.fillStyle = COLORS.night; // crescent terminator
    g.beginPath(); g.arc(mx - mr * .45, my - mr * .1, mr * 1.02, 0, Math.PI * 2); g.fill();
    g.restore();
    g.strokeStyle = COLORS.hostileDeep; g.lineWidth = 1.2;
    g.beginPath(); g.arc(mx, my, mr, 0, Math.PI * 2); g.stroke();
    g.restore();
    // a quiet constellation, upper left
    const pts = [[.07, .2], [.14, .12], [.21, .19], [.28, .14], [.33, .24]].map(([x, y]) => [x * width, y * height]);
    g.save(); g.strokeStyle = COLORS.quiet; g.lineWidth = 1; g.setLineDash([2, 5]);
    g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); g.setLineDash([]);
    for (const [x, y] of pts) { g.beginPath(); g.arc(x, y, 4.5, 0, Math.PI * 2); g.stroke(); starGlyph(g, x, y, 3, COLORS.ash, .45); }
    g.restore();
    // dust grain
    g.save();
    for (let i = 0, n = Math.round(width * height / 900); i < n; i++) {
      g.globalAlpha = .05 + r() * .06; g.fillStyle = r() < .5 ? COLORS.tan : COLORS.hostileDeep;
      g.fillRect(r() * width, r() * height, 1, 1);
    }
    g.restore();
    skyLayer = sky.c;

    // low mesa horizon + sparse cacti: in front of the drifting stars, behind the ship
    const ground = makeLayer(), h = ground.g;
    const baseY = height, mh = Math.min(62, height * .13);
    const top = [[0, baseY - mh * .35]];
    const plateaus = 3, step = width / plateaus;
    for (let i = 0; i < plateaus; i++) {
      const sx = i * step + step * (.12 + r() * .12), ex = (i + 1) * step - step * (.12 + r() * .12);
      const t = baseY - mh * (.6 + r() * .4), sh = step * (.05 + r() * .05);
      top.push([sx, baseY - mh * (.2 + r() * .15)], [sx + sh, t], [ex - sh, t + (r() - .5) * 3], [ex, baseY - mh * (.2 + r() * .15)]);
    }
    top.push([width, baseY - mh * .3]);
    const path = () => { h.beginPath(); h.moveTo(0, baseY + 2); top.forEach(([x, y]) => h.lineTo(x, y)); h.lineTo(width, baseY + 2); h.closePath(); };
    const mg = h.createLinearGradient(0, baseY - mh, 0, baseY);
    mg.addColorStop(0, COLORS.mesa); mg.addColorStop(1, COLORS.umber);
    path(); h.fillStyle = mg; h.fill();
    h.save(); path(); h.clip(); h.strokeStyle = COLORS.hostileDeep; h.globalAlpha = .3; h.lineWidth = 1;
    for (let y = baseY - mh; y < baseY; y += Math.max(4, mh / 8)) { h.beginPath(); h.moveTo(0, y); h.lineTo(width, y); h.stroke(); }
    h.restore();
    h.strokeStyle = "rgba(211, 185, 183, .2)"; h.lineWidth = 1;
    h.beginPath(); top.forEach(([x, y], i) => (i ? h.lineTo(x, y) : h.moveTo(x, y))); h.stroke();
    const cactus = (x, ch) => {
      const w = Math.max(3, ch * .16), y0 = baseY - 2;
      h.fillStyle = COLORS.ink;
      h.beginPath(); h.moveTo(x - w / 2, y0); h.lineTo(x - w / 2, y0 - ch + w / 2); h.arc(x, y0 - ch + w / 2, w / 2, Math.PI, 0); h.lineTo(x + w / 2, y0); h.closePath(); h.fill();
      h.fillRect(x - w * 1.5, y0 - ch * .55, w * 1.5, w * .7); h.fillRect(x - w * 1.9, y0 - ch * .8, w * .8, ch * .28);
      h.fillRect(x, y0 - ch * .38, w * 1.4, w * .7); h.fillRect(x + w, y0 - ch * .58, w * .8, ch * .24);
    };
    cactus(width * .06, Math.min(40, mh * .8)); cactus(width * .94, Math.min(30, mh * .6));
    groundLayer = ground.c;
  }

  function drawBackground() {
    if (skyLayer) ctx.drawImage(skyLayer, 0, 0, width, height);
    else { ctx.fillStyle = COLORS.night; ctx.fillRect(0, 0, width, height); }
    const still = reducedMotion.matches;
    for (const star of stars) {
      const a = star.a * .55 * (still ? .8 : .7 + Math.sin(star.phase) * .3);
      if (star.r > 1.35) starGlyph(ctx, star.x, star.y, star.r * 1.8, COLORS.tan, a);
      else { ctx.globalAlpha = a; ctx.fillStyle = star.r > 1 ? COLORS.tan : COLORS.ash; ctx.fillRect(star.x, star.y, star.r, star.r); }
    }
    ctx.globalAlpha = 1;
    if (groundLayer) ctx.drawImage(groundLayer, 0, 0, width, height);
  }
  function drawPlayer() {
    if (!player || (player.invulnerable > 0 && Math.floor(player.invulnerable * 12) % 2 === 0)) return;
    ctx.save(); ctx.translate(player.x, player.y);
    // the cannon is moonlight: bone hull, warm halo, wine engraving
    ctx.shadowBlur = 10; ctx.shadowColor = "rgba(241, 237, 231, .45)";
    ctx.fillStyle = COLORS.player;
    ctx.beginPath(); ctx.moveTo(0, -17); ctx.lineTo(14, 10); ctx.lineTo(5, 7); ctx.lineTo(0, 11); ctx.lineTo(-5, 7); ctx.lineTo(-14, 10); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = COLORS.wine; ctx.lineWidth = 1; ctx.lineJoin = "round"; ctx.stroke();
    ctx.fillStyle = COLORS.wine;
    ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(5, 5); ctx.lineTo(-5, 5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = COLORS.hostileLight; ctx.fillRect(-3, 12, 6, 5);
    ctx.restore();
  }
  function drawEnemy(enemy) {
    if (!enemy.alive) return;
    // invaders are brand-red stamped shapes; the middle row is a deeper ember
    const color = enemy.row === 1 ? COLORS.hostileDeep : COLORS.hostile;
    const edge = enemy.row === 0 ? COLORS.blush : enemy.row === 1 ? COLORS.hostileLight : COLORS.wine;
    const x = enemy.x, y = enemy.y;
    ctx.save(); ctx.translate(x, y); ctx.shadowColor = "rgba(227, 0, 22, .35)"; ctx.shadowBlur = 6; ctx.fillStyle = color;
    ctx.fillRect(-9, -7, 18, 12); ctx.fillRect(-13, -3, 5, 7); ctx.fillRect(8, -3, 5, 7);
    ctx.fillRect(-7, 6, 4, 4); ctx.fillRect(4, 6, 4, 4);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = edge; ctx.globalAlpha = .75; ctx.lineWidth = 1; ctx.strokeRect(-8.5, -6.5, 17, 11); ctx.globalAlpha = 1;
    ctx.fillStyle = COLORS.ink;
    ctx.fillRect(-6, -3, 3, 3); ctx.fillRect(4, -3, 3, 3);
    ctx.restore();
  }
  function draw() {
    if (!ctx) return;
    drawBackground();
    for (const enemy of enemies) drawEnemy(enemy);
    if (player) drawPlayer();
    ctx.save();
    for (const bullet of bullets) {
      ctx.shadowColor = "rgba(241, 237, 231, .5)"; ctx.shadowBlur = 6; ctx.fillStyle = COLORS.player;
      ctx.fillRect(bullet.x - 1.5, bullet.y - 7, 3, 12);
    }
    for (const bullet of enemyBullets) {
      ctx.shadowColor = "rgba(227, 0, 22, .6)"; ctx.shadowBlur = 6; ctx.fillStyle = COLORS.hostile;
      ctx.beginPath(); ctx.moveTo(bullet.x, bullet.y - 5); ctx.lineTo(bullet.x + 3, bullet.y); ctx.lineTo(bullet.x, bullet.y + 5); ctx.lineTo(bullet.x - 3, bullet.y); ctx.closePath(); ctx.fill();
      ctx.shadowBlur = 0; ctx.strokeStyle = COLORS.blush; ctx.lineWidth = .8; ctx.stroke();
    }
    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife); ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 4;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.restore(); ctx.globalAlpha = 1;
  }
  function loop(now) {
    if (!running) return;
    const dt = Math.min(.033, Math.max(0, (now - lastTime) / 1000));
    lastTime = now;
    update(dt); draw();
    if (running) animationId = requestAnimationFrame(loop);
  }

  function setHold(button, setter) {
    const down = event => { event.preventDefault(); setter(true); button.classList.add("pressed"); };
    const up = event => { event.preventDefault(); setter(false); button.classList.remove("pressed"); };
    button.addEventListener("pointerdown", down);
    button.addEventListener("pointerup", up);
    button.addEventListener("pointercancel", up);
    button.addEventListener("pointerleave", up);
    button.addEventListener("contextmenu", event => event.preventDefault());
  }
  window.addEventListener("keydown", event => {
    const key = event.key;
    if (["ArrowLeft", "ArrowRight", " ", "ArrowUp", "ArrowDown"].includes(key)) event.preventDefault();
    keys.add(key);
    if (key === "Enter" && !running) startGame();
    if ((key === " " || key === "Spacebar") && !running && !gameOver) startGame();
  });
  window.addEventListener("keyup", event => keys.delete(event.key));
  window.addEventListener("blur", () => { keys.clear(); leftTouch = rightTouch = fireTouch = false; });
  startButton.addEventListener("click", startGame);
  soundToggle.addEventListener("click", toggleSound);
  clearScoresButton.addEventListener("click", () => {
    if (window.confirm("Clear the local leaderboard on this device?")) {
      writeScores([]);
      try { localStorage.removeItem(BEST_KEY); } catch { /* Ignore unavailable storage. */ }
      best = 0; renderLeaderboard(); updateHud();
    }
  });
  setHold(document.getElementById("leftButton"), value => { leftTouch = value; });
  setHold(document.getElementById("rightButton"), value => { rightTouch = value; });
  setHold(document.getElementById("fireButton"), value => { fireTouch = value; if (value && !running && !gameOver) startGame(); });

  window.addEventListener("resize", resizeCanvas);
  if ("ResizeObserver" in window) new ResizeObserver(resizeCanvas).observe(wrap);
  renderLeaderboard(); updateHud(); resizeCanvas();
})();
