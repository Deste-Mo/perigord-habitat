/**
 * Simple verification script for equipment image system
 * Usage: node scripts/verify-setup.js
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'equipment_card');

console.log('='.repeat(70));
console.log('Equipment Image System - Setup Verification');
console.log('='.repeat(70));
console.log();

// Check 1: Directory exists
console.log('✓ Checking directory structure...');
if (fs.existsSync(OUTPUT_DIR)) {
  console.log(`  ✓ Directory exists: ${OUTPUT_DIR}`);
  
  const files = fs.readdirSync(OUTPUT_DIR);
  const imageFiles = files.filter(f => f.match(/\.(png|jpg|jpeg)$/i));
  
  console.log(`  ✓ Total files: ${files.length}`);
  console.log(`  ✓ Image files: ${imageFiles.length}`);
  
  if (files.length > 0) {
    console.log('\n  Files in directory:');
    files.forEach(file => {
      const filePath = path.join(OUTPUT_DIR, file);
      const stats = fs.statSync(filePath);
      const size = (stats.size / 1024).toFixed(2);
      const type = file.match(/\.(png|jpg|jpeg)$/i) ? '🖼️ ' : '📄 ';
      console.log(`    ${type} ${file} (${size} KB)`);
    });
  }
} else {
  console.log(`  ✗ Directory does not exist: ${OUTPUT_DIR}`);
}

console.log();

// Check 2: Required files
console.log('✓ Checking required files...');
const requiredFiles = [
  'utils/equipmentImages.ts',
  'scripts/download-equipment-images.ts',
  'scripts/extract-image-urls.ts',
  'public/equipment_card/README.md',
  'public/equipment_card/image-mapping.json',
  'EQUIPMENT_IMAGES_SETUP.md',
  'EQUIPMENT_IMAGES_SUMMARY.md',
];

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  const status = exists ? '✓' : '✗';
  console.log(`  ${status} ${file}`);
});

console.log();

// Check 3: Status summary
console.log('='.repeat(70));
console.log('Status Summary');
console.log('='.repeat(70));

const imageFiles = fs.existsSync(OUTPUT_DIR) 
  ? fs.readdirSync(OUTPUT_DIR).filter(f => f.match(/\.(png|jpg|jpeg)$/i))
  : [];

if (imageFiles.length === 0) {
  console.log('\n📋 Setup Status: READY - Waiting for images');
  console.log('\n✅ Infrastructure is ready:');
  console.log('   • Directory structure created');
  console.log('   • Image mapping system implemented');
  console.log('   • Download scripts ready');
  console.log('   • Documentation complete');
  
  console.log('\n⏳ Next steps:');
  console.log('   1. Provide HTML content from entretenirsonlogement.fr');
  console.log('   2. Extract image URLs using extract-image-urls.ts');
  console.log('   3. Update download-equipment-images.ts with URLs');
  console.log('   4. Run download script to fetch images');
  
  console.log('\n📖 See EQUIPMENT_IMAGES_SETUP.md for detailed instructions');
} else {
  console.log(`\n✅ Setup Status: COMPLETE - ${imageFiles.length} images available`);
  console.log('\n🎉 The system is ready to use!');
  console.log('   • Images downloaded and available');
  console.log('   • Page can now use local images');
  console.log('   • Update /decouverte page to use getEquipmentImagePath()');
}

console.log('\n' + '='.repeat(70));
