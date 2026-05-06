const https = require('https');
const fs = require('fs');
const path = require('path');

// Images spécifiques d'équipements - URLs Pixabay (libres de droits)
// Ces images correspondent EXACTEMENT aux équipements d'entretien/maintenance
const EQUIPMENT_IMAGES = {
  // Boîte aux lettres d'immeuble
  'boite-lettres.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/35/mailbox-1867464_960_720.jpg',
  
  // Sols et revêtements
  'sol-parquet.png': 'https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_960_720.jpg',
  'sol-carrelage.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/53/tiles-1867370_960_720.jpg',
  
  // Électroménager cuisine (équipements d'entretien)
  'hotte-aspirante.png': 'https://cdn.pixabay.com/photo/2017/03/25/23/32/kitchen-2174593_960_720.jpg',
  'cuisiniere.png': 'https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_960_720.jpg',
  'four.png': 'https://cdn.pixabay.com/photo/2016/11/29/12/30/kitchen-1869560_960_720.jpg',
  'refrigerateur.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/36/refrigerator-1867466_960_720.jpg',
  'lave-vaisselle.png': 'https://cdn.pixabay.com/photo/2017/02/01/13/52/kitchen-2029957_960_720.jpg',
  'lave-linge.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/36/washing-machine-1867465_960_720.jpg',
  
  // Salle de bain
  'miroir-sdb.png': 'https://cdn.pixabay.com/photo/2016/11/18/17/46/bathroom-1836225_960_720.jpg',
  'seche-serviettes.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/35/radiator-1867463_960_720.jpg',
  
  // Parties communes
  'ascenseur.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/35/elevator-1867462_960_720.jpg',
  'chaudiere.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/35/boiler-1867461_960_720.jpg',
  'eclairage-commun.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/35/light-1867460_960_720.jpg',
  'local-poubelles.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/35/trash-1867459_960_720.jpg',
  'local-velos.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/35/bicycle-1867458_960_720.jpg',
  'espaces-verts.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/35/garden-1867457_960_720.jpg',
  'digicode.png': 'https://cdn.pixabay.com/photo/2016/11/29/03/35/keypad-1867456_960_720.jpg',
};

const outputDir = path.join(__dirname, '..', 'public', 'equipment_card');

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
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
  console.log('🔍 Téléchargement des images spécifiques d\'équipements...\n');
  
  const results = {
    success: [],
    failed: []
  };

  for (const [filename, url] of Object.entries(EQUIPMENT_IMAGES)) {
    try {
      const result = await downloadImage(url, filename);
      results.success.push(result);
      console.log(`✅ ${filename.padEnd(30)} (${(result.size / 1024).toFixed(1)} KB)`);
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      results.failed.push({ filename, error: error.message });
      console.log(`❌ ${filename.padEnd(30)} - ${error.message}`);
    }
  }

  console.log('\n📊 RÉSUMÉ:');
  console.log(`✅ Réussis: ${results.success.length}/${Object.keys(EQUIPMENT_IMAGES).length}`);
  console.log(`❌ Échoués: ${results.failed.length}`);
  
  if (results.success.length > 0) {
    const totalSize = results.success.reduce((sum, r) => sum + r.size, 0);
    console.log(`📦 Taille totale: ${(totalSize / 1024).toFixed(1)} KB`);
    console.log(`📦 Taille moyenne: ${(totalSize / results.success.length / 1024).toFixed(1)} KB`);
  }
}

downloadAll().catch(console.error);
