// .github/scripts/screenshot.js
const webshot = require('webshot');
const fs = require('fs');
const path = require('path');

const url = 'https://sunbridger.github.io/netlify/';

async function takeScreenshot() {
  const assetsDir = path.join(__dirname, '../../assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  const outputPath = path.join(
    assetsDir,
    `screenshot-${new Date().toISOString().split('T')[0]}.png`
  );

  return new Promise((resolve, reject) => {
    webshot(
      url,
      outputPath,
      {
        screenSize: { width: 1280, height: 800 },
        shotSize: { width: 'window', height: 'all' },
        quality: 90,
        renderDelay: 3000,
        javascriptEnabled: true,
        imagesEnabled: true,

        phantomConfig: {
          'local-to-remote-url-access': true,
          'ignore-ssl-errors': true,
        },
      },
      (err) => {
        if (err) return reject(err);
        console.log(`✅ 截图保存到: ${outputPath}`);
        resolve(outputPath);
      }
    );
  });
}

takeScreenshot();

module.exports = { takeScreenshot };
