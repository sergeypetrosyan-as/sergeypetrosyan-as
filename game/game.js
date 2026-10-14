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

  const COLORS = { cyan: "#28e8ff", blue: "#3985ff", purple: "#b34dff", pink: "#ff4bd8", green: "#5dffbf", white: "#f1f3ff" };
  const STORAGE_KEY = "neonArcadeScoresV1";
  const BEST_KEY = "neonArcadeBestV1";
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
    for (let i = 0; i < 3; i++) particles.push({ x: player.x + (Math.random() - .5) * 8, y: player.y - 14, vx: (Math.random() - .5) * 25, vy: -Math.random() * 50, life: .13, maxLife: .13, size: 1.5, color: COLORS.cyan });
  }
  function hitPlayer() {
    if (player.invulnerable > 0) return;
    lives--; player.invulnerable = 1.35;
    addBurst(player.x, player.y, COLORS.cyan, 24, 1.2);
    sound(110, .25, "sawtooth", .045);
    updateHud();
    if (lives <= 0) finishGame(false);
  }

  function update(dt) {
    for (const star of stars) {
      star.y += star.speed * dt;
      star.phase += dt * 2;
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
          addBurst(enemy.x, enemy.y, enemy.row === 0 ? COLORS.pink : COLORS.purple, 12, .8);
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
      addBurst(width / 2, height / 2, COLORS.cyan, 36, 1.6);
      spawnWave(); updateHud(); sound(780, .2, "triangle", .035);
    }
    updateParticles(dt);
  }
  function updateParticles(dt) {
    for (const p of particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= .985; p.vy *= .985; p.life -= dt; }
    particles = particles.filter(p => p.life > 0);
  }

  function drawBackground() {
    ctx.fillStyle = "#070a1b"; ctx.fillRect(0, 0, width, height);
    const glow = ctx.createRadialGradient(width * .5, height * .4, 5, width * .5, height * .4, height * .8);
    glow.addColorStop(0, "rgba(30,48,120,.16)"); glow.addColorStop(1, "rgba(5,7,20,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(67,91,180,.075)"; ctx.lineWidth = 1;
    const grid = 32;
    for (let x = 0; x < width; x += grid) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
    for (let y = 0; y < height; y += grid) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
    for (const star of stars) {
      ctx.globalAlpha = star.a * (.65 + Math.sin(star.phase) * .35);
      ctx.fillStyle = star.r > 1.1 ? COLORS.cyan : "#b6c5ff";
      ctx.fillRect(star.x, star.y, star.r, star.r);
    }
    ctx.globalAlpha = 1;
  }
  function drawPlayer() {
    if (!player || (player.invulnerable > 0 && Math.floor(player.invulnerable * 12) % 2 === 0)) return;
    ctx.save(); ctx.translate(player.x, player.y);
    ctx.shadowBlur = 20; ctx.shadowColor = COLORS.cyan;
    ctx.fillStyle = COLORS.cyan;
    ctx.beginPath(); ctx.moveTo(0, -17); ctx.lineTo(14, 10); ctx.lineTo(5, 7); ctx.lineTo(0, 11); ctx.lineTo(-5, 7); ctx.lineTo(-14, 10); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0; ctx.fillStyle = "#101a46";
    ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(5, 5); ctx.lineTo(-5, 5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = COLORS.purple; ctx.fillRect(-3, 12, 6, 5);
    ctx.restore();
  }
  function drawEnemy(enemy) {
    if (!enemy.alive) return;
    const color = enemy.row === 0 ? COLORS.pink : enemy.row === 1 ? COLORS.purple : COLORS.blue;
    const x = enemy.x, y = enemy.y;
    ctx.save(); ctx.translate(x, y); ctx.shadowColor = color; ctx.shadowBlur = 13; ctx.fillStyle = color;
    ctx.fillRect(-9, -7, 18, 12); ctx.fillRect(-13, -3, 5, 7); ctx.fillRect(8, -3, 5, 7);
    ctx.fillRect(-7, 6, 4, 4); ctx.fillRect(4, 6, 4, 4);
    ctx.shadowBlur = 0; ctx.fillStyle = "#080a1d";
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
      ctx.shadowColor = COLORS.cyan; ctx.shadowBlur = 12; ctx.fillStyle = COLORS.cyan;
      ctx.fillRect(bullet.x - 1.5, bullet.y - 7, 3, 12);
    }
    for (const bullet of enemyBullets) {
      ctx.shadowColor = COLORS.pink; ctx.shadowBlur = 10; ctx.fillStyle = COLORS.pink;
      ctx.beginPath(); ctx.moveTo(bullet.x, bullet.y - 5); ctx.lineTo(bullet.x + 3, bullet.y); ctx.lineTo(bullet.x, bullet.y + 5); ctx.lineTo(bullet.x - 3, bullet.y); ctx.closePath(); ctx.fill();
    }
    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife); ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 8;
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
