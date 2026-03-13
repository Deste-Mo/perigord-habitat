# Page de gestion des locataires

## Vue d'ensemble
Page complète de gestion des locataires avec recherche, filtres, statistiques et actions CRUD.

## Route
`/dashboard/locataires`

## Fonctionnalités

### 1. Statistiques globales
- Total des locataires
- Locataires sans incidents
- Locataires avec incidents actifs
- Total des incidents actifs

### 2. Recherche et filtres
- Recherche par nom, prénom, téléphone ou référence de logement
- Filtre par bailleur
- Résultats en temps réel

### 3. Tableau des locataires
Colonnes affichées :
- Locataire (avatar avec initiales, nom complet, ID)
- Téléphone (avec icône, ou "Non renseigné" si null)
- Bailleur (avec pastille de couleur)
- Logement (référence + adresse si disponible)
- Incidents actifs (badge coloré selon le nombre)
- Total incidents
- Date de création
- Actions (voir détails, modifier, supprimer)

### 4. Badges incidents actifs
- Vert avec ✓ : Aucun incident
- Orange avec ⚠ : 1-2 incidents
- Rouge avec ✗ : 3+ incidents

### 5. Modal de détails
Affiche pour chaque locataire :
- Avatar avec initiales
- Nom complet, ID et User ID (UUID tronqué)
- Téléphone (ou "Non renseigné")
- Date de création
- Informations du bailleur (avec pastille de couleur)
- Logement (référence + adresse dans un encadré bleu)
- Statistiques : incidents actifs et total

### 6. Dialog de création
Formulaire pour créer un nouveau locataire :
- Prénom (obligatoire)
- Nom (obligatoire)
- Téléphone (optionnel)
- Sélection du bailleur (liste déroulante)
- Note : Email et mot de passe via Supabase Auth

## Conformité avec la base de données

### Interface TypeScript
```typescript
interface Locataire {
  id: number;
  user_id: string;  // UUID de auth.users
  bailleur_id: number;
  nom: string;
  prenom: string;
  telephone: string | null;  // Nullable
  date_creation: string;
  // Relations optionnelles
  bailleur?: {
    nom: string;
    couleur_primaire: string | null;
  };
  logement?: {
    reference: string;
    adresse: string | null;
  };
  stats?: {
    incidents_total: number;
    incidents_actifs: number;
  };
}
```

### Champs de la table `locataires`
- `id` : SERIAL PRIMARY KEY
- `user_id` : UUID (FK vers auth.users)
- `bailleur_id` : INTEGER NOT NULL (FK vers bailleurs)
- `nom` : VARCHAR(255) NOT NULL
- `prenom` : VARCHAR(255) NOT NULL
- `telephone` : VARCHAR(20) (nullable)
- `date_creation` : TIMESTAMPTZ DEFAULT NOW()

### Gestion des valeurs null
- `telephone` : Affiche "Non renseigné" si null
- `logement.adresse` : Affiche "Adresse non renseignée" si null
- `bailleur` : Vérifié avec `locataire.bailleur &&` avant affichage
- `stats` : Utilise `locataire.stats?.incidents_actifs || 0` pour gérer undefined

### Note importante sur l'authentification
- L'email et le mot de passe sont stockés dans `auth.users` (Supabase Auth)
- La table `locataires` contient uniquement le profil métier
- `user_id` est la clé étrangère vers `auth.users(id)`
- Contrainte UNIQUE sur `user_id` (un user = un locataire)

## Données de démonstration
5 locataires avec :
- Différents bailleurs (HSP, LC, RP)
- UUID valides pour user_id
- Téléphones variés (certains null)
- Logements avec références et adresses
- Statistiques d'incidents variées

## Composants UI utilisés
- Input (recherche)
- Select (filtre bailleur)
- Table (liste des locataires)
- Badge (statut incidents)
- Dialog (détails et création)
- Button (actions)
- Label (formulaires)

## Icônes Lucide
- Users : locataires
- Search : recherche
- Plus : création
- Edit : modification
- Trash2 : suppression
- Eye : voir détails
- Phone : téléphone
- Mail : email
- Home : logement
- Building2 : bailleur
- AlertTriangle : incidents
- Calendar : date
- CheckCircle : aucun incident
- XCircle : incidents critiques
- MapPin : adresse

## Palette de couleurs
- Violet (#8B5CF6) : thème principal locataires
- Vert : aucun incident
- Orange : incidents modérés
- Rouge : incidents critiques
- Bleu : informations logement
- Gris : éléments neutres

## Points techniques
- Utilisation de `useState` pour la gestion d'état
- Filtrage côté client avec `filter()`
- Recherche multi-critères (nom, téléphone, logement)
- Calcul dynamique des statistiques
- Gestion des relations optionnelles avec `?`
- Vérification des valeurs null avant affichage
- Avatar généré avec initiales
- Badge dynamique selon le nombre d'incidents
- UUID tronqué pour l'affichage (8 premiers caractères)

## Prochaines étapes
- Connexion à l'API Supabase
- Intégration avec Supabase Auth pour la création de comptes
- Implémentation des actions CRUD réelles
- Pagination pour grandes listes
- Export des données
- Filtres avancés (par statut d'incidents, par logement)
- Tri des colonnes
- Envoi d'invitations par email
- Gestion des permissions utilisateurs
