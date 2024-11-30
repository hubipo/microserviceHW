const { fetchLocationData } = require('../services/locationService');

// Controller to handle fetching location information
const getLocationInfo = async (req, res) => {
  const cityName = req.params.cityName;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const data = await fetchLocationData(cityName);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getLocationInfo };
