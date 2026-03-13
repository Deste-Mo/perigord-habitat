# Conformité des pages avec le schéma de base de données

## ✅ Pages conformes

### 1. Bailleurs (`/dashboard/bailleurs`)
**Statut**: ✅ Conforme

**Interface TypeScript**:
```typescript
interface Bailleur {
  id: number;
  nom: string;
  logo_url: string | null;
  couleur_primaire: string | null;
  api_key: string;
  actif: boolean;
  date_creation: string;
  stats: { // Calculé côté client
    logements: number;
    locataires: number;
    incidents_actifs: number;
  };
}
```

**Correspondance SQL**: 100%
- Tous les champs de la table `bailleurs` sont présents
- `stats` est un champ calculé pour l'affichage

---

### 2. Incidents (`/dashboard/incidents`)
**Statut**: ✅ Conforme (corrigé)

**Interface TypeScript**:
```typescript
interface Incident {
  id: number;
  bailleur_id: number;
  locataire_id: number;
  logement_id: number;
  panne_id: number | null;
  titre: string;
  description: string | null;
  statut: "nouveau" | "en_cours" | "resolu" | "ferme";
  responsable_identifie: "locataire" | "bailleur" | "contrat" | "a_verifier" | null;
  diagnostic_ia: any | null;
  date_creation: string;
  // Relations optionnelles pour l'affichage
  locataire?: { nom: string; prenom: string; };
  logement?: { reference: string; adresse: string | null; };
  bailleur?: { nom: string; };
}
```

**Correspondance SQL**: 100%
- Tous les champs de la table `incidents` sont présents
- Relations marquées comme optionnelles (?)

---

### 3. Médias (`/dashboard/medias`)
**Statut**: ✅ Conforme (corrigé)

**Interface TypeScript**:
```typescript
interface Media {
  id: number;
  incident_id: number;
  type_media: "photo" | "video" | "audio";
  url: string;
  analyse_ia: {
    description?: string;
    tags?: string[];
    confidence?: number;
  } | null;
  date_upload: string;
  // Relation optionnelle pour l'affichage
  incident?: {
    id: number;
    titre: string;
    locataire: string;
    logement: string;
  };
}
```

**Correspondance SQL**: 100%
- Tous les champs de la table `medias` sont présents
- `analyse_ia` est typé avec une structure suggérée
- Relation `incident` marquée comme optionnelle (?)

---

### 4. Logements (`/dashboard/logements`)
**Statut**: ✅ Conforme

