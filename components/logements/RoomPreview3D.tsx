'use client';

import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { FournisseurScene } from '@/hooks/SceneProvider';
import { useScene } from '@/hooks/useSceneStore';
import { Sejour } from '@/components/scene/pieces/Sejour';
import { Cuisine } from '@/components/scene/pieces/Cuisine';
import { Chambre } from '@/components/scene/pieces/Chambre';
import { SalleDeBain } from '@/components/scene/pieces/SalleDeBain';
import { Couloir } from '@/components/scene/pieces/Couloir';
import { Mur } from '@/components/scene/structure/Mur';
import { Fenetre } from '@/components/scene/structure/Fenetre';
import { Porte } from '@/components/scene/structure/Porte';
import { EclairagePrincipal } from '@/components/scene/eclairage/EclairagePrincipal';
import {
  LARGEUR_MAISON,
  PROFONDEUR_MAISON,
  EPAISSEUR_MUR,
  HAUTEUR_MUR,
} from '@/lib/three/constantes';
import equipementsData from '@/data/equipements.json';
import type { Equipment } from '@/types/equipment';

export type PieceId3D = 'sejour' | 'cuisine' | 'chambre' | 'salleDeBain' | 'couloir';

// ── Constantes géométriques (identiques à StructureMaison) ───────────────────
const lm  = LARGEUR_MAISON   / 2;   // 6
const pm  = PROFONDEUR_MAISON / 2;  // 5
const em2 = EPAISSEUR_MUR    / 2;   // 0.125
const EXT = '#f5f5f5';
const INT = '#e8e8e8';

type Ouverture = { centre: number; largeur: number; yBot: number; yTop: number };
const F_SEJOUR_GAUCHE:  Ouverture = { centre: -1.5, largeur: 1.2, yBot: 0.90, yTop: 1.90 };
const F_CHAMBRE_GAUCHE: Ouverture = { centre:  3.5, largeur: 1.0, yBot: 0.95, yTop: 1.85 };
const F_CUISINE_AVANT:  Ouverture = { centre:  3.5, largeur: 1.4, yBot: 0.85, yTop: 1.95 };

// ── Sol limité aux dimensions exactes de la pièce ────────────────────────────
const PIECE_SOL: Record<PieceId3D, { cx: number; cz: number; w: number; d: number }> = {
  sejour:      { cx: -2.5,   cz: -1.5,  w: 5.5,  d: 5.0  },
  cuisine:     { cx:  3.5,   cz: -1.5,  w: 5.0,  d: 5.0  },
  chambre:     { cx: -2.625, cz:  3.25, w: 6.5,  d: 3.25 },
  salleDeBain: { cx:  4.25,  cz:  3.25, w: 3.25, d: 3.25 },
  couloir:     { cx:  1.625, cz:  3.25, w: 1.5,  d: 3.25 },
};

function SolPiece({ piece }: { piece: PieceId3D }) {
  const { cx, cz, w, d } = PIECE_SOL[piece];
  return (
    <mesh position={[cx, -0.01, cz]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[w, d]} />
      <meshStandardMaterial color="#c8b89a" roughness={0.8} />
    </mesh>
  );
}

// Reconstruit un mur percé (segments autour des ouvertures) — même logique que StructureMaison
function MurPerce({ debut, fin, ouvertures = [], couleur = EXT }: {
  debut: [number, number]; fin: [number, number];
  ouvertures?: Ouverture[]; couleur?: string;
}) {
  const dx  = fin[0] - debut[0];
  const dz  = fin[1] - debut[1];
  const isX = Math.abs(dx) > Math.abs(dz);
  const start  = isX ? debut[0] : debut[1];
  const end    = isX ? fin[0]   : fin[1];
  const fixed  = isX ? debut[1] : debut[0];
  const D = (a: number): [number, number] => isX ? [a, fixed] : [fixed, a];

  const sorted = [...ouvertures].sort((a, b) => a.centre - b.centre);
  const segs: React.ReactElement[] = [];
  let cur = start, k = 0;

  for (const o of sorted) {
    const L = o.centre - o.largeur / 2;
    const R = o.centre + o.largeur / 2;
    if (cur < L)
      segs.push(<Mur key={k++} debut={D(cur)} fin={D(L)} couleur={couleur} />);
    if (o.yBot > 0)
      segs.push(<Mur key={k++} debut={D(L)} fin={D(R)} hauteur={o.yBot} couleur={couleur} />);
    if (o.yTop < HAUTEUR_MUR)
      segs.push(<Mur key={k++} debut={D(L)} fin={D(R)} hauteur={HAUTEUR_MUR - o.yTop} yMin={o.yTop} couleur={couleur} />);
    cur = R;
  }
  if (cur < end)
    segs.push(<Mur key={k++} debut={D(cur)} fin={D(end)} couleur={couleur} />);

  return <>{segs}</>;
}

