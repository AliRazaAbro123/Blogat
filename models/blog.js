const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
    default: "Ali Raza",
  },
  imageUri: {
    type: String,
  },
  tag: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  secondTitle: {
    type: String,
    trim: true,
  },
  thirdTitle: {
    type: String,
    trim: true,
  },
  forthTitle: {
    type: String,
    trim: true,
  },
  fifthTitle: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  secondDescription: {
    type: String,
    trim: true,
  },
  thirdDescription: {
    type: String,
    trim: true,
  },
  forthDescription: {
    type: String,
    trim: true,
  },
  fifthDescription: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
