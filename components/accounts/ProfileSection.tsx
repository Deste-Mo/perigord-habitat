
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

const inputCls = "w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const labelCls = "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";

export function ProfileSection({
  user, profile, isBailleur, isEditing,
  form, saving, onEdit, onCancel, onSave, onFieldChange,
}: ProfileSectionProps) {
  return (
    <Section title="Informations personnelles" icon={User}>
      {isEditing ? (
        <div className="px-5 py-4 space-y-4">
          <div>
            <label className={labelCls}>Nom complet</label>
            <input
              value={form.full_name}
              onChange={e => onFieldChange("full_name", e.target.value)}
              className={inputCls}
              placeholder="Votre nom complet"
            />
          </div>
          <div>
            <label className={labelCls}>Téléphone</label>
            <input
              value={form.telephone}
              onChange={e => onFieldChange("telephone", e.target.value)}
              className={inputCls}
              placeholder="+33 6 00 00 00 00"
              type="tel"
            />
          </div>
          {isBailleur && (
            <div>
              <label className={labelCls}>Organisation / Agence</label>
              <input
                value={form.organisation}
                onChange={e => onFieldChange("organisation", e.target.value)}
                className={inputCls}
                placeholder="Nom de votre organisation"
              />
            </div>
          )}
          <div>
            <label className={labelCls}>Adresse e-mail</label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-muted">
              <Mail size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <span className="ml-auto text-[10px] text-muted-foreground bg-border px-2 py-0.5 rounded-full">
                Non modifiable
              </span>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={onSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {saving
                ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                : <Save size={14} />}
              Enregistrer
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
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
            <div className="flex items-center gap-1.5 text-primary text-sm font-medium">
              <Pencil size={13} /> Modifier
            </div>
          </Row>
        </>
      )}
    </Section>
  );
}
