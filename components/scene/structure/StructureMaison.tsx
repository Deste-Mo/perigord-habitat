'use client';
import React from 'react';
import { Mur } from './Mur';
import { Fenetre } from './Fenetre';
import { Porte } from './Porte';
import { Toit } from './Toit';
import { MarkerCliquable } from '../equipements/MarkerCliquable';
import { LARGEUR_MAISON, PROFONDEUR_MAISON, EPAISSEUR_MUR, HAUTEUR_MUR } from '@/lib/three/constantes';   

interface Props {
  filDefer?: boolean;
  masquerToit?: boolean;
  pieceVisible?: 'exterieur' | 'interieur' | 'sejour' | 'cuisine' | 'chambre' | 'salleDeBain' | 'couloir' | 'couloirEntree';
}

const EXT = '#f5f5f5', INT = '#e8e8e8';
const lm  = LARGEUR_MAISON   / 2;   // 6
const pm  = PROFONDEUR_MAISON / 2;  // 5
const em2 = EPAISSEUR_MUR    / 2;   // 0.125

// ── Ouvertures de chaque fenêtre dans le mur (y_centre = 1.4 m) ─────────────
type Ouverture = { centre: number; largeur: number; yBot: number; yTop: number };
// F_SEJOUR_AVANT supprimée (cachait la télé)
const F_CUISINE_AVANT:   Ouverture = { centre:  3.5, largeur: 1.4, yBot: 0.85, yTop: 1.95 };
const F_SEJOUR_GAUCHE:   Ouverture = { centre: -1.5, largeur: 1.2, yBot: 0.90, yTop: 1.90 };
const F_CUISINE_DROITE:  Ouverture = { centre: -1.5, largeur: 1.2, yBot: 0.90, yTop: 1.90 };
const F_CHAMBRE_GAUCHE:  Ouverture = { centre:  3.5, largeur: 1.0, yBot: 0.95, yTop: 1.85 };
const F_CHAMBRE_ARRIERE: Ouverture = { centre: -2.5, largeur: 1.2, yBot: 0.90, yTop: 1.90 };
const F_SDB_DROITE:      Ouverture = { centre:  3.5, largeur: 0.8, yBot: 1.00, yTop: 1.80 };

// ── Ouvertures portes (yBot=0 = ras du sol, yTop = hauteur de la porte) ──────
const P_ENTREE:       Ouverture = { centre: -1.05,  largeur: 0.9,  yBot: 0, yTop: 2.1  };
const P_SEJ_CHAMBRE:  Ouverture = { centre: -2.625, largeur: 0.85, yBot: 0, yTop: 2.05 };
const P_CUI_COULOIR:  Ouverture = { centre:  1.5,   largeur: 0.85, yBot: 0, yTop: 2.05 };
const P_CHAM_COULOIR: Ouverture = { centre:  3.25,  largeur: 0.85, yBot: 0, yTop: 2.05 };
const P_COULOIR_SDB:  Ouverture = { centre:  3.2,   largeur: 0.8,  yBot: 0, yTop: 2.05 };
// Couloir d'entrée : portes latérales vers séjour (gauche) et cuisine (droite)
const P_COULOIR_SEJ:  Ouverture = { centre: -2.5,  largeur: 0.85, yBot: 0, yTop: 2.1  };
const P_COULOIR_CUI:  Ouverture = { centre: -2.5,  largeur: 0.85, yBot: 0, yTop: 2.1  };
function MurPerce({ debut, fin, ouvertures = [], couleur = EXT, filDefer = false }: {
  debut: [number, number]; fin: [number, number];
  ouvertures?: Ouverture[]; couleur?: string; filDefer?: boolean;
}) {
  const dx   = fin[0] - debut[0];
  const dz   = fin[1] - debut[1];
  const isX  = Math.abs(dx) > Math.abs(dz);          // mur longe l'axe X ?
  const start = isX ? debut[0] : debut[1];
  const end   = isX ? fin[0]   : fin[1];
  const fixed = isX ? debut[1] : debut[0];
  const D = (a: number): [number, number] => isX ? [a, fixed] : [fixed, a];

  const sorted = [...ouvertures].sort((a, b) => a.centre - b.centre);
  const segs: React.ReactElement[] = [];
  let cur = start, k = 0;

  for (const o of sorted) {
    const L = o.centre - o.largeur / 2;
    const R = o.centre + o.largeur / 2;
    if (cur < L)
      segs.push(<Mur key={k++} debut={D(cur)} fin={D(L)} couleur={couleur} filDefer={filDefer} />);       
    if (o.yBot > 0)
      segs.push(<Mur key={k++} debut={D(L)} fin={D(R)} hauteur={o.yBot}                       couleur={couleur} filDefer={filDefer} />);
    if (o.yTop < HAUTEUR_MUR)
      segs.push(<Mur key={k++} debut={D(L)} fin={D(R)} hauteur={HAUTEUR_MUR - o.yTop} yMin={o.yTop} couleur={couleur} filDefer={filDefer} />);
    cur = R;
  }
  if (cur < end)
    segs.push(<Mur key={k++} debut={D(cur)} fin={D(end)} couleur={couleur} filDefer={filDefer} />);       

  return <>{segs}</>;
}

