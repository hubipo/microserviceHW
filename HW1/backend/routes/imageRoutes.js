const express = require('express');
const router = express.Router();
const { getCityImage } = require('../controllers/imageController');

// Route to get image for a city
router.get('/:cityName', getCityImage);

module.exports = router;
