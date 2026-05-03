'use client';

import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FournisseurScene } from '@/hooks/SceneProvider';
import { Sejour }      from '@/components/scene/pieces/Sejour';
import { Cuisine }     from '@/components/scene/pieces/Cuisine';
import { Chambre }     from '@/components/scene/pieces/Chambre';
import { SalleDeBain } from '@/components/scene/pieces/SalleDeBain';
import { Couloir }     from '@/components/scene/pieces/Couloir';
import { EclairagePrincipal } from '@/components/scene/eclairage/EclairagePrincipal';

export type PieceId3D = 'sejour' | 'cuisine' | 'chambre' | 'salleDeBain' | 'couloir';

// ─── Limites intérieures des pièces ──────────────────────────────────────────
const PIECE_BOUNDS: Record<PieceId3D, { xMin: number; xMax: number; zMin: number; zMax: number }> = {
  sejour:      { xMin: -5.875, xMax:  0.625, zMin: -4.875, zMax:  1.125 },
  cuisine:     { xMin:  0.875, xMax:  5.875, zMin: -4.875, zMax:  1.125 },
  chambre:     { xMin: -5.875, xMax:  0.625, zMin:  1.625, zMax:  4.875 },
  salleDeBain: { xMin:  2.625, xMax:  5.875, zMin:  1.625, zMax:  4.875 },
  couloir:     { xMin:  0.875, xMax:  2.375, zMin:  1.625, zMax:  4.875 },
};

const SEUIL = 0.3;   // distance au mur pour détecter la surface
const DIST  = 1.5;   // distance caméra → équipement

// ─── Calcul de la position caméra selon la surface détectée ──────────────────
function getCameraForEquipement(
  pos: [number, number, number],
  piece: PieceId3D,
): { camPos: [number, number, number]; target: [number, number, number] } {
  const [x, y, z] = pos;
  const b = PIECE_BOUNDS[piece];

  // SOL
  if (y < 0.1) {
    return {
      camPos: [x, y + DIST, z],
      target: [x, y, z],
    };
  }

  // PLAFOND
  if (y > 2.5) {
    return {
      camPos: [x, y - DIST, z],
      target: [x, y, z],
    };
  }

  // MUR GAUCHE (x proche de xMin) → caméra vient du +X
  if (Math.abs(x - b.xMin) < SEUIL) {
    return {
      camPos: [x + DIST, y, z],
      target: [x, y, z],
    };
  }

  // MUR DROIT (x proche de xMax) → caméra vient du -X
  if (Math.abs(x - b.xMax) < SEUIL) {
    return {
      camPos: [x - DIST, y, z],
      target: [x, y, z],
    };
  }

  // MUR ARRIÈRE (z proche de zMin) → caméra vient du +Z
  if (Math.abs(z - b.zMin) < SEUIL) {
    return {
      camPos: [x, y, z + DIST],
      target: [x, y, z],
    };
  }

  // MUR AVANT (z proche de zMax) → caméra vient du -Z
  if (Math.abs(z - b.zMax) < SEUIL) {
    return {
      camPos: [x, y, z - DIST],
      target: [x, y, z],
    };
  }

  // Fallback isométrique léger
  return {
    camPos: [x + DIST * 0.8, y + DIST * 0.6, z + DIST * 0.8],
    target: [x, y, z],
  };
}

// ─── Composant caméra interne ─────────────────────────────────────────────────
function CameraFocused({
  camPos,
  target,
}: {
  camPos: [number, number, number];
  target: [number, number, number];
}) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...camPos);
    camera.lookAt(new THREE.Vector3(...target));
    camera.updateProjectionMatrix();
  }, [camera, camPos, target]);

  return null;
}

// ─── Sol de chaque pièce ──────────────────────────────────────────────────────
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

// ─── Scène complète ───────────────────────────────────────────────────────────
function MiniScene({
  piece,
  camPos,
  target,
}: {
  piece: PieceId3D;
  camPos: [number, number, number];
  target: [number, number, number];
}) {
  return (
    <>
      <CameraFocused camPos={camPos} target={target} />
      <color attach="background" args={['#dbeafe']} />
      <EclairagePrincipal modeJourNuit="jour" />
      <Environment preset="apartment" />
      <SolPiece piece={piece} />
      {piece === 'sejour'      && <Sejour      lumiere={true} masquerPlafond={true} />}
      {piece === 'cuisine'     && <Cuisine     lumiere={true} masquerPlafond={true} />}
      {piece === 'chambre'     && <Chambre     lumiere={true} masquerPlafond={true} />}
      {piece === 'salleDeBain' && <SalleDeBain lumiere={true} masquerPlafond={true} />}
      {piece === 'couloir'     && <Couloir     lumiere={true} masquerPlafond={true} />}
    </>
  );
}

// ─── Export principal ─────────────────────────────────────────────────────────
interface Props {
  piece: PieceId3D;
  position3D: [number, number, number];
  className?: string;
}

export function EquipmentMiniature3D({ piece, position3D, className = '' }: Props) {
  const { camPos, target } = getCameraForEquipement(position3D, piece);

  return (
    <div className={className}>
      <FournisseurScene>
        <Canvas
          camera={{
            fov: 42,
            near: 0.05,
            far: 200,
            position: camPos,
          }}
          onCreated={({ camera }) => {
            camera.lookAt(new THREE.Vector3(...target));
          }}
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
            <MiniScene piece={piece} camPos={camPos} target={target} />
          </Suspense>
        </Canvas>
      </FournisseurScene>
    </div>
  );
}
