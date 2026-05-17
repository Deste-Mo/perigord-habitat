'use client';
import React from 'react';
import { MarkerCliquable } from './MarkerCliquable';

interface MarkerElementProps {
  /** Indique si l'élément est sélectionné (masque le marker si true) */
  estSelectionne: boolean;
  /** Position du marker */
  position: [number, number, number];
  /** Taille du marker en pixels (défaut: 10) */
  taille?: number;
  /** Couleur du marker (défaut: orange #ff6b00) */
  couleur?: string;
}

/**
 * Composant helper pour ajouter un marker à un élément existant
 * Masque automatiquement le marker quand l'élément est sélectionné
 */
export function MarkerElement({
  estSelectionne,
  position,
  taille = 10,
  couleur = '#ff6b00',
}: MarkerElementProps) {
  if (estSelectionne) return null;
  
  return (
    <MarkerCliquable
      position={position}
      taille={taille}
      couleur={couleur}
    />
  );
}
