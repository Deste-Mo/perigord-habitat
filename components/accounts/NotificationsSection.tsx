
"use client";

import { Bell } from "lucide-react";
import type { NotificationPrefs } from "@/types/accounts";
import { Section } from "./Section";
import { Toggle } from "./Toggle";

const NOTIF_ITEMS: { key: keyof NotificationPrefs; label: string; sub: string }[] = [
  { key: "email_incidents",     label: "Incidents par e-mail",         sub: "Recevoir les alertes d'incidents" },
  { key: "email_interventions", label: "Interventions par e-mail",     sub: "Suivi des interventions" },
  { key: "push_incidents",      label: "Notifications push incidents", sub: "Alertes en temps réel" },
  { key: "push_interventions",  label: "Notifications push suivi",     sub: "Mises à jour interventions" },
  { key: "email_newsletter",    label: "Newsletter & actualités",      sub: "Conseils et nouveautés" },
];

interface NotificationsSectionProps {
  prefs: NotificationPrefs;
  onToggle: (key: keyof NotificationPrefs) => void;
}

export function NotificationsSection({ prefs, onToggle }: NotificationsSectionProps) {
  return (
    <Section title="Notifications" icon={Bell}>
      {NOTIF_ITEMS.map(({ key, label, sub }) => (
        <div key={key} className="flex items-center justify-between px-5 py-3.5">
          <div>
            <p className="text-sm font-medium text-gray-700">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </div>
          <Toggle
            checked={prefs[key]}
            onChange={() => onToggle(key)}
            label={`${prefs[key] ? "Désactiver" : "Activer"} ${label}`}
          />
        </div>
      ))}
    </Section>
  );
}
