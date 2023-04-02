const { body } = require("express-validator");

module.exports.createBlogSchema = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("title is required!")
    .isLength({ min: 4 })
    .withMessage("Title should be at least 4 chars long!"),
  body("description")
    .not()
    .isEmpty()
    .withMessage("description is required!")
    .isLength({ min: 10 })
    .withMessage("Description should be at least 10 chars long!"),
  body("media")
    .not()
    .isEmpty()
    .withMessage("media is required!")
    .isLength({ min: 4 })
    .withMessage("Media should be at least 4 chars long!"),
  body("category")
    .not()
    .isEmpty()
    .withMessage("category is required!")
    .isLength({ min: 4 })
    .withMessage("Category should be at least 4 chars long!"),
];
