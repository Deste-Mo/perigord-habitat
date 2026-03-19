export type InterventionStatut = "planifiée" | "en_cours" | "terminée" | "annulée";

export interface Intervention {
  id: number;
  titre: string;
  technicien: string;
  statut: InterventionStatut;
  date: string;
  creneau: string;
  description: string;
}
