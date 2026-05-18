# Equipment Images

This directory contains images for equipment displayed on the `/decouverte` page.

## Directory Structure

```
public/equipment_card/
├── README.md                 # This file
├── image-mapping.json        # Mapping of equipment keywords to image filenames
└── [equipment images]        # PNG/JPG images of equipment
```

## Image Sources

Images are sourced from:
- **entretenirsonlogement.fr**: Official equipment images from the Valophis website
- **Fallback**: Unsplash images (temporary, until local images are downloaded)

## Adding New Images

### Method 1: Manual Download

1. Visit https://entretenirsonlogement.fr
2. Find the equipment image you need
3. Download the image
4. Save it to this directory with a descriptive name (e.g., `porte-entree.png`)
5. Update `image-mapping.json` if needed

### Method 2: Using the Download Script

1. Open `scripts/download-equipment-images.ts`
2. Add image URLs to the `EQUIPMENT_IMAGE_URLS` object:
   ```typescript
   const EQUIPMENT_IMAGE_URLS: Record<string, string> = {
     "porte-entree.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/porte-entree.png",
     "serrure.png": "https://entretenirsonlogement.fr/wp-content/uploads/2022/11/serrure.png",
     // ... add more URLs
   };
   ```
3. Run the script:
   ```bash
   npx ts-node scripts/download-equipment-images.ts
   ```

## Image Naming Convention

Use lowercase, hyphenated names that describe the equipment:
- `porte-entree.png` - Front door
- `serrure.png` - Lock
- `robinet.png` - Faucet
- `radiateur.png` - Radiator
- `lave-vaisselle.png` - Dishwasher
- etc.

## Image Requirements

- **Format**: PNG or JPG
- **Size**: Recommended 400x400px or similar square aspect ratio
- **Quality**: Medium to high quality (suitable for web display)
- **File size**: Keep under 200KB per image for optimal loading

## Usage in Code

The `/decouverte` page uses the `getEquipmentImage()` function from `utils/equipmentImages.ts` to get the appropriate image for each equipment item.

```typescript
import { getEquipmentImage } from '@/utils/equipmentImages';

// Get image URL for an equipment
const imageUrl = getEquipmentImage("Porte d'entrée");
```

## Extracting Image URLs from HTML

If you have HTML content from entretenirsonlogement.fr with equipment cards:

1. Look for `<img>` tags or background images in the HTML
2. Extract URLs that match the pattern:
   `https://entretenirsonlogement.fr/wp-content/uploads/YYYY/MM/filename.png`
3. Add them to the download script
4. Run the download script

Example HTML pattern to look for:
```html
<img src="https://entretenirsonlogement.fr/wp-content/uploads/2022/11/equipment-name.png" alt="Equipment Name">
```

## Current Status

- ✅ Directory structure created
- ✅ Image mapping system implemented
- ✅ Download script created
- ⏳ Waiting for image URLs from entretenirsonlogement.fr HTML content
- ⏳ Images to be downloaded

## Next Steps

1. Obtain the HTML content with image URLs from entretenirsonlogement.fr
2. Extract all image URLs
3. Add URLs to the download script
4. Run the download script to fetch all images
5. Update the `/decouverte` page to use local images instead of Unsplash fallbacks
