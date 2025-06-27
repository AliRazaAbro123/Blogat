const mongoose = require("mongoose");

const connectWithRetry = async (retries = 5, delay = 3000) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);

    if (retries === 0) {
      console.error("❗ All retry attempts failed. Exiting...");
      process.exit(1);
    }

    console.log(`🔁 Retrying to connect in ${delay / 1000}s... (${retries} retries left)`);
    setTimeout(() => connectWithRetry(retries - 1, delay), delay);
  }
};

const setupMongoEventListeners = () => {
  const db = mongoose.connection;

  db.on("connected", () => {
    console.log("📡 MongoDB event: connected");
  });

  db.on("error", (err) => {
    console.error("🚨 MongoDB event: error", err.message);
  });

  db.on("disconnected", () => {
    console.warn("⚠️ MongoDB event: disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("🛑 MongoDB connection closed on app termination");
    process.exit(0);
  });
};

const databaseConnection = async () => {
  setupMongoEventListeners();
  await connectWithRetry();
};

module.exports = databaseConnection;