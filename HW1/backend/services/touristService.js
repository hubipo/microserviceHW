const axios = require('axios');

// 服务层：从百度地图 API 获取城市的旅游景点信息
const fetchTouristSpots = async (cityName) => {
  try {
    const BAIDU_API_KEY = 'UJYroE7lSJrfCSIvX1mxV9mn3KYtRbbL'; // 请替换为你的百度地图 API 密钥
    const BAIDU_URL = 'https://api.map.baidu.com/place/v2/search';

    // 请求百度地图 API 获取旅游景点数据
    const response = await axios.get(BAIDU_URL, {
      params: {
        query: '旅游景点',
        region: cityName,
        output: 'json',
        ak: BAIDU_API_KEY,
      },
    });

    const data = response.data;
    //console.log('Response Data:', response.data);
    // 检查 API 响应是否成功
    if (data && data.status === 0 && data.results.length > 0) {
      // 只返回需要的字段
      return data.results.map((result) => ({
        name: result.name,
        address: result.address,
        city: result.city,
        area: result.area,
        telephone: result.telephone || "无",
      }));
    } else {
      throw new Error('No tourist spots found for the given city');
    }
  } catch (error) {
    throw new Error('Failed to fetch tourist spots: ' + error.message);
  }
};

module.exports = { fetchTouristSpots };
