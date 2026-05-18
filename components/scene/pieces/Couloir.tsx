'use client';
import React from 'react';
import { Sol } from '../structure/Sol';
import { Interrupteur3D } from '../structure/Interrupteur3D';
import { Equipement3D } from '../equipements/Equipement3D';
import { MarkerCliquable } from '../equipements/MarkerCliquable';
import { ZonePiece } from '../equipements/ZonePiece';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';

/**
 * Couloir : centre (1.625, 3.25), 1.5m × 3.25m
 *
 * Limites murs extérieurs :
 *   X : 0.75 (gauche, cloison chambre) → 2.5 (droite, cloison SDB)
 *   Z : 1.5 (avant, cloison cuisine) → 5.0 (arrière, mur ext.)
 *
 * Limites intérieures (avec épaisseur mur 0.125m) :
 *   X : 0.875 → 2.375 (largeur intérieure: 1.5m)
 *   Z : 1.625 → 4.875 (profondeur intérieure: 3.25m)
 */
interface Props { lumiere: boolean; filDefer?: boolean; masquerPlafond?: boolean }

export function Couloir({ lumiere, filDefer = false, masquerPlafond = false }: Props) {
  const sol       = useElementSelectionnable({ idPiece: 'couloir', idElement: 'sol',        equipementId: 'entree-4', defaut: { couleur: '#4b5563', rugosite: 0.6,  metalique: 0 } });
  const peinture  = useElementSelectionnable({ idPiece: 'couloir', idElement: 'peinture',   equipementId: 'entree-5', defaut: { couleur: '#e5e7eb', rugosite: 0.9,  metalique: 0 } });
  const etagere   = useElementSelectionnable({ idPiece: 'couloir', idElement: 'etagere',    libelle: 'Étagère',      defaut: { couleur: '#5c3d2e', rugosite: 0.6,  metalique: 0 } });
  const sonnette  = useElementSelectionnable({ idPiece: 'couloir', idElement: 'sonnette',   equipementId: 'entree-8', defaut: { couleur: '#374151', rugosite: 0.3,  metalique: 0.3 } });
  const plafonnier = useElementSelectionnable({ idPiece: 'couloir', idElement: 'plafonnier', equipementId: 'entree-6', defaut: { couleur: '#f9fafb', rugosite: 0.3, metalique: 0 } });
  const interrupteur = useElementSelectionnable({ idPiece: 'couloir', idElement: 'interrupteur', equipementId: 'entree-6', defaut: { couleur: '#f3f4f6', rugosite: 0.3, metalique: 0 } });

  const M = (s: typeof sol) => ({
    color: s.estSelectionne ? '#00e5ff' : s.materiau.couleur,
    roughness: s.materiau.rugosite,
    metalness: s.materiau.metalique,
    emissive: s.emissif,
    emissiveIntensity: s.intensiteEmissif,
  });

  return (
    <group>
      {/* Sol */}
      <group>
        <Sol x={1.625} z={3.25} largeur={1.5} profondeur={3.25}
          couleur={sol.materiau.couleur} rugosite={sol.materiau.rugosite}
          propsInteraction={sol.propsInteraction} emissif={sol.emissif} intensiteEmissif={sol.intensiteEmissif}
          filDefer={filDefer} />
        
        {/* Marker pour le sol - au centre */}
        {!sol.estSelectionne && (
          <MarkerCliquable position={[1.625, 0.05, 3.25]} taille={24} zone="interieur" idPiece="couloir" />
        )}
      </group>

      {/* Plafond */}
      {!masquerPlafond && (
        <mesh position={[1.625, 2.8, 3.25]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.5, 3.25]} />
          <meshStandardMaterial color="#6b7280" roughness={0.9} />
        </mesh>
      )}

      {/* Marker pour le revêtement mural - sur le mur gauche */}
      {!peinture.estSelectionne && (
        <MarkerCliquable position={[0.89, 1.4, 3.25]} taille={20} zone="interieur" idPiece="couloir" />
      )}

      {/* Lumière */}
      {lumiere && (
        <rectAreaLight
          position={[1.625, 2.76, 3.25]} rotation={[-Math.PI / 2, 0, 0]}
          width={0.8} height={0.8} intensity={2.5} color="#fff5e0"
        />
      )}
      <mesh {...plafonnier.propsInteraction} position={[1.625, 2.72, 3.25]}>
        <cylinderGeometry args={[0.08, 0.1, 0.05, 12]} />
        <meshStandardMaterial 
          color={plafonnier.estSelectionne ? '#00e5ff' : (lumiere ? '#fffde7' : plafonnier.materiau.couleur)} 
          emissive={plafonnier.emissif !== '#000000' ? plafonnier.emissif : (lumiere ? '#fff5e0' : '#000')} 
          emissiveIntensity={plafonnier.intensiteEmissif > 0 ? plafonnier.intensiteEmissif : (lumiere ? 1.2 : 0)}
          roughness={plafonnier.materiau.rugosite}
          metalness={plafonnier.materiau.metalique}
        />
      </mesh>

      {/* ══ ÉQUIPEMENTS ENTRÉE / COULOIR (selon equipements.json) ══ */}
      
      {/* Porte d'entrée (entree-1) - visible depuis l'intérieur */}
      <Equipement3D
        equipementId="entree-1"
        position={[-1.05, 1.05, 1.5]}
        rotation={[0, Math.PI, 0]}
        type="porte"
        idPiece="couloir"
        idElement="porteEntree"
      />

      {/* Serrure et verrou (entree-2) - sur la porte d'entrée */}
      <Equipement3D
        equipementId="entree-2"
        position={[-0.7, 1.05, 1.48]}
        rotation={[0, Math.PI, 0]}
        type="serrure"
        idPiece="couloir"
        idElement="serrureEntree"
      />

      {/* Boîte aux lettres (entree-3) - mur gauche, près de l'entrée */}
      <Equipement3D
        equipementId="entree-3"
        position={[0.86, 1.2, 2.0]}
        type="boiteAuxLettres"
        idPiece="couloir"
        idElement="boiteAuxLettres"
      />

      {/* Interphone / visiophone (entree-7) - mur gauche, à côté de la sonnette */}
      <Equipement3D
        equipementId="entree-7"
        position={[0.86, 1.55, 1.85]}
        type="interphone"
        idPiece="couloir"
        idElement="interphone"
      />

      {/* ── Patères — mur gauche (x ≈ 0.875), à hauteur 1.6m ── */}
      {/* Planche support */}
      <mesh position={[0.84, 1.62, 3.25]}>
        <boxGeometry args={[0.04, 0.08, 1.2]} />
        <meshStandardMaterial {...M(etagere)} />
      </mesh>
      {/* 3 patères */}
      {[2.65, 3.25, 3.85].map((z, i) => (
        <group key={i} position={[0.88, 1.62, z]}>
          {/* Tige */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 0.1, 8]} />
            <meshStandardMaterial {...M(etagere)} />
          </mesh>
          {/* Boule bout */}
          <mesh position={[0.06, 0, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial {...M(etagere)} />
          </mesh>
        </group>
      ))}

      {/* ── Étagère à chaussures — mur arrière (z ≈ 4.75), bien dans les limites ── */}
      <group {...etagere.propsInteraction} position={[1.625, 0, 4.68]}>
        {/* Corps */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.44, 0.32]} />
          <meshStandardMaterial {...M(etagere)} />
        </mesh>
        {/* Étagère intermédiaire */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[1.28, 0.02, 0.3]} />
          <meshStandardMaterial {...M(etagere)} />
        </mesh>
        {/* Pieds (4) */}
        {[[-0.58, -0.14], [-0.58, 0.14], [0.58, -0.14], [0.58, 0.14]].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.06, z]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.12, 6]} />
            <meshStandardMaterial {...M(etagere)} />
          </mesh>
        ))}
        
        {/* Marker pour l'étagère */}
        {!etagere.estSelectionne && (
          <MarkerCliquable position={[0, 0.5, 0.2]} taille={20} zone="interieur" idPiece="couloir" />
        )}
      </group>

      {/* Interrupteur — mur gauche (x≈0.875), à l'entrée */}
      <Interrupteur3D
        position={[0.89, 1.2, 2.4]}
        rotation={[0, 0, 0]}
        idPiece="couloir"
        lumiere={lumiere}
      />

      {/* ── Sonnette / interphone — mur gauche, près de la porte d'entrée cuisine ── */}
      <Equipement3D
        equipementId="entree-8"
        position={[0.86, 1.4, 1.85]}
        type="sonnette"
        idPiece="couloir"
        idElement="sonnette"
      />

      {/* ── Détecteur de fumée (DAAF) — plafond, centre du couloir ── */}
      <Equipement3D
        equipementId="entree-9"
        position={[1.625, 2.75, 3.25]}
        type="daaf"
        idPiece="couloir"
        idElement="daaf"
      />

      {/* ── Grille de ventilation — plafond, près du mur arrière ── */}
      <Equipement3D
        equipementId="entree-10"
        position={[1.625, 2.75, 4.5]}
        type="grille"
        idPiece="couloir"
        idElement="grilleVentilation"
      />

      {/* ── Interrupteur — mur droit (x ≈ 2.375), près de la porte SDB ── */}
      <group position={[2.36, 1.2, 2.2]}>
        <mesh {...interrupteur.propsInteraction}>
          <boxGeometry args={[0.02, 0.1, 0.08]} />
          <meshStandardMaterial {...M(interrupteur)} />
        </mesh>
        
        {/* Marker pour l'interrupteur */}
        {!interrupteur.estSelectionne && (
          <MarkerCliquable position={[0.08, 0, 0]} taille={16} zone="interieur" idPiece="couloir" />
        )}
      </group>
      <ZonePiece idPiece="couloir" nom="Couloir" x={1.625} z={3.25} largeur={1.5} profondeur={3.25} />
    </group>
  );
}
