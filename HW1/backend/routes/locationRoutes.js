const express = require('express');
const router = express.Router();
const { getLocationInfo } = require('../controllers/locationController');

// Route to get location information about a city
router.get('/:cityName', getLocationInfo);

module.exports = router;
