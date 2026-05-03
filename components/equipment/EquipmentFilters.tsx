"use client";

import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import type { Equipment } from "@/types/equipment";

interface EquipmentFiltersProps {
  equipments: Equipment[];
  pieces: string[];
  searchQuery: string;
  selectedPiece: string;
  filteredCount: number;
  onSearchChange: (value: string) => void;
  onPieceChange: (piece: string) => void;
}

export function EquipmentFilters({
  equipments,
  pieces,
  searchQuery,
  selectedPiece,
  filteredCount,
  onSearchChange,
  onPieceChange,
}: EquipmentFiltersProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFiltered = selectedPiece !== "all";

  return (
    <div className="sticky top-0 z-30 bg-background pb-6 -mt-8 pt-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="bg-card rounded-2xl p-4 shadow-lg border border-border">
        <div className="flex gap-3 items-center">

          {/* Recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Rechercher un équipement..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Bouton filtre */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold transition-all whitespace-nowrap ${
                isFiltered
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card text-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">
                {isFiltered ? selectedPiece : "Filtrer"}
              </span>
              {isFiltered && (
                <span className="bg-white/30 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {filteredCount}
                </span>
              )}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {filterOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-card rounded-2xl shadow-2xl border border-border z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <span className="font-bold text-foreground text-sm">Filtrer par pièce</span>
                  {isFiltered && (
                    <button
                      onClick={() => { onPieceChange("all"); setFilterOpen(false); }}
                      className="flex items-center gap-1 text-xs text-primary font-semibold hover:text-primary/80"
                    >
                      <X size={12} />
                      Réinitialiser
                    </button>
                  )}
                </div>

                <div className="py-2 max-h-72 overflow-y-auto">
                  <button
                    onClick={() => { onPieceChange("all"); setFilterOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${
                      !isFiltered ? "bg-accent text-primary" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>Toutes les pièces</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-semibold">
                      {equipments.length}
                    </span>
                  </button>

                  {pieces.map((piece) => (
                    <button
                      key={piece}
                      onClick={() => { onPieceChange(piece); setFilterOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${
                        selectedPiece === piece ? "bg-accent text-primary" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{piece}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        selectedPiece === piece ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {equipments.filter((e) => e.piece === piece).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bouton ajouter — désactivé temporairement */}
          {/* <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap">
            <Plus size={20} />
            Ajouter un équipement
          </button> */}
        </div>
      </div>
    </div>
  );
}
