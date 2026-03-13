# Page de paramètres

## Vue d'ensemble
Page de configuration de la plateforme avec différentes sections pour gérer les paramètres système.

## Route
`/dashboard/parametres`

## Sections

### 1. Notifications
- Switch pour activer/désactiver les notifications par email
- Switch pour activer/désactiver les notifications push
- Configuration des alertes en temps réel

### 2. Sécurité
- Configuration de la clé API Supabase
- URL Webhook pour les intégrations
- Gestion des accès et authentification

### 3. Apparence
- Sélection du thème (Clair/Sombre/Automatique)
- Sélection de la langue (Français/English)
- Personnalisation de l'interface

### 4. Base de données
- URL de connexion Supabase
- Mode debug (afficher les logs détaillés)
- Configuration de la connexion

### 5. Configuration Email
- Serveur SMTP
- Port SMTP
- Utilisateur SMTP
- Configuration de l'envoi d'emails

## Actions
- Bouton "Réinitialiser" : Restaurer les paramètres par défaut
- Bouton "Enregistrer" : Sauvegarder les modifications

## Composants UI utilisés
- Input (champs de texte)
- Select (listes déroulantes)
- Switch (interrupteurs)
- Button (actions)
- Label (étiquettes)
- Separator (séparateurs visuels)
- Textarea (champs multi-lignes)

## Icônes Lucide
- Settings : paramètres (icône principale)
- Bell : notifications
- Shield : sécurité
- Palette : apparence
- Globe : langue
- Database : base de données
- Key : clés API
- Mail : email
- Save : enregistrer
- RefreshCw : réinitialiser

## Palette de couleurs
- Gris : thème principal
- Bleu : notifications
- Vert : sécurité, enregistrer
- Violet : apparence
- Indigo : base de données
- Rouge : email

## Note
Cette page ne correspond pas à une table de la base de données. Les paramètres sont généralement stockés dans des variables d'environnement ou une table de configuration système.

## Prochaines étapes
- Connexion aux variables d'environnement
- Sauvegarde des paramètres
- Validation des champs
- Gestion des erreurs
- Confirmation avant réinitialisation
