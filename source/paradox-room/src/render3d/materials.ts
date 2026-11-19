// Shared physically based materials for the House. Created once per renderer; disposed with it.
import * as THREE from 'three';
import type { TextureBank } from './textures.ts';
import { COLORS } from '../render/palette.ts';

// Colours come from render/palette.ts (the 19_mystical-western roles): rose fittings and gate,
// ember dark metal, bone for the lantern-bearer, blush lantern light.
export { COLORS };

export interface MaterialBank {
  plaster: THREE.MeshStandardMaterial;
  stone: THREE.MeshStandardMaterial;
  poche: THREE.MeshStandardMaterial;
  backWall: THREE.MeshStandardMaterial;
  brass: THREE.MeshStandardMaterial;
  darkBrass: THREE.MeshStandardMaterial;
  wood: THREE.MeshPhysicalMaterial;
  cloak: THREE.MeshStandardMaterial;
  porcelain: THREE.MeshStandardMaterial;
  glassWarm: THREE.MeshStandardMaterial;
  flame: THREE.MeshBasicMaterial;
  seam: THREE.MeshBasicMaterial;
  frosted: THREE.MeshPhysicalMaterial;
  plateStone: THREE.MeshStandardMaterial;
  paper: THREE.MeshStandardMaterial;
  grid: THREE.MeshBasicMaterial;
  all: THREE.Material[];
}

export function buildMaterials(t: TextureBank, transmission: boolean): MaterialBank {
  const plaster = new THREE.MeshStandardMaterial({
    map: t.plaster.map,
    normalMap: t.plaster.normalMap,
    normalScale: new THREE.Vector2(0.6, 0.6),
    roughnessMap: t.plaster.roughnessMap,
    roughness: 1,
    metalness: 0,
    vertexColors: true,
  });
  const stone = new THREE.MeshStandardMaterial({
    map: t.stone.map,
    normalMap: t.stone.normalMap,
    normalScale: new THREE.Vector2(0.9, 0.9),
    roughnessMap: t.stone.roughnessMap,
    roughness: 1,
    metalness: 0,
    vertexColors: true,
  });
  const poche = new THREE.MeshStandardMaterial({ map: t.poche, roughness: 0.95, metalness: 0, color: 0xffffff });
  const backWall = plaster.clone();
  backWall.color = new THREE.Color(0.8, 0.8, 0.8);
  const brass = new THREE.MeshStandardMaterial({ color: COLORS.brass, metalness: 0.65, roughness: 0.42, roughnessMap: t.brassRough });
  const darkBrass = new THREE.MeshStandardMaterial({ color: COLORS.darkBrass, metalness: 0.7, roughness: 0.55, roughnessMap: t.brassRough });
  const wood = new THREE.MeshPhysicalMaterial({
    map: t.wood.map,
    normalMap: t.wood.normalMap,
    roughnessMap: t.wood.roughnessMap,
    roughness: 1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.25,
  });
  const cloak = new THREE.MeshStandardMaterial({ map: t.fabric.map, normalMap: t.fabric.normalMap, roughness: 0.95, metalness: 0, color: 0xffffff });
  const porcelain = new THREE.MeshStandardMaterial({ color: COLORS.film, roughness: 0.35, metalness: 0, emissive: COLORS.umber, emissiveIntensity: 0.25 });
  const glassWarm = new THREE.MeshStandardMaterial({
    color: COLORS.lantern,
    emissive: new THREE.Color(COLORS.lantern),
    emissiveIntensity: 2.6,
    roughness: 0.3,
    transparent: true,
    opacity: 0.9,
  });
  const flame = new THREE.MeshBasicMaterial({ color: new THREE.Color(COLORS.film).multiplyScalar(3.2) });
  const seam = new THREE.MeshBasicMaterial({ color: new THREE.Color(COLORS.seam).multiplyScalar(1.2), toneMapped: true });
  const frosted = new THREE.MeshPhysicalMaterial({
    color: COLORS.film,
    roughness: 0.55,
    metalness: 0,
    transmission: transmission ? 0.9 : 0,
    thickness: 0.05,
    transparent: !transmission,
    opacity: transmission ? 1 : 0.55,
    emissive: new THREE.Color(COLORS.brass),
    emissiveIntensity: 0,
  });
  const plateStone = new THREE.MeshStandardMaterial({ map: t.stone.map, roughness: 0.7, metalness: 0, color: COLORS.tan });
  const paper = new THREE.MeshStandardMaterial({ map: t.paper, roughness: 0.85, side: THREE.DoubleSide, emissive: new THREE.Color(COLORS.film), emissiveIntensity: 0.12, emissiveMap: t.paper });
  const grid = new THREE.MeshBasicMaterial({ map: t.grid, color: 0xffffff, fog: true });
  const all = [plaster, stone, poche, backWall, brass, darkBrass, wood, cloak, porcelain, glassWarm, flame, seam, frosted, plateStone, paper, grid];
  return { plaster, stone, poche, backWall, brass, darkBrass, wood, cloak, porcelain, glassWarm, flame, seam, frosted, plateStone, paper, grid, all };
}
