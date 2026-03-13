# Menu Admin - Qui fait quoi

## Structure du menu basée sur la base de données

### 📊 Dashboard
- **Tableau de bord** (`/dashboard`) - Vue d'ensemble avec statistiques
- **Statistiques** (`/dashboard/statistiques`) - Analyses détaillées

### 🚨 Gestion des incidents
- **Incidents** (`/dashboard/incidents`)
  - Tous les incidents
  - Nouveaux
  - En cours
  - Résolus
- **Médias** (`/dashboard/medias`) - Photos, vidéos, audio des incidents

### 🏢 Gestion des bailleurs
- **Bailleurs** (`/dashboard/bailleurs`) - Gestion des bailleurs sociaux
- **Logements** (`/dashboard/logements`) - Gestion des logements
- **Locataires** (`/dashboard/locataires`) - Gestion des locataires

### 📚 Base de connaissances
- **Pièces** (`/dashboard/pieces`) - Pièces du logement
- **Équipements** (`/dashboard/equipements`) - Équipements par pièce
- **Pannes** (`/dashboard/pannes`) - Base de connaissances des pannes

### ⚙️ Configuration
- **Paramètres** (`/dashboard/parametres`) - Configuration générale
- **Utilisateurs** (`/dashboard/utilisateurs`) - Gestion des utilisateurs
- **API & Intégrations** (`/dashboard/api`) - Clés API et intégrations

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
