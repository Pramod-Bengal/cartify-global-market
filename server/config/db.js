const mongoose = require('mongoose');

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    console.log('Attempting MongoDB connection...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Fail after 5 seconds if not connected
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', err => {
      console.error('❌ MongoDB Runtime Error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB Disconnected');
    });

  } catch (error) {
    console.error(`❌ MongoDB Connection Error details:`, error);
    // don't exit process, just log so we can see it in Render
    // process.exit(1); 
  }
};

module.exports = connectDB; 