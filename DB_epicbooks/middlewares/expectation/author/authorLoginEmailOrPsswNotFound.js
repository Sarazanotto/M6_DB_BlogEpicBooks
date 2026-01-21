const HttpError = require("../index");

class AuthorLoginNotFound extends HttpError {
  constructor(
    statusCode = 401,
    message = "Email or password is invalid ",
    error = "Invalid credential provided"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = AuthorLoginNotFound;
