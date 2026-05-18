const https = require('https');
const fs = require('fs');
const path = require('path');

// Images Unsplash de haute qualité pour les équipements manquants
const UNSPLASH_IMAGES = {
  // Électroménager cuisine
  'four.png': 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80', // Four
  'plaque-cuisson.png': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', // Plaque cuisson
  'refrigerateur.png': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80', // Réfrigérateur
  'lave-vaisselle.png': 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80', // Lave-vaisselle
  'hotte.png': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', // Hotte
  'evier.png': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', // Évier
  
  // Électroménager buanderie
  'lave-linge.png': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80', // Lave-linge
  
  // Salle de bain
  'seche-serviettes.png': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80', // Sèche-serviettes
  'miroir.png': 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80', // Miroir
  'armoire-toilette.png': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80', // Armoire
  
  // Sols et revêtements
  'sol-parquet.png': 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&q=80', // Parquet
  'sol-carrelage.png': 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&q=80', // Carrelage
  'revetement-sol.png': 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&q=80', // Sol
  
  // Portes
  'porte-interieure.png': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', // Porte
  
  // Divers
  'boite-lettres.png': 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&q=80', // Boîte lettres
  'ascenseur.png': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80', // Ascenseur
  'digicode.png': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', // Digicode
  'local-poubelles.png': 'https://images.unsplash.com/photo-1572297794912-e6c2c9c0f0e3?w=400&q=80', // Poubelles
  'espaces-verts.png': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', // Espaces verts
  'eclairage.png': 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80', // Éclairage
  'chaudiere.png': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80', // Chaudière
};

const outputDir = path.join(__dirname, '..', 'public', 'equipment_card');

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      // Gérer les redirections
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
        downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Status ${response.statusCode}`));
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
  console.log('🔍 Téléchargement des images Unsplash...\n');
  
  const results = {
    success: [],
    failed: []
  };

  for (const [filename, url] of Object.entries(UNSPLASH_IMAGES)) {
    try {
      const result = await downloadImage(url, filename);
      results.success.push(result);
      console.log(`✅ ${filename.padEnd(30)} (${(result.size / 1024).toFixed(1)} KB)`);
      // Petit délai pour éviter de surcharger Unsplash
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      results.failed.push({ filename, error: error.message });
      console.log(`❌ ${filename.padEnd(30)} - ${error.message}`);
    }
  }

  console.log('\n📊 RÉSUMÉ:');
  console.log(`✅ Réussis: ${results.success.length}/${Object.keys(UNSPLASH_IMAGES).length}`);
  console.log(`❌ Échoués: ${results.failed.length}`);
  
  if (results.success.length > 0) {
    const totalSize = results.success.reduce((sum, r) => sum + r.size, 0);
    console.log(`📦 Taille totale: ${(totalSize / 1024).toFixed(1)} KB`);
    console.log(`📦 Taille moyenne: ${(totalSize / results.success.length / 1024).toFixed(1)} KB`);
  }
}

downloadAll().catch(console.error);
