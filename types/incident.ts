export type IncidentStatut = "nouveau" | "en_cours" | "résolu" | "fermé";
export type IncidentPriorite = "faible" | "moyenne" | "haute" | "urgente";
export type IncidentTypeSinistre = "sinistre" | "vandalisme" | "vétusté";

export interface Incident {
  id: number;
  titre: string;
  statut: IncidentStatut;
  priorite: IncidentPriorite;
  typeSinistre?: IncidentTypeSinistre;
  piece: string;
  description: string;
  preuves?: string[];
  date: string;
}
