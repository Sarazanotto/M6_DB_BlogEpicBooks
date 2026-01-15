const commentService = require("./comment.service");

const findByAuthor = async (req, res,next) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;

    const { id } = req.params;

    const { comments, totalComments, totalPages } =
      await commentService.commentsByAuthor(id, page, pageSize);
    if (comments.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comments not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      comments,
      totalComments,
      totalPages,
    });
  } catch (error) {
   next(error)
  }
};

const findByBook = async (req, res,next) => {
  try {
    const { id } = req.params;
    const comments = await commentService.findByBook(id);
    res.status(200).send({ statusCode: 200, comments });
  } catch (error) {
   next(error)
  }
};

const findOneIdBook = async (req, res,next) => {
  try {
    const { id, bookId } = req.params;
    const comment = await commentService.commentFindOne(id, bookId);
    if (!comment) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "comment not found" });
    }
    res.status(200).send({ statusCode: 200, comment });
  } catch (error) {
   next(error)
  }
};

const create = async (req, res,next) => {
  try {
    const { body } = req;
    const newComment = await commentService.commentCreate({...body,book:req.params.id});
    res.status(201).send({
      statusCode: 201,
      message: "Comment upload succesful",
      newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: " Error during the request",
    });
  }
};

const update = async (req, res,next) => {
  try {
    const { id, commentId } = req.params;
    const updateComment = await commentService.commentUpdate(
      id,
      commentId,
      req.body
    );
    if (!updateComment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }
    res.status(200).send({ statusCode: 200, updateComment });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: " Error during the request",
    });
  }
};

const deleted = async (req, res,next) => {
  try {
    const { id, commentId } = req.params;
    const commentDelete = await commentService.commentDelete(id, commentId);
    if (!commentDelete) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Comment not found" });
    }
    res.status(200).send({ statusCode: 200, commentDelete });
  } catch (error) {
     console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: " Error during the request",
    });
  }
};

module.exports = {
  findByAuthor,
  findByBook,
  findOneIdBook,
  create,
  update,
  deleted,
};
