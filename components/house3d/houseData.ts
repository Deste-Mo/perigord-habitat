export interface Equipment {
  id: string
  name: string
  description: string
  consumption: string
  tips: string
  position: [number, number, number]
  size: [number, number, number]
  color: string
  type?: 'box' | 'sofa' | 'table' | 'bed' | 'lamp' | 'tv' | 'fridge' | 'sink' | 'stove' | 'shower' | 'washer' | 'bathtub' | 'chair' | 'desk' | 'cabinet' | 'shelf' | 'plant' | 'rug'
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
const BLUE_LIGHT = '#d6e4f0'
const BLUE_MID = '#a8c4dd'
const BLUE_DARK = '#5b7e9d'
const WHITE = '#f5f8fb'
const CREAM = '#eef2f5'

export const PALETTE = {
  wall: BLUE_MID,
  wallInner: BLUE_LIGHT,
  floor: WHITE,
  floorAlt: CREAM,
  accent: BLUE_DARK,
  outline: '#3d5a73',
  furniture: '#c2d5e3',
  furnitureDark: '#7a9bb5',
  furnitureLight: '#e8eff5',
  wood: '#9bb5c8',
  fabric: '#7a9bb5',
  white: '#ffffff',
  background: '#c5d5e4',
}

// Room local space: x goes from 0 to size[0], z goes from 0 to -size[2]
// Equipment positions are in WORLD space. relPos = equipment.pos - room.pos
// So equipment z must be: room.position[2] minus something (between 0.3 and size[2]-0.3)

export const rooms: Room[] = [
  // ============ SALON ============
  // position [0,0,0], size [6, 2.8, 5]
  // local x: 0..6, local z: 0..-5
  {
    id: 'salon',
    name: 'Salon',
    position: [0, 0, 0],
    size: [6, WALL_H, 5],
    floorColor: CREAM,
    equipment: [
      {
        id: 'tapis-salon',
        name: 'Tapis',
        description: 'Tapis de salon pour le confort.',
        consumption: 'N/A',
        tips: 'Un tapis isole le sol et réduit les besoins de chauffage.',
        position: [3, 0, -2.5],
        size: [3.5, 0.02, 2.5],
        color: BLUE_LIGHT,
        type: 'rug',
      },
      {
        id: 'canape',
        name: 'Canapé',
        description: 'Canapé 3 places confortable avec coussins.',
        consumption: 'N/A',
        tips: 'Choisissez des matériaux durables et recyclables.',
        position: [3, 0, -1.2],
        size: [2.5, 0.7, 1],
        color: BLUE_DARK,
        type: 'sofa',
      },
      {
        id: 'table-basse',
        name: 'Table basse',
        description: 'Table basse en bois au centre du salon.',
        consumption: 'N/A',
        tips: 'Privilégiez le bois certifié FSC.',
        position: [3, 0, -2.5],
        size: [1.4, 0.35, 0.7],
        color: PALETTE.wood,
        type: 'table',
      },
      {
        id: 'tv',
        name: 'Télévision',
        description: 'Écran plat LED 55 pouces sur meuble TV.',
        consumption: '80-150 kWh/an',
        tips: 'Éteignez complètement au lieu du mode veille. Réduisez la luminosité (-30% énergie).',
        position: [3, 0, -4.2],
        size: [1.6, 0.7, 0.1],
        color: '#3d5a73',
        type: 'tv',
      },
      {
        id: 'lampe-salon',
        name: 'Lampe',
        description: 'Lampadaire design pour éclairage d\'ambiance.',
        consumption: '10-30 kWh/an',
        tips: 'Ampoules LED = 80% moins de consommation.',
        position: [0.6, 0, -4.2],
        size: [0.3, 1.5, 0.3],
        color: PALETTE.furnitureLight,
        type: 'lamp',
      },
      {
        id: 'plante-salon',
        name: 'Plante',
        description: 'Plante verte d\'intérieur.',
        consumption: 'N/A',
        tips: 'Les plantes améliorent la qualité de l\'air intérieur.',
        position: [5.3, 0, -0.5],
        size: [0.5, 1.2, 0.5],
        color: '#7ba68a',
        type: 'plant',
      },
    ],
  },

  // ============ CUISINE ============
  // position [0,0,-5.2], size [6, 2.8, 5]
  // world z: -5.2 to -10.2 → local z: 0..-5
  {
    id: 'cuisine',
    name: 'Cuisine',
    position: [0, 0, -5.2],
    size: [6, WALL_H, 5],
    floorColor: WHITE,
    equipment: [
      {
        id: 'refrigerateur',
        name: 'Réfrigérateur',
        description: 'Réfrigérateur combiné double porte.',
        consumption: '200-400 kWh/an',
        tips: 'Réglez entre 3°C et 5°C. Éloignez des sources de chaleur.',
        position: [0.5, 0, -5.7],
        size: [0.7, 1.8, 0.7],
        color: PALETTE.furnitureLight,
        type: 'fridge',
      },
      {
        id: 'plan-travail',
        name: 'Plan de travail',
        description: 'Plan de travail avec rangements intégrés.',
        consumption: 'N/A',
        tips: 'Gardez le plan de travail propre et dégagé.',
        position: [3, 0, -5.7],
        size: [3.5, 0.9, 0.6],
        color: PALETTE.furniture,
        type: 'cabinet',
      },
      {
        id: 'plaque',
        name: 'Plaque de cuisson',
        description: 'Plaque à induction 4 feux.',
        consumption: '300-500 kWh/an',
        tips: 'L\'induction est 20% plus efficace que le gaz. Couvrez vos casseroles.',
        position: [4, 0.92, -5.7],
        size: [0.6, 0.05, 0.5],
        color: '#3d5a73',
        type: 'stove',
      },
      {
        id: 'evier',
        name: 'Évier',
        description: 'Évier double bac avec mitigeur.',
        consumption: '~50 m³ d\'eau/an',
        tips: 'Installez un mousseur pour réduire le débit de 50%.',
        position: [2, 0.92, -5.7],
        size: [0.8, 0.12, 0.5],
        color: PALETTE.furnitureLight,
        type: 'sink',
      },
      {
        id: 'table-cuisine',
        name: 'Table',
        description: 'Table de cuisine avec chaises.',
        consumption: 'N/A',
        tips: 'Préférez une table en matériaux durables.',
        position: [3, 0, -8.5],
        size: [1.4, 0.75, 0.9],
        color: PALETTE.wood,
        type: 'table',
      },
      {
        id: 'meuble-haut',
        name: 'Meubles hauts',
        description: 'Rangements muraux de cuisine.',
        consumption: 'N/A',
        tips: 'Organisez vos placards pour éviter le gaspillage alimentaire.',
        position: [3, 1.6, -5.45],
        size: [3.5, 0.6, 0.35],
        color: PALETTE.furniture,
        type: 'shelf',
      },
    ],
  },

  // ============ CHAMBRE ============
  // position [6.2,0,0], size [5, 2.8, 5]
  // world x: 6.2..11.2, world z: 0..-5 → local x: 0..5, local z: 0..-5
  {
    id: 'chambre',
    name: 'Chambre',
    position: [6.2, 0, 0],
    size: [5, WALL_H, 5],
    floorColor: WHITE,
    equipment: [
      {
        id: 'lit',
        name: 'Lit',
        description: 'Lit double 160x200 avec sommier et matelas.',
        consumption: 'N/A',
        tips: 'Choisissez un matelas en matériaux naturels (latex, coton bio).',
        position: [8.7, 0, -1.5],
        size: [2, 0.5, 2.5],
        color: PALETTE.furnitureLight,
        type: 'bed',
      },
      {
        id: 'lampe-chevet',
        name: 'Lampe de chevet',
        description: 'Lampe LED avec variateur.',
        consumption: '5-15 kWh/an',
        tips: 'Utilisez un variateur pour adapter la luminosité.',
        position: [10.5, 0, -0.5],
        size: [0.2, 0.5, 0.2],
        color: PALETTE.furnitureLight,
        type: 'lamp',
      },
      {
        id: 'armoire',
        name: 'Armoire',
        description: 'Armoire 2 portes avec penderie.',
        consumption: 'N/A',
        tips: 'Aérez régulièrement pour éviter l\'humidité.',
        position: [10.7, 0, -3],
        size: [0.6, 2.2, 1.8],
        color: PALETTE.furniture,
        type: 'cabinet',
      },
      {
        id: 'bureau-chambre',
        name: 'Bureau',
        description: 'Bureau compact avec rangements.',
        consumption: 'N/A',
        tips: 'Placez le bureau près de la fenêtre pour la lumière naturelle.',
        position: [7, 0, -4],
        size: [1.2, 0.75, 0.6],
        color: PALETTE.wood,
        type: 'desk',
      },
      {
        id: 'ordinateur',
        name: 'Ordinateur',
        description: 'Ordinateur portable.',
        consumption: '30-100 kWh/an',
        tips: 'Mode économie d\'énergie + débranchez le chargeur quand la batterie est pleine.',
        position: [7, 0.78, -4],
        size: [0.4, 0.03, 0.3],
        color: '#3d5a73',
        type: 'box',
      },
    ],
  },

  // ============ SALLE DE BAIN ============
  // position [6.2,0,-5.2], size [5, 2.8, 5]
  // world x: 6.2..11.2, world z: -5.2..-10.2 → local x: 0..5, local z: 0..-5
  {
    id: 'salle-de-bain',
    name: 'Salle de bain',
    position: [6.2, 0, -5.2],
    size: [5, WALL_H, 5],
    floorColor: CREAM,
    equipment: [
      {
        id: 'douche',
        name: 'Douche',
        description: 'Cabine de douche italienne.',
        consumption: '~30 m³ d\'eau/an',
        tips: 'Douche 5 min = 60L vs bain 150L. Installez un pommeau économe.',
        position: [10, 0, -5.8],
        size: [1.2, 2, 1.2],
        color: PALETTE.furnitureLight,
        type: 'shower',
      },
      {
        id: 'lavabo',
        name: 'Lavabo',
        description: 'Lavabo vasque avec meuble et miroir.',
        consumption: '~20 m³ d\'eau/an',
        tips: 'Fermez le robinet pendant le brossage. Mitigeur thermostatique.',
        position: [8.2, 0, -5.7],
        size: [0.7, 0.85, 0.5],
        color: PALETTE.white,
        type: 'sink',
      },
      {
        id: 'machine-laver',
        name: 'Machine à laver',
        description: 'Lave-linge 8kg classe A+++.',
        consumption: '150-250 kWh/an',
        tips: 'Lavez à 30°C au lieu de 60°C (-60% énergie). Remplissez le tambour.',
        position: [7, 0, -5.8],
        size: [0.6, 0.9, 0.6],
        color: PALETTE.furnitureLight,
        type: 'washer',
      },
      {
        id: 'wc',
        name: 'Toilettes',
        description: 'WC avec chasse d\'eau double débit.',
        consumption: '~10 m³ d\'eau/an',
        tips: 'La chasse double débit économise 50% d\'eau.',
        position: [10.2, 0, -9],
        size: [0.5, 0.5, 0.7],
        color: PALETTE.white,
        type: 'box',
      },
      {
        id: 'meuble-sdb',
        name: 'Meuble de rangement',
        description: 'Colonne de rangement salle de bain.',
        consumption: 'N/A',
        tips: 'Un bon rangement évite l\'encombrement et facilite le nettoyage.',
        position: [7, 0, -9.5],
        size: [0.5, 1.8, 0.4],
        color: PALETTE.furniture,
        type: 'cabinet',
      },
    ],
  },

  // ============ ENTREE ============
  // position [0,0,-10.4], size [11.2, 2.8, 2]
  // world z: -10.4..-12.4 → local z: 0..-2
  {
    id: 'entree',
    name: 'Entrée',
    position: [0, 0, -10.4],
    size: [11.2, WALL_H, 2],
    floorColor: WHITE,
    equipment: [
      {
        id: 'porte',
        name: 'Porte d\'entrée',
        description: 'Porte d\'entrée blindée avec serrure 3 points.',
        consumption: 'N/A',
        tips: 'Vérifiez l\'isolation de la porte. Un joint défaillant = 20% de déperdition.',
        position: [5.6, 0, -11.8],
        size: [1, 2.2, 0.1],
        color: PALETTE.furnitureDark,
        type: 'box',
      },
      {
        id: 'meuble-entree',
        name: 'Meuble à chaussures',
        description: 'Rangement d\'entrée.',
        consumption: 'N/A',
        tips: 'Gardez l\'entrée dégagée pour la circulation d\'air.',
        position: [2, 0, -11.5],
        size: [1.5, 0.8, 0.4],
        color: PALETTE.furniture,
        type: 'cabinet',
      },
    ],
  },
]
