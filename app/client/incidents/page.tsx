"use client";

import { useState } from "react";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { INCIDENTS as INITIAL, STATUT_CONFIG, PRIORITE_CONFIG } from "@/data/incidents";
import { SignalerIncidentDialog } from "@/components/client/SignalerIncidentDialog";
import type { Incident, IncidentStatut } from "@/types/incident";
import { AlertTriangle, Calendar, MapPin } from "lucide-react";

const FILTRES: { value: IncidentStatut | "tous"; label: string }[] = [
  { value: "tous",     label: "Tous" },
  { value: "nouveau",  label: "Nouveaux" },
  { value: "en_cours", label: "En cours" },
  { value: "résolu",   label: "Résolus" },
  { value: "fermé",    label: "Fermés" },
];

export default function IncidentsPage() {
  const [filtre, setFiltre] = useState<IncidentStatut | "tous">("tous");
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL);

  const filtered = incidents.filter((i) => filtre === "tous" || i.statut === filtre);

  const handleSignaler = (data: Omit<Incident, "id" | "statut">) => {
    const newIncident: Incident = {
      ...data,
      id: Date.now(),
      statut: "nouveau",
    };
    setIncidents((prev) => [newIncident, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderApp />

      <main className="flex-1 w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-6">

          {/* En-tête */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle size={24} className="text-orange-500" />
                Incidents
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {incidents.filter((i) => i.statut === "nouveau").length} nouveau{incidents.filter((i) => i.statut === "nouveau").length > 1 ? "x" : ""} · {incidents.length} au total
              </p>
            </div>
            <SignalerIncidentDialog onSubmit={handleSignaler} />
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            {FILTRES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFiltre(value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  filtre === value
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Liste */}
          <div className="flex flex-col gap-3">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-400 py-16">Aucun incident dans cette catégorie.</p>
            ) : (
              filtered.map((item) => {
                const statut = STATUT_CONFIG[item.statut];
                const priorite = PRIORITE_CONFIG[item.priorite];
                return (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h2 className="font-semibold text-gray-900">{item.titre}</h2>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-semibold ${priorite.color}`}>
                          ● {priorite.label}
                        </span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statut.bg} ${statut.color}`}>
                          {statut.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin size={13} /> {item.piece}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar size={13} /> {item.date}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
