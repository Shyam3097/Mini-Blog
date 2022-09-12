const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")
const middleware = require("../middlewares/auth")



router.post("/createAuthor", authorController.createAuthor)
router.post("/login",middleware.getToken);
router.post("/createBlog",middleware.authentication, blogController.createBlog)

router.get("/getBlogs",middleware.authentication, blogController.getBlogs)
router.put("/update/:blogId",middleware.authentication,middleware.authorisation,blogController.update);
router.delete("/deleteData/:blogId",middleware.authentication,middleware.authorisation,blogController.deleteData);
router.delete("/deleteBlogByQuery",middleware.authentication,middleware.auth,blogController.deleteBlogByQuery);



module.exports = router;

