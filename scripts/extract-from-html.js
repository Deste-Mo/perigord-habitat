/**
 * Extract image URLs from the provided HTML
 */

const fs = require('fs');
const path = require('path');

// HTML content with image URLs
const htmlContent = `${process.argv[2] || ''}`;

// Extract all image URLs
const regex = /https:\/\/entretenirsonlogement\.fr\/wp-content\/uploads\/[^"'\s]+\.(png|jpg|jpeg)/gi;
const urls = new Set();
let match;

while ((match = regex.exec(htmlContent)) !== null) {
  urls.add(match[0]);
}

const urlArray = [...urls];

console.log(`Found ${urlArray.length} unique image URLs\n`);

// Create mapping for download script
const urlMap = {};
urlArray.forEach(url => {
  const filename = path.basename(url);
  const cleanName = filename.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
  urlMap[cleanName] = url;
});

// Save to file
fs.writeFileSync('scripts/extracted-image-urls.json', JSON.stringify(urlMap, null, 2));

console.log('URLs saved to scripts/extracted-image-urls.json');
console.log('\nSample URLs:');
urlArray.slice(0, 5).forEach(url => console.log(`  - ${url}`));
