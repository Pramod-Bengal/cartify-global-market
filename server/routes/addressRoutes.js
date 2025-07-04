const express = require('express');
const { saveAddress } = require('../controllers/addressController');
const router = express.Router();

router.post('/add', saveAddress);

module.exports = router; 