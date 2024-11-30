const express = require('express');
const router = express.Router();
const { getWeatherInfo } = require('../controllers/weatherController');


router.get('/:cityName', getWeatherInfo);

module.exports = router;
