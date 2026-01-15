const HttpError = require("../expectation/index");
const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      error: err.error,
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Mongoose Error: object ID is invalid or malformed",
      statusCode: 400,
      error: err.message,
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: "Mongoose Error: one or more requests are invalid",
      statusCode: 400,
      error: err.errors,
    });
  }
  if (err instanceof mongoose.Error.MongooseServerSelectionError){
    return res.status(503).json({
        message: 'The server is currently unable to handle the request. Please try again later.',
        statusCode:503,
        error:err.errors
    })
  }
};module.exports= errorHandler
