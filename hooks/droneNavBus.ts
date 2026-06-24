/**
 * État de navigation partagé entre MobileNavPad (UI React) et useDroneControls (Three.js).
 *
 * On utilise un objet muable simple plutôt qu'un EventTarget :
 * - Le pad mobile écrit directement dans cet objet
 * - useFrame le lit à chaque frame — aucun risque de race condition
 * - Pas de listener à attacher/détacher
 */

export type DirectionDeplacement = 'forward' | 'backward' | 'left' | 'right';

export interface EtatNavMobile {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

/** Singleton mutable partagé entre tous les modules */
export const etatNavMobile: EtatNavMobile = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

export function setNavMobile(direction: DirectionDeplacement, active: boolean) {
  etatNavMobile[direction] = active;
}
