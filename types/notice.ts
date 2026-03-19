export type NoticeCategorie = "Électricité" | "Plomberie" | "Chauffage" | "Sécurité" | "Général";

export interface Notice {
  id: number;
  titre: string;
  categorie: NoticeCategorie;
  description: string;
  fichier?: string;
  date: string;
}
