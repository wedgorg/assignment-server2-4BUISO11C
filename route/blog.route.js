const {
  createBlog,
  getBlogs,
  findBlogById,
  deleteBlog,
  updateBlog,
} = require("../controller/blog.controller");
const validator = require("../middleware/validation.middleware");
const { createBlogSchema } = require("../schema/blog.schema");

const router = require("express").Router();

router.post("/create", createBlogSchema, validator, createBlog);
router.get("/getAll", getBlogs);
router.get("/getById/:id", findBlogById);
router.delete("/delete/:id", deleteBlog);
router.put("/update/:id", updateBlog);

module.exports = router;
