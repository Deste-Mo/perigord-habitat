# Page de gestion des bailleurs

## Vue d'ensemble

La page de gestion des bailleurs permet aux administrateurs de gérer les bailleurs sociaux (multi-tenant) de la plateforme.

## Fonctionnalités

### 📊 Tableau de bord
- **Liste complète** des bailleurs avec toutes les informations
- **Recherche en temps réel** par nom
- **Filtres** par statut (Actif/Inactif)
- **Statistiques globales** : total, actifs, inactifs, logements, locataires, incidents

### 🏢 Informations affichées

Pour chaque bailleur :
- **Logo/Avatar** - Initiales avec couleur primaire
- **Nom** - Nom complet du bailleur
- **ID** - Identifiant unique
- **Couleur primaire** - Code hexadécimal avec aperçu
- **Statut** - Badge Actif/Inactif
- **Statistiques** :
  - Nombre de logements
  - Nombre de locataires
  - Nombre d'incidents actifs
- **API Key** - Clé d'API masquée
- **Date de création** - Format français

### 🎨 Personnalisation

Chaque bailleur peut avoir :
- **Logo personnalisé** - URL vers le logo
- **Couleur primaire** - Code hexadécimal pour le branding
- **API Key unique** - Pour l'intégration multi-tenant

### 🔍 Filtres disponibles

#### Par statut
- **Tous** - Tous les bailleurs
- **Actifs** - Bailleurs actifs uniquement
- **Inactifs** - Bailleurs désactivés

### ⚡ Actions disponibles

#### Actions principales
- **Créer** ➕ - Ajouter un nouveau bailleur
- **Voir** 👁️ - Afficher les détails complets
- **Modifier** ✏️ - Éditer les informations
- **Supprimer** 🗑️ - Supprimer le bailleur

#### Modal de détails
Affiche :
- En-tête avec logo/avatar et statut
- Couleur primaire avec aperçu
- Date de création
- Clé API complète (avec bouton copier)
- Statistiques détaillées (cartes colorées)
- Actions : Fermer, Modifier

#### Modal de création
Formulaire avec :
- Nom du bailleur (requis)
- Couleur primaire (sélecteur de couleur + input)
- Statut actif/inactif (switch)
- Boutons : Annuler, Créer

### 📊 Statistiques globales

Affichage en temps réel :
- **Total** - Nombre total de bailleurs
- **Actifs** - Bailleurs actifs (vert)
- **Inactifs** - Bailleurs inactifs (rouge)
- **Logements** - Total des logements (bleu)
- **Locataires** - Total des locataires (violet)
- **Incidents** - Total des incidents actifs (orange)

## Structure des données

```typescript
interface Bailleur {
  id: number;
  nom: string;
  logo_url: string | null;
  couleur_primaire: string | null;
  api_key: string;
  actif: boolean;
  date_creation: string;
  stats: {
    logements: number;
    locataires: number;
    incidents_actifs: number;
  };
}
```

## Sécurité

### API Key
- **Masquage** - Affichage masqué dans le tableau (`hsp_live_************`)
- **Affichage complet** - Uniquement dans le modal de détails
- **Copie** - Bouton pour copier la clé complète
- **Format** - `{prefix}_live_{random}` (ex: `hsp_live_abc123xyz789`)

### Multi-tenant
- Chaque bailleur a sa propre clé API
- Isolation des données par bailleur_id
- Gestion des accès via RLS (Row Level Security)

## Design

### Couleurs par statut
- **Actif** : Vert (#10B981) avec CheckCircle
- **Inactif** : Rouge (#EF4444) avec XCircle

### Avatar/Logo
- Si logo_url existe : affichage du logo
- Sinon : initiales (2 premières lettres) sur fond couleur_primaire
- Taille : 40x40px dans le tableau, 64x64px dans le modal

### Responsive
- Mobile : Tableau scrollable horizontal
- Tablette : 2-3 colonnes pour les stats
- Desktop : Affichage complet
- Support du thème dark/light

## Prochaines étapes

### À implémenter
1. **Connexion Supabase** - CRUD complet des bailleurs
2. **Upload de logo** - Intégration Supabase Storage
3. **Génération API Key** - Génération sécurisée automatique
4. **Validation** - Formulaires avec validation (Zod)
5. **Régénération API Key** - Bouton pour régénérer la clé
6. **Désactivation** - Toggle rapide actif/inactif
7. **Historique** - Suivi des modifications
8. **Export** - Télécharger la liste en CSV
9. **Filtres avancés** - Par date, par nombre de logements
10. **Pagination** - Gérer les grandes listes
11. **Tri** - Par nom, date, nombre de logements
12. **Recherche avancée** - Par API key, par stats

## Routes

- `/dashboard/bailleurs` - Page principale de gestion des bailleurs

## Correspondance base de données

Table : `bailleurs`
```sql
CREATE TABLE bailleurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500),
    couleur_primaire VARCHAR(7),
    api_key VARCHAR(255) UNIQUE,
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMPTZ DEFAULT NOW()
);
```

## Relations

- **1 bailleur → N logements** (via `bailleur_id`)
- **1 bailleur → N locataires** (via `bailleur_id`)
- **1 bailleur → N incidents** (via `bailleur_id`)

## Technologies utilisées

- **shadcn/ui** - Dialog, Badge, Select, Switch, Label
- **Lucide React** - Icônes
- **Tailwind CSS** - Styling responsive
- **Next.js 16** - Framework React
