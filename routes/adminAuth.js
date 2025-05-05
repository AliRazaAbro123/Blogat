const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// POST /adminAuthentication
router.post("/adminAuthentication", (req, res) => {
  const { adminName, adminEmail, adminPassword } = req.body;

  if (!adminName || !adminEmail || !adminPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const isValid =
    adminName === process.env.ADMIN_NAME &&
    adminEmail === process.env.ADMIN_EMAIL &&
    adminPassword === process.env.ADMIN_PASSWORD;

  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  try {
    const token = jwt.sign(
      { adminName, adminEmail },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Optional: set token expiration
    );

    res.cookie("token", token);

    return res.redirect("/admin/adminPanel");
  } catch (err) {
    console.error("JWT signing error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
