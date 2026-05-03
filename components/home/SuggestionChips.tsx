const SUGGESTIONS = [
  "Qui répare une fuite d'eau ?",
  "Mon chauffage est en panne, que faire ?",
  "La serrure est cassée, c'est à qui ?",
  "Comment signaler un dégât des eaux ?",
];

interface SuggestionChipsProps {
  onSelect: (suggestion: string) => void;
}

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-2xl">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="text-sm px-4 py-2 rounded-full border border-border bg-card hover:bg-accent hover:border-primary/30 text-foreground hover:text-primary transition-all"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
