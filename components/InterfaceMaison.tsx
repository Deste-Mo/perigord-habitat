'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { EquipementDetailModal } from '@/components/modals/EquipementDetailModal';
import { getEquipementById } from '@/lib/equipements';
import { useMarkersVisibles } from '@/hooks/useMarkersVisibles';
import { useScene } from '@/hooks/useSceneStore';
import type { IdPiece, ModeCamera } from '@/types/maison';

const PIECES: { id: IdPiece; label: string }[] = [
  { id: 'sejour',        label: 'Séjour' },
  { id: 'cuisine',       label: 'Cuisine' },
  { id: 'chambre',       label: 'Chambre' },
  { id: 'salleDeBain',   label: 'Salle de bain' },
  { id: 'couloirEntree', label: "Couloir d'entrée" },
];

const NOMS_PIECES: Record<string, string> = {
  sejour: 'Séjour', cuisine: 'Cuisine', chambre: 'Chambre', salleDeBain: 'Salle de bain',
  couloir: 'Couloir', couloirEntree: "Couloir d'entrée", exterieur: 'Extérieur', interieur: 'Intérieur',
};

function SelecteurCamera({ modeCamera, setModeCamera }: { modeCamera: ModeCamera; setModeCamera: (m: ModeCamera) => void }) {
  return (
    <div className="flex rounded-lg border border-white/10 overflow-hidden">
      {(['orbite', 'visite'] as ModeCamera[]).map(m => (
        <button
          key={m}
          onClick={() => setModeCamera(m)}
          className={`flex-1 px-3 py-1.5 text-xs font-medium transition-all duration-150
            ${modeCamera === m
              ? 'bg-white/10 text-white'
              : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
        >
          {m === 'orbite' ? 'Orbite' : 'Visite'}
        </button>
      ))}
    </div>
  );
}

export function InterfaceMaison() {
  const { pieceActive, setPieceActive, setModeCamera, modeCamera, tooltip, equipementModalId, setEquipementModalId,
    sensibiliteCamera, setSensibiliteCamera } = useScene();
  const { markersVisibles, toggleMarkers, setPieceMarkersActive } = useMarkersVisibles();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const estExterieur = pieceActive === 'exterieur';
  const pieceCourante = NOMS_PIECES[pieceActive] || '';

  const equipementModal = equipementModalId ? getEquipementById(equipementModalId) : null;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none">

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y - 40}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-gray-950/95 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20 shadow-2xl">
            <span className="text-white text-sm font-medium whitespace-nowrap">{tooltip}</span>
          </div>
        </div>
      )}

      {/* Modale Équipement */}
      {equipementModal && (
        <div className="pointer-events-auto">
          <EquipementDetailModal
            equipement={equipementModal}
            onClose={() => setEquipementModalId(null)}
          />
        </div>
      )}

      {/* Menu flottant — côté droit */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-auto z-30">
        <div className="bg-gray-950/70 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50
          min-w-[180px] py-3 px-4 flex flex-col gap-4">

          {/* ── Retour ──────────────────────────────── */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-150"
          >
            <span className="text-xs">←</span>
            <span className="font-medium">Retour</span>
          </button>

          <hr className="border-white/8" />

          {/* ── Caméra ──────────────────────────────── */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Caméra</span>
            <SelecteurCamera modeCamera={modeCamera} setModeCamera={setModeCamera} />
          </div>

          {/* ── Marqueurs ────────────────────────────── */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Marqueurs</span>
            <button
              onClick={toggleMarkers}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
                bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-150"
            >
              {markersVisibles ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Points orange</span>
            </button>
          </div>

          {/* ── Sensibilité ──────────────────────────── */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Sensibilité</span>
            <div className="flex items-center gap-2 px-1">
              <input
                type="range" min="0.5" max="3.0" step="0.1"
                value={sensibiliteCamera}
                onChange={e => setSensibiliteCamera(parseFloat(e.target.value))}
                className="flex-1 h-1 rounded-full accent-white/50 cursor-pointer"
              />
              <span className="text-xs text-white/50 min-w-[28px] text-right">{sensibiliteCamera.toFixed(1)}x</span>
            </div>
          </div>

          <hr className="border-white/8" />

          {/* ── Navigation intérieure ────────────────── */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Navigation</span>

            {estExterieur ? (
              <button
                onClick={() => { setPieceActive('interieur'); setModeCamera('orbite'); }}
                className="w-full px-3 py-1.5 rounded-lg text-xs font-medium
                  bg-white/10 hover:bg-white/15 text-white transition-all duration-150"
              >
                Entrer dans la maison
              </button>
            ) : (
              <>
                <button
                  onClick={() => { setPieceActive('exterieur'); setPieceMarkersActive('exterieur'); }}
                  className="w-full px-3 py-1.5 rounded-lg text-xs font-medium
                    bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-150"
                >
                  Sortir
                </button>

                <button
                  onClick={() => { setPieceActive('interieur'); setModeCamera('orbite'); }}
                  className="w-full px-3 py-1.5 rounded-lg text-xs font-medium
                    bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-150"
                >
                  Vue aérienne
                </button>

                <select
                  value={PIECES.some(p => p.id === pieceActive) ? pieceActive : ''}
                  onChange={e => {
                    const valeur = e.target.value;
                    if (valeur) {
                      setPieceActive(valeur as IdPiece);
                      setPieceMarkersActive(valeur);
                      setModeCamera('visite');
                    }
                  }}
                  className="w-full px-3 py-1.5 rounded-lg text-xs font-medium
                    bg-white/5 hover:bg-white/10 border border-white/8
                    text-white/70 hover:text-white outline-none cursor-pointer
                    transition-all duration-150 appearance-none"
                  style={{ backgroundImage: 'none' }}
                >
                  <option value="" disabled className="text-gray-400 bg-gray-900">Choisir une pièce</option>
                  {PIECES.map(p => (
                    <option key={p.id} value={p.id} className="text-white bg-gray-900">
                      {p.label}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Badge pièce active — bas à gauche */}
      {!estExterieur && pieceCourante && (
        <div className="absolute bottom-6 left-6 pointer-events-none z-30">
          <div className="bg-gray-950/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/8">
            <span className="text-white/50 text-xs font-medium tracking-wide">{pieceCourante}</span>
          </div>
        </div>
      )}

    </div>
  );
}
