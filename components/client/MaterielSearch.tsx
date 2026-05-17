import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MaterielSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function MaterielSearch({ value, onChange }: MaterielSearchProps) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        placeholder="Rechercher un équipement…"
        className="pl-9 bg-card"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
