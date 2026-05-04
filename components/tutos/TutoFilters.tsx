import { CATEGORIES } from "@/data/notices";
import type { NoticeCategorie } from "@/types/notice";

interface TutoFiltersProps {
  filtre: NoticeCategorie | "Tous";
  onFilterChange: (filtre: NoticeCategorie | "Tous") => void;
}

export function TutoFilters({ filtre, onFilterChange }: TutoFiltersProps) {
  const categories = ["Tous", ...CATEGORIES] as (NoticeCategorie | "Tous")[];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
            filtre === cat
              ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
              : "bg-card text-foreground border-border hover:border-primary/30 hover:text-primary hover:shadow-sm"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
