// weatherController.js
const { fetchLocationData } = require('../services/locationService');
const { fetchWeatherData } = require('../services/weatherService');

// Controller to handle fetching weather information
const getWeatherInfo = async (req, res) => {
  const cityName = req.params.cityName;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // 先获取城市的经纬度
    const locationData = await fetchLocationData(cityName);
    const { latitude, longitude } = locationData;

    // 然后使用经纬度获取天气信息
    const weatherData = await fetchWeatherData(latitude, longitude);
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getWeatherInfo };
