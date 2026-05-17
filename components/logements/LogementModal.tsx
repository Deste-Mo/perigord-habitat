"use client";

import { X, Building2, Home, MapPin, Ruler, BedDouble, User, CalendarDays, Euro } from "lucide-react";
import type { Logement } from "@/types/logement";

interface LogementModalProps {
  logement: Logement;
  onClose: () => void;
}

const STATUT_CONFIG: Record<Logement["statut"], { label: string; color: string }> = {
  occupe:  { label: "Occupé",  color: "text-green-700 bg-green-100"  },
  vacant:  { label: "Vacant",  color: "text-orange-700 bg-orange-100" },
  travaux: { label: "Travaux", color: "text-red-700 bg-red-100"       },
};

const DPE_COLOR: Record<string, string> = {
  A: "bg-green-600", B: "bg-lime-500", C: "bg-yellow-400",
  D: "bg-orange-400", E: "bg-orange-600", F: "bg-red-500", G: "bg-red-700",
};

const TYPE_LABEL: Record<Logement["type"], string> = {
  appartement: "Appartement", studio: "Studio", maison: "Maison",
};

export function LogementModal({ logement, onClose }: LogementModalProps) {
  const statut = STATUT_CONFIG[logement.statut];

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              {logement.type === "maison" ? <Home size={20} /> : <Building2 size={20} />}
            </div>
            <div>
              <h2 className="text-lg font-black text-foreground leading-tight">{logement.nom}</h2>
              <p className="text-xs text-muted-foreground">{TYPE_LABEL[logement.type]}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Statut + DPE */}
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${statut.color}`}>
              {statut.label}
            </span>
            <span className={`px-3 py-1.5 rounded-lg text-sm font-black text-white ${DPE_COLOR[logement.dpeClasse] ?? "bg-gray-400"}`}>
              DPE {logement.dpeClasse}
            </span>
          </div>

          {/* Adresse */}
          <div className="bg-muted rounded-xl p-4 flex items-start gap-3">
            <MapPin className="text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Adresse</p>
              <p className="font-semibold text-foreground">{logement.adresse}</p>
              <p className="text-sm text-muted-foreground">{logement.codePostal} {logement.ville}</p>
            </div>
          </div>

          {/* Caractéristiques */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Ruler className="text-muted-foreground" size={15} />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Surface</p>
              </div>
              <p className="font-bold text-foreground text-lg">{logement.surface} m²</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <BedDouble className="text-muted-foreground" size={15} />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Pièces</p>
              </div>
              <p className="font-bold text-foreground text-lg">{logement.nbPieces} pièce{logement.nbPieces > 1 ? "s" : ""}</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="text-muted-foreground" size={15} />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Étage</p>
              </div>
              <p className="font-bold text-foreground text-lg">
                {logement.etage === 0 ? "RDC" : `${logement.etage}e étage`}
              </p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Euro className="text-muted-foreground" size={15} />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Loyer CC</p>
              </div>
              <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">{logement.loyerCC.toLocaleString("fr-FR")} €</p>
            </div>
          </div>

          {/* Locataire */}
          <div className={`rounded-xl p-4 border-2 ${logement.locataire ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" : "bg-muted border-border"}`}>
            <div className="flex items-center gap-2 mb-1">
              <User className={logement.locataire ? "text-blue-500 dark:text-blue-400" : "text-muted-foreground"} size={16} />
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Locataire</p>
            </div>
            {logement.locataire ? (
              <>
                <p className="font-bold text-blue-900 dark:text-blue-200">{logement.locataire}</p>
                {logement.dateEntree && (
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-blue-600 dark:text-blue-400">
                    <CalendarDays size={12} />
                    <span>Entrée le {new Date(logement.dateEntree).toLocaleDateString("fr-FR")}</span>
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground font-medium">Aucun locataire actuellement</p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-foreground hover:bg-foreground/90 text-white font-semibold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
