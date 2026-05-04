"use client";

import { useState } from "react";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { SignalerIncidentDialog } from "@/components/client/SignalerIncidentDialog";
import { IncidentCard } from "@/components/client/IncidentCard";
import { InitializeUserData } from "@/components/client/InitializeUserData";
import { useIncidents } from "@/hooks/useIncidents";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FILTRES_STATUT } from "@/config/incident.config";
import type { IncidentStatut, CreateIncidentDTO } from "@/types/incident";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function IncidentsPage() {
  const [filtre, setFiltre] = useState<IncidentStatut | "tous">("tous");
  const { locataire, loading: loadingUser } = useCurrentUser();
  const { incidents, loading, error, createIncident, filterByStatut } = useIncidents(locataire?.id ?? null);

  const handleSignaler = async (data: CreateIncidentDTO) => {
    if (!locataire?.logement_id || !locataire?.bailleur_id) {
      alert("Informations manquantes pour créer l'incident");
      return;
    }

    try {
      await createIncident(locataire.logement_id, locataire.bailleur_id, data);
    } catch (err) {
      console.error("Erreur création incident:", err);
      alert("Erreur lors de la création de l'incident");
    }
  };

  const filtered = filterByStatut(filtre);

  if (loadingUser || loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <HeaderApp />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={32} />
        </main>
      </div>
    );
  }

  if (!locataire) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <HeaderApp />
        <main className="flex-1 w-full px-4 sm:px-6 py-8">
          <InitializeUserData />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <HeaderApp />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-destructive">Erreur: {error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderApp />

      <main className="flex-1 w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-6">

          {/* En-tête */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
                <AlertTriangle size={24} className="text-orange-500" />
                Incidents
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {incidents.filter((i) => i.statut === "nouveau").length} nouveau{incidents.filter((i) => i.statut === "nouveau").length > 1 ? "x" : ""} · {incidents.length} au total
              </p>
            </div>
            <SignalerIncidentDialog onSubmit={handleSignaler} />
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            {FILTRES_STATUT.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFiltre(value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  filtre === value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/30 hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Liste */}
          <div className="flex flex-col gap-3">
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">Aucun incident dans cette catégorie.</p>
            ) : (
              filtered.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
