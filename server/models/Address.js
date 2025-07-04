const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  pincode: { type: String, required: true },
  locality: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  landmark: String,
  alternatePhone: String,
  addressType: { type: String, enum: ['Home', 'Work'], default: 'Home' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Address', addressSchema); 