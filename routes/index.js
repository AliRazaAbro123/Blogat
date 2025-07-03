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
const subscribeSchema = require("../models/subscribe");
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

router.post("/userMessage", nodemailerConfig);

router.post("/subscribe", (req, res) => {
  const subscribe = new subscribeSchema({
    email: req.body.email,
  });

  subscribe
    .save()
    .then(() => {
      res.status(200).json({ message: "Subscription successful!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Subscription failed!", error: err });
    });
});


module.exports = router;
