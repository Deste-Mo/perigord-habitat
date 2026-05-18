'use client';
import { useState, useCallback } from 'react';
import { Html } from '@react-three/drei';
import { useMarkersVisibles } from '@/hooks/useMarkersVisibles';
import { useScene } from '@/hooks/useSceneStore';
import type { IdPiece } from '@/types/maison';

const PIECES_NAVIGABLES = new Set<IdPiece>(['sejour', 'cuisine', 'chambre', 'salleDeBain', 'couloir', 'couloirEntree']);

interface ZonePieceProps {
  idPiece: string;
  nom: string;
  x: number;
  z: number;
  largeur: number;
  profondeur: number;
  y?: number;
  plafond?: number;
}

export function ZonePiece({ idPiece, nom, x, z, largeur, profondeur, y = 0.12, plafond = 2.75 }: ZonePieceProps) {
  const [hovered, setHovered] = useState(false);
  const { pieceMarkersActive, setPieceMarkersActive } = useMarkersVisibles();
  const { setPieceActive, setModeCamera } = useScene();
  const isActive = pieceMarkersActive === idPiece;

  const onPointerOver = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  }, []);

  const onPointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  }, []);

  const onClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setPieceMarkersActive(isActive ? null : idPiece);
    if (PIECES_NAVIGABLES.has(idPiece as IdPiece)) {
      setPieceActive(idPiece as IdPiece);
      setModeCamera('visite');
    }
  }, [isActive, idPiece, setPieceMarkersActive, setPieceActive, setModeCamera]);

  return (
    <group>
      {/* Plan de détection invisible — intercepte les raycasts sur la surface de la pièce */}
      <mesh
        position={[x, y, z]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      >
        <planeGeometry args={[largeur, profondeur]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Plafond flottant — surbrillance suspendue au-dessus de la pièce */}
      {hovered && !isActive && (
        <mesh position={[x, plafond, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[largeur, profondeur]} />
          <meshBasicMaterial
            color="#ff6b00"
            transparent
            opacity={0.7}
            depthWrite={false}
            side={2}
          />
        </mesh>
      )}

      {/* Tooltip au survol — positionné au-dessus du plafond flottant */}
      {hovered && (
        <Html position={[x, plafond + 0.35, z]} center zIndexRange={[200, 0]}>
          <div
            style={{
              background: 'rgba(0,0,0,0.82)',
              color: 'white',
              padding: '5px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontFamily: 'sans-serif',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#ff6b00',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            {isActive ? `${nom} — points affichés` : nom}
          </div>
        </Html>
      )}
    </group>
  );
}
