'use client';
import React from 'react';

interface Props {
  filDefer?: boolean;
}

export function Veranda({ filDefer = false }: Props) {
  const M = (color: string, roughness: number, metalness = 0, transparent = false, opacity = 1) =>
    ({ color, roughness, metalness, wireframe: filDefer, transparent, opacity });

  // Dimensions
  const largeur = 4;
  const profondeur = 3;
  const hauteur = 2.8;
  
  // Position : attachée à l'arrière de la maison (Z=5)
  const posX = 0;
  const posZ = 5 + profondeur/2;

  return (
    <group position={[posX, 0, posZ]}>
      
      {/* ══ SOL DE LA VÉRANDA ══ */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[largeur, 0.04, profondeur]} />
        <meshStandardMaterial {...M('#c8b898', 0.7)} />
      </mesh>
      
      {/* ══ STRUCTURE EN ALUMINIUM ══ */}
      
      {/* Poteaux d'angle */}
      {[
        [-largeur/2, 0, -profondeur/2],
        [largeur/2, 0, -profondeur/2],
        [-largeur/2, 0, profondeur/2],
        [largeur/2, 0, profondeur/2],
      ].map((pos, i) => (
        <mesh key={`poteau-${i}`} position={[pos[0], hauteur/2, pos[1]]} castShadow>
          <boxGeometry args={[0.08, hauteur, 0.08]} />
          <meshStandardMaterial {...M('#d0d0d0', 0.3, 0.8)} />
        </mesh>
      ))}
      
      {/* Traverses horizontales hautes */}
      <mesh position={[0, hauteur, -profondeur/2]} castShadow>
        <boxGeometry args={[largeur, 0.08, 0.08]} />
        <meshStandardMaterial {...M('#d0d0d0', 0.3, 0.8)} />
      </mesh>
      <mesh position={[0, hauteur, profondeur/2]} castShadow>
        <boxGeometry args={[largeur, 0.08, 0.08]} />
        <meshStandardMaterial {...M('#d0d0d0', 0.3, 0.8)} />
      </mesh>
      <mesh position={[-largeur/2, hauteur, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, profondeur]} />
        <meshStandardMaterial {...M('#d0d0d0', 0.3, 0.8)} />
      </mesh>
      <mesh position={[largeur/2, hauteur, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, profondeur]} />
        <meshStandardMaterial {...M('#d0d0d0', 0.3, 0.8)} />
      </mesh>
      
      {/* ══ TOIT EN VERRE ══ */}
      <mesh position={[0, hauteur + 0.04, 0]} rotation={[-Math.PI * 0.05, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[largeur, 0.02, profondeur]} />
        <meshStandardMaterial {...M('#87ceeb', 0.1, 0.5, true, 0.4)} />
      </mesh>
      
      {/* ══ PAROIS VITRÉES ══ */}
      
      {/* Paroi gauche */}
      <mesh position={[-largeur/2, hauteur/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, hauteur - 0.1, profondeur - 0.2]} />
        <meshStandardMaterial {...M('#87ceeb', 0.1, 0.5, true, 0.3)} />
      </mesh>
      
      {/* Paroi droite */}
      <mesh position={[largeur/2, hauteur/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, hauteur - 0.1, profondeur - 0.2]} />
        <meshStandardMaterial {...M('#87ceeb', 0.1, 0.5, true, 0.3)} />
      </mesh>
      
      {/* Paroi avant (avec porte coulissante) */}
      <mesh position={[0, hauteur/2, profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[largeur - 0.2, hauteur - 0.1, 0.02]} />
        <meshStandardMaterial {...M('#87ceeb', 0.1, 0.5, true, 0.3)} />
      </mesh>
      
      {/* ══ PORTE COULISSANTE (cadre visible) ══ */}
      <group position={[largeur/4, hauteur/2, profondeur/2 + 0.02]}>
        {/* Cadre de porte */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.04, hauteur - 0.2, 0.02]} />
          <meshStandardMaterial {...M('#d0d0d0', 0.3, 0.8)} />
        </mesh>
        <mesh position={[-largeur/4, hauteur/2 - 0.1, 0]} castShadow>
          <boxGeometry args={[largeur/2, 0.04, 0.02]} />
          <meshStandardMaterial {...M('#d0d0d0', 0.3, 0.8)} />
        </mesh>
        <mesh position={[-largeur/4, -hauteur/2 + 0.1, 0]} castShadow>
          <boxGeometry args={[largeur/2, 0.04, 0.02]} />
          <meshStandardMaterial {...M('#d0d0d0', 0.3, 0.8)} />
        </mesh>
      </group>
      
      {/* ══ MOBILIER DE VÉRANDA ══ */}
      
      {/* Table basse */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.04, 0.8]} />
          <meshStandardMaterial {...M('#8b6340', 0.6)} />
        </mesh>
        {/* Pieds de table */}
        {[
          [-0.5, 0.2, -0.35],
          [0.5, 0.2, -0.35],
          [-0.5, 0.2, 0.35],
          [0.5, 0.2, 0.35],
        ].map((pos, i) => (
          <mesh key={`pied-${i}`} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
            <meshStandardMaterial {...M('#6b4a28', 0.7)} />
          </mesh>
        ))}
      </group>
      
      {/* Chaises */}
      {[
        [-0.8, 0, -0.6],
        [0.8, 0, -0.6],
        [-0.8, 0, 0.6],
        [0.8, 0, 0.6],
      ].map((pos, i) => (
        <group key={`chaise-${i}`} position={pos as [number, number, number]}>
          {/* Assise */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[0.4, 0.04, 0.4]} />
            <meshStandardMaterial {...M('#8b6340', 0.6)} />
          </mesh>
          {/* Dossier */}
          <mesh position={[0, 0.75, -0.18]} castShadow>
            <boxGeometry args={[0.4, 0.6, 0.04]} />
            <meshStandardMaterial {...M('#8b6340', 0.6)} />
          </mesh>
          {/* Pieds */}
          {[
            [-0.15, 0.225, -0.15],
            [0.15, 0.225, -0.15],
            [-0.15, 0.225, 0.15],
            [0.15, 0.225, 0.15],
          ].map((pPos, j) => (
            <mesh key={`pied-chaise-${j}`} position={pPos as [number, number, number]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.45, 6]} />
              <meshStandardMaterial {...M('#6b4a28', 0.7)} />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Plantes décoratives */}
      {[
        [-largeur/2 + 0.3, 0, -profondeur/2 + 0.3],
        [largeur/2 - 0.3, 0, -profondeur/2 + 0.3],
      ].map((pos, i) => (
        <group key={`plante-${i}`} position={pos as [number, number, number]}>
          {/* Pot */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.12, 0.3, 12]} />
            <meshStandardMaterial {...M('#8b4513', 0.8)} />
          </mesh>
          {/* Plante */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial {...M('#2d5a1e', 0.9)} />
          </mesh>
        </group>
      ))}
      
    </group>
  );
}
