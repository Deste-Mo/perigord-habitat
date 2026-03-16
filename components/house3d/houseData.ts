export interface Equipment {
  id: string
  name: string
  description: string
  consumption: string
  tips: string
  position: [number, number, number]
  size: [number, number, number]
  color: string
  type?: 'box' | 'sofa' | 'table' | 'bed' | 'lamp' | 'tv' | 'fridge' | 'sink' | 'stove' | 'shower' | 'washer' | 'chair' | 'desk' | 'cabinet' | 'shelf' | 'plant' | 'rug' | 'radiator' | 'mirror' | 'curtain' | 'picture'
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
  wall: '#a7c3d9',        // murs arrière — même bleu que le tapis
  wallInner: '#a7c3d9',   // murs latéraux — même bleu que le tapis
  floor: '#edeae4',       // sol blanc chaud
  floorAlt: '#e5dfd6',    // sol salon — beige crème pointillé
  accent: '#4a7d9e',      // bleu profond (canapé, accents)
  outline: '#2e4a62',     // contours — bleu marine foncé
  furniture: '#92b0c5',   // meubles — gris-bleu moyen
  furnitureDark: '#5f839e', // meubles foncés — poignées, détails
  furnitureLight: '#dae3ed', // appareils blancs — bleu-blanc clair
  wood: '#9eb3c4',        // bois/tables — gris-bleu chaud
  woodDark: '#7a96ab',    // bois foncé — pieds, cadres
  fabric: '#4a7d9e',      // tissu — bleu profond
  white: '#f0eff0',       // blanc cassé (sanitaires)
  background: '#bfcfdf',  // fond — bleu poudré clair
  metal: '#7a99b0',       // métal — robinets, tringles
  glass: '#b8d0e0',       // verre — douche, vitrage
  green: '#6d9680',       // plantes — vert bleuté
  red: '#a06060',         // accents chauds
  cream: '#d8d0c4',       // cadres, déco
}

