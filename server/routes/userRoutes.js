const express = require('express');
const { updateUser, getMe } = require('../controllers/userController');
const { protect } = require('../controllers/authController');

const router = express.Router();

// PUT /api/user/update
router.put('/update', protect, updateUser);
router.get('/me', protect, getMe);

module.exports = router; 