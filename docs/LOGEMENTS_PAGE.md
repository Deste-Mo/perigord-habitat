# Page de gestion des logements

## Vue d'ensemble
Page complète de gestion des logements avec recherche, filtres, statistiques et actions CRUD.

## Route
`/admin/dashboard/logements`

## Fonctionnalités

### 1. Statistiques globales
- Total des logements
- Logements occupés
- Logements vacants
- Logements avec incidents actifs

### 2. Répartition par bailleur
- Affichage du nombre de logements par bailleur
- Vue en grille avec statistiques

### 3. Recherche et filtres
- Recherche par référence ou adresse
- Filtre par bailleur
- Résultats en temps réel

### 4. Tableau des logements
Colonnes affichées :
- Référence (avec icône)
- Adresse (avec icône de localisation, ou "Non renseignée" si null)
- Bailleur (avec pastille de couleur)
- Nombre de locataires (avec badge "Vacant" si 0)
- Nombre d'incidents actifs (en rouge si > 0)
- Actions (voir détails, modifier, supprimer)

### 5. Modal de détails
Affiche pour chaque logement :
- Référence et ID
- Adresse complète (ou "Non renseignée")
- Informations du bailleur (avec pastille de couleur)
- Statistiques : locataires et incidents actifs
- Badge "Vacant" si aucun locataire

### 6. Dialog de création
Formulaire pour créer un nouveau logement :
- Sélection du bailleur (liste déroulante)
- Référence (obligatoire)
- Adresse (optionnel)

## Conformité avec la base de données

### Interface TypeScript
```typescript
interface Logement {
  id: number;
  bailleur_id: number;
  reference: string;
  adresse: string | null;  // Nullable
  // Relations optionnelles
  bailleur?: {
    nom: string;
    couleur_primaire: string | null;
  };
  stats?: {
    locataires: number;
    incidents_actifs: number;
  };
}
```

### Champs de la table `logements`
- `id` : SERIAL PRIMARY KEY
- `bailleur_id` : INTEGER NOT NULL (FK vers bailleurs)
- `reference` : VARCHAR(100) NOT NULL
- `adresse` : TEXT (nullable)

### Gestion des valeurs null
- `adresse` : Affiche "Non renseignée" si null
- `bailleur` : Vérifié avec `logement.bailleur &&` avant affichage
- `stats` : Utilise `logement.stats?.locataires || 0` pour gérer undefined

## Données de démonstration
5 logements avec :
- Différents bailleurs (HSP, LC, RP)
- Références variées
- Adresses complètes ou null
- Statistiques de locataires et incidents

## Composants UI utilisés
- Input (recherche)
- Select (filtre bailleur)
- Table (liste des logements)
- Badge (statut vacant)
- Dialog (détails et création)
- Button (actions)
- Label (formulaires)

## Icônes Lucide
- Home : logements
- Search : recherche
- Plus : création
- Edit : modification
- Trash2 : suppression
- Eye : voir détails
- Building2 : bailleurs
- Users : locataires
- AlertTriangle : incidents
- MapPin : adresse
- Filter : filtres
- Download : export

## Palette de couleurs
- Bleu (#3B82F6) : thème principal logements
- Vert : logements occupés
- Orange : logements vacants
- Rouge : incidents actifs
- Gris : éléments neutres

## Points techniques
- Utilisation de `useState` pour la gestion d'état
- Filtrage côté client avec `filter()`
- Calcul dynamique des statistiques
- Gestion des relations optionnelles avec `?`
- Vérification des valeurs null avant affichage
- Liste unique des bailleurs extraite avec `Map`

## Prochaines étapes
- Connexion à l'API Supabase
- Implémentation des actions CRUD réelles
- Pagination pour grandes listes
- Export des données
- Filtres avancés (par statut d'occupation, par ville)
- Tri des colonnes
