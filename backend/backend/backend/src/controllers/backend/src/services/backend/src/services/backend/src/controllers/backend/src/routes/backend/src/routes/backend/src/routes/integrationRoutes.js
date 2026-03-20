const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAddress, getWeather } = require('../controllers/integrationController');

const router = express.Router();

router.get('/cep/:cep', authMiddleware, getAddress);
router.get('/weather/:date', authMiddleware, getWeather);

module.exports = router;
