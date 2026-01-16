const AuthorLoginNotFound = require("../../middlewares/expectation/author/authorLoginEmailOrPsswNotFound");

const authorLogin = async (email, password) => {
  const author = await AuthorSchema.findOne({ email });
  if (!author) {
    throw new AuthorLoginNotFound();
  }
  const isMatch = await user.isValidPassword(password);
  if (!isMatch) {
    throw new AuthorLoginNotFound();
  }
  return author;
};
module.exports = { authorLogin };
