const User = require('../models/User');

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, phone, location, password } = req.body;
    const updateFields = { name, email, phone, location };
    if (password) {
      updateFields.password = password;
    }
    // { new: true } returns the updated document
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    res.status(200).json({ status: 'success', user: updatedUser });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
}; 