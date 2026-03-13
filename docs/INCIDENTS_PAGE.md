# Page de gestion des incidents

## Vue d'ensemble

La page de gestion des incidents permet aux administrateurs de visualiser, filtrer et gérer tous les incidents déclarés par les locataires.

## Fonctionnalités

### 📊 Tableau de bord
- **Liste complète** des incidents avec pagination
- **Recherche en temps réel** par titre, description, locataire ou référence logement
- **Filtres multiples** : statut et responsable
- **Statistiques rapides** : compteurs par statut

### 🔍 Filtres disponibles

#### Par statut
- **Nouveau** - Incidents non traités
- **En cours** - Incidents en cours de traitement
- **Résolu** - Incidents résolus
- **Fermé** - Incidents archivés

#### Par responsable
- **Locataire** - À la charge du locataire
- **Bailleur** - À la charge du bailleur
- **Contrat** - Couvert par un contrat d'entretien
- **À vérifier** - Responsabilité à déterminer

### 📋 Informations affichées

Pour chaque incident :
- **ID** - Numéro unique
- **Titre et description** - Détails du problème
- **Locataire** - Nom et prénom
- **Logement** - Référence et adresse
- **Statut** - Badge coloré
- **Responsable** - Badge avec responsabilité
- **Date** - Date de création (format relatif)

### ⚡ Actions disponibles

- **Voir** 👁️ - Afficher les détails complets
- **Modifier** ✏️ - Éditer l'incident
- **Supprimer** 🗑️ - Supprimer l'incident
- **Exporter** 📥 - Exporter la liste (CSV/Excel)
- **Créer** ➕ - Ajouter un nouvel incident

## Structure des données

```typescript
interface Incident {
  id: number;
  titre: string;
  description: string;
  statut: "nouveau" | "en_cours" | "resolu" | "ferme";
  responsable_identifie: "locataire" | "bailleur" | "contrat" | "a_verifier";
  locataire: {
    nom: string;
    prenom: string;
  };
  logement: {
    reference: string;
    adresse: string;
  };
  bailleur: {
    nom: string;
  };
  date_creation: string;
}
```

## Routes

- `/dashboard/incidents` - Liste complète
- `/dashboard/incidents/nouveaux` - Filtre nouveaux
- `/dashboard/incidents/en-cours` - Filtre en cours
- `/dashboard/incidents/resolus` - Filtre résolus

## Prochaines étapes

### À implémenter
1. **Connexion Supabase** - Récupération des données réelles
2. **Page de détails** - Vue complète d'un incident avec médias
3. **Formulaire de création** - Ajouter un nouvel incident
4. **Formulaire d'édition** - Modifier un incident existant
5. **Gestion des médias** - Upload et affichage photos/vidéos
6. **Pagination** - Gérer les grandes listes
7. **Export** - Télécharger en CSV/Excel
8. **Notifications** - Alertes pour nouveaux incidents
9. **Historique** - Suivi des modifications
10. **Commentaires** - Fil de discussion par incident
