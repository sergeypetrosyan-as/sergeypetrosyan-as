import { TILE } from '../game/Config';
import type { Platform } from '../entities/Platforms';
import { T } from './Level';
import type { World } from './World';

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Body extends Box {
  vx: number;
  vy: number;
}

export const overlap = (a: Box, b: Box): boolean => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

export interface YResult {
  floor: boolean;
  ceiling: boolean;
  /** Tile struck from below (for prize blocks), or -1. */
  bumped: number;
  platform: Platform | null;
  /** The tile type landed on, for conveyors / live floors / spikes. */
  floorTile: T;
}

const EPS = 0.001;

/**
 * Moves a body horizontally and resolves against tiles and solid platforms.
 * Steps are small (fixed 120 Hz), so checking the leading edge is enough.
 */
export function moveX(world: World, b: Body, dx: number): boolean {
  if (dx === 0) return false;
  b.x += dx;
  const lv = world.level;
  const top = Math.floor(b.y / TILE);
  const bottom = Math.floor((b.y + b.h - EPS) / TILE);
  let hit = false;
  if (dx > 0) {
    const tx = Math.floor((b.x + b.w - EPS) / TILE);
    for (let ty = top; ty <= bottom; ty++) {
      if (world.solidTile(tx, ty)) {
        b.x = tx * TILE - b.w;
        hit = true;
        break;
      }
    }
  } else {
    const tx = Math.floor(b.x / TILE);
    for (let ty = top; ty <= bottom; ty++) {
      if (world.solidTile(tx, ty)) {
        b.x = (tx + 1) * TILE;
        hit = true;
        break;
      }
    }
  }
  for (const p of world.platforms) {
    if (!p.solid || p.oneWay || !overlap(b, p)) continue;
    b.x = dx > 0 ? p.x - b.w : p.x + p.w;
    hit = true;
  }
  if (b.x < 0) {
    b.x = 0;
    hit = true;
  } else if (b.x + b.w > lv.pxW) {
    b.x = lv.pxW - b.w;
    hit = true;
  }
  return hit;
}

/** Vertical move. One-way tiles and platforms only catch a body falling from above them. */
export function moveY(world: World, b: Body, dy: number, oneWays = true): YResult {
  const res: YResult = { floor: false, ceiling: false, bumped: -1, platform: null, floorTile: T.Empty };
  const prevBottom = b.y + b.h;
  b.y += dy;
  const left = Math.floor(b.x / TILE);
  const right = Math.floor((b.x + b.w - EPS) / TILE);
  const lv = world.level;
  if (dy > 0) {
    const ty = Math.floor((b.y + b.h - EPS) / TILE);
    const tileTop = ty * TILE;
    for (let tx = left; tx <= right; tx++) {
      const t = lv.at(tx, ty);
      const solid = world.solidTile(tx, ty);
      if (solid || (oneWays && t === T.OneWay && prevBottom <= tileTop + EPS)) {
        b.y = tileTop - b.h;
        res.floor = true;
        // Prefer the more interesting tile when straddling two.
        if (res.floorTile === T.Empty || t !== T.Ground) res.floorTile = t;
      }
    }
  } else if (dy < 0) {
    const ty = Math.floor(b.y / TILE);
    // Bump the tile nearest the body's centre first.
    const cx = Math.floor((b.x + b.w / 2) / TILE);
    const order = cx === left ? [left, right] : [right, left];
    for (const tx of order) {
      if (world.solidTile(tx, ty)) {
        b.y = (ty + 1) * TILE;
        res.ceiling = true;
        if (res.bumped < 0) res.bumped = ty * lv.w + tx;
      }
    }
  }
  for (const p of world.platforms) {
    if (!p.solid || !overlap(b, p)) continue;
    if (dy > 0 && (!p.oneWay || (oneWays && prevBottom <= p.y + Math.max(0, p.dy) + EPS))) {
      b.y = p.y - b.h;
      res.floor = true;
      res.platform = p;
    } else if (dy < 0 && !p.oneWay) {
      b.y = p.y + p.h;
      res.ceiling = true;
    }
  }
  return res;
}

/** True if a body standing at its current position has ground (tile or platform) directly below. */
export function groundBelow(world: World, b: Box): boolean {
  const ty = Math.floor((b.y + b.h + 1) / TILE);
  for (let tx = Math.floor(b.x / TILE); tx <= Math.floor((b.x + b.w - EPS) / TILE); tx++) {
    if (world.solidTile(tx, ty) || world.level.at(tx, ty) === T.OneWay) return true;
  }
  return false;
}
