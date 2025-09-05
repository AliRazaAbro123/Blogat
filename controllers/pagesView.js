const moment = require("moment");
const blogModel = require("../models/blog");
const nodemailer = require("nodemailer");
const subscribedUsersModel = require("../models/subscribe");

const indexPage = async (req, res) => {
  try {
    const perPage = 7; 
    const page = parseInt(req.query.page) || 1;

    // Count total blogs
    const totalBlogs = await blogModel.countDocuments();

    // Fetch blogs with skip + limit
    const blogs = await blogModel
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    // Format dates for each blog
    const formattedBlogs = blogs.map((blog) => {
      let displayDate;
      if (moment(blog.createdAt).isSame(moment(), "day")) {
        displayDate = "Today";
      } else if (moment(blog.createdAt).isSame(moment().subtract(1, "day"), "day")) {
        displayDate = "Yesterday";
      } else {
        displayDate = moment(blog.createdAt).format("D/M/YYYY");
      }

      return { ...blog.toObject(), displayDate };
    });

    res.render("index", {
      blogs: formattedBlogs,
      current: page,
      pages: Math.ceil(totalBlogs / perPage),
      pageTitle: "BLOGAT - Home",
      cssPath: "../stylesheets/index.css",
    });
  } catch (error) {
    console.log("Error fetching blogs", error);
    res.status(500).send("Internal Server Error");
  }
};


const aboutPage = (req, res) => {
  res.render("about", {
    pageTitle: "BLOGAT - About Us",
    cssPath: "../stylesheets/aboutUs.css",
  });
};

const contactPage = (req, res) => {
  res.render("contact", {
    pageTitle: "BLOGAT - Contact",
    cssPath: "../stylesheets/contactUs.css",
  });
};

const privacyPage = (req, res) => {
  res.render("Privacy-policy", {
    pageTitle: "BLOGAT - Privacy Policy",
    cssPath: "../stylesheets/privacy.css",
  });
};

const termsPage = (req, res) => {
  res.render("Privacy-policy", {
    pageTitle: "BLOGAT - Terms of Service",
    cssPath: "../stylesheets/privacy.css",
  });
};

const adminPanelPage = async (req, res) => {
  try {
    const perPage = 10; // show 10 blogs per page in admin
    const page = parseInt(req.query.page) || 1;

    // Count total blogs
    const totalBlogs = await blogModel.countDocuments();

    // Fetch paginated blogs
    const blogs = await blogModel
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    // Format dates for each blog
    const formattedBlogs = blogs.map((blog) => {
      let displayDate;
      if (moment(blog.createdAt).isSame(moment(), "day")) {
        displayDate = "Today";
      } else if (moment(blog.createdAt).isSame(moment().subtract(1, "day"), "day")) {
        displayDate = "Yesterday";
      } else {
        displayDate = moment(blog.createdAt).format("D/M/YYYY");
      }
      return { ...blog.toObject(), displayDate };
    });

    res.render("adminPanel", {
      blogs: formattedBlogs,
      current: page,
      pages: Math.ceil(totalBlogs / perPage),
      pageTitle: "BLOGAT - Admin Panel",
      cssPath: "../stylesheets/adminPanel.css",
    });
  } catch (error) {
    console.log("Error fetching blogs", error);
    res.status(500).send("Internal Server Error");
  }
};


const blogCreationPage = (req, res) => {
  res.render("blogCreation", {
    pageTitle: "BLOGAT - Create Blog",
    cssPath: "../stylesheets/blogCreation.css",
  });
};

const blogPage = async (req, res) => {
  try {
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
    res.render("blog", {
      blog,
      displayDate,
      pageTitle: `BLOGAT - ${blog.title}`,
      cssPath: "../stylesheets/blog.css",
    });
  } catch (error) {
    console.log("Error fetching blog", error);
    res.status(500).send("Internal Server Error");
  }
};

const categoryPage = async (req, res) => {
  try {
    const categoryName = req.params.name;

    const categorizedBlogs = await blogModel.find({
      category: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    // Format dates for each blog using Moment.js
    const blogsWithDisplayDate = categorizedBlogs.map((blog) => {
      const createdAt = moment(blog.createdAt);
      let displayDate;

      if (createdAt.isSame(moment(), "day")) {
        displayDate = "Today";
      } else if (createdAt.isSame(moment().subtract(1, "day"), "day")) {
        displayDate = "Yesterday";
      } else {
        displayDate = createdAt.format("D/M/YYYY");
      }

      return { ...blog._doc, displayDate }; // Spread original blog and add displayDate
    });

    res.render("category", {
      categorizedBlogs: blogsWithDisplayDate,
      categoryName,
      pageTitle: `BLOGAT - ${categoryName} Blogs`,
      cssPath: "../stylesheets/category.css",
    });
  } catch (error) {
    console.error("Error fetching categorized blogs:", error);
    res.status(500).send("Server error");
  }
};

const editPage = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogModel.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.render("updation", {
      blog,
      pageTitle: `BLOGAT - Edit ${blog.title}`,
      cssPath: "../stylesheets/blogCreation.css",
    });
  } catch (error) {
    console.log("Error fetching blog for editing", error);
    res.status(500).send("Internal Server Error");
  }
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
    res.redirect("/contact?msg=success");
  } catch (error) {
    res.redirect("/contact?msg=error");
    console.error(error);
    res.status(500).send("Something went wrong. Try again later.");
  }
};

const analyticsPage = async (req, res) => {
  const subscribedUsers = await subscribedUsersModel
    .find()
    .sort({ createdAt: -1 });
  const blogs = await blogModel.find().sort({ createdAt: -1 });
  const blogCategories = {
    Trends: blogs.filter((blog) => blog.category === "Trends"),
    Technology: blogs.filter((blog) => blog.category === "Technology"),
    Travel: blogs.filter((blog) => blog.category === "Travel"),
    Education: blogs.filter((blog) => blog.category === "Education"),
    News: blogs.filter((blog) => blog.category === "News"),
    SEO: blogs.filter((blog) => blog.category === "SEO"),
    Weather: blogs.filter((blog) => blog.category === "Weather"),
    Sports: blogs.filter((blog) => blog.category === "Sports"),
  };
  res.render("adminAnalytics", {
    subscribedUsers,
    blogCategories,
    blogs,
    pageTitle: "BLOGAT - Analytics",
    cssPath: "../stylesheets/analytics.css",
  });
};

module.exports = {
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
};
