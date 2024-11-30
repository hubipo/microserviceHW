const express = require('express');
const router = express.Router();
const { getTouristSpots } = require('../controllers/touristController');

// 路由：获取城市的旅游景点信息
router.get('/:cityName', getTouristSpots);

module.exports = router;
