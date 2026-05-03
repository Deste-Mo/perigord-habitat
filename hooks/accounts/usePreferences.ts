
"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import type { LangOption, ThemeOption } from "@/types/accounts";

export function usePreferences() {
  const { theme: currentTheme, setTheme: applyTheme } = useTheme();
  const [lang, setLang] = useState<LangOption>("fr");

  // next-themes retourne undefined au premier rendu (SSR) — on fallback sur "system"
  const theme = (currentTheme as ThemeOption | undefined) ?? "system";

  const setTheme = (value: ThemeOption) => {
    applyTheme(value); // applique immédiatement la classe dark/light sur <html>
  };

  return { lang, setLang, theme, setTheme };
}
