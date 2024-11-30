const { fetchCityData } = require("../services/generalService");
const getCityGeneralInfo = async (req, res) => {
  const cityName = req.params.cityName;
  try {
    const data = await fetchCityData(cityName);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getCityGeneralInfo };