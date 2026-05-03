
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
        onClick ? "cursor-pointer hover:bg-gray-50 transition-colors" : ""
      }`}
    >
      <span className={`text-sm font-medium ${danger ? "text-red-600" : "text-gray-700"}`}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        {children ?? (
          <>
            {value && (
              <span className="text-sm text-gray-400 truncate max-w-[180px]">{value}</span>
            )}
            {onClick && <ChevronRight size={15} className="text-gray-300 shrink-0" />}
          </>
        )}
      </div>
    </div>
  );
}
