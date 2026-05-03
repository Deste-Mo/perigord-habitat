
"use client";

import { Lock, Eye, EyeOff, Save, X, AlertCircle } from "lucide-react";
import type { PasswordForm } from "@/types/accounts";
import { Section } from "./Section";
import { Row } from "./Row";

interface SecuritySectionProps {
  isEditing: boolean;
  form: PasswordForm;
  showPw: boolean;
  saving: boolean;
  isValid: boolean;
  isMatch: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onFieldChange: (key: keyof PasswordForm, value: string) => void;
  onToggleShowPw: () => void;
}

export function SecuritySection({
  isEditing, form, showPw, saving, isValid, isMatch,
  onEdit, onCancel, onSave, onFieldChange, onToggleShowPw,
}: SecuritySectionProps) {
  return (
    <Section title="Sécurité" icon={Lock}>
      {isEditing ? (
        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={form.next}
                onChange={e => onFieldChange("next", e.target.value)}
                className="w-full px-3 py-2.5 pr-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Minimum 8 caractères"
              />
              <button
                onClick={onToggleShowPw}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              Confirmer
            </label>
            <input
              type={showPw ? "text" : "password"}
              value={form.confirm}
              onChange={e => onFieldChange("confirm", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Répétez le mot de passe"
            />
          </div>
          {form.next && form.confirm && !isMatch && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={12} /> Les mots de passe ne correspondent pas
            </p>
          )}
          <div className="flex gap-2 pt-1">
            <button
              onClick={onSave}
              disabled={saving || !isValid}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {saving
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Save size={14} />}
              Modifier
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <Row label="Mot de passe" value="••••••••" onClick={onEdit} />
          <Row label="Authentification à deux facteurs">
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
              Bientôt disponible
            </span>
          </Row>
          <Row label="Sessions actives">
            <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Connecté
            </span>
          </Row>
        </>
      )}
    </Section>
  );
}
