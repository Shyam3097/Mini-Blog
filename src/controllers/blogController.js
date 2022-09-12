const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
const validate = require("../validations/validate");
const mongoose = require("mongoose");

// --------------------------------------------   Create Blog   ------------------------------------------------- //

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    if (!validate.isValidReqBody(data)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide the Data" });
    }
    let {
      title,
      body,
      authorId,
      tags,
      category,
      subcategory,
      isDeleted,
      isPublished,
    } = data;


    
    
    
    if (!title || validate.trimElement(title) === true) {
      return res
      .status(400)
      .send({ status: false, msg: "Please provide the title" });
    }
    if (!body || validate.trimElement(body) === true) {
      return res
      .status(400)
      .send({ status: false, msg: "Please provide the body" });
    }
    if (!authorId || validate.trimElement(authorId) === true) {
      return res
      .status(400)
      .send({ status: false, msg: "Please provide the authorId" });
    }
    if (mongoose.Types.ObjectId.isValid(data.authorId) === false) {
      return res
      .status(401)
      .send({ status: false, msg: "Wrong authorId is bieng provided" });
    }
    if (!tags) {
      return res
      .status(400)
      .send({ status: false, msg: "Please provide the tags" });
    }
    if (!category || validate.trimElement(category) === true) {
      return res
      .status(400)
      .send({ status: false, msg: "Please provide the category" });
    }
    
    if (isDeleted === true) {
      //if blog is set to deleted true then it will create timestamp
      let deletedAt = new Date();
      deletedAt = deletedAt;
    }
    if (isPublished === true) {
      //if blog is set to published true then it will create timestamp
      let publishedAt = new Date();
      publishedAt = publishedAt;
    }

    let savedData = await blogModel.create(data);
    res.status(201).send({ status: true, msg: savedData });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

// --------------------------------------------   Get Blog   ------------------------------------------------- //

const getBlogs = async (req, res) => {
  try {
    const data = req.query;
    console.log("data:", data);
    if (!validate.isValidReqBody(data)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide the Data" });
    } else {
      const { authorId, category, tags, subcategory } = data;
      const getBlogsData = await blogModel
        .find(data)
        .find({ isDeleted: false, isPublished: false });
      console.log("getBlogsData:", getBlogsData);

      if (authorId || category || tags || subcategory) {
        if (getBlogsData.length == 0) {
          return res
            .status(404)
            .send({ status: false, msg: "Sorry, Data not Found." });
        } else {
          return res.status(200).send({ status: true, msg: getBlogsData });
        }
      } else {
        return res
          .status(404)
          .send({ status: false, msg: "Please provide the Right Params" });
      }
    }
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

// --------------------------------------------   Update   ------------------------------------------------- //

const update = async function (req, res) {
  try {
    let blogIdOfParams = req.params.blogId;
    let presentBlog = await blogModel.findById(blogIdOfParams);

    if (!presentBlog) {
      return res.status(404).send({ status: false, msg: "Blog Not Found" });
    }
    if (presentBlog.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog already deleted" });
    }
    let data = req.body;
    let updatedBlog = await blogModel.find(
      { _id: blogIdOfParams },
      {
        $push: { tags: data.tags, subcategory: data.subcategory },
        $set: {
          title: title,
          body: body,
          publishedAt: Date.now(),
          isPublished: true,
        },
      },
      { new: true }
    );
    console.log("updatedBlog:", updatedBlog);

    return res.status(200).send({ status: true, data: updatedBlog });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// --------------------------------------------   deleteData   ------------------------------------------------- //

const deleteData = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let blog = await blogModel.findById(blogId);
    if (!blog)
      return res
        .status(404)
        .send({ status: false, msg: "This Blog does not exists" });

    if (blog.isDeleted == true)
      return res
        .status(404)
        .send({ status: false, msg: "This Blog is already deleted" });
    res
      .status(200)
      .send({ status: true, msg: "You delete the blog successfully" });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

// --------------------------------------------   deleteBlogByQuery   ------------------------------------------------- //

const deleteBlogByQuery = async function (req, res) {
  try {
    let queryData = req.query;
    if (!validate.isValidReqBody(queryData)) {
      return res.status(404).send({
        status: false,
        msg: "please provide the filters for deletion",
      });
    }
    let blogData = await blogModel
      .find(queryData)
      .find({ isDeleted: false, isPublished: false });
    if (blogData.length == 0) {
      return res.status(404).send({
        status: true,
        msg: "please provide the correct filters for deletion",
      });
    }
    await blogModel.updateMany(queryData, {
      $set: { isDeleted: true, deletedAt: new Date().toLocaleString() },
    });
    res
      .status(200)
      .send({ status: true, msg: "Successfully You delete the blog" });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// --------------------------------------------   All Exports   ------------------------------------------------- //

module.exports = {
  createBlog,
  getBlogs,
  update,
  deleteData,
  deleteBlogByQuery,
};

/*
# PUT /blogs/:blogId
- Updates a blog by changing the its title, body, adding tags, adding a subcategory.
    (Assuming tag and subcategory received in body is need to be added)
- Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
- Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404
    with a response body like [this](#error-response-structure)
- Return an HTTP status 200 if updated successfully with a body like [this]
    (#successful-response-structure) 
- Also make sure in the response you return the updated blog document. 
*/
