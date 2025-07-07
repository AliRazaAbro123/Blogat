// routes/index.js
const express = require("express");
const {
  indexPage,
  aboutPage,
  contactPage,
  privacyPage,
  termsPage,
  adminPanelPage,
  blogCreationPage,
  blogPage,
  categoryPage,
  editPage,
  nodemailerConfig,
  analyticsPage,
} = require("../controllers/pagesView");
const { subscribe } = require("../controllers/UserConfig");
const router = express.Router();

router.get("/", indexPage);

router.get("/About", aboutPage);

router.get("/Contact", contactPage);

router.get("/privacy-policy", privacyPage);

router.get("/terms-and-conditions", termsPage);

router.get("/admin/adminPanel", adminPanelPage);

router.get("/blogCreation", blogCreationPage);

router.get("/blog/:id", blogPage);

router.get("/category/:name", categoryPage);

router.get("/edit/:id", editPage);

router.post("/userMessage", nodemailerConfig);

router.post("/subscribe", subscribe);

router.get("/Analytics", analyticsPage);

module.exports = router;