**Interface TypeScript**:
```typescript
interface Logement {
  id: number;
  bailleur_id: number;
  reference: string;
  adresse: string | null;
  // Relations optionnelles pour l'affichage
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

**Correspondance SQL**: 100%
- Tous les champs de la table `logements` sont présents
- `adresse` correctement marqué comme nullable
- Relations marquées comme optionnelles (?)
- Gestion des valeurs null dans l'affichage

**Fonctionnalités**:
- Recherche par référence et adresse
- Filtre par bailleur
- Statistiques globales et par bailleur
- Badge "Vacant" pour logements sans locataire
- Modal de détails complet
- Dialog de création

---

### 5. Locataires (`/dashboard/locataires`)
**Statut**: ✅ Conforme

**Interface TypeScript**:
```typescript
interface Locataire {
  id: number;
  user_id: string; // UUID de auth.users
  bailleur_id: number;
  nom: string;
  prenom: string;
  telephone: string | null;
  date_creation: string;
  // Relations optionnelles pour l'affichage
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

**Correspondance SQL**: 100%
- Tous les champs de la table `locataires` sont présents
- `user_id` correctement typé comme string (UUID)
- `telephone` correctement marqué comme nullable
- Relations marquées comme optionnelles (?)
- Gestion des valeurs null dans l'affichage

**Note importante**: Email et mot de passe sont dans `auth.users` (Supabase Auth), pas dans cette table

**Fonctionnalités**:
- Recherche multi-critères (nom, téléphone, logement)
- Filtre par bailleur
- Statistiques globales (total, avec/sans incidents)
- Avatar avec initiales
- Badge dynamique selon nombre d'incidents
- Modal de détails complet avec logement
- Dialog de création avec note sur Supabase Auth

---

### 6. Pièces (`/dashboard/pieces`)
**Statut**: ✅ Conforme

**Interface TypeScript**:
```typescript
interface Piece {
  id: number;
  nom: string;
  icone_url: string | null;
  // Stats optionnelles pour l'affichage
  stats?: {
    equipements: number;
  };
}
```

**Correspondance SQL**: 100%
- Tous les champs de la table `pieces` sont présents
- `icone_url` correctement marqué comme nullable
- Stats marquées comme optionnelles (?)
- Gestion des valeurs null dans l'affichage

**Données initiales**: Séjour, Cuisine, Salle de bain, Extérieur (insérées via SQL)

**Fonctionnalités**:
- Recherche par nom
- Statistiques globales (total, équipements, avec/sans icône)
- Double affichage : grille (principale) + tableau (alternative)
- Icône par défaut si null
- Badge statut icône
- Modal de détails complet
- Dialog de création

---

### 7. Équipements (`/dashboard/equipements`)
**Statut**: ✅ Conforme

**Interface TypeScript**:
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

**Correspondance SQL**: 100%
- Tous les champs de la table `equipements` sont présents
- `piece_id` correctement typé (clé étrangère obligatoire)
- `sous_contrat` correctement typé comme boolean
- Relation `piece` marquée comme optionnelle (?)
- Stats marquées comme optionnelles (?)

**Fonctionnalités**:
- Recherche par nom
- Filtre par pièce
- Filtre par statut de contrat (sous contrat / hors contrat)
- Statistiques globales (total, sous/hors contrat, pannes)
- Répartition par pièce
- Badge dynamique selon nombre de pannes
- Badge statut contrat
- Modal de détails complet
- Dialog de création avec Switch pour le contrat

---

### 8. Pannes (`/dashboard/pannes`)
**Statut**: ✅ Conforme

**Interface TypeScript**:
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

**Correspondance SQL**: 100%
- Tous les champs de la table `pannes` sont présents
- `equipement_id` correctement typé (clé étrangère obligatoire)
- Enums `responsable` et `qui_paie` correctement définis
- Champs nullable correctement marqués
- Relation `equipement` marquée comme optionnelle (?)

**Fonctionnalités**:
- Recherche par titre, description, équipement
- Filtre par responsable
- Statistiques globales par responsable
- Badges colorés selon responsable et qui paie
- Guide d'auto-dépannage (JSONB)
- Référence juridique
- Modal de détails complet

---

### 9. Paramètres (`/dashboard/parametres`)
**Statut**: ✅ Créée (page système)

**Note**: Cette page ne correspond pas à une table de la base de données. Elle gère les paramètres système (notifications, sécurité, apparence, base de données, email).

**Sections**:
- Notifications (email, push)
- Sécurité (API key, webhook)
- Apparence (thème, langue)
- Base de données (URL Supabase, mode debug)
- Configuration Email (SMTP)

---

### 10. Utilisateurs (`/dashboard/utilisateurs`)
**Statut**: ✅ Créée (utilisateurs admin)

**Note**: Cette page gère les utilisateurs administrateurs de la plateforme, pas les locataires. Les locataires sont dans la table `locataires` liée à `auth.users`.

**Interface TypeScript**:
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

**Fonctionnalités**:
- Recherche par nom ou email
- Filtre par rôle
- Statistiques globales par rôle et statut
- Badges colorés selon rôle
- Gestion des permissions
- Modal de détails complet

---

## 📋 Résumé

### Pages conformes à la base de données
1. ✅ Bailleurs
2. ✅ Incidents
3. ✅ Médias
4. ✅ Logements
5. ✅ Locataires
6. ✅ Pièces
7. ✅ Équipements
8. ✅ Pannes

### Pages système (hors base de données)
9. ✅ Paramètres (configuration système)
10. ✅ Utilisateurs (admin, hors table locataires)

### Toutes les tables de la base sont couvertes ✅

---

## 🔗 Références

- Schéma SQL: `docs/bd/database-supabase-minimal.sql`
- Documentation schéma: `docs/DATABASE_SCHEMA.md`
- Ce document: `docs/PAGES_CONFORMITE.md`


### 1. Noms des champs
- ✅ Utiliser exactement les mêmes noms que dans la base de données
- ✅ Respecter la casse (snake_case en SQL → snake_case en TypeScript)
- ❌ Ne pas renommer les champs (ex: `date_creation` pas `createdAt`)

### 2. Types
- ✅ `SERIAL` → `number`
- ✅ `VARCHAR/TEXT` → `string`
- ✅ `BOOLEAN` → `boolean`
- ✅ `TIMESTAMPTZ` → `string` (ISO 8601)
- ✅ `JSONB` → `any` ou type structuré
- ✅ `UUID` → `string`
- ✅ Champs nullable → `type | null`

### 3. Relations
- ✅ Les clés étrangères doivent être présentes (ex: `bailleur_id`)
- ✅ Les relations jointes sont optionnelles et marquées avec `?`
- ✅ Préfixer les relations avec le nom de la table (ex: `bailleur?: { ... }`)

### 4. Enums
- ✅ Utiliser des unions de types littéraux
- ✅ Respecter exactement les valeurs SQL
- ✅ Exemple: `"nouveau" | "en_cours" | "resolu" | "ferme"`

### 5. Champs calculés
- ✅ Les stats et champs calculés doivent être marqués comme optionnels
- ✅ Exemple: `stats?: { ... }`
- ✅ Ne pas les confondre avec les champs de la base de données

## 📝 Checklist pour nouvelles pages

Avant de créer une nouvelle page :
1. [ ] Lire le schéma SQL dans `database-supabase-minimal.sql`
2. [ ] Créer l'interface TypeScript exacte
3. [ ] Vérifier tous les noms de champs
4. [ ] Vérifier tous les types
5. [ ] Marquer les relations comme optionnelles
6. [ ] Documenter dans `docs/`
7. [ ] Tester avec des données de démonstration

## 🔗 Références

- Schéma SQL: `docs/bd/database-supabase-minimal.sql`
- Documentation schéma: `docs/DATABASE_SCHEMA.md`
- Ce document: `docs/PAGES_CONFORMITE.md`
