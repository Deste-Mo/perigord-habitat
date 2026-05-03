/**
 * Service équipements — encapsule tous les appels à /api/equipements.
 * Le hook useEquipmentData passe par ce service au lieu de fetch() direct.
 */
import type { Equipment } from "@/types/equipment";

const BASE = "/api/equipements";

export const equipementsService = {
  /** Récupère tous les équipements depuis le fichier JSON via l'API route. */
  async getAll(): Promise<{ equipements: Equipment[] }> {
    const res = await fetch(BASE);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Erreur lecture équipements");
    }
    return res.json();
  },

  /** Met à jour un équipement dans le fichier JSON via l'API route. */
  async update(equipment: Equipment): Promise<Equipment> {
    const res = await fetch(BASE, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipment),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Erreur mise à jour équipement");
    }
    const data = await res.json();
    return data.equipment as Equipment;
  },
};
