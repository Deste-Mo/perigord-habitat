'use client';
import React, { useRef } from 'react';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';
import { MarkerCliquable } from './MarkerCliquable';
import * as THREE from 'three';

interface Equipement3DProps {
  equipementId: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  type: 'porte' | 'serrure' | 'boiteAuxLettres' | 'luminaire' | 'interphone' | 'sonnette' | 'daaf' | 'grille';
  idPiece: string;
  idElement: string;
  libelle?: string;
  afficherMarker?: boolean;
  zone?: 'exterieur' | 'interieur';
}

export function Equipement3D({
  equipementId,
  position,
  rotation = [0, 0, 0],
  type,
  idPiece,
  idElement,
  libelle,
  afficherMarker = true,
  zone,
}: Equipement3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  const element = useElementSelectionnable({
    idPiece,
    idElement,
    equipementId,
    libelle,
    defaut: { couleur: getDefaultColor(type), rugosite: 0.5, metalique: 0.2 },
  });

  const M = {
    color: element.estSelectionne ? '#00e5ff' : element.materiau.couleur,
    roughness: element.materiau.rugosite,
    metalness: element.materiau.metalique,
    emissive: element.emissif,
    emissiveIntensity: element.intensiteEmissif,
  };

  const markerOffset = getMarkerOffset(type);

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <group {...element.propsInteraction}>
        {renderEquipement(type, M)}
      </group>

      {afficherMarker && !element.estSelectionne && (
        <MarkerCliquable
          position={markerOffset}
          taille={getMarkerSize(type)}
          zone={zone}
          idPiece={idPiece}
        />
      )}
    </group>
  );
}

function getDefaultColor(type: string): string {
  const colors: Record<string, string> = {
    porte: '#5a3a1a',
    serrure: '#c0c0c0',
    boiteAuxLettres: '#3a3a3a',
    luminaire: '#f9fafb',
    interphone: '#374151',
    sonnette: '#374151',
    daaf: '#ffffff',
    grille: '#e5e7eb',
  };
  return colors[type] || '#cccccc';
}

function getMarkerOffset(type: string): [number, number, number] {
  const offsets: Record<string, [number, number, number]> = {
    porte: [0, 0, 0],
    serrure: [0, 0, 0],
    boiteAuxLettres: [0, 0, 0],
    luminaire: [0, 0, 0],
    interphone: [0, 0, 0],
    sonnette: [0, 0, 0],
    daaf: [0, 0, 0],
    grille: [0, 0, 0],
  };
  return offsets[type] || [0, 0, 0];
}

function getMarkerSize(type: string): number {
  const sizes: Record<string, number> = {
    porte: 24,
    serrure: 16,
    boiteAuxLettres: 20,
    luminaire: 20,
    interphone: 18,
    sonnette: 18,
    daaf: 16,
    grille: 18,
  };
  return sizes[type] || 20;
}

function renderEquipement(type: string, M: any) {
  switch (type) {
    case 'porte':
      return (
        <>
          <mesh castShadow>
            <boxGeometry args={[0.9, 2.1, 0.08]} />
            <meshStandardMaterial {...M} />
          </mesh>
          <mesh position={[0.35, 0, 0.05]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
            <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.9} />
          </mesh>
        </>
      );

    case 'serrure':
      return (
        <>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.06, 12]} />
            <meshStandardMaterial {...M} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[0.04, 0.08, 0.002]} />
            <meshStandardMaterial {...M} />
          </mesh>
        </>
      );

    case 'boiteAuxLettres':
      return (
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.3, 0.12]} />
          <meshStandardMaterial {...M} />
        </mesh>
      );

    case 'luminaire':
      return (
        <>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.05, 12]} />
            <meshStandardMaterial {...M} />
          </mesh>
          <pointLight position={[0, -0.1, 0]} intensity={0.5} distance={3} color="#fff5e0" />
        </>
      );

    case 'interphone':
    case 'sonnette':
      return (
        <>
          <mesh castShadow>
            <boxGeometry args={[0.02, 0.12, 0.08]} />
            <meshStandardMaterial {...M} />
          </mesh>
          <mesh position={[0.015, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.022, 0.022, 0.01, 10]} />
            <meshStandardMaterial color="#1e40af" roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[0.015, -0.03, 0]}>
            <boxGeometry args={[0.01, 0.04, 0.06]} />
            <meshStandardMaterial color="#1f2937" roughness={0.7} />
          </mesh>
        </>
      );

    case 'daaf':
      return (
        <>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
            <meshStandardMaterial {...M} />
          </mesh>
          <mesh position={[0, -0.025, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.002, 8]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
          </mesh>
        </>
      );

    case 'grille':
      return (
        <>
          <mesh castShadow>
            <boxGeometry args={[0.25, 0.25, 0.02]} />
            <meshStandardMaterial {...M} />
          </mesh>
          {Array.from({ length: 8 }, (_, i) => (
            <mesh key={i} position={[-0.1 + i * 0.028, 0, 0.015]}>
              <boxGeometry args={[0.002, 0.22, 0.01]} />
              <meshStandardMaterial color="#6b7280" roughness={0.6} />
            </mesh>
          ))}
        </>
      );

    default:
      return (
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial {...M} />
        </mesh>
      );
  }
}
