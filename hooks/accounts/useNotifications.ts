
"use client";

import { useState } from "react";
import type { NotificationPrefs } from "@/types/accounts";

const DEFAULT_PREFS: NotificationPrefs = {
  email_incidents:    true,
  email_interventions: true,
  email_newsletter:   false,
  push_incidents:     true,
  push_interventions: false,
};

export function useNotifications() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_PREFS);

  const toggle = (key: keyof NotificationPrefs) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  return { prefs, toggle };
}
