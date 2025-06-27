const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully ✅✅✅");
  } catch (error) {
    console.error("Database connection has failed due to:", error);
    process.exit(1);
  }
};

module.exports = databaseConnection;
