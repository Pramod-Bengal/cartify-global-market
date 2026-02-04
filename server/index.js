require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const addressRoutes = require('./routes/addressRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// Middleware
app.use(cors({
  origin: '*', // Allow all origins for debugging
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));
app.use(express.json());

// API Key Middleware
// app.use((req, res, next) => {
//   const apiKey = req.headers['x-api-key'];
//   if (apiKey !== process.env.MY_SECRET_API_KEY) {
//     return res.status(401).json({ status: 'error', message: 'Invalid API key' });
//   }
//   next();
// });

// Global Error Handlers (Prevent Crash)
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  // Ideally, restart service
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  // Ideally, restart service
});

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).send('API is running successfully!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Environment Check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'MISSING ❌');
  console.log('- JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'MISSING ❌');
  console.log('- MY_SECRET_API_KEY:', process.env.MY_SECRET_API_KEY ? 'Set' : 'MISSING ❌');
}); 