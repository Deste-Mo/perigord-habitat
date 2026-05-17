'use client';
import React from 'react';
import type { Equipement } from '@/types/equipement';

interface Props {
  equipement: Equipement | null;
  onClose: () => void;
}

export function EquipementDetailModal({ equipement, onClose }: Props) {
  if (!equipement) return null;

  const badgeResponsable = equipement.typeRemarque === 'bailleur'
    ? 'bg-blue-500/15 text-blue-300 border-blue-500/25'
    : equipement.typeRemarque === 'locataire'
    ? 'bg-orange-500/15 text-orange-300 border-orange-500/25'
    : 'bg-purple-500/15 text-purple-300 border-purple-500/25';

  const remarqueBordure = equipement.typeRemarque === 'bailleur'
    ? 'border-l-blue-500/40'
    : equipement.typeRemarque === 'locataire'
    ? 'border-l-orange-500/40'
    : 'border-l-purple-500/40';

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed left-0 top-0 bottom-0 w-full max-w-md bg-gray-950/70 backdrop-blur-xl border-r border-white/10 shadow-2xl shadow-black/50 z-50 flex flex-col animate-slide-in-left">
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/8">
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white truncate">{equipement.nom}</h2>
            <p className="text-[11px] text-white/40 truncate">{equipement.piece}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-all duration-150 ml-3 shrink-0"
            aria-label="Fermer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Responsable */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Responsable</span>
            <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-md border ${badgeResponsable}`}>
              {equipement.responsable}
            </span>
          </div>

          <hr className="border-white/8" />

          {/* Charge locative + Maintenance */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg px-3 py-2.5 border border-white/8">
              <div className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-1.5">
                Charge locative
              </div>
              <div className="text-sm font-medium text-white/80">
                {equipement.chargeLocative ? 'Oui' : 'Non'}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg px-3 py-2.5 border border-white/8">
              <div className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-1.5">
                Maintenance
              </div>
              <div className="text-sm font-medium text-white/80">
                {equipement.contratMaintenance ? 'Oui' : 'Non'}
              </div>
            </div>
          </div>

          <hr className="border-white/8" />

          {/* Référence légale */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Référence légale
            </span>
            <div className="bg-white/5 rounded-lg px-3 py-2.5 border border-white/8">
              <p className="text-sm text-white/70 leading-relaxed">{equipement.referenceLegale}</p>
            </div>
          </div>

          {/* Remarque */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Remarque
            </span>
            <div className={`bg-white/5 rounded-lg px-3 py-2.5 border border-white/8 border-l-2 ${remarqueBordure}`}>
              <p className="text-sm text-white/70 leading-relaxed">{equipement.remarque}</p>
            </div>
          </div>

          {/* ID */}
          <div className="pt-2">
            <p className="text-[10px] text-white/20 font-mono">ID: {equipement.id}</p>
          </div>
        </div>

        <div className="px-5 py-3 flex justify-end border-t border-white/8">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-150"
          >
            Fermer
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.25s ease-out;
        }
      `}</style>
    </>
  );
}
