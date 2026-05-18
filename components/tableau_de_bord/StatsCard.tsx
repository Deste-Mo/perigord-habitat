"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: "blue" | "green" | "orange" | "purple";
}

const colorClasses = {
  blue: {
    bg: "bg-primary/10",
    icon: "bg-primary",
    text: "text-primary"
  },
  green: {
    bg: "bg-primary/10",
    icon: "bg-primary",
    text: "text-primary"
  },
  orange: {
    bg: "bg-primary/10",
    icon: "bg-primary",
    text: "text-primary"
  },
  purple: {
    bg: "bg-primary/10",
    icon: "bg-primary",
    text: "text-primary"
  }
};

export function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl ${colors.icon} flex items-center justify-center shadow-md`}>
          <Icon className="text-white" size={26} />
        </div>
        {trend && (
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${trend.isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      <h3 className="text-muted-foreground text-sm font-medium mb-2">{title}</h3>
      <p className={`text-3xl font-black ${colors.text}`}>{value}</p>
    </div>
  );
}
