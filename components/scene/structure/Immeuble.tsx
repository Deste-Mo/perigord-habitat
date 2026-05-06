'use client';
import React, { useState } from 'react';
import { useScene } from '@/hooks/useSceneStore';

// Couleurs
const C_FACADE_BEIGE = '#f5f0e8';
const C_FACADE_GRISE = '#6a7080';
const C_VOLET = '#f8f8f8';
const C_FENETRE = '#87ceeb';
const C_BALCON = '#8b6340';
const C_PORTE_VERTE = '#2d5a3a';
const C_TOIT = '#d0d0d0';
const C_CHEMINEE = '#8b4513';

interface Props {
  filDefer?: boolean;
}

export function Immeuble({ filDefer = false }: Props) {
  const M = (color: string, roughness: number, metalness = 0) =>
    ({ color, roughness, metalness, wireframe: filDefer });

  const posX = -20;
  const posZ = 0;

  return (
    <group position={[posX, 0, posZ]}>
      <StructureBatiment M={M} />
      <FenetresEtVolets M={M} />
      <Balcons M={M} />
      <CouloirEntree M={M} />
      <ToitEtElements M={M} />
      <TerrasseBois M={M} />
      <Lampadaires M={M} />
    </group>
  );
}

function StructureBatiment({ M }: { M: Function }) {
  const largeur = 12;
  const profondeur = 10;
  const hauteurEtage = 3;
  const nbEtages = 4;
  const hauteurTotale = hauteurEtage * nbEtages;

  return (
    <group>
      {/* Façade principale beige - DIVISÉE pour créer l'ouverture du couloir */}
      
      {/* Partie GAUCHE de la façade (toute hauteur) */}
      <mesh position={[-4.5, hauteurTotale/2, -profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[3, hauteurTotale, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>
      
      {/* Partie DROITE de la façade (toute hauteur) */}
      <mesh position={[4.5, hauteurTotale/2, -profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[3, hauteurTotale, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>
      
      {/* Partie HAUTE au-dessus du couloir (étages 1-3) */}
      <mesh position={[0, (hauteurTotale + hauteurEtage)/2, -profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[6, hauteurTotale - hauteurEtage, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>

      {/* Façade arrière beige */}
      <mesh position={[0, hauteurTotale/2, profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[largeur, hauteurTotale, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>

      {/* Façade gauche beige */}
      <mesh position={[-largeur/2, hauteurTotale/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, hauteurTotale, profondeur]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>

      {/* Façade droite grise */}
      <mesh position={[largeur/2, hauteurTotale/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, hauteurTotale, profondeur]} />
        <meshStandardMaterial {...M(C_FACADE_GRISE, 0.85)} />
      </mesh>

      {/* Dalle RDC */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[largeur + 0.5, 0.1, profondeur + 0.5]} />
        <meshStandardMaterial {...M('#c0c0c0', 0.9)} />
      </mesh>
    </group>
  );
}

function FenetresEtVolets({ M }: { M: Function }) {
  const fenetres = [
    { x: -4.5, y: 10.5, z: -5, ouvert: false },
    { x: -1.5, y: 10.5, z: -5, ouvert: true },
    { x: 1.5, y: 10.5, z: -5, ouvert: false },
    { x: 4.5, y: 10.5, z: -5, ouvert: true },
    { x: -4.5, y: 7.5, z: -5, ouvert: true },
    { x: -1.5, y: 7.5, z: -5, ouvert: false },
    { x: 1.5, y: 7.5, z: -5, ouvert: true },
    { x: 4.5, y: 7.5, z: -5, ouvert: false },
    { x: -4.5, y: 4.5, z: -5, ouvert: false },
    { x: -1.5, y: 4.5, z: -5, ouvert: true },
    { x: 1.5, y: 4.5, z: -5, ouvert: false },
    { x: 4.5, y: 4.5, z: -5, ouvert: true },
  ];

  return (
    <group>
      {fenetres.map((f, i) => (
        <group key={i} position={[f.x, f.y, f.z]}>
          <mesh position={[0, 0, 0.02]} castShadow>
            <boxGeometry args={[1.2, 1.4, 0.05]} />
            <meshStandardMaterial {...M(C_FENETRE, 0.1, 0.9)} transparent opacity={0.6} />
          </mesh>
          {f.ouvert ? (
            <>
              <mesh position={[-0.75, 0, 0.05]} castShadow>
                <boxGeometry args={[0.15, 1.4, 0.05]} />
                <meshStandardMaterial {...M(C_VOLET, 0.7)} />
              </mesh>
              <mesh position={[0.75, 0, 0.05]} castShadow>
                <boxGeometry args={[0.15, 1.4, 0.05]} />
                <meshStandardMaterial {...M(C_VOLET, 0.7)} />
              </mesh>
            </>
          ) : (
            <mesh position={[0, 0, 0.08]} castShadow>
              <boxGeometry args={[1.3, 1.45, 0.05]} />
              <meshStandardMaterial {...M(C_VOLET, 0.7)} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

function Balcons({ M }: { M: Function }) {
  return (
    <group>
      {[4.5, 7.5].map((y, idx) => (
        <group key={idx} position={[-3, y, -5.3]}>
          <mesh position={[0, -0.05, 0.6]} castShadow receiveShadow>
            <boxGeometry args={[3, 0.1, 1.2]} />
            <meshStandardMaterial {...M(C_BALCON, 0.8)} />
          </mesh>
          {Array.from({ length: 15 }, (_, i) => (
            <mesh key={i} position={[-1.4 + i * 0.2, 0.5, 1.15]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 1, 8]} />
              <meshStandardMaterial {...M('#3a3a3a', 0.4, 0.7)} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function CouloirEntree({ M }: { M: Function }) {
  return (
    <group position={[0, 0, -5]}>
      {/* Sol du couloir */}
      <mesh position={[0, 0.01, 1]} receiveShadow>
        <boxGeometry args={[4.5, 0.02, 2]} />
        <meshStandardMaterial {...M('#7a7a7a', 0.7)} />
      </mesh>
      
      {/* Mur GAUCHE */}
      <mesh position={[-2.25, 1.2, 1]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 2.4, 2]} />
        <meshStandardMaterial {...M('#e8e8e8', 0.85)} />
      </mesh>
      
      {/* Mur DROITE */}
      <mesh position={[2.25, 1.2, 1]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 2.4, 2]} />
        <meshStandardMaterial {...M('#e8e8e8', 0.85)} />
      </mesh>
      
      {/* Mur FOND */}
      <mesh position={[0, 1.2, 2]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 2.4, 0.15]} />
        <meshStandardMaterial {...M('#e8e8e8', 0.85)} />
      </mesh>
      
      {/* Plafond */}
      <mesh position={[0, 2.4, 1]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.08, 2]} />
        <meshStandardMaterial {...M('#f0f0f0', 0.8)} />
      </mesh>
      
      {/* ══ MURS INTÉRIEURS pour fermer les espaces vides ══ */}
      
      {/* Mur intérieur GAUCHE (entre mur extérieur et mur couloir) - RDC */}
      <mesh position={[-4.125, 1.2, 1.25]} castShadow receiveShadow>
        <boxGeometry args={[3.75, 2.4, 2.5]} />
        <meshStandardMaterial {...M('#e8e8e8', 0.85)} />
      </mesh>
      
      {/* Mur intérieur DROITE (entre mur couloir et mur extérieur) - RDC */}
      <mesh position={[4.125, 1.2, 1.25]} castShadow receiveShadow>
        <boxGeometry args={[3.75, 2.4, 2.5]} />
        <meshStandardMaterial {...M('#e8e8e8', 0.85)} />
      </mesh>
      
      {/* Plafond espace GAUCHE - RDC */}
      <mesh position={[-4.125, 2.4, 1.25]} castShadow receiveShadow>
        <boxGeometry args={[3.75, 0.08, 2.5]} />
        <meshStandardMaterial {...M('#f0f0f0', 0.8)} />
      </mesh>
      
      {/* Plafond espace DROITE - RDC */}
      <mesh position={[4.125, 2.4, 1.25]} castShadow receiveShadow>
        <boxGeometry args={[3.75, 0.08, 2.5]} />
        <meshStandardMaterial {...M('#f0f0f0', 0.8)} />
      </mesh>
      
      {/* Sol espace GAUCHE - RDC */}
      <mesh position={[-4.125, 0.01, 1.25]} receiveShadow>
        <boxGeometry args={[3.75, 0.02, 2.5]} />
        <meshStandardMaterial {...M('#7a7a7a', 0.7)} />
      </mesh>
      
      {/* Sol espace DROITE - RDC */}
      <mesh position={[4.125, 0.01, 1.25]} receiveShadow>
        <boxGeometry args={[3.75, 0.02, 2.5]} />
        <meshStandardMaterial {...M('#7a7a7a', 0.7)} />
      </mesh>
      
      {/* ══ REMPLISSAGE AU-DESSUS DU COULOIR (étages 1-3) ══ */}
      
      {/* Bloc intérieur au-dessus du couloir - étages supérieurs */}
      <mesh position={[0, 6, 1.25]} castShadow receiveShadow>
        <boxGeometry args={[12, 7.2, 2.5]} />
        <meshStandardMaterial {...M('#e8e8e8', 0.85)} />
      </mesh>
      
      {/* Ampoule au plafond */}
      <mesh position={[0, 2.25, 1]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffee"
          emissive="#ffeecc"
          emissiveIntensity={1.5}
          roughness={0.1}
        />
      </mesh>
      
      {/* Support ampoule */}
      <mesh position={[0, 2.32, 1]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.08, 8]} />
        <meshStandardMaterial {...M('#2a2a2a', 0.4, 0.7)} />
      </mesh>
      
      {/* Lumière */}
      <pointLight position={[0, 2.1, 1]} intensity={3} distance={8} color="#ffeecc" castShadow />
      
      {/* Porte appartement GAUCHE */}
      <group position={[-2.15, 1, 1]} rotation={[0, Math.PI/2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 2, 0.08]} />
          <meshStandardMaterial {...M('#5a3a1a', 0.7)} />
        </mesh>
        <mesh position={[0.35, 0, 0.05]} rotation={[0, 0, Math.PI/2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
          <meshStandardMaterial {...M('#c0c0c0', 0.2, 0.9)} />
        </mesh>
      </group>
      
      {/* Porte appartement DROITE */}
      <group position={[2.15, 1, 1]} rotation={[0, -Math.PI/2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 2, 0.08]} />
          <meshStandardMaterial {...M('#5a3a1a', 0.7)} />
        </mesh>
        <mesh position={[0.35, 0, 0.05]} rotation={[0, 0, Math.PI/2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
          <meshStandardMaterial {...M('#c0c0c0', 0.2, 0.9)} />
        </mesh>
      </group>
      
      {/* Boîtes aux lettres */}
      <group position={[-2.05, 1.2, 0.5]} rotation={[0, Math.PI/2, 0]}>
        {[0, 0.35, 0.7, 1.05].map((offsetY, i) => (
          <mesh key={i} position={[0, offsetY, 0]} castShadow>
            <boxGeometry args={[0.35, 0.3, 0.12]} />
            <meshStandardMaterial {...M('#3a3a3a', 0.5, 0.6)} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function EscalierExterieur({ M }: { M: Function }) {
  return (
    <group position={[2.5, 0, -5.5]}>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[0, 0.15 * i + 0.075, -0.25 * i]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.15, 0.3]} />
          <meshStandardMaterial {...M('#a0a0a0', 0.8)} />
        </mesh>
      ))}
    </group>
  );
}

function ToitEtElements({ M }: { M: Function }) {
  return (
    <group>
      <mesh position={[0, 12.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[12.5, 0.3, 10.5]} />
        <meshStandardMaterial {...M(C_TOIT, 0.75)} />
      </mesh>
      {[-4, -2, 0, 2, 4].map((offsetX, i) => (
        <group key={i} position={[offsetX, 12.3, -3]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.4, 0.8, 0.4]} />
            <meshStandardMaterial {...M(C_CHEMINEE, 0.9)} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function TerrasseBois({ M }: { M: Function }) {
  return (
    <group position={[-8, 0, -3]}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[4, 0.1, 3]} />
        <meshStandardMaterial {...M(C_BALCON, 0.8)} />
      </mesh>
    </group>
  );
}

function Lampadaires({ M }: { M: Function }) {
  return (
    <group>
      {[[-3], [0], [3]].map((pos, i) => (
        <group key={i} position={[8, 0, pos[0]]}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.06, 3, 8]} />
            <meshStandardMaterial {...M('#2a2a2a', 0.4, 0.7)} />
          </mesh>
          <mesh position={[0, 3.1, 0]} castShadow>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial 
              color="#ffffff"
              emissive="#ffeecc"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