// =============================================
// SALON - pos [0,0,0], size [6, 2.8, 5]
// local x: 0→6, local z: 0→-5
// =============================================
const salonEquipment: Equipment[] = [
  // --- Sol ---
  {
    id: 'tapis-salon', name: 'Tapis de salon', type: 'rug',
    description: 'Grand tapis rectangulaire en laine.',
    consumption: 'N/A', tips: 'Un tapis isole le sol et réduit les besoins de chauffage de 10%.',
    position: [3, 0, -2.5], size: [3.5, 0.02, 2.5], color: '#a7c3d9',
  },
  // --- Canapé + coussins ---
  {
    id: 'canape', name: 'Canapé', type: 'sofa',
    description: 'Canapé 3 places en tissu, confortable et résistant.',
    consumption: 'N/A', tips: 'Choisissez des matériaux durables, recyclables et déhoussables.',
    position: [3, 0, -1.2], size: [2.8, 0.7, 1], color: '#4a7d9e',
  },
  // --- Table basse ---
  {
    id: 'table-basse', name: 'Table basse', type: 'table',
    description: 'Table basse en bois massif avec plateau verre.',
    consumption: 'N/A', tips: 'Privilégiez le bois certifié FSC pour un mobilier éco-responsable.',
    position: [3, 0, -2.5], size: [1.4, 0.35, 0.7], color: PALETTE.wood,
  },
  // --- Meuble TV + TV ---
  {
    id: 'tv', name: 'Télévision', type: 'tv',
    description: 'Écran plat OLED 55 pouces sur meuble TV.',
    consumption: '80-150 kWh/an', tips: 'Éteignez complètement au lieu du mode veille (-10% sur la facture). Réduisez la luminosité.',
    position: [3, 0, -4.3], size: [1.6, 0.65, 0.1], color: '#2b4560',
  },
  // --- Lampadaire ---
  {
    id: 'lampe-salon', name: 'Lampadaire', type: 'lamp',
    description: 'Lampadaire LED avec abat-jour en tissu.',
    consumption: '10-30 kWh/an', tips: 'Ampoules LED = 80% moins de consommation qu\'une ampoule classique.',
    position: [0.6, 0, -4.2], size: [0.3, 1.6, 0.3], color: PALETTE.furnitureLight,
  },
  // --- Fauteuil ---
  {
    id: 'fauteuil', name: 'Fauteuil', type: 'chair',
    description: 'Fauteuil de lecture confortable.',
    consumption: 'N/A', tips: 'Un bon fauteuil dure 15-20 ans. Investissez dans la qualité.',
    position: [5.2, 0, -2], size: [0.8, 0.8, 0.8], color: '#7a9bb5',
  },
  // --- Bibliothèque ---
  {
    id: 'bibliotheque', name: 'Bibliothèque', type: 'shelf',
    description: 'Étagère murale en bois, 5 niveaux de rangement.',
    consumption: 'N/A', tips: 'Les livres isolent phoniquement. Une bibliothèque contre un mur mitoyen réduit le bruit.',
    position: [5.5, 0, -4.3], size: [0.35, 2, 1.5], color: PALETTE.wood,
  },
  // --- Plante ---
  {
    id: 'plante-salon', name: 'Plante verte', type: 'plant',
    description: 'Ficus d\'intérieur en pot décoratif.',
    consumption: 'N/A', tips: 'Les plantes vertes améliorent la qualité de l\'air et absorbent le CO2.',
    position: [5.3, 0, -0.5], size: [0.45, 1.2, 0.45], color: PALETTE.green,
  },
  // --- Radiateur ---
  {
    id: 'radiateur-salon', name: 'Radiateur', type: 'radiator',
    description: 'Radiateur électrique à inertie 1500W.',
    consumption: '800-1500 kWh/an', tips: 'Réglez à 19°C. Chaque degré supplémentaire = +7% sur la facture.',
    position: [0.15, 0.3, -2.5], size: [0.1, 0.6, 1], color: PALETTE.furnitureLight,
  },
  // --- Tableau ---
  {
    id: 'tableau-salon', name: 'Tableau', type: 'picture',
    description: 'Cadre décoratif accroché au mur.',
    consumption: 'N/A', tips: 'Un intérieur agréable contribue au bien-être et à l\'efficacité énergétique (on reste chez soi !).',
    position: [0.05, 1.6, -3.5], size: [0.04, 0.6, 0.8], color: PALETTE.cream,
  },
  // --- Petite plante sur table ---
  {
    id: 'plante-table', name: 'Plante décorative', type: 'plant',
    description: 'Petit succulent en pot sur la table basse.',
    consumption: 'N/A', tips: 'Les succulentes nécessitent très peu d\'eau.',
    position: [3.4, 0.37, -2.3], size: [0.15, 0.2, 0.15], color: PALETTE.green,
  },
  // --- Rideau ---
  {
    id: 'rideau-salon', name: 'Rideaux', type: 'curtain',
    description: 'Rideaux occultants thermiques.',
    consumption: 'N/A', tips: 'Les rideaux thermiques réduisent les pertes de chaleur de 25% en hiver.',
    position: [3, 1.4, -0.05], size: [2, 2.6, 0.06], color: '#a7c3d9',
  },
]

