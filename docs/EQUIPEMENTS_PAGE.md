# Page de gestion des équipements

## Vue d'ensemble
Page complète de gestion des équipements avec recherche, filtres multiples, statistiques et actions CRUD.

## Route
`/admin/dashboard/equipements`

## Fonctionnalités

### 1. Statistiques globales
- Total des équipements
- Équipements sous contrat de maintenance
- Équipements hors contrat
- Total des pannes référencées

### 2. Répartition par pièce
- Affichage du nombre d'équipements par pièce
- Vue en grille avec statistiques

### 3. Recherche et filtres
- Recherche par nom d'équipement
- Filtre par pièce
- Filtre par statut de contrat (sous contrat / hors contrat)
- Résultats en temps réel

### 4. Tableau des équipements
Colonnes affichées :
- Équipement (avec icône et nom)
- Pièce (avec icône)
- Statut contrat (badge bleu si sous contrat, gris si hors contrat)
- Pannes référencées (badge coloré selon le nombre)
- Actions (voir détails, modifier, supprimer)

### 5. Badges pannes référencées
- Vert avec ✓ : Aucune panne
- Orange avec ⚠ : 1-3 pannes
- Rouge avec ✗ : 4+ pannes

### 6. Modal de détails
Affiche pour chaque équipement :
- Icône et nom
- ID
- Badge statut contrat
- Pièce associée
- Statut contrat détaillé (avec icône)
- Statistiques : nombre de pannes référencées
- Note informative si sous contrat

### 7. Dialog de création
Formulaire pour créer un nouvel équipement :
- Sélection de la pièce (liste déroulante)
- Nom de l'équipement (obligatoire)
- Switch pour le statut de contrat (sous contrat oui/non)

## Conformité avec la base de données

### Interface TypeScript
```typescript
interface Equipement {
  id: number;
  piece_id: number;
  nom: string;
  sous_contrat: boolean;
  // Relation optionnelle pour l'affichage
  piece?: {
    nom: string;
  };
  stats?: {
    pannes: number;
  };
}
```

### Champs de la table `equipements`
- `id` : SERIAL PRIMARY KEY
- `piece_id` : INTEGER NOT NULL (FK vers pieces)
- `nom` : VARCHAR(255) NOT NULL
- `sous_contrat` : BOOLEAN DEFAULT FALSE

### Gestion des relations
- `piece_id` : Clé étrangère obligatoire vers la table `pieces`
- `piece` : Relation optionnelle pour l'affichage (marquée avec `?`)
- `stats` : Champ calculé optionnel pour les statistiques

### Valeur par défaut
- `sous_contrat` : FALSE par défaut (hors contrat)

## Données de démonstration
12 équipements répartis sur 4 pièces :
- Séjour : 3 équipements (radiateur, fenêtre, volet)
- Cuisine : 5 équipements (four, réfrigérateur, plaque, hotte, lave-vaisselle)
- Salle de bain : 3 équipements (chauffe-eau, VMC, robinetterie)
- Extérieur : 1 équipement (portail automatique)

Mix de statuts : certains sous contrat, d'autres hors contrat

## Composants UI utilisés
- Input (recherche)
- Select (filtres pièce et contrat)
- Table (liste des équipements)
- Badge (statut contrat et pannes)
- Dialog (détails et création)
- Button (actions)
- Label (formulaires)
- Switch (statut contrat dans le formulaire)

## Icônes Lucide
- Package : équipements (icône principale)
- Search : recherche
- Plus : création
- Edit : modification
- Trash2 : suppression
- Eye : voir détails
- Grid3x3 : pièces
- FileText : contrat
- CheckCircle : aucune panne
- XCircle : hors contrat / pannes critiques
- AlertTriangle : pannes modérées
- Filter : filtres

## Palette de couleurs
- Indigo (#6366F1) : thème principal équipements
- Bleu : sous contrat
- Gris : hors contrat
- Vert : aucune panne
- Orange : pannes modérées
- Rouge : pannes critiques

## Points techniques
- Utilisation de `useState` pour la gestion d'état
- Filtrage côté client avec `filter()` multi-critères
- Recherche par nom
- Filtre par pièce (liste déroulante)
- Filtre par statut de contrat
- Calcul dynamique des statistiques
- Gestion des relations optionnelles avec `?`
- Badge dynamique selon le nombre de pannes
- Switch pour le statut de contrat dans le formulaire
- Liste unique des pièces extraite avec `Map`

## Relation avec d'autres tables
- `piece_id` → Table `pieces` (obligatoire)
- Les pannes sont liées aux équipements via la table `pannes`
- Statistiques calculées à partir de la table `pannes`

## Prochaines étapes
- Connexion à l'API Supabase
- Implémentation des actions CRUD réelles
- Pagination pour grandes listes
- Export des données
- Filtres avancés (par nombre de pannes)
- Tri des colonnes
- Lien vers la liste des pannes de l'équipement
- Gestion des contrats de maintenance (dates, prestataires)
- Historique des interventions
