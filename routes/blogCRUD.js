const express = require("express");
const {
  blogCreation,
  blogDeletation,
  blogEditation,
} = require("../controllers/blogCrud");

const router = express.Router();

router.post("/blogCreation", blogCreation);

router.get("/delete/:id", blogDeletation);

router.post("/edit/:id", blogEditation);

module.exports = router;
