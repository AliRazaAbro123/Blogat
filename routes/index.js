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
} = require("../controllers/pagesView");
const router = express.Router();

router.get("/", indexPage);

router.get("/About", aboutPage);

router.get("/Contact", contactPage);

router.get("/privacy-policy", privacyPage);

router.get("/terms-and-conditions", termsPage);

router.get("/AdminAuth", adminAuthPage);

router.get("/admin/adminPanel", adminPanelPage);

router.get("/blogCreation", blogCreationPage);

router.get("/blog/:id", blogPage);

router.get("/category/:name", categoryPage);

router.get("/edit/:id", editPage);

router.post("/userMessage", nodemailerConfig)


module.exports = router;
