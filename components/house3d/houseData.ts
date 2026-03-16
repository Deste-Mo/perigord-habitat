export interface Equipment {
  id: string
  name: string
  description: string
  consumption: string
  tips: string
  position: [number, number, number]
  size: [number, number, number]
  color: string
  type?: 'box' | 'sofa' | 'table' | 'bed' | 'lamp' | 'tv' | 'fridge' | 'sink' | 'stove' | 'shower' | 'washer' | 'chair' | 'desk' | 'cabinet' | 'shelf' | 'plant' | 'rug' | 'radiator' | 'mirror' | 'curtain' | 'picture' | 'toilet'
}

export interface Room {
  id: string
  name: string
  position: [number, number, number]
  size: [number, number, number]
  floorColor: string
  equipment: Equipment[]
}

const WALL_H = 2.8

export const PALETTE = {
  wall: '#a7c3d9',
  wallInner: '#a7c3d9',
  floor: '#edeae4',
  floorAlt: '#e5dfd6',
  accent: '#4a7d9e',
  outline: '#2e4a62',
  furniture: '#92b0c5',
  furnitureDark: '#5f839e',
  furnitureLight: '#dae3ed',
  wood: '#9eb3c4',
  woodDark: '#7a96ab',
  fabric: '#4a7d9e',
  white: '#f0eff0',
  background: '#bfcfdf',
  metal: '#7a99b0',
  glass: '#b8d0e0',
  green: '#6d9680',
  red: '#a06060',
  cream: '#d8d0c4',
  grass: '#8aad8a',
  grassDark: '#6d9670',
}

