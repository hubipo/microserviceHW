const axios = require('axios');


const fetchWeatherData = async (latitude, longitude) => {
  try {
    const WEATHER_API_KEY = 'fd16d97e22d94919a0cfe7411894a9ca'; 
    const WEATHER_API_URL = 'https://devapi.qweather.com/v7/weather/3d'; // 获取3天天气预报

    // 请求天气数据
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        location: `${longitude},${latitude}`,
        key: WEATHER_API_KEY,
      },
    });

    const weatherData = response.data;

    // 检查 API 响应是否成功
    if (weatherData && weatherData.code === '200') {
      // 仅返回所需的天气信息字段
      return weatherData.daily.map(day => ({
        tempMax: day.tempMax,               // 预报当天最高温度
        tempMin: day.tempMin,               // 预报当天最低温度
        windDirDay: day.windDirDay,         // 预报白天风向
        windScaleDay: day.windScaleDay,     // 预报白天风力等级
        textDay: day.textDay,               // 预报白天天气状况
        textNight: day.textNight,           // 预报晚间天气状况
        uvIndex: day.uvIndex                // 紫外线强度指数
      }));
    } else {
      throw new Error('Failed to fetch weather data');
    }
  } catch (error) {
    throw new Error('Failed to fetch weather data: ' + error.message);
  }
};

module.exports = { fetchWeatherData };
