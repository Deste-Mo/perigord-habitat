'use client';
import React from 'react';

interface Props {
  onCommencer: () => void;
}

function ToucheClavier({ children, large }: { children: React.ReactNode; large?: boolean }) {
  return (
    <div className={`flex items-center justify-center rounded-md border border-white/20
      bg-white/8 text-white font-mono font-semibold shadow-inner select-none
      ${large ? 'w-10 h-9 text-xs' : 'w-9 h-9 text-xs'}`}
      style={{ boxShadow: '0 2px 0 rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)' }}
    >
      {children}
    </div>
  );
}

function IconeSouris() {
  return (
    <svg width="52" height="72" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Corps souris */}
      <rect x="4" y="18" width="44" height="50" rx="22" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      {/* Ligne séparation boutons */}
      <line x1="26" y1="18" x2="26" y2="44" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
      {/* Bouton gauche actif (surbrillance) */}
      <path d="M4 36 Q4 18 26 18 L26 44 Q14 44 4 40 Z" fill="rgba(99,179,237,0.25)" stroke="rgba(99,179,237,0.5)" strokeWidth="1"/>
      {/* Molette */}
      <rect x="22" y="26" width="8" height="14" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      {/* Câble */}
      <path d="M26 0 Q26 8 26 18" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"/>
      {/* Flèche de glissement */}
      <path d="M44 30 L54 30" stroke="rgba(99,179,237,0.8)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2"/>
      <path d="M50 26 L55 30 L50 34" stroke="rgba(99,179,237,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function ModalGuideVisite({ onCommencer }: Props) {
  return (
    <>
      {/* Fond semi-transparent */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

      {/* Carte modale */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-lg bg-gray-950/90 backdrop-blur-xl
          border border-white/12 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden
          animate-fade-in-up">

          {/* En-tête */}
          <div className="px-6 pt-6 pb-4 border-b border-white/8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-400/25
                flex items-center justify-center text-base">
                🚶
              </div>
              <div>
                <h2 className="text-white font-semibold text-base">Mode Visite</h2>
                <p className="text-white/40 text-xs mt-0.5">Guide de navigation à l'intérieur du bâtiment</p>
              </div>
            </div>
          </div>

          {/* Corps — deux colonnes */}
          <div className="px-6 py-5 grid grid-cols-2 gap-6">

            {/* Colonne 1 : Déplacement */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                Déplacement
              </span>

              <div className="flex flex-col items-center gap-1.5">
                {/* Rangée W */}
                <div className="flex justify-center">
                  <ToucheClavier>W</ToucheClavier>
                </div>
                {/* Rangée A S D */}
                <div className="flex gap-1.5">
                  <ToucheClavier>A</ToucheClavier>
                  <ToucheClavier>S</ToucheClavier>
                  <ToucheClavier>D</ToucheClavier>
                </div>

                <span className="text-white/25 text-[10px] mt-0.5">ou</span>

                {/* Touches fléchées */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex justify-center">
                    <ToucheClavier>↑</ToucheClavier>
                  </div>
                  <div className="flex gap-1">
                    <ToucheClavier>←</ToucheClavier>
                    <ToucheClavier>↓</ToucheClavier>
                    <ToucheClavier>→</ToucheClavier>
                  </div>
                </div>
              </div>

              <p className="text-white/35 text-[11px] text-center leading-relaxed">
                Se déplacer dans la pièce
              </p>
            </div>

            {/* Colonne 2 : Orientation */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                Orientation
              </span>

              <div className="flex flex-col items-center gap-2">
                <IconeSouris />

                <div className="flex items-center gap-2 mt-1">
                  <div className="w-5 h-0.5 bg-blue-400/60 rounded-full" />
                  <span className="text-blue-300/70 text-[11px] font-medium">Clic gauche + glisser</span>
                </div>
              </div>

              <p className="text-white/35 text-[11px] text-center leading-relaxed">
                Tourner la tête pour regarder autour
              </p>
            </div>
          </div>

          {/* Note info */}
          <div className="mx-6 mb-5 px-3 py-2.5 rounded-lg bg-white/4 border border-white/8">
            <p className="text-white/40 text-[11px] leading-relaxed text-center">
              Le curseur reste libre — cliquez et maintenez le bouton gauche de la souris pour orienter votre vue
            </p>
          </div>

          {/* Bouton Commencer */}
          <div className="px-6 pb-6">
            <button
              onClick={onCommencer}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200
                bg-gradient-to-r from-blue-600/80 to-blue-700/80
                hover:from-blue-500/90 hover:to-blue-600/90
                text-white border border-blue-400/30 hover:border-blue-300/50
                shadow-lg shadow-blue-900/30 hover:shadow-blue-800/40
                hover:scale-[1.02] active:scale-[0.99]"
            >
              Commencer la visite →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
