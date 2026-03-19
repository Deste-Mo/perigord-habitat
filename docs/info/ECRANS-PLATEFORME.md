# Liste des écrans - Plateforme "QUI FAIT QUOI"

## 📋 Table des matières

- [Partie Locataire (Front-end public)](#-partie-locataire-front-end-public)
- [Partie Bailleur (Back-office admin)](#-partie-bailleur-back-office-admin)
- [Écrans techniques](#-écrans-techniques)
- [MVP - Écrans prioritaires](#-mvp---écrans-prioritaires)

---

## 🏠 PARTIE LOCATAIRE (Front-end public)

### 1. Page d'accueil / Landing
**Route**: `/`

**Éléments**:
- Présentation de la plateforme
- Barre de recherche principale (texte + vocal)
- Bouton "Décrire mon problème"
- Accès au schéma interactif
- Logo et couleurs du bailleur (marque blanche)
- Footer avec liens utiles

**Objectif**: Point d'entrée principal, orienter le locataire vers la solution

---

### 2. Authentification

#### 2.1 Connexion locataire
**Route**: `/login`
- Email + mot de passe
- Lien "Mot de passe oublié"
- Lien "Première connexion ? S'inscrire"

#### 2.2 Inscription
**Route**: `/register`
- Code d'accès (fourni par le bailleur)
- Email
- Mot de passe
- Nom, prénom
- Téléphone
- Confirmation email

#### 2.3 Mot de passe oublié
**Route**: `/forgot-password`
- Saisie email
- Envoi lien de réinitialisation

#### 2.4 Réinitialisation mot de passe
**Route**: `/reset-password`
- Nouveau mot de passe
- Confirmation

---

### 3. Schéma interactif du logement ⭐
**Route**: `/schema-logement`

**Éléments**:
- Vue d'ensemble du logement (illustration)
- Zoom tactile (pinch-to-zoom)
- Navigation par pièces :
  - 🏠 Séjour
  - 🍳 Cuisine
  - 🚿 Salle de bain
  - 🌳 Extérieur
- Clic sur une pièce → Liste des équipements
- Code couleur par responsabilité :
  - 🟠 Orange = Locataire
  - 🔴 Rouge = Bailleur
  - 🔵 Bleu = Contrat d'entretien
  - ⚪ Gris = À vérifier
- Barre de recherche toujours visible

**Objectif**: Navigation visuelle intuitive (ÉCRAN CENTRAL)

---

### 4. Décrire un problème (multi-modal)
**Route**: `/decrire-probleme`

**Méthodes d'entrée**:
- **Texte libre**: Zone de saisie "Mon robinet fuit"
- **Recherche par mot-clé**: Barre de recherche avec suggestions
- **Dictée vocale**: Bouton micro pour dicter
- **Upload photo**: Prendre/choisir une photo
- **Upload vidéo**: Enregistrer/choisir une vidéo

**Fonctionnalités**:
- Analyse IA en temps réel
- Loader pendant l'analyse
- Suggestions de pannes similaires
- Bouton "Analyser"

**Objectif**: Capturer le problème de manière flexible

---

### 5. Fiche problème / Résultat diagnostic
**Route**: `/probleme/:id`

**Sections**:

#### A) En-tête
- Titre du problème
- Code couleur de responsabilité
- Icône de la pièce/équipement

#### B) Qui doit intervenir ?
- Badge coloré (Locataire / Bailleur / Contrat / À vérifier)
- Explication courte

#### C) Qui paie ?
- Locataire
- Bailleur
- Bailleur puis récupérable via charges
- Option : "J'ai besoin d'aide pour trouver un prestataire"

#### D) Pourquoi ?
- Référence juridique simple
- Exemple : "Décret n°87-712 du 26 août 1987"

#### E) Comment diagnostiquer ?
- Checklist étape par étape
- Cases à cocher interactives

#### F) Auto-dépannage (si applicable)
- Étapes illustrées
- Vidéos tutoriels
- Conseils pratiques
- Avertissements de sécurité

#### G) Actions
- Bouton "Envoyer au bailleur" (créer un ticket)
- Bouton "Problème résolu"
- Bouton "Ce n'est pas mon problème"

**Objectif**: Réponse complète et actionnable

---

### 6. Cas particuliers (Bandeau "Ça dépend")
**Route**: `/cas-particulier/:code`

**Types de cas**:
- **Vétusté**: "Peut être à la charge du bailleur. Contactez votre agence."
- **Sinistre**: "Contactez votre assurance habitation et signalez au bailleur."
- **Vandalisme/Effraction**: "Déposez plainte puis contactez bailleur + assurance."
- **Mauvaise utilisation**: "En cas de dégradation, le locataire paie le remplacement au prix du neuf."
- **Parties communes**: "Contactez le gardien ou le bailleur."
- **Amiante** (logement avant 1999): "Ne pas percer/poncer/gratter. Contactez le bailleur."

**Éléments**:
- Bandeau d'alerte coloré
- Icône spécifique
- Consigne claire
- Coordonnées à contacter
- Bouton "Créer un ticket"

**Objectif**: Gérer les situations ambiguës

---

### 7. Création de ticket
**Route**: `/creer-ticket`

**Formulaire**:
- Problème identifié (pré-rempli)
- Description complémentaire (optionnel)
- Photos/vidéos (upload multiple)
- Pièce concernée
- Urgence (Basse / Normale / Haute / Urgente)
- Disponibilités pour intervention

**Récapitulatif**:
- Diagnostic IA
- Responsable identifié
- Médias ajoutés

**Confirmation**:
- Numéro de ticket
- Email de confirmation
- Délai de traitement estimé

**Objectif**: Formaliser la demande d'intervention

---

### 8. Mes incidents (Historique locataire)
**Route**: `/mes-incidents`

**Liste des incidents**:
- Carte par incident avec :
  - Numéro de ticket
  - Titre
  - Date de création
  - Statut (badge coloré)
  - Pièce/équipement
  - Miniature photo
- Filtres :
  - Statut (Tous / Nouveau / En cours / Résolu / Fermé)
  - Date (Plus récent / Plus ancien)
  - Pièce
- Recherche par mot-clé

**Détail d'un incident**:
- Toutes les informations
- Timeline des actions
- Photos/vidéos
- Réponses du bailleur
- Commentaires
- Bouton "Relancer"

**Objectif**: Suivi transparent des demandes

---

### 9. Mon profil locataire
**Route**: `/profil`

**Sections**:

#### A) Informations personnelles
- Nom, prénom
- Email
- Téléphone
- Bouton "Modifier"

#### B) Mon logement
- Adresse
- Référence logement
- Type (T1, T2, etc.)
- Agence de rattachement

#### C) Sécurité
- Modifier mot de passe
- Activer/Désactiver MFA

#### D) Notifications
- Préférences email
- Préférences SMS
- Préférences push (si app mobile)

#### E) Données personnelles (RGPD)
- Télécharger mes données
- Supprimer mon compte

**Objectif**: Gestion du compte locataire

---

### 10. FAQ / Aide
**Route**: `/faq` et `/aide`

**Sections FAQ**:
- Questions fréquentes par catégorie
- Recherche dans la FAQ
- Accordéon pour les réponses
- Liens vers articles détaillés

**Page Aide**:
- Guides d'utilisation
- Vidéos explicatives
- Tutoriels pas à pas
- Contact support
- Horaires d'ouverture agence

**Objectif**: Autonomie et support

---

## 👔 PARTIE BAILLEUR (Back-office admin)

### 11. Connexion admin bailleur
**Route**: `/admin/login`

**Éléments**:
- Email + mot de passe
- MFA (authentification à deux facteurs)
- Lien "Mot de passe oublié"
- Logo du bailleur

**Rôles**:
- Admin (tous les droits)
- Gestionnaire (gestion quotidienne)
- Lecteur (consultation uniquement)

---

### 12. Dashboard bailleur
**Route**: `/admin/admin/dashboard`

**KPIs (en haut)**:
- Nombre d'incidents total (ce mois)
- Incidents résolus sans technicien (%)
- Temps moyen de résolution (heures)
- Taux de satisfaction (si disponible)

**Graphiques**:
- Évolution des incidents (ligne)
- Répartition par pièce (camembert)
- Répartition par responsable (barres)
- Incidents par statut (donut)

**Widgets**:
- Incidents récents (5 derniers)
- Alertes urgentes
- Prestataires les plus sollicités
- Locataires actifs

**Actions rapides**:
- Créer un incident manuellement
- Voir tous les incidents
- Exporter les données

**Objectif**: Vue d'ensemble de l'activité

---

### 13. Gestion des incidents
**Route**: `/admin/incidents`

**Liste des tickets**:
- Tableau avec colonnes :
  - N° ticket
  - Locataire
  - Logement
  - Problème
  - Statut
  - Priorité
  - Date création
  - Actions
- Filtres :
  - Statut (Nouveau / En cours / Résolu / Fermé)
  - Priorité (Basse / Normale / Haute / Urgente)
  - Date (Aujourd'hui / Cette semaine / Ce mois / Personnalisé)
  - Locataire (recherche)
  - Logement (recherche)
  - Responsable (Locataire / Bailleur / Contrat)
- Recherche globale
- Tri par colonne
- Pagination
- Export CSV/Excel

**Détail d'un incident** (`/admin/incidents/:id`):
- En-tête avec statut et priorité
- Informations locataire (nom, contact, logement)
- Description du problème
- Photos/vidéos (galerie)
- Diagnostic IA
- Responsable identifié
- Timeline des actions
- Commentaires internes
- Actions :
  - Changer le statut
  - Modifier la priorité
  - Assigner à un prestataire
  - Ajouter un commentaire
  - Envoyer un message au locataire
  - Clôturer le ticket
  - Supprimer (admin uniquement)

**Objectif**: Gestion centralisée des demandes

---

### 14. Gestion des locataires
**Route**: `/admin/locataires`

**Liste**:
- Tableau avec :
  - Nom, prénom
  - Email
  - Téléphone
  - Logement
  - Nombre d'incidents
  - Statut (Actif / Inactif)
  - Actions
- Recherche
- Filtres (Actif / Inactif / Tous)
- Export

**Ajouter un locataire** (`/admin/locataires/nouveau`):
- Formulaire complet
- Génération code d'accès
- Envoi email de bienvenue

**Détail locataire** (`/admin/locataires/:id`):
- Informations complètes
- Historique des incidents
- Statistiques personnelles
- Modifier informations
- Désactiver le compte
- Réinitialiser mot de passe

---

### 15. Gestion des logements
**Route**: `/admin/logements`

**Liste**:
- Référence logement
- Adresse
- Type (T1, T2, etc.)
- Locataire actuel
- Agence
- Nombre d'incidents
- Actions

**Ajouter un logement** (`/admin/logements/nouveau`):
- Référence
- Adresse complète
- Type
- Agence de rattachement
- Équipements spécifiques

**Détail logement** (`/admin/logements/:id`):
- Informations complètes
- Historique complet des incidents
- Locataires successifs
- Équipements et contrats
- Modifier

---

### 16. Gestion des prestataires
**Route**: `/admin/prestataires`

**Liste**:
- Nom
- Type de service (Plomberie, Électricité, etc.)
- Téléphone
- Email
- Nombre d'interventions
- Statut (Actif / Inactif)

**Ajouter un prestataire** (`/admin/prestataires/nouveau`):
- Formulaire complet
- Types de services
- Coordonnées

**Détail prestataire** (`/admin/prestataires/:id`):
- Informations
- Statistiques (interventions, délais)
- Historique des interventions
- Modifier / Désactiver

---

### 17. Gestion des contrats d'entretien
**Route**: `/admin/contrats`

**Liste**:
- Référence contrat
- Prestataire
- Équipement(s) couvert(s)
- Logement(s) / Tous
- Date début / fin
- Statut (Actif / Expiré)

**Ajouter un contrat** (`/admin/contrats/nouveau`):
- Référence
- Prestataire
- Équipements couverts (multi-sélection)
- Logements concernés (tous ou spécifiques)
- Dates
- Documents (upload PDF)

**Détail contrat** (`/admin/contrats/:id`):
- Informations complètes
- Liste des équipements
- Historique des interventions
- Documents
- Modifier / Renouveler

---

### 18. Personnalisation (Marque blanche)
**Route**: `/admin/personnalisation`

**Sections**:

#### A) Identité visuelle
- Upload logo (PNG, SVG)
- Couleur primaire (color picker)
- Couleur secondaire
- Aperçu en temps réel

#### B) Domaine personnalisé
- Sous-domaine : `monbailleur.quifaitquoi.fr`
- Domaine personnalisé : `quifaitquoi.monbailleur.fr`
- Configuration DNS

#### C) Coordonnées
- Nom du bailleur
- Adresse siège social
- Téléphone principal
- Email contact
- Site web

#### D) Textes personnalisés
- Message d'accueil
- Mentions légales
- CGU spécifiques

**Objectif**: Adapter la plateforme à l'identité du bailleur

---

### 19. Règles personnalisées
**Route**: `/admin/regles`

**Liste des pannes**:
- Recherche par équipement/pièce
- Tableau avec :
  - Panne
  - Responsable par défaut
  - Responsable personnalisé
  - Qui paie
  - Statut (Défaut / Personnalisé)

**Modifier une règle** (`/admin/regles/:panneId`):
- Responsable (override) :
  - Locataire
  - Bailleur
  - Contrat
  - À vérifier
- Qui paie (override)
- Instructions spécifiques (texte libre)
- Bouton "Réinitialiser aux règles par défaut"

**Objectif**: Adapter les règles aux spécificités du bailleur

---

### 20. Codes d'accès
**Route**: `/admin/codes-acces`

**Liste**:
- Code
- Description
- Nombre d'utilisations
- Date création
- Date expiration
- Statut (Actif / Expiré / Désactivé)

**Générer un code** (`/admin/codes-acces/generer`):
- Code automatique ou personnalisé
- Description (ex: "Résidence Les Jardins")
- Date d'expiration (optionnel)
- Nombre d'utilisations max (optionnel)

**Actions**:
- Copier le code
- Désactiver
- Supprimer
- Voir les locataires associés

---

### 21. Gestion des agences
**Route**: `/admin/agences`

**Liste**:
- Nom agence
- Adresse
- Téléphone
- Email
- Nombre de logements
- Statut

**Ajouter une agence** (`/admin/agences/nouvelle`):
- Nom
- Adresse complète
- Coordonnées
- Horaires d'ouverture
- Responsable

**Détail agence** (`/admin/agences/:id`):
- Informations
- Logements rattachés
- Statistiques
- Modifier

---

### 22. Utilisateurs admin
**Route**: `/admin/utilisateurs`

**Liste**:
- Nom, prénom
- Email
- Rôle (Admin / Gestionnaire / Lecteur)
- Dernière connexion
- Statut (Actif / Inactif)

**Ajouter un admin** (`/admin/utilisateurs/nouveau`):
- Informations personnelles
- Email (identifiant)
- Rôle
- Envoi email d'invitation

**Détail admin** (`/admin/utilisateurs/:id`):
- Informations
- Historique des actions (logs)
- Modifier rôle
- Activer/Désactiver
- Réinitialiser MFA

**Permissions par rôle**:
- **Admin**: Tous les droits + gestion utilisateurs
- **Gestionnaire**: Gestion incidents, locataires, logements
- **Lecteur**: Consultation uniquement

---

### 23. Statistiques avancées
**Route**: `/admin/statistiques`

**Filtres**:
- Période (Aujourd'hui / Semaine / Mois / Année / Personnalisé)
- Agence
- Type de problème
- Responsable

**Métriques**:
- Total incidents
- Taux de résolution sans technicien (objectif 40-60%)
- Temps moyen de résolution
- Répartition par pièce
- Répartition par responsable
- Top 10 des pannes
- Évolution dans le temps
- Satisfaction locataires

**Graphiques**:
- Courbes d'évolution
- Camemberts
- Barres comparatives
- Heatmap par jour/heure

**Export**:
- PDF (rapport)
- Excel
- CSV
- Envoi par email

**Objectif**: Pilotage et amélioration continue

---

### 24. FAQ / Blog (SEO)
**Route**: `/admin/contenu`

**Gestion FAQ**:
- Liste des questions/réponses
- Ajouter une question
- Modifier
- Catégories
- Ordre d'affichage
- Activer/Désactiver

**Gestion Blog**:
- Liste des articles
- Créer un article (éditeur riche)
- Titre, slug, contenu
- Image de couverture
- Catégories, tags
- Statut (Brouillon / Publié)
- Date de publication
- Prévisualisation

**Objectif**: Contenu SEO et aide locataires

---

## 🔧 ÉCRANS TECHNIQUES

### 25. Widget intégrable
**Route**: `/admin/widget`

**Configuration**:
- Taille du widget (Petit / Moyen / Grand)
- Position (Coin bas droit / Coin bas gauche / Centré)
- Couleurs personnalisées
- Texte du bouton

**Code d'intégration**:
```html
<script src="https://module.quifaitquoi.com/widget.js" 
        data-bailleur="ID-BAILLEUR">
</script>
```

**Aperçu en temps réel**

---

### 26. API Documentation
**Route**: `/admin/api`

**Sections**:
- Clés API (générer, révoquer)
- Documentation des endpoints
- Exemples de requêtes (curl, JavaScript, Python)
- Webhooks (configuration)
- Limites de taux
- Logs des appels API

**Endpoints disponibles**:
- GET /api/incidents
- POST /api/incidents
- GET /api/locataires
- POST /api/locataires
- etc.

---

### 27. Notifications
**Route**: `/admin/notifications`

**Configuration**:
- Activer/Désactiver email
- Activer/Désactiver SMS
- Fournisseur email (Resend, SendGrid, etc.)
- Fournisseur SMS (Twilio, etc.)

**Templates**:
- Email de bienvenue
- Confirmation incident
- Incident résolu
- Relance
- Personnalisation des templates

**Historique**:
- Liste des notifications envoyées
- Statut (Envoyé / Échec)
- Taux d'ouverture (email)

---

## 📱 EXIGENCES RESPONSIVE / MOBILE

Tous les écrans doivent respecter :

### Design
- ✅ Mobile-first (conception prioritaire smartphone)
- ✅ Tactile (zoom pinch, swipe, tap)
- ✅ Navigation intuitive
- ✅ Boutons suffisamment grands (min 44x44px)

### Performance
- ✅ Recherche < 1 seconde
- ✅ Analyse IA < 5 secondes
- ✅ Chargement page < 3 secondes

### Accessibilité
- ✅ RGAA niveau AA
- ✅ Contraste suffisant
- ✅ Navigation au clavier
- ✅ Lecteurs d'écran compatibles
- ✅ Textes alternatifs sur images

### Compatibilité
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Desktop (Chrome, Firefox, Safari, Edge)

---

## 🎯 MVP - ÉCRANS PRIORITAIRES

Pour un lancement rapide (MVP), voici les écrans essentiels :

### Phase 1 : Locataire (6 écrans minimum)

| Priorité | Écran | Route | Complexité |
|----------|-------|-------|------------|
| 🔴 P0 | Accueil + Recherche | `/` | Moyenne |
| 🔴 P0 | Schéma interactif | `/schema-logement` | Haute |
| 🔴 P0 | Fiche problème | `/probleme/:id` | Moyenne |
| 🔴 P0 | Connexion/Inscription | `/login`, `/register` | Basse |
| 🟡 P1 | Création ticket | `/creer-ticket` | Moyenne |
| 🟡 P1 | Mes incidents | `/mes-incidents` | Moyenne |

**Total MVP Locataire : 6 écrans**

---

### Phase 2 : Bailleur (5 écrans minimum)

| Priorité | Écran | Route | Complexité |
|----------|-------|-------|------------|
| 🔴 P0 | Connexion admin | `/admin/login` | Basse |
| 🔴 P0 | Dashboard | `/admin/admin/dashboard` | Haute |
| 🔴 P0 | Liste incidents | `/admin/incidents` | Moyenne |
| 🔴 P0 | Détail incident | `/admin/incidents/:id` | Moyenne |
| 🟡 P1 | Personnalisation | `/admin/personnalisation` | Moyenne |

**Total MVP Bailleur : 5 écrans**

---

### Phase 3 : Fonctionnalités avancées (optionnel)

| Priorité | Écran | Complexité |
|----------|-------|------------|
| 🟢 P2 | Gestion locataires | Basse |
| 🟢 P2 | Gestion logements | Basse |
| 🟢 P2 | Mon profil locataire | Basse |
| 🟢 P2 | FAQ / Aide | Basse |
| 🟢 P3 | Gestion prestataires | Moyenne |
| 🟢 P3 | Gestion contrats | Moyenne |
| 🟢 P3 | Codes d'accès | Basse |
| 🟢 P3 | Statistiques avancées | Haute |
| 🟢 P3 | Règles personnalisées | Moyenne |
| 🟢 P3 | Widget intégrable | Haute |
| 🟢 P3 | API Documentation | Moyenne |

---

## 📊 RÉCAPITULATIF

### Nombre total d'écrans

| Catégorie | Nombre d'écrans |
|-----------|-----------------|
| Locataire (public) | 10 écrans principaux |
| Bailleur (admin) | 14 écrans principaux |
| Technique | 3 écrans |
| **TOTAL** | **27 écrans** |

### Répartition par complexité

| Complexité | Nombre | Écrans |
|------------|--------|--------|
| 🟢 Basse | 10 | Connexion, Inscription, Profil, FAQ, etc. |
| 🟡 Moyenne | 12 | Fiche problème, Incidents, Dashboard, etc. |
| 🔴 Haute | 5 | Schéma interactif, Statistiques, Widget, etc. |

### Estimation de développement (MVP)

| Phase | Écrans | Durée estimée |
|-------|--------|---------------|
| Phase 1 (Locataire) | 6 écrans | 3-4 semaines |
| Phase 2 (Bailleur) | 5 écrans | 2-3 semaines |
| **Total MVP** | **11 écrans** | **5-7 semaines** |

---

## 🚀 ORDRE DE DÉVELOPPEMENT RECOMMANDÉ

### Sprint 1 (Semaine 1-2)
1. Setup projet + Supabase
2. Authentification (login/register)
3. Page d'accueil
4. Base de données pannes (250 pannes minimum)

### Sprint 2 (Semaine 3-4)
5. Schéma interactif du logement ⭐
6. Fiche problème avec diagnostic
7. Recherche et filtres

### Sprint 3 (Semaine 5-6)
8. Création de tickets
9. Mes incidents (historique)
10. Dashboard admin bailleur

### Sprint 4 (Semaine 7-8)
11. Gestion incidents admin
12. Personnalisation marque blanche
13. Tests et optimisations

---

## 📝 NOTES IMPORTANTES

### Schéma interactif (écran central)
- C'est l'écran le plus complexe et le plus attendu
- Nécessite des illustrations de qualité
- Navigation tactile fluide obligatoire
- Code couleur omniprésent

### IA Multimodale
- Analyse texte, vocal, photo, vidéo
- Temps de réponse < 5 secondes
- Suggestions intelligentes
- Amélioration continue via historique

### Marque blanche
- Chaque bailleur a son identité visuelle
- Logo, couleurs, domaine personnalisé
- Règles personnalisables
- Widget intégrable

### RGPD
- Export des données
- Suppression de compte
- Logs d'activité
- Consentement explicite

---

## ✅ CHECKLIST AVANT DÉVELOPPEMENT

- [ ] Maquettes UI/UX validées
- [ ] Base de données créée (Supabase)
- [ ] 250 pannes documentées
- [ ] Illustrations du schéma interactif
- [ ] API IA choisie (OpenAI, Anthropic, etc.)
- [ ] Service email configuré
- [ ] Service SMS configuré (optionnel)
- [ ] Hébergement choisi (Vercel, Netlify, etc.)
- [ ] Nom de domaine réservé

---

**Document créé le** : 2026-03-12  
**Version** : 1.0  
**Projet** : Plateforme "QUI FAIT QUOI"