// =============================================
// CUISINE - pos [0,0,-5.2], size [6, 2.8, 5]
// world z: -5.2→-10.2
// =============================================
const cuisineEquipment: Equipment[] = [
  // --- Réfrigérateur ---
  {
    id: 'refrigerateur', name: 'Réfrigérateur', type: 'fridge',
    description: 'Réfrigérateur combiné congélateur, classe A+++.',
    consumption: '200-400 kWh/an', tips: 'Réglez entre 3°C et 5°C. Ne placez jamais près d\'une source de chaleur.',
    position: [0.5, 0, -5.7], size: [0.7, 1.8, 0.7], color: PALETTE.furnitureLight,
  },
  // --- Plan de travail / comptoir ---
  {
    id: 'plan-travail', name: 'Plan de travail', type: 'cabinet',
    description: 'Comptoir de cuisine avec rangements intégrés en dessous.',
    consumption: 'N/A', tips: 'Un plan de travail bien organisé facilite la cuisine et réduit le gaspillage.',
    position: [3.2, 0, -5.65], size: [3.8, 0.9, 0.6], color: PALETTE.furniture,
  },
  // --- Plaque de cuisson ---
  {
    id: 'plaque', name: 'Plaque de cuisson', type: 'stove',
    description: 'Plaque à induction 4 feux avec détection automatique.',
    consumption: '300-500 kWh/an', tips: 'L\'induction est 20% plus efficace. Couvrez vos casseroles pour cuire plus vite.',
    position: [4.2, 0.92, -5.65], size: [0.6, 0.05, 0.5], color: '#2b4560',
  },
  // --- Évier ---
  {
    id: 'evier', name: 'Évier', type: 'sink',
    description: 'Évier inox double bac avec mitigeur et douchette.',
    consumption: '~50 m³ d\'eau/an', tips: 'Installez un mousseur pour réduire le débit de 50% sans perte de confort.',
    position: [2, 0.92, -5.65], size: [0.8, 0.12, 0.5], color: PALETTE.furnitureLight,
  },
  // --- Four encastré ---
  {
    id: 'four', name: 'Four', type: 'box',
    description: 'Four encastrable multifonction chaleur tournante.',
    consumption: '150-250 kWh/an', tips: 'Évitez de préchauffer trop longtemps. Éteignez 5 min avant la fin pour utiliser la chaleur résiduelle.',
    position: [5, 0.2, -5.65], size: [0.6, 0.55, 0.55], color: '#2b4560',
  },
  // --- Meubles hauts ---
  {
    id: 'meuble-haut', name: 'Meubles hauts', type: 'shelf',
    description: 'Rangements muraux de cuisine, 3 portes.',
    consumption: 'N/A', tips: 'Organisez vos placards pour limiter le gaspillage alimentaire.',
    position: [3.2, 1.6, -5.4], size: [3.8, 0.6, 0.35], color: PALETTE.furniture,
  },
  // --- Hotte aspirante ---
  {
    id: 'hotte', name: 'Hotte aspirante', type: 'box',
    description: 'Hotte décorative murale avec éclairage LED.',
    consumption: '40-80 kWh/an', tips: 'Nettoyez les filtres tous les 2 mois pour une aspiration optimale.',
    position: [4.2, 1.6, -5.4], size: [0.7, 0.35, 0.35], color: PALETTE.metal,
  },
  // --- Table de cuisine ---
  {
    id: 'table-cuisine', name: 'Table', type: 'table',
    description: 'Table de cuisine rectangulaire 4 personnes.',
    consumption: 'N/A', tips: 'Préférez une table en bois massif durable.',
    position: [2.5, 0, -8.2], size: [1.4, 0.75, 0.9], color: PALETTE.wood,
  },
  // --- Chaises (x4) ---
  {
    id: 'chaise-1', name: 'Chaise', type: 'chair',
    description: 'Chaise de cuisine en bois.',
    consumption: 'N/A', tips: 'Les chaises en bois massif durent des décennies.',
    position: [2, 0, -7.7], size: [0.4, 0.8, 0.4], color: PALETTE.wood,
  },
  {
    id: 'chaise-2', name: 'Chaise', type: 'chair',
    description: 'Chaise de cuisine en bois.',
    consumption: 'N/A', tips: 'Les chaises en bois massif durent des décennies.',
    position: [3, 0, -7.7], size: [0.4, 0.8, 0.4], color: PALETTE.wood,
  },
  {
    id: 'chaise-3', name: 'Chaise', type: 'chair',
    description: 'Chaise de cuisine en bois.',
    consumption: 'N/A', tips: 'Les chaises en bois massif durent des décennies.',
    position: [2, 0, -8.7], size: [0.4, 0.8, 0.4], color: PALETTE.wood,
  },
  {
    id: 'chaise-4', name: 'Chaise', type: 'chair',
    description: 'Chaise de cuisine en bois.',
    consumption: 'N/A', tips: 'Les chaises en bois massif durent des décennies.',
    position: [3, 0, -8.7], size: [0.4, 0.8, 0.4], color: PALETTE.wood,
  },
  // --- Micro-ondes ---
  {
    id: 'micro-onde', name: 'Micro-ondes', type: 'box',
    description: 'Four micro-ondes avec fonction grill.',
    consumption: '40-80 kWh/an', tips: 'Débranchez quand non utilisé pour éviter la consommation en veille.',
    position: [1.3, 0.95, -5.65], size: [0.5, 0.35, 0.4], color: PALETTE.metal,
  },
  // --- Poubelle tri ---
  {
    id: 'poubelle', name: 'Poubelle de tri', type: 'box',
    description: 'Poubelle 3 compartiments pour le tri sélectif.',
    consumption: 'N/A', tips: 'Le tri des déchets réduit de 30% le volume d\'ordures en décharge.',
    position: [5.3, 0, -7], size: [0.4, 0.6, 0.3], color: PALETTE.furnitureDark,
  },
  // --- Lave-vaisselle ---
  {
    id: 'lave-vaisselle', name: 'Lave-vaisselle', type: 'washer',
    description: 'Lave-vaisselle encastrable 14 couverts, classe A+++.',
    consumption: '230-300 kWh/an', tips: 'Faites tourner uniquement plein. Le programme éco consomme 30% de moins.',
    position: [3.8, 0, -5.65], size: [0.6, 0.85, 0.55], color: PALETTE.furnitureLight,
  },
  // --- Radiateur ---
  {
    id: 'radiateur-cuisine', name: 'Radiateur', type: 'radiator',
    description: 'Radiateur mural compact 1000W.',
    consumption: '500-1000 kWh/an', tips: 'Ne couvrez jamais un radiateur. Purgez-le chaque automne.',
    position: [0.15, 0.3, -8], size: [0.1, 0.6, 0.8], color: PALETTE.furnitureLight,
  },
]

