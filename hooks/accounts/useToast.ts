
"use client";

import { useState, useCallback } from "react";
import type { ToastState, ToastType } from "@/types/accounts";

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  const show = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const hide = useCallback(() => setToast(null), []);

  return { toast, show, hide };
}
