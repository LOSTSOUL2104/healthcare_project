const { constants } = require("../constants/constant.js");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.sendCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthourised",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server error",
        message: err.message,
        stackTrace: err.stack,
      });
      default:
        console.log("no error,shandaar 👍");
        break;
  }
  // console.error(err.stack);
  // res.status(500).send({ message: err.message });
};
module.exports = errorHandler;