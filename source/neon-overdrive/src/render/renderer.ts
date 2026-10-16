import { T } from '../state/tuning';
import { heightAt } from '../track/build';
import type { Frame, RenderBackend } from './backend';
import { Fx } from './fx';
import { buildArt, carSprite, LOOKS, type Art } from './textures';

export type { Frame } from './backend';

const mod = (a: number, n: number): number => ((a % n) + n) % n;
const FOGD = 6;

/** Pseudo-3D Canvas 2D renderer, kept as the fallback when WebGL cannot start. */
export class Renderer implements RenderBackend {
  readonly kind = '2d' as const;
  readonly g: CanvasRenderingContext2D;
  readonly fx = new Fx();
  private art: Art | null = null;
  private artKey = '';
  private cars = LOOKS.map(carSprite);
  private skyFar = 0;
  private skyNear = 0;
  private lines = Array.from({ length: 44 }, (_, i) => ({ ang: (i / 44) * Math.PI * 2 + Math.sin(i * 12.9) * 0.2, ph: (i * 0.618) % 1, len: 0.12 + ((i * 7) % 5) * 0.04 }));
  carX = 0;
  carY = 0;
  carW = 0;
  // projection scratch
  private px1: number[] = [];
  private py1: number[] = [];
  private pw1: number[] = [];
  private ps1: number[] = [];
  private px2: number[] = [];
  private py2: number[] = [];
  private pw2: number[] = [];
  private ps2: number[] = [];
  private clip: number[] = [];
  private vis: boolean[] = [];
  private ok: boolean[] = [];

  constructor(readonly canvas: HTMLCanvasElement) {
    const g = canvas.getContext('2d', { alpha: false });
    if (!g) throw new Error('Canvas 2D unavailable');
    this.g = g;
    for (const a of [this.px1, this.py1, this.pw1, this.ps1, this.px2, this.py2, this.pw2, this.ps2, this.clip]) a.length = T.DRAW + 2;
  }

  resize(scale: number): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth * dpr;
    let h = window.innerHeight * dpr;
    const cap = Math.sqrt((1920 * 1080) / (w * h));
    const k = Math.min(1, cap) * scale;
    w = Math.max(320, Math.floor(w * k));
    h = Math.max(240, Math.floor(h * k));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  clearFx(): void {
    this.fx.clear();
  }

  dispose(): void {
    this.art = null;
  }

  private getArt(f: Frame): Art {
    const key = `${f.trackIdx}:${f.highContrast ? 1 : 0}`;
    if (!this.art || this.artKey !== key) {
      this.art = buildArt(f.track.def.palette, f.track.def.seed, f.highContrast);
      this.artKey = key;
    }
    return this.art;
  }

  private quad(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: string): void {
    const g = this.g;
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.lineTo(x3, y3);
    g.lineTo(x4, y4);
    g.closePath();
    g.fill();
  }

  /** Raised wall strip at lateral offset `lat` (road half-widths) for segment n. */
  private wall(n: number, lat: number, height: number, face: string, top: string): void {
    const x1 = this.px1[n] + lat * this.pw1[n];
    const x2 = this.px2[n] + lat * this.pw2[n];
    const y1 = this.py1[n];
    const y2 = this.py2[n];
    const h = this.ps1[n] * height * (this.canvas.height / 2);
    const h2 = this.ps2[n] * height * (this.canvas.height / 2);
    this.quad(x1, y1, x2, y2, x2, y2 - h2, x1, y1 - h, face);
    this.quad(x1, y1 - h * 0.86, x2, y2 - h2 * 0.86, x2, y2 - h2, x1, y1 - h, top);
  }

