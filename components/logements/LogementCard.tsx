"use client";

import { Building2, Home, BedDouble, Ruler, Info, Pencil, User, CircleDot } from "lucide-react";
import type { Logement } from "@/types/logement";

interface LogementCardProps {
  logement: Logement;
  onDetails: (logement: Logement) => void;
  onEdit: (logement: Logement) => void;
}

const TYPE_ICON: Record<Logement["type"], React.ReactNode> = {
  appartement: <Building2 size={26} />,
  studio:      <Home size={26} />,
  maison:      <Home size={26} />,
};

const TYPE_LABEL: Record<Logement["type"], string> = {
  appartement: "Appartement",
  studio:      "Studio",
  maison:      "Maison",
};

const STATUT_CONFIG: Record<Logement["statut"], { label: string; color: string; dot: string }> = {
  occupe:  { label: "Occupé",   color: "bg-green-100 text-green-700 border-green-300",  dot: "bg-green-500"  },
  vacant:  { label: "Vacant",   color: "bg-orange-100 text-orange-700 border-orange-300", dot: "bg-orange-500" },
  travaux: { label: "Travaux",  color: "bg-red-100 text-red-700 border-red-300",        dot: "bg-red-500"    },
};

const DPE_COLOR: Record<string, string> = {
  A: "bg-green-600",
  B: "bg-lime-500",
  C: "bg-yellow-400 text-gray-900",
  D: "bg-orange-400",
  E: "bg-orange-600",
  F: "bg-red-500",
  G: "bg-red-700",
};

export function LogementCard({ logement, onDetails, onEdit }: LogementCardProps) {
  const statut = STATUT_CONFIG[logement.statut];

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            {TYPE_ICON[logement.type]}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 flex items-center gap-1.5 ${statut.color}`}>
              <CircleDot size={11} />
              {statut.label}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-xs font-black text-white ${DPE_COLOR[logement.dpeClasse] ?? "bg-gray-400"}`}>
              DPE {logement.dpeClasse}
            </span>
          </div>
        </div>

        {/* Nom + adresse */}
        <h3 className="text-xl font-black text-gray-900 mb-1 leading-tight">{logement.nom}</h3>
        <p className="text-sm text-gray-500 mb-4">{logement.adresse}, {logement.codePostal} {logement.ville}</p>

        {/* Infos */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1.5"><Ruler size={13} /> Surface</span>
            <span className="font-semibold text-gray-900">{logement.surface} m²</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1.5"><BedDouble size={13} /> Pièces</span>
            <span className="font-semibold text-gray-900">{logement.nbPieces} pièce{logement.nbPieces > 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Type</span>
            <span className="font-semibold text-gray-900">{TYPE_LABEL[logement.type]}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Loyer CC</span>
            <span className="font-bold text-indigo-600">{logement.loyerCC.toLocaleString("fr-FR")} €/mois</span>
          </div>

          {/* Locataire */}
          {logement.locataire ? (
            <div className="flex items-center gap-2 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg mt-1">
              <User size={13} />
              <span className="font-medium">{logement.locataire}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs bg-gray-50 text-gray-400 px-3 py-2 rounded-lg mt-1">
              <User size={13} />
              <span className="font-medium">Aucun locataire</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer boutons ────────────────────────────────────────────────── */}
      <div className="px-6 pb-6 pt-0 grid grid-cols-2 gap-3">
        <button
          onClick={() => onDetails(logement)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-gray-100 hover:bg-gray-200 active:bg-gray-300
            text-gray-800 font-semibold text-sm
            transition-all duration-150 hover:scale-[1.02] active:scale-95"
        >
          <Info size={15} />
          Détails
        </button>
        <button
          onClick={() => onEdit(logement)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
            text-white font-semibold text-sm
            transition-all duration-150 hover:scale-[1.02] active:scale-95"
        >
          <Pencil size={15} />
          Modifier
        </button>
      </div>

    </div>
  );
}
