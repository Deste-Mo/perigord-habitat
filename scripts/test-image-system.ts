/**
 * Test script to verify the equipment image system
 * 
 * Usage: npx ts-node scripts/test-image-system.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getEquipmentImagePath, getEquipmentImage } from '../utils/equipmentImages';

// Sample equipment names from the data
const TEST_EQUIPMENT = [
  "Porte d'entrée",
  "Serrure et verrou de sécurité",
  "Évier",
  "Robinetterie cuisine",
  "Hotte aspirante / extracteur",
  "Cuisinière / plaque de cuisson",
  "Réfrigérateur / congélateur",
  "Baignoire",
  "Receveur de douche",
  "Chauffe-eau électrique",
  "Lavabo / vasque",
  "Cuvette WC",
  "Radiateur",
  "Fenêtres",
  "Volets",
  "Luminaire",
  "Interrupteur",
  "VMC / grille ventilation",
  "Lave-linge",
  "Lave-vaisselle",
];

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'equipment_card');

console.log('='.repeat(70));
console.log('Equipment Image System Test');
console.log('='.repeat(70));
console.log();

// Test 1: Check if directory exists
console.log('Test 1: Directory Structure');
console.log('-'.repeat(70));
if (fs.existsSync(OUTPUT_DIR)) {
  console.log('✓ Directory exists:', OUTPUT_DIR);
  
  const files = fs.readdirSync(OUTPUT_DIR);
  console.log(`✓ Files in directory: ${files.length}`);
  
  if (files.length > 0) {
    console.log('  Files:');
    files.forEach(file => {
      const stats = fs.statSync(path.join(OUTPUT_DIR, file));
      const size = (stats.size / 1024).toFixed(2);
      console.log(`    - ${file} (${size} KB)`);
    });
  } else {
    console.log('  ⚠️  No images downloaded yet');
  }
} else {
  console.log('✗ Directory does not exist:', OUTPUT_DIR);
}
console.log();

// Test 2: Test image path generation
console.log('Test 2: Image Path Generation');
console.log('-'.repeat(70));
TEST_EQUIPMENT.forEach((equipment, index) => {
  const localPath = getEquipmentImagePath(equipment);
  const fullPath = path.join(process.cwd(), 'public', localPath);
  const exists = fs.existsSync(fullPath);
  const status = exists ? '✓' : '○';
  
  console.log(`${status} ${equipment}`);
  console.log(`  → ${localPath}`);
  if (!exists) {
    console.log(`  ⚠️  Image file not found (will use fallback)`);
  }
});
console.log();

// Test 3: Check mapping coverage
console.log('Test 3: Mapping Coverage');
console.log('-'.repeat(70));
const mappedCount = TEST_EQUIPMENT.filter(eq => {
  const path = getEquipmentImagePath(eq);
  return !path.includes('default.png');
}).length;

const coverage = ((mappedCount / TEST_EQUIPMENT.length) * 100).toFixed(1);
console.log(`Mapped: ${mappedCount}/${TEST_EQUIPMENT.length} (${coverage}%)`);

if (mappedCount < TEST_EQUIPMENT.length) {
  console.log('\nEquipment without specific mapping (will use default):');
  TEST_EQUIPMENT.forEach(eq => {
    const path = getEquipmentImagePath(eq);
    if (path.includes('default.png')) {
      console.log(`  - ${eq}`);
    }
  });
}
console.log();

// Test 4: Summary
console.log('='.repeat(70));
console.log('Summary');
console.log('='.repeat(70));

const imageFiles = fs.existsSync(OUTPUT_DIR) 
  ? fs.readdirSync(OUTPUT_DIR).filter(f => f.match(/\.(png|jpg|jpeg)$/i))
  : [];

if (imageFiles.length === 0) {
  console.log('Status: ⏳ Waiting for images to be downloaded');
  console.log();
  console.log('Next steps:');
  console.log('1. Get HTML content from entretenirsonlogement.fr');
  console.log('2. Run: npx ts-node scripts/extract-image-urls.ts <html-file>');
  console.log('3. Update scripts/download-equipment-images.ts with URLs');
  console.log('4. Run: npx ts-node scripts/download-equipment-images.ts');
  console.log();
  console.log('See EQUIPMENT_IMAGES_SETUP.md for detailed instructions.');
} else {
  console.log(`Status: ✓ ${imageFiles.length} images available`);
  console.log();
  console.log('The /decouverte page can now use local images!');
  console.log('Update the page to use getEquipmentImagePath() instead of Unsplash URLs.');
}

console.log('='.repeat(70));
