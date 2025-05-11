// routes/index.js
const express = require("express");
const {
  indexPage,
  aboutPage,
  contactPage,
  privacyPage,
  termsPage,
  adminAuthPage,
  adminPanelPage,
  blogCreationPage,
  blogPage,
  categoryPage,
  editPage,
  nodemailerConfig,
  logoutConfig,
} = require("../controllers/pagesView");
const isAdmin = require("../middlewares/verifyAdmin");
const router = express.Router();

router.get("/", indexPage);

router.get("/About-us", aboutPage);

router.get("/Contact-us", contactPage);

router.get("/privacy-policy", privacyPage);

router.get("/terms-and-conditions", termsPage);

router.get("/AdminAuth", adminAuthPage);

router.get("/admin/adminPanel", isAdmin, adminPanelPage);

router.get("/blogCreation", isAdmin, blogCreationPage);

router.get("/blog/:id", blogPage);

router.get("/category/:name", categoryPage);

router.get("/edit/:id", isAdmin, editPage);

router.post("/userMessage", nodemailerConfig);

router.get("/logout", logoutConfig);


module.exports = router;
