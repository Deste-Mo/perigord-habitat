
import React from "react";
import { ChevronRight } from "lucide-react";

interface RowProps {
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
  children?: React.ReactNode;
}

export function Row({ label, value, onClick, danger = false, children }: RowProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-5 py-3.5 ${
        onClick ? "cursor-pointer hover:bg-muted transition-colors" : ""
      }`}
    >
      <span className={`text-sm font-medium ${danger ? "text-destructive" : "text-foreground"}`}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        {children ?? (
          <>
            {value && (
              <span className="text-sm text-muted-foreground truncate max-w-[180px]">{value}</span>
            )}
            {onClick && <ChevronRight size={15} className="text-muted-foreground shrink-0" />}
          </>
        )}
      </div>
    </div>
  );
}
