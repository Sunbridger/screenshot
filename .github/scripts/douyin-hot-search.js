const axios = require('axios');
const fs = require('fs');
const path = require('path');

const douyinPrefixDir = '../../data-douyin';

// 获取抖音临时 Cookis
const getDyCookies = async () => {
  try {
    const cookisUrl =
      'https://www.douyin.com/passport/general/login_guiding_strategy/?aid=6383';
    const { data } = await axios.get(cookisUrl, { originaInfo: true });
    const pattern = /passport_csrf_token=(.*); Path/s;
    const matchResult = data.headers['set-cookie'][0].match(pattern);
    const cookieData = matchResult[1];
    return cookieData;
  } catch (error) {
    console.error('获取抖音 Cookie 出错' + error);
    return undefined;
  }
};

async function getDouyinHotSearch() {
  const url =
    'https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1';
  const cookie = await getDyCookies();

  const result = await axios.get(url, {
    headers: {
      Cookie: `passport_csrf_token=${cookie}`,
    },
  });

  const list = result?.data?.data?.word_list;

  return list?.map((v) => ({
    id: v.sentence_id,
    title: v.word,
    timestamp: v.event_time,
    hot: v.hot_value,
    url: `https://www.douyin.com/hot/${v.sentence_id}`,
    mobileUrl: `https://www.douyin.com/hot/${v.sentence_id}`,
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
    console.log('🚀 开始获取抖音热搜数据...');
    const data = await getDouyinHotSearch();
    const today = new Date().toISOString().split('T')[0];
    const filePath = path.join(__dirname, douyinPrefixDir, `${today}.json`);

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
