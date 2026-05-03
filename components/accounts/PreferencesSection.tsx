
"use client";

import { Globe, Sun, Moon, Monitor } from "lucide-react";
import type { LangOption, ThemeOption } from "@/types/accounts";
import { Section } from "./Section";

const LANGS: { code: LangOption; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English",  flag: "🇬🇧" },
  { code: "es", label: "Español",  flag: "🇪🇸" },
];

const THEMES: { code: ThemeOption; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { code: "light",  label: "Clair",   icon: Sun },
  { code: "dark",   label: "Sombre",  icon: Moon },
  { code: "system", label: "Système", icon: Monitor },
];

interface PreferencesSectionProps {
  lang: LangOption;
  theme: ThemeOption;
  onLangChange: (lang: LangOption) => void;
  onThemeChange: (theme: ThemeOption) => void;
}

export function PreferencesSection({ lang, theme, onLangChange, onThemeChange }: PreferencesSectionProps) {
  return (
    <Section title="Langue & Région" icon={Globe}>
      <div className="px-5 py-4">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Langue de l&apos;interface
        </label>
        <div className="grid grid-cols-3 gap-2">
          {LANGS.map(({ code, label, flag }) => (
            <button
              key={code}
              onClick={() => onLangChange(code)}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                lang === code
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <span className="text-xl">{flag}</span>
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 py-4 border-t border-gray-50">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Thème
        </label>
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map(({ code, label, icon: Icon }) => (
            <button
              key={code}
              onClick={() => onThemeChange(code)}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-sm font-medium transition-all ${
                theme === code
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <Icon size={18} />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
