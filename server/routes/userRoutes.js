const express = require('express');
const { updateUser } = require('../controllers/userController');
const { protect } = require('../controllers/authController');

const router = express.Router();

// PUT /api/user/update
router.put('/update', protect, updateUser);

module.exports = router; 