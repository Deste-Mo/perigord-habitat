/**
 * Script to extract image URLs from HTML content
 * 
 * Usage:
 * 1. Save the HTML content from entretenirsonlogement.fr to a file (e.g., content.html)
 * 2. Run: npx ts-node scripts/extract-image-urls.ts <path-to-html-file>
 * 
 * Or paste HTML content directly when prompted.
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Extract image URLs from HTML content
 */
function extractImageUrls(html: string): string[] {
  const urls: string[] = [];
  
  // Pattern 1: <img src="...">
  const imgTagRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  
  while ((match = imgTagRegex.exec(html)) !== null) {
    const url = match[1];
    if (url.includes('entretenirsonlogement.fr') && url.includes('wp-content/uploads')) {
      urls.push(url);
    }
  }
  
  // Pattern 2: background-image: url(...)
  const bgImageRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi;
  
  while ((match = bgImageRegex.exec(html)) !== null) {
    const url = match[1];
    if (url.includes('entretenirsonlogement.fr') && url.includes('wp-content/uploads')) {
      urls.push(url);
    }
  }
  
  // Pattern 3: style="background: url(...)"
  const styleBgRegex = /style=["'][^"']*background[^"']*url\(["']?([^"')]+)["']?\)[^"']*["']/gi;
  
  while ((match = styleBgRegex.exec(html)) !== null) {
    const url = match[1];
    if (url.includes('entretenirsonlogement.fr') && url.includes('wp-content/uploads')) {
      urls.push(url);
    }
  }
  
  // Remove duplicates
  return [...new Set(urls)];
}

/**
 * Generate filename from URL
 */
function generateFilename(url: string): string {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const filename = path.basename(pathname);
  
  // Clean up filename
  return filename.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
}

/**
 * Generate TypeScript code for the download script
 */
function generateDownloadScriptCode(urls: string[]): string {
  const entries = urls.map(url => {
    const filename = generateFilename(url);
    return `  "${filename}": "${url}",`;
  }).join('\n');
  
  return `const EQUIPMENT_IMAGE_URLS: Record<string, string> = {
${entries}
};`;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  let html: string;
  
  if (args.length > 0) {
    // Read from file
    const filePath = args[0];
    
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`);
      process.exit(1);
    }
    
    console.log(`Reading HTML from: ${filePath}\n`);
    html = fs.readFileSync(filePath, 'utf-8');
  } else {
    // Read from stdin
    console.log('Paste HTML content (press Ctrl+D when done):');
    html = fs.readFileSync(0, 'utf-8');
  }
  
  console.log('Extracting image URLs...\n');
  const urls = extractImageUrls(html);
  
  if (urls.length === 0) {
    console.log('⚠️  No image URLs found in the HTML content.');
    console.log('Make sure the HTML contains images from entretenirsonlogement.fr');
    return;
  }
  
  console.log(`Found ${urls.length} image URLs:\n`);
  
  // Display URLs
  urls.forEach((url, index) => {
    const filename = generateFilename(url);
    console.log(`${index + 1}. ${filename}`);
    console.log(`   ${url}\n`);
  });
  
  // Generate code
  console.log('\n' + '='.repeat(70));
  console.log('Copy this code to scripts/download-equipment-images.ts:');
  console.log('='.repeat(70) + '\n');
  console.log(generateDownloadScriptCode(urls));
  console.log('\n' + '='.repeat(70));
  
  // Save to file
  const outputFile = 'scripts/extracted-urls.json';
  const urlMap: Record<string, string> = {};
  urls.forEach(url => {
    const filename = generateFilename(url);
    urlMap[filename] = url;
  });
  
  fs.writeFileSync(outputFile, JSON.stringify(urlMap, null, 2));
  console.log(`\n✓ URLs saved to: ${outputFile}`);
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { extractImageUrls, generateFilename };
