const BlogModel = require("../models/blogModel");

const createBlog = async function (req, res) {
  try {
    let data = req.body;

    let savedData = await BlogModel.create(data);
    res.status(201).send({ msg: savedData });
  } catch (err) {
    console.log("This is the error :", err.message);
    res.status(400).send({ msg: "Error", error: "invalid request" });
  }
};

module.exports.createBlog = createBlog;
