"use client";

import { HeaderApp } from "@/components/layout/HeaderApp";
import { TutoStats } from "@/components/tutos/TutoStats";
import { TutoFilters } from "@/components/tutos/TutoFilters";
import { TutoGrid } from "@/components/tutos/TutoGrid";
import { useTutos } from "@/hooks/useTutos";
import { BookOpen } from "lucide-react";

export default function TutosPage() {
  const { filtre, setFiltre, filteredNotices, statistics } = useTutos();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderApp />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              Tutos & conseils
            </h1>
            <p className="text-muted-foreground mt-2 text-base">
              Découvrez nos guides pratiques pour entretenir et optimiser votre logement
            </p>
          </div>

          {/* Statistiques */}
          <TutoStats {...statistics} />

          {/* Filtres */}
          <TutoFilters filtre={filtre} onFilterChange={setFiltre} />

          {/* Grille de tutoriels */}
          <TutoGrid notices={filteredNotices} />
        </div>
      </main>
    </div>
  );
}
