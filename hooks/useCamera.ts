'use client';
import * as THREE from 'three';
import type { ModeCamera, IdPiece } from '@/types/maison';

// Positions de caméra pour chaque pièce (LÉGÈREMENT EN RETRAIT du centre pour meilleure vue, hauteur des yeux 1.65m)
// Ces positions sont utilisées en mode visite sur DESKTOP (ratio ≥ 1.2)
const CAMERA_PIECES: Record<string, { pos: [number, number, number]; cible: [number, number, number] }> = {
  // Séjour (5.5m × 5.0m): centre (-2.5, -1.5), caméra légèrement vers l'avant pour voir toute la pièce
  sejour:      { pos: [-2.5, 1.65, 0.2], cible: [-2.5, 1.65, -2.5] },
  // Cuisine (4.5m × 5.0m): centre (3.5, -1.5), caméra légèrement vers l'avant
  cuisine:     { pos: [3.5, 1.65, 0.2], cible: [3.5, 1.65, -2.5] },
  // Chambre (6.5m × 3.25m): centre (-2.625, 3.25), caméra légèrement vers l'avant
  chambre:     { pos: [-2.625, 1.65, 2.2], cible: [-2.625, 1.65, 3.8] },
  // Salle de bain (3.25m × 3.25m): centre (4.25, 3.25), caméra légèrement vers l'avant
  salleDeBain: { pos: [4.25, 1.65, 2.2], cible: [4.25, 1.65, 3.8] },
  // Couloir (1.5m × 3.25m): centre (1.625, 3.25), caméra légèrement vers l'avant
  couloir:     { pos: [1.625, 1.65, 2.2], cible: [1.625, 1.65, 3.8] },
  // Couloir d'entrée (2.3m × 6.25m): centre (-0.525, -1.75), caméra côté séjour regardant vers la porte
  couloirEntree: { pos: [-0.525, 1.65, 0.5], cible: [-0.525, 1.65, -4.0] },
};

/**
 * Positions FPS pour mobile (ratio < 0.7) — caméra placée au centre de la pièce
 * pour avoir une vue dégagée dans toutes les directions sans être collé à un mur.
 * Sur un écran portrait, le FOV horizontal est étroit : partir du centre
 * donne accès immédiat à l'ensemble de la pièce en tournant.
 */
const CAMERA_PIECES_MOBILE: Record<string, { pos: [number, number, number]; cible: [number, number, number] }> = {
  // Séjour — centre géométrique : x=-2.625, z=-1.75
  sejour:       { pos: [-2.625, 1.65, -1.5],  cible: [-2.625, 1.65, -3.5] },
  // Cuisine — centre : x=3.375, z=-1.75
  cuisine:      { pos: [3.375,  1.65, -1.5],  cible: [3.375,  1.65, -3.5] },
  // Chambre — centre : x=-2.625, z=3.25
  chambre:      { pos: [-2.625, 1.65,  3.0],  cible: [-2.625, 1.65,  4.5] },
  // Salle de bain — centre : x=4.25, z=3.25
  salleDeBain:  { pos: [4.25,   1.65,  3.0],  cible: [4.25,   1.65,  4.5] },
  // Couloir — centre : x=1.625, z=3.25
  couloir:      { pos: [1.625,  1.65,  3.0],  cible: [1.625,  1.65,  4.5] },
  // Couloir d'entrée — centre : x=-0.525, z=-1.75
  couloirEntree: { pos: [-0.525, 1.65, -1.5], cible: [-0.525, 1.65, -4.0] },
};

function construirePrereglages() {
  const p: Record<string, { pos: THREE.Vector3; cible: THREE.Vector3 }> = {};
  
  // Ajouter uniquement les positions au centre des pièces spécifiques
  for (const [id, vue] of Object.entries(CAMERA_PIECES)) {
    p[`${id}_piece`] = { 
      pos: new THREE.Vector3(...vue.pos), 
      cible: new THREE.Vector3(...vue.cible) 
    };
  }
  
  return p;
}

/**
 * Retourne les préréglages FPS adaptés au ratio du canvas.
 * Sur mobile portrait (ratio < 0.7), utilise CAMERA_PIECES_MOBILE
 * qui place la caméra au centre de la pièce pour éviter l'effet "collé au mur".
 */
export function getPrereglageVisite(
  idPiece: string,
  ratio: number
): { pos: THREE.Vector3; cible: THREE.Vector3 } | null {
  const source = ratio < 0.7 ? CAMERA_PIECES_MOBILE : CAMERA_PIECES;
  const vue = source[idPiece];
  if (!vue) return null;
  return {
    pos:   new THREE.Vector3(...vue.pos),
    cible: new THREE.Vector3(...vue.cible),
  };
}

