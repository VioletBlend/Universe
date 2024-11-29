import { copyFile, mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function prepareExtension() {
  try {
    // Create icons directory
    await mkdir(join(rootDir, 'dist/icons'), { recursive: true });

    // Copy manifest
    await copyFile(
      join(rootDir, 'manifest.json'),
      join(rootDir, 'dist/manifest.json')
    );

    // Copy icons
    const iconSizes = ['16', '48', '128'];
    for (const size of iconSizes) {
      await copyFile(
        join(rootDir, `public/icons/icon${size}.png`),
        join(rootDir, `dist/icons/icon${size}.png`)
      );
    }

    console.log('✅ Extension files prepared successfully');
  } catch (error) {
    console.error('❌ Error preparing extension:', error);
    process.exit(1);
  }
}

prepareExtension();