// ─────────────────────────────────────────────────────────────────────────────

export function StructureMaison({ filDefer = false, masquerToit = false, pieceVisible = 'exterieur' }: Props) {
  const afficherTout        = pieceVisible === 'exterieur' || pieceVisible === 'interieur';

  return (
    <group>
      {/* ═══ VUE COMPLÈTE (extérieur / intérieur) ═══ */}
      {afficherTout && (
        <>
          {/* Mur avant gauche — avec porte d'entrée à X=-1.05 */}
          <MurPerce debut={[-lm,-pm]} fin={[-1.5,-pm]} ouvertures={[P_ENTREE]} couleur={EXT} filDefer={filDefer} />
          {/* Mur avant droit — fenêtre cuisine */}
          <MurPerce debut={[-0.6,-pm]} fin={[lm,-pm]}  ouvertures={[F_CUISINE_AVANT]}  couleur={EXT} filDefer={filDefer} />
          {/* Mur arrière — fenêtre chambre */}
          <MurPerce debut={[-lm,pm]}  fin={[lm,pm]}    ouvertures={[F_CHAMBRE_ARRIERE]} couleur={EXT} filDefer={filDefer} />
          {/* Mur gauche — fenêtres séjour + chambre */}
          <MurPerce debut={[-lm,-pm]} fin={[-lm,pm]}   ouvertures={[F_SEJOUR_GAUCHE, F_CHAMBRE_GAUCHE]} couleur={EXT} filDefer={filDefer} />
          {/* Mur droit — fenêtres cuisine + SDB */}
          <MurPerce debut={[lm,-pm]}  fin={[lm,pm]}    ouvertures={[F_CUISINE_DROITE, F_SDB_DROITE]}    couleur={EXT} filDefer={filDefer} />

          {/* Toutes les cloisons intérieures — avec ouvertures de portes */}
          {/* Porte d'entrée principale — façade avant, ouvre vers l'intérieur */}
          <Porte position={[-1.05, 0, -pm + 0.125]} rotation={[0, 0, 0]} largeur={0.9} hauteur={2.1} exterieure={true} />
          {/* ── Couloir d'entrée entre séjour et cuisine ── */}
          {/* Cloison gauche X=-1.8 : avec porte vers séjour */}
          <MurPerce debut={[-1.8,-pm]} fin={[-1.8,1.5]} ouvertures={[P_COULOIR_SEJ]} couleur={INT} filDefer={filDefer} />
          {/* Cloison droite X=0.75 : avec porte vers cuisine */}
          <MurPerce debut={[0.75,-pm]} fin={[0.75,1.5]} ouvertures={[P_COULOIR_CUI]} couleur={INT} filDefer={filDefer} />
          {/* Portes physiques */}
          <Porte position={[-1.8, 0, -2.5]} rotation={[0,  Math.PI / 2, 0]} largeur={0.85} hauteur={2.1} />
          <Porte position={[ 0.75, 0, -2.5]} rotation={[0, -Math.PI / 2, 0]} largeur={0.85} hauteur={2.1} />
          {/* X=0.75 de Z=1.5 à Z=pm : porte chambre/couloir à Z=3.25 */}
          <MurPerce debut={[0.75,1.5]} fin={[0.75,pm]} ouvertures={[P_CHAM_COULOIR]} couleur={INT} filDefer={filDefer} />
          {/* Z=1.5 côté gauche (X=-6 à X=0.75) : porte séjour/chambre à X=-2.625 */}
          <MurPerce debut={[-lm,1.5]} fin={[0.75,1.5]} ouvertures={[P_SEJ_CHAMBRE]} couleur={INT} filDefer={filDefer} />
          {/* Z=1.5 côté droit (X=0.75 à X=2.5) : porte cuisine/couloir à X=1.5 */}
          <MurPerce debut={[0.75,1.5]} fin={[2.5,1.5]} ouvertures={[P_CUI_COULOIR]} couleur={INT} filDefer={filDefer} />
          {/* Z=1.5 extrémité droite (X=2.5 à X=lm) : cloison cuisine/SDB — pas de porte */}
          <Mur debut={[2.5,1.5]}    fin={[lm,1.5]}     couleur={INT} filDefer={filDefer} />
          {/* X=2.5 : porte couloir/SDB à Z=3.2 */}
          <MurPerce debut={[2.5,1.5]} fin={[2.5,pm]}   ouvertures={[P_COULOIR_SDB]} couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ SÉJOUR ═══ */}
      {pieceVisible === 'sejour' && (
        <>
          {/* Mur avant séjour — jusqu'à la cloison du couloir (plus de porte dans le séjour) */}
          <Mur debut={[-lm,-pm]} fin={[-1.8,-pm]} couleur={EXT} filDefer={filDefer} />
          {/* Mur gauche avec fenêtre */}
          <MurPerce debut={[-lm,-pm]} fin={[-lm,1.5]} ouvertures={[F_SEJOUR_GAUCHE]} couleur={EXT} filDefer={filDefer} />
          {/* Cloison droite du séjour (vers le couloir d'entrée) avec porte */}
          <MurPerce debut={[-1.8,-pm]} fin={[-1.8,1.5]} ouvertures={[P_COULOIR_SEJ]} couleur={INT} filDefer={filDefer} />
          <Porte position={[-1.8, 0, -2.5]} rotation={[0, Math.PI / 2, 0]} largeur={0.85} hauteur={2.1} />
          {/* Mur arrière séjour */}
          <Mur debut={[-lm,1.5]}  fin={[-3.05,1.5]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[-2.2,1.5]} fin={[-1.8,1.5]}  couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ CUISINE ═══ */}
      {pieceVisible === 'cuisine' && (
        <>
          <MurPerce debut={[-0.6,-pm]} fin={[lm,-pm]}  ouvertures={[F_CUISINE_AVANT]}  couleur={EXT} filDefer={filDefer} />
          <MurPerce debut={[lm,-pm]}   fin={[lm,1.5]}  ouvertures={[F_CUISINE_DROITE]} couleur={EXT} filDefer={filDefer} />
          {/* Cloison gauche cuisine (vers couloir d'entrée) avec porte */}
          <MurPerce debut={[0.75,-pm]} fin={[0.75,1.5]} ouvertures={[P_COULOIR_CUI]} couleur={INT} filDefer={filDefer} />
          <Porte position={[0.75, 0, -2.5]} rotation={[0, -Math.PI / 2, 0]} largeur={0.85} hauteur={2.1} />
          <Mur debut={[0.75,1.5]}   fin={[1.075,1.5]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[1.925,1.5]}  fin={[lm,1.5]}    couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ CHAMBRE ═══ */}
      {pieceVisible === 'chambre' && (
        <>
          <MurPerce debut={[-lm,1.5]} fin={[-lm,pm]}   ouvertures={[F_CHAMBRE_GAUCHE]}   couleur={EXT} filDefer={filDefer} />
          <MurPerce debut={[-lm,pm]}  fin={[0.75,pm]}  ouvertures={[F_CHAMBRE_ARRIERE]}  couleur={EXT} filDefer={filDefer} />
          <Mur debut={[-lm,1.5]}    fin={[-3.05,1.5]}  couleur={INT} filDefer={filDefer} />
          <Mur debut={[-2.2,1.5]}   fin={[0.75,1.5]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,1.5]}   fin={[0.75,2.825]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,3.675]} fin={[0.75,pm]}    couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ COULOIR ═══ */}
      {pieceVisible === 'couloir' && (
        <>
          <Mur debut={[0.75,pm]}    fin={[2.5,pm]}     couleur={EXT} filDefer={filDefer} />
          <Mur debut={[0.75,1.5]}   fin={[0.75,2.825]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,3.675]} fin={[0.75,pm]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,1.5]}   fin={[1.075,1.5]}  couleur={INT} filDefer={filDefer} />
          <Mur debut={[1.925,1.5]}  fin={[2.5,1.5]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,1.5]}    fin={[2.5,2.8]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,3.6]}    fin={[2.5,pm]}     couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ COULOIR D'ENTRÉE ═══ */}
      {pieceVisible === 'couloirEntree' && (
        <>
          {/* Façade avant gauche — avec porte d'entrée */}
          <MurPerce debut={[-lm,-pm]} fin={[-1.5,-pm]} ouvertures={[P_ENTREE]} couleur={EXT} filDefer={filDefer} />
          {/* Façade avant droite */}
          <Mur debut={[-0.6,-pm]} fin={[0.75,-pm]} couleur={EXT} filDefer={filDefer} />
          {/* Porte d'entrée physique */}
          <Porte position={[-1.05, 0, -pm + 0.125]} rotation={[0, 0, 0]} largeur={0.9} hauteur={2.1} exterieure={true} />
          {/* Cloison gauche (vers séjour) avec porte */}
          <MurPerce debut={[-1.8,-pm]} fin={[-1.8,1.5]} ouvertures={[P_COULOIR_SEJ]} couleur={INT} filDefer={filDefer} />
          <Porte position={[-1.8, 0, -2.5]} rotation={[0, Math.PI / 2, 0]} largeur={0.85} hauteur={2.1} />
          {/* Cloison droite (vers cuisine) avec porte */}
          <MurPerce debut={[0.75,-pm]} fin={[0.75,1.5]} ouvertures={[P_COULOIR_CUI]} couleur={INT} filDefer={filDefer} />
          <Porte position={[0.75, 0, -2.5]} rotation={[0, -Math.PI / 2, 0]} largeur={0.85} hauteur={2.1} />
          {/* Cloison du fond (Z=1.5) */}
          <Mur debut={[-1.8,1.5]} fin={[0.75,1.5]} couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ SALLE DE BAIN ═══ */}
      {pieceVisible === 'salleDeBain' && (
        <>
          <MurPerce debut={[lm,1.5]} fin={[lm,pm]}  ouvertures={[F_SDB_DROITE]} couleur={EXT} filDefer={filDefer} />
          <Mur debut={[2.5,pm]}   fin={[lm,pm]}     couleur={EXT} filDefer={filDefer} />
          <Mur debut={[2.5,1.5]}  fin={[2.5,2.8]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,3.6]}  fin={[2.5,pm]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,1.5]}  fin={[lm,1.5]}    couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ FENÊTRES ═══ */}
      {(afficherTout || pieceVisible === 'sejour') && (
        <>
          {/* Fenêtre avant séjour supprimée (cachait la TV) */}
          <Fenetre
            position={[-lm+em2,1.4,-1.5]}
            rotation={[0,Math.PI/2,0]}
            largeur={1.2}
            hauteur={1.0}
            idPiece="sejour"
            idElement="fenetreSejour"
            equipementId="salon-3"
            equipementIdVolet="salon-4"
            equipementIdStore="salon-5"
          />
          {/* Marker pour fenêtre séjour gauche */}
          {afficherTout && (
            <MarkerCliquable position={[-lm-0.1, 1.4, -1.5]} taille={20} zone="exterieur" />
          )}
        </>
      )}
      {(afficherTout || pieceVisible === 'cuisine') && (
        <>
          <Fenetre
            position={[3.5,1.4,-pm+em2]}
            largeur={1.4}
            hauteur={1.1}
            idPiece="cuisine"
            idElement="fenetreCuisine1"
          />
          <Fenetre
            position={[lm-em2,1.4,-1.5]}
            rotation={[0,-Math.PI/2,0]}
            largeur={1.2}
            hauteur={1.0}
            idPiece="cuisine"
            idElement="fenetreCuisine2"
          />
          {/* Un seul marker pour les fenêtres cuisine */}
          {afficherTout && (
            <MarkerCliquable position={[3.5, 1.4, -pm-0.1]} taille={20} zone="exterieur" />
          )}
        </>
      )}
      {(afficherTout || pieceVisible === 'chambre') && (
        <>
          <Fenetre
            position={[-lm+em2,1.4,3.5]}
            rotation={[0,Math.PI/2,0]}
            largeur={1.0}
            hauteur={0.9}
            idPiece="chambre"
            idElement="fenetreChambre1"
            equipementId="chambre-3"
            equipementIdVolet="chambre-4"
            equipementIdStore="chambre-5"
          />
          <Fenetre
            position={[-2.5,1.4,pm-em2]}
            rotation={[0,Math.PI,0]}
            largeur={1.2}
            hauteur={1.0}
            idPiece="chambre"
            idElement="fenetreChambre2"
            equipementId="chambre-3"
            equipementIdVolet="chambre-4"
            equipementIdStore="chambre-5"
          />
          {/* Un seul marker pour les fenêtres chambre */}
          {afficherTout && (
            <MarkerCliquable position={[-2.5, 1.4, pm+0.1]} taille={20} zone="exterieur" />
          )}
        </>
      )}
      {(afficherTout || pieceVisible === 'salleDeBain') && (
        <>
          <Fenetre
            position={[lm-em2,1.4,3.5]}
            rotation={[0,-Math.PI/2,0]}
            largeur={0.8}
            hauteur={0.8}
            idPiece="salleDeBain"
            idElement="fenetreSDB"
          />
          {/* Marker pour fenêtre salle de bain */}
          {afficherTout && (
            <MarkerCliquable position={[lm+0.1, 1.4, 3.5]} taille={20} zone="exterieur" />
          )}
        </>
      )}

      {/* ═══ PORTES ═══ */}
      {(afficherTout || pieceVisible === 'sejour') && (
        <>
          <Porte position={[-1.05,0,-pm+0.02]} />
          {/* Marker pour la porte d'entrée (vue extérieure) */}
          {afficherTout && (
            <>
              <MarkerCliquable position={[-1.05, 1.05, -pm-0.1]} taille={24} zone="exterieur" />
              
              {/* Boîte aux lettres à droite de la porte */}
              <group position={[-0.4, 1.2, -pm-0.05]}>
                <mesh castShadow>
                  <boxGeometry args={[0.35, 0.3, 0.12]} />
                  <meshStandardMaterial color="#3a3a3a" roughness={0.5} metalness={0.6} />
                </mesh>
                <MarkerCliquable position={[-0.4, 1.2, -pm-0.1]} taille={20} zone="exterieur" />
              </group>
              
              {/* Sonnette à côté de la porte */}
              <group position={[-0.5, 1.4, -pm-0.05]}>
                <mesh castShadow>
                  <boxGeometry args={[0.02, 0.12, 0.08]} />
                  <meshStandardMaterial color="#374151" roughness={0.3} metalness={0.3} />
                </mesh>
                <mesh position={[0.015, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                  <cylinderGeometry args={[0.022, 0.022, 0.01, 10]} />
                  <meshStandardMaterial color="#1e40af" roughness={0.3} metalness={0.5} />
                </mesh>
                <MarkerCliquable position={[-0.5, 1.4, -pm-0.1]} taille={18} zone="exterieur" />
              </group>
              
              {/* Interphone au-dessus de la sonnette */}
              <group position={[-0.5, 1.6, -pm-0.05]}>
                <mesh castShadow>
                  <boxGeometry args={[0.02, 0.12, 0.08]} />
                  <meshStandardMaterial color="#374151" roughness={0.3} metalness={0.3} />
                </mesh>
                <MarkerCliquable position={[-0.5, 1.6, -pm-0.1]} taille={18} zone="exterieur" />
              </group>
            </>
          )}
        </>
      )}
      {(afficherTout || pieceVisible === 'sejour' || pieceVisible === 'chambre') && (
        <Porte position={[-2.625,0,1.5]} largeur={0.85} hauteur={2.05} />
      )}
      {(afficherTout || pieceVisible === 'cuisine' || pieceVisible === 'couloir') && (
        <Porte position={[1.5,0,1.5]}   largeur={0.85} hauteur={2.05} />
      )}
      {(afficherTout || pieceVisible === 'chambre' || pieceVisible === 'couloir') && (
        <Porte position={[0.75,0,3.25]}  rotation={[0,Math.PI/2,0]} largeur={0.85} hauteur={2.05} />      
      )}
      {(afficherTout || pieceVisible === 'couloir' || pieceVisible === 'salleDeBain') && (
        <Porte position={[2.5,0,3.2]}   rotation={[0,Math.PI/2,0]} largeur={0.8}  hauteur={2.05} />       
      )}

      {/* ═══ TOIT ═══ */}
      {!masquerToit && <Toit filDefer={filDefer} />}
    </group>
  );
}