// =============================================
// SÉJOUR - pos [0,0,0], size [6, 2.8, 6]
// local x: 0→6, local z: 0→-6
// =============================================
const sejourEquipment: Equipment[] = [
  // --- Mobilier principal ---
  {
    id: 'tapis-sejour', name: 'Tapis de salon', type: 'rug',
    description: 'Grand tapis rectangulaire en laine.',
    consumption: 'N/A', tips: 'Un tapis isole le sol et réduit les besoins de chauffage de 10%.',
    position: [3, 0, -3], size: [3.5, 0.02, 2.8], color: '#a7c3d9',
  },
  {
    id: 'canape', name: 'Canapé', type: 'sofa',
    description: 'Canapé 3 places en tissu, confortable et résistant.',
    consumption: 'N/A', tips: 'Choisissez des matériaux durables, recyclables et déhoussables.',
    position: [3, 0, -1.5], size: [2.8, 0.7, 1], color: '#4a7d9e',
  },
  {
    id: 'table-basse', name: 'Table basse', type: 'table',
    description: 'Table basse en bois massif avec plateau verre.',
    consumption: 'N/A', tips: 'Privilégiez le bois certifié FSC pour un mobilier éco-responsable.',
    position: [3, 0, -3], size: [1.4, 0.35, 0.7], color: PALETTE.wood,
  },
  {
    id: 'tv', name: 'Télévision', type: 'tv',
    description: 'Écran plat OLED 55 pouces sur meuble TV.',
    consumption: '80-150 kWh/an', tips: 'Éteignez complètement au lieu du mode veille (-10% sur la facture).',
    position: [3, 0, -5.3], size: [1.6, 0.65, 0.1], color: '#2b4560',
  },
  {
    id: 'lampe-sejour', name: 'Lampadaire', type: 'lamp',
    description: 'Lampadaire LED avec abat-jour en tissu.',
    consumption: '10-30 kWh/an', tips: 'Ampoules LED = 80% moins de consommation qu\'une ampoule classique.',
    position: [0.6, 0, -5], size: [0.3, 1.6, 0.3], color: PALETTE.furnitureLight,
  },
  {
    id: 'fauteuil', name: 'Fauteuil', type: 'chair',
    description: 'Fauteuil de lecture confortable.',
    consumption: 'N/A', tips: 'Un bon fauteuil dure 15-20 ans. Investissez dans la qualité.',
    position: [5.2, 0, -2.5], size: [0.8, 0.8, 0.8], color: '#7a9bb5',
  },
  {
    id: 'bibliotheque', name: 'Bibliothèque', type: 'shelf',
    description: 'Étagère murale en bois, 5 niveaux de rangement.',
    consumption: 'N/A', tips: 'Les livres isolent phoniquement. Une bibliothèque contre un mur mitoyen réduit le bruit.',
    position: [5.5, 0, -5], size: [0.35, 2, 1.5], color: PALETTE.wood,
  },
  {
    id: 'plante-sejour', name: 'Plante verte', type: 'plant',
    description: 'Ficus d\'intérieur en pot décoratif.',
    consumption: 'N/A', tips: 'Les plantes vertes améliorent la qualité de l\'air et absorbent le CO2.',
    position: [5.3, 0, -0.5], size: [0.45, 1.2, 0.45], color: PALETTE.green,
  },
  {
    id: 'rideau-sejour', name: 'Rideaux', type: 'curtain',
    description: 'Rideaux occultants thermiques.',
    consumption: 'N/A', tips: 'Les rideaux thermiques réduisent les pertes de chaleur de 25% en hiver.',
    position: [3, 1.4, -0.05], size: [2, 2.6, 0.06], color: '#a7c3d9',
  },

  // --- Équipements schema-logement ---
  {
    id: 'papier-peint', name: 'Papier peint décollé ou crayonné', type: 'picture',
    description: 'Revêtement mural : papier peint, peinture, crépi.',
    consumption: 'N/A', tips: 'Entretien des revêtements muraux à la charge du locataire (Décret n°87-712).',
    position: [0.05, 1.2, -1.5], size: [0.04, 0.5, 0.7], color: PALETTE.cream,
  },
  {
    id: 'prise-electrique', name: 'Interrupteur / Prise électrique', type: 'box',
    description: 'Prises et interrupteurs muraux du séjour.',
    consumption: 'N/A', tips: 'Remplacement des interrupteurs et prises défectueux à votre charge (Décret n°87-712).',
    position: [5.95, 0.35, -3.5], size: [0.06, 0.1, 0.06], color: PALETTE.furnitureLight,
  },
  {
    id: 'volet', name: 'Volet', type: 'curtain',
    description: 'Volet roulant ou battant, manivelle et sangle.',
    consumption: 'N/A', tips: 'Réparation manivelle, sangle, treuil à votre charge. Remplacement complet = bailleur.',
    position: [0.8, 1.4, -0.05], size: [1.2, 2.6, 0.06], color: PALETTE.furniture,
  },
  {
    id: 'sol-parquet', name: 'Sol (parquet / carrelage)', type: 'rug',
    description: 'Revêtement de sol : parquet, carrelage, lino.',
    consumption: 'N/A', tips: 'Entretien courant et petites réparations à votre charge. Vitrification parquet incluse.',
    position: [1.2, 0, -4], size: [1.5, 0.01, 1], color: PALETTE.floorAlt,
  },
  {
    id: 'thermostat', name: 'Thermostat', type: 'box',
    description: 'Thermostat mural programmable pour le chauffage.',
    consumption: 'N/A', tips: 'Nettoyage et remplacement des piles à votre charge (Décret n°87-712).',
    position: [0.05, 1.4, -5.5], size: [0.06, 0.1, 0.08], color: PALETTE.furnitureLight,
  },
  {
    id: 'daaf', name: 'Détecteur de fumée (DAAF)', type: 'box',
    description: 'Détecteur avertisseur autonome de fumée au plafond.',
    consumption: 'N/A', tips: 'Entretien et remplacement pile = bailleur via contrat (Loi Morange 2010).',
    position: [3, 2.7, -3], size: [0.12, 0.04, 0.12], color: PALETTE.white,
  },
  {
    id: 'radiateur-sejour', name: 'Radiateur', type: 'radiator',
    description: 'Radiateur électrique à inertie 1500W.',
    consumption: '800-1500 kWh/an', tips: 'Réglez à 19°C. Chaque degré supplémentaire = +7% sur la facture.',
    position: [0.15, 0.3, -3], size: [0.1, 0.6, 1], color: PALETTE.furnitureLight,
  },
  {
    id: 'tableau-sejour', name: 'Tableau décoratif', type: 'picture',
    description: 'Cadre décoratif accroché au mur.',
    consumption: 'N/A', tips: 'Un intérieur agréable contribue au bien-être.',
    position: [0.05, 1.7, -4.2], size: [0.04, 0.5, 0.7], color: PALETTE.cream,
  },
]