// =============================================
// CHAMBRE - pos [6.2,0,0], size [5, 2.8, 5]
// world x: 6.2→11.2, world z: 0→-5
// =============================================
const chambreEquipment: Equipment[] = [
  // --- Lit ---
  {
    id: 'lit', name: 'Lit double', type: 'bed',
    description: 'Lit double 160x200 cm avec sommier à lattes et matelas à mémoire de forme.',
    consumption: 'N/A', tips: 'Matelas en matériaux naturels (latex naturel, coton bio) pour un sommeil sain.',
    position: [8.7, 0, -1.5], size: [2, 0.5, 2.5], color: PALETTE.furnitureLight,
  },
  // --- Table de chevet gauche ---
  {
    id: 'chevet-gauche', name: 'Table de chevet', type: 'table',
    description: 'Table de chevet en bois avec tiroir.',
    consumption: 'N/A', tips: 'Gardez un verre d\'eau et un livre à portée de main.',
    position: [7.2, 0, -0.5], size: [0.45, 0.45, 0.4], color: PALETTE.wood,
  },
  // --- Table de chevet droite ---
  {
    id: 'chevet-droit', name: 'Table de chevet', type: 'table',
    description: 'Table de chevet assortie.',
    consumption: 'N/A', tips: 'Symétriser les tables de chevet donne une impression d\'ordre.',
    position: [10.2, 0, -0.5], size: [0.45, 0.45, 0.4], color: PALETTE.wood,
  },
  // --- Lampe chevet gauche ---
  {
    id: 'lampe-chevet-g', name: 'Lampe de chevet', type: 'lamp',
    description: 'Lampe LED avec variateur d\'intensité.',
    consumption: '5-15 kWh/an', tips: 'Utilisez un variateur pour adapter la luminosité à vos besoins.',
    position: [7.2, 0.48, -0.5], size: [0.18, 0.35, 0.18], color: PALETTE.furnitureLight,
  },
  // --- Lampe chevet droite ---
  {
    id: 'lampe-chevet-d', name: 'Lampe de chevet', type: 'lamp',
    description: 'Lampe LED assortie.',
    consumption: '5-15 kWh/an', tips: 'Les LED durent 25 000 heures contre 1 000 pour une ampoule classique.',
    position: [10.2, 0.48, -0.5], size: [0.18, 0.35, 0.18], color: PALETTE.furnitureLight,
  },
  // --- Armoire ---
  {
    id: 'armoire', name: 'Armoire', type: 'cabinet',
    description: 'Armoire 3 portes avec miroir intégré, penderie et étagères.',
    consumption: 'N/A', tips: 'Aérez régulièrement pour éviter l\'humidité et les moisissures.',
    position: [10.6, 0, -3.2], size: [0.6, 2.2, 2], color: PALETTE.furniture,
  },
  // --- Bureau ---
  {
    id: 'bureau-chambre', name: 'Bureau', type: 'desk',
    description: 'Bureau de travail compact avec tiroirs.',
    consumption: 'N/A', tips: 'Positionnez près d\'une fenêtre pour profiter de la lumière naturelle.',
    position: [7, 0, -4.2], size: [1.2, 0.75, 0.6], color: PALETTE.wood,
  },
  // --- Ordinateur ---
  {
    id: 'ordinateur', name: 'Ordinateur portable', type: 'box',
    description: 'Ordinateur portable pour le travail et les loisirs.',
    consumption: '30-100 kWh/an', tips: 'Mode économie d\'énergie activé + débranchez le chargeur quand la batterie est pleine.',
    position: [7, 0.78, -4.2], size: [0.4, 0.03, 0.3], color: '#2b4560',
  },
  // --- Chaise de bureau ---
  {
    id: 'chaise-bureau', name: 'Chaise de bureau', type: 'chair',
    description: 'Chaise ergonomique réglable.',
    consumption: 'N/A', tips: 'Une bonne posture préserve votre dos et améliore la concentration.',
    position: [7, 0, -3.5], size: [0.5, 0.9, 0.5], color: PALETTE.furnitureDark,
  },
  // --- Commode ---
  {
    id: 'commode', name: 'Commode', type: 'cabinet',
    description: 'Commode 4 tiroirs pour le rangement du linge.',
    consumption: 'N/A', tips: 'Utilisez des sachets de lavande naturelle contre les mites.',
    position: [6.6, 0, -2], size: [0.5, 0.9, 1], color: PALETTE.wood,
  },
  // --- Tapis chambre ---
  {
    id: 'tapis-chambre', name: 'Descente de lit', type: 'rug',
    description: 'Tapis doux au pied du lit.',
    consumption: 'N/A', tips: 'Un tapis au pied du lit isole du froid le matin.',
    position: [8.7, 0, -3.2], size: [2, 0.02, 1], color: '#a7c3d9',
  },
  // --- Radiateur ---
  {
    id: 'radiateur-chambre', name: 'Radiateur', type: 'radiator',
    description: 'Radiateur à inertie 1000W, programmable.',
    consumption: '500-1000 kWh/an', tips: 'En chambre, réglez à 17°C la nuit. On dort mieux au frais.',
    position: [8.7, 0.3, -0.05], size: [1, 0.6, 0.1], color: PALETTE.furnitureLight,
  },
  // --- Tableau / cadre ---
  {
    id: 'tableau-chambre', name: 'Cadre photo', type: 'picture',
    description: 'Cadres décoratifs au-dessus du lit.',
    consumption: 'N/A', tips: 'Un intérieur personnalisé améliore le bien-être au quotidien.',
    position: [8.7, 1.8, -0.05], size: [1.5, 0.5, 0.04], color: PALETTE.cream,
  },
  // --- Rideau ---
  {
    id: 'rideau-chambre', name: 'Rideaux occultants', type: 'curtain',
    description: 'Rideaux occultants pour un sommeil de qualité.',
    consumption: 'N/A', tips: 'Les rideaux occultants réduisent aussi les pertes thermiques de 25%.',
    position: [9.5, 1.4, -4.95], size: [1.5, 2.6, 0.06], color: '#92b0c5',
  },
]

