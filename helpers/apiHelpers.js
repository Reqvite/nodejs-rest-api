const {
  WrongParametersError,
  MissingFieldError,
  ValidationError,
} = require("./errors");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  if (
    err instanceof WrongParametersError ||
    err instanceof MissingFieldError ||
    err instanceof ValidationError
  ) {
    return res
      .status(err.status)
      .json({ status: "failure", code: err.status, message: err.message });
  }
  res.status(500).json({ message: err.message });
};

module.exports = {
  errorHandler,
  asyncWrapper,
};
