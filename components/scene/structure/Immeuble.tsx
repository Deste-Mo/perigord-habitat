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
      <PorteEntree M={M} />
      <ToitEtElements M={M} />
      <TerrasseBois M={M} />
      <Lampadaires M={M} />
      <EquipementsExterieurs M={M} />
      {/* entree-1 : Porte d'entrée */}
      <MarkerCliquable
        position={[2.5, 1.3, -4.6]}
        taille={22}
        zone="exterieur"
        libelle="Porte d'entrée"
        equipementId="entree-1"
      />

      {/* collectif-1 : Ascenseur — façade droite */}
      <MarkerCliquable
        position={[7.0, 3.0, -0.8]}
        taille={22}
        zone="exterieur"
        libelle="Ascenseur"
        equipementId="collectif-1"
      />

      {/* collectif-2 : Interphone collectif — façade avant gauche */}
      <MarkerCliquable
        position={[-0.7, 2.2, -5.3]}
        taille={22}
        zone="exterieur"
        libelle="Interphone collectif"
        equipementId="collectif-2"
      />

      {/* collectif-3 : Chaufferie collective — derrière bâtiment */}
      <MarkerCliquable
        position={[0, 2.5, 14.5]}
        taille={22}
        zone="exterieur"
        libelle="Chaufferie collective"
        equipementId="collectif-3"
      />

      {/* collectif-4 : Compteur d'eau — façade avant gauche */}
      <MarkerCliquable
        position={[-3.8, 1.6, -5.3]}
        taille={22}
        zone="exterieur"
        libelle="Compteur d'eau"
        equipementId="collectif-4"
      />

      {/* collectif-5 : Éclairage parties communes — façade avant */}
      <MarkerCliquable
        position={[-2.4, 3.0, -5.3]}
        taille={22}
        zone="exterieur"
        libelle="Éclairage parties communes"
        equipementId="collectif-5"
      />

      {/* collectif-6 : Local poubelles — arrière gauche */}
      <MarkerCliquable
        position={[-8.5, 2.2, 6.5]}
        taille={22}
        zone="exterieur"
        libelle="Local poubelles"
        equipementId="collectif-6"
      />

      {/* collectif-7 : Local vélos — arrière centre */}
      <MarkerCliquable
        position={[2.5, 2.2, 7.5]}
        taille={22}
        zone="exterieur"
        libelle="Local vélos / poussettes"
        equipementId="collectif-7"
      />

      {/* collectif-8 : Espaces verts / aire de jeux — devant bâtiment */}
      <MarkerCliquable
        position={[0, 1.8, -10.0]}
        taille={22}
        zone="exterieur"
        libelle="Espaces verts / aire de jeux"
        equipementId="collectif-8"
      />

      {/* collectif-9 : Digicode — façade avant droite de l'entrée */}
      <MarkerCliquable
        position={[1.5, 1.9, -5.3]}
        taille={22}
        zone="exterieur"
        libelle="Digicode / badge d'accès"
        equipementId="collectif-9"
      />
    </group>
  );
}

function StructureBatiment({ M }: { M: Function }) {
  return (
    <group>
      {/* Corps principal plein – façade beige */}
      <mesh position={[0, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 12, 10]} />
        <meshStandardMaterial {...M(C_FACADE_BEIGE, 0.85)} />
      </mesh>

      {/* Bandeau vertical gris – partie droite de la façade avant */}
      <mesh position={[4.5, 6, -5.06]} castShadow>
        <boxGeometry args={[3, 12, 0.06]} />
        <meshStandardMaterial {...M(C_FACADE_GRISE, 0.8)} />
      </mesh>

      {/* Corniches inter-étages sur façade avant */}
      {[3, 6, 9].map((y, i) => (
        <mesh key={i} position={[0, y, -5.07]} castShadow>
          <boxGeometry args={[12, 0.14, 0.18]} />
          <meshStandardMaterial {...M('#ddd8cc', 0.7)} />
        </mesh>
      ))}

      {/* Soubassement béton */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[12.4, 0.4, 10.4]} />
        <meshStandardMaterial {...M('#b0b0b8', 0.9)} />
      </mesh>

      {/* Dalle RDC */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[12.5, 0.1, 10.5]} />
        <meshStandardMaterial {...M('#c0c0c0', 0.9)} />
      </mesh>
    </group>
  );
}

