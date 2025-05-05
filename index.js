require("dotenv").config();
const express = require("express");
// Route imports
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const IndexRouter = require("./routes/index");
const adminRouter = require("./routes/adminAuth");
const blogRouter = require("./routes/blogCRUD");
const DatabaseConnection = require("./config/DatabaseConnection");

const app = express();

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

DatabaseConnection();

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true in production
      httpOnly: true,
      sameSite: "Strict",
    },
  })
);

// Routes
app.use("/", IndexRouter);
app.use("/blog/", blogRouter);
app.use("/admin/", adminRouter);

// Serverless support (for Vercel or Netlify)
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export for serverless
module.exports = app;
