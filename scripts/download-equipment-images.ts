/**
 * Script to download equipment images from entretenirsonlogement.fr
 * 
 * Usage:
 * 1. Add image URLs to the EQUIPMENT_IMAGE_URLS object below
 * 2. Run: npx ts-node scripts/download-equipment-images.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

// Directory where images will be saved
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'equipment_card');

// Equipment image URLs from entretenirsonlogement.fr
// TODO: Add the actual URLs from the HTML content
const EQUIPMENT_IMAGE_URLS: Record<string, string> = {
  // Example format:
  // "porte-entree.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/porte-entree.png",
  // "serrure.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/serrure.png",
  // "boite-lettres.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/boite-lettres.png",
  // ... add more URLs here
};

/**
 * Download a file from a URL
 */
function downloadFile(url: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(outputPath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        file.close();
        fs.unlinkSync(outputPath);
        if (response.headers.location) {
          downloadFile(response.headers.location, outputPath)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error(`Redirect without location header: ${response.statusCode}`));
        }
      } else {
        file.close();
        fs.unlinkSync(outputPath);
        reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(outputPath);
      reject(err);
    });
  });
}

/**
 * Main function to download all images
 */
async function downloadAllImages() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }

  const entries = Object.entries(EQUIPMENT_IMAGE_URLS);
  
  if (entries.length === 0) {
    console.log('⚠️  No image URLs configured.');
    console.log('Please add image URLs to the EQUIPMENT_IMAGE_URLS object in this script.');
    return;
  }

  console.log(`Starting download of ${entries.length} images...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const [filename, url] of entries) {
    const outputPath = path.join(OUTPUT_DIR, filename);
    
    try {
      console.log(`Downloading: ${filename}`);
      console.log(`  From: ${url}`);
      
      await downloadFile(url, outputPath);
      
      console.log(`  ✓ Saved to: ${outputPath}\n`);
      successCount++;
    } catch (error) {
      console.error(`  ✗ Failed: ${error instanceof Error ? error.message : String(error)}\n`);
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Download complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Failed: ${failCount}`);
  console.log('='.repeat(50));
}

// Run the script
if (require.main === module) {
  downloadAllImages().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { downloadAllImages, EQUIPMENT_IMAGE_URLS };
