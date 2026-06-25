const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

async function generate() {
  const inputPath = path.join(__dirname, 'public', 'logo-deiratna.png');
  const publicDir = path.join(__dirname, 'public');

  try {
    // Read the image, flatten it if it has transparency over white to make trimming robust, 
    // but the logo might be transparent. Let's just use trim().
    // We want the icon version without unnecessary whitespace.
    
    // First let's create a trimmed square version
    const trimmedBuffer = await sharp(inputPath)
      .trim({ threshold: 40 }) // remove surrounding whitespace/transparency
      .toBuffer();

    // Now we want to place it in a square container.
    // If we want it to fill the square, we can resize with fit: 'contain' and a transparent background.
    const createIcon = async (size, name) => {
      const outPath = path.join(publicDir, name);
      await sharp(trimmedBuffer)
        .resize({
          width: size,
          height: size,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ quality: 100 })
        .toFile(outPath);
      console.log(`Created ${name}`);
    };

    await createIcon(16, 'favicon-16x16.png');
    await createIcon(32, 'favicon-32x32.png');
    await createIcon(180, 'apple-touch-icon.png');
    await createIcon(192, 'android-chrome-192x192.png');
    await createIcon(512, 'android-chrome-512x512.png');

    // Create favicon.ico from 32x32 (or multiple sizes)
    const buf = await pngToIco([
      path.join(publicDir, 'favicon-16x16.png'),
      path.join(publicDir, 'favicon-32x32.png')
    ]);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buf);
    console.log('Created favicon.ico in public folder');

  } catch (err) {
    console.error(err);
  }
}

generate();
