"use client";

import { useState } from "react";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { INTERVENTIONS, STATUT_CONFIG } from "@/data/interventions";
import type { InterventionStatut } from "@/types/intervention";
import { Calendar, Clock, User, Wrench } from "lucide-react";

const FILTRES: { value: InterventionStatut | "tous"; label: string }[] = [
  { value: "tous",      label: "Toutes" },
  { value: "planifiée", label: "Planifiées" },
  { value: "en_cours",  label: "En cours" },
  { value: "terminée",  label: "Terminées" },
  { value: "annulée",   label: "Annulées" },
];

export default function InterventionsPage() {
  const [filtre, setFiltre] = useState<InterventionStatut | "tous">("tous");

  const filtered = INTERVENTIONS.filter((i) => filtre === "tous" || i.statut === filtre);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderApp />

      <main className="flex-1 w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-6">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Wrench size={24} className="text-indigo-600" />
              Interventions
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Suivi de toutes les interventions sur votre logement.</p>
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
            {filtered.map((item) => {
              const cfg = STATUT_CONFIG[item.statut];
              return (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h2 className="font-semibold text-gray-900">{item.titre}</h2>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-4 mt-1">
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <User size={13} /> {item.technicien}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar size={13} /> {item.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock size={13} /> {item.creneau}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-center text-gray-400 py-16">Aucune intervention dans cette catégorie.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