// =============================================
// CUISINE - pos [6.2,0,0], size [5, 2.8, 6]
// world x: 6.2→11.2, world z: 0→-6
// =============================================
const cuisineEquipment: Equipment[] = [
  // --- Mobilier principal ---
  {
    id: 'refrigerateur', name: 'Réfrigérateur', type: 'fridge',
    description: 'Réfrigérateur combiné congélateur, classe A+++.',
    consumption: '200-400 kWh/an', tips: 'Réglez entre 3°C et 5°C. Ne placez jamais près d\'une source de chaleur.',
    position: [6.7, 0, -0.5], size: [0.7, 1.8, 0.7], color: PALETTE.furnitureLight,
  },
  {
    id: 'plan-travail', name: 'Plan de travail', type: 'cabinet',
    description: 'Comptoir de cuisine avec rangements intégrés.',
    consumption: 'N/A', tips: 'Un plan de travail bien organisé facilite la cuisine et réduit le gaspillage.',
    position: [9, 0, -0.45], size: [3.5, 0.9, 0.6], color: PALETTE.furniture,
  },
  {
    id: 'plaque', name: 'Plaque de cuisson', type: 'stove',
    description: 'Plaque à induction 4 feux.',
    consumption: '300-500 kWh/an', tips: 'L\'induction est 20% plus efficace. Couvrez vos casseroles.',
    position: [9.8, 0.92, -0.45], size: [0.6, 0.05, 0.5], color: '#2b4560',
  },
  {
    id: 'evier', name: 'Évier', type: 'sink',
    description: 'Évier inox double bac avec mitigeur et douchette.',
    consumption: '~50 m³ d\'eau/an', tips: 'Installez un mousseur pour réduire le débit de 50%. Débouchage à votre charge.',
    position: [8, 0.92, -0.45], size: [0.8, 0.12, 0.5], color: PALETTE.furnitureLight,
  },
  {
    id: 'four', name: 'Four', type: 'box',
    description: 'Four encastrable multifonction chaleur tournante.',
    consumption: '150-250 kWh/an', tips: 'Éteignez 5 min avant la fin pour utiliser la chaleur résiduelle.',
    position: [10.7, 0.2, -0.45], size: [0.6, 0.55, 0.55], color: '#2b4560',
  },
  {
    id: 'meuble-haut', name: 'Meubles hauts', type: 'shelf',
    description: 'Rangements muraux de cuisine, 3 portes.',
    consumption: 'N/A', tips: 'Organisez vos placards pour limiter le gaspillage alimentaire.',
    position: [9, 1.6, -0.35], size: [3.5, 0.6, 0.35], color: PALETTE.furniture,
  },
  {
    id: 'hotte', name: 'Hotte aspirante', type: 'box',
    description: 'Hotte décorative murale avec éclairage LED.',
    consumption: '40-80 kWh/an', tips: 'Nettoyez les filtres tous les 2 mois.',
    position: [9.8, 1.6, -0.35], size: [0.7, 0.35, 0.35], color: PALETTE.metal,
  },
  {
    id: 'table-cuisine', name: 'Table', type: 'table',
    description: 'Table de cuisine rectangulaire 4 personnes.',
    consumption: 'N/A', tips: 'Préférez une table en bois massif durable.',
    position: [8.5, 0, -3.5], size: [1.4, 0.75, 0.9], color: PALETTE.wood,
  },
  {
    id: 'chaise-c1', name: 'Chaise', type: 'chair',
    description: 'Chaise de cuisine en bois.',
    consumption: 'N/A', tips: 'Les chaises en bois massif durent des décennies.',
    position: [8, 0, -3], size: [0.4, 0.8, 0.4], color: PALETTE.wood,
  },
  {
    id: 'chaise-c2', name: 'Chaise', type: 'chair',
    description: 'Chaise de cuisine en bois.',
    consumption: 'N/A', tips: 'Les chaises en bois massif durent des décennies.',
    position: [9, 0, -3], size: [0.4, 0.8, 0.4], color: PALETTE.wood,
  },
  {
    id: 'chaise-c3', name: 'Chaise', type: 'chair',
    description: 'Chaise de cuisine en bois.',
    consumption: 'N/A', tips: 'Les chaises en bois massif durent des décennies.',
    position: [8, 0, -4], size: [0.4, 0.8, 0.4], color: PALETTE.wood,
  },
  {
    id: 'chaise-c4', name: 'Chaise', type: 'chair',
    description: 'Chaise de cuisine en bois.',
    consumption: 'N/A', tips: 'Les chaises en bois massif durent des décennies.',
    position: [9, 0, -4], size: [0.4, 0.8, 0.4], color: PALETTE.wood,
  },
  {
    id: 'lave-vaisselle', name: 'Lave-vaisselle', type: 'washer',
    description: 'Lave-vaisselle encastrable 14 couverts, classe A+++.',
    consumption: '230-300 kWh/an', tips: 'Faites tourner uniquement plein. Le programme éco consomme 30% de moins.',
    position: [7.5, 0, -0.45], size: [0.6, 0.85, 0.55], color: PALETTE.furnitureLight,
  },
  {
    id: 'micro-onde', name: 'Micro-ondes', type: 'box',
    description: 'Four micro-ondes avec fonction grill.',
    consumption: '40-80 kWh/an', tips: 'Débranchez quand non utilisé.',
    position: [10.5, 0.95, -0.45], size: [0.5, 0.35, 0.4], color: PALETTE.metal,
  },
  {
    id: 'poubelle', name: 'Poubelle de tri', type: 'box',
    description: 'Poubelle 3 compartiments pour le tri sélectif.',
    consumption: 'N/A', tips: 'Le tri des déchets réduit de 30% le volume d\'ordures en décharge.',
    position: [6.6, 0, -2], size: [0.4, 0.6, 0.3], color: PALETTE.furnitureDark,
  },

  // --- Équipements schema-logement ---
  {
    id: 'robinet-cuisine', name: 'Robinet qui fuit', type: 'box',
    description: 'Robinetterie cuisine : mitigeur, mousseur, joints.',
    consumption: 'N/A', tips: 'Changement des joints à votre charge. Ne pas attendre (facture d\'eau). Décret n°87-712.',
    position: [8, 1.15, -0.2], size: [0.08, 0.18, 0.06], color: PALETTE.metal,
  },
  {
    id: 'serrure-cuisine', name: 'Serrure', type: 'box',
    description: 'Serrure de porte de cuisine.',
    consumption: 'N/A', tips: 'Lubrifiez la serrure. Réparation et remplacement clés perdues à votre charge.',
    position: [11.15, 0.9, -3], size: [0.06, 0.12, 0.04], color: PALETTE.metal,
  },
  {
    id: 'radiateur-cuisine', name: 'Radiateur', type: 'radiator',
    description: 'Radiateur mural compact 1000W.',
    consumption: '500-1000 kWh/an', tips: 'Ne couvrez jamais un radiateur. Purgez-le chaque automne.',
    position: [6.35, 0.3, -3], size: [0.1, 0.6, 0.8], color: PALETTE.furnitureLight,
  },
  {
    id: 'radiateur-elec', name: 'Radiateur électrique', type: 'radiator',
    description: 'Convecteur électrique mural 1500W.',
    consumption: '800-1500 kWh/an', tips: 'Remplacement du convecteur = bailleur. Refixation au mur = locataire.',
    position: [6.35, 0.3, -5], size: [0.1, 0.6, 0.8], color: PALETTE.furnitureLight,
  },
  {
    id: 'interphone', name: 'Interphone / Sonnette', type: 'box',
    description: 'Interphone ou sonnette d\'entrée.',
    consumption: 'N/A', tips: 'Entretien à votre charge. Vérifiez les piles et le câblage.',
    position: [11.15, 1.4, -5], size: [0.06, 0.12, 0.08], color: PALETTE.furnitureLight,
  },
]

