
"use client";

import { useState } from "react";
import type { LangOption, ThemeOption } from "@/types/accounts";

export function usePreferences() {
  const [lang, setLang] = useState<LangOption>("fr");
  const [theme, setTheme] = useState<ThemeOption>("system");

  return { lang, setLang, theme, setTheme };
}
