const Address = require('../models/Address');

exports.saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json({ status: 'success', address });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
}; 