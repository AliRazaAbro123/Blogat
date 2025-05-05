// routes/index.js
const express = require("express");
const moment = require("moment");
const blogModel = require("../models/blog");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res) => {
  const blogs = await blogModel.find();
  // moment js code fro date formating
  const createdAt = moment(blogs.createdAt);

  let displayDate;
  if (createdAt.isSame(moment(), "day")) {
    displayDate = "Today";
  } else if (createdAt.isSame(moment().subtract(1, "day"), "day")) {
    displayDate = "Yesterday";
  } else {
    displayDate = createdAt.format("D/M/YYYY"); // e.g., 2/4/2025
  }
  // moment js code fro date formating
  res.render("index", { blogs, displayDate });
});

router.get("/About-us", (req, res) => {
  res.render("aboutUs");
});

router.get("/Contact-us", (req, res) => {
  res.render("contactUs");
});

router.get("/privacy-policy", (req, res) => {
  res.render("privacyPolicy");
});

router.get("/terms-and-conditions", (req, res) => {
  res.render("termsConditions");
});

router.get("/AdminAuth", (req, res) => {
  res.render("adminAuth");
});

router.get("/admin/adminPanel", async (req, res) => {
  const blogs = await blogModel.find();

  // moment js code fro date formating
  const createdAt = moment(blogs.createdAt);

  let displayDate;
  if (createdAt.isSame(moment(), "day")) {
    displayDate = "Today";
  } else if (createdAt.isSame(moment().subtract(1, "day"), "day")) {
    displayDate = "Yesterday";
  } else {
    displayDate = createdAt.format("D/M/YYYY"); // e.g., 2/4/2025
  }
  // moment js code fro date formating

  res.render("adminPanel", { blogs, displayDate });
});

router.get("/blogCreation", (req, res) => {
  res.render("blogCreation");
});

router.get("/blog/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await blogModel.findOne({ _id: blogId });
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  // moment js code fro date formating
  const createdAt = moment(blog.createdAt);

  let displayDate;
  if (createdAt.isSame(moment(), "day")) {
    displayDate = "Today";
  } else if (createdAt.isSame(moment().subtract(1, "day"), "day")) {
    displayDate = "Yesterday";
  } else {
    displayDate = createdAt.format("D/M/YYYY"); // e.g., 2/4/2025
  }
  // moment js code fro date formating
  res.render("blog", { blog, displayDate });
});

router.get("/category/:name", async (req, res) => {
  try {
    const categoryName = req.params.name;

    const categorizedBlogs = await blogModel.find({
      category: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });
    // moment js code fro date formating
    const createdAt = moment(categorizedBlogs.createdAt);

    let displayDate;
    if (createdAt.isSame(moment(), "day")) {
      displayDate = "Today";
    } else if (createdAt.isSame(moment().subtract(1, "day"), "day")) {
      displayDate = "Yesterday";
    } else {
      displayDate = createdAt.format("D/M/YYYY"); // e.g., 2/4/2025
    }
    // moment js code fro date formating
    res.render("category", { categorizedBlogs, displayDate, categoryName });
  } catch (error) {
    console.error("Error fetching categorized blogs:", error);
    res.status(500).send("Server error");
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.q || "";
  try {
    const blogs = await blogModel
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { tags: { $regex: query, $options: "i" } },
        ],
      })
      .sort({ createdAt: -1 });

    res.render("partials/searchResults", { blogs }); // partial view for AJAX
  } catch (err) {
    res.status(500).send("Error searching blogs");
  }
});

router.get("/edit/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await blogModel.findOne({ _id: blogId });
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  res.render("updation", { blog });
});

module.exports = router;