  render(f: Frame): void {
    const g = this.g;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const pal = f.track.def.palette;
    const art = this.getArt(f);
    const hc = f.highContrast;
    const segs = f.track.segs;
    const N = segs.length;
    const SEG = T.SEG_LEN;
    const fov = T.FOV + T.FOV_BOOST * f.boostAmt;
    const depth = 1 / Math.tan((fov * Math.PI) / 360);
    const camY = T.CAM_H + heightAt(f.track, f.s);
    const camZ0 = f.s - T.PLAYER_Z;
    const baseIdx = Math.floor(camZ0 / SEG);
    const basePct = (camZ0 - baseIdx * SEG) / SEG;
    const baseSeg = segs[mod(baseIdx, N)];
    const playerSeg = segs[mod(Math.floor(f.s / SEG), N)];

    this.skyFar += playerSeg.curve * f.speedPct * f.dt * 140;
    this.skyNear += playerSeg.curve * f.speedPct * f.dt * 260;
    this.fx.update(f.dt);

    g.save();
    g.translate(f.shakeX, f.shakeY);

    // ---- sky ----
    const sky = g.createLinearGradient(0, 0, 0, H / 2);
    sky.addColorStop(0, pal.skyTop);
    sky.addColorStop(0.55, pal.skyMid);
    sky.addColorStop(1, pal.skyBottom);
    g.fillStyle = sky;
    g.fillRect(-40, -40, W + 80, H / 2 + 40);
    if (!hc) {
      for (const st of art.stars) {
        g.globalAlpha = 0.35 + 0.35 * Math.sin(f.time * 1.5 + st.p);
        g.fillStyle = '#cfe8ff';
        g.fillRect(st.x * W, st.y * H * 0.42, st.r, st.r);
      }
      g.globalAlpha = 1;
    }
    // sun
    const R = H * 0.17;
    const sunX = mod(W * 0.6 - this.skyFar * 0.12 * (W / 1280), W + R * 2) - R * 0.5;
    const sunY = H / 2 - R * 0.55;
    g.save();
    g.beginPath();
    g.arc(sunX, sunY, R, 0, Math.PI * 2);
    g.clip();
    const sg = g.createLinearGradient(0, sunY - R, 0, sunY + R);
    sg.addColorStop(0, pal.sun2);
    sg.addColorStop(1, pal.sun1);
    g.fillStyle = sg;
    g.fillRect(sunX - R, sunY - R, R * 2, R * 2);
    if (!hc) {
      g.fillStyle = pal.skyBottom;
      for (let k = 0; k < 6; k++) g.fillRect(sunX - R, sunY + R * (0.05 + k * 0.17), R * 2, R * (0.015 + k * 0.016));
    }
    g.restore();
    // skyline parallax
    const drawStrip = (img: HTMLCanvasElement, off: number, hFrac: number): void => {
      const sc = (H * hFrac) / img.height;
      const tw = img.width * sc;
      let x0 = -mod(off * sc, tw);
      for (; x0 < W; x0 += tw) g.drawImage(img, x0, H / 2 - img.height * sc + 1, tw + 1, img.height * sc);
    };
    drawStrip(art.far, this.skyFar * 0.5, 0.2);
    drawStrip(art.near, this.skyNear, 0.26);
    // horizon haze + ground
    g.fillStyle = pal.ground0;
    g.fillRect(-40, H / 2, W + 80, H / 2 + 40);
    const hz = g.createLinearGradient(0, H / 2 - H * 0.09, 0, H / 2 + 2);
    hz.addColorStop(0, pal.fog + '00');
    hz.addColorStop(1, pal.fog + (hc ? '66' : 'cc'));
    g.fillStyle = hz;
    g.fillRect(-40, H / 2 - H * 0.09, W + 80, H * 0.09 + 2);

    // ---- road: pass 1 (front to back) ----
    const gateCol = f.gateOpen ? pal.accentA : '#ff2e63';
    let xo = 0;
    let dx = -(baseSeg.curve * basePct);
    let maxy = H;
    const halfW = W / 2;
    const halfH = H / 2;
    for (let n = 0; n < T.DRAW; n++) {
      const idx = baseIdx + n;
      const seg = segs[mod(idx, N)];
      const z1 = idx * SEG - camZ0;
      const z2 = z1 + SEG;
      const cx1 = f.x * T.ROAD_W - xo;
      const cx2 = f.x * T.ROAD_W - xo - dx;
      this.ok[n] = z1 > 20;
      if (this.ok[n]) {
        const s1 = depth / z1;
        const s2 = depth / z2;
        this.ps1[n] = s1;
        this.ps2[n] = s2;
        this.px1[n] = halfW + s1 * -cx1 * halfW;
        this.px2[n] = halfW + s2 * -cx2 * halfW;
        this.py1[n] = halfH - s1 * (seg.y1 - camY) * halfH;
        this.py2[n] = halfH - s2 * (seg.y2 - camY) * halfH;
        this.pw1[n] = s1 * T.ROAD_W * halfW;
        this.pw2[n] = s2 * T.ROAD_W * halfW;
      }
      xo += dx;
      dx += seg.curve;
      this.clip[n] = maxy;
      this.vis[n] = false;
      if (!this.ok[n] || this.py2[n] >= this.py1[n] || this.py2[n] >= maxy) continue;
      this.vis[n] = true;
      const x1 = this.px1[n], y1 = this.py1[n], w1 = this.pw1[n];
      const x2 = this.px2[n], y2 = this.py2[n], w2 = this.pw2[n];
      const alt = seg.band === 0;
      // ground
      g.fillStyle = alt ? pal.ground0 : pal.ground1;
      g.fillRect(-40, y2, W + 80, y1 - y2 + 1);
      // rumble
      const r1 = w1 / 7;
      const r2 = w2 / 7;
      const rc = hc ? (alt ? '#ffffff' : '#ffe600') : alt ? pal.rumble0 : pal.rumble1;
      this.quad(x1 - w1 - r1, y1, x2 - w2 - r2, y2, x2 - w2, y2, x1 - w1, y1, rc);
      this.quad(x1 + w1 + r1, y1, x2 + w2 + r2, y2, x2 + w2, y2, x1 + w1, y1, rc);
      // road
      this.quad(x1 - w1, y1, x2 - w2, y2, x2 + w2, y2, x1 + w1, y1, hc ? (alt ? '#000000' : '#0b0b12') : alt ? pal.road0 : pal.road1);
      // edge neon lines
      const e1 = w1 * 0.025;
      const e2 = w2 * 0.025;
      this.quad(x1 - w1 + e1, y1, x2 - w2 + e2, y2, x2 - w2, y2, x1 - w1, y1, pal.edge);
      this.quad(x1 + w1 - e1, y1, x2 + w2 - e2, y2, x2 + w2, y2, x1 + w1, y1, pal.edge);
      // lane markers
      if (alt) {
        const l1 = w1 / (hc ? 22 : 36);
        const l2 = w2 / (hc ? 22 : 36);
        for (let k = 1; k < 4; k++) {
          if (k === 2 && seg.spine) continue;
          const o = -1 + (k * 2) / 4;
          this.quad(x1 + o * w1 - l1, y1, x2 + o * w2 - l2, y2, x2 + o * w2 + l2, y2, x1 + o * w1 + l1, y1, pal.lane);
        }
      }
      // Spine channel
      if (seg.spine) {
        const sh = T.SPINE_HALF;
        const pulse = 0.5 + 0.5 * Math.sin(f.time * 6 - n * 0.35);
        g.globalAlpha = f.gateOpen ? 0.2 + 0.18 * pulse : 0.25;
        this.quad(x1 - sh * w1, y1, x2 - sh * w2, y2, x2 + sh * w2, y2, x1 + sh * w1, y1, gateCol);
        g.globalAlpha = 1;
        const t1 = w1 * 0.02;
        const t2 = w2 * 0.02;
        this.quad(x1 - sh * w1 - t1, y1, x2 - sh * w2 - t2, y2, x2 - sh * w2 + t2, y2, x1 - sh * w1 + t1, y1, gateCol);
        this.quad(x1 + sh * w1 - t1, y1, x2 + sh * w2 - t2, y2, x2 + sh * w2 + t2, y2, x1 + sh * w1 + t1, y1, gateCol);
        if (seg.band === 0 && f.gateOpen) {
          // chevrons that point the way down the channel
          const cw1 = w1 * 0.16;
          const cw2 = w2 * 0.16;
          g.globalAlpha = 0.55;
          this.quad(x1 - cw1, y1, x2 - cw2, y2, x2, y2 - (y1 - y2) * 0.2, x1, y1 - (y1 - y2) * 0.2, gateCol);
          this.quad(x1 + cw1, y1, x2 + cw2, y2, x2, y2 - (y1 - y2) * 0.2, x1, y1 - (y1 - y2) * 0.2, gateCol);
          g.globalAlpha = 1;
        }
      }
      // fog
      const fog = 1 - Math.exp(-Math.pow(n / T.DRAW, 2) * FOGD);
      if (fog > 0.01) {
        g.globalAlpha = hc ? fog * 0.4 : fog;
        g.fillStyle = pal.fog;
        g.fillRect(-40, y2, W + 80, y1 - y2 + 1);
        g.globalAlpha = 1;
      }
      maxy = y1;
    }

    // ---- pass 2 (back to front): walls, scenery, gates, cars ----
    const nowRivals: number[] = f.rivals.map((r) => Math.floor(r.s / SEG) - baseIdx);
    for (let n = T.DRAW - 1; n > 0; n--) {
      if (!this.ok[n]) continue;
      const idx = baseIdx + n;
      const seg = segs[mod(idx, N)];
      const fogA = 1 - (1 - Math.exp(-Math.pow(n / T.DRAW, 2) * FOGD)) * (hc ? 0.4 : 0.92);
      if (this.vis[n]) {
        this.wall(n, T.WALL_X, 320, seg.band === 0 ? '#0c1238' : '#141b4c', hc ? '#ffffff' : pal.accentB);
        this.wall(n, -T.WALL_X, 320, seg.band === 0 ? '#0c1238' : '#141b4c', hc ? '#ffffff' : pal.accentB);
        if (seg.spine) {
          const rail = f.gateOpen ? pal.accentA : '#ff2e63';
          g.globalAlpha = fogA;
          this.wall(n, T.SPINE_RAIL, 150, '#071030', rail);
          this.wall(n, -T.SPINE_RAIL, 150, '#071030', rail);
          g.globalAlpha = 1;
        }
      }
      // scenery
      const x = this.px1[n];
      const y = this.py1[n];
      const sc = this.ps1[n];
      const clip = this.clip[n];
      for (const sp of seg.sprites) {
        let img: HTMLCanvasElement;
        let worldW: number;
        if (sp.kind === 'tower') {
          img = art.towers[sp.tex];
          worldW = art.towerW[sp.tex];
        } else if (sp.kind === 'sign') {
          img = art.signs[sp.tex];
          worldW = 1100;
        } else {
          img = art.pylons[sp.tex];
          worldW = 150;
        }
        const dw = worldW * sc * halfW;
        if (dw < 2) continue;
        const dh = (dw * img.height) / img.width;
        const dxp = x + sc * sp.x * T.ROAD_W * halfW - dw / 2;
        const dyp = y - dh;
        const clipH = Math.max(0, dyp + dh - clip);
        if (clipH >= dh) continue;
        g.globalAlpha = fogA;
        g.drawImage(img, 0, 0, img.width, img.height * (1 - clipH / dh), dxp, dyp, dw, dh - clipH);
      }
      g.globalAlpha = 1;
      // checkpoint arch
      if (seg.cp > 0 && this.vis[n]) this.drawArch(n, seg.cp, pal.accentA, pal.accentB, fogA, f.time);
      // Spine gates
      if (seg.gate === 1 && this.vis[n]) this.drawGate(n, f, fogA);
      else if (seg.gate === 2 && this.vis[n]) this.drawExit(n, pal.accentB, fogA);
      // rivals
      for (let i = 0; i < f.rivals.length; i++) {
        if (nowRivals[i] !== n) continue;
        const r = f.rivals[i];
        const pct = (r.s - idx * SEG) / SEG;
        const sc2 = this.ps1[n] + (this.ps2[n] - this.ps1[n]) * pct;
        const cxp = this.px1[n] + (this.px2[n] - this.px1[n]) * pct + sc2 * r.x * T.ROAD_W * halfW;
        const cyp = this.py1[n] + (this.py2[n] - this.py1[n]) * pct;
        const cw = T.CAR_WORLD_W * sc2 * halfW;
        if (cw < 2) continue;
        const img = this.cars[1 + (r.color % 3)];
        const ch = (cw * img.height) / img.width;
        const clipH = Math.max(0, cyp - clip);
        g.globalAlpha = fogA;
        g.fillStyle = 'rgba(0,0,0,0.45)';
        g.beginPath();
        g.ellipse(cxp, cyp, cw * 0.5, cw * 0.06, 0, 0, 7);
        g.fill();
        if (clipH < ch) g.drawImage(img, 0, 0, img.width, img.height * (1 - clipH / ch), cxp - cw / 2, cyp - ch, cw, ch - clipH);
        g.globalAlpha = 1;
      }
    }

    // ---- player car ----
    const cw = Math.min(W * 0.23, H * 0.46);
    const img = this.cars[0];
    const ch = (cw * img.height) / img.width;
    const bob = Math.sin(f.time * 38) * (0.5 + f.speedPct * 1.6) * (H / 720);
    const cx = halfW + f.steer * W * 0.012;
    const cy = H * 0.945 + bob;
    const lean = Math.max(-0.22, Math.min(0.22, f.steer * 0.04 + f.vx * 0.03 + (f.drifting ? f.vx * 0.07 : 0)));
    this.carX = cx;
    this.carY = cy;
    this.carW = cw;
    g.save();
    g.translate(cx, cy);
    g.rotate(lean);
    g.fillStyle = 'rgba(0,0,0,0.5)';
    g.beginPath();
    g.ellipse(0, -2, cw * 0.52, cw * 0.05, 0, 0, 7);
    g.fill();
    g.drawImage(img, -cw / 2, -ch, cw, ch);
    if (f.boosting) {
      g.globalCompositeOperation = 'lighter';
      for (const ex of [-0.125, 0.125]) {
        const fx = ex * cw;
        const fy = -ch * 0.23;
        const fl = cw * (0.28 + 0.06 * Math.sin(f.time * 90));
        const gr = g.createRadialGradient(fx, fy, 0, fx, fy, fl);
        gr.addColorStop(0, 'rgba(255,255,255,0.95)');
        gr.addColorStop(0.35, 'rgba(255,179,71,0.8)');
        gr.addColorStop(1, 'rgba(255,46,166,0)');
        g.fillStyle = gr;
        g.fillRect(fx - fl, fy - fl, fl * 2, fl * 2);
      }
      g.globalCompositeOperation = 'source-over';
    }
    g.restore();

    // ambient particles
    if (f.drifting && f.speedPct > 0.3 && Math.random() < f.dt * 60 * 0.7) {
      this.fx.smoke(cx - cw * 0.32, cy - ch * 0.08, cw, 'rgba(210,220,255,0.6)');
      this.fx.smoke(cx + cw * 0.32, cy - ch * 0.08, cw, 'rgba(210,220,255,0.6)');
    }
    if (f.boosting && Math.random() < f.dt * 60 * 0.9) this.fx.streak(cx + (Math.random() < 0.5 ? -1 : 1) * cw * 0.125, cy - ch * 0.25, cw, Math.random() < 0.5 ? '#2cf6ff' : '#ff2ea6');
    this.fx.draw(g);

    // ---- overlays ----
    const lineAmt = f.speedLines ? Math.max(0, f.speedPct - 0.45) * 1.8 + f.boostAmt * 0.6 : 0;
    if (lineAmt > 0.02) {
      const amt = Math.min(1, lineAmt) * (f.reducedMotion ? 0.4 : 1);
      const rmax = Math.hypot(W, H) * 0.55;
      g.lineWidth = Math.max(1, H / 360);
      g.strokeStyle = f.boostAmt > 0.2 ? '#bff9ff' : '#9fb4ff';
      const vy = H * 0.5;
      for (const l of this.lines) {
        l.ph = (l.ph + f.dt * (0.5 + f.speedPct * 1.7 + f.boostAmt * 1.4)) % 1;
        const r0 = rmax * (0.18 + l.ph * 0.82);
        const r1 = r0 + rmax * l.len * (0.3 + l.ph) * (0.6 + f.boostAmt);
        g.globalAlpha = amt * l.ph * 0.7;
        g.beginPath();
        g.moveTo(halfW + Math.cos(l.ang) * r0, vy + Math.sin(l.ang) * r0 * 0.7);
        g.lineTo(halfW + Math.cos(l.ang) * r1, vy + Math.sin(l.ang) * r1 * 0.7);
        g.stroke();
      }
      g.globalAlpha = 1;
    }
    if (f.boostAmt > 0.02 && !hc) {
      const vg = g.createRadialGradient(halfW, halfH, H * 0.3, halfW, halfH, H * 1.0);
      vg.addColorStop(0, 'rgba(44,246,255,0)');
      vg.addColorStop(1, `rgba(120,80,255,${(f.reducedFlash ? 0.18 : 0.38) * f.boostAmt})`);
      g.fillStyle = vg;
      g.fillRect(-40, -40, W + 80, H + 80);
    }
    if (f.flash > 0.01 && !f.reducedFlash) {
      g.globalAlpha = Math.min(1, f.flash) * 0.18;
      g.fillStyle = '#ffffff';
      g.fillRect(-40, -40, W + 80, H + 80);
      g.globalAlpha = 1;
    }
    g.restore();
  }

