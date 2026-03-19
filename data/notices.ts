import type { Notice, NoticeCategorie } from "@/types/notice";

export const CATEGORIES: NoticeCategorie[] = ["Électricité", "Plomberie", "Chauffage", "Sécurité", "Général"];

export const CAT_CONFIG: Record<NoticeCategorie, { color: string; bg: string; emoji: string }> = {
  Électricité: { color: "text-yellow-600", bg: "bg-yellow-50", emoji: "⚡" },
  Plomberie:   { color: "text-blue-600",   bg: "bg-blue-50",   emoji: "🚿" },
  Chauffage:   { color: "text-red-600",    bg: "bg-red-50",    emoji: "🔥" },
  Sécurité:    { color: "text-purple-600", bg: "bg-purple-50", emoji: "🔐" },
  Général:     { color: "text-gray-600",   bg: "bg-gray-100",  emoji: "📄" },
};

export const NOTICES: Notice[] = [
  { id: 1, titre: "Utilisation du tableau électrique",  categorie: "Électricité", description: "Guide d'utilisation et de réinitialisation des disjoncteurs de votre logement.",          date: "2026-03-01" },
  { id: 2, titre: "Entretien de la chaudière",          categorie: "Chauffage",   description: "Procédure d'entretien annuel et consignes de sécurité pour votre chaudière à gaz.",       date: "2026-02-15" },
  { id: 3, titre: "Débouchage des canalisations",       categorie: "Plomberie",   description: "Conseils pour prévenir et traiter les bouchons dans les canalisations de votre logement.", date: "2026-02-10" },
  { id: 4, titre: "Détecteur de fumée",                 categorie: "Sécurité",    description: "Instructions de test mensuel et de remplacement des piles de votre détecteur.",           date: "2026-01-20" },
  { id: 5, titre: "Ventilation et VMC",                 categorie: "Général",     description: "Nettoyage des grilles de ventilation et bon usage de la VMC pour éviter l'humidité.",     date: "2026-01-10" },
  { id: 6, titre: "Économies d'énergie",                categorie: "Général",     description: "Conseils pratiques pour réduire votre consommation d'énergie au quotidien.",              date: "2025-12-15" },
  { id: 7, titre: "Robinetterie et joints",             categorie: "Plomberie",   description: "Comment remplacer un joint de robinet et éviter les fuites mineures.",                    date: "2025-12-01" },
];
