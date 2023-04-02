const crypto = require("crypto");
const CustomError = require("../customError");
const db = require("../queries");

// create blog function

const createBlog = async (req, res, next) => {
  try {
    const { title, description, media, category } = req.body;
    const blogId = crypto.randomBytes(16).toString("hex");

    const blog = await db.createBlogQuery(
      blogId,
      title,
      description,
      media,
      category
    );
    res.status(201).json({ message: "Created successfully!", blog });
  } catch (error) {
    next(error);
  }
};

// get all blogs function

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await db.getBlogsQuery();
    if (!blogs) {
      throw new CustomError(400, "Blogs not found!");
    }
    res.status(200).json({ message: "success", blogs });
  } catch (error) {
    next(error);
  }
};

// get specific blog by id function

const findBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await db.findBlogQuery(id);
    if (!blog) {
      throw new CustomError(404, "blog not found!");
    }
    res.status(200).json({ message: "successfully founded!", blog: blog });
  } catch (error) {
    next(error);
  }
};

// delete blog by id function

const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blogs = await db.getBlogsQuery();
    const foundBlog = await blogs.find((blog) => blog.blog_id === id);
    if (!foundBlog) {
      throw new CustomError(404, "not found!");
    }
    await db.deleteBlogQuery(id);
    res.status(200).json({ message: "successfully deleted!" });
  } catch (error) {
    next(error);
  }
};

// update blog function

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogs = await db.getBlogsQuery();
    const blog = await blogs.find((blog) => blog.blog_id === id);
    if (!blog) {
      throw new CustomError(404, "not found!");
    }
    const { title, description, media, category } = req.body;

    const updateBlog = await db.updateBlogQuery(
      title,
      description,
      media,
      category,
      id
    );

    res
      .status(200)
      .json({ message: "successfully updated!", blog: updateBlog });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getBlogs,
  findBlogById,
  deleteBlog,
  updateBlog,
};