// =============================================
// SALLE DE BAIN - pos [6.2,0,-5.2], size [5, 2.8, 5]
// world x: 6.2→11.2, world z: -5.2→-10.2
// =============================================
const sdbEquipment: Equipment[] = [
  // --- Douche ---
  {
    id: 'douche', name: 'Douche italienne', type: 'shower',
    description: 'Cabine de douche avec paroi vitrée et receveur extra-plat.',
    consumption: '~30 m³ d\'eau/an', tips: 'Douche 5 min = 60L vs bain 150L. Un pommeau économe réduit encore de 40%.',
    position: [10.2, 0, -5.8], size: [1.2, 2, 1.2], color: PALETTE.furnitureLight,
  },
  // --- Lavabo + meuble vasque ---
  {
    id: 'lavabo', name: 'Meuble vasque', type: 'sink',
    description: 'Meuble vasque avec miroir et éclairage LED intégré.',
    consumption: '~20 m³ d\'eau/an', tips: 'Fermez le robinet pendant le brossage. Un mitigeur thermostatique économise 15% d\'eau.',
    position: [8.5, 0, -5.7], size: [0.8, 0.85, 0.5], color: PALETTE.white,
  },
  // --- Miroir salle de bain ---
  {
    id: 'miroir-sdb', name: 'Miroir', type: 'mirror',
    description: 'Miroir mural LED anti-buée.',
    consumption: '10-20 kWh/an', tips: 'L\'éclairage LED intégré au miroir suffit souvent pour la pièce.',
    position: [8.5, 1.4, -5.3], size: [0.7, 0.7, 0.04], color: '#b8d0e0',
  },
  // --- Machine à laver ---
  {
    id: 'machine-laver', name: 'Machine à laver', type: 'washer',
    description: 'Lave-linge 8kg classe A+++ avec essorage 1400 tr/min.',
    consumption: '150-250 kWh/an', tips: 'Lavez à 30°C au lieu de 60°C = -60% d\'énergie. Remplissez complètement le tambour.',
    position: [6.8, 0, -5.8], size: [0.6, 0.9, 0.6], color: PALETTE.furnitureLight,
  },
  // --- Sèche-linge ---
  {
    id: 'seche-linge', name: 'Sèche-linge', type: 'washer',
    description: 'Sèche-linge à condensation avec pompe à chaleur.',
    consumption: '150-300 kWh/an', tips: 'Préférez le séchage à l\'air libre quand c\'est possible. Nettoyez le filtre après chaque cycle.',
    position: [6.8, 0.95, -5.8], size: [0.6, 0.85, 0.6], color: PALETTE.furnitureLight,
  },
  // --- WC ---
  {
    id: 'wc', name: 'Toilettes', type: 'box',
    description: 'WC suspendu avec chasse d\'eau double débit 3/6L.',
    consumption: '~10 m³ d\'eau/an', tips: 'La chasse double débit économise 50% d\'eau. Ne jetez rien d\'autre que du papier.',
    position: [10.3, 0, -9.2], size: [0.45, 0.45, 0.65], color: PALETTE.white,
  },
  // --- Porte-serviettes / sèche-serviettes ---
  {
    id: 'seche-serviettes', name: 'Sèche-serviettes', type: 'radiator',
    description: 'Radiateur sèche-serviettes électrique.',
    consumption: '200-400 kWh/an', tips: 'Programmez-le uniquement 1h avant la douche. Un minuteur suffit.',
    position: [6.35, 0.5, -8], size: [0.08, 1.2, 0.6], color: PALETTE.metal,
  },
  // --- Meuble colonne ---
  {
    id: 'meuble-sdb', name: 'Colonne de rangement', type: 'cabinet',
    description: 'Colonne de rangement étroite, 4 étagères.',
    consumption: 'N/A', tips: 'Un rangement organisé facilite le nettoyage et limite l\'humidité.',
    position: [6.8, 0, -9.5], size: [0.5, 1.8, 0.4], color: PALETTE.furniture,
  },
  // --- Tapis de bain ---
  {
    id: 'tapis-bain', name: 'Tapis de bain', type: 'rug',
    description: 'Tapis de bain antidérapant en coton.',
    consumption: 'N/A', tips: 'Lavez le tapis de bain chaque semaine pour éviter les moisissures.',
    position: [9, 0, -7], size: [0.8, 0.02, 0.5], color: '#a7c3d9',
  },
  // --- Panier à linge ---
  {
    id: 'panier-linge', name: 'Panier à linge', type: 'box',
    description: 'Panier à linge en osier avec couvercle.',
    consumption: 'N/A', tips: 'Triez le linge par couleur pour optimiser les machines.',
    position: [7.5, 0, -9.5], size: [0.4, 0.6, 0.35], color: PALETTE.cream,
  },
]

