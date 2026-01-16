const HttpError = require("../index");

class AuthorLoginNotFound extends HttpError {
  constructor(
    statusCode = 401,
    message = "Email or password is invalid ",
    error = "Email or password are incorrect"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = AuthorLoginNotFound;
