# Schéma Interactif avec React Konva - Version Plan Dessiné

## 🎯 Concept

Remplacement du schéma interactif par cartes par un vrai dessin de plan de logement utilisant React Konva.
Le plan affiche les pièces avec leurs murs, portes et fenêtres, et permet de cliquer directement sur les pièces.

## ✨ Fonctionnalités

### 1. Plan de logement dessiné
- **Murs extérieurs** : Contour du logement en noir
- **Pièces colorées** : Chaque pièce a sa couleur distinctive
  - 🏠 Séjour : Bleu
  - 🍳 Cuisine : Orange
  - 🚿 Salle de bain : Cyan
  - 🌳 Extérieur : Vert
- **Portes** : Traits violets entre les pièces
- **Fenêtres** : Traits bleus en pointillés sur les murs extérieurs

### 2. Zoom et navigation
- **Zoom avec molette** : Utilisez la molette de la souris pour zoomer/dézoomer
- **Boutons de zoom** : Zoom +, Zoom -, Réinitialiser
- **Déplacement** : Cliquez et glissez pour déplacer le plan
- **Limites** : Zoom entre 0.5x et 3x
- **Indicateur** : Affichage du niveau de zoom en pourcentage

### 3. Interactivité
- **Hover** : Survol d'une pièce change sa couleur
- **Clic** : Sélection d'une pièce affiche ses détails en dessous
- **Indicateur visuel** : Point coloré sur la pièce sélectionnée
- **Responsive** : Le plan s'adapte à la taille de l'écran

### 4. Conservation des fonctionnalités existantes
- Toutes les modales de détail des problèmes
- Système de codes couleur (🟠🔴🔵⚪)
- Références juridiques
- Diagnostics étape par étape
- Solutions détaillées

## 📁 Structure des fichiers

```
app/
├── page.tsx                          # Page d'accueil (liens vers les 2 versions)
├── schema-logement/
│   └── page.tsx                      # Version liste (ancienne)
└── schema-logement-konva/
    └── page.tsx                      # Version plan Konva (nouvelle)

components/
└── schema/
    ├── PlanLogementKonva.tsx         # Composant du plan dessiné
    ├── PieceCard.tsx                 # Carte de pièce (réutilisée)
    └── ProblemeDetail.tsx            # Modal détail (réutilisée)
```

## 🎨 Technologies utilisées

### React Konva
- **react-konva** : Wrapper React pour Konva.js
- **konva** : Bibliothèque de dessin 2D sur canvas HTML5

### Avantages
- Performance élevée (canvas natif)
- Interactivité fluide
- Facile à personnaliser
- Support mobile et tactile

## 🚀 Utilisation

1. Accéder au plan :
```
http://localhost:3000/schema-logement-konva
```

2. Navigation :
   - Survoler une pièce pour la mettre en évidence
   - Cliquer sur une pièce pour voir ses problèmes
   - Cliquer sur un problème pour voir le détail complet
   - Bouton "Version liste" pour revenir à l'ancienne version

## 📐 Dimensions du plan

```typescript
// Taille du canvas
Stage: 620x470 pixels

// Pièces
Séjour:        x:50,  y:50,  width:300, height:250
Cuisine:       x:370, y:50,  width:200, height:150
Salle de bain: x:370, y:220, width:200, height:130
Extérieur:     x:50,  y:320, width:520, height:100
```

## 🎯 Personnalisation

### Modifier le plan
Éditer `components/schema/PlanLogementKonva.tsx` :

```typescript
const planPieces: Piece[] = [
  {
    ...pieces.find(p => p.id === 'sejour')!,
    x: 50,      // Position X
    y: 50,      // Position Y
    width: 300, // Largeur
    height: 250,// Hauteur
    emoji: '🏠' // Emoji affiché
  },
  // ... autres pièces
]
```

### Ajouter des portes
```typescript
<Line
  points={[x1, y1, x2, y2]}
  stroke="#8b5cf6"
  strokeWidth={6}
/>
```

### Ajouter des fenêtres
```typescript
<Line
  points={[x1, y1, x2, y2]}
  stroke="#60a5fa"
  strokeWidth={8}
  dash={[10, 5]}
/>
```

## 🔄 Comparaison des versions

| Fonctionnalité | Version Liste | Version Konva |
|----------------|---------------|---------------|
| Navigation | Cartes dépliables | Plan cliquable |
| Visualisation | Liste verticale | Plan 2D |
| Interactivité | Accordéon | Canvas interactif |
| Mobile | ✅ Optimisé | ✅ Tactile |
| Performance | Excellente | Excellente |
| Personnalisation | Facile | Moyenne |

## 🎯 Prochaines étapes

### Phase 1 : Amélioration du plan
- [x] Ajouter le zoom et le pan
- [ ] Ajouter plus de détails (meubles, équipements)
- [ ] Mode plein écran
- [ ] Rotation du plan

### Phase 2 : Plans personnalisés
- [ ] Upload de plan personnalisé
- [ ] Éditeur de plan intégré
- [ ] Bibliothèque de symboles
- [ ] Export PDF du plan

### Phase 3 : Fonctionnalités avancées
- [ ] Plans multi-étages
- [ ] Vue 3D (Three.js)
- [ ] Réalité augmentée
- [ ] Visite virtuelle

## 📝 Notes techniques

### Performance
- Canvas HTML5 natif (pas de DOM)
- Rendu optimisé par Konva
- Gestion efficace des événements
- Pas de re-render inutile

### Accessibilité
- Textes lisibles sur le plan
- Contraste élevé
- Support clavier (à améliorer)
- Alternative textuelle disponible (version liste)

### Compatibilité
- Tous navigateurs modernes
- Support mobile et tablette
- Touch events natifs
- Pas de dépendances lourdes

---

**Version** : 1.0  
**Date** : 2026-03-13  
**Technologie** : React Konva  
**Projet** : Plateforme "QUI FAIT QUOI"
