# Page de gestion des pièces

## Vue d'ensemble
Page complète de gestion des pièces (types de pièces dans un logement) avec recherche, statistiques et actions CRUD. Affichage en grille et en tableau.

## Route
`/dashboard/pieces`

## Fonctionnalités

### 1. Statistiques globales
- Total des pièces
- Total des équipements (tous types confondus)
- Pièces avec icône définie
- Pièces sans icône

### 2. Recherche
- Recherche par nom de pièce
- Résultats en temps réel

### 3. Vue en grille (principale)
Cartes affichant pour chaque pièce :
- Icône visuelle (ou icône par défaut si null)
- Nom de la pièce
- ID
- Statut de l'icône (définie/non définie)
- Nombre d'équipements
- Actions (voir détails, modifier, supprimer)

### 4. Vue en tableau (alternative)
Colonnes affichées :
- Pièce (avec icône et nom)
- Statut icône (badge)
- URL de l'icône (code ou N/A)
- Nombre d'équipements
- Actions

### 5. Modal de détails
Affiche pour chaque pièce :
- Icône et nom
- ID
- Badge statut icône
- URL complète de l'icône (ou "Non renseignée")
- Statistiques : nombre d'équipements

### 6. Dialog de création
Formulaire pour créer une nouvelle pièce :
- Nom de la pièce (obligatoire)
- URL de l'icône (optionnel)
- Note sur les pièces initiales

## Conformité avec la base de données

### Interface TypeScript
```typescript
interface Piece {
  id: number;
  nom: string;
  icone_url: string | null;  // Nullable
  // Stats optionnelles
  stats?: {
    equipements: number;
  };
}
```

### Champs de la table `pieces`
- `id` : SERIAL PRIMARY KEY
- `nom` : VARCHAR(100) NOT NULL
- `icone_url` : VARCHAR(500) (nullable)

### Gestion des valeurs null
- `icone_url` : Affiche icône par défaut si null
- Badge "Non définie" si icône null
- Affiche "Non renseignée" dans le modal si null
- Affiche "N/A" dans le tableau si null

### Données initiales (SQL)
Les 4 pièces de base insérées lors de la création de la base :
1. Séjour - `/icons/living-room.svg`
2. Cuisine - `/icons/kitchen.svg`
3. Salle de bain - `/icons/bathroom.svg`
4. Extérieur - `/icons/outdoor.svg`

## Données de démonstration
6 pièces incluant :
- Les 4 pièces initiales
- Chambre (avec icône)
- Garage (sans icône, pour tester le cas null)

## Composants UI utilisés
- Input (recherche)
- Table (vue tableau)
- Badge (statut icône)
- Dialog (détails et création)
- Button (actions)
- Label (formulaires)

## Icônes Lucide
- Grid3x3 : pièces (icône principale)
- Search : recherche
- Plus : création
- Edit : modification
- Trash2 : suppression
- Eye : voir détails
- Image : icône définie
- Package : équipements
- Wrench : outils/configuration
- AlertTriangle : sans icône

## Palette de couleurs
- Teal/Cyan (#14B8A6) : thème principal pièces
- Bleu : équipements
- Vert : icône définie
- Orange : sans icône
- Gris : éléments neutres

## Points techniques
- Utilisation de `useState` pour la gestion d'état
- Filtrage côté client avec `filter()`
- Double affichage : grille (principale) + tableau (alternative)
- Fonction `getIconeDisplay()` pour gérer l'affichage des icônes
- Gestion des valeurs null pour `icone_url`
- Calcul dynamique des statistiques
- Cartes avec hover effect pour meilleure UX

## Design spécifique
- Vue en grille responsive (1 col mobile, 2 cols tablet, 3 cols desktop)
- Cartes avec ombre et transition au survol
- Icônes dans des conteneurs colorés
- Badge coloré selon le statut
- Séparation visuelle entre les sections

## Prochaines étapes
- Connexion à l'API Supabase
- Implémentation des actions CRUD réelles
- Upload d'icônes SVG
- Gestion des équipements liés
- Filtres avancés
- Tri des colonnes
- Prévisualisation des icônes SVG
- Validation des URLs d'icônes
