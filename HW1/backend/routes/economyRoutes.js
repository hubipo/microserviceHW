const express = require('express');
const router = express.Router();
const { getCityEconomyInfo } = require('../controllers/economyController');

router.get('/:cityName', getCityEconomyInfo);

module.exports = router;
