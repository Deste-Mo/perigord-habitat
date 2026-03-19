# Page de gestion des pannes (Base de connaissances)

## Vue d'ensemble
Page complète de gestion de la base de connaissances des pannes avec recherche, filtres, statistiques et actions CRUD.

## Route
`/admin/dashboard/pannes`

## Fonctionnalités

### 1. Statistiques globales
- Total des pannes
- Pannes responsabilité locataire
- Pannes responsabilité bailleur
- Pannes sous contrat
- Pannes à vérifier
- Pannes avec guide d'auto-dépannage

### 2. Recherche et filtres
- Recherche par titre, description ou équipement
- Filtre par responsable (locataire/bailleur/contrat/à vérifier)
- Résultats en temps réel

### 3. Tableau des pannes
Colonnes affichées :
- Panne (avec icône et titre)
- Équipement (nom + pièce)
- Responsable (badge coloré)
- Qui paie (badge coloré)
- Auto-dépannage (disponible/non disponible)
- Incidents liés (nombre)
- Actions (voir détails, modifier, supprimer)

### 4. Badges responsable
- Orange : Locataire
- Bleu : Bailleur
- Violet : Contrat
- Gris : À vérifier

### 5. Badges qui paie
- Orange : Locataire
- Bleu : Bailleur
- Teal : Bailleur (récupérable)

### 6. Modal de détails
Affiche pour chaque panne :
- Titre et ID
- Description complète
- Équipement concerné (avec pièce)
- Responsable et qui paie (badges)
- Référence juridique (encadré bleu)
- Guide d'auto-dépannage (étapes numérotées)
- Statistiques : incidents liés

### 7. Dialog de création
Formulaire pour créer une nouvelle panne :
- Titre (obligatoire)
- Description (optionnel)
- Sélection de l'équipement
- Responsable (liste déroulante)
- Qui paie (liste déroulante)
- Référence juridique (optionnel)

## Conformité avec la base de données

### Interface TypeScript
```typescript
interface Panne {
  id: number;
  equipement_id: number;
  titre: string;
  description: string | null;
  responsable: "locataire" | "bailleur" | "contrat" | "a_verifier";
  qui_paie: "locataire" | "bailleur" | "bailleur_recuperable";
  reference_juridique: string | null;
  auto_depannage_etapes: any | null;
  equipement?: {
    nom: string;
    piece: { nom: string; };
  };
  stats?: { incidents_lies: number; };
}
```

### Champs de la table `pannes`
- `id` : SERIAL PRIMARY KEY
- `equipement_id` : INTEGER NOT NULL (FK vers equipements)
- `titre` : VARCHAR(255) NOT NULL
- `description` : TEXT (nullable)
- `responsable` : VARCHAR(20) CHECK (enum)
- `qui_paie` : VARCHAR(30) CHECK (enum)
- `reference_juridique` : TEXT (nullable)
- `auto_depannage_etapes` : JSONB (nullable)

### Enums
- `responsable` : 'locataire', 'bailleur', 'contrat', 'a_verifier'
- `qui_paie` : 'locataire', 'bailleur', 'bailleur_recuperable'

### Gestion des valeurs null
- `description` : Non affiché si null
- `reference_juridique` : Non affiché si null
- `auto_depannage_etapes` : Badge "Non disponible" si null

## Palette de couleurs
- Amber (#F59E0B) : thème principal pannes
- Orange : locataire
- Bleu : bailleur
- Violet : contrat
- Teal : bailleur récupérable
- Gris : à vérifier
- Vert : auto-dépannage disponible

## Prochaines étapes
- Connexion à l'API Supabase
- Implémentation CRUD réelle
- Éditeur de guide d'auto-dépannage
- Upload d'images pour les étapes
- Filtres avancés
- Export des données
