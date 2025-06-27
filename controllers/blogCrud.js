const blogModel = require("../models/blog");
const mongoose = require("mongoose");

const blogCreation = async (req, res) => {
  
  try {
    const requiredFields = [
      "title",
      "description",
      "imageUri",
      "author",
      "tag",
      "category",
      "secondTitle",
      "secondDescription",
      "thirdTitle",
      "forthTitle",
      "fifthTitle",
      "thirdDescription",
      "forthDescription",
      "fifthDescription",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required field(s): ${missingFields.join(", ")}`,
      });
    }

    const {
      title,
      description,
      imageUri,
      author,
      tag,
      category,
      secondTitle,
      secondDescription,
      thirdTitle,
      forthTitle,
      fifthTitle,
      thirdDescription,
      forthDescription,
      fifthDescription,
    } = req.body;


    const blog = await blogModel.create({
      title,
      description,
      imageUri,
      author,
      tag,
      category,
      secondTitle,
      secondDescription,
      thirdDescription,
      forthDescription,
      fifthDescription,
      thirdTitle,
      forthTitle,
      fifthTitle,
    });

    res.status(201).redirect("/admin/adminPanel");
  } catch (error) {
    console.error("Blog creation error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
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
  const { title, imageUri, description, category, tag } = req.body;

  try {
    await blogModel.updateOne(
      { _id: blogId },
      { title, description, category, tag, imageUri }
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
