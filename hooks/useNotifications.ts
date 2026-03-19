"use client";

import { useState } from "react";
import { NOTIFICATIONS } from "@/data/notifications";
import type { Notification, NotificationType } from "@/types/notification";

export function useNotifications() {
  const [items, setItems] = useState<Notification[]>(NOTIFICATIONS);
  const [filter, setFilter] = useState<NotificationType | "tous">("tous");

  const unreadCount = items.filter((n) => !n.read).length;

  const filtered = items.filter((n) => filter === "tous" || n.type === filter);

  const markRead = (id: number) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return { filtered, filter, setFilter, unreadCount, markRead, markAllRead };
}
