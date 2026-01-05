const authorService = require("./author.service");

const findAll = async (req, res) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;
    const { users, totalUser, totalPages } = await authorService.authorAll(
      page,
      pageSize
    );
    if (users.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Name not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      users,
      totalPages,
      totalUser,
      page,pageSize
    });
  } catch (error) {
    console.error(error)
    res.status(500).send({
      statusCode: 500,
      message: "Error during the request",
    });
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid param",
      });
    }
    const user = await authorService.authorById(id);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Error during the request",
    });
  }
};

const create = async (req, res) => {
  try {
    const { body } = req;
    const newUser = await authorService.authorCreate(body);
    res.status(201).send({
      statusCode: 201,
      message: "user created successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Error during the request",
    });
  }
};

const modify = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (!id) {
      return res.status(404).send({
        statusCode: 404,
        message: "Invalid userId",
      });
    }
    const user = await authorService.authorModify(id, body);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "user not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "user modified successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: "Error during the request",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        statusCode: 404,
        messagge: "Invalid userId",
      });
    }
    const user = await authorService.authorDelete(id);
    res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Error during the request",
    });
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  modify,
  deleteUser,
};