  sparks(dir: number, count: number): void {
    this.fx.sparks(this.carX + dir * this.carW * 0.5, this.carY - this.carW * 0.1, dir, count, this.carW);
  }

  private drawArch(n: number, cp: number, a: string, b: string, alpha: number, time: number): void {
    const g = this.g;
    const H = this.canvas.height;
    const x = this.px1[n];
    const y = this.py1[n];
    const w = this.pw1[n];
    const hh = this.ps1[n] * 900 * (H / 2);
    const th = this.ps1[n] * 130 * (H / 2);
    g.globalAlpha = alpha;
    const col = cp === 4 ? '#ffffff' : a;
    const pw = Math.max(2, w * 0.05);
    g.fillStyle = col;
    g.fillRect(x - w * 1.08 - pw, y - hh, pw * 2, hh);
    g.fillRect(x + w * 1.08 - pw, y - hh, pw * 2, hh);
    if (cp === 4) {
      const cells = 24;
      const cw = (w * 2.2) / cells;
      for (let i = 0; i < cells; i++) {
        for (let j = 0; j < 2; j++) {
          g.fillStyle = (i + j) % 2 === 0 ? '#ffffff' : '#10142e';
          g.fillRect(x - w * 1.1 + i * cw, y - hh - th + (j * th) / 2, cw + 0.5, th / 2 + 0.5);
        }
      }
    } else {
      g.fillStyle = b;
      g.fillRect(x - w * 1.1, y - hh - th, w * 2.2, th);
      g.fillStyle = a;
      g.fillRect(x - w * 1.1, y - hh - th, w * 2.2, Math.max(1, th * 0.12));
      if (w > 70) {
        g.fillStyle = '#ffffff';
        g.font = `900 ${Math.max(10, Math.floor(th * 0.7))}px "Arial Black", Impact, sans-serif`;
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText(`CHECKPOINT ${cp}`, x, y - hh - th / 2 + Math.sin(time * 3) * 0.5);
      }
    }
    g.globalAlpha = 1;
  }

