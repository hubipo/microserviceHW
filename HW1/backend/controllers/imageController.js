const { fetchImageData } = require('../services/imageService');

// Controller to handle fetching image data for a city
const getCityImage = async (req, res) => {
  const cityName = req.params.city;
  try {
    const imageData = await fetchImageData(cityName);
    res.status(200).json(imageData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image', details: error.message });
  }
};

module.exports = { getCityImage };
