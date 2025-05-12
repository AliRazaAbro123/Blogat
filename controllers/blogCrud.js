const blogModel = require("../models/blog");
const mongoose = require("mongoose");

const blogCreation = async (req, res) => {
  try {
    const { title, description, imageUri, author, tags, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const blog = await blogModel.create({
      author,
      imageUri,
      title,
      tags,
      description,
      category,
    });

    const savedBlog = await blog.save();
    res.status(201).redirect("/admin/adminPanel");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const blogDeletation = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBlog = await blogModel.findOneAndDelete({ _id: id });

    if (!deletedBlog) {
      return res.status(404).send("Blog post not found");
    }

    res.redirect("/admin/adminPanel");
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).send("Internal Server Error");
  }
};

const blogEditation = async (req, res) => {
  const blogId = req.params.id;
  const { title, imageUri, description, category, tags } = req.body;

  try {
    await blogModel.updateOne(
      { _id: blogId },
      { title, description, category, tags, imageUri }
    );
    res.redirect("/admin/adminPanel");
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  blogCreation,
  blogDeletation,
  blogEditation,
};
