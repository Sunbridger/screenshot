const axios = require('axios');


// 发送 Bark 通知
async function sendBarkNotification({
  title,
  body,
  sound = 'minuet',
  level = 'timeSensitive',
}) {
  // 发到七彩
  const response = await axios.post(
    `https://api.day.app/v6uB3nv2iAyYpqvWv3YJEh`,
    {
      title,
      body,
      sound,
      level,
    }
  );

  return response.data;
}

module.exports = sendBarkNotification;
