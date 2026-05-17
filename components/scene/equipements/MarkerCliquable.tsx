'use client';
import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useMarkersVisibles } from '@/hooks/useMarkersVisibles';
import { useScene } from '@/hooks/useSceneStore';

interface MarkerCliquableProps {
  position?: [number, number, number];
  taille?: number;
  couleur?: string;
  zone?: 'exterieur' | 'interieur';
  libelle?: string;
  equipementId?: string;
  idPiece?: string;
}

let stylesInjected = false;
function injectMarkerStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const css = `
    @keyframes markerPulse {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    @keyframes markerPulse2 {
      0% { transform: scale(1); opacity: 0.4; }
      100% { transform: scale(2.6); opacity: 0; }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

export function MarkerCliquable({
  position = [0, 0, 0],
  taille = 20,
  couleur = '#ff6b00',
  zone,
  libelle,
  equipementId,
  idPiece,
}: MarkerCliquableProps) {
  const [hover, setHover] = useState(false);
  const { markersVisibles, setHoveredEquipementId, pieceMarkersActive } = useMarkersVisibles();
  const { pieceActive, equipementModalId, setEquipementModalId } = useScene();

  useEffect(() => { injectMarkerStyles(); }, []);

  if (!markersVisibles) return null;
  if (equipementModalId) return null;
  if (idPiece && pieceMarkersActive !== idPiece) return null;
  if (zone === 'exterieur' && pieceActive !== 'exterieur') return null;
  if (zone === 'interieur' && pieceActive === 'exterieur') return null;

  if (idPiece) {
    const pieceVisible = idPiece === 'couloirEntree'
      ? (pieceActive === 'sejour' || pieceActive === 'cuisine' || pieceActive === 'interieur')
      : pieceActive === idPiece || pieceActive === 'interieur';
    if (!pieceVisible) return null;
  }

  const activeColor = hover ? '#00cc66' : couleur;
  const whiteSize = Math.round(taille * 0.56);
  const dotSize = Math.round(taille * 0.3);

  return (
    <Html position={position} center zIndexRange={[18, 8]} style={{ pointerEvents: libelle ? 'auto' : 'none' }}>
      <div
        onClick={() => {
          if (equipementId) {
            setHoveredEquipementId(null);
            setEquipementModalId(equipementId);
          }
        }}
        onPointerEnter={() => {
          if (libelle) setHover(true);
          if (equipementId) setHoveredEquipementId(equipementId);
        }}
        onPointerLeave={() => {
          setHover(false);
          if (equipementId) setHoveredEquipementId(null);
        }}
        style={{
          position: 'relative',
          width: taille,
          height: taille,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: libelle ? 'pointer' : 'default',
          transition: 'transform 0.2s ease',
          transform: hover ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `2px solid ${activeColor}`,
            opacity: 0.5,
            animation: 'markerPulse 2s ease-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `2px solid ${activeColor}`,
            opacity: 0.4,
            animation: 'markerPulse2 2s ease-out 0.6s infinite',
          }}
        />
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: activeColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hover
              ? `0 0 14px ${activeColor}66, 0 2px 8px rgba(0,0,0,0.25)`
              : '0 1px 4px rgba(0,0,0,0.15)',
            transition: 'background-color 0.25s ease, box-shadow 0.25s ease',
          }}
        >
          <div
            style={{
              width: whiteSize,
              height: whiteSize,
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                backgroundColor: activeColor,
                transition: 'background-color 0.25s ease',
              }}
            />
          </div>
        </div>
        {hover && libelle && (
          <div
            style={{
              position: 'absolute',
              bottom: '120%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              color: 'white',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '11px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              letterSpacing: '0.02em',
            }}
          >
            {libelle}
          </div>
        )}
      </div>
    </Html>
  );
}