  private drawGate(n: number, f: Frame, alpha: number): void {
    const g = this.g;
    const H = this.canvas.height;
    const x = this.px1[n];
    const y = this.py1[n];
    const w = this.pw1[n];
    const hh = this.ps1[n] * 620 * (H / 2);
    const open = f.gateOpen;
    const col = open ? '#2cf6ff' : '#ff2e63';
    const flick = open || f.reducedFlash ? 1 : 0.7 + 0.3 * Math.sin(f.time * 50);
    g.globalAlpha = alpha * flick;
    const half = T.SPINE_RAIL * w;
    const pw = Math.max(2, w * 0.035);
    // field
    if (open) {
      const gr = g.createLinearGradient(0, y - hh, 0, y);
      gr.addColorStop(0, 'rgba(44,246,255,0.0)');
      gr.addColorStop(1, 'rgba(44,246,255,0.28)');
      g.fillStyle = gr;
      g.fillRect(x - half, y - hh, half * 2, hh);
    } else {
      g.fillStyle = 'rgba(255,46,99,0.55)';
      g.fillRect(x - half, y - hh, half * 2, hh);
      g.save();
      g.beginPath();
      g.rect(x - half, y - hh, half * 2, hh);
      g.clip();
      g.fillStyle = 'rgba(10,6,20,0.8)';
      const step = Math.max(8, hh / 6);
      for (let k = -hh; k < half * 2 + hh; k += step * 2) {
        g.beginPath();
        g.moveTo(x - half + k, y);
        g.lineTo(x - half + k + step, y);
        g.lineTo(x - half + k + step + hh, y - hh);
        g.lineTo(x - half + k + hh, y - hh);
        g.closePath();
        g.fill();
      }
      g.restore();
    }
    g.fillStyle = col;
    g.fillRect(x - half - pw, y - hh, pw * 2, hh);
    g.fillRect(x + half - pw, y - hh, pw * 2, hh);
    const bh = Math.max(3, hh * 0.16);
    g.fillRect(x - half - pw, y - hh - bh * 0.4, half * 2 + pw * 2, bh);
    if (half > 26) {
      g.fillStyle = '#05081c';
      g.font = `900 ${Math.max(9, Math.floor(bh * 0.7))}px "Arial Black", Impact, sans-serif`;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(open ? 'SPINE OPEN' : f.gateText, x, y - hh + bh * 0.1);
    }
    g.globalAlpha = 1;
  }

  private drawExit(n: number, col: string, alpha: number): void {
    const g = this.g;
    const H = this.canvas.height;
    const x = this.px1[n];
    const y = this.py1[n];
    const w = this.pw1[n];
    const hh = this.ps1[n] * 420 * (H / 2);
    const half = T.SPINE_RAIL * w;
    const pw = Math.max(2, w * 0.025);
    g.globalAlpha = alpha;
    g.fillStyle = col;
    g.fillRect(x - half - pw, y - hh, pw * 2, hh);
    g.fillRect(x + half - pw, y - hh, pw * 2, hh);
    g.fillRect(x - half - pw, y - hh, half * 2 + pw * 2, Math.max(2, hh * 0.08));
    g.globalAlpha = 1;
  }
}
