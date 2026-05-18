import type { Notification } from "@/types/notification";

export const NOTIFICATIONS: Notification[] = [
  { id: 1,  type: "incident",     title: "Fuite d'eau signalée",         message: "Une fuite a été signalée dans votre cuisine. Un technicien va être dépêché.",          date: "2026-03-19T08:30:00", read: false },
  { id: 2,  type: "intervention", title: "Intervention planifiée",       message: "Un plombier interviendra le 22 mars entre 9h et 12h pour réparer la canalisation.",    date: "2026-03-18T14:00:00", read: false },
  { id: 3,  type: "notice",       title: "Nouvelle notice disponible",   message: "La notice d'utilisation de votre chauffe-eau a été mise à jour.",                      date: "2026-03-17T10:15:00", read: false },
  { id: 4,  type: "info",         title: "Rappel entretien chaudière",   message: "L'entretien annuel de votre chaudière est prévu dans 15 jours.",                       date: "2026-03-16T09:00:00", read: true  },
  { id: 5,  type: "incident",     title: "Volet défectueux",             message: "Votre signalement concernant le volet de la chambre a bien été pris en compte.",       date: "2026-03-15T16:45:00", read: true  },
  { id: 6,  type: "intervention", title: "Intervention terminée",        message: "La réparation de la serrure de votre porte d'entrée a été effectuée avec succès.",     date: "2026-03-14T11:30:00", read: true  },
  { id: 7,  type: "info",         title: "Mise à jour des conditions",   message: "Les conditions générales de votre bail ont été mises à jour. Consultez votre espace.", date: "2026-03-12T08:00:00", read: true  },
];

export const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  incident:     { label: "Incident",     color: "text-red-600",    bg: "bg-red-50"     },
  intervention: { label: "Intervention", color: "text-blue-600",   bg: "bg-blue-50"    },
  notice:       { label: "Notice",       color: "text-purple-600", bg: "bg-purple-50"  },
  info:         { label: "Info",         color: "text-gray-600",   bg: "bg-gray-50"    },
};
