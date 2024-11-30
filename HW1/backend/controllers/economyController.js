const { fetchCityEconomyData } = require('../services/economyService');

// Controller to handle fetching economic information about a city
const getCityEconomyInfo = async (req, res) => {
  const cityName = req.params.cityName;
  try {
    // 获取城市经济信息
    const data = await fetchCityEconomyData(cityName);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCityEconomyInfo };
