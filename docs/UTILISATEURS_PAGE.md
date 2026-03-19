# Page de gestion des utilisateurs

## Vue d'ensemble
Page complète de gestion des utilisateurs administrateurs avec recherche, filtres, statistiques et actions CRUD.

## Route
`/admin/dashboard/utilisateurs`

## Fonctionnalités

### 1. Statistiques globales
- Total des utilisateurs
- Utilisateurs actifs
- Utilisateurs inactifs
- Super Admin
- Admin
- Gestionnaires

### 2. Recherche et filtres
- Recherche par nom ou email
- Filtre par rôle (super_admin/admin/gestionnaire)
- Résultats en temps réel

### 3. Tableau des utilisateurs
Colonnes affichées :
- Utilisateur (avatar avec initiales, nom complet, ID)
- Email (avec icône)
- Rôle (badge coloré)
- Statut (actif/inactif)
- Dernière connexion (date et heure)
- Actions (voir détails, modifier, supprimer)

### 4. Badges rôle
- Rouge : Super Admin
- Bleu : Admin
- Violet : Gestionnaire

### 5. Badges statut
- Vert : Actif
- Gris : Inactif

### 6. Modal de détails
Affiche pour chaque utilisateur :
- Avatar avec initiales
- Nom complet et ID
- Badge statut
- Email
- Rôle (badge)
- Date de création
- Dernière connexion (ou "Jamais connecté")

### 7. Dialog de création
Formulaire pour créer un nouvel utilisateur :
- Prénom (obligatoire)
- Nom (obligatoire)
- Email (obligatoire)
- Rôle (liste déroulante)
- Switch pour activer le compte

## Types d'utilisateurs

### Interface TypeScript
```typescript
interface Utilisateur {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: "super_admin" | "admin" | "gestionnaire";
  actif: boolean;
  date_creation: string;
  derniere_connexion: string | null;
}
```

### Rôles
- `super_admin` : Accès complet à toutes les fonctionnalités
- `admin` : Gestion des bailleurs, locataires, incidents
- `gestionnaire` : Consultation et gestion limitée

## Note importante
Cette page gère les utilisateurs administrateurs de la plateforme, pas les locataires. Les locataires sont gérés dans la page `/admin/dashboard/locataires` et sont liés à `auth.users` via la table `locataires`.

## Composants UI utilisés
- Input (recherche)
- Select (filtre rôle)
- Table (liste des utilisateurs)
- Badge (rôle et statut)
- Dialog (détails et création)
- Button (actions)
- Label (formulaires)
- Switch (statut actif)

## Icônes Lucide
- Users : utilisateurs (icône principale)
- Search : recherche
- Plus : création
- Edit : modification
- Trash2 : suppression
- Eye : voir détails
- Shield : super admin
- Mail : email
- Calendar : date
- CheckCircle : actif
- XCircle : inactif
- UserCog : admin

## Palette de couleurs
- Cyan (#06B6D4) : thème principal utilisateurs
- Rouge : super admin
- Bleu : admin
- Violet : gestionnaire
- Vert : actif
- Gris : inactif

## Prochaines étapes
- Connexion à l'API Supabase
- Intégration avec Supabase Auth
- Implémentation des actions CRUD réelles
- Gestion des permissions par rôle
- Pagination pour grandes listes
- Export des données
- Filtres avancés
- Historique des connexions
- Gestion des sessions