// ── Ouvertures portes (identiques à StructureMaison) ─────────────────────────
const P_ENTREE:       Ouverture = { centre: -1.05,  largeur: 0.9,  yBot: 0, yTop: 2.1  };
const P_SEJ_CHAMBRE:  Ouverture = { centre: -2.625, largeur: 0.85, yBot: 0, yTop: 2.05 };
const P_CUI_COULOIR:  Ouverture = { centre:  1.5,   largeur: 0.85, yBot: 0, yTop: 2.05 };
const P_CHAM_COULOIR: Ouverture = { centre:  3.25,  largeur: 0.85, yBot: 0, yTop: 2.05 };
const P_COULOIR_SDB:  Ouverture = { centre:  3.2,   largeur: 0.8,  yBot: 0, yTop: 2.05 };

// ── Murs visibles depuis la caméra isométrique (fond de scène uniquement) ─────
// Caméra toujours dans le coin z+/x+ de chaque pièce.
// On garde UNIQUEMENT les murs du fond (z- et x-) et on omet les murs proches
// de la caméra (z+ et x+) pour laisser voir l'intérieur.
// Les portes et leurs linteaux sont rendus via MurPerce + <Porte>.
function MursFond({ piece }: { piece: PieceId3D }) {
  switch (piece) {

    case 'sejour':
      // Caméra [5,7,7] → fond = mur gauche (x=-6) + mur arrière (z=-5)
      // Cloison z=+1.5 est côté caméra → pas de porte affichée dessus
      return (
        <>
          {/* Mur gauche (fond) avec fenêtre */}
          <MurPerce debut={[-lm, -pm]} fin={[-lm, 1.5]} ouvertures={[F_SEJOUR_GAUCHE]} couleur={EXT} />
          <Fenetre
            position={[-lm + em2, 1.4, -1.5]}
            rotation={[0, Math.PI / 2, 0]}
            largeur={1.2} hauteur={1.0}
            idPiece="sejour" idElement="fenetreSejour"
            equipementId="salon-3" equipementIdVolet="salon-4" equipementIdStore="salon-5"
          />
          {/* Mur arrière (fond) z=-5 avec porte d'entrée */}
          <MurPerce debut={[-lm, -pm]} fin={[-1.5, -pm]} ouvertures={[P_ENTREE]} couleur={EXT} />
          <Mur debut={[-0.6, -pm]} fin={[0.75, -pm]} couleur={EXT} />
          <Porte position={[-1.05, 0, -pm + 0.02]} />
        </>
      );

    case 'cuisine':
      // Caméra [10,7,7] → fond = cloison x=+0.75 + mur arrière (z=-5)
      // Cloison z=+1.5 est côté caméra → pas de porte affichée dessus
      return (
        <>
          {/* Cloison gauche (fond) — pas de porte sur ce segment */}
          <Mur debut={[0.75, -pm]} fin={[0.75, 1.5]} couleur={INT} />
          {/* Mur arrière (fond) z=-5 avec fenêtre cuisine */}
          <MurPerce debut={[-0.6, -pm]} fin={[lm, -pm]} ouvertures={[F_CUISINE_AVANT]} couleur={EXT} />
          <Fenetre
            position={[3.5, 1.4, -pm + em2]}
            largeur={1.4} hauteur={1.1}
            idPiece="cuisine" idElement="fenetreCuisine1"
          />
        </>
      );

    case 'chambre':
      // Caméra [5,7,11] → fond = mur gauche (x=-6) + cloison z=+1.5
      // Cloison x=+0.75 est côté caméra → pas de porte affichée dessus
      return (
        <>
          {/* Mur gauche (fond) avec fenêtre */}
          <MurPerce debut={[-lm, 1.5]} fin={[-lm, pm]} ouvertures={[F_CHAMBRE_GAUCHE]} couleur={EXT} />
          <Fenetre
            position={[-lm + em2, 1.4, 3.5]}
            rotation={[0, Math.PI / 2, 0]}
            largeur={1.0} hauteur={0.9}
            idPiece="chambre" idElement="fenetreChambre1"
            equipementId="chambre-3" equipementIdVolet="chambre-4" equipementIdStore="chambre-5"
          />
          {/* Cloison avant (fond) z=+1.5 avec porte séjour/chambre */}
          <MurPerce debut={[-lm, 1.5]} fin={[-2.2, 1.5]} ouvertures={[P_SEJ_CHAMBRE]} couleur={INT} />
          <Mur debut={[-2.2, 1.5]} fin={[0.75, 1.5]} couleur={INT} />
          <Porte position={[-2.625, 0, 1.5]} largeur={0.85} hauteur={2.05} />
        </>
      );

    case 'salleDeBain':
      // Caméra [11,7,11] → fond = cloison avant (z=+1.5) + cloison gauche (x=+2.5)
      return (
        <>
          {/* Cloison avant (fond) z=+1.5 — pas de porte */}
          <Mur debut={[2.5, 1.5]} fin={[lm, 1.5]} couleur={INT} />
          {/* Cloison gauche (fond) x=+2.5 avec porte couloir/SDB */}
          <MurPerce debut={[2.5, 1.5]} fin={[2.5, pm]} ouvertures={[P_COULOIR_SDB]} couleur={INT} />
          <Porte position={[2.5, 0, 3.2]} rotation={[0, Math.PI / 2, 0]} largeur={0.8} hauteur={2.05} />
        </>
      );

    case 'couloir':
      // Caméra [7,6,11] → fond = cloison gauche (x=+0.75) + cloison avant (z=+1.5)
      return (
        <>
          {/* Cloison gauche (fond) x=+0.75 avec porte chambre/couloir */}
          <MurPerce debut={[0.75, 1.5]} fin={[0.75, pm]} ouvertures={[P_CHAM_COULOIR]} couleur={INT} />
          <Porte position={[0.75, 0, 3.25]} rotation={[0, Math.PI / 2, 0]} largeur={0.85} hauteur={2.05} />
          {/* Cloison avant (fond) z=+1.5 avec porte cuisine/couloir */}
          <MurPerce debut={[0.75, 1.5]} fin={[2.5, 1.5]} ouvertures={[P_CUI_COULOIR]} couleur={INT} />
          <Porte position={[1.5, 0, 1.5]} largeur={0.85} hauteur={2.05} />
        </>
      );

    default:
      return null;
  }
}

