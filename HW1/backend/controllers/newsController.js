const { fetchNewsData } = require('../services/newsService');
const getCityNews = async (req, res) => {
  const cityName = req.params.cityName;
  try {
    const data = await fetchNewsData(cityName);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getCityNews };