'use client';
import React from 'react';
import { MarkerCliquable } from '../equipements/MarkerCliquable';
import { useMarkersVisibles } from '@/hooks/useMarkersVisibles';

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
      {/* entree-1 : Porte d'entrée — côté droit du couloir, visible depuis l'extérieur */}
      <MarkerCliquable
        position={[2.5, 1.3, -4.6]}
        taille={22}
        zone="exterieur"
        libelle="Porte d'entrée"
        equipementId="entree-1"
      />
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
      {/* Façade principale beige - DIVISÉE pour créer les ouvertures */}

      {/* ══ PARTIE GAUCHE (avec ouvertures pour balcons) ══ */}

      {/* Partie gauche - segment gauche du RDC */}
      <mesh position={[-4.5, hauteurEtage/2, -profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[3, hauteurEtage, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>

      {/* Partie gauche - segment gauche étage 1 (avec ouverture balcon) */}
      <mesh position={[-5.25, hauteurEtage + hauteurEtage/2, -profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[1.5, hauteurEtage, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>
      <mesh position={[-3, hauteurEtage + hauteurEtage*0.75, -profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[3, hauteurEtage*0.5, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>

      {/* Partie gauche - segment gauche étage 2 (avec ouverture balcon) */}
      <mesh position={[-5.25, hauteurEtage*2 + hauteurEtage/2, -profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[1.5, hauteurEtage, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>
      <mesh position={[-3, hauteurEtage*2 + hauteurEtage*0.75, -profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[3, hauteurEtage*0.5, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>

      {/* Partie gauche - segment gauche étage 3 */}
      <mesh position={[-4.5, hauteurEtage*3 + hauteurEtage/2, -profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[3, hauteurEtage, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>

      {/* ══ PARTIE DROITE DE LA FAÇADE (toute hauteur) ══ */}
      <mesh position={[4.5, hauteurTotale/2, -profondeur/2]} castShadow receiveShadow>
        <boxGeometry args={[3, hauteurTotale, 0.3]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>

      {/* ══ PARTIE HAUTE au-dessus du couloir (étages 1-3) ══ */}
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
          {/* Plateforme du balcon */}
          <mesh position={[0, -0.05, 0.6]} castShadow receiveShadow>
            <boxGeometry args={[3, 0.1, 1.2]} />
            <meshStandardMaterial {...M(C_BALCON, 0.8)} />
          </mesh>

          {/* ══ GARDE-CORPS EN BOIS AVEC CÂBLES ══ */}

          {/* Poteaux verticaux en bois (poteaux principaux) */}
          {[-1.4, -0.7, 0, 0.7, 1.4].map((x, i) => (
            <mesh key={`poteau-${i}`} position={[x, 0.5, 1.15]} castShadow>
              <boxGeometry args={[0.08, 1.0, 0.08]} />
              <meshStandardMaterial {...M('#d4a574', 0.7)} />
            </mesh>
          ))}

          {/* Main courante supérieure en bois */}
          <mesh position={[0, 1.0, 1.15]} castShadow>
            <boxGeometry args={[3, 0.08, 0.1]} />
            <meshStandardMaterial {...M('#d4a574', 0.7)} />
          </mesh>

          {/* ══ CÂBLES MÉTALLIQUES HORIZONTAUX (partie haute) ══ */}
          {[0.85, 0.75, 0.65].map((yOffset, i) => (
            <mesh key={`cable-${i}`} position={[0, yOffset, 1.15]} castShadow>
              <cylinderGeometry args={[0.008, 0.008, 3, 8]} rotation={[0, 0, Math.PI/2]} />
              <meshStandardMaterial {...M('#4a4a4a', 0.3, 0.8)} />
            </mesh>
          ))}

          {/* ══ PARTIE BASSE AVEC LATTES HORIZONTALES EN BOIS ══ */}

          {/* Cadre bas en bois */}
          <mesh position={[0, 0.08, 1.15]} castShadow>
            <boxGeometry args={[3, 0.06, 0.08]} />
            <meshStandardMaterial {...M('#d4a574', 0.7)} />
          </mesh>

          {/* Lattes horizontales en bois (espacées régulièrement) */}
          {[0.15, 0.22, 0.29, 0.36, 0.43, 0.50].map((yOffset, i) => (
            <mesh key={`latte-${i}`} position={[0, yOffset, 1.15]} castShadow>
              <boxGeometry args={[3, 0.04, 0.02]} />
              <meshStandardMaterial {...M('#d4a574', 0.7)} />
            </mesh>
          ))}

          {/* Poteaux intermédiaires pour les lattes (plus fins) */}
          {[-1.05, -0.35, 0.35, 1.05].map((x, i) => (
            <mesh key={`poteau-inter-${i}`} position={[x, 0.3, 1.15]} castShadow>
              <boxGeometry args={[0.04, 0.5, 0.04]} />
              <meshStandardMaterial {...M('#d4a574', 0.7)} />
            </mesh>
          ))}

        </group>
      ))}
    </group>
  );
}

const BLEU_SURBRILLANCE = '#87ceeb';

function CouloirEntree({ M }: { M: Function }) {
  const { hoveredEquipementId } = useMarkersVisibles();
  const surbrillancePorte = hoveredEquipementId === 'entree-1';

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

      {/* Mur DROITE — percé pour la porte (ouverture z:0.55→1.45, y:0→2.1) */}
      {/* Segment avant (z: 0 → 0.55) */}
      <mesh position={[2.25, 1.2, 0.275]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 2.4, 0.55]} />
        <meshStandardMaterial {...M('#e8e8e8', 0.85)} />
      </mesh>
      {/* Segment arrière (z: 1.45 → 2) */}
      <mesh position={[2.25, 1.2, 1.725]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 2.4, 0.55]} />
        <meshStandardMaterial {...M('#e8e8e8', 0.85)} />
      </mesh>
      {/* Linteau au-dessus de la porte (y: 2.1 → 2.4, z: 0.55 → 1.45) */}
      <mesh position={[2.25, 2.25, 1]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.3, 0.9]} />
        <meshStandardMaterial {...M('#e8e8e8', 0.85)} />
      </mesh>

      {/* ── Porte d'entrée dans l'ouverture droite ── */}
      <group position={[2.18, 0, 1]} rotation={[0, Math.PI / 2, 0]}>
        {/* Cadre */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[0.94, 2.18, 0.1]} />
          <meshStandardMaterial color={surbrillancePorte ? BLEU_SURBRILLANCE : '#5c4a2a'} roughness={0.8} />
        </mesh>
        {/* Vantail */}
        <mesh position={[0, 1.05, 0.025]} castShadow>
          <boxGeometry args={[0.87, 2.06, 0.05]} />
          <meshStandardMaterial color={surbrillancePorte ? BLEU_SURBRILLANCE : C_PORTE_VERTE} roughness={0.55} />
        </mesh>
        {/* Panneau vitré supérieur */}
        <mesh position={[0, 1.6, 0.03]} castShadow>
          <boxGeometry args={[0.6, 0.55, 0.02]} />
          <meshStandardMaterial color={surbrillancePorte ? BLEU_SURBRILLANCE : C_FENETRE} roughness={0.1} metalness={0.4} transparent opacity={0.55} />
        </mesh>
        {/* Poignée */}
        <mesh position={[-0.32, 1.05, 0.06]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.1, 8]} />
          <meshStandardMaterial color="#b8b8b8" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

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
      {/* Sol de la véranda */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[4, 0.1, 3]} />
        <meshStandardMaterial {...M(C_BALCON, 0.8)} />
      </mesh>

      {/* ══ STRUCTURE DE LA VÉRANDA ══ */}

      {/* Poteaux d'angle en aluminium */}
      {[
        [-2, 1.2, -1.5],
        [2, 1.2, -1.5],
        [-2, 1.2, 1.5],
        [2, 1.2, 1.5],
      ].map((pos, i) => (
        <mesh key={`poteau-${i}`} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.08, 2.4, 0.08]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}

      {/* Traverses horizontales hautes */}
      <mesh position={[0, 2.4, -1.5]} castShadow>
        <boxGeometry args={[4, 0.08, 0.08]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 2.4, 1.5]} castShadow>
        <boxGeometry args={[4, 0.08, 0.08]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-2, 2.4, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, 3]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[2, 2.4, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, 3]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Toit en verre transparent */}
      <mesh position={[0, 2.45, 0]} rotation={[-Math.PI * 0.03, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.02, 3]} />
        <meshStandardMaterial
          color="#87ceeb"
          roughness={0.1}
          metalness={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* ══ PAROIS VITRÉES ══ */}

      {/* Paroi gauche vitrée */}
      <mesh position={[-2, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 2.3, 2.9]} />
        <meshStandardMaterial
          color="#87ceeb"
          roughness={0.1}
          metalness={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Paroi droite vitrée */}
      <mesh position={[2, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 2.3, 2.9]} />
        <meshStandardMaterial
          color="#87ceeb"
          roughness={0.1}
          metalness={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Paroi avant vitrée */}
      <mesh position={[0, 1.2, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[3.9, 2.3, 0.02]} />
        <meshStandardMaterial
          color="#87ceeb"
          roughness={0.1}
          metalness={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Porte coulissante vitrée (cadre visible) */}
      <group position={[1, 1.2, 1.52]}>
        {/* Cadre de porte en aluminium */}
        <mesh position={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[0.04, 2.2, 0.02]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0.5, 0, 0]} castShadow>
          <boxGeometry args={[0.04, 2.2, 0.02]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[1, 0.04, 0.02]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, -1.1, 0]} castShadow>
          <boxGeometry args={[1, 0.04, 0.02]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Poignée */}
        <mesh position={[0.4, 0, 0.04]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.08, 8]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* ══ MOBILIER DE VÉRANDA ══ */}

      {/* Table basse */}
      <group position={[0, 0.05, 0]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.04, 0.8]} />
          <meshStandardMaterial {...M('#8b6340', 0.6)} />
        </mesh>
        {/* Pieds de table */}
        {[
          [-0.5, 0.175, -0.35],
          [0.5, 0.175, -0.35],
          [-0.5, 0.175, 0.35],
          [0.5, 0.175, 0.35],
        ].map((pos, i) => (
          <mesh key={`pied-table-${i}`} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
            <meshStandardMaterial {...M('#6b4a28', 0.7)} />
          </mesh>
        ))}
      </group>

      {/* Chaises */}
      {[
        [-0.8, 0.05, -0.5],
        [0.8, 0.05, -0.5],
        [-0.8, 0.05, 0.5],
        [0.8, 0.05, 0.5],
      ].map((pos, i) => (
        <group key={`chaise-${i}`} position={pos as [number, number, number]}>
          {/* Assise */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.35, 0.04, 0.35]} />
            <meshStandardMaterial {...M('#8b6340', 0.6)} />
          </mesh>
          {/* Dossier */}
          <mesh position={[0, 0.65, -0.15]} castShadow>
            <boxGeometry args={[0.35, 0.5, 0.04]} />
            <meshStandardMaterial {...M('#8b6340', 0.6)} />
          </mesh>
          {/* Pieds */}
          {[
            [-0.14, 0.2, -0.14],
            [0.14, 0.2, -0.14],
            [-0.14, 0.2, 0.14],
            [0.14, 0.2, 0.14],
          ].map((pPos, j) => (
            <mesh key={`pied-chaise-${j}`} position={pPos as [number, number, number]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
              <meshStandardMaterial {...M('#6b4a28', 0.7)} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Plantes décoratives en pot */}
      {[
        [-1.8, 0.05, -1.3],
        [1.8, 0.05, -1.3],
        [-1.8, 0.05, 1.3],
        [1.8, 0.05, 1.3],
      ].map((pos, i) => (
        <group key={`plante-${i}`} position={pos as [number, number, number]}>
          {/* Pot */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.12, 0.3, 12]} />
            <meshStandardMaterial color="#8b4513" roughness={0.8} />
          </mesh>
          {/* Plante */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial color="#2d5a1e" roughness={0.9} />
          </mesh>
        </group>
      ))}

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
