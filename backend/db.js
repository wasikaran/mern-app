const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/iNotebook"; // <-- Add DB name here

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Successfully connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

module.exports = connectToMongo;
