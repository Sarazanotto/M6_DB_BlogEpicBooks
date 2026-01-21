const AuthorNotFound = require("../../middlewares/expectation/author/authorNotFound");
const AuthorLoginNotFound = require("../../middlewares/expectation/author/authorLoginEmailOrPsswNotFound");
const AuthorSchema = require("../author/author.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authorLogin = async (email, password) => {
  const author = await AuthorSchema.findOne({ email });
  if (!author) {
    throw new AuthorNotFound();
  }
  const isPasswordValid = await bcrypt.compare(password, author.password);
  if (!isPasswordValid) {
    throw new AuthorLoginNotFound();
  }
  const token = jwt.sign(
    {
      name: author.name,
      surname: author.surname,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "60m",
    },
  );
  return{
    token
  }
};
module.exports = { authorLogin };
