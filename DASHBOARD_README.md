# Dashboard Qui fait quoi

## Vue d'ensemble

Le dashboard de Qui fait quoi a été configuré avec les mêmes bibliothèques et composants que le projet `bibliotheque-backup`.

## Structure du projet

```
perigord-habitat/
├── app/
│   ├── dashboard/              # Route du dashboard
│   │   ├── layout/            # Composants du layout
│   │   │   ├── header/        # Header avec navigation et profil
│   │   │   ├── sidebar/       # Sidebar avec menu
│   │   │   └── shared/        # Composants partagés (logo, etc.)
│   │   ├── layout.tsx         # Layout principal du dashboard
│   │   └── page.tsx           # Page d'accueil du dashboard
│   ├── css/                   # Fichiers CSS personnalisés
│   ├── globals.css            # Styles globaux
│   ├── layout.tsx             # Layout racine avec ThemeProvider
│   └── page.tsx               # Page d'accueil avec lien vers dashboard
├── components/
│   ├── ui/                    # Composants UI (shadcn/ui)
│   └── theme-provider.tsx     # Provider pour le thème dark/light
├── lib/
│   └── utils.ts               # Utilitaires (cn pour classes CSS)
└── public/
    └── images/                # Images et assets

```

## Bibliothèques installées

### UI Components
- `@radix-ui/*` - Composants UI accessibles
- `@iconify/react` - Icônes
- `@tabler/icons-react` - Icônes Tabler
- `lucide-react` - Icônes Lucide
- `tailwind-sidebar` - Composant sidebar

### Styling
- `tailwindcss` - Framework CSS
- `class-variance-authority` - Gestion des variantes de classes
- `clsx` & `tailwind-merge` - Utilitaires pour classes CSS
- `tw-animate-css` - Animations CSS

### Fonctionnalités
- `next-themes` - Gestion du thème dark/light
- `simplebar-react` - Scrollbar personnalisée
- `lodash` - Utilitaires JavaScript
- `date-fns` - Manipulation de dates
- `moment` - Manipulation de dates (legacy)

### Charts & Data Visualization
- `apexcharts` & `react-apexcharts` - Graphiques

### Forms & Inputs
- `react-day-picker` - Sélecteur de dates
- `input-otp` - Input pour codes OTP
- `embla-carousel-react` - Carrousel

### Autres
- `aos` - Animations on scroll
- `chance` - Génération de données aléatoires
- `sharp` - Optimisation d'images
- `swiper` - Slider/Carrousel
- `swr` - Data fetching
- `vaul` - Drawer component

## Accès au dashboard

- **Page d'accueil**: `http://localhost:3000/`
- **Dashboard**: `http://localhost:3000/admin/dashboard`

Un bouton "Dashboard" est disponible dans le header de la page d'accueil.

## Fonctionnalités du dashboard

### Header
- Barre de recherche
- Toggle dark/light mode
- Notifications
- Menu profil avec dropdown

### Sidebar
- Navigation avec icônes
- Menu hiérarchique avec sous-menus
- Responsive (mobile avec drawer)
- Support du thème dark/light

### Thème
- Mode clair/sombre automatique selon les préférences système
- Toggle manuel dans le header
- Persistance du choix utilisateur

## Développement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Lancer en production
npm start
```

## Personnalisation

### Modifier le menu sidebar
Éditez le fichier `app/admin/dashboard/layout/sidebar/Sidebaritems.ts`

### Modifier les couleurs
Les couleurs sont définies dans les fichiers CSS :
- `app/css/theme/default-colors.css` - Thème clair
- `app/css/theme/dark-colors.css` - Thème sombre

### Ajouter des pages
Créez de nouveaux fichiers dans `app/admin/dashboard/` et ajoutez les routes correspondantes dans le sidebar.

## Notes

- Le dashboard utilise Next.js 16 avec Turbopack
- Les composants UI sont basés sur shadcn/ui avec Radix UI
- Le système de thème utilise next-themes
- Les styles sont gérés avec Tailwind CSS v4