/**
 * Calcule la position caméra extérieure selon le ratio largeur/hauteur du canvas.
 *
 * La scène s'étend de X≈-26 (immeuble gauche) à X≈+11 (garage droit).
 * En portrait mobile (ratio < 1), le FOV horizontal est très étroit → il faut
 * reculer et monter davantage pour que toute la maquette rentre dans le cadre.
 *
 * Valeurs calibrées :
 *   - Desktop (ratio ≥ 1.2)    → position desktop standard [20, 16, 20]
 *   - Tablette (0.7 ≤ ratio < 1.2) → position intermédiaire [25, 22, 28]
 *   - Mobile portrait (ratio < 0.7) → position très reculée [28, 26, 35]
 */
export function getPositionCameraExterieur(
  ratio: number
): { pos: THREE.Vector3; cible: THREE.Vector3 } {
  // Cible centrée entre l'immeuble (X=-20) et le garage (X=+9) → X≈-5
  const cible = new THREE.Vector3(-5, 2, 0);

  if (ratio < 0.7) {
    // Mobile portrait — très reculé pour voir toute la largeur de scène
    return { pos: new THREE.Vector3(22, 28, 38), cible };
  }
  if (ratio < 1.2) {
    // Tablette ou mobile paysage
    return { pos: new THREE.Vector3(22, 22, 30), cible };
  }
  // Desktop
  return { pos: new THREE.Vector3(20, 16, 20), cible: new THREE.Vector3(0, 2, 0) };
}

/**
 * Calcule la position caméra en mode ORBITE pour une pièce spécifique,
 * adaptée au ratio du canvas.
 *
 * En mode orbite sur mobile portrait (ratio < 0.7), la caméra est reculée
 * en vue plongeante à ~45° pour voir la pièce entière sans être collée aux murs.
 * Sur desktop, on reste proche (vue immersive).
 *
 * @param ciblePiece - centre de la pièce (depuis CAMERA_PIECES)
 * @param ratio      - width/height du canvas
 */
export function getPositionOrbitePiece(
  ciblePiece: THREE.Vector3,
  ratio: number
): THREE.Vector3 {
  if (ratio < 0.7) {
    // Mobile portrait : vue très plongeante, assez reculée pour voir toute la pièce
    // Les pièces font ~5m×5m → il faut être à ~12-14u du centre pour avoir le champ complet
    return new THREE.Vector3(
      ciblePiece.x + 3,
      ciblePiece.y + 11,
      ciblePiece.z + 12
    );
  }
  if (ratio < 1.2) {
    // Tablette / mobile paysage
    return new THREE.Vector3(
      ciblePiece.x + 2,
      ciblePiece.y + 7,
      ciblePiece.z + 8
    );
  }
  // Desktop : position standard (gérée par PREREGLAGES_CAMERA)
  return new THREE.Vector3(
    ciblePiece.x,
    ciblePiece.y + 2,
    ciblePiece.z + 3
  );
}

export const PREREGLAGES_CAMERA: Record<string, { pos: THREE.Vector3; cible: THREE.Vector3 }> = {
  // Vue orbite extérieure desktop (ratio ≥ 1.2) — les autres ratios sont calculés dynamiquement
  exterieur_orbite: { pos: new THREE.Vector3(20, 16, 20), cible: new THREE.Vector3(0, 2, 0) },
  // Vue orbite intérieure : plus proche pour voir l'intérieur de la maison
  interieur_orbite: { pos: new THREE.Vector3(12, 10, 12), cible: new THREE.Vector3(0, 1.4, 0.5) },
  ...construirePrereglages(),
};

/**
 * Centre de chaque pièce en 3D — utilisé comme cible OrbitControls
 * et comme référence pour getPositionOrbitePiece().
 */
export const CENTRES_PIECES: Record<string, THREE.Vector3> = {
  sejour:       new THREE.Vector3(-2.5,   1.65, -1.5),
  cuisine:      new THREE.Vector3( 3.5,   1.65, -1.5),
  chambre:      new THREE.Vector3(-2.625, 1.65,  3.25),
  salleDeBain:  new THREE.Vector3( 4.25,  1.65,  3.25),
  couloir:      new THREE.Vector3( 1.625, 1.65,  3.25),
  couloirEntree: new THREE.Vector3(-0.525, 1.65, -1.75),
};

export const CIBLES_ORBITE: Record<string, [number, number, number]> = {
  sejour:      [-2.5, 1.4, -1.5],      // Centre séjour
  cuisine:     [ 3.5, 1.4, -1.5],      // Centre cuisine
  chambre:     [-2.625, 1.4,  3.25],   // Centre chambre
  salleDeBain: [ 4.25, 1.4,  3.25],    // Centre salle de bain
  couloir:        [ 1.625, 1.4,  3.25],   // Centre couloir
  couloirEntree:  [-0.525, 1.4, -1.75],  // Centre couloir d'entrée
  interieur:      [ 0, 1.4,  0.5],       // Centre de la maison
};

export function getClePrereglage(pieceActive: IdPiece | 'exterieur' | 'interieur', modeCamera: ModeCamera): string {
  if (pieceActive === 'exterieur') {
    return 'exterieur_orbite';
  }
  if (pieceActive === 'interieur') {
    return 'interieur_orbite';
  }
  return `${pieceActive}_piece`;
}
