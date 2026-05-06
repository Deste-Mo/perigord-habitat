/**
 * Download real equipment images from entretenirsonlogement.fr
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'equipment_card');

// Image URLs extracted from the HTML
const IMAGE_URLS = {
  // Débouchage
  "debouchage.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Debouchage-1.png",
  
  // Volets et stores
  "store.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Store.png",
  "lamelles-volet-roulant.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Lamelles-de-volet-roulant.png",
  "graissage.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Graissage.png",
  "mecanisme.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Mecanisme.png",
  
  // Fenêtres
  "cremone.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Cremone.png",
  "vetuste-mise-en-jeu.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Vetustes-et-mise-en-jeux.png",
  "pistolet-joints.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Pistolet-1.png",
  "vitres.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Vitres.png",
  "grille-entree-air.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Grille-dentree-dair.png",
  "gonds-paumelles.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Gonds-et-paumelles-1.png",
  "poignee.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Poignee-1.png",
  
  // Placards
  "tablettes-tasseaux.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Tablettes-et-tasseaux.png",
  "charnieres.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Charnieres-1.png",
  "boutons-poignees.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Boutons-et-poignees-1.png",
  "tablettes.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Tablettes.png",
  "portes-placards.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Portes-1.png",
  
  // Colonnes et plafonds
  "colonne-eaux.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Colonne-deaux.png",
  "plafond-murs-plinthes.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Plafond-murs-plinthes-et-faiences.png",
  "equipement-general.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Equipement.png",
  "prise-electrique.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Prise-electriques.png",
  
  // Compteur d'eau
  "tuyaux-alimentation-eau.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Tuyaix-alimentation-deau.png",
  "compteur-eau.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Compteur-deau.png",
  "porte-gaine.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Porte-de-la-gaine.png",
  "serrures-canons.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Serrures-et-canons.png",
  
  // Ballon électrique
  "entretien-ballon.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Entretien.png",
  
  // Lavabo
  "calcaire.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Calcaire.png",
  "robinet.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Robinet-1.png",
  "lavabo.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Lavabo-1.png",
  "bonde.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Bonde-1.png",
  "siphon.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Siphon-1.png",
  
  // Douche et baignoire
  "bac-douche.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Bac-a-douche-1.png",
  "tuyaux-evacuation.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Tuyaux-devacuation.png",
  "baignoire.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Baignoire.png",
  "pommeau.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Pommeau.png",
  "pare-douche.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Par-douche.png",
  "support-flexible.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Support-flexible-1.png",
  "flexible.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Flexible-1.png",
  "tablier-baignoire.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Tablier-baignoire.png",
  
  // WC
  "entretien-detartrage.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Entretien-detratrage.png",
  "cuvette.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Cuvette-1.png",
  "abattant.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Abattant-1.png",
  "fixation-sol.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Fixation-au-sol-vis.png",
  "bouche-horizontal.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Bouche-en-horizontal.png",
  "chasse-eau.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Chasse-deau-1.png",
  "robinet-arret.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Robinet-darret-1.png",
  
  // Détecteur et électricité
  "detecteur-fumee.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Detecteur-de-fumee.png",
  "murs.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Murs.png",
  "sonnette.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Plan-de-travail-export-Valophis-31.png",
  "interphone.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Plan-de-travail-export-Valophis-30.png",
  "douilles.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Douilles.png",
  "interrupteur-prise.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Plan-de-travail-export-Valophis-19.png",
  
  // Tableau électrique
  "porte-tableau-electrique.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Porte-du-tableau-electrique.png",
  "porte-placard-tableau.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Porte-du-placard-tableau-electrique-nouvelle-construction.png",
  "fusibles-coupe-circuits.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Fusibles-et-coupe-circuits.png",
  "tableau-electrique.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Tableau-electrique.png",
  
  // Portes
  "gonds-paumelles-portes.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Gonds-et-paumelles.png",
  "poignee-porte.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Poignee.png",
  "ouvrant-porte.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Ouvrant-porte-1.png",
  
  // Placards suite
  "rails-roulettes.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Rails-et-roulettes.png",
  "boutons-poignees-placards.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Boutons-et-poignees-1.png",
  "portes-panneaux.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Portes-ou-panneaux.png",
  
  // Radiateur
  "tete-thermostatique.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Tete-thermostatique-1.png",
  "thermostat.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/Thermostat.png",
};

/**
 * Download a file from URL
 */
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(outputPath);
        if (response.headers.location) {
          downloadFile(response.headers.location, outputPath)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error(`Redirect without location: ${response.statusCode}`));
        }
      } else {
        file.close();
        fs.unlinkSync(outputPath);
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      reject(err);
    });
  });
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(70));
  console.log('Downloading Real Equipment Images');
  console.log('='.repeat(70));
  console.log();

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true});
  }

  const entries = Object.entries(IMAGE_URLS);
  console.log(`Starting download of ${entries.length} images...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const [filename, url] of entries) {
    const outputPath = path.join(OUTPUT_DIR, filename);
    
    try {
      console.log(`Downloading: ${filename}`);
      await downloadFile(url, outputPath);
      const stats = fs.statSync(outputPath);
      const size = (stats.size / 1024).toFixed(2);
      console.log(`  ✓ Saved (${size} KB)\n`);
      successCount++;
    } catch (error) {
      console.error(`  ✗ Failed: ${error.message}\n`);
      failCount++;
    }
  }

  console.log('='.repeat(70));
  console.log(`Download Complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Failed: ${failCount}`);
  console.log(`  Location: ${OUTPUT_DIR}`);
  console.log('='.repeat(70));
}

// Run
main().catch(console.error);
