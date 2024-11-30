const express = require('express');
const router = express.Router();
const { getCityNews } = require('../controllers/newsController');


router.get('/:cityName', getCityNews);

module.exports = router;
