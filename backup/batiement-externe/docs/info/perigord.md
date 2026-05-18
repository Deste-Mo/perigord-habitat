# Cahier des charges -- Plateforme "Qui fait quoi ?"

## Synthese de la demande client

---

## 1. Objectif principal

Creer une **plateforme web mobile-first** appelee **"Qui fait quoi ?"** destinee a **tous les bailleurs sociaux de France**.

L'outil permet aux **locataires** de comprendre rapidement, en cas de panne ou desordre dans leur logement :

- **Qui doit intervenir ?** (Locataire / Bailleur / Sous contrat d'entretien / A verifier)
- **Qui paie ?** (Locataire / Bailleur / Bailleur puis recuperable via charges)
- **Pourquoi ?** (Reference legale simple)
- **Comment diagnostiquer ou depanner ?** (Aide IA, video, conseils)

### Base legale

- **Loi n89-462 du 6 juillet 1989** -- article 7, paragraphes c) et d)
- **Decret n87-712 du 26 aout 1987** -- reparations locatives
- Principe des bailleurs sociaux : entretien courant = locataire, gros travaux/vetuste = bailleur, certains equipements = contrat d'entretien

---

## 2. Parcours utilisateur (locataire)

### Etape 1 -- Decrire son probleme

Le locataire dispose de **plusieurs moyens d'entree** :

| Methode | Description |
|---------|-------------|
| Texte libre | Saisir une description (ex: "robinet qui fuit") |
| Recherche par mot-cle | Barre de recherche toujours accessible |
| Dictee vocale | Dicter son probleme a voix haute |
| Photo | Envoyer une photo pour aider au diagnostic |
| Video | Envoyer une video du probleme |

L'**IA multimodale** analyse l'ensemble pour qualifier precisement le probleme.

### Etape 2 -- Naviguer dans le schema interactif du logement

**C'est l'element central et le plus attendu par le client.**

Un **grand visuel interactif** represente un logement type (inspire du livret PDF de Perigord Habitat). L'utilisateur peut :

- **Zoomer avec les doigts** (pinch-to-zoom, comme Google Maps)
- **Cliquer sur une piece** (cuisine, sejour, salle de bains, exterieur...)
- **Cliquer sur un equipement** dans la piece
- **Voir la fiche probleme** correspondante

### Etape 3 -- Obtenir la reponse claire

Pour chaque probleme identifie, le site affiche une **fiche reponse** avec :

#### A) Qui doit intervenir ? (code couleur)

| Couleur | Responsable | Signification |
|---------|-------------|---------------|
| Jaune/Orange | **Locataire** | Reparation locative a sa charge |
| Rouge/Rose | **Bailleur** | Reparation non locative, a la charge du bailleur |
| Bleu | **Contrat d'entretien** | Equipement couvert par un contrat (charges mensuelles) |
| Gris / Bandeau "Ca depend" | **A verifier** | Cas particuliers (voir section 4) |

#### B) Qui paie ?

- **Locataire** -- avec option : "J'ai besoin d'aide pour trouver le meilleur rapport qualite/prix"
- **Bailleur** -- le locataire signale, le bailleur gere
- **Bailleur puis recuperable via charges** -- si applicable

#### C) Pourquoi ? (reference legale courte)

> Exemple : "Decret n87-712 du 26 aout 1987 : l'entretien courant des joints est a la charge du locataire."

#### D) Comment diagnostiquer ou depanner ?

- Conseils etape par etape
- Petites reparations faisables soi-meme
- Aide au diagnostic par IA (analyse photo/video)
- Liens vers tutoriels video

---

## 3. Contenu par piece (extrait du PDF Perigord Habitat)

### Sejour

