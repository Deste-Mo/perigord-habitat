
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

const labelCls = "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block";

export function PreferencesSection({ lang, theme, onLangChange, onThemeChange }: PreferencesSectionProps) {
  return (
    <Section title="Langue & Région" icon={Globe}>
      <div className="px-5 py-4">
        <label className={labelCls}>Langue de l&apos;interface</label>
        <div className="grid grid-cols-3 gap-2">
          {LANGS.map(({ code, label, flag }) => (
            <button
              key={code}
              onClick={() => onLangChange(code)}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                lang === code
                  ? "border-primary bg-accent text-primary"
                  : "border-border text-foreground hover:border-primary/50 hover:bg-muted"
              }`}
            >
              <span className="text-xl">{flag}</span>
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 py-4 border-t border-border">
        <label className={labelCls}>Thème</label>
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map(({ code, label, icon: Icon }) => (
            <button
              key={code}
              onClick={() => onThemeChange(code)}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-sm font-medium transition-all ${
                theme === code
                  ? "border-primary bg-accent text-primary"
                  : "border-border text-foreground hover:border-primary/50 hover:bg-muted"
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
