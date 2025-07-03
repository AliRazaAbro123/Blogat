const mongoose = require("mongoose");

const subscribeSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      minlength: [5, "Email must be at least 5 characters long"],
      maxlength: [100, "Email must be at most 100 characters long"],
    },
  },
  { timestamps: true }
);

const subscribe = mongoose.model("Subscribe", subscribeSchema);

module.exports = subscribe;
