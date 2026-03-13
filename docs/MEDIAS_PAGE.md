# Page de gestion des médias

## Vue d'ensemble

La page de gestion des médias permet aux administrateurs de visualiser, filtrer et gérer tous les médias (photos, vidéos, audio) associés aux incidents.

## Fonctionnalités

### 📊 Affichage des médias
- **Vue grille** - Cartes avec aperçu visuel
- **Vue liste** - Liste détaillée avec informations complètes
- **Recherche en temps réel** par incident, locataire, logement ou tags
- **Filtres par type** : Photos, Vidéos, Audio
- **Statistiques rapides** : compteurs par type

### 🎨 Modes d'affichage

#### Vue Grille
- Cartes visuelles avec aperçu du type de média
- Badges colorés par type (Bleu=Photo, Violet=Vidéo, Vert=Audio)
- Tags IA affichés (3 premiers)
- Date d'upload
- Hover effect avec ombre

#### Vue Liste
- Affichage compact avec toutes les informations
- Actions rapides (Voir, Télécharger, Supprimer)
- Icônes par type de média
- Tags IA (4 premiers)

### 🔍 Filtres disponibles

#### Par type de média
- **Photo** - Images JPG, PNG, etc.
- **Vidéo** - Fichiers MP4, AVI, etc.
- **Audio** - Fichiers MP3, WAV, etc.

#### Par recherche
- Titre de l'incident
- Nom du locataire
- Référence du logement
- Tags d'analyse IA

### 📋 Informations affichées

Pour chaque média :
- **Type** - Badge coloré (Photo/Vidéo/Audio)
- **Incident associé** - Titre et ID
- **Locataire** - Nom complet
- **Logement** - Référence
- **Date d'upload** - Format français avec heure
- **Analyse IA** - Description, tags, niveau de confiance
- **Aperçu** - Icône représentative du type

### 💡 Analyse IA

Chaque média peut avoir une analyse IA contenant :
- **Description** - Texte descriptif du contenu
- **Tags** - Mots-clés identifiés automatiquement
- **Confiance** - Score de confiance de l'analyse (0-100%)

### ⚡ Actions disponibles

- **Voir** 👁️ - Ouvrir en modal avec détails complets
- **Télécharger** 📥 - Télécharger le fichier
- **Supprimer** 🗑️ - Supprimer le média
- **Uploader** 📤 - Ajouter un nouveau média

### 🎯 Modal de détails

Affiche :
- Aperçu grand format du média
- Toutes les informations (type, date, locataire, logement)
- Analyse IA complète avec tous les tags
- Score de confiance
- Actions (Télécharger, Supprimer)

## Structure des données

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
  incident: {
    id: number;
    titre: string;
    locataire: string;
    logement: string;
  };
}
```

## Statistiques

Affichage en temps réel :
- **Total** - Nombre total de médias
- **Photos** - Compteur avec icône bleue
- **Vidéos** - Compteur avec icône violette
- **Audio** - Compteur avec icône verte

## Design

### Couleurs par type
- **Photo** : Bleu (#3B82F6)
- **Vidéo** : Violet (#A855F7)
- **Audio** : Vert (#10B981)

### Responsive
- Mobile : 1 colonne
- Tablette : 2 colonnes
- Desktop : 3-4 colonnes
- Support du thème dark/light

## Prochaines étapes

### À implémenter
1. **Connexion Supabase** - Récupération des médias réels
2. **Upload de fichiers** - Formulaire d'upload avec drag & drop
3. **Lecteur intégré** - Player pour vidéos et audio
4. **Visionneuse d'images** - Lightbox pour les photos
5. **Analyse IA réelle** - Intégration API d'analyse d'images
6. **Compression** - Optimisation automatique des fichiers
7. **Stockage** - Intégration Supabase Storage
8. **Pagination** - Gérer les grandes collections
9. **Filtres avancés** - Par date, par bailleur, par statut incident
10. **Export** - Téléchargement groupé en ZIP

## Routes

- `/dashboard/medias` - Page principale de gestion des médias

## Technologies utilisées

- **shadcn/ui** - Composants Dialog, Badge, Select
- **Lucide React** - Icônes
- **Tailwind CSS** - Styling responsive
- **Next.js 16** - Framework React