| Probleme | Charge | Details |
|----------|--------|---------|
| Papier peint dechire/crayonne | **Locataire** | Remplacement et entretien des murs et sols |
| Interrupteur/prise en panne | **Locataire** | Couper le courant, verifier fusibles, remplacer si besoin |
| Volet ne ferme plus | **Locataire** | Petites reparations : manivelle, sangle, treuil, vitre, mastic |
| Detecteur de fumee (DAAF) | **Contrat d'entretien** | Entretien et remplacement pile = bailleur via contrat |
| Sol abime | **Locataire** | Entretien, petites reparations, vitrification parquet |
| Thermostat/interrupteur | **Locataire** | Nettoyage et reparation |

### Cuisine

| Probleme | Charge | Details |
|----------|--------|---------|
| Evier bouche | **Locataire** | Degorgement des appareils sanitaires |
| Serrure fonctionne mal | **Locataire** | Reparation + remplacement cles perdues/cassees |
| Radiateur chauffe mal | **Contrat d'entretien** | Contacter le titulaire du contrat ; purge, vanne bloquee |
| Radiateur electrique HS | **Bailleur** | Remplacement du convecteur = bailleur |
| Refixation radiateur | **Locataire** | Refixation = locataire |
| Flexible gaz perime | **Locataire** | Verification date de validite et remplacement |
| Interphone/sonnette | **Locataire** | Entretien a charge du locataire |
| Robinet machine a laver | **Locataire** | Entretien a charge du locataire |

### Salle de bains

