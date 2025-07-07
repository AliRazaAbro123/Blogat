const mongoose = require("mongoose");
const subscribeSchema = require("../models/subscribe");

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if email already exists
    const existing = await subscribeSchema.findOne({ email });

    if (existing) {
      // Already subscribed
      return res.status(200).json({ message: "You're already subscribed!" });
    }

    // 2. Save new subscription
    const newSub = new subscribeSchema({ email });
    await newSub.save();

    res.status(200).json({ message: "Subscription successful!" });
  } catch (err) {
    res.status(500).json({ message: `Subscription failed! : ${err.message}` });
  }
};

module.exports = {
  subscribe,
};
