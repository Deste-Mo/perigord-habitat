# Schéma Interactif "Qui fait quoi / Qui paie quoi" - Version 2

## 🎯 Concept

Un schéma interactif moderne inspiré des livrets PDF des bailleurs sociaux (comme Périgord Habitat), 
mais en version tactile, pédagogique et dépliable.

## ✨ Fonctionnalités implémentées

### 1. Design professionnel type "livret bailleur"
- Présentation claire et pédagogique
- Code couleur omniprésent (🟠🔴🔵⚪)
- Références juridiques (Décret n°87-712)
- Structure "Qui fait quoi / Qui paie quoi"

### 2. Navigation par pièces
- **4 pièces principales** avec illustrations emoji :
  - 🏠 Séjour (6 problèmes)
  - 🍳 Cuisine (6 problèmes)
  - 🚿 Salle de bain (5 problèmes)
  - 🌳 Extérieur (7 problèmes)

### 3. Fiches problèmes détaillées
Chaque problème contient :
- **Qui doit intervenir ?** (Locataire / Bailleur / Contrat / À vérifier)
- **Qui paie ?** (Locataire / Bailleur / Récupérable via charges)
- **Pourquoi ?** (Référence juridique)
- **Comment diagnostiquer ?** (Checklist étape par étape)
- **Solution** (Explication claire)

### 4. Exemples de problèmes couverts

#### Séjour
- Papier peint décollé
- Interrupteur en panne
- Volet ne ferme plus
- Sol abîmé
- Thermostat défaillant
- Détecteur de fumée (DAAF)

#### Cuisine
- Évier bouché
- Robinet qui fuit
- Serrure défectueuse
- Radiateur chauffe mal
- Radiateur électrique HS
- Interphone

#### Salle de bain
- Joints plus étanches
- Chasse d'eau qui coule
- Robinet qui fuit
- Grille de ventilation
- Cumulus / Chauffe-eau

#### Extérieur
- Cave sale
- Balcon évacuation bouchée
- Entretien pelouse/haies
- Garage
- Chaudière
- VMC
- Fosse septique

## 🎨 Design

### Codes couleur
- 🟠 **Orange** : Locataire (entretien courant)
- 🔴 **Rouge** : Bailleur (grosses réparations)
- 🔵 **Bleu** : Contrat d'entretien (charges récupérables)
- ⚪ **Gris** : À vérifier (contactez l'agence)

### Interface
- Mobile-first et responsive
- Animations fluides
- Cartes dépliables
- Modal détaillé pour chaque problème
- Barre de recherche toujours visible

## 📁 Structure des fichiers

```
app/
├── page.tsx                          # Page d'accueil
└── schema-logement/
    └── page.tsx                      # Schéma interactif

components/
└── schema/
    ├── PieceCard.tsx                 # Carte de pièce dépliable
    └── ProblemeDetail.tsx            # Modal détail problème
```

## 🚀 Utilisation

1. Lancer le serveur :
```bash
npm run dev
```

2. Accéder au schéma :
```
http://localhost:3000/schema-logement
```

3. Navigation :
   - Cliquer sur une pièce pour déplier
   - Cliquer sur un problème pour voir le détail
   - Utiliser la barre de recherche

## 📊 Données

### Total : 24 problèmes documentés
- Séjour : 6 problèmes
- Cuisine : 6 problèmes
- Salle de bain : 5 problèmes
- Extérieur : 7 problèmes

Chaque problème inclut :
- Nom du problème
- Responsable (locataire/bailleur/contrat)
- Qui paie
- Référence juridique
- Diagnostic (3-4 étapes)
- Solution détaillée

## 🎯 Prochaines étapes

### Phase 1 : Compléter la base de données
- [ ] Ajouter 226 problèmes supplémentaires (objectif : 250 total)
- [ ] Ajouter plus de pièces (chambre, WC séparés, etc.)
- [ ] Enrichir les diagnostics avec photos/vidéos

### Phase 2 : Fonctionnalités avancées
- [ ] Recherche intelligente avec IA
- [ ] Analyse d'images (upload photo du problème)
- [ ] Dictée vocale
- [ ] Création de tickets
- [ ] Historique des incidents

### Phase 3 : Personnalisation
- [ ] Marque blanche par bailleur
- [ ] Règles personnalisées
- [ ] Illustrations custom
- [ ] Contrats d'entretien spécifiques

## 📝 Notes importantes

### Basé sur la réglementation
- Décret n°87-712 du 26 août 1987 (réparations locatives)
- Loi n°89-462 du 6 juillet 1989 (article 7)
- Loi Morange 2010 (détecteurs de fumée)

### Pédagogie
- Langage simple et accessible
- Étapes claires et numérotées
- Références juridiques vulgarisées
- Conseils pratiques

### Accessibilité
- Contraste élevé
- Textes lisibles
- Navigation au clavier
- Compatible lecteurs d'écran

---

**Version** : 2.0  
**Date** : 2026-03-12  
**Projet** : Plateforme "QUI FAIT QUOI"
