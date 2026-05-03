export interface Logement {
  id: string;
  nom: string;
  adresse: string;
  codePostal: string;
  ville: string;
  type: "appartement" | "studio" | "maison";
  surface: number;
  etage: number;
  nbPieces: number;
  statut: "occupe" | "vacant" | "travaux";
  locataire: string | null;
  loyerCC: number;
  dateEntree: string | null;
  dpeClasse: "A" | "B" | "C" | "D" | "E" | "F" | "G";
}
