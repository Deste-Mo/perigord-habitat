"use client";

import { useState } from "react";
import { X, Save, Building2, Home } from "lucide-react";
import type { Logement } from "@/types/logement";

interface LogementEditModalProps {
  logement: Logement;
  onClose: () => void;
  onSave: (updated: Logement) => Promise<void>;
  saving?: boolean;
  saveError?: string | null;
}

export function LogementEditModal({ logement, onClose, onSave, saving = false, saveError }: LogementEditModalProps) {
  const [form, setForm] = useState<Logement>({ ...logement });
  const [isDirty, setIsDirty] = useState(false);

  function set<K extends keyof Logement>(key: K, value: Logement[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

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
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              {logement.type === "maison" ? <Home size={20} /> : <Building2 size={20} />}
            </div>
            <div>
              <h2 className="text-lg font-black text-foreground leading-tight">Modifier le logement</h2>
              <p className="text-xs text-muted-foreground">{logement.adresse}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

            {/* Nom */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Nom du logement</label>
              <input
                type="text" value={form.nom} required
                onChange={(e) => set("nom", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors"
              />
            </div>

            {/* Adresse */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Adresse</label>
              <input
                type="text" value={form.adresse} required
                onChange={(e) => set("adresse", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors"
              />
            </div>

            {/* Code postal + Ville */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Code postal</label>
                <input
                  type="text" value={form.codePostal} required
                  onChange={(e) => set("codePostal", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Ville</label>
                <input
                  type="text" value={form.ville} required
                  onChange={(e) => set("ville", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors"
                />
              </div>
            </div>

            {/* Type + Statut */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => set("type", e.target.value as Logement["type"])}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors bg-card"
                >
                  <option value="appartement">Appartement</option>
                  <option value="studio">Studio</option>
                  <option value="maison">Maison</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Statut</label>
                <select
                  value={form.statut}
                  onChange={(e) => set("statut", e.target.value as Logement["statut"])}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors bg-card"
                >
                  <option value="occupe">Occupé</option>
                  <option value="vacant">Vacant</option>
                  <option value="travaux">Travaux</option>
                </select>
              </div>
            </div>

            {/* Surface + Étage + Pièces */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Surface (m²)</label>
                <input
                  type="number" min={1} value={form.surface} required
                  onChange={(e) => set("surface", Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Étage</label>
                <input
                  type="number" min={0} value={form.etage}
                  onChange={(e) => set("etage", Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Nb pièces</label>
                <input
                  type="number" min={1} value={form.nbPieces} required
                  onChange={(e) => set("nbPieces", Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors"
                />
              </div>
            </div>

            {/* Loyer + DPE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Loyer CC (€/mois)</label>
                <input
                  type="number" min={0} value={form.loyerCC} required
                  onChange={(e) => set("loyerCC", Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Classe DPE</label>
                <select
                  value={form.dpeClasse}
                  onChange={(e) => set("dpeClasse", e.target.value as Logement["dpeClasse"])}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors bg-card"
                >
                  {["A","B","C","D","E","F","G"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Locataire */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Locataire</label>
              <input
                type="text"
                value={form.locataire ?? ""}
                placeholder="Nom du locataire (laisser vide si vacant)"
                onChange={(e) => set("locataire", e.target.value || null)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors"
              />
            </div>

            {/* Date d'entrée */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Date d&apos;entrée</label>
              <input
                type="date"
                value={form.dateEntree ?? ""}
                onChange={(e) => set("dateEntree", e.target.value || null)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-foreground font-medium transition-colors"
              />
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border flex flex-col gap-3 shrink-0">
            {saveError && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
                ⚠️ {saveError}
              </p>
            )}
            <div className="flex gap-3">
              <button
                type="button" onClick={onClose} disabled={saving}
                className="flex-1 py-2.5 rounded-xl border-2 border-border hover:border-gray-300 text-foreground font-semibold text-sm transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="submit" disabled={!isDirty || saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-white font-semibold text-sm transition-colors"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Enregistrement…
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Enregistrer
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
