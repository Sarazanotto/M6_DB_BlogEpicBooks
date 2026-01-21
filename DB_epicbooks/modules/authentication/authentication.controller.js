const authenticationService = require("./authentication.service");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        statusCode: 400,
        message: "email or password are reqired",
      });
    }

    const authorLogin = await authenticationService.authorLogin(
      email,
      password,
    );
    res.status(200).send({
      statusCode: 200,
      message: "Login succesfully",
      token: authorLogin.token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
