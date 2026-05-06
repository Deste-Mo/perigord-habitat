# Schéma Interactif du Logement

## 🎯 Fonctionnalités implémentées

### Page d'accueil (`/`)
- Hero section avec présentation
- Barre de recherche principale
- Lien vers le schéma interactif
- Légende des codes couleur
- Design moderne et responsive

### Schéma interactif (`/schema-logement`)
- **4 pièces principales** :
  - 🏠 Séjour (6 équipements)
  - 🍳 Cuisine (6 équipements)
  - 🚿 Salle de bain (5 équipements)
  - 🌳 Extérieur (6 équipements)

- **Navigation intuitive** :
  - Clic sur une pièce pour déplier les équipements
  - Code couleur par responsabilité
  - Animations fluides
  - Barre de recherche toujours visible

- **Codes couleur** :
  - 🟠 Orange = Locataire
  - 🔴 Rouge = Bailleur
  - 🔵 Bleu = Contrat d'entretien
  - ⚪ Gris = À vérifier

## 🚀 Lancer l'application

```bash
npm run dev
```

Puis ouvrez : http://localhost:3000

## 📁 Structure des fichiers

```
app/
├── page.tsx                          # Page d'accueil
└── schema-logement/
    └── page.tsx                      # Schéma interactif

components/
└── schema/
    ├── PieceCard.tsx                 # Carte de pièce
    └── EquipementModal.tsx           # Modal détails équipement
```

## 🎨 Design

- Mobile-first
- Tailwind CSS
- Lucide React icons
- Animations smooth
- Responsive
