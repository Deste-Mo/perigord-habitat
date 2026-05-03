"use client";

import { useState } from "react";
import type { Logement } from "@/types/logement";
import logementsData from "@/data/logements.json";

export function useLogementsData() {
  const [logements, setLogements] = useState<Logement[]>(
    logementsData.logements as Logement[]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatut, setSelectedStatut] = useState<string>("all");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const villes = Array.from(new Set(logements.map((l) => l.ville)));

  const filteredLogements = logements.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      l.nom.toLowerCase().includes(q) ||
      l.adresse.toLowerCase().includes(q) ||
      l.ville.toLowerCase().includes(q) ||
      (l.locataire?.toLowerCase().includes(q) ?? false);
    const matchStatut = selectedStatut === "all" || l.statut === selectedStatut;
    return matchSearch && matchStatut;
  });

  async function updateLogement(updated: Logement): Promise<boolean> {
    setSaving(true);
    setSaveError(null);

    // Mise à jour optimiste
    setLogements((prev) =>
      prev.map((l) => (l.id === updated.id ? updated : l))
    );

    try {
      const res = await fetch("/api/logements", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Erreur serveur");
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setSaveError(message);

      // Rollback
      setLogements((prev) =>
        prev.map((l) =>
          l.id === updated.id
            ? (logementsData.logements as Logement[]).find((o) => o.id === l.id) ?? l
            : l
        )
      );

      return false;
    } finally {
      setSaving(false);
    }
  }

  return {
    logements,
    villes,
    filteredLogements,
    searchQuery,
    setSearchQuery,
    selectedStatut,
    setSelectedStatut,
    updateLogement,
    saving,
    saveError,
  };
}
