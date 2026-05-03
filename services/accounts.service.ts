
import { createClient } from "@/lib/supabase/client";
import type { ProfileForm } from "@/types/accounts";

export const accountsService = {
  /**
   * Met à jour le profil dans la table `profiles` ET dans user_metadata Supabase Auth.
   * Les deux sont nécessaires pour que les changements soient visibles partout
   * (table profiles = source de vérité, user_metadata = cache côté auth).
   */
  async updateProfile(userId: string, form: ProfileForm): Promise<void> {
    const supabase = createClient();

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name:    form.full_name.trim()    || null,
        telephone:    form.telephone.trim()    || null,
        organisation: form.organisation.trim() || null,
      })
      .eq("id", userId);

    if (profileError) throw profileError;

    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name:    form.full_name.trim()    || null,
        organisation: form.organisation.trim() || null,
      },
    });

    if (authError) throw authError;
  },

  /** Change le mot de passe de l'utilisateur connecté. */
  async updatePassword(newPassword: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },

  /** Déconnecte l'utilisateur. */
  async signOut(): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
