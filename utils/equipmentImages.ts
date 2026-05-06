/**
 * Utility functions for equipment images
 * Maps equipment names to local image files
 */

// Image mapping for equipment (using ONLY real images from entretenirsonlogement.fr)
const IMAGE_MAP: Record<string, string> = {
  // Mappings spécifiques (ordre important - du plus spécifique au plus général)
  "sonnette de porte": "sonnette.png",
  "chauffe-eau électrique": "entretien-ballon.png",
  "chauffe-eau electrique": "entretien-ballon.png",
  "sèche-serviettes électrique": "tete-thermostatique.png",
  "seche-serviettes electrique": "tete-thermostatique.png",
  "tableau électrique": "tableau-electrique.png",
  "tableau electrique": "tableau-electrique.png",
  "prise électrique / interrupteur cuisine": "interrupteur-prise.png",
  "prise électrique / interrupteur": "interrupteur-prise.png",
  "prise électrique rasoir": "interrupteur-prise.png",
  "luminaire / plafonnier": "douilles.png",
  "luminaire wc": "douilles.png",
  "luminaire chambre": "douilles.png",
  "éclairage parties communes": "douilles.png",
  "vmc / grille ventilation": "grille-entree-air.png",
  "vmc / grille ventilation cuisine": "grille-entree-air.png",
  "vmc / grille ventilation sdb": "grille-entree-air.png",
  "vmc / grille ventilation wc": "grille-entree-air.png",
  "vmc / grille ventilation chambre": "grille-entree-air.png",
  "robinetterie cuisine": "robinet.png",
  "robinetterie lavabo": "robinet.png",
  "robinetterie (mitigeur bain/douche)": "robinet.png",
  "douchette / mitigeur évier": "robinet.png",
  "douchette / mitigeur evier": "robinet.png",
  "siphon et bonde d'évier": "siphon.png",
  "siphon et bonde d'evier": "siphon.png",
  "siphon lavabo": "siphon.png",
  "plomberie apparente sous évier": "tuyaux-evacuation.png",
  "plomberie apparente sous evier": "tuyaux-evacuation.png",
  "carrelage mural / crédence": "plafond-murs-plinthes.png",
  "carrelage mural / credence": "plafond-murs-plinthes.png",
  "carrelage sol cuisine": "plafond-murs-plinthes.png",
  "carrelage mural salle de bain": "plafond-murs-plinthes.png",
  "carrelage sol salle de bain": "plafond-murs-plinthes.png",
  "revêtement sol wc": "plafond-murs-plinthes.png",
  "revetement sol wc": "plafond-murs-plinthes.png",
  "revêtement mural wc": "murs.png",
  "revetement mural wc": "murs.png",
  "peintures et enduits muraux": "murs.png",
  "revêtement mural": "murs.png",
  "revetement mural": "murs.png",
  "revêtement de sol": "plafond-murs-plinthes.png",
  "revetement de sol": "plafond-murs-plinthes.png",
  "colonne montante gaz": "colonne-eaux.png",
  "robinet d'arrêt wc": "robinet-arret.png",
  "robinet d'arret wc": "robinet-arret.png",
  "robinet d'arrêt sous meuble": "robinet-arret.png",
  "robinet d'arret sous meuble": "robinet-arret.png",
  "joint d'étanchéité": "pistolet-joints.png",
  "joint d'etancheite": "pistolet-joints.png",
  "hotte aspirante / extracteur": "grille-entree-air.png",
  "cuisinière / plaque de cuisson": "equipement-general.png",
  "cuisiniere / plaque de cuisson": "equipement-general.png",
  "réfrigérateur / congélateur": "equipement-general.png",
  "refrigerateur / congelateur": "equipement-general.png",
  "chaufferie collective / chaudière": "entretien-ballon.png",
  "chaufferie collective / chaudiere": "entretien-ballon.png",
  "local poubelles / bacs ordures": "portes-panneaux.png",
  "local vélos / poussettes": "portes-panneaux.png",
  "local velos / poussettes": "portes-panneaux.png",
  "espaces verts / aire de jeux": "equipement-general.png",
  "digicode / badge d'accès": "interphone.png",
  "digicode / badge d'acces": "interphone.png",
  "interphone / visiophone": "interphone.png",
  "serrure et verrou de sécurité": "serrures-canons.png",
  "serrure et verrou de securite": "serrures-canons.png",
  "détecteur de fumée (daaf)": "detecteur-fumee.png",
  "detecteur de fumee (daaf)": "detecteur-fumee.png",
  "paroi ou rideau de douche": "pare-douche.png",
  "placard intégré": "portes-placards.png",
  "placard integre": "portes-placards.png",
  "porte intérieure": "ouvrant-porte.png",
  "porte interieure": "ouvrant-porte.png",
  
  // Portes et serrures
  "porte d'entrée": "ouvrant-porte.png",
  "porte intérieure": "ouvrant-porte.png",
  "porte interieure": "ouvrant-porte.png",
  "porte": "ouvrant-porte.png",
  "serrure": "serrures-canons.png",
  "verrou": "serrures-canons.png",
  "canon": "serrures-canons.png",
  "poignée": "poignee-porte.png",
  "poignee": "poignee-porte.png",
  "gond": "gonds-paumelles-portes.png",
  "paumelle": "gonds-paumelles-portes.png",
  
  // Boîte aux lettres et sonnette
  "boîte aux lettres": "portes-panneaux.png",
  "boite aux lettres": "portes-panneaux.png",
  
  // Sols et murs
  "sol": "plafond-murs-plinthes.png",
  "parquet": "plafond-murs-plinthes.png",
  "carrelage": "plafond-murs-plinthes.png",
  "revêtement": "plafond-murs-plinthes.png",
  "revetement": "plafond-murs-plinthes.png",
  "mur": "murs.png",
  "peinture": "murs.png",
  "enduit": "murs.png",
  "plafond": "plafond-murs-plinthes.png",
  "plinthe": "plafond-murs-plinthes.png",
  "faïence": "plafond-murs-plinthes.png",
  "crédence": "murs.png",
  "credence": "murs.png",
  
  // Électricité
  "luminaire": "douilles.png",
  "plafonnier": "douilles.png",
  "ampoule": "douilles.png",
  "douille": "douilles.png",
  "éclairage": "douilles.png",
  "eclairage": "douilles.png",
  "interrupteur": "interrupteur-prise.png",
  "prise": "interrupteur-prise.png",
  "électrique": "interrupteur-prise.png",
  "electrique": "interrupteur-prise.png",
  "tableau": "tableau-electrique.png",
  "fusible": "fusibles-coupe-circuits.png",
  
  // Interphone et sonnette
  "interphone": "interphone.png",
  "visiophone": "interphone.png",
  "sonnette": "sonnette.png",
  
  // Sécurité
  "detecteur": "detecteur-fumee.png",
  "détecteur": "detecteur-fumee.png",
  "daaf": "detecteur-fumee.png",
  "fumée": "detecteur-fumee.png",
  "fumee": "detecteur-fumee.png",
  
  // Ventilation
  "grille": "grille-entree-air.png",
  "ventilation": "grille-entree-air.png",
  "vmc": "grille-entree-air.png",
  "aération": "grille-entree-air.png",
  "aeration": "grille-entree-air.png",
  
  // Plomberie générale
  "plomberie apparente": "tuyaux-evacuation.png",
  "plomberie": "tuyaux-evacuation.png",
  "robinet": "robinet.png",
  "mitigeur": "robinet.png",
  "douchette": "robinet.png",
  "robinetterie": "robinet.png",
  "siphon": "siphon.png",
  "bonde": "bonde.png",
  "débouchage": "debouchage.png",
  "debouchage": "debouchage.png",
  "tuyau": "tuyaux-evacuation.png",
  "évacuation": "tuyaux-evacuation.png",
  "evacuation": "tuyaux-evacuation.png",
  "compteur": "compteur-eau.png",
  "colonne": "colonne-eaux.png",
  "gaz": "colonne-eaux.png",
  
  // Salle de bain
  "baignoire": "baignoire.png",
  "douche": "bac-douche.png",
  "receveur": "bac-douche.png",
  "paroi": "pare-douche.png",
  "pare": "pare-douche.png",
  "rideau": "pare-douche.png",
  "pommeau": "pommeau.png",
  "flexible": "flexible.png",
  "support": "support-flexible.png",
  "chauffe-eau": "entretien-ballon.png",
  "cumulus": "entretien-ballon.png",
  "ballon": "entretien-ballon.png",
  "lavabo": "lavabo.png",
  "vasque": "lavabo.png",
  "évier": "lavabo.png",
  "evier": "lavabo.png",
  "calcaire": "calcaire.png",
  "tablier": "tablier-baignoire.png",
  "miroir": "lavabo.png",
  "armoire de toilette": "portes-panneaux.png",
  "armoire": "portes-panneaux.png",
  
  // WC - Ordre spécifique important!
  "cuvette wc": "cuvette.png",
  "cuvette": "cuvette.png",
  "abattant": "abattant.png",
  "chasse": "chasse-eau.png",
  "mécanisme de chasse": "chasse-eau.png",
  "mecanisme de chasse": "chasse-eau.png",
  "revêtement sol wc": "plafond-murs-plinthes.png",
  "revetement sol wc": "plafond-murs-plinthes.png",
  "revêtement mural wc": "murs.png",
  "revetement mural wc": "murs.png",
  "luminaire wc": "douilles.png",
  "vmc / grille ventilation wc": "grille-entree-air.png",
  "robinet d'arrêt wc": "robinet-arret.png",
  "robinet d'arret wc": "robinet-arret.png",
  "wc": "equipement-general.png",  // Fallback pour "WC" seul
  "toilette": "equipement-general.png",  // Fallback pour "Toilettes" seul
  "détartrage": "entretien-detartrage.png",
  "detartrage": "entretien-detartrage.png",
  "fixation": "fixation-sol.png",
  "bouché": "bouche-horizontal.png",
  "bouche": "bouche-horizontal.png",
  "arrêt": "robinet-arret.png",
  "arret": "robinet-arret.png",
  
  // Fenêtres et volets
  "fenêtre": "vitres.png",
  "fenetre": "vitres.png",
  "vitre": "vitres.png",
  "volet": "lamelles-volet-roulant.png",
  "lamelle": "lamelles-volet-roulant.png",
  "store": "store.png",
  "persienne": "store.png",
  "crémone": "cremone.png",
  "cremone": "cremone.png",
  "mécanisme": "mecanisme.png",
  "mecanisme": "mecanisme.png",
  "sangle": "mecanisme.png",
  "manivelle": "mecanisme.png",
  "graissage": "graissage.png",
  "vétusté": "vetuste-mise-en-jeu.png",
  "vetuste": "vetuste-mise-en-jeu.png",
  "mise en jeu": "vetuste-mise-en-jeu.png",
  
  // Chauffage
  "radiateur": "tete-thermostatique.png",
  "chauffage": "tete-thermostatique.png",
  "thermostat": "thermostat.png",
  "tête": "tete-thermostatique.png",
  "tete": "tete-thermostatique.png",
  "convecteur": "tete-thermostatique.png",
  "sèche-serviettes": "tete-thermostatique.png",
  "seche-serviettes": "tete-thermostatique.png",
  "sèche": "tete-thermostatique.png",
  "seche": "tete-thermostatique.png",
  
  // Rangements et placards
  "placard": "portes-placards.png",
  "meuble": "portes-panneaux.png",
  "tablette": "tablettes.png",
  "tasseau": "tablettes-tasseaux.png",
  "charnière": "charnieres.png",
  "charniere": "charnieres.png",
  "bouton": "boutons-poignees-placards.png",
  "rail": "rails-roulettes.png",
  "roulette": "rails-roulettes.png",
  "panneau": "portes-panneaux.png",
  
  // Électroménager et équipements cuisine
  "hotte": "grille-entree-air.png",
  "aspirante": "grille-entree-air.png",
  "extracteur": "grille-entree-air.png",
  "cuisinière": "equipement-general.png",
  "cuisiniere": "equipement-general.png",
  "plaque": "equipement-general.png",
  "cuisson": "equipement-general.png",
  "four": "equipement-general.png",
  "réfrigérateur": "equipement-general.png",
  "refrigerateur": "equipement-general.png",
  "congélateur": "equipement-general.png",
  "congelateur": "equipement-general.png",
  "lave-vaisselle": "equipement-general.png",
  "lave-linge": "equipement-general.png",
  
  // Parties communes
  "ascenseur": "porte-tableau-electrique.png",
  "chaudière": "entretien-ballon.png",
  "chaudiere": "entretien-ballon.png",
  "chaufferie": "entretien-ballon.png",
  "local": "portes-panneaux.png",
  "poubelles": "portes-panneaux.png",
  "vélos": "portes-panneaux.png",
  "velos": "portes-panneaux.png",
  "poussettes": "portes-panneaux.png",
  "espaces verts": "equipement-general.png",
  "aire de jeux": "equipement-general.png",
  "digicode": "interphone.png",
  "badge": "interphone.png",
  "accès": "interphone.png",
  "acces": "interphone.png",
  "compteur d'eau": "compteur-eau.png",
  "compteur d'eau individuel": "compteur-eau.png",
  
  // Divers
  "joint": "pistolet-joints.png",
  "silicone": "pistolet-joints.png",
  "mastic": "pistolet-joints.png",
  "gaine": "porte-gaine.png",
  "entretien": "entretien-ballon.png",
};

/**
 * Get the local image path for an equipment
 * Uses real PNG images downloaded from entretenirsonlogement.fr
 */
export function getEquipmentImagePath(equipmentName: string): string {
  const name = equipmentName.toLowerCase();
  
  // Try to find a matching keyword in the equipment name
  for (const [keyword, imageName] of Object.entries(IMAGE_MAP)) {
    if (name.includes(keyword)) {
      return `/equipment_card/${imageName}`;
    }
  }
  
  // Default fallback image
  return "/equipment_card/equipement-general.png";
}

/**
 * Get the image URL for an equipment
 * Uses local PNG images downloaded from entretenirsonlogement.fr
 * Falls back to equipement-general.png if no match found
 */
export function getEquipmentImage(equipmentName: string): string {
  return getEquipmentImagePath(equipmentName);
}