// =============================================
// ENTREE - pos [0,0,-10.4], size [11.2, 2.8, 2]
// world z: -10.4→-12.4
// =============================================
const entreeEquipment: Equipment[] = [
  // --- Porte d'entrée ---
  {
    id: 'porte', name: 'Porte d\'entrée', type: 'box',
    description: 'Porte d\'entrée blindée avec serrure 3 points et isolation thermique.',
    consumption: 'N/A', tips: 'Un joint de porte défaillant = 20% de déperdition thermique. Vérifiez chaque année.',
    position: [5.6, 0, -12], size: [1, 2.2, 0.12], color: PALETTE.furnitureDark,
  },
  // --- Meuble à chaussures ---
  {
    id: 'meuble-entree', name: 'Meuble à chaussures', type: 'cabinet',
    description: 'Banc d\'entrée avec rangement chaussures intégré.',
    consumption: 'N/A', tips: 'Gardez l\'entrée dégagée pour une bonne circulation d\'air.',
    position: [2, 0, -11.8], size: [1.5, 0.7, 0.4], color: PALETTE.furniture,
  },
  // --- Porte-manteau ---
  {
    id: 'porte-manteau', name: 'Porte-manteau', type: 'box',
    description: 'Patère murale en bois, 5 crochets.',
    consumption: 'N/A', tips: 'Séchez vos manteaux mouillés avant de les ranger pour éviter les odeurs.',
    position: [8, 1.5, -12], size: [1.2, 0.15, 0.12], color: PALETTE.wood,
  },
  // --- Miroir d'entrée ---
  {
    id: 'miroir-entree', name: 'Miroir', type: 'mirror',
    description: 'Grand miroir mural d\'entrée.',
    consumption: 'N/A', tips: 'Un miroir reflète la lumière et agrandit visuellement l\'espace.',
    position: [4, 1.3, -12], size: [0.7, 1, 0.04], color: '#b8d0e0',
  },
  // --- Tapis d'entrée ---
  {
    id: 'tapis-entree', name: 'Paillasson', type: 'rug',
    description: 'Paillasson d\'intérieur absorbant.',
    consumption: 'N/A', tips: 'Un bon paillasson retient 80% des saletés et protège vos sols.',
    position: [5.6, 0, -11], size: [1.2, 0.02, 0.6], color: PALETTE.cream,
  },
  // --- Interrupteur / tableau électrique ---
  {
    id: 'tableau-elec', name: 'Tableau électrique', type: 'box',
    description: 'Tableau électrique principal avec disjoncteurs.',
    consumption: 'N/A', tips: 'Faites vérifier l\'installation électrique tous les 10 ans par un professionnel.',
    position: [10, 0.8, -12], size: [0.4, 0.5, 0.1], color: PALETTE.furnitureLight,
  },
]

export const rooms: Room[] = [
  {
    id: 'salon', name: 'Salon',
    position: [0, 0, 0], size: [6, WALL_H, 5],
    floorColor: PALETTE.floorAlt, equipment: salonEquipment,
  },
  {
    id: 'cuisine', name: 'Cuisine',
    position: [0, 0, -5.2], size: [6, WALL_H, 5],
    floorColor: PALETTE.floor, equipment: cuisineEquipment,
  },
  {
    id: 'chambre', name: 'Chambre',
    position: [6.2, 0, 0], size: [5, WALL_H, 5],
    floorColor: PALETTE.floor, equipment: chambreEquipment,
  },
  {
    id: 'salle-de-bain', name: 'Salle de bain',
    position: [6.2, 0, -5.2], size: [5, WALL_H, 5],
    floorColor: PALETTE.floorAlt, equipment: sdbEquipment,
  },
  {
    id: 'entree', name: 'Entrée',
    position: [0, 0, -10.4], size: [11.2, WALL_H, 2],
    floorColor: PALETTE.floor, equipment: entreeEquipment,
  },
]