| Probleme | Charge | Details |
|----------|--------|---------|
| Joint plus etanche | **Locataire** | Changement joints sanitaires et menuiseries (verifier contrat) |
| Chasse d'eau coule | **Locataire** | Fermer robinet d'arret, changer le joint, ecrous avec joints |
| Robinet fuit | **Locataire** | En general a sa charge ; ne pas attendre (note d'eau) |
| Grille ventilation | **Locataire** | Nettoyage (ne pas boucher), remplacement si cassee |
| Cumulus / chauffe-eau | **Contrat d'entretien** | Couvert par contrat d'entretien bailleur |

### Exterieur

| Probleme | Charge | Details |
|----------|--------|---------|
| Cave sale | **Locataire** | Entretien de tous les locaux loues |
| Balcon evacuation bouchee | **Locataire** | Debouchage a sa charge |
| Entretien pelouse/haies | **Locataire** | Tonte et taille a sa charge |
| Entretien porte d'entree | **Locataire** | Entretien courant |
| Entretien volets exterieurs | **Locataire** | Petites reparations |
| Garage (poignee, serrure) | **Locataire** | Entretien courant |
| Insert cheminee | **Contrat d'entretien** | Sous contrat d'entretien |
| Ramonage | **Contrat d'entretien** | Sous contrat d'entretien |
| Chaudiere | **Contrat d'entretien** | Sous contrat d'entretien |
| VMC | **Contrat d'entretien** | Sous contrat d'entretien |
| Fosse septique | **Contrat d'entretien** | Sous contrat d'entretien |

### Equipements sous contrat d'entretien (payes dans les charges)

- Chaudieres
- Cumulus / chauffe-bains gaz
- VMC (Ventilation Mecanique Controlee)
- Ascenseurs
- Fosses septiques
- Inserts cheminees
- Detecteurs de fumee (DAAF)

---

## 4. Cas particuliers -- Bandeau "Ca depend"

Quand la responsabilite n'est **pas tranchee automatiquement**, le site affiche un bandeau special avec une consigne :

| Situation | Consigne affichee |
|-----------|-------------------|
| **Vetuste** | "La vetuste peut etre a la charge du bailleur. Contactez votre agence." |
| **Sinistre** (degas des eaux, incendie...) | "Contactez votre assurance habitation et signalez au bailleur." |
| **Effraction / vandalisme** | "Deposez plainte puis contactez bailleur + assurance." |
| **Mauvaise utilisation / degradation** | "En cas de degradation, le locataire paie le remplacement au prix du neuf." |
| **Parties communes** | "Contactez le gardien ou le bailleur." |
| **Logement avant 1999 (amiante)** | "Precautions particulieres. Ne pas percer/poncer/gratter. Contactez le bailleur." |

---

## 5. Schema interactif -- Specification detaillee

### Ce que le client attend

Un **visuel central cliquable**, pense d'abord pour le telephone, inspire des illustrations du livret PDF :

```
+--------------------------------------------------+
|                LOGEMENT INTERACTIF                |
|                                                   |
|   +----------+  +----------+  +----------+       |
|   |  SEJOUR  |  | CUISINE  |  |  SDB     |       |
|   |          |  |          |  |          |       |
|   | - volets |  | - evier  |  | - joints |       |
|   | - prises |  | - gaz    |  | - WC     |       |
|   | - sols   |  | - serrure|  | - robinet|       |
|   +----------+  +----------+  +----------+       |
|                                                   |
|   +----------+  +---------------------------+    |
|   | EXTERIEUR|  |  EQUIPEMENTS SOUS CONTRAT |    |
|   | - jardin |  |  - chaudiere              |    |
|   | - garage |  |  - VMC                    |    |
|   | - balcon |  |  - cumulus                |    |
|   +----------+  +---------------------------+    |
+--------------------------------------------------+
```

### Comportement attendu

1. L'utilisateur voit le schema du logement (illustration de qualite)
2. Il **zoome avec les doigts** (pinch-to-zoom sur mobile)
3. Il **clique sur une piece** -> la piece se deplie
4. Il voit les **equipements cliquables** avec leur code couleur
5. Il **clique sur un equipement/probleme** -> la fiche s'ouvre
6. La fiche affiche : qui intervient, qui paie, pourquoi, comment reparer

### Exigences qualite

- Design **propre, professionnel, impeccable** (exigence forte du client)
- Illustrations de qualite (style similaire au PDF Perigord Habitat)
- Navigation **fluide et intuitive** sur telephone
- Barre de recherche **toujours visible** en haut

---

## 6. Modele SaaS -- Marque blanche pour les bailleurs

### Principe

La plateforme est un **socle general mutualise** (regles du decret 1987) que l'on **duplique et personnalise** pour chaque bailleur abonne.

### Ce que chaque bailleur peut personnaliser

| Element | Personnalisation |
|---------|-----------------|
| Logo | Logo du bailleur |
| Couleurs | Charte graphique du bailleur |
| Prestataires | Liste des entreprises partenaires |
| Contrats d'entretien | Equipements couverts specifiques |
| Regles specifiques | Scripts et procedures internes |
| Code d'acces | Code fourni aux locataires pour acceder a l'outil |
| Agence a contacter | Coordonnees de l'agence locale |

### Fonctionnement

1. Le client (vous) vend un **abonnement** a un bailleur
2. L'outil est **duplique** pour ce bailleur
3. Le bailleur personnalise son espace
4. Les locataires accedent via un **code** fourni par leur bailleur
5. Le **socle legal** (decret 1987) reste commun a tous

---

## 7. Exigences techniques

| Exigence | Detail |
|----------|--------|
| Mobile-first | Conception prioritaire pour smartphone |
| Tactile | Zoom, scroll, tap sur les elements |
| Barre de recherche | Toujours accessible, avec saisie texte + vocal |
| IA multimodale | Analyse texte, photo, video, vocal pour qualifier le probleme |
| Code couleur | 3 couleurs distinctes pour identifier la responsabilite |
| Qualite visuelle | Propre, professionnel, digne du service public |
| Performance | Chargement rapide, navigation fluide |
| Duplicable | Architecture permettant la duplication par bailleur |

---


## 8. Resume en une phrase

> **Une plateforme SaaS mobile-first avec schema interactif du logement, diagnostic IA et code couleur, qui permet aux locataires de savoir instantanement qui doit reparer et payer, basee sur le decret 1987, personnalisable en marque blanche pour chaque bailleur social de France.**

---
