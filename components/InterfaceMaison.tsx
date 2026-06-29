'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Menu, X } from 'lucide-react';
import { EquipementDetailModal } from '@/components/modals/EquipementDetailModal';
import { ModalGuideVisite } from '@/components/ui/ModalGuideVisite';
import { getEquipementById } from '@/lib/equipements';
import { useMarkersVisibles } from '@/hooks/useMarkersVisibles';
import { useScene } from '@/hooks/useSceneStore';
import { MobileNavPad } from '@/components/MobileNavPad';
import type { IdPiece, ModeCamera } from '@/types/maison';

const NOMS_PIECES: Record<string, string> = {
  sejour: 'Séjour', cuisine: 'Cuisine', chambre: 'Chambre', salleDeBain: 'Salle de bain',
  couloir: 'Couloir', couloirEntree: "Couloir d'entrée", exterieur: 'Extérieur', interieur: 'Intérieur',
};

/** Retourne true si la largeur de fenêtre est inférieure au breakpoint md (768px). */
function useEstMobile() {
  const [estMobile, setEstMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setEstMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEstMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return estMobile;
}

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

function ContenuMenu() {
  const { pieceActive, setPieceActive, setModeCamera, modeCamera, sensibiliteCamera, setSensibiliteCamera } = useScene();
  const { markersVisibles, toggleMarkers, setPieceMarkersActive } = useMarkersVisibles();
  const router = useRouter();
  const estExterieur = pieceActive === 'exterieur';
  const estMobile = useEstMobile();

  const PIECES_LISTE: { id: IdPiece; label: string }[] = [
    { id: 'sejour', label: 'Séjour' },
    { id: 'cuisine', label: 'Cuisine' },
    { id: 'chambre', label: 'Chambre' },
    { id: 'salleDeBain', label: 'Salle de bain' },
    { id: 'couloirEntree', label: "Couloir d'entrée" },
  ];

  return (
    <>
      <button onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-150">
        <span className="text-xs">←</span>
        <span className="font-medium">Retour</span>
      </button>

      <hr className="border-white/8" />

      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Caméra</span>
        <SelecteurCamera modeCamera={modeCamera} setModeCamera={setModeCamera} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Marqueurs</span>
        <button onClick={toggleMarkers}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
            bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-150">
          {markersVisibles ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>Points orange</span>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Sensibilité</span>
        <div className="flex items-center gap-2 px-1">
          <input type="range" min="0.5" max="3.0" step="0.1" value={sensibiliteCamera}
            onChange={e => setSensibiliteCamera(parseFloat(e.target.value))}
            className="flex-1 h-1 rounded-full accent-white/50 cursor-pointer" />
          <span className="text-xs text-white/50 min-w-[28px] text-right">{sensibiliteCamera.toFixed(1)}x</span>
        </div>
      </div>

      <hr className="border-white/8" />

      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Navigation</span>

        {estExterieur ? (
          <button onClick={() => { setPieceActive('interieur'); setModeCamera('orbite'); }}
            className="w-full px-3 py-1.5 rounded-lg text-xs font-medium
              bg-white/10 hover:bg-white/15 text-white transition-all duration-150">
            Entrer dans la maison
          </button>
        ) : (
          <>
            <button onClick={() => { setPieceActive('exterieur'); setPieceMarkersActive('exterieur'); }}
              className="w-full px-3 py-1.5 rounded-lg text-xs font-medium
                bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-150">
              Sortir
            </button>

            <button onClick={() => { setPieceActive('interieur'); setModeCamera('orbite'); }}
              className="w-full px-3 py-1.5 rounded-lg text-xs font-medium
                bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-150">
              Vue aérienne
            </button>

            <select value={PIECES_LISTE.some(p => p.id === pieceActive) ? pieceActive : ''}
              onChange={e => {
                const valeur = e.target.value;
                if (valeur) {
                  setPieceActive(valeur as IdPiece);
                  setPieceMarkersActive(valeur);
                  // Mobile → orbite plongeante (vue de la pièce entière)
                  // Desktop → visite FPS immersive
                  setModeCamera(estMobile ? 'orbite' : 'visite');
                }
              }}
              className="w-full px-3 py-1.5 rounded-lg text-xs font-medium
                bg-white/5 hover:bg-white/10 border border-white/8
                text-white/70 hover:text-white outline-none cursor-pointer
                transition-all duration-150 appearance-none"
              style={{ backgroundImage: 'none' }}>
              <option value="" disabled className="text-gray-400 bg-gray-900">Choisir une pièce</option>
              {PIECES_LISTE.map(p => (
                <option key={p.id} value={p.id} className="text-white bg-gray-900">{p.label}</option>
              ))}
            </select>
          </>
        )}
      </div>
    </>
  );
}

export function InterfaceMaison() {
  const { pieceActive, modeCamera, tooltip, equipementModalId, setEquipementModalId } = useScene();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [padVisible, setPadVisible] = useState(true);
  const [guideVisible, setGuideVisible] = useState(false);
  const guideDejaMontre = useRef(false);

  // Affiche le guide une seule fois à la première entrée en mode visite
  useEffect(() => {
    if (modeCamera === 'visite' && !guideDejaMontre.current) {
      setGuideVisible(true);
      guideDejaMontre.current = true;
    }
  }, [modeCamera]);

  const estExterieur = pieceActive === 'exterieur';
  const pieceCourante = NOMS_PIECES[pieceActive] || '';

  const equipementModal = equipementModalId ? getEquipementById(equipementModalId) : null;

  // Mode visite actif dans une pièce réelle → afficher le pad mobile
  const estModeVisite = modeCamera === 'visite';
  const pieceSpecifique = pieceActive !== 'exterieur' && pieceActive !== 'interieur';
  const padMobileVisible = estModeVisite && pieceSpecifique;

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

      {/* Guide de navigation — mode visite */}
      {guideVisible && (
        <div className="pointer-events-auto">
          <ModalGuideVisite onCommencer={() => setGuideVisible(false)} />
        </div>
      )}

      {/* ── Overlay ferme le bottom sheet ── */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30 pointer-events-auto"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Bottom sheet menu mobile ── */}
      <div className={`md:hidden fixed z-40 pointer-events-auto transition-transform duration-300 ease-out
        left-0 right-0 bottom-0
        ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-gray-950/85 backdrop-blur-2xl border-t border-white/10 rounded-t-2xl
          shadow-2xl shadow-black/60 py-3 px-4 flex flex-col gap-4 max-h-[78vh] overflow-y-auto pb-8">
          <div className="flex justify-center -mt-1 mb-1">
            <div className="w-10 h-1 rounded-full bg-white/25" />
          </div>
          <ContenuMenu />
        </div>
      </div>

      {/* ── Pad directionnel — centré en bas, indépendant du menu ── */}
      {padMobileVisible && padVisible && !mobileMenuOpen && (
        <div className="md:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
          <MobileNavPad />
        </div>
      )}

      {/* ── Boutons flottants bas-droite (mobile) ──────────────────────────
          De gauche à droite :  [toggle flèches]  [☰]
          Positionnés ensemble en bas à droite, séparés du pad centré.
      ─────────────────────────────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-6 right-4 z-50 pointer-events-auto flex flex-col items-center gap-2">

        {/* Toggle afficher/cacher le pad — visible uniquement en mode visite */}
        {padMobileVisible && (
          <button
            onClick={() => setPadVisible(v => !v)}
            className={`flex items-center justify-center w-10 h-10 rounded-full
              backdrop-blur-xl border transition-all duration-150 active:scale-95
              ${padVisible
                ? 'bg-white/15 border-white/20 text-white'
                : 'bg-gray-950/70 border-white/10 text-white/50'}`}
            aria-label={padVisible ? 'Cacher les flèches' : 'Afficher les flèches'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        )}

        {/* Bouton menu ☰ */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full
            bg-gray-950/70 backdrop-blur-xl border border-white/10
            text-white/70 hover:text-white transition-all duration-150 active:scale-95"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Menu desktop — flottant à droite, inchangé ── */}
      <div className="hidden md:block fixed right-5 top-1/2 -translate-y-1/2 z-40 pointer-events-auto">
        <div className="bg-gray-950/70 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50
          min-w-[180px] py-3 px-4 flex flex-col gap-4">
          <ContenuMenu />
        </div>
      </div>

      {/* Badge pièce active — bas à gauche */}
      {!estExterieur && pieceCourante && (
        <div className={`md:hidden fixed left-4 pointer-events-none z-30 transition-all duration-300
          ${mobileMenuOpen ? 'bottom-[78vh]' : 'bottom-6'}`}>
          <div className="bg-gray-950/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/8">
            <span className="text-white/50 text-xs font-medium tracking-wide">{pieceCourante}</span>
          </div>
        </div>
      )}
      {/* Badge pièce active desktop */}
      {!estExterieur && pieceCourante && (
        <div className="hidden md:block fixed left-4 bottom-4 pointer-events-none z-30">
          <div className="bg-gray-950/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/8">
            <span className="text-white/50 text-xs font-medium tracking-wide">{pieceCourante}</span>
          </div>
        </div>
      )}

    </div>
  );
}
