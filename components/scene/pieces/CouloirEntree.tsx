'use client';
import { Suspense } from 'react';
import { useTexture } from '@react-three/drei';
import { Sol } from '../structure/Sol';
import { Interrupteur3D } from '../structure/Interrupteur3D';
import { MarkerCliquable } from '../equipements/MarkerCliquable';
import { ZonePiece } from '../equipements/ZonePiece';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';
import { getEquipementNom } from '@/lib/equipements';

function PhotoCadre({ estSelectionne }: { estSelectionne: boolean }) {
  const texture = useTexture('/images/house.img/sallon.jpg');
  return (
    <>
      {/* Cadre bois foncé */}
      <mesh castShadow>
        <boxGeometry args={[0.72, 0.54, 0.025]} />
        <meshPhysicalMaterial color={estSelectionne ? '#00e5ff' : '#2c1a10'} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Passe-partout crème */}
      <mesh position={[0, 0, 0.012]}>
        <boxGeometry args={[0.64, 0.46, 0.01]} />
        <meshStandardMaterial color="#f0ece3" roughness={0.95} />
      </mesh>
      {/* Photo */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.58, 0.40]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
}

/**
 * COULOIR D'ENTRÉE — entre séjour (X ≤ -1.8) et cuisine (X ≥ 0.75)
 *
 * Cloisons de référence (StructureMaison) :
 *   Cloison gauche : X = -1.8  (Z : -5.0 → 1.5)
 *   Cloison droite : X =  0.75 (Z : -5.0 → 1.5)
 *
 * Limites murs intérieurs (em = 0.125) :
 *   X : -1.675 (face séjour)  →  0.625 (face cuisine)   largeur  = 2.3 m
 *   Z : -4.875 (mur avant)    →  1.375 (cloison chambre) profondeur = 6.25 m
 *
 * Sol : centre (-0.525, -1.75), 2.3 m × 6.25 m
 * Porte d'entrée principale : Z ≈ -4.875, X ≈ -1.05 (P_ENTREE dans StructureMaison)
 *
 * Équipements présents (data/equipements.json) :
 *   entree-1  Porte d'entrée
 *   entree-2  Serrure et verrou de sécurité
 *   entree-3  Boîte aux lettres (fente intérieure)
 *   entree-4  Revêtement de sol
 *   entree-5  Revêtement mural
 *   entree-6  Luminaire (plafonnier + interrupteur)
 *   entree-7  Interphone / visiophone (unité intérieure)
 *   entree-8  Sonnette de porte (buzzer intérieur)
 *   entree-9  Détecteur de fumée DAAF
 *   entree-10 Grille de ventilation
 */

interface Props { lumiere: boolean; filDefer?: boolean; masquerPlafond?: boolean }