// =============================================
// SALLE DE BAIN - pos [0,0,-6.2], size [5, 2.8, 4]
// world x: 0→5, world z: -6.2→-10.2
// =============================================
const sdbEquipment: Equipment[] = [
  // --- Mobilier principal ---
  {
    id: 'douche', name: 'Douche italienne', type: 'shower',
    description: 'Cabine de douche avec paroi vitrée et receveur extra-plat.',
    consumption: '~30 m³ d\'eau/an', tips: 'Douche 5 min = 60L vs bain 150L. Un pommeau économe réduit de 40%.',
    position: [4, 0, -6.8], size: [1.2, 2, 1.2], color: PALETTE.furnitureLight,
  },
  {
    id: 'lavabo', name: 'Meuble vasque', type: 'sink',
    description: 'Meuble vasque avec rangement et éclairage LED intégré.',
    consumption: '~20 m³ d\'eau/an', tips: 'Fermez le robinet pendant le brossage. Un mitigeur thermostatique économise 15%.',
    position: [2.5, 0, -6.5], size: [0.8, 0.85, 0.5], color: PALETTE.white,
  },
  {
    id: 'miroir-sdb', name: 'Miroir', type: 'mirror',
    description: 'Miroir mural LED anti-buée.',
    consumption: '10-20 kWh/an', tips: 'L\'éclairage LED intégré au miroir suffit souvent pour la pièce.',
    position: [2.5, 1.4, -6.3], size: [0.7, 0.7, 0.04], color: '#b8d0e0',
  },
  {
    id: 'wc', name: 'Toilettes (WC)', type: 'toilet',
    description: 'WC suspendu avec chasse d\'eau double débit 3/6L.',
    consumption: '~10 m³ d\'eau/an', tips: 'La chasse double débit économise 50% d\'eau. Ne jetez rien d\'autre que du papier.',
    position: [0.6, 0, -6.8], size: [0.45, 0.45, 0.65], color: PALETTE.white,
  },
  {
    id: 'machine-laver', name: 'Machine à laver', type: 'washer',
    description: 'Lave-linge 8kg classe A+++ avec essorage 1400 tr/min.',
    consumption: '150-250 kWh/an', tips: 'Lavez à 30°C au lieu de 60°C = -60% d\'énergie. Remplissez le tambour.',
    position: [0.5, 0, -8.5], size: [0.6, 0.9, 0.6], color: PALETTE.furnitureLight,
  },
  {
    id: 'meuble-sdb', name: 'Colonne de rangement', type: 'cabinet',
    description: 'Colonne de rangement étroite, 4 étagères.',
    consumption: 'N/A', tips: 'Un rangement organisé facilite le nettoyage et limite l\'humidité.',
    position: [1.5, 0, -9.8], size: [0.5, 1.8, 0.4], color: PALETTE.furniture,
  },
  {
    id: 'seche-serviettes', name: 'Sèche-serviettes', type: 'radiator',
    description: 'Radiateur sèche-serviettes électrique.',
    consumption: '200-400 kWh/an', tips: 'Programmez-le 1h avant la douche uniquement.',
    position: [0.15, 0.5, -9], size: [0.08, 1.2, 0.6], color: PALETTE.metal,
  },
  {
    id: 'tapis-bain', name: 'Tapis de bain', type: 'rug',
    description: 'Tapis de bain antidérapant en coton.',
    consumption: 'N/A', tips: 'Lavez le tapis de bain chaque semaine pour éviter les moisissures.',
    position: [3, 0, -8], size: [0.8, 0.02, 0.5], color: '#a7c3d9',
  },
  {
    id: 'panier-linge', name: 'Panier à linge', type: 'box',
    description: 'Panier à linge en osier avec couvercle.',
    consumption: 'N/A', tips: 'Triez le linge par couleur pour optimiser les machines.',
    position: [1.5, 0, -8.5], size: [0.4, 0.6, 0.35], color: PALETTE.cream,
  },

  // --- Équipements schema-logement ---
  {
    id: 'joints-sdb', name: 'Joints d\'étanchéité', type: 'box',
    description: 'Joints silicone autour de la douche, baignoire et lavabo.',
    consumption: 'N/A', tips: 'Changement des joints sanitaires à votre charge (Décret n°87-712).',
    position: [4.5, 0.3, -6.3], size: [0.4, 0.04, 0.04], color: PALETTE.white,
  },
  {
    id: 'chasse-eau', name: 'Chasse d\'eau', type: 'box',
    description: 'Mécanisme de chasse d\'eau WC, flotteur et joint.',
    consumption: 'N/A', tips: 'Changer le joint, les écrous. Mécanisme complet si nécessaire. Décret n°87-712.',
    position: [0.6, 0.5, -6.5], size: [0.25, 0.3, 0.15], color: PALETTE.white,
  },
  {
    id: 'robinet-sdb', name: 'Robinet salle de bain', type: 'box',
    description: 'Robinetterie de salle de bain, joints et mousseur.',
    consumption: 'N/A', tips: 'En général à votre charge. Ne pas attendre (facture d\'eau). Décret n°87-712.',
    position: [2.5, 1.1, -6.3], size: [0.08, 0.15, 0.06], color: PALETTE.metal,
  },
  {
    id: 'grille-ventilation', name: 'Grille de ventilation', type: 'box',
    description: 'Grille de ventilation murale, ne jamais obstruer.',
    consumption: 'N/A', tips: 'Nettoyage à votre charge. Remplacement si cassée = locataire.',
    position: [2.5, 2.5, -6.3], size: [0.25, 0.15, 0.04], color: PALETTE.furnitureLight,
  },
  {
    id: 'cumulus', name: 'Cumulus / Chauffe-eau', type: 'cabinet',
    description: 'Ballon d\'eau chaude électrique 200L.',
    consumption: '1500-2500 kWh/an', tips: 'Sous contrat d\'entretien bailleur (charges récupérables). Réglez à 55°C.',
    position: [4.5, 0, -9.5], size: [0.6, 1.5, 0.5], color: PALETTE.furnitureLight,
  },
]

