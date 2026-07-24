const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri || /localhost|127\.0\.0\.1/i.test(mongoUri)) {
      process.env.USE_MEMORY_DB = 'true';
      console.warn('⚠️ Local MongoDB not configured. Using in-memory auth/resume fallback for development.');
      return;
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    process.env.USE_MEMORY_DB = 'false';
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.env.USE_MEMORY_DB = 'true';
    console.warn('⚠️ Falling back to local in-memory auth/resume mode. Configure MONGO_URI for production deployment.');
  }
};

module.exports = connectDB;
