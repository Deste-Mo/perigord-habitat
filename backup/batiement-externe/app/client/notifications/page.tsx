"use client";

import { HeaderApp } from "@/components/layout/HeaderApp";
import { NotificationItem } from "@/components/client/NotificationItem";
import { useNotifications } from "@/hooks/useNotifications";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const FILTERS = [
  { value: "tous",         label: "Tous" },
  { value: "incident",     label: "Incidents" },
  { value: "intervention", label: "Interventions" },
  { value: "notice",       label: "Notices" },
  { value: "info",         label: "Infos" },
] as const;

export default function NotificationsPage() {
  const { filtered, filter, setFilter, unreadCount, markRead, markAllRead } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderApp />

      <main className="flex-1 w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-6">

          {/* En-tête */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="text-sm font-semibold bg-indigo-600 text-white px-2.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? "s" : ""}` : "Tout est à jour"}
              </p>
            </div>

            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2">
                <CheckCheck size={15} />
                Tout marquer comme lu
              </Button>
            )}
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  filter === value
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Liste */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-5xl mb-4">🔔</span>
              <p className="text-gray-500 text-sm">Aucune notification dans cette catégorie.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((n) => (
                <NotificationItem key={n.id} notification={n} onRead={markRead} />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
