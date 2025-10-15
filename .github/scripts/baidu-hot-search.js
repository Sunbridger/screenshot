const axios = require('axios');
const fs = require('fs');
const path = require('path');

const prefixDir = '../../data';

async function getBaiduHotSearch() {
  const url = 'https://top.baidu.com/board';
  const result = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/605.1.15',
    },
  });

  const pattern = /<!--s-data:(.*?)-->/s;
  const matchResult = result.data.match(pattern);
  const jsonObject = JSON.parse(matchResult[1]).cards[0].content;

  return jsonObject.map((v) => ({
    id: v.index,
    title: v.word,
    desc: v.desc,
    cover: v.img,
    author: v.show?.length ? v.show : '',
    timestamp: 0,
    hot: Number(v.hotScore || 0),
    url: 'https://www.baidu.com/s?wd=' + encodeURIComponent(v.query),
    mobileUrl: v.rawUrl,
  }));
}

async function saveDataToFile(data, filePath) {
  // 确保目录存在
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

async function main() {
  try {
    console.log('🚀 开始获取百度热搜数据...');
    const data = await getBaiduHotSearch();
    const today = new Date().toISOString().split('T')[0];
    const filePath = path.join(__dirname, prefixDir, `${today}.json`);

    await saveDataToFile(data, filePath);
    console.log(`✅ 数据已保存到: ${filePath}`);
    return filePath; // 返回文件路径便于其他模块使用
  } catch (error) {
    console.error('❌ 获取数据失败:', error);
    throw error; // 抛出错误以便调用方处理
  }
}

// 如果是直接执行（而非被 require），则运行主函数
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ 程序执行失败:', error);
    process.exit(1);
  });
}

module.exports = {
  main,
};
