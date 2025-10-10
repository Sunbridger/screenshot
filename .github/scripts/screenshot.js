// .github/scripts/screenshot.js
const webshot = require('webshot');
const fs = require('fs');
const path = require('path');

const url = 'https://sunbridger.github.io/netlify/';

async function takeScreenshot() {
  const assetsDir = path.join(__dirname, '../../assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  const today = new Date().toISOString().split('T')[0];
  const outputPath = path.join(assetsDir, `screenshot-${today}.png`);

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
        resolve({ path: outputPath, date: today });
      }
    );
  });
}

function updateReadmeWithScreenshot(screenshotInfo) {
  const readmePath = path.join(__dirname, '../../README.md');

  if (!fs.existsSync(readmePath)) {
    console.log('❌ README.md 文件不存在');
    return false;
  }

  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  // 截图标记
  const screenshotSectionStart = '<!--START_SECTION:screehshot-->';
  const screenshotSectionEnd = '<!--END_SECTION:screehshot-->';

  const screenshotMarkdown = `\n## 📸 每日截图\n\n**截图日期: ${
    screenshotInfo.date
  }**\n\n![每日截图](./assets/screenshot-${
    screenshotInfo.date
  }.png)\n\n*最后更新: ${new Date().toISOString()}*\n`;

  // 检查是否存在截图区域
  if (
    readmeContent.includes(screenshotSectionStart) &&
    readmeContent.includes(screenshotSectionEnd)
  ) {
    // 更新现有截图区域
    const regex = new RegExp(
      `${screenshotSectionStart}[\\s\\S]*?${screenshotSectionEnd}`
    );
    readmeContent = readmeContent.replace(
      regex,
      `${screenshotSectionStart}${screenshotMarkdown}${screenshotSectionEnd}`
    );
  } else {
    // 在文件末尾添加截图区域
    readmeContent += `\n\n${screenshotSectionStart}${screenshotMarkdown}${screenshotSectionEnd}`;
  }

  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  console.log('✅ README.md 已更新截图信息');
  return true;
}

async function main() {
  try {
    console.log('🔄 开始截图流程...');

    // 截图
    const screenshotInfo = await takeScreenshot();

    // 更新README
    const updated = updateReadmeWithScreenshot(screenshotInfo);

    if (updated) {
      console.log('🎉 截图和README更新完成');
    } else {
      console.log('⚠️ 截图完成，但README更新失败');
    }

    return updated;
  } catch (error) {
    console.error('❌ 截图流程出错:', error);
    throw error;
  }
}

// 如果是直接运行，不是被导入
if (require.main === module) {
  main();
}

module.exports = { takeScreenshot, updateReadmeWithScreenshot, main };