export function CouloirEntree({ lumiere, filDefer = false, masquerPlafond = false }: Props) {
  // ── entree-1 · Porte d'entrée ─────────────────────────────────────────────
  const porte       = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'porte',       equipementId: 'entree-1', defaut: { couleur: '#8b6f47', rugosite: 0.65, metalique: 0.05 } });
  // ── entree-2 · Serrure et verrou ──────────────────────────────────────────
  const serrure     = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'serrure',     equipementId: 'entree-2', defaut: { couleur: '#b0b8c1', rugosite: 0.15, metalique: 0.95 } });
  // ── entree-3 · Boîte aux lettres ──────────────────────────────────────────
  const boite       = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'boite',       equipementId: 'entree-3', defaut: { couleur: '#374151', rugosite: 0.4,  metalique: 0.5 } });
  // ── entree-4 · Revêtement de sol ──────────────────────────────────────────
  const sol         = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'sol',         equipementId: 'entree-4', defaut: { couleur: '#7a3a1e', rugosite: 0.95, metalique: 0 } });
  // ── entree-5 · Revêtement mural ───────────────────────────────────────────
  const revMural    = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'revMural',    equipementId: 'entree-5', defaut: { couleur: '#e8e4dc', rugosite: 0.9,  metalique: 0 } });
  // ── entree-6 · Luminaire ──────────────────────────────────────────────────
  const plafonnier  = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'plafonnier',  equipementId: 'entree-6', defaut: { couleur: '#f9fafb', rugosite: 0.3,  metalique: 0 } });
  // ── entree-7 · Interphone / visiophone ────────────────────────────────────
  const interphone  = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'interphone',  equipementId: 'entree-7', defaut: { couleur: '#1f2937', rugosite: 0.3,  metalique: 0.4 } });
  // ── entree-8 · Sonnette de porte ──────────────────────────────────────────
  const sonnette    = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'sonnette',    equipementId: 'entree-8', defaut: { couleur: '#374151', rugosite: 0.3,  metalique: 0.3 } });
  // ── entree-9 · Détecteur de fumée DAAF ────────────────────────────────────
  const daaf        = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'daaf',        equipementId: 'entree-9', defaut: { couleur: '#f3f4f6', rugosite: 0.3,  metalique: 0.1 } });
  // ── entree-10 · Grille de ventilation ─────────────────────────────────────
  const ventilation = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'ventilation', equipementId: 'entree-10', defaut: { couleur: '#9ca3af', rugosite: 0.4, metalique: 0.3 } });

  const mat = (s: ReturnType<typeof useElementSelectionnable>) => ({
    color:             s.estSelectionne ? '#00e5ff' : s.materiau.couleur,
    roughness:         s.materiau.rugosite,
    metalness:         s.materiau.metalique,
    emissive:          s.emissif,
    emissiveIntensity: s.intensiteEmissif,
  });

  return (
    <group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-4 · REVÊTEMENT DE SOL (carrelage clair, distinct du séjour)
          X : -1.675 → 0.625 (2.3 m) · Z : -4.875 → 1.375 (6.25 m)
         ══════════════════════════════════════════════════════════════════════ */}
      {/* ── Carrelage de base (non sélectionnable) ── */}
      <Sol
        x={-0.525} z={-1.75} largeur={2.3} profondeur={6.25}
        couleur="#cdc8c0" rugosite={0.35} filDefer={filDefer}
        clearcoat={0.3} clearcoatRoughness={0.1}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          entree-4 · TAPIS RUNNER — centré, plus étroit que le couloir
          Largeur 1.5 m, longueur 5.7 m, surélevé de 2.5 cm sur le carrelage
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...sol.propsInteraction}>
        {/* Bordure foncée */}
        <mesh position={[-0.525, 0.101, -1.75]} receiveShadow>
          <boxGeometry args={[1.62, 0.007, 5.82]} />
          <meshPhysicalMaterial
            color={sol.estSelectionne ? '#00e5ff' : '#2a1205'}
            roughness={0.92} metalness={0}
            emissive={sol.emissif} emissiveIntensity={sol.intensiteEmissif}
          />
        </mesh>
        {/* Corps principal du tapis */}
        <mesh position={[-0.525, 0.112, -1.75]} receiveShadow castShadow>
          <boxGeometry args={[1.5, 0.018, 5.7]} />
          <meshPhysicalMaterial
            color={sol.estSelectionne ? '#00e5ff' : sol.materiau.couleur}
            roughness={sol.materiau.rugosite} metalness={sol.materiau.metalique}
            emissive={sol.emissif} emissiveIntensity={sol.intensiteEmissif}
          />
        </mesh>
        {/* Bande intérieure décorative */}
        <mesh position={[-0.525, 0.121, -1.75]}>
          <boxGeometry args={[1.15, 0.004, 5.4]} />
          <meshPhysicalMaterial
            color={sol.estSelectionne ? '#00e5ff' : '#b07850'}
            roughness={0.97} metalness={0}
          />
        </mesh>
        {/* Liseret central */}
        <mesh position={[-0.525, 0.122, -1.75]}>
          <boxGeometry args={[0.06, 0.002, 5.2]} />
          <meshPhysicalMaterial
            color={sol.estSelectionne ? '#00e5ff' : '#e8c89a'}
            roughness={0.96} metalness={0}
          />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-5 · REVÊTEMENT MURAL — cadre photo sur cloison droite (cuisine)
          Position : mur du fond (Z=1.35), centré X=-0.525, H=1.6m, face à la porte
         ══════════════════════════════════════════════════════════════════════ */}
      <group
        {...revMural.propsInteraction}
        position={[-0.525, 1.6, 1.35]}
        rotation={[0, Math.PI, 0]}
      >
        <Suspense fallback={null}>
          <PhotoCadre estSelectionne={revMural.estSelectionne} />
        </Suspense>
      </group>

      {/* ── Plafond ── */}
      {!masquerPlafond && (
        <mesh position={[-0.525, 2.8, -1.75]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.3, 6.25]} />
          <meshStandardMaterial color="#6b7280" roughness={0.9} />
        </mesh>
      )}

      {/* ── Éclairage ambiant ── */}
      {lumiere && (
        <rectAreaLight
          position={[-0.525, 2.76, -1.75]} rotation={[-Math.PI / 2, 0, 0]}
          width={1.8} height={5.0} intensity={2.0} color="#ffd580"
        />
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          entree-6 · LUMINAIRE — plafonnier central + interrupteur mural
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...plafonnier.propsInteraction} position={[-0.525, 2.72, -2.5]}>
        {/* Rosace */}
        <mesh>
          <cylinderGeometry args={[0.13, 0.1, 0.05, 16]} />
          <meshStandardMaterial
            color={plafonnier.estSelectionne ? '#00e5ff' : (lumiere ? '#fffde7' : plafonnier.materiau.couleur)}
            emissive={lumiere ? '#ffd580' : '#000000'}
            emissiveIntensity={lumiere ? 1.6 : 0}
            roughness={plafonnier.materiau.rugosite}
            metalness={plafonnier.materiau.metalique}
          />
        </mesh>
        {/* Abat-jour */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.09, 0.06, 0.12, 16]} />
          <meshStandardMaterial
            color={lumiere ? '#fffde7' : '#e5e7eb'}
            emissive={lumiere ? '#ffd580' : '#000000'}
            emissiveIntensity={lumiere ? 0.8 : 0}
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* Interrupteur lumière — mur avant, à droite de la porte */}
      <Interrupteur3D
        position={[-0.2, 1.2, -4.86]}
        rotation={[0, 0, 0]}
        idPiece="couloirEntree"
        lumiere={lumiere}
        equipementId="entree-6"
      />

      {/* ══════════════════════════════════════════════════════════════════════
          entree-1 · PORTE D'ENTRÉE — face intérieure sélectionnable
          (la porte physique est rendue par StructureMaison à [-1.05,0,-4.98])
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...porte.propsInteraction} position={[-1.05, 0, -4.85]}>
        {/* Panneau bois */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[0.88, 2.1, 0.05]} />
          <meshPhysicalMaterial {...mat(porte)} clearcoat={0.3} clearcoatRoughness={0.3} />
        </mesh>
        {/* Moulure haute */}
        <mesh position={[0, 1.82, 0.027]}>
          <boxGeometry args={[0.82, 0.52, 0.01]} />
          <meshPhysicalMaterial {...mat(porte)} />
        </mesh>
        {/* Moulure basse */}
        <mesh position={[0, 0.38, 0.027]}>
          <boxGeometry args={[0.82, 0.62, 0.01]} />
          <meshPhysicalMaterial {...mat(porte)} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-2 · SERRURE ET VERROU — face intérieure porte
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...serrure.propsInteraction} position={[-0.68, 1.0, -4.82]}>
        {/* Corps serrure */}
        <mesh castShadow>
          <boxGeometry args={[0.045, 0.18, 0.022]} />
          <meshPhysicalMaterial {...mat(serrure)} />
        </mesh>
        {/* Poignée barre */}
        <mesh position={[0, -0.05, 0.025]}>
          <boxGeometry args={[0.016, 0.11, 0.016]} />
          <meshPhysicalMaterial {...mat(serrure)} />
        </mesh>
        {/* Bouton poignée horizontal */}
        <mesh position={[0, -0.09, 0.04]}>
          <boxGeometry args={[0.07, 0.016, 0.016]} />
          <meshPhysicalMaterial {...mat(serrure)} />
        </mesh>
        {/* Cylindre barillet */}
        <mesh position={[0, 0.06, 0.024]}>
          <cylinderGeometry args={[0.014, 0.014, 0.02, 10]} rotation={[Math.PI / 2, 0, 0]} />
          <meshPhysicalMaterial color={serrure.estSelectionne ? '#00e5ff' : '#d4af37'} roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Verrou pêne */}
        <mesh position={[-0.04, 0.06, 0.012]}>
          <boxGeometry args={[0.025, 0.04, 0.012]} />
          <meshPhysicalMaterial {...mat(serrure)} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-3 · BOÎTE AUX LETTRES — fente intérieure sur la porte
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...boite.propsInteraction} position={[-1.0, 1.38, -4.82]}>
        {/* Cadre fente */}
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.06, 0.025]} />
          <meshPhysicalMaterial {...mat(boite)} />
        </mesh>
        {/* Ouverture fente */}
        <mesh position={[0, 0, 0.014]}>
          <boxGeometry args={[0.17, 0.022, 0.005]} />
          <meshPhysicalMaterial color="#111827" roughness={0.9} metalness={0} emissive="#000000" emissiveIntensity={0} />
        </mesh>
        {/* Rabat coupe-froid */}
        <mesh position={[0, -0.01, 0.016]}>
          <boxGeometry args={[0.17, 0.015, 0.002]} />
          <meshPhysicalMaterial color={boite.estSelectionne ? '#00e5ff' : '#1f2937'} roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-7 · INTERPHONE / VISIOPHONE — unité intérieure
          Cloison séjour (X≈-1.67), face couloir, h=1.4 m
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...interphone.propsInteraction} position={[-1.66, 1.4, -3.8]} rotation={[0, Math.PI / 2, 0]}>
        {/* Boîtier principal */}
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.26, 0.03]} />
          <meshPhysicalMaterial {...mat(interphone)} clearcoat={0.4} clearcoatRoughness={0.2} />
        </mesh>
        {/* Écran */}
        <mesh position={[0, 0.05, 0.017]}>
          <boxGeometry args={[0.14, 0.12, 0.005]} />
          <meshStandardMaterial
            color={interphone.estSelectionne ? '#00e5ff' : (lumiere ? '#1e3a8a' : '#111827')}
            emissive={lumiere ? '#1e3a8a' : '#000000'}
            emissiveIntensity={lumiere ? 0.4 : 0}
            roughness={0.05}
            metalness={0.2}
          />
        </mesh>
        {/* Haut-parleur (grille) */}
        <mesh position={[-0.045, -0.07, 0.017]}>
          <boxGeometry args={[0.055, 0.055, 0.003]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.9} metalness={0.1} />
        </mesh>
        {/* Bouton décrocher */}
        <mesh position={[0.045, -0.07, 0.018]}>
          <cylinderGeometry args={[0.016, 0.016, 0.008, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshPhysicalMaterial color="#22c55e" roughness={0.3} metalness={0.4} emissive="#22c55e" emissiveIntensity={lumiere ? 0.5 : 0.1} />
        </mesh>
        {/* Bouton fin d'appel */}
        <mesh position={[0.045, -0.095, 0.018]}>
          <cylinderGeometry args={[0.016, 0.016, 0.008, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshPhysicalMaterial color="#ef4444" roughness={0.3} metalness={0.4} emissive="#ef4444" emissiveIntensity={0.1} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-8 · SONNETTE DE PORTE — buzzer intérieur
          Cloison droite (X≈0.62), face couloir, h=1.4 m, près de la porte
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...sonnette.propsInteraction} position={[0.61, 1.4, -4.2]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Boîtier buzzer */}
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.08, 0.025]} />
          <meshPhysicalMaterial {...mat(sonnette)} clearcoat={0.3} clearcoatRoughness={0.3} />
        </mesh>
        {/* Membrane vibrante */}
        <mesh position={[0, 0, 0.015]}>
          <cylinderGeometry args={[0.028, 0.028, 0.005, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshPhysicalMaterial color={sonnette.estSelectionne ? '#00e5ff' : '#6b7280'} roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Voyant LED */}
        <mesh position={[0.04, 0, 0.016]}>
          <cylinderGeometry args={[0.007, 0.007, 0.003, 10]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={lumiere ? 0.8 : 0.1} roughness={0.2} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-9 · DÉTECTEUR DE FUMÉE DAAF — plafond, centre du couloir
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...daaf.propsInteraction} position={[-0.525, 2.77, -1.75]}>
        {/* Corps cylindrique */}
        <mesh castShadow>
          <cylinderGeometry args={[0.065, 0.072, 0.028, 20]} />
          <meshPhysicalMaterial {...mat(daaf)} clearcoat={0.2} clearcoatRoughness={0.3} />
        </mesh>
        {/* Face basse (grille) */}
        <mesh position={[0, -0.015, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.006, 20]} />
          <meshPhysicalMaterial color={daaf.estSelectionne ? '#00e5ff' : '#d1d5db'} roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Voyant LED rouge */}
        <mesh position={[0.04, -0.015, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.002, 8]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.7} roughness={0.15} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-10 · GRILLE DE VENTILATION — cloison séjour (X≈-1.675), haut
         ══════════════════════════════════════════════════════════════════════ */}
      <mesh {...ventilation.propsInteraction} position={[-1.65, 2.55, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.28, 0.16, 0.025]} />
        <meshStandardMaterial {...mat(ventilation)} />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} {...ventilation.propsInteraction} position={[-1.64, 2.55 - 0.06 + i * 0.014, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.24, 0.008, 0.006]} />
          <meshStandardMaterial {...mat(ventilation)} />
        </mesh>
      ))}

      {/* ══════════════════════════════════════════════════════════════════════
          ZONE PIÈCE — survol → highlight + tooltip, clic → affiche les markers
         ══════════════════════════════════════════════════════════════════════ */}
      <ZonePiece
        idPiece="couloirEntree"
        nom="Couloir d'entrée"
        x={-0.525} z={-1.75} largeur={2.3} profondeur={6.25}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          MARKERS ORANGE — visibles uniquement si pieceMarkersActive=couloirEntree
         ══════════════════════════════════════════════════════════════════════ */}
      {!porte.estSelectionne && (
        <MarkerCliquable position={[-1.05, 1.8, -4.78]} libelle={getEquipementNom('entree-1')} equipementId="entree-1" idPiece="couloirEntree" />
      )}
      {!serrure.estSelectionne && (
        <MarkerCliquable position={[-0.68, 1.15, -4.77]} libelle={getEquipementNom('entree-2')} equipementId="entree-2" idPiece="couloirEntree" />
      )}
      {!boite.estSelectionne && (
        <MarkerCliquable position={[-1.0, 1.6, -4.77]} libelle={getEquipementNom('entree-3')} equipementId="entree-3" idPiece="couloirEntree" />
      )}
      {!sol.estSelectionne && (
        <MarkerCliquable position={[-0.525, 0.22, -2.8]} libelle={getEquipementNom('entree-4')} equipementId="entree-4" idPiece="couloirEntree" />
      )}
      {!revMural.estSelectionne && (
        <MarkerCliquable position={[-0.525, 1.92, 1.3]} libelle={getEquipementNom('entree-5')} equipementId="entree-5" idPiece="couloirEntree" />
      )}
      {!plafonnier.estSelectionne && (
        <MarkerCliquable position={[-0.525, 2.52, -2.5]} libelle={getEquipementNom('entree-6')} equipementId="entree-6" idPiece="couloirEntree" />
      )}
      {!interphone.estSelectionne && (
        <MarkerCliquable position={[-1.48, 1.6, -3.8]} libelle={getEquipementNom('entree-7')} equipementId="entree-7" idPiece="couloirEntree" />
      )}
      {!sonnette.estSelectionne && (
        <MarkerCliquable position={[0.44, 1.6, -4.2]} libelle={getEquipementNom('entree-8')} equipementId="entree-8" idPiece="couloirEntree" />
      )}
      {!daaf.estSelectionne && (
        <MarkerCliquable position={[-0.525, 2.57, -1.75]} libelle={getEquipementNom('entree-9')} equipementId="entree-9" idPiece="couloirEntree" />
      )}
      {!ventilation.estSelectionne && (
        <MarkerCliquable position={[-1.48, 2.55, -0.5]} libelle={getEquipementNom('entree-10')} equipementId="entree-10" idPiece="couloirEntree" />
      )}

    </group>
  );
}
