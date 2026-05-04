
"use client";

import { useState } from "react";
import type { PasswordForm } from "@/types/accounts";
import { accountsService } from "@/services/accounts.service";

interface UsePasswordFormOptions {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function usePasswordForm({ onSuccess, onError }: UsePasswordFormOptions) {
  const [form, setForm] = useState<PasswordForm>({ next: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);

  const isMatch = form.next === form.confirm;
  const isValid = form.next.length >= 8 && form.confirm.length > 0 && isMatch;

  const save = async (): Promise<boolean> => {
    if (!isMatch) { onError("Les mots de passe ne correspondent pas"); return false; }
    if (form.next.length < 8) { onError("Minimum 8 caractères requis"); return false; }
    setSaving(true);
    try {
      await accountsService.updatePassword(form.next);
      onSuccess("Mot de passe modifié avec succès");
      setForm({ next: "", confirm: "" });
      return true;
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : "Erreur");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const setField = <K extends keyof PasswordForm>(key: K, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  return { form, setField, showPw, toggleShowPw: () => setShowPw(v => !v), save, saving, isValid, isMatch };
}
