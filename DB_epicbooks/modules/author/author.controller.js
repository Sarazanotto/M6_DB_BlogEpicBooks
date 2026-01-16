const AuthorCollectionEmpty = require("../../middlewares/expectation/author/authorCollectionEmpty");
const AuthorNotFound = require("../../middlewares/expectation/author/authorNotFound");
const authorService = require("./author.service");




const findAll = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;
    const { users, totalUser, totalPages } = await authorService.authorAll(
      page,
      pageSize
    );
    if (users.length === 0) {
    throw new AuthorCollectionEmpty()
    }
    res.status(200).send({
      statusCode: 200,
      users,
      totalPages,
      totalUser,
      page,
      pageSize,
    });
  } catch (error) {
   next(error)
  }
};

const findOne = async (req, res, next) => {
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
   throw new AuthorNotFound()
    }
    res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    next(error)
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await authorService.authorCreate(body);
    res.status(201).send({
      statusCode: 201,
      message: "user created successfully",
      newUser,
    });
  } catch (error) {
    next(error)
  }
};

const uploadFileCloudinary = async (req, res, next) => {
  try {
const {id}= req.params
const url=req.file.path
const updateAvatar= await authorService.authorUpdateAvatar(id,url)
res.status(200).json({statusCode:200, updateAvatar})
  } catch (error) {
    next(error)
  }
};

const modify = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (!id) {
     throw new AuthorNotFound()
    }
    const user = await authorService.authorModify(id, body);
    if (!user) {
    throw new AuthorNotFound()
    }
    res.status(200).send({
      statusCode: 200,
      message: "user modified successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    next(error)
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
       throw new AuthorNotFound()
    }
    const user = await authorService.authorDelete(id);
    res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  uploadFileCloudinary,
  modify,
  deleteUser,
};
