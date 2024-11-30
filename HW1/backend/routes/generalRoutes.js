// 5. routes/generalRoutes.js - Define Routes for General Information
const express = require('express');
const router = express.Router();
const { getCityGeneralInfo } = require('../controllers/generalController');

// Route to get general information about a city
router.get('/:cityName', getCityGeneralInfo);

module.exports = router;
