"use client";

import { useState } from "react";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { NOTICES, CATEGORIES } from "@/data/notices";
import type { NoticeCategorie } from "@/types/notice";
import { FileText, Calendar, Download, Droplet, Zap, Flame, Wind, Sparkles } from "lucide-react";

const CAT_CONFIG: Record<NoticeCategorie, { bg: string; color: string; icon: any }> = {
  "Plomberie": { bg: "bg-blue-100", color: "text-blue-700", icon: Droplet },
  "Électricité": { bg: "bg-yellow-100", color: "text-yellow-700", icon: Zap },
  "Chauffage": { bg: "bg-orange-100", color: "text-orange-700", icon: Flame },
  "Ventilation": { bg: "bg-cyan-100", color: "text-cyan-700", icon: Wind },
  "Entretien": { bg: "bg-purple-100", color: "text-purple-700", icon: Sparkles },
};

export default function NoticesPage() {
  const [filtre, setFiltre] = useState<NoticeCategorie | "Tous">("Tous");

  const filtered = NOTICES.filter((n) => filtre === "Tous" || n.categorie === filtre);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderApp />

      <main className="flex-1 w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <FileText size={24} className="text-primary" />
              Notices
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">Documents et guides d'utilisation de votre logement.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["Tous", ...CATEGORIES] as (NoticeCategorie | "Tous")[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltre(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  filtre === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((notice) => {
              const cfg = CAT_CONFIG[notice.categorie];
              const Icon = cfg.icon;
              return (
                <div key={notice.id} className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                      <Icon className={cfg.color} size={20} />
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${cfg.bg} ${cfg.color}`}>
                      {notice.categorie}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <h2 className="font-semibold text-foreground text-sm leading-snug">{notice.titre}</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{notice.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={12} /> {notice.date}
                    </span>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                      <Download size={13} /> Télécharger
                    </button>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-16">Aucune notice dans cette catégorie.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
