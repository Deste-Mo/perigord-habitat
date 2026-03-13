# Migration vers Font Awesome

## ✅ Installation complète

```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

## 🎨 Icônes utilisées

### Pièces principales
- 🏠 Séjour : `faHouseChimney`
- 🍳 Cuisine : `faKitchenSet` (ou `faBowlFood`)
- 🚿 Salle de bain : `faBath`
- 🌳 Extérieur : `faTree`

### Problèmes Séjour
- Papier peint : `faPaintRoller`
- Prises électriques : `faPlug`
- Volets : `faWindowMaximize`
- Sol : `faSquare`
- Thermostat : `faTemperatureHalf`
- Détecteur fumée : `faFire`

### Problèmes Cuisine
- Évier : `faSink`
- Robinet : `faDroplet`
- Serrure : `faKey`
- Radiateur : `faRadiation`
- Interphone : `faPhone`

### Problèmes Salle de bain
- Joints : `faScrewdriverWrench`
- WC : `faToilet`
- Douche : `faShower`
- Ventilation : `faWind`
- Chauffe-eau : `faFireBurner`

### Problèmes Extérieur
- Cave : `faDoorClosed`
- Balcon : `faHouseChimney`
- Jardin : `faSeedling`
- Garage : `faCar`
- Chaudière : `faFireBurner`
- VMC : `faWind`
- Fosse : `faWater`

## ⚠️ Icônes manquantes dans Font Awesome Solid

Certaines icônes n'existent pas, voici les alternatives :
- `faUtensils` → Utiliser `faKitchenSet` ou `faBowlFood`
- Si une icône n'existe pas, utiliser une icône générique proche

## 📝 Utilisation

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@/lib/fontawesome'

<FontAwesomeIcon icon={faHome} className="text-2xl" />
```

## 🔧 Configuration

Le fichier `lib/fontawesome.ts` contient toutes les icônes importées et exportées.
Le fichier `app/layout.tsx` initialise Font Awesome globalement.

---

**Status** : En cours de migration
**Prochaine étape** : Vérifier toutes les icônes et remplacer celles qui n'existent pas
