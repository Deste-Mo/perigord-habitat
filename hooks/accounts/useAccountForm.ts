
"use client";

import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/user";
import type { ProfileForm } from "@/types/accounts";
import { accountsService } from "@/services/accounts.service";

interface UseAccountFormOptions {
  user: User | null;
  profile: Profile | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function useAccountForm({ user, profile, onSuccess, onError }: UseAccountFormOptions) {
  const [form, setForm] = useState<ProfileForm>({
    full_name: "",
    telephone: "",
    organisation: "",
  });
  const [saving, setSaving] = useState(false);

  // Initialise le formulaire depuis le profil Supabase
  useEffect(() => {
    if (profile) {
      setForm({
        full_name:    profile.full_name    ?? "",
        telephone:    profile.telephone    ?? "",
        organisation: profile.organisation ?? "",
      });
    } else if (user) {
      setForm(f => ({
        ...f,
        full_name:    user.user_metadata?.full_name    ?? "",
        organisation: user.user_metadata?.organisation ?? "",
      }));
    }
  }, [profile, user]);

  const save = async (): Promise<boolean> => {
    if (!user) return false;
    setSaving(true);
    try {
      await accountsService.updateProfile(user.id, form);
      onSuccess("Profil mis à jour avec succès");
      return true;
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : "Erreur lors de la sauvegarde");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const setField = <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  return { form, setField, save, saving };
}