function FenetresEtVolets({ M }: { M: Function }) {
  const Z = -5.07;
  const fenetres = [
    { x: -4.5, y: 10.5, ouvert: false },
    { x: -1.5, y: 10.5, ouvert: true  },
    { x:  1.5, y: 10.5, ouvert: false },
    { x:  4.5, y: 10.5, ouvert: true  },
    { x: -4.5, y:  7.5, ouvert: true  },
    { x: -1.5, y:  7.5, ouvert: false },
    { x:  1.5, y:  7.5, ouvert: true  },
    { x:  4.5, y:  7.5, ouvert: false },
    { x: -4.5, y:  4.5, ouvert: false },
    { x: -1.5, y:  4.5, ouvert: true  },
    { x:  1.5, y:  4.5, ouvert: false },
    { x:  4.5, y:  4.5, ouvert: true  },
    { x: -4.5, y:  1.5, ouvert: false },
    { x: -1.5, y:  1.5, ouvert: true  },
  ];

  return (
    <group>
      {fenetres.map((f, i) => (
        <group key={i} position={[f.x, f.y, Z]}>
          {/* Cadre en béton clair */}
          <mesh castShadow>
            <boxGeometry args={[1.35, 1.6, 0.08]} />
            <meshStandardMaterial {...M('#e0d8c8', 0.7)} />
          </mesh>
          {/* Vitrage */}
          <mesh position={[0, 0, 0.03]} castShadow>
            <boxGeometry args={[1.12, 1.38, 0.04]} />
            <meshStandardMaterial {...M(C_FENETRE, 0.05, 0.6)} transparent opacity={0.65} />
          </mesh>
          {/* Reflet vitrage */}
          <mesh position={[-0.25, 0.3, 0.05]} castShadow>
            <boxGeometry args={[0.18, 0.55, 0.01]} />
            <meshStandardMaterial color="#e8f4ff" roughness={0.0} metalness={0.0} transparent opacity={0.18} />
          </mesh>
          {/* Volets */}
          {f.ouvert ? (
            <>
              <mesh position={[-0.82, 0, 0.04]} castShadow>
                <boxGeometry args={[0.2, 1.5, 0.04]} />
                <meshStandardMaterial {...M(C_VOLET, 0.65)} />
              </mesh>
              <mesh position={[0.82, 0, 0.04]} castShadow>
                <boxGeometry args={[0.2, 1.5, 0.04]} />
                <meshStandardMaterial {...M(C_VOLET, 0.65)} />
              </mesh>
            </>
          ) : (
            <mesh position={[0, 0, 0.06]} castShadow>
              <boxGeometry args={[1.38, 1.56, 0.04]} />
              <meshStandardMaterial {...M(C_VOLET, 0.65)} />
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
            <mesh key={`cable-${i}`} position={[0, yOffset, 1.15]} rotation={[0, 0, Math.PI/2]} castShadow>
              <cylinderGeometry args={[0.008, 0.008, 3, 8]} />
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

function PorteEntree({ M }: { M: Function }) {
  const { hoveredEquipementId } = useMarkersVisibles();
  const surbrillance = hoveredEquipementId === 'entree-1';
  const Z = -5.08;

  return (
    <group position={[2.18, 0, Z]}>
      {/* Marquise en verre au-dessus de la porte */}
      <mesh position={[0, 2.65, 0.28]} castShadow>
        <boxGeometry args={[1.5, 0.06, 0.6]} />
        <meshStandardMaterial color="#b8d8f0" roughness={0.08} metalness={0.5} transparent opacity={0.5} />
      </mesh>
      {[-0.65, 0.65].map((x, i) => (
        <mesh key={i} position={[x, 2.45, 0.5]} castShadow>
          <boxGeometry args={[0.04, 0.38, 0.6]} />
          <meshStandardMaterial color="#c8c8c8" roughness={0.2} metalness={0.85} />
        </mesh>
      ))}

      {/* Cadre de porte en bois foncé */}
      <mesh position={[0, 1.1, 0.03]} castShadow>
        <boxGeometry args={[1.02, 2.22, 0.07]} />
        <meshStandardMaterial color={surbrillance ? BLEU_SURBRILLANCE : '#5c4a2a'} roughness={0.75} />
      </mesh>
      {/* Vantail */}
      <mesh position={[0, 1.05, 0.08]} castShadow>
        <boxGeometry args={[0.88, 2.06, 0.05]} />
        <meshStandardMaterial color={surbrillance ? BLEU_SURBRILLANCE : C_PORTE_VERTE} roughness={0.5} />
      </mesh>
      {/* Panneau vitré supérieur */}
      <mesh position={[0, 1.67, 0.1]} castShadow>
        <boxGeometry args={[0.62, 0.56, 0.02]} />
        <meshStandardMaterial color={surbrillance ? BLEU_SURBRILLANCE : C_FENETRE} roughness={0.05} metalness={0.4} transparent opacity={0.6} />
      </mesh>
      {/* Poignée */}
      <mesh position={[-0.32, 1.05, 0.12]} castShadow>
        <boxGeometry args={[0.06, 0.18, 0.03]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* Marche béton */}
      <mesh position={[0, 0.06, 0.2]} receiveShadow>
        <boxGeometry args={[1.3, 0.12, 0.4]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.85} />
      </mesh>
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

// ─── Équipements extérieurs ───────────────────────────────────────────────────

function Ascenseur({ M }: { M: Function }) {
  return (
    <group position={[6.45, 0, -0.8]}>
      {/* Cage en verre structural */}
      <mesh position={[0, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 12, 1.8]} />
        <meshStandardMaterial color="#b8d4e8" roughness={0.05} metalness={0.3} transparent opacity={0.35} />
      </mesh>
      {/* Cadre aluminium – 4 colonnes */}
      {[[-0.72,-0.85],[-0.72,0.85],[0.72,-0.85],[0.72,0.85]].map(([x,z],i) => (
        <mesh key={i} position={[x, 6, z]} castShadow>
          <boxGeometry args={[0.06, 12.1, 0.06]} />
          <meshStandardMaterial color="#c8c8c8" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      {/* Traverses horizontales tous les 3 m */}
      {[0,3,6,9,12].map((y,i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <boxGeometry args={[1.5, 0.06, 1.8]} />
          <meshStandardMaterial color="#c8c8c8" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      {/* Cabine */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.38, 2.6, 1.65]} />
        <meshStandardMaterial color="#d0e4f0" roughness={0.1} metalness={0.4} transparent opacity={0.55} />
      </mesh>
      {/* Rails verticaux */}
      {[-0.6, 0.6].map((x,i) => (
        <mesh key={i} position={[x, 6, 0]} castShadow>
          <boxGeometry args={[0.04, 12, 0.06]} />
          <meshStandardMaterial color="#888" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
      {/* Machinerie toit */}
      <mesh position={[0, 12.6, 0]} castShadow>
        <boxGeometry args={[1.5, 0.5, 1.8]} />
        <meshStandardMaterial color="#9aafbe" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Dalle sol devant */}
      <mesh position={[-0.6, 0.01, 0]} receiveShadow>
        <boxGeometry args={[0.3, 0.04, 1.8]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.8} />
      </mesh>
    </group>
  );
}

function InterphoneEtDigicode({ M }: { M: Function }) {
  return (
    <group>
      {/* ─ Interphone ─ position sur façade avant gauche de l'entrée */}
      <group position={[-0.7, 1.35, -5.12]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.28, 0.04]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Grille haut-parleur */}
        {[-0.04,-0.02,0,0.02,0.04].map((y,i) => (
          <mesh key={i} position={[0, y+0.04, 0.023]} castShadow>
            <boxGeometry args={[0.08, 0.006, 0.01]} />
            <meshStandardMaterial color="#555" roughness={0.4} metalness={0.7} />
          </mesh>
        ))}
        {/* Bouton appel */}
        <mesh position={[0, -0.07, 0.025]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.015, 12]} />
          <meshStandardMaterial color="#e0a820" roughness={0.2} metalness={0.8} emissive="#e0a820" emissiveIntensity={0.3} />
        </mesh>
        {/* Caméra */}
        <mesh position={[0, -0.1, 0.025]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.02, 8]} />
          <meshStandardMaterial color="#111" roughness={0.1} metalness={0.5} />
        </mesh>
        {/* Plaque inox */}
        <mesh position={[0, 0.06, 0.021]} castShadow>
          <boxGeometry args={[0.1, 0.06, 0.005]} />
          <meshStandardMaterial color="#d4d4d4" roughness={0.15} metalness={0.9} />
        </mesh>
      </group>

      {/* ─ Digicode ─ droite de l'entrée */}
      <group position={[1.5, 1.1, -5.12]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.2, 0.04]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Touches numériques 3×4 */}
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(n => {
          const col = n % 3;
          const row = Math.floor(n / 3);
          return (
            <mesh key={n} position={[-0.028 + col*0.028, 0.065 - row*0.032, 0.024]} castShadow>
              <boxGeometry args={[0.022, 0.024, 0.008]} />
              <meshStandardMaterial color="#3a3a4a" roughness={0.4} metalness={0.4} />
            </mesh>
          );
        })}
        {/* LED verte */}
        <mesh position={[0, -0.075, 0.024]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.01, 8]} />
          <meshStandardMaterial color="#00e040" roughness={0.1} emissive="#00e040" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function Chaufferie({ M }: { M: Function }) {
  return (
    <group position={[0, 0, 14.0]}>
      {/* Corps du local */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial color="#b0a898" roughness={0.85} />
      </mesh>
      {/* Toit légèrement en pente */}
      <mesh position={[0, 3.12, 0]} rotation={[0, 0, 0.04]} castShadow>
        <boxGeometry args={[4.2, 0.18, 3.2]} />
        <meshStandardMaterial color="#888880" roughness={0.9} />
      </mesh>
      {/* Porte métallique */}
      <mesh position={[-0.05, 1.1, -1.52]} castShadow>
        <boxGeometry args={[0.9, 2.15, 0.06]} />
        <meshStandardMaterial color="#5a6570" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Poignée porte */}
      <mesh position={[0.35, 1.1, -1.56]} castShadow>
        <boxGeometry args={[0.06, 0.18, 0.04]} />
        <meshStandardMaterial color="#aaa" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Conduit cheminée */}
      <mesh position={[1, 4.2, 0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 2.4, 10]} />
        <meshStandardMaterial color="#606060" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Chapeau conduit */}
      <mesh position={[1, 5.45, 0.5]} castShadow>
        <cylinderGeometry args={[0.25, 0.14, 0.12, 10]} />
        <meshStandardMaterial color="#444" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Aération grille */}
      <mesh position={[2.02, 1.5, 0.2]} castShadow>
        <boxGeometry args={[0.04, 0.45, 0.55]} />
        <meshStandardMaterial color="#888" roughness={0.5} metalness={0.5} />
      </mesh>
      {[0.16,0.24,0.32,0.4,0.48].map((z,i) => (
        <mesh key={i} position={[2.04, 1.5, -0.075 + z]} castShadow>
          <boxGeometry args={[0.04, 0.04, 0.45]} />
          <meshStandardMaterial color="#666" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}
      {/* Panneau signalétique */}
      <mesh position={[0, 2.5, -1.54]} castShadow>
        <boxGeometry args={[0.55, 0.18, 0.01]} />
        <meshStandardMaterial color="#f0c040" roughness={0.4} />
      </mesh>
    </group>
  );
}

function CompteurEau({ M }: { M: Function }) {
  return (
    <group position={[-3.8, 0, -5.1]}>
      {/* Armoire murale */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.85, 0.16]} />
        <meshStandardMaterial color="#7a8a90" roughness={0.35} metalness={0.65} />
      </mesh>
      {/* Porte armoire */}
      <mesh position={[0, 0.7, -0.085]} castShadow>
        <boxGeometry args={[0.42, 0.82, 0.03]} />
        <meshStandardMaterial color="#8a9aa0" roughness={0.25} metalness={0.75} />
      </mesh>
      {/* Serrure */}
      <mesh position={[0.18, 0.7, -0.1]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.025, 8]} />
        <meshStandardMaterial color="#c0b060" roughness={0.2} metalness={0.85} />
      </mesh>
      {/* Tuyauterie apparente en bas */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
        <meshStandardMaterial color="#8090a0" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Étiquette bleue */}
      <mesh position={[0, 0.82, -0.1]} castShadow>
        <boxGeometry args={[0.28, 0.06, 0.005]} />
        <meshStandardMaterial color="#2060c0" roughness={0.4} />
      </mesh>
    </group>
  );
}

function EclairageParties({ M }: { M: Function }) {
  const positions: [number, number, number][] = [
    [-2.4, 2.5, -5.05],
    [2.4, 2.5, -5.05],
  ];
  return (
    <group>
      {positions.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          {/* Boîtier applique */}
          <mesh castShadow>
            <boxGeometry args={[0.18, 0.1, 0.14]} />
            <meshStandardMaterial color="#c0c0bc" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Diffuseur verre satiné */}
          <mesh position={[0, -0.07, 0.04]} castShadow>
            <boxGeometry args={[0.14, 0.09, 0.06]} />
            <meshStandardMaterial color="#fffff0" roughness={0.05} metalness={0.1} transparent opacity={0.75} emissive="#fff8e0" emissiveIntensity={0.9} />
          </mesh>
          {/* Point lumineux */}
          <pointLight position={[0, -0.12, 0.1]} intensity={1.8} distance={5} color="#fff5d0" castShadow={false} />
        </group>
      ))}
    </group>
  );
}

function LocalPoubelles({ M }: { M: Function }) {
  return (
    <group position={[-8.5, 0, 6.5]}>
      {/* Enclos – 3 murs béton */}
      <mesh position={[0, 1.0, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 2.0, 0.15]} />
        <meshStandardMaterial color="#b8b8b0" roughness={0.9} />
      </mesh>
      <mesh position={[-2.55, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 2.0, 3.0]} />
        <meshStandardMaterial color="#b8b8b0" roughness={0.9} />
      </mesh>
      <mesh position={[2.55, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 2.0, 3.0]} />
        <meshStandardMaterial color="#b8b8b0" roughness={0.9} />
      </mesh>
      {/* Portillon avant en métal */}
      <mesh position={[0, 1.0, 1.5]} castShadow>
        <boxGeometry args={[4.8, 1.85, 0.04]} />
        <meshStandardMaterial color="#606870" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Barreaux portillon */}
      {[-2,-1,0,1,2].map((x,i) => (
        <mesh key={i} position={[x, 1.0, 1.52]} castShadow>
          <boxGeometry args={[0.04, 1.85, 0.03]} />
          <meshStandardMaterial color="#4a5560" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
      {/* Bacs à ordures : vert, jaune, gris */}
      {[
        { x: -1.4, color: '#2a7a2a', label: 'verre' },
        { x:  0.0, color: '#d4a820', label: 'recyclage' },
        { x:  1.4, color: '#505050', label: 'ordures' },
      ].map(({ x, color }, i) => (
        <group key={i} position={[x, 0, 0.2]}>
          <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.62, 1.1, 0.72]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Couvercle */}
          <mesh position={[0, 1.12, 0]} castShadow>
            <boxGeometry args={[0.64, 0.08, 0.74]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
          {/* Roues */}
          {[-0.22, 0.22].map((xw,j) => (
            <mesh key={j} position={[xw, 0.06, 0.3]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 0.06, 10]} />
              <meshStandardMaterial color="#222" roughness={0.7} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Sol pavé */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <boxGeometry args={[5.0, 0.04, 3.0]} />
        <meshStandardMaterial color="#909090" roughness={0.95} />
      </mesh>
    </group>
  );
}

function LocalVelos({ M }: { M: Function }) {
  return (
    <group position={[2.5, 0, 7.5]}>
      {/* Poteaux structure */}
      {[[-2.8,-1.2],[-2.8,1.2],[2.8,-1.2],[2.8,1.2]].map(([x,z],i) => (
        <mesh key={i} position={[x, 1.2, z]} castShadow>
          <boxGeometry args={[0.06, 2.4, 0.06]} />
          <meshStandardMaterial color="#8a9aa8" roughness={0.25} metalness={0.85} />
        </mesh>
      ))}
      {/* Traverses hautes */}
      <mesh position={[0, 2.35, -1.2]} castShadow>
        <boxGeometry args={[5.6, 0.06, 0.06]} />
        <meshStandardMaterial color="#8a9aa8" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh position={[0, 2.35, 1.2]} castShadow>
        <boxGeometry args={[5.6, 0.06, 0.06]} />
        <meshStandardMaterial color="#8a9aa8" roughness={0.25} metalness={0.85} />
      </mesh>
      {/* Toiture ondulée translucide */}
      <mesh position={[0, 2.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.8, 0.05, 2.6]} />
        <meshStandardMaterial color="#b0c8e0" roughness={0.1} metalness={0.2} transparent opacity={0.5} />
      </mesh>
      {/* Paroi arrière (grillage) */}
      <mesh position={[0, 1.2, 1.25]} castShadow>
        <boxGeometry args={[5.6, 2.4, 0.02]} />
        <meshStandardMaterial color="#708090" roughness={0.5} metalness={0.5} transparent opacity={0.6} />
      </mesh>
      {/* Râteliers vélos – 4 arceaux */}
      {[-1.8,-0.9,0,0.9].map((x,i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.04, 0.8, 0.5]} />
            <meshStandardMaterial color="#607080" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}
      {/* Vélos symboliques (2) */}
      {[-1.5, 0.5].map((x,i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Cadre */}
          <mesh position={[0, 0.55, 0]} rotation={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[0.7, 0.04, 0.04]} />
            <meshStandardMaterial color="#c0302a" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Roue avant */}
          <mesh position={[0.35, 0.35, 0]} castShadow>
            <torusGeometry args={[0.28, 0.03, 8, 18]} />
            <meshStandardMaterial color="#333" roughness={0.6} />
          </mesh>
          {/* Roue arrière */}
          <mesh position={[-0.35, 0.35, 0]} castShadow>
            <torusGeometry args={[0.28, 0.03, 8, 18]} />
            <meshStandardMaterial color="#333" roughness={0.6} />
          </mesh>
        </group>
      ))}
      {/* Sol */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <boxGeometry args={[5.8, 0.04, 2.6]} />
        <meshStandardMaterial color="#a0a8b0" roughness={0.9} />
      </mesh>
    </group>
  );
}

function EspacesVerts({ M }: { M: Function }) {
  // Tout positionné EN FAÇADE du bâtiment (group Z < -5 = devant l'immeuble)
  // World X = -20 + group X → tous < -12 (hors clôture maison)
  const trees: [number, number, number][] = [
    [-8.0, 0, -7.5],  // world [-28,  0, -7.5] — façade gauche
    [-4.0, 0, -8.5],  // world [-24,  0, -8.5]
    [ 0.0, 0, -9.0],  // world [-20,  0, -9]   — façade centre
    [ 4.0, 0, -8.5],  // world [-16,  0, -8.5]
    [ 7.0, 0, -7.5],  // world [-13,  0, -7.5] — façade droite
    [-4.0, 0, 13.5],  // world [-24,  0, 13.5] — arrière, derrière chaufferie
    [ 4.0, 0, 13.5],  // world [-16,  0, 13.5] — arrière droite
  ];

  return (
    <group>
      {/* Arbres */}
      {trees.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.12, 0.20, 2.6, 8]} />
            <meshStandardMaterial color="#6b4226" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.4, 0]} castShadow>
            <sphereGeometry args={[1.2, 10, 10]} />
            <meshStandardMaterial color="#2d6a20" roughness={0.95} />
          </mesh>
          <mesh position={[0, 4.8, 0]} castShadow>
            <sphereGeometry args={[0.8, 10, 10]} />
            <meshStandardMaterial color="#358228" roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Grande pelouse en façade avant — world X: -27 à -13, Z: -7 à -12 */}
      <mesh position={[-0.5, 0.01, -8.5]} receiveShadow>
        <boxGeometry args={[14, 0.06, 5]} />
        <meshStandardMaterial color="#3a8c2a" roughness={0.98} />
      </mesh>

      {/* Pelouse arrière — derrière la chaufferie, loin des poubelles/vélos */}
      <mesh position={[0, 0.01, 13.5]} receiveShadow>
        <boxGeometry args={[10, 0.06, 4]} />
        <meshStandardMaterial color="#3a8c2a" roughness={0.98} />
      </mesh>

      {/* Allée piétonne centrale en façade */}
      <mesh position={[0, 0.02, -7.0]} receiveShadow>
        <boxGeometry args={[1.8, 0.04, 3]} />
        <meshStandardMaterial color="#c0b898" roughness={0.85} />
      </mesh>
      {/* Dalle de séparation allée/pelouse */}
      {[-0.9, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0.04, -7.0]} receiveShadow>
          <boxGeometry args={[0.08, 0.05, 3]} />
          <meshStandardMaterial color="#888880" roughness={0.8} />
        </mesh>
      ))}

      {/* Bancs publics de chaque côté de l'allée */}
      {[[-3.5, 0, -7.5], [3.5, 0, -7.5]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh position={[0, 0.42, 0]} castShadow>
            <boxGeometry args={[1.4, 0.06, 0.4]} />
            <meshStandardMaterial color="#8b6340" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.62, -0.15]} castShadow>
            <boxGeometry args={[1.4, 0.35, 0.05]} />
            <meshStandardMaterial color="#8b6340" roughness={0.6} />
          </mesh>
          {[-0.55, 0.55].map((bx, j) => (
            <mesh key={j} position={[bx, 0.21, 0]} castShadow>
              <boxGeometry args={[0.06, 0.42, 0.38]} />
              <meshStandardMaterial color="#6b4a28" roughness={0.7} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Aire de jeux — en façade avant-gauche, world [-25, 0, -12] */}
      <group position={[-5, 0, -12.5]}>
        {/* Sol caoutchouc rouge */}
        <mesh position={[0, 0.02, 0]} receiveShadow>
          <boxGeometry args={[6, 0.07, 4.5]} />
          <meshStandardMaterial color="#c03020" roughness={0.95} />
        </mesh>
        {/* Bordure béton */}
        {[
          [0, 0.06, -2.25, 6, 0.12, 0.15],
          [0, 0.06,  2.25, 6, 0.12, 0.15],
          [-3, 0.06, 0, 0.15, 0.12, 4.5],
          [ 3, 0.06, 0, 0.15, 0.12, 4.5],
        ].map(([px,py,pz,sx,sy,sz], i) => (
          <mesh key={i} position={[px,py,pz] as [number,number,number]} receiveShadow>
            <boxGeometry args={[sx,sy,sz] as [number,number,number]} />
            <meshStandardMaterial color="#909090" roughness={0.9} />
          </mesh>
        ))}
        {/* Toboggan – structure */}
        <mesh position={[-1.5, 0.95, -0.8]} castShadow>
          <boxGeometry args={[0.07, 1.9, 0.07]} />
          <meshStandardMaterial color="#e07020" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[-1.1, 0.95, -0.8]} castShadow>
          <boxGeometry args={[0.07, 1.9, 0.07]} />
          <meshStandardMaterial color="#e07020" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Toboggan – glissière */}
        <mesh position={[-0.5, 0.85, -0.8]} rotation={[0, 0, -0.52]} castShadow>
          <boxGeometry args={[0.04, 1.6, 0.55]} />
          <meshStandardMaterial color="#e8c020" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Portique balançoires */}
        <mesh position={[1.2, 1.7, 0]} castShadow>
          <boxGeometry args={[2.4, 0.07, 0.07]} />
          <meshStandardMaterial color="#4060b8" roughness={0.3} metalness={0.6} />
        </mesh>
        {[-0.7, 0.7].map((x, i) => (
          <group key={i} position={[x + 1.2, 0, 0]}>
            <mesh position={[0, 0.85, -0.6]} castShadow>
              <boxGeometry args={[0.05, 1.7, 0.05]} />
              <meshStandardMaterial color="#4060b8" roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.85, 0.6]} castShadow>
              <boxGeometry args={[0.05, 1.7, 0.05]} />
              <meshStandardMaterial color="#4060b8" roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.28, 0]} castShadow>
              <boxGeometry args={[0.3, 0.05, 0.2]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
            </mesh>
          </group>
        ))}
        {/* Bac à sable */}
        <mesh position={[-1.5, 0.08, 1.3]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.16, 1.4]} />
          <meshStandardMaterial color="#8b6914" roughness={0.9} />
        </mesh>
        <mesh position={[-1.5, 0.17, 1.3]} receiveShadow>
          <boxGeometry args={[1.46, 0.07, 1.26]} />
          <meshStandardMaterial color="#d4b860" roughness={0.98} />
        </mesh>
      </group>

      {/* Bordures béton de la pelouse avant */}
      <mesh position={[-0.5, 0.05, -5.6]} receiveShadow>
        <boxGeometry args={[14, 0.1, 0.12]} />
        <meshStandardMaterial color="#888880" roughness={0.85} />
      </mesh>
      <mesh position={[-0.5, 0.05, -11.1]} receiveShadow>
        <boxGeometry args={[14, 0.1, 0.12]} />
        <meshStandardMaterial color="#888880" roughness={0.85} />
      </mesh>
    </group>
  );
}

function EquipementsExterieurs({ M }: { M: Function }) {
  return (
    <group>
      <Ascenseur M={M} />
      <InterphoneEtDigicode M={M} />
      <Chaufferie M={M} />
      <CompteurEau M={M} />
      <EclairageParties M={M} />
      <LocalPoubelles M={M} />
      <LocalVelos M={M} />
      <EspacesVerts M={M} />
    </group>
  );
}
