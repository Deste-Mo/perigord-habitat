/**
 * Service logements — encapsule tous les appels à /api/logements.
 */
import type { Logement } from "@/types/logement";

const BASE = "/api/logements";

export const logementsService = {
  /** Récupère tous les logements depuis le fichier JSON via l'API route. */
  async getAll(): Promise<{ logements: Logement[] }> {
    const res = await fetch(BASE);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Erreur lecture logements");
    }
    return res.json();
  },

  /** Met à jour un logement dans le fichier JSON via l'API route. */
  async update(logement: Logement): Promise<Logement> {
    const res = await fetch(BASE, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logement),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Erreur mise à jour logement");
    }
    const data = await res.json();
    return data.logement as Logement;
  },
};
