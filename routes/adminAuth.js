const express = require("express");
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
  // Set session
  return res.redirect("/admin/adminPanel");
});

module.exports = router;
