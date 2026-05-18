const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Images spécifiques à télécharger depuis entretenirsonlogement.fr
const SPECIFIC_IMAGES = {
  // Électroménager cuisine
  'four.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/four.png',
  'plaque-cuisson.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/plaque-cuisson.png',
  'refrigerateur.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/refrigerateur.png',
  'lave-vaisselle.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/lave-vaisselle.png',
  'hotte.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/hotte.png',
  'evier.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/evier.png',
  
  // Électroménager buanderie
  'lave-linge.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/lave-linge.png',
  
  // Salle de bain
  'seche-serviettes.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/seche-serviettes.png',
  'miroir.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/miroir.png',
  'armoire-toilette.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/armoire-toilette.png',
  
  // Sols et revêtements
  'sol-parquet.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/sol-parquet.png',
  'sol-carrelage.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/sol-carrelage.png',
  'revetement-sol.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/revetement-sol.png',
  
  // Portes
  'porte-interieure.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/porte-interieure.png',
  
  // Divers
  'boite-lettres.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/boite-lettres.png',
  'compteur-eau.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/compteur-eau.png',
  'ascenseur.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/ascenseur.png',
  'digicode.png': 'https://entretenirsonlogement.fr/wp-content/uploads/2022/11/digicode.png',
};

const outputDir = path.join(__dirname, '..', 'public', 'equipment_card');

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    protocol.get(url, options, (response) => {
      // Gérer les redirections
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Status ${response.statusCode} for ${url}`));
        return;
      }

      const filePath = path.join(outputDir, filename);
      const fileStream = fs.createWriteStream(filePath);

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        const stats = fs.statSync(filePath);
        resolve({ filename, size: stats.size });
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function downloadAll() {
  console.log('🔍 Téléchargement des images spécifiques...\n');
  
  const results = {
    success: [],
    failed: []
  };

  for (const [filename, url] of Object.entries(SPECIFIC_IMAGES)) {
    try {
      const result = await downloadImage(url, filename);
      results.success.push(result);
      console.log(`✅ ${filename} (${(result.size / 1024).toFixed(1)} KB)`);
    } catch (error) {
      results.failed.push({ filename, error: error.message });
      console.log(`❌ ${filename} - ${error.message}`);
    }
  }

  console.log('\n📊 RÉSUMÉ:');
  console.log(`✅ Réussis: ${results.success.length}/${Object.keys(SPECIFIC_IMAGES).length}`);
  console.log(`❌ Échoués: ${results.failed.length}`);
  
  if (results.success.length > 0) {
    const totalSize = results.success.reduce((sum, r) => sum + r.size, 0);
    console.log(`📦 Taille totale: ${(totalSize / 1024).toFixed(1)} KB`);
  }
}

downloadAll().catch(console.error);