// =============================================
// EXTÉRIEUR - pos [-1,0,5], size [14, 0.5, 4.5]
// world x: -1→13, world z: 5→0.5
// Outdoor area in front of the house (ne chevauche pas la maison)
// =============================================
const exterieurEquipment: Equipment[] = [
  {
    id: 'cave', name: 'Cave', type: 'cabinet',
    description: 'Accès cave avec porte et serrure.',
    consumption: 'N/A', tips: 'Entretien de tous les locaux loués (cave, garage, cellier) à votre charge. Nettoyez et aérez.',
    position: [-0.5, 0, 1], size: [1.2, 1.5, 0.8], color: PALETTE.furnitureDark,
  },
  {
    id: 'garage', name: 'Garage (poignée, serrure)', type: 'cabinet',
    description: 'Porte de garage avec serrure et poignée.',
    consumption: 'N/A', tips: 'Lubrifiez la serrure. Entretien courant à votre charge.',
    position: [12, 0, 1.5], size: [1.5, 2, 1.5], color: PALETTE.furniture,
  },
  {
    id: 'chaudiere', name: 'Chaudière', type: 'cabinet',
    description: 'Chaudière gaz ou fioul avec contrat d\'entretien obligatoire.',
    consumption: '8000-15000 kWh/an', tips: 'Sous contrat d\'entretien (charges récupérables). Vérifiez la pression.',
    position: [2, 0, 1], size: [0.7, 1.2, 0.5], color: PALETTE.metal,
  },
  {
    id: 'vmc', name: 'VMC', type: 'box',
    description: 'Ventilation mécanique contrôlée.',
    consumption: '50-150 kWh/an', tips: 'Sous contrat d\'entretien (charges récupérables). Nettoyez les grilles.',
    position: [3.5, 0, 1.5], size: [0.5, 0.5, 0.4], color: PALETTE.metal,
  },
  {
    id: 'fosse-septique', name: 'Fosse septique', type: 'box',
    description: 'Fosse septique ou système d\'assainissement individuel.',
    consumption: 'N/A', tips: 'Sous contrat d\'entretien (charges récupérables). Vidange régulière.',
    position: [7, 0, 1], size: [1.2, 0.12, 0.8], color: PALETTE.furnitureDark,
  },
  {
    id: 'balcon', name: 'Balcon (évacuation)', type: 'box',
    description: 'Balcon avec évacuation d\'eau et grille.',
    consumption: 'N/A', tips: 'Débouchage à votre charge. Retirez les feuilles, nettoyez la grille.',
    position: [5, 0, 3], size: [2, 0.08, 1], color: PALETTE.floor,
  },
  {
    id: 'pelouse', name: 'Entretien pelouse / haies', type: 'plant',
    description: 'Jardin privatif : pelouse, haies, arbustes.',
    consumption: 'N/A', tips: 'Tonte et taille à votre charge si jardin privatif (Décret n°87-712).',
    position: [9.5, 0, 2], size: [1, 1.5, 1], color: PALETTE.green,
  },
  {
    id: 'arbre', name: 'Arbre', type: 'plant',
    description: 'Arbre du jardin.',
    consumption: 'N/A', tips: 'L\'élagage est à la charge du locataire pour un jardin privatif.',
    position: [11, 0, 3], size: [0.6, 2.2, 0.6], color: PALETTE.green,
  },
  {
    id: 'boite-lettres', name: 'Boîte aux lettres', type: 'box',
    description: 'Boîte aux lettres normalisée.',
    consumption: 'N/A', tips: 'Remplacement de la serrure et des clés à votre charge.',
    position: [5.5, 0, 4], size: [0.3, 0.9, 0.2], color: PALETTE.metal,
  },
  {
    id: 'allee', name: 'Allée / chemin', type: 'rug',
    description: 'Allée d\'accès au logement.',
    consumption: 'N/A', tips: 'Déneigement et désherbage de l\'allée à votre charge.',
    position: [5.5, 0, 2.5], size: [1.5, 0.01, 4], color: PALETTE.cream,
  },
]

export const rooms: Room[] = [
  {
    id: 'sejour', name: 'Séjour',
    position: [0, 0, 0], size: [6, WALL_H, 6],
    floorColor: PALETTE.floorAlt, equipment: sejourEquipment,
  },
  {
    id: 'cuisine', name: 'Cuisine',
    position: [6.2, 0, 0], size: [5, WALL_H, 6],
    floorColor: PALETTE.floor, equipment: cuisineEquipment,
  },
  {
    id: 'salle-de-bain', name: 'Salle de bain',
    position: [0, 0, -6.2], size: [5, WALL_H, 4],
    floorColor: PALETTE.floorAlt, equipment: sdbEquipment,
  },
  {
    id: 'exterieur', name: 'Extérieur',
    position: [-1, 0, 5], size: [14, 0.5, 4.5],
    floorColor: PALETTE.grass, equipment: exterieurEquipment,
  },
]
