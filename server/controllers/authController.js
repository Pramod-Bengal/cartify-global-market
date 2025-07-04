const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = async (req, res) => {
  console.log('Signup request body:', req.body); // Debugging line
  try {
    const { name, email, phone, password, location } = req.body;
    const query = [{ email }];
    if (phone) query.push({ phone });
    const existingUser = await User.findOne({ $or: query });
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'User already exists' });
    }
    const newUser = await User.create({ name, email, phone, password, location });
    const token = signToken(newUser._id);
    res.status(201).json({ status: 'success', token, user: newUser });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { phone }] }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ status: 'error', message: 'Incorrect credentials' });
    }
    const token = signToken(user._id);
    res.status(200).json({ status: 'success', token, user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'You are not logged in. Please log in to get access.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid token. Please log in again.'
    });
  }
}; 