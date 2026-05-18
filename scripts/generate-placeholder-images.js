/**
 * Generate placeholder SVG images for equipment
 * Usage: node scripts/generate-placeholder-images.js
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'equipment_card');

// Equipment categories with their placeholder images
const EQUIPMENT_IMAGES = {
  // Portes et serrures
  "porte-entree.png": { icon: "🚪", color: "#8B4513", label: "Porte" },
  "serrure.png": { icon: "🔐", color: "#4A5568", label: "Serrure" },
  "boite-lettres.png": { icon: "📬", color: "#2D3748", label: "Boîte lettres" },
  
  // Sols et murs
  "sol-parquet.png": { icon: "🟫", color: "#8B7355", label: "Sol" },
  "carrelage.png": { icon: "⬜", color: "#E2E8F0", label: "Carrelage" },
  "mur-peinture.png": { icon: "🎨", color: "#CBD5E0", label: "Mur" },
  
  // Électricité
  "luminaire.png": { icon: "💡", color: "#F6E05E", label: "Luminaire" },
  "interrupteur.png": { icon: "🔘", color: "#A0AEC0", label: "Interrupteur" },
  "prise-electrique.png": { icon: "🔌", color: "#718096", label: "Prise" },
  "tableau-electrique.png": { icon: "⚡", color: "#4299E1", label: "Tableau" },
  
  // Communication
  "interphone.png": { icon: "📞", color: "#4A5568", label: "Interphone" },
  "sonnette.png": { icon: "🔔", color: "#ED8936", label: "Sonnette" },
  
  // Sécurité
  "detecteur-fumee.png": { icon: "🚨", color: "#F56565", label: "Détecteur" },
  
  // Ventilation
  "grille-ventilation.png": { icon: "🌬️", color: "#90CDF4", label: "Grille" },
  "vmc.png": { icon: "💨", color: "#63B3ED", label: "VMC" },
  
  // Cuisine
  "evier.png": { icon: "🚰", color: "#A0AEC0", label: "Évier" },
  "robinet.png": { icon: "🚿", color: "#4299E1", label: "Robinet" },
  "siphon.png": { icon: "⚙️", color: "#718096", label: "Siphon" },
  "hotte.png": { icon: "🔼", color: "#4A5568", label: "Hotte" },
  "cuisiniere.png": { icon: "🔥", color: "#F56565", label: "Cuisinière" },
  "plaque-cuisson.png": { icon: "⭕", color: "#2D3748", label: "Plaque" },
  "four.png": { icon: "🔲", color: "#2D3748", label: "Four" },
  "refrigerateur.png": { icon: "❄️", color: "#90CDF4", label: "Réfrigérateur" },
  "lave-vaisselle.png": { icon: "🍽️", color: "#4299E1", label: "Lave-vaisselle" },
  "lave-linge.png": { icon: "👕", color: "#63B3ED", label: "Lave-linge" },
  
  // Salle de bain
  "baignoire.png": { icon: "🛁", color: "#90CDF4", label: "Baignoire" },
  "douche.png": { icon: "🚿", color: "#4299E1", label: "Douche" },
  "paroi-douche.png": { icon: "🚪", color: "#A0AEC0", label: "Paroi" },
  "chauffe-eau.png": { icon: "🔥", color: "#F6AD55", label: "Chauffe-eau" },
  "lavabo.png": { icon: "🚰", color: "#90CDF4", label: "Lavabo" },
  "miroir.png": { icon: "🪞", color: "#E2E8F0", label: "Miroir" },
  "armoire-toilette.png": { icon: "🗄️", color: "#A0AEC0", label: "Armoire" },
  "seche-serviettes.png": { icon: "🔥", color: "#F6AD55", label: "Sèche-serviettes" },
  
  // WC
  "wc.png": { icon: "🚽", color: "#E2E8F0", label: "WC" },
  "chasse-eau.png": { icon: "💧", color: "#4299E1", label: "Chasse d'eau" },
  
  // Fenêtres et volets
  "fenetre.png": { icon: "🪟", color: "#90CDF4", label: "Fenêtre" },
  "volet.png": { icon: "📋", color: "#718096", label: "Volet" },
  "store.png": { icon: "📜", color: "#A0AEC0", label: "Store" },
  
  // Chauffage
  "radiateur.png": { icon: "🔥", color: "#F6AD55", label: "Radiateur" },
  "thermostat.png": { icon: "🌡️", color: "#4299E1", label: "Thermostat" },
  
  // Rangements
  "placard.png": { icon: "🗄️", color: "#8B7355", label: "Placard" },
  
  // Divers
  "joint-silicone.png": { icon: "⚪", color: "#E2E8F0", label: "Joint" },
  "default.png": { icon: "🏠", color: "#4A5568", label: "Équipement" },
};

/**
 * Generate SVG placeholder image
 */
function generateSVG(icon, color, label) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="400" height="400" fill="${color}"/>
  
  <!-- Icon -->
  <text x="200" y="200" font-size="120" text-anchor="middle" dominant-baseline="middle" fill="white" opacity="0.9">
    ${icon}
  </text>
  
  <!-- Label -->
  <text x="200" y="320" font-size="24" font-weight="bold" text-anchor="middle" fill="white" opacity="0.8" font-family="Arial, sans-serif">
    ${label}
  </text>
</svg>`;
}

/**
 * Main function
 */
function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('='.repeat(70));
  console.log('Generating Placeholder Images');
  console.log('='.repeat(70));
  console.log();

  let count = 0;
  
  for (const [filename, config] of Object.entries(EQUIPMENT_IMAGES)) {
    const outputPath = path.join(OUTPUT_DIR, filename.replace('.png', '.svg'));
    const svg = generateSVG(config.icon, config.color, config.label);
    
    fs.writeFileSync(outputPath, svg);
    console.log(`✓ Created: ${filename.replace('.png', '.svg')}`);
    count++;
  }

  console.log();
  console.log('='.repeat(70));
  console.log(`✅ Generated ${count} placeholder images`);
  console.log(`📁 Location: ${OUTPUT_DIR}`);
  console.log();
  console.log('Note: These are temporary SVG placeholders.');
  console.log('Replace them with actual PNG/JPG images from entretenirsonlogement.fr');
  console.log('='.repeat(70));
}

// Run the script
main();
