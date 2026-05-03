
"use client";

import { User, Mail, Pencil, Save, X } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { Profile } from "@/types/user";
import type { ProfileForm } from "@/types/accounts";
import { Section } from "./Section";
import { Row } from "./Row";

interface ProfileSectionProps {
  user: SupabaseUser | null;
  profile: Profile | null;
  isBailleur: boolean;
  isEditing: boolean;
  form: ProfileForm;
  saving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onFieldChange: <K extends keyof ProfileForm>(key: K, value: string) => void;
}

export function ProfileSection({
  user, profile, isBailleur, isEditing,
  form, saving, onEdit, onCancel, onSave, onFieldChange,
}: ProfileSectionProps) {
  return (
    <Section title="Informations personnelles" icon={User}>
      {isEditing ? (
        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              Nom complet
            </label>
            <input
              value={form.full_name}
              onChange={e => onFieldChange("full_name", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre nom complet"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              Téléphone
            </label>
            <input
              value={form.telephone}
              onChange={e => onFieldChange("telephone", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+33 6 00 00 00 00"
              type="tel"
            />
          </div>
          {isBailleur && (
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                Organisation / Agence
              </label>
              <input
                value={form.organisation}
                onChange={e => onFieldChange("organisation", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nom de votre organisation"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              Adresse e-mail
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50">
              <Mail size={14} className="text-gray-400" />
              <span className="text-sm text-gray-500">{user?.email}</span>
              <span className="ml-auto text-[10px] text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                Non modifiable
              </span>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={onSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {saving
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Save size={14} />}
              Enregistrer
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
          <Row
            label="Nom complet"
            value={profile?.full_name ?? user?.user_metadata?.full_name ?? "—"}
            onClick={onEdit}
          />
          <Row
            label="Téléphone"
            value={profile?.telephone ?? "Non renseigné"}
            onClick={onEdit}
          />
          <Row label="Adresse e-mail" value={user?.email ?? "—"} />
          {isBailleur && (
            <Row
              label="Organisation"
              value={profile?.organisation ?? "Non renseignée"}
              onClick={onEdit}
            />
          )}
          <Row label="Modifier le profil" onClick={onEdit}>
            <div className="flex items-center gap-1.5 text-blue-600 text-sm font-medium">
              <Pencil size={13} /> Modifier
            </div>
          </Row>
        </>
      )}
    </Section>
  );
}
