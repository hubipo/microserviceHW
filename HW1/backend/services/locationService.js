const axios = require('axios');

// Service to fetch location data from QWeather API
const fetchLocationData = async (address) => {
  try {
    const API_KEY = 'fd16d97e22d94919a0cfe7411894a9ca'; // 请替换为你的 QWeather API 密钥
    const QWEATHER_URL = 'https://geoapi.qweather.com/v2/city/lookup';

    // 调用 QWeather API，获取城市信息
    const response = await axios.get(QWEATHER_URL, {
      params: {
        location: address,
        key: API_KEY,
      },
    });

    const data = response.data;

    if (data && data.code === '200' && data.location.length > 0) {
      // 提取第一个匹配到的城市信息
      const cityInfo = data.location[0];
      return {
        name: cityInfo.name,
        id: cityInfo.id,
        latitude: cityInfo.lat,
        longitude: cityInfo.lon,
        adm2: cityInfo.adm2,
        adm1: cityInfo.adm1,
        country: cityInfo.country,
        timezone: cityInfo.tz,
        utcOffset: cityInfo.utcOffset,
        type: cityInfo.type,
        rank: cityInfo.rank,
        weatherLink: cityInfo.fxLink
      };
    } else {
      throw new Error('No location data found');
    }
  } catch (error) {
    throw new Error('Failed to fetch location data: ' + error.message);
  }
};

module.exports = { fetchLocationData };
