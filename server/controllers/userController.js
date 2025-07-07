const User = require('../models/User');

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, phone, location, password, gender } = req.body;
    const updateFields = { name, email, phone, location, gender };
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

exports.getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    res.status(200).json({ status: 'success', user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
}; 