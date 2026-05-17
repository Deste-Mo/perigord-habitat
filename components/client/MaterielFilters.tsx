import type { Piece } from "@/types/materiel";
import { PIECES } from "@/data/materiels";

interface MaterielFiltersProps {
  active: Piece;
  onChange: (piece: Piece) => void;
}

export function MaterielFilters({ active, onChange }: MaterielFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PIECES.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            active === p
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
