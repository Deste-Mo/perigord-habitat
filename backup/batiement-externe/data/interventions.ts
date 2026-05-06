import type { Intervention, InterventionStatut } from "@/types/intervention";

export const STATUT_CONFIG: Record<InterventionStatut, { label: string; color: string; bg: string }> = {
  planifiée:  { label: "Planifiée",  color: "text-blue-600",   bg: "bg-blue-50"   },
  en_cours:   { label: "En cours",   color: "text-orange-600", bg: "bg-orange-50" },
  terminée:   { label: "Terminée",   color: "text-green-600",  bg: "bg-green-50"  },
  annulée:    { label: "Annulée",    color: "text-gray-500",   bg: "bg-gray-100"  },
};

export const INTERVENTIONS: Intervention[] = [
  { id: 1, titre: "Réparation fuite cuisine",      technicien: "Marc Leblanc",   statut: "planifiée", date: "2026-03-22", creneau: "9h – 12h",  description: "Intervention pour réparer la fuite sous l'évier de la cuisine." },
  { id: 2, titre: "Entretien chaudière",           technicien: "Sophie Renard",  statut: "planifiée", date: "2026-03-25", creneau: "14h – 16h", description: "Entretien annuel obligatoire de la chaudière à gaz." },
  { id: 3, titre: "Remplacement volet chambre",    technicien: "Paul Dumont",    statut: "en_cours",  date: "2026-03-19", creneau: "10h – 12h", description: "Remplacement du mécanisme du volet roulant de la chambre principale." },
  { id: 4, titre: "Réparation serrure entrée",     technicien: "Marc Leblanc",   statut: "terminée",  date: "2026-03-14", creneau: "9h – 10h",  description: "Remplacement du cylindre de la serrure de la porte d'entrée." },
  { id: 5, titre: "Débouchage canalisation WC",    technicien: "Jean Moreau",    statut: "terminée",  date: "2026-03-10", creneau: "11h – 13h", description: "Débouchage de la canalisation principale des WC." },
  { id: 6, titre: "Vérification tableau électrique", technicien: "Claire Petit", statut: "annulée",   date: "2026-03-08", creneau: "14h – 17h", description: "Vérification annulée suite à indisponibilité du locataire." },
];
