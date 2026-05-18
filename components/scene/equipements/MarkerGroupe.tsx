'use client';
import React from 'react';
import { MarkerCliquable } from './MarkerCliquable';

interface MarkerGroupeProps {
  position?: [number, number, number];
  taille?: number;
  couleur?: string;
  zone?: 'exterieur' | 'interieur';
}

export function MarkerGroupe({
  position = [0, 0, 0],
  taille = 10,
  couleur = '#ff6b00',
  zone,
}: MarkerGroupeProps) {
  return (
    <group position={position}>
      <MarkerCliquable taille={taille} couleur={couleur} zone={zone} />
    </group>
  );
}
