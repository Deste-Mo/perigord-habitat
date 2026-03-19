# Menu Admin - Qui fait quoi

## Structure du menu basée sur la base de données

### 📊 Dashboard
- **Tableau de bord** (`/admin/dashboard`) - Vue d'ensemble avec statistiques
- **Statistiques** (`/admin/dashboard/statistiques`) - Analyses détaillées

### 🚨 Gestion des incidents
- **Incidents** (`/admin/dashboard/incidents`)
  - Tous les incidents
  - Nouveaux
  - En cours
  - Résolus
- **Médias** (`/admin/dashboard/medias`) - Photos, vidéos, audio des incidents

### 🏢 Gestion des bailleurs
- **Bailleurs** (`/admin/dashboard/bailleurs`) - Gestion des bailleurs sociaux
- **Logements** (`/admin/dashboard/logements`) - Gestion des logements
- **Locataires** (`/admin/dashboard/locataires`) - Gestion des locataires

### 📚 Base de connaissances
- **Pièces** (`/admin/dashboard/pieces`) - Pièces du logement
- **Équipements** (`/admin/dashboard/equipements`) - Équipements par pièce
- **Pannes** (`/admin/dashboard/pannes`) - Base de connaissances des pannes

### ⚙️ Configuration
- **Paramètres** (`/admin/dashboard/parametres`) - Configuration générale
- **Utilisateurs** (`/admin/dashboard/utilisateurs`) - Gestion des utilisateurs
- **API & Intégrations** (`/admin/dashboard/api`) - Clés API et intégrations

## Correspondance avec la base de données

| Menu | Table(s) | Description |
|------|----------|-------------|
| Incidents | `incidents`, `medias` | Tickets déclarés par les locataires |
| Bailleurs | `bailleurs` | Bailleurs sociaux (multi-tenant) |
| Logements | `logements` | Logements gérés par les bailleurs |
| Locataires | `locataires` | Profils locataires liés à auth.users |
| Pièces | `pieces` | Pièces du logement (séjour, cuisine, etc.) |
| Équipements | `equipements` | Équipements dans chaque pièce |
| Pannes | `pannes` | Base de connaissances des pannes |
