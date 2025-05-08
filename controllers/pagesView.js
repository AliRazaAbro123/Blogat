const moment = require("moment");
const blogModel = require("../models/blog");
const nodemailer = require("nodemailer");

const indexPage = async (req, res) => {
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
};

const aboutPage = (req, res) => {
  res.render("aboutUs");
};

const contactPage = (req, res) => {
  res.render("contactUs");
};

const privacyPage = (req, res) => {
  res.render("privacyPolicy");
};

const termsPage = (req, res) => {
  res.render("termsConditions");
};

const adminAuthPage = (req, res) => {
  res.render("adminAuth");
};

const adminPanelPage = async (req, res) => {
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
};

const blogCreationPage = (req, res) => {
  res.render("blogCreation");
};

const blogPage = async (req, res) => {
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
};

const categoryPage = async (req, res) => {
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
};

const editPage = async (req, res) => {
  const blogId = req.params.id;
  const blog = await blogModel.findOne({ _id: blogId });
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  res.render("updation", { blog });
};

// nodemailer config
const nodemailerConfig = async (req, res) => {
  const { name, email, message } = req.body;

  // 1. Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alirazaabro2580@gmail.com",
      pass: process.env.NODE_MAILER_PASS,
    },
  });

  // 2. Define mail options
  const mailOptions = {
    from: email,
    to: "alirazaabro2580@gmail.com",
    subject: `New Contact from ${name}`,
    text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
          `,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.send("Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong. Try again later.");
  }
};

module.exports = {
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
};
