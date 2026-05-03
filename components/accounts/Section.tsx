
import React from "react";

interface SectionProps {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}

export function Section({ title, icon: Icon, children }: SectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon size={16} className="text-blue-600" />
        </div>
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
      </div>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  );
}
