const CustomError = require("./customError");

module.exports.errorHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof CustomError) {
      res.status(err.status).json({ message: err.message, status: err.status });
      return;
    }
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports.invalidRoute = (req, res, next) => {
  try {
    throw new CustomError(404, "Invalid route!");
  } catch (error) {
    next(error);
  }
};