// ── Mapping pièce → labels JSON ───────────────────────────────────────────────
const PIECE_LABEL: Record<PieceId3D, string[]> = {
  sejour:      ['Salon / Séjour'],
  cuisine:     ['Cuisine'],
  chambre:     ['Chambre'],
  salleDeBain: ['Salle de bain / Douche', 'WC / Toilettes'],
  couloir:     ['Entrée / Couloir'],
};

function getEquipementsAvecPosition(piece: PieceId3D): Equipment[] {
  const labels = PIECE_LABEL[piece];
  const all = (equipementsData.equipements as Equipment[]).filter(
    (eq) => labels.includes(eq.piece) && eq.position3D
  );

  // Dédupliquer les positions trop proches (distance < 0.15m) — garder le premier
  const deduped: Equipment[] = [];
  for (const eq of all) {
    const pos = eq.position3D!;
    const tooClose = deduped.some(existing => {
      const ep = existing.position3D!;
      const dx = pos[0] - ep[0];
      const dy = pos[1] - ep[1];
      const dz = pos[2] - ep[2];
      return Math.sqrt(dx*dx + dy*dy + dz*dz) < 0.15;
    });
    if (!tooClose) deduped.push(eq);
  }
  return deduped;
}

// ── Config caméra ─────────────────────────────────────────────────────────────
export const ROOM_CONFIG: Record<PieceId3D, {
  camPos: [number, number, number];
  camTarget: [number, number, number];
}> = {
  sejour:      { camPos: [5,  7,  7], camTarget: [-2.5,   0.5, -1.5]  },
  cuisine:     { camPos: [10, 7,  7], camTarget: [ 3.5,   0.5, -1.5]  },
  chambre:     { camPos: [5,  7, 11], camTarget: [-2.625, 0.5,  3.25] },
  salleDeBain: { camPos: [11, 7, 11], camTarget: [ 4.25,  0.5,  3.25] },
  couloir:     { camPos: [7,  6, 11], camTarget: [ 1.625, 0.5,  3.25] },
};

// ── Point rouge cliquable ─────────────────────────────────────────────────────
function PointCliquable({
  position, equipementId, onClic,
}: {
  position: [number, number, number];
  equipementId: string;
  onClic: (id: string) => void;
}) {
  // Utiliser la couleur primaire du thème
  const primaryColor = typeof window !== 'undefined' 
    ? getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '221.2 83.2% 53.3%'
    : '221.2 83.2% 53.3%';
  
  // Convertir HSL en hex pour Three.js
  const hslToHex = (hsl: string) => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v));
    const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = (l / 100) - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  
  const color = hslToHex(primaryColor);
  
  return (
    <Billboard position={position} follow={true} renderOrder={999}>
      <group
        onClick={(e) => { e.stopPropagation(); onClic(equipementId); }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <mesh renderOrder={999}>
          <circleGeometry args={[0.18, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.DoubleSide} depthTest={false} />
        </mesh>
        <mesh position={[0, 0, 0.001]} renderOrder={1000}>
          <circleGeometry args={[0.09, 16]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} depthTest={false} />
        </mesh>
        <mesh position={[0, 0, 0.002]} renderOrder={1001}>
          <planeGeometry args={[0.1, 0.02]} />
          <meshBasicMaterial color="white" side={THREE.DoubleSide} depthTest={false} />
        </mesh>
        <mesh position={[0, 0, 0.002]} renderOrder={1001}>
          <planeGeometry args={[0.02, 0.1]} />
          <meshBasicMaterial color="white" side={THREE.DoubleSide} depthTest={false} />
        </mesh>
      </group>
    </Billboard>
  );
}

// ── Bridge store → callback ───────────────────────────────────────────────────
function EquipementBridge({ onEquipementClick }: { onEquipementClick: (id: string) => void }) {
  const { equipementModalId, setEquipementModalId } = useScene();
  useEffect(() => {
    if (equipementModalId) {
      onEquipementClick(equipementModalId);
      setEquipementModalId(null);
    }
  }, [equipementModalId, onEquipementClick, setEquipementModalId]);
  return null;
}

// ── Mise à jour caméra ────────────────────────────────────────────────────────
function CameraUpdater({ piece }: { piece: PieceId3D }) {
  const { camera } = useThree();
  const cfg = ROOM_CONFIG[piece];
  useEffect(() => {
    camera.position.set(...cfg.camPos);
    camera.lookAt(new THREE.Vector3(...cfg.camTarget));
    camera.updateProjectionMatrix();
  }, [piece, camera, cfg]);
  return null;
}

// ── Scène ─────────────────────────────────────────────────────────────────────
function RoomScene({ piece, onEquipementClick }: {
  piece: PieceId3D;
  onEquipementClick: (id: string) => void;
}) {
  const points = getEquipementsAvecPosition(piece);

  return (
    <>
      <CameraUpdater piece={piece} />
      <EquipementBridge onEquipementClick={onEquipementClick} />

      <EclairagePrincipal modeJourNuit="jour" />
      <color attach="background" args={['hsl(var(--background))']} />
      <Environment preset="apartment" />

      {/* Sol limité à la pièce uniquement */}
      <SolPiece piece={piece} />

      {/* Uniquement les murs du fond visibles depuis la caméra isométrique */}
      <MursFond piece={piece} />

      {/* Pièce active avec tout son mobilier */}
      {piece === 'sejour'      && <Sejour      lumiere={true} masquerPlafond={true} />}
      {piece === 'cuisine'     && <Cuisine     lumiere={true} masquerPlafond={true} />}
      {piece === 'chambre'     && <Chambre     lumiere={true} masquerPlafond={true} />}
      {piece === 'salleDeBain' && <SalleDeBain lumiere={true} masquerPlafond={true} />}
      {piece === 'couloir'     && <Couloir     lumiere={true} masquerPlafond={true} />}

      {/* Points rouges cliquables */}
      {points.map((eq) => (
        <PointCliquable
          key={eq.id}
          position={eq.position3D!}
          equipementId={eq.id}
          onClic={onEquipementClick}
        />
      ))}
    </>
  );
}

// ── Composant exporté ─────────────────────────────────────────────────────────
interface Props {
  piece: PieceId3D;
  onEquipementClick: (equipementId: string) => void;
  className?: string;
}

export function RoomPreview3D({ piece, onEquipementClick, className = '' }: Props) {
  const initialCfg = ROOM_CONFIG[piece];

  return (
    <div className={className}>
      <FournisseurScene>
        <Canvas
          shadows
          camera={{ fov: 42, near: 0.1, far: 200, position: initialCfg.camPos }}
          onCreated={({ camera }) => { camera.lookAt(new THREE.Vector3(...initialCfg.camTarget)); }}
          gl={{
            antialias: true,
            alpha: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
            powerPreference: 'default',
          }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <RoomScene piece={piece} onEquipementClick={onEquipementClick} />
          </Suspense>
        </Canvas>
      </FournisseurScene>
    </div>
  );
}
