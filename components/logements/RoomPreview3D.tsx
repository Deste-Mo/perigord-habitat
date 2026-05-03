'use client';

import React, { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Sky, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { FournisseurScene } from '@/hooks/SceneProvider';
import { useScene } from '@/hooks/useSceneStore';
import { Sejour } from '@/components/scene/pieces/Sejour';
import { Cuisine } from '@/components/scene/pieces/Cuisine';
import { Chambre } from '@/components/scene/pieces/Chambre';
import { SalleDeBain } from '@/components/scene/pieces/SalleDeBain';
import { Couloir } from '@/components/scene/pieces/Couloir';
import { EclairagePrincipal } from '@/components/scene/eclairage/EclairagePrincipal';
import { HAUTEUR_MUR, EPAISSEUR_MUR } from '@/lib/three/constantes';
import equipementsData from '@/data/equipements.json';
import type { Equipment } from '@/types/equipment';

export type PieceId3D = 'sejour' | 'cuisine' | 'chambre' | 'salleDeBain' | 'couloir';

// Mapping pièce 3D → nom de pièce dans le JSON
const PIECE_LABEL: Record<PieceId3D, string[]> = {
  sejour:      ['Salon / Séjour'],
  cuisine:     ['Cuisine'],
  chambre:     ['Chambre'],
  salleDeBain: ['Salle de bain / Douche', 'WC / Toilettes'],
  couloir:     ['Entrée / Couloir'],
};

// Récupère les équipements avec position3D pour une pièce donnée
function getEquipementsAvecPosition(piece: PieceId3D): Equipment[] {
  const labels = PIECE_LABEL[piece];
  return (equipementsData.equipements as Equipment[]).filter(
    (eq) => labels.includes(eq.piece) && eq.position3D
  );
}

// ── Config caméra ─────────────────────────────────────────────────────────────
export const ROOM_CONFIG: Record<PieceId3D, {
  xMin: number; xMax: number; zMin: number; zMax: number;
  camPos: [number, number, number];
  camTarget: [number, number, number];
}> = {
  // Séjour : X -5.875→0.625, Z -4.875→1.125
  // Caméra coin avant-droit, vue isométrique 45° qui couvre toute la pièce
  // FOV 35 + distance modérée = bon zoom sans perdre les murs extrêmes
  sejour: {
    xMin: -5.875, xMax: 0.625, zMin: -4.875, zMax: 1.125,
    camPos:    [5,  7,  7],
    camTarget: [-2.5, 0.5, -1.5],
  },
  // Cuisine : X 0.875→5.875, Z -4.875→1.125
  cuisine: {
    xMin:  0.875, xMax: 5.875, zMin: -4.875, zMax: 1.125,
    camPos:    [10, 7,  7],
    camTarget: [ 3.5, 0.5, -1.5],
  },
  // Chambre : X -5.875→0.625, Z 1.625→4.875
  chambre: {
    xMin: -5.875, xMax: 0.625, zMin:  1.625, zMax: 4.875,
    camPos:    [5,  7, 11],
    camTarget: [-2.625, 0.5, 3.25],
  },
  // Salle de bain : X 2.625→5.875, Z 1.625→4.875
  salleDeBain: {
    xMin:  2.625, xMax: 5.875, zMin:  1.625, zMax: 4.875,
    camPos:    [11, 7, 11],
    camTarget: [ 4.25, 0.5, 3.25],
  },
  // Couloir : X 0.875→2.375, Z 1.625→4.875
  couloir: {
    xMin:  0.875, xMax: 2.375, zMin:  1.625, zMax: 4.875,
    camPos:    [7,  6, 11],
    camTarget: [ 1.625, 0.5, 3.25],
  },
};

// ── Mur de fond ───────────────────────────────────────────────────────────────
function MurFond({ x, z, largeur, rotY = 0 }: { x: number; z: number; largeur: number; rotY?: number }) {
  return (
    <mesh position={[x, HAUTEUR_MUR / 2, z]} rotation={[0, rotY, 0]} receiveShadow>
      <boxGeometry args={[largeur, HAUTEUR_MUR, EPAISSEUR_MUR]} />
      <meshStandardMaterial color="#e8e4de" roughness={0.85} side={THREE.BackSide} />
    </mesh>
  );
}

function SolPiece({ xMin, xMax, zMin, zMax }: { xMin: number; xMax: number; zMin: number; zMax: number }) {
  const cx = (xMin + xMax) / 2, cz = (zMin + zMax) / 2;
  const w = xMax - xMin, d = zMax - zMin;
  return (
    <mesh position={[cx, -0.01, cz]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[w, d]} />
      <meshStandardMaterial color="#c8b89a" roughness={0.8} />
    </mesh>
  );
}

// ── Point rouge pulsant — Billboard toujours au-dessus des équipements ───────
function PointCliquable({
  position, equipementId, onClic,
}: {
  position: [number, number, number];
  equipementId: string;
  onClic: (id: string) => void;
}) {
  return (
    <Billboard
      position={position}
      follow={true}
      renderOrder={999}
    >
      <group
        onClick={(e) => { e.stopPropagation(); onClic(equipementId); }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        {/* Halo */}
        <mesh renderOrder={999}>
          <circleGeometry args={[0.18, 16]} />
          <meshBasicMaterial
            color="#ef4444"
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
            depthTest={false}
          />
        </mesh>
        {/* Point central */}
        <mesh position={[0, 0, 0.001]} renderOrder={1000}>
          <circleGeometry args={[0.09, 16]} />
          <meshBasicMaterial
            color="#ef4444"
            side={THREE.DoubleSide}
            depthTest={false}
          />
        </mesh>
        {/* Croix blanche */}
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

// ── Bridge : lit equipementModalId du store et remonte via callback ────────────
function EquipementBridge({ onEquipementClick }: { onEquipementClick: (id: string) => void }) {
  const { equipementModalId, setEquipementModalId } = useScene();

  useEffect(() => {
    if (equipementModalId) {
      onEquipementClick(equipementModalId);
      setEquipementModalId(null); // reset pour le prochain clic
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
function RoomScene({
  piece,
  onEquipementClick,
}: {
  piece: PieceId3D;
  onEquipementClick: (id: string) => void;
}) {
  const cfg = ROOM_CONFIG[piece];
  const cx = (cfg.xMin + cfg.xMax) / 2;
  const cz = (cfg.zMin + cfg.zMax) / 2;
  const w  = cfg.xMax - cfg.xMin;
  const d  = cfg.zMax - cfg.zMin;

  const points: Equipment[] = getEquipementsAvecPosition(piece);

  return (
    <>
      <CameraUpdater piece={piece} />
      <EquipementBridge onEquipementClick={onEquipementClick} />

      <EclairagePrincipal modeJourNuit="jour" />
      <Sky sunPosition={[100, 80, 50]} turbidity={4} rayleigh={0.5} />
      <Environment preset="apartment" />

      <SolPiece xMin={cfg.xMin} xMax={cfg.xMax} zMin={cfg.zMin} zMax={cfg.zMax} />
      <MurFond x={cx}       z={cfg.zMin} largeur={w} rotY={0}           />
      <MurFond x={cfg.xMin} z={cz}       largeur={d} rotY={Math.PI / 2} />

      {/* Pièce active */}
      {piece === 'sejour'      && <Sejour      lumiere={true} masquerPlafond={true} />}
      {piece === 'cuisine'     && <Cuisine     lumiere={true} masquerPlafond={true} />}
      {piece === 'chambre'     && <Chambre     lumiere={true} masquerPlafond={true} />}
      {piece === 'salleDeBain' && <SalleDeBain lumiere={true} masquerPlafond={true} />}
      {piece === 'couloir'     && <Couloir     lumiere={true} masquerPlafond={true} />}

      {/* Points rouges cliquables — positions depuis equipements.json */}
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
