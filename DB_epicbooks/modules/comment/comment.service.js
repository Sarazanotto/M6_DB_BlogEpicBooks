const CommentSchema = require("./comment.schema.js");

const commentsByAuthor = async (page, pageSize, authorId) => {
  const comments = await CommentSchema.find({ author: authorId })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate('book', 'title')
  const totalComments = await CommentSchema.countDocuments({author: authorId});
  const totalPages = Math.ceil(totalComments / pageSize);
  return {
    comments,
    totalComments,
    totalPages,
    page,
    pageSize,
  };
};

const findByBook= (bookId)=>{
  return CommentSchema.find({book:bookId}).populate('author','name')
}

const commentFindOne= (bookId, commentId)=>{
  return  CommentSchema.findOne({_id:commentId, book: bookId})
}

const commentCreate = async (body) => {
    const newComment= new CommentSchema(body)
    const commentSaved= await newComment.save()
    return commentSaved
};

const commentUpdate= async(bookId, commentId, body)=>{
  return await CommentSchema.findOneAndUpdate({
    _id:commentId,book:bookId}, body,{new:true}
  )
}
const commentDelete= async(bookId, commentId)=>{
  return await CommentSchema.findOneAndDelete({_id:commentId, book:bookId})
}

module.exports = {
  commentsByAuthor,
  findByBook,
  commentFindOne,
  commentCreate,
  commentUpdate,
  commentDelete
};
