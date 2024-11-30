const { fetchTouristSpots } = require('../services/touristService');

// 控制器：处理获取城市旅游景点信息
const getTouristSpots = async (req, res) => {
  const cityName = req.params.cityName;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // 使用服务层获取旅游景点信息
    const spots = await fetchTouristSpots(cityName);
    res.status(200).json(spots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTouristSpots };
